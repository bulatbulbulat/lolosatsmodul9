// file koneksi ke supabase

// Masukkan URL dan Anon Key dari Project Settings Supabase kamu
const SUPABASE_URL = 'https://khpntopvglptyvxezosb.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtocG50b3B2Z2xwdHl2eGV6b3NiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI3NTcyMzMsImV4cCI6MjEwODMzMzIzM30.9AZ_5rzW_wUYYkd7vqzo0OgQt-XWtHuVZrNbYxomoR4';

// Inisialisasi klien Supabase
const { createClient } = supabase;
export const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

console.log("Supabase berhasil terhubung!");