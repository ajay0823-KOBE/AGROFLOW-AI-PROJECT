/* =========================================================
   AgriFlow AI – shared code loaded by every page
   All data is saved in the browser with localStorage.

   Sections:
   1. Demo accounts and fixed data
   2. Saving and loading data
   3. Sample data for the demo
   4. Languages (English, Hindi, Tamil)
   5. Login, register, logout
   6. Small helpers
   7. The four AI models (simulated)
   8. Chat assistant
   9. Page start-up
   ========================================================= */

/* ---------- 1. Demo accounts and fixed data ---------- */

const DEMO_USERS = [
  {
    role: 'farmer', id: 'F-AF1001', name: 'AJAY',
    email: 'farmer@agriflow.in', password: 'Farmer@123',
    phone: '7047382739', state: 'Tamil Nadu', address: 'Perundurai Rd, Erode, Tamil Nadu',
    aadhaar: '123456789012', aadhaarVerified: true, creditScore: 728
  },
  {
    role: 'buyer', id: 'B-AF2001', name: 'Akash',
    email: 'buyer@agriflow.in', password: 'Buyer@123',
    phone: '9876543210', state: 'Maharashtra', address: 'Nashik APMC area, Maharashtra',
    aadhaar: '987654321098', aadhaarVerified: true
  },
  {
    role: 'admin', id: 'A-GOV01', name: 'DoCA Officer',
    email: 'admin@agriflow.in', password: 'Admin@2026',
    phone: '1800114300', state: 'Delhi', address: 'Krishi Bhawan, New Delhi',
    aadhaarVerified: true
  }
];

const ASSISTANT_NAME = 'AgriFlow Assistant';

const SCHEMES = [
  { name: 'PM-KISAN', full: 'Pradhan Mantri Kisan Samman Nidhi', tag: 'Income', amount: '₹6,000 / year',
    desc: 'Direct income support of ₹6,000 a year in 3 instalments.', eligibility: 'Landholding farmers with Aadhaar-linked bank account.' },
  { name: 'PMFBY', full: 'Pradhan Mantri Fasal Bima Yojana', tag: 'Insurance', amount: 'Premium subsidy',
    desc: 'Crop insurance against natural calamities, pests and diseases.', eligibility: 'Farmers growing notified crops in notified areas.' },
  { name: 'MSP Procurement', full: 'Minimum Support Price — DoCA / FCI / NAFED', tag: 'Procurement', amount: 'MSP rates',
    desc: 'Government buys notified crops at MSP. AgriFlow books the slot and tracks payment.', eligibility: 'Farmers selling at registered mandis via AgriFlow token.' },
  { name: 'Kisan Credit Card', full: 'KCC & institutional agri loans', tag: 'Credit', amount: 'Score-based',
    desc: 'Short-term credit for crops and inputs. Your AgriFlow credit score helps.', eligibility: 'Farmers with land records; Aadhaar preferred.' },
  { name: 'Fertilizer Subsidy', full: 'Nutrient-based subsidy & DBT', tag: 'Input', amount: 'DBT',
    desc: 'Subsidy on urea and NPK, paid via DBT linked to Aadhaar.', eligibility: 'Farmers buying at authorised outlets.' },
  { name: 'e-NAM', full: 'National Agriculture Market', tag: 'Market', amount: 'Pan-India',
    desc: 'Online trading that connects mandis for better prices.', eligibility: 'Registered farmers and traders.' }
];

