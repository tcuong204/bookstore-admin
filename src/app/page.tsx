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
  return <div>...Loading</div>;
}
