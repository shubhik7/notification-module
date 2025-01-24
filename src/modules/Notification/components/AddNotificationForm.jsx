import { useState } from "react";
import "./AddNotificationForm.css";

export default AddNotificationForm = ({ onAddNotification }) => {
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAddNotification(title);
    setTitle("");
  };

  return (
    <div className="add-notification-form">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter notification title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type="submit">Add Notification</button>
      </form>
    </div>
  );
};
