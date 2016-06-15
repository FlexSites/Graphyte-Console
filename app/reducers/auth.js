
export default function (state = { token: '', profile: {}, returnTo: '/' }, action) {
  switch (action.type) {
    case 'SIGN_IN':
      let { token, profile } = action.payload;
      return {
        token,
        profile,
      };
    case 'SIGN_OUT':
      return {};
  }
  return state
}
