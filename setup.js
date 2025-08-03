#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🚀 Portfolio Website Setup');
console.log('==========================\n');

// Check if .env file exists
const envPath = path.join(process.cwd(), '.env');
if (!fs.existsSync(envPath)) {
  console.log('❌ .env file not found!');
  console.log('Please create a .env file with your Supabase credentials:');
  console.log('');
  console.log('VITE_SUPABASE_URL=your_supabase_project_url');
  console.log('VITE_SUPABASE_ANON_KEY=your_supabase_anon_key');
  console.log('');
  console.log('Get these values from your Supabase project dashboard → Settings → API');
  process.exit(1);
}

// Read .env file
const envContent = fs.readFileSync(envPath, 'utf8');
const hasSupabaseUrl = envContent.includes('VITE_SUPABASE_URL=');
const hasSupabaseKey = envContent.includes('VITE_SUPABASE_ANON_KEY=');

if (!hasSupabaseUrl || !hasSupabaseKey) {
  console.log('❌ Missing Supabase environment variables!');
  console.log('Please update your .env file with your Supabase credentials.');
  process.exit(1);
}

// Check if values are still placeholders
if (envContent.includes('your_supabase_project_url') || envContent.includes('your_supabase_anon_key')) {
  console.log('⚠️  You still have placeholder values in your .env file.');
  console.log('Please replace them with your actual Supabase credentials.');
  console.log('');
  console.log('Get your credentials from:');
  console.log('https://supabase.com/dashboard/project/[YOUR_PROJECT]/settings/api');
  process.exit(1);
}

console.log('✅ Environment variables configured correctly!');
console.log('');

// Check if supabase-schema.sql exists
const schemaPath = path.join(process.cwd(), 'supabase-schema.sql');
if (!fs.existsSync(schemaPath)) {
  console.log('❌ supabase-schema.sql not found!');
  console.log('Please make sure the file exists in your project root.');
  process.exit(1);
}

console.log('✅ Database schema file found!');
console.log('');

console.log('📋 Next Steps:');
console.log('1. Go to your Supabase dashboard');
console.log('2. Navigate to SQL Editor');
console.log('3. Copy and paste the contents of supabase-schema.sql');
console.log('4. Run the SQL script to create tables and sample data');
console.log('5. Start your development server: npm run dev');
console.log('');

console.log('🎉 Setup complete! Your portfolio website is ready to use.');
console.log('');
console.log('Optional: Add admin panel route to App.jsx for content management');
console.log('Navigate to /admin to manage your portfolio content'); 