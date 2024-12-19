import axiosInstance from "@/axios/axiosConfig";

export interface Image {
  url: string;
  isPrimary: boolean;
  orderNumber: number;
  productId: number;
}

export interface Review {}

export interface Product {
  averageRating: number;
  id: number;
  name: string;
  image: string;
  originalPrice: number;
  price: number;
  quantityAvailable: number;
  soldCount: number;
}

// Interface cho phần phân trang
export interface Pagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
}

// Interface cho toàn bộ response
export interface ProductResponse {
  message: string;
  products: Product[];
  pagination: Pagination;
}
export interface DetailProduct {
  id: number;
  name: string;
  author: string;
  supplier: string;
  publisher: string;
  bookLayout: string;
  price: number;
  originalPrice: number;
  productCode: string;
  publishYear: number;
  language: string;
  weight: number;
  size: string;
  quantityOfPages: number;
  quantityAvailable: number;
  description: string;
  genreId: number;
  averageRating: number;
  soldCount: number;
  images: Image[];
  reviews: Review[];
}
export interface ResultSearchProduct {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  quantityAvailable: number;
  averageRating: number;
  image: string;
}
export interface Pagination {
  page: number;
  limit: number;
  total: number;
}

// Interface phản hồi API tìm kiếm sản phẩm
export interface ProductSearchResponse {
  message: string;
  data: ResultSearchProduct[];
  pagination: Pagination;
}
export interface StatusData {
  statusMes: string;
  message: string;
}
export const getProductbyPage = async (page: number) => {
  let data;
  const res = await axiosInstance
    .get("/get-products?limit=5&page=" + page)
    .then((res) => (data = res.data))
    .catch();
  return data;
};
export const getAllProducts = async () => {
  let data;
  const res = await axiosInstance
    .get("/get-products")
    .then((res) => (data = res.data.products))
    .catch();
  return data;
};
export const getDetailProduct = async (id: number) => {
  let data;
  const res = await axiosInstance
    .get("/get-product-details?id=" + id)
    .then((res) => (data = res.data.product))
    .catch();
  return data;
};
export const searchProductbyName = async (
  q: string,
  page: number | undefined
) => {
  let data;
  let currentpage = "";
  if (page !== undefined) {
    currentpage += `&page=${page}`;
  }
  const res = await axiosInstance
    .get<ProductSearchResponse>("/search-products?keys=" + q + currentpage)
    .then((res) => (data = res.data))
    .catch();
  return data;
};
