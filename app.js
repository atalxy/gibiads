// Örnek reklam verileri
const ads = [
    {
        id: 1,
        title: "Moda Influencer Kampanyası",
        platform: "instagram",
        category: "fashion",
        followers: 50000,
        price: 5000,
        image: "https://via.placeholder.com/400x300",
        description: "Moda ve yaşam tarzı odaklı influencer kampanyası. Hedef kitle: 18-35 yaş arası kadınlar.",
        engagement_rate: 4.5,
        location: "İstanbul",
        language: "Türkçe",
        content_type: ["Fotoğraf", "Video", "Story"]
    },
    {
        id: 2,
        title: "Teknoloji Ürün Tanıtımı",
        platform: "twitter",
        category: "tech",
        followers: 100000,
        price: 8000,
        image: "https://via.placeholder.com/400x300",
        description: "Yeni teknoloji ürünlerinin tanıtımı için influencer işbirliği. Hedef kitle: Teknoloji meraklıları.",
        engagement_rate: 3.8,
        location: "Türkiye",
        language: "Türkçe",
        content_type: ["Video", "Thread"]
    },
    {
        id: 3,
        title: "Yemek Tarifi Kampanyası",
        platform: "instagram",
        category: "food",
        followers: 75000,
        price: 6000,
        image: "https://via.placeholder.com/400x300",
        description: "Yemek tarifi ve restoran tanıtımı için influencer işbirliği. Hedef kitle: Yemek severler.",
        engagement_rate: 5.2,
        location: "İstanbul",
        language: "Türkçe",
        content_type: ["Fotoğraf", "Reels", "Story"]
    },
    {
        id: 4,
        title: "Spor Ekipmanları Tanıtımı",
        platform: "instagram",
        category: "sports",
        followers: 120000,
        price: 10000,
        image: "https://via.placeholder.com/400x300",
        description: "Spor ekipmanları ve fitness ürünleri tanıtımı. Hedef kitle: Spor ve fitness meraklıları.",
        engagement_rate: 4.8,
        location: "Türkiye",
        language: "Türkçe",
        content_type: ["Video", "Story", "Reels"]
    },
    {
        id: 5,
        title: "Oyun Tanıtımı",
        platform: "twitter",
        category: "gaming",
        followers: 150000,
        price: 12000,
        image: "https://via.placeholder.com/400x300",
        description: "Yeni oyun tanıtımı ve canlı yayın işbirliği. Hedef kitle: Oyun severler.",
        engagement_rate: 6.2,
        location: "Türkiye",
        language: "Türkçe",
        content_type: ["Video", "Thread", "Canlı Yayın"]
    }
];

// DOM yüklendiğinde çalışacak fonksiyonlar
document.addEventListener('DOMContentLoaded', () => {
    loadAds();
    setupEventListeners();
    initCounters();
});

// Reklamları yükleme fonksiyonu
function loadAds() {
    const adsContainer = document.getElementById('adsContainer');
    if (!adsContainer) return;

    adsContainer.innerHTML = ads.map(ad => createAdCard(ad)).join('');
}

// Reklam kartı oluşturma fonksiyonu
function createAdCard(ad) {
    return `
        <div class="ad-card fade-in">
            <img src="${ad.image}" alt="${ad.title}" class="ad-image">
            <div class="ad-content">
                <h3 class="ad-title">${ad.title}</h3>
                <span class="platform-badge ${ad.platform}">
                    <i class="fab fa-${ad.platform}"></i> ${ad.platform.charAt(0).toUpperCase() + ad.platform.slice(1)}
                </span>
                <div class="ad-stats">
                    <span><i class="fas fa-users"></i> ${ad.followers.toLocaleString()} Takipçi</span>
                    <span><i class="fas fa-chart-line"></i> %${ad.engagement_rate} Etkileşim</span>
                </div>
                <p class="ad-description">${ad.description}</p>
                <div class="ad-meta">
                    <span><i class="fas fa-map-marker-alt"></i> ${ad.location}</span>
                    <span><i class="fas fa-language"></i> ${ad.language}</span>
                </div>
                <div class="ad-price">
                    <span class="price">₺${ad.price.toLocaleString()}</span>
                    <button class="button primary-button" onclick="viewAdDetails(${ad.id})">Detayları Gör</button>
                </div>
            </div>
        </div>
    `;
}

// Event listener'ları kurma
function setupEventListeners() {
    // Platform seçimi
    const platformTabs = document.querySelectorAll('.platform-tab');
    platformTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            platformTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            filterAds();
        });
    });

    // Arama fonksiyonu
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('input', debounce(filterAds, 300));
    }

    // Form işlemleri
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }
}

// Sayaç animasyonları
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                animateCounter(counter, target);
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const duration = 2000;
    const interval = duration / 50;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target.toLocaleString();
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString();
        }
    }, interval);
}

// Reklam detaylarını görüntüleme
function viewAdDetails(adId) {
    const ad = ads.find(a => a.id === adId);
    if (!ad) return;

    // Detay sayfasına yönlendirme
    window.location.href = `detail.html?id=${adId}`;
}

// Reklamları filtreleme
function filterAds() {
    const searchInput = document.querySelector('.search-input');
    const activePlatform = document.querySelector('.platform-tab.active');
    const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
    const platform = activePlatform ? activePlatform.getAttribute('data-platform') : 'all';

    const filteredAds = ads.filter(ad => {
        const matchesSearch = ad.title.toLowerCase().includes(searchTerm) ||
                            ad.description.toLowerCase().includes(searchTerm);
        const matchesPlatform = platform === 'all' || ad.platform === platform;
        return matchesSearch && matchesPlatform;
    });

    const adsContainer = document.getElementById('adsContainer');
    if (adsContainer) {
        adsContainer.innerHTML = filteredAds.map(ad => createAdCard(ad)).join('');
    }
}

// Debounce fonksiyonu (performans için)
function debounce(func, wait) {
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

// Modal işlemleri
function showLoginModal() {
    const modal = document.getElementById('loginModal');
    if (modal) {
        modal.classList.add('active');
    }
}

function showRegisterModal() {
    const modal = document.getElementById('registerModal');
    if (modal) {
        modal.classList.add('active');
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
    }
}

function switchModal(fromModalId, toModalId) {
    closeModal(fromModalId);
    showModal(toModalId);
}

// Form işlemleri
function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    // API entegrasyonu burada yapılacak
    console.log('Login attempt:', { email, password });
    showSuccessMessage('Başarıyla giriş yapıldı!');
    closeModal('loginModal');
}

function handleRegister(e) {
    e.preventDefault();
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const passwordConfirm = document.getElementById('registerPasswordConfirm').value;

    if (password !== passwordConfirm) {
        showErrorMessage('Şifreler eşleşmiyor!');
        return;
    }

    // API entegrasyonu burada yapılacak
    console.log('Register attempt:', { name, email, password });
    showSuccessMessage('Kayıt başarılı! Giriş yapabilirsiniz.');
    closeModal('registerModal');
}

// Bildirim mesajları
function showSuccessMessage(message) {
    const notification = document.createElement('div');
    notification.className = 'success-message';
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
    `;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
}

function showErrorMessage(message) {
    const notification = document.createElement('div');
    notification.className = 'error-message';
    notification.innerHTML = `
        <i class="fas fa-exclamation-circle"></i>
        <span>${message}</span>
    `;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
}

// Sayfa yüklendiğinde animasyon
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
}); 