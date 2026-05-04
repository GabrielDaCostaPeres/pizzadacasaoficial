import logo from "@/assets/logo-mark.png";

export function Logo({ className = "h-12", priority = false }: { className?: string; priority?: boolean }) {
  return (
    <img
      src={logo}
      alt="Pizza d'Casa — Pizzaria"
      className={className}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      width={1536}
      height={1024}
    />
  );
}
