/* =========================================================
   LOYALTY INK — Alpine.js & Custom Mobile Interactions
   ========================================================= */

function tattooStudio() {
  return {
    scrolled: false,
    mobileMenuOpen: false,
    modalOpen: false,
    formSubmitted: false,
    selectedStyle: '',
    lightboxOpen: false,
    lightboxImage: '',
    activeCategory: 'all',
    gallery: [
      { img: 'https://images.unsplash.com/photo-1604374376934-2df6fad6519b?auto=format&fit=crop&w=800&q=80', cat: 'custom', catName: 'Custom Tattoo', title: 'Black & Grey Custom Work' },
      { img: 'https://images.unsplash.com/photo-1501939387519-cf9c35d4f4eb?auto=format&fit=crop&w=800&q=80', cat: 'flash', catName: 'Flash Art', title: 'Custom Flash Special' },
      { img: 'https://images.unsplash.com/photo-1575492899586-009d962fc732?auto=format&fit=crop&w=800&q=80', cat: 'custom', catName: 'Custom Tattoo', title: 'Detailed Sleeve Work' },
      { img: 'https://images.unsplash.com/photo-1759247943688-5d47a84dd615?auto=format&fit=crop&w=800&q=80', cat: 'piercing', catName: 'Body Piercing', title: 'Precision Body Piercing' }
    ],

    initTheme() {
      // 1. Scroll Tracker
      window.addEventListener('scroll', () => {
        this.scrolled = window.scrollY > 30;
        const winScroll = document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const tracker = document.getElementById('scroll-tracker');
        if (tracker) {
          tracker.style.width = (winScroll / height) * 100 + '%';
        }
      });

      setTimeout(() => this.initAnimations(), 100);
    },

    openModal(style = '') {
      this.selectedStyle = style;
      this.formSubmitted = false;
      this.modalOpen = true;
    },

    openLightbox(imgSrc) {
      this.lightboxImage = imgSrc;
      this.lightboxOpen = true;
    },

    initAnimations() {
      // 2. Text Decrypt / Scramble FX
      const scrambleEl = document.querySelector('.scramble-text');
      if(scrambleEl) {
        const finalWord = "Loyalty Ink.";
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#%&*+";
        let iteration = 0;
        let interval = setInterval(() => {
          scrambleEl.innerText = finalWord.split("").map((letter, index) => {
            if (index < iteration) return finalWord[index];
            return chars[Math.floor(Math.random() * chars.length)];
          }).join("");
          if (iteration >= finalWord.length) clearInterval(interval);
          iteration += 1 / 3;
        }, 50);
      }

      // 3. GSAP ScrollTrigger Configurations
      gsap.registerPlugin(ScrollTrigger);

      // Parallax Hero (Desktop & Tablet only)
      if (window.innerWidth > 640) {
        gsap.to('.hero-bg', {
          y: '20%',
          scale: 1.1,
          ease: 'none',
          scrollTrigger: { trigger: '#home', start: 'top top', end: 'bottom top', scrub: true }
        });
      }

      // Staggered Reveals
      gsap.utils.toArray('.reveal-item').forEach(item => {
        gsap.from(item, {
          y: 30,
          opacity: 0,
          duration: 1.0,
          ease: 'power3.out',
          scrollTrigger: { trigger: item, start: 'top 92%' }
        });
      });

      // Dark Mask Unveil
      gsap.utils.toArray('.mask-reveal').forEach(container => {
        const overlay = container.querySelector('.mask-overlay');
        if (overlay) {
          gsap.to(overlay, {
            scaleY: 0,
            duration: 1.2,
            ease: 'power4.inOut',
            scrollTrigger: { trigger: container, start: 'top 85%' }
          });
        }
      });

      // 4. Spotlight Beam Math (Hover devices)
      if (window.matchMedia('(hover: hover)').matches) {
        document.querySelectorAll('.spotlight-card').forEach(card => {
          card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
          });
        });

        // 5. Magnetic CTA Pull
        document.querySelectorAll('.magnetic-btn').forEach(btn => {
          btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = (e.clientX - rect.left - rect.width / 2) * 0.3;
            const y = (e.clientY - rect.top - rect.height / 2) * 0.3;
            btn.style.transform = `translate(${x}px, ${y}px)`;
          });
          btn.addEventListener('mouseleave', () => {
            btn.style.transform = `translate(0px, 0px)`;
          });
        });
      }
    }
  };
}
