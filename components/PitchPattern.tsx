export default function PitchPattern({ className }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 bg-pitch-lines bg-pitch opacity-60 ${className ?? ""}`}
      aria-hidden="true"
    />
  );
}
