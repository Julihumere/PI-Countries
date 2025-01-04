export const COUNTRIES = "COUNTRIES";
export const COUNTRIES_BY_NAME = "COUNTRIES_BY_NAME";
export const COUNTRIES_DETAIL = "COUNTRIES_DETAIL";
export const CREATE_ACTIVITY = "CREATE_ACTIVITY";
export const FILTER_BY_CONTINENTS = "FILTER_BY_CONTINENTS";
export const FILTER_BY_POPULATION = "FILTER_BY_POPULATION";
export const FILTER_BY_LETTER = "FILTER_BY_LETTER";
export const FILTER_BY_ACTIVITY = "FILTER_BY_ACTIVITY";
export const GET_ERROR = "GET_ERROR";

const URL = "https://restcountries.com/v3.1";
const URL_ALL = "https://restcountries.com/v3.1/all";
const URL_QUERY = `${URL}/name/`;
const URL_PARAMS = `${URL}/alpha/`;
const URL_POST = `${URL}/activity`;

export const getCountries = () => (dispatch) => {
  try {
    return fetch(URL_ALL)
      .then((response) => response.json())
      .then((data) => {
        const info = data?.map((e) => {
          return {
            id: e.cca3,
            name: e.name.common,
            img: e.flags.png,
            continent: e.continents[0],
            capital: e.capital ? e.capital[0] : "Capital Not Found",
            subregion: e.subregion ? e.subregion : "Sub Region Not Found",
            area: e.area,
            population: e.population,
          };
        });

        console.log(info);

        dispatch({
          type: COUNTRIES,
          payload: info,
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
          const info = data?.map((e) => {
            return {
              id: e.cca3,
              name: e.name.common,
              img: e.flags.png,
              continent: e.continents[0],
              capital: e.capital ? e.capital[0] : "Capital Not Found",
              subregion: e.subregion ? e.subregion : "Sub Region Not Found",
              area: e.area,
              population: e.population,
            };
          });

          dispatch({
            type: COUNTRIES_BY_NAME,
            payload: info,
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
        const detail = {
          id: data[0].cca3,
          name: data[0].name.common,
          img: data[0].flags.png,
          continent: data[0].continents[0],
          capital: data[0].capital ? data[0].capital[0] : "Capital Not Found",
          subregion: data[0].subregion
            ? data[0].subregion
            : "Sub Region Not Found",
          area: data[0].area,
          population: data[0].population,
          activities: data[0].activities,
        };

        dispatch({
          type: COUNTRIES_DETAIL,
          payload: detail,
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
