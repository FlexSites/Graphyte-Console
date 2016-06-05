
export default function (state = { token: '', profile: {} }, action) {
  console.log(action.type, action.payload);
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      let { token, profile } = action.payload;
      localStorage.profile = JSON.stringify(profile);
      localStorage.userToken = token;
      return {
        token,
        profile,
      };
  }
  return state
}
