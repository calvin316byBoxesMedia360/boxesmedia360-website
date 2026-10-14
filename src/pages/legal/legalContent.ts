// Contenido legal de boxesmedia360.com (ES / EN).
// Plantilla base: revisar con un asesor legal antes de considerarla definitiva.

export type LegalSection = { heading: string; body: string[] };
export type LegalDoc = { title: string; updated: string; intro: string; sections: LegalSection[] };

const CONTACT_EMAIL = 'calvin316@boxesmedia360.com';
const CONTACT_PHONE = '+1 (831) 673-2181';
const CONTACT_ADDRESS = 'Hollister, CA 95023, USA';
const UPDATED = '2026-10-13';

export const legal: Record<'es' | 'en', { privacy: LegalDoc; terms: LegalDoc }> = {
  es: {
    privacy: {
      title: 'Aviso de Privacidad',
      updated: `Última actualización: ${UPDATED}`,
      intro:
        'En BoxesMedia360 respetamos tu privacidad. Este aviso explica qué información recopilamos a través de boxesmedia360.com, para qué la usamos y qué derechos tienes sobre ella.',
      sections: [
        {
          heading: '1. Quiénes somos',
          body: [
            `BoxesMedia360 es un estudio creativo con sede en ${CONTACT_ADDRESS}. Para cualquier asunto relacionado con tus datos puedes escribirnos a ${CONTACT_EMAIL} o llamarnos al ${CONTACT_PHONE}.`,
          ],
        },
        {
          heading: '2. Información que recopilamos',
          body: [
            'Datos que nos das voluntariamente en el formulario de contacto o agendamiento: nombre, correo electrónico, teléfono, servicio de interés, fecha y hora preferidas y el mensaje que escribas.',
            'Preferencias técnicas guardadas solo en tu navegador (almacenamiento local): idioma y modo claro/oscuro. Esta información no se envía a nuestros servidores.',
            'Datos técnicos básicos que cualquier servidor web registra (dirección IP, tipo de navegador, páginas visitadas) a través de nuestro proveedor de hosting.',
          ],
        },
        {
          heading: '3. Para qué usamos tu información',
          body: [
            'Responder a tu solicitud, agendar llamadas y enviarte cotizaciones o información sobre el servicio que pediste.',
            'Mantener el sitio funcionando de forma segura y mejorar su rendimiento.',
            'No vendemos ni rentamos tus datos personales a terceros, y no los usamos para publicidad de terceros.',
          ],
        },
        {
          heading: '4. Proveedores que intervienen',
          body: [
            'Firebase Hosting (Google) aloja el sitio web.',
            'FormSubmit (formsubmit.co) procesa el envío del formulario de contacto y nos lo entrega por correo electrónico.',
            'Google Fonts y jsDelivr sirven las tipografías e íconos; al cargarlos, tu navegador se conecta a sus servidores.',
            'Cada proveedor tiene sus propias políticas de privacidad y solo recibe la información necesaria para prestar su servicio.',
          ],
        },
        {
          heading: '5. Cuánto tiempo conservamos tus datos',
          body: [
            'Conservamos los mensajes de contacto mientras exista una relación comercial o el tiempo razonable para dar seguimiento a tu solicitud. Puedes pedirnos que los eliminemos en cualquier momento.',
          ],
        },
        {
          heading: '6. Tus derechos',
          body: [
            'Puedes solicitar acceso, corrección o eliminación de tus datos personales, así como saber qué información tenemos sobre ti.',
            'Si resides en California, la Ley de Privacidad del Consumidor de California (CCPA/CPRA) te otorga estos derechos; no te discriminaremos por ejercerlos.',
            `Para ejercer cualquiera de ellos escríbenos a ${CONTACT_EMAIL}.`,
          ],
        },
        {
          heading: '7. Seguridad',
          body: [
            'El sitio se sirve únicamente por HTTPS y aplicamos medidas razonables para proteger la información. Ningún sistema es 100% infalible, por lo que te pedimos no enviar datos sensibles (contraseñas, datos bancarios) a través del formulario.',
          ],
        },
        {
          heading: '8. Menores de edad',
          body: ['Este sitio está dirigido a negocios y adultos. No recopilamos a sabiendas datos de menores de 13 años.'],
        },
        {
          heading: '9. Cambios a este aviso',
          body: ['Podemos actualizar este aviso. La fecha de la última actualización aparece al inicio de esta página.'],
        },
      ],
    },
    terms: {
      title: 'Términos y Condiciones',
      updated: `Última actualización: ${UPDATED}`,
      intro:
        'Al usar boxesmedia360.com aceptas estos términos. Si no estás de acuerdo con ellos, te pedimos no utilizar el sitio.',
      sections: [
        {
          heading: '1. Uso del sitio',
          body: [
            'El sitio tiene fines informativos y de contacto comercial. Te comprometes a usarlo de forma lícita y a no intentar dañarlo, sobrecargarlo ni acceder a áreas no públicas.',
          ],
        },
        {
          heading: '2. Servicios y cotizaciones',
          body: [
            'La información sobre servicios, tiempos y resultados es orientativa. Cada proyecto se rige por la propuesta o contrato específico que acordemos por escrito, que prevalece sobre lo publicado en el sitio.',
          ],
        },
        {
          heading: '3. Propiedad intelectual',
          body: [
            'Los textos, logotipos, diseños e imágenes del sitio pertenecen a BoxesMedia360 o a sus respectivos titulares. No pueden copiarse ni reutilizarse sin autorización por escrito.',
            'Los trabajos mostrados en el portafolio pueden pertenecer a nuestros clientes y se presentan con fines de muestra.',
          ],
        },
        {
          heading: '4. Enlaces y servicios de terceros',
          body: [
            'El sitio puede enlazar o usar servicios de terceros (redes sociales, proveedores de formularios, fuentes tipográficas). No somos responsables de su contenido ni de sus políticas.',
          ],
        },
        {
          heading: '5. Limitación de responsabilidad',
          body: [
            'El sitio se ofrece "tal cual". En la medida permitida por la ley, BoxesMedia360 no será responsable por daños indirectos derivados del uso o la imposibilidad de uso del sitio.',
          ],
        },
        {
          heading: '6. Ley aplicable',
          body: ['Estos términos se rigen por las leyes del Estado de California, Estados Unidos.'],
        },
        {
          heading: '7. Contacto',
          body: [`Para dudas sobre estos términos escríbenos a ${CONTACT_EMAIL} o llámanos al ${CONTACT_PHONE}.`],
        },
      ],
    },
  },
  en: {
    privacy: {
      title: 'Privacy Notice',
      updated: `Last updated: ${UPDATED}`,
      intro:
        'At BoxesMedia360 we respect your privacy. This notice explains what information we collect through boxesmedia360.com, how we use it and what rights you have.',
      sections: [
        {
          heading: '1. Who we are',
          body: [
            `BoxesMedia360 is a creative studio based in ${CONTACT_ADDRESS}. For any matter related to your data, email us at ${CONTACT_EMAIL} or call ${CONTACT_PHONE}.`,
          ],
        },
        {
          heading: '2. Information we collect',
          body: [
            'Data you voluntarily provide in the contact or scheduling form: name, email, phone, service of interest, preferred date and time, and your message.',
            'Technical preferences stored only in your browser (local storage): language and light/dark mode. This information is not sent to our servers.',
            'Basic technical data that any web server logs (IP address, browser type, pages visited) through our hosting provider.',
          ],
        },
        {
          heading: '3. How we use it',
          body: [
            'To answer your request, schedule calls and send you quotes or information about the service you asked for.',
            'To keep the site running securely and improve its performance.',
            'We do not sell or rent your personal data, and we do not use it for third-party advertising.',
          ],
        },
        {
          heading: '4. Service providers',
          body: [
            'Firebase Hosting (Google) hosts the website.',
            'FormSubmit (formsubmit.co) processes contact form submissions and delivers them to us by email.',
            'Google Fonts and jsDelivr serve fonts and icons; when they load, your browser connects to their servers.',
            'Each provider has its own privacy policy and only receives the information needed to provide its service.',
          ],
        },
        {
          heading: '5. Retention',
          body: [
            'We keep contact messages while a business relationship exists or for a reasonable time to follow up on your request. You can ask us to delete them at any time.',
          ],
        },
        {
          heading: '6. Your rights',
          body: [
            'You may request access to, correction of, or deletion of your personal data, and ask what information we hold about you.',
            'If you are a California resident, the California Consumer Privacy Act (CCPA/CPRA) grants you these rights; we will not discriminate against you for exercising them.',
            `To exercise any of them, email ${CONTACT_EMAIL}.`,
          ],
        },
        {
          heading: '7. Security',
          body: [
            'The site is served only over HTTPS and we apply reasonable measures to protect information. No system is 100% secure, so please do not send sensitive data (passwords, banking details) through the form.',
          ],
        },
        {
          heading: '8. Children',
          body: ['This site is intended for businesses and adults. We do not knowingly collect data from children under 13.'],
        },
        {
          heading: '9. Changes',
          body: ['We may update this notice. The last-updated date appears at the top of this page.'],
        },
      ],
    },
    terms: {
      title: 'Terms & Conditions',
      updated: `Last updated: ${UPDATED}`,
      intro: 'By using boxesmedia360.com you agree to these terms. If you do not agree, please do not use the site.',
      sections: [
        {
          heading: '1. Use of the site',
          body: [
            'The site is for information and business contact. You agree to use it lawfully and not to attempt to damage it, overload it or access non-public areas.',
          ],
        },
        {
          heading: '2. Services and quotes',
          body: [
            'Information about services, timelines and results is indicative. Each project is governed by the specific written proposal or contract we agree on, which prevails over anything published on the site.',
          ],
        },
        {
          heading: '3. Intellectual property',
          body: [
            'Text, logos, designs and images on the site belong to BoxesMedia360 or their respective owners and may not be copied or reused without written permission.',
            'Work shown in the portfolio may belong to our clients and is presented as a sample.',
          ],
        },
        {
          heading: '4. Third-party links and services',
          body: [
            'The site may link to or use third-party services (social networks, form providers, font services). We are not responsible for their content or policies.',
          ],
        },
        {
          heading: '5. Limitation of liability',
          body: [
            'The site is provided "as is". To the extent permitted by law, BoxesMedia360 is not liable for indirect damages arising from the use of, or inability to use, the site.',
          ],
        },
        {
          heading: '6. Governing law',
          body: ['These terms are governed by the laws of the State of California, United States.'],
        },
        {
          heading: '7. Contact',
          body: [`Questions about these terms: ${CONTACT_EMAIL} or ${CONTACT_PHONE}.`],
        },
      ],
    },
  },
};
