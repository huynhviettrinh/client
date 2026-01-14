import productApiResquest from "@/apiRequests/product";
import { ProductCard } from "@/app/products/product-card";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function ProductListPage() {
  const cookie = cookies();
  const sesstionToken = (await cookie).get("sesstionToken")?.value;
  const res = await productApiResquest.getListProduct();
  const productList = res.payload.data;
  return (
    <>
      {sesstionToken && (
        <Link rel="stylesheet" href="/products/add">
          Add product
        </Link>
      )}
      <div className="grid grid-cols-6 gap-4">
        {productList.map((product) => {
          return (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              description={product.description}
              image={product.image}
            />
          );
        })}
      </div>
    </>
  );
}
