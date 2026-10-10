/**
 * Inline SVG icon set — no icon library, no font download, no external
 * requests. Every icon inherits `currentColor` and is decorative by default
 * (aria-hidden) unless a title is supplied.
 */

const base = (props) => ({
  xmlns: 'http://www.w3.org/2000/svg',
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  width: 24,
  height: 24,
  'aria-hidden': props.title ? undefined : true,
  focusable: 'false',
  ...props,
});

/* -- Brand mark ------------------------------------------------------------ */
export function BrandMark({ size = 46, ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      width={size}
      height={size}
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path
        d="M32 2.8 38.3 10.9 48.2 6.7 49.1 17.6 59.3 22 53.6 32 59.3 42 49.1 46.4 48.2 57.3 38.3 53.1 32 61.2 25.7 53.1 15.8 57.3 14.9 46.4 4.7 42 10.4 32 4.7 22 14.9 17.6 15.8 6.7 25.7 10.9Z"
        fill="#D8C48F"
        stroke="#F7F5EF"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M32 8 36 14.1 43.4 11 44 19.2 51.8 22.5 47.5 30 51.8 37.5 44 40.8 43.4 49 36 45.9 32 52 28 45.9 20.6 49 20 40.8 12.2 37.5 16.5 30 12.2 22.5 20 19.2 20.6 11 28 14.1Z"
        fill="#B8CCC2"
        opacity=".65"
      />
      <circle cx="30" cy="30" r="15.2" fill="#385C55" stroke="#294740" strokeWidth="1.5" />
      <circle cx="28.7" cy="28.1" r="7.1" fill="none" stroke="#FFFFFF" strokeWidth="3.2" />
      <path d="m34 33.5 7.2 7.2" fill="none" stroke="#FFFFFF" strokeWidth="4.2" strokeLinecap="round" />
      <path d="m24.9 28.2 2.6 2.6 5-5.1" fill="none" stroke="#BAD0C3" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M48 5.8 50.2 11.3 55.7 13.5 50.2 15.7 48 21.2 45.8 15.7 40.3 13.5 45.8 11.3Z"
        fill="#C78378"
        stroke="#F7F5EF"
        strokeWidth="1"
        strokeLinejoin="round"
      />
      <circle cx="13.2" cy="49.3" r="2.3" fill="#BAD0C3" />
    </svg>
  );
}

/* -- UI icons -------------------------------------------------------------- */
export const SearchIcon = (p) => (
  <svg {...base(p)}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.6-3.6" />
  </svg>
);

export const MenuIcon = (p) => (
  <svg {...base(p)}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);

