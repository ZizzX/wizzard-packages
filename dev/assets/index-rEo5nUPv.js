function zg(a,r){for(var l=0;l<r.length;l++){const s=r[l];if(typeof s!="string"&&!Array.isArray(s)){for(const c in s)if(c!=="default"&&!(c in a)){const d=Object.getOwnPropertyDescriptor(s,c);d&&Object.defineProperty(a,c,d.get?d:{enumerable:!0,get:()=>s[c]})}}}return Object.freeze(Object.defineProperty(a,Symbol.toStringTag,{value:"Module"}))}(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const c of document.querySelectorAll('link[rel="modulepreload"]'))s(c);new MutationObserver(c=>{for(const d of c)if(d.type==="childList")for(const f of d.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&s(f)}).observe(document,{childList:!0,subtree:!0});function l(c){const d={};return c.integrity&&(d.integrity=c.integrity),c.referrerPolicy&&(d.referrerPolicy=c.referrerPolicy),c.crossOrigin==="use-credentials"?d.credentials="include":c.crossOrigin==="anonymous"?d.credentials="omit":d.credentials="same-origin",d}function s(c){if(c.ep)return;c.ep=!0;const d=l(c);fetch(c.href,d)}})();function Js(a){return a&&a.__esModule&&Object.prototype.hasOwnProperty.call(a,"default")?a.default:a}var fc={exports:{}},ol={};var am;function R1(){if(am)return ol;am=1;var a=Symbol.for("react.transitional.element"),r=Symbol.for("react.fragment");function l(s,c,d){var f=null;if(d!==void 0&&(f=""+d),c.key!==void 0&&(f=""+c.key),"key"in c){d={};for(var h in c)h!=="key"&&(d[h]=c[h])}else d=c;return c=d.ref,{$$typeof:a,type:s,key:f,ref:c!==void 0?c:null,props:d}}return ol.Fragment=r,ol.jsx=l,ol.jsxs=l,ol}var im;function k1(){return im||(im=1,fc.exports=R1()),fc.exports}var we=k1(),pc={exports:{}},Me={};var rm;function I1(){if(rm)return Me;rm=1;var a=Symbol.for("react.transitional.element"),r=Symbol.for("react.portal"),l=Symbol.for("react.fragment"),s=Symbol.for("react.strict_mode"),c=Symbol.for("react.profiler"),d=Symbol.for("react.consumer"),f=Symbol.for("react.context"),h=Symbol.for("react.forward_ref"),g=Symbol.for("react.suspense"),p=Symbol.for("react.memo"),y=Symbol.for("react.lazy"),b=Symbol.for("react.activity"),S=Symbol.iterator;function v(T){return T===null||typeof T!="object"?null:(T=S&&T[S]||T["@@iterator"],typeof T=="function"?T:null)}var L={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},N=Object.assign,H={};function P(T,B,E){this.props=T,this.context=B,this.refs=H,this.updater=E||L}P.prototype.isReactComponent={},P.prototype.setState=function(T,B){if(typeof T!="object"&&typeof T!="function"&&T!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,T,B,"setState")},P.prototype.forceUpdate=function(T){this.updater.enqueueForceUpdate(this,T,"forceUpdate")};function G(){}G.prototype=P.prototype;function q(T,B,E){this.props=T,this.context=B,this.refs=H,this.updater=E||L}var ce=q.prototype=new G;ce.constructor=q,N(ce,P.prototype),ce.isPureReactComponent=!0;var be=Array.isArray;function X(){}var R={H:null,A:null,T:null,S:null},ne=Object.prototype.hasOwnProperty;function pe(T,B,E){var ie=E.ref;return{$$typeof:a,type:T,key:B,ref:ie!==void 0?ie:null,props:E}}function ue(T,B){return pe(T.type,B,T.props)}function ae(T){return typeof T=="object"&&T!==null&&T.$$typeof===a}function ee(T){var B={"=":"=0",":":"=2"};return"$"+T.replace(/[=:]/g,function(E){return B[E]})}var Te=/\/+/g;function de(T,B){return typeof T=="object"&&T!==null&&T.key!=null?ee(""+T.key):B.toString(36)}function J(T){switch(T.status){case"fulfilled":return T.value;case"rejected":throw T.reason;default:switch(typeof T.status=="string"?T.then(X,X):(T.status="pending",T.then(function(B){T.status==="pending"&&(T.status="fulfilled",T.value=B)},function(B){T.status==="pending"&&(T.status="rejected",T.reason=B)})),T.status){case"fulfilled":return T.value;case"rejected":throw T.reason}}throw T}function C(T,B,E,ie,ye){var ge=typeof T;(ge==="undefined"||ge==="boolean")&&(T=null);var Ie=!1;if(T===null)Ie=!0;else switch(ge){case"bigint":case"string":case"number":Ie=!0;break;case"object":switch(T.$$typeof){case a:case r:Ie=!0;break;case y:return Ie=T._init,C(Ie(T._payload),B,E,ie,ye)}}if(Ie)return ye=ye(T),Ie=ie===""?"."+de(T,0):ie,be(ye)?(E="",Ie!=null&&(E=Ie.replace(Te,"$&/")+"/"),C(ye,B,E,"",function(qn){return qn})):ye!=null&&(ae(ye)&&(ye=ue(ye,E+(ye.key==null||T&&T.key===ye.key?"":(""+ye.key).replace(Te,"$&/")+"/")+Ie)),B.push(ye)),1;Ie=0;var Je=ie===""?".":ie+":";if(be(T))for(var Ke=0;Ke<T.length;Ke++)ie=T[Ke],ge=Je+de(ie,Ke),Ie+=C(ie,B,E,ge,ye);else if(Ke=v(T),typeof Ke=="function")for(T=Ke.call(T),Ke=0;!(ie=T.next()).done;)ie=ie.value,ge=Je+de(ie,Ke++),Ie+=C(ie,B,E,ge,ye);else if(ge==="object"){if(typeof T.then=="function")return C(J(T),B,E,ie,ye);throw B=String(T),Error("Objects are not valid as a React child (found: "+(B==="[object Object]"?"object with keys {"+Object.keys(T).join(", ")+"}":B)+"). If you meant to render a collection of children, use an array instead.")}return Ie}function K(T,B,E){if(T==null)return T;var ie=[],ye=0;return C(T,ie,"","",function(ge){return B.call(E,ge,ye++)}),ie}function re(T){if(T._status===-1){var B=T._result;B=B(),B.then(function(E){(T._status===0||T._status===-1)&&(T._status=1,T._result=E)},function(E){(T._status===0||T._status===-1)&&(T._status=2,T._result=E)}),T._status===-1&&(T._status=0,T._result=B)}if(T._status===1)return T._result.default;throw T._result}var _e=typeof reportError=="function"?reportError:function(T){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var B=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof T=="object"&&T!==null&&typeof T.message=="string"?String(T.message):String(T),error:T});if(!window.dispatchEvent(B))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",T);return}console.error(T)},D={map:K,forEach:function(T,B,E){K(T,function(){B.apply(this,arguments)},E)},count:function(T){var B=0;return K(T,function(){B++}),B},toArray:function(T){return K(T,function(B){return B})||[]},only:function(T){if(!ae(T))throw Error("React.Children.only expected to receive a single React element child.");return T}};return Me.Activity=b,Me.Children=D,Me.Component=P,Me.Fragment=l,Me.Profiler=c,Me.PureComponent=q,Me.StrictMode=s,Me.Suspense=g,Me.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=R,Me.__COMPILER_RUNTIME={__proto__:null,c:function(T){return R.H.useMemoCache(T)}},Me.cache=function(T){return function(){return T.apply(null,arguments)}},Me.cacheSignal=function(){return null},Me.cloneElement=function(T,B,E){if(T==null)throw Error("The argument must be a React element, but you passed "+T+".");var ie=N({},T.props),ye=T.key;if(B!=null)for(ge in B.key!==void 0&&(ye=""+B.key),B)!ne.call(B,ge)||ge==="key"||ge==="__self"||ge==="__source"||ge==="ref"&&B.ref===void 0||(ie[ge]=B[ge]);var ge=arguments.length-2;if(ge===1)ie.children=E;else if(1<ge){for(var Ie=Array(ge),Je=0;Je<ge;Je++)Ie[Je]=arguments[Je+2];ie.children=Ie}return pe(T.type,ye,ie)},Me.createContext=function(T){return T={$$typeof:f,_currentValue:T,_currentValue2:T,_threadCount:0,Provider:null,Consumer:null},T.Provider=T,T.Consumer={$$typeof:d,_context:T},T},Me.createElement=function(T,B,E){var ie,ye={},ge=null;if(B!=null)for(ie in B.key!==void 0&&(ge=""+B.key),B)ne.call(B,ie)&&ie!=="key"&&ie!=="__self"&&ie!=="__source"&&(ye[ie]=B[ie]);var Ie=arguments.length-2;if(Ie===1)ye.children=E;else if(1<Ie){for(var Je=Array(Ie),Ke=0;Ke<Ie;Ke++)Je[Ke]=arguments[Ke+2];ye.children=Je}if(T&&T.defaultProps)for(ie in Ie=T.defaultProps,Ie)ye[ie]===void 0&&(ye[ie]=Ie[ie]);return pe(T,ge,ye)},Me.createRef=function(){return{current:null}},Me.forwardRef=function(T){return{$$typeof:h,render:T}},Me.isValidElement=ae,Me.lazy=function(T){return{$$typeof:y,_payload:{_status:-1,_result:T},_init:re}},Me.memo=function(T,B){return{$$typeof:p,type:T,compare:B===void 0?null:B}},Me.startTransition=function(T){var B=R.T,E={};R.T=E;try{var ie=T(),ye=R.S;ye!==null&&ye(E,ie),typeof ie=="object"&&ie!==null&&typeof ie.then=="function"&&ie.then(X,_e)}catch(ge){_e(ge)}finally{B!==null&&E.types!==null&&(B.types=E.types),R.T=B}},Me.unstable_useCacheRefresh=function(){return R.H.useCacheRefresh()},Me.use=function(T){return R.H.use(T)},Me.useActionState=function(T,B,E){return R.H.useActionState(T,B,E)},Me.useCallback=function(T,B){return R.H.useCallback(T,B)},Me.useContext=function(T){return R.H.useContext(T)},Me.useDebugValue=function(){},Me.useDeferredValue=function(T,B){return R.H.useDeferredValue(T,B)},Me.useEffect=function(T,B){return R.H.useEffect(T,B)},Me.useEffectEvent=function(T){return R.H.useEffectEvent(T)},Me.useId=function(){return R.H.useId()},Me.useImperativeHandle=function(T,B,E){return R.H.useImperativeHandle(T,B,E)},Me.useInsertionEffect=function(T,B){return R.H.useInsertionEffect(T,B)},Me.useLayoutEffect=function(T,B){return R.H.useLayoutEffect(T,B)},Me.useMemo=function(T,B){return R.H.useMemo(T,B)},Me.useOptimistic=function(T,B){return R.H.useOptimistic(T,B)},Me.useReducer=function(T,B,E){return R.H.useReducer(T,B,E)},Me.useRef=function(T){return R.H.useRef(T)},Me.useState=function(T){return R.H.useState(T)},Me.useSyncExternalStore=function(T,B,E){return R.H.useSyncExternalStore(T,B,E)},Me.useTransition=function(){return R.H.useTransition()},Me.version="19.2.3",Me}var lm;function Qc(){return lm||(lm=1,pc.exports=I1()),pc.exports}var F=Qc();const vg=Js(F),M1=zg({__proto__:null,default:vg},[F]);var hc={exports:{}},ul={},mc={exports:{}},gc={};var sm;function _1(){return sm||(sm=1,(function(a){function r(C,K){var re=C.length;C.push(K);e:for(;0<re;){var _e=re-1>>>1,D=C[_e];if(0<c(D,K))C[_e]=K,C[re]=D,re=_e;else break e}}function l(C){return C.length===0?null:C[0]}function s(C){if(C.length===0)return null;var K=C[0],re=C.pop();if(re!==K){C[0]=re;e:for(var _e=0,D=C.length,T=D>>>1;_e<T;){var B=2*(_e+1)-1,E=C[B],ie=B+1,ye=C[ie];if(0>c(E,re))ie<D&&0>c(ye,E)?(C[_e]=ye,C[ie]=re,_e=ie):(C[_e]=E,C[B]=re,_e=B);else if(ie<D&&0>c(ye,re))C[_e]=ye,C[ie]=re,_e=ie;else break e}}return K}function c(C,K){var re=C.sortIndex-K.sortIndex;return re!==0?re:C.id-K.id}if(a.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var d=performance;a.unstable_now=function(){return d.now()}}else{var f=Date,h=f.now();a.unstable_now=function(){return f.now()-h}}var g=[],p=[],y=1,b=null,S=3,v=!1,L=!1,N=!1,H=!1,P=typeof setTimeout=="function"?setTimeout:null,G=typeof clearTimeout=="function"?clearTimeout:null,q=typeof setImmediate<"u"?setImmediate:null;function ce(C){for(var K=l(p);K!==null;){if(K.callback===null)s(p);else if(K.startTime<=C)s(p),K.sortIndex=K.expirationTime,r(g,K);else break;K=l(p)}}function be(C){if(N=!1,ce(C),!L)if(l(g)!==null)L=!0,X||(X=!0,ee());else{var K=l(p);K!==null&&J(be,K.startTime-C)}}var X=!1,R=-1,ne=5,pe=-1;function ue(){return H?!0:!(a.unstable_now()-pe<ne)}function ae(){if(H=!1,X){var C=a.unstable_now();pe=C;var K=!0;try{e:{L=!1,N&&(N=!1,G(R),R=-1),v=!0;var re=S;try{n:{for(ce(C),b=l(g);b!==null&&!(b.expirationTime>C&&ue());){var _e=b.callback;if(typeof _e=="function"){b.callback=null,S=b.priorityLevel;var D=_e(b.expirationTime<=C);if(C=a.unstable_now(),typeof D=="function"){b.callback=D,ce(C),K=!0;break n}b===l(g)&&s(g),ce(C)}else s(g);b=l(g)}if(b!==null)K=!0;else{var T=l(p);T!==null&&J(be,T.startTime-C),K=!1}}break e}finally{b=null,S=re,v=!1}K=void 0}}finally{K?ee():X=!1}}}var ee;if(typeof q=="function")ee=function(){q(ae)};else if(typeof MessageChannel<"u"){var Te=new MessageChannel,de=Te.port2;Te.port1.onmessage=ae,ee=function(){de.postMessage(null)}}else ee=function(){P(ae,0)};function J(C,K){R=P(function(){C(a.unstable_now())},K)}a.unstable_IdlePriority=5,a.unstable_ImmediatePriority=1,a.unstable_LowPriority=4,a.unstable_NormalPriority=3,a.unstable_Profiling=null,a.unstable_UserBlockingPriority=2,a.unstable_cancelCallback=function(C){C.callback=null},a.unstable_forceFrameRate=function(C){0>C||125<C?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):ne=0<C?Math.floor(1e3/C):5},a.unstable_getCurrentPriorityLevel=function(){return S},a.unstable_next=function(C){switch(S){case 1:case 2:case 3:var K=3;break;default:K=S}var re=S;S=K;try{return C()}finally{S=re}},a.unstable_requestPaint=function(){H=!0},a.unstable_runWithPriority=function(C,K){switch(C){case 1:case 2:case 3:case 4:case 5:break;default:C=3}var re=S;S=C;try{return K()}finally{S=re}},a.unstable_scheduleCallback=function(C,K,re){var _e=a.unstable_now();switch(typeof re=="object"&&re!==null?(re=re.delay,re=typeof re=="number"&&0<re?_e+re:_e):re=_e,C){case 1:var D=-1;break;case 2:D=250;break;case 5:D=1073741823;break;case 4:D=1e4;break;default:D=5e3}return D=re+D,C={id:y++,callback:K,priorityLevel:C,startTime:re,expirationTime:D,sortIndex:-1},re>_e?(C.sortIndex=re,r(p,C),l(g)===null&&C===l(p)&&(N?(G(R),R=-1):N=!0,J(be,re-_e))):(C.sortIndex=D,r(g,C),L||v||(L=!0,X||(X=!0,ee()))),C},a.unstable_shouldYield=ue,a.unstable_wrapCallback=function(C){var K=S;return function(){var re=S;S=K;try{return C.apply(this,arguments)}finally{S=re}}}})(gc)),gc}var om;function C1(){return om||(om=1,mc.exports=_1()),mc.exports}var yc={exports:{}},Xn={};var um;function L1(){if(um)return Xn;um=1;var a=Qc();function r(g){var p="https://react.dev/errors/"+g;if(1<arguments.length){p+="?args[]="+encodeURIComponent(arguments[1]);for(var y=2;y<arguments.length;y++)p+="&args[]="+encodeURIComponent(arguments[y])}return"Minified React error #"+g+"; visit "+p+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function l(){}var s={d:{f:l,r:function(){throw Error(r(522))},D:l,C:l,L:l,m:l,X:l,S:l,M:l},p:0,findDOMNode:null},c=Symbol.for("react.portal");function d(g,p,y){var b=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:c,key:b==null?null:""+b,children:g,containerInfo:p,implementation:y}}var f=a.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function h(g,p){if(g==="font")return"";if(typeof p=="string")return p==="use-credentials"?p:""}return Xn.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=s,Xn.createPortal=function(g,p){var y=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!p||p.nodeType!==1&&p.nodeType!==9&&p.nodeType!==11)throw Error(r(299));return d(g,p,null,y)},Xn.flushSync=function(g){var p=f.T,y=s.p;try{if(f.T=null,s.p=2,g)return g()}finally{f.T=p,s.p=y,s.d.f()}},Xn.preconnect=function(g,p){typeof g=="string"&&(p?(p=p.crossOrigin,p=typeof p=="string"?p==="use-credentials"?p:"":void 0):p=null,s.d.C(g,p))},Xn.prefetchDNS=function(g){typeof g=="string"&&s.d.D(g)},Xn.preinit=function(g,p){if(typeof g=="string"&&p&&typeof p.as=="string"){var y=p.as,b=h(y,p.crossOrigin),S=typeof p.integrity=="string"?p.integrity:void 0,v=typeof p.fetchPriority=="string"?p.fetchPriority:void 0;y==="style"?s.d.S(g,typeof p.precedence=="string"?p.precedence:void 0,{crossOrigin:b,integrity:S,fetchPriority:v}):y==="script"&&s.d.X(g,{crossOrigin:b,integrity:S,fetchPriority:v,nonce:typeof p.nonce=="string"?p.nonce:void 0})}},Xn.preinitModule=function(g,p){if(typeof g=="string")if(typeof p=="object"&&p!==null){if(p.as==null||p.as==="script"){var y=h(p.as,p.crossOrigin);s.d.M(g,{crossOrigin:y,integrity:typeof p.integrity=="string"?p.integrity:void 0,nonce:typeof p.nonce=="string"?p.nonce:void 0})}}else p==null&&s.d.M(g)},Xn.preload=function(g,p){if(typeof g=="string"&&typeof p=="object"&&p!==null&&typeof p.as=="string"){var y=p.as,b=h(y,p.crossOrigin);s.d.L(g,y,{crossOrigin:b,integrity:typeof p.integrity=="string"?p.integrity:void 0,nonce:typeof p.nonce=="string"?p.nonce:void 0,type:typeof p.type=="string"?p.type:void 0,fetchPriority:typeof p.fetchPriority=="string"?p.fetchPriority:void 0,referrerPolicy:typeof p.referrerPolicy=="string"?p.referrerPolicy:void 0,imageSrcSet:typeof p.imageSrcSet=="string"?p.imageSrcSet:void 0,imageSizes:typeof p.imageSizes=="string"?p.imageSizes:void 0,media:typeof p.media=="string"?p.media:void 0})}},Xn.preloadModule=function(g,p){if(typeof g=="string")if(p){var y=h(p.as,p.crossOrigin);s.d.m(g,{as:typeof p.as=="string"&&p.as!=="script"?p.as:void 0,crossOrigin:y,integrity:typeof p.integrity=="string"?p.integrity:void 0})}else s.d.m(g)},Xn.requestFormReset=function(g){s.d.r(g)},Xn.unstable_batchedUpdates=function(g,p){return g(p)},Xn.useFormState=function(g,p,y){return f.H.useFormState(g,p,y)},Xn.useFormStatus=function(){return f.H.useHostTransitionStatus()},Xn.version="19.2.3",Xn}var cm;function Sg(){if(cm)return yc.exports;cm=1;function a(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(a)}catch(r){console.error(r)}}return a(),yc.exports=L1(),yc.exports}var dm;function O1(){if(dm)return ul;dm=1;var a=C1(),r=Qc(),l=Sg();function s(e){var n="https://react.dev/errors/"+e;if(1<arguments.length){n+="?args[]="+encodeURIComponent(arguments[1]);for(var t=2;t<arguments.length;t++)n+="&args[]="+encodeURIComponent(arguments[t])}return"Minified React error #"+e+"; visit "+n+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function c(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function d(e){var n=e,t=e;if(e.alternate)for(;n.return;)n=n.return;else{e=n;do n=e,(n.flags&4098)!==0&&(t=n.return),e=n.return;while(e)}return n.tag===3?t:null}function f(e){if(e.tag===13){var n=e.memoizedState;if(n===null&&(e=e.alternate,e!==null&&(n=e.memoizedState)),n!==null)return n.dehydrated}return null}function h(e){if(e.tag===31){var n=e.memoizedState;if(n===null&&(e=e.alternate,e!==null&&(n=e.memoizedState)),n!==null)return n.dehydrated}return null}function g(e){if(d(e)!==e)throw Error(s(188))}function p(e){var n=e.alternate;if(!n){if(n=d(e),n===null)throw Error(s(188));return n!==e?null:e}for(var t=e,i=n;;){var o=t.return;if(o===null)break;var u=o.alternate;if(u===null){if(i=o.return,i!==null){t=i;continue}break}if(o.child===u.child){for(u=o.child;u;){if(u===t)return g(o),e;if(u===i)return g(o),n;u=u.sibling}throw Error(s(188))}if(t.return!==i.return)t=o,i=u;else{for(var m=!1,z=o.child;z;){if(z===t){m=!0,t=o,i=u;break}if(z===i){m=!0,i=o,t=u;break}z=z.sibling}if(!m){for(z=u.child;z;){if(z===t){m=!0,t=u,i=o;break}if(z===i){m=!0,i=u,t=o;break}z=z.sibling}if(!m)throw Error(s(189))}}if(t.alternate!==i)throw Error(s(190))}if(t.tag!==3)throw Error(s(188));return t.stateNode.current===t?e:n}function y(e){var n=e.tag;if(n===5||n===26||n===27||n===6)return e;for(e=e.child;e!==null;){if(n=y(e),n!==null)return n;e=e.sibling}return null}var b=Object.assign,S=Symbol.for("react.element"),v=Symbol.for("react.transitional.element"),L=Symbol.for("react.portal"),N=Symbol.for("react.fragment"),H=Symbol.for("react.strict_mode"),P=Symbol.for("react.profiler"),G=Symbol.for("react.consumer"),q=Symbol.for("react.context"),ce=Symbol.for("react.forward_ref"),be=Symbol.for("react.suspense"),X=Symbol.for("react.suspense_list"),R=Symbol.for("react.memo"),ne=Symbol.for("react.lazy"),pe=Symbol.for("react.activity"),ue=Symbol.for("react.memo_cache_sentinel"),ae=Symbol.iterator;function ee(e){return e===null||typeof e!="object"?null:(e=ae&&e[ae]||e["@@iterator"],typeof e=="function"?e:null)}var Te=Symbol.for("react.client.reference");function de(e){if(e==null)return null;if(typeof e=="function")return e.$$typeof===Te?null:e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case N:return"Fragment";case P:return"Profiler";case H:return"StrictMode";case be:return"Suspense";case X:return"SuspenseList";case pe:return"Activity"}if(typeof e=="object")switch(e.$$typeof){case L:return"Portal";case q:return e.displayName||"Context";case G:return(e._context.displayName||"Context")+".Consumer";case ce:var n=e.render;return e=e.displayName,e||(e=n.displayName||n.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case R:return n=e.displayName||null,n!==null?n:de(e.type)||"Memo";case ne:n=e._payload,e=e._init;try{return de(e(n))}catch{}}return null}var J=Array.isArray,C=r.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,K=l.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,re={pending:!1,data:null,method:null,action:null},_e=[],D=-1;function T(e){return{current:e}}function B(e){0>D||(e.current=_e[D],_e[D]=null,D--)}function E(e,n){D++,_e[D]=e.current,e.current=n}var ie=T(null),ye=T(null),ge=T(null),Ie=T(null);function Je(e,n){switch(E(ge,n),E(ye,e),E(ie,null),n.nodeType){case 9:case 11:e=(e=n.documentElement)&&(e=e.namespaceURI)?Ah(e):0;break;default:if(e=n.tagName,n=n.namespaceURI)n=Ah(n),e=wh(n,e);else switch(e){case"svg":e=1;break;case"math":e=2;break;default:e=0}}B(ie),E(ie,e)}function Ke(){B(ie),B(ye),B(ge)}function qn(e){e.memoizedState!==null&&E(Ie,e);var n=ie.current,t=wh(n,e.type);n!==t&&(E(ye,e),E(ie,t))}function Mt(e){ye.current===e&&(B(ie),B(ye)),Ie.current===e&&(B(Ie),il._currentValue=re)}var Dn,_t;function yt(e){if(Dn===void 0)try{throw Error()}catch(t){var n=t.stack.trim().match(/\n( *(at )?)/);Dn=n&&n[1]||"",_t=-1<t.stack.indexOf(`
    at`)?" (<anonymous>)":-1<t.stack.indexOf("@")?"@unknown:0:0":""}return`
`+Dn+e+_t}var za=!1;function Yn(e,n){if(!e||za)return"";za=!0;var t=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var i={DetermineComponentFrameRoot:function(){try{if(n){var Y=function(){throw Error()};if(Object.defineProperty(Y.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(Y,[])}catch(U){var O=U}Reflect.construct(e,[],Y)}else{try{Y.call()}catch(U){O=U}e.call(Y.prototype)}}else{try{throw Error()}catch(U){O=U}(Y=e())&&typeof Y.catch=="function"&&Y.catch(function(){})}}catch(U){if(U&&O&&typeof U.stack=="string")return[U.stack,O.stack]}return[null,null]}};i.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var o=Object.getOwnPropertyDescriptor(i.DetermineComponentFrameRoot,"name");o&&o.configurable&&Object.defineProperty(i.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var u=i.DetermineComponentFrameRoot(),m=u[0],z=u[1];if(m&&z){var x=m.split(`
`),_=z.split(`
`);for(o=i=0;i<x.length&&!x[i].includes("DetermineComponentFrameRoot");)i++;for(;o<_.length&&!_[o].includes("DetermineComponentFrameRoot");)o++;if(i===x.length||o===_.length)for(i=x.length-1,o=_.length-1;1<=i&&0<=o&&x[i]!==_[o];)o--;for(;1<=i&&0<=o;i--,o--)if(x[i]!==_[o]){if(i!==1||o!==1)do if(i--,o--,0>o||x[i]!==_[o]){var j=`
`+x[i].replace(" at new "," at ");return e.displayName&&j.includes("<anonymous>")&&(j=j.replace("<anonymous>",e.displayName)),j}while(1<=i&&0<=o);break}}}finally{za=!1,Error.prepareStackTrace=t}return(t=e?e.displayName||e.name:"")?yt(t):""}function ki(e,n){switch(e.tag){case 26:case 27:case 5:return yt(e.type);case 16:return yt("Lazy");case 13:return e.child!==n&&n!==null?yt("Suspense Fallback"):yt("Suspense");case 19:return yt("SuspenseList");case 0:case 15:return Yn(e.type,!1);case 11:return Yn(e.type.render,!1);case 1:return Yn(e.type,!0);case 31:return yt("Activity");default:return""}}function Ii(e){try{var n="",t=null;do n+=ki(e,t),t=e,e=e.return;while(e);return n}catch(i){return`
Error generating stack: `+i.message+`
`+i.stack}}var Qt=Object.prototype.hasOwnProperty,va=a.unstable_scheduleCallback,ei=a.unstable_cancelCallback,zr=a.unstable_shouldYield,vr=a.unstable_requestPaint,bn=a.unstable_now,Kt=a.unstable_getCurrentPriorityLevel,Z=a.unstable_ImmediatePriority,te=a.unstable_UserBlockingPriority,ve=a.unstable_NormalPriority,Ae=a.unstable_LowPriority,Ve=a.unstable_IdlePriority,Ln=a.log,Ct=a.unstable_setDisableYieldValue,mn=null,zn=null;function Nn(e){if(typeof Ln=="function"&&Ct(e),zn&&typeof zn.setStrictMode=="function")try{zn.setStrictMode(mn,e)}catch{}}var Fe=Math.clz32?Math.clz32:Mi,Bt=Math.log,Gn=Math.LN2;function Mi(e){return e>>>=0,e===0?32:31-(Bt(e)/Gn|0)|0}var ni=256,Sa=262144,Ea=4194304;function Ft(e){var n=e&42;if(n!==0)return n;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&261888;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function ti(e,n,t){var i=e.pendingLanes;if(i===0)return 0;var o=0,u=e.suspendedLanes,m=e.pingedLanes;e=e.warmLanes;var z=i&134217727;return z!==0?(i=z&~u,i!==0?o=Ft(i):(m&=z,m!==0?o=Ft(m):t||(t=z&~e,t!==0&&(o=Ft(t))))):(z=i&~u,z!==0?o=Ft(z):m!==0?o=Ft(m):t||(t=i&~e,t!==0&&(o=Ft(t)))),o===0?0:n!==0&&n!==o&&(n&u)===0&&(u=o&-o,t=n&-n,u>=t||u===32&&(t&4194048)!==0)?n:o}function ai(e,n){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&n)===0}function kl(e,n){switch(e){case 1:case 2:case 4:case 8:case 64:return n+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return n+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function ii(){var e=Ea;return Ea<<=1,(Ea&62914560)===0&&(Ea=4194304),e}function Da(e){for(var n=[],t=0;31>t;t++)n.push(e);return n}function ri(e,n){e.pendingLanes|=n,n!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function ao(e,n,t,i,o,u){var m=e.pendingLanes;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=t,e.entangledLanes&=t,e.errorRecoveryDisabledLanes&=t,e.shellSuspendCounter=0;var z=e.entanglements,x=e.expirationTimes,_=e.hiddenUpdates;for(t=m&~t;0<t;){var j=31-Fe(t),Y=1<<j;z[j]=0,x[j]=-1;var O=_[j];if(O!==null)for(_[j]=null,j=0;j<O.length;j++){var U=O[j];U!==null&&(U.lane&=-536870913)}t&=~Y}i!==0&&A(e,i,0),u!==0&&o===0&&e.tag!==0&&(e.suspendedLanes|=u&~(m&~n))}function A(e,n,t){e.pendingLanes|=n,e.suspendedLanes&=~n;var i=31-Fe(n);e.entangledLanes|=n,e.entanglements[i]=e.entanglements[i]|1073741824|t&261930}function I(e,n){var t=e.entangledLanes|=n;for(e=e.entanglements;t;){var i=31-Fe(t),o=1<<i;o&n|e[i]&n&&(e[i]|=n),t&=~o}}function W(e,n){var t=n&-n;return t=(t&42)!==0?1:Q(t),(t&(e.suspendedLanes|n))!==0?0:t}function Q(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function le(e){return e&=-e,2<e?8<e?(e&134217727)!==0?32:268435456:8:2}function Se(){var e=K.p;return e!==0?e:(e=window.event,e===void 0?32:Kh(e.type))}function xe(e,n){var t=K.p;try{return K.p=e,n()}finally{K.p=t}}var fe=Math.random().toString(36).slice(2),oe="__reactFiber$"+fe,se="__reactProps$"+fe,me="__reactContainer$"+fe,ke="__reactEvents$"+fe,Be="__reactListeners$"+fe,_n="__reactHandles$"+fe,$e="__reactResources$"+fe,We="__reactMarker$"+fe;function on(e){delete e[oe],delete e[se],delete e[ke],delete e[Be],delete e[_n]}function lt(e){var n=e[oe];if(n)return n;for(var t=e.parentNode;t;){if(n=t[me]||t[oe]){if(t=n.alternate,n.child!==null||t!==null&&t.child!==null)for(e=Lh(e);e!==null;){if(t=e[oe])return t;e=Lh(e)}return n}e=t,t=e.parentNode}return null}function bt(e){if(e=e[oe]||e[me]){var n=e.tag;if(n===5||n===6||n===13||n===31||n===26||n===27||n===3)return e}return null}function Zn(e){var n=e.tag;if(n===5||n===26||n===27||n===6)return e.stateNode;throw Error(s(33))}function Wn(e){var n=e[$e];return n||(n=e[$e]={hoistableStyles:new Map,hoistableScripts:new Map}),n}function vn(e){e[We]=!0}var xa=new Set,jt={};function zt(e,n){Lt(e,n),Lt(e+"Capture",n)}function Lt(e,n){for(jt[e]=n,e=0;e<n.length;e++)xa.add(n[e])}var Ze=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),dn={},Jt={};function li(e){return Qt.call(Jt,e)?!0:Qt.call(dn,e)?!1:Ze.test(e)?Jt[e]=!0:(dn[e]=!0,!1)}function fn(e,n,t){if(li(n))if(t===null)e.removeAttribute(n);else{switch(typeof t){case"undefined":case"function":case"symbol":e.removeAttribute(n);return;case"boolean":var i=n.toLowerCase().slice(0,5);if(i!=="data-"&&i!=="aria-"){e.removeAttribute(n);return}}e.setAttribute(n,""+t)}}function Ot(e,n,t){if(t===null)e.removeAttribute(n);else{switch(typeof t){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(n);return}e.setAttribute(n,""+t)}}function vt(e,n,t,i){if(i===null)e.removeAttribute(t);else{switch(typeof i){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(t);return}e.setAttributeNS(n,t,""+i)}}function Qn(e){switch(typeof e){case"bigint":case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function yd(e){var n=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(n==="checkbox"||n==="radio")}function Sy(e,n,t){var i=Object.getOwnPropertyDescriptor(e.constructor.prototype,n);if(!e.hasOwnProperty(n)&&typeof i<"u"&&typeof i.get=="function"&&typeof i.set=="function"){var o=i.get,u=i.set;return Object.defineProperty(e,n,{configurable:!0,get:function(){return o.call(this)},set:function(m){t=""+m,u.call(this,m)}}),Object.defineProperty(e,n,{enumerable:i.enumerable}),{getValue:function(){return t},setValue:function(m){t=""+m},stopTracking:function(){e._valueTracker=null,delete e[n]}}}}function io(e){if(!e._valueTracker){var n=yd(e)?"checked":"value";e._valueTracker=Sy(e,n,""+e[n])}}function bd(e){if(!e)return!1;var n=e._valueTracker;if(!n)return!0;var t=n.getValue(),i="";return e&&(i=yd(e)?e.checked?"true":"false":e.value),e=i,e!==t?(n.setValue(e),!0):!1}function Il(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}var Ey=/[\n"\\]/g;function St(e){return e.replace(Ey,function(n){return"\\"+n.charCodeAt(0).toString(16)+" "})}function ro(e,n,t,i,o,u,m,z){e.name="",m!=null&&typeof m!="function"&&typeof m!="symbol"&&typeof m!="boolean"?e.type=m:e.removeAttribute("type"),n!=null?m==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+Qn(n)):e.value!==""+Qn(n)&&(e.value=""+Qn(n)):m!=="submit"&&m!=="reset"||e.removeAttribute("value"),n!=null?lo(e,m,Qn(n)):t!=null?lo(e,m,Qn(t)):i!=null&&e.removeAttribute("value"),o==null&&u!=null&&(e.defaultChecked=!!u),o!=null&&(e.checked=o&&typeof o!="function"&&typeof o!="symbol"),z!=null&&typeof z!="function"&&typeof z!="symbol"&&typeof z!="boolean"?e.name=""+Qn(z):e.removeAttribute("name")}function zd(e,n,t,i,o,u,m,z){if(u!=null&&typeof u!="function"&&typeof u!="symbol"&&typeof u!="boolean"&&(e.type=u),n!=null||t!=null){if(!(u!=="submit"&&u!=="reset"||n!=null)){io(e);return}t=t!=null?""+Qn(t):"",n=n!=null?""+Qn(n):t,z||n===e.value||(e.value=n),e.defaultValue=n}i=i??o,i=typeof i!="function"&&typeof i!="symbol"&&!!i,e.checked=z?e.checked:!!i,e.defaultChecked=!!i,m!=null&&typeof m!="function"&&typeof m!="symbol"&&typeof m!="boolean"&&(e.name=m),io(e)}function lo(e,n,t){n==="number"&&Il(e.ownerDocument)===e||e.defaultValue===""+t||(e.defaultValue=""+t)}function _i(e,n,t,i){if(e=e.options,n){n={};for(var o=0;o<t.length;o++)n["$"+t[o]]=!0;for(t=0;t<e.length;t++)o=n.hasOwnProperty("$"+e[t].value),e[t].selected!==o&&(e[t].selected=o),o&&i&&(e[t].defaultSelected=!0)}else{for(t=""+Qn(t),n=null,o=0;o<e.length;o++){if(e[o].value===t){e[o].selected=!0,i&&(e[o].defaultSelected=!0);return}n!==null||e[o].disabled||(n=e[o])}n!==null&&(n.selected=!0)}}function vd(e,n,t){if(n!=null&&(n=""+Qn(n),n!==e.value&&(e.value=n),t==null)){e.defaultValue!==n&&(e.defaultValue=n);return}e.defaultValue=t!=null?""+Qn(t):""}function Sd(e,n,t,i){if(n==null){if(i!=null){if(t!=null)throw Error(s(92));if(J(i)){if(1<i.length)throw Error(s(93));i=i[0]}t=i}t==null&&(t=""),n=t}t=Qn(n),e.defaultValue=t,i=e.textContent,i===t&&i!==""&&i!==null&&(e.value=i),io(e)}function Ci(e,n){if(n){var t=e.firstChild;if(t&&t===e.lastChild&&t.nodeType===3){t.nodeValue=n;return}}e.textContent=n}var Dy=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function Ed(e,n,t){var i=n.indexOf("--")===0;t==null||typeof t=="boolean"||t===""?i?e.setProperty(n,""):n==="float"?e.cssFloat="":e[n]="":i?e.setProperty(n,t):typeof t!="number"||t===0||Dy.has(n)?n==="float"?e.cssFloat=t:e[n]=(""+t).trim():e[n]=t+"px"}function Dd(e,n,t){if(n!=null&&typeof n!="object")throw Error(s(62));if(e=e.style,t!=null){for(var i in t)!t.hasOwnProperty(i)||n!=null&&n.hasOwnProperty(i)||(i.indexOf("--")===0?e.setProperty(i,""):i==="float"?e.cssFloat="":e[i]="");for(var o in n)i=n[o],n.hasOwnProperty(o)&&t[o]!==i&&Ed(e,o,i)}else for(var u in n)n.hasOwnProperty(u)&&Ed(e,u,n[u])}function so(e){if(e.indexOf("-")===-1)return!1;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var xy=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),Ty=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function Ml(e){return Ty.test(""+e)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":e}function $t(){}var oo=null;function uo(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Li=null,Oi=null;function xd(e){var n=bt(e);if(n&&(e=n.stateNode)){var t=e[se]||null;e:switch(e=n.stateNode,n.type){case"input":if(ro(e,t.value,t.defaultValue,t.defaultValue,t.checked,t.defaultChecked,t.type,t.name),n=t.name,t.type==="radio"&&n!=null){for(t=e;t.parentNode;)t=t.parentNode;for(t=t.querySelectorAll('input[name="'+St(""+n)+'"][type="radio"]'),n=0;n<t.length;n++){var i=t[n];if(i!==e&&i.form===e.form){var o=i[se]||null;if(!o)throw Error(s(90));ro(i,o.value,o.defaultValue,o.defaultValue,o.checked,o.defaultChecked,o.type,o.name)}}for(n=0;n<t.length;n++)i=t[n],i.form===e.form&&bd(i)}break e;case"textarea":vd(e,t.value,t.defaultValue);break e;case"select":n=t.value,n!=null&&_i(e,!!t.multiple,n,!1)}}}var co=!1;function Td(e,n,t){if(co)return e(n,t);co=!0;try{var i=e(n);return i}finally{if(co=!1,(Li!==null||Oi!==null)&&(bs(),Li&&(n=Li,e=Oi,Oi=Li=null,xd(n),e)))for(n=0;n<e.length;n++)xd(e[n])}}function Sr(e,n){var t=e.stateNode;if(t===null)return null;var i=t[se]||null;if(i===null)return null;t=i[n];e:switch(n){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(i=!i.disabled)||(e=e.type,i=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!i;break e;default:e=!1}if(e)return null;if(t&&typeof t!="function")throw Error(s(231,n,typeof t));return t}var ea=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),fo=!1;if(ea)try{var Er={};Object.defineProperty(Er,"passive",{get:function(){fo=!0}}),window.addEventListener("test",Er,Er),window.removeEventListener("test",Er,Er)}catch{fo=!1}var Ta=null,po=null,_l=null;function Ad(){if(_l)return _l;var e,n=po,t=n.length,i,o="value"in Ta?Ta.value:Ta.textContent,u=o.length;for(e=0;e<t&&n[e]===o[e];e++);var m=t-e;for(i=1;i<=m&&n[t-i]===o[u-i];i++);return _l=o.slice(e,1<i?1-i:void 0)}function Cl(e){var n=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&n===13&&(e=13)):e=n,e===10&&(e=13),32<=e||e===13?e:0}function Ll(){return!0}function wd(){return!1}function Kn(e){function n(t,i,o,u,m){this._reactName=t,this._targetInst=o,this.type=i,this.nativeEvent=u,this.target=m,this.currentTarget=null;for(var z in e)e.hasOwnProperty(z)&&(t=e[z],this[z]=t?t(u):u[z]);return this.isDefaultPrevented=(u.defaultPrevented!=null?u.defaultPrevented:u.returnValue===!1)?Ll:wd,this.isPropagationStopped=wd,this}return b(n.prototype,{preventDefault:function(){this.defaultPrevented=!0;var t=this.nativeEvent;t&&(t.preventDefault?t.preventDefault():typeof t.returnValue!="unknown"&&(t.returnValue=!1),this.isDefaultPrevented=Ll)},stopPropagation:function(){var t=this.nativeEvent;t&&(t.stopPropagation?t.stopPropagation():typeof t.cancelBubble!="unknown"&&(t.cancelBubble=!0),this.isPropagationStopped=Ll)},persist:function(){},isPersistent:Ll}),n}var si={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Ol=Kn(si),Dr=b({},si,{view:0,detail:0}),Ay=Kn(Dr),ho,mo,xr,Nl=b({},Dr,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:yo,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==xr&&(xr&&e.type==="mousemove"?(ho=e.screenX-xr.screenX,mo=e.screenY-xr.screenY):mo=ho=0,xr=e),ho)},movementY:function(e){return"movementY"in e?e.movementY:mo}}),Rd=Kn(Nl),wy=b({},Nl,{dataTransfer:0}),Ry=Kn(wy),ky=b({},Dr,{relatedTarget:0}),go=Kn(ky),Iy=b({},si,{animationName:0,elapsedTime:0,pseudoElement:0}),My=Kn(Iy),_y=b({},si,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),Cy=Kn(_y),Ly=b({},si,{data:0}),kd=Kn(Ly),Oy={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Ny={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Wy={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Uy(e){var n=this.nativeEvent;return n.getModifierState?n.getModifierState(e):(e=Wy[e])?!!n[e]:!1}function yo(){return Uy}var Py=b({},Dr,{key:function(e){if(e.key){var n=Oy[e.key]||e.key;if(n!=="Unidentified")return n}return e.type==="keypress"?(e=Cl(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?Ny[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:yo,charCode:function(e){return e.type==="keypress"?Cl(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Cl(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),By=Kn(Py),jy=b({},Nl,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Id=Kn(jy),Xy=b({},Dr,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:yo}),Hy=Kn(Xy),Zy=b({},si,{propertyName:0,elapsedTime:0,pseudoElement:0}),Vy=Kn(Zy),qy=b({},Nl,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),Yy=Kn(qy),Gy=b({},si,{newState:0,oldState:0}),Qy=Kn(Gy),Ky=[9,13,27,32],bo=ea&&"CompositionEvent"in window,Tr=null;ea&&"documentMode"in document&&(Tr=document.documentMode);var Fy=ea&&"TextEvent"in window&&!Tr,Md=ea&&(!bo||Tr&&8<Tr&&11>=Tr),_d=" ",Cd=!1;function Ld(e,n){switch(e){case"keyup":return Ky.indexOf(n.keyCode)!==-1;case"keydown":return n.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Od(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var Ni=!1;function Jy(e,n){switch(e){case"compositionend":return Od(n);case"keypress":return n.which!==32?null:(Cd=!0,_d);case"textInput":return e=n.data,e===_d&&Cd?null:e;default:return null}}function $y(e,n){if(Ni)return e==="compositionend"||!bo&&Ld(e,n)?(e=Ad(),_l=po=Ta=null,Ni=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(n.ctrlKey||n.altKey||n.metaKey)||n.ctrlKey&&n.altKey){if(n.char&&1<n.char.length)return n.char;if(n.which)return String.fromCharCode(n.which)}return null;case"compositionend":return Md&&n.locale!=="ko"?null:n.data;default:return null}}var eb={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Nd(e){var n=e&&e.nodeName&&e.nodeName.toLowerCase();return n==="input"?!!eb[e.type]:n==="textarea"}function Wd(e,n,t,i){Li?Oi?Oi.push(i):Oi=[i]:Li=i,n=Ts(n,"onChange"),0<n.length&&(t=new Ol("onChange","change",null,t,i),e.push({event:t,listeners:n}))}var Ar=null,wr=null;function nb(e){vh(e,0)}function Wl(e){var n=Zn(e);if(bd(n))return e}function Ud(e,n){if(e==="change")return n}var Pd=!1;if(ea){var zo;if(ea){var vo="oninput"in document;if(!vo){var Bd=document.createElement("div");Bd.setAttribute("oninput","return;"),vo=typeof Bd.oninput=="function"}zo=vo}else zo=!1;Pd=zo&&(!document.documentMode||9<document.documentMode)}function jd(){Ar&&(Ar.detachEvent("onpropertychange",Xd),wr=Ar=null)}function Xd(e){if(e.propertyName==="value"&&Wl(wr)){var n=[];Wd(n,wr,e,uo(e)),Td(nb,n)}}function tb(e,n,t){e==="focusin"?(jd(),Ar=n,wr=t,Ar.attachEvent("onpropertychange",Xd)):e==="focusout"&&jd()}function ab(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Wl(wr)}function ib(e,n){if(e==="click")return Wl(n)}function rb(e,n){if(e==="input"||e==="change")return Wl(n)}function lb(e,n){return e===n&&(e!==0||1/e===1/n)||e!==e&&n!==n}var st=typeof Object.is=="function"?Object.is:lb;function Rr(e,n){if(st(e,n))return!0;if(typeof e!="object"||e===null||typeof n!="object"||n===null)return!1;var t=Object.keys(e),i=Object.keys(n);if(t.length!==i.length)return!1;for(i=0;i<t.length;i++){var o=t[i];if(!Qt.call(n,o)||!st(e[o],n[o]))return!1}return!0}function Hd(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Zd(e,n){var t=Hd(e);e=0;for(var i;t;){if(t.nodeType===3){if(i=e+t.textContent.length,e<=n&&i>=n)return{node:t,offset:n-e};e=i}e:{for(;t;){if(t.nextSibling){t=t.nextSibling;break e}t=t.parentNode}t=void 0}t=Hd(t)}}function Vd(e,n){return e&&n?e===n?!0:e&&e.nodeType===3?!1:n&&n.nodeType===3?Vd(e,n.parentNode):"contains"in e?e.contains(n):e.compareDocumentPosition?!!(e.compareDocumentPosition(n)&16):!1:!1}function qd(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var n=Il(e.document);n instanceof e.HTMLIFrameElement;){try{var t=typeof n.contentWindow.location.href=="string"}catch{t=!1}if(t)e=n.contentWindow;else break;n=Il(e.document)}return n}function So(e){var n=e&&e.nodeName&&e.nodeName.toLowerCase();return n&&(n==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||n==="textarea"||e.contentEditable==="true")}var sb=ea&&"documentMode"in document&&11>=document.documentMode,Wi=null,Eo=null,kr=null,Do=!1;function Yd(e,n,t){var i=t.window===t?t.document:t.nodeType===9?t:t.ownerDocument;Do||Wi==null||Wi!==Il(i)||(i=Wi,"selectionStart"in i&&So(i)?i={start:i.selectionStart,end:i.selectionEnd}:(i=(i.ownerDocument&&i.ownerDocument.defaultView||window).getSelection(),i={anchorNode:i.anchorNode,anchorOffset:i.anchorOffset,focusNode:i.focusNode,focusOffset:i.focusOffset}),kr&&Rr(kr,i)||(kr=i,i=Ts(Eo,"onSelect"),0<i.length&&(n=new Ol("onSelect","select",null,n,t),e.push({event:n,listeners:i}),n.target=Wi)))}function oi(e,n){var t={};return t[e.toLowerCase()]=n.toLowerCase(),t["Webkit"+e]="webkit"+n,t["Moz"+e]="moz"+n,t}var Ui={animationend:oi("Animation","AnimationEnd"),animationiteration:oi("Animation","AnimationIteration"),animationstart:oi("Animation","AnimationStart"),transitionrun:oi("Transition","TransitionRun"),transitionstart:oi("Transition","TransitionStart"),transitioncancel:oi("Transition","TransitionCancel"),transitionend:oi("Transition","TransitionEnd")},xo={},Gd={};ea&&(Gd=document.createElement("div").style,"AnimationEvent"in window||(delete Ui.animationend.animation,delete Ui.animationiteration.animation,delete Ui.animationstart.animation),"TransitionEvent"in window||delete Ui.transitionend.transition);function ui(e){if(xo[e])return xo[e];if(!Ui[e])return e;var n=Ui[e],t;for(t in n)if(n.hasOwnProperty(t)&&t in Gd)return xo[e]=n[t];return e}var Qd=ui("animationend"),Kd=ui("animationiteration"),Fd=ui("animationstart"),ob=ui("transitionrun"),ub=ui("transitionstart"),cb=ui("transitioncancel"),Jd=ui("transitionend"),$d=new Map,To="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");To.push("scrollEnd");function Nt(e,n){$d.set(e,n),zt(n,[e])}var Ul=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var n=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(n))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)},Et=[],Pi=0,Ao=0;function Pl(){for(var e=Pi,n=Ao=Pi=0;n<e;){var t=Et[n];Et[n++]=null;var i=Et[n];Et[n++]=null;var o=Et[n];Et[n++]=null;var u=Et[n];if(Et[n++]=null,i!==null&&o!==null){var m=i.pending;m===null?o.next=o:(o.next=m.next,m.next=o),i.pending=o}u!==0&&ef(t,o,u)}}function Bl(e,n,t,i){Et[Pi++]=e,Et[Pi++]=n,Et[Pi++]=t,Et[Pi++]=i,Ao|=i,e.lanes|=i,e=e.alternate,e!==null&&(e.lanes|=i)}function wo(e,n,t,i){return Bl(e,n,t,i),jl(e)}function ci(e,n){return Bl(e,null,null,n),jl(e)}function ef(e,n,t){e.lanes|=t;var i=e.alternate;i!==null&&(i.lanes|=t);for(var o=!1,u=e.return;u!==null;)u.childLanes|=t,i=u.alternate,i!==null&&(i.childLanes|=t),u.tag===22&&(e=u.stateNode,e===null||e._visibility&1||(o=!0)),e=u,u=u.return;return e.tag===3?(u=e.stateNode,o&&n!==null&&(o=31-Fe(t),e=u.hiddenUpdates,i=e[o],i===null?e[o]=[n]:i.push(n),n.lane=t|536870912),u):null}function jl(e){if(50<Fr)throw Fr=0,Nu=null,Error(s(185));for(var n=e.return;n!==null;)e=n,n=e.return;return e.tag===3?e.stateNode:null}var Bi={};function db(e,n,t,i){this.tag=e,this.key=t,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=n,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=i,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function ot(e,n,t,i){return new db(e,n,t,i)}function Ro(e){return e=e.prototype,!(!e||!e.isReactComponent)}function na(e,n){var t=e.alternate;return t===null?(t=ot(e.tag,n,e.key,e.mode),t.elementType=e.elementType,t.type=e.type,t.stateNode=e.stateNode,t.alternate=e,e.alternate=t):(t.pendingProps=n,t.type=e.type,t.flags=0,t.subtreeFlags=0,t.deletions=null),t.flags=e.flags&65011712,t.childLanes=e.childLanes,t.lanes=e.lanes,t.child=e.child,t.memoizedProps=e.memoizedProps,t.memoizedState=e.memoizedState,t.updateQueue=e.updateQueue,n=e.dependencies,t.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext},t.sibling=e.sibling,t.index=e.index,t.ref=e.ref,t.refCleanup=e.refCleanup,t}function nf(e,n){e.flags&=65011714;var t=e.alternate;return t===null?(e.childLanes=0,e.lanes=n,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=t.childLanes,e.lanes=t.lanes,e.child=t.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=t.memoizedProps,e.memoizedState=t.memoizedState,e.updateQueue=t.updateQueue,e.type=t.type,n=t.dependencies,e.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext}),e}function Xl(e,n,t,i,o,u){var m=0;if(i=e,typeof e=="function")Ro(e)&&(m=1);else if(typeof e=="string")m=g1(e,t,ie.current)?26:e==="html"||e==="head"||e==="body"?27:5;else e:switch(e){case pe:return e=ot(31,t,n,o),e.elementType=pe,e.lanes=u,e;case N:return di(t.children,o,u,n);case H:m=8,o|=24;break;case P:return e=ot(12,t,n,o|2),e.elementType=P,e.lanes=u,e;case be:return e=ot(13,t,n,o),e.elementType=be,e.lanes=u,e;case X:return e=ot(19,t,n,o),e.elementType=X,e.lanes=u,e;default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case q:m=10;break e;case G:m=9;break e;case ce:m=11;break e;case R:m=14;break e;case ne:m=16,i=null;break e}m=29,t=Error(s(130,e===null?"null":typeof e,"")),i=null}return n=ot(m,t,n,o),n.elementType=e,n.type=i,n.lanes=u,n}function di(e,n,t,i){return e=ot(7,e,i,n),e.lanes=t,e}function ko(e,n,t){return e=ot(6,e,null,n),e.lanes=t,e}function tf(e){var n=ot(18,null,null,0);return n.stateNode=e,n}function Io(e,n,t){return n=ot(4,e.children!==null?e.children:[],e.key,n),n.lanes=t,n.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},n}var af=new WeakMap;function Dt(e,n){if(typeof e=="object"&&e!==null){var t=af.get(e);return t!==void 0?t:(n={value:e,source:n,stack:Ii(n)},af.set(e,n),n)}return{value:e,source:n,stack:Ii(n)}}var ji=[],Xi=0,Hl=null,Ir=0,xt=[],Tt=0,Aa=null,Xt=1,Ht="";function ta(e,n){ji[Xi++]=Ir,ji[Xi++]=Hl,Hl=e,Ir=n}function rf(e,n,t){xt[Tt++]=Xt,xt[Tt++]=Ht,xt[Tt++]=Aa,Aa=e;var i=Xt;e=Ht;var o=32-Fe(i)-1;i&=~(1<<o),t+=1;var u=32-Fe(n)+o;if(30<u){var m=o-o%5;u=(i&(1<<m)-1).toString(32),i>>=m,o-=m,Xt=1<<32-Fe(n)+o|t<<o|i,Ht=u+e}else Xt=1<<u|t<<o|i,Ht=e}function Mo(e){e.return!==null&&(ta(e,1),rf(e,1,0))}function _o(e){for(;e===Hl;)Hl=ji[--Xi],ji[Xi]=null,Ir=ji[--Xi],ji[Xi]=null;for(;e===Aa;)Aa=xt[--Tt],xt[Tt]=null,Ht=xt[--Tt],xt[Tt]=null,Xt=xt[--Tt],xt[Tt]=null}function lf(e,n){xt[Tt++]=Xt,xt[Tt++]=Ht,xt[Tt++]=Aa,Xt=n.id,Ht=n.overflow,Aa=e}var Un=null,pn=null,He=!1,wa=null,At=!1,Co=Error(s(519));function Ra(e){var n=Error(s(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw Mr(Dt(n,e)),Co}function sf(e){var n=e.stateNode,t=e.type,i=e.memoizedProps;switch(n[oe]=e,n[se]=i,t){case"dialog":Pe("cancel",n),Pe("close",n);break;case"iframe":case"object":case"embed":Pe("load",n);break;case"video":case"audio":for(t=0;t<$r.length;t++)Pe($r[t],n);break;case"source":Pe("error",n);break;case"img":case"image":case"link":Pe("error",n),Pe("load",n);break;case"details":Pe("toggle",n);break;case"input":Pe("invalid",n),zd(n,i.value,i.defaultValue,i.checked,i.defaultChecked,i.type,i.name,!0);break;case"select":Pe("invalid",n);break;case"textarea":Pe("invalid",n),Sd(n,i.value,i.defaultValue,i.children)}t=i.children,typeof t!="string"&&typeof t!="number"&&typeof t!="bigint"||n.textContent===""+t||i.suppressHydrationWarning===!0||xh(n.textContent,t)?(i.popover!=null&&(Pe("beforetoggle",n),Pe("toggle",n)),i.onScroll!=null&&Pe("scroll",n),i.onScrollEnd!=null&&Pe("scrollend",n),i.onClick!=null&&(n.onclick=$t),n=!0):n=!1,n||Ra(e,!0)}function of(e){for(Un=e.return;Un;)switch(Un.tag){case 5:case 31:case 13:At=!1;return;case 27:case 3:At=!0;return;default:Un=Un.return}}function Hi(e){if(e!==Un)return!1;if(!He)return of(e),He=!0,!1;var n=e.tag,t;if((t=n!==3&&n!==27)&&((t=n===5)&&(t=e.type,t=!(t!=="form"&&t!=="button")||Fu(e.type,e.memoizedProps)),t=!t),t&&pn&&Ra(e),of(e),n===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(s(317));pn=Ch(e)}else if(n===31){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(s(317));pn=Ch(e)}else n===27?(n=pn,Xa(e.type)?(e=tc,tc=null,pn=e):pn=n):pn=Un?Rt(e.stateNode.nextSibling):null;return!0}function fi(){pn=Un=null,He=!1}function Lo(){var e=wa;return e!==null&&(et===null?et=e:et.push.apply(et,e),wa=null),e}function Mr(e){wa===null?wa=[e]:wa.push(e)}var Oo=T(null),pi=null,aa=null;function ka(e,n,t){E(Oo,n._currentValue),n._currentValue=t}function ia(e){e._currentValue=Oo.current,B(Oo)}function No(e,n,t){for(;e!==null;){var i=e.alternate;if((e.childLanes&n)!==n?(e.childLanes|=n,i!==null&&(i.childLanes|=n)):i!==null&&(i.childLanes&n)!==n&&(i.childLanes|=n),e===t)break;e=e.return}}function Wo(e,n,t,i){var o=e.child;for(o!==null&&(o.return=e);o!==null;){var u=o.dependencies;if(u!==null){var m=o.child;u=u.firstContext;e:for(;u!==null;){var z=u;u=o;for(var x=0;x<n.length;x++)if(z.context===n[x]){u.lanes|=t,z=u.alternate,z!==null&&(z.lanes|=t),No(u.return,t,e),i||(m=null);break e}u=z.next}}else if(o.tag===18){if(m=o.return,m===null)throw Error(s(341));m.lanes|=t,u=m.alternate,u!==null&&(u.lanes|=t),No(m,t,e),m=null}else m=o.child;if(m!==null)m.return=o;else for(m=o;m!==null;){if(m===e){m=null;break}if(o=m.sibling,o!==null){o.return=m.return,m=o;break}m=m.return}o=m}}function Zi(e,n,t,i){e=null;for(var o=n,u=!1;o!==null;){if(!u){if((o.flags&524288)!==0)u=!0;else if((o.flags&262144)!==0)break}if(o.tag===10){var m=o.alternate;if(m===null)throw Error(s(387));if(m=m.memoizedProps,m!==null){var z=o.type;st(o.pendingProps.value,m.value)||(e!==null?e.push(z):e=[z])}}else if(o===Ie.current){if(m=o.alternate,m===null)throw Error(s(387));m.memoizedState.memoizedState!==o.memoizedState.memoizedState&&(e!==null?e.push(il):e=[il])}o=o.return}e!==null&&Wo(n,e,t,i),n.flags|=262144}function Zl(e){for(e=e.firstContext;e!==null;){if(!st(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function hi(e){pi=e,aa=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function Pn(e){return uf(pi,e)}function Vl(e,n){return pi===null&&hi(e),uf(e,n)}function uf(e,n){var t=n._currentValue;if(n={context:n,memoizedValue:t,next:null},aa===null){if(e===null)throw Error(s(308));aa=n,e.dependencies={lanes:0,firstContext:n},e.flags|=524288}else aa=aa.next=n;return t}var fb=typeof AbortController<"u"?AbortController:function(){var e=[],n=this.signal={aborted:!1,addEventListener:function(t,i){e.push(i)}};this.abort=function(){n.aborted=!0,e.forEach(function(t){return t()})}},pb=a.unstable_scheduleCallback,hb=a.unstable_NormalPriority,An={$$typeof:q,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function Uo(){return{controller:new fb,data:new Map,refCount:0}}function _r(e){e.refCount--,e.refCount===0&&pb(hb,function(){e.controller.abort()})}var Cr=null,Po=0,Vi=0,qi=null;function mb(e,n){if(Cr===null){var t=Cr=[];Po=0,Vi=Xu(),qi={status:"pending",value:void 0,then:function(i){t.push(i)}}}return Po++,n.then(cf,cf),n}function cf(){if(--Po===0&&Cr!==null){qi!==null&&(qi.status="fulfilled");var e=Cr;Cr=null,Vi=0,qi=null;for(var n=0;n<e.length;n++)(0,e[n])()}}function gb(e,n){var t=[],i={status:"pending",value:null,reason:null,then:function(o){t.push(o)}};return e.then(function(){i.status="fulfilled",i.value=n;for(var o=0;o<t.length;o++)(0,t[o])(n)},function(o){for(i.status="rejected",i.reason=o,o=0;o<t.length;o++)(0,t[o])(void 0)}),i}var df=C.S;C.S=function(e,n){Gp=bn(),typeof n=="object"&&n!==null&&typeof n.then=="function"&&mb(e,n),df!==null&&df(e,n)};var mi=T(null);function Bo(){var e=mi.current;return e!==null?e:sn.pooledCache}function ql(e,n){n===null?E(mi,mi.current):E(mi,n.pool)}function ff(){var e=Bo();return e===null?null:{parent:An._currentValue,pool:e}}var Yi=Error(s(460)),jo=Error(s(474)),Yl=Error(s(542)),Gl={then:function(){}};function pf(e){return e=e.status,e==="fulfilled"||e==="rejected"}function hf(e,n,t){switch(t=e[t],t===void 0?e.push(n):t!==n&&(n.then($t,$t),n=t),n.status){case"fulfilled":return n.value;case"rejected":throw e=n.reason,gf(e),e;default:if(typeof n.status=="string")n.then($t,$t);else{if(e=sn,e!==null&&100<e.shellSuspendCounter)throw Error(s(482));e=n,e.status="pending",e.then(function(i){if(n.status==="pending"){var o=n;o.status="fulfilled",o.value=i}},function(i){if(n.status==="pending"){var o=n;o.status="rejected",o.reason=i}})}switch(n.status){case"fulfilled":return n.value;case"rejected":throw e=n.reason,gf(e),e}throw yi=n,Yi}}function gi(e){try{var n=e._init;return n(e._payload)}catch(t){throw t!==null&&typeof t=="object"&&typeof t.then=="function"?(yi=t,Yi):t}}var yi=null;function mf(){if(yi===null)throw Error(s(459));var e=yi;return yi=null,e}function gf(e){if(e===Yi||e===Yl)throw Error(s(483))}var Gi=null,Lr=0;function Ql(e){var n=Lr;return Lr+=1,Gi===null&&(Gi=[]),hf(Gi,e,n)}function Or(e,n){n=n.props.ref,e.ref=n!==void 0?n:null}function Kl(e,n){throw n.$$typeof===S?Error(s(525)):(e=Object.prototype.toString.call(n),Error(s(31,e==="[object Object]"?"object with keys {"+Object.keys(n).join(", ")+"}":e)))}function yf(e){function n(k,w){if(e){var M=k.deletions;M===null?(k.deletions=[w],k.flags|=16):M.push(w)}}function t(k,w){if(!e)return null;for(;w!==null;)n(k,w),w=w.sibling;return null}function i(k){for(var w=new Map;k!==null;)k.key!==null?w.set(k.key,k):w.set(k.index,k),k=k.sibling;return w}function o(k,w){return k=na(k,w),k.index=0,k.sibling=null,k}function u(k,w,M){return k.index=M,e?(M=k.alternate,M!==null?(M=M.index,M<w?(k.flags|=67108866,w):M):(k.flags|=67108866,w)):(k.flags|=1048576,w)}function m(k){return e&&k.alternate===null&&(k.flags|=67108866),k}function z(k,w,M,V){return w===null||w.tag!==6?(w=ko(M,k.mode,V),w.return=k,w):(w=o(w,M),w.return=k,w)}function x(k,w,M,V){var Ee=M.type;return Ee===N?j(k,w,M.props.children,V,M.key):w!==null&&(w.elementType===Ee||typeof Ee=="object"&&Ee!==null&&Ee.$$typeof===ne&&gi(Ee)===w.type)?(w=o(w,M.props),Or(w,M),w.return=k,w):(w=Xl(M.type,M.key,M.props,null,k.mode,V),Or(w,M),w.return=k,w)}function _(k,w,M,V){return w===null||w.tag!==4||w.stateNode.containerInfo!==M.containerInfo||w.stateNode.implementation!==M.implementation?(w=Io(M,k.mode,V),w.return=k,w):(w=o(w,M.children||[]),w.return=k,w)}function j(k,w,M,V,Ee){return w===null||w.tag!==7?(w=di(M,k.mode,V,Ee),w.return=k,w):(w=o(w,M),w.return=k,w)}function Y(k,w,M){if(typeof w=="string"&&w!==""||typeof w=="number"||typeof w=="bigint")return w=ko(""+w,k.mode,M),w.return=k,w;if(typeof w=="object"&&w!==null){switch(w.$$typeof){case v:return M=Xl(w.type,w.key,w.props,null,k.mode,M),Or(M,w),M.return=k,M;case L:return w=Io(w,k.mode,M),w.return=k,w;case ne:return w=gi(w),Y(k,w,M)}if(J(w)||ee(w))return w=di(w,k.mode,M,null),w.return=k,w;if(typeof w.then=="function")return Y(k,Ql(w),M);if(w.$$typeof===q)return Y(k,Vl(k,w),M);Kl(k,w)}return null}function O(k,w,M,V){var Ee=w!==null?w.key:null;if(typeof M=="string"&&M!==""||typeof M=="number"||typeof M=="bigint")return Ee!==null?null:z(k,w,""+M,V);if(typeof M=="object"&&M!==null){switch(M.$$typeof){case v:return M.key===Ee?x(k,w,M,V):null;case L:return M.key===Ee?_(k,w,M,V):null;case ne:return M=gi(M),O(k,w,M,V)}if(J(M)||ee(M))return Ee!==null?null:j(k,w,M,V,null);if(typeof M.then=="function")return O(k,w,Ql(M),V);if(M.$$typeof===q)return O(k,w,Vl(k,M),V);Kl(k,M)}return null}function U(k,w,M,V,Ee){if(typeof V=="string"&&V!==""||typeof V=="number"||typeof V=="bigint")return k=k.get(M)||null,z(w,k,""+V,Ee);if(typeof V=="object"&&V!==null){switch(V.$$typeof){case v:return k=k.get(V.key===null?M:V.key)||null,x(w,k,V,Ee);case L:return k=k.get(V.key===null?M:V.key)||null,_(w,k,V,Ee);case ne:return V=gi(V),U(k,w,M,V,Ee)}if(J(V)||ee(V))return k=k.get(M)||null,j(w,k,V,Ee,null);if(typeof V.then=="function")return U(k,w,M,Ql(V),Ee);if(V.$$typeof===q)return U(k,w,M,Vl(w,V),Ee);Kl(w,V)}return null}function he(k,w,M,V){for(var Ee=null,qe=null,ze=w,Le=w=0,Xe=null;ze!==null&&Le<M.length;Le++){ze.index>Le?(Xe=ze,ze=null):Xe=ze.sibling;var Ye=O(k,ze,M[Le],V);if(Ye===null){ze===null&&(ze=Xe);break}e&&ze&&Ye.alternate===null&&n(k,ze),w=u(Ye,w,Le),qe===null?Ee=Ye:qe.sibling=Ye,qe=Ye,ze=Xe}if(Le===M.length)return t(k,ze),He&&ta(k,Le),Ee;if(ze===null){for(;Le<M.length;Le++)ze=Y(k,M[Le],V),ze!==null&&(w=u(ze,w,Le),qe===null?Ee=ze:qe.sibling=ze,qe=ze);return He&&ta(k,Le),Ee}for(ze=i(ze);Le<M.length;Le++)Xe=U(ze,k,Le,M[Le],V),Xe!==null&&(e&&Xe.alternate!==null&&ze.delete(Xe.key===null?Le:Xe.key),w=u(Xe,w,Le),qe===null?Ee=Xe:qe.sibling=Xe,qe=Xe);return e&&ze.forEach(function(Ya){return n(k,Ya)}),He&&ta(k,Le),Ee}function De(k,w,M,V){if(M==null)throw Error(s(151));for(var Ee=null,qe=null,ze=w,Le=w=0,Xe=null,Ye=M.next();ze!==null&&!Ye.done;Le++,Ye=M.next()){ze.index>Le?(Xe=ze,ze=null):Xe=ze.sibling;var Ya=O(k,ze,Ye.value,V);if(Ya===null){ze===null&&(ze=Xe);break}e&&ze&&Ya.alternate===null&&n(k,ze),w=u(Ya,w,Le),qe===null?Ee=Ya:qe.sibling=Ya,qe=Ya,ze=Xe}if(Ye.done)return t(k,ze),He&&ta(k,Le),Ee;if(ze===null){for(;!Ye.done;Le++,Ye=M.next())Ye=Y(k,Ye.value,V),Ye!==null&&(w=u(Ye,w,Le),qe===null?Ee=Ye:qe.sibling=Ye,qe=Ye);return He&&ta(k,Le),Ee}for(ze=i(ze);!Ye.done;Le++,Ye=M.next())Ye=U(ze,k,Le,Ye.value,V),Ye!==null&&(e&&Ye.alternate!==null&&ze.delete(Ye.key===null?Le:Ye.key),w=u(Ye,w,Le),qe===null?Ee=Ye:qe.sibling=Ye,qe=Ye);return e&&ze.forEach(function(w1){return n(k,w1)}),He&&ta(k,Le),Ee}function ln(k,w,M,V){if(typeof M=="object"&&M!==null&&M.type===N&&M.key===null&&(M=M.props.children),typeof M=="object"&&M!==null){switch(M.$$typeof){case v:e:{for(var Ee=M.key;w!==null;){if(w.key===Ee){if(Ee=M.type,Ee===N){if(w.tag===7){t(k,w.sibling),V=o(w,M.props.children),V.return=k,k=V;break e}}else if(w.elementType===Ee||typeof Ee=="object"&&Ee!==null&&Ee.$$typeof===ne&&gi(Ee)===w.type){t(k,w.sibling),V=o(w,M.props),Or(V,M),V.return=k,k=V;break e}t(k,w);break}else n(k,w);w=w.sibling}M.type===N?(V=di(M.props.children,k.mode,V,M.key),V.return=k,k=V):(V=Xl(M.type,M.key,M.props,null,k.mode,V),Or(V,M),V.return=k,k=V)}return m(k);case L:e:{for(Ee=M.key;w!==null;){if(w.key===Ee)if(w.tag===4&&w.stateNode.containerInfo===M.containerInfo&&w.stateNode.implementation===M.implementation){t(k,w.sibling),V=o(w,M.children||[]),V.return=k,k=V;break e}else{t(k,w);break}else n(k,w);w=w.sibling}V=Io(M,k.mode,V),V.return=k,k=V}return m(k);case ne:return M=gi(M),ln(k,w,M,V)}if(J(M))return he(k,w,M,V);if(ee(M)){if(Ee=ee(M),typeof Ee!="function")throw Error(s(150));return M=Ee.call(M),De(k,w,M,V)}if(typeof M.then=="function")return ln(k,w,Ql(M),V);if(M.$$typeof===q)return ln(k,w,Vl(k,M),V);Kl(k,M)}return typeof M=="string"&&M!==""||typeof M=="number"||typeof M=="bigint"?(M=""+M,w!==null&&w.tag===6?(t(k,w.sibling),V=o(w,M),V.return=k,k=V):(t(k,w),V=ko(M,k.mode,V),V.return=k,k=V),m(k)):t(k,w)}return function(k,w,M,V){try{Lr=0;var Ee=ln(k,w,M,V);return Gi=null,Ee}catch(ze){if(ze===Yi||ze===Yl)throw ze;var qe=ot(29,ze,null,k.mode);return qe.lanes=V,qe.return=k,qe}}}var bi=yf(!0),bf=yf(!1),Ia=!1;function Xo(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function Ho(e,n){e=e.updateQueue,n.updateQueue===e&&(n.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function Ma(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function _a(e,n,t){var i=e.updateQueue;if(i===null)return null;if(i=i.shared,(Ge&2)!==0){var o=i.pending;return o===null?n.next=n:(n.next=o.next,o.next=n),i.pending=n,n=jl(e),ef(e,null,t),n}return Bl(e,i,n,t),jl(e)}function Nr(e,n,t){if(n=n.updateQueue,n!==null&&(n=n.shared,(t&4194048)!==0)){var i=n.lanes;i&=e.pendingLanes,t|=i,n.lanes=t,I(e,t)}}function Zo(e,n){var t=e.updateQueue,i=e.alternate;if(i!==null&&(i=i.updateQueue,t===i)){var o=null,u=null;if(t=t.firstBaseUpdate,t!==null){do{var m={lane:t.lane,tag:t.tag,payload:t.payload,callback:null,next:null};u===null?o=u=m:u=u.next=m,t=t.next}while(t!==null);u===null?o=u=n:u=u.next=n}else o=u=n;t={baseState:i.baseState,firstBaseUpdate:o,lastBaseUpdate:u,shared:i.shared,callbacks:i.callbacks},e.updateQueue=t;return}e=t.lastBaseUpdate,e===null?t.firstBaseUpdate=n:e.next=n,t.lastBaseUpdate=n}var Vo=!1;function Wr(){if(Vo){var e=qi;if(e!==null)throw e}}function Ur(e,n,t,i){Vo=!1;var o=e.updateQueue;Ia=!1;var u=o.firstBaseUpdate,m=o.lastBaseUpdate,z=o.shared.pending;if(z!==null){o.shared.pending=null;var x=z,_=x.next;x.next=null,m===null?u=_:m.next=_,m=x;var j=e.alternate;j!==null&&(j=j.updateQueue,z=j.lastBaseUpdate,z!==m&&(z===null?j.firstBaseUpdate=_:z.next=_,j.lastBaseUpdate=x))}if(u!==null){var Y=o.baseState;m=0,j=_=x=null,z=u;do{var O=z.lane&-536870913,U=O!==z.lane;if(U?(je&O)===O:(i&O)===O){O!==0&&O===Vi&&(Vo=!0),j!==null&&(j=j.next={lane:0,tag:z.tag,payload:z.payload,callback:null,next:null});e:{var he=e,De=z;O=n;var ln=t;switch(De.tag){case 1:if(he=De.payload,typeof he=="function"){Y=he.call(ln,Y,O);break e}Y=he;break e;case 3:he.flags=he.flags&-65537|128;case 0:if(he=De.payload,O=typeof he=="function"?he.call(ln,Y,O):he,O==null)break e;Y=b({},Y,O);break e;case 2:Ia=!0}}O=z.callback,O!==null&&(e.flags|=64,U&&(e.flags|=8192),U=o.callbacks,U===null?o.callbacks=[O]:U.push(O))}else U={lane:O,tag:z.tag,payload:z.payload,callback:z.callback,next:null},j===null?(_=j=U,x=Y):j=j.next=U,m|=O;if(z=z.next,z===null){if(z=o.shared.pending,z===null)break;U=z,z=U.next,U.next=null,o.lastBaseUpdate=U,o.shared.pending=null}}while(!0);j===null&&(x=Y),o.baseState=x,o.firstBaseUpdate=_,o.lastBaseUpdate=j,u===null&&(o.shared.lanes=0),Wa|=m,e.lanes=m,e.memoizedState=Y}}function zf(e,n){if(typeof e!="function")throw Error(s(191,e));e.call(n)}function vf(e,n){var t=e.callbacks;if(t!==null)for(e.callbacks=null,e=0;e<t.length;e++)zf(t[e],n)}var Qi=T(null),Fl=T(0);function Sf(e,n){e=pa,E(Fl,e),E(Qi,n),pa=e|n.baseLanes}function qo(){E(Fl,pa),E(Qi,Qi.current)}function Yo(){pa=Fl.current,B(Qi),B(Fl)}var ut=T(null),wt=null;function Ca(e){var n=e.alternate;E(xn,xn.current&1),E(ut,e),wt===null&&(n===null||Qi.current!==null||n.memoizedState!==null)&&(wt=e)}function Go(e){E(xn,xn.current),E(ut,e),wt===null&&(wt=e)}function Ef(e){e.tag===22?(E(xn,xn.current),E(ut,e),wt===null&&(wt=e)):La()}function La(){E(xn,xn.current),E(ut,ut.current)}function ct(e){B(ut),wt===e&&(wt=null),B(xn)}var xn=T(0);function Jl(e){for(var n=e;n!==null;){if(n.tag===13){var t=n.memoizedState;if(t!==null&&(t=t.dehydrated,t===null||ec(t)||nc(t)))return n}else if(n.tag===19&&(n.memoizedProps.revealOrder==="forwards"||n.memoizedProps.revealOrder==="backwards"||n.memoizedProps.revealOrder==="unstable_legacy-backwards"||n.memoizedProps.revealOrder==="together")){if((n.flags&128)!==0)return n}else if(n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return null;n=n.return}n.sibling.return=n.return,n=n.sibling}return null}var ra=0,Ce=null,an=null,wn=null,$l=!1,Ki=!1,zi=!1,es=0,Pr=0,Fi=null,yb=0;function Sn(){throw Error(s(321))}function Qo(e,n){if(n===null)return!1;for(var t=0;t<n.length&&t<e.length;t++)if(!st(e[t],n[t]))return!1;return!0}function Ko(e,n,t,i,o,u){return ra=u,Ce=n,n.memoizedState=null,n.updateQueue=null,n.lanes=0,C.H=e===null||e.memoizedState===null?rp:du,zi=!1,u=t(i,o),zi=!1,Ki&&(u=xf(n,t,i,o)),Df(e),u}function Df(e){C.H=Xr;var n=an!==null&&an.next!==null;if(ra=0,wn=an=Ce=null,$l=!1,Pr=0,Fi=null,n)throw Error(s(300));e===null||Rn||(e=e.dependencies,e!==null&&Zl(e)&&(Rn=!0))}function xf(e,n,t,i){Ce=e;var o=0;do{if(Ki&&(Fi=null),Pr=0,Ki=!1,25<=o)throw Error(s(301));if(o+=1,wn=an=null,e.updateQueue!=null){var u=e.updateQueue;u.lastEffect=null,u.events=null,u.stores=null,u.memoCache!=null&&(u.memoCache.index=0)}C.H=lp,u=n(t,i)}while(Ki);return u}function bb(){var e=C.H,n=e.useState()[0];return n=typeof n.then=="function"?Br(n):n,e=e.useState()[0],(an!==null?an.memoizedState:null)!==e&&(Ce.flags|=1024),n}function Fo(){var e=es!==0;return es=0,e}function Jo(e,n,t){n.updateQueue=e.updateQueue,n.flags&=-2053,e.lanes&=~t}function $o(e){if($l){for(e=e.memoizedState;e!==null;){var n=e.queue;n!==null&&(n.pending=null),e=e.next}$l=!1}ra=0,wn=an=Ce=null,Ki=!1,Pr=es=0,Fi=null}function Vn(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return wn===null?Ce.memoizedState=wn=e:wn=wn.next=e,wn}function Tn(){if(an===null){var e=Ce.alternate;e=e!==null?e.memoizedState:null}else e=an.next;var n=wn===null?Ce.memoizedState:wn.next;if(n!==null)wn=n,an=e;else{if(e===null)throw Ce.alternate===null?Error(s(467)):Error(s(310));an=e,e={memoizedState:an.memoizedState,baseState:an.baseState,baseQueue:an.baseQueue,queue:an.queue,next:null},wn===null?Ce.memoizedState=wn=e:wn=wn.next=e}return wn}function ns(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function Br(e){var n=Pr;return Pr+=1,Fi===null&&(Fi=[]),e=hf(Fi,e,n),n=Ce,(wn===null?n.memoizedState:wn.next)===null&&(n=n.alternate,C.H=n===null||n.memoizedState===null?rp:du),e}function ts(e){if(e!==null&&typeof e=="object"){if(typeof e.then=="function")return Br(e);if(e.$$typeof===q)return Pn(e)}throw Error(s(438,String(e)))}function eu(e){var n=null,t=Ce.updateQueue;if(t!==null&&(n=t.memoCache),n==null){var i=Ce.alternate;i!==null&&(i=i.updateQueue,i!==null&&(i=i.memoCache,i!=null&&(n={data:i.data.map(function(o){return o.slice()}),index:0})))}if(n==null&&(n={data:[],index:0}),t===null&&(t=ns(),Ce.updateQueue=t),t.memoCache=n,t=n.data[n.index],t===void 0)for(t=n.data[n.index]=Array(e),i=0;i<e;i++)t[i]=ue;return n.index++,t}function la(e,n){return typeof n=="function"?n(e):n}function as(e){var n=Tn();return nu(n,an,e)}function nu(e,n,t){var i=e.queue;if(i===null)throw Error(s(311));i.lastRenderedReducer=t;var o=e.baseQueue,u=i.pending;if(u!==null){if(o!==null){var m=o.next;o.next=u.next,u.next=m}n.baseQueue=o=u,i.pending=null}if(u=e.baseState,o===null)e.memoizedState=u;else{n=o.next;var z=m=null,x=null,_=n,j=!1;do{var Y=_.lane&-536870913;if(Y!==_.lane?(je&Y)===Y:(ra&Y)===Y){var O=_.revertLane;if(O===0)x!==null&&(x=x.next={lane:0,revertLane:0,gesture:null,action:_.action,hasEagerState:_.hasEagerState,eagerState:_.eagerState,next:null}),Y===Vi&&(j=!0);else if((ra&O)===O){_=_.next,O===Vi&&(j=!0);continue}else Y={lane:0,revertLane:_.revertLane,gesture:null,action:_.action,hasEagerState:_.hasEagerState,eagerState:_.eagerState,next:null},x===null?(z=x=Y,m=u):x=x.next=Y,Ce.lanes|=O,Wa|=O;Y=_.action,zi&&t(u,Y),u=_.hasEagerState?_.eagerState:t(u,Y)}else O={lane:Y,revertLane:_.revertLane,gesture:_.gesture,action:_.action,hasEagerState:_.hasEagerState,eagerState:_.eagerState,next:null},x===null?(z=x=O,m=u):x=x.next=O,Ce.lanes|=Y,Wa|=Y;_=_.next}while(_!==null&&_!==n);if(x===null?m=u:x.next=z,!st(u,e.memoizedState)&&(Rn=!0,j&&(t=qi,t!==null)))throw t;e.memoizedState=u,e.baseState=m,e.baseQueue=x,i.lastRenderedState=u}return o===null&&(i.lanes=0),[e.memoizedState,i.dispatch]}function tu(e){var n=Tn(),t=n.queue;if(t===null)throw Error(s(311));t.lastRenderedReducer=e;var i=t.dispatch,o=t.pending,u=n.memoizedState;if(o!==null){t.pending=null;var m=o=o.next;do u=e(u,m.action),m=m.next;while(m!==o);st(u,n.memoizedState)||(Rn=!0),n.memoizedState=u,n.baseQueue===null&&(n.baseState=u),t.lastRenderedState=u}return[u,i]}function Tf(e,n,t){var i=Ce,o=Tn(),u=He;if(u){if(t===void 0)throw Error(s(407));t=t()}else t=n();var m=!st((an||o).memoizedState,t);if(m&&(o.memoizedState=t,Rn=!0),o=o.queue,ru(Rf.bind(null,i,o,e),[e]),o.getSnapshot!==n||m||wn!==null&&wn.memoizedState.tag&1){if(i.flags|=2048,Ji(9,{destroy:void 0},wf.bind(null,i,o,t,n),null),sn===null)throw Error(s(349));u||(ra&127)!==0||Af(i,n,t)}return t}function Af(e,n,t){e.flags|=16384,e={getSnapshot:n,value:t},n=Ce.updateQueue,n===null?(n=ns(),Ce.updateQueue=n,n.stores=[e]):(t=n.stores,t===null?n.stores=[e]:t.push(e))}function wf(e,n,t,i){n.value=t,n.getSnapshot=i,kf(n)&&If(e)}function Rf(e,n,t){return t(function(){kf(n)&&If(e)})}function kf(e){var n=e.getSnapshot;e=e.value;try{var t=n();return!st(e,t)}catch{return!0}}function If(e){var n=ci(e,2);n!==null&&nt(n,e,2)}function au(e){var n=Vn();if(typeof e=="function"){var t=e;if(e=t(),zi){Nn(!0);try{t()}finally{Nn(!1)}}}return n.memoizedState=n.baseState=e,n.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:la,lastRenderedState:e},n}function Mf(e,n,t,i){return e.baseState=t,nu(e,an,typeof i=="function"?i:la)}function zb(e,n,t,i,o){if(ls(e))throw Error(s(485));if(e=n.action,e!==null){var u={payload:o,action:e,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(m){u.listeners.push(m)}};C.T!==null?t(!0):u.isTransition=!1,i(u),t=n.pending,t===null?(u.next=n.pending=u,_f(n,u)):(u.next=t.next,n.pending=t.next=u)}}function _f(e,n){var t=n.action,i=n.payload,o=e.state;if(n.isTransition){var u=C.T,m={};C.T=m;try{var z=t(o,i),x=C.S;x!==null&&x(m,z),Cf(e,n,z)}catch(_){iu(e,n,_)}finally{u!==null&&m.types!==null&&(u.types=m.types),C.T=u}}else try{u=t(o,i),Cf(e,n,u)}catch(_){iu(e,n,_)}}function Cf(e,n,t){t!==null&&typeof t=="object"&&typeof t.then=="function"?t.then(function(i){Lf(e,n,i)},function(i){return iu(e,n,i)}):Lf(e,n,t)}function Lf(e,n,t){n.status="fulfilled",n.value=t,Of(n),e.state=t,n=e.pending,n!==null&&(t=n.next,t===n?e.pending=null:(t=t.next,n.next=t,_f(e,t)))}function iu(e,n,t){var i=e.pending;if(e.pending=null,i!==null){i=i.next;do n.status="rejected",n.reason=t,Of(n),n=n.next;while(n!==i)}e.action=null}function Of(e){e=e.listeners;for(var n=0;n<e.length;n++)(0,e[n])()}function Nf(e,n){return n}function Wf(e,n){if(He){var t=sn.formState;if(t!==null){e:{var i=Ce;if(He){if(pn){n:{for(var o=pn,u=At;o.nodeType!==8;){if(!u){o=null;break n}if(o=Rt(o.nextSibling),o===null){o=null;break n}}u=o.data,o=u==="F!"||u==="F"?o:null}if(o){pn=Rt(o.nextSibling),i=o.data==="F!";break e}}Ra(i)}i=!1}i&&(n=t[0])}}return t=Vn(),t.memoizedState=t.baseState=n,i={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Nf,lastRenderedState:n},t.queue=i,t=tp.bind(null,Ce,i),i.dispatch=t,i=au(!1),u=cu.bind(null,Ce,!1,i.queue),i=Vn(),o={state:n,dispatch:null,action:e,pending:null},i.queue=o,t=zb.bind(null,Ce,o,u,t),o.dispatch=t,i.memoizedState=e,[n,t,!1]}function Uf(e){var n=Tn();return Pf(n,an,e)}function Pf(e,n,t){if(n=nu(e,n,Nf)[0],e=as(la)[0],typeof n=="object"&&n!==null&&typeof n.then=="function")try{var i=Br(n)}catch(m){throw m===Yi?Yl:m}else i=n;n=Tn();var o=n.queue,u=o.dispatch;return t!==n.memoizedState&&(Ce.flags|=2048,Ji(9,{destroy:void 0},vb.bind(null,o,t),null)),[i,u,e]}function vb(e,n){e.action=n}function Bf(e){var n=Tn(),t=an;if(t!==null)return Pf(n,t,e);Tn(),n=n.memoizedState,t=Tn();var i=t.queue.dispatch;return t.memoizedState=e,[n,i,!1]}function Ji(e,n,t,i){return e={tag:e,create:t,deps:i,inst:n,next:null},n=Ce.updateQueue,n===null&&(n=ns(),Ce.updateQueue=n),t=n.lastEffect,t===null?n.lastEffect=e.next=e:(i=t.next,t.next=e,e.next=i,n.lastEffect=e),e}function jf(){return Tn().memoizedState}function is(e,n,t,i){var o=Vn();Ce.flags|=e,o.memoizedState=Ji(1|n,{destroy:void 0},t,i===void 0?null:i)}function rs(e,n,t,i){var o=Tn();i=i===void 0?null:i;var u=o.memoizedState.inst;an!==null&&i!==null&&Qo(i,an.memoizedState.deps)?o.memoizedState=Ji(n,u,t,i):(Ce.flags|=e,o.memoizedState=Ji(1|n,u,t,i))}function Xf(e,n){is(8390656,8,e,n)}function ru(e,n){rs(2048,8,e,n)}function Sb(e){Ce.flags|=4;var n=Ce.updateQueue;if(n===null)n=ns(),Ce.updateQueue=n,n.events=[e];else{var t=n.events;t===null?n.events=[e]:t.push(e)}}function Hf(e){var n=Tn().memoizedState;return Sb({ref:n,nextImpl:e}),function(){if((Ge&2)!==0)throw Error(s(440));return n.impl.apply(void 0,arguments)}}function Zf(e,n){return rs(4,2,e,n)}function Vf(e,n){return rs(4,4,e,n)}function qf(e,n){if(typeof n=="function"){e=e();var t=n(e);return function(){typeof t=="function"?t():n(null)}}if(n!=null)return e=e(),n.current=e,function(){n.current=null}}function Yf(e,n,t){t=t!=null?t.concat([e]):null,rs(4,4,qf.bind(null,n,e),t)}function lu(){}function Gf(e,n){var t=Tn();n=n===void 0?null:n;var i=t.memoizedState;return n!==null&&Qo(n,i[1])?i[0]:(t.memoizedState=[e,n],e)}function Qf(e,n){var t=Tn();n=n===void 0?null:n;var i=t.memoizedState;if(n!==null&&Qo(n,i[1]))return i[0];if(i=e(),zi){Nn(!0);try{e()}finally{Nn(!1)}}return t.memoizedState=[i,n],i}function su(e,n,t){return t===void 0||(ra&1073741824)!==0&&(je&261930)===0?e.memoizedState=n:(e.memoizedState=t,e=Kp(),Ce.lanes|=e,Wa|=e,t)}function Kf(e,n,t,i){return st(t,n)?t:Qi.current!==null?(e=su(e,t,i),st(e,n)||(Rn=!0),e):(ra&42)===0||(ra&1073741824)!==0&&(je&261930)===0?(Rn=!0,e.memoizedState=t):(e=Kp(),Ce.lanes|=e,Wa|=e,n)}function Ff(e,n,t,i,o){var u=K.p;K.p=u!==0&&8>u?u:8;var m=C.T,z={};C.T=z,cu(e,!1,n,t);try{var x=o(),_=C.S;if(_!==null&&_(z,x),x!==null&&typeof x=="object"&&typeof x.then=="function"){var j=gb(x,i);jr(e,n,j,pt(e))}else jr(e,n,i,pt(e))}catch(Y){jr(e,n,{then:function(){},status:"rejected",reason:Y},pt())}finally{K.p=u,m!==null&&z.types!==null&&(m.types=z.types),C.T=m}}function Eb(){}function ou(e,n,t,i){if(e.tag!==5)throw Error(s(476));var o=Jf(e).queue;Ff(e,o,n,re,t===null?Eb:function(){return $f(e),t(i)})}function Jf(e){var n=e.memoizedState;if(n!==null)return n;n={memoizedState:re,baseState:re,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:la,lastRenderedState:re},next:null};var t={};return n.next={memoizedState:t,baseState:t,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:la,lastRenderedState:t},next:null},e.memoizedState=n,e=e.alternate,e!==null&&(e.memoizedState=n),n}function $f(e){var n=Jf(e);n.next===null&&(n=e.alternate.memoizedState),jr(e,n.next.queue,{},pt())}function uu(){return Pn(il)}function ep(){return Tn().memoizedState}function np(){return Tn().memoizedState}function Db(e){for(var n=e.return;n!==null;){switch(n.tag){case 24:case 3:var t=pt();e=Ma(t);var i=_a(n,e,t);i!==null&&(nt(i,n,t),Nr(i,n,t)),n={cache:Uo()},e.payload=n;return}n=n.return}}function xb(e,n,t){var i=pt();t={lane:i,revertLane:0,gesture:null,action:t,hasEagerState:!1,eagerState:null,next:null},ls(e)?ap(n,t):(t=wo(e,n,t,i),t!==null&&(nt(t,e,i),ip(t,n,i)))}function tp(e,n,t){var i=pt();jr(e,n,t,i)}function jr(e,n,t,i){var o={lane:i,revertLane:0,gesture:null,action:t,hasEagerState:!1,eagerState:null,next:null};if(ls(e))ap(n,o);else{var u=e.alternate;if(e.lanes===0&&(u===null||u.lanes===0)&&(u=n.lastRenderedReducer,u!==null))try{var m=n.lastRenderedState,z=u(m,t);if(o.hasEagerState=!0,o.eagerState=z,st(z,m))return Bl(e,n,o,0),sn===null&&Pl(),!1}catch{}if(t=wo(e,n,o,i),t!==null)return nt(t,e,i),ip(t,n,i),!0}return!1}function cu(e,n,t,i){if(i={lane:2,revertLane:Xu(),gesture:null,action:i,hasEagerState:!1,eagerState:null,next:null},ls(e)){if(n)throw Error(s(479))}else n=wo(e,t,i,2),n!==null&&nt(n,e,2)}function ls(e){var n=e.alternate;return e===Ce||n!==null&&n===Ce}function ap(e,n){Ki=$l=!0;var t=e.pending;t===null?n.next=n:(n.next=t.next,t.next=n),e.pending=n}function ip(e,n,t){if((t&4194048)!==0){var i=n.lanes;i&=e.pendingLanes,t|=i,n.lanes=t,I(e,t)}}var Xr={readContext:Pn,use:ts,useCallback:Sn,useContext:Sn,useEffect:Sn,useImperativeHandle:Sn,useLayoutEffect:Sn,useInsertionEffect:Sn,useMemo:Sn,useReducer:Sn,useRef:Sn,useState:Sn,useDebugValue:Sn,useDeferredValue:Sn,useTransition:Sn,useSyncExternalStore:Sn,useId:Sn,useHostTransitionStatus:Sn,useFormState:Sn,useActionState:Sn,useOptimistic:Sn,useMemoCache:Sn,useCacheRefresh:Sn};Xr.useEffectEvent=Sn;var rp={readContext:Pn,use:ts,useCallback:function(e,n){return Vn().memoizedState=[e,n===void 0?null:n],e},useContext:Pn,useEffect:Xf,useImperativeHandle:function(e,n,t){t=t!=null?t.concat([e]):null,is(4194308,4,qf.bind(null,n,e),t)},useLayoutEffect:function(e,n){return is(4194308,4,e,n)},useInsertionEffect:function(e,n){is(4,2,e,n)},useMemo:function(e,n){var t=Vn();n=n===void 0?null:n;var i=e();if(zi){Nn(!0);try{e()}finally{Nn(!1)}}return t.memoizedState=[i,n],i},useReducer:function(e,n,t){var i=Vn();if(t!==void 0){var o=t(n);if(zi){Nn(!0);try{t(n)}finally{Nn(!1)}}}else o=n;return i.memoizedState=i.baseState=o,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:o},i.queue=e,e=e.dispatch=xb.bind(null,Ce,e),[i.memoizedState,e]},useRef:function(e){var n=Vn();return e={current:e},n.memoizedState=e},useState:function(e){e=au(e);var n=e.queue,t=tp.bind(null,Ce,n);return n.dispatch=t,[e.memoizedState,t]},useDebugValue:lu,useDeferredValue:function(e,n){var t=Vn();return su(t,e,n)},useTransition:function(){var e=au(!1);return e=Ff.bind(null,Ce,e.queue,!0,!1),Vn().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,n,t){var i=Ce,o=Vn();if(He){if(t===void 0)throw Error(s(407));t=t()}else{if(t=n(),sn===null)throw Error(s(349));(je&127)!==0||Af(i,n,t)}o.memoizedState=t;var u={value:t,getSnapshot:n};return o.queue=u,Xf(Rf.bind(null,i,u,e),[e]),i.flags|=2048,Ji(9,{destroy:void 0},wf.bind(null,i,u,t,n),null),t},useId:function(){var e=Vn(),n=sn.identifierPrefix;if(He){var t=Ht,i=Xt;t=(i&~(1<<32-Fe(i)-1)).toString(32)+t,n="_"+n+"R_"+t,t=es++,0<t&&(n+="H"+t.toString(32)),n+="_"}else t=yb++,n="_"+n+"r_"+t.toString(32)+"_";return e.memoizedState=n},useHostTransitionStatus:uu,useFormState:Wf,useActionState:Wf,useOptimistic:function(e){var n=Vn();n.memoizedState=n.baseState=e;var t={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return n.queue=t,n=cu.bind(null,Ce,!0,t),t.dispatch=n,[e,n]},useMemoCache:eu,useCacheRefresh:function(){return Vn().memoizedState=Db.bind(null,Ce)},useEffectEvent:function(e){var n=Vn(),t={impl:e};return n.memoizedState=t,function(){if((Ge&2)!==0)throw Error(s(440));return t.impl.apply(void 0,arguments)}}},du={readContext:Pn,use:ts,useCallback:Gf,useContext:Pn,useEffect:ru,useImperativeHandle:Yf,useInsertionEffect:Zf,useLayoutEffect:Vf,useMemo:Qf,useReducer:as,useRef:jf,useState:function(){return as(la)},useDebugValue:lu,useDeferredValue:function(e,n){var t=Tn();return Kf(t,an.memoizedState,e,n)},useTransition:function(){var e=as(la)[0],n=Tn().memoizedState;return[typeof e=="boolean"?e:Br(e),n]},useSyncExternalStore:Tf,useId:ep,useHostTransitionStatus:uu,useFormState:Uf,useActionState:Uf,useOptimistic:function(e,n){var t=Tn();return Mf(t,an,e,n)},useMemoCache:eu,useCacheRefresh:np};du.useEffectEvent=Hf;var lp={readContext:Pn,use:ts,useCallback:Gf,useContext:Pn,useEffect:ru,useImperativeHandle:Yf,useInsertionEffect:Zf,useLayoutEffect:Vf,useMemo:Qf,useReducer:tu,useRef:jf,useState:function(){return tu(la)},useDebugValue:lu,useDeferredValue:function(e,n){var t=Tn();return an===null?su(t,e,n):Kf(t,an.memoizedState,e,n)},useTransition:function(){var e=tu(la)[0],n=Tn().memoizedState;return[typeof e=="boolean"?e:Br(e),n]},useSyncExternalStore:Tf,useId:ep,useHostTransitionStatus:uu,useFormState:Bf,useActionState:Bf,useOptimistic:function(e,n){var t=Tn();return an!==null?Mf(t,an,e,n):(t.baseState=e,[e,t.queue.dispatch])},useMemoCache:eu,useCacheRefresh:np};lp.useEffectEvent=Hf;function fu(e,n,t,i){n=e.memoizedState,t=t(i,n),t=t==null?n:b({},n,t),e.memoizedState=t,e.lanes===0&&(e.updateQueue.baseState=t)}var pu={enqueueSetState:function(e,n,t){e=e._reactInternals;var i=pt(),o=Ma(i);o.payload=n,t!=null&&(o.callback=t),n=_a(e,o,i),n!==null&&(nt(n,e,i),Nr(n,e,i))},enqueueReplaceState:function(e,n,t){e=e._reactInternals;var i=pt(),o=Ma(i);o.tag=1,o.payload=n,t!=null&&(o.callback=t),n=_a(e,o,i),n!==null&&(nt(n,e,i),Nr(n,e,i))},enqueueForceUpdate:function(e,n){e=e._reactInternals;var t=pt(),i=Ma(t);i.tag=2,n!=null&&(i.callback=n),n=_a(e,i,t),n!==null&&(nt(n,e,t),Nr(n,e,t))}};function sp(e,n,t,i,o,u,m){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(i,u,m):n.prototype&&n.prototype.isPureReactComponent?!Rr(t,i)||!Rr(o,u):!0}function op(e,n,t,i){e=n.state,typeof n.componentWillReceiveProps=="function"&&n.componentWillReceiveProps(t,i),typeof n.UNSAFE_componentWillReceiveProps=="function"&&n.UNSAFE_componentWillReceiveProps(t,i),n.state!==e&&pu.enqueueReplaceState(n,n.state,null)}function vi(e,n){var t=n;if("ref"in n){t={};for(var i in n)i!=="ref"&&(t[i]=n[i])}if(e=e.defaultProps){t===n&&(t=b({},t));for(var o in e)t[o]===void 0&&(t[o]=e[o])}return t}function up(e){Ul(e)}function cp(e){console.error(e)}function dp(e){Ul(e)}function ss(e,n){try{var t=e.onUncaughtError;t(n.value,{componentStack:n.stack})}catch(i){setTimeout(function(){throw i})}}function fp(e,n,t){try{var i=e.onCaughtError;i(t.value,{componentStack:t.stack,errorBoundary:n.tag===1?n.stateNode:null})}catch(o){setTimeout(function(){throw o})}}function hu(e,n,t){return t=Ma(t),t.tag=3,t.payload={element:null},t.callback=function(){ss(e,n)},t}function pp(e){return e=Ma(e),e.tag=3,e}function hp(e,n,t,i){var o=t.type.getDerivedStateFromError;if(typeof o=="function"){var u=i.value;e.payload=function(){return o(u)},e.callback=function(){fp(n,t,i)}}var m=t.stateNode;m!==null&&typeof m.componentDidCatch=="function"&&(e.callback=function(){fp(n,t,i),typeof o!="function"&&(Ua===null?Ua=new Set([this]):Ua.add(this));var z=i.stack;this.componentDidCatch(i.value,{componentStack:z!==null?z:""})})}function Tb(e,n,t,i,o){if(t.flags|=32768,i!==null&&typeof i=="object"&&typeof i.then=="function"){if(n=t.alternate,n!==null&&Zi(n,t,o,!0),t=ut.current,t!==null){switch(t.tag){case 31:case 13:return wt===null?zs():t.alternate===null&&En===0&&(En=3),t.flags&=-257,t.flags|=65536,t.lanes=o,i===Gl?t.flags|=16384:(n=t.updateQueue,n===null?t.updateQueue=new Set([i]):n.add(i),Pu(e,i,o)),!1;case 22:return t.flags|=65536,i===Gl?t.flags|=16384:(n=t.updateQueue,n===null?(n={transitions:null,markerInstances:null,retryQueue:new Set([i])},t.updateQueue=n):(t=n.retryQueue,t===null?n.retryQueue=new Set([i]):t.add(i)),Pu(e,i,o)),!1}throw Error(s(435,t.tag))}return Pu(e,i,o),zs(),!1}if(He)return n=ut.current,n!==null?((n.flags&65536)===0&&(n.flags|=256),n.flags|=65536,n.lanes=o,i!==Co&&(e=Error(s(422),{cause:i}),Mr(Dt(e,t)))):(i!==Co&&(n=Error(s(423),{cause:i}),Mr(Dt(n,t))),e=e.current.alternate,e.flags|=65536,o&=-o,e.lanes|=o,i=Dt(i,t),o=hu(e.stateNode,i,o),Zo(e,o),En!==4&&(En=2)),!1;var u=Error(s(520),{cause:i});if(u=Dt(u,t),Kr===null?Kr=[u]:Kr.push(u),En!==4&&(En=2),n===null)return!0;i=Dt(i,t),t=n;do{switch(t.tag){case 3:return t.flags|=65536,e=o&-o,t.lanes|=e,e=hu(t.stateNode,i,e),Zo(t,e),!1;case 1:if(n=t.type,u=t.stateNode,(t.flags&128)===0&&(typeof n.getDerivedStateFromError=="function"||u!==null&&typeof u.componentDidCatch=="function"&&(Ua===null||!Ua.has(u))))return t.flags|=65536,o&=-o,t.lanes|=o,o=pp(o),hp(o,e,t,i),Zo(t,o),!1}t=t.return}while(t!==null);return!1}var mu=Error(s(461)),Rn=!1;function Bn(e,n,t,i){n.child=e===null?bf(n,null,t,i):bi(n,e.child,t,i)}function mp(e,n,t,i,o){t=t.render;var u=n.ref;if("ref"in i){var m={};for(var z in i)z!=="ref"&&(m[z]=i[z])}else m=i;return hi(n),i=Ko(e,n,t,m,u,o),z=Fo(),e!==null&&!Rn?(Jo(e,n,o),sa(e,n,o)):(He&&z&&Mo(n),n.flags|=1,Bn(e,n,i,o),n.child)}function gp(e,n,t,i,o){if(e===null){var u=t.type;return typeof u=="function"&&!Ro(u)&&u.defaultProps===void 0&&t.compare===null?(n.tag=15,n.type=u,yp(e,n,u,i,o)):(e=Xl(t.type,null,i,n,n.mode,o),e.ref=n.ref,e.return=n,n.child=e)}if(u=e.child,!Du(e,o)){var m=u.memoizedProps;if(t=t.compare,t=t!==null?t:Rr,t(m,i)&&e.ref===n.ref)return sa(e,n,o)}return n.flags|=1,e=na(u,i),e.ref=n.ref,e.return=n,n.child=e}function yp(e,n,t,i,o){if(e!==null){var u=e.memoizedProps;if(Rr(u,i)&&e.ref===n.ref)if(Rn=!1,n.pendingProps=i=u,Du(e,o))(e.flags&131072)!==0&&(Rn=!0);else return n.lanes=e.lanes,sa(e,n,o)}return gu(e,n,t,i,o)}function bp(e,n,t,i){var o=i.children,u=e!==null?e.memoizedState:null;if(e===null&&n.stateNode===null&&(n.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),i.mode==="hidden"){if((n.flags&128)!==0){if(u=u!==null?u.baseLanes|t:t,e!==null){for(i=n.child=e.child,o=0;i!==null;)o=o|i.lanes|i.childLanes,i=i.sibling;i=o&~u}else i=0,n.child=null;return zp(e,n,u,t,i)}if((t&536870912)!==0)n.memoizedState={baseLanes:0,cachePool:null},e!==null&&ql(n,u!==null?u.cachePool:null),u!==null?Sf(n,u):qo(),Ef(n);else return i=n.lanes=536870912,zp(e,n,u!==null?u.baseLanes|t:t,t,i)}else u!==null?(ql(n,u.cachePool),Sf(n,u),La(),n.memoizedState=null):(e!==null&&ql(n,null),qo(),La());return Bn(e,n,o,t),n.child}function Hr(e,n){return e!==null&&e.tag===22||n.stateNode!==null||(n.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),n.sibling}function zp(e,n,t,i,o){var u=Bo();return u=u===null?null:{parent:An._currentValue,pool:u},n.memoizedState={baseLanes:t,cachePool:u},e!==null&&ql(n,null),qo(),Ef(n),e!==null&&Zi(e,n,i,!0),n.childLanes=o,null}function os(e,n){return n=cs({mode:n.mode,children:n.children},e.mode),n.ref=e.ref,e.child=n,n.return=e,n}function vp(e,n,t){return bi(n,e.child,null,t),e=os(n,n.pendingProps),e.flags|=2,ct(n),n.memoizedState=null,e}function Ab(e,n,t){var i=n.pendingProps,o=(n.flags&128)!==0;if(n.flags&=-129,e===null){if(He){if(i.mode==="hidden")return e=os(n,i),n.lanes=536870912,Hr(null,e);if(Go(n),(e=pn)?(e=_h(e,At),e=e!==null&&e.data==="&"?e:null,e!==null&&(n.memoizedState={dehydrated:e,treeContext:Aa!==null?{id:Xt,overflow:Ht}:null,retryLane:536870912,hydrationErrors:null},t=tf(e),t.return=n,n.child=t,Un=n,pn=null)):e=null,e===null)throw Ra(n);return n.lanes=536870912,null}return os(n,i)}var u=e.memoizedState;if(u!==null){var m=u.dehydrated;if(Go(n),o)if(n.flags&256)n.flags&=-257,n=vp(e,n,t);else if(n.memoizedState!==null)n.child=e.child,n.flags|=128,n=null;else throw Error(s(558));else if(Rn||Zi(e,n,t,!1),o=(t&e.childLanes)!==0,Rn||o){if(i=sn,i!==null&&(m=W(i,t),m!==0&&m!==u.retryLane))throw u.retryLane=m,ci(e,m),nt(i,e,m),mu;zs(),n=vp(e,n,t)}else e=u.treeContext,pn=Rt(m.nextSibling),Un=n,He=!0,wa=null,At=!1,e!==null&&lf(n,e),n=os(n,i),n.flags|=4096;return n}return e=na(e.child,{mode:i.mode,children:i.children}),e.ref=n.ref,n.child=e,e.return=n,e}function us(e,n){var t=n.ref;if(t===null)e!==null&&e.ref!==null&&(n.flags|=4194816);else{if(typeof t!="function"&&typeof t!="object")throw Error(s(284));(e===null||e.ref!==t)&&(n.flags|=4194816)}}function gu(e,n,t,i,o){return hi(n),t=Ko(e,n,t,i,void 0,o),i=Fo(),e!==null&&!Rn?(Jo(e,n,o),sa(e,n,o)):(He&&i&&Mo(n),n.flags|=1,Bn(e,n,t,o),n.child)}function Sp(e,n,t,i,o,u){return hi(n),n.updateQueue=null,t=xf(n,i,t,o),Df(e),i=Fo(),e!==null&&!Rn?(Jo(e,n,u),sa(e,n,u)):(He&&i&&Mo(n),n.flags|=1,Bn(e,n,t,u),n.child)}function Ep(e,n,t,i,o){if(hi(n),n.stateNode===null){var u=Bi,m=t.contextType;typeof m=="object"&&m!==null&&(u=Pn(m)),u=new t(i,u),n.memoizedState=u.state!==null&&u.state!==void 0?u.state:null,u.updater=pu,n.stateNode=u,u._reactInternals=n,u=n.stateNode,u.props=i,u.state=n.memoizedState,u.refs={},Xo(n),m=t.contextType,u.context=typeof m=="object"&&m!==null?Pn(m):Bi,u.state=n.memoizedState,m=t.getDerivedStateFromProps,typeof m=="function"&&(fu(n,t,m,i),u.state=n.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof u.getSnapshotBeforeUpdate=="function"||typeof u.UNSAFE_componentWillMount!="function"&&typeof u.componentWillMount!="function"||(m=u.state,typeof u.componentWillMount=="function"&&u.componentWillMount(),typeof u.UNSAFE_componentWillMount=="function"&&u.UNSAFE_componentWillMount(),m!==u.state&&pu.enqueueReplaceState(u,u.state,null),Ur(n,i,u,o),Wr(),u.state=n.memoizedState),typeof u.componentDidMount=="function"&&(n.flags|=4194308),i=!0}else if(e===null){u=n.stateNode;var z=n.memoizedProps,x=vi(t,z);u.props=x;var _=u.context,j=t.contextType;m=Bi,typeof j=="object"&&j!==null&&(m=Pn(j));var Y=t.getDerivedStateFromProps;j=typeof Y=="function"||typeof u.getSnapshotBeforeUpdate=="function",z=n.pendingProps!==z,j||typeof u.UNSAFE_componentWillReceiveProps!="function"&&typeof u.componentWillReceiveProps!="function"||(z||_!==m)&&op(n,u,i,m),Ia=!1;var O=n.memoizedState;u.state=O,Ur(n,i,u,o),Wr(),_=n.memoizedState,z||O!==_||Ia?(typeof Y=="function"&&(fu(n,t,Y,i),_=n.memoizedState),(x=Ia||sp(n,t,x,i,O,_,m))?(j||typeof u.UNSAFE_componentWillMount!="function"&&typeof u.componentWillMount!="function"||(typeof u.componentWillMount=="function"&&u.componentWillMount(),typeof u.UNSAFE_componentWillMount=="function"&&u.UNSAFE_componentWillMount()),typeof u.componentDidMount=="function"&&(n.flags|=4194308)):(typeof u.componentDidMount=="function"&&(n.flags|=4194308),n.memoizedProps=i,n.memoizedState=_),u.props=i,u.state=_,u.context=m,i=x):(typeof u.componentDidMount=="function"&&(n.flags|=4194308),i=!1)}else{u=n.stateNode,Ho(e,n),m=n.memoizedProps,j=vi(t,m),u.props=j,Y=n.pendingProps,O=u.context,_=t.contextType,x=Bi,typeof _=="object"&&_!==null&&(x=Pn(_)),z=t.getDerivedStateFromProps,(_=typeof z=="function"||typeof u.getSnapshotBeforeUpdate=="function")||typeof u.UNSAFE_componentWillReceiveProps!="function"&&typeof u.componentWillReceiveProps!="function"||(m!==Y||O!==x)&&op(n,u,i,x),Ia=!1,O=n.memoizedState,u.state=O,Ur(n,i,u,o),Wr();var U=n.memoizedState;m!==Y||O!==U||Ia||e!==null&&e.dependencies!==null&&Zl(e.dependencies)?(typeof z=="function"&&(fu(n,t,z,i),U=n.memoizedState),(j=Ia||sp(n,t,j,i,O,U,x)||e!==null&&e.dependencies!==null&&Zl(e.dependencies))?(_||typeof u.UNSAFE_componentWillUpdate!="function"&&typeof u.componentWillUpdate!="function"||(typeof u.componentWillUpdate=="function"&&u.componentWillUpdate(i,U,x),typeof u.UNSAFE_componentWillUpdate=="function"&&u.UNSAFE_componentWillUpdate(i,U,x)),typeof u.componentDidUpdate=="function"&&(n.flags|=4),typeof u.getSnapshotBeforeUpdate=="function"&&(n.flags|=1024)):(typeof u.componentDidUpdate!="function"||m===e.memoizedProps&&O===e.memoizedState||(n.flags|=4),typeof u.getSnapshotBeforeUpdate!="function"||m===e.memoizedProps&&O===e.memoizedState||(n.flags|=1024),n.memoizedProps=i,n.memoizedState=U),u.props=i,u.state=U,u.context=x,i=j):(typeof u.componentDidUpdate!="function"||m===e.memoizedProps&&O===e.memoizedState||(n.flags|=4),typeof u.getSnapshotBeforeUpdate!="function"||m===e.memoizedProps&&O===e.memoizedState||(n.flags|=1024),i=!1)}return u=i,us(e,n),i=(n.flags&128)!==0,u||i?(u=n.stateNode,t=i&&typeof t.getDerivedStateFromError!="function"?null:u.render(),n.flags|=1,e!==null&&i?(n.child=bi(n,e.child,null,o),n.child=bi(n,null,t,o)):Bn(e,n,t,o),n.memoizedState=u.state,e=n.child):e=sa(e,n,o),e}function Dp(e,n,t,i){return fi(),n.flags|=256,Bn(e,n,t,i),n.child}var yu={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function bu(e){return{baseLanes:e,cachePool:ff()}}function zu(e,n,t){return e=e!==null?e.childLanes&~t:0,n&&(e|=ft),e}function xp(e,n,t){var i=n.pendingProps,o=!1,u=(n.flags&128)!==0,m;if((m=u)||(m=e!==null&&e.memoizedState===null?!1:(xn.current&2)!==0),m&&(o=!0,n.flags&=-129),m=(n.flags&32)!==0,n.flags&=-33,e===null){if(He){if(o?Ca(n):La(),(e=pn)?(e=_h(e,At),e=e!==null&&e.data!=="&"?e:null,e!==null&&(n.memoizedState={dehydrated:e,treeContext:Aa!==null?{id:Xt,overflow:Ht}:null,retryLane:536870912,hydrationErrors:null},t=tf(e),t.return=n,n.child=t,Un=n,pn=null)):e=null,e===null)throw Ra(n);return nc(e)?n.lanes=32:n.lanes=536870912,null}var z=i.children;return i=i.fallback,o?(La(),o=n.mode,z=cs({mode:"hidden",children:z},o),i=di(i,o,t,null),z.return=n,i.return=n,z.sibling=i,n.child=z,i=n.child,i.memoizedState=bu(t),i.childLanes=zu(e,m,t),n.memoizedState=yu,Hr(null,i)):(Ca(n),vu(n,z))}var x=e.memoizedState;if(x!==null&&(z=x.dehydrated,z!==null)){if(u)n.flags&256?(Ca(n),n.flags&=-257,n=Su(e,n,t)):n.memoizedState!==null?(La(),n.child=e.child,n.flags|=128,n=null):(La(),z=i.fallback,o=n.mode,i=cs({mode:"visible",children:i.children},o),z=di(z,o,t,null),z.flags|=2,i.return=n,z.return=n,i.sibling=z,n.child=i,bi(n,e.child,null,t),i=n.child,i.memoizedState=bu(t),i.childLanes=zu(e,m,t),n.memoizedState=yu,n=Hr(null,i));else if(Ca(n),nc(z)){if(m=z.nextSibling&&z.nextSibling.dataset,m)var _=m.dgst;m=_,i=Error(s(419)),i.stack="",i.digest=m,Mr({value:i,source:null,stack:null}),n=Su(e,n,t)}else if(Rn||Zi(e,n,t,!1),m=(t&e.childLanes)!==0,Rn||m){if(m=sn,m!==null&&(i=W(m,t),i!==0&&i!==x.retryLane))throw x.retryLane=i,ci(e,i),nt(m,e,i),mu;ec(z)||zs(),n=Su(e,n,t)}else ec(z)?(n.flags|=192,n.child=e.child,n=null):(e=x.treeContext,pn=Rt(z.nextSibling),Un=n,He=!0,wa=null,At=!1,e!==null&&lf(n,e),n=vu(n,i.children),n.flags|=4096);return n}return o?(La(),z=i.fallback,o=n.mode,x=e.child,_=x.sibling,i=na(x,{mode:"hidden",children:i.children}),i.subtreeFlags=x.subtreeFlags&65011712,_!==null?z=na(_,z):(z=di(z,o,t,null),z.flags|=2),z.return=n,i.return=n,i.sibling=z,n.child=i,Hr(null,i),i=n.child,z=e.child.memoizedState,z===null?z=bu(t):(o=z.cachePool,o!==null?(x=An._currentValue,o=o.parent!==x?{parent:x,pool:x}:o):o=ff(),z={baseLanes:z.baseLanes|t,cachePool:o}),i.memoizedState=z,i.childLanes=zu(e,m,t),n.memoizedState=yu,Hr(e.child,i)):(Ca(n),t=e.child,e=t.sibling,t=na(t,{mode:"visible",children:i.children}),t.return=n,t.sibling=null,e!==null&&(m=n.deletions,m===null?(n.deletions=[e],n.flags|=16):m.push(e)),n.child=t,n.memoizedState=null,t)}function vu(e,n){return n=cs({mode:"visible",children:n},e.mode),n.return=e,e.child=n}function cs(e,n){return e=ot(22,e,null,n),e.lanes=0,e}function Su(e,n,t){return bi(n,e.child,null,t),e=vu(n,n.pendingProps.children),e.flags|=2,n.memoizedState=null,e}function Tp(e,n,t){e.lanes|=n;var i=e.alternate;i!==null&&(i.lanes|=n),No(e.return,n,t)}function Eu(e,n,t,i,o,u){var m=e.memoizedState;m===null?e.memoizedState={isBackwards:n,rendering:null,renderingStartTime:0,last:i,tail:t,tailMode:o,treeForkCount:u}:(m.isBackwards=n,m.rendering=null,m.renderingStartTime=0,m.last=i,m.tail=t,m.tailMode=o,m.treeForkCount=u)}function Ap(e,n,t){var i=n.pendingProps,o=i.revealOrder,u=i.tail;i=i.children;var m=xn.current,z=(m&2)!==0;if(z?(m=m&1|2,n.flags|=128):m&=1,E(xn,m),Bn(e,n,i,t),i=He?Ir:0,!z&&e!==null&&(e.flags&128)!==0)e:for(e=n.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Tp(e,t,n);else if(e.tag===19)Tp(e,t,n);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===n)break e;for(;e.sibling===null;){if(e.return===null||e.return===n)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(o){case"forwards":for(t=n.child,o=null;t!==null;)e=t.alternate,e!==null&&Jl(e)===null&&(o=t),t=t.sibling;t=o,t===null?(o=n.child,n.child=null):(o=t.sibling,t.sibling=null),Eu(n,!1,o,t,u,i);break;case"backwards":case"unstable_legacy-backwards":for(t=null,o=n.child,n.child=null;o!==null;){if(e=o.alternate,e!==null&&Jl(e)===null){n.child=o;break}e=o.sibling,o.sibling=t,t=o,o=e}Eu(n,!0,t,null,u,i);break;case"together":Eu(n,!1,null,null,void 0,i);break;default:n.memoizedState=null}return n.child}function sa(e,n,t){if(e!==null&&(n.dependencies=e.dependencies),Wa|=n.lanes,(t&n.childLanes)===0)if(e!==null){if(Zi(e,n,t,!1),(t&n.childLanes)===0)return null}else return null;if(e!==null&&n.child!==e.child)throw Error(s(153));if(n.child!==null){for(e=n.child,t=na(e,e.pendingProps),n.child=t,t.return=n;e.sibling!==null;)e=e.sibling,t=t.sibling=na(e,e.pendingProps),t.return=n;t.sibling=null}return n.child}function Du(e,n){return(e.lanes&n)!==0?!0:(e=e.dependencies,!!(e!==null&&Zl(e)))}function wb(e,n,t){switch(n.tag){case 3:Je(n,n.stateNode.containerInfo),ka(n,An,e.memoizedState.cache),fi();break;case 27:case 5:qn(n);break;case 4:Je(n,n.stateNode.containerInfo);break;case 10:ka(n,n.type,n.memoizedProps.value);break;case 31:if(n.memoizedState!==null)return n.flags|=128,Go(n),null;break;case 13:var i=n.memoizedState;if(i!==null)return i.dehydrated!==null?(Ca(n),n.flags|=128,null):(t&n.child.childLanes)!==0?xp(e,n,t):(Ca(n),e=sa(e,n,t),e!==null?e.sibling:null);Ca(n);break;case 19:var o=(e.flags&128)!==0;if(i=(t&n.childLanes)!==0,i||(Zi(e,n,t,!1),i=(t&n.childLanes)!==0),o){if(i)return Ap(e,n,t);n.flags|=128}if(o=n.memoizedState,o!==null&&(o.rendering=null,o.tail=null,o.lastEffect=null),E(xn,xn.current),i)break;return null;case 22:return n.lanes=0,bp(e,n,t,n.pendingProps);case 24:ka(n,An,e.memoizedState.cache)}return sa(e,n,t)}function wp(e,n,t){if(e!==null)if(e.memoizedProps!==n.pendingProps)Rn=!0;else{if(!Du(e,t)&&(n.flags&128)===0)return Rn=!1,wb(e,n,t);Rn=(e.flags&131072)!==0}else Rn=!1,He&&(n.flags&1048576)!==0&&rf(n,Ir,n.index);switch(n.lanes=0,n.tag){case 16:e:{var i=n.pendingProps;if(e=gi(n.elementType),n.type=e,typeof e=="function")Ro(e)?(i=vi(e,i),n.tag=1,n=Ep(null,n,e,i,t)):(n.tag=0,n=gu(null,n,e,i,t));else{if(e!=null){var o=e.$$typeof;if(o===ce){n.tag=11,n=mp(null,n,e,i,t);break e}else if(o===R){n.tag=14,n=gp(null,n,e,i,t);break e}}throw n=de(e)||e,Error(s(306,n,""))}}return n;case 0:return gu(e,n,n.type,n.pendingProps,t);case 1:return i=n.type,o=vi(i,n.pendingProps),Ep(e,n,i,o,t);case 3:e:{if(Je(n,n.stateNode.containerInfo),e===null)throw Error(s(387));i=n.pendingProps;var u=n.memoizedState;o=u.element,Ho(e,n),Ur(n,i,null,t);var m=n.memoizedState;if(i=m.cache,ka(n,An,i),i!==u.cache&&Wo(n,[An],t,!0),Wr(),i=m.element,u.isDehydrated)if(u={element:i,isDehydrated:!1,cache:m.cache},n.updateQueue.baseState=u,n.memoizedState=u,n.flags&256){n=Dp(e,n,i,t);break e}else if(i!==o){o=Dt(Error(s(424)),n),Mr(o),n=Dp(e,n,i,t);break e}else for(e=n.stateNode.containerInfo,e.nodeType===9?e=e.body:e=e.nodeName==="HTML"?e.ownerDocument.body:e,pn=Rt(e.firstChild),Un=n,He=!0,wa=null,At=!0,t=bf(n,null,i,t),n.child=t;t;)t.flags=t.flags&-3|4096,t=t.sibling;else{if(fi(),i===o){n=sa(e,n,t);break e}Bn(e,n,i,t)}n=n.child}return n;case 26:return us(e,n),e===null?(t=Uh(n.type,null,n.pendingProps,null))?n.memoizedState=t:He||(t=n.type,e=n.pendingProps,i=As(ge.current).createElement(t),i[oe]=n,i[se]=e,jn(i,t,e),vn(i),n.stateNode=i):n.memoizedState=Uh(n.type,e.memoizedProps,n.pendingProps,e.memoizedState),null;case 27:return qn(n),e===null&&He&&(i=n.stateNode=Oh(n.type,n.pendingProps,ge.current),Un=n,At=!0,o=pn,Xa(n.type)?(tc=o,pn=Rt(i.firstChild)):pn=o),Bn(e,n,n.pendingProps.children,t),us(e,n),e===null&&(n.flags|=4194304),n.child;case 5:return e===null&&He&&((o=i=pn)&&(i=a1(i,n.type,n.pendingProps,At),i!==null?(n.stateNode=i,Un=n,pn=Rt(i.firstChild),At=!1,o=!0):o=!1),o||Ra(n)),qn(n),o=n.type,u=n.pendingProps,m=e!==null?e.memoizedProps:null,i=u.children,Fu(o,u)?i=null:m!==null&&Fu(o,m)&&(n.flags|=32),n.memoizedState!==null&&(o=Ko(e,n,bb,null,null,t),il._currentValue=o),us(e,n),Bn(e,n,i,t),n.child;case 6:return e===null&&He&&((e=t=pn)&&(t=i1(t,n.pendingProps,At),t!==null?(n.stateNode=t,Un=n,pn=null,e=!0):e=!1),e||Ra(n)),null;case 13:return xp(e,n,t);case 4:return Je(n,n.stateNode.containerInfo),i=n.pendingProps,e===null?n.child=bi(n,null,i,t):Bn(e,n,i,t),n.child;case 11:return mp(e,n,n.type,n.pendingProps,t);case 7:return Bn(e,n,n.pendingProps,t),n.child;case 8:return Bn(e,n,n.pendingProps.children,t),n.child;case 12:return Bn(e,n,n.pendingProps.children,t),n.child;case 10:return i=n.pendingProps,ka(n,n.type,i.value),Bn(e,n,i.children,t),n.child;case 9:return o=n.type._context,i=n.pendingProps.children,hi(n),o=Pn(o),i=i(o),n.flags|=1,Bn(e,n,i,t),n.child;case 14:return gp(e,n,n.type,n.pendingProps,t);case 15:return yp(e,n,n.type,n.pendingProps,t);case 19:return Ap(e,n,t);case 31:return Ab(e,n,t);case 22:return bp(e,n,t,n.pendingProps);case 24:return hi(n),i=Pn(An),e===null?(o=Bo(),o===null&&(o=sn,u=Uo(),o.pooledCache=u,u.refCount++,u!==null&&(o.pooledCacheLanes|=t),o=u),n.memoizedState={parent:i,cache:o},Xo(n),ka(n,An,o)):((e.lanes&t)!==0&&(Ho(e,n),Ur(n,null,null,t),Wr()),o=e.memoizedState,u=n.memoizedState,o.parent!==i?(o={parent:i,cache:i},n.memoizedState=o,n.lanes===0&&(n.memoizedState=n.updateQueue.baseState=o),ka(n,An,i)):(i=u.cache,ka(n,An,i),i!==o.cache&&Wo(n,[An],t,!0))),Bn(e,n,n.pendingProps.children,t),n.child;case 29:throw n.pendingProps}throw Error(s(156,n.tag))}function oa(e){e.flags|=4}function xu(e,n,t,i,o){if((n=(e.mode&32)!==0)&&(n=!1),n){if(e.flags|=16777216,(o&335544128)===o)if(e.stateNode.complete)e.flags|=8192;else if(eh())e.flags|=8192;else throw yi=Gl,jo}else e.flags&=-16777217}function Rp(e,n){if(n.type!=="stylesheet"||(n.state.loading&4)!==0)e.flags&=-16777217;else if(e.flags|=16777216,!Hh(n))if(eh())e.flags|=8192;else throw yi=Gl,jo}function ds(e,n){n!==null&&(e.flags|=4),e.flags&16384&&(n=e.tag!==22?ii():536870912,e.lanes|=n,tr|=n)}function Zr(e,n){if(!He)switch(e.tailMode){case"hidden":n=e.tail;for(var t=null;n!==null;)n.alternate!==null&&(t=n),n=n.sibling;t===null?e.tail=null:t.sibling=null;break;case"collapsed":t=e.tail;for(var i=null;t!==null;)t.alternate!==null&&(i=t),t=t.sibling;i===null?n||e.tail===null?e.tail=null:e.tail.sibling=null:i.sibling=null}}function hn(e){var n=e.alternate!==null&&e.alternate.child===e.child,t=0,i=0;if(n)for(var o=e.child;o!==null;)t|=o.lanes|o.childLanes,i|=o.subtreeFlags&65011712,i|=o.flags&65011712,o.return=e,o=o.sibling;else for(o=e.child;o!==null;)t|=o.lanes|o.childLanes,i|=o.subtreeFlags,i|=o.flags,o.return=e,o=o.sibling;return e.subtreeFlags|=i,e.childLanes=t,n}function Rb(e,n,t){var i=n.pendingProps;switch(_o(n),n.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return hn(n),null;case 1:return hn(n),null;case 3:return t=n.stateNode,i=null,e!==null&&(i=e.memoizedState.cache),n.memoizedState.cache!==i&&(n.flags|=2048),ia(An),Ke(),t.pendingContext&&(t.context=t.pendingContext,t.pendingContext=null),(e===null||e.child===null)&&(Hi(n)?oa(n):e===null||e.memoizedState.isDehydrated&&(n.flags&256)===0||(n.flags|=1024,Lo())),hn(n),null;case 26:var o=n.type,u=n.memoizedState;return e===null?(oa(n),u!==null?(hn(n),Rp(n,u)):(hn(n),xu(n,o,null,i,t))):u?u!==e.memoizedState?(oa(n),hn(n),Rp(n,u)):(hn(n),n.flags&=-16777217):(e=e.memoizedProps,e!==i&&oa(n),hn(n),xu(n,o,e,i,t)),null;case 27:if(Mt(n),t=ge.current,o=n.type,e!==null&&n.stateNode!=null)e.memoizedProps!==i&&oa(n);else{if(!i){if(n.stateNode===null)throw Error(s(166));return hn(n),null}e=ie.current,Hi(n)?sf(n):(e=Oh(o,i,t),n.stateNode=e,oa(n))}return hn(n),null;case 5:if(Mt(n),o=n.type,e!==null&&n.stateNode!=null)e.memoizedProps!==i&&oa(n);else{if(!i){if(n.stateNode===null)throw Error(s(166));return hn(n),null}if(u=ie.current,Hi(n))sf(n);else{var m=As(ge.current);switch(u){case 1:u=m.createElementNS("http://www.w3.org/2000/svg",o);break;case 2:u=m.createElementNS("http://www.w3.org/1998/Math/MathML",o);break;default:switch(o){case"svg":u=m.createElementNS("http://www.w3.org/2000/svg",o);break;case"math":u=m.createElementNS("http://www.w3.org/1998/Math/MathML",o);break;case"script":u=m.createElement("div"),u.innerHTML="<script><\/script>",u=u.removeChild(u.firstChild);break;case"select":u=typeof i.is=="string"?m.createElement("select",{is:i.is}):m.createElement("select"),i.multiple?u.multiple=!0:i.size&&(u.size=i.size);break;default:u=typeof i.is=="string"?m.createElement(o,{is:i.is}):m.createElement(o)}}u[oe]=n,u[se]=i;e:for(m=n.child;m!==null;){if(m.tag===5||m.tag===6)u.appendChild(m.stateNode);else if(m.tag!==4&&m.tag!==27&&m.child!==null){m.child.return=m,m=m.child;continue}if(m===n)break e;for(;m.sibling===null;){if(m.return===null||m.return===n)break e;m=m.return}m.sibling.return=m.return,m=m.sibling}n.stateNode=u;e:switch(jn(u,o,i),o){case"button":case"input":case"select":case"textarea":i=!!i.autoFocus;break e;case"img":i=!0;break e;default:i=!1}i&&oa(n)}}return hn(n),xu(n,n.type,e===null?null:e.memoizedProps,n.pendingProps,t),null;case 6:if(e&&n.stateNode!=null)e.memoizedProps!==i&&oa(n);else{if(typeof i!="string"&&n.stateNode===null)throw Error(s(166));if(e=ge.current,Hi(n)){if(e=n.stateNode,t=n.memoizedProps,i=null,o=Un,o!==null)switch(o.tag){case 27:case 5:i=o.memoizedProps}e[oe]=n,e=!!(e.nodeValue===t||i!==null&&i.suppressHydrationWarning===!0||xh(e.nodeValue,t)),e||Ra(n,!0)}else e=As(e).createTextNode(i),e[oe]=n,n.stateNode=e}return hn(n),null;case 31:if(t=n.memoizedState,e===null||e.memoizedState!==null){if(i=Hi(n),t!==null){if(e===null){if(!i)throw Error(s(318));if(e=n.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(s(557));e[oe]=n}else fi(),(n.flags&128)===0&&(n.memoizedState=null),n.flags|=4;hn(n),e=!1}else t=Lo(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=t),e=!0;if(!e)return n.flags&256?(ct(n),n):(ct(n),null);if((n.flags&128)!==0)throw Error(s(558))}return hn(n),null;case 13:if(i=n.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(o=Hi(n),i!==null&&i.dehydrated!==null){if(e===null){if(!o)throw Error(s(318));if(o=n.memoizedState,o=o!==null?o.dehydrated:null,!o)throw Error(s(317));o[oe]=n}else fi(),(n.flags&128)===0&&(n.memoizedState=null),n.flags|=4;hn(n),o=!1}else o=Lo(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=o),o=!0;if(!o)return n.flags&256?(ct(n),n):(ct(n),null)}return ct(n),(n.flags&128)!==0?(n.lanes=t,n):(t=i!==null,e=e!==null&&e.memoizedState!==null,t&&(i=n.child,o=null,i.alternate!==null&&i.alternate.memoizedState!==null&&i.alternate.memoizedState.cachePool!==null&&(o=i.alternate.memoizedState.cachePool.pool),u=null,i.memoizedState!==null&&i.memoizedState.cachePool!==null&&(u=i.memoizedState.cachePool.pool),u!==o&&(i.flags|=2048)),t!==e&&t&&(n.child.flags|=8192),ds(n,n.updateQueue),hn(n),null);case 4:return Ke(),e===null&&qu(n.stateNode.containerInfo),hn(n),null;case 10:return ia(n.type),hn(n),null;case 19:if(B(xn),i=n.memoizedState,i===null)return hn(n),null;if(o=(n.flags&128)!==0,u=i.rendering,u===null)if(o)Zr(i,!1);else{if(En!==0||e!==null&&(e.flags&128)!==0)for(e=n.child;e!==null;){if(u=Jl(e),u!==null){for(n.flags|=128,Zr(i,!1),e=u.updateQueue,n.updateQueue=e,ds(n,e),n.subtreeFlags=0,e=t,t=n.child;t!==null;)nf(t,e),t=t.sibling;return E(xn,xn.current&1|2),He&&ta(n,i.treeForkCount),n.child}e=e.sibling}i.tail!==null&&bn()>gs&&(n.flags|=128,o=!0,Zr(i,!1),n.lanes=4194304)}else{if(!o)if(e=Jl(u),e!==null){if(n.flags|=128,o=!0,e=e.updateQueue,n.updateQueue=e,ds(n,e),Zr(i,!0),i.tail===null&&i.tailMode==="hidden"&&!u.alternate&&!He)return hn(n),null}else 2*bn()-i.renderingStartTime>gs&&t!==536870912&&(n.flags|=128,o=!0,Zr(i,!1),n.lanes=4194304);i.isBackwards?(u.sibling=n.child,n.child=u):(e=i.last,e!==null?e.sibling=u:n.child=u,i.last=u)}return i.tail!==null?(e=i.tail,i.rendering=e,i.tail=e.sibling,i.renderingStartTime=bn(),e.sibling=null,t=xn.current,E(xn,o?t&1|2:t&1),He&&ta(n,i.treeForkCount),e):(hn(n),null);case 22:case 23:return ct(n),Yo(),i=n.memoizedState!==null,e!==null?e.memoizedState!==null!==i&&(n.flags|=8192):i&&(n.flags|=8192),i?(t&536870912)!==0&&(n.flags&128)===0&&(hn(n),n.subtreeFlags&6&&(n.flags|=8192)):hn(n),t=n.updateQueue,t!==null&&ds(n,t.retryQueue),t=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(t=e.memoizedState.cachePool.pool),i=null,n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(i=n.memoizedState.cachePool.pool),i!==t&&(n.flags|=2048),e!==null&&B(mi),null;case 24:return t=null,e!==null&&(t=e.memoizedState.cache),n.memoizedState.cache!==t&&(n.flags|=2048),ia(An),hn(n),null;case 25:return null;case 30:return null}throw Error(s(156,n.tag))}function kb(e,n){switch(_o(n),n.tag){case 1:return e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 3:return ia(An),Ke(),e=n.flags,(e&65536)!==0&&(e&128)===0?(n.flags=e&-65537|128,n):null;case 26:case 27:case 5:return Mt(n),null;case 31:if(n.memoizedState!==null){if(ct(n),n.alternate===null)throw Error(s(340));fi()}return e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 13:if(ct(n),e=n.memoizedState,e!==null&&e.dehydrated!==null){if(n.alternate===null)throw Error(s(340));fi()}return e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 19:return B(xn),null;case 4:return Ke(),null;case 10:return ia(n.type),null;case 22:case 23:return ct(n),Yo(),e!==null&&B(mi),e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 24:return ia(An),null;case 25:return null;default:return null}}function kp(e,n){switch(_o(n),n.tag){case 3:ia(An),Ke();break;case 26:case 27:case 5:Mt(n);break;case 4:Ke();break;case 31:n.memoizedState!==null&&ct(n);break;case 13:ct(n);break;case 19:B(xn);break;case 10:ia(n.type);break;case 22:case 23:ct(n),Yo(),e!==null&&B(mi);break;case 24:ia(An)}}function Vr(e,n){try{var t=n.updateQueue,i=t!==null?t.lastEffect:null;if(i!==null){var o=i.next;t=o;do{if((t.tag&e)===e){i=void 0;var u=t.create,m=t.inst;i=u(),m.destroy=i}t=t.next}while(t!==o)}}catch(z){nn(n,n.return,z)}}function Oa(e,n,t){try{var i=n.updateQueue,o=i!==null?i.lastEffect:null;if(o!==null){var u=o.next;i=u;do{if((i.tag&e)===e){var m=i.inst,z=m.destroy;if(z!==void 0){m.destroy=void 0,o=n;var x=t,_=z;try{_()}catch(j){nn(o,x,j)}}}i=i.next}while(i!==u)}}catch(j){nn(n,n.return,j)}}function Ip(e){var n=e.updateQueue;if(n!==null){var t=e.stateNode;try{vf(n,t)}catch(i){nn(e,e.return,i)}}}function Mp(e,n,t){t.props=vi(e.type,e.memoizedProps),t.state=e.memoizedState;try{t.componentWillUnmount()}catch(i){nn(e,n,i)}}function qr(e,n){try{var t=e.ref;if(t!==null){switch(e.tag){case 26:case 27:case 5:var i=e.stateNode;break;case 30:i=e.stateNode;break;default:i=e.stateNode}typeof t=="function"?e.refCleanup=t(i):t.current=i}}catch(o){nn(e,n,o)}}function Zt(e,n){var t=e.ref,i=e.refCleanup;if(t!==null)if(typeof i=="function")try{i()}catch(o){nn(e,n,o)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof t=="function")try{t(null)}catch(o){nn(e,n,o)}else t.current=null}function _p(e){var n=e.type,t=e.memoizedProps,i=e.stateNode;try{e:switch(n){case"button":case"input":case"select":case"textarea":t.autoFocus&&i.focus();break e;case"img":t.src?i.src=t.src:t.srcSet&&(i.srcset=t.srcSet)}}catch(o){nn(e,e.return,o)}}function Tu(e,n,t){try{var i=e.stateNode;Fb(i,e.type,t,n),i[se]=n}catch(o){nn(e,e.return,o)}}function Cp(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&Xa(e.type)||e.tag===4}function Au(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||Cp(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&Xa(e.type)||e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function wu(e,n,t){var i=e.tag;if(i===5||i===6)e=e.stateNode,n?(t.nodeType===9?t.body:t.nodeName==="HTML"?t.ownerDocument.body:t).insertBefore(e,n):(n=t.nodeType===9?t.body:t.nodeName==="HTML"?t.ownerDocument.body:t,n.appendChild(e),t=t._reactRootContainer,t!=null||n.onclick!==null||(n.onclick=$t));else if(i!==4&&(i===27&&Xa(e.type)&&(t=e.stateNode,n=null),e=e.child,e!==null))for(wu(e,n,t),e=e.sibling;e!==null;)wu(e,n,t),e=e.sibling}function fs(e,n,t){var i=e.tag;if(i===5||i===6)e=e.stateNode,n?t.insertBefore(e,n):t.appendChild(e);else if(i!==4&&(i===27&&Xa(e.type)&&(t=e.stateNode),e=e.child,e!==null))for(fs(e,n,t),e=e.sibling;e!==null;)fs(e,n,t),e=e.sibling}function Lp(e){var n=e.stateNode,t=e.memoizedProps;try{for(var i=e.type,o=n.attributes;o.length;)n.removeAttributeNode(o[0]);jn(n,i,t),n[oe]=e,n[se]=t}catch(u){nn(e,e.return,u)}}var ua=!1,kn=!1,Ru=!1,Op=typeof WeakSet=="function"?WeakSet:Set,On=null;function Ib(e,n){if(e=e.containerInfo,Qu=Cs,e=qd(e),So(e)){if("selectionStart"in e)var t={start:e.selectionStart,end:e.selectionEnd};else e:{t=(t=e.ownerDocument)&&t.defaultView||window;var i=t.getSelection&&t.getSelection();if(i&&i.rangeCount!==0){t=i.anchorNode;var o=i.anchorOffset,u=i.focusNode;i=i.focusOffset;try{t.nodeType,u.nodeType}catch{t=null;break e}var m=0,z=-1,x=-1,_=0,j=0,Y=e,O=null;n:for(;;){for(var U;Y!==t||o!==0&&Y.nodeType!==3||(z=m+o),Y!==u||i!==0&&Y.nodeType!==3||(x=m+i),Y.nodeType===3&&(m+=Y.nodeValue.length),(U=Y.firstChild)!==null;)O=Y,Y=U;for(;;){if(Y===e)break n;if(O===t&&++_===o&&(z=m),O===u&&++j===i&&(x=m),(U=Y.nextSibling)!==null)break;Y=O,O=Y.parentNode}Y=U}t=z===-1||x===-1?null:{start:z,end:x}}else t=null}t=t||{start:0,end:0}}else t=null;for(Ku={focusedElem:e,selectionRange:t},Cs=!1,On=n;On!==null;)if(n=On,e=n.child,(n.subtreeFlags&1028)!==0&&e!==null)e.return=n,On=e;else for(;On!==null;){switch(n=On,u=n.alternate,e=n.flags,n.tag){case 0:if((e&4)!==0&&(e=n.updateQueue,e=e!==null?e.events:null,e!==null))for(t=0;t<e.length;t++)o=e[t],o.ref.impl=o.nextImpl;break;case 11:case 15:break;case 1:if((e&1024)!==0&&u!==null){e=void 0,t=n,o=u.memoizedProps,u=u.memoizedState,i=t.stateNode;try{var he=vi(t.type,o);e=i.getSnapshotBeforeUpdate(he,u),i.__reactInternalSnapshotBeforeUpdate=e}catch(De){nn(t,t.return,De)}}break;case 3:if((e&1024)!==0){if(e=n.stateNode.containerInfo,t=e.nodeType,t===9)$u(e);else if(t===1)switch(e.nodeName){case"HEAD":case"HTML":case"BODY":$u(e);break;default:e.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((e&1024)!==0)throw Error(s(163))}if(e=n.sibling,e!==null){e.return=n.return,On=e;break}On=n.return}}function Np(e,n,t){var i=t.flags;switch(t.tag){case 0:case 11:case 15:da(e,t),i&4&&Vr(5,t);break;case 1:if(da(e,t),i&4)if(e=t.stateNode,n===null)try{e.componentDidMount()}catch(m){nn(t,t.return,m)}else{var o=vi(t.type,n.memoizedProps);n=n.memoizedState;try{e.componentDidUpdate(o,n,e.__reactInternalSnapshotBeforeUpdate)}catch(m){nn(t,t.return,m)}}i&64&&Ip(t),i&512&&qr(t,t.return);break;case 3:if(da(e,t),i&64&&(e=t.updateQueue,e!==null)){if(n=null,t.child!==null)switch(t.child.tag){case 27:case 5:n=t.child.stateNode;break;case 1:n=t.child.stateNode}try{vf(e,n)}catch(m){nn(t,t.return,m)}}break;case 27:n===null&&i&4&&Lp(t);case 26:case 5:da(e,t),n===null&&i&4&&_p(t),i&512&&qr(t,t.return);break;case 12:da(e,t);break;case 31:da(e,t),i&4&&Pp(e,t);break;case 13:da(e,t),i&4&&Bp(e,t),i&64&&(e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(t=Pb.bind(null,t),r1(e,t))));break;case 22:if(i=t.memoizedState!==null||ua,!i){n=n!==null&&n.memoizedState!==null||kn,o=ua;var u=kn;ua=i,(kn=n)&&!u?fa(e,t,(t.subtreeFlags&8772)!==0):da(e,t),ua=o,kn=u}break;case 30:break;default:da(e,t)}}function Wp(e){var n=e.alternate;n!==null&&(e.alternate=null,Wp(n)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(n=e.stateNode,n!==null&&on(n)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var gn=null,Fn=!1;function ca(e,n,t){for(t=t.child;t!==null;)Up(e,n,t),t=t.sibling}function Up(e,n,t){if(zn&&typeof zn.onCommitFiberUnmount=="function")try{zn.onCommitFiberUnmount(mn,t)}catch{}switch(t.tag){case 26:kn||Zt(t,n),ca(e,n,t),t.memoizedState?t.memoizedState.count--:t.stateNode&&(t=t.stateNode,t.parentNode.removeChild(t));break;case 27:kn||Zt(t,n);var i=gn,o=Fn;Xa(t.type)&&(gn=t.stateNode,Fn=!1),ca(e,n,t),nl(t.stateNode),gn=i,Fn=o;break;case 5:kn||Zt(t,n);case 6:if(i=gn,o=Fn,gn=null,ca(e,n,t),gn=i,Fn=o,gn!==null)if(Fn)try{(gn.nodeType===9?gn.body:gn.nodeName==="HTML"?gn.ownerDocument.body:gn).removeChild(t.stateNode)}catch(u){nn(t,n,u)}else try{gn.removeChild(t.stateNode)}catch(u){nn(t,n,u)}break;case 18:gn!==null&&(Fn?(e=gn,Ih(e.nodeType===9?e.body:e.nodeName==="HTML"?e.ownerDocument.body:e,t.stateNode),cr(e)):Ih(gn,t.stateNode));break;case 4:i=gn,o=Fn,gn=t.stateNode.containerInfo,Fn=!0,ca(e,n,t),gn=i,Fn=o;break;case 0:case 11:case 14:case 15:Oa(2,t,n),kn||Oa(4,t,n),ca(e,n,t);break;case 1:kn||(Zt(t,n),i=t.stateNode,typeof i.componentWillUnmount=="function"&&Mp(t,n,i)),ca(e,n,t);break;case 21:ca(e,n,t);break;case 22:kn=(i=kn)||t.memoizedState!==null,ca(e,n,t),kn=i;break;default:ca(e,n,t)}}function Pp(e,n){if(n.memoizedState===null&&(e=n.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{cr(e)}catch(t){nn(n,n.return,t)}}}function Bp(e,n){if(n.memoizedState===null&&(e=n.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{cr(e)}catch(t){nn(n,n.return,t)}}function Mb(e){switch(e.tag){case 31:case 13:case 19:var n=e.stateNode;return n===null&&(n=e.stateNode=new Op),n;case 22:return e=e.stateNode,n=e._retryCache,n===null&&(n=e._retryCache=new Op),n;default:throw Error(s(435,e.tag))}}function ps(e,n){var t=Mb(e);n.forEach(function(i){if(!t.has(i)){t.add(i);var o=Bb.bind(null,e,i);i.then(o,o)}})}function Jn(e,n){var t=n.deletions;if(t!==null)for(var i=0;i<t.length;i++){var o=t[i],u=e,m=n,z=m;e:for(;z!==null;){switch(z.tag){case 27:if(Xa(z.type)){gn=z.stateNode,Fn=!1;break e}break;case 5:gn=z.stateNode,Fn=!1;break e;case 3:case 4:gn=z.stateNode.containerInfo,Fn=!0;break e}z=z.return}if(gn===null)throw Error(s(160));Up(u,m,o),gn=null,Fn=!1,u=o.alternate,u!==null&&(u.return=null),o.return=null}if(n.subtreeFlags&13886)for(n=n.child;n!==null;)jp(n,e),n=n.sibling}var Wt=null;function jp(e,n){var t=e.alternate,i=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:Jn(n,e),$n(e),i&4&&(Oa(3,e,e.return),Vr(3,e),Oa(5,e,e.return));break;case 1:Jn(n,e),$n(e),i&512&&(kn||t===null||Zt(t,t.return)),i&64&&ua&&(e=e.updateQueue,e!==null&&(i=e.callbacks,i!==null&&(t=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=t===null?i:t.concat(i))));break;case 26:var o=Wt;if(Jn(n,e),$n(e),i&512&&(kn||t===null||Zt(t,t.return)),i&4){var u=t!==null?t.memoizedState:null;if(i=e.memoizedState,t===null)if(i===null)if(e.stateNode===null){e:{i=e.type,t=e.memoizedProps,o=o.ownerDocument||o;n:switch(i){case"title":u=o.getElementsByTagName("title")[0],(!u||u[We]||u[oe]||u.namespaceURI==="http://www.w3.org/2000/svg"||u.hasAttribute("itemprop"))&&(u=o.createElement(i),o.head.insertBefore(u,o.querySelector("head > title"))),jn(u,i,t),u[oe]=e,vn(u),i=u;break e;case"link":var m=jh("link","href",o).get(i+(t.href||""));if(m){for(var z=0;z<m.length;z++)if(u=m[z],u.getAttribute("href")===(t.href==null||t.href===""?null:t.href)&&u.getAttribute("rel")===(t.rel==null?null:t.rel)&&u.getAttribute("title")===(t.title==null?null:t.title)&&u.getAttribute("crossorigin")===(t.crossOrigin==null?null:t.crossOrigin)){m.splice(z,1);break n}}u=o.createElement(i),jn(u,i,t),o.head.appendChild(u);break;case"meta":if(m=jh("meta","content",o).get(i+(t.content||""))){for(z=0;z<m.length;z++)if(u=m[z],u.getAttribute("content")===(t.content==null?null:""+t.content)&&u.getAttribute("name")===(t.name==null?null:t.name)&&u.getAttribute("property")===(t.property==null?null:t.property)&&u.getAttribute("http-equiv")===(t.httpEquiv==null?null:t.httpEquiv)&&u.getAttribute("charset")===(t.charSet==null?null:t.charSet)){m.splice(z,1);break n}}u=o.createElement(i),jn(u,i,t),o.head.appendChild(u);break;default:throw Error(s(468,i))}u[oe]=e,vn(u),i=u}e.stateNode=i}else Xh(o,e.type,e.stateNode);else e.stateNode=Bh(o,i,e.memoizedProps);else u!==i?(u===null?t.stateNode!==null&&(t=t.stateNode,t.parentNode.removeChild(t)):u.count--,i===null?Xh(o,e.type,e.stateNode):Bh(o,i,e.memoizedProps)):i===null&&e.stateNode!==null&&Tu(e,e.memoizedProps,t.memoizedProps)}break;case 27:Jn(n,e),$n(e),i&512&&(kn||t===null||Zt(t,t.return)),t!==null&&i&4&&Tu(e,e.memoizedProps,t.memoizedProps);break;case 5:if(Jn(n,e),$n(e),i&512&&(kn||t===null||Zt(t,t.return)),e.flags&32){o=e.stateNode;try{Ci(o,"")}catch(he){nn(e,e.return,he)}}i&4&&e.stateNode!=null&&(o=e.memoizedProps,Tu(e,o,t!==null?t.memoizedProps:o)),i&1024&&(Ru=!0);break;case 6:if(Jn(n,e),$n(e),i&4){if(e.stateNode===null)throw Error(s(162));i=e.memoizedProps,t=e.stateNode;try{t.nodeValue=i}catch(he){nn(e,e.return,he)}}break;case 3:if(ks=null,o=Wt,Wt=ws(n.containerInfo),Jn(n,e),Wt=o,$n(e),i&4&&t!==null&&t.memoizedState.isDehydrated)try{cr(n.containerInfo)}catch(he){nn(e,e.return,he)}Ru&&(Ru=!1,Xp(e));break;case 4:i=Wt,Wt=ws(e.stateNode.containerInfo),Jn(n,e),$n(e),Wt=i;break;case 12:Jn(n,e),$n(e);break;case 31:Jn(n,e),$n(e),i&4&&(i=e.updateQueue,i!==null&&(e.updateQueue=null,ps(e,i)));break;case 13:Jn(n,e),$n(e),e.child.flags&8192&&e.memoizedState!==null!=(t!==null&&t.memoizedState!==null)&&(ms=bn()),i&4&&(i=e.updateQueue,i!==null&&(e.updateQueue=null,ps(e,i)));break;case 22:o=e.memoizedState!==null;var x=t!==null&&t.memoizedState!==null,_=ua,j=kn;if(ua=_||o,kn=j||x,Jn(n,e),kn=j,ua=_,$n(e),i&8192)e:for(n=e.stateNode,n._visibility=o?n._visibility&-2:n._visibility|1,o&&(t===null||x||ua||kn||Si(e)),t=null,n=e;;){if(n.tag===5||n.tag===26){if(t===null){x=t=n;try{if(u=x.stateNode,o)m=u.style,typeof m.setProperty=="function"?m.setProperty("display","none","important"):m.display="none";else{z=x.stateNode;var Y=x.memoizedProps.style,O=Y!=null&&Y.hasOwnProperty("display")?Y.display:null;z.style.display=O==null||typeof O=="boolean"?"":(""+O).trim()}}catch(he){nn(x,x.return,he)}}}else if(n.tag===6){if(t===null){x=n;try{x.stateNode.nodeValue=o?"":x.memoizedProps}catch(he){nn(x,x.return,he)}}}else if(n.tag===18){if(t===null){x=n;try{var U=x.stateNode;o?Mh(U,!0):Mh(x.stateNode,!1)}catch(he){nn(x,x.return,he)}}}else if((n.tag!==22&&n.tag!==23||n.memoizedState===null||n===e)&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break e;for(;n.sibling===null;){if(n.return===null||n.return===e)break e;t===n&&(t=null),n=n.return}t===n&&(t=null),n.sibling.return=n.return,n=n.sibling}i&4&&(i=e.updateQueue,i!==null&&(t=i.retryQueue,t!==null&&(i.retryQueue=null,ps(e,t))));break;case 19:Jn(n,e),$n(e),i&4&&(i=e.updateQueue,i!==null&&(e.updateQueue=null,ps(e,i)));break;case 30:break;case 21:break;default:Jn(n,e),$n(e)}}function $n(e){var n=e.flags;if(n&2){try{for(var t,i=e.return;i!==null;){if(Cp(i)){t=i;break}i=i.return}if(t==null)throw Error(s(160));switch(t.tag){case 27:var o=t.stateNode,u=Au(e);fs(e,u,o);break;case 5:var m=t.stateNode;t.flags&32&&(Ci(m,""),t.flags&=-33);var z=Au(e);fs(e,z,m);break;case 3:case 4:var x=t.stateNode.containerInfo,_=Au(e);wu(e,_,x);break;default:throw Error(s(161))}}catch(j){nn(e,e.return,j)}e.flags&=-3}n&4096&&(e.flags&=-4097)}function Xp(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var n=e;Xp(n),n.tag===5&&n.flags&1024&&n.stateNode.reset(),e=e.sibling}}function da(e,n){if(n.subtreeFlags&8772)for(n=n.child;n!==null;)Np(e,n.alternate,n),n=n.sibling}function Si(e){for(e=e.child;e!==null;){var n=e;switch(n.tag){case 0:case 11:case 14:case 15:Oa(4,n,n.return),Si(n);break;case 1:Zt(n,n.return);var t=n.stateNode;typeof t.componentWillUnmount=="function"&&Mp(n,n.return,t),Si(n);break;case 27:nl(n.stateNode);case 26:case 5:Zt(n,n.return),Si(n);break;case 22:n.memoizedState===null&&Si(n);break;case 30:Si(n);break;default:Si(n)}e=e.sibling}}function fa(e,n,t){for(t=t&&(n.subtreeFlags&8772)!==0,n=n.child;n!==null;){var i=n.alternate,o=e,u=n,m=u.flags;switch(u.tag){case 0:case 11:case 15:fa(o,u,t),Vr(4,u);break;case 1:if(fa(o,u,t),i=u,o=i.stateNode,typeof o.componentDidMount=="function")try{o.componentDidMount()}catch(_){nn(i,i.return,_)}if(i=u,o=i.updateQueue,o!==null){var z=i.stateNode;try{var x=o.shared.hiddenCallbacks;if(x!==null)for(o.shared.hiddenCallbacks=null,o=0;o<x.length;o++)zf(x[o],z)}catch(_){nn(i,i.return,_)}}t&&m&64&&Ip(u),qr(u,u.return);break;case 27:Lp(u);case 26:case 5:fa(o,u,t),t&&i===null&&m&4&&_p(u),qr(u,u.return);break;case 12:fa(o,u,t);break;case 31:fa(o,u,t),t&&m&4&&Pp(o,u);break;case 13:fa(o,u,t),t&&m&4&&Bp(o,u);break;case 22:u.memoizedState===null&&fa(o,u,t),qr(u,u.return);break;case 30:break;default:fa(o,u,t)}n=n.sibling}}function ku(e,n){var t=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(t=e.memoizedState.cachePool.pool),e=null,n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(e=n.memoizedState.cachePool.pool),e!==t&&(e!=null&&e.refCount++,t!=null&&_r(t))}function Iu(e,n){e=null,n.alternate!==null&&(e=n.alternate.memoizedState.cache),n=n.memoizedState.cache,n!==e&&(n.refCount++,e!=null&&_r(e))}function Ut(e,n,t,i){if(n.subtreeFlags&10256)for(n=n.child;n!==null;)Hp(e,n,t,i),n=n.sibling}function Hp(e,n,t,i){var o=n.flags;switch(n.tag){case 0:case 11:case 15:Ut(e,n,t,i),o&2048&&Vr(9,n);break;case 1:Ut(e,n,t,i);break;case 3:Ut(e,n,t,i),o&2048&&(e=null,n.alternate!==null&&(e=n.alternate.memoizedState.cache),n=n.memoizedState.cache,n!==e&&(n.refCount++,e!=null&&_r(e)));break;case 12:if(o&2048){Ut(e,n,t,i),e=n.stateNode;try{var u=n.memoizedProps,m=u.id,z=u.onPostCommit;typeof z=="function"&&z(m,n.alternate===null?"mount":"update",e.passiveEffectDuration,-0)}catch(x){nn(n,n.return,x)}}else Ut(e,n,t,i);break;case 31:Ut(e,n,t,i);break;case 13:Ut(e,n,t,i);break;case 23:break;case 22:u=n.stateNode,m=n.alternate,n.memoizedState!==null?u._visibility&2?Ut(e,n,t,i):Yr(e,n):u._visibility&2?Ut(e,n,t,i):(u._visibility|=2,$i(e,n,t,i,(n.subtreeFlags&10256)!==0||!1)),o&2048&&ku(m,n);break;case 24:Ut(e,n,t,i),o&2048&&Iu(n.alternate,n);break;default:Ut(e,n,t,i)}}function $i(e,n,t,i,o){for(o=o&&((n.subtreeFlags&10256)!==0||!1),n=n.child;n!==null;){var u=e,m=n,z=t,x=i,_=m.flags;switch(m.tag){case 0:case 11:case 15:$i(u,m,z,x,o),Vr(8,m);break;case 23:break;case 22:var j=m.stateNode;m.memoizedState!==null?j._visibility&2?$i(u,m,z,x,o):Yr(u,m):(j._visibility|=2,$i(u,m,z,x,o)),o&&_&2048&&ku(m.alternate,m);break;case 24:$i(u,m,z,x,o),o&&_&2048&&Iu(m.alternate,m);break;default:$i(u,m,z,x,o)}n=n.sibling}}function Yr(e,n){if(n.subtreeFlags&10256)for(n=n.child;n!==null;){var t=e,i=n,o=i.flags;switch(i.tag){case 22:Yr(t,i),o&2048&&ku(i.alternate,i);break;case 24:Yr(t,i),o&2048&&Iu(i.alternate,i);break;default:Yr(t,i)}n=n.sibling}}var Gr=8192;function er(e,n,t){if(e.subtreeFlags&Gr)for(e=e.child;e!==null;)Zp(e,n,t),e=e.sibling}function Zp(e,n,t){switch(e.tag){case 26:er(e,n,t),e.flags&Gr&&e.memoizedState!==null&&y1(t,Wt,e.memoizedState,e.memoizedProps);break;case 5:er(e,n,t);break;case 3:case 4:var i=Wt;Wt=ws(e.stateNode.containerInfo),er(e,n,t),Wt=i;break;case 22:e.memoizedState===null&&(i=e.alternate,i!==null&&i.memoizedState!==null?(i=Gr,Gr=16777216,er(e,n,t),Gr=i):er(e,n,t));break;default:er(e,n,t)}}function Vp(e){var n=e.alternate;if(n!==null&&(e=n.child,e!==null)){n.child=null;do n=e.sibling,e.sibling=null,e=n;while(e!==null)}}function Qr(e){var n=e.deletions;if((e.flags&16)!==0){if(n!==null)for(var t=0;t<n.length;t++){var i=n[t];On=i,Yp(i,e)}Vp(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)qp(e),e=e.sibling}function qp(e){switch(e.tag){case 0:case 11:case 15:Qr(e),e.flags&2048&&Oa(9,e,e.return);break;case 3:Qr(e);break;case 12:Qr(e);break;case 22:var n=e.stateNode;e.memoizedState!==null&&n._visibility&2&&(e.return===null||e.return.tag!==13)?(n._visibility&=-3,hs(e)):Qr(e);break;default:Qr(e)}}function hs(e){var n=e.deletions;if((e.flags&16)!==0){if(n!==null)for(var t=0;t<n.length;t++){var i=n[t];On=i,Yp(i,e)}Vp(e)}for(e=e.child;e!==null;){switch(n=e,n.tag){case 0:case 11:case 15:Oa(8,n,n.return),hs(n);break;case 22:t=n.stateNode,t._visibility&2&&(t._visibility&=-3,hs(n));break;default:hs(n)}e=e.sibling}}function Yp(e,n){for(;On!==null;){var t=On;switch(t.tag){case 0:case 11:case 15:Oa(8,t,n);break;case 23:case 22:if(t.memoizedState!==null&&t.memoizedState.cachePool!==null){var i=t.memoizedState.cachePool.pool;i!=null&&i.refCount++}break;case 24:_r(t.memoizedState.cache)}if(i=t.child,i!==null)i.return=t,On=i;else e:for(t=e;On!==null;){i=On;var o=i.sibling,u=i.return;if(Wp(i),i===t){On=null;break e}if(o!==null){o.return=u,On=o;break e}On=u}}}var _b={getCacheForType:function(e){var n=Pn(An),t=n.data.get(e);return t===void 0&&(t=e(),n.data.set(e,t)),t},cacheSignal:function(){return Pn(An).controller.signal}},Cb=typeof WeakMap=="function"?WeakMap:Map,Ge=0,sn=null,Ue=null,je=0,en=0,dt=null,Na=!1,nr=!1,Mu=!1,pa=0,En=0,Wa=0,Ei=0,_u=0,ft=0,tr=0,Kr=null,et=null,Cu=!1,ms=0,Gp=0,gs=1/0,ys=null,Ua=null,Cn=0,Pa=null,ar=null,ha=0,Lu=0,Ou=null,Qp=null,Fr=0,Nu=null;function pt(){return(Ge&2)!==0&&je!==0?je&-je:C.T!==null?Xu():Se()}function Kp(){if(ft===0)if((je&536870912)===0||He){var e=Sa;Sa<<=1,(Sa&3932160)===0&&(Sa=262144),ft=e}else ft=536870912;return e=ut.current,e!==null&&(e.flags|=32),ft}function nt(e,n,t){(e===sn&&(en===2||en===9)||e.cancelPendingCommit!==null)&&(ir(e,0),Ba(e,je,ft,!1)),ri(e,t),((Ge&2)===0||e!==sn)&&(e===sn&&((Ge&2)===0&&(Ei|=t),En===4&&Ba(e,je,ft,!1)),Vt(e))}function Fp(e,n,t){if((Ge&6)!==0)throw Error(s(327));var i=!t&&(n&127)===0&&(n&e.expiredLanes)===0||ai(e,n),o=i?Nb(e,n):Uu(e,n,!0),u=i;do{if(o===0){nr&&!i&&Ba(e,n,0,!1);break}else{if(t=e.current.alternate,u&&!Lb(t)){o=Uu(e,n,!1),u=!1;continue}if(o===2){if(u=n,e.errorRecoveryDisabledLanes&u)var m=0;else m=e.pendingLanes&-536870913,m=m!==0?m:m&536870912?536870912:0;if(m!==0){n=m;e:{var z=e;o=Kr;var x=z.current.memoizedState.isDehydrated;if(x&&(ir(z,m).flags|=256),m=Uu(z,m,!1),m!==2){if(Mu&&!x){z.errorRecoveryDisabledLanes|=u,Ei|=u,o=4;break e}u=et,et=o,u!==null&&(et===null?et=u:et.push.apply(et,u))}o=m}if(u=!1,o!==2)continue}}if(o===1){ir(e,0),Ba(e,n,0,!0);break}e:{switch(i=e,u=o,u){case 0:case 1:throw Error(s(345));case 4:if((n&4194048)!==n)break;case 6:Ba(i,n,ft,!Na);break e;case 2:et=null;break;case 3:case 5:break;default:throw Error(s(329))}if((n&62914560)===n&&(o=ms+300-bn(),10<o)){if(Ba(i,n,ft,!Na),ti(i,0,!0)!==0)break e;ha=n,i.timeoutHandle=Rh(Jp.bind(null,i,t,et,ys,Cu,n,ft,Ei,tr,Na,u,"Throttled",-0,0),o);break e}Jp(i,t,et,ys,Cu,n,ft,Ei,tr,Na,u,null,-0,0)}}break}while(!0);Vt(e)}function Jp(e,n,t,i,o,u,m,z,x,_,j,Y,O,U){if(e.timeoutHandle=-1,Y=n.subtreeFlags,Y&8192||(Y&16785408)===16785408){Y={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:$t},Zp(n,u,Y);var he=(u&62914560)===u?ms-bn():(u&4194048)===u?Gp-bn():0;if(he=b1(Y,he),he!==null){ha=u,e.cancelPendingCommit=he(lh.bind(null,e,n,u,t,i,o,m,z,x,j,Y,null,O,U)),Ba(e,u,m,!_);return}}lh(e,n,u,t,i,o,m,z,x)}function Lb(e){for(var n=e;;){var t=n.tag;if((t===0||t===11||t===15)&&n.flags&16384&&(t=n.updateQueue,t!==null&&(t=t.stores,t!==null)))for(var i=0;i<t.length;i++){var o=t[i],u=o.getSnapshot;o=o.value;try{if(!st(u(),o))return!1}catch{return!1}}if(t=n.child,n.subtreeFlags&16384&&t!==null)t.return=n,n=t;else{if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return!0;n=n.return}n.sibling.return=n.return,n=n.sibling}}return!0}function Ba(e,n,t,i){n&=~_u,n&=~Ei,e.suspendedLanes|=n,e.pingedLanes&=~n,i&&(e.warmLanes|=n),i=e.expirationTimes;for(var o=n;0<o;){var u=31-Fe(o),m=1<<u;i[u]=-1,o&=~m}t!==0&&A(e,t,n)}function bs(){return(Ge&6)===0?(Jr(0),!1):!0}function Wu(){if(Ue!==null){if(en===0)var e=Ue.return;else e=Ue,aa=pi=null,$o(e),Gi=null,Lr=0,e=Ue;for(;e!==null;)kp(e.alternate,e),e=e.return;Ue=null}}function ir(e,n){var t=e.timeoutHandle;t!==-1&&(e.timeoutHandle=-1,e1(t)),t=e.cancelPendingCommit,t!==null&&(e.cancelPendingCommit=null,t()),ha=0,Wu(),sn=e,Ue=t=na(e.current,null),je=n,en=0,dt=null,Na=!1,nr=ai(e,n),Mu=!1,tr=ft=_u=Ei=Wa=En=0,et=Kr=null,Cu=!1,(n&8)!==0&&(n|=n&32);var i=e.entangledLanes;if(i!==0)for(e=e.entanglements,i&=n;0<i;){var o=31-Fe(i),u=1<<o;n|=e[o],i&=~u}return pa=n,Pl(),t}function $p(e,n){Ce=null,C.H=Xr,n===Yi||n===Yl?(n=mf(),en=3):n===jo?(n=mf(),en=4):en=n===mu?8:n!==null&&typeof n=="object"&&typeof n.then=="function"?6:1,dt=n,Ue===null&&(En=1,ss(e,Dt(n,e.current)))}function eh(){var e=ut.current;return e===null?!0:(je&4194048)===je?wt===null:(je&62914560)===je||(je&536870912)!==0?e===wt:!1}function nh(){var e=C.H;return C.H=Xr,e===null?Xr:e}function th(){var e=C.A;return C.A=_b,e}function zs(){En=4,Na||(je&4194048)!==je&&ut.current!==null||(nr=!0),(Wa&134217727)===0&&(Ei&134217727)===0||sn===null||Ba(sn,je,ft,!1)}function Uu(e,n,t){var i=Ge;Ge|=2;var o=nh(),u=th();(sn!==e||je!==n)&&(ys=null,ir(e,n)),n=!1;var m=En;e:do try{if(en!==0&&Ue!==null){var z=Ue,x=dt;switch(en){case 8:Wu(),m=6;break e;case 3:case 2:case 9:case 6:ut.current===null&&(n=!0);var _=en;if(en=0,dt=null,rr(e,z,x,_),t&&nr){m=0;break e}break;default:_=en,en=0,dt=null,rr(e,z,x,_)}}Ob(),m=En;break}catch(j){$p(e,j)}while(!0);return n&&e.shellSuspendCounter++,aa=pi=null,Ge=i,C.H=o,C.A=u,Ue===null&&(sn=null,je=0,Pl()),m}function Ob(){for(;Ue!==null;)ah(Ue)}function Nb(e,n){var t=Ge;Ge|=2;var i=nh(),o=th();sn!==e||je!==n?(ys=null,gs=bn()+500,ir(e,n)):nr=ai(e,n);e:do try{if(en!==0&&Ue!==null){n=Ue;var u=dt;n:switch(en){case 1:en=0,dt=null,rr(e,n,u,1);break;case 2:case 9:if(pf(u)){en=0,dt=null,ih(n);break}n=function(){en!==2&&en!==9||sn!==e||(en=7),Vt(e)},u.then(n,n);break e;case 3:en=7;break e;case 4:en=5;break e;case 7:pf(u)?(en=0,dt=null,ih(n)):(en=0,dt=null,rr(e,n,u,7));break;case 5:var m=null;switch(Ue.tag){case 26:m=Ue.memoizedState;case 5:case 27:var z=Ue;if(m?Hh(m):z.stateNode.complete){en=0,dt=null;var x=z.sibling;if(x!==null)Ue=x;else{var _=z.return;_!==null?(Ue=_,vs(_)):Ue=null}break n}}en=0,dt=null,rr(e,n,u,5);break;case 6:en=0,dt=null,rr(e,n,u,6);break;case 8:Wu(),En=6;break e;default:throw Error(s(462))}}Wb();break}catch(j){$p(e,j)}while(!0);return aa=pi=null,C.H=i,C.A=o,Ge=t,Ue!==null?0:(sn=null,je=0,Pl(),En)}function Wb(){for(;Ue!==null&&!zr();)ah(Ue)}function ah(e){var n=wp(e.alternate,e,pa);e.memoizedProps=e.pendingProps,n===null?vs(e):Ue=n}function ih(e){var n=e,t=n.alternate;switch(n.tag){case 15:case 0:n=Sp(t,n,n.pendingProps,n.type,void 0,je);break;case 11:n=Sp(t,n,n.pendingProps,n.type.render,n.ref,je);break;case 5:$o(n);default:kp(t,n),n=Ue=nf(n,pa),n=wp(t,n,pa)}e.memoizedProps=e.pendingProps,n===null?vs(e):Ue=n}function rr(e,n,t,i){aa=pi=null,$o(n),Gi=null,Lr=0;var o=n.return;try{if(Tb(e,o,n,t,je)){En=1,ss(e,Dt(t,e.current)),Ue=null;return}}catch(u){if(o!==null)throw Ue=o,u;En=1,ss(e,Dt(t,e.current)),Ue=null;return}n.flags&32768?(He||i===1?e=!0:nr||(je&536870912)!==0?e=!1:(Na=e=!0,(i===2||i===9||i===3||i===6)&&(i=ut.current,i!==null&&i.tag===13&&(i.flags|=16384))),rh(n,e)):vs(n)}function vs(e){var n=e;do{if((n.flags&32768)!==0){rh(n,Na);return}e=n.return;var t=Rb(n.alternate,n,pa);if(t!==null){Ue=t;return}if(n=n.sibling,n!==null){Ue=n;return}Ue=n=e}while(n!==null);En===0&&(En=5)}function rh(e,n){do{var t=kb(e.alternate,e);if(t!==null){t.flags&=32767,Ue=t;return}if(t=e.return,t!==null&&(t.flags|=32768,t.subtreeFlags=0,t.deletions=null),!n&&(e=e.sibling,e!==null)){Ue=e;return}Ue=e=t}while(e!==null);En=6,Ue=null}function lh(e,n,t,i,o,u,m,z,x){e.cancelPendingCommit=null;do Ss();while(Cn!==0);if((Ge&6)!==0)throw Error(s(327));if(n!==null){if(n===e.current)throw Error(s(177));if(u=n.lanes|n.childLanes,u|=Ao,ao(e,t,u,m,z,x),e===sn&&(Ue=sn=null,je=0),ar=n,Pa=e,ha=t,Lu=u,Ou=o,Qp=i,(n.subtreeFlags&10256)!==0||(n.flags&10256)!==0?(e.callbackNode=null,e.callbackPriority=0,jb(ve,function(){return dh(),null})):(e.callbackNode=null,e.callbackPriority=0),i=(n.flags&13878)!==0,(n.subtreeFlags&13878)!==0||i){i=C.T,C.T=null,o=K.p,K.p=2,m=Ge,Ge|=4;try{Ib(e,n,t)}finally{Ge=m,K.p=o,C.T=i}}Cn=1,sh(),oh(),uh()}}function sh(){if(Cn===1){Cn=0;var e=Pa,n=ar,t=(n.flags&13878)!==0;if((n.subtreeFlags&13878)!==0||t){t=C.T,C.T=null;var i=K.p;K.p=2;var o=Ge;Ge|=4;try{jp(n,e);var u=Ku,m=qd(e.containerInfo),z=u.focusedElem,x=u.selectionRange;if(m!==z&&z&&z.ownerDocument&&Vd(z.ownerDocument.documentElement,z)){if(x!==null&&So(z)){var _=x.start,j=x.end;if(j===void 0&&(j=_),"selectionStart"in z)z.selectionStart=_,z.selectionEnd=Math.min(j,z.value.length);else{var Y=z.ownerDocument||document,O=Y&&Y.defaultView||window;if(O.getSelection){var U=O.getSelection(),he=z.textContent.length,De=Math.min(x.start,he),ln=x.end===void 0?De:Math.min(x.end,he);!U.extend&&De>ln&&(m=ln,ln=De,De=m);var k=Zd(z,De),w=Zd(z,ln);if(k&&w&&(U.rangeCount!==1||U.anchorNode!==k.node||U.anchorOffset!==k.offset||U.focusNode!==w.node||U.focusOffset!==w.offset)){var M=Y.createRange();M.setStart(k.node,k.offset),U.removeAllRanges(),De>ln?(U.addRange(M),U.extend(w.node,w.offset)):(M.setEnd(w.node,w.offset),U.addRange(M))}}}}for(Y=[],U=z;U=U.parentNode;)U.nodeType===1&&Y.push({element:U,left:U.scrollLeft,top:U.scrollTop});for(typeof z.focus=="function"&&z.focus(),z=0;z<Y.length;z++){var V=Y[z];V.element.scrollLeft=V.left,V.element.scrollTop=V.top}}Cs=!!Qu,Ku=Qu=null}finally{Ge=o,K.p=i,C.T=t}}e.current=n,Cn=2}}function oh(){if(Cn===2){Cn=0;var e=Pa,n=ar,t=(n.flags&8772)!==0;if((n.subtreeFlags&8772)!==0||t){t=C.T,C.T=null;var i=K.p;K.p=2;var o=Ge;Ge|=4;try{Np(e,n.alternate,n)}finally{Ge=o,K.p=i,C.T=t}}Cn=3}}function uh(){if(Cn===4||Cn===3){Cn=0,vr();var e=Pa,n=ar,t=ha,i=Qp;(n.subtreeFlags&10256)!==0||(n.flags&10256)!==0?Cn=5:(Cn=0,ar=Pa=null,ch(e,e.pendingLanes));var o=e.pendingLanes;if(o===0&&(Ua=null),le(t),n=n.stateNode,zn&&typeof zn.onCommitFiberRoot=="function")try{zn.onCommitFiberRoot(mn,n,void 0,(n.current.flags&128)===128)}catch{}if(i!==null){n=C.T,o=K.p,K.p=2,C.T=null;try{for(var u=e.onRecoverableError,m=0;m<i.length;m++){var z=i[m];u(z.value,{componentStack:z.stack})}}finally{C.T=n,K.p=o}}(ha&3)!==0&&Ss(),Vt(e),o=e.pendingLanes,(t&261930)!==0&&(o&42)!==0?e===Nu?Fr++:(Fr=0,Nu=e):Fr=0,Jr(0)}}function ch(e,n){(e.pooledCacheLanes&=n)===0&&(n=e.pooledCache,n!=null&&(e.pooledCache=null,_r(n)))}function Ss(){return sh(),oh(),uh(),dh()}function dh(){if(Cn!==5)return!1;var e=Pa,n=Lu;Lu=0;var t=le(ha),i=C.T,o=K.p;try{K.p=32>t?32:t,C.T=null,t=Ou,Ou=null;var u=Pa,m=ha;if(Cn=0,ar=Pa=null,ha=0,(Ge&6)!==0)throw Error(s(331));var z=Ge;if(Ge|=4,qp(u.current),Hp(u,u.current,m,t),Ge=z,Jr(0,!1),zn&&typeof zn.onPostCommitFiberRoot=="function")try{zn.onPostCommitFiberRoot(mn,u)}catch{}return!0}finally{K.p=o,C.T=i,ch(e,n)}}function fh(e,n,t){n=Dt(t,n),n=hu(e.stateNode,n,2),e=_a(e,n,2),e!==null&&(ri(e,2),Vt(e))}function nn(e,n,t){if(e.tag===3)fh(e,e,t);else for(;n!==null;){if(n.tag===3){fh(n,e,t);break}else if(n.tag===1){var i=n.stateNode;if(typeof n.type.getDerivedStateFromError=="function"||typeof i.componentDidCatch=="function"&&(Ua===null||!Ua.has(i))){e=Dt(t,e),t=pp(2),i=_a(n,t,2),i!==null&&(hp(t,i,n,e),ri(i,2),Vt(i));break}}n=n.return}}function Pu(e,n,t){var i=e.pingCache;if(i===null){i=e.pingCache=new Cb;var o=new Set;i.set(n,o)}else o=i.get(n),o===void 0&&(o=new Set,i.set(n,o));o.has(t)||(Mu=!0,o.add(t),e=Ub.bind(null,e,n,t),n.then(e,e))}function Ub(e,n,t){var i=e.pingCache;i!==null&&i.delete(n),e.pingedLanes|=e.suspendedLanes&t,e.warmLanes&=~t,sn===e&&(je&t)===t&&(En===4||En===3&&(je&62914560)===je&&300>bn()-ms?(Ge&2)===0&&ir(e,0):_u|=t,tr===je&&(tr=0)),Vt(e)}function ph(e,n){n===0&&(n=ii()),e=ci(e,n),e!==null&&(ri(e,n),Vt(e))}function Pb(e){var n=e.memoizedState,t=0;n!==null&&(t=n.retryLane),ph(e,t)}function Bb(e,n){var t=0;switch(e.tag){case 31:case 13:var i=e.stateNode,o=e.memoizedState;o!==null&&(t=o.retryLane);break;case 19:i=e.stateNode;break;case 22:i=e.stateNode._retryCache;break;default:throw Error(s(314))}i!==null&&i.delete(n),ph(e,t)}function jb(e,n){return va(e,n)}var Es=null,lr=null,Bu=!1,Ds=!1,ju=!1,ja=0;function Vt(e){e!==lr&&e.next===null&&(lr===null?Es=lr=e:lr=lr.next=e),Ds=!0,Bu||(Bu=!0,Hb())}function Jr(e,n){if(!ju&&Ds){ju=!0;do for(var t=!1,i=Es;i!==null;){if(e!==0){var o=i.pendingLanes;if(o===0)var u=0;else{var m=i.suspendedLanes,z=i.pingedLanes;u=(1<<31-Fe(42|e)+1)-1,u&=o&~(m&~z),u=u&201326741?u&201326741|1:u?u|2:0}u!==0&&(t=!0,yh(i,u))}else u=je,u=ti(i,i===sn?u:0,i.cancelPendingCommit!==null||i.timeoutHandle!==-1),(u&3)===0||ai(i,u)||(t=!0,yh(i,u));i=i.next}while(t);ju=!1}}function Xb(){hh()}function hh(){Ds=Bu=!1;var e=0;ja!==0&&$b()&&(e=ja);for(var n=bn(),t=null,i=Es;i!==null;){var o=i.next,u=mh(i,n);u===0?(i.next=null,t===null?Es=o:t.next=o,o===null&&(lr=t)):(t=i,(e!==0||(u&3)!==0)&&(Ds=!0)),i=o}Cn!==0&&Cn!==5||Jr(e),ja!==0&&(ja=0)}function mh(e,n){for(var t=e.suspendedLanes,i=e.pingedLanes,o=e.expirationTimes,u=e.pendingLanes&-62914561;0<u;){var m=31-Fe(u),z=1<<m,x=o[m];x===-1?((z&t)===0||(z&i)!==0)&&(o[m]=kl(z,n)):x<=n&&(e.expiredLanes|=z),u&=~z}if(n=sn,t=je,t=ti(e,e===n?t:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),i=e.callbackNode,t===0||e===n&&(en===2||en===9)||e.cancelPendingCommit!==null)return i!==null&&i!==null&&ei(i),e.callbackNode=null,e.callbackPriority=0;if((t&3)===0||ai(e,t)){if(n=t&-t,n===e.callbackPriority)return n;switch(i!==null&&ei(i),le(t)){case 2:case 8:t=te;break;case 32:t=ve;break;case 268435456:t=Ve;break;default:t=ve}return i=gh.bind(null,e),t=va(t,i),e.callbackPriority=n,e.callbackNode=t,n}return i!==null&&i!==null&&ei(i),e.callbackPriority=2,e.callbackNode=null,2}function gh(e,n){if(Cn!==0&&Cn!==5)return e.callbackNode=null,e.callbackPriority=0,null;var t=e.callbackNode;if(Ss()&&e.callbackNode!==t)return null;var i=je;return i=ti(e,e===sn?i:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),i===0?null:(Fp(e,i,n),mh(e,bn()),e.callbackNode!=null&&e.callbackNode===t?gh.bind(null,e):null)}function yh(e,n){if(Ss())return null;Fp(e,n,!0)}function Hb(){n1(function(){(Ge&6)!==0?va(Z,Xb):hh()})}function Xu(){if(ja===0){var e=Vi;e===0&&(e=ni,ni<<=1,(ni&261888)===0&&(ni=256)),ja=e}return ja}function bh(e){return e==null||typeof e=="symbol"||typeof e=="boolean"?null:typeof e=="function"?e:Ml(""+e)}function zh(e,n){var t=n.ownerDocument.createElement("input");return t.name=n.name,t.value=n.value,e.id&&t.setAttribute("form",e.id),n.parentNode.insertBefore(t,n),e=new FormData(e),t.parentNode.removeChild(t),e}function Zb(e,n,t,i,o){if(n==="submit"&&t&&t.stateNode===o){var u=bh((o[se]||null).action),m=i.submitter;m&&(n=(n=m[se]||null)?bh(n.formAction):m.getAttribute("formAction"),n!==null&&(u=n,m=null));var z=new Ol("action","action",null,i,o);e.push({event:z,listeners:[{instance:null,listener:function(){if(i.defaultPrevented){if(ja!==0){var x=m?zh(o,m):new FormData(o);ou(t,{pending:!0,data:x,method:o.method,action:u},null,x)}}else typeof u=="function"&&(z.preventDefault(),x=m?zh(o,m):new FormData(o),ou(t,{pending:!0,data:x,method:o.method,action:u},u,x))},currentTarget:o}]})}}for(var Hu=0;Hu<To.length;Hu++){var Zu=To[Hu],Vb=Zu.toLowerCase(),qb=Zu[0].toUpperCase()+Zu.slice(1);Nt(Vb,"on"+qb)}Nt(Qd,"onAnimationEnd"),Nt(Kd,"onAnimationIteration"),Nt(Fd,"onAnimationStart"),Nt("dblclick","onDoubleClick"),Nt("focusin","onFocus"),Nt("focusout","onBlur"),Nt(ob,"onTransitionRun"),Nt(ub,"onTransitionStart"),Nt(cb,"onTransitionCancel"),Nt(Jd,"onTransitionEnd"),Lt("onMouseEnter",["mouseout","mouseover"]),Lt("onMouseLeave",["mouseout","mouseover"]),Lt("onPointerEnter",["pointerout","pointerover"]),Lt("onPointerLeave",["pointerout","pointerover"]),zt("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),zt("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),zt("onBeforeInput",["compositionend","keypress","textInput","paste"]),zt("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),zt("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),zt("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var $r="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Yb=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat($r));function vh(e,n){n=(n&4)!==0;for(var t=0;t<e.length;t++){var i=e[t],o=i.event;i=i.listeners;e:{var u=void 0;if(n)for(var m=i.length-1;0<=m;m--){var z=i[m],x=z.instance,_=z.currentTarget;if(z=z.listener,x!==u&&o.isPropagationStopped())break e;u=z,o.currentTarget=_;try{u(o)}catch(j){Ul(j)}o.currentTarget=null,u=x}else for(m=0;m<i.length;m++){if(z=i[m],x=z.instance,_=z.currentTarget,z=z.listener,x!==u&&o.isPropagationStopped())break e;u=z,o.currentTarget=_;try{u(o)}catch(j){Ul(j)}o.currentTarget=null,u=x}}}}function Pe(e,n){var t=n[ke];t===void 0&&(t=n[ke]=new Set);var i=e+"__bubble";t.has(i)||(Sh(n,e,2,!1),t.add(i))}function Vu(e,n,t){var i=0;n&&(i|=4),Sh(t,e,i,n)}var xs="_reactListening"+Math.random().toString(36).slice(2);function qu(e){if(!e[xs]){e[xs]=!0,xa.forEach(function(t){t!=="selectionchange"&&(Yb.has(t)||Vu(t,!1,e),Vu(t,!0,e))});var n=e.nodeType===9?e:e.ownerDocument;n===null||n[xs]||(n[xs]=!0,Vu("selectionchange",!1,n))}}function Sh(e,n,t,i){switch(Kh(n)){case 2:var o=S1;break;case 8:o=E1;break;default:o=sc}t=o.bind(null,n,t,e),o=void 0,!fo||n!=="touchstart"&&n!=="touchmove"&&n!=="wheel"||(o=!0),i?o!==void 0?e.addEventListener(n,t,{capture:!0,passive:o}):e.addEventListener(n,t,!0):o!==void 0?e.addEventListener(n,t,{passive:o}):e.addEventListener(n,t,!1)}function Yu(e,n,t,i,o){var u=i;if((n&1)===0&&(n&2)===0&&i!==null)e:for(;;){if(i===null)return;var m=i.tag;if(m===3||m===4){var z=i.stateNode.containerInfo;if(z===o)break;if(m===4)for(m=i.return;m!==null;){var x=m.tag;if((x===3||x===4)&&m.stateNode.containerInfo===o)return;m=m.return}for(;z!==null;){if(m=lt(z),m===null)return;if(x=m.tag,x===5||x===6||x===26||x===27){i=u=m;continue e}z=z.parentNode}}i=i.return}Td(function(){var _=u,j=uo(t),Y=[];e:{var O=$d.get(e);if(O!==void 0){var U=Ol,he=e;switch(e){case"keypress":if(Cl(t)===0)break e;case"keydown":case"keyup":U=By;break;case"focusin":he="focus",U=go;break;case"focusout":he="blur",U=go;break;case"beforeblur":case"afterblur":U=go;break;case"click":if(t.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":U=Rd;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":U=Ry;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":U=Hy;break;case Qd:case Kd:case Fd:U=My;break;case Jd:U=Vy;break;case"scroll":case"scrollend":U=Ay;break;case"wheel":U=Yy;break;case"copy":case"cut":case"paste":U=Cy;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":U=Id;break;case"toggle":case"beforetoggle":U=Qy}var De=(n&4)!==0,ln=!De&&(e==="scroll"||e==="scrollend"),k=De?O!==null?O+"Capture":null:O;De=[];for(var w=_,M;w!==null;){var V=w;if(M=V.stateNode,V=V.tag,V!==5&&V!==26&&V!==27||M===null||k===null||(V=Sr(w,k),V!=null&&De.push(el(w,V,M))),ln)break;w=w.return}0<De.length&&(O=new U(O,he,null,t,j),Y.push({event:O,listeners:De}))}}if((n&7)===0){e:{if(O=e==="mouseover"||e==="pointerover",U=e==="mouseout"||e==="pointerout",O&&t!==oo&&(he=t.relatedTarget||t.fromElement)&&(lt(he)||he[me]))break e;if((U||O)&&(O=j.window===j?j:(O=j.ownerDocument)?O.defaultView||O.parentWindow:window,U?(he=t.relatedTarget||t.toElement,U=_,he=he?lt(he):null,he!==null&&(ln=d(he),De=he.tag,he!==ln||De!==5&&De!==27&&De!==6)&&(he=null)):(U=null,he=_),U!==he)){if(De=Rd,V="onMouseLeave",k="onMouseEnter",w="mouse",(e==="pointerout"||e==="pointerover")&&(De=Id,V="onPointerLeave",k="onPointerEnter",w="pointer"),ln=U==null?O:Zn(U),M=he==null?O:Zn(he),O=new De(V,w+"leave",U,t,j),O.target=ln,O.relatedTarget=M,V=null,lt(j)===_&&(De=new De(k,w+"enter",he,t,j),De.target=M,De.relatedTarget=ln,V=De),ln=V,U&&he)n:{for(De=Gb,k=U,w=he,M=0,V=k;V;V=De(V))M++;V=0;for(var Ee=w;Ee;Ee=De(Ee))V++;for(;0<M-V;)k=De(k),M--;for(;0<V-M;)w=De(w),V--;for(;M--;){if(k===w||w!==null&&k===w.alternate){De=k;break n}k=De(k),w=De(w)}De=null}else De=null;U!==null&&Eh(Y,O,U,De,!1),he!==null&&ln!==null&&Eh(Y,ln,he,De,!0)}}e:{if(O=_?Zn(_):window,U=O.nodeName&&O.nodeName.toLowerCase(),U==="select"||U==="input"&&O.type==="file")var qe=Ud;else if(Nd(O))if(Pd)qe=rb;else{qe=ab;var ze=tb}else U=O.nodeName,!U||U.toLowerCase()!=="input"||O.type!=="checkbox"&&O.type!=="radio"?_&&so(_.elementType)&&(qe=Ud):qe=ib;if(qe&&(qe=qe(e,_))){Wd(Y,qe,t,j);break e}ze&&ze(e,O,_),e==="focusout"&&_&&O.type==="number"&&_.memoizedProps.value!=null&&lo(O,"number",O.value)}switch(ze=_?Zn(_):window,e){case"focusin":(Nd(ze)||ze.contentEditable==="true")&&(Wi=ze,Eo=_,kr=null);break;case"focusout":kr=Eo=Wi=null;break;case"mousedown":Do=!0;break;case"contextmenu":case"mouseup":case"dragend":Do=!1,Yd(Y,t,j);break;case"selectionchange":if(sb)break;case"keydown":case"keyup":Yd(Y,t,j)}var Le;if(bo)e:{switch(e){case"compositionstart":var Xe="onCompositionStart";break e;case"compositionend":Xe="onCompositionEnd";break e;case"compositionupdate":Xe="onCompositionUpdate";break e}Xe=void 0}else Ni?Ld(e,t)&&(Xe="onCompositionEnd"):e==="keydown"&&t.keyCode===229&&(Xe="onCompositionStart");Xe&&(Md&&t.locale!=="ko"&&(Ni||Xe!=="onCompositionStart"?Xe==="onCompositionEnd"&&Ni&&(Le=Ad()):(Ta=j,po="value"in Ta?Ta.value:Ta.textContent,Ni=!0)),ze=Ts(_,Xe),0<ze.length&&(Xe=new kd(Xe,e,null,t,j),Y.push({event:Xe,listeners:ze}),Le?Xe.data=Le:(Le=Od(t),Le!==null&&(Xe.data=Le)))),(Le=Fy?Jy(e,t):$y(e,t))&&(Xe=Ts(_,"onBeforeInput"),0<Xe.length&&(ze=new kd("onBeforeInput","beforeinput",null,t,j),Y.push({event:ze,listeners:Xe}),ze.data=Le)),Zb(Y,e,_,t,j)}vh(Y,n)})}function el(e,n,t){return{instance:e,listener:n,currentTarget:t}}function Ts(e,n){for(var t=n+"Capture",i=[];e!==null;){var o=e,u=o.stateNode;if(o=o.tag,o!==5&&o!==26&&o!==27||u===null||(o=Sr(e,t),o!=null&&i.unshift(el(e,o,u)),o=Sr(e,n),o!=null&&i.push(el(e,o,u))),e.tag===3)return i;e=e.return}return[]}function Gb(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function Eh(e,n,t,i,o){for(var u=n._reactName,m=[];t!==null&&t!==i;){var z=t,x=z.alternate,_=z.stateNode;if(z=z.tag,x!==null&&x===i)break;z!==5&&z!==26&&z!==27||_===null||(x=_,o?(_=Sr(t,u),_!=null&&m.unshift(el(t,_,x))):o||(_=Sr(t,u),_!=null&&m.push(el(t,_,x)))),t=t.return}m.length!==0&&e.push({event:n,listeners:m})}var Qb=/\r\n?/g,Kb=/\u0000|\uFFFD/g;function Dh(e){return(typeof e=="string"?e:""+e).replace(Qb,`
`).replace(Kb,"")}function xh(e,n){return n=Dh(n),Dh(e)===n}function rn(e,n,t,i,o,u){switch(t){case"children":typeof i=="string"?n==="body"||n==="textarea"&&i===""||Ci(e,i):(typeof i=="number"||typeof i=="bigint")&&n!=="body"&&Ci(e,""+i);break;case"className":Ot(e,"class",i);break;case"tabIndex":Ot(e,"tabindex",i);break;case"dir":case"role":case"viewBox":case"width":case"height":Ot(e,t,i);break;case"style":Dd(e,i,u);break;case"data":if(n!=="object"){Ot(e,"data",i);break}case"src":case"href":if(i===""&&(n!=="a"||t!=="href")){e.removeAttribute(t);break}if(i==null||typeof i=="function"||typeof i=="symbol"||typeof i=="boolean"){e.removeAttribute(t);break}i=Ml(""+i),e.setAttribute(t,i);break;case"action":case"formAction":if(typeof i=="function"){e.setAttribute(t,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof u=="function"&&(t==="formAction"?(n!=="input"&&rn(e,n,"name",o.name,o,null),rn(e,n,"formEncType",o.formEncType,o,null),rn(e,n,"formMethod",o.formMethod,o,null),rn(e,n,"formTarget",o.formTarget,o,null)):(rn(e,n,"encType",o.encType,o,null),rn(e,n,"method",o.method,o,null),rn(e,n,"target",o.target,o,null)));if(i==null||typeof i=="symbol"||typeof i=="boolean"){e.removeAttribute(t);break}i=Ml(""+i),e.setAttribute(t,i);break;case"onClick":i!=null&&(e.onclick=$t);break;case"onScroll":i!=null&&Pe("scroll",e);break;case"onScrollEnd":i!=null&&Pe("scrollend",e);break;case"dangerouslySetInnerHTML":if(i!=null){if(typeof i!="object"||!("__html"in i))throw Error(s(61));if(t=i.__html,t!=null){if(o.children!=null)throw Error(s(60));e.innerHTML=t}}break;case"multiple":e.multiple=i&&typeof i!="function"&&typeof i!="symbol";break;case"muted":e.muted=i&&typeof i!="function"&&typeof i!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(i==null||typeof i=="function"||typeof i=="boolean"||typeof i=="symbol"){e.removeAttribute("xlink:href");break}t=Ml(""+i),e.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",t);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":i!=null&&typeof i!="function"&&typeof i!="symbol"?e.setAttribute(t,""+i):e.removeAttribute(t);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":i&&typeof i!="function"&&typeof i!="symbol"?e.setAttribute(t,""):e.removeAttribute(t);break;case"capture":case"download":i===!0?e.setAttribute(t,""):i!==!1&&i!=null&&typeof i!="function"&&typeof i!="symbol"?e.setAttribute(t,i):e.removeAttribute(t);break;case"cols":case"rows":case"size":case"span":i!=null&&typeof i!="function"&&typeof i!="symbol"&&!isNaN(i)&&1<=i?e.setAttribute(t,i):e.removeAttribute(t);break;case"rowSpan":case"start":i==null||typeof i=="function"||typeof i=="symbol"||isNaN(i)?e.removeAttribute(t):e.setAttribute(t,i);break;case"popover":Pe("beforetoggle",e),Pe("toggle",e),fn(e,"popover",i);break;case"xlinkActuate":vt(e,"http://www.w3.org/1999/xlink","xlink:actuate",i);break;case"xlinkArcrole":vt(e,"http://www.w3.org/1999/xlink","xlink:arcrole",i);break;case"xlinkRole":vt(e,"http://www.w3.org/1999/xlink","xlink:role",i);break;case"xlinkShow":vt(e,"http://www.w3.org/1999/xlink","xlink:show",i);break;case"xlinkTitle":vt(e,"http://www.w3.org/1999/xlink","xlink:title",i);break;case"xlinkType":vt(e,"http://www.w3.org/1999/xlink","xlink:type",i);break;case"xmlBase":vt(e,"http://www.w3.org/XML/1998/namespace","xml:base",i);break;case"xmlLang":vt(e,"http://www.w3.org/XML/1998/namespace","xml:lang",i);break;case"xmlSpace":vt(e,"http://www.w3.org/XML/1998/namespace","xml:space",i);break;case"is":fn(e,"is",i);break;case"innerText":case"textContent":break;default:(!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(t=xy.get(t)||t,fn(e,t,i))}}function Gu(e,n,t,i,o,u){switch(t){case"style":Dd(e,i,u);break;case"dangerouslySetInnerHTML":if(i!=null){if(typeof i!="object"||!("__html"in i))throw Error(s(61));if(t=i.__html,t!=null){if(o.children!=null)throw Error(s(60));e.innerHTML=t}}break;case"children":typeof i=="string"?Ci(e,i):(typeof i=="number"||typeof i=="bigint")&&Ci(e,""+i);break;case"onScroll":i!=null&&Pe("scroll",e);break;case"onScrollEnd":i!=null&&Pe("scrollend",e);break;case"onClick":i!=null&&(e.onclick=$t);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!jt.hasOwnProperty(t))e:{if(t[0]==="o"&&t[1]==="n"&&(o=t.endsWith("Capture"),n=t.slice(2,o?t.length-7:void 0),u=e[se]||null,u=u!=null?u[t]:null,typeof u=="function"&&e.removeEventListener(n,u,o),typeof i=="function")){typeof u!="function"&&u!==null&&(t in e?e[t]=null:e.hasAttribute(t)&&e.removeAttribute(t)),e.addEventListener(n,i,o);break e}t in e?e[t]=i:i===!0?e.setAttribute(t,""):fn(e,t,i)}}}function jn(e,n,t){switch(n){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":Pe("error",e),Pe("load",e);var i=!1,o=!1,u;for(u in t)if(t.hasOwnProperty(u)){var m=t[u];if(m!=null)switch(u){case"src":i=!0;break;case"srcSet":o=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(s(137,n));default:rn(e,n,u,m,t,null)}}o&&rn(e,n,"srcSet",t.srcSet,t,null),i&&rn(e,n,"src",t.src,t,null);return;case"input":Pe("invalid",e);var z=u=m=o=null,x=null,_=null;for(i in t)if(t.hasOwnProperty(i)){var j=t[i];if(j!=null)switch(i){case"name":o=j;break;case"type":m=j;break;case"checked":x=j;break;case"defaultChecked":_=j;break;case"value":u=j;break;case"defaultValue":z=j;break;case"children":case"dangerouslySetInnerHTML":if(j!=null)throw Error(s(137,n));break;default:rn(e,n,i,j,t,null)}}zd(e,u,z,x,_,m,o,!1);return;case"select":Pe("invalid",e),i=m=u=null;for(o in t)if(t.hasOwnProperty(o)&&(z=t[o],z!=null))switch(o){case"value":u=z;break;case"defaultValue":m=z;break;case"multiple":i=z;default:rn(e,n,o,z,t,null)}n=u,t=m,e.multiple=!!i,n!=null?_i(e,!!i,n,!1):t!=null&&_i(e,!!i,t,!0);return;case"textarea":Pe("invalid",e),u=o=i=null;for(m in t)if(t.hasOwnProperty(m)&&(z=t[m],z!=null))switch(m){case"value":i=z;break;case"defaultValue":o=z;break;case"children":u=z;break;case"dangerouslySetInnerHTML":if(z!=null)throw Error(s(91));break;default:rn(e,n,m,z,t,null)}Sd(e,i,o,u);return;case"option":for(x in t)t.hasOwnProperty(x)&&(i=t[x],i!=null)&&(x==="selected"?e.selected=i&&typeof i!="function"&&typeof i!="symbol":rn(e,n,x,i,t,null));return;case"dialog":Pe("beforetoggle",e),Pe("toggle",e),Pe("cancel",e),Pe("close",e);break;case"iframe":case"object":Pe("load",e);break;case"video":case"audio":for(i=0;i<$r.length;i++)Pe($r[i],e);break;case"image":Pe("error",e),Pe("load",e);break;case"details":Pe("toggle",e);break;case"embed":case"source":case"link":Pe("error",e),Pe("load",e);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(_ in t)if(t.hasOwnProperty(_)&&(i=t[_],i!=null))switch(_){case"children":case"dangerouslySetInnerHTML":throw Error(s(137,n));default:rn(e,n,_,i,t,null)}return;default:if(so(n)){for(j in t)t.hasOwnProperty(j)&&(i=t[j],i!==void 0&&Gu(e,n,j,i,t,void 0));return}}for(z in t)t.hasOwnProperty(z)&&(i=t[z],i!=null&&rn(e,n,z,i,t,null))}function Fb(e,n,t,i){switch(n){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var o=null,u=null,m=null,z=null,x=null,_=null,j=null;for(U in t){var Y=t[U];if(t.hasOwnProperty(U)&&Y!=null)switch(U){case"checked":break;case"value":break;case"defaultValue":x=Y;default:i.hasOwnProperty(U)||rn(e,n,U,null,i,Y)}}for(var O in i){var U=i[O];if(Y=t[O],i.hasOwnProperty(O)&&(U!=null||Y!=null))switch(O){case"type":u=U;break;case"name":o=U;break;case"checked":_=U;break;case"defaultChecked":j=U;break;case"value":m=U;break;case"defaultValue":z=U;break;case"children":case"dangerouslySetInnerHTML":if(U!=null)throw Error(s(137,n));break;default:U!==Y&&rn(e,n,O,U,i,Y)}}ro(e,m,z,x,_,j,u,o);return;case"select":U=m=z=O=null;for(u in t)if(x=t[u],t.hasOwnProperty(u)&&x!=null)switch(u){case"value":break;case"multiple":U=x;default:i.hasOwnProperty(u)||rn(e,n,u,null,i,x)}for(o in i)if(u=i[o],x=t[o],i.hasOwnProperty(o)&&(u!=null||x!=null))switch(o){case"value":O=u;break;case"defaultValue":z=u;break;case"multiple":m=u;default:u!==x&&rn(e,n,o,u,i,x)}n=z,t=m,i=U,O!=null?_i(e,!!t,O,!1):!!i!=!!t&&(n!=null?_i(e,!!t,n,!0):_i(e,!!t,t?[]:"",!1));return;case"textarea":U=O=null;for(z in t)if(o=t[z],t.hasOwnProperty(z)&&o!=null&&!i.hasOwnProperty(z))switch(z){case"value":break;case"children":break;default:rn(e,n,z,null,i,o)}for(m in i)if(o=i[m],u=t[m],i.hasOwnProperty(m)&&(o!=null||u!=null))switch(m){case"value":O=o;break;case"defaultValue":U=o;break;case"children":break;case"dangerouslySetInnerHTML":if(o!=null)throw Error(s(91));break;default:o!==u&&rn(e,n,m,o,i,u)}vd(e,O,U);return;case"option":for(var he in t)O=t[he],t.hasOwnProperty(he)&&O!=null&&!i.hasOwnProperty(he)&&(he==="selected"?e.selected=!1:rn(e,n,he,null,i,O));for(x in i)O=i[x],U=t[x],i.hasOwnProperty(x)&&O!==U&&(O!=null||U!=null)&&(x==="selected"?e.selected=O&&typeof O!="function"&&typeof O!="symbol":rn(e,n,x,O,i,U));return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var De in t)O=t[De],t.hasOwnProperty(De)&&O!=null&&!i.hasOwnProperty(De)&&rn(e,n,De,null,i,O);for(_ in i)if(O=i[_],U=t[_],i.hasOwnProperty(_)&&O!==U&&(O!=null||U!=null))switch(_){case"children":case"dangerouslySetInnerHTML":if(O!=null)throw Error(s(137,n));break;default:rn(e,n,_,O,i,U)}return;default:if(so(n)){for(var ln in t)O=t[ln],t.hasOwnProperty(ln)&&O!==void 0&&!i.hasOwnProperty(ln)&&Gu(e,n,ln,void 0,i,O);for(j in i)O=i[j],U=t[j],!i.hasOwnProperty(j)||O===U||O===void 0&&U===void 0||Gu(e,n,j,O,i,U);return}}for(var k in t)O=t[k],t.hasOwnProperty(k)&&O!=null&&!i.hasOwnProperty(k)&&rn(e,n,k,null,i,O);for(Y in i)O=i[Y],U=t[Y],!i.hasOwnProperty(Y)||O===U||O==null&&U==null||rn(e,n,Y,O,i,U)}function Th(e){switch(e){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function Jb(){if(typeof performance.getEntriesByType=="function"){for(var e=0,n=0,t=performance.getEntriesByType("resource"),i=0;i<t.length;i++){var o=t[i],u=o.transferSize,m=o.initiatorType,z=o.duration;if(u&&z&&Th(m)){for(m=0,z=o.responseEnd,i+=1;i<t.length;i++){var x=t[i],_=x.startTime;if(_>z)break;var j=x.transferSize,Y=x.initiatorType;j&&Th(Y)&&(x=x.responseEnd,m+=j*(x<z?1:(z-_)/(x-_)))}if(--i,n+=8*(u+m)/(o.duration/1e3),e++,10<e)break}}if(0<e)return n/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e=="number")?e:5}var Qu=null,Ku=null;function As(e){return e.nodeType===9?e:e.ownerDocument}function Ah(e){switch(e){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function wh(e,n){if(e===0)switch(n){case"svg":return 1;case"math":return 2;default:return 0}return e===1&&n==="foreignObject"?0:e}function Fu(e,n){return e==="textarea"||e==="noscript"||typeof n.children=="string"||typeof n.children=="number"||typeof n.children=="bigint"||typeof n.dangerouslySetInnerHTML=="object"&&n.dangerouslySetInnerHTML!==null&&n.dangerouslySetInnerHTML.__html!=null}var Ju=null;function $b(){var e=window.event;return e&&e.type==="popstate"?e===Ju?!1:(Ju=e,!0):(Ju=null,!1)}var Rh=typeof setTimeout=="function"?setTimeout:void 0,e1=typeof clearTimeout=="function"?clearTimeout:void 0,kh=typeof Promise=="function"?Promise:void 0,n1=typeof queueMicrotask=="function"?queueMicrotask:typeof kh<"u"?function(e){return kh.resolve(null).then(e).catch(t1)}:Rh;function t1(e){setTimeout(function(){throw e})}function Xa(e){return e==="head"}function Ih(e,n){var t=n,i=0;do{var o=t.nextSibling;if(e.removeChild(t),o&&o.nodeType===8)if(t=o.data,t==="/$"||t==="/&"){if(i===0){e.removeChild(o),cr(n);return}i--}else if(t==="$"||t==="$?"||t==="$~"||t==="$!"||t==="&")i++;else if(t==="html")nl(e.ownerDocument.documentElement);else if(t==="head"){t=e.ownerDocument.head,nl(t);for(var u=t.firstChild;u;){var m=u.nextSibling,z=u.nodeName;u[We]||z==="SCRIPT"||z==="STYLE"||z==="LINK"&&u.rel.toLowerCase()==="stylesheet"||t.removeChild(u),u=m}}else t==="body"&&nl(e.ownerDocument.body);t=o}while(t);cr(n)}function Mh(e,n){var t=e;e=0;do{var i=t.nextSibling;if(t.nodeType===1?n?(t._stashedDisplay=t.style.display,t.style.display="none"):(t.style.display=t._stashedDisplay||"",t.getAttribute("style")===""&&t.removeAttribute("style")):t.nodeType===3&&(n?(t._stashedText=t.nodeValue,t.nodeValue=""):t.nodeValue=t._stashedText||""),i&&i.nodeType===8)if(t=i.data,t==="/$"){if(e===0)break;e--}else t!=="$"&&t!=="$?"&&t!=="$~"&&t!=="$!"||e++;t=i}while(t)}function $u(e){var n=e.firstChild;for(n&&n.nodeType===10&&(n=n.nextSibling);n;){var t=n;switch(n=n.nextSibling,t.nodeName){case"HTML":case"HEAD":case"BODY":$u(t),on(t);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(t.rel.toLowerCase()==="stylesheet")continue}e.removeChild(t)}}function a1(e,n,t,i){for(;e.nodeType===1;){var o=t;if(e.nodeName.toLowerCase()!==n.toLowerCase()){if(!i&&(e.nodeName!=="INPUT"||e.type!=="hidden"))break}else if(i){if(!e[We])switch(n){case"meta":if(!e.hasAttribute("itemprop"))break;return e;case"link":if(u=e.getAttribute("rel"),u==="stylesheet"&&e.hasAttribute("data-precedence"))break;if(u!==o.rel||e.getAttribute("href")!==(o.href==null||o.href===""?null:o.href)||e.getAttribute("crossorigin")!==(o.crossOrigin==null?null:o.crossOrigin)||e.getAttribute("title")!==(o.title==null?null:o.title))break;return e;case"style":if(e.hasAttribute("data-precedence"))break;return e;case"script":if(u=e.getAttribute("src"),(u!==(o.src==null?null:o.src)||e.getAttribute("type")!==(o.type==null?null:o.type)||e.getAttribute("crossorigin")!==(o.crossOrigin==null?null:o.crossOrigin))&&u&&e.hasAttribute("async")&&!e.hasAttribute("itemprop"))break;return e;default:return e}}else if(n==="input"&&e.type==="hidden"){var u=o.name==null?null:""+o.name;if(o.type==="hidden"&&e.getAttribute("name")===u)return e}else return e;if(e=Rt(e.nextSibling),e===null)break}return null}function i1(e,n,t){if(n==="")return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!t||(e=Rt(e.nextSibling),e===null))return null;return e}function _h(e,n){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!n||(e=Rt(e.nextSibling),e===null))return null;return e}function ec(e){return e.data==="$?"||e.data==="$~"}function nc(e){return e.data==="$!"||e.data==="$?"&&e.ownerDocument.readyState!=="loading"}function r1(e,n){var t=e.ownerDocument;if(e.data==="$~")e._reactRetry=n;else if(e.data!=="$?"||t.readyState!=="loading")n();else{var i=function(){n(),t.removeEventListener("DOMContentLoaded",i)};t.addEventListener("DOMContentLoaded",i),e._reactRetry=i}}function Rt(e){for(;e!=null;e=e.nextSibling){var n=e.nodeType;if(n===1||n===3)break;if(n===8){if(n=e.data,n==="$"||n==="$!"||n==="$?"||n==="$~"||n==="&"||n==="F!"||n==="F")break;if(n==="/$"||n==="/&")return null}}return e}var tc=null;function Ch(e){e=e.nextSibling;for(var n=0;e;){if(e.nodeType===8){var t=e.data;if(t==="/$"||t==="/&"){if(n===0)return Rt(e.nextSibling);n--}else t!=="$"&&t!=="$!"&&t!=="$?"&&t!=="$~"&&t!=="&"||n++}e=e.nextSibling}return null}function Lh(e){e=e.previousSibling;for(var n=0;e;){if(e.nodeType===8){var t=e.data;if(t==="$"||t==="$!"||t==="$?"||t==="$~"||t==="&"){if(n===0)return e;n--}else t!=="/$"&&t!=="/&"||n++}e=e.previousSibling}return null}function Oh(e,n,t){switch(n=As(t),e){case"html":if(e=n.documentElement,!e)throw Error(s(452));return e;case"head":if(e=n.head,!e)throw Error(s(453));return e;case"body":if(e=n.body,!e)throw Error(s(454));return e;default:throw Error(s(451))}}function nl(e){for(var n=e.attributes;n.length;)e.removeAttributeNode(n[0]);on(e)}var kt=new Map,Nh=new Set;function ws(e){return typeof e.getRootNode=="function"?e.getRootNode():e.nodeType===9?e:e.ownerDocument}var ma=K.d;K.d={f:l1,r:s1,D:o1,C:u1,L:c1,m:d1,X:p1,S:f1,M:h1};function l1(){var e=ma.f(),n=bs();return e||n}function s1(e){var n=bt(e);n!==null&&n.tag===5&&n.type==="form"?$f(n):ma.r(e)}var sr=typeof document>"u"?null:document;function Wh(e,n,t){var i=sr;if(i&&typeof n=="string"&&n){var o=St(n);o='link[rel="'+e+'"][href="'+o+'"]',typeof t=="string"&&(o+='[crossorigin="'+t+'"]'),Nh.has(o)||(Nh.add(o),e={rel:e,crossOrigin:t,href:n},i.querySelector(o)===null&&(n=i.createElement("link"),jn(n,"link",e),vn(n),i.head.appendChild(n)))}}function o1(e){ma.D(e),Wh("dns-prefetch",e,null)}function u1(e,n){ma.C(e,n),Wh("preconnect",e,n)}function c1(e,n,t){ma.L(e,n,t);var i=sr;if(i&&e&&n){var o='link[rel="preload"][as="'+St(n)+'"]';n==="image"&&t&&t.imageSrcSet?(o+='[imagesrcset="'+St(t.imageSrcSet)+'"]',typeof t.imageSizes=="string"&&(o+='[imagesizes="'+St(t.imageSizes)+'"]')):o+='[href="'+St(e)+'"]';var u=o;switch(n){case"style":u=or(e);break;case"script":u=ur(e)}kt.has(u)||(e=b({rel:"preload",href:n==="image"&&t&&t.imageSrcSet?void 0:e,as:n},t),kt.set(u,e),i.querySelector(o)!==null||n==="style"&&i.querySelector(tl(u))||n==="script"&&i.querySelector(al(u))||(n=i.createElement("link"),jn(n,"link",e),vn(n),i.head.appendChild(n)))}}function d1(e,n){ma.m(e,n);var t=sr;if(t&&e){var i=n&&typeof n.as=="string"?n.as:"script",o='link[rel="modulepreload"][as="'+St(i)+'"][href="'+St(e)+'"]',u=o;switch(i){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":u=ur(e)}if(!kt.has(u)&&(e=b({rel:"modulepreload",href:e},n),kt.set(u,e),t.querySelector(o)===null)){switch(i){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(t.querySelector(al(u)))return}i=t.createElement("link"),jn(i,"link",e),vn(i),t.head.appendChild(i)}}}function f1(e,n,t){ma.S(e,n,t);var i=sr;if(i&&e){var o=Wn(i).hoistableStyles,u=or(e);n=n||"default";var m=o.get(u);if(!m){var z={loading:0,preload:null};if(m=i.querySelector(tl(u)))z.loading=5;else{e=b({rel:"stylesheet",href:e,"data-precedence":n},t),(t=kt.get(u))&&ac(e,t);var x=m=i.createElement("link");vn(x),jn(x,"link",e),x._p=new Promise(function(_,j){x.onload=_,x.onerror=j}),x.addEventListener("load",function(){z.loading|=1}),x.addEventListener("error",function(){z.loading|=2}),z.loading|=4,Rs(m,n,i)}m={type:"stylesheet",instance:m,count:1,state:z},o.set(u,m)}}}function p1(e,n){ma.X(e,n);var t=sr;if(t&&e){var i=Wn(t).hoistableScripts,o=ur(e),u=i.get(o);u||(u=t.querySelector(al(o)),u||(e=b({src:e,async:!0},n),(n=kt.get(o))&&ic(e,n),u=t.createElement("script"),vn(u),jn(u,"link",e),t.head.appendChild(u)),u={type:"script",instance:u,count:1,state:null},i.set(o,u))}}function h1(e,n){ma.M(e,n);var t=sr;if(t&&e){var i=Wn(t).hoistableScripts,o=ur(e),u=i.get(o);u||(u=t.querySelector(al(o)),u||(e=b({src:e,async:!0,type:"module"},n),(n=kt.get(o))&&ic(e,n),u=t.createElement("script"),vn(u),jn(u,"link",e),t.head.appendChild(u)),u={type:"script",instance:u,count:1,state:null},i.set(o,u))}}function Uh(e,n,t,i){var o=(o=ge.current)?ws(o):null;if(!o)throw Error(s(446));switch(e){case"meta":case"title":return null;case"style":return typeof t.precedence=="string"&&typeof t.href=="string"?(n=or(t.href),t=Wn(o).hoistableStyles,i=t.get(n),i||(i={type:"style",instance:null,count:0,state:null},t.set(n,i)),i):{type:"void",instance:null,count:0,state:null};case"link":if(t.rel==="stylesheet"&&typeof t.href=="string"&&typeof t.precedence=="string"){e=or(t.href);var u=Wn(o).hoistableStyles,m=u.get(e);if(m||(o=o.ownerDocument||o,m={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},u.set(e,m),(u=o.querySelector(tl(e)))&&!u._p&&(m.instance=u,m.state.loading=5),kt.has(e)||(t={rel:"preload",as:"style",href:t.href,crossOrigin:t.crossOrigin,integrity:t.integrity,media:t.media,hrefLang:t.hrefLang,referrerPolicy:t.referrerPolicy},kt.set(e,t),u||m1(o,e,t,m.state))),n&&i===null)throw Error(s(528,""));return m}if(n&&i!==null)throw Error(s(529,""));return null;case"script":return n=t.async,t=t.src,typeof t=="string"&&n&&typeof n!="function"&&typeof n!="symbol"?(n=ur(t),t=Wn(o).hoistableScripts,i=t.get(n),i||(i={type:"script",instance:null,count:0,state:null},t.set(n,i)),i):{type:"void",instance:null,count:0,state:null};default:throw Error(s(444,e))}}function or(e){return'href="'+St(e)+'"'}function tl(e){return'link[rel="stylesheet"]['+e+"]"}function Ph(e){return b({},e,{"data-precedence":e.precedence,precedence:null})}function m1(e,n,t,i){e.querySelector('link[rel="preload"][as="style"]['+n+"]")?i.loading=1:(n=e.createElement("link"),i.preload=n,n.addEventListener("load",function(){return i.loading|=1}),n.addEventListener("error",function(){return i.loading|=2}),jn(n,"link",t),vn(n),e.head.appendChild(n))}function ur(e){return'[src="'+St(e)+'"]'}function al(e){return"script[async]"+e}function Bh(e,n,t){if(n.count++,n.instance===null)switch(n.type){case"style":var i=e.querySelector('style[data-href~="'+St(t.href)+'"]');if(i)return n.instance=i,vn(i),i;var o=b({},t,{"data-href":t.href,"data-precedence":t.precedence,href:null,precedence:null});return i=(e.ownerDocument||e).createElement("style"),vn(i),jn(i,"style",o),Rs(i,t.precedence,e),n.instance=i;case"stylesheet":o=or(t.href);var u=e.querySelector(tl(o));if(u)return n.state.loading|=4,n.instance=u,vn(u),u;i=Ph(t),(o=kt.get(o))&&ac(i,o),u=(e.ownerDocument||e).createElement("link"),vn(u);var m=u;return m._p=new Promise(function(z,x){m.onload=z,m.onerror=x}),jn(u,"link",i),n.state.loading|=4,Rs(u,t.precedence,e),n.instance=u;case"script":return u=ur(t.src),(o=e.querySelector(al(u)))?(n.instance=o,vn(o),o):(i=t,(o=kt.get(u))&&(i=b({},t),ic(i,o)),e=e.ownerDocument||e,o=e.createElement("script"),vn(o),jn(o,"link",i),e.head.appendChild(o),n.instance=o);case"void":return null;default:throw Error(s(443,n.type))}else n.type==="stylesheet"&&(n.state.loading&4)===0&&(i=n.instance,n.state.loading|=4,Rs(i,t.precedence,e));return n.instance}function Rs(e,n,t){for(var i=t.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),o=i.length?i[i.length-1]:null,u=o,m=0;m<i.length;m++){var z=i[m];if(z.dataset.precedence===n)u=z;else if(u!==o)break}u?u.parentNode.insertBefore(e,u.nextSibling):(n=t.nodeType===9?t.head:t,n.insertBefore(e,n.firstChild))}function ac(e,n){e.crossOrigin==null&&(e.crossOrigin=n.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=n.referrerPolicy),e.title==null&&(e.title=n.title)}function ic(e,n){e.crossOrigin==null&&(e.crossOrigin=n.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=n.referrerPolicy),e.integrity==null&&(e.integrity=n.integrity)}var ks=null;function jh(e,n,t){if(ks===null){var i=new Map,o=ks=new Map;o.set(t,i)}else o=ks,i=o.get(t),i||(i=new Map,o.set(t,i));if(i.has(e))return i;for(i.set(e,null),t=t.getElementsByTagName(e),o=0;o<t.length;o++){var u=t[o];if(!(u[We]||u[oe]||e==="link"&&u.getAttribute("rel")==="stylesheet")&&u.namespaceURI!=="http://www.w3.org/2000/svg"){var m=u.getAttribute(n)||"";m=e+m;var z=i.get(m);z?z.push(u):i.set(m,[u])}}return i}function Xh(e,n,t){e=e.ownerDocument||e,e.head.insertBefore(t,n==="title"?e.querySelector("head > title"):null)}function g1(e,n,t){if(t===1||n.itemProp!=null)return!1;switch(e){case"meta":case"title":return!0;case"style":if(typeof n.precedence!="string"||typeof n.href!="string"||n.href==="")break;return!0;case"link":if(typeof n.rel!="string"||typeof n.href!="string"||n.href===""||n.onLoad||n.onError)break;return n.rel==="stylesheet"?(e=n.disabled,typeof n.precedence=="string"&&e==null):!0;case"script":if(n.async&&typeof n.async!="function"&&typeof n.async!="symbol"&&!n.onLoad&&!n.onError&&n.src&&typeof n.src=="string")return!0}return!1}function Hh(e){return!(e.type==="stylesheet"&&(e.state.loading&3)===0)}function y1(e,n,t,i){if(t.type==="stylesheet"&&(typeof i.media!="string"||matchMedia(i.media).matches!==!1)&&(t.state.loading&4)===0){if(t.instance===null){var o=or(i.href),u=n.querySelector(tl(o));if(u){n=u._p,n!==null&&typeof n=="object"&&typeof n.then=="function"&&(e.count++,e=Is.bind(e),n.then(e,e)),t.state.loading|=4,t.instance=u,vn(u);return}u=n.ownerDocument||n,i=Ph(i),(o=kt.get(o))&&ac(i,o),u=u.createElement("link"),vn(u);var m=u;m._p=new Promise(function(z,x){m.onload=z,m.onerror=x}),jn(u,"link",i),t.instance=u}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(t,n),(n=t.state.preload)&&(t.state.loading&3)===0&&(e.count++,t=Is.bind(e),n.addEventListener("load",t),n.addEventListener("error",t))}}var rc=0;function b1(e,n){return e.stylesheets&&e.count===0&&_s(e,e.stylesheets),0<e.count||0<e.imgCount?function(t){var i=setTimeout(function(){if(e.stylesheets&&_s(e,e.stylesheets),e.unsuspend){var u=e.unsuspend;e.unsuspend=null,u()}},6e4+n);0<e.imgBytes&&rc===0&&(rc=62500*Jb());var o=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&_s(e,e.stylesheets),e.unsuspend)){var u=e.unsuspend;e.unsuspend=null,u()}},(e.imgBytes>rc?50:800)+n);return e.unsuspend=t,function(){e.unsuspend=null,clearTimeout(i),clearTimeout(o)}}:null}function Is(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)_s(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}}var Ms=null;function _s(e,n){e.stylesheets=null,e.unsuspend!==null&&(e.count++,Ms=new Map,n.forEach(z1,e),Ms=null,Is.call(e))}function z1(e,n){if(!(n.state.loading&4)){var t=Ms.get(e);if(t)var i=t.get(null);else{t=new Map,Ms.set(e,t);for(var o=e.querySelectorAll("link[data-precedence],style[data-precedence]"),u=0;u<o.length;u++){var m=o[u];(m.nodeName==="LINK"||m.getAttribute("media")!=="not all")&&(t.set(m.dataset.precedence,m),i=m)}i&&t.set(null,i)}o=n.instance,m=o.getAttribute("data-precedence"),u=t.get(m)||i,u===i&&t.set(null,o),t.set(m,o),this.count++,i=Is.bind(this),o.addEventListener("load",i),o.addEventListener("error",i),u?u.parentNode.insertBefore(o,u.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(o,e.firstChild)),n.state.loading|=4}}var il={$$typeof:q,Provider:null,Consumer:null,_currentValue:re,_currentValue2:re,_threadCount:0};function v1(e,n,t,i,o,u,m,z,x){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=Da(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Da(0),this.hiddenUpdates=Da(null),this.identifierPrefix=i,this.onUncaughtError=o,this.onCaughtError=u,this.onRecoverableError=m,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=x,this.incompleteTransitions=new Map}function Zh(e,n,t,i,o,u,m,z,x,_,j,Y){return e=new v1(e,n,t,m,x,_,j,Y,z),n=1,u===!0&&(n|=24),u=ot(3,null,null,n),e.current=u,u.stateNode=e,n=Uo(),n.refCount++,e.pooledCache=n,n.refCount++,u.memoizedState={element:i,isDehydrated:t,cache:n},Xo(u),e}function Vh(e){return e?(e=Bi,e):Bi}function qh(e,n,t,i,o,u){o=Vh(o),i.context===null?i.context=o:i.pendingContext=o,i=Ma(n),i.payload={element:t},u=u===void 0?null:u,u!==null&&(i.callback=u),t=_a(e,i,n),t!==null&&(nt(t,e,n),Nr(t,e,n))}function Yh(e,n){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var t=e.retryLane;e.retryLane=t!==0&&t<n?t:n}}function lc(e,n){Yh(e,n),(e=e.alternate)&&Yh(e,n)}function Gh(e){if(e.tag===13||e.tag===31){var n=ci(e,67108864);n!==null&&nt(n,e,67108864),lc(e,67108864)}}function Qh(e){if(e.tag===13||e.tag===31){var n=pt();n=Q(n);var t=ci(e,n);t!==null&&nt(t,e,n),lc(e,n)}}var Cs=!0;function S1(e,n,t,i){var o=C.T;C.T=null;var u=K.p;try{K.p=2,sc(e,n,t,i)}finally{K.p=u,C.T=o}}function E1(e,n,t,i){var o=C.T;C.T=null;var u=K.p;try{K.p=8,sc(e,n,t,i)}finally{K.p=u,C.T=o}}function sc(e,n,t,i){if(Cs){var o=oc(i);if(o===null)Yu(e,n,i,Ls,t),Fh(e,i);else if(x1(o,e,n,t,i))i.stopPropagation();else if(Fh(e,i),n&4&&-1<D1.indexOf(e)){for(;o!==null;){var u=bt(o);if(u!==null)switch(u.tag){case 3:if(u=u.stateNode,u.current.memoizedState.isDehydrated){var m=Ft(u.pendingLanes);if(m!==0){var z=u;for(z.pendingLanes|=2,z.entangledLanes|=2;m;){var x=1<<31-Fe(m);z.entanglements[1]|=x,m&=~x}Vt(u),(Ge&6)===0&&(gs=bn()+500,Jr(0))}}break;case 31:case 13:z=ci(u,2),z!==null&&nt(z,u,2),bs(),lc(u,2)}if(u=oc(i),u===null&&Yu(e,n,i,Ls,t),u===o)break;o=u}o!==null&&i.stopPropagation()}else Yu(e,n,i,null,t)}}function oc(e){return e=uo(e),uc(e)}var Ls=null;function uc(e){if(Ls=null,e=lt(e),e!==null){var n=d(e);if(n===null)e=null;else{var t=n.tag;if(t===13){if(e=f(n),e!==null)return e;e=null}else if(t===31){if(e=h(n),e!==null)return e;e=null}else if(t===3){if(n.stateNode.current.memoizedState.isDehydrated)return n.tag===3?n.stateNode.containerInfo:null;e=null}else n!==e&&(e=null)}}return Ls=e,null}function Kh(e){switch(e){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(Kt()){case Z:return 2;case te:return 8;case ve:case Ae:return 32;case Ve:return 268435456;default:return 32}default:return 32}}var cc=!1,Ha=null,Za=null,Va=null,rl=new Map,ll=new Map,qa=[],D1="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function Fh(e,n){switch(e){case"focusin":case"focusout":Ha=null;break;case"dragenter":case"dragleave":Za=null;break;case"mouseover":case"mouseout":Va=null;break;case"pointerover":case"pointerout":rl.delete(n.pointerId);break;case"gotpointercapture":case"lostpointercapture":ll.delete(n.pointerId)}}function sl(e,n,t,i,o,u){return e===null||e.nativeEvent!==u?(e={blockedOn:n,domEventName:t,eventSystemFlags:i,nativeEvent:u,targetContainers:[o]},n!==null&&(n=bt(n),n!==null&&Gh(n)),e):(e.eventSystemFlags|=i,n=e.targetContainers,o!==null&&n.indexOf(o)===-1&&n.push(o),e)}function x1(e,n,t,i,o){switch(n){case"focusin":return Ha=sl(Ha,e,n,t,i,o),!0;case"dragenter":return Za=sl(Za,e,n,t,i,o),!0;case"mouseover":return Va=sl(Va,e,n,t,i,o),!0;case"pointerover":var u=o.pointerId;return rl.set(u,sl(rl.get(u)||null,e,n,t,i,o)),!0;case"gotpointercapture":return u=o.pointerId,ll.set(u,sl(ll.get(u)||null,e,n,t,i,o)),!0}return!1}function Jh(e){var n=lt(e.target);if(n!==null){var t=d(n);if(t!==null){if(n=t.tag,n===13){if(n=f(t),n!==null){e.blockedOn=n,xe(e.priority,function(){Qh(t)});return}}else if(n===31){if(n=h(t),n!==null){e.blockedOn=n,xe(e.priority,function(){Qh(t)});return}}else if(n===3&&t.stateNode.current.memoizedState.isDehydrated){e.blockedOn=t.tag===3?t.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Os(e){if(e.blockedOn!==null)return!1;for(var n=e.targetContainers;0<n.length;){var t=oc(e.nativeEvent);if(t===null){t=e.nativeEvent;var i=new t.constructor(t.type,t);oo=i,t.target.dispatchEvent(i),oo=null}else return n=bt(t),n!==null&&Gh(n),e.blockedOn=t,!1;n.shift()}return!0}function $h(e,n,t){Os(e)&&t.delete(n)}function T1(){cc=!1,Ha!==null&&Os(Ha)&&(Ha=null),Za!==null&&Os(Za)&&(Za=null),Va!==null&&Os(Va)&&(Va=null),rl.forEach($h),ll.forEach($h)}function Ns(e,n){e.blockedOn===n&&(e.blockedOn=null,cc||(cc=!0,a.unstable_scheduleCallback(a.unstable_NormalPriority,T1)))}var Ws=null;function em(e){Ws!==e&&(Ws=e,a.unstable_scheduleCallback(a.unstable_NormalPriority,function(){Ws===e&&(Ws=null);for(var n=0;n<e.length;n+=3){var t=e[n],i=e[n+1],o=e[n+2];if(typeof i!="function"){if(uc(i||t)===null)continue;break}var u=bt(t);u!==null&&(e.splice(n,3),n-=3,ou(u,{pending:!0,data:o,method:t.method,action:i},i,o))}}))}function cr(e){function n(x){return Ns(x,e)}Ha!==null&&Ns(Ha,e),Za!==null&&Ns(Za,e),Va!==null&&Ns(Va,e),rl.forEach(n),ll.forEach(n);for(var t=0;t<qa.length;t++){var i=qa[t];i.blockedOn===e&&(i.blockedOn=null)}for(;0<qa.length&&(t=qa[0],t.blockedOn===null);)Jh(t),t.blockedOn===null&&qa.shift();if(t=(e.ownerDocument||e).$$reactFormReplay,t!=null)for(i=0;i<t.length;i+=3){var o=t[i],u=t[i+1],m=o[se]||null;if(typeof u=="function")m||em(t);else if(m){var z=null;if(u&&u.hasAttribute("formAction")){if(o=u,m=u[se]||null)z=m.formAction;else if(uc(o)!==null)continue}else z=m.action;typeof z=="function"?t[i+1]=z:(t.splice(i,3),i-=3),em(t)}}}function nm(){function e(u){u.canIntercept&&u.info==="react-transition"&&u.intercept({handler:function(){return new Promise(function(m){return o=m})},focusReset:"manual",scroll:"manual"})}function n(){o!==null&&(o(),o=null),i||setTimeout(t,20)}function t(){if(!i&&!navigation.transition){var u=navigation.currentEntry;u&&u.url!=null&&navigation.navigate(u.url,{state:u.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var i=!1,o=null;return navigation.addEventListener("navigate",e),navigation.addEventListener("navigatesuccess",n),navigation.addEventListener("navigateerror",n),setTimeout(t,100),function(){i=!0,navigation.removeEventListener("navigate",e),navigation.removeEventListener("navigatesuccess",n),navigation.removeEventListener("navigateerror",n),o!==null&&(o(),o=null)}}}function dc(e){this._internalRoot=e}Us.prototype.render=dc.prototype.render=function(e){var n=this._internalRoot;if(n===null)throw Error(s(409));var t=n.current,i=pt();qh(t,i,e,n,null,null)},Us.prototype.unmount=dc.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var n=e.containerInfo;qh(e.current,2,null,e,null,null),bs(),n[me]=null}};function Us(e){this._internalRoot=e}Us.prototype.unstable_scheduleHydration=function(e){if(e){var n=Se();e={blockedOn:null,target:e,priority:n};for(var t=0;t<qa.length&&n!==0&&n<qa[t].priority;t++);qa.splice(t,0,e),t===0&&Jh(e)}};var tm=r.version;if(tm!=="19.2.3")throw Error(s(527,tm,"19.2.3"));K.findDOMNode=function(e){var n=e._reactInternals;if(n===void 0)throw typeof e.render=="function"?Error(s(188)):(e=Object.keys(e).join(","),Error(s(268,e)));return e=p(n),e=e!==null?y(e):null,e=e===null?null:e.stateNode,e};var A1={bundleType:0,version:"19.2.3",rendererPackageName:"react-dom",currentDispatcherRef:C,reconcilerVersion:"19.2.3"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Ps=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Ps.isDisabled&&Ps.supportsFiber)try{mn=Ps.inject(A1),zn=Ps}catch{}}return ul.createRoot=function(e,n){if(!c(e))throw Error(s(299));var t=!1,i="",o=up,u=cp,m=dp;return n!=null&&(n.unstable_strictMode===!0&&(t=!0),n.identifierPrefix!==void 0&&(i=n.identifierPrefix),n.onUncaughtError!==void 0&&(o=n.onUncaughtError),n.onCaughtError!==void 0&&(u=n.onCaughtError),n.onRecoverableError!==void 0&&(m=n.onRecoverableError)),n=Zh(e,1,!1,null,null,t,i,null,o,u,m,nm),e[me]=n.current,qu(e),new dc(n)},ul.hydrateRoot=function(e,n,t){if(!c(e))throw Error(s(299));var i=!1,o="",u=up,m=cp,z=dp,x=null;return t!=null&&(t.unstable_strictMode===!0&&(i=!0),t.identifierPrefix!==void 0&&(o=t.identifierPrefix),t.onUncaughtError!==void 0&&(u=t.onUncaughtError),t.onCaughtError!==void 0&&(m=t.onCaughtError),t.onRecoverableError!==void 0&&(z=t.onRecoverableError),t.formState!==void 0&&(x=t.formState)),n=Zh(e,1,!0,n,t??null,i,o,x,u,m,z,nm),n.context=Vh(null),t=n.current,i=pt(),i=Q(i),o=Ma(i),o.callback=null,_a(t,o,i),t=i,n.current.lanes=t,ri(n,t),Vt(n),e[me]=n.current,qu(e),new Us(n)},ul.version="19.2.3",ul}var fm;function N1(){if(fm)return hc.exports;fm=1;function a(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(a)}catch(r){console.error(r)}}return a(),hc.exports=O1(),hc.exports}var W1=N1(),Eg=Sg();const U1=Js(Eg),P1=zg({__proto__:null,default:U1},[Eg]);function yn(){return yn=Object.assign?Object.assign.bind():function(a){for(var r=1;r<arguments.length;r++){var l=arguments[r];for(var s in l)Object.prototype.hasOwnProperty.call(l,s)&&(a[s]=l[s])}return a},yn.apply(this,arguments)}var Mn;(function(a){a.Pop="POP",a.Push="PUSH",a.Replace="REPLACE"})(Mn||(Mn={}));const pm="popstate";function B1(a){a===void 0&&(a={});function r(s,c){let{pathname:d,search:f,hash:h}=s.location;return Sl("",{pathname:d,search:f,hash:h},c.state&&c.state.usr||null,c.state&&c.state.key||"default")}function l(s,c){return typeof c=="string"?c:wi(c)}return X1(r,l,null,a)}function Ne(a,r){if(a===!1||a===null||typeof a>"u")throw new Error(r)}function Ai(a,r){if(!a){typeof console<"u"&&console.warn(r);try{throw new Error(r)}catch{}}}function j1(){return Math.random().toString(36).substr(2,8)}function hm(a,r){return{usr:a.state,key:a.key,idx:r}}function Sl(a,r,l,s){return l===void 0&&(l=null),yn({pathname:typeof a=="string"?a:a.pathname,search:"",hash:""},typeof r=="string"?Fa(r):r,{state:l,key:r&&r.key||s||j1()})}function wi(a){let{pathname:r="/",search:l="",hash:s=""}=a;return l&&l!=="?"&&(r+=l.charAt(0)==="?"?l:"?"+l),s&&s!=="#"&&(r+=s.charAt(0)==="#"?s:"#"+s),r}function Fa(a){let r={};if(a){let l=a.indexOf("#");l>=0&&(r.hash=a.substr(l),a=a.substr(0,l));let s=a.indexOf("?");s>=0&&(r.search=a.substr(s),a=a.substr(0,s)),a&&(r.pathname=a)}return r}function X1(a,r,l,s){s===void 0&&(s={});let{window:c=document.defaultView,v5Compat:d=!1}=s,f=c.history,h=Mn.Pop,g=null,p=y();p==null&&(p=0,f.replaceState(yn({},f.state,{idx:p}),""));function y(){return(f.state||{idx:null}).idx}function b(){h=Mn.Pop;let H=y(),P=H==null?null:H-p;p=H,g&&g({action:h,location:N.location,delta:P})}function S(H,P){h=Mn.Push;let G=Sl(N.location,H,P);p=y()+1;let q=hm(G,p),ce=N.createHref(G);try{f.pushState(q,"",ce)}catch(be){if(be instanceof DOMException&&be.name==="DataCloneError")throw be;c.location.assign(ce)}d&&g&&g({action:h,location:N.location,delta:1})}function v(H,P){h=Mn.Replace;let G=Sl(N.location,H,P);p=y();let q=hm(G,p),ce=N.createHref(G);f.replaceState(q,"",ce),d&&g&&g({action:h,location:N.location,delta:0})}function L(H){let P=c.location.origin!=="null"?c.location.origin:c.location.href,G=typeof H=="string"?H:wi(H);return G=G.replace(/ $/,"%20"),Ne(P,"No window.location.(origin|href) available to create URL for href: "+G),new URL(G,P)}let N={get action(){return h},get location(){return a(c,f)},listen(H){if(g)throw new Error("A history only accepts one active listener");return c.addEventListener(pm,b),g=H,()=>{c.removeEventListener(pm,b),g=null}},createHref(H){return r(c,H)},createURL:L,encodeLocation(H){let P=L(H);return{pathname:P.pathname,search:P.search,hash:P.hash}},push:S,replace:v,go(H){return f.go(H)}};return N}var tn;(function(a){a.data="data",a.deferred="deferred",a.redirect="redirect",a.error="error"})(tn||(tn={}));const H1=new Set(["lazy","caseSensitive","path","id","index","children"]);function Z1(a){return a.index===!0}function qs(a,r,l,s){return l===void 0&&(l=[]),s===void 0&&(s={}),a.map((c,d)=>{let f=[...l,String(d)],h=typeof c.id=="string"?c.id:f.join("-");if(Ne(c.index!==!0||!c.children,"Cannot specify children on an index route"),Ne(!s[h],'Found a route id collision on id "'+h+`".  Route id's must be globally unique within Data Router usages`),Z1(c)){let g=yn({},c,r(c),{id:h});return s[h]=g,g}else{let g=yn({},c,r(c),{id:h,children:void 0});return s[h]=g,c.children&&(g.children=qs(c.children,r,f,s)),g}})}function Di(a,r,l){return l===void 0&&(l="/"),Zs(a,r,l,!1)}function Zs(a,r,l,s){let c=typeof r=="string"?Fa(r):r,d=ya(c.pathname||"/",l);if(d==null)return null;let f=Dg(a);q1(f);let h=null;for(let g=0;h==null&&g<f.length;++g){let p=az(d);h=nz(f[g],p,s)}return h}function V1(a,r){let{route:l,pathname:s,params:c}=a;return{id:l.id,pathname:s,params:c,data:r[l.id],handle:l.handle}}function Dg(a,r,l,s){r===void 0&&(r=[]),l===void 0&&(l=[]),s===void 0&&(s="");let c=(d,f,h)=>{let g={relativePath:h===void 0?d.path||"":h,caseSensitive:d.caseSensitive===!0,childrenIndex:f,route:d};g.relativePath.startsWith("/")&&(Ne(g.relativePath.startsWith(s),'Absolute route path "'+g.relativePath+'" nested under path '+('"'+s+'" is not valid. An absolute child route path ')+"must start with the combined path of all its parent routes."),g.relativePath=g.relativePath.slice(s.length));let p=ga([s,g.relativePath]),y=l.concat(g);d.children&&d.children.length>0&&(Ne(d.index!==!0,"Index routes must not have child routes. Please remove "+('all child routes from route path "'+p+'".')),Dg(d.children,r,y,p)),!(d.path==null&&!d.index)&&r.push({path:p,score:$1(p,d.index),routesMeta:y})};return a.forEach((d,f)=>{var h;if(d.path===""||!((h=d.path)!=null&&h.includes("?")))c(d,f);else for(let g of xg(d.path))c(d,f,g)}),r}function xg(a){let r=a.split("/");if(r.length===0)return[];let[l,...s]=r,c=l.endsWith("?"),d=l.replace(/\?$/,"");if(s.length===0)return c?[d,""]:[d];let f=xg(s.join("/")),h=[];return h.push(...f.map(g=>g===""?d:[d,g].join("/"))),c&&h.push(...f),h.map(g=>a.startsWith("/")&&g===""?"/":g)}function q1(a){a.sort((r,l)=>r.score!==l.score?l.score-r.score:ez(r.routesMeta.map(s=>s.childrenIndex),l.routesMeta.map(s=>s.childrenIndex)))}const Y1=/^:[\w-]+$/,G1=3,Q1=2,K1=1,F1=10,J1=-2,mm=a=>a==="*";function $1(a,r){let l=a.split("/"),s=l.length;return l.some(mm)&&(s+=J1),r&&(s+=Q1),l.filter(c=>!mm(c)).reduce((c,d)=>c+(Y1.test(d)?G1:d===""?K1:F1),s)}function ez(a,r){return a.length===r.length&&a.slice(0,-1).every((s,c)=>s===r[c])?a[a.length-1]-r[r.length-1]:0}function nz(a,r,l){l===void 0&&(l=!1);let{routesMeta:s}=a,c={},d="/",f=[];for(let h=0;h<s.length;++h){let g=s[h],p=h===s.length-1,y=d==="/"?r:r.slice(d.length)||"/",b=Ys({path:g.relativePath,caseSensitive:g.caseSensitive,end:p},y),S=g.route;if(!b&&p&&l&&!s[s.length-1].route.index&&(b=Ys({path:g.relativePath,caseSensitive:g.caseSensitive,end:!1},y)),!b)return null;Object.assign(c,b.params),f.push({params:c,pathname:ga([d,b.pathname]),pathnameBase:sz(ga([d,b.pathnameBase])),route:S}),b.pathnameBase!=="/"&&(d=ga([d,b.pathnameBase]))}return f}function Ys(a,r){typeof a=="string"&&(a={path:a,caseSensitive:!1,end:!0});let[l,s]=tz(a.path,a.caseSensitive,a.end),c=r.match(l);if(!c)return null;let d=c[0],f=d.replace(/(.)\/+$/,"$1"),h=c.slice(1);return{params:s.reduce((p,y,b)=>{let{paramName:S,isOptional:v}=y;if(S==="*"){let N=h[b]||"";f=d.slice(0,d.length-N.length).replace(/(.)\/+$/,"$1")}const L=h[b];return v&&!L?p[S]=void 0:p[S]=(L||"").replace(/%2F/g,"/"),p},{}),pathname:d,pathnameBase:f,pattern:a}}function tz(a,r,l){r===void 0&&(r=!1),l===void 0&&(l=!0),Ai(a==="*"||!a.endsWith("*")||a.endsWith("/*"),'Route path "'+a+'" will be treated as if it were '+('"'+a.replace(/\*$/,"/*")+'" because the `*` character must ')+"always follow a `/` in the pattern. To get rid of this warning, "+('please change the route path to "'+a.replace(/\*$/,"/*")+'".'));let s=[],c="^"+a.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(f,h,g)=>(s.push({paramName:h,isOptional:g!=null}),g?"/?([^\\/]+)?":"/([^\\/]+)"));return a.endsWith("*")?(s.push({paramName:"*"}),c+=a==="*"||a==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):l?c+="\\/*$":a!==""&&a!=="/"&&(c+="(?:(?=\\/|$))"),[new RegExp(c,r?void 0:"i"),s]}function az(a){try{return a.split("/").map(r=>decodeURIComponent(r).replace(/\//g,"%2F")).join("/")}catch(r){return Ai(!1,'The URL path "'+a+'" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent '+("encoding ("+r+").")),a}}function ya(a,r){if(r==="/")return a;if(!a.toLowerCase().startsWith(r.toLowerCase()))return null;let l=r.endsWith("/")?r.length-1:r.length,s=a.charAt(l);return s&&s!=="/"?null:a.slice(l)||"/"}const iz=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,rz=a=>iz.test(a);function lz(a,r){r===void 0&&(r="/");let{pathname:l,search:s="",hash:c=""}=typeof a=="string"?Fa(a):a,d;if(l)if(rz(l))d=l;else{if(l.includes("//")){let f=l;l=l.replace(/\/\/+/g,"/"),Ai(!1,"Pathnames cannot have embedded double slashes - normalizing "+(f+" -> "+l))}l.startsWith("/")?d=gm(l.substring(1),"/"):d=gm(l,r)}else d=r;return{pathname:d,search:oz(s),hash:uz(c)}}function gm(a,r){let l=r.replace(/\/+$/,"").split("/");return a.split("/").forEach(c=>{c===".."?l.length>1&&l.pop():c!=="."&&l.push(c)}),l.length>1?l.join("/"):"/"}function bc(a,r,l,s){return"Cannot include a '"+a+"' character in a manually specified "+("`to."+r+"` field ["+JSON.stringify(s)+"].  Please separate it out to the ")+("`to."+l+"` field. Alternatively you may provide the full path as ")+'a string in <Link to="..."> and the router will parse it for you.'}function Tg(a){return a.filter((r,l)=>l===0||r.route.path&&r.route.path.length>0)}function Kc(a,r){let l=Tg(a);return r?l.map((s,c)=>c===l.length-1?s.pathname:s.pathnameBase):l.map(s=>s.pathnameBase)}function Fc(a,r,l,s){s===void 0&&(s=!1);let c;typeof a=="string"?c=Fa(a):(c=yn({},a),Ne(!c.pathname||!c.pathname.includes("?"),bc("?","pathname","search",c)),Ne(!c.pathname||!c.pathname.includes("#"),bc("#","pathname","hash",c)),Ne(!c.search||!c.search.includes("#"),bc("#","search","hash",c)));let d=a===""||c.pathname==="",f=d?"/":c.pathname,h;if(f==null)h=l;else{let b=r.length-1;if(!s&&f.startsWith("..")){let S=f.split("/");for(;S[0]==="..";)S.shift(),b-=1;c.pathname=S.join("/")}h=b>=0?r[b]:"/"}let g=lz(c,h),p=f&&f!=="/"&&f.endsWith("/"),y=(d||f===".")&&l.endsWith("/");return!g.pathname.endsWith("/")&&(p||y)&&(g.pathname+="/"),g}const ga=a=>a.join("/").replace(/\/\/+/g,"/"),sz=a=>a.replace(/\/+$/,"").replace(/^\/*/,"/"),oz=a=>!a||a==="?"?"":a.startsWith("?")?a:"?"+a,uz=a=>!a||a==="#"?"":a.startsWith("#")?a:"#"+a;class Gs{constructor(r,l,s,c){c===void 0&&(c=!1),this.status=r,this.statusText=l||"",this.internal=c,s instanceof Error?(this.data=s.toString(),this.error=s):this.data=s}}function El(a){return a!=null&&typeof a.status=="number"&&typeof a.statusText=="string"&&typeof a.internal=="boolean"&&"data"in a}const Ag=["post","put","patch","delete"],cz=new Set(Ag),dz=["get",...Ag],fz=new Set(dz),pz=new Set([301,302,303,307,308]),hz=new Set([307,308]),zc={state:"idle",location:void 0,formMethod:void 0,formAction:void 0,formEncType:void 0,formData:void 0,json:void 0,text:void 0},mz={state:"idle",data:void 0,formMethod:void 0,formAction:void 0,formEncType:void 0,formData:void 0,json:void 0,text:void 0},cl={state:"unblocked",proceed:void 0,reset:void 0,location:void 0},Jc=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,gz=a=>({hasErrorBoundary:!!a.hasErrorBoundary}),wg="remix-router-transitions";function yz(a){const r=a.window?a.window:typeof window<"u"?window:void 0,l=typeof r<"u"&&typeof r.document<"u"&&typeof r.document.createElement<"u",s=!l;Ne(a.routes.length>0,"You must provide a non-empty routes array to createRouter");let c;if(a.mapRouteProperties)c=a.mapRouteProperties;else if(a.detectErrorBoundary){let A=a.detectErrorBoundary;c=I=>({hasErrorBoundary:A(I)})}else c=gz;let d={},f=qs(a.routes,c,void 0,d),h,g=a.basename||"/",p=a.dataStrategy||Sz,y=a.patchRoutesOnNavigation,b=yn({v7_fetcherPersist:!1,v7_normalizeFormMethod:!1,v7_partialHydration:!1,v7_prependBasename:!1,v7_relativeSplatPath:!1,v7_skipActionErrorRevalidation:!1},a.future),S=null,v=new Set,L=null,N=null,H=null,P=a.hydrationData!=null,G=Di(f,a.history.location,g),q=!1,ce=null;if(G==null&&!y){let A=at(404,{pathname:a.history.location.pathname}),{matches:I,route:W}=wm(f);G=I,ce={[W.id]:A}}G&&!a.hydrationData&&ii(G,f,a.history.location.pathname).active&&(G=null);let be;if(G)if(G.some(A=>A.route.lazy))be=!1;else if(!G.some(A=>A.route.loader))be=!0;else if(b.v7_partialHydration){let A=a.hydrationData?a.hydrationData.loaderData:null,I=a.hydrationData?a.hydrationData.errors:null;if(I){let W=G.findIndex(Q=>I[Q.route.id]!==void 0);be=G.slice(0,W+1).every(Q=>!Nc(Q.route,A,I))}else be=G.every(W=>!Nc(W.route,A,I))}else be=a.hydrationData!=null;else if(be=!1,G=[],b.v7_partialHydration){let A=ii(null,f,a.history.location.pathname);A.active&&A.matches&&(q=!0,G=A.matches)}let X,R={historyAction:a.history.action,location:a.history.location,matches:G,initialized:be,navigation:zc,restoreScrollPosition:a.hydrationData!=null?!1:null,preventScrollReset:!1,revalidation:"idle",loaderData:a.hydrationData&&a.hydrationData.loaderData||{},actionData:a.hydrationData&&a.hydrationData.actionData||null,errors:a.hydrationData&&a.hydrationData.errors||ce,fetchers:new Map,blockers:new Map},ne=Mn.Pop,pe=!1,ue,ae=!1,ee=new Map,Te=null,de=!1,J=!1,C=[],K=new Set,re=new Map,_e=0,D=-1,T=new Map,B=new Set,E=new Map,ie=new Map,ye=new Set,ge=new Map,Ie=new Map,Je;function Ke(){if(S=a.history.listen(A=>{let{action:I,location:W,delta:Q}=A;if(Je){Je(),Je=void 0;return}Ai(Ie.size===0||Q!=null,"You are trying to use a blocker on a POP navigation to a location that was not created by @remix-run/router. This will fail silently in production. This can happen if you are navigating outside the router via `window.history.pushState`/`window.location.hash` instead of using router navigation APIs.  This can also happen if you are using createHashRouter and the user manually changes the URL.");let le=ni({currentLocation:R.location,nextLocation:W,historyAction:I});if(le&&Q!=null){let Se=new Promise(xe=>{Je=xe});a.history.go(Q*-1),Mi(le,{state:"blocked",location:W,proceed(){Mi(le,{state:"proceeding",proceed:void 0,reset:void 0,location:W}),Se.then(()=>a.history.go(Q))},reset(){let xe=new Map(R.blockers);xe.set(le,cl),Dn({blockers:xe})}});return}return Yn(I,W)}),l){Oz(r,ee);let A=()=>Nz(r,ee);r.addEventListener("pagehide",A),Te=()=>r.removeEventListener("pagehide",A)}return R.initialized||Yn(Mn.Pop,R.location,{initialHydration:!0}),X}function qn(){S&&S(),Te&&Te(),v.clear(),ue&&ue.abort(),R.fetchers.forEach((A,I)=>Ln(I)),R.blockers.forEach((A,I)=>Gn(I))}function Mt(A){return v.add(A),()=>v.delete(A)}function Dn(A,I){I===void 0&&(I={}),R=yn({},R,A);let W=[],Q=[];b.v7_fetcherPersist&&R.fetchers.forEach((le,Se)=>{le.state==="idle"&&(ye.has(Se)?Q.push(Se):W.push(Se))}),ye.forEach(le=>{!R.fetchers.has(le)&&!re.has(le)&&Q.push(le)}),[...v].forEach(le=>le(R,{deletedFetchers:Q,viewTransitionOpts:I.viewTransitionOpts,flushSync:I.flushSync===!0})),b.v7_fetcherPersist?(W.forEach(le=>R.fetchers.delete(le)),Q.forEach(le=>Ln(le))):Q.forEach(le=>ye.delete(le))}function _t(A,I,W){var Q,le;let{flushSync:Se}=W===void 0?{}:W,xe=R.actionData!=null&&R.navigation.formMethod!=null&&Pt(R.navigation.formMethod)&&R.navigation.state==="loading"&&((Q=A.state)==null?void 0:Q._isRedirect)!==!0,fe;I.actionData?Object.keys(I.actionData).length>0?fe=I.actionData:fe=null:xe?fe=R.actionData:fe=null;let oe=I.loaderData?Tm(R.loaderData,I.loaderData,I.matches||[],I.errors):R.loaderData,se=R.blockers;se.size>0&&(se=new Map(se),se.forEach((Be,_n)=>se.set(_n,cl)));let me=pe===!0||R.navigation.formMethod!=null&&Pt(R.navigation.formMethod)&&((le=A.state)==null?void 0:le._isRedirect)!==!0;h&&(f=h,h=void 0),de||ne===Mn.Pop||(ne===Mn.Push?a.history.push(A,A.state):ne===Mn.Replace&&a.history.replace(A,A.state));let ke;if(ne===Mn.Pop){let Be=ee.get(R.location.pathname);Be&&Be.has(A.pathname)?ke={currentLocation:R.location,nextLocation:A}:ee.has(A.pathname)&&(ke={currentLocation:A,nextLocation:R.location})}else if(ae){let Be=ee.get(R.location.pathname);Be?Be.add(A.pathname):(Be=new Set([A.pathname]),ee.set(R.location.pathname,Be)),ke={currentLocation:R.location,nextLocation:A}}Dn(yn({},I,{actionData:fe,loaderData:oe,historyAction:ne,location:A,initialized:!0,navigation:zc,revalidation:"idle",restoreScrollPosition:kl(A,I.matches||R.matches),preventScrollReset:me,blockers:se}),{viewTransitionOpts:ke,flushSync:Se===!0}),ne=Mn.Pop,pe=!1,ae=!1,de=!1,J=!1,C=[]}async function yt(A,I){if(typeof A=="number"){a.history.go(A);return}let W=Oc(R.location,R.matches,g,b.v7_prependBasename,A,b.v7_relativeSplatPath,I?.fromRouteId,I?.relative),{path:Q,submission:le,error:Se}=ym(b.v7_normalizeFormMethod,!1,W,I),xe=R.location,fe=Sl(R.location,Q,I&&I.state);fe=yn({},fe,a.history.encodeLocation(fe));let oe=I&&I.replace!=null?I.replace:void 0,se=Mn.Push;oe===!0?se=Mn.Replace:oe===!1||le!=null&&Pt(le.formMethod)&&le.formAction===R.location.pathname+R.location.search&&(se=Mn.Replace);let me=I&&"preventScrollReset"in I?I.preventScrollReset===!0:void 0,ke=(I&&I.flushSync)===!0,Be=ni({currentLocation:xe,nextLocation:fe,historyAction:se});if(Be){Mi(Be,{state:"blocked",location:fe,proceed(){Mi(Be,{state:"proceeding",proceed:void 0,reset:void 0,location:fe}),yt(A,I)},reset(){let _n=new Map(R.blockers);_n.set(Be,cl),Dn({blockers:_n})}});return}return await Yn(se,fe,{submission:le,pendingError:Se,preventScrollReset:me,replace:I&&I.replace,enableViewTransition:I&&I.viewTransition,flushSync:ke})}function za(){if(te(),Dn({revalidation:"loading"}),R.navigation.state!=="submitting"){if(R.navigation.state==="idle"){Yn(R.historyAction,R.location,{startUninterruptedRevalidation:!0});return}Yn(ne||R.historyAction,R.navigation.location,{overrideNavigation:R.navigation,enableViewTransition:ae===!0})}}async function Yn(A,I,W){ue&&ue.abort(),ue=null,ne=A,de=(W&&W.startUninterruptedRevalidation)===!0,ai(R.location,R.matches),pe=(W&&W.preventScrollReset)===!0,ae=(W&&W.enableViewTransition)===!0;let Q=h||f,le=W&&W.overrideNavigation,Se=W!=null&&W.initialHydration&&R.matches&&R.matches.length>0&&!q?R.matches:Di(Q,I,g),xe=(W&&W.flushSync)===!0;if(Se&&R.initialized&&!J&&wz(R.location,I)&&!(W&&W.submission&&Pt(W.submission.formMethod))){_t(I,{matches:Se},{flushSync:xe});return}let fe=ii(Se,Q,I.pathname);if(fe.active&&fe.matches&&(Se=fe.matches),!Se){let{error:$e,notFoundMatches:We,route:on}=Sa(I.pathname);_t(I,{matches:We,loaderData:{},errors:{[on.id]:$e}},{flushSync:xe});return}ue=new AbortController;let oe=dr(a.history,I,ue.signal,W&&W.submission),se;if(W&&W.pendingError)se=[xi(Se).route.id,{type:tn.error,error:W.pendingError}];else if(W&&W.submission&&Pt(W.submission.formMethod)){let $e=await ki(oe,I,W.submission,Se,fe.active,{replace:W.replace,flushSync:xe});if($e.shortCircuited)return;if($e.pendingActionResult){let[We,on]=$e.pendingActionResult;if(mt(on)&&El(on.error)&&on.error.status===404){ue=null,_t(I,{matches:$e.matches,loaderData:{},errors:{[We]:on.error}});return}}Se=$e.matches||Se,se=$e.pendingActionResult,le=vc(I,W.submission),xe=!1,fe.active=!1,oe=dr(a.history,oe.url,oe.signal)}let{shortCircuited:me,matches:ke,loaderData:Be,errors:_n}=await Ii(oe,I,Se,fe.active,le,W&&W.submission,W&&W.fetcherSubmission,W&&W.replace,W&&W.initialHydration===!0,xe,se);me||(ue=null,_t(I,yn({matches:ke||Se},Am(se),{loaderData:Be,errors:_n})))}async function ki(A,I,W,Q,le,Se){Se===void 0&&(Se={}),te();let xe=Cz(I,W);if(Dn({navigation:xe},{flushSync:Se.flushSync===!0}),le){let se=await Da(Q,I.pathname,A.signal);if(se.type==="aborted")return{shortCircuited:!0};if(se.type==="error"){let me=xi(se.partialMatches).route.id;return{matches:se.partialMatches,pendingActionResult:[me,{type:tn.error,error:se.error}]}}else if(se.matches)Q=se.matches;else{let{notFoundMatches:me,error:ke,route:Be}=Sa(I.pathname);return{matches:me,pendingActionResult:[Be.id,{type:tn.error,error:ke}]}}}let fe,oe=yl(Q,I);if(!oe.route.action&&!oe.route.lazy)fe={type:tn.error,error:at(405,{method:A.method,pathname:I.pathname,routeId:oe.route.id})};else if(fe=(await Kt("action",R,A,[oe],Q,null))[oe.route.id],A.signal.aborted)return{shortCircuited:!0};if(Ti(fe)){let se;return Se&&Se.replace!=null?se=Se.replace:se=Em(fe.response.headers.get("Location"),new URL(A.url),g,a.history)===R.location.pathname+R.location.search,await bn(A,fe,!0,{submission:W,replace:se}),{shortCircuited:!0}}if(Ka(fe))throw at(400,{type:"defer-action"});if(mt(fe)){let se=xi(Q,oe.route.id);return(Se&&Se.replace)!==!0&&(ne=Mn.Push),{matches:Q,pendingActionResult:[se.route.id,fe]}}return{matches:Q,pendingActionResult:[oe.route.id,fe]}}async function Ii(A,I,W,Q,le,Se,xe,fe,oe,se,me){let ke=le||vc(I,Se),Be=Se||xe||km(ke),_n=!de&&(!b.v7_partialHydration||!oe);if(Q){if(_n){let dn=Qt(me);Dn(yn({navigation:ke},dn!==void 0?{actionData:dn}:{}),{flushSync:se})}let Ze=await Da(W,I.pathname,A.signal);if(Ze.type==="aborted")return{shortCircuited:!0};if(Ze.type==="error"){let dn=xi(Ze.partialMatches).route.id;return{matches:Ze.partialMatches,loaderData:{},errors:{[dn]:Ze.error}}}else if(Ze.matches)W=Ze.matches;else{let{error:dn,notFoundMatches:Jt,route:li}=Sa(I.pathname);return{matches:Jt,loaderData:{},errors:{[li.id]:dn}}}}let $e=h||f,[We,on]=zm(a.history,R,W,Be,I,b.v7_partialHydration&&oe===!0,b.v7_skipActionErrorRevalidation,J,C,K,ye,E,B,$e,g,me);if(Ea(Ze=>!(W&&W.some(dn=>dn.route.id===Ze))||We&&We.some(dn=>dn.route.id===Ze)),D=++_e,We.length===0&&on.length===0){let Ze=Nn();return _t(I,yn({matches:W,loaderData:{},errors:me&&mt(me[1])?{[me[0]]:me[1].error}:null},Am(me),Ze?{fetchers:new Map(R.fetchers)}:{}),{flushSync:se}),{shortCircuited:!0}}if(_n){let Ze={};if(!Q){Ze.navigation=ke;let dn=Qt(me);dn!==void 0&&(Ze.actionData=dn)}on.length>0&&(Ze.fetchers=va(on)),Dn(Ze,{flushSync:se})}on.forEach(Ze=>{mn(Ze.key),Ze.controller&&re.set(Ze.key,Ze.controller)});let lt=()=>on.forEach(Ze=>mn(Ze.key));ue&&ue.signal.addEventListener("abort",lt);let{loaderResults:bt,fetcherResults:Zn}=await Z(R,W,We,on,A);if(A.signal.aborted)return{shortCircuited:!0};ue&&ue.signal.removeEventListener("abort",lt),on.forEach(Ze=>re.delete(Ze.key));let Wn=Bs(bt);if(Wn)return await bn(A,Wn.result,!0,{replace:fe}),{shortCircuited:!0};if(Wn=Bs(Zn),Wn)return B.add(Wn.key),await bn(A,Wn.result,!0,{replace:fe}),{shortCircuited:!0};let{loaderData:vn,errors:xa}=xm(R,W,bt,me,on,Zn,ge);ge.forEach((Ze,dn)=>{Ze.subscribe(Jt=>{(Jt||Ze.done)&&ge.delete(dn)})}),b.v7_partialHydration&&oe&&R.errors&&(xa=yn({},R.errors,xa));let jt=Nn(),zt=Fe(D),Lt=jt||zt||on.length>0;return yn({matches:W,loaderData:vn,errors:xa},Lt?{fetchers:new Map(R.fetchers)}:{})}function Qt(A){if(A&&!mt(A[1]))return{[A[0]]:A[1].data};if(R.actionData)return Object.keys(R.actionData).length===0?null:R.actionData}function va(A){return A.forEach(I=>{let W=R.fetchers.get(I.key),Q=dl(void 0,W?W.data:void 0);R.fetchers.set(I.key,Q)}),new Map(R.fetchers)}function ei(A,I,W,Q){if(s)throw new Error("router.fetch() was called during the server render, but it shouldn't be. You are likely calling a useFetcher() method in the body of your component. Try moving it to a useEffect or a callback.");mn(A);let le=(Q&&Q.flushSync)===!0,Se=h||f,xe=Oc(R.location,R.matches,g,b.v7_prependBasename,W,b.v7_relativeSplatPath,I,Q?.relative),fe=Di(Se,xe,g),oe=ii(fe,Se,xe);if(oe.active&&oe.matches&&(fe=oe.matches),!fe){Ae(A,I,at(404,{pathname:xe}),{flushSync:le});return}let{path:se,submission:me,error:ke}=ym(b.v7_normalizeFormMethod,!0,xe,Q);if(ke){Ae(A,I,ke,{flushSync:le});return}let Be=yl(fe,se),_n=(Q&&Q.preventScrollReset)===!0;if(me&&Pt(me.formMethod)){zr(A,I,se,Be,fe,oe.active,le,_n,me);return}E.set(A,{routeId:I,path:se}),vr(A,I,se,Be,fe,oe.active,le,_n,me)}async function zr(A,I,W,Q,le,Se,xe,fe,oe){te(),E.delete(A);function se(fn){if(!fn.route.action&&!fn.route.lazy){let Ot=at(405,{method:oe.formMethod,pathname:W,routeId:I});return Ae(A,I,Ot,{flushSync:xe}),!0}return!1}if(!Se&&se(Q))return;let me=R.fetchers.get(A);ve(A,Lz(oe,me),{flushSync:xe});let ke=new AbortController,Be=dr(a.history,W,ke.signal,oe);if(Se){let fn=await Da(le,new URL(Be.url).pathname,Be.signal,A);if(fn.type==="aborted")return;if(fn.type==="error"){Ae(A,I,fn.error,{flushSync:xe});return}else if(fn.matches){if(le=fn.matches,Q=yl(le,W),se(Q))return}else{Ae(A,I,at(404,{pathname:W}),{flushSync:xe});return}}re.set(A,ke);let _n=_e,We=(await Kt("action",R,Be,[Q],le,A))[Q.route.id];if(Be.signal.aborted){re.get(A)===ke&&re.delete(A);return}if(b.v7_fetcherPersist&&ye.has(A)){if(Ti(We)||mt(We)){ve(A,Qa(void 0));return}}else{if(Ti(We))if(re.delete(A),D>_n){ve(A,Qa(void 0));return}else return B.add(A),ve(A,dl(oe)),bn(Be,We,!1,{fetcherSubmission:oe,preventScrollReset:fe});if(mt(We)){Ae(A,I,We.error);return}}if(Ka(We))throw at(400,{type:"defer-action"});let on=R.navigation.location||R.location,lt=dr(a.history,on,ke.signal),bt=h||f,Zn=R.navigation.state!=="idle"?Di(bt,R.navigation.location,g):R.matches;Ne(Zn,"Didn't find any matches after fetcher action");let Wn=++_e;T.set(A,Wn);let vn=dl(oe,We.data);R.fetchers.set(A,vn);let[xa,jt]=zm(a.history,R,Zn,oe,on,!1,b.v7_skipActionErrorRevalidation,J,C,K,ye,E,B,bt,g,[Q.route.id,We]);jt.filter(fn=>fn.key!==A).forEach(fn=>{let Ot=fn.key,vt=R.fetchers.get(Ot),Qn=dl(void 0,vt?vt.data:void 0);R.fetchers.set(Ot,Qn),mn(Ot),fn.controller&&re.set(Ot,fn.controller)}),Dn({fetchers:new Map(R.fetchers)});let zt=()=>jt.forEach(fn=>mn(fn.key));ke.signal.addEventListener("abort",zt);let{loaderResults:Lt,fetcherResults:Ze}=await Z(R,Zn,xa,jt,lt);if(ke.signal.aborted)return;ke.signal.removeEventListener("abort",zt),T.delete(A),re.delete(A),jt.forEach(fn=>re.delete(fn.key));let dn=Bs(Lt);if(dn)return bn(lt,dn.result,!1,{preventScrollReset:fe});if(dn=Bs(Ze),dn)return B.add(dn.key),bn(lt,dn.result,!1,{preventScrollReset:fe});let{loaderData:Jt,errors:li}=xm(R,Zn,Lt,void 0,jt,Ze,ge);if(R.fetchers.has(A)){let fn=Qa(We.data);R.fetchers.set(A,fn)}Fe(Wn),R.navigation.state==="loading"&&Wn>D?(Ne(ne,"Expected pending action"),ue&&ue.abort(),_t(R.navigation.location,{matches:Zn,loaderData:Jt,errors:li,fetchers:new Map(R.fetchers)})):(Dn({errors:li,loaderData:Tm(R.loaderData,Jt,Zn,li),fetchers:new Map(R.fetchers)}),J=!1)}async function vr(A,I,W,Q,le,Se,xe,fe,oe){let se=R.fetchers.get(A);ve(A,dl(oe,se?se.data:void 0),{flushSync:xe});let me=new AbortController,ke=dr(a.history,W,me.signal);if(Se){let We=await Da(le,new URL(ke.url).pathname,ke.signal,A);if(We.type==="aborted")return;if(We.type==="error"){Ae(A,I,We.error,{flushSync:xe});return}else if(We.matches)le=We.matches,Q=yl(le,W);else{Ae(A,I,at(404,{pathname:W}),{flushSync:xe});return}}re.set(A,me);let Be=_e,$e=(await Kt("loader",R,ke,[Q],le,A))[Q.route.id];if(Ka($e)&&($e=await $c($e,ke.signal,!0)||$e),re.get(A)===me&&re.delete(A),!ke.signal.aborted){if(ye.has(A)){ve(A,Qa(void 0));return}if(Ti($e))if(D>Be){ve(A,Qa(void 0));return}else{B.add(A),await bn(ke,$e,!1,{preventScrollReset:fe});return}if(mt($e)){Ae(A,I,$e.error);return}Ne(!Ka($e),"Unhandled fetcher deferred data"),ve(A,Qa($e.data))}}async function bn(A,I,W,Q){let{submission:le,fetcherSubmission:Se,preventScrollReset:xe,replace:fe}=Q===void 0?{}:Q;I.response.headers.has("X-Remix-Revalidate")&&(J=!0);let oe=I.response.headers.get("Location");Ne(oe,"Expected a Location header on the redirect Response"),oe=Em(oe,new URL(A.url),g,a.history);let se=Sl(R.location,oe,{_isRedirect:!0});if(l){let We=!1;if(I.response.headers.has("X-Remix-Reload-Document"))We=!0;else if(Jc.test(oe)){const on=a.history.createURL(oe);We=on.origin!==r.location.origin||ya(on.pathname,g)==null}if(We){fe?r.location.replace(oe):r.location.assign(oe);return}}ue=null;let me=fe===!0||I.response.headers.has("X-Remix-Replace")?Mn.Replace:Mn.Push,{formMethod:ke,formAction:Be,formEncType:_n}=R.navigation;!le&&!Se&&ke&&Be&&_n&&(le=km(R.navigation));let $e=le||Se;if(hz.has(I.response.status)&&$e&&Pt($e.formMethod))await Yn(me,se,{submission:yn({},$e,{formAction:oe}),preventScrollReset:xe||pe,enableViewTransition:W?ae:void 0});else{let We=vc(se,le);await Yn(me,se,{overrideNavigation:We,fetcherSubmission:Se,preventScrollReset:xe||pe,enableViewTransition:W?ae:void 0})}}async function Kt(A,I,W,Q,le,Se){let xe,fe={};try{xe=await Ez(p,A,I,W,Q,le,Se,d,c)}catch(oe){return Q.forEach(se=>{fe[se.route.id]={type:tn.error,error:oe}}),fe}for(let[oe,se]of Object.entries(xe))if(Rz(se)){let me=se.result;fe[oe]={type:tn.redirect,response:Tz(me,W,oe,le,g,b.v7_relativeSplatPath)}}else fe[oe]=await xz(se);return fe}async function Z(A,I,W,Q,le){let Se=A.matches,xe=Kt("loader",A,le,W,I,null),fe=Promise.all(Q.map(async me=>{if(me.matches&&me.match&&me.controller){let Be=(await Kt("loader",A,dr(a.history,me.path,me.controller.signal),[me.match],me.matches,me.key))[me.match.route.id];return{[me.key]:Be}}else return Promise.resolve({[me.key]:{type:tn.error,error:at(404,{pathname:me.path})}})})),oe=await xe,se=(await fe).reduce((me,ke)=>Object.assign(me,ke),{});return await Promise.all([Mz(I,oe,le.signal,Se,A.loaderData),_z(I,se,Q)]),{loaderResults:oe,fetcherResults:se}}function te(){J=!0,C.push(...Ea()),E.forEach((A,I)=>{re.has(I)&&K.add(I),mn(I)})}function ve(A,I,W){W===void 0&&(W={}),R.fetchers.set(A,I),Dn({fetchers:new Map(R.fetchers)},{flushSync:(W&&W.flushSync)===!0})}function Ae(A,I,W,Q){Q===void 0&&(Q={});let le=xi(R.matches,I);Ln(A),Dn({errors:{[le.route.id]:W},fetchers:new Map(R.fetchers)},{flushSync:(Q&&Q.flushSync)===!0})}function Ve(A){return ie.set(A,(ie.get(A)||0)+1),ye.has(A)&&ye.delete(A),R.fetchers.get(A)||mz}function Ln(A){let I=R.fetchers.get(A);re.has(A)&&!(I&&I.state==="loading"&&T.has(A))&&mn(A),E.delete(A),T.delete(A),B.delete(A),b.v7_fetcherPersist&&ye.delete(A),K.delete(A),R.fetchers.delete(A)}function Ct(A){let I=(ie.get(A)||0)-1;I<=0?(ie.delete(A),ye.add(A),b.v7_fetcherPersist||Ln(A)):ie.set(A,I),Dn({fetchers:new Map(R.fetchers)})}function mn(A){let I=re.get(A);I&&(I.abort(),re.delete(A))}function zn(A){for(let I of A){let W=Ve(I),Q=Qa(W.data);R.fetchers.set(I,Q)}}function Nn(){let A=[],I=!1;for(let W of B){let Q=R.fetchers.get(W);Ne(Q,"Expected fetcher: "+W),Q.state==="loading"&&(B.delete(W),A.push(W),I=!0)}return zn(A),I}function Fe(A){let I=[];for(let[W,Q]of T)if(Q<A){let le=R.fetchers.get(W);Ne(le,"Expected fetcher: "+W),le.state==="loading"&&(mn(W),T.delete(W),I.push(W))}return zn(I),I.length>0}function Bt(A,I){let W=R.blockers.get(A)||cl;return Ie.get(A)!==I&&Ie.set(A,I),W}function Gn(A){R.blockers.delete(A),Ie.delete(A)}function Mi(A,I){let W=R.blockers.get(A)||cl;Ne(W.state==="unblocked"&&I.state==="blocked"||W.state==="blocked"&&I.state==="blocked"||W.state==="blocked"&&I.state==="proceeding"||W.state==="blocked"&&I.state==="unblocked"||W.state==="proceeding"&&I.state==="unblocked","Invalid blocker state transition: "+W.state+" -> "+I.state);let Q=new Map(R.blockers);Q.set(A,I),Dn({blockers:Q})}function ni(A){let{currentLocation:I,nextLocation:W,historyAction:Q}=A;if(Ie.size===0)return;Ie.size>1&&Ai(!1,"A router only supports one blocker at a time");let le=Array.from(Ie.entries()),[Se,xe]=le[le.length-1],fe=R.blockers.get(Se);if(!(fe&&fe.state==="proceeding")&&xe({currentLocation:I,nextLocation:W,historyAction:Q}))return Se}function Sa(A){let I=at(404,{pathname:A}),W=h||f,{matches:Q,route:le}=wm(W);return Ea(),{notFoundMatches:Q,route:le,error:I}}function Ea(A){let I=[];return ge.forEach((W,Q)=>{(!A||A(Q))&&(W.cancel(),I.push(Q),ge.delete(Q))}),I}function Ft(A,I,W){if(L=A,H=I,N=W||null,!P&&R.navigation===zc){P=!0;let Q=kl(R.location,R.matches);Q!=null&&Dn({restoreScrollPosition:Q})}return()=>{L=null,H=null,N=null}}function ti(A,I){return N&&N(A,I.map(Q=>V1(Q,R.loaderData)))||A.key}function ai(A,I){if(L&&H){let W=ti(A,I);L[W]=H()}}function kl(A,I){if(L){let W=ti(A,I),Q=L[W];if(typeof Q=="number")return Q}return null}function ii(A,I,W){if(y)if(A){if(Object.keys(A[0].params).length>0)return{active:!0,matches:Zs(I,W,g,!0)}}else return{active:!0,matches:Zs(I,W,g,!0)||[]};return{active:!1,matches:null}}async function Da(A,I,W,Q){if(!y)return{type:"success",matches:A};let le=A;for(;;){let Se=h==null,xe=h||f,fe=d;try{await y({signal:W,path:I,matches:le,fetcherKey:Q,patch:(me,ke)=>{W.aborted||Sm(me,ke,xe,fe,c)}})}catch(me){return{type:"error",error:me,partialMatches:le}}finally{Se&&!W.aborted&&(f=[...f])}if(W.aborted)return{type:"aborted"};let oe=Di(xe,I,g);if(oe)return{type:"success",matches:oe};let se=Zs(xe,I,g,!0);if(!se||le.length===se.length&&le.every((me,ke)=>me.route.id===se[ke].route.id))return{type:"success",matches:null};le=se}}function ri(A){d={},h=qs(A,c,void 0,d)}function ao(A,I){let W=h==null;Sm(A,I,h||f,d,c),W&&(f=[...f],Dn({}))}return X={get basename(){return g},get future(){return b},get state(){return R},get routes(){return f},get window(){return r},initialize:Ke,subscribe:Mt,enableScrollRestoration:Ft,navigate:yt,fetch:ei,revalidate:za,createHref:A=>a.history.createHref(A),encodeLocation:A=>a.history.encodeLocation(A),getFetcher:Ve,deleteFetcher:Ct,dispose:qn,getBlocker:Bt,deleteBlocker:Gn,patchRoutes:ao,_internalFetchControllers:re,_internalActiveDeferreds:ge,_internalSetRoutes:ri},X}function bz(a){return a!=null&&("formData"in a&&a.formData!=null||"body"in a&&a.body!==void 0)}function Oc(a,r,l,s,c,d,f,h){let g,p;if(f){g=[];for(let b of r)if(g.push(b),b.route.id===f){p=b;break}}else g=r,p=r[r.length-1];let y=Fc(c||".",Kc(g,d),ya(a.pathname,l)||a.pathname,h==="path");if(c==null&&(y.search=a.search,y.hash=a.hash),(c==null||c===""||c===".")&&p){let b=ed(y.search);if(p.route.index&&!b)y.search=y.search?y.search.replace(/^\?/,"?index&"):"?index";else if(!p.route.index&&b){let S=new URLSearchParams(y.search),v=S.getAll("index");S.delete("index"),v.filter(N=>N).forEach(N=>S.append("index",N));let L=S.toString();y.search=L?"?"+L:""}}return s&&l!=="/"&&(y.pathname=y.pathname==="/"?l:ga([l,y.pathname])),wi(y)}function ym(a,r,l,s){if(!s||!bz(s))return{path:l};if(s.formMethod&&!Iz(s.formMethod))return{path:l,error:at(405,{method:s.formMethod})};let c=()=>({path:l,error:at(400,{type:"invalid-body"})}),d=s.formMethod||"get",f=a?d.toUpperCase():d.toLowerCase(),h=Ig(l);if(s.body!==void 0){if(s.formEncType==="text/plain"){if(!Pt(f))return c();let S=typeof s.body=="string"?s.body:s.body instanceof FormData||s.body instanceof URLSearchParams?Array.from(s.body.entries()).reduce((v,L)=>{let[N,H]=L;return""+v+N+"="+H+`
`},""):String(s.body);return{path:l,submission:{formMethod:f,formAction:h,formEncType:s.formEncType,formData:void 0,json:void 0,text:S}}}else if(s.formEncType==="application/json"){if(!Pt(f))return c();try{let S=typeof s.body=="string"?JSON.parse(s.body):s.body;return{path:l,submission:{formMethod:f,formAction:h,formEncType:s.formEncType,formData:void 0,json:S,text:void 0}}}catch{return c()}}}Ne(typeof FormData=="function","FormData is not available in this environment");let g,p;if(s.formData)g=Wc(s.formData),p=s.formData;else if(s.body instanceof FormData)g=Wc(s.body),p=s.body;else if(s.body instanceof URLSearchParams)g=s.body,p=Dm(g);else if(s.body==null)g=new URLSearchParams,p=new FormData;else try{g=new URLSearchParams(s.body),p=Dm(g)}catch{return c()}let y={formMethod:f,formAction:h,formEncType:s&&s.formEncType||"application/x-www-form-urlencoded",formData:p,json:void 0,text:void 0};if(Pt(y.formMethod))return{path:l,submission:y};let b=Fa(l);return r&&b.search&&ed(b.search)&&g.append("index",""),b.search="?"+g,{path:wi(b),submission:y}}function bm(a,r,l){l===void 0&&(l=!1);let s=a.findIndex(c=>c.route.id===r);return s>=0?a.slice(0,l?s+1:s):a}function zm(a,r,l,s,c,d,f,h,g,p,y,b,S,v,L,N){let H=N?mt(N[1])?N[1].error:N[1].data:void 0,P=a.createURL(r.location),G=a.createURL(c),q=l;d&&r.errors?q=bm(l,Object.keys(r.errors)[0],!0):N&&mt(N[1])&&(q=bm(l,N[0]));let ce=N?N[1].statusCode:void 0,be=f&&ce&&ce>=400,X=q.filter((ne,pe)=>{let{route:ue}=ne;if(ue.lazy)return!0;if(ue.loader==null)return!1;if(d)return Nc(ue,r.loaderData,r.errors);if(zz(r.loaderData,r.matches[pe],ne)||g.some(Te=>Te===ne.route.id))return!0;let ae=r.matches[pe],ee=ne;return vm(ne,yn({currentUrl:P,currentParams:ae.params,nextUrl:G,nextParams:ee.params},s,{actionResult:H,actionStatus:ce,defaultShouldRevalidate:be?!1:h||P.pathname+P.search===G.pathname+G.search||P.search!==G.search||Rg(ae,ee)}))}),R=[];return b.forEach((ne,pe)=>{if(d||!l.some(de=>de.route.id===ne.routeId)||y.has(pe))return;let ue=Di(v,ne.path,L);if(!ue){R.push({key:pe,routeId:ne.routeId,path:ne.path,matches:null,match:null,controller:null});return}let ae=r.fetchers.get(pe),ee=yl(ue,ne.path),Te=!1;S.has(pe)?Te=!1:p.has(pe)?(p.delete(pe),Te=!0):ae&&ae.state!=="idle"&&ae.data===void 0?Te=h:Te=vm(ee,yn({currentUrl:P,currentParams:r.matches[r.matches.length-1].params,nextUrl:G,nextParams:l[l.length-1].params},s,{actionResult:H,actionStatus:ce,defaultShouldRevalidate:be?!1:h})),Te&&R.push({key:pe,routeId:ne.routeId,path:ne.path,matches:ue,match:ee,controller:new AbortController})}),[X,R]}function Nc(a,r,l){if(a.lazy)return!0;if(!a.loader)return!1;let s=r!=null&&r[a.id]!==void 0,c=l!=null&&l[a.id]!==void 0;return!s&&c?!1:typeof a.loader=="function"&&a.loader.hydrate===!0?!0:!s&&!c}function zz(a,r,l){let s=!r||l.route.id!==r.route.id,c=a[l.route.id]===void 0;return s||c}function Rg(a,r){let l=a.route.path;return a.pathname!==r.pathname||l!=null&&l.endsWith("*")&&a.params["*"]!==r.params["*"]}function vm(a,r){if(a.route.shouldRevalidate){let l=a.route.shouldRevalidate(r);if(typeof l=="boolean")return l}return r.defaultShouldRevalidate}function Sm(a,r,l,s,c){var d;let f;if(a){let p=s[a];Ne(p,"No route found to patch children into: routeId = "+a),p.children||(p.children=[]),f=p.children}else f=l;let h=r.filter(p=>!f.some(y=>kg(p,y))),g=qs(h,c,[a||"_","patch",String(((d=f)==null?void 0:d.length)||"0")],s);f.push(...g)}function kg(a,r){return"id"in a&&"id"in r&&a.id===r.id?!0:a.index===r.index&&a.path===r.path&&a.caseSensitive===r.caseSensitive?(!a.children||a.children.length===0)&&(!r.children||r.children.length===0)?!0:a.children.every((l,s)=>{var c;return(c=r.children)==null?void 0:c.some(d=>kg(l,d))}):!1}async function vz(a,r,l){if(!a.lazy)return;let s=await a.lazy();if(!a.lazy)return;let c=l[a.id];Ne(c,"No route found in manifest");let d={};for(let f in s){let g=c[f]!==void 0&&f!=="hasErrorBoundary";Ai(!g,'Route "'+c.id+'" has a static property "'+f+'" defined but its lazy function is also returning a value for this property. '+('The lazy route property "'+f+'" will be ignored.')),!g&&!H1.has(f)&&(d[f]=s[f])}Object.assign(c,d),Object.assign(c,yn({},r(c),{lazy:void 0}))}async function Sz(a){let{matches:r}=a,l=r.filter(c=>c.shouldLoad);return(await Promise.all(l.map(c=>c.resolve()))).reduce((c,d,f)=>Object.assign(c,{[l[f].route.id]:d}),{})}async function Ez(a,r,l,s,c,d,f,h,g,p){let y=d.map(v=>v.route.lazy?vz(v.route,g,h):void 0),b=d.map((v,L)=>{let N=y[L],H=c.some(G=>G.route.id===v.route.id);return yn({},v,{shouldLoad:H,resolve:async G=>(G&&s.method==="GET"&&(v.route.lazy||v.route.loader)&&(H=!0),H?Dz(r,s,v,N,G,p):Promise.resolve({type:tn.data,result:void 0}))})}),S=await a({matches:b,request:s,params:d[0].params,fetcherKey:f,context:p});try{await Promise.all(y)}catch{}return S}async function Dz(a,r,l,s,c,d){let f,h,g=p=>{let y,b=new Promise((L,N)=>y=N);h=()=>y(),r.signal.addEventListener("abort",h);let S=L=>typeof p!="function"?Promise.reject(new Error("You cannot call the handler for a route which defines a boolean "+('"'+a+'" [routeId: '+l.route.id+"]"))):p({request:r,params:l.params,context:d},...L!==void 0?[L]:[]),v=(async()=>{try{return{type:"data",result:await(c?c(N=>S(N)):S())}}catch(L){return{type:"error",result:L}}})();return Promise.race([v,b])};try{let p=l.route[a];if(s)if(p){let y,[b]=await Promise.all([g(p).catch(S=>{y=S}),s]);if(y!==void 0)throw y;f=b}else if(await s,p=l.route[a],p)f=await g(p);else if(a==="action"){let y=new URL(r.url),b=y.pathname+y.search;throw at(405,{method:r.method,pathname:b,routeId:l.route.id})}else return{type:tn.data,result:void 0};else if(p)f=await g(p);else{let y=new URL(r.url),b=y.pathname+y.search;throw at(404,{pathname:b})}Ne(f.result!==void 0,"You defined "+(a==="action"?"an action":"a loader")+" for route "+('"'+l.route.id+"\" but didn't return anything from your `"+a+"` ")+"function. Please return a value or `null`.")}catch(p){return{type:tn.error,result:p}}finally{h&&r.signal.removeEventListener("abort",h)}return f}async function xz(a){let{result:r,type:l}=a;if(Mg(r)){let b;try{let S=r.headers.get("Content-Type");S&&/\bapplication\/json\b/.test(S)?r.body==null?b=null:b=await r.json():b=await r.text()}catch(S){return{type:tn.error,error:S}}return l===tn.error?{type:tn.error,error:new Gs(r.status,r.statusText,b),statusCode:r.status,headers:r.headers}:{type:tn.data,data:b,statusCode:r.status,headers:r.headers}}if(l===tn.error){if(Rm(r)){var s,c;if(r.data instanceof Error){var d,f;return{type:tn.error,error:r.data,statusCode:(d=r.init)==null?void 0:d.status,headers:(f=r.init)!=null&&f.headers?new Headers(r.init.headers):void 0}}return{type:tn.error,error:new Gs(((s=r.init)==null?void 0:s.status)||500,void 0,r.data),statusCode:El(r)?r.status:void 0,headers:(c=r.init)!=null&&c.headers?new Headers(r.init.headers):void 0}}return{type:tn.error,error:r,statusCode:El(r)?r.status:void 0}}if(kz(r)){var h,g;return{type:tn.deferred,deferredData:r,statusCode:(h=r.init)==null?void 0:h.status,headers:((g=r.init)==null?void 0:g.headers)&&new Headers(r.init.headers)}}if(Rm(r)){var p,y;return{type:tn.data,data:r.data,statusCode:(p=r.init)==null?void 0:p.status,headers:(y=r.init)!=null&&y.headers?new Headers(r.init.headers):void 0}}return{type:tn.data,data:r}}function Tz(a,r,l,s,c,d){let f=a.headers.get("Location");if(Ne(f,"Redirects returned/thrown from loaders/actions must have a Location header"),!Jc.test(f)){let h=s.slice(0,s.findIndex(g=>g.route.id===l)+1);f=Oc(new URL(r.url),h,c,!0,f,d),a.headers.set("Location",f)}return a}function Em(a,r,l,s){let c=["about:","blob:","chrome:","chrome-untrusted:","content:","data:","devtools:","file:","filesystem:","javascript:"];if(Jc.test(a)){let d=a,f=d.startsWith("//")?new URL(r.protocol+d):new URL(d);if(c.includes(f.protocol))throw new Error("Invalid redirect location");let h=ya(f.pathname,l)!=null;if(f.origin===r.origin&&h)return f.pathname+f.search+f.hash}try{let d=s.createURL(a);if(c.includes(d.protocol))throw new Error("Invalid redirect location")}catch{}return a}function dr(a,r,l,s){let c=a.createURL(Ig(r)).toString(),d={signal:l};if(s&&Pt(s.formMethod)){let{formMethod:f,formEncType:h}=s;d.method=f.toUpperCase(),h==="application/json"?(d.headers=new Headers({"Content-Type":h}),d.body=JSON.stringify(s.json)):h==="text/plain"?d.body=s.text:h==="application/x-www-form-urlencoded"&&s.formData?d.body=Wc(s.formData):d.body=s.formData}return new Request(c,d)}function Wc(a){let r=new URLSearchParams;for(let[l,s]of a.entries())r.append(l,typeof s=="string"?s:s.name);return r}function Dm(a){let r=new FormData;for(let[l,s]of a.entries())r.append(l,s);return r}function Az(a,r,l,s,c){let d={},f=null,h,g=!1,p={},y=l&&mt(l[1])?l[1].error:void 0;return a.forEach(b=>{if(!(b.route.id in r))return;let S=b.route.id,v=r[S];if(Ne(!Ti(v),"Cannot handle redirect results in processLoaderData"),mt(v)){let L=v.error;y!==void 0&&(L=y,y=void 0),f=f||{};{let N=xi(a,S);f[N.route.id]==null&&(f[N.route.id]=L)}d[S]=void 0,g||(g=!0,h=El(v.error)?v.error.status:500),v.headers&&(p[S]=v.headers)}else Ka(v)?(s.set(S,v.deferredData),d[S]=v.deferredData.data,v.statusCode!=null&&v.statusCode!==200&&!g&&(h=v.statusCode),v.headers&&(p[S]=v.headers)):(d[S]=v.data,v.statusCode&&v.statusCode!==200&&!g&&(h=v.statusCode),v.headers&&(p[S]=v.headers))}),y!==void 0&&l&&(f={[l[0]]:y},d[l[0]]=void 0),{loaderData:d,errors:f,statusCode:h||200,loaderHeaders:p}}function xm(a,r,l,s,c,d,f){let{loaderData:h,errors:g}=Az(r,l,s,f);return c.forEach(p=>{let{key:y,match:b,controller:S}=p,v=d[y];if(Ne(v,"Did not find corresponding fetcher result"),!(S&&S.signal.aborted))if(mt(v)){let L=xi(a.matches,b?.route.id);g&&g[L.route.id]||(g=yn({},g,{[L.route.id]:v.error})),a.fetchers.delete(y)}else if(Ti(v))Ne(!1,"Unhandled fetcher revalidation redirect");else if(Ka(v))Ne(!1,"Unhandled fetcher deferred data");else{let L=Qa(v.data);a.fetchers.set(y,L)}}),{loaderData:h,errors:g}}function Tm(a,r,l,s){let c=yn({},r);for(let d of l){let f=d.route.id;if(r.hasOwnProperty(f)?r[f]!==void 0&&(c[f]=r[f]):a[f]!==void 0&&d.route.loader&&(c[f]=a[f]),s&&s.hasOwnProperty(f))break}return c}function Am(a){return a?mt(a[1])?{actionData:{}}:{actionData:{[a[0]]:a[1].data}}:{}}function xi(a,r){return(r?a.slice(0,a.findIndex(s=>s.route.id===r)+1):[...a]).reverse().find(s=>s.route.hasErrorBoundary===!0)||a[0]}function wm(a){let r=a.length===1?a[0]:a.find(l=>l.index||!l.path||l.path==="/")||{id:"__shim-error-route__"};return{matches:[{params:{},pathname:"",pathnameBase:"",route:r}],route:r}}function at(a,r){let{pathname:l,routeId:s,method:c,type:d,message:f}=r===void 0?{}:r,h="Unknown Server Error",g="Unknown @remix-run/router error";return a===400?(h="Bad Request",c&&l&&s?g="You made a "+c+' request to "'+l+'" but '+('did not provide a `loader` for route "'+s+'", ')+"so there is no way to handle the request.":d==="defer-action"?g="defer() is not supported in actions":d==="invalid-body"&&(g="Unable to encode submission body")):a===403?(h="Forbidden",g='Route "'+s+'" does not match URL "'+l+'"'):a===404?(h="Not Found",g='No route matches URL "'+l+'"'):a===405&&(h="Method Not Allowed",c&&l&&s?g="You made a "+c.toUpperCase()+' request to "'+l+'" but '+('did not provide an `action` for route "'+s+'", ')+"so there is no way to handle the request.":c&&(g='Invalid request method "'+c.toUpperCase()+'"')),new Gs(a||500,h,new Error(g),!0)}function Bs(a){let r=Object.entries(a);for(let l=r.length-1;l>=0;l--){let[s,c]=r[l];if(Ti(c))return{key:s,result:c}}}function Ig(a){let r=typeof a=="string"?Fa(a):a;return wi(yn({},r,{hash:""}))}function wz(a,r){return a.pathname!==r.pathname||a.search!==r.search?!1:a.hash===""?r.hash!=="":a.hash===r.hash?!0:r.hash!==""}function Rz(a){return Mg(a.result)&&pz.has(a.result.status)}function Ka(a){return a.type===tn.deferred}function mt(a){return a.type===tn.error}function Ti(a){return(a&&a.type)===tn.redirect}function Rm(a){return typeof a=="object"&&a!=null&&"type"in a&&"data"in a&&"init"in a&&a.type==="DataWithResponseInit"}function kz(a){let r=a;return r&&typeof r=="object"&&typeof r.data=="object"&&typeof r.subscribe=="function"&&typeof r.cancel=="function"&&typeof r.resolveData=="function"}function Mg(a){return a!=null&&typeof a.status=="number"&&typeof a.statusText=="string"&&typeof a.headers=="object"&&typeof a.body<"u"}function Iz(a){return fz.has(a.toLowerCase())}function Pt(a){return cz.has(a.toLowerCase())}async function Mz(a,r,l,s,c){let d=Object.entries(r);for(let f=0;f<d.length;f++){let[h,g]=d[f],p=a.find(S=>S?.route.id===h);if(!p)continue;let y=s.find(S=>S.route.id===p.route.id),b=y!=null&&!Rg(y,p)&&(c&&c[p.route.id])!==void 0;Ka(g)&&b&&await $c(g,l,!1).then(S=>{S&&(r[h]=S)})}}async function _z(a,r,l){for(let s=0;s<l.length;s++){let{key:c,routeId:d,controller:f}=l[s],h=r[c];a.find(p=>p?.route.id===d)&&Ka(h)&&(Ne(f,"Expected an AbortController for revalidating fetcher deferred result"),await $c(h,f.signal,!0).then(p=>{p&&(r[c]=p)}))}}async function $c(a,r,l){if(l===void 0&&(l=!1),!await a.deferredData.resolveData(r)){if(l)try{return{type:tn.data,data:a.deferredData.unwrappedData}}catch(c){return{type:tn.error,error:c}}return{type:tn.data,data:a.deferredData.data}}}function ed(a){return new URLSearchParams(a).getAll("index").some(r=>r==="")}function yl(a,r){let l=typeof r=="string"?Fa(r).search:r.search;if(a[a.length-1].route.index&&ed(l||""))return a[a.length-1];let s=Tg(a);return s[s.length-1]}function km(a){let{formMethod:r,formAction:l,formEncType:s,text:c,formData:d,json:f}=a;if(!(!r||!l||!s)){if(c!=null)return{formMethod:r,formAction:l,formEncType:s,formData:void 0,json:void 0,text:c};if(d!=null)return{formMethod:r,formAction:l,formEncType:s,formData:d,json:void 0,text:void 0};if(f!==void 0)return{formMethod:r,formAction:l,formEncType:s,formData:void 0,json:f,text:void 0}}}function vc(a,r){return r?{state:"loading",location:a,formMethod:r.formMethod,formAction:r.formAction,formEncType:r.formEncType,formData:r.formData,json:r.json,text:r.text}:{state:"loading",location:a,formMethod:void 0,formAction:void 0,formEncType:void 0,formData:void 0,json:void 0,text:void 0}}function Cz(a,r){return{state:"submitting",location:a,formMethod:r.formMethod,formAction:r.formAction,formEncType:r.formEncType,formData:r.formData,json:r.json,text:r.text}}function dl(a,r){return a?{state:"loading",formMethod:a.formMethod,formAction:a.formAction,formEncType:a.formEncType,formData:a.formData,json:a.json,text:a.text,data:r}:{state:"loading",formMethod:void 0,formAction:void 0,formEncType:void 0,formData:void 0,json:void 0,text:void 0,data:r}}function Lz(a,r){return{state:"submitting",formMethod:a.formMethod,formAction:a.formAction,formEncType:a.formEncType,formData:a.formData,json:a.json,text:a.text,data:r?r.data:void 0}}function Qa(a){return{state:"idle",formMethod:void 0,formAction:void 0,formEncType:void 0,formData:void 0,json:void 0,text:void 0,data:a}}function Oz(a,r){try{let l=a.sessionStorage.getItem(wg);if(l){let s=JSON.parse(l);for(let[c,d]of Object.entries(s||{}))d&&Array.isArray(d)&&r.set(c,new Set(d||[]))}}catch{}}function Nz(a,r){if(r.size>0){let l={};for(let[s,c]of r)l[s]=[...c];try{a.sessionStorage.setItem(wg,JSON.stringify(l))}catch(s){Ai(!1,"Failed to save applied view transitions in sessionStorage ("+s+").")}}}function Qs(){return Qs=Object.assign?Object.assign.bind():function(a){for(var r=1;r<arguments.length;r++){var l=arguments[r];for(var s in l)Object.prototype.hasOwnProperty.call(l,s)&&(a[s]=l[s])}return a},Qs.apply(this,arguments)}const xl=F.createContext(null),nd=F.createContext(null),Ja=F.createContext(null),td=F.createContext(null),ba=F.createContext({outlet:null,matches:[],isDataRoute:!1}),_g=F.createContext(null);function Wz(a,r){let{relative:l}=r===void 0?{}:r;Tl()||Ne(!1);let{basename:s,navigator:c}=F.useContext(Ja),{hash:d,pathname:f,search:h}=$s(a,{relative:l}),g=f;return s!=="/"&&(g=f==="/"?s:ga([s,f])),c.createHref({pathname:g,search:h,hash:d})}function Tl(){return F.useContext(td)!=null}function Al(){return Tl()||Ne(!1),F.useContext(td).location}function Cg(a){F.useContext(Ja).static||F.useLayoutEffect(a)}function Uz(){let{isDataRoute:a}=F.useContext(ba);return a?$z():Pz()}function Pz(){Tl()||Ne(!1);let a=F.useContext(xl),{basename:r,future:l,navigator:s}=F.useContext(Ja),{matches:c}=F.useContext(ba),{pathname:d}=Al(),f=JSON.stringify(Kc(c,l.v7_relativeSplatPath)),h=F.useRef(!1);return Cg(()=>{h.current=!0}),F.useCallback(function(p,y){if(y===void 0&&(y={}),!h.current)return;if(typeof p=="number"){s.go(p);return}let b=Fc(p,JSON.parse(f),d,y.relative==="path");a==null&&r!=="/"&&(b.pathname=b.pathname==="/"?r:ga([r,b.pathname])),(y.replace?s.replace:s.push)(b,y.state,y)},[r,s,f,d,a])}const Bz=F.createContext(null);function jz(a){let r=F.useContext(ba).outlet;return r&&F.createElement(Bz.Provider,{value:a},r)}function Xz(){let{matches:a}=F.useContext(ba),r=a[a.length-1];return r?r.params:{}}function $s(a,r){let{relative:l}=r===void 0?{}:r,{future:s}=F.useContext(Ja),{matches:c}=F.useContext(ba),{pathname:d}=Al(),f=JSON.stringify(Kc(c,s.v7_relativeSplatPath));return F.useMemo(()=>Fc(a,JSON.parse(f),d,l==="path"),[a,f,d,l])}function Hz(a,r,l,s){Tl()||Ne(!1);let{navigator:c}=F.useContext(Ja),{matches:d}=F.useContext(ba),f=d[d.length-1],h=f?f.params:{};f&&f.pathname;let g=f?f.pathnameBase:"/";f&&f.route;let p=Al(),y;y=p;let b=y.pathname||"/",S=b;if(g!=="/"){let N=g.replace(/^\//,"").split("/");S="/"+b.replace(/^\//,"").split("/").slice(N.length).join("/")}let v=Di(a,{pathname:S});return Gz(v&&v.map(N=>Object.assign({},N,{params:Object.assign({},h,N.params),pathname:ga([g,c.encodeLocation?c.encodeLocation(N.pathname).pathname:N.pathname]),pathnameBase:N.pathnameBase==="/"?g:ga([g,c.encodeLocation?c.encodeLocation(N.pathnameBase).pathname:N.pathnameBase])})),d,l,s)}function Zz(){let a=Jz(),r=El(a)?a.status+" "+a.statusText:a instanceof Error?a.message:JSON.stringify(a),l=a instanceof Error?a.stack:null,c={padding:"0.5rem",backgroundColor:"rgba(200,200,200, 0.5)"};return F.createElement(F.Fragment,null,F.createElement("h2",null,"Unexpected Application Error!"),F.createElement("h3",{style:{fontStyle:"italic"}},r),l?F.createElement("pre",{style:c},l):null,null)}const Vz=F.createElement(Zz,null);class qz extends F.Component{constructor(r){super(r),this.state={location:r.location,revalidation:r.revalidation,error:r.error}}static getDerivedStateFromError(r){return{error:r}}static getDerivedStateFromProps(r,l){return l.location!==r.location||l.revalidation!=="idle"&&r.revalidation==="idle"?{error:r.error,location:r.location,revalidation:r.revalidation}:{error:r.error!==void 0?r.error:l.error,location:l.location,revalidation:r.revalidation||l.revalidation}}componentDidCatch(r,l){console.error("React Router caught the following error during render",r,l)}render(){return this.state.error!==void 0?F.createElement(ba.Provider,{value:this.props.routeContext},F.createElement(_g.Provider,{value:this.state.error,children:this.props.component})):this.props.children}}function Yz(a){let{routeContext:r,match:l,children:s}=a,c=F.useContext(xl);return c&&c.static&&c.staticContext&&(l.route.errorElement||l.route.ErrorBoundary)&&(c.staticContext._deepestRenderedBoundaryId=l.route.id),F.createElement(ba.Provider,{value:r},s)}function Gz(a,r,l,s){var c;if(r===void 0&&(r=[]),l===void 0&&(l=null),s===void 0&&(s=null),a==null){var d;if(!l)return null;if(l.errors)a=l.matches;else if((d=s)!=null&&d.v7_partialHydration&&r.length===0&&!l.initialized&&l.matches.length>0)a=l.matches;else return null}let f=a,h=(c=l)==null?void 0:c.errors;if(h!=null){let y=f.findIndex(b=>b.route.id&&h?.[b.route.id]!==void 0);y>=0||Ne(!1),f=f.slice(0,Math.min(f.length,y+1))}let g=!1,p=-1;if(l&&s&&s.v7_partialHydration)for(let y=0;y<f.length;y++){let b=f[y];if((b.route.HydrateFallback||b.route.hydrateFallbackElement)&&(p=y),b.route.id){let{loaderData:S,errors:v}=l,L=b.route.loader&&S[b.route.id]===void 0&&(!v||v[b.route.id]===void 0);if(b.route.lazy||L){g=!0,p>=0?f=f.slice(0,p+1):f=[f[0]];break}}}return f.reduceRight((y,b,S)=>{let v,L=!1,N=null,H=null;l&&(v=h&&b.route.id?h[b.route.id]:void 0,N=b.route.errorElement||Vz,g&&(p<0&&S===0?(e0("route-fallback"),L=!0,H=null):p===S&&(L=!0,H=b.route.hydrateFallbackElement||null)));let P=r.concat(f.slice(0,S+1)),G=()=>{let q;return v?q=N:L?q=H:b.route.Component?q=F.createElement(b.route.Component,null):b.route.element?q=b.route.element:q=y,F.createElement(Yz,{match:b,routeContext:{outlet:y,matches:P,isDataRoute:l!=null},children:q})};return l&&(b.route.ErrorBoundary||b.route.errorElement||S===0)?F.createElement(qz,{location:l.location,revalidation:l.revalidation,component:N,error:v,children:G(),routeContext:{outlet:null,matches:P,isDataRoute:!0}}):G()},null)}var Lg=(function(a){return a.UseBlocker="useBlocker",a.UseRevalidator="useRevalidator",a.UseNavigateStable="useNavigate",a})(Lg||{}),Og=(function(a){return a.UseBlocker="useBlocker",a.UseLoaderData="useLoaderData",a.UseActionData="useActionData",a.UseRouteError="useRouteError",a.UseNavigation="useNavigation",a.UseRouteLoaderData="useRouteLoaderData",a.UseMatches="useMatches",a.UseRevalidator="useRevalidator",a.UseNavigateStable="useNavigate",a.UseRouteId="useRouteId",a})(Og||{});function Qz(a){let r=F.useContext(xl);return r||Ne(!1),r}function Kz(a){let r=F.useContext(nd);return r||Ne(!1),r}function Fz(a){let r=F.useContext(ba);return r||Ne(!1),r}function Ng(a){let r=Fz(),l=r.matches[r.matches.length-1];return l.route.id||Ne(!1),l.route.id}function Jz(){var a;let r=F.useContext(_g),l=Kz(),s=Ng();return r!==void 0?r:(a=l.errors)==null?void 0:a[s]}function $z(){let{router:a}=Qz(Lg.UseNavigateStable),r=Ng(Og.UseNavigateStable),l=F.useRef(!1);return Cg(()=>{l.current=!0}),F.useCallback(function(c,d){d===void 0&&(d={}),l.current&&(typeof c=="number"?a.navigate(c):a.navigate(c,Qs({fromRouteId:r},d)))},[a,r])}const Im={};function e0(a,r,l){Im[a]||(Im[a]=!0)}function n0(a,r){a?.v7_startTransition,a?.v7_relativeSplatPath===void 0&&(!r||r.v7_relativeSplatPath),r&&(r.v7_fetcherPersist,r.v7_normalizeFormMethod,r.v7_partialHydration,r.v7_skipActionErrorRevalidation)}function t0(a){return jz(a.context)}function a0(a){let{basename:r="/",children:l=null,location:s,navigationType:c=Mn.Pop,navigator:d,static:f=!1,future:h}=a;Tl()&&Ne(!1);let g=r.replace(/^\/*/,"/"),p=F.useMemo(()=>({basename:g,navigator:d,static:f,future:Qs({v7_relativeSplatPath:!1},h)}),[g,h,d,f]);typeof s=="string"&&(s=Fa(s));let{pathname:y="/",search:b="",hash:S="",state:v=null,key:L="default"}=s,N=F.useMemo(()=>{let H=ya(y,g);return H==null?null:{location:{pathname:H,search:b,hash:S,state:v,key:L},navigationType:c}},[g,y,b,S,v,L,c]);return N==null?null:F.createElement(Ja.Provider,{value:p},F.createElement(td.Provider,{children:l,value:N}))}new Promise(()=>{});function i0(a){let r={hasErrorBoundary:a.ErrorBoundary!=null||a.errorElement!=null};return a.Component&&Object.assign(r,{element:F.createElement(a.Component),Component:void 0}),a.HydrateFallback&&Object.assign(r,{hydrateFallbackElement:F.createElement(a.HydrateFallback),HydrateFallback:void 0}),a.ErrorBoundary&&Object.assign(r,{errorElement:F.createElement(a.ErrorBoundary),ErrorBoundary:void 0}),r}function gr(){return gr=Object.assign?Object.assign.bind():function(a){for(var r=1;r<arguments.length;r++){var l=arguments[r];for(var s in l)Object.prototype.hasOwnProperty.call(l,s)&&(a[s]=l[s])}return a},gr.apply(this,arguments)}function Wg(a,r){if(a==null)return{};var l={},s=Object.keys(a),c,d;for(d=0;d<s.length;d++)c=s[d],!(r.indexOf(c)>=0)&&(l[c]=a[c]);return l}function r0(a){return!!(a.metaKey||a.altKey||a.ctrlKey||a.shiftKey)}function l0(a,r){return a.button===0&&(!r||r==="_self")&&!r0(a)}const s0=["onClick","relative","reloadDocument","replace","state","target","to","preventScrollReset","viewTransition"],o0=["aria-current","caseSensitive","className","end","style","to","viewTransition","children"],u0="6";try{window.__reactRouterVersion=u0}catch{}function c0(a,r){return yz({basename:r?.basename,future:gr({},r?.future,{v7_prependBasename:!0}),history:B1({window:r?.window}),hydrationData:r?.hydrationData||d0(),routes:a,mapRouteProperties:i0,dataStrategy:r?.dataStrategy,patchRoutesOnNavigation:r?.patchRoutesOnNavigation,window:r?.window}).initialize()}function d0(){var a;let r=(a=window)==null?void 0:a.__staticRouterHydrationData;return r&&r.errors&&(r=gr({},r,{errors:f0(r.errors)})),r}function f0(a){if(!a)return null;let r=Object.entries(a),l={};for(let[s,c]of r)if(c&&c.__type==="RouteErrorResponse")l[s]=new Gs(c.status,c.statusText,c.data,c.internal===!0);else if(c&&c.__type==="Error"){if(c.__subType){let d=window[c.__subType];if(typeof d=="function")try{let f=new d(c.message);f.stack="",l[s]=f}catch{}}if(l[s]==null){let d=new Error(c.message);d.stack="",l[s]=d}}else l[s]=c;return l}const Ug=F.createContext({isTransitioning:!1}),p0=F.createContext(new Map),h0="startTransition",Mm=M1[h0],m0="flushSync",_m=P1[m0];function g0(a){Mm?Mm(a):a()}function fl(a){_m?_m(a):a()}class y0{constructor(){this.status="pending",this.promise=new Promise((r,l)=>{this.resolve=s=>{this.status==="pending"&&(this.status="resolved",r(s))},this.reject=s=>{this.status==="pending"&&(this.status="rejected",l(s))}})}}function b0(a){let{fallbackElement:r,router:l,future:s}=a,[c,d]=F.useState(l.state),[f,h]=F.useState(),[g,p]=F.useState({isTransitioning:!1}),[y,b]=F.useState(),[S,v]=F.useState(),[L,N]=F.useState(),H=F.useRef(new Map),{v7_startTransition:P}=s||{},G=F.useCallback(ne=>{P?g0(ne):ne()},[P]),q=F.useCallback((ne,pe)=>{let{deletedFetchers:ue,flushSync:ae,viewTransitionOpts:ee}=pe;ne.fetchers.forEach((de,J)=>{de.data!==void 0&&H.current.set(J,de.data)}),ue.forEach(de=>H.current.delete(de));let Te=l.window==null||l.window.document==null||typeof l.window.document.startViewTransition!="function";if(!ee||Te){ae?fl(()=>d(ne)):G(()=>d(ne));return}if(ae){fl(()=>{S&&(y&&y.resolve(),S.skipTransition()),p({isTransitioning:!0,flushSync:!0,currentLocation:ee.currentLocation,nextLocation:ee.nextLocation})});let de=l.window.document.startViewTransition(()=>{fl(()=>d(ne))});de.finished.finally(()=>{fl(()=>{b(void 0),v(void 0),h(void 0),p({isTransitioning:!1})})}),fl(()=>v(de));return}S?(y&&y.resolve(),S.skipTransition(),N({state:ne,currentLocation:ee.currentLocation,nextLocation:ee.nextLocation})):(h(ne),p({isTransitioning:!0,flushSync:!1,currentLocation:ee.currentLocation,nextLocation:ee.nextLocation}))},[l.window,S,y,H,G]);F.useLayoutEffect(()=>l.subscribe(q),[l,q]),F.useEffect(()=>{g.isTransitioning&&!g.flushSync&&b(new y0)},[g]),F.useEffect(()=>{if(y&&f&&l.window){let ne=f,pe=y.promise,ue=l.window.document.startViewTransition(async()=>{G(()=>d(ne)),await pe});ue.finished.finally(()=>{b(void 0),v(void 0),h(void 0),p({isTransitioning:!1})}),v(ue)}},[G,f,y,l.window]),F.useEffect(()=>{y&&f&&c.location.key===f.location.key&&y.resolve()},[y,S,c.location,f]),F.useEffect(()=>{!g.isTransitioning&&L&&(h(L.state),p({isTransitioning:!0,flushSync:!1,currentLocation:L.currentLocation,nextLocation:L.nextLocation}),N(void 0))},[g.isTransitioning,L]),F.useEffect(()=>{},[]);let ce=F.useMemo(()=>({createHref:l.createHref,encodeLocation:l.encodeLocation,go:ne=>l.navigate(ne),push:(ne,pe,ue)=>l.navigate(ne,{state:pe,preventScrollReset:ue?.preventScrollReset}),replace:(ne,pe,ue)=>l.navigate(ne,{replace:!0,state:pe,preventScrollReset:ue?.preventScrollReset})}),[l]),be=l.basename||"/",X=F.useMemo(()=>({router:l,navigator:ce,static:!1,basename:be}),[l,ce,be]),R=F.useMemo(()=>({v7_relativeSplatPath:l.future.v7_relativeSplatPath}),[l.future.v7_relativeSplatPath]);return F.useEffect(()=>n0(s,l.future),[s,l.future]),F.createElement(F.Fragment,null,F.createElement(xl.Provider,{value:X},F.createElement(nd.Provider,{value:c},F.createElement(p0.Provider,{value:H.current},F.createElement(Ug.Provider,{value:g},F.createElement(a0,{basename:be,location:c.location,navigationType:c.historyAction,navigator:ce,future:R},c.initialized||l.future.v7_partialHydration?F.createElement(z0,{routes:l.routes,future:l.future,state:c}):r))))),null)}const z0=F.memo(v0);function v0(a){let{routes:r,future:l,state:s}=a;return Hz(r,void 0,s,l)}const S0=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u",E0=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,Pg=F.forwardRef(function(r,l){let{onClick:s,relative:c,reloadDocument:d,replace:f,state:h,target:g,to:p,preventScrollReset:y,viewTransition:b}=r,S=Wg(r,s0),{basename:v}=F.useContext(Ja),L,N=!1;if(typeof p=="string"&&E0.test(p)&&(L=p,S0))try{let q=new URL(window.location.href),ce=p.startsWith("//")?new URL(q.protocol+p):new URL(p),be=ya(ce.pathname,v);ce.origin===q.origin&&be!=null?p=be+ce.search+ce.hash:N=!0}catch{}let H=Wz(p,{relative:c}),P=T0(p,{replace:f,state:h,target:g,preventScrollReset:y,relative:c,viewTransition:b});function G(q){s&&s(q),q.defaultPrevented||P(q)}return F.createElement("a",gr({},S,{href:L||H,onClick:N||d?s:G,ref:l,target:g}))}),D0=F.forwardRef(function(r,l){let{"aria-current":s="page",caseSensitive:c=!1,className:d="",end:f=!1,style:h,to:g,viewTransition:p,children:y}=r,b=Wg(r,o0),S=$s(g,{relative:b.relative}),v=Al(),L=F.useContext(nd),{navigator:N,basename:H}=F.useContext(Ja),P=L!=null&&A0(S)&&p===!0,G=N.encodeLocation?N.encodeLocation(S).pathname:S.pathname,q=v.pathname,ce=L&&L.navigation&&L.navigation.location?L.navigation.location.pathname:null;c||(q=q.toLowerCase(),ce=ce?ce.toLowerCase():null,G=G.toLowerCase()),ce&&H&&(ce=ya(ce,H)||ce);const be=G!=="/"&&G.endsWith("/")?G.length-1:G.length;let X=q===G||!f&&q.startsWith(G)&&q.charAt(be)==="/",R=ce!=null&&(ce===G||!f&&ce.startsWith(G)&&ce.charAt(G.length)==="/"),ne={isActive:X,isPending:R,isTransitioning:P},pe=X?s:void 0,ue;typeof d=="function"?ue=d(ne):ue=[d,X?"active":null,R?"pending":null,P?"transitioning":null].filter(Boolean).join(" ");let ae=typeof h=="function"?h(ne):h;return F.createElement(Pg,gr({},b,{"aria-current":pe,className:ue,ref:l,style:ae,to:g,viewTransition:p}),typeof y=="function"?y(ne):y)});var Uc;(function(a){a.UseScrollRestoration="useScrollRestoration",a.UseSubmit="useSubmit",a.UseSubmitFetcher="useSubmitFetcher",a.UseFetcher="useFetcher",a.useViewTransitionState="useViewTransitionState"})(Uc||(Uc={}));var Cm;(function(a){a.UseFetcher="useFetcher",a.UseFetchers="useFetchers",a.UseScrollRestoration="useScrollRestoration"})(Cm||(Cm={}));function x0(a){let r=F.useContext(xl);return r||Ne(!1),r}function T0(a,r){let{target:l,replace:s,state:c,preventScrollReset:d,relative:f,viewTransition:h}=r===void 0?{}:r,g=Uz(),p=Al(),y=$s(a,{relative:f});return F.useCallback(b=>{if(l0(b,l)){b.preventDefault();let S=s!==void 0?s:wi(p)===wi(y);g(a,{replace:S,state:c,preventScrollReset:d,relative:f,viewTransition:h})}},[p,g,y,s,c,l,a,d,f,h])}function A0(a,r){r===void 0&&(r={});let l=F.useContext(Ug);l==null&&Ne(!1);let{basename:s}=x0(Uc.useViewTransitionState),c=$s(a,{relative:r.relative});if(!l.isTransitioning)return!1;let d=ya(l.currentLocation.pathname,s)||l.currentLocation.pathname,f=ya(l.nextLocation.pathname,s)||l.nextLocation.pathname;return Ys(c.pathname,f)!=null||Ys(c.pathname,d)!=null}const w0=[{to:"/",label:"Home",end:!0},{to:"/api",label:"API"},{to:"/examples",label:"Examples"}];function R0(){return we.jsxs("div",{className:"page",children:[we.jsxs("header",{className:"hero",children:[we.jsx("p",{className:"eyebrow",children:"Wizzard Packages"}),we.jsx("h1",{children:"Docs UI"}),we.jsx("p",{className:"subtitle",children:"Interactive documentation site for @wizzard-packages/*."}),we.jsx("nav",{className:"nav",children:w0.map(a=>we.jsx(D0,{to:a.to,end:a.end,className:({isActive:r})=>`nav-link${r?" nav-link--active":""}`,children:a.label},a.to))})]}),we.jsx("main",{className:"content",children:we.jsx(t0,{})})]})}function k0(){return we.jsxs("section",{className:"card-grid",children:[we.jsxs("article",{className:"card",children:[we.jsx("h2",{children:"API Reference"}),we.jsx("p",{children:"Connect TypeDoc output and enable quick search."})]}),we.jsxs("article",{className:"card",children:[we.jsx("h2",{children:"Examples"}),we.jsx("p",{children:"Guided recipes for validation, persistence, and routing flows."})]}),we.jsxs("article",{className:"card",children:[we.jsx("h2",{children:"Status"}),we.jsx("p",{children:"Scaffold complete. Routing and layout are now live."})]})]})}function I0(a,r){const l={};return(a[a.length-1]===""?[...a,""]:a).join((l.padRight?" ":"")+","+(l.padLeft===!1?"":" ")).trim()}const M0=/^[$_\p{ID_Start}][$_\u{200C}\u{200D}\p{ID_Continue}]*$/u,_0=/^[$_\p{ID_Start}][-$_\u{200C}\u{200D}\p{ID_Continue}]*$/u,C0={};function Lm(a,r){return(C0.jsx?_0:M0).test(a)}const L0=/[ \t\n\f\r]/g;function O0(a){return typeof a=="object"?a.type==="text"?Om(a.value):!1:Om(a)}function Om(a){return a.replace(L0,"")===""}class wl{constructor(r,l,s){this.normal=l,this.property=r,s&&(this.space=s)}}wl.prototype.normal={};wl.prototype.property={};wl.prototype.space=void 0;function Bg(a,r){const l={},s={};for(const c of a)Object.assign(l,c.property),Object.assign(s,c.normal);return new wl(l,s,r)}function Pc(a){return a.toLowerCase()}class rt{constructor(r,l){this.attribute=l,this.property=r}}rt.prototype.attribute="";rt.prototype.booleanish=!1;rt.prototype.boolean=!1;rt.prototype.commaOrSpaceSeparated=!1;rt.prototype.commaSeparated=!1;rt.prototype.defined=!1;rt.prototype.mustUseProperty=!1;rt.prototype.number=!1;rt.prototype.overloadedBoolean=!1;rt.prototype.property="";rt.prototype.spaceSeparated=!1;rt.prototype.space=void 0;let N0=0;const Oe=Ri(),In=Ri(),Bc=Ri(),$=Ri(),un=Ri(),hr=Ri(),ht=Ri();function Ri(){return 2**++N0}const jc=Object.freeze(Object.defineProperty({__proto__:null,boolean:Oe,booleanish:In,commaOrSpaceSeparated:ht,commaSeparated:hr,number:$,overloadedBoolean:Bc,spaceSeparated:un},Symbol.toStringTag,{value:"Module"})),Sc=Object.keys(jc);class ad extends rt{constructor(r,l,s,c){let d=-1;if(super(r,l),Nm(this,"space",c),typeof s=="number")for(;++d<Sc.length;){const f=Sc[d];Nm(this,Sc[d],(s&jc[f])===jc[f])}}}ad.prototype.defined=!0;function Nm(a,r,l){l&&(a[r]=l)}function yr(a){const r={},l={};for(const[s,c]of Object.entries(a.properties)){const d=new ad(s,a.transform(a.attributes||{},s),c,a.space);a.mustUseProperty&&a.mustUseProperty.includes(s)&&(d.mustUseProperty=!0),r[s]=d,l[Pc(s)]=s,l[Pc(d.attribute)]=s}return new wl(r,l,a.space)}const jg=yr({properties:{ariaActiveDescendant:null,ariaAtomic:In,ariaAutoComplete:null,ariaBusy:In,ariaChecked:In,ariaColCount:$,ariaColIndex:$,ariaColSpan:$,ariaControls:un,ariaCurrent:null,ariaDescribedBy:un,ariaDetails:null,ariaDisabled:In,ariaDropEffect:un,ariaErrorMessage:null,ariaExpanded:In,ariaFlowTo:un,ariaGrabbed:In,ariaHasPopup:null,ariaHidden:In,ariaInvalid:null,ariaKeyShortcuts:null,ariaLabel:null,ariaLabelledBy:un,ariaLevel:$,ariaLive:null,ariaModal:In,ariaMultiLine:In,ariaMultiSelectable:In,ariaOrientation:null,ariaOwns:un,ariaPlaceholder:null,ariaPosInSet:$,ariaPressed:In,ariaReadOnly:In,ariaRelevant:null,ariaRequired:In,ariaRoleDescription:un,ariaRowCount:$,ariaRowIndex:$,ariaRowSpan:$,ariaSelected:In,ariaSetSize:$,ariaSort:null,ariaValueMax:$,ariaValueMin:$,ariaValueNow:$,ariaValueText:null,role:null},transform(a,r){return r==="role"?r:"aria-"+r.slice(4).toLowerCase()}});function Xg(a,r){return r in a?a[r]:r}function Hg(a,r){return Xg(a,r.toLowerCase())}const W0=yr({attributes:{acceptcharset:"accept-charset",classname:"class",htmlfor:"for",httpequiv:"http-equiv"},mustUseProperty:["checked","multiple","muted","selected"],properties:{abbr:null,accept:hr,acceptCharset:un,accessKey:un,action:null,allow:null,allowFullScreen:Oe,allowPaymentRequest:Oe,allowUserMedia:Oe,alt:null,as:null,async:Oe,autoCapitalize:null,autoComplete:un,autoFocus:Oe,autoPlay:Oe,blocking:un,capture:null,charSet:null,checked:Oe,cite:null,className:un,cols:$,colSpan:null,content:null,contentEditable:In,controls:Oe,controlsList:un,coords:$|hr,crossOrigin:null,data:null,dateTime:null,decoding:null,default:Oe,defer:Oe,dir:null,dirName:null,disabled:Oe,download:Bc,draggable:In,encType:null,enterKeyHint:null,fetchPriority:null,form:null,formAction:null,formEncType:null,formMethod:null,formNoValidate:Oe,formTarget:null,headers:un,height:$,hidden:Bc,high:$,href:null,hrefLang:null,htmlFor:un,httpEquiv:un,id:null,imageSizes:null,imageSrcSet:null,inert:Oe,inputMode:null,integrity:null,is:null,isMap:Oe,itemId:null,itemProp:un,itemRef:un,itemScope:Oe,itemType:un,kind:null,label:null,lang:null,language:null,list:null,loading:null,loop:Oe,low:$,manifest:null,max:null,maxLength:$,media:null,method:null,min:null,minLength:$,multiple:Oe,muted:Oe,name:null,nonce:null,noModule:Oe,noValidate:Oe,onAbort:null,onAfterPrint:null,onAuxClick:null,onBeforeMatch:null,onBeforePrint:null,onBeforeToggle:null,onBeforeUnload:null,onBlur:null,onCancel:null,onCanPlay:null,onCanPlayThrough:null,onChange:null,onClick:null,onClose:null,onContextLost:null,onContextMenu:null,onContextRestored:null,onCopy:null,onCueChange:null,onCut:null,onDblClick:null,onDrag:null,onDragEnd:null,onDragEnter:null,onDragExit:null,onDragLeave:null,onDragOver:null,onDragStart:null,onDrop:null,onDurationChange:null,onEmptied:null,onEnded:null,onError:null,onFocus:null,onFormData:null,onHashChange:null,onInput:null,onInvalid:null,onKeyDown:null,onKeyPress:null,onKeyUp:null,onLanguageChange:null,onLoad:null,onLoadedData:null,onLoadedMetadata:null,onLoadEnd:null,onLoadStart:null,onMessage:null,onMessageError:null,onMouseDown:null,onMouseEnter:null,onMouseLeave:null,onMouseMove:null,onMouseOut:null,onMouseOver:null,onMouseUp:null,onOffline:null,onOnline:null,onPageHide:null,onPageShow:null,onPaste:null,onPause:null,onPlay:null,onPlaying:null,onPopState:null,onProgress:null,onRateChange:null,onRejectionHandled:null,onReset:null,onResize:null,onScroll:null,onScrollEnd:null,onSecurityPolicyViolation:null,onSeeked:null,onSeeking:null,onSelect:null,onSlotChange:null,onStalled:null,onStorage:null,onSubmit:null,onSuspend:null,onTimeUpdate:null,onToggle:null,onUnhandledRejection:null,onUnload:null,onVolumeChange:null,onWaiting:null,onWheel:null,open:Oe,optimum:$,pattern:null,ping:un,placeholder:null,playsInline:Oe,popover:null,popoverTarget:null,popoverTargetAction:null,poster:null,preload:null,readOnly:Oe,referrerPolicy:null,rel:un,required:Oe,reversed:Oe,rows:$,rowSpan:$,sandbox:un,scope:null,scoped:Oe,seamless:Oe,selected:Oe,shadowRootClonable:Oe,shadowRootDelegatesFocus:Oe,shadowRootMode:null,shape:null,size:$,sizes:null,slot:null,span:$,spellCheck:In,src:null,srcDoc:null,srcLang:null,srcSet:null,start:$,step:null,style:null,tabIndex:$,target:null,title:null,translate:null,type:null,typeMustMatch:Oe,useMap:null,value:In,width:$,wrap:null,writingSuggestions:null,align:null,aLink:null,archive:un,axis:null,background:null,bgColor:null,border:$,borderColor:null,bottomMargin:$,cellPadding:null,cellSpacing:null,char:null,charOff:null,classId:null,clear:null,code:null,codeBase:null,codeType:null,color:null,compact:Oe,declare:Oe,event:null,face:null,frame:null,frameBorder:null,hSpace:$,leftMargin:$,link:null,longDesc:null,lowSrc:null,marginHeight:$,marginWidth:$,noResize:Oe,noHref:Oe,noShade:Oe,noWrap:Oe,object:null,profile:null,prompt:null,rev:null,rightMargin:$,rules:null,scheme:null,scrolling:In,standby:null,summary:null,text:null,topMargin:$,valueType:null,version:null,vAlign:null,vLink:null,vSpace:$,allowTransparency:null,autoCorrect:null,autoSave:null,disablePictureInPicture:Oe,disableRemotePlayback:Oe,prefix:null,property:null,results:$,security:null,unselectable:null},space:"html",transform:Hg}),U0=yr({attributes:{accentHeight:"accent-height",alignmentBaseline:"alignment-baseline",arabicForm:"arabic-form",baselineShift:"baseline-shift",capHeight:"cap-height",className:"class",clipPath:"clip-path",clipRule:"clip-rule",colorInterpolation:"color-interpolation",colorInterpolationFilters:"color-interpolation-filters",colorProfile:"color-profile",colorRendering:"color-rendering",crossOrigin:"crossorigin",dataType:"datatype",dominantBaseline:"dominant-baseline",enableBackground:"enable-background",fillOpacity:"fill-opacity",fillRule:"fill-rule",floodColor:"flood-color",floodOpacity:"flood-opacity",fontFamily:"font-family",fontSize:"font-size",fontSizeAdjust:"font-size-adjust",fontStretch:"font-stretch",fontStyle:"font-style",fontVariant:"font-variant",fontWeight:"font-weight",glyphName:"glyph-name",glyphOrientationHorizontal:"glyph-orientation-horizontal",glyphOrientationVertical:"glyph-orientation-vertical",hrefLang:"hreflang",horizAdvX:"horiz-adv-x",horizOriginX:"horiz-origin-x",horizOriginY:"horiz-origin-y",imageRendering:"image-rendering",letterSpacing:"letter-spacing",lightingColor:"lighting-color",markerEnd:"marker-end",markerMid:"marker-mid",markerStart:"marker-start",navDown:"nav-down",navDownLeft:"nav-down-left",navDownRight:"nav-down-right",navLeft:"nav-left",navNext:"nav-next",navPrev:"nav-prev",navRight:"nav-right",navUp:"nav-up",navUpLeft:"nav-up-left",navUpRight:"nav-up-right",onAbort:"onabort",onActivate:"onactivate",onAfterPrint:"onafterprint",onBeforePrint:"onbeforeprint",onBegin:"onbegin",onCancel:"oncancel",onCanPlay:"oncanplay",onCanPlayThrough:"oncanplaythrough",onChange:"onchange",onClick:"onclick",onClose:"onclose",onCopy:"oncopy",onCueChange:"oncuechange",onCut:"oncut",onDblClick:"ondblclick",onDrag:"ondrag",onDragEnd:"ondragend",onDragEnter:"ondragenter",onDragExit:"ondragexit",onDragLeave:"ondragleave",onDragOver:"ondragover",onDragStart:"ondragstart",onDrop:"ondrop",onDurationChange:"ondurationchange",onEmptied:"onemptied",onEnd:"onend",onEnded:"onended",onError:"onerror",onFocus:"onfocus",onFocusIn:"onfocusin",onFocusOut:"onfocusout",onHashChange:"onhashchange",onInput:"oninput",onInvalid:"oninvalid",onKeyDown:"onkeydown",onKeyPress:"onkeypress",onKeyUp:"onkeyup",onLoad:"onload",onLoadedData:"onloadeddata",onLoadedMetadata:"onloadedmetadata",onLoadStart:"onloadstart",onMessage:"onmessage",onMouseDown:"onmousedown",onMouseEnter:"onmouseenter",onMouseLeave:"onmouseleave",onMouseMove:"onmousemove",onMouseOut:"onmouseout",onMouseOver:"onmouseover",onMouseUp:"onmouseup",onMouseWheel:"onmousewheel",onOffline:"onoffline",onOnline:"ononline",onPageHide:"onpagehide",onPageShow:"onpageshow",onPaste:"onpaste",onPause:"onpause",onPlay:"onplay",onPlaying:"onplaying",onPopState:"onpopstate",onProgress:"onprogress",onRateChange:"onratechange",onRepeat:"onrepeat",onReset:"onreset",onResize:"onresize",onScroll:"onscroll",onSeeked:"onseeked",onSeeking:"onseeking",onSelect:"onselect",onShow:"onshow",onStalled:"onstalled",onStorage:"onstorage",onSubmit:"onsubmit",onSuspend:"onsuspend",onTimeUpdate:"ontimeupdate",onToggle:"ontoggle",onUnload:"onunload",onVolumeChange:"onvolumechange",onWaiting:"onwaiting",onZoom:"onzoom",overlinePosition:"overline-position",overlineThickness:"overline-thickness",paintOrder:"paint-order",panose1:"panose-1",pointerEvents:"pointer-events",referrerPolicy:"referrerpolicy",renderingIntent:"rendering-intent",shapeRendering:"shape-rendering",stopColor:"stop-color",stopOpacity:"stop-opacity",strikethroughPosition:"strikethrough-position",strikethroughThickness:"strikethrough-thickness",strokeDashArray:"stroke-dasharray",strokeDashOffset:"stroke-dashoffset",strokeLineCap:"stroke-linecap",strokeLineJoin:"stroke-linejoin",strokeMiterLimit:"stroke-miterlimit",strokeOpacity:"stroke-opacity",strokeWidth:"stroke-width",tabIndex:"tabindex",textAnchor:"text-anchor",textDecoration:"text-decoration",textRendering:"text-rendering",transformOrigin:"transform-origin",typeOf:"typeof",underlinePosition:"underline-position",underlineThickness:"underline-thickness",unicodeBidi:"unicode-bidi",unicodeRange:"unicode-range",unitsPerEm:"units-per-em",vAlphabetic:"v-alphabetic",vHanging:"v-hanging",vIdeographic:"v-ideographic",vMathematical:"v-mathematical",vectorEffect:"vector-effect",vertAdvY:"vert-adv-y",vertOriginX:"vert-origin-x",vertOriginY:"vert-origin-y",wordSpacing:"word-spacing",writingMode:"writing-mode",xHeight:"x-height",playbackOrder:"playbackorder",timelineBegin:"timelinebegin"},properties:{about:ht,accentHeight:$,accumulate:null,additive:null,alignmentBaseline:null,alphabetic:$,amplitude:$,arabicForm:null,ascent:$,attributeName:null,attributeType:null,azimuth:$,bandwidth:null,baselineShift:null,baseFrequency:null,baseProfile:null,bbox:null,begin:null,bias:$,by:null,calcMode:null,capHeight:$,className:un,clip:null,clipPath:null,clipPathUnits:null,clipRule:null,color:null,colorInterpolation:null,colorInterpolationFilters:null,colorProfile:null,colorRendering:null,content:null,contentScriptType:null,contentStyleType:null,crossOrigin:null,cursor:null,cx:null,cy:null,d:null,dataType:null,defaultAction:null,descent:$,diffuseConstant:$,direction:null,display:null,dur:null,divisor:$,dominantBaseline:null,download:Oe,dx:null,dy:null,edgeMode:null,editable:null,elevation:$,enableBackground:null,end:null,event:null,exponent:$,externalResourcesRequired:null,fill:null,fillOpacity:$,fillRule:null,filter:null,filterRes:null,filterUnits:null,floodColor:null,floodOpacity:null,focusable:null,focusHighlight:null,fontFamily:null,fontSize:null,fontSizeAdjust:null,fontStretch:null,fontStyle:null,fontVariant:null,fontWeight:null,format:null,fr:null,from:null,fx:null,fy:null,g1:hr,g2:hr,glyphName:hr,glyphOrientationHorizontal:null,glyphOrientationVertical:null,glyphRef:null,gradientTransform:null,gradientUnits:null,handler:null,hanging:$,hatchContentUnits:null,hatchUnits:null,height:null,href:null,hrefLang:null,horizAdvX:$,horizOriginX:$,horizOriginY:$,id:null,ideographic:$,imageRendering:null,initialVisibility:null,in:null,in2:null,intercept:$,k:$,k1:$,k2:$,k3:$,k4:$,kernelMatrix:ht,kernelUnitLength:null,keyPoints:null,keySplines:null,keyTimes:null,kerning:null,lang:null,lengthAdjust:null,letterSpacing:null,lightingColor:null,limitingConeAngle:$,local:null,markerEnd:null,markerMid:null,markerStart:null,markerHeight:null,markerUnits:null,markerWidth:null,mask:null,maskContentUnits:null,maskUnits:null,mathematical:null,max:null,media:null,mediaCharacterEncoding:null,mediaContentEncodings:null,mediaSize:$,mediaTime:null,method:null,min:null,mode:null,name:null,navDown:null,navDownLeft:null,navDownRight:null,navLeft:null,navNext:null,navPrev:null,navRight:null,navUp:null,navUpLeft:null,navUpRight:null,numOctaves:null,observer:null,offset:null,onAbort:null,onActivate:null,onAfterPrint:null,onBeforePrint:null,onBegin:null,onCancel:null,onCanPlay:null,onCanPlayThrough:null,onChange:null,onClick:null,onClose:null,onCopy:null,onCueChange:null,onCut:null,onDblClick:null,onDrag:null,onDragEnd:null,onDragEnter:null,onDragExit:null,onDragLeave:null,onDragOver:null,onDragStart:null,onDrop:null,onDurationChange:null,onEmptied:null,onEnd:null,onEnded:null,onError:null,onFocus:null,onFocusIn:null,onFocusOut:null,onHashChange:null,onInput:null,onInvalid:null,onKeyDown:null,onKeyPress:null,onKeyUp:null,onLoad:null,onLoadedData:null,onLoadedMetadata:null,onLoadStart:null,onMessage:null,onMouseDown:null,onMouseEnter:null,onMouseLeave:null,onMouseMove:null,onMouseOut:null,onMouseOver:null,onMouseUp:null,onMouseWheel:null,onOffline:null,onOnline:null,onPageHide:null,onPageShow:null,onPaste:null,onPause:null,onPlay:null,onPlaying:null,onPopState:null,onProgress:null,onRateChange:null,onRepeat:null,onReset:null,onResize:null,onScroll:null,onSeeked:null,onSeeking:null,onSelect:null,onShow:null,onStalled:null,onStorage:null,onSubmit:null,onSuspend:null,onTimeUpdate:null,onToggle:null,onUnload:null,onVolumeChange:null,onWaiting:null,onZoom:null,opacity:null,operator:null,order:null,orient:null,orientation:null,origin:null,overflow:null,overlay:null,overlinePosition:$,overlineThickness:$,paintOrder:null,panose1:null,path:null,pathLength:$,patternContentUnits:null,patternTransform:null,patternUnits:null,phase:null,ping:un,pitch:null,playbackOrder:null,pointerEvents:null,points:null,pointsAtX:$,pointsAtY:$,pointsAtZ:$,preserveAlpha:null,preserveAspectRatio:null,primitiveUnits:null,propagate:null,property:ht,r:null,radius:null,referrerPolicy:null,refX:null,refY:null,rel:ht,rev:ht,renderingIntent:null,repeatCount:null,repeatDur:null,requiredExtensions:ht,requiredFeatures:ht,requiredFonts:ht,requiredFormats:ht,resource:null,restart:null,result:null,rotate:null,rx:null,ry:null,scale:null,seed:null,shapeRendering:null,side:null,slope:null,snapshotTime:null,specularConstant:$,specularExponent:$,spreadMethod:null,spacing:null,startOffset:null,stdDeviation:null,stemh:null,stemv:null,stitchTiles:null,stopColor:null,stopOpacity:null,strikethroughPosition:$,strikethroughThickness:$,string:null,stroke:null,strokeDashArray:ht,strokeDashOffset:null,strokeLineCap:null,strokeLineJoin:null,strokeMiterLimit:$,strokeOpacity:$,strokeWidth:null,style:null,surfaceScale:$,syncBehavior:null,syncBehaviorDefault:null,syncMaster:null,syncTolerance:null,syncToleranceDefault:null,systemLanguage:ht,tabIndex:$,tableValues:null,target:null,targetX:$,targetY:$,textAnchor:null,textDecoration:null,textRendering:null,textLength:null,timelineBegin:null,title:null,transformBehavior:null,type:null,typeOf:ht,to:null,transform:null,transformOrigin:null,u1:null,u2:null,underlinePosition:$,underlineThickness:$,unicode:null,unicodeBidi:null,unicodeRange:null,unitsPerEm:$,values:null,vAlphabetic:$,vMathematical:$,vectorEffect:null,vHanging:$,vIdeographic:$,version:null,vertAdvY:$,vertOriginX:$,vertOriginY:$,viewBox:null,viewTarget:null,visibility:null,width:null,widths:null,wordSpacing:null,writingMode:null,x:null,x1:null,x2:null,xChannelSelector:null,xHeight:$,y:null,y1:null,y2:null,yChannelSelector:null,z:null,zoomAndPan:null},space:"svg",transform:Xg}),Zg=yr({properties:{xLinkActuate:null,xLinkArcRole:null,xLinkHref:null,xLinkRole:null,xLinkShow:null,xLinkTitle:null,xLinkType:null},space:"xlink",transform(a,r){return"xlink:"+r.slice(5).toLowerCase()}}),Vg=yr({attributes:{xmlnsxlink:"xmlns:xlink"},properties:{xmlnsXLink:null,xmlns:null},space:"xmlns",transform:Hg}),qg=yr({properties:{xmlBase:null,xmlLang:null,xmlSpace:null},space:"xml",transform(a,r){return"xml:"+r.slice(3).toLowerCase()}}),P0={classId:"classID",dataType:"datatype",itemId:"itemID",strokeDashArray:"strokeDasharray",strokeDashOffset:"strokeDashoffset",strokeLineCap:"strokeLinecap",strokeLineJoin:"strokeLinejoin",strokeMiterLimit:"strokeMiterlimit",typeOf:"typeof",xLinkActuate:"xlinkActuate",xLinkArcRole:"xlinkArcrole",xLinkHref:"xlinkHref",xLinkRole:"xlinkRole",xLinkShow:"xlinkShow",xLinkTitle:"xlinkTitle",xLinkType:"xlinkType",xmlnsXLink:"xmlnsXlink"},B0=/[A-Z]/g,Wm=/-[a-z]/g,j0=/^data[-\w.:]+$/i;function X0(a,r){const l=Pc(r);let s=r,c=rt;if(l in a.normal)return a.property[a.normal[l]];if(l.length>4&&l.slice(0,4)==="data"&&j0.test(r)){if(r.charAt(4)==="-"){const d=r.slice(5).replace(Wm,Z0);s="data"+d.charAt(0).toUpperCase()+d.slice(1)}else{const d=r.slice(4);if(!Wm.test(d)){let f=d.replace(B0,H0);f.charAt(0)!=="-"&&(f="-"+f),r="data"+f}}c=ad}return new c(s,r)}function H0(a){return"-"+a.toLowerCase()}function Z0(a){return a.charAt(1).toUpperCase()}const V0=Bg([jg,W0,Zg,Vg,qg],"html"),id=Bg([jg,U0,Zg,Vg,qg],"svg");function q0(a){return a.join(" ").trim()}var fr={},Ec,Um;function Y0(){if(Um)return Ec;Um=1;var a=/\/\*[^*]*\*+([^/*][^*]*\*+)*\//g,r=/\n/g,l=/^\s*/,s=/^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/,c=/^:\s*/,d=/^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/,f=/^[;\s]*/,h=/^\s+|\s+$/g,g=`
`,p="/",y="*",b="",S="comment",v="declaration";function L(H,P){if(typeof H!="string")throw new TypeError("First argument must be a string");if(!H)return[];P=P||{};var G=1,q=1;function ce(de){var J=de.match(r);J&&(G+=J.length);var C=de.lastIndexOf(g);q=~C?de.length-C:q+de.length}function be(){var de={line:G,column:q};return function(J){return J.position=new X(de),pe(),J}}function X(de){this.start=de,this.end={line:G,column:q},this.source=P.source}X.prototype.content=H;function R(de){var J=new Error(P.source+":"+G+":"+q+": "+de);if(J.reason=de,J.filename=P.source,J.line=G,J.column=q,J.source=H,!P.silent)throw J}function ne(de){var J=de.exec(H);if(J){var C=J[0];return ce(C),H=H.slice(C.length),J}}function pe(){ne(l)}function ue(de){var J;for(de=de||[];J=ae();)J!==!1&&de.push(J);return de}function ae(){var de=be();if(!(p!=H.charAt(0)||y!=H.charAt(1))){for(var J=2;b!=H.charAt(J)&&(y!=H.charAt(J)||p!=H.charAt(J+1));)++J;if(J+=2,b===H.charAt(J-1))return R("End of comment missing");var C=H.slice(2,J-2);return q+=2,ce(C),H=H.slice(J),q+=2,de({type:S,comment:C})}}function ee(){var de=be(),J=ne(s);if(J){if(ae(),!ne(c))return R("property missing ':'");var C=ne(d),K=de({type:v,property:N(J[0].replace(a,b)),value:C?N(C[0].replace(a,b)):b});return ne(f),K}}function Te(){var de=[];ue(de);for(var J;J=ee();)J!==!1&&(de.push(J),ue(de));return de}return pe(),Te()}function N(H){return H?H.replace(h,b):b}return Ec=L,Ec}var Pm;function G0(){if(Pm)return fr;Pm=1;var a=fr&&fr.__importDefault||function(s){return s&&s.__esModule?s:{default:s}};Object.defineProperty(fr,"__esModule",{value:!0}),fr.default=l;const r=a(Y0());function l(s,c){let d=null;if(!s||typeof s!="string")return d;const f=(0,r.default)(s),h=typeof c=="function";return f.forEach(g=>{if(g.type!=="declaration")return;const{property:p,value:y}=g;h?c(p,y,g):y&&(d=d||{},d[p]=y)}),d}return fr}var pl={},Bm;function Q0(){if(Bm)return pl;Bm=1,Object.defineProperty(pl,"__esModule",{value:!0}),pl.camelCase=void 0;var a=/^--[a-zA-Z0-9_-]+$/,r=/-([a-z])/g,l=/^[^-]+$/,s=/^-(webkit|moz|ms|o|khtml)-/,c=/^-(ms)-/,d=function(p){return!p||l.test(p)||a.test(p)},f=function(p,y){return y.toUpperCase()},h=function(p,y){return"".concat(y,"-")},g=function(p,y){return y===void 0&&(y={}),d(p)?p:(p=p.toLowerCase(),y.reactCompat?p=p.replace(c,h):p=p.replace(s,h),p.replace(r,f))};return pl.camelCase=g,pl}var hl,jm;function K0(){if(jm)return hl;jm=1;var a=hl&&hl.__importDefault||function(c){return c&&c.__esModule?c:{default:c}},r=a(G0()),l=Q0();function s(c,d){var f={};return!c||typeof c!="string"||(0,r.default)(c,function(h,g){h&&g&&(f[(0,l.camelCase)(h,d)]=g)}),f}return s.default=s,hl=s,hl}var F0=K0();const J0=Js(F0),Yg=Gg("end"),rd=Gg("start");function Gg(a){return r;function r(l){const s=l&&l.position&&l.position[a]||{};if(typeof s.line=="number"&&s.line>0&&typeof s.column=="number"&&s.column>0)return{line:s.line,column:s.column,offset:typeof s.offset=="number"&&s.offset>-1?s.offset:void 0}}}function $0(a){const r=rd(a),l=Yg(a);if(r&&l)return{start:r,end:l}}function bl(a){return!a||typeof a!="object"?"":"position"in a||"type"in a?Xm(a.position):"start"in a||"end"in a?Xm(a):"line"in a||"column"in a?Xc(a):""}function Xc(a){return Hm(a&&a.line)+":"+Hm(a&&a.column)}function Xm(a){return Xc(a&&a.start)+"-"+Xc(a&&a.end)}function Hm(a){return a&&typeof a=="number"?a:1}class Hn extends Error{constructor(r,l,s){super(),typeof l=="string"&&(s=l,l=void 0);let c="",d={},f=!1;if(l&&("line"in l&&"column"in l?d={place:l}:"start"in l&&"end"in l?d={place:l}:"type"in l?d={ancestors:[l],place:l.position}:d={...l}),typeof r=="string"?c=r:!d.cause&&r&&(f=!0,c=r.message,d.cause=r),!d.ruleId&&!d.source&&typeof s=="string"){const g=s.indexOf(":");g===-1?d.ruleId=s:(d.source=s.slice(0,g),d.ruleId=s.slice(g+1))}if(!d.place&&d.ancestors&&d.ancestors){const g=d.ancestors[d.ancestors.length-1];g&&(d.place=g.position)}const h=d.place&&"start"in d.place?d.place.start:d.place;this.ancestors=d.ancestors||void 0,this.cause=d.cause||void 0,this.column=h?h.column:void 0,this.fatal=void 0,this.file="",this.message=c,this.line=h?h.line:void 0,this.name=bl(d.place)||"1:1",this.place=d.place||void 0,this.reason=this.message,this.ruleId=d.ruleId||void 0,this.source=d.source||void 0,this.stack=f&&d.cause&&typeof d.cause.stack=="string"?d.cause.stack:"",this.actual=void 0,this.expected=void 0,this.note=void 0,this.url=void 0}}Hn.prototype.file="";Hn.prototype.name="";Hn.prototype.reason="";Hn.prototype.message="";Hn.prototype.stack="";Hn.prototype.column=void 0;Hn.prototype.line=void 0;Hn.prototype.ancestors=void 0;Hn.prototype.cause=void 0;Hn.prototype.fatal=void 0;Hn.prototype.place=void 0;Hn.prototype.ruleId=void 0;Hn.prototype.source=void 0;const ld={}.hasOwnProperty,ev=new Map,nv=/[A-Z]/g,tv=new Set(["table","tbody","thead","tfoot","tr"]),av=new Set(["td","th"]),Qg="https://github.com/syntax-tree/hast-util-to-jsx-runtime";function iv(a,r){if(!r||r.Fragment===void 0)throw new TypeError("Expected `Fragment` in options");const l=r.filePath||void 0;let s;if(r.development){if(typeof r.jsxDEV!="function")throw new TypeError("Expected `jsxDEV` in options when `development: true`");s=fv(l,r.jsxDEV)}else{if(typeof r.jsx!="function")throw new TypeError("Expected `jsx` in production options");if(typeof r.jsxs!="function")throw new TypeError("Expected `jsxs` in production options");s=dv(l,r.jsx,r.jsxs)}const c={Fragment:r.Fragment,ancestors:[],components:r.components||{},create:s,elementAttributeNameCase:r.elementAttributeNameCase||"react",evaluater:r.createEvaluater?r.createEvaluater():void 0,filePath:l,ignoreInvalidStyle:r.ignoreInvalidStyle||!1,passKeys:r.passKeys!==!1,passNode:r.passNode||!1,schema:r.space==="svg"?id:V0,stylePropertyNameCase:r.stylePropertyNameCase||"dom",tableCellAlignToStyle:r.tableCellAlignToStyle!==!1},d=Kg(c,a,void 0);return d&&typeof d!="string"?d:c.create(a,c.Fragment,{children:d||void 0},void 0)}function Kg(a,r,l){if(r.type==="element")return rv(a,r,l);if(r.type==="mdxFlowExpression"||r.type==="mdxTextExpression")return lv(a,r);if(r.type==="mdxJsxFlowElement"||r.type==="mdxJsxTextElement")return ov(a,r,l);if(r.type==="mdxjsEsm")return sv(a,r);if(r.type==="root")return uv(a,r,l);if(r.type==="text")return cv(a,r)}function rv(a,r,l){const s=a.schema;let c=s;r.tagName.toLowerCase()==="svg"&&s.space==="html"&&(c=id,a.schema=c),a.ancestors.push(r);const d=Jg(a,r.tagName,!1),f=pv(a,r);let h=od(a,r);return tv.has(r.tagName)&&(h=h.filter(function(g){return typeof g=="string"?!O0(g):!0})),Fg(a,f,d,r),sd(f,h),a.ancestors.pop(),a.schema=s,a.create(r,d,f,l)}function lv(a,r){if(r.data&&r.data.estree&&a.evaluater){const s=r.data.estree.body[0];return s.type,a.evaluater.evaluateExpression(s.expression)}Dl(a,r.position)}function sv(a,r){if(r.data&&r.data.estree&&a.evaluater)return a.evaluater.evaluateProgram(r.data.estree);Dl(a,r.position)}function ov(a,r,l){const s=a.schema;let c=s;r.name==="svg"&&s.space==="html"&&(c=id,a.schema=c),a.ancestors.push(r);const d=r.name===null?a.Fragment:Jg(a,r.name,!0),f=hv(a,r),h=od(a,r);return Fg(a,f,d,r),sd(f,h),a.ancestors.pop(),a.schema=s,a.create(r,d,f,l)}function uv(a,r,l){const s={};return sd(s,od(a,r)),a.create(r,a.Fragment,s,l)}function cv(a,r){return r.value}function Fg(a,r,l,s){typeof l!="string"&&l!==a.Fragment&&a.passNode&&(r.node=s)}function sd(a,r){if(r.length>0){const l=r.length>1?r:r[0];l&&(a.children=l)}}function dv(a,r,l){return s;function s(c,d,f,h){const p=Array.isArray(f.children)?l:r;return h?p(d,f,h):p(d,f)}}function fv(a,r){return l;function l(s,c,d,f){const h=Array.isArray(d.children),g=rd(s);return r(c,d,f,h,{columnNumber:g?g.column-1:void 0,fileName:a,lineNumber:g?g.line:void 0},void 0)}}function pv(a,r){const l={};let s,c;for(c in r.properties)if(c!=="children"&&ld.call(r.properties,c)){const d=mv(a,c,r.properties[c]);if(d){const[f,h]=d;a.tableCellAlignToStyle&&f==="align"&&typeof h=="string"&&av.has(r.tagName)?s=h:l[f]=h}}if(s){const d=l.style||(l.style={});d[a.stylePropertyNameCase==="css"?"text-align":"textAlign"]=s}return l}function hv(a,r){const l={};for(const s of r.attributes)if(s.type==="mdxJsxExpressionAttribute")if(s.data&&s.data.estree&&a.evaluater){const d=s.data.estree.body[0];d.type;const f=d.expression;f.type;const h=f.properties[0];h.type,Object.assign(l,a.evaluater.evaluateExpression(h.argument))}else Dl(a,r.position);else{const c=s.name;let d;if(s.value&&typeof s.value=="object")if(s.value.data&&s.value.data.estree&&a.evaluater){const h=s.value.data.estree.body[0];h.type,d=a.evaluater.evaluateExpression(h.expression)}else Dl(a,r.position);else d=s.value===null?!0:s.value;l[c]=d}return l}function od(a,r){const l=[];let s=-1;const c=a.passKeys?new Map:ev;for(;++s<r.children.length;){const d=r.children[s];let f;if(a.passKeys){const g=d.type==="element"?d.tagName:d.type==="mdxJsxFlowElement"||d.type==="mdxJsxTextElement"?d.name:void 0;if(g){const p=c.get(g)||0;f=g+"-"+p,c.set(g,p+1)}}const h=Kg(a,d,f);h!==void 0&&l.push(h)}return l}function mv(a,r,l){const s=X0(a.schema,r);if(!(l==null||typeof l=="number"&&Number.isNaN(l))){if(Array.isArray(l)&&(l=s.commaSeparated?I0(l):q0(l)),s.property==="style"){let c=typeof l=="object"?l:gv(a,String(l));return a.stylePropertyNameCase==="css"&&(c=yv(c)),["style",c]}return[a.elementAttributeNameCase==="react"&&s.space?P0[s.property]||s.property:s.attribute,l]}}function gv(a,r){try{return J0(r,{reactCompat:!0})}catch(l){if(a.ignoreInvalidStyle)return{};const s=l,c=new Hn("Cannot parse `style` attribute",{ancestors:a.ancestors,cause:s,ruleId:"style",source:"hast-util-to-jsx-runtime"});throw c.file=a.filePath||void 0,c.url=Qg+"#cannot-parse-style-attribute",c}}function Jg(a,r,l){let s;if(!l)s={type:"Literal",value:r};else if(r.includes(".")){const c=r.split(".");let d=-1,f;for(;++d<c.length;){const h=Lm(c[d])?{type:"Identifier",name:c[d]}:{type:"Literal",value:c[d]};f=f?{type:"MemberExpression",object:f,property:h,computed:!!(d&&h.type==="Literal"),optional:!1}:h}s=f}else s=Lm(r)&&!/^[a-z]/.test(r)?{type:"Identifier",name:r}:{type:"Literal",value:r};if(s.type==="Literal"){const c=s.value;return ld.call(a.components,c)?a.components[c]:c}if(a.evaluater)return a.evaluater.evaluateExpression(s);Dl(a)}function Dl(a,r){const l=new Hn("Cannot handle MDX estrees without `createEvaluater`",{ancestors:a.ancestors,place:r,ruleId:"mdx-estree",source:"hast-util-to-jsx-runtime"});throw l.file=a.filePath||void 0,l.url=Qg+"#cannot-handle-mdx-estrees-without-createevaluater",l}function yv(a){const r={};let l;for(l in a)ld.call(a,l)&&(r[bv(l)]=a[l]);return r}function bv(a){let r=a.replace(nv,zv);return r.slice(0,3)==="ms-"&&(r="-"+r),r}function zv(a){return"-"+a.toLowerCase()}const Dc={action:["form"],cite:["blockquote","del","ins","q"],data:["object"],formAction:["button","input"],href:["a","area","base","link"],icon:["menuitem"],itemId:null,manifest:["html"],ping:["a","area"],poster:["video"],src:["audio","embed","iframe","img","input","script","source","track","video"]},vv={};function Sv(a,r){const l=vv,s=typeof l.includeImageAlt=="boolean"?l.includeImageAlt:!0,c=typeof l.includeHtml=="boolean"?l.includeHtml:!0;return $g(a,s,c)}function $g(a,r,l){if(Ev(a)){if("value"in a)return a.type==="html"&&!l?"":a.value;if(r&&"alt"in a&&a.alt)return a.alt;if("children"in a)return Zm(a.children,r,l)}return Array.isArray(a)?Zm(a,r,l):""}function Zm(a,r,l){const s=[];let c=-1;for(;++c<a.length;)s[c]=$g(a[c],r,l);return s.join("")}function Ev(a){return!!(a&&typeof a=="object")}const Vm=document.createElement("i");function ud(a){const r="&"+a+";";Vm.innerHTML=r;const l=Vm.textContent;return l.charCodeAt(l.length-1)===59&&a!=="semi"||l===r?!1:l}function Gt(a,r,l,s){const c=a.length;let d=0,f;if(r<0?r=-r>c?0:c+r:r=r>c?c:r,l=l>0?l:0,s.length<1e4)f=Array.from(s),f.unshift(r,l),a.splice(...f);else for(l&&a.splice(r,l);d<s.length;)f=s.slice(d,d+1e4),f.unshift(r,0),a.splice(...f),d+=1e4,r+=1e4}function It(a,r){return a.length>0?(Gt(a,a.length,0,r),a):r}const qm={}.hasOwnProperty;function Dv(a){const r={};let l=-1;for(;++l<a.length;)xv(r,a[l]);return r}function xv(a,r){let l;for(l in r){const c=(qm.call(a,l)?a[l]:void 0)||(a[l]={}),d=r[l];let f;if(d)for(f in d){qm.call(c,f)||(c[f]=[]);const h=d[f];Tv(c[f],Array.isArray(h)?h:h?[h]:[])}}}function Tv(a,r){let l=-1;const s=[];for(;++l<r.length;)(r[l].add==="after"?a:s).push(r[l]);Gt(a,0,0,s)}function ey(a,r){const l=Number.parseInt(a,r);return l<9||l===11||l>13&&l<32||l>126&&l<160||l>55295&&l<57344||l>64975&&l<65008||(l&65535)===65535||(l&65535)===65534||l>1114111?"�":String.fromCodePoint(l)}function mr(a){return a.replace(/[\t\n\r ]+/g," ").replace(/^ | $/g,"").toLowerCase().toUpperCase()}const Yt=$a(/[A-Za-z]/),gt=$a(/[\dA-Za-z]/),Av=$a(/[#-'*+\--9=?A-Z^-~]/);function Hc(a){return a!==null&&(a<32||a===127)}const Zc=$a(/\d/),wv=$a(/[\dA-Fa-f]/),Rv=$a(/[!-/:-@[-`{-~]/);function Re(a){return a!==null&&a<-2}function it(a){return a!==null&&(a<0||a===32)}function Qe(a){return a===-2||a===-1||a===32}const kv=$a(new RegExp("\\p{P}|\\p{S}","u")),Iv=$a(/\s/);function $a(a){return r;function r(l){return l!==null&&l>-1&&a.test(String.fromCharCode(l))}}function br(a){const r=[];let l=-1,s=0,c=0;for(;++l<a.length;){const d=a.charCodeAt(l);let f="";if(d===37&&gt(a.charCodeAt(l+1))&&gt(a.charCodeAt(l+2)))c=2;else if(d<128)/[!#$&-;=?-Z_a-z~]/.test(String.fromCharCode(d))||(f=String.fromCharCode(d));else if(d>55295&&d<57344){const h=a.charCodeAt(l+1);d<56320&&h>56319&&h<57344?(f=String.fromCharCode(d,h),c=1):f="�"}else f=String.fromCharCode(d);f&&(r.push(a.slice(s,l),encodeURIComponent(f)),s=l+c+1,f=""),c&&(l+=c,c=0)}return r.join("")+a.slice(s)}function cn(a,r,l,s){const c=s?s-1:Number.POSITIVE_INFINITY;let d=0;return f;function f(g){return Qe(g)?(a.enter(l),h(g)):r(g)}function h(g){return Qe(g)&&d++<c?(a.consume(g),h):(a.exit(l),r(g))}}const Mv={tokenize:_v};function _v(a){const r=a.attempt(this.parser.constructs.contentInitial,s,c);let l;return r;function s(h){if(h===null){a.consume(h);return}return a.enter("lineEnding"),a.consume(h),a.exit("lineEnding"),cn(a,r,"linePrefix")}function c(h){return a.enter("paragraph"),d(h)}function d(h){const g=a.enter("chunkText",{contentType:"text",previous:l});return l&&(l.next=g),l=g,f(h)}function f(h){if(h===null){a.exit("chunkText"),a.exit("paragraph"),a.consume(h);return}return Re(h)?(a.consume(h),a.exit("chunkText"),d):(a.consume(h),f)}}const Cv={tokenize:Lv},Ym={tokenize:Ov};function Lv(a){const r=this,l=[];let s=0,c,d,f;return h;function h(q){if(s<l.length){const ce=l[s];return r.containerState=ce[1],a.attempt(ce[0].continuation,g,p)(q)}return p(q)}function g(q){if(s++,r.containerState._closeFlow){r.containerState._closeFlow=void 0,c&&G();const ce=r.events.length;let be=ce,X;for(;be--;)if(r.events[be][0]==="exit"&&r.events[be][1].type==="chunkFlow"){X=r.events[be][1].end;break}P(s);let R=ce;for(;R<r.events.length;)r.events[R][1].end={...X},R++;return Gt(r.events,be+1,0,r.events.slice(ce)),r.events.length=R,p(q)}return h(q)}function p(q){if(s===l.length){if(!c)return S(q);if(c.currentConstruct&&c.currentConstruct.concrete)return L(q);r.interrupt=!!(c.currentConstruct&&!c._gfmTableDynamicInterruptHack)}return r.containerState={},a.check(Ym,y,b)(q)}function y(q){return c&&G(),P(s),S(q)}function b(q){return r.parser.lazy[r.now().line]=s!==l.length,f=r.now().offset,L(q)}function S(q){return r.containerState={},a.attempt(Ym,v,L)(q)}function v(q){return s++,l.push([r.currentConstruct,r.containerState]),S(q)}function L(q){if(q===null){c&&G(),P(0),a.consume(q);return}return c=c||r.parser.flow(r.now()),a.enter("chunkFlow",{_tokenizer:c,contentType:"flow",previous:d}),N(q)}function N(q){if(q===null){H(a.exit("chunkFlow"),!0),P(0),a.consume(q);return}return Re(q)?(a.consume(q),H(a.exit("chunkFlow")),s=0,r.interrupt=void 0,h):(a.consume(q),N)}function H(q,ce){const be=r.sliceStream(q);if(ce&&be.push(null),q.previous=d,d&&(d.next=q),d=q,c.defineSkip(q.start),c.write(be),r.parser.lazy[q.start.line]){let X=c.events.length;for(;X--;)if(c.events[X][1].start.offset<f&&(!c.events[X][1].end||c.events[X][1].end.offset>f))return;const R=r.events.length;let ne=R,pe,ue;for(;ne--;)if(r.events[ne][0]==="exit"&&r.events[ne][1].type==="chunkFlow"){if(pe){ue=r.events[ne][1].end;break}pe=!0}for(P(s),X=R;X<r.events.length;)r.events[X][1].end={...ue},X++;Gt(r.events,ne+1,0,r.events.slice(R)),r.events.length=X}}function P(q){let ce=l.length;for(;ce-- >q;){const be=l[ce];r.containerState=be[1],be[0].exit.call(r,a)}l.length=q}function G(){c.write([null]),d=void 0,c=void 0,r.containerState._closeFlow=void 0}}function Ov(a,r,l){return cn(a,a.attempt(this.parser.constructs.document,r,l),"linePrefix",this.parser.constructs.disable.null.includes("codeIndented")?void 0:4)}function Gm(a){if(a===null||it(a)||Iv(a))return 1;if(kv(a))return 2}function cd(a,r,l){const s=[];let c=-1;for(;++c<a.length;){const d=a[c].resolveAll;d&&!s.includes(d)&&(r=d(r,l),s.push(d))}return r}const Vc={name:"attention",resolveAll:Nv,tokenize:Wv};function Nv(a,r){let l=-1,s,c,d,f,h,g,p,y;for(;++l<a.length;)if(a[l][0]==="enter"&&a[l][1].type==="attentionSequence"&&a[l][1]._close){for(s=l;s--;)if(a[s][0]==="exit"&&a[s][1].type==="attentionSequence"&&a[s][1]._open&&r.sliceSerialize(a[s][1]).charCodeAt(0)===r.sliceSerialize(a[l][1]).charCodeAt(0)){if((a[s][1]._close||a[l][1]._open)&&(a[l][1].end.offset-a[l][1].start.offset)%3&&!((a[s][1].end.offset-a[s][1].start.offset+a[l][1].end.offset-a[l][1].start.offset)%3))continue;g=a[s][1].end.offset-a[s][1].start.offset>1&&a[l][1].end.offset-a[l][1].start.offset>1?2:1;const b={...a[s][1].end},S={...a[l][1].start};Qm(b,-g),Qm(S,g),f={type:g>1?"strongSequence":"emphasisSequence",start:b,end:{...a[s][1].end}},h={type:g>1?"strongSequence":"emphasisSequence",start:{...a[l][1].start},end:S},d={type:g>1?"strongText":"emphasisText",start:{...a[s][1].end},end:{...a[l][1].start}},c={type:g>1?"strong":"emphasis",start:{...f.start},end:{...h.end}},a[s][1].end={...f.start},a[l][1].start={...h.end},p=[],a[s][1].end.offset-a[s][1].start.offset&&(p=It(p,[["enter",a[s][1],r],["exit",a[s][1],r]])),p=It(p,[["enter",c,r],["enter",f,r],["exit",f,r],["enter",d,r]]),p=It(p,cd(r.parser.constructs.insideSpan.null,a.slice(s+1,l),r)),p=It(p,[["exit",d,r],["enter",h,r],["exit",h,r],["exit",c,r]]),a[l][1].end.offset-a[l][1].start.offset?(y=2,p=It(p,[["enter",a[l][1],r],["exit",a[l][1],r]])):y=0,Gt(a,s-1,l-s+3,p),l=s+p.length-y-2;break}}for(l=-1;++l<a.length;)a[l][1].type==="attentionSequence"&&(a[l][1].type="data");return a}function Wv(a,r){const l=this.parser.constructs.attentionMarkers.null,s=this.previous,c=Gm(s);let d;return f;function f(g){return d=g,a.enter("attentionSequence"),h(g)}function h(g){if(g===d)return a.consume(g),h;const p=a.exit("attentionSequence"),y=Gm(g),b=!y||y===2&&c||l.includes(g),S=!c||c===2&&y||l.includes(s);return p._open=!!(d===42?b:b&&(c||!S)),p._close=!!(d===42?S:S&&(y||!b)),r(g)}}function Qm(a,r){a.column+=r,a.offset+=r,a._bufferIndex+=r}const Uv={name:"autolink",tokenize:Pv};function Pv(a,r,l){let s=0;return c;function c(v){return a.enter("autolink"),a.enter("autolinkMarker"),a.consume(v),a.exit("autolinkMarker"),a.enter("autolinkProtocol"),d}function d(v){return Yt(v)?(a.consume(v),f):v===64?l(v):p(v)}function f(v){return v===43||v===45||v===46||gt(v)?(s=1,h(v)):p(v)}function h(v){return v===58?(a.consume(v),s=0,g):(v===43||v===45||v===46||gt(v))&&s++<32?(a.consume(v),h):(s=0,p(v))}function g(v){return v===62?(a.exit("autolinkProtocol"),a.enter("autolinkMarker"),a.consume(v),a.exit("autolinkMarker"),a.exit("autolink"),r):v===null||v===32||v===60||Hc(v)?l(v):(a.consume(v),g)}function p(v){return v===64?(a.consume(v),y):Av(v)?(a.consume(v),p):l(v)}function y(v){return gt(v)?b(v):l(v)}function b(v){return v===46?(a.consume(v),s=0,y):v===62?(a.exit("autolinkProtocol").type="autolinkEmail",a.enter("autolinkMarker"),a.consume(v),a.exit("autolinkMarker"),a.exit("autolink"),r):S(v)}function S(v){if((v===45||gt(v))&&s++<63){const L=v===45?S:b;return a.consume(v),L}return l(v)}}const eo={partial:!0,tokenize:Bv};function Bv(a,r,l){return s;function s(d){return Qe(d)?cn(a,c,"linePrefix")(d):c(d)}function c(d){return d===null||Re(d)?r(d):l(d)}}const ny={continuation:{tokenize:Xv},exit:Hv,name:"blockQuote",tokenize:jv};function jv(a,r,l){const s=this;return c;function c(f){if(f===62){const h=s.containerState;return h.open||(a.enter("blockQuote",{_container:!0}),h.open=!0),a.enter("blockQuotePrefix"),a.enter("blockQuoteMarker"),a.consume(f),a.exit("blockQuoteMarker"),d}return l(f)}function d(f){return Qe(f)?(a.enter("blockQuotePrefixWhitespace"),a.consume(f),a.exit("blockQuotePrefixWhitespace"),a.exit("blockQuotePrefix"),r):(a.exit("blockQuotePrefix"),r(f))}}function Xv(a,r,l){const s=this;return c;function c(f){return Qe(f)?cn(a,d,"linePrefix",s.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(f):d(f)}function d(f){return a.attempt(ny,r,l)(f)}}function Hv(a){a.exit("blockQuote")}const ty={name:"characterEscape",tokenize:Zv};function Zv(a,r,l){return s;function s(d){return a.enter("characterEscape"),a.enter("escapeMarker"),a.consume(d),a.exit("escapeMarker"),c}function c(d){return Rv(d)?(a.enter("characterEscapeValue"),a.consume(d),a.exit("characterEscapeValue"),a.exit("characterEscape"),r):l(d)}}const ay={name:"characterReference",tokenize:Vv};function Vv(a,r,l){const s=this;let c=0,d,f;return h;function h(b){return a.enter("characterReference"),a.enter("characterReferenceMarker"),a.consume(b),a.exit("characterReferenceMarker"),g}function g(b){return b===35?(a.enter("characterReferenceMarkerNumeric"),a.consume(b),a.exit("characterReferenceMarkerNumeric"),p):(a.enter("characterReferenceValue"),d=31,f=gt,y(b))}function p(b){return b===88||b===120?(a.enter("characterReferenceMarkerHexadecimal"),a.consume(b),a.exit("characterReferenceMarkerHexadecimal"),a.enter("characterReferenceValue"),d=6,f=wv,y):(a.enter("characterReferenceValue"),d=7,f=Zc,y(b))}function y(b){if(b===59&&c){const S=a.exit("characterReferenceValue");return f===gt&&!ud(s.sliceSerialize(S))?l(b):(a.enter("characterReferenceMarker"),a.consume(b),a.exit("characterReferenceMarker"),a.exit("characterReference"),r)}return f(b)&&c++<d?(a.consume(b),y):l(b)}}const Km={partial:!0,tokenize:Yv},Fm={concrete:!0,name:"codeFenced",tokenize:qv};function qv(a,r,l){const s=this,c={partial:!0,tokenize:be};let d=0,f=0,h;return g;function g(X){return p(X)}function p(X){const R=s.events[s.events.length-1];return d=R&&R[1].type==="linePrefix"?R[2].sliceSerialize(R[1],!0).length:0,h=X,a.enter("codeFenced"),a.enter("codeFencedFence"),a.enter("codeFencedFenceSequence"),y(X)}function y(X){return X===h?(f++,a.consume(X),y):f<3?l(X):(a.exit("codeFencedFenceSequence"),Qe(X)?cn(a,b,"whitespace")(X):b(X))}function b(X){return X===null||Re(X)?(a.exit("codeFencedFence"),s.interrupt?r(X):a.check(Km,N,ce)(X)):(a.enter("codeFencedFenceInfo"),a.enter("chunkString",{contentType:"string"}),S(X))}function S(X){return X===null||Re(X)?(a.exit("chunkString"),a.exit("codeFencedFenceInfo"),b(X)):Qe(X)?(a.exit("chunkString"),a.exit("codeFencedFenceInfo"),cn(a,v,"whitespace")(X)):X===96&&X===h?l(X):(a.consume(X),S)}function v(X){return X===null||Re(X)?b(X):(a.enter("codeFencedFenceMeta"),a.enter("chunkString",{contentType:"string"}),L(X))}function L(X){return X===null||Re(X)?(a.exit("chunkString"),a.exit("codeFencedFenceMeta"),b(X)):X===96&&X===h?l(X):(a.consume(X),L)}function N(X){return a.attempt(c,ce,H)(X)}function H(X){return a.enter("lineEnding"),a.consume(X),a.exit("lineEnding"),P}function P(X){return d>0&&Qe(X)?cn(a,G,"linePrefix",d+1)(X):G(X)}function G(X){return X===null||Re(X)?a.check(Km,N,ce)(X):(a.enter("codeFlowValue"),q(X))}function q(X){return X===null||Re(X)?(a.exit("codeFlowValue"),G(X)):(a.consume(X),q)}function ce(X){return a.exit("codeFenced"),r(X)}function be(X,R,ne){let pe=0;return ue;function ue(J){return X.enter("lineEnding"),X.consume(J),X.exit("lineEnding"),ae}function ae(J){return X.enter("codeFencedFence"),Qe(J)?cn(X,ee,"linePrefix",s.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(J):ee(J)}function ee(J){return J===h?(X.enter("codeFencedFenceSequence"),Te(J)):ne(J)}function Te(J){return J===h?(pe++,X.consume(J),Te):pe>=f?(X.exit("codeFencedFenceSequence"),Qe(J)?cn(X,de,"whitespace")(J):de(J)):ne(J)}function de(J){return J===null||Re(J)?(X.exit("codeFencedFence"),R(J)):ne(J)}}}function Yv(a,r,l){const s=this;return c;function c(f){return f===null?l(f):(a.enter("lineEnding"),a.consume(f),a.exit("lineEnding"),d)}function d(f){return s.parser.lazy[s.now().line]?l(f):r(f)}}const xc={name:"codeIndented",tokenize:Qv},Gv={partial:!0,tokenize:Kv};function Qv(a,r,l){const s=this;return c;function c(p){return a.enter("codeIndented"),cn(a,d,"linePrefix",5)(p)}function d(p){const y=s.events[s.events.length-1];return y&&y[1].type==="linePrefix"&&y[2].sliceSerialize(y[1],!0).length>=4?f(p):l(p)}function f(p){return p===null?g(p):Re(p)?a.attempt(Gv,f,g)(p):(a.enter("codeFlowValue"),h(p))}function h(p){return p===null||Re(p)?(a.exit("codeFlowValue"),f(p)):(a.consume(p),h)}function g(p){return a.exit("codeIndented"),r(p)}}function Kv(a,r,l){const s=this;return c;function c(f){return s.parser.lazy[s.now().line]?l(f):Re(f)?(a.enter("lineEnding"),a.consume(f),a.exit("lineEnding"),c):cn(a,d,"linePrefix",5)(f)}function d(f){const h=s.events[s.events.length-1];return h&&h[1].type==="linePrefix"&&h[2].sliceSerialize(h[1],!0).length>=4?r(f):Re(f)?c(f):l(f)}}const Fv={name:"codeText",previous:$v,resolve:Jv,tokenize:eS};function Jv(a){let r=a.length-4,l=3,s,c;if((a[l][1].type==="lineEnding"||a[l][1].type==="space")&&(a[r][1].type==="lineEnding"||a[r][1].type==="space")){for(s=l;++s<r;)if(a[s][1].type==="codeTextData"){a[l][1].type="codeTextPadding",a[r][1].type="codeTextPadding",l+=2,r-=2;break}}for(s=l-1,r++;++s<=r;)c===void 0?s!==r&&a[s][1].type!=="lineEnding"&&(c=s):(s===r||a[s][1].type==="lineEnding")&&(a[c][1].type="codeTextData",s!==c+2&&(a[c][1].end=a[s-1][1].end,a.splice(c+2,s-c-2),r-=s-c-2,s=c+2),c=void 0);return a}function $v(a){return a!==96||this.events[this.events.length-1][1].type==="characterEscape"}function eS(a,r,l){let s=0,c,d;return f;function f(b){return a.enter("codeText"),a.enter("codeTextSequence"),h(b)}function h(b){return b===96?(a.consume(b),s++,h):(a.exit("codeTextSequence"),g(b))}function g(b){return b===null?l(b):b===32?(a.enter("space"),a.consume(b),a.exit("space"),g):b===96?(d=a.enter("codeTextSequence"),c=0,y(b)):Re(b)?(a.enter("lineEnding"),a.consume(b),a.exit("lineEnding"),g):(a.enter("codeTextData"),p(b))}function p(b){return b===null||b===32||b===96||Re(b)?(a.exit("codeTextData"),g(b)):(a.consume(b),p)}function y(b){return b===96?(a.consume(b),c++,y):c===s?(a.exit("codeTextSequence"),a.exit("codeText"),r(b)):(d.type="codeTextData",p(b))}}class nS{constructor(r){this.left=r?[...r]:[],this.right=[]}get(r){if(r<0||r>=this.left.length+this.right.length)throw new RangeError("Cannot access index `"+r+"` in a splice buffer of size `"+(this.left.length+this.right.length)+"`");return r<this.left.length?this.left[r]:this.right[this.right.length-r+this.left.length-1]}get length(){return this.left.length+this.right.length}shift(){return this.setCursor(0),this.right.pop()}slice(r,l){const s=l??Number.POSITIVE_INFINITY;return s<this.left.length?this.left.slice(r,s):r>this.left.length?this.right.slice(this.right.length-s+this.left.length,this.right.length-r+this.left.length).reverse():this.left.slice(r).concat(this.right.slice(this.right.length-s+this.left.length).reverse())}splice(r,l,s){const c=l||0;this.setCursor(Math.trunc(r));const d=this.right.splice(this.right.length-c,Number.POSITIVE_INFINITY);return s&&ml(this.left,s),d.reverse()}pop(){return this.setCursor(Number.POSITIVE_INFINITY),this.left.pop()}push(r){this.setCursor(Number.POSITIVE_INFINITY),this.left.push(r)}pushMany(r){this.setCursor(Number.POSITIVE_INFINITY),ml(this.left,r)}unshift(r){this.setCursor(0),this.right.push(r)}unshiftMany(r){this.setCursor(0),ml(this.right,r.reverse())}setCursor(r){if(!(r===this.left.length||r>this.left.length&&this.right.length===0||r<0&&this.left.length===0))if(r<this.left.length){const l=this.left.splice(r,Number.POSITIVE_INFINITY);ml(this.right,l.reverse())}else{const l=this.right.splice(this.left.length+this.right.length-r,Number.POSITIVE_INFINITY);ml(this.left,l.reverse())}}}function ml(a,r){let l=0;if(r.length<1e4)a.push(...r);else for(;l<r.length;)a.push(...r.slice(l,l+1e4)),l+=1e4}function iy(a){const r={};let l=-1,s,c,d,f,h,g,p;const y=new nS(a);for(;++l<y.length;){for(;l in r;)l=r[l];if(s=y.get(l),l&&s[1].type==="chunkFlow"&&y.get(l-1)[1].type==="listItemPrefix"&&(g=s[1]._tokenizer.events,d=0,d<g.length&&g[d][1].type==="lineEndingBlank"&&(d+=2),d<g.length&&g[d][1].type==="content"))for(;++d<g.length&&g[d][1].type!=="content";)g[d][1].type==="chunkText"&&(g[d][1]._isInFirstContentOfListItem=!0,d++);if(s[0]==="enter")s[1].contentType&&(Object.assign(r,tS(y,l)),l=r[l],p=!0);else if(s[1]._container){for(d=l,c=void 0;d--;)if(f=y.get(d),f[1].type==="lineEnding"||f[1].type==="lineEndingBlank")f[0]==="enter"&&(c&&(y.get(c)[1].type="lineEndingBlank"),f[1].type="lineEnding",c=d);else if(!(f[1].type==="linePrefix"||f[1].type==="listItemIndent"))break;c&&(s[1].end={...y.get(c)[1].start},h=y.slice(c,l),h.unshift(s),y.splice(c,l-c+1,h))}}return Gt(a,0,Number.POSITIVE_INFINITY,y.slice(0)),!p}function tS(a,r){const l=a.get(r)[1],s=a.get(r)[2];let c=r-1;const d=[];let f=l._tokenizer;f||(f=s.parser[l.contentType](l.start),l._contentTypeTextTrailing&&(f._contentTypeTextTrailing=!0));const h=f.events,g=[],p={};let y,b,S=-1,v=l,L=0,N=0;const H=[N];for(;v;){for(;a.get(++c)[1]!==v;);d.push(c),v._tokenizer||(y=s.sliceStream(v),v.next||y.push(null),b&&f.defineSkip(v.start),v._isInFirstContentOfListItem&&(f._gfmTasklistFirstContentOfListItem=!0),f.write(y),v._isInFirstContentOfListItem&&(f._gfmTasklistFirstContentOfListItem=void 0)),b=v,v=v.next}for(v=l;++S<h.length;)h[S][0]==="exit"&&h[S-1][0]==="enter"&&h[S][1].type===h[S-1][1].type&&h[S][1].start.line!==h[S][1].end.line&&(N=S+1,H.push(N),v._tokenizer=void 0,v.previous=void 0,v=v.next);for(f.events=[],v?(v._tokenizer=void 0,v.previous=void 0):H.pop(),S=H.length;S--;){const P=h.slice(H[S],H[S+1]),G=d.pop();g.push([G,G+P.length-1]),a.splice(G,2,P)}for(g.reverse(),S=-1;++S<g.length;)p[L+g[S][0]]=L+g[S][1],L+=g[S][1]-g[S][0]-1;return p}const aS={resolve:rS,tokenize:lS},iS={partial:!0,tokenize:sS};function rS(a){return iy(a),a}function lS(a,r){let l;return s;function s(h){return a.enter("content"),l=a.enter("chunkContent",{contentType:"content"}),c(h)}function c(h){return h===null?d(h):Re(h)?a.check(iS,f,d)(h):(a.consume(h),c)}function d(h){return a.exit("chunkContent"),a.exit("content"),r(h)}function f(h){return a.consume(h),a.exit("chunkContent"),l.next=a.enter("chunkContent",{contentType:"content",previous:l}),l=l.next,c}}function sS(a,r,l){const s=this;return c;function c(f){return a.exit("chunkContent"),a.enter("lineEnding"),a.consume(f),a.exit("lineEnding"),cn(a,d,"linePrefix")}function d(f){if(f===null||Re(f))return l(f);const h=s.events[s.events.length-1];return!s.parser.constructs.disable.null.includes("codeIndented")&&h&&h[1].type==="linePrefix"&&h[2].sliceSerialize(h[1],!0).length>=4?r(f):a.interrupt(s.parser.constructs.flow,l,r)(f)}}function ry(a,r,l,s,c,d,f,h,g){const p=g||Number.POSITIVE_INFINITY;let y=0;return b;function b(P){return P===60?(a.enter(s),a.enter(c),a.enter(d),a.consume(P),a.exit(d),S):P===null||P===32||P===41||Hc(P)?l(P):(a.enter(s),a.enter(f),a.enter(h),a.enter("chunkString",{contentType:"string"}),N(P))}function S(P){return P===62?(a.enter(d),a.consume(P),a.exit(d),a.exit(c),a.exit(s),r):(a.enter(h),a.enter("chunkString",{contentType:"string"}),v(P))}function v(P){return P===62?(a.exit("chunkString"),a.exit(h),S(P)):P===null||P===60||Re(P)?l(P):(a.consume(P),P===92?L:v)}function L(P){return P===60||P===62||P===92?(a.consume(P),v):v(P)}function N(P){return!y&&(P===null||P===41||it(P))?(a.exit("chunkString"),a.exit(h),a.exit(f),a.exit(s),r(P)):y<p&&P===40?(a.consume(P),y++,N):P===41?(a.consume(P),y--,N):P===null||P===32||P===40||Hc(P)?l(P):(a.consume(P),P===92?H:N)}function H(P){return P===40||P===41||P===92?(a.consume(P),N):N(P)}}function ly(a,r,l,s,c,d){const f=this;let h=0,g;return p;function p(v){return a.enter(s),a.enter(c),a.consume(v),a.exit(c),a.enter(d),y}function y(v){return h>999||v===null||v===91||v===93&&!g||v===94&&!h&&"_hiddenFootnoteSupport"in f.parser.constructs?l(v):v===93?(a.exit(d),a.enter(c),a.consume(v),a.exit(c),a.exit(s),r):Re(v)?(a.enter("lineEnding"),a.consume(v),a.exit("lineEnding"),y):(a.enter("chunkString",{contentType:"string"}),b(v))}function b(v){return v===null||v===91||v===93||Re(v)||h++>999?(a.exit("chunkString"),y(v)):(a.consume(v),g||(g=!Qe(v)),v===92?S:b)}function S(v){return v===91||v===92||v===93?(a.consume(v),h++,b):b(v)}}function sy(a,r,l,s,c,d){let f;return h;function h(S){return S===34||S===39||S===40?(a.enter(s),a.enter(c),a.consume(S),a.exit(c),f=S===40?41:S,g):l(S)}function g(S){return S===f?(a.enter(c),a.consume(S),a.exit(c),a.exit(s),r):(a.enter(d),p(S))}function p(S){return S===f?(a.exit(d),g(f)):S===null?l(S):Re(S)?(a.enter("lineEnding"),a.consume(S),a.exit("lineEnding"),cn(a,p,"linePrefix")):(a.enter("chunkString",{contentType:"string"}),y(S))}function y(S){return S===f||S===null||Re(S)?(a.exit("chunkString"),p(S)):(a.consume(S),S===92?b:y)}function b(S){return S===f||S===92?(a.consume(S),y):y(S)}}function zl(a,r){let l;return s;function s(c){return Re(c)?(a.enter("lineEnding"),a.consume(c),a.exit("lineEnding"),l=!0,s):Qe(c)?cn(a,s,l?"linePrefix":"lineSuffix")(c):r(c)}}const oS={name:"definition",tokenize:cS},uS={partial:!0,tokenize:dS};function cS(a,r,l){const s=this;let c;return d;function d(v){return a.enter("definition"),f(v)}function f(v){return ly.call(s,a,h,l,"definitionLabel","definitionLabelMarker","definitionLabelString")(v)}function h(v){return c=mr(s.sliceSerialize(s.events[s.events.length-1][1]).slice(1,-1)),v===58?(a.enter("definitionMarker"),a.consume(v),a.exit("definitionMarker"),g):l(v)}function g(v){return it(v)?zl(a,p)(v):p(v)}function p(v){return ry(a,y,l,"definitionDestination","definitionDestinationLiteral","definitionDestinationLiteralMarker","definitionDestinationRaw","definitionDestinationString")(v)}function y(v){return a.attempt(uS,b,b)(v)}function b(v){return Qe(v)?cn(a,S,"whitespace")(v):S(v)}function S(v){return v===null||Re(v)?(a.exit("definition"),s.parser.defined.push(c),r(v)):l(v)}}function dS(a,r,l){return s;function s(h){return it(h)?zl(a,c)(h):l(h)}function c(h){return sy(a,d,l,"definitionTitle","definitionTitleMarker","definitionTitleString")(h)}function d(h){return Qe(h)?cn(a,f,"whitespace")(h):f(h)}function f(h){return h===null||Re(h)?r(h):l(h)}}const fS={name:"hardBreakEscape",tokenize:pS};function pS(a,r,l){return s;function s(d){return a.enter("hardBreakEscape"),a.consume(d),c}function c(d){return Re(d)?(a.exit("hardBreakEscape"),r(d)):l(d)}}const hS={name:"headingAtx",resolve:mS,tokenize:gS};function mS(a,r){let l=a.length-2,s=3,c,d;return a[s][1].type==="whitespace"&&(s+=2),l-2>s&&a[l][1].type==="whitespace"&&(l-=2),a[l][1].type==="atxHeadingSequence"&&(s===l-1||l-4>s&&a[l-2][1].type==="whitespace")&&(l-=s+1===l?2:4),l>s&&(c={type:"atxHeadingText",start:a[s][1].start,end:a[l][1].end},d={type:"chunkText",start:a[s][1].start,end:a[l][1].end,contentType:"text"},Gt(a,s,l-s+1,[["enter",c,r],["enter",d,r],["exit",d,r],["exit",c,r]])),a}function gS(a,r,l){let s=0;return c;function c(y){return a.enter("atxHeading"),d(y)}function d(y){return a.enter("atxHeadingSequence"),f(y)}function f(y){return y===35&&s++<6?(a.consume(y),f):y===null||it(y)?(a.exit("atxHeadingSequence"),h(y)):l(y)}function h(y){return y===35?(a.enter("atxHeadingSequence"),g(y)):y===null||Re(y)?(a.exit("atxHeading"),r(y)):Qe(y)?cn(a,h,"whitespace")(y):(a.enter("atxHeadingText"),p(y))}function g(y){return y===35?(a.consume(y),g):(a.exit("atxHeadingSequence"),h(y))}function p(y){return y===null||y===35||it(y)?(a.exit("atxHeadingText"),h(y)):(a.consume(y),p)}}const yS=["address","article","aside","base","basefont","blockquote","body","caption","center","col","colgroup","dd","details","dialog","dir","div","dl","dt","fieldset","figcaption","figure","footer","form","frame","frameset","h1","h2","h3","h4","h5","h6","head","header","hr","html","iframe","legend","li","link","main","menu","menuitem","nav","noframes","ol","optgroup","option","p","param","search","section","summary","table","tbody","td","tfoot","th","thead","title","tr","track","ul"],Jm=["pre","script","style","textarea"],bS={concrete:!0,name:"htmlFlow",resolveTo:SS,tokenize:ES},zS={partial:!0,tokenize:xS},vS={partial:!0,tokenize:DS};function SS(a){let r=a.length;for(;r--&&!(a[r][0]==="enter"&&a[r][1].type==="htmlFlow"););return r>1&&a[r-2][1].type==="linePrefix"&&(a[r][1].start=a[r-2][1].start,a[r+1][1].start=a[r-2][1].start,a.splice(r-2,2)),a}function ES(a,r,l){const s=this;let c,d,f,h,g;return p;function p(E){return y(E)}function y(E){return a.enter("htmlFlow"),a.enter("htmlFlowData"),a.consume(E),b}function b(E){return E===33?(a.consume(E),S):E===47?(a.consume(E),d=!0,N):E===63?(a.consume(E),c=3,s.interrupt?r:D):Yt(E)?(a.consume(E),f=String.fromCharCode(E),H):l(E)}function S(E){return E===45?(a.consume(E),c=2,v):E===91?(a.consume(E),c=5,h=0,L):Yt(E)?(a.consume(E),c=4,s.interrupt?r:D):l(E)}function v(E){return E===45?(a.consume(E),s.interrupt?r:D):l(E)}function L(E){const ie="CDATA[";return E===ie.charCodeAt(h++)?(a.consume(E),h===ie.length?s.interrupt?r:ee:L):l(E)}function N(E){return Yt(E)?(a.consume(E),f=String.fromCharCode(E),H):l(E)}function H(E){if(E===null||E===47||E===62||it(E)){const ie=E===47,ye=f.toLowerCase();return!ie&&!d&&Jm.includes(ye)?(c=1,s.interrupt?r(E):ee(E)):yS.includes(f.toLowerCase())?(c=6,ie?(a.consume(E),P):s.interrupt?r(E):ee(E)):(c=7,s.interrupt&&!s.parser.lazy[s.now().line]?l(E):d?G(E):q(E))}return E===45||gt(E)?(a.consume(E),f+=String.fromCharCode(E),H):l(E)}function P(E){return E===62?(a.consume(E),s.interrupt?r:ee):l(E)}function G(E){return Qe(E)?(a.consume(E),G):ue(E)}function q(E){return E===47?(a.consume(E),ue):E===58||E===95||Yt(E)?(a.consume(E),ce):Qe(E)?(a.consume(E),q):ue(E)}function ce(E){return E===45||E===46||E===58||E===95||gt(E)?(a.consume(E),ce):be(E)}function be(E){return E===61?(a.consume(E),X):Qe(E)?(a.consume(E),be):q(E)}function X(E){return E===null||E===60||E===61||E===62||E===96?l(E):E===34||E===39?(a.consume(E),g=E,R):Qe(E)?(a.consume(E),X):ne(E)}function R(E){return E===g?(a.consume(E),g=null,pe):E===null||Re(E)?l(E):(a.consume(E),R)}function ne(E){return E===null||E===34||E===39||E===47||E===60||E===61||E===62||E===96||it(E)?be(E):(a.consume(E),ne)}function pe(E){return E===47||E===62||Qe(E)?q(E):l(E)}function ue(E){return E===62?(a.consume(E),ae):l(E)}function ae(E){return E===null||Re(E)?ee(E):Qe(E)?(a.consume(E),ae):l(E)}function ee(E){return E===45&&c===2?(a.consume(E),C):E===60&&c===1?(a.consume(E),K):E===62&&c===4?(a.consume(E),T):E===63&&c===3?(a.consume(E),D):E===93&&c===5?(a.consume(E),_e):Re(E)&&(c===6||c===7)?(a.exit("htmlFlowData"),a.check(zS,B,Te)(E)):E===null||Re(E)?(a.exit("htmlFlowData"),Te(E)):(a.consume(E),ee)}function Te(E){return a.check(vS,de,B)(E)}function de(E){return a.enter("lineEnding"),a.consume(E),a.exit("lineEnding"),J}function J(E){return E===null||Re(E)?Te(E):(a.enter("htmlFlowData"),ee(E))}function C(E){return E===45?(a.consume(E),D):ee(E)}function K(E){return E===47?(a.consume(E),f="",re):ee(E)}function re(E){if(E===62){const ie=f.toLowerCase();return Jm.includes(ie)?(a.consume(E),T):ee(E)}return Yt(E)&&f.length<8?(a.consume(E),f+=String.fromCharCode(E),re):ee(E)}function _e(E){return E===93?(a.consume(E),D):ee(E)}function D(E){return E===62?(a.consume(E),T):E===45&&c===2?(a.consume(E),D):ee(E)}function T(E){return E===null||Re(E)?(a.exit("htmlFlowData"),B(E)):(a.consume(E),T)}function B(E){return a.exit("htmlFlow"),r(E)}}function DS(a,r,l){const s=this;return c;function c(f){return Re(f)?(a.enter("lineEnding"),a.consume(f),a.exit("lineEnding"),d):l(f)}function d(f){return s.parser.lazy[s.now().line]?l(f):r(f)}}function xS(a,r,l){return s;function s(c){return a.enter("lineEnding"),a.consume(c),a.exit("lineEnding"),a.attempt(eo,r,l)}}const TS={name:"htmlText",tokenize:AS};function AS(a,r,l){const s=this;let c,d,f;return h;function h(D){return a.enter("htmlText"),a.enter("htmlTextData"),a.consume(D),g}function g(D){return D===33?(a.consume(D),p):D===47?(a.consume(D),be):D===63?(a.consume(D),q):Yt(D)?(a.consume(D),ne):l(D)}function p(D){return D===45?(a.consume(D),y):D===91?(a.consume(D),d=0,L):Yt(D)?(a.consume(D),G):l(D)}function y(D){return D===45?(a.consume(D),v):l(D)}function b(D){return D===null?l(D):D===45?(a.consume(D),S):Re(D)?(f=b,K(D)):(a.consume(D),b)}function S(D){return D===45?(a.consume(D),v):b(D)}function v(D){return D===62?C(D):D===45?S(D):b(D)}function L(D){const T="CDATA[";return D===T.charCodeAt(d++)?(a.consume(D),d===T.length?N:L):l(D)}function N(D){return D===null?l(D):D===93?(a.consume(D),H):Re(D)?(f=N,K(D)):(a.consume(D),N)}function H(D){return D===93?(a.consume(D),P):N(D)}function P(D){return D===62?C(D):D===93?(a.consume(D),P):N(D)}function G(D){return D===null||D===62?C(D):Re(D)?(f=G,K(D)):(a.consume(D),G)}function q(D){return D===null?l(D):D===63?(a.consume(D),ce):Re(D)?(f=q,K(D)):(a.consume(D),q)}function ce(D){return D===62?C(D):q(D)}function be(D){return Yt(D)?(a.consume(D),X):l(D)}function X(D){return D===45||gt(D)?(a.consume(D),X):R(D)}function R(D){return Re(D)?(f=R,K(D)):Qe(D)?(a.consume(D),R):C(D)}function ne(D){return D===45||gt(D)?(a.consume(D),ne):D===47||D===62||it(D)?pe(D):l(D)}function pe(D){return D===47?(a.consume(D),C):D===58||D===95||Yt(D)?(a.consume(D),ue):Re(D)?(f=pe,K(D)):Qe(D)?(a.consume(D),pe):C(D)}function ue(D){return D===45||D===46||D===58||D===95||gt(D)?(a.consume(D),ue):ae(D)}function ae(D){return D===61?(a.consume(D),ee):Re(D)?(f=ae,K(D)):Qe(D)?(a.consume(D),ae):pe(D)}function ee(D){return D===null||D===60||D===61||D===62||D===96?l(D):D===34||D===39?(a.consume(D),c=D,Te):Re(D)?(f=ee,K(D)):Qe(D)?(a.consume(D),ee):(a.consume(D),de)}function Te(D){return D===c?(a.consume(D),c=void 0,J):D===null?l(D):Re(D)?(f=Te,K(D)):(a.consume(D),Te)}function de(D){return D===null||D===34||D===39||D===60||D===61||D===96?l(D):D===47||D===62||it(D)?pe(D):(a.consume(D),de)}function J(D){return D===47||D===62||it(D)?pe(D):l(D)}function C(D){return D===62?(a.consume(D),a.exit("htmlTextData"),a.exit("htmlText"),r):l(D)}function K(D){return a.exit("htmlTextData"),a.enter("lineEnding"),a.consume(D),a.exit("lineEnding"),re}function re(D){return Qe(D)?cn(a,_e,"linePrefix",s.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(D):_e(D)}function _e(D){return a.enter("htmlTextData"),f(D)}}const dd={name:"labelEnd",resolveAll:IS,resolveTo:MS,tokenize:_S},wS={tokenize:CS},RS={tokenize:LS},kS={tokenize:OS};function IS(a){let r=-1;const l=[];for(;++r<a.length;){const s=a[r][1];if(l.push(a[r]),s.type==="labelImage"||s.type==="labelLink"||s.type==="labelEnd"){const c=s.type==="labelImage"?4:2;s.type="data",r+=c}}return a.length!==l.length&&Gt(a,0,a.length,l),a}function MS(a,r){let l=a.length,s=0,c,d,f,h;for(;l--;)if(c=a[l][1],d){if(c.type==="link"||c.type==="labelLink"&&c._inactive)break;a[l][0]==="enter"&&c.type==="labelLink"&&(c._inactive=!0)}else if(f){if(a[l][0]==="enter"&&(c.type==="labelImage"||c.type==="labelLink")&&!c._balanced&&(d=l,c.type!=="labelLink")){s=2;break}}else c.type==="labelEnd"&&(f=l);const g={type:a[d][1].type==="labelLink"?"link":"image",start:{...a[d][1].start},end:{...a[a.length-1][1].end}},p={type:"label",start:{...a[d][1].start},end:{...a[f][1].end}},y={type:"labelText",start:{...a[d+s+2][1].end},end:{...a[f-2][1].start}};return h=[["enter",g,r],["enter",p,r]],h=It(h,a.slice(d+1,d+s+3)),h=It(h,[["enter",y,r]]),h=It(h,cd(r.parser.constructs.insideSpan.null,a.slice(d+s+4,f-3),r)),h=It(h,[["exit",y,r],a[f-2],a[f-1],["exit",p,r]]),h=It(h,a.slice(f+1)),h=It(h,[["exit",g,r]]),Gt(a,d,a.length,h),a}function _S(a,r,l){const s=this;let c=s.events.length,d,f;for(;c--;)if((s.events[c][1].type==="labelImage"||s.events[c][1].type==="labelLink")&&!s.events[c][1]._balanced){d=s.events[c][1];break}return h;function h(S){return d?d._inactive?b(S):(f=s.parser.defined.includes(mr(s.sliceSerialize({start:d.end,end:s.now()}))),a.enter("labelEnd"),a.enter("labelMarker"),a.consume(S),a.exit("labelMarker"),a.exit("labelEnd"),g):l(S)}function g(S){return S===40?a.attempt(wS,y,f?y:b)(S):S===91?a.attempt(RS,y,f?p:b)(S):f?y(S):b(S)}function p(S){return a.attempt(kS,y,b)(S)}function y(S){return r(S)}function b(S){return d._balanced=!0,l(S)}}function CS(a,r,l){return s;function s(b){return a.enter("resource"),a.enter("resourceMarker"),a.consume(b),a.exit("resourceMarker"),c}function c(b){return it(b)?zl(a,d)(b):d(b)}function d(b){return b===41?y(b):ry(a,f,h,"resourceDestination","resourceDestinationLiteral","resourceDestinationLiteralMarker","resourceDestinationRaw","resourceDestinationString",32)(b)}function f(b){return it(b)?zl(a,g)(b):y(b)}function h(b){return l(b)}function g(b){return b===34||b===39||b===40?sy(a,p,l,"resourceTitle","resourceTitleMarker","resourceTitleString")(b):y(b)}function p(b){return it(b)?zl(a,y)(b):y(b)}function y(b){return b===41?(a.enter("resourceMarker"),a.consume(b),a.exit("resourceMarker"),a.exit("resource"),r):l(b)}}function LS(a,r,l){const s=this;return c;function c(h){return ly.call(s,a,d,f,"reference","referenceMarker","referenceString")(h)}function d(h){return s.parser.defined.includes(mr(s.sliceSerialize(s.events[s.events.length-1][1]).slice(1,-1)))?r(h):l(h)}function f(h){return l(h)}}function OS(a,r,l){return s;function s(d){return a.enter("reference"),a.enter("referenceMarker"),a.consume(d),a.exit("referenceMarker"),c}function c(d){return d===93?(a.enter("referenceMarker"),a.consume(d),a.exit("referenceMarker"),a.exit("reference"),r):l(d)}}const NS={name:"labelStartImage",resolveAll:dd.resolveAll,tokenize:WS};function WS(a,r,l){const s=this;return c;function c(h){return a.enter("labelImage"),a.enter("labelImageMarker"),a.consume(h),a.exit("labelImageMarker"),d}function d(h){return h===91?(a.enter("labelMarker"),a.consume(h),a.exit("labelMarker"),a.exit("labelImage"),f):l(h)}function f(h){return h===94&&"_hiddenFootnoteSupport"in s.parser.constructs?l(h):r(h)}}const US={name:"labelStartLink",resolveAll:dd.resolveAll,tokenize:PS};function PS(a,r,l){const s=this;return c;function c(f){return a.enter("labelLink"),a.enter("labelMarker"),a.consume(f),a.exit("labelMarker"),a.exit("labelLink"),d}function d(f){return f===94&&"_hiddenFootnoteSupport"in s.parser.constructs?l(f):r(f)}}const Tc={name:"lineEnding",tokenize:BS};function BS(a,r){return l;function l(s){return a.enter("lineEnding"),a.consume(s),a.exit("lineEnding"),cn(a,r,"linePrefix")}}const Vs={name:"thematicBreak",tokenize:jS};function jS(a,r,l){let s=0,c;return d;function d(p){return a.enter("thematicBreak"),f(p)}function f(p){return c=p,h(p)}function h(p){return p===c?(a.enter("thematicBreakSequence"),g(p)):s>=3&&(p===null||Re(p))?(a.exit("thematicBreak"),r(p)):l(p)}function g(p){return p===c?(a.consume(p),s++,g):(a.exit("thematicBreakSequence"),Qe(p)?cn(a,h,"whitespace")(p):h(p))}}const tt={continuation:{tokenize:VS},exit:YS,name:"list",tokenize:ZS},XS={partial:!0,tokenize:GS},HS={partial:!0,tokenize:qS};function ZS(a,r,l){const s=this,c=s.events[s.events.length-1];let d=c&&c[1].type==="linePrefix"?c[2].sliceSerialize(c[1],!0).length:0,f=0;return h;function h(v){const L=s.containerState.type||(v===42||v===43||v===45?"listUnordered":"listOrdered");if(L==="listUnordered"?!s.containerState.marker||v===s.containerState.marker:Zc(v)){if(s.containerState.type||(s.containerState.type=L,a.enter(L,{_container:!0})),L==="listUnordered")return a.enter("listItemPrefix"),v===42||v===45?a.check(Vs,l,p)(v):p(v);if(!s.interrupt||v===49)return a.enter("listItemPrefix"),a.enter("listItemValue"),g(v)}return l(v)}function g(v){return Zc(v)&&++f<10?(a.consume(v),g):(!s.interrupt||f<2)&&(s.containerState.marker?v===s.containerState.marker:v===41||v===46)?(a.exit("listItemValue"),p(v)):l(v)}function p(v){return a.enter("listItemMarker"),a.consume(v),a.exit("listItemMarker"),s.containerState.marker=s.containerState.marker||v,a.check(eo,s.interrupt?l:y,a.attempt(XS,S,b))}function y(v){return s.containerState.initialBlankLine=!0,d++,S(v)}function b(v){return Qe(v)?(a.enter("listItemPrefixWhitespace"),a.consume(v),a.exit("listItemPrefixWhitespace"),S):l(v)}function S(v){return s.containerState.size=d+s.sliceSerialize(a.exit("listItemPrefix"),!0).length,r(v)}}function VS(a,r,l){const s=this;return s.containerState._closeFlow=void 0,a.check(eo,c,d);function c(h){return s.containerState.furtherBlankLines=s.containerState.furtherBlankLines||s.containerState.initialBlankLine,cn(a,r,"listItemIndent",s.containerState.size+1)(h)}function d(h){return s.containerState.furtherBlankLines||!Qe(h)?(s.containerState.furtherBlankLines=void 0,s.containerState.initialBlankLine=void 0,f(h)):(s.containerState.furtherBlankLines=void 0,s.containerState.initialBlankLine=void 0,a.attempt(HS,r,f)(h))}function f(h){return s.containerState._closeFlow=!0,s.interrupt=void 0,cn(a,a.attempt(tt,r,l),"linePrefix",s.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(h)}}function qS(a,r,l){const s=this;return cn(a,c,"listItemIndent",s.containerState.size+1);function c(d){const f=s.events[s.events.length-1];return f&&f[1].type==="listItemIndent"&&f[2].sliceSerialize(f[1],!0).length===s.containerState.size?r(d):l(d)}}function YS(a){a.exit(this.containerState.type)}function GS(a,r,l){const s=this;return cn(a,c,"listItemPrefixWhitespace",s.parser.constructs.disable.null.includes("codeIndented")?void 0:5);function c(d){const f=s.events[s.events.length-1];return!Qe(d)&&f&&f[1].type==="listItemPrefixWhitespace"?r(d):l(d)}}const $m={name:"setextUnderline",resolveTo:QS,tokenize:KS};function QS(a,r){let l=a.length,s,c,d;for(;l--;)if(a[l][0]==="enter"){if(a[l][1].type==="content"){s=l;break}a[l][1].type==="paragraph"&&(c=l)}else a[l][1].type==="content"&&a.splice(l,1),!d&&a[l][1].type==="definition"&&(d=l);const f={type:"setextHeading",start:{...a[s][1].start},end:{...a[a.length-1][1].end}};return a[c][1].type="setextHeadingText",d?(a.splice(c,0,["enter",f,r]),a.splice(d+1,0,["exit",a[s][1],r]),a[s][1].end={...a[d][1].end}):a[s][1]=f,a.push(["exit",f,r]),a}function KS(a,r,l){const s=this;let c;return d;function d(p){let y=s.events.length,b;for(;y--;)if(s.events[y][1].type!=="lineEnding"&&s.events[y][1].type!=="linePrefix"&&s.events[y][1].type!=="content"){b=s.events[y][1].type==="paragraph";break}return!s.parser.lazy[s.now().line]&&(s.interrupt||b)?(a.enter("setextHeadingLine"),c=p,f(p)):l(p)}function f(p){return a.enter("setextHeadingLineSequence"),h(p)}function h(p){return p===c?(a.consume(p),h):(a.exit("setextHeadingLineSequence"),Qe(p)?cn(a,g,"lineSuffix")(p):g(p))}function g(p){return p===null||Re(p)?(a.exit("setextHeadingLine"),r(p)):l(p)}}const FS={tokenize:JS};function JS(a){const r=this,l=a.attempt(eo,s,a.attempt(this.parser.constructs.flowInitial,c,cn(a,a.attempt(this.parser.constructs.flow,c,a.attempt(aS,c)),"linePrefix")));return l;function s(d){if(d===null){a.consume(d);return}return a.enter("lineEndingBlank"),a.consume(d),a.exit("lineEndingBlank"),r.currentConstruct=void 0,l}function c(d){if(d===null){a.consume(d);return}return a.enter("lineEnding"),a.consume(d),a.exit("lineEnding"),r.currentConstruct=void 0,l}}const $S={resolveAll:uy()},eE=oy("string"),nE=oy("text");function oy(a){return{resolveAll:uy(a==="text"?tE:void 0),tokenize:r};function r(l){const s=this,c=this.parser.constructs[a],d=l.attempt(c,f,h);return f;function f(y){return p(y)?d(y):h(y)}function h(y){if(y===null){l.consume(y);return}return l.enter("data"),l.consume(y),g}function g(y){return p(y)?(l.exit("data"),d(y)):(l.consume(y),g)}function p(y){if(y===null)return!0;const b=c[y];let S=-1;if(b)for(;++S<b.length;){const v=b[S];if(!v.previous||v.previous.call(s,s.previous))return!0}return!1}}}function uy(a){return r;function r(l,s){let c=-1,d;for(;++c<=l.length;)d===void 0?l[c]&&l[c][1].type==="data"&&(d=c,c++):(!l[c]||l[c][1].type!=="data")&&(c!==d+2&&(l[d][1].end=l[c-1][1].end,l.splice(d+2,c-d-2),c=d+2),d=void 0);return a?a(l,s):l}}function tE(a,r){let l=0;for(;++l<=a.length;)if((l===a.length||a[l][1].type==="lineEnding")&&a[l-1][1].type==="data"){const s=a[l-1][1],c=r.sliceStream(s);let d=c.length,f=-1,h=0,g;for(;d--;){const p=c[d];if(typeof p=="string"){for(f=p.length;p.charCodeAt(f-1)===32;)h++,f--;if(f)break;f=-1}else if(p===-2)g=!0,h++;else if(p!==-1){d++;break}}if(r._contentTypeTextTrailing&&l===a.length&&(h=0),h){const p={type:l===a.length||g||h<2?"lineSuffix":"hardBreakTrailing",start:{_bufferIndex:d?f:s.start._bufferIndex+f,_index:s.start._index+d,line:s.end.line,column:s.end.column-h,offset:s.end.offset-h},end:{...s.end}};s.end={...p.start},s.start.offset===s.end.offset?Object.assign(s,p):(a.splice(l,0,["enter",p,r],["exit",p,r]),l+=2)}l++}return a}const aE={42:tt,43:tt,45:tt,48:tt,49:tt,50:tt,51:tt,52:tt,53:tt,54:tt,55:tt,56:tt,57:tt,62:ny},iE={91:oS},rE={[-2]:xc,[-1]:xc,32:xc},lE={35:hS,42:Vs,45:[$m,Vs],60:bS,61:$m,95:Vs,96:Fm,126:Fm},sE={38:ay,92:ty},oE={[-5]:Tc,[-4]:Tc,[-3]:Tc,33:NS,38:ay,42:Vc,60:[Uv,TS],91:US,92:[fS,ty],93:dd,95:Vc,96:Fv},uE={null:[Vc,$S]},cE={null:[42,95]},dE={null:[]},fE=Object.freeze(Object.defineProperty({__proto__:null,attentionMarkers:cE,contentInitial:iE,disable:dE,document:aE,flow:lE,flowInitial:rE,insideSpan:uE,string:sE,text:oE},Symbol.toStringTag,{value:"Module"}));function pE(a,r,l){let s={_bufferIndex:-1,_index:0,line:l&&l.line||1,column:l&&l.column||1,offset:l&&l.offset||0};const c={},d=[];let f=[],h=[];const g={attempt:R(be),check:R(X),consume:G,enter:q,exit:ce,interrupt:R(X,{interrupt:!0})},p={code:null,containerState:{},defineSkip:N,events:[],now:L,parser:a,previous:null,sliceSerialize:S,sliceStream:v,write:b};let y=r.tokenize.call(p,g);return r.resolveAll&&d.push(r),p;function b(ae){return f=It(f,ae),H(),f[f.length-1]!==null?[]:(ne(r,0),p.events=cd(d,p.events,p),p.events)}function S(ae,ee){return mE(v(ae),ee)}function v(ae){return hE(f,ae)}function L(){const{_bufferIndex:ae,_index:ee,line:Te,column:de,offset:J}=s;return{_bufferIndex:ae,_index:ee,line:Te,column:de,offset:J}}function N(ae){c[ae.line]=ae.column,ue()}function H(){let ae;for(;s._index<f.length;){const ee=f[s._index];if(typeof ee=="string")for(ae=s._index,s._bufferIndex<0&&(s._bufferIndex=0);s._index===ae&&s._bufferIndex<ee.length;)P(ee.charCodeAt(s._bufferIndex));else P(ee)}}function P(ae){y=y(ae)}function G(ae){Re(ae)?(s.line++,s.column=1,s.offset+=ae===-3?2:1,ue()):ae!==-1&&(s.column++,s.offset++),s._bufferIndex<0?s._index++:(s._bufferIndex++,s._bufferIndex===f[s._index].length&&(s._bufferIndex=-1,s._index++)),p.previous=ae}function q(ae,ee){const Te=ee||{};return Te.type=ae,Te.start=L(),p.events.push(["enter",Te,p]),h.push(Te),Te}function ce(ae){const ee=h.pop();return ee.end=L(),p.events.push(["exit",ee,p]),ee}function be(ae,ee){ne(ae,ee.from)}function X(ae,ee){ee.restore()}function R(ae,ee){return Te;function Te(de,J,C){let K,re,_e,D;return Array.isArray(de)?B(de):"tokenize"in de?B([de]):T(de);function T(ge){return Ie;function Ie(Je){const Ke=Je!==null&&ge[Je],qn=Je!==null&&ge.null,Mt=[...Array.isArray(Ke)?Ke:Ke?[Ke]:[],...Array.isArray(qn)?qn:qn?[qn]:[]];return B(Mt)(Je)}}function B(ge){return K=ge,re=0,ge.length===0?C:E(ge[re])}function E(ge){return Ie;function Ie(Je){return D=pe(),_e=ge,ge.partial||(p.currentConstruct=ge),ge.name&&p.parser.constructs.disable.null.includes(ge.name)?ye():ge.tokenize.call(ee?Object.assign(Object.create(p),ee):p,g,ie,ye)(Je)}}function ie(ge){return ae(_e,D),J}function ye(ge){return D.restore(),++re<K.length?E(K[re]):C}}}function ne(ae,ee){ae.resolveAll&&!d.includes(ae)&&d.push(ae),ae.resolve&&Gt(p.events,ee,p.events.length-ee,ae.resolve(p.events.slice(ee),p)),ae.resolveTo&&(p.events=ae.resolveTo(p.events,p))}function pe(){const ae=L(),ee=p.previous,Te=p.currentConstruct,de=p.events.length,J=Array.from(h);return{from:de,restore:C};function C(){s=ae,p.previous=ee,p.currentConstruct=Te,p.events.length=de,h=J,ue()}}function ue(){s.line in c&&s.column<2&&(s.column=c[s.line],s.offset+=c[s.line]-1)}}function hE(a,r){const l=r.start._index,s=r.start._bufferIndex,c=r.end._index,d=r.end._bufferIndex;let f;if(l===c)f=[a[l].slice(s,d)];else{if(f=a.slice(l,c),s>-1){const h=f[0];typeof h=="string"?f[0]=h.slice(s):f.shift()}d>0&&f.push(a[c].slice(0,d))}return f}function mE(a,r){let l=-1;const s=[];let c;for(;++l<a.length;){const d=a[l];let f;if(typeof d=="string")f=d;else switch(d){case-5:{f="\r";break}case-4:{f=`
`;break}case-3:{f=`\r
`;break}case-2:{f=r?" ":"	";break}case-1:{if(!r&&c)continue;f=" ";break}default:f=String.fromCharCode(d)}c=d===-2,s.push(f)}return s.join("")}function gE(a){const s={constructs:Dv([fE,...(a||{}).extensions||[]]),content:c(Mv),defined:[],document:c(Cv),flow:c(FS),lazy:{},string:c(eE),text:c(nE)};return s;function c(d){return f;function f(h){return pE(s,d,h)}}}function yE(a){for(;!iy(a););return a}const eg=/[\0\t\n\r]/g;function bE(){let a=1,r="",l=!0,s;return c;function c(d,f,h){const g=[];let p,y,b,S,v;for(d=r+(typeof d=="string"?d.toString():new TextDecoder(f||void 0).decode(d)),b=0,r="",l&&(d.charCodeAt(0)===65279&&b++,l=void 0);b<d.length;){if(eg.lastIndex=b,p=eg.exec(d),S=p&&p.index!==void 0?p.index:d.length,v=d.charCodeAt(S),!p){r=d.slice(b);break}if(v===10&&b===S&&s)g.push(-3),s=void 0;else switch(s&&(g.push(-5),s=void 0),b<S&&(g.push(d.slice(b,S)),a+=S-b),v){case 0:{g.push(65533),a++;break}case 9:{for(y=Math.ceil(a/4)*4,g.push(-2);a++<y;)g.push(-1);break}case 10:{g.push(-4),a=1;break}default:s=!0,a=1}b=S+1}return h&&(s&&g.push(-5),r&&g.push(r),g.push(null)),g}}const zE=/\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;function vE(a){return a.replace(zE,SE)}function SE(a,r,l){if(r)return r;if(l.charCodeAt(0)===35){const c=l.charCodeAt(1),d=c===120||c===88;return ey(l.slice(d?2:1),d?16:10)}return ud(l)||a}const cy={}.hasOwnProperty;function EE(a,r,l){return typeof r!="string"&&(l=r,r=void 0),DE(l)(yE(gE(l).document().write(bE()(a,r,!0))))}function DE(a){const r={transforms:[],canContainEols:["emphasis","fragment","heading","paragraph","strong"],enter:{autolink:d(Qt),autolinkProtocol:pe,autolinkEmail:pe,atxHeading:d(za),blockQuote:d(qn),characterEscape:pe,characterReference:pe,codeFenced:d(Mt),codeFencedFenceInfo:f,codeFencedFenceMeta:f,codeIndented:d(Mt,f),codeText:d(Dn,f),codeTextData:pe,data:pe,codeFlowValue:pe,definition:d(_t),definitionDestinationString:f,definitionLabelString:f,definitionTitleString:f,emphasis:d(yt),hardBreakEscape:d(Yn),hardBreakTrailing:d(Yn),htmlFlow:d(ki,f),htmlFlowData:pe,htmlText:d(ki,f),htmlTextData:pe,image:d(Ii),label:f,link:d(Qt),listItem:d(ei),listItemValue:S,listOrdered:d(va,b),listUnordered:d(va),paragraph:d(zr),reference:E,referenceString:f,resourceDestinationString:f,resourceTitleString:f,setextHeading:d(za),strong:d(vr),thematicBreak:d(Kt)},exit:{atxHeading:g(),atxHeadingSequence:be,autolink:g(),autolinkEmail:Ke,autolinkProtocol:Je,blockQuote:g(),characterEscapeValue:ue,characterReferenceMarkerHexadecimal:ye,characterReferenceMarkerNumeric:ye,characterReferenceValue:ge,characterReference:Ie,codeFenced:g(H),codeFencedFence:N,codeFencedFenceInfo:v,codeFencedFenceMeta:L,codeFlowValue:ue,codeIndented:g(P),codeText:g(J),codeTextData:ue,data:ue,definition:g(),definitionDestinationString:ce,definitionLabelString:G,definitionTitleString:q,emphasis:g(),hardBreakEscape:g(ee),hardBreakTrailing:g(ee),htmlFlow:g(Te),htmlFlowData:ue,htmlText:g(de),htmlTextData:ue,image:g(K),label:_e,labelText:re,lineEnding:ae,link:g(C),listItem:g(),listOrdered:g(),listUnordered:g(),paragraph:g(),referenceString:ie,resourceDestinationString:D,resourceTitleString:T,resource:B,setextHeading:g(ne),setextHeadingLineSequence:R,setextHeadingText:X,strong:g(),thematicBreak:g()}};dy(r,(a||{}).mdastExtensions||[]);const l={};return s;function s(Z){let te={type:"root",children:[]};const ve={stack:[te],tokenStack:[],config:r,enter:h,exit:p,buffer:f,resume:y,data:l},Ae=[];let Ve=-1;for(;++Ve<Z.length;)if(Z[Ve][1].type==="listOrdered"||Z[Ve][1].type==="listUnordered")if(Z[Ve][0]==="enter")Ae.push(Ve);else{const Ln=Ae.pop();Ve=c(Z,Ln,Ve)}for(Ve=-1;++Ve<Z.length;){const Ln=r[Z[Ve][0]];cy.call(Ln,Z[Ve][1].type)&&Ln[Z[Ve][1].type].call(Object.assign({sliceSerialize:Z[Ve][2].sliceSerialize},ve),Z[Ve][1])}if(ve.tokenStack.length>0){const Ln=ve.tokenStack[ve.tokenStack.length-1];(Ln[1]||ng).call(ve,void 0,Ln[0])}for(te.position={start:Ga(Z.length>0?Z[0][1].start:{line:1,column:1,offset:0}),end:Ga(Z.length>0?Z[Z.length-2][1].end:{line:1,column:1,offset:0})},Ve=-1;++Ve<r.transforms.length;)te=r.transforms[Ve](te)||te;return te}function c(Z,te,ve){let Ae=te-1,Ve=-1,Ln=!1,Ct,mn,zn,Nn;for(;++Ae<=ve;){const Fe=Z[Ae];switch(Fe[1].type){case"listUnordered":case"listOrdered":case"blockQuote":{Fe[0]==="enter"?Ve++:Ve--,Nn=void 0;break}case"lineEndingBlank":{Fe[0]==="enter"&&(Ct&&!Nn&&!Ve&&!zn&&(zn=Ae),Nn=void 0);break}case"linePrefix":case"listItemValue":case"listItemMarker":case"listItemPrefix":case"listItemPrefixWhitespace":break;default:Nn=void 0}if(!Ve&&Fe[0]==="enter"&&Fe[1].type==="listItemPrefix"||Ve===-1&&Fe[0]==="exit"&&(Fe[1].type==="listUnordered"||Fe[1].type==="listOrdered")){if(Ct){let Bt=Ae;for(mn=void 0;Bt--;){const Gn=Z[Bt];if(Gn[1].type==="lineEnding"||Gn[1].type==="lineEndingBlank"){if(Gn[0]==="exit")continue;mn&&(Z[mn][1].type="lineEndingBlank",Ln=!0),Gn[1].type="lineEnding",mn=Bt}else if(!(Gn[1].type==="linePrefix"||Gn[1].type==="blockQuotePrefix"||Gn[1].type==="blockQuotePrefixWhitespace"||Gn[1].type==="blockQuoteMarker"||Gn[1].type==="listItemIndent"))break}zn&&(!mn||zn<mn)&&(Ct._spread=!0),Ct.end=Object.assign({},mn?Z[mn][1].start:Fe[1].end),Z.splice(mn||Ae,0,["exit",Ct,Fe[2]]),Ae++,ve++}if(Fe[1].type==="listItemPrefix"){const Bt={type:"listItem",_spread:!1,start:Object.assign({},Fe[1].start),end:void 0};Ct=Bt,Z.splice(Ae,0,["enter",Bt,Fe[2]]),Ae++,ve++,zn=void 0,Nn=!0}}}return Z[te][1]._spread=Ln,ve}function d(Z,te){return ve;function ve(Ae){h.call(this,Z(Ae),Ae),te&&te.call(this,Ae)}}function f(){this.stack.push({type:"fragment",children:[]})}function h(Z,te,ve){this.stack[this.stack.length-1].children.push(Z),this.stack.push(Z),this.tokenStack.push([te,ve||void 0]),Z.position={start:Ga(te.start),end:void 0}}function g(Z){return te;function te(ve){Z&&Z.call(this,ve),p.call(this,ve)}}function p(Z,te){const ve=this.stack.pop(),Ae=this.tokenStack.pop();if(Ae)Ae[0].type!==Z.type&&(te?te.call(this,Z,Ae[0]):(Ae[1]||ng).call(this,Z,Ae[0]));else throw new Error("Cannot close `"+Z.type+"` ("+bl({start:Z.start,end:Z.end})+"): it’s not open");ve.position.end=Ga(Z.end)}function y(){return Sv(this.stack.pop())}function b(){this.data.expectingFirstListItemValue=!0}function S(Z){if(this.data.expectingFirstListItemValue){const te=this.stack[this.stack.length-2];te.start=Number.parseInt(this.sliceSerialize(Z),10),this.data.expectingFirstListItemValue=void 0}}function v(){const Z=this.resume(),te=this.stack[this.stack.length-1];te.lang=Z}function L(){const Z=this.resume(),te=this.stack[this.stack.length-1];te.meta=Z}function N(){this.data.flowCodeInside||(this.buffer(),this.data.flowCodeInside=!0)}function H(){const Z=this.resume(),te=this.stack[this.stack.length-1];te.value=Z.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g,""),this.data.flowCodeInside=void 0}function P(){const Z=this.resume(),te=this.stack[this.stack.length-1];te.value=Z.replace(/(\r?\n|\r)$/g,"")}function G(Z){const te=this.resume(),ve=this.stack[this.stack.length-1];ve.label=te,ve.identifier=mr(this.sliceSerialize(Z)).toLowerCase()}function q(){const Z=this.resume(),te=this.stack[this.stack.length-1];te.title=Z}function ce(){const Z=this.resume(),te=this.stack[this.stack.length-1];te.url=Z}function be(Z){const te=this.stack[this.stack.length-1];if(!te.depth){const ve=this.sliceSerialize(Z).length;te.depth=ve}}function X(){this.data.setextHeadingSlurpLineEnding=!0}function R(Z){const te=this.stack[this.stack.length-1];te.depth=this.sliceSerialize(Z).codePointAt(0)===61?1:2}function ne(){this.data.setextHeadingSlurpLineEnding=void 0}function pe(Z){const ve=this.stack[this.stack.length-1].children;let Ae=ve[ve.length-1];(!Ae||Ae.type!=="text")&&(Ae=bn(),Ae.position={start:Ga(Z.start),end:void 0},ve.push(Ae)),this.stack.push(Ae)}function ue(Z){const te=this.stack.pop();te.value+=this.sliceSerialize(Z),te.position.end=Ga(Z.end)}function ae(Z){const te=this.stack[this.stack.length-1];if(this.data.atHardBreak){const ve=te.children[te.children.length-1];ve.position.end=Ga(Z.end),this.data.atHardBreak=void 0;return}!this.data.setextHeadingSlurpLineEnding&&r.canContainEols.includes(te.type)&&(pe.call(this,Z),ue.call(this,Z))}function ee(){this.data.atHardBreak=!0}function Te(){const Z=this.resume(),te=this.stack[this.stack.length-1];te.value=Z}function de(){const Z=this.resume(),te=this.stack[this.stack.length-1];te.value=Z}function J(){const Z=this.resume(),te=this.stack[this.stack.length-1];te.value=Z}function C(){const Z=this.stack[this.stack.length-1];if(this.data.inReference){const te=this.data.referenceType||"shortcut";Z.type+="Reference",Z.referenceType=te,delete Z.url,delete Z.title}else delete Z.identifier,delete Z.label;this.data.referenceType=void 0}function K(){const Z=this.stack[this.stack.length-1];if(this.data.inReference){const te=this.data.referenceType||"shortcut";Z.type+="Reference",Z.referenceType=te,delete Z.url,delete Z.title}else delete Z.identifier,delete Z.label;this.data.referenceType=void 0}function re(Z){const te=this.sliceSerialize(Z),ve=this.stack[this.stack.length-2];ve.label=vE(te),ve.identifier=mr(te).toLowerCase()}function _e(){const Z=this.stack[this.stack.length-1],te=this.resume(),ve=this.stack[this.stack.length-1];if(this.data.inReference=!0,ve.type==="link"){const Ae=Z.children;ve.children=Ae}else ve.alt=te}function D(){const Z=this.resume(),te=this.stack[this.stack.length-1];te.url=Z}function T(){const Z=this.resume(),te=this.stack[this.stack.length-1];te.title=Z}function B(){this.data.inReference=void 0}function E(){this.data.referenceType="collapsed"}function ie(Z){const te=this.resume(),ve=this.stack[this.stack.length-1];ve.label=te,ve.identifier=mr(this.sliceSerialize(Z)).toLowerCase(),this.data.referenceType="full"}function ye(Z){this.data.characterReferenceType=Z.type}function ge(Z){const te=this.sliceSerialize(Z),ve=this.data.characterReferenceType;let Ae;ve?(Ae=ey(te,ve==="characterReferenceMarkerNumeric"?10:16),this.data.characterReferenceType=void 0):Ae=ud(te);const Ve=this.stack[this.stack.length-1];Ve.value+=Ae}function Ie(Z){const te=this.stack.pop();te.position.end=Ga(Z.end)}function Je(Z){ue.call(this,Z);const te=this.stack[this.stack.length-1];te.url=this.sliceSerialize(Z)}function Ke(Z){ue.call(this,Z);const te=this.stack[this.stack.length-1];te.url="mailto:"+this.sliceSerialize(Z)}function qn(){return{type:"blockquote",children:[]}}function Mt(){return{type:"code",lang:null,meta:null,value:""}}function Dn(){return{type:"inlineCode",value:""}}function _t(){return{type:"definition",identifier:"",label:null,title:null,url:""}}function yt(){return{type:"emphasis",children:[]}}function za(){return{type:"heading",depth:0,children:[]}}function Yn(){return{type:"break"}}function ki(){return{type:"html",value:""}}function Ii(){return{type:"image",title:null,url:"",alt:null}}function Qt(){return{type:"link",title:null,url:"",children:[]}}function va(Z){return{type:"list",ordered:Z.type==="listOrdered",start:null,spread:Z._spread,children:[]}}function ei(Z){return{type:"listItem",spread:Z._spread,checked:null,children:[]}}function zr(){return{type:"paragraph",children:[]}}function vr(){return{type:"strong",children:[]}}function bn(){return{type:"text",value:""}}function Kt(){return{type:"thematicBreak"}}}function Ga(a){return{line:a.line,column:a.column,offset:a.offset}}function dy(a,r){let l=-1;for(;++l<r.length;){const s=r[l];Array.isArray(s)?dy(a,s):xE(a,s)}}function xE(a,r){let l;for(l in r)if(cy.call(r,l))switch(l){case"canContainEols":{const s=r[l];s&&a[l].push(...s);break}case"transforms":{const s=r[l];s&&a[l].push(...s);break}case"enter":case"exit":{const s=r[l];s&&Object.assign(a[l],s);break}}}function ng(a,r){throw a?new Error("Cannot close `"+a.type+"` ("+bl({start:a.start,end:a.end})+"): a different token (`"+r.type+"`, "+bl({start:r.start,end:r.end})+") is open"):new Error("Cannot close document, a token (`"+r.type+"`, "+bl({start:r.start,end:r.end})+") is still open")}function TE(a){const r=this;r.parser=l;function l(s){return EE(s,{...r.data("settings"),...a,extensions:r.data("micromarkExtensions")||[],mdastExtensions:r.data("fromMarkdownExtensions")||[]})}}function AE(a,r){const l={type:"element",tagName:"blockquote",properties:{},children:a.wrap(a.all(r),!0)};return a.patch(r,l),a.applyData(r,l)}function wE(a,r){const l={type:"element",tagName:"br",properties:{},children:[]};return a.patch(r,l),[a.applyData(r,l),{type:"text",value:`
`}]}function RE(a,r){const l=r.value?r.value+`
`:"",s={},c=r.lang?r.lang.split(/\s+/):[];c.length>0&&(s.className=["language-"+c[0]]);let d={type:"element",tagName:"code",properties:s,children:[{type:"text",value:l}]};return r.meta&&(d.data={meta:r.meta}),a.patch(r,d),d=a.applyData(r,d),d={type:"element",tagName:"pre",properties:{},children:[d]},a.patch(r,d),d}function kE(a,r){const l={type:"element",tagName:"del",properties:{},children:a.all(r)};return a.patch(r,l),a.applyData(r,l)}function IE(a,r){const l={type:"element",tagName:"em",properties:{},children:a.all(r)};return a.patch(r,l),a.applyData(r,l)}function ME(a,r){const l=typeof a.options.clobberPrefix=="string"?a.options.clobberPrefix:"user-content-",s=String(r.identifier).toUpperCase(),c=br(s.toLowerCase()),d=a.footnoteOrder.indexOf(s);let f,h=a.footnoteCounts.get(s);h===void 0?(h=0,a.footnoteOrder.push(s),f=a.footnoteOrder.length):f=d+1,h+=1,a.footnoteCounts.set(s,h);const g={type:"element",tagName:"a",properties:{href:"#"+l+"fn-"+c,id:l+"fnref-"+c+(h>1?"-"+h:""),dataFootnoteRef:!0,ariaDescribedBy:["footnote-label"]},children:[{type:"text",value:String(f)}]};a.patch(r,g);const p={type:"element",tagName:"sup",properties:{},children:[g]};return a.patch(r,p),a.applyData(r,p)}function _E(a,r){const l={type:"element",tagName:"h"+r.depth,properties:{},children:a.all(r)};return a.patch(r,l),a.applyData(r,l)}function CE(a,r){if(a.options.allowDangerousHtml){const l={type:"raw",value:r.value};return a.patch(r,l),a.applyData(r,l)}}function fy(a,r){const l=r.referenceType;let s="]";if(l==="collapsed"?s+="[]":l==="full"&&(s+="["+(r.label||r.identifier)+"]"),r.type==="imageReference")return[{type:"text",value:"!["+r.alt+s}];const c=a.all(r),d=c[0];d&&d.type==="text"?d.value="["+d.value:c.unshift({type:"text",value:"["});const f=c[c.length-1];return f&&f.type==="text"?f.value+=s:c.push({type:"text",value:s}),c}function LE(a,r){const l=String(r.identifier).toUpperCase(),s=a.definitionById.get(l);if(!s)return fy(a,r);const c={src:br(s.url||""),alt:r.alt};s.title!==null&&s.title!==void 0&&(c.title=s.title);const d={type:"element",tagName:"img",properties:c,children:[]};return a.patch(r,d),a.applyData(r,d)}function OE(a,r){const l={src:br(r.url)};r.alt!==null&&r.alt!==void 0&&(l.alt=r.alt),r.title!==null&&r.title!==void 0&&(l.title=r.title);const s={type:"element",tagName:"img",properties:l,children:[]};return a.patch(r,s),a.applyData(r,s)}function NE(a,r){const l={type:"text",value:r.value.replace(/\r?\n|\r/g," ")};a.patch(r,l);const s={type:"element",tagName:"code",properties:{},children:[l]};return a.patch(r,s),a.applyData(r,s)}function WE(a,r){const l=String(r.identifier).toUpperCase(),s=a.definitionById.get(l);if(!s)return fy(a,r);const c={href:br(s.url||"")};s.title!==null&&s.title!==void 0&&(c.title=s.title);const d={type:"element",tagName:"a",properties:c,children:a.all(r)};return a.patch(r,d),a.applyData(r,d)}function UE(a,r){const l={href:br(r.url)};r.title!==null&&r.title!==void 0&&(l.title=r.title);const s={type:"element",tagName:"a",properties:l,children:a.all(r)};return a.patch(r,s),a.applyData(r,s)}function PE(a,r,l){const s=a.all(r),c=l?BE(l):py(r),d={},f=[];if(typeof r.checked=="boolean"){const y=s[0];let b;y&&y.type==="element"&&y.tagName==="p"?b=y:(b={type:"element",tagName:"p",properties:{},children:[]},s.unshift(b)),b.children.length>0&&b.children.unshift({type:"text",value:" "}),b.children.unshift({type:"element",tagName:"input",properties:{type:"checkbox",checked:r.checked,disabled:!0},children:[]}),d.className=["task-list-item"]}let h=-1;for(;++h<s.length;){const y=s[h];(c||h!==0||y.type!=="element"||y.tagName!=="p")&&f.push({type:"text",value:`
`}),y.type==="element"&&y.tagName==="p"&&!c?f.push(...y.children):f.push(y)}const g=s[s.length-1];g&&(c||g.type!=="element"||g.tagName!=="p")&&f.push({type:"text",value:`
`});const p={type:"element",tagName:"li",properties:d,children:f};return a.patch(r,p),a.applyData(r,p)}function BE(a){let r=!1;if(a.type==="list"){r=a.spread||!1;const l=a.children;let s=-1;for(;!r&&++s<l.length;)r=py(l[s])}return r}function py(a){const r=a.spread;return r??a.children.length>1}function jE(a,r){const l={},s=a.all(r);let c=-1;for(typeof r.start=="number"&&r.start!==1&&(l.start=r.start);++c<s.length;){const f=s[c];if(f.type==="element"&&f.tagName==="li"&&f.properties&&Array.isArray(f.properties.className)&&f.properties.className.includes("task-list-item")){l.className=["contains-task-list"];break}}const d={type:"element",tagName:r.ordered?"ol":"ul",properties:l,children:a.wrap(s,!0)};return a.patch(r,d),a.applyData(r,d)}function XE(a,r){const l={type:"element",tagName:"p",properties:{},children:a.all(r)};return a.patch(r,l),a.applyData(r,l)}function HE(a,r){const l={type:"root",children:a.wrap(a.all(r))};return a.patch(r,l),a.applyData(r,l)}function ZE(a,r){const l={type:"element",tagName:"strong",properties:{},children:a.all(r)};return a.patch(r,l),a.applyData(r,l)}function VE(a,r){const l=a.all(r),s=l.shift(),c=[];if(s){const f={type:"element",tagName:"thead",properties:{},children:a.wrap([s],!0)};a.patch(r.children[0],f),c.push(f)}if(l.length>0){const f={type:"element",tagName:"tbody",properties:{},children:a.wrap(l,!0)},h=rd(r.children[1]),g=Yg(r.children[r.children.length-1]);h&&g&&(f.position={start:h,end:g}),c.push(f)}const d={type:"element",tagName:"table",properties:{},children:a.wrap(c,!0)};return a.patch(r,d),a.applyData(r,d)}function qE(a,r,l){const s=l?l.children:void 0,d=(s?s.indexOf(r):1)===0?"th":"td",f=l&&l.type==="table"?l.align:void 0,h=f?f.length:r.children.length;let g=-1;const p=[];for(;++g<h;){const b=r.children[g],S={},v=f?f[g]:void 0;v&&(S.align=v);let L={type:"element",tagName:d,properties:S,children:[]};b&&(L.children=a.all(b),a.patch(b,L),L=a.applyData(b,L)),p.push(L)}const y={type:"element",tagName:"tr",properties:{},children:a.wrap(p,!0)};return a.patch(r,y),a.applyData(r,y)}function YE(a,r){const l={type:"element",tagName:"td",properties:{},children:a.all(r)};return a.patch(r,l),a.applyData(r,l)}const tg=9,ag=32;function GE(a){const r=String(a),l=/\r?\n|\r/g;let s=l.exec(r),c=0;const d=[];for(;s;)d.push(ig(r.slice(c,s.index),c>0,!0),s[0]),c=s.index+s[0].length,s=l.exec(r);return d.push(ig(r.slice(c),c>0,!1)),d.join("")}function ig(a,r,l){let s=0,c=a.length;if(r){let d=a.codePointAt(s);for(;d===tg||d===ag;)s++,d=a.codePointAt(s)}if(l){let d=a.codePointAt(c-1);for(;d===tg||d===ag;)c--,d=a.codePointAt(c-1)}return c>s?a.slice(s,c):""}function QE(a,r){const l={type:"text",value:GE(String(r.value))};return a.patch(r,l),a.applyData(r,l)}function KE(a,r){const l={type:"element",tagName:"hr",properties:{},children:[]};return a.patch(r,l),a.applyData(r,l)}const FE={blockquote:AE,break:wE,code:RE,delete:kE,emphasis:IE,footnoteReference:ME,heading:_E,html:CE,imageReference:LE,image:OE,inlineCode:NE,linkReference:WE,link:UE,listItem:PE,list:jE,paragraph:XE,root:HE,strong:ZE,table:VE,tableCell:YE,tableRow:qE,text:QE,thematicBreak:KE,toml:js,yaml:js,definition:js,footnoteDefinition:js};function js(){}const hy=-1,no=0,vl=1,Ks=2,fd=3,pd=4,hd=5,md=6,my=7,gy=8,rg=typeof self=="object"?self:globalThis,JE=(a,r)=>{const l=(c,d)=>(a.set(d,c),c),s=c=>{if(a.has(c))return a.get(c);const[d,f]=r[c];switch(d){case no:case hy:return l(f,c);case vl:{const h=l([],c);for(const g of f)h.push(s(g));return h}case Ks:{const h=l({},c);for(const[g,p]of f)h[s(g)]=s(p);return h}case fd:return l(new Date(f),c);case pd:{const{source:h,flags:g}=f;return l(new RegExp(h,g),c)}case hd:{const h=l(new Map,c);for(const[g,p]of f)h.set(s(g),s(p));return h}case md:{const h=l(new Set,c);for(const g of f)h.add(s(g));return h}case my:{const{name:h,message:g}=f;return l(new rg[h](g),c)}case gy:return l(BigInt(f),c);case"BigInt":return l(Object(BigInt(f)),c);case"ArrayBuffer":return l(new Uint8Array(f).buffer,f);case"DataView":{const{buffer:h}=new Uint8Array(f);return l(new DataView(h),f)}}return l(new rg[d](f),c)};return s},lg=a=>JE(new Map,a)(0),pr="",{toString:$E}={},{keys:e8}=Object,gl=a=>{const r=typeof a;if(r!=="object"||!a)return[no,r];const l=$E.call(a).slice(8,-1);switch(l){case"Array":return[vl,pr];case"Object":return[Ks,pr];case"Date":return[fd,pr];case"RegExp":return[pd,pr];case"Map":return[hd,pr];case"Set":return[md,pr];case"DataView":return[vl,l]}return l.includes("Array")?[vl,l]:l.includes("Error")?[my,l]:[Ks,l]},Xs=([a,r])=>a===no&&(r==="function"||r==="symbol"),n8=(a,r,l,s)=>{const c=(f,h)=>{const g=s.push(f)-1;return l.set(h,g),g},d=f=>{if(l.has(f))return l.get(f);let[h,g]=gl(f);switch(h){case no:{let y=f;switch(g){case"bigint":h=gy,y=f.toString();break;case"function":case"symbol":if(a)throw new TypeError("unable to serialize "+g);y=null;break;case"undefined":return c([hy],f)}return c([h,y],f)}case vl:{if(g){let S=f;return g==="DataView"?S=new Uint8Array(f.buffer):g==="ArrayBuffer"&&(S=new Uint8Array(f)),c([g,[...S]],f)}const y=[],b=c([h,y],f);for(const S of f)y.push(d(S));return b}case Ks:{if(g)switch(g){case"BigInt":return c([g,f.toString()],f);case"Boolean":case"Number":case"String":return c([g,f.valueOf()],f)}if(r&&"toJSON"in f)return d(f.toJSON());const y=[],b=c([h,y],f);for(const S of e8(f))(a||!Xs(gl(f[S])))&&y.push([d(S),d(f[S])]);return b}case fd:return c([h,f.toISOString()],f);case pd:{const{source:y,flags:b}=f;return c([h,{source:y,flags:b}],f)}case hd:{const y=[],b=c([h,y],f);for(const[S,v]of f)(a||!(Xs(gl(S))||Xs(gl(v))))&&y.push([d(S),d(v)]);return b}case md:{const y=[],b=c([h,y],f);for(const S of f)(a||!Xs(gl(S)))&&y.push(d(S));return b}}const{message:p}=f;return c([h,{name:g,message:p}],f)};return d},sg=(a,{json:r,lossy:l}={})=>{const s=[];return n8(!(r||l),!!r,new Map,s)(a),s},Fs=typeof structuredClone=="function"?(a,r)=>r&&("json"in r||"lossy"in r)?lg(sg(a,r)):structuredClone(a):(a,r)=>lg(sg(a,r));function t8(a,r){const l=[{type:"text",value:"↩"}];return r>1&&l.push({type:"element",tagName:"sup",properties:{},children:[{type:"text",value:String(r)}]}),l}function a8(a,r){return"Back to reference "+(a+1)+(r>1?"-"+r:"")}function i8(a){const r=typeof a.options.clobberPrefix=="string"?a.options.clobberPrefix:"user-content-",l=a.options.footnoteBackContent||t8,s=a.options.footnoteBackLabel||a8,c=a.options.footnoteLabel||"Footnotes",d=a.options.footnoteLabelTagName||"h2",f=a.options.footnoteLabelProperties||{className:["sr-only"]},h=[];let g=-1;for(;++g<a.footnoteOrder.length;){const p=a.footnoteById.get(a.footnoteOrder[g]);if(!p)continue;const y=a.all(p),b=String(p.identifier).toUpperCase(),S=br(b.toLowerCase());let v=0;const L=[],N=a.footnoteCounts.get(b);for(;N!==void 0&&++v<=N;){L.length>0&&L.push({type:"text",value:" "});let G=typeof l=="string"?l:l(g,v);typeof G=="string"&&(G={type:"text",value:G}),L.push({type:"element",tagName:"a",properties:{href:"#"+r+"fnref-"+S+(v>1?"-"+v:""),dataFootnoteBackref:"",ariaLabel:typeof s=="string"?s:s(g,v),className:["data-footnote-backref"]},children:Array.isArray(G)?G:[G]})}const H=y[y.length-1];if(H&&H.type==="element"&&H.tagName==="p"){const G=H.children[H.children.length-1];G&&G.type==="text"?G.value+=" ":H.children.push({type:"text",value:" "}),H.children.push(...L)}else y.push(...L);const P={type:"element",tagName:"li",properties:{id:r+"fn-"+S},children:a.wrap(y,!0)};a.patch(p,P),h.push(P)}if(h.length!==0)return{type:"element",tagName:"section",properties:{dataFootnotes:!0,className:["footnotes"]},children:[{type:"element",tagName:d,properties:{...Fs(f),id:"footnote-label"},children:[{type:"text",value:c}]},{type:"text",value:`
`},{type:"element",tagName:"ol",properties:{},children:a.wrap(h,!0)},{type:"text",value:`
`}]}}const yy=(function(a){if(a==null)return o8;if(typeof a=="function")return to(a);if(typeof a=="object")return Array.isArray(a)?r8(a):l8(a);if(typeof a=="string")return s8(a);throw new Error("Expected function, string, or object as test")});function r8(a){const r=[];let l=-1;for(;++l<a.length;)r[l]=yy(a[l]);return to(s);function s(...c){let d=-1;for(;++d<r.length;)if(r[d].apply(this,c))return!0;return!1}}function l8(a){const r=a;return to(l);function l(s){const c=s;let d;for(d in a)if(c[d]!==r[d])return!1;return!0}}function s8(a){return to(r);function r(l){return l&&l.type===a}}function to(a){return r;function r(l,s,c){return!!(u8(l)&&a.call(this,l,typeof s=="number"?s:void 0,c||void 0))}}function o8(){return!0}function u8(a){return a!==null&&typeof a=="object"&&"type"in a}const by=[],c8=!0,og=!1,d8="skip";function f8(a,r,l,s){let c;typeof r=="function"&&typeof l!="function"?(s=l,l=r):c=r;const d=yy(c),f=s?-1:1;h(a,void 0,[])();function h(g,p,y){const b=g&&typeof g=="object"?g:{};if(typeof b.type=="string"){const v=typeof b.tagName=="string"?b.tagName:typeof b.name=="string"?b.name:void 0;Object.defineProperty(S,"name",{value:"node ("+(g.type+(v?"<"+v+">":""))+")"})}return S;function S(){let v=by,L,N,H;if((!r||d(g,p,y[y.length-1]||void 0))&&(v=p8(l(g,y)),v[0]===og))return v;if("children"in g&&g.children){const P=g;if(P.children&&v[0]!==d8)for(N=(s?P.children.length:-1)+f,H=y.concat(P);N>-1&&N<P.children.length;){const G=P.children[N];if(L=h(G,N,H)(),L[0]===og)return L;N=typeof L[1]=="number"?L[1]:N+f}}return v}}}function p8(a){return Array.isArray(a)?a:typeof a=="number"?[c8,a]:a==null?by:[a]}function zy(a,r,l,s){let c,d,f;typeof r=="function"&&typeof l!="function"?(d=void 0,f=r,c=l):(d=r,f=l,c=s),f8(a,d,h,c);function h(g,p){const y=p[p.length-1],b=y?y.children.indexOf(g):void 0;return f(g,b,y)}}const qc={}.hasOwnProperty,h8={};function m8(a,r){const l=r||h8,s=new Map,c=new Map,d=new Map,f={...FE,...l.handlers},h={all:p,applyData:y8,definitionById:s,footnoteById:c,footnoteCounts:d,footnoteOrder:[],handlers:f,one:g,options:l,patch:g8,wrap:z8};return zy(a,function(y){if(y.type==="definition"||y.type==="footnoteDefinition"){const b=y.type==="definition"?s:c,S=String(y.identifier).toUpperCase();b.has(S)||b.set(S,y)}}),h;function g(y,b){const S=y.type,v=h.handlers[S];if(qc.call(h.handlers,S)&&v)return v(h,y,b);if(h.options.passThrough&&h.options.passThrough.includes(S)){if("children"in y){const{children:N,...H}=y,P=Fs(H);return P.children=h.all(y),P}return Fs(y)}return(h.options.unknownHandler||b8)(h,y,b)}function p(y){const b=[];if("children"in y){const S=y.children;let v=-1;for(;++v<S.length;){const L=h.one(S[v],y);if(L){if(v&&S[v-1].type==="break"&&(!Array.isArray(L)&&L.type==="text"&&(L.value=ug(L.value)),!Array.isArray(L)&&L.type==="element")){const N=L.children[0];N&&N.type==="text"&&(N.value=ug(N.value))}Array.isArray(L)?b.push(...L):b.push(L)}}}return b}}function g8(a,r){a.position&&(r.position=$0(a))}function y8(a,r){let l=r;if(a&&a.data){const s=a.data.hName,c=a.data.hChildren,d=a.data.hProperties;if(typeof s=="string")if(l.type==="element")l.tagName=s;else{const f="children"in l?l.children:[l];l={type:"element",tagName:s,properties:{},children:f}}l.type==="element"&&d&&Object.assign(l.properties,Fs(d)),"children"in l&&l.children&&c!==null&&c!==void 0&&(l.children=c)}return l}function b8(a,r){const l=r.data||{},s="value"in r&&!(qc.call(l,"hProperties")||qc.call(l,"hChildren"))?{type:"text",value:r.value}:{type:"element",tagName:"div",properties:{},children:a.all(r)};return a.patch(r,s),a.applyData(r,s)}function z8(a,r){const l=[];let s=-1;for(r&&l.push({type:"text",value:`
`});++s<a.length;)s&&l.push({type:"text",value:`
`}),l.push(a[s]);return r&&a.length>0&&l.push({type:"text",value:`
`}),l}function ug(a){let r=0,l=a.charCodeAt(r);for(;l===9||l===32;)r++,l=a.charCodeAt(r);return a.slice(r)}function cg(a,r){const l=m8(a,r),s=l.one(a,void 0),c=i8(l),d=Array.isArray(s)?{type:"root",children:s}:s||{type:"root",children:[]};return c&&d.children.push({type:"text",value:`
`},c),d}function v8(a,r){return a&&"run"in a?async function(l,s){const c=cg(l,{file:s,...r});await a.run(c,s)}:function(l,s){return cg(l,{file:s,...a||r})}}function dg(a){if(a)throw a}var Ac,fg;function S8(){if(fg)return Ac;fg=1;var a=Object.prototype.hasOwnProperty,r=Object.prototype.toString,l=Object.defineProperty,s=Object.getOwnPropertyDescriptor,c=function(p){return typeof Array.isArray=="function"?Array.isArray(p):r.call(p)==="[object Array]"},d=function(p){if(!p||r.call(p)!=="[object Object]")return!1;var y=a.call(p,"constructor"),b=p.constructor&&p.constructor.prototype&&a.call(p.constructor.prototype,"isPrototypeOf");if(p.constructor&&!y&&!b)return!1;var S;for(S in p);return typeof S>"u"||a.call(p,S)},f=function(p,y){l&&y.name==="__proto__"?l(p,y.name,{enumerable:!0,configurable:!0,value:y.newValue,writable:!0}):p[y.name]=y.newValue},h=function(p,y){if(y==="__proto__")if(a.call(p,y)){if(s)return s(p,y).value}else return;return p[y]};return Ac=function g(){var p,y,b,S,v,L,N=arguments[0],H=1,P=arguments.length,G=!1;for(typeof N=="boolean"&&(G=N,N=arguments[1]||{},H=2),(N==null||typeof N!="object"&&typeof N!="function")&&(N={});H<P;++H)if(p=arguments[H],p!=null)for(y in p)b=h(N,y),S=h(p,y),N!==S&&(G&&S&&(d(S)||(v=c(S)))?(v?(v=!1,L=b&&c(b)?b:[]):L=b&&d(b)?b:{},f(N,{name:y,newValue:g(G,L,S)})):typeof S<"u"&&f(N,{name:y,newValue:S}));return N},Ac}var E8=S8();const wc=Js(E8);function Yc(a){if(typeof a!="object"||a===null)return!1;const r=Object.getPrototypeOf(a);return(r===null||r===Object.prototype||Object.getPrototypeOf(r)===null)&&!(Symbol.toStringTag in a)&&!(Symbol.iterator in a)}function D8(){const a=[],r={run:l,use:s};return r;function l(...c){let d=-1;const f=c.pop();if(typeof f!="function")throw new TypeError("Expected function as last argument, not "+f);h(null,...c);function h(g,...p){const y=a[++d];let b=-1;if(g){f(g);return}for(;++b<c.length;)(p[b]===null||p[b]===void 0)&&(p[b]=c[b]);c=p,y?x8(y,h)(...p):f(null,...p)}}function s(c){if(typeof c!="function")throw new TypeError("Expected `middelware` to be a function, not "+c);return a.push(c),r}}function x8(a,r){let l;return s;function s(...f){const h=a.length>f.length;let g;h&&f.push(c);try{g=a.apply(this,f)}catch(p){const y=p;if(h&&l)throw y;return c(y)}h||(g&&g.then&&typeof g.then=="function"?g.then(d,c):g instanceof Error?c(g):d(g))}function c(f,...h){l||(l=!0,r(f,...h))}function d(f){c(null,f)}}const qt={basename:T8,dirname:A8,extname:w8,join:R8,sep:"/"};function T8(a,r){if(r!==void 0&&typeof r!="string")throw new TypeError('"ext" argument must be a string');Rl(a);let l=0,s=-1,c=a.length,d;if(r===void 0||r.length===0||r.length>a.length){for(;c--;)if(a.codePointAt(c)===47){if(d){l=c+1;break}}else s<0&&(d=!0,s=c+1);return s<0?"":a.slice(l,s)}if(r===a)return"";let f=-1,h=r.length-1;for(;c--;)if(a.codePointAt(c)===47){if(d){l=c+1;break}}else f<0&&(d=!0,f=c+1),h>-1&&(a.codePointAt(c)===r.codePointAt(h--)?h<0&&(s=c):(h=-1,s=f));return l===s?s=f:s<0&&(s=a.length),a.slice(l,s)}function A8(a){if(Rl(a),a.length===0)return".";let r=-1,l=a.length,s;for(;--l;)if(a.codePointAt(l)===47){if(s){r=l;break}}else s||(s=!0);return r<0?a.codePointAt(0)===47?"/":".":r===1&&a.codePointAt(0)===47?"//":a.slice(0,r)}function w8(a){Rl(a);let r=a.length,l=-1,s=0,c=-1,d=0,f;for(;r--;){const h=a.codePointAt(r);if(h===47){if(f){s=r+1;break}continue}l<0&&(f=!0,l=r+1),h===46?c<0?c=r:d!==1&&(d=1):c>-1&&(d=-1)}return c<0||l<0||d===0||d===1&&c===l-1&&c===s+1?"":a.slice(c,l)}function R8(...a){let r=-1,l;for(;++r<a.length;)Rl(a[r]),a[r]&&(l=l===void 0?a[r]:l+"/"+a[r]);return l===void 0?".":k8(l)}function k8(a){Rl(a);const r=a.codePointAt(0)===47;let l=I8(a,!r);return l.length===0&&!r&&(l="."),l.length>0&&a.codePointAt(a.length-1)===47&&(l+="/"),r?"/"+l:l}function I8(a,r){let l="",s=0,c=-1,d=0,f=-1,h,g;for(;++f<=a.length;){if(f<a.length)h=a.codePointAt(f);else{if(h===47)break;h=47}if(h===47){if(!(c===f-1||d===1))if(c!==f-1&&d===2){if(l.length<2||s!==2||l.codePointAt(l.length-1)!==46||l.codePointAt(l.length-2)!==46){if(l.length>2){if(g=l.lastIndexOf("/"),g!==l.length-1){g<0?(l="",s=0):(l=l.slice(0,g),s=l.length-1-l.lastIndexOf("/")),c=f,d=0;continue}}else if(l.length>0){l="",s=0,c=f,d=0;continue}}r&&(l=l.length>0?l+"/..":"..",s=2)}else l.length>0?l+="/"+a.slice(c+1,f):l=a.slice(c+1,f),s=f-c-1;c=f,d=0}else h===46&&d>-1?d++:d=-1}return l}function Rl(a){if(typeof a!="string")throw new TypeError("Path must be a string. Received "+JSON.stringify(a))}const M8={cwd:_8};function _8(){return"/"}function Gc(a){return!!(a!==null&&typeof a=="object"&&"href"in a&&a.href&&"protocol"in a&&a.protocol&&a.auth===void 0)}function C8(a){if(typeof a=="string")a=new URL(a);else if(!Gc(a)){const r=new TypeError('The "path" argument must be of type string or an instance of URL. Received `'+a+"`");throw r.code="ERR_INVALID_ARG_TYPE",r}if(a.protocol!=="file:"){const r=new TypeError("The URL must be of scheme file");throw r.code="ERR_INVALID_URL_SCHEME",r}return L8(a)}function L8(a){if(a.hostname!==""){const s=new TypeError('File URL host must be "localhost" or empty on darwin');throw s.code="ERR_INVALID_FILE_URL_HOST",s}const r=a.pathname;let l=-1;for(;++l<r.length;)if(r.codePointAt(l)===37&&r.codePointAt(l+1)===50){const s=r.codePointAt(l+2);if(s===70||s===102){const c=new TypeError("File URL path must not include encoded / characters");throw c.code="ERR_INVALID_FILE_URL_PATH",c}}return decodeURIComponent(r)}const Rc=["history","path","basename","stem","extname","dirname"];class vy{constructor(r){let l;r?Gc(r)?l={path:r}:typeof r=="string"||O8(r)?l={value:r}:l=r:l={},this.cwd="cwd"in l?"":M8.cwd(),this.data={},this.history=[],this.messages=[],this.value,this.map,this.result,this.stored;let s=-1;for(;++s<Rc.length;){const d=Rc[s];d in l&&l[d]!==void 0&&l[d]!==null&&(this[d]=d==="history"?[...l[d]]:l[d])}let c;for(c in l)Rc.includes(c)||(this[c]=l[c])}get basename(){return typeof this.path=="string"?qt.basename(this.path):void 0}set basename(r){Ic(r,"basename"),kc(r,"basename"),this.path=qt.join(this.dirname||"",r)}get dirname(){return typeof this.path=="string"?qt.dirname(this.path):void 0}set dirname(r){pg(this.basename,"dirname"),this.path=qt.join(r||"",this.basename)}get extname(){return typeof this.path=="string"?qt.extname(this.path):void 0}set extname(r){if(kc(r,"extname"),pg(this.dirname,"extname"),r){if(r.codePointAt(0)!==46)throw new Error("`extname` must start with `.`");if(r.includes(".",1))throw new Error("`extname` cannot contain multiple dots")}this.path=qt.join(this.dirname,this.stem+(r||""))}get path(){return this.history[this.history.length-1]}set path(r){Gc(r)&&(r=C8(r)),Ic(r,"path"),this.path!==r&&this.history.push(r)}get stem(){return typeof this.path=="string"?qt.basename(this.path,this.extname):void 0}set stem(r){Ic(r,"stem"),kc(r,"stem"),this.path=qt.join(this.dirname||"",r+(this.extname||""))}fail(r,l,s){const c=this.message(r,l,s);throw c.fatal=!0,c}info(r,l,s){const c=this.message(r,l,s);return c.fatal=void 0,c}message(r,l,s){const c=new Hn(r,l,s);return this.path&&(c.name=this.path+":"+c.name,c.file=this.path),c.fatal=!1,this.messages.push(c),c}toString(r){return this.value===void 0?"":typeof this.value=="string"?this.value:new TextDecoder(r||void 0).decode(this.value)}}function kc(a,r){if(a&&a.includes(qt.sep))throw new Error("`"+r+"` cannot be a path: did not expect `"+qt.sep+"`")}function Ic(a,r){if(!a)throw new Error("`"+r+"` cannot be empty")}function pg(a,r){if(!a)throw new Error("Setting `"+r+"` requires `path` to be set too")}function O8(a){return!!(a&&typeof a=="object"&&"byteLength"in a&&"byteOffset"in a)}const N8=(function(a){const s=this.constructor.prototype,c=s[a],d=function(){return c.apply(d,arguments)};return Object.setPrototypeOf(d,s),d}),W8={}.hasOwnProperty;class gd extends N8{constructor(){super("copy"),this.Compiler=void 0,this.Parser=void 0,this.attachers=[],this.compiler=void 0,this.freezeIndex=-1,this.frozen=void 0,this.namespace={},this.parser=void 0,this.transformers=D8()}copy(){const r=new gd;let l=-1;for(;++l<this.attachers.length;){const s=this.attachers[l];r.use(...s)}return r.data(wc(!0,{},this.namespace)),r}data(r,l){return typeof r=="string"?arguments.length===2?(Cc("data",this.frozen),this.namespace[r]=l,this):W8.call(this.namespace,r)&&this.namespace[r]||void 0:r?(Cc("data",this.frozen),this.namespace=r,this):this.namespace}freeze(){if(this.frozen)return this;const r=this;for(;++this.freezeIndex<this.attachers.length;){const[l,...s]=this.attachers[this.freezeIndex];if(s[0]===!1)continue;s[0]===!0&&(s[0]=void 0);const c=l.call(r,...s);typeof c=="function"&&this.transformers.use(c)}return this.frozen=!0,this.freezeIndex=Number.POSITIVE_INFINITY,this}parse(r){this.freeze();const l=Hs(r),s=this.parser||this.Parser;return Mc("parse",s),s(String(l),l)}process(r,l){const s=this;return this.freeze(),Mc("process",this.parser||this.Parser),_c("process",this.compiler||this.Compiler),l?c(void 0,l):new Promise(c);function c(d,f){const h=Hs(r),g=s.parse(h);s.run(g,h,function(y,b,S){if(y||!b||!S)return p(y);const v=b,L=s.stringify(v,S);B8(L)?S.value=L:S.result=L,p(y,S)});function p(y,b){y||!b?f(y):d?d(b):l(void 0,b)}}}processSync(r){let l=!1,s;return this.freeze(),Mc("processSync",this.parser||this.Parser),_c("processSync",this.compiler||this.Compiler),this.process(r,c),mg("processSync","process",l),s;function c(d,f){l=!0,dg(d),s=f}}run(r,l,s){hg(r),this.freeze();const c=this.transformers;return!s&&typeof l=="function"&&(s=l,l=void 0),s?d(void 0,s):new Promise(d);function d(f,h){const g=Hs(l);c.run(r,g,p);function p(y,b,S){const v=b||r;y?h(y):f?f(v):s(void 0,v,S)}}}runSync(r,l){let s=!1,c;return this.run(r,l,d),mg("runSync","run",s),c;function d(f,h){dg(f),c=h,s=!0}}stringify(r,l){this.freeze();const s=Hs(l),c=this.compiler||this.Compiler;return _c("stringify",c),hg(r),c(r,s)}use(r,...l){const s=this.attachers,c=this.namespace;if(Cc("use",this.frozen),r!=null)if(typeof r=="function")g(r,l);else if(typeof r=="object")Array.isArray(r)?h(r):f(r);else throw new TypeError("Expected usable value, not `"+r+"`");return this;function d(p){if(typeof p=="function")g(p,[]);else if(typeof p=="object")if(Array.isArray(p)){const[y,...b]=p;g(y,b)}else f(p);else throw new TypeError("Expected usable value, not `"+p+"`")}function f(p){if(!("plugins"in p)&&!("settings"in p))throw new Error("Expected usable value but received an empty preset, which is probably a mistake: presets typically come with `plugins` and sometimes with `settings`, but this has neither");h(p.plugins),p.settings&&(c.settings=wc(!0,c.settings,p.settings))}function h(p){let y=-1;if(p!=null)if(Array.isArray(p))for(;++y<p.length;){const b=p[y];d(b)}else throw new TypeError("Expected a list of plugins, not `"+p+"`")}function g(p,y){let b=-1,S=-1;for(;++b<s.length;)if(s[b][0]===p){S=b;break}if(S===-1)s.push([p,...y]);else if(y.length>0){let[v,...L]=y;const N=s[S][1];Yc(N)&&Yc(v)&&(v=wc(!0,N,v)),s[S]=[p,v,...L]}}}}const U8=new gd().freeze();function Mc(a,r){if(typeof r!="function")throw new TypeError("Cannot `"+a+"` without `parser`")}function _c(a,r){if(typeof r!="function")throw new TypeError("Cannot `"+a+"` without `compiler`")}function Cc(a,r){if(r)throw new Error("Cannot call `"+a+"` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`.")}function hg(a){if(!Yc(a)||typeof a.type!="string")throw new TypeError("Expected node, got `"+a+"`")}function mg(a,r,l){if(!l)throw new Error("`"+a+"` finished async. Use `"+r+"` instead")}function Hs(a){return P8(a)?a:new vy(a)}function P8(a){return!!(a&&typeof a=="object"&&"message"in a&&"messages"in a)}function B8(a){return typeof a=="string"||j8(a)}function j8(a){return!!(a&&typeof a=="object"&&"byteLength"in a&&"byteOffset"in a)}const X8="https://github.com/remarkjs/react-markdown/blob/main/changelog.md",gg=[],yg={allowDangerousHtml:!0},H8=/^(https?|ircs?|mailto|xmpp)$/i,Z8=[{from:"astPlugins",id:"remove-buggy-html-in-markdown-parser"},{from:"allowDangerousHtml",id:"remove-buggy-html-in-markdown-parser"},{from:"allowNode",id:"replace-allownode-allowedtypes-and-disallowedtypes",to:"allowElement"},{from:"allowedTypes",id:"replace-allownode-allowedtypes-and-disallowedtypes",to:"allowedElements"},{from:"className",id:"remove-classname"},{from:"disallowedTypes",id:"replace-allownode-allowedtypes-and-disallowedtypes",to:"disallowedElements"},{from:"escapeHtml",id:"remove-buggy-html-in-markdown-parser"},{from:"includeElementIndex",id:"#remove-includeelementindex"},{from:"includeNodeIndex",id:"change-includenodeindex-to-includeelementindex"},{from:"linkTarget",id:"remove-linktarget"},{from:"plugins",id:"change-plugins-to-remarkplugins",to:"remarkPlugins"},{from:"rawSourcePos",id:"#remove-rawsourcepos"},{from:"renderers",id:"change-renderers-to-components",to:"components"},{from:"source",id:"change-source-to-children",to:"children"},{from:"sourcePos",id:"#remove-sourcepos"},{from:"transformImageUri",id:"#add-urltransform",to:"urlTransform"},{from:"transformLinkUri",id:"#add-urltransform",to:"urlTransform"}];function V8(a){const r=q8(a),l=Y8(a);return G8(r.runSync(r.parse(l),l),a)}function q8(a){const r=a.rehypePlugins||gg,l=a.remarkPlugins||gg,s=a.remarkRehypeOptions?{...a.remarkRehypeOptions,...yg}:yg;return U8().use(TE).use(l).use(v8,s).use(r)}function Y8(a){const r=a.children||"",l=new vy;return typeof r=="string"&&(l.value=r),l}function G8(a,r){const l=r.allowedElements,s=r.allowElement,c=r.components,d=r.disallowedElements,f=r.skipHtml,h=r.unwrapDisallowed,g=r.urlTransform||Q8;for(const y of Z8)Object.hasOwn(r,y.from)&&(""+y.from+(y.to?"use `"+y.to+"` instead":"remove it")+X8+y.id,void 0);return zy(a,p),iv(a,{Fragment:we.Fragment,components:c,ignoreInvalidStyle:!0,jsx:we.jsx,jsxs:we.jsxs,passKeys:!0,passNode:!0});function p(y,b,S){if(y.type==="raw"&&S&&typeof b=="number")return f?S.children.splice(b,1):S.children[b]={type:"text",value:y.value},b;if(y.type==="element"){let v;for(v in Dc)if(Object.hasOwn(Dc,v)&&Object.hasOwn(y.properties,v)){const L=y.properties[v],N=Dc[v];(N===null||N.includes(y.tagName))&&(y.properties[v]=g(String(L||""),v,y))}}if(y.type==="element"){let v=l?!l.includes(y.tagName):d?d.includes(y.tagName):!1;if(!v&&s&&typeof b=="number"&&(v=!s(y,b,S)),v&&S&&typeof b=="number")return h&&y.children?S.children.splice(b,1,...y.children):S.children.splice(b,1),b}}}function Q8(a){const r=a.indexOf(":"),l=a.indexOf("?"),s=a.indexOf("#"),c=a.indexOf("/");return r===-1||c!==-1&&r>c||l!==-1&&r>l||s!==-1&&r>s||H8.test(a.slice(0,r))?a:""}const K8=`**wizzard-packages**

***

# wizzard-packages

## Modules

- [adapter-yup/src](adapter-yup/src/README.md)
- [adapter-zod/src](adapter-zod/src/README.md)
- [core/src](core/src/README.md)
- [devtools/src](devtools/src/README.md)
- [middleware/src](middleware/src/README.md)
- [persistence/src](persistence/src/README.md)
- [react/src](react/src/README.md)
`,F8=`[**wizzard-packages**](../../README.md)

***

[wizzard-packages](../../README.md) / adapter-yup/src

# adapter-yup/src

## Classes

- [YupAdapter](classes/YupAdapter.md)

## Interfaces

- [YupLikeError](interfaces/YupLikeError.md)
- [YupLikeSchema](interfaces/YupLikeSchema.md)
`,J8=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [adapter-yup/src](../README.md) / YupAdapter

# Class: YupAdapter\\<T\\>

Defined in: [adapter-yup/src/YupAdapter.ts:7](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/adapter-yup/src/YupAdapter.ts#L7)

Validation adapter for Yup-like schemas.

## Type Parameters

### T

\`T\`

## Implements

- [\`IValidatorAdapter\`](../../../react/src/interfaces/IValidatorAdapter.md)\\<\`T\`\\>

## Constructors

### Constructor

> **new YupAdapter**\\<\`T\`\\>(\`schema\`): \`YupAdapter\`\\<\`T\`\\>

Defined in: [adapter-yup/src/YupAdapter.ts:10](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/adapter-yup/src/YupAdapter.ts#L10)

#### Parameters

##### schema

[\`YupLikeSchema\`](../interfaces/YupLikeSchema.md)\\<\`T\`\\>

#### Returns

\`YupAdapter\`\\<\`T\`\\>

## Methods

### validate()

> **validate**(\`data\`): \`Promise\`\\<[\`ValidationResult\`](../../../react/src/type-aliases/ValidationResult.md)\\>

Defined in: [adapter-yup/src/YupAdapter.ts:14](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/adapter-yup/src/YupAdapter.ts#L14)

#### Parameters

##### data

\`unknown\`

#### Returns

\`Promise\`\\<[\`ValidationResult\`](../../../react/src/type-aliases/ValidationResult.md)\\>

#### Implementation of

[\`IValidatorAdapter\`](../../../react/src/interfaces/IValidatorAdapter.md).[\`validate\`](../../../react/src/interfaces/IValidatorAdapter.md#validate)
`,$8=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [adapter-yup/src](../README.md) / YupLikeError

# Interface: YupLikeError

Defined in: [adapter-yup/src/types.ts:11](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/adapter-yup/src/types.ts#L11)

Minimal structural interface for Yup-like validation errors.

## Properties

### inner

> **inner**: \`object\`[]

Defined in: [adapter-yup/src/types.ts:12](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/adapter-yup/src/types.ts#L12)

#### message

> **message**: \`string\`

#### path?

> \`optional\` **path**: \`string\`
`,eD=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [adapter-yup/src](../README.md) / YupLikeSchema

# Interface: YupLikeSchema\\<T\\>

Defined in: [adapter-yup/src/types.ts:4](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/adapter-yup/src/types.ts#L4)

Minimal structural interface for Yup-like schemas.

## Type Parameters

### T

\`T\` = \`any\`

## Properties

### validate()

> **validate**: (\`data\`, \`options\`) => \`Promise\`\\<\`any\`\\>

Defined in: [adapter-yup/src/types.ts:5](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/adapter-yup/src/types.ts#L5)

#### Parameters

##### data

\`T\`

##### options

###### abortEarly

\`boolean\`

#### Returns

\`Promise\`\\<\`any\`\\>
`,nD=`[**wizzard-packages**](../../README.md)

***

[wizzard-packages](../../README.md) / adapter-zod/src

# adapter-zod/src

## Classes

- [ZodAdapter](classes/ZodAdapter.md)

## Interfaces

- [ZodLikeSchema](interfaces/ZodLikeSchema.md)
`,tD=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [adapter-zod/src](../README.md) / ZodAdapter

# Class: ZodAdapter\\<T\\>

Defined in: [adapter-zod/src/ZodAdapter.ts:7](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/adapter-zod/src/ZodAdapter.ts#L7)

Validation adapter for Zod-like schemas.

## Type Parameters

### T

\`T\`

## Implements

- [\`IValidatorAdapter\`](../../../react/src/interfaces/IValidatorAdapter.md)\\<\`T\`\\>

## Constructors

### Constructor

> **new ZodAdapter**\\<\`T\`\\>(\`schema\`): \`ZodAdapter\`\\<\`T\`\\>

Defined in: [adapter-zod/src/ZodAdapter.ts:10](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/adapter-zod/src/ZodAdapter.ts#L10)

#### Parameters

##### schema

[\`ZodLikeSchema\`](../interfaces/ZodLikeSchema.md)\\<\`T\`\\>

#### Returns

\`ZodAdapter\`\\<\`T\`\\>

## Methods

### validate()

> **validate**(\`data\`): \`Promise\`\\<[\`ValidationResult\`](../../../react/src/type-aliases/ValidationResult.md)\\>

Defined in: [adapter-zod/src/ZodAdapter.ts:14](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/adapter-zod/src/ZodAdapter.ts#L14)

#### Parameters

##### data

\`unknown\`

#### Returns

\`Promise\`\\<[\`ValidationResult\`](../../../react/src/type-aliases/ValidationResult.md)\\>

#### Implementation of

[\`IValidatorAdapter\`](../../../react/src/interfaces/IValidatorAdapter.md).[\`validate\`](../../../react/src/interfaces/IValidatorAdapter.md#validate)
`,aD="[**wizzard-packages**](../../../README.md)\n\n***\n\n[wizzard-packages](../../../README.md) / [adapter-zod/src](../README.md) / ZodLikeSchema\n\n# Interface: ZodLikeSchema\\<T\\>\n\nDefined in: [adapter-zod/src/types.ts:4](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/adapter-zod/src/types.ts#L4)\n\nMinimal structural interface for Zod-like schemas.\n\n## Type Parameters\n\n### T\n\n`T` = `any`\n\n## Properties\n\n### safeParseAsync()\n\n> **safeParseAsync**: (`data`) => `Promise`\\<\\{ `data?`: `T`; `error?`: \\{ `issues`: `object`[]; \\}; `success`: `boolean`; \\}\\>\n\nDefined in: [adapter-zod/src/types.ts:5](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/adapter-zod/src/types.ts#L5)\n\n#### Parameters\n\n##### data\n\n`T`\n\n#### Returns\n\n`Promise`\\<\\{ `data?`: `T`; `error?`: \\{ `issues`: `object`[]; \\}; `success`: `boolean`; \\}\\>\n",iD=`[**wizzard-packages**](../../README.md)

***

[wizzard-packages](../../README.md) / core/src

# core/src

## Classes

- [WizardStore](classes/WizardStore.md)

## Interfaces

- [IBreadcrumb](interfaces/IBreadcrumb.md)
- [IPersistenceAdapter](interfaces/IPersistenceAdapter.md)
- [IStepConfig](interfaces/IStepConfig.md)
- [IValidatorAdapter](interfaces/IValidatorAdapter.md)
- [IWizardActions](interfaces/IWizardActions.md)
- [IWizardConfig](interfaces/IWizardConfig.md)
- [IWizardContext](interfaces/IWizardContext.md)
- [IWizardState](interfaces/IWizardState.md)
- [IWizardStore](interfaces/IWizardStore.md)
- [MiddlewareAPI](interfaces/MiddlewareAPI.md)

## Type Aliases

- [BreadcrumbStatus](type-aliases/BreadcrumbStatus.md)
- [Path](type-aliases/Path.md)
- [PathValue](type-aliases/PathValue.md)
- [PersistenceMode](type-aliases/PersistenceMode.md)
- [StepDirection](type-aliases/StepDirection.md)
- [ValidationMode](type-aliases/ValidationMode.md)
- [ValidationResult](type-aliases/ValidationResult.md)
- [WizardAction](type-aliases/WizardAction.md)
- [WizardEventHandler](type-aliases/WizardEventHandler.md)
- [WizardEventName](type-aliases/WizardEventName.md)
- [WizardEventPayloads](type-aliases/WizardEventPayloads.md)
- [WizardMiddleware](type-aliases/WizardMiddleware.md)

## Functions

- [getByPath](functions/getByPath.md)
- [setByPath](functions/setByPath.md)
- [shallowEqual](functions/shallowEqual.md)
- [toPath](functions/toPath.md)
`,rD=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [core/src](../README.md) / WizardStore

# Class: WizardStore\\<T, StepId\\>

Defined in: [core/src/store/WizardStore.ts:17](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/store/WizardStore.ts#L17)

Core event-driven store for managing wizard state, data, and navigation.

## Type Parameters

### T

\`T\`

Type of the global wizard data object

### StepId

\`StepId\` *extends* \`string\` = \`string\`

String union of valid step IDs

## Implements

- [\`IWizardStore\`](../interfaces/IWizardStore.md)\\<\`T\`, \`StepId\`\\>

## Constructors

### Constructor

> **new WizardStore**\\<\`T\`, \`StepId\`\\>(\`initialData\`, \`middlewares\`): \`WizardStore\`\\<\`T\`, \`StepId\`\\>

Defined in: [core/src/store/WizardStore.ts:38](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/store/WizardStore.ts#L38)

#### Parameters

##### initialData

\`T\`

##### middlewares

[\`WizardMiddleware\`](../type-aliases/WizardMiddleware.md)\\<\`T\`, \`StepId\`\\>[] = \`[]\`

#### Returns

\`WizardStore\`\\<\`T\`, \`StepId\`\\>

## Properties

### errorsMap

> **errorsMap**: \`Map\`\\<\`StepId\`, \`Map\`\\<\`string\`, \`string\`\\>\\>

Defined in: [core/src/store/WizardStore.ts:23](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/store/WizardStore.ts#L23)

#### Implementation of

[\`IWizardStore\`](../interfaces/IWizardStore.md).[\`errorsMap\`](../interfaces/IWizardStore.md#errorsmap)

## Methods

### clearStepStorage()

> **clearStepStorage**(\`stepId\`): \`void\`

Defined in: [core/src/store/WizardStore.ts:534](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/store/WizardStore.ts#L534)

#### Parameters

##### stepId

\`string\`

#### Returns

\`void\`

***

### deleteError()

> **deleteError**(\`stepId\`, \`path\`): \`boolean\`

Defined in: [core/src/store/WizardStore.ts:439](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/store/WizardStore.ts#L439)

#### Parameters

##### stepId

\`StepId\`

##### path

\`string\`

#### Returns

\`boolean\`

#### Implementation of

[\`IWizardStore\`](../interfaces/IWizardStore.md).[\`deleteError\`](../interfaces/IWizardStore.md#deleteerror)

***

### dispatch()

> **dispatch**(\`action\`): \`void\`

Defined in: [core/src/store/WizardStore.ts:97](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/store/WizardStore.ts#L97)

Processes an action through the middleware chain and updates the state.
This is the primary way to trigger any state change in the wizard.

#### Parameters

##### action

[\`WizardAction\`](../type-aliases/WizardAction.md)\\<\`T\`, \`StepId\`\\>

The action to perform

#### Returns

\`void\`

#### Implementation of

[\`IWizardStore\`](../interfaces/IWizardStore.md).[\`dispatch\`](../interfaces/IWizardStore.md#dispatch)

***

### getSnapshot()

> **getSnapshot**(): [\`IWizardState\`](../interfaces/IWizardState.md)\\<\`T\`, \`StepId\`\\>

Defined in: [core/src/store/WizardStore.ts:285](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/store/WizardStore.ts#L285)

Returns the current immutable snapshot of the wizard state.

#### Returns

[\`IWizardState\`](../interfaces/IWizardState.md)\\<\`T\`, \`StepId\`\\>

#### Implementation of

[\`IWizardStore\`](../interfaces/IWizardStore.md).[\`getSnapshot\`](../interfaces/IWizardStore.md#getsnapshot)

***

### goToStep()

> **goToStep**(\`stepId\`, \`options\`): \`Promise\`\\<\`boolean\`\\>

Defined in: [core/src/store/WizardStore.ts:775](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/store/WizardStore.ts#L775)

#### Parameters

##### stepId

\`StepId\`

##### options

###### providedActiveSteps?

[\`IStepConfig\`](../interfaces/IStepConfig.md)\\<\`T\`, \`StepId\`\\>[]

###### validate?

\`boolean\`

#### Returns

\`Promise\`\\<\`boolean\`\\>

#### Implementation of

[\`IWizardStore\`](../interfaces/IWizardStore.md).[\`goToStep\`](../interfaces/IWizardStore.md#gotostep)

***

### hydrate()

> **hydrate**(): \`void\`

Defined in: [core/src/store/WizardStore.ts:471](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/store/WizardStore.ts#L471)

Restores wizard state from persistence storage.
Implements "latest wins" conflict resolution based on step timestamps.

#### Returns

\`void\`

#### Implementation of

[\`IWizardStore\`](../interfaces/IWizardStore.md).[\`hydrate\`](../interfaces/IWizardStore.md#hydrate)

***

### injectPersistence()

> **injectPersistence**(\`adapter\`): \`void\`

Defined in: [core/src/store/WizardStore.ts:463](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/store/WizardStore.ts#L463)

#### Parameters

##### adapter

[\`IPersistenceAdapter\`](../interfaces/IPersistenceAdapter.md)

#### Returns

\`void\`

#### Implementation of

[\`IWizardStore\`](../interfaces/IWizardStore.md).[\`injectPersistence\`](../interfaces/IWizardStore.md#injectpersistence)

***

### resolveActiveSteps()

> **resolveActiveSteps**(\`data?\`): \`Promise\`\\<[\`IStepConfig\`](../interfaces/IStepConfig.md)\\<\`T\`, \`StepId\`\\>[]\\>

Defined in: [core/src/store/WizardStore.ts:616](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/store/WizardStore.ts#L616)

Evaluates visibility conditions for all steps and returns only those that should be active.
Uses memoization to avoid redundant async calls if dependencies haven't changed.

#### Parameters

##### data?

\`T\`

Optional data override for evaluation

#### Returns

\`Promise\`\\<[\`IStepConfig\`](../interfaces/IStepConfig.md)\\<\`T\`, \`StepId\`\\>[]\\>

#### Implementation of

[\`IWizardStore\`](../interfaces/IWizardStore.md).[\`resolveActiveSteps\`](../interfaces/IWizardStore.md#resolveactivesteps)

***

### save()

> **save**(\`stepId?\`): \`void\`

Defined in: [core/src/store/WizardStore.ts:547](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/store/WizardStore.ts#L547)

Manually triggers data persistence for specific steps or the current step.

#### Parameters

##### stepId?

\`StepId\`

Optional ID of step to save. If omitted, saves current step.

#### Returns

\`void\`

#### Implementation of

[\`IWizardStore\`](../interfaces/IWizardStore.md).[\`save\`](../interfaces/IWizardStore.md#save)

***

### setInitialData()

> **setInitialData**(\`data\`): \`void\`

Defined in: [core/src/store/WizardStore.ts:377](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/store/WizardStore.ts#L377)

Sets the initial data for the wizard.
Resets dirty tracking based on this new data.

#### Parameters

##### data

\`T\`

#### Returns

\`void\`

#### Implementation of

[\`IWizardStore\`](../interfaces/IWizardStore.md).[\`setInitialData\`](../interfaces/IWizardStore.md#setinitialdata)

***

### setStepErrors()

> **setStepErrors**(\`stepId\`, \`errors\`): \`boolean\`

Defined in: [core/src/store/WizardStore.ts:419](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/store/WizardStore.ts#L419)

#### Parameters

##### stepId

\`StepId\`

##### errors

\`Record\`\\<\`string\`, \`string\`\\> | \`null\` | \`undefined\`

#### Returns

\`boolean\`

#### Implementation of

[\`IWizardStore\`](../interfaces/IWizardStore.md).[\`setStepErrors\`](../interfaces/IWizardStore.md#setsteperrors)

***

### subscribe()

> **subscribe**(\`listener\`): () => \`boolean\`

Defined in: [core/src/store/WizardStore.ts:458](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/store/WizardStore.ts#L458)

#### Parameters

##### listener

() => \`void\`

#### Returns

> (): \`boolean\`

##### Returns

\`boolean\`

#### Implementation of

[\`IWizardStore\`](../interfaces/IWizardStore.md).[\`subscribe\`](../interfaces/IWizardStore.md#subscribe)

***

### subscribeToActions()

> **subscribeToActions**(\`listener\`): () => \`boolean\`

Defined in: [core/src/store/WizardStore.ts:29](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/store/WizardStore.ts#L29)

#### Parameters

##### listener

(\`action\`) => \`void\`

#### Returns

> (): \`boolean\`

##### Returns

\`boolean\`

#### Implementation of

[\`IWizardStore\`](../interfaces/IWizardStore.md).[\`subscribeToActions\`](../interfaces/IWizardStore.md#subscribetoactions)

***

### update()

> **update**(\`newData\`, \`changedPath?\`): \`void\`

Defined in: [core/src/store/WizardStore.ts:296](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/store/WizardStore.ts#L296)

Performs a granular data update at a specific path.
Automatically calculates dirty fields and triggers auto-save if configured.

#### Parameters

##### newData

\`T\`

Full new data object

##### changedPath?

Path(s) that were modified

\`string\` | \`string\`[]

#### Returns

\`void\`

#### Implementation of

[\`IWizardStore\`](../interfaces/IWizardStore.md).[\`update\`](../interfaces/IWizardStore.md#update)

***

### updateErrors()

> **updateErrors**(\`newErrors\`): \`void\`

Defined in: [core/src/store/WizardStore.ts:406](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/store/WizardStore.ts#L406)

#### Parameters

##### newErrors

\`Record\`\\<\`StepId\`, \`Record\`\\<\`string\`, \`string\`\\>\\>

#### Returns

\`void\`

#### Implementation of

[\`IWizardStore\`](../interfaces/IWizardStore.md).[\`updateErrors\`](../interfaces/IWizardStore.md#updateerrors)

***

### updateMeta()

> **updateMeta**(\`newMeta\`): \`void\`

Defined in: [core/src/store/WizardStore.ts:330](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/store/WizardStore.ts#L330)

#### Parameters

##### newMeta

\`Partial\`\\<[\`IWizardState\`](../interfaces/IWizardState.md)\\<\`T\`, \`StepId\`\\>\\>

#### Returns

\`void\`

#### Implementation of

[\`IWizardStore\`](../interfaces/IWizardStore.md).[\`updateMeta\`](../interfaces/IWizardStore.md#updatemeta)

***

### validateAll()

> **validateAll**(): \`Promise\`\\<\\{ \`errors\`: \`Record\`\\<\`string\`, \`Record\`\\<\`string\`, \`string\`\\>\\>; \`isValid\`: \`boolean\`; \\}\\>

Defined in: [core/src/store/WizardStore.ts:751](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/store/WizardStore.ts#L751)

#### Returns

\`Promise\`\\<\\{ \`errors\`: \`Record\`\\<\`string\`, \`Record\`\\<\`string\`, \`string\`\\>\\>; \`isValid\`: \`boolean\`; \\}\\>

#### Implementation of

[\`IWizardStore\`](../interfaces/IWizardStore.md).[\`validateAll\`](../interfaces/IWizardStore.md#validateall)

***

### validateStep()

> **validateStep**(\`stepId\`): \`Promise\`\\<\`boolean\`\\>

Defined in: [core/src/store/WizardStore.ts:692](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/store/WizardStore.ts#L692)

#### Parameters

##### stepId

\`StepId\`

#### Returns

\`Promise\`\\<\`boolean\`\\>

#### Implementation of

[\`IWizardStore\`](../interfaces/IWizardStore.md).[\`validateStep\`](../interfaces/IWizardStore.md#validatestep)
`,lD=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [core/src](../README.md) / getByPath

# Function: getByPath()

> **getByPath**(\`obj\`, \`path\`, \`defaultValue?\`): \`unknown\`

Defined in: [core/src/utils/data.ts:32](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/utils/data.ts#L32)

Retrieves a value from an object by path.

## Parameters

### obj

\`any\`

### path

\`string\`

### defaultValue?

\`unknown\`

## Returns

\`unknown\`
`,sD=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [core/src](../README.md) / setByPath

# Function: setByPath()

> **setByPath**\\<\`T\`\\>(\`obj\`, \`path\`, \`value\`): \`T\`

Defined in: [core/src/utils/data.ts:54](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/utils/data.ts#L54)

Immutably sets a value in an object by path.

## Type Parameters

### T

\`T\` *extends* \`object\`

## Parameters

### obj

\`T\`

### path

\`string\`

### value

\`unknown\`

## Returns

\`T\`
`,oD=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [core/src](../README.md) / shallowEqual

# Function: shallowEqual()

> **shallowEqual**(\`a\`, \`b\`): \`boolean\`

Defined in: [core/src/utils/data.ts:99](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/utils/data.ts#L99)

Simple shallow equality check.

## Parameters

### a

\`any\`

### b

\`any\`

## Returns

\`boolean\`
`,uD=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [core/src](../README.md) / toPath

# Function: toPath()

> **toPath**(\`path\`): \`string\`[]

Defined in: [core/src/utils/data.ts:9](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/utils/data.ts#L9)

Parses a string path into an array of keys using a cache.

## Parameters

### path

\`string\`

## Returns

\`string\`[]
`,cD=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [core/src](../README.md) / IBreadcrumb

# Interface: IBreadcrumb\\<StepId\\>

Defined in: [core/src/types.ts:311](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L311)

Breadcrumb Interface

## Type Parameters

### StepId

\`StepId\` *extends* \`string\` = \`string\`

## Properties

### id

> **id**: \`StepId\`

Defined in: [core/src/types.ts:312](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L312)

***

### label

> **label**: \`string\`

Defined in: [core/src/types.ts:313](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L313)

***

### status

> **status**: [\`BreadcrumbStatus\`](../type-aliases/BreadcrumbStatus.md)

Defined in: [core/src/types.ts:314](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L314)
`,dD=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [core/src](../README.md) / IPersistenceAdapter

# Interface: IPersistenceAdapter

Defined in: [core/src/types.ts:141](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L141)

Persistence Adapter Interface

## Properties

### clear()

> **clear**: () => \`void\`

Defined in: [core/src/types.ts:146](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L146)

#### Returns

\`void\`

***

### clearStep()

> **clearStep**: (\`stepId\`) => \`void\`

Defined in: [core/src/types.ts:145](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L145)

#### Parameters

##### stepId

\`string\`

#### Returns

\`void\`

***

### getStep()

> **getStep**: \\<\`T\`\\>(\`stepId\`) => \`T\` \\| \`undefined\`

Defined in: [core/src/types.ts:143](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L143)

#### Type Parameters

##### T

\`T\`

#### Parameters

##### stepId

\`string\`

#### Returns

\`T\` \\| \`undefined\`

***

### getStepWithMeta()?

> \`optional\` **getStepWithMeta**: \\<\`T\`\\>(\`stepId\`) => \\{ \`data\`: \`T\`; \`timestamp\`: \`number\`; \\} \\| \`undefined\`

Defined in: [core/src/types.ts:144](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L144)

#### Type Parameters

##### T

\`T\`

#### Parameters

##### stepId

\`string\`

#### Returns

\\{ \`data\`: \`T\`; \`timestamp\`: \`number\`; \\} \\| \`undefined\`

***

### saveStep()

> **saveStep**: \\<\`T\`\\>(\`stepId\`, \`data\`) => \`void\`

Defined in: [core/src/types.ts:142](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L142)

#### Type Parameters

##### T

\`T\`

#### Parameters

##### stepId

\`string\`

##### data

\`T\`

#### Returns

\`void\`
`,fD=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [core/src](../README.md) / IStepConfig

# Interface: IStepConfig\\<TStepData, StepId\\>

Defined in: [core/src/types.ts:157](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L157)

Step Configuration

## Type Parameters

### TStepData

\`TStepData\` = \`unknown\`

### StepId

\`StepId\` *extends* \`string\` = \`string\`

## Properties

### ~~autoValidate?~~

> \`optional\` **autoValidate**: \`boolean\`

Defined in: [core/src/types.ts:179](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L179)

#### Deprecated

Use validationMode instead

***

### beforeLeave()?

> \`optional\` **beforeLeave**: (\`data\`, \`direction\`, \`metadata\`) => \`boolean\` \\| \`Promise\`\\<\`boolean\`\\>

Defined in: [core/src/types.ts:169](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L169)

#### Parameters

##### data

\`TStepData\`

##### direction

[\`StepDirection\`](../type-aliases/StepDirection.md)

##### metadata

\`Partial\`\\<[\`IWizardState\`](IWizardState.md)\\<\`TStepData\`, \`StepId\`\\>\\> & \`object\`

#### Returns

\`boolean\` \\| \`Promise\`\\<\`boolean\`\\>

***

### canNavigateTo()?

> \`optional\` **canNavigateTo**: (\`data\`, \`metadata\`) => \`boolean\` \\| \`Promise\`\\<\`boolean\`\\>

Defined in: [core/src/types.ts:189](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L189)

#### Parameters

##### data

\`TStepData\`

##### metadata

\`Partial\`\\<[\`IWizardState\`](IWizardState.md)\\<\`TStepData\`, \`StepId\`\\>\\> & \`object\`

#### Returns

\`boolean\` \\| \`Promise\`\\<\`boolean\`\\>

***

### clearData?

> \`optional\` **clearData**: \`string\` \\| \`string\`[] \\| (\`data\`, \`changedFields\`) => \`Partial\`\\<\`TStepData\`\\>

Defined in: [core/src/types.ts:185](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L185)

***

### component?

> \`optional\` **component**: \`any\`

Defined in: [core/src/types.ts:181](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L181)

***

### condition()?

> \`optional\` **condition**: (\`data\`, \`metadata\`) => \`boolean\` \\| \`Promise\`\\<\`boolean\`\\>

Defined in: [core/src/types.ts:160](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L160)

#### Parameters

##### data

\`TStepData\`

##### metadata

\`Partial\`\\<[\`IWizardState\`](IWizardState.md)\\<\`TStepData\`, \`StepId\`\\>\\> & \`object\`

#### Returns

\`boolean\` \\| \`Promise\`\\<\`boolean\`\\>

***

### conditionDependsOn?

> \`optional\` **conditionDependsOn**: \`string\`[]

Defined in: [core/src/types.ts:168](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L168)

***

### dependsOn?

> \`optional\` **dependsOn**: \`string\`[]

Defined in: [core/src/types.ts:184](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L184)

***

### id

> **id**: \`StepId\`

Defined in: [core/src/types.ts:158](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L158)

***

### label

> **label**: \`string\`

Defined in: [core/src/types.ts:159](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L159)

***

### persistenceAdapter?

> \`optional\` **persistenceAdapter**: [\`IPersistenceAdapter\`](IPersistenceAdapter.md)

Defined in: [core/src/types.ts:182](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L182)

***

### persistenceMode?

> \`optional\` **persistenceMode**: [\`PersistenceMode\`](../type-aliases/PersistenceMode.md)

Defined in: [core/src/types.ts:183](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L183)

***

### showWhilePending?

> \`optional\` **showWhilePending**: \`boolean\`

Defined in: [core/src/types.ts:167](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L167)

***

### validationAdapter?

> \`optional\` **validationAdapter**: [\`IValidatorAdapter\`](IValidatorAdapter.md)\\<\`TStepData\`\\>

Defined in: [core/src/types.ts:177](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L177)

***

### validationMode?

> \`optional\` **validationMode**: [\`ValidationMode\`](../type-aliases/ValidationMode.md)

Defined in: [core/src/types.ts:180](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L180)
`,pD=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [core/src](../README.md) / IValidatorAdapter

# Interface: IValidatorAdapter\\<TData\\>

Defined in: [core/src/types.ts:125](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L125)

Validator Adapter Interface

## Type Parameters

### TData

\`TData\` = \`unknown\`

## Properties

### validate()

> **validate**: (\`data\`) => [\`ValidationResult\`](../type-aliases/ValidationResult.md) \\| \`Promise\`\\<[\`ValidationResult\`](../type-aliases/ValidationResult.md)\\>

Defined in: [core/src/types.ts:126](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L126)

#### Parameters

##### data

\`TData\`

#### Returns

[\`ValidationResult\`](../type-aliases/ValidationResult.md) \\| \`Promise\`\\<[\`ValidationResult\`](../type-aliases/ValidationResult.md)\\>
`,hD=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [core/src](../README.md) / IWizardActions

# Interface: IWizardActions\\<StepId\\>

Defined in: [core/src/types.ts:90](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L90)

Public actions available to control the wizard.

## Extended by

- [\`IWizardContext\`](IWizardContext.md)

## Type Parameters

### StepId

\`StepId\` *extends* \`string\` = \`string\`

## Properties

### clearStorage()

> **clearStorage**: () => \`void\`

Defined in: [core/src/types.ts:106](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L106)

#### Returns

\`void\`

***

### getData()

> **getData**: (\`path\`, \`defaultValue?\`) => \`unknown\`

Defined in: [core/src/types.ts:110](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L110)

#### Parameters

##### path

\`string\`

##### defaultValue?

\`unknown\`

#### Returns

\`unknown\`

***

### goToNextStep()

> **goToNextStep**: () => \`Promise\`\\<\`void\`\\>

Defined in: [core/src/types.ts:91](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L91)

#### Returns

\`Promise\`\\<\`void\`\\>

***

### goToPrevStep()

> **goToPrevStep**: () => \`Promise\`\\<\`void\`\\>

Defined in: [core/src/types.ts:92](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L92)

#### Returns

\`Promise\`\\<\`void\`\\>

***

### goToStep()

> **goToStep**: (\`stepId\`, \`providedActiveSteps?\`, \`options?\`) => \`Promise\`\\<\`boolean\`\\>

Defined in: [core/src/types.ts:93](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L93)

#### Parameters

##### stepId

\`StepId\`

##### providedActiveSteps?

\`any\`[]

##### options?

###### validate?

\`boolean\`

#### Returns

\`Promise\`\\<\`boolean\`\\>

***

### handleStepChange()

> **handleStepChange**: (\`field\`, \`value\`) => \`void\`

Defined in: [core/src/types.ts:99](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L99)

#### Parameters

##### field

\`string\`

##### value

\`unknown\`

#### Returns

\`void\`

***

### reset()

> **reset**: () => \`void\`

Defined in: [core/src/types.ts:107](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L107)

#### Returns

\`void\`

***

### save()

> **save**: (\`stepIds?\`) => \`void\`

Defined in: [core/src/types.ts:105](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L105)

#### Parameters

##### stepIds?

\`boolean\` | \`StepId\` | \`StepId\`[]

#### Returns

\`void\`

***

### setData()

> **setData**: (\`path\`, \`value\`, \`options?\`) => \`void\`

Defined in: [core/src/types.ts:108](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L108)

#### Parameters

##### path

\`string\`

##### value

\`unknown\`

##### options?

###### debounceValidation?

\`number\`

#### Returns

\`void\`

***

### setStepData()

> **setStepData**: (\`stepId\`, \`data\`) => \`void\`

Defined in: [core/src/types.ts:98](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L98)

#### Parameters

##### stepId

\`StepId\`

##### data

\`unknown\`

#### Returns

\`void\`

***

### updateConfig()

> **updateConfig**: (\`config\`) => \`void\`

Defined in: [core/src/types.ts:111](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L111)

#### Parameters

##### config

\`Partial\`\\<[\`IWizardConfig\`](IWizardConfig.md)\\<\`any\`, \`StepId\`\\>\\>

#### Returns

\`void\`

***

### updateData()

> **updateData**: (\`data\`, \`options?\`) => \`void\`

Defined in: [core/src/types.ts:109](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L109)

#### Parameters

##### data

\`Partial\`\\<\`any\`\\>

##### options?

###### persist?

\`boolean\`

###### replace?

\`boolean\`

#### Returns

\`void\`

***

### validateAll()

> **validateAll**: () => \`Promise\`\\<\\{ \`errors\`: \`Record\`\\<\`string\`, \`Record\`\\<\`string\`, \`string\`\\>\\>; \`isValid\`: \`boolean\`; \\}\\>

Defined in: [core/src/types.ts:101](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L101)

#### Returns

\`Promise\`\\<\\{ \`errors\`: \`Record\`\\<\`string\`, \`Record\`\\<\`string\`, \`string\`\\>\\>; \`isValid\`: \`boolean\`; \\}\\>

***

### validateStep()

> **validateStep**: (\`sid\`) => \`Promise\`\\<\`boolean\`\\>

Defined in: [core/src/types.ts:100](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L100)

#### Parameters

##### sid

\`StepId\`

#### Returns

\`Promise\`\\<\`boolean\`\\>
`,mD=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [core/src](../README.md) / IWizardConfig

# Interface: IWizardConfig\\<T, StepId\\>

Defined in: [core/src/types.ts:201](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L201)

Global Wizard Configuration.

## Type Parameters

### T

\`T\` = \`unknown\`

### StepId

\`StepId\` *extends* \`string\` = \`string\`

## Properties

### analytics?

> \`optional\` **analytics**: \`object\`

Defined in: [core/src/types.ts:214](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L214)

#### onEvent

> **onEvent**: [\`WizardEventHandler\`](../type-aliases/WizardEventHandler.md)\\<\`StepId\`\\>

***

### ~~autoValidate?~~

> \`optional\` **autoValidate**: \`boolean\`

Defined in: [core/src/types.ts:204](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L204)

#### Deprecated

Use validationMode instead

***

### middlewares?

> \`optional\` **middlewares**: [\`WizardMiddleware\`](../type-aliases/WizardMiddleware.md)\\<\`T\`, \`StepId\`\\>[]

Defined in: [core/src/types.ts:217](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L217)

***

### navigationMode?

> \`optional\` **navigationMode**: \`"sequential"\` \\| \`"visited"\` \\| \`"free"\`

Defined in: [core/src/types.ts:218](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L218)

***

### onConflict?

> \`optional\` **onConflict**: \`"merge"\` \\| \`"replace"\` \\| \`"keep-local"\`

Defined in: [core/src/types.ts:213](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L213)

***

### onStepChange()?

> \`optional\` **onStepChange**: (\`fromStep\`, \`toStep\`, \`data\`) => \`void\`

Defined in: [core/src/types.ts:219](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L219)

#### Parameters

##### fromStep

\`StepId\` | \`null\`

##### toStep

\`StepId\`

##### data

\`T\`

#### Returns

\`void\`

***

### persistence?

> \`optional\` **persistence**: \`object\`

Defined in: [core/src/types.ts:207](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L207)

#### adapter?

> \`optional\` **adapter**: [\`IPersistenceAdapter\`](IPersistenceAdapter.md)

#### debounceTime?

> \`optional\` **debounceTime**: \`number\`

#### mode?

> \`optional\` **mode**: [\`PersistenceMode\`](../type-aliases/PersistenceMode.md)

#### storageKey?

> \`optional\` **storageKey**: \`string\`

***

### steps

> **steps**: [\`IStepConfig\`](IStepConfig.md)\\<\`T\`, \`StepId\`\\>[]

Defined in: [core/src/types.ts:202](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L202)

***

### validationDebounceTime?

> \`optional\` **validationDebounceTime**: \`number\`

Defined in: [core/src/types.ts:206](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L206)

***

### validationMode?

> \`optional\` **validationMode**: [\`ValidationMode\`](../type-aliases/ValidationMode.md)

Defined in: [core/src/types.ts:205](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L205)
`,gD=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [core/src](../README.md) / IWizardContext

# Interface: IWizardContext\\<T, StepId\\>

Defined in: [core/src/types.ts:320](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L320)

High-level context for the wizard, combining state and actions.

## Extends

- \`Omit\`\\<[\`IWizardState\`](IWizardState.md)\\<\`T\`, \`StepId\`\\>, \`"errors"\`\\>.[\`IWizardActions\`](IWizardActions.md)\\<\`StepId\`\\>

## Type Parameters

### T

\`T\` = \`unknown\`

### StepId

\`StepId\` *extends* \`string\` = \`string\`

## Properties

### activeSteps

> **activeSteps**: [\`IStepConfig\`](IStepConfig.md)\\<\`T\`, \`StepId\`\\>[]

Defined in: [core/src/types.ts:26](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L26)

List of steps that currently meet their visibility conditions

#### Inherited from

\`Omit.activeSteps\`

***

### activeStepsCount

> **activeStepsCount**: \`number\`

Defined in: [core/src/types.ts:44](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L44)

Number of active steps

#### Inherited from

\`Omit.activeStepsCount\`

***

### allErrors

> **allErrors**: \`Record\`\\<\`StepId\`, \`Record\`\\<\`string\`, \`string\`\\>\\>

Defined in: [core/src/types.ts:333](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L333)

All errors by step and field.

***

### breadcrumbs

> **breadcrumbs**: [\`IBreadcrumb\`](IBreadcrumb.md)\\<\`StepId\`\\>[]

Defined in: [core/src/types.ts:52](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L52)

Breadcrumb items for navigation UI

#### Inherited from

\`Omit.breadcrumbs\`

***

### busySteps

> **busySteps**: \`Set\`\\<\`StepId\`\\>

Defined in: [core/src/types.ts:32](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L32)

Set of step IDs that are currently performing async work

#### Inherited from

\`Omit.busySteps\`

***

### clearStorage()

> **clearStorage**: () => \`void\`

Defined in: [core/src/types.ts:106](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L106)

#### Returns

\`void\`

#### Inherited from

[\`IWizardActions\`](IWizardActions.md).[\`clearStorage\`](IWizardActions.md#clearstorage)

***

### completedSteps

> **completedSteps**: \`Set\`\\<\`StepId\`\\>

Defined in: [core/src/types.ts:36](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L36)

Set of step IDs that have passed validation

#### Inherited from

\`Omit.completedSteps\`

***

### config

> **config**: [\`IWizardConfig\`](IWizardConfig.md)\\<\`T\`, \`StepId\`\\>

Defined in: [core/src/types.ts:40](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L40)

Current wizard configuration

#### Inherited from

\`Omit.config\`

***

### currentStep

> **currentStep**: [\`IStepConfig\`](IStepConfig.md)\\<\`T\`, \`StepId\`\\> \\| \`null\`

Defined in: [core/src/types.ts:14](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L14)

Active step configuration (if any)

#### Inherited from

\`Omit.currentStep\`

***

### currentStepId

> **currentStepId**: \`""\` \\| \`StepId\`

Defined in: [core/src/types.ts:28](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L28)

String ID of the current step

#### Inherited from

\`Omit.currentStepId\`

***

### currentStepIndex

> **currentStepIndex**: \`number\`

Defined in: [core/src/types.ts:16](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L16)

Numeric index of current step in active steps list

#### Inherited from

\`Omit.currentStepIndex\`

***

### data

> **data**: \`T\`

Defined in: [core/src/types.ts:10](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L10)

Global wizard data object

#### Inherited from

\`Omit.data\`

***

### dirtyFields

> **dirtyFields**: \`Set\`\\<\`string\`\\>

Defined in: [core/src/types.ts:50](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L50)

Set of paths to fields that have been modified

#### Inherited from

\`Omit.dirtyFields\`

***

### errors

> **errors**: \`Record\`\\<\`string\`, \`string\`\\>

Defined in: [core/src/types.ts:329](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L329)

Combined error map (flat)

***

### errorSteps

> **errorSteps**: \`Set\`\\<\`StepId\`\\>

Defined in: [core/src/types.ts:38](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L38)

Set of step IDs that currently have active validation errors

#### Inherited from

\`Omit.errorSteps\`

***

### getData()

> **getData**: (\`path\`, \`defaultValue?\`) => \`unknown\`

Defined in: [core/src/types.ts:110](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L110)

#### Parameters

##### path

\`string\`

##### defaultValue?

\`unknown\`

#### Returns

\`unknown\`

#### Inherited from

[\`IWizardActions\`](IWizardActions.md).[\`getData\`](IWizardActions.md#getdata)

***

### goToNextStep()

> **goToNextStep**: () => \`Promise\`\\<\`void\`\\>

Defined in: [core/src/types.ts:91](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L91)

#### Returns

\`Promise\`\\<\`void\`\\>

#### Inherited from

[\`IWizardActions\`](IWizardActions.md).[\`goToNextStep\`](IWizardActions.md#gotonextstep)

***

### goToPrevStep()

> **goToPrevStep**: () => \`Promise\`\\<\`void\`\\>

Defined in: [core/src/types.ts:92](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L92)

#### Returns

\`Promise\`\\<\`void\`\\>

#### Inherited from

[\`IWizardActions\`](IWizardActions.md).[\`goToPrevStep\`](IWizardActions.md#gotoprevstep)

***

### goToStep()

> **goToStep**: (\`stepId\`, \`providedActiveSteps?\`, \`options?\`) => \`Promise\`\\<\`boolean\`\\>

Defined in: [core/src/types.ts:93](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L93)

#### Parameters

##### stepId

\`StepId\`

##### providedActiveSteps?

\`any\`[]

##### options?

###### validate?

\`boolean\`

#### Returns

\`Promise\`\\<\`boolean\`\\>

#### Inherited from

[\`IWizardActions\`](IWizardActions.md).[\`goToStep\`](IWizardActions.md#gotostep)

***

### goToStepResult?

> \`optional\` **goToStepResult**: \`boolean\` \\| \`"init"\` \\| \`null\`

Defined in: [core/src/types.ts:54](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L54)

Result of the last goToStep action

#### Inherited from

\`Omit.goToStepResult\`

***

### handleStepChange()

> **handleStepChange**: (\`field\`, \`value\`) => \`void\`

Defined in: [core/src/types.ts:99](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L99)

#### Parameters

##### field

\`string\`

##### value

\`unknown\`

#### Returns

\`void\`

#### Inherited from

[\`IWizardActions\`](IWizardActions.md).[\`handleStepChange\`](IWizardActions.md#handlestepchange)

***

### history

> **history**: \`StepId\`[]

Defined in: [core/src/types.ts:30](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L30)

History of visited steps (navigation path)

#### Inherited from

\`Omit.history\`

***

### isBusy

> **isBusy**: \`boolean\`

Defined in: [core/src/types.ts:46](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L46)

Alias for isPending

#### Inherited from

\`Omit.isBusy\`

***

### isDirty

> **isDirty**: \`boolean\`

Defined in: [core/src/types.ts:48](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L48)

True if any field has been modified since initialization

#### Inherited from

\`Omit.isDirty\`

***

### isFirstStep

> **isFirstStep**: \`boolean\`

Defined in: [core/src/types.ts:18](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L18)

True if currently on the first active step

#### Inherited from

\`Omit.isFirstStep\`

***

### isLastStep

> **isLastStep**: \`boolean\`

Defined in: [core/src/types.ts:20](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L20)

True if currently on the last active step

#### Inherited from

\`Omit.isLastStep\`

***

### isLoading

> **isLoading**: \`boolean\`

Defined in: [core/src/types.ts:22](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L22)

True if the wizard is in an initial loading/hydrating state

#### Inherited from

\`Omit.isLoading\`

***

### isPending

> **isPending**: \`boolean\`

Defined in: [core/src/types.ts:24](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L24)

True if an async action (like navigation or validation) is in progress

#### Inherited from

\`Omit.isPending\`

***

### progress

> **progress**: \`number\`

Defined in: [core/src/types.ts:42](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L42)

Percentage of completion (0-100)

#### Inherited from

\`Omit.progress\`

***

### reset()

> **reset**: () => \`void\`

Defined in: [core/src/types.ts:107](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L107)

#### Returns

\`void\`

#### Inherited from

[\`IWizardActions\`](IWizardActions.md).[\`reset\`](IWizardActions.md#reset)

***

### save()

> **save**: (\`stepIds?\`) => \`void\`

Defined in: [core/src/types.ts:105](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L105)

#### Parameters

##### stepIds?

\`boolean\` | \`StepId\` | \`StepId\`[]

#### Returns

\`void\`

#### Inherited from

[\`IWizardActions\`](IWizardActions.md).[\`save\`](IWizardActions.md#save)

***

### setData()

> **setData**: (\`path\`, \`value\`, \`options?\`) => \`void\`

Defined in: [core/src/types.ts:108](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L108)

#### Parameters

##### path

\`string\`

##### value

\`unknown\`

##### options?

###### debounceValidation?

\`number\`

#### Returns

\`void\`

#### Inherited from

[\`IWizardActions\`](IWizardActions.md).[\`setData\`](IWizardActions.md#setdata)

***

### setStepData()

> **setStepData**: (\`stepId\`, \`data\`) => \`void\`

Defined in: [core/src/types.ts:98](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L98)

#### Parameters

##### stepId

\`StepId\`

##### data

\`unknown\`

#### Returns

\`void\`

#### Inherited from

[\`IWizardActions\`](IWizardActions.md).[\`setStepData\`](IWizardActions.md#setstepdata)

***

### store

> **store**: [\`IWizardStore\`](IWizardStore.md)\\<\`T\`, \`StepId\`\\>

Defined in: [core/src/types.ts:325](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L325)

The internal store instance.

***

### updateConfig()

> **updateConfig**: (\`config\`) => \`void\`

Defined in: [core/src/types.ts:111](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L111)

#### Parameters

##### config

\`Partial\`\\<[\`IWizardConfig\`](IWizardConfig.md)\\<\`any\`, \`StepId\`\\>\\>

#### Returns

\`void\`

#### Inherited from

[\`IWizardActions\`](IWizardActions.md).[\`updateConfig\`](IWizardActions.md#updateconfig)

***

### updateData()

> **updateData**: (\`data\`, \`options?\`) => \`void\`

Defined in: [core/src/types.ts:109](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L109)

#### Parameters

##### data

\`Partial\`\\<\`any\`\\>

##### options?

###### persist?

\`boolean\`

###### replace?

\`boolean\`

#### Returns

\`void\`

#### Inherited from

[\`IWizardActions\`](IWizardActions.md).[\`updateData\`](IWizardActions.md#updatedata)

***

### validateAll()

> **validateAll**: () => \`Promise\`\\<\\{ \`errors\`: \`Record\`\\<\`string\`, \`Record\`\\<\`string\`, \`string\`\\>\\>; \`isValid\`: \`boolean\`; \\}\\>

Defined in: [core/src/types.ts:101](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L101)

#### Returns

\`Promise\`\\<\\{ \`errors\`: \`Record\`\\<\`string\`, \`Record\`\\<\`string\`, \`string\`\\>\\>; \`isValid\`: \`boolean\`; \\}\\>

#### Inherited from

[\`IWizardActions\`](IWizardActions.md).[\`validateAll\`](IWizardActions.md#validateall)

***

### validateStep()

> **validateStep**: (\`sid\`) => \`Promise\`\\<\`boolean\`\\>

Defined in: [core/src/types.ts:100](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L100)

#### Parameters

##### sid

\`StepId\`

#### Returns

\`Promise\`\\<\`boolean\`\\>

#### Inherited from

[\`IWizardActions\`](IWizardActions.md).[\`validateStep\`](IWizardActions.md#validatestep)

***

### visitedSteps

> **visitedSteps**: \`Set\`\\<\`StepId\`\\>

Defined in: [core/src/types.ts:34](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L34)

Set of step IDs that have been visited by the user

#### Inherited from

\`Omit.visitedSteps\`
`,yD=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [core/src](../README.md) / IWizardState

# Interface: IWizardState\\<T, StepId\\>

Defined in: [core/src/types.ts:8](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L8)

Full state of the wizard.

## Type Parameters

### T

\`T\` = \`unknown\`

### StepId

\`StepId\` *extends* \`string\` = \`string\`

## Properties

### activeSteps

> **activeSteps**: [\`IStepConfig\`](IStepConfig.md)\\<\`T\`, \`StepId\`\\>[]

Defined in: [core/src/types.ts:26](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L26)

List of steps that currently meet their visibility conditions

***

### activeStepsCount

> **activeStepsCount**: \`number\`

Defined in: [core/src/types.ts:44](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L44)

Number of active steps

***

### breadcrumbs

> **breadcrumbs**: [\`IBreadcrumb\`](IBreadcrumb.md)\\<\`StepId\`\\>[]

Defined in: [core/src/types.ts:52](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L52)

Breadcrumb items for navigation UI

***

### busySteps

> **busySteps**: \`Set\`\\<\`StepId\`\\>

Defined in: [core/src/types.ts:32](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L32)

Set of step IDs that are currently performing async work

***

### completedSteps

> **completedSteps**: \`Set\`\\<\`StepId\`\\>

Defined in: [core/src/types.ts:36](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L36)

Set of step IDs that have passed validation

***

### config

> **config**: [\`IWizardConfig\`](IWizardConfig.md)\\<\`T\`, \`StepId\`\\>

Defined in: [core/src/types.ts:40](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L40)

Current wizard configuration

***

### currentStep

> **currentStep**: [\`IStepConfig\`](IStepConfig.md)\\<\`T\`, \`StepId\`\\> \\| \`null\`

Defined in: [core/src/types.ts:14](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L14)

Active step configuration (if any)

***

### currentStepId

> **currentStepId**: \`""\` \\| \`StepId\`

Defined in: [core/src/types.ts:28](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L28)

String ID of the current step

***

### currentStepIndex

> **currentStepIndex**: \`number\`

Defined in: [core/src/types.ts:16](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L16)

Numeric index of current step in active steps list

***

### data

> **data**: \`T\`

Defined in: [core/src/types.ts:10](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L10)

Global wizard data object

***

### dirtyFields

> **dirtyFields**: \`Set\`\\<\`string\`\\>

Defined in: [core/src/types.ts:50](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L50)

Set of paths to fields that have been modified

***

### errors

> **errors**: \`Record\`\\<\`StepId\`, \`Record\`\\<\`string\`, \`string\`\\>\\>

Defined in: [core/src/types.ts:12](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L12)

Current errors map by step and field

***

### errorSteps

> **errorSteps**: \`Set\`\\<\`StepId\`\\>

Defined in: [core/src/types.ts:38](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L38)

Set of step IDs that currently have active validation errors

***

### goToStepResult?

> \`optional\` **goToStepResult**: \`boolean\` \\| \`"init"\` \\| \`null\`

Defined in: [core/src/types.ts:54](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L54)

Result of the last goToStep action

***

### history

> **history**: \`StepId\`[]

Defined in: [core/src/types.ts:30](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L30)

History of visited steps (navigation path)

***

### isBusy

> **isBusy**: \`boolean\`

Defined in: [core/src/types.ts:46](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L46)

Alias for isPending

***

### isDirty

> **isDirty**: \`boolean\`

Defined in: [core/src/types.ts:48](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L48)

True if any field has been modified since initialization

***

### isFirstStep

> **isFirstStep**: \`boolean\`

Defined in: [core/src/types.ts:18](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L18)

True if currently on the first active step

***

### isLastStep

> **isLastStep**: \`boolean\`

Defined in: [core/src/types.ts:20](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L20)

True if currently on the last active step

***

### isLoading

> **isLoading**: \`boolean\`

Defined in: [core/src/types.ts:22](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L22)

True if the wizard is in an initial loading/hydrating state

***

### isPending

> **isPending**: \`boolean\`

Defined in: [core/src/types.ts:24](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L24)

True if an async action (like navigation or validation) is in progress

***

### progress

> **progress**: \`number\`

Defined in: [core/src/types.ts:42](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L42)

Percentage of completion (0-100)

***

### visitedSteps

> **visitedSteps**: \`Set\`\\<\`StepId\`\\>

Defined in: [core/src/types.ts:34](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L34)

Set of step IDs that have been visited by the user
`,bD=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [core/src](../README.md) / IWizardStore

# Interface: IWizardStore\\<T, StepId\\>

Defined in: [core/src/types.ts:60](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L60)

Store interface for reading state and dispatching actions.

## Type Parameters

### T

\`T\`

### StepId

\`StepId\` *extends* \`string\` = \`string\`

## Properties

### errorsMap

> **errorsMap**: \`Map\`\\<\`string\`, \`Map\`\\<\`string\`, \`string\`\\>\\>

Defined in: [core/src/types.ts:74](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L74)

***

### validateAll()

> **validateAll**: () => \`Promise\`\\<\\{ \`errors\`: \`Record\`\\<\`string\`, \`Record\`\\<\`string\`, \`string\`\\>\\>; \`isValid\`: \`boolean\`; \\}\\>

Defined in: [core/src/types.ts:81](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L81)

#### Returns

\`Promise\`\\<\\{ \`errors\`: \`Record\`\\<\`string\`, \`Record\`\\<\`string\`, \`string\`\\>\\>; \`isValid\`: \`boolean\`; \\}\\>

***

### validateStep()

> **validateStep**: (\`stepId\`) => \`Promise\`\\<\`boolean\`\\>

Defined in: [core/src/types.ts:80](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L80)

#### Parameters

##### stepId

\`StepId\`

#### Returns

\`Promise\`\\<\`boolean\`\\>

## Methods

### deleteError()

> **deleteError**(\`stepId\`, \`path\`): \`boolean\`

Defined in: [core/src/types.ts:68](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L68)

#### Parameters

##### stepId

\`string\`

##### path

\`string\`

#### Returns

\`boolean\`

***

### dispatch()

> **dispatch**(\`action\`): \`void\`

Defined in: [core/src/types.ts:62](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L62)

#### Parameters

##### action

[\`WizardAction\`](../type-aliases/WizardAction.md)\\<\`T\`, \`StepId\`\\>

#### Returns

\`void\`

***

### getSnapshot()

> **getSnapshot**(): [\`IWizardState\`](IWizardState.md)\\<\`T\`, \`StepId\`\\>

Defined in: [core/src/types.ts:61](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L61)

#### Returns

[\`IWizardState\`](IWizardState.md)\\<\`T\`, \`StepId\`\\>

***

### goToStep()

> **goToStep**(\`stepId\`, \`options?\`): \`Promise\`\\<\`boolean\`\\>

Defined in: [core/src/types.ts:76](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L76)

#### Parameters

##### stepId

\`StepId\`

##### options?

###### providedActiveSteps?

[\`IStepConfig\`](IStepConfig.md)\\<\`T\`, \`StepId\`\\>[]

###### validate?

\`boolean\`

#### Returns

\`Promise\`\\<\`boolean\`\\>

***

### hydrate()

> **hydrate**(): \`void\`

Defined in: [core/src/types.ts:73](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L73)

#### Returns

\`void\`

***

### injectPersistence()

> **injectPersistence**(\`adapter\`): \`void\`

Defined in: [core/src/types.ts:71](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L71)

#### Parameters

##### adapter

[\`IPersistenceAdapter\`](IPersistenceAdapter.md)

#### Returns

\`void\`

***

### resolveActiveSteps()

> **resolveActiveSteps**(\`data?\`): \`Promise\`\\<[\`IStepConfig\`](IStepConfig.md)\\<\`T\`, \`StepId\`\\>[]\\>

Defined in: [core/src/types.ts:75](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L75)

#### Parameters

##### data?

\`T\`

#### Returns

\`Promise\`\\<[\`IStepConfig\`](IStepConfig.md)\\<\`T\`, \`StepId\`\\>[]\\>

***

### save()

> **save**(\`stepId?\`): \`void\`

Defined in: [core/src/types.ts:72](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L72)

#### Parameters

##### stepId?

\`StepId\`

#### Returns

\`void\`

***

### setInitialData()

> **setInitialData**(\`data\`): \`void\`

Defined in: [core/src/types.ts:65](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L65)

#### Parameters

##### data

\`T\`

#### Returns

\`void\`

***

### setStepErrors()

> **setStepErrors**(\`stepId\`, \`errors\`): \`boolean\`

Defined in: [core/src/types.ts:67](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L67)

#### Parameters

##### stepId

\`string\`

##### errors

\`Record\`\\<\`string\`, \`string\`\\> | \`null\` | \`undefined\`

#### Returns

\`boolean\`

***

### subscribe()

> **subscribe**(\`listener\`): () => \`void\`

Defined in: [core/src/types.ts:69](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L69)

#### Parameters

##### listener

() => \`void\`

#### Returns

> (): \`void\`

##### Returns

\`void\`

***

### subscribeToActions()

> **subscribeToActions**(\`listener\`): () => \`void\`

Defined in: [core/src/types.ts:70](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L70)

#### Parameters

##### listener

(\`action\`) => \`void\`

#### Returns

> (): \`void\`

##### Returns

\`void\`

***

### update()

> **update**(\`newData\`, \`changedPath?\`): \`void\`

Defined in: [core/src/types.ts:63](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L63)

#### Parameters

##### newData

\`T\`

##### changedPath?

\`string\` | \`string\`[]

#### Returns

\`void\`

***

### updateErrors()

> **updateErrors**(\`newErrors\`): \`void\`

Defined in: [core/src/types.ts:66](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L66)

#### Parameters

##### newErrors

\`Record\`\\<\`string\`, \`Record\`\\<\`string\`, \`string\`\\>\\>

#### Returns

\`void\`

***

### updateMeta()

> **updateMeta**(\`newMeta\`): \`void\`

Defined in: [core/src/types.ts:64](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L64)

#### Parameters

##### newMeta

\`Partial\`\\<[\`IWizardState\`](IWizardState.md)\\<\`T\`, \`StepId\`\\>\\>

#### Returns

\`void\`
`,zD=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [core/src](../README.md) / MiddlewareAPI

# Interface: MiddlewareAPI\\<T, StepId\\>

Defined in: [core/src/types.ts:258](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L258)

Middleware API

## Type Parameters

### T

\`T\` = \`any\`

### StepId

\`StepId\` *extends* \`string\` = \`string\`

## Properties

### dispatch()

> **dispatch**: (\`action\`) => \`void\`

Defined in: [core/src/types.ts:259](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L259)

#### Parameters

##### action

[\`WizardAction\`](../type-aliases/WizardAction.md)\\<\`T\`, \`StepId\`\\>

#### Returns

\`void\`

***

### getSnapshot()

> **getSnapshot**: () => [\`IWizardState\`](IWizardState.md)\\<\`T\`, \`StepId\`\\>

Defined in: [core/src/types.ts:261](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L261)

#### Returns

[\`IWizardState\`](IWizardState.md)\\<\`T\`, \`StepId\`\\>

***

### getState()

> **getState**: () => \`T\`

Defined in: [core/src/types.ts:260](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L260)

#### Returns

\`T\`
`,vD=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [core/src](../README.md) / BreadcrumbStatus

# Type Alias: BreadcrumbStatus

> **BreadcrumbStatus** = \`"visited"\` \\| \`"current"\` \\| \`"upcoming"\` \\| \`"completed"\` \\| \`"error"\` \\| \`"hidden"\`

Defined in: [core/src/types.ts:300](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L300)

Breadcrumb Status
`,SD="[**wizzard-packages**](../../../README.md)\n\n***\n\n[wizzard-packages](../../../README.md) / [core/src](../README.md) / Path\n\n# Type Alias: Path\\<T\\>\n\n> **Path**\\<`T`\\> = `T` *extends* `ReadonlyArray`\\<infer V\\> ? `IsTuple`\\<`T`\\> *extends* `true` ? `{ [K in TupleKeys<T>]-?: PathImpl<K & string, T[K]> }`\\[`TupleKeys`\\<`T`\\>\\] : `PathImpl`\\<`number`, `V`\\> : `{ [K in keyof T]-?: PathImpl<K & string, T[K]> }`\\[keyof `T`\\]\n\nDefined in: [core/src/utils/types.ts:18](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/utils/types.ts#L18)\n\nDot-notation path for a nested data type.\n\n## Type Parameters\n\n### T\n\n`T`\n",ED="[**wizzard-packages**](../../../README.md)\n\n***\n\n[wizzard-packages](../../../README.md) / [core/src](../README.md) / PathValue\n\n# Type Alias: PathValue\\<T, P\\>\n\n> **PathValue**\\<`T`, `P`\\> = `T` *extends* `any` ? `P` *extends* `` `${infer K}.${infer R}` `` ? `K` *extends* keyof `T` ? `R` *extends* [`Path`](Path.md)\\<`T`\\[`K`\\]\\> ? `PathValue`\\<`T`\\[`K`\\], `R`\\> : `never` : `K` *extends* `` `${number}` `` ? `T` *extends* `ReadonlyArray`\\<infer V\\> ? `R` *extends* [`Path`](Path.md)\\<`V`\\> ? `PathValue`\\<`V`, `R`\\> : `never` : `never` : `never` : `P` *extends* keyof `T` ? `T`\\[`P`\\] : `P` *extends* `` `${number}` `` ? `T` *extends* `ReadonlyArray`\\<infer V\\> ? `V` : `never` : `never` : `never`\n\nDefined in: [core/src/utils/types.ts:32](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/utils/types.ts#L32)\n\nValue type resolved from a dot-notation path.\n\n## Type Parameters\n\n### T\n\n`T`\n\n### P\n\n`P` *extends* [`Path`](Path.md)\\<`T`\\>\n",DD=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [core/src](../README.md) / PersistenceMode

# Type Alias: PersistenceMode

> **PersistenceMode** = \`"onStepChange"\` \\| \`"onChange"\` \\| \`"manual"\`

Defined in: [core/src/types.ts:132](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L132)

Persistence strategy for step data.
`,xD=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [core/src](../README.md) / StepDirection

# Type Alias: StepDirection

> **StepDirection** = \`"next"\` \\| \`"prev"\`

Defined in: [core/src/types.ts:152](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L152)

Step Navigation Direction
`,TD=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [core/src](../README.md) / ValidationMode

# Type Alias: ValidationMode

> **ValidationMode** = \`"onChange"\` \\| \`"onStepChange"\` \\| \`"manual"\`

Defined in: [core/src/types.ts:136](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L136)

Validation strategy for step data.
`,AD=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [core/src](../README.md) / ValidationResult

# Type Alias: ValidationResult

> **ValidationResult** = \`object\`

Defined in: [core/src/types.ts:117](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L117)

Validation Result Interface

## Properties

### errors?

> \`optional\` **errors**: \`Record\`\\<\`string\`, \`string\`\\>

Defined in: [core/src/types.ts:119](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L119)

***

### isValid

> **isValid**: \`boolean\`

Defined in: [core/src/types.ts:118](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L118)
`,wD='[**wizzard-packages**](../../../README.md)\n\n***\n\n[wizzard-packages](../../../README.md) / [core/src](../README.md) / WizardAction\n\n# Type Alias: WizardAction\\<T, StepId\\>\n\n> **WizardAction**\\<`T`, `StepId`\\> = \\{ `payload`: \\{ `config`: [`IWizardConfig`](../interfaces/IWizardConfig.md)\\<`T`, `StepId`\\>; `data`: `T`; \\}; `type`: `"INIT"`; \\} \\| \\{ `payload`: \\{ `options?`: `any`; `path`: `string`; `value`: `any`; \\}; `type`: `"SET_DATA"`; \\} \\| \\{ `payload`: \\{ `data`: `Partial`\\<`T`\\>; `options?`: `any`; \\}; `type`: `"UPDATE_DATA"`; \\} \\| \\{ `payload`: \\{ `from`: `StepId`; `nextHistory?`: `StepId`[]; `nextVisitedSteps?`: `Set`\\<`StepId`\\>; `result`: `boolean` \\| `null` \\| `"init"`; `to`: `StepId`; \\}; `type`: `"GO_TO_STEP"`; \\} \\| \\{ `payload`: \\{ `stepId`: `StepId`; \\}; `type`: `"VALIDATE_START"`; \\} \\| \\{ `payload`: \\{ `result`: [`ValidationResult`](ValidationResult.md); `stepId`: `StepId`; \\}; `type`: `"VALIDATE_END"`; \\} \\| \\{ `payload`: \\{ `errors`: `Record`\\<`string`, `string`\\> \\| `undefined` \\| `null`; `stepId`: `StepId`; \\}; `type`: `"SET_STEP_ERRORS"`; \\} \\| \\{ `payload`: \\{ `data`: `T`; \\}; `type`: `"RESET"`; \\} \\| \\{ `payload`: \\{ `meta`: `Partial`\\<[`IWizardState`](../interfaces/IWizardState.md)\\<`T`, `StepId`\\>\\>; \\}; `type`: `"UPDATE_META"`; \\} \\| \\{ `payload`: \\{ `stepId`: `StepId` \\| `""`; \\}; `type`: `"SET_CURRENT_STEP_ID"`; \\} \\| \\{ `payload`: \\{ `history`: `StepId`[]; \\}; `type`: `"SET_HISTORY"`; \\} \\| \\{ `payload`: \\{ `steps`: [`IStepConfig`](../interfaces/IStepConfig.md)\\<`T`, `StepId`\\>[]; \\}; `type`: `"SET_ACTIVE_STEPS"`; \\} \\| \\{ `payload`: \\{ `steps`: `Set`\\<`StepId`\\>; \\}; `type`: `"SET_VISITED_STEPS"`; \\} \\| \\{ `payload`: \\{ `steps`: `Set`\\<`StepId`\\>; \\}; `type`: `"SET_COMPLETED_STEPS"`; \\} \\| \\{ `payload`: \\{ `steps`: `Set`\\<`StepId`\\>; \\}; `type`: `"SET_ERROR_STEPS"`; \\} \\| \\{ `payload`: \\{ `snapshot`: `any`; \\}; `type`: `"RESTORE_SNAPSHOT"`; \\}\n\nDefined in: [core/src/types.ts:225](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L225)\n\nAction Types\n\n## Type Parameters\n\n### T\n\n`T` = `any`\n\n### StepId\n\n`StepId` *extends* `string` = `string`\n',RD=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [core/src](../README.md) / WizardEventHandler

# Type Alias: WizardEventHandler()\\<StepId\\>

> **WizardEventHandler**\\<\`StepId\`\\> = \\<\`E\`\\>(\`name\`, \`payload\`) => \`void\`

Defined in: [core/src/types.ts:292](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L292)

Generic Event Handler Type

## Type Parameters

### StepId

\`StepId\` *extends* \`string\` = \`string\`

## Type Parameters

### E

\`E\` *extends* [\`WizardEventName\`](WizardEventName.md)

## Parameters

### name

\`E\`

### payload

[\`WizardEventPayloads\`](WizardEventPayloads.md)\\<\`StepId\`\\>\\[\`E\`\\]

## Returns

\`void\`
`,kD=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [core/src](../README.md) / WizardEventName

# Type Alias: WizardEventName

> **WizardEventName** = \`"step_change"\` \\| \`"validation_error"\` \\| \`"wizard_reset"\`

Defined in: [core/src/types.ts:274](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L274)

Standardized Event Names
`,ID=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [core/src](../README.md) / WizardEventPayloads

# Type Alias: WizardEventPayloads\\<StepId\\>

> **WizardEventPayloads**\\<\`StepId\`\\> = \`object\`

Defined in: [core/src/types.ts:279](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L279)

Event Payloads

## Type Parameters

### StepId

\`StepId\` *extends* \`string\` = \`string\`

## Properties

### step\\_change

> **step\\_change**: \`object\`

Defined in: [core/src/types.ts:280](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L280)

#### from

> **from**: \`StepId\` \\| \`null\`

#### timestamp

> **timestamp**: \`number\`

#### to

> **to**: \`StepId\`

***

### validation\\_error

> **validation\\_error**: \`object\`

Defined in: [core/src/types.ts:281](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L281)

#### errors

> **errors**: \`Record\`\\<\`string\`, \`string\`\\> \\| \`undefined\`

#### stepId

> **stepId**: \`StepId\`

#### timestamp

> **timestamp**: \`number\`

***

### wizard\\_reset

> **wizard\\_reset**: \`object\`

Defined in: [core/src/types.ts:286](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L286)

#### data

> **data**: \`any\`

#### timestamp?

> \`optional\` **timestamp**: \`number\`
`,MD=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [core/src](../README.md) / WizardMiddleware

# Type Alias: WizardMiddleware()\\<T, StepId\\>

> **WizardMiddleware**\\<\`T\`, \`StepId\`\\> = (\`api\`) => (\`next\`) => (\`action\`) => \`void\`

Defined in: [core/src/types.ts:267](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/core/src/types.ts#L267)

Middleware Type Definition

## Type Parameters

### T

\`T\` = \`any\`

### StepId

\`StepId\` *extends* \`string\` = \`string\`

## Parameters

### api

[\`MiddlewareAPI\`](../interfaces/MiddlewareAPI.md)\\<\`T\`, \`StepId\`\\>

## Returns

> (\`next\`): (\`action\`) => \`void\`

### Parameters

#### next

(\`action\`) => \`void\`

### Returns

> (\`action\`): \`void\`

#### Parameters

##### action

[\`WizardAction\`](WizardAction.md)\\<\`T\`, \`StepId\`\\>

#### Returns

\`void\`
`,_D=`[**wizzard-packages**](../../README.md)

***

[wizzard-packages](../../README.md) / devtools/src

# devtools/src

## Functions

- [WizardDevTools](functions/WizardDevTools.md)
`,CD=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [devtools/src](../README.md) / WizardDevTools

# Function: WizardDevTools()

> **WizardDevTools**(): \`Element\`

Defined in: [devtools/src/WizardDevTools.tsx:11](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/devtools/src/WizardDevTools.tsx#L11)

## Returns

\`Element\`
`,LD=`[**wizzard-packages**](../../README.md)

***

[wizzard-packages](../../README.md) / middleware/src

# middleware/src

## Variables

- [devToolsMiddleware](variables/devToolsMiddleware.md)
- [loggerMiddleware](variables/loggerMiddleware.md)
`,OD=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [middleware/src](../README.md) / devToolsMiddleware

# Variable: devToolsMiddleware

> \`const\` **devToolsMiddleware**: [\`WizardMiddleware\`](../../../react/src/type-aliases/WizardMiddleware.md)\\<\`any\`, \`any\`\\>

Defined in: [middleware/src/devToolsMiddleware.ts:49](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/middleware/src/devToolsMiddleware.ts#L49)

Middleware for Redux DevTools integration.
`,ND=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [middleware/src](../README.md) / loggerMiddleware

# Variable: loggerMiddleware

> \`const\` **loggerMiddleware**: [\`WizardMiddleware\`](../../../react/src/type-aliases/WizardMiddleware.md)\\<\`any\`, \`any\`\\>

Defined in: [middleware/src/loggerMiddleware.ts:6](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/middleware/src/loggerMiddleware.ts#L6)

Simple logger middleware for Wizard actions
`,WD=`[**wizzard-packages**](../../README.md)

***

[wizzard-packages](../../README.md) / persistence/src

# persistence/src

## Classes

- [LocalStorageAdapter](classes/LocalStorageAdapter.md)
- [MemoryAdapter](classes/MemoryAdapter.md)
`,UD=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [persistence/src](../README.md) / LocalStorageAdapter

# Class: LocalStorageAdapter

Defined in: [persistence/src/LocalStorageAdapter.ts:6](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/persistence/src/LocalStorageAdapter.ts#L6)

Browser persistence adapter backed by localStorage.

## Implements

- \`IPersistenceAdapter\`

## Constructors

### Constructor

> **new LocalStorageAdapter**(\`prefix\`): \`LocalStorageAdapter\`

Defined in: [persistence/src/LocalStorageAdapter.ts:9](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/persistence/src/LocalStorageAdapter.ts#L9)

#### Parameters

##### prefix

\`string\` = \`'wizard_'\`

#### Returns

\`LocalStorageAdapter\`

## Methods

### clear()

> **clear**(): \`void\`

Defined in: [persistence/src/LocalStorageAdapter.ts:69](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/persistence/src/LocalStorageAdapter.ts#L69)

#### Returns

\`void\`

#### Implementation of

\`IPersistenceAdapter.clear\`

***

### clearStep()

> **clearStep**(\`stepId\`): \`void\`

Defined in: [persistence/src/LocalStorageAdapter.ts:60](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/persistence/src/LocalStorageAdapter.ts#L60)

#### Parameters

##### stepId

\`string\`

#### Returns

\`void\`

#### Implementation of

\`IPersistenceAdapter.clearStep\`

***

### getStep()

> **getStep**\\<\`T\`\\>(\`stepId\`): \`T\` \\| \`undefined\`

Defined in: [persistence/src/LocalStorageAdapter.ts:27](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/persistence/src/LocalStorageAdapter.ts#L27)

#### Type Parameters

##### T

\`T\`

#### Parameters

##### stepId

\`string\`

#### Returns

\`T\` \\| \`undefined\`

#### Implementation of

\`IPersistenceAdapter.getStep\`

***

### getStepWithMeta()

> **getStepWithMeta**\\<\`T\`\\>(\`stepId\`): \\{ \`data\`: \`T\`; \`timestamp\`: \`number\`; \\} \\| \`undefined\`

Defined in: [persistence/src/LocalStorageAdapter.ts:44](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/persistence/src/LocalStorageAdapter.ts#L44)

#### Type Parameters

##### T

\`T\`

#### Parameters

##### stepId

\`string\`

#### Returns

\\{ \`data\`: \`T\`; \`timestamp\`: \`number\`; \\} \\| \`undefined\`

#### Implementation of

\`IPersistenceAdapter.getStepWithMeta\`

***

### saveStep()

> **saveStep**\\<\`T\`\\>(\`stepId\`, \`data\`): \`void\`

Defined in: [persistence/src/LocalStorageAdapter.ts:17](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/persistence/src/LocalStorageAdapter.ts#L17)

#### Type Parameters

##### T

\`T\`

#### Parameters

##### stepId

\`string\`

##### data

\`T\`

#### Returns

\`void\`

#### Implementation of

\`IPersistenceAdapter.saveStep\`
`,PD=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [persistence/src](../README.md) / MemoryAdapter

# Class: MemoryAdapter

Defined in: [persistence/src/MemoryAdapter.ts:6](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/persistence/src/MemoryAdapter.ts#L6)

In-memory persistence adapter for tests or ephemeral sessions.

## Implements

- \`IPersistenceAdapter\`

## Constructors

### Constructor

> **new MemoryAdapter**(): \`MemoryAdapter\`

#### Returns

\`MemoryAdapter\`

## Methods

### clear()

> **clear**(): \`void\`

Defined in: [persistence/src/MemoryAdapter.ts:27](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/persistence/src/MemoryAdapter.ts#L27)

#### Returns

\`void\`

#### Implementation of

\`IPersistenceAdapter.clear\`

***

### clearStep()

> **clearStep**(\`stepId\`): \`void\`

Defined in: [persistence/src/MemoryAdapter.ts:23](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/persistence/src/MemoryAdapter.ts#L23)

#### Parameters

##### stepId

\`string\`

#### Returns

\`void\`

#### Implementation of

\`IPersistenceAdapter.clearStep\`

***

### getStep()

> **getStep**\\<\`T\`\\>(\`stepId\`): \`T\` \\| \`undefined\`

Defined in: [persistence/src/MemoryAdapter.ts:13](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/persistence/src/MemoryAdapter.ts#L13)

#### Type Parameters

##### T

\`T\`

#### Parameters

##### stepId

\`string\`

#### Returns

\`T\` \\| \`undefined\`

#### Implementation of

\`IPersistenceAdapter.getStep\`

***

### getStepWithMeta()

> **getStepWithMeta**\\<\`T\`\\>(\`stepId\`): \\{ \`data\`: \`T\`; \`timestamp\`: \`number\`; \\} \\| \`undefined\`

Defined in: [persistence/src/MemoryAdapter.ts:17](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/persistence/src/MemoryAdapter.ts#L17)

#### Type Parameters

##### T

\`T\`

#### Parameters

##### stepId

\`string\`

#### Returns

\\{ \`data\`: \`T\`; \`timestamp\`: \`number\`; \\} \\| \`undefined\`

#### Implementation of

\`IPersistenceAdapter.getStepWithMeta\`

***

### saveStep()

> **saveStep**\\<\`T\`\\>(\`stepId\`, \`data\`): \`void\`

Defined in: [persistence/src/MemoryAdapter.ts:9](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/persistence/src/MemoryAdapter.ts#L9)

#### Type Parameters

##### T

\`T\`

#### Parameters

##### stepId

\`string\`

##### data

\`T\`

#### Returns

\`void\`

#### Implementation of

\`IPersistenceAdapter.saveStep\`
`,BD=`[**wizzard-packages**](../../README.md)

***

[wizzard-packages](../../README.md) / react/src

# react/src

## Classes

- [WizardStore](classes/WizardStore.md)

## Interfaces

- [IStepConfig](interfaces/IStepConfig.md)
- [IValidatorAdapter](interfaces/IValidatorAdapter.md)
- [IWizardActions](interfaces/IWizardActions.md)
- [IWizardConfig](interfaces/IWizardConfig.md)
- [IWizardContext](interfaces/IWizardContext.md)
- [IWizardHandle](interfaces/IWizardHandle.md)
- [IWizardState](interfaces/IWizardState.md)
- [WizardProviderProps](interfaces/WizardProviderProps.md)
- [WizardStepRendererProps](interfaces/WizardStepRendererProps.md)

## Type Aliases

- [PersistenceMode](type-aliases/PersistenceMode.md)
- [ValidationResult](type-aliases/ValidationResult.md)
- [WizardMiddleware](type-aliases/WizardMiddleware.md)

## Variables

- [loggerMiddleware](variables/loggerMiddleware.md)
- [WizardStepRenderer](variables/WizardStepRenderer.md)

## Functions

- [createWizardFactory](functions/createWizardFactory.md)
- [useWizard](functions/useWizard.md)
- [useWizardActions](functions/useWizardActions.md)
- [useWizardContext](functions/useWizardContext.md)
- [useWizardError](functions/useWizardError.md)
- [useWizardSelector](functions/useWizardSelector.md)
- [useWizardState](functions/useWizardState.md)
- [useWizardValue](functions/useWizardValue.md)
- [WizardProvider](functions/WizardProvider.md)
`,jD=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [react/src](../README.md) / WizardStore

# Class: WizardStore\\<T, StepId\\>

Defined in: core/dist/index.d.ts:373

Core event-driven store for managing wizard state, data, and navigation.

## Type Parameters

### T

\`T\`

Type of the global wizard data object

### StepId

\`StepId\` *extends* \`string\` = \`string\`

String union of valid step IDs

## Implements

- \`IWizardStore\`\\<\`T\`, \`StepId\`\\>

## Constructors

### Constructor

> **new WizardStore**\\<\`T\`, \`StepId\`\\>(\`initialData\`, \`middlewares?\`): \`WizardStore\`\\<\`T\`, \`StepId\`\\>

Defined in: core/dist/index.d.ts:386

#### Parameters

##### initialData

\`T\`

##### middlewares?

[\`WizardMiddleware\`](../type-aliases/WizardMiddleware.md)\\<\`T\`, \`StepId\`\\>[]

#### Returns

\`WizardStore\`\\<\`T\`, \`StepId\`\\>

## Properties

### errorsMap

> **errorsMap**: \`Map\`\\<\`StepId\`, \`Map\`\\<\`string\`, \`string\`\\>\\>

Defined in: core/dist/index.d.ts:379

#### Implementation of

\`IWizardStore.errorsMap\`

***

### getSnapshot()

> **getSnapshot**: () => [\`IWizardState\`](../interfaces/IWizardState.md)\\<\`T\`, \`StepId\`\\>

Defined in: core/dist/index.d.ts:404

Returns the current immutable snapshot of the wizard state.

#### Returns

[\`IWizardState\`](../interfaces/IWizardState.md)\\<\`T\`, \`StepId\`\\>

#### Implementation of

\`IWizardStore.getSnapshot\`

***

### subscribe()

> **subscribe**: (\`listener\`) => () => \`boolean\`

Defined in: core/dist/index.d.ts:425

#### Parameters

##### listener

() => \`void\`

#### Returns

> (): \`boolean\`

##### Returns

\`boolean\`

#### Implementation of

\`IWizardStore.subscribe\`

## Methods

### clearStepStorage()

> **clearStepStorage**(\`stepId\`): \`void\`

Defined in: core/dist/index.d.ts:433

#### Parameters

##### stepId

\`string\`

#### Returns

\`void\`

***

### deleteError()

> **deleteError**(\`stepId\`, \`path\`): \`boolean\`

Defined in: core/dist/index.d.ts:423

#### Parameters

##### stepId

\`StepId\`

##### path

\`string\`

#### Returns

\`boolean\`

#### Implementation of

\`IWizardStore.deleteError\`

***

### dispatch()

> **dispatch**(\`action\`): \`void\`

Defined in: core/dist/index.d.ts:394

Processes an action through the middleware chain and updates the state.
This is the primary way to trigger any state change in the wizard.

#### Parameters

##### action

\`WizardAction\`\\<\`T\`, \`StepId\`\\>

The action to perform

#### Returns

\`void\`

#### Implementation of

\`IWizardStore.dispatch\`

***

### goToStep()

> **goToStep**(\`stepId\`, \`options?\`): \`Promise\`\\<\`boolean\`\\>

Defined in: core/dist/index.d.ts:456

#### Parameters

##### stepId

\`StepId\`

##### options?

###### providedActiveSteps?

[\`IStepConfig\`](../interfaces/IStepConfig.md)\\<\`T\`, \`StepId\`\\>[]

###### validate?

\`boolean\`

#### Returns

\`Promise\`\\<\`boolean\`\\>

#### Implementation of

\`IWizardStore.goToStep\`

***

### hydrate()

> **hydrate**(): \`void\`

Defined in: core/dist/index.d.ts:431

Restores wizard state from persistence storage.
Implements "latest wins" conflict resolution based on step timestamps.

#### Returns

\`void\`

#### Implementation of

\`IWizardStore.hydrate\`

***

### injectPersistence()

> **injectPersistence**(\`adapter\`): \`void\`

Defined in: core/dist/index.d.ts:426

#### Parameters

##### adapter

\`IPersistenceAdapter\`

#### Returns

\`void\`

#### Implementation of

\`IWizardStore.injectPersistence\`

***

### resolveActiveSteps()

> **resolveActiveSteps**(\`data?\`): \`Promise\`\\<[\`IStepConfig\`](../interfaces/IStepConfig.md)\\<\`T\`, \`StepId\`\\>[]\\>

Defined in: core/dist/index.d.ts:450

Evaluates visibility conditions for all steps and returns only those that should be active.
Uses memoization to avoid redundant async calls if dependencies haven't changed.

#### Parameters

##### data?

\`T\`

Optional data override for evaluation

#### Returns

\`Promise\`\\<[\`IStepConfig\`](../interfaces/IStepConfig.md)\\<\`T\`, \`StepId\`\\>[]\\>

#### Implementation of

\`IWizardStore.resolveActiveSteps\`

***

### save()

> **save**(\`stepId?\`): \`void\`

Defined in: core/dist/index.d.ts:439

Manually triggers data persistence for specific steps or the current step.

#### Parameters

##### stepId?

\`StepId\`

Optional ID of step to save. If omitted, saves current step.

#### Returns

\`void\`

#### Implementation of

\`IWizardStore.save\`

***

### setInitialData()

> **setInitialData**(\`data\`): \`void\`

Defined in: core/dist/index.d.ts:419

Sets the initial data for the wizard.
Resets dirty tracking based on this new data.

#### Parameters

##### data

\`T\`

#### Returns

\`void\`

#### Implementation of

\`IWizardStore.setInitialData\`

***

### setStepErrors()

> **setStepErrors**(\`stepId\`, \`errors\`): \`boolean\`

Defined in: core/dist/index.d.ts:422

#### Parameters

##### stepId

\`StepId\`

##### errors

\`Record\`\\<\`string\`, \`string\`\\> | \`null\` | \`undefined\`

#### Returns

\`boolean\`

#### Implementation of

\`IWizardStore.setStepErrors\`

***

### subscribeToActions()

> **subscribeToActions**(\`listener\`): () => \`boolean\`

Defined in: core/dist/index.d.ts:384

#### Parameters

##### listener

(\`action\`) => \`void\`

#### Returns

> (): \`boolean\`

##### Returns

\`boolean\`

#### Implementation of

\`IWizardStore.subscribeToActions\`

***

### update()

> **update**(\`newData\`, \`changedPath?\`): \`void\`

Defined in: core/dist/index.d.ts:412

Performs a granular data update at a specific path.
Automatically calculates dirty fields and triggers auto-save if configured.

#### Parameters

##### newData

\`T\`

Full new data object

##### changedPath?

Path(s) that were modified

\`string\` | \`string\`[]

#### Returns

\`void\`

#### Implementation of

\`IWizardStore.update\`

***

### updateErrors()

> **updateErrors**(\`newErrors\`): \`void\`

Defined in: core/dist/index.d.ts:421

#### Parameters

##### newErrors

\`Record\`\\<\`StepId\`, \`Record\`\\<\`string\`, \`string\`\\>\\>

#### Returns

\`void\`

#### Implementation of

\`IWizardStore.updateErrors\`

***

### updateMeta()

> **updateMeta**(\`newMeta\`): \`void\`

Defined in: core/dist/index.d.ts:413

#### Parameters

##### newMeta

\`Partial\`\\<[\`IWizardState\`](../interfaces/IWizardState.md)\\<\`T\`, \`StepId\`\\>\\>

#### Returns

\`void\`

#### Implementation of

\`IWizardStore.updateMeta\`

***

### validateAll()

> **validateAll**(): \`Promise\`\\<\\{ \`errors\`: \`Record\`\\<\`string\`, \`Record\`\\<\`string\`, \`string\`\\>\\>; \`isValid\`: \`boolean\`; \\}\\>

Defined in: core/dist/index.d.ts:452

#### Returns

\`Promise\`\\<\\{ \`errors\`: \`Record\`\\<\`string\`, \`Record\`\\<\`string\`, \`string\`\\>\\>; \`isValid\`: \`boolean\`; \\}\\>

#### Implementation of

\`IWizardStore.validateAll\`

***

### validateStep()

> **validateStep**(\`stepId\`): \`Promise\`\\<\`boolean\`\\>

Defined in: core/dist/index.d.ts:451

#### Parameters

##### stepId

\`StepId\`

#### Returns

\`Promise\`\\<\`boolean\`\\>

#### Implementation of

\`IWizardStore.validateStep\`
`,XD=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [react/src](../README.md) / WizardProvider

# Function: WizardProvider()

> **WizardProvider**\\<\`T\`, \`StepId\`\\>(\`__namedParameters\`): \`Element\`

Defined in: [react/src/context/WizardContext.tsx:44](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/react/src/context/WizardContext.tsx#L44)

Component that provides the wizard context to its children.

## Type Parameters

### T

\`T\` *extends* \`Record\`\\<\`string\`, \`any\`\\>

### StepId

\`StepId\` *extends* \`string\` = \`string\`

## Parameters

### \\_\\_namedParameters

[\`WizardProviderProps\`](../interfaces/WizardProviderProps.md)\\<\`T\`, \`StepId\`\\>

## Returns

\`Element\`
`,HD=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [react/src](../README.md) / createWizardFactory

# Function: createWizardFactory()

> **createWizardFactory**\\<\`TSchema\`, \`StepId\`\\>(): \`object\`

Defined in: [react/src/factory.tsx:21](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/react/src/factory.tsx#L21)

createWizardFactory

Creates a strongly-typed set of Wizard components and hooks for a specific data schema.

## Type Parameters

### TSchema

\`TSchema\` *extends* \`Record\`\\<\`string\`, \`any\`\\>

The shape of your wizard's global data state

### StepId

\`StepId\` *extends* \`string\` = \`string\`

## Returns

\`object\`

### createStep()

> **createStep**: (\`config\`) => [\`IStepConfig\`](../interfaces/IStepConfig.md)\\<\`TSchema\`, \`StepId\`\\>

#### Parameters

##### config

[\`IStepConfig\`](../interfaces/IStepConfig.md)\\<\`TSchema\`, \`StepId\`\\>

#### Returns

[\`IStepConfig\`](../interfaces/IStepConfig.md)\\<\`TSchema\`, \`StepId\`\\>

### useBreadcrumbs()

> **useBreadcrumbs**: () => \`IBreadcrumb\`\\<\`StepId\`\\>[]

#### Returns

\`IBreadcrumb\`\\<\`StepId\`\\>[]

### useWizard()

> **useWizard**: () => [\`IWizardContext\`](../interfaces/IWizardContext.md)\\<\`TSchema\`, \`StepId\`\\>

#### Returns

[\`IWizardContext\`](../interfaces/IWizardContext.md)\\<\`TSchema\`, \`StepId\`\\>

### useWizardActions()

> **useWizardActions**: () => [\`IWizardActions\`](../interfaces/IWizardActions.md)\\<\`StepId\`\\>

#### Returns

[\`IWizardActions\`](../interfaces/IWizardActions.md)\\<\`StepId\`\\>

### useWizardContext()

> **useWizardContext**: () => \`any\`

#### Returns

\`any\`

### useWizardError()

> **useWizardError**: \\<\`P\`\\>(\`path\`) => \`string\` \\| \`undefined\`

#### Type Parameters

##### P

\`P\` *extends* \`string\`

#### Parameters

##### path

\`P\`

#### Returns

\`string\` \\| \`undefined\`

### useWizardSelector()

> **useWizardSelector**: \\<\`TSelected\`\\>(\`selector\`, \`options?\`) => \`TSelected\`

#### Type Parameters

##### TSelected

\`TSelected\`

#### Parameters

##### selector

(\`state\`) => \`TSelected\`

##### options?

###### isEqual?

(\`a\`, \`b\`) => \`boolean\`

#### Returns

\`TSelected\`

### useWizardState()

> **useWizardState**: () => [\`IWizardState\`](../interfaces/IWizardState.md)\\<\`TSchema\`, \`StepId\`\\>

#### Returns

[\`IWizardState\`](../interfaces/IWizardState.md)\\<\`TSchema\`, \`StepId\`\\>

### useWizardValue()

> **useWizardValue**: \\<\`P\`\\>(\`path\`, \`options?\`) => \`PathValue\`\\<\`TSchema\`, \`P\`\\>

#### Type Parameters

##### P

\`P\` *extends* \`string\`

#### Parameters

##### path

\`P\`

##### options?

###### isEqual?

(\`a\`, \`b\`) => \`boolean\`

#### Returns

\`PathValue\`\\<\`TSchema\`, \`P\`\\>

### WizardProvider()

> **WizardProvider**: (\`__namedParameters\`) => \`Element\`

#### Parameters

##### \\_\\_namedParameters

###### children

\`ReactNode\`

###### config

[\`IWizardConfig\`](../interfaces/IWizardConfig.md)\\<\`TSchema\`, \`StepId\`\\>

###### initialData?

\`Partial\`\\<\`TSchema\`\\>

#### Returns

\`Element\`
`,ZD=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [react/src](../README.md) / useWizard

# Function: useWizard()

> **useWizard**\\<\`T\`, \`StepId\`\\>(): \`IWizardContext\`\\<\`T\`, \`StepId\`\\>

Defined in: [react/src/hooks/useWizard.ts:7](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/react/src/hooks/useWizard.ts#L7)

Alias for useWizardContext.

## Type Parameters

### T

\`T\` = \`any\`

### StepId

\`StepId\` *extends* \`string\` = \`string\`

## Returns

\`IWizardContext\`\\<\`T\`, \`StepId\`\\>
`,VD=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [react/src](../README.md) / useWizardActions

# Function: useWizardActions()

> **useWizardActions**\\<\`StepId\`\\>(): [\`IWizardActions\`](../interfaces/IWizardActions.md)\\<\`StepId\`\\>

Defined in: [react/src/context/WizardContext.tsx:679](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/react/src/context/WizardContext.tsx#L679)

Returns the wizard actions API.

## Type Parameters

### StepId

\`StepId\` *extends* \`string\` = \`string\`

## Returns

[\`IWizardActions\`](../interfaces/IWizardActions.md)\\<\`StepId\`\\>
`,qD=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [react/src](../README.md) / useWizardContext

# Function: useWizardContext()

> **useWizardContext**\\<\`T\`, \`StepId\`\\>(): [\`IWizardContext\`](../interfaces/IWizardContext.md)\\<\`T\`, \`StepId\`\\>

Defined in: [react/src/context/WizardContext.tsx:688](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/react/src/context/WizardContext.tsx#L688)

Returns combined wizard state, actions, and derived errors.

## Type Parameters

### T

\`T\` = \`any\`

### StepId

\`StepId\` *extends* \`string\` = \`string\`

## Returns

[\`IWizardContext\`](../interfaces/IWizardContext.md)\\<\`T\`, \`StepId\`\\>
`,YD=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [react/src](../README.md) / useWizardError

# Function: useWizardError()

> **useWizardError**(\`path\`): \`string\` \\| \`undefined\`

Defined in: [react/src/context/WizardContext.tsx:632](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/react/src/context/WizardContext.tsx#L632)

Returns the first error message for a path across all steps.

## Parameters

### path

\`string\`

## Returns

\`string\` \\| \`undefined\`
`,GD=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [react/src](../README.md) / useWizardSelector

# Function: useWizardSelector()

> **useWizardSelector**\\<\`TSelected\`\\>(\`selector\`, \`options?\`): \`TSelected\`

Defined in: [react/src/context/WizardContext.tsx:649](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/react/src/context/WizardContext.tsx#L649)

Selects a derived value from the wizard state with optional equality check.

## Type Parameters

### TSelected

\`TSelected\` = \`any\`

## Parameters

### selector

(\`state\`) => \`TSelected\`

### options?

#### isEqual?

(\`a\`, \`b\`) => \`boolean\`

## Returns

\`TSelected\`
`,QD=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [react/src](../README.md) / useWizardState

# Function: useWizardState()

> **useWizardState**\\<\`T\`, \`StepId\`\\>(): [\`IWizardState\`](../interfaces/IWizardState.md)\\<\`T\`, \`StepId\`\\>

Defined in: [react/src/context/WizardContext.tsx:591](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/react/src/context/WizardContext.tsx#L591)

Reads the full wizard state.

## Type Parameters

### T

\`T\` = \`unknown\`

### StepId

\`StepId\` *extends* \`string\` = \`string\`

## Returns

[\`IWizardState\`](../interfaces/IWizardState.md)\\<\`T\`, \`StepId\`\\>
`,KD=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [react/src](../README.md) / useWizardValue

# Function: useWizardValue()

> **useWizardValue**\\<\`TValue\`\\>(\`path\`, \`options?\`): \`TValue\`

Defined in: [react/src/context/WizardContext.tsx:603](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/react/src/context/WizardContext.tsx#L603)

Subscribes to a specific data value by path.

## Type Parameters

### TValue

\`TValue\` = \`any\`

## Parameters

### path

\`string\`

### options?

#### isEqual?

(\`a\`, \`b\`) => \`boolean\`

## Returns

\`TValue\`
`,FD=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [react/src](../README.md) / IStepConfig

# Interface: IStepConfig\\<TStepData, StepId\\>

Defined in: core/dist/index.d.ts:154

Step Configuration

## Type Parameters

### TStepData

\`TStepData\` = \`unknown\`

### StepId

\`StepId\` *extends* \`string\` = \`string\`

## Properties

### ~~autoValidate?~~

> \`optional\` **autoValidate**: \`boolean\`

Defined in: core/dist/index.d.ts:169

#### Deprecated

Use validationMode instead

***

### beforeLeave()?

> \`optional\` **beforeLeave**: (\`data\`, \`direction\`, \`metadata\`) => \`boolean\` \\| \`Promise\`\\<\`boolean\`\\>

Defined in: core/dist/index.d.ts:163

#### Parameters

##### data

\`TStepData\`

##### direction

\`StepDirection\`

##### metadata

\`Partial\`\\<[\`IWizardState\`](IWizardState.md)\\<\`TStepData\`, \`StepId\`\\>\\> & \`object\`

#### Returns

\`boolean\` \\| \`Promise\`\\<\`boolean\`\\>

***

### canNavigateTo()?

> \`optional\` **canNavigateTo**: (\`data\`, \`metadata\`) => \`boolean\` \\| \`Promise\`\\<\`boolean\`\\>

Defined in: core/dist/index.d.ts:176

#### Parameters

##### data

\`TStepData\`

##### metadata

\`Partial\`\\<[\`IWizardState\`](IWizardState.md)\\<\`TStepData\`, \`StepId\`\\>\\> & \`object\`

#### Returns

\`boolean\` \\| \`Promise\`\\<\`boolean\`\\>

***

### clearData?

> \`optional\` **clearData**: \`string\` \\| \`string\`[] \\| (\`data\`, \`changedFields\`) => \`Partial\`\\<\`TStepData\`\\>

Defined in: core/dist/index.d.ts:175

***

### component?

> \`optional\` **component**: \`any\`

Defined in: core/dist/index.d.ts:171

***

### condition()?

> \`optional\` **condition**: (\`data\`, \`metadata\`) => \`boolean\` \\| \`Promise\`\\<\`boolean\`\\>

Defined in: core/dist/index.d.ts:157

#### Parameters

##### data

\`TStepData\`

##### metadata

\`Partial\`\\<[\`IWizardState\`](IWizardState.md)\\<\`TStepData\`, \`StepId\`\\>\\> & \`object\`

#### Returns

\`boolean\` \\| \`Promise\`\\<\`boolean\`\\>

***

### conditionDependsOn?

> \`optional\` **conditionDependsOn**: \`string\`[]

Defined in: core/dist/index.d.ts:162

***

### dependsOn?

> \`optional\` **dependsOn**: \`string\`[]

Defined in: core/dist/index.d.ts:174

***

### id

> **id**: \`StepId\`

Defined in: core/dist/index.d.ts:155

***

### label

> **label**: \`string\`

Defined in: core/dist/index.d.ts:156

***

### persistenceAdapter?

> \`optional\` **persistenceAdapter**: \`IPersistenceAdapter\`

Defined in: core/dist/index.d.ts:172

***

### persistenceMode?

> \`optional\` **persistenceMode**: [\`PersistenceMode\`](../type-aliases/PersistenceMode.md)

Defined in: core/dist/index.d.ts:173

***

### showWhilePending?

> \`optional\` **showWhilePending**: \`boolean\`

Defined in: core/dist/index.d.ts:161

***

### validationAdapter?

> \`optional\` **validationAdapter**: [\`IValidatorAdapter\`](IValidatorAdapter.md)\\<\`TStepData\`\\>

Defined in: core/dist/index.d.ts:167

***

### validationMode?

> \`optional\` **validationMode**: \`ValidationMode\`

Defined in: core/dist/index.d.ts:170
`,JD=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [react/src](../README.md) / IValidatorAdapter

# Interface: IValidatorAdapter\\<TData\\>

Defined in: core/dist/index.d.ts:123

Validator Adapter Interface

## Type Parameters

### TData

\`TData\` = \`unknown\`

## Properties

### validate()

> **validate**: (\`data\`) => [\`ValidationResult\`](../type-aliases/ValidationResult.md) \\| \`Promise\`\\<[\`ValidationResult\`](../type-aliases/ValidationResult.md)\\>

Defined in: core/dist/index.d.ts:124

#### Parameters

##### data

\`TData\`

#### Returns

[\`ValidationResult\`](../type-aliases/ValidationResult.md) \\| \`Promise\`\\<[\`ValidationResult\`](../type-aliases/ValidationResult.md)\\>
`,$D=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [react/src](../README.md) / IWizardActions

# Interface: IWizardActions\\<StepId\\>

Defined in: core/dist/index.d.ts:87

Public actions available to control the wizard.

## Extended by

- [\`IWizardContext\`](IWizardContext.md)

## Type Parameters

### StepId

\`StepId\` *extends* \`string\` = \`string\`

## Properties

### clearStorage()

> **clearStorage**: () => \`void\`

Defined in: core/dist/index.d.ts:101

#### Returns

\`void\`

***

### getData()

> **getData**: (\`path\`, \`defaultValue?\`) => \`unknown\`

Defined in: core/dist/index.d.ts:110

#### Parameters

##### path

\`string\`

##### defaultValue?

\`unknown\`

#### Returns

\`unknown\`

***

### goToNextStep()

> **goToNextStep**: () => \`Promise\`\\<\`void\`\\>

Defined in: core/dist/index.d.ts:88

#### Returns

\`Promise\`\\<\`void\`\\>

***

### goToPrevStep()

> **goToPrevStep**: () => \`Promise\`\\<\`void\`\\>

Defined in: core/dist/index.d.ts:89

#### Returns

\`Promise\`\\<\`void\`\\>

***

### goToStep()

> **goToStep**: (\`stepId\`, \`providedActiveSteps?\`, \`options?\`) => \`Promise\`\\<\`boolean\`\\>

Defined in: core/dist/index.d.ts:90

#### Parameters

##### stepId

\`StepId\`

##### providedActiveSteps?

\`any\`[]

##### options?

###### validate?

\`boolean\`

#### Returns

\`Promise\`\\<\`boolean\`\\>

***

### handleStepChange()

> **handleStepChange**: (\`field\`, \`value\`) => \`void\`

Defined in: core/dist/index.d.ts:94

#### Parameters

##### field

\`string\`

##### value

\`unknown\`

#### Returns

\`void\`

***

### reset()

> **reset**: () => \`void\`

Defined in: core/dist/index.d.ts:102

#### Returns

\`void\`

***

### save()

> **save**: (\`stepIds?\`) => \`void\`

Defined in: core/dist/index.d.ts:100

#### Parameters

##### stepIds?

\`boolean\` | \`StepId\` | \`StepId\`[]

#### Returns

\`void\`

***

### setData()

> **setData**: (\`path\`, \`value\`, \`options?\`) => \`void\`

Defined in: core/dist/index.d.ts:103

#### Parameters

##### path

\`string\`

##### value

\`unknown\`

##### options?

###### debounceValidation?

\`number\`

#### Returns

\`void\`

***

### setStepData()

> **setStepData**: (\`stepId\`, \`data\`) => \`void\`

Defined in: core/dist/index.d.ts:93

#### Parameters

##### stepId

\`StepId\`

##### data

\`unknown\`

#### Returns

\`void\`

***

### updateConfig()

> **updateConfig**: (\`config\`) => \`void\`

Defined in: core/dist/index.d.ts:111

#### Parameters

##### config

\`Partial\`\\<[\`IWizardConfig\`](IWizardConfig.md)\\<\`any\`, \`StepId\`\\>\\>

#### Returns

\`void\`

***

### updateData()

> **updateData**: (\`data\`, \`options?\`) => \`void\`

Defined in: core/dist/index.d.ts:106

#### Parameters

##### data

\`Partial\`\\<\`any\`\\>

##### options?

###### persist?

\`boolean\`

###### replace?

\`boolean\`

#### Returns

\`void\`

***

### validateAll()

> **validateAll**: () => \`Promise\`\\<\\{ \`errors\`: \`Record\`\\<\`string\`, \`Record\`\\<\`string\`, \`string\`\\>\\>; \`isValid\`: \`boolean\`; \\}\\>

Defined in: core/dist/index.d.ts:96

#### Returns

\`Promise\`\\<\\{ \`errors\`: \`Record\`\\<\`string\`, \`Record\`\\<\`string\`, \`string\`\\>\\>; \`isValid\`: \`boolean\`; \\}\\>

***

### validateStep()

> **validateStep**: (\`sid\`) => \`Promise\`\\<\`boolean\`\\>

Defined in: core/dist/index.d.ts:95

#### Parameters

##### sid

\`StepId\`

#### Returns

\`Promise\`\\<\`boolean\`\\>
`,ex=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [react/src](../README.md) / IWizardConfig

# Interface: IWizardConfig\\<T, StepId\\>

Defined in: core/dist/index.d.ts:184

Global Wizard Configuration.

## Type Parameters

### T

\`T\` = \`unknown\`

### StepId

\`StepId\` *extends* \`string\` = \`string\`

## Properties

### analytics?

> \`optional\` **analytics**: \`object\`

Defined in: core/dist/index.d.ts:197

#### onEvent

> **onEvent**: \`WizardEventHandler\`\\<\`StepId\`\\>

***

### ~~autoValidate?~~

> \`optional\` **autoValidate**: \`boolean\`

Defined in: core/dist/index.d.ts:187

#### Deprecated

Use validationMode instead

***

### middlewares?

> \`optional\` **middlewares**: [\`WizardMiddleware\`](../type-aliases/WizardMiddleware.md)\\<\`T\`, \`StepId\`\\>[]

Defined in: core/dist/index.d.ts:200

***

### navigationMode?

> \`optional\` **navigationMode**: \`"sequential"\` \\| \`"visited"\` \\| \`"free"\`

Defined in: core/dist/index.d.ts:201

***

### onConflict?

> \`optional\` **onConflict**: \`"merge"\` \\| \`"replace"\` \\| \`"keep-local"\`

Defined in: core/dist/index.d.ts:196

***

### onStepChange()?

> \`optional\` **onStepChange**: (\`fromStep\`, \`toStep\`, \`data\`) => \`void\`

Defined in: core/dist/index.d.ts:202

#### Parameters

##### fromStep

\`StepId\` | \`null\`

##### toStep

\`StepId\`

##### data

\`T\`

#### Returns

\`void\`

***

### persistence?

> \`optional\` **persistence**: \`object\`

Defined in: core/dist/index.d.ts:190

#### adapter?

> \`optional\` **adapter**: \`IPersistenceAdapter\`

#### debounceTime?

> \`optional\` **debounceTime**: \`number\`

#### mode?

> \`optional\` **mode**: [\`PersistenceMode\`](../type-aliases/PersistenceMode.md)

#### storageKey?

> \`optional\` **storageKey**: \`string\`

***

### steps

> **steps**: [\`IStepConfig\`](IStepConfig.md)\\<\`T\`, \`StepId\`\\>[]

Defined in: core/dist/index.d.ts:185

***

### validationDebounceTime?

> \`optional\` **validationDebounceTime**: \`number\`

Defined in: core/dist/index.d.ts:189

***

### validationMode?

> \`optional\` **validationMode**: \`ValidationMode\`

Defined in: core/dist/index.d.ts:188
`,nx=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [react/src](../README.md) / IWizardContext

# Interface: IWizardContext\\<T, StepId\\>

Defined in: core/dist/index.d.ts:352

High-level context for the wizard, combining state and actions.

## Extends

- \`Omit\`\\<[\`IWizardState\`](IWizardState.md)\\<\`T\`, \`StepId\`\\>, \`"errors"\`\\>.[\`IWizardActions\`](IWizardActions.md)\\<\`StepId\`\\>

## Type Parameters

### T

\`T\` = \`unknown\`

### StepId

\`StepId\` *extends* \`string\` = \`string\`

## Properties

### activeSteps

> **activeSteps**: [\`IStepConfig\`](IStepConfig.md)\\<\`T\`, \`StepId\`\\>[]

Defined in: core/dist/index.d.ts:25

List of steps that currently meet their visibility conditions

#### Inherited from

\`Omit.activeSteps\`

***

### activeStepsCount

> **activeStepsCount**: \`number\`

Defined in: core/dist/index.d.ts:43

Number of active steps

#### Inherited from

[\`IWizardState\`](IWizardState.md).[\`activeStepsCount\`](IWizardState.md#activestepscount)

***

### allErrors

> **allErrors**: \`Record\`\\<\`StepId\`, \`Record\`\\<\`string\`, \`string\`\\>\\>

Defined in: core/dist/index.d.ts:364

All errors by step and field.

***

### breadcrumbs

> **breadcrumbs**: \`IBreadcrumb\`\\<\`StepId\`\\>[]

Defined in: core/dist/index.d.ts:51

Breadcrumb items for navigation UI

#### Inherited from

\`Omit.breadcrumbs\`

***

### busySteps

> **busySteps**: \`Set\`\\<\`StepId\`\\>

Defined in: core/dist/index.d.ts:31

Set of step IDs that are currently performing async work

#### Inherited from

\`Omit.busySteps\`

***

### clearStorage()

> **clearStorage**: () => \`void\`

Defined in: core/dist/index.d.ts:101

#### Returns

\`void\`

#### Inherited from

[\`IWizardActions\`](IWizardActions.md).[\`clearStorage\`](IWizardActions.md#clearstorage)

***

### completedSteps

> **completedSteps**: \`Set\`\\<\`StepId\`\\>

Defined in: core/dist/index.d.ts:35

Set of step IDs that have passed validation

#### Inherited from

\`Omit.completedSteps\`

***

### config

> **config**: [\`IWizardConfig\`](IWizardConfig.md)\\<\`T\`, \`StepId\`\\>

Defined in: core/dist/index.d.ts:39

Current wizard configuration

#### Inherited from

\`Omit.config\`

***

### currentStep

> **currentStep**: [\`IStepConfig\`](IStepConfig.md)\\<\`T\`, \`StepId\`\\> \\| \`null\`

Defined in: core/dist/index.d.ts:13

Active step configuration (if any)

#### Inherited from

\`Omit.currentStep\`

***

### currentStepId

> **currentStepId**: \`""\` \\| \`StepId\`

Defined in: core/dist/index.d.ts:27

String ID of the current step

#### Inherited from

\`Omit.currentStepId\`

***

### currentStepIndex

> **currentStepIndex**: \`number\`

Defined in: core/dist/index.d.ts:15

Numeric index of current step in active steps list

#### Inherited from

[\`IWizardState\`](IWizardState.md).[\`currentStepIndex\`](IWizardState.md#currentstepindex)

***

### data

> **data**: \`T\`

Defined in: core/dist/index.d.ts:9

Global wizard data object

#### Inherited from

\`Omit.data\`

***

### dirtyFields

> **dirtyFields**: \`Set\`\\<\`string\`\\>

Defined in: core/dist/index.d.ts:49

Set of paths to fields that have been modified

#### Inherited from

[\`IWizardState\`](IWizardState.md).[\`dirtyFields\`](IWizardState.md#dirtyfields)

***

### errors

> **errors**: \`Record\`\\<\`string\`, \`string\`\\>

Defined in: core/dist/index.d.ts:360

Combined error map (flat)

***

### errorSteps

> **errorSteps**: \`Set\`\\<\`StepId\`\\>

Defined in: core/dist/index.d.ts:37

Set of step IDs that currently have active validation errors

#### Inherited from

\`Omit.errorSteps\`

***

### getData()

> **getData**: (\`path\`, \`defaultValue?\`) => \`unknown\`

Defined in: core/dist/index.d.ts:110

#### Parameters

##### path

\`string\`

##### defaultValue?

\`unknown\`

#### Returns

\`unknown\`

#### Inherited from

[\`IWizardActions\`](IWizardActions.md).[\`getData\`](IWizardActions.md#getdata)

***

### goToNextStep()

> **goToNextStep**: () => \`Promise\`\\<\`void\`\\>

Defined in: core/dist/index.d.ts:88

#### Returns

\`Promise\`\\<\`void\`\\>

#### Inherited from

[\`IWizardActions\`](IWizardActions.md).[\`goToNextStep\`](IWizardActions.md#gotonextstep)

***

### goToPrevStep()

> **goToPrevStep**: () => \`Promise\`\\<\`void\`\\>

Defined in: core/dist/index.d.ts:89

#### Returns

\`Promise\`\\<\`void\`\\>

#### Inherited from

[\`IWizardActions\`](IWizardActions.md).[\`goToPrevStep\`](IWizardActions.md#gotoprevstep)

***

### goToStep()

> **goToStep**: (\`stepId\`, \`providedActiveSteps?\`, \`options?\`) => \`Promise\`\\<\`boolean\`\\>

Defined in: core/dist/index.d.ts:90

#### Parameters

##### stepId

\`StepId\`

##### providedActiveSteps?

\`any\`[]

##### options?

###### validate?

\`boolean\`

#### Returns

\`Promise\`\\<\`boolean\`\\>

#### Inherited from

[\`IWizardActions\`](IWizardActions.md).[\`goToStep\`](IWizardActions.md#gotostep)

***

### goToStepResult?

> \`optional\` **goToStepResult**: \`boolean\` \\| \`"init"\` \\| \`null\`

Defined in: core/dist/index.d.ts:53

Result of the last goToStep action

#### Inherited from

[\`IWizardState\`](IWizardState.md).[\`goToStepResult\`](IWizardState.md#gotostepresult)

***

### handleStepChange()

> **handleStepChange**: (\`field\`, \`value\`) => \`void\`

Defined in: core/dist/index.d.ts:94

#### Parameters

##### field

\`string\`

##### value

\`unknown\`

#### Returns

\`void\`

#### Inherited from

[\`IWizardActions\`](IWizardActions.md).[\`handleStepChange\`](IWizardActions.md#handlestepchange)

***

### history

> **history**: \`StepId\`[]

Defined in: core/dist/index.d.ts:29

History of visited steps (navigation path)

#### Inherited from

\`Omit.history\`

***

### isBusy

> **isBusy**: \`boolean\`

Defined in: core/dist/index.d.ts:45

Alias for isPending

#### Inherited from

[\`IWizardState\`](IWizardState.md).[\`isBusy\`](IWizardState.md#isbusy)

***

### isDirty

> **isDirty**: \`boolean\`

Defined in: core/dist/index.d.ts:47

True if any field has been modified since initialization

#### Inherited from

[\`IWizardState\`](IWizardState.md).[\`isDirty\`](IWizardState.md#isdirty)

***

### isFirstStep

> **isFirstStep**: \`boolean\`

Defined in: core/dist/index.d.ts:17

True if currently on the first active step

#### Inherited from

[\`IWizardState\`](IWizardState.md).[\`isFirstStep\`](IWizardState.md#isfirststep)

***

### isLastStep

> **isLastStep**: \`boolean\`

Defined in: core/dist/index.d.ts:19

True if currently on the last active step

#### Inherited from

[\`IWizardState\`](IWizardState.md).[\`isLastStep\`](IWizardState.md#islaststep)

***

### isLoading

> **isLoading**: \`boolean\`

Defined in: core/dist/index.d.ts:21

True if the wizard is in an initial loading/hydrating state

#### Inherited from

[\`IWizardState\`](IWizardState.md).[\`isLoading\`](IWizardState.md#isloading)

***

### isPending

> **isPending**: \`boolean\`

Defined in: core/dist/index.d.ts:23

True if an async action (like navigation or validation) is in progress

#### Inherited from

[\`IWizardState\`](IWizardState.md).[\`isPending\`](IWizardState.md#ispending)

***

### progress

> **progress**: \`number\`

Defined in: core/dist/index.d.ts:41

Percentage of completion (0-100)

#### Inherited from

[\`IWizardState\`](IWizardState.md).[\`progress\`](IWizardState.md#progress)

***

### reset()

> **reset**: () => \`void\`

Defined in: core/dist/index.d.ts:102

#### Returns

\`void\`

#### Inherited from

[\`IWizardActions\`](IWizardActions.md).[\`reset\`](IWizardActions.md#reset)

***

### save()

> **save**: (\`stepIds?\`) => \`void\`

Defined in: core/dist/index.d.ts:100

#### Parameters

##### stepIds?

\`boolean\` | \`StepId\` | \`StepId\`[]

#### Returns

\`void\`

#### Inherited from

[\`IWizardActions\`](IWizardActions.md).[\`save\`](IWizardActions.md#save)

***

### setData()

> **setData**: (\`path\`, \`value\`, \`options?\`) => \`void\`

Defined in: core/dist/index.d.ts:103

#### Parameters

##### path

\`string\`

##### value

\`unknown\`

##### options?

###### debounceValidation?

\`number\`

#### Returns

\`void\`

#### Inherited from

[\`IWizardActions\`](IWizardActions.md).[\`setData\`](IWizardActions.md#setdata)

***

### setStepData()

> **setStepData**: (\`stepId\`, \`data\`) => \`void\`

Defined in: core/dist/index.d.ts:93

#### Parameters

##### stepId

\`StepId\`

##### data

\`unknown\`

#### Returns

\`void\`

#### Inherited from

[\`IWizardActions\`](IWizardActions.md).[\`setStepData\`](IWizardActions.md#setstepdata)

***

### store

> **store**: \`IWizardStore\`\\<\`T\`, \`StepId\`\\>

Defined in: core/dist/index.d.ts:356

The internal store instance.

***

### updateConfig()

> **updateConfig**: (\`config\`) => \`void\`

Defined in: core/dist/index.d.ts:111

#### Parameters

##### config

\`Partial\`\\<[\`IWizardConfig\`](IWizardConfig.md)\\<\`any\`, \`StepId\`\\>\\>

#### Returns

\`void\`

#### Inherited from

[\`IWizardActions\`](IWizardActions.md).[\`updateConfig\`](IWizardActions.md#updateconfig)

***

### updateData()

> **updateData**: (\`data\`, \`options?\`) => \`void\`

Defined in: core/dist/index.d.ts:106

#### Parameters

##### data

\`Partial\`\\<\`any\`\\>

##### options?

###### persist?

\`boolean\`

###### replace?

\`boolean\`

#### Returns

\`void\`

#### Inherited from

[\`IWizardActions\`](IWizardActions.md).[\`updateData\`](IWizardActions.md#updatedata)

***

### validateAll()

> **validateAll**: () => \`Promise\`\\<\\{ \`errors\`: \`Record\`\\<\`string\`, \`Record\`\\<\`string\`, \`string\`\\>\\>; \`isValid\`: \`boolean\`; \\}\\>

Defined in: core/dist/index.d.ts:96

#### Returns

\`Promise\`\\<\\{ \`errors\`: \`Record\`\\<\`string\`, \`Record\`\\<\`string\`, \`string\`\\>\\>; \`isValid\`: \`boolean\`; \\}\\>

#### Inherited from

[\`IWizardActions\`](IWizardActions.md).[\`validateAll\`](IWizardActions.md#validateall)

***

### validateStep()

> **validateStep**: (\`sid\`) => \`Promise\`\\<\`boolean\`\\>

Defined in: core/dist/index.d.ts:95

#### Parameters

##### sid

\`StepId\`

#### Returns

\`Promise\`\\<\`boolean\`\\>

#### Inherited from

[\`IWizardActions\`](IWizardActions.md).[\`validateStep\`](IWizardActions.md#validatestep)

***

### visitedSteps

> **visitedSteps**: \`Set\`\\<\`StepId\`\\>

Defined in: core/dist/index.d.ts:33

Set of step IDs that have been visited by the user

#### Inherited from

\`Omit.visitedSteps\`
`,tx=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [react/src](../README.md) / IWizardHandle

# Interface: IWizardHandle\\<T, StepId\\>

Defined in: [react/src/types.ts:17](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/react/src/types.ts#L17)

Handle returned by components for imperative access to the wizard.

## Type Parameters

### T

\`T\` = \`unknown\`

### StepId

\`StepId\` *extends* \`string\` = \`string\`

## Properties

### actions

> **actions**: \`IWizardActions\`\\<\`StepId\`\\>

Defined in: [react/src/types.ts:19](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/react/src/types.ts#L19)

***

### state

> **state**: [\`IWizardState\`](IWizardState.md)\\<\`T\`, \`StepId\`\\>

Defined in: [react/src/types.ts:18](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/react/src/types.ts#L18)
`,ax=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [react/src](../README.md) / IWizardState

# Interface: IWizardState\\<T, StepId\\>

Defined in: core/dist/index.d.ts:7

Full state of the wizard.

## Type Parameters

### T

\`T\` = \`unknown\`

### StepId

\`StepId\` *extends* \`string\` = \`string\`

## Properties

### activeSteps

> **activeSteps**: [\`IStepConfig\`](IStepConfig.md)\\<\`T\`, \`StepId\`\\>[]

Defined in: core/dist/index.d.ts:25

List of steps that currently meet their visibility conditions

***

### activeStepsCount

> **activeStepsCount**: \`number\`

Defined in: core/dist/index.d.ts:43

Number of active steps

***

### breadcrumbs

> **breadcrumbs**: \`IBreadcrumb\`\\<\`StepId\`\\>[]

Defined in: core/dist/index.d.ts:51

Breadcrumb items for navigation UI

***

### busySteps

> **busySteps**: \`Set\`\\<\`StepId\`\\>

Defined in: core/dist/index.d.ts:31

Set of step IDs that are currently performing async work

***

### completedSteps

> **completedSteps**: \`Set\`\\<\`StepId\`\\>

Defined in: core/dist/index.d.ts:35

Set of step IDs that have passed validation

***

### config

> **config**: [\`IWizardConfig\`](IWizardConfig.md)\\<\`T\`, \`StepId\`\\>

Defined in: core/dist/index.d.ts:39

Current wizard configuration

***

### currentStep

> **currentStep**: [\`IStepConfig\`](IStepConfig.md)\\<\`T\`, \`StepId\`\\> \\| \`null\`

Defined in: core/dist/index.d.ts:13

Active step configuration (if any)

***

### currentStepId

> **currentStepId**: \`""\` \\| \`StepId\`

Defined in: core/dist/index.d.ts:27

String ID of the current step

***

### currentStepIndex

> **currentStepIndex**: \`number\`

Defined in: core/dist/index.d.ts:15

Numeric index of current step in active steps list

***

### data

> **data**: \`T\`

Defined in: core/dist/index.d.ts:9

Global wizard data object

***

### dirtyFields

> **dirtyFields**: \`Set\`\\<\`string\`\\>

Defined in: core/dist/index.d.ts:49

Set of paths to fields that have been modified

***

### errors

> **errors**: \`Record\`\\<\`StepId\`, \`Record\`\\<\`string\`, \`string\`\\>\\>

Defined in: core/dist/index.d.ts:11

Current errors map by step and field

***

### errorSteps

> **errorSteps**: \`Set\`\\<\`StepId\`\\>

Defined in: core/dist/index.d.ts:37

Set of step IDs that currently have active validation errors

***

### goToStepResult?

> \`optional\` **goToStepResult**: \`boolean\` \\| \`"init"\` \\| \`null\`

Defined in: core/dist/index.d.ts:53

Result of the last goToStep action

***

### history

> **history**: \`StepId\`[]

Defined in: core/dist/index.d.ts:29

History of visited steps (navigation path)

***

### isBusy

> **isBusy**: \`boolean\`

Defined in: core/dist/index.d.ts:45

Alias for isPending

***

### isDirty

> **isDirty**: \`boolean\`

Defined in: core/dist/index.d.ts:47

True if any field has been modified since initialization

***

### isFirstStep

> **isFirstStep**: \`boolean\`

Defined in: core/dist/index.d.ts:17

True if currently on the first active step

***

### isLastStep

> **isLastStep**: \`boolean\`

Defined in: core/dist/index.d.ts:19

True if currently on the last active step

***

### isLoading

> **isLoading**: \`boolean\`

Defined in: core/dist/index.d.ts:21

True if the wizard is in an initial loading/hydrating state

***

### isPending

> **isPending**: \`boolean\`

Defined in: core/dist/index.d.ts:23

True if an async action (like navigation or validation) is in progress

***

### progress

> **progress**: \`number\`

Defined in: core/dist/index.d.ts:41

Percentage of completion (0-100)

***

### visitedSteps

> **visitedSteps**: \`Set\`\\<\`StepId\`\\>

Defined in: core/dist/index.d.ts:33

Set of step IDs that have been visited by the user
`,ix=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [react/src](../README.md) / WizardProviderProps

# Interface: WizardProviderProps\\<T, StepId\\>

Defined in: [react/src/context/WizardContext.tsx:34](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/react/src/context/WizardContext.tsx#L34)

Props for WizardProvider.

## Type Parameters

### T

\`T\`

### StepId

\`StepId\` *extends* \`string\`

## Properties

### children

> **children**: \`ReactNode\`

Defined in: [react/src/context/WizardContext.tsx:38](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/react/src/context/WizardContext.tsx#L38)

***

### config

> **config**: [\`IWizardConfig\`](IWizardConfig.md)\\<\`T\`, \`StepId\`\\>

Defined in: [react/src/context/WizardContext.tsx:35](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/react/src/context/WizardContext.tsx#L35)

***

### initialData?

> \`optional\` **initialData**: \`T\`

Defined in: [react/src/context/WizardContext.tsx:36](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/react/src/context/WizardContext.tsx#L36)

***

### initialStepId?

> \`optional\` **initialStepId**: \`StepId\`

Defined in: [react/src/context/WizardContext.tsx:37](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/react/src/context/WizardContext.tsx#L37)
`,rx=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [react/src](../README.md) / WizardStepRendererProps

# Interface: WizardStepRendererProps

Defined in: [react/src/components/WizardStepRenderer.tsx:7](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/react/src/components/WizardStepRenderer.tsx#L7)

Props for rendering the current step component.

## Properties

### fallback?

> \`optional\` **fallback**: \`ReactNode\`

Defined in: [react/src/components/WizardStepRenderer.tsx:9](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/react/src/components/WizardStepRenderer.tsx#L9)

***

### wrapper?

> \`optional\` **wrapper**: \`ComponentType\`\\<\\{ \`children\`: \`ReactNode\`; \`key\`: \`string\`; \\}\\>

Defined in: [react/src/components/WizardStepRenderer.tsx:8](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/react/src/components/WizardStepRenderer.tsx#L8)
`,lx=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [react/src](../README.md) / PersistenceMode

# Type Alias: PersistenceMode

> **PersistenceMode** = \`"onStepChange"\` \\| \`"onChange"\` \\| \`"manual"\`

Defined in: core/dist/index.d.ts:129

Persistence strategy for step data.
`,sx=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [react/src](../README.md) / ValidationResult

# Type Alias: ValidationResult

> **ValidationResult** = \`object\`

Defined in: core/dist/index.d.ts:116

Validation Result Interface

## Properties

### errors?

> \`optional\` **errors**: \`Record\`\\<\`string\`, \`string\`\\>

Defined in: core/dist/index.d.ts:118

***

### isValid

> **isValid**: \`boolean\`

Defined in: core/dist/index.d.ts:117
`,ox=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [react/src](../README.md) / WizardMiddleware

# Type Alias: WizardMiddleware()\\<T, StepId\\>

> **WizardMiddleware**\\<\`T\`, \`StepId\`\\> = (\`api\`) => (\`next\`) => (\`action\`) => \`void\`

Defined in: core/dist/index.d.ts:309

Middleware Type Definition

## Type Parameters

### T

\`T\` = \`any\`

### StepId

\`StepId\` *extends* \`string\` = \`string\`

## Parameters

### api

\`MiddlewareAPI\`\\<\`T\`, \`StepId\`\\>

## Returns

> (\`next\`): (\`action\`) => \`void\`

### Parameters

#### next

(\`action\`) => \`void\`

### Returns

> (\`action\`): \`void\`

#### Parameters

##### action

\`WizardAction\`\\<\`T\`, \`StepId\`\\>

#### Returns

\`void\`
`,ux=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [react/src](../README.md) / WizardStepRenderer

# Variable: WizardStepRenderer

> \`const\` **WizardStepRenderer**: \`React.FC\`\\<[\`WizardStepRendererProps\`](../interfaces/WizardStepRendererProps.md)\\>

Defined in: [react/src/components/WizardStepRenderer.tsx:15](https://github.com/ZizzX/wizzard-packages/blob/91a2dd8d88ad10cad1046e6ded31fb0b7d54ec86/packages/react/src/components/WizardStepRenderer.tsx#L15)

Renders the active step component with optional wrapper and suspense fallback.
`,cx=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [react/src](../README.md) / loggerMiddleware

# Variable: loggerMiddleware

> \`const\` **loggerMiddleware**: [\`WizardMiddleware\`](../type-aliases/WizardMiddleware.md)\\<\`any\`, \`any\`\\>

Defined in: middleware/dist/index.d.ts:6

Simple logger middleware for Wizard actions
`,dx=Object.assign({"../../../../docs/api/README.md":K8,"../../../../docs/api/adapter-yup/src/README.md":F8,"../../../../docs/api/adapter-yup/src/classes/YupAdapter.md":J8,"../../../../docs/api/adapter-yup/src/interfaces/YupLikeError.md":$8,"../../../../docs/api/adapter-yup/src/interfaces/YupLikeSchema.md":eD,"../../../../docs/api/adapter-zod/src/README.md":nD,"../../../../docs/api/adapter-zod/src/classes/ZodAdapter.md":tD,"../../../../docs/api/adapter-zod/src/interfaces/ZodLikeSchema.md":aD,"../../../../docs/api/core/src/README.md":iD,"../../../../docs/api/core/src/classes/WizardStore.md":rD,"../../../../docs/api/core/src/functions/getByPath.md":lD,"../../../../docs/api/core/src/functions/setByPath.md":sD,"../../../../docs/api/core/src/functions/shallowEqual.md":oD,"../../../../docs/api/core/src/functions/toPath.md":uD,"../../../../docs/api/core/src/interfaces/IBreadcrumb.md":cD,"../../../../docs/api/core/src/interfaces/IPersistenceAdapter.md":dD,"../../../../docs/api/core/src/interfaces/IStepConfig.md":fD,"../../../../docs/api/core/src/interfaces/IValidatorAdapter.md":pD,"../../../../docs/api/core/src/interfaces/IWizardActions.md":hD,"../../../../docs/api/core/src/interfaces/IWizardConfig.md":mD,"../../../../docs/api/core/src/interfaces/IWizardContext.md":gD,"../../../../docs/api/core/src/interfaces/IWizardState.md":yD,"../../../../docs/api/core/src/interfaces/IWizardStore.md":bD,"../../../../docs/api/core/src/interfaces/MiddlewareAPI.md":zD,"../../../../docs/api/core/src/type-aliases/BreadcrumbStatus.md":vD,"../../../../docs/api/core/src/type-aliases/Path.md":SD,"../../../../docs/api/core/src/type-aliases/PathValue.md":ED,"../../../../docs/api/core/src/type-aliases/PersistenceMode.md":DD,"../../../../docs/api/core/src/type-aliases/StepDirection.md":xD,"../../../../docs/api/core/src/type-aliases/ValidationMode.md":TD,"../../../../docs/api/core/src/type-aliases/ValidationResult.md":AD,"../../../../docs/api/core/src/type-aliases/WizardAction.md":wD,"../../../../docs/api/core/src/type-aliases/WizardEventHandler.md":RD,"../../../../docs/api/core/src/type-aliases/WizardEventName.md":kD,"../../../../docs/api/core/src/type-aliases/WizardEventPayloads.md":ID,"../../../../docs/api/core/src/type-aliases/WizardMiddleware.md":MD,"../../../../docs/api/devtools/src/README.md":_D,"../../../../docs/api/devtools/src/functions/WizardDevTools.md":CD,"../../../../docs/api/middleware/src/README.md":LD,"../../../../docs/api/middleware/src/variables/devToolsMiddleware.md":OD,"../../../../docs/api/middleware/src/variables/loggerMiddleware.md":ND,"../../../../docs/api/persistence/src/README.md":WD,"../../../../docs/api/persistence/src/classes/LocalStorageAdapter.md":UD,"../../../../docs/api/persistence/src/classes/MemoryAdapter.md":PD,"../../../../docs/api/react/src/README.md":BD,"../../../../docs/api/react/src/classes/WizardStore.md":jD,"../../../../docs/api/react/src/functions/WizardProvider.md":XD,"../../../../docs/api/react/src/functions/createWizardFactory.md":HD,"../../../../docs/api/react/src/functions/useWizard.md":ZD,"../../../../docs/api/react/src/functions/useWizardActions.md":VD,"../../../../docs/api/react/src/functions/useWizardContext.md":qD,"../../../../docs/api/react/src/functions/useWizardError.md":YD,"../../../../docs/api/react/src/functions/useWizardSelector.md":GD,"../../../../docs/api/react/src/functions/useWizardState.md":QD,"../../../../docs/api/react/src/functions/useWizardValue.md":KD,"../../../../docs/api/react/src/interfaces/IStepConfig.md":FD,"../../../../docs/api/react/src/interfaces/IValidatorAdapter.md":JD,"../../../../docs/api/react/src/interfaces/IWizardActions.md":$D,"../../../../docs/api/react/src/interfaces/IWizardConfig.md":ex,"../../../../docs/api/react/src/interfaces/IWizardContext.md":nx,"../../../../docs/api/react/src/interfaces/IWizardHandle.md":tx,"../../../../docs/api/react/src/interfaces/IWizardState.md":ax,"../../../../docs/api/react/src/interfaces/WizardProviderProps.md":ix,"../../../../docs/api/react/src/interfaces/WizardStepRendererProps.md":rx,"../../../../docs/api/react/src/type-aliases/PersistenceMode.md":lx,"../../../../docs/api/react/src/type-aliases/ValidationResult.md":sx,"../../../../docs/api/react/src/type-aliases/WizardMiddleware.md":ox,"../../../../docs/api/react/src/variables/WizardStepRenderer.md":ux,"../../../../docs/api/react/src/variables/loggerMiddleware.md":cx}),fx=Object.entries(dx).map(([a,r])=>{const l=a.replace("../../../../docs/api/","").replace(/\.md$/,""),s=l.split("/").slice(-1)[0].replace(/[-_]/g," ");return{slug:l,title:s,content:String(r)}}),px=fx.sort((a,r)=>a.slug.localeCompare(r.slug)),Lc=px;function hx(){const r=Xz()["*"]||"README",l=Lc.find(s=>s.slug===r)||Lc[0];return l?we.jsxs("section",{className:"section api-layout",children:[we.jsxs("aside",{className:"api-sidebar",children:[we.jsx("h2",{children:"API Reference"}),we.jsx("div",{className:"api-list",children:Lc.map(s=>we.jsx(Pg,{to:`/api/${s.slug}`,className:`api-link${s.slug===l.slug?" api-link--active":""}`,children:s.title},s.slug))})]}),we.jsx("article",{className:"api-content",children:we.jsx(V8,{children:l.content})})]}):we.jsx("section",{className:"section api-layout",children:we.jsxs("article",{className:"api-content",children:[we.jsx("h2",{children:"API Reference"}),we.jsxs("p",{children:["API docs are not available. Run ",we.jsx("code",{children:"pnpm docs:api"})," first."]})]})})}const mx=[{title:"Validation",description:"Zod/Yup adapters with step-level validation."},{title:"Persistence",description:"LocalStorage + memory adapters with auto-save."},{title:"Navigation",description:"Sequential, visited, and free navigation modes."}];function gx(){return we.jsxs("section",{className:"section",children:[we.jsx("h2",{children:"Examples"}),we.jsx("div",{className:"card-grid",children:mx.map(a=>we.jsxs("article",{className:"card",children:[we.jsx("h3",{children:a.title}),we.jsx("p",{children:a.description})]},a.title))})]})}const yx=c0([{path:"/",element:we.jsx(R0,{}),children:[{index:!0,element:we.jsx(k0,{})},{path:"api/*",element:we.jsx(hx,{})},{path:"examples",element:we.jsx(gx,{})}]}],{basename:"/wizzard-packages/dev/"});function bx(){return we.jsx(b0,{router:yx})}const bg=document.getElementById("root");bg&&W1.createRoot(bg).render(we.jsx(vg.StrictMode,{children:we.jsx(bx,{})}));
