import{u as A,r as a,b as N,j as t,R as V,d as l,T as D,B as u,$ as h,c as F}from"./index-98646e71.js";import{A as I}from"./AppBarGoBack-afc912f2.js";import{c as W,t as k,a as g}from"./authStyle-a2596f0d.js";import{C as H}from"./CardContent-acb39d1a.js";import{T as x}from"./TextField-214db1cb.js";import"./OutlinedInput-0b5b8429.js";import"./useFormControl-5ac6dc89.js";const Z=()=>{const m=A(),[n,v]=a.useState(""),[d,o]=a.useState(!1),[c,C]=a.useState(""),[j,S]=a.useState("확인"),s=a.useRef(""),[y,b]=a.useState(!1),[p,f]=a.useState(!1),E=JSON.parse(sessionStorage.getItem("identifier")||"{}");JSON.parse(sessionStorage.getItem("identifier")||"{}");const B=/^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/,{Alert:w,AlertError:R}=N(),i=e=>R(e),O=()=>{B.test(n)?(s.current=E.email,P()):o(!0)},P=()=>{const e=new FormData;e.append("phone",n),e.append("verificationCode",c),e.append("email",s.current),h.post("/public/api/webgradsidvphone",e).then(r=>{r.data.error==="PHONEUNAUTHORIZED"?(i(r.data.message),o(!0)):r.data.error==="OK"?(S("재요청"),o(!1),b(!0),console.log(r.data),sessionStorage.setItem("identifier",JSON.stringify(r.data.data))):(i("오류발생"),o(!0))})},T=()=>{const e=new FormData;e.append("phone",n),e.append("verificationCode",c),e.append("email",s.current),h.post("/public/api/webgradsidvverify",e).then(r=>{r.data.error==="OK"?(o(!1),f(!1),w({message:"회원가입이 완료되었습니다.",onClose:()=>m(F("/identifier"))})):(i("오류발생"),f(!0))})};return t.jsxs(V.Fragment,{children:[t.jsx(I,{}),t.jsx(l,{sx:W,children:t.jsxs(H,{children:[t.jsxs(D,{variant:"h5",color:"inherit",sx:k,gutterBottom:!0,children:["휴대폰 인증을",t.jsx("br",{}),"진행해 주세요."]}),t.jsxs(l,{sx:{display:"flex"},children:[t.jsx(x,{fullWidth:!0,label:"휴대폰번호",variant:"outlined",color:"warning",type:"tel",onChange:e=>v(e.target.value),error:d,helperText:d?"휴대폰번호를 확인해주세요.":"",sx:{flex:1}}),t.jsx(u,{size:"large",onClick:O,color:"warning",variant:"outlined",sx:g,children:t.jsx("strong",{children:j})})]}),y&&t.jsxs(l,{children:[t.jsx(x,{fullWidth:!0,label:"인증번호",variant:"outlined",color:"warning",margin:"normal",type:"text",onChange:e=>C(e.target.value),error:p,helperText:p?"인증번호를 확인해주세요.":""}),t.jsx(u,{fullWidth:!0,sx:g,size:"large",onClick:()=>T(),color:"warning",variant:"contained",children:t.jsx("strong",{children:"확인"})})]})]})})]})};export{Z as default};
