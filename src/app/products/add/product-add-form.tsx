"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";

import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { handleErrorApi } from "@/lib/utils";
import { useRef, useState } from "react";
import {
  CreateProductBody,
  CreateProductBodyType,
} from "@/schemaValidations/product.schema";
import productApiResquest from "@/apiRequests/product";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { clientSessionToken } from "@/lib/http";

export default function ProductAddForm() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const form = useForm<CreateProductBodyType>({
    resolver: zodResolver(CreateProductBody),
    defaultValues: {
      name: "",
      price: 0,
      description: "",
      image: "",
    },
  });

  async function onSubmit(values: CreateProductBodyType) {
    if (loading) return;
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file as Blob);
      const uploadImage = await productApiResquest.uploadImage(formData);
      const imageUrl = uploadImage.payload.data;
      const result = await productApiResquest.createProduct({
        ...values,
        image: imageUrl,
      });
      console.log(result);
      router.push("/products");
    } catch (error: any) {
      handleErrorApi({
        error,
        setError: form.setError,
      });
    } finally {
      setLoading(false);
    }
  }
  const handleRemoveImage = () => {
    setFile(null);
    setPreviewUrl(null);

    // reset input file
    if (inputRef.current) {
      inputRef.current.value = "";
      form.setValue("image", "", { shouldValidate: true });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-2 max-w-[600px] flex-shrink-0 w-full"
        noValidate
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name product</FormLabel>
              <FormControl>
                <Input placeholder="name product" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input placeholder="Price" type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <Input
                  placeholder="image"
                  type="file"
                  ref={inputRef}
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    if (!file.type.startsWith("image/")) {
                      alert("Chỉ được chọn file ảnh");
                      return;
                    }
                    if (file) {
                      setFile(file);
                      setPreviewUrl(URL.createObjectURL(file));
                      field.onChange("http://localhost:3000/" + file.name);
                    }
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {file && (
          <div>
            <Image
              src={previewUrl ? previewUrl : ""}
              alt="preview"
              width={128}
              height={128}
              className="w-32 h-32 object-cover"
            />
            <Button
              type="button"
              onClick={handleRemoveImage}
              className=" bg-red-500 text-white"
            >
              Xóa
            </Button>
          </div>
        )}
        <Button type="submit" className="mt-8 w-full">
          Add product
        </Button>
      </form>
    </Form>
  );
}
