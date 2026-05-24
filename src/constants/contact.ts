export const KARYO_EMAIL = "agency.karyo@gmail.com";
export const KARYO_PHONE_DISPLAY = "9535773370";
export const KARYO_PHONE_E164 = "+919535773370";
export const KARYO_WHATSAPP_MESSAGE = "Hello KARYO, I'm interested in your services.";

export function whatsappHref(message = KARYO_WHATSAPP_MESSAGE) {
  return `https://wa.me/919535773370?text=${encodeURIComponent(message)}`;
}

export const phoneHref = `tel:${KARYO_PHONE_E164}`;
export const emailHref = `mailto:${KARYO_EMAIL}`;
