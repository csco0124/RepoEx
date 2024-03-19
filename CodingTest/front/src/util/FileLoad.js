/**
 * public 안의 파일을 읽어서 문자열로 리턴
 * @param {*} fileurl 
 * @returns 
 */
async function fileLoad(fileurl) {
    try {
      const response = await fetch(fileurl);
      const text = await response.text();
      return text;
    } catch (error) {
      console.log('error : ', error);
      return "";
    }
}
export default fileLoad;