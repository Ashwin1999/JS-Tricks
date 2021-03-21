import axios from "axios";
import Cookies from "js-cookie";

export const sampleApiFetchAction = () => async (dispatch) => {
  let token = JSON.parse(Cookies.get("user"))["accessToken"];
  const popularData = await axios.get("/api/", {
    headers: {
      token,
    },
  });
  dispatch({
    type: "FETCH_DATA",
    payload: {
      data: popularData.data.data,
    },
  });
};

export const sampleApiRemoveAction = () => {
  return {
    type: "REMOVE_DATA",
  };
};
