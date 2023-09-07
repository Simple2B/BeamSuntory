export const getDatepickerDateFormat = (dateString: string) => {
  const date = new Date(dateString);
  const dateParts = date.toLocaleDateString().split('/');

  const tmp = dateParts[0];
  dateParts[0] = dateParts[1];
  dateParts[1] = tmp;

  return dateParts.join('/');
}