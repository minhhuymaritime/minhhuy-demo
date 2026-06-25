/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        // Bảng màu theo logo Minh Huy
        navy: {
          DEFAULT: '#234C8C',
          50: '#eef3fb',
          100: '#d7e2f4',
          200: '#b0c5e7',
          300: '#82a1d6',
          400: '#4f78bf',
          500: '#2f5aa6',
          600: '#234C8C', // Primary (màu thương hiệu)
          700: '#1e4178',
          800: '#1a3663',
          900: '#152a4c',
          950: '#0e1c33',
        },
        gold: {
          DEFAULT: '#FFC55A',
          50: '#fff9ed',
          100: '#fff0cc',
          200: '#ffe199',
          300: '#FFC55A', // Accent
          400: '#fcb13a',
          500: '#f59519',
          600: '#dc7510',
          700: '#b65610',
          800: '#934314',
          900: '#793714',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(255,197,90,0.25), 0 12px 40px -12px rgba(31,71,136,0.45)',
        card: '0 8px 30px -12px rgba(15,34,64,0.25)',
        'card-hover': '0 24px 60px -20px rgba(31,71,136,0.45)',
      },
      backgroundImage: {
        'grid-navy':
          'linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        // Ánh sáng lướt nhẹ định kỳ qua nút social (tinh tế, không xê dịch)
        'dock-sheen': {
          '0%': { transform: 'translateX(-30px)', opacity: '0' },
          '8%': { opacity: '1' },
          '22%, 100%': { transform: 'translateX(60px)', opacity: '0' },
        },
        // Mở khung chat (bật lên từ góc dưới-phải)
        'chat-pop': {
          '0%': { opacity: '0', transform: 'translateY(14px) scale(0.96)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        // Chấm "đang gõ"
        'typing-dot': {
          '0%, 100%': { opacity: '0.45', transform: 'translateY(0)' },
          '50%': { opacity: '1', transform: 'translateY(-4px)' },
        },
        // Đốm sáng nền trôi rất chậm để tạo cảm giác "sống"
        drift: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '50%': { transform: 'translate(24px, -22px) scale(1.08)' },
        },
        'drift-rev': {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '50%': { transform: 'translate(-28px, 18px) scale(1.05)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '0.45' },
          '50%': { opacity: '0.8' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '30%': { transform: 'rotate(-7deg)' },
          '70%': { transform: 'rotate(7deg)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        // Phát sáng vàng để thu hút (cho thanh QR)
        glow: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(255,197,90,0.15)' },
          '50%': { boxShadow: '0 0 22px 3px rgba(255,197,90,0.8)' },
        },
        // Trôi lơ lửng theo quỹ đạo tròn như bong bóng
        // Dập dìu lên xuống + lắc nhẹ như phao nổi trên sóng
        bubble1: {
          '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
          '25%': { transform: 'translate(6px, -15px) rotate(2deg)' },
          '50%': { transform: 'translate(0, 0) rotate(0deg)' },
          '75%': { transform: 'translate(-6px, 15px) rotate(-2deg)' },
        },
        bubble2: {
          '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
          '25%': { transform: 'translate(-5px, 12px) rotate(-1.8deg)' },
          '50%': { transform: 'translate(0, 0) rotate(0deg)' },
          '75%': { transform: 'translate(5px, -14px) rotate(1.8deg)' },
        },
        bubble3: {
          '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
          '25%': { transform: 'translate(7px, -12px) rotate(1.5deg)' },
          '50%': { transform: 'translate(0, 3px) rotate(0deg)' },
          '75%': { transform: 'translate(-7px, 14px) rotate(-1.5deg)' },
        },
        // Ánh kim quét ngang qua mặt kính
        'metal-sweep': {
          '0%': { transform: 'translateX(-160%) rotate(12deg)' },
          '55%, 100%': { transform: 'translateX(380%) rotate(12deg)' },
        },
        // Sóng biển chạy ngang (lặp liền mạch)
        'wave-x': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        // Thanh tiến trình showcase
        progress: {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
        // Icon bật lên khi đổi mục
        pop: {
          '0%': { transform: 'scale(0.6)', opacity: '0' },
          '60%': { transform: 'scale(1.08)', opacity: '1' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        // Icon lật ngang khi chuyển mục (không mờ, chỉ xoay)
        'flip-in': {
          '0%': { transform: 'rotateY(-90deg)' },
          '55%': { transform: 'rotateY(8deg)' },
          '100%': { transform: 'rotateY(0deg)' },
        },
        // Scene "kiểm định": dòng chữ chạy + con dấu đáp xuống
        'line-in': {
          '0%': { transform: 'scaleX(0)', opacity: '0.3' },
          '100%': { transform: 'scaleX(1)', opacity: '1' },
        },
        'stamp-drop': {
          '0%': { transform: 'translateY(-95px) scale(2.1) rotate(-26deg)', opacity: '0' },
          '52%': { transform: 'translateY(0) scale(0.78) rotate(7deg)', opacity: '1' },
          '70%': { transform: 'translateY(-11px) scale(1.08) rotate(-4deg)', opacity: '1' },
          '85%': { transform: 'translateY(0) scale(0.95) rotate(-6deg)', opacity: '1' },
          '100%': { transform: 'translateY(0) scale(1) rotate(-7deg)', opacity: '1' },
        },
        'stamp-ring': {
          '0%': { transform: 'scale(0.5)', opacity: '0' },
          '30%': { opacity: '0.85' },
          '100%': { transform: 'scale(1.55)', opacity: '0' },
        },
        'ink-splat': {
          '0%': { transform: 'scale(0)', opacity: '0' },
          '55%': { transform: 'scale(1.3)', opacity: '0.75' },
          '100%': { transform: 'scale(1)', opacity: '0.5' },
        },
        // Scene CO2: mức dâng / kim đồng hồ quét / lửa bị dập
        'fill-up': {
          '0%': { transform: 'scaleY(0)' },
          '100%': { transform: 'scaleY(1)' },
        },
        'needle-sweep': {
          '0%': { transform: 'rotate(-78deg)' },
          '72%': { transform: 'rotate(60deg)' },
          '86%': { transform: 'rotate(48deg)' },
          '100%': { transform: 'rotate(53deg)' },
        },
        'flame-out': {
          '0%': { transform: 'scale(1) skewX(0deg)', opacity: '1' },
          '20%': { transform: 'scale(1.08) skewX(5deg)', opacity: '1' },
          '40%': { transform: 'scale(0.95) skewX(-5deg)', opacity: '1' },
          '60%': { transform: 'scale(1.06) skewX(4deg)', opacity: '1' },
          '80%': { transform: 'scale(0.45) translateY(4px)', opacity: '0.4' },
          '100%': { transform: 'scale(0) translateY(8px)', opacity: '0' },
        },
        // Lắp ráp: bình trồi lên vào vị trí / ống mềm vẽ nối
        'assemble-up': {
          '0%': { transform: 'translateY(24px) scale(0.96)', opacity: '0' },
          '70%': { transform: 'translateY(-3px) scale(1)', opacity: '1' },
          '100%': { transform: 'translateY(0) scale(1)', opacity: '1' },
        },
        'draw-line': {
          '0%': { strokeDashoffset: '30' },
          '100%': { strokeDashoffset: '0' },
        },
        // Vẽ ống (path chuẩn hóa pathLength=1)
        draw: {
          '0%': { strokeDashoffset: '1' },
          '100%': { strokeDashoffset: '0' },
        },
        sheen: {
          '0%': { transform: 'translateX(-150%) skewX(-12deg)' },
          '100%': { transform: 'translateX(250%) skewX(-12deg)' },
        },
        // Scene vật tư: phao cứu sinh xoay chậm
        'orbit-spin': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s ease-out both',
        'fade-in': 'fade-in 0.9s ease-out both',
        float: 'float 6s ease-in-out infinite',
        drift: 'drift 18s ease-in-out infinite',
        'drift-rev': 'drift-rev 22s ease-in-out infinite',
        'pulse-soft': 'pulse-soft 6s ease-in-out infinite',
        wiggle: 'wiggle 0.5s ease-in-out',
        shimmer: 'shimmer 3s linear infinite',
        glow: 'glow 2.8s ease-in-out infinite',
        'wave-x': 'wave-x 20s linear infinite',
        bubble1: 'bubble1 13s ease-in-out infinite',
        bubble2: 'bubble2 15s ease-in-out infinite',
        bubble3: 'bubble3 14s ease-in-out infinite',
        'metal-sweep': 'metal-sweep 5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
