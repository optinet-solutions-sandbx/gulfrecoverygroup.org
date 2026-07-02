/**
 * Institutional emblem for the initiative: a protection shield with a check.
 * Deliberately distinct from the commercial brand's gold wordmark, it reads
 * as a public-interest / regulatory mark (navy shield, official-green check).
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
        d="m17.4 24.3 4.5 4.6 8.7-9"
        stroke="#4fd39c"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
