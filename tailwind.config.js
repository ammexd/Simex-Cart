/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#0F5132',
        text: '#111827',
        'primary-dark': '#0a3823',
        secondary: '#10B981',
        accent: '#F59E0B',
        bg: '#F3F4F6',
        muted: '#6B7280',
        border: '#E7E9EC'
      },
      fontFamily: { sans: ['Poppins', 'sans-serif'] }
    }
  },
  plugins: []
}