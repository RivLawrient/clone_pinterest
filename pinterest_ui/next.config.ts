import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // async headers() {
  //   return [
  //     {
  //       // matching all API routes
  //       source: "/*",
  //       headers: [
  //         { key: "Access-Control-Allow-Credentials", value: "true" },
  //         { key: "Access-Control-Allow-Origin", value: "*" }, // replace this your actual origin
  //         {
  //           key: "Access-Control-Allow-Methods",
  //           value: "GET,DELETE,PATCH,POST,PUT",
  //         },
  //         {
  //           key: "Access-Control-Allow-Headers",
  //           value:
  //             "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
  //         },
  //       ],
  //     },
  //   ];
  // },
  env: {
    HOST_API_PUBLIC: process.env.HOST_API_PUBLIC,
    // HOST_WS_PUBLIC: process.env.HOST_WS_PUBLIC,
    // LOCAL: process.env.LOCAL,
    // LOCAL2: process.env.LOCAL2,
    // API_HOST: process.env.API_HOST,
    // API_GET_USER: process.env.API_GET_USER,
    // API_LOGOUT: process.env.API_LOGOUT,
    // API_RANDOM_POST: process.env.API_RANDOM_POST,
    // API_GOOGLE: process.env.API_GOOGLE,
    // API_REGISTER: process.env.API_REGISTER,
    // API_BIRTH: process.env.API_BIRTH,
    // API_REGISTER2: process.env.API_REGISTER2,
  },
};

export default nextConfig;
