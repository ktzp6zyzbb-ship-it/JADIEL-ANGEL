export default function SoccerBallIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <circle cx="32" cy="32" r="29" stroke="currentColor" strokeWidth="2" />
      <path
        d="M32 14L42 21.5L38 33.5H26L22 21.5L32 14Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M32 14V6" stroke="currentColor" strokeWidth="2" />
      <path d="M42 21.5L58 18" stroke="currentColor" strokeWidth="2" />
      <path d="M38 33.5L47 47" stroke="currentColor" strokeWidth="2" />
      <path d="M26 33.5L17 47" stroke="currentColor" strokeWidth="2" />
      <path d="M22 21.5L6 18" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}
