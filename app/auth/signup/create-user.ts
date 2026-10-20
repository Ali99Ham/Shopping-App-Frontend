/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { API_URL } from "@/constant";
import { getErrorMsg } from "@/utlis/error";
import { redirect } from "next/navigation";

export async function createUser(_prevState: any, formData: FormData) {
  const res = await fetch(`${API_URL}/users/new`, {
    method: "POST",
    body: formData,
  });
  const data = await res.json();
  if (!res.ok) {
    console.log("data", data);
    return { error: getErrorMsg(data) };
  }
  redirect("/");
}
