// URL'den reklam ID'sini alma
function getAdId() {
    const params = new URLSearchParams(window.location.search);
    return parseInt(params.get('id'));
}

// Reklam detaylarını yükleme
async function loadAdDetails() {
    const adId = getAdId();
    if (!adId) {
        window.location.href = 'index.html';
        return;
    }

    try {
        const response = await fetch('../data/sample-ads.json');
        const data = await response.json();
        const ad = data.ads.find(a => a.id === adId);

        if (!ad) {
            window.location.href = 'index.html';
            return;
        }

        // Reklam detaylarını sayfaya yerleştirme
        document.getElementById('adImage').src = ad.image;
        document.getElementById('adImage').alt = ad.title;
        document.getElementById('adTitle').textContent = ad.title;
        document.getElementById('followers').textContent = `Takipçi: ${ad.followers}`;
        document.getElementById('engagementRate').textContent = `Etkileşim: ${ad.engagement_rate}`;
        document.getElementById('location').textContent = ad.location;
        document.getElementById('price').textContent = ad.price;
        document.getElementById('description').textContent = ad.description;
        document.getElementById('language').textContent = ad.language;

        // Platform rozeti oluşturma
        const platformBadge = document.getElementById('platformBadge');
        platformBadge.innerHTML = `
            <i class="fab fa-${ad.platform}"></i>
            ${ad.platform.charAt(0).toUpperCase() + ad.platform.slice(1)}
        `;

        // İçerik türlerini oluşturma
        const contentTypes = document.getElementById('contentTypes');
        contentTypes.innerHTML = ad.content_type.map(type => `
            <span class="content-type-badge">${type}</span>
        `).join('');

    } catch (error) {
        console.error('Reklam detayları yüklenirken hata oluştu:', error);
    }
}

// İletişim formu gönderimi
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value,
        adId: getAdId()
    };

    // Form gönderimi simülasyonu
    console.log('Form gönderildi:', formData);
    alert('Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız.');
    this.reset();
});

// Sayfa yüklendiğinde
document.addEventListener('DOMContentLoaded', () => {
    loadAdDetails();
}); 