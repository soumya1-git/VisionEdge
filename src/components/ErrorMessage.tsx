interface ErrorMessageProps {
  message?: string;
  onRetry?: () => void;
}

export default function ErrorMessage({
  message = 'Unable to load stream data.',
  onRetry,
}: ErrorMessageProps) {
  return (
    <div
      style={{
        padding: '20px',
        borderRadius: '12px',
        border: '1px solid #553333',
        background: '#241818',
        textAlign: 'center',
      }}
    >
      <div style={{ fontSize: '28px', marginBottom: '10px' }}>⚠️</div>

      <p style={{ margin: '0 0 12px', color: '#ffb3b3' }}>
        {message}
      </p>

      {onRetry && (
        <button
          onClick={onRetry}
          style={{
            padding: '8px 16px',
            borderRadius: '6px',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Retry
        </button>
      )}
    </div>
  );
}
