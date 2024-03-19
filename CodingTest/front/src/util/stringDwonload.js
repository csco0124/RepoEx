
import JSZip from 'jszip';
import { SessionManager } from './SessionManager';

/**
 * 코딩한 코드의 문자열을 zip 으로 압축하여 다운로드 
 * @param {*} html 
 * @param {*} js 
 * @param {*} title 
 */
function stringDownload(html,js,title,time) {
    const zip = new JSZip();
    zip.file('index.html', new Blob([html], { type: 'text/plain' }));
    zip.file('javascript.js',new Blob([js], { type: 'text/plain' }));
    zip.file(`time_${time}`, new Blob(['경과시간 : '+ time],{ type: 'text/plain' }));
    
    zip.generateAsync({ type: 'blob' }).then((blob) => {
        // Blob 객체를 URL로 변환
        const url = URL.createObjectURL(blob);
  
        // 다운로드 링크 생성
        const link = document.createElement('a');
        link.href = url;
        link.download = SessionManager.getUserName() + '_' + title + '.zip';
  
        // 링크 클릭하여 다운로드 시작
        link.click();
  
        // URL 해제
        URL.revokeObjectURL(url);
      });  
}

export default stringDownload;