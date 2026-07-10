/**
 * Minimal loading spinner used as Suspense fallback.
 * Matches the site's dark aesthetic with a subtle pulse animation.
 */
const LoadingSpinner = () => (
  <div
    style={{
      minHeight: '100dvh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <div
      style={{
        width: '32px',
        height: '32px',
        border: '2px solid rgba(255, 255, 255, 0.1)',
        borderTopColor: 'var(--accent)',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
      }}
    />
  </div>
);

export default LoadingSpinner;
