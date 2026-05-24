export const KARYO_EMAIL = "agency.karyo@gmail.com";

export const KARYO_PHONES = [
  { display: "+91 9535773370", tel: "+919535773370" },
  { display: "+91 8840558745", tel: "+918840558745" },
] as const;

export const KARYO_PHONE_DISPLAY = KARYO_PHONES[0].display;
export const KARYO_PHONE_E164 = KARYO_PHONES[0].tel;
export const KARYO_WHATSAPP_MESSAGE = "Hello KARYO, I'm interested in your services.";

export function whatsappHref(message = KARYO_WHATSAPP_MESSAGE) {
  return `https://wa.me/919535773370?text=${encodeURIComponent(message)}`;
}

export const phoneHref = `tel:${KARYO_PHONE_E164}`;
export const emailHref = `mailto:${KARYO_EMAIL}`;
