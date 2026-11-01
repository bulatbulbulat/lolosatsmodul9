import { supabaseClient, REMEMBER_KEY } from './supabaseClient.js';

const auth = supabaseClient.auth;

const PAGE_VERIFY = 'verifikasi-email.html';
const PAGE_AFTER_LOGIN = 'uploadcv.html';
const EMAIL_KEY = 'otpEmail';         
const COOLDOWN_KEY = 'otpCooldownUntil';
const RESEND_SECONDS = 60;

function errorMessage(error) {
    console.error('Supabase auth error:', error);
    const code = error.code || '';
    const text = (error.message || '').toLowerCase();

    if (code === 'unexpected_failure' || text.includes('sending') || text.includes('smtp')) {
        return 'Gagal mengirim email verifikasi. Periksa pengaturan SMTP di dashboard Supabase.';
    }
    if (code === 'signup_disabled') {
        return 'Pendaftaran dinonaktifkan di pengaturan Supabase.';
    }
    if (code === 'email_provider_disabled') {
        return 'Login email belum diaktifkan di pengaturan Supabase.';
    }
    if (code === 'email_address_invalid') {
        return 'Alamat email ditolak. Gunakan email lain.';
    }

    if (code === 'invalid_credentials' || text.includes('invalid login credentials')) {
        return 'Email atau password salah, atau email belum terdaftar.';
    }
    if (code === 'user_already_exists' || text.includes('already registered')) {
        return 'Email ini sudah terdaftar. Silakan login.';
    }
    if (code === 'weak_password') {
        return 'Password terlalu lemah. Gunakan minimal 8 karakter dengan huruf dan angka.';
    }
    if (code === 'over_email_send_rate_limit' || code === 'over_request_rate_limit' || error.status === 429) {
        return 'Terlalu banyak permintaan. Tunggu beberapa saat lalu coba lagi.';
    }
    if (code === 'otp_expired' || text.includes('expired') || text.includes('invalid')) {
        return 'Kode salah atau sudah kedaluwarsa. Kirim ulang kode jika perlu.';
    }
    if (text.includes('fetch') || text.includes('network')) {
        return 'Koneksi bermasalah. Periksa internet Anda.';
    }
    return 'Terjadi kesalahan: ' + (error.message || code || 'tidak diketahui');
}

function isEmailNotConfirmed(error) {
    return error.code === 'email_not_confirmed' || /email not confirmed/i.test(error.message || '');
}

function setBusy(form, busy, busyText) {
    const btn = form.querySelector('button[type="submit"]');
    if (!btn) { return; }
    if (busy) {
        btn.dataset.label = btn.textContent.trim();
        btn.textContent = busyText;
        btn.disabled = true;
        btn.classList.add('opacity-70', 'cursor-not-allowed');
    } else {
        btn.textContent = btn.dataset.label || btn.textContent;
        btn.disabled = false;
        btn.classList.remove('opacity-70', 'cursor-not-allowed');
    }
}

function goToVerify(email) {
    sessionStorage.setItem(EMAIL_KEY, email);
    sessionStorage.setItem(COOLDOWN_KEY, String(Date.now() + RESEND_SECONDS * 1000));
    window.location.href = PAGE_VERIFY;
}

// Login: hanya email yang sudah terdaftar (signInWithPassword tidak membuat akun baru)

async function handleLogin(values, ui) {
    const remember = document.getElementById('login-ingat');
    localStorage.setItem(REMEMBER_KEY, remember && remember.checked ? '1' : '0');

    setBusy(ui.form, true, 'Memproses...');
    const { error } = await auth.signInWithPassword({ email: values.email, password: values.password });

    if (!error) {
        window.location.href = PAGE_AFTER_LOGIN;
        return;
    }

    // Akun terdaftar tapi emailnya belum diverifikasi: kirim kode baru lalu arahkan ke verifikasi
    if (isEmailNotConfirmed(error)) {
        await auth.resend({ type: 'signup', email: values.email });
        goToVerify(values.email);
        return;
    }

    setBusy(ui.form, false);
    ui.setError(ui.fields.password, errorMessage(error));
}

// Daftar

