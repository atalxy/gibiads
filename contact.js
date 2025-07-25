// Form validasyonu ve gönderimi
const contactForm = document.getElementById('contactForm');

document.addEventListener('DOMContentLoaded', function() {
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Form verilerini al
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };
            
            // Form doğrulama
            if (!validateForm(formData)) {
                return;
            }
            
            // Form gönderimi simülasyonu
            submitForm(formData);
        });
    }
    
    // FAQ açılır/kapanır
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            // Diğer açık öğeleri kapat
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Tıklanan öğeyi aç/kapat
            item.classList.toggle('active');
        });
    });
});

// Form doğrulama
function validateForm(data) {
    let isValid = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    // İsim kontrolü
    if (!data.name.trim()) {
        showError('name', 'Lütfen adınızı girin');
        isValid = false;
    } else {
        clearError('name');
    }
    
    // E-posta kontrolü
    if (!data.email.trim()) {
        showError('email', 'Lütfen e-posta adresinizi girin');
        isValid = false;
    } else if (!emailRegex.test(data.email)) {
        showError('email', 'Geçerli bir e-posta adresi girin');
        isValid = false;
    } else {
        clearError('email');
    }
    
    // Konu kontrolü
    if (!data.subject.trim()) {
        showError('subject', 'Lütfen bir konu girin');
        isValid = false;
    } else {
        clearError('subject');
    }
    
    // Mesaj kontrolü
    if (!data.message.trim()) {
        showError('message', 'Lütfen mesajınızı girin');
        isValid = false;
    } else {
        clearError('message');
    }
    
    return isValid;
}

// Hata gösterme
function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    
    // Varsa eski hata mesajını kaldır
    const existingError = field.parentElement.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    field.parentElement.appendChild(errorDiv);
    field.classList.add('error');
}

// Hata temizleme
function clearError(fieldId) {
    const field = document.getElementById(fieldId);
    const errorDiv = field.parentElement.querySelector('.error-message');
    
    if (errorDiv) {
        errorDiv.remove();
    }
    
    field.classList.remove('error');
}

// Form gönderimi
function submitForm(data) {
    // Yükleniyor durumunu göster
    const submitButton = document.querySelector('.contact-form button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.textContent = 'Gönderiliyor...';
    
    // API çağrısı simülasyonu
    setTimeout(() => {
        // Başarılı gönderim
        showNotification('Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız.', 'success');
        
        // Formu sıfırla
        document.getElementById('contactForm').reset();
        
        // Butonu eski haline getir
        submitButton.disabled = false;
        submitButton.textContent = originalText;
    }, 1500);
}

// Bildirim gösterme
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animasyon için setTimeout
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Bildirimi kaldır
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Alan hata mesajı gösterme
function showFieldError(input, message = 'Bu alan zorunludur') {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    
    const existingError = input.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
    
    input.parentNode.appendChild(errorDiv);
}

// Alan hata mesajını kaldırma
function removeFieldError(input) {
    const errorDiv = input.parentNode.querySelector('.field-error');
    if (errorDiv) {
        errorDiv.remove();
    }
}

// Başarı mesajı gösterme
function showSuccessMessage() {
    const message = document.createElement('div');
    message.className = 'success-message';
    message.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <p>Mesajınız başarıyla gönderildi!</p>
    `;
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.remove();
    }, 3000);
}

// Hata mesajı gösterme
function showErrorMessage() {
    const message = document.createElement('div');
    message.className = 'error-message';
    message.innerHTML = `
        <i class="fas fa-exclamation-circle"></i>
        <p>Bir hata oluştu. Lütfen tekrar deneyin.</p>
    `;
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.remove();
    }, 3000);
} 