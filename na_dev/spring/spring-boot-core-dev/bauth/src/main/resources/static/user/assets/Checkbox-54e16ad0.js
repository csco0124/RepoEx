import{f as h,j as c,h as j,k as P,s as B,l as S,m as v,_ as s,n as g,r as d,o as M,p as R,q as _,t as H}from"./index-98646e71.js";import{S as E}from"./FormControlLabel-9c2bd6e9.js";const O=h(c.jsx("path",{d:"M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"}),"CheckBoxOutlineBlank"),U=h(c.jsx("path",{d:"M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"}),"CheckBox"),V=h(c.jsx("path",{d:"M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z"}),"IndeterminateCheckBox");function L(o){return P("MuiCheckbox",o)}const N=j("MuiCheckbox",["root","checked","disabled","indeterminate","colorPrimary","colorSecondary"]),p=N,w=["checkedIcon","color","icon","indeterminate","indeterminateIcon","inputProps","size","className"],F=o=>{const{classes:e,indeterminate:t,color:a}=o,r={root:["root",t&&"indeterminate",`color${v(a)}`]},n=H(r,L,e);return s({},e,n)},q=B(E,{shouldForwardProp:o=>S(o)||o==="classes",name:"MuiCheckbox",slot:"Root",overridesResolver:(o,e)=>{const{ownerState:t}=o;return[e.root,t.indeterminate&&e.indeterminate,t.color!=="default"&&e[`color${v(t.color)}`]]}})(({theme:o,ownerState:e})=>s({color:(o.vars||o).palette.text.secondary},!e.disableRipple&&{"&:hover":{backgroundColor:o.vars?`rgba(${e.color==="default"?o.vars.palette.action.activeChannel:o.vars.palette.primary.mainChannel} / ${o.vars.palette.action.hoverOpacity})`:g(e.color==="default"?o.palette.action.active:o.palette[e.color].main,o.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},e.color!=="default"&&{[`&.${p.checked}, &.${p.indeterminate}`]:{color:(o.vars||o).palette[e.color].main},[`&.${p.disabled}`]:{color:(o.vars||o).palette.action.disabled}})),T=c.jsx(U,{}),W=c.jsx(O,{}),A=c.jsx(V,{}),D=d.forwardRef(function(e,t){var a,r;const n=M({props:e,name:"MuiCheckbox"}),{checkedIcon:f=T,color:b="primary",icon:I=W,indeterminate:i=!1,indeterminateIcon:u=A,inputProps:z,size:l="medium",className:$}=n,y=R(n,w),m=i?u:I,x=i?u:f,k=s({},n,{color:b,indeterminate:i,size:l}),C=F(k);return c.jsx(q,s({type:"checkbox",inputProps:s({"data-indeterminate":i},z),icon:d.cloneElement(m,{fontSize:(a=m.props.fontSize)!=null?a:l}),checkedIcon:d.cloneElement(x,{fontSize:(r=x.props.fontSize)!=null?r:l}),ownerState:k,ref:t,className:_(C.root,$)},y,{classes:C}))}),K=D;export{K as C};
