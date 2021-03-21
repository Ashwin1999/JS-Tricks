const userReducer = (state = { data: null }, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        data: action.payload.user,
      };
    case "REMOVE_USER":
      return { data: null };
    default:
      return state;
  }
};

export default userReducer;
