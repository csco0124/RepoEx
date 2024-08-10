// react
import { useEffect, useState } from 'react';
// components
import { NaruDataGrid } from '@/components/grid';
import { NaruSearchBar } from '@/components/search-bar';
// style
import { StyledForGridCard } from './style';
// type|interface
import type { GridFrameProps } from './interface';
import type { NaruApiResponse } from '@/configs/axios/interface';
// swr
import useSWR, { BareFetcher } from 'swr';
import { customFetcher } from '@configs/swr/swrConfig';
// reducer
import { sortModel, sortReducer } from '@/stores/data-grid/sortItem';

// GridFrame
const GridFrame = (props: GridFrameProps) => {
  const { customRequestParam, pagination } = props;

  const [searchParam, setSearchParam] = useState({});
  const [condition, setCondition] = useState({ searchParam, sortModel, pagination });

  const [fetcherParam, setFetcherParam] = useState({...condition, ...customRequestParam});

  const { data, mutate } = useSWR(customRequestParam.url, customFetcher({customRequestParam, condition}) as BareFetcher);

  // hooks - effect
  const fetchMethod = () => mutate(fetcherParam);

  return (
    <>
      {/* out - search param */}
      {/* in - mutate */}
      <StyledForGridCard>
        <NaruSearchBar title={props.title} fetchMethod={fetchMethod} fieldList={props.fieldList} />

        {/* out - sort page */}
        {/* in - data */}
        <NaruDataGrid columns={props.columns} rows={[]} footer={<></>} />
      </StyledForGridCard>
    </>
  );
};

export default GridFrame;
