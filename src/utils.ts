export const formatDate = (date: string) => {
  const createAt = new Date(date);
  const year = createAt.getFullYear();
  const month = String(createAt.getMonth() + 1).padStart(2, '0'); // Month is 0-based
  const day = String(createAt.getDate()).padStart(2, '0');
  const hours = String(createAt.getHours()).padStart(2, '0');
  const minutes = String(createAt.getMinutes()).padStart(2, '0');
  return `${month}/${day}/${year} ${hours}:${minutes}`;
};