export const CloseIcon = (p) => (
  <svg {...base(p)}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

export const ArrowRight = (p) => (
  <svg {...base(p)}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const ArrowLeft = (p) => (
  <svg {...base(p)}>
    <path d="M19 12H5M11 18l-6-6 6-6" />
  </svg>
);

export const ChevronRight = (p) => (
  <svg {...base(p)}>
    <path d="m9 6 6 6-6 6" />
  </svg>
);

export const CheckIcon = (p) => (
  <svg {...base(p)}>
    <path d="m5 12.5 4.5 4.5L19 7" />
  </svg>
);

export const PlusIcon = (p) => (
  <svg {...base(p)}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const MinusIcon = (p) => (
  <svg {...base(p)}>
    <path d="M5 12h14" />
  </svg>
);

export const InfoIcon = (p) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 11v5M12 8h.01" />
  </svg>
);

export const AlertIcon = (p) => (
  <svg {...base(p)}>
    <path d="M10.3 3.9 2.6 17.2A2 2 0 0 0 4.3 20h15.4a2 2 0 0 0 1.7-2.8L13.7 3.9a2 2 0 0 0-3.4 0Z" />
    <path d="M12 9v4M12 17h.01" />
  </svg>
);

export const ShieldIcon = (p) => (
  <svg {...base(p)}>
    <path d="M12 3 5 6v5.5c0 4.3 2.9 7.9 7 9.5 4.1-1.6 7-5.2 7-9.5V6l-7-3Z" />
    <path d="m9.2 12 2 2 3.6-3.8" />
  </svg>
);

export const ExternalIcon = (p) => (
  <svg {...base({ strokeWidth: 2.2, ...p })}>
    <path d="M14 4h6v6M20 4l-8.5 8.5" />
    <path d="M18 14.5V19a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 19V7.5A1.5 1.5 0 0 1 5 6h4.6" />
  </svg>
);

export const TagIcon = (p) => (
  <svg {...base(p)}>
    <path d="M3.5 11.4V4.6a1 1 0 0 1 1-1h6.8a1 1 0 0 1 .7.3l8.2 8.2a1 1 0 0 1 0 1.4l-6.8 6.8a1 1 0 0 1-1.4 0L3.8 12.1a1 1 0 0 1-.3-.7Z" />
    <path d="M7.8 7.8h.01" />
  </svg>
);

export const ScaleIcon = (p) => (
  <svg {...base(p)}>
    <path d="M12 4v16M7 20h10" />
    <path d="M4 9h16M4 9l-2.2 5.2a3.4 3.4 0 0 0 4.4 0L4 9ZM20 9l-2.2 5.2a3.4 3.4 0 0 0 4.4 0L20 9Z" />
  </svg>
);

export const BookIcon = (p) => (
  <svg {...base(p)}>
    <path d="M4 4.5A1.5 1.5 0 0 1 5.5 3H19v15H5.5A1.5 1.5 0 0 0 4 19.5v-15Z" />
    <path d="M4 19.5A1.5 1.5 0 0 1 5.5 18H19v3H5.5A1.5 1.5 0 0 1 4 19.5Z" />
  </svg>
);

export const GridIcon = (p) => (
  <svg {...base(p)}>
    <rect x="3.5" y="3.5" width="7" height="7" rx="1.5" />
    <rect x="13.5" y="3.5" width="7" height="7" rx="1.5" />
    <rect x="3.5" y="13.5" width="7" height="7" rx="1.5" />
    <rect x="13.5" y="13.5" width="7" height="7" rx="1.5" />
  </svg>
);

export const SparkleIcon = (p) => (
  <svg {...base(p)}>
    <path d="M12 3.5 13.8 9l5.7 1.8-5.7 1.8L12 18.5 10.2 12.6 4.5 10.8 10.2 9 12 3.5Z" />
    <path d="M18.5 16.5 19.3 19l2.2.8-2.2.8-.8 2.2" transform="translate(0,-3)" />
  </svg>
);

export const ClockIcon = (p) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 1.8" />
  </svg>
);

export const MailIcon = (p) => (
  <svg {...base(p)}>
    <rect x="3" y="5.5" width="18" height="13" rx="2" />
    <path d="m3.8 7 7.4 5.4a1.4 1.4 0 0 0 1.6 0L20.2 7" />
  </svg>
);

export const FilterIcon = (p) => (
  <svg {...base(p)}>
    <path d="M4 6h16M7 12h10M10 18h4" />
  </svg>
);

export const SwapIcon = (p) => (
  <svg {...base(p)}>
    <path d="M7 8h12l-3-3M17 16H5l3 3" />
  </svg>
);

/* -- Category icons -------------------------------------------------------- */
export function KitchenIcon(p) {
  return (
    <svg {...base(p)}>
      <path d="M6 3v7a2.5 2.5 0 0 0 5 0V3M8.5 10v11" />
      <path d="M17 3c-1.6 1.4-2.4 3.2-2.4 5.4 0 1.9.8 3 2.4 3.3V21" />
    </svg>
  );
}

export function GroomingIcon(p) {
  return (
    <svg {...base(p)}>
      <circle cx="7" cy="18" r="2.4" />
      <circle cx="17" cy="18" r="2.4" />
      <path d="M8.8 16.3 18 4M15.2 16.3 6 4" />
    </svg>
  );
}

export function ElectronicsIcon(p) {
  return (
    <svg {...base(p)}>
      <rect x="6" y="3" width="12" height="18" rx="2.4" />
      <path d="M10.5 6h3M12 17.5h.01" />
    </svg>
  );
}

export function FitnessIcon(p) {
  return (
    <svg {...base(p)}>
      <path d="M4 9v6M7 7v10M17 7v10M20 9v6M7 12h10" />
    </svg>
  );
}

export function OfficeIcon(p) {
  return (
    <svg {...base(p)}>
      <path d="M4 20h16M6 20V9.5L12 5l6 4.5V20" />
      <path d="M10 20v-5h4v5" />
    </svg>
  );
}

const CATEGORY_ICONS = {
  kitchen: KitchenIcon,
  grooming: GroomingIcon,
  electronics: ElectronicsIcon,
  fitness: FitnessIcon,
  office: OfficeIcon,
  sparkle: SparkleIcon,
  grid: GridIcon,
};

export function CategoryIcon({ name = 'grid', ...props }) {
  const Icon = CATEGORY_ICONS[name] || GridIcon;
  return <Icon {...props} />;
}

/* -- Social icons ---------------------------------------------------------- */
export function InstagramIcon(p) {
  return (
    <svg {...base(p)}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <path d="M17 7h.01" />
    </svg>
  );
}

export function YouTubeIcon(p) {
  return (
    <svg {...base(p)}>
      <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
      <path d="m10.5 9.5 5 2.5-5 2.5v-5Z" />
    </svg>
  );
}

export function XIcon(p) {
  return (
    <svg {...base({ strokeWidth: 2, ...p })}>
      <path d="M4 4l7.6 9.4L4.4 20M20 4l-7.5 8M20 20l-6.3-6.8M4 4h3.6M16.4 20H20" />
    </svg>
  );
}

export const SOCIAL_ICONS = {
  instagram: InstagramIcon,
  youtube: YouTubeIcon,
  x: XIcon,
};
