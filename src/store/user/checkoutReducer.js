import {
  SET_ADDRESS,
  SET_CITY_NAME,
  SET_COUNTY_NAME,
  SET_DELIVERY_METHOD,
  SET_DELIVERY_PRICE,
  SET_EMAIL_ADDRESS,
  SET_FIRST_NAME,
  SET_LAST_NAME,
  SET_PAYMENT_METHOD,
  SET_PHONE_NUMBER,
  SET_STREET_NAME,
  SET_ZIP
} from './checkoutActions';

export const initialState = {
  address: {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    street: '',
    city: '',
    county: '',
    zipCode: ''
  },
  email: '',
  deliveryMethodId: 3,
  deliveryPrice: 0.0,
  paymentMethod: 'card'
};

function checkoutReducer(state, action) {
  switch (action.type) {
    case SET_ADDRESS:
      return { ...state, address: action.payload };
    case SET_FIRST_NAME:
      return {
        ...state,
        address: { ...state.address, firstName: action.payload }
      };
    case SET_LAST_NAME:
      return {
        ...state,
        address: { ...state.address, lastName: action.payload }
      };
    case SET_STREET_NAME:
      return {
        ...state,
        address: { ...state.address, street: action.payload }
      };
    case SET_CITY_NAME:
      return {
        ...state,
        address: { ...state.address, city: action.payload }
      };
    case SET_COUNTY_NAME:
      return {
        ...state,
        address: { ...state.address, county: action.payload }
      };
    case SET_ZIP:
      return {
        ...state,
        address: { ...state.address, zipCode: action.payload }
      };
    case SET_PHONE_NUMBER:
      return {
        ...state,
        address: { ...state.address, phoneNumber: action.payload }
      };
    case SET_EMAIL_ADDRESS:
      return { ...state, email: action.payload };
    case SET_DELIVERY_METHOD:
      return { ...state, deliveryMethodId: action.payload };
    case SET_PAYMENT_METHOD:
      return { ...state, paymentMethod: action.payload };
    case SET_DELIVERY_PRICE:
      return { ...state, deliveryPrice: action.payload };
    default:
      return state;
  }
}

export { checkoutReducer };
