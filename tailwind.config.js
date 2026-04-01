/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Luxury Wedding Palette
        // Cosmic -> Bronze/Gold
        cosmic: {
          50: '#fcf9f2',
          100: '#f7f0e0',
          200: '#ede0c1',
          300: '#dec791',
          400: '#c5a059', // Primary Gold
          500: '#b08b47',
          600: '#94723a',
          700: '#7a5e31',
          800: '#644e2a',
          900: '#534124',
        },
        // Nebula -> Soft Rose/Blush
        nebula: {
          50: '#fffafb',
          100: '#fef1f3',
          200: '#fce4e8',
          300: '#f8c0c9',
          400: '#f091a1', // Rose Accent
          500: '#e5647a',
          600: '#d13d58',
          700: '#b12c44',
          800: '#8e263a',
          900: '#752333',
        },
        // Aurora -> Soft Sage/Eucalyptus
        aurora: {
          50: '#fbfcfb',
          100: '#f1f5f2',
          200: '#e1eade',
          300: '#c4d6c0',
          400: '#a3bc9d', // Sage Green
          500: '#7d8e7e',
          600: '#637264',
          700: '#4f5b50',
          800: '#3f4940',
          900: '#343c35',
        },
        // Void -> Warm Stone/Neutral
        void: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        },
        // Beige/Cream
        beige: {
          50: '#faf8f5',
          100: '#f5f1eb',
          200: '#ebe3d7',
          300: '#ddd0bd',
          400: '#c9b8a3',
          500: '#b5a089',
          600: '#9a8570',
          700: '#8b7355',
          800: '#6d5a44',
          900: '#4a3f2f',
        },
      },
      fontFamily: {
        'sans': ['Noto Sans', 'system-ui', 'sans-serif'],
        'serif': ['Goldman', 'sans-serif'],
        'display': ['Dancing Script', 'cursive'],
        'script': ['Dancing Script', 'cursive'],
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-out',
        'fade-in-up': 'fadeInUp 1s ease-out',
        'slide-in-left': 'slideInLeft 1s ease-out',
        'slide-in-right': 'slideInRight 1s ease-out',
        'bounce-slow': 'bounce 3s infinite',
        'pulse-slow': 'pulse 4s infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
        'rotate-slow': 'rotate 30s linear infinite',
        'shimmer': 'shimmer 3s linear infinite',
        'particle': 'particle 10s linear infinite',
        'twinkle': 'twinkle 4s ease-in-out infinite',
        'float-slow': 'floatSlow 10s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(197, 160, 89, 0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(197, 160, 89, 0.6), 0 0 60px rgba(197, 160, 89, 0.2)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translate(0px, 0px) rotate(0deg)' },
          '33%': { transform: 'translate(30px, -50px) rotate(5deg)' },
          '66%': { transform: 'translate(-20px, -20px) rotate(-5deg)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        particle: {
          '0%': { transform: 'translateY(100vh) rotate(0deg)', opacity: '0' },
          '10%': { opacity: '0.8' },
          '90%': { opacity: '0.8' },
          '100%': { transform: 'translateY(-100vh) rotate(360deg)', opacity: '0' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.2', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.1)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'cosmic-gradient': 'linear-gradient(135deg, #ede0c1 0%, #c5a059 100%)', // Gold gradient
        'nebula-gradient': 'linear-gradient(135deg, #fce4e8 0%, #f091a1 100%)', // Rose gradient
        'aurora-gradient': 'linear-gradient(135deg, #e1eade 0%, #a3bc9d 100%)', // Sage gradient
        'luxury-gradient': 'linear-gradient(to right, #c5a059, #ede0c1, #c5a059)',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(197, 160, 89, 0.3)',
        'glow-lg': '0 0 40px rgba(197, 160, 89, 0.5)',
        'glow-xl': '0 0 60px rgba(197, 160, 89, 0.6)',
        'nebula': '0 0 30px rgba(240, 145, 161, 0.4)',
        'aurora': '0 0 30px rgba(163, 188, 157, 0.4)',
        'soft': '0 10px 40px -10px rgba(139, 115, 85, 0.1)',
      },
    },
  },
  plugins: [],
}