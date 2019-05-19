import  {
  AUTH_FORM_INPUTS,
  SET_VALIDATION_ERRORS,
  RESET_AUTH_STORE,
  SIGN_UP_SUCCESS,
  AUTH_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  errors: {},
  isLoading: false,
  response: {},
  user: {}
};

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case AUTH_FORM_INPUTS:
      return { ...state, [action.payload.prop]: action.payload.value };
    case SET_VALIDATION_ERRORS:
      return { ...state, errors: action.payload };
    case RESET_AUTH_STORE:
      return INITIAL_STATE;
    case SIGN_UP_SUCCESS:
      return { ...state, response: action.payload };
    case AUTH_SUCCESS:
      return { ...state, user: action.payload }
    default:
    return state;
  }
}

