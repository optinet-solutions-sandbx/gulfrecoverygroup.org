/**
 * Institutional emblem for the Arab Center for Fund Recovery: a protection
 * shield with a circular return arrow, signalling "getting your money back"
 * rather than plain checkmark approval (navy shield, official-green arrow).
 */
export default function Emblem({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true"
      style={{ flexShrink: 0, display: 'block' }}>
      <path
        d="M24 3.5 6.5 10.2v11.9c0 10.9 7.3 19.6 17.5 22.4 10.2-2.8 17.5-11.5 17.5-22.4V10.2L24 3.5Z"
        fill="#0f2c4d"
      />
      <path
        d="M24 8.2 11 13.1v9c0 8.2 5.4 14.8 13 17 7.6-2.2 13-8.8 13-17v-9L24 8.2Z"
        fill="#14416e"
      />
      <path
        d="M30.4 20.2a7 7 0 1 0-1.6 7.4"
        stroke="#4fd39c"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M30.6 14.4v5.8h-5.8"
        stroke="#4fd39c"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
