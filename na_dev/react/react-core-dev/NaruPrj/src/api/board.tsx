// import $api from '../common/CommonAxios'
import axios from 'axios';

/*
free fake rest api : https://jsonplaceholder.typicode.com

GET	/posts
GET	/posts/1
GET	/posts/1/comments
GET	/comments?postId=1
POST	/posts
PUT	/posts/1
PATCH	/posts/1
DELETE	/posts/1
*/

interface IPost {
  userId: string | null;
  id: number;
  title: string;
  body: string;
}

const fake_api_server = 'https://jsonplaceholder.typicode.com';

// 게시글 목록 조회
export const posts = (userId: IPost["userId"]) =>
  // https://jsonplaceholder.typicode.com/posts?userId=1
  axios
    .get(`${fake_api_server}/posts`, {
      params: { userId },
    })
    .then((response) => response.data);
    // .then(json => console.log(json));

// 게시글 상세 조회
export const post = (id: IPost["id"]) =>
  axios
    .get(`${fake_api_server}/posts/${id}`)
    .then((response) => response.data);

// 게시글 저장 
// resource will not be really updated on the server but it will be faked as if.
export const savePost = (post: IPost) => axios.post(`${fake_api_server}/posts`, post).then((response) => response.data);

// 게시글 수정
// resource will not be really updated on the server but it will be faked as if.
export const editPost = (post: IPost) => axios.put(`${fake_api_server}/posts/${post.id}`, post).then((response) => response.data);

// 게시글 삭제
// resource will not be really updated on the server but it will be faked as if.
export const deletePost = (id: IPost["id"]) =>
  axios.delete(`${fake_api_server}/posts/${id}`).then((response) => response.data);

// 댓 글 목록 조회
export const comments = (id: IPost["id"]) =>
  // https://jsonplaceholder.typicode.com/posts/1/comments
  axios
    .get(`${fake_api_server}/posts/${id}/comments`)
    .then((response) => response.data);