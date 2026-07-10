export function getToken(): string | null {
  const tokenStr = localStorage.getItem('custom-auth-token');
  if (!tokenStr) return null;
  try {
    const tokenData = JSON.parse(tokenStr);
    if (Date.now() > tokenData.expiresAt) return null;
    return tokenData.token;
  } catch {
    return null;
  }
}
