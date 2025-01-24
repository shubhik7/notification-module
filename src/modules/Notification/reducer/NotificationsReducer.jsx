import React, { useReducer, useEffect } from "react";

// Initial state
export const initialState = {
  notifications: JSON.parse(localStorage.getItem("notifications")) || [],
  filter: "all", // 'all', 'read', 'unread'
  currentPage: 1,
  itemsPerPage: 5,
  sortOrder: "newest",
};

// Reducer function
export function reducer(state, action) {
  switch (action.type) {
    case "LOAD_NOTIFICATIONS":
      return { ...state, notifications: action.payload };

    case "ADD_NOTIFICATION":
      return {
        ...state,
        notifications: [...state.notifications, action.payload],
      };

    case "UPDATE_NOTIFICATION":
      return {
        ...state,
        notifications: state.notifications.map((n) =>
          n.id === action.payload.id ? { ...n, ...action.payload } : n
        ),
      };

    case "DELETE_NOTIFICATION":
      return {
        ...state,
        notifications: state.notifications.filter(
          (n) => n.id !== action.payload
        ),
      };

    case "SET_FILTER":
      return { ...state, filter: action.payload };

    case "SET_PAGE":
      return { ...state, currentPage: action.payload };

    case "SET_FILTER":
      return { ...state, filter: action.payload, currentPage: 1 };

    case "SET_SORT_ORDER":
      return { ...state, sortOrder: action.payload };

    default:
      return state;
  }
}
