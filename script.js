/* =====================================================================
   ROYAL BLUE PEACOCK — Wedding Invitation
   Plain JavaScript, no dependencies.

   Contents
     1. CONFIG              ← edit your wedding details here
     2. Helpers
     3. SVG ornaments       (mandala, feather, lotus, bell, lamp, arch, divider)
     4. Content rendering   (text, invitation, timeline, events, gallery…)
     5. Particles           (canvas stars / sparkles / petals + opening burst)
     6. Intro & gate
     7. Music
     8. Scroll effects      (reveal, progress, parallax, timeline, nav)
     9. Countdown
    10. Gallery lightbox
    11. RSVP & calendar
    12. Init
   ===================================================================== */
'use strict';

/* =====================================================================
   1. CONFIG
   All dates use ISO format with the India offset (+05:30) so they are
   correct for guests in any country. Photos: put files in an "images"
   folder and write the path, e.g. photo: "images/bride.jpg".
   Leave a photo/src empty ("") to show the decorative placeholder.
   ===================================================================== */
const CONFIG = {
  bride: {
    name: 'Priya',
    nameTamil: 'பிரியா',
    fullName: 'Priya Rajendran',
    parents: 'Mr. R. Rajendran & Mrs. Lakshmi Rajendran',
    parentsTamil: 'திரு. ரா. ராஜேந்திரன் – திருமதி. லட்சுமி ராஜேந்திரன்',
    bio: 'An architect and Bharatanatyam dancer who finds poetry in temple pillars, monsoon evenings and strong filter coffee.',
    photo: '' // e.g. 'images/bride.jpg'
  },
  groom: {
    name: 'Arjun',
    nameTamil: 'அர்ஜுன்',
    fullName: 'Arjun Krishnan',
    parents: 'Mr. S. Krishnan & Mrs. Meenakshi Krishnan',
    parentsTamil: 'திரு. ச. கிருஷ்ணன் – திருமதி. மீனாட்சி கிருஷ்ணன்',
    bio: 'A software engineer with a soft spot for Carnatic music, weekend cricket and long drives along the East Coast Road.',
    photo: '' // e.g. 'images/groom.jpg'
  },

  blessing: '|| Om Sri Ganeshaya Namaha ||',
  hashtag: '#PriyaWedsArjun',
  timeZone: 'Asia/Kolkata', // times are always shown in this zone

  /* Events — mark the main ceremony with main: true (used for the hero date,
     countdown, invitation text and "Add to Calendar").
     icon: 'rings' | 'haldi' | 'kalash' | 'reception' */
  events: [
    {
      name: 'Nichayathartham',
      nameTamil: 'நிச்சயதார்த்தம்',
      icon: 'rings',
      start: '2027-02-10T18:00:00+05:30',
      end: '2027-02-10T21:00:00+05:30',
      venue: 'Rajendran Residence',
      address: '12, Lotus Street, Mylapore, Chennai',
      mapLink: 'https://www.google.com/maps/search/?api=1&query=Mylapore+Chennai',
      note: 'The formal engagement with exchange of thamboolam and blessings from elders.'
    },
    {
      name: 'Haldi & Mehendi',
      nameTamil: 'மஞ்சள் நீராட்டு & மெஹந்தி',
      icon: 'haldi',
      start: '2027-02-11T10:00:00+05:30',
      end: '2027-02-11T14:00:00+05:30',
      venue: 'Garden Lawn, Sri Venkateswara Mahal',
      address: 'T. Nagar, Chennai',
      mapLink: 'https://www.google.com/maps/search/?api=1&query=T+Nagar+Chennai',
      note: 'Turmeric, henna, music and laughter. Do wear yellow or green!'
    },
    {
      name: 'Muhurtham',
      nameTamil: 'முகூர்த்தம்',
      icon: 'kalash',
      main: true,
      start: '2027-02-12T09:00:00+05:30',
      end: '2027-02-12T10:30:00+05:30',
      venue: 'Sri Venkateswara Mahal',
      address: '45, Thyagaraya Road, T. Nagar, Chennai',
      mapLink: 'https://www.google.com/maps/search/?api=1&query=T+Nagar+Chennai',
      note: 'The sacred tying of the thaali, followed by the wedding feast.'
    },
    {
      name: 'Reception',
      nameTamil: 'வரவேற்பு',
      icon: 'reception',
      start: '2027-02-12T18:30:00+05:30',
      end: '2027-02-12T22:00:00+05:30',
      venue: 'The Peacock Ballroom',
      address: 'Anna Salai, Teynampet, Chennai',
      mapLink: 'https://www.google.com/maps/search/?api=1&query=Teynampet+Chennai',
      note: 'An evening of music, dinner and celebration with the newly-weds.'
    }
  ],

  venue: {
    name: 'Sri Venkateswara Mahal',
    nameTamil: 'ஸ்ரீ வெங்கடேஸ்வரா மஹால், சென்னை',
    address: '45, Thyagaraya Road, T. Nagar, Chennai – 600017',
    landmark: 'Near Panagal Park',
    city: 'Chennai, Tamil Nadu',
    // Google Maps → Share → "Embed a map" → copy only the src="…" URL here
    mapEmbed: 'https://www.google.com/maps?q=Panagal+Park,+T.+Nagar,+Chennai&output=embed',
    directions: 'https://www.google.com/maps/dir/?api=1&destination=Panagal+Park,+T.+Nagar,+Chennai'
  },

  rsvp: {
    whatsappNumber: '919876543210', // country code + number, no "+" or spaces
    deadline: '25 January 2027',
    maxGuests: 10
  },

  music: {
    src: 'assets/music/nadaswaram.mp3', // set to '' to hide the music button
    volume: 0.6
  },

  story: [
    { date: 'June 2019', title: 'The First Hello', text: 'A shared umbrella at a rainy Chennai bus stop turned into an hour-long conversation about Ilaiyaraaja.' },
    { date: 'December 2020', title: 'Margazhi Season', text: 'Front-row seats at a Carnatic kutcheri — and the realisation that this was more than friendship.' },
    { date: 'August 2023', title: 'Families Meet', text: 'Two families, one long lunch on banana leaves, and a lot of happy tears.' },
    { date: 'November 2025', title: 'The Proposal', text: 'Under a sky full of stars at Mahabalipuram, with the waves as witnesses, she said yes.' },
    { date: 'February 2027', title: 'Forever Begins', text: 'With the blessings of our elders, we begin our journey together — and we want you there.' }
  ],

  // Gallery — add as many as you like. ratio only affects the placeholder shape.
  gallery: [
    { src: '', caption: 'Our first trip', ratio: 1.3 },
    { src: '', caption: 'Margazhi mornings', ratio: 0.8 },
    { src: '', caption: 'The proposal', ratio: 1.15 },
    { src: '', caption: 'Engagement day', ratio: 1.45 },
    { src: '', caption: 'Family lunch', ratio: 0.9 },
    { src: '', caption: 'Beach sunsets', ratio: 1.2 },
    { src: '', caption: 'Temple visit', ratio: 1 },
    { src: '', caption: 'Pre-wedding shoot', ratio: 1.35 },
    { src: '', caption: 'Laughing together', ratio: 0.85 }
  ],

  compliments: ['The Rajendran Family', 'The Krishnan Family', 'Near & Dear Relatives and Friends'],

  thankYou: {
    ta: 'தங்கள் அன்பான வருகைக்கும் ஆசீர்வாதங்களுக்கும் எங்கள் மனமார்ந்த நன்றி.',
    en: 'Thank you for your love and blessings — your presence makes our celebration complete.'
  },

  /* Invitation text. Tokens in {curly braces} are filled in automatically.
     style: small | body | parents | connector | names | details | closing */
  invitation: {
    en: [
      { style: 'small', text: 'With the divine blessings of Lord Ganesha and our elders' },
      { style: 'parents', text: '{brideParents}' },
      { style: 'connector', text: 'and' },
      { style: 'parents', text: '{groomParents}' },
      { style: 'body', text: 'joyfully request the pleasure of your company at the wedding of their beloved children' },
      { style: 'names', text: '{bride} & {groom}' },
      { style: 'details', text: '{date}' },
      { style: 'details', text: 'Muhurtham between {time}' },
      { style: 'details', text: '{venue}, {city}' },
      { style: 'closing', text: 'Your gracious presence and blessings will make our celebration complete.' }
    ],
    ta: [
      { style: 'small', text: 'விநாயகர் துணை' },
      { style: 'body', text: 'இறையருளாலும் பெரியோர்களின் நல்லாசியுடனும்' },
      { style: 'parents', text: '{brideParentsTa}' },
      { style: 'body', text: 'அவர்களின் அன்பு மகள்' },
      { style: 'names', text: 'திருநிறைச்செல்வி {brideTa}' },
      { style: 'connector', text: '&' },
      { style: 'parents', text: '{groomParentsTa}' },
      { style: 'body', text: 'அவர்களின் அன்பு மகன்' },
      { style: 'names', text: 'திருநிறைச்செல்வன் {groomTa}' },
      { style: 'body', text: 'ஆகியோரின் திருமணம்' },
      { style: 'details', text: '{dateTa}, {timeTa}' },
      { style: 'details', text: '{venueTa}' },
      { style: 'body', text: 'சுபமுகூர்த்தத்தில் நடைபெற உள்ளது.' },
      { style: 'closing', text: 'தாங்கள் சுற்றமும் நட்பும் சூழ வருகை தந்து மணமக்களை வாழ்த்தியருளுமாறு அன்புடன் அழைக்கிறோம்.' }
    ]
  }
};


