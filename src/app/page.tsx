"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import SplashScreen from "@/components/shared/SplashScreen";
import { getStoredSession } from "@/lib/storage";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      const session = getStoredSession();

      if (session) {
        router.push("/dashboard");
      } else {
        router.push("/login");
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [router]);

  return <SplashScreen />;
}