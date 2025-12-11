import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Manual simple env parser
const envPath = path.resolve(process.cwd(), '.env');
const envContent = fs.readFileSync(envPath, 'utf-8');
const env = {};
envContent.split('\n').forEach(line => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
        const [key, value] = trimmed.split('=');
        if (key && value) env[key.trim()] = value.trim();
    }
});

const supabase = createClient(env.VITE_SUPABASE_URL, env.VITE_SUPABASE_ANON_KEY);

async function uploadProject() {
    console.log('Reading image...');
    const imagePath = path.resolve(process.cwd(), 'public/projects/buernix-tech-identity.png');

    if (!fs.existsSync(imagePath)) {
        console.error('Image file not found at:', imagePath);
        return;
    }

    const imageBuffer = fs.readFileSync(imagePath);
    const base64Image = `data:image/png;base64,${imageBuffer.toString('base64')}`;

    const project = {
        title: 'Buernix Tech',
        slug: 'buernix-tech',
        category: 'Brand Identity',
        problem: 'Buernix Tech is a startup tech company specialized in Website designs and Data analysis. They needed a brand identity that reflects their innovative approach and technical expertise, standing out in a competitive market.',
        solution: 'We crafted a premium, future-forward brand identity using a striking yellow/orange color palette against a matte dark background. The design language conveys precision, creativity, and modern tech aesthetics across all touchpoints including business cards and digital interfaces.',
        cover_image: base64Image,
        images: [base64Image], // Add to gallery as well
        client_industry: 'Technology',
        seo_keywords: ['Branding', 'Tech Startup', 'Identity Design', 'Web Design', 'Data Analysis'],
        project_url: 'https://buernixtech.com'
    };

    console.log('Uploading project to Supabase...');
    const { data, error } = await supabase.from('projects').insert([project]).select();

    if (error) {
        console.error('Error uploading project:', error);
    } else {
        console.log('Success! Project uploaded:', data[0].title);
    }
}

uploadProject();