/* =====================================================================
   2. HELPERS
   ===================================================================== */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const FINE_HOVER = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
const rand = (min, max) => min + Math.random() * (max - min);
const pick = arr => arr[Math.floor(Math.random() * arr.length)];
const clamp = (v, min, max) => Math.min(max, Math.max(min, v));
const later = (ms, fn) => window.setTimeout(fn, ms);

const esc = str => String(str ?? '').replace(/[&<>"']/g, ch => (
  { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]
));

/** Read a nested value: getPath(CONFIG, 'bride.name') */
const getPath = (obj, path) => path.split('.').reduce((o, k) => (o == null ? o : o[k]), obj);

/** Theme colours come from the CSS variables so the SVGs follow style.css */
const cssVar = name => getComputedStyle(document.documentElement).getPropertyValue(name).trim();

const MAIN_EVENT = CONFIG.events.find(e => e.main) || CONFIG.events[0];

/* Date formatting — always in the wedding's time zone */
function fmt(iso, opts, locale = 'en-IN') {
  return new Intl.DateTimeFormat(locale, { timeZone: CONFIG.timeZone, ...opts }).format(new Date(iso));
}
const fmtDateLong = iso => fmt(iso, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
const fmtDateShort = iso => fmt(iso, { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
const fmtTime = iso => fmt(iso, { hour: 'numeric', minute: '2-digit', hour12: true }).toUpperCase();

/** "9.00" style time plus a Tamil period word (காலை / மதியம் / மாலை / இரவு) */
function tamilTime(iso) {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: CONFIG.timeZone, hour: 'numeric', minute: '2-digit', hour12: false
  }).formatToParts(new Date(iso));
  const h = +parts.find(p => p.type === 'hour').value;
  const m = parts.find(p => p.type === 'minute').value;
  const period = h < 12 ? 'காலை' : h < 16 ? 'மதியம்' : h < 19 ? 'மாலை' : 'இரவு';
  return { period, text: `${h % 12 || 12}.${m}` };
}

/** Replace {tokens} in invitation lines */
function fillTokens(str) {
  const s = tamilTime(MAIN_EVENT.start);
  const e = tamilTime(MAIN_EVENT.end);
  const tokens = {
    bride: CONFIG.bride.name,
    groom: CONFIG.groom.name,
    brideParents: CONFIG.bride.parents,
    groomParents: CONFIG.groom.parents,
    date: fmtDateLong(MAIN_EVENT.start),
    time: `${fmtTime(MAIN_EVENT.start)} and ${fmtTime(MAIN_EVENT.end)}`,
    venue: CONFIG.venue.name,
    city: CONFIG.venue.city,
    brideTa: CONFIG.bride.nameTamil,
    groomTa: CONFIG.groom.nameTamil,
    brideParentsTa: CONFIG.bride.parentsTamil,
    groomParentsTa: CONFIG.groom.parentsTamil,
    dateTa: fmt(MAIN_EVENT.start, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }, 'ta-IN'),
    timeTa: `${s.period} ${s.text} – ${e.text} மணி`,
    venueTa: CONFIG.venue.nameTamil
  };
  return str.replace(/\{(\w+)\}/g, (m, key) => (key in tokens ? tokens[key] : m));
}

let toastTimer;
function toast(message, ms = 3200) {
  const el = $('#toast');
  el.textContent = message;
  el.classList.add('is-visible');
  clearTimeout(toastTimer);
  toastTimer = later(ms, () => el.classList.remove('is-visible'));
}


/* =====================================================================
   3. SVG ORNAMENTS
   Built once into the hidden <defs> and reused everywhere with <use>.
   ===================================================================== */
const ring = (count, fn) => Array.from({ length: count }, (_, i) => fn(i, (360 / count) * i)).join('');

