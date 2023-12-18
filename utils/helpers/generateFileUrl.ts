export const generateFileUrl = (path: string): string => {
  const slash = process.env.NEXT_PUBLIC_NODE_ENV === "dev" ? "/" : "";
  return process.env.NEXT_PUBLIC_BACKEND_API_URL + slash + path;
};
