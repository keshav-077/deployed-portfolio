import { useState } from 'react';

type OrgLogoProps = {
  src?: string;
  label: string;
  variant?: 'square' | 'wide';
  className?: string;
};

const monogramFromLabel = (label: string): string => {
  const paren = label.match(/\(([^)]+)\)/);
  if (paren) {
    const acronym = paren[1].trim().split(/\s+/)[0];
    if (acronym) return acronym.slice(0, 4).toUpperCase();
  }
  const stop = new Set(['of', 'and', 'the', 'for', 'in', 'at', 'solutions']);
  const initials = label
    .replace(/\(.*?\)/g, '')
    .split(/[\s,]+/)
    .filter((w) => w && !stop.has(w.toLowerCase()))
    .map((w) => w[0])
    .join('');
  return initials.slice(0, 4).toUpperCase();
};

const OrgLogo = ({ src, label, variant = 'square', className = '' }: OrgLogoProps) => {
  const [failed, setFailed] = useState(false);
  const frameClass =
    variant === 'wide'
      ? 'h-14 w-[8.5rem]'
      : 'h-16 w-16';

  if (!src || failed) {
    return (
      <div
        className={`${frameClass} flex shrink-0 items-center justify-center rounded-sm border-2 border-accent-1/40 bg-white p-2 ${className}`}
        aria-hidden
      >
        <span className="font-display text-center text-sm font-bold italic leading-tight text-accent-1">
          {monogramFromLabel(label)}
        </span>
      </div>
    );
  }

  return (
    <div
      className={`${frameClass} flex shrink-0 items-center justify-center rounded-sm border border-[#1C2B36]/10 bg-white p-2 ${className}`}
    >
      <img
        src={src}
        alt={`${label} logo`}
        className="max-h-full max-w-full object-contain object-center"
        loading="lazy"
        onError={() => setFailed(true)}
      />
    </div>
  );
};

export default OrgLogo;
