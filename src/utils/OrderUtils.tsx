import axiosInstance from "@/axios/axiosConfig";

export interface Order {
  id: number;
  status: string;
  orderDate: string; // ISO date string
  paymentMethod: string;
  paymentStatus: string;
  totalAmount: number; // Có thể là `null`
  shippingFee: string; // Có thể là `null`
  note: string | null;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  addressId: number;
  userId: number;
}

export interface Pagination {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalOrders: number;
}

export interface OrdersResponse {
  message: string;
  orders: Order[];
  pagination: Pagination;
}
export const getListOrder = async (page: number) => {
  let data;
  const res = await axiosInstance
    .get(`/get-all-orders?limit=5&page=` + page)
    .then((res) => (data = res.data));
  return data;
};