const CENTRES = [
  { name: 'Erode Mandi', place: 'Erode, Tamil Nadu', cap: 8, free: 8, crops: ['Paddy', 'Turmeric', 'Sugarcane'] },
  { name: 'Coimbatore APMC', place: 'Coimbatore, TN', cap: 10, free: 10, crops: ['Cotton', 'Coconut', 'Maize'] },
  { name: 'Ludhiana Grain Market', place: 'Ludhiana, Punjab', cap: 12, free: 12, crops: ['Wheat', 'Paddy', 'Mustard'] },
  { name: 'Nashik APMC', place: 'Nashik, Maharashtra', cap: 10, free: 7, crops: ['Onion', 'Grapes', 'Tomato'] },
  { name: 'Guntur Mirchi Yard', place: 'Guntur, AP', cap: 8, free: 8, crops: ['Chilli', 'Cotton', 'Paddy'] },
  { name: 'Indore Mandi', place: 'Indore, MP', cap: 10, free: 10, crops: ['Soybean', 'Wheat', 'Gram'] },
  { name: 'Chennai Koyambedu', place: 'Chennai, TN', cap: 15, free: 12, crops: ['Onion', 'Tomato', 'Vegetables'] },
  { name: 'Madurai APMC', place: 'Madurai, TN', cap: 10, free: 8, crops: ['Potato', 'Chilli', 'Groundnut'] }
];

// MSP is in ₹ per quintal (100 kg)
const DEFAULT_CROPS = [
  { n: 'Paddy', msp: 2183, cat: 'cereals', icon: '🌾' },  { n: 'Wheat', msp: 2275, cat: 'cereals', icon: '🌿' },
  { n: 'Maize', msp: 2090, cat: 'cereals', icon: '🌽' },  { n: 'Bajra', msp: 2500, cat: 'cereals', icon: '🌾' },
  { n: 'Cotton', msp: 7020, cat: 'cash', icon: '☁️' },    { n: 'Sugarcane', msp: 315, cat: 'cash', icon: '🎋' },
  { n: 'Turmeric', msp: 7500, cat: 'spice', icon: '🟠' }, { n: 'Chilli', msp: 12000, cat: 'spice', icon: '🌶️' },
  { n: 'Onion', msp: 1800, cat: 'veg', icon: '🧅' },      { n: 'Tomato', msp: 1500, cat: 'veg', icon: '🍅' },
  { n: 'Potato', msp: 1200, cat: 'veg', icon: '🥔' },     { n: 'Brinjal', msp: 1400, cat: 'veg', icon: '🍆' },
  { n: 'Mango', msp: 4500, cat: 'fruit', icon: '🥭' },    { n: 'Banana', msp: 1800, cat: 'fruit', icon: '🍌' },
  { n: 'Grapes', msp: 4200, cat: 'fruit', icon: '🍇' },   { n: 'Groundnut', msp: 6377, cat: 'pulse', icon: '🥜' },
  { n: 'Soybean', msp: 4600, cat: 'pulse', icon: '🟢' },  { n: 'Mustard', msp: 5200, cat: 'pulse', icon: '🟡' }
];

const SLOTS = ['09:00–10:00', '10:00–11:00', '11:00–12:00', '12:00–13:00', '14:00–15:00', '15:00–16:00', '16:00–17:00'];

// Order of a farmer booking. The admin moves a booking one step at a time.
const BOOKING_STAGES = ['Registered', 'Weighing', 'Quality approved', 'MSP paid to farmer', 'Completed'];

/* ---------- 2. Saving and loading data ---------- */

// Every key is saved as "af_<name>" in localStorage
function getData(name, fallback = []) {
  try {
    const value = JSON.parse(localStorage.getItem('af_' + name));
    return value === null ? fallback : value;
  } catch (e) {
    return fallback;
  }
}

function setData(name, value) {
  localStorage.setItem('af_' + name, JSON.stringify(value));
}

// Admin can change MSP rates; otherwise use the defaults
function getCrops() {
  const saved = getData('crops');
  return saved.length ? saved : DEFAULT_CROPS.map(c => ({ ...c }));
}

// Text the admin can change from "Site settings"
function getSite() {
  const defaults = {
    banner: 'MSP paid to farmers · Book slots · Collab circles',
    notice: 'DoCA procurement centres accept AgriFlow tokens. Farmers never pay to sell.',
    maintenance: false
  };
  return { ...defaults, ...getData('site', {}) };
}

// Add a line to the SMS log shown in the admin portal
function addSms(text) {
  const log = getData('sms_log');
  log.unshift({ t: new Date().toLocaleString(), msg: text });
  setData('sms_log', log.slice(0, 40));
}

/* ---------- 3. Sample data for the demo ---------- */

