function setupPasswordToggle(inputId, toggleBtnId, eyeIconId) {
    const passInput = document.getElementById(inputId);
    const toggleBtn = document.getElementById(toggleBtnId);
    const eyeIcon = document.getElementById(eyeIconId);

    if (passInput && toggleBtn && eyeIcon) {
        toggleBtn.addEventListener('click', () => {
            const isPassword = passInput.type === 'password';
            passInput.type = isPassword ? 'text' : 'password';
            eyeIcon.src = isPassword ? 'assets/images/eye-icon.png' : 'assets/images/eye-closed.png';
        });
    }
}

setupPasswordToggle('daftar-password', 'toggle-btn', 'eye-icon');
setupPasswordToggle('login-password', 'toggle-btn', 'eye-icon');
