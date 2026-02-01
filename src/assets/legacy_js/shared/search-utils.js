/* assets/js/shared/search-utils.js */

const SearchUtils = {
    /**
     * initializeSearch - Sets up a search input to filter a list of items.
     * @param {string} inputId - ID of the search input field.
     * @param {string} itemSelector - CSS selector for the items to filter (e.g., '.feed-item').
     * @param {string} textSelector - Optional selector to narrow down text within/inside the item.
     */
    init: function (inputId, itemSelector, textSelector = null) {
        const input = document.getElementById(inputId);
        if (!input) return;

        input.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            const items = document.querySelectorAll(itemSelector);

            items.forEach(item => {
                let text = '';
                if (textSelector) {
                    const textEl = item.querySelector(textSelector);
                    text = textEl ? textEl.innerText.toLowerCase() : '';
                } else {
                    text = item.innerText.toLowerCase();
                }

                if (text.includes(query)) {
                    item.style.display = ''; // Reset to default (flex/block)
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }
};

window.SearchUtils = SearchUtils;
