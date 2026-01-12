"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function ProductCard({
  id,
  name,
  price,
  description,
  image,
}: {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
}) {
  const router = useRouter();

  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <Image
          priority
          src={image}
          alt="Product"
          width={200}
          height={200}
          className="rounded-t-xl object-cover"
        />
      </CardHeader>

      <CardContent className="flex-1 p-2">
        <CardTitle className="text-lg">{name}</CardTitle>
        <p className="text-red-500 font-semibold">{price}₫</p>
        <CardDescription className="mt-1 line-clamp-2">
          {description}
        </CardDescription>
      </CardContent>

      <CardFooter className="mt-auto p-2">
        <Button
          className="w-[45%]"
          variant="secondary"
          onClick={() => router.push(`/products/${id}`)}
        >
          Edit
        </Button>
        <div className="w-[10%]"></div>
        <Button className="w-[45%]" variant="destructive">
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}
