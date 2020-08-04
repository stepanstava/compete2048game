import api from "../utils/api";
import axios from "axios";

export function fetchResults(competition) {
  return async dispatch => {
    dispatch({ type: "SET_LOADING" });

    const res = await api.get(`/result/${competition}`);

    dispatch({ type: "ADD_RESULTS", competition, results: res.data });
    dispatch({ type: "REMOVE_LOADING" });
  };
}
