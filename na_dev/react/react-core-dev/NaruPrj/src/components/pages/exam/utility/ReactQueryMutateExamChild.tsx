import { useCallback, useEffect, useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import $api from "../../../../common/CommonAxios";
import uuid from "react-uuid";

const fetchComments = async (postId:string) => {
	let result:any = await $api.get(`/api/test/get_db_test_data?id=${postId}`);
	return result.data;
}
const insertPost = async (postId:string) => {
	const param = {id : postId, userName : uuid()};
	let result:any = await $api.post("/api/test/insertTestData", param);
	return result.data;
}
const deletePost = async (postId:string) => {
	const param = {id : postId};
	let result:any = await $api.post("/api/test/deleteTestId", param);
	return result.data;
}
const updatePost = async (postId:string) => {
	const param = {id : postId, userName : uuid()};
	let result:any = await $api.post("/api/test/updateTestUserName", param);
	return result.data;
}

const ReactQueryMutateExamChild = ({ post }:any) => {
	const queryClient = useQueryClient();
	const allCache = useRef<any>(null);


	const { data, isLoading, isError, refetch } = useQuery<any[]>({queryKey: ["mudate_data"], queryFn: () => fetchComments(post.id)}); // param1 : Unique 키, param2 : 비동기 함수
	
	if (isError) {
    return (
			<div>An error occurred</div>
		);
  }

	const setCacheList = () => {
		const queryCache = queryClient.getQueryCache();
		const query = queryCache.findAll();

		let cacheList = "";
		query.forEach(function(item, index) {
			console.log(item["queryKey"], item);
			cacheList += ((index > 0)?",":"")+item["queryKey"];
		});
		allCache.current.innerHTML = cacheList;
	}

	const insertMutation = useMutation(() => insertPost(post.id));
	const deleteMutation = useMutation((postId:string) => deletePost(postId)); //인수전달가능
  const updateMutation = useMutation(() => updatePost(post.id));
	if(insertMutation.isSuccess || updateMutation.isSuccess || deleteMutation.isSuccess){
		//refetch();
		queryClient.invalidateQueries(["mudate_data"]);	// 데이터 다시 가져오기 (refetch() 를 호출해도 되지만 보편적으로 invalidateQueries 를 사용함)
		setCacheList();
	}

	useEffect(() => {
		setCacheList();
		return () => {
		}
	}, []);

  return (
		<div className="row">
			<div className="col-2 border">
				<button type="button" className="btn btn-sm btn-outline-primary" onClick={() => updateMutation.mutate(post.id)}>Update title</button>
				{updateMutation.isLoading ? <p>데이터 업데이트중.......</p> : ""}
				{updateMutation.isSuccess ? <p>데이터 업데이트 완료!!!</p> : ""}
				{updateMutation.isError ? <p>[데이터 업데이터 에러]</p> : ""}
			</div>
			<div className="col-2 border">
				<button type="button" className="btn btn-sm btn-outline-primary" onClick={() => {deleteMutation.mutate(post.id);}}>Delete</button>
				{deleteMutation.isLoading && <p>데이터 삭제중.......</p>}
				{deleteMutation.isSuccess && <p>데이터 삭제 완료!!!</p>}
				{deleteMutation.isError && <p>[데이터 삭제 에러]</p>}
			</div>
			<div className="col-2 border">
				<button type="button" className="btn btn-sm btn-outline-primary" onClick={() => {insertMutation.mutate(post.id)}}>Insert</button>
				{insertMutation.isLoading && <p>데이터 삽입중.......</p>}
				{insertMutation.isSuccess && <p>데이터 삽입 완료!!!</p>}
				{insertMutation.isError && <p>[데이터 삽입 에러]</p>}
			</div>
			<div className="col-2 border">
				<button type="button" className="btn btn-sm btn-outline-primary" onClick={() => {queryClient.clear();setCacheList();}}>캐시 전체 삭제</button>
			</div>
			<div className="col-2 border">
				현재 전체 캐시 리스트
				<p className="text-break" ref={allCache}></p>
			</div>
			<div className="col-12 border">
			<h4>Comments</h4>
				{isLoading ? (
					<div>로딩중입니다...</div>
				) : (
					data?.map((resData:any) => (
						<li key={uuid()}>
							{resData.ID}: {resData.USER_NAME}
						</li>
					))
				)}
			</div>
		</div>
  );
};

export default ReactQueryMutateExamChild;
