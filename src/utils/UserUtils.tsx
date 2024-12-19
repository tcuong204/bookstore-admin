import axiosInstance from "@/axios/axiosConfig";

export interface UserManager {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  gender: boolean; // true for male, false for female (có thể điều chỉnh theo nhu cầu)
  profileImage: string;
  userType: "customer" | "admin" | "other"; // tùy chỉnh thêm các giá trị khác nếu cần
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}
export interface Pagination {
  totalItems: number;
  totalPages: number;
  currentPage: number;
}

export interface ResponseListUsers {
  message: string;
  users: UserManager[];
  pagination: Pagination;
}
export const getListUser = async (page: number) => {
  let data;
  let paging = "";
  if (page) {
    paging += `&page=${page}`;
  }
  const getData = await axiosInstance
    .get<ResponseListUsers>("/get-all-users?limit=5" + paging)
    .then((res) => (data = res.data))
    .catch();
  return data;
};
