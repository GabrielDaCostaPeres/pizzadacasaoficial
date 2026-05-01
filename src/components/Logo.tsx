import logo from "@/assets/logo-cropped.png";

export function Logo({ className = "h-12" }: { className?: string }) {
  return (
    <img
      src={logo}
      alt="Pizza d'Casa"
      className={className}
      loading="eager"
      decoding="async"
    />
  );
}