function buildOrnaments() {
  const C = {
    navy: cssVar('--navy'), royal: cssVar('--royal'), royalMid: cssVar('--royal-mid'),
    teal: cssVar('--teal'), sky: cssVar('--sky'), ivory: cssVar('--ivory'), gold: cssVar('--gold')
  };

  /* --- Peacock feather barbs, generated along the quill --- */
  let barbs = '';
  for (let y = 412, i = 0; y >= 40; y -= 5, i++) {
    const t = (412 - y) / 372;                      // 0 at base → 1 at tip
    let len = 7 + 46 * Math.min(1, Math.pow(t / 0.72, 1.3));
    if (t > 0.86) len *= 1 - ((t - 0.86) / 0.14) * 0.6;
    const col = i % 2 ? C.teal : C.royalMid;
    const qx = len * 0.55, qy = len * 0.18, ey = len * 0.62;
    barbs += `<path d="M60 ${y}q${-qx} ${-qy} ${-len} ${-ey}M60 ${y}q${qx} ${-qy} ${len} ${-ey}" stroke="${col}"/>`;
  }

  const defs = `
    <linearGradient id="g-gold" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#F7E7A6"/><stop offset=".5" stop-color="${C.gold}"/><stop offset="1" stop-color="#8F6F17"/>
    </linearGradient>
    <radialGradient id="g-royal" cx=".5" cy=".75" r=".85">
      <stop offset="0" stop-color="${C.royalMid}"/><stop offset="1" stop-color="${C.navy}"/>
    </radialGradient>
    <linearGradient id="g-sky" x1="0" y1="1" x2="0" y2="0">
      <stop offset="0" stop-color="${C.royal}"/><stop offset="1" stop-color="${C.sky}"/>
    </linearGradient>
    <radialGradient id="g-eye" cx=".5" cy=".58" r=".55">
      <stop offset="0" stop-color="${C.teal}"/><stop offset=".72" stop-color="#2f9c8e"/><stop offset="1" stop-color="${C.gold}"/>
    </radialGradient>
    <radialGradient id="g-aura" cx=".5" cy=".5" r=".5">
      <stop offset="0" stop-color="${C.teal}" stop-opacity=".45"/><stop offset="1" stop-color="${C.teal}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="g-lotus-1" x1="0" y1="1" x2="0" y2="0">
      <stop offset="0" stop-color="${C.royal}"/><stop offset="1" stop-color="${C.sky}"/>
    </linearGradient>
    <linearGradient id="g-lotus-2" x1="0" y1="1" x2="0" y2="0">
      <stop offset="0" stop-color="${C.navy}"/><stop offset="1" stop-color="#7aa3e6"/>
    </linearGradient>
    <linearGradient id="g-lotus-3" x1="0" y1="1" x2="0" y2="0">
      <stop offset="0" stop-color="${C.navy}"/><stop offset="1" stop-color="${C.royalMid}"/>
    </linearGradient>

    <path id="m-petal" d="M0 0C-7-6-7-18 0-26C7-18 7-6 0 0Z"/>
    <g id="m-eye">
      <ellipse rx="8" ry="13" fill="${C.teal}" stroke="${C.gold}" stroke-width=".6"/>
      <ellipse cy="1.5" rx="5.2" ry="8.6" fill="${C.royal}"/>
      <ellipse cy="3" rx="2.6" ry="4.2" fill="${C.navy}"/>
    </g>

    <!-- Large mandala: royal petals, peacock eyes, sky lotus core -->
    <symbol id="sym-mandala" viewBox="-100 -100 200 200">
      <circle r="97" fill="none" stroke="${C.gold}" stroke-width=".6" opacity=".8"/>
      <circle r="93.5" fill="none" stroke="${C.sky}" stroke-width=".5" stroke-dasharray="1 3" opacity=".7"/>
      ${ring(32, (i, a) => `<use href="#m-petal" transform="rotate(${a}) translate(0 -66) scale(.95)" fill="url(#g-royal)" stroke="${C.gold}" stroke-width=".5"/>`)}
      <circle r="66" fill="${C.navy}" fill-opacity=".55" stroke="${C.gold}" stroke-width=".7"/>
      ${ring(16, (i, a) => `<use href="#m-eye" transform="rotate(${a + 11.25}) translate(0 -50)"/>`)}
      <circle r="35" fill="${C.navy}" fill-opacity=".4" stroke="${C.gold}" stroke-width=".6"/>
      ${ring(12, (i, a) => `<use href="#m-petal" transform="rotate(${a}) translate(0 -8) scale(1.04)" fill="url(#g-sky)" stroke="${C.gold}" stroke-width=".5"/>`)}
      ${ring(8, (i, a) => `<use href="#m-petal" transform="rotate(${a + 22.5}) translate(0 -4) scale(.6)" fill="${C.teal}" stroke="${C.gold}" stroke-width=".4"/>`)}
      <circle r="9" fill="${C.navy}" stroke="${C.gold}" stroke-width=".8"/>
      <circle r="3.5" fill="${C.gold}"/>
    </symbol>

    <!-- Mandala ring with an empty centre (countdown & couple frames) -->
    <symbol id="sym-ring" viewBox="-100 -100 200 200">
      <circle r="98" fill="none" stroke="${C.gold}" stroke-width=".6" opacity=".7"/>
      ${ring(36, (i, a) => `<use href="#m-petal" transform="rotate(${a}) translate(0 -74) scale(.82)" fill="url(#g-royal)" stroke="${C.gold}" stroke-width=".45"/>`)}
      <circle r="74" fill="none" stroke="${C.gold}" stroke-width=".9"/>
      <circle r="69" fill="none" stroke="${C.teal}" stroke-width="1.4" stroke-dasharray="2 4"/>
      ${ring(24, (i, a) => `<circle cy="-64" r="1.4" transform="rotate(${a})" fill="${C.sky}"/>`)}
      <circle r="60" fill="none" stroke="${C.gold}" stroke-opacity=".45" stroke-width=".5"/>
    </symbol>

    <!-- Peacock feather -->
    <symbol id="sym-feather" viewBox="0 0 120 420">
      <ellipse cx="60" cy="100" rx="58" ry="80" fill="url(#g-aura)"/>
      <g fill="none" stroke-width=".9" stroke-linecap="round" opacity=".8">${barbs}</g>
      <path d="M60 418C59 330 61 220 60 60" fill="none" stroke="${C.gold}" stroke-width="1.6" opacity=".9"/>
      <ellipse cx="60" cy="98" rx="34" ry="44" fill="url(#g-eye)" stroke="${C.gold}" stroke-width=".8"/>
      <ellipse cx="60" cy="103" rx="24" ry="32" fill="${C.teal}"/>
      <ellipse cx="60" cy="107" rx="16.5" ry="22" fill="${C.royal}" stroke="${C.sky}" stroke-opacity=".4" stroke-width=".6"/>
      <path d="M60 124C49 115 46 102 51 95C55 90 60 92 60 97C60 92 65 90 69 95C74 102 71 115 60 124Z" fill="${C.navy}"/>
      <ellipse cx="55" cy="101" rx="2.4" ry="4" fill="${C.sky}" opacity=".55"/>
    </symbol>

    <!-- Blue lotus -->
    <symbol id="sym-lotus" viewBox="-50 -50 100 62">
      <g stroke="${C.gold}" stroke-width="1" stroke-linejoin="round">
        <path d="M0 6C-20 6-40-4-47-20C-29-23-10-13 0 6Z" fill="url(#g-lotus-3)"/>
        <path d="M0 6C20 6 40-4 47-20C29-23 10-13 0 6Z" fill="url(#g-lotus-3)"/>
        <path d="M0 6C-16 0-28-18-27-38C-13-32-3-18 0 6Z" fill="url(#g-lotus-2)"/>
        <path d="M0 6C16 0 28-18 27-38C13-32 3-18 0 6Z" fill="url(#g-lotus-2)"/>
        <path d="M0 6C-12-8-13-28 0-46C13-28 12-8 0 6Z" fill="url(#g-lotus-1)"/>
        <path d="M-32 9Q0 16 32 9" fill="none" stroke-linecap="round"/>
      </g>
    </symbol>

    <!-- Temple bell -->
    <symbol id="sym-bell" viewBox="0 0 40 60">
      <circle cx="20" cy="4.5" r="3.2" fill="none" stroke="${C.gold}" stroke-width="1.6"/>
      <path d="M20 8C12 8 10 16 10 26C10 34 7 39 4 43H36C33 39 30 34 30 26C30 16 28 8 20 8Z" fill="url(#g-gold)"/>
      <path d="M11 22H29M10.4 30H29.6" stroke="#8F6F17" stroke-width=".8" opacity=".7"/>
      <rect x="2.5" y="42.5" width="35" height="4.5" rx="2.2" fill="url(#g-gold)"/>
      <circle cx="20" cy="52" r="4" fill="url(#g-gold)"/>
      <path d="M15 14C14 18 13.5 22 13.5 28" fill="none" stroke="#fff" stroke-opacity=".5" stroke-width="1.2" stroke-linecap="round"/>
    </symbol>

    <!-- Hanging lamp (flame is a separate animated HTML element) -->
    <symbol id="sym-lamp" viewBox="0 0 60 80">
      <path d="M30 3L6 33M30 3L54 33M30 3V33" fill="none" stroke="${C.gold}" stroke-width=".9" opacity=".9"/>
      <circle cx="30" cy="3" r="2.6" fill="none" stroke="${C.gold}" stroke-width="1.2"/>
      <path d="M3 33H57C55 47 43 54 30 54C17 54 5 47 3 33Z" fill="url(#g-gold)"/>
      <ellipse cx="30" cy="33.5" rx="27" ry="3.6" fill="#7a5c12"/>
      <path d="M7 40H53" stroke="#8F6F17" stroke-width=".8" opacity=".7"/>
      ${[16, 23, 30, 37, 44].map(x => `<circle cx="${x}" cy="45" r="1.2" fill="#8F6F17"/>`).join('')}
      <path d="M30 54V62" stroke="${C.gold}" stroke-width="1"/>
      <path d="M30 61C34 65 34 72 30 77C26 72 26 65 30 61Z" fill="url(#g-gold)"/>
    </symbol>`;

  $('#svgDefs').insertAdjacentHTML('beforeend', defs);

  // Jharokha arches & line-drawing dividers
  $$('[data-arch]').forEach(svg => { svg.innerHTML = archMarkup(); });
  $$('[data-divider]').forEach(el => { el.innerHTML = DIVIDER_SVG; });
}

/** Scalloped (multi-foil) palace-window arch, viewBox 0 0 400 170 */
function archMarkup() {
  const W = 400, H = 170, E = 2, S = 104, A = 26, SEGMENTS = 14;
  let d = `M${E} ${H}L${E} ${S}`;
  let prev = [E, S];
  for (let i = 1; i <= SEGMENTS; i++) {
    const th = Math.PI * i / SEGMENTS;
    const x = 200 - (200 - E) * Math.cos(th);
    const y = S - (S - A) * Math.sin(th);
    const r = (Math.hypot(x - prev[0], y - prev[1]) * 0.58).toFixed(2);
    d += `A${r} ${r} 0 0 1 ${x.toFixed(2)} ${y.toFixed(2)}`;
    prev = [x, y];
  }
  d += `L${W - E} ${H}`;
  const inner = `M14 ${H}L14 110A186 70 0 0 1 386 110L386 ${H}`;
  return `
    <path class="arch-fill" d="${d}Z"/>
    <path class="arch-line" d="${d}"/>
    <path class="arch-inner" d="${inner}"/>
    <use href="#sym-lotus" x="181" y="1" width="38" height="24"/>`;
}

