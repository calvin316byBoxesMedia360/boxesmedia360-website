// Grabador NFC BoxesMedia360 — herramienta privada en /nfc.
// Arma y valida URLs para chips NFC, las graba desde Chrome en Android (Web NFC)
// y lleva el inventario por cliente en Firestore. Requiere iniciar sesión.
import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, type Auth, type User } from 'firebase/auth';
import {
  addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, updateDoc, type Firestore,
} from 'firebase/firestore';
import { getNfcFirebase, isNfcAdmin, NFC_COLLECTION } from './nfcFirebase';
import { CAP, TIPOS, TIPO_LABEL, buildUrl, chipOf, ndefBytes, type Estado } from './nfcLogic';

// ---- Web NFC (solo Chrome en Android) ----
type NdefRecord = { recordType: string; data?: DataView };
type NdefReadingEvent = Event & { serialNumber?: string; message: { records: NdefRecord[] } };
interface NdefReaderLike {
  write(msg: { records: { recordType: string; data: string }[] }, opts?: { signal?: AbortSignal }): Promise<void>;
  scan(opts?: { signal?: AbortSignal }): Promise<void>;
  onreading: ((ev: NdefReadingEvent) => void) | null;
  onreadingerror: (() => void) | null;
}
declare global { interface Window { NDEFReader?: new () => NdefReaderLike } }

type Tag = {
  id: string; cliente: string; tipo: string; url: string; bytes: number;
  nota?: string; estado: Estado; creado: number; actualizado: number;
};
type Msg = { text: string; kind: 'ok' | 'warn' | 'bad' | 'info' } | null;

const MSG_CLS: Record<string, string> = {
  ok: 'bg-emerald-500/15 text-emerald-300',
  warn: 'bg-amber-500/15 text-amber-300',
  bad: 'bg-red-500/15 text-red-300',
  info: 'bg-cyan-500/10 text-gray-200',
};
const PILL_CLS: Record<Estado, string> = {
  pendiente: 'bg-amber-500/15 text-amber-300',
  grabado: 'bg-emerald-500/15 text-emerald-300',
  bloqueado: 'bg-violet-500/15 text-violet-300',
};
const ESTADO_LABEL: Record<Estado, string> = { pendiente: 'Pendiente', grabado: 'Grabado', bloqueado: 'Bloqueado' };

const input = 'w-full min-w-0 rounded-lg border border-white/10 bg-navy-deep px-3 py-2.5 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-light';
const btn = 'rounded-lg border border-white/15 bg-navy-soft px-4 py-2.5 text-sm font-semibold text-gray-100 hover:border-primary-light disabled:cursor-not-allowed disabled:opacity-40';
const btnPrimary = 'rounded-lg bg-primary-light px-4 py-2.5 text-sm font-semibold text-navy-deep hover:bg-primary disabled:cursor-not-allowed disabled:opacity-40';
const btnSm = 'rounded-md border border-white/15 px-3 py-1.5 text-xs font-medium text-gray-200 hover:border-primary-light';
const panel = 'flex flex-col gap-4 rounded-2xl border border-white/10 bg-navy-soft/60 p-5';

function useNoIndex() {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = 'Grabador NFC · BoxesMedia360';
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex, nofollow';
    document.head.appendChild(meta);
    return () => { document.title = prevTitle; meta.remove(); };
  }, []);
}

export default function NfcPage() {
  useNoIndex();
  const [fb, setFb] = useState<{ auth: Auth; db: Firestore } | null>(null);
  const [fbError, setFbError] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [checking, setChecking] = useState(true);
  const [denied, setDenied] = useState<string | null>(null);

  useEffect(() => {
    let unsub: (() => void) | undefined;
    getNfcFirebase()
      .then(f => {
        setFb(f);
        unsub = onAuthStateChanged(f.auth, async u => {
          if (u && !(await isNfcAdmin(f.db, u.uid))) {
            await signOut(f.auth);
            setDenied(u.uid);
            setUser(null);
          } else setUser(u);
          setChecking(false);
        });
      })
      .catch(() => { setFbError(true); setChecking(false); });
    return () => unsub?.();
  }, []);

  return (
    <div className="min-h-screen bg-navy text-gray-100" style={{ colorScheme: 'dark' }}>
      <div className="mx-auto flex max-w-3xl flex-col gap-5 px-4 pb-16 pt-8">
        <header className="flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-primary-light">BoxesMedia360 · NFC</p>
            <h1 className="mt-1 font-['Syne'] text-3xl font-bold">Grabador NFC</h1>
          </div>
          {user && fb && (
            <button className={btnSm} onClick={() => signOut(fb.auth)}>Cerrar sesión</button>
          )}
        </header>

        {checking && <p className="text-gray-400">Cargando…</p>}
        {!checking && fbError && (
          <div className={`rounded-lg p-3 text-sm ${MSG_CLS.bad}`}>
            No se pudo conectar con el servicio de inicio de sesión. Revisa tu conexión y recarga la página.
          </div>
        )}
        {!checking && fb && !user && denied && (
          <div className={`rounded-lg p-3 text-sm ${MSG_CLS.warn}`}>
            Esta cuenta no tiene acceso. Para autorizarla, crea en Firestore el documento <code>nfc_admins/{denied}</code>.
          </div>
        )}
        {!checking && fb && !user && <Login auth={fb.auth} onTry={() => setDenied(null)} />}
        {!checking && fb && user && <Grabador db={fb.db} />}
      </div>
    </div>
  );
}

