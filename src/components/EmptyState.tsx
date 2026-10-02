interface EmptyStateProps {
  message?: string;
  description?: string;
}

export default function EmptyState({
  message = 'No video streams available',
  description = 'Add a stream to start monitoring.',
}: EmptyStateProps) {
  return (
    <div
      style={{
        textAlign: 'center',
        padding: '40px 20px',
        borderRadius: '12px',
        border: '1px solid #333',
        background: '#181818',
      }}
    >
      <div style={{ fontSize: '36px', marginBottom: '12px' }}>📹</div>

      <h3 style={{ margin: '0 0 8px', color: '#fff' }}>
        {message}
      </h3>

      <p style={{ margin: 0, color: '#999' }}>
        {description}
      </p>
    </div>
  );
}
