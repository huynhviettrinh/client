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

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import productApiResquest from "@/apiRequests/product";
import { toast } from "sonner";
import { useAppContext } from "@/app/app-provider";
import { Link } from "lucide-react";

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
  const handleDeleteProduct = async () => {
    const res = await productApiResquest.deleteProduct(id);
    toast(res.payload.message);

    router.refresh();
  };
  const { user } = useAppContext();

  return (
    <Card className="flex flex-col h-full">
      <CardHeader
        className="cursor-pointer"
        onClick={() => router.push(`products/${id}`)}
      >
        <Image
          priority
          src={image}
          alt="Product"
          width={200}
          height={200}
          className="rounded-t-xl object-cover"
        />
      </CardHeader>

      <CardContent
        className="flex-1 p-2 cursor-pointer"
        onClick={() => router.push(`products/${id}`)}
      >
        <CardTitle className="text-lg">{name}</CardTitle>
        <p className="text-red-500 font-semibold">{price}₫</p>
        <CardDescription className="mt-1 line-clamp-2">
          {description}
        </CardDescription>
      </CardContent>

      <CardFooter className="mt-auto p-2">
        {user && (
          <Button
            className="w-[45%]"
            variant="secondary"
            onClick={() => router.push(`/products/edit/${id}`)}
          >
            Edit
          </Button>
        )}
        <div className="w-[10%]"></div>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            {user && (
              <Button variant="destructive" className="w-[45%]">
                Delete
              </Button>
            )}
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteProduct}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
}
