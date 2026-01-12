function xg(a,r){for(var l=0;l<r.length;l++){const s=r[l];if(typeof s!="string"&&!Array.isArray(s)){for(const u in s)if(u!=="default"&&!(u in a)){const d=Object.getOwnPropertyDescriptor(s,u);d&&Object.defineProperty(a,u,d.get?d:{enumerable:!0,get:()=>s[u]})}}}return Object.freeze(Object.defineProperty(a,Symbol.toStringTag,{value:"Module"}))}(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const u of document.querySelectorAll('link[rel="modulepreload"]'))s(u);new MutationObserver(u=>{for(const d of u)if(d.type==="childList")for(const f of d.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&s(f)}).observe(document,{childList:!0,subtree:!0});function l(u){const d={};return u.integrity&&(d.integrity=u.integrity),u.referrerPolicy&&(d.referrerPolicy=u.referrerPolicy),u.crossOrigin==="use-credentials"?d.credentials="include":u.crossOrigin==="anonymous"?d.credentials="omit":d.credentials="same-origin",d}function s(u){if(u.ep)return;u.ep=!0;const d=l(u);fetch(u.href,d)}})();function $s(a){return a&&a.__esModule&&Object.prototype.hasOwnProperty.call(a,"default")?a.default:a}var pu={exports:{}},ol={};var sm;function _0(){if(sm)return ol;sm=1;var a=Symbol.for("react.transitional.element"),r=Symbol.for("react.fragment");function l(s,u,d){var f=null;if(d!==void 0&&(f=""+d),u.key!==void 0&&(f=""+u.key),"key"in u){d={};for(var p in u)p!=="key"&&(d[p]=u[p])}else d=u;return u=d.ref,{$$typeof:a,type:s,key:f,ref:u!==void 0?u:null,props:d}}return ol.Fragment=r,ol.jsx=l,ol.jsxs=l,ol}var om;function C0(){return om||(om=1,pu.exports=_0()),pu.exports}var re=C0(),hu={exports:{}},Me={};var cm;function L0(){if(cm)return Me;cm=1;var a=Symbol.for("react.transitional.element"),r=Symbol.for("react.portal"),l=Symbol.for("react.fragment"),s=Symbol.for("react.strict_mode"),u=Symbol.for("react.profiler"),d=Symbol.for("react.consumer"),f=Symbol.for("react.context"),p=Symbol.for("react.forward_ref"),g=Symbol.for("react.suspense"),h=Symbol.for("react.memo"),y=Symbol.for("react.lazy"),b=Symbol.for("react.activity"),S=Symbol.iterator;function v(T){return T===null||typeof T!="object"?null:(T=S&&T[S]||T["@@iterator"],typeof T=="function"?T:null)}var L={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},N=Object.assign,H={};function P(T,j,E){this.props=T,this.context=j,this.refs=H,this.updater=E||L}P.prototype.isReactComponent={},P.prototype.setState=function(T,j){if(typeof T!="object"&&typeof T!="function"&&T!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,T,j,"setState")},P.prototype.forceUpdate=function(T){this.updater.enqueueForceUpdate(this,T,"forceUpdate")};function G(){}G.prototype=P.prototype;function q(T,j,E){this.props=T,this.context=j,this.refs=H,this.updater=E||L}var de=q.prototype=new G;de.constructor=q,N(de,P.prototype),de.isPureReactComponent=!0;var ze=Array.isArray;function X(){}var R={H:null,A:null,T:null,S:null},ne=Object.prototype.hasOwnProperty;function he(T,j,E){var ie=E.ref;return{$$typeof:a,type:T,key:j,ref:ie!==void 0?ie:null,props:E}}function ue(T,j){return he(T.type,j,T.props)}function ae(T){return typeof T=="object"&&T!==null&&T.$$typeof===a}function ee(T){var j={"=":"=0",":":"=2"};return"$"+T.replace(/[=:]/g,function(E){return j[E]})}var Ae=/\/+/g;function fe(T,j){return typeof T=="object"&&T!==null&&T.key!=null?ee(""+T.key):j.toString(36)}function J(T){switch(T.status){case"fulfilled":return T.value;case"rejected":throw T.reason;default:switch(typeof T.status=="string"?T.then(X,X):(T.status="pending",T.then(function(j){T.status==="pending"&&(T.status="fulfilled",T.value=j)},function(j){T.status==="pending"&&(T.status="rejected",T.reason=j)})),T.status){case"fulfilled":return T.value;case"rejected":throw T.reason}}throw T}function C(T,j,E,ie,be){var ye=typeof T;(ye==="undefined"||ye==="boolean")&&(T=null);var Ie=!1;if(T===null)Ie=!0;else switch(ye){case"bigint":case"string":case"number":Ie=!0;break;case"object":switch(T.$$typeof){case a:case r:Ie=!0;break;case y:return Ie=T._init,C(Ie(T._payload),j,E,ie,be)}}if(Ie)return be=be(T),Ie=ie===""?"."+fe(T,0):ie,ze(be)?(E="",Ie!=null&&(E=Ie.replace(Ae,"$&/")+"/"),C(be,j,E,"",function(qn){return qn})):be!=null&&(ae(be)&&(be=ue(be,E+(be.key==null||T&&T.key===be.key?"":(""+be.key).replace(Ae,"$&/")+"/")+Ie)),j.push(be)),1;Ie=0;var Je=ie===""?".":ie+":";if(ze(T))for(var Ke=0;Ke<T.length;Ke++)ie=T[Ke],ye=Je+fe(ie,Ke),Ie+=C(ie,j,E,ye,be);else if(Ke=v(T),typeof Ke=="function")for(T=Ke.call(T),Ke=0;!(ie=T.next()).done;)ie=ie.value,ye=Je+fe(ie,Ke++),Ie+=C(ie,j,E,ye,be);else if(ye==="object"){if(typeof T.then=="function")return C(J(T),j,E,ie,be);throw j=String(T),Error("Objects are not valid as a React child (found: "+(j==="[object Object]"?"object with keys {"+Object.keys(T).join(", ")+"}":j)+"). If you meant to render a collection of children, use an array instead.")}return Ie}function K(T,j,E){if(T==null)return T;var ie=[],be=0;return C(T,ie,"","",function(ye){return j.call(E,ye,be++)}),ie}function le(T){if(T._status===-1){var j=T._result;j=j(),j.then(function(E){(T._status===0||T._status===-1)&&(T._status=1,T._result=E)},function(E){(T._status===0||T._status===-1)&&(T._status=2,T._result=E)}),T._status===-1&&(T._status=0,T._result=j)}if(T._status===1)return T._result.default;throw T._result}var _e=typeof reportError=="function"?reportError:function(T){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var j=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof T=="object"&&T!==null&&typeof T.message=="string"?String(T.message):String(T),error:T});if(!window.dispatchEvent(j))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",T);return}console.error(T)},x={map:K,forEach:function(T,j,E){K(T,function(){j.apply(this,arguments)},E)},count:function(T){var j=0;return K(T,function(){j++}),j},toArray:function(T){return K(T,function(j){return j})||[]},only:function(T){if(!ae(T))throw Error("React.Children.only expected to receive a single React element child.");return T}};return Me.Activity=b,Me.Children=x,Me.Component=P,Me.Fragment=l,Me.Profiler=u,Me.PureComponent=q,Me.StrictMode=s,Me.Suspense=g,Me.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=R,Me.__COMPILER_RUNTIME={__proto__:null,c:function(T){return R.H.useMemoCache(T)}},Me.cache=function(T){return function(){return T.apply(null,arguments)}},Me.cacheSignal=function(){return null},Me.cloneElement=function(T,j,E){if(T==null)throw Error("The argument must be a React element, but you passed "+T+".");var ie=N({},T.props),be=T.key;if(j!=null)for(ye in j.key!==void 0&&(be=""+j.key),j)!ne.call(j,ye)||ye==="key"||ye==="__self"||ye==="__source"||ye==="ref"&&j.ref===void 0||(ie[ye]=j[ye]);var ye=arguments.length-2;if(ye===1)ie.children=E;else if(1<ye){for(var Ie=Array(ye),Je=0;Je<ye;Je++)Ie[Je]=arguments[Je+2];ie.children=Ie}return he(T.type,be,ie)},Me.createContext=function(T){return T={$$typeof:f,_currentValue:T,_currentValue2:T,_threadCount:0,Provider:null,Consumer:null},T.Provider=T,T.Consumer={$$typeof:d,_context:T},T},Me.createElement=function(T,j,E){var ie,be={},ye=null;if(j!=null)for(ie in j.key!==void 0&&(ye=""+j.key),j)ne.call(j,ie)&&ie!=="key"&&ie!=="__self"&&ie!=="__source"&&(be[ie]=j[ie]);var Ie=arguments.length-2;if(Ie===1)be.children=E;else if(1<Ie){for(var Je=Array(Ie),Ke=0;Ke<Ie;Ke++)Je[Ke]=arguments[Ke+2];be.children=Je}if(T&&T.defaultProps)for(ie in Ie=T.defaultProps,Ie)be[ie]===void 0&&(be[ie]=Ie[ie]);return he(T,ye,be)},Me.createRef=function(){return{current:null}},Me.forwardRef=function(T){return{$$typeof:p,render:T}},Me.isValidElement=ae,Me.lazy=function(T){return{$$typeof:y,_payload:{_status:-1,_result:T},_init:le}},Me.memo=function(T,j){return{$$typeof:h,type:T,compare:j===void 0?null:j}},Me.startTransition=function(T){var j=R.T,E={};R.T=E;try{var ie=T(),be=R.S;be!==null&&be(E,ie),typeof ie=="object"&&ie!==null&&typeof ie.then=="function"&&ie.then(X,_e)}catch(ye){_e(ye)}finally{j!==null&&E.types!==null&&(j.types=E.types),R.T=j}},Me.unstable_useCacheRefresh=function(){return R.H.useCacheRefresh()},Me.use=function(T){return R.H.use(T)},Me.useActionState=function(T,j,E){return R.H.useActionState(T,j,E)},Me.useCallback=function(T,j){return R.H.useCallback(T,j)},Me.useContext=function(T){return R.H.useContext(T)},Me.useDebugValue=function(){},Me.useDeferredValue=function(T,j){return R.H.useDeferredValue(T,j)},Me.useEffect=function(T,j){return R.H.useEffect(T,j)},Me.useEffectEvent=function(T){return R.H.useEffectEvent(T)},Me.useId=function(){return R.H.useId()},Me.useImperativeHandle=function(T,j,E){return R.H.useImperativeHandle(T,j,E)},Me.useInsertionEffect=function(T,j){return R.H.useInsertionEffect(T,j)},Me.useLayoutEffect=function(T,j){return R.H.useLayoutEffect(T,j)},Me.useMemo=function(T,j){return R.H.useMemo(T,j)},Me.useOptimistic=function(T,j){return R.H.useOptimistic(T,j)},Me.useReducer=function(T,j,E){return R.H.useReducer(T,j,E)},Me.useRef=function(T){return R.H.useRef(T)},Me.useState=function(T){return R.H.useState(T)},Me.useSyncExternalStore=function(T,j,E){return R.H.useSyncExternalStore(T,j,E)},Me.useTransition=function(){return R.H.useTransition()},Me.version="19.2.3",Me}var um;function $u(){return um||(um=1,hu.exports=L0()),hu.exports}var F=$u();const Dg=$s(F),O0=xg({__proto__:null,default:Dg},[F]);var mu={exports:{}},cl={},gu={exports:{}},yu={};var dm;function N0(){return dm||(dm=1,(function(a){function r(C,K){var le=C.length;C.push(K);e:for(;0<le;){var _e=le-1>>>1,x=C[_e];if(0<u(x,K))C[_e]=K,C[le]=x,le=_e;else break e}}function l(C){return C.length===0?null:C[0]}function s(C){if(C.length===0)return null;var K=C[0],le=C.pop();if(le!==K){C[0]=le;e:for(var _e=0,x=C.length,T=x>>>1;_e<T;){var j=2*(_e+1)-1,E=C[j],ie=j+1,be=C[ie];if(0>u(E,le))ie<x&&0>u(be,E)?(C[_e]=be,C[ie]=le,_e=ie):(C[_e]=E,C[j]=le,_e=j);else if(ie<x&&0>u(be,le))C[_e]=be,C[ie]=le,_e=ie;else break e}}return K}function u(C,K){var le=C.sortIndex-K.sortIndex;return le!==0?le:C.id-K.id}if(a.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var d=performance;a.unstable_now=function(){return d.now()}}else{var f=Date,p=f.now();a.unstable_now=function(){return f.now()-p}}var g=[],h=[],y=1,b=null,S=3,v=!1,L=!1,N=!1,H=!1,P=typeof setTimeout=="function"?setTimeout:null,G=typeof clearTimeout=="function"?clearTimeout:null,q=typeof setImmediate<"u"?setImmediate:null;function de(C){for(var K=l(h);K!==null;){if(K.callback===null)s(h);else if(K.startTime<=C)s(h),K.sortIndex=K.expirationTime,r(g,K);else break;K=l(h)}}function ze(C){if(N=!1,de(C),!L)if(l(g)!==null)L=!0,X||(X=!0,ee());else{var K=l(h);K!==null&&J(ze,K.startTime-C)}}var X=!1,R=-1,ne=5,he=-1;function ue(){return H?!0:!(a.unstable_now()-he<ne)}function ae(){if(H=!1,X){var C=a.unstable_now();he=C;var K=!0;try{e:{L=!1,N&&(N=!1,G(R),R=-1),v=!0;var le=S;try{n:{for(de(C),b=l(g);b!==null&&!(b.expirationTime>C&&ue());){var _e=b.callback;if(typeof _e=="function"){b.callback=null,S=b.priorityLevel;var x=_e(b.expirationTime<=C);if(C=a.unstable_now(),typeof x=="function"){b.callback=x,de(C),K=!0;break n}b===l(g)&&s(g),de(C)}else s(g);b=l(g)}if(b!==null)K=!0;else{var T=l(h);T!==null&&J(ze,T.startTime-C),K=!1}}break e}finally{b=null,S=le,v=!1}K=void 0}}finally{K?ee():X=!1}}}var ee;if(typeof q=="function")ee=function(){q(ae)};else if(typeof MessageChannel<"u"){var Ae=new MessageChannel,fe=Ae.port2;Ae.port1.onmessage=ae,ee=function(){fe.postMessage(null)}}else ee=function(){P(ae,0)};function J(C,K){R=P(function(){C(a.unstable_now())},K)}a.unstable_IdlePriority=5,a.unstable_ImmediatePriority=1,a.unstable_LowPriority=4,a.unstable_NormalPriority=3,a.unstable_Profiling=null,a.unstable_UserBlockingPriority=2,a.unstable_cancelCallback=function(C){C.callback=null},a.unstable_forceFrameRate=function(C){0>C||125<C?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):ne=0<C?Math.floor(1e3/C):5},a.unstable_getCurrentPriorityLevel=function(){return S},a.unstable_next=function(C){switch(S){case 1:case 2:case 3:var K=3;break;default:K=S}var le=S;S=K;try{return C()}finally{S=le}},a.unstable_requestPaint=function(){H=!0},a.unstable_runWithPriority=function(C,K){switch(C){case 1:case 2:case 3:case 4:case 5:break;default:C=3}var le=S;S=C;try{return K()}finally{S=le}},a.unstable_scheduleCallback=function(C,K,le){var _e=a.unstable_now();switch(typeof le=="object"&&le!==null?(le=le.delay,le=typeof le=="number"&&0<le?_e+le:_e):le=_e,C){case 1:var x=-1;break;case 2:x=250;break;case 5:x=1073741823;break;case 4:x=1e4;break;default:x=5e3}return x=le+x,C={id:y++,callback:K,priorityLevel:C,startTime:le,expirationTime:x,sortIndex:-1},le>_e?(C.sortIndex=le,r(h,C),l(g)===null&&C===l(h)&&(N?(G(R),R=-1):N=!0,J(ze,le-_e))):(C.sortIndex=x,r(g,C),L||v||(L=!0,X||(X=!0,ee()))),C},a.unstable_shouldYield=ue,a.unstable_wrapCallback=function(C){var K=S;return function(){var le=S;S=K;try{return C.apply(this,arguments)}finally{S=le}}}})(yu)),yu}var fm;function W0(){return fm||(fm=1,gu.exports=N0()),gu.exports}var bu={exports:{}},Xn={};var pm;function U0(){if(pm)return Xn;pm=1;var a=$u();function r(g){var h="https://react.dev/errors/"+g;if(1<arguments.length){h+="?args[]="+encodeURIComponent(arguments[1]);for(var y=2;y<arguments.length;y++)h+="&args[]="+encodeURIComponent(arguments[y])}return"Minified React error #"+g+"; visit "+h+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function l(){}var s={d:{f:l,r:function(){throw Error(r(522))},D:l,C:l,L:l,m:l,X:l,S:l,M:l},p:0,findDOMNode:null},u=Symbol.for("react.portal");function d(g,h,y){var b=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:u,key:b==null?null:""+b,children:g,containerInfo:h,implementation:y}}var f=a.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function p(g,h){if(g==="font")return"";if(typeof h=="string")return h==="use-credentials"?h:""}return Xn.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=s,Xn.createPortal=function(g,h){var y=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!h||h.nodeType!==1&&h.nodeType!==9&&h.nodeType!==11)throw Error(r(299));return d(g,h,null,y)},Xn.flushSync=function(g){var h=f.T,y=s.p;try{if(f.T=null,s.p=2,g)return g()}finally{f.T=h,s.p=y,s.d.f()}},Xn.preconnect=function(g,h){typeof g=="string"&&(h?(h=h.crossOrigin,h=typeof h=="string"?h==="use-credentials"?h:"":void 0):h=null,s.d.C(g,h))},Xn.prefetchDNS=function(g){typeof g=="string"&&s.d.D(g)},Xn.preinit=function(g,h){if(typeof g=="string"&&h&&typeof h.as=="string"){var y=h.as,b=p(y,h.crossOrigin),S=typeof h.integrity=="string"?h.integrity:void 0,v=typeof h.fetchPriority=="string"?h.fetchPriority:void 0;y==="style"?s.d.S(g,typeof h.precedence=="string"?h.precedence:void 0,{crossOrigin:b,integrity:S,fetchPriority:v}):y==="script"&&s.d.X(g,{crossOrigin:b,integrity:S,fetchPriority:v,nonce:typeof h.nonce=="string"?h.nonce:void 0})}},Xn.preinitModule=function(g,h){if(typeof g=="string")if(typeof h=="object"&&h!==null){if(h.as==null||h.as==="script"){var y=p(h.as,h.crossOrigin);s.d.M(g,{crossOrigin:y,integrity:typeof h.integrity=="string"?h.integrity:void 0,nonce:typeof h.nonce=="string"?h.nonce:void 0})}}else h==null&&s.d.M(g)},Xn.preload=function(g,h){if(typeof g=="string"&&typeof h=="object"&&h!==null&&typeof h.as=="string"){var y=h.as,b=p(y,h.crossOrigin);s.d.L(g,y,{crossOrigin:b,integrity:typeof h.integrity=="string"?h.integrity:void 0,nonce:typeof h.nonce=="string"?h.nonce:void 0,type:typeof h.type=="string"?h.type:void 0,fetchPriority:typeof h.fetchPriority=="string"?h.fetchPriority:void 0,referrerPolicy:typeof h.referrerPolicy=="string"?h.referrerPolicy:void 0,imageSrcSet:typeof h.imageSrcSet=="string"?h.imageSrcSet:void 0,imageSizes:typeof h.imageSizes=="string"?h.imageSizes:void 0,media:typeof h.media=="string"?h.media:void 0})}},Xn.preloadModule=function(g,h){if(typeof g=="string")if(h){var y=p(h.as,h.crossOrigin);s.d.m(g,{as:typeof h.as=="string"&&h.as!=="script"?h.as:void 0,crossOrigin:y,integrity:typeof h.integrity=="string"?h.integrity:void 0})}else s.d.m(g)},Xn.requestFormReset=function(g){s.d.r(g)},Xn.unstable_batchedUpdates=function(g,h){return g(h)},Xn.useFormState=function(g,h,y){return f.H.useFormState(g,h,y)},Xn.useFormStatus=function(){return f.H.useHostTransitionStatus()},Xn.version="19.2.3",Xn}var hm;function Tg(){if(hm)return bu.exports;hm=1;function a(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(a)}catch(r){console.error(r)}}return a(),bu.exports=U0(),bu.exports}var mm;function P0(){if(mm)return cl;mm=1;var a=W0(),r=$u(),l=Tg();function s(e){var n="https://react.dev/errors/"+e;if(1<arguments.length){n+="?args[]="+encodeURIComponent(arguments[1]);for(var t=2;t<arguments.length;t++)n+="&args[]="+encodeURIComponent(arguments[t])}return"Minified React error #"+e+"; visit "+n+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function u(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function d(e){var n=e,t=e;if(e.alternate)for(;n.return;)n=n.return;else{e=n;do n=e,(n.flags&4098)!==0&&(t=n.return),e=n.return;while(e)}return n.tag===3?t:null}function f(e){if(e.tag===13){var n=e.memoizedState;if(n===null&&(e=e.alternate,e!==null&&(n=e.memoizedState)),n!==null)return n.dehydrated}return null}function p(e){if(e.tag===31){var n=e.memoizedState;if(n===null&&(e=e.alternate,e!==null&&(n=e.memoizedState)),n!==null)return n.dehydrated}return null}function g(e){if(d(e)!==e)throw Error(s(188))}function h(e){var n=e.alternate;if(!n){if(n=d(e),n===null)throw Error(s(188));return n!==e?null:e}for(var t=e,i=n;;){var o=t.return;if(o===null)break;var c=o.alternate;if(c===null){if(i=o.return,i!==null){t=i;continue}break}if(o.child===c.child){for(c=o.child;c;){if(c===t)return g(o),e;if(c===i)return g(o),n;c=c.sibling}throw Error(s(188))}if(t.return!==i.return)t=o,i=c;else{for(var m=!1,z=o.child;z;){if(z===t){m=!0,t=o,i=c;break}if(z===i){m=!0,i=o,t=c;break}z=z.sibling}if(!m){for(z=c.child;z;){if(z===t){m=!0,t=c,i=o;break}if(z===i){m=!0,i=c,t=o;break}z=z.sibling}if(!m)throw Error(s(189))}}if(t.alternate!==i)throw Error(s(190))}if(t.tag!==3)throw Error(s(188));return t.stateNode.current===t?e:n}function y(e){var n=e.tag;if(n===5||n===26||n===27||n===6)return e;for(e=e.child;e!==null;){if(n=y(e),n!==null)return n;e=e.sibling}return null}var b=Object.assign,S=Symbol.for("react.element"),v=Symbol.for("react.transitional.element"),L=Symbol.for("react.portal"),N=Symbol.for("react.fragment"),H=Symbol.for("react.strict_mode"),P=Symbol.for("react.profiler"),G=Symbol.for("react.consumer"),q=Symbol.for("react.context"),de=Symbol.for("react.forward_ref"),ze=Symbol.for("react.suspense"),X=Symbol.for("react.suspense_list"),R=Symbol.for("react.memo"),ne=Symbol.for("react.lazy"),he=Symbol.for("react.activity"),ue=Symbol.for("react.memo_cache_sentinel"),ae=Symbol.iterator;function ee(e){return e===null||typeof e!="object"?null:(e=ae&&e[ae]||e["@@iterator"],typeof e=="function"?e:null)}var Ae=Symbol.for("react.client.reference");function fe(e){if(e==null)return null;if(typeof e=="function")return e.$$typeof===Ae?null:e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case N:return"Fragment";case P:return"Profiler";case H:return"StrictMode";case ze:return"Suspense";case X:return"SuspenseList";case he:return"Activity"}if(typeof e=="object")switch(e.$$typeof){case L:return"Portal";case q:return e.displayName||"Context";case G:return(e._context.displayName||"Context")+".Consumer";case de:var n=e.render;return e=e.displayName,e||(e=n.displayName||n.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case R:return n=e.displayName||null,n!==null?n:fe(e.type)||"Memo";case ne:n=e._payload,e=e._init;try{return fe(e(n))}catch{}}return null}var J=Array.isArray,C=r.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,K=l.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,le={pending:!1,data:null,method:null,action:null},_e=[],x=-1;function T(e){return{current:e}}function j(e){0>x||(e.current=_e[x],_e[x]=null,x--)}function E(e,n){x++,_e[x]=e.current,e.current=n}var ie=T(null),be=T(null),ye=T(null),Ie=T(null);function Je(e,n){switch(E(ye,n),E(be,e),E(ie,null),n.nodeType){case 9:case 11:e=(e=n.documentElement)&&(e=e.namespaceURI)?Ih(e):0;break;default:if(e=n.tagName,n=n.namespaceURI)n=Ih(n),e=Mh(n,e);else switch(e){case"svg":e=1;break;case"math":e=2;break;default:e=0}}j(ie),E(ie,e)}function Ke(){j(ie),j(be),j(ye)}function qn(e){e.memoizedState!==null&&E(Ie,e);var n=ie.current,t=Mh(n,e.type);n!==t&&(E(be,e),E(ie,t))}function Mt(e){be.current===e&&(j(ie),j(be)),Ie.current===e&&(j(Ie),il._currentValue=le)}var xn,_t;function yt(e){if(xn===void 0)try{throw Error()}catch(t){var n=t.stack.trim().match(/\n( *(at )?)/);xn=n&&n[1]||"",_t=-1<t.stack.indexOf(`
    at`)?" (<anonymous>)":-1<t.stack.indexOf("@")?"@unknown:0:0":""}return`
`+xn+e+_t}var za=!1;function Yn(e,n){if(!e||za)return"";za=!0;var t=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var i={DetermineComponentFrameRoot:function(){try{if(n){var Y=function(){throw Error()};if(Object.defineProperty(Y.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(Y,[])}catch(U){var O=U}Reflect.construct(e,[],Y)}else{try{Y.call()}catch(U){O=U}e.call(Y.prototype)}}else{try{throw Error()}catch(U){O=U}(Y=e())&&typeof Y.catch=="function"&&Y.catch(function(){})}}catch(U){if(U&&O&&typeof U.stack=="string")return[U.stack,O.stack]}return[null,null]}};i.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var o=Object.getOwnPropertyDescriptor(i.DetermineComponentFrameRoot,"name");o&&o.configurable&&Object.defineProperty(i.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var c=i.DetermineComponentFrameRoot(),m=c[0],z=c[1];if(m&&z){var D=m.split(`
`),_=z.split(`
`);for(o=i=0;i<D.length&&!D[i].includes("DetermineComponentFrameRoot");)i++;for(;o<_.length&&!_[o].includes("DetermineComponentFrameRoot");)o++;if(i===D.length||o===_.length)for(i=D.length-1,o=_.length-1;1<=i&&0<=o&&D[i]!==_[o];)o--;for(;1<=i&&0<=o;i--,o--)if(D[i]!==_[o]){if(i!==1||o!==1)do if(i--,o--,0>o||D[i]!==_[o]){var B=`
`+D[i].replace(" at new "," at ");return e.displayName&&B.includes("<anonymous>")&&(B=B.replace("<anonymous>",e.displayName)),B}while(1<=i&&0<=o);break}}}finally{za=!1,Error.prepareStackTrace=t}return(t=e?e.displayName||e.name:"")?yt(t):""}function ki(e,n){switch(e.tag){case 26:case 27:case 5:return yt(e.type);case 16:return yt("Lazy");case 13:return e.child!==n&&n!==null?yt("Suspense Fallback"):yt("Suspense");case 19:return yt("SuspenseList");case 0:case 15:return Yn(e.type,!1);case 11:return Yn(e.type.render,!1);case 1:return Yn(e.type,!0);case 31:return yt("Activity");default:return""}}function Ii(e){try{var n="",t=null;do n+=ki(e,t),t=e,e=e.return;while(e);return n}catch(i){return`
Error generating stack: `+i.message+`
`+i.stack}}var Qt=Object.prototype.hasOwnProperty,va=a.unstable_scheduleCallback,ei=a.unstable_cancelCallback,zr=a.unstable_shouldYield,vr=a.unstable_requestPaint,bn=a.unstable_now,Kt=a.unstable_getCurrentPriorityLevel,Z=a.unstable_ImmediatePriority,te=a.unstable_UserBlockingPriority,Se=a.unstable_NormalPriority,we=a.unstable_LowPriority,Ve=a.unstable_IdlePriority,Ln=a.log,Ct=a.unstable_setDisableYieldValue,mn=null,zn=null;function Nn(e){if(typeof Ln=="function"&&Ct(e),zn&&typeof zn.setStrictMode=="function")try{zn.setStrictMode(mn,e)}catch{}}var Fe=Math.clz32?Math.clz32:Mi,jt=Math.log,Gn=Math.LN2;function Mi(e){return e>>>=0,e===0?32:31-(jt(e)/Gn|0)|0}var ni=256,Sa=262144,Ea=4194304;function Ft(e){var n=e&42;if(n!==0)return n;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&261888;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function ti(e,n,t){var i=e.pendingLanes;if(i===0)return 0;var o=0,c=e.suspendedLanes,m=e.pingedLanes;e=e.warmLanes;var z=i&134217727;return z!==0?(i=z&~c,i!==0?o=Ft(i):(m&=z,m!==0?o=Ft(m):t||(t=z&~e,t!==0&&(o=Ft(t))))):(z=i&~c,z!==0?o=Ft(z):m!==0?o=Ft(m):t||(t=i&~e,t!==0&&(o=Ft(t)))),o===0?0:n!==0&&n!==o&&(n&c)===0&&(c=o&-o,t=n&-n,c>=t||c===32&&(t&4194048)!==0)?n:o}function ai(e,n){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&n)===0}function kl(e,n){switch(e){case 1:case 2:case 4:case 8:case 64:return n+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return n+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function ii(){var e=Ea;return Ea<<=1,(Ea&62914560)===0&&(Ea=4194304),e}function xa(e){for(var n=[],t=0;31>t;t++)n.push(e);return n}function ri(e,n){e.pendingLanes|=n,n!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function io(e,n,t,i,o,c){var m=e.pendingLanes;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=t,e.entangledLanes&=t,e.errorRecoveryDisabledLanes&=t,e.shellSuspendCounter=0;var z=e.entanglements,D=e.expirationTimes,_=e.hiddenUpdates;for(t=m&~t;0<t;){var B=31-Fe(t),Y=1<<B;z[B]=0,D[B]=-1;var O=_[B];if(O!==null)for(_[B]=null,B=0;B<O.length;B++){var U=O[B];U!==null&&(U.lane&=-536870913)}t&=~Y}i!==0&&A(e,i,0),c!==0&&o===0&&e.tag!==0&&(e.suspendedLanes|=c&~(m&~n))}function A(e,n,t){e.pendingLanes|=n,e.suspendedLanes&=~n;var i=31-Fe(n);e.entangledLanes|=n,e.entanglements[i]=e.entanglements[i]|1073741824|t&261930}function I(e,n){var t=e.entangledLanes|=n;for(e=e.entanglements;t;){var i=31-Fe(t),o=1<<i;o&n|e[i]&n&&(e[i]|=n),t&=~o}}function W(e,n){var t=n&-n;return t=(t&42)!==0?1:Q(t),(t&(e.suspendedLanes|n))!==0?0:t}function Q(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function se(e){return e&=-e,2<e?8<e?(e&134217727)!==0?32:268435456:8:2}function Ee(){var e=K.p;return e!==0?e:(e=window.event,e===void 0?32:em(e.type))}function Te(e,n){var t=K.p;try{return K.p=e,n()}finally{K.p=t}}var pe=Math.random().toString(36).slice(2),ce="__reactFiber$"+pe,oe="__reactProps$"+pe,ge="__reactContainer$"+pe,ke="__reactEvents$"+pe,je="__reactListeners$"+pe,_n="__reactHandles$"+pe,$e="__reactResources$"+pe,We="__reactMarker$"+pe;function on(e){delete e[ce],delete e[oe],delete e[ke],delete e[je],delete e[_n]}function lt(e){var n=e[ce];if(n)return n;for(var t=e.parentNode;t;){if(n=t[ge]||t[ce]){if(t=n.alternate,n.child!==null||t!==null&&t.child!==null)for(e=Uh(e);e!==null;){if(t=e[ce])return t;e=Uh(e)}return n}e=t,t=e.parentNode}return null}function bt(e){if(e=e[ce]||e[ge]){var n=e.tag;if(n===5||n===6||n===13||n===31||n===26||n===27||n===3)return e}return null}function Zn(e){var n=e.tag;if(n===5||n===26||n===27||n===6)return e.stateNode;throw Error(s(33))}function Wn(e){var n=e[$e];return n||(n=e[$e]={hoistableStyles:new Map,hoistableScripts:new Map}),n}function vn(e){e[We]=!0}var Da=new Set,Bt={};function zt(e,n){Lt(e,n),Lt(e+"Capture",n)}function Lt(e,n){for(Bt[e]=n,e=0;e<n.length;e++)Da.add(n[e])}var Ze=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),dn={},Jt={};function li(e){return Qt.call(Jt,e)?!0:Qt.call(dn,e)?!1:Ze.test(e)?Jt[e]=!0:(dn[e]=!0,!1)}function fn(e,n,t){if(li(n))if(t===null)e.removeAttribute(n);else{switch(typeof t){case"undefined":case"function":case"symbol":e.removeAttribute(n);return;case"boolean":var i=n.toLowerCase().slice(0,5);if(i!=="data-"&&i!=="aria-"){e.removeAttribute(n);return}}e.setAttribute(n,""+t)}}function Ot(e,n,t){if(t===null)e.removeAttribute(n);else{switch(typeof t){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(n);return}e.setAttribute(n,""+t)}}function vt(e,n,t,i){if(i===null)e.removeAttribute(t);else{switch(typeof i){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(t);return}e.setAttributeNS(n,t,""+i)}}function Qn(e){switch(typeof e){case"bigint":case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function Sd(e){var n=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(n==="checkbox"||n==="radio")}function Ty(e,n,t){var i=Object.getOwnPropertyDescriptor(e.constructor.prototype,n);if(!e.hasOwnProperty(n)&&typeof i<"u"&&typeof i.get=="function"&&typeof i.set=="function"){var o=i.get,c=i.set;return Object.defineProperty(e,n,{configurable:!0,get:function(){return o.call(this)},set:function(m){t=""+m,c.call(this,m)}}),Object.defineProperty(e,n,{enumerable:i.enumerable}),{getValue:function(){return t},setValue:function(m){t=""+m},stopTracking:function(){e._valueTracker=null,delete e[n]}}}}function ro(e){if(!e._valueTracker){var n=Sd(e)?"checked":"value";e._valueTracker=Ty(e,n,""+e[n])}}function Ed(e){if(!e)return!1;var n=e._valueTracker;if(!n)return!0;var t=n.getValue(),i="";return e&&(i=Sd(e)?e.checked?"true":"false":e.value),e=i,e!==t?(n.setValue(e),!0):!1}function Il(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}var Ay=/[\n"\\]/g;function St(e){return e.replace(Ay,function(n){return"\\"+n.charCodeAt(0).toString(16)+" "})}function lo(e,n,t,i,o,c,m,z){e.name="",m!=null&&typeof m!="function"&&typeof m!="symbol"&&typeof m!="boolean"?e.type=m:e.removeAttribute("type"),n!=null?m==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+Qn(n)):e.value!==""+Qn(n)&&(e.value=""+Qn(n)):m!=="submit"&&m!=="reset"||e.removeAttribute("value"),n!=null?so(e,m,Qn(n)):t!=null?so(e,m,Qn(t)):i!=null&&e.removeAttribute("value"),o==null&&c!=null&&(e.defaultChecked=!!c),o!=null&&(e.checked=o&&typeof o!="function"&&typeof o!="symbol"),z!=null&&typeof z!="function"&&typeof z!="symbol"&&typeof z!="boolean"?e.name=""+Qn(z):e.removeAttribute("name")}function xd(e,n,t,i,o,c,m,z){if(c!=null&&typeof c!="function"&&typeof c!="symbol"&&typeof c!="boolean"&&(e.type=c),n!=null||t!=null){if(!(c!=="submit"&&c!=="reset"||n!=null)){ro(e);return}t=t!=null?""+Qn(t):"",n=n!=null?""+Qn(n):t,z||n===e.value||(e.value=n),e.defaultValue=n}i=i??o,i=typeof i!="function"&&typeof i!="symbol"&&!!i,e.checked=z?e.checked:!!i,e.defaultChecked=!!i,m!=null&&typeof m!="function"&&typeof m!="symbol"&&typeof m!="boolean"&&(e.name=m),ro(e)}function so(e,n,t){n==="number"&&Il(e.ownerDocument)===e||e.defaultValue===""+t||(e.defaultValue=""+t)}function _i(e,n,t,i){if(e=e.options,n){n={};for(var o=0;o<t.length;o++)n["$"+t[o]]=!0;for(t=0;t<e.length;t++)o=n.hasOwnProperty("$"+e[t].value),e[t].selected!==o&&(e[t].selected=o),o&&i&&(e[t].defaultSelected=!0)}else{for(t=""+Qn(t),n=null,o=0;o<e.length;o++){if(e[o].value===t){e[o].selected=!0,i&&(e[o].defaultSelected=!0);return}n!==null||e[o].disabled||(n=e[o])}n!==null&&(n.selected=!0)}}function Dd(e,n,t){if(n!=null&&(n=""+Qn(n),n!==e.value&&(e.value=n),t==null)){e.defaultValue!==n&&(e.defaultValue=n);return}e.defaultValue=t!=null?""+Qn(t):""}function Td(e,n,t,i){if(n==null){if(i!=null){if(t!=null)throw Error(s(92));if(J(i)){if(1<i.length)throw Error(s(93));i=i[0]}t=i}t==null&&(t=""),n=t}t=Qn(n),e.defaultValue=t,i=e.textContent,i===t&&i!==""&&i!==null&&(e.value=i),ro(e)}function Ci(e,n){if(n){var t=e.firstChild;if(t&&t===e.lastChild&&t.nodeType===3){t.nodeValue=n;return}}e.textContent=n}var wy=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function Ad(e,n,t){var i=n.indexOf("--")===0;t==null||typeof t=="boolean"||t===""?i?e.setProperty(n,""):n==="float"?e.cssFloat="":e[n]="":i?e.setProperty(n,t):typeof t!="number"||t===0||wy.has(n)?n==="float"?e.cssFloat=t:e[n]=(""+t).trim():e[n]=t+"px"}function wd(e,n,t){if(n!=null&&typeof n!="object")throw Error(s(62));if(e=e.style,t!=null){for(var i in t)!t.hasOwnProperty(i)||n!=null&&n.hasOwnProperty(i)||(i.indexOf("--")===0?e.setProperty(i,""):i==="float"?e.cssFloat="":e[i]="");for(var o in n)i=n[o],n.hasOwnProperty(o)&&t[o]!==i&&Ad(e,o,i)}else for(var c in n)n.hasOwnProperty(c)&&Ad(e,c,n[c])}function oo(e){if(e.indexOf("-")===-1)return!1;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Ry=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),ky=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function Ml(e){return ky.test(""+e)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":e}function $t(){}var co=null;function uo(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Li=null,Oi=null;function Rd(e){var n=bt(e);if(n&&(e=n.stateNode)){var t=e[oe]||null;e:switch(e=n.stateNode,n.type){case"input":if(lo(e,t.value,t.defaultValue,t.defaultValue,t.checked,t.defaultChecked,t.type,t.name),n=t.name,t.type==="radio"&&n!=null){for(t=e;t.parentNode;)t=t.parentNode;for(t=t.querySelectorAll('input[name="'+St(""+n)+'"][type="radio"]'),n=0;n<t.length;n++){var i=t[n];if(i!==e&&i.form===e.form){var o=i[oe]||null;if(!o)throw Error(s(90));lo(i,o.value,o.defaultValue,o.defaultValue,o.checked,o.defaultChecked,o.type,o.name)}}for(n=0;n<t.length;n++)i=t[n],i.form===e.form&&Ed(i)}break e;case"textarea":Dd(e,t.value,t.defaultValue);break e;case"select":n=t.value,n!=null&&_i(e,!!t.multiple,n,!1)}}}var fo=!1;function kd(e,n,t){if(fo)return e(n,t);fo=!0;try{var i=e(n);return i}finally{if(fo=!1,(Li!==null||Oi!==null)&&(bs(),Li&&(n=Li,e=Oi,Oi=Li=null,Rd(n),e)))for(n=0;n<e.length;n++)Rd(e[n])}}function Sr(e,n){var t=e.stateNode;if(t===null)return null;var i=t[oe]||null;if(i===null)return null;t=i[n];e:switch(n){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(i=!i.disabled)||(e=e.type,i=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!i;break e;default:e=!1}if(e)return null;if(t&&typeof t!="function")throw Error(s(231,n,typeof t));return t}var ea=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),po=!1;if(ea)try{var Er={};Object.defineProperty(Er,"passive",{get:function(){po=!0}}),window.addEventListener("test",Er,Er),window.removeEventListener("test",Er,Er)}catch{po=!1}var Ta=null,ho=null,_l=null;function Id(){if(_l)return _l;var e,n=ho,t=n.length,i,o="value"in Ta?Ta.value:Ta.textContent,c=o.length;for(e=0;e<t&&n[e]===o[e];e++);var m=t-e;for(i=1;i<=m&&n[t-i]===o[c-i];i++);return _l=o.slice(e,1<i?1-i:void 0)}function Cl(e){var n=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&n===13&&(e=13)):e=n,e===10&&(e=13),32<=e||e===13?e:0}function Ll(){return!0}function Md(){return!1}function Kn(e){function n(t,i,o,c,m){this._reactName=t,this._targetInst=o,this.type=i,this.nativeEvent=c,this.target=m,this.currentTarget=null;for(var z in e)e.hasOwnProperty(z)&&(t=e[z],this[z]=t?t(c):c[z]);return this.isDefaultPrevented=(c.defaultPrevented!=null?c.defaultPrevented:c.returnValue===!1)?Ll:Md,this.isPropagationStopped=Md,this}return b(n.prototype,{preventDefault:function(){this.defaultPrevented=!0;var t=this.nativeEvent;t&&(t.preventDefault?t.preventDefault():typeof t.returnValue!="unknown"&&(t.returnValue=!1),this.isDefaultPrevented=Ll)},stopPropagation:function(){var t=this.nativeEvent;t&&(t.stopPropagation?t.stopPropagation():typeof t.cancelBubble!="unknown"&&(t.cancelBubble=!0),this.isPropagationStopped=Ll)},persist:function(){},isPersistent:Ll}),n}var si={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Ol=Kn(si),xr=b({},si,{view:0,detail:0}),Iy=Kn(xr),mo,go,Dr,Nl=b({},xr,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:bo,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==Dr&&(Dr&&e.type==="mousemove"?(mo=e.screenX-Dr.screenX,go=e.screenY-Dr.screenY):go=mo=0,Dr=e),mo)},movementY:function(e){return"movementY"in e?e.movementY:go}}),_d=Kn(Nl),My=b({},Nl,{dataTransfer:0}),_y=Kn(My),Cy=b({},xr,{relatedTarget:0}),yo=Kn(Cy),Ly=b({},si,{animationName:0,elapsedTime:0,pseudoElement:0}),Oy=Kn(Ly),Ny=b({},si,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),Wy=Kn(Ny),Uy=b({},si,{data:0}),Cd=Kn(Uy),Py={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},jy={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},By={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Xy(e){var n=this.nativeEvent;return n.getModifierState?n.getModifierState(e):(e=By[e])?!!n[e]:!1}function bo(){return Xy}var Hy=b({},xr,{key:function(e){if(e.key){var n=Py[e.key]||e.key;if(n!=="Unidentified")return n}return e.type==="keypress"?(e=Cl(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?jy[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:bo,charCode:function(e){return e.type==="keypress"?Cl(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Cl(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),Zy=Kn(Hy),Vy=b({},Nl,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Ld=Kn(Vy),qy=b({},xr,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:bo}),Yy=Kn(qy),Gy=b({},si,{propertyName:0,elapsedTime:0,pseudoElement:0}),Qy=Kn(Gy),Ky=b({},Nl,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),Fy=Kn(Ky),Jy=b({},si,{newState:0,oldState:0}),$y=Kn(Jy),eb=[9,13,27,32],zo=ea&&"CompositionEvent"in window,Tr=null;ea&&"documentMode"in document&&(Tr=document.documentMode);var nb=ea&&"TextEvent"in window&&!Tr,Od=ea&&(!zo||Tr&&8<Tr&&11>=Tr),Nd=" ",Wd=!1;function Ud(e,n){switch(e){case"keyup":return eb.indexOf(n.keyCode)!==-1;case"keydown":return n.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Pd(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var Ni=!1;function tb(e,n){switch(e){case"compositionend":return Pd(n);case"keypress":return n.which!==32?null:(Wd=!0,Nd);case"textInput":return e=n.data,e===Nd&&Wd?null:e;default:return null}}function ab(e,n){if(Ni)return e==="compositionend"||!zo&&Ud(e,n)?(e=Id(),_l=ho=Ta=null,Ni=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(n.ctrlKey||n.altKey||n.metaKey)||n.ctrlKey&&n.altKey){if(n.char&&1<n.char.length)return n.char;if(n.which)return String.fromCharCode(n.which)}return null;case"compositionend":return Od&&n.locale!=="ko"?null:n.data;default:return null}}var ib={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function jd(e){var n=e&&e.nodeName&&e.nodeName.toLowerCase();return n==="input"?!!ib[e.type]:n==="textarea"}function Bd(e,n,t,i){Li?Oi?Oi.push(i):Oi=[i]:Li=i,n=Ts(n,"onChange"),0<n.length&&(t=new Ol("onChange","change",null,t,i),e.push({event:t,listeners:n}))}var Ar=null,wr=null;function rb(e){Dh(e,0)}function Wl(e){var n=Zn(e);if(Ed(n))return e}function Xd(e,n){if(e==="change")return n}var Hd=!1;if(ea){var vo;if(ea){var So="oninput"in document;if(!So){var Zd=document.createElement("div");Zd.setAttribute("oninput","return;"),So=typeof Zd.oninput=="function"}vo=So}else vo=!1;Hd=vo&&(!document.documentMode||9<document.documentMode)}function Vd(){Ar&&(Ar.detachEvent("onpropertychange",qd),wr=Ar=null)}function qd(e){if(e.propertyName==="value"&&Wl(wr)){var n=[];Bd(n,wr,e,uo(e)),kd(rb,n)}}function lb(e,n,t){e==="focusin"?(Vd(),Ar=n,wr=t,Ar.attachEvent("onpropertychange",qd)):e==="focusout"&&Vd()}function sb(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Wl(wr)}function ob(e,n){if(e==="click")return Wl(n)}function cb(e,n){if(e==="input"||e==="change")return Wl(n)}function ub(e,n){return e===n&&(e!==0||1/e===1/n)||e!==e&&n!==n}var st=typeof Object.is=="function"?Object.is:ub;function Rr(e,n){if(st(e,n))return!0;if(typeof e!="object"||e===null||typeof n!="object"||n===null)return!1;var t=Object.keys(e),i=Object.keys(n);if(t.length!==i.length)return!1;for(i=0;i<t.length;i++){var o=t[i];if(!Qt.call(n,o)||!st(e[o],n[o]))return!1}return!0}function Yd(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Gd(e,n){var t=Yd(e);e=0;for(var i;t;){if(t.nodeType===3){if(i=e+t.textContent.length,e<=n&&i>=n)return{node:t,offset:n-e};e=i}e:{for(;t;){if(t.nextSibling){t=t.nextSibling;break e}t=t.parentNode}t=void 0}t=Yd(t)}}function Qd(e,n){return e&&n?e===n?!0:e&&e.nodeType===3?!1:n&&n.nodeType===3?Qd(e,n.parentNode):"contains"in e?e.contains(n):e.compareDocumentPosition?!!(e.compareDocumentPosition(n)&16):!1:!1}function Kd(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var n=Il(e.document);n instanceof e.HTMLIFrameElement;){try{var t=typeof n.contentWindow.location.href=="string"}catch{t=!1}if(t)e=n.contentWindow;else break;n=Il(e.document)}return n}function Eo(e){var n=e&&e.nodeName&&e.nodeName.toLowerCase();return n&&(n==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||n==="textarea"||e.contentEditable==="true")}var db=ea&&"documentMode"in document&&11>=document.documentMode,Wi=null,xo=null,kr=null,Do=!1;function Fd(e,n,t){var i=t.window===t?t.document:t.nodeType===9?t:t.ownerDocument;Do||Wi==null||Wi!==Il(i)||(i=Wi,"selectionStart"in i&&Eo(i)?i={start:i.selectionStart,end:i.selectionEnd}:(i=(i.ownerDocument&&i.ownerDocument.defaultView||window).getSelection(),i={anchorNode:i.anchorNode,anchorOffset:i.anchorOffset,focusNode:i.focusNode,focusOffset:i.focusOffset}),kr&&Rr(kr,i)||(kr=i,i=Ts(xo,"onSelect"),0<i.length&&(n=new Ol("onSelect","select",null,n,t),e.push({event:n,listeners:i}),n.target=Wi)))}function oi(e,n){var t={};return t[e.toLowerCase()]=n.toLowerCase(),t["Webkit"+e]="webkit"+n,t["Moz"+e]="moz"+n,t}var Ui={animationend:oi("Animation","AnimationEnd"),animationiteration:oi("Animation","AnimationIteration"),animationstart:oi("Animation","AnimationStart"),transitionrun:oi("Transition","TransitionRun"),transitionstart:oi("Transition","TransitionStart"),transitioncancel:oi("Transition","TransitionCancel"),transitionend:oi("Transition","TransitionEnd")},To={},Jd={};ea&&(Jd=document.createElement("div").style,"AnimationEvent"in window||(delete Ui.animationend.animation,delete Ui.animationiteration.animation,delete Ui.animationstart.animation),"TransitionEvent"in window||delete Ui.transitionend.transition);function ci(e){if(To[e])return To[e];if(!Ui[e])return e;var n=Ui[e],t;for(t in n)if(n.hasOwnProperty(t)&&t in Jd)return To[e]=n[t];return e}var $d=ci("animationend"),ef=ci("animationiteration"),nf=ci("animationstart"),fb=ci("transitionrun"),pb=ci("transitionstart"),hb=ci("transitioncancel"),tf=ci("transitionend"),af=new Map,Ao="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");Ao.push("scrollEnd");function Nt(e,n){af.set(e,n),zt(n,[e])}var Ul=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var n=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(n))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)},Et=[],Pi=0,wo=0;function Pl(){for(var e=Pi,n=wo=Pi=0;n<e;){var t=Et[n];Et[n++]=null;var i=Et[n];Et[n++]=null;var o=Et[n];Et[n++]=null;var c=Et[n];if(Et[n++]=null,i!==null&&o!==null){var m=i.pending;m===null?o.next=o:(o.next=m.next,m.next=o),i.pending=o}c!==0&&rf(t,o,c)}}function jl(e,n,t,i){Et[Pi++]=e,Et[Pi++]=n,Et[Pi++]=t,Et[Pi++]=i,wo|=i,e.lanes|=i,e=e.alternate,e!==null&&(e.lanes|=i)}function Ro(e,n,t,i){return jl(e,n,t,i),Bl(e)}function ui(e,n){return jl(e,null,null,n),Bl(e)}function rf(e,n,t){e.lanes|=t;var i=e.alternate;i!==null&&(i.lanes|=t);for(var o=!1,c=e.return;c!==null;)c.childLanes|=t,i=c.alternate,i!==null&&(i.childLanes|=t),c.tag===22&&(e=c.stateNode,e===null||e._visibility&1||(o=!0)),e=c,c=c.return;return e.tag===3?(c=e.stateNode,o&&n!==null&&(o=31-Fe(t),e=c.hiddenUpdates,i=e[o],i===null?e[o]=[n]:i.push(n),n.lane=t|536870912),c):null}function Bl(e){if(50<Fr)throw Fr=0,Wc=null,Error(s(185));for(var n=e.return;n!==null;)e=n,n=e.return;return e.tag===3?e.stateNode:null}var ji={};function mb(e,n,t,i){this.tag=e,this.key=t,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=n,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=i,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function ot(e,n,t,i){return new mb(e,n,t,i)}function ko(e){return e=e.prototype,!(!e||!e.isReactComponent)}function na(e,n){var t=e.alternate;return t===null?(t=ot(e.tag,n,e.key,e.mode),t.elementType=e.elementType,t.type=e.type,t.stateNode=e.stateNode,t.alternate=e,e.alternate=t):(t.pendingProps=n,t.type=e.type,t.flags=0,t.subtreeFlags=0,t.deletions=null),t.flags=e.flags&65011712,t.childLanes=e.childLanes,t.lanes=e.lanes,t.child=e.child,t.memoizedProps=e.memoizedProps,t.memoizedState=e.memoizedState,t.updateQueue=e.updateQueue,n=e.dependencies,t.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext},t.sibling=e.sibling,t.index=e.index,t.ref=e.ref,t.refCleanup=e.refCleanup,t}function lf(e,n){e.flags&=65011714;var t=e.alternate;return t===null?(e.childLanes=0,e.lanes=n,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=t.childLanes,e.lanes=t.lanes,e.child=t.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=t.memoizedProps,e.memoizedState=t.memoizedState,e.updateQueue=t.updateQueue,e.type=t.type,n=t.dependencies,e.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext}),e}function Xl(e,n,t,i,o,c){var m=0;if(i=e,typeof e=="function")ko(e)&&(m=1);else if(typeof e=="string")m=v0(e,t,ie.current)?26:e==="html"||e==="head"||e==="body"?27:5;else e:switch(e){case he:return e=ot(31,t,n,o),e.elementType=he,e.lanes=c,e;case N:return di(t.children,o,c,n);case H:m=8,o|=24;break;case P:return e=ot(12,t,n,o|2),e.elementType=P,e.lanes=c,e;case ze:return e=ot(13,t,n,o),e.elementType=ze,e.lanes=c,e;case X:return e=ot(19,t,n,o),e.elementType=X,e.lanes=c,e;default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case q:m=10;break e;case G:m=9;break e;case de:m=11;break e;case R:m=14;break e;case ne:m=16,i=null;break e}m=29,t=Error(s(130,e===null?"null":typeof e,"")),i=null}return n=ot(m,t,n,o),n.elementType=e,n.type=i,n.lanes=c,n}function di(e,n,t,i){return e=ot(7,e,i,n),e.lanes=t,e}function Io(e,n,t){return e=ot(6,e,null,n),e.lanes=t,e}function sf(e){var n=ot(18,null,null,0);return n.stateNode=e,n}function Mo(e,n,t){return n=ot(4,e.children!==null?e.children:[],e.key,n),n.lanes=t,n.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},n}var of=new WeakMap;function xt(e,n){if(typeof e=="object"&&e!==null){var t=of.get(e);return t!==void 0?t:(n={value:e,source:n,stack:Ii(n)},of.set(e,n),n)}return{value:e,source:n,stack:Ii(n)}}var Bi=[],Xi=0,Hl=null,Ir=0,Dt=[],Tt=0,Aa=null,Xt=1,Ht="";function ta(e,n){Bi[Xi++]=Ir,Bi[Xi++]=Hl,Hl=e,Ir=n}function cf(e,n,t){Dt[Tt++]=Xt,Dt[Tt++]=Ht,Dt[Tt++]=Aa,Aa=e;var i=Xt;e=Ht;var o=32-Fe(i)-1;i&=~(1<<o),t+=1;var c=32-Fe(n)+o;if(30<c){var m=o-o%5;c=(i&(1<<m)-1).toString(32),i>>=m,o-=m,Xt=1<<32-Fe(n)+o|t<<o|i,Ht=c+e}else Xt=1<<c|t<<o|i,Ht=e}function _o(e){e.return!==null&&(ta(e,1),cf(e,1,0))}function Co(e){for(;e===Hl;)Hl=Bi[--Xi],Bi[Xi]=null,Ir=Bi[--Xi],Bi[Xi]=null;for(;e===Aa;)Aa=Dt[--Tt],Dt[Tt]=null,Ht=Dt[--Tt],Dt[Tt]=null,Xt=Dt[--Tt],Dt[Tt]=null}function uf(e,n){Dt[Tt++]=Xt,Dt[Tt++]=Ht,Dt[Tt++]=Aa,Xt=n.id,Ht=n.overflow,Aa=e}var Un=null,pn=null,He=!1,wa=null,At=!1,Lo=Error(s(519));function Ra(e){var n=Error(s(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw Mr(xt(n,e)),Lo}function df(e){var n=e.stateNode,t=e.type,i=e.memoizedProps;switch(n[ce]=e,n[oe]=i,t){case"dialog":Pe("cancel",n),Pe("close",n);break;case"iframe":case"object":case"embed":Pe("load",n);break;case"video":case"audio":for(t=0;t<$r.length;t++)Pe($r[t],n);break;case"source":Pe("error",n);break;case"img":case"image":case"link":Pe("error",n),Pe("load",n);break;case"details":Pe("toggle",n);break;case"input":Pe("invalid",n),xd(n,i.value,i.defaultValue,i.checked,i.defaultChecked,i.type,i.name,!0);break;case"select":Pe("invalid",n);break;case"textarea":Pe("invalid",n),Td(n,i.value,i.defaultValue,i.children)}t=i.children,typeof t!="string"&&typeof t!="number"&&typeof t!="bigint"||n.textContent===""+t||i.suppressHydrationWarning===!0||Rh(n.textContent,t)?(i.popover!=null&&(Pe("beforetoggle",n),Pe("toggle",n)),i.onScroll!=null&&Pe("scroll",n),i.onScrollEnd!=null&&Pe("scrollend",n),i.onClick!=null&&(n.onclick=$t),n=!0):n=!1,n||Ra(e,!0)}function ff(e){for(Un=e.return;Un;)switch(Un.tag){case 5:case 31:case 13:At=!1;return;case 27:case 3:At=!0;return;default:Un=Un.return}}function Hi(e){if(e!==Un)return!1;if(!He)return ff(e),He=!0,!1;var n=e.tag,t;if((t=n!==3&&n!==27)&&((t=n===5)&&(t=e.type,t=!(t!=="form"&&t!=="button")||Jc(e.type,e.memoizedProps)),t=!t),t&&pn&&Ra(e),ff(e),n===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(s(317));pn=Wh(e)}else if(n===31){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(s(317));pn=Wh(e)}else n===27?(n=pn,Xa(e.type)?(e=au,au=null,pn=e):pn=n):pn=Un?Rt(e.stateNode.nextSibling):null;return!0}function fi(){pn=Un=null,He=!1}function Oo(){var e=wa;return e!==null&&(et===null?et=e:et.push.apply(et,e),wa=null),e}function Mr(e){wa===null?wa=[e]:wa.push(e)}var No=T(null),pi=null,aa=null;function ka(e,n,t){E(No,n._currentValue),n._currentValue=t}function ia(e){e._currentValue=No.current,j(No)}function Wo(e,n,t){for(;e!==null;){var i=e.alternate;if((e.childLanes&n)!==n?(e.childLanes|=n,i!==null&&(i.childLanes|=n)):i!==null&&(i.childLanes&n)!==n&&(i.childLanes|=n),e===t)break;e=e.return}}function Uo(e,n,t,i){var o=e.child;for(o!==null&&(o.return=e);o!==null;){var c=o.dependencies;if(c!==null){var m=o.child;c=c.firstContext;e:for(;c!==null;){var z=c;c=o;for(var D=0;D<n.length;D++)if(z.context===n[D]){c.lanes|=t,z=c.alternate,z!==null&&(z.lanes|=t),Wo(c.return,t,e),i||(m=null);break e}c=z.next}}else if(o.tag===18){if(m=o.return,m===null)throw Error(s(341));m.lanes|=t,c=m.alternate,c!==null&&(c.lanes|=t),Wo(m,t,e),m=null}else m=o.child;if(m!==null)m.return=o;else for(m=o;m!==null;){if(m===e){m=null;break}if(o=m.sibling,o!==null){o.return=m.return,m=o;break}m=m.return}o=m}}function Zi(e,n,t,i){e=null;for(var o=n,c=!1;o!==null;){if(!c){if((o.flags&524288)!==0)c=!0;else if((o.flags&262144)!==0)break}if(o.tag===10){var m=o.alternate;if(m===null)throw Error(s(387));if(m=m.memoizedProps,m!==null){var z=o.type;st(o.pendingProps.value,m.value)||(e!==null?e.push(z):e=[z])}}else if(o===Ie.current){if(m=o.alternate,m===null)throw Error(s(387));m.memoizedState.memoizedState!==o.memoizedState.memoizedState&&(e!==null?e.push(il):e=[il])}o=o.return}e!==null&&Uo(n,e,t,i),n.flags|=262144}function Zl(e){for(e=e.firstContext;e!==null;){if(!st(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function hi(e){pi=e,aa=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function Pn(e){return pf(pi,e)}function Vl(e,n){return pi===null&&hi(e),pf(e,n)}function pf(e,n){var t=n._currentValue;if(n={context:n,memoizedValue:t,next:null},aa===null){if(e===null)throw Error(s(308));aa=n,e.dependencies={lanes:0,firstContext:n},e.flags|=524288}else aa=aa.next=n;return t}var gb=typeof AbortController<"u"?AbortController:function(){var e=[],n=this.signal={aborted:!1,addEventListener:function(t,i){e.push(i)}};this.abort=function(){n.aborted=!0,e.forEach(function(t){return t()})}},yb=a.unstable_scheduleCallback,bb=a.unstable_NormalPriority,An={$$typeof:q,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function Po(){return{controller:new gb,data:new Map,refCount:0}}function _r(e){e.refCount--,e.refCount===0&&yb(bb,function(){e.controller.abort()})}var Cr=null,jo=0,Vi=0,qi=null;function zb(e,n){if(Cr===null){var t=Cr=[];jo=0,Vi=Hc(),qi={status:"pending",value:void 0,then:function(i){t.push(i)}}}return jo++,n.then(hf,hf),n}function hf(){if(--jo===0&&Cr!==null){qi!==null&&(qi.status="fulfilled");var e=Cr;Cr=null,Vi=0,qi=null;for(var n=0;n<e.length;n++)(0,e[n])()}}function vb(e,n){var t=[],i={status:"pending",value:null,reason:null,then:function(o){t.push(o)}};return e.then(function(){i.status="fulfilled",i.value=n;for(var o=0;o<t.length;o++)(0,t[o])(n)},function(o){for(i.status="rejected",i.reason=o,o=0;o<t.length;o++)(0,t[o])(void 0)}),i}var mf=C.S;C.S=function(e,n){Jp=bn(),typeof n=="object"&&n!==null&&typeof n.then=="function"&&zb(e,n),mf!==null&&mf(e,n)};var mi=T(null);function Bo(){var e=mi.current;return e!==null?e:sn.pooledCache}function ql(e,n){n===null?E(mi,mi.current):E(mi,n.pool)}function gf(){var e=Bo();return e===null?null:{parent:An._currentValue,pool:e}}var Yi=Error(s(460)),Xo=Error(s(474)),Yl=Error(s(542)),Gl={then:function(){}};function yf(e){return e=e.status,e==="fulfilled"||e==="rejected"}function bf(e,n,t){switch(t=e[t],t===void 0?e.push(n):t!==n&&(n.then($t,$t),n=t),n.status){case"fulfilled":return n.value;case"rejected":throw e=n.reason,vf(e),e;default:if(typeof n.status=="string")n.then($t,$t);else{if(e=sn,e!==null&&100<e.shellSuspendCounter)throw Error(s(482));e=n,e.status="pending",e.then(function(i){if(n.status==="pending"){var o=n;o.status="fulfilled",o.value=i}},function(i){if(n.status==="pending"){var o=n;o.status="rejected",o.reason=i}})}switch(n.status){case"fulfilled":return n.value;case"rejected":throw e=n.reason,vf(e),e}throw yi=n,Yi}}function gi(e){try{var n=e._init;return n(e._payload)}catch(t){throw t!==null&&typeof t=="object"&&typeof t.then=="function"?(yi=t,Yi):t}}var yi=null;function zf(){if(yi===null)throw Error(s(459));var e=yi;return yi=null,e}function vf(e){if(e===Yi||e===Yl)throw Error(s(483))}var Gi=null,Lr=0;function Ql(e){var n=Lr;return Lr+=1,Gi===null&&(Gi=[]),bf(Gi,e,n)}function Or(e,n){n=n.props.ref,e.ref=n!==void 0?n:null}function Kl(e,n){throw n.$$typeof===S?Error(s(525)):(e=Object.prototype.toString.call(n),Error(s(31,e==="[object Object]"?"object with keys {"+Object.keys(n).join(", ")+"}":e)))}function Sf(e){function n(k,w){if(e){var M=k.deletions;M===null?(k.deletions=[w],k.flags|=16):M.push(w)}}function t(k,w){if(!e)return null;for(;w!==null;)n(k,w),w=w.sibling;return null}function i(k){for(var w=new Map;k!==null;)k.key!==null?w.set(k.key,k):w.set(k.index,k),k=k.sibling;return w}function o(k,w){return k=na(k,w),k.index=0,k.sibling=null,k}function c(k,w,M){return k.index=M,e?(M=k.alternate,M!==null?(M=M.index,M<w?(k.flags|=67108866,w):M):(k.flags|=67108866,w)):(k.flags|=1048576,w)}function m(k){return e&&k.alternate===null&&(k.flags|=67108866),k}function z(k,w,M,V){return w===null||w.tag!==6?(w=Io(M,k.mode,V),w.return=k,w):(w=o(w,M),w.return=k,w)}function D(k,w,M,V){var xe=M.type;return xe===N?B(k,w,M.props.children,V,M.key):w!==null&&(w.elementType===xe||typeof xe=="object"&&xe!==null&&xe.$$typeof===ne&&gi(xe)===w.type)?(w=o(w,M.props),Or(w,M),w.return=k,w):(w=Xl(M.type,M.key,M.props,null,k.mode,V),Or(w,M),w.return=k,w)}function _(k,w,M,V){return w===null||w.tag!==4||w.stateNode.containerInfo!==M.containerInfo||w.stateNode.implementation!==M.implementation?(w=Mo(M,k.mode,V),w.return=k,w):(w=o(w,M.children||[]),w.return=k,w)}function B(k,w,M,V,xe){return w===null||w.tag!==7?(w=di(M,k.mode,V,xe),w.return=k,w):(w=o(w,M),w.return=k,w)}function Y(k,w,M){if(typeof w=="string"&&w!==""||typeof w=="number"||typeof w=="bigint")return w=Io(""+w,k.mode,M),w.return=k,w;if(typeof w=="object"&&w!==null){switch(w.$$typeof){case v:return M=Xl(w.type,w.key,w.props,null,k.mode,M),Or(M,w),M.return=k,M;case L:return w=Mo(w,k.mode,M),w.return=k,w;case ne:return w=gi(w),Y(k,w,M)}if(J(w)||ee(w))return w=di(w,k.mode,M,null),w.return=k,w;if(typeof w.then=="function")return Y(k,Ql(w),M);if(w.$$typeof===q)return Y(k,Vl(k,w),M);Kl(k,w)}return null}function O(k,w,M,V){var xe=w!==null?w.key:null;if(typeof M=="string"&&M!==""||typeof M=="number"||typeof M=="bigint")return xe!==null?null:z(k,w,""+M,V);if(typeof M=="object"&&M!==null){switch(M.$$typeof){case v:return M.key===xe?D(k,w,M,V):null;case L:return M.key===xe?_(k,w,M,V):null;case ne:return M=gi(M),O(k,w,M,V)}if(J(M)||ee(M))return xe!==null?null:B(k,w,M,V,null);if(typeof M.then=="function")return O(k,w,Ql(M),V);if(M.$$typeof===q)return O(k,w,Vl(k,M),V);Kl(k,M)}return null}function U(k,w,M,V,xe){if(typeof V=="string"&&V!==""||typeof V=="number"||typeof V=="bigint")return k=k.get(M)||null,z(w,k,""+V,xe);if(typeof V=="object"&&V!==null){switch(V.$$typeof){case v:return k=k.get(V.key===null?M:V.key)||null,D(w,k,V,xe);case L:return k=k.get(V.key===null?M:V.key)||null,_(w,k,V,xe);case ne:return V=gi(V),U(k,w,M,V,xe)}if(J(V)||ee(V))return k=k.get(M)||null,B(w,k,V,xe,null);if(typeof V.then=="function")return U(k,w,M,Ql(V),xe);if(V.$$typeof===q)return U(k,w,M,Vl(w,V),xe);Kl(w,V)}return null}function me(k,w,M,V){for(var xe=null,qe=null,ve=w,Le=w=0,Xe=null;ve!==null&&Le<M.length;Le++){ve.index>Le?(Xe=ve,ve=null):Xe=ve.sibling;var Ye=O(k,ve,M[Le],V);if(Ye===null){ve===null&&(ve=Xe);break}e&&ve&&Ye.alternate===null&&n(k,ve),w=c(Ye,w,Le),qe===null?xe=Ye:qe.sibling=Ye,qe=Ye,ve=Xe}if(Le===M.length)return t(k,ve),He&&ta(k,Le),xe;if(ve===null){for(;Le<M.length;Le++)ve=Y(k,M[Le],V),ve!==null&&(w=c(ve,w,Le),qe===null?xe=ve:qe.sibling=ve,qe=ve);return He&&ta(k,Le),xe}for(ve=i(ve);Le<M.length;Le++)Xe=U(ve,k,Le,M[Le],V),Xe!==null&&(e&&Xe.alternate!==null&&ve.delete(Xe.key===null?Le:Xe.key),w=c(Xe,w,Le),qe===null?xe=Xe:qe.sibling=Xe,qe=Xe);return e&&ve.forEach(function(Ya){return n(k,Ya)}),He&&ta(k,Le),xe}function De(k,w,M,V){if(M==null)throw Error(s(151));for(var xe=null,qe=null,ve=w,Le=w=0,Xe=null,Ye=M.next();ve!==null&&!Ye.done;Le++,Ye=M.next()){ve.index>Le?(Xe=ve,ve=null):Xe=ve.sibling;var Ya=O(k,ve,Ye.value,V);if(Ya===null){ve===null&&(ve=Xe);break}e&&ve&&Ya.alternate===null&&n(k,ve),w=c(Ya,w,Le),qe===null?xe=Ya:qe.sibling=Ya,qe=Ya,ve=Xe}if(Ye.done)return t(k,ve),He&&ta(k,Le),xe;if(ve===null){for(;!Ye.done;Le++,Ye=M.next())Ye=Y(k,Ye.value,V),Ye!==null&&(w=c(Ye,w,Le),qe===null?xe=Ye:qe.sibling=Ye,qe=Ye);return He&&ta(k,Le),xe}for(ve=i(ve);!Ye.done;Le++,Ye=M.next())Ye=U(ve,k,Le,Ye.value,V),Ye!==null&&(e&&Ye.alternate!==null&&ve.delete(Ye.key===null?Le:Ye.key),w=c(Ye,w,Le),qe===null?xe=Ye:qe.sibling=Ye,qe=Ye);return e&&ve.forEach(function(M0){return n(k,M0)}),He&&ta(k,Le),xe}function ln(k,w,M,V){if(typeof M=="object"&&M!==null&&M.type===N&&M.key===null&&(M=M.props.children),typeof M=="object"&&M!==null){switch(M.$$typeof){case v:e:{for(var xe=M.key;w!==null;){if(w.key===xe){if(xe=M.type,xe===N){if(w.tag===7){t(k,w.sibling),V=o(w,M.props.children),V.return=k,k=V;break e}}else if(w.elementType===xe||typeof xe=="object"&&xe!==null&&xe.$$typeof===ne&&gi(xe)===w.type){t(k,w.sibling),V=o(w,M.props),Or(V,M),V.return=k,k=V;break e}t(k,w);break}else n(k,w);w=w.sibling}M.type===N?(V=di(M.props.children,k.mode,V,M.key),V.return=k,k=V):(V=Xl(M.type,M.key,M.props,null,k.mode,V),Or(V,M),V.return=k,k=V)}return m(k);case L:e:{for(xe=M.key;w!==null;){if(w.key===xe)if(w.tag===4&&w.stateNode.containerInfo===M.containerInfo&&w.stateNode.implementation===M.implementation){t(k,w.sibling),V=o(w,M.children||[]),V.return=k,k=V;break e}else{t(k,w);break}else n(k,w);w=w.sibling}V=Mo(M,k.mode,V),V.return=k,k=V}return m(k);case ne:return M=gi(M),ln(k,w,M,V)}if(J(M))return me(k,w,M,V);if(ee(M)){if(xe=ee(M),typeof xe!="function")throw Error(s(150));return M=xe.call(M),De(k,w,M,V)}if(typeof M.then=="function")return ln(k,w,Ql(M),V);if(M.$$typeof===q)return ln(k,w,Vl(k,M),V);Kl(k,M)}return typeof M=="string"&&M!==""||typeof M=="number"||typeof M=="bigint"?(M=""+M,w!==null&&w.tag===6?(t(k,w.sibling),V=o(w,M),V.return=k,k=V):(t(k,w),V=Io(M,k.mode,V),V.return=k,k=V),m(k)):t(k,w)}return function(k,w,M,V){try{Lr=0;var xe=ln(k,w,M,V);return Gi=null,xe}catch(ve){if(ve===Yi||ve===Yl)throw ve;var qe=ot(29,ve,null,k.mode);return qe.lanes=V,qe.return=k,qe}}}var bi=Sf(!0),Ef=Sf(!1),Ia=!1;function Ho(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function Zo(e,n){e=e.updateQueue,n.updateQueue===e&&(n.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function Ma(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function _a(e,n,t){var i=e.updateQueue;if(i===null)return null;if(i=i.shared,(Ge&2)!==0){var o=i.pending;return o===null?n.next=n:(n.next=o.next,o.next=n),i.pending=n,n=Bl(e),rf(e,null,t),n}return jl(e,i,n,t),Bl(e)}function Nr(e,n,t){if(n=n.updateQueue,n!==null&&(n=n.shared,(t&4194048)!==0)){var i=n.lanes;i&=e.pendingLanes,t|=i,n.lanes=t,I(e,t)}}function Vo(e,n){var t=e.updateQueue,i=e.alternate;if(i!==null&&(i=i.updateQueue,t===i)){var o=null,c=null;if(t=t.firstBaseUpdate,t!==null){do{var m={lane:t.lane,tag:t.tag,payload:t.payload,callback:null,next:null};c===null?o=c=m:c=c.next=m,t=t.next}while(t!==null);c===null?o=c=n:c=c.next=n}else o=c=n;t={baseState:i.baseState,firstBaseUpdate:o,lastBaseUpdate:c,shared:i.shared,callbacks:i.callbacks},e.updateQueue=t;return}e=t.lastBaseUpdate,e===null?t.firstBaseUpdate=n:e.next=n,t.lastBaseUpdate=n}var qo=!1;function Wr(){if(qo){var e=qi;if(e!==null)throw e}}function Ur(e,n,t,i){qo=!1;var o=e.updateQueue;Ia=!1;var c=o.firstBaseUpdate,m=o.lastBaseUpdate,z=o.shared.pending;if(z!==null){o.shared.pending=null;var D=z,_=D.next;D.next=null,m===null?c=_:m.next=_,m=D;var B=e.alternate;B!==null&&(B=B.updateQueue,z=B.lastBaseUpdate,z!==m&&(z===null?B.firstBaseUpdate=_:z.next=_,B.lastBaseUpdate=D))}if(c!==null){var Y=o.baseState;m=0,B=_=D=null,z=c;do{var O=z.lane&-536870913,U=O!==z.lane;if(U?(Be&O)===O:(i&O)===O){O!==0&&O===Vi&&(qo=!0),B!==null&&(B=B.next={lane:0,tag:z.tag,payload:z.payload,callback:null,next:null});e:{var me=e,De=z;O=n;var ln=t;switch(De.tag){case 1:if(me=De.payload,typeof me=="function"){Y=me.call(ln,Y,O);break e}Y=me;break e;case 3:me.flags=me.flags&-65537|128;case 0:if(me=De.payload,O=typeof me=="function"?me.call(ln,Y,O):me,O==null)break e;Y=b({},Y,O);break e;case 2:Ia=!0}}O=z.callback,O!==null&&(e.flags|=64,U&&(e.flags|=8192),U=o.callbacks,U===null?o.callbacks=[O]:U.push(O))}else U={lane:O,tag:z.tag,payload:z.payload,callback:z.callback,next:null},B===null?(_=B=U,D=Y):B=B.next=U,m|=O;if(z=z.next,z===null){if(z=o.shared.pending,z===null)break;U=z,z=U.next,U.next=null,o.lastBaseUpdate=U,o.shared.pending=null}}while(!0);B===null&&(D=Y),o.baseState=D,o.firstBaseUpdate=_,o.lastBaseUpdate=B,c===null&&(o.shared.lanes=0),Wa|=m,e.lanes=m,e.memoizedState=Y}}function xf(e,n){if(typeof e!="function")throw Error(s(191,e));e.call(n)}function Df(e,n){var t=e.callbacks;if(t!==null)for(e.callbacks=null,e=0;e<t.length;e++)xf(t[e],n)}var Qi=T(null),Fl=T(0);function Tf(e,n){e=pa,E(Fl,e),E(Qi,n),pa=e|n.baseLanes}function Yo(){E(Fl,pa),E(Qi,Qi.current)}function Go(){pa=Fl.current,j(Qi),j(Fl)}var ct=T(null),wt=null;function Ca(e){var n=e.alternate;E(Dn,Dn.current&1),E(ct,e),wt===null&&(n===null||Qi.current!==null||n.memoizedState!==null)&&(wt=e)}function Qo(e){E(Dn,Dn.current),E(ct,e),wt===null&&(wt=e)}function Af(e){e.tag===22?(E(Dn,Dn.current),E(ct,e),wt===null&&(wt=e)):La()}function La(){E(Dn,Dn.current),E(ct,ct.current)}function ut(e){j(ct),wt===e&&(wt=null),j(Dn)}var Dn=T(0);function Jl(e){for(var n=e;n!==null;){if(n.tag===13){var t=n.memoizedState;if(t!==null&&(t=t.dehydrated,t===null||nu(t)||tu(t)))return n}else if(n.tag===19&&(n.memoizedProps.revealOrder==="forwards"||n.memoizedProps.revealOrder==="backwards"||n.memoizedProps.revealOrder==="unstable_legacy-backwards"||n.memoizedProps.revealOrder==="together")){if((n.flags&128)!==0)return n}else if(n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return null;n=n.return}n.sibling.return=n.return,n=n.sibling}return null}var ra=0,Ce=null,an=null,wn=null,$l=!1,Ki=!1,zi=!1,es=0,Pr=0,Fi=null,Sb=0;function Sn(){throw Error(s(321))}function Ko(e,n){if(n===null)return!1;for(var t=0;t<n.length&&t<e.length;t++)if(!st(e[t],n[t]))return!1;return!0}function Fo(e,n,t,i,o,c){return ra=c,Ce=n,n.memoizedState=null,n.updateQueue=null,n.lanes=0,C.H=e===null||e.memoizedState===null?cp:fc,zi=!1,c=t(i,o),zi=!1,Ki&&(c=Rf(n,t,i,o)),wf(e),c}function wf(e){C.H=Xr;var n=an!==null&&an.next!==null;if(ra=0,wn=an=Ce=null,$l=!1,Pr=0,Fi=null,n)throw Error(s(300));e===null||Rn||(e=e.dependencies,e!==null&&Zl(e)&&(Rn=!0))}function Rf(e,n,t,i){Ce=e;var o=0;do{if(Ki&&(Fi=null),Pr=0,Ki=!1,25<=o)throw Error(s(301));if(o+=1,wn=an=null,e.updateQueue!=null){var c=e.updateQueue;c.lastEffect=null,c.events=null,c.stores=null,c.memoCache!=null&&(c.memoCache.index=0)}C.H=up,c=n(t,i)}while(Ki);return c}function Eb(){var e=C.H,n=e.useState()[0];return n=typeof n.then=="function"?jr(n):n,e=e.useState()[0],(an!==null?an.memoizedState:null)!==e&&(Ce.flags|=1024),n}function Jo(){var e=es!==0;return es=0,e}function $o(e,n,t){n.updateQueue=e.updateQueue,n.flags&=-2053,e.lanes&=~t}function ec(e){if($l){for(e=e.memoizedState;e!==null;){var n=e.queue;n!==null&&(n.pending=null),e=e.next}$l=!1}ra=0,wn=an=Ce=null,Ki=!1,Pr=es=0,Fi=null}function Vn(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return wn===null?Ce.memoizedState=wn=e:wn=wn.next=e,wn}function Tn(){if(an===null){var e=Ce.alternate;e=e!==null?e.memoizedState:null}else e=an.next;var n=wn===null?Ce.memoizedState:wn.next;if(n!==null)wn=n,an=e;else{if(e===null)throw Ce.alternate===null?Error(s(467)):Error(s(310));an=e,e={memoizedState:an.memoizedState,baseState:an.baseState,baseQueue:an.baseQueue,queue:an.queue,next:null},wn===null?Ce.memoizedState=wn=e:wn=wn.next=e}return wn}function ns(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function jr(e){var n=Pr;return Pr+=1,Fi===null&&(Fi=[]),e=bf(Fi,e,n),n=Ce,(wn===null?n.memoizedState:wn.next)===null&&(n=n.alternate,C.H=n===null||n.memoizedState===null?cp:fc),e}function ts(e){if(e!==null&&typeof e=="object"){if(typeof e.then=="function")return jr(e);if(e.$$typeof===q)return Pn(e)}throw Error(s(438,String(e)))}function nc(e){var n=null,t=Ce.updateQueue;if(t!==null&&(n=t.memoCache),n==null){var i=Ce.alternate;i!==null&&(i=i.updateQueue,i!==null&&(i=i.memoCache,i!=null&&(n={data:i.data.map(function(o){return o.slice()}),index:0})))}if(n==null&&(n={data:[],index:0}),t===null&&(t=ns(),Ce.updateQueue=t),t.memoCache=n,t=n.data[n.index],t===void 0)for(t=n.data[n.index]=Array(e),i=0;i<e;i++)t[i]=ue;return n.index++,t}function la(e,n){return typeof n=="function"?n(e):n}function as(e){var n=Tn();return tc(n,an,e)}function tc(e,n,t){var i=e.queue;if(i===null)throw Error(s(311));i.lastRenderedReducer=t;var o=e.baseQueue,c=i.pending;if(c!==null){if(o!==null){var m=o.next;o.next=c.next,c.next=m}n.baseQueue=o=c,i.pending=null}if(c=e.baseState,o===null)e.memoizedState=c;else{n=o.next;var z=m=null,D=null,_=n,B=!1;do{var Y=_.lane&-536870913;if(Y!==_.lane?(Be&Y)===Y:(ra&Y)===Y){var O=_.revertLane;if(O===0)D!==null&&(D=D.next={lane:0,revertLane:0,gesture:null,action:_.action,hasEagerState:_.hasEagerState,eagerState:_.eagerState,next:null}),Y===Vi&&(B=!0);else if((ra&O)===O){_=_.next,O===Vi&&(B=!0);continue}else Y={lane:0,revertLane:_.revertLane,gesture:null,action:_.action,hasEagerState:_.hasEagerState,eagerState:_.eagerState,next:null},D===null?(z=D=Y,m=c):D=D.next=Y,Ce.lanes|=O,Wa|=O;Y=_.action,zi&&t(c,Y),c=_.hasEagerState?_.eagerState:t(c,Y)}else O={lane:Y,revertLane:_.revertLane,gesture:_.gesture,action:_.action,hasEagerState:_.hasEagerState,eagerState:_.eagerState,next:null},D===null?(z=D=O,m=c):D=D.next=O,Ce.lanes|=Y,Wa|=Y;_=_.next}while(_!==null&&_!==n);if(D===null?m=c:D.next=z,!st(c,e.memoizedState)&&(Rn=!0,B&&(t=qi,t!==null)))throw t;e.memoizedState=c,e.baseState=m,e.baseQueue=D,i.lastRenderedState=c}return o===null&&(i.lanes=0),[e.memoizedState,i.dispatch]}function ac(e){var n=Tn(),t=n.queue;if(t===null)throw Error(s(311));t.lastRenderedReducer=e;var i=t.dispatch,o=t.pending,c=n.memoizedState;if(o!==null){t.pending=null;var m=o=o.next;do c=e(c,m.action),m=m.next;while(m!==o);st(c,n.memoizedState)||(Rn=!0),n.memoizedState=c,n.baseQueue===null&&(n.baseState=c),t.lastRenderedState=c}return[c,i]}function kf(e,n,t){var i=Ce,o=Tn(),c=He;if(c){if(t===void 0)throw Error(s(407));t=t()}else t=n();var m=!st((an||o).memoizedState,t);if(m&&(o.memoizedState=t,Rn=!0),o=o.queue,lc(_f.bind(null,i,o,e),[e]),o.getSnapshot!==n||m||wn!==null&&wn.memoizedState.tag&1){if(i.flags|=2048,Ji(9,{destroy:void 0},Mf.bind(null,i,o,t,n),null),sn===null)throw Error(s(349));c||(ra&127)!==0||If(i,n,t)}return t}function If(e,n,t){e.flags|=16384,e={getSnapshot:n,value:t},n=Ce.updateQueue,n===null?(n=ns(),Ce.updateQueue=n,n.stores=[e]):(t=n.stores,t===null?n.stores=[e]:t.push(e))}function Mf(e,n,t,i){n.value=t,n.getSnapshot=i,Cf(n)&&Lf(e)}function _f(e,n,t){return t(function(){Cf(n)&&Lf(e)})}function Cf(e){var n=e.getSnapshot;e=e.value;try{var t=n();return!st(e,t)}catch{return!0}}function Lf(e){var n=ui(e,2);n!==null&&nt(n,e,2)}function ic(e){var n=Vn();if(typeof e=="function"){var t=e;if(e=t(),zi){Nn(!0);try{t()}finally{Nn(!1)}}}return n.memoizedState=n.baseState=e,n.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:la,lastRenderedState:e},n}function Of(e,n,t,i){return e.baseState=t,tc(e,an,typeof i=="function"?i:la)}function xb(e,n,t,i,o){if(ls(e))throw Error(s(485));if(e=n.action,e!==null){var c={payload:o,action:e,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(m){c.listeners.push(m)}};C.T!==null?t(!0):c.isTransition=!1,i(c),t=n.pending,t===null?(c.next=n.pending=c,Nf(n,c)):(c.next=t.next,n.pending=t.next=c)}}function Nf(e,n){var t=n.action,i=n.payload,o=e.state;if(n.isTransition){var c=C.T,m={};C.T=m;try{var z=t(o,i),D=C.S;D!==null&&D(m,z),Wf(e,n,z)}catch(_){rc(e,n,_)}finally{c!==null&&m.types!==null&&(c.types=m.types),C.T=c}}else try{c=t(o,i),Wf(e,n,c)}catch(_){rc(e,n,_)}}function Wf(e,n,t){t!==null&&typeof t=="object"&&typeof t.then=="function"?t.then(function(i){Uf(e,n,i)},function(i){return rc(e,n,i)}):Uf(e,n,t)}function Uf(e,n,t){n.status="fulfilled",n.value=t,Pf(n),e.state=t,n=e.pending,n!==null&&(t=n.next,t===n?e.pending=null:(t=t.next,n.next=t,Nf(e,t)))}function rc(e,n,t){var i=e.pending;if(e.pending=null,i!==null){i=i.next;do n.status="rejected",n.reason=t,Pf(n),n=n.next;while(n!==i)}e.action=null}function Pf(e){e=e.listeners;for(var n=0;n<e.length;n++)(0,e[n])()}function jf(e,n){return n}function Bf(e,n){if(He){var t=sn.formState;if(t!==null){e:{var i=Ce;if(He){if(pn){n:{for(var o=pn,c=At;o.nodeType!==8;){if(!c){o=null;break n}if(o=Rt(o.nextSibling),o===null){o=null;break n}}c=o.data,o=c==="F!"||c==="F"?o:null}if(o){pn=Rt(o.nextSibling),i=o.data==="F!";break e}}Ra(i)}i=!1}i&&(n=t[0])}}return t=Vn(),t.memoizedState=t.baseState=n,i={pending:null,lanes:0,dispatch:null,lastRenderedReducer:jf,lastRenderedState:n},t.queue=i,t=lp.bind(null,Ce,i),i.dispatch=t,i=ic(!1),c=dc.bind(null,Ce,!1,i.queue),i=Vn(),o={state:n,dispatch:null,action:e,pending:null},i.queue=o,t=xb.bind(null,Ce,o,c,t),o.dispatch=t,i.memoizedState=e,[n,t,!1]}function Xf(e){var n=Tn();return Hf(n,an,e)}function Hf(e,n,t){if(n=tc(e,n,jf)[0],e=as(la)[0],typeof n=="object"&&n!==null&&typeof n.then=="function")try{var i=jr(n)}catch(m){throw m===Yi?Yl:m}else i=n;n=Tn();var o=n.queue,c=o.dispatch;return t!==n.memoizedState&&(Ce.flags|=2048,Ji(9,{destroy:void 0},Db.bind(null,o,t),null)),[i,c,e]}function Db(e,n){e.action=n}function Zf(e){var n=Tn(),t=an;if(t!==null)return Hf(n,t,e);Tn(),n=n.memoizedState,t=Tn();var i=t.queue.dispatch;return t.memoizedState=e,[n,i,!1]}function Ji(e,n,t,i){return e={tag:e,create:t,deps:i,inst:n,next:null},n=Ce.updateQueue,n===null&&(n=ns(),Ce.updateQueue=n),t=n.lastEffect,t===null?n.lastEffect=e.next=e:(i=t.next,t.next=e,e.next=i,n.lastEffect=e),e}function Vf(){return Tn().memoizedState}function is(e,n,t,i){var o=Vn();Ce.flags|=e,o.memoizedState=Ji(1|n,{destroy:void 0},t,i===void 0?null:i)}function rs(e,n,t,i){var o=Tn();i=i===void 0?null:i;var c=o.memoizedState.inst;an!==null&&i!==null&&Ko(i,an.memoizedState.deps)?o.memoizedState=Ji(n,c,t,i):(Ce.flags|=e,o.memoizedState=Ji(1|n,c,t,i))}function qf(e,n){is(8390656,8,e,n)}function lc(e,n){rs(2048,8,e,n)}function Tb(e){Ce.flags|=4;var n=Ce.updateQueue;if(n===null)n=ns(),Ce.updateQueue=n,n.events=[e];else{var t=n.events;t===null?n.events=[e]:t.push(e)}}function Yf(e){var n=Tn().memoizedState;return Tb({ref:n,nextImpl:e}),function(){if((Ge&2)!==0)throw Error(s(440));return n.impl.apply(void 0,arguments)}}function Gf(e,n){return rs(4,2,e,n)}function Qf(e,n){return rs(4,4,e,n)}function Kf(e,n){if(typeof n=="function"){e=e();var t=n(e);return function(){typeof t=="function"?t():n(null)}}if(n!=null)return e=e(),n.current=e,function(){n.current=null}}function Ff(e,n,t){t=t!=null?t.concat([e]):null,rs(4,4,Kf.bind(null,n,e),t)}function sc(){}function Jf(e,n){var t=Tn();n=n===void 0?null:n;var i=t.memoizedState;return n!==null&&Ko(n,i[1])?i[0]:(t.memoizedState=[e,n],e)}function $f(e,n){var t=Tn();n=n===void 0?null:n;var i=t.memoizedState;if(n!==null&&Ko(n,i[1]))return i[0];if(i=e(),zi){Nn(!0);try{e()}finally{Nn(!1)}}return t.memoizedState=[i,n],i}function oc(e,n,t){return t===void 0||(ra&1073741824)!==0&&(Be&261930)===0?e.memoizedState=n:(e.memoizedState=t,e=eh(),Ce.lanes|=e,Wa|=e,t)}function ep(e,n,t,i){return st(t,n)?t:Qi.current!==null?(e=oc(e,t,i),st(e,n)||(Rn=!0),e):(ra&42)===0||(ra&1073741824)!==0&&(Be&261930)===0?(Rn=!0,e.memoizedState=t):(e=eh(),Ce.lanes|=e,Wa|=e,n)}function np(e,n,t,i,o){var c=K.p;K.p=c!==0&&8>c?c:8;var m=C.T,z={};C.T=z,dc(e,!1,n,t);try{var D=o(),_=C.S;if(_!==null&&_(z,D),D!==null&&typeof D=="object"&&typeof D.then=="function"){var B=vb(D,i);Br(e,n,B,pt(e))}else Br(e,n,i,pt(e))}catch(Y){Br(e,n,{then:function(){},status:"rejected",reason:Y},pt())}finally{K.p=c,m!==null&&z.types!==null&&(m.types=z.types),C.T=m}}function Ab(){}function cc(e,n,t,i){if(e.tag!==5)throw Error(s(476));var o=tp(e).queue;np(e,o,n,le,t===null?Ab:function(){return ap(e),t(i)})}function tp(e){var n=e.memoizedState;if(n!==null)return n;n={memoizedState:le,baseState:le,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:la,lastRenderedState:le},next:null};var t={};return n.next={memoizedState:t,baseState:t,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:la,lastRenderedState:t},next:null},e.memoizedState=n,e=e.alternate,e!==null&&(e.memoizedState=n),n}function ap(e){var n=tp(e);n.next===null&&(n=e.alternate.memoizedState),Br(e,n.next.queue,{},pt())}function uc(){return Pn(il)}function ip(){return Tn().memoizedState}function rp(){return Tn().memoizedState}function wb(e){for(var n=e.return;n!==null;){switch(n.tag){case 24:case 3:var t=pt();e=Ma(t);var i=_a(n,e,t);i!==null&&(nt(i,n,t),Nr(i,n,t)),n={cache:Po()},e.payload=n;return}n=n.return}}function Rb(e,n,t){var i=pt();t={lane:i,revertLane:0,gesture:null,action:t,hasEagerState:!1,eagerState:null,next:null},ls(e)?sp(n,t):(t=Ro(e,n,t,i),t!==null&&(nt(t,e,i),op(t,n,i)))}function lp(e,n,t){var i=pt();Br(e,n,t,i)}function Br(e,n,t,i){var o={lane:i,revertLane:0,gesture:null,action:t,hasEagerState:!1,eagerState:null,next:null};if(ls(e))sp(n,o);else{var c=e.alternate;if(e.lanes===0&&(c===null||c.lanes===0)&&(c=n.lastRenderedReducer,c!==null))try{var m=n.lastRenderedState,z=c(m,t);if(o.hasEagerState=!0,o.eagerState=z,st(z,m))return jl(e,n,o,0),sn===null&&Pl(),!1}catch{}if(t=Ro(e,n,o,i),t!==null)return nt(t,e,i),op(t,n,i),!0}return!1}function dc(e,n,t,i){if(i={lane:2,revertLane:Hc(),gesture:null,action:i,hasEagerState:!1,eagerState:null,next:null},ls(e)){if(n)throw Error(s(479))}else n=Ro(e,t,i,2),n!==null&&nt(n,e,2)}function ls(e){var n=e.alternate;return e===Ce||n!==null&&n===Ce}function sp(e,n){Ki=$l=!0;var t=e.pending;t===null?n.next=n:(n.next=t.next,t.next=n),e.pending=n}function op(e,n,t){if((t&4194048)!==0){var i=n.lanes;i&=e.pendingLanes,t|=i,n.lanes=t,I(e,t)}}var Xr={readContext:Pn,use:ts,useCallback:Sn,useContext:Sn,useEffect:Sn,useImperativeHandle:Sn,useLayoutEffect:Sn,useInsertionEffect:Sn,useMemo:Sn,useReducer:Sn,useRef:Sn,useState:Sn,useDebugValue:Sn,useDeferredValue:Sn,useTransition:Sn,useSyncExternalStore:Sn,useId:Sn,useHostTransitionStatus:Sn,useFormState:Sn,useActionState:Sn,useOptimistic:Sn,useMemoCache:Sn,useCacheRefresh:Sn};Xr.useEffectEvent=Sn;var cp={readContext:Pn,use:ts,useCallback:function(e,n){return Vn().memoizedState=[e,n===void 0?null:n],e},useContext:Pn,useEffect:qf,useImperativeHandle:function(e,n,t){t=t!=null?t.concat([e]):null,is(4194308,4,Kf.bind(null,n,e),t)},useLayoutEffect:function(e,n){return is(4194308,4,e,n)},useInsertionEffect:function(e,n){is(4,2,e,n)},useMemo:function(e,n){var t=Vn();n=n===void 0?null:n;var i=e();if(zi){Nn(!0);try{e()}finally{Nn(!1)}}return t.memoizedState=[i,n],i},useReducer:function(e,n,t){var i=Vn();if(t!==void 0){var o=t(n);if(zi){Nn(!0);try{t(n)}finally{Nn(!1)}}}else o=n;return i.memoizedState=i.baseState=o,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:o},i.queue=e,e=e.dispatch=Rb.bind(null,Ce,e),[i.memoizedState,e]},useRef:function(e){var n=Vn();return e={current:e},n.memoizedState=e},useState:function(e){e=ic(e);var n=e.queue,t=lp.bind(null,Ce,n);return n.dispatch=t,[e.memoizedState,t]},useDebugValue:sc,useDeferredValue:function(e,n){var t=Vn();return oc(t,e,n)},useTransition:function(){var e=ic(!1);return e=np.bind(null,Ce,e.queue,!0,!1),Vn().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,n,t){var i=Ce,o=Vn();if(He){if(t===void 0)throw Error(s(407));t=t()}else{if(t=n(),sn===null)throw Error(s(349));(Be&127)!==0||If(i,n,t)}o.memoizedState=t;var c={value:t,getSnapshot:n};return o.queue=c,qf(_f.bind(null,i,c,e),[e]),i.flags|=2048,Ji(9,{destroy:void 0},Mf.bind(null,i,c,t,n),null),t},useId:function(){var e=Vn(),n=sn.identifierPrefix;if(He){var t=Ht,i=Xt;t=(i&~(1<<32-Fe(i)-1)).toString(32)+t,n="_"+n+"R_"+t,t=es++,0<t&&(n+="H"+t.toString(32)),n+="_"}else t=Sb++,n="_"+n+"r_"+t.toString(32)+"_";return e.memoizedState=n},useHostTransitionStatus:uc,useFormState:Bf,useActionState:Bf,useOptimistic:function(e){var n=Vn();n.memoizedState=n.baseState=e;var t={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return n.queue=t,n=dc.bind(null,Ce,!0,t),t.dispatch=n,[e,n]},useMemoCache:nc,useCacheRefresh:function(){return Vn().memoizedState=wb.bind(null,Ce)},useEffectEvent:function(e){var n=Vn(),t={impl:e};return n.memoizedState=t,function(){if((Ge&2)!==0)throw Error(s(440));return t.impl.apply(void 0,arguments)}}},fc={readContext:Pn,use:ts,useCallback:Jf,useContext:Pn,useEffect:lc,useImperativeHandle:Ff,useInsertionEffect:Gf,useLayoutEffect:Qf,useMemo:$f,useReducer:as,useRef:Vf,useState:function(){return as(la)},useDebugValue:sc,useDeferredValue:function(e,n){var t=Tn();return ep(t,an.memoizedState,e,n)},useTransition:function(){var e=as(la)[0],n=Tn().memoizedState;return[typeof e=="boolean"?e:jr(e),n]},useSyncExternalStore:kf,useId:ip,useHostTransitionStatus:uc,useFormState:Xf,useActionState:Xf,useOptimistic:function(e,n){var t=Tn();return Of(t,an,e,n)},useMemoCache:nc,useCacheRefresh:rp};fc.useEffectEvent=Yf;var up={readContext:Pn,use:ts,useCallback:Jf,useContext:Pn,useEffect:lc,useImperativeHandle:Ff,useInsertionEffect:Gf,useLayoutEffect:Qf,useMemo:$f,useReducer:ac,useRef:Vf,useState:function(){return ac(la)},useDebugValue:sc,useDeferredValue:function(e,n){var t=Tn();return an===null?oc(t,e,n):ep(t,an.memoizedState,e,n)},useTransition:function(){var e=ac(la)[0],n=Tn().memoizedState;return[typeof e=="boolean"?e:jr(e),n]},useSyncExternalStore:kf,useId:ip,useHostTransitionStatus:uc,useFormState:Zf,useActionState:Zf,useOptimistic:function(e,n){var t=Tn();return an!==null?Of(t,an,e,n):(t.baseState=e,[e,t.queue.dispatch])},useMemoCache:nc,useCacheRefresh:rp};up.useEffectEvent=Yf;function pc(e,n,t,i){n=e.memoizedState,t=t(i,n),t=t==null?n:b({},n,t),e.memoizedState=t,e.lanes===0&&(e.updateQueue.baseState=t)}var hc={enqueueSetState:function(e,n,t){e=e._reactInternals;var i=pt(),o=Ma(i);o.payload=n,t!=null&&(o.callback=t),n=_a(e,o,i),n!==null&&(nt(n,e,i),Nr(n,e,i))},enqueueReplaceState:function(e,n,t){e=e._reactInternals;var i=pt(),o=Ma(i);o.tag=1,o.payload=n,t!=null&&(o.callback=t),n=_a(e,o,i),n!==null&&(nt(n,e,i),Nr(n,e,i))},enqueueForceUpdate:function(e,n){e=e._reactInternals;var t=pt(),i=Ma(t);i.tag=2,n!=null&&(i.callback=n),n=_a(e,i,t),n!==null&&(nt(n,e,t),Nr(n,e,t))}};function dp(e,n,t,i,o,c,m){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(i,c,m):n.prototype&&n.prototype.isPureReactComponent?!Rr(t,i)||!Rr(o,c):!0}function fp(e,n,t,i){e=n.state,typeof n.componentWillReceiveProps=="function"&&n.componentWillReceiveProps(t,i),typeof n.UNSAFE_componentWillReceiveProps=="function"&&n.UNSAFE_componentWillReceiveProps(t,i),n.state!==e&&hc.enqueueReplaceState(n,n.state,null)}function vi(e,n){var t=n;if("ref"in n){t={};for(var i in n)i!=="ref"&&(t[i]=n[i])}if(e=e.defaultProps){t===n&&(t=b({},t));for(var o in e)t[o]===void 0&&(t[o]=e[o])}return t}function pp(e){Ul(e)}function hp(e){console.error(e)}function mp(e){Ul(e)}function ss(e,n){try{var t=e.onUncaughtError;t(n.value,{componentStack:n.stack})}catch(i){setTimeout(function(){throw i})}}function gp(e,n,t){try{var i=e.onCaughtError;i(t.value,{componentStack:t.stack,errorBoundary:n.tag===1?n.stateNode:null})}catch(o){setTimeout(function(){throw o})}}function mc(e,n,t){return t=Ma(t),t.tag=3,t.payload={element:null},t.callback=function(){ss(e,n)},t}function yp(e){return e=Ma(e),e.tag=3,e}function bp(e,n,t,i){var o=t.type.getDerivedStateFromError;if(typeof o=="function"){var c=i.value;e.payload=function(){return o(c)},e.callback=function(){gp(n,t,i)}}var m=t.stateNode;m!==null&&typeof m.componentDidCatch=="function"&&(e.callback=function(){gp(n,t,i),typeof o!="function"&&(Ua===null?Ua=new Set([this]):Ua.add(this));var z=i.stack;this.componentDidCatch(i.value,{componentStack:z!==null?z:""})})}function kb(e,n,t,i,o){if(t.flags|=32768,i!==null&&typeof i=="object"&&typeof i.then=="function"){if(n=t.alternate,n!==null&&Zi(n,t,o,!0),t=ct.current,t!==null){switch(t.tag){case 31:case 13:return wt===null?zs():t.alternate===null&&En===0&&(En=3),t.flags&=-257,t.flags|=65536,t.lanes=o,i===Gl?t.flags|=16384:(n=t.updateQueue,n===null?t.updateQueue=new Set([i]):n.add(i),jc(e,i,o)),!1;case 22:return t.flags|=65536,i===Gl?t.flags|=16384:(n=t.updateQueue,n===null?(n={transitions:null,markerInstances:null,retryQueue:new Set([i])},t.updateQueue=n):(t=n.retryQueue,t===null?n.retryQueue=new Set([i]):t.add(i)),jc(e,i,o)),!1}throw Error(s(435,t.tag))}return jc(e,i,o),zs(),!1}if(He)return n=ct.current,n!==null?((n.flags&65536)===0&&(n.flags|=256),n.flags|=65536,n.lanes=o,i!==Lo&&(e=Error(s(422),{cause:i}),Mr(xt(e,t)))):(i!==Lo&&(n=Error(s(423),{cause:i}),Mr(xt(n,t))),e=e.current.alternate,e.flags|=65536,o&=-o,e.lanes|=o,i=xt(i,t),o=mc(e.stateNode,i,o),Vo(e,o),En!==4&&(En=2)),!1;var c=Error(s(520),{cause:i});if(c=xt(c,t),Kr===null?Kr=[c]:Kr.push(c),En!==4&&(En=2),n===null)return!0;i=xt(i,t),t=n;do{switch(t.tag){case 3:return t.flags|=65536,e=o&-o,t.lanes|=e,e=mc(t.stateNode,i,e),Vo(t,e),!1;case 1:if(n=t.type,c=t.stateNode,(t.flags&128)===0&&(typeof n.getDerivedStateFromError=="function"||c!==null&&typeof c.componentDidCatch=="function"&&(Ua===null||!Ua.has(c))))return t.flags|=65536,o&=-o,t.lanes|=o,o=yp(o),bp(o,e,t,i),Vo(t,o),!1}t=t.return}while(t!==null);return!1}var gc=Error(s(461)),Rn=!1;function jn(e,n,t,i){n.child=e===null?Ef(n,null,t,i):bi(n,e.child,t,i)}function zp(e,n,t,i,o){t=t.render;var c=n.ref;if("ref"in i){var m={};for(var z in i)z!=="ref"&&(m[z]=i[z])}else m=i;return hi(n),i=Fo(e,n,t,m,c,o),z=Jo(),e!==null&&!Rn?($o(e,n,o),sa(e,n,o)):(He&&z&&_o(n),n.flags|=1,jn(e,n,i,o),n.child)}function vp(e,n,t,i,o){if(e===null){var c=t.type;return typeof c=="function"&&!ko(c)&&c.defaultProps===void 0&&t.compare===null?(n.tag=15,n.type=c,Sp(e,n,c,i,o)):(e=Xl(t.type,null,i,n,n.mode,o),e.ref=n.ref,e.return=n,n.child=e)}if(c=e.child,!Dc(e,o)){var m=c.memoizedProps;if(t=t.compare,t=t!==null?t:Rr,t(m,i)&&e.ref===n.ref)return sa(e,n,o)}return n.flags|=1,e=na(c,i),e.ref=n.ref,e.return=n,n.child=e}function Sp(e,n,t,i,o){if(e!==null){var c=e.memoizedProps;if(Rr(c,i)&&e.ref===n.ref)if(Rn=!1,n.pendingProps=i=c,Dc(e,o))(e.flags&131072)!==0&&(Rn=!0);else return n.lanes=e.lanes,sa(e,n,o)}return yc(e,n,t,i,o)}function Ep(e,n,t,i){var o=i.children,c=e!==null?e.memoizedState:null;if(e===null&&n.stateNode===null&&(n.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),i.mode==="hidden"){if((n.flags&128)!==0){if(c=c!==null?c.baseLanes|t:t,e!==null){for(i=n.child=e.child,o=0;i!==null;)o=o|i.lanes|i.childLanes,i=i.sibling;i=o&~c}else i=0,n.child=null;return xp(e,n,c,t,i)}if((t&536870912)!==0)n.memoizedState={baseLanes:0,cachePool:null},e!==null&&ql(n,c!==null?c.cachePool:null),c!==null?Tf(n,c):Yo(),Af(n);else return i=n.lanes=536870912,xp(e,n,c!==null?c.baseLanes|t:t,t,i)}else c!==null?(ql(n,c.cachePool),Tf(n,c),La(),n.memoizedState=null):(e!==null&&ql(n,null),Yo(),La());return jn(e,n,o,t),n.child}function Hr(e,n){return e!==null&&e.tag===22||n.stateNode!==null||(n.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),n.sibling}function xp(e,n,t,i,o){var c=Bo();return c=c===null?null:{parent:An._currentValue,pool:c},n.memoizedState={baseLanes:t,cachePool:c},e!==null&&ql(n,null),Yo(),Af(n),e!==null&&Zi(e,n,i,!0),n.childLanes=o,null}function os(e,n){return n=us({mode:n.mode,children:n.children},e.mode),n.ref=e.ref,e.child=n,n.return=e,n}function Dp(e,n,t){return bi(n,e.child,null,t),e=os(n,n.pendingProps),e.flags|=2,ut(n),n.memoizedState=null,e}function Ib(e,n,t){var i=n.pendingProps,o=(n.flags&128)!==0;if(n.flags&=-129,e===null){if(He){if(i.mode==="hidden")return e=os(n,i),n.lanes=536870912,Hr(null,e);if(Qo(n),(e=pn)?(e=Nh(e,At),e=e!==null&&e.data==="&"?e:null,e!==null&&(n.memoizedState={dehydrated:e,treeContext:Aa!==null?{id:Xt,overflow:Ht}:null,retryLane:536870912,hydrationErrors:null},t=sf(e),t.return=n,n.child=t,Un=n,pn=null)):e=null,e===null)throw Ra(n);return n.lanes=536870912,null}return os(n,i)}var c=e.memoizedState;if(c!==null){var m=c.dehydrated;if(Qo(n),o)if(n.flags&256)n.flags&=-257,n=Dp(e,n,t);else if(n.memoizedState!==null)n.child=e.child,n.flags|=128,n=null;else throw Error(s(558));else if(Rn||Zi(e,n,t,!1),o=(t&e.childLanes)!==0,Rn||o){if(i=sn,i!==null&&(m=W(i,t),m!==0&&m!==c.retryLane))throw c.retryLane=m,ui(e,m),nt(i,e,m),gc;zs(),n=Dp(e,n,t)}else e=c.treeContext,pn=Rt(m.nextSibling),Un=n,He=!0,wa=null,At=!1,e!==null&&uf(n,e),n=os(n,i),n.flags|=4096;return n}return e=na(e.child,{mode:i.mode,children:i.children}),e.ref=n.ref,n.child=e,e.return=n,e}function cs(e,n){var t=n.ref;if(t===null)e!==null&&e.ref!==null&&(n.flags|=4194816);else{if(typeof t!="function"&&typeof t!="object")throw Error(s(284));(e===null||e.ref!==t)&&(n.flags|=4194816)}}function yc(e,n,t,i,o){return hi(n),t=Fo(e,n,t,i,void 0,o),i=Jo(),e!==null&&!Rn?($o(e,n,o),sa(e,n,o)):(He&&i&&_o(n),n.flags|=1,jn(e,n,t,o),n.child)}function Tp(e,n,t,i,o,c){return hi(n),n.updateQueue=null,t=Rf(n,i,t,o),wf(e),i=Jo(),e!==null&&!Rn?($o(e,n,c),sa(e,n,c)):(He&&i&&_o(n),n.flags|=1,jn(e,n,t,c),n.child)}function Ap(e,n,t,i,o){if(hi(n),n.stateNode===null){var c=ji,m=t.contextType;typeof m=="object"&&m!==null&&(c=Pn(m)),c=new t(i,c),n.memoizedState=c.state!==null&&c.state!==void 0?c.state:null,c.updater=hc,n.stateNode=c,c._reactInternals=n,c=n.stateNode,c.props=i,c.state=n.memoizedState,c.refs={},Ho(n),m=t.contextType,c.context=typeof m=="object"&&m!==null?Pn(m):ji,c.state=n.memoizedState,m=t.getDerivedStateFromProps,typeof m=="function"&&(pc(n,t,m,i),c.state=n.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof c.getSnapshotBeforeUpdate=="function"||typeof c.UNSAFE_componentWillMount!="function"&&typeof c.componentWillMount!="function"||(m=c.state,typeof c.componentWillMount=="function"&&c.componentWillMount(),typeof c.UNSAFE_componentWillMount=="function"&&c.UNSAFE_componentWillMount(),m!==c.state&&hc.enqueueReplaceState(c,c.state,null),Ur(n,i,c,o),Wr(),c.state=n.memoizedState),typeof c.componentDidMount=="function"&&(n.flags|=4194308),i=!0}else if(e===null){c=n.stateNode;var z=n.memoizedProps,D=vi(t,z);c.props=D;var _=c.context,B=t.contextType;m=ji,typeof B=="object"&&B!==null&&(m=Pn(B));var Y=t.getDerivedStateFromProps;B=typeof Y=="function"||typeof c.getSnapshotBeforeUpdate=="function",z=n.pendingProps!==z,B||typeof c.UNSAFE_componentWillReceiveProps!="function"&&typeof c.componentWillReceiveProps!="function"||(z||_!==m)&&fp(n,c,i,m),Ia=!1;var O=n.memoizedState;c.state=O,Ur(n,i,c,o),Wr(),_=n.memoizedState,z||O!==_||Ia?(typeof Y=="function"&&(pc(n,t,Y,i),_=n.memoizedState),(D=Ia||dp(n,t,D,i,O,_,m))?(B||typeof c.UNSAFE_componentWillMount!="function"&&typeof c.componentWillMount!="function"||(typeof c.componentWillMount=="function"&&c.componentWillMount(),typeof c.UNSAFE_componentWillMount=="function"&&c.UNSAFE_componentWillMount()),typeof c.componentDidMount=="function"&&(n.flags|=4194308)):(typeof c.componentDidMount=="function"&&(n.flags|=4194308),n.memoizedProps=i,n.memoizedState=_),c.props=i,c.state=_,c.context=m,i=D):(typeof c.componentDidMount=="function"&&(n.flags|=4194308),i=!1)}else{c=n.stateNode,Zo(e,n),m=n.memoizedProps,B=vi(t,m),c.props=B,Y=n.pendingProps,O=c.context,_=t.contextType,D=ji,typeof _=="object"&&_!==null&&(D=Pn(_)),z=t.getDerivedStateFromProps,(_=typeof z=="function"||typeof c.getSnapshotBeforeUpdate=="function")||typeof c.UNSAFE_componentWillReceiveProps!="function"&&typeof c.componentWillReceiveProps!="function"||(m!==Y||O!==D)&&fp(n,c,i,D),Ia=!1,O=n.memoizedState,c.state=O,Ur(n,i,c,o),Wr();var U=n.memoizedState;m!==Y||O!==U||Ia||e!==null&&e.dependencies!==null&&Zl(e.dependencies)?(typeof z=="function"&&(pc(n,t,z,i),U=n.memoizedState),(B=Ia||dp(n,t,B,i,O,U,D)||e!==null&&e.dependencies!==null&&Zl(e.dependencies))?(_||typeof c.UNSAFE_componentWillUpdate!="function"&&typeof c.componentWillUpdate!="function"||(typeof c.componentWillUpdate=="function"&&c.componentWillUpdate(i,U,D),typeof c.UNSAFE_componentWillUpdate=="function"&&c.UNSAFE_componentWillUpdate(i,U,D)),typeof c.componentDidUpdate=="function"&&(n.flags|=4),typeof c.getSnapshotBeforeUpdate=="function"&&(n.flags|=1024)):(typeof c.componentDidUpdate!="function"||m===e.memoizedProps&&O===e.memoizedState||(n.flags|=4),typeof c.getSnapshotBeforeUpdate!="function"||m===e.memoizedProps&&O===e.memoizedState||(n.flags|=1024),n.memoizedProps=i,n.memoizedState=U),c.props=i,c.state=U,c.context=D,i=B):(typeof c.componentDidUpdate!="function"||m===e.memoizedProps&&O===e.memoizedState||(n.flags|=4),typeof c.getSnapshotBeforeUpdate!="function"||m===e.memoizedProps&&O===e.memoizedState||(n.flags|=1024),i=!1)}return c=i,cs(e,n),i=(n.flags&128)!==0,c||i?(c=n.stateNode,t=i&&typeof t.getDerivedStateFromError!="function"?null:c.render(),n.flags|=1,e!==null&&i?(n.child=bi(n,e.child,null,o),n.child=bi(n,null,t,o)):jn(e,n,t,o),n.memoizedState=c.state,e=n.child):e=sa(e,n,o),e}function wp(e,n,t,i){return fi(),n.flags|=256,jn(e,n,t,i),n.child}var bc={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function zc(e){return{baseLanes:e,cachePool:gf()}}function vc(e,n,t){return e=e!==null?e.childLanes&~t:0,n&&(e|=ft),e}function Rp(e,n,t){var i=n.pendingProps,o=!1,c=(n.flags&128)!==0,m;if((m=c)||(m=e!==null&&e.memoizedState===null?!1:(Dn.current&2)!==0),m&&(o=!0,n.flags&=-129),m=(n.flags&32)!==0,n.flags&=-33,e===null){if(He){if(o?Ca(n):La(),(e=pn)?(e=Nh(e,At),e=e!==null&&e.data!=="&"?e:null,e!==null&&(n.memoizedState={dehydrated:e,treeContext:Aa!==null?{id:Xt,overflow:Ht}:null,retryLane:536870912,hydrationErrors:null},t=sf(e),t.return=n,n.child=t,Un=n,pn=null)):e=null,e===null)throw Ra(n);return tu(e)?n.lanes=32:n.lanes=536870912,null}var z=i.children;return i=i.fallback,o?(La(),o=n.mode,z=us({mode:"hidden",children:z},o),i=di(i,o,t,null),z.return=n,i.return=n,z.sibling=i,n.child=z,i=n.child,i.memoizedState=zc(t),i.childLanes=vc(e,m,t),n.memoizedState=bc,Hr(null,i)):(Ca(n),Sc(n,z))}var D=e.memoizedState;if(D!==null&&(z=D.dehydrated,z!==null)){if(c)n.flags&256?(Ca(n),n.flags&=-257,n=Ec(e,n,t)):n.memoizedState!==null?(La(),n.child=e.child,n.flags|=128,n=null):(La(),z=i.fallback,o=n.mode,i=us({mode:"visible",children:i.children},o),z=di(z,o,t,null),z.flags|=2,i.return=n,z.return=n,i.sibling=z,n.child=i,bi(n,e.child,null,t),i=n.child,i.memoizedState=zc(t),i.childLanes=vc(e,m,t),n.memoizedState=bc,n=Hr(null,i));else if(Ca(n),tu(z)){if(m=z.nextSibling&&z.nextSibling.dataset,m)var _=m.dgst;m=_,i=Error(s(419)),i.stack="",i.digest=m,Mr({value:i,source:null,stack:null}),n=Ec(e,n,t)}else if(Rn||Zi(e,n,t,!1),m=(t&e.childLanes)!==0,Rn||m){if(m=sn,m!==null&&(i=W(m,t),i!==0&&i!==D.retryLane))throw D.retryLane=i,ui(e,i),nt(m,e,i),gc;nu(z)||zs(),n=Ec(e,n,t)}else nu(z)?(n.flags|=192,n.child=e.child,n=null):(e=D.treeContext,pn=Rt(z.nextSibling),Un=n,He=!0,wa=null,At=!1,e!==null&&uf(n,e),n=Sc(n,i.children),n.flags|=4096);return n}return o?(La(),z=i.fallback,o=n.mode,D=e.child,_=D.sibling,i=na(D,{mode:"hidden",children:i.children}),i.subtreeFlags=D.subtreeFlags&65011712,_!==null?z=na(_,z):(z=di(z,o,t,null),z.flags|=2),z.return=n,i.return=n,i.sibling=z,n.child=i,Hr(null,i),i=n.child,z=e.child.memoizedState,z===null?z=zc(t):(o=z.cachePool,o!==null?(D=An._currentValue,o=o.parent!==D?{parent:D,pool:D}:o):o=gf(),z={baseLanes:z.baseLanes|t,cachePool:o}),i.memoizedState=z,i.childLanes=vc(e,m,t),n.memoizedState=bc,Hr(e.child,i)):(Ca(n),t=e.child,e=t.sibling,t=na(t,{mode:"visible",children:i.children}),t.return=n,t.sibling=null,e!==null&&(m=n.deletions,m===null?(n.deletions=[e],n.flags|=16):m.push(e)),n.child=t,n.memoizedState=null,t)}function Sc(e,n){return n=us({mode:"visible",children:n},e.mode),n.return=e,e.child=n}function us(e,n){return e=ot(22,e,null,n),e.lanes=0,e}function Ec(e,n,t){return bi(n,e.child,null,t),e=Sc(n,n.pendingProps.children),e.flags|=2,n.memoizedState=null,e}function kp(e,n,t){e.lanes|=n;var i=e.alternate;i!==null&&(i.lanes|=n),Wo(e.return,n,t)}function xc(e,n,t,i,o,c){var m=e.memoizedState;m===null?e.memoizedState={isBackwards:n,rendering:null,renderingStartTime:0,last:i,tail:t,tailMode:o,treeForkCount:c}:(m.isBackwards=n,m.rendering=null,m.renderingStartTime=0,m.last=i,m.tail=t,m.tailMode=o,m.treeForkCount=c)}function Ip(e,n,t){var i=n.pendingProps,o=i.revealOrder,c=i.tail;i=i.children;var m=Dn.current,z=(m&2)!==0;if(z?(m=m&1|2,n.flags|=128):m&=1,E(Dn,m),jn(e,n,i,t),i=He?Ir:0,!z&&e!==null&&(e.flags&128)!==0)e:for(e=n.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&kp(e,t,n);else if(e.tag===19)kp(e,t,n);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===n)break e;for(;e.sibling===null;){if(e.return===null||e.return===n)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(o){case"forwards":for(t=n.child,o=null;t!==null;)e=t.alternate,e!==null&&Jl(e)===null&&(o=t),t=t.sibling;t=o,t===null?(o=n.child,n.child=null):(o=t.sibling,t.sibling=null),xc(n,!1,o,t,c,i);break;case"backwards":case"unstable_legacy-backwards":for(t=null,o=n.child,n.child=null;o!==null;){if(e=o.alternate,e!==null&&Jl(e)===null){n.child=o;break}e=o.sibling,o.sibling=t,t=o,o=e}xc(n,!0,t,null,c,i);break;case"together":xc(n,!1,null,null,void 0,i);break;default:n.memoizedState=null}return n.child}function sa(e,n,t){if(e!==null&&(n.dependencies=e.dependencies),Wa|=n.lanes,(t&n.childLanes)===0)if(e!==null){if(Zi(e,n,t,!1),(t&n.childLanes)===0)return null}else return null;if(e!==null&&n.child!==e.child)throw Error(s(153));if(n.child!==null){for(e=n.child,t=na(e,e.pendingProps),n.child=t,t.return=n;e.sibling!==null;)e=e.sibling,t=t.sibling=na(e,e.pendingProps),t.return=n;t.sibling=null}return n.child}function Dc(e,n){return(e.lanes&n)!==0?!0:(e=e.dependencies,!!(e!==null&&Zl(e)))}function Mb(e,n,t){switch(n.tag){case 3:Je(n,n.stateNode.containerInfo),ka(n,An,e.memoizedState.cache),fi();break;case 27:case 5:qn(n);break;case 4:Je(n,n.stateNode.containerInfo);break;case 10:ka(n,n.type,n.memoizedProps.value);break;case 31:if(n.memoizedState!==null)return n.flags|=128,Qo(n),null;break;case 13:var i=n.memoizedState;if(i!==null)return i.dehydrated!==null?(Ca(n),n.flags|=128,null):(t&n.child.childLanes)!==0?Rp(e,n,t):(Ca(n),e=sa(e,n,t),e!==null?e.sibling:null);Ca(n);break;case 19:var o=(e.flags&128)!==0;if(i=(t&n.childLanes)!==0,i||(Zi(e,n,t,!1),i=(t&n.childLanes)!==0),o){if(i)return Ip(e,n,t);n.flags|=128}if(o=n.memoizedState,o!==null&&(o.rendering=null,o.tail=null,o.lastEffect=null),E(Dn,Dn.current),i)break;return null;case 22:return n.lanes=0,Ep(e,n,t,n.pendingProps);case 24:ka(n,An,e.memoizedState.cache)}return sa(e,n,t)}function Mp(e,n,t){if(e!==null)if(e.memoizedProps!==n.pendingProps)Rn=!0;else{if(!Dc(e,t)&&(n.flags&128)===0)return Rn=!1,Mb(e,n,t);Rn=(e.flags&131072)!==0}else Rn=!1,He&&(n.flags&1048576)!==0&&cf(n,Ir,n.index);switch(n.lanes=0,n.tag){case 16:e:{var i=n.pendingProps;if(e=gi(n.elementType),n.type=e,typeof e=="function")ko(e)?(i=vi(e,i),n.tag=1,n=Ap(null,n,e,i,t)):(n.tag=0,n=yc(null,n,e,i,t));else{if(e!=null){var o=e.$$typeof;if(o===de){n.tag=11,n=zp(null,n,e,i,t);break e}else if(o===R){n.tag=14,n=vp(null,n,e,i,t);break e}}throw n=fe(e)||e,Error(s(306,n,""))}}return n;case 0:return yc(e,n,n.type,n.pendingProps,t);case 1:return i=n.type,o=vi(i,n.pendingProps),Ap(e,n,i,o,t);case 3:e:{if(Je(n,n.stateNode.containerInfo),e===null)throw Error(s(387));i=n.pendingProps;var c=n.memoizedState;o=c.element,Zo(e,n),Ur(n,i,null,t);var m=n.memoizedState;if(i=m.cache,ka(n,An,i),i!==c.cache&&Uo(n,[An],t,!0),Wr(),i=m.element,c.isDehydrated)if(c={element:i,isDehydrated:!1,cache:m.cache},n.updateQueue.baseState=c,n.memoizedState=c,n.flags&256){n=wp(e,n,i,t);break e}else if(i!==o){o=xt(Error(s(424)),n),Mr(o),n=wp(e,n,i,t);break e}else for(e=n.stateNode.containerInfo,e.nodeType===9?e=e.body:e=e.nodeName==="HTML"?e.ownerDocument.body:e,pn=Rt(e.firstChild),Un=n,He=!0,wa=null,At=!0,t=Ef(n,null,i,t),n.child=t;t;)t.flags=t.flags&-3|4096,t=t.sibling;else{if(fi(),i===o){n=sa(e,n,t);break e}jn(e,n,i,t)}n=n.child}return n;case 26:return cs(e,n),e===null?(t=Xh(n.type,null,n.pendingProps,null))?n.memoizedState=t:He||(t=n.type,e=n.pendingProps,i=As(ye.current).createElement(t),i[ce]=n,i[oe]=e,Bn(i,t,e),vn(i),n.stateNode=i):n.memoizedState=Xh(n.type,e.memoizedProps,n.pendingProps,e.memoizedState),null;case 27:return qn(n),e===null&&He&&(i=n.stateNode=Ph(n.type,n.pendingProps,ye.current),Un=n,At=!0,o=pn,Xa(n.type)?(au=o,pn=Rt(i.firstChild)):pn=o),jn(e,n,n.pendingProps.children,t),cs(e,n),e===null&&(n.flags|=4194304),n.child;case 5:return e===null&&He&&((o=i=pn)&&(i=s0(i,n.type,n.pendingProps,At),i!==null?(n.stateNode=i,Un=n,pn=Rt(i.firstChild),At=!1,o=!0):o=!1),o||Ra(n)),qn(n),o=n.type,c=n.pendingProps,m=e!==null?e.memoizedProps:null,i=c.children,Jc(o,c)?i=null:m!==null&&Jc(o,m)&&(n.flags|=32),n.memoizedState!==null&&(o=Fo(e,n,Eb,null,null,t),il._currentValue=o),cs(e,n),jn(e,n,i,t),n.child;case 6:return e===null&&He&&((e=t=pn)&&(t=o0(t,n.pendingProps,At),t!==null?(n.stateNode=t,Un=n,pn=null,e=!0):e=!1),e||Ra(n)),null;case 13:return Rp(e,n,t);case 4:return Je(n,n.stateNode.containerInfo),i=n.pendingProps,e===null?n.child=bi(n,null,i,t):jn(e,n,i,t),n.child;case 11:return zp(e,n,n.type,n.pendingProps,t);case 7:return jn(e,n,n.pendingProps,t),n.child;case 8:return jn(e,n,n.pendingProps.children,t),n.child;case 12:return jn(e,n,n.pendingProps.children,t),n.child;case 10:return i=n.pendingProps,ka(n,n.type,i.value),jn(e,n,i.children,t),n.child;case 9:return o=n.type._context,i=n.pendingProps.children,hi(n),o=Pn(o),i=i(o),n.flags|=1,jn(e,n,i,t),n.child;case 14:return vp(e,n,n.type,n.pendingProps,t);case 15:return Sp(e,n,n.type,n.pendingProps,t);case 19:return Ip(e,n,t);case 31:return Ib(e,n,t);case 22:return Ep(e,n,t,n.pendingProps);case 24:return hi(n),i=Pn(An),e===null?(o=Bo(),o===null&&(o=sn,c=Po(),o.pooledCache=c,c.refCount++,c!==null&&(o.pooledCacheLanes|=t),o=c),n.memoizedState={parent:i,cache:o},Ho(n),ka(n,An,o)):((e.lanes&t)!==0&&(Zo(e,n),Ur(n,null,null,t),Wr()),o=e.memoizedState,c=n.memoizedState,o.parent!==i?(o={parent:i,cache:i},n.memoizedState=o,n.lanes===0&&(n.memoizedState=n.updateQueue.baseState=o),ka(n,An,i)):(i=c.cache,ka(n,An,i),i!==o.cache&&Uo(n,[An],t,!0))),jn(e,n,n.pendingProps.children,t),n.child;case 29:throw n.pendingProps}throw Error(s(156,n.tag))}function oa(e){e.flags|=4}function Tc(e,n,t,i,o){if((n=(e.mode&32)!==0)&&(n=!1),n){if(e.flags|=16777216,(o&335544128)===o)if(e.stateNode.complete)e.flags|=8192;else if(ih())e.flags|=8192;else throw yi=Gl,Xo}else e.flags&=-16777217}function _p(e,n){if(n.type!=="stylesheet"||(n.state.loading&4)!==0)e.flags&=-16777217;else if(e.flags|=16777216,!Yh(n))if(ih())e.flags|=8192;else throw yi=Gl,Xo}function ds(e,n){n!==null&&(e.flags|=4),e.flags&16384&&(n=e.tag!==22?ii():536870912,e.lanes|=n,tr|=n)}function Zr(e,n){if(!He)switch(e.tailMode){case"hidden":n=e.tail;for(var t=null;n!==null;)n.alternate!==null&&(t=n),n=n.sibling;t===null?e.tail=null:t.sibling=null;break;case"collapsed":t=e.tail;for(var i=null;t!==null;)t.alternate!==null&&(i=t),t=t.sibling;i===null?n||e.tail===null?e.tail=null:e.tail.sibling=null:i.sibling=null}}function hn(e){var n=e.alternate!==null&&e.alternate.child===e.child,t=0,i=0;if(n)for(var o=e.child;o!==null;)t|=o.lanes|o.childLanes,i|=o.subtreeFlags&65011712,i|=o.flags&65011712,o.return=e,o=o.sibling;else for(o=e.child;o!==null;)t|=o.lanes|o.childLanes,i|=o.subtreeFlags,i|=o.flags,o.return=e,o=o.sibling;return e.subtreeFlags|=i,e.childLanes=t,n}function _b(e,n,t){var i=n.pendingProps;switch(Co(n),n.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return hn(n),null;case 1:return hn(n),null;case 3:return t=n.stateNode,i=null,e!==null&&(i=e.memoizedState.cache),n.memoizedState.cache!==i&&(n.flags|=2048),ia(An),Ke(),t.pendingContext&&(t.context=t.pendingContext,t.pendingContext=null),(e===null||e.child===null)&&(Hi(n)?oa(n):e===null||e.memoizedState.isDehydrated&&(n.flags&256)===0||(n.flags|=1024,Oo())),hn(n),null;case 26:var o=n.type,c=n.memoizedState;return e===null?(oa(n),c!==null?(hn(n),_p(n,c)):(hn(n),Tc(n,o,null,i,t))):c?c!==e.memoizedState?(oa(n),hn(n),_p(n,c)):(hn(n),n.flags&=-16777217):(e=e.memoizedProps,e!==i&&oa(n),hn(n),Tc(n,o,e,i,t)),null;case 27:if(Mt(n),t=ye.current,o=n.type,e!==null&&n.stateNode!=null)e.memoizedProps!==i&&oa(n);else{if(!i){if(n.stateNode===null)throw Error(s(166));return hn(n),null}e=ie.current,Hi(n)?df(n):(e=Ph(o,i,t),n.stateNode=e,oa(n))}return hn(n),null;case 5:if(Mt(n),o=n.type,e!==null&&n.stateNode!=null)e.memoizedProps!==i&&oa(n);else{if(!i){if(n.stateNode===null)throw Error(s(166));return hn(n),null}if(c=ie.current,Hi(n))df(n);else{var m=As(ye.current);switch(c){case 1:c=m.createElementNS("http://www.w3.org/2000/svg",o);break;case 2:c=m.createElementNS("http://www.w3.org/1998/Math/MathML",o);break;default:switch(o){case"svg":c=m.createElementNS("http://www.w3.org/2000/svg",o);break;case"math":c=m.createElementNS("http://www.w3.org/1998/Math/MathML",o);break;case"script":c=m.createElement("div"),c.innerHTML="<script><\/script>",c=c.removeChild(c.firstChild);break;case"select":c=typeof i.is=="string"?m.createElement("select",{is:i.is}):m.createElement("select"),i.multiple?c.multiple=!0:i.size&&(c.size=i.size);break;default:c=typeof i.is=="string"?m.createElement(o,{is:i.is}):m.createElement(o)}}c[ce]=n,c[oe]=i;e:for(m=n.child;m!==null;){if(m.tag===5||m.tag===6)c.appendChild(m.stateNode);else if(m.tag!==4&&m.tag!==27&&m.child!==null){m.child.return=m,m=m.child;continue}if(m===n)break e;for(;m.sibling===null;){if(m.return===null||m.return===n)break e;m=m.return}m.sibling.return=m.return,m=m.sibling}n.stateNode=c;e:switch(Bn(c,o,i),o){case"button":case"input":case"select":case"textarea":i=!!i.autoFocus;break e;case"img":i=!0;break e;default:i=!1}i&&oa(n)}}return hn(n),Tc(n,n.type,e===null?null:e.memoizedProps,n.pendingProps,t),null;case 6:if(e&&n.stateNode!=null)e.memoizedProps!==i&&oa(n);else{if(typeof i!="string"&&n.stateNode===null)throw Error(s(166));if(e=ye.current,Hi(n)){if(e=n.stateNode,t=n.memoizedProps,i=null,o=Un,o!==null)switch(o.tag){case 27:case 5:i=o.memoizedProps}e[ce]=n,e=!!(e.nodeValue===t||i!==null&&i.suppressHydrationWarning===!0||Rh(e.nodeValue,t)),e||Ra(n,!0)}else e=As(e).createTextNode(i),e[ce]=n,n.stateNode=e}return hn(n),null;case 31:if(t=n.memoizedState,e===null||e.memoizedState!==null){if(i=Hi(n),t!==null){if(e===null){if(!i)throw Error(s(318));if(e=n.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(s(557));e[ce]=n}else fi(),(n.flags&128)===0&&(n.memoizedState=null),n.flags|=4;hn(n),e=!1}else t=Oo(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=t),e=!0;if(!e)return n.flags&256?(ut(n),n):(ut(n),null);if((n.flags&128)!==0)throw Error(s(558))}return hn(n),null;case 13:if(i=n.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(o=Hi(n),i!==null&&i.dehydrated!==null){if(e===null){if(!o)throw Error(s(318));if(o=n.memoizedState,o=o!==null?o.dehydrated:null,!o)throw Error(s(317));o[ce]=n}else fi(),(n.flags&128)===0&&(n.memoizedState=null),n.flags|=4;hn(n),o=!1}else o=Oo(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=o),o=!0;if(!o)return n.flags&256?(ut(n),n):(ut(n),null)}return ut(n),(n.flags&128)!==0?(n.lanes=t,n):(t=i!==null,e=e!==null&&e.memoizedState!==null,t&&(i=n.child,o=null,i.alternate!==null&&i.alternate.memoizedState!==null&&i.alternate.memoizedState.cachePool!==null&&(o=i.alternate.memoizedState.cachePool.pool),c=null,i.memoizedState!==null&&i.memoizedState.cachePool!==null&&(c=i.memoizedState.cachePool.pool),c!==o&&(i.flags|=2048)),t!==e&&t&&(n.child.flags|=8192),ds(n,n.updateQueue),hn(n),null);case 4:return Ke(),e===null&&Yc(n.stateNode.containerInfo),hn(n),null;case 10:return ia(n.type),hn(n),null;case 19:if(j(Dn),i=n.memoizedState,i===null)return hn(n),null;if(o=(n.flags&128)!==0,c=i.rendering,c===null)if(o)Zr(i,!1);else{if(En!==0||e!==null&&(e.flags&128)!==0)for(e=n.child;e!==null;){if(c=Jl(e),c!==null){for(n.flags|=128,Zr(i,!1),e=c.updateQueue,n.updateQueue=e,ds(n,e),n.subtreeFlags=0,e=t,t=n.child;t!==null;)lf(t,e),t=t.sibling;return E(Dn,Dn.current&1|2),He&&ta(n,i.treeForkCount),n.child}e=e.sibling}i.tail!==null&&bn()>gs&&(n.flags|=128,o=!0,Zr(i,!1),n.lanes=4194304)}else{if(!o)if(e=Jl(c),e!==null){if(n.flags|=128,o=!0,e=e.updateQueue,n.updateQueue=e,ds(n,e),Zr(i,!0),i.tail===null&&i.tailMode==="hidden"&&!c.alternate&&!He)return hn(n),null}else 2*bn()-i.renderingStartTime>gs&&t!==536870912&&(n.flags|=128,o=!0,Zr(i,!1),n.lanes=4194304);i.isBackwards?(c.sibling=n.child,n.child=c):(e=i.last,e!==null?e.sibling=c:n.child=c,i.last=c)}return i.tail!==null?(e=i.tail,i.rendering=e,i.tail=e.sibling,i.renderingStartTime=bn(),e.sibling=null,t=Dn.current,E(Dn,o?t&1|2:t&1),He&&ta(n,i.treeForkCount),e):(hn(n),null);case 22:case 23:return ut(n),Go(),i=n.memoizedState!==null,e!==null?e.memoizedState!==null!==i&&(n.flags|=8192):i&&(n.flags|=8192),i?(t&536870912)!==0&&(n.flags&128)===0&&(hn(n),n.subtreeFlags&6&&(n.flags|=8192)):hn(n),t=n.updateQueue,t!==null&&ds(n,t.retryQueue),t=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(t=e.memoizedState.cachePool.pool),i=null,n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(i=n.memoizedState.cachePool.pool),i!==t&&(n.flags|=2048),e!==null&&j(mi),null;case 24:return t=null,e!==null&&(t=e.memoizedState.cache),n.memoizedState.cache!==t&&(n.flags|=2048),ia(An),hn(n),null;case 25:return null;case 30:return null}throw Error(s(156,n.tag))}function Cb(e,n){switch(Co(n),n.tag){case 1:return e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 3:return ia(An),Ke(),e=n.flags,(e&65536)!==0&&(e&128)===0?(n.flags=e&-65537|128,n):null;case 26:case 27:case 5:return Mt(n),null;case 31:if(n.memoizedState!==null){if(ut(n),n.alternate===null)throw Error(s(340));fi()}return e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 13:if(ut(n),e=n.memoizedState,e!==null&&e.dehydrated!==null){if(n.alternate===null)throw Error(s(340));fi()}return e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 19:return j(Dn),null;case 4:return Ke(),null;case 10:return ia(n.type),null;case 22:case 23:return ut(n),Go(),e!==null&&j(mi),e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 24:return ia(An),null;case 25:return null;default:return null}}function Cp(e,n){switch(Co(n),n.tag){case 3:ia(An),Ke();break;case 26:case 27:case 5:Mt(n);break;case 4:Ke();break;case 31:n.memoizedState!==null&&ut(n);break;case 13:ut(n);break;case 19:j(Dn);break;case 10:ia(n.type);break;case 22:case 23:ut(n),Go(),e!==null&&j(mi);break;case 24:ia(An)}}function Vr(e,n){try{var t=n.updateQueue,i=t!==null?t.lastEffect:null;if(i!==null){var o=i.next;t=o;do{if((t.tag&e)===e){i=void 0;var c=t.create,m=t.inst;i=c(),m.destroy=i}t=t.next}while(t!==o)}}catch(z){nn(n,n.return,z)}}function Oa(e,n,t){try{var i=n.updateQueue,o=i!==null?i.lastEffect:null;if(o!==null){var c=o.next;i=c;do{if((i.tag&e)===e){var m=i.inst,z=m.destroy;if(z!==void 0){m.destroy=void 0,o=n;var D=t,_=z;try{_()}catch(B){nn(o,D,B)}}}i=i.next}while(i!==c)}}catch(B){nn(n,n.return,B)}}function Lp(e){var n=e.updateQueue;if(n!==null){var t=e.stateNode;try{Df(n,t)}catch(i){nn(e,e.return,i)}}}function Op(e,n,t){t.props=vi(e.type,e.memoizedProps),t.state=e.memoizedState;try{t.componentWillUnmount()}catch(i){nn(e,n,i)}}function qr(e,n){try{var t=e.ref;if(t!==null){switch(e.tag){case 26:case 27:case 5:var i=e.stateNode;break;case 30:i=e.stateNode;break;default:i=e.stateNode}typeof t=="function"?e.refCleanup=t(i):t.current=i}}catch(o){nn(e,n,o)}}function Zt(e,n){var t=e.ref,i=e.refCleanup;if(t!==null)if(typeof i=="function")try{i()}catch(o){nn(e,n,o)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof t=="function")try{t(null)}catch(o){nn(e,n,o)}else t.current=null}function Np(e){var n=e.type,t=e.memoizedProps,i=e.stateNode;try{e:switch(n){case"button":case"input":case"select":case"textarea":t.autoFocus&&i.focus();break e;case"img":t.src?i.src=t.src:t.srcSet&&(i.srcset=t.srcSet)}}catch(o){nn(e,e.return,o)}}function Ac(e,n,t){try{var i=e.stateNode;n0(i,e.type,t,n),i[oe]=n}catch(o){nn(e,e.return,o)}}function Wp(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&Xa(e.type)||e.tag===4}function wc(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||Wp(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&Xa(e.type)||e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Rc(e,n,t){var i=e.tag;if(i===5||i===6)e=e.stateNode,n?(t.nodeType===9?t.body:t.nodeName==="HTML"?t.ownerDocument.body:t).insertBefore(e,n):(n=t.nodeType===9?t.body:t.nodeName==="HTML"?t.ownerDocument.body:t,n.appendChild(e),t=t._reactRootContainer,t!=null||n.onclick!==null||(n.onclick=$t));else if(i!==4&&(i===27&&Xa(e.type)&&(t=e.stateNode,n=null),e=e.child,e!==null))for(Rc(e,n,t),e=e.sibling;e!==null;)Rc(e,n,t),e=e.sibling}function fs(e,n,t){var i=e.tag;if(i===5||i===6)e=e.stateNode,n?t.insertBefore(e,n):t.appendChild(e);else if(i!==4&&(i===27&&Xa(e.type)&&(t=e.stateNode),e=e.child,e!==null))for(fs(e,n,t),e=e.sibling;e!==null;)fs(e,n,t),e=e.sibling}function Up(e){var n=e.stateNode,t=e.memoizedProps;try{for(var i=e.type,o=n.attributes;o.length;)n.removeAttributeNode(o[0]);Bn(n,i,t),n[ce]=e,n[oe]=t}catch(c){nn(e,e.return,c)}}var ca=!1,kn=!1,kc=!1,Pp=typeof WeakSet=="function"?WeakSet:Set,On=null;function Lb(e,n){if(e=e.containerInfo,Kc=Cs,e=Kd(e),Eo(e)){if("selectionStart"in e)var t={start:e.selectionStart,end:e.selectionEnd};else e:{t=(t=e.ownerDocument)&&t.defaultView||window;var i=t.getSelection&&t.getSelection();if(i&&i.rangeCount!==0){t=i.anchorNode;var o=i.anchorOffset,c=i.focusNode;i=i.focusOffset;try{t.nodeType,c.nodeType}catch{t=null;break e}var m=0,z=-1,D=-1,_=0,B=0,Y=e,O=null;n:for(;;){for(var U;Y!==t||o!==0&&Y.nodeType!==3||(z=m+o),Y!==c||i!==0&&Y.nodeType!==3||(D=m+i),Y.nodeType===3&&(m+=Y.nodeValue.length),(U=Y.firstChild)!==null;)O=Y,Y=U;for(;;){if(Y===e)break n;if(O===t&&++_===o&&(z=m),O===c&&++B===i&&(D=m),(U=Y.nextSibling)!==null)break;Y=O,O=Y.parentNode}Y=U}t=z===-1||D===-1?null:{start:z,end:D}}else t=null}t=t||{start:0,end:0}}else t=null;for(Fc={focusedElem:e,selectionRange:t},Cs=!1,On=n;On!==null;)if(n=On,e=n.child,(n.subtreeFlags&1028)!==0&&e!==null)e.return=n,On=e;else for(;On!==null;){switch(n=On,c=n.alternate,e=n.flags,n.tag){case 0:if((e&4)!==0&&(e=n.updateQueue,e=e!==null?e.events:null,e!==null))for(t=0;t<e.length;t++)o=e[t],o.ref.impl=o.nextImpl;break;case 11:case 15:break;case 1:if((e&1024)!==0&&c!==null){e=void 0,t=n,o=c.memoizedProps,c=c.memoizedState,i=t.stateNode;try{var me=vi(t.type,o);e=i.getSnapshotBeforeUpdate(me,c),i.__reactInternalSnapshotBeforeUpdate=e}catch(De){nn(t,t.return,De)}}break;case 3:if((e&1024)!==0){if(e=n.stateNode.containerInfo,t=e.nodeType,t===9)eu(e);else if(t===1)switch(e.nodeName){case"HEAD":case"HTML":case"BODY":eu(e);break;default:e.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((e&1024)!==0)throw Error(s(163))}if(e=n.sibling,e!==null){e.return=n.return,On=e;break}On=n.return}}function jp(e,n,t){var i=t.flags;switch(t.tag){case 0:case 11:case 15:da(e,t),i&4&&Vr(5,t);break;case 1:if(da(e,t),i&4)if(e=t.stateNode,n===null)try{e.componentDidMount()}catch(m){nn(t,t.return,m)}else{var o=vi(t.type,n.memoizedProps);n=n.memoizedState;try{e.componentDidUpdate(o,n,e.__reactInternalSnapshotBeforeUpdate)}catch(m){nn(t,t.return,m)}}i&64&&Lp(t),i&512&&qr(t,t.return);break;case 3:if(da(e,t),i&64&&(e=t.updateQueue,e!==null)){if(n=null,t.child!==null)switch(t.child.tag){case 27:case 5:n=t.child.stateNode;break;case 1:n=t.child.stateNode}try{Df(e,n)}catch(m){nn(t,t.return,m)}}break;case 27:n===null&&i&4&&Up(t);case 26:case 5:da(e,t),n===null&&i&4&&Np(t),i&512&&qr(t,t.return);break;case 12:da(e,t);break;case 31:da(e,t),i&4&&Hp(e,t);break;case 13:da(e,t),i&4&&Zp(e,t),i&64&&(e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(t=Hb.bind(null,t),c0(e,t))));break;case 22:if(i=t.memoizedState!==null||ca,!i){n=n!==null&&n.memoizedState!==null||kn,o=ca;var c=kn;ca=i,(kn=n)&&!c?fa(e,t,(t.subtreeFlags&8772)!==0):da(e,t),ca=o,kn=c}break;case 30:break;default:da(e,t)}}function Bp(e){var n=e.alternate;n!==null&&(e.alternate=null,Bp(n)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(n=e.stateNode,n!==null&&on(n)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var gn=null,Fn=!1;function ua(e,n,t){for(t=t.child;t!==null;)Xp(e,n,t),t=t.sibling}function Xp(e,n,t){if(zn&&typeof zn.onCommitFiberUnmount=="function")try{zn.onCommitFiberUnmount(mn,t)}catch{}switch(t.tag){case 26:kn||Zt(t,n),ua(e,n,t),t.memoizedState?t.memoizedState.count--:t.stateNode&&(t=t.stateNode,t.parentNode.removeChild(t));break;case 27:kn||Zt(t,n);var i=gn,o=Fn;Xa(t.type)&&(gn=t.stateNode,Fn=!1),ua(e,n,t),nl(t.stateNode),gn=i,Fn=o;break;case 5:kn||Zt(t,n);case 6:if(i=gn,o=Fn,gn=null,ua(e,n,t),gn=i,Fn=o,gn!==null)if(Fn)try{(gn.nodeType===9?gn.body:gn.nodeName==="HTML"?gn.ownerDocument.body:gn).removeChild(t.stateNode)}catch(c){nn(t,n,c)}else try{gn.removeChild(t.stateNode)}catch(c){nn(t,n,c)}break;case 18:gn!==null&&(Fn?(e=gn,Lh(e.nodeType===9?e.body:e.nodeName==="HTML"?e.ownerDocument.body:e,t.stateNode),ur(e)):Lh(gn,t.stateNode));break;case 4:i=gn,o=Fn,gn=t.stateNode.containerInfo,Fn=!0,ua(e,n,t),gn=i,Fn=o;break;case 0:case 11:case 14:case 15:Oa(2,t,n),kn||Oa(4,t,n),ua(e,n,t);break;case 1:kn||(Zt(t,n),i=t.stateNode,typeof i.componentWillUnmount=="function"&&Op(t,n,i)),ua(e,n,t);break;case 21:ua(e,n,t);break;case 22:kn=(i=kn)||t.memoizedState!==null,ua(e,n,t),kn=i;break;default:ua(e,n,t)}}function Hp(e,n){if(n.memoizedState===null&&(e=n.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{ur(e)}catch(t){nn(n,n.return,t)}}}function Zp(e,n){if(n.memoizedState===null&&(e=n.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{ur(e)}catch(t){nn(n,n.return,t)}}function Ob(e){switch(e.tag){case 31:case 13:case 19:var n=e.stateNode;return n===null&&(n=e.stateNode=new Pp),n;case 22:return e=e.stateNode,n=e._retryCache,n===null&&(n=e._retryCache=new Pp),n;default:throw Error(s(435,e.tag))}}function ps(e,n){var t=Ob(e);n.forEach(function(i){if(!t.has(i)){t.add(i);var o=Zb.bind(null,e,i);i.then(o,o)}})}function Jn(e,n){var t=n.deletions;if(t!==null)for(var i=0;i<t.length;i++){var o=t[i],c=e,m=n,z=m;e:for(;z!==null;){switch(z.tag){case 27:if(Xa(z.type)){gn=z.stateNode,Fn=!1;break e}break;case 5:gn=z.stateNode,Fn=!1;break e;case 3:case 4:gn=z.stateNode.containerInfo,Fn=!0;break e}z=z.return}if(gn===null)throw Error(s(160));Xp(c,m,o),gn=null,Fn=!1,c=o.alternate,c!==null&&(c.return=null),o.return=null}if(n.subtreeFlags&13886)for(n=n.child;n!==null;)Vp(n,e),n=n.sibling}var Wt=null;function Vp(e,n){var t=e.alternate,i=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:Jn(n,e),$n(e),i&4&&(Oa(3,e,e.return),Vr(3,e),Oa(5,e,e.return));break;case 1:Jn(n,e),$n(e),i&512&&(kn||t===null||Zt(t,t.return)),i&64&&ca&&(e=e.updateQueue,e!==null&&(i=e.callbacks,i!==null&&(t=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=t===null?i:t.concat(i))));break;case 26:var o=Wt;if(Jn(n,e),$n(e),i&512&&(kn||t===null||Zt(t,t.return)),i&4){var c=t!==null?t.memoizedState:null;if(i=e.memoizedState,t===null)if(i===null)if(e.stateNode===null){e:{i=e.type,t=e.memoizedProps,o=o.ownerDocument||o;n:switch(i){case"title":c=o.getElementsByTagName("title")[0],(!c||c[We]||c[ce]||c.namespaceURI==="http://www.w3.org/2000/svg"||c.hasAttribute("itemprop"))&&(c=o.createElement(i),o.head.insertBefore(c,o.querySelector("head > title"))),Bn(c,i,t),c[ce]=e,vn(c),i=c;break e;case"link":var m=Vh("link","href",o).get(i+(t.href||""));if(m){for(var z=0;z<m.length;z++)if(c=m[z],c.getAttribute("href")===(t.href==null||t.href===""?null:t.href)&&c.getAttribute("rel")===(t.rel==null?null:t.rel)&&c.getAttribute("title")===(t.title==null?null:t.title)&&c.getAttribute("crossorigin")===(t.crossOrigin==null?null:t.crossOrigin)){m.splice(z,1);break n}}c=o.createElement(i),Bn(c,i,t),o.head.appendChild(c);break;case"meta":if(m=Vh("meta","content",o).get(i+(t.content||""))){for(z=0;z<m.length;z++)if(c=m[z],c.getAttribute("content")===(t.content==null?null:""+t.content)&&c.getAttribute("name")===(t.name==null?null:t.name)&&c.getAttribute("property")===(t.property==null?null:t.property)&&c.getAttribute("http-equiv")===(t.httpEquiv==null?null:t.httpEquiv)&&c.getAttribute("charset")===(t.charSet==null?null:t.charSet)){m.splice(z,1);break n}}c=o.createElement(i),Bn(c,i,t),o.head.appendChild(c);break;default:throw Error(s(468,i))}c[ce]=e,vn(c),i=c}e.stateNode=i}else qh(o,e.type,e.stateNode);else e.stateNode=Zh(o,i,e.memoizedProps);else c!==i?(c===null?t.stateNode!==null&&(t=t.stateNode,t.parentNode.removeChild(t)):c.count--,i===null?qh(o,e.type,e.stateNode):Zh(o,i,e.memoizedProps)):i===null&&e.stateNode!==null&&Ac(e,e.memoizedProps,t.memoizedProps)}break;case 27:Jn(n,e),$n(e),i&512&&(kn||t===null||Zt(t,t.return)),t!==null&&i&4&&Ac(e,e.memoizedProps,t.memoizedProps);break;case 5:if(Jn(n,e),$n(e),i&512&&(kn||t===null||Zt(t,t.return)),e.flags&32){o=e.stateNode;try{Ci(o,"")}catch(me){nn(e,e.return,me)}}i&4&&e.stateNode!=null&&(o=e.memoizedProps,Ac(e,o,t!==null?t.memoizedProps:o)),i&1024&&(kc=!0);break;case 6:if(Jn(n,e),$n(e),i&4){if(e.stateNode===null)throw Error(s(162));i=e.memoizedProps,t=e.stateNode;try{t.nodeValue=i}catch(me){nn(e,e.return,me)}}break;case 3:if(ks=null,o=Wt,Wt=ws(n.containerInfo),Jn(n,e),Wt=o,$n(e),i&4&&t!==null&&t.memoizedState.isDehydrated)try{ur(n.containerInfo)}catch(me){nn(e,e.return,me)}kc&&(kc=!1,qp(e));break;case 4:i=Wt,Wt=ws(e.stateNode.containerInfo),Jn(n,e),$n(e),Wt=i;break;case 12:Jn(n,e),$n(e);break;case 31:Jn(n,e),$n(e),i&4&&(i=e.updateQueue,i!==null&&(e.updateQueue=null,ps(e,i)));break;case 13:Jn(n,e),$n(e),e.child.flags&8192&&e.memoizedState!==null!=(t!==null&&t.memoizedState!==null)&&(ms=bn()),i&4&&(i=e.updateQueue,i!==null&&(e.updateQueue=null,ps(e,i)));break;case 22:o=e.memoizedState!==null;var D=t!==null&&t.memoizedState!==null,_=ca,B=kn;if(ca=_||o,kn=B||D,Jn(n,e),kn=B,ca=_,$n(e),i&8192)e:for(n=e.stateNode,n._visibility=o?n._visibility&-2:n._visibility|1,o&&(t===null||D||ca||kn||Si(e)),t=null,n=e;;){if(n.tag===5||n.tag===26){if(t===null){D=t=n;try{if(c=D.stateNode,o)m=c.style,typeof m.setProperty=="function"?m.setProperty("display","none","important"):m.display="none";else{z=D.stateNode;var Y=D.memoizedProps.style,O=Y!=null&&Y.hasOwnProperty("display")?Y.display:null;z.style.display=O==null||typeof O=="boolean"?"":(""+O).trim()}}catch(me){nn(D,D.return,me)}}}else if(n.tag===6){if(t===null){D=n;try{D.stateNode.nodeValue=o?"":D.memoizedProps}catch(me){nn(D,D.return,me)}}}else if(n.tag===18){if(t===null){D=n;try{var U=D.stateNode;o?Oh(U,!0):Oh(D.stateNode,!1)}catch(me){nn(D,D.return,me)}}}else if((n.tag!==22&&n.tag!==23||n.memoizedState===null||n===e)&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break e;for(;n.sibling===null;){if(n.return===null||n.return===e)break e;t===n&&(t=null),n=n.return}t===n&&(t=null),n.sibling.return=n.return,n=n.sibling}i&4&&(i=e.updateQueue,i!==null&&(t=i.retryQueue,t!==null&&(i.retryQueue=null,ps(e,t))));break;case 19:Jn(n,e),$n(e),i&4&&(i=e.updateQueue,i!==null&&(e.updateQueue=null,ps(e,i)));break;case 30:break;case 21:break;default:Jn(n,e),$n(e)}}function $n(e){var n=e.flags;if(n&2){try{for(var t,i=e.return;i!==null;){if(Wp(i)){t=i;break}i=i.return}if(t==null)throw Error(s(160));switch(t.tag){case 27:var o=t.stateNode,c=wc(e);fs(e,c,o);break;case 5:var m=t.stateNode;t.flags&32&&(Ci(m,""),t.flags&=-33);var z=wc(e);fs(e,z,m);break;case 3:case 4:var D=t.stateNode.containerInfo,_=wc(e);Rc(e,_,D);break;default:throw Error(s(161))}}catch(B){nn(e,e.return,B)}e.flags&=-3}n&4096&&(e.flags&=-4097)}function qp(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var n=e;qp(n),n.tag===5&&n.flags&1024&&n.stateNode.reset(),e=e.sibling}}function da(e,n){if(n.subtreeFlags&8772)for(n=n.child;n!==null;)jp(e,n.alternate,n),n=n.sibling}function Si(e){for(e=e.child;e!==null;){var n=e;switch(n.tag){case 0:case 11:case 14:case 15:Oa(4,n,n.return),Si(n);break;case 1:Zt(n,n.return);var t=n.stateNode;typeof t.componentWillUnmount=="function"&&Op(n,n.return,t),Si(n);break;case 27:nl(n.stateNode);case 26:case 5:Zt(n,n.return),Si(n);break;case 22:n.memoizedState===null&&Si(n);break;case 30:Si(n);break;default:Si(n)}e=e.sibling}}function fa(e,n,t){for(t=t&&(n.subtreeFlags&8772)!==0,n=n.child;n!==null;){var i=n.alternate,o=e,c=n,m=c.flags;switch(c.tag){case 0:case 11:case 15:fa(o,c,t),Vr(4,c);break;case 1:if(fa(o,c,t),i=c,o=i.stateNode,typeof o.componentDidMount=="function")try{o.componentDidMount()}catch(_){nn(i,i.return,_)}if(i=c,o=i.updateQueue,o!==null){var z=i.stateNode;try{var D=o.shared.hiddenCallbacks;if(D!==null)for(o.shared.hiddenCallbacks=null,o=0;o<D.length;o++)xf(D[o],z)}catch(_){nn(i,i.return,_)}}t&&m&64&&Lp(c),qr(c,c.return);break;case 27:Up(c);case 26:case 5:fa(o,c,t),t&&i===null&&m&4&&Np(c),qr(c,c.return);break;case 12:fa(o,c,t);break;case 31:fa(o,c,t),t&&m&4&&Hp(o,c);break;case 13:fa(o,c,t),t&&m&4&&Zp(o,c);break;case 22:c.memoizedState===null&&fa(o,c,t),qr(c,c.return);break;case 30:break;default:fa(o,c,t)}n=n.sibling}}function Ic(e,n){var t=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(t=e.memoizedState.cachePool.pool),e=null,n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(e=n.memoizedState.cachePool.pool),e!==t&&(e!=null&&e.refCount++,t!=null&&_r(t))}function Mc(e,n){e=null,n.alternate!==null&&(e=n.alternate.memoizedState.cache),n=n.memoizedState.cache,n!==e&&(n.refCount++,e!=null&&_r(e))}function Ut(e,n,t,i){if(n.subtreeFlags&10256)for(n=n.child;n!==null;)Yp(e,n,t,i),n=n.sibling}function Yp(e,n,t,i){var o=n.flags;switch(n.tag){case 0:case 11:case 15:Ut(e,n,t,i),o&2048&&Vr(9,n);break;case 1:Ut(e,n,t,i);break;case 3:Ut(e,n,t,i),o&2048&&(e=null,n.alternate!==null&&(e=n.alternate.memoizedState.cache),n=n.memoizedState.cache,n!==e&&(n.refCount++,e!=null&&_r(e)));break;case 12:if(o&2048){Ut(e,n,t,i),e=n.stateNode;try{var c=n.memoizedProps,m=c.id,z=c.onPostCommit;typeof z=="function"&&z(m,n.alternate===null?"mount":"update",e.passiveEffectDuration,-0)}catch(D){nn(n,n.return,D)}}else Ut(e,n,t,i);break;case 31:Ut(e,n,t,i);break;case 13:Ut(e,n,t,i);break;case 23:break;case 22:c=n.stateNode,m=n.alternate,n.memoizedState!==null?c._visibility&2?Ut(e,n,t,i):Yr(e,n):c._visibility&2?Ut(e,n,t,i):(c._visibility|=2,$i(e,n,t,i,(n.subtreeFlags&10256)!==0||!1)),o&2048&&Ic(m,n);break;case 24:Ut(e,n,t,i),o&2048&&Mc(n.alternate,n);break;default:Ut(e,n,t,i)}}function $i(e,n,t,i,o){for(o=o&&((n.subtreeFlags&10256)!==0||!1),n=n.child;n!==null;){var c=e,m=n,z=t,D=i,_=m.flags;switch(m.tag){case 0:case 11:case 15:$i(c,m,z,D,o),Vr(8,m);break;case 23:break;case 22:var B=m.stateNode;m.memoizedState!==null?B._visibility&2?$i(c,m,z,D,o):Yr(c,m):(B._visibility|=2,$i(c,m,z,D,o)),o&&_&2048&&Ic(m.alternate,m);break;case 24:$i(c,m,z,D,o),o&&_&2048&&Mc(m.alternate,m);break;default:$i(c,m,z,D,o)}n=n.sibling}}function Yr(e,n){if(n.subtreeFlags&10256)for(n=n.child;n!==null;){var t=e,i=n,o=i.flags;switch(i.tag){case 22:Yr(t,i),o&2048&&Ic(i.alternate,i);break;case 24:Yr(t,i),o&2048&&Mc(i.alternate,i);break;default:Yr(t,i)}n=n.sibling}}var Gr=8192;function er(e,n,t){if(e.subtreeFlags&Gr)for(e=e.child;e!==null;)Gp(e,n,t),e=e.sibling}function Gp(e,n,t){switch(e.tag){case 26:er(e,n,t),e.flags&Gr&&e.memoizedState!==null&&S0(t,Wt,e.memoizedState,e.memoizedProps);break;case 5:er(e,n,t);break;case 3:case 4:var i=Wt;Wt=ws(e.stateNode.containerInfo),er(e,n,t),Wt=i;break;case 22:e.memoizedState===null&&(i=e.alternate,i!==null&&i.memoizedState!==null?(i=Gr,Gr=16777216,er(e,n,t),Gr=i):er(e,n,t));break;default:er(e,n,t)}}function Qp(e){var n=e.alternate;if(n!==null&&(e=n.child,e!==null)){n.child=null;do n=e.sibling,e.sibling=null,e=n;while(e!==null)}}function Qr(e){var n=e.deletions;if((e.flags&16)!==0){if(n!==null)for(var t=0;t<n.length;t++){var i=n[t];On=i,Fp(i,e)}Qp(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)Kp(e),e=e.sibling}function Kp(e){switch(e.tag){case 0:case 11:case 15:Qr(e),e.flags&2048&&Oa(9,e,e.return);break;case 3:Qr(e);break;case 12:Qr(e);break;case 22:var n=e.stateNode;e.memoizedState!==null&&n._visibility&2&&(e.return===null||e.return.tag!==13)?(n._visibility&=-3,hs(e)):Qr(e);break;default:Qr(e)}}function hs(e){var n=e.deletions;if((e.flags&16)!==0){if(n!==null)for(var t=0;t<n.length;t++){var i=n[t];On=i,Fp(i,e)}Qp(e)}for(e=e.child;e!==null;){switch(n=e,n.tag){case 0:case 11:case 15:Oa(8,n,n.return),hs(n);break;case 22:t=n.stateNode,t._visibility&2&&(t._visibility&=-3,hs(n));break;default:hs(n)}e=e.sibling}}function Fp(e,n){for(;On!==null;){var t=On;switch(t.tag){case 0:case 11:case 15:Oa(8,t,n);break;case 23:case 22:if(t.memoizedState!==null&&t.memoizedState.cachePool!==null){var i=t.memoizedState.cachePool.pool;i!=null&&i.refCount++}break;case 24:_r(t.memoizedState.cache)}if(i=t.child,i!==null)i.return=t,On=i;else e:for(t=e;On!==null;){i=On;var o=i.sibling,c=i.return;if(Bp(i),i===t){On=null;break e}if(o!==null){o.return=c,On=o;break e}On=c}}}var Nb={getCacheForType:function(e){var n=Pn(An),t=n.data.get(e);return t===void 0&&(t=e(),n.data.set(e,t)),t},cacheSignal:function(){return Pn(An).controller.signal}},Wb=typeof WeakMap=="function"?WeakMap:Map,Ge=0,sn=null,Ue=null,Be=0,en=0,dt=null,Na=!1,nr=!1,_c=!1,pa=0,En=0,Wa=0,Ei=0,Cc=0,ft=0,tr=0,Kr=null,et=null,Lc=!1,ms=0,Jp=0,gs=1/0,ys=null,Ua=null,Cn=0,Pa=null,ar=null,ha=0,Oc=0,Nc=null,$p=null,Fr=0,Wc=null;function pt(){return(Ge&2)!==0&&Be!==0?Be&-Be:C.T!==null?Hc():Ee()}function eh(){if(ft===0)if((Be&536870912)===0||He){var e=Sa;Sa<<=1,(Sa&3932160)===0&&(Sa=262144),ft=e}else ft=536870912;return e=ct.current,e!==null&&(e.flags|=32),ft}function nt(e,n,t){(e===sn&&(en===2||en===9)||e.cancelPendingCommit!==null)&&(ir(e,0),ja(e,Be,ft,!1)),ri(e,t),((Ge&2)===0||e!==sn)&&(e===sn&&((Ge&2)===0&&(Ei|=t),En===4&&ja(e,Be,ft,!1)),Vt(e))}function nh(e,n,t){if((Ge&6)!==0)throw Error(s(327));var i=!t&&(n&127)===0&&(n&e.expiredLanes)===0||ai(e,n),o=i?jb(e,n):Pc(e,n,!0),c=i;do{if(o===0){nr&&!i&&ja(e,n,0,!1);break}else{if(t=e.current.alternate,c&&!Ub(t)){o=Pc(e,n,!1),c=!1;continue}if(o===2){if(c=n,e.errorRecoveryDisabledLanes&c)var m=0;else m=e.pendingLanes&-536870913,m=m!==0?m:m&536870912?536870912:0;if(m!==0){n=m;e:{var z=e;o=Kr;var D=z.current.memoizedState.isDehydrated;if(D&&(ir(z,m).flags|=256),m=Pc(z,m,!1),m!==2){if(_c&&!D){z.errorRecoveryDisabledLanes|=c,Ei|=c,o=4;break e}c=et,et=o,c!==null&&(et===null?et=c:et.push.apply(et,c))}o=m}if(c=!1,o!==2)continue}}if(o===1){ir(e,0),ja(e,n,0,!0);break}e:{switch(i=e,c=o,c){case 0:case 1:throw Error(s(345));case 4:if((n&4194048)!==n)break;case 6:ja(i,n,ft,!Na);break e;case 2:et=null;break;case 3:case 5:break;default:throw Error(s(329))}if((n&62914560)===n&&(o=ms+300-bn(),10<o)){if(ja(i,n,ft,!Na),ti(i,0,!0)!==0)break e;ha=n,i.timeoutHandle=_h(th.bind(null,i,t,et,ys,Lc,n,ft,Ei,tr,Na,c,"Throttled",-0,0),o);break e}th(i,t,et,ys,Lc,n,ft,Ei,tr,Na,c,null,-0,0)}}break}while(!0);Vt(e)}function th(e,n,t,i,o,c,m,z,D,_,B,Y,O,U){if(e.timeoutHandle=-1,Y=n.subtreeFlags,Y&8192||(Y&16785408)===16785408){Y={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:$t},Gp(n,c,Y);var me=(c&62914560)===c?ms-bn():(c&4194048)===c?Jp-bn():0;if(me=E0(Y,me),me!==null){ha=c,e.cancelPendingCommit=me(uh.bind(null,e,n,c,t,i,o,m,z,D,B,Y,null,O,U)),ja(e,c,m,!_);return}}uh(e,n,c,t,i,o,m,z,D)}function Ub(e){for(var n=e;;){var t=n.tag;if((t===0||t===11||t===15)&&n.flags&16384&&(t=n.updateQueue,t!==null&&(t=t.stores,t!==null)))for(var i=0;i<t.length;i++){var o=t[i],c=o.getSnapshot;o=o.value;try{if(!st(c(),o))return!1}catch{return!1}}if(t=n.child,n.subtreeFlags&16384&&t!==null)t.return=n,n=t;else{if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return!0;n=n.return}n.sibling.return=n.return,n=n.sibling}}return!0}function ja(e,n,t,i){n&=~Cc,n&=~Ei,e.suspendedLanes|=n,e.pingedLanes&=~n,i&&(e.warmLanes|=n),i=e.expirationTimes;for(var o=n;0<o;){var c=31-Fe(o),m=1<<c;i[c]=-1,o&=~m}t!==0&&A(e,t,n)}function bs(){return(Ge&6)===0?(Jr(0),!1):!0}function Uc(){if(Ue!==null){if(en===0)var e=Ue.return;else e=Ue,aa=pi=null,ec(e),Gi=null,Lr=0,e=Ue;for(;e!==null;)Cp(e.alternate,e),e=e.return;Ue=null}}function ir(e,n){var t=e.timeoutHandle;t!==-1&&(e.timeoutHandle=-1,i0(t)),t=e.cancelPendingCommit,t!==null&&(e.cancelPendingCommit=null,t()),ha=0,Uc(),sn=e,Ue=t=na(e.current,null),Be=n,en=0,dt=null,Na=!1,nr=ai(e,n),_c=!1,tr=ft=Cc=Ei=Wa=En=0,et=Kr=null,Lc=!1,(n&8)!==0&&(n|=n&32);var i=e.entangledLanes;if(i!==0)for(e=e.entanglements,i&=n;0<i;){var o=31-Fe(i),c=1<<o;n|=e[o],i&=~c}return pa=n,Pl(),t}function ah(e,n){Ce=null,C.H=Xr,n===Yi||n===Yl?(n=zf(),en=3):n===Xo?(n=zf(),en=4):en=n===gc?8:n!==null&&typeof n=="object"&&typeof n.then=="function"?6:1,dt=n,Ue===null&&(En=1,ss(e,xt(n,e.current)))}function ih(){var e=ct.current;return e===null?!0:(Be&4194048)===Be?wt===null:(Be&62914560)===Be||(Be&536870912)!==0?e===wt:!1}function rh(){var e=C.H;return C.H=Xr,e===null?Xr:e}function lh(){var e=C.A;return C.A=Nb,e}function zs(){En=4,Na||(Be&4194048)!==Be&&ct.current!==null||(nr=!0),(Wa&134217727)===0&&(Ei&134217727)===0||sn===null||ja(sn,Be,ft,!1)}function Pc(e,n,t){var i=Ge;Ge|=2;var o=rh(),c=lh();(sn!==e||Be!==n)&&(ys=null,ir(e,n)),n=!1;var m=En;e:do try{if(en!==0&&Ue!==null){var z=Ue,D=dt;switch(en){case 8:Uc(),m=6;break e;case 3:case 2:case 9:case 6:ct.current===null&&(n=!0);var _=en;if(en=0,dt=null,rr(e,z,D,_),t&&nr){m=0;break e}break;default:_=en,en=0,dt=null,rr(e,z,D,_)}}Pb(),m=En;break}catch(B){ah(e,B)}while(!0);return n&&e.shellSuspendCounter++,aa=pi=null,Ge=i,C.H=o,C.A=c,Ue===null&&(sn=null,Be=0,Pl()),m}function Pb(){for(;Ue!==null;)sh(Ue)}function jb(e,n){var t=Ge;Ge|=2;var i=rh(),o=lh();sn!==e||Be!==n?(ys=null,gs=bn()+500,ir(e,n)):nr=ai(e,n);e:do try{if(en!==0&&Ue!==null){n=Ue;var c=dt;n:switch(en){case 1:en=0,dt=null,rr(e,n,c,1);break;case 2:case 9:if(yf(c)){en=0,dt=null,oh(n);break}n=function(){en!==2&&en!==9||sn!==e||(en=7),Vt(e)},c.then(n,n);break e;case 3:en=7;break e;case 4:en=5;break e;case 7:yf(c)?(en=0,dt=null,oh(n)):(en=0,dt=null,rr(e,n,c,7));break;case 5:var m=null;switch(Ue.tag){case 26:m=Ue.memoizedState;case 5:case 27:var z=Ue;if(m?Yh(m):z.stateNode.complete){en=0,dt=null;var D=z.sibling;if(D!==null)Ue=D;else{var _=z.return;_!==null?(Ue=_,vs(_)):Ue=null}break n}}en=0,dt=null,rr(e,n,c,5);break;case 6:en=0,dt=null,rr(e,n,c,6);break;case 8:Uc(),En=6;break e;default:throw Error(s(462))}}Bb();break}catch(B){ah(e,B)}while(!0);return aa=pi=null,C.H=i,C.A=o,Ge=t,Ue!==null?0:(sn=null,Be=0,Pl(),En)}function Bb(){for(;Ue!==null&&!zr();)sh(Ue)}function sh(e){var n=Mp(e.alternate,e,pa);e.memoizedProps=e.pendingProps,n===null?vs(e):Ue=n}function oh(e){var n=e,t=n.alternate;switch(n.tag){case 15:case 0:n=Tp(t,n,n.pendingProps,n.type,void 0,Be);break;case 11:n=Tp(t,n,n.pendingProps,n.type.render,n.ref,Be);break;case 5:ec(n);default:Cp(t,n),n=Ue=lf(n,pa),n=Mp(t,n,pa)}e.memoizedProps=e.pendingProps,n===null?vs(e):Ue=n}function rr(e,n,t,i){aa=pi=null,ec(n),Gi=null,Lr=0;var o=n.return;try{if(kb(e,o,n,t,Be)){En=1,ss(e,xt(t,e.current)),Ue=null;return}}catch(c){if(o!==null)throw Ue=o,c;En=1,ss(e,xt(t,e.current)),Ue=null;return}n.flags&32768?(He||i===1?e=!0:nr||(Be&536870912)!==0?e=!1:(Na=e=!0,(i===2||i===9||i===3||i===6)&&(i=ct.current,i!==null&&i.tag===13&&(i.flags|=16384))),ch(n,e)):vs(n)}function vs(e){var n=e;do{if((n.flags&32768)!==0){ch(n,Na);return}e=n.return;var t=_b(n.alternate,n,pa);if(t!==null){Ue=t;return}if(n=n.sibling,n!==null){Ue=n;return}Ue=n=e}while(n!==null);En===0&&(En=5)}function ch(e,n){do{var t=Cb(e.alternate,e);if(t!==null){t.flags&=32767,Ue=t;return}if(t=e.return,t!==null&&(t.flags|=32768,t.subtreeFlags=0,t.deletions=null),!n&&(e=e.sibling,e!==null)){Ue=e;return}Ue=e=t}while(e!==null);En=6,Ue=null}function uh(e,n,t,i,o,c,m,z,D){e.cancelPendingCommit=null;do Ss();while(Cn!==0);if((Ge&6)!==0)throw Error(s(327));if(n!==null){if(n===e.current)throw Error(s(177));if(c=n.lanes|n.childLanes,c|=wo,io(e,t,c,m,z,D),e===sn&&(Ue=sn=null,Be=0),ar=n,Pa=e,ha=t,Oc=c,Nc=o,$p=i,(n.subtreeFlags&10256)!==0||(n.flags&10256)!==0?(e.callbackNode=null,e.callbackPriority=0,Vb(Se,function(){return mh(),null})):(e.callbackNode=null,e.callbackPriority=0),i=(n.flags&13878)!==0,(n.subtreeFlags&13878)!==0||i){i=C.T,C.T=null,o=K.p,K.p=2,m=Ge,Ge|=4;try{Lb(e,n,t)}finally{Ge=m,K.p=o,C.T=i}}Cn=1,dh(),fh(),ph()}}function dh(){if(Cn===1){Cn=0;var e=Pa,n=ar,t=(n.flags&13878)!==0;if((n.subtreeFlags&13878)!==0||t){t=C.T,C.T=null;var i=K.p;K.p=2;var o=Ge;Ge|=4;try{Vp(n,e);var c=Fc,m=Kd(e.containerInfo),z=c.focusedElem,D=c.selectionRange;if(m!==z&&z&&z.ownerDocument&&Qd(z.ownerDocument.documentElement,z)){if(D!==null&&Eo(z)){var _=D.start,B=D.end;if(B===void 0&&(B=_),"selectionStart"in z)z.selectionStart=_,z.selectionEnd=Math.min(B,z.value.length);else{var Y=z.ownerDocument||document,O=Y&&Y.defaultView||window;if(O.getSelection){var U=O.getSelection(),me=z.textContent.length,De=Math.min(D.start,me),ln=D.end===void 0?De:Math.min(D.end,me);!U.extend&&De>ln&&(m=ln,ln=De,De=m);var k=Gd(z,De),w=Gd(z,ln);if(k&&w&&(U.rangeCount!==1||U.anchorNode!==k.node||U.anchorOffset!==k.offset||U.focusNode!==w.node||U.focusOffset!==w.offset)){var M=Y.createRange();M.setStart(k.node,k.offset),U.removeAllRanges(),De>ln?(U.addRange(M),U.extend(w.node,w.offset)):(M.setEnd(w.node,w.offset),U.addRange(M))}}}}for(Y=[],U=z;U=U.parentNode;)U.nodeType===1&&Y.push({element:U,left:U.scrollLeft,top:U.scrollTop});for(typeof z.focus=="function"&&z.focus(),z=0;z<Y.length;z++){var V=Y[z];V.element.scrollLeft=V.left,V.element.scrollTop=V.top}}Cs=!!Kc,Fc=Kc=null}finally{Ge=o,K.p=i,C.T=t}}e.current=n,Cn=2}}function fh(){if(Cn===2){Cn=0;var e=Pa,n=ar,t=(n.flags&8772)!==0;if((n.subtreeFlags&8772)!==0||t){t=C.T,C.T=null;var i=K.p;K.p=2;var o=Ge;Ge|=4;try{jp(e,n.alternate,n)}finally{Ge=o,K.p=i,C.T=t}}Cn=3}}function ph(){if(Cn===4||Cn===3){Cn=0,vr();var e=Pa,n=ar,t=ha,i=$p;(n.subtreeFlags&10256)!==0||(n.flags&10256)!==0?Cn=5:(Cn=0,ar=Pa=null,hh(e,e.pendingLanes));var o=e.pendingLanes;if(o===0&&(Ua=null),se(t),n=n.stateNode,zn&&typeof zn.onCommitFiberRoot=="function")try{zn.onCommitFiberRoot(mn,n,void 0,(n.current.flags&128)===128)}catch{}if(i!==null){n=C.T,o=K.p,K.p=2,C.T=null;try{for(var c=e.onRecoverableError,m=0;m<i.length;m++){var z=i[m];c(z.value,{componentStack:z.stack})}}finally{C.T=n,K.p=o}}(ha&3)!==0&&Ss(),Vt(e),o=e.pendingLanes,(t&261930)!==0&&(o&42)!==0?e===Wc?Fr++:(Fr=0,Wc=e):Fr=0,Jr(0)}}function hh(e,n){(e.pooledCacheLanes&=n)===0&&(n=e.pooledCache,n!=null&&(e.pooledCache=null,_r(n)))}function Ss(){return dh(),fh(),ph(),mh()}function mh(){if(Cn!==5)return!1;var e=Pa,n=Oc;Oc=0;var t=se(ha),i=C.T,o=K.p;try{K.p=32>t?32:t,C.T=null,t=Nc,Nc=null;var c=Pa,m=ha;if(Cn=0,ar=Pa=null,ha=0,(Ge&6)!==0)throw Error(s(331));var z=Ge;if(Ge|=4,Kp(c.current),Yp(c,c.current,m,t),Ge=z,Jr(0,!1),zn&&typeof zn.onPostCommitFiberRoot=="function")try{zn.onPostCommitFiberRoot(mn,c)}catch{}return!0}finally{K.p=o,C.T=i,hh(e,n)}}function gh(e,n,t){n=xt(t,n),n=mc(e.stateNode,n,2),e=_a(e,n,2),e!==null&&(ri(e,2),Vt(e))}function nn(e,n,t){if(e.tag===3)gh(e,e,t);else for(;n!==null;){if(n.tag===3){gh(n,e,t);break}else if(n.tag===1){var i=n.stateNode;if(typeof n.type.getDerivedStateFromError=="function"||typeof i.componentDidCatch=="function"&&(Ua===null||!Ua.has(i))){e=xt(t,e),t=yp(2),i=_a(n,t,2),i!==null&&(bp(t,i,n,e),ri(i,2),Vt(i));break}}n=n.return}}function jc(e,n,t){var i=e.pingCache;if(i===null){i=e.pingCache=new Wb;var o=new Set;i.set(n,o)}else o=i.get(n),o===void 0&&(o=new Set,i.set(n,o));o.has(t)||(_c=!0,o.add(t),e=Xb.bind(null,e,n,t),n.then(e,e))}function Xb(e,n,t){var i=e.pingCache;i!==null&&i.delete(n),e.pingedLanes|=e.suspendedLanes&t,e.warmLanes&=~t,sn===e&&(Be&t)===t&&(En===4||En===3&&(Be&62914560)===Be&&300>bn()-ms?(Ge&2)===0&&ir(e,0):Cc|=t,tr===Be&&(tr=0)),Vt(e)}function yh(e,n){n===0&&(n=ii()),e=ui(e,n),e!==null&&(ri(e,n),Vt(e))}function Hb(e){var n=e.memoizedState,t=0;n!==null&&(t=n.retryLane),yh(e,t)}function Zb(e,n){var t=0;switch(e.tag){case 31:case 13:var i=e.stateNode,o=e.memoizedState;o!==null&&(t=o.retryLane);break;case 19:i=e.stateNode;break;case 22:i=e.stateNode._retryCache;break;default:throw Error(s(314))}i!==null&&i.delete(n),yh(e,t)}function Vb(e,n){return va(e,n)}var Es=null,lr=null,Bc=!1,xs=!1,Xc=!1,Ba=0;function Vt(e){e!==lr&&e.next===null&&(lr===null?Es=lr=e:lr=lr.next=e),xs=!0,Bc||(Bc=!0,Yb())}function Jr(e,n){if(!Xc&&xs){Xc=!0;do for(var t=!1,i=Es;i!==null;){if(e!==0){var o=i.pendingLanes;if(o===0)var c=0;else{var m=i.suspendedLanes,z=i.pingedLanes;c=(1<<31-Fe(42|e)+1)-1,c&=o&~(m&~z),c=c&201326741?c&201326741|1:c?c|2:0}c!==0&&(t=!0,Sh(i,c))}else c=Be,c=ti(i,i===sn?c:0,i.cancelPendingCommit!==null||i.timeoutHandle!==-1),(c&3)===0||ai(i,c)||(t=!0,Sh(i,c));i=i.next}while(t);Xc=!1}}function qb(){bh()}function bh(){xs=Bc=!1;var e=0;Ba!==0&&a0()&&(e=Ba);for(var n=bn(),t=null,i=Es;i!==null;){var o=i.next,c=zh(i,n);c===0?(i.next=null,t===null?Es=o:t.next=o,o===null&&(lr=t)):(t=i,(e!==0||(c&3)!==0)&&(xs=!0)),i=o}Cn!==0&&Cn!==5||Jr(e),Ba!==0&&(Ba=0)}function zh(e,n){for(var t=e.suspendedLanes,i=e.pingedLanes,o=e.expirationTimes,c=e.pendingLanes&-62914561;0<c;){var m=31-Fe(c),z=1<<m,D=o[m];D===-1?((z&t)===0||(z&i)!==0)&&(o[m]=kl(z,n)):D<=n&&(e.expiredLanes|=z),c&=~z}if(n=sn,t=Be,t=ti(e,e===n?t:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),i=e.callbackNode,t===0||e===n&&(en===2||en===9)||e.cancelPendingCommit!==null)return i!==null&&i!==null&&ei(i),e.callbackNode=null,e.callbackPriority=0;if((t&3)===0||ai(e,t)){if(n=t&-t,n===e.callbackPriority)return n;switch(i!==null&&ei(i),se(t)){case 2:case 8:t=te;break;case 32:t=Se;break;case 268435456:t=Ve;break;default:t=Se}return i=vh.bind(null,e),t=va(t,i),e.callbackPriority=n,e.callbackNode=t,n}return i!==null&&i!==null&&ei(i),e.callbackPriority=2,e.callbackNode=null,2}function vh(e,n){if(Cn!==0&&Cn!==5)return e.callbackNode=null,e.callbackPriority=0,null;var t=e.callbackNode;if(Ss()&&e.callbackNode!==t)return null;var i=Be;return i=ti(e,e===sn?i:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),i===0?null:(nh(e,i,n),zh(e,bn()),e.callbackNode!=null&&e.callbackNode===t?vh.bind(null,e):null)}function Sh(e,n){if(Ss())return null;nh(e,n,!0)}function Yb(){r0(function(){(Ge&6)!==0?va(Z,qb):bh()})}function Hc(){if(Ba===0){var e=Vi;e===0&&(e=ni,ni<<=1,(ni&261888)===0&&(ni=256)),Ba=e}return Ba}function Eh(e){return e==null||typeof e=="symbol"||typeof e=="boolean"?null:typeof e=="function"?e:Ml(""+e)}function xh(e,n){var t=n.ownerDocument.createElement("input");return t.name=n.name,t.value=n.value,e.id&&t.setAttribute("form",e.id),n.parentNode.insertBefore(t,n),e=new FormData(e),t.parentNode.removeChild(t),e}function Gb(e,n,t,i,o){if(n==="submit"&&t&&t.stateNode===o){var c=Eh((o[oe]||null).action),m=i.submitter;m&&(n=(n=m[oe]||null)?Eh(n.formAction):m.getAttribute("formAction"),n!==null&&(c=n,m=null));var z=new Ol("action","action",null,i,o);e.push({event:z,listeners:[{instance:null,listener:function(){if(i.defaultPrevented){if(Ba!==0){var D=m?xh(o,m):new FormData(o);cc(t,{pending:!0,data:D,method:o.method,action:c},null,D)}}else typeof c=="function"&&(z.preventDefault(),D=m?xh(o,m):new FormData(o),cc(t,{pending:!0,data:D,method:o.method,action:c},c,D))},currentTarget:o}]})}}for(var Zc=0;Zc<Ao.length;Zc++){var Vc=Ao[Zc],Qb=Vc.toLowerCase(),Kb=Vc[0].toUpperCase()+Vc.slice(1);Nt(Qb,"on"+Kb)}Nt($d,"onAnimationEnd"),Nt(ef,"onAnimationIteration"),Nt(nf,"onAnimationStart"),Nt("dblclick","onDoubleClick"),Nt("focusin","onFocus"),Nt("focusout","onBlur"),Nt(fb,"onTransitionRun"),Nt(pb,"onTransitionStart"),Nt(hb,"onTransitionCancel"),Nt(tf,"onTransitionEnd"),Lt("onMouseEnter",["mouseout","mouseover"]),Lt("onMouseLeave",["mouseout","mouseover"]),Lt("onPointerEnter",["pointerout","pointerover"]),Lt("onPointerLeave",["pointerout","pointerover"]),zt("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),zt("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),zt("onBeforeInput",["compositionend","keypress","textInput","paste"]),zt("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),zt("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),zt("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var $r="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Fb=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat($r));function Dh(e,n){n=(n&4)!==0;for(var t=0;t<e.length;t++){var i=e[t],o=i.event;i=i.listeners;e:{var c=void 0;if(n)for(var m=i.length-1;0<=m;m--){var z=i[m],D=z.instance,_=z.currentTarget;if(z=z.listener,D!==c&&o.isPropagationStopped())break e;c=z,o.currentTarget=_;try{c(o)}catch(B){Ul(B)}o.currentTarget=null,c=D}else for(m=0;m<i.length;m++){if(z=i[m],D=z.instance,_=z.currentTarget,z=z.listener,D!==c&&o.isPropagationStopped())break e;c=z,o.currentTarget=_;try{c(o)}catch(B){Ul(B)}o.currentTarget=null,c=D}}}}function Pe(e,n){var t=n[ke];t===void 0&&(t=n[ke]=new Set);var i=e+"__bubble";t.has(i)||(Th(n,e,2,!1),t.add(i))}function qc(e,n,t){var i=0;n&&(i|=4),Th(t,e,i,n)}var Ds="_reactListening"+Math.random().toString(36).slice(2);function Yc(e){if(!e[Ds]){e[Ds]=!0,Da.forEach(function(t){t!=="selectionchange"&&(Fb.has(t)||qc(t,!1,e),qc(t,!0,e))});var n=e.nodeType===9?e:e.ownerDocument;n===null||n[Ds]||(n[Ds]=!0,qc("selectionchange",!1,n))}}function Th(e,n,t,i){switch(em(n)){case 2:var o=T0;break;case 8:o=A0;break;default:o=ou}t=o.bind(null,n,t,e),o=void 0,!po||n!=="touchstart"&&n!=="touchmove"&&n!=="wheel"||(o=!0),i?o!==void 0?e.addEventListener(n,t,{capture:!0,passive:o}):e.addEventListener(n,t,!0):o!==void 0?e.addEventListener(n,t,{passive:o}):e.addEventListener(n,t,!1)}function Gc(e,n,t,i,o){var c=i;if((n&1)===0&&(n&2)===0&&i!==null)e:for(;;){if(i===null)return;var m=i.tag;if(m===3||m===4){var z=i.stateNode.containerInfo;if(z===o)break;if(m===4)for(m=i.return;m!==null;){var D=m.tag;if((D===3||D===4)&&m.stateNode.containerInfo===o)return;m=m.return}for(;z!==null;){if(m=lt(z),m===null)return;if(D=m.tag,D===5||D===6||D===26||D===27){i=c=m;continue e}z=z.parentNode}}i=i.return}kd(function(){var _=c,B=uo(t),Y=[];e:{var O=af.get(e);if(O!==void 0){var U=Ol,me=e;switch(e){case"keypress":if(Cl(t)===0)break e;case"keydown":case"keyup":U=Zy;break;case"focusin":me="focus",U=yo;break;case"focusout":me="blur",U=yo;break;case"beforeblur":case"afterblur":U=yo;break;case"click":if(t.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":U=_d;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":U=_y;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":U=Yy;break;case $d:case ef:case nf:U=Oy;break;case tf:U=Qy;break;case"scroll":case"scrollend":U=Iy;break;case"wheel":U=Fy;break;case"copy":case"cut":case"paste":U=Wy;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":U=Ld;break;case"toggle":case"beforetoggle":U=$y}var De=(n&4)!==0,ln=!De&&(e==="scroll"||e==="scrollend"),k=De?O!==null?O+"Capture":null:O;De=[];for(var w=_,M;w!==null;){var V=w;if(M=V.stateNode,V=V.tag,V!==5&&V!==26&&V!==27||M===null||k===null||(V=Sr(w,k),V!=null&&De.push(el(w,V,M))),ln)break;w=w.return}0<De.length&&(O=new U(O,me,null,t,B),Y.push({event:O,listeners:De}))}}if((n&7)===0){e:{if(O=e==="mouseover"||e==="pointerover",U=e==="mouseout"||e==="pointerout",O&&t!==co&&(me=t.relatedTarget||t.fromElement)&&(lt(me)||me[ge]))break e;if((U||O)&&(O=B.window===B?B:(O=B.ownerDocument)?O.defaultView||O.parentWindow:window,U?(me=t.relatedTarget||t.toElement,U=_,me=me?lt(me):null,me!==null&&(ln=d(me),De=me.tag,me!==ln||De!==5&&De!==27&&De!==6)&&(me=null)):(U=null,me=_),U!==me)){if(De=_d,V="onMouseLeave",k="onMouseEnter",w="mouse",(e==="pointerout"||e==="pointerover")&&(De=Ld,V="onPointerLeave",k="onPointerEnter",w="pointer"),ln=U==null?O:Zn(U),M=me==null?O:Zn(me),O=new De(V,w+"leave",U,t,B),O.target=ln,O.relatedTarget=M,V=null,lt(B)===_&&(De=new De(k,w+"enter",me,t,B),De.target=M,De.relatedTarget=ln,V=De),ln=V,U&&me)n:{for(De=Jb,k=U,w=me,M=0,V=k;V;V=De(V))M++;V=0;for(var xe=w;xe;xe=De(xe))V++;for(;0<M-V;)k=De(k),M--;for(;0<V-M;)w=De(w),V--;for(;M--;){if(k===w||w!==null&&k===w.alternate){De=k;break n}k=De(k),w=De(w)}De=null}else De=null;U!==null&&Ah(Y,O,U,De,!1),me!==null&&ln!==null&&Ah(Y,ln,me,De,!0)}}e:{if(O=_?Zn(_):window,U=O.nodeName&&O.nodeName.toLowerCase(),U==="select"||U==="input"&&O.type==="file")var qe=Xd;else if(jd(O))if(Hd)qe=cb;else{qe=sb;var ve=lb}else U=O.nodeName,!U||U.toLowerCase()!=="input"||O.type!=="checkbox"&&O.type!=="radio"?_&&oo(_.elementType)&&(qe=Xd):qe=ob;if(qe&&(qe=qe(e,_))){Bd(Y,qe,t,B);break e}ve&&ve(e,O,_),e==="focusout"&&_&&O.type==="number"&&_.memoizedProps.value!=null&&so(O,"number",O.value)}switch(ve=_?Zn(_):window,e){case"focusin":(jd(ve)||ve.contentEditable==="true")&&(Wi=ve,xo=_,kr=null);break;case"focusout":kr=xo=Wi=null;break;case"mousedown":Do=!0;break;case"contextmenu":case"mouseup":case"dragend":Do=!1,Fd(Y,t,B);break;case"selectionchange":if(db)break;case"keydown":case"keyup":Fd(Y,t,B)}var Le;if(zo)e:{switch(e){case"compositionstart":var Xe="onCompositionStart";break e;case"compositionend":Xe="onCompositionEnd";break e;case"compositionupdate":Xe="onCompositionUpdate";break e}Xe=void 0}else Ni?Ud(e,t)&&(Xe="onCompositionEnd"):e==="keydown"&&t.keyCode===229&&(Xe="onCompositionStart");Xe&&(Od&&t.locale!=="ko"&&(Ni||Xe!=="onCompositionStart"?Xe==="onCompositionEnd"&&Ni&&(Le=Id()):(Ta=B,ho="value"in Ta?Ta.value:Ta.textContent,Ni=!0)),ve=Ts(_,Xe),0<ve.length&&(Xe=new Cd(Xe,e,null,t,B),Y.push({event:Xe,listeners:ve}),Le?Xe.data=Le:(Le=Pd(t),Le!==null&&(Xe.data=Le)))),(Le=nb?tb(e,t):ab(e,t))&&(Xe=Ts(_,"onBeforeInput"),0<Xe.length&&(ve=new Cd("onBeforeInput","beforeinput",null,t,B),Y.push({event:ve,listeners:Xe}),ve.data=Le)),Gb(Y,e,_,t,B)}Dh(Y,n)})}function el(e,n,t){return{instance:e,listener:n,currentTarget:t}}function Ts(e,n){for(var t=n+"Capture",i=[];e!==null;){var o=e,c=o.stateNode;if(o=o.tag,o!==5&&o!==26&&o!==27||c===null||(o=Sr(e,t),o!=null&&i.unshift(el(e,o,c)),o=Sr(e,n),o!=null&&i.push(el(e,o,c))),e.tag===3)return i;e=e.return}return[]}function Jb(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function Ah(e,n,t,i,o){for(var c=n._reactName,m=[];t!==null&&t!==i;){var z=t,D=z.alternate,_=z.stateNode;if(z=z.tag,D!==null&&D===i)break;z!==5&&z!==26&&z!==27||_===null||(D=_,o?(_=Sr(t,c),_!=null&&m.unshift(el(t,_,D))):o||(_=Sr(t,c),_!=null&&m.push(el(t,_,D)))),t=t.return}m.length!==0&&e.push({event:n,listeners:m})}var $b=/\r\n?/g,e0=/\u0000|\uFFFD/g;function wh(e){return(typeof e=="string"?e:""+e).replace($b,`
`).replace(e0,"")}function Rh(e,n){return n=wh(n),wh(e)===n}function rn(e,n,t,i,o,c){switch(t){case"children":typeof i=="string"?n==="body"||n==="textarea"&&i===""||Ci(e,i):(typeof i=="number"||typeof i=="bigint")&&n!=="body"&&Ci(e,""+i);break;case"className":Ot(e,"class",i);break;case"tabIndex":Ot(e,"tabindex",i);break;case"dir":case"role":case"viewBox":case"width":case"height":Ot(e,t,i);break;case"style":wd(e,i,c);break;case"data":if(n!=="object"){Ot(e,"data",i);break}case"src":case"href":if(i===""&&(n!=="a"||t!=="href")){e.removeAttribute(t);break}if(i==null||typeof i=="function"||typeof i=="symbol"||typeof i=="boolean"){e.removeAttribute(t);break}i=Ml(""+i),e.setAttribute(t,i);break;case"action":case"formAction":if(typeof i=="function"){e.setAttribute(t,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof c=="function"&&(t==="formAction"?(n!=="input"&&rn(e,n,"name",o.name,o,null),rn(e,n,"formEncType",o.formEncType,o,null),rn(e,n,"formMethod",o.formMethod,o,null),rn(e,n,"formTarget",o.formTarget,o,null)):(rn(e,n,"encType",o.encType,o,null),rn(e,n,"method",o.method,o,null),rn(e,n,"target",o.target,o,null)));if(i==null||typeof i=="symbol"||typeof i=="boolean"){e.removeAttribute(t);break}i=Ml(""+i),e.setAttribute(t,i);break;case"onClick":i!=null&&(e.onclick=$t);break;case"onScroll":i!=null&&Pe("scroll",e);break;case"onScrollEnd":i!=null&&Pe("scrollend",e);break;case"dangerouslySetInnerHTML":if(i!=null){if(typeof i!="object"||!("__html"in i))throw Error(s(61));if(t=i.__html,t!=null){if(o.children!=null)throw Error(s(60));e.innerHTML=t}}break;case"multiple":e.multiple=i&&typeof i!="function"&&typeof i!="symbol";break;case"muted":e.muted=i&&typeof i!="function"&&typeof i!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(i==null||typeof i=="function"||typeof i=="boolean"||typeof i=="symbol"){e.removeAttribute("xlink:href");break}t=Ml(""+i),e.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",t);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":i!=null&&typeof i!="function"&&typeof i!="symbol"?e.setAttribute(t,""+i):e.removeAttribute(t);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":i&&typeof i!="function"&&typeof i!="symbol"?e.setAttribute(t,""):e.removeAttribute(t);break;case"capture":case"download":i===!0?e.setAttribute(t,""):i!==!1&&i!=null&&typeof i!="function"&&typeof i!="symbol"?e.setAttribute(t,i):e.removeAttribute(t);break;case"cols":case"rows":case"size":case"span":i!=null&&typeof i!="function"&&typeof i!="symbol"&&!isNaN(i)&&1<=i?e.setAttribute(t,i):e.removeAttribute(t);break;case"rowSpan":case"start":i==null||typeof i=="function"||typeof i=="symbol"||isNaN(i)?e.removeAttribute(t):e.setAttribute(t,i);break;case"popover":Pe("beforetoggle",e),Pe("toggle",e),fn(e,"popover",i);break;case"xlinkActuate":vt(e,"http://www.w3.org/1999/xlink","xlink:actuate",i);break;case"xlinkArcrole":vt(e,"http://www.w3.org/1999/xlink","xlink:arcrole",i);break;case"xlinkRole":vt(e,"http://www.w3.org/1999/xlink","xlink:role",i);break;case"xlinkShow":vt(e,"http://www.w3.org/1999/xlink","xlink:show",i);break;case"xlinkTitle":vt(e,"http://www.w3.org/1999/xlink","xlink:title",i);break;case"xlinkType":vt(e,"http://www.w3.org/1999/xlink","xlink:type",i);break;case"xmlBase":vt(e,"http://www.w3.org/XML/1998/namespace","xml:base",i);break;case"xmlLang":vt(e,"http://www.w3.org/XML/1998/namespace","xml:lang",i);break;case"xmlSpace":vt(e,"http://www.w3.org/XML/1998/namespace","xml:space",i);break;case"is":fn(e,"is",i);break;case"innerText":case"textContent":break;default:(!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(t=Ry.get(t)||t,fn(e,t,i))}}function Qc(e,n,t,i,o,c){switch(t){case"style":wd(e,i,c);break;case"dangerouslySetInnerHTML":if(i!=null){if(typeof i!="object"||!("__html"in i))throw Error(s(61));if(t=i.__html,t!=null){if(o.children!=null)throw Error(s(60));e.innerHTML=t}}break;case"children":typeof i=="string"?Ci(e,i):(typeof i=="number"||typeof i=="bigint")&&Ci(e,""+i);break;case"onScroll":i!=null&&Pe("scroll",e);break;case"onScrollEnd":i!=null&&Pe("scrollend",e);break;case"onClick":i!=null&&(e.onclick=$t);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!Bt.hasOwnProperty(t))e:{if(t[0]==="o"&&t[1]==="n"&&(o=t.endsWith("Capture"),n=t.slice(2,o?t.length-7:void 0),c=e[oe]||null,c=c!=null?c[t]:null,typeof c=="function"&&e.removeEventListener(n,c,o),typeof i=="function")){typeof c!="function"&&c!==null&&(t in e?e[t]=null:e.hasAttribute(t)&&e.removeAttribute(t)),e.addEventListener(n,i,o);break e}t in e?e[t]=i:i===!0?e.setAttribute(t,""):fn(e,t,i)}}}function Bn(e,n,t){switch(n){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":Pe("error",e),Pe("load",e);var i=!1,o=!1,c;for(c in t)if(t.hasOwnProperty(c)){var m=t[c];if(m!=null)switch(c){case"src":i=!0;break;case"srcSet":o=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(s(137,n));default:rn(e,n,c,m,t,null)}}o&&rn(e,n,"srcSet",t.srcSet,t,null),i&&rn(e,n,"src",t.src,t,null);return;case"input":Pe("invalid",e);var z=c=m=o=null,D=null,_=null;for(i in t)if(t.hasOwnProperty(i)){var B=t[i];if(B!=null)switch(i){case"name":o=B;break;case"type":m=B;break;case"checked":D=B;break;case"defaultChecked":_=B;break;case"value":c=B;break;case"defaultValue":z=B;break;case"children":case"dangerouslySetInnerHTML":if(B!=null)throw Error(s(137,n));break;default:rn(e,n,i,B,t,null)}}xd(e,c,z,D,_,m,o,!1);return;case"select":Pe("invalid",e),i=m=c=null;for(o in t)if(t.hasOwnProperty(o)&&(z=t[o],z!=null))switch(o){case"value":c=z;break;case"defaultValue":m=z;break;case"multiple":i=z;default:rn(e,n,o,z,t,null)}n=c,t=m,e.multiple=!!i,n!=null?_i(e,!!i,n,!1):t!=null&&_i(e,!!i,t,!0);return;case"textarea":Pe("invalid",e),c=o=i=null;for(m in t)if(t.hasOwnProperty(m)&&(z=t[m],z!=null))switch(m){case"value":i=z;break;case"defaultValue":o=z;break;case"children":c=z;break;case"dangerouslySetInnerHTML":if(z!=null)throw Error(s(91));break;default:rn(e,n,m,z,t,null)}Td(e,i,o,c);return;case"option":for(D in t)t.hasOwnProperty(D)&&(i=t[D],i!=null)&&(D==="selected"?e.selected=i&&typeof i!="function"&&typeof i!="symbol":rn(e,n,D,i,t,null));return;case"dialog":Pe("beforetoggle",e),Pe("toggle",e),Pe("cancel",e),Pe("close",e);break;case"iframe":case"object":Pe("load",e);break;case"video":case"audio":for(i=0;i<$r.length;i++)Pe($r[i],e);break;case"image":Pe("error",e),Pe("load",e);break;case"details":Pe("toggle",e);break;case"embed":case"source":case"link":Pe("error",e),Pe("load",e);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(_ in t)if(t.hasOwnProperty(_)&&(i=t[_],i!=null))switch(_){case"children":case"dangerouslySetInnerHTML":throw Error(s(137,n));default:rn(e,n,_,i,t,null)}return;default:if(oo(n)){for(B in t)t.hasOwnProperty(B)&&(i=t[B],i!==void 0&&Qc(e,n,B,i,t,void 0));return}}for(z in t)t.hasOwnProperty(z)&&(i=t[z],i!=null&&rn(e,n,z,i,t,null))}function n0(e,n,t,i){switch(n){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var o=null,c=null,m=null,z=null,D=null,_=null,B=null;for(U in t){var Y=t[U];if(t.hasOwnProperty(U)&&Y!=null)switch(U){case"checked":break;case"value":break;case"defaultValue":D=Y;default:i.hasOwnProperty(U)||rn(e,n,U,null,i,Y)}}for(var O in i){var U=i[O];if(Y=t[O],i.hasOwnProperty(O)&&(U!=null||Y!=null))switch(O){case"type":c=U;break;case"name":o=U;break;case"checked":_=U;break;case"defaultChecked":B=U;break;case"value":m=U;break;case"defaultValue":z=U;break;case"children":case"dangerouslySetInnerHTML":if(U!=null)throw Error(s(137,n));break;default:U!==Y&&rn(e,n,O,U,i,Y)}}lo(e,m,z,D,_,B,c,o);return;case"select":U=m=z=O=null;for(c in t)if(D=t[c],t.hasOwnProperty(c)&&D!=null)switch(c){case"value":break;case"multiple":U=D;default:i.hasOwnProperty(c)||rn(e,n,c,null,i,D)}for(o in i)if(c=i[o],D=t[o],i.hasOwnProperty(o)&&(c!=null||D!=null))switch(o){case"value":O=c;break;case"defaultValue":z=c;break;case"multiple":m=c;default:c!==D&&rn(e,n,o,c,i,D)}n=z,t=m,i=U,O!=null?_i(e,!!t,O,!1):!!i!=!!t&&(n!=null?_i(e,!!t,n,!0):_i(e,!!t,t?[]:"",!1));return;case"textarea":U=O=null;for(z in t)if(o=t[z],t.hasOwnProperty(z)&&o!=null&&!i.hasOwnProperty(z))switch(z){case"value":break;case"children":break;default:rn(e,n,z,null,i,o)}for(m in i)if(o=i[m],c=t[m],i.hasOwnProperty(m)&&(o!=null||c!=null))switch(m){case"value":O=o;break;case"defaultValue":U=o;break;case"children":break;case"dangerouslySetInnerHTML":if(o!=null)throw Error(s(91));break;default:o!==c&&rn(e,n,m,o,i,c)}Dd(e,O,U);return;case"option":for(var me in t)O=t[me],t.hasOwnProperty(me)&&O!=null&&!i.hasOwnProperty(me)&&(me==="selected"?e.selected=!1:rn(e,n,me,null,i,O));for(D in i)O=i[D],U=t[D],i.hasOwnProperty(D)&&O!==U&&(O!=null||U!=null)&&(D==="selected"?e.selected=O&&typeof O!="function"&&typeof O!="symbol":rn(e,n,D,O,i,U));return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var De in t)O=t[De],t.hasOwnProperty(De)&&O!=null&&!i.hasOwnProperty(De)&&rn(e,n,De,null,i,O);for(_ in i)if(O=i[_],U=t[_],i.hasOwnProperty(_)&&O!==U&&(O!=null||U!=null))switch(_){case"children":case"dangerouslySetInnerHTML":if(O!=null)throw Error(s(137,n));break;default:rn(e,n,_,O,i,U)}return;default:if(oo(n)){for(var ln in t)O=t[ln],t.hasOwnProperty(ln)&&O!==void 0&&!i.hasOwnProperty(ln)&&Qc(e,n,ln,void 0,i,O);for(B in i)O=i[B],U=t[B],!i.hasOwnProperty(B)||O===U||O===void 0&&U===void 0||Qc(e,n,B,O,i,U);return}}for(var k in t)O=t[k],t.hasOwnProperty(k)&&O!=null&&!i.hasOwnProperty(k)&&rn(e,n,k,null,i,O);for(Y in i)O=i[Y],U=t[Y],!i.hasOwnProperty(Y)||O===U||O==null&&U==null||rn(e,n,Y,O,i,U)}function kh(e){switch(e){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function t0(){if(typeof performance.getEntriesByType=="function"){for(var e=0,n=0,t=performance.getEntriesByType("resource"),i=0;i<t.length;i++){var o=t[i],c=o.transferSize,m=o.initiatorType,z=o.duration;if(c&&z&&kh(m)){for(m=0,z=o.responseEnd,i+=1;i<t.length;i++){var D=t[i],_=D.startTime;if(_>z)break;var B=D.transferSize,Y=D.initiatorType;B&&kh(Y)&&(D=D.responseEnd,m+=B*(D<z?1:(z-_)/(D-_)))}if(--i,n+=8*(c+m)/(o.duration/1e3),e++,10<e)break}}if(0<e)return n/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e=="number")?e:5}var Kc=null,Fc=null;function As(e){return e.nodeType===9?e:e.ownerDocument}function Ih(e){switch(e){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function Mh(e,n){if(e===0)switch(n){case"svg":return 1;case"math":return 2;default:return 0}return e===1&&n==="foreignObject"?0:e}function Jc(e,n){return e==="textarea"||e==="noscript"||typeof n.children=="string"||typeof n.children=="number"||typeof n.children=="bigint"||typeof n.dangerouslySetInnerHTML=="object"&&n.dangerouslySetInnerHTML!==null&&n.dangerouslySetInnerHTML.__html!=null}var $c=null;function a0(){var e=window.event;return e&&e.type==="popstate"?e===$c?!1:($c=e,!0):($c=null,!1)}var _h=typeof setTimeout=="function"?setTimeout:void 0,i0=typeof clearTimeout=="function"?clearTimeout:void 0,Ch=typeof Promise=="function"?Promise:void 0,r0=typeof queueMicrotask=="function"?queueMicrotask:typeof Ch<"u"?function(e){return Ch.resolve(null).then(e).catch(l0)}:_h;function l0(e){setTimeout(function(){throw e})}function Xa(e){return e==="head"}function Lh(e,n){var t=n,i=0;do{var o=t.nextSibling;if(e.removeChild(t),o&&o.nodeType===8)if(t=o.data,t==="/$"||t==="/&"){if(i===0){e.removeChild(o),ur(n);return}i--}else if(t==="$"||t==="$?"||t==="$~"||t==="$!"||t==="&")i++;else if(t==="html")nl(e.ownerDocument.documentElement);else if(t==="head"){t=e.ownerDocument.head,nl(t);for(var c=t.firstChild;c;){var m=c.nextSibling,z=c.nodeName;c[We]||z==="SCRIPT"||z==="STYLE"||z==="LINK"&&c.rel.toLowerCase()==="stylesheet"||t.removeChild(c),c=m}}else t==="body"&&nl(e.ownerDocument.body);t=o}while(t);ur(n)}function Oh(e,n){var t=e;e=0;do{var i=t.nextSibling;if(t.nodeType===1?n?(t._stashedDisplay=t.style.display,t.style.display="none"):(t.style.display=t._stashedDisplay||"",t.getAttribute("style")===""&&t.removeAttribute("style")):t.nodeType===3&&(n?(t._stashedText=t.nodeValue,t.nodeValue=""):t.nodeValue=t._stashedText||""),i&&i.nodeType===8)if(t=i.data,t==="/$"){if(e===0)break;e--}else t!=="$"&&t!=="$?"&&t!=="$~"&&t!=="$!"||e++;t=i}while(t)}function eu(e){var n=e.firstChild;for(n&&n.nodeType===10&&(n=n.nextSibling);n;){var t=n;switch(n=n.nextSibling,t.nodeName){case"HTML":case"HEAD":case"BODY":eu(t),on(t);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(t.rel.toLowerCase()==="stylesheet")continue}e.removeChild(t)}}function s0(e,n,t,i){for(;e.nodeType===1;){var o=t;if(e.nodeName.toLowerCase()!==n.toLowerCase()){if(!i&&(e.nodeName!=="INPUT"||e.type!=="hidden"))break}else if(i){if(!e[We])switch(n){case"meta":if(!e.hasAttribute("itemprop"))break;return e;case"link":if(c=e.getAttribute("rel"),c==="stylesheet"&&e.hasAttribute("data-precedence"))break;if(c!==o.rel||e.getAttribute("href")!==(o.href==null||o.href===""?null:o.href)||e.getAttribute("crossorigin")!==(o.crossOrigin==null?null:o.crossOrigin)||e.getAttribute("title")!==(o.title==null?null:o.title))break;return e;case"style":if(e.hasAttribute("data-precedence"))break;return e;case"script":if(c=e.getAttribute("src"),(c!==(o.src==null?null:o.src)||e.getAttribute("type")!==(o.type==null?null:o.type)||e.getAttribute("crossorigin")!==(o.crossOrigin==null?null:o.crossOrigin))&&c&&e.hasAttribute("async")&&!e.hasAttribute("itemprop"))break;return e;default:return e}}else if(n==="input"&&e.type==="hidden"){var c=o.name==null?null:""+o.name;if(o.type==="hidden"&&e.getAttribute("name")===c)return e}else return e;if(e=Rt(e.nextSibling),e===null)break}return null}function o0(e,n,t){if(n==="")return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!t||(e=Rt(e.nextSibling),e===null))return null;return e}function Nh(e,n){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!n||(e=Rt(e.nextSibling),e===null))return null;return e}function nu(e){return e.data==="$?"||e.data==="$~"}function tu(e){return e.data==="$!"||e.data==="$?"&&e.ownerDocument.readyState!=="loading"}function c0(e,n){var t=e.ownerDocument;if(e.data==="$~")e._reactRetry=n;else if(e.data!=="$?"||t.readyState!=="loading")n();else{var i=function(){n(),t.removeEventListener("DOMContentLoaded",i)};t.addEventListener("DOMContentLoaded",i),e._reactRetry=i}}function Rt(e){for(;e!=null;e=e.nextSibling){var n=e.nodeType;if(n===1||n===3)break;if(n===8){if(n=e.data,n==="$"||n==="$!"||n==="$?"||n==="$~"||n==="&"||n==="F!"||n==="F")break;if(n==="/$"||n==="/&")return null}}return e}var au=null;function Wh(e){e=e.nextSibling;for(var n=0;e;){if(e.nodeType===8){var t=e.data;if(t==="/$"||t==="/&"){if(n===0)return Rt(e.nextSibling);n--}else t!=="$"&&t!=="$!"&&t!=="$?"&&t!=="$~"&&t!=="&"||n++}e=e.nextSibling}return null}function Uh(e){e=e.previousSibling;for(var n=0;e;){if(e.nodeType===8){var t=e.data;if(t==="$"||t==="$!"||t==="$?"||t==="$~"||t==="&"){if(n===0)return e;n--}else t!=="/$"&&t!=="/&"||n++}e=e.previousSibling}return null}function Ph(e,n,t){switch(n=As(t),e){case"html":if(e=n.documentElement,!e)throw Error(s(452));return e;case"head":if(e=n.head,!e)throw Error(s(453));return e;case"body":if(e=n.body,!e)throw Error(s(454));return e;default:throw Error(s(451))}}function nl(e){for(var n=e.attributes;n.length;)e.removeAttributeNode(n[0]);on(e)}var kt=new Map,jh=new Set;function ws(e){return typeof e.getRootNode=="function"?e.getRootNode():e.nodeType===9?e:e.ownerDocument}var ma=K.d;K.d={f:u0,r:d0,D:f0,C:p0,L:h0,m:m0,X:y0,S:g0,M:b0};function u0(){var e=ma.f(),n=bs();return e||n}function d0(e){var n=bt(e);n!==null&&n.tag===5&&n.type==="form"?ap(n):ma.r(e)}var sr=typeof document>"u"?null:document;function Bh(e,n,t){var i=sr;if(i&&typeof n=="string"&&n){var o=St(n);o='link[rel="'+e+'"][href="'+o+'"]',typeof t=="string"&&(o+='[crossorigin="'+t+'"]'),jh.has(o)||(jh.add(o),e={rel:e,crossOrigin:t,href:n},i.querySelector(o)===null&&(n=i.createElement("link"),Bn(n,"link",e),vn(n),i.head.appendChild(n)))}}function f0(e){ma.D(e),Bh("dns-prefetch",e,null)}function p0(e,n){ma.C(e,n),Bh("preconnect",e,n)}function h0(e,n,t){ma.L(e,n,t);var i=sr;if(i&&e&&n){var o='link[rel="preload"][as="'+St(n)+'"]';n==="image"&&t&&t.imageSrcSet?(o+='[imagesrcset="'+St(t.imageSrcSet)+'"]',typeof t.imageSizes=="string"&&(o+='[imagesizes="'+St(t.imageSizes)+'"]')):o+='[href="'+St(e)+'"]';var c=o;switch(n){case"style":c=or(e);break;case"script":c=cr(e)}kt.has(c)||(e=b({rel:"preload",href:n==="image"&&t&&t.imageSrcSet?void 0:e,as:n},t),kt.set(c,e),i.querySelector(o)!==null||n==="style"&&i.querySelector(tl(c))||n==="script"&&i.querySelector(al(c))||(n=i.createElement("link"),Bn(n,"link",e),vn(n),i.head.appendChild(n)))}}function m0(e,n){ma.m(e,n);var t=sr;if(t&&e){var i=n&&typeof n.as=="string"?n.as:"script",o='link[rel="modulepreload"][as="'+St(i)+'"][href="'+St(e)+'"]',c=o;switch(i){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":c=cr(e)}if(!kt.has(c)&&(e=b({rel:"modulepreload",href:e},n),kt.set(c,e),t.querySelector(o)===null)){switch(i){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(t.querySelector(al(c)))return}i=t.createElement("link"),Bn(i,"link",e),vn(i),t.head.appendChild(i)}}}function g0(e,n,t){ma.S(e,n,t);var i=sr;if(i&&e){var o=Wn(i).hoistableStyles,c=or(e);n=n||"default";var m=o.get(c);if(!m){var z={loading:0,preload:null};if(m=i.querySelector(tl(c)))z.loading=5;else{e=b({rel:"stylesheet",href:e,"data-precedence":n},t),(t=kt.get(c))&&iu(e,t);var D=m=i.createElement("link");vn(D),Bn(D,"link",e),D._p=new Promise(function(_,B){D.onload=_,D.onerror=B}),D.addEventListener("load",function(){z.loading|=1}),D.addEventListener("error",function(){z.loading|=2}),z.loading|=4,Rs(m,n,i)}m={type:"stylesheet",instance:m,count:1,state:z},o.set(c,m)}}}function y0(e,n){ma.X(e,n);var t=sr;if(t&&e){var i=Wn(t).hoistableScripts,o=cr(e),c=i.get(o);c||(c=t.querySelector(al(o)),c||(e=b({src:e,async:!0},n),(n=kt.get(o))&&ru(e,n),c=t.createElement("script"),vn(c),Bn(c,"link",e),t.head.appendChild(c)),c={type:"script",instance:c,count:1,state:null},i.set(o,c))}}function b0(e,n){ma.M(e,n);var t=sr;if(t&&e){var i=Wn(t).hoistableScripts,o=cr(e),c=i.get(o);c||(c=t.querySelector(al(o)),c||(e=b({src:e,async:!0,type:"module"},n),(n=kt.get(o))&&ru(e,n),c=t.createElement("script"),vn(c),Bn(c,"link",e),t.head.appendChild(c)),c={type:"script",instance:c,count:1,state:null},i.set(o,c))}}function Xh(e,n,t,i){var o=(o=ye.current)?ws(o):null;if(!o)throw Error(s(446));switch(e){case"meta":case"title":return null;case"style":return typeof t.precedence=="string"&&typeof t.href=="string"?(n=or(t.href),t=Wn(o).hoistableStyles,i=t.get(n),i||(i={type:"style",instance:null,count:0,state:null},t.set(n,i)),i):{type:"void",instance:null,count:0,state:null};case"link":if(t.rel==="stylesheet"&&typeof t.href=="string"&&typeof t.precedence=="string"){e=or(t.href);var c=Wn(o).hoistableStyles,m=c.get(e);if(m||(o=o.ownerDocument||o,m={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},c.set(e,m),(c=o.querySelector(tl(e)))&&!c._p&&(m.instance=c,m.state.loading=5),kt.has(e)||(t={rel:"preload",as:"style",href:t.href,crossOrigin:t.crossOrigin,integrity:t.integrity,media:t.media,hrefLang:t.hrefLang,referrerPolicy:t.referrerPolicy},kt.set(e,t),c||z0(o,e,t,m.state))),n&&i===null)throw Error(s(528,""));return m}if(n&&i!==null)throw Error(s(529,""));return null;case"script":return n=t.async,t=t.src,typeof t=="string"&&n&&typeof n!="function"&&typeof n!="symbol"?(n=cr(t),t=Wn(o).hoistableScripts,i=t.get(n),i||(i={type:"script",instance:null,count:0,state:null},t.set(n,i)),i):{type:"void",instance:null,count:0,state:null};default:throw Error(s(444,e))}}function or(e){return'href="'+St(e)+'"'}function tl(e){return'link[rel="stylesheet"]['+e+"]"}function Hh(e){return b({},e,{"data-precedence":e.precedence,precedence:null})}function z0(e,n,t,i){e.querySelector('link[rel="preload"][as="style"]['+n+"]")?i.loading=1:(n=e.createElement("link"),i.preload=n,n.addEventListener("load",function(){return i.loading|=1}),n.addEventListener("error",function(){return i.loading|=2}),Bn(n,"link",t),vn(n),e.head.appendChild(n))}function cr(e){return'[src="'+St(e)+'"]'}function al(e){return"script[async]"+e}function Zh(e,n,t){if(n.count++,n.instance===null)switch(n.type){case"style":var i=e.querySelector('style[data-href~="'+St(t.href)+'"]');if(i)return n.instance=i,vn(i),i;var o=b({},t,{"data-href":t.href,"data-precedence":t.precedence,href:null,precedence:null});return i=(e.ownerDocument||e).createElement("style"),vn(i),Bn(i,"style",o),Rs(i,t.precedence,e),n.instance=i;case"stylesheet":o=or(t.href);var c=e.querySelector(tl(o));if(c)return n.state.loading|=4,n.instance=c,vn(c),c;i=Hh(t),(o=kt.get(o))&&iu(i,o),c=(e.ownerDocument||e).createElement("link"),vn(c);var m=c;return m._p=new Promise(function(z,D){m.onload=z,m.onerror=D}),Bn(c,"link",i),n.state.loading|=4,Rs(c,t.precedence,e),n.instance=c;case"script":return c=cr(t.src),(o=e.querySelector(al(c)))?(n.instance=o,vn(o),o):(i=t,(o=kt.get(c))&&(i=b({},t),ru(i,o)),e=e.ownerDocument||e,o=e.createElement("script"),vn(o),Bn(o,"link",i),e.head.appendChild(o),n.instance=o);case"void":return null;default:throw Error(s(443,n.type))}else n.type==="stylesheet"&&(n.state.loading&4)===0&&(i=n.instance,n.state.loading|=4,Rs(i,t.precedence,e));return n.instance}function Rs(e,n,t){for(var i=t.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),o=i.length?i[i.length-1]:null,c=o,m=0;m<i.length;m++){var z=i[m];if(z.dataset.precedence===n)c=z;else if(c!==o)break}c?c.parentNode.insertBefore(e,c.nextSibling):(n=t.nodeType===9?t.head:t,n.insertBefore(e,n.firstChild))}function iu(e,n){e.crossOrigin==null&&(e.crossOrigin=n.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=n.referrerPolicy),e.title==null&&(e.title=n.title)}function ru(e,n){e.crossOrigin==null&&(e.crossOrigin=n.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=n.referrerPolicy),e.integrity==null&&(e.integrity=n.integrity)}var ks=null;function Vh(e,n,t){if(ks===null){var i=new Map,o=ks=new Map;o.set(t,i)}else o=ks,i=o.get(t),i||(i=new Map,o.set(t,i));if(i.has(e))return i;for(i.set(e,null),t=t.getElementsByTagName(e),o=0;o<t.length;o++){var c=t[o];if(!(c[We]||c[ce]||e==="link"&&c.getAttribute("rel")==="stylesheet")&&c.namespaceURI!=="http://www.w3.org/2000/svg"){var m=c.getAttribute(n)||"";m=e+m;var z=i.get(m);z?z.push(c):i.set(m,[c])}}return i}function qh(e,n,t){e=e.ownerDocument||e,e.head.insertBefore(t,n==="title"?e.querySelector("head > title"):null)}function v0(e,n,t){if(t===1||n.itemProp!=null)return!1;switch(e){case"meta":case"title":return!0;case"style":if(typeof n.precedence!="string"||typeof n.href!="string"||n.href==="")break;return!0;case"link":if(typeof n.rel!="string"||typeof n.href!="string"||n.href===""||n.onLoad||n.onError)break;return n.rel==="stylesheet"?(e=n.disabled,typeof n.precedence=="string"&&e==null):!0;case"script":if(n.async&&typeof n.async!="function"&&typeof n.async!="symbol"&&!n.onLoad&&!n.onError&&n.src&&typeof n.src=="string")return!0}return!1}function Yh(e){return!(e.type==="stylesheet"&&(e.state.loading&3)===0)}function S0(e,n,t,i){if(t.type==="stylesheet"&&(typeof i.media!="string"||matchMedia(i.media).matches!==!1)&&(t.state.loading&4)===0){if(t.instance===null){var o=or(i.href),c=n.querySelector(tl(o));if(c){n=c._p,n!==null&&typeof n=="object"&&typeof n.then=="function"&&(e.count++,e=Is.bind(e),n.then(e,e)),t.state.loading|=4,t.instance=c,vn(c);return}c=n.ownerDocument||n,i=Hh(i),(o=kt.get(o))&&iu(i,o),c=c.createElement("link"),vn(c);var m=c;m._p=new Promise(function(z,D){m.onload=z,m.onerror=D}),Bn(c,"link",i),t.instance=c}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(t,n),(n=t.state.preload)&&(t.state.loading&3)===0&&(e.count++,t=Is.bind(e),n.addEventListener("load",t),n.addEventListener("error",t))}}var lu=0;function E0(e,n){return e.stylesheets&&e.count===0&&_s(e,e.stylesheets),0<e.count||0<e.imgCount?function(t){var i=setTimeout(function(){if(e.stylesheets&&_s(e,e.stylesheets),e.unsuspend){var c=e.unsuspend;e.unsuspend=null,c()}},6e4+n);0<e.imgBytes&&lu===0&&(lu=62500*t0());var o=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&_s(e,e.stylesheets),e.unsuspend)){var c=e.unsuspend;e.unsuspend=null,c()}},(e.imgBytes>lu?50:800)+n);return e.unsuspend=t,function(){e.unsuspend=null,clearTimeout(i),clearTimeout(o)}}:null}function Is(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)_s(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}}var Ms=null;function _s(e,n){e.stylesheets=null,e.unsuspend!==null&&(e.count++,Ms=new Map,n.forEach(x0,e),Ms=null,Is.call(e))}function x0(e,n){if(!(n.state.loading&4)){var t=Ms.get(e);if(t)var i=t.get(null);else{t=new Map,Ms.set(e,t);for(var o=e.querySelectorAll("link[data-precedence],style[data-precedence]"),c=0;c<o.length;c++){var m=o[c];(m.nodeName==="LINK"||m.getAttribute("media")!=="not all")&&(t.set(m.dataset.precedence,m),i=m)}i&&t.set(null,i)}o=n.instance,m=o.getAttribute("data-precedence"),c=t.get(m)||i,c===i&&t.set(null,o),t.set(m,o),this.count++,i=Is.bind(this),o.addEventListener("load",i),o.addEventListener("error",i),c?c.parentNode.insertBefore(o,c.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(o,e.firstChild)),n.state.loading|=4}}var il={$$typeof:q,Provider:null,Consumer:null,_currentValue:le,_currentValue2:le,_threadCount:0};function D0(e,n,t,i,o,c,m,z,D){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=xa(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=xa(0),this.hiddenUpdates=xa(null),this.identifierPrefix=i,this.onUncaughtError=o,this.onCaughtError=c,this.onRecoverableError=m,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=D,this.incompleteTransitions=new Map}function Gh(e,n,t,i,o,c,m,z,D,_,B,Y){return e=new D0(e,n,t,m,D,_,B,Y,z),n=1,c===!0&&(n|=24),c=ot(3,null,null,n),e.current=c,c.stateNode=e,n=Po(),n.refCount++,e.pooledCache=n,n.refCount++,c.memoizedState={element:i,isDehydrated:t,cache:n},Ho(c),e}function Qh(e){return e?(e=ji,e):ji}function Kh(e,n,t,i,o,c){o=Qh(o),i.context===null?i.context=o:i.pendingContext=o,i=Ma(n),i.payload={element:t},c=c===void 0?null:c,c!==null&&(i.callback=c),t=_a(e,i,n),t!==null&&(nt(t,e,n),Nr(t,e,n))}function Fh(e,n){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var t=e.retryLane;e.retryLane=t!==0&&t<n?t:n}}function su(e,n){Fh(e,n),(e=e.alternate)&&Fh(e,n)}function Jh(e){if(e.tag===13||e.tag===31){var n=ui(e,67108864);n!==null&&nt(n,e,67108864),su(e,67108864)}}function $h(e){if(e.tag===13||e.tag===31){var n=pt();n=Q(n);var t=ui(e,n);t!==null&&nt(t,e,n),su(e,n)}}var Cs=!0;function T0(e,n,t,i){var o=C.T;C.T=null;var c=K.p;try{K.p=2,ou(e,n,t,i)}finally{K.p=c,C.T=o}}function A0(e,n,t,i){var o=C.T;C.T=null;var c=K.p;try{K.p=8,ou(e,n,t,i)}finally{K.p=c,C.T=o}}function ou(e,n,t,i){if(Cs){var o=cu(i);if(o===null)Gc(e,n,i,Ls,t),nm(e,i);else if(R0(o,e,n,t,i))i.stopPropagation();else if(nm(e,i),n&4&&-1<w0.indexOf(e)){for(;o!==null;){var c=bt(o);if(c!==null)switch(c.tag){case 3:if(c=c.stateNode,c.current.memoizedState.isDehydrated){var m=Ft(c.pendingLanes);if(m!==0){var z=c;for(z.pendingLanes|=2,z.entangledLanes|=2;m;){var D=1<<31-Fe(m);z.entanglements[1]|=D,m&=~D}Vt(c),(Ge&6)===0&&(gs=bn()+500,Jr(0))}}break;case 31:case 13:z=ui(c,2),z!==null&&nt(z,c,2),bs(),su(c,2)}if(c=cu(i),c===null&&Gc(e,n,i,Ls,t),c===o)break;o=c}o!==null&&i.stopPropagation()}else Gc(e,n,i,null,t)}}function cu(e){return e=uo(e),uu(e)}var Ls=null;function uu(e){if(Ls=null,e=lt(e),e!==null){var n=d(e);if(n===null)e=null;else{var t=n.tag;if(t===13){if(e=f(n),e!==null)return e;e=null}else if(t===31){if(e=p(n),e!==null)return e;e=null}else if(t===3){if(n.stateNode.current.memoizedState.isDehydrated)return n.tag===3?n.stateNode.containerInfo:null;e=null}else n!==e&&(e=null)}}return Ls=e,null}function em(e){switch(e){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(Kt()){case Z:return 2;case te:return 8;case Se:case we:return 32;case Ve:return 268435456;default:return 32}default:return 32}}var du=!1,Ha=null,Za=null,Va=null,rl=new Map,ll=new Map,qa=[],w0="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function nm(e,n){switch(e){case"focusin":case"focusout":Ha=null;break;case"dragenter":case"dragleave":Za=null;break;case"mouseover":case"mouseout":Va=null;break;case"pointerover":case"pointerout":rl.delete(n.pointerId);break;case"gotpointercapture":case"lostpointercapture":ll.delete(n.pointerId)}}function sl(e,n,t,i,o,c){return e===null||e.nativeEvent!==c?(e={blockedOn:n,domEventName:t,eventSystemFlags:i,nativeEvent:c,targetContainers:[o]},n!==null&&(n=bt(n),n!==null&&Jh(n)),e):(e.eventSystemFlags|=i,n=e.targetContainers,o!==null&&n.indexOf(o)===-1&&n.push(o),e)}function R0(e,n,t,i,o){switch(n){case"focusin":return Ha=sl(Ha,e,n,t,i,o),!0;case"dragenter":return Za=sl(Za,e,n,t,i,o),!0;case"mouseover":return Va=sl(Va,e,n,t,i,o),!0;case"pointerover":var c=o.pointerId;return rl.set(c,sl(rl.get(c)||null,e,n,t,i,o)),!0;case"gotpointercapture":return c=o.pointerId,ll.set(c,sl(ll.get(c)||null,e,n,t,i,o)),!0}return!1}function tm(e){var n=lt(e.target);if(n!==null){var t=d(n);if(t!==null){if(n=t.tag,n===13){if(n=f(t),n!==null){e.blockedOn=n,Te(e.priority,function(){$h(t)});return}}else if(n===31){if(n=p(t),n!==null){e.blockedOn=n,Te(e.priority,function(){$h(t)});return}}else if(n===3&&t.stateNode.current.memoizedState.isDehydrated){e.blockedOn=t.tag===3?t.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Os(e){if(e.blockedOn!==null)return!1;for(var n=e.targetContainers;0<n.length;){var t=cu(e.nativeEvent);if(t===null){t=e.nativeEvent;var i=new t.constructor(t.type,t);co=i,t.target.dispatchEvent(i),co=null}else return n=bt(t),n!==null&&Jh(n),e.blockedOn=t,!1;n.shift()}return!0}function am(e,n,t){Os(e)&&t.delete(n)}function k0(){du=!1,Ha!==null&&Os(Ha)&&(Ha=null),Za!==null&&Os(Za)&&(Za=null),Va!==null&&Os(Va)&&(Va=null),rl.forEach(am),ll.forEach(am)}function Ns(e,n){e.blockedOn===n&&(e.blockedOn=null,du||(du=!0,a.unstable_scheduleCallback(a.unstable_NormalPriority,k0)))}var Ws=null;function im(e){Ws!==e&&(Ws=e,a.unstable_scheduleCallback(a.unstable_NormalPriority,function(){Ws===e&&(Ws=null);for(var n=0;n<e.length;n+=3){var t=e[n],i=e[n+1],o=e[n+2];if(typeof i!="function"){if(uu(i||t)===null)continue;break}var c=bt(t);c!==null&&(e.splice(n,3),n-=3,cc(c,{pending:!0,data:o,method:t.method,action:i},i,o))}}))}function ur(e){function n(D){return Ns(D,e)}Ha!==null&&Ns(Ha,e),Za!==null&&Ns(Za,e),Va!==null&&Ns(Va,e),rl.forEach(n),ll.forEach(n);for(var t=0;t<qa.length;t++){var i=qa[t];i.blockedOn===e&&(i.blockedOn=null)}for(;0<qa.length&&(t=qa[0],t.blockedOn===null);)tm(t),t.blockedOn===null&&qa.shift();if(t=(e.ownerDocument||e).$$reactFormReplay,t!=null)for(i=0;i<t.length;i+=3){var o=t[i],c=t[i+1],m=o[oe]||null;if(typeof c=="function")m||im(t);else if(m){var z=null;if(c&&c.hasAttribute("formAction")){if(o=c,m=c[oe]||null)z=m.formAction;else if(uu(o)!==null)continue}else z=m.action;typeof z=="function"?t[i+1]=z:(t.splice(i,3),i-=3),im(t)}}}function rm(){function e(c){c.canIntercept&&c.info==="react-transition"&&c.intercept({handler:function(){return new Promise(function(m){return o=m})},focusReset:"manual",scroll:"manual"})}function n(){o!==null&&(o(),o=null),i||setTimeout(t,20)}function t(){if(!i&&!navigation.transition){var c=navigation.currentEntry;c&&c.url!=null&&navigation.navigate(c.url,{state:c.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var i=!1,o=null;return navigation.addEventListener("navigate",e),navigation.addEventListener("navigatesuccess",n),navigation.addEventListener("navigateerror",n),setTimeout(t,100),function(){i=!0,navigation.removeEventListener("navigate",e),navigation.removeEventListener("navigatesuccess",n),navigation.removeEventListener("navigateerror",n),o!==null&&(o(),o=null)}}}function fu(e){this._internalRoot=e}Us.prototype.render=fu.prototype.render=function(e){var n=this._internalRoot;if(n===null)throw Error(s(409));var t=n.current,i=pt();Kh(t,i,e,n,null,null)},Us.prototype.unmount=fu.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var n=e.containerInfo;Kh(e.current,2,null,e,null,null),bs(),n[ge]=null}};function Us(e){this._internalRoot=e}Us.prototype.unstable_scheduleHydration=function(e){if(e){var n=Ee();e={blockedOn:null,target:e,priority:n};for(var t=0;t<qa.length&&n!==0&&n<qa[t].priority;t++);qa.splice(t,0,e),t===0&&tm(e)}};var lm=r.version;if(lm!=="19.2.3")throw Error(s(527,lm,"19.2.3"));K.findDOMNode=function(e){var n=e._reactInternals;if(n===void 0)throw typeof e.render=="function"?Error(s(188)):(e=Object.keys(e).join(","),Error(s(268,e)));return e=h(n),e=e!==null?y(e):null,e=e===null?null:e.stateNode,e};var I0={bundleType:0,version:"19.2.3",rendererPackageName:"react-dom",currentDispatcherRef:C,reconcilerVersion:"19.2.3"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Ps=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Ps.isDisabled&&Ps.supportsFiber)try{mn=Ps.inject(I0),zn=Ps}catch{}}return cl.createRoot=function(e,n){if(!u(e))throw Error(s(299));var t=!1,i="",o=pp,c=hp,m=mp;return n!=null&&(n.unstable_strictMode===!0&&(t=!0),n.identifierPrefix!==void 0&&(i=n.identifierPrefix),n.onUncaughtError!==void 0&&(o=n.onUncaughtError),n.onCaughtError!==void 0&&(c=n.onCaughtError),n.onRecoverableError!==void 0&&(m=n.onRecoverableError)),n=Gh(e,1,!1,null,null,t,i,null,o,c,m,rm),e[ge]=n.current,Yc(e),new fu(n)},cl.hydrateRoot=function(e,n,t){if(!u(e))throw Error(s(299));var i=!1,o="",c=pp,m=hp,z=mp,D=null;return t!=null&&(t.unstable_strictMode===!0&&(i=!0),t.identifierPrefix!==void 0&&(o=t.identifierPrefix),t.onUncaughtError!==void 0&&(c=t.onUncaughtError),t.onCaughtError!==void 0&&(m=t.onCaughtError),t.onRecoverableError!==void 0&&(z=t.onRecoverableError),t.formState!==void 0&&(D=t.formState)),n=Gh(e,1,!0,n,t??null,i,o,D,c,m,z,rm),n.context=Qh(null),t=n.current,i=pt(),i=Q(i),o=Ma(i),o.callback=null,_a(t,o,i),t=i,n.current.lanes=t,ri(n,t),Vt(n),e[ge]=n.current,Yc(e),new Us(n)},cl.version="19.2.3",cl}var gm;function j0(){if(gm)return mu.exports;gm=1;function a(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(a)}catch(r){console.error(r)}}return a(),mu.exports=P0(),mu.exports}var B0=j0(),Ag=Tg();const X0=$s(Ag),H0=xg({__proto__:null,default:X0},[Ag]);function yn(){return yn=Object.assign?Object.assign.bind():function(a){for(var r=1;r<arguments.length;r++){var l=arguments[r];for(var s in l)Object.prototype.hasOwnProperty.call(l,s)&&(a[s]=l[s])}return a},yn.apply(this,arguments)}var Mn;(function(a){a.Pop="POP",a.Push="PUSH",a.Replace="REPLACE"})(Mn||(Mn={}));const ym="popstate";function Z0(a){a===void 0&&(a={});function r(s,u){let{pathname:d,search:f,hash:p}=s.location;return Sl("",{pathname:d,search:f,hash:p},u.state&&u.state.usr||null,u.state&&u.state.key||"default")}function l(s,u){return typeof u=="string"?u:wi(u)}return q0(r,l,null,a)}function Ne(a,r){if(a===!1||a===null||typeof a>"u")throw new Error(r)}function Ai(a,r){if(!a){typeof console<"u"&&console.warn(r);try{throw new Error(r)}catch{}}}function V0(){return Math.random().toString(36).substr(2,8)}function bm(a,r){return{usr:a.state,key:a.key,idx:r}}function Sl(a,r,l,s){return l===void 0&&(l=null),yn({pathname:typeof a=="string"?a:a.pathname,search:"",hash:""},typeof r=="string"?Fa(r):r,{state:l,key:r&&r.key||s||V0()})}function wi(a){let{pathname:r="/",search:l="",hash:s=""}=a;return l&&l!=="?"&&(r+=l.charAt(0)==="?"?l:"?"+l),s&&s!=="#"&&(r+=s.charAt(0)==="#"?s:"#"+s),r}function Fa(a){let r={};if(a){let l=a.indexOf("#");l>=0&&(r.hash=a.substr(l),a=a.substr(0,l));let s=a.indexOf("?");s>=0&&(r.search=a.substr(s),a=a.substr(0,s)),a&&(r.pathname=a)}return r}function q0(a,r,l,s){s===void 0&&(s={});let{window:u=document.defaultView,v5Compat:d=!1}=s,f=u.history,p=Mn.Pop,g=null,h=y();h==null&&(h=0,f.replaceState(yn({},f.state,{idx:h}),""));function y(){return(f.state||{idx:null}).idx}function b(){p=Mn.Pop;let H=y(),P=H==null?null:H-h;h=H,g&&g({action:p,location:N.location,delta:P})}function S(H,P){p=Mn.Push;let G=Sl(N.location,H,P);h=y()+1;let q=bm(G,h),de=N.createHref(G);try{f.pushState(q,"",de)}catch(ze){if(ze instanceof DOMException&&ze.name==="DataCloneError")throw ze;u.location.assign(de)}d&&g&&g({action:p,location:N.location,delta:1})}function v(H,P){p=Mn.Replace;let G=Sl(N.location,H,P);h=y();let q=bm(G,h),de=N.createHref(G);f.replaceState(q,"",de),d&&g&&g({action:p,location:N.location,delta:0})}function L(H){let P=u.location.origin!=="null"?u.location.origin:u.location.href,G=typeof H=="string"?H:wi(H);return G=G.replace(/ $/,"%20"),Ne(P,"No window.location.(origin|href) available to create URL for href: "+G),new URL(G,P)}let N={get action(){return p},get location(){return a(u,f)},listen(H){if(g)throw new Error("A history only accepts one active listener");return u.addEventListener(ym,b),g=H,()=>{u.removeEventListener(ym,b),g=null}},createHref(H){return r(u,H)},createURL:L,encodeLocation(H){let P=L(H);return{pathname:P.pathname,search:P.search,hash:P.hash}},push:S,replace:v,go(H){return f.go(H)}};return N}var tn;(function(a){a.data="data",a.deferred="deferred",a.redirect="redirect",a.error="error"})(tn||(tn={}));const Y0=new Set(["lazy","caseSensitive","path","id","index","children"]);function G0(a){return a.index===!0}function Ys(a,r,l,s){return l===void 0&&(l=[]),s===void 0&&(s={}),a.map((u,d)=>{let f=[...l,String(d)],p=typeof u.id=="string"?u.id:f.join("-");if(Ne(u.index!==!0||!u.children,"Cannot specify children on an index route"),Ne(!s[p],'Found a route id collision on id "'+p+`".  Route id's must be globally unique within Data Router usages`),G0(u)){let g=yn({},u,r(u),{id:p});return s[p]=g,g}else{let g=yn({},u,r(u),{id:p,children:void 0});return s[p]=g,u.children&&(g.children=Ys(u.children,r,f,s)),g}})}function xi(a,r,l){return l===void 0&&(l="/"),Zs(a,r,l,!1)}function Zs(a,r,l,s){let u=typeof r=="string"?Fa(r):r,d=ya(u.pathname||"/",l);if(d==null)return null;let f=wg(a);K0(f);let p=null;for(let g=0;p==null&&g<f.length;++g){let h=sz(d);p=rz(f[g],h,s)}return p}function Q0(a,r){let{route:l,pathname:s,params:u}=a;return{id:l.id,pathname:s,params:u,data:r[l.id],handle:l.handle}}function wg(a,r,l,s){r===void 0&&(r=[]),l===void 0&&(l=[]),s===void 0&&(s="");let u=(d,f,p)=>{let g={relativePath:p===void 0?d.path||"":p,caseSensitive:d.caseSensitive===!0,childrenIndex:f,route:d};g.relativePath.startsWith("/")&&(Ne(g.relativePath.startsWith(s),'Absolute route path "'+g.relativePath+'" nested under path '+('"'+s+'" is not valid. An absolute child route path ')+"must start with the combined path of all its parent routes."),g.relativePath=g.relativePath.slice(s.length));let h=ga([s,g.relativePath]),y=l.concat(g);d.children&&d.children.length>0&&(Ne(d.index!==!0,"Index routes must not have child routes. Please remove "+('all child routes from route path "'+h+'".')),wg(d.children,r,y,h)),!(d.path==null&&!d.index)&&r.push({path:h,score:az(h,d.index),routesMeta:y})};return a.forEach((d,f)=>{var p;if(d.path===""||!((p=d.path)!=null&&p.includes("?")))u(d,f);else for(let g of Rg(d.path))u(d,f,g)}),r}function Rg(a){let r=a.split("/");if(r.length===0)return[];let[l,...s]=r,u=l.endsWith("?"),d=l.replace(/\?$/,"");if(s.length===0)return u?[d,""]:[d];let f=Rg(s.join("/")),p=[];return p.push(...f.map(g=>g===""?d:[d,g].join("/"))),u&&p.push(...f),p.map(g=>a.startsWith("/")&&g===""?"/":g)}function K0(a){a.sort((r,l)=>r.score!==l.score?l.score-r.score:iz(r.routesMeta.map(s=>s.childrenIndex),l.routesMeta.map(s=>s.childrenIndex)))}const F0=/^:[\w-]+$/,J0=3,$0=2,ez=1,nz=10,tz=-2,zm=a=>a==="*";function az(a,r){let l=a.split("/"),s=l.length;return l.some(zm)&&(s+=tz),r&&(s+=$0),l.filter(u=>!zm(u)).reduce((u,d)=>u+(F0.test(d)?J0:d===""?ez:nz),s)}function iz(a,r){return a.length===r.length&&a.slice(0,-1).every((s,u)=>s===r[u])?a[a.length-1]-r[r.length-1]:0}function rz(a,r,l){l===void 0&&(l=!1);let{routesMeta:s}=a,u={},d="/",f=[];for(let p=0;p<s.length;++p){let g=s[p],h=p===s.length-1,y=d==="/"?r:r.slice(d.length)||"/",b=Gs({path:g.relativePath,caseSensitive:g.caseSensitive,end:h},y),S=g.route;if(!b&&h&&l&&!s[s.length-1].route.index&&(b=Gs({path:g.relativePath,caseSensitive:g.caseSensitive,end:!1},y)),!b)return null;Object.assign(u,b.params),f.push({params:u,pathname:ga([d,b.pathname]),pathnameBase:dz(ga([d,b.pathnameBase])),route:S}),b.pathnameBase!=="/"&&(d=ga([d,b.pathnameBase]))}return f}function Gs(a,r){typeof a=="string"&&(a={path:a,caseSensitive:!1,end:!0});let[l,s]=lz(a.path,a.caseSensitive,a.end),u=r.match(l);if(!u)return null;let d=u[0],f=d.replace(/(.)\/+$/,"$1"),p=u.slice(1);return{params:s.reduce((h,y,b)=>{let{paramName:S,isOptional:v}=y;if(S==="*"){let N=p[b]||"";f=d.slice(0,d.length-N.length).replace(/(.)\/+$/,"$1")}const L=p[b];return v&&!L?h[S]=void 0:h[S]=(L||"").replace(/%2F/g,"/"),h},{}),pathname:d,pathnameBase:f,pattern:a}}function lz(a,r,l){r===void 0&&(r=!1),l===void 0&&(l=!0),Ai(a==="*"||!a.endsWith("*")||a.endsWith("/*"),'Route path "'+a+'" will be treated as if it were '+('"'+a.replace(/\*$/,"/*")+'" because the `*` character must ')+"always follow a `/` in the pattern. To get rid of this warning, "+('please change the route path to "'+a.replace(/\*$/,"/*")+'".'));let s=[],u="^"+a.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(f,p,g)=>(s.push({paramName:p,isOptional:g!=null}),g?"/?([^\\/]+)?":"/([^\\/]+)"));return a.endsWith("*")?(s.push({paramName:"*"}),u+=a==="*"||a==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):l?u+="\\/*$":a!==""&&a!=="/"&&(u+="(?:(?=\\/|$))"),[new RegExp(u,r?void 0:"i"),s]}function sz(a){try{return a.split("/").map(r=>decodeURIComponent(r).replace(/\//g,"%2F")).join("/")}catch(r){return Ai(!1,'The URL path "'+a+'" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent '+("encoding ("+r+").")),a}}function ya(a,r){if(r==="/")return a;if(!a.toLowerCase().startsWith(r.toLowerCase()))return null;let l=r.endsWith("/")?r.length-1:r.length,s=a.charAt(l);return s&&s!=="/"?null:a.slice(l)||"/"}const oz=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,cz=a=>oz.test(a);function uz(a,r){r===void 0&&(r="/");let{pathname:l,search:s="",hash:u=""}=typeof a=="string"?Fa(a):a,d;if(l)if(cz(l))d=l;else{if(l.includes("//")){let f=l;l=l.replace(/\/\/+/g,"/"),Ai(!1,"Pathnames cannot have embedded double slashes - normalizing "+(f+" -> "+l))}l.startsWith("/")?d=vm(l.substring(1),"/"):d=vm(l,r)}else d=r;return{pathname:d,search:fz(s),hash:pz(u)}}function vm(a,r){let l=r.replace(/\/+$/,"").split("/");return a.split("/").forEach(u=>{u===".."?l.length>1&&l.pop():u!=="."&&l.push(u)}),l.length>1?l.join("/"):"/"}function zu(a,r,l,s){return"Cannot include a '"+a+"' character in a manually specified "+("`to."+r+"` field ["+JSON.stringify(s)+"].  Please separate it out to the ")+("`to."+l+"` field. Alternatively you may provide the full path as ")+'a string in <Link to="..."> and the router will parse it for you.'}function kg(a){return a.filter((r,l)=>l===0||r.route.path&&r.route.path.length>0)}function ed(a,r){let l=kg(a);return r?l.map((s,u)=>u===l.length-1?s.pathname:s.pathnameBase):l.map(s=>s.pathnameBase)}function nd(a,r,l,s){s===void 0&&(s=!1);let u;typeof a=="string"?u=Fa(a):(u=yn({},a),Ne(!u.pathname||!u.pathname.includes("?"),zu("?","pathname","search",u)),Ne(!u.pathname||!u.pathname.includes("#"),zu("#","pathname","hash",u)),Ne(!u.search||!u.search.includes("#"),zu("#","search","hash",u)));let d=a===""||u.pathname==="",f=d?"/":u.pathname,p;if(f==null)p=l;else{let b=r.length-1;if(!s&&f.startsWith("..")){let S=f.split("/");for(;S[0]==="..";)S.shift(),b-=1;u.pathname=S.join("/")}p=b>=0?r[b]:"/"}let g=uz(u,p),h=f&&f!=="/"&&f.endsWith("/"),y=(d||f===".")&&l.endsWith("/");return!g.pathname.endsWith("/")&&(h||y)&&(g.pathname+="/"),g}const ga=a=>a.join("/").replace(/\/\/+/g,"/"),dz=a=>a.replace(/\/+$/,"").replace(/^\/*/,"/"),fz=a=>!a||a==="?"?"":a.startsWith("?")?a:"?"+a,pz=a=>!a||a==="#"?"":a.startsWith("#")?a:"#"+a;class Qs{constructor(r,l,s,u){u===void 0&&(u=!1),this.status=r,this.statusText=l||"",this.internal=u,s instanceof Error?(this.data=s.toString(),this.error=s):this.data=s}}function El(a){return a!=null&&typeof a.status=="number"&&typeof a.statusText=="string"&&typeof a.internal=="boolean"&&"data"in a}const Ig=["post","put","patch","delete"],hz=new Set(Ig),mz=["get",...Ig],gz=new Set(mz),yz=new Set([301,302,303,307,308]),bz=new Set([307,308]),vu={state:"idle",location:void 0,formMethod:void 0,formAction:void 0,formEncType:void 0,formData:void 0,json:void 0,text:void 0},zz={state:"idle",data:void 0,formMethod:void 0,formAction:void 0,formEncType:void 0,formData:void 0,json:void 0,text:void 0},ul={state:"unblocked",proceed:void 0,reset:void 0,location:void 0},td=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,vz=a=>({hasErrorBoundary:!!a.hasErrorBoundary}),Mg="remix-router-transitions";function Sz(a){const r=a.window?a.window:typeof window<"u"?window:void 0,l=typeof r<"u"&&typeof r.document<"u"&&typeof r.document.createElement<"u",s=!l;Ne(a.routes.length>0,"You must provide a non-empty routes array to createRouter");let u;if(a.mapRouteProperties)u=a.mapRouteProperties;else if(a.detectErrorBoundary){let A=a.detectErrorBoundary;u=I=>({hasErrorBoundary:A(I)})}else u=vz;let d={},f=Ys(a.routes,u,void 0,d),p,g=a.basename||"/",h=a.dataStrategy||Tz,y=a.patchRoutesOnNavigation,b=yn({v7_fetcherPersist:!1,v7_normalizeFormMethod:!1,v7_partialHydration:!1,v7_prependBasename:!1,v7_relativeSplatPath:!1,v7_skipActionErrorRevalidation:!1},a.future),S=null,v=new Set,L=null,N=null,H=null,P=a.hydrationData!=null,G=xi(f,a.history.location,g),q=!1,de=null;if(G==null&&!y){let A=at(404,{pathname:a.history.location.pathname}),{matches:I,route:W}=Mm(f);G=I,de={[W.id]:A}}G&&!a.hydrationData&&ii(G,f,a.history.location.pathname).active&&(G=null);let ze;if(G)if(G.some(A=>A.route.lazy))ze=!1;else if(!G.some(A=>A.route.loader))ze=!0;else if(b.v7_partialHydration){let A=a.hydrationData?a.hydrationData.loaderData:null,I=a.hydrationData?a.hydrationData.errors:null;if(I){let W=G.findIndex(Q=>I[Q.route.id]!==void 0);ze=G.slice(0,W+1).every(Q=>!Pu(Q.route,A,I))}else ze=G.every(W=>!Pu(W.route,A,I))}else ze=a.hydrationData!=null;else if(ze=!1,G=[],b.v7_partialHydration){let A=ii(null,f,a.history.location.pathname);A.active&&A.matches&&(q=!0,G=A.matches)}let X,R={historyAction:a.history.action,location:a.history.location,matches:G,initialized:ze,navigation:vu,restoreScrollPosition:a.hydrationData!=null?!1:null,preventScrollReset:!1,revalidation:"idle",loaderData:a.hydrationData&&a.hydrationData.loaderData||{},actionData:a.hydrationData&&a.hydrationData.actionData||null,errors:a.hydrationData&&a.hydrationData.errors||de,fetchers:new Map,blockers:new Map},ne=Mn.Pop,he=!1,ue,ae=!1,ee=new Map,Ae=null,fe=!1,J=!1,C=[],K=new Set,le=new Map,_e=0,x=-1,T=new Map,j=new Set,E=new Map,ie=new Map,be=new Set,ye=new Map,Ie=new Map,Je;function Ke(){if(S=a.history.listen(A=>{let{action:I,location:W,delta:Q}=A;if(Je){Je(),Je=void 0;return}Ai(Ie.size===0||Q!=null,"You are trying to use a blocker on a POP navigation to a location that was not created by @remix-run/router. This will fail silently in production. This can happen if you are navigating outside the router via `window.history.pushState`/`window.location.hash` instead of using router navigation APIs.  This can also happen if you are using createHashRouter and the user manually changes the URL.");let se=ni({currentLocation:R.location,nextLocation:W,historyAction:I});if(se&&Q!=null){let Ee=new Promise(Te=>{Je=Te});a.history.go(Q*-1),Mi(se,{state:"blocked",location:W,proceed(){Mi(se,{state:"proceeding",proceed:void 0,reset:void 0,location:W}),Ee.then(()=>a.history.go(Q))},reset(){let Te=new Map(R.blockers);Te.set(se,ul),xn({blockers:Te})}});return}return Yn(I,W)}),l){Pz(r,ee);let A=()=>jz(r,ee);r.addEventListener("pagehide",A),Ae=()=>r.removeEventListener("pagehide",A)}return R.initialized||Yn(Mn.Pop,R.location,{initialHydration:!0}),X}function qn(){S&&S(),Ae&&Ae(),v.clear(),ue&&ue.abort(),R.fetchers.forEach((A,I)=>Ln(I)),R.blockers.forEach((A,I)=>Gn(I))}function Mt(A){return v.add(A),()=>v.delete(A)}function xn(A,I){I===void 0&&(I={}),R=yn({},R,A);let W=[],Q=[];b.v7_fetcherPersist&&R.fetchers.forEach((se,Ee)=>{se.state==="idle"&&(be.has(Ee)?Q.push(Ee):W.push(Ee))}),be.forEach(se=>{!R.fetchers.has(se)&&!le.has(se)&&Q.push(se)}),[...v].forEach(se=>se(R,{deletedFetchers:Q,viewTransitionOpts:I.viewTransitionOpts,flushSync:I.flushSync===!0})),b.v7_fetcherPersist?(W.forEach(se=>R.fetchers.delete(se)),Q.forEach(se=>Ln(se))):Q.forEach(se=>be.delete(se))}function _t(A,I,W){var Q,se;let{flushSync:Ee}=W===void 0?{}:W,Te=R.actionData!=null&&R.navigation.formMethod!=null&&Pt(R.navigation.formMethod)&&R.navigation.state==="loading"&&((Q=A.state)==null?void 0:Q._isRedirect)!==!0,pe;I.actionData?Object.keys(I.actionData).length>0?pe=I.actionData:pe=null:Te?pe=R.actionData:pe=null;let ce=I.loaderData?km(R.loaderData,I.loaderData,I.matches||[],I.errors):R.loaderData,oe=R.blockers;oe.size>0&&(oe=new Map(oe),oe.forEach((je,_n)=>oe.set(_n,ul)));let ge=he===!0||R.navigation.formMethod!=null&&Pt(R.navigation.formMethod)&&((se=A.state)==null?void 0:se._isRedirect)!==!0;p&&(f=p,p=void 0),fe||ne===Mn.Pop||(ne===Mn.Push?a.history.push(A,A.state):ne===Mn.Replace&&a.history.replace(A,A.state));let ke;if(ne===Mn.Pop){let je=ee.get(R.location.pathname);je&&je.has(A.pathname)?ke={currentLocation:R.location,nextLocation:A}:ee.has(A.pathname)&&(ke={currentLocation:A,nextLocation:R.location})}else if(ae){let je=ee.get(R.location.pathname);je?je.add(A.pathname):(je=new Set([A.pathname]),ee.set(R.location.pathname,je)),ke={currentLocation:R.location,nextLocation:A}}xn(yn({},I,{actionData:pe,loaderData:ce,historyAction:ne,location:A,initialized:!0,navigation:vu,revalidation:"idle",restoreScrollPosition:kl(A,I.matches||R.matches),preventScrollReset:ge,blockers:oe}),{viewTransitionOpts:ke,flushSync:Ee===!0}),ne=Mn.Pop,he=!1,ae=!1,fe=!1,J=!1,C=[]}async function yt(A,I){if(typeof A=="number"){a.history.go(A);return}let W=Uu(R.location,R.matches,g,b.v7_prependBasename,A,b.v7_relativeSplatPath,I?.fromRouteId,I?.relative),{path:Q,submission:se,error:Ee}=Sm(b.v7_normalizeFormMethod,!1,W,I),Te=R.location,pe=Sl(R.location,Q,I&&I.state);pe=yn({},pe,a.history.encodeLocation(pe));let ce=I&&I.replace!=null?I.replace:void 0,oe=Mn.Push;ce===!0?oe=Mn.Replace:ce===!1||se!=null&&Pt(se.formMethod)&&se.formAction===R.location.pathname+R.location.search&&(oe=Mn.Replace);let ge=I&&"preventScrollReset"in I?I.preventScrollReset===!0:void 0,ke=(I&&I.flushSync)===!0,je=ni({currentLocation:Te,nextLocation:pe,historyAction:oe});if(je){Mi(je,{state:"blocked",location:pe,proceed(){Mi(je,{state:"proceeding",proceed:void 0,reset:void 0,location:pe}),yt(A,I)},reset(){let _n=new Map(R.blockers);_n.set(je,ul),xn({blockers:_n})}});return}return await Yn(oe,pe,{submission:se,pendingError:Ee,preventScrollReset:ge,replace:I&&I.replace,enableViewTransition:I&&I.viewTransition,flushSync:ke})}function za(){if(te(),xn({revalidation:"loading"}),R.navigation.state!=="submitting"){if(R.navigation.state==="idle"){Yn(R.historyAction,R.location,{startUninterruptedRevalidation:!0});return}Yn(ne||R.historyAction,R.navigation.location,{overrideNavigation:R.navigation,enableViewTransition:ae===!0})}}async function Yn(A,I,W){ue&&ue.abort(),ue=null,ne=A,fe=(W&&W.startUninterruptedRevalidation)===!0,ai(R.location,R.matches),he=(W&&W.preventScrollReset)===!0,ae=(W&&W.enableViewTransition)===!0;let Q=p||f,se=W&&W.overrideNavigation,Ee=W!=null&&W.initialHydration&&R.matches&&R.matches.length>0&&!q?R.matches:xi(Q,I,g),Te=(W&&W.flushSync)===!0;if(Ee&&R.initialized&&!J&&Mz(R.location,I)&&!(W&&W.submission&&Pt(W.submission.formMethod))){_t(I,{matches:Ee},{flushSync:Te});return}let pe=ii(Ee,Q,I.pathname);if(pe.active&&pe.matches&&(Ee=pe.matches),!Ee){let{error:$e,notFoundMatches:We,route:on}=Sa(I.pathname);_t(I,{matches:We,loaderData:{},errors:{[on.id]:$e}},{flushSync:Te});return}ue=new AbortController;let ce=dr(a.history,I,ue.signal,W&&W.submission),oe;if(W&&W.pendingError)oe=[Di(Ee).route.id,{type:tn.error,error:W.pendingError}];else if(W&&W.submission&&Pt(W.submission.formMethod)){let $e=await ki(ce,I,W.submission,Ee,pe.active,{replace:W.replace,flushSync:Te});if($e.shortCircuited)return;if($e.pendingActionResult){let[We,on]=$e.pendingActionResult;if(mt(on)&&El(on.error)&&on.error.status===404){ue=null,_t(I,{matches:$e.matches,loaderData:{},errors:{[We]:on.error}});return}}Ee=$e.matches||Ee,oe=$e.pendingActionResult,se=Su(I,W.submission),Te=!1,pe.active=!1,ce=dr(a.history,ce.url,ce.signal)}let{shortCircuited:ge,matches:ke,loaderData:je,errors:_n}=await Ii(ce,I,Ee,pe.active,se,W&&W.submission,W&&W.fetcherSubmission,W&&W.replace,W&&W.initialHydration===!0,Te,oe);ge||(ue=null,_t(I,yn({matches:ke||Ee},Im(oe),{loaderData:je,errors:_n})))}async function ki(A,I,W,Q,se,Ee){Ee===void 0&&(Ee={}),te();let Te=Wz(I,W);if(xn({navigation:Te},{flushSync:Ee.flushSync===!0}),se){let oe=await xa(Q,I.pathname,A.signal);if(oe.type==="aborted")return{shortCircuited:!0};if(oe.type==="error"){let ge=Di(oe.partialMatches).route.id;return{matches:oe.partialMatches,pendingActionResult:[ge,{type:tn.error,error:oe.error}]}}else if(oe.matches)Q=oe.matches;else{let{notFoundMatches:ge,error:ke,route:je}=Sa(I.pathname);return{matches:ge,pendingActionResult:[je.id,{type:tn.error,error:ke}]}}}let pe,ce=yl(Q,I);if(!ce.route.action&&!ce.route.lazy)pe={type:tn.error,error:at(405,{method:A.method,pathname:I.pathname,routeId:ce.route.id})};else if(pe=(await Kt("action",R,A,[ce],Q,null))[ce.route.id],A.signal.aborted)return{shortCircuited:!0};if(Ti(pe)){let oe;return Ee&&Ee.replace!=null?oe=Ee.replace:oe=Am(pe.response.headers.get("Location"),new URL(A.url),g,a.history)===R.location.pathname+R.location.search,await bn(A,pe,!0,{submission:W,replace:oe}),{shortCircuited:!0}}if(Ka(pe))throw at(400,{type:"defer-action"});if(mt(pe)){let oe=Di(Q,ce.route.id);return(Ee&&Ee.replace)!==!0&&(ne=Mn.Push),{matches:Q,pendingActionResult:[oe.route.id,pe]}}return{matches:Q,pendingActionResult:[ce.route.id,pe]}}async function Ii(A,I,W,Q,se,Ee,Te,pe,ce,oe,ge){let ke=se||Su(I,Ee),je=Ee||Te||Cm(ke),_n=!fe&&(!b.v7_partialHydration||!ce);if(Q){if(_n){let dn=Qt(ge);xn(yn({navigation:ke},dn!==void 0?{actionData:dn}:{}),{flushSync:oe})}let Ze=await xa(W,I.pathname,A.signal);if(Ze.type==="aborted")return{shortCircuited:!0};if(Ze.type==="error"){let dn=Di(Ze.partialMatches).route.id;return{matches:Ze.partialMatches,loaderData:{},errors:{[dn]:Ze.error}}}else if(Ze.matches)W=Ze.matches;else{let{error:dn,notFoundMatches:Jt,route:li}=Sa(I.pathname);return{matches:Jt,loaderData:{},errors:{[li.id]:dn}}}}let $e=p||f,[We,on]=xm(a.history,R,W,je,I,b.v7_partialHydration&&ce===!0,b.v7_skipActionErrorRevalidation,J,C,K,be,E,j,$e,g,ge);if(Ea(Ze=>!(W&&W.some(dn=>dn.route.id===Ze))||We&&We.some(dn=>dn.route.id===Ze)),x=++_e,We.length===0&&on.length===0){let Ze=Nn();return _t(I,yn({matches:W,loaderData:{},errors:ge&&mt(ge[1])?{[ge[0]]:ge[1].error}:null},Im(ge),Ze?{fetchers:new Map(R.fetchers)}:{}),{flushSync:oe}),{shortCircuited:!0}}if(_n){let Ze={};if(!Q){Ze.navigation=ke;let dn=Qt(ge);dn!==void 0&&(Ze.actionData=dn)}on.length>0&&(Ze.fetchers=va(on)),xn(Ze,{flushSync:oe})}on.forEach(Ze=>{mn(Ze.key),Ze.controller&&le.set(Ze.key,Ze.controller)});let lt=()=>on.forEach(Ze=>mn(Ze.key));ue&&ue.signal.addEventListener("abort",lt);let{loaderResults:bt,fetcherResults:Zn}=await Z(R,W,We,on,A);if(A.signal.aborted)return{shortCircuited:!0};ue&&ue.signal.removeEventListener("abort",lt),on.forEach(Ze=>le.delete(Ze.key));let Wn=js(bt);if(Wn)return await bn(A,Wn.result,!0,{replace:pe}),{shortCircuited:!0};if(Wn=js(Zn),Wn)return j.add(Wn.key),await bn(A,Wn.result,!0,{replace:pe}),{shortCircuited:!0};let{loaderData:vn,errors:Da}=Rm(R,W,bt,ge,on,Zn,ye);ye.forEach((Ze,dn)=>{Ze.subscribe(Jt=>{(Jt||Ze.done)&&ye.delete(dn)})}),b.v7_partialHydration&&ce&&R.errors&&(Da=yn({},R.errors,Da));let Bt=Nn(),zt=Fe(x),Lt=Bt||zt||on.length>0;return yn({matches:W,loaderData:vn,errors:Da},Lt?{fetchers:new Map(R.fetchers)}:{})}function Qt(A){if(A&&!mt(A[1]))return{[A[0]]:A[1].data};if(R.actionData)return Object.keys(R.actionData).length===0?null:R.actionData}function va(A){return A.forEach(I=>{let W=R.fetchers.get(I.key),Q=dl(void 0,W?W.data:void 0);R.fetchers.set(I.key,Q)}),new Map(R.fetchers)}function ei(A,I,W,Q){if(s)throw new Error("router.fetch() was called during the server render, but it shouldn't be. You are likely calling a useFetcher() method in the body of your component. Try moving it to a useEffect or a callback.");mn(A);let se=(Q&&Q.flushSync)===!0,Ee=p||f,Te=Uu(R.location,R.matches,g,b.v7_prependBasename,W,b.v7_relativeSplatPath,I,Q?.relative),pe=xi(Ee,Te,g),ce=ii(pe,Ee,Te);if(ce.active&&ce.matches&&(pe=ce.matches),!pe){we(A,I,at(404,{pathname:Te}),{flushSync:se});return}let{path:oe,submission:ge,error:ke}=Sm(b.v7_normalizeFormMethod,!0,Te,Q);if(ke){we(A,I,ke,{flushSync:se});return}let je=yl(pe,oe),_n=(Q&&Q.preventScrollReset)===!0;if(ge&&Pt(ge.formMethod)){zr(A,I,oe,je,pe,ce.active,se,_n,ge);return}E.set(A,{routeId:I,path:oe}),vr(A,I,oe,je,pe,ce.active,se,_n,ge)}async function zr(A,I,W,Q,se,Ee,Te,pe,ce){te(),E.delete(A);function oe(fn){if(!fn.route.action&&!fn.route.lazy){let Ot=at(405,{method:ce.formMethod,pathname:W,routeId:I});return we(A,I,Ot,{flushSync:Te}),!0}return!1}if(!Ee&&oe(Q))return;let ge=R.fetchers.get(A);Se(A,Uz(ce,ge),{flushSync:Te});let ke=new AbortController,je=dr(a.history,W,ke.signal,ce);if(Ee){let fn=await xa(se,new URL(je.url).pathname,je.signal,A);if(fn.type==="aborted")return;if(fn.type==="error"){we(A,I,fn.error,{flushSync:Te});return}else if(fn.matches){if(se=fn.matches,Q=yl(se,W),oe(Q))return}else{we(A,I,at(404,{pathname:W}),{flushSync:Te});return}}le.set(A,ke);let _n=_e,We=(await Kt("action",R,je,[Q],se,A))[Q.route.id];if(je.signal.aborted){le.get(A)===ke&&le.delete(A);return}if(b.v7_fetcherPersist&&be.has(A)){if(Ti(We)||mt(We)){Se(A,Qa(void 0));return}}else{if(Ti(We))if(le.delete(A),x>_n){Se(A,Qa(void 0));return}else return j.add(A),Se(A,dl(ce)),bn(je,We,!1,{fetcherSubmission:ce,preventScrollReset:pe});if(mt(We)){we(A,I,We.error);return}}if(Ka(We))throw at(400,{type:"defer-action"});let on=R.navigation.location||R.location,lt=dr(a.history,on,ke.signal),bt=p||f,Zn=R.navigation.state!=="idle"?xi(bt,R.navigation.location,g):R.matches;Ne(Zn,"Didn't find any matches after fetcher action");let Wn=++_e;T.set(A,Wn);let vn=dl(ce,We.data);R.fetchers.set(A,vn);let[Da,Bt]=xm(a.history,R,Zn,ce,on,!1,b.v7_skipActionErrorRevalidation,J,C,K,be,E,j,bt,g,[Q.route.id,We]);Bt.filter(fn=>fn.key!==A).forEach(fn=>{let Ot=fn.key,vt=R.fetchers.get(Ot),Qn=dl(void 0,vt?vt.data:void 0);R.fetchers.set(Ot,Qn),mn(Ot),fn.controller&&le.set(Ot,fn.controller)}),xn({fetchers:new Map(R.fetchers)});let zt=()=>Bt.forEach(fn=>mn(fn.key));ke.signal.addEventListener("abort",zt);let{loaderResults:Lt,fetcherResults:Ze}=await Z(R,Zn,Da,Bt,lt);if(ke.signal.aborted)return;ke.signal.removeEventListener("abort",zt),T.delete(A),le.delete(A),Bt.forEach(fn=>le.delete(fn.key));let dn=js(Lt);if(dn)return bn(lt,dn.result,!1,{preventScrollReset:pe});if(dn=js(Ze),dn)return j.add(dn.key),bn(lt,dn.result,!1,{preventScrollReset:pe});let{loaderData:Jt,errors:li}=Rm(R,Zn,Lt,void 0,Bt,Ze,ye);if(R.fetchers.has(A)){let fn=Qa(We.data);R.fetchers.set(A,fn)}Fe(Wn),R.navigation.state==="loading"&&Wn>x?(Ne(ne,"Expected pending action"),ue&&ue.abort(),_t(R.navigation.location,{matches:Zn,loaderData:Jt,errors:li,fetchers:new Map(R.fetchers)})):(xn({errors:li,loaderData:km(R.loaderData,Jt,Zn,li),fetchers:new Map(R.fetchers)}),J=!1)}async function vr(A,I,W,Q,se,Ee,Te,pe,ce){let oe=R.fetchers.get(A);Se(A,dl(ce,oe?oe.data:void 0),{flushSync:Te});let ge=new AbortController,ke=dr(a.history,W,ge.signal);if(Ee){let We=await xa(se,new URL(ke.url).pathname,ke.signal,A);if(We.type==="aborted")return;if(We.type==="error"){we(A,I,We.error,{flushSync:Te});return}else if(We.matches)se=We.matches,Q=yl(se,W);else{we(A,I,at(404,{pathname:W}),{flushSync:Te});return}}le.set(A,ge);let je=_e,$e=(await Kt("loader",R,ke,[Q],se,A))[Q.route.id];if(Ka($e)&&($e=await ad($e,ke.signal,!0)||$e),le.get(A)===ge&&le.delete(A),!ke.signal.aborted){if(be.has(A)){Se(A,Qa(void 0));return}if(Ti($e))if(x>je){Se(A,Qa(void 0));return}else{j.add(A),await bn(ke,$e,!1,{preventScrollReset:pe});return}if(mt($e)){we(A,I,$e.error);return}Ne(!Ka($e),"Unhandled fetcher deferred data"),Se(A,Qa($e.data))}}async function bn(A,I,W,Q){let{submission:se,fetcherSubmission:Ee,preventScrollReset:Te,replace:pe}=Q===void 0?{}:Q;I.response.headers.has("X-Remix-Revalidate")&&(J=!0);let ce=I.response.headers.get("Location");Ne(ce,"Expected a Location header on the redirect Response"),ce=Am(ce,new URL(A.url),g,a.history);let oe=Sl(R.location,ce,{_isRedirect:!0});if(l){let We=!1;if(I.response.headers.has("X-Remix-Reload-Document"))We=!0;else if(td.test(ce)){const on=a.history.createURL(ce);We=on.origin!==r.location.origin||ya(on.pathname,g)==null}if(We){pe?r.location.replace(ce):r.location.assign(ce);return}}ue=null;let ge=pe===!0||I.response.headers.has("X-Remix-Replace")?Mn.Replace:Mn.Push,{formMethod:ke,formAction:je,formEncType:_n}=R.navigation;!se&&!Ee&&ke&&je&&_n&&(se=Cm(R.navigation));let $e=se||Ee;if(bz.has(I.response.status)&&$e&&Pt($e.formMethod))await Yn(ge,oe,{submission:yn({},$e,{formAction:ce}),preventScrollReset:Te||he,enableViewTransition:W?ae:void 0});else{let We=Su(oe,se);await Yn(ge,oe,{overrideNavigation:We,fetcherSubmission:Ee,preventScrollReset:Te||he,enableViewTransition:W?ae:void 0})}}async function Kt(A,I,W,Q,se,Ee){let Te,pe={};try{Te=await Az(h,A,I,W,Q,se,Ee,d,u)}catch(ce){return Q.forEach(oe=>{pe[oe.route.id]={type:tn.error,error:ce}}),pe}for(let[ce,oe]of Object.entries(Te))if(_z(oe)){let ge=oe.result;pe[ce]={type:tn.redirect,response:kz(ge,W,ce,se,g,b.v7_relativeSplatPath)}}else pe[ce]=await Rz(oe);return pe}async function Z(A,I,W,Q,se){let Ee=A.matches,Te=Kt("loader",A,se,W,I,null),pe=Promise.all(Q.map(async ge=>{if(ge.matches&&ge.match&&ge.controller){let je=(await Kt("loader",A,dr(a.history,ge.path,ge.controller.signal),[ge.match],ge.matches,ge.key))[ge.match.route.id];return{[ge.key]:je}}else return Promise.resolve({[ge.key]:{type:tn.error,error:at(404,{pathname:ge.path})}})})),ce=await Te,oe=(await pe).reduce((ge,ke)=>Object.assign(ge,ke),{});return await Promise.all([Oz(I,ce,se.signal,Ee,A.loaderData),Nz(I,oe,Q)]),{loaderResults:ce,fetcherResults:oe}}function te(){J=!0,C.push(...Ea()),E.forEach((A,I)=>{le.has(I)&&K.add(I),mn(I)})}function Se(A,I,W){W===void 0&&(W={}),R.fetchers.set(A,I),xn({fetchers:new Map(R.fetchers)},{flushSync:(W&&W.flushSync)===!0})}function we(A,I,W,Q){Q===void 0&&(Q={});let se=Di(R.matches,I);Ln(A),xn({errors:{[se.route.id]:W},fetchers:new Map(R.fetchers)},{flushSync:(Q&&Q.flushSync)===!0})}function Ve(A){return ie.set(A,(ie.get(A)||0)+1),be.has(A)&&be.delete(A),R.fetchers.get(A)||zz}function Ln(A){let I=R.fetchers.get(A);le.has(A)&&!(I&&I.state==="loading"&&T.has(A))&&mn(A),E.delete(A),T.delete(A),j.delete(A),b.v7_fetcherPersist&&be.delete(A),K.delete(A),R.fetchers.delete(A)}function Ct(A){let I=(ie.get(A)||0)-1;I<=0?(ie.delete(A),be.add(A),b.v7_fetcherPersist||Ln(A)):ie.set(A,I),xn({fetchers:new Map(R.fetchers)})}function mn(A){let I=le.get(A);I&&(I.abort(),le.delete(A))}function zn(A){for(let I of A){let W=Ve(I),Q=Qa(W.data);R.fetchers.set(I,Q)}}function Nn(){let A=[],I=!1;for(let W of j){let Q=R.fetchers.get(W);Ne(Q,"Expected fetcher: "+W),Q.state==="loading"&&(j.delete(W),A.push(W),I=!0)}return zn(A),I}function Fe(A){let I=[];for(let[W,Q]of T)if(Q<A){let se=R.fetchers.get(W);Ne(se,"Expected fetcher: "+W),se.state==="loading"&&(mn(W),T.delete(W),I.push(W))}return zn(I),I.length>0}function jt(A,I){let W=R.blockers.get(A)||ul;return Ie.get(A)!==I&&Ie.set(A,I),W}function Gn(A){R.blockers.delete(A),Ie.delete(A)}function Mi(A,I){let W=R.blockers.get(A)||ul;Ne(W.state==="unblocked"&&I.state==="blocked"||W.state==="blocked"&&I.state==="blocked"||W.state==="blocked"&&I.state==="proceeding"||W.state==="blocked"&&I.state==="unblocked"||W.state==="proceeding"&&I.state==="unblocked","Invalid blocker state transition: "+W.state+" -> "+I.state);let Q=new Map(R.blockers);Q.set(A,I),xn({blockers:Q})}function ni(A){let{currentLocation:I,nextLocation:W,historyAction:Q}=A;if(Ie.size===0)return;Ie.size>1&&Ai(!1,"A router only supports one blocker at a time");let se=Array.from(Ie.entries()),[Ee,Te]=se[se.length-1],pe=R.blockers.get(Ee);if(!(pe&&pe.state==="proceeding")&&Te({currentLocation:I,nextLocation:W,historyAction:Q}))return Ee}function Sa(A){let I=at(404,{pathname:A}),W=p||f,{matches:Q,route:se}=Mm(W);return Ea(),{notFoundMatches:Q,route:se,error:I}}function Ea(A){let I=[];return ye.forEach((W,Q)=>{(!A||A(Q))&&(W.cancel(),I.push(Q),ye.delete(Q))}),I}function Ft(A,I,W){if(L=A,H=I,N=W||null,!P&&R.navigation===vu){P=!0;let Q=kl(R.location,R.matches);Q!=null&&xn({restoreScrollPosition:Q})}return()=>{L=null,H=null,N=null}}function ti(A,I){return N&&N(A,I.map(Q=>Q0(Q,R.loaderData)))||A.key}function ai(A,I){if(L&&H){let W=ti(A,I);L[W]=H()}}function kl(A,I){if(L){let W=ti(A,I),Q=L[W];if(typeof Q=="number")return Q}return null}function ii(A,I,W){if(y)if(A){if(Object.keys(A[0].params).length>0)return{active:!0,matches:Zs(I,W,g,!0)}}else return{active:!0,matches:Zs(I,W,g,!0)||[]};return{active:!1,matches:null}}async function xa(A,I,W,Q){if(!y)return{type:"success",matches:A};let se=A;for(;;){let Ee=p==null,Te=p||f,pe=d;try{await y({signal:W,path:I,matches:se,fetcherKey:Q,patch:(ge,ke)=>{W.aborted||Tm(ge,ke,Te,pe,u)}})}catch(ge){return{type:"error",error:ge,partialMatches:se}}finally{Ee&&!W.aborted&&(f=[...f])}if(W.aborted)return{type:"aborted"};let ce=xi(Te,I,g);if(ce)return{type:"success",matches:ce};let oe=Zs(Te,I,g,!0);if(!oe||se.length===oe.length&&se.every((ge,ke)=>ge.route.id===oe[ke].route.id))return{type:"success",matches:null};se=oe}}function ri(A){d={},p=Ys(A,u,void 0,d)}function io(A,I){let W=p==null;Tm(A,I,p||f,d,u),W&&(f=[...f],xn({}))}return X={get basename(){return g},get future(){return b},get state(){return R},get routes(){return f},get window(){return r},initialize:Ke,subscribe:Mt,enableScrollRestoration:Ft,navigate:yt,fetch:ei,revalidate:za,createHref:A=>a.history.createHref(A),encodeLocation:A=>a.history.encodeLocation(A),getFetcher:Ve,deleteFetcher:Ct,dispose:qn,getBlocker:jt,deleteBlocker:Gn,patchRoutes:io,_internalFetchControllers:le,_internalActiveDeferreds:ye,_internalSetRoutes:ri},X}function Ez(a){return a!=null&&("formData"in a&&a.formData!=null||"body"in a&&a.body!==void 0)}function Uu(a,r,l,s,u,d,f,p){let g,h;if(f){g=[];for(let b of r)if(g.push(b),b.route.id===f){h=b;break}}else g=r,h=r[r.length-1];let y=nd(u||".",ed(g,d),ya(a.pathname,l)||a.pathname,p==="path");if(u==null&&(y.search=a.search,y.hash=a.hash),(u==null||u===""||u===".")&&h){let b=id(y.search);if(h.route.index&&!b)y.search=y.search?y.search.replace(/^\?/,"?index&"):"?index";else if(!h.route.index&&b){let S=new URLSearchParams(y.search),v=S.getAll("index");S.delete("index"),v.filter(N=>N).forEach(N=>S.append("index",N));let L=S.toString();y.search=L?"?"+L:""}}return s&&l!=="/"&&(y.pathname=y.pathname==="/"?l:ga([l,y.pathname])),wi(y)}function Sm(a,r,l,s){if(!s||!Ez(s))return{path:l};if(s.formMethod&&!Lz(s.formMethod))return{path:l,error:at(405,{method:s.formMethod})};let u=()=>({path:l,error:at(400,{type:"invalid-body"})}),d=s.formMethod||"get",f=a?d.toUpperCase():d.toLowerCase(),p=Lg(l);if(s.body!==void 0){if(s.formEncType==="text/plain"){if(!Pt(f))return u();let S=typeof s.body=="string"?s.body:s.body instanceof FormData||s.body instanceof URLSearchParams?Array.from(s.body.entries()).reduce((v,L)=>{let[N,H]=L;return""+v+N+"="+H+`
`},""):String(s.body);return{path:l,submission:{formMethod:f,formAction:p,formEncType:s.formEncType,formData:void 0,json:void 0,text:S}}}else if(s.formEncType==="application/json"){if(!Pt(f))return u();try{let S=typeof s.body=="string"?JSON.parse(s.body):s.body;return{path:l,submission:{formMethod:f,formAction:p,formEncType:s.formEncType,formData:void 0,json:S,text:void 0}}}catch{return u()}}}Ne(typeof FormData=="function","FormData is not available in this environment");let g,h;if(s.formData)g=ju(s.formData),h=s.formData;else if(s.body instanceof FormData)g=ju(s.body),h=s.body;else if(s.body instanceof URLSearchParams)g=s.body,h=wm(g);else if(s.body==null)g=new URLSearchParams,h=new FormData;else try{g=new URLSearchParams(s.body),h=wm(g)}catch{return u()}let y={formMethod:f,formAction:p,formEncType:s&&s.formEncType||"application/x-www-form-urlencoded",formData:h,json:void 0,text:void 0};if(Pt(y.formMethod))return{path:l,submission:y};let b=Fa(l);return r&&b.search&&id(b.search)&&g.append("index",""),b.search="?"+g,{path:wi(b),submission:y}}function Em(a,r,l){l===void 0&&(l=!1);let s=a.findIndex(u=>u.route.id===r);return s>=0?a.slice(0,l?s+1:s):a}function xm(a,r,l,s,u,d,f,p,g,h,y,b,S,v,L,N){let H=N?mt(N[1])?N[1].error:N[1].data:void 0,P=a.createURL(r.location),G=a.createURL(u),q=l;d&&r.errors?q=Em(l,Object.keys(r.errors)[0],!0):N&&mt(N[1])&&(q=Em(l,N[0]));let de=N?N[1].statusCode:void 0,ze=f&&de&&de>=400,X=q.filter((ne,he)=>{let{route:ue}=ne;if(ue.lazy)return!0;if(ue.loader==null)return!1;if(d)return Pu(ue,r.loaderData,r.errors);if(xz(r.loaderData,r.matches[he],ne)||g.some(Ae=>Ae===ne.route.id))return!0;let ae=r.matches[he],ee=ne;return Dm(ne,yn({currentUrl:P,currentParams:ae.params,nextUrl:G,nextParams:ee.params},s,{actionResult:H,actionStatus:de,defaultShouldRevalidate:ze?!1:p||P.pathname+P.search===G.pathname+G.search||P.search!==G.search||_g(ae,ee)}))}),R=[];return b.forEach((ne,he)=>{if(d||!l.some(fe=>fe.route.id===ne.routeId)||y.has(he))return;let ue=xi(v,ne.path,L);if(!ue){R.push({key:he,routeId:ne.routeId,path:ne.path,matches:null,match:null,controller:null});return}let ae=r.fetchers.get(he),ee=yl(ue,ne.path),Ae=!1;S.has(he)?Ae=!1:h.has(he)?(h.delete(he),Ae=!0):ae&&ae.state!=="idle"&&ae.data===void 0?Ae=p:Ae=Dm(ee,yn({currentUrl:P,currentParams:r.matches[r.matches.length-1].params,nextUrl:G,nextParams:l[l.length-1].params},s,{actionResult:H,actionStatus:de,defaultShouldRevalidate:ze?!1:p})),Ae&&R.push({key:he,routeId:ne.routeId,path:ne.path,matches:ue,match:ee,controller:new AbortController})}),[X,R]}function Pu(a,r,l){if(a.lazy)return!0;if(!a.loader)return!1;let s=r!=null&&r[a.id]!==void 0,u=l!=null&&l[a.id]!==void 0;return!s&&u?!1:typeof a.loader=="function"&&a.loader.hydrate===!0?!0:!s&&!u}function xz(a,r,l){let s=!r||l.route.id!==r.route.id,u=a[l.route.id]===void 0;return s||u}function _g(a,r){let l=a.route.path;return a.pathname!==r.pathname||l!=null&&l.endsWith("*")&&a.params["*"]!==r.params["*"]}function Dm(a,r){if(a.route.shouldRevalidate){let l=a.route.shouldRevalidate(r);if(typeof l=="boolean")return l}return r.defaultShouldRevalidate}function Tm(a,r,l,s,u){var d;let f;if(a){let h=s[a];Ne(h,"No route found to patch children into: routeId = "+a),h.children||(h.children=[]),f=h.children}else f=l;let p=r.filter(h=>!f.some(y=>Cg(h,y))),g=Ys(p,u,[a||"_","patch",String(((d=f)==null?void 0:d.length)||"0")],s);f.push(...g)}function Cg(a,r){return"id"in a&&"id"in r&&a.id===r.id?!0:a.index===r.index&&a.path===r.path&&a.caseSensitive===r.caseSensitive?(!a.children||a.children.length===0)&&(!r.children||r.children.length===0)?!0:a.children.every((l,s)=>{var u;return(u=r.children)==null?void 0:u.some(d=>Cg(l,d))}):!1}async function Dz(a,r,l){if(!a.lazy)return;let s=await a.lazy();if(!a.lazy)return;let u=l[a.id];Ne(u,"No route found in manifest");let d={};for(let f in s){let g=u[f]!==void 0&&f!=="hasErrorBoundary";Ai(!g,'Route "'+u.id+'" has a static property "'+f+'" defined but its lazy function is also returning a value for this property. '+('The lazy route property "'+f+'" will be ignored.')),!g&&!Y0.has(f)&&(d[f]=s[f])}Object.assign(u,d),Object.assign(u,yn({},r(u),{lazy:void 0}))}async function Tz(a){let{matches:r}=a,l=r.filter(u=>u.shouldLoad);return(await Promise.all(l.map(u=>u.resolve()))).reduce((u,d,f)=>Object.assign(u,{[l[f].route.id]:d}),{})}async function Az(a,r,l,s,u,d,f,p,g,h){let y=d.map(v=>v.route.lazy?Dz(v.route,g,p):void 0),b=d.map((v,L)=>{let N=y[L],H=u.some(G=>G.route.id===v.route.id);return yn({},v,{shouldLoad:H,resolve:async G=>(G&&s.method==="GET"&&(v.route.lazy||v.route.loader)&&(H=!0),H?wz(r,s,v,N,G,h):Promise.resolve({type:tn.data,result:void 0}))})}),S=await a({matches:b,request:s,params:d[0].params,fetcherKey:f,context:h});try{await Promise.all(y)}catch{}return S}async function wz(a,r,l,s,u,d){let f,p,g=h=>{let y,b=new Promise((L,N)=>y=N);p=()=>y(),r.signal.addEventListener("abort",p);let S=L=>typeof h!="function"?Promise.reject(new Error("You cannot call the handler for a route which defines a boolean "+('"'+a+'" [routeId: '+l.route.id+"]"))):h({request:r,params:l.params,context:d},...L!==void 0?[L]:[]),v=(async()=>{try{return{type:"data",result:await(u?u(N=>S(N)):S())}}catch(L){return{type:"error",result:L}}})();return Promise.race([v,b])};try{let h=l.route[a];if(s)if(h){let y,[b]=await Promise.all([g(h).catch(S=>{y=S}),s]);if(y!==void 0)throw y;f=b}else if(await s,h=l.route[a],h)f=await g(h);else if(a==="action"){let y=new URL(r.url),b=y.pathname+y.search;throw at(405,{method:r.method,pathname:b,routeId:l.route.id})}else return{type:tn.data,result:void 0};else if(h)f=await g(h);else{let y=new URL(r.url),b=y.pathname+y.search;throw at(404,{pathname:b})}Ne(f.result!==void 0,"You defined "+(a==="action"?"an action":"a loader")+" for route "+('"'+l.route.id+"\" but didn't return anything from your `"+a+"` ")+"function. Please return a value or `null`.")}catch(h){return{type:tn.error,result:h}}finally{p&&r.signal.removeEventListener("abort",p)}return f}async function Rz(a){let{result:r,type:l}=a;if(Og(r)){let b;try{let S=r.headers.get("Content-Type");S&&/\bapplication\/json\b/.test(S)?r.body==null?b=null:b=await r.json():b=await r.text()}catch(S){return{type:tn.error,error:S}}return l===tn.error?{type:tn.error,error:new Qs(r.status,r.statusText,b),statusCode:r.status,headers:r.headers}:{type:tn.data,data:b,statusCode:r.status,headers:r.headers}}if(l===tn.error){if(_m(r)){var s,u;if(r.data instanceof Error){var d,f;return{type:tn.error,error:r.data,statusCode:(d=r.init)==null?void 0:d.status,headers:(f=r.init)!=null&&f.headers?new Headers(r.init.headers):void 0}}return{type:tn.error,error:new Qs(((s=r.init)==null?void 0:s.status)||500,void 0,r.data),statusCode:El(r)?r.status:void 0,headers:(u=r.init)!=null&&u.headers?new Headers(r.init.headers):void 0}}return{type:tn.error,error:r,statusCode:El(r)?r.status:void 0}}if(Cz(r)){var p,g;return{type:tn.deferred,deferredData:r,statusCode:(p=r.init)==null?void 0:p.status,headers:((g=r.init)==null?void 0:g.headers)&&new Headers(r.init.headers)}}if(_m(r)){var h,y;return{type:tn.data,data:r.data,statusCode:(h=r.init)==null?void 0:h.status,headers:(y=r.init)!=null&&y.headers?new Headers(r.init.headers):void 0}}return{type:tn.data,data:r}}function kz(a,r,l,s,u,d){let f=a.headers.get("Location");if(Ne(f,"Redirects returned/thrown from loaders/actions must have a Location header"),!td.test(f)){let p=s.slice(0,s.findIndex(g=>g.route.id===l)+1);f=Uu(new URL(r.url),p,u,!0,f,d),a.headers.set("Location",f)}return a}function Am(a,r,l,s){let u=["about:","blob:","chrome:","chrome-untrusted:","content:","data:","devtools:","file:","filesystem:","javascript:"];if(td.test(a)){let d=a,f=d.startsWith("//")?new URL(r.protocol+d):new URL(d);if(u.includes(f.protocol))throw new Error("Invalid redirect location");let p=ya(f.pathname,l)!=null;if(f.origin===r.origin&&p)return f.pathname+f.search+f.hash}try{let d=s.createURL(a);if(u.includes(d.protocol))throw new Error("Invalid redirect location")}catch{}return a}function dr(a,r,l,s){let u=a.createURL(Lg(r)).toString(),d={signal:l};if(s&&Pt(s.formMethod)){let{formMethod:f,formEncType:p}=s;d.method=f.toUpperCase(),p==="application/json"?(d.headers=new Headers({"Content-Type":p}),d.body=JSON.stringify(s.json)):p==="text/plain"?d.body=s.text:p==="application/x-www-form-urlencoded"&&s.formData?d.body=ju(s.formData):d.body=s.formData}return new Request(u,d)}function ju(a){let r=new URLSearchParams;for(let[l,s]of a.entries())r.append(l,typeof s=="string"?s:s.name);return r}function wm(a){let r=new FormData;for(let[l,s]of a.entries())r.append(l,s);return r}function Iz(a,r,l,s,u){let d={},f=null,p,g=!1,h={},y=l&&mt(l[1])?l[1].error:void 0;return a.forEach(b=>{if(!(b.route.id in r))return;let S=b.route.id,v=r[S];if(Ne(!Ti(v),"Cannot handle redirect results in processLoaderData"),mt(v)){let L=v.error;y!==void 0&&(L=y,y=void 0),f=f||{};{let N=Di(a,S);f[N.route.id]==null&&(f[N.route.id]=L)}d[S]=void 0,g||(g=!0,p=El(v.error)?v.error.status:500),v.headers&&(h[S]=v.headers)}else Ka(v)?(s.set(S,v.deferredData),d[S]=v.deferredData.data,v.statusCode!=null&&v.statusCode!==200&&!g&&(p=v.statusCode),v.headers&&(h[S]=v.headers)):(d[S]=v.data,v.statusCode&&v.statusCode!==200&&!g&&(p=v.statusCode),v.headers&&(h[S]=v.headers))}),y!==void 0&&l&&(f={[l[0]]:y},d[l[0]]=void 0),{loaderData:d,errors:f,statusCode:p||200,loaderHeaders:h}}function Rm(a,r,l,s,u,d,f){let{loaderData:p,errors:g}=Iz(r,l,s,f);return u.forEach(h=>{let{key:y,match:b,controller:S}=h,v=d[y];if(Ne(v,"Did not find corresponding fetcher result"),!(S&&S.signal.aborted))if(mt(v)){let L=Di(a.matches,b?.route.id);g&&g[L.route.id]||(g=yn({},g,{[L.route.id]:v.error})),a.fetchers.delete(y)}else if(Ti(v))Ne(!1,"Unhandled fetcher revalidation redirect");else if(Ka(v))Ne(!1,"Unhandled fetcher deferred data");else{let L=Qa(v.data);a.fetchers.set(y,L)}}),{loaderData:p,errors:g}}function km(a,r,l,s){let u=yn({},r);for(let d of l){let f=d.route.id;if(r.hasOwnProperty(f)?r[f]!==void 0&&(u[f]=r[f]):a[f]!==void 0&&d.route.loader&&(u[f]=a[f]),s&&s.hasOwnProperty(f))break}return u}function Im(a){return a?mt(a[1])?{actionData:{}}:{actionData:{[a[0]]:a[1].data}}:{}}function Di(a,r){return(r?a.slice(0,a.findIndex(s=>s.route.id===r)+1):[...a]).reverse().find(s=>s.route.hasErrorBoundary===!0)||a[0]}function Mm(a){let r=a.length===1?a[0]:a.find(l=>l.index||!l.path||l.path==="/")||{id:"__shim-error-route__"};return{matches:[{params:{},pathname:"",pathnameBase:"",route:r}],route:r}}function at(a,r){let{pathname:l,routeId:s,method:u,type:d,message:f}=r===void 0?{}:r,p="Unknown Server Error",g="Unknown @remix-run/router error";return a===400?(p="Bad Request",u&&l&&s?g="You made a "+u+' request to "'+l+'" but '+('did not provide a `loader` for route "'+s+'", ')+"so there is no way to handle the request.":d==="defer-action"?g="defer() is not supported in actions":d==="invalid-body"&&(g="Unable to encode submission body")):a===403?(p="Forbidden",g='Route "'+s+'" does not match URL "'+l+'"'):a===404?(p="Not Found",g='No route matches URL "'+l+'"'):a===405&&(p="Method Not Allowed",u&&l&&s?g="You made a "+u.toUpperCase()+' request to "'+l+'" but '+('did not provide an `action` for route "'+s+'", ')+"so there is no way to handle the request.":u&&(g='Invalid request method "'+u.toUpperCase()+'"')),new Qs(a||500,p,new Error(g),!0)}function js(a){let r=Object.entries(a);for(let l=r.length-1;l>=0;l--){let[s,u]=r[l];if(Ti(u))return{key:s,result:u}}}function Lg(a){let r=typeof a=="string"?Fa(a):a;return wi(yn({},r,{hash:""}))}function Mz(a,r){return a.pathname!==r.pathname||a.search!==r.search?!1:a.hash===""?r.hash!=="":a.hash===r.hash?!0:r.hash!==""}function _z(a){return Og(a.result)&&yz.has(a.result.status)}function Ka(a){return a.type===tn.deferred}function mt(a){return a.type===tn.error}function Ti(a){return(a&&a.type)===tn.redirect}function _m(a){return typeof a=="object"&&a!=null&&"type"in a&&"data"in a&&"init"in a&&a.type==="DataWithResponseInit"}function Cz(a){let r=a;return r&&typeof r=="object"&&typeof r.data=="object"&&typeof r.subscribe=="function"&&typeof r.cancel=="function"&&typeof r.resolveData=="function"}function Og(a){return a!=null&&typeof a.status=="number"&&typeof a.statusText=="string"&&typeof a.headers=="object"&&typeof a.body<"u"}function Lz(a){return gz.has(a.toLowerCase())}function Pt(a){return hz.has(a.toLowerCase())}async function Oz(a,r,l,s,u){let d=Object.entries(r);for(let f=0;f<d.length;f++){let[p,g]=d[f],h=a.find(S=>S?.route.id===p);if(!h)continue;let y=s.find(S=>S.route.id===h.route.id),b=y!=null&&!_g(y,h)&&(u&&u[h.route.id])!==void 0;Ka(g)&&b&&await ad(g,l,!1).then(S=>{S&&(r[p]=S)})}}async function Nz(a,r,l){for(let s=0;s<l.length;s++){let{key:u,routeId:d,controller:f}=l[s],p=r[u];a.find(h=>h?.route.id===d)&&Ka(p)&&(Ne(f,"Expected an AbortController for revalidating fetcher deferred result"),await ad(p,f.signal,!0).then(h=>{h&&(r[u]=h)}))}}async function ad(a,r,l){if(l===void 0&&(l=!1),!await a.deferredData.resolveData(r)){if(l)try{return{type:tn.data,data:a.deferredData.unwrappedData}}catch(u){return{type:tn.error,error:u}}return{type:tn.data,data:a.deferredData.data}}}function id(a){return new URLSearchParams(a).getAll("index").some(r=>r==="")}function yl(a,r){let l=typeof r=="string"?Fa(r).search:r.search;if(a[a.length-1].route.index&&id(l||""))return a[a.length-1];let s=kg(a);return s[s.length-1]}function Cm(a){let{formMethod:r,formAction:l,formEncType:s,text:u,formData:d,json:f}=a;if(!(!r||!l||!s)){if(u!=null)return{formMethod:r,formAction:l,formEncType:s,formData:void 0,json:void 0,text:u};if(d!=null)return{formMethod:r,formAction:l,formEncType:s,formData:d,json:void 0,text:void 0};if(f!==void 0)return{formMethod:r,formAction:l,formEncType:s,formData:void 0,json:f,text:void 0}}}function Su(a,r){return r?{state:"loading",location:a,formMethod:r.formMethod,formAction:r.formAction,formEncType:r.formEncType,formData:r.formData,json:r.json,text:r.text}:{state:"loading",location:a,formMethod:void 0,formAction:void 0,formEncType:void 0,formData:void 0,json:void 0,text:void 0}}function Wz(a,r){return{state:"submitting",location:a,formMethod:r.formMethod,formAction:r.formAction,formEncType:r.formEncType,formData:r.formData,json:r.json,text:r.text}}function dl(a,r){return a?{state:"loading",formMethod:a.formMethod,formAction:a.formAction,formEncType:a.formEncType,formData:a.formData,json:a.json,text:a.text,data:r}:{state:"loading",formMethod:void 0,formAction:void 0,formEncType:void 0,formData:void 0,json:void 0,text:void 0,data:r}}function Uz(a,r){return{state:"submitting",formMethod:a.formMethod,formAction:a.formAction,formEncType:a.formEncType,formData:a.formData,json:a.json,text:a.text,data:r?r.data:void 0}}function Qa(a){return{state:"idle",formMethod:void 0,formAction:void 0,formEncType:void 0,formData:void 0,json:void 0,text:void 0,data:a}}function Pz(a,r){try{let l=a.sessionStorage.getItem(Mg);if(l){let s=JSON.parse(l);for(let[u,d]of Object.entries(s||{}))d&&Array.isArray(d)&&r.set(u,new Set(d||[]))}}catch{}}function jz(a,r){if(r.size>0){let l={};for(let[s,u]of r)l[s]=[...u];try{a.sessionStorage.setItem(Mg,JSON.stringify(l))}catch(s){Ai(!1,"Failed to save applied view transitions in sessionStorage ("+s+").")}}}function Ks(){return Ks=Object.assign?Object.assign.bind():function(a){for(var r=1;r<arguments.length;r++){var l=arguments[r];for(var s in l)Object.prototype.hasOwnProperty.call(l,s)&&(a[s]=l[s])}return a},Ks.apply(this,arguments)}const Dl=F.createContext(null),rd=F.createContext(null),Ja=F.createContext(null),ld=F.createContext(null),ba=F.createContext({outlet:null,matches:[],isDataRoute:!1}),Ng=F.createContext(null);function Bz(a,r){let{relative:l}=r===void 0?{}:r;Tl()||Ne(!1);let{basename:s,navigator:u}=F.useContext(Ja),{hash:d,pathname:f,search:p}=eo(a,{relative:l}),g=f;return s!=="/"&&(g=f==="/"?s:ga([s,f])),u.createHref({pathname:g,search:p,hash:d})}function Tl(){return F.useContext(ld)!=null}function Al(){return Tl()||Ne(!1),F.useContext(ld).location}function Wg(a){F.useContext(Ja).static||F.useLayoutEffect(a)}function Xz(){let{isDataRoute:a}=F.useContext(ba);return a?a4():Hz()}function Hz(){Tl()||Ne(!1);let a=F.useContext(Dl),{basename:r,future:l,navigator:s}=F.useContext(Ja),{matches:u}=F.useContext(ba),{pathname:d}=Al(),f=JSON.stringify(ed(u,l.v7_relativeSplatPath)),p=F.useRef(!1);return Wg(()=>{p.current=!0}),F.useCallback(function(h,y){if(y===void 0&&(y={}),!p.current)return;if(typeof h=="number"){s.go(h);return}let b=nd(h,JSON.parse(f),d,y.relative==="path");a==null&&r!=="/"&&(b.pathname=b.pathname==="/"?r:ga([r,b.pathname])),(y.replace?s.replace:s.push)(b,y.state,y)},[r,s,f,d,a])}const Zz=F.createContext(null);function Vz(a){let r=F.useContext(ba).outlet;return r&&F.createElement(Zz.Provider,{value:a},r)}function qz(){let{matches:a}=F.useContext(ba),r=a[a.length-1];return r?r.params:{}}function eo(a,r){let{relative:l}=r===void 0?{}:r,{future:s}=F.useContext(Ja),{matches:u}=F.useContext(ba),{pathname:d}=Al(),f=JSON.stringify(ed(u,s.v7_relativeSplatPath));return F.useMemo(()=>nd(a,JSON.parse(f),d,l==="path"),[a,f,d,l])}function Yz(a,r,l,s){Tl()||Ne(!1);let{navigator:u}=F.useContext(Ja),{matches:d}=F.useContext(ba),f=d[d.length-1],p=f?f.params:{};f&&f.pathname;let g=f?f.pathnameBase:"/";f&&f.route;let h=Al(),y;y=h;let b=y.pathname||"/",S=b;if(g!=="/"){let N=g.replace(/^\//,"").split("/");S="/"+b.replace(/^\//,"").split("/").slice(N.length).join("/")}let v=xi(a,{pathname:S});return Jz(v&&v.map(N=>Object.assign({},N,{params:Object.assign({},p,N.params),pathname:ga([g,u.encodeLocation?u.encodeLocation(N.pathname).pathname:N.pathname]),pathnameBase:N.pathnameBase==="/"?g:ga([g,u.encodeLocation?u.encodeLocation(N.pathnameBase).pathname:N.pathnameBase])})),d,l,s)}function Gz(){let a=t4(),r=El(a)?a.status+" "+a.statusText:a instanceof Error?a.message:JSON.stringify(a),l=a instanceof Error?a.stack:null,u={padding:"0.5rem",backgroundColor:"rgba(200,200,200, 0.5)"};return F.createElement(F.Fragment,null,F.createElement("h2",null,"Unexpected Application Error!"),F.createElement("h3",{style:{fontStyle:"italic"}},r),l?F.createElement("pre",{style:u},l):null,null)}const Qz=F.createElement(Gz,null);class Kz extends F.Component{constructor(r){super(r),this.state={location:r.location,revalidation:r.revalidation,error:r.error}}static getDerivedStateFromError(r){return{error:r}}static getDerivedStateFromProps(r,l){return l.location!==r.location||l.revalidation!=="idle"&&r.revalidation==="idle"?{error:r.error,location:r.location,revalidation:r.revalidation}:{error:r.error!==void 0?r.error:l.error,location:l.location,revalidation:r.revalidation||l.revalidation}}componentDidCatch(r,l){console.error("React Router caught the following error during render",r,l)}render(){return this.state.error!==void 0?F.createElement(ba.Provider,{value:this.props.routeContext},F.createElement(Ng.Provider,{value:this.state.error,children:this.props.component})):this.props.children}}function Fz(a){let{routeContext:r,match:l,children:s}=a,u=F.useContext(Dl);return u&&u.static&&u.staticContext&&(l.route.errorElement||l.route.ErrorBoundary)&&(u.staticContext._deepestRenderedBoundaryId=l.route.id),F.createElement(ba.Provider,{value:r},s)}function Jz(a,r,l,s){var u;if(r===void 0&&(r=[]),l===void 0&&(l=null),s===void 0&&(s=null),a==null){var d;if(!l)return null;if(l.errors)a=l.matches;else if((d=s)!=null&&d.v7_partialHydration&&r.length===0&&!l.initialized&&l.matches.length>0)a=l.matches;else return null}let f=a,p=(u=l)==null?void 0:u.errors;if(p!=null){let y=f.findIndex(b=>b.route.id&&p?.[b.route.id]!==void 0);y>=0||Ne(!1),f=f.slice(0,Math.min(f.length,y+1))}let g=!1,h=-1;if(l&&s&&s.v7_partialHydration)for(let y=0;y<f.length;y++){let b=f[y];if((b.route.HydrateFallback||b.route.hydrateFallbackElement)&&(h=y),b.route.id){let{loaderData:S,errors:v}=l,L=b.route.loader&&S[b.route.id]===void 0&&(!v||v[b.route.id]===void 0);if(b.route.lazy||L){g=!0,h>=0?f=f.slice(0,h+1):f=[f[0]];break}}}return f.reduceRight((y,b,S)=>{let v,L=!1,N=null,H=null;l&&(v=p&&b.route.id?p[b.route.id]:void 0,N=b.route.errorElement||Qz,g&&(h<0&&S===0?(i4("route-fallback"),L=!0,H=null):h===S&&(L=!0,H=b.route.hydrateFallbackElement||null)));let P=r.concat(f.slice(0,S+1)),G=()=>{let q;return v?q=N:L?q=H:b.route.Component?q=F.createElement(b.route.Component,null):b.route.element?q=b.route.element:q=y,F.createElement(Fz,{match:b,routeContext:{outlet:y,matches:P,isDataRoute:l!=null},children:q})};return l&&(b.route.ErrorBoundary||b.route.errorElement||S===0)?F.createElement(Kz,{location:l.location,revalidation:l.revalidation,component:N,error:v,children:G(),routeContext:{outlet:null,matches:P,isDataRoute:!0}}):G()},null)}var Ug=(function(a){return a.UseBlocker="useBlocker",a.UseRevalidator="useRevalidator",a.UseNavigateStable="useNavigate",a})(Ug||{}),Pg=(function(a){return a.UseBlocker="useBlocker",a.UseLoaderData="useLoaderData",a.UseActionData="useActionData",a.UseRouteError="useRouteError",a.UseNavigation="useNavigation",a.UseRouteLoaderData="useRouteLoaderData",a.UseMatches="useMatches",a.UseRevalidator="useRevalidator",a.UseNavigateStable="useNavigate",a.UseRouteId="useRouteId",a})(Pg||{});function $z(a){let r=F.useContext(Dl);return r||Ne(!1),r}function e4(a){let r=F.useContext(rd);return r||Ne(!1),r}function n4(a){let r=F.useContext(ba);return r||Ne(!1),r}function jg(a){let r=n4(),l=r.matches[r.matches.length-1];return l.route.id||Ne(!1),l.route.id}function t4(){var a;let r=F.useContext(Ng),l=e4(),s=jg();return r!==void 0?r:(a=l.errors)==null?void 0:a[s]}function a4(){let{router:a}=$z(Ug.UseNavigateStable),r=jg(Pg.UseNavigateStable),l=F.useRef(!1);return Wg(()=>{l.current=!0}),F.useCallback(function(u,d){d===void 0&&(d={}),l.current&&(typeof u=="number"?a.navigate(u):a.navigate(u,Ks({fromRouteId:r},d)))},[a,r])}const Lm={};function i4(a,r,l){Lm[a]||(Lm[a]=!0)}function r4(a,r){a?.v7_startTransition,a?.v7_relativeSplatPath===void 0&&(!r||r.v7_relativeSplatPath),r&&(r.v7_fetcherPersist,r.v7_normalizeFormMethod,r.v7_partialHydration,r.v7_skipActionErrorRevalidation)}function l4(a){return Vz(a.context)}function s4(a){let{basename:r="/",children:l=null,location:s,navigationType:u=Mn.Pop,navigator:d,static:f=!1,future:p}=a;Tl()&&Ne(!1);let g=r.replace(/^\/*/,"/"),h=F.useMemo(()=>({basename:g,navigator:d,static:f,future:Ks({v7_relativeSplatPath:!1},p)}),[g,p,d,f]);typeof s=="string"&&(s=Fa(s));let{pathname:y="/",search:b="",hash:S="",state:v=null,key:L="default"}=s,N=F.useMemo(()=>{let H=ya(y,g);return H==null?null:{location:{pathname:H,search:b,hash:S,state:v,key:L},navigationType:u}},[g,y,b,S,v,L,u]);return N==null?null:F.createElement(Ja.Provider,{value:h},F.createElement(ld.Provider,{children:l,value:N}))}new Promise(()=>{});function o4(a){let r={hasErrorBoundary:a.ErrorBoundary!=null||a.errorElement!=null};return a.Component&&Object.assign(r,{element:F.createElement(a.Component),Component:void 0}),a.HydrateFallback&&Object.assign(r,{hydrateFallbackElement:F.createElement(a.HydrateFallback),HydrateFallback:void 0}),a.ErrorBoundary&&Object.assign(r,{errorElement:F.createElement(a.ErrorBoundary),ErrorBoundary:void 0}),r}function gr(){return gr=Object.assign?Object.assign.bind():function(a){for(var r=1;r<arguments.length;r++){var l=arguments[r];for(var s in l)Object.prototype.hasOwnProperty.call(l,s)&&(a[s]=l[s])}return a},gr.apply(this,arguments)}function Bg(a,r){if(a==null)return{};var l={},s=Object.keys(a),u,d;for(d=0;d<s.length;d++)u=s[d],!(r.indexOf(u)>=0)&&(l[u]=a[u]);return l}function c4(a){return!!(a.metaKey||a.altKey||a.ctrlKey||a.shiftKey)}function u4(a,r){return a.button===0&&(!r||r==="_self")&&!c4(a)}const d4=["onClick","relative","reloadDocument","replace","state","target","to","preventScrollReset","viewTransition"],f4=["aria-current","caseSensitive","className","end","style","to","viewTransition","children"],p4="6";try{window.__reactRouterVersion=p4}catch{}function h4(a,r){return Sz({basename:r?.basename,future:gr({},r?.future,{v7_prependBasename:!0}),history:Z0({window:r?.window}),hydrationData:r?.hydrationData||m4(),routes:a,mapRouteProperties:o4,dataStrategy:r?.dataStrategy,patchRoutesOnNavigation:r?.patchRoutesOnNavigation,window:r?.window}).initialize()}function m4(){var a;let r=(a=window)==null?void 0:a.__staticRouterHydrationData;return r&&r.errors&&(r=gr({},r,{errors:g4(r.errors)})),r}function g4(a){if(!a)return null;let r=Object.entries(a),l={};for(let[s,u]of r)if(u&&u.__type==="RouteErrorResponse")l[s]=new Qs(u.status,u.statusText,u.data,u.internal===!0);else if(u&&u.__type==="Error"){if(u.__subType){let d=window[u.__subType];if(typeof d=="function")try{let f=new d(u.message);f.stack="",l[s]=f}catch{}}if(l[s]==null){let d=new Error(u.message);d.stack="",l[s]=d}}else l[s]=u;return l}const Xg=F.createContext({isTransitioning:!1}),y4=F.createContext(new Map),b4="startTransition",Om=O0[b4],z4="flushSync",Nm=H0[z4];function v4(a){Om?Om(a):a()}function fl(a){Nm?Nm(a):a()}class S4{constructor(){this.status="pending",this.promise=new Promise((r,l)=>{this.resolve=s=>{this.status==="pending"&&(this.status="resolved",r(s))},this.reject=s=>{this.status==="pending"&&(this.status="rejected",l(s))}})}}function E4(a){let{fallbackElement:r,router:l,future:s}=a,[u,d]=F.useState(l.state),[f,p]=F.useState(),[g,h]=F.useState({isTransitioning:!1}),[y,b]=F.useState(),[S,v]=F.useState(),[L,N]=F.useState(),H=F.useRef(new Map),{v7_startTransition:P}=s||{},G=F.useCallback(ne=>{P?v4(ne):ne()},[P]),q=F.useCallback((ne,he)=>{let{deletedFetchers:ue,flushSync:ae,viewTransitionOpts:ee}=he;ne.fetchers.forEach((fe,J)=>{fe.data!==void 0&&H.current.set(J,fe.data)}),ue.forEach(fe=>H.current.delete(fe));let Ae=l.window==null||l.window.document==null||typeof l.window.document.startViewTransition!="function";if(!ee||Ae){ae?fl(()=>d(ne)):G(()=>d(ne));return}if(ae){fl(()=>{S&&(y&&y.resolve(),S.skipTransition()),h({isTransitioning:!0,flushSync:!0,currentLocation:ee.currentLocation,nextLocation:ee.nextLocation})});let fe=l.window.document.startViewTransition(()=>{fl(()=>d(ne))});fe.finished.finally(()=>{fl(()=>{b(void 0),v(void 0),p(void 0),h({isTransitioning:!1})})}),fl(()=>v(fe));return}S?(y&&y.resolve(),S.skipTransition(),N({state:ne,currentLocation:ee.currentLocation,nextLocation:ee.nextLocation})):(p(ne),h({isTransitioning:!0,flushSync:!1,currentLocation:ee.currentLocation,nextLocation:ee.nextLocation}))},[l.window,S,y,H,G]);F.useLayoutEffect(()=>l.subscribe(q),[l,q]),F.useEffect(()=>{g.isTransitioning&&!g.flushSync&&b(new S4)},[g]),F.useEffect(()=>{if(y&&f&&l.window){let ne=f,he=y.promise,ue=l.window.document.startViewTransition(async()=>{G(()=>d(ne)),await he});ue.finished.finally(()=>{b(void 0),v(void 0),p(void 0),h({isTransitioning:!1})}),v(ue)}},[G,f,y,l.window]),F.useEffect(()=>{y&&f&&u.location.key===f.location.key&&y.resolve()},[y,S,u.location,f]),F.useEffect(()=>{!g.isTransitioning&&L&&(p(L.state),h({isTransitioning:!0,flushSync:!1,currentLocation:L.currentLocation,nextLocation:L.nextLocation}),N(void 0))},[g.isTransitioning,L]),F.useEffect(()=>{},[]);let de=F.useMemo(()=>({createHref:l.createHref,encodeLocation:l.encodeLocation,go:ne=>l.navigate(ne),push:(ne,he,ue)=>l.navigate(ne,{state:he,preventScrollReset:ue?.preventScrollReset}),replace:(ne,he,ue)=>l.navigate(ne,{replace:!0,state:he,preventScrollReset:ue?.preventScrollReset})}),[l]),ze=l.basename||"/",X=F.useMemo(()=>({router:l,navigator:de,static:!1,basename:ze}),[l,de,ze]),R=F.useMemo(()=>({v7_relativeSplatPath:l.future.v7_relativeSplatPath}),[l.future.v7_relativeSplatPath]);return F.useEffect(()=>r4(s,l.future),[s,l.future]),F.createElement(F.Fragment,null,F.createElement(Dl.Provider,{value:X},F.createElement(rd.Provider,{value:u},F.createElement(y4.Provider,{value:H.current},F.createElement(Xg.Provider,{value:g},F.createElement(s4,{basename:ze,location:u.location,navigationType:u.historyAction,navigator:de,future:R},u.initialized||l.future.v7_partialHydration?F.createElement(x4,{routes:l.routes,future:l.future,state:u}):r))))),null)}const x4=F.memo(D4);function D4(a){let{routes:r,future:l,state:s}=a;return Yz(r,void 0,s,l)}const T4=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u",A4=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,Bu=F.forwardRef(function(r,l){let{onClick:s,relative:u,reloadDocument:d,replace:f,state:p,target:g,to:h,preventScrollReset:y,viewTransition:b}=r,S=Bg(r,d4),{basename:v}=F.useContext(Ja),L,N=!1;if(typeof h=="string"&&A4.test(h)&&(L=h,T4))try{let q=new URL(window.location.href),de=h.startsWith("//")?new URL(q.protocol+h):new URL(h),ze=ya(de.pathname,v);de.origin===q.origin&&ze!=null?h=ze+de.search+de.hash:N=!0}catch{}let H=Bz(h,{relative:u}),P=R4(h,{replace:f,state:p,target:g,preventScrollReset:y,relative:u,viewTransition:b});function G(q){s&&s(q),q.defaultPrevented||P(q)}return F.createElement("a",gr({},S,{href:L||H,onClick:N||d?s:G,ref:l,target:g}))}),Eu=F.forwardRef(function(r,l){let{"aria-current":s="page",caseSensitive:u=!1,className:d="",end:f=!1,style:p,to:g,viewTransition:h,children:y}=r,b=Bg(r,f4),S=eo(g,{relative:b.relative}),v=Al(),L=F.useContext(rd),{navigator:N,basename:H}=F.useContext(Ja),P=L!=null&&k4(S)&&h===!0,G=N.encodeLocation?N.encodeLocation(S).pathname:S.pathname,q=v.pathname,de=L&&L.navigation&&L.navigation.location?L.navigation.location.pathname:null;u||(q=q.toLowerCase(),de=de?de.toLowerCase():null,G=G.toLowerCase()),de&&H&&(de=ya(de,H)||de);const ze=G!=="/"&&G.endsWith("/")?G.length-1:G.length;let X=q===G||!f&&q.startsWith(G)&&q.charAt(ze)==="/",R=de!=null&&(de===G||!f&&de.startsWith(G)&&de.charAt(G.length)==="/"),ne={isActive:X,isPending:R,isTransitioning:P},he=X?s:void 0,ue;typeof d=="function"?ue=d(ne):ue=[d,X?"active":null,R?"pending":null,P?"transitioning":null].filter(Boolean).join(" ");let ae=typeof p=="function"?p(ne):p;return F.createElement(Bu,gr({},b,{"aria-current":he,className:ue,ref:l,style:ae,to:g,viewTransition:h}),typeof y=="function"?y(ne):y)});var Xu;(function(a){a.UseScrollRestoration="useScrollRestoration",a.UseSubmit="useSubmit",a.UseSubmitFetcher="useSubmitFetcher",a.UseFetcher="useFetcher",a.useViewTransitionState="useViewTransitionState"})(Xu||(Xu={}));var Wm;(function(a){a.UseFetcher="useFetcher",a.UseFetchers="useFetchers",a.UseScrollRestoration="useScrollRestoration"})(Wm||(Wm={}));function w4(a){let r=F.useContext(Dl);return r||Ne(!1),r}function R4(a,r){let{target:l,replace:s,state:u,preventScrollReset:d,relative:f,viewTransition:p}=r===void 0?{}:r,g=Xz(),h=Al(),y=eo(a,{relative:f});return F.useCallback(b=>{if(u4(b,l)){b.preventDefault();let S=s!==void 0?s:wi(h)===wi(y);g(a,{replace:S,state:u,preventScrollReset:d,relative:f,viewTransition:p})}},[h,g,y,s,u,l,a,d,f,p])}function k4(a,r){r===void 0&&(r={});let l=F.useContext(Xg);l==null&&Ne(!1);let{basename:s}=w4(Xu.useViewTransitionState),u=eo(a,{relative:r.relative});if(!l.isTransitioning)return!1;let d=ya(l.currentLocation.pathname,s)||l.currentLocation.pathname,f=ya(l.nextLocation.pathname,s)||l.nextLocation.pathname;return Gs(u.pathname,f)!=null||Gs(u.pathname,d)!=null}const I4=[{to:"/",label:"Home",end:!0},{to:"/api",label:"API"},{to:"/examples",label:"Examples"}];function M4(){return re.jsxs("div",{className:"page",children:[re.jsx("div",{className:"page-bg","aria-hidden":"true"}),re.jsxs("header",{className:"hero",children:[re.jsxs("div",{className:"hero-top",children:[re.jsxs("div",{className:"brand",children:[re.jsx("span",{className:"brand-mark"}),re.jsx("span",{children:"Wizzard Packages"})]}),re.jsx("nav",{className:"nav",children:I4.map(a=>re.jsx(Eu,{to:a.to,end:a.end,className:({isActive:r})=>`nav-link${r?" nav-link--active":""}`,children:a.label},a.to))})]}),re.jsxs("div",{className:"hero-body",children:[re.jsxs("div",{className:"hero-copy",children:[re.jsx("p",{className:"eyebrow",children:"Documentation Hub"}),re.jsx("h1",{children:"Docs UI"}),re.jsx("p",{className:"subtitle",children:"Interactive documentation experience for the @wizzard-packages/* ecosystem."}),re.jsxs("div",{className:"hero-actions",children:[re.jsx(Eu,{to:"/api",className:"button button--primary",children:"Explore API"}),re.jsx(Eu,{to:"/examples",className:"button button--ghost",children:"View Examples"})]})]}),re.jsxs("div",{className:"hero-panel",children:[re.jsx("p",{className:"panel-label",children:"Now live"}),re.jsx("h2",{children:"Typedoc + Live Recipes"}),re.jsx("p",{className:"panel-copy",children:"Browse generated API markdown, then jump straight into example flows that match your use case."}),re.jsxs("div",{className:"panel-meta",children:[re.jsx("span",{children:"Design refresh"}),re.jsx("span",{children:"Dev preview"}),re.jsx("span",{children:"v0.1.0"})]})]})]})]}),re.jsx("main",{className:"content",children:re.jsx(l4,{})})]})}function _4(){return re.jsxs("section",{className:"section",children:[re.jsxs("div",{className:"section-header",children:[re.jsx("p",{className:"section-eyebrow",children:"Getting started"}),re.jsx("h2",{children:"Everything you need to ship guided flows"}),re.jsx("p",{className:"section-lead",children:"Build predictable multi-step journeys with adapters, persistence, and flexible navigation modes."})]}),re.jsxs("div",{className:"card-grid",children:[re.jsxs("article",{className:"card card--accent",children:[re.jsx("h3",{children:"API Reference"}),re.jsx("p",{children:"Full TypeDoc output, searchable modules, and copy-ready snippets."})]}),re.jsxs("article",{className:"card card--cool",children:[re.jsx("h3",{children:"Examples"}),re.jsx("p",{children:"Guided recipes for validation, persistence, and routing flows."})]}),re.jsxs("article",{className:"card",children:[re.jsx("h3",{children:"Status"}),re.jsx("p",{children:"Docs UI is live on dev preview while the redesign ships."})]})]})]})}function C4(a,r){const l={};return(a[a.length-1]===""?[...a,""]:a).join((l.padRight?" ":"")+","+(l.padLeft===!1?"":" ")).trim()}const L4=/^[$_\p{ID_Start}][$_\u{200C}\u{200D}\p{ID_Continue}]*$/u,O4=/^[$_\p{ID_Start}][-$_\u{200C}\u{200D}\p{ID_Continue}]*$/u,N4={};function Um(a,r){return(N4.jsx?O4:L4).test(a)}const W4=/[ \t\n\f\r]/g;function U4(a){return typeof a=="object"?a.type==="text"?Pm(a.value):!1:Pm(a)}function Pm(a){return a.replace(W4,"")===""}class wl{constructor(r,l,s){this.normal=l,this.property=r,s&&(this.space=s)}}wl.prototype.normal={};wl.prototype.property={};wl.prototype.space=void 0;function Hg(a,r){const l={},s={};for(const u of a)Object.assign(l,u.property),Object.assign(s,u.normal);return new wl(l,s,r)}function Hu(a){return a.toLowerCase()}class rt{constructor(r,l){this.attribute=l,this.property=r}}rt.prototype.attribute="";rt.prototype.booleanish=!1;rt.prototype.boolean=!1;rt.prototype.commaOrSpaceSeparated=!1;rt.prototype.commaSeparated=!1;rt.prototype.defined=!1;rt.prototype.mustUseProperty=!1;rt.prototype.number=!1;rt.prototype.overloadedBoolean=!1;rt.prototype.property="";rt.prototype.spaceSeparated=!1;rt.prototype.space=void 0;let P4=0;const Oe=Ri(),In=Ri(),Zu=Ri(),$=Ri(),cn=Ri(),hr=Ri(),ht=Ri();function Ri(){return 2**++P4}const Vu=Object.freeze(Object.defineProperty({__proto__:null,boolean:Oe,booleanish:In,commaOrSpaceSeparated:ht,commaSeparated:hr,number:$,overloadedBoolean:Zu,spaceSeparated:cn},Symbol.toStringTag,{value:"Module"})),xu=Object.keys(Vu);class sd extends rt{constructor(r,l,s,u){let d=-1;if(super(r,l),jm(this,"space",u),typeof s=="number")for(;++d<xu.length;){const f=xu[d];jm(this,xu[d],(s&Vu[f])===Vu[f])}}}sd.prototype.defined=!0;function jm(a,r,l){l&&(a[r]=l)}function yr(a){const r={},l={};for(const[s,u]of Object.entries(a.properties)){const d=new sd(s,a.transform(a.attributes||{},s),u,a.space);a.mustUseProperty&&a.mustUseProperty.includes(s)&&(d.mustUseProperty=!0),r[s]=d,l[Hu(s)]=s,l[Hu(d.attribute)]=s}return new wl(r,l,a.space)}const Zg=yr({properties:{ariaActiveDescendant:null,ariaAtomic:In,ariaAutoComplete:null,ariaBusy:In,ariaChecked:In,ariaColCount:$,ariaColIndex:$,ariaColSpan:$,ariaControls:cn,ariaCurrent:null,ariaDescribedBy:cn,ariaDetails:null,ariaDisabled:In,ariaDropEffect:cn,ariaErrorMessage:null,ariaExpanded:In,ariaFlowTo:cn,ariaGrabbed:In,ariaHasPopup:null,ariaHidden:In,ariaInvalid:null,ariaKeyShortcuts:null,ariaLabel:null,ariaLabelledBy:cn,ariaLevel:$,ariaLive:null,ariaModal:In,ariaMultiLine:In,ariaMultiSelectable:In,ariaOrientation:null,ariaOwns:cn,ariaPlaceholder:null,ariaPosInSet:$,ariaPressed:In,ariaReadOnly:In,ariaRelevant:null,ariaRequired:In,ariaRoleDescription:cn,ariaRowCount:$,ariaRowIndex:$,ariaRowSpan:$,ariaSelected:In,ariaSetSize:$,ariaSort:null,ariaValueMax:$,ariaValueMin:$,ariaValueNow:$,ariaValueText:null,role:null},transform(a,r){return r==="role"?r:"aria-"+r.slice(4).toLowerCase()}});function Vg(a,r){return r in a?a[r]:r}function qg(a,r){return Vg(a,r.toLowerCase())}const j4=yr({attributes:{acceptcharset:"accept-charset",classname:"class",htmlfor:"for",httpequiv:"http-equiv"},mustUseProperty:["checked","multiple","muted","selected"],properties:{abbr:null,accept:hr,acceptCharset:cn,accessKey:cn,action:null,allow:null,allowFullScreen:Oe,allowPaymentRequest:Oe,allowUserMedia:Oe,alt:null,as:null,async:Oe,autoCapitalize:null,autoComplete:cn,autoFocus:Oe,autoPlay:Oe,blocking:cn,capture:null,charSet:null,checked:Oe,cite:null,className:cn,cols:$,colSpan:null,content:null,contentEditable:In,controls:Oe,controlsList:cn,coords:$|hr,crossOrigin:null,data:null,dateTime:null,decoding:null,default:Oe,defer:Oe,dir:null,dirName:null,disabled:Oe,download:Zu,draggable:In,encType:null,enterKeyHint:null,fetchPriority:null,form:null,formAction:null,formEncType:null,formMethod:null,formNoValidate:Oe,formTarget:null,headers:cn,height:$,hidden:Zu,high:$,href:null,hrefLang:null,htmlFor:cn,httpEquiv:cn,id:null,imageSizes:null,imageSrcSet:null,inert:Oe,inputMode:null,integrity:null,is:null,isMap:Oe,itemId:null,itemProp:cn,itemRef:cn,itemScope:Oe,itemType:cn,kind:null,label:null,lang:null,language:null,list:null,loading:null,loop:Oe,low:$,manifest:null,max:null,maxLength:$,media:null,method:null,min:null,minLength:$,multiple:Oe,muted:Oe,name:null,nonce:null,noModule:Oe,noValidate:Oe,onAbort:null,onAfterPrint:null,onAuxClick:null,onBeforeMatch:null,onBeforePrint:null,onBeforeToggle:null,onBeforeUnload:null,onBlur:null,onCancel:null,onCanPlay:null,onCanPlayThrough:null,onChange:null,onClick:null,onClose:null,onContextLost:null,onContextMenu:null,onContextRestored:null,onCopy:null,onCueChange:null,onCut:null,onDblClick:null,onDrag:null,onDragEnd:null,onDragEnter:null,onDragExit:null,onDragLeave:null,onDragOver:null,onDragStart:null,onDrop:null,onDurationChange:null,onEmptied:null,onEnded:null,onError:null,onFocus:null,onFormData:null,onHashChange:null,onInput:null,onInvalid:null,onKeyDown:null,onKeyPress:null,onKeyUp:null,onLanguageChange:null,onLoad:null,onLoadedData:null,onLoadedMetadata:null,onLoadEnd:null,onLoadStart:null,onMessage:null,onMessageError:null,onMouseDown:null,onMouseEnter:null,onMouseLeave:null,onMouseMove:null,onMouseOut:null,onMouseOver:null,onMouseUp:null,onOffline:null,onOnline:null,onPageHide:null,onPageShow:null,onPaste:null,onPause:null,onPlay:null,onPlaying:null,onPopState:null,onProgress:null,onRateChange:null,onRejectionHandled:null,onReset:null,onResize:null,onScroll:null,onScrollEnd:null,onSecurityPolicyViolation:null,onSeeked:null,onSeeking:null,onSelect:null,onSlotChange:null,onStalled:null,onStorage:null,onSubmit:null,onSuspend:null,onTimeUpdate:null,onToggle:null,onUnhandledRejection:null,onUnload:null,onVolumeChange:null,onWaiting:null,onWheel:null,open:Oe,optimum:$,pattern:null,ping:cn,placeholder:null,playsInline:Oe,popover:null,popoverTarget:null,popoverTargetAction:null,poster:null,preload:null,readOnly:Oe,referrerPolicy:null,rel:cn,required:Oe,reversed:Oe,rows:$,rowSpan:$,sandbox:cn,scope:null,scoped:Oe,seamless:Oe,selected:Oe,shadowRootClonable:Oe,shadowRootDelegatesFocus:Oe,shadowRootMode:null,shape:null,size:$,sizes:null,slot:null,span:$,spellCheck:In,src:null,srcDoc:null,srcLang:null,srcSet:null,start:$,step:null,style:null,tabIndex:$,target:null,title:null,translate:null,type:null,typeMustMatch:Oe,useMap:null,value:In,width:$,wrap:null,writingSuggestions:null,align:null,aLink:null,archive:cn,axis:null,background:null,bgColor:null,border:$,borderColor:null,bottomMargin:$,cellPadding:null,cellSpacing:null,char:null,charOff:null,classId:null,clear:null,code:null,codeBase:null,codeType:null,color:null,compact:Oe,declare:Oe,event:null,face:null,frame:null,frameBorder:null,hSpace:$,leftMargin:$,link:null,longDesc:null,lowSrc:null,marginHeight:$,marginWidth:$,noResize:Oe,noHref:Oe,noShade:Oe,noWrap:Oe,object:null,profile:null,prompt:null,rev:null,rightMargin:$,rules:null,scheme:null,scrolling:In,standby:null,summary:null,text:null,topMargin:$,valueType:null,version:null,vAlign:null,vLink:null,vSpace:$,allowTransparency:null,autoCorrect:null,autoSave:null,disablePictureInPicture:Oe,disableRemotePlayback:Oe,prefix:null,property:null,results:$,security:null,unselectable:null},space:"html",transform:qg}),B4=yr({attributes:{accentHeight:"accent-height",alignmentBaseline:"alignment-baseline",arabicForm:"arabic-form",baselineShift:"baseline-shift",capHeight:"cap-height",className:"class",clipPath:"clip-path",clipRule:"clip-rule",colorInterpolation:"color-interpolation",colorInterpolationFilters:"color-interpolation-filters",colorProfile:"color-profile",colorRendering:"color-rendering",crossOrigin:"crossorigin",dataType:"datatype",dominantBaseline:"dominant-baseline",enableBackground:"enable-background",fillOpacity:"fill-opacity",fillRule:"fill-rule",floodColor:"flood-color",floodOpacity:"flood-opacity",fontFamily:"font-family",fontSize:"font-size",fontSizeAdjust:"font-size-adjust",fontStretch:"font-stretch",fontStyle:"font-style",fontVariant:"font-variant",fontWeight:"font-weight",glyphName:"glyph-name",glyphOrientationHorizontal:"glyph-orientation-horizontal",glyphOrientationVertical:"glyph-orientation-vertical",hrefLang:"hreflang",horizAdvX:"horiz-adv-x",horizOriginX:"horiz-origin-x",horizOriginY:"horiz-origin-y",imageRendering:"image-rendering",letterSpacing:"letter-spacing",lightingColor:"lighting-color",markerEnd:"marker-end",markerMid:"marker-mid",markerStart:"marker-start",navDown:"nav-down",navDownLeft:"nav-down-left",navDownRight:"nav-down-right",navLeft:"nav-left",navNext:"nav-next",navPrev:"nav-prev",navRight:"nav-right",navUp:"nav-up",navUpLeft:"nav-up-left",navUpRight:"nav-up-right",onAbort:"onabort",onActivate:"onactivate",onAfterPrint:"onafterprint",onBeforePrint:"onbeforeprint",onBegin:"onbegin",onCancel:"oncancel",onCanPlay:"oncanplay",onCanPlayThrough:"oncanplaythrough",onChange:"onchange",onClick:"onclick",onClose:"onclose",onCopy:"oncopy",onCueChange:"oncuechange",onCut:"oncut",onDblClick:"ondblclick",onDrag:"ondrag",onDragEnd:"ondragend",onDragEnter:"ondragenter",onDragExit:"ondragexit",onDragLeave:"ondragleave",onDragOver:"ondragover",onDragStart:"ondragstart",onDrop:"ondrop",onDurationChange:"ondurationchange",onEmptied:"onemptied",onEnd:"onend",onEnded:"onended",onError:"onerror",onFocus:"onfocus",onFocusIn:"onfocusin",onFocusOut:"onfocusout",onHashChange:"onhashchange",onInput:"oninput",onInvalid:"oninvalid",onKeyDown:"onkeydown",onKeyPress:"onkeypress",onKeyUp:"onkeyup",onLoad:"onload",onLoadedData:"onloadeddata",onLoadedMetadata:"onloadedmetadata",onLoadStart:"onloadstart",onMessage:"onmessage",onMouseDown:"onmousedown",onMouseEnter:"onmouseenter",onMouseLeave:"onmouseleave",onMouseMove:"onmousemove",onMouseOut:"onmouseout",onMouseOver:"onmouseover",onMouseUp:"onmouseup",onMouseWheel:"onmousewheel",onOffline:"onoffline",onOnline:"ononline",onPageHide:"onpagehide",onPageShow:"onpageshow",onPaste:"onpaste",onPause:"onpause",onPlay:"onplay",onPlaying:"onplaying",onPopState:"onpopstate",onProgress:"onprogress",onRateChange:"onratechange",onRepeat:"onrepeat",onReset:"onreset",onResize:"onresize",onScroll:"onscroll",onSeeked:"onseeked",onSeeking:"onseeking",onSelect:"onselect",onShow:"onshow",onStalled:"onstalled",onStorage:"onstorage",onSubmit:"onsubmit",onSuspend:"onsuspend",onTimeUpdate:"ontimeupdate",onToggle:"ontoggle",onUnload:"onunload",onVolumeChange:"onvolumechange",onWaiting:"onwaiting",onZoom:"onzoom",overlinePosition:"overline-position",overlineThickness:"overline-thickness",paintOrder:"paint-order",panose1:"panose-1",pointerEvents:"pointer-events",referrerPolicy:"referrerpolicy",renderingIntent:"rendering-intent",shapeRendering:"shape-rendering",stopColor:"stop-color",stopOpacity:"stop-opacity",strikethroughPosition:"strikethrough-position",strikethroughThickness:"strikethrough-thickness",strokeDashArray:"stroke-dasharray",strokeDashOffset:"stroke-dashoffset",strokeLineCap:"stroke-linecap",strokeLineJoin:"stroke-linejoin",strokeMiterLimit:"stroke-miterlimit",strokeOpacity:"stroke-opacity",strokeWidth:"stroke-width",tabIndex:"tabindex",textAnchor:"text-anchor",textDecoration:"text-decoration",textRendering:"text-rendering",transformOrigin:"transform-origin",typeOf:"typeof",underlinePosition:"underline-position",underlineThickness:"underline-thickness",unicodeBidi:"unicode-bidi",unicodeRange:"unicode-range",unitsPerEm:"units-per-em",vAlphabetic:"v-alphabetic",vHanging:"v-hanging",vIdeographic:"v-ideographic",vMathematical:"v-mathematical",vectorEffect:"vector-effect",vertAdvY:"vert-adv-y",vertOriginX:"vert-origin-x",vertOriginY:"vert-origin-y",wordSpacing:"word-spacing",writingMode:"writing-mode",xHeight:"x-height",playbackOrder:"playbackorder",timelineBegin:"timelinebegin"},properties:{about:ht,accentHeight:$,accumulate:null,additive:null,alignmentBaseline:null,alphabetic:$,amplitude:$,arabicForm:null,ascent:$,attributeName:null,attributeType:null,azimuth:$,bandwidth:null,baselineShift:null,baseFrequency:null,baseProfile:null,bbox:null,begin:null,bias:$,by:null,calcMode:null,capHeight:$,className:cn,clip:null,clipPath:null,clipPathUnits:null,clipRule:null,color:null,colorInterpolation:null,colorInterpolationFilters:null,colorProfile:null,colorRendering:null,content:null,contentScriptType:null,contentStyleType:null,crossOrigin:null,cursor:null,cx:null,cy:null,d:null,dataType:null,defaultAction:null,descent:$,diffuseConstant:$,direction:null,display:null,dur:null,divisor:$,dominantBaseline:null,download:Oe,dx:null,dy:null,edgeMode:null,editable:null,elevation:$,enableBackground:null,end:null,event:null,exponent:$,externalResourcesRequired:null,fill:null,fillOpacity:$,fillRule:null,filter:null,filterRes:null,filterUnits:null,floodColor:null,floodOpacity:null,focusable:null,focusHighlight:null,fontFamily:null,fontSize:null,fontSizeAdjust:null,fontStretch:null,fontStyle:null,fontVariant:null,fontWeight:null,format:null,fr:null,from:null,fx:null,fy:null,g1:hr,g2:hr,glyphName:hr,glyphOrientationHorizontal:null,glyphOrientationVertical:null,glyphRef:null,gradientTransform:null,gradientUnits:null,handler:null,hanging:$,hatchContentUnits:null,hatchUnits:null,height:null,href:null,hrefLang:null,horizAdvX:$,horizOriginX:$,horizOriginY:$,id:null,ideographic:$,imageRendering:null,initialVisibility:null,in:null,in2:null,intercept:$,k:$,k1:$,k2:$,k3:$,k4:$,kernelMatrix:ht,kernelUnitLength:null,keyPoints:null,keySplines:null,keyTimes:null,kerning:null,lang:null,lengthAdjust:null,letterSpacing:null,lightingColor:null,limitingConeAngle:$,local:null,markerEnd:null,markerMid:null,markerStart:null,markerHeight:null,markerUnits:null,markerWidth:null,mask:null,maskContentUnits:null,maskUnits:null,mathematical:null,max:null,media:null,mediaCharacterEncoding:null,mediaContentEncodings:null,mediaSize:$,mediaTime:null,method:null,min:null,mode:null,name:null,navDown:null,navDownLeft:null,navDownRight:null,navLeft:null,navNext:null,navPrev:null,navRight:null,navUp:null,navUpLeft:null,navUpRight:null,numOctaves:null,observer:null,offset:null,onAbort:null,onActivate:null,onAfterPrint:null,onBeforePrint:null,onBegin:null,onCancel:null,onCanPlay:null,onCanPlayThrough:null,onChange:null,onClick:null,onClose:null,onCopy:null,onCueChange:null,onCut:null,onDblClick:null,onDrag:null,onDragEnd:null,onDragEnter:null,onDragExit:null,onDragLeave:null,onDragOver:null,onDragStart:null,onDrop:null,onDurationChange:null,onEmptied:null,onEnd:null,onEnded:null,onError:null,onFocus:null,onFocusIn:null,onFocusOut:null,onHashChange:null,onInput:null,onInvalid:null,onKeyDown:null,onKeyPress:null,onKeyUp:null,onLoad:null,onLoadedData:null,onLoadedMetadata:null,onLoadStart:null,onMessage:null,onMouseDown:null,onMouseEnter:null,onMouseLeave:null,onMouseMove:null,onMouseOut:null,onMouseOver:null,onMouseUp:null,onMouseWheel:null,onOffline:null,onOnline:null,onPageHide:null,onPageShow:null,onPaste:null,onPause:null,onPlay:null,onPlaying:null,onPopState:null,onProgress:null,onRateChange:null,onRepeat:null,onReset:null,onResize:null,onScroll:null,onSeeked:null,onSeeking:null,onSelect:null,onShow:null,onStalled:null,onStorage:null,onSubmit:null,onSuspend:null,onTimeUpdate:null,onToggle:null,onUnload:null,onVolumeChange:null,onWaiting:null,onZoom:null,opacity:null,operator:null,order:null,orient:null,orientation:null,origin:null,overflow:null,overlay:null,overlinePosition:$,overlineThickness:$,paintOrder:null,panose1:null,path:null,pathLength:$,patternContentUnits:null,patternTransform:null,patternUnits:null,phase:null,ping:cn,pitch:null,playbackOrder:null,pointerEvents:null,points:null,pointsAtX:$,pointsAtY:$,pointsAtZ:$,preserveAlpha:null,preserveAspectRatio:null,primitiveUnits:null,propagate:null,property:ht,r:null,radius:null,referrerPolicy:null,refX:null,refY:null,rel:ht,rev:ht,renderingIntent:null,repeatCount:null,repeatDur:null,requiredExtensions:ht,requiredFeatures:ht,requiredFonts:ht,requiredFormats:ht,resource:null,restart:null,result:null,rotate:null,rx:null,ry:null,scale:null,seed:null,shapeRendering:null,side:null,slope:null,snapshotTime:null,specularConstant:$,specularExponent:$,spreadMethod:null,spacing:null,startOffset:null,stdDeviation:null,stemh:null,stemv:null,stitchTiles:null,stopColor:null,stopOpacity:null,strikethroughPosition:$,strikethroughThickness:$,string:null,stroke:null,strokeDashArray:ht,strokeDashOffset:null,strokeLineCap:null,strokeLineJoin:null,strokeMiterLimit:$,strokeOpacity:$,strokeWidth:null,style:null,surfaceScale:$,syncBehavior:null,syncBehaviorDefault:null,syncMaster:null,syncTolerance:null,syncToleranceDefault:null,systemLanguage:ht,tabIndex:$,tableValues:null,target:null,targetX:$,targetY:$,textAnchor:null,textDecoration:null,textRendering:null,textLength:null,timelineBegin:null,title:null,transformBehavior:null,type:null,typeOf:ht,to:null,transform:null,transformOrigin:null,u1:null,u2:null,underlinePosition:$,underlineThickness:$,unicode:null,unicodeBidi:null,unicodeRange:null,unitsPerEm:$,values:null,vAlphabetic:$,vMathematical:$,vectorEffect:null,vHanging:$,vIdeographic:$,version:null,vertAdvY:$,vertOriginX:$,vertOriginY:$,viewBox:null,viewTarget:null,visibility:null,width:null,widths:null,wordSpacing:null,writingMode:null,x:null,x1:null,x2:null,xChannelSelector:null,xHeight:$,y:null,y1:null,y2:null,yChannelSelector:null,z:null,zoomAndPan:null},space:"svg",transform:Vg}),Yg=yr({properties:{xLinkActuate:null,xLinkArcRole:null,xLinkHref:null,xLinkRole:null,xLinkShow:null,xLinkTitle:null,xLinkType:null},space:"xlink",transform(a,r){return"xlink:"+r.slice(5).toLowerCase()}}),Gg=yr({attributes:{xmlnsxlink:"xmlns:xlink"},properties:{xmlnsXLink:null,xmlns:null},space:"xmlns",transform:qg}),Qg=yr({properties:{xmlBase:null,xmlLang:null,xmlSpace:null},space:"xml",transform(a,r){return"xml:"+r.slice(3).toLowerCase()}}),X4={classId:"classID",dataType:"datatype",itemId:"itemID",strokeDashArray:"strokeDasharray",strokeDashOffset:"strokeDashoffset",strokeLineCap:"strokeLinecap",strokeLineJoin:"strokeLinejoin",strokeMiterLimit:"strokeMiterlimit",typeOf:"typeof",xLinkActuate:"xlinkActuate",xLinkArcRole:"xlinkArcrole",xLinkHref:"xlinkHref",xLinkRole:"xlinkRole",xLinkShow:"xlinkShow",xLinkTitle:"xlinkTitle",xLinkType:"xlinkType",xmlnsXLink:"xmlnsXlink"},H4=/[A-Z]/g,Bm=/-[a-z]/g,Z4=/^data[-\w.:]+$/i;function V4(a,r){const l=Hu(r);let s=r,u=rt;if(l in a.normal)return a.property[a.normal[l]];if(l.length>4&&l.slice(0,4)==="data"&&Z4.test(r)){if(r.charAt(4)==="-"){const d=r.slice(5).replace(Bm,Y4);s="data"+d.charAt(0).toUpperCase()+d.slice(1)}else{const d=r.slice(4);if(!Bm.test(d)){let f=d.replace(H4,q4);f.charAt(0)!=="-"&&(f="-"+f),r="data"+f}}u=sd}return new u(s,r)}function q4(a){return"-"+a.toLowerCase()}function Y4(a){return a.charAt(1).toUpperCase()}const G4=Hg([Zg,j4,Yg,Gg,Qg],"html"),od=Hg([Zg,B4,Yg,Gg,Qg],"svg");function Q4(a){return a.join(" ").trim()}var fr={},Du,Xm;function K4(){if(Xm)return Du;Xm=1;var a=/\/\*[^*]*\*+([^/*][^*]*\*+)*\//g,r=/\n/g,l=/^\s*/,s=/^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/,u=/^:\s*/,d=/^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/,f=/^[;\s]*/,p=/^\s+|\s+$/g,g=`
`,h="/",y="*",b="",S="comment",v="declaration";function L(H,P){if(typeof H!="string")throw new TypeError("First argument must be a string");if(!H)return[];P=P||{};var G=1,q=1;function de(fe){var J=fe.match(r);J&&(G+=J.length);var C=fe.lastIndexOf(g);q=~C?fe.length-C:q+fe.length}function ze(){var fe={line:G,column:q};return function(J){return J.position=new X(fe),he(),J}}function X(fe){this.start=fe,this.end={line:G,column:q},this.source=P.source}X.prototype.content=H;function R(fe){var J=new Error(P.source+":"+G+":"+q+": "+fe);if(J.reason=fe,J.filename=P.source,J.line=G,J.column=q,J.source=H,!P.silent)throw J}function ne(fe){var J=fe.exec(H);if(J){var C=J[0];return de(C),H=H.slice(C.length),J}}function he(){ne(l)}function ue(fe){var J;for(fe=fe||[];J=ae();)J!==!1&&fe.push(J);return fe}function ae(){var fe=ze();if(!(h!=H.charAt(0)||y!=H.charAt(1))){for(var J=2;b!=H.charAt(J)&&(y!=H.charAt(J)||h!=H.charAt(J+1));)++J;if(J+=2,b===H.charAt(J-1))return R("End of comment missing");var C=H.slice(2,J-2);return q+=2,de(C),H=H.slice(J),q+=2,fe({type:S,comment:C})}}function ee(){var fe=ze(),J=ne(s);if(J){if(ae(),!ne(u))return R("property missing ':'");var C=ne(d),K=fe({type:v,property:N(J[0].replace(a,b)),value:C?N(C[0].replace(a,b)):b});return ne(f),K}}function Ae(){var fe=[];ue(fe);for(var J;J=ee();)J!==!1&&(fe.push(J),ue(fe));return fe}return he(),Ae()}function N(H){return H?H.replace(p,b):b}return Du=L,Du}var Hm;function F4(){if(Hm)return fr;Hm=1;var a=fr&&fr.__importDefault||function(s){return s&&s.__esModule?s:{default:s}};Object.defineProperty(fr,"__esModule",{value:!0}),fr.default=l;const r=a(K4());function l(s,u){let d=null;if(!s||typeof s!="string")return d;const f=(0,r.default)(s),p=typeof u=="function";return f.forEach(g=>{if(g.type!=="declaration")return;const{property:h,value:y}=g;p?u(h,y,g):y&&(d=d||{},d[h]=y)}),d}return fr}var pl={},Zm;function J4(){if(Zm)return pl;Zm=1,Object.defineProperty(pl,"__esModule",{value:!0}),pl.camelCase=void 0;var a=/^--[a-zA-Z0-9_-]+$/,r=/-([a-z])/g,l=/^[^-]+$/,s=/^-(webkit|moz|ms|o|khtml)-/,u=/^-(ms)-/,d=function(h){return!h||l.test(h)||a.test(h)},f=function(h,y){return y.toUpperCase()},p=function(h,y){return"".concat(y,"-")},g=function(h,y){return y===void 0&&(y={}),d(h)?h:(h=h.toLowerCase(),y.reactCompat?h=h.replace(u,p):h=h.replace(s,p),h.replace(r,f))};return pl.camelCase=g,pl}var hl,Vm;function $4(){if(Vm)return hl;Vm=1;var a=hl&&hl.__importDefault||function(u){return u&&u.__esModule?u:{default:u}},r=a(F4()),l=J4();function s(u,d){var f={};return!u||typeof u!="string"||(0,r.default)(u,function(p,g){p&&g&&(f[(0,l.camelCase)(p,d)]=g)}),f}return s.default=s,hl=s,hl}var ev=$4();const nv=$s(ev),Kg=Fg("end"),cd=Fg("start");function Fg(a){return r;function r(l){const s=l&&l.position&&l.position[a]||{};if(typeof s.line=="number"&&s.line>0&&typeof s.column=="number"&&s.column>0)return{line:s.line,column:s.column,offset:typeof s.offset=="number"&&s.offset>-1?s.offset:void 0}}}function tv(a){const r=cd(a),l=Kg(a);if(r&&l)return{start:r,end:l}}function bl(a){return!a||typeof a!="object"?"":"position"in a||"type"in a?qm(a.position):"start"in a||"end"in a?qm(a):"line"in a||"column"in a?qu(a):""}function qu(a){return Ym(a&&a.line)+":"+Ym(a&&a.column)}function qm(a){return qu(a&&a.start)+"-"+qu(a&&a.end)}function Ym(a){return a&&typeof a=="number"?a:1}class Hn extends Error{constructor(r,l,s){super(),typeof l=="string"&&(s=l,l=void 0);let u="",d={},f=!1;if(l&&("line"in l&&"column"in l?d={place:l}:"start"in l&&"end"in l?d={place:l}:"type"in l?d={ancestors:[l],place:l.position}:d={...l}),typeof r=="string"?u=r:!d.cause&&r&&(f=!0,u=r.message,d.cause=r),!d.ruleId&&!d.source&&typeof s=="string"){const g=s.indexOf(":");g===-1?d.ruleId=s:(d.source=s.slice(0,g),d.ruleId=s.slice(g+1))}if(!d.place&&d.ancestors&&d.ancestors){const g=d.ancestors[d.ancestors.length-1];g&&(d.place=g.position)}const p=d.place&&"start"in d.place?d.place.start:d.place;this.ancestors=d.ancestors||void 0,this.cause=d.cause||void 0,this.column=p?p.column:void 0,this.fatal=void 0,this.file="",this.message=u,this.line=p?p.line:void 0,this.name=bl(d.place)||"1:1",this.place=d.place||void 0,this.reason=this.message,this.ruleId=d.ruleId||void 0,this.source=d.source||void 0,this.stack=f&&d.cause&&typeof d.cause.stack=="string"?d.cause.stack:"",this.actual=void 0,this.expected=void 0,this.note=void 0,this.url=void 0}}Hn.prototype.file="";Hn.prototype.name="";Hn.prototype.reason="";Hn.prototype.message="";Hn.prototype.stack="";Hn.prototype.column=void 0;Hn.prototype.line=void 0;Hn.prototype.ancestors=void 0;Hn.prototype.cause=void 0;Hn.prototype.fatal=void 0;Hn.prototype.place=void 0;Hn.prototype.ruleId=void 0;Hn.prototype.source=void 0;const ud={}.hasOwnProperty,av=new Map,iv=/[A-Z]/g,rv=new Set(["table","tbody","thead","tfoot","tr"]),lv=new Set(["td","th"]),Jg="https://github.com/syntax-tree/hast-util-to-jsx-runtime";function sv(a,r){if(!r||r.Fragment===void 0)throw new TypeError("Expected `Fragment` in options");const l=r.filePath||void 0;let s;if(r.development){if(typeof r.jsxDEV!="function")throw new TypeError("Expected `jsxDEV` in options when `development: true`");s=mv(l,r.jsxDEV)}else{if(typeof r.jsx!="function")throw new TypeError("Expected `jsx` in production options");if(typeof r.jsxs!="function")throw new TypeError("Expected `jsxs` in production options");s=hv(l,r.jsx,r.jsxs)}const u={Fragment:r.Fragment,ancestors:[],components:r.components||{},create:s,elementAttributeNameCase:r.elementAttributeNameCase||"react",evaluater:r.createEvaluater?r.createEvaluater():void 0,filePath:l,ignoreInvalidStyle:r.ignoreInvalidStyle||!1,passKeys:r.passKeys!==!1,passNode:r.passNode||!1,schema:r.space==="svg"?od:G4,stylePropertyNameCase:r.stylePropertyNameCase||"dom",tableCellAlignToStyle:r.tableCellAlignToStyle!==!1},d=$g(u,a,void 0);return d&&typeof d!="string"?d:u.create(a,u.Fragment,{children:d||void 0},void 0)}function $g(a,r,l){if(r.type==="element")return ov(a,r,l);if(r.type==="mdxFlowExpression"||r.type==="mdxTextExpression")return cv(a,r);if(r.type==="mdxJsxFlowElement"||r.type==="mdxJsxTextElement")return dv(a,r,l);if(r.type==="mdxjsEsm")return uv(a,r);if(r.type==="root")return fv(a,r,l);if(r.type==="text")return pv(a,r)}function ov(a,r,l){const s=a.schema;let u=s;r.tagName.toLowerCase()==="svg"&&s.space==="html"&&(u=od,a.schema=u),a.ancestors.push(r);const d=ny(a,r.tagName,!1),f=gv(a,r);let p=fd(a,r);return rv.has(r.tagName)&&(p=p.filter(function(g){return typeof g=="string"?!U4(g):!0})),ey(a,f,d,r),dd(f,p),a.ancestors.pop(),a.schema=s,a.create(r,d,f,l)}function cv(a,r){if(r.data&&r.data.estree&&a.evaluater){const s=r.data.estree.body[0];return s.type,a.evaluater.evaluateExpression(s.expression)}xl(a,r.position)}function uv(a,r){if(r.data&&r.data.estree&&a.evaluater)return a.evaluater.evaluateProgram(r.data.estree);xl(a,r.position)}function dv(a,r,l){const s=a.schema;let u=s;r.name==="svg"&&s.space==="html"&&(u=od,a.schema=u),a.ancestors.push(r);const d=r.name===null?a.Fragment:ny(a,r.name,!0),f=yv(a,r),p=fd(a,r);return ey(a,f,d,r),dd(f,p),a.ancestors.pop(),a.schema=s,a.create(r,d,f,l)}function fv(a,r,l){const s={};return dd(s,fd(a,r)),a.create(r,a.Fragment,s,l)}function pv(a,r){return r.value}function ey(a,r,l,s){typeof l!="string"&&l!==a.Fragment&&a.passNode&&(r.node=s)}function dd(a,r){if(r.length>0){const l=r.length>1?r:r[0];l&&(a.children=l)}}function hv(a,r,l){return s;function s(u,d,f,p){const h=Array.isArray(f.children)?l:r;return p?h(d,f,p):h(d,f)}}function mv(a,r){return l;function l(s,u,d,f){const p=Array.isArray(d.children),g=cd(s);return r(u,d,f,p,{columnNumber:g?g.column-1:void 0,fileName:a,lineNumber:g?g.line:void 0},void 0)}}function gv(a,r){const l={};let s,u;for(u in r.properties)if(u!=="children"&&ud.call(r.properties,u)){const d=bv(a,u,r.properties[u]);if(d){const[f,p]=d;a.tableCellAlignToStyle&&f==="align"&&typeof p=="string"&&lv.has(r.tagName)?s=p:l[f]=p}}if(s){const d=l.style||(l.style={});d[a.stylePropertyNameCase==="css"?"text-align":"textAlign"]=s}return l}function yv(a,r){const l={};for(const s of r.attributes)if(s.type==="mdxJsxExpressionAttribute")if(s.data&&s.data.estree&&a.evaluater){const d=s.data.estree.body[0];d.type;const f=d.expression;f.type;const p=f.properties[0];p.type,Object.assign(l,a.evaluater.evaluateExpression(p.argument))}else xl(a,r.position);else{const u=s.name;let d;if(s.value&&typeof s.value=="object")if(s.value.data&&s.value.data.estree&&a.evaluater){const p=s.value.data.estree.body[0];p.type,d=a.evaluater.evaluateExpression(p.expression)}else xl(a,r.position);else d=s.value===null?!0:s.value;l[u]=d}return l}function fd(a,r){const l=[];let s=-1;const u=a.passKeys?new Map:av;for(;++s<r.children.length;){const d=r.children[s];let f;if(a.passKeys){const g=d.type==="element"?d.tagName:d.type==="mdxJsxFlowElement"||d.type==="mdxJsxTextElement"?d.name:void 0;if(g){const h=u.get(g)||0;f=g+"-"+h,u.set(g,h+1)}}const p=$g(a,d,f);p!==void 0&&l.push(p)}return l}function bv(a,r,l){const s=V4(a.schema,r);if(!(l==null||typeof l=="number"&&Number.isNaN(l))){if(Array.isArray(l)&&(l=s.commaSeparated?C4(l):Q4(l)),s.property==="style"){let u=typeof l=="object"?l:zv(a,String(l));return a.stylePropertyNameCase==="css"&&(u=vv(u)),["style",u]}return[a.elementAttributeNameCase==="react"&&s.space?X4[s.property]||s.property:s.attribute,l]}}function zv(a,r){try{return nv(r,{reactCompat:!0})}catch(l){if(a.ignoreInvalidStyle)return{};const s=l,u=new Hn("Cannot parse `style` attribute",{ancestors:a.ancestors,cause:s,ruleId:"style",source:"hast-util-to-jsx-runtime"});throw u.file=a.filePath||void 0,u.url=Jg+"#cannot-parse-style-attribute",u}}function ny(a,r,l){let s;if(!l)s={type:"Literal",value:r};else if(r.includes(".")){const u=r.split(".");let d=-1,f;for(;++d<u.length;){const p=Um(u[d])?{type:"Identifier",name:u[d]}:{type:"Literal",value:u[d]};f=f?{type:"MemberExpression",object:f,property:p,computed:!!(d&&p.type==="Literal"),optional:!1}:p}s=f}else s=Um(r)&&!/^[a-z]/.test(r)?{type:"Identifier",name:r}:{type:"Literal",value:r};if(s.type==="Literal"){const u=s.value;return ud.call(a.components,u)?a.components[u]:u}if(a.evaluater)return a.evaluater.evaluateExpression(s);xl(a)}function xl(a,r){const l=new Hn("Cannot handle MDX estrees without `createEvaluater`",{ancestors:a.ancestors,place:r,ruleId:"mdx-estree",source:"hast-util-to-jsx-runtime"});throw l.file=a.filePath||void 0,l.url=Jg+"#cannot-handle-mdx-estrees-without-createevaluater",l}function vv(a){const r={};let l;for(l in a)ud.call(a,l)&&(r[Sv(l)]=a[l]);return r}function Sv(a){let r=a.replace(iv,Ev);return r.slice(0,3)==="ms-"&&(r="-"+r),r}function Ev(a){return"-"+a.toLowerCase()}const Tu={action:["form"],cite:["blockquote","del","ins","q"],data:["object"],formAction:["button","input"],href:["a","area","base","link"],icon:["menuitem"],itemId:null,manifest:["html"],ping:["a","area"],poster:["video"],src:["audio","embed","iframe","img","input","script","source","track","video"]},xv={};function Dv(a,r){const l=xv,s=typeof l.includeImageAlt=="boolean"?l.includeImageAlt:!0,u=typeof l.includeHtml=="boolean"?l.includeHtml:!0;return ty(a,s,u)}function ty(a,r,l){if(Tv(a)){if("value"in a)return a.type==="html"&&!l?"":a.value;if(r&&"alt"in a&&a.alt)return a.alt;if("children"in a)return Gm(a.children,r,l)}return Array.isArray(a)?Gm(a,r,l):""}function Gm(a,r,l){const s=[];let u=-1;for(;++u<a.length;)s[u]=ty(a[u],r,l);return s.join("")}function Tv(a){return!!(a&&typeof a=="object")}const Qm=document.createElement("i");function pd(a){const r="&"+a+";";Qm.innerHTML=r;const l=Qm.textContent;return l.charCodeAt(l.length-1)===59&&a!=="semi"||l===r?!1:l}function Gt(a,r,l,s){const u=a.length;let d=0,f;if(r<0?r=-r>u?0:u+r:r=r>u?u:r,l=l>0?l:0,s.length<1e4)f=Array.from(s),f.unshift(r,l),a.splice(...f);else for(l&&a.splice(r,l);d<s.length;)f=s.slice(d,d+1e4),f.unshift(r,0),a.splice(...f),d+=1e4,r+=1e4}function It(a,r){return a.length>0?(Gt(a,a.length,0,r),a):r}const Km={}.hasOwnProperty;function Av(a){const r={};let l=-1;for(;++l<a.length;)wv(r,a[l]);return r}function wv(a,r){let l;for(l in r){const u=(Km.call(a,l)?a[l]:void 0)||(a[l]={}),d=r[l];let f;if(d)for(f in d){Km.call(u,f)||(u[f]=[]);const p=d[f];Rv(u[f],Array.isArray(p)?p:p?[p]:[])}}}function Rv(a,r){let l=-1;const s=[];for(;++l<r.length;)(r[l].add==="after"?a:s).push(r[l]);Gt(a,0,0,s)}function ay(a,r){const l=Number.parseInt(a,r);return l<9||l===11||l>13&&l<32||l>126&&l<160||l>55295&&l<57344||l>64975&&l<65008||(l&65535)===65535||(l&65535)===65534||l>1114111?"�":String.fromCodePoint(l)}function mr(a){return a.replace(/[\t\n\r ]+/g," ").replace(/^ | $/g,"").toLowerCase().toUpperCase()}const Yt=$a(/[A-Za-z]/),gt=$a(/[\dA-Za-z]/),kv=$a(/[#-'*+\--9=?A-Z^-~]/);function Yu(a){return a!==null&&(a<32||a===127)}const Gu=$a(/\d/),Iv=$a(/[\dA-Fa-f]/),Mv=$a(/[!-/:-@[-`{-~]/);function Re(a){return a!==null&&a<-2}function it(a){return a!==null&&(a<0||a===32)}function Qe(a){return a===-2||a===-1||a===32}const _v=$a(new RegExp("\\p{P}|\\p{S}","u")),Cv=$a(/\s/);function $a(a){return r;function r(l){return l!==null&&l>-1&&a.test(String.fromCharCode(l))}}function br(a){const r=[];let l=-1,s=0,u=0;for(;++l<a.length;){const d=a.charCodeAt(l);let f="";if(d===37&&gt(a.charCodeAt(l+1))&&gt(a.charCodeAt(l+2)))u=2;else if(d<128)/[!#$&-;=?-Z_a-z~]/.test(String.fromCharCode(d))||(f=String.fromCharCode(d));else if(d>55295&&d<57344){const p=a.charCodeAt(l+1);d<56320&&p>56319&&p<57344?(f=String.fromCharCode(d,p),u=1):f="�"}else f=String.fromCharCode(d);f&&(r.push(a.slice(s,l),encodeURIComponent(f)),s=l+u+1,f=""),u&&(l+=u,u=0)}return r.join("")+a.slice(s)}function un(a,r,l,s){const u=s?s-1:Number.POSITIVE_INFINITY;let d=0;return f;function f(g){return Qe(g)?(a.enter(l),p(g)):r(g)}function p(g){return Qe(g)&&d++<u?(a.consume(g),p):(a.exit(l),r(g))}}const Lv={tokenize:Ov};function Ov(a){const r=a.attempt(this.parser.constructs.contentInitial,s,u);let l;return r;function s(p){if(p===null){a.consume(p);return}return a.enter("lineEnding"),a.consume(p),a.exit("lineEnding"),un(a,r,"linePrefix")}function u(p){return a.enter("paragraph"),d(p)}function d(p){const g=a.enter("chunkText",{contentType:"text",previous:l});return l&&(l.next=g),l=g,f(p)}function f(p){if(p===null){a.exit("chunkText"),a.exit("paragraph"),a.consume(p);return}return Re(p)?(a.consume(p),a.exit("chunkText"),d):(a.consume(p),f)}}const Nv={tokenize:Wv},Fm={tokenize:Uv};function Wv(a){const r=this,l=[];let s=0,u,d,f;return p;function p(q){if(s<l.length){const de=l[s];return r.containerState=de[1],a.attempt(de[0].continuation,g,h)(q)}return h(q)}function g(q){if(s++,r.containerState._closeFlow){r.containerState._closeFlow=void 0,u&&G();const de=r.events.length;let ze=de,X;for(;ze--;)if(r.events[ze][0]==="exit"&&r.events[ze][1].type==="chunkFlow"){X=r.events[ze][1].end;break}P(s);let R=de;for(;R<r.events.length;)r.events[R][1].end={...X},R++;return Gt(r.events,ze+1,0,r.events.slice(de)),r.events.length=R,h(q)}return p(q)}function h(q){if(s===l.length){if(!u)return S(q);if(u.currentConstruct&&u.currentConstruct.concrete)return L(q);r.interrupt=!!(u.currentConstruct&&!u._gfmTableDynamicInterruptHack)}return r.containerState={},a.check(Fm,y,b)(q)}function y(q){return u&&G(),P(s),S(q)}function b(q){return r.parser.lazy[r.now().line]=s!==l.length,f=r.now().offset,L(q)}function S(q){return r.containerState={},a.attempt(Fm,v,L)(q)}function v(q){return s++,l.push([r.currentConstruct,r.containerState]),S(q)}function L(q){if(q===null){u&&G(),P(0),a.consume(q);return}return u=u||r.parser.flow(r.now()),a.enter("chunkFlow",{_tokenizer:u,contentType:"flow",previous:d}),N(q)}function N(q){if(q===null){H(a.exit("chunkFlow"),!0),P(0),a.consume(q);return}return Re(q)?(a.consume(q),H(a.exit("chunkFlow")),s=0,r.interrupt=void 0,p):(a.consume(q),N)}function H(q,de){const ze=r.sliceStream(q);if(de&&ze.push(null),q.previous=d,d&&(d.next=q),d=q,u.defineSkip(q.start),u.write(ze),r.parser.lazy[q.start.line]){let X=u.events.length;for(;X--;)if(u.events[X][1].start.offset<f&&(!u.events[X][1].end||u.events[X][1].end.offset>f))return;const R=r.events.length;let ne=R,he,ue;for(;ne--;)if(r.events[ne][0]==="exit"&&r.events[ne][1].type==="chunkFlow"){if(he){ue=r.events[ne][1].end;break}he=!0}for(P(s),X=R;X<r.events.length;)r.events[X][1].end={...ue},X++;Gt(r.events,ne+1,0,r.events.slice(R)),r.events.length=X}}function P(q){let de=l.length;for(;de-- >q;){const ze=l[de];r.containerState=ze[1],ze[0].exit.call(r,a)}l.length=q}function G(){u.write([null]),d=void 0,u=void 0,r.containerState._closeFlow=void 0}}function Uv(a,r,l){return un(a,a.attempt(this.parser.constructs.document,r,l),"linePrefix",this.parser.constructs.disable.null.includes("codeIndented")?void 0:4)}function Jm(a){if(a===null||it(a)||Cv(a))return 1;if(_v(a))return 2}function hd(a,r,l){const s=[];let u=-1;for(;++u<a.length;){const d=a[u].resolveAll;d&&!s.includes(d)&&(r=d(r,l),s.push(d))}return r}const Qu={name:"attention",resolveAll:Pv,tokenize:jv};function Pv(a,r){let l=-1,s,u,d,f,p,g,h,y;for(;++l<a.length;)if(a[l][0]==="enter"&&a[l][1].type==="attentionSequence"&&a[l][1]._close){for(s=l;s--;)if(a[s][0]==="exit"&&a[s][1].type==="attentionSequence"&&a[s][1]._open&&r.sliceSerialize(a[s][1]).charCodeAt(0)===r.sliceSerialize(a[l][1]).charCodeAt(0)){if((a[s][1]._close||a[l][1]._open)&&(a[l][1].end.offset-a[l][1].start.offset)%3&&!((a[s][1].end.offset-a[s][1].start.offset+a[l][1].end.offset-a[l][1].start.offset)%3))continue;g=a[s][1].end.offset-a[s][1].start.offset>1&&a[l][1].end.offset-a[l][1].start.offset>1?2:1;const b={...a[s][1].end},S={...a[l][1].start};$m(b,-g),$m(S,g),f={type:g>1?"strongSequence":"emphasisSequence",start:b,end:{...a[s][1].end}},p={type:g>1?"strongSequence":"emphasisSequence",start:{...a[l][1].start},end:S},d={type:g>1?"strongText":"emphasisText",start:{...a[s][1].end},end:{...a[l][1].start}},u={type:g>1?"strong":"emphasis",start:{...f.start},end:{...p.end}},a[s][1].end={...f.start},a[l][1].start={...p.end},h=[],a[s][1].end.offset-a[s][1].start.offset&&(h=It(h,[["enter",a[s][1],r],["exit",a[s][1],r]])),h=It(h,[["enter",u,r],["enter",f,r],["exit",f,r],["enter",d,r]]),h=It(h,hd(r.parser.constructs.insideSpan.null,a.slice(s+1,l),r)),h=It(h,[["exit",d,r],["enter",p,r],["exit",p,r],["exit",u,r]]),a[l][1].end.offset-a[l][1].start.offset?(y=2,h=It(h,[["enter",a[l][1],r],["exit",a[l][1],r]])):y=0,Gt(a,s-1,l-s+3,h),l=s+h.length-y-2;break}}for(l=-1;++l<a.length;)a[l][1].type==="attentionSequence"&&(a[l][1].type="data");return a}function jv(a,r){const l=this.parser.constructs.attentionMarkers.null,s=this.previous,u=Jm(s);let d;return f;function f(g){return d=g,a.enter("attentionSequence"),p(g)}function p(g){if(g===d)return a.consume(g),p;const h=a.exit("attentionSequence"),y=Jm(g),b=!y||y===2&&u||l.includes(g),S=!u||u===2&&y||l.includes(s);return h._open=!!(d===42?b:b&&(u||!S)),h._close=!!(d===42?S:S&&(y||!b)),r(g)}}function $m(a,r){a.column+=r,a.offset+=r,a._bufferIndex+=r}const Bv={name:"autolink",tokenize:Xv};function Xv(a,r,l){let s=0;return u;function u(v){return a.enter("autolink"),a.enter("autolinkMarker"),a.consume(v),a.exit("autolinkMarker"),a.enter("autolinkProtocol"),d}function d(v){return Yt(v)?(a.consume(v),f):v===64?l(v):h(v)}function f(v){return v===43||v===45||v===46||gt(v)?(s=1,p(v)):h(v)}function p(v){return v===58?(a.consume(v),s=0,g):(v===43||v===45||v===46||gt(v))&&s++<32?(a.consume(v),p):(s=0,h(v))}function g(v){return v===62?(a.exit("autolinkProtocol"),a.enter("autolinkMarker"),a.consume(v),a.exit("autolinkMarker"),a.exit("autolink"),r):v===null||v===32||v===60||Yu(v)?l(v):(a.consume(v),g)}function h(v){return v===64?(a.consume(v),y):kv(v)?(a.consume(v),h):l(v)}function y(v){return gt(v)?b(v):l(v)}function b(v){return v===46?(a.consume(v),s=0,y):v===62?(a.exit("autolinkProtocol").type="autolinkEmail",a.enter("autolinkMarker"),a.consume(v),a.exit("autolinkMarker"),a.exit("autolink"),r):S(v)}function S(v){if((v===45||gt(v))&&s++<63){const L=v===45?S:b;return a.consume(v),L}return l(v)}}const no={partial:!0,tokenize:Hv};function Hv(a,r,l){return s;function s(d){return Qe(d)?un(a,u,"linePrefix")(d):u(d)}function u(d){return d===null||Re(d)?r(d):l(d)}}const iy={continuation:{tokenize:Vv},exit:qv,name:"blockQuote",tokenize:Zv};function Zv(a,r,l){const s=this;return u;function u(f){if(f===62){const p=s.containerState;return p.open||(a.enter("blockQuote",{_container:!0}),p.open=!0),a.enter("blockQuotePrefix"),a.enter("blockQuoteMarker"),a.consume(f),a.exit("blockQuoteMarker"),d}return l(f)}function d(f){return Qe(f)?(a.enter("blockQuotePrefixWhitespace"),a.consume(f),a.exit("blockQuotePrefixWhitespace"),a.exit("blockQuotePrefix"),r):(a.exit("blockQuotePrefix"),r(f))}}function Vv(a,r,l){const s=this;return u;function u(f){return Qe(f)?un(a,d,"linePrefix",s.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(f):d(f)}function d(f){return a.attempt(iy,r,l)(f)}}function qv(a){a.exit("blockQuote")}const ry={name:"characterEscape",tokenize:Yv};function Yv(a,r,l){return s;function s(d){return a.enter("characterEscape"),a.enter("escapeMarker"),a.consume(d),a.exit("escapeMarker"),u}function u(d){return Mv(d)?(a.enter("characterEscapeValue"),a.consume(d),a.exit("characterEscapeValue"),a.exit("characterEscape"),r):l(d)}}const ly={name:"characterReference",tokenize:Gv};function Gv(a,r,l){const s=this;let u=0,d,f;return p;function p(b){return a.enter("characterReference"),a.enter("characterReferenceMarker"),a.consume(b),a.exit("characterReferenceMarker"),g}function g(b){return b===35?(a.enter("characterReferenceMarkerNumeric"),a.consume(b),a.exit("characterReferenceMarkerNumeric"),h):(a.enter("characterReferenceValue"),d=31,f=gt,y(b))}function h(b){return b===88||b===120?(a.enter("characterReferenceMarkerHexadecimal"),a.consume(b),a.exit("characterReferenceMarkerHexadecimal"),a.enter("characterReferenceValue"),d=6,f=Iv,y):(a.enter("characterReferenceValue"),d=7,f=Gu,y(b))}function y(b){if(b===59&&u){const S=a.exit("characterReferenceValue");return f===gt&&!pd(s.sliceSerialize(S))?l(b):(a.enter("characterReferenceMarker"),a.consume(b),a.exit("characterReferenceMarker"),a.exit("characterReference"),r)}return f(b)&&u++<d?(a.consume(b),y):l(b)}}const eg={partial:!0,tokenize:Kv},ng={concrete:!0,name:"codeFenced",tokenize:Qv};function Qv(a,r,l){const s=this,u={partial:!0,tokenize:ze};let d=0,f=0,p;return g;function g(X){return h(X)}function h(X){const R=s.events[s.events.length-1];return d=R&&R[1].type==="linePrefix"?R[2].sliceSerialize(R[1],!0).length:0,p=X,a.enter("codeFenced"),a.enter("codeFencedFence"),a.enter("codeFencedFenceSequence"),y(X)}function y(X){return X===p?(f++,a.consume(X),y):f<3?l(X):(a.exit("codeFencedFenceSequence"),Qe(X)?un(a,b,"whitespace")(X):b(X))}function b(X){return X===null||Re(X)?(a.exit("codeFencedFence"),s.interrupt?r(X):a.check(eg,N,de)(X)):(a.enter("codeFencedFenceInfo"),a.enter("chunkString",{contentType:"string"}),S(X))}function S(X){return X===null||Re(X)?(a.exit("chunkString"),a.exit("codeFencedFenceInfo"),b(X)):Qe(X)?(a.exit("chunkString"),a.exit("codeFencedFenceInfo"),un(a,v,"whitespace")(X)):X===96&&X===p?l(X):(a.consume(X),S)}function v(X){return X===null||Re(X)?b(X):(a.enter("codeFencedFenceMeta"),a.enter("chunkString",{contentType:"string"}),L(X))}function L(X){return X===null||Re(X)?(a.exit("chunkString"),a.exit("codeFencedFenceMeta"),b(X)):X===96&&X===p?l(X):(a.consume(X),L)}function N(X){return a.attempt(u,de,H)(X)}function H(X){return a.enter("lineEnding"),a.consume(X),a.exit("lineEnding"),P}function P(X){return d>0&&Qe(X)?un(a,G,"linePrefix",d+1)(X):G(X)}function G(X){return X===null||Re(X)?a.check(eg,N,de)(X):(a.enter("codeFlowValue"),q(X))}function q(X){return X===null||Re(X)?(a.exit("codeFlowValue"),G(X)):(a.consume(X),q)}function de(X){return a.exit("codeFenced"),r(X)}function ze(X,R,ne){let he=0;return ue;function ue(J){return X.enter("lineEnding"),X.consume(J),X.exit("lineEnding"),ae}function ae(J){return X.enter("codeFencedFence"),Qe(J)?un(X,ee,"linePrefix",s.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(J):ee(J)}function ee(J){return J===p?(X.enter("codeFencedFenceSequence"),Ae(J)):ne(J)}function Ae(J){return J===p?(he++,X.consume(J),Ae):he>=f?(X.exit("codeFencedFenceSequence"),Qe(J)?un(X,fe,"whitespace")(J):fe(J)):ne(J)}function fe(J){return J===null||Re(J)?(X.exit("codeFencedFence"),R(J)):ne(J)}}}function Kv(a,r,l){const s=this;return u;function u(f){return f===null?l(f):(a.enter("lineEnding"),a.consume(f),a.exit("lineEnding"),d)}function d(f){return s.parser.lazy[s.now().line]?l(f):r(f)}}const Au={name:"codeIndented",tokenize:Jv},Fv={partial:!0,tokenize:$v};function Jv(a,r,l){const s=this;return u;function u(h){return a.enter("codeIndented"),un(a,d,"linePrefix",5)(h)}function d(h){const y=s.events[s.events.length-1];return y&&y[1].type==="linePrefix"&&y[2].sliceSerialize(y[1],!0).length>=4?f(h):l(h)}function f(h){return h===null?g(h):Re(h)?a.attempt(Fv,f,g)(h):(a.enter("codeFlowValue"),p(h))}function p(h){return h===null||Re(h)?(a.exit("codeFlowValue"),f(h)):(a.consume(h),p)}function g(h){return a.exit("codeIndented"),r(h)}}function $v(a,r,l){const s=this;return u;function u(f){return s.parser.lazy[s.now().line]?l(f):Re(f)?(a.enter("lineEnding"),a.consume(f),a.exit("lineEnding"),u):un(a,d,"linePrefix",5)(f)}function d(f){const p=s.events[s.events.length-1];return p&&p[1].type==="linePrefix"&&p[2].sliceSerialize(p[1],!0).length>=4?r(f):Re(f)?u(f):l(f)}}const eS={name:"codeText",previous:tS,resolve:nS,tokenize:aS};function nS(a){let r=a.length-4,l=3,s,u;if((a[l][1].type==="lineEnding"||a[l][1].type==="space")&&(a[r][1].type==="lineEnding"||a[r][1].type==="space")){for(s=l;++s<r;)if(a[s][1].type==="codeTextData"){a[l][1].type="codeTextPadding",a[r][1].type="codeTextPadding",l+=2,r-=2;break}}for(s=l-1,r++;++s<=r;)u===void 0?s!==r&&a[s][1].type!=="lineEnding"&&(u=s):(s===r||a[s][1].type==="lineEnding")&&(a[u][1].type="codeTextData",s!==u+2&&(a[u][1].end=a[s-1][1].end,a.splice(u+2,s-u-2),r-=s-u-2,s=u+2),u=void 0);return a}function tS(a){return a!==96||this.events[this.events.length-1][1].type==="characterEscape"}function aS(a,r,l){let s=0,u,d;return f;function f(b){return a.enter("codeText"),a.enter("codeTextSequence"),p(b)}function p(b){return b===96?(a.consume(b),s++,p):(a.exit("codeTextSequence"),g(b))}function g(b){return b===null?l(b):b===32?(a.enter("space"),a.consume(b),a.exit("space"),g):b===96?(d=a.enter("codeTextSequence"),u=0,y(b)):Re(b)?(a.enter("lineEnding"),a.consume(b),a.exit("lineEnding"),g):(a.enter("codeTextData"),h(b))}function h(b){return b===null||b===32||b===96||Re(b)?(a.exit("codeTextData"),g(b)):(a.consume(b),h)}function y(b){return b===96?(a.consume(b),u++,y):u===s?(a.exit("codeTextSequence"),a.exit("codeText"),r(b)):(d.type="codeTextData",h(b))}}class iS{constructor(r){this.left=r?[...r]:[],this.right=[]}get(r){if(r<0||r>=this.left.length+this.right.length)throw new RangeError("Cannot access index `"+r+"` in a splice buffer of size `"+(this.left.length+this.right.length)+"`");return r<this.left.length?this.left[r]:this.right[this.right.length-r+this.left.length-1]}get length(){return this.left.length+this.right.length}shift(){return this.setCursor(0),this.right.pop()}slice(r,l){const s=l??Number.POSITIVE_INFINITY;return s<this.left.length?this.left.slice(r,s):r>this.left.length?this.right.slice(this.right.length-s+this.left.length,this.right.length-r+this.left.length).reverse():this.left.slice(r).concat(this.right.slice(this.right.length-s+this.left.length).reverse())}splice(r,l,s){const u=l||0;this.setCursor(Math.trunc(r));const d=this.right.splice(this.right.length-u,Number.POSITIVE_INFINITY);return s&&ml(this.left,s),d.reverse()}pop(){return this.setCursor(Number.POSITIVE_INFINITY),this.left.pop()}push(r){this.setCursor(Number.POSITIVE_INFINITY),this.left.push(r)}pushMany(r){this.setCursor(Number.POSITIVE_INFINITY),ml(this.left,r)}unshift(r){this.setCursor(0),this.right.push(r)}unshiftMany(r){this.setCursor(0),ml(this.right,r.reverse())}setCursor(r){if(!(r===this.left.length||r>this.left.length&&this.right.length===0||r<0&&this.left.length===0))if(r<this.left.length){const l=this.left.splice(r,Number.POSITIVE_INFINITY);ml(this.right,l.reverse())}else{const l=this.right.splice(this.left.length+this.right.length-r,Number.POSITIVE_INFINITY);ml(this.left,l.reverse())}}}function ml(a,r){let l=0;if(r.length<1e4)a.push(...r);else for(;l<r.length;)a.push(...r.slice(l,l+1e4)),l+=1e4}function sy(a){const r={};let l=-1,s,u,d,f,p,g,h;const y=new iS(a);for(;++l<y.length;){for(;l in r;)l=r[l];if(s=y.get(l),l&&s[1].type==="chunkFlow"&&y.get(l-1)[1].type==="listItemPrefix"&&(g=s[1]._tokenizer.events,d=0,d<g.length&&g[d][1].type==="lineEndingBlank"&&(d+=2),d<g.length&&g[d][1].type==="content"))for(;++d<g.length&&g[d][1].type!=="content";)g[d][1].type==="chunkText"&&(g[d][1]._isInFirstContentOfListItem=!0,d++);if(s[0]==="enter")s[1].contentType&&(Object.assign(r,rS(y,l)),l=r[l],h=!0);else if(s[1]._container){for(d=l,u=void 0;d--;)if(f=y.get(d),f[1].type==="lineEnding"||f[1].type==="lineEndingBlank")f[0]==="enter"&&(u&&(y.get(u)[1].type="lineEndingBlank"),f[1].type="lineEnding",u=d);else if(!(f[1].type==="linePrefix"||f[1].type==="listItemIndent"))break;u&&(s[1].end={...y.get(u)[1].start},p=y.slice(u,l),p.unshift(s),y.splice(u,l-u+1,p))}}return Gt(a,0,Number.POSITIVE_INFINITY,y.slice(0)),!h}function rS(a,r){const l=a.get(r)[1],s=a.get(r)[2];let u=r-1;const d=[];let f=l._tokenizer;f||(f=s.parser[l.contentType](l.start),l._contentTypeTextTrailing&&(f._contentTypeTextTrailing=!0));const p=f.events,g=[],h={};let y,b,S=-1,v=l,L=0,N=0;const H=[N];for(;v;){for(;a.get(++u)[1]!==v;);d.push(u),v._tokenizer||(y=s.sliceStream(v),v.next||y.push(null),b&&f.defineSkip(v.start),v._isInFirstContentOfListItem&&(f._gfmTasklistFirstContentOfListItem=!0),f.write(y),v._isInFirstContentOfListItem&&(f._gfmTasklistFirstContentOfListItem=void 0)),b=v,v=v.next}for(v=l;++S<p.length;)p[S][0]==="exit"&&p[S-1][0]==="enter"&&p[S][1].type===p[S-1][1].type&&p[S][1].start.line!==p[S][1].end.line&&(N=S+1,H.push(N),v._tokenizer=void 0,v.previous=void 0,v=v.next);for(f.events=[],v?(v._tokenizer=void 0,v.previous=void 0):H.pop(),S=H.length;S--;){const P=p.slice(H[S],H[S+1]),G=d.pop();g.push([G,G+P.length-1]),a.splice(G,2,P)}for(g.reverse(),S=-1;++S<g.length;)h[L+g[S][0]]=L+g[S][1],L+=g[S][1]-g[S][0]-1;return h}const lS={resolve:oS,tokenize:cS},sS={partial:!0,tokenize:uS};function oS(a){return sy(a),a}function cS(a,r){let l;return s;function s(p){return a.enter("content"),l=a.enter("chunkContent",{contentType:"content"}),u(p)}function u(p){return p===null?d(p):Re(p)?a.check(sS,f,d)(p):(a.consume(p),u)}function d(p){return a.exit("chunkContent"),a.exit("content"),r(p)}function f(p){return a.consume(p),a.exit("chunkContent"),l.next=a.enter("chunkContent",{contentType:"content",previous:l}),l=l.next,u}}function uS(a,r,l){const s=this;return u;function u(f){return a.exit("chunkContent"),a.enter("lineEnding"),a.consume(f),a.exit("lineEnding"),un(a,d,"linePrefix")}function d(f){if(f===null||Re(f))return l(f);const p=s.events[s.events.length-1];return!s.parser.constructs.disable.null.includes("codeIndented")&&p&&p[1].type==="linePrefix"&&p[2].sliceSerialize(p[1],!0).length>=4?r(f):a.interrupt(s.parser.constructs.flow,l,r)(f)}}function oy(a,r,l,s,u,d,f,p,g){const h=g||Number.POSITIVE_INFINITY;let y=0;return b;function b(P){return P===60?(a.enter(s),a.enter(u),a.enter(d),a.consume(P),a.exit(d),S):P===null||P===32||P===41||Yu(P)?l(P):(a.enter(s),a.enter(f),a.enter(p),a.enter("chunkString",{contentType:"string"}),N(P))}function S(P){return P===62?(a.enter(d),a.consume(P),a.exit(d),a.exit(u),a.exit(s),r):(a.enter(p),a.enter("chunkString",{contentType:"string"}),v(P))}function v(P){return P===62?(a.exit("chunkString"),a.exit(p),S(P)):P===null||P===60||Re(P)?l(P):(a.consume(P),P===92?L:v)}function L(P){return P===60||P===62||P===92?(a.consume(P),v):v(P)}function N(P){return!y&&(P===null||P===41||it(P))?(a.exit("chunkString"),a.exit(p),a.exit(f),a.exit(s),r(P)):y<h&&P===40?(a.consume(P),y++,N):P===41?(a.consume(P),y--,N):P===null||P===32||P===40||Yu(P)?l(P):(a.consume(P),P===92?H:N)}function H(P){return P===40||P===41||P===92?(a.consume(P),N):N(P)}}function cy(a,r,l,s,u,d){const f=this;let p=0,g;return h;function h(v){return a.enter(s),a.enter(u),a.consume(v),a.exit(u),a.enter(d),y}function y(v){return p>999||v===null||v===91||v===93&&!g||v===94&&!p&&"_hiddenFootnoteSupport"in f.parser.constructs?l(v):v===93?(a.exit(d),a.enter(u),a.consume(v),a.exit(u),a.exit(s),r):Re(v)?(a.enter("lineEnding"),a.consume(v),a.exit("lineEnding"),y):(a.enter("chunkString",{contentType:"string"}),b(v))}function b(v){return v===null||v===91||v===93||Re(v)||p++>999?(a.exit("chunkString"),y(v)):(a.consume(v),g||(g=!Qe(v)),v===92?S:b)}function S(v){return v===91||v===92||v===93?(a.consume(v),p++,b):b(v)}}function uy(a,r,l,s,u,d){let f;return p;function p(S){return S===34||S===39||S===40?(a.enter(s),a.enter(u),a.consume(S),a.exit(u),f=S===40?41:S,g):l(S)}function g(S){return S===f?(a.enter(u),a.consume(S),a.exit(u),a.exit(s),r):(a.enter(d),h(S))}function h(S){return S===f?(a.exit(d),g(f)):S===null?l(S):Re(S)?(a.enter("lineEnding"),a.consume(S),a.exit("lineEnding"),un(a,h,"linePrefix")):(a.enter("chunkString",{contentType:"string"}),y(S))}function y(S){return S===f||S===null||Re(S)?(a.exit("chunkString"),h(S)):(a.consume(S),S===92?b:y)}function b(S){return S===f||S===92?(a.consume(S),y):y(S)}}function zl(a,r){let l;return s;function s(u){return Re(u)?(a.enter("lineEnding"),a.consume(u),a.exit("lineEnding"),l=!0,s):Qe(u)?un(a,s,l?"linePrefix":"lineSuffix")(u):r(u)}}const dS={name:"definition",tokenize:pS},fS={partial:!0,tokenize:hS};function pS(a,r,l){const s=this;let u;return d;function d(v){return a.enter("definition"),f(v)}function f(v){return cy.call(s,a,p,l,"definitionLabel","definitionLabelMarker","definitionLabelString")(v)}function p(v){return u=mr(s.sliceSerialize(s.events[s.events.length-1][1]).slice(1,-1)),v===58?(a.enter("definitionMarker"),a.consume(v),a.exit("definitionMarker"),g):l(v)}function g(v){return it(v)?zl(a,h)(v):h(v)}function h(v){return oy(a,y,l,"definitionDestination","definitionDestinationLiteral","definitionDestinationLiteralMarker","definitionDestinationRaw","definitionDestinationString")(v)}function y(v){return a.attempt(fS,b,b)(v)}function b(v){return Qe(v)?un(a,S,"whitespace")(v):S(v)}function S(v){return v===null||Re(v)?(a.exit("definition"),s.parser.defined.push(u),r(v)):l(v)}}function hS(a,r,l){return s;function s(p){return it(p)?zl(a,u)(p):l(p)}function u(p){return uy(a,d,l,"definitionTitle","definitionTitleMarker","definitionTitleString")(p)}function d(p){return Qe(p)?un(a,f,"whitespace")(p):f(p)}function f(p){return p===null||Re(p)?r(p):l(p)}}const mS={name:"hardBreakEscape",tokenize:gS};function gS(a,r,l){return s;function s(d){return a.enter("hardBreakEscape"),a.consume(d),u}function u(d){return Re(d)?(a.exit("hardBreakEscape"),r(d)):l(d)}}const yS={name:"headingAtx",resolve:bS,tokenize:zS};function bS(a,r){let l=a.length-2,s=3,u,d;return a[s][1].type==="whitespace"&&(s+=2),l-2>s&&a[l][1].type==="whitespace"&&(l-=2),a[l][1].type==="atxHeadingSequence"&&(s===l-1||l-4>s&&a[l-2][1].type==="whitespace")&&(l-=s+1===l?2:4),l>s&&(u={type:"atxHeadingText",start:a[s][1].start,end:a[l][1].end},d={type:"chunkText",start:a[s][1].start,end:a[l][1].end,contentType:"text"},Gt(a,s,l-s+1,[["enter",u,r],["enter",d,r],["exit",d,r],["exit",u,r]])),a}function zS(a,r,l){let s=0;return u;function u(y){return a.enter("atxHeading"),d(y)}function d(y){return a.enter("atxHeadingSequence"),f(y)}function f(y){return y===35&&s++<6?(a.consume(y),f):y===null||it(y)?(a.exit("atxHeadingSequence"),p(y)):l(y)}function p(y){return y===35?(a.enter("atxHeadingSequence"),g(y)):y===null||Re(y)?(a.exit("atxHeading"),r(y)):Qe(y)?un(a,p,"whitespace")(y):(a.enter("atxHeadingText"),h(y))}function g(y){return y===35?(a.consume(y),g):(a.exit("atxHeadingSequence"),p(y))}function h(y){return y===null||y===35||it(y)?(a.exit("atxHeadingText"),p(y)):(a.consume(y),h)}}const vS=["address","article","aside","base","basefont","blockquote","body","caption","center","col","colgroup","dd","details","dialog","dir","div","dl","dt","fieldset","figcaption","figure","footer","form","frame","frameset","h1","h2","h3","h4","h5","h6","head","header","hr","html","iframe","legend","li","link","main","menu","menuitem","nav","noframes","ol","optgroup","option","p","param","search","section","summary","table","tbody","td","tfoot","th","thead","title","tr","track","ul"],tg=["pre","script","style","textarea"],SS={concrete:!0,name:"htmlFlow",resolveTo:DS,tokenize:TS},ES={partial:!0,tokenize:wS},xS={partial:!0,tokenize:AS};function DS(a){let r=a.length;for(;r--&&!(a[r][0]==="enter"&&a[r][1].type==="htmlFlow"););return r>1&&a[r-2][1].type==="linePrefix"&&(a[r][1].start=a[r-2][1].start,a[r+1][1].start=a[r-2][1].start,a.splice(r-2,2)),a}function TS(a,r,l){const s=this;let u,d,f,p,g;return h;function h(E){return y(E)}function y(E){return a.enter("htmlFlow"),a.enter("htmlFlowData"),a.consume(E),b}function b(E){return E===33?(a.consume(E),S):E===47?(a.consume(E),d=!0,N):E===63?(a.consume(E),u=3,s.interrupt?r:x):Yt(E)?(a.consume(E),f=String.fromCharCode(E),H):l(E)}function S(E){return E===45?(a.consume(E),u=2,v):E===91?(a.consume(E),u=5,p=0,L):Yt(E)?(a.consume(E),u=4,s.interrupt?r:x):l(E)}function v(E){return E===45?(a.consume(E),s.interrupt?r:x):l(E)}function L(E){const ie="CDATA[";return E===ie.charCodeAt(p++)?(a.consume(E),p===ie.length?s.interrupt?r:ee:L):l(E)}function N(E){return Yt(E)?(a.consume(E),f=String.fromCharCode(E),H):l(E)}function H(E){if(E===null||E===47||E===62||it(E)){const ie=E===47,be=f.toLowerCase();return!ie&&!d&&tg.includes(be)?(u=1,s.interrupt?r(E):ee(E)):vS.includes(f.toLowerCase())?(u=6,ie?(a.consume(E),P):s.interrupt?r(E):ee(E)):(u=7,s.interrupt&&!s.parser.lazy[s.now().line]?l(E):d?G(E):q(E))}return E===45||gt(E)?(a.consume(E),f+=String.fromCharCode(E),H):l(E)}function P(E){return E===62?(a.consume(E),s.interrupt?r:ee):l(E)}function G(E){return Qe(E)?(a.consume(E),G):ue(E)}function q(E){return E===47?(a.consume(E),ue):E===58||E===95||Yt(E)?(a.consume(E),de):Qe(E)?(a.consume(E),q):ue(E)}function de(E){return E===45||E===46||E===58||E===95||gt(E)?(a.consume(E),de):ze(E)}function ze(E){return E===61?(a.consume(E),X):Qe(E)?(a.consume(E),ze):q(E)}function X(E){return E===null||E===60||E===61||E===62||E===96?l(E):E===34||E===39?(a.consume(E),g=E,R):Qe(E)?(a.consume(E),X):ne(E)}function R(E){return E===g?(a.consume(E),g=null,he):E===null||Re(E)?l(E):(a.consume(E),R)}function ne(E){return E===null||E===34||E===39||E===47||E===60||E===61||E===62||E===96||it(E)?ze(E):(a.consume(E),ne)}function he(E){return E===47||E===62||Qe(E)?q(E):l(E)}function ue(E){return E===62?(a.consume(E),ae):l(E)}function ae(E){return E===null||Re(E)?ee(E):Qe(E)?(a.consume(E),ae):l(E)}function ee(E){return E===45&&u===2?(a.consume(E),C):E===60&&u===1?(a.consume(E),K):E===62&&u===4?(a.consume(E),T):E===63&&u===3?(a.consume(E),x):E===93&&u===5?(a.consume(E),_e):Re(E)&&(u===6||u===7)?(a.exit("htmlFlowData"),a.check(ES,j,Ae)(E)):E===null||Re(E)?(a.exit("htmlFlowData"),Ae(E)):(a.consume(E),ee)}function Ae(E){return a.check(xS,fe,j)(E)}function fe(E){return a.enter("lineEnding"),a.consume(E),a.exit("lineEnding"),J}function J(E){return E===null||Re(E)?Ae(E):(a.enter("htmlFlowData"),ee(E))}function C(E){return E===45?(a.consume(E),x):ee(E)}function K(E){return E===47?(a.consume(E),f="",le):ee(E)}function le(E){if(E===62){const ie=f.toLowerCase();return tg.includes(ie)?(a.consume(E),T):ee(E)}return Yt(E)&&f.length<8?(a.consume(E),f+=String.fromCharCode(E),le):ee(E)}function _e(E){return E===93?(a.consume(E),x):ee(E)}function x(E){return E===62?(a.consume(E),T):E===45&&u===2?(a.consume(E),x):ee(E)}function T(E){return E===null||Re(E)?(a.exit("htmlFlowData"),j(E)):(a.consume(E),T)}function j(E){return a.exit("htmlFlow"),r(E)}}function AS(a,r,l){const s=this;return u;function u(f){return Re(f)?(a.enter("lineEnding"),a.consume(f),a.exit("lineEnding"),d):l(f)}function d(f){return s.parser.lazy[s.now().line]?l(f):r(f)}}function wS(a,r,l){return s;function s(u){return a.enter("lineEnding"),a.consume(u),a.exit("lineEnding"),a.attempt(no,r,l)}}const RS={name:"htmlText",tokenize:kS};function kS(a,r,l){const s=this;let u,d,f;return p;function p(x){return a.enter("htmlText"),a.enter("htmlTextData"),a.consume(x),g}function g(x){return x===33?(a.consume(x),h):x===47?(a.consume(x),ze):x===63?(a.consume(x),q):Yt(x)?(a.consume(x),ne):l(x)}function h(x){return x===45?(a.consume(x),y):x===91?(a.consume(x),d=0,L):Yt(x)?(a.consume(x),G):l(x)}function y(x){return x===45?(a.consume(x),v):l(x)}function b(x){return x===null?l(x):x===45?(a.consume(x),S):Re(x)?(f=b,K(x)):(a.consume(x),b)}function S(x){return x===45?(a.consume(x),v):b(x)}function v(x){return x===62?C(x):x===45?S(x):b(x)}function L(x){const T="CDATA[";return x===T.charCodeAt(d++)?(a.consume(x),d===T.length?N:L):l(x)}function N(x){return x===null?l(x):x===93?(a.consume(x),H):Re(x)?(f=N,K(x)):(a.consume(x),N)}function H(x){return x===93?(a.consume(x),P):N(x)}function P(x){return x===62?C(x):x===93?(a.consume(x),P):N(x)}function G(x){return x===null||x===62?C(x):Re(x)?(f=G,K(x)):(a.consume(x),G)}function q(x){return x===null?l(x):x===63?(a.consume(x),de):Re(x)?(f=q,K(x)):(a.consume(x),q)}function de(x){return x===62?C(x):q(x)}function ze(x){return Yt(x)?(a.consume(x),X):l(x)}function X(x){return x===45||gt(x)?(a.consume(x),X):R(x)}function R(x){return Re(x)?(f=R,K(x)):Qe(x)?(a.consume(x),R):C(x)}function ne(x){return x===45||gt(x)?(a.consume(x),ne):x===47||x===62||it(x)?he(x):l(x)}function he(x){return x===47?(a.consume(x),C):x===58||x===95||Yt(x)?(a.consume(x),ue):Re(x)?(f=he,K(x)):Qe(x)?(a.consume(x),he):C(x)}function ue(x){return x===45||x===46||x===58||x===95||gt(x)?(a.consume(x),ue):ae(x)}function ae(x){return x===61?(a.consume(x),ee):Re(x)?(f=ae,K(x)):Qe(x)?(a.consume(x),ae):he(x)}function ee(x){return x===null||x===60||x===61||x===62||x===96?l(x):x===34||x===39?(a.consume(x),u=x,Ae):Re(x)?(f=ee,K(x)):Qe(x)?(a.consume(x),ee):(a.consume(x),fe)}function Ae(x){return x===u?(a.consume(x),u=void 0,J):x===null?l(x):Re(x)?(f=Ae,K(x)):(a.consume(x),Ae)}function fe(x){return x===null||x===34||x===39||x===60||x===61||x===96?l(x):x===47||x===62||it(x)?he(x):(a.consume(x),fe)}function J(x){return x===47||x===62||it(x)?he(x):l(x)}function C(x){return x===62?(a.consume(x),a.exit("htmlTextData"),a.exit("htmlText"),r):l(x)}function K(x){return a.exit("htmlTextData"),a.enter("lineEnding"),a.consume(x),a.exit("lineEnding"),le}function le(x){return Qe(x)?un(a,_e,"linePrefix",s.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(x):_e(x)}function _e(x){return a.enter("htmlTextData"),f(x)}}const md={name:"labelEnd",resolveAll:CS,resolveTo:LS,tokenize:OS},IS={tokenize:NS},MS={tokenize:WS},_S={tokenize:US};function CS(a){let r=-1;const l=[];for(;++r<a.length;){const s=a[r][1];if(l.push(a[r]),s.type==="labelImage"||s.type==="labelLink"||s.type==="labelEnd"){const u=s.type==="labelImage"?4:2;s.type="data",r+=u}}return a.length!==l.length&&Gt(a,0,a.length,l),a}function LS(a,r){let l=a.length,s=0,u,d,f,p;for(;l--;)if(u=a[l][1],d){if(u.type==="link"||u.type==="labelLink"&&u._inactive)break;a[l][0]==="enter"&&u.type==="labelLink"&&(u._inactive=!0)}else if(f){if(a[l][0]==="enter"&&(u.type==="labelImage"||u.type==="labelLink")&&!u._balanced&&(d=l,u.type!=="labelLink")){s=2;break}}else u.type==="labelEnd"&&(f=l);const g={type:a[d][1].type==="labelLink"?"link":"image",start:{...a[d][1].start},end:{...a[a.length-1][1].end}},h={type:"label",start:{...a[d][1].start},end:{...a[f][1].end}},y={type:"labelText",start:{...a[d+s+2][1].end},end:{...a[f-2][1].start}};return p=[["enter",g,r],["enter",h,r]],p=It(p,a.slice(d+1,d+s+3)),p=It(p,[["enter",y,r]]),p=It(p,hd(r.parser.constructs.insideSpan.null,a.slice(d+s+4,f-3),r)),p=It(p,[["exit",y,r],a[f-2],a[f-1],["exit",h,r]]),p=It(p,a.slice(f+1)),p=It(p,[["exit",g,r]]),Gt(a,d,a.length,p),a}function OS(a,r,l){const s=this;let u=s.events.length,d,f;for(;u--;)if((s.events[u][1].type==="labelImage"||s.events[u][1].type==="labelLink")&&!s.events[u][1]._balanced){d=s.events[u][1];break}return p;function p(S){return d?d._inactive?b(S):(f=s.parser.defined.includes(mr(s.sliceSerialize({start:d.end,end:s.now()}))),a.enter("labelEnd"),a.enter("labelMarker"),a.consume(S),a.exit("labelMarker"),a.exit("labelEnd"),g):l(S)}function g(S){return S===40?a.attempt(IS,y,f?y:b)(S):S===91?a.attempt(MS,y,f?h:b)(S):f?y(S):b(S)}function h(S){return a.attempt(_S,y,b)(S)}function y(S){return r(S)}function b(S){return d._balanced=!0,l(S)}}function NS(a,r,l){return s;function s(b){return a.enter("resource"),a.enter("resourceMarker"),a.consume(b),a.exit("resourceMarker"),u}function u(b){return it(b)?zl(a,d)(b):d(b)}function d(b){return b===41?y(b):oy(a,f,p,"resourceDestination","resourceDestinationLiteral","resourceDestinationLiteralMarker","resourceDestinationRaw","resourceDestinationString",32)(b)}function f(b){return it(b)?zl(a,g)(b):y(b)}function p(b){return l(b)}function g(b){return b===34||b===39||b===40?uy(a,h,l,"resourceTitle","resourceTitleMarker","resourceTitleString")(b):y(b)}function h(b){return it(b)?zl(a,y)(b):y(b)}function y(b){return b===41?(a.enter("resourceMarker"),a.consume(b),a.exit("resourceMarker"),a.exit("resource"),r):l(b)}}function WS(a,r,l){const s=this;return u;function u(p){return cy.call(s,a,d,f,"reference","referenceMarker","referenceString")(p)}function d(p){return s.parser.defined.includes(mr(s.sliceSerialize(s.events[s.events.length-1][1]).slice(1,-1)))?r(p):l(p)}function f(p){return l(p)}}function US(a,r,l){return s;function s(d){return a.enter("reference"),a.enter("referenceMarker"),a.consume(d),a.exit("referenceMarker"),u}function u(d){return d===93?(a.enter("referenceMarker"),a.consume(d),a.exit("referenceMarker"),a.exit("reference"),r):l(d)}}const PS={name:"labelStartImage",resolveAll:md.resolveAll,tokenize:jS};function jS(a,r,l){const s=this;return u;function u(p){return a.enter("labelImage"),a.enter("labelImageMarker"),a.consume(p),a.exit("labelImageMarker"),d}function d(p){return p===91?(a.enter("labelMarker"),a.consume(p),a.exit("labelMarker"),a.exit("labelImage"),f):l(p)}function f(p){return p===94&&"_hiddenFootnoteSupport"in s.parser.constructs?l(p):r(p)}}const BS={name:"labelStartLink",resolveAll:md.resolveAll,tokenize:XS};function XS(a,r,l){const s=this;return u;function u(f){return a.enter("labelLink"),a.enter("labelMarker"),a.consume(f),a.exit("labelMarker"),a.exit("labelLink"),d}function d(f){return f===94&&"_hiddenFootnoteSupport"in s.parser.constructs?l(f):r(f)}}const wu={name:"lineEnding",tokenize:HS};function HS(a,r){return l;function l(s){return a.enter("lineEnding"),a.consume(s),a.exit("lineEnding"),un(a,r,"linePrefix")}}const Vs={name:"thematicBreak",tokenize:ZS};function ZS(a,r,l){let s=0,u;return d;function d(h){return a.enter("thematicBreak"),f(h)}function f(h){return u=h,p(h)}function p(h){return h===u?(a.enter("thematicBreakSequence"),g(h)):s>=3&&(h===null||Re(h))?(a.exit("thematicBreak"),r(h)):l(h)}function g(h){return h===u?(a.consume(h),s++,g):(a.exit("thematicBreakSequence"),Qe(h)?un(a,p,"whitespace")(h):p(h))}}const tt={continuation:{tokenize:GS},exit:KS,name:"list",tokenize:YS},VS={partial:!0,tokenize:FS},qS={partial:!0,tokenize:QS};function YS(a,r,l){const s=this,u=s.events[s.events.length-1];let d=u&&u[1].type==="linePrefix"?u[2].sliceSerialize(u[1],!0).length:0,f=0;return p;function p(v){const L=s.containerState.type||(v===42||v===43||v===45?"listUnordered":"listOrdered");if(L==="listUnordered"?!s.containerState.marker||v===s.containerState.marker:Gu(v)){if(s.containerState.type||(s.containerState.type=L,a.enter(L,{_container:!0})),L==="listUnordered")return a.enter("listItemPrefix"),v===42||v===45?a.check(Vs,l,h)(v):h(v);if(!s.interrupt||v===49)return a.enter("listItemPrefix"),a.enter("listItemValue"),g(v)}return l(v)}function g(v){return Gu(v)&&++f<10?(a.consume(v),g):(!s.interrupt||f<2)&&(s.containerState.marker?v===s.containerState.marker:v===41||v===46)?(a.exit("listItemValue"),h(v)):l(v)}function h(v){return a.enter("listItemMarker"),a.consume(v),a.exit("listItemMarker"),s.containerState.marker=s.containerState.marker||v,a.check(no,s.interrupt?l:y,a.attempt(VS,S,b))}function y(v){return s.containerState.initialBlankLine=!0,d++,S(v)}function b(v){return Qe(v)?(a.enter("listItemPrefixWhitespace"),a.consume(v),a.exit("listItemPrefixWhitespace"),S):l(v)}function S(v){return s.containerState.size=d+s.sliceSerialize(a.exit("listItemPrefix"),!0).length,r(v)}}function GS(a,r,l){const s=this;return s.containerState._closeFlow=void 0,a.check(no,u,d);function u(p){return s.containerState.furtherBlankLines=s.containerState.furtherBlankLines||s.containerState.initialBlankLine,un(a,r,"listItemIndent",s.containerState.size+1)(p)}function d(p){return s.containerState.furtherBlankLines||!Qe(p)?(s.containerState.furtherBlankLines=void 0,s.containerState.initialBlankLine=void 0,f(p)):(s.containerState.furtherBlankLines=void 0,s.containerState.initialBlankLine=void 0,a.attempt(qS,r,f)(p))}function f(p){return s.containerState._closeFlow=!0,s.interrupt=void 0,un(a,a.attempt(tt,r,l),"linePrefix",s.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(p)}}function QS(a,r,l){const s=this;return un(a,u,"listItemIndent",s.containerState.size+1);function u(d){const f=s.events[s.events.length-1];return f&&f[1].type==="listItemIndent"&&f[2].sliceSerialize(f[1],!0).length===s.containerState.size?r(d):l(d)}}function KS(a){a.exit(this.containerState.type)}function FS(a,r,l){const s=this;return un(a,u,"listItemPrefixWhitespace",s.parser.constructs.disable.null.includes("codeIndented")?void 0:5);function u(d){const f=s.events[s.events.length-1];return!Qe(d)&&f&&f[1].type==="listItemPrefixWhitespace"?r(d):l(d)}}const ag={name:"setextUnderline",resolveTo:JS,tokenize:$S};function JS(a,r){let l=a.length,s,u,d;for(;l--;)if(a[l][0]==="enter"){if(a[l][1].type==="content"){s=l;break}a[l][1].type==="paragraph"&&(u=l)}else a[l][1].type==="content"&&a.splice(l,1),!d&&a[l][1].type==="definition"&&(d=l);const f={type:"setextHeading",start:{...a[s][1].start},end:{...a[a.length-1][1].end}};return a[u][1].type="setextHeadingText",d?(a.splice(u,0,["enter",f,r]),a.splice(d+1,0,["exit",a[s][1],r]),a[s][1].end={...a[d][1].end}):a[s][1]=f,a.push(["exit",f,r]),a}function $S(a,r,l){const s=this;let u;return d;function d(h){let y=s.events.length,b;for(;y--;)if(s.events[y][1].type!=="lineEnding"&&s.events[y][1].type!=="linePrefix"&&s.events[y][1].type!=="content"){b=s.events[y][1].type==="paragraph";break}return!s.parser.lazy[s.now().line]&&(s.interrupt||b)?(a.enter("setextHeadingLine"),u=h,f(h)):l(h)}function f(h){return a.enter("setextHeadingLineSequence"),p(h)}function p(h){return h===u?(a.consume(h),p):(a.exit("setextHeadingLineSequence"),Qe(h)?un(a,g,"lineSuffix")(h):g(h))}function g(h){return h===null||Re(h)?(a.exit("setextHeadingLine"),r(h)):l(h)}}const e1={tokenize:n1};function n1(a){const r=this,l=a.attempt(no,s,a.attempt(this.parser.constructs.flowInitial,u,un(a,a.attempt(this.parser.constructs.flow,u,a.attempt(lS,u)),"linePrefix")));return l;function s(d){if(d===null){a.consume(d);return}return a.enter("lineEndingBlank"),a.consume(d),a.exit("lineEndingBlank"),r.currentConstruct=void 0,l}function u(d){if(d===null){a.consume(d);return}return a.enter("lineEnding"),a.consume(d),a.exit("lineEnding"),r.currentConstruct=void 0,l}}const t1={resolveAll:fy()},a1=dy("string"),i1=dy("text");function dy(a){return{resolveAll:fy(a==="text"?r1:void 0),tokenize:r};function r(l){const s=this,u=this.parser.constructs[a],d=l.attempt(u,f,p);return f;function f(y){return h(y)?d(y):p(y)}function p(y){if(y===null){l.consume(y);return}return l.enter("data"),l.consume(y),g}function g(y){return h(y)?(l.exit("data"),d(y)):(l.consume(y),g)}function h(y){if(y===null)return!0;const b=u[y];let S=-1;if(b)for(;++S<b.length;){const v=b[S];if(!v.previous||v.previous.call(s,s.previous))return!0}return!1}}}function fy(a){return r;function r(l,s){let u=-1,d;for(;++u<=l.length;)d===void 0?l[u]&&l[u][1].type==="data"&&(d=u,u++):(!l[u]||l[u][1].type!=="data")&&(u!==d+2&&(l[d][1].end=l[u-1][1].end,l.splice(d+2,u-d-2),u=d+2),d=void 0);return a?a(l,s):l}}function r1(a,r){let l=0;for(;++l<=a.length;)if((l===a.length||a[l][1].type==="lineEnding")&&a[l-1][1].type==="data"){const s=a[l-1][1],u=r.sliceStream(s);let d=u.length,f=-1,p=0,g;for(;d--;){const h=u[d];if(typeof h=="string"){for(f=h.length;h.charCodeAt(f-1)===32;)p++,f--;if(f)break;f=-1}else if(h===-2)g=!0,p++;else if(h!==-1){d++;break}}if(r._contentTypeTextTrailing&&l===a.length&&(p=0),p){const h={type:l===a.length||g||p<2?"lineSuffix":"hardBreakTrailing",start:{_bufferIndex:d?f:s.start._bufferIndex+f,_index:s.start._index+d,line:s.end.line,column:s.end.column-p,offset:s.end.offset-p},end:{...s.end}};s.end={...h.start},s.start.offset===s.end.offset?Object.assign(s,h):(a.splice(l,0,["enter",h,r],["exit",h,r]),l+=2)}l++}return a}const l1={42:tt,43:tt,45:tt,48:tt,49:tt,50:tt,51:tt,52:tt,53:tt,54:tt,55:tt,56:tt,57:tt,62:iy},s1={91:dS},o1={[-2]:Au,[-1]:Au,32:Au},c1={35:yS,42:Vs,45:[ag,Vs],60:SS,61:ag,95:Vs,96:ng,126:ng},u1={38:ly,92:ry},d1={[-5]:wu,[-4]:wu,[-3]:wu,33:PS,38:ly,42:Qu,60:[Bv,RS],91:BS,92:[mS,ry],93:md,95:Qu,96:eS},f1={null:[Qu,t1]},p1={null:[42,95]},h1={null:[]},m1=Object.freeze(Object.defineProperty({__proto__:null,attentionMarkers:p1,contentInitial:s1,disable:h1,document:l1,flow:c1,flowInitial:o1,insideSpan:f1,string:u1,text:d1},Symbol.toStringTag,{value:"Module"}));function g1(a,r,l){let s={_bufferIndex:-1,_index:0,line:l&&l.line||1,column:l&&l.column||1,offset:l&&l.offset||0};const u={},d=[];let f=[],p=[];const g={attempt:R(ze),check:R(X),consume:G,enter:q,exit:de,interrupt:R(X,{interrupt:!0})},h={code:null,containerState:{},defineSkip:N,events:[],now:L,parser:a,previous:null,sliceSerialize:S,sliceStream:v,write:b};let y=r.tokenize.call(h,g);return r.resolveAll&&d.push(r),h;function b(ae){return f=It(f,ae),H(),f[f.length-1]!==null?[]:(ne(r,0),h.events=hd(d,h.events,h),h.events)}function S(ae,ee){return b1(v(ae),ee)}function v(ae){return y1(f,ae)}function L(){const{_bufferIndex:ae,_index:ee,line:Ae,column:fe,offset:J}=s;return{_bufferIndex:ae,_index:ee,line:Ae,column:fe,offset:J}}function N(ae){u[ae.line]=ae.column,ue()}function H(){let ae;for(;s._index<f.length;){const ee=f[s._index];if(typeof ee=="string")for(ae=s._index,s._bufferIndex<0&&(s._bufferIndex=0);s._index===ae&&s._bufferIndex<ee.length;)P(ee.charCodeAt(s._bufferIndex));else P(ee)}}function P(ae){y=y(ae)}function G(ae){Re(ae)?(s.line++,s.column=1,s.offset+=ae===-3?2:1,ue()):ae!==-1&&(s.column++,s.offset++),s._bufferIndex<0?s._index++:(s._bufferIndex++,s._bufferIndex===f[s._index].length&&(s._bufferIndex=-1,s._index++)),h.previous=ae}function q(ae,ee){const Ae=ee||{};return Ae.type=ae,Ae.start=L(),h.events.push(["enter",Ae,h]),p.push(Ae),Ae}function de(ae){const ee=p.pop();return ee.end=L(),h.events.push(["exit",ee,h]),ee}function ze(ae,ee){ne(ae,ee.from)}function X(ae,ee){ee.restore()}function R(ae,ee){return Ae;function Ae(fe,J,C){let K,le,_e,x;return Array.isArray(fe)?j(fe):"tokenize"in fe?j([fe]):T(fe);function T(ye){return Ie;function Ie(Je){const Ke=Je!==null&&ye[Je],qn=Je!==null&&ye.null,Mt=[...Array.isArray(Ke)?Ke:Ke?[Ke]:[],...Array.isArray(qn)?qn:qn?[qn]:[]];return j(Mt)(Je)}}function j(ye){return K=ye,le=0,ye.length===0?C:E(ye[le])}function E(ye){return Ie;function Ie(Je){return x=he(),_e=ye,ye.partial||(h.currentConstruct=ye),ye.name&&h.parser.constructs.disable.null.includes(ye.name)?be():ye.tokenize.call(ee?Object.assign(Object.create(h),ee):h,g,ie,be)(Je)}}function ie(ye){return ae(_e,x),J}function be(ye){return x.restore(),++le<K.length?E(K[le]):C}}}function ne(ae,ee){ae.resolveAll&&!d.includes(ae)&&d.push(ae),ae.resolve&&Gt(h.events,ee,h.events.length-ee,ae.resolve(h.events.slice(ee),h)),ae.resolveTo&&(h.events=ae.resolveTo(h.events,h))}function he(){const ae=L(),ee=h.previous,Ae=h.currentConstruct,fe=h.events.length,J=Array.from(p);return{from:fe,restore:C};function C(){s=ae,h.previous=ee,h.currentConstruct=Ae,h.events.length=fe,p=J,ue()}}function ue(){s.line in u&&s.column<2&&(s.column=u[s.line],s.offset+=u[s.line]-1)}}function y1(a,r){const l=r.start._index,s=r.start._bufferIndex,u=r.end._index,d=r.end._bufferIndex;let f;if(l===u)f=[a[l].slice(s,d)];else{if(f=a.slice(l,u),s>-1){const p=f[0];typeof p=="string"?f[0]=p.slice(s):f.shift()}d>0&&f.push(a[u].slice(0,d))}return f}function b1(a,r){let l=-1;const s=[];let u;for(;++l<a.length;){const d=a[l];let f;if(typeof d=="string")f=d;else switch(d){case-5:{f="\r";break}case-4:{f=`
`;break}case-3:{f=`\r
`;break}case-2:{f=r?" ":"	";break}case-1:{if(!r&&u)continue;f=" ";break}default:f=String.fromCharCode(d)}u=d===-2,s.push(f)}return s.join("")}function z1(a){const s={constructs:Av([m1,...(a||{}).extensions||[]]),content:u(Lv),defined:[],document:u(Nv),flow:u(e1),lazy:{},string:u(a1),text:u(i1)};return s;function u(d){return f;function f(p){return g1(s,d,p)}}}function v1(a){for(;!sy(a););return a}const ig=/[\0\t\n\r]/g;function S1(){let a=1,r="",l=!0,s;return u;function u(d,f,p){const g=[];let h,y,b,S,v;for(d=r+(typeof d=="string"?d.toString():new TextDecoder(f||void 0).decode(d)),b=0,r="",l&&(d.charCodeAt(0)===65279&&b++,l=void 0);b<d.length;){if(ig.lastIndex=b,h=ig.exec(d),S=h&&h.index!==void 0?h.index:d.length,v=d.charCodeAt(S),!h){r=d.slice(b);break}if(v===10&&b===S&&s)g.push(-3),s=void 0;else switch(s&&(g.push(-5),s=void 0),b<S&&(g.push(d.slice(b,S)),a+=S-b),v){case 0:{g.push(65533),a++;break}case 9:{for(y=Math.ceil(a/4)*4,g.push(-2);a++<y;)g.push(-1);break}case 10:{g.push(-4),a=1;break}default:s=!0,a=1}b=S+1}return p&&(s&&g.push(-5),r&&g.push(r),g.push(null)),g}}const E1=/\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;function x1(a){return a.replace(E1,D1)}function D1(a,r,l){if(r)return r;if(l.charCodeAt(0)===35){const u=l.charCodeAt(1),d=u===120||u===88;return ay(l.slice(d?2:1),d?16:10)}return pd(l)||a}const py={}.hasOwnProperty;function T1(a,r,l){return typeof r!="string"&&(l=r,r=void 0),A1(l)(v1(z1(l).document().write(S1()(a,r,!0))))}function A1(a){const r={transforms:[],canContainEols:["emphasis","fragment","heading","paragraph","strong"],enter:{autolink:d(Qt),autolinkProtocol:he,autolinkEmail:he,atxHeading:d(za),blockQuote:d(qn),characterEscape:he,characterReference:he,codeFenced:d(Mt),codeFencedFenceInfo:f,codeFencedFenceMeta:f,codeIndented:d(Mt,f),codeText:d(xn,f),codeTextData:he,data:he,codeFlowValue:he,definition:d(_t),definitionDestinationString:f,definitionLabelString:f,definitionTitleString:f,emphasis:d(yt),hardBreakEscape:d(Yn),hardBreakTrailing:d(Yn),htmlFlow:d(ki,f),htmlFlowData:he,htmlText:d(ki,f),htmlTextData:he,image:d(Ii),label:f,link:d(Qt),listItem:d(ei),listItemValue:S,listOrdered:d(va,b),listUnordered:d(va),paragraph:d(zr),reference:E,referenceString:f,resourceDestinationString:f,resourceTitleString:f,setextHeading:d(za),strong:d(vr),thematicBreak:d(Kt)},exit:{atxHeading:g(),atxHeadingSequence:ze,autolink:g(),autolinkEmail:Ke,autolinkProtocol:Je,blockQuote:g(),characterEscapeValue:ue,characterReferenceMarkerHexadecimal:be,characterReferenceMarkerNumeric:be,characterReferenceValue:ye,characterReference:Ie,codeFenced:g(H),codeFencedFence:N,codeFencedFenceInfo:v,codeFencedFenceMeta:L,codeFlowValue:ue,codeIndented:g(P),codeText:g(J),codeTextData:ue,data:ue,definition:g(),definitionDestinationString:de,definitionLabelString:G,definitionTitleString:q,emphasis:g(),hardBreakEscape:g(ee),hardBreakTrailing:g(ee),htmlFlow:g(Ae),htmlFlowData:ue,htmlText:g(fe),htmlTextData:ue,image:g(K),label:_e,labelText:le,lineEnding:ae,link:g(C),listItem:g(),listOrdered:g(),listUnordered:g(),paragraph:g(),referenceString:ie,resourceDestinationString:x,resourceTitleString:T,resource:j,setextHeading:g(ne),setextHeadingLineSequence:R,setextHeadingText:X,strong:g(),thematicBreak:g()}};hy(r,(a||{}).mdastExtensions||[]);const l={};return s;function s(Z){let te={type:"root",children:[]};const Se={stack:[te],tokenStack:[],config:r,enter:p,exit:h,buffer:f,resume:y,data:l},we=[];let Ve=-1;for(;++Ve<Z.length;)if(Z[Ve][1].type==="listOrdered"||Z[Ve][1].type==="listUnordered")if(Z[Ve][0]==="enter")we.push(Ve);else{const Ln=we.pop();Ve=u(Z,Ln,Ve)}for(Ve=-1;++Ve<Z.length;){const Ln=r[Z[Ve][0]];py.call(Ln,Z[Ve][1].type)&&Ln[Z[Ve][1].type].call(Object.assign({sliceSerialize:Z[Ve][2].sliceSerialize},Se),Z[Ve][1])}if(Se.tokenStack.length>0){const Ln=Se.tokenStack[Se.tokenStack.length-1];(Ln[1]||rg).call(Se,void 0,Ln[0])}for(te.position={start:Ga(Z.length>0?Z[0][1].start:{line:1,column:1,offset:0}),end:Ga(Z.length>0?Z[Z.length-2][1].end:{line:1,column:1,offset:0})},Ve=-1;++Ve<r.transforms.length;)te=r.transforms[Ve](te)||te;return te}function u(Z,te,Se){let we=te-1,Ve=-1,Ln=!1,Ct,mn,zn,Nn;for(;++we<=Se;){const Fe=Z[we];switch(Fe[1].type){case"listUnordered":case"listOrdered":case"blockQuote":{Fe[0]==="enter"?Ve++:Ve--,Nn=void 0;break}case"lineEndingBlank":{Fe[0]==="enter"&&(Ct&&!Nn&&!Ve&&!zn&&(zn=we),Nn=void 0);break}case"linePrefix":case"listItemValue":case"listItemMarker":case"listItemPrefix":case"listItemPrefixWhitespace":break;default:Nn=void 0}if(!Ve&&Fe[0]==="enter"&&Fe[1].type==="listItemPrefix"||Ve===-1&&Fe[0]==="exit"&&(Fe[1].type==="listUnordered"||Fe[1].type==="listOrdered")){if(Ct){let jt=we;for(mn=void 0;jt--;){const Gn=Z[jt];if(Gn[1].type==="lineEnding"||Gn[1].type==="lineEndingBlank"){if(Gn[0]==="exit")continue;mn&&(Z[mn][1].type="lineEndingBlank",Ln=!0),Gn[1].type="lineEnding",mn=jt}else if(!(Gn[1].type==="linePrefix"||Gn[1].type==="blockQuotePrefix"||Gn[1].type==="blockQuotePrefixWhitespace"||Gn[1].type==="blockQuoteMarker"||Gn[1].type==="listItemIndent"))break}zn&&(!mn||zn<mn)&&(Ct._spread=!0),Ct.end=Object.assign({},mn?Z[mn][1].start:Fe[1].end),Z.splice(mn||we,0,["exit",Ct,Fe[2]]),we++,Se++}if(Fe[1].type==="listItemPrefix"){const jt={type:"listItem",_spread:!1,start:Object.assign({},Fe[1].start),end:void 0};Ct=jt,Z.splice(we,0,["enter",jt,Fe[2]]),we++,Se++,zn=void 0,Nn=!0}}}return Z[te][1]._spread=Ln,Se}function d(Z,te){return Se;function Se(we){p.call(this,Z(we),we),te&&te.call(this,we)}}function f(){this.stack.push({type:"fragment",children:[]})}function p(Z,te,Se){this.stack[this.stack.length-1].children.push(Z),this.stack.push(Z),this.tokenStack.push([te,Se||void 0]),Z.position={start:Ga(te.start),end:void 0}}function g(Z){return te;function te(Se){Z&&Z.call(this,Se),h.call(this,Se)}}function h(Z,te){const Se=this.stack.pop(),we=this.tokenStack.pop();if(we)we[0].type!==Z.type&&(te?te.call(this,Z,we[0]):(we[1]||rg).call(this,Z,we[0]));else throw new Error("Cannot close `"+Z.type+"` ("+bl({start:Z.start,end:Z.end})+"): it’s not open");Se.position.end=Ga(Z.end)}function y(){return Dv(this.stack.pop())}function b(){this.data.expectingFirstListItemValue=!0}function S(Z){if(this.data.expectingFirstListItemValue){const te=this.stack[this.stack.length-2];te.start=Number.parseInt(this.sliceSerialize(Z),10),this.data.expectingFirstListItemValue=void 0}}function v(){const Z=this.resume(),te=this.stack[this.stack.length-1];te.lang=Z}function L(){const Z=this.resume(),te=this.stack[this.stack.length-1];te.meta=Z}function N(){this.data.flowCodeInside||(this.buffer(),this.data.flowCodeInside=!0)}function H(){const Z=this.resume(),te=this.stack[this.stack.length-1];te.value=Z.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g,""),this.data.flowCodeInside=void 0}function P(){const Z=this.resume(),te=this.stack[this.stack.length-1];te.value=Z.replace(/(\r?\n|\r)$/g,"")}function G(Z){const te=this.resume(),Se=this.stack[this.stack.length-1];Se.label=te,Se.identifier=mr(this.sliceSerialize(Z)).toLowerCase()}function q(){const Z=this.resume(),te=this.stack[this.stack.length-1];te.title=Z}function de(){const Z=this.resume(),te=this.stack[this.stack.length-1];te.url=Z}function ze(Z){const te=this.stack[this.stack.length-1];if(!te.depth){const Se=this.sliceSerialize(Z).length;te.depth=Se}}function X(){this.data.setextHeadingSlurpLineEnding=!0}function R(Z){const te=this.stack[this.stack.length-1];te.depth=this.sliceSerialize(Z).codePointAt(0)===61?1:2}function ne(){this.data.setextHeadingSlurpLineEnding=void 0}function he(Z){const Se=this.stack[this.stack.length-1].children;let we=Se[Se.length-1];(!we||we.type!=="text")&&(we=bn(),we.position={start:Ga(Z.start),end:void 0},Se.push(we)),this.stack.push(we)}function ue(Z){const te=this.stack.pop();te.value+=this.sliceSerialize(Z),te.position.end=Ga(Z.end)}function ae(Z){const te=this.stack[this.stack.length-1];if(this.data.atHardBreak){const Se=te.children[te.children.length-1];Se.position.end=Ga(Z.end),this.data.atHardBreak=void 0;return}!this.data.setextHeadingSlurpLineEnding&&r.canContainEols.includes(te.type)&&(he.call(this,Z),ue.call(this,Z))}function ee(){this.data.atHardBreak=!0}function Ae(){const Z=this.resume(),te=this.stack[this.stack.length-1];te.value=Z}function fe(){const Z=this.resume(),te=this.stack[this.stack.length-1];te.value=Z}function J(){const Z=this.resume(),te=this.stack[this.stack.length-1];te.value=Z}function C(){const Z=this.stack[this.stack.length-1];if(this.data.inReference){const te=this.data.referenceType||"shortcut";Z.type+="Reference",Z.referenceType=te,delete Z.url,delete Z.title}else delete Z.identifier,delete Z.label;this.data.referenceType=void 0}function K(){const Z=this.stack[this.stack.length-1];if(this.data.inReference){const te=this.data.referenceType||"shortcut";Z.type+="Reference",Z.referenceType=te,delete Z.url,delete Z.title}else delete Z.identifier,delete Z.label;this.data.referenceType=void 0}function le(Z){const te=this.sliceSerialize(Z),Se=this.stack[this.stack.length-2];Se.label=x1(te),Se.identifier=mr(te).toLowerCase()}function _e(){const Z=this.stack[this.stack.length-1],te=this.resume(),Se=this.stack[this.stack.length-1];if(this.data.inReference=!0,Se.type==="link"){const we=Z.children;Se.children=we}else Se.alt=te}function x(){const Z=this.resume(),te=this.stack[this.stack.length-1];te.url=Z}function T(){const Z=this.resume(),te=this.stack[this.stack.length-1];te.title=Z}function j(){this.data.inReference=void 0}function E(){this.data.referenceType="collapsed"}function ie(Z){const te=this.resume(),Se=this.stack[this.stack.length-1];Se.label=te,Se.identifier=mr(this.sliceSerialize(Z)).toLowerCase(),this.data.referenceType="full"}function be(Z){this.data.characterReferenceType=Z.type}function ye(Z){const te=this.sliceSerialize(Z),Se=this.data.characterReferenceType;let we;Se?(we=ay(te,Se==="characterReferenceMarkerNumeric"?10:16),this.data.characterReferenceType=void 0):we=pd(te);const Ve=this.stack[this.stack.length-1];Ve.value+=we}function Ie(Z){const te=this.stack.pop();te.position.end=Ga(Z.end)}function Je(Z){ue.call(this,Z);const te=this.stack[this.stack.length-1];te.url=this.sliceSerialize(Z)}function Ke(Z){ue.call(this,Z);const te=this.stack[this.stack.length-1];te.url="mailto:"+this.sliceSerialize(Z)}function qn(){return{type:"blockquote",children:[]}}function Mt(){return{type:"code",lang:null,meta:null,value:""}}function xn(){return{type:"inlineCode",value:""}}function _t(){return{type:"definition",identifier:"",label:null,title:null,url:""}}function yt(){return{type:"emphasis",children:[]}}function za(){return{type:"heading",depth:0,children:[]}}function Yn(){return{type:"break"}}function ki(){return{type:"html",value:""}}function Ii(){return{type:"image",title:null,url:"",alt:null}}function Qt(){return{type:"link",title:null,url:"",children:[]}}function va(Z){return{type:"list",ordered:Z.type==="listOrdered",start:null,spread:Z._spread,children:[]}}function ei(Z){return{type:"listItem",spread:Z._spread,checked:null,children:[]}}function zr(){return{type:"paragraph",children:[]}}function vr(){return{type:"strong",children:[]}}function bn(){return{type:"text",value:""}}function Kt(){return{type:"thematicBreak"}}}function Ga(a){return{line:a.line,column:a.column,offset:a.offset}}function hy(a,r){let l=-1;for(;++l<r.length;){const s=r[l];Array.isArray(s)?hy(a,s):w1(a,s)}}function w1(a,r){let l;for(l in r)if(py.call(r,l))switch(l){case"canContainEols":{const s=r[l];s&&a[l].push(...s);break}case"transforms":{const s=r[l];s&&a[l].push(...s);break}case"enter":case"exit":{const s=r[l];s&&Object.assign(a[l],s);break}}}function rg(a,r){throw a?new Error("Cannot close `"+a.type+"` ("+bl({start:a.start,end:a.end})+"): a different token (`"+r.type+"`, "+bl({start:r.start,end:r.end})+") is open"):new Error("Cannot close document, a token (`"+r.type+"`, "+bl({start:r.start,end:r.end})+") is still open")}function R1(a){const r=this;r.parser=l;function l(s){return T1(s,{...r.data("settings"),...a,extensions:r.data("micromarkExtensions")||[],mdastExtensions:r.data("fromMarkdownExtensions")||[]})}}function k1(a,r){const l={type:"element",tagName:"blockquote",properties:{},children:a.wrap(a.all(r),!0)};return a.patch(r,l),a.applyData(r,l)}function I1(a,r){const l={type:"element",tagName:"br",properties:{},children:[]};return a.patch(r,l),[a.applyData(r,l),{type:"text",value:`
`}]}function M1(a,r){const l=r.value?r.value+`
`:"",s={},u=r.lang?r.lang.split(/\s+/):[];u.length>0&&(s.className=["language-"+u[0]]);let d={type:"element",tagName:"code",properties:s,children:[{type:"text",value:l}]};return r.meta&&(d.data={meta:r.meta}),a.patch(r,d),d=a.applyData(r,d),d={type:"element",tagName:"pre",properties:{},children:[d]},a.patch(r,d),d}function _1(a,r){const l={type:"element",tagName:"del",properties:{},children:a.all(r)};return a.patch(r,l),a.applyData(r,l)}function C1(a,r){const l={type:"element",tagName:"em",properties:{},children:a.all(r)};return a.patch(r,l),a.applyData(r,l)}function L1(a,r){const l=typeof a.options.clobberPrefix=="string"?a.options.clobberPrefix:"user-content-",s=String(r.identifier).toUpperCase(),u=br(s.toLowerCase()),d=a.footnoteOrder.indexOf(s);let f,p=a.footnoteCounts.get(s);p===void 0?(p=0,a.footnoteOrder.push(s),f=a.footnoteOrder.length):f=d+1,p+=1,a.footnoteCounts.set(s,p);const g={type:"element",tagName:"a",properties:{href:"#"+l+"fn-"+u,id:l+"fnref-"+u+(p>1?"-"+p:""),dataFootnoteRef:!0,ariaDescribedBy:["footnote-label"]},children:[{type:"text",value:String(f)}]};a.patch(r,g);const h={type:"element",tagName:"sup",properties:{},children:[g]};return a.patch(r,h),a.applyData(r,h)}function O1(a,r){const l={type:"element",tagName:"h"+r.depth,properties:{},children:a.all(r)};return a.patch(r,l),a.applyData(r,l)}function N1(a,r){if(a.options.allowDangerousHtml){const l={type:"raw",value:r.value};return a.patch(r,l),a.applyData(r,l)}}function my(a,r){const l=r.referenceType;let s="]";if(l==="collapsed"?s+="[]":l==="full"&&(s+="["+(r.label||r.identifier)+"]"),r.type==="imageReference")return[{type:"text",value:"!["+r.alt+s}];const u=a.all(r),d=u[0];d&&d.type==="text"?d.value="["+d.value:u.unshift({type:"text",value:"["});const f=u[u.length-1];return f&&f.type==="text"?f.value+=s:u.push({type:"text",value:s}),u}function W1(a,r){const l=String(r.identifier).toUpperCase(),s=a.definitionById.get(l);if(!s)return my(a,r);const u={src:br(s.url||""),alt:r.alt};s.title!==null&&s.title!==void 0&&(u.title=s.title);const d={type:"element",tagName:"img",properties:u,children:[]};return a.patch(r,d),a.applyData(r,d)}function U1(a,r){const l={src:br(r.url)};r.alt!==null&&r.alt!==void 0&&(l.alt=r.alt),r.title!==null&&r.title!==void 0&&(l.title=r.title);const s={type:"element",tagName:"img",properties:l,children:[]};return a.patch(r,s),a.applyData(r,s)}function P1(a,r){const l={type:"text",value:r.value.replace(/\r?\n|\r/g," ")};a.patch(r,l);const s={type:"element",tagName:"code",properties:{},children:[l]};return a.patch(r,s),a.applyData(r,s)}function j1(a,r){const l=String(r.identifier).toUpperCase(),s=a.definitionById.get(l);if(!s)return my(a,r);const u={href:br(s.url||"")};s.title!==null&&s.title!==void 0&&(u.title=s.title);const d={type:"element",tagName:"a",properties:u,children:a.all(r)};return a.patch(r,d),a.applyData(r,d)}function B1(a,r){const l={href:br(r.url)};r.title!==null&&r.title!==void 0&&(l.title=r.title);const s={type:"element",tagName:"a",properties:l,children:a.all(r)};return a.patch(r,s),a.applyData(r,s)}function X1(a,r,l){const s=a.all(r),u=l?H1(l):gy(r),d={},f=[];if(typeof r.checked=="boolean"){const y=s[0];let b;y&&y.type==="element"&&y.tagName==="p"?b=y:(b={type:"element",tagName:"p",properties:{},children:[]},s.unshift(b)),b.children.length>0&&b.children.unshift({type:"text",value:" "}),b.children.unshift({type:"element",tagName:"input",properties:{type:"checkbox",checked:r.checked,disabled:!0},children:[]}),d.className=["task-list-item"]}let p=-1;for(;++p<s.length;){const y=s[p];(u||p!==0||y.type!=="element"||y.tagName!=="p")&&f.push({type:"text",value:`
`}),y.type==="element"&&y.tagName==="p"&&!u?f.push(...y.children):f.push(y)}const g=s[s.length-1];g&&(u||g.type!=="element"||g.tagName!=="p")&&f.push({type:"text",value:`
`});const h={type:"element",tagName:"li",properties:d,children:f};return a.patch(r,h),a.applyData(r,h)}function H1(a){let r=!1;if(a.type==="list"){r=a.spread||!1;const l=a.children;let s=-1;for(;!r&&++s<l.length;)r=gy(l[s])}return r}function gy(a){const r=a.spread;return r??a.children.length>1}function Z1(a,r){const l={},s=a.all(r);let u=-1;for(typeof r.start=="number"&&r.start!==1&&(l.start=r.start);++u<s.length;){const f=s[u];if(f.type==="element"&&f.tagName==="li"&&f.properties&&Array.isArray(f.properties.className)&&f.properties.className.includes("task-list-item")){l.className=["contains-task-list"];break}}const d={type:"element",tagName:r.ordered?"ol":"ul",properties:l,children:a.wrap(s,!0)};return a.patch(r,d),a.applyData(r,d)}function V1(a,r){const l={type:"element",tagName:"p",properties:{},children:a.all(r)};return a.patch(r,l),a.applyData(r,l)}function q1(a,r){const l={type:"root",children:a.wrap(a.all(r))};return a.patch(r,l),a.applyData(r,l)}function Y1(a,r){const l={type:"element",tagName:"strong",properties:{},children:a.all(r)};return a.patch(r,l),a.applyData(r,l)}function G1(a,r){const l=a.all(r),s=l.shift(),u=[];if(s){const f={type:"element",tagName:"thead",properties:{},children:a.wrap([s],!0)};a.patch(r.children[0],f),u.push(f)}if(l.length>0){const f={type:"element",tagName:"tbody",properties:{},children:a.wrap(l,!0)},p=cd(r.children[1]),g=Kg(r.children[r.children.length-1]);p&&g&&(f.position={start:p,end:g}),u.push(f)}const d={type:"element",tagName:"table",properties:{},children:a.wrap(u,!0)};return a.patch(r,d),a.applyData(r,d)}function Q1(a,r,l){const s=l?l.children:void 0,d=(s?s.indexOf(r):1)===0?"th":"td",f=l&&l.type==="table"?l.align:void 0,p=f?f.length:r.children.length;let g=-1;const h=[];for(;++g<p;){const b=r.children[g],S={},v=f?f[g]:void 0;v&&(S.align=v);let L={type:"element",tagName:d,properties:S,children:[]};b&&(L.children=a.all(b),a.patch(b,L),L=a.applyData(b,L)),h.push(L)}const y={type:"element",tagName:"tr",properties:{},children:a.wrap(h,!0)};return a.patch(r,y),a.applyData(r,y)}function K1(a,r){const l={type:"element",tagName:"td",properties:{},children:a.all(r)};return a.patch(r,l),a.applyData(r,l)}const lg=9,sg=32;function F1(a){const r=String(a),l=/\r?\n|\r/g;let s=l.exec(r),u=0;const d=[];for(;s;)d.push(og(r.slice(u,s.index),u>0,!0),s[0]),u=s.index+s[0].length,s=l.exec(r);return d.push(og(r.slice(u),u>0,!1)),d.join("")}function og(a,r,l){let s=0,u=a.length;if(r){let d=a.codePointAt(s);for(;d===lg||d===sg;)s++,d=a.codePointAt(s)}if(l){let d=a.codePointAt(u-1);for(;d===lg||d===sg;)u--,d=a.codePointAt(u-1)}return u>s?a.slice(s,u):""}function J1(a,r){const l={type:"text",value:F1(String(r.value))};return a.patch(r,l),a.applyData(r,l)}function $1(a,r){const l={type:"element",tagName:"hr",properties:{},children:[]};return a.patch(r,l),a.applyData(r,l)}const e9={blockquote:k1,break:I1,code:M1,delete:_1,emphasis:C1,footnoteReference:L1,heading:O1,html:N1,imageReference:W1,image:U1,inlineCode:P1,linkReference:j1,link:B1,listItem:X1,list:Z1,paragraph:V1,root:q1,strong:Y1,table:G1,tableCell:K1,tableRow:Q1,text:J1,thematicBreak:$1,toml:Bs,yaml:Bs,definition:Bs,footnoteDefinition:Bs};function Bs(){}const yy=-1,to=0,vl=1,Fs=2,gd=3,yd=4,bd=5,zd=6,by=7,zy=8,cg=typeof self=="object"?self:globalThis,n9=(a,r)=>{const l=(u,d)=>(a.set(d,u),u),s=u=>{if(a.has(u))return a.get(u);const[d,f]=r[u];switch(d){case to:case yy:return l(f,u);case vl:{const p=l([],u);for(const g of f)p.push(s(g));return p}case Fs:{const p=l({},u);for(const[g,h]of f)p[s(g)]=s(h);return p}case gd:return l(new Date(f),u);case yd:{const{source:p,flags:g}=f;return l(new RegExp(p,g),u)}case bd:{const p=l(new Map,u);for(const[g,h]of f)p.set(s(g),s(h));return p}case zd:{const p=l(new Set,u);for(const g of f)p.add(s(g));return p}case by:{const{name:p,message:g}=f;return l(new cg[p](g),u)}case zy:return l(BigInt(f),u);case"BigInt":return l(Object(BigInt(f)),u);case"ArrayBuffer":return l(new Uint8Array(f).buffer,f);case"DataView":{const{buffer:p}=new Uint8Array(f);return l(new DataView(p),f)}}return l(new cg[d](f),u)};return s},ug=a=>n9(new Map,a)(0),pr="",{toString:t9}={},{keys:a9}=Object,gl=a=>{const r=typeof a;if(r!=="object"||!a)return[to,r];const l=t9.call(a).slice(8,-1);switch(l){case"Array":return[vl,pr];case"Object":return[Fs,pr];case"Date":return[gd,pr];case"RegExp":return[yd,pr];case"Map":return[bd,pr];case"Set":return[zd,pr];case"DataView":return[vl,l]}return l.includes("Array")?[vl,l]:l.includes("Error")?[by,l]:[Fs,l]},Xs=([a,r])=>a===to&&(r==="function"||r==="symbol"),i9=(a,r,l,s)=>{const u=(f,p)=>{const g=s.push(f)-1;return l.set(p,g),g},d=f=>{if(l.has(f))return l.get(f);let[p,g]=gl(f);switch(p){case to:{let y=f;switch(g){case"bigint":p=zy,y=f.toString();break;case"function":case"symbol":if(a)throw new TypeError("unable to serialize "+g);y=null;break;case"undefined":return u([yy],f)}return u([p,y],f)}case vl:{if(g){let S=f;return g==="DataView"?S=new Uint8Array(f.buffer):g==="ArrayBuffer"&&(S=new Uint8Array(f)),u([g,[...S]],f)}const y=[],b=u([p,y],f);for(const S of f)y.push(d(S));return b}case Fs:{if(g)switch(g){case"BigInt":return u([g,f.toString()],f);case"Boolean":case"Number":case"String":return u([g,f.valueOf()],f)}if(r&&"toJSON"in f)return d(f.toJSON());const y=[],b=u([p,y],f);for(const S of a9(f))(a||!Xs(gl(f[S])))&&y.push([d(S),d(f[S])]);return b}case gd:return u([p,f.toISOString()],f);case yd:{const{source:y,flags:b}=f;return u([p,{source:y,flags:b}],f)}case bd:{const y=[],b=u([p,y],f);for(const[S,v]of f)(a||!(Xs(gl(S))||Xs(gl(v))))&&y.push([d(S),d(v)]);return b}case zd:{const y=[],b=u([p,y],f);for(const S of f)(a||!Xs(gl(S)))&&y.push(d(S));return b}}const{message:h}=f;return u([p,{name:g,message:h}],f)};return d},dg=(a,{json:r,lossy:l}={})=>{const s=[];return i9(!(r||l),!!r,new Map,s)(a),s},Js=typeof structuredClone=="function"?(a,r)=>r&&("json"in r||"lossy"in r)?ug(dg(a,r)):structuredClone(a):(a,r)=>ug(dg(a,r));function r9(a,r){const l=[{type:"text",value:"↩"}];return r>1&&l.push({type:"element",tagName:"sup",properties:{},children:[{type:"text",value:String(r)}]}),l}function l9(a,r){return"Back to reference "+(a+1)+(r>1?"-"+r:"")}function s9(a){const r=typeof a.options.clobberPrefix=="string"?a.options.clobberPrefix:"user-content-",l=a.options.footnoteBackContent||r9,s=a.options.footnoteBackLabel||l9,u=a.options.footnoteLabel||"Footnotes",d=a.options.footnoteLabelTagName||"h2",f=a.options.footnoteLabelProperties||{className:["sr-only"]},p=[];let g=-1;for(;++g<a.footnoteOrder.length;){const h=a.footnoteById.get(a.footnoteOrder[g]);if(!h)continue;const y=a.all(h),b=String(h.identifier).toUpperCase(),S=br(b.toLowerCase());let v=0;const L=[],N=a.footnoteCounts.get(b);for(;N!==void 0&&++v<=N;){L.length>0&&L.push({type:"text",value:" "});let G=typeof l=="string"?l:l(g,v);typeof G=="string"&&(G={type:"text",value:G}),L.push({type:"element",tagName:"a",properties:{href:"#"+r+"fnref-"+S+(v>1?"-"+v:""),dataFootnoteBackref:"",ariaLabel:typeof s=="string"?s:s(g,v),className:["data-footnote-backref"]},children:Array.isArray(G)?G:[G]})}const H=y[y.length-1];if(H&&H.type==="element"&&H.tagName==="p"){const G=H.children[H.children.length-1];G&&G.type==="text"?G.value+=" ":H.children.push({type:"text",value:" "}),H.children.push(...L)}else y.push(...L);const P={type:"element",tagName:"li",properties:{id:r+"fn-"+S},children:a.wrap(y,!0)};a.patch(h,P),p.push(P)}if(p.length!==0)return{type:"element",tagName:"section",properties:{dataFootnotes:!0,className:["footnotes"]},children:[{type:"element",tagName:d,properties:{...Js(f),id:"footnote-label"},children:[{type:"text",value:u}]},{type:"text",value:`
`},{type:"element",tagName:"ol",properties:{},children:a.wrap(p,!0)},{type:"text",value:`
`}]}}const vy=(function(a){if(a==null)return d9;if(typeof a=="function")return ao(a);if(typeof a=="object")return Array.isArray(a)?o9(a):c9(a);if(typeof a=="string")return u9(a);throw new Error("Expected function, string, or object as test")});function o9(a){const r=[];let l=-1;for(;++l<a.length;)r[l]=vy(a[l]);return ao(s);function s(...u){let d=-1;for(;++d<r.length;)if(r[d].apply(this,u))return!0;return!1}}function c9(a){const r=a;return ao(l);function l(s){const u=s;let d;for(d in a)if(u[d]!==r[d])return!1;return!0}}function u9(a){return ao(r);function r(l){return l&&l.type===a}}function ao(a){return r;function r(l,s,u){return!!(f9(l)&&a.call(this,l,typeof s=="number"?s:void 0,u||void 0))}}function d9(){return!0}function f9(a){return a!==null&&typeof a=="object"&&"type"in a}const Sy=[],p9=!0,fg=!1,h9="skip";function m9(a,r,l,s){let u;typeof r=="function"&&typeof l!="function"?(s=l,l=r):u=r;const d=vy(u),f=s?-1:1;p(a,void 0,[])();function p(g,h,y){const b=g&&typeof g=="object"?g:{};if(typeof b.type=="string"){const v=typeof b.tagName=="string"?b.tagName:typeof b.name=="string"?b.name:void 0;Object.defineProperty(S,"name",{value:"node ("+(g.type+(v?"<"+v+">":""))+")"})}return S;function S(){let v=Sy,L,N,H;if((!r||d(g,h,y[y.length-1]||void 0))&&(v=g9(l(g,y)),v[0]===fg))return v;if("children"in g&&g.children){const P=g;if(P.children&&v[0]!==h9)for(N=(s?P.children.length:-1)+f,H=y.concat(P);N>-1&&N<P.children.length;){const G=P.children[N];if(L=p(G,N,H)(),L[0]===fg)return L;N=typeof L[1]=="number"?L[1]:N+f}}return v}}}function g9(a){return Array.isArray(a)?a:typeof a=="number"?[p9,a]:a==null?Sy:[a]}function Ey(a,r,l,s){let u,d,f;typeof r=="function"&&typeof l!="function"?(d=void 0,f=r,u=l):(d=r,f=l,u=s),m9(a,d,p,u);function p(g,h){const y=h[h.length-1],b=y?y.children.indexOf(g):void 0;return f(g,b,y)}}const Ku={}.hasOwnProperty,y9={};function b9(a,r){const l=r||y9,s=new Map,u=new Map,d=new Map,f={...e9,...l.handlers},p={all:h,applyData:v9,definitionById:s,footnoteById:u,footnoteCounts:d,footnoteOrder:[],handlers:f,one:g,options:l,patch:z9,wrap:E9};return Ey(a,function(y){if(y.type==="definition"||y.type==="footnoteDefinition"){const b=y.type==="definition"?s:u,S=String(y.identifier).toUpperCase();b.has(S)||b.set(S,y)}}),p;function g(y,b){const S=y.type,v=p.handlers[S];if(Ku.call(p.handlers,S)&&v)return v(p,y,b);if(p.options.passThrough&&p.options.passThrough.includes(S)){if("children"in y){const{children:N,...H}=y,P=Js(H);return P.children=p.all(y),P}return Js(y)}return(p.options.unknownHandler||S9)(p,y,b)}function h(y){const b=[];if("children"in y){const S=y.children;let v=-1;for(;++v<S.length;){const L=p.one(S[v],y);if(L){if(v&&S[v-1].type==="break"&&(!Array.isArray(L)&&L.type==="text"&&(L.value=pg(L.value)),!Array.isArray(L)&&L.type==="element")){const N=L.children[0];N&&N.type==="text"&&(N.value=pg(N.value))}Array.isArray(L)?b.push(...L):b.push(L)}}}return b}}function z9(a,r){a.position&&(r.position=tv(a))}function v9(a,r){let l=r;if(a&&a.data){const s=a.data.hName,u=a.data.hChildren,d=a.data.hProperties;if(typeof s=="string")if(l.type==="element")l.tagName=s;else{const f="children"in l?l.children:[l];l={type:"element",tagName:s,properties:{},children:f}}l.type==="element"&&d&&Object.assign(l.properties,Js(d)),"children"in l&&l.children&&u!==null&&u!==void 0&&(l.children=u)}return l}function S9(a,r){const l=r.data||{},s="value"in r&&!(Ku.call(l,"hProperties")||Ku.call(l,"hChildren"))?{type:"text",value:r.value}:{type:"element",tagName:"div",properties:{},children:a.all(r)};return a.patch(r,s),a.applyData(r,s)}function E9(a,r){const l=[];let s=-1;for(r&&l.push({type:"text",value:`
`});++s<a.length;)s&&l.push({type:"text",value:`
`}),l.push(a[s]);return r&&a.length>0&&l.push({type:"text",value:`
`}),l}function pg(a){let r=0,l=a.charCodeAt(r);for(;l===9||l===32;)r++,l=a.charCodeAt(r);return a.slice(r)}function hg(a,r){const l=b9(a,r),s=l.one(a,void 0),u=s9(l),d=Array.isArray(s)?{type:"root",children:s}:s||{type:"root",children:[]};return u&&d.children.push({type:"text",value:`
`},u),d}function x9(a,r){return a&&"run"in a?async function(l,s){const u=hg(l,{file:s,...r});await a.run(u,s)}:function(l,s){return hg(l,{file:s,...a||r})}}function mg(a){if(a)throw a}var Ru,gg;function D9(){if(gg)return Ru;gg=1;var a=Object.prototype.hasOwnProperty,r=Object.prototype.toString,l=Object.defineProperty,s=Object.getOwnPropertyDescriptor,u=function(h){return typeof Array.isArray=="function"?Array.isArray(h):r.call(h)==="[object Array]"},d=function(h){if(!h||r.call(h)!=="[object Object]")return!1;var y=a.call(h,"constructor"),b=h.constructor&&h.constructor.prototype&&a.call(h.constructor.prototype,"isPrototypeOf");if(h.constructor&&!y&&!b)return!1;var S;for(S in h);return typeof S>"u"||a.call(h,S)},f=function(h,y){l&&y.name==="__proto__"?l(h,y.name,{enumerable:!0,configurable:!0,value:y.newValue,writable:!0}):h[y.name]=y.newValue},p=function(h,y){if(y==="__proto__")if(a.call(h,y)){if(s)return s(h,y).value}else return;return h[y]};return Ru=function g(){var h,y,b,S,v,L,N=arguments[0],H=1,P=arguments.length,G=!1;for(typeof N=="boolean"&&(G=N,N=arguments[1]||{},H=2),(N==null||typeof N!="object"&&typeof N!="function")&&(N={});H<P;++H)if(h=arguments[H],h!=null)for(y in h)b=p(N,y),S=p(h,y),N!==S&&(G&&S&&(d(S)||(v=u(S)))?(v?(v=!1,L=b&&u(b)?b:[]):L=b&&d(b)?b:{},f(N,{name:y,newValue:g(G,L,S)})):typeof S<"u"&&f(N,{name:y,newValue:S}));return N},Ru}var T9=D9();const ku=$s(T9);function Fu(a){if(typeof a!="object"||a===null)return!1;const r=Object.getPrototypeOf(a);return(r===null||r===Object.prototype||Object.getPrototypeOf(r)===null)&&!(Symbol.toStringTag in a)&&!(Symbol.iterator in a)}function A9(){const a=[],r={run:l,use:s};return r;function l(...u){let d=-1;const f=u.pop();if(typeof f!="function")throw new TypeError("Expected function as last argument, not "+f);p(null,...u);function p(g,...h){const y=a[++d];let b=-1;if(g){f(g);return}for(;++b<u.length;)(h[b]===null||h[b]===void 0)&&(h[b]=u[b]);u=h,y?w9(y,p)(...h):f(null,...h)}}function s(u){if(typeof u!="function")throw new TypeError("Expected `middelware` to be a function, not "+u);return a.push(u),r}}function w9(a,r){let l;return s;function s(...f){const p=a.length>f.length;let g;p&&f.push(u);try{g=a.apply(this,f)}catch(h){const y=h;if(p&&l)throw y;return u(y)}p||(g&&g.then&&typeof g.then=="function"?g.then(d,u):g instanceof Error?u(g):d(g))}function u(f,...p){l||(l=!0,r(f,...p))}function d(f){u(null,f)}}const qt={basename:R9,dirname:k9,extname:I9,join:M9,sep:"/"};function R9(a,r){if(r!==void 0&&typeof r!="string")throw new TypeError('"ext" argument must be a string');Rl(a);let l=0,s=-1,u=a.length,d;if(r===void 0||r.length===0||r.length>a.length){for(;u--;)if(a.codePointAt(u)===47){if(d){l=u+1;break}}else s<0&&(d=!0,s=u+1);return s<0?"":a.slice(l,s)}if(r===a)return"";let f=-1,p=r.length-1;for(;u--;)if(a.codePointAt(u)===47){if(d){l=u+1;break}}else f<0&&(d=!0,f=u+1),p>-1&&(a.codePointAt(u)===r.codePointAt(p--)?p<0&&(s=u):(p=-1,s=f));return l===s?s=f:s<0&&(s=a.length),a.slice(l,s)}function k9(a){if(Rl(a),a.length===0)return".";let r=-1,l=a.length,s;for(;--l;)if(a.codePointAt(l)===47){if(s){r=l;break}}else s||(s=!0);return r<0?a.codePointAt(0)===47?"/":".":r===1&&a.codePointAt(0)===47?"//":a.slice(0,r)}function I9(a){Rl(a);let r=a.length,l=-1,s=0,u=-1,d=0,f;for(;r--;){const p=a.codePointAt(r);if(p===47){if(f){s=r+1;break}continue}l<0&&(f=!0,l=r+1),p===46?u<0?u=r:d!==1&&(d=1):u>-1&&(d=-1)}return u<0||l<0||d===0||d===1&&u===l-1&&u===s+1?"":a.slice(u,l)}function M9(...a){let r=-1,l;for(;++r<a.length;)Rl(a[r]),a[r]&&(l=l===void 0?a[r]:l+"/"+a[r]);return l===void 0?".":_9(l)}function _9(a){Rl(a);const r=a.codePointAt(0)===47;let l=C9(a,!r);return l.length===0&&!r&&(l="."),l.length>0&&a.codePointAt(a.length-1)===47&&(l+="/"),r?"/"+l:l}function C9(a,r){let l="",s=0,u=-1,d=0,f=-1,p,g;for(;++f<=a.length;){if(f<a.length)p=a.codePointAt(f);else{if(p===47)break;p=47}if(p===47){if(!(u===f-1||d===1))if(u!==f-1&&d===2){if(l.length<2||s!==2||l.codePointAt(l.length-1)!==46||l.codePointAt(l.length-2)!==46){if(l.length>2){if(g=l.lastIndexOf("/"),g!==l.length-1){g<0?(l="",s=0):(l=l.slice(0,g),s=l.length-1-l.lastIndexOf("/")),u=f,d=0;continue}}else if(l.length>0){l="",s=0,u=f,d=0;continue}}r&&(l=l.length>0?l+"/..":"..",s=2)}else l.length>0?l+="/"+a.slice(u+1,f):l=a.slice(u+1,f),s=f-u-1;u=f,d=0}else p===46&&d>-1?d++:d=-1}return l}function Rl(a){if(typeof a!="string")throw new TypeError("Path must be a string. Received "+JSON.stringify(a))}const L9={cwd:O9};function O9(){return"/"}function Ju(a){return!!(a!==null&&typeof a=="object"&&"href"in a&&a.href&&"protocol"in a&&a.protocol&&a.auth===void 0)}function N9(a){if(typeof a=="string")a=new URL(a);else if(!Ju(a)){const r=new TypeError('The "path" argument must be of type string or an instance of URL. Received `'+a+"`");throw r.code="ERR_INVALID_ARG_TYPE",r}if(a.protocol!=="file:"){const r=new TypeError("The URL must be of scheme file");throw r.code="ERR_INVALID_URL_SCHEME",r}return W9(a)}function W9(a){if(a.hostname!==""){const s=new TypeError('File URL host must be "localhost" or empty on darwin');throw s.code="ERR_INVALID_FILE_URL_HOST",s}const r=a.pathname;let l=-1;for(;++l<r.length;)if(r.codePointAt(l)===37&&r.codePointAt(l+1)===50){const s=r.codePointAt(l+2);if(s===70||s===102){const u=new TypeError("File URL path must not include encoded / characters");throw u.code="ERR_INVALID_FILE_URL_PATH",u}}return decodeURIComponent(r)}const Iu=["history","path","basename","stem","extname","dirname"];class xy{constructor(r){let l;r?Ju(r)?l={path:r}:typeof r=="string"||U9(r)?l={value:r}:l=r:l={},this.cwd="cwd"in l?"":L9.cwd(),this.data={},this.history=[],this.messages=[],this.value,this.map,this.result,this.stored;let s=-1;for(;++s<Iu.length;){const d=Iu[s];d in l&&l[d]!==void 0&&l[d]!==null&&(this[d]=d==="history"?[...l[d]]:l[d])}let u;for(u in l)Iu.includes(u)||(this[u]=l[u])}get basename(){return typeof this.path=="string"?qt.basename(this.path):void 0}set basename(r){_u(r,"basename"),Mu(r,"basename"),this.path=qt.join(this.dirname||"",r)}get dirname(){return typeof this.path=="string"?qt.dirname(this.path):void 0}set dirname(r){yg(this.basename,"dirname"),this.path=qt.join(r||"",this.basename)}get extname(){return typeof this.path=="string"?qt.extname(this.path):void 0}set extname(r){if(Mu(r,"extname"),yg(this.dirname,"extname"),r){if(r.codePointAt(0)!==46)throw new Error("`extname` must start with `.`");if(r.includes(".",1))throw new Error("`extname` cannot contain multiple dots")}this.path=qt.join(this.dirname,this.stem+(r||""))}get path(){return this.history[this.history.length-1]}set path(r){Ju(r)&&(r=N9(r)),_u(r,"path"),this.path!==r&&this.history.push(r)}get stem(){return typeof this.path=="string"?qt.basename(this.path,this.extname):void 0}set stem(r){_u(r,"stem"),Mu(r,"stem"),this.path=qt.join(this.dirname||"",r+(this.extname||""))}fail(r,l,s){const u=this.message(r,l,s);throw u.fatal=!0,u}info(r,l,s){const u=this.message(r,l,s);return u.fatal=void 0,u}message(r,l,s){const u=new Hn(r,l,s);return this.path&&(u.name=this.path+":"+u.name,u.file=this.path),u.fatal=!1,this.messages.push(u),u}toString(r){return this.value===void 0?"":typeof this.value=="string"?this.value:new TextDecoder(r||void 0).decode(this.value)}}function Mu(a,r){if(a&&a.includes(qt.sep))throw new Error("`"+r+"` cannot be a path: did not expect `"+qt.sep+"`")}function _u(a,r){if(!a)throw new Error("`"+r+"` cannot be empty")}function yg(a,r){if(!a)throw new Error("Setting `"+r+"` requires `path` to be set too")}function U9(a){return!!(a&&typeof a=="object"&&"byteLength"in a&&"byteOffset"in a)}const P9=(function(a){const s=this.constructor.prototype,u=s[a],d=function(){return u.apply(d,arguments)};return Object.setPrototypeOf(d,s),d}),j9={}.hasOwnProperty;class vd extends P9{constructor(){super("copy"),this.Compiler=void 0,this.Parser=void 0,this.attachers=[],this.compiler=void 0,this.freezeIndex=-1,this.frozen=void 0,this.namespace={},this.parser=void 0,this.transformers=A9()}copy(){const r=new vd;let l=-1;for(;++l<this.attachers.length;){const s=this.attachers[l];r.use(...s)}return r.data(ku(!0,{},this.namespace)),r}data(r,l){return typeof r=="string"?arguments.length===2?(Ou("data",this.frozen),this.namespace[r]=l,this):j9.call(this.namespace,r)&&this.namespace[r]||void 0:r?(Ou("data",this.frozen),this.namespace=r,this):this.namespace}freeze(){if(this.frozen)return this;const r=this;for(;++this.freezeIndex<this.attachers.length;){const[l,...s]=this.attachers[this.freezeIndex];if(s[0]===!1)continue;s[0]===!0&&(s[0]=void 0);const u=l.call(r,...s);typeof u=="function"&&this.transformers.use(u)}return this.frozen=!0,this.freezeIndex=Number.POSITIVE_INFINITY,this}parse(r){this.freeze();const l=Hs(r),s=this.parser||this.Parser;return Cu("parse",s),s(String(l),l)}process(r,l){const s=this;return this.freeze(),Cu("process",this.parser||this.Parser),Lu("process",this.compiler||this.Compiler),l?u(void 0,l):new Promise(u);function u(d,f){const p=Hs(r),g=s.parse(p);s.run(g,p,function(y,b,S){if(y||!b||!S)return h(y);const v=b,L=s.stringify(v,S);H9(L)?S.value=L:S.result=L,h(y,S)});function h(y,b){y||!b?f(y):d?d(b):l(void 0,b)}}}processSync(r){let l=!1,s;return this.freeze(),Cu("processSync",this.parser||this.Parser),Lu("processSync",this.compiler||this.Compiler),this.process(r,u),zg("processSync","process",l),s;function u(d,f){l=!0,mg(d),s=f}}run(r,l,s){bg(r),this.freeze();const u=this.transformers;return!s&&typeof l=="function"&&(s=l,l=void 0),s?d(void 0,s):new Promise(d);function d(f,p){const g=Hs(l);u.run(r,g,h);function h(y,b,S){const v=b||r;y?p(y):f?f(v):s(void 0,v,S)}}}runSync(r,l){let s=!1,u;return this.run(r,l,d),zg("runSync","run",s),u;function d(f,p){mg(f),u=p,s=!0}}stringify(r,l){this.freeze();const s=Hs(l),u=this.compiler||this.Compiler;return Lu("stringify",u),bg(r),u(r,s)}use(r,...l){const s=this.attachers,u=this.namespace;if(Ou("use",this.frozen),r!=null)if(typeof r=="function")g(r,l);else if(typeof r=="object")Array.isArray(r)?p(r):f(r);else throw new TypeError("Expected usable value, not `"+r+"`");return this;function d(h){if(typeof h=="function")g(h,[]);else if(typeof h=="object")if(Array.isArray(h)){const[y,...b]=h;g(y,b)}else f(h);else throw new TypeError("Expected usable value, not `"+h+"`")}function f(h){if(!("plugins"in h)&&!("settings"in h))throw new Error("Expected usable value but received an empty preset, which is probably a mistake: presets typically come with `plugins` and sometimes with `settings`, but this has neither");p(h.plugins),h.settings&&(u.settings=ku(!0,u.settings,h.settings))}function p(h){let y=-1;if(h!=null)if(Array.isArray(h))for(;++y<h.length;){const b=h[y];d(b)}else throw new TypeError("Expected a list of plugins, not `"+h+"`")}function g(h,y){let b=-1,S=-1;for(;++b<s.length;)if(s[b][0]===h){S=b;break}if(S===-1)s.push([h,...y]);else if(y.length>0){let[v,...L]=y;const N=s[S][1];Fu(N)&&Fu(v)&&(v=ku(!0,N,v)),s[S]=[h,v,...L]}}}}const B9=new vd().freeze();function Cu(a,r){if(typeof r!="function")throw new TypeError("Cannot `"+a+"` without `parser`")}function Lu(a,r){if(typeof r!="function")throw new TypeError("Cannot `"+a+"` without `compiler`")}function Ou(a,r){if(r)throw new Error("Cannot call `"+a+"` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`.")}function bg(a){if(!Fu(a)||typeof a.type!="string")throw new TypeError("Expected node, got `"+a+"`")}function zg(a,r,l){if(!l)throw new Error("`"+a+"` finished async. Use `"+r+"` instead")}function Hs(a){return X9(a)?a:new xy(a)}function X9(a){return!!(a&&typeof a=="object"&&"message"in a&&"messages"in a)}function H9(a){return typeof a=="string"||Z9(a)}function Z9(a){return!!(a&&typeof a=="object"&&"byteLength"in a&&"byteOffset"in a)}const V9="https://github.com/remarkjs/react-markdown/blob/main/changelog.md",vg=[],Sg={allowDangerousHtml:!0},q9=/^(https?|ircs?|mailto|xmpp)$/i,Y9=[{from:"astPlugins",id:"remove-buggy-html-in-markdown-parser"},{from:"allowDangerousHtml",id:"remove-buggy-html-in-markdown-parser"},{from:"allowNode",id:"replace-allownode-allowedtypes-and-disallowedtypes",to:"allowElement"},{from:"allowedTypes",id:"replace-allownode-allowedtypes-and-disallowedtypes",to:"allowedElements"},{from:"className",id:"remove-classname"},{from:"disallowedTypes",id:"replace-allownode-allowedtypes-and-disallowedtypes",to:"disallowedElements"},{from:"escapeHtml",id:"remove-buggy-html-in-markdown-parser"},{from:"includeElementIndex",id:"#remove-includeelementindex"},{from:"includeNodeIndex",id:"change-includenodeindex-to-includeelementindex"},{from:"linkTarget",id:"remove-linktarget"},{from:"plugins",id:"change-plugins-to-remarkplugins",to:"remarkPlugins"},{from:"rawSourcePos",id:"#remove-rawsourcepos"},{from:"renderers",id:"change-renderers-to-components",to:"components"},{from:"source",id:"change-source-to-children",to:"children"},{from:"sourcePos",id:"#remove-sourcepos"},{from:"transformImageUri",id:"#add-urltransform",to:"urlTransform"},{from:"transformLinkUri",id:"#add-urltransform",to:"urlTransform"}];function G9(a){const r=Q9(a),l=K9(a);return F9(r.runSync(r.parse(l),l),a)}function Q9(a){const r=a.rehypePlugins||vg,l=a.remarkPlugins||vg,s=a.remarkRehypeOptions?{...a.remarkRehypeOptions,...Sg}:Sg;return B9().use(R1).use(l).use(x9,s).use(r)}function K9(a){const r=a.children||"",l=new xy;return typeof r=="string"&&(l.value=r),l}function F9(a,r){const l=r.allowedElements,s=r.allowElement,u=r.components,d=r.disallowedElements,f=r.skipHtml,p=r.unwrapDisallowed,g=r.urlTransform||J9;for(const y of Y9)Object.hasOwn(r,y.from)&&(""+y.from+(y.to?"use `"+y.to+"` instead":"remove it")+V9+y.id,void 0);return Ey(a,h),sv(a,{Fragment:re.Fragment,components:u,ignoreInvalidStyle:!0,jsx:re.jsx,jsxs:re.jsxs,passKeys:!0,passNode:!0});function h(y,b,S){if(y.type==="raw"&&S&&typeof b=="number")return f?S.children.splice(b,1):S.children[b]={type:"text",value:y.value},b;if(y.type==="element"){let v;for(v in Tu)if(Object.hasOwn(Tu,v)&&Object.hasOwn(y.properties,v)){const L=y.properties[v],N=Tu[v];(N===null||N.includes(y.tagName))&&(y.properties[v]=g(String(L||""),v,y))}}if(y.type==="element"){let v=l?!l.includes(y.tagName):d?d.includes(y.tagName):!1;if(!v&&s&&typeof b=="number"&&(v=!s(y,b,S)),v&&S&&typeof b=="number")return p&&y.children?S.children.splice(b,1,...y.children):S.children.splice(b,1),b}}}function J9(a){const r=a.indexOf(":"),l=a.indexOf("?"),s=a.indexOf("#"),u=a.indexOf("/");return r===-1||u!==-1&&r>u||l!==-1&&r>l||s!==-1&&r>s||q9.test(a.slice(0,r))?a:""}const $9=`**wizzard-packages**

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
`,eE=`[**wizzard-packages**](../../README.md)

***

[wizzard-packages](../../README.md) / adapter-yup/src

# adapter-yup/src

## Classes

- [YupAdapter](classes/YupAdapter.md)

## Interfaces

- [YupLikeError](interfaces/YupLikeError.md)
- [YupLikeSchema](interfaces/YupLikeSchema.md)
`,nE=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [adapter-yup/src](../README.md) / YupAdapter

# Class: YupAdapter\\<T\\>

Defined in: [adapter-yup/src/YupAdapter.ts:7](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/adapter-yup/src/YupAdapter.ts#L7)

Validation adapter for Yup-like schemas.

## Type Parameters

### T

\`T\`

## Implements

- [\`IValidatorAdapter\`](../../../react/src/interfaces/IValidatorAdapter.md)\\<\`T\`\\>

## Constructors

### Constructor

> **new YupAdapter**\\<\`T\`\\>(\`schema\`): \`YupAdapter\`\\<\`T\`\\>

Defined in: [adapter-yup/src/YupAdapter.ts:10](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/adapter-yup/src/YupAdapter.ts#L10)

#### Parameters

##### schema

[\`YupLikeSchema\`](../interfaces/YupLikeSchema.md)\\<\`T\`\\>

#### Returns

\`YupAdapter\`\\<\`T\`\\>

## Methods

### validate()

> **validate**(\`data\`): \`Promise\`\\<[\`ValidationResult\`](../../../react/src/type-aliases/ValidationResult.md)\\>

Defined in: [adapter-yup/src/YupAdapter.ts:14](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/adapter-yup/src/YupAdapter.ts#L14)

#### Parameters

##### data

\`unknown\`

#### Returns

\`Promise\`\\<[\`ValidationResult\`](../../../react/src/type-aliases/ValidationResult.md)\\>

#### Implementation of

[\`IValidatorAdapter\`](../../../react/src/interfaces/IValidatorAdapter.md).[\`validate\`](../../../react/src/interfaces/IValidatorAdapter.md#validate)
`,tE=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [adapter-yup/src](../README.md) / YupLikeError

# Interface: YupLikeError

Defined in: [adapter-yup/src/types.ts:11](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/adapter-yup/src/types.ts#L11)

Minimal structural interface for Yup-like validation errors.

## Properties

### inner

> **inner**: \`object\`[]

Defined in: [adapter-yup/src/types.ts:12](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/adapter-yup/src/types.ts#L12)

#### message

> **message**: \`string\`

#### path?

> \`optional\` **path**: \`string\`
`,aE=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [adapter-yup/src](../README.md) / YupLikeSchema

# Interface: YupLikeSchema\\<T\\>

Defined in: [adapter-yup/src/types.ts:4](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/adapter-yup/src/types.ts#L4)

Minimal structural interface for Yup-like schemas.

## Type Parameters

### T

\`T\` = \`any\`

## Properties

### validate()

> **validate**: (\`data\`, \`options\`) => \`Promise\`\\<\`any\`\\>

Defined in: [adapter-yup/src/types.ts:5](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/adapter-yup/src/types.ts#L5)

#### Parameters

##### data

\`T\`

##### options

###### abortEarly

\`boolean\`

#### Returns

\`Promise\`\\<\`any\`\\>
`,iE=`[**wizzard-packages**](../../README.md)

***

[wizzard-packages](../../README.md) / adapter-zod/src

# adapter-zod/src

## Classes

- [ZodAdapter](classes/ZodAdapter.md)

## Interfaces

- [ZodLikeSchema](interfaces/ZodLikeSchema.md)
`,rE=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [adapter-zod/src](../README.md) / ZodAdapter

# Class: ZodAdapter\\<T\\>

Defined in: [adapter-zod/src/ZodAdapter.ts:7](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/adapter-zod/src/ZodAdapter.ts#L7)

Validation adapter for Zod-like schemas.

## Type Parameters

### T

\`T\`

## Implements

- [\`IValidatorAdapter\`](../../../react/src/interfaces/IValidatorAdapter.md)\\<\`T\`\\>

## Constructors

### Constructor

> **new ZodAdapter**\\<\`T\`\\>(\`schema\`): \`ZodAdapter\`\\<\`T\`\\>

Defined in: [adapter-zod/src/ZodAdapter.ts:10](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/adapter-zod/src/ZodAdapter.ts#L10)

#### Parameters

##### schema

[\`ZodLikeSchema\`](../interfaces/ZodLikeSchema.md)\\<\`T\`\\>

#### Returns

\`ZodAdapter\`\\<\`T\`\\>

## Methods

### validate()

> **validate**(\`data\`): \`Promise\`\\<[\`ValidationResult\`](../../../react/src/type-aliases/ValidationResult.md)\\>

Defined in: [adapter-zod/src/ZodAdapter.ts:14](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/adapter-zod/src/ZodAdapter.ts#L14)

#### Parameters

##### data

\`unknown\`

#### Returns

\`Promise\`\\<[\`ValidationResult\`](../../../react/src/type-aliases/ValidationResult.md)\\>

#### Implementation of

[\`IValidatorAdapter\`](../../../react/src/interfaces/IValidatorAdapter.md).[\`validate\`](../../../react/src/interfaces/IValidatorAdapter.md#validate)
`,lE="[**wizzard-packages**](../../../README.md)\n\n***\n\n[wizzard-packages](../../../README.md) / [adapter-zod/src](../README.md) / ZodLikeSchema\n\n# Interface: ZodLikeSchema\\<T\\>\n\nDefined in: [adapter-zod/src/types.ts:4](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/adapter-zod/src/types.ts#L4)\n\nMinimal structural interface for Zod-like schemas.\n\n## Type Parameters\n\n### T\n\n`T` = `any`\n\n## Properties\n\n### safeParseAsync()\n\n> **safeParseAsync**: (`data`) => `Promise`\\<\\{ `data?`: `T`; `error?`: \\{ `issues`: `object`[]; \\}; `success`: `boolean`; \\}\\>\n\nDefined in: [adapter-zod/src/types.ts:5](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/adapter-zod/src/types.ts#L5)\n\n#### Parameters\n\n##### data\n\n`T`\n\n#### Returns\n\n`Promise`\\<\\{ `data?`: `T`; `error?`: \\{ `issues`: `object`[]; \\}; `success`: `boolean`; \\}\\>\n",sE=`[**wizzard-packages**](../../README.md)

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
`,oE=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [core/src](../README.md) / WizardStore

# Class: WizardStore\\<T, StepId\\>

Defined in: [core/src/store/WizardStore.ts:17](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/store/WizardStore.ts#L17)

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

Defined in: [core/src/store/WizardStore.ts:38](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/store/WizardStore.ts#L38)

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

Defined in: [core/src/store/WizardStore.ts:23](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/store/WizardStore.ts#L23)

#### Implementation of

[\`IWizardStore\`](../interfaces/IWizardStore.md).[\`errorsMap\`](../interfaces/IWizardStore.md#errorsmap)

## Methods

### clearStepStorage()

> **clearStepStorage**(\`stepId\`): \`void\`

Defined in: [core/src/store/WizardStore.ts:534](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/store/WizardStore.ts#L534)

#### Parameters

##### stepId

\`string\`

#### Returns

\`void\`

***

### deleteError()

> **deleteError**(\`stepId\`, \`path\`): \`boolean\`

Defined in: [core/src/store/WizardStore.ts:439](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/store/WizardStore.ts#L439)

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

Defined in: [core/src/store/WizardStore.ts:97](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/store/WizardStore.ts#L97)

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

Defined in: [core/src/store/WizardStore.ts:285](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/store/WizardStore.ts#L285)

Returns the current immutable snapshot of the wizard state.

#### Returns

[\`IWizardState\`](../interfaces/IWizardState.md)\\<\`T\`, \`StepId\`\\>

#### Implementation of

[\`IWizardStore\`](../interfaces/IWizardStore.md).[\`getSnapshot\`](../interfaces/IWizardStore.md#getsnapshot)

***

### goToStep()

> **goToStep**(\`stepId\`, \`options\`): \`Promise\`\\<\`boolean\`\\>

Defined in: [core/src/store/WizardStore.ts:775](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/store/WizardStore.ts#L775)

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

Defined in: [core/src/store/WizardStore.ts:471](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/store/WizardStore.ts#L471)

Restores wizard state from persistence storage.
Implements "latest wins" conflict resolution based on step timestamps.

#### Returns

\`void\`

#### Implementation of

[\`IWizardStore\`](../interfaces/IWizardStore.md).[\`hydrate\`](../interfaces/IWizardStore.md#hydrate)

***

### injectPersistence()

> **injectPersistence**(\`adapter\`): \`void\`

Defined in: [core/src/store/WizardStore.ts:463](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/store/WizardStore.ts#L463)

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

Defined in: [core/src/store/WizardStore.ts:616](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/store/WizardStore.ts#L616)

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

Defined in: [core/src/store/WizardStore.ts:547](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/store/WizardStore.ts#L547)

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

Defined in: [core/src/store/WizardStore.ts:377](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/store/WizardStore.ts#L377)

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

Defined in: [core/src/store/WizardStore.ts:419](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/store/WizardStore.ts#L419)

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

Defined in: [core/src/store/WizardStore.ts:458](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/store/WizardStore.ts#L458)

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

Defined in: [core/src/store/WizardStore.ts:29](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/store/WizardStore.ts#L29)

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

Defined in: [core/src/store/WizardStore.ts:296](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/store/WizardStore.ts#L296)

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

Defined in: [core/src/store/WizardStore.ts:406](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/store/WizardStore.ts#L406)

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

Defined in: [core/src/store/WizardStore.ts:330](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/store/WizardStore.ts#L330)

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

Defined in: [core/src/store/WizardStore.ts:751](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/store/WizardStore.ts#L751)

#### Returns

\`Promise\`\\<\\{ \`errors\`: \`Record\`\\<\`string\`, \`Record\`\\<\`string\`, \`string\`\\>\\>; \`isValid\`: \`boolean\`; \\}\\>

#### Implementation of

[\`IWizardStore\`](../interfaces/IWizardStore.md).[\`validateAll\`](../interfaces/IWizardStore.md#validateall)

***

### validateStep()

> **validateStep**(\`stepId\`): \`Promise\`\\<\`boolean\`\\>

Defined in: [core/src/store/WizardStore.ts:692](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/store/WizardStore.ts#L692)

#### Parameters

##### stepId

\`StepId\`

#### Returns

\`Promise\`\\<\`boolean\`\\>

#### Implementation of

[\`IWizardStore\`](../interfaces/IWizardStore.md).[\`validateStep\`](../interfaces/IWizardStore.md#validatestep)
`,cE=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [core/src](../README.md) / getByPath

# Function: getByPath()

> **getByPath**(\`obj\`, \`path\`, \`defaultValue?\`): \`unknown\`

Defined in: [core/src/utils/data.ts:32](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/utils/data.ts#L32)

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
`,uE=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [core/src](../README.md) / setByPath

# Function: setByPath()

> **setByPath**\\<\`T\`\\>(\`obj\`, \`path\`, \`value\`): \`T\`

Defined in: [core/src/utils/data.ts:54](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/utils/data.ts#L54)

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
`,dE=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [core/src](../README.md) / shallowEqual

# Function: shallowEqual()

> **shallowEqual**(\`a\`, \`b\`): \`boolean\`

Defined in: [core/src/utils/data.ts:99](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/utils/data.ts#L99)

Simple shallow equality check.

## Parameters

### a

\`any\`

### b

\`any\`

## Returns

\`boolean\`
`,fE=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [core/src](../README.md) / toPath

# Function: toPath()

> **toPath**(\`path\`): \`string\`[]

Defined in: [core/src/utils/data.ts:9](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/utils/data.ts#L9)

Parses a string path into an array of keys using a cache.

## Parameters

### path

\`string\`

## Returns

\`string\`[]
`,pE=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [core/src](../README.md) / IBreadcrumb

# Interface: IBreadcrumb\\<StepId\\>

Defined in: [core/src/types.ts:311](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L311)

Breadcrumb Interface

## Type Parameters

### StepId

\`StepId\` *extends* \`string\` = \`string\`

## Properties

### id

> **id**: \`StepId\`

Defined in: [core/src/types.ts:312](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L312)

***

### label

> **label**: \`string\`

Defined in: [core/src/types.ts:313](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L313)

***

### status

> **status**: [\`BreadcrumbStatus\`](../type-aliases/BreadcrumbStatus.md)

Defined in: [core/src/types.ts:314](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L314)
`,hE=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [core/src](../README.md) / IPersistenceAdapter

# Interface: IPersistenceAdapter

Defined in: [core/src/types.ts:141](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L141)

Persistence Adapter Interface

## Properties

### clear()

> **clear**: () => \`void\`

Defined in: [core/src/types.ts:146](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L146)

#### Returns

\`void\`

***

### clearStep()

> **clearStep**: (\`stepId\`) => \`void\`

Defined in: [core/src/types.ts:145](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L145)

#### Parameters

##### stepId

\`string\`

#### Returns

\`void\`

***

### getStep()

> **getStep**: \\<\`T\`\\>(\`stepId\`) => \`T\` \\| \`undefined\`

Defined in: [core/src/types.ts:143](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L143)

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

Defined in: [core/src/types.ts:144](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L144)

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

Defined in: [core/src/types.ts:142](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L142)

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
`,mE=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [core/src](../README.md) / IStepConfig

# Interface: IStepConfig\\<TStepData, StepId\\>

Defined in: [core/src/types.ts:157](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L157)

Step Configuration

## Type Parameters

### TStepData

\`TStepData\` = \`unknown\`

### StepId

\`StepId\` *extends* \`string\` = \`string\`

## Properties

### ~~autoValidate?~~

> \`optional\` **autoValidate**: \`boolean\`

Defined in: [core/src/types.ts:179](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L179)

#### Deprecated

Use validationMode instead

***

### beforeLeave()?

> \`optional\` **beforeLeave**: (\`data\`, \`direction\`, \`metadata\`) => \`boolean\` \\| \`Promise\`\\<\`boolean\`\\>

Defined in: [core/src/types.ts:169](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L169)

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

Defined in: [core/src/types.ts:189](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L189)

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

Defined in: [core/src/types.ts:185](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L185)

***

### component?

> \`optional\` **component**: \`any\`

Defined in: [core/src/types.ts:181](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L181)

***

### condition()?

> \`optional\` **condition**: (\`data\`, \`metadata\`) => \`boolean\` \\| \`Promise\`\\<\`boolean\`\\>

Defined in: [core/src/types.ts:160](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L160)

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

Defined in: [core/src/types.ts:168](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L168)

***

### dependsOn?

> \`optional\` **dependsOn**: \`string\`[]

Defined in: [core/src/types.ts:184](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L184)

***

### id

> **id**: \`StepId\`

Defined in: [core/src/types.ts:158](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L158)

***

### label

> **label**: \`string\`

Defined in: [core/src/types.ts:159](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L159)

***

### persistenceAdapter?

> \`optional\` **persistenceAdapter**: [\`IPersistenceAdapter\`](IPersistenceAdapter.md)

Defined in: [core/src/types.ts:182](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L182)

***

### persistenceMode?

> \`optional\` **persistenceMode**: [\`PersistenceMode\`](../type-aliases/PersistenceMode.md)

Defined in: [core/src/types.ts:183](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L183)

***

### showWhilePending?

> \`optional\` **showWhilePending**: \`boolean\`

Defined in: [core/src/types.ts:167](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L167)

***

### validationAdapter?

> \`optional\` **validationAdapter**: [\`IValidatorAdapter\`](IValidatorAdapter.md)\\<\`TStepData\`\\>

Defined in: [core/src/types.ts:177](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L177)

***

### validationMode?

> \`optional\` **validationMode**: [\`ValidationMode\`](../type-aliases/ValidationMode.md)

Defined in: [core/src/types.ts:180](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L180)
`,gE=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [core/src](../README.md) / IValidatorAdapter

# Interface: IValidatorAdapter\\<TData\\>

Defined in: [core/src/types.ts:125](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L125)

Validator Adapter Interface

## Type Parameters

### TData

\`TData\` = \`unknown\`

## Properties

### validate()

> **validate**: (\`data\`) => [\`ValidationResult\`](../type-aliases/ValidationResult.md) \\| \`Promise\`\\<[\`ValidationResult\`](../type-aliases/ValidationResult.md)\\>

Defined in: [core/src/types.ts:126](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L126)

#### Parameters

##### data

\`TData\`

#### Returns

[\`ValidationResult\`](../type-aliases/ValidationResult.md) \\| \`Promise\`\\<[\`ValidationResult\`](../type-aliases/ValidationResult.md)\\>
`,yE=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [core/src](../README.md) / IWizardActions

# Interface: IWizardActions\\<StepId\\>

Defined in: [core/src/types.ts:90](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L90)

Public actions available to control the wizard.

## Extended by

- [\`IWizardContext\`](IWizardContext.md)

## Type Parameters

### StepId

\`StepId\` *extends* \`string\` = \`string\`

## Properties

### clearStorage()

> **clearStorage**: () => \`void\`

Defined in: [core/src/types.ts:106](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L106)

#### Returns

\`void\`

***

### getData()

> **getData**: (\`path\`, \`defaultValue?\`) => \`unknown\`

Defined in: [core/src/types.ts:110](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L110)

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

Defined in: [core/src/types.ts:91](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L91)

#### Returns

\`Promise\`\\<\`void\`\\>

***

### goToPrevStep()

> **goToPrevStep**: () => \`Promise\`\\<\`void\`\\>

Defined in: [core/src/types.ts:92](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L92)

#### Returns

\`Promise\`\\<\`void\`\\>

***

### goToStep()

> **goToStep**: (\`stepId\`, \`providedActiveSteps?\`, \`options?\`) => \`Promise\`\\<\`boolean\`\\>

Defined in: [core/src/types.ts:93](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L93)

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

Defined in: [core/src/types.ts:99](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L99)

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

Defined in: [core/src/types.ts:107](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L107)

#### Returns

\`void\`

***

### save()

> **save**: (\`stepIds?\`) => \`void\`

Defined in: [core/src/types.ts:105](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L105)

#### Parameters

##### stepIds?

\`boolean\` | \`StepId\` | \`StepId\`[]

#### Returns

\`void\`

***

### setData()

> **setData**: (\`path\`, \`value\`, \`options?\`) => \`void\`

Defined in: [core/src/types.ts:108](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L108)

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

Defined in: [core/src/types.ts:98](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L98)

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

Defined in: [core/src/types.ts:111](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L111)

#### Parameters

##### config

\`Partial\`\\<[\`IWizardConfig\`](IWizardConfig.md)\\<\`any\`, \`StepId\`\\>\\>

#### Returns

\`void\`

***

### updateData()

> **updateData**: (\`data\`, \`options?\`) => \`void\`

Defined in: [core/src/types.ts:109](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L109)

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

Defined in: [core/src/types.ts:101](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L101)

#### Returns

\`Promise\`\\<\\{ \`errors\`: \`Record\`\\<\`string\`, \`Record\`\\<\`string\`, \`string\`\\>\\>; \`isValid\`: \`boolean\`; \\}\\>

***

### validateStep()

> **validateStep**: (\`sid\`) => \`Promise\`\\<\`boolean\`\\>

Defined in: [core/src/types.ts:100](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L100)

#### Parameters

##### sid

\`StepId\`

#### Returns

\`Promise\`\\<\`boolean\`\\>
`,bE=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [core/src](../README.md) / IWizardConfig

# Interface: IWizardConfig\\<T, StepId\\>

Defined in: [core/src/types.ts:201](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L201)

Global Wizard Configuration.

## Type Parameters

### T

\`T\` = \`unknown\`

### StepId

\`StepId\` *extends* \`string\` = \`string\`

## Properties

### analytics?

> \`optional\` **analytics**: \`object\`

Defined in: [core/src/types.ts:214](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L214)

#### onEvent

> **onEvent**: [\`WizardEventHandler\`](../type-aliases/WizardEventHandler.md)\\<\`StepId\`\\>

***

### ~~autoValidate?~~

> \`optional\` **autoValidate**: \`boolean\`

Defined in: [core/src/types.ts:204](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L204)

#### Deprecated

Use validationMode instead

***

### middlewares?

> \`optional\` **middlewares**: [\`WizardMiddleware\`](../type-aliases/WizardMiddleware.md)\\<\`T\`, \`StepId\`\\>[]

Defined in: [core/src/types.ts:217](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L217)

***

### navigationMode?

> \`optional\` **navigationMode**: \`"sequential"\` \\| \`"visited"\` \\| \`"free"\`

Defined in: [core/src/types.ts:218](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L218)

***

### onConflict?

> \`optional\` **onConflict**: \`"merge"\` \\| \`"replace"\` \\| \`"keep-local"\`

Defined in: [core/src/types.ts:213](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L213)

***

### onStepChange()?

> \`optional\` **onStepChange**: (\`fromStep\`, \`toStep\`, \`data\`) => \`void\`

Defined in: [core/src/types.ts:219](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L219)

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

Defined in: [core/src/types.ts:207](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L207)

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

Defined in: [core/src/types.ts:202](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L202)

***

### validationDebounceTime?

> \`optional\` **validationDebounceTime**: \`number\`

Defined in: [core/src/types.ts:206](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L206)

***

### validationMode?

> \`optional\` **validationMode**: [\`ValidationMode\`](../type-aliases/ValidationMode.md)

Defined in: [core/src/types.ts:205](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L205)
`,zE=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [core/src](../README.md) / IWizardContext

# Interface: IWizardContext\\<T, StepId\\>

Defined in: [core/src/types.ts:320](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L320)

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

Defined in: [core/src/types.ts:26](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L26)

List of steps that currently meet their visibility conditions

#### Inherited from

\`Omit.activeSteps\`

***

### activeStepsCount

> **activeStepsCount**: \`number\`

Defined in: [core/src/types.ts:44](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L44)

Number of active steps

#### Inherited from

\`Omit.activeStepsCount\`

***

### allErrors

> **allErrors**: \`Record\`\\<\`StepId\`, \`Record\`\\<\`string\`, \`string\`\\>\\>

Defined in: [core/src/types.ts:333](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L333)

All errors by step and field.

***

### breadcrumbs

> **breadcrumbs**: [\`IBreadcrumb\`](IBreadcrumb.md)\\<\`StepId\`\\>[]

Defined in: [core/src/types.ts:52](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L52)

Breadcrumb items for navigation UI

#### Inherited from

\`Omit.breadcrumbs\`

***

### busySteps

> **busySteps**: \`Set\`\\<\`StepId\`\\>

Defined in: [core/src/types.ts:32](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L32)

Set of step IDs that are currently performing async work

#### Inherited from

\`Omit.busySteps\`

***

### clearStorage()

> **clearStorage**: () => \`void\`

Defined in: [core/src/types.ts:106](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L106)

#### Returns

\`void\`

#### Inherited from

[\`IWizardActions\`](IWizardActions.md).[\`clearStorage\`](IWizardActions.md#clearstorage)

***

### completedSteps

> **completedSteps**: \`Set\`\\<\`StepId\`\\>

Defined in: [core/src/types.ts:36](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L36)

Set of step IDs that have passed validation

#### Inherited from

\`Omit.completedSteps\`

***

### config

> **config**: [\`IWizardConfig\`](IWizardConfig.md)\\<\`T\`, \`StepId\`\\>

Defined in: [core/src/types.ts:40](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L40)

Current wizard configuration

#### Inherited from

\`Omit.config\`

***

### currentStep

> **currentStep**: [\`IStepConfig\`](IStepConfig.md)\\<\`T\`, \`StepId\`\\> \\| \`null\`

Defined in: [core/src/types.ts:14](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L14)

Active step configuration (if any)

#### Inherited from

\`Omit.currentStep\`

***

### currentStepId

> **currentStepId**: \`""\` \\| \`StepId\`

Defined in: [core/src/types.ts:28](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L28)

String ID of the current step

#### Inherited from

\`Omit.currentStepId\`

***

### currentStepIndex

> **currentStepIndex**: \`number\`

Defined in: [core/src/types.ts:16](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L16)

Numeric index of current step in active steps list

#### Inherited from

\`Omit.currentStepIndex\`

***

### data

> **data**: \`T\`

Defined in: [core/src/types.ts:10](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L10)

Global wizard data object

#### Inherited from

\`Omit.data\`

***

### dirtyFields

> **dirtyFields**: \`Set\`\\<\`string\`\\>

Defined in: [core/src/types.ts:50](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L50)

Set of paths to fields that have been modified

#### Inherited from

\`Omit.dirtyFields\`

***

### errors

> **errors**: \`Record\`\\<\`string\`, \`string\`\\>

Defined in: [core/src/types.ts:329](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L329)

Combined error map (flat)

***

### errorSteps

> **errorSteps**: \`Set\`\\<\`StepId\`\\>

Defined in: [core/src/types.ts:38](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L38)

Set of step IDs that currently have active validation errors

#### Inherited from

\`Omit.errorSteps\`

***

### getData()

> **getData**: (\`path\`, \`defaultValue?\`) => \`unknown\`

Defined in: [core/src/types.ts:110](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L110)

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

Defined in: [core/src/types.ts:91](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L91)

#### Returns

\`Promise\`\\<\`void\`\\>

#### Inherited from

[\`IWizardActions\`](IWizardActions.md).[\`goToNextStep\`](IWizardActions.md#gotonextstep)

***

### goToPrevStep()

> **goToPrevStep**: () => \`Promise\`\\<\`void\`\\>

Defined in: [core/src/types.ts:92](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L92)

#### Returns

\`Promise\`\\<\`void\`\\>

#### Inherited from

[\`IWizardActions\`](IWizardActions.md).[\`goToPrevStep\`](IWizardActions.md#gotoprevstep)

***

### goToStep()

> **goToStep**: (\`stepId\`, \`providedActiveSteps?\`, \`options?\`) => \`Promise\`\\<\`boolean\`\\>

Defined in: [core/src/types.ts:93](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L93)

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

Defined in: [core/src/types.ts:54](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L54)

Result of the last goToStep action

#### Inherited from

\`Omit.goToStepResult\`

***

### handleStepChange()

> **handleStepChange**: (\`field\`, \`value\`) => \`void\`

Defined in: [core/src/types.ts:99](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L99)

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

Defined in: [core/src/types.ts:30](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L30)

History of visited steps (navigation path)

#### Inherited from

\`Omit.history\`

***

### isBusy

> **isBusy**: \`boolean\`

Defined in: [core/src/types.ts:46](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L46)

Alias for isPending

#### Inherited from

\`Omit.isBusy\`

***

### isDirty

> **isDirty**: \`boolean\`

Defined in: [core/src/types.ts:48](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L48)

True if any field has been modified since initialization

#### Inherited from

\`Omit.isDirty\`

***

### isFirstStep

> **isFirstStep**: \`boolean\`

Defined in: [core/src/types.ts:18](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L18)

True if currently on the first active step

#### Inherited from

\`Omit.isFirstStep\`

***

### isLastStep

> **isLastStep**: \`boolean\`

Defined in: [core/src/types.ts:20](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L20)

True if currently on the last active step

#### Inherited from

\`Omit.isLastStep\`

***

### isLoading

> **isLoading**: \`boolean\`

Defined in: [core/src/types.ts:22](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L22)

True if the wizard is in an initial loading/hydrating state

#### Inherited from

\`Omit.isLoading\`

***

### isPending

> **isPending**: \`boolean\`

Defined in: [core/src/types.ts:24](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L24)

True if an async action (like navigation or validation) is in progress

#### Inherited from

\`Omit.isPending\`

***

### progress

> **progress**: \`number\`

Defined in: [core/src/types.ts:42](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L42)

Percentage of completion (0-100)

#### Inherited from

\`Omit.progress\`

***

### reset()

> **reset**: () => \`void\`

Defined in: [core/src/types.ts:107](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L107)

#### Returns

\`void\`

#### Inherited from

[\`IWizardActions\`](IWizardActions.md).[\`reset\`](IWizardActions.md#reset)

***

### save()

> **save**: (\`stepIds?\`) => \`void\`

Defined in: [core/src/types.ts:105](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L105)

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

Defined in: [core/src/types.ts:108](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L108)

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

Defined in: [core/src/types.ts:98](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L98)

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

Defined in: [core/src/types.ts:325](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L325)

The internal store instance.

***

### updateConfig()

> **updateConfig**: (\`config\`) => \`void\`

Defined in: [core/src/types.ts:111](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L111)

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

Defined in: [core/src/types.ts:109](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L109)

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

Defined in: [core/src/types.ts:101](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L101)

#### Returns

\`Promise\`\\<\\{ \`errors\`: \`Record\`\\<\`string\`, \`Record\`\\<\`string\`, \`string\`\\>\\>; \`isValid\`: \`boolean\`; \\}\\>

#### Inherited from

[\`IWizardActions\`](IWizardActions.md).[\`validateAll\`](IWizardActions.md#validateall)

***

### validateStep()

> **validateStep**: (\`sid\`) => \`Promise\`\\<\`boolean\`\\>

Defined in: [core/src/types.ts:100](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L100)

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

Defined in: [core/src/types.ts:34](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L34)

Set of step IDs that have been visited by the user

#### Inherited from

\`Omit.visitedSteps\`
`,vE=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [core/src](../README.md) / IWizardState

# Interface: IWizardState\\<T, StepId\\>

Defined in: [core/src/types.ts:8](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L8)

Full state of the wizard.

## Type Parameters

### T

\`T\` = \`unknown\`

### StepId

\`StepId\` *extends* \`string\` = \`string\`

## Properties

### activeSteps

> **activeSteps**: [\`IStepConfig\`](IStepConfig.md)\\<\`T\`, \`StepId\`\\>[]

Defined in: [core/src/types.ts:26](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L26)

List of steps that currently meet their visibility conditions

***

### activeStepsCount

> **activeStepsCount**: \`number\`

Defined in: [core/src/types.ts:44](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L44)

Number of active steps

***

### breadcrumbs

> **breadcrumbs**: [\`IBreadcrumb\`](IBreadcrumb.md)\\<\`StepId\`\\>[]

Defined in: [core/src/types.ts:52](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L52)

Breadcrumb items for navigation UI

***

### busySteps

> **busySteps**: \`Set\`\\<\`StepId\`\\>

Defined in: [core/src/types.ts:32](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L32)

Set of step IDs that are currently performing async work

***

### completedSteps

> **completedSteps**: \`Set\`\\<\`StepId\`\\>

Defined in: [core/src/types.ts:36](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L36)

Set of step IDs that have passed validation

***

### config

> **config**: [\`IWizardConfig\`](IWizardConfig.md)\\<\`T\`, \`StepId\`\\>

Defined in: [core/src/types.ts:40](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L40)

Current wizard configuration

***

### currentStep

> **currentStep**: [\`IStepConfig\`](IStepConfig.md)\\<\`T\`, \`StepId\`\\> \\| \`null\`

Defined in: [core/src/types.ts:14](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L14)

Active step configuration (if any)

***

### currentStepId

> **currentStepId**: \`""\` \\| \`StepId\`

Defined in: [core/src/types.ts:28](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L28)

String ID of the current step

***

### currentStepIndex

> **currentStepIndex**: \`number\`

Defined in: [core/src/types.ts:16](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L16)

Numeric index of current step in active steps list

***

### data

> **data**: \`T\`

Defined in: [core/src/types.ts:10](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L10)

Global wizard data object

***

### dirtyFields

> **dirtyFields**: \`Set\`\\<\`string\`\\>

Defined in: [core/src/types.ts:50](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L50)

Set of paths to fields that have been modified

***

### errors

> **errors**: \`Record\`\\<\`StepId\`, \`Record\`\\<\`string\`, \`string\`\\>\\>

Defined in: [core/src/types.ts:12](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L12)

Current errors map by step and field

***

### errorSteps

> **errorSteps**: \`Set\`\\<\`StepId\`\\>

Defined in: [core/src/types.ts:38](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L38)

Set of step IDs that currently have active validation errors

***

### goToStepResult?

> \`optional\` **goToStepResult**: \`boolean\` \\| \`"init"\` \\| \`null\`

Defined in: [core/src/types.ts:54](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L54)

Result of the last goToStep action

***

### history

> **history**: \`StepId\`[]

Defined in: [core/src/types.ts:30](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L30)

History of visited steps (navigation path)

***

### isBusy

> **isBusy**: \`boolean\`

Defined in: [core/src/types.ts:46](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L46)

Alias for isPending

***

### isDirty

> **isDirty**: \`boolean\`

Defined in: [core/src/types.ts:48](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L48)

True if any field has been modified since initialization

***

### isFirstStep

> **isFirstStep**: \`boolean\`

Defined in: [core/src/types.ts:18](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L18)

True if currently on the first active step

***

### isLastStep

> **isLastStep**: \`boolean\`

Defined in: [core/src/types.ts:20](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L20)

True if currently on the last active step

***

### isLoading

> **isLoading**: \`boolean\`

Defined in: [core/src/types.ts:22](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L22)

True if the wizard is in an initial loading/hydrating state

***

### isPending

> **isPending**: \`boolean\`

Defined in: [core/src/types.ts:24](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L24)

True if an async action (like navigation or validation) is in progress

***

### progress

> **progress**: \`number\`

Defined in: [core/src/types.ts:42](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L42)

Percentage of completion (0-100)

***

### visitedSteps

> **visitedSteps**: \`Set\`\\<\`StepId\`\\>

Defined in: [core/src/types.ts:34](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L34)

Set of step IDs that have been visited by the user
`,SE=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [core/src](../README.md) / IWizardStore

# Interface: IWizardStore\\<T, StepId\\>

Defined in: [core/src/types.ts:60](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L60)

Store interface for reading state and dispatching actions.

## Type Parameters

### T

\`T\`

### StepId

\`StepId\` *extends* \`string\` = \`string\`

## Properties

### errorsMap

> **errorsMap**: \`Map\`\\<\`string\`, \`Map\`\\<\`string\`, \`string\`\\>\\>

Defined in: [core/src/types.ts:74](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L74)

***

### validateAll()

> **validateAll**: () => \`Promise\`\\<\\{ \`errors\`: \`Record\`\\<\`string\`, \`Record\`\\<\`string\`, \`string\`\\>\\>; \`isValid\`: \`boolean\`; \\}\\>

Defined in: [core/src/types.ts:81](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L81)

#### Returns

\`Promise\`\\<\\{ \`errors\`: \`Record\`\\<\`string\`, \`Record\`\\<\`string\`, \`string\`\\>\\>; \`isValid\`: \`boolean\`; \\}\\>

***

### validateStep()

> **validateStep**: (\`stepId\`) => \`Promise\`\\<\`boolean\`\\>

Defined in: [core/src/types.ts:80](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L80)

#### Parameters

##### stepId

\`StepId\`

#### Returns

\`Promise\`\\<\`boolean\`\\>

## Methods

### deleteError()

> **deleteError**(\`stepId\`, \`path\`): \`boolean\`

Defined in: [core/src/types.ts:68](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L68)

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

Defined in: [core/src/types.ts:62](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L62)

#### Parameters

##### action

[\`WizardAction\`](../type-aliases/WizardAction.md)\\<\`T\`, \`StepId\`\\>

#### Returns

\`void\`

***

### getSnapshot()

> **getSnapshot**(): [\`IWizardState\`](IWizardState.md)\\<\`T\`, \`StepId\`\\>

Defined in: [core/src/types.ts:61](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L61)

#### Returns

[\`IWizardState\`](IWizardState.md)\\<\`T\`, \`StepId\`\\>

***

### goToStep()

> **goToStep**(\`stepId\`, \`options?\`): \`Promise\`\\<\`boolean\`\\>

Defined in: [core/src/types.ts:76](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L76)

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

Defined in: [core/src/types.ts:73](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L73)

#### Returns

\`void\`

***

### injectPersistence()

> **injectPersistence**(\`adapter\`): \`void\`

Defined in: [core/src/types.ts:71](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L71)

#### Parameters

##### adapter

[\`IPersistenceAdapter\`](IPersistenceAdapter.md)

#### Returns

\`void\`

***

### resolveActiveSteps()

> **resolveActiveSteps**(\`data?\`): \`Promise\`\\<[\`IStepConfig\`](IStepConfig.md)\\<\`T\`, \`StepId\`\\>[]\\>

Defined in: [core/src/types.ts:75](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L75)

#### Parameters

##### data?

\`T\`

#### Returns

\`Promise\`\\<[\`IStepConfig\`](IStepConfig.md)\\<\`T\`, \`StepId\`\\>[]\\>

***

### save()

> **save**(\`stepId?\`): \`void\`

Defined in: [core/src/types.ts:72](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L72)

#### Parameters

##### stepId?

\`StepId\`

#### Returns

\`void\`

***

### setInitialData()

> **setInitialData**(\`data\`): \`void\`

Defined in: [core/src/types.ts:65](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L65)

#### Parameters

##### data

\`T\`

#### Returns

\`void\`

***

### setStepErrors()

> **setStepErrors**(\`stepId\`, \`errors\`): \`boolean\`

Defined in: [core/src/types.ts:67](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L67)

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

Defined in: [core/src/types.ts:69](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L69)

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

Defined in: [core/src/types.ts:70](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L70)

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

Defined in: [core/src/types.ts:63](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L63)

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

Defined in: [core/src/types.ts:66](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L66)

#### Parameters

##### newErrors

\`Record\`\\<\`string\`, \`Record\`\\<\`string\`, \`string\`\\>\\>

#### Returns

\`void\`

***

### updateMeta()

> **updateMeta**(\`newMeta\`): \`void\`

Defined in: [core/src/types.ts:64](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L64)

#### Parameters

##### newMeta

\`Partial\`\\<[\`IWizardState\`](IWizardState.md)\\<\`T\`, \`StepId\`\\>\\>

#### Returns

\`void\`
`,EE=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [core/src](../README.md) / MiddlewareAPI

# Interface: MiddlewareAPI\\<T, StepId\\>

Defined in: [core/src/types.ts:258](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L258)

Middleware API

## Type Parameters

### T

\`T\` = \`any\`

### StepId

\`StepId\` *extends* \`string\` = \`string\`

## Properties

### dispatch()

> **dispatch**: (\`action\`) => \`void\`

Defined in: [core/src/types.ts:259](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L259)

#### Parameters

##### action

[\`WizardAction\`](../type-aliases/WizardAction.md)\\<\`T\`, \`StepId\`\\>

#### Returns

\`void\`

***

### getSnapshot()

> **getSnapshot**: () => [\`IWizardState\`](IWizardState.md)\\<\`T\`, \`StepId\`\\>

Defined in: [core/src/types.ts:261](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L261)

#### Returns

[\`IWizardState\`](IWizardState.md)\\<\`T\`, \`StepId\`\\>

***

### getState()

> **getState**: () => \`T\`

Defined in: [core/src/types.ts:260](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L260)

#### Returns

\`T\`
`,xE=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [core/src](../README.md) / BreadcrumbStatus

# Type Alias: BreadcrumbStatus

> **BreadcrumbStatus** = \`"visited"\` \\| \`"current"\` \\| \`"upcoming"\` \\| \`"completed"\` \\| \`"error"\` \\| \`"hidden"\`

Defined in: [core/src/types.ts:300](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L300)

Breadcrumb Status
`,DE="[**wizzard-packages**](../../../README.md)\n\n***\n\n[wizzard-packages](../../../README.md) / [core/src](../README.md) / Path\n\n# Type Alias: Path\\<T\\>\n\n> **Path**\\<`T`\\> = `T` *extends* `ReadonlyArray`\\<infer V\\> ? `IsTuple`\\<`T`\\> *extends* `true` ? `{ [K in TupleKeys<T>]-?: PathImpl<K & string, T[K]> }`\\[`TupleKeys`\\<`T`\\>\\] : `PathImpl`\\<`number`, `V`\\> : `{ [K in keyof T]-?: PathImpl<K & string, T[K]> }`\\[keyof `T`\\]\n\nDefined in: [core/src/utils/types.ts:18](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/utils/types.ts#L18)\n\nDot-notation path for a nested data type.\n\n## Type Parameters\n\n### T\n\n`T`\n",TE="[**wizzard-packages**](../../../README.md)\n\n***\n\n[wizzard-packages](../../../README.md) / [core/src](../README.md) / PathValue\n\n# Type Alias: PathValue\\<T, P\\>\n\n> **PathValue**\\<`T`, `P`\\> = `T` *extends* `any` ? `P` *extends* `` `${infer K}.${infer R}` `` ? `K` *extends* keyof `T` ? `R` *extends* [`Path`](Path.md)\\<`T`\\[`K`\\]\\> ? `PathValue`\\<`T`\\[`K`\\], `R`\\> : `never` : `K` *extends* `` `${number}` `` ? `T` *extends* `ReadonlyArray`\\<infer V\\> ? `R` *extends* [`Path`](Path.md)\\<`V`\\> ? `PathValue`\\<`V`, `R`\\> : `never` : `never` : `never` : `P` *extends* keyof `T` ? `T`\\[`P`\\] : `P` *extends* `` `${number}` `` ? `T` *extends* `ReadonlyArray`\\<infer V\\> ? `V` : `never` : `never` : `never`\n\nDefined in: [core/src/utils/types.ts:32](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/utils/types.ts#L32)\n\nValue type resolved from a dot-notation path.\n\n## Type Parameters\n\n### T\n\n`T`\n\n### P\n\n`P` *extends* [`Path`](Path.md)\\<`T`\\>\n",AE=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [core/src](../README.md) / PersistenceMode

# Type Alias: PersistenceMode

> **PersistenceMode** = \`"onStepChange"\` \\| \`"onChange"\` \\| \`"manual"\`

Defined in: [core/src/types.ts:132](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L132)

Persistence strategy for step data.
`,wE=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [core/src](../README.md) / StepDirection

# Type Alias: StepDirection

> **StepDirection** = \`"next"\` \\| \`"prev"\`

Defined in: [core/src/types.ts:152](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L152)

Step Navigation Direction
`,RE=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [core/src](../README.md) / ValidationMode

# Type Alias: ValidationMode

> **ValidationMode** = \`"onChange"\` \\| \`"onStepChange"\` \\| \`"manual"\`

Defined in: [core/src/types.ts:136](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L136)

Validation strategy for step data.
`,kE=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [core/src](../README.md) / ValidationResult

# Type Alias: ValidationResult

> **ValidationResult** = \`object\`

Defined in: [core/src/types.ts:117](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L117)

Validation Result Interface

## Properties

### errors?

> \`optional\` **errors**: \`Record\`\\<\`string\`, \`string\`\\>

Defined in: [core/src/types.ts:119](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L119)

***

### isValid

> **isValid**: \`boolean\`

Defined in: [core/src/types.ts:118](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L118)
`,IE='[**wizzard-packages**](../../../README.md)\n\n***\n\n[wizzard-packages](../../../README.md) / [core/src](../README.md) / WizardAction\n\n# Type Alias: WizardAction\\<T, StepId\\>\n\n> **WizardAction**\\<`T`, `StepId`\\> = \\{ `payload`: \\{ `config`: [`IWizardConfig`](../interfaces/IWizardConfig.md)\\<`T`, `StepId`\\>; `data`: `T`; \\}; `type`: `"INIT"`; \\} \\| \\{ `payload`: \\{ `options?`: `any`; `path`: `string`; `value`: `any`; \\}; `type`: `"SET_DATA"`; \\} \\| \\{ `payload`: \\{ `data`: `Partial`\\<`T`\\>; `options?`: `any`; \\}; `type`: `"UPDATE_DATA"`; \\} \\| \\{ `payload`: \\{ `from`: `StepId`; `nextHistory?`: `StepId`[]; `nextVisitedSteps?`: `Set`\\<`StepId`\\>; `result`: `boolean` \\| `null` \\| `"init"`; `to`: `StepId`; \\}; `type`: `"GO_TO_STEP"`; \\} \\| \\{ `payload`: \\{ `stepId`: `StepId`; \\}; `type`: `"VALIDATE_START"`; \\} \\| \\{ `payload`: \\{ `result`: [`ValidationResult`](ValidationResult.md); `stepId`: `StepId`; \\}; `type`: `"VALIDATE_END"`; \\} \\| \\{ `payload`: \\{ `errors`: `Record`\\<`string`, `string`\\> \\| `undefined` \\| `null`; `stepId`: `StepId`; \\}; `type`: `"SET_STEP_ERRORS"`; \\} \\| \\{ `payload`: \\{ `data`: `T`; \\}; `type`: `"RESET"`; \\} \\| \\{ `payload`: \\{ `meta`: `Partial`\\<[`IWizardState`](../interfaces/IWizardState.md)\\<`T`, `StepId`\\>\\>; \\}; `type`: `"UPDATE_META"`; \\} \\| \\{ `payload`: \\{ `stepId`: `StepId` \\| `""`; \\}; `type`: `"SET_CURRENT_STEP_ID"`; \\} \\| \\{ `payload`: \\{ `history`: `StepId`[]; \\}; `type`: `"SET_HISTORY"`; \\} \\| \\{ `payload`: \\{ `steps`: [`IStepConfig`](../interfaces/IStepConfig.md)\\<`T`, `StepId`\\>[]; \\}; `type`: `"SET_ACTIVE_STEPS"`; \\} \\| \\{ `payload`: \\{ `steps`: `Set`\\<`StepId`\\>; \\}; `type`: `"SET_VISITED_STEPS"`; \\} \\| \\{ `payload`: \\{ `steps`: `Set`\\<`StepId`\\>; \\}; `type`: `"SET_COMPLETED_STEPS"`; \\} \\| \\{ `payload`: \\{ `steps`: `Set`\\<`StepId`\\>; \\}; `type`: `"SET_ERROR_STEPS"`; \\} \\| \\{ `payload`: \\{ `snapshot`: `any`; \\}; `type`: `"RESTORE_SNAPSHOT"`; \\}\n\nDefined in: [core/src/types.ts:225](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L225)\n\nAction Types\n\n## Type Parameters\n\n### T\n\n`T` = `any`\n\n### StepId\n\n`StepId` *extends* `string` = `string`\n',ME=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [core/src](../README.md) / WizardEventHandler

# Type Alias: WizardEventHandler()\\<StepId\\>

> **WizardEventHandler**\\<\`StepId\`\\> = \\<\`E\`\\>(\`name\`, \`payload\`) => \`void\`

Defined in: [core/src/types.ts:292](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L292)

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
`,_E=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [core/src](../README.md) / WizardEventName

# Type Alias: WizardEventName

> **WizardEventName** = \`"step_change"\` \\| \`"validation_error"\` \\| \`"wizard_reset"\`

Defined in: [core/src/types.ts:274](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L274)

Standardized Event Names
`,CE=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [core/src](../README.md) / WizardEventPayloads

# Type Alias: WizardEventPayloads\\<StepId\\>

> **WizardEventPayloads**\\<\`StepId\`\\> = \`object\`

Defined in: [core/src/types.ts:279](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L279)

Event Payloads

## Type Parameters

### StepId

\`StepId\` *extends* \`string\` = \`string\`

## Properties

### step\\_change

> **step\\_change**: \`object\`

Defined in: [core/src/types.ts:280](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L280)

#### from

> **from**: \`StepId\` \\| \`null\`

#### timestamp

> **timestamp**: \`number\`

#### to

> **to**: \`StepId\`

***

### validation\\_error

> **validation\\_error**: \`object\`

Defined in: [core/src/types.ts:281](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L281)

#### errors

> **errors**: \`Record\`\\<\`string\`, \`string\`\\> \\| \`undefined\`

#### stepId

> **stepId**: \`StepId\`

#### timestamp

> **timestamp**: \`number\`

***

### wizard\\_reset

> **wizard\\_reset**: \`object\`

Defined in: [core/src/types.ts:286](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L286)

#### data

> **data**: \`any\`

#### timestamp?

> \`optional\` **timestamp**: \`number\`
`,LE=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [core/src](../README.md) / WizardMiddleware

# Type Alias: WizardMiddleware()\\<T, StepId\\>

> **WizardMiddleware**\\<\`T\`, \`StepId\`\\> = (\`api\`) => (\`next\`) => (\`action\`) => \`void\`

Defined in: [core/src/types.ts:267](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/core/src/types.ts#L267)

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
`,OE=`[**wizzard-packages**](../../README.md)

***

[wizzard-packages](../../README.md) / devtools/src

# devtools/src

## Functions

- [WizardDevTools](functions/WizardDevTools.md)
`,NE=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [devtools/src](../README.md) / WizardDevTools

# Function: WizardDevTools()

> **WizardDevTools**(): \`Element\`

Defined in: [devtools/src/WizardDevTools.tsx:11](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/devtools/src/WizardDevTools.tsx#L11)

## Returns

\`Element\`
`,WE=`[**wizzard-packages**](../../README.md)

***

[wizzard-packages](../../README.md) / middleware/src

# middleware/src

## Variables

- [devToolsMiddleware](variables/devToolsMiddleware.md)
- [loggerMiddleware](variables/loggerMiddleware.md)
`,UE=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [middleware/src](../README.md) / devToolsMiddleware

# Variable: devToolsMiddleware

> \`const\` **devToolsMiddleware**: [\`WizardMiddleware\`](../../../react/src/type-aliases/WizardMiddleware.md)\\<\`any\`, \`any\`\\>

Defined in: [middleware/src/devToolsMiddleware.ts:49](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/middleware/src/devToolsMiddleware.ts#L49)

Middleware for Redux DevTools integration.
`,PE=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [middleware/src](../README.md) / loggerMiddleware

# Variable: loggerMiddleware

> \`const\` **loggerMiddleware**: [\`WizardMiddleware\`](../../../react/src/type-aliases/WizardMiddleware.md)\\<\`any\`, \`any\`\\>

Defined in: [middleware/src/loggerMiddleware.ts:6](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/middleware/src/loggerMiddleware.ts#L6)

Simple logger middleware for Wizard actions
`,jE=`[**wizzard-packages**](../../README.md)

***

[wizzard-packages](../../README.md) / persistence/src

# persistence/src

## Classes

- [LocalStorageAdapter](classes/LocalStorageAdapter.md)
- [MemoryAdapter](classes/MemoryAdapter.md)
`,BE=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [persistence/src](../README.md) / LocalStorageAdapter

# Class: LocalStorageAdapter

Defined in: [persistence/src/LocalStorageAdapter.ts:6](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/persistence/src/LocalStorageAdapter.ts#L6)

Browser persistence adapter backed by localStorage.

## Implements

- \`IPersistenceAdapter\`

## Constructors

### Constructor

> **new LocalStorageAdapter**(\`prefix\`): \`LocalStorageAdapter\`

Defined in: [persistence/src/LocalStorageAdapter.ts:9](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/persistence/src/LocalStorageAdapter.ts#L9)

#### Parameters

##### prefix

\`string\` = \`'wizard_'\`

#### Returns

\`LocalStorageAdapter\`

## Methods

### clear()

> **clear**(): \`void\`

Defined in: [persistence/src/LocalStorageAdapter.ts:69](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/persistence/src/LocalStorageAdapter.ts#L69)

#### Returns

\`void\`

#### Implementation of

\`IPersistenceAdapter.clear\`

***

### clearStep()

> **clearStep**(\`stepId\`): \`void\`

Defined in: [persistence/src/LocalStorageAdapter.ts:60](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/persistence/src/LocalStorageAdapter.ts#L60)

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

Defined in: [persistence/src/LocalStorageAdapter.ts:27](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/persistence/src/LocalStorageAdapter.ts#L27)

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

Defined in: [persistence/src/LocalStorageAdapter.ts:44](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/persistence/src/LocalStorageAdapter.ts#L44)

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

Defined in: [persistence/src/LocalStorageAdapter.ts:17](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/persistence/src/LocalStorageAdapter.ts#L17)

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
`,XE=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [persistence/src](../README.md) / MemoryAdapter

# Class: MemoryAdapter

Defined in: [persistence/src/MemoryAdapter.ts:6](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/persistence/src/MemoryAdapter.ts#L6)

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

Defined in: [persistence/src/MemoryAdapter.ts:27](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/persistence/src/MemoryAdapter.ts#L27)

#### Returns

\`void\`

#### Implementation of

\`IPersistenceAdapter.clear\`

***

### clearStep()

> **clearStep**(\`stepId\`): \`void\`

Defined in: [persistence/src/MemoryAdapter.ts:23](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/persistence/src/MemoryAdapter.ts#L23)

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

Defined in: [persistence/src/MemoryAdapter.ts:13](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/persistence/src/MemoryAdapter.ts#L13)

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

Defined in: [persistence/src/MemoryAdapter.ts:17](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/persistence/src/MemoryAdapter.ts#L17)

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

Defined in: [persistence/src/MemoryAdapter.ts:9](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/persistence/src/MemoryAdapter.ts#L9)

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
`,HE=`[**wizzard-packages**](../../README.md)

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
`,ZE=`[**wizzard-packages**](../../../README.md)

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
`,VE=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [react/src](../README.md) / WizardProvider

# Function: WizardProvider()

> **WizardProvider**\\<\`T\`, \`StepId\`\\>(\`__namedParameters\`): \`Element\`

Defined in: [react/src/context/WizardContext.tsx:44](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/react/src/context/WizardContext.tsx#L44)

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
`,qE=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [react/src](../README.md) / createWizardFactory

# Function: createWizardFactory()

> **createWizardFactory**\\<\`TSchema\`, \`StepId\`\\>(): \`object\`

Defined in: [react/src/factory.tsx:21](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/react/src/factory.tsx#L21)

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
`,YE=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [react/src](../README.md) / useWizard

# Function: useWizard()

> **useWizard**\\<\`T\`, \`StepId\`\\>(): \`IWizardContext\`\\<\`T\`, \`StepId\`\\>

Defined in: [react/src/hooks/useWizard.ts:7](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/react/src/hooks/useWizard.ts#L7)

Alias for useWizardContext.

## Type Parameters

### T

\`T\` = \`any\`

### StepId

\`StepId\` *extends* \`string\` = \`string\`

## Returns

\`IWizardContext\`\\<\`T\`, \`StepId\`\\>
`,GE=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [react/src](../README.md) / useWizardActions

# Function: useWizardActions()

> **useWizardActions**\\<\`StepId\`\\>(): [\`IWizardActions\`](../interfaces/IWizardActions.md)\\<\`StepId\`\\>

Defined in: [react/src/context/WizardContext.tsx:679](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/react/src/context/WizardContext.tsx#L679)

Returns the wizard actions API.

## Type Parameters

### StepId

\`StepId\` *extends* \`string\` = \`string\`

## Returns

[\`IWizardActions\`](../interfaces/IWizardActions.md)\\<\`StepId\`\\>
`,QE=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [react/src](../README.md) / useWizardContext

# Function: useWizardContext()

> **useWizardContext**\\<\`T\`, \`StepId\`\\>(): [\`IWizardContext\`](../interfaces/IWizardContext.md)\\<\`T\`, \`StepId\`\\>

Defined in: [react/src/context/WizardContext.tsx:688](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/react/src/context/WizardContext.tsx#L688)

Returns combined wizard state, actions, and derived errors.

## Type Parameters

### T

\`T\` = \`any\`

### StepId

\`StepId\` *extends* \`string\` = \`string\`

## Returns

[\`IWizardContext\`](../interfaces/IWizardContext.md)\\<\`T\`, \`StepId\`\\>
`,KE=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [react/src](../README.md) / useWizardError

# Function: useWizardError()

> **useWizardError**(\`path\`): \`string\` \\| \`undefined\`

Defined in: [react/src/context/WizardContext.tsx:632](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/react/src/context/WizardContext.tsx#L632)

Returns the first error message for a path across all steps.

## Parameters

### path

\`string\`

## Returns

\`string\` \\| \`undefined\`
`,FE=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [react/src](../README.md) / useWizardSelector

# Function: useWizardSelector()

> **useWizardSelector**\\<\`TSelected\`\\>(\`selector\`, \`options?\`): \`TSelected\`

Defined in: [react/src/context/WizardContext.tsx:649](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/react/src/context/WizardContext.tsx#L649)

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
`,JE=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [react/src](../README.md) / useWizardState

# Function: useWizardState()

> **useWizardState**\\<\`T\`, \`StepId\`\\>(): [\`IWizardState\`](../interfaces/IWizardState.md)\\<\`T\`, \`StepId\`\\>

Defined in: [react/src/context/WizardContext.tsx:591](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/react/src/context/WizardContext.tsx#L591)

Reads the full wizard state.

## Type Parameters

### T

\`T\` = \`unknown\`

### StepId

\`StepId\` *extends* \`string\` = \`string\`

## Returns

[\`IWizardState\`](../interfaces/IWizardState.md)\\<\`T\`, \`StepId\`\\>
`,$E=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [react/src](../README.md) / useWizardValue

# Function: useWizardValue()

> **useWizardValue**\\<\`TValue\`\\>(\`path\`, \`options?\`): \`TValue\`

Defined in: [react/src/context/WizardContext.tsx:603](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/react/src/context/WizardContext.tsx#L603)

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
`,ex=`[**wizzard-packages**](../../../README.md)

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
`,nx=`[**wizzard-packages**](../../../README.md)

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
`,tx=`[**wizzard-packages**](../../../README.md)

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
`,ax=`[**wizzard-packages**](../../../README.md)

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
`,ix=`[**wizzard-packages**](../../../README.md)

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
`,rx=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [react/src](../README.md) / IWizardHandle

# Interface: IWizardHandle\\<T, StepId\\>

Defined in: [react/src/types.ts:17](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/react/src/types.ts#L17)

Handle returned by components for imperative access to the wizard.

## Type Parameters

### T

\`T\` = \`unknown\`

### StepId

\`StepId\` *extends* \`string\` = \`string\`

## Properties

### actions

> **actions**: \`IWizardActions\`\\<\`StepId\`\\>

Defined in: [react/src/types.ts:19](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/react/src/types.ts#L19)

***

### state

> **state**: [\`IWizardState\`](IWizardState.md)\\<\`T\`, \`StepId\`\\>

Defined in: [react/src/types.ts:18](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/react/src/types.ts#L18)
`,lx=`[**wizzard-packages**](../../../README.md)

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
`,sx=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [react/src](../README.md) / WizardProviderProps

# Interface: WizardProviderProps\\<T, StepId\\>

Defined in: [react/src/context/WizardContext.tsx:34](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/react/src/context/WizardContext.tsx#L34)

Props for WizardProvider.

## Type Parameters

### T

\`T\`

### StepId

\`StepId\` *extends* \`string\`

## Properties

### children

> **children**: \`ReactNode\`

Defined in: [react/src/context/WizardContext.tsx:38](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/react/src/context/WizardContext.tsx#L38)

***

### config

> **config**: [\`IWizardConfig\`](IWizardConfig.md)\\<\`T\`, \`StepId\`\\>

Defined in: [react/src/context/WizardContext.tsx:35](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/react/src/context/WizardContext.tsx#L35)

***

### initialData?

> \`optional\` **initialData**: \`T\`

Defined in: [react/src/context/WizardContext.tsx:36](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/react/src/context/WizardContext.tsx#L36)

***

### initialStepId?

> \`optional\` **initialStepId**: \`StepId\`

Defined in: [react/src/context/WizardContext.tsx:37](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/react/src/context/WizardContext.tsx#L37)
`,ox=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [react/src](../README.md) / WizardStepRendererProps

# Interface: WizardStepRendererProps

Defined in: [react/src/components/WizardStepRenderer.tsx:7](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/react/src/components/WizardStepRenderer.tsx#L7)

Props for rendering the current step component.

## Properties

### fallback?

> \`optional\` **fallback**: \`ReactNode\`

Defined in: [react/src/components/WizardStepRenderer.tsx:9](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/react/src/components/WizardStepRenderer.tsx#L9)

***

### wrapper?

> \`optional\` **wrapper**: \`ComponentType\`\\<\\{ \`children\`: \`ReactNode\`; \`key\`: \`string\`; \\}\\>

Defined in: [react/src/components/WizardStepRenderer.tsx:8](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/react/src/components/WizardStepRenderer.tsx#L8)
`,cx=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [react/src](../README.md) / PersistenceMode

# Type Alias: PersistenceMode

> **PersistenceMode** = \`"onStepChange"\` \\| \`"onChange"\` \\| \`"manual"\`

Defined in: core/dist/index.d.ts:129

Persistence strategy for step data.
`,ux=`[**wizzard-packages**](../../../README.md)

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
`,dx=`[**wizzard-packages**](../../../README.md)

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
`,fx=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [react/src](../README.md) / WizardStepRenderer

# Variable: WizardStepRenderer

> \`const\` **WizardStepRenderer**: \`React.FC\`\\<[\`WizardStepRendererProps\`](../interfaces/WizardStepRendererProps.md)\\>

Defined in: [react/src/components/WizardStepRenderer.tsx:15](https://github.com/ZizzX/wizzard-packages/blob/04cb88449f41706ccb99a334ca9f98a05042d405/packages/react/src/components/WizardStepRenderer.tsx#L15)

Renders the active step component with optional wrapper and suspense fallback.
`,px=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [react/src](../README.md) / loggerMiddleware

# Variable: loggerMiddleware

> \`const\` **loggerMiddleware**: [\`WizardMiddleware\`](../type-aliases/WizardMiddleware.md)\\<\`any\`, \`any\`\\>

Defined in: middleware/dist/index.d.ts:6

Simple logger middleware for Wizard actions
`,hx=Object.assign({"../../../../docs/api/README.md":$9,"../../../../docs/api/adapter-yup/src/README.md":eE,"../../../../docs/api/adapter-yup/src/classes/YupAdapter.md":nE,"../../../../docs/api/adapter-yup/src/interfaces/YupLikeError.md":tE,"../../../../docs/api/adapter-yup/src/interfaces/YupLikeSchema.md":aE,"../../../../docs/api/adapter-zod/src/README.md":iE,"../../../../docs/api/adapter-zod/src/classes/ZodAdapter.md":rE,"../../../../docs/api/adapter-zod/src/interfaces/ZodLikeSchema.md":lE,"../../../../docs/api/core/src/README.md":sE,"../../../../docs/api/core/src/classes/WizardStore.md":oE,"../../../../docs/api/core/src/functions/getByPath.md":cE,"../../../../docs/api/core/src/functions/setByPath.md":uE,"../../../../docs/api/core/src/functions/shallowEqual.md":dE,"../../../../docs/api/core/src/functions/toPath.md":fE,"../../../../docs/api/core/src/interfaces/IBreadcrumb.md":pE,"../../../../docs/api/core/src/interfaces/IPersistenceAdapter.md":hE,"../../../../docs/api/core/src/interfaces/IStepConfig.md":mE,"../../../../docs/api/core/src/interfaces/IValidatorAdapter.md":gE,"../../../../docs/api/core/src/interfaces/IWizardActions.md":yE,"../../../../docs/api/core/src/interfaces/IWizardConfig.md":bE,"../../../../docs/api/core/src/interfaces/IWizardContext.md":zE,"../../../../docs/api/core/src/interfaces/IWizardState.md":vE,"../../../../docs/api/core/src/interfaces/IWizardStore.md":SE,"../../../../docs/api/core/src/interfaces/MiddlewareAPI.md":EE,"../../../../docs/api/core/src/type-aliases/BreadcrumbStatus.md":xE,"../../../../docs/api/core/src/type-aliases/Path.md":DE,"../../../../docs/api/core/src/type-aliases/PathValue.md":TE,"../../../../docs/api/core/src/type-aliases/PersistenceMode.md":AE,"../../../../docs/api/core/src/type-aliases/StepDirection.md":wE,"../../../../docs/api/core/src/type-aliases/ValidationMode.md":RE,"../../../../docs/api/core/src/type-aliases/ValidationResult.md":kE,"../../../../docs/api/core/src/type-aliases/WizardAction.md":IE,"../../../../docs/api/core/src/type-aliases/WizardEventHandler.md":ME,"../../../../docs/api/core/src/type-aliases/WizardEventName.md":_E,"../../../../docs/api/core/src/type-aliases/WizardEventPayloads.md":CE,"../../../../docs/api/core/src/type-aliases/WizardMiddleware.md":LE,"../../../../docs/api/devtools/src/README.md":OE,"../../../../docs/api/devtools/src/functions/WizardDevTools.md":NE,"../../../../docs/api/middleware/src/README.md":WE,"../../../../docs/api/middleware/src/variables/devToolsMiddleware.md":UE,"../../../../docs/api/middleware/src/variables/loggerMiddleware.md":PE,"../../../../docs/api/persistence/src/README.md":jE,"../../../../docs/api/persistence/src/classes/LocalStorageAdapter.md":BE,"../../../../docs/api/persistence/src/classes/MemoryAdapter.md":XE,"../../../../docs/api/react/src/README.md":HE,"../../../../docs/api/react/src/classes/WizardStore.md":ZE,"../../../../docs/api/react/src/functions/WizardProvider.md":VE,"../../../../docs/api/react/src/functions/createWizardFactory.md":qE,"../../../../docs/api/react/src/functions/useWizard.md":YE,"../../../../docs/api/react/src/functions/useWizardActions.md":GE,"../../../../docs/api/react/src/functions/useWizardContext.md":QE,"../../../../docs/api/react/src/functions/useWizardError.md":KE,"../../../../docs/api/react/src/functions/useWizardSelector.md":FE,"../../../../docs/api/react/src/functions/useWizardState.md":JE,"../../../../docs/api/react/src/functions/useWizardValue.md":$E,"../../../../docs/api/react/src/interfaces/IStepConfig.md":ex,"../../../../docs/api/react/src/interfaces/IValidatorAdapter.md":nx,"../../../../docs/api/react/src/interfaces/IWizardActions.md":tx,"../../../../docs/api/react/src/interfaces/IWizardConfig.md":ax,"../../../../docs/api/react/src/interfaces/IWizardContext.md":ix,"../../../../docs/api/react/src/interfaces/IWizardHandle.md":rx,"../../../../docs/api/react/src/interfaces/IWizardState.md":lx,"../../../../docs/api/react/src/interfaces/WizardProviderProps.md":sx,"../../../../docs/api/react/src/interfaces/WizardStepRendererProps.md":ox,"../../../../docs/api/react/src/type-aliases/PersistenceMode.md":cx,"../../../../docs/api/react/src/type-aliases/ValidationResult.md":ux,"../../../../docs/api/react/src/type-aliases/WizardMiddleware.md":dx,"../../../../docs/api/react/src/variables/WizardStepRenderer.md":fx,"../../../../docs/api/react/src/variables/loggerMiddleware.md":px}),mx=Object.entries(hx).map(([a,r])=>{const l=a.replace("../../../../docs/api/","").replace(/\.md$/,""),s=l.split("/").slice(-1)[0].replace(/[-_]/g," ");return{slug:l,title:s,content:String(r)}}),gx=mx.sort((a,r)=>a.slug.localeCompare(r.slug)),qs=gx,yx=a=>a==="README"||a.endsWith("/README"),Dy=a=>a.replace(/\.md$/,"").replace(/\/$/,"")||"README",Nu=new Set(qs.map(a=>a.slug)),bx=a=>Dy(a.replace(/^\.\//,"").replace(/^\//,""));function zx(){const a=qz(),r=Dy(a["*"]||"README"),l=qs.find(u=>u.slug===r)||qs[0],s=qs.filter(u=>!yx(u.slug));return l?re.jsxs("section",{className:"section api-layout",children:[re.jsxs("aside",{className:"api-sidebar",children:[re.jsx("h2",{children:"API Reference"}),re.jsx("p",{className:"api-note",children:"Generated from TypeDoc. Pick a module to explore the surface area."}),re.jsx("div",{className:"api-list",children:s.map(u=>re.jsx(Bu,{to:`/api/${u.slug}`,className:`api-link${u.slug===l.slug?" api-link--active":""}`,children:u.title},u.slug))})]}),re.jsx("article",{className:"api-content markdown",children:re.jsx(G9,{components:{a:({href:u,children:d,node:f,...p})=>{if(!u)return re.jsx("a",{...p,children:d});if(u.startsWith("#"))return re.jsx("a",{href:u,...p,children:d});if(/^https?:\/\//.test(u))return re.jsx("a",{href:u,rel:"noreferrer",target:"_blank",...p,children:d});let g=bx(u);return!Nu.has(g)&&Nu.has(`${g}/README`)&&(g=`${g}/README`),Nu.has(g)?re.jsx(Bu,{to:`/api/${g}`,...p,children:d}):re.jsx("a",{href:u,...p,children:d})}},children:l.content})})]}):re.jsx("section",{className:"section api-layout",children:re.jsxs("article",{className:"api-content",children:[re.jsx("h2",{children:"API Reference"}),re.jsxs("p",{children:["API docs are not available. Run ",re.jsx("code",{children:"pnpm docs:api"})," first."]})]})})}const Wu="https://stackblitz.com/github/ZizzX/wizzard-packages/tree/dev/.stackblitz",vx=[{title:"Validation",description:"Zod/Yup adapters with step-level validation.",href:`${Wu}/validation`},{title:"Persistence",description:"LocalStorage + memory adapters with auto-save.",href:`${Wu}/persistence`},{title:"Navigation",description:"Sequential, visited, and free navigation modes.",href:`${Wu}/basic`}];function Sx(){return re.jsxs("section",{className:"section",children:[re.jsxs("div",{className:"section-header",children:[re.jsx("p",{className:"section-eyebrow",children:"Cookbook"}),re.jsx("h2",{children:"Examples"}),re.jsx("p",{className:"section-lead",children:"Start from working recipes and customize the steps for your product."})]}),re.jsx("div",{className:"card-grid",children:vx.map(a=>re.jsxs("a",{className:"card card--link",href:a.href,target:"_blank",rel:"noreferrer",children:[re.jsx("h3",{children:a.title}),re.jsx("p",{children:a.description}),re.jsx("span",{className:"card-cta",children:"Open StackBlitz"})]},a.title))})]})}const Ex=h4([{path:"/",element:re.jsx(M4,{}),children:[{index:!0,element:re.jsx(_4,{})},{path:"api/*",element:re.jsx(zx,{})},{path:"examples",element:re.jsx(Sx,{})}]}],{basename:"/wizzard-packages/dev/"});function xx(){return re.jsx(E4,{router:Ex})}const Eg=document.getElementById("root");Eg&&B0.createRoot(Eg).render(re.jsx(Dg.StrictMode,{children:re.jsx(xx,{})}));
