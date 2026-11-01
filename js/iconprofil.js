// js/auth-nav.js
// Mengganti tombol "Daftar" dan "Masuk" di header menjadi ikon profil setelah login.
// Ini hanya tampilan; pengamanan halaman tetap lewat js/auth-guard.js.

import { supabaseClient } from './supabaseClient.js';

const box = document.getElementById('auth-nav');
const cta = document.getElementById('cta-masuk');
const guestMarkup = box ? box.innerHTML : '';
let renderedFor = null; // id user yang sedang ditampilkan ('guest' jika belum login)

function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) { node.className = className; }
    if (text) { node.textContent = text; }
    return node;
}

function profileMenu(user) {
    const meta = user.user_metadata || {};
    const name = meta.full_name || (user.email || '').split('@')[0] || 'Pengguna';

    const wrap = el('div', 'relative');

    const btn = el('button', 'w-10 h-10 rounded-full bg-white text-brand-dark flex items-center justify-center ring-2 ring-slate-500 hover:ring-blue-300 transition focus:outline-none focus-visible:ring-blue-300');
    btn.type = 'button';
    btn.setAttribute('aria-haspopup', 'menu');
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-label', 'Menu profil');
    btn.innerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
        '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>';

    const menu = el('div', 'absolute right-0 mt-2 w-60 bg-white text-slate-800 rounded-xl shadow-lg ring-1 ring-black/5 overflow-hidden z-50');
    menu.setAttribute('role', 'menu');
    menu.hidden = true;

    const info = el('div', 'px-4 py-3 border-b border-slate-200');
    info.appendChild(el('p', 'text-sm font-semibold truncate', name));
    info.appendChild(el('p', 'text-xs text-slate-500 truncate', user.email || ''));
    menu.appendChild(info);

    const upload = el('a', 'block px-4 py-2.5 text-sm hover:bg-slate-100', 'Unggah CV');
    upload.href = 'uploadcv.html';
    upload.setAttribute('role', 'menuitem');
    menu.appendChild(upload);

    const logout = el('button', 'w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50', 'Keluar');
    logout.type = 'button';
    logout.setAttribute('role', 'menuitem');
    logout.addEventListener('click', async () => {
        logout.disabled = true;
        logout.textContent = 'Keluar...';
        await supabaseClient.auth.signOut();
        window.location.href = 'index.html';
    });
    menu.appendChild(logout);

    function setOpen(open) {
        menu.hidden = !open;
        btn.setAttribute('aria-expanded', String(open));
    }
    btn.addEventListener('click', (e) => { e.stopPropagation(); setOpen(menu.hidden); });
    document.addEventListener('click', (e) => { if (!wrap.contains(e.target)) { setOpen(false); } });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') { setOpen(false); btn.focus(); } });

    wrap.appendChild(btn);
    wrap.appendChild(menu);
    return wrap;
}

function render(session) {
    if (!box) { return; }
    const key = session && session.user ? session.user.id : 'guest';
    if (key !== renderedFor) {
        renderedFor = key;
        box.textContent = '';
        if (key === 'guest') {
            box.innerHTML = guestMarkup;
        } else {
            box.appendChild(profileMenu(session.user));
        }
        if (cta) {
            cta.textContent = key === 'guest' ? 'Masuk' : 'Unggah CV';
            cta.setAttribute('href', key === 'guest' ? 'login.html' : 'uploadcv.html');
        }
    }
    box.classList.remove('invisible');
}

try {
    const { data } = await supabaseClient.auth.getSession();
    render(data.session);
    supabaseClient.auth.onAuthStateChange((_event, session) => render(session));
} catch (err) {
    console.error('auth-nav error:', err);
    render(null);
}