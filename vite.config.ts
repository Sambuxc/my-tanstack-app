import { defineConfig } from 'vite'
import { devtools } from '@tanstack/devtools-vite'

import { sentryTanstackStart } from "@sentry/tanstackstart-react/vite";
import { tanstackStart } from '@tanstack/react-start/plugin/vite'

import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import neon from './neon-vite-plugin.ts'
import { cloudflare } from '@cloudflare/vite-plugin'

const config = defineConfig({
  resolve: { tsconfigPaths: true },
  plugins: [
    devtools(),
    neon,
    cloudflare({ viteEnvironment: { name: 'ssr' } }),
    tailwindcss(),
    tanstackStart(),
    sentryTanstackStart({
      org: "lib-tech",
      project: "javascript-tanstackstart-react",
      authToken: process.env.SENTRY_AUTH_TOKEN,
    }),
    viteReact(),
  ],
})

export default config
