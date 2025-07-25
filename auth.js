// Kullanıcı verilerini saklamak için localStorage kullanımı
const USERS_KEY = 'gibiads_users';
const CURRENT_USER_KEY = 'gibiads_current_user';

// Sayfa yüklendiğinde
document.addEventListener('DOMContentLoaded', () => {
    // Login formu varsa
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    // Register formu varsa
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }

    // Kullanıcı giriş yapmışsa yönlendirme
    const currentUser = getCurrentUser();
    if (currentUser && window.location.pathname.includes('login.html')) {
        window.location.href = 'index.html';
    }
});

// Login işlemi
function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const remember = document.getElementById('remember').checked;

    // Kullanıcıları al
    const users = getUsers();
    
    // Kullanıcıyı bul
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        // Giriş başarılı
        if (remember) {
            setCurrentUser(user);
        } else {
            sessionStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
        }
        
        showNotification('Giriş başarılı! Yönlendiriliyorsunuz...', 'success');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    } else {
        showNotification('E-posta veya şifre hatalı!', 'error');
    }
}

// Register işlemi
function handleRegister(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('passwordConfirm').value;
    const terms = document.getElementById('terms').checked;

    // Validasyonlar
    if (password !== passwordConfirm) {
        showNotification('Şifreler eşleşmiyor!', 'error');
        return;
    }

    if (!terms) {
        showNotification('Kullanım koşullarını kabul etmelisiniz!', 'error');
        return;
    }

    // Kullanıcıları al
    const users = getUsers();
    
    // E-posta kontrolü
    if (users.some(u => u.email === email)) {
        showNotification('Bu e-posta adresi zaten kayıtlı!', 'error');
        return;
    }

    // Yeni kullanıcı oluştur
    const newUser = {
        id: Date.now(),
        name,
        email,
        password,
        createdAt: new Date().toISOString()
    };

    // Kullanıcıyı kaydet
    users.push(newUser);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));

    // Otomatik giriş yap
    setCurrentUser(newUser);
    
    showNotification('Kayıt başarılı! Yönlendiriliyorsunuz...', 'success');
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1500);
}

// Yardımcı fonksiyonlar
function getUsers() {
    const users = localStorage.getItem(USERS_KEY);
    return users ? JSON.parse(users) : [];
}

function getCurrentUser() {
    const user = localStorage.getItem(CURRENT_USER_KEY) || sessionStorage.getItem(CURRENT_USER_KEY);
    return user ? JSON.parse(user) : null;
}

function setCurrentUser(user) {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Çıkış yapma fonksiyonu
function logout() {
    localStorage.removeItem(CURRENT_USER_KEY);
    sessionStorage.removeItem(CURRENT_USER_KEY);
    window.location.href = 'login.html';
} 