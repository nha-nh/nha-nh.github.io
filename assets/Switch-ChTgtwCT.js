import{f as U,I as t,H as j,g as o,G as I,ci as A,d as se,dd as D,h as a,bq as f,cl as ce,cO as de,j as ue,K as E,de as he,cc as be,p as P,aO as fe,M as ve,n as V,a_ as H,y as ge,R as v,T as M,cs as r}from"./index-6xrRJA1H.js";const we=U("switch",`
 height: var(--n-height);
 min-width: var(--n-width);
 vertical-align: middle;
 user-select: none;
 -webkit-user-select: none;
 display: inline-flex;
 outline: none;
 justify-content: center;
 align-items: center;
`,[t("children-placeholder",`
 height: var(--n-rail-height);
 display: flex;
 flex-direction: column;
 overflow: hidden;
 pointer-events: none;
 visibility: hidden;
 `),t("rail-placeholder",`
 display: flex;
 flex-wrap: none;
 `),t("button-placeholder",`
 width: calc(1.75 * var(--n-rail-height));
 height: var(--n-rail-height);
 `),U("base-loading",`
 position: absolute;
 top: 50%;
 left: 50%;
 transform: translateX(-50%) translateY(-50%);
 font-size: calc(var(--n-button-width) - 4px);
 color: var(--n-loading-color);
 transition: color .3s var(--n-bezier);
 `,[A({left:"50%",top:"50%",originalTransform:"translateX(-50%) translateY(-50%)"})]),t("checked, unchecked",`
 transition: color .3s var(--n-bezier);
 color: var(--n-text-color);
 box-sizing: border-box;
 position: absolute;
 white-space: nowrap;
 top: 0;
 bottom: 0;
 display: flex;
 align-items: center;
 line-height: 1;
 `),t("checked",`
 right: 0;
 padding-right: calc(1.25 * var(--n-rail-height) - var(--n-offset));
 `),t("unchecked",`
 left: 0;
 justify-content: flex-end;
 padding-left: calc(1.25 * var(--n-rail-height) - var(--n-offset));
 `),j("&:focus",[t("rail",`
 box-shadow: var(--n-box-shadow-focus);
 `)]),o("round",[t("rail","border-radius: calc(var(--n-rail-height) / 2);",[t("button","border-radius: calc(var(--n-button-height) / 2);")])]),I("disabled",[I("icon",[o("rubber-band",[o("pressed",[t("rail",[t("button","max-width: var(--n-button-width-pressed);")])]),t("rail",[j("&:active",[t("button","max-width: var(--n-button-width-pressed);")])]),o("active",[o("pressed",[t("rail",[t("button","left: calc(100% - var(--n-offset) - var(--n-button-width-pressed));")])]),t("rail",[j("&:active",[t("button","left: calc(100% - var(--n-offset) - var(--n-button-width-pressed));")])])])])])]),o("active",[t("rail",[t("button","left: calc(100% - var(--n-button-width) - var(--n-offset))")])]),t("rail",`
 overflow: hidden;
 height: var(--n-rail-height);
 min-width: var(--n-rail-width);
 border-radius: var(--n-rail-border-radius);
 cursor: pointer;
 position: relative;
 transition:
 opacity .3s var(--n-bezier),
 background .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
 background-color: var(--n-rail-color);
 `,[t("button-icon",`
 color: var(--n-icon-color);
 transition: color .3s var(--n-bezier);
 font-size: calc(var(--n-button-height) - 4px);
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 display: flex;
 justify-content: center;
 align-items: center;
 line-height: 1;
 `,[A()]),t("button",`
 align-items: center; 
 top: var(--n-offset);
 left: var(--n-offset);
 height: var(--n-button-height);
 width: var(--n-button-width-pressed);
 max-width: var(--n-button-width);
 border-radius: var(--n-button-border-radius);
 background-color: var(--n-button-color);
 box-shadow: var(--n-button-box-shadow);
 box-sizing: border-box;
 cursor: inherit;
 content: "";
 position: absolute;
 transition:
 background-color .3s var(--n-bezier),
 left .3s var(--n-bezier),
 opacity .3s var(--n-bezier),
 max-width .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
 `)]),o("active",[t("rail","background-color: var(--n-rail-color-active);")]),o("loading",[t("rail",`
 cursor: wait;
 `)]),o("disabled",[t("rail",`
 cursor: not-allowed;
 opacity: .5;
 `)])]),me=Object.assign(Object.assign({},E.props),{size:{type:String,default:"medium"},value:{type:[String,Number,Boolean],default:void 0},loading:Boolean,defaultValue:{type:[String,Number,Boolean],default:!1},disabled:{type:Boolean,default:void 0},round:{type:Boolean,default:!0},"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],checkedValue:{type:[String,Number,Boolean],default:!0},uncheckedValue:{type:[String,Number,Boolean],default:!1},railStyle:Function,rubberBand:{type:Boolean,default:!0},onChange:[Function,Array]});let x;const ye=se({name:"Switch",props:me,slots:Object,setup(e){x===void 0&&(typeof CSS<"u"?typeof CSS.supports<"u"?x=CSS.supports("width","max(1px)"):x=!1:x=!0);const{mergedClsPrefixRef:S,inlineThemeDisabled:m}=ue(e),z=E("Switch","-switch",we,he,e,S),l=be(e),{mergedSizeRef:$,mergedDisabledRef:h}=l,p=P(e.defaultValue),C=ge(e,"value"),b=fe(C,p),y=V(()=>b.value===e.checkedValue),g=P(!1),n=P(!1),s=V(()=>{const{railStyle:i}=e;if(i)return i({focused:n.value,checked:y.value})});function c(i){const{"onUpdate:value":R,onChange:_,onUpdateValue:B}=e,{nTriggerFormInput:F,nTriggerFormChange:T}=l;R&&H(R,i),B&&H(B,i),_&&H(_,i),p.value=i,F(),T()}function L(){const{nTriggerFormFocus:i}=l;i()}function X(){const{nTriggerFormBlur:i}=l;i()}function Y(){e.loading||h.value||(b.value!==e.checkedValue?c(e.checkedValue):c(e.uncheckedValue))}function q(){n.value=!0,L()}function G(){n.value=!1,X(),g.value=!1}function J(i){e.loading||h.value||i.key===" "&&(b.value!==e.checkedValue?c(e.checkedValue):c(e.uncheckedValue),g.value=!1)}function Q(i){e.loading||h.value||i.key===" "&&(i.preventDefault(),g.value=!0)}const O=V(()=>{const{value:i}=$,{self:{opacityDisabled:R,railColor:_,railColorActive:B,buttonBoxShadow:F,buttonColor:T,boxShadowFocus:Z,loadingColor:ee,textColor:te,iconColor:ie,[v("buttonHeight",i)]:d,[v("buttonWidth",i)]:ne,[v("buttonWidthPressed",i)]:ae,[v("railHeight",i)]:u,[v("railWidth",i)]:k,[v("railBorderRadius",i)]:oe,[v("buttonBorderRadius",i)]:re},common:{cubicBezierEaseInOut:le}}=z.value;let N,K,W;return x?(N=`calc((${u} - ${d}) / 2)`,K=`max(${u}, ${d})`,W=`max(${k}, calc(${k} + ${d} - ${u}))`):(N=M((r(u)-r(d))/2),K=M(Math.max(r(u),r(d))),W=r(u)>r(d)?k:M(r(k)+r(d)-r(u))),{"--n-bezier":le,"--n-button-border-radius":re,"--n-button-box-shadow":F,"--n-button-color":T,"--n-button-width":ne,"--n-button-width-pressed":ae,"--n-button-height":d,"--n-height":K,"--n-offset":N,"--n-opacity-disabled":R,"--n-rail-border-radius":oe,"--n-rail-color":_,"--n-rail-color-active":B,"--n-rail-height":u,"--n-rail-width":k,"--n-width":W,"--n-box-shadow-focus":Z,"--n-loading-color":ee,"--n-text-color":te,"--n-icon-color":ie}}),w=m?ve("switch",V(()=>$.value[0]),O,e):void 0;return{handleClick:Y,handleBlur:G,handleFocus:q,handleKeyup:J,handleKeydown:Q,mergedRailStyle:s,pressed:g,mergedClsPrefix:S,mergedValue:b,checked:y,mergedDisabled:h,cssVars:m?void 0:O,themeClass:w==null?void 0:w.themeClass,onRender:w==null?void 0:w.onRender}},render(){const{mergedClsPrefix:e,mergedDisabled:S,checked:m,mergedRailStyle:z,onRender:l,$slots:$}=this;l==null||l();const{checked:h,unchecked:p,icon:C,"checked-icon":b,"unchecked-icon":y}=$,g=!(D(C)&&D(b)&&D(y));return a("div",{role:"switch","aria-checked":m,class:[`${e}-switch`,this.themeClass,g&&`${e}-switch--icon`,m&&`${e}-switch--active`,S&&`${e}-switch--disabled`,this.round&&`${e}-switch--round`,this.loading&&`${e}-switch--loading`,this.pressed&&`${e}-switch--pressed`,this.rubberBand&&`${e}-switch--rubber-band`],tabindex:this.mergedDisabled?void 0:0,style:this.cssVars,onClick:this.handleClick,onFocus:this.handleFocus,onBlur:this.handleBlur,onKeyup:this.handleKeyup,onKeydown:this.handleKeydown},a("div",{class:`${e}-switch__rail`,"aria-hidden":"true",style:z},f(h,n=>f(p,s=>n||s?a("div",{"aria-hidden":!0,class:`${e}-switch__children-placeholder`},a("div",{class:`${e}-switch__rail-placeholder`},a("div",{class:`${e}-switch__button-placeholder`}),n),a("div",{class:`${e}-switch__rail-placeholder`},a("div",{class:`${e}-switch__button-placeholder`}),s)):null)),a("div",{class:`${e}-switch__button`},f(C,n=>f(b,s=>f(y,c=>a(ce,null,{default:()=>this.loading?a(de,{key:"loading",clsPrefix:e,strokeWidth:20}):this.checked&&(s||n)?a("div",{class:`${e}-switch__button-icon`,key:s?"checked-icon":"icon"},s||n):!this.checked&&(c||n)?a("div",{class:`${e}-switch__button-icon`,key:c?"unchecked-icon":"icon"},c||n):null})))),f(h,n=>n&&a("div",{key:"checked",class:`${e}-switch__checked`},n)),f(p,n=>n&&a("div",{key:"unchecked",class:`${e}-switch__unchecked`},n)))))}});export{ye as N};
