import { GlobalStore } from "@/store";

export const getUserNameEncode = () => {
  const userName =
    JSON.parse(localStorage.getItem("public-store") || "{}").userName || "";
  const encodedText = encodeURIComponent(userName);
  return encodedText;
};
export const getToken = () => {
  return GlobalStore().token;
};