function Login({ auth, onTry }: { auth: Auth; onTry: () => void }) {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setBusy(true); setErr(null); onTry();
    try {
      await signInWithEmailAndPassword(auth, email.trim(), pass);
    } catch (e) {
      const code = (e as { code?: string }).code || '';
      // Mensaje genérico: no revelar si el correo existe.
      setErr(code === 'auth/too-many-requests'
        ? 'Demasiados intentos. Espera unos minutos e intenta de nuevo.'
        : code === 'auth/network-request-failed'
          ? 'Sin conexión. Revisa tu internet.'
          : 'Correo o contraseña incorrectos.');
    } finally {
      setPass('');
      setBusy(false);
    }
  }

  return (
    <form onSubmit={submit} className={panel} autoComplete="on">
      <h2 className="font-['Syne'] text-lg font-semibold">Iniciar sesión</h2>
      <p className="text-sm text-gray-400">Herramienta privada de BoxesMedia360.</p>
      <label className="flex flex-col gap-1.5 text-sm text-gray-400">Correo
        <input className={input} type="email" autoComplete="username" required value={email} onChange={e => setEmail(e.target.value)} />
      </label>
      <label className="flex flex-col gap-1.5 text-sm text-gray-400">Contraseña
        <input className={input} type="password" autoComplete="current-password" required minLength={8} value={pass} onChange={e => setPass(e.target.value)} />
      </label>
      {err && <div className={`rounded-lg p-3 text-sm ${MSG_CLS.bad}`} role="alert">{err}</div>}
      <button className={btnPrimary} disabled={busy}>{busy ? 'Entrando…' : 'Entrar'}</button>
    </form>
  );
}

