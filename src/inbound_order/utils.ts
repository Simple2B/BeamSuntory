export const getDatepickerDateFormat = (dateString: string, currentDate: Date | null = null) => {
  const date = new Date(dateString);
  if (currentDate &&  date < currentDate) {
    return currentDate.toISOString().split('T')[0];
  }

  const month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
  const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  const year = date.getFullYear();

  return year + '-' + month + '-' + day;
};
