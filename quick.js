document.querySelectorAll('.quick-card[data-city]').forEach(button => {
  button.addEventListener('click', async () => {
    const input = document.getElementById('locationInput');
    if (!input) return;
    input.value = button.dataset.city || '';
    document.getElementById('searchBtn')?.click();
  });
});
