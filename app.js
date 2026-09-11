const input = document.getElementById('locationInput');
const searchBtn = document.getElementById('searchBtn');
const suggestions = document.getElementById('suggestions');
const results = document.getElementById('results');
const placeTitle = document.getElementById('placeTitle');
const placeMeta = document.getElementById('placeMeta');
const currentTemp = document.getElementById('currentTemp');
const currentCondition = document.getElementById('currentCondition');
const todayRain = document.getElementById('todayRain');
const currentWind = document.getElementById('currentWind');
const forecast = document.getElementById('forecast');
const shareUrl = document.getElementById('shareUrl');
const shareBtn = document.getElementById('shareBtn');
const copyBtn = document.getElementById('copyBtn');
const csvBtn = document.getElementById('csvBtn');
const refUrl = document.getElementById('refUrl');
const refCopyBtn = document.getElementById('refCopyBtn');

let selectedPlace = null;
let weatherData = null;
let map = null;
let marker = null;
let searchTimer = null;

const referralFromUrl = new URLSearchParams(location.search).get('ref');
if (referralFromUrl) localStorage.setItem('climatestudy_ref', referralFromUrl);

function getReferralId() {
  let id = localStorage.getItem('climatestudy_ref_id');
  if (!id) {
    const seed = (globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random()}`);
    id = `cs-${seed.replace(/[^a-z0-9]/gi, '').slice(-10).toLowerCase()}`;
    localStorage.setItem('climatestudy_ref_id', id);
  }
  return id;
}

function referralLink() {
  const url = new URL(location.href);
  url.search = '';
  url.hash = '';
  url.searchParams.set('ref', getReferralId());
  return url.href;
}

const weatherCodes = {
  0: ['☀️', 'Clear sky'], 1: ['🌤️', 'Mainly clear'], 2: ['⛅', 'Partly cloudy'], 3: ['☁️', 'Overcast'],
  45: ['🌫️', 'Fog'], 48: ['🌫️', 'Depositing rime fog'], 51: ['🌦️', 'Light drizzle'], 53: ['🌦️', 'Drizzle'], 55: ['🌧️', 'Heavy drizzle'],
  56: ['🌧️', 'Freezing drizzle'], 57: ['🌧️', 'Heavy freezing drizzle'], 61: ['🌦️', 'Light rain'], 63: ['🌧️', 'Rain'], 65: ['🌧️', 'Heavy rain'],
  66: ['🌧️', 'Freezing rain'], 67: ['🌧️', 'Heavy freezing rain'], 71: ['🌨️', 'Light snow'], 73: ['🌨️', 'Snow'], 75: ['❄️', 'Heavy snow'],
  77: ['🌨️', 'Snow grains'], 80: ['🌦️', 'Rain showers'], 81: ['🌧️', 'Rain showers'], 82: ['⛈️', 'Heavy rain showers'],
  85: ['🌨️', 'Snow showers'], 86: ['❄️', 'Heavy snow showers'], 95: ['⛈️', 'Thunderstorm'], 96: ['⛈️', 'Thunderstorm + hail'], 99: ['⛈️', 'Heavy thunderstorm + hail']
};

function codeInfo(code) { return weatherCodes[code] || ['🌍', 'Weather']; }
function esc(value) { return String(value ?? '').replace(/[&<>\\"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','\\':'&#92;','"':'&quot;'}[c])); }
function formatDate(date) { return new Intl.DateTimeFormat('en', {weekday:'short', month:'short', day:'numeric'}).format(date); }

async function geocode(q) {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(q)}&count=6&language=en&format=json`;
  const response = await fetch(url);
  if (!response.ok) throw new Error('Location search failed');
  const data = await response.json();
  return data.results || [];
}

async function weatherFor(place) {
  const params = new URLSearchParams({
    latitude: place.latitude,
    longitude: place.longitude,
    current: 'temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m',
    daily: 'weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max,wind_speed_10m_max',
    forecast_days: '7',
    timezone: 'auto'
  });
  const response = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`);
  if (!response.ok) throw new Error('Weather request failed');
  return response.json();
}

async function analyzeCityName(city) {
  const items = await geocode(city);
  if (!items.length) return;
  suggestions.innerHTML = '';
  selectedPlace = items[0];
  input.value = [selectedPlace.name, selectedPlace.country].filter(Boolean).join(', ');
  await runAnalysis(selectedPlace);
}

function renderSuggestions(items) {
  suggestions.innerHTML = items.map((item, i) => `
    <button class="suggestion" data-index="${i}">
      <strong>${esc(item.name)}</strong><br><span class="muted">${esc([item.admin1, item.country].filter(Boolean).join(', '))}</span>
    </button>`).join('');
  suggestions.querySelectorAll('.suggestion').forEach(btn => btn.addEventListener('click', async () => {
    suggestions.innerHTML = '';
    selectedPlace = items[Number(btn.dataset.index)];
    input.value = [selectedPlace.name, selectedPlace.country].filter(Boolean).join(', ');
    await runAnalysis(selectedPlace);
  }));
}

async function runAnalysis(place) {
  searchBtn.disabled = true;
  searchBtn.textContent = 'Loading…';
  try {
    weatherData = await weatherFor(place);
    renderResults(place, weatherData);
    const params = new URLSearchParams({lat: place.latitude.toFixed(4), lon: place.longitude.toFixed(4)});
    if (place.name) params.set('name', place.name);
    const savedRef = localStorage.getItem('climatestudy_ref');
    if (savedRef) params.set('ref', savedRef);
    history.replaceState({}, '', `${location.pathname}?${params.toString()}#results`);
    results.hidden = false;
    results.scrollIntoView({behavior:'smooth', block:'start'});
    if (refUrl) refUrl.value = referralLink();
  } catch (error) {
    alert(error.message || 'Unable to load the analysis.');
  } finally {
    searchBtn.disabled = false;
    searchBtn.textContent = 'Analyze';
  }
}