async function handleDaftar(values, ui) {
    localStorage.setItem(REMEMBER_KEY, '1');
    setBusy(ui.form, true, 'Mendaftarkan...');

    const { data, error } = await auth.signUp({
        email: values.email,
        password: values.password,
        options: { data: { full_name: values.nama } }
    });

    if (error) {
        setBusy(ui.form, false);
        const target = error.code === 'user_already_exists' ? ui.fields.email : ui.fields.password;
        ui.setError(target, errorMessage(error));
        return;
    }

    // Email sudah terdaftar & terverifikasi: Supabase tidak mengirim error, tetapi identities kosong
    if (data.user && Array.isArray(data.user.identities) && data.user.identities.length === 0) {
        setBusy(ui.form, false);
        ui.setError(ui.fields.email, 'Email ini sudah terdaftar. Silakan login.');
        return;
    }

    // Jika "Confirm email" dimatikan di dashboard, sesi langsung aktif
    if (data.session) {
        window.location.href = PAGE_AFTER_LOGIN;
        return;
    }

    goToVerify(values.email);
}

// Login/daftar dengan Google

function setupGoogleButton() {
    const btn = document.getElementById('google-btn');
    if (!btn) { return; }

    const msg = document.createElement('p');
    msg.className = 'mt-1.5 pl-1 text-xs font-medium text-red-300 text-left';
    msg.setAttribute('role', 'alert');
    msg.hidden = true;
    btn.parentNode.appendChild(msg);

    btn.addEventListener('click', async () => {
        msg.hidden = true;
        btn.disabled = true;
        localStorage.setItem(REMEMBER_KEY, '1');
        const { error } = await auth.signInWithOAuth({
            provider: 'google',
            options: { redirectTo: new URL(PAGE_AFTER_LOGIN, window.location.href).href }
        });
        if (error) {
            btn.disabled = false;
            msg.textContent = '\u26A0 Login Google gagal. Pastikan provider Google sudah diaktifkan.';
            msg.hidden = false;
        }
    });
}

// Verifikasi OTP

function maskEmail(email) {
    const [name, domain] = email.split('@');
    return name.slice(0, 2) + '*'.repeat(Math.max(name.length - 2, 1)) + '@' + domain;
}

function setupCountdown() {
    const resend = document.getElementById('kirim-ulang');
    const label = document.getElementById('hitung-mundur');
    let timer = null;

    function tick() {
        const until = Number(sessionStorage.getItem(COOLDOWN_KEY) || 0);
        const left = Math.ceil((until - Date.now()) / 1000);
        if (left > 0) {
            resend.disabled = true;
            label.textContent = left + 's';
        } else {
            resend.disabled = false;
            label.textContent = '';
            clearInterval(timer);
            timer = null;
        }
    }

    return function start() {
        if (timer) { clearInterval(timer); }
        tick();
        timer = setInterval(tick, 1000);
    };
}

async function setupVerifyPage() {
    const email = sessionStorage.getItem(EMAIL_KEY);

    if (!email) {
        const { data } = await auth.getSession();
        window.location.href = data.session ? PAGE_AFTER_LOGIN : 'login.html';
        return;
    }

    const hint = document.querySelector('#petunjuk-otp strong');
    if (hint) { hint.textContent = maskEmail(email); }

    const resend = document.getElementById('kirim-ulang');
    const startCountdown = setupCountdown();
    startCountdown();

    resend.addEventListener('click', async () => {
        resend.disabled = true;
        const { error } = await auth.resend({ type: 'signup', email });
        if (error) {
            const el = document.getElementById('otp-1-error');
            if (el) { el.textContent = '\u26A0 ' + errorMessage(error); el.hidden = false; }
            resend.disabled = false;
            return;
        }
        sessionStorage.setItem(COOLDOWN_KEY, String(Date.now() + RESEND_SECONDS * 1000));
        startCountdown();
    });
}

async function handleOtp(values, ui) {
    const email = sessionStorage.getItem(EMAIL_KEY);
    if (!email) { window.location.href = 'login.html'; return; }

    setBusy(ui.form, true, 'Memverifikasi...');
    const { error } = await auth.verifyOtp({ email, token: values.code, type: 'signup' });

    if (error) {
        setBusy(ui.form, false);
        ui.setError(ui.fields.otp, errorMessage(error));
        ui.reset();
        return;
    }

    sessionStorage.removeItem(EMAIL_KEY);
    sessionStorage.removeItem(COOLDOWN_KEY);
    window.location.href = PAGE_AFTER_LOGIN;
}


window.authHandlers = { login: handleLogin, daftar: handleDaftar, otp: handleOtp };

document.addEventListener('DOMContentLoaded', () => {
    setupGoogleButton();
    if (document.getElementById('otp-1')) { setupVerifyPage(); }
});