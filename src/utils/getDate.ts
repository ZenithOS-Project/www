export function getDateString(date: Date) {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function getTimeString(date: Date) {
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function getDateTimeString(date: Date) {
  return `${getDateString(date)} at ${getTimeString(date)}`;
}