function Grabador({ db }: { db: Firestore }) {
  const [cliente, setCliente] = useState('');
  const [tipo, setTipo] = useState<string>('tarjeta-215');
  const [rawUrl, setRawUrl] = useState('');
  const [utm, setUtm] = useState(false);
  const [nota, setNota] = useState('');
  const [action, setAction] = useState<Msg>(null);
  const [copied, setCopied] = useState(false);
  const [rows, setRows] = useState<Tag[]>([]);
  const [invState, setInvState] = useState<'loading' | 'ok' | 'error'>('loading');
  const [filter, setFilter] = useState<'todos' | Estado>('todos');
  const [confirmDel, setConfirmDel] = useState<string | null>(null);
  const urlRef = useRef<HTMLInputElement>(null);
  const hasWebNFC = typeof window !== 'undefined' && 'NDEFReader' in window;

  const chip = chipOf(tipo);
  const cap = CAP[chip];
  const { url, err } = useMemo(() => buildUrl(rawUrl, { utm, tipo, cliente }), [rawUrl, utm, tipo, cliente]);
  const bytes = url ? ndefBytes(url) : 0;
  const fits = !!url && bytes <= cap;
  const pct = Math.min(100, cap ? (bytes / cap) * 100 : 0);

  useEffect(() => {
    const q = query(collection(db, NFC_COLLECTION), orderBy('creado', 'desc'));
    return onSnapshot(q,
      snap => { setRows(snap.docs.map(d => ({ id: d.id, ...(d.data() as Omit<Tag, 'id'>) }))); setInvState('ok'); },
      () => setInvState('error'));
  }, [db]);

  async function copy(text: string) {
    try { await navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 1600); }
    catch { setAction({ text: 'No se pudo copiar. Mantén presionada la URL para copiarla.', kind: 'warn' }); }
  }

  async function save(estado: Estado) {
    const now = Date.now();
    const data: Omit<Tag, 'id'> = {
      cliente: cliente.trim().slice(0, 120) || 'Sin cliente', tipo, url, bytes,
      nota: nota.trim().slice(0, 300), estado, creado: now, actualizado: now,
    };
    try { await addDoc(collection(db, NFC_COLLECTION), data); setAction({ text: 'Guardado en el inventario.', kind: 'ok' }); }
    catch { setAction({ text: 'No se pudo guardar. Revisa tu conexión o que la sesión siga activa.', kind: 'bad' }); }
  }
  async function patch(id: string, estado: Estado) {
    try { await updateDoc(doc(db, NFC_COLLECTION, id), { estado, actualizado: Date.now() }); }
    catch { setAction({ text: 'No se pudo actualizar el registro.', kind: 'bad' }); }
  }
  async function remove(id: string) {
    try { await deleteDoc(doc(db, NFC_COLLECTION, id)); }
    catch { setAction({ text: 'No se pudo borrar el registro.', kind: 'bad' }); }
    setConfirmDel(null);
  }

  function nfcErr(e: unknown) {
    const name = (e as { name?: string })?.name;
    if (name === 'NotAllowedError') return 'Permiso de NFC denegado. Toca el botón otra vez y acepta el permiso, o usa NFC Tools.';
    if (name === 'NotSupportedError') return 'Este teléfono no tiene NFC o está apagado en Ajustes → Dispositivos conectados → NFC.';
    if (name === 'NetworkError') return 'Se perdió el contacto con el chip. Mantenlo quieto contra el teléfono y reintenta.';
    if (name === 'AbortError') return 'Tiempo agotado: no se detectó ningún chip.';
    return `No se pudo usar NFC (${name || 'error'}). Usa NFC Tools como respaldo.`;
  }
  async function writeNfc() {
    if (!fits || !window.NDEFReader) return;
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 20000);
    setAction({ text: 'Acerca el chip a la parte trasera del teléfono…', kind: 'info' });
    try {
      await new window.NDEFReader().write({ records: [{ recordType: 'url', data: url }] }, { signal: ctrl.signal });
      setAction({ text: 'Grabado. Pruébalo y quedó guardado en el inventario.', kind: 'ok' });
      await save('grabado');
    } catch (e) { setAction({ text: nfcErr(e), kind: 'bad' }); }
    finally { clearTimeout(t); }
  }
  async function readNfc() {
    if (!window.NDEFReader) return;
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 20000);
    setAction({ text: 'Acerca el chip para leerlo…', kind: 'info' });
    try {
      const r = new window.NDEFReader();
      r.onreadingerror = () => setAction({ text: 'No se pudo leer el chip. Puede estar vacío o no ser NDEF.', kind: 'warn' });
      r.onreading = ev => {
        ctrl.abort(); clearTimeout(t);
        const dec = new TextDecoder();
        const parts = ev.message.records.map(x => `${x.recordType}: ${x.data ? dec.decode(x.data) : '(vacío)'}`);
        setAction({ text: `Serie ${ev.serialNumber || '—'} · ${parts.join(' | ') || 'Chip vacío'}`, kind: 'ok' });
      };
      await r.scan({ signal: ctrl.signal });
    } catch (e) { clearTimeout(t); setAction({ text: nfcErr(e), kind: 'bad' }); }
  }

  const check: Msg = err ? { text: err, kind: 'bad' }
    : !url ? null
    : !fits ? { text: `No cabe: usa ${bytes} de ${cap} bytes. Acorta la URL, quita la etiqueta utm o usa un chip más grande.`, kind: 'bad' }
    : bytes / cap > 0.85 ? { text: `Cabe, pero justo (${Math.round(pct)}%). Deja margen si puedes.`, kind: 'warn' }
    : { text: `Cabe sin problema: ${bytes} de ${cap} bytes (${Math.round(pct)}%).`, kind: 'ok' };

  const shown = rows.filter(r => filter === 'todos' || r.estado === filter);
  const fmt = (ms: number) => { try { return new Date(ms).toLocaleDateString('es-MX', { day: 'numeric', month: 'short', year: 'numeric' }); } catch { return ''; } };

  return (
    <>
      <section className={panel}>
        <h2 className="font-['Syne'] text-lg font-semibold">1 · URL a grabar</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="flex flex-col gap-1.5 text-sm text-gray-400">Cliente
            <input className={input} value={cliente} onChange={e => setCliente(e.target.value)} placeholder="Ej. Los Cuates" maxLength={120} />
          </label>
          <label className="flex flex-col gap-1.5 text-sm text-gray-400">Formato y chip
            <select className={input} value={tipo} onChange={e => setTipo(e.target.value)}>
              {TIPOS.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
            </select>
          </label>
        </div>
        <label className="flex flex-col gap-1.5 text-sm text-gray-400">URL de destino
          <input ref={urlRef} className={input} type="url" inputMode="url" value={rawUrl} onChange={e => setRawUrl(e.target.value)} placeholder="menu.loscuates.com o https://…" />
        </label>
        <label className="flex items-center gap-2 text-sm text-gray-200">
          <input type="checkbox" className="h-4 w-4 accent-[#4EFFEF]" checked={utm} onChange={e => setUtm(e.target.checked)} />
          Agregar etiqueta de origen (utm) para medir toques en Analytics
        </label>
        <label className="flex flex-col gap-1.5 text-sm text-gray-400">Nota (opcional)
          <input className={input} value={nota} onChange={e => setNota(e.target.value)} placeholder="Ej. 50 tarjetas para meseros" maxLength={300} />
        </label>

        <div className={`break-all rounded-lg bg-navy-deep px-3 py-2.5 font-mono text-sm ${url ? 'text-gray-100' : 'text-gray-500'}`}>
          {url || 'La URL final aparecerá aquí'}
        </div>
        <div className="flex flex-col gap-1.5">
          <div className="h-2.5 overflow-hidden rounded-full bg-navy-deep">
            <i className={`block h-full transition-all ${!url ? '' : !fits ? 'bg-red-400' : pct > 85 ? 'bg-amber-400' : 'bg-emerald-400'}`} style={{ width: `${pct}%` }} />
          </div>
          <div className="flex justify-between text-xs text-gray-400"><span>{bytes} bytes</span><span>Capacidad NTAG{chip}: {cap} bytes</span></div>
        </div>
        {check && <div className={`rounded-lg p-3 text-sm ${MSG_CLS[check.kind]}`}>{check.text}</div>}

        <div className="flex flex-wrap gap-2">
          {hasWebNFC && <button className={btnPrimary} disabled={!fits} onClick={writeNfc}>Grabar con este teléfono</button>}
          <button className={hasWebNFC ? btn : btnPrimary} disabled={!url} onClick={() => copy(url)}>{copied ? 'Copiado' : 'Copiar URL'}</button>
          <button className={btn} disabled={!fits} onClick={() => save('pendiente')}>Guardar en inventario</button>
          {hasWebNFC && <button className={btn} onClick={readNfc}>Leer un chip</button>}
        </div>
        {action && <div className={`rounded-lg p-3 text-sm ${MSG_CLS[action.kind]}`} role="status">{action.text}</div>}
      </section>

      <section className={panel}>
        <h2 className="font-['Syne'] text-lg font-semibold">2 · Grabar el chip</h2>
        {hasWebNFC ? (
          <ol className="list-decimal space-y-2 pl-5 text-sm text-gray-300">
            <li>Enciende el NFC: Ajustes → Dispositivos conectados → <b>NFC</b>.</li>
            <li>Toca <b>Grabar con este teléfono</b>. La primera vez Chrome pide permiso de NFC: acéptalo.</li>
            <li>Acerca el chip al <b>centro de la parte trasera</b> del teléfono y mantenlo quieto 2 segundos.</li>
            <li>Con <b>Leer un chip</b> confirma que quedó la URL correcta. Se guarda solo como <b>Grabado</b>.</li>
            <li>Si falla, usa la app <b>NFC Tools</b>: Escribir → Añadir un registro → URL / URI → pega → Escribir.</li>
          </ol>
        ) : (
          <ol className="list-decimal space-y-2 pl-5 text-sm text-gray-300">
            <li>Este navegador no puede grabar NFC. Para grabar directo, abre esta página en <b>Chrome para Android</b>.</li>
            <li>Si no, copia la URL y abre <b>NFC Tools</b> → <b>Escribir</b> → <b>Añadir un registro</b> → <b>URL / URI</b>.</li>
            <li>Pega la URL (si la app muestra «https://» aparte, pega solo lo que sigue) y toca <b>Escribir</b>.</li>
            <li>Acerca el chip. iPhone: borde superior. Android: centro de la parte trasera.</li>
            <li>Marca el chip como <b>Grabado</b> en el inventario.</li>
          </ol>
        )}
        <div className={`rounded-lg p-3 text-sm ${MSG_CLS.info}`}>
          Bloquear un chip (NFC Tools → Otros → Bloquear etiqueta) es permanente. Hazlo solo con entregas finales, y de preferencia graba una URL tuya que redirija al destino.
        </div>
      </section>

      <section className={panel}>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="font-['Syne'] text-lg font-semibold">3 · Inventario de chips</h2>
          <span className="text-xs text-gray-400">
            {invState === 'loading' ? 'Cargando…' : invState === 'error' ? 'Sin acceso al inventario' : 'Sincronizado en la nube'}
          </span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {(['todos', 'pendiente', 'grabado', 'bloqueado'] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)} aria-pressed={filter === f}
              className={`rounded-full px-3 py-1 text-xs font-medium ${filter === f ? 'bg-gray-100 text-navy' : 'border border-white/15 text-gray-300'}`}>
              {f === 'todos' ? 'Todos' : ESTADO_LABEL[f] + 's'}
            </button>
          ))}
        </div>
        {invState === 'error' && (
          <div className={`rounded-lg p-3 text-sm ${MSG_CLS.bad}`}>
            Firestore rechazó la lectura. Revisa que las reglas de <code>firestore.rules</code> estén publicadas en Firebase.
          </div>
        )}
        {!shown.length && invState === 'ok' && (
          <div className="rounded-xl border border-dashed border-white/15 p-5 text-center text-sm text-gray-400">
            {rows.length ? 'No hay chips con este estado.' : 'Aún no hay chips. Escribe una URL arriba y guárdala.'}
          </div>
        )}
        <div className="flex flex-col gap-2.5">
          {shown.map(r => (
            <div key={r.id} className="flex min-w-0 flex-col gap-2 rounded-xl border border-white/10 bg-navy-deep/60 p-3.5">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <div className="font-semibold">{r.cliente}</div>
                  <div className="font-mono text-xs text-gray-400">{TIPO_LABEL[r.tipo] || r.tipo} · {r.bytes} bytes · {fmt(r.actualizado || r.creado)}</div>
                </div>
                <span className={`whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-semibold ${PILL_CLS[r.estado]}`}>{ESTADO_LABEL[r.estado]}</span>
              </div>
              <div className="break-all font-mono text-sm text-primary-light">{r.url}</div>
              {r.nota && <div className="text-sm text-gray-400">{r.nota}</div>}
              <div className="flex flex-wrap gap-1.5">
                {confirmDel === r.id ? (
                  <>
                    <span className="self-center text-xs text-gray-400">¿Borrar este registro?</span>
                    <button className={`${btnSm} border-red-400 text-red-300`} onClick={() => remove(r.id)}>Sí, borrar</button>
                    <button className={btnSm} onClick={() => setConfirmDel(null)}>Cancelar</button>
                  </>
                ) : (
                  <>
                    <button className={btnSm} onClick={() => copy(r.url)}>Copiar URL</button>
                    <button className={btnSm} onClick={() => {
                      setCliente(r.cliente); setTipo(r.tipo); setUtm(false); setRawUrl(r.url); setNota(r.nota || '');
                      urlRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }}>Usar arriba</button>
                    {r.estado === 'pendiente' && <button className={btnSm} onClick={() => patch(r.id, 'grabado')}>Marcar grabado</button>}
                    {r.estado === 'grabado' && <button className={btnSm} onClick={() => patch(r.id, 'bloqueado')}>Marcar bloqueado</button>}
                    {r.estado !== 'pendiente' && <button className={btnSm} onClick={() => patch(r.id, 'pendiente')}>Volver a pendiente</button>}
                    <button className={`${btnSm} border-red-400/60 text-red-300`} onClick={() => setConfirmDel(r.id)}>Borrar</button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={panel}>
        <h2 className="font-['Syne'] text-lg font-semibold">Referencia rápida</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-gray-400"><tr><th className="py-1.5 pr-3 font-medium">Chip</th><th className="pr-3 font-medium">Memoria</th><th className="pr-3 font-medium">URL máx.</th><th className="font-medium">Uso típico</th></tr></thead>
            <tbody className="divide-y divide-white/10">
              <tr><td className="py-1.5">NTAG213</td><td>144 bytes</td><td>~132 caracteres</td><td>Stickers</td></tr>
              <tr><td className="py-1.5">NTAG215</td><td>504 bytes</td><td>~490 caracteres</td><td>Tarjetas PVC</td></tr>
              <tr><td className="py-1.5">NTAG216</td><td>888 bytes</td><td>~870 caracteres</td><td>Tarjetas, vCard</td></tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-gray-400">Metal (refrigerador, caja registradora): usa stickers anti-metal. Tarjetas negras: el chip suele ir al centro; quita fundas gruesas.</p>
      </section>
    </>
  );
}
