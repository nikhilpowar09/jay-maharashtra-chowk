import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Phone/camera exports often use uppercase extensions (IMG_1234.JPG).
  // Vite's built-in asset matching is case-sensitive, so without this it
  // tries to parse those files as JavaScript and errors out.
  assetsInclude: ['**/*.JPG', '**/*.JPEG', '**/*.PNG', '**/*.WEBP'],
})
