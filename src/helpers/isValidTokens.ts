export const isValidTokenResponse = (res: any): res is { request_token: string; success: true } =>
  res?.success && typeof res.request_token === 'string';

export const isValidSessionResponse = (res: any): res is { session_id: string; success: true } =>
  res?.success && typeof res.session_id === 'string';