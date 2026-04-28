import ServiceIcon from './ServiceIcon';

export default function UtilityIcon({ name }: { name: string }) {
  const c = {
    className: 'h-5 w-5',
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };
  switch (name) {
    case 'pin':
      return (<svg {...c} aria-hidden><path d="M12 22s7-7.5 7-13a7 7 0 10-14 0c0 5.5 7 13 7 13z" /><circle cx="12" cy="9" r="2.5" /></svg>);
    case 'bolt':
      return (<svg {...c} aria-hidden><path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" /></svg>);
    case 'tag':
      return (<svg {...c} aria-hidden><path d="M3 12V4h8l10 10-8 8L3 12z" /><circle cx="8" cy="8" r="1.5" fill="currentColor" /></svg>);
    case 'check':
      return (<svg {...c} aria-hidden><path d="M5 12l5 5L20 7" /></svg>);
    case 'shield':
      return (<svg {...c} aria-hidden><path d="M12 2L4 5v7c0 5 3.5 8.5 8 10 4.5-1.5 8-5 8-10V5l-8-3z" /></svg>);
    case 'badge':
      return (<svg {...c} aria-hidden><circle cx="12" cy="10" r="6" /><path d="M9 14l-2 7 5-3 5 3-2-7" /></svg>);
    case 'star':
      return (<svg {...c} aria-hidden><path d="M12 3l2.9 6.5L22 11l-5.5 4.5L18 22l-6-3.5L6 22l1.5-6.5L2 11l7.1-1.5L12 3z" /></svg>);
    case 'leak':
      return (<svg {...c} aria-hidden><path d="M12 3v6" /><path d="M8 9h8l-2 6a2 2 0 11-4 0L8 9z" /><circle cx="12" cy="20" r="1.5" fill="currentColor" /></svg>);
    case 'tap':
      return (<svg {...c} aria-hidden><path d="M6 6h6v4M12 8h6M18 6v6h-6" /><path d="M9 10v4M9 14h0M9 18h0" /></svg>);
    case 'gauge':
      return (<svg {...c} aria-hidden><path d="M3 14a9 9 0 0118 0" /><path d="M12 14l4-4" /><circle cx="12" cy="14" r="1.5" fill="currentColor" /></svg>);
    case 'bath':
      return (<svg {...c} aria-hidden><path d="M3 12h18v3a3 3 0 01-3 3H6a3 3 0 01-3-3v-3z" /><path d="M7 12V6a2 2 0 014 0" /><path d="M5 21l1-3M19 21l-1-3" /></svg>);
    case 'kitchen':
      return (<svg {...c} aria-hidden><path d="M5 4h6l1 4H4l1-4z" /><path d="M8 8v3" /><path d="M4 11h8v9H4z" /><path d="M16 4v16" /><path d="M14 8h4" /></svg>);
    case 'plug':
      return (<svg {...c} aria-hidden><path d="M9 4v6M15 4v6" /><path d="M6 10h12v3a6 6 0 01-12 0v-3z" /><path d="M12 19v3" /></svg>);
    case 'alert':
      return (<svg {...c} aria-hidden><path d="M12 3l10 18H2L12 3z" /><path d="M12 10v5" /><circle cx="12" cy="18" r="0.8" fill="currentColor" /></svg>);
    case 'droplet':
    case 'shower':
    case 'pipe':
    case 'toilet':
    case 'radiator':
    case 'flame':
    case 'search':
    case 'clock':
      return <ServiceIcon name={name} className="h-5 w-5" />;
    default:
      return (<svg {...c} aria-hidden><circle cx="12" cy="12" r="9" /></svg>);
  }
}
