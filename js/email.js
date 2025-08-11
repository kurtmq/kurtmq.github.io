document.addEventListener('DOMContentLoaded', function() {
    // Get the email link in the fourth section (more specific selector)
    const emailLink = document.querySelector('.social-links a[href="#hero-section"]');
    
    if (emailLink) {
        console.log('Email link found:', emailLink); // Debug log
        
        emailLink.addEventListener('click', function(e) {
            // Prevent default anchor behavior temporarily
            e.preventDefault();
            
            console.log('Email link clicked'); // Debug log
            
            // Scroll to hero section smoothly
            const heroSection = document.querySelector('#hero-section');
            if (heroSection) {
                heroSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
                
                console.log('Scrolling to hero section'); // Debug log
            }
            
            // Wait for scroll to complete, then highlight email
            setTimeout(() => {
                const emailElement = document.querySelector('.email-text');
                if (emailElement) {
                    console.log('Adding highlight to email element'); // Debug log
                    
                    // Add highlight class
                    emailElement.classList.add('email-highlight');
                    
                    // Remove highlight after 3 seconds
                    setTimeout(() => {
                        emailElement.classList.remove('email-highlight');
                        console.log('Highlight removed'); // Debug log
                    }, 3000);
                } else {
                    console.error('Email element not found');
                }
            }, 500);
        });
    } else {
        console.error('Email link not found');
    }
    
    // Add clipboard functionality to email text
    const emailElement = document.querySelector('.email-text');
    if (emailElement) {
        // Make email text cursor pointer to indicate it's clickable
        emailElement.style.cursor = 'pointer';
        emailElement.setAttribute('title', 'Click to copy email');
        
        // Create tooltip for copy feedback
        const tooltip = document.createElement('div');
        tooltip.className = 'copy-tooltip';
        tooltip.textContent = 'Copied to clipboard!';
        tooltip.style.cssText = `
            position: absolute;
            background: #4DA8FF;
            color: #0A1A2F;
            padding: 8px 12px;
            border-radius: 6px;
            font-size: 0.9rem;
            font-weight: bold;
            box-shadow: 0 4px 12px rgba(77, 168, 255, 0.3);
            opacity: 0;
            transform: translateY(-10px);
            transition: all 0.3s ease;
            pointer-events: none;
            z-index: 1000;
            white-space: nowrap;
        `;
        document.body.appendChild(tooltip);
        
        // Copy to clipboard function
        async function copyToClipboard(text) {
            try {
                await navigator.clipboard.writeText(text);
                return true;
            } catch (err) {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = text;
                textArea.style.position = 'fixed';
                textArea.style.left = '-999999px';
                textArea.style.top = '-999999px';
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                
                try {
                    document.execCommand('copy');
                    document.body.removeChild(textArea);
                    return true;
                } catch (err) {
                    document.body.removeChild(textArea);
                    return false;
                }
            }
        }
        
        // Show tooltip function
        function showTooltip(e) {
            const rect = emailElement.getBoundingClientRect();
            tooltip.style.left = (rect.left + rect.width / 2 - tooltip.offsetWidth / 2) + 'px';
            tooltip.style.top = (rect.top - tooltip.offsetHeight - 10) + 'px';
            tooltip.style.opacity = '1';
            tooltip.style.transform = 'translateY(0)';
        }
        
        // Hide tooltip function
        function hideTooltip() {
            tooltip.style.opacity = '0';
            tooltip.style.transform = 'translateY(-10px)';
        }
        
        // Copy on click only
        emailElement.addEventListener('click', async function(e) {
            e.preventDefault();
            const emailText = emailElement.textContent.trim();
            const success = await copyToClipboard(emailText);
            
            if (success) {
                console.log('Email copied to clipboard:', emailText);
                showTooltip(e);
                
                // Hide tooltip after 2 seconds
                setTimeout(hideTooltip, 2000);
            } else {
                console.error('Failed to copy email to clipboard');
            }
        });
    }
    
    // Alternative: Also handle direct navigation to hero section with hash
    if (window.location.hash === '#hero-section') {
        setTimeout(() => {
            const emailElement = document.querySelector('.email-text');
            if (emailElement) {
                emailElement.classList.add('email-highlight');
                setTimeout(() => {
                    emailElement.classList.remove('email-highlight');
                }, 3000);
            }
        }, 500);
    }
});