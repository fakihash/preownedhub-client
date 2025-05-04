import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithInterceptor } from "../../utils/baseQueryWithInterceptor";

export const userAuthApi = createApi({
  reducerPath: "userAuthApi",
  baseQuery: baseQueryWithInterceptor,
  endpoints: (builder) => ({
    userSignUpApi: builder.mutation({
      query: ({ body }) => ({
        url: "client-auth/register",
        method: "POST",
        body,
      }),
    }),
    userSignInApi: builder.mutation({
      query: ({ body }) => ({
        url: "client-auth/login",
        method: "POST",
        body,
      }),
    }),
    userForgotPwdApi: builder.mutation({
      query: ({ body }) => ({
        url: "client-auth/reset-password/email",
        method: "POST",
        body,
      }),
    }),
    userOtpReqApi: builder.mutation({
      query: ({ body }) => ({
        url: "client-auth/reset-password/otp/verify",
        method: "POST",
        body,
      }),
    }),
    userResetPwdApi: builder.mutation({
      query: ({ body }) => ({
        url: "client-auth/update/password",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useUserForgotPwdApiMutation,
  useUserOtpReqApiMutation,
  useUserResetPwdApiMutation,
  useUserSignInApiMutation,
  useUserSignUpApiMutation,
} = userAuthApi;
