// Form adımlarını yönetme
const formSteps = document.querySelectorAll('.form-step');
const nextButtons = document.querySelectorAll('.next-step');
const prevButtons = document.querySelectorAll('.prev-step');
const form = document.getElementById('createAdForm');

// Adım geçişleri
nextButtons.forEach(button => {
    button.addEventListener('click', () => {
        const currentStep = button.closest('.form-step');
        const nextStep = currentStep.nextElementSibling;
        
        if (validateStep(currentStep)) {
            currentStep.classList.remove('active');
            nextStep.classList.add('active');
        }
    });
});

prevButtons.forEach(button => {
    button.addEventListener('click', () => {
        const currentStep = button.closest('.form-step');
        const prevStep = currentStep.previousElementSibling;
        
        currentStep.classList.remove('active');
        prevStep.classList.add('active');
    });
});

// Adım validasyonu
function validateStep(step) {
    const inputs = step.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }
    });

    return isValid;
}

// Takipçi aralığı slider'ı
const followerRange = document.getElementById('followerRange');
const minFollowers = document.getElementById('minFollowers');
const maxFollowers = document.getElementById('maxFollowers');

followerRange.addEventListener('input', (e) => {
    const value = e.target.value;
    minFollowers.textContent = formatNumber(value);
    maxFollowers.textContent = formatNumber(value * 10);
});

function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num;
}

// Form gönderimi
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!validateStep(formSteps[formSteps.length - 1])) {
        return;
    }

    const formData = new FormData(form);
    const adData = {
        title: formData.get('adTitle'),
        description: formData.get('adDescription'),
        category: formData.get('adCategory'),
        platforms: Array.from(formData.getAll('platform')),
        budget: formData.get('budget'),
        paymentModel: formData.get('paymentModel'),
        campaignDuration: formData.get('campaignDuration'),
        locations: Array.from(formData.getAll('locations')),
        followerRange: {
            min: parseInt(followerRange.value),
            max: parseInt(followerRange.value) * 10
        }
    };

    try {
        // API'ye gönderme simülasyonu
        console.log('Reklam verisi:', adData);
        
        // Başarılı gönderim sonrası
        showSuccessMessage();
        
        // Formu sıfırlama
        form.reset();
        
        // İlk adıma dönme
        formSteps.forEach(step => step.classList.remove('active'));
        formSteps[0].classList.add('active');
        
    } catch (error) {
        console.error('Reklam oluşturulurken hata:', error);
        showErrorMessage();
    }
});

// Başarı mesajı gösterme
function showSuccessMessage() {
    const message = document.createElement('div');
    message.className = 'success-message';
    message.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <p>Reklamınız başarıyla oluşturuldu!</p>
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

// Görsel önizleme
const imageInput = document.getElementById('adImage');
imageInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const preview = document.createElement('div');
            preview.className = 'image-preview';
            preview.innerHTML = `
                <img src="${e.target.result}" alt="Önizleme">
                <button type="button" class="remove-image">
                    <i class="fas fa-times"></i>
                </button>
            `;
            
            const existingPreview = document.querySelector('.image-preview');
            if (existingPreview) {
                existingPreview.remove();
            }
            
            imageInput.parentNode.appendChild(preview);
            
            // Görsel kaldırma
            preview.querySelector('.remove-image').addEventListener('click', () => {
                preview.remove();
                imageInput.value = '';
            });
        };
        reader.readAsDataURL(file);
    }
}); 