/* Line-drawn divider: paisley curls, a mini peacock eye, and a lotus */
const DIVIDER_SIDE = `
  <path class="draw" pathLength="1" d="M18 34H186"/>
  <path class="draw draw--accent" pathLength="1" d="M70 34C84 24 106 24 120 34C106 44 84 44 70 34Z"/>
  <path class="draw" pathLength="1" d="M101 34a5 5 0 1 0 10 0a5 5 0 1 0-10 0"/>
  <path class="draw" pathLength="1" d="M186 34C210 34 216 16 236 16C250 16 254 30 244 34C236 37 230 27 238 25"/>
  <path class="draw" pathLength="1" d="M250 34H262"/>
  <circle class="dot" cx="11" cy="34" r="2.4"/>
  <circle class="dot" cx="268" cy="34" r="1.8"/>`;
const DIVIDER_SVG = `
<svg viewBox="0 0 600 64" aria-hidden="true">
  <g>${DIVIDER_SIDE}</g>
  <g transform="translate(600 0) scale(-1 1)">${DIVIDER_SIDE}</g>
  <g transform="translate(300 34)">
    <path class="draw draw--accent" pathLength="1" d="M0 10C-10-2-10-18 0-30C10-18 10-2 0 10Z"/>
    <path class="draw" pathLength="1" d="M0 10C-14 6-22-6-22-20C-10-16-2-6 0 10Z"/>
    <path class="draw" pathLength="1" d="M0 10C14 6 22-6 22-20C10-16 2-6 0 10Z"/>
    <path class="draw" pathLength="1" d="M0 10C-18 12-30 6-36-4C-24-6-10-2 0 10Z"/>
    <path class="draw" pathLength="1" d="M0 10C18 12 30 6 36-4C24-6 10-2 0 10Z"/>
    <path class="draw" pathLength="1" d="M-26 17Q0 25 26 17"/>
  </g>
</svg>`;

/* Event icons (stroke-only, 64×64) */
const ICONS = {
  rings: '<svg viewBox="0 0 64 64"><circle cx="25" cy="38" r="13"/><circle cx="40" cy="38" r="13"/><path d="M25 15l4 4-4 5-4-5z"/><path d="M50 12v6M47 15h6M12 16v4M10 18h4"/></svg>',
  haldi: '<svg viewBox="0 0 64 64"><path d="M10 36h44a22 15 0 0 1-44 0z"/><path d="M17 36c4-8 26-8 30 0"/><path d="M32 28c-7-6-7-15 0-20 7 5 7 14 0 20z"/><path d="M32 28V14"/><path d="M22 54h20"/><path d="M14 18c4 0 6 3 6 6M50 18c-4 0-6 3-6 6"/></svg>',
  kalash: '<svg viewBox="0 0 64 64"><path d="M20 41c0-9 6-13 12-13s12 4 12 13-5 14-12 14-12-5-12-14z"/><path d="M25 28h14M27 28v-3h10v3"/><ellipse cx="32" cy="17" rx="6" ry="7"/><path d="M27 24c-6-1-11-5-13-11 7 0 11 4 13 11zM37 24c6-1 11-5 13-11-7 0-11 4-13 11z"/><path d="M21 39h22"/><circle cx="32" cy="45" r="2.5"/><path d="M24 58h16"/></svg>',
  reception: '<svg viewBox="0 0 64 64"><path d="M12 40h40c-3 9-12 13-20 13s-17-4-20-13z"/><path d="M52 40c3-1 5-3 6-6"/><path d="M32 36c-6-5-5-12 0-18 5 6 6 13 0 18z"/><path d="M14 14l1.6 4 4 1.6-4 1.6-1.6 4-1.6-4-4-1.6 4-1.6zM50 8l1.2 3 3 1.2-3 1.2-1.2 3-1.2-3-3-1.2 3-1.2z"/><path d="M26 58h12"/></svg>'
};
const DETAIL_ICONS = {
  date: '<svg viewBox="0 0 24 24"><path d="M7 2v2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-2V2h-2v2H9V2H7zM5 9h14v11H5V9z"/></svg>',
  time: '<svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm1 5v5.4l3.6 2.1-1 1.7L11 13.6V7h2z"/></svg>',
  place: '<svg viewBox="0 0 24 24"><path d="M12 2C8 2 5 5 5 9c0 5 7 13 7 13s7-8 7-13c0-4-3-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z"/></svg>'
};


/* =====================================================================
   4. CONTENT RENDERING
   ===================================================================== */

/** Fill every [data-bind="path.in.config"] element */
function bindContent() {
  CONFIG.bride.initial = CONFIG.bride.name.charAt(0);
  CONFIG.groom.initial = CONFIG.groom.name.charAt(0);

  $$('[data-bind]').forEach(el => {
    const value = getPath(CONFIG, el.dataset.bind);
    if (value) el.textContent = value;
    else el.hidden = true;
  });

  document.title = `${CONFIG.bride.name} & ${CONFIG.groom.name} · Wedding Invitation`;

  const start = MAIN_EVENT.start;
  const heroDate = $('#heroDate');
  heroDate.dateTime = start;
  heroDate.textContent = `${fmt(start, { day: 'numeric' })} · ${fmt(start, { month: 'long' })} · ${fmt(start, { year: 'numeric' })}`;
  $('#heroDateTa').textContent = fmt(start, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }, 'ta-IN');

  $('#countdownTarget').innerHTML =
    `<strong>${esc(MAIN_EVENT.name)}</strong><span>${esc(fmtDateLong(start))} · ${esc(fmtTime(start))}</span>`;

  $('#venueMap').src = CONFIG.venue.mapEmbed;
  $('#directionsBtn').href = CONFIG.venue.directions;
  $('#rsvpDeadline').textContent = CONFIG.rsvp.deadline ? `Kindly confirm by ${CONFIG.rsvp.deadline}` : '';
  $('#rsvpGuests').max = CONFIG.rsvp.maxGuests;

  $('#compliments').innerHTML = CONFIG.compliments.map(n => `<li>${esc(n)}</li>`).join('');

  // Couple photos (or decorative placeholders)
  [['bride', '#bridePhoto'], ['groom', '#groomPhoto']].forEach(([who, sel]) => {
    const img = $(sel);
    img.src = CONFIG[who].photo || personPlaceholder(who);
    img.alt = `${CONFIG[who].name}`;
  });
}

/** Invitation lines (English / Tamil) with a staggered fade-in */
function renderInvitation(lang) {
  const box = $('#inviteLines');
  box.lang = lang;
  box.innerHTML = CONFIG.invitation[lang].map((line, i) =>
    `<p class="invite-line il-${line.style}" style="--d:${i * 170}">${esc(fillTokens(line.text))}</p>`
  ).join('');

  // Replay the fade if the frame is already on screen
  if (box.classList.contains('is-visible')) {
    box.classList.remove('is-visible');
    void box.offsetWidth;
    box.classList.add('is-visible');
  }
}

function initLangToggle() {
  $$('.lang-btn').forEach(btn => btn.addEventListener('click', () => {
    $$('.lang-btn').forEach(b => {
      const on = b === btn;
      b.classList.toggle('is-active', on);
      b.setAttribute('aria-selected', on);
    });
    renderInvitation(btn.dataset.lang);
  }));
}

function renderTimeline() {
  const wide = window.matchMedia('(min-width: 768px)').matches;
  $('#timelineList').innerHTML = CONFIG.story.map((item, i) => {
    const reveal = !wide ? 'fade-right' : i % 2 ? 'fade-right' : 'fade-left';
    return `
      <li class="tl-item" data-reveal="${reveal}">
        <span class="tl-node" aria-hidden="true"><svg viewBox="0 0 100 62"><use href="#sym-lotus"/></svg></span>
        <div class="tl-card">
          <span class="tl-date">${esc(item.date)}</span>
          <h3>${esc(item.title)}</h3>
          <p>${esc(item.text)}</p>
        </div>
      </li>`;
  }).join('');
}

