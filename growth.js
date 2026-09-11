(() => {
  const API_BASE = (window.CLIMATESTUDY_API_BASE || '').replace(/\/$/, '');
  const KEY = 'climatestudy_ref_code';
  const incoming = new URLSearchParams(location.search).get('ref');
  if (incoming && /^[A-Za-z0-9_-]{3,64}$/.test(incoming)) localStorage.setItem('climatestudy_referrer', incoming);

  const ownRef = localStorage.getItem(KEY) || crypto.randomUUID().replace(/-/g, '').slice(0, 12);
  localStorage.setItem(KEY, ownRef);
  const refInput = document.getElementById('refUrl');
  const refCopy = document.getElementById('refCopyBtn');
  const current = new URL(location.href);
  current.searchParams.set('ref', ownRef);
  if (refInput) refInput.value = current.href;

  async function post(path, body) {
    if (!API_BASE) return null;
    try {
      const response = await fetch(`${API_BASE}${path}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body)
      });
      return response.ok ? await response.json() : null;
    } catch { return null; }
  }

  post('/api/referral', {
    ref: localStorage.getItem('climatestudy_referrer') || ownRef,
    event: incoming ? 'referral_visit' : 'visit'
  });

  refCopy?.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(refInput?.value || current.href);
      refCopy.textContent = 'Copied!';
      setTimeout(() => { refCopy.textContent = 'Copy referral'; }, 1200);
    } catch {}
  });
})();
