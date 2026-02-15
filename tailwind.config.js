/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#0b2545',
                'primary-light': '#133a66',
                secondary: '#d6e6f2',
                accent: '#2fbf71',
                'accent-dark': '#259d5d',
                alert: '#ef4444',
                background: '#f8fafc',
                text: '#1e293b',
                'text-light': '#64748b',
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0', transform: 'translateY(10px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
            },
            animation: {
                fadeIn: 'fadeIn 0.5s ease-out forwards',
            },
        },
    },
    plugins: [],
}
