const sampleApiReducer = (state = { data: [] }, action) => {
  switch (action.type) {
    case "FETCH_DATA":
      return { ...state, data: [...state.data, ...action.payload.data] };
    case "REMOVE_DATA":
      return { data: [] };
    default:
      return state;
  }
};

export default sampleApiReducer;
