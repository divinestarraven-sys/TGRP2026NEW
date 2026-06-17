/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        emerald: {
          deep: '#0a3d2e',
          sacred: '#0d4f3c',
          glow: '#10b981',
          moss: '#2d6a4f',
          light: '#6ee7b7',
          canopy: '#1a5c3a',
          lichen: '#4a7c59',
        },
        gold: {
          sacred: '#d4a843',
          light: '#f0d78c',
          dark: '#8b6914',
          amber: '#c48a2a',
          harvest: '#b8860b',
          classic: '#D4AF37',
          ethereal: '#D6B25E',
        },
        cosmic: {
          black: '#050a08',
          dark: '#0a1210',
          deep: '#0f1a16',
        },
        moonlight: {
          white: '#f0f4f1',
          soft: '#d1ddd6',
          pale: '#e8efe9',
        },
        cyan: {
          glow: '#22d3ee',
          ethereal: '#67e8f9',
          deep: '#0891b2',
          ether: '#68E3D4',
        },
        midnight: {
          blue: '#1B365D',
        },
        sacred: {
          violet: '#5B3A7A',
        },
        cream: {
          paper: '#F4F0E8',
        },
        forest: {
          primary: '#0F3D2E',
          deep: '#0F2E2B',
          resonance: '#3FAF5A',
          moss: '#2E5E3E',
        },
        soul: {
          star: '#FFF8DC',
        },
        solarpunk: {
          amber: '#e8a317',
          copper: '#b87333',
          terracotta: '#c4713d',
          moss: '#4a7c59',
          lichen: '#8fbc8f',
          biolum: '#39ff8c',
          honey: '#eb9e34',
          soil: '#3d2b1f',
          bark: '#5c3a1e',
          leaf: '#2e8b57',
          canopy: '#1a5c3a',
          sunrise: '#f4a460',
          dust: '#c2b280',
          clay: '#a0522d',
          verdigris: '#43b3ae',
        },
        chakra: {
          root: '#E53935',
          sacral: '#FF9800',
          solar: '#FDD835',
          heart: '#43A047',
          throat: '#1E88E5',
          third: '#5C6BC0',
          crown: '#AB47BC',
          soul: '#FFF8DC',
        },
      },
      fontFamily: {
        display: ['Cinzel', 'serif'],
        body: ['Inter', 'sans-serif'],
        sacred: ['Philosopher', 'serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'breathe': 'breathe 4s ease-in-out infinite',
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'rise': 'rise 2s ease-out',
        'wave': 'wave 8s ease-in-out infinite',
        'grow': 'grow 3s ease-in-out infinite',
        'sway': 'sway 5s ease-in-out infinite',
        'biolum-pulse': 'biolumPulse 4s ease-in-out infinite',
        'leaf-fall': 'leafFall 12s linear infinite',
        'vine-curl': 'vineCurl 8s ease-in-out infinite',
        'dawn-glow': 'dawnGlow 6s ease-in-out infinite',
        'fade-in': 'fadeIn 1s ease-out forwards',
        'slide-up': 'slideUp 0.8s ease-out forwards',
        'portal-glow': 'portalGlow 3s ease-in-out infinite',
        'flame-dance': 'flameDance 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', filter: 'blur(20px)' },
          '50%': { opacity: '0.8', filter: 'blur(30px)' },
        },
        breathe: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.8' },
          '50%': { transform: 'scale(1.05)', opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        rise: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        wave: {
          '0%, 100%': { transform: 'scaleX(1) scaleY(1)' },
          '25%': { transform: 'scaleX(1.02) scaleY(0.98)' },
          '50%': { transform: 'scaleX(0.98) scaleY(1.02)' },
          '75%': { transform: 'scaleX(1.01) scaleY(0.99)' },
        },
        grow: {
          '0%, 100%': { transform: 'scaleY(1) scaleX(1)' },
          '50%': { transform: 'scaleY(1.03) scaleX(0.98)' },
        },
        sway: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(1deg)' },
          '75%': { transform: 'rotate(-1deg)' },
        },
        biolumPulse: {
          '0%, 100%': { opacity: '0.3', filter: 'brightness(1)' },
          '50%': { opacity: '1', filter: 'brightness(1.5)' },
        },
        leafFall: {
          '0%': { transform: 'translateY(-10vh) rotate(0deg)', opacity: '0' },
          '10%': { opacity: '0.6' },
          '90%': { opacity: '0.6' },
          '100%': { transform: 'translateY(110vh) rotate(720deg)', opacity: '0' },
        },
        vineCurl: {
          '0%, 100%': { strokeDashoffset: '100' },
          '50%': { strokeDashoffset: '0' },
        },
        dawnGlow: {
          '0%, 100%': { opacity: '0.15' },
          '50%': { opacity: '0.35' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(40px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        portalGlow: {
          '0%, 100%': { boxShadow: '0 0 15px var(--glow-color, rgba(16,185,129,0.2))' },
          '50%': { boxShadow: '0 0 30px var(--glow-color, rgba(16,185,129,0.4))' },
        },
        flameDance: {
          '0%, 100%': { transform: 'scaleY(1) translateY(0)' },
          '25%': { transform: 'scaleY(1.05) translateY(-2px)' },
          '75%': { transform: 'scaleY(0.95) translateY(1px)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'sacred-gradient': 'linear-gradient(135deg, #0a3d2e 0%, #0d4f3c 25%, #050a08 50%, #0a1210 75%, #0d4f3c 100%)',
        'solarpunk-dawn': 'linear-gradient(180deg, #0a3d2e 0%, #1a5c3a 30%, #3d2b1f 70%, #050a08 100%)',
        'solarpunk-canopy': 'linear-gradient(180deg, #0d4f3c 0%, #1a5c3a 40%, #0a3d2e 100%)',
        'solarpunk-horizon': 'linear-gradient(180deg, #050a08 0%, #0a3d2e 30%, #1a5c3a 50%, #c4713d 80%, #e8a317 100%)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};
