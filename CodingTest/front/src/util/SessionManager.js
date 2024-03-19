/**
 * 세션 스토리지 저장 읽어오기 관련 코드 묶음 
 */
export const SessionManager = {
    /**
     * 사용자 이름 저장 
     * @param {string} name 
     */
    setUserName : (name) => {
        sessionStorage.setItem('userName',name); 
    },
    /**
     * 세션에 저장된 사용자 이름 불러오기 
     * @returns String
     */
    getUserName : () => {    
        const name = sessionStorage.getItem('userName',null)
        if(name === null) {
            return "홍길동";
        }
        return name;
    },

    /**
     * 세션스토리지에 문자열 저장 
     * @param {string} key 
     * @param {string} value 
     */
    setCode : (key,value) => {
        sessionStorage.setItem(key,value);
        console.log("save key : "+key + " : " + value);
    },
  
    /**
     * 세션스토리지에 저장되어 있는 문자열 불러오기 
     * @param {string} key 
     * @returns 
     */
    getCode: (key) => {
        const result = sessionStorage.getItem(key);
        console.log("get key : "+key + " : " + result);
        return result;
    },

    /**
     * 중복을 허용하지 않는 배열로 문자열을 저장 
     * @param {String} key 
     * @param {String} value 
     */
    pushStringToSet: (key, value) => {
        var str = sessionStorage.getItem(key);
        console.log(str);
        if (str === null) {
            sessionStorage.setItem(key,value);
            console.log(`push string test---- ${key} ${value}`)
            return;
        }
        str += `,${value}`;
        const arr = str.split(',')
        const set = new Set(arr);
        const newArr = [...set];
        const newStr = newArr.join(',');
        console.log(`push string test---- ${newStr}`)
        console.log(newArr);
        sessionStorage.setItem(key, newStr);
    },

    /**
     * 저장된 배열 구해오기 (,로 구분된 문자열로 저장된 문자열을 배열로 리턴 )
     * @param {string} key 
     * @returns Array<String>
     */
    getArray: (key) => {
        const str = sessionStorage.getItem(key, null);
        if(str !== null) {
            const arr = str.split(',')            
            return arr;
        }
        return [];
    }


    
}