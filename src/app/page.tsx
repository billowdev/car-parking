"use client";
import React, { useEffect } from "react";
import WithAuth from "@/components/WithAuth";
import { ACCESS_TOKEN_KEY } from "@/configs/constants/index";
import { useRouter } from "next/navigation";
import { jwtDecodeUtil } from "@/utils/jwtDecodeUtil";

type Props = {};

function HomePage({}: Props) {
  const router = useRouter();

  const handleLogout = () => {
    // Clear the access token from localStorage or perform any other logout logic
    localStorage.removeItem(ACCESS_TOKEN_KEY);

    localStorage.clear();
    // Redirect the user to the sign-in page
    router.push("/auth/signin");
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("access");

    const decoded = jwtDecodeUtil(accessToken);
    if (decoded) {
      const currentTime = Math.floor(Date.now() / 1000);
      const exp = decoded?.exp ?? 0;
  
      if (currentTime > exp) {
        router.push("/auth/signin");
      }
  
      if (decoded.role === "admin") {
        router.push("/managements/users");
      } else {
        router.push("/");
      }
    }else{
      console.log("====== ")
      console.log(decoded)
      console.log("====== ")
      // router.push("/auth/signin");
    }
    
  }, [router]);

  return (
    <div>
      <h1>HomePage</h1>

      <button
        onClick={() => {
          handleLogout();
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default WithAuth(HomePage);
