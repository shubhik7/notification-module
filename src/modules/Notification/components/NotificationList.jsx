import { useState } from "react";
import { VscTrash, VscEdit } from "react-icons/vsc";
import "./NotificationList.css";

const NotificationList = ({
  notifications,
  onToggleRead,
  onDelete,
  onUpdate,
}) => {
  const [editingId, setEditingId] = useState(null); // Track which notification is being edited
  const [editTitle, setEditTitle] = useState(""); // Track the new title being edited

  const handleEdit = (id, title) => {
    setEditingId(id);
    setEditTitle(title);
  };

  const handleSave = (id) => {
    onUpdate(id, editTitle);
    setEditingId(null);
    setEditTitle("");
  };

  return (
    <div className="notification-list">
      {notifications.length ? (
        notifications.map((notification) => (
          <div
            key={notification.id}
            className={`notification-item ${
              notification.read ? "read" : "unread"
            }`}
          >
            {editingId === notification.id ? (
              <div className="edit-mode">
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
                <button onClick={() => handleSave(notification.id)}>
                  Save
                </button>
                <button onClick={() => setEditingId(null)}>Cancel</button>
              </div>
            ) : (
              <div>
                <div className="notification-content ">
                  <h3>{notification.title}</h3>
                  <p>{new Date(notification.date).toLocaleString()}</p>
                </div>
                <div className="notification-actions">
                  <button
                    className={
                      notification.read
                        ? "notification-unread"
                        : "notification-read"
                    }
                    onClick={() => onToggleRead(notification.id)}
                  >
                    Mark as {notification.read ? "Unread" : "Read"}
                  </button>
                  <button
                    className="notification-edit"
                    onClick={() =>
                      handleEdit(notification.id, notification.title)
                    }
                  >
                    <VscEdit />
                  </button>
                  <button onClick={() => onDelete(notification.id)}>
                    <VscTrash />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))
      ) : (
        <p>No notifications to display.</p>
      )}
    </div>
  );
};

export default NotificationList;
