const track = document.querySelector('.carousel-track');
const cards = Array.from(track.children);
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

let currentIndex = 1; // Start with second card as center (index 1)
const cardWidth = 830; // 800px + 30px gap

function updateCarousel() {
    // Calculate offset to center the current card
    const containerWidth = track.parentElement.offsetWidth;
    const offset = (containerWidth / 2) - (cardWidth / 2) - (currentIndex * cardWidth);
    
    track.style.transform = `translateX(${offset}px)`;
    
    // Update center class
    cards.forEach((card, index) => {
        card.classList.toggle('center', index === currentIndex);
    });
    
    // Keep buttons always enabled for looping
    prevBtn.style.opacity = '0.7';
    nextBtn.style.opacity = '0.7';
}

nextBtn.addEventListener('click', () => {
    currentIndex++;
    if (currentIndex >= cards.length) {
        currentIndex = 0; // Loop back to first card
    }
    updateCarousel();
});

prevBtn.addEventListener('click', () => {
    currentIndex--;
    if (currentIndex < 0) {
        currentIndex = cards.length - 1; // Loop to last card
    }
    updateCarousel();
});

// Handle window resize
window.addEventListener('resize', () => {
    updateCarousel();
});

// Initialize carousel
updateCarousel();

// Optional: Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        prevBtn.click();
    } else if (e.key === 'ArrowRight') {
        nextBtn.click();
    }
});

// Optional: Auto-play functionality (uncomment if you want auto-advance)
/*
setInterval(() => {
    nextBtn.click();
}, 5000); // Auto-advance every 5 seconds
*/