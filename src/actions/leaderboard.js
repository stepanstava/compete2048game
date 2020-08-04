import api from "../utils/api";
import axios from "axios";

export function fetchResults(competition) {
  return async dispatch => {
    // dispatch({ type: "RESET_SCORE" });
    console.log("fetchResults -> value", competition);

    dispatch({ type: "SET_LOADING" });

    const res = await api.get(`/result/${competition}`);

    console.log("fetchResults -> res", res);

    dispatch({ type: "ADD_RESULTS", competition, results: res.data });


    dispatch({ type: "REMOVE_LOADING" });

    // axios({
    //   method: 'get',
    //   url: 'http://localhost:5000/api/result',
    //   responseType: 'stream'
    // })
    //   .then(function (response) {
    //   console.log("fetchResults -> response", response)
    //     // response.data.pipe(fs.createWriteStream('ada_lovelace.jpg'))
    //   });
  };
}
