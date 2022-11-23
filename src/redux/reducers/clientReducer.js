import { SET_CLIENTLIST, SET_CLIENT_BY_USERLIST } from "../actions/actions";

const initialState = {
  clientList: [],
  clientByUserList: [],
};

const clientReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CLIENTLIST:
      return {
        ...state,
        clientList: action.payload,
      };
    case SET_CLIENT_BY_USERLIST:
      return {
        ...state,
        clientByUserList: action.payload,
      };
    default:
      return state;
  }
};

export default clientReducer;
