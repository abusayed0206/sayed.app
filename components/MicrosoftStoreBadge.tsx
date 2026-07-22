import Image from "next/image";

interface MicrosoftStoreBadgeProps {
  href: string;
  className?: string;
  width?: number;
  height?: number;
}

export default function MicrosoftStoreBadge({
  href,
  className = "",
  width = 160,
  height = 44,
}: MicrosoftStoreBadgeProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-block transition-transform duration-200 hover:scale-105 active:scale-95 ${className}`}
      aria-label="Get it from Microsoft Store"
    >
      {/* Dark badge for light theme background */}
      <img
        src="/imgs/ms-store-dark.svg"
        alt="Get it from Microsoft"
        width={width}
        height={height}
        className="h-11 w-auto dark:hidden"
      />
      {/* Light badge for dark theme background */}
      <img
        src="/imgs/ms-store-light.svg"
        alt="Get it from Microsoft"
        width={width}
        height={height}
        className="h-11 w-auto hidden dark:block"
      />
    </a>
  );
}
