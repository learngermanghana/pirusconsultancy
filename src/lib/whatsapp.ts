const WHATSAPP_NUMBER = "4917620721491";

type WhatsAppLeadParams = {
  page: string;
  pathway?: "study" | "ausbildung" | "work" | "europe" | "general";
  intent: string;
};

export function createWhatsAppLeadUrl({ page, pathway = "general", intent }: WhatsAppLeadParams) {
  const utmSource = "website";
  const utmMedium = "whatsapp_cta";
  const utmCampaign = `${pathway}_pathway`;

  const message = [
    "Hello Pirus Consultancy,",
    `I need help with: ${intent}`,
    `Source page: ${page}`,
    `UTM: utm_source=${utmSource}, utm_medium=${utmMedium}, utm_campaign=${utmCampaign}`,
  ].join("\n");

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
