import { useEffect, useCallback, useReducer, createContext } from "react";
import { SearchBar, Table } from "./components";
import { initialState, reducer } from "./store";
import { INIT_VALUE } from "./actionTypes";

export const StateContext = createContext();
export const AdminPage = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getAllUsers = useCallback(async () => {
    try {
      let res = await fetch(process.env.REACT_APP_API_ENDPOINT);
      let userData = await res.json();
      dispatch({
        type: INIT_VALUE,
        payload: [...userData],
      });
    } catch (err) {
      console.log(err.message);
    }
  }, []);

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <StateContext.Provider value={state}>
      <div className="m-10">
        <SearchBar dispatch={dispatch} />
        <Table dispatch={dispatch} />
      </div>
    </StateContext.Provider>
  );
};
