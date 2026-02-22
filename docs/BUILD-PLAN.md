# Lightbox Feature for Cats Page

## Context
The cats page (`cats.html`) shows 6 foster cat cards in a grid. Each card has an image, name, and description. Currently, images cannot be enlarged. The goal is to add a lightbox: clicking a cat image opens an overlay showing the full image without navigating away. The implementation uses the native `<dialog>` element, matching the pattern already present in `transcript.html`.

---

## Files to Modify
- `/home/user/the-mitten-mug/cats.html` — add `<dialog>` element + attributes on `<img>` tags
- `/home/user/the-mitten-mug/style.css` — append lightbox CSS at the end
- `/home/user/the-mitten-mug/script.js` — append lightbox JS after the hamburger toggle code

---

## Step 1 — Add `<dialog>` HTML to cats.html ✅

Insert just before the `<script src="script.js">` line (before closing `</body>`). Use `aria-labelledby` pointing to a visually-hidden `<h2>` inside the dialog (preferred over `aria-label` for screen reader compatibility):

```html
<dialog id="cat-lightbox" aria-modal="true" aria-labelledby="lightbox-title">
    <h2 id="lightbox-title" class="sr-only">Cat photo lightbox</h2>
    <button class="lightbox-close" aria-label="Close lightbox">&times;</button>
    <figure class="lightbox-figure">
        <img id="lightbox-img" alt="">
        <figcaption id="lightbox-caption"></figcaption>
    </figure>
</dialog>
```

**Test:** Page looks identical. In DevTools console: `document.getElementById('cat-lightbox')` should return the element. No accessibility warnings for missing dialog title.

---

## Step 2 — Style the lightbox in style.css

Append at the very end of `style.css` (`.sr-only` utility first, then lightbox styles):

```css
/* ── Utility ── */
.sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
}

/* ── Lightbox ── */
#cat-lightbox {
    border: none;
    border-radius: 16px;
    padding: 0;
    background: transparent;
    max-width: 90vw;
    max-height: 90vh;
    overflow: visible;
}

#cat-lightbox::backdrop {
    background: rgba(0, 0, 0, 0.75);
}

.lightbox-close {
    position: absolute;
    top: -1rem;
    right: -1rem;
    width: 2.25rem;
    height: 2.25rem;
    border-radius: 50%;
    border: none;
    background-color: var(--accent);
    color: var(--white);
    font-size: 1.25rem;
    line-height: 1;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: opacity 0.2s ease;
    z-index: 1;
}

.lightbox-close:hover { opacity: 0.85; }

.lightbox-close:focus-visible {
    outline: 3px solid var(--white);
    outline-offset: 2px;
}

.lightbox-figure {
    margin: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
}

#lightbox-img {
    display: block;
    max-width: 85vw;
    max-height: 75vh;
    width: auto;
    height: auto;
    border-radius: 16px;
    object-fit: contain;
}

#lightbox-caption {
    margin-top: 0.75rem;
    font-family: 'Baloo 2', cursive;
    font-size: 1.25rem;
    color: var(--white);
    text-align: center;
}

.lightbox-trigger {
    cursor: pointer;
}
```

**Test:** Page still looks identical. In DevTools console: `document.getElementById('cat-lightbox').showModal()` — dark backdrop appears, blank dialog visible. `document.getElementById('cat-lightbox').close()` to dismiss.

---

## Step 3 — Add attributes to cat `<img>` tags in cats.html

Add `class="lightbox-trigger"` and `data-name="[Cat Name]"` to each of the 6 cat images. Example:

```html
<img src="images/fosterCats/manja-vitolic-gKXKBY-C-Dk-unsplash.jpg"
     alt="Whiskers the cat"
     class="lightbox-trigger"
     data-name="Whiskers">
```

Apply to all 6 cats: Whiskers, Mittens, Biscuit, Shadow, Pumpkin, Luna.

**Test:** Hover any cat photo — cursor changes to a pointer hand.

---

## Step 4 — Wire up open logic in script.js

Append after the existing hamburger toggle code:

```js
// Lightbox
const lightbox = document.getElementById('cat-lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const lightboxClose = document.querySelector('.lightbox-close');

document.querySelectorAll('.lightbox-trigger').forEach(function(img) {
    img.addEventListener('click', function() {
        lightboxImg.src = '';
        lightboxImg.alt = img.alt;
        lightboxCaption.textContent = img.dataset.name;
        lightbox.showModal();
        lightboxImg.src = img.src;
        lightboxClose.focus();
    });
});
```

**Test:** Click any cat image — lightbox opens with full image and cat name caption. Escape key closes it (native `<dialog>` behavior, no JS needed).

---

## Step 5 — Wire up close behaviors in script.js

Append directly after the code from Step 4:

```js
// Close button
lightboxClose.addEventListener('click', function() {
    lightbox.close();
});

// Click outside (backdrop) to close
lightbox.addEventListener('click', function(e) {
    if (e.target === lightbox) {
        lightbox.close();
    }
});
```

**Test:** With lightbox open, verify three close paths:
1. Click the green × button — closes
2. Click the dark backdrop area — closes
3. Press Escape — closes (was already working from Step 4)

---

## Final script.js (complete, for reference)

```js
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Lightbox
const lightbox = document.getElementById('cat-lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const lightboxClose = document.querySelector('.lightbox-close');

document.querySelectorAll('.lightbox-trigger').forEach(function(img) {
    img.addEventListener('click', function() {
        lightboxImg.src = '';
        lightboxImg.alt = img.alt;
        lightboxCaption.textContent = img.dataset.name;
        lightbox.showModal();
        lightboxImg.src = img.src;
        lightboxClose.focus();
    });
});

lightboxClose.addEventListener('click', function() {
    lightbox.close();
});

lightbox.addEventListener('click', function(e) {
    if (e.target === lightbox) {
        lightbox.close();
    }
});
```

---

## Verification (end-to-end)

1. Open `cats.html` in a browser
2. Hover cat images — cursor should be a pointer
3. Click each of the 6 cat images — correct image and name appear in lightbox each time
4. Test all 3 close methods: × button, backdrop click, Escape key
5. Open on mobile viewport (DevTools device emulation) — image should fit within screen bounds via `max-width: 85vw` / `max-height: 75vh`
6. Tab to the × button and press Enter — lightbox closes (keyboard accessibility)
