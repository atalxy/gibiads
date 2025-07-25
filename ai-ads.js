// Animasyonlu sayaç
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target.toLocaleString();
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start).toLocaleString();
        }
    }, 16);
}

// İstatistik sayaçlarını başlat
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateCounter(entry.target, target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
}

// Özellik kartları için hover efekti
const featureCards = document.querySelectorAll('.feature-card');

featureCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.classList.add('hover');
    });
    
    card.addEventListener('mouseleave', () => {
        card.classList.remove('hover');
    });
});

// Nasıl Çalışır bölümü için animasyon
const steps = document.querySelectorAll('.step');

const stepObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, { threshold: 0.5 });

steps.forEach(step => stepObserver.observe(step));

// CTA butonları için hover efekti
const ctaButtons = document.querySelectorAll('.cta-button');

ctaButtons.forEach(button => {
    button.addEventListener('mouseenter', () => {
        button.classList.add('hover');
    });
    
    button.addEventListener('mouseleave', () => {
        button.classList.remove('hover');
    });
});

// Sayfa yüklendiğinde sayaçları başlat
document.addEventListener('DOMContentLoaded', () => {
    initCounters();
});

// Smooth scroll
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

// Mobil menü
const mobileMenuButton = document.querySelector('.mobile-menu-button');
const mobileMenu = document.querySelector('.mobile-menu');

if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        mobileMenuButton.classList.toggle('active');
    });
    
    // Menü dışına tıklandığında menüyü kapat
    document.addEventListener('click', (e) => {
        if (!mobileMenu.contains(e.target) && !mobileMenuButton.contains(e.target)) {
            mobileMenu.classList.remove('active');
            mobileMenuButton.classList.remove('active');
        }
    });
}

// Sayfa yüklendiğinde animasyon
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
}); 