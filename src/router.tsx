import * as Sentry from "@sentry/tanstackstart-react"
import { createRouter as createTanStackRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

export function getRouter() {
  const router = createTanStackRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreload: 'intent',
    defaultPreloadStaleTime: 0,
  })

  if (!router.isServer) {
    const sentryDsn = import.meta.env?.VITE_SENTRY_DSN ?? process.env.VITE_SENTRY_DSN

    if (!sentryDsn) {
      console.warn('VITE_SENTRY_DSN is not defined. Sentry is not running.')
    } else {
      Sentry.init({
        dsn: sentryDsn,

        // Adds request headers and IP for users, for more info visit:
        // https://docs.sentry.io/platforms/javascript/guides/tanstackstart-react/configuration/options/#sendDefaultPii
        sendDefaultPii: true,

        integrations: [
          Sentry.tanstackRouterBrowserTracingIntegration(router),
          Sentry.replayIntegration(),
        ],

        // Set tracesSampleRate to 1.0 to capture 100%
        // of transactions for tracing.
        // We recommend adjusting this value in production.
        // Learn more at https://docs.sentry.io/platforms/javascript/configuration/options/#traces-sample-rate
        tracesSampleRate: 1.0,

        // Capture Replay for 10% of all sessions,
        // plus for 100% of sessions with an error.
        replaysSessionSampleRate: 0.1,
        replaysOnErrorSampleRate: 1.0,

        // Enable logs to be sent to Sentry
        enableLogs: true,
      });
    }
  }

  return router
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>
  }
}
