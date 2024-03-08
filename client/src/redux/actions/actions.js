import axios from 'axios';

export function getVideogames() {
  return function (dispatch) {
    return axios.get('http://localhost:3001/games')
      .then(response => {
        dispatch({ type: "GET_VIDEOGAMES", payload: response.data });
      })
      .catch(error => console.error(error));
  };
}

export function searchVideogames(name) {
  return (dispatch) =>
    axios.get(`http://localhost:3001/games?name=${name}`)
      .then((response) => {
        dispatch({
          type: "SEARCH_VIDEOGAMES",
          payload: response.data,
        });
      })
      .catch(error => console.error( error));
}

export function getVideogameById(id) {
  return (dispatch) =>
    axios.get(`http://localhost:3001/games/${id}`)
      .then((response) => {
        dispatch({
          type: "GET_VIDEOGAME_BY_ID",
          payload: response.data,
        });
      })
      .catch(error => console.error( error));
}

export function getGenres() {
  return (dispatch) =>
    axios.get('http://localhost:3001/genres')
      .then((response) => {
        dispatch({
          type: "GET_GENRES",
          payload: response.data,
        });
      })
      .catch(error => console.error( error));
}

export function createVideogame(obj) {
  return (dispatch) =>
    axios.post('http://localhost:3000/game', obj)
      .then((response) => {
        dispatch({
          type: "CREATE_VIDEOGAME",
          payload: response.data,
        });
      })
      .catch(error => console.error(error));
}

export const resetAll = () => {
  return (dispatch) => {
    dispatch({
      type: "RESET",
    });
  };
};

export const filterByGenre = (genres) => (dispatch, getState) => {
  let filteredGames = [];

  if (genres === "All") {
    filteredGames = getState().videogames;
  } else {
    filteredGames = getState().videogames.filter((game) =>
      (game.genres).includes(genres)
    )
  };
  dispatch({
    type: "FILTER_BY_GENRE",
    payload: {
      genres,
      videogameGenre: filteredGames,
    },
  });
};

export const orderAsc = (type) => (dispatch, getState) => {
  const filtered = getState().filteredVideogames;
  let videogamesOrder = []

  if (type === "asc_name") {
    videogamesOrder = filtered.sort((a, b) => {
      if (a.name > b.name) return 1;
      if (a.name < b.name) return -1;
      return 0;
    });
  } else if (type === "asc_rating") {
    videogamesOrder = filtered.sort(
      (a, b) => a.rating - b.rating
    );
  }
  dispatch({
    type: "ORDER_ASC_RATING",
    payload: {
      videogamesOrder,
      name: type,
    },
  });
};

export const orderDesc = (type) => (dispatch, getState) => {
  const filtered = getState().filteredVideogames;
  let videogamesOrder = []

  if (type === "desc_name") {
    videogamesOrder = filtered.sort((a, b) => {
      if (a.name < b.name) return 1;
      if (a.name > b.name) return -1;
      return 0;
    });
  } else if (type === "desc_rating") {
    videogamesOrder = filtered.sort(
      (a, b) => b.rating - a.rating
    );
  }
  dispatch({
    type: "ORDER_DESC_RATING",
    payload: {
      videogamesOrder,
      name: type,
    },
  });
};

export const orderByCreator = (source) => (dispatch, getState) => {
  const videogames = getState().videogames.filter(function (G) {
    return G.source === source
  });
  dispatch({
    type: "ORDER_BY_CREATOR",
    payload: {
      videogames,
      source,
    },
  });
};
