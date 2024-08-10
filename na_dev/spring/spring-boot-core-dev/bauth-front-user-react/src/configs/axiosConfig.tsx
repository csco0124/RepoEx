import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import { AuthService } from '@auth/AuthService';
import { useState } from 'react';
import { LoadingScreen } from '@components/LoadingScreen';

export interface CustomAxiosConfig extends AxiosRequestConfig {
  isSkipError?: boolean;
  isSkipLoading?: boolean;
}

// CustomAxiosConfig를 AxiosInstance에 추가
declare module 'axios' {
  interface AxiosInstance {
    request<T = any, R = AxiosResponse<T>>(config: CustomAxiosConfig): Promise<R>;
    get<T = any, R = AxiosResponse<T>>(url: string, config?: CustomAxiosConfig): Promise<R>;
    delete<T = any, R = AxiosResponse<T>>(url: string, config?: CustomAxiosConfig): Promise<R>;
    head<T = any, R = AxiosResponse<T>>(url: string, config?: CustomAxiosConfig): Promise<R>;
    post<T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: CustomAxiosConfig): Promise<R>;
    put<T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: CustomAxiosConfig): Promise<R>;
    patch<T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: CustomAxiosConfig): Promise<R>;
  }
}

const axiosConfig: AxiosInstance = axios.create({headers: {'X-Requested-With': 'XMLHttpRequest'}});

const LoadingScreenInterceptor = () => {
  const [Loading, setLoading] = useState(false);

  axiosConfig.interceptors.request.use(
    config => {
      if (!!(config as CustomAxiosConfig)?.isSkipLoading) {
        setLoading(false);
      } else {
        setLoading(true);
      }

      return config;
    });

  axiosConfig.interceptors.response.use(
    (response) => {
      setLoading(false);
      return response;
    },
    (error: AxiosError) => {
      const { response, config } = error;

      setLoading(false);
  
      if (!!(config as CustomAxiosConfig)?.isSkipError) {
        return Promise.reject(error);
      }
  
      if (response?.status === 401) {
        alert((response.data as any).message || '세션이 만료되었습니다.');
        AuthService.loginPage();
      } else if (response?.status === 403) {
        alert((response.data as any).message);
      }
  
      return Promise.reject(error);
    },
  );

  return Loading ? <LoadingScreen /> : null;
}

export const $axios = axiosConfig;
export { LoadingScreenInterceptor };