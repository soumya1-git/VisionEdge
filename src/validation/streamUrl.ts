export function isValidStreamUrl(url: string): boolean {
  if (!url.trim()) return false;

  try {
    const parsed = new URL(url);

    return ['http:', 'https:', 'rtsp:'].includes(parsed.protocol);
  } catch {
    return false;
  }
}
