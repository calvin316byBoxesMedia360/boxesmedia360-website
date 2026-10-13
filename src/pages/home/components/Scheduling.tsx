
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default function Scheduling() {
  const { t, i18n } = useTranslation('common');
  const [contactType, setContactType] = useState<'general' | 'schedule'>('general');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    date: '',
    time: '',
    message: '',
    immediateContact: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    if (submitStatus !== 'idle') {
      const timer = setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [submitStatus]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({
        ...prev,
        [name]: checked,
        date: checked ? '' : prev.date,
        time: checked ? '' : prev.time
      }));
    } else if (name === 'message') {
      if (value.length <= 500) {
        setFormData(prev => ({ ...prev, [name]: value }));
        setCharCount(value.length);
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone) {
      return;
    }

    // Trampa anti-spam: los bots llenan el campo oculto, las personas no
    const honey = (e.currentTarget as HTMLFormElement).elements.namedItem('_honey') as HTMLInputElement | null;
    if (honey && honey.value) {
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(formData.email)) {
      setSubmitStatus('error');
      return;
    }

    if (contactType === 'schedule' && !formData.immediateContact && (!formData.date || !formData.time)) {
      return;
    }

    setIsSubmitting(true);

    try {
      const submitData = new URLSearchParams();
      submitData.append('name', formData.name);
      submitData.append('email', formData.email);
      submitData.append('phone', formData.phone);

      if (contactType === 'general') {
        submitData.append('service', formData.service);
        submitData.append('contactType', 'Consulta General / General Inquiry');
      } else {
        if (formData.immediateContact) {
          submitData.append('contactType', 'Contacto Inmediato / Immediate Contact');
        } else {
          submitData.append('date', formData.date);
          submitData.append('time', formData.time);
          submitData.append('contactType', 'Llamada Agendada / Scheduled Call');
        }
      }

      if (formData.message) {
        submitData.append('message', formData.message);
      }

      // Use Formsubmit.co for email delivery
      // Endpoint AJAX de FormSubmit (el endpoint normal devuelve HTML/redirect y no sirve para fetch)
      const formUrl = 'https://formsubmit.co/ajax/boxesmedia360@gmail.com';

      const response = await fetch(formUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          ...Object.fromEntries(submitData),
          _subject: `Nuevo contacto: ${formData.name} - ${contactType === 'general' ? 'Consulta General' : 'Agendamiento'}`,
          _template: 'table',
          _captcha: 'false',
          _honey: ''
        })
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: '',
          date: '',
          time: '',
          message: '',
          immediateContact: false
        });
        setCharCount(0);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getMinDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <section id="contact" className="py-24 bg-gradient-to-br from-paper via-paper-soft to-paper-deep dark:from-navy dark:via-navy dark:to-navy-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#26A3AD]/10 border border-[#26A3AD]/30 dark:border-[#4EFFEF]/30 text-[#1A7F88] dark:text-[#4EFFEF] rounded-full text-sm font-semibold mb-6">
            <i className="ri-message-3-line text-lg"></i>
            {i18n.language === 'es' ? 'Contacto y Agendamiento' : 'Contact & Scheduling'}
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            {i18n.language === 'es' ? '¿Listo para transformar' : 'Ready to transform'}{' '}
            <span className="text-brand-gradient">
              {i18n.language === 'es' ? 'tu proyecto?' : 'your project?'}
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            {i18n.language === 'es'
              ? 'Cuéntanos tu proyecto o agenda una llamada. Te mostraremos cómo llevarlo del concepto al mercado en tiempo récord.'
              : 'Tell us about your project or schedule a call. We\'ll show you how to take it from concept to market in record time.'}
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Side - Features */}
          <div className="space-y-8">
            <div className="bg-paper-soft dark:bg-navy-soft rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-700">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {i18n.language === 'es' ? '¿Por qué contactarnos?' : 'Why contact us?'}
              </h3>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 flex items-center justify-center bg-[#26A3AD]/15 dark:bg-[#4EFFEF]/10 rounded-xl">
                      <i className="ri-time-line text-2xl text-[#1A7F88] dark:text-[#4EFFEF]"></i>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-2">
                      {i18n.language === 'es' ? 'Respuesta en 24 horas' : '24-hour response'}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {i18n.language === 'es'
                        ? 'Te contactamos rápidamente para discutir tu proyecto y responder todas tus preguntas.'
                        : 'We contact you quickly to discuss your project and answer all your questions.'}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 flex items-center justify-center bg-[#26A3AD]/15 dark:bg-[#4EFFEF]/10 rounded-xl">
                      <i className="ri-shield-check-line text-2xl text-[#1A7F88] dark:text-[#4EFFEF]"></i>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-2">
                      {i18n.language === 'es' ? 'Consultoría gratuita' : 'Free consultation'}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {i18n.language === 'es'
                        ? 'Evaluamos tu proyecto sin compromiso y te damos una propuesta personalizada.'
                        : 'We evaluate your project with no obligation and give you a personalized proposal.'}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 flex items-center justify-center bg-[#E2B679]/25 dark:bg-[#E2B679]/15 rounded-xl">
                      <i className="ri-rocket-line text-2xl text-[#9A6B25] dark:text-[#E2B679]"></i>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-2">
                      {i18n.language === 'es' ? 'Lanzamiento acelerado' : 'Accelerated launch'}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {i18n.language === 'es'
                        ? 'De la idea al mercado en tiempo récord. Cada día ganado es ventaja competitiva.'
                        : 'From idea to market in record time. Every day gained is competitive advantage.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="bg-gradient-to-br from-[#1A7F88] to-[#26A3AD] dark:from-[#0B1120] dark:to-[#1A7F88] dark:border dark:border-[#4EFFEF]/20 rounded-3xl p-6 sm:p-8 text-white shadow-xl">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-xl flex-shrink-0">
                  <i className="ri-lightbulb-flash-line text-xl sm:text-2xl"></i>
                </div>
                <div>
                  <h4 className="font-bold text-lg sm:text-xl mb-2">
                    {i18n.language === 'es' ? 'Proceso probado' : 'Proven process'}
                  </h4>
                  <p className="text-sm sm:text-base text-white/90 leading-relaxed">
                    {i18n.language === 'es'
                      ? 'Metodología refinada en 50+ proyectos que garantiza resultados consistentes y tiempos de entrega predecibles.'
                      : 'Methodology refined in 50+ projects that guarantees consistent results and predictable delivery times.'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="bg-paper-soft dark:bg-navy-soft rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
            <div className="p-8 md:p-10">
              {/* Contact Type Selector */}
              <div className="flex gap-3 mb-8 p-1 bg-paper-deep dark:bg-[#24304A]/60 rounded-xl">
                <button
                  type="button"
                  onClick={() => setContactType('general')}
                  className={`flex-1 px-4 py-3 rounded-lg font-semibold text-sm transition-all whitespace-nowrap cursor-pointer ${contactType === 'general'
                    ? 'bg-paper-soft dark:bg-navy-soft text-[#1A7F88] dark:text-[#4EFFEF] shadow-md'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                    }`}
                >
                  <i className="ri-mail-line mr-2"></i>
                  {i18n.language === 'es' ? 'Consulta General' : 'General Inquiry'}
                </button>
                <button
                  type="button"
                  onClick={() => setContactType('schedule')}
                  className={`flex-1 px-4 py-3 rounded-lg font-semibold text-sm transition-all whitespace-nowrap cursor-pointer ${contactType === 'schedule'
                    ? 'bg-paper-soft dark:bg-navy-soft text-[#1A7F88] dark:text-[#4EFFEF] shadow-md'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                    }`}
                >
                  <i className="ri-calendar-check-line mr-2"></i>
                  {i18n.language === 'es' ? 'Agendar Llamada' : 'Schedule Call'}
                </button>
              </div>

              <form onSubmit={handleSubmit} id="unified-contact-form">
                {/* Honeypot anti-spam (invisible para personas) */}
                <input type="text" name="_honey" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
                <div className="space-y-5">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      {i18n.language === 'es' ? 'Nombre completo' : 'Full name'} <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <i className="ri-user-line text-gray-400 dark:text-gray-500"></i>
                      </div>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        maxLength={100}
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder={i18n.language === 'es' ? 'Tu nombre' : 'Your name'}
                        className="w-full pl-11 pr-4 py-3 text-sm border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#26A3AD] focus:border-transparent bg-paper dark:bg-[#24304A]/60 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <i className="ri-mail-line text-gray-400 dark:text-gray-500"></i>
                      </div>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        maxLength={120}
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder={i18n.language === 'es' ? 'tu@email.com' : 'your@email.com'}
                        className="w-full pl-11 pr-4 py-3 text-sm border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#26A3AD] focus:border-transparent bg-paper dark:bg-[#24304A]/60 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      {i18n.language === 'es' ? 'Teléfono' : 'Phone'} <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <i className="ri-phone-line text-gray-400 dark:text-gray-500"></i>
                      </div>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        maxLength={30}
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="+1 (831) 000-0000"
                        className="w-full pl-11 pr-4 py-3 text-sm border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#26A3AD] focus:border-transparent bg-paper dark:bg-[#24304A]/60 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all"
                      />
                    </div>
                  </div>

                  {/* Service - Only for general inquiry */}
                  {contactType === 'general' && (
                    <div>
                      <label htmlFor="service" className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                        {i18n.language === 'es' ? 'Servicio de interés' : 'Service of interest'}
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <i className="ri-service-line text-gray-400 dark:text-gray-500"></i>
                        </div>
                        <select
                          id="service"
                          name="service"
                          value={formData.service}
                          onChange={handleChange}
                          className="w-full pl-11 pr-10 py-3 text-sm border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#26A3AD] focus:border-transparent bg-paper dark:bg-[#24304A]/60 text-gray-900 dark:text-white cursor-pointer appearance-none transition-all"
                        >
                          <option value="">{i18n.language === 'es' ? 'Selecciona un servicio' : 'Select a service'}</option>
                          <option value="branding">{i18n.language === 'es' ? 'Identidad de Marca' : 'Brand Identity'}</option>
                          <option value="graphic">{i18n.language === 'es' ? 'Diseño Gráfico Comercial' : 'Commercial Graphic Design'}</option>
                          <option value="digital">{i18n.language === 'es' ? 'Soluciones Digitales' : 'Digital Solutions'}</option>
                          <option value="audiovisual">{i18n.language === 'es' ? 'Producción Audiovisual' : 'Audiovisual Production'}</option>
                          <option value="prepress">{i18n.language === 'es' ? 'Pre-Prensa y Producción' : 'Pre-Press and Production'}</option>
                          <option value="led">{i18n.language === 'es' ? 'Pantallas LED y Espacios' : 'LED Screens and Spaces'}</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                          <i className="ri-arrow-down-s-line text-gray-400 dark:text-gray-500"></i>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Immediate Contact - Only for schedule */}
                  {contactType === 'schedule' && (
                    <div className="flex items-center">
                      <label htmlFor="immediateContact" className="flex items-center gap-3 cursor-pointer group">
                        <div className="relative">
                          <input
                            type="checkbox"
                            id="immediateContact"
                            name="immediateContact"
                            checked={formData.immediateContact}
                            onChange={handleChange}
                            className="w-5 h-5 text-[#26A3AD] border-2 border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-[#26A3AD] cursor-pointer transition-all"
                          />
                        </div>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-[#1A7F88] dark:group-hover:text-[#4EFFEF] transition-colors">
                          <i className="ri-flashlight-line mr-1"></i>
                          {i18n.language === 'es' ? 'Prefiero contacto inmediato' : 'I prefer immediate contact'}
                        </span>
                      </label>
                    </div>
                  )}

                  {/* Date & Time - Only for schedule and not immediate */}
                  {contactType === 'schedule' && !formData.immediateContact && (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="date" className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                          {i18n.language === 'es' ? 'Fecha' : 'Date'} <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <i className="ri-calendar-line text-gray-400 dark:text-gray-500"></i>
                          </div>
                          <input
                            type="date"
                            id="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            required
                            min={getMinDate()}
                            className="w-full pl-11 pr-4 py-3 text-sm border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#26A3AD] focus:border-transparent bg-paper dark:bg-[#24304A]/60 text-gray-900 dark:text-white cursor-pointer transition-all"
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="time" className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                          {i18n.language === 'es' ? 'Hora' : 'Time'} <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <i className="ri-time-line text-gray-400 dark:text-gray-500"></i>
                          </div>
                          <select
                            id="time"
                            name="time"
                            value={formData.time}
                            onChange={handleChange}
                            required
                            className="w-full pl-11 pr-10 py-3 text-sm border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#26A3AD] focus:border-transparent bg-paper dark:bg-[#24304A]/60 text-gray-900 dark:text-white cursor-pointer appearance-none transition-all"
                          >
                            <option value="">{i18n.language === 'es' ? 'Hora' : 'Time'}</option>
                            <option value="morning">{i18n.language === 'es' ? 'Mañana (9-12)' : 'Morning (9-12)'}</option>
                            <option value="afternoon">{i18n.language === 'es' ? 'Tarde (12-5)' : 'Afternoon (12-5)'}</option>
                            <option value="evening">{i18n.language === 'es' ? 'Noche (5-8)' : 'Evening (5-8)'}</option>
                          </select>
                          <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                            <i className="ri-arrow-down-s-line text-gray-400 dark:text-gray-500"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      {i18n.language === 'es' ? 'Cuéntanos sobre tu proyecto' : 'Tell us about your project'}
                    </label>
                    <div className="relative">
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        maxLength={500}
                        placeholder={i18n.language === 'es' ? 'Describe brevemente tu proyecto...' : 'Briefly describe your project...'}
                        className="w-full px-4 py-3 text-sm border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#26A3AD] focus:border-transparent bg-paper dark:bg-[#24304A]/60 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-none transition-all"
                      ></textarea>
                      <div className="flex justify-between items-center mt-2 px-1">
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {i18n.language === 'es' ? 'máx. 500 caracteres' : 'max. 500 characters'}
                        </span>
                        <span className={`text-xs font-medium ${charCount > 450 ? 'text-red-500' : 'text-gray-500 dark:text-gray-400'}`}>
                          {charCount}/500
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-8 py-4 bg-gradient-to-r from-[#1A7F88] to-[#26A3AD] dark:from-[#26A3AD] dark:to-[#4EFFEF] text-white dark:text-[#0B1120] font-bold text-base rounded-xl hover:shadow-2xl hover:shadow-[#26A3AD]/30 hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 whitespace-nowrap cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-3">
                        <i className="ri-loader-4-line animate-spin text-xl"></i>
                        {i18n.language === 'es' ? 'Enviando...' : 'Sending...'}
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-3">
                        {contactType === 'general' ? (
                          <>
                            <i className="ri-send-plane-fill text-xl"></i>
                            {i18n.language === 'es' ? 'Enviar Mensaje' : 'Send Message'}
                          </>
                        ) : formData.immediateContact ? (
                          <>
                            <i className="ri-flashlight-fill text-xl"></i>
                            {i18n.language === 'es' ? 'Solicitar Contacto' : 'Request Contact'}
                          </>
                        ) : (
                          <>
                            <i className="ri-calendar-check-fill text-xl"></i>
                            {i18n.language === 'es' ? 'Agendar Llamada' : 'Schedule Call'}
                          </>
                        )}
                      </span>
                    )}
                  </button>

                  {/* Status Messages */}
                  {submitStatus === 'success' && (
                    <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800 rounded-xl animate-fade-in">
                      <p className="text-sm font-medium text-green-700 dark:text-green-400 flex items-center gap-3">
                        <i className="ri-checkbox-circle-fill text-xl"></i>
                        {contactType === 'general'
                          ? (i18n.language === 'es' ? '¡Mensaje enviado con éxito! Te contactaremos pronto.' : 'Message sent successfully! We will contact you soon.')
                          : formData.immediateContact
                            ? (i18n.language === 'es' ? '¡Solicitud enviada! Te contactaremos lo antes posible.' : 'Request sent! We will contact you as soon as possible.')
                            : (i18n.language === 'es' ? '¡Llamada agendada con éxito! Te contactaremos en la fecha seleccionada.' : 'Call scheduled successfully! We will contact you on the selected date.')
                        }
                      </p>
                    </div>
                  )}

                  {submitStatus === 'error' && (
                    <div className="p-4 bg-gradient-to-r from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20 border border-red-200 dark:border-red-800 rounded-xl animate-fade-in">
                      <p className="text-sm font-medium text-red-700 dark:text-red-400 flex items-center gap-3">
                        <i className="ri-error-warning-fill text-xl"></i>
                        {i18n.language === 'es' ? 'Hubo un error. Por favor intenta nuevamente.' : 'There was an error. Please try again.'}
                      </p>
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
