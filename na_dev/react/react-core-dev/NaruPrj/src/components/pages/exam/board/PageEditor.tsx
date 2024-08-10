import { useState, useRef, useEffect, useContext, useMemo } from 'react';
import $api from '../../../../common/CommonAxios';
import confirmContext from '../../../../store/confirm-context';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const PageEditor = () => {
  /**
   * state 정의
   */
  const [titleData, setTitleData]: any = useState(''); // title 데이터
  const [contentData, setContentData]: any = useState(''); // content 데이터
  const [selectedImage, setSelectedImage]: any = useState(null); // 선택한 이미지 파일 상태 추가
  const textRef: any = useRef(null); // title input 에 포커싱
  const commConfirm = useContext(confirmContext); // 공통 confirm
  const [clickedImageName, setClickedImageName]: any = useState(''); // 페이지 이동 시 넘어온 이미지 파일 이름

  /**
   * 렌더링 시 새 글쓰기로 들어올 경우 title에 포커스
   * 게시글 목록 클릭을 통해서 들어올 경우 refineUrl 함수 실행을 통해 게시글 데이터 출력
   */
  useEffect(() => {
    textRef.current.focus();
    refineUrl();
  }, []);

  /**
   * 목록 클릭을 통해 페이지를 띄울 때 clickedImageName 의 값 셋팅을 통해서 getImage 함수 실행
   */
  useEffect(() => {
    if (clickedImageName) getImage();
  }, [clickedImageName]);

  /**
   * 에디터 toolbar
   */
  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          [{ header: [1, 2, 3, false] }],
          ['bold', 'italic', 'underline', 'strike'],
          ['blockquote'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ color: [] }, { background: [] }],
          [{ align: [] }, 'link', 'image'],
        ],
      },
    };
  }, []);

  /**
   * 넘어온 url 에서 데이터 추출 및 셋팅
   */
  const refineUrl = () => {
    const searchParams = new URLSearchParams(window.location.search);
    const titleParam = searchParams.get('title');
    const contentParam = searchParams.get('content');
    const imageNameParam = searchParams.get('imageName');
    setTitleData(titleParam);
    setContentData(contentParam);
    setClickedImageName(imageNameParam);
  };

  /**
   * 넘어온 이미지 파일 형변환 및 페이지에 img 로 부착
   */
  const getImage = async () => {
    let res = await $api.get(`/api/mby/board/image/${clickedImageName}`, {
      responseType: 'blob',
    });
    let reader = new FileReader();
    reader.onloadend = () => {
      let base64Image = reader.result;
      setContentData(contentData + `<img src="${base64Image}" />`);
    };
    reader.readAsDataURL(res.data);
  };

  /**
   * title 데이터 셋팅
   */
  const titleDataSet = (event: any) => setTitleData(event.target.value);

  /**
   * content 데이터 셋팅
   */
  const contentDataSet = (event: any) => setContentData(event);

  /**
   * image 파일 셋팅
   */
  // const imageFileSet = (event: any) => {
  //   let file = event.target.files[0]; // 선택한 파일 가져오기
  //   setSelectedImage(file);
  // };

  /**
   * 게시글 데이터 insert
   */
  const insertData = async () => {
    // 이미지 src 추출
    const test: any = document.querySelector('.ql-editor');
    let htmlString = test.innerHTML;
    let parser = new DOMParser();
    let doc = parser.parseFromString(htmlString, 'text/html');
    let imgElement: any = doc.querySelector('img');
    let imgSrc = imgElement.src;

    // 데이터 변환
    const base64Data = imgSrc.split(',')[1];
    const binaryData = atob(base64Data);
    const dataArray = new Uint8Array(binaryData.length);
    for (let i = 0; i < binaryData.length; i++) {
      dataArray[i] = binaryData.charCodeAt(i);
    }
    const blob = new Blob([dataArray], { type: 'image/png' });

    // commConfirm.call({
    //   message: '저장하시겠습니까?',
    //   onConfirm: async () => {
    //     const formData = new FormData();
    //     formData.append('title', titleData);
    //     formData.append('content', contentData);
    //     if (selectedImage) {
    //       formData.append('file', selectedImage);
    //     }
    //     await $api.post('/api/mby/board/data', formData, {
    //       headers: {
    //         'Content-Type': 'multipart/form-data',
    //       },
    //     });
    //   },
    // });
  };

  /**
   * 목록 페이지로 이동
   */
  const returnPage = () => (window.location.href = '/PageList');

  return (
    <div className="content">
      <div className="cont-item">
        <div className="write-item">
          <dl>
            <dt>
              <input
                type="text"
                onChange={titleDataSet}
                ref={textRef}
                value={titleData}
                placeholder="제목"
              />
            </dt>
            <dd>
              {/* <input type="file" accept="image/*" onChange={imageFileSet} /> */}
              <ReactQuill
                value={contentData}
                onChange={contentDataSet}
                modules={modules}
              />
            </dd>
          </dl>
        </div>
      </div>
      <div className="btn-area between">
        <button
          type="button"
          className="btn btn-sm btn-secondary"
          onClick={returnPage}
        >
          이전으로
        </button>
        <button
          type="button"
          className="btn btn-sm btn-primary"
          onClick={insertData}
        >
          저장
        </button>
      </div>
    </div>
  );
};

export default PageEditor;
