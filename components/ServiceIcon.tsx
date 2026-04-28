type Props = { name: string; className?: string };

export default function ServiceIcon({ name, className = 'h-6 w-6' }: Props) {
  const common = { className, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  switch (name) {
    case 'droplet':
      return (<svg {...common} aria-hidden><path d="M12 2.5C8.5 6.5 6 10 6 13a6 6 0 0012 0c0-3-2.5-6.5-6-10.5z" /></svg>);
    case 'flame':
      return (<svg {...common} aria-hidden><path d="M12 2s4 4 4 8a4 4 0 11-8 0c0-2 1-3.5 2-5 1 2 2 2 2 0V2z" /><path d="M8 14a4 4 0 008 0" /></svg>);
    case 'pipe':
      return (<svg {...common} aria-hidden><path d="M3 7h6v4h6V7h6M3 17h18" /><circle cx="12" cy="12" r="1.5" fill="currentColor" /></svg>);
    case 'search':
      return (<svg {...common} aria-hidden><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.5-4.5" /></svg>);
    case 'shower':
      return (<svg {...common} aria-hidden><path d="M5 18l2-4M9 19l1-5M13 18l1-5M17 19l1-5" /><path d="M4 13h16" /><path d="M12 13V5a3 3 0 116 0" /></svg>);
    case 'toilet':
      return (<svg {...common} aria-hidden><rect x="5" y="3" width="14" height="9" rx="2" /><path d="M7 12l-1 6h12l-1-6" /></svg>);
    case 'radiator':
      return (<svg {...common} aria-hidden><rect x="4" y="6" width="16" height="12" rx="2" /><path d="M8 6v12M12 6v12M16 6v12" /></svg>);
    case 'clock':
      return (<svg {...common} aria-hidden><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>);
    default:
      return (<svg {...common} aria-hidden><circle cx="12" cy="12" r="8" /></svg>);
  }
}
