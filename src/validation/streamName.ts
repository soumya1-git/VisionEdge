export function validateStreamName(name: string): string | null {
  const trimmedName = name.trim();

  if (!trimmedName) {
    return 'Stream name is required';
  }

  if (trimmedName.length < 3) {
    return 'Stream name must contain at least 3 characters';
  }

  if (trimmedName.length > 50) {
    return 'Stream name cannot exceed 50 characters';
  }

  return null;
}
