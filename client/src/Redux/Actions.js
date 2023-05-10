import axios from "axios";
export const COUNTRIES = "COUNTRIES";
export const COUNTRIES_BY_NAME = "COUNTRIES_BY_NAME";
export const COUNTRIES_DETAIL = "COUNTRIES_DETAIL";
export const CREATE_ACTIVITY = "CREATE_ACTIVITY";
export const FILTER_BY_CONTINENTS = "FILTER_BY_CONTINENTS";
export const FILTER_BY_POPULATION = "FILTER_BY_POPULATION";
export const FILTER_BY_LETTER = "FILTER_BY_LETTER";
export const FILTER_BY_ACTIVITY = "FILTER_BY_ACTIVITY";
export const GET_ERROR = "GET_ERROR";
const URL = `${process.env.REACT_APP_URL}`;
const URL_ALL = `${URL}/countries`;
const URL_QUERY = `${URL}/countries?name=`;
const URL_PARAMS = `${URL}/countries/`;
const URL_POST = `${URL}/activity`;

export const getCountries = () => (dispatch) => {
  try {
    return fetch(URL_ALL)
      .then((response) => response.json())
      .then((data) => {
        dispatch({
          type: COUNTRIES,
          payload: data.DB,
        });
      });
  } catch (error) {
    console.log(error);
  }
};

export const getCountriesByName = (name) => (dispatch) => {
  try {
    return fetch(URL_QUERY + name)
      .then((response) => response.json())
      .then((data) => {
        if (!data.msg) {
          dispatch({
            type: COUNTRIES_BY_NAME,
            payload: data.Name,
          });
        } else {
          dispatch({
            type: GET_ERROR,
            payload: data.msg,
          });
        }
      });
  } catch (error) {
    console.log(error);
  }
};

export const getCountriesDetail = (id) => (dispatch) => {
  try {
    return fetch(URL_PARAMS + id)
      .then((response) => response.json())
      .then((data) => {
        dispatch({
          type: COUNTRIES_DETAIL,
          payload: data.ID,
        });
      });
  } catch (error) {
    console.log(error);
  }
};

export const createActivity = (payload) => (dispatch) => {
  try {
    return fetch(URL_POST, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }).then((res) => {
      dispatch({
        type: CREATE_ACTIVITY,
      });
    });
  } catch (error) {
    console.log(error);
  }
};

export const filterByLetter = (payload) => {
  return {
    type: FILTER_BY_LETTER,
    payload,
  };
};

export const filterByContinent = (payload) => {
  return {
    type: FILTER_BY_CONTINENTS,
    payload,
  };
};

export const filterByPopulation = (payload) => {
  return {
    type: FILTER_BY_POPULATION,
    payload,
  };
};

export const filterByActivity = (payload) => (dispatch) => {
  try {
    return fetch(URL)
      .then((response) => response.json())
      .then((data) => {
        dispatch({
          type: FILTER_BY_ACTIVITY,
          payload: [data.DB, payload],
        });
      });
  } catch (error) {
    console.log(error);
  }
};
