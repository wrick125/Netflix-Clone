// Enhanced Netflix Clone JavaScript
class NetflixClone {
    constructor() {
        this.init();
        this.setupEventListeners();
        this.setupIntersectionObserver();
        this.setupLoadingAnimation();
    }

    init() {
        // Initialize FAQ functionality
        this.setupFAQ();
        
        // Initialize email validation
        this.setupEmailValidation();
        
        // Initialize smooth scrolling
        this.setupSmoothScrolling();
        
        // Initialize language selector
        this.setupLanguageSelector();
        
        // Initialize video controls
        this.setupVideoControls();
        
        // Initialize loading states
        this.setupLoadingStates();
        
        // Debug video elements
        this.debugVideos();
        
        console.log('Netflix Clone initialized successfully!');
    }

    setupEventListeners() {
        // Window events
        window.addEventListener('load', () => {
            this.hideLoadingOverlay();
            this.startAnimations();
        });

        window.addEventListener('scroll', () => {
            this.handleScroll();
        });

        window.addEventListener('resize', () => {
            this.handleResize();
        });

        // Get Started buttons
        document.querySelectorAll('.get-started-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.handleGetStarted(e);
            });
        });

        // Sign In button
        const signInBtn = document.querySelector('.btn-sign');
        if (signInBtn) {
            signInBtn.addEventListener('click', () => {
                this.handleSignIn();
            });
        }
        

    }

    setupLoadingAnimation() {
        const loadingOverlay = document.getElementById('loadingOverlay');
        
        // Show loading overlay initially
        if (loadingOverlay) {
            loadingOverlay.classList.add('active');
            
            // Hide after 2 seconds or when page loads
            setTimeout(() => {
                this.hideLoadingOverlay();
            }, 2000);
        }
    }

    hideLoadingOverlay() {
        const loadingOverlay = document.getElementById('loadingOverlay');
        if (loadingOverlay) {
            loadingOverlay.classList.remove('active');
            setTimeout(() => {
                loadingOverlay.style.display = 'none';
            }, 300);
        }
    }

    setupFAQ() {
        const faqItems = document.querySelectorAll('.faq-item');
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close all FAQ items
                faqItems.forEach(faq => {
                    faq.classList.remove('active');
                });
                
                // Open clicked item if it wasn't active
                if (!isActive) {
                    item.classList.add('active');
                    
                    // Scroll into view with offset
                    setTimeout(() => {
                        const rect = item.getBoundingClientRect();
                        const offset = window.pageYOffset + rect.top - 100;
                        window.scrollTo({
                            top: offset,
                            behavior: 'smooth'
                        });
                    }, 300);
                }
            });
        });
    }

    setupEmailValidation() {
        const emailInputs = document.querySelectorAll('.email-input');
        
        emailInputs.forEach(input => {
            // Real-time validation
            input.addEventListener('input', (e) => {
                this.validateEmail(e.target);
            });
            
            // Validation on blur
            input.addEventListener('blur', (e) => {
                this.validateEmail(e.target);
            });
            
            // Enhanced focus effects
            input.addEventListener('focus', (e) => {
                e.target.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', (e) => {
                e.target.parentElement.classList.remove('focused');
            });
        });
    }

    validateEmail(input) {
        const email = input.value;
        const isValid = this.isValidEmail(email);
        
        // Remove existing validation classes
        input.classList.remove('valid', 'invalid');
        
        if (email.length > 0) {
            if (isValid) {
                input.classList.add('valid');
                this.removeErrorMessage(input);
            } else {
                input.classList.add('invalid');
                this.showErrorMessage(input, 'Please enter a valid email address');
            }
        } else {
            this.removeErrorMessage(input);
        }
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    showErrorMessage(input, message) {
        this.removeErrorMessage(input);
        
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        errorElement.style.cssText = `
            color: #e87c03;
            font-size: 14px;
            margin-top: 8px;
            animation: fadeInUp 0.3s ease;
        `;
        
        input.parentElement.appendChild(errorElement);
    }

    removeErrorMessage(input) {
        const errorElement = input.parentElement.querySelector('.error-message');
        if (errorElement) {
            errorElement.remove();
        }
    }

    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, observerOptions);

        // Observe feature sections and FAQ items
        document.querySelectorAll('.feature-section, .faq-item').forEach(el => {
            observer.observe(el);
        });
    }

    setupSmoothScrolling() {
        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    setupLanguageSelector() {
        const languageSelectors = document.querySelectorAll('.btn-lang');
        
        languageSelectors.forEach(selector => {
            selector.addEventListener('change', (e) => {
                const selectedLanguage = e.target.value;
                this.handleLanguageChange(selectedLanguage);
            });
        });
        
        // Initialize with stored language preference
        const storedLanguage = localStorage.getItem('preferred-language') || 'en';
        this.handleLanguageChange(storedLanguage);
    }

    handleLanguageChange(language) {
        try {
            // Store language preference
            localStorage.setItem('preferred-language', language);
            
            // Update all language selectors
            document.querySelectorAll('.btn-lang').forEach(selector => {
                selector.value = language;
            });
            
            // Simple language switching without complex DOM manipulation
            if (language === 'hi') {
                this.translateToHindi();
            } else {
                this.translateToEnglish();
            }
            
            // Add smooth transition effect
            document.body.classList.add('language-change');
            setTimeout(() => {
                document.body.classList.remove('language-change');
            }, 300);
            
        } catch (error) {
            console.error('Language change error:', error);
            // Fallback to English if there's an error
            this.translateToEnglish();
        }
    }

    translateToHindi() {
        // Simple text replacements for key elements
        const translations = {
            'Unlimited movies, TV shows and more': 'असीमित फिल्में, टीवी शो और बहुत कुछ',
            'Watch anywhere. Cancel anytime.': 'कहीं भी देखें। कभी भी रद्द करें।',
            'Ready to watch? Enter your email to create or restart your membership.': 'देखने के लिए तैयार? अपनी सदस्यता बनाने या पुनः आरंभ करने के लिए अपना ईमेल दर्ज करें।',
            'Get Started': 'शुरू करें',
            'Email address': 'ईमेल पता',
            'Enjoy on your TV': 'अपने टीवी पर आनंद लें',
            'Watch on smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray players and more.': 'स्मार्ट टीवी, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray प्लेयर्स और बहुत कुछ पर देखें।',
            'Watch everywhere': 'हर जगह देखें',
            'Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV.': 'अपने फोन, टैबलेट, लैपटॉप और टीवी पर असीमित फिल्में और टीवी शो स्ट्रीम करें।',
            'Download your shows to watch offline': 'ऑफलाइन देखने के लिए अपने शो डाउनलोड करें',
            'Save your data and watch all your favorites offline.': 'अपना डेटा बचाएं और अपने सभी पसंदीदा शो ऑफलाइन देखें।',
            'Stranger Things': 'स्ट्रेंजर थिंग्स',
            'Downloading...': 'डाउनलोड हो रहा है...',
            'Watch on smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray players and more.': 'स्मार्ट टीवी, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray प्लेयर्स और बहुत कुछ पर देखें।',
            'Frequently Asked Questions': 'अक्सर पूछे जाने वाले प्रश्न',
            'What is Netflix?': 'नेटफ्लिक्स क्या है?',
            'Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.': 'नेटफ्लिक्स एक स्ट्रीमिंग सेवा है जो हजारों इंटरनेट-कनेक्टेड उपकरणों पर पुरस्कार विजेता टीवी शो, फिल्में, एनीमे, डॉक्यूमेंटरी और बहुत कुछ प्रदान करती है।',
            'How much does Netflix cost?': 'नेटफ्लिक्स की कीमत कितनी है?',
            'Watch Netflix on your smartphone, tablet, Smart TV, laptop, or streaming device, all for one fixed monthly fee. Plans range from ₹ 149 to ₹ 649 a month. No extra costs, no contracts.': 'अपने स्मार्टफोन, टैबलेट, स्मार्ट टीवी, लैपटॉप या स्ट्रीमिंग डिवाइस पर नेटफ्लिक्स देखें, सभी एक निश्चित मासिक शुल्क के लिए। योजनाएं ₹149 से ₹649 प्रति माह तक हैं। कोई अतिरिक्त लागत नहीं, कोई अनुबंध नहीं।',
            'Where can I watch?': 'मैं कहाँ देख सकता हूं?',
            'Netflix has an extensive library of feature films, documentaries, TV shows, anime, award-winning Netflix originals, and more. Watch as much as you want, anytime you want.': 'नेटफ्लिक्स में फीचर फिल्में, डॉक्यूमेंटरी, टीवी शो, एनीमे, पुरस्कार विजेता नेटफ्लिक्स ओरिजिनल्स और बहुत कुछ का विशाल संग्रह है। जितना चाहें उतना देखें, जब चाहें तब देखें।',
            'How do I cancel?': 'मैं कैसे रद्द करूं?',
            'Netflix is flexible. There are no pesky contracts and no commitments. You can easily cancel your account online in two clicks. There are no cancellation fees – start or stop your account anytime.': 'नेटफ्लिक्स लचीला है। कोई परेशान करने वाले अनुबंध नहीं हैं और कोई प्रतिबद्धता नहीं है। आप दो क्लिक में आसानी से अपना खाता ऑनलाइन रद्द कर सकते हैं। कोई रद्दीकरण शुल्क नहीं है - कभी भी अपना खाता शुरू या बंद करें।',
            'What can I watch on Netflix?': 'मैं नेटफ्लिक्स पर क्या देख सकता हूं?',
            'Netflix has an extensive library of feature films, documentaries, TV shows, anime, award-winning Netflix originals, and more. Watch as much as you want, anytime you want.': 'नेटफ्लिक्स में फीचर फिल्में, डॉक्यूमेंटरी, टीवी शो, एनीमे, पुरस्कार विजेता नेटफ्लिक्स ओरिजिनल्स और बहुत कुछ का विशाल संग्रह है। जितना चाहें उतना देखें, जब चाहें तब देखें।',
            'Is Netflix good for kids?': 'क्या नेटफ्लिक्स बच्चों के लिए अच्छा है?',
            'The Netflix Kids experience is included in your membership to give parents control while kids enjoy family-friendly TV shows and movies in their own space.': 'नेटफ्लिक्स किड्स अनुभव आपकी सदस्यता में शामिल है ताकि माता-पिता को नियंत्रण मिले जबकि बच्चे अपने स्वयं के स्थान में परिवार के अनुकूल टीवी शो और फिल्मों का आनंद लें।',
            'Questions? Call': 'प्रश्न? कॉल करें',
            'FAQ': 'सामान्य प्रश्न',
            'Help Centre': 'सहायता केंद्र',
            'Account': 'खाता',
            'Media Centre': 'मीडिया केंद्र',
            'Investor Relations': 'निवेशक संबंध',
            'Jobs': 'नौकरियां',
            'Ways to Watch': 'देखने के तरीके',
            'Terms of Use': 'उपयोग की शर्तें',
            'Privacy': 'गोपनीयता',
            'Cookie Preferences': 'कुकी प्राथमिकताएं',
            'Corporate Information': 'कॉर्पोरेट जानकारी',
            'Contact Us': 'हमसे संपर्क करें',
            'Speed Test': 'स्पीड टेस्ट',
            'Legal Notices': 'कानूनी नोटिस',
            'Only on Netflix': 'केवल नेटफ्लिक्स पर'
        };
        
        // Apply translations to text content
        Object.keys(translations).forEach(englishText => {
            const hindiText = translations[englishText];
            this.replaceTextInDOM(englishText, hindiText);
        });
        
        // Update form placeholders
        const emailInput = document.querySelector('.email-input');
        if (emailInput) {
            emailInput.placeholder = 'ईमेल पता';
        }
        
        // Update button text
        const getStartedBtn = document.querySelector('.get-started-btn');
        if (getStartedBtn) {
            getStartedBtn.innerHTML = 'शुरू करें <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/></svg>';
        }
        
        // Update download animation text
        const downloadStatus = document.querySelector('.download-status');
        if (downloadStatus) {
            downloadStatus.textContent = 'डाउनलोड हो रहा है...';
        }
        
        // Update Stranger Things text
        const showTitle = document.querySelector('.show-title');
        if (showTitle) {
            showTitle.textContent = 'स्ट्रेंजर थिंग्स';
        }
    }

    translateToEnglish() {
        // Simple text replacements back to English
        const translations = {
            'असीमित फिल्में, टीवी शो और बहुत कुछ': 'Unlimited movies, TV shows and more',
            'कहीं भी देखें। कभी भी रद्द करें।': 'Watch anywhere. Cancel anytime.',
            'देखने के लिए तैयार? अपनी सदस्यता बनाने या पुनः आरंभ करने के लिए अपना ईमेल दर्ज करें।': 'Ready to watch? Enter your email to create or restart your membership.',
            'शुरू करें': 'Get Started',
            'ईमेल पता': 'Email address',
            'अपने टीवी पर आनंद लें': 'Enjoy on your TV',
            'स्मार्ट टीवी, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray प्लेयर्स और बहुत कुछ पर देखें।': 'Watch on smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray players and more.',
            'हर जगह देखें': 'Watch everywhere',
            'अपने फोन, टैबलेट, लैपटॉप और टीवी पर असीमित फिल्में और टीवी शो स्ट्रीम करें।': 'Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV.',
            'ऑफलाइन देखने के लिए अपने शो डाउनलोड करें': 'Download your shows to watch offline',
            'अपना डेटा बचाएं और अपने सभी पसंदीदा शो ऑफलाइन देखें।': 'Save your data and watch all your favorites offline.',
            'अक्सर पूछे जाने वाले प्रश्न': 'Frequently Asked Questions',
            'नेटफ्लिक्स क्या है?': 'What is Netflix?',
            'नेटफ्लिक्स एक स्ट्रीमिंग सेवा है जो हजारों इंटरनेट-कनेक्टेड उपकरणों पर पुरस्कार विजेता टीवी शो, फिल्में, एनीमे, डॉक्यूमेंटरी और बहुत कुछ प्रदान करती है।': 'Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.',
            'नेटफ्लिक्स की कीमत कितनी है?': 'How much does Netflix cost?',
            'अपने स्मार्टफोन, टैबलेट, स्मार्ट टीवी, लैपटॉप या स्ट्रीमिंग डिवाइस पर नेटफ्लिक्स देखें, सभी एक निश्चित मासिक शुल्क के लिए। योजनाएं ₹149 से ₹649 प्रति माह तक हैं। कोई अतिरिक्त लागत नहीं, कोई अनुबंध नहीं।': 'Watch Netflix on your smartphone, tablet, Smart TV, laptop, or streaming device, all for one fixed monthly fee. Plans range from ₹ 149 to ₹ 649 a month. No extra costs, no contracts.',
            'मैं कहाँ देख सकता हूं?': 'Where can I watch?',
            'नेटफ्लिक्स में फीचर फिल्में, डॉक्यूमेंटरी, टीवी शो, एनीमे, पुरस्कार विजेता नेटफ्लिक्स ओरिजिनल्स और बहुत कुछ का विशाल संग्रह है। जितना चाहें उतना देखें, जब चाहें तब देखें।': 'Netflix has an extensive library of feature films, documentaries, TV shows, anime, award-winning Netflix originals, and more. Watch as much as you want, anytime you want.',
            'मैं कैसे रद्द करूं?': 'How do I cancel?',
            'नेटफ्लिक्स लचीला है। कोई परेशान करने वाले अनुबंध नहीं हैं और कोई प्रतिबद्धता नहीं है। आप दो क्लिक में आसानी से अपना खाता ऑनलाइन रद्द कर सकते हैं। कोई रद्दीकरण शुल्क नहीं है - कभी भी अपना खाता शुरू या बंद करें।': 'Netflix is flexible. There are no pesky contracts and no commitments. You can easily cancel your account online in two clicks. There are no cancellation fees – start or stop your account anytime.',
            'मैं नेटफ्लिक्स पर क्या देख सकता हूं?': 'What can I watch on Netflix?',
            'क्या नेटफ्लिक्स बच्चों के लिए अच्छा है?': 'Is Netflix good for kids?',
            'नेटफ्लिक्स किड्स अनुभव आपकी सदस्यता में शामिल है ताकि माता-पिता को नियंत्रण मिले जबकि बच्चे अपने स्वयं के स्थान में परिवार के अनुकूल टीवी शो और फिल्मों का आनंद लें।': 'The Netflix Kids experience is included in your membership to give parents control while kids enjoy family-friendly TV shows and movies in their own space.',
            'प्रश्न? कॉल करें': 'Questions? Call',
            'सामान्य प्रश्न': 'FAQ',
            'सहायता केंद्र': 'Help Centre',
            'खाता': 'Account',
            'मीडिया केंद्र': 'Media Centre',
            'निवेशक संबंध': 'Investor Relations',
            'नौकरियां': 'Jobs',
            'देखने के तरीके': 'Ways to Watch',
            'उपयोग की शर्तें': 'Terms of Use',
            'गोपनीयता': 'Privacy',
            'कुकी प्राथमिकताएं': 'Cookie Preferences',
            'कॉर्पोरेट जानकारी': 'Corporate Information',
            'हमसे संपर्क करें': 'Contact Us',
            'स्पीड टेस्ट': 'Speed Test',
            'कानूनी नोटिस': 'Legal Notices',
            'केवल नेटफ्लिक्स पर': 'Only on Netflix',
            'स्ट्रेंजर थिंग्स': 'Stranger Things',
            'डाउनलोड हो रहा है...': 'Downloading...'
        };
        
        // Apply translations back to English
        Object.keys(translations).forEach(hindiText => {
            const englishText = translations[hindiText];
            this.replaceTextInDOM(hindiText, englishText);
        });
        
        // Update form placeholders back to English
        const emailInput = document.querySelector('.email-input');
        if (emailInput) {
            emailInput.placeholder = 'Email address';
        }
        
        // Update button text back to English
        const getStartedBtn = document.querySelector('.get-started-btn');
        if (getStartedBtn) {
            getStartedBtn.innerHTML = 'Get Started <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/></svg>';
        }
        
        // Update Stranger Things text back to English
        const showTitle = document.querySelector('.show-title');
        if (showTitle) {
            showTitle.textContent = 'Stranger Things';
        }
        
        // Update download status back to English
        const downloadStatus = document.querySelector('.download-status');
        if (downloadStatus) {
            downloadStatus.textContent = 'Downloading...';
        }
    }

    replaceTextInDOM(oldText, newText) {
        // Simple text replacement without complex DOM manipulation
        const walker = document.createTreeWalker(
            document.body,
            NodeFilter.SHOW_TEXT,
            null,
            false
        );
        
        const textNodes = [];
        let node;
        while (node = walker.nextNode()) {
            if (node.textContent.includes(oldText)) {
                textNodes.push(node);
            }
        }
        
        textNodes.forEach(textNode => {
            textNode.textContent = textNode.textContent.replace(oldText, newText);
        });
    }
    
    // Google Translate functionality removed to prevent crashes

    setupVideoControls() {
        const videos = document.querySelectorAll('.feature-video');
        
        videos.forEach(video => {
            // Ensure video is visible
            video.style.display = 'block';
            video.style.visibility = 'visible';
            video.style.opacity = '1';
            
            // Ensure video is muted for autoplay to work
            video.muted = true;
            video.volume = 0;
            
            // Add playsinline attribute for mobile
            video.setAttribute('playsinline', '');
            video.setAttribute('webkit-playsinline', '');
            
            // Force video to be visible
            video.removeAttribute('hidden');
            
            // Pause video when not in viewport
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Try to play video with error handling
                        const playPromise = video.play();
                        if (playPromise !== undefined) {
                            playPromise.catch(error => {
                                console.log('Video autoplay failed:', error);
                                // Fallback: try to play on user interaction
                                document.addEventListener('click', () => {
                                    video.play().catch(e => console.log('Video play failed:', e));
                                }, { once: true });
                            });
                        }
                    } else {
                        video.pause();
                    }
                });
            });
            
            observer.observe(video);
            
            // Add loading state
            video.addEventListener('loadstart', () => {
                video.style.opacity = '0.5';
                console.log('Video loading started:', video.src);
            });
            
            video.addEventListener('canplay', () => {
                video.style.opacity = '1';
                console.log('Video can play:', video.src);
                // Try to play when video is ready
                video.play().catch(e => console.log('Video play failed:', e));
            });
            
            // Handle video errors
            video.addEventListener('error', (e) => {
                console.log('Video error:', e);
                console.log('Video src:', video.src);
                // Don't hide video on error, just log it
            });
            
            // Ensure video loops properly
            video.addEventListener('ended', () => {
                video.currentTime = 0;
                video.play().catch(e => console.log('Video replay failed:', e));
            });
            
            // Log video setup
            console.log('Video setup complete:', video.src);
        });
    }

    setupLoadingStates() {
        // Add loading states to buttons
        document.querySelectorAll('button').forEach(button => {
            button.addEventListener('click', () => {
                if (!button.classList.contains('loading')) {
                    this.addLoadingState(button);
                }
            });
        });
    }

    addLoadingState(button) {
        const originalText = button.innerHTML;
        button.classList.add('loading');
        button.disabled = true;
        
        // Add spinner
        button.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <circle cx="10" cy="10" r="8" stroke="currentColor" stroke-width="2" fill="none" stroke-dasharray="32" stroke-dashoffset="32">
                    <animate attributeName="stroke-dasharray" dur="1s" values="0 32;16 16;0 32" repeatCount="indefinite"/>
                    <animate attributeName="stroke-dashoffset" dur="1s" values="0;-16;-32" repeatCount="indefinite"/>
                </circle>
            </svg>
            Loading...
        `;
        
        // Remove loading state after 2 seconds
        setTimeout(() => {
            button.classList.remove('loading');
            button.disabled = false;
            button.innerHTML = originalText;
        }, 2000);
    }

    handleGetStarted(e) {
        e.preventDefault();
        
        const emailInput = e.target.closest('.email-signup')?.querySelector('.email-input');
        if (emailInput) {
            const email = emailInput.value;
            
            if (!email) {
                emailInput.focus();
                this.showErrorMessage(emailInput, 'Email is required');
                return;
            }
            
            if (!this.isValidEmail(email)) {
                emailInput.focus();
                this.showErrorMessage(emailInput, 'Please enter a valid email address');
                return;
            }
            
            // Store email and redirect (simulated)
            localStorage.setItem('signup-email', email);
            this.showNotification('Redirecting to sign up...', 'success');
            
            // Simulate redirect
            setTimeout(() => {
                console.log('Redirecting to: /signup with email:', email);
                // window.location.href = '/signup';
            }, 1000);
        }
    }

    handleSignIn() {
        this.showNotification('Redirecting to sign in...', 'info');
        
        // Simulate redirect
        setTimeout(() => {
            console.log('Redirecting to: /login');
            // window.location.href = '/login';
        }, 1000);
    }

    handleScroll() {
        const scrollTop = window.pageYOffset;
        const nav = document.querySelector('nav');
        
        // Add background to nav on scroll
        if (scrollTop > 50) {
            nav.style.background = 'rgba(0, 0, 0, 0.9)';
            nav.style.backdropFilter = 'blur(10px)';
        } else {
            nav.style.background = 'linear-gradient(180deg, rgba(0,0,0,0.7) 0%, transparent 100%)';
            nav.style.backdropFilter = 'blur(10px)';
        }
        
        // Parallax effect for hero section
        const main = document.querySelector('.main');
        if (main && scrollTop < window.innerHeight) {
            main.style.transform = `translateY(${scrollTop * 0.5}px)`;
        }
    }

    handleResize() {
        // Handle responsive adjustments
        const width = window.innerWidth;
        
        // Adjust video sizes on mobile
        if (width < 768) {
            document.querySelectorAll('.feature-video').forEach(video => {
                video.style.width = '60%';
            });
        } else {
            document.querySelectorAll('.feature-video').forEach(video => {
                video.style.width = '';
            });
        }
    }

    startAnimations() {
        // Add entrance animations
        document.querySelectorAll('.hero > *').forEach((el, index) => {
            el.style.animationDelay = `${index * 0.1}s`;
            el.classList.add('fade-in-up');
        });
    }

    showNotification(message, type = 'info') {
        // Remove existing notifications
        document.querySelectorAll('.notification').forEach(notif => {
            notif.remove();
        });
        
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">
                    ${this.getNotificationIcon(type)}
                </span>
                <span class="notification-message">${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10000;
            background: ${this.getNotificationBg(type)};
            color: white;
            padding: 16px 20px;
            border-radius: 8px;
            box-shadow: 0 8px 25px rgba(0,0,0,0.3);
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 400px;
        `;
        
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Auto-hide after 4 seconds
        setTimeout(() => {
            this.hideNotification(notification);
        }, 4000);
        
        // Close button functionality
        notification.querySelector('.notification-close').addEventListener('click', () => {
            this.hideNotification(notification);
        });
    }

    hideNotification(notification) {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }

    getNotificationIcon(type) {
        const icons = {
            success: '✓',
            error: '✕',
            warning: '⚠',
            info: 'ℹ'
        };
        return icons[type] || icons.info;
    }

    getNotificationBg(type) {
        const colors = {
            success: '#28a745',
            error: '#dc3545',
            warning: '#ffc107',
            info: '#17a2b8'
        };
        return colors[type] || colors.info;
    }
    
    debugVideos() {
        const videos = document.querySelectorAll('.feature-video');
        console.log('Found videos:', videos.length);
        
        videos.forEach((video, index) => {
            console.log(`Video ${index + 1}:`, {
                src: video.src,
                currentSrc: video.currentSrc,
                readyState: video.readyState,
                networkState: video.networkState,
                error: video.error,
                display: getComputedStyle(video).display,
                visibility: getComputedStyle(video).visibility,
                opacity: getComputedStyle(video).opacity,
                position: getComputedStyle(video).position,
                zIndex: getComputedStyle(video).zIndex
            });
        });
    }

    // Utility methods
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
}

