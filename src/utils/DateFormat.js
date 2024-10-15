export const formatDate = (dateString) => {
   const date = new Date(dateString);
   const now = new Date();
   const timeDiff = now - date;
   const oneYearInMillis = 365 * 24 * 60 * 60 * 1000;

   if (timeDiff < oneYearInMillis) {
      const seconds = Math.floor(timeDiff / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);

      if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
      if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
      if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
      return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
   } else {
      const dateString = date.toString();
      const day = dateString.split(' ')[2];
      const month = dateString.split(' ')[1];
      const year = dateString.split(' ')[3];

      return `${day} ${month} ${year}`
      // return date.toLocaleDateString();
   }
};
