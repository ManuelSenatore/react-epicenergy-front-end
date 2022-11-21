import { SET_CLIENTLIST } from "../actions/actions";

const initialState = {
  clientList: [],
};

const clientReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CLIENTLIST:
      return {
        ...state,
          clientList : action.payload
      };
    default:
      return state;
  }
};

export default clientReducer;
