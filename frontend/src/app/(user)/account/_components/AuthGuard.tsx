"use client";
import api from "@/lib/util/api";
import { loginSuccess } from "@/store/slices/auth.slice";

import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { useRouter } from "next/navigation";

import LoadingScreen from "@/common/components/LoadingScreen";
import { App, message } from "antd";
import { useEffect, useState } from "react";

export default function UserAuthGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { message } = App.useApp();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (isAuthenticated) {
          return;
        }
        const res = await api.post("/refresh-token");
        const { accessToken, user } = res.data;
        if (accessToken) {
          dispatch(loginSuccess({ accessToken, user }));
        } else {
          throw new Error("Không nhận được token");
        }
      } catch (err) {
        console.log("Lỗi xác thực", err);
        router.replace("/loign");
      } finally {
        setIsChecking(false);
      }
    };
    checkAuth();
  });
  if (isChecking) {
    return <LoadingScreen />;
  }

  if (isAuthenticated) {
    return <>{children}</>;
  }
  return null;
}
