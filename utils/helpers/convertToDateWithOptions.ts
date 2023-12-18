export const convertToDateWithOptions = (date: string | Date): string => {
  return new Date(date).toLocaleDateString("ru-Ru", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};
