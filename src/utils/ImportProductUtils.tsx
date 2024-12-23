import axiosInstance from "@/axios/axiosConfig";

export interface Product {
  name: string;
  productCode: string;
}

export interface ImportItem {
  id: number;
  quantity: number;
  price: number;
  transactionDate: string; // ISO date string
  note: string | null;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  productId: number;
  product: Product;
}

export interface Pagination {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalImport: number;
}

export interface ImportsResponse {
  message: string;
  imports: ImportItem[];
  pagination: Pagination;
}
export const getImportbyPage = async (page: number) => {
  let param = "";
  if (page) {
    param += `&page=${page}`;
  }
  let data;
  const res = await axiosInstance
    .get("get-all-imports?limit=5" + param)
    .then((res) => (data = res.data))
    .catch();
  return data;
};
