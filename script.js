document.addEventListener('DOMContentLoaded', function() {
    // Initialize particles.js for hero section
    if (document.getElementById('particles-js')) {
        initParticles();
    }
    
    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-toggle');
    const mainNav = document.getElementById('main-nav');
    
    if (mobileMenuBtn && mainNav) {
        mobileMenuBtn.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            
            // Change icon based on menu state
            const icon = this.querySelector('i');
            if (mainNav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
        // Close mobile menu when clicking on a nav link
        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                mainNav.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }
    
    // Smooth scrolling for navigation and CTA button
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    
    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Get the sticky header height to offset the scroll position
                const headerHeight = document.querySelector('header').offsetHeight;
                
                window.scrollTo({
                    top: targetElement.offsetTop - headerHeight,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Contact form submission with Formspree
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        // Create a success message div but keep it hidden initially
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.style.display = 'none';
        successDiv.innerHTML = `
            <h3>Thank you for your message!</h3>
            <p>We'll get back to you within 1–2 business days.</p>
        `;
        
        // Insert the success div after the form
        contactForm.parentNode.insertBefore(successDiv, contactForm.nextSibling);
        
        contactForm.addEventListener('submit', function(e) {
            // Don't prevent default - let the form submit to Formspree
            
            // Get the name for personalized message
            const name = document.getElementById('name').value;
            
            // Store form data for potential error recovery
            const formData = {
                name: name,
                email: document.getElementById('email').value,
                company: document.getElementById('company').value,
                message: document.getElementById('message').value
            };
            
            // Store form data in sessionStorage in case submission fails
            sessionStorage.setItem('formData', JSON.stringify(formData));
            
            // We'll let Formspree handle the actual submission
            // The page will redirect to Formspree's success page
        });
        
        // Check if we're returning from Formspree (success)
        if (window.location.search.includes('success=true') || 
            window.location.search.includes('submitted=true')) {
            
            // Hide the form
            contactForm.style.display = 'none';
            
            // Show success message
            successDiv.style.display = 'block';
            
            // Scroll to the success message
            window.scrollTo({
                top: successDiv.offsetTop - 100,
                behavior: 'smooth'
            });
            
            // Clear the stored form data
            sessionStorage.removeItem('formData');
        }
        
        // Check if we have stored form data (from a previous attempt)
        const storedData = sessionStorage.getItem('formData');
        if (storedData) {
            try {
                const formData = JSON.parse(storedData);
                
                // Pre-fill the form with stored data
                if (formData.name) document.getElementById('name').value = formData.name;
                if (formData.email) document.getElementById('email').value = formData.email;
                if (formData.company) document.getElementById('company').value = formData.company;
                if (formData.message) document.getElementById('message').value = formData.message;
            } catch (e) {
                console.error('Error parsing stored form data:', e);
                sessionStorage.removeItem('formData');
            }
        }
    }
    
    // Intersection Observer for animations
    const animatedElements = document.querySelectorAll('.animate-fade-in, .animate-slide-left, .animate-slide-right, .animate-slide-up');
    const serviceCards = document.querySelectorAll('.service-card');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    
    // Function to check if an element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // Create Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.visibility = 'visible';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    // Observe all animated elements
    animatedElements.forEach(element => {
        element.style.visibility = 'hidden';
        observer.observe(element);
    });
    
    // Function to add animation class when element is in viewport
    function animateOnScroll() {
        // Animate service cards
        serviceCards.forEach(card => {
            if (isInViewport(card) && !card.classList.contains('animate')) {
                card.classList.add('animate');
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }
        });
        
        // Animate testimonial cards
        testimonialCards.forEach(card => {
            if (isInViewport(card) && !card.classList.contains('animate')) {
                card.classList.add('animate');
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Set initial state for animation
    serviceCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    testimonialCards.forEach(card => {
        if (!card.classList.contains('animate-fade-in')) {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        }
    });
    
    // Run animation check on load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
});

// Function to initialize particles.js
function initParticles() {
    particlesJS('particles-js', {
        "particles": {
            "number": {
                "value": 80,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#b088ff"
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                },
                "polygon": {
                    "nb_sides": 5
                }
            },
            "opacity": {
                "value": 0.5,
                "random": false,
                "anim": {
                    "enable": false,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 3,
                "random": true,
                "anim": {
                    "enable": false,
                    "speed": 40,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#8a4fff",
                "opacity": 0.4,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 2,
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "grab"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 140,
                    "line_linked": {
                        "opacity": 1
                    }
                },
                "bubble": {
                    "distance": 400,
                    "size": 40,
                    "duration": 2,
                    "opacity": 8,
                    "speed": 3
                },
                "repulse": {
                    "distance": 200,
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true
    });
}
