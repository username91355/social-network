"use strict";(self.webpackChunksocial_network=self.webpackChunksocial_network||[]).push([[971],{60971:function(e,t,n){n.r(t),n.d(t,{default:function(){return ne}});var a=n(29439),r=n(72791),o={chat__wrapper:"Chat_chat__wrapper__666x+",chat__messages:"Chat_chat__messages__YLptC",chat__monitor_panel:"Chat_chat__monitor_panel__Smu2t"},c=n(83963),l=n(85623),s=n(38442),i=n(67449),u=n(81694),f=n.n(u),d=n(88829),p=n(77289),v=n(23785),m=n(14824),h=n(78295),y=n(52832),g=r.createContext("default"),b=function(e){var t=e.children,n=e.size;return r.createElement(g.Consumer,null,(function(e){return r.createElement(g.Provider,{value:n||e},t)}))},x=g,C=function(e,t){var n={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&t.indexOf(a)<0&&(n[a]=e[a]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var r=0;for(a=Object.getOwnPropertySymbols(e);r<a.length;r++)t.indexOf(a[r])<0&&Object.prototype.propertyIsEnumerable.call(e,a[r])&&(n[a[r]]=e[a[r]])}return n},E=function(e,t){var n,a,o=r.useContext(x),u=r.useState(1),g=(0,i.Z)(u,2),b=g[0],E=g[1],Z=r.useState(!1),k=(0,i.Z)(Z,2),O=k[0],_=k[1],N=r.useState(!0),w=(0,i.Z)(N,2),P=w[0],j=w[1],S=r.useRef(),I=r.useRef(),K=(0,p.sQ)(t,S),z=r.useContext(v.E_).getPrefixCls,R=function(){if(I.current&&S.current){var t=I.current.offsetWidth,n=S.current.offsetWidth;if(0!==t&&0!==n){var a=e.gap,r=void 0===a?4:a;2*r<n&&E(n-2*r<t?(n-2*r)/t:1)}}};r.useEffect((function(){_(!0)}),[]),r.useEffect((function(){j(!0),E(1)}),[e.src]),r.useEffect((function(){R()}),[e.gap]);var D=e.prefixCls,V=e.shape,F=e.size,M=e.src,B=e.srcSet,G=e.icon,L=e.className,W=e.alt,H=e.draggable,T=e.children,U=e.crossOrigin,q=C(e,["prefixCls","shape","size","src","srcSet","icon","className","alt","draggable","children","crossOrigin"]),A="default"===F?o:F,X=(0,y.Z)(),Q=r.useMemo((function(){if("object"!==(0,s.Z)(A))return{};var e=h.c4.find((function(e){return X[e]})),t=A[e];return t?{width:t,height:t,lineHeight:"".concat(t,"px"),fontSize:G?t/2:18}:{}}),[X,A]);(0,m.Z)(!("string"===typeof G&&G.length>2),"Avatar","`icon` is using ReactNode instead of string naming in v4. Please check `".concat(G,"` at https://ant.design/components/icon"));var Y,J=z("avatar",D),$=f()((n={},(0,l.Z)(n,"".concat(J,"-lg"),"large"===A),(0,l.Z)(n,"".concat(J,"-sm"),"small"===A),n)),ee=r.isValidElement(M),te=f()(J,$,(a={},(0,l.Z)(a,"".concat(J,"-").concat(V),!!V),(0,l.Z)(a,"".concat(J,"-image"),ee||M&&P),(0,l.Z)(a,"".concat(J,"-icon"),!!G),a),L),ne="number"===typeof A?{width:A,height:A,lineHeight:"".concat(A,"px"),fontSize:G?A/2:18}:{};if("string"===typeof M&&P)Y=r.createElement("img",{src:M,draggable:H,srcSet:B,onError:function(){var t=e.onError;!1!==(t?t():void 0)&&j(!1)},alt:W,crossOrigin:U});else if(ee)Y=M;else if(G)Y=G;else if(O||1!==b){var ae="scale(".concat(b,") translateX(-50%)"),re={msTransform:ae,WebkitTransform:ae,transform:ae},oe="number"===typeof A?{lineHeight:"".concat(A,"px")}:{};Y=r.createElement(d.default,{onResize:R},r.createElement("span",{className:"".concat(J,"-string"),ref:function(e){I.current=e},style:(0,c.Z)((0,c.Z)({},oe),re)},T))}else Y=r.createElement("span",{className:"".concat(J,"-string"),style:{opacity:0},ref:function(e){I.current=e}},T);return delete q.onError,delete q.gap,r.createElement("span",(0,c.Z)({},q,{style:(0,c.Z)((0,c.Z)((0,c.Z)({},ne),Q),q.style),className:te,ref:K}),Y)},Z=r.forwardRef(E);Z.displayName="Avatar",Z.defaultProps={shape:"circle",size:"default"};var k=Z,O=n(85501),_=n(61113),N=n(96115),w=function(e){return e?"function"===typeof e?e():e:null},P=n(29464),j=function(e,t){var n={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&t.indexOf(a)<0&&(n[a]=e[a]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var r=0;for(a=Object.getOwnPropertySymbols(e);r<a.length;r++)t.indexOf(a[r])<0&&Object.prototype.propertyIsEnumerable.call(e,a[r])&&(n[a[r]]=e[a[r]])}return n},S=r.forwardRef((function(e,t){var n=e.prefixCls,a=e.title,o=e.content,l=j(e,["prefixCls","title","content"]),s=r.useContext(v.E_).getPrefixCls,i=s("popover",n),u=s();return r.createElement(N.Z,(0,c.Z)({},l,{prefixCls:i,ref:t,overlay:function(e){return r.createElement(r.Fragment,null,a&&r.createElement("div",{className:"".concat(e,"-title")},w(a)),r.createElement("div",{className:"".concat(e,"-inner-content")},w(o)))}(i),transitionName:(0,P.m)(u,"zoom-big",l.transitionName)}))}));S.displayName="Popover",S.defaultProps={placement:"top",trigger:"hover",mouseEnterDelay:.1,mouseLeaveDelay:.1,overlayStyle:{}};var I=S,K=function(e){var t=r.useContext(v.E_),n=t.getPrefixCls,a=t.direction,o=e.prefixCls,c=e.className,s=void 0===c?"":c,i=e.maxCount,u=e.maxStyle,d=e.size,p=n("avatar-group",o),m=f()(p,(0,l.Z)({},"".concat(p,"-rtl"),"rtl"===a),s),h=e.children,y=e.maxPopoverPlacement,g=void 0===y?"top":y,x=(0,O.Z)(h).map((function(e,t){return(0,_.Tm)(e,{key:"avatar-key-".concat(t)})})),C=x.length;if(i&&i<C){var E=x.slice(0,i),Z=x.slice(i,C);return E.push(r.createElement(I,{key:"avatar-popover-key",content:Z,trigger:"hover",placement:g,overlayClassName:"".concat(p,"-popover")},r.createElement(k,{style:u},"+".concat(C-i)))),r.createElement(b,{size:d},r.createElement("div",{className:m,style:e.style},E))}return r.createElement(b,{size:d},r.createElement("div",{className:m,style:e.style},x))},z=k;z.Group=K;var R=z,D=n(77732),V=n(84789),F=n(42944),M=n(25978),B=n(16706),G=n(28083),L=n(55552),W=n(41818),H=function(e,t){var n={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&t.indexOf(a)<0&&(n[a]=e[a]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var r=0;for(a=Object.getOwnPropertySymbols(e);r<a.length;r++)t.indexOf(a[r])<0&&Object.prototype.propertyIsEnumerable.call(e,a[r])&&(n[a[r]]=e[a[r]])}return n},T=r.createContext(null),U=function(e,t){var n=e.defaultValue,a=e.children,o=e.options,s=void 0===o?[]:o,u=e.prefixCls,d=e.className,p=e.style,m=e.onChange,h=H(e,["defaultValue","children","options","prefixCls","className","style","onChange"]),y=r.useContext(v.E_),g=y.getPrefixCls,b=y.direction,x=r.useState(h.value||n||[]),C=(0,i.Z)(x,2),E=C[0],Z=C[1],k=r.useState([]),O=(0,i.Z)(k,2),_=O[0],N=O[1];r.useEffect((function(){"value"in h&&Z(h.value||[])}),[h.value]);var w=function(){return s.map((function(e){return"string"===typeof e?{label:e,value:e}:e}))},P=g("checkbox",u),j="".concat(P,"-group"),S=(0,W.Z)(h,["value","disabled"]);s&&s.length>0&&(a=w().map((function(e){return r.createElement(J,{prefixCls:P,key:e.value.toString(),disabled:"disabled"in e?e.disabled:h.disabled,value:e.value,checked:-1!==E.indexOf(e.value),onChange:e.onChange,className:"".concat(j,"-item"),style:e.style},e.label)})));var I={toggleOption:function(e){var t=E.indexOf(e.value),n=(0,L.Z)(E);-1===t?n.push(e.value):n.splice(t,1),"value"in h||Z(n);var a=w();null===m||void 0===m||m(n.filter((function(e){return-1!==_.indexOf(e)})).sort((function(e,t){return a.findIndex((function(t){return t.value===e}))-a.findIndex((function(e){return e.value===t}))})))},value:E,disabled:h.disabled,name:h.name,registerValue:function(e){N((function(t){return[].concat((0,L.Z)(t),[e])}))},cancelValue:function(e){N((function(t){return t.filter((function(t){return t!==e}))}))}},K=f()(j,(0,l.Z)({},"".concat(j,"-rtl"),"rtl"===b),d);return r.createElement("div",(0,c.Z)({className:K,style:p},S,{ref:t}),r.createElement(T.Provider,{value:I},a))},q=r.forwardRef(U),A=r.memo(q),X=function(e,t){var n={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&t.indexOf(a)<0&&(n[a]=e[a]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var r=0;for(a=Object.getOwnPropertySymbols(e);r<a.length;r++)t.indexOf(a[r])<0&&Object.prototype.propertyIsEnumerable.call(e,a[r])&&(n[a[r]]=e[a[r]])}return n},Q=function(e,t){var n,a=e.prefixCls,o=e.className,s=e.children,i=e.indeterminate,u=void 0!==i&&i,d=e.style,p=e.onMouseEnter,h=e.onMouseLeave,y=e.skipGroup,g=void 0!==y&&y,b=X(e,["prefixCls","className","children","indeterminate","style","onMouseEnter","onMouseLeave","skipGroup"]),x=r.useContext(v.E_),C=x.getPrefixCls,E=x.direction,Z=r.useContext(T),k=r.useRef(b.value);r.useEffect((function(){null===Z||void 0===Z||Z.registerValue(b.value),(0,m.Z)("checked"in b||!!Z||!("value"in b),"Checkbox","`value` is not a valid prop, do you mean `checked`?")}),[]),r.useEffect((function(){if(!g)return b.value!==k.current&&(null===Z||void 0===Z||Z.cancelValue(k.current),null===Z||void 0===Z||Z.registerValue(b.value)),function(){return null===Z||void 0===Z?void 0:Z.cancelValue(b.value)}}),[b.value]);var O=C("checkbox",a),_=(0,c.Z)({},b);Z&&!g&&(_.onChange=function(){b.onChange&&b.onChange.apply(b,arguments),Z.toggleOption&&Z.toggleOption({label:s,value:b.value})},_.name=Z.name,_.checked=-1!==Z.value.indexOf(b.value),_.disabled=b.disabled||Z.disabled);var N=f()((n={},(0,l.Z)(n,"".concat(O,"-wrapper"),!0),(0,l.Z)(n,"".concat(O,"-rtl"),"rtl"===E),(0,l.Z)(n,"".concat(O,"-wrapper-checked"),_.checked),(0,l.Z)(n,"".concat(O,"-wrapper-disabled"),_.disabled),n),o),w=f()((0,l.Z)({},"".concat(O,"-indeterminate"),u));return r.createElement("label",{className:N,style:d,onMouseEnter:p,onMouseLeave:h},r.createElement(G.Z,(0,c.Z)({},_,{prefixCls:O,className:w,ref:t})),void 0!==s&&r.createElement("span",null,s))},Y=r.forwardRef(Q);Y.displayName="Checkbox";var J=Y,$=J;$.Group=A,$.__ANT_CHECKBOX=!0;var ee=$,te=n(80184),ne=r.memo((function(){var e=(0,r.useState)(""),t=(0,a.Z)(e,2),n=t[0],c=t[1],l=(0,M.I0)(),s=(0,M.v9)((function(e){return e.chat.messages})),i=(0,M.v9)((function(e){return e.chat.statusWS})),u=(0,r.useRef)(null),f=(0,r.useState)(!0),d=(0,a.Z)(f,2),p=d[0],v=d[1];(0,r.useEffect)((function(){return l((0,B.WE)()),function(){l((0,B.R7)())}}),[]),(0,r.useEffect)((function(){var e;p&&(null===(e=u.current)||void 0===e||e.scrollIntoView({behavior:"smooth"}))}),[s]);return(0,te.jsxs)("div",{className:o.chat__wrapper,children:[(0,te.jsxs)("div",{className:o.chat__messages,children:["ready"!==i?(0,te.jsx)(F.p,{}):s.map((function(e,t){return(0,te.jsx)(ae,{avatar:e.photo,author:e.userName,text:e.message},"".concat(e.userId).concat(t))})),(0,te.jsx)("div",{className:o.chat__scroll_anchor,ref:u})]}),(0,te.jsxs)("div",{className:o.chat__monitor_panel,children:[(0,te.jsx)(V.G,{label:"Enter new message",value:n,onChange:c,send:function(){n&&(l((0,B.bE)(n)),c(""))},buttonDisabled:"ready"!==i,title:"Send"}),(0,te.jsx)("hr",{}),(0,te.jsx)(ee,{style:{color:"white"},checked:p,onChange:function(e){v(e.target.checked)},children:"Set auto-scroll"})]})]})})),ae=r.memo((function(e){var t=e.author,n=e.avatar,a=e.text;return(0,te.jsx)(D.Z,{style:{backgroundColor:"white",margin:"10px"},author:(0,te.jsx)("a",{children:t}),avatar:(0,te.jsx)(R,{src:n||"https://joeschmoe.io/api/v1/random",alt:"avatar"}),content:(0,te.jsx)("p",{children:a})})}))},52832:function(e,t,n){var a=n(67449),r=n(72791),o=n(78295);t.Z=function(){var e=(0,r.useState)({}),t=(0,a.Z)(e,2),n=t[0],c=t[1];return(0,r.useEffect)((function(){var e=o.ZP.subscribe((function(e){c(e)}));return function(){return o.ZP.unsubscribe(e)}}),[]),n}},28083:function(e,t,n){var a=n(87462),r=n(4942),o=n(44925),c=n(1413),l=n(15671),s=n(43144),i=n(79340),u=n(72882),f=n(72791),d=n(81694),p=n.n(d),v=function(e){(0,i.Z)(n,e);var t=(0,u.Z)(n);function n(e){var a;(0,l.Z)(this,n),(a=t.call(this,e)).handleChange=function(e){var t=a.props,n=t.disabled,r=t.onChange;n||("checked"in a.props||a.setState({checked:e.target.checked}),r&&r({target:(0,c.Z)((0,c.Z)({},a.props),{},{checked:e.target.checked}),stopPropagation:function(){e.stopPropagation()},preventDefault:function(){e.preventDefault()},nativeEvent:e.nativeEvent}))},a.saveInput=function(e){a.input=e};var r="checked"in e?e.checked:e.defaultChecked;return a.state={checked:r},a}return(0,s.Z)(n,[{key:"focus",value:function(){this.input.focus()}},{key:"blur",value:function(){this.input.blur()}},{key:"render",value:function(){var e,t=this.props,n=t.prefixCls,c=t.className,l=t.style,s=t.name,i=t.id,u=t.type,d=t.disabled,v=t.readOnly,m=t.tabIndex,h=t.onClick,y=t.onFocus,g=t.onBlur,b=t.onKeyDown,x=t.onKeyPress,C=t.onKeyUp,E=t.autoFocus,Z=t.value,k=t.required,O=(0,o.Z)(t,["prefixCls","className","style","name","id","type","disabled","readOnly","tabIndex","onClick","onFocus","onBlur","onKeyDown","onKeyPress","onKeyUp","autoFocus","value","required"]),_=Object.keys(O).reduce((function(e,t){return"aria-"!==t.substr(0,5)&&"data-"!==t.substr(0,5)&&"role"!==t||(e[t]=O[t]),e}),{}),N=this.state.checked,w=p()(n,c,(e={},(0,r.Z)(e,"".concat(n,"-checked"),N),(0,r.Z)(e,"".concat(n,"-disabled"),d),e));return f.createElement("span",{className:w,style:l},f.createElement("input",(0,a.Z)({name:s,id:i,type:u,required:k,readOnly:v,disabled:d,tabIndex:m,className:"".concat(n,"-input"),checked:!!N,onClick:h,onFocus:y,onBlur:g,onKeyUp:C,onKeyDown:b,onKeyPress:x,onChange:this.handleChange,autoFocus:E,ref:this.saveInput,value:Z},_)),f.createElement("span",{className:"".concat(n,"-inner")}))}}],[{key:"getDerivedStateFromProps",value:function(e,t){return"checked"in e?(0,c.Z)((0,c.Z)({},t),{},{checked:e.checked}):null}}]),n}(f.Component);v.defaultProps={prefixCls:"rc-checkbox",className:"",style:{},type:"checkbox",defaultChecked:!1,onFocus:function(){},onBlur:function(){},onChange:function(){},onKeyDown:function(){},onKeyPress:function(){},onKeyUp:function(){}},t.Z=v}}]);
//# sourceMappingURL=971.7576605c.chunk.js.map