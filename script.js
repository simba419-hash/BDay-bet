const photoGrid = document.getElementById('photoGrid');
const audio = document.getElementById('birthdayAudio');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const closeLightbox = document.querySelector('.close-lightbox');
const progressBar = document.querySelector('.scroll-progress');

// 38 Local Photo Links (full quality)
const photoUrls = [
    "photos/photo1.jpeg",
    "photos/photo2.jpeg",
    "photos/photo3.jpeg",
    "photos/photo4.jpeg",
    "photos/photo5.jpeg",
    "photos/photo6.jpeg",
    "photos/photo7.jpeg",
    "photos/photo8.jpeg",
    "photos/photo9.jpeg",
    "photos/photo10.jpeg",
    "photos/photo11.jpeg",
    "photos/photo12.jpeg",
    "photos/photo13.jpeg",
    "photos/photo14.jpeg",
    "photos/photo15.jpeg",
    "photos/photo16.jpeg",
    "photos/photo17.jpeg",
    "photos/photo18.jpeg",
    "photos/photo19.jpeg",
    "photos/photo20.jpeg",
    "photos/photo21.jpeg",
    "photos/photo22.jpeg",
    "photos/photo23.jpeg",
    "photos/photo24.jpeg",
    "photos/photo25.jpeg",
    "photos/photo26.jpeg",
    "photos/photo27.jpeg",
    "photos/photo28.jpeg",
    "photos/photo29.jpeg",
    "photos/photo30.jpeg",
    "photos/photo31.jpeg",
    "photos/photo32.jpeg",
    "photos/photo33.jpeg",
    "photos/photo34.jpeg",
    "photos/photo35.jpeg",
    "photos/photo36.jpeg",
    "photos/photo37.jpeg",
    "photos/photo38.jpeg"
];

// 1. Populate Photo Grid
if (photoGrid) {
    photoUrls.forEach((url, index) => {
        const photoCard = document.createElement('div');
        photoCard.className = 'photo-card fade-in';

        const img = document.createElement('img');
        img.src = url;
        img.alt = `Memory with Aunty Betty ${index + 1}`;

        photoCard.appendChild(img);

        photoCard.addEventListener('click', () => {
            if (lightboxImg && lightbox) {
                lightboxImg.src = url;
                lightbox.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            }
        });

        photoGrid.appendChild(photoCard);
    });
}

// 2. Background Music Autoplay
function tryPlayMusic() {
    if (audio && audio.paused) {
        audio.play().catch(() => {});
    }
}

// Attempt to play on page load
tryPlayMusic();

// Fallback: start music on the first real user interaction if autoplay was
// blocked. Browsers block audio autoplay until the user interacts, so we
// listen for click/tap/key (NOT scroll, which fires immediately on load and
// would remove the fallback before the user ever interacts).
const startMusicOnInteraction = () => {
    tryPlayMusic();
    window.removeEventListener('click', startMusicOnInteraction);
    window.removeEventListener('keydown', startMusicOnInteraction);
    window.removeEventListener('touchstart', startMusicOnInteraction);
};
window.addEventListener('click', startMusicOnInteraction);
window.addEventListener('keydown', startMusicOnInteraction);
window.addEventListener('touchstart', startMusicOnInteraction);

// 3. Lightbox Close Handler
if (closeLightbox && lightbox) {
    closeLightbox.addEventListener('click', () => {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}

// 4. Scroll Progress and Fade-In Animations
function updateScrollEffects() {
    const winScroll = window.scrollY || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - window.innerHeight;

    if (progressBar && height > 0) {
        progressBar.style.width = `${(winScroll / height) * 100}%`;
    }

    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.9) {
            el.classList.add('visible');
        }
    });
}

window.addEventListener('scroll', updateScrollEffects);
updateScrollEffects();