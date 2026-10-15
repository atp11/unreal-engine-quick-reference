import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

const repoName = 'unreal-engine-quick-reference'

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  base: mode === 'production' ? `/${repoName}/` : '/',
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
  },
}))
