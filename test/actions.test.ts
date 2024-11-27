import { signOutAction, signUpAction, updateProfileDetails } from "../app/actions";
import { createClient } from "@/utils/supabase/server";
import { encodedRedirect } from "../utils/utils";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

jest.mock("../utils/supabase/server", () => ({
  createClient: jest.fn(),
}));

jest.mock("../utils/utils", () => ({
  encodedRedirect: jest.fn(),
}));

jest.mock("next/headers", () => ({
  headers: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
}));

const dummySubTypes = ["Music", "Video"];

describe("signUpAction", () => {
  it("should sign up a new user and redirect with success message", async () => {

    const mockSupabase = {
      auth: {
        signUp: jest.fn().mockResolvedValue({ user: { email: "test@example.com" }, error: null }),
      },
      from: jest.fn().mockReturnThis(),
      insert: jest.fn().mockResolvedValue({ data: [{ id: 1, display_name: "Test User" }] }),
    };

    (createClient as jest.Mock).mockReturnValue(mockSupabase);

    const mockHeaders = {
      get: jest.fn().mockReturnValue("http://localhost:3000"),
    };
    (headers as jest.Mock).mockReturnValue(mockHeaders);

    const formData = new FormData();
    formData.append("email", "test@example.com");
    formData.append("password", "password123");
    formData.append("display-name", "Test User");
    formData.append("user-type", "basic");
    for (let type of dummySubTypes) {
      formData.append("sub-types", type);
    }

    await signUpAction(formData);

    expect(mockSupabase.auth.signUp).toHaveBeenCalledWith({
      email: "test@example.com",
      password: "password123",
      // options: { emailRedirectTo: "http://localhost:3000/auth/callback" },
    });

    expect(mockSupabase.from).toHaveBeenCalledWith("users");
    expect(mockSupabase.insert).toHaveBeenCalledWith({
      email: "test@example.com",
      display_name: "Test User",
      user_type: "basic",
      sub_types: dummySubTypes,
    });

    expect(encodedRedirect).toHaveBeenCalledWith(
      "success",
      "/dashboard",
      "Account created successfully",
    );
  });

  it("should handle error during sign-up", async () => {
    const mockSupabase = {
      auth: {
        signUp: jest.fn().mockResolvedValue({ user: null, error: { code: "ERROR", message: "Test error" } }),
      },
      from: jest.fn().mockReturnThis(),
      insert: jest.fn().mockResolvedValue({ data: [] }),  // Insert should not be called if signUp fails
    };

    (createClient as jest.Mock).mockReturnValue(mockSupabase);

    const mockHeaders = {
      get: jest.fn().mockReturnValue("http://localhost:3000"),
    };
    (headers as jest.Mock).mockReturnValue(mockHeaders);

    const formData = new FormData();
    formData.append("email", "test@example.com");
    formData.append("password", "password123");
    formData.append("display-name", "Test User");
    formData.append("user-type", "venue");
    for (let type of dummySubTypes) {
      formData.append("sub-types", type);
    }

    await signUpAction(formData);

    expect(mockSupabase.auth.signUp).toHaveBeenCalledWith({
      email: "test@example.com",
      password: "password123",
    });

    expect(encodedRedirect).toHaveBeenCalledWith(
      "error",
      "/sign-up",
      "Test error"
    );

    expect(mockSupabase.insert).not.toHaveBeenCalled();
  });
});

describe("updateProfileDetails", () => {
    it("should update user profile and redirect to /profile", async () => {
        const mockSupabase = {
            from: jest.fn().mockReturnThis(),
            update: jest.fn().mockReturnThis(),
            eq: jest.fn().mockReturnThis(),
        };

    (createClient as jest.Mock).mockReturnValue(mockSupabase);

    const formData = new FormData();
    
    for (let type of dummySubTypes) {
        formData.append("sub-types", type);
    }
    formData.append("bio", "This is a bio");
    formData.append("city", "Iowa City");
    formData.append("state", "IA");
    formData.append("display-name", "linus wuz here");

    const email = "test@example.com";

    await updateProfileDetails(formData, email);

    expect(mockSupabase.from).toHaveBeenCalledWith("users");
    expect(mockSupabase.update).toHaveBeenCalledWith({
      bio: "This is a bio",
      city: "Iowa City",
      state: "IA",
      display_name: "linus wuz here",
      sub_types: ["Music", "Video"],
    });
    expect(mockSupabase.eq).toHaveBeenCalledWith('email', email);
    expect(redirect).toHaveBeenCalledWith("/profile");
  });
});

describe("signOutAction", () => {

  it("should sign out the user and redirect to '/' ", async () => {
    const signOutMock = jest.fn();
    (createClient as jest.Mock).mockReturnValue({
      auth: {
        signOut: signOutMock,
      },
    });

    await signOutAction();

    expect(signOutMock).toHaveBeenCalledTimes(1);
    expect(redirect).toHaveBeenCalledWith("/");
  });

  it("should handle sign-out failure and call encodedRedirect", async () => {
    const signOutMock = jest.fn().mockRejectedValue(new Error("Sign-out failed"));
    (createClient as jest.Mock).mockReturnValue({
      auth: {
        signOut: signOutMock,
      },
    });
    
    await signOutAction();

    expect(signOutMock).toHaveBeenCalledTimes(1);

    expect(encodedRedirect).toHaveBeenCalledWith(
      "error",
      '/sign-out',
      "Sign out failed, try again",
    );
  });
});