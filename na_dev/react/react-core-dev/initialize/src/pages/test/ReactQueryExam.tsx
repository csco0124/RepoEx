import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import $api from "../../common/CommonAxios";

const getData = async () => {
  let result:any = await $api.post("/api/test/get_test_json_data");
  console.log("getData", result);
  return result.data;
};

const ReactQueryExam = () => {
	useEffect(() => {
    return () => {};
  }, []);

  const GetQueryData = () => {
    const { data, isLoading, isError } = useQuery<any[]>({queryKey: ["data"],queryFn: getData,}); // param1 : Unique 키, param2 : 비동기 함수

    if (isLoading) return <span>Loading...</span>;
    if (isError) return <span>Error...</span>;
    return (
      <div>
        데이터 :
        <ul>
          {data?.map((dataObj) => (
            <li key={dataObj.USER}>
              {dataObj.USER} | {dataObj.ADDRESS}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  

  return (
    <div>
      데이터 :
      <GetQueryData />
      
    </div>
  );
};

export default ReactQueryExam;
