// .vitepress/plugins/google-services.ts
import { type UserConfig, type HeadConfig } from 'vitepress'

interface GoogleOptions {
    gaId: string;
    adSenseId?: string;
    searchConsoleId?: string;
    /** Enable automatic pageview tracking on route change? Defaults to true */
    trackPageViews?: boolean;
}

export const googleServicesPlugin = (options: GoogleOptions): Partial<UserConfig> => {
    const { gaId, adSenseId, searchConsoleId } = options;
    const IS_PROD = process.env.NODE_ENV === 'production';

    const head: HeadConfig[] = [];

    if (searchConsoleId) {
        head.push(['meta', { name: 'google-site-verification', content: searchConsoleId }]);
    }

    if (IS_PROD) {
        // 1. AdSense
        if (adSenseId) {
            head.push(['script', {
                async: '',
                crossorigin: 'anonymous',
                src: `https://pagead2.googlesyndication.com${adSenseId}`
            }]);
        }
        if (gaId) {
            // 2. Initial Consent & Script Loader
            head.push(['script', { async: '', src: `https://www.googletagmanager.com/gtag/js?id=${gaId}` }]);
            head.push(['script', {}, `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      window.gtag = gtag; // Export to window for theme access

      gtag('consent', 'default', {
        'ad_storage': 'denied',
        'ad_user_data': 'denied',
        'ad_personalization': 'denied',
        'analytics_storage': 'denied'
      });

      gtag('js', new Date());
      gtag('config', '${gaId}', { 'send_page_view': false }); // Manual tracking for SPA
    `]);
        }

    }

    return { head };
};
