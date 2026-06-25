(function initSearch() {
  const form = document.querySelector('form[role="search"]');
  const input = document.getElementById('search-input');
  const items = Array.from(document.querySelectorAll('#search-results li'));

  if (!input || items.length === 0) return;

  function itemMatchesQuery(item, query) {
    const searchText = (item.dataset.search || '').toLowerCase();
    return searchText.includes(query);
  }

  function filterResults() {
    const query = input.value.trim().toLowerCase();
    const hasQuery = query.length > 0;

    items.forEach((item) => {
      item.hidden = hasQuery && !itemMatchesQuery(item, query);
    });
  }

  input.addEventListener('input', filterResults);
  form?.addEventListener('submit', (event) => {
    event.preventDefault();
    filterResults();
  });
})();
