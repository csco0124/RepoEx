import { useEffect, useRef, useState } from 'react';
import $api from '../../../../../common/CommonAxios';
import { Editor } from "@tinymce/tinymce-react";
const TinyMCEExam = () => {
	const editorRef = useRef<any>(null);
  const [content, setContent] = useState<any>("This is the initial content of the editor.");

  const [text, setText] = useState<any>();
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };
  const onEditorChange = function (a:any, editor:any) {
    // console.log(a);
    setContent(a);
    setText(editor.getContent({ format: "text" }));
    //console.log(editor);
  };

  return (
    <div className="content">
      <div className="title-item">
			<h2 className="h2-title">TinyMCE 예제</h2>
        <ul className="location">
          <li>예제</li>
          <li>게시판예제</li>
          <li>TinyMCE 에디터 예제</li>
        </ul>
      </div>
      <div className="cont-item">
				<h3>현재 이미지 URL 삽입만 구현되어 있음(데이터 저장은 개발예정)</h3>
				<Editor
					apiKey={import.meta.env.VITE_TINY_MCE_KEY}
					onEditorChange={onEditorChange}
					//outputFormat="text"
					
					value={content}
					onInit={(evt, editor) => (editorRef.current = editor)}
					init={{
						height: 500,
						menubar: true,
						plugins: [
							"mentions advlist autolink lists link image charmap print preview anchor",
							"searchreplace visualblocks code fullscreen",
							"insertdatetime media table paste code help wordcount",
						],
						toolbar:
							"code | undo redo | link image media | formatselect | " +
							"bold italic backcolor | alignleft aligncenter " +
							"alignright alignjustify | bullist numlist outdent indent | " +
							"removeformat | emoticons | help",
						content_style:
							"body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
						emoticons_append: {
							custom_mind_explode: {
								keywords: ["brain", "mind", "explode", "blown"],
								char: "🤯",
							},
						},
						
						automatic_uploads: true,
          	file_browser_callback_types: "image",
          	image_advtab: true,
						file_picker_types: 'image',
						file_picker_callback: function(callback, value, meta) {
							const url = `/api/tiny/image/upload`;

							let input = document.createElement('input');
    					input.setAttribute('type', 'file');
    					input.setAttribute('accept', 'image/*');
							
							input.onchange = async function (e:any) {
								let file = e.target.files[0];
								
								let formData = new FormData();
								formData.append("file", file);
								const res = await $api.post(url, formData, {headers: {'Content-Type': 'multipart/form-data'}});
								
								if(res && res.data && meta.filetype == 'image'){
									callback(`${import.meta.env.VITE_APP_BACKEND_CALL_URL}/api/tiny/get_image/${res.data}`);
								}
							}
							input.click();
						},
						images_upload_handler: async (blobInfo, success, failure) => {
							const url = `/api/tiny/image/upload`;
							let formData = new FormData();
							formData.append("file", blobInfo.blob());
							const res = await $api.post(url, formData, {headers: {'Content-Type': 'multipart/form-data'}});

							if(res && res.data){
								success(`${import.meta.env.VITE_APP_BACKEND_CALL_URL}/api/tiny/get_image/${res.data}`);
							}              
            }
					}}
				/>
				<button onClick={log}>Log editor content</button>
      </div>
    </div>
  );
};

export default TinyMCEExam;