function sampleBooking(token, centre, crop, qty, msp, status, farmerId, farmerName, grade, score) {
  return {
    token, centre, crop, qty, msp, status, farmerId, farmerName,
    amount: Math.round(msp / 100 * qty),
    date: new Date(Date.now() + 86400000).toISOString().slice(0, 10),
    slot: '10:00–11:00',
    paid: status === 'MSP paid to farmer',
    quality: { grade, score },
    integrity: integrityHash(token + farmerId),
    created: new Date().toISOString()
  };
}

// Fills empty lists with sample data. "force" = reset everything (admin button).
function seedDemoData(force) {
  const now = new Date().toISOString();

  if (force || !getData('bookings').length) {
    setData('bookings', [
      sampleBooking('AF5101', 'Erode Mandi', 'Onion', 150, 1800, 'Registered', 'F-AF1001', 'AJAY', 'GOOD', 88),
      sampleBooking('AF5102', 'Nashik APMC', 'Onion', 200, 1800, 'Weighing', 'F-SEED2', 'Lakshmi M', 'GOOD', 91),
      sampleBooking('AF5103', 'Coimbatore APMC', 'Turmeric', 100, 7500, 'Quality approved', 'F-SEED3', 'Suresh P', 'GOOD', 94),
      sampleBooking('AF5104', 'Ludhiana Grain Market', 'Wheat', 500, 2275, 'MSP paid to farmer', 'F-AF1001', 'AJAY', 'AVERAGE', 71)
    ]);
  }

  if (force || !getData('listings').length) {
    setData('listings', [
      { id: 'LIST1001', crop: 'Onion', qty: 120, pricePerKg: 18, location: 'Perundurai, Erode', farmerId: 'F-AF1001', farmerName: 'AJAY', status: 'Available', created: now },
      { id: 'LIST1002', crop: 'Turmeric', qty: 80, pricePerKg: 72, location: 'Erode Mandi area', farmerId: 'F-AF1001', farmerName: 'AJAY', status: 'Available', created: now },
      { id: 'LIST1003', crop: 'Tomato', qty: 60, pricePerKg: 14, location: 'Bhavani', farmerId: 'F-SEED2', farmerName: 'Lakshmi M', status: 'Available', created: now },
      { id: 'LIST1004', crop: 'Paddy', qty: 800, pricePerKg: 22, location: 'Modakurichi', farmerId: 'F-SEED3', farmerName: 'Suresh P', status: 'Available', created: now },
      { id: 'LIST1005', crop: 'Chilli', qty: 150, pricePerKg: 95, location: 'Near Guntur', farmerId: 'F-SEED4', farmerName: 'Anitha R', status: 'Available', created: now }
    ]);
  }

  if (force || !getData('loans').length) {
    setData('loans', [
      { id: 'LN9001', farmerId: 'F-AF1001', farmerName: 'AJAY', purpose: 'Crop inputs (seed / fertilizer)', amount: 80000, limit: 80000, rate: '8.5%–10%', score: 728, status: 'Pending review' },
      { id: 'LN9002', farmerId: 'F-SEED2', farmerName: 'Lakshmi M', purpose: 'Equipment / tools', amount: 120000, limit: 120000, rate: '7.0%–8.5%', score: 760, status: 'Pending review' }
    ]);
  }

  if (force || !getData('collab').length) {
    const hoursAgo = h => new Date(Date.now() - h * 3600000).toISOString();
    setData('collab_groups', ['erode', 'onion']);
    setData('collab', [
      { id: 'C9001', groupId: 'erode', type: 'slot', author: 'Ravi K', text: 'Booked Erode Mandi 10–11 AM. About 40 kg free on my token. Join if nearby.', likes: 4, joins: 1, created: hoursAgo(1) },
      { id: 'C9002', groupId: 'erode', type: 'update', author: 'AJAY', text: 'AI quality 88 on onion. Going to the centre after lunch. Anyone need a ride?', likes: 2, joins: 0, created: hoursAgo(2) },
      { id: 'C9003', groupId: 'onion', type: 'transport', author: 'Lakshmi M', text: 'Shared tempo tomorrow 5:30 AM to APMC. 2 seats + 70 kg free. Split diesel.', likes: 6, joins: 2, created: hoursAgo(3) },
      { id: 'C9004', groupId: 'chilli', type: 'listing', author: 'Anitha R', text: 'Co-listing 200 kg dried chilli, graded. Looking for a bulk buyer.', likes: 1, joins: 0, created: hoursAgo(6) }
    ]);
  }

  if (force || !getData('sms_log').length) {
    setData('sms_log', [{ t: new Date().toLocaleString(), msg: 'Demo data loaded: 4 sample bookings' }]);
  }
}

