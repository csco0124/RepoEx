// type
import type { FetcherParam } from 'layouts/grid/interface';
import type { CustomAxiosConfig, NaruApiResponse } from "@configs/axios/interface";
// labrary
import { BareFetcher } from 'swr/_internal';
// axios
import { sendAxiosRequest } from '@/utils/axiosUtils';

// customFetcher (response type: NaruApiResponse)
export const customFetcher: BareFetcher = async (fetcherParam: FetcherParam): Promise<NaruApiResponse> => {
  const { url, method, params, data, searchParam, pagination, sortModel } = fetcherParam;

  const config: CustomAxiosConfig = {
    params,
    data: {
      data,
      searchParam ,
      pagination,
      sortModel
    }
  };
  const responseData = await sendAxiosRequest({method, url, ...config});
  
  return responseData.data;
}

// SWR 옵션 - https://swr.vercel.app/ko/docs/api#options
export const swrOptions = {
  revalidateOnFocus: true,
  revalidateOnReconnect: true,
  refreshInterval: 60000,
  loadingTimeout: 5000,
  onError: (error: any) => {
    console.error('Error fetching data:', error);
  },
};