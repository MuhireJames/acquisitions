export const cookies = {
  getOptions: () => ({
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 15 * 60 * 1000,
  }),

  // new signature: (res, cookieName, value, options)
  // supports controller calls like: cookies.set(res, 'token', token)
  set: (res, cookieName, value, options = {}) => {
    if (typeof res.cookie !== 'function') {
      throw new Error('Response object does not support res.cookie - ensure Express response is passed');
    }
    res.cookie(cookieName, value, { ...cookies.getOptions(), ...options });
  },

  // new signature: (res, cookieName = 'token', options)
  // supports controller calls like: cookies.clear(res) or cookies.clear(res, 'token')
  clear: (res, cookieName = 'token', options = {}) => {
    if (typeof res.clearCookie !== 'function') {
      throw new Error('Response object does not support res.clearCookie - ensure Express response is passed');
    }
    res.clearCookie(cookieName, { ...cookies.getOptions(), ...options });
  },

  // new signature: (req, cookieName = 'token')
  get: (req, cookieName = 'token') => {
    return req?.cookies?.[cookieName] ?? null;
  },
};