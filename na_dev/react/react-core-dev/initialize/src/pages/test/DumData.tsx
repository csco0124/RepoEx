/* 사원정보 */
/*
empNo: 사원번호
empNm: 사원명
empBirth: 생년월일 "YYYYMMDD"
email: 이메일 "abc@naver.com"
empHp: 전화번호 "01012345678"
empLev: 직급 [1:사원, 2:주임, 3:대리, 4:과장, 5:차장, 6:부장, 7:이사, 8:상무, 9:부대표, 10:대표]
state: 상태 [1:재직, 2:휴직, 3:퇴직]
*/
interface member {
    empNo : number
    empNm : string
    empBirth : string
    email : string
    empHp : string
    empLev : number | string
    state : number | string
}
const colorOptions = {
    1: "사원",
    2: "주임",
    3: "대리",
    4: "과장",
    5: "차장",
    6: "부장",
    7: "이사",
    8: "상무",
    9: "부대표",
    10: "대표",
};
const colorOptionss = {
    재직: "재직",
    휴직: "휴직",
    퇴직: "퇴직",
};
const DUMY_DATA = 
[
    {empNo: 10, empNm: "정진만", empBirth: "20220708", email: "jmjung@naruint.com", empHp: "01071535379", empLev: 10, state: 1},
    {empNo: 11, empNm: "임헌욱", empBirth: "19740129", email: "icq112771720@naruint.com", empHp: "01042940107", empLev: 8, state: 2},
    {empNo: 12, empNm: "이인호", empBirth: "", email: "lih@naruint.com", empHp: "01068202858", empLev: 2, state: 3},
    {empNo: 13, empNm: "정다혜", empBirth: "19970324", email: "dhyej@naruint.com", empHp: "01038103313", empLev: 3, state: 1},
    {empNo: 14, empNm: "최호진", empBirth: "19930116", email: "quizho93@gmail.com", empHp: "01077693476", empLev: 2, state: 1},
    {empNo: 15, empNm: "최동완", empBirth: "", email: "ehddhkschl2@naruint.com", empHp: "01076398010", empLev: 2, state: 1},
    {empNo: 16, empNm: "윤성욱", empBirth: "", email: "ysw123@naruint.com", empHp: "01055612508", empLev: 2, state: 1},
    {empNo: 17, empNm: "문병윤", empBirth: "", email: "mby0225@naruint.com", empHp: "01046464376", empLev: 2, state: 1},
    {empNo: 18, empNm: "조강묵", empBirth: "", email: "jgm@naruint.com", empHp: "01029504062", empLev: 2, state: 1},
    {empNo: 19, empNm: "서형일", empBirth: "19950808", email: "avs1212@naver.com", empHp: "01075922974", empLev: 2, state: 3},
    {empNo: 20, empNm: "정진희", empBirth: "", email: "gavi@naruint.com", empHp: "01083873955", empLev: 5, state: 2},
    {empNo: 21, empNm: "이광희", empBirth: "", email: "kwanghee@naruint.com", empHp: "01067925764", empLev: 2, state: 1},
    {empNo: 22, empNm: "최승병", empBirth: "", email: "victor@naruint.com", empHp: "01032102939", empLev: 8, state: 1},
    {empNo: 23, empNm: "김민석", empBirth: "19960830", email: "rlaalstjr7@naruint.com", empHp: "01044169798", empLev: 3, state: 1},
    {empNo: 24, empNm: "김기욱", empBirth: "", email: "rldnrdl@naruint.com", empHp: "01022727449", empLev: 2, state: 3},
    {empNo: 25, empNm: "박윤수", empBirth: "", email: "parkys1981@naruint.com", empHp: "01032738847", empLev: 6, state: 3},
    {empNo: 26, empNm: "이기라", empBirth: "", email: "rickey@naver.com", empHp: "01082916205", empLev: 9, state: 1},
    {empNo: 27, empNm: "조민석", empBirth: "19941214", email: "cms8591694@naruint.com", empHp: "01075549412", empLev: 3, state: 1},
    {empNo: 28, empNm: "이화종", empBirth: "", email: "hj2ya7@naruint.com", empHp: "01063629392", empLev: 3, state: 1},
    {empNo: 29, empNm: "원보현", empBirth: "", email: "bhwon@naruint.com", empHp: "01071283158", empLev: 2, state: 1},
    {empNo: 30, empNm: "박영정", empBirth: "19881111", email: "pyj1988@narui.com", empHp: "01041192730", empLev: 5, state: 1},
    {empNo: 31, empNm: "박종석", empBirth: "19960317", email: "pjs@naruint.com", empHp: "01035280317", empLev: 3, state: 1},
    {empNo: 32, empNm: "김정윤", empBirth: "19750727", email: "jykim@naruint.com", empHp: "01062922952", empLev: 7, state: 1},
    {empNo: 33, empNm: "김은정", empBirth: "", email: "kej@naruint.com", empHp: "01053922270", empLev: 7, state: 1},
    {empNo: 34, empNm: "김현지", empBirth: "", email: "hyun@naruint.com", empHp: "01028953027", empLev: 5, state: 1},
    {empNo: 35, empNm: "문영두", empBirth: "", email: "hajecom@naruint.com", empHp: "01066021362", empLev: 7, state: 1},
    {empNo: 36, empNm: "최진수", empBirth: "", email: "whrhdaud@naruint.com", empHp: "01052105152", empLev: 6, state: 1},
    {empNo: 37, empNm: "정현수", empBirth: "", email: "hensus@naruint.com", empHp: "01024923846", empLev: 2, state: 1},
    {empNo: 38, empNm: "김민정", empBirth: "", email: "minjung@naruint.com", empHp: "01094515229", empLev: 2, state: 1},
    {empNo: 39, empNm: "서창열", empBirth: "19810328", email: "scy@naruint.com", empHp: "01076500711", empLev: 5, state: 1},
    {empNo: 40, empNm: "원한나", empBirth: "", email: "hn2441@naruint.com", empHp: "01023662441", empLev: 3, state: 1},
    {empNo: 41, empNm: "황성연", empBirth: "", email: "hwangsungyun@naruint.com", empHp: "01039741139", empLev: 2, state: 1},
    {empNo: 42, empNm: "정다빈", empBirth: "19900227", email: "dabin22@narui.com", empHp: "01022225254", empLev: 3, state: 1},
    {empNo: 43, empNm: "박상호", empBirth: "", email: "yahogod@naruint.com", empHp: "01089960113", empLev: 6, state: 1},
    {empNo: 44, empNm: "차수정", empBirth: "", email: "iruka0@naver.com", empHp: "01091734603", empLev: "5", state: 1},
    {empNo: 45, empNm: "조은", empBirth: "", email: "choeun@naruint.com", empHp: "01091443011", empLev: 2, state: 1},
    {empNo: 46, empNm: "신은정", empBirth: "", email: "eunjung@naruint.com", empHp: "01099174575", empLev: 4, state: 1},
    {empNo: 47, empNm: "김동건", empBirth: "", email: "dgkim@naruint.com", empHp: "01093522131", empLev: 5, state: 1}
]
const changeVal = ((item : member[],type : string) => {
    for(let i =0;i<item.length;i++){
        if(item[i].state===1){
            item[i].state='재직'
        }else if (item[i].state===2){
            item[i].state='휴직'
        }else{
            item[i].state='퇴직'
        }
    }
    return item
})
const data : member[]= changeVal(DUMY_DATA,'state')
export default data;