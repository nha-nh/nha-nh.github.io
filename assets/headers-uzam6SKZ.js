import{f as w,H as h,g as c,d as z,h as H,j as $,K as l,d7 as T,M as R,n as f,R as a}from"./index-DeO2nFEY.js";const N=w("h",`
 font-size: var(--n-font-size);
 font-weight: var(--n-font-weight);
 margin: var(--n-margin);
 transition: color .3s var(--n-bezier);
 color: var(--n-text-color);
`,[h("&:first-child",{marginTop:0}),c("prefix-bar",{position:"relative",paddingLeft:"var(--n-prefix-width)"},[c("align-text",{paddingLeft:0},[h("&::before",{left:"calc(-1 * var(--n-prefix-width))"})]),h("&::before",`
 content: "";
 width: var(--n-bar-width);
 border-radius: calc(var(--n-bar-width) / 2);
 transition: background-color .3s var(--n-bezier);
 left: 0;
 top: 0;
 bottom: 0;
 position: absolute;
 `),h("&::before",{backgroundColor:"var(--n-bar-color)"})])]),B=Object.assign(Object.assign({},l.props),{type:{type:String,default:"default"},prefix:String,alignText:Boolean}),o=t=>z({name:`H${t}`,props:B,setup(e){const{mergedClsPrefixRef:i,inlineThemeDisabled:s}=$(e),n=l("Typography","-h",N,T,e,i),d=f(()=>{const{type:g}=e,{common:{cubicBezierEaseInOut:b},self:{headerFontWeight:m,headerTextColor:p,[a("headerPrefixWidth",t)]:u,[a("headerFontSize",t)]:x,[a("headerMargin",t)]:C,[a("headerBarWidth",t)]:v,[a("headerBarColor",g)]:y}}=n.value;return{"--n-bezier":b,"--n-font-size":x,"--n-margin":C,"--n-bar-color":y,"--n-bar-width":v,"--n-font-weight":m,"--n-text-color":p,"--n-prefix-width":u}}),r=s?R(`h${t}`,f(()=>e.type[0]),d,e):void 0;return{mergedClsPrefix:i,cssVars:s?void 0:d,themeClass:r==null?void 0:r.themeClass,onRender:r==null?void 0:r.onRender}},render(){var e;const{prefix:i,alignText:s,mergedClsPrefix:n,cssVars:d,$slots:r}=this;return(e=this.onRender)===null||e===void 0||e.call(this),H(`h${t}`,{class:[`${n}-h`,`${n}-h${t}`,this.themeClass,{[`${n}-h--prefix-bar`]:i,[`${n}-h--align-text`]:s}],style:d},r)}}),W=o("2"),S=o("3"),j=o("4"),L=o("5"),M=o("6");export{L as N,W as a,S as b,M as c,j as d};
