const items = document.querySelectorAll('.carousel-item');
const dots = document.querySelectorAll('.dot');
const next = document.querySelector('.next');
const prev = document.querySelector('.prev');
let index = 0;
let autoPlay;

function showSlide(n) {
    index = n;
    items.forEach((item, i) => {
        item.classList.toggle('active', i === index);
        dots[i].classList.toggle('active', i === index);
    });
}

next.addEventListener('click', () => {
    index = (index + 1) % items.length;
    showSlide(index);
    restartAutoplay();
});

prev.addEventListener('click', () => {
    index = (index - 1 + items.length) % items.length;
    showSlide(index);
    restartAutoplay();
});

dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
        showSlide(i);
        restartAutoplay();
    });
});

function startAutoplay() {
    autoPlay = setInterval(() => {
        index = (index + 1) % items.length;
        showSlide(index);
    }, 10000); 
}

function restartAutoplay() {
    clearInterval(autoPlay);
    startAutoplay();
}

startAutoplay();
