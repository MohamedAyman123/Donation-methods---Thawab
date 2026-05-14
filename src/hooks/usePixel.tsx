import { useEffect } from 'react';
import { useUTM } from '../lib/utils';

declare global {
  interface Window {
    fbq: any;
  }
}

export const usePixel = () => {
  const utms = useUTM();

  const trackCustom = (eventName: string, params: Record<string, any> = {}) => {
    if (typeof window.fbq === 'function') {
      window.fbq('trackCustom', eventName, {
        ...params,
        ...utms,
        content_category: 'donation',
      });
    }
  };

  const trackStandard = (eventName: string, params: Record<string, any> = {}) => {
    if (typeof window.fbq === 'function') {
      window.fbq('track', eventName, {
        ...params,
        ...utms,
        content_category: 'donation',
      });
    }
  };

  return { trackCustom, trackStandard };
};

export const PixelProvider = ({ children, pixelId }: { children: React.ReactNode; pixelId: string }) => {
  useEffect(() => {
    if (!pixelId) return;

    // Standard FB Pixel script
    (function (f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
      if (f.fbq) return;
      n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = !0;
      n.version = '2.0';
      n.queue = [];
      t = b.createElement(e);
      t.async = !0;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

    window.fbq('init', pixelId);
    window.fbq('track', 'PageView');
  }, [pixelId]);

  return <>{children}</>;
};
