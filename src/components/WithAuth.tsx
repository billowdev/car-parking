"use client";
import {useRouter} from "next/navigation";
import React, { useEffect } from 'react';
import { ACCESS_TOKEN_KEY } from '@/configs/constants/index';

type Props = {};

function WithAuth(WrappedComponent: React.ComponentType<any>) {
  const AuthComponent: React.FC<Props> = (props) => {
    const router = useRouter();

    useEffect(() => {
      const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);

      if (!accessToken) {
        router.push('/auth/signin');
      }
    }, [router]);

    return <WrappedComponent {...props} />;
  };

  return AuthComponent;
}

export default WithAuth;
