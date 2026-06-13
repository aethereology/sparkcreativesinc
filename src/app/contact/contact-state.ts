/** Shared (non-"use server") types + initial state for the contact form. */
export type ContactState = {
  status: "idle" | "success" | "error";
  message: string;
  errors: Partial<Record<"name" | "email" | "organization" | "inquiryType" | "message", string>>;
};

export const initialContactState: ContactState = {
  status: "idle",
  message: "",
  errors: {},
};
