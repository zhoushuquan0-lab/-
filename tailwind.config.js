/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brandGreen: "#103D31",
        brandNavy: "#18243D",
        brandGold: "#C9A24A",
        brandCream: "#F7F3EA",
        brandSoft: "#F9FAF7",
        brandLine: "#E4DED2",
        brandMuted: "#6D746F"
      },
      boxShadow: {
        card: "0 14px 40px rgba(16, 61, 49, 0.08)"
      }
    }
  },
  plugins: []
};
