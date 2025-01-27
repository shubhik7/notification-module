import { useReducer, useEffect } from "react";
import { reducer, initialState } from "./reducer/NotificationsReducer";

import NotificationControls from "./components/NotificationControls";
import NotificationList from "./components/NotificationList";
import Pagination from "./components/Pagination";
import AddNotificationForm from "./components/AddNotificationForm";

import "./Notification.css";

const NotificationModule = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Save notifications to localStorage when they change
  useEffect(() => {
    localStorage.setItem("notifications", JSON.stringify(state.notifications));
  }, [state.notifications]);

  const filteredNotifications = state.notifications
    .filter((n) => {
      if (state.filter === "read") return n.read;
      if (state.filter === "unread") return !n.read;
      return true;
    })
    .sort((a, b) => {
      if (state.sortOrder === "newest") {
        return new Date(b.date) - new Date(a.date);
      } else {
        return new Date(a.date) - new Date(b.date);
      }
    });

  const paginatedNotifications = filteredNotifications.slice(
    (state.currentPage - 1) * state.itemsPerPage,
    state.currentPage * state.itemsPerPage
  );

  // Add new notification
  const addNotification = (title) => {
    const newNotification = {
      id: Date.now(),
      title,
      read: false,
      date: new Date().toISOString(),
    };
    dispatch({ type: "ADD_NOTIFICATION", payload: newNotification });
  };

  // Update notification
  const updateNotification = (id, newTitle) => {
    dispatch({
      type: "UPDATE_NOTIFICATION",
      payload: { id, title: newTitle },
    });
  };

  // Delete notification
  const deleteNotification = (id) => {
    dispatch({ type: "DELETE_NOTIFICATION", payload: id });
  };

  //Toggle notification between read and unread
  const toggleRead = (id) => {
    const read = state.notifications.find((n) => n.id === id).read;
    dispatch({
      type: "UPDATE_NOTIFICATION",
      payload: { id, read: !read },
    });
  };

  return (
    <div className="notification-module">
      <h1>Notification Module</h1>
      <NotificationControls
        filter={state.filter}
        sortOrder={state.sortOrder}
        onFilterChange={(filter) => {
          dispatch({ type: "SET_FILTER", payload: filter });
          dispatch({ type: "SET_PAGE", payload: 1 });
        }}
        onSortChange={(order) =>
          dispatch({ type: "SET_SORT_ORDER", payload: order })
        }
      />

      <NotificationList
        notifications={paginatedNotifications}
        onToggleRead={toggleRead}
        onDelete={deleteNotification}
        onUpdate={updateNotification}
      />

      <Pagination
        currentPage={state.currentPage}
        totalItems={filteredNotifications.length}
        itemsPerPage={state.itemsPerPage}
        onPageChange={(page) => dispatch({ type: "SET_PAGE", payload: page })}
        onUpdate={updateNotification}
      />
      <AddNotificationForm onAddNotification={addNotification} />
    </div>
  );
};

export default NotificationModule;
