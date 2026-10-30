(function () {
    'use strict';

    var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    // Class Tailwind untuk error state
    var INVALID_CLASSES = ['!ring-2', '!ring-red-400'];
    var MSG_CLASSES = 'mt-1.5 pl-1 text-xs font-medium text-red-300 text-left';

    function createField(inputs, rowSelector) {
        inputs = Array.isArray(inputs) ? inputs : [inputs];
        var first = inputs[0];
        var row = first.closest(rowSelector);
        var box = document.createElement('div');
        row.parentNode.insertBefore(box, row);
        box.appendChild(row);

        var msg = document.createElement('p');
        msg.id = first.id + '-error';
        msg.className = MSG_CLASSES;
        msg.setAttribute('role', 'alert');
        msg.hidden = true;
        box.appendChild(msg);

        return { inputs: inputs, msg: msg };
    }

    function setError(field, text) {
        field.msg.textContent = '\u26A0 ' + text;
        field.msg.hidden = false;
        field.inputs.forEach(function (el) {
            INVALID_CLASSES.forEach(function (c) { el.classList.add(c); });
            el.setAttribute('aria-invalid', 'true');
            el.setAttribute('aria-describedby', field.msg.id);
        });
    }

    function clearError(field) {
        field.msg.textContent = '';
        field.msg.hidden = true;
        field.inputs.forEach(function (el) {
            INVALID_CLASSES.forEach(function (c) { el.classList.remove(c); });
            el.removeAttribute('aria-invalid');
            el.removeAttribute('aria-describedby');
        });
    }

    // items: [{ field, validate }]; validate() mengembalikan string pesan, atau '' jika valid
    function bindForm(form, items, onValid) {
        var submitted = false;
        form.setAttribute('novalidate', '');

        function run(item) {
            var message = item.validate();
            if (message) { setError(item.field, message); } else { clearError(item.field); }
            return !message;
        }

        items.forEach(function (item) {
            var isCheck = item.field.inputs[0].type === 'checkbox';
            item.field.inputs.forEach(function (el) {
                el.addEventListener(isCheck ? 'change' : 'input', function () {
                    if (item.field.keepError) { item.field.keepError = false; return; }
                    if (submitted) { run(item); } else { clearError(item.field); }
                });
                if (!isCheck) {
                    el.addEventListener('blur', function () {
                        if (submitted || el.value) { run(item); }
                    });
                }
            });
        });

        form.addEventListener('submit', function (e) {
            e.preventDefault();
            submitted = true;
            var firstBad = null;
            items.forEach(function (item) {
                if (!run(item) && !firstBad) { firstBad = item; }
            });
            if (firstBad) {
                var target = firstBad.field.inputs.filter(function (el) { return !el.value; })[0]
                    || firstBad.field.inputs[0];
                target.focus();
                return;
            }
            onValid();
        });
    }

    //Aturan validasi

    function validateEmail(value) {
        value = value.trim();
        if (!value) { return 'Email wajib diisi.'; }
        if (!EMAIL_RE.test(value)) { return 'Format email tidak valid. Contoh: nama@email.com'; }
        return '';
    }

    //Login

    function initLogin() {
        var email = document.getElementById('login-email');
        var pass = document.getElementById('login-password');
        var form = email.closest('form');

        bindForm(form, [
            {
                field: createField(email, '.relative'),
                validate: function () { return validateEmail(email.value); }
            },
            {
                field: createField(pass, '.relative'),
                validate: function () { return pass.value ? '' : 'Password wajib diisi.'; }
            }
        ], function () {
            window.location.href = 'utama.html';
        });
    }

    //Daftar

    function initDaftar() {
        var nama = document.getElementById('daftar-nama');
        var email = document.getElementById('daftar-email');
        var pass = document.getElementById('daftar-password');
        var setuju = document.getElementById('daftar-setuju');
        var form = nama.closest('form');

        bindForm(form, [
            {
                field: createField(nama, '.relative'),
                validate: function () {
                    var v = nama.value.trim();
                    if (!v) { return 'Nama lengkap wajib diisi.'; }
                    if (v.length < 3) { return 'Nama minimal 3 karakter.'; }
                    return '';
                }
            },
            {
                field: createField(email, '.relative'),
                validate: function () { return validateEmail(email.value); }
            },
            {
                field: createField(pass, '.relative'),
                validate: function () {
                    var v = pass.value;
                    if (!v) { return 'Password wajib diisi.'; }
                    if (v.length < 8) { return 'Password minimal 8 karakter.'; }
                    if (!/[A-Za-z]/.test(v) || !/\d/.test(v)) {
                        return 'Password harus mengandung huruf dan angka.';
                    }
                    return '';
                }
            },
            {
                field: createField(setuju, '.flex'),
                validate: function () {
                    return setuju.checked
                        ? ''
                        : 'Anda harus menyetujui ketentuan layanan dan kebijakan privasi.';
                }
            }
        ], function () {
            window.location.href = 'verifikasi-email.html';
        });
    }

    //Verifikasi OTP

    function initOtp() {
        var inputs = [];
        for (var i = 1; i <= 6; i++) { inputs.push(document.getElementById('otp-' + i)); }
        var form = inputs[0].closest('form');
        var fieldset = inputs[0].closest('fieldset');

        // Pesan error diletakkan tepat di bawah deretan kotak OTP
        var field = createField(inputs, 'fieldset');
        field.msg.className += ' max-w-[440px] mx-auto';

        function fill(startIndex, digits) {
            var idx = startIndex;
            digits.split('').forEach(function (d) {
                if (idx < inputs.length) { inputs[idx].value = d; idx++; }
            });
            inputs[Math.min(idx, inputs.length - 1)].focus();
        }

        inputs.forEach(function (el, index) {
            el.addEventListener('input', function () {
                var cleaned = el.value.replace(/\D/g, '');
                if (cleaned !== el.value) {
                    el.value = cleaned.slice(-1);
                    setError(field, 'Kode verifikasi hanya boleh berisi angka.');
                    field.keepError = true; 
                    return;
                }
                if (cleaned && index < inputs.length - 1) { inputs[index + 1].focus(); }
            });

            el.addEventListener('keydown', function (e) {
                if (e.key === 'Backspace' && !el.value && index > 0) {
                    inputs[index - 1].value = '';
                    inputs[index - 1].focus();
                }
            });

            el.addEventListener('paste', function (e) {
                var text = (e.clipboardData || window.clipboardData).getData('text');
                var digits = text.replace(/\D/g, '').slice(0, inputs.length - index);
                e.preventDefault();
                if (!digits) {
                    setError(field, 'Kode verifikasi hanya boleh berisi angka.');
                    return;
                }
                clearError(field);
                fill(index, digits);
            });
        });

        bindForm(form, [
            {
                field: field,
                validate: function () {
                    var filled = inputs.filter(function (el) { return el.value; }).length;
                    if (filled === 0) { return 'Masukkan kode verifikasi 6 digit.'; }
                    if (filled < inputs.length) { return 'Kode belum lengkap. Masukkan semua 6 digit.'; }
                    return '';
                }
            }
        ], function () {
            window.location.href = 'utama.html';
        });
    }

    //Init sesuai halaman

    document.addEventListener('DOMContentLoaded', function () {
        if (document.getElementById('login-email')) { initLogin(); }
        if (document.getElementById('daftar-email')) { initDaftar(); }
        if (document.getElementById('otp-1')) { initOtp(); }
    });
})();