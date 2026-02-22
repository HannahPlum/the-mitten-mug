const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Lightbox
const lightbox     = document.getElementById('cat-lightbox');
const lightboxImg  = document.getElementById('lightbox-img');
const lightboxCap  = document.getElementById('lightbox-caption');
const closeBtn     = document.querySelector('.lightbox-close');

document.querySelectorAll('.lightbox-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
        lightboxImg.alt = trigger.alt;
        lightboxCap.textContent = trigger.dataset.name;
        lightboxImg.src = trigger.src;
        if (lightboxImg.complete) {
            lightbox.showModal();
        } else {
            lightboxImg.addEventListener('load', () => lightbox.showModal(), { once: true });
        }
    });
});

closeBtn.addEventListener('click', () => lightbox.close());

lightbox.addEventListener('click', e => {
    if (e.target === lightbox) lightbox.close();
});
