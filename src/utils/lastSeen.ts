
import { format } from "timeago.js";

export const lastSeen = (date: Date) => {
  if (date) {
    let earlier = new Date(date).valueOf() + 300000;
    if (earlier > new Date().valueOf()) {
      return "online";
    } else {
      return format(date);
    }
  }
};