/* ---------- 4. Languages (English, Hindi, Tamil) ---------- */

// Any element with data-i18n="key" gets its text from here
const TEXT = {
  en: {
    home: 'Home', centres: 'Centres', crops: 'Crops', schemes: 'Schemes', track: 'Track', news: 'News',
    login: 'Login', signup: 'Sign Up', logout: 'Logout', profile: 'Profile',
    heroTitle: 'From field to fair price — <em>share slots, skip the queue</em>, MSP paid to you',
    heroSub: 'Book or share MSP slots with nearby farmers, AI quality checks, SMS in your language, and direct payments.',
    regFarmer: 'Register as Farmer', loginPortal: 'Login to Portal', aiTitle: 'Four AI Models',
    adminTitle: 'Admin command centre', bookings: 'Bookings', inQueue: 'In queue', mspPaid: 'MSP paid',
    langNote: 'Language: English'
  },
  hi: {
    home: 'होम', centres: 'केंद्र', crops: 'फसलें', schemes: 'योजनाएं', track: 'ट्रैक', news: 'समाचार',
    login: 'लॉगिन', signup: 'साइन अप', logout: 'लॉगआउट', profile: 'प्रोफ़ाइल',
    heroTitle: 'खेत से मंडी तक — <em>शून्य प्रतीक्षा</em>, उचित MSP, लाइव ट्रैकिंग',
    heroSub: 'मिनटों में स्लॉट बुक करें, AI गुणवत्ता जांच, अपनी भाषा में SMS, और सीधा भुगतान।',
    regFarmer: 'किसान के रूप में पंजीकरण', loginPortal: 'पोर्टल में लॉगिन', aiTitle: 'चार AI मॉडल',
    adminTitle: 'एडमिन कमांड सेंटर', bookings: 'बुकिंग', inQueue: 'कतार में', mspPaid: 'MSP भुगतान',
    langNote: 'भाषा: हिंदी'
  },
  ta: {
    home: 'முகப்பு', centres: 'மையங்கள்', crops: 'பயிர்கள்', schemes: 'திட்டங்கள்', track: 'கண்காணி', news: 'செய்திகள்',
    login: 'உள்நுழை', signup: 'பதிவு', logout: 'வெளியேறு', profile: 'சுயவிவரம்',
    heroTitle: 'பண்ணையிலிருந்து சந்தை வரை — <em>காத்திருப்பு இல்லை</em>, நியாயமான MSP',
    heroSub: 'நிமிடங்களில் ஸ்லாட் பதிவு, AI தர சோதனை, உங்கள் மொழியில் SMS, நேரடி பணம்.',
    regFarmer: 'விவசாயியாக பதிவு', loginPortal: 'போர்டலில் உள்நுழை', aiTitle: 'நான்கு AI மாதிரிகள்',
    adminTitle: 'நிர்வாக கட்டளை மையம்', bookings: 'பதிவுகள்', inQueue: 'வரிசையில்', mspPaid: 'MSP செலுத்தியது',
    langNote: 'மொழி: தமிழ்'
  }
};

let currentLang = localStorage.getItem('af_lang') || 'en';

function setLang(lang, quiet) {
  currentLang = TEXT[lang] ? lang : 'en';
  localStorage.setItem('af_lang', currentLang);

  document.querySelectorAll('[data-lang]').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === currentLang);
  });
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const text = TEXT[currentLang][el.dataset.i18n];
    if (text) el.innerHTML = text;
  });

  if (!quiet) toast(TEXT[currentLang].langNote);
}

