/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                "gradient-from": "#F4ECFB",
                "gradient-to": "#ADC8DB",
                "matcha-blue": "#007AFF",
                "matcha-green": "#00FF00",
                "matcha-yellow": "#FFFF00",
                "matcha-red": "#FF0000",
                "matcha-purple": "#800080",
            },
        },
    },
    plugins: [],
};
