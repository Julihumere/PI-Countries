import {
  COUNTRIES,
  COUNTRIES_BY_NAME,
  COUNTRIES_DETAIL,
  CREATE_ACTIVITY,
  FILTER_BY_ACTIVITY,
  FILTER_BY_CONTINENTS,
  FILTER_BY_LETTER,
  FILTER_BY_POPULATION,
  GET_ERROR,
} from "./Actions";

const initialState = {
  countries: [],
  allCountries: [],
  countryDetail: [],
  error: "",
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case COUNTRIES: {
      return {
        ...state,
        countries: action.payload,
        allCountries: action.payload,
      };
    }
    case COUNTRIES_BY_NAME: {
      return {
        ...state,
        countries: action.payload,
        error: "",
      };
    }
    case COUNTRIES_DETAIL: {
      return {
        ...state,
        countryDetail: action.payload,
      };
    }
    case CREATE_ACTIVITY: {
      return {
        ...state,
      };
    }
    case GET_ERROR: {
      return {
        ...state,
        error: action.payload,
        countries: [],
      };
    }
    case FILTER_BY_LETTER: {
      let letter = [...state.countries];

      let filterLetter =
        action.payload === "asc"
          ? letter.sort((a, b) => {
              if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
              if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
              return 0;
            })
          : letter.sort((a, b) => {
              if (a.name.toLowerCase() < b.name.toLowerCase()) return 1;
              if (a.name.toLowerCase() > b.name.toLowerCase()) return -1;
              return 0;
            });
      return {
        ...state,
        countries: filterLetter,
      };
    }
    case FILTER_BY_POPULATION: {
      let population = [...state.countries];
      let filterPopulation =
        action.payload === "asc"
          ? population.sort((a, b) => {
              if (a.population < b.population) return 1;
              if (a.population > b.population) return -1;
              return 0;
            })
          : population.sort((a, b) => {
              if (a.population > b.population) return 1;
              if (a.population < b.population) return -1;
              return 0;
            });
      return {
        ...state,
        countries: filterPopulation,
      };
    }
    case FILTER_BY_CONTINENTS: {
      let continents = [...state.allCountries];
      let filterContinents =
        action.payload === "All"
          ? state.allCountries
          : continents.filter((e) => e.continent === action.payload);
      return {
        ...state,
        countries: filterContinents,
      };
    }

    case FILTER_BY_ACTIVITY: {
      let array = [];
      for (let i = 0; i < action.payload[0].length; i++) {
        // Recorro DB
        for (let j = 0; j < action.payload[0][i].activities.length; j++) {
          //Recorro activities
          if (action.payload[0][i].activities[j].name === action.payload[1]) {
            // DB.activities.name                       // payload
            array.push(action.payload[0][i].id);
            //DB.id
          }
        }
      }
      let activities = [...state.allCountries];
      let filterActivities = activities.filter((e) => array.includes(e.id));
      return {
        ...state,
        countries:
          action.payload[1] === "All" ? state.allCountries : filterActivities,
        //payload
      };
    }

    default:
      return { ...state };
  }
}