function googleCalendarUrl(ev) {
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: `${ev.name} · ${CONFIG.bride.name} & ${CONFIG.groom.name}`,
    dates: `${icsDate(ev.start)}/${icsDate(ev.end)}`,
    details: ev.note || '',
    location: `${ev.venue}, ${ev.address}`
  });
  return `https://calendar.google.com/calendar/render?${params}`;
}

function renderEvents() {
  const grid = $('#eventsGrid');
  grid.innerHTML = CONFIG.events.map((ev, i) => `
    <article class="flip-card" tabindex="0" data-reveal="fade-up" style="--d:${i * 150}"
             aria-label="${esc(ev.name)}: press Enter to show details">
      <div class="flip-inner">
        <div class="face face--front">
          <div class="ev-icon" aria-hidden="true">${ICONS[ev.icon] || ICONS.kalash}</div>
          <h3 class="ev-name">${esc(ev.name)}</h3>
          <p class="ev-tamil" lang="ta">${esc(ev.nameTamil || '')}</p>
          <p class="ev-date">${esc(fmtDateShort(ev.start))}</p>
          <span class="ev-hint">${FINE_HOVER ? 'Hover' : 'Tap'} for details ↻</span>
        </div>
        <div class="face face--back">
          <h3>${esc(ev.name)}</h3>
          <ul class="ev-details">
            <li>${DETAIL_ICONS.date}<span>${esc(fmtDateLong(ev.start))}</span></li>
            <li>${DETAIL_ICONS.time}<span>${esc(fmtTime(ev.start))} – ${esc(fmtTime(ev.end))}</span></li>
            <li>${DETAIL_ICONS.place}<span>${esc(ev.venue)}<small>${esc(ev.address)}</small></span></li>
          </ul>
          <p class="ev-note">${esc(ev.note || '')}</p>
          <div class="ev-actions">
            <a href="${esc(googleCalendarUrl(ev))}" target="_blank" rel="noopener">+ Calendar</a>
            ${ev.mapLink ? `<a href="${esc(ev.mapLink)}" target="_blank" rel="noopener">Map</a>` : ''}
          </div>
        </div>
      </div>
    </article>`).join('');

  const flip = card => {
    const on = card.classList.toggle('is-flipped');
    card.setAttribute('aria-label', `${card.querySelector('.ev-name').textContent}: ${on ? 'showing details' : 'press Enter to show details'}`);
  };
  grid.addEventListener('click', e => {
    const card = e.target.closest('.flip-card');
    if (!card || e.target.closest('a') || FINE_HOVER) return; // desktop flips on hover
    flip(card);
  });
  grid.addEventListener('keydown', e => {
    if ((e.key === 'Enter' || e.key === ' ') && e.target.classList.contains('flip-card')) {
      e.preventDefault();
      flip(e.target);
    }
  });
}

function renderGallery() {
  $('#galleryGrid').innerHTML = CONFIG.gallery.map((item, i) => {
    const ratio = item.ratio || 1;
    const src = item.src || galleryPlaceholder(i, ratio, item.caption || `Photo ${i + 1}`);
    const size = item.src ? '' : `width="600" height="${Math.round(600 * ratio)}"`;
    return `
      <button class="g-item" type="button" data-observe data-index="${i}" aria-label="Open photo: ${esc(item.caption || `Photo ${i + 1}`)}">
        <img src="${esc(src)}" alt="${esc(item.caption || '')}" ${size} loading="lazy" decoding="async">
        ${item.caption ? `<span class="g-caption">${esc(item.caption)}</span>` : ''}
      </button>`;
  }).join('');
}

/* --- Placeholder artwork (SVG data URIs) --- */
function svgData(svg) {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

function galleryPlaceholder(i, ratio, label) {
  const w = 600, h = Math.round(600 * ratio);
  const palettes = [['#0A1A3F', '#1F3C88'], ['#1F3C88', '#0E7C86'], ['#0E7C86', '#0A1A3F'], ['#16306f', '#2A4FA8']];
  const [a, b] = palettes[i % palettes.length];
  const cx = w / 2, cy = h / 2 - 24;
  const petals = ring(12, (k, ang) => `<path d="M0 0C-14-12-14-40 0-62C14-40 14-12 0 0Z" transform="rotate(${ang})"/>`);
  return svgData(`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient>
      <radialGradient id="r"><stop offset="0" stop-color="#CFE3FF" stop-opacity=".35"/><stop offset="1" stop-color="#CFE3FF" stop-opacity="0"/></radialGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="url(#g)"/>
    <circle cx="${cx}" cy="${cy}" r="${Math.min(w, h) * 0.42}" fill="url(#r)"/>
    <g transform="translate(${cx} ${cy})" fill="none" stroke="#D4AF37" stroke-opacity=".7" stroke-width="2">
      ${petals}<circle r="92" stroke-dasharray="3 8"/><circle r="12" fill="#D4AF37" fill-opacity=".6"/>
    </g>
    <text x="50%" y="${cy + 140}" text-anchor="middle" font-family="Georgia, serif" font-style="italic" font-size="32" fill="#CFE3FF">${esc(label)}</text>
  </svg>`);
}

function personPlaceholder(who) {
  const [a, b] = who === 'bride' ? ['#0E7C86', '#1F3C88'] : ['#1F3C88', '#0A1A3F'];
  return svgData(`<svg xmlns="http://www.w3.org/2000/svg" width="400" height="500" viewBox="0 0 400 500">
    <defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs>
    <rect width="400" height="500" fill="url(#g)"/>
    <g fill="#CFE3FF" fill-opacity=".35">
      <circle cx="200" cy="230" r="62"/>
      <path d="M80 470c0-90 54-140 120-140s120 50 120 140z"/>
    </g>
    <text x="200" y="140" text-anchor="middle" font-family="Georgia, serif" font-style="italic" font-size="26" fill="#FDFBF5" fill-opacity=".8">Add photo</text>
  </svg>`);
}


/* =====================================================================
   5. PARTICLES
   One lightweight canvas per dark section. Each only animates while its
   section is on screen; DPR is capped at 2 for steady 60fps on phones.
   ===================================================================== */
function makeGlowSprite(rgb, size = 32) {
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const g = c.getContext('2d');
  const grd = g.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  grd.addColorStop(0, 'rgba(255,255,255,1)');
  grd.addColorStop(0.2, `rgba(${rgb},0.9)`);
  grd.addColorStop(0.5, `rgba(${rgb},0.25)`);
  grd.addColorStop(1, `rgba(${rgb},0)`);
  g.fillStyle = grd;
  g.fillRect(0, 0, size, size);
  return c;
}
const SPRITES = {
  sky: makeGlowSprite('207,227,255'),
  gold: makeGlowSprite('212,175,55'),
  teal: makeGlowSprite('64,190,200')
};
const PETAL_COLORS = ['rgba(207,227,255,0.85)', 'rgba(253,251,245,0.8)', 'rgba(140,190,240,0.8)', 'rgba(120,200,205,0.7)'];

/** Draw a lotus-petal shape centred on the current transform */
function petalPath(ctx, s) {
  ctx.beginPath();
  ctx.moveTo(0, -s);
  ctx.bezierCurveTo(s * 0.62, -s * 0.45, s * 0.5, s * 0.6, 0, s);
  ctx.bezierCurveTo(-s * 0.5, s * 0.6, -s * 0.62, -s * 0.45, 0, -s);
  ctx.fill();
}

class ParticleField {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.cfg = {
      stars: +canvas.dataset.stars || 0,
      sparkles: +canvas.dataset.sparkles || 0,
      petals: +canvas.dataset.petals || 0
    };
    this.running = false;
    this.enabled = false;
    this.visible = false;
    this.t = 0;
    this.loop = this.loop.bind(this);
    this.resize();
    if ('ResizeObserver' in window) {
      new ResizeObserver(() => this.resize()).observe(canvas);
    }
  }

  resize() {
    const w = this.canvas.clientWidth, h = this.canvas.clientHeight;
    if (!w || !h || (w === this.w && h === this.h)) return;
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.w = w; this.h = h;
    this.canvas.width = Math.round(w * this.dpr);
    this.canvas.height = Math.round(h * this.dpr);
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    this.populate();
    if (!this.running) this.draw();
  }

  populate() {
    const { w, h } = this;
    const scale = clamp((w * h) / (1280 * 800), 0.5, 1.4); // keep density similar across screens
    const n = key => Math.round(this.cfg[key] * scale);

    this.stars = Array.from({ length: n('stars') }, () => ({
      x: rand(0, w), y: rand(0, h), r: rand(0.6, 1.7), a: rand(0.35, 0.95),
      tw: rand(0.6, 2.4), ph: rand(0, 6.28), big: Math.random() < 0.14
    }));
    this.sparkles = Array.from({ length: n('sparkles') }, () => ({
      x: rand(0, w), y: rand(0, h), r: rand(4, 10), vy: -rand(6, 22), ph: rand(0, 6.28),
      a: rand(0.4, 0.9), sprite: Math.random() < 0.3 ? SPRITES.gold : Math.random() < 0.5 ? SPRITES.teal : SPRITES.sky
    }));
    this.petals = Array.from({ length: n('petals') }, () => ({
      x: rand(0, w), y: rand(-h * 0.2, h), s: rand(4.5, 9), vy: rand(14, 34), vx: rand(-8, 8),
      rot: rand(0, 6.28), vr: rand(-0.9, 0.9), flip: rand(0, 6.28), vf: rand(0.8, 2.2),
      sway: rand(8, 26), ph: rand(0, 6.28), color: pick(PETAL_COLORS)
    }));
  }

  start() {
    if (this.running || REDUCED) return;
    this.running = true;
    this.last = performance.now();
    this.raf = requestAnimationFrame(this.loop);
  }

  stop() {
    this.running = false;
    cancelAnimationFrame(this.raf);
  }

  loop(now) {
    if (!this.running) return;
    const dt = Math.min((now - this.last) / 1000, 0.05);
    this.last = now;
    this.t += dt;
    this.update(dt);
    this.draw();
    this.raf = requestAnimationFrame(this.loop);
  }

  update(dt) {
    const { w, h, t } = this;
    for (const p of this.sparkles) {
      p.y += p.vy * dt;
      p.x += Math.sin(t * 0.9 + p.ph) * 6 * dt;
      if (p.y < -20) { p.y = h + 20; p.x = rand(0, w); }
    }
    for (const p of this.petals) {
      p.y += p.vy * dt;
      p.x += (p.vx + Math.sin(t * 0.8 + p.ph) * p.sway) * dt;
      p.rot += p.vr * dt;
      p.flip += p.vf * dt;
      if (p.y > h + 20) { p.y = -20; p.x = rand(0, w); }
      if (p.x < -20) p.x = w + 20; else if (p.x > w + 20) p.x = -20;
    }
  }

  draw() {
    const { ctx, w, h, t } = this;
    ctx.clearRect(0, 0, w, h);

    ctx.fillStyle = '#EAF2FF';
    for (const s of this.stars) {
      ctx.globalAlpha = s.a * (0.55 + 0.45 * Math.sin(t * s.tw + s.ph));
      if (s.big) ctx.drawImage(SPRITES.sky, s.x - 6, s.y - 6, 12, 12);
      else ctx.fillRect(s.x, s.y, s.r, s.r);
    }

    for (const p of this.sparkles) {
      ctx.globalAlpha = p.a * (0.5 + 0.5 * Math.sin(t * 2 + p.ph));
      ctx.drawImage(p.sprite, p.x - p.r, p.y - p.r, p.r * 2, p.r * 2);
    }

    ctx.globalAlpha = 0.85;
    for (const p of this.petals) {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.scale(Math.max(0.15, Math.abs(Math.cos(p.flip))), 1); // 3D tumble
      ctx.fillStyle = p.color;
      petalPath(ctx, p.s);
      ctx.restore();
    }
    ctx.globalAlpha = 1;
  }
}