/* ---------- 5. Login, register, logout ---------- */

// Pages live in /pages, the home page is one folder up
const IN_PAGES = location.pathname.includes('/pages/');
const ROOT = IN_PAGES ? '../' : '';
const PAGES = IN_PAGES ? '' : 'pages/';

function getUser() {
  return getData('user', null);
}

function updateUser(changes) {
  const user = { ...getUser(), ...changes };
  setData('user', user);
  return user;
}

function login(email, password) {
  email = email.trim().toLowerCase();
  const everyone = DEMO_USERS.concat(getData('registry'));
  const user = everyone.find(u => u.email.toLowerCase() === email && u.password === password);
  if (user) setData('user', user);
  return user || null;
}

function register(data) {
  const registry = getData('registry');
  const taken = DEMO_USERS.concat(registry).some(u => u.email.toLowerCase() === data.email.toLowerCase());
  if (taken) return { ok: false, msg: 'Email already registered. Please login.' };

  const user = {
    ...data,
    id: (data.role === 'farmer' ? 'F-AF' : 'B-AF') + Date.now().toString().slice(-5),
    creditScore: data.role === 'farmer' ? 700 + Math.floor(Math.random() * 50) : null,
    aadhaarVerified: false
  };
  registry.push(user);
  setData('registry', registry);
  setData('user', user);
  return { ok: true, user };
}

function logout() {
  localStorage.removeItem('af_user');
  location.href = ROOT + 'index.html';
}

function portalUrl(role) {
  const page = { farmer: 'farmer.html', buyer: 'buyer.html', admin: 'admin.html' }[role] || 'login.html';
  return PAGES + page;
}

// Call at the top of a private page. Sends the visitor away if they may not see it.
function requireAuth(role) {
  const user = getUser();
  if (!user) {
    location.replace(PAGES + 'login.html');
    return null;
  }
  if (role && user.role !== role) {
    location.replace(portalUrl(user.role));
    return null;
  }
  return user;
}

// Credit score = starting score + points earned from paid MSP lots (max 900)
function getCreditScore(user) {
  const bonus = getData('credit_bonus', {})[user.id] || 0;
  return Math.min(900, (user.creditScore || 700) + bonus);
}

function addCreditBonus(farmerId, qualityScore) {
  const bonus = getData('credit_bonus', {});
  const points = qualityScore >= 80 ? 8 : qualityScore >= 50 ? 4 : 1;
  bonus[farmerId] = (bonus[farmerId] || 0) + points;
  setData('credit_bonus', bonus);
}

/* ---------- 6. Small helpers ---------- */

function toast(message, isError) {
  document.querySelectorAll('.app-toast').forEach(t => t.remove());
  const box = document.createElement('div');
  box.className = 'app-toast' + (isError ? ' err' : '');
  box.textContent = message;
  document.body.appendChild(box);
  setTimeout(() => box.remove(), 3000);
}

