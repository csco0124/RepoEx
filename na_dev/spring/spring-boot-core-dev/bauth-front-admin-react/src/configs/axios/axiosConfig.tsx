// library
import axios, { AxiosError, AxiosInstance } from 'axios';
// hooks
import { useEffect, useState } from 'react';
import { useAlert } from '@/hooks/useAlert';
// components
import LoadingScreen from '@components/loading-screen';
import { AuthService } from '@auth/AuthService';
// type
import type { CustomAxiosConfig } from './interface';


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

const axiosConfig: AxiosInstance = axios.create({ headers: { 'X-Requested-With': 'XMLHttpRequest' } });

const LoadingScreenInterceptor = () => {
  const [Loading, setLoading] = useState(false);
  const { AlertError } = useAlert();

  useEffect(() => {
    const requestInterceptor = axiosConfig.interceptors.request.use(config => {
      if ((config as CustomAxiosConfig)?.isSkipLoading) {
        setLoading(false);
      } else {
        setLoading(true);
      }

      return config;
    });

    const responseInterceptor = axiosConfig.interceptors.response.use(
      response => {
        const { config } = response;
        setLoading(false);

        if ((config as CustomAxiosConfig)?.isSkipError) {
          return response;
        }

        if (response.data.error === 'MSG' || response.data.error === 'ERR') {
          AlertError(response.data.message);
        }

        return response;
      },
      (error: AxiosError) => {
        const { response, config } = error;

        setLoading(false);

        if ((config as CustomAxiosConfig)?.isSkipError) {
          return Promise.reject(error);
        }

        if (response?.status === 401) {
          AlertError({
            message: (response.data as any).message || '세션이 만료되었습니다.',
            onClose: () => {
              AuthService.loginPage();
            },
          });
        } else if (response?.status === 403) {
          AlertError((response.data as any).message);
        } else if (response?.status === 405) {
          AlertError('유효하지 않은 요청입니다.');
        }

        return Promise.reject(error);
      },
    );

    return () => {
      axiosConfig.interceptors.request.eject(requestInterceptor);
      axiosConfig.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  return Loading ? <LoadingScreen /> : null;
};

export { axiosConfig as $axios} ;
export { LoadingScreenInterceptor };