const Particles = {
  fields: [],
  init() {
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const f = entry.target._field;
        f.visible = entry.isIntersecting;
        if (f.visible && f.enabled) f.start(); else f.stop();
      });
    }, { rootMargin: '80px 0px' });

    $$('canvas.particles').forEach(canvas => {
      const field = new ParticleField(canvas);
      field.enabled = !!canvas.closest('.intro'); // section fields wait for the gate to open
      canvas._field = field;
      this.fields.push(field);
      io.observe(canvas);
    });
  },
  enableSections() {
    this.fields.forEach(f => {
      if (f.canvas.closest('.intro')) return;
      f.enabled = true;
      f.resize();
      if (f.visible) f.start();
    });
  },
  stopIntro() {
    this.fields.filter(f => f.canvas.closest('.intro')).forEach(f => f.stop());
  }
};

/** Full-screen burst of sparkles & lotus petals (intro + RSVP) */
const Burst = {
  canvas: null, ctx: null, parts: [], running: false,
  fire(x, y, count) {
    if (REDUCED) return;
    if (!this.canvas) {
      this.canvas = $('#burst');
      this.ctx = this.canvas.getContext('2d');
    }
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = window.innerWidth, h = window.innerHeight;
    this.canvas.style.display = 'block';
    if (this.canvas.width !== Math.round(w * dpr)) {
      this.canvas.width = Math.round(w * dpr);
      this.canvas.height = Math.round(h * dpr);
    }
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    this.w = w; this.h = h;

    const n = count || (w < 600 ? 110 : 170);
    const power = Math.max(w, h) / 900;
    for (let i = 0; i < n; i++) {
      const ang = rand(0, Math.PI * 2);
      const speed = rand(120, 720) * power;
      const petal = Math.random() < 0.4;
      this.parts.push({
        x, y, vx: Math.cos(ang) * speed, vy: Math.sin(ang) * speed - rand(0, 120),
        life: rand(1.3, 2.6), age: 0, petal,
        s: petal ? rand(5, 10) : rand(5, 13),
        rot: rand(0, 6.28), vr: rand(-4, 4), flip: rand(0, 6.28),
        color: pick(PETAL_COLORS),
        sprite: pick([SPRITES.gold, SPRITES.sky, SPRITES.sky, SPRITES.teal])
      });
    }
    if (!this.running) {
      this.running = true;
      this.last = performance.now();
      requestAnimationFrame(t => this.loop(t));
    }
  },
  loop(now) {
    const dt = Math.min((now - this.last) / 1000, 0.05);
    this.last = now;
    const { ctx } = this;
    ctx.clearRect(0, 0, this.w, this.h);
    const drag = Math.pow(0.16, dt);

    this.parts = this.parts.filter(p => (p.age += dt) < p.life);
    for (const p of this.parts) {
      p.vx *= drag; p.vy = p.vy * drag + (p.petal ? 140 : 50) * dt;
      p.x += p.vx * dt; p.y += p.vy * dt;
      const k = 1 - p.age / p.life;
      ctx.globalAlpha = k * k * (3 - 2 * k); // smooth fade
      if (p.petal) {
        p.rot += p.vr * dt; p.flip += 3 * dt;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.scale(Math.max(0.15, Math.abs(Math.cos(p.flip))), 1);
        ctx.fillStyle = p.color;
        petalPath(ctx, p.s);
        ctx.restore();
      } else {
        ctx.drawImage(p.sprite, p.x - p.s, p.y - p.s, p.s * 2, p.s * 2);
      }
    }
    ctx.globalAlpha = 1;

    if (this.parts.length) {
      requestAnimationFrame(t => this.loop(t));
    } else {
      this.running = false;
      ctx.clearRect(0, 0, this.w, this.h);
      this.canvas.style.display = 'none';
    }
  }
};


/* =====================================================================
   6. INTRO & GATE
   Sequence: mandala splits → sky fades → doors swing open (3D) →
   burst of sparkles → hero animates in → intro removed.
   ===================================================================== */
function initIntro() {
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  window.scrollTo(0, 0);
  document.documentElement.classList.add('is-locked');
  $('#openBtn').addEventListener('click', openInvitation, { once: true });
}