function renderResults(place, data) {
  const current = data.current;
  const info = codeInfo(current.weather_code);
  placeTitle.textContent = place.name || 'Selected location';
  placeMeta.textContent = [place.admin1, place.country, `UTC${data.utc_offset_seconds >= 0 ? '+' : ''}${data.utc_offset_seconds / 3600}`].filter(Boolean).join(' · ');
  currentTemp.textContent = `${Math.round(current.temperature_2m)}°C`;
  currentCondition.textContent = `${info[0]} ${info[1]} · feels like ${Math.round(current.apparent_temperature)}°C`;
  todayRain.textContent = `${data.daily.precipitation_sum[0].toFixed(1)} mm`;
  currentWind.textContent = `${Math.round(current.wind_speed_10m)} km/h`;

  forecast.innerHTML = data.daily.time.map((date, i) => {
    const [icon, label] = codeInfo(data.daily.weather_code[i]);
    return `<div class="day" title="${esc(label)}"><div class="date">${formatDate(new Date(`${date}T12:00:00`))}</div><div class="icon">${icon}</div><strong>${Math.round(data.daily.temperature_2m_max[i])}° / ${Math.round(data.daily.temperature_2m_min[i])}°</strong><small>${Math.round(data.daily.precipitation_probability_max[i] || 0)}% rain</small></div>`;
  }).join('');

  const url = new URL(location.href); url.hash = 'results';
  shareUrl.value = url.href;

  if (!map) {
    map = L.map('map', {scrollWheelZoom: false}).setView([place.latitude, place.longitude], 6);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom: 19, attribution: '&copy; OpenStreetMap contributors'}).addTo(map);
  } else map.setView([place.latitude, place.longitude], 6);
  if (marker) marker.remove();
  marker = L.marker([place.latitude, place.longitude]).addTo(map).bindPopup(`<strong>${esc(place.name)}</strong><br>${esc(place.country || '')}`).openPopup();
  setTimeout(() => map.invalidateSize(), 100);
}

async function search() {
  const q = input.value.trim();
  if (q.length < 2) return;
  searchBtn.disabled = true;
  searchBtn.textContent = 'Searching…';
  try {
    const items = await geocode(q);
    if (!items.length) { suggestions.innerHTML = '<div class="suggestion">No matching locations found.</div>'; return; }
    if (items.length === 1) { selectedPlace = items[0]; await runAnalysis(items[0]); return; }
    renderSuggestions(items);
  } catch (error) { suggestions.innerHTML = `<div class="suggestion">${esc(error.message)}</div>`; }
  finally { searchBtn.disabled = false; searchBtn.textContent = 'Analyze'; }
}

searchBtn.addEventListener('click', search);
input.addEventListener('keydown', e => { if (e.key === 'Enter') search(); });
input.addEventListener('input', () => {
  clearTimeout(searchTimer);
  const q = input.value.trim();
  if (q.length < 3) { suggestions.innerHTML = ''; return; }
  searchTimer = setTimeout(async () => {
    try { const items = await geocode(q); renderSuggestions(items.slice(0, 5)); } catch {}
  }, 450);
});

document.querySelectorAll('.quick-card').forEach(button => button.addEventListener('click', () => analyzeCityName(button.dataset.city)));

shareBtn.addEventListener('click', async () => {
  const value = shareUrl.value;
  if (navigator.share) { try { await navigator.share({title:'ClimateStudy result', text:'Explore this ClimateStudy analysis', url:value}); } catch {} }
  else { await navigator.clipboard.writeText(value); alert('Share link copied.'); }
});
copyBtn.addEventListener('click', async () => { await navigator.clipboard.writeText(shareUrl.value); copyBtn.textContent = 'Copied!'; setTimeout(() => copyBtn.textContent = 'Copy link', 1200); });
if (refCopyBtn) refCopyBtn.addEventListener('click', async () => { await navigator.clipboard.writeText(refUrl.value); refCopyBtn.textContent = 'Copied!'; setTimeout(() => refCopyBtn.textContent = 'Copy referral', 1200); });

csvBtn.addEventListener('click', () => {
  if (!weatherData) return;
  const rows = [['date','weather_code','temperature_max_c','temperature_min_c','precipitation_mm','rain_probability_pct','wind_max_kmh']];
  weatherData.daily.time.forEach((date,i) => rows.push([
    date,
    weatherData.daily.weather_code[i],
    weatherData.daily.temperature_2m_max[i],
    weatherData.daily.temperature_2m_min[i],
    weatherData.daily.precipitation_sum[i],
    weatherData.daily.precipitation_probability_max[i],
    weatherData.daily.wind_speed_10m_max[i]
  ]));
  const csv = rows.map(row => row.map(v => `"${String(v).replaceAll('"','""')}"`).join(',')).join('\n');
  const blob = new Blob([csv], {type:'text/csv;charset=utf-8'});
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'climatestudy-weather.csv'; a.click(); URL.revokeObjectURL(a.href);
});

async function loadFromUrl() {
  const qs = new URLSearchParams(location.search);
  const lat = Number(qs.get('lat')); const lon = Number(qs.get('lon'));
  if (!Number.isFinite(lat) || !Number.isFinite(lon)) return;
  const place = {latitude:lat, longitude:lon, name:qs.get('name') || 'Shared location', country:''};
  selectedPlace = place;
  input.value = place.name;
  await runAnalysis(place);
}

if (refUrl) refUrl.value = referralLink();
loadFromUrl();