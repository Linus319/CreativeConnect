"use server";

import { encodedRedirect } from "@/utils/utils";
import { createClient } from "@/utils/supabase/server";
import { headers, cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function updateProfileDetails(formData: FormData, email: string) {
  const subTypes = formData.getAll("sub-types");
  const bio = formData.get("bio");
  const city = formData.get("city");
  const state = formData.get("state");
  const displayName = formData.get("display-name");

  const supabase = createClient();

  await supabase.from("users").update({
    bio: bio,
    city: city,
    state: state,
    display_name: displayName,
    sub_types: subTypes
  }).eq('email', email);

  redirect("/profile");
}

export const signUpAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const displayName = formData.get("display-name")?.toString();
  const userType = formData.get("user-type")?.toString();
  const subTypes = formData.get("sub-types");

  const supabase = createClient();

  if (!email || !password || !displayName || !userType || !subTypes) {
    return { error: "All fields are required" };
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,    
  });

  if (error) {
    return encodedRedirect("error", "/sign-up", error.message);
  }
  else {
    const { error } = await supabase.from('users').insert({
      email: email, 
      display_name: displayName,
      user_type: userType,
      sub_types: formData.getAll("sub-types")
    });

    if (error) {
      return encodedRedirect("error", "/sign-up", error.message);
    }

    return encodedRedirect(
      "success",
      "/dashboard",
      "Account created successfully",
    );
  }

};

export const signInAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return encodedRedirect("error", "/sign-in", error.message);
  }

  return redirect("/dashboard");
};

export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const supabase = createClient();
  const origin = headers().get("origin");
  const callbackUrl = formData.get("callbackUrl")?.toString();

  if (!email) {
    return encodedRedirect("error", "/forgot-password", "Email is required");
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?redirect_to=/protected/reset-password`,
  });

  if (error) {
    console.error(error.message);
    return encodedRedirect(
      "error",
      "/forgot-password",
      "Could not reset password",
    );
  }

  if (callbackUrl) {
    return redirect(callbackUrl);
  }

  return encodedRedirect(
    "success",
    "/forgot-password",
    "Check your email for a link to reset your password.",
  );
};

export const resetPasswordAction = async (formData: FormData) => {
  const supabase = createClient();

  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!password || !confirmPassword) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password and confirm password are required",
    );
  }

  if (password !== confirmPassword) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Passwords do not match",
    );
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password update failed",
    );
  }

  encodedRedirect("success", "/protected/reset-password", "Password updated");
};

export async function signOutAction() {
  const supabase = createClient();
  await supabase.auth.signOut();
  cookies().delete('sb-access-token');
  cookies().delete('sb-refresh-token');
  redirect('/sign-in');
}