function openInvitation() {
  const intro = $('#intro');
  Music.play(); // must run inside the click for mobile autoplay rules

  const T = REDUCED
    ? { sky: 0, open: 0, opened: 0, wide: 0, done: 0, remove: 500 }
    : { sky: 420, open: 650, opened: 1250, wide: 1900, done: 2250, remove: 3200 };

  intro.classList.add('is-splitting');
  const m = $('.intro-mandala').getBoundingClientRect();
  Burst.fire(m.left + m.width / 2, m.top + m.height / 2);

  later(T.sky, () => intro.classList.add('is-sky-gone'));
  later(T.open, () => intro.classList.add('is-opening'));
  later(T.opened, () => {
    document.body.classList.add('is-opened');
    document.documentElement.classList.remove('is-locked');
    Particles.enableSections();
    $('#musicBtn').hidden = !CONFIG.music.src;
    if (location.hash && $(location.hash)) $(location.hash).scrollIntoView();
  });
  later(T.wide, () => intro.classList.add('is-opened-wide'));
  later(T.done, () => intro.classList.add('is-done'));
  later(T.remove, () => {
    Particles.stopIntro();
    intro.remove();
  });
}


/* =====================================================================
   7. MUSIC
   ===================================================================== */
const Music = {
  audio: null,
  wanted: false,   // user wants music on (survives tab switches)
  failed: false,

  init() {
    this.btn = $('#musicBtn');
    if (!CONFIG.music.src) return;
    this.audio = new Audio();
    this.audio.src = CONFIG.music.src;
    this.audio.loop = true;
    this.audio.preload = 'metadata';
    this.audio.addEventListener('error', () => {
      this.failed = true;
      this.btn.classList.add('is-unavailable');
      this.setState(false);
    });
    this.btn.addEventListener('click', () => this.toggle());

    // Pause when the guest switches apps/tabs, resume when they return
    document.addEventListener('visibilitychange', () => {
      if (!this.audio || this.failed) return;
      if (document.hidden) this.audio.pause();
      else if (this.wanted) this.audio.play().catch(() => {});
    });
  },

  play() {
    if (!this.audio || this.failed) return;
    this.wanted = true;
    this.audio.volume = 0;
    const p = this.audio.play();
    if (p && p.then) {
      p.then(() => { this.setState(true); this.fadeTo(CONFIG.music.volume, 2000); })
        .catch(() => this.setState(false));
    }
  },

  pause() {
    this.wanted = false;
    this.setState(false);
    this.fadeTo(0, 500, () => this.audio.pause());
  },

  toggle() {
    if (this.failed) {
      toast('Music file not found — set CONFIG.music.src in script.js');
      return;
    }
    if (this.wanted) this.pause(); else this.play();
  },

  setState(playing) {
    this.btn.classList.toggle('is-playing', playing);
    this.btn.setAttribute('aria-pressed', playing);
    this.btn.setAttribute('aria-label', playing ? 'Pause music' : 'Play music');
  },

  fadeTo(target, ms, done) {
    cancelAnimationFrame(this.fadeRaf);
    const from = this.audio.volume, t0 = performance.now();
    const step = now => {
      const k = clamp((now - t0) / ms, 0, 1);
      this.audio.volume = from + (target - from) * k;
      if (k < 1) this.fadeRaf = requestAnimationFrame(step);
      else if (done) done();
    };
    this.fadeRaf = requestAnimationFrame(step);
  }
};


/* =====================================================================
   8. SCROLL EFFECTS
   ===================================================================== */
function initReveal() {
  // Stagger children of [data-stagger] containers
  $$('[data-stagger]').forEach(parent => {
    const step = +parent.dataset.stagger || 100;
    Array.from(parent.children).forEach((child, i) => {
      if (!child.dataset.reveal) child.dataset.reveal = 'fade-up';
      child.style.setProperty('--d', i * step);
    });
  });

  const targets = $$('[data-reveal], [data-observe], .invite-lines');
  if (REDUCED || !('IntersectionObserver' in window)) {
    targets.forEach(el => el.classList.add('is-visible'));
    return;
  }

  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      io.unobserve(entry.target);
      (entry.target._revealEls || [entry.target]).forEach(el => {
        el.classList.add('is-visible');
        later(2600, () => el.classList.add('is-done')); // drop will-change afterwards
      });
    });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.12 });

  targets.forEach(el => {
    // Clip-path reveals start with zero visible area, which Chrome treats as
    // "not intersecting" — so watch the parent and reveal the child from it.
    if (el.dataset.reveal === 'clip') {
      const host = el.parentElement;
      (host._revealEls = host._revealEls || []).push(el);
      io.observe(host);
    } else {
      io.observe(el);
    }
  });
}

function initScrollEffects() {
  const bar = $('#progressBar');
  const nav = $('#nav');
  const fill = $('#timelineFill');
  const timeline = $('#timeline');
  const parallax = REDUCED ? [] : $$('[data-parallax]').map(el => ({
    el, speed: +el.dataset.parallax, ref: el.parentElement
  }));
  const supportsTranslate = CSS.supports('translate', '0 0');
  let ticking = false;

  const update = () => {
    ticking = false;
    const vh = window.innerHeight;
    const y = window.scrollY;
    const max = document.documentElement.scrollHeight - vh;
    bar.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
    nav.classList.toggle('is-scrolled', y > 40);

    // Glowing timeline line draws itself as you scroll
    const tr = timeline.getBoundingClientRect();
    if (tr.top < vh && tr.bottom > 0) {
      const p = clamp((vh * 0.62 - tr.top) / tr.height, 0, 1);
      fill.style.transform = `scaleY(${p})`;
    }

    // Parallax: read all rects first, then write (avoids layout thrash)
    const offsets = parallax.map(({ ref, speed }) => {
      const r = ref.getBoundingClientRect();
      if (r.bottom < -200 || r.top > vh + 200) return null;
      return (r.top + r.height / 2 - vh / 2) * speed;
    });
    parallax.forEach(({ el }, i) => {
      if (offsets[i] === null) return;
      const v = `${offsets[i].toFixed(1)}px`;
      if (supportsTranslate) el.style.translate = `0 ${v}`;
      else el.style.transform = `translateY(${v})`;
    });
  };

  const onScroll = () => {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  update();

  // Pause hero-only CSS animations (shimmer, big mandala) when off screen
  const hero = $('#home');
  new IntersectionObserver(([e]) => hero.classList.toggle('is-paused', !e.isIntersecting)).observe(hero);
}

function initNav() {
  const nav = $('#nav');
  const toggle = $('#navToggle');
  const links = $$('.nav-link');

  const setOpen = open => {
    nav.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', open);
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    document.documentElement.classList.toggle('is-locked', open);
  };
  toggle.addEventListener('click', () => setOpen(!nav.classList.contains('is-open')));
  links.forEach(a => a.addEventListener('click', () => setOpen(false)));
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) setOpen(false);
  });

  // Active-section highlight
  // Track every section crossing the middle band of the viewport and
  // highlight the first one, so leaving a section also updates the nav.
  const byId = new Map(links.map(a => [a.getAttribute('href').slice(1), a]));
  const inBand = new Set();
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => (e.isIntersecting ? inBand.add(e.target.id) : inBand.delete(e.target.id)));
    const current = [...byId.keys()].find(id => inBand.has(id));
    if (!current) return; // e.g. footer in view: keep the last highlight
    links.forEach(a => a.classList.toggle('is-active', a === byId.get(current)));
  }, { rootMargin: '-45% 0px -50% 0px' });
  byId.forEach((_, id) => { const s = document.getElementById(id); if (s) io.observe(s); });
}


/* =====================================================================
   9. COUNTDOWN (split-flap digits)
   ===================================================================== */
