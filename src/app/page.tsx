"use client";
import { useEffect, useState } from "react";
import { getToken, isLoggedIn } from "@/utils/Auth";
import { useRouter } from "next/navigation";

export default function Home() {
  const [isLogin, setIsLogin] = useState<true | false>(false);
  const router = useRouter();
  useEffect(() => {
    setIsLogin(isLoggedIn);
    if (isLogin) {
      router.push("/dashboard");
    } else {
      router.push("/login");
    }
  }, [isLogin]);
  return (
    <div className="flex w-full h-[700px] justify-center align-center">
      <div className="dot-loader">
        <span></span>
        <span></span>
        <span></span>
        <p className="text-[20px]">Loading</p>
      </div>
      <div></div>
    </div>
  );
}
