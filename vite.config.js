import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/', // Убедитесь, что этот путь совпадает с названием вашего репозитория
  plugins: [react()],
});
