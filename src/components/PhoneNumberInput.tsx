import PhoneInput, { CountryData } from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

type PhoneNumberInputProps = {
  value: string;
  onChange: (phone: string, countryCode: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
};

export function PhoneNumberInput({ value, onChange, onFocus, onBlur }: PhoneNumberInputProps) {
  return (
    <PhoneInput
      country="in"
      value={value}
      enableSearch
      countryCodeEditable={false}
      placeholder="+91 95357 73370"
      onFocus={onFocus}
      onBlur={onBlur}
      onChange={(phone, country) => {
        const data = country as CountryData;
        onChange(`+${phone}`, `+${data.dialCode}`);
      }}
      inputClass="!w-full !h-auto !bg-black !border !border-white/10 !rounded-xl !py-4 !pl-14 !pr-4 !text-white !text-base !outline-none !transition-all !duration-300 placeholder:!text-white/30"
      buttonClass="!bg-black !border-white/10 !rounded-l-xl hover:!bg-white/[0.06]"
      dropdownClass="!bg-[#0a0a0a] !border !border-white/10 !rounded-xl !shadow-2xl"
      searchClass="!bg-black !border !border-white/10 !text-white !rounded-lg !mx-2 !my-2"
      containerClass="karyo-phone-input"
      isValid={(input) => input.replace(/\D/g, "").length >= 8}
    />
  );
}
