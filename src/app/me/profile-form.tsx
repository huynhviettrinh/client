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
import authApiRequest from "@/apiRequests/auth";
import { useRouter } from "next/navigation";
import { handleErrorApi } from "@/lib/utils";
import { useState } from "react";
import {
  AccountResType,
  UpdateMeBody,
  UpdateMeBodyType,
} from "@/schemaValidations/account.schema";
import { clientSessionToken } from "@/lib/http";
import accountApiRequest from "@/apiRequests/account";

type Profile = AccountResType["data"];

export default function ProfileForm({ profile }: { profile: Profile }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(true);

  const form = useForm<UpdateMeBodyType>({
    resolver: zodResolver(UpdateMeBody),
    defaultValues: {
      name: profile.name,
    },
  });

  async function onSubmit(values: UpdateMeBodyType) {
    if (loading) return;
    setLoading(true);
    try {
      const sesionToken = clientSessionToken.value;
      const result = await accountApiRequest.updateMe(values, sesionToken);
      toast.success(result.payload.message || "Cập nhập thành công");
      router.refresh();
    } catch (error: any) {
      handleErrorApi({
        error,
        setError: form.setError,
      });
    } finally {
      setLoading(false);
      setIsEdit(true);
    }
  }

  const handleEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setIsEdit(() => {
      return false;
    });
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-2 max-w-[600px] flex-shrink-0 w-full"
        noValidate
      >
        <FormLabel>Email</FormLabel>
        <FormControl>
          <Input placeholder="Email" value={profile.email} disabled />
        </FormControl>
        <FormMessage />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="name" {...field} disabled={isEdit} />
              </FormControl>

              <FormMessage />
              <Button size="sm" variant="outline" onClick={handleEdit}>
                Edit
              </Button>
            </FormItem>
          )}
        />
        <Button type="submit" className="mt-8 w-full">
          Save
        </Button>
      </form>
    </Form>
  );
}
