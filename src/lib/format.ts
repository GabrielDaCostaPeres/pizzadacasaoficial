export const brl = (n: number) =>
  n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

/**
 * Build a WhatsApp URL. Always uses wa.me — it's the official short link
 * supported on both mobile and desktop and is not blocked inside iframes
 * (unlike api.whatsapp.com/send, which often refuses to load).
 */
export function buildWhatsAppUrl(phone: string, text: string) {
  const cleanPhone = phone.replace(/\D/g, "");
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
}
