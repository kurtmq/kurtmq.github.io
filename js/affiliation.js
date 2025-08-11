        let currentSlide = 0;
        const totalSlides = 3;

        function showSlide(slideIndex) {
            const container = document.getElementById('affiliationsContainer');
            const dots = document.querySelectorAll('.slider-dot');
            
            currentSlide = slideIndex;
            container.style.transform = `translateX(-${slideIndex * 100}%)`;
            
            // Update active dot
            dots.forEach((dot, index) => {
                if (index === slideIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }

        // Auto-slide functionality (optional)
        function autoSlide() {
            currentSlide = (currentSlide + 1) % totalSlides;
            showSlide(currentSlide);
        }

        // Uncomment the line below if you want auto-sliding every 5 seconds

        setInterval(autoSlide, 5000);
