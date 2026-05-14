import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function copyToClipboard(text: string) {
  return navigator.clipboard.writeText(text);
}

export function useUTM() {
  const getUTMParams = () => {
    const searchParams = new URLSearchParams(window.location.search);
    const utms: Record<string, string> = {};
    const keys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
    
    keys.forEach(key => {
      const val = searchParams.get(key);
      if (val) utms[key] = val;
    });
    
    return utms;
  };

  return getUTMParams();
}
