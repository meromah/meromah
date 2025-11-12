// RelativeTime.jsx
import React, { useEffect, useState } from "react";

export default function RelativeTime({ date, className = "" }) {
  const [displayTime, setDisplayTime] = useState("");

  useEffect(() => {
    if (!date) return;

    const updateTime = () => {
      const target = new Date(date);
      const now = new Date();
      const diffMs = now - target;

      const diffMins = Math.floor(diffMs / 60000);
      const diffHours = Math.floor(diffMins / 60);
      const diffDays = Math.floor(diffHours / 24);
      let text;

      const timeStr = `${target.getHours().toString().padStart(2, "0")}:${target
        .getMinutes()
        .toString()
        .padStart(2, "0")}`;

      if (diffMins < 1) text = "just now";
      else if (diffMins < 60)
        text = `${diffMins} min${diffMins > 1 ? "s" : ""} ago`;
      else if (diffHours < 24)
        text = `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
      else if (diffDays === 1) text = `Yesterday ${timeStr}`;
      else if (diffDays < 7)
        text = `${target.toLocaleDateString(undefined, {
          weekday: "long",
        })} ${timeStr}`;
      else if (diffDays > 365)
        text = `${timeStr}, ${target
          .getDate()
          .toString()
          .padStart(2, "0")} ${target.toLocaleString(undefined, {
          month: "short",
        })} ${target.getFullYear()}`;
      else
        text = `${timeStr}, ${target
          .getDate()
          .toString()
          .padStart(2, "0")} ${target.toLocaleString(undefined, {
          month: "short",
        })}`;

      setDisplayTime(text);
    };

    updateTime();
    const interval = setInterval(updateTime, 60 * 1000);
    return () => clearInterval(interval);
  }, [date]);

  return <span className={className}>{displayTime}</span>;
}