function initCountdown() {
  const box = $('#countdownUnits');
  const units = [['days', 'Days'], ['hours', 'Hours'], ['minutes', 'Minutes'], ['seconds', 'Seconds']];
  box.innerHTML = units.map(([key, label]) => `
    <div class="cd-unit">
      <svg class="cd-ring" viewBox="0 0 200 200" aria-hidden="true"><use href="#sym-ring"/></svg>
      <div class="flip" data-unit="${key}" aria-hidden="true">
        <span class="half top"><span>00</span></span>
        <span class="half bottom"><span>00</span></span>
        <span class="half flap-top"><span>00</span></span>
        <span class="half flap-bottom"><span>00</span></span>
      </div>
      <span class="cd-label">${label}</span>
    </div>`).join('');

  const flips = Object.fromEntries(units.map(([key]) => [key, box.querySelector(`[data-unit="${key}"]`)]));
  const target = new Date(MAIN_EVENT.start).getTime();
  let timer, lastLabel = '';

  const setFlip = (el, value) => {
    const v = String(value).padStart(2, '0');
    if (el._v === v) return;
    const [top, bottom, flapTop, flapBottom] = el.querySelectorAll('.half > span');
    el.classList.toggle('is-wide', v.length > 2);

    if (el._v === undefined || REDUCED) {
      top.textContent = bottom.textContent = flapTop.textContent = flapBottom.textContent = v;
    } else {
      const old = el._v;
      top.textContent = v;            // revealed behind the falling flap
      bottom.textContent = old;       // stays until the lower flap lands
      flapTop.textContent = old;
      flapBottom.textContent = v;
      el.classList.remove('is-flipping');
      void el.offsetWidth;            // restart the CSS animation
      el.classList.add('is-flipping');
      clearTimeout(el._t);
      el._t = later(600, () => {
        bottom.textContent = flapTop.textContent = v;
        el.classList.remove('is-flipping');
      });
    }
    el._v = v;
  };

  const tick = () => {
    const diff = target - Date.now();
    if (diff <= 0) {
      Object.values(flips).forEach(el => setFlip(el, 0));
      $('#countdownDone').hidden = false;
      clearInterval(timer);
      return;
    }
    const d = Math.floor(diff / 864e5);
    const h = Math.floor(diff / 36e5) % 24;
    const m = Math.floor(diff / 6e4) % 60;
    const s = Math.floor(diff / 1e3) % 60;
    setFlip(flips.days, d);
    setFlip(flips.hours, h);
    setFlip(flips.minutes, m);
    setFlip(flips.seconds, s);

    const label = `${d} days, ${h} hours and ${m} minutes to go`;
    if (label !== lastLabel) { box.setAttribute('aria-label', label); lastLabel = label; }
  };

  tick();
  // Align ticks to the start of each second
  later(1000 - (Date.now() % 1000), () => { tick(); timer = setInterval(tick, 1000); });
}


/* =====================================================================
   10. GALLERY LIGHTBOX
   ===================================================================== */
function initLightbox() {
  const lb = $('#lightbox');
  const img = $('#lbImg');
  const cap = $('#lbCaption');
  const items = $$('.g-item');
  let index = 0, lastFocus = null;

  const show = i => {
    index = (i + items.length) % items.length;
    const src = items[index].querySelector('img');
    img.src = src.src;
    img.alt = src.alt;
    cap.textContent = CONFIG.gallery[index].caption || '';
  };
  const open = i => {
    lastFocus = document.activeElement;
    show(i);
    lb.hidden = false;
    requestAnimationFrame(() => lb.classList.add('is-open'));
    document.documentElement.classList.add('is-locked');
    $('.lb-close', lb).focus();
  };
  const close = () => {
    lb.classList.remove('is-open');
    document.documentElement.classList.remove('is-locked');
    later(350, () => { lb.hidden = true; });
    if (lastFocus) lastFocus.focus({ preventScroll: true });
  };

  items.forEach((item, i) => item.addEventListener('click', () => open(i)));
  $('.lb-close', lb).addEventListener('click', close);
  $('.lb-prev', lb).addEventListener('click', () => show(index - 1));
  $('.lb-next', lb).addEventListener('click', () => show(index + 1));
  lb.addEventListener('click', e => { if (e.target === lb) close(); });

  document.addEventListener('keydown', e => {
    if (lb.hidden) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show(index - 1);
    if (e.key === 'ArrowRight') show(index + 1);
  });

  // Swipe on touch screens
  let x0 = null;
  lb.addEventListener('touchstart', e => { x0 = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend', e => {
    if (x0 === null) return;
    const dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 50) show(index + (dx < 0 ? 1 : -1));
    x0 = null;
  });
}


/* =====================================================================
   11. RSVP & CALENDAR
   ===================================================================== */
function initRSVP() {
  const form = $('#rsvpForm');
  const guests = $('#rsvpGuests');
  const guestsField = $('#guestsField');
  const nameInput = $('#rsvpName');
  const nameField = nameInput.closest('.field');
  const max = CONFIG.rsvp.maxGuests;

  // Guest stepper
  $$('[data-step]', form).forEach(btn => btn.addEventListener('click', () => {
    guests.value = clamp((+guests.value || 1) + +btn.dataset.step, 1, max);
  }));
  guests.addEventListener('change', () => { guests.value = clamp(Math.round(+guests.value) || 1, 1, max); });

  // Hide guest count when declining
  $$('input[name="attending"]', form).forEach(r => r.addEventListener('change', () => {
    guestsField.classList.toggle('is-disabled', form.attending.value === 'no');
  }));

  nameInput.addEventListener('input', () => {
    nameField.classList.remove('has-error');
    $('#nameError').textContent = '';
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    const name = nameInput.value.trim();
    if (!name) {
      nameField.classList.add('has-error');
      $('#nameError').textContent = 'Please tell us your name';
      nameInput.focus();
      return;
    }
    const attending = form.attending.value === 'yes';
    const message = $('#rsvpMessage').value.trim();
    const lines = [
      `🙏 *RSVP · ${CONFIG.bride.name} & ${CONFIG.groom.name}'s Wedding*`,
      '',
      `*Name:* ${name}`,
      `*Attending:* ${attending ? 'Yes, with joy! 🎉' : 'Sorry, unable to attend'}`
    ];
    if (attending) lines.push(`*Guests:* ${clamp(+guests.value || 1, 1, max)}`);
    if (message) lines.push(`*Message:* ${message}`);

    const url = `https://wa.me/${CONFIG.rsvp.whatsappNumber}?text=${encodeURIComponent(lines.join('\n'))}`;
    const btn = form.querySelector('[type="submit"]').getBoundingClientRect();
    Burst.fire(btn.left + btn.width / 2, btn.top + btn.height / 2, 70);
    toast(attending ? 'Thank you! Opening WhatsApp…' : 'Thank you for letting us know. Opening WhatsApp…');

    const win = window.open(url, '_blank');
    if (win) win.opener = null;
    else window.location.href = url; // popup blocked (some in-app browsers)
  });
}

/** 2027-02-12T09:00:00+05:30 → 20270212T033000Z */
function icsDate(iso) {
  return new Date(iso).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
}

function icsEscape(str) {
  return String(str || '').replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/([,;])/g, '\\$1');
}

function downloadICS() {
  const stamp = icsDate(new Date().toISOString());
  const events = CONFIG.events.map((ev, i) => [
    'BEGIN:VEVENT',
    `UID:wedding-${i}-${icsDate(ev.start)}@invitation`,
    `DTSTAMP:${stamp}`,
    `DTSTART:${icsDate(ev.start)}`,
    `DTEND:${icsDate(ev.end)}`,
    `SUMMARY:${icsEscape(`${ev.name} · ${CONFIG.bride.name} & ${CONFIG.groom.name}`)}`,
    `LOCATION:${icsEscape(`${ev.venue}, ${ev.address}`)}`,
    `DESCRIPTION:${icsEscape(ev.note)}`,
    'END:VEVENT'
  ].join('\r\n'));
  const ics = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Wedding Invitation//EN', 'CALSCALE:GREGORIAN', 'METHOD:PUBLISH', ...events, 'END:VCALENDAR'].join('\r\n');

  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `${CONFIG.bride.name}-${CONFIG.groom.name}-wedding.ics`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  later(2000, () => URL.revokeObjectURL(a.href));
}

function initCalendar() {
  const btn = $('#calBtn');
  const menu = $('#calMenu');
  $('#gcalLink').href = googleCalendarUrl(MAIN_EVENT);

  const setOpen = open => { menu.hidden = !open; btn.setAttribute('aria-expanded', open); };
  btn.addEventListener('click', () => setOpen(menu.hidden));
  $('#icsBtn').addEventListener('click', () => { downloadICS(); setOpen(false); });
  $('#gcalLink').addEventListener('click', () => setOpen(false));
  document.addEventListener('click', e => {
    if (!menu.hidden && !e.target.closest('.cal-wrap')) setOpen(false);
  });
}


/* =====================================================================
   12. INIT
   ===================================================================== */
function init() {
  buildOrnaments();
  bindContent();
  renderInvitation('en');
  initLangToggle();
  renderTimeline();
  renderEvents();
  renderGallery();
  initCountdown();
  initRSVP();
  initCalendar();
  initNav();
  initReveal();
  initLightbox();
  Particles.init();
  initScrollEffects();
  Music.init();
  initIntro();
}

init();
