export const SET_ADDRESS = 'SET_ADDRESS';
export const SET_FIRST_NAME = 'SET_FIRST_NAME';
export const SET_LAST_NAME = 'SET_LAST_NAME';
export const SET_STREET_NAME = 'SET_STREET_NAME';
export const SET_CITY_NAME = 'SET_CITY_NAME';
export const SET_COUNTY_NAME = 'SET_COUNTY_NAME';
export const SET_ZIP = 'SET_ZIP';
export const SET_PHONE_NUMBER = 'SET_PHONE_NUMBER';
export const SET_DELIVERY_METHOD = 'SET_DELIVERY_METHOD';
export const SET_EMAIL_ADDRESS = 'SET_EMAIL_ADDRESS';
export const SET_PAYMENT_METHOD = 'SET_PAYMENT_METHOD';
export const SET_DELIVERY_PRICE = 'SET_DELIVERY_PRICE';

export const setAddress = (address) => ({
  type: SET_ADDRESS,
  payload: address
});

export const setFirstName = (firstName) => ({
  type: SET_FIRST_NAME,
  payload: firstName
});

export const setLastName = (lastName) => ({
  type: SET_LAST_NAME,
  payload: lastName
});

export const setStreetName = (streetName) => ({
  type: SET_STREET_NAME,
  payload: streetName
});

export const setCityName = (cityName) => ({
  type: SET_CITY_NAME,
  payload: cityName
});

export const setCountyName = (countyName) => ({
  type: SET_COUNTY_NAME,
  payload: countyName
});

export const setZipCode = (code) => ({
  type: SET_ZIP,
  payload: code
});

export const setPhoneNumber = (number) => ({
  type: SET_PHONE_NUMBER,
  payload: number
});

export const setEmail = (email) => ({
  type: SET_EMAIL_ADDRESS,
  payload: email
});

export const setDeliveryMethodId = (id) => ({
  type: SET_DELIVERY_METHOD,
  payload: id
});

export const setPaymentMethod = (method) => ({
  type: SET_PAYMENT_METHOD,
  payload: method
});

export const setDeliveryPrice = (price) => ({
  type: SET_DELIVERY_PRICE,
  payload: price
});
