import React from "react";

/**
 * NotificationBell Component
 * @param {number} value - total number of notifications
 * @param {React.ReactNode} icon - icon to display (e.g. <i className="feather icon-bell" />)
 * @param {string} color - color name for badge (e.g. 'danger', 'primary')
 */
export const NotificationBell = ({ value = 0, icon, color = "danger" }) => {
  return (
    <div className="notification-bell">
      <span className="icon-wrapper">
        {icon}
        {value > 0 && (
          <span className={`notification-badge bg-${color}`}>
            {value}
          </span>
        )}
      </span>
    </div>
  );
};
