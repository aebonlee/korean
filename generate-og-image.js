import sharp from 'sharp';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

async function generateOGImage() {
  const width = 1200;
  const height = 630;

  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#1A365D;stop-opacity:1" />
          <stop offset="50%" style="stop-color:#0F2B46;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#1E3A5F;stop-opacity:1" />
        </linearGradient>
        <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style="stop-color:#60A5FA;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#93C5FD;stop-opacity:1" />
        </linearGradient>
      </defs>

      <!-- Background -->
      <rect width="${width}" height="${height}" fill="url(#bg)" />

      <!-- Decorative circles -->
      <circle cx="100" cy="100" r="200" fill="rgba(255,255,255,0.03)" />
      <circle cx="1100" cy="530" r="250" fill="rgba(255,255,255,0.03)" />
      <circle cx="600" cy="50" r="150" fill="rgba(255,255,255,0.02)" />

      <!-- Korean characters decoration -->
      <text x="50" y="580" font-family="sans-serif" font-size="120" fill="rgba(255,255,255,0.05)" font-weight="700">가나다라마</text>
      <text x="700" y="120" font-family="sans-serif" font-size="80" fill="rgba(255,255,255,0.04)" font-weight="700">ㄱㄴㄷㄹㅁ</text>

      <!-- Logo circle -->
      <circle cx="600" cy="220" r="60" fill="url(#accent)" />
      <text x="600" y="240" font-family="sans-serif" font-size="48" fill="#1A365D" font-weight="700" text-anchor="middle">K</text>

      <!-- Title -->
      <text x="600" y="340" font-family="sans-serif" font-size="56" fill="white" font-weight="700" text-anchor="middle">Korean Pro</text>

      <!-- Subtitle -->
      <text x="600" y="400" font-family="sans-serif" font-size="28" fill="rgba(255,255,255,0.8)" font-weight="400" text-anchor="middle">한국어 학습의 새로운 시작</text>

      <!-- Tags -->
      <rect x="280" y="440" width="120" height="36" rx="18" fill="rgba(255,255,255,0.15)" />
      <text x="340" y="464" font-family="sans-serif" font-size="16" fill="white" text-anchor="middle">한글 기초</text>

      <rect x="420" y="440" width="100" height="36" rx="18" fill="rgba(255,255,255,0.15)" />
      <text x="470" y="464" font-family="sans-serif" font-size="16" fill="white" text-anchor="middle">회화</text>

      <rect x="540" y="440" width="100" height="36" rx="18" fill="rgba(255,255,255,0.15)" />
      <text x="590" y="464" font-family="sans-serif" font-size="16" fill="white" text-anchor="middle">문법</text>

      <rect x="660" y="440" width="100" height="36" rx="18" fill="rgba(255,255,255,0.15)" />
      <text x="710" y="464" font-family="sans-serif" font-size="16" fill="white" text-anchor="middle">TOPIK</text>

      <rect x="780" y="440" width="120" height="36" rx="18" fill="rgba(255,255,255,0.15)" />
      <text x="840" y="464" font-family="sans-serif" font-size="16" fill="white" text-anchor="middle">AI 학습</text>

      <!-- Bottom bar -->
      <rect x="0" y="590" width="${width}" height="40" fill="rgba(0,0,0,0.2)" />
      <text x="600" y="616" font-family="sans-serif" font-size="16" fill="rgba(255,255,255,0.7)" text-anchor="middle">korean.dreamitbiz.com | DreamIT Biz</text>
    </svg>
  `;

  try {
    await sharp(Buffer.from(svg))
      .png()
      .toFile(resolve(__dirname, 'public', 'og-image.png'));

    console.log('✅ OG image generated: public/og-image.png');
  } catch (error) {
    console.error('❌ Failed to generate OG image:', error.message);
    process.exit(1);
  }
}

generateOGImage();