// Enhanced CSS animations via JavaScript
const style = document.createElement('style');
style.textContent = `
    .fade-in-up {
        animation: fadeInUp 0.8s ease-out forwards;
    }
    
    .email-input.valid {
        border-color: #28a745;
        box-shadow: 0 0 0 2px rgba(40, 167, 69, 0.2);
    }
    
    .email-input.invalid {
        border-color: #e87c03;
        box-shadow: 0 0 0 2px rgba(232, 124, 3, 0.2);
    }
    
    .email-signup.focused {
        transform: translateY(-2px);
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 12px;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 20px;
        cursor: pointer;
        padding: 0;
        margin-left: auto;
    }
    
    .notification-close:hover {
        opacity: 0.7;
    }
    
    button.loading {
        opacity: 0.7;
        cursor: not-allowed;
        pointer-events: none;
    }
`;

document.head.appendChild(style);

// Initialize the Netflix Clone when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new NetflixClone();
});

// Additional enhancements
window.addEventListener('load', () => {
    // Preload critical images
    const criticalImages = [
        'asset/images/tv.png',
        'asset/images/mobile-0819.jpg',
        'asset/images/device-pile-in.png',
        'asset/images/cartoon.png'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
    
    // Performance monitoring
    if ('performance' in window) {
        const perfData = performance.getEntriesByType('navigation')[0];
        console.log(`Page load time: ${perfData.loadEventEnd - perfData.loadEventStart}ms`);
    }
});

// Service Worker registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('SW registered: ', registration);
            })
            .catch((registrationError) => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}