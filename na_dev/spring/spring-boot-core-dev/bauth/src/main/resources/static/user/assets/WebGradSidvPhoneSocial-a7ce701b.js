import{h as R,k as ne,s as re,v as oe,l as ie,_ as S,n as M,r as n,o as le,p as ce,w as de,x as ue,j as t,q as A,t as pe,u as ge,b as me,a as fe,y as xe,R as ve,C as he,d as y,T as F,B as K,z as Ce,$ as D}from"./index-98646e71.js";import{A as be}from"./AppBarGoBack-afc912f2.js";import{a as ye}from"./validateUtil-0f34513f.js";import{a as Ie}from"./Webauthn-6593b58b.js";import{C as G}from"./CardContent-acb39d1a.js";import{L as z,T as I,S as je}from"./TextField-214db1cb.js";import"./OutlinedInput-0b5b8429.js";import"./useFormControl-5ac6dc89.js";const Se=R("MuiDivider",["root","absolute","fullWidth","inset","middle","flexItem","light","vertical","withChildren","withChildrenVertical","textAlignRight","textAlignLeft","wrapper","wrapperVertical"]),U=Se,$e=R("MuiListItemIcon",["root","alignItemsFlexStart"]),H=$e,Te=R("MuiListItemText",["root","multiline","dense","inset","primary","secondary"]),_=Te;function we(e){return ne("MuiMenuItem",e)}const ke=R("MuiMenuItem",["root","focusVisible","dense","disabled","divider","gutters","selected"]),j=ke,Me=["autoFocus","component","dense","divider","disableGutters","focusVisibleClassName","role","tabIndex","className"],Re=(e,s)=>{const{ownerState:o}=e;return[s.root,o.dense&&s.dense,o.divider&&s.divider,!o.disableGutters&&s.gutters]},Be=e=>{const{disabled:s,dense:o,divider:r,disableGutters:i,selected:c,classes:u}=e,l=pe({root:["root",o&&"dense",s&&"disabled",!i&&"gutters",r&&"divider",c&&"selected"]},we,u);return S({},u,l)},Oe=re(oe,{shouldForwardProp:e=>ie(e)||e==="classes",name:"MuiMenuItem",slot:"Root",overridesResolver:Re})(({theme:e,ownerState:s})=>S({},e.typography.body1,{display:"flex",justifyContent:"flex-start",alignItems:"center",position:"relative",textDecoration:"none",minHeight:48,paddingTop:6,paddingBottom:6,boxSizing:"border-box",whiteSpace:"nowrap"},!s.disableGutters&&{paddingLeft:16,paddingRight:16},s.divider&&{borderBottom:`1px solid ${(e.vars||e).palette.divider}`,backgroundClip:"padding-box"},{"&:hover":{textDecoration:"none",backgroundColor:(e.vars||e).palette.action.hover,"@media (hover: none)":{backgroundColor:"transparent"}},[`&.${j.selected}`]:{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / ${e.vars.palette.action.selectedOpacity})`:M(e.palette.primary.main,e.palette.action.selectedOpacity),[`&.${j.focusVisible}`]:{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.focusOpacity}))`:M(e.palette.primary.main,e.palette.action.selectedOpacity+e.palette.action.focusOpacity)}},[`&.${j.selected}:hover`]:{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.hoverOpacity}))`:M(e.palette.primary.main,e.palette.action.selectedOpacity+e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / ${e.vars.palette.action.selectedOpacity})`:M(e.palette.primary.main,e.palette.action.selectedOpacity)}},[`&.${j.focusVisible}`]:{backgroundColor:(e.vars||e).palette.action.focus},[`&.${j.disabled}`]:{opacity:(e.vars||e).palette.action.disabledOpacity},[`& + .${U.root}`]:{marginTop:e.spacing(1),marginBottom:e.spacing(1)},[`& + .${U.inset}`]:{marginLeft:52},[`& .${_.root}`]:{marginTop:0,marginBottom:0},[`& .${_.inset}`]:{paddingLeft:36},[`& .${H.root}`]:{minWidth:36}},!s.dense&&{[e.breakpoints.up("sm")]:{minHeight:"auto"}},s.dense&&S({minHeight:32,paddingTop:4,paddingBottom:4},e.typography.body2,{[`& .${H.root} svg`]:{fontSize:"1.25rem"}}))),Ve=n.forwardRef(function(s,o){const r=le({props:s,name:"MuiMenuItem"}),{autoFocus:i=!1,component:c="li",dense:u=!1,divider:v=!1,disableGutters:l=!1,focusVisibleClassName:h,role:B="menuitem",tabIndex:g,className:O}=r,m=ce(r,Me),f=n.useContext(z),$=n.useMemo(()=>({dense:u||f.dense||!1,disableGutters:l}),[f.dense,u,l]),C=n.useRef(null);de(()=>{i&&C.current&&C.current.focus()},[i]);const T=S({},r,{dense:$.dense,divider:v,disableGutters:l}),b=Be(r),w=ue(C,o);let k;return r.disabled||(k=g!==void 0?g:-1),t.jsx(z.Provider,{value:$,children:t.jsx(Oe,S({ref:w,role:B,tabIndex:k,component:c,focusVisibleClassName:A(b.focusVisible,h),className:A(b.root,O)},m,{ownerState:T,classes:b}))})}),L=Ve,De=()=>{const e=ge(),[s,o]=n.useState(""),[r,i]=n.useState(!1),[c,u]=n.useState(""),[v,l]=n.useState(!1),[h,B]=n.useState(""),[g,O]=n.useState(""),[m,f]=n.useState(!1),[$,C]=n.useState("KT"),[T,b]=n.useState(""),[w,k]=n.useState(""),[J,q]=n.useState("확인"),[Q,X]=n.useState(!1),[W,E]=n.useState(!1);JSON.parse(sessionStorage.getItem("identifier")||"{}");const{Alert:Y}=me(),{Confirm:N}=fe();JSON.parse(sessionStorage.getItem("identifier")||"{}");const Z=/^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/,{state:P}=xe();let x="social";ye(P)&&(x=P);const ee=()=>{if(!Z.test(s)){i(!0);return}if(c==null||c==""){l(!0);return}if(h==null||h==""||h.length<6){f(!0);return}if(g==null||g==""||g.length<1){f(!0);return}te()},te=()=>{const a=new FormData;a.append("phone",s),a.append("nickname",c),a.append("verificationCode",w),D.post(`/auth/api/${x}/webgradsidvphone`,a).then(p=>{p.data.error==="OK"?(q("재요청"),i(!1),l(!1),f(!1),X(!0),b(p.data.data),console.log(p)):(alert("오류발생"),l(!0),i(!0))})},ae=()=>{const a=new FormData;a.append("id",T),a.append("phone",s),a.append("nickname",c),a.append("verificationCode",w),D.post(`/auth/api/${x}/webgradsidvverify`,a).then(p=>{if(p.data.error==="OK"){i(!1),E(!1);const d=p.data.data;if(d.userId==null){const V={id:d.id,secretKey:d.secretKey,registType:x};N({message:"계정을 찾을 수 없습니다. 회원가입을 진행하시겠습니까?",yesText:"예",noText:"아니오",onConfirm:()=>{e("/user/auth/webcreateaccountsocial",{state:V})},onCancel:()=>{N({message:"로그인 화면으로 이동합니다.",yesText:"예",noText:"아니오",onConfirm:()=>e("/user/auth/identifier")})}})}else if(x=="social"&&(location.href="/oauth2/authorization/"+d.socialName),x=="webauthn"){const V={alert:Y,userId:d.userId,callbackFn:()=>{e("/user/auth")},verifySocialId:T,secretKey:d.secretKey};Ie(V)}}else alert("오류발생"),E(!0)})},se=(a,p)=>{const d=a.target.value;C(d)};return t.jsxs(ve.Fragment,{children:[t.jsx(be,{}),t.jsxs(he,{children:[t.jsx(G,{children:t.jsxs(y,{sx:{minWidth:275,maxWidth:"75vw",textAlign:"center",margin:"auto",border:"none"},children:[t.jsxs(F,{variant:"h5",color:"inherit",sx:{textAlign:"left"},gutterBottom:!0,children:["회원 여부를 확인하기 위해 ",t.jsx("br",{}),"휴대폰 인증을 진행해 주세요."]}),t.jsx(I,{fullWidth:!0,label:"이름",variant:"outlined",color:"warning",margin:"normal",type:"text",onChange:a=>u(a.target.value),error:v,helperText:v?"이름을 확인해주세요.":""}),t.jsxs(y,{sx:{width:1,display:"grid",gridTemplateColumns:"1fr 20px 1fr",verticalAlign:"middle"},children:[t.jsx(I,{label:"주민등록번호",variant:"outlined",color:"warning",margin:"normal",inputProps:{maxLength:6},type:"text",onChange:a=>B(a.target.value),error:m,helperText:m?"주민등록번호를 확인해주세요.":""}),t.jsx(y,{sx:{position:"relative"},children:t.jsx(F,{sx:{position:"absolute",left:"50%",top:"50%",transform:"translate(-50%, -50%)"},children:"-"})}),t.jsx(I,{label:"뒷자리",variant:"outlined",color:"warning",margin:"normal",inputProps:{maxLength:1},type:"text",onChange:a=>O(a.target.value),error:m,helperText:m?"주민등록번호를 확인해주세요.":""})]}),t.jsx(y,{children:t.jsxs(je,{fullWidth:!0,id:"telecomSelect",name:"telecomSelect",onChange:se,value:$,label:"통신사",children:[t.jsx(L,{value:"KT",children:"KT"},"1"),t.jsx(L,{value:"SK",children:"SK"},"2"),t.jsx(L,{value:"LG",children:"LG U+"},"3")]})}),t.jsx(I,{fullWidth:!0,label:"휴대폰번호",variant:"outlined",color:"warning",margin:"normal",type:"tel",onChange:a=>o(a.target.value),error:r,helperText:r?"휴대폰번호를 확인해주세요.":""}),t.jsx(K,{size:"large",onClick:ee,color:"warning",variant:"outlined",children:t.jsx("strong",{children:J})})]})}),Q&&t.jsx(G,{sx:{minWidth:275,maxWidth:"75vw",textAlign:"center",margin:"auto",border:"none"},children:t.jsxs(y,{children:[t.jsx(I,{fullWidth:!0,label:"인증번호",variant:"outlined",color:"warning",margin:"normal",type:"text",onChange:a=>k(a.target.value),error:W,helperText:W?"인증번호를 확인해주세요.":""}),t.jsx(Ce,{children:t.jsx(K,{fullWidth:!0,size:"large",onClick:()=>ae(),color:"warning",variant:"contained",children:t.jsx("strong",{children:"확인"})})})]})})]})]})};export{De as default};