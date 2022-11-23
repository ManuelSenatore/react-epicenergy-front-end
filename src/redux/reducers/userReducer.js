import { SET_TOKEN, SET_USER, LOG_OUT, SET_USERLIST, } from "../actions/actions";

const initialState = {
  user: {},
  userList: [],
  token: "",
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case SET_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    case SET_USERLIST:
      return {
        ...state,
        userList: action.payload
      };
    case LOG_OUT:
      return{
        user: {}
      }    
    default:
      return state;
  }
};

export default userReducer;
