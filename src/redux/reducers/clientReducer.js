import { SET_CLIENTLIST , SET_CLIENT_BY_USERLIST , SET_FATTURELIST } from "../actions/actions";

const initialState = {
  clientList: [],
  clientByUserList: [],
  fattureList: [],
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
    case SET_FATTURELIST:
      return {
        ...state,
        fattureList: action.payload,
      }
    default:
      return state;
  }
};

export default clientReducer;
