/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'primary-dark': '#2D3142',
                'primary-green': '#3A5A20',
                'primary-sage': '#5D7030',
                'accent-terracotta': '#9C4221',
                'accent-sand': '#F2CC8F',
                'accent-blush': '#F4F1DE',
                'bg-main': '#FDFBF7',
                'bg-card': '#FFFFFF',
                'bg-subtle': '#F4F1DE',
            },
            fontFamily: {
                sans: ['Lato', 'sans-serif'],
                serif: ['Playfair Display', 'serif'],
            }
        },
    },
    plugins: [],
}
