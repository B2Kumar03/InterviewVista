import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  theme: {
    extend: {
      colors: {
        primary: "#0F172A", // Dark blue-gray
        accent: "#3B82F6", // Blue
        success: "#10B981", // Green for approval
        warning: "#F59E0B", // Orange for pending
        danger: "#EF4444", // Red for rejection
        background: "#F8FAFC", // Light gray
      },
    },
  },
})
