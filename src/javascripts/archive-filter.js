(function initArchiveFilter() {
  const filterButtons = Array.from(document.querySelectorAll('.archive-tag'));
  const listings = Array.from(document.querySelectorAll('.cp-listing'));

  if (filterButtons.length === 0 || listings.length === 0) return;

  function getListingTags(listing) {
    return (listing.dataset.tags || '').split(/\s+/).filter(Boolean);
  }

  function shouldHideListing(listing, filter) {
    if (filter === 'all') return false;
    return !getListingTags(listing).includes(filter);
  }

  function setFilter(filter) {
    const selectedFilter = filter || 'all';

    filterButtons.forEach((button) => {
      button.classList.toggle('active', button.dataset.filter === selectedFilter);
    });

    listings.forEach((listing) => {
      listing.hidden = shouldHideListing(listing, selectedFilter);
    });
  }

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => setFilter(button.dataset.filter));
  });

  document.querySelectorAll('[data-tag]').forEach((tag) => {
    tag.addEventListener('click', (event) => {
      event.preventDefault();
      setFilter(tag.dataset.tag);
    });
  });
})();
