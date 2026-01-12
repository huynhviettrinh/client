import http from "@/lib/http";
import {
  CreateProductBodyType,
  ProductListResType,
  ProductResType,
} from "@/schemaValidations/product.schema";

const productApiResquest = {
  getListProduct: () => http.get<ProductListResType>("/products"),
  getDetailProduct: (id: number) => http.get<ProductResType>(`/products/${id}`),
  createProduct: (body: CreateProductBodyType) =>
    http.post<ProductResType>("/products", body),
  uploadImage: (body: FormData) =>
    http.post<{
      message: string;
      data: string;
    }>("/media/upload", body),
};

export default productApiResquest;
