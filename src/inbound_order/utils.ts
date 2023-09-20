export const getDatepickerDateFormat = (dateString: string) => {
  const date = new Date(dateString);

  const month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
  const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  const year = date.getFullYear();
  
  return month + '/' + day + '/' + year;
}