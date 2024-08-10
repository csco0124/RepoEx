import{r as v,k as U,h as _,s as G,_ as k,o as F,K as J,a2 as Q,p as X,j as i,q as Z,a3 as E,a4 as A,t as H,m as y,n as L,a5 as ee,a6 as te,b as oe,u as ae,g as se,a7 as re,$ as O,C as ne,T as R}from"./index-98646e71.js";import{d as ie,r as ce}from"./Webauthn-6593b58b.js";import{A as le}from"./AppBarGoBack-afc912f2.js";import{S as ue,F as K}from"./FormControlLabel-9c2bd6e9.js";import{a as de}from"./validateUtil-0f34513f.js";import"./useFormControl-5ac6dc89.js";const pe=v.createContext(),D=pe;function ge(e){return U("MuiGrid",e)}const he=[0,1,2,3,4,5,6,7,8,9,10],fe=["column-reverse","column","row-reverse","row"],me=["nowrap","wrap-reverse","wrap"],B=["auto",!0,1,2,3,4,5,6,7,8,9,10,11,12],W=_("MuiGrid",["root","container","item","zeroMinWidth",...he.map(e=>`spacing-xs-${e}`),...fe.map(e=>`direction-xs-${e}`),...me.map(e=>`wrap-xs-${e}`),...B.map(e=>`grid-xs-${e}`),...B.map(e=>`grid-sm-${e}`),...B.map(e=>`grid-md-${e}`),...B.map(e=>`grid-lg-${e}`),...B.map(e=>`grid-xl-${e}`)]),xe=["className","columns","columnSpacing","component","container","direction","item","rowSpacing","spacing","wrap","zeroMinWidth"];function j(e){const t=parseFloat(e);return`${t}${String(e).replace(String(t),"")||"px"}`}function ke({theme:e,ownerState:t}){let o;return e.breakpoints.keys.reduce((a,s)=>{let r={};if(t[s]&&(o=t[s]),!o)return a;if(o===!0)r={flexBasis:0,flexGrow:1,maxWidth:"100%"};else if(o==="auto")r={flexBasis:"auto",flexGrow:0,flexShrink:0,maxWidth:"none",width:"auto"};else{const c=E({values:t.columns,breakpoints:e.breakpoints.values}),u=typeof c=="object"?c[s]:c;if(u==null)return a;const d=`${Math.round(o/u*1e8)/1e6}%`;let l={};if(t.container&&t.item&&t.columnSpacing!==0){const n=e.spacing(t.columnSpacing);if(n!=="0px"){const h=`calc(${d} + ${j(n)})`;l={flexBasis:h,maxWidth:h}}}r=k({flexBasis:d,flexGrow:0,maxWidth:d},l)}return e.breakpoints.values[s]===0?Object.assign(a,r):a[e.breakpoints.up(s)]=r,a},{})}function ve({theme:e,ownerState:t}){const o=E({values:t.direction,breakpoints:e.breakpoints.values});return A({theme:e},o,a=>{const s={flexDirection:a};return a.indexOf("column")===0&&(s[`& > .${W.item}`]={maxWidth:"none"}),s})}function q({breakpoints:e,values:t}){let o="";Object.keys(t).forEach(s=>{o===""&&t[s]!==0&&(o=s)});const a=Object.keys(e).sort((s,r)=>e[s]-e[r]);return a.slice(0,a.indexOf(o))}function be({theme:e,ownerState:t}){const{container:o,rowSpacing:a}=t;let s={};if(o&&a!==0){const r=E({values:a,breakpoints:e.breakpoints.values});let c;typeof r=="object"&&(c=q({breakpoints:e.breakpoints.values,values:r})),s=A({theme:e},r,(u,d)=>{var l;const n=e.spacing(u);return n!=="0px"?{marginTop:`-${j(n)}`,[`& > .${W.item}`]:{paddingTop:j(n)}}:(l=c)!=null&&l.includes(d)?{}:{marginTop:0,[`& > .${W.item}`]:{paddingTop:0}}})}return s}function we({theme:e,ownerState:t}){const{container:o,columnSpacing:a}=t;let s={};if(o&&a!==0){const r=E({values:a,breakpoints:e.breakpoints.values});let c;typeof r=="object"&&(c=q({breakpoints:e.breakpoints.values,values:r})),s=A({theme:e},r,(u,d)=>{var l;const n=e.spacing(u);return n!=="0px"?{width:`calc(100% + ${j(n)})`,marginLeft:`-${j(n)}`,[`& > .${W.item}`]:{paddingLeft:j(n)}}:(l=c)!=null&&l.includes(d)?{}:{width:"100%",marginLeft:0,[`& > .${W.item}`]:{paddingLeft:0}}})}return s}function $e(e,t,o={}){if(!e||e<=0)return[];if(typeof e=="string"&&!Number.isNaN(Number(e))||typeof e=="number")return[o[`spacing-xs-${String(e)}`]];const a=[];return t.forEach(s=>{const r=e[s];Number(r)>0&&a.push(o[`spacing-${s}-${String(r)}`])}),a}const Se=G("div",{name:"MuiGrid",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:o}=e,{container:a,direction:s,item:r,spacing:c,wrap:u,zeroMinWidth:d,breakpoints:l}=o;let n=[];a&&(n=$e(c,l,t));const h=[];return l.forEach(f=>{const x=o[f];x&&h.push(t[`grid-${f}-${String(x)}`])}),[t.root,a&&t.container,r&&t.item,d&&t.zeroMinWidth,...n,s!=="row"&&t[`direction-xs-${String(s)}`],u!=="wrap"&&t[`wrap-xs-${String(u)}`],...h]}})(({ownerState:e})=>k({boxSizing:"border-box"},e.container&&{display:"flex",flexWrap:"wrap",width:"100%"},e.item&&{margin:0},e.zeroMinWidth&&{minWidth:0},e.wrap!=="wrap"&&{flexWrap:e.wrap}),ve,be,we,ke);function Ce(e,t){if(!e||e<=0)return[];if(typeof e=="string"&&!Number.isNaN(Number(e))||typeof e=="number")return[`spacing-xs-${String(e)}`];const o=[];return t.forEach(a=>{const s=e[a];if(Number(s)>0){const r=`spacing-${a}-${String(s)}`;o.push(r)}}),o}const ye=e=>{const{classes:t,container:o,direction:a,item:s,spacing:r,wrap:c,zeroMinWidth:u,breakpoints:d}=e;let l=[];o&&(l=Ce(r,d));const n=[];d.forEach(f=>{const x=e[f];x&&n.push(`grid-${f}-${String(x)}`)});const h={root:["root",o&&"container",s&&"item",u&&"zeroMinWidth",...l,a!=="row"&&`direction-xs-${String(a)}`,c!=="wrap"&&`wrap-xs-${String(c)}`,...n]};return H(h,ge,t)},je=v.forwardRef(function(t,o){const a=F({props:t,name:"MuiGrid"}),{breakpoints:s}=J(),r=Q(a),{className:c,columns:u,columnSpacing:d,component:l="div",container:n=!1,direction:h="row",item:f=!1,rowSpacing:x,spacing:z=0,wrap:T="wrap",zeroMinWidth:S=!1}=r,b=X(r,xe),C=x||z,p=d||z,g=v.useContext(D),w=n?u||12:g,$={},I=k({},b);s.keys.forEach(M=>{b[M]!=null&&($[M]=b[M],delete I[M])});const V=k({},r,{columns:w,container:n,direction:h,item:f,rowSpacing:C,columnSpacing:p,wrap:T,zeroMinWidth:S,spacing:z},$,{breakpoints:s.keys}),Y=ye(V);return i.jsx(D.Provider,{value:w,children:i.jsx(Se,k({ownerState:V,className:Z(Y.root,c),as:l,ref:o},I))})}),N=je;function ze(e){return U("MuiSwitch",e)}const Be=_("MuiSwitch",["root","edgeStart","edgeEnd","switchBase","colorPrimary","colorSecondary","sizeSmall","sizeMedium","checked","disabled","input","thumb","track"]),m=Be,Ne=["className","color","edge","size","sx"],We=e=>{const{classes:t,edge:o,size:a,color:s,checked:r,disabled:c}=e,u={root:["root",o&&`edge${y(o)}`,`size${y(a)}`],switchBase:["switchBase",`color${y(s)}`,r&&"checked",c&&"disabled"],thumb:["thumb"],track:["track"],input:["input"]},d=H(u,ze,t);return k({},t,d)},Ge=G("span",{name:"MuiSwitch",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:o}=e;return[t.root,o.edge&&t[`edge${y(o.edge)}`],t[`size${y(o.size)}`]]}})(({ownerState:e})=>k({display:"inline-flex",width:34+12*2,height:14+12*2,overflow:"hidden",padding:12,boxSizing:"border-box",position:"relative",flexShrink:0,zIndex:0,verticalAlign:"middle","@media print":{colorAdjust:"exact"}},e.edge==="start"&&{marginLeft:-8},e.edge==="end"&&{marginRight:-8},e.size==="small"&&{width:40,height:24,padding:7,[`& .${m.thumb}`]:{width:16,height:16},[`& .${m.switchBase}`]:{padding:4,[`&.${m.checked}`]:{transform:"translateX(16px)"}}})),Me=G(ue,{name:"MuiSwitch",slot:"SwitchBase",overridesResolver:(e,t)=>{const{ownerState:o}=e;return[t.switchBase,{[`& .${m.input}`]:t.input},o.color!=="default"&&t[`color${y(o.color)}`]]}})(({theme:e})=>({position:"absolute",top:0,left:0,zIndex:1,color:e.vars?e.vars.palette.Switch.defaultColor:`${e.palette.mode==="light"?e.palette.common.white:e.palette.grey[300]}`,transition:e.transitions.create(["left","transform"],{duration:e.transitions.duration.shortest}),[`&.${m.checked}`]:{transform:"translateX(20px)"},[`&.${m.disabled}`]:{color:e.vars?e.vars.palette.Switch.defaultDisabledColor:`${e.palette.mode==="light"?e.palette.grey[100]:e.palette.grey[600]}`},[`&.${m.checked} + .${m.track}`]:{opacity:.5},[`&.${m.disabled} + .${m.track}`]:{opacity:e.vars?e.vars.opacity.switchTrackDisabled:`${e.palette.mode==="light"?.12:.2}`},[`& .${m.input}`]:{left:"-100%",width:"300%"}}),({theme:e,ownerState:t})=>k({"&:hover":{backgroundColor:e.vars?`rgba(${e.vars.palette.action.activeChannel} / ${e.vars.palette.action.hoverOpacity})`:L(e.palette.action.active,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},t.color!=="default"&&{[`&.${m.checked}`]:{color:(e.vars||e).palette[t.color].main,"&:hover":{backgroundColor:e.vars?`rgba(${e.vars.palette[t.color].mainChannel} / ${e.vars.palette.action.hoverOpacity})`:L(e.palette[t.color].main,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}},[`&.${m.disabled}`]:{color:e.vars?e.vars.palette.Switch[`${t.color}DisabledColor`]:`${e.palette.mode==="light"?ee(e.palette[t.color].main,.62):te(e.palette[t.color].main,.55)}`}},[`&.${m.checked} + .${m.track}`]:{backgroundColor:(e.vars||e).palette[t.color].main}})),Oe=G("span",{name:"MuiSwitch",slot:"Track",overridesResolver:(e,t)=>t.track})(({theme:e})=>({height:"100%",width:"100%",borderRadius:14/2,zIndex:-1,transition:e.transitions.create(["opacity","background-color"],{duration:e.transitions.duration.shortest}),backgroundColor:e.vars?e.vars.palette.common.onBackground:`${e.palette.mode==="light"?e.palette.common.black:e.palette.common.white}`,opacity:e.vars?e.vars.opacity.switchTrack:`${e.palette.mode==="light"?.38:.3}`})),Re=G("span",{name:"MuiSwitch",slot:"Thumb",overridesResolver:(e,t)=>t.thumb})(({theme:e})=>({boxShadow:(e.vars||e).shadows[1],backgroundColor:"currentColor",width:20,height:20,borderRadius:"50%"})),Ke=v.forwardRef(function(t,o){const a=F({props:t,name:"MuiSwitch"}),{className:s,color:r="primary",edge:c=!1,size:u="medium",sx:d}=a,l=X(a,Ne),n=k({},a,{color:r,edge:c,size:u}),h=We(n),f=i.jsx(Re,{className:h.thumb,ownerState:n});return i.jsxs(Ge,{className:Z(h.root,s),sx:d,ownerState:n,children:[i.jsx(Me,k({type:"checkbox",icon:f,checkedIcon:f,ref:o,ownerState:n},l,{classes:k({},h,{root:h.switchBase})})),i.jsx(Oe,{className:h.track,ownerState:n})]})}),P=Ke,Le=()=>{const[e,t]=v.useState(),[o,a]=v.useState(!1),[s,r]=v.useState(!1),[c,u]=v.useState(!1),[d,l]=v.useState(!1),{Alert:n}=oe(),h=ae(),f=p=>{p=="kakao"&&(location.href="/oauth2/authorization/kakao"),p=="naver"&&(location.href="/oauth2/authorization/naver"),p=="google"&&(location.href="/oauth2/authorization/google"),p=="webauthn"&&O.get("/private/api/common/userInfo").then(g=>{const w=g.data.data;localStorage.setItem("email",w.email),ce(n,e,()=>{l(!0)})}).catch(g=>{console.log(g)})},x={kakaoChange:()=>{o?S("kakao",()=>{a(!1)}):f("kakao")},naverChange:()=>{s?S("naver",()=>{r(!1)}):f("naver")},googleChange:()=>{c?S("google",()=>{u(!1)}):f("google")},webauthnChange:()=>{d?S("webauthn",()=>{l(!1)}):f("webauthn")}};v.useEffect(()=>{z(),T()},[]);const z=()=>{se("error")=="USERALREADYEXIST"&&n({message:"해당 소셜 계정은 이미 등록되어 있습니다.",onClose:()=>{h(re("/social-list"))}})},T=()=>{O.get("/private/api/social/key").then(p=>{const g=p.data.data;p.data.error=="OK"&&(console.log(g.kakaoKey),console.log(de(g.kakaoKey)),g.kakaoKey&&a(!0),g.naverKey&&r(!0),g.googleKey&&u(!0))}).catch(p=>{console.log(p)}),O.get("/public/api/profile").then(p=>{const g=p.data.data;p.data.error=="OK"&&(t({username:g.username,userHandle:g.userHandle,email:g.email}),g.authenticators.length>0&&l(!0))}).catch(p=>{console.log(p)})},S=async(p,g)=>{if(p!="webauthn"){const w=`/private/api/social/key/${p}`;O.put(w).then(()=>{g()}).catch($=>{console.log($)})}else{const w=await ie(e);let $="";w?$="간편인증 삭제에 성공하였습니다.":$="간편인증 삭제에 실패하였습니다.",n({message:$,onClose:()=>{g()}})}},b={margin:0,height:60,width:"90%",paddingLeft:"12px",borderBottom:"1px solid #bbb"},C={width:"100%",textAlign:"left"};return i.jsxs(i.Fragment,{children:[i.jsx(le,{}),i.jsx(ne,{style:{height:"100%",textAlign:"center",boxShadow:"none"},children:i.jsxs(N,{children:[i.jsx(N,{children:i.jsx(K,{control:i.jsx(P,{checked:o,onChange:()=>{x.kakaoChange()}}),label:i.jsx(R,{sx:C,children:"카카오 로그인"}),labelPlacement:"start",sx:b})}),i.jsx(N,{children:i.jsx(K,{control:i.jsx(P,{checked:s,onChange:()=>{x.naverChange()}}),label:i.jsx(R,{sx:C,children:"네이버 로그인"}),labelPlacement:"start",sx:b})}),i.jsx(N,{children:i.jsx(K,{control:i.jsx(P,{checked:c,onChange:()=>{x.googleChange()}}),label:i.jsx(R,{sx:C,children:"구글 로그인"}),labelPlacement:"start",sx:b})}),i.jsx(N,{children:i.jsx(K,{control:i.jsx(P,{checked:d,onChange:()=>{x.webauthnChange()}}),label:i.jsx(R,{sx:C,children:"간편인증 로그인"}),labelPlacement:"start",sx:b})})]})})]})};export{Le as default};
