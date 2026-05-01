export const brl = (n: number) =>
  n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

/**
 * Build a WhatsApp URL that works reliably on mobile and desktop.
 * Uses api.whatsapp.com on desktop and wa.me on mobile to maximize the
 * chance of opening the right surface (web vs app) without being blocked.
 */
export function buildWhatsAppUrl(phone: string, text: string) {
  const encoded = encodeURIComponent(text);
  const isMobile =
    typeof navigator !== "undefined" &&
    /android|iphone|ipad|ipod|mobile/i.test(navigator.userAgent);
  return isMobile
    ? `https://wa.me/${phone}?text=${encoded}`
    : `https://api.whatsapp.com/send?phone=${phone}&text=${encoded}`;
}
