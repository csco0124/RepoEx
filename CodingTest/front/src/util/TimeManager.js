/**
 * 시험 시간 측정 관련 메서드 묶음 
 */

import { SessionManager } from "./SessionManager";

export const TimeManager = {
    /**
     * 시분초 포메팅하기 
     * @param {Number} sec 
     * @returns 
     */
    makeTimeFormat : (sec) => {
        if(sec < 0) {
            return 0;
        }
        const myNum = parseInt(sec, 10);
        const hours = Math.floor(myNum / 3600);
        const minutes = Math.floor((myNum - (hours * 3600)) / 60);
        const seconds = myNum - (hours * 3600) - (minutes * 60);
    
        // 시, 분, 초가 한 자리 수인 경우 앞에 0을 추가합니다.
        const formattedHours = hours < 10 ? "0" + hours : hours;
        const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
        const formattedSeconds = seconds < 10 ? "0" + seconds : seconds;
    
        return `${formattedHours}시 ${formattedMinutes}분 ${formattedSeconds}초`;    
    },
    /**
     * 타이머 시작시간 읽어오기 
     * @param {String} id 
     * @returns 
     */
    getStartTime : (id) => {
        return sessionStorage.getItem(id);
    },

    /**
     * 세션스토리지에 시작시간 저장하기 
     * @param {String} id 
     */
    setStartTime : (id) => {
        if(id === null) {
            console.log("id 설정 안했다.")
        }
        let date = new Date();
        let sec = Math.floor(date.getTime() / 1000);        
        sessionStorage.setItem(id, sec);
        sessionStorage.setItem("lastTimeId", id);    
        console.log(`setStartTime  id:${id} sec : ${sec}`)
        
        const url = window.location.href

        SessionManager.pushStringToSet("timeKeys",id+"|"+url);
        
    },

    /**
     * 시험 시작했는지? 
     * @param {String} id 
     * @returns 
     */
    isStarted : (id) => {
        return TimeManager.getStartTime !== null;
    },

    getTestTime: (id) => {
        if(id === null) {
            return null;
        }
        const time = TimeManager.getStartTime(id);
        if(time === null) {
            return null;
        }
        const now = new Date();
        let sec = Math.floor(now.getTime() / 1000);        
        return sec-time;
    },

    /**
     * 테스트 경과시간 문자열(시분초)로 출력
     */
    getTestTimeString : (id) => {
        const sec = TimeManager.getTestTime(id);

        const result = TimeManager.makeTimeFormat(sec);        
        console.log(`id : ${id} getTestTimeString : ${result} : ${sec}`) ;
        return result;
    },

    /**
     * 시험 제한시간 정의 (분단위)
     */
    getLimitMinute: () => {
        return 50;
    },

    /**
     * 타임 오버인가? 
     */
    getIsTimeUp: (id) => {
        const time = TimeManager.getTestTime(id);
        const limit = TimeManager.getLimitMinute();
        return time > limit * 60;        
    }
}


