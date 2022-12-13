import {
  FILTER_VALUE,
  INIT_VALUE,
  SET_CURRENT_PAGE,
  SET_START_PAGE,
} from "./actionTypes";

export const initialState = {
  users: [],
  filteredUserList: [],
  pages: 1,
  currentPage: 1,
  startPage: 1,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case INIT_VALUE:
      let pages = Math.ceil(action.payload.length / 10);
      return {
        ...state,
        users: [...action.payload],
        pages: pages,
        currentPage: 1,
        startPage: 1,
      };
    case SET_START_PAGE:
      return {
        ...state,
        startPage: action.payload,
      };
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };

    case FILTER_VALUE:
      let filteredUserList = state.users.filter((user) => {
        if (
          user.name.includes(action.payload) ||
          user.email.includes(action.payload) ||
          user.role.includes(action.payload)
        ) {
          return user;
        }
        return null;
      });
      let pagesNums = Math.ceil(filteredUserList.length / 10);
      return {
        ...state,
        filteredUserList: [...filteredUserList],
        pages: pagesNums,
      };

    default:
      return state;
  }
};
