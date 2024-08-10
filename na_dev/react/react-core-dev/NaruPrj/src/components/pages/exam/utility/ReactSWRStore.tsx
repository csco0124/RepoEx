import { useCallback } from 'react';
import useSWR, { mutate } from 'swr';
import $api from '../../../../common/CommonAxios';

/* [1] 프론트엔드 데이터 상태관리 */
export const TEST_SWR_FRONT_DATA_STORE_KEY = 'front_data';
/* [2] 백엔드 데이터 상태관리 */
export const TEST_SWR_BACK_DATA_STORE_KEY = 'back_data';

/* [3] 백엔드 튜토리얼 기본 사용법 */
export const TEST_SWR_BASIC_BACK_DATA_STORE_KEY = '/api/test/get_test_json_random_data_sleep';


export const backFetcher = async (url:string) => {
	let result:any = await $api.post(url);
	return result.data;
}
export const getBackData = () => {
	const { data, error, isLoading, mutate } = useSWR<any>(TEST_SWR_BASIC_BACK_DATA_STORE_KEY, backFetcher);

	return {
    data,
    error,
		isLoading,
		mutate
  };
}

/* [1], [2]를 위한 Store */
const useCurrentStore = () => {
  const setFrontCurrentStore = useCallback((store: any) => {
    mutate(TEST_SWR_FRONT_DATA_STORE_KEY, store);
  }, []);
	const clearFrontCurrentStore = useCallback(() => {
    mutate(TEST_SWR_FRONT_DATA_STORE_KEY, null);
  }, []);

	const setBackCurrentStore = useCallback((store: any) => {
		console.log(store);
    mutate(TEST_SWR_BACK_DATA_STORE_KEY, store);
  }, []);
	const clearBackCurrentStore = useCallback(() => {
    mutate(TEST_SWR_BACK_DATA_STORE_KEY, null);
  }, []);

  return {
    setFrontCurrentStore,
    clearFrontCurrentStore,
		setBackCurrentStore,
		clearBackCurrentStore
  };
};
export default useCurrentStore;