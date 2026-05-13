import logo from "@/assets/logo-mark.webp";

export function Logo({ className = "h-12", priority = false }: { className?: string; priority?: boolean }) {
  return (
    <img
      src={logo}
      alt="Pizza d'Casa — Pizzaria"
      className={className}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={priority ? "high" : "auto"}
      width={768}
      height={512}
    />
  );
}
