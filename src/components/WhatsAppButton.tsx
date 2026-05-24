import { MessageCircle } from "lucide-react";
import { whatsappHref } from "../constants/contact";

type WhatsAppButtonProps = {
  className?: string;
  label?: string;
  onClick?: () => void;
};

export function WhatsAppButton({ className = "", label = "WhatsApp", onClick }: WhatsAppButtonProps) {
  return (
    <a
      href={whatsappHref()}
      target="_blank"
      rel="noreferrer"
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-6 py-3 text-sm font-medium text-white/70 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/[0.08] hover:text-white ${className}`}
    >
      <MessageCircle className="h-4 w-4" />
      {label}
    </a>
  );
}