// Makes user-typed text safe to put inside HTML
function esc(text) {
  return String(text ?? '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

// Short random id such as "AF4821"
function newId(prefix) {
  return prefix + Math.floor(1000 + Math.random() * 9000);
}

function rupees(amount) {
  return '₹' + Number(amount || 0).toLocaleString('en-IN');
}

// A short fingerprint of a record, so changes to it can be noticed (demo only)
function integrityHash(text) {
  let hash = 2166136261;
  for (const ch of String(text)) {
    hash = Math.imul(hash ^ ch.charCodeAt(0), 16777619);
  }
  return 'AF' + (hash >>> 0).toString(16).toUpperCase().padStart(8, '0');
}

// Fills a <select class="form-select form-select"> with options. items = list of [value, label]
function fillSelect(id, items) {
  document.getElementById(id).innerHTML = items
    .map(([value, label]) => `<option value="${esc(value)}">${esc(label)}</option>`)
    .join('');
}

/* ---------- 7. The four AI models (simulated for the demo) ---------- */

// Model 1: crop advice
function runCropAI(crop, location) {
  const tips = {
    Onion:  { fert: 'NPK 19-19-19 + Sulphur', qty: '45–50 kg/acre', yield: '+12%', note: 'Avoid waterlogging.' },
    Wheat:  { fert: 'Urea + DAP', qty: '50 kg urea/acre', yield: '+10%', note: 'Irrigate at crown root and flowering stages.' },
    Paddy:  { fert: 'NPK 20-20-0 + Zinc', qty: '40 kg/acre', yield: '+15%', note: 'Keep 2–5 cm standing water.' },
    Tomato: { fert: 'NPK 19-19-19', qty: '40 kg/acre', yield: '+11%', note: 'Stake plants; watch for leaf curl virus.' },
    Chilli: { fert: 'NPK + micronutrients', qty: '35 kg/acre', yield: '+14%', note: 'Guntur belt preferred.' },
    Maize:  { fert: 'NPK 120:60:40', qty: 'As per soil test', yield: '+10%', note: 'Needs good drainage.' }
  };
  const tip = tips[crop] || { fert: 'Balanced NPK (soil test)', qty: '40 kg/acre', yield: '+10%', note: 'Follow local KVK advice.' };
  return { crop, location, ...tip };
}

// Model 2: chat assistant – see section 8

// Model 3: quality check (random grade for the demo)
function runQualityAI() {
  const results = [
    { grade: 'GOOD', score: 94, conf: 91, defects: 'Clean surface, uniform size' },
    { grade: 'GOOD', score: 88, conf: 86, defects: 'Minor surface marks only' },
    { grade: 'GOOD', score: 82, conf: 80, defects: 'Slight colour variation' },
    { grade: 'AVERAGE', score: 71, conf: 77, defects: 'Small spots, uneven size' },
    { grade: 'AVERAGE', score: 64, conf: 73, defects: 'Moisture or light blemish' },
    { grade: 'POOR', score: 45, conf: 70, defects: 'Heavy blemish – sort before mandi' }
  ];
  return results[Math.floor(Math.random() * results.length)];
}

// Model 4: logistics – route, transporter and ETA
function runLogisticsAI(from, to, kg) {
  const delay = Math.random() > 0.65 ? Math.floor(Math.random() * 12) + 1 : 0;
  return {
    route: from + ' → ' + to,
    transporter: ['ABC Logistics', 'GreenHaul', 'Mandi Express'][Math.floor(Math.random() * 3)],
    vehicle: kg > 500 ? 'Truck 1.5T' : kg > 150 ? 'Tempo' : 'Mini van',
    etaMin: 25 + Math.floor(Math.random() * 40),
    delayMin: delay,
    status: delay ? 'Slight delay expected' : 'On time'
  };
}

// Shows a quality result as HTML (used by booking page and AI page)
function qualityHtml(q) {
  const badge = q.grade === 'GOOD' ? 'badge-ok' : 'badge-pend';
  return `<h2>${q.score} / 100</h2>
    <span class="badge ${badge}">${q.grade}</span>
    <p class="small">Confidence ${q.conf}% · ${q.defects}</p>`;
}

/* ---------- 8. Chat assistant (Model 2) ---------- */

// Each rule: if the question matches the pattern, give that answer
const CHAT_RULES = [
  [/farmer.?id|my id/, user => (user?.role === 'farmer' ? `Your Farmer ID is ${user.id}. ` : '') +
    'Every farmer gets a unique Farmer ID at registration. It links Aadhaar, slots, quality, tracking, MSP payment and credit score.'],
  [/login|password|account/, () => 'Open Login, pick Farmer, Buyer or Admin – the demo email and password fill in automatically. You stay logged in until you press Logout.'],
  [/slot|book|queue|मंडी|स्लॉट|ஸ்லாட்/, () => 'Farmer portal → Book MSP slot → choose centre, crop, quantity, date and time → AI quality check → confirm → you get a token. Track it on the Track page.'],
  [/quality|grade|गुणवत्ता|தரம்/, () => 'The AI quality check grades produce as Good, Average or Poor before weighing. In this demo the grade is simulated.'],
  [/logistic|transport|eta/, () => 'Logistics AI suggests a vehicle and an ETA from your farm to the centre. Open the Logistics page.'],
  [/crop|fertili|yield|फसल|பயிர்/, () => 'Crop AI: choose crop and location on the AI tools page to get fertilizer advice and expected yield.'],
  [/credit|loan|kcc|ऋण|கடன்/, user => (user?.role === 'farmer' ? `Your credit score is ${getCreditScore(user)}. ` : '') +
    'The score goes up when MSP lots are paid with good quality grades. Use the loan enquiry on the Farmer portal.'],
  [/scheme|kisan|pmfby|subsidy|योजना|திட்டம்/, () => 'Schemes: PM-KISAN, PMFBY crop insurance, MSP procurement, Kisan Credit Card, fertilizer subsidy and e-NAM. See the Schemes page.'],
  [/pay|msp|upi|भुगतान|பணம்/, () => 'Farmers never pay to sell – MSP is paid to the farmer after approval. Buyers pay by UPI, card, Razorpay, Paytm or cash on pickup (demo).'],
  [/buy|order|buyer/, () => 'Buyer portal: browse crops, press Buy now, choose quantity and payment, then track your order.'],
  [/admin|doca/, () => 'The admin portal shows the booking queue. Clicking a booking moves it to the next stage and logs an SMS.'],
  [/aadhaar|otp|kyc/, () => 'Profile → Aadhaar: enter 12 digits, press Send OTP, then enter the OTP (demo: 123456).'],
  [/bank|ifsc/, () => 'Farmer portal → Bank: enter account number and IFSC to link it to your Farmer ID.'],
  [/collab|circle|share/, () => 'Collab Circle: nearby farmers share slot space, transport and listings in groups.'],
  [/\b(hello|hi|hey|namaste|vanakkam)\b|नमस्ते|வணக்கம்/, user => `Namaste ${user?.name || 'friend'}! Ask me about slots, quality, payments, credit, schemes or orders.`]
];

function aiReply(question) {
  const q = question.toLowerCase();
  const rule = CHAT_RULES.find(([pattern]) => pattern.test(q));
  if (rule) return rule[1](getUser());
  return 'Sorry, I did not understand. Try: book slot, quality, MSP payment, credit score, loan, schemes, buyer order or admin.';
}

// Connects a message box, input and send button. Used by the pop-up chat and the AI page.
function setupChat(msgsId, inputId, sendId) {
  const msgs = document.getElementById(msgsId);
  const input = document.getElementById(inputId);

  function addMessage(text, fromUser) {
    const div = document.createElement('div');
    div.className = 'msg' + (fromUser ? ' user' : '');
    div.textContent = text;
    msgs.appendChild(div);
    msgs.scrollTop = msgs.scrollHeight;
  }

  function ask(text) {
    text = (text || input.value).trim();
    if (!text) return;
    addMessage(text, true);
    addMessage(aiReply(text), false);
    input.value = '';
  }

  addMessage(`Hi! I am the ${ASSISTANT_NAME}. Ask about slots, quality, payments, credit, schemes or orders.`, false);
  document.getElementById(sendId).onclick = () => ask();
  input.onkeydown = e => { if (e.key === 'Enter') ask(); };
  return ask;
}

// Adds the round chat button to the corner of the page
function addChatWidget() {
  document.body.insertAdjacentHTML('beforeend', `
    <button class="chat-fab" id="chatFab" title="${ASSISTANT_NAME}">💬</button>
    <div class="chat-panel" id="chatPanel">
      <div class="chat-head">${ASSISTANT_NAME} <button id="chatClose">×</button></div>
      <div class="chat-msgs" id="chatMsgs"></div>
      <div class="chat-input">
        <input class="form-control" id="chatInput" placeholder="Ask a question…">
        <button class="btn btn-primary" id="chatSend">Send</button>
      </div>
    </div>`);
  const panel = document.getElementById('chatPanel');
  document.getElementById('chatFab').onclick = () => panel.classList.toggle('open');
  document.getElementById('chatClose').onclick = () => panel.classList.remove('open');
  setupChat('chatMsgs', 'chatInput', 'chatSend');
}

/* ---------- 9. Page start-up ---------- */

// Top menu for each role: [file, label, language key]
const MENUS = {
  public: [['index.html', 'Home', 'home'], ['centres.html', 'Centres', 'centres'], ['crops.html', 'Crops', 'crops'],
           ['news.html', 'News', 'news'], ['schemes.html', 'Schemes', 'schemes'], ['track.html', 'Track', 'track']],
  farmer: [['farmer.html', 'Dashboard'], ['book.html', 'MSP Slot'], ['sell.html', 'Sell'], ['collab.html', 'Collab'],
           ['ai.html', 'AI Tools'], ['logistics.html', 'Logistics'], ['bank.html', 'Bank'], ['track.html', 'Track', 'track']],
  buyer:  [['buyer.html', 'Shop'], ['checkout.html', 'Checkout'], ['track.html', 'Track', 'track'], ['logistics.html', 'Logistics']],
  admin:  [['admin.html', 'Command centre'], ['centres.html', 'Centres', 'centres'], ['logistics.html', 'Logistics'], ['track.html', 'Track', 'track']]
};

// Builds the Bootstrap navbar. <nav class="nav" data-menu="public"> forces the public menu,
// otherwise the menu of the logged-in role is shown.
function showNav() {
  const nav = document.querySelector('nav.nav');
  if (!nav) return;
  const user = getUser();
  const menu = MENUS[nav.dataset.menu] || MENUS[user ? user.role : 'public'];
  const thisPage = location.pathname.split('/').pop() || 'index.html';

  const links = menu.map(([file, label, key]) => {
    const href = file === 'index.html' ? ROOT + file : PAGES + file;
    const active = file === thisPage ? 'active' : '';
    return `<li class="nav-item"><a class="nav-link ${active}" href="${href}" ${key ? `data-i18n="${key}"` : ''}>${label}</a></li>`;
  }).join('');

  const langs = `<div class="btn-group btn-group-sm" role="group" aria-label="Language">
      <button class="btn btn-outline-primary" data-lang="en" onclick="setLang('en')">EN</button>
      <button class="btn btn-outline-primary" data-lang="hi" onclick="setLang('hi')">हिं</button>
      <button class="btn btn-outline-primary" data-lang="ta" onclick="setLang('ta')">தமிழ்</button>
    </div>`;
  const buttons = user
    ? `<a class="btn btn-outline-primary" href="${PAGES}profile.html">👤 ${esc(user.name)}</a>
       <button class="btn btn-outline-primary" onclick="logout()" data-i18n="logout">Logout</button>`
    : `<a class="btn btn-outline-primary" href="${PAGES}login.html" data-i18n="login">Login</a>
       <a class="btn btn-primary" href="${PAGES}register.html" data-i18n="signup">Sign Up</a>`;

  nav.className = 'navbar navbar-expand-lg bg-white border-bottom';
  nav.innerHTML = `
    <div class="container-fluid px-4">
      <a class="navbar-brand fw-bold" href="${ROOT}index.html">🌿 AgriFlow AI</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainMenu" aria-label="Menu">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="mainMenu">
        <ul class="navbar-nav mx-auto">${links}</ul>
        <div class="d-flex flex-wrap gap-2 align-items-center">${langs}${buttons}</div>
      </div>
    </div>`;
}

// Shows the banner / notice / maintenance text set by the admin
function showSiteNotices() {
  const site = getSite();
  const banner = document.getElementById('siteBanner');
  const notice = document.getElementById('siteNotice');
  if (banner && site.banner) banner.textContent = site.banner;
  if (notice && site.notice) notice.textContent = site.notice;
  if (site.maintenance) {
    document.body.insertAdjacentHTML('afterbegin',
      `<div class="bar alert alert-danger rounded-0 mb-0 text-center py-2">Maintenance notice: ${esc(site.notice || 'Some services are limited.')}</div>`);
  }
}

// Sample data is added straight away so page scripts can use it
seedDemoData();

document.addEventListener('DOMContentLoaded', () => {
  showNav();
  showSiteNotices();
  addChatWidget();
  setLang(currentLang, true);
});
