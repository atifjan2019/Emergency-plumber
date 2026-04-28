import { PHONE_DISPLAY, PHONE_TEL } from '@/lib/constants';

type Props = {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'primary' | 'ghost' | 'white';
  label?: string;
  className?: string;
  ariaLabel?: string;
};

const sizeMap: Record<NonNullable<Props['size']>, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3.5 text-base',
  lg: 'px-7 py-4 text-lg',
  xl: 'px-8 py-5 text-xl md:text-2xl',
};

const variantMap: Record<NonNullable<Props['variant']>, string> = {
  primary: 'bg-primary text-white shadow-lg hover:bg-primary-dark',
  ghost: 'bg-white border border-gray-line text-ink hover:border-ink',
  white: 'bg-white text-primary hover:bg-off-white',
};

export default function CallButton({
  size = 'lg',
  variant = 'primary',
  label,
  className = '',
  ariaLabel,
}: Props) {
  return (
    <a
      href={`tel:${PHONE_TEL}`}
      aria-label={ariaLabel || `Call ${PHONE_DISPLAY} - 24/7 emergency plumber`}
      className={`inline-flex items-center justify-center gap-3 rounded-lg font-semibold transition active:scale-[0.98] ${sizeMap[size]} ${variantMap[variant]} ${className}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-5 w-5 shrink-0"
        aria-hidden
      >
        <path d="M2.5 4.75A2.25 2.25 0 014.75 2.5h2.27a2.25 2.25 0 012.226 1.929l.43 3.014a2.25 2.25 0 01-.65 1.97l-1.2 1.2a14.25 14.25 0 006.06 6.06l1.2-1.2a2.25 2.25 0 011.97-.65l3.014.43a2.25 2.25 0 011.929 2.227V19.25A2.25 2.25 0 0119.5 21.5h-1.25C9.7 21.5 2.5 14.3 2.5 5.75V4.75z" />
      </svg>
      <span>{label || `Call ${PHONE_DISPLAY}`}</span>
    </a>
  );
}
