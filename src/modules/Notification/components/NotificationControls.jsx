import "./NotificationControls.css";

const NotificationControls = ({
  filter,
  sortOrder,
  onFilterChange,
  onSortChange,
}) => (
  <div className="notification-controls">
    {/* Filter Buttons */}
    <div className="filter-controls">
      <button
        className={filter === "all" ? "active" : ""}
        onClick={() => onFilterChange("all")}
      >
        All
      </button>
      <button
        className={filter === "read" ? "active" : ""}
        onClick={() => onFilterChange("read")}
      >
        Read
      </button>
      <button
        className={filter === "unread" ? "active" : ""}
        onClick={() => onFilterChange("unread")}
      >
        Unread
      </button>
    </div>

    {/* Sort Dropdown */}
    <div className="sort-controls">
      <select value={sortOrder} onChange={(e) => onSortChange(e.target.value)}>
        <option value="newest">Newest First</option>
        <option value="oldest">Oldest First</option>
      </select>
    </div>
  </div>
);

export default NotificationControls;
