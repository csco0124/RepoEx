// axios
import { $axios } from '@/configs/axios/axiosConfig';
// axios type
import type { AxiosResponse } from 'axios';
import type { CustomAxiosConfig, NaruApiResponse } from "@configs/axios/interface";

// Axios 호출 함수
export const sendAxiosRequest = async (config: CustomAxiosConfig): Promise<AxiosResponse<NaruApiResponse, CustomAxiosConfig>> => {
  // request error -> $axios 인스턴스에 정의 된 interceptors로 처리
  const response: AxiosResponse<NaruApiResponse> = await $axios.request(config).then(res => res);
  return response; 
};
