export const setForm = (form) => {
  return {
    type: 'UPDATE_FORM',
    payload: form
  }
};
export const signIn = () => {
  return {
    type: 'SIGN_IN',
  }
}