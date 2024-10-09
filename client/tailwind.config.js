/** @type {import('tailwindcss').Config} */

const { nextui } = require('@nextui-org/react');

module.exports = {
    important: true,
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}',
        './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        fontSize: {
            'xs': '12px',
            's': '14px',
            'm': '16px',
            'l': '20px',
            'xl': '24px',
            '2xl': '36px',
            '3xl': '48px',
            '10xl': '86px',
        },
        extend: {
            colors: {
                'main': '#f0f0f0',
                'main-bg': '#303030',
                'card-bg': '#444',
                'accent': '#0A2C5C',
                'input-bg': '#27272a',
                'input-hover-bg': '#3f3f46',
                'default': '#f0f0f0',
            },
        },
    },
    darkMode: 'class',
    plugins: [
        nextui({
            themes: {
                light: {
                    colors: {
                        primary: {
                            DEFAULT: '#0A2C5C',
                        },
                        danger: {
                            DEFAULT: '#e81b24',
                        },
                    },
                },
            },
        }),
    ],
};
