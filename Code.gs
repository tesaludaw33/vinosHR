// VINOS HR - Backend sencillo para publicar sedes globalmente
// 1) Cambia este PIN por uno privado. No lo pongas en el index.html.
// 2) Despliega como Aplicación web: Ejecutar como YO / Acceso: Cualquiera.
// 3) Copia la URL /exec y pégala en CLOUD_API_URL dentro del index.html.

const ADMIN_PIN = '1234';

const DEFAULT_SEDES = [
  { name: 'Barrio Guaduales', phone: '573138190386', featured: true,  icon: '🏟️', active: true },
  { name: 'Barrio Popular', phone: '573107291174', featured: false, icon: '🏟️', active: true },
  { name: 'Barrio Berlín', phone: '573171478511', featured: false, icon: '🏟️', active: true },
  { name: 'La Gran Colombia', phone: '573045361073', featured: false, icon: '🏟️', active: true },
  { name: 'Barrio Poblado 2', phone: '573014327014', featured: false, icon: '🏟️', active: true },
  { name: 'Villa del Lago', phone: '573132248704', featured: false, icon: '🏟️', active: true },
  { name: 'Barrio Chapinero', phone: '573177058877', featured: false, icon: '🏟️', active: true },
  { name: 'Barrio Valle del Lili', phone: '573163918568', featured: false, icon: '🏟️', active: true },
  { name: 'Yumbo – La Estancia', phone: '573117869368', featured: false, icon: '🏟️', active: true }
];

function doGet(e) {
  const payload = { ok: true, sedes: getSedes(), updatedAt: getUpdatedAt() };
  const callback = e && e.parameter && e.parameter.callback;
  if (callback) {
    return ContentService
      .createTextOutput(callback + '(' + JSON.stringify(payload) + ');')
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
  return json(payload);
}

function doPost(e) {
  try {
    const params = e && e.parameter ? e.parameter : {};
    if (params.action !== 'save') return json({ ok: false, error: 'Acción inválida' });
    if (String(params.pin || '') !== ADMIN_PIN) return json({ ok: false, error: 'PIN incorrecto' });
    const incoming = JSON.parse(params.data || '[]');
    const cleaned = normalizeSedes(incoming);
    PropertiesService.getScriptProperties().setProperty('SEDES_JSON', JSON.stringify(cleaned));
    PropertiesService.getScriptProperties().setProperty('UPDATED_AT', new Date().toISOString());
    return json({ ok: true, sedes: cleaned, updatedAt: getUpdatedAt() });
  } catch (err) {
    return json({ ok: false, error: String(err && err.message ? err.message : err) });
  }
}

function getSedes() {
  const saved = PropertiesService.getScriptProperties().getProperty('SEDES_JSON');
  if (!saved) return normalizeSedes(DEFAULT_SEDES);
  try { return normalizeSedes(JSON.parse(saved)); }
  catch (e) { return normalizeSedes(DEFAULT_SEDES); }
}

function getUpdatedAt() {
  return PropertiesService.getScriptProperties().getProperty('UPDATED_AT') || '';
}

function normalizeSedes(list) {
  if (!Array.isArray(list)) list = DEFAULT_SEDES;
  const cleaned = list.map(function(s) {
    return {
      name: String((s && s.name) || 'Sede sin nombre').slice(0, 80),
      phone: String((s && s.phone) || '').replace(/\D/g, '').slice(0, 20),
      featured: !!(s && s.featured),
      icon: String((s && s.icon) || '🏟️').slice(0, 8),
      active: !(s && s.active === false)
    };
  });
  const visible = cleaned.filter(function(s) { return s.active !== false; });
  if (!visible.some(function(s) { return s.featured; }) && visible[0]) visible[0].featured = true;
  return cleaned;
}

function json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
