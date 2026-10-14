/* Beauty Unique Outdoor Day Spa — shared interactions
   1. Mobile navigation drawer (every page)
   2. Category tab switcher for the treatments menu and package collections */

(function () {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const bar1 = document.getElementById('bar1');
    const bar2 = document.getElementById('bar2');
    const bar3 = document.getElementById('bar3');

    function closeMenu() {
        mobileMenu.classList.add('hidden');
        bar1.style.transform = 'none';
        bar2.style.opacity = '1';
        bar3.style.transform = 'none';
    }

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            if (mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.remove('hidden');
                // Morph the hamburger into a close 'X'
                bar1.style.transform = 'rotate(45deg) translate(5px, 5px)';
                bar2.style.opacity = '0';
                bar3.style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else {
                closeMenu();
            }
        });

        // Autoclose the drawer when the viewport grows to desktop
        window.addEventListener('resize', () => {
            if (window.innerWidth >= 1024) closeMenu();
        });
    }
})();

/* Shows one category panel at a time. Pages declare their own category list
   on the tab bar via data-categories so this stays page-agnostic. */
function setActiveTab(tabId) {
    const navBar = document.querySelector('.sticky-category-nav');
    const categories = (navBar && navBar.dataset.categories || '').split(',').filter(Boolean);

    categories.forEach((cat) => {
        const el = document.getElementById('sec-' + cat);
        const btn = document.getElementById('tab-btn-' + cat);
        if (el) {
            el.classList.add('hidden');
            el.classList.remove('block');
        }
        if (btn) btn.classList.remove('active-subnav');
    });

    const targetSection = document.getElementById('sec-' + tabId);
    const targetBtn = document.getElementById('tab-btn-' + tabId);
    if (targetSection) {
        targetSection.classList.remove('hidden');
        targetSection.classList.add('block');
    }
    if (targetBtn) targetBtn.classList.add('active-subnav');

    // Keep the tab bar locked neatly in place when a category is activated
    if (navBar && window.scrollY > navBar.offsetTop) {
        window.scrollTo({ top: navBar.offsetTop - 10, behavior: 'smooth' });
    }
}

/* Deep links such as /packages#couples open straight onto that collection */
window.addEventListener('DOMContentLoaded', () => {
    const navBar = document.querySelector('.sticky-category-nav');
    if (!navBar) return;
    const hash = window.location.hash.replace('#', '');
    const categories = (navBar.dataset.categories || '').split(',').filter(Boolean);
    if (hash && categories.includes(hash)) setActiveTab(hash);
});
