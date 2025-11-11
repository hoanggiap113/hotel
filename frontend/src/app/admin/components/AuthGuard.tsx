"use client";

import api from "@/lib/api";

import { loginSuccess,logOut } from "@/store/slices/auth.slice";
import { useAppDispatch,useAppSelector } from "@/hooks/reduxHooks";
import { usePathname, useRouter } from "next/navigation";
import LoadingScreen from "./LoadingScreen";
import { useEffect, useState } from "react";
export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const [isChecking, setIsChecking] = useState(true);
  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (isAuthenticated) {
          return;
        }
        const res = await api.post('/refresh-token');
        const { accessToken,user } = res.data;
        if (accessToken) {
          console.log("Refresh thành công!");
          dispatch(loginSuccess({accessToken, user}));
        } else {
          throw new Error('Không nhận được access token');
        }
      } catch (err) {
        console.log("Auth check failed", err);
        router.replace("/login");
      } finally {
        setIsChecking(false);
      }
    };
    checkAuth();
  }, [isAuthenticated, dispatch, router]);
  if (isChecking) {
    return <LoadingScreen />;
  }

  if (isAuthenticated) {
    return <>{children}</>;
  }
  return null;
}
