
const formState = {
  firstName: null,
      lastName: null,
    nickName: null,
    email: null,
    street: null,
    zip: null,
    houseNumber: null,
    city: null,
    password: null,
    repeatPassword: null,
}
const formReducer = (state = formState, action) => {
  switch (action.type) {
    case 'UPDATE_FORM': {
      const data = action.payload;
      console.log(data);
      return {
          ...state,
          ...data
      }
    }
    default:
      return state;
  }
}

export default formReducer;