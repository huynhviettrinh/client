import productApiResquest from "@/apiRequests/product";
import { HttpError } from "@/lib/http";
import { toast } from "sonner";

export default async function ProductEdit({
  params,
}: {
  params: { id: string };
}) {
  let productDetail = null;
  try {
    const { id } = await params;
    const res = await productApiResquest.getDetailProduct(Number(id));
    productDetail = res.payload.data;
  } catch (error) {
    if (error instanceof HttpError) {
      console.log(error.payload);
    }
  }

  return <div>{!productDetail && <>Not found any product</>}</div>;
}
