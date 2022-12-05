async function showSelectedLink() {
    document.querySelectorAll('.menu-btns').forEach(link => {
        if (link.href === window.location.href && window.location.href.includes('legal_notice')) {
            link.classList.add('second-active');
            link.firstElementChild.src = '../img/legal-notice-icon-active.png';
        } else if (link.href === window.location.href) {
            link.classList.add('active');
        }
    })
}
