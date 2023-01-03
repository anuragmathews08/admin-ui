import { useCallback, useState } from "react";
import { FILTER_VALUE } from "../actionTypes";

export const SearchBar = ({ dispatch }) => {
  const [userInput, setUserInput] = useState("");

  const debounce = (func, timeout = 300) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, timeout);
    };
  };

  const handleSearch = (value) => {
    dispatch({
      type: FILTER_VALUE,
      payload: value,
    });
  };

  const optimisedSearch = useCallback(debounce(handleSearch), []);

  return (
    <div className="w-full" data-testid="search-bar">
      <input
        type="text"
        placeholder="Search by name, email or role"
        className="outline-none border border-grey w-full py-1 px-3 rounded-md"
        value={userInput}
        onChange={(e) => {
          setUserInput(e.target.value);
          optimisedSearch(e.target.value);
        }}
        data-testid="input-box"
      />
    </div>
  );
};
