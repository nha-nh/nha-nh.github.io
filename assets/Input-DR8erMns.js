import{d as fe,h as a,C as ln,f as g,I as l,g as P,G as L,H as S,z as de,p as y,v as sn,aK as un,n as E,bq as Z,S as cn,P as dn,aJ as fn,A as ue,j as hn,K as Re,cf as vn,df as pn,k as gn,aO as bn,cc as mn,x as me,l as xn,bD as yn,aP as xe,aj as wn,M as Cn,aW as ye,E as we,aU as Ce,a_ as w,aS as ze,y as Se,R as ce,cS as zn,F as Sn}from"./index-CAjjki7w.js";import{a as Ae,N as An}from"./Suffix-DgcpLFSM.js";import{u as _n}from"./use-locale-CPMJETGX.js";import{E as Rn}from"./Eye-DqowMVSr.js";const Fn=fe({name:"EyeOff",render(){return a("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512"},a("path",{d:"M432 448a15.92 15.92 0 0 1-11.31-4.69l-352-352a16 16 0 0 1 22.62-22.62l352 352A16 16 0 0 1 432 448z",fill:"currentColor"}),a("path",{d:"M255.66 384c-41.49 0-81.5-12.28-118.92-36.5c-34.07-22-64.74-53.51-88.7-91v-.08c19.94-28.57 41.78-52.73 65.24-72.21a2 2 0 0 0 .14-2.94L93.5 161.38a2 2 0 0 0-2.71-.12c-24.92 21-48.05 46.76-69.08 76.92a31.92 31.92 0 0 0-.64 35.54c26.41 41.33 60.4 76.14 98.28 100.65C162 402 207.9 416 255.66 416a239.13 239.13 0 0 0 75.8-12.58a2 2 0 0 0 .77-3.31l-21.58-21.58a4 4 0 0 0-3.83-1a204.8 204.8 0 0 1-51.16 6.47z",fill:"currentColor"}),a("path",{d:"M490.84 238.6c-26.46-40.92-60.79-75.68-99.27-100.53C349 110.55 302 96 255.66 96a227.34 227.34 0 0 0-74.89 12.83a2 2 0 0 0-.75 3.31l21.55 21.55a4 4 0 0 0 3.88 1a192.82 192.82 0 0 1 50.21-6.69c40.69 0 80.58 12.43 118.55 37c34.71 22.4 65.74 53.88 89.76 91a.13.13 0 0 1 0 .16a310.72 310.72 0 0 1-64.12 72.73a2 2 0 0 0-.15 2.95l19.9 19.89a2 2 0 0 0 2.7.13a343.49 343.49 0 0 0 68.64-78.48a32.2 32.2 0 0 0-.1-34.78z",fill:"currentColor"}),a("path",{d:"M256 160a95.88 95.88 0 0 0-21.37 2.4a2 2 0 0 0-1 3.38l112.59 112.56a2 2 0 0 0 3.38-1A96 96 0 0 0 256 160z",fill:"currentColor"}),a("path",{d:"M165.78 233.66a2 2 0 0 0-3.38 1a96 96 0 0 0 115 115a2 2 0 0 0 1-3.38z",fill:"currentColor"}))}}),Fe=ln("n-input"),Pn=g("input",`
 max-width: 100%;
 cursor: text;
 line-height: 1.5;
 z-index: auto;
 outline: none;
 box-sizing: border-box;
 position: relative;
 display: inline-flex;
 border-radius: var(--n-border-radius);
 background-color: var(--n-color);
 transition: background-color .3s var(--n-bezier);
 font-size: var(--n-font-size);
 font-weight: var(--n-font-weight);
 --n-padding-vertical: calc((var(--n-height) - 1.5 * var(--n-font-size)) / 2);
`,[l("input, textarea",`
 overflow: hidden;
 flex-grow: 1;
 position: relative;
 `),l("input-el, textarea-el, input-mirror, textarea-mirror, separator, placeholder",`
 box-sizing: border-box;
 font-size: inherit;
 line-height: 1.5;
 font-family: inherit;
 border: none;
 outline: none;
 background-color: #0000;
 text-align: inherit;
 transition:
 -webkit-text-fill-color .3s var(--n-bezier),
 caret-color .3s var(--n-bezier),
 color .3s var(--n-bezier),
 text-decoration-color .3s var(--n-bezier);
 `),l("input-el, textarea-el",`
 -webkit-appearance: none;
 scrollbar-width: none;
 width: 100%;
 min-width: 0;
 text-decoration-color: var(--n-text-decoration-color);
 color: var(--n-text-color);
 caret-color: var(--n-caret-color);
 background-color: transparent;
 `,[S("&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb",`
 width: 0;
 height: 0;
 display: none;
 `),S("&::placeholder",`
 color: #0000;
 -webkit-text-fill-color: transparent !important;
 `),S("&:-webkit-autofill ~",[l("placeholder","display: none;")])]),P("round",[L("textarea","border-radius: calc(var(--n-height) / 2);")]),l("placeholder",`
 pointer-events: none;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 overflow: hidden;
 color: var(--n-placeholder-color);
 `,[S("span",`
 width: 100%;
 display: inline-block;
 `)]),P("textarea",[l("placeholder","overflow: visible;")]),L("autosize","width: 100%;"),P("autosize",[l("textarea-el, input-el",`
 position: absolute;
 top: 0;
 left: 0;
 height: 100%;
 `)]),g("input-wrapper",`
 overflow: hidden;
 display: inline-flex;
 flex-grow: 1;
 position: relative;
 padding-left: var(--n-padding-left);
 padding-right: var(--n-padding-right);
 `),l("input-mirror",`
 padding: 0;
 height: var(--n-height);
 line-height: var(--n-height);
 overflow: hidden;
 visibility: hidden;
 position: static;
 white-space: pre;
 pointer-events: none;
 `),l("input-el",`
 padding: 0;
 height: var(--n-height);
 line-height: var(--n-height);
 `,[S("&[type=password]::-ms-reveal","display: none;"),S("+",[l("placeholder",`
 display: flex;
 align-items: center; 
 `)])]),L("textarea",[l("placeholder","white-space: nowrap;")]),l("eye",`
 display: flex;
 align-items: center;
 justify-content: center;
 transition: color .3s var(--n-bezier);
 `),P("textarea","width: 100%;",[g("input-word-count",`
 position: absolute;
 right: var(--n-padding-right);
 bottom: var(--n-padding-vertical);
 `),P("resizable",[g("input-wrapper",`
 resize: vertical;
 min-height: var(--n-height);
 `)]),l("textarea-el, textarea-mirror, placeholder",`
 height: 100%;
 padding-left: 0;
 padding-right: 0;
 padding-top: var(--n-padding-vertical);
 padding-bottom: var(--n-padding-vertical);
 word-break: break-word;
 display: inline-block;
 vertical-align: bottom;
 box-sizing: border-box;
 line-height: var(--n-line-height-textarea);
 margin: 0;
 resize: none;
 white-space: pre-wrap;
 scroll-padding-block-end: var(--n-padding-vertical);
 `),l("textarea-mirror",`
 width: 100%;
 pointer-events: none;
 overflow: hidden;
 visibility: hidden;
 position: static;
 white-space: pre-wrap;
 overflow-wrap: break-word;
 `)]),P("pair",[l("input-el, placeholder","text-align: center;"),l("separator",`
 display: flex;
 align-items: center;
 transition: color .3s var(--n-bezier);
 color: var(--n-text-color);
 white-space: nowrap;
 `,[g("icon",`
 color: var(--n-icon-color);
 `),g("base-icon",`
 color: var(--n-icon-color);
 `)])]),P("disabled",`
 cursor: not-allowed;
 background-color: var(--n-color-disabled);
 `,[l("border","border: var(--n-border-disabled);"),l("input-el, textarea-el",`
 cursor: not-allowed;
 color: var(--n-text-color-disabled);
 text-decoration-color: var(--n-text-color-disabled);
 `),l("placeholder","color: var(--n-placeholder-color-disabled);"),l("separator","color: var(--n-text-color-disabled);",[g("icon",`
 color: var(--n-icon-color-disabled);
 `),g("base-icon",`
 color: var(--n-icon-color-disabled);
 `)]),g("input-word-count",`
 color: var(--n-count-text-color-disabled);
 `),l("suffix, prefix","color: var(--n-text-color-disabled);",[g("icon",`
 color: var(--n-icon-color-disabled);
 `),g("internal-icon",`
 color: var(--n-icon-color-disabled);
 `)])]),L("disabled",[l("eye",`
 color: var(--n-icon-color);
 cursor: pointer;
 `,[S("&:hover",`
 color: var(--n-icon-color-hover);
 `),S("&:active",`
 color: var(--n-icon-color-pressed);
 `)]),S("&:hover",[l("state-border","border: var(--n-border-hover);")]),P("focus","background-color: var(--n-color-focus);",[l("state-border",`
 border: var(--n-border-focus);
 box-shadow: var(--n-box-shadow-focus);
 `)])]),l("border, state-border",`
 box-sizing: border-box;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 pointer-events: none;
 border-radius: inherit;
 border: var(--n-border);
 transition:
 box-shadow .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `),l("state-border",`
 border-color: #0000;
 z-index: 1;
 `),l("prefix","margin-right: 4px;"),l("suffix",`
 margin-left: 4px;
 `),l("suffix, prefix",`
 transition: color .3s var(--n-bezier);
 flex-wrap: nowrap;
 flex-shrink: 0;
 line-height: var(--n-height);
 white-space: nowrap;
 display: inline-flex;
 align-items: center;
 justify-content: center;
 color: var(--n-suffix-text-color);
 `,[g("base-loading",`
 font-size: var(--n-icon-size);
 margin: 0 2px;
 color: var(--n-loading-color);
 `),g("base-clear",`
 font-size: var(--n-icon-size);
 `,[l("placeholder",[g("base-icon",`
 transition: color .3s var(--n-bezier);
 color: var(--n-icon-color);
 font-size: var(--n-icon-size);
 `)])]),S(">",[g("icon",`
 transition: color .3s var(--n-bezier);
 color: var(--n-icon-color);
 font-size: var(--n-icon-size);
 `)]),g("base-icon",`
 font-size: var(--n-icon-size);
 `)]),g("input-word-count",`
 pointer-events: none;
 line-height: 1.5;
 font-size: .85em;
 color: var(--n-count-text-color);
 transition: color .3s var(--n-bezier);
 margin-left: 4px;
 font-variant: tabular-nums;
 `),["warning","error"].map(n=>P(`${n}-status`,[L("disabled",[g("base-loading",`
 color: var(--n-loading-color-${n})
 `),l("input-el, textarea-el",`
 caret-color: var(--n-caret-color-${n});
 `),l("state-border",`
 border: var(--n-border-${n});
 `),S("&:hover",[l("state-border",`
 border: var(--n-border-hover-${n});
 `)]),S("&:focus",`
 background-color: var(--n-color-focus-${n});
 `,[l("state-border",`
 box-shadow: var(--n-box-shadow-focus-${n});
 border: var(--n-border-focus-${n});
 `)]),P("focus",`
 background-color: var(--n-color-focus-${n});
 `,[l("state-border",`
 box-shadow: var(--n-box-shadow-focus-${n});
 border: var(--n-border-focus-${n});
 `)])])]))]),Bn=g("input",[P("disabled",[l("input-el, textarea-el",`
 -webkit-text-fill-color: var(--n-text-color-disabled);
 `)])]);function En(n){let b=0;for(const A of n)b++;return b}function ee(n){return n===""||n==null}function $n(n){const b=y(null);function A(){const{value:m}=n;if(!(m!=null&&m.focus)){_();return}const{selectionStart:c,selectionEnd:r,value:p}=m;if(c==null||r==null){_();return}b.value={start:c,end:r,beforeText:p.slice(0,c),afterText:p.slice(r)}}function B(){var m;const{value:c}=b,{value:r}=n;if(!c||!r)return;const{value:p}=r,{start:T,beforeText:f,afterText:C}=c;let z=p.length;if(p.endsWith(C))z=p.length-C.length;else if(p.startsWith(f))z=f.length;else{const v=f[T-1],i=p.indexOf(v,T-1);i!==-1&&(z=i+1)}(m=r.setSelectionRange)===null||m===void 0||m.call(r,z,z)}function _(){b.value=null}return de(n,_),{recordCursor:A,restoreCursor:B}}const _e=fe({name:"InputWordCount",setup(n,{slots:b}){const{mergedValueRef:A,maxlengthRef:B,mergedClsPrefixRef:_,countGraphemesRef:m}=sn(Fe),c=E(()=>{const{value:r}=A;return r===null||Array.isArray(r)?0:(m.value||En)(r)});return()=>{const{value:r}=B,{value:p}=A;return a("span",{class:`${_.value}-input-word-count`},un(b.default,{value:p===null||Array.isArray(p)?"":p},()=>[r===void 0?c.value:`${c.value} / ${r}`]))}}}),Tn=Object.assign(Object.assign({},Re.props),{bordered:{type:Boolean,default:void 0},type:{type:String,default:"text"},placeholder:[Array,String],defaultValue:{type:[String,Array],default:null},value:[String,Array],disabled:{type:Boolean,default:void 0},size:String,rows:{type:[Number,String],default:3},round:Boolean,minlength:[String,Number],maxlength:[String,Number],clearable:Boolean,autosize:{type:[Boolean,Object],default:!1},pair:Boolean,separator:String,readonly:{type:[String,Boolean],default:!1},passivelyActivated:Boolean,showPasswordOn:String,stateful:{type:Boolean,default:!0},autofocus:Boolean,inputProps:Object,resizable:{type:Boolean,default:!0},showCount:Boolean,loading:{type:Boolean,default:void 0},allowInput:Function,renderCount:Function,onMousedown:Function,onKeydown:Function,onKeyup:[Function,Array],onInput:[Function,Array],onFocus:[Function,Array],onBlur:[Function,Array],onClick:[Function,Array],onChange:[Function,Array],onClear:[Function,Array],countGraphemes:Function,status:String,"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],textDecoration:[String,Array],attrSize:{type:Number,default:20},onInputBlur:[Function,Array],onInputFocus:[Function,Array],onDeactivate:[Function,Array],onActivate:[Function,Array],onWrapperFocus:[Function,Array],onWrapperBlur:[Function,Array],internalDeactivateOnEnter:Boolean,internalForceFocus:Boolean,internalLoadingBeforeSuffix:{type:Boolean,default:!0},showPasswordToggle:Boolean}),Wn=fe({name:"Input",props:Tn,slots:Object,setup(n){const{mergedClsPrefixRef:b,mergedBorderedRef:A,inlineThemeDisabled:B,mergedRtlRef:_}=hn(n),m=Re("Input","-input",Pn,vn,n,b);pn&&gn("-input-safari",Bn,b);const c=y(null),r=y(null),p=y(null),T=y(null),f=y(null),C=y(null),z=y(null),v=$n(z),i=y(null),{localeRef:d}=_n("Input"),x=y(n.defaultValue),R=Se(n,"value"),F=bn(R,x),O=mn(n),{mergedSizeRef:oe,mergedDisabledRef:V,mergedStatusRef:Pe}=O,W=y(!1),N=y(!1),$=y(!1),K=y(!1);let ne=null;const re=E(()=>{const{placeholder:e,pair:o}=n;return o?Array.isArray(e)?e:e===void 0?["",""]:[e,e]:e===void 0?[d.value.placeholder]:[e]}),Be=E(()=>{const{value:e}=$,{value:o}=F,{value:t}=re;return!e&&(ee(o)||Array.isArray(o)&&ee(o[0]))&&t[0]}),Ee=E(()=>{const{value:e}=$,{value:o}=F,{value:t}=re;return!e&&t[1]&&(ee(o)||Array.isArray(o)&&ee(o[1]))}),te=me(()=>n.internalForceFocus||W.value),$e=me(()=>{if(V.value||n.readonly||!n.clearable||!te.value&&!N.value)return!1;const{value:e}=F,{value:o}=te;return n.pair?!!(Array.isArray(e)&&(e[0]||e[1]))&&(N.value||o):!!e&&(N.value||o)}),ae=E(()=>{const{showPasswordOn:e}=n;if(e)return e;if(n.showPasswordToggle)return"click"}),H=y(!1),Te=E(()=>{const{textDecoration:e}=n;return e?Array.isArray(e)?e.map(o=>({textDecoration:o})):[{textDecoration:e}]:["",""]}),he=y(void 0),Ie=()=>{var e,o;if(n.type==="textarea"){const{autosize:t}=n;if(t&&(he.value=(o=(e=i.value)===null||e===void 0?void 0:e.$el)===null||o===void 0?void 0:o.offsetWidth),!r.value||typeof t=="boolean")return;const{paddingTop:u,paddingBottom:h,lineHeight:s}=window.getComputedStyle(r.value),I=Number(u.slice(0,-2)),M=Number(h.slice(0,-2)),k=Number(s.slice(0,-2)),{value:j}=p;if(!j)return;if(t.minRows){const U=Math.max(t.minRows,1),se=`${I+M+k*U}px`;j.style.minHeight=se}if(t.maxRows){const U=`${I+M+k*t.maxRows}px`;j.style.maxHeight=U}}},Me=E(()=>{const{maxlength:e}=n;return e===void 0?void 0:Number(e)});xn(()=>{const{value:e}=F;Array.isArray(e)||le(e)});const ke=yn().proxy;function G(e,o){const{onUpdateValue:t,"onUpdate:value":u,onInput:h}=n,{nTriggerFormInput:s}=O;t&&w(t,e,o),u&&w(u,e,o),h&&w(h,e,o),x.value=e,s()}function X(e,o){const{onChange:t}=n,{nTriggerFormChange:u}=O;t&&w(t,e,o),x.value=e,u()}function Ve(e){const{onBlur:o}=n,{nTriggerFormBlur:t}=O;o&&w(o,e),t()}function We(e){const{onFocus:o}=n,{nTriggerFormFocus:t}=O;o&&w(o,e),t()}function De(e){const{onClear:o}=n;o&&w(o,e)}function Oe(e){const{onInputBlur:o}=n;o&&w(o,e)}function Ne(e){const{onInputFocus:o}=n;o&&w(o,e)}function Ke(){const{onDeactivate:e}=n;e&&w(e)}function He(){const{onActivate:e}=n;e&&w(e)}function je(e){const{onClick:o}=n;o&&w(o,e)}function Ue(e){const{onWrapperFocus:o}=n;o&&w(o,e)}function Le(e){const{onWrapperBlur:o}=n;o&&w(o,e)}function Ge(){$.value=!0}function Xe(e){$.value=!1,e.target===C.value?Y(e,1):Y(e,0)}function Y(e,o=0,t="input"){const u=e.target.value;if(le(u),e instanceof InputEvent&&!e.isComposing&&($.value=!1),n.type==="textarea"){const{value:s}=i;s&&s.syncUnifiedContainer()}if(ne=u,$.value)return;v.recordCursor();const h=Ye(u);if(h)if(!n.pair)t==="input"?G(u,{source:o}):X(u,{source:o});else{let{value:s}=F;Array.isArray(s)?s=[s[0],s[1]]:s=["",""],s[o]=u,t==="input"?G(s,{source:o}):X(s,{source:o})}ke.$forceUpdate(),h||we(v.restoreCursor)}function Ye(e){const{countGraphemes:o,maxlength:t,minlength:u}=n;if(o){let s;if(t!==void 0&&(s===void 0&&(s=o(e)),s>Number(t))||u!==void 0&&(s===void 0&&(s=o(e)),s<Number(t)))return!1}const{allowInput:h}=n;return typeof h=="function"?h(e):!0}function qe(e){Oe(e),e.relatedTarget===c.value&&Ke(),e.relatedTarget!==null&&(e.relatedTarget===f.value||e.relatedTarget===C.value||e.relatedTarget===r.value)||(K.value=!1),q(e,"blur"),z.value=null}function Je(e,o){Ne(e),W.value=!0,K.value=!0,He(),q(e,"focus"),o===0?z.value=f.value:o===1?z.value=C.value:o===2&&(z.value=r.value)}function Qe(e){n.passivelyActivated&&(Le(e),q(e,"blur"))}function Ze(e){n.passivelyActivated&&(W.value=!0,Ue(e),q(e,"focus"))}function q(e,o){e.relatedTarget!==null&&(e.relatedTarget===f.value||e.relatedTarget===C.value||e.relatedTarget===r.value||e.relatedTarget===c.value)||(o==="focus"?(We(e),W.value=!0):o==="blur"&&(Ve(e),W.value=!1))}function eo(e,o){Y(e,o,"change")}function oo(e){je(e)}function no(e){De(e),ve()}function ve(){n.pair?(G(["",""],{source:"clear"}),X(["",""],{source:"clear"})):(G("",{source:"clear"}),X("",{source:"clear"}))}function ro(e){const{onMousedown:o}=n;o&&o(e);const{tagName:t}=e.target;if(t!=="INPUT"&&t!=="TEXTAREA"){if(n.resizable){const{value:u}=c;if(u){const{left:h,top:s,width:I,height:M}=u.getBoundingClientRect(),k=14;if(h+I-k<e.clientX&&e.clientX<h+I&&s+M-k<e.clientY&&e.clientY<s+M)return}}e.preventDefault(),W.value||pe()}}function to(){var e;N.value=!0,n.type==="textarea"&&((e=i.value)===null||e===void 0||e.handleMouseEnterWrapper())}function ao(){var e;N.value=!1,n.type==="textarea"&&((e=i.value)===null||e===void 0||e.handleMouseLeaveWrapper())}function io(){V.value||ae.value==="click"&&(H.value=!H.value)}function lo(e){if(V.value)return;e.preventDefault();const o=u=>{u.preventDefault(),ze("mouseup",document,o)};if(Ce("mouseup",document,o),ae.value!=="mousedown")return;H.value=!0;const t=()=>{H.value=!1,ze("mouseup",document,t)};Ce("mouseup",document,t)}function so(e){n.onKeyup&&w(n.onKeyup,e)}function uo(e){switch(n.onKeydown&&w(n.onKeydown,e),e.key){case"Escape":ie();break;case"Enter":co(e);break}}function co(e){var o,t;if(n.passivelyActivated){const{value:u}=K;if(u){n.internalDeactivateOnEnter&&ie();return}e.preventDefault(),n.type==="textarea"?(o=r.value)===null||o===void 0||o.focus():(t=f.value)===null||t===void 0||t.focus()}}function ie(){n.passivelyActivated&&(K.value=!1,we(()=>{var e;(e=c.value)===null||e===void 0||e.focus()}))}function pe(){var e,o,t;V.value||(n.passivelyActivated?(e=c.value)===null||e===void 0||e.focus():((o=r.value)===null||o===void 0||o.focus(),(t=f.value)===null||t===void 0||t.focus()))}function fo(){var e;!((e=c.value)===null||e===void 0)&&e.contains(document.activeElement)&&document.activeElement.blur()}function ho(){var e,o;(e=r.value)===null||e===void 0||e.select(),(o=f.value)===null||o===void 0||o.select()}function vo(){V.value||(r.value?r.value.focus():f.value&&f.value.focus())}function po(){const{value:e}=c;e!=null&&e.contains(document.activeElement)&&e!==document.activeElement&&ie()}function go(e){if(n.type==="textarea"){const{value:o}=r;o==null||o.scrollTo(e)}else{const{value:o}=f;o==null||o.scrollTo(e)}}function le(e){const{type:o,pair:t,autosize:u}=n;if(!t&&u)if(o==="textarea"){const{value:h}=p;h&&(h.textContent=`${e??""}\r
`)}else{const{value:h}=T;h&&(e?h.textContent=e:h.innerHTML="&nbsp;")}}function bo(){Ie()}const ge=y({top:"0"});function mo(e){var o;const{scrollTop:t}=e.target;ge.value.top=`${-t}px`,(o=i.value)===null||o===void 0||o.syncUnifiedContainer()}let J=null;xe(()=>{const{autosize:e,type:o}=n;e&&o==="textarea"?J=de(F,t=>{!Array.isArray(t)&&t!==ne&&le(t)}):J==null||J()});let Q=null;xe(()=>{n.type==="textarea"?Q=de(F,e=>{var o;!Array.isArray(e)&&e!==ne&&((o=i.value)===null||o===void 0||o.syncUnifiedContainer())}):Q==null||Q()}),Sn(Fe,{mergedValueRef:F,maxlengthRef:Me,mergedClsPrefixRef:b,countGraphemesRef:Se(n,"countGraphemes")});const xo={wrapperElRef:c,inputElRef:f,textareaElRef:r,isCompositing:$,clear:ve,focus:pe,blur:fo,select:ho,deactivate:po,activate:vo,scrollTo:go},yo=wn("Input",_,b),be=E(()=>{const{value:e}=oe,{common:{cubicBezierEaseInOut:o},self:{color:t,borderRadius:u,textColor:h,caretColor:s,caretColorError:I,caretColorWarning:M,textDecorationColor:k,border:j,borderDisabled:U,borderHover:se,borderFocus:wo,placeholderColor:Co,placeholderColorDisabled:zo,lineHeightTextarea:So,colorDisabled:Ao,colorFocus:_o,textColorDisabled:Ro,boxShadowFocus:Fo,iconSize:Po,colorFocusWarning:Bo,boxShadowFocusWarning:Eo,borderWarning:$o,borderFocusWarning:To,borderHoverWarning:Io,colorFocusError:Mo,boxShadowFocusError:ko,borderError:Vo,borderFocusError:Wo,borderHoverError:Do,clearSize:Oo,clearColor:No,clearColorHover:Ko,clearColorPressed:Ho,iconColor:jo,iconColorDisabled:Uo,suffixTextColor:Lo,countTextColor:Go,countTextColorDisabled:Xo,iconColorHover:Yo,iconColorPressed:qo,loadingColor:Jo,loadingColorError:Qo,loadingColorWarning:Zo,fontWeight:en,[ce("padding",e)]:on,[ce("fontSize",e)]:nn,[ce("height",e)]:rn}}=m.value,{left:tn,right:an}=zn(on);return{"--n-bezier":o,"--n-count-text-color":Go,"--n-count-text-color-disabled":Xo,"--n-color":t,"--n-font-size":nn,"--n-font-weight":en,"--n-border-radius":u,"--n-height":rn,"--n-padding-left":tn,"--n-padding-right":an,"--n-text-color":h,"--n-caret-color":s,"--n-text-decoration-color":k,"--n-border":j,"--n-border-disabled":U,"--n-border-hover":se,"--n-border-focus":wo,"--n-placeholder-color":Co,"--n-placeholder-color-disabled":zo,"--n-icon-size":Po,"--n-line-height-textarea":So,"--n-color-disabled":Ao,"--n-color-focus":_o,"--n-text-color-disabled":Ro,"--n-box-shadow-focus":Fo,"--n-loading-color":Jo,"--n-caret-color-warning":M,"--n-color-focus-warning":Bo,"--n-box-shadow-focus-warning":Eo,"--n-border-warning":$o,"--n-border-focus-warning":To,"--n-border-hover-warning":Io,"--n-loading-color-warning":Zo,"--n-caret-color-error":I,"--n-color-focus-error":Mo,"--n-box-shadow-focus-error":ko,"--n-border-error":Vo,"--n-border-focus-error":Wo,"--n-border-hover-error":Do,"--n-loading-color-error":Qo,"--n-clear-color":No,"--n-clear-size":Oo,"--n-clear-color-hover":Ko,"--n-clear-color-pressed":Ho,"--n-icon-color":jo,"--n-icon-color-hover":Yo,"--n-icon-color-pressed":qo,"--n-icon-color-disabled":Uo,"--n-suffix-text-color":Lo}}),D=B?Cn("input",E(()=>{const{value:e}=oe;return e[0]}),be,n):void 0;return Object.assign(Object.assign({},xo),{wrapperElRef:c,inputElRef:f,inputMirrorElRef:T,inputEl2Ref:C,textareaElRef:r,textareaMirrorElRef:p,textareaScrollbarInstRef:i,rtlEnabled:yo,uncontrolledValue:x,mergedValue:F,passwordVisible:H,mergedPlaceholder:re,showPlaceholder1:Be,showPlaceholder2:Ee,mergedFocus:te,isComposing:$,activated:K,showClearButton:$e,mergedSize:oe,mergedDisabled:V,textDecorationStyle:Te,mergedClsPrefix:b,mergedBordered:A,mergedShowPasswordOn:ae,placeholderStyle:ge,mergedStatus:Pe,textAreaScrollContainerWidth:he,handleTextAreaScroll:mo,handleCompositionStart:Ge,handleCompositionEnd:Xe,handleInput:Y,handleInputBlur:qe,handleInputFocus:Je,handleWrapperBlur:Qe,handleWrapperFocus:Ze,handleMouseEnter:to,handleMouseLeave:ao,handleMouseDown:ro,handleChange:eo,handleClick:oo,handleClear:no,handlePasswordToggleClick:io,handlePasswordToggleMousedown:lo,handleWrapperKeydown:uo,handleWrapperKeyup:so,handleTextAreaMirrorResize:bo,getTextareaScrollContainer:()=>r.value,mergedTheme:m,cssVars:B?void 0:be,themeClass:D==null?void 0:D.themeClass,onRender:D==null?void 0:D.onRender})},render(){var n,b,A,B,_,m,c;const{mergedClsPrefix:r,mergedStatus:p,themeClass:T,type:f,countGraphemes:C,onRender:z}=this,v=this.$slots;return z==null||z(),a("div",{ref:"wrapperElRef",class:[`${r}-input`,T,p&&`${r}-input--${p}-status`,{[`${r}-input--rtl`]:this.rtlEnabled,[`${r}-input--disabled`]:this.mergedDisabled,[`${r}-input--textarea`]:f==="textarea",[`${r}-input--resizable`]:this.resizable&&!this.autosize,[`${r}-input--autosize`]:this.autosize,[`${r}-input--round`]:this.round&&f!=="textarea",[`${r}-input--pair`]:this.pair,[`${r}-input--focus`]:this.mergedFocus,[`${r}-input--stateful`]:this.stateful}],style:this.cssVars,tabindex:!this.mergedDisabled&&this.passivelyActivated&&!this.activated?0:void 0,onFocus:this.handleWrapperFocus,onBlur:this.handleWrapperBlur,onClick:this.handleClick,onMousedown:this.handleMouseDown,onMouseenter:this.handleMouseEnter,onMouseleave:this.handleMouseLeave,onCompositionstart:this.handleCompositionStart,onCompositionend:this.handleCompositionEnd,onKeyup:this.handleWrapperKeyup,onKeydown:this.handleWrapperKeydown},a("div",{class:`${r}-input-wrapper`},Z(v.prefix,i=>i&&a("div",{class:`${r}-input__prefix`},i)),f==="textarea"?a(cn,{ref:"textareaScrollbarInstRef",class:`${r}-input__textarea`,container:this.getTextareaScrollContainer,theme:(b=(n=this.theme)===null||n===void 0?void 0:n.peers)===null||b===void 0?void 0:b.Scrollbar,themeOverrides:(B=(A=this.themeOverrides)===null||A===void 0?void 0:A.peers)===null||B===void 0?void 0:B.Scrollbar,triggerDisplayManually:!0,useUnifiedContainer:!0,internalHoistYRail:!0},{default:()=>{var i,d;const{textAreaScrollContainerWidth:x}=this,R={width:this.autosize&&x&&`${x}px`};return a(dn,null,a("textarea",Object.assign({},this.inputProps,{ref:"textareaElRef",class:[`${r}-input__textarea-el`,(i=this.inputProps)===null||i===void 0?void 0:i.class],autofocus:this.autofocus,rows:Number(this.rows),placeholder:this.placeholder,value:this.mergedValue,disabled:this.mergedDisabled,maxlength:C?void 0:this.maxlength,minlength:C?void 0:this.minlength,readonly:this.readonly,tabindex:this.passivelyActivated&&!this.activated?-1:void 0,style:[this.textDecorationStyle[0],(d=this.inputProps)===null||d===void 0?void 0:d.style,R],onBlur:this.handleInputBlur,onFocus:F=>{this.handleInputFocus(F,2)},onInput:this.handleInput,onChange:this.handleChange,onScroll:this.handleTextAreaScroll})),this.showPlaceholder1?a("div",{class:`${r}-input__placeholder`,style:[this.placeholderStyle,R],key:"placeholder"},this.mergedPlaceholder[0]):null,this.autosize?a(fn,{onResize:this.handleTextAreaMirrorResize},{default:()=>a("div",{ref:"textareaMirrorElRef",class:`${r}-input__textarea-mirror`,key:"mirror"})}):null)}}):a("div",{class:`${r}-input__input`},a("input",Object.assign({type:f==="password"&&this.mergedShowPasswordOn&&this.passwordVisible?"text":f},this.inputProps,{ref:"inputElRef",class:[`${r}-input__input-el`,(_=this.inputProps)===null||_===void 0?void 0:_.class],style:[this.textDecorationStyle[0],(m=this.inputProps)===null||m===void 0?void 0:m.style],tabindex:this.passivelyActivated&&!this.activated?-1:(c=this.inputProps)===null||c===void 0?void 0:c.tabindex,placeholder:this.mergedPlaceholder[0],disabled:this.mergedDisabled,maxlength:C?void 0:this.maxlength,minlength:C?void 0:this.minlength,value:Array.isArray(this.mergedValue)?this.mergedValue[0]:this.mergedValue,readonly:this.readonly,autofocus:this.autofocus,size:this.attrSize,onBlur:this.handleInputBlur,onFocus:i=>{this.handleInputFocus(i,0)},onInput:i=>{this.handleInput(i,0)},onChange:i=>{this.handleChange(i,0)}})),this.showPlaceholder1?a("div",{class:`${r}-input__placeholder`},a("span",null,this.mergedPlaceholder[0])):null,this.autosize?a("div",{class:`${r}-input__input-mirror`,key:"mirror",ref:"inputMirrorElRef"}," "):null),!this.pair&&Z(v.suffix,i=>i||this.clearable||this.showCount||this.mergedShowPasswordOn||this.loading!==void 0?a("div",{class:`${r}-input__suffix`},[Z(v["clear-icon-placeholder"],d=>(this.clearable||d)&&a(Ae,{clsPrefix:r,show:this.showClearButton,onClear:this.handleClear},{placeholder:()=>d,icon:()=>{var x,R;return(R=(x=this.$slots)["clear-icon"])===null||R===void 0?void 0:R.call(x)}})),this.internalLoadingBeforeSuffix?null:i,this.loading!==void 0?a(An,{clsPrefix:r,loading:this.loading,showArrow:!1,showClear:!1,style:this.cssVars}):null,this.internalLoadingBeforeSuffix?i:null,this.showCount&&this.type!=="textarea"?a(_e,null,{default:d=>{var x;const{renderCount:R}=this;return R?R(d):(x=v.count)===null||x===void 0?void 0:x.call(v,d)}}):null,this.mergedShowPasswordOn&&this.type==="password"?a("div",{class:`${r}-input__eye`,onMousedown:this.handlePasswordToggleMousedown,onClick:this.handlePasswordToggleClick},this.passwordVisible?ue(v["password-visible-icon"],()=>[a(ye,{clsPrefix:r},{default:()=>a(Rn,null)})]):ue(v["password-invisible-icon"],()=>[a(ye,{clsPrefix:r},{default:()=>a(Fn,null)})])):null]):null)),this.pair?a("span",{class:`${r}-input__separator`},ue(v.separator,()=>[this.separator])):null,this.pair?a("div",{class:`${r}-input-wrapper`},a("div",{class:`${r}-input__input`},a("input",{ref:"inputEl2Ref",type:this.type,class:`${r}-input__input-el`,tabindex:this.passivelyActivated&&!this.activated?-1:void 0,placeholder:this.mergedPlaceholder[1],disabled:this.mergedDisabled,maxlength:C?void 0:this.maxlength,minlength:C?void 0:this.minlength,value:Array.isArray(this.mergedValue)?this.mergedValue[1]:void 0,readonly:this.readonly,style:this.textDecorationStyle[1],onBlur:this.handleInputBlur,onFocus:i=>{this.handleInputFocus(i,1)},onInput:i=>{this.handleInput(i,1)},onChange:i=>{this.handleChange(i,1)}}),this.showPlaceholder2?a("div",{class:`${r}-input__placeholder`},a("span",null,this.mergedPlaceholder[1])):null),Z(v.suffix,i=>(this.clearable||i)&&a("div",{class:`${r}-input__suffix`},[this.clearable&&a(Ae,{clsPrefix:r,show:this.showClearButton,onClear:this.handleClear},{icon:()=>{var d;return(d=v["clear-icon"])===null||d===void 0?void 0:d.call(v)},placeholder:()=>{var d;return(d=v["clear-icon-placeholder"])===null||d===void 0?void 0:d.call(v)}}),i]))):null,this.mergedBordered?a("div",{class:`${r}-input__border`}):null,this.mergedBordered?a("div",{class:`${r}-input__state-border`}):null,this.showCount&&f==="textarea"?a(_e,null,{default:i=>{var d;const{renderCount:x}=this;return x?x(i):(d=v.count)===null||d===void 0?void 0:d.call(v,i)}}):null)}});export{Wn as N};
