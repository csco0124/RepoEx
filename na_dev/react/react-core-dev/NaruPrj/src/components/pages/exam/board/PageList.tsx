import { useEffect, useState } from 'react';
import $api from '../../../../common/CommonAxios';
import PageEditor from './PageEditor';

const PageList = () => {
  /**
   * state 정의
   */
  const [titleList, setTitleList] = useState([]); // title 목록 데이터

  /**
   * 에디터 페이지로 이동
   */
  const locationEditingPage = () => (window.location.href = '/PageEditor');

  /**
   * 렌더링 시 getData() 함수 실행
   */
  useEffect(() => {
    getData();
  }, []);

  /**
   * 게시글 title 목록 추출
   */
  const getData = async () => {
    let res = await $api.get('/api/mby/board/data');
    let refineData = res.data.map((item: any) => {
      let { uid, title, content, imageName } = item;
      return { uid, title, content, imageName };
    });

    setTitleList(refineData);
  };

  /**
   * 목록 클릭 시 해당 에디터페이지 띄우기
   */
  const moveClickedEditorPage = (item: any) => {
    window.location.href = `/PageEditor?uid=${item.uid}&title=${item.title}&content=${item.content}&imageName=${item.imageName}`;
  };

  return (
    <div className="content">
      <div className="title-item">
          <h2 className="h2-title">게시판</h2>
          <ul className="location">
              <li>
                게시판예제1
              </li>
              <li>
                게시판
              </li>
          </ul>
      </div>
      <div className="cont-item">
        <ol className="tbl-list">
        {titleList.map((item: any, idx) => (
          <li key={item.uid}>
            <button key={item.uid} onClick={() => moveClickedEditorPage(item)}>
              {idx + 1}. {item.title}
            </button>
          </li>
        ))}
        </ol>
      </div>
      <div className="btn-area right">
        <button
          type="button"
          className="btn btn-sm btn-primary"
          onClick={locationEditingPage}
        >
          글쓰기
        </button>
      </div>
    </div>
  );
};

export default PageList;
