// js/supabaseClient.js

// Login, Daftar & Verifikasi Email code OTP
const SUPABASE_URL_1 = 'https://cxmlakmvnajevxvcrszl.supabase.co';
const SUPABASE_ANON_KEY_1 = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN4bWxha212bmFqZXZ4dmNyc3psIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI5MjQzODAsImV4cCI6MjEwODUwMDM4MH0.h4rb1ZrIGaJe5GEPywrL8vclBXKpuJUg7_T46Sm7YFo';

// cvUpload
const SUPABASE_URL_2 = 'https://khpntopvglptyvxezosb.supabase.co';
const SUPABASE_ANON_KEY_2 = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtocG50b3B2Z2xwdHl2eGV6b3NiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI3NTcyMzMsImV4cCI6MjEwODMzMzIzM30.9AZ_5rzW_wUYYkd7vqzo0OgQt-XWtHuVZrNbYxomoR4';

// Checkbox "Ingat Saya" di login
export const REMEMBER_KEY = 'lolosats-remember';

const sessionStorageAdapter = {
    getItem: (key) => sessionStorage.getItem(key) ?? localStorage.getItem(key),
    setItem: (key, value) => {
        const target = localStorage.getItem(REMEMBER_KEY) === '0' ? sessionStorage : localStorage;
        target.setItem(key, value);
    },
    removeItem: (key) => {
        sessionStorage.removeItem(key);
        localStorage.removeItem(key);
    }
};

const { createClient } = supabase;

// Client 1
export const supabaseClient = createClient(SUPABASE_URL_1, SUPABASE_ANON_KEY_1, {
    auth: { 
        storage: sessionStorageAdapter,
        storageKey: 'sb-project1-auth-token'
    }
});

// Client 2 
export const supabaseClient2 = createClient(SUPABASE_URL_2, SUPABASE_ANON_KEY_2, {
    auth: {
        storageKey: 'sb-project2-auth-token'
    }
});

console.log("Kedua Supabase Client berhasil diinisialisasi!");