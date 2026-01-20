function Tg(a,r){for(var l=0;l<r.length;l++){const s=r[l];if(typeof s!="string"&&!Array.isArray(s)){for(const u in s)if(u!=="default"&&!(u in a)){const d=Object.getOwnPropertyDescriptor(s,u);d&&Object.defineProperty(a,u,d.get?d:{enumerable:!0,get:()=>s[u]})}}}return Object.freeze(Object.defineProperty(a,Symbol.toStringTag,{value:"Module"}))}(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const u of document.querySelectorAll('link[rel="modulepreload"]'))s(u);new MutationObserver(u=>{for(const d of u)if(d.type==="childList")for(const f of d.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&s(f)}).observe(document,{childList:!0,subtree:!0});function l(u){const d={};return u.integrity&&(d.integrity=u.integrity),u.referrerPolicy&&(d.referrerPolicy=u.referrerPolicy),u.crossOrigin==="use-credentials"?d.credentials="include":u.crossOrigin==="anonymous"?d.credentials="omit":d.credentials="same-origin",d}function s(u){if(u.ep)return;u.ep=!0;const d=l(u);fetch(u.href,d)}})();function no(a){return a&&a.__esModule&&Object.prototype.hasOwnProperty.call(a,"default")?a.default:a}var mu={exports:{}},cl={};var om;function Lz(){if(om)return cl;om=1;var a=Symbol.for("react.transitional.element"),r=Symbol.for("react.fragment");function l(s,u,d){var f=null;if(d!==void 0&&(f=""+d),u.key!==void 0&&(f=""+u.key),"key"in u){d={};for(var h in u)h!=="key"&&(d[h]=u[h])}else d=u;return u=d.ref,{$$typeof:a,type:s,key:f,ref:u!==void 0?u:null,props:d}}return cl.Fragment=r,cl.jsx=l,cl.jsxs=l,cl}var cm;function Wz(){return cm||(cm=1,mu.exports=Lz()),mu.exports}var Q=Wz(),gu={exports:{}},_e={};var um;function Oz(){if(um)return _e;um=1;var a=Symbol.for("react.transitional.element"),r=Symbol.for("react.portal"),l=Symbol.for("react.fragment"),s=Symbol.for("react.strict_mode"),u=Symbol.for("react.profiler"),d=Symbol.for("react.consumer"),f=Symbol.for("react.context"),h=Symbol.for("react.forward_ref"),g=Symbol.for("react.suspense"),p=Symbol.for("react.memo"),b=Symbol.for("react.lazy"),y=Symbol.for("react.activity"),v=Symbol.iterator;function S(T){return T===null||typeof T!="object"?null:(T=v&&T[v]||T["@@iterator"],typeof T=="function"?T:null)}var L={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},O=Object.assign,Z={};function U(T,j,E){this.props=T,this.context=j,this.refs=Z,this.updater=E||L}U.prototype.isReactComponent={},U.prototype.setState=function(T,j){if(typeof T!="object"&&typeof T!="function"&&T!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,T,j,"setState")},U.prototype.forceUpdate=function(T){this.updater.enqueueForceUpdate(this,T,"forceUpdate")};function G(){}G.prototype=U.prototype;function q(T,j,E){this.props=T,this.context=j,this.refs=Z,this.updater=E||L}var de=q.prototype=new G;de.constructor=q,O(de,U.prototype),de.isPureReactComponent=!0;var ze=Array.isArray;function X(){}var R={H:null,A:null,T:null,S:null},te=Object.prototype.hasOwnProperty;function he(T,j,E){var re=E.ref;return{$$typeof:a,type:T,key:j,ref:re!==void 0?re:null,props:E}}function ue(T,j){return he(T.type,j,T.props)}function ie(T){return typeof T=="object"&&T!==null&&T.$$typeof===a}function ne(T){var j={"=":"=0",":":"=2"};return"$"+T.replace(/[=:]/g,function(E){return j[E]})}var Ae=/\/+/g;function fe(T,j){return typeof T=="object"&&T!==null&&T.key!=null?ne(""+T.key):j.toString(36)}function $(T){switch(T.status){case"fulfilled":return T.value;case"rejected":throw T.reason;default:switch(typeof T.status=="string"?T.then(X,X):(T.status="pending",T.then(function(j){T.status==="pending"&&(T.status="fulfilled",T.value=j)},function(j){T.status==="pending"&&(T.status="rejected",T.reason=j)})),T.status){case"fulfilled":return T.value;case"rejected":throw T.reason}}throw T}function C(T,j,E,re,ye){var be=typeof T;(be==="undefined"||be==="boolean")&&(T=null);var Ie=!1;if(T===null)Ie=!0;else switch(be){case"bigint":case"string":case"number":Ie=!0;break;case"object":switch(T.$$typeof){case a:case r:Ie=!0;break;case b:return Ie=T._init,C(Ie(T._payload),j,E,re,ye)}}if(Ie)return ye=ye(T),Ie=re===""?"."+fe(T,0):re,ze(ye)?(E="",Ie!=null&&(E=Ie.replace(Ae,"$&/")+"/"),C(ye,j,E,"",function(qn){return qn})):ye!=null&&(ie(ye)&&(ye=ue(ye,E+(ye.key==null||T&&T.key===ye.key?"":(""+ye.key).replace(Ae,"$&/")+"/")+Ie)),j.push(ye)),1;Ie=0;var Je=re===""?".":re+":";if(ze(T))for(var Fe=0;Fe<T.length;Fe++)re=T[Fe],be=Je+fe(re,Fe),Ie+=C(re,j,E,be,ye);else if(Fe=S(T),typeof Fe=="function")for(T=Fe.call(T),Fe=0;!(re=T.next()).done;)re=re.value,be=Je+fe(re,Fe++),Ie+=C(re,j,E,be,ye);else if(be==="object"){if(typeof T.then=="function")return C($(T),j,E,re,ye);throw j=String(T),Error("Objects are not valid as a React child (found: "+(j==="[object Object]"?"object with keys {"+Object.keys(T).join(", ")+"}":j)+"). If you meant to render a collection of children, use an array instead.")}return Ie}function K(T,j,E){if(T==null)return T;var re=[],ye=0;return C(T,re,"","",function(be){return j.call(E,be,ye++)}),re}function le(T){if(T._status===-1){var j=T._result;j=j(),j.then(function(E){(T._status===0||T._status===-1)&&(T._status=1,T._result=E)},function(E){(T._status===0||T._status===-1)&&(T._status=2,T._result=E)}),T._status===-1&&(T._status=0,T._result=j)}if(T._status===1)return T._result.default;throw T._result}var Me=typeof reportError=="function"?reportError:function(T){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var j=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof T=="object"&&T!==null&&typeof T.message=="string"?String(T.message):String(T),error:T});if(!window.dispatchEvent(j))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",T);return}console.error(T)},x={map:K,forEach:function(T,j,E){K(T,function(){j.apply(this,arguments)},E)},count:function(T){var j=0;return K(T,function(){j++}),j},toArray:function(T){return K(T,function(j){return j})||[]},only:function(T){if(!ie(T))throw Error("React.Children.only expected to receive a single React element child.");return T}};return _e.Activity=y,_e.Children=x,_e.Component=U,_e.Fragment=l,_e.Profiler=u,_e.PureComponent=q,_e.StrictMode=s,_e.Suspense=g,_e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=R,_e.__COMPILER_RUNTIME={__proto__:null,c:function(T){return R.H.useMemoCache(T)}},_e.cache=function(T){return function(){return T.apply(null,arguments)}},_e.cacheSignal=function(){return null},_e.cloneElement=function(T,j,E){if(T==null)throw Error("The argument must be a React element, but you passed "+T+".");var re=O({},T.props),ye=T.key;if(j!=null)for(be in j.key!==void 0&&(ye=""+j.key),j)!te.call(j,be)||be==="key"||be==="__self"||be==="__source"||be==="ref"&&j.ref===void 0||(re[be]=j[be]);var be=arguments.length-2;if(be===1)re.children=E;else if(1<be){for(var Ie=Array(be),Je=0;Je<be;Je++)Ie[Je]=arguments[Je+2];re.children=Ie}return he(T.type,ye,re)},_e.createContext=function(T){return T={$$typeof:f,_currentValue:T,_currentValue2:T,_threadCount:0,Provider:null,Consumer:null},T.Provider=T,T.Consumer={$$typeof:d,_context:T},T},_e.createElement=function(T,j,E){var re,ye={},be=null;if(j!=null)for(re in j.key!==void 0&&(be=""+j.key),j)te.call(j,re)&&re!=="key"&&re!=="__self"&&re!=="__source"&&(ye[re]=j[re]);var Ie=arguments.length-2;if(Ie===1)ye.children=E;else if(1<Ie){for(var Je=Array(Ie),Fe=0;Fe<Ie;Fe++)Je[Fe]=arguments[Fe+2];ye.children=Je}if(T&&T.defaultProps)for(re in Ie=T.defaultProps,Ie)ye[re]===void 0&&(ye[re]=Ie[re]);return he(T,be,ye)},_e.createRef=function(){return{current:null}},_e.forwardRef=function(T){return{$$typeof:h,render:T}},_e.isValidElement=ie,_e.lazy=function(T){return{$$typeof:b,_payload:{_status:-1,_result:T},_init:le}},_e.memo=function(T,j){return{$$typeof:p,type:T,compare:j===void 0?null:j}},_e.startTransition=function(T){var j=R.T,E={};R.T=E;try{var re=T(),ye=R.S;ye!==null&&ye(E,re),typeof re=="object"&&re!==null&&typeof re.then=="function"&&re.then(X,Me)}catch(be){Me(be)}finally{j!==null&&E.types!==null&&(j.types=E.types),R.T=j}},_e.unstable_useCacheRefresh=function(){return R.H.useCacheRefresh()},_e.use=function(T){return R.H.use(T)},_e.useActionState=function(T,j,E){return R.H.useActionState(T,j,E)},_e.useCallback=function(T,j){return R.H.useCallback(T,j)},_e.useContext=function(T){return R.H.useContext(T)},_e.useDebugValue=function(){},_e.useDeferredValue=function(T,j){return R.H.useDeferredValue(T,j)},_e.useEffect=function(T,j){return R.H.useEffect(T,j)},_e.useEffectEvent=function(T){return R.H.useEffectEvent(T)},_e.useId=function(){return R.H.useId()},_e.useImperativeHandle=function(T,j,E){return R.H.useImperativeHandle(T,j,E)},_e.useInsertionEffect=function(T,j){return R.H.useInsertionEffect(T,j)},_e.useLayoutEffect=function(T,j){return R.H.useLayoutEffect(T,j)},_e.useMemo=function(T,j){return R.H.useMemo(T,j)},_e.useOptimistic=function(T,j){return R.H.useOptimistic(T,j)},_e.useReducer=function(T,j,E){return R.H.useReducer(T,j,E)},_e.useRef=function(T){return R.H.useRef(T)},_e.useState=function(T){return R.H.useState(T)},_e.useSyncExternalStore=function(T,j,E){return R.H.useSyncExternalStore(T,j,E)},_e.useTransition=function(){return R.H.useTransition()},_e.version="19.2.3",_e}var dm;function ed(){return dm||(dm=1,gu.exports=Oz()),gu.exports}var J=ed();const Ag=no(J),Pz=Tg({__proto__:null,default:Ag},[J]);var bu={exports:{}},ul={},yu={exports:{}},zu={};var fm;function Nz(){return fm||(fm=1,(function(a){function r(C,K){var le=C.length;C.push(K);e:for(;0<le;){var Me=le-1>>>1,x=C[Me];if(0<u(x,K))C[Me]=K,C[le]=x,le=Me;else break e}}function l(C){return C.length===0?null:C[0]}function s(C){if(C.length===0)return null;var K=C[0],le=C.pop();if(le!==K){C[0]=le;e:for(var Me=0,x=C.length,T=x>>>1;Me<T;){var j=2*(Me+1)-1,E=C[j],re=j+1,ye=C[re];if(0>u(E,le))re<x&&0>u(ye,E)?(C[Me]=ye,C[re]=le,Me=re):(C[Me]=E,C[j]=le,Me=j);else if(re<x&&0>u(ye,le))C[Me]=ye,C[re]=le,Me=re;else break e}}return K}function u(C,K){var le=C.sortIndex-K.sortIndex;return le!==0?le:C.id-K.id}if(a.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var d=performance;a.unstable_now=function(){return d.now()}}else{var f=Date,h=f.now();a.unstable_now=function(){return f.now()-h}}var g=[],p=[],b=1,y=null,v=3,S=!1,L=!1,O=!1,Z=!1,U=typeof setTimeout=="function"?setTimeout:null,G=typeof clearTimeout=="function"?clearTimeout:null,q=typeof setImmediate<"u"?setImmediate:null;function de(C){for(var K=l(p);K!==null;){if(K.callback===null)s(p);else if(K.startTime<=C)s(p),K.sortIndex=K.expirationTime,r(g,K);else break;K=l(p)}}function ze(C){if(O=!1,de(C),!L)if(l(g)!==null)L=!0,X||(X=!0,ne());else{var K=l(p);K!==null&&$(ze,K.startTime-C)}}var X=!1,R=-1,te=5,he=-1;function ue(){return Z?!0:!(a.unstable_now()-he<te)}function ie(){if(Z=!1,X){var C=a.unstable_now();he=C;var K=!0;try{e:{L=!1,O&&(O=!1,G(R),R=-1),S=!0;var le=v;try{n:{for(de(C),y=l(g);y!==null&&!(y.expirationTime>C&&ue());){var Me=y.callback;if(typeof Me=="function"){y.callback=null,v=y.priorityLevel;var x=Me(y.expirationTime<=C);if(C=a.unstable_now(),typeof x=="function"){y.callback=x,de(C),K=!0;break n}y===l(g)&&s(g),de(C)}else s(g);y=l(g)}if(y!==null)K=!0;else{var T=l(p);T!==null&&$(ze,T.startTime-C),K=!1}}break e}finally{y=null,v=le,S=!1}K=void 0}}finally{K?ne():X=!1}}}var ne;if(typeof q=="function")ne=function(){q(ie)};else if(typeof MessageChannel<"u"){var Ae=new MessageChannel,fe=Ae.port2;Ae.port1.onmessage=ie,ne=function(){fe.postMessage(null)}}else ne=function(){U(ie,0)};function $(C,K){R=U(function(){C(a.unstable_now())},K)}a.unstable_IdlePriority=5,a.unstable_ImmediatePriority=1,a.unstable_LowPriority=4,a.unstable_NormalPriority=3,a.unstable_Profiling=null,a.unstable_UserBlockingPriority=2,a.unstable_cancelCallback=function(C){C.callback=null},a.unstable_forceFrameRate=function(C){0>C||125<C?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):te=0<C?Math.floor(1e3/C):5},a.unstable_getCurrentPriorityLevel=function(){return v},a.unstable_next=function(C){switch(v){case 1:case 2:case 3:var K=3;break;default:K=v}var le=v;v=K;try{return C()}finally{v=le}},a.unstable_requestPaint=function(){Z=!0},a.unstable_runWithPriority=function(C,K){switch(C){case 1:case 2:case 3:case 4:case 5:break;default:C=3}var le=v;v=C;try{return K()}finally{v=le}},a.unstable_scheduleCallback=function(C,K,le){var Me=a.unstable_now();switch(typeof le=="object"&&le!==null?(le=le.delay,le=typeof le=="number"&&0<le?Me+le:Me):le=Me,C){case 1:var x=-1;break;case 2:x=250;break;case 5:x=1073741823;break;case 4:x=1e4;break;default:x=5e3}return x=le+x,C={id:b++,callback:K,priorityLevel:C,startTime:le,expirationTime:x,sortIndex:-1},le>Me?(C.sortIndex=le,r(p,C),l(g)===null&&C===l(p)&&(O?(G(R),R=-1):O=!0,$(ze,le-Me))):(C.sortIndex=x,r(g,C),L||S||(L=!0,X||(X=!0,ne()))),C},a.unstable_shouldYield=ue,a.unstable_wrapCallback=function(C){var K=v;return function(){var le=v;v=K;try{return C.apply(this,arguments)}finally{v=le}}}})(zu)),zu}var pm;function Uz(){return pm||(pm=1,yu.exports=Nz()),yu.exports}var Su={exports:{}},Xn={};var hm;function jz(){if(hm)return Xn;hm=1;var a=ed();function r(g){var p="https://react.dev/errors/"+g;if(1<arguments.length){p+="?args[]="+encodeURIComponent(arguments[1]);for(var b=2;b<arguments.length;b++)p+="&args[]="+encodeURIComponent(arguments[b])}return"Minified React error #"+g+"; visit "+p+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function l(){}var s={d:{f:l,r:function(){throw Error(r(522))},D:l,C:l,L:l,m:l,X:l,S:l,M:l},p:0,findDOMNode:null},u=Symbol.for("react.portal");function d(g,p,b){var y=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:u,key:y==null?null:""+y,children:g,containerInfo:p,implementation:b}}var f=a.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function h(g,p){if(g==="font")return"";if(typeof p=="string")return p==="use-credentials"?p:""}return Xn.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=s,Xn.createPortal=function(g,p){var b=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!p||p.nodeType!==1&&p.nodeType!==9&&p.nodeType!==11)throw Error(r(299));return d(g,p,null,b)},Xn.flushSync=function(g){var p=f.T,b=s.p;try{if(f.T=null,s.p=2,g)return g()}finally{f.T=p,s.p=b,s.d.f()}},Xn.preconnect=function(g,p){typeof g=="string"&&(p?(p=p.crossOrigin,p=typeof p=="string"?p==="use-credentials"?p:"":void 0):p=null,s.d.C(g,p))},Xn.prefetchDNS=function(g){typeof g=="string"&&s.d.D(g)},Xn.preinit=function(g,p){if(typeof g=="string"&&p&&typeof p.as=="string"){var b=p.as,y=h(b,p.crossOrigin),v=typeof p.integrity=="string"?p.integrity:void 0,S=typeof p.fetchPriority=="string"?p.fetchPriority:void 0;b==="style"?s.d.S(g,typeof p.precedence=="string"?p.precedence:void 0,{crossOrigin:y,integrity:v,fetchPriority:S}):b==="script"&&s.d.X(g,{crossOrigin:y,integrity:v,fetchPriority:S,nonce:typeof p.nonce=="string"?p.nonce:void 0})}},Xn.preinitModule=function(g,p){if(typeof g=="string")if(typeof p=="object"&&p!==null){if(p.as==null||p.as==="script"){var b=h(p.as,p.crossOrigin);s.d.M(g,{crossOrigin:b,integrity:typeof p.integrity=="string"?p.integrity:void 0,nonce:typeof p.nonce=="string"?p.nonce:void 0})}}else p==null&&s.d.M(g)},Xn.preload=function(g,p){if(typeof g=="string"&&typeof p=="object"&&p!==null&&typeof p.as=="string"){var b=p.as,y=h(b,p.crossOrigin);s.d.L(g,b,{crossOrigin:y,integrity:typeof p.integrity=="string"?p.integrity:void 0,nonce:typeof p.nonce=="string"?p.nonce:void 0,type:typeof p.type=="string"?p.type:void 0,fetchPriority:typeof p.fetchPriority=="string"?p.fetchPriority:void 0,referrerPolicy:typeof p.referrerPolicy=="string"?p.referrerPolicy:void 0,imageSrcSet:typeof p.imageSrcSet=="string"?p.imageSrcSet:void 0,imageSizes:typeof p.imageSizes=="string"?p.imageSizes:void 0,media:typeof p.media=="string"?p.media:void 0})}},Xn.preloadModule=function(g,p){if(typeof g=="string")if(p){var b=h(p.as,p.crossOrigin);s.d.m(g,{as:typeof p.as=="string"&&p.as!=="script"?p.as:void 0,crossOrigin:b,integrity:typeof p.integrity=="string"?p.integrity:void 0})}else s.d.m(g)},Xn.requestFormReset=function(g){s.d.r(g)},Xn.unstable_batchedUpdates=function(g,p){return g(p)},Xn.useFormState=function(g,p,b){return f.H.useFormState(g,p,b)},Xn.useFormStatus=function(){return f.H.useHostTransitionStatus()},Xn.version="19.2.3",Xn}var mm;function wg(){if(mm)return Su.exports;mm=1;function a(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(a)}catch(r){console.error(r)}}return a(),Su.exports=jz(),Su.exports}var gm;function Bz(){if(gm)return ul;gm=1;var a=Uz(),r=ed(),l=wg();function s(e){var n="https://react.dev/errors/"+e;if(1<arguments.length){n+="?args[]="+encodeURIComponent(arguments[1]);for(var t=2;t<arguments.length;t++)n+="&args[]="+encodeURIComponent(arguments[t])}return"Minified React error #"+e+"; visit "+n+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function u(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function d(e){var n=e,t=e;if(e.alternate)for(;n.return;)n=n.return;else{e=n;do n=e,(n.flags&4098)!==0&&(t=n.return),e=n.return;while(e)}return n.tag===3?t:null}function f(e){if(e.tag===13){var n=e.memoizedState;if(n===null&&(e=e.alternate,e!==null&&(n=e.memoizedState)),n!==null)return n.dehydrated}return null}function h(e){if(e.tag===31){var n=e.memoizedState;if(n===null&&(e=e.alternate,e!==null&&(n=e.memoizedState)),n!==null)return n.dehydrated}return null}function g(e){if(d(e)!==e)throw Error(s(188))}function p(e){var n=e.alternate;if(!n){if(n=d(e),n===null)throw Error(s(188));return n!==e?null:e}for(var t=e,i=n;;){var o=t.return;if(o===null)break;var c=o.alternate;if(c===null){if(i=o.return,i!==null){t=i;continue}break}if(o.child===c.child){for(c=o.child;c;){if(c===t)return g(o),e;if(c===i)return g(o),n;c=c.sibling}throw Error(s(188))}if(t.return!==i.return)t=o,i=c;else{for(var m=!1,z=o.child;z;){if(z===t){m=!0,t=o,i=c;break}if(z===i){m=!0,i=o,t=c;break}z=z.sibling}if(!m){for(z=c.child;z;){if(z===t){m=!0,t=c,i=o;break}if(z===i){m=!0,i=c,t=o;break}z=z.sibling}if(!m)throw Error(s(189))}}if(t.alternate!==i)throw Error(s(190))}if(t.tag!==3)throw Error(s(188));return t.stateNode.current===t?e:n}function b(e){var n=e.tag;if(n===5||n===26||n===27||n===6)return e;for(e=e.child;e!==null;){if(n=b(e),n!==null)return n;e=e.sibling}return null}var y=Object.assign,v=Symbol.for("react.element"),S=Symbol.for("react.transitional.element"),L=Symbol.for("react.portal"),O=Symbol.for("react.fragment"),Z=Symbol.for("react.strict_mode"),U=Symbol.for("react.profiler"),G=Symbol.for("react.consumer"),q=Symbol.for("react.context"),de=Symbol.for("react.forward_ref"),ze=Symbol.for("react.suspense"),X=Symbol.for("react.suspense_list"),R=Symbol.for("react.memo"),te=Symbol.for("react.lazy"),he=Symbol.for("react.activity"),ue=Symbol.for("react.memo_cache_sentinel"),ie=Symbol.iterator;function ne(e){return e===null||typeof e!="object"?null:(e=ie&&e[ie]||e["@@iterator"],typeof e=="function"?e:null)}var Ae=Symbol.for("react.client.reference");function fe(e){if(e==null)return null;if(typeof e=="function")return e.$$typeof===Ae?null:e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case O:return"Fragment";case U:return"Profiler";case Z:return"StrictMode";case ze:return"Suspense";case X:return"SuspenseList";case he:return"Activity"}if(typeof e=="object")switch(e.$$typeof){case L:return"Portal";case q:return e.displayName||"Context";case G:return(e._context.displayName||"Context")+".Consumer";case de:var n=e.render;return e=e.displayName,e||(e=n.displayName||n.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case R:return n=e.displayName||null,n!==null?n:fe(e.type)||"Memo";case te:n=e._payload,e=e._init;try{return fe(e(n))}catch{}}return null}var $=Array.isArray,C=r.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,K=l.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,le={pending:!1,data:null,method:null,action:null},Me=[],x=-1;function T(e){return{current:e}}function j(e){0>x||(e.current=Me[x],Me[x]=null,x--)}function E(e,n){x++,Me[x]=e.current,e.current=n}var re=T(null),ye=T(null),be=T(null),Ie=T(null);function Je(e,n){switch(E(be,n),E(ye,e),E(re,null),n.nodeType){case 9:case 11:e=(e=n.documentElement)&&(e=e.namespaceURI)?_h(e):0;break;default:if(e=n.tagName,n=n.namespaceURI)n=_h(n),e=Mh(n,e);else switch(e){case"svg":e=1;break;case"math":e=2;break;default:e=0}}j(re),E(re,e)}function Fe(){j(re),j(ye),j(be)}function qn(e){e.memoizedState!==null&&E(Ie,e);var n=re.current,t=Mh(n,e.type);n!==t&&(E(ye,e),E(re,t))}function _t(e){ye.current===e&&(j(re),j(ye)),Ie.current===e&&(j(Ie),rl._currentValue=le)}var xn,Mt;function bt(e){if(xn===void 0)try{throw Error()}catch(t){var n=t.stack.trim().match(/\n( *(at )?)/);xn=n&&n[1]||"",Mt=-1<t.stack.indexOf(`
    at`)?" (<anonymous>)":-1<t.stack.indexOf("@")?"@unknown:0:0":""}return`
`+xn+e+Mt}var za=!1;function Yn(e,n){if(!e||za)return"";za=!0;var t=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var i={DetermineComponentFrameRoot:function(){try{if(n){var Y=function(){throw Error()};if(Object.defineProperty(Y.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(Y,[])}catch(N){var W=N}Reflect.construct(e,[],Y)}else{try{Y.call()}catch(N){W=N}e.call(Y.prototype)}}else{try{throw Error()}catch(N){W=N}(Y=e())&&typeof Y.catch=="function"&&Y.catch(function(){})}}catch(N){if(N&&W&&typeof N.stack=="string")return[N.stack,W.stack]}return[null,null]}};i.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var o=Object.getOwnPropertyDescriptor(i.DetermineComponentFrameRoot,"name");o&&o.configurable&&Object.defineProperty(i.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var c=i.DetermineComponentFrameRoot(),m=c[0],z=c[1];if(m&&z){var D=m.split(`
`),M=z.split(`
`);for(o=i=0;i<D.length&&!D[i].includes("DetermineComponentFrameRoot");)i++;for(;o<M.length&&!M[o].includes("DetermineComponentFrameRoot");)o++;if(i===D.length||o===M.length)for(i=D.length-1,o=M.length-1;1<=i&&0<=o&&D[i]!==M[o];)o--;for(;1<=i&&0<=o;i--,o--)if(D[i]!==M[o]){if(i!==1||o!==1)do if(i--,o--,0>o||D[i]!==M[o]){var B=`
`+D[i].replace(" at new "," at ");return e.displayName&&B.includes("<anonymous>")&&(B=B.replace("<anonymous>",e.displayName)),B}while(1<=i&&0<=o);break}}}finally{za=!1,Error.prepareStackTrace=t}return(t=e?e.displayName||e.name:"")?bt(t):""}function Ii(e,n){switch(e.tag){case 26:case 27:case 5:return bt(e.type);case 16:return bt("Lazy");case 13:return e.child!==n&&n!==null?bt("Suspense Fallback"):bt("Suspense");case 19:return bt("SuspenseList");case 0:case 15:return Yn(e.type,!1);case 11:return Yn(e.type.render,!1);case 1:return Yn(e.type,!0);case 31:return bt("Activity");default:return""}}function _i(e){try{var n="",t=null;do n+=Ii(e,t),t=e,e=e.return;while(e);return n}catch(i){return`
Error generating stack: `+i.message+`
`+i.stack}}var Qt=Object.prototype.hasOwnProperty,Sa=a.unstable_scheduleCallback,ni=a.unstable_cancelCallback,Sr=a.unstable_shouldYield,vr=a.unstable_requestPaint,yn=a.unstable_now,Ft=a.unstable_getCurrentPriorityLevel,H=a.unstable_ImmediatePriority,ae=a.unstable_UserBlockingPriority,ve=a.unstable_NormalPriority,we=a.unstable_LowPriority,Ve=a.unstable_IdlePriority,Ln=a.log,Ct=a.unstable_setDisableYieldValue,mn=null,zn=null;function On(e){if(typeof Ln=="function"&&Ct(e),zn&&typeof zn.setStrictMode=="function")try{zn.setStrictMode(mn,e)}catch{}}var Ke=Math.clz32?Math.clz32:Mi,jt=Math.log,Gn=Math.LN2;function Mi(e){return e>>>=0,e===0?32:31-(jt(e)/Gn|0)|0}var ti=256,va=262144,Ea=4194304;function Kt(e){var n=e&42;if(n!==0)return n;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&261888;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function ai(e,n,t){var i=e.pendingLanes;if(i===0)return 0;var o=0,c=e.suspendedLanes,m=e.pingedLanes;e=e.warmLanes;var z=i&134217727;return z!==0?(i=z&~c,i!==0?o=Kt(i):(m&=z,m!==0?o=Kt(m):t||(t=z&~e,t!==0&&(o=Kt(t))))):(z=i&~c,z!==0?o=Kt(z):m!==0?o=Kt(m):t||(t=i&~e,t!==0&&(o=Kt(t)))),o===0?0:n!==0&&n!==o&&(n&c)===0&&(c=o&-o,t=n&-n,c>=t||c===32&&(t&4194048)!==0)?n:o}function ii(e,n){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&n)===0}function _l(e,n){switch(e){case 1:case 2:case 4:case 8:case 64:return n+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return n+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function ri(){var e=Ea;return Ea<<=1,(Ea&62914560)===0&&(Ea=4194304),e}function xa(e){for(var n=[],t=0;31>t;t++)n.push(e);return n}function li(e,n){e.pendingLanes|=n,n!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function lo(e,n,t,i,o,c){var m=e.pendingLanes;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=t,e.entangledLanes&=t,e.errorRecoveryDisabledLanes&=t,e.shellSuspendCounter=0;var z=e.entanglements,D=e.expirationTimes,M=e.hiddenUpdates;for(t=m&~t;0<t;){var B=31-Ke(t),Y=1<<B;z[B]=0,D[B]=-1;var W=M[B];if(W!==null)for(M[B]=null,B=0;B<W.length;B++){var N=W[B];N!==null&&(N.lane&=-536870913)}t&=~Y}i!==0&&A(e,i,0),c!==0&&o===0&&e.tag!==0&&(e.suspendedLanes|=c&~(m&~n))}function A(e,n,t){e.pendingLanes|=n,e.suspendedLanes&=~n;var i=31-Ke(n);e.entangledLanes|=n,e.entanglements[i]=e.entanglements[i]|1073741824|t&261930}function I(e,n){var t=e.entangledLanes|=n;for(e=e.entanglements;t;){var i=31-Ke(t),o=1<<i;o&n|e[i]&n&&(e[i]|=n),t&=~o}}function P(e,n){var t=n&-n;return t=(t&42)!==0?1:F(t),(t&(e.suspendedLanes|n))!==0?0:t}function F(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function se(e){return e&=-e,2<e?8<e?(e&134217727)!==0?32:268435456:8:2}function Ee(){var e=K.p;return e!==0?e:(e=window.event,e===void 0?32:nm(e.type))}function Te(e,n){var t=K.p;try{return K.p=e,n()}finally{K.p=t}}var pe=Math.random().toString(36).slice(2),ce="__reactFiber$"+pe,oe="__reactProps$"+pe,ge="__reactContainer$"+pe,ke="__reactEvents$"+pe,je="__reactListeners$"+pe,Mn="__reactHandles$"+pe,$e="__reactResources$"+pe,Pe="__reactMarker$"+pe;function on(e){delete e[ce],delete e[oe],delete e[ke],delete e[je],delete e[Mn]}function lt(e){var n=e[ce];if(n)return n;for(var t=e.parentNode;t;){if(n=t[ge]||t[ce]){if(t=n.alternate,n.child!==null||t!==null&&t.child!==null)for(e=Uh(e);e!==null;){if(t=e[ce])return t;e=Uh(e)}return n}e=t,t=e.parentNode}return null}function yt(e){if(e=e[ce]||e[ge]){var n=e.tag;if(n===5||n===6||n===13||n===31||n===26||n===27||n===3)return e}return null}function Hn(e){var n=e.tag;if(n===5||n===26||n===27||n===6)return e.stateNode;throw Error(s(33))}function Pn(e){var n=e[$e];return n||(n=e[$e]={hoistableStyles:new Map,hoistableScripts:new Map}),n}function Sn(e){e[Pe]=!0}var Da=new Set,Bt={};function zt(e,n){Lt(e,n),Lt(e+"Capture",n)}function Lt(e,n){for(Bt[e]=n,e=0;e<n.length;e++)Da.add(n[e])}var He=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),dn={},Jt={};function si(e){return Qt.call(Jt,e)?!0:Qt.call(dn,e)?!1:He.test(e)?Jt[e]=!0:(dn[e]=!0,!1)}function fn(e,n,t){if(si(n))if(t===null)e.removeAttribute(n);else{switch(typeof t){case"undefined":case"function":case"symbol":e.removeAttribute(n);return;case"boolean":var i=n.toLowerCase().slice(0,5);if(i!=="data-"&&i!=="aria-"){e.removeAttribute(n);return}}e.setAttribute(n,""+t)}}function Wt(e,n,t){if(t===null)e.removeAttribute(n);else{switch(typeof t){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(n);return}e.setAttribute(n,""+t)}}function St(e,n,t,i){if(i===null)e.removeAttribute(t);else{switch(typeof i){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(t);return}e.setAttributeNS(n,t,""+i)}}function Qn(e){switch(typeof e){case"bigint":case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function Ed(e){var n=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(n==="checkbox"||n==="radio")}function wb(e,n,t){var i=Object.getOwnPropertyDescriptor(e.constructor.prototype,n);if(!e.hasOwnProperty(n)&&typeof i<"u"&&typeof i.get=="function"&&typeof i.set=="function"){var o=i.get,c=i.set;return Object.defineProperty(e,n,{configurable:!0,get:function(){return o.call(this)},set:function(m){t=""+m,c.call(this,m)}}),Object.defineProperty(e,n,{enumerable:i.enumerable}),{getValue:function(){return t},setValue:function(m){t=""+m},stopTracking:function(){e._valueTracker=null,delete e[n]}}}}function so(e){if(!e._valueTracker){var n=Ed(e)?"checked":"value";e._valueTracker=wb(e,n,""+e[n])}}function xd(e){if(!e)return!1;var n=e._valueTracker;if(!n)return!0;var t=n.getValue(),i="";return e&&(i=Ed(e)?e.checked?"true":"false":e.value),e=i,e!==t?(n.setValue(e),!0):!1}function Ml(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}var Rb=/[\n"\\]/g;function vt(e){return e.replace(Rb,function(n){return"\\"+n.charCodeAt(0).toString(16)+" "})}function oo(e,n,t,i,o,c,m,z){e.name="",m!=null&&typeof m!="function"&&typeof m!="symbol"&&typeof m!="boolean"?e.type=m:e.removeAttribute("type"),n!=null?m==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+Qn(n)):e.value!==""+Qn(n)&&(e.value=""+Qn(n)):m!=="submit"&&m!=="reset"||e.removeAttribute("value"),n!=null?co(e,m,Qn(n)):t!=null?co(e,m,Qn(t)):i!=null&&e.removeAttribute("value"),o==null&&c!=null&&(e.defaultChecked=!!c),o!=null&&(e.checked=o&&typeof o!="function"&&typeof o!="symbol"),z!=null&&typeof z!="function"&&typeof z!="symbol"&&typeof z!="boolean"?e.name=""+Qn(z):e.removeAttribute("name")}function Dd(e,n,t,i,o,c,m,z){if(c!=null&&typeof c!="function"&&typeof c!="symbol"&&typeof c!="boolean"&&(e.type=c),n!=null||t!=null){if(!(c!=="submit"&&c!=="reset"||n!=null)){so(e);return}t=t!=null?""+Qn(t):"",n=n!=null?""+Qn(n):t,z||n===e.value||(e.value=n),e.defaultValue=n}i=i??o,i=typeof i!="function"&&typeof i!="symbol"&&!!i,e.checked=z?e.checked:!!i,e.defaultChecked=!!i,m!=null&&typeof m!="function"&&typeof m!="symbol"&&typeof m!="boolean"&&(e.name=m),so(e)}function co(e,n,t){n==="number"&&Ml(e.ownerDocument)===e||e.defaultValue===""+t||(e.defaultValue=""+t)}function Ci(e,n,t,i){if(e=e.options,n){n={};for(var o=0;o<t.length;o++)n["$"+t[o]]=!0;for(t=0;t<e.length;t++)o=n.hasOwnProperty("$"+e[t].value),e[t].selected!==o&&(e[t].selected=o),o&&i&&(e[t].defaultSelected=!0)}else{for(t=""+Qn(t),n=null,o=0;o<e.length;o++){if(e[o].value===t){e[o].selected=!0,i&&(e[o].defaultSelected=!0);return}n!==null||e[o].disabled||(n=e[o])}n!==null&&(n.selected=!0)}}function Td(e,n,t){if(n!=null&&(n=""+Qn(n),n!==e.value&&(e.value=n),t==null)){e.defaultValue!==n&&(e.defaultValue=n);return}e.defaultValue=t!=null?""+Qn(t):""}function Ad(e,n,t,i){if(n==null){if(i!=null){if(t!=null)throw Error(s(92));if($(i)){if(1<i.length)throw Error(s(93));i=i[0]}t=i}t==null&&(t=""),n=t}t=Qn(n),e.defaultValue=t,i=e.textContent,i===t&&i!==""&&i!==null&&(e.value=i),so(e)}function Li(e,n){if(n){var t=e.firstChild;if(t&&t===e.lastChild&&t.nodeType===3){t.nodeValue=n;return}}e.textContent=n}var kb=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function wd(e,n,t){var i=n.indexOf("--")===0;t==null||typeof t=="boolean"||t===""?i?e.setProperty(n,""):n==="float"?e.cssFloat="":e[n]="":i?e.setProperty(n,t):typeof t!="number"||t===0||kb.has(n)?n==="float"?e.cssFloat=t:e[n]=(""+t).trim():e[n]=t+"px"}function Rd(e,n,t){if(n!=null&&typeof n!="object")throw Error(s(62));if(e=e.style,t!=null){for(var i in t)!t.hasOwnProperty(i)||n!=null&&n.hasOwnProperty(i)||(i.indexOf("--")===0?e.setProperty(i,""):i==="float"?e.cssFloat="":e[i]="");for(var o in n)i=n[o],n.hasOwnProperty(o)&&t[o]!==i&&wd(e,o,i)}else for(var c in n)n.hasOwnProperty(c)&&wd(e,c,n[c])}function uo(e){if(e.indexOf("-")===-1)return!1;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Ib=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),_b=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function Cl(e){return _b.test(""+e)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":e}function $t(){}var fo=null;function po(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Wi=null,Oi=null;function kd(e){var n=yt(e);if(n&&(e=n.stateNode)){var t=e[oe]||null;e:switch(e=n.stateNode,n.type){case"input":if(oo(e,t.value,t.defaultValue,t.defaultValue,t.checked,t.defaultChecked,t.type,t.name),n=t.name,t.type==="radio"&&n!=null){for(t=e;t.parentNode;)t=t.parentNode;for(t=t.querySelectorAll('input[name="'+vt(""+n)+'"][type="radio"]'),n=0;n<t.length;n++){var i=t[n];if(i!==e&&i.form===e.form){var o=i[oe]||null;if(!o)throw Error(s(90));oo(i,o.value,o.defaultValue,o.defaultValue,o.checked,o.defaultChecked,o.type,o.name)}}for(n=0;n<t.length;n++)i=t[n],i.form===e.form&&xd(i)}break e;case"textarea":Td(e,t.value,t.defaultValue);break e;case"select":n=t.value,n!=null&&Ci(e,!!t.multiple,n,!1)}}}var ho=!1;function Id(e,n,t){if(ho)return e(n,t);ho=!0;try{var i=e(n);return i}finally{if(ho=!1,(Wi!==null||Oi!==null)&&(Ss(),Wi&&(n=Wi,e=Oi,Oi=Wi=null,kd(n),e)))for(n=0;n<e.length;n++)kd(e[n])}}function Er(e,n){var t=e.stateNode;if(t===null)return null;var i=t[oe]||null;if(i===null)return null;t=i[n];e:switch(n){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(i=!i.disabled)||(e=e.type,i=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!i;break e;default:e=!1}if(e)return null;if(t&&typeof t!="function")throw Error(s(231,n,typeof t));return t}var ea=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),mo=!1;if(ea)try{var xr={};Object.defineProperty(xr,"passive",{get:function(){mo=!0}}),window.addEventListener("test",xr,xr),window.removeEventListener("test",xr,xr)}catch{mo=!1}var Ta=null,go=null,Ll=null;function _d(){if(Ll)return Ll;var e,n=go,t=n.length,i,o="value"in Ta?Ta.value:Ta.textContent,c=o.length;for(e=0;e<t&&n[e]===o[e];e++);var m=t-e;for(i=1;i<=m&&n[t-i]===o[c-i];i++);return Ll=o.slice(e,1<i?1-i:void 0)}function Wl(e){var n=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&n===13&&(e=13)):e=n,e===10&&(e=13),32<=e||e===13?e:0}function Ol(){return!0}function Md(){return!1}function Fn(e){function n(t,i,o,c,m){this._reactName=t,this._targetInst=o,this.type=i,this.nativeEvent=c,this.target=m,this.currentTarget=null;for(var z in e)e.hasOwnProperty(z)&&(t=e[z],this[z]=t?t(c):c[z]);return this.isDefaultPrevented=(c.defaultPrevented!=null?c.defaultPrevented:c.returnValue===!1)?Ol:Md,this.isPropagationStopped=Md,this}return y(n.prototype,{preventDefault:function(){this.defaultPrevented=!0;var t=this.nativeEvent;t&&(t.preventDefault?t.preventDefault():typeof t.returnValue!="unknown"&&(t.returnValue=!1),this.isDefaultPrevented=Ol)},stopPropagation:function(){var t=this.nativeEvent;t&&(t.stopPropagation?t.stopPropagation():typeof t.cancelBubble!="unknown"&&(t.cancelBubble=!0),this.isPropagationStopped=Ol)},persist:function(){},isPersistent:Ol}),n}var oi={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Pl=Fn(oi),Dr=y({},oi,{view:0,detail:0}),Mb=Fn(Dr),bo,yo,Tr,Nl=y({},Dr,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:So,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==Tr&&(Tr&&e.type==="mousemove"?(bo=e.screenX-Tr.screenX,yo=e.screenY-Tr.screenY):yo=bo=0,Tr=e),bo)},movementY:function(e){return"movementY"in e?e.movementY:yo}}),Cd=Fn(Nl),Cb=y({},Nl,{dataTransfer:0}),Lb=Fn(Cb),Wb=y({},Dr,{relatedTarget:0}),zo=Fn(Wb),Ob=y({},oi,{animationName:0,elapsedTime:0,pseudoElement:0}),Pb=Fn(Ob),Nb=y({},oi,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),Ub=Fn(Nb),jb=y({},oi,{data:0}),Ld=Fn(jb),Bb={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Xb={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Zb={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Hb(e){var n=this.nativeEvent;return n.getModifierState?n.getModifierState(e):(e=Zb[e])?!!n[e]:!1}function So(){return Hb}var Vb=y({},Dr,{key:function(e){if(e.key){var n=Bb[e.key]||e.key;if(n!=="Unidentified")return n}return e.type==="keypress"?(e=Wl(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?Xb[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:So,charCode:function(e){return e.type==="keypress"?Wl(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Wl(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),qb=Fn(Vb),Yb=y({},Nl,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Wd=Fn(Yb),Gb=y({},Dr,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:So}),Qb=Fn(Gb),Fb=y({},oi,{propertyName:0,elapsedTime:0,pseudoElement:0}),Kb=Fn(Fb),Jb=y({},Nl,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),$b=Fn(Jb),ey=y({},oi,{newState:0,oldState:0}),ny=Fn(ey),ty=[9,13,27,32],vo=ea&&"CompositionEvent"in window,Ar=null;ea&&"documentMode"in document&&(Ar=document.documentMode);var ay=ea&&"TextEvent"in window&&!Ar,Od=ea&&(!vo||Ar&&8<Ar&&11>=Ar),Pd=" ",Nd=!1;function Ud(e,n){switch(e){case"keyup":return ty.indexOf(n.keyCode)!==-1;case"keydown":return n.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function jd(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var Pi=!1;function iy(e,n){switch(e){case"compositionend":return jd(n);case"keypress":return n.which!==32?null:(Nd=!0,Pd);case"textInput":return e=n.data,e===Pd&&Nd?null:e;default:return null}}function ry(e,n){if(Pi)return e==="compositionend"||!vo&&Ud(e,n)?(e=_d(),Ll=go=Ta=null,Pi=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(n.ctrlKey||n.altKey||n.metaKey)||n.ctrlKey&&n.altKey){if(n.char&&1<n.char.length)return n.char;if(n.which)return String.fromCharCode(n.which)}return null;case"compositionend":return Od&&n.locale!=="ko"?null:n.data;default:return null}}var ly={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Bd(e){var n=e&&e.nodeName&&e.nodeName.toLowerCase();return n==="input"?!!ly[e.type]:n==="textarea"}function Xd(e,n,t,i){Wi?Oi?Oi.push(i):Oi=[i]:Wi=i,n=ws(n,"onChange"),0<n.length&&(t=new Pl("onChange","change",null,t,i),e.push({event:t,listeners:n}))}var wr=null,Rr=null;function sy(e){Th(e,0)}function Ul(e){var n=Hn(e);if(xd(n))return e}function Zd(e,n){if(e==="change")return n}var Hd=!1;if(ea){var Eo;if(ea){var xo="oninput"in document;if(!xo){var Vd=document.createElement("div");Vd.setAttribute("oninput","return;"),xo=typeof Vd.oninput=="function"}Eo=xo}else Eo=!1;Hd=Eo&&(!document.documentMode||9<document.documentMode)}function qd(){wr&&(wr.detachEvent("onpropertychange",Yd),Rr=wr=null)}function Yd(e){if(e.propertyName==="value"&&Ul(Rr)){var n=[];Xd(n,Rr,e,po(e)),Id(sy,n)}}function oy(e,n,t){e==="focusin"?(qd(),wr=n,Rr=t,wr.attachEvent("onpropertychange",Yd)):e==="focusout"&&qd()}function cy(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Ul(Rr)}function uy(e,n){if(e==="click")return Ul(n)}function dy(e,n){if(e==="input"||e==="change")return Ul(n)}function fy(e,n){return e===n&&(e!==0||1/e===1/n)||e!==e&&n!==n}var st=typeof Object.is=="function"?Object.is:fy;function kr(e,n){if(st(e,n))return!0;if(typeof e!="object"||e===null||typeof n!="object"||n===null)return!1;var t=Object.keys(e),i=Object.keys(n);if(t.length!==i.length)return!1;for(i=0;i<t.length;i++){var o=t[i];if(!Qt.call(n,o)||!st(e[o],n[o]))return!1}return!0}function Gd(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Qd(e,n){var t=Gd(e);e=0;for(var i;t;){if(t.nodeType===3){if(i=e+t.textContent.length,e<=n&&i>=n)return{node:t,offset:n-e};e=i}e:{for(;t;){if(t.nextSibling){t=t.nextSibling;break e}t=t.parentNode}t=void 0}t=Gd(t)}}function Fd(e,n){return e&&n?e===n?!0:e&&e.nodeType===3?!1:n&&n.nodeType===3?Fd(e,n.parentNode):"contains"in e?e.contains(n):e.compareDocumentPosition?!!(e.compareDocumentPosition(n)&16):!1:!1}function Kd(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var n=Ml(e.document);n instanceof e.HTMLIFrameElement;){try{var t=typeof n.contentWindow.location.href=="string"}catch{t=!1}if(t)e=n.contentWindow;else break;n=Ml(e.document)}return n}function Do(e){var n=e&&e.nodeName&&e.nodeName.toLowerCase();return n&&(n==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||n==="textarea"||e.contentEditable==="true")}var py=ea&&"documentMode"in document&&11>=document.documentMode,Ni=null,To=null,Ir=null,Ao=!1;function Jd(e,n,t){var i=t.window===t?t.document:t.nodeType===9?t:t.ownerDocument;Ao||Ni==null||Ni!==Ml(i)||(i=Ni,"selectionStart"in i&&Do(i)?i={start:i.selectionStart,end:i.selectionEnd}:(i=(i.ownerDocument&&i.ownerDocument.defaultView||window).getSelection(),i={anchorNode:i.anchorNode,anchorOffset:i.anchorOffset,focusNode:i.focusNode,focusOffset:i.focusOffset}),Ir&&kr(Ir,i)||(Ir=i,i=ws(To,"onSelect"),0<i.length&&(n=new Pl("onSelect","select",null,n,t),e.push({event:n,listeners:i}),n.target=Ni)))}function ci(e,n){var t={};return t[e.toLowerCase()]=n.toLowerCase(),t["Webkit"+e]="webkit"+n,t["Moz"+e]="moz"+n,t}var Ui={animationend:ci("Animation","AnimationEnd"),animationiteration:ci("Animation","AnimationIteration"),animationstart:ci("Animation","AnimationStart"),transitionrun:ci("Transition","TransitionRun"),transitionstart:ci("Transition","TransitionStart"),transitioncancel:ci("Transition","TransitionCancel"),transitionend:ci("Transition","TransitionEnd")},wo={},$d={};ea&&($d=document.createElement("div").style,"AnimationEvent"in window||(delete Ui.animationend.animation,delete Ui.animationiteration.animation,delete Ui.animationstart.animation),"TransitionEvent"in window||delete Ui.transitionend.transition);function ui(e){if(wo[e])return wo[e];if(!Ui[e])return e;var n=Ui[e],t;for(t in n)if(n.hasOwnProperty(t)&&t in $d)return wo[e]=n[t];return e}var ef=ui("animationend"),nf=ui("animationiteration"),tf=ui("animationstart"),hy=ui("transitionrun"),my=ui("transitionstart"),gy=ui("transitioncancel"),af=ui("transitionend"),rf=new Map,Ro="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");Ro.push("scrollEnd");function Ot(e,n){rf.set(e,n),zt(n,[e])}var jl=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var n=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(n))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)},Et=[],ji=0,ko=0;function Bl(){for(var e=ji,n=ko=ji=0;n<e;){var t=Et[n];Et[n++]=null;var i=Et[n];Et[n++]=null;var o=Et[n];Et[n++]=null;var c=Et[n];if(Et[n++]=null,i!==null&&o!==null){var m=i.pending;m===null?o.next=o:(o.next=m.next,m.next=o),i.pending=o}c!==0&&lf(t,o,c)}}function Xl(e,n,t,i){Et[ji++]=e,Et[ji++]=n,Et[ji++]=t,Et[ji++]=i,ko|=i,e.lanes|=i,e=e.alternate,e!==null&&(e.lanes|=i)}function Io(e,n,t,i){return Xl(e,n,t,i),Zl(e)}function di(e,n){return Xl(e,null,null,n),Zl(e)}function lf(e,n,t){e.lanes|=t;var i=e.alternate;i!==null&&(i.lanes|=t);for(var o=!1,c=e.return;c!==null;)c.childLanes|=t,i=c.alternate,i!==null&&(i.childLanes|=t),c.tag===22&&(e=c.stateNode,e===null||e._visibility&1||(o=!0)),e=c,c=c.return;return e.tag===3?(c=e.stateNode,o&&n!==null&&(o=31-Ke(t),e=c.hiddenUpdates,i=e[o],i===null?e[o]=[n]:i.push(n),n.lane=t|536870912),c):null}function Zl(e){if(50<Jr)throw Jr=0,Uc=null,Error(s(185));for(var n=e.return;n!==null;)e=n,n=e.return;return e.tag===3?e.stateNode:null}var Bi={};function by(e,n,t,i){this.tag=e,this.key=t,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=n,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=i,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function ot(e,n,t,i){return new by(e,n,t,i)}function _o(e){return e=e.prototype,!(!e||!e.isReactComponent)}function na(e,n){var t=e.alternate;return t===null?(t=ot(e.tag,n,e.key,e.mode),t.elementType=e.elementType,t.type=e.type,t.stateNode=e.stateNode,t.alternate=e,e.alternate=t):(t.pendingProps=n,t.type=e.type,t.flags=0,t.subtreeFlags=0,t.deletions=null),t.flags=e.flags&65011712,t.childLanes=e.childLanes,t.lanes=e.lanes,t.child=e.child,t.memoizedProps=e.memoizedProps,t.memoizedState=e.memoizedState,t.updateQueue=e.updateQueue,n=e.dependencies,t.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext},t.sibling=e.sibling,t.index=e.index,t.ref=e.ref,t.refCleanup=e.refCleanup,t}function sf(e,n){e.flags&=65011714;var t=e.alternate;return t===null?(e.childLanes=0,e.lanes=n,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=t.childLanes,e.lanes=t.lanes,e.child=t.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=t.memoizedProps,e.memoizedState=t.memoizedState,e.updateQueue=t.updateQueue,e.type=t.type,n=t.dependencies,e.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext}),e}function Hl(e,n,t,i,o,c){var m=0;if(i=e,typeof e=="function")_o(e)&&(m=1);else if(typeof e=="string")m=Ez(e,t,re.current)?26:e==="html"||e==="head"||e==="body"?27:5;else e:switch(e){case he:return e=ot(31,t,n,o),e.elementType=he,e.lanes=c,e;case O:return fi(t.children,o,c,n);case Z:m=8,o|=24;break;case U:return e=ot(12,t,n,o|2),e.elementType=U,e.lanes=c,e;case ze:return e=ot(13,t,n,o),e.elementType=ze,e.lanes=c,e;case X:return e=ot(19,t,n,o),e.elementType=X,e.lanes=c,e;default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case q:m=10;break e;case G:m=9;break e;case de:m=11;break e;case R:m=14;break e;case te:m=16,i=null;break e}m=29,t=Error(s(130,e===null?"null":typeof e,"")),i=null}return n=ot(m,t,n,o),n.elementType=e,n.type=i,n.lanes=c,n}function fi(e,n,t,i){return e=ot(7,e,i,n),e.lanes=t,e}function Mo(e,n,t){return e=ot(6,e,null,n),e.lanes=t,e}function of(e){var n=ot(18,null,null,0);return n.stateNode=e,n}function Co(e,n,t){return n=ot(4,e.children!==null?e.children:[],e.key,n),n.lanes=t,n.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},n}var cf=new WeakMap;function xt(e,n){if(typeof e=="object"&&e!==null){var t=cf.get(e);return t!==void 0?t:(n={value:e,source:n,stack:_i(n)},cf.set(e,n),n)}return{value:e,source:n,stack:_i(n)}}var Xi=[],Zi=0,Vl=null,_r=0,Dt=[],Tt=0,Aa=null,Xt=1,Zt="";function ta(e,n){Xi[Zi++]=_r,Xi[Zi++]=Vl,Vl=e,_r=n}function uf(e,n,t){Dt[Tt++]=Xt,Dt[Tt++]=Zt,Dt[Tt++]=Aa,Aa=e;var i=Xt;e=Zt;var o=32-Ke(i)-1;i&=~(1<<o),t+=1;var c=32-Ke(n)+o;if(30<c){var m=o-o%5;c=(i&(1<<m)-1).toString(32),i>>=m,o-=m,Xt=1<<32-Ke(n)+o|t<<o|i,Zt=c+e}else Xt=1<<c|t<<o|i,Zt=e}function Lo(e){e.return!==null&&(ta(e,1),uf(e,1,0))}function Wo(e){for(;e===Vl;)Vl=Xi[--Zi],Xi[Zi]=null,_r=Xi[--Zi],Xi[Zi]=null;for(;e===Aa;)Aa=Dt[--Tt],Dt[Tt]=null,Zt=Dt[--Tt],Dt[Tt]=null,Xt=Dt[--Tt],Dt[Tt]=null}function df(e,n){Dt[Tt++]=Xt,Dt[Tt++]=Zt,Dt[Tt++]=Aa,Xt=n.id,Zt=n.overflow,Aa=e}var Nn=null,pn=null,Ze=!1,wa=null,At=!1,Oo=Error(s(519));function Ra(e){var n=Error(s(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw Mr(xt(n,e)),Oo}function ff(e){var n=e.stateNode,t=e.type,i=e.memoizedProps;switch(n[ce]=e,n[oe]=i,t){case"dialog":Ue("cancel",n),Ue("close",n);break;case"iframe":case"object":case"embed":Ue("load",n);break;case"video":case"audio":for(t=0;t<el.length;t++)Ue(el[t],n);break;case"source":Ue("error",n);break;case"img":case"image":case"link":Ue("error",n),Ue("load",n);break;case"details":Ue("toggle",n);break;case"input":Ue("invalid",n),Dd(n,i.value,i.defaultValue,i.checked,i.defaultChecked,i.type,i.name,!0);break;case"select":Ue("invalid",n);break;case"textarea":Ue("invalid",n),Ad(n,i.value,i.defaultValue,i.children)}t=i.children,typeof t!="string"&&typeof t!="number"&&typeof t!="bigint"||n.textContent===""+t||i.suppressHydrationWarning===!0||kh(n.textContent,t)?(i.popover!=null&&(Ue("beforetoggle",n),Ue("toggle",n)),i.onScroll!=null&&Ue("scroll",n),i.onScrollEnd!=null&&Ue("scrollend",n),i.onClick!=null&&(n.onclick=$t),n=!0):n=!1,n||Ra(e,!0)}function pf(e){for(Nn=e.return;Nn;)switch(Nn.tag){case 5:case 31:case 13:At=!1;return;case 27:case 3:At=!0;return;default:Nn=Nn.return}}function Hi(e){if(e!==Nn)return!1;if(!Ze)return pf(e),Ze=!0,!1;var n=e.tag,t;if((t=n!==3&&n!==27)&&((t=n===5)&&(t=e.type,t=!(t!=="form"&&t!=="button")||eu(e.type,e.memoizedProps)),t=!t),t&&pn&&Ra(e),pf(e),n===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(s(317));pn=Nh(e)}else if(n===31){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(s(317));pn=Nh(e)}else n===27?(n=pn,Xa(e.type)?(e=ru,ru=null,pn=e):pn=n):pn=Nn?Rt(e.stateNode.nextSibling):null;return!0}function pi(){pn=Nn=null,Ze=!1}function Po(){var e=wa;return e!==null&&(et===null?et=e:et.push.apply(et,e),wa=null),e}function Mr(e){wa===null?wa=[e]:wa.push(e)}var No=T(null),hi=null,aa=null;function ka(e,n,t){E(No,n._currentValue),n._currentValue=t}function ia(e){e._currentValue=No.current,j(No)}function Uo(e,n,t){for(;e!==null;){var i=e.alternate;if((e.childLanes&n)!==n?(e.childLanes|=n,i!==null&&(i.childLanes|=n)):i!==null&&(i.childLanes&n)!==n&&(i.childLanes|=n),e===t)break;e=e.return}}function jo(e,n,t,i){var o=e.child;for(o!==null&&(o.return=e);o!==null;){var c=o.dependencies;if(c!==null){var m=o.child;c=c.firstContext;e:for(;c!==null;){var z=c;c=o;for(var D=0;D<n.length;D++)if(z.context===n[D]){c.lanes|=t,z=c.alternate,z!==null&&(z.lanes|=t),Uo(c.return,t,e),i||(m=null);break e}c=z.next}}else if(o.tag===18){if(m=o.return,m===null)throw Error(s(341));m.lanes|=t,c=m.alternate,c!==null&&(c.lanes|=t),Uo(m,t,e),m=null}else m=o.child;if(m!==null)m.return=o;else for(m=o;m!==null;){if(m===e){m=null;break}if(o=m.sibling,o!==null){o.return=m.return,m=o;break}m=m.return}o=m}}function Vi(e,n,t,i){e=null;for(var o=n,c=!1;o!==null;){if(!c){if((o.flags&524288)!==0)c=!0;else if((o.flags&262144)!==0)break}if(o.tag===10){var m=o.alternate;if(m===null)throw Error(s(387));if(m=m.memoizedProps,m!==null){var z=o.type;st(o.pendingProps.value,m.value)||(e!==null?e.push(z):e=[z])}}else if(o===Ie.current){if(m=o.alternate,m===null)throw Error(s(387));m.memoizedState.memoizedState!==o.memoizedState.memoizedState&&(e!==null?e.push(rl):e=[rl])}o=o.return}e!==null&&jo(n,e,t,i),n.flags|=262144}function ql(e){for(e=e.firstContext;e!==null;){if(!st(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function mi(e){hi=e,aa=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function Un(e){return hf(hi,e)}function Yl(e,n){return hi===null&&mi(e),hf(e,n)}function hf(e,n){var t=n._currentValue;if(n={context:n,memoizedValue:t,next:null},aa===null){if(e===null)throw Error(s(308));aa=n,e.dependencies={lanes:0,firstContext:n},e.flags|=524288}else aa=aa.next=n;return t}var yy=typeof AbortController<"u"?AbortController:function(){var e=[],n=this.signal={aborted:!1,addEventListener:function(t,i){e.push(i)}};this.abort=function(){n.aborted=!0,e.forEach(function(t){return t()})}},zy=a.unstable_scheduleCallback,Sy=a.unstable_NormalPriority,An={$$typeof:q,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function Bo(){return{controller:new yy,data:new Map,refCount:0}}function Cr(e){e.refCount--,e.refCount===0&&zy(Sy,function(){e.controller.abort()})}var Lr=null,Xo=0,qi=0,Yi=null;function vy(e,n){if(Lr===null){var t=Lr=[];Xo=0,qi=Vc(),Yi={status:"pending",value:void 0,then:function(i){t.push(i)}}}return Xo++,n.then(mf,mf),n}function mf(){if(--Xo===0&&Lr!==null){Yi!==null&&(Yi.status="fulfilled");var e=Lr;Lr=null,qi=0,Yi=null;for(var n=0;n<e.length;n++)(0,e[n])()}}function Ey(e,n){var t=[],i={status:"pending",value:null,reason:null,then:function(o){t.push(o)}};return e.then(function(){i.status="fulfilled",i.value=n;for(var o=0;o<t.length;o++)(0,t[o])(n)},function(o){for(i.status="rejected",i.reason=o,o=0;o<t.length;o++)(0,t[o])(void 0)}),i}var gf=C.S;C.S=function(e,n){$p=yn(),typeof n=="object"&&n!==null&&typeof n.then=="function"&&vy(e,n),gf!==null&&gf(e,n)};var gi=T(null);function Zo(){var e=gi.current;return e!==null?e:sn.pooledCache}function Gl(e,n){n===null?E(gi,gi.current):E(gi,n.pool)}function bf(){var e=Zo();return e===null?null:{parent:An._currentValue,pool:e}}var Gi=Error(s(460)),Ho=Error(s(474)),Ql=Error(s(542)),Fl={then:function(){}};function yf(e){return e=e.status,e==="fulfilled"||e==="rejected"}function zf(e,n,t){switch(t=e[t],t===void 0?e.push(n):t!==n&&(n.then($t,$t),n=t),n.status){case"fulfilled":return n.value;case"rejected":throw e=n.reason,vf(e),e;default:if(typeof n.status=="string")n.then($t,$t);else{if(e=sn,e!==null&&100<e.shellSuspendCounter)throw Error(s(482));e=n,e.status="pending",e.then(function(i){if(n.status==="pending"){var o=n;o.status="fulfilled",o.value=i}},function(i){if(n.status==="pending"){var o=n;o.status="rejected",o.reason=i}})}switch(n.status){case"fulfilled":return n.value;case"rejected":throw e=n.reason,vf(e),e}throw yi=n,Gi}}function bi(e){try{var n=e._init;return n(e._payload)}catch(t){throw t!==null&&typeof t=="object"&&typeof t.then=="function"?(yi=t,Gi):t}}var yi=null;function Sf(){if(yi===null)throw Error(s(459));var e=yi;return yi=null,e}function vf(e){if(e===Gi||e===Ql)throw Error(s(483))}var Qi=null,Wr=0;function Kl(e){var n=Wr;return Wr+=1,Qi===null&&(Qi=[]),zf(Qi,e,n)}function Or(e,n){n=n.props.ref,e.ref=n!==void 0?n:null}function Jl(e,n){throw n.$$typeof===v?Error(s(525)):(e=Object.prototype.toString.call(n),Error(s(31,e==="[object Object]"?"object with keys {"+Object.keys(n).join(", ")+"}":e)))}function Ef(e){function n(k,w){if(e){var _=k.deletions;_===null?(k.deletions=[w],k.flags|=16):_.push(w)}}function t(k,w){if(!e)return null;for(;w!==null;)n(k,w),w=w.sibling;return null}function i(k){for(var w=new Map;k!==null;)k.key!==null?w.set(k.key,k):w.set(k.index,k),k=k.sibling;return w}function o(k,w){return k=na(k,w),k.index=0,k.sibling=null,k}function c(k,w,_){return k.index=_,e?(_=k.alternate,_!==null?(_=_.index,_<w?(k.flags|=67108866,w):_):(k.flags|=67108866,w)):(k.flags|=1048576,w)}function m(k){return e&&k.alternate===null&&(k.flags|=67108866),k}function z(k,w,_,V){return w===null||w.tag!==6?(w=Mo(_,k.mode,V),w.return=k,w):(w=o(w,_),w.return=k,w)}function D(k,w,_,V){var xe=_.type;return xe===O?B(k,w,_.props.children,V,_.key):w!==null&&(w.elementType===xe||typeof xe=="object"&&xe!==null&&xe.$$typeof===te&&bi(xe)===w.type)?(w=o(w,_.props),Or(w,_),w.return=k,w):(w=Hl(_.type,_.key,_.props,null,k.mode,V),Or(w,_),w.return=k,w)}function M(k,w,_,V){return w===null||w.tag!==4||w.stateNode.containerInfo!==_.containerInfo||w.stateNode.implementation!==_.implementation?(w=Co(_,k.mode,V),w.return=k,w):(w=o(w,_.children||[]),w.return=k,w)}function B(k,w,_,V,xe){return w===null||w.tag!==7?(w=fi(_,k.mode,V,xe),w.return=k,w):(w=o(w,_),w.return=k,w)}function Y(k,w,_){if(typeof w=="string"&&w!==""||typeof w=="number"||typeof w=="bigint")return w=Mo(""+w,k.mode,_),w.return=k,w;if(typeof w=="object"&&w!==null){switch(w.$$typeof){case S:return _=Hl(w.type,w.key,w.props,null,k.mode,_),Or(_,w),_.return=k,_;case L:return w=Co(w,k.mode,_),w.return=k,w;case te:return w=bi(w),Y(k,w,_)}if($(w)||ne(w))return w=fi(w,k.mode,_,null),w.return=k,w;if(typeof w.then=="function")return Y(k,Kl(w),_);if(w.$$typeof===q)return Y(k,Yl(k,w),_);Jl(k,w)}return null}function W(k,w,_,V){var xe=w!==null?w.key:null;if(typeof _=="string"&&_!==""||typeof _=="number"||typeof _=="bigint")return xe!==null?null:z(k,w,""+_,V);if(typeof _=="object"&&_!==null){switch(_.$$typeof){case S:return _.key===xe?D(k,w,_,V):null;case L:return _.key===xe?M(k,w,_,V):null;case te:return _=bi(_),W(k,w,_,V)}if($(_)||ne(_))return xe!==null?null:B(k,w,_,V,null);if(typeof _.then=="function")return W(k,w,Kl(_),V);if(_.$$typeof===q)return W(k,w,Yl(k,_),V);Jl(k,_)}return null}function N(k,w,_,V,xe){if(typeof V=="string"&&V!==""||typeof V=="number"||typeof V=="bigint")return k=k.get(_)||null,z(w,k,""+V,xe);if(typeof V=="object"&&V!==null){switch(V.$$typeof){case S:return k=k.get(V.key===null?_:V.key)||null,D(w,k,V,xe);case L:return k=k.get(V.key===null?_:V.key)||null,M(w,k,V,xe);case te:return V=bi(V),N(k,w,_,V,xe)}if($(V)||ne(V))return k=k.get(_)||null,B(w,k,V,xe,null);if(typeof V.then=="function")return N(k,w,_,Kl(V),xe);if(V.$$typeof===q)return N(k,w,_,Yl(w,V),xe);Jl(w,V)}return null}function me(k,w,_,V){for(var xe=null,qe=null,Se=w,Le=w=0,Xe=null;Se!==null&&Le<_.length;Le++){Se.index>Le?(Xe=Se,Se=null):Xe=Se.sibling;var Ye=W(k,Se,_[Le],V);if(Ye===null){Se===null&&(Se=Xe);break}e&&Se&&Ye.alternate===null&&n(k,Se),w=c(Ye,w,Le),qe===null?xe=Ye:qe.sibling=Ye,qe=Ye,Se=Xe}if(Le===_.length)return t(k,Se),Ze&&ta(k,Le),xe;if(Se===null){for(;Le<_.length;Le++)Se=Y(k,_[Le],V),Se!==null&&(w=c(Se,w,Le),qe===null?xe=Se:qe.sibling=Se,qe=Se);return Ze&&ta(k,Le),xe}for(Se=i(Se);Le<_.length;Le++)Xe=N(Se,k,Le,_[Le],V),Xe!==null&&(e&&Xe.alternate!==null&&Se.delete(Xe.key===null?Le:Xe.key),w=c(Xe,w,Le),qe===null?xe=Xe:qe.sibling=Xe,qe=Xe);return e&&Se.forEach(function(Ya){return n(k,Ya)}),Ze&&ta(k,Le),xe}function De(k,w,_,V){if(_==null)throw Error(s(151));for(var xe=null,qe=null,Se=w,Le=w=0,Xe=null,Ye=_.next();Se!==null&&!Ye.done;Le++,Ye=_.next()){Se.index>Le?(Xe=Se,Se=null):Xe=Se.sibling;var Ya=W(k,Se,Ye.value,V);if(Ya===null){Se===null&&(Se=Xe);break}e&&Se&&Ya.alternate===null&&n(k,Se),w=c(Ya,w,Le),qe===null?xe=Ya:qe.sibling=Ya,qe=Ya,Se=Xe}if(Ye.done)return t(k,Se),Ze&&ta(k,Le),xe;if(Se===null){for(;!Ye.done;Le++,Ye=_.next())Ye=Y(k,Ye.value,V),Ye!==null&&(w=c(Ye,w,Le),qe===null?xe=Ye:qe.sibling=Ye,qe=Ye);return Ze&&ta(k,Le),xe}for(Se=i(Se);!Ye.done;Le++,Ye=_.next())Ye=N(Se,k,Le,Ye.value,V),Ye!==null&&(e&&Ye.alternate!==null&&Se.delete(Ye.key===null?Le:Ye.key),w=c(Ye,w,Le),qe===null?xe=Ye:qe.sibling=Ye,qe=Ye);return e&&Se.forEach(function(Cz){return n(k,Cz)}),Ze&&ta(k,Le),xe}function ln(k,w,_,V){if(typeof _=="object"&&_!==null&&_.type===O&&_.key===null&&(_=_.props.children),typeof _=="object"&&_!==null){switch(_.$$typeof){case S:e:{for(var xe=_.key;w!==null;){if(w.key===xe){if(xe=_.type,xe===O){if(w.tag===7){t(k,w.sibling),V=o(w,_.props.children),V.return=k,k=V;break e}}else if(w.elementType===xe||typeof xe=="object"&&xe!==null&&xe.$$typeof===te&&bi(xe)===w.type){t(k,w.sibling),V=o(w,_.props),Or(V,_),V.return=k,k=V;break e}t(k,w);break}else n(k,w);w=w.sibling}_.type===O?(V=fi(_.props.children,k.mode,V,_.key),V.return=k,k=V):(V=Hl(_.type,_.key,_.props,null,k.mode,V),Or(V,_),V.return=k,k=V)}return m(k);case L:e:{for(xe=_.key;w!==null;){if(w.key===xe)if(w.tag===4&&w.stateNode.containerInfo===_.containerInfo&&w.stateNode.implementation===_.implementation){t(k,w.sibling),V=o(w,_.children||[]),V.return=k,k=V;break e}else{t(k,w);break}else n(k,w);w=w.sibling}V=Co(_,k.mode,V),V.return=k,k=V}return m(k);case te:return _=bi(_),ln(k,w,_,V)}if($(_))return me(k,w,_,V);if(ne(_)){if(xe=ne(_),typeof xe!="function")throw Error(s(150));return _=xe.call(_),De(k,w,_,V)}if(typeof _.then=="function")return ln(k,w,Kl(_),V);if(_.$$typeof===q)return ln(k,w,Yl(k,_),V);Jl(k,_)}return typeof _=="string"&&_!==""||typeof _=="number"||typeof _=="bigint"?(_=""+_,w!==null&&w.tag===6?(t(k,w.sibling),V=o(w,_),V.return=k,k=V):(t(k,w),V=Mo(_,k.mode,V),V.return=k,k=V),m(k)):t(k,w)}return function(k,w,_,V){try{Wr=0;var xe=ln(k,w,_,V);return Qi=null,xe}catch(Se){if(Se===Gi||Se===Ql)throw Se;var qe=ot(29,Se,null,k.mode);return qe.lanes=V,qe.return=k,qe}}}var zi=Ef(!0),xf=Ef(!1),Ia=!1;function Vo(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function qo(e,n){e=e.updateQueue,n.updateQueue===e&&(n.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function _a(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function Ma(e,n,t){var i=e.updateQueue;if(i===null)return null;if(i=i.shared,(Ge&2)!==0){var o=i.pending;return o===null?n.next=n:(n.next=o.next,o.next=n),i.pending=n,n=Zl(e),lf(e,null,t),n}return Xl(e,i,n,t),Zl(e)}function Pr(e,n,t){if(n=n.updateQueue,n!==null&&(n=n.shared,(t&4194048)!==0)){var i=n.lanes;i&=e.pendingLanes,t|=i,n.lanes=t,I(e,t)}}function Yo(e,n){var t=e.updateQueue,i=e.alternate;if(i!==null&&(i=i.updateQueue,t===i)){var o=null,c=null;if(t=t.firstBaseUpdate,t!==null){do{var m={lane:t.lane,tag:t.tag,payload:t.payload,callback:null,next:null};c===null?o=c=m:c=c.next=m,t=t.next}while(t!==null);c===null?o=c=n:c=c.next=n}else o=c=n;t={baseState:i.baseState,firstBaseUpdate:o,lastBaseUpdate:c,shared:i.shared,callbacks:i.callbacks},e.updateQueue=t;return}e=t.lastBaseUpdate,e===null?t.firstBaseUpdate=n:e.next=n,t.lastBaseUpdate=n}var Go=!1;function Nr(){if(Go){var e=Yi;if(e!==null)throw e}}function Ur(e,n,t,i){Go=!1;var o=e.updateQueue;Ia=!1;var c=o.firstBaseUpdate,m=o.lastBaseUpdate,z=o.shared.pending;if(z!==null){o.shared.pending=null;var D=z,M=D.next;D.next=null,m===null?c=M:m.next=M,m=D;var B=e.alternate;B!==null&&(B=B.updateQueue,z=B.lastBaseUpdate,z!==m&&(z===null?B.firstBaseUpdate=M:z.next=M,B.lastBaseUpdate=D))}if(c!==null){var Y=o.baseState;m=0,B=M=D=null,z=c;do{var W=z.lane&-536870913,N=W!==z.lane;if(N?(Be&W)===W:(i&W)===W){W!==0&&W===qi&&(Go=!0),B!==null&&(B=B.next={lane:0,tag:z.tag,payload:z.payload,callback:null,next:null});e:{var me=e,De=z;W=n;var ln=t;switch(De.tag){case 1:if(me=De.payload,typeof me=="function"){Y=me.call(ln,Y,W);break e}Y=me;break e;case 3:me.flags=me.flags&-65537|128;case 0:if(me=De.payload,W=typeof me=="function"?me.call(ln,Y,W):me,W==null)break e;Y=y({},Y,W);break e;case 2:Ia=!0}}W=z.callback,W!==null&&(e.flags|=64,N&&(e.flags|=8192),N=o.callbacks,N===null?o.callbacks=[W]:N.push(W))}else N={lane:W,tag:z.tag,payload:z.payload,callback:z.callback,next:null},B===null?(M=B=N,D=Y):B=B.next=N,m|=W;if(z=z.next,z===null){if(z=o.shared.pending,z===null)break;N=z,z=N.next,N.next=null,o.lastBaseUpdate=N,o.shared.pending=null}}while(!0);B===null&&(D=Y),o.baseState=D,o.firstBaseUpdate=M,o.lastBaseUpdate=B,c===null&&(o.shared.lanes=0),Pa|=m,e.lanes=m,e.memoizedState=Y}}function Df(e,n){if(typeof e!="function")throw Error(s(191,e));e.call(n)}function Tf(e,n){var t=e.callbacks;if(t!==null)for(e.callbacks=null,e=0;e<t.length;e++)Df(t[e],n)}var Fi=T(null),$l=T(0);function Af(e,n){e=pa,E($l,e),E(Fi,n),pa=e|n.baseLanes}function Qo(){E($l,pa),E(Fi,Fi.current)}function Fo(){pa=$l.current,j(Fi),j($l)}var ct=T(null),wt=null;function Ca(e){var n=e.alternate;E(Dn,Dn.current&1),E(ct,e),wt===null&&(n===null||Fi.current!==null||n.memoizedState!==null)&&(wt=e)}function Ko(e){E(Dn,Dn.current),E(ct,e),wt===null&&(wt=e)}function wf(e){e.tag===22?(E(Dn,Dn.current),E(ct,e),wt===null&&(wt=e)):La()}function La(){E(Dn,Dn.current),E(ct,ct.current)}function ut(e){j(ct),wt===e&&(wt=null),j(Dn)}var Dn=T(0);function es(e){for(var n=e;n!==null;){if(n.tag===13){var t=n.memoizedState;if(t!==null&&(t=t.dehydrated,t===null||au(t)||iu(t)))return n}else if(n.tag===19&&(n.memoizedProps.revealOrder==="forwards"||n.memoizedProps.revealOrder==="backwards"||n.memoizedProps.revealOrder==="unstable_legacy-backwards"||n.memoizedProps.revealOrder==="together")){if((n.flags&128)!==0)return n}else if(n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return null;n=n.return}n.sibling.return=n.return,n=n.sibling}return null}var ra=0,Ce=null,an=null,wn=null,ns=!1,Ki=!1,Si=!1,ts=0,jr=0,Ji=null,xy=0;function vn(){throw Error(s(321))}function Jo(e,n){if(n===null)return!1;for(var t=0;t<n.length&&t<e.length;t++)if(!st(e[t],n[t]))return!1;return!0}function $o(e,n,t,i,o,c){return ra=c,Ce=n,n.memoizedState=null,n.updateQueue=null,n.lanes=0,C.H=e===null||e.memoizedState===null?up:hc,Si=!1,c=t(i,o),Si=!1,Ki&&(c=kf(n,t,i,o)),Rf(e),c}function Rf(e){C.H=Zr;var n=an!==null&&an.next!==null;if(ra=0,wn=an=Ce=null,ns=!1,jr=0,Ji=null,n)throw Error(s(300));e===null||Rn||(e=e.dependencies,e!==null&&ql(e)&&(Rn=!0))}function kf(e,n,t,i){Ce=e;var o=0;do{if(Ki&&(Ji=null),jr=0,Ki=!1,25<=o)throw Error(s(301));if(o+=1,wn=an=null,e.updateQueue!=null){var c=e.updateQueue;c.lastEffect=null,c.events=null,c.stores=null,c.memoCache!=null&&(c.memoCache.index=0)}C.H=dp,c=n(t,i)}while(Ki);return c}function Dy(){var e=C.H,n=e.useState()[0];return n=typeof n.then=="function"?Br(n):n,e=e.useState()[0],(an!==null?an.memoizedState:null)!==e&&(Ce.flags|=1024),n}function ec(){var e=ts!==0;return ts=0,e}function nc(e,n,t){n.updateQueue=e.updateQueue,n.flags&=-2053,e.lanes&=~t}function tc(e){if(ns){for(e=e.memoizedState;e!==null;){var n=e.queue;n!==null&&(n.pending=null),e=e.next}ns=!1}ra=0,wn=an=Ce=null,Ki=!1,jr=ts=0,Ji=null}function Vn(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return wn===null?Ce.memoizedState=wn=e:wn=wn.next=e,wn}function Tn(){if(an===null){var e=Ce.alternate;e=e!==null?e.memoizedState:null}else e=an.next;var n=wn===null?Ce.memoizedState:wn.next;if(n!==null)wn=n,an=e;else{if(e===null)throw Ce.alternate===null?Error(s(467)):Error(s(310));an=e,e={memoizedState:an.memoizedState,baseState:an.baseState,baseQueue:an.baseQueue,queue:an.queue,next:null},wn===null?Ce.memoizedState=wn=e:wn=wn.next=e}return wn}function as(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function Br(e){var n=jr;return jr+=1,Ji===null&&(Ji=[]),e=zf(Ji,e,n),n=Ce,(wn===null?n.memoizedState:wn.next)===null&&(n=n.alternate,C.H=n===null||n.memoizedState===null?up:hc),e}function is(e){if(e!==null&&typeof e=="object"){if(typeof e.then=="function")return Br(e);if(e.$$typeof===q)return Un(e)}throw Error(s(438,String(e)))}function ac(e){var n=null,t=Ce.updateQueue;if(t!==null&&(n=t.memoCache),n==null){var i=Ce.alternate;i!==null&&(i=i.updateQueue,i!==null&&(i=i.memoCache,i!=null&&(n={data:i.data.map(function(o){return o.slice()}),index:0})))}if(n==null&&(n={data:[],index:0}),t===null&&(t=as(),Ce.updateQueue=t),t.memoCache=n,t=n.data[n.index],t===void 0)for(t=n.data[n.index]=Array(e),i=0;i<e;i++)t[i]=ue;return n.index++,t}function la(e,n){return typeof n=="function"?n(e):n}function rs(e){var n=Tn();return ic(n,an,e)}function ic(e,n,t){var i=e.queue;if(i===null)throw Error(s(311));i.lastRenderedReducer=t;var o=e.baseQueue,c=i.pending;if(c!==null){if(o!==null){var m=o.next;o.next=c.next,c.next=m}n.baseQueue=o=c,i.pending=null}if(c=e.baseState,o===null)e.memoizedState=c;else{n=o.next;var z=m=null,D=null,M=n,B=!1;do{var Y=M.lane&-536870913;if(Y!==M.lane?(Be&Y)===Y:(ra&Y)===Y){var W=M.revertLane;if(W===0)D!==null&&(D=D.next={lane:0,revertLane:0,gesture:null,action:M.action,hasEagerState:M.hasEagerState,eagerState:M.eagerState,next:null}),Y===qi&&(B=!0);else if((ra&W)===W){M=M.next,W===qi&&(B=!0);continue}else Y={lane:0,revertLane:M.revertLane,gesture:null,action:M.action,hasEagerState:M.hasEagerState,eagerState:M.eagerState,next:null},D===null?(z=D=Y,m=c):D=D.next=Y,Ce.lanes|=W,Pa|=W;Y=M.action,Si&&t(c,Y),c=M.hasEagerState?M.eagerState:t(c,Y)}else W={lane:Y,revertLane:M.revertLane,gesture:M.gesture,action:M.action,hasEagerState:M.hasEagerState,eagerState:M.eagerState,next:null},D===null?(z=D=W,m=c):D=D.next=W,Ce.lanes|=Y,Pa|=Y;M=M.next}while(M!==null&&M!==n);if(D===null?m=c:D.next=z,!st(c,e.memoizedState)&&(Rn=!0,B&&(t=Yi,t!==null)))throw t;e.memoizedState=c,e.baseState=m,e.baseQueue=D,i.lastRenderedState=c}return o===null&&(i.lanes=0),[e.memoizedState,i.dispatch]}function rc(e){var n=Tn(),t=n.queue;if(t===null)throw Error(s(311));t.lastRenderedReducer=e;var i=t.dispatch,o=t.pending,c=n.memoizedState;if(o!==null){t.pending=null;var m=o=o.next;do c=e(c,m.action),m=m.next;while(m!==o);st(c,n.memoizedState)||(Rn=!0),n.memoizedState=c,n.baseQueue===null&&(n.baseState=c),t.lastRenderedState=c}return[c,i]}function If(e,n,t){var i=Ce,o=Tn(),c=Ze;if(c){if(t===void 0)throw Error(s(407));t=t()}else t=n();var m=!st((an||o).memoizedState,t);if(m&&(o.memoizedState=t,Rn=!0),o=o.queue,oc(Cf.bind(null,i,o,e),[e]),o.getSnapshot!==n||m||wn!==null&&wn.memoizedState.tag&1){if(i.flags|=2048,$i(9,{destroy:void 0},Mf.bind(null,i,o,t,n),null),sn===null)throw Error(s(349));c||(ra&127)!==0||_f(i,n,t)}return t}function _f(e,n,t){e.flags|=16384,e={getSnapshot:n,value:t},n=Ce.updateQueue,n===null?(n=as(),Ce.updateQueue=n,n.stores=[e]):(t=n.stores,t===null?n.stores=[e]:t.push(e))}function Mf(e,n,t,i){n.value=t,n.getSnapshot=i,Lf(n)&&Wf(e)}function Cf(e,n,t){return t(function(){Lf(n)&&Wf(e)})}function Lf(e){var n=e.getSnapshot;e=e.value;try{var t=n();return!st(e,t)}catch{return!0}}function Wf(e){var n=di(e,2);n!==null&&nt(n,e,2)}function lc(e){var n=Vn();if(typeof e=="function"){var t=e;if(e=t(),Si){On(!0);try{t()}finally{On(!1)}}}return n.memoizedState=n.baseState=e,n.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:la,lastRenderedState:e},n}function Of(e,n,t,i){return e.baseState=t,ic(e,an,typeof i=="function"?i:la)}function Ty(e,n,t,i,o){if(os(e))throw Error(s(485));if(e=n.action,e!==null){var c={payload:o,action:e,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(m){c.listeners.push(m)}};C.T!==null?t(!0):c.isTransition=!1,i(c),t=n.pending,t===null?(c.next=n.pending=c,Pf(n,c)):(c.next=t.next,n.pending=t.next=c)}}function Pf(e,n){var t=n.action,i=n.payload,o=e.state;if(n.isTransition){var c=C.T,m={};C.T=m;try{var z=t(o,i),D=C.S;D!==null&&D(m,z),Nf(e,n,z)}catch(M){sc(e,n,M)}finally{c!==null&&m.types!==null&&(c.types=m.types),C.T=c}}else try{c=t(o,i),Nf(e,n,c)}catch(M){sc(e,n,M)}}function Nf(e,n,t){t!==null&&typeof t=="object"&&typeof t.then=="function"?t.then(function(i){Uf(e,n,i)},function(i){return sc(e,n,i)}):Uf(e,n,t)}function Uf(e,n,t){n.status="fulfilled",n.value=t,jf(n),e.state=t,n=e.pending,n!==null&&(t=n.next,t===n?e.pending=null:(t=t.next,n.next=t,Pf(e,t)))}function sc(e,n,t){var i=e.pending;if(e.pending=null,i!==null){i=i.next;do n.status="rejected",n.reason=t,jf(n),n=n.next;while(n!==i)}e.action=null}function jf(e){e=e.listeners;for(var n=0;n<e.length;n++)(0,e[n])()}function Bf(e,n){return n}function Xf(e,n){if(Ze){var t=sn.formState;if(t!==null){e:{var i=Ce;if(Ze){if(pn){n:{for(var o=pn,c=At;o.nodeType!==8;){if(!c){o=null;break n}if(o=Rt(o.nextSibling),o===null){o=null;break n}}c=o.data,o=c==="F!"||c==="F"?o:null}if(o){pn=Rt(o.nextSibling),i=o.data==="F!";break e}}Ra(i)}i=!1}i&&(n=t[0])}}return t=Vn(),t.memoizedState=t.baseState=n,i={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Bf,lastRenderedState:n},t.queue=i,t=sp.bind(null,Ce,i),i.dispatch=t,i=lc(!1),c=pc.bind(null,Ce,!1,i.queue),i=Vn(),o={state:n,dispatch:null,action:e,pending:null},i.queue=o,t=Ty.bind(null,Ce,o,c,t),o.dispatch=t,i.memoizedState=e,[n,t,!1]}function Zf(e){var n=Tn();return Hf(n,an,e)}function Hf(e,n,t){if(n=ic(e,n,Bf)[0],e=rs(la)[0],typeof n=="object"&&n!==null&&typeof n.then=="function")try{var i=Br(n)}catch(m){throw m===Gi?Ql:m}else i=n;n=Tn();var o=n.queue,c=o.dispatch;return t!==n.memoizedState&&(Ce.flags|=2048,$i(9,{destroy:void 0},Ay.bind(null,o,t),null)),[i,c,e]}function Ay(e,n){e.action=n}function Vf(e){var n=Tn(),t=an;if(t!==null)return Hf(n,t,e);Tn(),n=n.memoizedState,t=Tn();var i=t.queue.dispatch;return t.memoizedState=e,[n,i,!1]}function $i(e,n,t,i){return e={tag:e,create:t,deps:i,inst:n,next:null},n=Ce.updateQueue,n===null&&(n=as(),Ce.updateQueue=n),t=n.lastEffect,t===null?n.lastEffect=e.next=e:(i=t.next,t.next=e,e.next=i,n.lastEffect=e),e}function qf(){return Tn().memoizedState}function ls(e,n,t,i){var o=Vn();Ce.flags|=e,o.memoizedState=$i(1|n,{destroy:void 0},t,i===void 0?null:i)}function ss(e,n,t,i){var o=Tn();i=i===void 0?null:i;var c=o.memoizedState.inst;an!==null&&i!==null&&Jo(i,an.memoizedState.deps)?o.memoizedState=$i(n,c,t,i):(Ce.flags|=e,o.memoizedState=$i(1|n,c,t,i))}function Yf(e,n){ls(8390656,8,e,n)}function oc(e,n){ss(2048,8,e,n)}function wy(e){Ce.flags|=4;var n=Ce.updateQueue;if(n===null)n=as(),Ce.updateQueue=n,n.events=[e];else{var t=n.events;t===null?n.events=[e]:t.push(e)}}function Gf(e){var n=Tn().memoizedState;return wy({ref:n,nextImpl:e}),function(){if((Ge&2)!==0)throw Error(s(440));return n.impl.apply(void 0,arguments)}}function Qf(e,n){return ss(4,2,e,n)}function Ff(e,n){return ss(4,4,e,n)}function Kf(e,n){if(typeof n=="function"){e=e();var t=n(e);return function(){typeof t=="function"?t():n(null)}}if(n!=null)return e=e(),n.current=e,function(){n.current=null}}function Jf(e,n,t){t=t!=null?t.concat([e]):null,ss(4,4,Kf.bind(null,n,e),t)}function cc(){}function $f(e,n){var t=Tn();n=n===void 0?null:n;var i=t.memoizedState;return n!==null&&Jo(n,i[1])?i[0]:(t.memoizedState=[e,n],e)}function ep(e,n){var t=Tn();n=n===void 0?null:n;var i=t.memoizedState;if(n!==null&&Jo(n,i[1]))return i[0];if(i=e(),Si){On(!0);try{e()}finally{On(!1)}}return t.memoizedState=[i,n],i}function uc(e,n,t){return t===void 0||(ra&1073741824)!==0&&(Be&261930)===0?e.memoizedState=n:(e.memoizedState=t,e=nh(),Ce.lanes|=e,Pa|=e,t)}function np(e,n,t,i){return st(t,n)?t:Fi.current!==null?(e=uc(e,t,i),st(e,n)||(Rn=!0),e):(ra&42)===0||(ra&1073741824)!==0&&(Be&261930)===0?(Rn=!0,e.memoizedState=t):(e=nh(),Ce.lanes|=e,Pa|=e,n)}function tp(e,n,t,i,o){var c=K.p;K.p=c!==0&&8>c?c:8;var m=C.T,z={};C.T=z,pc(e,!1,n,t);try{var D=o(),M=C.S;if(M!==null&&M(z,D),D!==null&&typeof D=="object"&&typeof D.then=="function"){var B=Ey(D,i);Xr(e,n,B,pt(e))}else Xr(e,n,i,pt(e))}catch(Y){Xr(e,n,{then:function(){},status:"rejected",reason:Y},pt())}finally{K.p=c,m!==null&&z.types!==null&&(m.types=z.types),C.T=m}}function Ry(){}function dc(e,n,t,i){if(e.tag!==5)throw Error(s(476));var o=ap(e).queue;tp(e,o,n,le,t===null?Ry:function(){return ip(e),t(i)})}function ap(e){var n=e.memoizedState;if(n!==null)return n;n={memoizedState:le,baseState:le,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:la,lastRenderedState:le},next:null};var t={};return n.next={memoizedState:t,baseState:t,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:la,lastRenderedState:t},next:null},e.memoizedState=n,e=e.alternate,e!==null&&(e.memoizedState=n),n}function ip(e){var n=ap(e);n.next===null&&(n=e.alternate.memoizedState),Xr(e,n.next.queue,{},pt())}function fc(){return Un(rl)}function rp(){return Tn().memoizedState}function lp(){return Tn().memoizedState}function ky(e){for(var n=e.return;n!==null;){switch(n.tag){case 24:case 3:var t=pt();e=_a(t);var i=Ma(n,e,t);i!==null&&(nt(i,n,t),Pr(i,n,t)),n={cache:Bo()},e.payload=n;return}n=n.return}}function Iy(e,n,t){var i=pt();t={lane:i,revertLane:0,gesture:null,action:t,hasEagerState:!1,eagerState:null,next:null},os(e)?op(n,t):(t=Io(e,n,t,i),t!==null&&(nt(t,e,i),cp(t,n,i)))}function sp(e,n,t){var i=pt();Xr(e,n,t,i)}function Xr(e,n,t,i){var o={lane:i,revertLane:0,gesture:null,action:t,hasEagerState:!1,eagerState:null,next:null};if(os(e))op(n,o);else{var c=e.alternate;if(e.lanes===0&&(c===null||c.lanes===0)&&(c=n.lastRenderedReducer,c!==null))try{var m=n.lastRenderedState,z=c(m,t);if(o.hasEagerState=!0,o.eagerState=z,st(z,m))return Xl(e,n,o,0),sn===null&&Bl(),!1}catch{}if(t=Io(e,n,o,i),t!==null)return nt(t,e,i),cp(t,n,i),!0}return!1}function pc(e,n,t,i){if(i={lane:2,revertLane:Vc(),gesture:null,action:i,hasEagerState:!1,eagerState:null,next:null},os(e)){if(n)throw Error(s(479))}else n=Io(e,t,i,2),n!==null&&nt(n,e,2)}function os(e){var n=e.alternate;return e===Ce||n!==null&&n===Ce}function op(e,n){Ki=ns=!0;var t=e.pending;t===null?n.next=n:(n.next=t.next,t.next=n),e.pending=n}function cp(e,n,t){if((t&4194048)!==0){var i=n.lanes;i&=e.pendingLanes,t|=i,n.lanes=t,I(e,t)}}var Zr={readContext:Un,use:is,useCallback:vn,useContext:vn,useEffect:vn,useImperativeHandle:vn,useLayoutEffect:vn,useInsertionEffect:vn,useMemo:vn,useReducer:vn,useRef:vn,useState:vn,useDebugValue:vn,useDeferredValue:vn,useTransition:vn,useSyncExternalStore:vn,useId:vn,useHostTransitionStatus:vn,useFormState:vn,useActionState:vn,useOptimistic:vn,useMemoCache:vn,useCacheRefresh:vn};Zr.useEffectEvent=vn;var up={readContext:Un,use:is,useCallback:function(e,n){return Vn().memoizedState=[e,n===void 0?null:n],e},useContext:Un,useEffect:Yf,useImperativeHandle:function(e,n,t){t=t!=null?t.concat([e]):null,ls(4194308,4,Kf.bind(null,n,e),t)},useLayoutEffect:function(e,n){return ls(4194308,4,e,n)},useInsertionEffect:function(e,n){ls(4,2,e,n)},useMemo:function(e,n){var t=Vn();n=n===void 0?null:n;var i=e();if(Si){On(!0);try{e()}finally{On(!1)}}return t.memoizedState=[i,n],i},useReducer:function(e,n,t){var i=Vn();if(t!==void 0){var o=t(n);if(Si){On(!0);try{t(n)}finally{On(!1)}}}else o=n;return i.memoizedState=i.baseState=o,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:o},i.queue=e,e=e.dispatch=Iy.bind(null,Ce,e),[i.memoizedState,e]},useRef:function(e){var n=Vn();return e={current:e},n.memoizedState=e},useState:function(e){e=lc(e);var n=e.queue,t=sp.bind(null,Ce,n);return n.dispatch=t,[e.memoizedState,t]},useDebugValue:cc,useDeferredValue:function(e,n){var t=Vn();return uc(t,e,n)},useTransition:function(){var e=lc(!1);return e=tp.bind(null,Ce,e.queue,!0,!1),Vn().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,n,t){var i=Ce,o=Vn();if(Ze){if(t===void 0)throw Error(s(407));t=t()}else{if(t=n(),sn===null)throw Error(s(349));(Be&127)!==0||_f(i,n,t)}o.memoizedState=t;var c={value:t,getSnapshot:n};return o.queue=c,Yf(Cf.bind(null,i,c,e),[e]),i.flags|=2048,$i(9,{destroy:void 0},Mf.bind(null,i,c,t,n),null),t},useId:function(){var e=Vn(),n=sn.identifierPrefix;if(Ze){var t=Zt,i=Xt;t=(i&~(1<<32-Ke(i)-1)).toString(32)+t,n="_"+n+"R_"+t,t=ts++,0<t&&(n+="H"+t.toString(32)),n+="_"}else t=xy++,n="_"+n+"r_"+t.toString(32)+"_";return e.memoizedState=n},useHostTransitionStatus:fc,useFormState:Xf,useActionState:Xf,useOptimistic:function(e){var n=Vn();n.memoizedState=n.baseState=e;var t={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return n.queue=t,n=pc.bind(null,Ce,!0,t),t.dispatch=n,[e,n]},useMemoCache:ac,useCacheRefresh:function(){return Vn().memoizedState=ky.bind(null,Ce)},useEffectEvent:function(e){var n=Vn(),t={impl:e};return n.memoizedState=t,function(){if((Ge&2)!==0)throw Error(s(440));return t.impl.apply(void 0,arguments)}}},hc={readContext:Un,use:is,useCallback:$f,useContext:Un,useEffect:oc,useImperativeHandle:Jf,useInsertionEffect:Qf,useLayoutEffect:Ff,useMemo:ep,useReducer:rs,useRef:qf,useState:function(){return rs(la)},useDebugValue:cc,useDeferredValue:function(e,n){var t=Tn();return np(t,an.memoizedState,e,n)},useTransition:function(){var e=rs(la)[0],n=Tn().memoizedState;return[typeof e=="boolean"?e:Br(e),n]},useSyncExternalStore:If,useId:rp,useHostTransitionStatus:fc,useFormState:Zf,useActionState:Zf,useOptimistic:function(e,n){var t=Tn();return Of(t,an,e,n)},useMemoCache:ac,useCacheRefresh:lp};hc.useEffectEvent=Gf;var dp={readContext:Un,use:is,useCallback:$f,useContext:Un,useEffect:oc,useImperativeHandle:Jf,useInsertionEffect:Qf,useLayoutEffect:Ff,useMemo:ep,useReducer:rc,useRef:qf,useState:function(){return rc(la)},useDebugValue:cc,useDeferredValue:function(e,n){var t=Tn();return an===null?uc(t,e,n):np(t,an.memoizedState,e,n)},useTransition:function(){var e=rc(la)[0],n=Tn().memoizedState;return[typeof e=="boolean"?e:Br(e),n]},useSyncExternalStore:If,useId:rp,useHostTransitionStatus:fc,useFormState:Vf,useActionState:Vf,useOptimistic:function(e,n){var t=Tn();return an!==null?Of(t,an,e,n):(t.baseState=e,[e,t.queue.dispatch])},useMemoCache:ac,useCacheRefresh:lp};dp.useEffectEvent=Gf;function mc(e,n,t,i){n=e.memoizedState,t=t(i,n),t=t==null?n:y({},n,t),e.memoizedState=t,e.lanes===0&&(e.updateQueue.baseState=t)}var gc={enqueueSetState:function(e,n,t){e=e._reactInternals;var i=pt(),o=_a(i);o.payload=n,t!=null&&(o.callback=t),n=Ma(e,o,i),n!==null&&(nt(n,e,i),Pr(n,e,i))},enqueueReplaceState:function(e,n,t){e=e._reactInternals;var i=pt(),o=_a(i);o.tag=1,o.payload=n,t!=null&&(o.callback=t),n=Ma(e,o,i),n!==null&&(nt(n,e,i),Pr(n,e,i))},enqueueForceUpdate:function(e,n){e=e._reactInternals;var t=pt(),i=_a(t);i.tag=2,n!=null&&(i.callback=n),n=Ma(e,i,t),n!==null&&(nt(n,e,t),Pr(n,e,t))}};function fp(e,n,t,i,o,c,m){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(i,c,m):n.prototype&&n.prototype.isPureReactComponent?!kr(t,i)||!kr(o,c):!0}function pp(e,n,t,i){e=n.state,typeof n.componentWillReceiveProps=="function"&&n.componentWillReceiveProps(t,i),typeof n.UNSAFE_componentWillReceiveProps=="function"&&n.UNSAFE_componentWillReceiveProps(t,i),n.state!==e&&gc.enqueueReplaceState(n,n.state,null)}function vi(e,n){var t=n;if("ref"in n){t={};for(var i in n)i!=="ref"&&(t[i]=n[i])}if(e=e.defaultProps){t===n&&(t=y({},t));for(var o in e)t[o]===void 0&&(t[o]=e[o])}return t}function hp(e){jl(e)}function mp(e){console.error(e)}function gp(e){jl(e)}function cs(e,n){try{var t=e.onUncaughtError;t(n.value,{componentStack:n.stack})}catch(i){setTimeout(function(){throw i})}}function bp(e,n,t){try{var i=e.onCaughtError;i(t.value,{componentStack:t.stack,errorBoundary:n.tag===1?n.stateNode:null})}catch(o){setTimeout(function(){throw o})}}function bc(e,n,t){return t=_a(t),t.tag=3,t.payload={element:null},t.callback=function(){cs(e,n)},t}function yp(e){return e=_a(e),e.tag=3,e}function zp(e,n,t,i){var o=t.type.getDerivedStateFromError;if(typeof o=="function"){var c=i.value;e.payload=function(){return o(c)},e.callback=function(){bp(n,t,i)}}var m=t.stateNode;m!==null&&typeof m.componentDidCatch=="function"&&(e.callback=function(){bp(n,t,i),typeof o!="function"&&(Na===null?Na=new Set([this]):Na.add(this));var z=i.stack;this.componentDidCatch(i.value,{componentStack:z!==null?z:""})})}function _y(e,n,t,i,o){if(t.flags|=32768,i!==null&&typeof i=="object"&&typeof i.then=="function"){if(n=t.alternate,n!==null&&Vi(n,t,o,!0),t=ct.current,t!==null){switch(t.tag){case 31:case 13:return wt===null?vs():t.alternate===null&&En===0&&(En=3),t.flags&=-257,t.flags|=65536,t.lanes=o,i===Fl?t.flags|=16384:(n=t.updateQueue,n===null?t.updateQueue=new Set([i]):n.add(i),Xc(e,i,o)),!1;case 22:return t.flags|=65536,i===Fl?t.flags|=16384:(n=t.updateQueue,n===null?(n={transitions:null,markerInstances:null,retryQueue:new Set([i])},t.updateQueue=n):(t=n.retryQueue,t===null?n.retryQueue=new Set([i]):t.add(i)),Xc(e,i,o)),!1}throw Error(s(435,t.tag))}return Xc(e,i,o),vs(),!1}if(Ze)return n=ct.current,n!==null?((n.flags&65536)===0&&(n.flags|=256),n.flags|=65536,n.lanes=o,i!==Oo&&(e=Error(s(422),{cause:i}),Mr(xt(e,t)))):(i!==Oo&&(n=Error(s(423),{cause:i}),Mr(xt(n,t))),e=e.current.alternate,e.flags|=65536,o&=-o,e.lanes|=o,i=xt(i,t),o=bc(e.stateNode,i,o),Yo(e,o),En!==4&&(En=2)),!1;var c=Error(s(520),{cause:i});if(c=xt(c,t),Kr===null?Kr=[c]:Kr.push(c),En!==4&&(En=2),n===null)return!0;i=xt(i,t),t=n;do{switch(t.tag){case 3:return t.flags|=65536,e=o&-o,t.lanes|=e,e=bc(t.stateNode,i,e),Yo(t,e),!1;case 1:if(n=t.type,c=t.stateNode,(t.flags&128)===0&&(typeof n.getDerivedStateFromError=="function"||c!==null&&typeof c.componentDidCatch=="function"&&(Na===null||!Na.has(c))))return t.flags|=65536,o&=-o,t.lanes|=o,o=yp(o),zp(o,e,t,i),Yo(t,o),!1}t=t.return}while(t!==null);return!1}var yc=Error(s(461)),Rn=!1;function jn(e,n,t,i){n.child=e===null?xf(n,null,t,i):zi(n,e.child,t,i)}function Sp(e,n,t,i,o){t=t.render;var c=n.ref;if("ref"in i){var m={};for(var z in i)z!=="ref"&&(m[z]=i[z])}else m=i;return mi(n),i=$o(e,n,t,m,c,o),z=ec(),e!==null&&!Rn?(nc(e,n,o),sa(e,n,o)):(Ze&&z&&Lo(n),n.flags|=1,jn(e,n,i,o),n.child)}function vp(e,n,t,i,o){if(e===null){var c=t.type;return typeof c=="function"&&!_o(c)&&c.defaultProps===void 0&&t.compare===null?(n.tag=15,n.type=c,Ep(e,n,c,i,o)):(e=Hl(t.type,null,i,n,n.mode,o),e.ref=n.ref,e.return=n,n.child=e)}if(c=e.child,!Ac(e,o)){var m=c.memoizedProps;if(t=t.compare,t=t!==null?t:kr,t(m,i)&&e.ref===n.ref)return sa(e,n,o)}return n.flags|=1,e=na(c,i),e.ref=n.ref,e.return=n,n.child=e}function Ep(e,n,t,i,o){if(e!==null){var c=e.memoizedProps;if(kr(c,i)&&e.ref===n.ref)if(Rn=!1,n.pendingProps=i=c,Ac(e,o))(e.flags&131072)!==0&&(Rn=!0);else return n.lanes=e.lanes,sa(e,n,o)}return zc(e,n,t,i,o)}function xp(e,n,t,i){var o=i.children,c=e!==null?e.memoizedState:null;if(e===null&&n.stateNode===null&&(n.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),i.mode==="hidden"){if((n.flags&128)!==0){if(c=c!==null?c.baseLanes|t:t,e!==null){for(i=n.child=e.child,o=0;i!==null;)o=o|i.lanes|i.childLanes,i=i.sibling;i=o&~c}else i=0,n.child=null;return Dp(e,n,c,t,i)}if((t&536870912)!==0)n.memoizedState={baseLanes:0,cachePool:null},e!==null&&Gl(n,c!==null?c.cachePool:null),c!==null?Af(n,c):Qo(),wf(n);else return i=n.lanes=536870912,Dp(e,n,c!==null?c.baseLanes|t:t,t,i)}else c!==null?(Gl(n,c.cachePool),Af(n,c),La(),n.memoizedState=null):(e!==null&&Gl(n,null),Qo(),La());return jn(e,n,o,t),n.child}function Hr(e,n){return e!==null&&e.tag===22||n.stateNode!==null||(n.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),n.sibling}function Dp(e,n,t,i,o){var c=Zo();return c=c===null?null:{parent:An._currentValue,pool:c},n.memoizedState={baseLanes:t,cachePool:c},e!==null&&Gl(n,null),Qo(),wf(n),e!==null&&Vi(e,n,i,!0),n.childLanes=o,null}function us(e,n){return n=fs({mode:n.mode,children:n.children},e.mode),n.ref=e.ref,e.child=n,n.return=e,n}function Tp(e,n,t){return zi(n,e.child,null,t),e=us(n,n.pendingProps),e.flags|=2,ut(n),n.memoizedState=null,e}function My(e,n,t){var i=n.pendingProps,o=(n.flags&128)!==0;if(n.flags&=-129,e===null){if(Ze){if(i.mode==="hidden")return e=us(n,i),n.lanes=536870912,Hr(null,e);if(Ko(n),(e=pn)?(e=Ph(e,At),e=e!==null&&e.data==="&"?e:null,e!==null&&(n.memoizedState={dehydrated:e,treeContext:Aa!==null?{id:Xt,overflow:Zt}:null,retryLane:536870912,hydrationErrors:null},t=of(e),t.return=n,n.child=t,Nn=n,pn=null)):e=null,e===null)throw Ra(n);return n.lanes=536870912,null}return us(n,i)}var c=e.memoizedState;if(c!==null){var m=c.dehydrated;if(Ko(n),o)if(n.flags&256)n.flags&=-257,n=Tp(e,n,t);else if(n.memoizedState!==null)n.child=e.child,n.flags|=128,n=null;else throw Error(s(558));else if(Rn||Vi(e,n,t,!1),o=(t&e.childLanes)!==0,Rn||o){if(i=sn,i!==null&&(m=P(i,t),m!==0&&m!==c.retryLane))throw c.retryLane=m,di(e,m),nt(i,e,m),yc;vs(),n=Tp(e,n,t)}else e=c.treeContext,pn=Rt(m.nextSibling),Nn=n,Ze=!0,wa=null,At=!1,e!==null&&df(n,e),n=us(n,i),n.flags|=4096;return n}return e=na(e.child,{mode:i.mode,children:i.children}),e.ref=n.ref,n.child=e,e.return=n,e}function ds(e,n){var t=n.ref;if(t===null)e!==null&&e.ref!==null&&(n.flags|=4194816);else{if(typeof t!="function"&&typeof t!="object")throw Error(s(284));(e===null||e.ref!==t)&&(n.flags|=4194816)}}function zc(e,n,t,i,o){return mi(n),t=$o(e,n,t,i,void 0,o),i=ec(),e!==null&&!Rn?(nc(e,n,o),sa(e,n,o)):(Ze&&i&&Lo(n),n.flags|=1,jn(e,n,t,o),n.child)}function Ap(e,n,t,i,o,c){return mi(n),n.updateQueue=null,t=kf(n,i,t,o),Rf(e),i=ec(),e!==null&&!Rn?(nc(e,n,c),sa(e,n,c)):(Ze&&i&&Lo(n),n.flags|=1,jn(e,n,t,c),n.child)}function wp(e,n,t,i,o){if(mi(n),n.stateNode===null){var c=Bi,m=t.contextType;typeof m=="object"&&m!==null&&(c=Un(m)),c=new t(i,c),n.memoizedState=c.state!==null&&c.state!==void 0?c.state:null,c.updater=gc,n.stateNode=c,c._reactInternals=n,c=n.stateNode,c.props=i,c.state=n.memoizedState,c.refs={},Vo(n),m=t.contextType,c.context=typeof m=="object"&&m!==null?Un(m):Bi,c.state=n.memoizedState,m=t.getDerivedStateFromProps,typeof m=="function"&&(mc(n,t,m,i),c.state=n.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof c.getSnapshotBeforeUpdate=="function"||typeof c.UNSAFE_componentWillMount!="function"&&typeof c.componentWillMount!="function"||(m=c.state,typeof c.componentWillMount=="function"&&c.componentWillMount(),typeof c.UNSAFE_componentWillMount=="function"&&c.UNSAFE_componentWillMount(),m!==c.state&&gc.enqueueReplaceState(c,c.state,null),Ur(n,i,c,o),Nr(),c.state=n.memoizedState),typeof c.componentDidMount=="function"&&(n.flags|=4194308),i=!0}else if(e===null){c=n.stateNode;var z=n.memoizedProps,D=vi(t,z);c.props=D;var M=c.context,B=t.contextType;m=Bi,typeof B=="object"&&B!==null&&(m=Un(B));var Y=t.getDerivedStateFromProps;B=typeof Y=="function"||typeof c.getSnapshotBeforeUpdate=="function",z=n.pendingProps!==z,B||typeof c.UNSAFE_componentWillReceiveProps!="function"&&typeof c.componentWillReceiveProps!="function"||(z||M!==m)&&pp(n,c,i,m),Ia=!1;var W=n.memoizedState;c.state=W,Ur(n,i,c,o),Nr(),M=n.memoizedState,z||W!==M||Ia?(typeof Y=="function"&&(mc(n,t,Y,i),M=n.memoizedState),(D=Ia||fp(n,t,D,i,W,M,m))?(B||typeof c.UNSAFE_componentWillMount!="function"&&typeof c.componentWillMount!="function"||(typeof c.componentWillMount=="function"&&c.componentWillMount(),typeof c.UNSAFE_componentWillMount=="function"&&c.UNSAFE_componentWillMount()),typeof c.componentDidMount=="function"&&(n.flags|=4194308)):(typeof c.componentDidMount=="function"&&(n.flags|=4194308),n.memoizedProps=i,n.memoizedState=M),c.props=i,c.state=M,c.context=m,i=D):(typeof c.componentDidMount=="function"&&(n.flags|=4194308),i=!1)}else{c=n.stateNode,qo(e,n),m=n.memoizedProps,B=vi(t,m),c.props=B,Y=n.pendingProps,W=c.context,M=t.contextType,D=Bi,typeof M=="object"&&M!==null&&(D=Un(M)),z=t.getDerivedStateFromProps,(M=typeof z=="function"||typeof c.getSnapshotBeforeUpdate=="function")||typeof c.UNSAFE_componentWillReceiveProps!="function"&&typeof c.componentWillReceiveProps!="function"||(m!==Y||W!==D)&&pp(n,c,i,D),Ia=!1,W=n.memoizedState,c.state=W,Ur(n,i,c,o),Nr();var N=n.memoizedState;m!==Y||W!==N||Ia||e!==null&&e.dependencies!==null&&ql(e.dependencies)?(typeof z=="function"&&(mc(n,t,z,i),N=n.memoizedState),(B=Ia||fp(n,t,B,i,W,N,D)||e!==null&&e.dependencies!==null&&ql(e.dependencies))?(M||typeof c.UNSAFE_componentWillUpdate!="function"&&typeof c.componentWillUpdate!="function"||(typeof c.componentWillUpdate=="function"&&c.componentWillUpdate(i,N,D),typeof c.UNSAFE_componentWillUpdate=="function"&&c.UNSAFE_componentWillUpdate(i,N,D)),typeof c.componentDidUpdate=="function"&&(n.flags|=4),typeof c.getSnapshotBeforeUpdate=="function"&&(n.flags|=1024)):(typeof c.componentDidUpdate!="function"||m===e.memoizedProps&&W===e.memoizedState||(n.flags|=4),typeof c.getSnapshotBeforeUpdate!="function"||m===e.memoizedProps&&W===e.memoizedState||(n.flags|=1024),n.memoizedProps=i,n.memoizedState=N),c.props=i,c.state=N,c.context=D,i=B):(typeof c.componentDidUpdate!="function"||m===e.memoizedProps&&W===e.memoizedState||(n.flags|=4),typeof c.getSnapshotBeforeUpdate!="function"||m===e.memoizedProps&&W===e.memoizedState||(n.flags|=1024),i=!1)}return c=i,ds(e,n),i=(n.flags&128)!==0,c||i?(c=n.stateNode,t=i&&typeof t.getDerivedStateFromError!="function"?null:c.render(),n.flags|=1,e!==null&&i?(n.child=zi(n,e.child,null,o),n.child=zi(n,null,t,o)):jn(e,n,t,o),n.memoizedState=c.state,e=n.child):e=sa(e,n,o),e}function Rp(e,n,t,i){return pi(),n.flags|=256,jn(e,n,t,i),n.child}var Sc={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function vc(e){return{baseLanes:e,cachePool:bf()}}function Ec(e,n,t){return e=e!==null?e.childLanes&~t:0,n&&(e|=ft),e}function kp(e,n,t){var i=n.pendingProps,o=!1,c=(n.flags&128)!==0,m;if((m=c)||(m=e!==null&&e.memoizedState===null?!1:(Dn.current&2)!==0),m&&(o=!0,n.flags&=-129),m=(n.flags&32)!==0,n.flags&=-33,e===null){if(Ze){if(o?Ca(n):La(),(e=pn)?(e=Ph(e,At),e=e!==null&&e.data!=="&"?e:null,e!==null&&(n.memoizedState={dehydrated:e,treeContext:Aa!==null?{id:Xt,overflow:Zt}:null,retryLane:536870912,hydrationErrors:null},t=of(e),t.return=n,n.child=t,Nn=n,pn=null)):e=null,e===null)throw Ra(n);return iu(e)?n.lanes=32:n.lanes=536870912,null}var z=i.children;return i=i.fallback,o?(La(),o=n.mode,z=fs({mode:"hidden",children:z},o),i=fi(i,o,t,null),z.return=n,i.return=n,z.sibling=i,n.child=z,i=n.child,i.memoizedState=vc(t),i.childLanes=Ec(e,m,t),n.memoizedState=Sc,Hr(null,i)):(Ca(n),xc(n,z))}var D=e.memoizedState;if(D!==null&&(z=D.dehydrated,z!==null)){if(c)n.flags&256?(Ca(n),n.flags&=-257,n=Dc(e,n,t)):n.memoizedState!==null?(La(),n.child=e.child,n.flags|=128,n=null):(La(),z=i.fallback,o=n.mode,i=fs({mode:"visible",children:i.children},o),z=fi(z,o,t,null),z.flags|=2,i.return=n,z.return=n,i.sibling=z,n.child=i,zi(n,e.child,null,t),i=n.child,i.memoizedState=vc(t),i.childLanes=Ec(e,m,t),n.memoizedState=Sc,n=Hr(null,i));else if(Ca(n),iu(z)){if(m=z.nextSibling&&z.nextSibling.dataset,m)var M=m.dgst;m=M,i=Error(s(419)),i.stack="",i.digest=m,Mr({value:i,source:null,stack:null}),n=Dc(e,n,t)}else if(Rn||Vi(e,n,t,!1),m=(t&e.childLanes)!==0,Rn||m){if(m=sn,m!==null&&(i=P(m,t),i!==0&&i!==D.retryLane))throw D.retryLane=i,di(e,i),nt(m,e,i),yc;au(z)||vs(),n=Dc(e,n,t)}else au(z)?(n.flags|=192,n.child=e.child,n=null):(e=D.treeContext,pn=Rt(z.nextSibling),Nn=n,Ze=!0,wa=null,At=!1,e!==null&&df(n,e),n=xc(n,i.children),n.flags|=4096);return n}return o?(La(),z=i.fallback,o=n.mode,D=e.child,M=D.sibling,i=na(D,{mode:"hidden",children:i.children}),i.subtreeFlags=D.subtreeFlags&65011712,M!==null?z=na(M,z):(z=fi(z,o,t,null),z.flags|=2),z.return=n,i.return=n,i.sibling=z,n.child=i,Hr(null,i),i=n.child,z=e.child.memoizedState,z===null?z=vc(t):(o=z.cachePool,o!==null?(D=An._currentValue,o=o.parent!==D?{parent:D,pool:D}:o):o=bf(),z={baseLanes:z.baseLanes|t,cachePool:o}),i.memoizedState=z,i.childLanes=Ec(e,m,t),n.memoizedState=Sc,Hr(e.child,i)):(Ca(n),t=e.child,e=t.sibling,t=na(t,{mode:"visible",children:i.children}),t.return=n,t.sibling=null,e!==null&&(m=n.deletions,m===null?(n.deletions=[e],n.flags|=16):m.push(e)),n.child=t,n.memoizedState=null,t)}function xc(e,n){return n=fs({mode:"visible",children:n},e.mode),n.return=e,e.child=n}function fs(e,n){return e=ot(22,e,null,n),e.lanes=0,e}function Dc(e,n,t){return zi(n,e.child,null,t),e=xc(n,n.pendingProps.children),e.flags|=2,n.memoizedState=null,e}function Ip(e,n,t){e.lanes|=n;var i=e.alternate;i!==null&&(i.lanes|=n),Uo(e.return,n,t)}function Tc(e,n,t,i,o,c){var m=e.memoizedState;m===null?e.memoizedState={isBackwards:n,rendering:null,renderingStartTime:0,last:i,tail:t,tailMode:o,treeForkCount:c}:(m.isBackwards=n,m.rendering=null,m.renderingStartTime=0,m.last=i,m.tail=t,m.tailMode=o,m.treeForkCount=c)}function _p(e,n,t){var i=n.pendingProps,o=i.revealOrder,c=i.tail;i=i.children;var m=Dn.current,z=(m&2)!==0;if(z?(m=m&1|2,n.flags|=128):m&=1,E(Dn,m),jn(e,n,i,t),i=Ze?_r:0,!z&&e!==null&&(e.flags&128)!==0)e:for(e=n.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Ip(e,t,n);else if(e.tag===19)Ip(e,t,n);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===n)break e;for(;e.sibling===null;){if(e.return===null||e.return===n)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(o){case"forwards":for(t=n.child,o=null;t!==null;)e=t.alternate,e!==null&&es(e)===null&&(o=t),t=t.sibling;t=o,t===null?(o=n.child,n.child=null):(o=t.sibling,t.sibling=null),Tc(n,!1,o,t,c,i);break;case"backwards":case"unstable_legacy-backwards":for(t=null,o=n.child,n.child=null;o!==null;){if(e=o.alternate,e!==null&&es(e)===null){n.child=o;break}e=o.sibling,o.sibling=t,t=o,o=e}Tc(n,!0,t,null,c,i);break;case"together":Tc(n,!1,null,null,void 0,i);break;default:n.memoizedState=null}return n.child}function sa(e,n,t){if(e!==null&&(n.dependencies=e.dependencies),Pa|=n.lanes,(t&n.childLanes)===0)if(e!==null){if(Vi(e,n,t,!1),(t&n.childLanes)===0)return null}else return null;if(e!==null&&n.child!==e.child)throw Error(s(153));if(n.child!==null){for(e=n.child,t=na(e,e.pendingProps),n.child=t,t.return=n;e.sibling!==null;)e=e.sibling,t=t.sibling=na(e,e.pendingProps),t.return=n;t.sibling=null}return n.child}function Ac(e,n){return(e.lanes&n)!==0?!0:(e=e.dependencies,!!(e!==null&&ql(e)))}function Cy(e,n,t){switch(n.tag){case 3:Je(n,n.stateNode.containerInfo),ka(n,An,e.memoizedState.cache),pi();break;case 27:case 5:qn(n);break;case 4:Je(n,n.stateNode.containerInfo);break;case 10:ka(n,n.type,n.memoizedProps.value);break;case 31:if(n.memoizedState!==null)return n.flags|=128,Ko(n),null;break;case 13:var i=n.memoizedState;if(i!==null)return i.dehydrated!==null?(Ca(n),n.flags|=128,null):(t&n.child.childLanes)!==0?kp(e,n,t):(Ca(n),e=sa(e,n,t),e!==null?e.sibling:null);Ca(n);break;case 19:var o=(e.flags&128)!==0;if(i=(t&n.childLanes)!==0,i||(Vi(e,n,t,!1),i=(t&n.childLanes)!==0),o){if(i)return _p(e,n,t);n.flags|=128}if(o=n.memoizedState,o!==null&&(o.rendering=null,o.tail=null,o.lastEffect=null),E(Dn,Dn.current),i)break;return null;case 22:return n.lanes=0,xp(e,n,t,n.pendingProps);case 24:ka(n,An,e.memoizedState.cache)}return sa(e,n,t)}function Mp(e,n,t){if(e!==null)if(e.memoizedProps!==n.pendingProps)Rn=!0;else{if(!Ac(e,t)&&(n.flags&128)===0)return Rn=!1,Cy(e,n,t);Rn=(e.flags&131072)!==0}else Rn=!1,Ze&&(n.flags&1048576)!==0&&uf(n,_r,n.index);switch(n.lanes=0,n.tag){case 16:e:{var i=n.pendingProps;if(e=bi(n.elementType),n.type=e,typeof e=="function")_o(e)?(i=vi(e,i),n.tag=1,n=wp(null,n,e,i,t)):(n.tag=0,n=zc(null,n,e,i,t));else{if(e!=null){var o=e.$$typeof;if(o===de){n.tag=11,n=Sp(null,n,e,i,t);break e}else if(o===R){n.tag=14,n=vp(null,n,e,i,t);break e}}throw n=fe(e)||e,Error(s(306,n,""))}}return n;case 0:return zc(e,n,n.type,n.pendingProps,t);case 1:return i=n.type,o=vi(i,n.pendingProps),wp(e,n,i,o,t);case 3:e:{if(Je(n,n.stateNode.containerInfo),e===null)throw Error(s(387));i=n.pendingProps;var c=n.memoizedState;o=c.element,qo(e,n),Ur(n,i,null,t);var m=n.memoizedState;if(i=m.cache,ka(n,An,i),i!==c.cache&&jo(n,[An],t,!0),Nr(),i=m.element,c.isDehydrated)if(c={element:i,isDehydrated:!1,cache:m.cache},n.updateQueue.baseState=c,n.memoizedState=c,n.flags&256){n=Rp(e,n,i,t);break e}else if(i!==o){o=xt(Error(s(424)),n),Mr(o),n=Rp(e,n,i,t);break e}else for(e=n.stateNode.containerInfo,e.nodeType===9?e=e.body:e=e.nodeName==="HTML"?e.ownerDocument.body:e,pn=Rt(e.firstChild),Nn=n,Ze=!0,wa=null,At=!0,t=xf(n,null,i,t),n.child=t;t;)t.flags=t.flags&-3|4096,t=t.sibling;else{if(pi(),i===o){n=sa(e,n,t);break e}jn(e,n,i,t)}n=n.child}return n;case 26:return ds(e,n),e===null?(t=Zh(n.type,null,n.pendingProps,null))?n.memoizedState=t:Ze||(t=n.type,e=n.pendingProps,i=Rs(be.current).createElement(t),i[ce]=n,i[oe]=e,Bn(i,t,e),Sn(i),n.stateNode=i):n.memoizedState=Zh(n.type,e.memoizedProps,n.pendingProps,e.memoizedState),null;case 27:return qn(n),e===null&&Ze&&(i=n.stateNode=jh(n.type,n.pendingProps,be.current),Nn=n,At=!0,o=pn,Xa(n.type)?(ru=o,pn=Rt(i.firstChild)):pn=o),jn(e,n,n.pendingProps.children,t),ds(e,n),e===null&&(n.flags|=4194304),n.child;case 5:return e===null&&Ze&&((o=i=pn)&&(i=cz(i,n.type,n.pendingProps,At),i!==null?(n.stateNode=i,Nn=n,pn=Rt(i.firstChild),At=!1,o=!0):o=!1),o||Ra(n)),qn(n),o=n.type,c=n.pendingProps,m=e!==null?e.memoizedProps:null,i=c.children,eu(o,c)?i=null:m!==null&&eu(o,m)&&(n.flags|=32),n.memoizedState!==null&&(o=$o(e,n,Dy,null,null,t),rl._currentValue=o),ds(e,n),jn(e,n,i,t),n.child;case 6:return e===null&&Ze&&((e=t=pn)&&(t=uz(t,n.pendingProps,At),t!==null?(n.stateNode=t,Nn=n,pn=null,e=!0):e=!1),e||Ra(n)),null;case 13:return kp(e,n,t);case 4:return Je(n,n.stateNode.containerInfo),i=n.pendingProps,e===null?n.child=zi(n,null,i,t):jn(e,n,i,t),n.child;case 11:return Sp(e,n,n.type,n.pendingProps,t);case 7:return jn(e,n,n.pendingProps,t),n.child;case 8:return jn(e,n,n.pendingProps.children,t),n.child;case 12:return jn(e,n,n.pendingProps.children,t),n.child;case 10:return i=n.pendingProps,ka(n,n.type,i.value),jn(e,n,i.children,t),n.child;case 9:return o=n.type._context,i=n.pendingProps.children,mi(n),o=Un(o),i=i(o),n.flags|=1,jn(e,n,i,t),n.child;case 14:return vp(e,n,n.type,n.pendingProps,t);case 15:return Ep(e,n,n.type,n.pendingProps,t);case 19:return _p(e,n,t);case 31:return My(e,n,t);case 22:return xp(e,n,t,n.pendingProps);case 24:return mi(n),i=Un(An),e===null?(o=Zo(),o===null&&(o=sn,c=Bo(),o.pooledCache=c,c.refCount++,c!==null&&(o.pooledCacheLanes|=t),o=c),n.memoizedState={parent:i,cache:o},Vo(n),ka(n,An,o)):((e.lanes&t)!==0&&(qo(e,n),Ur(n,null,null,t),Nr()),o=e.memoizedState,c=n.memoizedState,o.parent!==i?(o={parent:i,cache:i},n.memoizedState=o,n.lanes===0&&(n.memoizedState=n.updateQueue.baseState=o),ka(n,An,i)):(i=c.cache,ka(n,An,i),i!==o.cache&&jo(n,[An],t,!0))),jn(e,n,n.pendingProps.children,t),n.child;case 29:throw n.pendingProps}throw Error(s(156,n.tag))}function oa(e){e.flags|=4}function wc(e,n,t,i,o){if((n=(e.mode&32)!==0)&&(n=!1),n){if(e.flags|=16777216,(o&335544128)===o)if(e.stateNode.complete)e.flags|=8192;else if(rh())e.flags|=8192;else throw yi=Fl,Ho}else e.flags&=-16777217}function Cp(e,n){if(n.type!=="stylesheet"||(n.state.loading&4)!==0)e.flags&=-16777217;else if(e.flags|=16777216,!Gh(n))if(rh())e.flags|=8192;else throw yi=Fl,Ho}function ps(e,n){n!==null&&(e.flags|=4),e.flags&16384&&(n=e.tag!==22?ri():536870912,e.lanes|=n,ar|=n)}function Vr(e,n){if(!Ze)switch(e.tailMode){case"hidden":n=e.tail;for(var t=null;n!==null;)n.alternate!==null&&(t=n),n=n.sibling;t===null?e.tail=null:t.sibling=null;break;case"collapsed":t=e.tail;for(var i=null;t!==null;)t.alternate!==null&&(i=t),t=t.sibling;i===null?n||e.tail===null?e.tail=null:e.tail.sibling=null:i.sibling=null}}function hn(e){var n=e.alternate!==null&&e.alternate.child===e.child,t=0,i=0;if(n)for(var o=e.child;o!==null;)t|=o.lanes|o.childLanes,i|=o.subtreeFlags&65011712,i|=o.flags&65011712,o.return=e,o=o.sibling;else for(o=e.child;o!==null;)t|=o.lanes|o.childLanes,i|=o.subtreeFlags,i|=o.flags,o.return=e,o=o.sibling;return e.subtreeFlags|=i,e.childLanes=t,n}function Ly(e,n,t){var i=n.pendingProps;switch(Wo(n),n.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return hn(n),null;case 1:return hn(n),null;case 3:return t=n.stateNode,i=null,e!==null&&(i=e.memoizedState.cache),n.memoizedState.cache!==i&&(n.flags|=2048),ia(An),Fe(),t.pendingContext&&(t.context=t.pendingContext,t.pendingContext=null),(e===null||e.child===null)&&(Hi(n)?oa(n):e===null||e.memoizedState.isDehydrated&&(n.flags&256)===0||(n.flags|=1024,Po())),hn(n),null;case 26:var o=n.type,c=n.memoizedState;return e===null?(oa(n),c!==null?(hn(n),Cp(n,c)):(hn(n),wc(n,o,null,i,t))):c?c!==e.memoizedState?(oa(n),hn(n),Cp(n,c)):(hn(n),n.flags&=-16777217):(e=e.memoizedProps,e!==i&&oa(n),hn(n),wc(n,o,e,i,t)),null;case 27:if(_t(n),t=be.current,o=n.type,e!==null&&n.stateNode!=null)e.memoizedProps!==i&&oa(n);else{if(!i){if(n.stateNode===null)throw Error(s(166));return hn(n),null}e=re.current,Hi(n)?ff(n):(e=jh(o,i,t),n.stateNode=e,oa(n))}return hn(n),null;case 5:if(_t(n),o=n.type,e!==null&&n.stateNode!=null)e.memoizedProps!==i&&oa(n);else{if(!i){if(n.stateNode===null)throw Error(s(166));return hn(n),null}if(c=re.current,Hi(n))ff(n);else{var m=Rs(be.current);switch(c){case 1:c=m.createElementNS("http://www.w3.org/2000/svg",o);break;case 2:c=m.createElementNS("http://www.w3.org/1998/Math/MathML",o);break;default:switch(o){case"svg":c=m.createElementNS("http://www.w3.org/2000/svg",o);break;case"math":c=m.createElementNS("http://www.w3.org/1998/Math/MathML",o);break;case"script":c=m.createElement("div"),c.innerHTML="<script><\/script>",c=c.removeChild(c.firstChild);break;case"select":c=typeof i.is=="string"?m.createElement("select",{is:i.is}):m.createElement("select"),i.multiple?c.multiple=!0:i.size&&(c.size=i.size);break;default:c=typeof i.is=="string"?m.createElement(o,{is:i.is}):m.createElement(o)}}c[ce]=n,c[oe]=i;e:for(m=n.child;m!==null;){if(m.tag===5||m.tag===6)c.appendChild(m.stateNode);else if(m.tag!==4&&m.tag!==27&&m.child!==null){m.child.return=m,m=m.child;continue}if(m===n)break e;for(;m.sibling===null;){if(m.return===null||m.return===n)break e;m=m.return}m.sibling.return=m.return,m=m.sibling}n.stateNode=c;e:switch(Bn(c,o,i),o){case"button":case"input":case"select":case"textarea":i=!!i.autoFocus;break e;case"img":i=!0;break e;default:i=!1}i&&oa(n)}}return hn(n),wc(n,n.type,e===null?null:e.memoizedProps,n.pendingProps,t),null;case 6:if(e&&n.stateNode!=null)e.memoizedProps!==i&&oa(n);else{if(typeof i!="string"&&n.stateNode===null)throw Error(s(166));if(e=be.current,Hi(n)){if(e=n.stateNode,t=n.memoizedProps,i=null,o=Nn,o!==null)switch(o.tag){case 27:case 5:i=o.memoizedProps}e[ce]=n,e=!!(e.nodeValue===t||i!==null&&i.suppressHydrationWarning===!0||kh(e.nodeValue,t)),e||Ra(n,!0)}else e=Rs(e).createTextNode(i),e[ce]=n,n.stateNode=e}return hn(n),null;case 31:if(t=n.memoizedState,e===null||e.memoizedState!==null){if(i=Hi(n),t!==null){if(e===null){if(!i)throw Error(s(318));if(e=n.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(s(557));e[ce]=n}else pi(),(n.flags&128)===0&&(n.memoizedState=null),n.flags|=4;hn(n),e=!1}else t=Po(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=t),e=!0;if(!e)return n.flags&256?(ut(n),n):(ut(n),null);if((n.flags&128)!==0)throw Error(s(558))}return hn(n),null;case 13:if(i=n.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(o=Hi(n),i!==null&&i.dehydrated!==null){if(e===null){if(!o)throw Error(s(318));if(o=n.memoizedState,o=o!==null?o.dehydrated:null,!o)throw Error(s(317));o[ce]=n}else pi(),(n.flags&128)===0&&(n.memoizedState=null),n.flags|=4;hn(n),o=!1}else o=Po(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=o),o=!0;if(!o)return n.flags&256?(ut(n),n):(ut(n),null)}return ut(n),(n.flags&128)!==0?(n.lanes=t,n):(t=i!==null,e=e!==null&&e.memoizedState!==null,t&&(i=n.child,o=null,i.alternate!==null&&i.alternate.memoizedState!==null&&i.alternate.memoizedState.cachePool!==null&&(o=i.alternate.memoizedState.cachePool.pool),c=null,i.memoizedState!==null&&i.memoizedState.cachePool!==null&&(c=i.memoizedState.cachePool.pool),c!==o&&(i.flags|=2048)),t!==e&&t&&(n.child.flags|=8192),ps(n,n.updateQueue),hn(n),null);case 4:return Fe(),e===null&&Qc(n.stateNode.containerInfo),hn(n),null;case 10:return ia(n.type),hn(n),null;case 19:if(j(Dn),i=n.memoizedState,i===null)return hn(n),null;if(o=(n.flags&128)!==0,c=i.rendering,c===null)if(o)Vr(i,!1);else{if(En!==0||e!==null&&(e.flags&128)!==0)for(e=n.child;e!==null;){if(c=es(e),c!==null){for(n.flags|=128,Vr(i,!1),e=c.updateQueue,n.updateQueue=e,ps(n,e),n.subtreeFlags=0,e=t,t=n.child;t!==null;)sf(t,e),t=t.sibling;return E(Dn,Dn.current&1|2),Ze&&ta(n,i.treeForkCount),n.child}e=e.sibling}i.tail!==null&&yn()>ys&&(n.flags|=128,o=!0,Vr(i,!1),n.lanes=4194304)}else{if(!o)if(e=es(c),e!==null){if(n.flags|=128,o=!0,e=e.updateQueue,n.updateQueue=e,ps(n,e),Vr(i,!0),i.tail===null&&i.tailMode==="hidden"&&!c.alternate&&!Ze)return hn(n),null}else 2*yn()-i.renderingStartTime>ys&&t!==536870912&&(n.flags|=128,o=!0,Vr(i,!1),n.lanes=4194304);i.isBackwards?(c.sibling=n.child,n.child=c):(e=i.last,e!==null?e.sibling=c:n.child=c,i.last=c)}return i.tail!==null?(e=i.tail,i.rendering=e,i.tail=e.sibling,i.renderingStartTime=yn(),e.sibling=null,t=Dn.current,E(Dn,o?t&1|2:t&1),Ze&&ta(n,i.treeForkCount),e):(hn(n),null);case 22:case 23:return ut(n),Fo(),i=n.memoizedState!==null,e!==null?e.memoizedState!==null!==i&&(n.flags|=8192):i&&(n.flags|=8192),i?(t&536870912)!==0&&(n.flags&128)===0&&(hn(n),n.subtreeFlags&6&&(n.flags|=8192)):hn(n),t=n.updateQueue,t!==null&&ps(n,t.retryQueue),t=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(t=e.memoizedState.cachePool.pool),i=null,n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(i=n.memoizedState.cachePool.pool),i!==t&&(n.flags|=2048),e!==null&&j(gi),null;case 24:return t=null,e!==null&&(t=e.memoizedState.cache),n.memoizedState.cache!==t&&(n.flags|=2048),ia(An),hn(n),null;case 25:return null;case 30:return null}throw Error(s(156,n.tag))}function Wy(e,n){switch(Wo(n),n.tag){case 1:return e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 3:return ia(An),Fe(),e=n.flags,(e&65536)!==0&&(e&128)===0?(n.flags=e&-65537|128,n):null;case 26:case 27:case 5:return _t(n),null;case 31:if(n.memoizedState!==null){if(ut(n),n.alternate===null)throw Error(s(340));pi()}return e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 13:if(ut(n),e=n.memoizedState,e!==null&&e.dehydrated!==null){if(n.alternate===null)throw Error(s(340));pi()}return e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 19:return j(Dn),null;case 4:return Fe(),null;case 10:return ia(n.type),null;case 22:case 23:return ut(n),Fo(),e!==null&&j(gi),e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 24:return ia(An),null;case 25:return null;default:return null}}function Lp(e,n){switch(Wo(n),n.tag){case 3:ia(An),Fe();break;case 26:case 27:case 5:_t(n);break;case 4:Fe();break;case 31:n.memoizedState!==null&&ut(n);break;case 13:ut(n);break;case 19:j(Dn);break;case 10:ia(n.type);break;case 22:case 23:ut(n),Fo(),e!==null&&j(gi);break;case 24:ia(An)}}function qr(e,n){try{var t=n.updateQueue,i=t!==null?t.lastEffect:null;if(i!==null){var o=i.next;t=o;do{if((t.tag&e)===e){i=void 0;var c=t.create,m=t.inst;i=c(),m.destroy=i}t=t.next}while(t!==o)}}catch(z){nn(n,n.return,z)}}function Wa(e,n,t){try{var i=n.updateQueue,o=i!==null?i.lastEffect:null;if(o!==null){var c=o.next;i=c;do{if((i.tag&e)===e){var m=i.inst,z=m.destroy;if(z!==void 0){m.destroy=void 0,o=n;var D=t,M=z;try{M()}catch(B){nn(o,D,B)}}}i=i.next}while(i!==c)}}catch(B){nn(n,n.return,B)}}function Wp(e){var n=e.updateQueue;if(n!==null){var t=e.stateNode;try{Tf(n,t)}catch(i){nn(e,e.return,i)}}}function Op(e,n,t){t.props=vi(e.type,e.memoizedProps),t.state=e.memoizedState;try{t.componentWillUnmount()}catch(i){nn(e,n,i)}}function Yr(e,n){try{var t=e.ref;if(t!==null){switch(e.tag){case 26:case 27:case 5:var i=e.stateNode;break;case 30:i=e.stateNode;break;default:i=e.stateNode}typeof t=="function"?e.refCleanup=t(i):t.current=i}}catch(o){nn(e,n,o)}}function Ht(e,n){var t=e.ref,i=e.refCleanup;if(t!==null)if(typeof i=="function")try{i()}catch(o){nn(e,n,o)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof t=="function")try{t(null)}catch(o){nn(e,n,o)}else t.current=null}function Pp(e){var n=e.type,t=e.memoizedProps,i=e.stateNode;try{e:switch(n){case"button":case"input":case"select":case"textarea":t.autoFocus&&i.focus();break e;case"img":t.src?i.src=t.src:t.srcSet&&(i.srcset=t.srcSet)}}catch(o){nn(e,e.return,o)}}function Rc(e,n,t){try{var i=e.stateNode;az(i,e.type,t,n),i[oe]=n}catch(o){nn(e,e.return,o)}}function Np(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&Xa(e.type)||e.tag===4}function kc(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||Np(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&Xa(e.type)||e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Ic(e,n,t){var i=e.tag;if(i===5||i===6)e=e.stateNode,n?(t.nodeType===9?t.body:t.nodeName==="HTML"?t.ownerDocument.body:t).insertBefore(e,n):(n=t.nodeType===9?t.body:t.nodeName==="HTML"?t.ownerDocument.body:t,n.appendChild(e),t=t._reactRootContainer,t!=null||n.onclick!==null||(n.onclick=$t));else if(i!==4&&(i===27&&Xa(e.type)&&(t=e.stateNode,n=null),e=e.child,e!==null))for(Ic(e,n,t),e=e.sibling;e!==null;)Ic(e,n,t),e=e.sibling}function hs(e,n,t){var i=e.tag;if(i===5||i===6)e=e.stateNode,n?t.insertBefore(e,n):t.appendChild(e);else if(i!==4&&(i===27&&Xa(e.type)&&(t=e.stateNode),e=e.child,e!==null))for(hs(e,n,t),e=e.sibling;e!==null;)hs(e,n,t),e=e.sibling}function Up(e){var n=e.stateNode,t=e.memoizedProps;try{for(var i=e.type,o=n.attributes;o.length;)n.removeAttributeNode(o[0]);Bn(n,i,t),n[ce]=e,n[oe]=t}catch(c){nn(e,e.return,c)}}var ca=!1,kn=!1,_c=!1,jp=typeof WeakSet=="function"?WeakSet:Set,Wn=null;function Oy(e,n){if(e=e.containerInfo,Jc=Ws,e=Kd(e),Do(e)){if("selectionStart"in e)var t={start:e.selectionStart,end:e.selectionEnd};else e:{t=(t=e.ownerDocument)&&t.defaultView||window;var i=t.getSelection&&t.getSelection();if(i&&i.rangeCount!==0){t=i.anchorNode;var o=i.anchorOffset,c=i.focusNode;i=i.focusOffset;try{t.nodeType,c.nodeType}catch{t=null;break e}var m=0,z=-1,D=-1,M=0,B=0,Y=e,W=null;n:for(;;){for(var N;Y!==t||o!==0&&Y.nodeType!==3||(z=m+o),Y!==c||i!==0&&Y.nodeType!==3||(D=m+i),Y.nodeType===3&&(m+=Y.nodeValue.length),(N=Y.firstChild)!==null;)W=Y,Y=N;for(;;){if(Y===e)break n;if(W===t&&++M===o&&(z=m),W===c&&++B===i&&(D=m),(N=Y.nextSibling)!==null)break;Y=W,W=Y.parentNode}Y=N}t=z===-1||D===-1?null:{start:z,end:D}}else t=null}t=t||{start:0,end:0}}else t=null;for($c={focusedElem:e,selectionRange:t},Ws=!1,Wn=n;Wn!==null;)if(n=Wn,e=n.child,(n.subtreeFlags&1028)!==0&&e!==null)e.return=n,Wn=e;else for(;Wn!==null;){switch(n=Wn,c=n.alternate,e=n.flags,n.tag){case 0:if((e&4)!==0&&(e=n.updateQueue,e=e!==null?e.events:null,e!==null))for(t=0;t<e.length;t++)o=e[t],o.ref.impl=o.nextImpl;break;case 11:case 15:break;case 1:if((e&1024)!==0&&c!==null){e=void 0,t=n,o=c.memoizedProps,c=c.memoizedState,i=t.stateNode;try{var me=vi(t.type,o);e=i.getSnapshotBeforeUpdate(me,c),i.__reactInternalSnapshotBeforeUpdate=e}catch(De){nn(t,t.return,De)}}break;case 3:if((e&1024)!==0){if(e=n.stateNode.containerInfo,t=e.nodeType,t===9)tu(e);else if(t===1)switch(e.nodeName){case"HEAD":case"HTML":case"BODY":tu(e);break;default:e.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((e&1024)!==0)throw Error(s(163))}if(e=n.sibling,e!==null){e.return=n.return,Wn=e;break}Wn=n.return}}function Bp(e,n,t){var i=t.flags;switch(t.tag){case 0:case 11:case 15:da(e,t),i&4&&qr(5,t);break;case 1:if(da(e,t),i&4)if(e=t.stateNode,n===null)try{e.componentDidMount()}catch(m){nn(t,t.return,m)}else{var o=vi(t.type,n.memoizedProps);n=n.memoizedState;try{e.componentDidUpdate(o,n,e.__reactInternalSnapshotBeforeUpdate)}catch(m){nn(t,t.return,m)}}i&64&&Wp(t),i&512&&Yr(t,t.return);break;case 3:if(da(e,t),i&64&&(e=t.updateQueue,e!==null)){if(n=null,t.child!==null)switch(t.child.tag){case 27:case 5:n=t.child.stateNode;break;case 1:n=t.child.stateNode}try{Tf(e,n)}catch(m){nn(t,t.return,m)}}break;case 27:n===null&&i&4&&Up(t);case 26:case 5:da(e,t),n===null&&i&4&&Pp(t),i&512&&Yr(t,t.return);break;case 12:da(e,t);break;case 31:da(e,t),i&4&&Hp(e,t);break;case 13:da(e,t),i&4&&Vp(e,t),i&64&&(e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(t=Vy.bind(null,t),dz(e,t))));break;case 22:if(i=t.memoizedState!==null||ca,!i){n=n!==null&&n.memoizedState!==null||kn,o=ca;var c=kn;ca=i,(kn=n)&&!c?fa(e,t,(t.subtreeFlags&8772)!==0):da(e,t),ca=o,kn=c}break;case 30:break;default:da(e,t)}}function Xp(e){var n=e.alternate;n!==null&&(e.alternate=null,Xp(n)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(n=e.stateNode,n!==null&&on(n)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var gn=null,Kn=!1;function ua(e,n,t){for(t=t.child;t!==null;)Zp(e,n,t),t=t.sibling}function Zp(e,n,t){if(zn&&typeof zn.onCommitFiberUnmount=="function")try{zn.onCommitFiberUnmount(mn,t)}catch{}switch(t.tag){case 26:kn||Ht(t,n),ua(e,n,t),t.memoizedState?t.memoizedState.count--:t.stateNode&&(t=t.stateNode,t.parentNode.removeChild(t));break;case 27:kn||Ht(t,n);var i=gn,o=Kn;Xa(t.type)&&(gn=t.stateNode,Kn=!1),ua(e,n,t),tl(t.stateNode),gn=i,Kn=o;break;case 5:kn||Ht(t,n);case 6:if(i=gn,o=Kn,gn=null,ua(e,n,t),gn=i,Kn=o,gn!==null)if(Kn)try{(gn.nodeType===9?gn.body:gn.nodeName==="HTML"?gn.ownerDocument.body:gn).removeChild(t.stateNode)}catch(c){nn(t,n,c)}else try{gn.removeChild(t.stateNode)}catch(c){nn(t,n,c)}break;case 18:gn!==null&&(Kn?(e=gn,Wh(e.nodeType===9?e.body:e.nodeName==="HTML"?e.ownerDocument.body:e,t.stateNode),dr(e)):Wh(gn,t.stateNode));break;case 4:i=gn,o=Kn,gn=t.stateNode.containerInfo,Kn=!0,ua(e,n,t),gn=i,Kn=o;break;case 0:case 11:case 14:case 15:Wa(2,t,n),kn||Wa(4,t,n),ua(e,n,t);break;case 1:kn||(Ht(t,n),i=t.stateNode,typeof i.componentWillUnmount=="function"&&Op(t,n,i)),ua(e,n,t);break;case 21:ua(e,n,t);break;case 22:kn=(i=kn)||t.memoizedState!==null,ua(e,n,t),kn=i;break;default:ua(e,n,t)}}function Hp(e,n){if(n.memoizedState===null&&(e=n.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{dr(e)}catch(t){nn(n,n.return,t)}}}function Vp(e,n){if(n.memoizedState===null&&(e=n.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{dr(e)}catch(t){nn(n,n.return,t)}}function Py(e){switch(e.tag){case 31:case 13:case 19:var n=e.stateNode;return n===null&&(n=e.stateNode=new jp),n;case 22:return e=e.stateNode,n=e._retryCache,n===null&&(n=e._retryCache=new jp),n;default:throw Error(s(435,e.tag))}}function ms(e,n){var t=Py(e);n.forEach(function(i){if(!t.has(i)){t.add(i);var o=qy.bind(null,e,i);i.then(o,o)}})}function Jn(e,n){var t=n.deletions;if(t!==null)for(var i=0;i<t.length;i++){var o=t[i],c=e,m=n,z=m;e:for(;z!==null;){switch(z.tag){case 27:if(Xa(z.type)){gn=z.stateNode,Kn=!1;break e}break;case 5:gn=z.stateNode,Kn=!1;break e;case 3:case 4:gn=z.stateNode.containerInfo,Kn=!0;break e}z=z.return}if(gn===null)throw Error(s(160));Zp(c,m,o),gn=null,Kn=!1,c=o.alternate,c!==null&&(c.return=null),o.return=null}if(n.subtreeFlags&13886)for(n=n.child;n!==null;)qp(n,e),n=n.sibling}var Pt=null;function qp(e,n){var t=e.alternate,i=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:Jn(n,e),$n(e),i&4&&(Wa(3,e,e.return),qr(3,e),Wa(5,e,e.return));break;case 1:Jn(n,e),$n(e),i&512&&(kn||t===null||Ht(t,t.return)),i&64&&ca&&(e=e.updateQueue,e!==null&&(i=e.callbacks,i!==null&&(t=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=t===null?i:t.concat(i))));break;case 26:var o=Pt;if(Jn(n,e),$n(e),i&512&&(kn||t===null||Ht(t,t.return)),i&4){var c=t!==null?t.memoizedState:null;if(i=e.memoizedState,t===null)if(i===null)if(e.stateNode===null){e:{i=e.type,t=e.memoizedProps,o=o.ownerDocument||o;n:switch(i){case"title":c=o.getElementsByTagName("title")[0],(!c||c[Pe]||c[ce]||c.namespaceURI==="http://www.w3.org/2000/svg"||c.hasAttribute("itemprop"))&&(c=o.createElement(i),o.head.insertBefore(c,o.querySelector("head > title"))),Bn(c,i,t),c[ce]=e,Sn(c),i=c;break e;case"link":var m=qh("link","href",o).get(i+(t.href||""));if(m){for(var z=0;z<m.length;z++)if(c=m[z],c.getAttribute("href")===(t.href==null||t.href===""?null:t.href)&&c.getAttribute("rel")===(t.rel==null?null:t.rel)&&c.getAttribute("title")===(t.title==null?null:t.title)&&c.getAttribute("crossorigin")===(t.crossOrigin==null?null:t.crossOrigin)){m.splice(z,1);break n}}c=o.createElement(i),Bn(c,i,t),o.head.appendChild(c);break;case"meta":if(m=qh("meta","content",o).get(i+(t.content||""))){for(z=0;z<m.length;z++)if(c=m[z],c.getAttribute("content")===(t.content==null?null:""+t.content)&&c.getAttribute("name")===(t.name==null?null:t.name)&&c.getAttribute("property")===(t.property==null?null:t.property)&&c.getAttribute("http-equiv")===(t.httpEquiv==null?null:t.httpEquiv)&&c.getAttribute("charset")===(t.charSet==null?null:t.charSet)){m.splice(z,1);break n}}c=o.createElement(i),Bn(c,i,t),o.head.appendChild(c);break;default:throw Error(s(468,i))}c[ce]=e,Sn(c),i=c}e.stateNode=i}else Yh(o,e.type,e.stateNode);else e.stateNode=Vh(o,i,e.memoizedProps);else c!==i?(c===null?t.stateNode!==null&&(t=t.stateNode,t.parentNode.removeChild(t)):c.count--,i===null?Yh(o,e.type,e.stateNode):Vh(o,i,e.memoizedProps)):i===null&&e.stateNode!==null&&Rc(e,e.memoizedProps,t.memoizedProps)}break;case 27:Jn(n,e),$n(e),i&512&&(kn||t===null||Ht(t,t.return)),t!==null&&i&4&&Rc(e,e.memoizedProps,t.memoizedProps);break;case 5:if(Jn(n,e),$n(e),i&512&&(kn||t===null||Ht(t,t.return)),e.flags&32){o=e.stateNode;try{Li(o,"")}catch(me){nn(e,e.return,me)}}i&4&&e.stateNode!=null&&(o=e.memoizedProps,Rc(e,o,t!==null?t.memoizedProps:o)),i&1024&&(_c=!0);break;case 6:if(Jn(n,e),$n(e),i&4){if(e.stateNode===null)throw Error(s(162));i=e.memoizedProps,t=e.stateNode;try{t.nodeValue=i}catch(me){nn(e,e.return,me)}}break;case 3:if(_s=null,o=Pt,Pt=ks(n.containerInfo),Jn(n,e),Pt=o,$n(e),i&4&&t!==null&&t.memoizedState.isDehydrated)try{dr(n.containerInfo)}catch(me){nn(e,e.return,me)}_c&&(_c=!1,Yp(e));break;case 4:i=Pt,Pt=ks(e.stateNode.containerInfo),Jn(n,e),$n(e),Pt=i;break;case 12:Jn(n,e),$n(e);break;case 31:Jn(n,e),$n(e),i&4&&(i=e.updateQueue,i!==null&&(e.updateQueue=null,ms(e,i)));break;case 13:Jn(n,e),$n(e),e.child.flags&8192&&e.memoizedState!==null!=(t!==null&&t.memoizedState!==null)&&(bs=yn()),i&4&&(i=e.updateQueue,i!==null&&(e.updateQueue=null,ms(e,i)));break;case 22:o=e.memoizedState!==null;var D=t!==null&&t.memoizedState!==null,M=ca,B=kn;if(ca=M||o,kn=B||D,Jn(n,e),kn=B,ca=M,$n(e),i&8192)e:for(n=e.stateNode,n._visibility=o?n._visibility&-2:n._visibility|1,o&&(t===null||D||ca||kn||Ei(e)),t=null,n=e;;){if(n.tag===5||n.tag===26){if(t===null){D=t=n;try{if(c=D.stateNode,o)m=c.style,typeof m.setProperty=="function"?m.setProperty("display","none","important"):m.display="none";else{z=D.stateNode;var Y=D.memoizedProps.style,W=Y!=null&&Y.hasOwnProperty("display")?Y.display:null;z.style.display=W==null||typeof W=="boolean"?"":(""+W).trim()}}catch(me){nn(D,D.return,me)}}}else if(n.tag===6){if(t===null){D=n;try{D.stateNode.nodeValue=o?"":D.memoizedProps}catch(me){nn(D,D.return,me)}}}else if(n.tag===18){if(t===null){D=n;try{var N=D.stateNode;o?Oh(N,!0):Oh(D.stateNode,!1)}catch(me){nn(D,D.return,me)}}}else if((n.tag!==22&&n.tag!==23||n.memoizedState===null||n===e)&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break e;for(;n.sibling===null;){if(n.return===null||n.return===e)break e;t===n&&(t=null),n=n.return}t===n&&(t=null),n.sibling.return=n.return,n=n.sibling}i&4&&(i=e.updateQueue,i!==null&&(t=i.retryQueue,t!==null&&(i.retryQueue=null,ms(e,t))));break;case 19:Jn(n,e),$n(e),i&4&&(i=e.updateQueue,i!==null&&(e.updateQueue=null,ms(e,i)));break;case 30:break;case 21:break;default:Jn(n,e),$n(e)}}function $n(e){var n=e.flags;if(n&2){try{for(var t,i=e.return;i!==null;){if(Np(i)){t=i;break}i=i.return}if(t==null)throw Error(s(160));switch(t.tag){case 27:var o=t.stateNode,c=kc(e);hs(e,c,o);break;case 5:var m=t.stateNode;t.flags&32&&(Li(m,""),t.flags&=-33);var z=kc(e);hs(e,z,m);break;case 3:case 4:var D=t.stateNode.containerInfo,M=kc(e);Ic(e,M,D);break;default:throw Error(s(161))}}catch(B){nn(e,e.return,B)}e.flags&=-3}n&4096&&(e.flags&=-4097)}function Yp(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var n=e;Yp(n),n.tag===5&&n.flags&1024&&n.stateNode.reset(),e=e.sibling}}function da(e,n){if(n.subtreeFlags&8772)for(n=n.child;n!==null;)Bp(e,n.alternate,n),n=n.sibling}function Ei(e){for(e=e.child;e!==null;){var n=e;switch(n.tag){case 0:case 11:case 14:case 15:Wa(4,n,n.return),Ei(n);break;case 1:Ht(n,n.return);var t=n.stateNode;typeof t.componentWillUnmount=="function"&&Op(n,n.return,t),Ei(n);break;case 27:tl(n.stateNode);case 26:case 5:Ht(n,n.return),Ei(n);break;case 22:n.memoizedState===null&&Ei(n);break;case 30:Ei(n);break;default:Ei(n)}e=e.sibling}}function fa(e,n,t){for(t=t&&(n.subtreeFlags&8772)!==0,n=n.child;n!==null;){var i=n.alternate,o=e,c=n,m=c.flags;switch(c.tag){case 0:case 11:case 15:fa(o,c,t),qr(4,c);break;case 1:if(fa(o,c,t),i=c,o=i.stateNode,typeof o.componentDidMount=="function")try{o.componentDidMount()}catch(M){nn(i,i.return,M)}if(i=c,o=i.updateQueue,o!==null){var z=i.stateNode;try{var D=o.shared.hiddenCallbacks;if(D!==null)for(o.shared.hiddenCallbacks=null,o=0;o<D.length;o++)Df(D[o],z)}catch(M){nn(i,i.return,M)}}t&&m&64&&Wp(c),Yr(c,c.return);break;case 27:Up(c);case 26:case 5:fa(o,c,t),t&&i===null&&m&4&&Pp(c),Yr(c,c.return);break;case 12:fa(o,c,t);break;case 31:fa(o,c,t),t&&m&4&&Hp(o,c);break;case 13:fa(o,c,t),t&&m&4&&Vp(o,c);break;case 22:c.memoizedState===null&&fa(o,c,t),Yr(c,c.return);break;case 30:break;default:fa(o,c,t)}n=n.sibling}}function Mc(e,n){var t=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(t=e.memoizedState.cachePool.pool),e=null,n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(e=n.memoizedState.cachePool.pool),e!==t&&(e!=null&&e.refCount++,t!=null&&Cr(t))}function Cc(e,n){e=null,n.alternate!==null&&(e=n.alternate.memoizedState.cache),n=n.memoizedState.cache,n!==e&&(n.refCount++,e!=null&&Cr(e))}function Nt(e,n,t,i){if(n.subtreeFlags&10256)for(n=n.child;n!==null;)Gp(e,n,t,i),n=n.sibling}function Gp(e,n,t,i){var o=n.flags;switch(n.tag){case 0:case 11:case 15:Nt(e,n,t,i),o&2048&&qr(9,n);break;case 1:Nt(e,n,t,i);break;case 3:Nt(e,n,t,i),o&2048&&(e=null,n.alternate!==null&&(e=n.alternate.memoizedState.cache),n=n.memoizedState.cache,n!==e&&(n.refCount++,e!=null&&Cr(e)));break;case 12:if(o&2048){Nt(e,n,t,i),e=n.stateNode;try{var c=n.memoizedProps,m=c.id,z=c.onPostCommit;typeof z=="function"&&z(m,n.alternate===null?"mount":"update",e.passiveEffectDuration,-0)}catch(D){nn(n,n.return,D)}}else Nt(e,n,t,i);break;case 31:Nt(e,n,t,i);break;case 13:Nt(e,n,t,i);break;case 23:break;case 22:c=n.stateNode,m=n.alternate,n.memoizedState!==null?c._visibility&2?Nt(e,n,t,i):Gr(e,n):c._visibility&2?Nt(e,n,t,i):(c._visibility|=2,er(e,n,t,i,(n.subtreeFlags&10256)!==0||!1)),o&2048&&Mc(m,n);break;case 24:Nt(e,n,t,i),o&2048&&Cc(n.alternate,n);break;default:Nt(e,n,t,i)}}function er(e,n,t,i,o){for(o=o&&((n.subtreeFlags&10256)!==0||!1),n=n.child;n!==null;){var c=e,m=n,z=t,D=i,M=m.flags;switch(m.tag){case 0:case 11:case 15:er(c,m,z,D,o),qr(8,m);break;case 23:break;case 22:var B=m.stateNode;m.memoizedState!==null?B._visibility&2?er(c,m,z,D,o):Gr(c,m):(B._visibility|=2,er(c,m,z,D,o)),o&&M&2048&&Mc(m.alternate,m);break;case 24:er(c,m,z,D,o),o&&M&2048&&Cc(m.alternate,m);break;default:er(c,m,z,D,o)}n=n.sibling}}function Gr(e,n){if(n.subtreeFlags&10256)for(n=n.child;n!==null;){var t=e,i=n,o=i.flags;switch(i.tag){case 22:Gr(t,i),o&2048&&Mc(i.alternate,i);break;case 24:Gr(t,i),o&2048&&Cc(i.alternate,i);break;default:Gr(t,i)}n=n.sibling}}var Qr=8192;function nr(e,n,t){if(e.subtreeFlags&Qr)for(e=e.child;e!==null;)Qp(e,n,t),e=e.sibling}function Qp(e,n,t){switch(e.tag){case 26:nr(e,n,t),e.flags&Qr&&e.memoizedState!==null&&xz(t,Pt,e.memoizedState,e.memoizedProps);break;case 5:nr(e,n,t);break;case 3:case 4:var i=Pt;Pt=ks(e.stateNode.containerInfo),nr(e,n,t),Pt=i;break;case 22:e.memoizedState===null&&(i=e.alternate,i!==null&&i.memoizedState!==null?(i=Qr,Qr=16777216,nr(e,n,t),Qr=i):nr(e,n,t));break;default:nr(e,n,t)}}function Fp(e){var n=e.alternate;if(n!==null&&(e=n.child,e!==null)){n.child=null;do n=e.sibling,e.sibling=null,e=n;while(e!==null)}}function Fr(e){var n=e.deletions;if((e.flags&16)!==0){if(n!==null)for(var t=0;t<n.length;t++){var i=n[t];Wn=i,Jp(i,e)}Fp(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)Kp(e),e=e.sibling}function Kp(e){switch(e.tag){case 0:case 11:case 15:Fr(e),e.flags&2048&&Wa(9,e,e.return);break;case 3:Fr(e);break;case 12:Fr(e);break;case 22:var n=e.stateNode;e.memoizedState!==null&&n._visibility&2&&(e.return===null||e.return.tag!==13)?(n._visibility&=-3,gs(e)):Fr(e);break;default:Fr(e)}}function gs(e){var n=e.deletions;if((e.flags&16)!==0){if(n!==null)for(var t=0;t<n.length;t++){var i=n[t];Wn=i,Jp(i,e)}Fp(e)}for(e=e.child;e!==null;){switch(n=e,n.tag){case 0:case 11:case 15:Wa(8,n,n.return),gs(n);break;case 22:t=n.stateNode,t._visibility&2&&(t._visibility&=-3,gs(n));break;default:gs(n)}e=e.sibling}}function Jp(e,n){for(;Wn!==null;){var t=Wn;switch(t.tag){case 0:case 11:case 15:Wa(8,t,n);break;case 23:case 22:if(t.memoizedState!==null&&t.memoizedState.cachePool!==null){var i=t.memoizedState.cachePool.pool;i!=null&&i.refCount++}break;case 24:Cr(t.memoizedState.cache)}if(i=t.child,i!==null)i.return=t,Wn=i;else e:for(t=e;Wn!==null;){i=Wn;var o=i.sibling,c=i.return;if(Xp(i),i===t){Wn=null;break e}if(o!==null){o.return=c,Wn=o;break e}Wn=c}}}var Ny={getCacheForType:function(e){var n=Un(An),t=n.data.get(e);return t===void 0&&(t=e(),n.data.set(e,t)),t},cacheSignal:function(){return Un(An).controller.signal}},Uy=typeof WeakMap=="function"?WeakMap:Map,Ge=0,sn=null,Ne=null,Be=0,en=0,dt=null,Oa=!1,tr=!1,Lc=!1,pa=0,En=0,Pa=0,xi=0,Wc=0,ft=0,ar=0,Kr=null,et=null,Oc=!1,bs=0,$p=0,ys=1/0,zs=null,Na=null,Cn=0,Ua=null,ir=null,ha=0,Pc=0,Nc=null,eh=null,Jr=0,Uc=null;function pt(){return(Ge&2)!==0&&Be!==0?Be&-Be:C.T!==null?Vc():Ee()}function nh(){if(ft===0)if((Be&536870912)===0||Ze){var e=va;va<<=1,(va&3932160)===0&&(va=262144),ft=e}else ft=536870912;return e=ct.current,e!==null&&(e.flags|=32),ft}function nt(e,n,t){(e===sn&&(en===2||en===9)||e.cancelPendingCommit!==null)&&(rr(e,0),ja(e,Be,ft,!1)),li(e,t),((Ge&2)===0||e!==sn)&&(e===sn&&((Ge&2)===0&&(xi|=t),En===4&&ja(e,Be,ft,!1)),Vt(e))}function th(e,n,t){if((Ge&6)!==0)throw Error(s(327));var i=!t&&(n&127)===0&&(n&e.expiredLanes)===0||ii(e,n),o=i?Xy(e,n):Bc(e,n,!0),c=i;do{if(o===0){tr&&!i&&ja(e,n,0,!1);break}else{if(t=e.current.alternate,c&&!jy(t)){o=Bc(e,n,!1),c=!1;continue}if(o===2){if(c=n,e.errorRecoveryDisabledLanes&c)var m=0;else m=e.pendingLanes&-536870913,m=m!==0?m:m&536870912?536870912:0;if(m!==0){n=m;e:{var z=e;o=Kr;var D=z.current.memoizedState.isDehydrated;if(D&&(rr(z,m).flags|=256),m=Bc(z,m,!1),m!==2){if(Lc&&!D){z.errorRecoveryDisabledLanes|=c,xi|=c,o=4;break e}c=et,et=o,c!==null&&(et===null?et=c:et.push.apply(et,c))}o=m}if(c=!1,o!==2)continue}}if(o===1){rr(e,0),ja(e,n,0,!0);break}e:{switch(i=e,c=o,c){case 0:case 1:throw Error(s(345));case 4:if((n&4194048)!==n)break;case 6:ja(i,n,ft,!Oa);break e;case 2:et=null;break;case 3:case 5:break;default:throw Error(s(329))}if((n&62914560)===n&&(o=bs+300-yn(),10<o)){if(ja(i,n,ft,!Oa),ai(i,0,!0)!==0)break e;ha=n,i.timeoutHandle=Ch(ah.bind(null,i,t,et,zs,Oc,n,ft,xi,ar,Oa,c,"Throttled",-0,0),o);break e}ah(i,t,et,zs,Oc,n,ft,xi,ar,Oa,c,null,-0,0)}}break}while(!0);Vt(e)}function ah(e,n,t,i,o,c,m,z,D,M,B,Y,W,N){if(e.timeoutHandle=-1,Y=n.subtreeFlags,Y&8192||(Y&16785408)===16785408){Y={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:$t},Qp(n,c,Y);var me=(c&62914560)===c?bs-yn():(c&4194048)===c?$p-yn():0;if(me=Dz(Y,me),me!==null){ha=c,e.cancelPendingCommit=me(dh.bind(null,e,n,c,t,i,o,m,z,D,B,Y,null,W,N)),ja(e,c,m,!M);return}}dh(e,n,c,t,i,o,m,z,D)}function jy(e){for(var n=e;;){var t=n.tag;if((t===0||t===11||t===15)&&n.flags&16384&&(t=n.updateQueue,t!==null&&(t=t.stores,t!==null)))for(var i=0;i<t.length;i++){var o=t[i],c=o.getSnapshot;o=o.value;try{if(!st(c(),o))return!1}catch{return!1}}if(t=n.child,n.subtreeFlags&16384&&t!==null)t.return=n,n=t;else{if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return!0;n=n.return}n.sibling.return=n.return,n=n.sibling}}return!0}function ja(e,n,t,i){n&=~Wc,n&=~xi,e.suspendedLanes|=n,e.pingedLanes&=~n,i&&(e.warmLanes|=n),i=e.expirationTimes;for(var o=n;0<o;){var c=31-Ke(o),m=1<<c;i[c]=-1,o&=~m}t!==0&&A(e,t,n)}function Ss(){return(Ge&6)===0?($r(0),!1):!0}function jc(){if(Ne!==null){if(en===0)var e=Ne.return;else e=Ne,aa=hi=null,tc(e),Qi=null,Wr=0,e=Ne;for(;e!==null;)Lp(e.alternate,e),e=e.return;Ne=null}}function rr(e,n){var t=e.timeoutHandle;t!==-1&&(e.timeoutHandle=-1,lz(t)),t=e.cancelPendingCommit,t!==null&&(e.cancelPendingCommit=null,t()),ha=0,jc(),sn=e,Ne=t=na(e.current,null),Be=n,en=0,dt=null,Oa=!1,tr=ii(e,n),Lc=!1,ar=ft=Wc=xi=Pa=En=0,et=Kr=null,Oc=!1,(n&8)!==0&&(n|=n&32);var i=e.entangledLanes;if(i!==0)for(e=e.entanglements,i&=n;0<i;){var o=31-Ke(i),c=1<<o;n|=e[o],i&=~c}return pa=n,Bl(),t}function ih(e,n){Ce=null,C.H=Zr,n===Gi||n===Ql?(n=Sf(),en=3):n===Ho?(n=Sf(),en=4):en=n===yc?8:n!==null&&typeof n=="object"&&typeof n.then=="function"?6:1,dt=n,Ne===null&&(En=1,cs(e,xt(n,e.current)))}function rh(){var e=ct.current;return e===null?!0:(Be&4194048)===Be?wt===null:(Be&62914560)===Be||(Be&536870912)!==0?e===wt:!1}function lh(){var e=C.H;return C.H=Zr,e===null?Zr:e}function sh(){var e=C.A;return C.A=Ny,e}function vs(){En=4,Oa||(Be&4194048)!==Be&&ct.current!==null||(tr=!0),(Pa&134217727)===0&&(xi&134217727)===0||sn===null||ja(sn,Be,ft,!1)}function Bc(e,n,t){var i=Ge;Ge|=2;var o=lh(),c=sh();(sn!==e||Be!==n)&&(zs=null,rr(e,n)),n=!1;var m=En;e:do try{if(en!==0&&Ne!==null){var z=Ne,D=dt;switch(en){case 8:jc(),m=6;break e;case 3:case 2:case 9:case 6:ct.current===null&&(n=!0);var M=en;if(en=0,dt=null,lr(e,z,D,M),t&&tr){m=0;break e}break;default:M=en,en=0,dt=null,lr(e,z,D,M)}}By(),m=En;break}catch(B){ih(e,B)}while(!0);return n&&e.shellSuspendCounter++,aa=hi=null,Ge=i,C.H=o,C.A=c,Ne===null&&(sn=null,Be=0,Bl()),m}function By(){for(;Ne!==null;)oh(Ne)}function Xy(e,n){var t=Ge;Ge|=2;var i=lh(),o=sh();sn!==e||Be!==n?(zs=null,ys=yn()+500,rr(e,n)):tr=ii(e,n);e:do try{if(en!==0&&Ne!==null){n=Ne;var c=dt;n:switch(en){case 1:en=0,dt=null,lr(e,n,c,1);break;case 2:case 9:if(yf(c)){en=0,dt=null,ch(n);break}n=function(){en!==2&&en!==9||sn!==e||(en=7),Vt(e)},c.then(n,n);break e;case 3:en=7;break e;case 4:en=5;break e;case 7:yf(c)?(en=0,dt=null,ch(n)):(en=0,dt=null,lr(e,n,c,7));break;case 5:var m=null;switch(Ne.tag){case 26:m=Ne.memoizedState;case 5:case 27:var z=Ne;if(m?Gh(m):z.stateNode.complete){en=0,dt=null;var D=z.sibling;if(D!==null)Ne=D;else{var M=z.return;M!==null?(Ne=M,Es(M)):Ne=null}break n}}en=0,dt=null,lr(e,n,c,5);break;case 6:en=0,dt=null,lr(e,n,c,6);break;case 8:jc(),En=6;break e;default:throw Error(s(462))}}Zy();break}catch(B){ih(e,B)}while(!0);return aa=hi=null,C.H=i,C.A=o,Ge=t,Ne!==null?0:(sn=null,Be=0,Bl(),En)}function Zy(){for(;Ne!==null&&!Sr();)oh(Ne)}function oh(e){var n=Mp(e.alternate,e,pa);e.memoizedProps=e.pendingProps,n===null?Es(e):Ne=n}function ch(e){var n=e,t=n.alternate;switch(n.tag){case 15:case 0:n=Ap(t,n,n.pendingProps,n.type,void 0,Be);break;case 11:n=Ap(t,n,n.pendingProps,n.type.render,n.ref,Be);break;case 5:tc(n);default:Lp(t,n),n=Ne=sf(n,pa),n=Mp(t,n,pa)}e.memoizedProps=e.pendingProps,n===null?Es(e):Ne=n}function lr(e,n,t,i){aa=hi=null,tc(n),Qi=null,Wr=0;var o=n.return;try{if(_y(e,o,n,t,Be)){En=1,cs(e,xt(t,e.current)),Ne=null;return}}catch(c){if(o!==null)throw Ne=o,c;En=1,cs(e,xt(t,e.current)),Ne=null;return}n.flags&32768?(Ze||i===1?e=!0:tr||(Be&536870912)!==0?e=!1:(Oa=e=!0,(i===2||i===9||i===3||i===6)&&(i=ct.current,i!==null&&i.tag===13&&(i.flags|=16384))),uh(n,e)):Es(n)}function Es(e){var n=e;do{if((n.flags&32768)!==0){uh(n,Oa);return}e=n.return;var t=Ly(n.alternate,n,pa);if(t!==null){Ne=t;return}if(n=n.sibling,n!==null){Ne=n;return}Ne=n=e}while(n!==null);En===0&&(En=5)}function uh(e,n){do{var t=Wy(e.alternate,e);if(t!==null){t.flags&=32767,Ne=t;return}if(t=e.return,t!==null&&(t.flags|=32768,t.subtreeFlags=0,t.deletions=null),!n&&(e=e.sibling,e!==null)){Ne=e;return}Ne=e=t}while(e!==null);En=6,Ne=null}function dh(e,n,t,i,o,c,m,z,D){e.cancelPendingCommit=null;do xs();while(Cn!==0);if((Ge&6)!==0)throw Error(s(327));if(n!==null){if(n===e.current)throw Error(s(177));if(c=n.lanes|n.childLanes,c|=ko,lo(e,t,c,m,z,D),e===sn&&(Ne=sn=null,Be=0),ir=n,Ua=e,ha=t,Pc=c,Nc=o,eh=i,(n.subtreeFlags&10256)!==0||(n.flags&10256)!==0?(e.callbackNode=null,e.callbackPriority=0,Yy(ve,function(){return gh(),null})):(e.callbackNode=null,e.callbackPriority=0),i=(n.flags&13878)!==0,(n.subtreeFlags&13878)!==0||i){i=C.T,C.T=null,o=K.p,K.p=2,m=Ge,Ge|=4;try{Oy(e,n,t)}finally{Ge=m,K.p=o,C.T=i}}Cn=1,fh(),ph(),hh()}}function fh(){if(Cn===1){Cn=0;var e=Ua,n=ir,t=(n.flags&13878)!==0;if((n.subtreeFlags&13878)!==0||t){t=C.T,C.T=null;var i=K.p;K.p=2;var o=Ge;Ge|=4;try{qp(n,e);var c=$c,m=Kd(e.containerInfo),z=c.focusedElem,D=c.selectionRange;if(m!==z&&z&&z.ownerDocument&&Fd(z.ownerDocument.documentElement,z)){if(D!==null&&Do(z)){var M=D.start,B=D.end;if(B===void 0&&(B=M),"selectionStart"in z)z.selectionStart=M,z.selectionEnd=Math.min(B,z.value.length);else{var Y=z.ownerDocument||document,W=Y&&Y.defaultView||window;if(W.getSelection){var N=W.getSelection(),me=z.textContent.length,De=Math.min(D.start,me),ln=D.end===void 0?De:Math.min(D.end,me);!N.extend&&De>ln&&(m=ln,ln=De,De=m);var k=Qd(z,De),w=Qd(z,ln);if(k&&w&&(N.rangeCount!==1||N.anchorNode!==k.node||N.anchorOffset!==k.offset||N.focusNode!==w.node||N.focusOffset!==w.offset)){var _=Y.createRange();_.setStart(k.node,k.offset),N.removeAllRanges(),De>ln?(N.addRange(_),N.extend(w.node,w.offset)):(_.setEnd(w.node,w.offset),N.addRange(_))}}}}for(Y=[],N=z;N=N.parentNode;)N.nodeType===1&&Y.push({element:N,left:N.scrollLeft,top:N.scrollTop});for(typeof z.focus=="function"&&z.focus(),z=0;z<Y.length;z++){var V=Y[z];V.element.scrollLeft=V.left,V.element.scrollTop=V.top}}Ws=!!Jc,$c=Jc=null}finally{Ge=o,K.p=i,C.T=t}}e.current=n,Cn=2}}function ph(){if(Cn===2){Cn=0;var e=Ua,n=ir,t=(n.flags&8772)!==0;if((n.subtreeFlags&8772)!==0||t){t=C.T,C.T=null;var i=K.p;K.p=2;var o=Ge;Ge|=4;try{Bp(e,n.alternate,n)}finally{Ge=o,K.p=i,C.T=t}}Cn=3}}function hh(){if(Cn===4||Cn===3){Cn=0,vr();var e=Ua,n=ir,t=ha,i=eh;(n.subtreeFlags&10256)!==0||(n.flags&10256)!==0?Cn=5:(Cn=0,ir=Ua=null,mh(e,e.pendingLanes));var o=e.pendingLanes;if(o===0&&(Na=null),se(t),n=n.stateNode,zn&&typeof zn.onCommitFiberRoot=="function")try{zn.onCommitFiberRoot(mn,n,void 0,(n.current.flags&128)===128)}catch{}if(i!==null){n=C.T,o=K.p,K.p=2,C.T=null;try{for(var c=e.onRecoverableError,m=0;m<i.length;m++){var z=i[m];c(z.value,{componentStack:z.stack})}}finally{C.T=n,K.p=o}}(ha&3)!==0&&xs(),Vt(e),o=e.pendingLanes,(t&261930)!==0&&(o&42)!==0?e===Uc?Jr++:(Jr=0,Uc=e):Jr=0,$r(0)}}function mh(e,n){(e.pooledCacheLanes&=n)===0&&(n=e.pooledCache,n!=null&&(e.pooledCache=null,Cr(n)))}function xs(){return fh(),ph(),hh(),gh()}function gh(){if(Cn!==5)return!1;var e=Ua,n=Pc;Pc=0;var t=se(ha),i=C.T,o=K.p;try{K.p=32>t?32:t,C.T=null,t=Nc,Nc=null;var c=Ua,m=ha;if(Cn=0,ir=Ua=null,ha=0,(Ge&6)!==0)throw Error(s(331));var z=Ge;if(Ge|=4,Kp(c.current),Gp(c,c.current,m,t),Ge=z,$r(0,!1),zn&&typeof zn.onPostCommitFiberRoot=="function")try{zn.onPostCommitFiberRoot(mn,c)}catch{}return!0}finally{K.p=o,C.T=i,mh(e,n)}}function bh(e,n,t){n=xt(t,n),n=bc(e.stateNode,n,2),e=Ma(e,n,2),e!==null&&(li(e,2),Vt(e))}function nn(e,n,t){if(e.tag===3)bh(e,e,t);else for(;n!==null;){if(n.tag===3){bh(n,e,t);break}else if(n.tag===1){var i=n.stateNode;if(typeof n.type.getDerivedStateFromError=="function"||typeof i.componentDidCatch=="function"&&(Na===null||!Na.has(i))){e=xt(t,e),t=yp(2),i=Ma(n,t,2),i!==null&&(zp(t,i,n,e),li(i,2),Vt(i));break}}n=n.return}}function Xc(e,n,t){var i=e.pingCache;if(i===null){i=e.pingCache=new Uy;var o=new Set;i.set(n,o)}else o=i.get(n),o===void 0&&(o=new Set,i.set(n,o));o.has(t)||(Lc=!0,o.add(t),e=Hy.bind(null,e,n,t),n.then(e,e))}function Hy(e,n,t){var i=e.pingCache;i!==null&&i.delete(n),e.pingedLanes|=e.suspendedLanes&t,e.warmLanes&=~t,sn===e&&(Be&t)===t&&(En===4||En===3&&(Be&62914560)===Be&&300>yn()-bs?(Ge&2)===0&&rr(e,0):Wc|=t,ar===Be&&(ar=0)),Vt(e)}function yh(e,n){n===0&&(n=ri()),e=di(e,n),e!==null&&(li(e,n),Vt(e))}function Vy(e){var n=e.memoizedState,t=0;n!==null&&(t=n.retryLane),yh(e,t)}function qy(e,n){var t=0;switch(e.tag){case 31:case 13:var i=e.stateNode,o=e.memoizedState;o!==null&&(t=o.retryLane);break;case 19:i=e.stateNode;break;case 22:i=e.stateNode._retryCache;break;default:throw Error(s(314))}i!==null&&i.delete(n),yh(e,t)}function Yy(e,n){return Sa(e,n)}var Ds=null,sr=null,Zc=!1,Ts=!1,Hc=!1,Ba=0;function Vt(e){e!==sr&&e.next===null&&(sr===null?Ds=sr=e:sr=sr.next=e),Ts=!0,Zc||(Zc=!0,Qy())}function $r(e,n){if(!Hc&&Ts){Hc=!0;do for(var t=!1,i=Ds;i!==null;){if(e!==0){var o=i.pendingLanes;if(o===0)var c=0;else{var m=i.suspendedLanes,z=i.pingedLanes;c=(1<<31-Ke(42|e)+1)-1,c&=o&~(m&~z),c=c&201326741?c&201326741|1:c?c|2:0}c!==0&&(t=!0,Eh(i,c))}else c=Be,c=ai(i,i===sn?c:0,i.cancelPendingCommit!==null||i.timeoutHandle!==-1),(c&3)===0||ii(i,c)||(t=!0,Eh(i,c));i=i.next}while(t);Hc=!1}}function Gy(){zh()}function zh(){Ts=Zc=!1;var e=0;Ba!==0&&rz()&&(e=Ba);for(var n=yn(),t=null,i=Ds;i!==null;){var o=i.next,c=Sh(i,n);c===0?(i.next=null,t===null?Ds=o:t.next=o,o===null&&(sr=t)):(t=i,(e!==0||(c&3)!==0)&&(Ts=!0)),i=o}Cn!==0&&Cn!==5||$r(e),Ba!==0&&(Ba=0)}function Sh(e,n){for(var t=e.suspendedLanes,i=e.pingedLanes,o=e.expirationTimes,c=e.pendingLanes&-62914561;0<c;){var m=31-Ke(c),z=1<<m,D=o[m];D===-1?((z&t)===0||(z&i)!==0)&&(o[m]=_l(z,n)):D<=n&&(e.expiredLanes|=z),c&=~z}if(n=sn,t=Be,t=ai(e,e===n?t:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),i=e.callbackNode,t===0||e===n&&(en===2||en===9)||e.cancelPendingCommit!==null)return i!==null&&i!==null&&ni(i),e.callbackNode=null,e.callbackPriority=0;if((t&3)===0||ii(e,t)){if(n=t&-t,n===e.callbackPriority)return n;switch(i!==null&&ni(i),se(t)){case 2:case 8:t=ae;break;case 32:t=ve;break;case 268435456:t=Ve;break;default:t=ve}return i=vh.bind(null,e),t=Sa(t,i),e.callbackPriority=n,e.callbackNode=t,n}return i!==null&&i!==null&&ni(i),e.callbackPriority=2,e.callbackNode=null,2}function vh(e,n){if(Cn!==0&&Cn!==5)return e.callbackNode=null,e.callbackPriority=0,null;var t=e.callbackNode;if(xs()&&e.callbackNode!==t)return null;var i=Be;return i=ai(e,e===sn?i:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),i===0?null:(th(e,i,n),Sh(e,yn()),e.callbackNode!=null&&e.callbackNode===t?vh.bind(null,e):null)}function Eh(e,n){if(xs())return null;th(e,n,!0)}function Qy(){sz(function(){(Ge&6)!==0?Sa(H,Gy):zh()})}function Vc(){if(Ba===0){var e=qi;e===0&&(e=ti,ti<<=1,(ti&261888)===0&&(ti=256)),Ba=e}return Ba}function xh(e){return e==null||typeof e=="symbol"||typeof e=="boolean"?null:typeof e=="function"?e:Cl(""+e)}function Dh(e,n){var t=n.ownerDocument.createElement("input");return t.name=n.name,t.value=n.value,e.id&&t.setAttribute("form",e.id),n.parentNode.insertBefore(t,n),e=new FormData(e),t.parentNode.removeChild(t),e}function Fy(e,n,t,i,o){if(n==="submit"&&t&&t.stateNode===o){var c=xh((o[oe]||null).action),m=i.submitter;m&&(n=(n=m[oe]||null)?xh(n.formAction):m.getAttribute("formAction"),n!==null&&(c=n,m=null));var z=new Pl("action","action",null,i,o);e.push({event:z,listeners:[{instance:null,listener:function(){if(i.defaultPrevented){if(Ba!==0){var D=m?Dh(o,m):new FormData(o);dc(t,{pending:!0,data:D,method:o.method,action:c},null,D)}}else typeof c=="function"&&(z.preventDefault(),D=m?Dh(o,m):new FormData(o),dc(t,{pending:!0,data:D,method:o.method,action:c},c,D))},currentTarget:o}]})}}for(var qc=0;qc<Ro.length;qc++){var Yc=Ro[qc],Ky=Yc.toLowerCase(),Jy=Yc[0].toUpperCase()+Yc.slice(1);Ot(Ky,"on"+Jy)}Ot(ef,"onAnimationEnd"),Ot(nf,"onAnimationIteration"),Ot(tf,"onAnimationStart"),Ot("dblclick","onDoubleClick"),Ot("focusin","onFocus"),Ot("focusout","onBlur"),Ot(hy,"onTransitionRun"),Ot(my,"onTransitionStart"),Ot(gy,"onTransitionCancel"),Ot(af,"onTransitionEnd"),Lt("onMouseEnter",["mouseout","mouseover"]),Lt("onMouseLeave",["mouseout","mouseover"]),Lt("onPointerEnter",["pointerout","pointerover"]),Lt("onPointerLeave",["pointerout","pointerover"]),zt("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),zt("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),zt("onBeforeInput",["compositionend","keypress","textInput","paste"]),zt("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),zt("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),zt("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var el="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),$y=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(el));function Th(e,n){n=(n&4)!==0;for(var t=0;t<e.length;t++){var i=e[t],o=i.event;i=i.listeners;e:{var c=void 0;if(n)for(var m=i.length-1;0<=m;m--){var z=i[m],D=z.instance,M=z.currentTarget;if(z=z.listener,D!==c&&o.isPropagationStopped())break e;c=z,o.currentTarget=M;try{c(o)}catch(B){jl(B)}o.currentTarget=null,c=D}else for(m=0;m<i.length;m++){if(z=i[m],D=z.instance,M=z.currentTarget,z=z.listener,D!==c&&o.isPropagationStopped())break e;c=z,o.currentTarget=M;try{c(o)}catch(B){jl(B)}o.currentTarget=null,c=D}}}}function Ue(e,n){var t=n[ke];t===void 0&&(t=n[ke]=new Set);var i=e+"__bubble";t.has(i)||(Ah(n,e,2,!1),t.add(i))}function Gc(e,n,t){var i=0;n&&(i|=4),Ah(t,e,i,n)}var As="_reactListening"+Math.random().toString(36).slice(2);function Qc(e){if(!e[As]){e[As]=!0,Da.forEach(function(t){t!=="selectionchange"&&($y.has(t)||Gc(t,!1,e),Gc(t,!0,e))});var n=e.nodeType===9?e:e.ownerDocument;n===null||n[As]||(n[As]=!0,Gc("selectionchange",!1,n))}}function Ah(e,n,t,i){switch(nm(n)){case 2:var o=wz;break;case 8:o=Rz;break;default:o=uu}t=o.bind(null,n,t,e),o=void 0,!mo||n!=="touchstart"&&n!=="touchmove"&&n!=="wheel"||(o=!0),i?o!==void 0?e.addEventListener(n,t,{capture:!0,passive:o}):e.addEventListener(n,t,!0):o!==void 0?e.addEventListener(n,t,{passive:o}):e.addEventListener(n,t,!1)}function Fc(e,n,t,i,o){var c=i;if((n&1)===0&&(n&2)===0&&i!==null)e:for(;;){if(i===null)return;var m=i.tag;if(m===3||m===4){var z=i.stateNode.containerInfo;if(z===o)break;if(m===4)for(m=i.return;m!==null;){var D=m.tag;if((D===3||D===4)&&m.stateNode.containerInfo===o)return;m=m.return}for(;z!==null;){if(m=lt(z),m===null)return;if(D=m.tag,D===5||D===6||D===26||D===27){i=c=m;continue e}z=z.parentNode}}i=i.return}Id(function(){var M=c,B=po(t),Y=[];e:{var W=rf.get(e);if(W!==void 0){var N=Pl,me=e;switch(e){case"keypress":if(Wl(t)===0)break e;case"keydown":case"keyup":N=qb;break;case"focusin":me="focus",N=zo;break;case"focusout":me="blur",N=zo;break;case"beforeblur":case"afterblur":N=zo;break;case"click":if(t.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":N=Cd;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":N=Lb;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":N=Qb;break;case ef:case nf:case tf:N=Pb;break;case af:N=Kb;break;case"scroll":case"scrollend":N=Mb;break;case"wheel":N=$b;break;case"copy":case"cut":case"paste":N=Ub;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":N=Wd;break;case"toggle":case"beforetoggle":N=ny}var De=(n&4)!==0,ln=!De&&(e==="scroll"||e==="scrollend"),k=De?W!==null?W+"Capture":null:W;De=[];for(var w=M,_;w!==null;){var V=w;if(_=V.stateNode,V=V.tag,V!==5&&V!==26&&V!==27||_===null||k===null||(V=Er(w,k),V!=null&&De.push(nl(w,V,_))),ln)break;w=w.return}0<De.length&&(W=new N(W,me,null,t,B),Y.push({event:W,listeners:De}))}}if((n&7)===0){e:{if(W=e==="mouseover"||e==="pointerover",N=e==="mouseout"||e==="pointerout",W&&t!==fo&&(me=t.relatedTarget||t.fromElement)&&(lt(me)||me[ge]))break e;if((N||W)&&(W=B.window===B?B:(W=B.ownerDocument)?W.defaultView||W.parentWindow:window,N?(me=t.relatedTarget||t.toElement,N=M,me=me?lt(me):null,me!==null&&(ln=d(me),De=me.tag,me!==ln||De!==5&&De!==27&&De!==6)&&(me=null)):(N=null,me=M),N!==me)){if(De=Cd,V="onMouseLeave",k="onMouseEnter",w="mouse",(e==="pointerout"||e==="pointerover")&&(De=Wd,V="onPointerLeave",k="onPointerEnter",w="pointer"),ln=N==null?W:Hn(N),_=me==null?W:Hn(me),W=new De(V,w+"leave",N,t,B),W.target=ln,W.relatedTarget=_,V=null,lt(B)===M&&(De=new De(k,w+"enter",me,t,B),De.target=_,De.relatedTarget=ln,V=De),ln=V,N&&me)n:{for(De=ez,k=N,w=me,_=0,V=k;V;V=De(V))_++;V=0;for(var xe=w;xe;xe=De(xe))V++;for(;0<_-V;)k=De(k),_--;for(;0<V-_;)w=De(w),V--;for(;_--;){if(k===w||w!==null&&k===w.alternate){De=k;break n}k=De(k),w=De(w)}De=null}else De=null;N!==null&&wh(Y,W,N,De,!1),me!==null&&ln!==null&&wh(Y,ln,me,De,!0)}}e:{if(W=M?Hn(M):window,N=W.nodeName&&W.nodeName.toLowerCase(),N==="select"||N==="input"&&W.type==="file")var qe=Zd;else if(Bd(W))if(Hd)qe=dy;else{qe=cy;var Se=oy}else N=W.nodeName,!N||N.toLowerCase()!=="input"||W.type!=="checkbox"&&W.type!=="radio"?M&&uo(M.elementType)&&(qe=Zd):qe=uy;if(qe&&(qe=qe(e,M))){Xd(Y,qe,t,B);break e}Se&&Se(e,W,M),e==="focusout"&&M&&W.type==="number"&&M.memoizedProps.value!=null&&co(W,"number",W.value)}switch(Se=M?Hn(M):window,e){case"focusin":(Bd(Se)||Se.contentEditable==="true")&&(Ni=Se,To=M,Ir=null);break;case"focusout":Ir=To=Ni=null;break;case"mousedown":Ao=!0;break;case"contextmenu":case"mouseup":case"dragend":Ao=!1,Jd(Y,t,B);break;case"selectionchange":if(py)break;case"keydown":case"keyup":Jd(Y,t,B)}var Le;if(vo)e:{switch(e){case"compositionstart":var Xe="onCompositionStart";break e;case"compositionend":Xe="onCompositionEnd";break e;case"compositionupdate":Xe="onCompositionUpdate";break e}Xe=void 0}else Pi?Ud(e,t)&&(Xe="onCompositionEnd"):e==="keydown"&&t.keyCode===229&&(Xe="onCompositionStart");Xe&&(Od&&t.locale!=="ko"&&(Pi||Xe!=="onCompositionStart"?Xe==="onCompositionEnd"&&Pi&&(Le=_d()):(Ta=B,go="value"in Ta?Ta.value:Ta.textContent,Pi=!0)),Se=ws(M,Xe),0<Se.length&&(Xe=new Ld(Xe,e,null,t,B),Y.push({event:Xe,listeners:Se}),Le?Xe.data=Le:(Le=jd(t),Le!==null&&(Xe.data=Le)))),(Le=ay?iy(e,t):ry(e,t))&&(Xe=ws(M,"onBeforeInput"),0<Xe.length&&(Se=new Ld("onBeforeInput","beforeinput",null,t,B),Y.push({event:Se,listeners:Xe}),Se.data=Le)),Fy(Y,e,M,t,B)}Th(Y,n)})}function nl(e,n,t){return{instance:e,listener:n,currentTarget:t}}function ws(e,n){for(var t=n+"Capture",i=[];e!==null;){var o=e,c=o.stateNode;if(o=o.tag,o!==5&&o!==26&&o!==27||c===null||(o=Er(e,t),o!=null&&i.unshift(nl(e,o,c)),o=Er(e,n),o!=null&&i.push(nl(e,o,c))),e.tag===3)return i;e=e.return}return[]}function ez(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function wh(e,n,t,i,o){for(var c=n._reactName,m=[];t!==null&&t!==i;){var z=t,D=z.alternate,M=z.stateNode;if(z=z.tag,D!==null&&D===i)break;z!==5&&z!==26&&z!==27||M===null||(D=M,o?(M=Er(t,c),M!=null&&m.unshift(nl(t,M,D))):o||(M=Er(t,c),M!=null&&m.push(nl(t,M,D)))),t=t.return}m.length!==0&&e.push({event:n,listeners:m})}var nz=/\r\n?/g,tz=/\u0000|\uFFFD/g;function Rh(e){return(typeof e=="string"?e:""+e).replace(nz,`
`).replace(tz,"")}function kh(e,n){return n=Rh(n),Rh(e)===n}function rn(e,n,t,i,o,c){switch(t){case"children":typeof i=="string"?n==="body"||n==="textarea"&&i===""||Li(e,i):(typeof i=="number"||typeof i=="bigint")&&n!=="body"&&Li(e,""+i);break;case"className":Wt(e,"class",i);break;case"tabIndex":Wt(e,"tabindex",i);break;case"dir":case"role":case"viewBox":case"width":case"height":Wt(e,t,i);break;case"style":Rd(e,i,c);break;case"data":if(n!=="object"){Wt(e,"data",i);break}case"src":case"href":if(i===""&&(n!=="a"||t!=="href")){e.removeAttribute(t);break}if(i==null||typeof i=="function"||typeof i=="symbol"||typeof i=="boolean"){e.removeAttribute(t);break}i=Cl(""+i),e.setAttribute(t,i);break;case"action":case"formAction":if(typeof i=="function"){e.setAttribute(t,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof c=="function"&&(t==="formAction"?(n!=="input"&&rn(e,n,"name",o.name,o,null),rn(e,n,"formEncType",o.formEncType,o,null),rn(e,n,"formMethod",o.formMethod,o,null),rn(e,n,"formTarget",o.formTarget,o,null)):(rn(e,n,"encType",o.encType,o,null),rn(e,n,"method",o.method,o,null),rn(e,n,"target",o.target,o,null)));if(i==null||typeof i=="symbol"||typeof i=="boolean"){e.removeAttribute(t);break}i=Cl(""+i),e.setAttribute(t,i);break;case"onClick":i!=null&&(e.onclick=$t);break;case"onScroll":i!=null&&Ue("scroll",e);break;case"onScrollEnd":i!=null&&Ue("scrollend",e);break;case"dangerouslySetInnerHTML":if(i!=null){if(typeof i!="object"||!("__html"in i))throw Error(s(61));if(t=i.__html,t!=null){if(o.children!=null)throw Error(s(60));e.innerHTML=t}}break;case"multiple":e.multiple=i&&typeof i!="function"&&typeof i!="symbol";break;case"muted":e.muted=i&&typeof i!="function"&&typeof i!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(i==null||typeof i=="function"||typeof i=="boolean"||typeof i=="symbol"){e.removeAttribute("xlink:href");break}t=Cl(""+i),e.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",t);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":i!=null&&typeof i!="function"&&typeof i!="symbol"?e.setAttribute(t,""+i):e.removeAttribute(t);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":i&&typeof i!="function"&&typeof i!="symbol"?e.setAttribute(t,""):e.removeAttribute(t);break;case"capture":case"download":i===!0?e.setAttribute(t,""):i!==!1&&i!=null&&typeof i!="function"&&typeof i!="symbol"?e.setAttribute(t,i):e.removeAttribute(t);break;case"cols":case"rows":case"size":case"span":i!=null&&typeof i!="function"&&typeof i!="symbol"&&!isNaN(i)&&1<=i?e.setAttribute(t,i):e.removeAttribute(t);break;case"rowSpan":case"start":i==null||typeof i=="function"||typeof i=="symbol"||isNaN(i)?e.removeAttribute(t):e.setAttribute(t,i);break;case"popover":Ue("beforetoggle",e),Ue("toggle",e),fn(e,"popover",i);break;case"xlinkActuate":St(e,"http://www.w3.org/1999/xlink","xlink:actuate",i);break;case"xlinkArcrole":St(e,"http://www.w3.org/1999/xlink","xlink:arcrole",i);break;case"xlinkRole":St(e,"http://www.w3.org/1999/xlink","xlink:role",i);break;case"xlinkShow":St(e,"http://www.w3.org/1999/xlink","xlink:show",i);break;case"xlinkTitle":St(e,"http://www.w3.org/1999/xlink","xlink:title",i);break;case"xlinkType":St(e,"http://www.w3.org/1999/xlink","xlink:type",i);break;case"xmlBase":St(e,"http://www.w3.org/XML/1998/namespace","xml:base",i);break;case"xmlLang":St(e,"http://www.w3.org/XML/1998/namespace","xml:lang",i);break;case"xmlSpace":St(e,"http://www.w3.org/XML/1998/namespace","xml:space",i);break;case"is":fn(e,"is",i);break;case"innerText":case"textContent":break;default:(!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(t=Ib.get(t)||t,fn(e,t,i))}}function Kc(e,n,t,i,o,c){switch(t){case"style":Rd(e,i,c);break;case"dangerouslySetInnerHTML":if(i!=null){if(typeof i!="object"||!("__html"in i))throw Error(s(61));if(t=i.__html,t!=null){if(o.children!=null)throw Error(s(60));e.innerHTML=t}}break;case"children":typeof i=="string"?Li(e,i):(typeof i=="number"||typeof i=="bigint")&&Li(e,""+i);break;case"onScroll":i!=null&&Ue("scroll",e);break;case"onScrollEnd":i!=null&&Ue("scrollend",e);break;case"onClick":i!=null&&(e.onclick=$t);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!Bt.hasOwnProperty(t))e:{if(t[0]==="o"&&t[1]==="n"&&(o=t.endsWith("Capture"),n=t.slice(2,o?t.length-7:void 0),c=e[oe]||null,c=c!=null?c[t]:null,typeof c=="function"&&e.removeEventListener(n,c,o),typeof i=="function")){typeof c!="function"&&c!==null&&(t in e?e[t]=null:e.hasAttribute(t)&&e.removeAttribute(t)),e.addEventListener(n,i,o);break e}t in e?e[t]=i:i===!0?e.setAttribute(t,""):fn(e,t,i)}}}function Bn(e,n,t){switch(n){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":Ue("error",e),Ue("load",e);var i=!1,o=!1,c;for(c in t)if(t.hasOwnProperty(c)){var m=t[c];if(m!=null)switch(c){case"src":i=!0;break;case"srcSet":o=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(s(137,n));default:rn(e,n,c,m,t,null)}}o&&rn(e,n,"srcSet",t.srcSet,t,null),i&&rn(e,n,"src",t.src,t,null);return;case"input":Ue("invalid",e);var z=c=m=o=null,D=null,M=null;for(i in t)if(t.hasOwnProperty(i)){var B=t[i];if(B!=null)switch(i){case"name":o=B;break;case"type":m=B;break;case"checked":D=B;break;case"defaultChecked":M=B;break;case"value":c=B;break;case"defaultValue":z=B;break;case"children":case"dangerouslySetInnerHTML":if(B!=null)throw Error(s(137,n));break;default:rn(e,n,i,B,t,null)}}Dd(e,c,z,D,M,m,o,!1);return;case"select":Ue("invalid",e),i=m=c=null;for(o in t)if(t.hasOwnProperty(o)&&(z=t[o],z!=null))switch(o){case"value":c=z;break;case"defaultValue":m=z;break;case"multiple":i=z;default:rn(e,n,o,z,t,null)}n=c,t=m,e.multiple=!!i,n!=null?Ci(e,!!i,n,!1):t!=null&&Ci(e,!!i,t,!0);return;case"textarea":Ue("invalid",e),c=o=i=null;for(m in t)if(t.hasOwnProperty(m)&&(z=t[m],z!=null))switch(m){case"value":i=z;break;case"defaultValue":o=z;break;case"children":c=z;break;case"dangerouslySetInnerHTML":if(z!=null)throw Error(s(91));break;default:rn(e,n,m,z,t,null)}Ad(e,i,o,c);return;case"option":for(D in t)t.hasOwnProperty(D)&&(i=t[D],i!=null)&&(D==="selected"?e.selected=i&&typeof i!="function"&&typeof i!="symbol":rn(e,n,D,i,t,null));return;case"dialog":Ue("beforetoggle",e),Ue("toggle",e),Ue("cancel",e),Ue("close",e);break;case"iframe":case"object":Ue("load",e);break;case"video":case"audio":for(i=0;i<el.length;i++)Ue(el[i],e);break;case"image":Ue("error",e),Ue("load",e);break;case"details":Ue("toggle",e);break;case"embed":case"source":case"link":Ue("error",e),Ue("load",e);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(M in t)if(t.hasOwnProperty(M)&&(i=t[M],i!=null))switch(M){case"children":case"dangerouslySetInnerHTML":throw Error(s(137,n));default:rn(e,n,M,i,t,null)}return;default:if(uo(n)){for(B in t)t.hasOwnProperty(B)&&(i=t[B],i!==void 0&&Kc(e,n,B,i,t,void 0));return}}for(z in t)t.hasOwnProperty(z)&&(i=t[z],i!=null&&rn(e,n,z,i,t,null))}function az(e,n,t,i){switch(n){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var o=null,c=null,m=null,z=null,D=null,M=null,B=null;for(N in t){var Y=t[N];if(t.hasOwnProperty(N)&&Y!=null)switch(N){case"checked":break;case"value":break;case"defaultValue":D=Y;default:i.hasOwnProperty(N)||rn(e,n,N,null,i,Y)}}for(var W in i){var N=i[W];if(Y=t[W],i.hasOwnProperty(W)&&(N!=null||Y!=null))switch(W){case"type":c=N;break;case"name":o=N;break;case"checked":M=N;break;case"defaultChecked":B=N;break;case"value":m=N;break;case"defaultValue":z=N;break;case"children":case"dangerouslySetInnerHTML":if(N!=null)throw Error(s(137,n));break;default:N!==Y&&rn(e,n,W,N,i,Y)}}oo(e,m,z,D,M,B,c,o);return;case"select":N=m=z=W=null;for(c in t)if(D=t[c],t.hasOwnProperty(c)&&D!=null)switch(c){case"value":break;case"multiple":N=D;default:i.hasOwnProperty(c)||rn(e,n,c,null,i,D)}for(o in i)if(c=i[o],D=t[o],i.hasOwnProperty(o)&&(c!=null||D!=null))switch(o){case"value":W=c;break;case"defaultValue":z=c;break;case"multiple":m=c;default:c!==D&&rn(e,n,o,c,i,D)}n=z,t=m,i=N,W!=null?Ci(e,!!t,W,!1):!!i!=!!t&&(n!=null?Ci(e,!!t,n,!0):Ci(e,!!t,t?[]:"",!1));return;case"textarea":N=W=null;for(z in t)if(o=t[z],t.hasOwnProperty(z)&&o!=null&&!i.hasOwnProperty(z))switch(z){case"value":break;case"children":break;default:rn(e,n,z,null,i,o)}for(m in i)if(o=i[m],c=t[m],i.hasOwnProperty(m)&&(o!=null||c!=null))switch(m){case"value":W=o;break;case"defaultValue":N=o;break;case"children":break;case"dangerouslySetInnerHTML":if(o!=null)throw Error(s(91));break;default:o!==c&&rn(e,n,m,o,i,c)}Td(e,W,N);return;case"option":for(var me in t)W=t[me],t.hasOwnProperty(me)&&W!=null&&!i.hasOwnProperty(me)&&(me==="selected"?e.selected=!1:rn(e,n,me,null,i,W));for(D in i)W=i[D],N=t[D],i.hasOwnProperty(D)&&W!==N&&(W!=null||N!=null)&&(D==="selected"?e.selected=W&&typeof W!="function"&&typeof W!="symbol":rn(e,n,D,W,i,N));return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var De in t)W=t[De],t.hasOwnProperty(De)&&W!=null&&!i.hasOwnProperty(De)&&rn(e,n,De,null,i,W);for(M in i)if(W=i[M],N=t[M],i.hasOwnProperty(M)&&W!==N&&(W!=null||N!=null))switch(M){case"children":case"dangerouslySetInnerHTML":if(W!=null)throw Error(s(137,n));break;default:rn(e,n,M,W,i,N)}return;default:if(uo(n)){for(var ln in t)W=t[ln],t.hasOwnProperty(ln)&&W!==void 0&&!i.hasOwnProperty(ln)&&Kc(e,n,ln,void 0,i,W);for(B in i)W=i[B],N=t[B],!i.hasOwnProperty(B)||W===N||W===void 0&&N===void 0||Kc(e,n,B,W,i,N);return}}for(var k in t)W=t[k],t.hasOwnProperty(k)&&W!=null&&!i.hasOwnProperty(k)&&rn(e,n,k,null,i,W);for(Y in i)W=i[Y],N=t[Y],!i.hasOwnProperty(Y)||W===N||W==null&&N==null||rn(e,n,Y,W,i,N)}function Ih(e){switch(e){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function iz(){if(typeof performance.getEntriesByType=="function"){for(var e=0,n=0,t=performance.getEntriesByType("resource"),i=0;i<t.length;i++){var o=t[i],c=o.transferSize,m=o.initiatorType,z=o.duration;if(c&&z&&Ih(m)){for(m=0,z=o.responseEnd,i+=1;i<t.length;i++){var D=t[i],M=D.startTime;if(M>z)break;var B=D.transferSize,Y=D.initiatorType;B&&Ih(Y)&&(D=D.responseEnd,m+=B*(D<z?1:(z-M)/(D-M)))}if(--i,n+=8*(c+m)/(o.duration/1e3),e++,10<e)break}}if(0<e)return n/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e=="number")?e:5}var Jc=null,$c=null;function Rs(e){return e.nodeType===9?e:e.ownerDocument}function _h(e){switch(e){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function Mh(e,n){if(e===0)switch(n){case"svg":return 1;case"math":return 2;default:return 0}return e===1&&n==="foreignObject"?0:e}function eu(e,n){return e==="textarea"||e==="noscript"||typeof n.children=="string"||typeof n.children=="number"||typeof n.children=="bigint"||typeof n.dangerouslySetInnerHTML=="object"&&n.dangerouslySetInnerHTML!==null&&n.dangerouslySetInnerHTML.__html!=null}var nu=null;function rz(){var e=window.event;return e&&e.type==="popstate"?e===nu?!1:(nu=e,!0):(nu=null,!1)}var Ch=typeof setTimeout=="function"?setTimeout:void 0,lz=typeof clearTimeout=="function"?clearTimeout:void 0,Lh=typeof Promise=="function"?Promise:void 0,sz=typeof queueMicrotask=="function"?queueMicrotask:typeof Lh<"u"?function(e){return Lh.resolve(null).then(e).catch(oz)}:Ch;function oz(e){setTimeout(function(){throw e})}function Xa(e){return e==="head"}function Wh(e,n){var t=n,i=0;do{var o=t.nextSibling;if(e.removeChild(t),o&&o.nodeType===8)if(t=o.data,t==="/$"||t==="/&"){if(i===0){e.removeChild(o),dr(n);return}i--}else if(t==="$"||t==="$?"||t==="$~"||t==="$!"||t==="&")i++;else if(t==="html")tl(e.ownerDocument.documentElement);else if(t==="head"){t=e.ownerDocument.head,tl(t);for(var c=t.firstChild;c;){var m=c.nextSibling,z=c.nodeName;c[Pe]||z==="SCRIPT"||z==="STYLE"||z==="LINK"&&c.rel.toLowerCase()==="stylesheet"||t.removeChild(c),c=m}}else t==="body"&&tl(e.ownerDocument.body);t=o}while(t);dr(n)}function Oh(e,n){var t=e;e=0;do{var i=t.nextSibling;if(t.nodeType===1?n?(t._stashedDisplay=t.style.display,t.style.display="none"):(t.style.display=t._stashedDisplay||"",t.getAttribute("style")===""&&t.removeAttribute("style")):t.nodeType===3&&(n?(t._stashedText=t.nodeValue,t.nodeValue=""):t.nodeValue=t._stashedText||""),i&&i.nodeType===8)if(t=i.data,t==="/$"){if(e===0)break;e--}else t!=="$"&&t!=="$?"&&t!=="$~"&&t!=="$!"||e++;t=i}while(t)}function tu(e){var n=e.firstChild;for(n&&n.nodeType===10&&(n=n.nextSibling);n;){var t=n;switch(n=n.nextSibling,t.nodeName){case"HTML":case"HEAD":case"BODY":tu(t),on(t);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(t.rel.toLowerCase()==="stylesheet")continue}e.removeChild(t)}}function cz(e,n,t,i){for(;e.nodeType===1;){var o=t;if(e.nodeName.toLowerCase()!==n.toLowerCase()){if(!i&&(e.nodeName!=="INPUT"||e.type!=="hidden"))break}else if(i){if(!e[Pe])switch(n){case"meta":if(!e.hasAttribute("itemprop"))break;return e;case"link":if(c=e.getAttribute("rel"),c==="stylesheet"&&e.hasAttribute("data-precedence"))break;if(c!==o.rel||e.getAttribute("href")!==(o.href==null||o.href===""?null:o.href)||e.getAttribute("crossorigin")!==(o.crossOrigin==null?null:o.crossOrigin)||e.getAttribute("title")!==(o.title==null?null:o.title))break;return e;case"style":if(e.hasAttribute("data-precedence"))break;return e;case"script":if(c=e.getAttribute("src"),(c!==(o.src==null?null:o.src)||e.getAttribute("type")!==(o.type==null?null:o.type)||e.getAttribute("crossorigin")!==(o.crossOrigin==null?null:o.crossOrigin))&&c&&e.hasAttribute("async")&&!e.hasAttribute("itemprop"))break;return e;default:return e}}else if(n==="input"&&e.type==="hidden"){var c=o.name==null?null:""+o.name;if(o.type==="hidden"&&e.getAttribute("name")===c)return e}else return e;if(e=Rt(e.nextSibling),e===null)break}return null}function uz(e,n,t){if(n==="")return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!t||(e=Rt(e.nextSibling),e===null))return null;return e}function Ph(e,n){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!n||(e=Rt(e.nextSibling),e===null))return null;return e}function au(e){return e.data==="$?"||e.data==="$~"}function iu(e){return e.data==="$!"||e.data==="$?"&&e.ownerDocument.readyState!=="loading"}function dz(e,n){var t=e.ownerDocument;if(e.data==="$~")e._reactRetry=n;else if(e.data!=="$?"||t.readyState!=="loading")n();else{var i=function(){n(),t.removeEventListener("DOMContentLoaded",i)};t.addEventListener("DOMContentLoaded",i),e._reactRetry=i}}function Rt(e){for(;e!=null;e=e.nextSibling){var n=e.nodeType;if(n===1||n===3)break;if(n===8){if(n=e.data,n==="$"||n==="$!"||n==="$?"||n==="$~"||n==="&"||n==="F!"||n==="F")break;if(n==="/$"||n==="/&")return null}}return e}var ru=null;function Nh(e){e=e.nextSibling;for(var n=0;e;){if(e.nodeType===8){var t=e.data;if(t==="/$"||t==="/&"){if(n===0)return Rt(e.nextSibling);n--}else t!=="$"&&t!=="$!"&&t!=="$?"&&t!=="$~"&&t!=="&"||n++}e=e.nextSibling}return null}function Uh(e){e=e.previousSibling;for(var n=0;e;){if(e.nodeType===8){var t=e.data;if(t==="$"||t==="$!"||t==="$?"||t==="$~"||t==="&"){if(n===0)return e;n--}else t!=="/$"&&t!=="/&"||n++}e=e.previousSibling}return null}function jh(e,n,t){switch(n=Rs(t),e){case"html":if(e=n.documentElement,!e)throw Error(s(452));return e;case"head":if(e=n.head,!e)throw Error(s(453));return e;case"body":if(e=n.body,!e)throw Error(s(454));return e;default:throw Error(s(451))}}function tl(e){for(var n=e.attributes;n.length;)e.removeAttributeNode(n[0]);on(e)}var kt=new Map,Bh=new Set;function ks(e){return typeof e.getRootNode=="function"?e.getRootNode():e.nodeType===9?e:e.ownerDocument}var ma=K.d;K.d={f:fz,r:pz,D:hz,C:mz,L:gz,m:bz,X:zz,S:yz,M:Sz};function fz(){var e=ma.f(),n=Ss();return e||n}function pz(e){var n=yt(e);n!==null&&n.tag===5&&n.type==="form"?ip(n):ma.r(e)}var or=typeof document>"u"?null:document;function Xh(e,n,t){var i=or;if(i&&typeof n=="string"&&n){var o=vt(n);o='link[rel="'+e+'"][href="'+o+'"]',typeof t=="string"&&(o+='[crossorigin="'+t+'"]'),Bh.has(o)||(Bh.add(o),e={rel:e,crossOrigin:t,href:n},i.querySelector(o)===null&&(n=i.createElement("link"),Bn(n,"link",e),Sn(n),i.head.appendChild(n)))}}function hz(e){ma.D(e),Xh("dns-prefetch",e,null)}function mz(e,n){ma.C(e,n),Xh("preconnect",e,n)}function gz(e,n,t){ma.L(e,n,t);var i=or;if(i&&e&&n){var o='link[rel="preload"][as="'+vt(n)+'"]';n==="image"&&t&&t.imageSrcSet?(o+='[imagesrcset="'+vt(t.imageSrcSet)+'"]',typeof t.imageSizes=="string"&&(o+='[imagesizes="'+vt(t.imageSizes)+'"]')):o+='[href="'+vt(e)+'"]';var c=o;switch(n){case"style":c=cr(e);break;case"script":c=ur(e)}kt.has(c)||(e=y({rel:"preload",href:n==="image"&&t&&t.imageSrcSet?void 0:e,as:n},t),kt.set(c,e),i.querySelector(o)!==null||n==="style"&&i.querySelector(al(c))||n==="script"&&i.querySelector(il(c))||(n=i.createElement("link"),Bn(n,"link",e),Sn(n),i.head.appendChild(n)))}}function bz(e,n){ma.m(e,n);var t=or;if(t&&e){var i=n&&typeof n.as=="string"?n.as:"script",o='link[rel="modulepreload"][as="'+vt(i)+'"][href="'+vt(e)+'"]',c=o;switch(i){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":c=ur(e)}if(!kt.has(c)&&(e=y({rel:"modulepreload",href:e},n),kt.set(c,e),t.querySelector(o)===null)){switch(i){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(t.querySelector(il(c)))return}i=t.createElement("link"),Bn(i,"link",e),Sn(i),t.head.appendChild(i)}}}function yz(e,n,t){ma.S(e,n,t);var i=or;if(i&&e){var o=Pn(i).hoistableStyles,c=cr(e);n=n||"default";var m=o.get(c);if(!m){var z={loading:0,preload:null};if(m=i.querySelector(al(c)))z.loading=5;else{e=y({rel:"stylesheet",href:e,"data-precedence":n},t),(t=kt.get(c))&&lu(e,t);var D=m=i.createElement("link");Sn(D),Bn(D,"link",e),D._p=new Promise(function(M,B){D.onload=M,D.onerror=B}),D.addEventListener("load",function(){z.loading|=1}),D.addEventListener("error",function(){z.loading|=2}),z.loading|=4,Is(m,n,i)}m={type:"stylesheet",instance:m,count:1,state:z},o.set(c,m)}}}function zz(e,n){ma.X(e,n);var t=or;if(t&&e){var i=Pn(t).hoistableScripts,o=ur(e),c=i.get(o);c||(c=t.querySelector(il(o)),c||(e=y({src:e,async:!0},n),(n=kt.get(o))&&su(e,n),c=t.createElement("script"),Sn(c),Bn(c,"link",e),t.head.appendChild(c)),c={type:"script",instance:c,count:1,state:null},i.set(o,c))}}function Sz(e,n){ma.M(e,n);var t=or;if(t&&e){var i=Pn(t).hoistableScripts,o=ur(e),c=i.get(o);c||(c=t.querySelector(il(o)),c||(e=y({src:e,async:!0,type:"module"},n),(n=kt.get(o))&&su(e,n),c=t.createElement("script"),Sn(c),Bn(c,"link",e),t.head.appendChild(c)),c={type:"script",instance:c,count:1,state:null},i.set(o,c))}}function Zh(e,n,t,i){var o=(o=be.current)?ks(o):null;if(!o)throw Error(s(446));switch(e){case"meta":case"title":return null;case"style":return typeof t.precedence=="string"&&typeof t.href=="string"?(n=cr(t.href),t=Pn(o).hoistableStyles,i=t.get(n),i||(i={type:"style",instance:null,count:0,state:null},t.set(n,i)),i):{type:"void",instance:null,count:0,state:null};case"link":if(t.rel==="stylesheet"&&typeof t.href=="string"&&typeof t.precedence=="string"){e=cr(t.href);var c=Pn(o).hoistableStyles,m=c.get(e);if(m||(o=o.ownerDocument||o,m={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},c.set(e,m),(c=o.querySelector(al(e)))&&!c._p&&(m.instance=c,m.state.loading=5),kt.has(e)||(t={rel:"preload",as:"style",href:t.href,crossOrigin:t.crossOrigin,integrity:t.integrity,media:t.media,hrefLang:t.hrefLang,referrerPolicy:t.referrerPolicy},kt.set(e,t),c||vz(o,e,t,m.state))),n&&i===null)throw Error(s(528,""));return m}if(n&&i!==null)throw Error(s(529,""));return null;case"script":return n=t.async,t=t.src,typeof t=="string"&&n&&typeof n!="function"&&typeof n!="symbol"?(n=ur(t),t=Pn(o).hoistableScripts,i=t.get(n),i||(i={type:"script",instance:null,count:0,state:null},t.set(n,i)),i):{type:"void",instance:null,count:0,state:null};default:throw Error(s(444,e))}}function cr(e){return'href="'+vt(e)+'"'}function al(e){return'link[rel="stylesheet"]['+e+"]"}function Hh(e){return y({},e,{"data-precedence":e.precedence,precedence:null})}function vz(e,n,t,i){e.querySelector('link[rel="preload"][as="style"]['+n+"]")?i.loading=1:(n=e.createElement("link"),i.preload=n,n.addEventListener("load",function(){return i.loading|=1}),n.addEventListener("error",function(){return i.loading|=2}),Bn(n,"link",t),Sn(n),e.head.appendChild(n))}function ur(e){return'[src="'+vt(e)+'"]'}function il(e){return"script[async]"+e}function Vh(e,n,t){if(n.count++,n.instance===null)switch(n.type){case"style":var i=e.querySelector('style[data-href~="'+vt(t.href)+'"]');if(i)return n.instance=i,Sn(i),i;var o=y({},t,{"data-href":t.href,"data-precedence":t.precedence,href:null,precedence:null});return i=(e.ownerDocument||e).createElement("style"),Sn(i),Bn(i,"style",o),Is(i,t.precedence,e),n.instance=i;case"stylesheet":o=cr(t.href);var c=e.querySelector(al(o));if(c)return n.state.loading|=4,n.instance=c,Sn(c),c;i=Hh(t),(o=kt.get(o))&&lu(i,o),c=(e.ownerDocument||e).createElement("link"),Sn(c);var m=c;return m._p=new Promise(function(z,D){m.onload=z,m.onerror=D}),Bn(c,"link",i),n.state.loading|=4,Is(c,t.precedence,e),n.instance=c;case"script":return c=ur(t.src),(o=e.querySelector(il(c)))?(n.instance=o,Sn(o),o):(i=t,(o=kt.get(c))&&(i=y({},t),su(i,o)),e=e.ownerDocument||e,o=e.createElement("script"),Sn(o),Bn(o,"link",i),e.head.appendChild(o),n.instance=o);case"void":return null;default:throw Error(s(443,n.type))}else n.type==="stylesheet"&&(n.state.loading&4)===0&&(i=n.instance,n.state.loading|=4,Is(i,t.precedence,e));return n.instance}function Is(e,n,t){for(var i=t.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),o=i.length?i[i.length-1]:null,c=o,m=0;m<i.length;m++){var z=i[m];if(z.dataset.precedence===n)c=z;else if(c!==o)break}c?c.parentNode.insertBefore(e,c.nextSibling):(n=t.nodeType===9?t.head:t,n.insertBefore(e,n.firstChild))}function lu(e,n){e.crossOrigin==null&&(e.crossOrigin=n.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=n.referrerPolicy),e.title==null&&(e.title=n.title)}function su(e,n){e.crossOrigin==null&&(e.crossOrigin=n.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=n.referrerPolicy),e.integrity==null&&(e.integrity=n.integrity)}var _s=null;function qh(e,n,t){if(_s===null){var i=new Map,o=_s=new Map;o.set(t,i)}else o=_s,i=o.get(t),i||(i=new Map,o.set(t,i));if(i.has(e))return i;for(i.set(e,null),t=t.getElementsByTagName(e),o=0;o<t.length;o++){var c=t[o];if(!(c[Pe]||c[ce]||e==="link"&&c.getAttribute("rel")==="stylesheet")&&c.namespaceURI!=="http://www.w3.org/2000/svg"){var m=c.getAttribute(n)||"";m=e+m;var z=i.get(m);z?z.push(c):i.set(m,[c])}}return i}function Yh(e,n,t){e=e.ownerDocument||e,e.head.insertBefore(t,n==="title"?e.querySelector("head > title"):null)}function Ez(e,n,t){if(t===1||n.itemProp!=null)return!1;switch(e){case"meta":case"title":return!0;case"style":if(typeof n.precedence!="string"||typeof n.href!="string"||n.href==="")break;return!0;case"link":if(typeof n.rel!="string"||typeof n.href!="string"||n.href===""||n.onLoad||n.onError)break;return n.rel==="stylesheet"?(e=n.disabled,typeof n.precedence=="string"&&e==null):!0;case"script":if(n.async&&typeof n.async!="function"&&typeof n.async!="symbol"&&!n.onLoad&&!n.onError&&n.src&&typeof n.src=="string")return!0}return!1}function Gh(e){return!(e.type==="stylesheet"&&(e.state.loading&3)===0)}function xz(e,n,t,i){if(t.type==="stylesheet"&&(typeof i.media!="string"||matchMedia(i.media).matches!==!1)&&(t.state.loading&4)===0){if(t.instance===null){var o=cr(i.href),c=n.querySelector(al(o));if(c){n=c._p,n!==null&&typeof n=="object"&&typeof n.then=="function"&&(e.count++,e=Ms.bind(e),n.then(e,e)),t.state.loading|=4,t.instance=c,Sn(c);return}c=n.ownerDocument||n,i=Hh(i),(o=kt.get(o))&&lu(i,o),c=c.createElement("link"),Sn(c);var m=c;m._p=new Promise(function(z,D){m.onload=z,m.onerror=D}),Bn(c,"link",i),t.instance=c}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(t,n),(n=t.state.preload)&&(t.state.loading&3)===0&&(e.count++,t=Ms.bind(e),n.addEventListener("load",t),n.addEventListener("error",t))}}var ou=0;function Dz(e,n){return e.stylesheets&&e.count===0&&Ls(e,e.stylesheets),0<e.count||0<e.imgCount?function(t){var i=setTimeout(function(){if(e.stylesheets&&Ls(e,e.stylesheets),e.unsuspend){var c=e.unsuspend;e.unsuspend=null,c()}},6e4+n);0<e.imgBytes&&ou===0&&(ou=62500*iz());var o=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&Ls(e,e.stylesheets),e.unsuspend)){var c=e.unsuspend;e.unsuspend=null,c()}},(e.imgBytes>ou?50:800)+n);return e.unsuspend=t,function(){e.unsuspend=null,clearTimeout(i),clearTimeout(o)}}:null}function Ms(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)Ls(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}}var Cs=null;function Ls(e,n){e.stylesheets=null,e.unsuspend!==null&&(e.count++,Cs=new Map,n.forEach(Tz,e),Cs=null,Ms.call(e))}function Tz(e,n){if(!(n.state.loading&4)){var t=Cs.get(e);if(t)var i=t.get(null);else{t=new Map,Cs.set(e,t);for(var o=e.querySelectorAll("link[data-precedence],style[data-precedence]"),c=0;c<o.length;c++){var m=o[c];(m.nodeName==="LINK"||m.getAttribute("media")!=="not all")&&(t.set(m.dataset.precedence,m),i=m)}i&&t.set(null,i)}o=n.instance,m=o.getAttribute("data-precedence"),c=t.get(m)||i,c===i&&t.set(null,o),t.set(m,o),this.count++,i=Ms.bind(this),o.addEventListener("load",i),o.addEventListener("error",i),c?c.parentNode.insertBefore(o,c.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(o,e.firstChild)),n.state.loading|=4}}var rl={$$typeof:q,Provider:null,Consumer:null,_currentValue:le,_currentValue2:le,_threadCount:0};function Az(e,n,t,i,o,c,m,z,D){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=xa(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=xa(0),this.hiddenUpdates=xa(null),this.identifierPrefix=i,this.onUncaughtError=o,this.onCaughtError=c,this.onRecoverableError=m,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=D,this.incompleteTransitions=new Map}function Qh(e,n,t,i,o,c,m,z,D,M,B,Y){return e=new Az(e,n,t,m,D,M,B,Y,z),n=1,c===!0&&(n|=24),c=ot(3,null,null,n),e.current=c,c.stateNode=e,n=Bo(),n.refCount++,e.pooledCache=n,n.refCount++,c.memoizedState={element:i,isDehydrated:t,cache:n},Vo(c),e}function Fh(e){return e?(e=Bi,e):Bi}function Kh(e,n,t,i,o,c){o=Fh(o),i.context===null?i.context=o:i.pendingContext=o,i=_a(n),i.payload={element:t},c=c===void 0?null:c,c!==null&&(i.callback=c),t=Ma(e,i,n),t!==null&&(nt(t,e,n),Pr(t,e,n))}function Jh(e,n){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var t=e.retryLane;e.retryLane=t!==0&&t<n?t:n}}function cu(e,n){Jh(e,n),(e=e.alternate)&&Jh(e,n)}function $h(e){if(e.tag===13||e.tag===31){var n=di(e,67108864);n!==null&&nt(n,e,67108864),cu(e,67108864)}}function em(e){if(e.tag===13||e.tag===31){var n=pt();n=F(n);var t=di(e,n);t!==null&&nt(t,e,n),cu(e,n)}}var Ws=!0;function wz(e,n,t,i){var o=C.T;C.T=null;var c=K.p;try{K.p=2,uu(e,n,t,i)}finally{K.p=c,C.T=o}}function Rz(e,n,t,i){var o=C.T;C.T=null;var c=K.p;try{K.p=8,uu(e,n,t,i)}finally{K.p=c,C.T=o}}function uu(e,n,t,i){if(Ws){var o=du(i);if(o===null)Fc(e,n,i,Os,t),tm(e,i);else if(Iz(o,e,n,t,i))i.stopPropagation();else if(tm(e,i),n&4&&-1<kz.indexOf(e)){for(;o!==null;){var c=yt(o);if(c!==null)switch(c.tag){case 3:if(c=c.stateNode,c.current.memoizedState.isDehydrated){var m=Kt(c.pendingLanes);if(m!==0){var z=c;for(z.pendingLanes|=2,z.entangledLanes|=2;m;){var D=1<<31-Ke(m);z.entanglements[1]|=D,m&=~D}Vt(c),(Ge&6)===0&&(ys=yn()+500,$r(0))}}break;case 31:case 13:z=di(c,2),z!==null&&nt(z,c,2),Ss(),cu(c,2)}if(c=du(i),c===null&&Fc(e,n,i,Os,t),c===o)break;o=c}o!==null&&i.stopPropagation()}else Fc(e,n,i,null,t)}}function du(e){return e=po(e),fu(e)}var Os=null;function fu(e){if(Os=null,e=lt(e),e!==null){var n=d(e);if(n===null)e=null;else{var t=n.tag;if(t===13){if(e=f(n),e!==null)return e;e=null}else if(t===31){if(e=h(n),e!==null)return e;e=null}else if(t===3){if(n.stateNode.current.memoizedState.isDehydrated)return n.tag===3?n.stateNode.containerInfo:null;e=null}else n!==e&&(e=null)}}return Os=e,null}function nm(e){switch(e){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(Ft()){case H:return 2;case ae:return 8;case ve:case we:return 32;case Ve:return 268435456;default:return 32}default:return 32}}var pu=!1,Za=null,Ha=null,Va=null,ll=new Map,sl=new Map,qa=[],kz="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function tm(e,n){switch(e){case"focusin":case"focusout":Za=null;break;case"dragenter":case"dragleave":Ha=null;break;case"mouseover":case"mouseout":Va=null;break;case"pointerover":case"pointerout":ll.delete(n.pointerId);break;case"gotpointercapture":case"lostpointercapture":sl.delete(n.pointerId)}}function ol(e,n,t,i,o,c){return e===null||e.nativeEvent!==c?(e={blockedOn:n,domEventName:t,eventSystemFlags:i,nativeEvent:c,targetContainers:[o]},n!==null&&(n=yt(n),n!==null&&$h(n)),e):(e.eventSystemFlags|=i,n=e.targetContainers,o!==null&&n.indexOf(o)===-1&&n.push(o),e)}function Iz(e,n,t,i,o){switch(n){case"focusin":return Za=ol(Za,e,n,t,i,o),!0;case"dragenter":return Ha=ol(Ha,e,n,t,i,o),!0;case"mouseover":return Va=ol(Va,e,n,t,i,o),!0;case"pointerover":var c=o.pointerId;return ll.set(c,ol(ll.get(c)||null,e,n,t,i,o)),!0;case"gotpointercapture":return c=o.pointerId,sl.set(c,ol(sl.get(c)||null,e,n,t,i,o)),!0}return!1}function am(e){var n=lt(e.target);if(n!==null){var t=d(n);if(t!==null){if(n=t.tag,n===13){if(n=f(t),n!==null){e.blockedOn=n,Te(e.priority,function(){em(t)});return}}else if(n===31){if(n=h(t),n!==null){e.blockedOn=n,Te(e.priority,function(){em(t)});return}}else if(n===3&&t.stateNode.current.memoizedState.isDehydrated){e.blockedOn=t.tag===3?t.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Ps(e){if(e.blockedOn!==null)return!1;for(var n=e.targetContainers;0<n.length;){var t=du(e.nativeEvent);if(t===null){t=e.nativeEvent;var i=new t.constructor(t.type,t);fo=i,t.target.dispatchEvent(i),fo=null}else return n=yt(t),n!==null&&$h(n),e.blockedOn=t,!1;n.shift()}return!0}function im(e,n,t){Ps(e)&&t.delete(n)}function _z(){pu=!1,Za!==null&&Ps(Za)&&(Za=null),Ha!==null&&Ps(Ha)&&(Ha=null),Va!==null&&Ps(Va)&&(Va=null),ll.forEach(im),sl.forEach(im)}function Ns(e,n){e.blockedOn===n&&(e.blockedOn=null,pu||(pu=!0,a.unstable_scheduleCallback(a.unstable_NormalPriority,_z)))}var Us=null;function rm(e){Us!==e&&(Us=e,a.unstable_scheduleCallback(a.unstable_NormalPriority,function(){Us===e&&(Us=null);for(var n=0;n<e.length;n+=3){var t=e[n],i=e[n+1],o=e[n+2];if(typeof i!="function"){if(fu(i||t)===null)continue;break}var c=yt(t);c!==null&&(e.splice(n,3),n-=3,dc(c,{pending:!0,data:o,method:t.method,action:i},i,o))}}))}function dr(e){function n(D){return Ns(D,e)}Za!==null&&Ns(Za,e),Ha!==null&&Ns(Ha,e),Va!==null&&Ns(Va,e),ll.forEach(n),sl.forEach(n);for(var t=0;t<qa.length;t++){var i=qa[t];i.blockedOn===e&&(i.blockedOn=null)}for(;0<qa.length&&(t=qa[0],t.blockedOn===null);)am(t),t.blockedOn===null&&qa.shift();if(t=(e.ownerDocument||e).$$reactFormReplay,t!=null)for(i=0;i<t.length;i+=3){var o=t[i],c=t[i+1],m=o[oe]||null;if(typeof c=="function")m||rm(t);else if(m){var z=null;if(c&&c.hasAttribute("formAction")){if(o=c,m=c[oe]||null)z=m.formAction;else if(fu(o)!==null)continue}else z=m.action;typeof z=="function"?t[i+1]=z:(t.splice(i,3),i-=3),rm(t)}}}function lm(){function e(c){c.canIntercept&&c.info==="react-transition"&&c.intercept({handler:function(){return new Promise(function(m){return o=m})},focusReset:"manual",scroll:"manual"})}function n(){o!==null&&(o(),o=null),i||setTimeout(t,20)}function t(){if(!i&&!navigation.transition){var c=navigation.currentEntry;c&&c.url!=null&&navigation.navigate(c.url,{state:c.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var i=!1,o=null;return navigation.addEventListener("navigate",e),navigation.addEventListener("navigatesuccess",n),navigation.addEventListener("navigateerror",n),setTimeout(t,100),function(){i=!0,navigation.removeEventListener("navigate",e),navigation.removeEventListener("navigatesuccess",n),navigation.removeEventListener("navigateerror",n),o!==null&&(o(),o=null)}}}function hu(e){this._internalRoot=e}js.prototype.render=hu.prototype.render=function(e){var n=this._internalRoot;if(n===null)throw Error(s(409));var t=n.current,i=pt();Kh(t,i,e,n,null,null)},js.prototype.unmount=hu.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var n=e.containerInfo;Kh(e.current,2,null,e,null,null),Ss(),n[ge]=null}};function js(e){this._internalRoot=e}js.prototype.unstable_scheduleHydration=function(e){if(e){var n=Ee();e={blockedOn:null,target:e,priority:n};for(var t=0;t<qa.length&&n!==0&&n<qa[t].priority;t++);qa.splice(t,0,e),t===0&&am(e)}};var sm=r.version;if(sm!=="19.2.3")throw Error(s(527,sm,"19.2.3"));K.findDOMNode=function(e){var n=e._reactInternals;if(n===void 0)throw typeof e.render=="function"?Error(s(188)):(e=Object.keys(e).join(","),Error(s(268,e)));return e=p(n),e=e!==null?b(e):null,e=e===null?null:e.stateNode,e};var Mz={bundleType:0,version:"19.2.3",rendererPackageName:"react-dom",currentDispatcherRef:C,reconcilerVersion:"19.2.3"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Bs=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Bs.isDisabled&&Bs.supportsFiber)try{mn=Bs.inject(Mz),zn=Bs}catch{}}return ul.createRoot=function(e,n){if(!u(e))throw Error(s(299));var t=!1,i="",o=hp,c=mp,m=gp;return n!=null&&(n.unstable_strictMode===!0&&(t=!0),n.identifierPrefix!==void 0&&(i=n.identifierPrefix),n.onUncaughtError!==void 0&&(o=n.onUncaughtError),n.onCaughtError!==void 0&&(c=n.onCaughtError),n.onRecoverableError!==void 0&&(m=n.onRecoverableError)),n=Qh(e,1,!1,null,null,t,i,null,o,c,m,lm),e[ge]=n.current,Qc(e),new hu(n)},ul.hydrateRoot=function(e,n,t){if(!u(e))throw Error(s(299));var i=!1,o="",c=hp,m=mp,z=gp,D=null;return t!=null&&(t.unstable_strictMode===!0&&(i=!0),t.identifierPrefix!==void 0&&(o=t.identifierPrefix),t.onUncaughtError!==void 0&&(c=t.onUncaughtError),t.onCaughtError!==void 0&&(m=t.onCaughtError),t.onRecoverableError!==void 0&&(z=t.onRecoverableError),t.formState!==void 0&&(D=t.formState)),n=Qh(e,1,!0,n,t??null,i,o,D,c,m,z,lm),n.context=Fh(null),t=n.current,i=pt(),i=F(i),o=_a(i),o.callback=null,Ma(t,o,i),t=i,n.current.lanes=t,li(n,t),Vt(n),e[ge]=n.current,Qc(e),new js(n)},ul.version="19.2.3",ul}var bm;function Xz(){if(bm)return bu.exports;bm=1;function a(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(a)}catch(r){console.error(r)}}return a(),bu.exports=Bz(),bu.exports}var Zz=Xz(),Rg=wg();const Hz=no(Rg),Vz=Tg({__proto__:null,default:Hz},[Rg]);function bn(){return bn=Object.assign?Object.assign.bind():function(a){for(var r=1;r<arguments.length;r++){var l=arguments[r];for(var s in l)Object.prototype.hasOwnProperty.call(l,s)&&(a[s]=l[s])}return a},bn.apply(this,arguments)}var _n;(function(a){a.Pop="POP",a.Push="PUSH",a.Replace="REPLACE"})(_n||(_n={}));const ym="popstate";function qz(a){a===void 0&&(a={});function r(s,u){let{pathname:d,search:f,hash:h}=s.location;return El("",{pathname:d,search:f,hash:h},u.state&&u.state.usr||null,u.state&&u.state.key||"default")}function l(s,u){return typeof u=="string"?u:Ri(u)}return Gz(r,l,null,a)}function Oe(a,r){if(a===!1||a===null||typeof a>"u")throw new Error(r)}function wi(a,r){if(!a){typeof console<"u"&&console.warn(r);try{throw new Error(r)}catch{}}}function Yz(){return Math.random().toString(36).substr(2,8)}function zm(a,r){return{usr:a.state,key:a.key,idx:r}}function El(a,r,l,s){return l===void 0&&(l=null),bn({pathname:typeof a=="string"?a:a.pathname,search:"",hash:""},typeof r=="string"?Ja(r):r,{state:l,key:r&&r.key||s||Yz()})}function Ri(a){let{pathname:r="/",search:l="",hash:s=""}=a;return l&&l!=="?"&&(r+=l.charAt(0)==="?"?l:"?"+l),s&&s!=="#"&&(r+=s.charAt(0)==="#"?s:"#"+s),r}function Ja(a){let r={};if(a){let l=a.indexOf("#");l>=0&&(r.hash=a.substr(l),a=a.substr(0,l));let s=a.indexOf("?");s>=0&&(r.search=a.substr(s),a=a.substr(0,s)),a&&(r.pathname=a)}return r}function Gz(a,r,l,s){s===void 0&&(s={});let{window:u=document.defaultView,v5Compat:d=!1}=s,f=u.history,h=_n.Pop,g=null,p=b();p==null&&(p=0,f.replaceState(bn({},f.state,{idx:p}),""));function b(){return(f.state||{idx:null}).idx}function y(){h=_n.Pop;let Z=b(),U=Z==null?null:Z-p;p=Z,g&&g({action:h,location:O.location,delta:U})}function v(Z,U){h=_n.Push;let G=El(O.location,Z,U);p=b()+1;let q=zm(G,p),de=O.createHref(G);try{f.pushState(q,"",de)}catch(ze){if(ze instanceof DOMException&&ze.name==="DataCloneError")throw ze;u.location.assign(de)}d&&g&&g({action:h,location:O.location,delta:1})}function S(Z,U){h=_n.Replace;let G=El(O.location,Z,U);p=b();let q=zm(G,p),de=O.createHref(G);f.replaceState(q,"",de),d&&g&&g({action:h,location:O.location,delta:0})}function L(Z){let U=u.location.origin!=="null"?u.location.origin:u.location.href,G=typeof Z=="string"?Z:Ri(Z);return G=G.replace(/ $/,"%20"),Oe(U,"No window.location.(origin|href) available to create URL for href: "+G),new URL(G,U)}let O={get action(){return h},get location(){return a(u,f)},listen(Z){if(g)throw new Error("A history only accepts one active listener");return u.addEventListener(ym,y),g=Z,()=>{u.removeEventListener(ym,y),g=null}},createHref(Z){return r(u,Z)},createURL:L,encodeLocation(Z){let U=L(Z);return{pathname:U.pathname,search:U.search,hash:U.hash}},push:v,replace:S,go(Z){return f.go(Z)}};return O}var tn;(function(a){a.data="data",a.deferred="deferred",a.redirect="redirect",a.error="error"})(tn||(tn={}));const Qz=new Set(["lazy","caseSensitive","path","id","index","children"]);function Fz(a){return a.index===!0}function Gs(a,r,l,s){return l===void 0&&(l=[]),s===void 0&&(s={}),a.map((u,d)=>{let f=[...l,String(d)],h=typeof u.id=="string"?u.id:f.join("-");if(Oe(u.index!==!0||!u.children,"Cannot specify children on an index route"),Oe(!s[h],'Found a route id collision on id "'+h+`".  Route id's must be globally unique within Data Router usages`),Fz(u)){let g=bn({},u,r(u),{id:h});return s[h]=g,g}else{let g=bn({},u,r(u),{id:h,children:void 0});return s[h]=g,u.children&&(g.children=Gs(u.children,r,f,s)),g}})}function Di(a,r,l){return l===void 0&&(l="/"),qs(a,r,l,!1)}function qs(a,r,l,s){let u=typeof r=="string"?Ja(r):r,d=ba(u.pathname||"/",l);if(d==null)return null;let f=kg(a);Jz(f);let h=null;for(let g=0;h==null&&g<f.length;++g){let p=cS(d);h=sS(f[g],p,s)}return h}function Kz(a,r){let{route:l,pathname:s,params:u}=a;return{id:l.id,pathname:s,params:u,data:r[l.id],handle:l.handle}}function kg(a,r,l,s){r===void 0&&(r=[]),l===void 0&&(l=[]),s===void 0&&(s="");let u=(d,f,h)=>{let g={relativePath:h===void 0?d.path||"":h,caseSensitive:d.caseSensitive===!0,childrenIndex:f,route:d};g.relativePath.startsWith("/")&&(Oe(g.relativePath.startsWith(s),'Absolute route path "'+g.relativePath+'" nested under path '+('"'+s+'" is not valid. An absolute child route path ')+"must start with the combined path of all its parent routes."),g.relativePath=g.relativePath.slice(s.length));let p=ga([s,g.relativePath]),b=l.concat(g);d.children&&d.children.length>0&&(Oe(d.index!==!0,"Index routes must not have child routes. Please remove "+('all child routes from route path "'+p+'".')),kg(d.children,r,b,p)),!(d.path==null&&!d.index)&&r.push({path:p,score:rS(p,d.index),routesMeta:b})};return a.forEach((d,f)=>{var h;if(d.path===""||!((h=d.path)!=null&&h.includes("?")))u(d,f);else for(let g of Ig(d.path))u(d,f,g)}),r}function Ig(a){let r=a.split("/");if(r.length===0)return[];let[l,...s]=r,u=l.endsWith("?"),d=l.replace(/\?$/,"");if(s.length===0)return u?[d,""]:[d];let f=Ig(s.join("/")),h=[];return h.push(...f.map(g=>g===""?d:[d,g].join("/"))),u&&h.push(...f),h.map(g=>a.startsWith("/")&&g===""?"/":g)}function Jz(a){a.sort((r,l)=>r.score!==l.score?l.score-r.score:lS(r.routesMeta.map(s=>s.childrenIndex),l.routesMeta.map(s=>s.childrenIndex)))}const $z=/^:[\w-]+$/,eS=3,nS=2,tS=1,aS=10,iS=-2,Sm=a=>a==="*";function rS(a,r){let l=a.split("/"),s=l.length;return l.some(Sm)&&(s+=iS),r&&(s+=nS),l.filter(u=>!Sm(u)).reduce((u,d)=>u+($z.test(d)?eS:d===""?tS:aS),s)}function lS(a,r){return a.length===r.length&&a.slice(0,-1).every((s,u)=>s===r[u])?a[a.length-1]-r[r.length-1]:0}function sS(a,r,l){l===void 0&&(l=!1);let{routesMeta:s}=a,u={},d="/",f=[];for(let h=0;h<s.length;++h){let g=s[h],p=h===s.length-1,b=d==="/"?r:r.slice(d.length)||"/",y=Qs({path:g.relativePath,caseSensitive:g.caseSensitive,end:p},b),v=g.route;if(!y&&p&&l&&!s[s.length-1].route.index&&(y=Qs({path:g.relativePath,caseSensitive:g.caseSensitive,end:!1},b)),!y)return null;Object.assign(u,y.params),f.push({params:u,pathname:ga([d,y.pathname]),pathnameBase:pS(ga([d,y.pathnameBase])),route:v}),y.pathnameBase!=="/"&&(d=ga([d,y.pathnameBase]))}return f}function Qs(a,r){typeof a=="string"&&(a={path:a,caseSensitive:!1,end:!0});let[l,s]=oS(a.path,a.caseSensitive,a.end),u=r.match(l);if(!u)return null;let d=u[0],f=d.replace(/(.)\/+$/,"$1"),h=u.slice(1);return{params:s.reduce((p,b,y)=>{let{paramName:v,isOptional:S}=b;if(v==="*"){let O=h[y]||"";f=d.slice(0,d.length-O.length).replace(/(.)\/+$/,"$1")}const L=h[y];return S&&!L?p[v]=void 0:p[v]=(L||"").replace(/%2F/g,"/"),p},{}),pathname:d,pathnameBase:f,pattern:a}}function oS(a,r,l){r===void 0&&(r=!1),l===void 0&&(l=!0),wi(a==="*"||!a.endsWith("*")||a.endsWith("/*"),'Route path "'+a+'" will be treated as if it were '+('"'+a.replace(/\*$/,"/*")+'" because the `*` character must ')+"always follow a `/` in the pattern. To get rid of this warning, "+('please change the route path to "'+a.replace(/\*$/,"/*")+'".'));let s=[],u="^"+a.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(f,h,g)=>(s.push({paramName:h,isOptional:g!=null}),g?"/?([^\\/]+)?":"/([^\\/]+)"));return a.endsWith("*")?(s.push({paramName:"*"}),u+=a==="*"||a==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):l?u+="\\/*$":a!==""&&a!=="/"&&(u+="(?:(?=\\/|$))"),[new RegExp(u,r?void 0:"i"),s]}function cS(a){try{return a.split("/").map(r=>decodeURIComponent(r).replace(/\//g,"%2F")).join("/")}catch(r){return wi(!1,'The URL path "'+a+'" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent '+("encoding ("+r+").")),a}}function ba(a,r){if(r==="/")return a;if(!a.toLowerCase().startsWith(r.toLowerCase()))return null;let l=r.endsWith("/")?r.length-1:r.length,s=a.charAt(l);return s&&s!=="/"?null:a.slice(l)||"/"}const uS=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,dS=a=>uS.test(a);function fS(a,r){r===void 0&&(r="/");let{pathname:l,search:s="",hash:u=""}=typeof a=="string"?Ja(a):a,d;if(l)if(dS(l))d=l;else{if(l.includes("//")){let f=l;l=l.replace(/\/\/+/g,"/"),wi(!1,"Pathnames cannot have embedded double slashes - normalizing "+(f+" -> "+l))}l.startsWith("/")?d=vm(l.substring(1),"/"):d=vm(l,r)}else d=r;return{pathname:d,search:hS(s),hash:mS(u)}}function vm(a,r){let l=r.replace(/\/+$/,"").split("/");return a.split("/").forEach(u=>{u===".."?l.length>1&&l.pop():u!=="."&&l.push(u)}),l.length>1?l.join("/"):"/"}function vu(a,r,l,s){return"Cannot include a '"+a+"' character in a manually specified "+("`to."+r+"` field ["+JSON.stringify(s)+"].  Please separate it out to the ")+("`to."+l+"` field. Alternatively you may provide the full path as ")+'a string in <Link to="..."> and the router will parse it for you.'}function _g(a){return a.filter((r,l)=>l===0||r.route.path&&r.route.path.length>0)}function nd(a,r){let l=_g(a);return r?l.map((s,u)=>u===l.length-1?s.pathname:s.pathnameBase):l.map(s=>s.pathnameBase)}function td(a,r,l,s){s===void 0&&(s=!1);let u;typeof a=="string"?u=Ja(a):(u=bn({},a),Oe(!u.pathname||!u.pathname.includes("?"),vu("?","pathname","search",u)),Oe(!u.pathname||!u.pathname.includes("#"),vu("#","pathname","hash",u)),Oe(!u.search||!u.search.includes("#"),vu("#","search","hash",u)));let d=a===""||u.pathname==="",f=d?"/":u.pathname,h;if(f==null)h=l;else{let y=r.length-1;if(!s&&f.startsWith("..")){let v=f.split("/");for(;v[0]==="..";)v.shift(),y-=1;u.pathname=v.join("/")}h=y>=0?r[y]:"/"}let g=fS(u,h),p=f&&f!=="/"&&f.endsWith("/"),b=(d||f===".")&&l.endsWith("/");return!g.pathname.endsWith("/")&&(p||b)&&(g.pathname+="/"),g}const ga=a=>a.join("/").replace(/\/\/+/g,"/"),pS=a=>a.replace(/\/+$/,"").replace(/^\/*/,"/"),hS=a=>!a||a==="?"?"":a.startsWith("?")?a:"?"+a,mS=a=>!a||a==="#"?"":a.startsWith("#")?a:"#"+a;class Fs{constructor(r,l,s,u){u===void 0&&(u=!1),this.status=r,this.statusText=l||"",this.internal=u,s instanceof Error?(this.data=s.toString(),this.error=s):this.data=s}}function xl(a){return a!=null&&typeof a.status=="number"&&typeof a.statusText=="string"&&typeof a.internal=="boolean"&&"data"in a}const Mg=["post","put","patch","delete"],gS=new Set(Mg),bS=["get",...Mg],yS=new Set(bS),zS=new Set([301,302,303,307,308]),SS=new Set([307,308]),Eu={state:"idle",location:void 0,formMethod:void 0,formAction:void 0,formEncType:void 0,formData:void 0,json:void 0,text:void 0},vS={state:"idle",data:void 0,formMethod:void 0,formAction:void 0,formEncType:void 0,formData:void 0,json:void 0,text:void 0},dl={state:"unblocked",proceed:void 0,reset:void 0,location:void 0},ad=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,ES=a=>({hasErrorBoundary:!!a.hasErrorBoundary}),Cg="remix-router-transitions";function xS(a){const r=a.window?a.window:typeof window<"u"?window:void 0,l=typeof r<"u"&&typeof r.document<"u"&&typeof r.document.createElement<"u",s=!l;Oe(a.routes.length>0,"You must provide a non-empty routes array to createRouter");let u;if(a.mapRouteProperties)u=a.mapRouteProperties;else if(a.detectErrorBoundary){let A=a.detectErrorBoundary;u=I=>({hasErrorBoundary:A(I)})}else u=ES;let d={},f=Gs(a.routes,u,void 0,d),h,g=a.basename||"/",p=a.dataStrategy||wS,b=a.patchRoutesOnNavigation,y=bn({v7_fetcherPersist:!1,v7_normalizeFormMethod:!1,v7_partialHydration:!1,v7_prependBasename:!1,v7_relativeSplatPath:!1,v7_skipActionErrorRevalidation:!1},a.future),v=null,S=new Set,L=null,O=null,Z=null,U=a.hydrationData!=null,G=Di(f,a.history.location,g),q=!1,de=null;if(G==null&&!b){let A=at(404,{pathname:a.history.location.pathname}),{matches:I,route:P}=Mm(f);G=I,de={[P.id]:A}}G&&!a.hydrationData&&ri(G,f,a.history.location.pathname).active&&(G=null);let ze;if(G)if(G.some(A=>A.route.lazy))ze=!1;else if(!G.some(A=>A.route.loader))ze=!0;else if(y.v7_partialHydration){let A=a.hydrationData?a.hydrationData.loaderData:null,I=a.hydrationData?a.hydrationData.errors:null;if(I){let P=G.findIndex(F=>I[F.route.id]!==void 0);ze=G.slice(0,P+1).every(F=>!Bu(F.route,A,I))}else ze=G.every(P=>!Bu(P.route,A,I))}else ze=a.hydrationData!=null;else if(ze=!1,G=[],y.v7_partialHydration){let A=ri(null,f,a.history.location.pathname);A.active&&A.matches&&(q=!0,G=A.matches)}let X,R={historyAction:a.history.action,location:a.history.location,matches:G,initialized:ze,navigation:Eu,restoreScrollPosition:a.hydrationData!=null?!1:null,preventScrollReset:!1,revalidation:"idle",loaderData:a.hydrationData&&a.hydrationData.loaderData||{},actionData:a.hydrationData&&a.hydrationData.actionData||null,errors:a.hydrationData&&a.hydrationData.errors||de,fetchers:new Map,blockers:new Map},te=_n.Pop,he=!1,ue,ie=!1,ne=new Map,Ae=null,fe=!1,$=!1,C=[],K=new Set,le=new Map,Me=0,x=-1,T=new Map,j=new Set,E=new Map,re=new Map,ye=new Set,be=new Map,Ie=new Map,Je;function Fe(){if(v=a.history.listen(A=>{let{action:I,location:P,delta:F}=A;if(Je){Je(),Je=void 0;return}wi(Ie.size===0||F!=null,"You are trying to use a blocker on a POP navigation to a location that was not created by @remix-run/router. This will fail silently in production. This can happen if you are navigating outside the router via `window.history.pushState`/`window.location.hash` instead of using router navigation APIs.  This can also happen if you are using createHashRouter and the user manually changes the URL.");let se=ti({currentLocation:R.location,nextLocation:P,historyAction:I});if(se&&F!=null){let Ee=new Promise(Te=>{Je=Te});a.history.go(F*-1),Mi(se,{state:"blocked",location:P,proceed(){Mi(se,{state:"proceeding",proceed:void 0,reset:void 0,location:P}),Ee.then(()=>a.history.go(F))},reset(){let Te=new Map(R.blockers);Te.set(se,dl),xn({blockers:Te})}});return}return Yn(I,P)}),l){BS(r,ne);let A=()=>XS(r,ne);r.addEventListener("pagehide",A),Ae=()=>r.removeEventListener("pagehide",A)}return R.initialized||Yn(_n.Pop,R.location,{initialHydration:!0}),X}function qn(){v&&v(),Ae&&Ae(),S.clear(),ue&&ue.abort(),R.fetchers.forEach((A,I)=>Ln(I)),R.blockers.forEach((A,I)=>Gn(I))}function _t(A){return S.add(A),()=>S.delete(A)}function xn(A,I){I===void 0&&(I={}),R=bn({},R,A);let P=[],F=[];y.v7_fetcherPersist&&R.fetchers.forEach((se,Ee)=>{se.state==="idle"&&(ye.has(Ee)?F.push(Ee):P.push(Ee))}),ye.forEach(se=>{!R.fetchers.has(se)&&!le.has(se)&&F.push(se)}),[...S].forEach(se=>se(R,{deletedFetchers:F,viewTransitionOpts:I.viewTransitionOpts,flushSync:I.flushSync===!0})),y.v7_fetcherPersist?(P.forEach(se=>R.fetchers.delete(se)),F.forEach(se=>Ln(se))):F.forEach(se=>ye.delete(se))}function Mt(A,I,P){var F,se;let{flushSync:Ee}=P===void 0?{}:P,Te=R.actionData!=null&&R.navigation.formMethod!=null&&Ut(R.navigation.formMethod)&&R.navigation.state==="loading"&&((F=A.state)==null?void 0:F._isRedirect)!==!0,pe;I.actionData?Object.keys(I.actionData).length>0?pe=I.actionData:pe=null:Te?pe=R.actionData:pe=null;let ce=I.loaderData?Im(R.loaderData,I.loaderData,I.matches||[],I.errors):R.loaderData,oe=R.blockers;oe.size>0&&(oe=new Map(oe),oe.forEach((je,Mn)=>oe.set(Mn,dl)));let ge=he===!0||R.navigation.formMethod!=null&&Ut(R.navigation.formMethod)&&((se=A.state)==null?void 0:se._isRedirect)!==!0;h&&(f=h,h=void 0),fe||te===_n.Pop||(te===_n.Push?a.history.push(A,A.state):te===_n.Replace&&a.history.replace(A,A.state));let ke;if(te===_n.Pop){let je=ne.get(R.location.pathname);je&&je.has(A.pathname)?ke={currentLocation:R.location,nextLocation:A}:ne.has(A.pathname)&&(ke={currentLocation:A,nextLocation:R.location})}else if(ie){let je=ne.get(R.location.pathname);je?je.add(A.pathname):(je=new Set([A.pathname]),ne.set(R.location.pathname,je)),ke={currentLocation:R.location,nextLocation:A}}xn(bn({},I,{actionData:pe,loaderData:ce,historyAction:te,location:A,initialized:!0,navigation:Eu,revalidation:"idle",restoreScrollPosition:_l(A,I.matches||R.matches),preventScrollReset:ge,blockers:oe}),{viewTransitionOpts:ke,flushSync:Ee===!0}),te=_n.Pop,he=!1,ie=!1,fe=!1,$=!1,C=[]}async function bt(A,I){if(typeof A=="number"){a.history.go(A);return}let P=ju(R.location,R.matches,g,y.v7_prependBasename,A,y.v7_relativeSplatPath,I?.fromRouteId,I?.relative),{path:F,submission:se,error:Ee}=Em(y.v7_normalizeFormMethod,!1,P,I),Te=R.location,pe=El(R.location,F,I&&I.state);pe=bn({},pe,a.history.encodeLocation(pe));let ce=I&&I.replace!=null?I.replace:void 0,oe=_n.Push;ce===!0?oe=_n.Replace:ce===!1||se!=null&&Ut(se.formMethod)&&se.formAction===R.location.pathname+R.location.search&&(oe=_n.Replace);let ge=I&&"preventScrollReset"in I?I.preventScrollReset===!0:void 0,ke=(I&&I.flushSync)===!0,je=ti({currentLocation:Te,nextLocation:pe,historyAction:oe});if(je){Mi(je,{state:"blocked",location:pe,proceed(){Mi(je,{state:"proceeding",proceed:void 0,reset:void 0,location:pe}),bt(A,I)},reset(){let Mn=new Map(R.blockers);Mn.set(je,dl),xn({blockers:Mn})}});return}return await Yn(oe,pe,{submission:se,pendingError:Ee,preventScrollReset:ge,replace:I&&I.replace,enableViewTransition:I&&I.viewTransition,flushSync:ke})}function za(){if(ae(),xn({revalidation:"loading"}),R.navigation.state!=="submitting"){if(R.navigation.state==="idle"){Yn(R.historyAction,R.location,{startUninterruptedRevalidation:!0});return}Yn(te||R.historyAction,R.navigation.location,{overrideNavigation:R.navigation,enableViewTransition:ie===!0})}}async function Yn(A,I,P){ue&&ue.abort(),ue=null,te=A,fe=(P&&P.startUninterruptedRevalidation)===!0,ii(R.location,R.matches),he=(P&&P.preventScrollReset)===!0,ie=(P&&P.enableViewTransition)===!0;let F=h||f,se=P&&P.overrideNavigation,Ee=P!=null&&P.initialHydration&&R.matches&&R.matches.length>0&&!q?R.matches:Di(F,I,g),Te=(P&&P.flushSync)===!0;if(Ee&&R.initialized&&!$&&CS(R.location,I)&&!(P&&P.submission&&Ut(P.submission.formMethod))){Mt(I,{matches:Ee},{flushSync:Te});return}let pe=ri(Ee,F,I.pathname);if(pe.active&&pe.matches&&(Ee=pe.matches),!Ee){let{error:$e,notFoundMatches:Pe,route:on}=va(I.pathname);Mt(I,{matches:Pe,loaderData:{},errors:{[on.id]:$e}},{flushSync:Te});return}ue=new AbortController;let ce=fr(a.history,I,ue.signal,P&&P.submission),oe;if(P&&P.pendingError)oe=[Ti(Ee).route.id,{type:tn.error,error:P.pendingError}];else if(P&&P.submission&&Ut(P.submission.formMethod)){let $e=await Ii(ce,I,P.submission,Ee,pe.active,{replace:P.replace,flushSync:Te});if($e.shortCircuited)return;if($e.pendingActionResult){let[Pe,on]=$e.pendingActionResult;if(mt(on)&&xl(on.error)&&on.error.status===404){ue=null,Mt(I,{matches:$e.matches,loaderData:{},errors:{[Pe]:on.error}});return}}Ee=$e.matches||Ee,oe=$e.pendingActionResult,se=xu(I,P.submission),Te=!1,pe.active=!1,ce=fr(a.history,ce.url,ce.signal)}let{shortCircuited:ge,matches:ke,loaderData:je,errors:Mn}=await _i(ce,I,Ee,pe.active,se,P&&P.submission,P&&P.fetcherSubmission,P&&P.replace,P&&P.initialHydration===!0,Te,oe);ge||(ue=null,Mt(I,bn({matches:ke||Ee},_m(oe),{loaderData:je,errors:Mn})))}async function Ii(A,I,P,F,se,Ee){Ee===void 0&&(Ee={}),ae();let Te=US(I,P);if(xn({navigation:Te},{flushSync:Ee.flushSync===!0}),se){let oe=await xa(F,I.pathname,A.signal);if(oe.type==="aborted")return{shortCircuited:!0};if(oe.type==="error"){let ge=Ti(oe.partialMatches).route.id;return{matches:oe.partialMatches,pendingActionResult:[ge,{type:tn.error,error:oe.error}]}}else if(oe.matches)F=oe.matches;else{let{notFoundMatches:ge,error:ke,route:je}=va(I.pathname);return{matches:ge,pendingActionResult:[je.id,{type:tn.error,error:ke}]}}}let pe,ce=yl(F,I);if(!ce.route.action&&!ce.route.lazy)pe={type:tn.error,error:at(405,{method:A.method,pathname:I.pathname,routeId:ce.route.id})};else if(pe=(await Ft("action",R,A,[ce],F,null))[ce.route.id],A.signal.aborted)return{shortCircuited:!0};if(Ai(pe)){let oe;return Ee&&Ee.replace!=null?oe=Ee.replace:oe=wm(pe.response.headers.get("Location"),new URL(A.url),g,a.history)===R.location.pathname+R.location.search,await yn(A,pe,!0,{submission:P,replace:oe}),{shortCircuited:!0}}if(Ka(pe))throw at(400,{type:"defer-action"});if(mt(pe)){let oe=Ti(F,ce.route.id);return(Ee&&Ee.replace)!==!0&&(te=_n.Push),{matches:F,pendingActionResult:[oe.route.id,pe]}}return{matches:F,pendingActionResult:[ce.route.id,pe]}}async function _i(A,I,P,F,se,Ee,Te,pe,ce,oe,ge){let ke=se||xu(I,Ee),je=Ee||Te||Lm(ke),Mn=!fe&&(!y.v7_partialHydration||!ce);if(F){if(Mn){let dn=Qt(ge);xn(bn({navigation:ke},dn!==void 0?{actionData:dn}:{}),{flushSync:oe})}let He=await xa(P,I.pathname,A.signal);if(He.type==="aborted")return{shortCircuited:!0};if(He.type==="error"){let dn=Ti(He.partialMatches).route.id;return{matches:He.partialMatches,loaderData:{},errors:{[dn]:He.error}}}else if(He.matches)P=He.matches;else{let{error:dn,notFoundMatches:Jt,route:si}=va(I.pathname);return{matches:Jt,loaderData:{},errors:{[si.id]:dn}}}}let $e=h||f,[Pe,on]=Dm(a.history,R,P,je,I,y.v7_partialHydration&&ce===!0,y.v7_skipActionErrorRevalidation,$,C,K,ye,E,j,$e,g,ge);if(Ea(He=>!(P&&P.some(dn=>dn.route.id===He))||Pe&&Pe.some(dn=>dn.route.id===He)),x=++Me,Pe.length===0&&on.length===0){let He=On();return Mt(I,bn({matches:P,loaderData:{},errors:ge&&mt(ge[1])?{[ge[0]]:ge[1].error}:null},_m(ge),He?{fetchers:new Map(R.fetchers)}:{}),{flushSync:oe}),{shortCircuited:!0}}if(Mn){let He={};if(!F){He.navigation=ke;let dn=Qt(ge);dn!==void 0&&(He.actionData=dn)}on.length>0&&(He.fetchers=Sa(on)),xn(He,{flushSync:oe})}on.forEach(He=>{mn(He.key),He.controller&&le.set(He.key,He.controller)});let lt=()=>on.forEach(He=>mn(He.key));ue&&ue.signal.addEventListener("abort",lt);let{loaderResults:yt,fetcherResults:Hn}=await H(R,P,Pe,on,A);if(A.signal.aborted)return{shortCircuited:!0};ue&&ue.signal.removeEventListener("abort",lt),on.forEach(He=>le.delete(He.key));let Pn=Xs(yt);if(Pn)return await yn(A,Pn.result,!0,{replace:pe}),{shortCircuited:!0};if(Pn=Xs(Hn),Pn)return j.add(Pn.key),await yn(A,Pn.result,!0,{replace:pe}),{shortCircuited:!0};let{loaderData:Sn,errors:Da}=km(R,P,yt,ge,on,Hn,be);be.forEach((He,dn)=>{He.subscribe(Jt=>{(Jt||He.done)&&be.delete(dn)})}),y.v7_partialHydration&&ce&&R.errors&&(Da=bn({},R.errors,Da));let Bt=On(),zt=Ke(x),Lt=Bt||zt||on.length>0;return bn({matches:P,loaderData:Sn,errors:Da},Lt?{fetchers:new Map(R.fetchers)}:{})}function Qt(A){if(A&&!mt(A[1]))return{[A[0]]:A[1].data};if(R.actionData)return Object.keys(R.actionData).length===0?null:R.actionData}function Sa(A){return A.forEach(I=>{let P=R.fetchers.get(I.key),F=fl(void 0,P?P.data:void 0);R.fetchers.set(I.key,F)}),new Map(R.fetchers)}function ni(A,I,P,F){if(s)throw new Error("router.fetch() was called during the server render, but it shouldn't be. You are likely calling a useFetcher() method in the body of your component. Try moving it to a useEffect or a callback.");mn(A);let se=(F&&F.flushSync)===!0,Ee=h||f,Te=ju(R.location,R.matches,g,y.v7_prependBasename,P,y.v7_relativeSplatPath,I,F?.relative),pe=Di(Ee,Te,g),ce=ri(pe,Ee,Te);if(ce.active&&ce.matches&&(pe=ce.matches),!pe){we(A,I,at(404,{pathname:Te}),{flushSync:se});return}let{path:oe,submission:ge,error:ke}=Em(y.v7_normalizeFormMethod,!0,Te,F);if(ke){we(A,I,ke,{flushSync:se});return}let je=yl(pe,oe),Mn=(F&&F.preventScrollReset)===!0;if(ge&&Ut(ge.formMethod)){Sr(A,I,oe,je,pe,ce.active,se,Mn,ge);return}E.set(A,{routeId:I,path:oe}),vr(A,I,oe,je,pe,ce.active,se,Mn,ge)}async function Sr(A,I,P,F,se,Ee,Te,pe,ce){ae(),E.delete(A);function oe(fn){if(!fn.route.action&&!fn.route.lazy){let Wt=at(405,{method:ce.formMethod,pathname:P,routeId:I});return we(A,I,Wt,{flushSync:Te}),!0}return!1}if(!Ee&&oe(F))return;let ge=R.fetchers.get(A);ve(A,jS(ce,ge),{flushSync:Te});let ke=new AbortController,je=fr(a.history,P,ke.signal,ce);if(Ee){let fn=await xa(se,new URL(je.url).pathname,je.signal,A);if(fn.type==="aborted")return;if(fn.type==="error"){we(A,I,fn.error,{flushSync:Te});return}else if(fn.matches){if(se=fn.matches,F=yl(se,P),oe(F))return}else{we(A,I,at(404,{pathname:P}),{flushSync:Te});return}}le.set(A,ke);let Mn=Me,Pe=(await Ft("action",R,je,[F],se,A))[F.route.id];if(je.signal.aborted){le.get(A)===ke&&le.delete(A);return}if(y.v7_fetcherPersist&&ye.has(A)){if(Ai(Pe)||mt(Pe)){ve(A,Fa(void 0));return}}else{if(Ai(Pe))if(le.delete(A),x>Mn){ve(A,Fa(void 0));return}else return j.add(A),ve(A,fl(ce)),yn(je,Pe,!1,{fetcherSubmission:ce,preventScrollReset:pe});if(mt(Pe)){we(A,I,Pe.error);return}}if(Ka(Pe))throw at(400,{type:"defer-action"});let on=R.navigation.location||R.location,lt=fr(a.history,on,ke.signal),yt=h||f,Hn=R.navigation.state!=="idle"?Di(yt,R.navigation.location,g):R.matches;Oe(Hn,"Didn't find any matches after fetcher action");let Pn=++Me;T.set(A,Pn);let Sn=fl(ce,Pe.data);R.fetchers.set(A,Sn);let[Da,Bt]=Dm(a.history,R,Hn,ce,on,!1,y.v7_skipActionErrorRevalidation,$,C,K,ye,E,j,yt,g,[F.route.id,Pe]);Bt.filter(fn=>fn.key!==A).forEach(fn=>{let Wt=fn.key,St=R.fetchers.get(Wt),Qn=fl(void 0,St?St.data:void 0);R.fetchers.set(Wt,Qn),mn(Wt),fn.controller&&le.set(Wt,fn.controller)}),xn({fetchers:new Map(R.fetchers)});let zt=()=>Bt.forEach(fn=>mn(fn.key));ke.signal.addEventListener("abort",zt);let{loaderResults:Lt,fetcherResults:He}=await H(R,Hn,Da,Bt,lt);if(ke.signal.aborted)return;ke.signal.removeEventListener("abort",zt),T.delete(A),le.delete(A),Bt.forEach(fn=>le.delete(fn.key));let dn=Xs(Lt);if(dn)return yn(lt,dn.result,!1,{preventScrollReset:pe});if(dn=Xs(He),dn)return j.add(dn.key),yn(lt,dn.result,!1,{preventScrollReset:pe});let{loaderData:Jt,errors:si}=km(R,Hn,Lt,void 0,Bt,He,be);if(R.fetchers.has(A)){let fn=Fa(Pe.data);R.fetchers.set(A,fn)}Ke(Pn),R.navigation.state==="loading"&&Pn>x?(Oe(te,"Expected pending action"),ue&&ue.abort(),Mt(R.navigation.location,{matches:Hn,loaderData:Jt,errors:si,fetchers:new Map(R.fetchers)})):(xn({errors:si,loaderData:Im(R.loaderData,Jt,Hn,si),fetchers:new Map(R.fetchers)}),$=!1)}async function vr(A,I,P,F,se,Ee,Te,pe,ce){let oe=R.fetchers.get(A);ve(A,fl(ce,oe?oe.data:void 0),{flushSync:Te});let ge=new AbortController,ke=fr(a.history,P,ge.signal);if(Ee){let Pe=await xa(se,new URL(ke.url).pathname,ke.signal,A);if(Pe.type==="aborted")return;if(Pe.type==="error"){we(A,I,Pe.error,{flushSync:Te});return}else if(Pe.matches)se=Pe.matches,F=yl(se,P);else{we(A,I,at(404,{pathname:P}),{flushSync:Te});return}}le.set(A,ge);let je=Me,$e=(await Ft("loader",R,ke,[F],se,A))[F.route.id];if(Ka($e)&&($e=await id($e,ke.signal,!0)||$e),le.get(A)===ge&&le.delete(A),!ke.signal.aborted){if(ye.has(A)){ve(A,Fa(void 0));return}if(Ai($e))if(x>je){ve(A,Fa(void 0));return}else{j.add(A),await yn(ke,$e,!1,{preventScrollReset:pe});return}if(mt($e)){we(A,I,$e.error);return}Oe(!Ka($e),"Unhandled fetcher deferred data"),ve(A,Fa($e.data))}}async function yn(A,I,P,F){let{submission:se,fetcherSubmission:Ee,preventScrollReset:Te,replace:pe}=F===void 0?{}:F;I.response.headers.has("X-Remix-Revalidate")&&($=!0);let ce=I.response.headers.get("Location");Oe(ce,"Expected a Location header on the redirect Response"),ce=wm(ce,new URL(A.url),g,a.history);let oe=El(R.location,ce,{_isRedirect:!0});if(l){let Pe=!1;if(I.response.headers.has("X-Remix-Reload-Document"))Pe=!0;else if(ad.test(ce)){const on=a.history.createURL(ce);Pe=on.origin!==r.location.origin||ba(on.pathname,g)==null}if(Pe){pe?r.location.replace(ce):r.location.assign(ce);return}}ue=null;let ge=pe===!0||I.response.headers.has("X-Remix-Replace")?_n.Replace:_n.Push,{formMethod:ke,formAction:je,formEncType:Mn}=R.navigation;!se&&!Ee&&ke&&je&&Mn&&(se=Lm(R.navigation));let $e=se||Ee;if(SS.has(I.response.status)&&$e&&Ut($e.formMethod))await Yn(ge,oe,{submission:bn({},$e,{formAction:ce}),preventScrollReset:Te||he,enableViewTransition:P?ie:void 0});else{let Pe=xu(oe,se);await Yn(ge,oe,{overrideNavigation:Pe,fetcherSubmission:Ee,preventScrollReset:Te||he,enableViewTransition:P?ie:void 0})}}async function Ft(A,I,P,F,se,Ee){let Te,pe={};try{Te=await RS(p,A,I,P,F,se,Ee,d,u)}catch(ce){return F.forEach(oe=>{pe[oe.route.id]={type:tn.error,error:ce}}),pe}for(let[ce,oe]of Object.entries(Te))if(LS(oe)){let ge=oe.result;pe[ce]={type:tn.redirect,response:_S(ge,P,ce,se,g,y.v7_relativeSplatPath)}}else pe[ce]=await IS(oe);return pe}async function H(A,I,P,F,se){let Ee=A.matches,Te=Ft("loader",A,se,P,I,null),pe=Promise.all(F.map(async ge=>{if(ge.matches&&ge.match&&ge.controller){let je=(await Ft("loader",A,fr(a.history,ge.path,ge.controller.signal),[ge.match],ge.matches,ge.key))[ge.match.route.id];return{[ge.key]:je}}else return Promise.resolve({[ge.key]:{type:tn.error,error:at(404,{pathname:ge.path})}})})),ce=await Te,oe=(await pe).reduce((ge,ke)=>Object.assign(ge,ke),{});return await Promise.all([PS(I,ce,se.signal,Ee,A.loaderData),NS(I,oe,F)]),{loaderResults:ce,fetcherResults:oe}}function ae(){$=!0,C.push(...Ea()),E.forEach((A,I)=>{le.has(I)&&K.add(I),mn(I)})}function ve(A,I,P){P===void 0&&(P={}),R.fetchers.set(A,I),xn({fetchers:new Map(R.fetchers)},{flushSync:(P&&P.flushSync)===!0})}function we(A,I,P,F){F===void 0&&(F={});let se=Ti(R.matches,I);Ln(A),xn({errors:{[se.route.id]:P},fetchers:new Map(R.fetchers)},{flushSync:(F&&F.flushSync)===!0})}function Ve(A){return re.set(A,(re.get(A)||0)+1),ye.has(A)&&ye.delete(A),R.fetchers.get(A)||vS}function Ln(A){let I=R.fetchers.get(A);le.has(A)&&!(I&&I.state==="loading"&&T.has(A))&&mn(A),E.delete(A),T.delete(A),j.delete(A),y.v7_fetcherPersist&&ye.delete(A),K.delete(A),R.fetchers.delete(A)}function Ct(A){let I=(re.get(A)||0)-1;I<=0?(re.delete(A),ye.add(A),y.v7_fetcherPersist||Ln(A)):re.set(A,I),xn({fetchers:new Map(R.fetchers)})}function mn(A){let I=le.get(A);I&&(I.abort(),le.delete(A))}function zn(A){for(let I of A){let P=Ve(I),F=Fa(P.data);R.fetchers.set(I,F)}}function On(){let A=[],I=!1;for(let P of j){let F=R.fetchers.get(P);Oe(F,"Expected fetcher: "+P),F.state==="loading"&&(j.delete(P),A.push(P),I=!0)}return zn(A),I}function Ke(A){let I=[];for(let[P,F]of T)if(F<A){let se=R.fetchers.get(P);Oe(se,"Expected fetcher: "+P),se.state==="loading"&&(mn(P),T.delete(P),I.push(P))}return zn(I),I.length>0}function jt(A,I){let P=R.blockers.get(A)||dl;return Ie.get(A)!==I&&Ie.set(A,I),P}function Gn(A){R.blockers.delete(A),Ie.delete(A)}function Mi(A,I){let P=R.blockers.get(A)||dl;Oe(P.state==="unblocked"&&I.state==="blocked"||P.state==="blocked"&&I.state==="blocked"||P.state==="blocked"&&I.state==="proceeding"||P.state==="blocked"&&I.state==="unblocked"||P.state==="proceeding"&&I.state==="unblocked","Invalid blocker state transition: "+P.state+" -> "+I.state);let F=new Map(R.blockers);F.set(A,I),xn({blockers:F})}function ti(A){let{currentLocation:I,nextLocation:P,historyAction:F}=A;if(Ie.size===0)return;Ie.size>1&&wi(!1,"A router only supports one blocker at a time");let se=Array.from(Ie.entries()),[Ee,Te]=se[se.length-1],pe=R.blockers.get(Ee);if(!(pe&&pe.state==="proceeding")&&Te({currentLocation:I,nextLocation:P,historyAction:F}))return Ee}function va(A){let I=at(404,{pathname:A}),P=h||f,{matches:F,route:se}=Mm(P);return Ea(),{notFoundMatches:F,route:se,error:I}}function Ea(A){let I=[];return be.forEach((P,F)=>{(!A||A(F))&&(P.cancel(),I.push(F),be.delete(F))}),I}function Kt(A,I,P){if(L=A,Z=I,O=P||null,!U&&R.navigation===Eu){U=!0;let F=_l(R.location,R.matches);F!=null&&xn({restoreScrollPosition:F})}return()=>{L=null,Z=null,O=null}}function ai(A,I){return O&&O(A,I.map(F=>Kz(F,R.loaderData)))||A.key}function ii(A,I){if(L&&Z){let P=ai(A,I);L[P]=Z()}}function _l(A,I){if(L){let P=ai(A,I),F=L[P];if(typeof F=="number")return F}return null}function ri(A,I,P){if(b)if(A){if(Object.keys(A[0].params).length>0)return{active:!0,matches:qs(I,P,g,!0)}}else return{active:!0,matches:qs(I,P,g,!0)||[]};return{active:!1,matches:null}}async function xa(A,I,P,F){if(!b)return{type:"success",matches:A};let se=A;for(;;){let Ee=h==null,Te=h||f,pe=d;try{await b({signal:P,path:I,matches:se,fetcherKey:F,patch:(ge,ke)=>{P.aborted||Am(ge,ke,Te,pe,u)}})}catch(ge){return{type:"error",error:ge,partialMatches:se}}finally{Ee&&!P.aborted&&(f=[...f])}if(P.aborted)return{type:"aborted"};let ce=Di(Te,I,g);if(ce)return{type:"success",matches:ce};let oe=qs(Te,I,g,!0);if(!oe||se.length===oe.length&&se.every((ge,ke)=>ge.route.id===oe[ke].route.id))return{type:"success",matches:null};se=oe}}function li(A){d={},h=Gs(A,u,void 0,d)}function lo(A,I){let P=h==null;Am(A,I,h||f,d,u),P&&(f=[...f],xn({}))}return X={get basename(){return g},get future(){return y},get state(){return R},get routes(){return f},get window(){return r},initialize:Fe,subscribe:_t,enableScrollRestoration:Kt,navigate:bt,fetch:ni,revalidate:za,createHref:A=>a.history.createHref(A),encodeLocation:A=>a.history.encodeLocation(A),getFetcher:Ve,deleteFetcher:Ct,dispose:qn,getBlocker:jt,deleteBlocker:Gn,patchRoutes:lo,_internalFetchControllers:le,_internalActiveDeferreds:be,_internalSetRoutes:li},X}function DS(a){return a!=null&&("formData"in a&&a.formData!=null||"body"in a&&a.body!==void 0)}function ju(a,r,l,s,u,d,f,h){let g,p;if(f){g=[];for(let y of r)if(g.push(y),y.route.id===f){p=y;break}}else g=r,p=r[r.length-1];let b=td(u||".",nd(g,d),ba(a.pathname,l)||a.pathname,h==="path");if(u==null&&(b.search=a.search,b.hash=a.hash),(u==null||u===""||u===".")&&p){let y=rd(b.search);if(p.route.index&&!y)b.search=b.search?b.search.replace(/^\?/,"?index&"):"?index";else if(!p.route.index&&y){let v=new URLSearchParams(b.search),S=v.getAll("index");v.delete("index"),S.filter(O=>O).forEach(O=>v.append("index",O));let L=v.toString();b.search=L?"?"+L:""}}return s&&l!=="/"&&(b.pathname=b.pathname==="/"?l:ga([l,b.pathname])),Ri(b)}function Em(a,r,l,s){if(!s||!DS(s))return{path:l};if(s.formMethod&&!OS(s.formMethod))return{path:l,error:at(405,{method:s.formMethod})};let u=()=>({path:l,error:at(400,{type:"invalid-body"})}),d=s.formMethod||"get",f=a?d.toUpperCase():d.toLowerCase(),h=Og(l);if(s.body!==void 0){if(s.formEncType==="text/plain"){if(!Ut(f))return u();let v=typeof s.body=="string"?s.body:s.body instanceof FormData||s.body instanceof URLSearchParams?Array.from(s.body.entries()).reduce((S,L)=>{let[O,Z]=L;return""+S+O+"="+Z+`
`},""):String(s.body);return{path:l,submission:{formMethod:f,formAction:h,formEncType:s.formEncType,formData:void 0,json:void 0,text:v}}}else if(s.formEncType==="application/json"){if(!Ut(f))return u();try{let v=typeof s.body=="string"?JSON.parse(s.body):s.body;return{path:l,submission:{formMethod:f,formAction:h,formEncType:s.formEncType,formData:void 0,json:v,text:void 0}}}catch{return u()}}}Oe(typeof FormData=="function","FormData is not available in this environment");let g,p;if(s.formData)g=Xu(s.formData),p=s.formData;else if(s.body instanceof FormData)g=Xu(s.body),p=s.body;else if(s.body instanceof URLSearchParams)g=s.body,p=Rm(g);else if(s.body==null)g=new URLSearchParams,p=new FormData;else try{g=new URLSearchParams(s.body),p=Rm(g)}catch{return u()}let b={formMethod:f,formAction:h,formEncType:s&&s.formEncType||"application/x-www-form-urlencoded",formData:p,json:void 0,text:void 0};if(Ut(b.formMethod))return{path:l,submission:b};let y=Ja(l);return r&&y.search&&rd(y.search)&&g.append("index",""),y.search="?"+g,{path:Ri(y),submission:b}}function xm(a,r,l){l===void 0&&(l=!1);let s=a.findIndex(u=>u.route.id===r);return s>=0?a.slice(0,l?s+1:s):a}function Dm(a,r,l,s,u,d,f,h,g,p,b,y,v,S,L,O){let Z=O?mt(O[1])?O[1].error:O[1].data:void 0,U=a.createURL(r.location),G=a.createURL(u),q=l;d&&r.errors?q=xm(l,Object.keys(r.errors)[0],!0):O&&mt(O[1])&&(q=xm(l,O[0]));let de=O?O[1].statusCode:void 0,ze=f&&de&&de>=400,X=q.filter((te,he)=>{let{route:ue}=te;if(ue.lazy)return!0;if(ue.loader==null)return!1;if(d)return Bu(ue,r.loaderData,r.errors);if(TS(r.loaderData,r.matches[he],te)||g.some(Ae=>Ae===te.route.id))return!0;let ie=r.matches[he],ne=te;return Tm(te,bn({currentUrl:U,currentParams:ie.params,nextUrl:G,nextParams:ne.params},s,{actionResult:Z,actionStatus:de,defaultShouldRevalidate:ze?!1:h||U.pathname+U.search===G.pathname+G.search||U.search!==G.search||Lg(ie,ne)}))}),R=[];return y.forEach((te,he)=>{if(d||!l.some(fe=>fe.route.id===te.routeId)||b.has(he))return;let ue=Di(S,te.path,L);if(!ue){R.push({key:he,routeId:te.routeId,path:te.path,matches:null,match:null,controller:null});return}let ie=r.fetchers.get(he),ne=yl(ue,te.path),Ae=!1;v.has(he)?Ae=!1:p.has(he)?(p.delete(he),Ae=!0):ie&&ie.state!=="idle"&&ie.data===void 0?Ae=h:Ae=Tm(ne,bn({currentUrl:U,currentParams:r.matches[r.matches.length-1].params,nextUrl:G,nextParams:l[l.length-1].params},s,{actionResult:Z,actionStatus:de,defaultShouldRevalidate:ze?!1:h})),Ae&&R.push({key:he,routeId:te.routeId,path:te.path,matches:ue,match:ne,controller:new AbortController})}),[X,R]}function Bu(a,r,l){if(a.lazy)return!0;if(!a.loader)return!1;let s=r!=null&&r[a.id]!==void 0,u=l!=null&&l[a.id]!==void 0;return!s&&u?!1:typeof a.loader=="function"&&a.loader.hydrate===!0?!0:!s&&!u}function TS(a,r,l){let s=!r||l.route.id!==r.route.id,u=a[l.route.id]===void 0;return s||u}function Lg(a,r){let l=a.route.path;return a.pathname!==r.pathname||l!=null&&l.endsWith("*")&&a.params["*"]!==r.params["*"]}function Tm(a,r){if(a.route.shouldRevalidate){let l=a.route.shouldRevalidate(r);if(typeof l=="boolean")return l}return r.defaultShouldRevalidate}function Am(a,r,l,s,u){var d;let f;if(a){let p=s[a];Oe(p,"No route found to patch children into: routeId = "+a),p.children||(p.children=[]),f=p.children}else f=l;let h=r.filter(p=>!f.some(b=>Wg(p,b))),g=Gs(h,u,[a||"_","patch",String(((d=f)==null?void 0:d.length)||"0")],s);f.push(...g)}function Wg(a,r){return"id"in a&&"id"in r&&a.id===r.id?!0:a.index===r.index&&a.path===r.path&&a.caseSensitive===r.caseSensitive?(!a.children||a.children.length===0)&&(!r.children||r.children.length===0)?!0:a.children.every((l,s)=>{var u;return(u=r.children)==null?void 0:u.some(d=>Wg(l,d))}):!1}async function AS(a,r,l){if(!a.lazy)return;let s=await a.lazy();if(!a.lazy)return;let u=l[a.id];Oe(u,"No route found in manifest");let d={};for(let f in s){let g=u[f]!==void 0&&f!=="hasErrorBoundary";wi(!g,'Route "'+u.id+'" has a static property "'+f+'" defined but its lazy function is also returning a value for this property. '+('The lazy route property "'+f+'" will be ignored.')),!g&&!Qz.has(f)&&(d[f]=s[f])}Object.assign(u,d),Object.assign(u,bn({},r(u),{lazy:void 0}))}async function wS(a){let{matches:r}=a,l=r.filter(u=>u.shouldLoad);return(await Promise.all(l.map(u=>u.resolve()))).reduce((u,d,f)=>Object.assign(u,{[l[f].route.id]:d}),{})}async function RS(a,r,l,s,u,d,f,h,g,p){let b=d.map(S=>S.route.lazy?AS(S.route,g,h):void 0),y=d.map((S,L)=>{let O=b[L],Z=u.some(G=>G.route.id===S.route.id);return bn({},S,{shouldLoad:Z,resolve:async G=>(G&&s.method==="GET"&&(S.route.lazy||S.route.loader)&&(Z=!0),Z?kS(r,s,S,O,G,p):Promise.resolve({type:tn.data,result:void 0}))})}),v=await a({matches:y,request:s,params:d[0].params,fetcherKey:f,context:p});try{await Promise.all(b)}catch{}return v}async function kS(a,r,l,s,u,d){let f,h,g=p=>{let b,y=new Promise((L,O)=>b=O);h=()=>b(),r.signal.addEventListener("abort",h);let v=L=>typeof p!="function"?Promise.reject(new Error("You cannot call the handler for a route which defines a boolean "+('"'+a+'" [routeId: '+l.route.id+"]"))):p({request:r,params:l.params,context:d},...L!==void 0?[L]:[]),S=(async()=>{try{return{type:"data",result:await(u?u(O=>v(O)):v())}}catch(L){return{type:"error",result:L}}})();return Promise.race([S,y])};try{let p=l.route[a];if(s)if(p){let b,[y]=await Promise.all([g(p).catch(v=>{b=v}),s]);if(b!==void 0)throw b;f=y}else if(await s,p=l.route[a],p)f=await g(p);else if(a==="action"){let b=new URL(r.url),y=b.pathname+b.search;throw at(405,{method:r.method,pathname:y,routeId:l.route.id})}else return{type:tn.data,result:void 0};else if(p)f=await g(p);else{let b=new URL(r.url),y=b.pathname+b.search;throw at(404,{pathname:y})}Oe(f.result!==void 0,"You defined "+(a==="action"?"an action":"a loader")+" for route "+('"'+l.route.id+"\" but didn't return anything from your `"+a+"` ")+"function. Please return a value or `null`.")}catch(p){return{type:tn.error,result:p}}finally{h&&r.signal.removeEventListener("abort",h)}return f}async function IS(a){let{result:r,type:l}=a;if(Pg(r)){let y;try{let v=r.headers.get("Content-Type");v&&/\bapplication\/json\b/.test(v)?r.body==null?y=null:y=await r.json():y=await r.text()}catch(v){return{type:tn.error,error:v}}return l===tn.error?{type:tn.error,error:new Fs(r.status,r.statusText,y),statusCode:r.status,headers:r.headers}:{type:tn.data,data:y,statusCode:r.status,headers:r.headers}}if(l===tn.error){if(Cm(r)){var s,u;if(r.data instanceof Error){var d,f;return{type:tn.error,error:r.data,statusCode:(d=r.init)==null?void 0:d.status,headers:(f=r.init)!=null&&f.headers?new Headers(r.init.headers):void 0}}return{type:tn.error,error:new Fs(((s=r.init)==null?void 0:s.status)||500,void 0,r.data),statusCode:xl(r)?r.status:void 0,headers:(u=r.init)!=null&&u.headers?new Headers(r.init.headers):void 0}}return{type:tn.error,error:r,statusCode:xl(r)?r.status:void 0}}if(WS(r)){var h,g;return{type:tn.deferred,deferredData:r,statusCode:(h=r.init)==null?void 0:h.status,headers:((g=r.init)==null?void 0:g.headers)&&new Headers(r.init.headers)}}if(Cm(r)){var p,b;return{type:tn.data,data:r.data,statusCode:(p=r.init)==null?void 0:p.status,headers:(b=r.init)!=null&&b.headers?new Headers(r.init.headers):void 0}}return{type:tn.data,data:r}}function _S(a,r,l,s,u,d){let f=a.headers.get("Location");if(Oe(f,"Redirects returned/thrown from loaders/actions must have a Location header"),!ad.test(f)){let h=s.slice(0,s.findIndex(g=>g.route.id===l)+1);f=ju(new URL(r.url),h,u,!0,f,d),a.headers.set("Location",f)}return a}function wm(a,r,l,s){let u=["about:","blob:","chrome:","chrome-untrusted:","content:","data:","devtools:","file:","filesystem:","javascript:"];if(ad.test(a)){let d=a,f=d.startsWith("//")?new URL(r.protocol+d):new URL(d);if(u.includes(f.protocol))throw new Error("Invalid redirect location");let h=ba(f.pathname,l)!=null;if(f.origin===r.origin&&h)return f.pathname+f.search+f.hash}try{let d=s.createURL(a);if(u.includes(d.protocol))throw new Error("Invalid redirect location")}catch{}return a}function fr(a,r,l,s){let u=a.createURL(Og(r)).toString(),d={signal:l};if(s&&Ut(s.formMethod)){let{formMethod:f,formEncType:h}=s;d.method=f.toUpperCase(),h==="application/json"?(d.headers=new Headers({"Content-Type":h}),d.body=JSON.stringify(s.json)):h==="text/plain"?d.body=s.text:h==="application/x-www-form-urlencoded"&&s.formData?d.body=Xu(s.formData):d.body=s.formData}return new Request(u,d)}function Xu(a){let r=new URLSearchParams;for(let[l,s]of a.entries())r.append(l,typeof s=="string"?s:s.name);return r}function Rm(a){let r=new FormData;for(let[l,s]of a.entries())r.append(l,s);return r}function MS(a,r,l,s,u){let d={},f=null,h,g=!1,p={},b=l&&mt(l[1])?l[1].error:void 0;return a.forEach(y=>{if(!(y.route.id in r))return;let v=y.route.id,S=r[v];if(Oe(!Ai(S),"Cannot handle redirect results in processLoaderData"),mt(S)){let L=S.error;b!==void 0&&(L=b,b=void 0),f=f||{};{let O=Ti(a,v);f[O.route.id]==null&&(f[O.route.id]=L)}d[v]=void 0,g||(g=!0,h=xl(S.error)?S.error.status:500),S.headers&&(p[v]=S.headers)}else Ka(S)?(s.set(v,S.deferredData),d[v]=S.deferredData.data,S.statusCode!=null&&S.statusCode!==200&&!g&&(h=S.statusCode),S.headers&&(p[v]=S.headers)):(d[v]=S.data,S.statusCode&&S.statusCode!==200&&!g&&(h=S.statusCode),S.headers&&(p[v]=S.headers))}),b!==void 0&&l&&(f={[l[0]]:b},d[l[0]]=void 0),{loaderData:d,errors:f,statusCode:h||200,loaderHeaders:p}}function km(a,r,l,s,u,d,f){let{loaderData:h,errors:g}=MS(r,l,s,f);return u.forEach(p=>{let{key:b,match:y,controller:v}=p,S=d[b];if(Oe(S,"Did not find corresponding fetcher result"),!(v&&v.signal.aborted))if(mt(S)){let L=Ti(a.matches,y?.route.id);g&&g[L.route.id]||(g=bn({},g,{[L.route.id]:S.error})),a.fetchers.delete(b)}else if(Ai(S))Oe(!1,"Unhandled fetcher revalidation redirect");else if(Ka(S))Oe(!1,"Unhandled fetcher deferred data");else{let L=Fa(S.data);a.fetchers.set(b,L)}}),{loaderData:h,errors:g}}function Im(a,r,l,s){let u=bn({},r);for(let d of l){let f=d.route.id;if(r.hasOwnProperty(f)?r[f]!==void 0&&(u[f]=r[f]):a[f]!==void 0&&d.route.loader&&(u[f]=a[f]),s&&s.hasOwnProperty(f))break}return u}function _m(a){return a?mt(a[1])?{actionData:{}}:{actionData:{[a[0]]:a[1].data}}:{}}function Ti(a,r){return(r?a.slice(0,a.findIndex(s=>s.route.id===r)+1):[...a]).reverse().find(s=>s.route.hasErrorBoundary===!0)||a[0]}function Mm(a){let r=a.length===1?a[0]:a.find(l=>l.index||!l.path||l.path==="/")||{id:"__shim-error-route__"};return{matches:[{params:{},pathname:"",pathnameBase:"",route:r}],route:r}}function at(a,r){let{pathname:l,routeId:s,method:u,type:d,message:f}=r===void 0?{}:r,h="Unknown Server Error",g="Unknown @remix-run/router error";return a===400?(h="Bad Request",u&&l&&s?g="You made a "+u+' request to "'+l+'" but '+('did not provide a `loader` for route "'+s+'", ')+"so there is no way to handle the request.":d==="defer-action"?g="defer() is not supported in actions":d==="invalid-body"&&(g="Unable to encode submission body")):a===403?(h="Forbidden",g='Route "'+s+'" does not match URL "'+l+'"'):a===404?(h="Not Found",g='No route matches URL "'+l+'"'):a===405&&(h="Method Not Allowed",u&&l&&s?g="You made a "+u.toUpperCase()+' request to "'+l+'" but '+('did not provide an `action` for route "'+s+'", ')+"so there is no way to handle the request.":u&&(g='Invalid request method "'+u.toUpperCase()+'"')),new Fs(a||500,h,new Error(g),!0)}function Xs(a){let r=Object.entries(a);for(let l=r.length-1;l>=0;l--){let[s,u]=r[l];if(Ai(u))return{key:s,result:u}}}function Og(a){let r=typeof a=="string"?Ja(a):a;return Ri(bn({},r,{hash:""}))}function CS(a,r){return a.pathname!==r.pathname||a.search!==r.search?!1:a.hash===""?r.hash!=="":a.hash===r.hash?!0:r.hash!==""}function LS(a){return Pg(a.result)&&zS.has(a.result.status)}function Ka(a){return a.type===tn.deferred}function mt(a){return a.type===tn.error}function Ai(a){return(a&&a.type)===tn.redirect}function Cm(a){return typeof a=="object"&&a!=null&&"type"in a&&"data"in a&&"init"in a&&a.type==="DataWithResponseInit"}function WS(a){let r=a;return r&&typeof r=="object"&&typeof r.data=="object"&&typeof r.subscribe=="function"&&typeof r.cancel=="function"&&typeof r.resolveData=="function"}function Pg(a){return a!=null&&typeof a.status=="number"&&typeof a.statusText=="string"&&typeof a.headers=="object"&&typeof a.body<"u"}function OS(a){return yS.has(a.toLowerCase())}function Ut(a){return gS.has(a.toLowerCase())}async function PS(a,r,l,s,u){let d=Object.entries(r);for(let f=0;f<d.length;f++){let[h,g]=d[f],p=a.find(v=>v?.route.id===h);if(!p)continue;let b=s.find(v=>v.route.id===p.route.id),y=b!=null&&!Lg(b,p)&&(u&&u[p.route.id])!==void 0;Ka(g)&&y&&await id(g,l,!1).then(v=>{v&&(r[h]=v)})}}async function NS(a,r,l){for(let s=0;s<l.length;s++){let{key:u,routeId:d,controller:f}=l[s],h=r[u];a.find(p=>p?.route.id===d)&&Ka(h)&&(Oe(f,"Expected an AbortController for revalidating fetcher deferred result"),await id(h,f.signal,!0).then(p=>{p&&(r[u]=p)}))}}async function id(a,r,l){if(l===void 0&&(l=!1),!await a.deferredData.resolveData(r)){if(l)try{return{type:tn.data,data:a.deferredData.unwrappedData}}catch(u){return{type:tn.error,error:u}}return{type:tn.data,data:a.deferredData.data}}}function rd(a){return new URLSearchParams(a).getAll("index").some(r=>r==="")}function yl(a,r){let l=typeof r=="string"?Ja(r).search:r.search;if(a[a.length-1].route.index&&rd(l||""))return a[a.length-1];let s=_g(a);return s[s.length-1]}function Lm(a){let{formMethod:r,formAction:l,formEncType:s,text:u,formData:d,json:f}=a;if(!(!r||!l||!s)){if(u!=null)return{formMethod:r,formAction:l,formEncType:s,formData:void 0,json:void 0,text:u};if(d!=null)return{formMethod:r,formAction:l,formEncType:s,formData:d,json:void 0,text:void 0};if(f!==void 0)return{formMethod:r,formAction:l,formEncType:s,formData:void 0,json:f,text:void 0}}}function xu(a,r){return r?{state:"loading",location:a,formMethod:r.formMethod,formAction:r.formAction,formEncType:r.formEncType,formData:r.formData,json:r.json,text:r.text}:{state:"loading",location:a,formMethod:void 0,formAction:void 0,formEncType:void 0,formData:void 0,json:void 0,text:void 0}}function US(a,r){return{state:"submitting",location:a,formMethod:r.formMethod,formAction:r.formAction,formEncType:r.formEncType,formData:r.formData,json:r.json,text:r.text}}function fl(a,r){return a?{state:"loading",formMethod:a.formMethod,formAction:a.formAction,formEncType:a.formEncType,formData:a.formData,json:a.json,text:a.text,data:r}:{state:"loading",formMethod:void 0,formAction:void 0,formEncType:void 0,formData:void 0,json:void 0,text:void 0,data:r}}function jS(a,r){return{state:"submitting",formMethod:a.formMethod,formAction:a.formAction,formEncType:a.formEncType,formData:a.formData,json:a.json,text:a.text,data:r?r.data:void 0}}function Fa(a){return{state:"idle",formMethod:void 0,formAction:void 0,formEncType:void 0,formData:void 0,json:void 0,text:void 0,data:a}}function BS(a,r){try{let l=a.sessionStorage.getItem(Cg);if(l){let s=JSON.parse(l);for(let[u,d]of Object.entries(s||{}))d&&Array.isArray(d)&&r.set(u,new Set(d||[]))}}catch{}}function XS(a,r){if(r.size>0){let l={};for(let[s,u]of r)l[s]=[...u];try{a.sessionStorage.setItem(Cg,JSON.stringify(l))}catch(s){wi(!1,"Failed to save applied view transitions in sessionStorage ("+s+").")}}}function Ks(){return Ks=Object.assign?Object.assign.bind():function(a){for(var r=1;r<arguments.length;r++){var l=arguments[r];for(var s in l)Object.prototype.hasOwnProperty.call(l,s)&&(a[s]=l[s])}return a},Ks.apply(this,arguments)}const Al=J.createContext(null),ld=J.createContext(null),$a=J.createContext(null),sd=J.createContext(null),ya=J.createContext({outlet:null,matches:[],isDataRoute:!1}),Ng=J.createContext(null);function ZS(a,r){let{relative:l}=r===void 0?{}:r;wl()||Oe(!1);let{basename:s,navigator:u}=J.useContext($a),{hash:d,pathname:f,search:h}=to(a,{relative:l}),g=f;return s!=="/"&&(g=f==="/"?s:ga([s,f])),u.createHref({pathname:g,search:h,hash:d})}function wl(){return J.useContext(sd)!=null}function Rl(){return wl()||Oe(!1),J.useContext(sd).location}function Ug(a){J.useContext($a).static||J.useLayoutEffect(a)}function HS(){let{isDataRoute:a}=J.useContext(ya);return a?r0():VS()}function VS(){wl()||Oe(!1);let a=J.useContext(Al),{basename:r,future:l,navigator:s}=J.useContext($a),{matches:u}=J.useContext(ya),{pathname:d}=Rl(),f=JSON.stringify(nd(u,l.v7_relativeSplatPath)),h=J.useRef(!1);return Ug(()=>{h.current=!0}),J.useCallback(function(p,b){if(b===void 0&&(b={}),!h.current)return;if(typeof p=="number"){s.go(p);return}let y=td(p,JSON.parse(f),d,b.relative==="path");a==null&&r!=="/"&&(y.pathname=y.pathname==="/"?r:ga([r,y.pathname])),(b.replace?s.replace:s.push)(y,b.state,b)},[r,s,f,d,a])}const qS=J.createContext(null);function YS(a){let r=J.useContext(ya).outlet;return r&&J.createElement(qS.Provider,{value:a},r)}function GS(){let{matches:a}=J.useContext(ya),r=a[a.length-1];return r?r.params:{}}function to(a,r){let{relative:l}=r===void 0?{}:r,{future:s}=J.useContext($a),{matches:u}=J.useContext(ya),{pathname:d}=Rl(),f=JSON.stringify(nd(u,s.v7_relativeSplatPath));return J.useMemo(()=>td(a,JSON.parse(f),d,l==="path"),[a,f,d,l])}function QS(a,r,l,s){wl()||Oe(!1);let{navigator:u}=J.useContext($a),{matches:d}=J.useContext(ya),f=d[d.length-1],h=f?f.params:{};f&&f.pathname;let g=f?f.pathnameBase:"/";f&&f.route;let p=Rl(),b;b=p;let y=b.pathname||"/",v=y;if(g!=="/"){let O=g.replace(/^\//,"").split("/");v="/"+y.replace(/^\//,"").split("/").slice(O.length).join("/")}let S=Di(a,{pathname:v});return e0(S&&S.map(O=>Object.assign({},O,{params:Object.assign({},h,O.params),pathname:ga([g,u.encodeLocation?u.encodeLocation(O.pathname).pathname:O.pathname]),pathnameBase:O.pathnameBase==="/"?g:ga([g,u.encodeLocation?u.encodeLocation(O.pathnameBase).pathname:O.pathnameBase])})),d,l,s)}function FS(){let a=i0(),r=xl(a)?a.status+" "+a.statusText:a instanceof Error?a.message:JSON.stringify(a),l=a instanceof Error?a.stack:null,u={padding:"0.5rem",backgroundColor:"rgba(200,200,200, 0.5)"};return J.createElement(J.Fragment,null,J.createElement("h2",null,"Unexpected Application Error!"),J.createElement("h3",{style:{fontStyle:"italic"}},r),l?J.createElement("pre",{style:u},l):null,null)}const KS=J.createElement(FS,null);class JS extends J.Component{constructor(r){super(r),this.state={location:r.location,revalidation:r.revalidation,error:r.error}}static getDerivedStateFromError(r){return{error:r}}static getDerivedStateFromProps(r,l){return l.location!==r.location||l.revalidation!=="idle"&&r.revalidation==="idle"?{error:r.error,location:r.location,revalidation:r.revalidation}:{error:r.error!==void 0?r.error:l.error,location:l.location,revalidation:r.revalidation||l.revalidation}}componentDidCatch(r,l){console.error("React Router caught the following error during render",r,l)}render(){return this.state.error!==void 0?J.createElement(ya.Provider,{value:this.props.routeContext},J.createElement(Ng.Provider,{value:this.state.error,children:this.props.component})):this.props.children}}function $S(a){let{routeContext:r,match:l,children:s}=a,u=J.useContext(Al);return u&&u.static&&u.staticContext&&(l.route.errorElement||l.route.ErrorBoundary)&&(u.staticContext._deepestRenderedBoundaryId=l.route.id),J.createElement(ya.Provider,{value:r},s)}function e0(a,r,l,s){var u;if(r===void 0&&(r=[]),l===void 0&&(l=null),s===void 0&&(s=null),a==null){var d;if(!l)return null;if(l.errors)a=l.matches;else if((d=s)!=null&&d.v7_partialHydration&&r.length===0&&!l.initialized&&l.matches.length>0)a=l.matches;else return null}let f=a,h=(u=l)==null?void 0:u.errors;if(h!=null){let b=f.findIndex(y=>y.route.id&&h?.[y.route.id]!==void 0);b>=0||Oe(!1),f=f.slice(0,Math.min(f.length,b+1))}let g=!1,p=-1;if(l&&s&&s.v7_partialHydration)for(let b=0;b<f.length;b++){let y=f[b];if((y.route.HydrateFallback||y.route.hydrateFallbackElement)&&(p=b),y.route.id){let{loaderData:v,errors:S}=l,L=y.route.loader&&v[y.route.id]===void 0&&(!S||S[y.route.id]===void 0);if(y.route.lazy||L){g=!0,p>=0?f=f.slice(0,p+1):f=[f[0]];break}}}return f.reduceRight((b,y,v)=>{let S,L=!1,O=null,Z=null;l&&(S=h&&y.route.id?h[y.route.id]:void 0,O=y.route.errorElement||KS,g&&(p<0&&v===0?(l0("route-fallback"),L=!0,Z=null):p===v&&(L=!0,Z=y.route.hydrateFallbackElement||null)));let U=r.concat(f.slice(0,v+1)),G=()=>{let q;return S?q=O:L?q=Z:y.route.Component?q=J.createElement(y.route.Component,null):y.route.element?q=y.route.element:q=b,J.createElement($S,{match:y,routeContext:{outlet:b,matches:U,isDataRoute:l!=null},children:q})};return l&&(y.route.ErrorBoundary||y.route.errorElement||v===0)?J.createElement(JS,{location:l.location,revalidation:l.revalidation,component:O,error:S,children:G(),routeContext:{outlet:null,matches:U,isDataRoute:!0}}):G()},null)}var jg=(function(a){return a.UseBlocker="useBlocker",a.UseRevalidator="useRevalidator",a.UseNavigateStable="useNavigate",a})(jg||{}),Bg=(function(a){return a.UseBlocker="useBlocker",a.UseLoaderData="useLoaderData",a.UseActionData="useActionData",a.UseRouteError="useRouteError",a.UseNavigation="useNavigation",a.UseRouteLoaderData="useRouteLoaderData",a.UseMatches="useMatches",a.UseRevalidator="useRevalidator",a.UseNavigateStable="useNavigate",a.UseRouteId="useRouteId",a})(Bg||{});function n0(a){let r=J.useContext(Al);return r||Oe(!1),r}function t0(a){let r=J.useContext(ld);return r||Oe(!1),r}function a0(a){let r=J.useContext(ya);return r||Oe(!1),r}function Xg(a){let r=a0(),l=r.matches[r.matches.length-1];return l.route.id||Oe(!1),l.route.id}function i0(){var a;let r=J.useContext(Ng),l=t0(),s=Xg();return r!==void 0?r:(a=l.errors)==null?void 0:a[s]}function r0(){let{router:a}=n0(jg.UseNavigateStable),r=Xg(Bg.UseNavigateStable),l=J.useRef(!1);return Ug(()=>{l.current=!0}),J.useCallback(function(u,d){d===void 0&&(d={}),l.current&&(typeof u=="number"?a.navigate(u):a.navigate(u,Ks({fromRouteId:r},d)))},[a,r])}const Wm={};function l0(a,r,l){Wm[a]||(Wm[a]=!0)}function s0(a,r){a?.v7_startTransition,a?.v7_relativeSplatPath===void 0&&(!r||r.v7_relativeSplatPath),r&&(r.v7_fetcherPersist,r.v7_normalizeFormMethod,r.v7_partialHydration,r.v7_skipActionErrorRevalidation)}function o0(a){return YS(a.context)}function c0(a){let{basename:r="/",children:l=null,location:s,navigationType:u=_n.Pop,navigator:d,static:f=!1,future:h}=a;wl()&&Oe(!1);let g=r.replace(/^\/*/,"/"),p=J.useMemo(()=>({basename:g,navigator:d,static:f,future:Ks({v7_relativeSplatPath:!1},h)}),[g,h,d,f]);typeof s=="string"&&(s=Ja(s));let{pathname:b="/",search:y="",hash:v="",state:S=null,key:L="default"}=s,O=J.useMemo(()=>{let Z=ba(b,g);return Z==null?null:{location:{pathname:Z,search:y,hash:v,state:S,key:L},navigationType:u}},[g,b,y,v,S,L,u]);return O==null?null:J.createElement($a.Provider,{value:p},J.createElement(sd.Provider,{children:l,value:O}))}new Promise(()=>{});function u0(a){let r={hasErrorBoundary:a.ErrorBoundary!=null||a.errorElement!=null};return a.Component&&Object.assign(r,{element:J.createElement(a.Component),Component:void 0}),a.HydrateFallback&&Object.assign(r,{hydrateFallbackElement:J.createElement(a.HydrateFallback),HydrateFallback:void 0}),a.ErrorBoundary&&Object.assign(r,{errorElement:J.createElement(a.ErrorBoundary),ErrorBoundary:void 0}),r}function br(){return br=Object.assign?Object.assign.bind():function(a){for(var r=1;r<arguments.length;r++){var l=arguments[r];for(var s in l)Object.prototype.hasOwnProperty.call(l,s)&&(a[s]=l[s])}return a},br.apply(this,arguments)}function Zg(a,r){if(a==null)return{};var l={},s=Object.keys(a),u,d;for(d=0;d<s.length;d++)u=s[d],!(r.indexOf(u)>=0)&&(l[u]=a[u]);return l}function d0(a){return!!(a.metaKey||a.altKey||a.ctrlKey||a.shiftKey)}function f0(a,r){return a.button===0&&(!r||r==="_self")&&!d0(a)}const p0=["onClick","relative","reloadDocument","replace","state","target","to","preventScrollReset","viewTransition"],h0=["aria-current","caseSensitive","className","end","style","to","viewTransition","children"],m0="6";try{window.__reactRouterVersion=m0}catch{}function g0(a,r){return xS({basename:r?.basename,future:br({},r?.future,{v7_prependBasename:!0}),history:qz({window:r?.window}),hydrationData:r?.hydrationData||b0(),routes:a,mapRouteProperties:u0,dataStrategy:r?.dataStrategy,patchRoutesOnNavigation:r?.patchRoutesOnNavigation,window:r?.window}).initialize()}function b0(){var a;let r=(a=window)==null?void 0:a.__staticRouterHydrationData;return r&&r.errors&&(r=br({},r,{errors:y0(r.errors)})),r}function y0(a){if(!a)return null;let r=Object.entries(a),l={};for(let[s,u]of r)if(u&&u.__type==="RouteErrorResponse")l[s]=new Fs(u.status,u.statusText,u.data,u.internal===!0);else if(u&&u.__type==="Error"){if(u.__subType){let d=window[u.__subType];if(typeof d=="function")try{let f=new d(u.message);f.stack="",l[s]=f}catch{}}if(l[s]==null){let d=new Error(u.message);d.stack="",l[s]=d}}else l[s]=u;return l}const Hg=J.createContext({isTransitioning:!1}),z0=J.createContext(new Map),S0="startTransition",Om=Pz[S0],v0="flushSync",Pm=Vz[v0];function E0(a){Om?Om(a):a()}function pl(a){Pm?Pm(a):a()}class x0{constructor(){this.status="pending",this.promise=new Promise((r,l)=>{this.resolve=s=>{this.status==="pending"&&(this.status="resolved",r(s))},this.reject=s=>{this.status==="pending"&&(this.status="rejected",l(s))}})}}function D0(a){let{fallbackElement:r,router:l,future:s}=a,[u,d]=J.useState(l.state),[f,h]=J.useState(),[g,p]=J.useState({isTransitioning:!1}),[b,y]=J.useState(),[v,S]=J.useState(),[L,O]=J.useState(),Z=J.useRef(new Map),{v7_startTransition:U}=s||{},G=J.useCallback(te=>{U?E0(te):te()},[U]),q=J.useCallback((te,he)=>{let{deletedFetchers:ue,flushSync:ie,viewTransitionOpts:ne}=he;te.fetchers.forEach((fe,$)=>{fe.data!==void 0&&Z.current.set($,fe.data)}),ue.forEach(fe=>Z.current.delete(fe));let Ae=l.window==null||l.window.document==null||typeof l.window.document.startViewTransition!="function";if(!ne||Ae){ie?pl(()=>d(te)):G(()=>d(te));return}if(ie){pl(()=>{v&&(b&&b.resolve(),v.skipTransition()),p({isTransitioning:!0,flushSync:!0,currentLocation:ne.currentLocation,nextLocation:ne.nextLocation})});let fe=l.window.document.startViewTransition(()=>{pl(()=>d(te))});fe.finished.finally(()=>{pl(()=>{y(void 0),S(void 0),h(void 0),p({isTransitioning:!1})})}),pl(()=>S(fe));return}v?(b&&b.resolve(),v.skipTransition(),O({state:te,currentLocation:ne.currentLocation,nextLocation:ne.nextLocation})):(h(te),p({isTransitioning:!0,flushSync:!1,currentLocation:ne.currentLocation,nextLocation:ne.nextLocation}))},[l.window,v,b,Z,G]);J.useLayoutEffect(()=>l.subscribe(q),[l,q]),J.useEffect(()=>{g.isTransitioning&&!g.flushSync&&y(new x0)},[g]),J.useEffect(()=>{if(b&&f&&l.window){let te=f,he=b.promise,ue=l.window.document.startViewTransition(async()=>{G(()=>d(te)),await he});ue.finished.finally(()=>{y(void 0),S(void 0),h(void 0),p({isTransitioning:!1})}),S(ue)}},[G,f,b,l.window]),J.useEffect(()=>{b&&f&&u.location.key===f.location.key&&b.resolve()},[b,v,u.location,f]),J.useEffect(()=>{!g.isTransitioning&&L&&(h(L.state),p({isTransitioning:!0,flushSync:!1,currentLocation:L.currentLocation,nextLocation:L.nextLocation}),O(void 0))},[g.isTransitioning,L]),J.useEffect(()=>{},[]);let de=J.useMemo(()=>({createHref:l.createHref,encodeLocation:l.encodeLocation,go:te=>l.navigate(te),push:(te,he,ue)=>l.navigate(te,{state:he,preventScrollReset:ue?.preventScrollReset}),replace:(te,he,ue)=>l.navigate(te,{replace:!0,state:he,preventScrollReset:ue?.preventScrollReset})}),[l]),ze=l.basename||"/",X=J.useMemo(()=>({router:l,navigator:de,static:!1,basename:ze}),[l,de,ze]),R=J.useMemo(()=>({v7_relativeSplatPath:l.future.v7_relativeSplatPath}),[l.future.v7_relativeSplatPath]);return J.useEffect(()=>s0(s,l.future),[s,l.future]),J.createElement(J.Fragment,null,J.createElement(Al.Provider,{value:X},J.createElement(ld.Provider,{value:u},J.createElement(z0.Provider,{value:Z.current},J.createElement(Hg.Provider,{value:g},J.createElement(c0,{basename:ze,location:u.location,navigationType:u.historyAction,navigator:de,future:R},u.initialized||l.future.v7_partialHydration?J.createElement(T0,{routes:l.routes,future:l.future,state:u}):r))))),null)}const T0=J.memo(A0);function A0(a){let{routes:r,future:l,state:s}=a;return QS(r,void 0,s,l)}const w0=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u",R0=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,Dl=J.forwardRef(function(r,l){let{onClick:s,relative:u,reloadDocument:d,replace:f,state:h,target:g,to:p,preventScrollReset:b,viewTransition:y}=r,v=Zg(r,p0),{basename:S}=J.useContext($a),L,O=!1;if(typeof p=="string"&&R0.test(p)&&(L=p,w0))try{let q=new URL(window.location.href),de=p.startsWith("//")?new URL(q.protocol+p):new URL(p),ze=ba(de.pathname,S);de.origin===q.origin&&ze!=null?p=ze+de.search+de.hash:O=!0}catch{}let Z=ZS(p,{relative:u}),U=I0(p,{replace:f,state:h,target:g,preventScrollReset:b,relative:u,viewTransition:y});function G(q){s&&s(q),q.defaultPrevented||U(q)}return J.createElement("a",br({},v,{href:L||Z,onClick:O||d?s:G,ref:l,target:g}))}),Du=J.forwardRef(function(r,l){let{"aria-current":s="page",caseSensitive:u=!1,className:d="",end:f=!1,style:h,to:g,viewTransition:p,children:b}=r,y=Zg(r,h0),v=to(g,{relative:y.relative}),S=Rl(),L=J.useContext(ld),{navigator:O,basename:Z}=J.useContext($a),U=L!=null&&_0(v)&&p===!0,G=O.encodeLocation?O.encodeLocation(v).pathname:v.pathname,q=S.pathname,de=L&&L.navigation&&L.navigation.location?L.navigation.location.pathname:null;u||(q=q.toLowerCase(),de=de?de.toLowerCase():null,G=G.toLowerCase()),de&&Z&&(de=ba(de,Z)||de);const ze=G!=="/"&&G.endsWith("/")?G.length-1:G.length;let X=q===G||!f&&q.startsWith(G)&&q.charAt(ze)==="/",R=de!=null&&(de===G||!f&&de.startsWith(G)&&de.charAt(G.length)==="/"),te={isActive:X,isPending:R,isTransitioning:U},he=X?s:void 0,ue;typeof d=="function"?ue=d(te):ue=[d,X?"active":null,R?"pending":null,U?"transitioning":null].filter(Boolean).join(" ");let ie=typeof h=="function"?h(te):h;return J.createElement(Dl,br({},y,{"aria-current":he,className:ue,ref:l,style:ie,to:g,viewTransition:p}),typeof b=="function"?b(te):b)});var Zu;(function(a){a.UseScrollRestoration="useScrollRestoration",a.UseSubmit="useSubmit",a.UseSubmitFetcher="useSubmitFetcher",a.UseFetcher="useFetcher",a.useViewTransitionState="useViewTransitionState"})(Zu||(Zu={}));var Nm;(function(a){a.UseFetcher="useFetcher",a.UseFetchers="useFetchers",a.UseScrollRestoration="useScrollRestoration"})(Nm||(Nm={}));function k0(a){let r=J.useContext(Al);return r||Oe(!1),r}function I0(a,r){let{target:l,replace:s,state:u,preventScrollReset:d,relative:f,viewTransition:h}=r===void 0?{}:r,g=HS(),p=Rl(),b=to(a,{relative:f});return J.useCallback(y=>{if(f0(y,l)){y.preventDefault();let v=s!==void 0?s:Ri(p)===Ri(b);g(a,{replace:v,state:u,preventScrollReset:d,relative:f,viewTransition:h})}},[p,g,b,s,u,l,a,d,f,h])}function _0(a,r){r===void 0&&(r={});let l=J.useContext(Hg);l==null&&Oe(!1);let{basename:s}=k0(Zu.useViewTransitionState),u=to(a,{relative:r.relative});if(!l.isTransitioning)return!1;let d=ba(l.currentLocation.pathname,s)||l.currentLocation.pathname,f=ba(l.nextLocation.pathname,s)||l.nextLocation.pathname;return Qs(u.pathname,f)!=null||Qs(u.pathname,d)!=null}const M0=[{to:"/",label:"Home",end:!0},{to:"/api",label:"API"},{to:"/examples",label:"Examples"},{to:"/learn",label:"Learn"}];function C0(){return Q.jsxs("div",{className:"page",children:[Q.jsx("div",{className:"page-bg","aria-hidden":"true"}),Q.jsxs("header",{className:"hero",children:[Q.jsxs("div",{className:"hero-top",children:[Q.jsxs("div",{className:"brand",children:[Q.jsx("span",{className:"brand-mark"}),Q.jsx("span",{children:"Wizzard Packages"})]}),Q.jsx("nav",{className:"nav",children:M0.map(a=>Q.jsx(Du,{to:a.to,end:a.end,className:({isActive:r})=>`nav-link${r?" nav-link--active":""}`,children:a.label},a.to))})]}),Q.jsxs("div",{className:"hero-body",children:[Q.jsxs("div",{className:"hero-copy",children:[Q.jsx("p",{className:"eyebrow",children:"Documentation Hub"}),Q.jsx("h1",{children:"Docs UI"}),Q.jsx("p",{className:"subtitle",children:"Interactive documentation experience for the @wizzard-packages/* ecosystem."}),Q.jsxs("div",{className:"hero-actions",children:[Q.jsx(Du,{to:"/api",className:"button button--primary",children:"Explore API"}),Q.jsx(Du,{to:"/examples",className:"button button--ghost",children:"View Examples"})]})]}),Q.jsxs("div",{className:"hero-panel",children:[Q.jsx("p",{className:"panel-label",children:"Now live"}),Q.jsx("h2",{children:"Typedoc + Live Recipes"}),Q.jsx("p",{className:"panel-copy",children:"Browse generated API markdown, then jump straight into example flows that match your use case."}),Q.jsxs("div",{className:"panel-meta",children:[Q.jsx("span",{children:"Design refresh"}),Q.jsx("span",{children:"Dev preview"}),Q.jsx("span",{children:"v0.1.0"})]})]})]})]}),Q.jsx("main",{className:"content",children:Q.jsx(o0,{})})]})}function L0(){return Q.jsxs("section",{className:"section",children:[Q.jsxs("div",{className:"section-header",children:[Q.jsx("p",{className:"section-eyebrow",children:"Getting started"}),Q.jsx("h2",{children:"Everything you need to ship guided flows"}),Q.jsx("p",{className:"section-lead",children:"Build predictable multi-step journeys with adapters, persistence, and flexible navigation modes."})]}),Q.jsxs("div",{className:"card-grid",children:[Q.jsxs("article",{className:"card card--accent",children:[Q.jsx("h3",{children:"API Reference"}),Q.jsx("p",{children:"Full TypeDoc output, searchable modules, and copy-ready snippets."})]}),Q.jsxs("article",{className:"card card--cool",children:[Q.jsx("h3",{children:"Examples"}),Q.jsx("p",{children:"Guided recipes for validation, persistence, and routing flows."})]}),Q.jsxs("article",{className:"card",children:[Q.jsx("h3",{children:"Status"}),Q.jsx("p",{children:"Docs UI is live on dev preview while the redesign ships."})]})]})]})}function W0(a,r){const l={};return(a[a.length-1]===""?[...a,""]:a).join((l.padRight?" ":"")+","+(l.padLeft===!1?"":" ")).trim()}const O0=/^[$_\p{ID_Start}][$_\u{200C}\u{200D}\p{ID_Continue}]*$/u,P0=/^[$_\p{ID_Start}][-$_\u{200C}\u{200D}\p{ID_Continue}]*$/u,N0={};function Um(a,r){return(N0.jsx?P0:O0).test(a)}const U0=/[ \t\n\f\r]/g;function j0(a){return typeof a=="object"?a.type==="text"?jm(a.value):!1:jm(a)}function jm(a){return a.replace(U0,"")===""}class kl{constructor(r,l,s){this.normal=l,this.property=r,s&&(this.space=s)}}kl.prototype.normal={};kl.prototype.property={};kl.prototype.space=void 0;function Vg(a,r){const l={},s={};for(const u of a)Object.assign(l,u.property),Object.assign(s,u.normal);return new kl(l,s,r)}function Hu(a){return a.toLowerCase()}class rt{constructor(r,l){this.attribute=l,this.property=r}}rt.prototype.attribute="";rt.prototype.booleanish=!1;rt.prototype.boolean=!1;rt.prototype.commaOrSpaceSeparated=!1;rt.prototype.commaSeparated=!1;rt.prototype.defined=!1;rt.prototype.mustUseProperty=!1;rt.prototype.number=!1;rt.prototype.overloadedBoolean=!1;rt.prototype.property="";rt.prototype.spaceSeparated=!1;rt.prototype.space=void 0;let B0=0;const We=ki(),In=ki(),Vu=ki(),ee=ki(),cn=ki(),mr=ki(),ht=ki();function ki(){return 2**++B0}const qu=Object.freeze(Object.defineProperty({__proto__:null,boolean:We,booleanish:In,commaOrSpaceSeparated:ht,commaSeparated:mr,number:ee,overloadedBoolean:Vu,spaceSeparated:cn},Symbol.toStringTag,{value:"Module"})),Tu=Object.keys(qu);class od extends rt{constructor(r,l,s,u){let d=-1;if(super(r,l),Bm(this,"space",u),typeof s=="number")for(;++d<Tu.length;){const f=Tu[d];Bm(this,Tu[d],(s&qu[f])===qu[f])}}}od.prototype.defined=!0;function Bm(a,r,l){l&&(a[r]=l)}function yr(a){const r={},l={};for(const[s,u]of Object.entries(a.properties)){const d=new od(s,a.transform(a.attributes||{},s),u,a.space);a.mustUseProperty&&a.mustUseProperty.includes(s)&&(d.mustUseProperty=!0),r[s]=d,l[Hu(s)]=s,l[Hu(d.attribute)]=s}return new kl(r,l,a.space)}const qg=yr({properties:{ariaActiveDescendant:null,ariaAtomic:In,ariaAutoComplete:null,ariaBusy:In,ariaChecked:In,ariaColCount:ee,ariaColIndex:ee,ariaColSpan:ee,ariaControls:cn,ariaCurrent:null,ariaDescribedBy:cn,ariaDetails:null,ariaDisabled:In,ariaDropEffect:cn,ariaErrorMessage:null,ariaExpanded:In,ariaFlowTo:cn,ariaGrabbed:In,ariaHasPopup:null,ariaHidden:In,ariaInvalid:null,ariaKeyShortcuts:null,ariaLabel:null,ariaLabelledBy:cn,ariaLevel:ee,ariaLive:null,ariaModal:In,ariaMultiLine:In,ariaMultiSelectable:In,ariaOrientation:null,ariaOwns:cn,ariaPlaceholder:null,ariaPosInSet:ee,ariaPressed:In,ariaReadOnly:In,ariaRelevant:null,ariaRequired:In,ariaRoleDescription:cn,ariaRowCount:ee,ariaRowIndex:ee,ariaRowSpan:ee,ariaSelected:In,ariaSetSize:ee,ariaSort:null,ariaValueMax:ee,ariaValueMin:ee,ariaValueNow:ee,ariaValueText:null,role:null},transform(a,r){return r==="role"?r:"aria-"+r.slice(4).toLowerCase()}});function Yg(a,r){return r in a?a[r]:r}function Gg(a,r){return Yg(a,r.toLowerCase())}const X0=yr({attributes:{acceptcharset:"accept-charset",classname:"class",htmlfor:"for",httpequiv:"http-equiv"},mustUseProperty:["checked","multiple","muted","selected"],properties:{abbr:null,accept:mr,acceptCharset:cn,accessKey:cn,action:null,allow:null,allowFullScreen:We,allowPaymentRequest:We,allowUserMedia:We,alt:null,as:null,async:We,autoCapitalize:null,autoComplete:cn,autoFocus:We,autoPlay:We,blocking:cn,capture:null,charSet:null,checked:We,cite:null,className:cn,cols:ee,colSpan:null,content:null,contentEditable:In,controls:We,controlsList:cn,coords:ee|mr,crossOrigin:null,data:null,dateTime:null,decoding:null,default:We,defer:We,dir:null,dirName:null,disabled:We,download:Vu,draggable:In,encType:null,enterKeyHint:null,fetchPriority:null,form:null,formAction:null,formEncType:null,formMethod:null,formNoValidate:We,formTarget:null,headers:cn,height:ee,hidden:Vu,high:ee,href:null,hrefLang:null,htmlFor:cn,httpEquiv:cn,id:null,imageSizes:null,imageSrcSet:null,inert:We,inputMode:null,integrity:null,is:null,isMap:We,itemId:null,itemProp:cn,itemRef:cn,itemScope:We,itemType:cn,kind:null,label:null,lang:null,language:null,list:null,loading:null,loop:We,low:ee,manifest:null,max:null,maxLength:ee,media:null,method:null,min:null,minLength:ee,multiple:We,muted:We,name:null,nonce:null,noModule:We,noValidate:We,onAbort:null,onAfterPrint:null,onAuxClick:null,onBeforeMatch:null,onBeforePrint:null,onBeforeToggle:null,onBeforeUnload:null,onBlur:null,onCancel:null,onCanPlay:null,onCanPlayThrough:null,onChange:null,onClick:null,onClose:null,onContextLost:null,onContextMenu:null,onContextRestored:null,onCopy:null,onCueChange:null,onCut:null,onDblClick:null,onDrag:null,onDragEnd:null,onDragEnter:null,onDragExit:null,onDragLeave:null,onDragOver:null,onDragStart:null,onDrop:null,onDurationChange:null,onEmptied:null,onEnded:null,onError:null,onFocus:null,onFormData:null,onHashChange:null,onInput:null,onInvalid:null,onKeyDown:null,onKeyPress:null,onKeyUp:null,onLanguageChange:null,onLoad:null,onLoadedData:null,onLoadedMetadata:null,onLoadEnd:null,onLoadStart:null,onMessage:null,onMessageError:null,onMouseDown:null,onMouseEnter:null,onMouseLeave:null,onMouseMove:null,onMouseOut:null,onMouseOver:null,onMouseUp:null,onOffline:null,onOnline:null,onPageHide:null,onPageShow:null,onPaste:null,onPause:null,onPlay:null,onPlaying:null,onPopState:null,onProgress:null,onRateChange:null,onRejectionHandled:null,onReset:null,onResize:null,onScroll:null,onScrollEnd:null,onSecurityPolicyViolation:null,onSeeked:null,onSeeking:null,onSelect:null,onSlotChange:null,onStalled:null,onStorage:null,onSubmit:null,onSuspend:null,onTimeUpdate:null,onToggle:null,onUnhandledRejection:null,onUnload:null,onVolumeChange:null,onWaiting:null,onWheel:null,open:We,optimum:ee,pattern:null,ping:cn,placeholder:null,playsInline:We,popover:null,popoverTarget:null,popoverTargetAction:null,poster:null,preload:null,readOnly:We,referrerPolicy:null,rel:cn,required:We,reversed:We,rows:ee,rowSpan:ee,sandbox:cn,scope:null,scoped:We,seamless:We,selected:We,shadowRootClonable:We,shadowRootDelegatesFocus:We,shadowRootMode:null,shape:null,size:ee,sizes:null,slot:null,span:ee,spellCheck:In,src:null,srcDoc:null,srcLang:null,srcSet:null,start:ee,step:null,style:null,tabIndex:ee,target:null,title:null,translate:null,type:null,typeMustMatch:We,useMap:null,value:In,width:ee,wrap:null,writingSuggestions:null,align:null,aLink:null,archive:cn,axis:null,background:null,bgColor:null,border:ee,borderColor:null,bottomMargin:ee,cellPadding:null,cellSpacing:null,char:null,charOff:null,classId:null,clear:null,code:null,codeBase:null,codeType:null,color:null,compact:We,declare:We,event:null,face:null,frame:null,frameBorder:null,hSpace:ee,leftMargin:ee,link:null,longDesc:null,lowSrc:null,marginHeight:ee,marginWidth:ee,noResize:We,noHref:We,noShade:We,noWrap:We,object:null,profile:null,prompt:null,rev:null,rightMargin:ee,rules:null,scheme:null,scrolling:In,standby:null,summary:null,text:null,topMargin:ee,valueType:null,version:null,vAlign:null,vLink:null,vSpace:ee,allowTransparency:null,autoCorrect:null,autoSave:null,disablePictureInPicture:We,disableRemotePlayback:We,prefix:null,property:null,results:ee,security:null,unselectable:null},space:"html",transform:Gg}),Z0=yr({attributes:{accentHeight:"accent-height",alignmentBaseline:"alignment-baseline",arabicForm:"arabic-form",baselineShift:"baseline-shift",capHeight:"cap-height",className:"class",clipPath:"clip-path",clipRule:"clip-rule",colorInterpolation:"color-interpolation",colorInterpolationFilters:"color-interpolation-filters",colorProfile:"color-profile",colorRendering:"color-rendering",crossOrigin:"crossorigin",dataType:"datatype",dominantBaseline:"dominant-baseline",enableBackground:"enable-background",fillOpacity:"fill-opacity",fillRule:"fill-rule",floodColor:"flood-color",floodOpacity:"flood-opacity",fontFamily:"font-family",fontSize:"font-size",fontSizeAdjust:"font-size-adjust",fontStretch:"font-stretch",fontStyle:"font-style",fontVariant:"font-variant",fontWeight:"font-weight",glyphName:"glyph-name",glyphOrientationHorizontal:"glyph-orientation-horizontal",glyphOrientationVertical:"glyph-orientation-vertical",hrefLang:"hreflang",horizAdvX:"horiz-adv-x",horizOriginX:"horiz-origin-x",horizOriginY:"horiz-origin-y",imageRendering:"image-rendering",letterSpacing:"letter-spacing",lightingColor:"lighting-color",markerEnd:"marker-end",markerMid:"marker-mid",markerStart:"marker-start",navDown:"nav-down",navDownLeft:"nav-down-left",navDownRight:"nav-down-right",navLeft:"nav-left",navNext:"nav-next",navPrev:"nav-prev",navRight:"nav-right",navUp:"nav-up",navUpLeft:"nav-up-left",navUpRight:"nav-up-right",onAbort:"onabort",onActivate:"onactivate",onAfterPrint:"onafterprint",onBeforePrint:"onbeforeprint",onBegin:"onbegin",onCancel:"oncancel",onCanPlay:"oncanplay",onCanPlayThrough:"oncanplaythrough",onChange:"onchange",onClick:"onclick",onClose:"onclose",onCopy:"oncopy",onCueChange:"oncuechange",onCut:"oncut",onDblClick:"ondblclick",onDrag:"ondrag",onDragEnd:"ondragend",onDragEnter:"ondragenter",onDragExit:"ondragexit",onDragLeave:"ondragleave",onDragOver:"ondragover",onDragStart:"ondragstart",onDrop:"ondrop",onDurationChange:"ondurationchange",onEmptied:"onemptied",onEnd:"onend",onEnded:"onended",onError:"onerror",onFocus:"onfocus",onFocusIn:"onfocusin",onFocusOut:"onfocusout",onHashChange:"onhashchange",onInput:"oninput",onInvalid:"oninvalid",onKeyDown:"onkeydown",onKeyPress:"onkeypress",onKeyUp:"onkeyup",onLoad:"onload",onLoadedData:"onloadeddata",onLoadedMetadata:"onloadedmetadata",onLoadStart:"onloadstart",onMessage:"onmessage",onMouseDown:"onmousedown",onMouseEnter:"onmouseenter",onMouseLeave:"onmouseleave",onMouseMove:"onmousemove",onMouseOut:"onmouseout",onMouseOver:"onmouseover",onMouseUp:"onmouseup",onMouseWheel:"onmousewheel",onOffline:"onoffline",onOnline:"ononline",onPageHide:"onpagehide",onPageShow:"onpageshow",onPaste:"onpaste",onPause:"onpause",onPlay:"onplay",onPlaying:"onplaying",onPopState:"onpopstate",onProgress:"onprogress",onRateChange:"onratechange",onRepeat:"onrepeat",onReset:"onreset",onResize:"onresize",onScroll:"onscroll",onSeeked:"onseeked",onSeeking:"onseeking",onSelect:"onselect",onShow:"onshow",onStalled:"onstalled",onStorage:"onstorage",onSubmit:"onsubmit",onSuspend:"onsuspend",onTimeUpdate:"ontimeupdate",onToggle:"ontoggle",onUnload:"onunload",onVolumeChange:"onvolumechange",onWaiting:"onwaiting",onZoom:"onzoom",overlinePosition:"overline-position",overlineThickness:"overline-thickness",paintOrder:"paint-order",panose1:"panose-1",pointerEvents:"pointer-events",referrerPolicy:"referrerpolicy",renderingIntent:"rendering-intent",shapeRendering:"shape-rendering",stopColor:"stop-color",stopOpacity:"stop-opacity",strikethroughPosition:"strikethrough-position",strikethroughThickness:"strikethrough-thickness",strokeDashArray:"stroke-dasharray",strokeDashOffset:"stroke-dashoffset",strokeLineCap:"stroke-linecap",strokeLineJoin:"stroke-linejoin",strokeMiterLimit:"stroke-miterlimit",strokeOpacity:"stroke-opacity",strokeWidth:"stroke-width",tabIndex:"tabindex",textAnchor:"text-anchor",textDecoration:"text-decoration",textRendering:"text-rendering",transformOrigin:"transform-origin",typeOf:"typeof",underlinePosition:"underline-position",underlineThickness:"underline-thickness",unicodeBidi:"unicode-bidi",unicodeRange:"unicode-range",unitsPerEm:"units-per-em",vAlphabetic:"v-alphabetic",vHanging:"v-hanging",vIdeographic:"v-ideographic",vMathematical:"v-mathematical",vectorEffect:"vector-effect",vertAdvY:"vert-adv-y",vertOriginX:"vert-origin-x",vertOriginY:"vert-origin-y",wordSpacing:"word-spacing",writingMode:"writing-mode",xHeight:"x-height",playbackOrder:"playbackorder",timelineBegin:"timelinebegin"},properties:{about:ht,accentHeight:ee,accumulate:null,additive:null,alignmentBaseline:null,alphabetic:ee,amplitude:ee,arabicForm:null,ascent:ee,attributeName:null,attributeType:null,azimuth:ee,bandwidth:null,baselineShift:null,baseFrequency:null,baseProfile:null,bbox:null,begin:null,bias:ee,by:null,calcMode:null,capHeight:ee,className:cn,clip:null,clipPath:null,clipPathUnits:null,clipRule:null,color:null,colorInterpolation:null,colorInterpolationFilters:null,colorProfile:null,colorRendering:null,content:null,contentScriptType:null,contentStyleType:null,crossOrigin:null,cursor:null,cx:null,cy:null,d:null,dataType:null,defaultAction:null,descent:ee,diffuseConstant:ee,direction:null,display:null,dur:null,divisor:ee,dominantBaseline:null,download:We,dx:null,dy:null,edgeMode:null,editable:null,elevation:ee,enableBackground:null,end:null,event:null,exponent:ee,externalResourcesRequired:null,fill:null,fillOpacity:ee,fillRule:null,filter:null,filterRes:null,filterUnits:null,floodColor:null,floodOpacity:null,focusable:null,focusHighlight:null,fontFamily:null,fontSize:null,fontSizeAdjust:null,fontStretch:null,fontStyle:null,fontVariant:null,fontWeight:null,format:null,fr:null,from:null,fx:null,fy:null,g1:mr,g2:mr,glyphName:mr,glyphOrientationHorizontal:null,glyphOrientationVertical:null,glyphRef:null,gradientTransform:null,gradientUnits:null,handler:null,hanging:ee,hatchContentUnits:null,hatchUnits:null,height:null,href:null,hrefLang:null,horizAdvX:ee,horizOriginX:ee,horizOriginY:ee,id:null,ideographic:ee,imageRendering:null,initialVisibility:null,in:null,in2:null,intercept:ee,k:ee,k1:ee,k2:ee,k3:ee,k4:ee,kernelMatrix:ht,kernelUnitLength:null,keyPoints:null,keySplines:null,keyTimes:null,kerning:null,lang:null,lengthAdjust:null,letterSpacing:null,lightingColor:null,limitingConeAngle:ee,local:null,markerEnd:null,markerMid:null,markerStart:null,markerHeight:null,markerUnits:null,markerWidth:null,mask:null,maskContentUnits:null,maskUnits:null,mathematical:null,max:null,media:null,mediaCharacterEncoding:null,mediaContentEncodings:null,mediaSize:ee,mediaTime:null,method:null,min:null,mode:null,name:null,navDown:null,navDownLeft:null,navDownRight:null,navLeft:null,navNext:null,navPrev:null,navRight:null,navUp:null,navUpLeft:null,navUpRight:null,numOctaves:null,observer:null,offset:null,onAbort:null,onActivate:null,onAfterPrint:null,onBeforePrint:null,onBegin:null,onCancel:null,onCanPlay:null,onCanPlayThrough:null,onChange:null,onClick:null,onClose:null,onCopy:null,onCueChange:null,onCut:null,onDblClick:null,onDrag:null,onDragEnd:null,onDragEnter:null,onDragExit:null,onDragLeave:null,onDragOver:null,onDragStart:null,onDrop:null,onDurationChange:null,onEmptied:null,onEnd:null,onEnded:null,onError:null,onFocus:null,onFocusIn:null,onFocusOut:null,onHashChange:null,onInput:null,onInvalid:null,onKeyDown:null,onKeyPress:null,onKeyUp:null,onLoad:null,onLoadedData:null,onLoadedMetadata:null,onLoadStart:null,onMessage:null,onMouseDown:null,onMouseEnter:null,onMouseLeave:null,onMouseMove:null,onMouseOut:null,onMouseOver:null,onMouseUp:null,onMouseWheel:null,onOffline:null,onOnline:null,onPageHide:null,onPageShow:null,onPaste:null,onPause:null,onPlay:null,onPlaying:null,onPopState:null,onProgress:null,onRateChange:null,onRepeat:null,onReset:null,onResize:null,onScroll:null,onSeeked:null,onSeeking:null,onSelect:null,onShow:null,onStalled:null,onStorage:null,onSubmit:null,onSuspend:null,onTimeUpdate:null,onToggle:null,onUnload:null,onVolumeChange:null,onWaiting:null,onZoom:null,opacity:null,operator:null,order:null,orient:null,orientation:null,origin:null,overflow:null,overlay:null,overlinePosition:ee,overlineThickness:ee,paintOrder:null,panose1:null,path:null,pathLength:ee,patternContentUnits:null,patternTransform:null,patternUnits:null,phase:null,ping:cn,pitch:null,playbackOrder:null,pointerEvents:null,points:null,pointsAtX:ee,pointsAtY:ee,pointsAtZ:ee,preserveAlpha:null,preserveAspectRatio:null,primitiveUnits:null,propagate:null,property:ht,r:null,radius:null,referrerPolicy:null,refX:null,refY:null,rel:ht,rev:ht,renderingIntent:null,repeatCount:null,repeatDur:null,requiredExtensions:ht,requiredFeatures:ht,requiredFonts:ht,requiredFormats:ht,resource:null,restart:null,result:null,rotate:null,rx:null,ry:null,scale:null,seed:null,shapeRendering:null,side:null,slope:null,snapshotTime:null,specularConstant:ee,specularExponent:ee,spreadMethod:null,spacing:null,startOffset:null,stdDeviation:null,stemh:null,stemv:null,stitchTiles:null,stopColor:null,stopOpacity:null,strikethroughPosition:ee,strikethroughThickness:ee,string:null,stroke:null,strokeDashArray:ht,strokeDashOffset:null,strokeLineCap:null,strokeLineJoin:null,strokeMiterLimit:ee,strokeOpacity:ee,strokeWidth:null,style:null,surfaceScale:ee,syncBehavior:null,syncBehaviorDefault:null,syncMaster:null,syncTolerance:null,syncToleranceDefault:null,systemLanguage:ht,tabIndex:ee,tableValues:null,target:null,targetX:ee,targetY:ee,textAnchor:null,textDecoration:null,textRendering:null,textLength:null,timelineBegin:null,title:null,transformBehavior:null,type:null,typeOf:ht,to:null,transform:null,transformOrigin:null,u1:null,u2:null,underlinePosition:ee,underlineThickness:ee,unicode:null,unicodeBidi:null,unicodeRange:null,unitsPerEm:ee,values:null,vAlphabetic:ee,vMathematical:ee,vectorEffect:null,vHanging:ee,vIdeographic:ee,version:null,vertAdvY:ee,vertOriginX:ee,vertOriginY:ee,viewBox:null,viewTarget:null,visibility:null,width:null,widths:null,wordSpacing:null,writingMode:null,x:null,x1:null,x2:null,xChannelSelector:null,xHeight:ee,y:null,y1:null,y2:null,yChannelSelector:null,z:null,zoomAndPan:null},space:"svg",transform:Yg}),Qg=yr({properties:{xLinkActuate:null,xLinkArcRole:null,xLinkHref:null,xLinkRole:null,xLinkShow:null,xLinkTitle:null,xLinkType:null},space:"xlink",transform(a,r){return"xlink:"+r.slice(5).toLowerCase()}}),Fg=yr({attributes:{xmlnsxlink:"xmlns:xlink"},properties:{xmlnsXLink:null,xmlns:null},space:"xmlns",transform:Gg}),Kg=yr({properties:{xmlBase:null,xmlLang:null,xmlSpace:null},space:"xml",transform(a,r){return"xml:"+r.slice(3).toLowerCase()}}),H0={classId:"classID",dataType:"datatype",itemId:"itemID",strokeDashArray:"strokeDasharray",strokeDashOffset:"strokeDashoffset",strokeLineCap:"strokeLinecap",strokeLineJoin:"strokeLinejoin",strokeMiterLimit:"strokeMiterlimit",typeOf:"typeof",xLinkActuate:"xlinkActuate",xLinkArcRole:"xlinkArcrole",xLinkHref:"xlinkHref",xLinkRole:"xlinkRole",xLinkShow:"xlinkShow",xLinkTitle:"xlinkTitle",xLinkType:"xlinkType",xmlnsXLink:"xmlnsXlink"},V0=/[A-Z]/g,Xm=/-[a-z]/g,q0=/^data[-\w.:]+$/i;function Y0(a,r){const l=Hu(r);let s=r,u=rt;if(l in a.normal)return a.property[a.normal[l]];if(l.length>4&&l.slice(0,4)==="data"&&q0.test(r)){if(r.charAt(4)==="-"){const d=r.slice(5).replace(Xm,Q0);s="data"+d.charAt(0).toUpperCase()+d.slice(1)}else{const d=r.slice(4);if(!Xm.test(d)){let f=d.replace(V0,G0);f.charAt(0)!=="-"&&(f="-"+f),r="data"+f}}u=od}return new u(s,r)}function G0(a){return"-"+a.toLowerCase()}function Q0(a){return a.charAt(1).toUpperCase()}const F0=Vg([qg,X0,Qg,Fg,Kg],"html"),cd=Vg([qg,Z0,Qg,Fg,Kg],"svg");function K0(a){return a.join(" ").trim()}var pr={},Au,Zm;function J0(){if(Zm)return Au;Zm=1;var a=/\/\*[^*]*\*+([^/*][^*]*\*+)*\//g,r=/\n/g,l=/^\s*/,s=/^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/,u=/^:\s*/,d=/^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/,f=/^[;\s]*/,h=/^\s+|\s+$/g,g=`
`,p="/",b="*",y="",v="comment",S="declaration";function L(Z,U){if(typeof Z!="string")throw new TypeError("First argument must be a string");if(!Z)return[];U=U||{};var G=1,q=1;function de(fe){var $=fe.match(r);$&&(G+=$.length);var C=fe.lastIndexOf(g);q=~C?fe.length-C:q+fe.length}function ze(){var fe={line:G,column:q};return function($){return $.position=new X(fe),he(),$}}function X(fe){this.start=fe,this.end={line:G,column:q},this.source=U.source}X.prototype.content=Z;function R(fe){var $=new Error(U.source+":"+G+":"+q+": "+fe);if($.reason=fe,$.filename=U.source,$.line=G,$.column=q,$.source=Z,!U.silent)throw $}function te(fe){var $=fe.exec(Z);if($){var C=$[0];return de(C),Z=Z.slice(C.length),$}}function he(){te(l)}function ue(fe){var $;for(fe=fe||[];$=ie();)$!==!1&&fe.push($);return fe}function ie(){var fe=ze();if(!(p!=Z.charAt(0)||b!=Z.charAt(1))){for(var $=2;y!=Z.charAt($)&&(b!=Z.charAt($)||p!=Z.charAt($+1));)++$;if($+=2,y===Z.charAt($-1))return R("End of comment missing");var C=Z.slice(2,$-2);return q+=2,de(C),Z=Z.slice($),q+=2,fe({type:v,comment:C})}}function ne(){var fe=ze(),$=te(s);if($){if(ie(),!te(u))return R("property missing ':'");var C=te(d),K=fe({type:S,property:O($[0].replace(a,y)),value:C?O(C[0].replace(a,y)):y});return te(f),K}}function Ae(){var fe=[];ue(fe);for(var $;$=ne();)$!==!1&&(fe.push($),ue(fe));return fe}return he(),Ae()}function O(Z){return Z?Z.replace(h,y):y}return Au=L,Au}var Hm;function $0(){if(Hm)return pr;Hm=1;var a=pr&&pr.__importDefault||function(s){return s&&s.__esModule?s:{default:s}};Object.defineProperty(pr,"__esModule",{value:!0}),pr.default=l;const r=a(J0());function l(s,u){let d=null;if(!s||typeof s!="string")return d;const f=(0,r.default)(s),h=typeof u=="function";return f.forEach(g=>{if(g.type!=="declaration")return;const{property:p,value:b}=g;h?u(p,b,g):b&&(d=d||{},d[p]=b)}),d}return pr}var hl={},Vm;function ev(){if(Vm)return hl;Vm=1,Object.defineProperty(hl,"__esModule",{value:!0}),hl.camelCase=void 0;var a=/^--[a-zA-Z0-9_-]+$/,r=/-([a-z])/g,l=/^[^-]+$/,s=/^-(webkit|moz|ms|o|khtml)-/,u=/^-(ms)-/,d=function(p){return!p||l.test(p)||a.test(p)},f=function(p,b){return b.toUpperCase()},h=function(p,b){return"".concat(b,"-")},g=function(p,b){return b===void 0&&(b={}),d(p)?p:(p=p.toLowerCase(),b.reactCompat?p=p.replace(u,h):p=p.replace(s,h),p.replace(r,f))};return hl.camelCase=g,hl}var ml,qm;function nv(){if(qm)return ml;qm=1;var a=ml&&ml.__importDefault||function(u){return u&&u.__esModule?u:{default:u}},r=a($0()),l=ev();function s(u,d){var f={};return!u||typeof u!="string"||(0,r.default)(u,function(h,g){h&&g&&(f[(0,l.camelCase)(h,d)]=g)}),f}return s.default=s,ml=s,ml}var tv=nv();const av=no(tv),Jg=$g("end"),ud=$g("start");function $g(a){return r;function r(l){const s=l&&l.position&&l.position[a]||{};if(typeof s.line=="number"&&s.line>0&&typeof s.column=="number"&&s.column>0)return{line:s.line,column:s.column,offset:typeof s.offset=="number"&&s.offset>-1?s.offset:void 0}}}function iv(a){const r=ud(a),l=Jg(a);if(r&&l)return{start:r,end:l}}function zl(a){return!a||typeof a!="object"?"":"position"in a||"type"in a?Ym(a.position):"start"in a||"end"in a?Ym(a):"line"in a||"column"in a?Yu(a):""}function Yu(a){return Gm(a&&a.line)+":"+Gm(a&&a.column)}function Ym(a){return Yu(a&&a.start)+"-"+Yu(a&&a.end)}function Gm(a){return a&&typeof a=="number"?a:1}class Zn extends Error{constructor(r,l,s){super(),typeof l=="string"&&(s=l,l=void 0);let u="",d={},f=!1;if(l&&("line"in l&&"column"in l?d={place:l}:"start"in l&&"end"in l?d={place:l}:"type"in l?d={ancestors:[l],place:l.position}:d={...l}),typeof r=="string"?u=r:!d.cause&&r&&(f=!0,u=r.message,d.cause=r),!d.ruleId&&!d.source&&typeof s=="string"){const g=s.indexOf(":");g===-1?d.ruleId=s:(d.source=s.slice(0,g),d.ruleId=s.slice(g+1))}if(!d.place&&d.ancestors&&d.ancestors){const g=d.ancestors[d.ancestors.length-1];g&&(d.place=g.position)}const h=d.place&&"start"in d.place?d.place.start:d.place;this.ancestors=d.ancestors||void 0,this.cause=d.cause||void 0,this.column=h?h.column:void 0,this.fatal=void 0,this.file="",this.message=u,this.line=h?h.line:void 0,this.name=zl(d.place)||"1:1",this.place=d.place||void 0,this.reason=this.message,this.ruleId=d.ruleId||void 0,this.source=d.source||void 0,this.stack=f&&d.cause&&typeof d.cause.stack=="string"?d.cause.stack:"",this.actual=void 0,this.expected=void 0,this.note=void 0,this.url=void 0}}Zn.prototype.file="";Zn.prototype.name="";Zn.prototype.reason="";Zn.prototype.message="";Zn.prototype.stack="";Zn.prototype.column=void 0;Zn.prototype.line=void 0;Zn.prototype.ancestors=void 0;Zn.prototype.cause=void 0;Zn.prototype.fatal=void 0;Zn.prototype.place=void 0;Zn.prototype.ruleId=void 0;Zn.prototype.source=void 0;const dd={}.hasOwnProperty,rv=new Map,lv=/[A-Z]/g,sv=new Set(["table","tbody","thead","tfoot","tr"]),ov=new Set(["td","th"]),eb="https://github.com/syntax-tree/hast-util-to-jsx-runtime";function cv(a,r){if(!r||r.Fragment===void 0)throw new TypeError("Expected `Fragment` in options");const l=r.filePath||void 0;let s;if(r.development){if(typeof r.jsxDEV!="function")throw new TypeError("Expected `jsxDEV` in options when `development: true`");s=bv(l,r.jsxDEV)}else{if(typeof r.jsx!="function")throw new TypeError("Expected `jsx` in production options");if(typeof r.jsxs!="function")throw new TypeError("Expected `jsxs` in production options");s=gv(l,r.jsx,r.jsxs)}const u={Fragment:r.Fragment,ancestors:[],components:r.components||{},create:s,elementAttributeNameCase:r.elementAttributeNameCase||"react",evaluater:r.createEvaluater?r.createEvaluater():void 0,filePath:l,ignoreInvalidStyle:r.ignoreInvalidStyle||!1,passKeys:r.passKeys!==!1,passNode:r.passNode||!1,schema:r.space==="svg"?cd:F0,stylePropertyNameCase:r.stylePropertyNameCase||"dom",tableCellAlignToStyle:r.tableCellAlignToStyle!==!1},d=nb(u,a,void 0);return d&&typeof d!="string"?d:u.create(a,u.Fragment,{children:d||void 0},void 0)}function nb(a,r,l){if(r.type==="element")return uv(a,r,l);if(r.type==="mdxFlowExpression"||r.type==="mdxTextExpression")return dv(a,r);if(r.type==="mdxJsxFlowElement"||r.type==="mdxJsxTextElement")return pv(a,r,l);if(r.type==="mdxjsEsm")return fv(a,r);if(r.type==="root")return hv(a,r,l);if(r.type==="text")return mv(a,r)}function uv(a,r,l){const s=a.schema;let u=s;r.tagName.toLowerCase()==="svg"&&s.space==="html"&&(u=cd,a.schema=u),a.ancestors.push(r);const d=ab(a,r.tagName,!1),f=yv(a,r);let h=pd(a,r);return sv.has(r.tagName)&&(h=h.filter(function(g){return typeof g=="string"?!j0(g):!0})),tb(a,f,d,r),fd(f,h),a.ancestors.pop(),a.schema=s,a.create(r,d,f,l)}function dv(a,r){if(r.data&&r.data.estree&&a.evaluater){const s=r.data.estree.body[0];return s.type,a.evaluater.evaluateExpression(s.expression)}Tl(a,r.position)}function fv(a,r){if(r.data&&r.data.estree&&a.evaluater)return a.evaluater.evaluateProgram(r.data.estree);Tl(a,r.position)}function pv(a,r,l){const s=a.schema;let u=s;r.name==="svg"&&s.space==="html"&&(u=cd,a.schema=u),a.ancestors.push(r);const d=r.name===null?a.Fragment:ab(a,r.name,!0),f=zv(a,r),h=pd(a,r);return tb(a,f,d,r),fd(f,h),a.ancestors.pop(),a.schema=s,a.create(r,d,f,l)}function hv(a,r,l){const s={};return fd(s,pd(a,r)),a.create(r,a.Fragment,s,l)}function mv(a,r){return r.value}function tb(a,r,l,s){typeof l!="string"&&l!==a.Fragment&&a.passNode&&(r.node=s)}function fd(a,r){if(r.length>0){const l=r.length>1?r:r[0];l&&(a.children=l)}}function gv(a,r,l){return s;function s(u,d,f,h){const p=Array.isArray(f.children)?l:r;return h?p(d,f,h):p(d,f)}}function bv(a,r){return l;function l(s,u,d,f){const h=Array.isArray(d.children),g=ud(s);return r(u,d,f,h,{columnNumber:g?g.column-1:void 0,fileName:a,lineNumber:g?g.line:void 0},void 0)}}function yv(a,r){const l={};let s,u;for(u in r.properties)if(u!=="children"&&dd.call(r.properties,u)){const d=Sv(a,u,r.properties[u]);if(d){const[f,h]=d;a.tableCellAlignToStyle&&f==="align"&&typeof h=="string"&&ov.has(r.tagName)?s=h:l[f]=h}}if(s){const d=l.style||(l.style={});d[a.stylePropertyNameCase==="css"?"text-align":"textAlign"]=s}return l}function zv(a,r){const l={};for(const s of r.attributes)if(s.type==="mdxJsxExpressionAttribute")if(s.data&&s.data.estree&&a.evaluater){const d=s.data.estree.body[0];d.type;const f=d.expression;f.type;const h=f.properties[0];h.type,Object.assign(l,a.evaluater.evaluateExpression(h.argument))}else Tl(a,r.position);else{const u=s.name;let d;if(s.value&&typeof s.value=="object")if(s.value.data&&s.value.data.estree&&a.evaluater){const h=s.value.data.estree.body[0];h.type,d=a.evaluater.evaluateExpression(h.expression)}else Tl(a,r.position);else d=s.value===null?!0:s.value;l[u]=d}return l}function pd(a,r){const l=[];let s=-1;const u=a.passKeys?new Map:rv;for(;++s<r.children.length;){const d=r.children[s];let f;if(a.passKeys){const g=d.type==="element"?d.tagName:d.type==="mdxJsxFlowElement"||d.type==="mdxJsxTextElement"?d.name:void 0;if(g){const p=u.get(g)||0;f=g+"-"+p,u.set(g,p+1)}}const h=nb(a,d,f);h!==void 0&&l.push(h)}return l}function Sv(a,r,l){const s=Y0(a.schema,r);if(!(l==null||typeof l=="number"&&Number.isNaN(l))){if(Array.isArray(l)&&(l=s.commaSeparated?W0(l):K0(l)),s.property==="style"){let u=typeof l=="object"?l:vv(a,String(l));return a.stylePropertyNameCase==="css"&&(u=Ev(u)),["style",u]}return[a.elementAttributeNameCase==="react"&&s.space?H0[s.property]||s.property:s.attribute,l]}}function vv(a,r){try{return av(r,{reactCompat:!0})}catch(l){if(a.ignoreInvalidStyle)return{};const s=l,u=new Zn("Cannot parse `style` attribute",{ancestors:a.ancestors,cause:s,ruleId:"style",source:"hast-util-to-jsx-runtime"});throw u.file=a.filePath||void 0,u.url=eb+"#cannot-parse-style-attribute",u}}function ab(a,r,l){let s;if(!l)s={type:"Literal",value:r};else if(r.includes(".")){const u=r.split(".");let d=-1,f;for(;++d<u.length;){const h=Um(u[d])?{type:"Identifier",name:u[d]}:{type:"Literal",value:u[d]};f=f?{type:"MemberExpression",object:f,property:h,computed:!!(d&&h.type==="Literal"),optional:!1}:h}s=f}else s=Um(r)&&!/^[a-z]/.test(r)?{type:"Identifier",name:r}:{type:"Literal",value:r};if(s.type==="Literal"){const u=s.value;return dd.call(a.components,u)?a.components[u]:u}if(a.evaluater)return a.evaluater.evaluateExpression(s);Tl(a)}function Tl(a,r){const l=new Zn("Cannot handle MDX estrees without `createEvaluater`",{ancestors:a.ancestors,place:r,ruleId:"mdx-estree",source:"hast-util-to-jsx-runtime"});throw l.file=a.filePath||void 0,l.url=eb+"#cannot-handle-mdx-estrees-without-createevaluater",l}function Ev(a){const r={};let l;for(l in a)dd.call(a,l)&&(r[xv(l)]=a[l]);return r}function xv(a){let r=a.replace(lv,Dv);return r.slice(0,3)==="ms-"&&(r="-"+r),r}function Dv(a){return"-"+a.toLowerCase()}const wu={action:["form"],cite:["blockquote","del","ins","q"],data:["object"],formAction:["button","input"],href:["a","area","base","link"],icon:["menuitem"],itemId:null,manifest:["html"],ping:["a","area"],poster:["video"],src:["audio","embed","iframe","img","input","script","source","track","video"]},Tv={};function Av(a,r){const l=Tv,s=typeof l.includeImageAlt=="boolean"?l.includeImageAlt:!0,u=typeof l.includeHtml=="boolean"?l.includeHtml:!0;return ib(a,s,u)}function ib(a,r,l){if(wv(a)){if("value"in a)return a.type==="html"&&!l?"":a.value;if(r&&"alt"in a&&a.alt)return a.alt;if("children"in a)return Qm(a.children,r,l)}return Array.isArray(a)?Qm(a,r,l):""}function Qm(a,r,l){const s=[];let u=-1;for(;++u<a.length;)s[u]=ib(a[u],r,l);return s.join("")}function wv(a){return!!(a&&typeof a=="object")}const Fm=document.createElement("i");function hd(a){const r="&"+a+";";Fm.innerHTML=r;const l=Fm.textContent;return l.charCodeAt(l.length-1)===59&&a!=="semi"||l===r?!1:l}function Gt(a,r,l,s){const u=a.length;let d=0,f;if(r<0?r=-r>u?0:u+r:r=r>u?u:r,l=l>0?l:0,s.length<1e4)f=Array.from(s),f.unshift(r,l),a.splice(...f);else for(l&&a.splice(r,l);d<s.length;)f=s.slice(d,d+1e4),f.unshift(r,0),a.splice(...f),d+=1e4,r+=1e4}function It(a,r){return a.length>0?(Gt(a,a.length,0,r),a):r}const Km={}.hasOwnProperty;function Rv(a){const r={};let l=-1;for(;++l<a.length;)kv(r,a[l]);return r}function kv(a,r){let l;for(l in r){const u=(Km.call(a,l)?a[l]:void 0)||(a[l]={}),d=r[l];let f;if(d)for(f in d){Km.call(u,f)||(u[f]=[]);const h=d[f];Iv(u[f],Array.isArray(h)?h:h?[h]:[])}}}function Iv(a,r){let l=-1;const s=[];for(;++l<r.length;)(r[l].add==="after"?a:s).push(r[l]);Gt(a,0,0,s)}function rb(a,r){const l=Number.parseInt(a,r);return l<9||l===11||l>13&&l<32||l>126&&l<160||l>55295&&l<57344||l>64975&&l<65008||(l&65535)===65535||(l&65535)===65534||l>1114111?"�":String.fromCodePoint(l)}function gr(a){return a.replace(/[\t\n\r ]+/g," ").replace(/^ | $/g,"").toLowerCase().toUpperCase()}const Yt=ei(/[A-Za-z]/),gt=ei(/[\dA-Za-z]/),_v=ei(/[#-'*+\--9=?A-Z^-~]/);function Gu(a){return a!==null&&(a<32||a===127)}const Qu=ei(/\d/),Mv=ei(/[\dA-Fa-f]/),Cv=ei(/[!-/:-@[-`{-~]/);function Re(a){return a!==null&&a<-2}function it(a){return a!==null&&(a<0||a===32)}function Qe(a){return a===-2||a===-1||a===32}const Lv=ei(new RegExp("\\p{P}|\\p{S}","u")),Wv=ei(/\s/);function ei(a){return r;function r(l){return l!==null&&l>-1&&a.test(String.fromCharCode(l))}}function zr(a){const r=[];let l=-1,s=0,u=0;for(;++l<a.length;){const d=a.charCodeAt(l);let f="";if(d===37&&gt(a.charCodeAt(l+1))&&gt(a.charCodeAt(l+2)))u=2;else if(d<128)/[!#$&-;=?-Z_a-z~]/.test(String.fromCharCode(d))||(f=String.fromCharCode(d));else if(d>55295&&d<57344){const h=a.charCodeAt(l+1);d<56320&&h>56319&&h<57344?(f=String.fromCharCode(d,h),u=1):f="�"}else f=String.fromCharCode(d);f&&(r.push(a.slice(s,l),encodeURIComponent(f)),s=l+u+1,f=""),u&&(l+=u,u=0)}return r.join("")+a.slice(s)}function un(a,r,l,s){const u=s?s-1:Number.POSITIVE_INFINITY;let d=0;return f;function f(g){return Qe(g)?(a.enter(l),h(g)):r(g)}function h(g){return Qe(g)&&d++<u?(a.consume(g),h):(a.exit(l),r(g))}}const Ov={tokenize:Pv};function Pv(a){const r=a.attempt(this.parser.constructs.contentInitial,s,u);let l;return r;function s(h){if(h===null){a.consume(h);return}return a.enter("lineEnding"),a.consume(h),a.exit("lineEnding"),un(a,r,"linePrefix")}function u(h){return a.enter("paragraph"),d(h)}function d(h){const g=a.enter("chunkText",{contentType:"text",previous:l});return l&&(l.next=g),l=g,f(h)}function f(h){if(h===null){a.exit("chunkText"),a.exit("paragraph"),a.consume(h);return}return Re(h)?(a.consume(h),a.exit("chunkText"),d):(a.consume(h),f)}}const Nv={tokenize:Uv},Jm={tokenize:jv};function Uv(a){const r=this,l=[];let s=0,u,d,f;return h;function h(q){if(s<l.length){const de=l[s];return r.containerState=de[1],a.attempt(de[0].continuation,g,p)(q)}return p(q)}function g(q){if(s++,r.containerState._closeFlow){r.containerState._closeFlow=void 0,u&&G();const de=r.events.length;let ze=de,X;for(;ze--;)if(r.events[ze][0]==="exit"&&r.events[ze][1].type==="chunkFlow"){X=r.events[ze][1].end;break}U(s);let R=de;for(;R<r.events.length;)r.events[R][1].end={...X},R++;return Gt(r.events,ze+1,0,r.events.slice(de)),r.events.length=R,p(q)}return h(q)}function p(q){if(s===l.length){if(!u)return v(q);if(u.currentConstruct&&u.currentConstruct.concrete)return L(q);r.interrupt=!!(u.currentConstruct&&!u._gfmTableDynamicInterruptHack)}return r.containerState={},a.check(Jm,b,y)(q)}function b(q){return u&&G(),U(s),v(q)}function y(q){return r.parser.lazy[r.now().line]=s!==l.length,f=r.now().offset,L(q)}function v(q){return r.containerState={},a.attempt(Jm,S,L)(q)}function S(q){return s++,l.push([r.currentConstruct,r.containerState]),v(q)}function L(q){if(q===null){u&&G(),U(0),a.consume(q);return}return u=u||r.parser.flow(r.now()),a.enter("chunkFlow",{_tokenizer:u,contentType:"flow",previous:d}),O(q)}function O(q){if(q===null){Z(a.exit("chunkFlow"),!0),U(0),a.consume(q);return}return Re(q)?(a.consume(q),Z(a.exit("chunkFlow")),s=0,r.interrupt=void 0,h):(a.consume(q),O)}function Z(q,de){const ze=r.sliceStream(q);if(de&&ze.push(null),q.previous=d,d&&(d.next=q),d=q,u.defineSkip(q.start),u.write(ze),r.parser.lazy[q.start.line]){let X=u.events.length;for(;X--;)if(u.events[X][1].start.offset<f&&(!u.events[X][1].end||u.events[X][1].end.offset>f))return;const R=r.events.length;let te=R,he,ue;for(;te--;)if(r.events[te][0]==="exit"&&r.events[te][1].type==="chunkFlow"){if(he){ue=r.events[te][1].end;break}he=!0}for(U(s),X=R;X<r.events.length;)r.events[X][1].end={...ue},X++;Gt(r.events,te+1,0,r.events.slice(R)),r.events.length=X}}function U(q){let de=l.length;for(;de-- >q;){const ze=l[de];r.containerState=ze[1],ze[0].exit.call(r,a)}l.length=q}function G(){u.write([null]),d=void 0,u=void 0,r.containerState._closeFlow=void 0}}function jv(a,r,l){return un(a,a.attempt(this.parser.constructs.document,r,l),"linePrefix",this.parser.constructs.disable.null.includes("codeIndented")?void 0:4)}function $m(a){if(a===null||it(a)||Wv(a))return 1;if(Lv(a))return 2}function md(a,r,l){const s=[];let u=-1;for(;++u<a.length;){const d=a[u].resolveAll;d&&!s.includes(d)&&(r=d(r,l),s.push(d))}return r}const Fu={name:"attention",resolveAll:Bv,tokenize:Xv};function Bv(a,r){let l=-1,s,u,d,f,h,g,p,b;for(;++l<a.length;)if(a[l][0]==="enter"&&a[l][1].type==="attentionSequence"&&a[l][1]._close){for(s=l;s--;)if(a[s][0]==="exit"&&a[s][1].type==="attentionSequence"&&a[s][1]._open&&r.sliceSerialize(a[s][1]).charCodeAt(0)===r.sliceSerialize(a[l][1]).charCodeAt(0)){if((a[s][1]._close||a[l][1]._open)&&(a[l][1].end.offset-a[l][1].start.offset)%3&&!((a[s][1].end.offset-a[s][1].start.offset+a[l][1].end.offset-a[l][1].start.offset)%3))continue;g=a[s][1].end.offset-a[s][1].start.offset>1&&a[l][1].end.offset-a[l][1].start.offset>1?2:1;const y={...a[s][1].end},v={...a[l][1].start};eg(y,-g),eg(v,g),f={type:g>1?"strongSequence":"emphasisSequence",start:y,end:{...a[s][1].end}},h={type:g>1?"strongSequence":"emphasisSequence",start:{...a[l][1].start},end:v},d={type:g>1?"strongText":"emphasisText",start:{...a[s][1].end},end:{...a[l][1].start}},u={type:g>1?"strong":"emphasis",start:{...f.start},end:{...h.end}},a[s][1].end={...f.start},a[l][1].start={...h.end},p=[],a[s][1].end.offset-a[s][1].start.offset&&(p=It(p,[["enter",a[s][1],r],["exit",a[s][1],r]])),p=It(p,[["enter",u,r],["enter",f,r],["exit",f,r],["enter",d,r]]),p=It(p,md(r.parser.constructs.insideSpan.null,a.slice(s+1,l),r)),p=It(p,[["exit",d,r],["enter",h,r],["exit",h,r],["exit",u,r]]),a[l][1].end.offset-a[l][1].start.offset?(b=2,p=It(p,[["enter",a[l][1],r],["exit",a[l][1],r]])):b=0,Gt(a,s-1,l-s+3,p),l=s+p.length-b-2;break}}for(l=-1;++l<a.length;)a[l][1].type==="attentionSequence"&&(a[l][1].type="data");return a}function Xv(a,r){const l=this.parser.constructs.attentionMarkers.null,s=this.previous,u=$m(s);let d;return f;function f(g){return d=g,a.enter("attentionSequence"),h(g)}function h(g){if(g===d)return a.consume(g),h;const p=a.exit("attentionSequence"),b=$m(g),y=!b||b===2&&u||l.includes(g),v=!u||u===2&&b||l.includes(s);return p._open=!!(d===42?y:y&&(u||!v)),p._close=!!(d===42?v:v&&(b||!y)),r(g)}}function eg(a,r){a.column+=r,a.offset+=r,a._bufferIndex+=r}const Zv={name:"autolink",tokenize:Hv};function Hv(a,r,l){let s=0;return u;function u(S){return a.enter("autolink"),a.enter("autolinkMarker"),a.consume(S),a.exit("autolinkMarker"),a.enter("autolinkProtocol"),d}function d(S){return Yt(S)?(a.consume(S),f):S===64?l(S):p(S)}function f(S){return S===43||S===45||S===46||gt(S)?(s=1,h(S)):p(S)}function h(S){return S===58?(a.consume(S),s=0,g):(S===43||S===45||S===46||gt(S))&&s++<32?(a.consume(S),h):(s=0,p(S))}function g(S){return S===62?(a.exit("autolinkProtocol"),a.enter("autolinkMarker"),a.consume(S),a.exit("autolinkMarker"),a.exit("autolink"),r):S===null||S===32||S===60||Gu(S)?l(S):(a.consume(S),g)}function p(S){return S===64?(a.consume(S),b):_v(S)?(a.consume(S),p):l(S)}function b(S){return gt(S)?y(S):l(S)}function y(S){return S===46?(a.consume(S),s=0,b):S===62?(a.exit("autolinkProtocol").type="autolinkEmail",a.enter("autolinkMarker"),a.consume(S),a.exit("autolinkMarker"),a.exit("autolink"),r):v(S)}function v(S){if((S===45||gt(S))&&s++<63){const L=S===45?v:y;return a.consume(S),L}return l(S)}}const ao={partial:!0,tokenize:Vv};function Vv(a,r,l){return s;function s(d){return Qe(d)?un(a,u,"linePrefix")(d):u(d)}function u(d){return d===null||Re(d)?r(d):l(d)}}const lb={continuation:{tokenize:Yv},exit:Gv,name:"blockQuote",tokenize:qv};function qv(a,r,l){const s=this;return u;function u(f){if(f===62){const h=s.containerState;return h.open||(a.enter("blockQuote",{_container:!0}),h.open=!0),a.enter("blockQuotePrefix"),a.enter("blockQuoteMarker"),a.consume(f),a.exit("blockQuoteMarker"),d}return l(f)}function d(f){return Qe(f)?(a.enter("blockQuotePrefixWhitespace"),a.consume(f),a.exit("blockQuotePrefixWhitespace"),a.exit("blockQuotePrefix"),r):(a.exit("blockQuotePrefix"),r(f))}}function Yv(a,r,l){const s=this;return u;function u(f){return Qe(f)?un(a,d,"linePrefix",s.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(f):d(f)}function d(f){return a.attempt(lb,r,l)(f)}}function Gv(a){a.exit("blockQuote")}const sb={name:"characterEscape",tokenize:Qv};function Qv(a,r,l){return s;function s(d){return a.enter("characterEscape"),a.enter("escapeMarker"),a.consume(d),a.exit("escapeMarker"),u}function u(d){return Cv(d)?(a.enter("characterEscapeValue"),a.consume(d),a.exit("characterEscapeValue"),a.exit("characterEscape"),r):l(d)}}const ob={name:"characterReference",tokenize:Fv};function Fv(a,r,l){const s=this;let u=0,d,f;return h;function h(y){return a.enter("characterReference"),a.enter("characterReferenceMarker"),a.consume(y),a.exit("characterReferenceMarker"),g}function g(y){return y===35?(a.enter("characterReferenceMarkerNumeric"),a.consume(y),a.exit("characterReferenceMarkerNumeric"),p):(a.enter("characterReferenceValue"),d=31,f=gt,b(y))}function p(y){return y===88||y===120?(a.enter("characterReferenceMarkerHexadecimal"),a.consume(y),a.exit("characterReferenceMarkerHexadecimal"),a.enter("characterReferenceValue"),d=6,f=Mv,b):(a.enter("characterReferenceValue"),d=7,f=Qu,b(y))}function b(y){if(y===59&&u){const v=a.exit("characterReferenceValue");return f===gt&&!hd(s.sliceSerialize(v))?l(y):(a.enter("characterReferenceMarker"),a.consume(y),a.exit("characterReferenceMarker"),a.exit("characterReference"),r)}return f(y)&&u++<d?(a.consume(y),b):l(y)}}const ng={partial:!0,tokenize:Jv},tg={concrete:!0,name:"codeFenced",tokenize:Kv};function Kv(a,r,l){const s=this,u={partial:!0,tokenize:ze};let d=0,f=0,h;return g;function g(X){return p(X)}function p(X){const R=s.events[s.events.length-1];return d=R&&R[1].type==="linePrefix"?R[2].sliceSerialize(R[1],!0).length:0,h=X,a.enter("codeFenced"),a.enter("codeFencedFence"),a.enter("codeFencedFenceSequence"),b(X)}function b(X){return X===h?(f++,a.consume(X),b):f<3?l(X):(a.exit("codeFencedFenceSequence"),Qe(X)?un(a,y,"whitespace")(X):y(X))}function y(X){return X===null||Re(X)?(a.exit("codeFencedFence"),s.interrupt?r(X):a.check(ng,O,de)(X)):(a.enter("codeFencedFenceInfo"),a.enter("chunkString",{contentType:"string"}),v(X))}function v(X){return X===null||Re(X)?(a.exit("chunkString"),a.exit("codeFencedFenceInfo"),y(X)):Qe(X)?(a.exit("chunkString"),a.exit("codeFencedFenceInfo"),un(a,S,"whitespace")(X)):X===96&&X===h?l(X):(a.consume(X),v)}function S(X){return X===null||Re(X)?y(X):(a.enter("codeFencedFenceMeta"),a.enter("chunkString",{contentType:"string"}),L(X))}function L(X){return X===null||Re(X)?(a.exit("chunkString"),a.exit("codeFencedFenceMeta"),y(X)):X===96&&X===h?l(X):(a.consume(X),L)}function O(X){return a.attempt(u,de,Z)(X)}function Z(X){return a.enter("lineEnding"),a.consume(X),a.exit("lineEnding"),U}function U(X){return d>0&&Qe(X)?un(a,G,"linePrefix",d+1)(X):G(X)}function G(X){return X===null||Re(X)?a.check(ng,O,de)(X):(a.enter("codeFlowValue"),q(X))}function q(X){return X===null||Re(X)?(a.exit("codeFlowValue"),G(X)):(a.consume(X),q)}function de(X){return a.exit("codeFenced"),r(X)}function ze(X,R,te){let he=0;return ue;function ue($){return X.enter("lineEnding"),X.consume($),X.exit("lineEnding"),ie}function ie($){return X.enter("codeFencedFence"),Qe($)?un(X,ne,"linePrefix",s.parser.constructs.disable.null.includes("codeIndented")?void 0:4)($):ne($)}function ne($){return $===h?(X.enter("codeFencedFenceSequence"),Ae($)):te($)}function Ae($){return $===h?(he++,X.consume($),Ae):he>=f?(X.exit("codeFencedFenceSequence"),Qe($)?un(X,fe,"whitespace")($):fe($)):te($)}function fe($){return $===null||Re($)?(X.exit("codeFencedFence"),R($)):te($)}}}function Jv(a,r,l){const s=this;return u;function u(f){return f===null?l(f):(a.enter("lineEnding"),a.consume(f),a.exit("lineEnding"),d)}function d(f){return s.parser.lazy[s.now().line]?l(f):r(f)}}const Ru={name:"codeIndented",tokenize:e7},$v={partial:!0,tokenize:n7};function e7(a,r,l){const s=this;return u;function u(p){return a.enter("codeIndented"),un(a,d,"linePrefix",5)(p)}function d(p){const b=s.events[s.events.length-1];return b&&b[1].type==="linePrefix"&&b[2].sliceSerialize(b[1],!0).length>=4?f(p):l(p)}function f(p){return p===null?g(p):Re(p)?a.attempt($v,f,g)(p):(a.enter("codeFlowValue"),h(p))}function h(p){return p===null||Re(p)?(a.exit("codeFlowValue"),f(p)):(a.consume(p),h)}function g(p){return a.exit("codeIndented"),r(p)}}function n7(a,r,l){const s=this;return u;function u(f){return s.parser.lazy[s.now().line]?l(f):Re(f)?(a.enter("lineEnding"),a.consume(f),a.exit("lineEnding"),u):un(a,d,"linePrefix",5)(f)}function d(f){const h=s.events[s.events.length-1];return h&&h[1].type==="linePrefix"&&h[2].sliceSerialize(h[1],!0).length>=4?r(f):Re(f)?u(f):l(f)}}const t7={name:"codeText",previous:i7,resolve:a7,tokenize:r7};function a7(a){let r=a.length-4,l=3,s,u;if((a[l][1].type==="lineEnding"||a[l][1].type==="space")&&(a[r][1].type==="lineEnding"||a[r][1].type==="space")){for(s=l;++s<r;)if(a[s][1].type==="codeTextData"){a[l][1].type="codeTextPadding",a[r][1].type="codeTextPadding",l+=2,r-=2;break}}for(s=l-1,r++;++s<=r;)u===void 0?s!==r&&a[s][1].type!=="lineEnding"&&(u=s):(s===r||a[s][1].type==="lineEnding")&&(a[u][1].type="codeTextData",s!==u+2&&(a[u][1].end=a[s-1][1].end,a.splice(u+2,s-u-2),r-=s-u-2,s=u+2),u=void 0);return a}function i7(a){return a!==96||this.events[this.events.length-1][1].type==="characterEscape"}function r7(a,r,l){let s=0,u,d;return f;function f(y){return a.enter("codeText"),a.enter("codeTextSequence"),h(y)}function h(y){return y===96?(a.consume(y),s++,h):(a.exit("codeTextSequence"),g(y))}function g(y){return y===null?l(y):y===32?(a.enter("space"),a.consume(y),a.exit("space"),g):y===96?(d=a.enter("codeTextSequence"),u=0,b(y)):Re(y)?(a.enter("lineEnding"),a.consume(y),a.exit("lineEnding"),g):(a.enter("codeTextData"),p(y))}function p(y){return y===null||y===32||y===96||Re(y)?(a.exit("codeTextData"),g(y)):(a.consume(y),p)}function b(y){return y===96?(a.consume(y),u++,b):u===s?(a.exit("codeTextSequence"),a.exit("codeText"),r(y)):(d.type="codeTextData",p(y))}}class l7{constructor(r){this.left=r?[...r]:[],this.right=[]}get(r){if(r<0||r>=this.left.length+this.right.length)throw new RangeError("Cannot access index `"+r+"` in a splice buffer of size `"+(this.left.length+this.right.length)+"`");return r<this.left.length?this.left[r]:this.right[this.right.length-r+this.left.length-1]}get length(){return this.left.length+this.right.length}shift(){return this.setCursor(0),this.right.pop()}slice(r,l){const s=l??Number.POSITIVE_INFINITY;return s<this.left.length?this.left.slice(r,s):r>this.left.length?this.right.slice(this.right.length-s+this.left.length,this.right.length-r+this.left.length).reverse():this.left.slice(r).concat(this.right.slice(this.right.length-s+this.left.length).reverse())}splice(r,l,s){const u=l||0;this.setCursor(Math.trunc(r));const d=this.right.splice(this.right.length-u,Number.POSITIVE_INFINITY);return s&&gl(this.left,s),d.reverse()}pop(){return this.setCursor(Number.POSITIVE_INFINITY),this.left.pop()}push(r){this.setCursor(Number.POSITIVE_INFINITY),this.left.push(r)}pushMany(r){this.setCursor(Number.POSITIVE_INFINITY),gl(this.left,r)}unshift(r){this.setCursor(0),this.right.push(r)}unshiftMany(r){this.setCursor(0),gl(this.right,r.reverse())}setCursor(r){if(!(r===this.left.length||r>this.left.length&&this.right.length===0||r<0&&this.left.length===0))if(r<this.left.length){const l=this.left.splice(r,Number.POSITIVE_INFINITY);gl(this.right,l.reverse())}else{const l=this.right.splice(this.left.length+this.right.length-r,Number.POSITIVE_INFINITY);gl(this.left,l.reverse())}}}function gl(a,r){let l=0;if(r.length<1e4)a.push(...r);else for(;l<r.length;)a.push(...r.slice(l,l+1e4)),l+=1e4}function cb(a){const r={};let l=-1,s,u,d,f,h,g,p;const b=new l7(a);for(;++l<b.length;){for(;l in r;)l=r[l];if(s=b.get(l),l&&s[1].type==="chunkFlow"&&b.get(l-1)[1].type==="listItemPrefix"&&(g=s[1]._tokenizer.events,d=0,d<g.length&&g[d][1].type==="lineEndingBlank"&&(d+=2),d<g.length&&g[d][1].type==="content"))for(;++d<g.length&&g[d][1].type!=="content";)g[d][1].type==="chunkText"&&(g[d][1]._isInFirstContentOfListItem=!0,d++);if(s[0]==="enter")s[1].contentType&&(Object.assign(r,s7(b,l)),l=r[l],p=!0);else if(s[1]._container){for(d=l,u=void 0;d--;)if(f=b.get(d),f[1].type==="lineEnding"||f[1].type==="lineEndingBlank")f[0]==="enter"&&(u&&(b.get(u)[1].type="lineEndingBlank"),f[1].type="lineEnding",u=d);else if(!(f[1].type==="linePrefix"||f[1].type==="listItemIndent"))break;u&&(s[1].end={...b.get(u)[1].start},h=b.slice(u,l),h.unshift(s),b.splice(u,l-u+1,h))}}return Gt(a,0,Number.POSITIVE_INFINITY,b.slice(0)),!p}function s7(a,r){const l=a.get(r)[1],s=a.get(r)[2];let u=r-1;const d=[];let f=l._tokenizer;f||(f=s.parser[l.contentType](l.start),l._contentTypeTextTrailing&&(f._contentTypeTextTrailing=!0));const h=f.events,g=[],p={};let b,y,v=-1,S=l,L=0,O=0;const Z=[O];for(;S;){for(;a.get(++u)[1]!==S;);d.push(u),S._tokenizer||(b=s.sliceStream(S),S.next||b.push(null),y&&f.defineSkip(S.start),S._isInFirstContentOfListItem&&(f._gfmTasklistFirstContentOfListItem=!0),f.write(b),S._isInFirstContentOfListItem&&(f._gfmTasklistFirstContentOfListItem=void 0)),y=S,S=S.next}for(S=l;++v<h.length;)h[v][0]==="exit"&&h[v-1][0]==="enter"&&h[v][1].type===h[v-1][1].type&&h[v][1].start.line!==h[v][1].end.line&&(O=v+1,Z.push(O),S._tokenizer=void 0,S.previous=void 0,S=S.next);for(f.events=[],S?(S._tokenizer=void 0,S.previous=void 0):Z.pop(),v=Z.length;v--;){const U=h.slice(Z[v],Z[v+1]),G=d.pop();g.push([G,G+U.length-1]),a.splice(G,2,U)}for(g.reverse(),v=-1;++v<g.length;)p[L+g[v][0]]=L+g[v][1],L+=g[v][1]-g[v][0]-1;return p}const o7={resolve:u7,tokenize:d7},c7={partial:!0,tokenize:f7};function u7(a){return cb(a),a}function d7(a,r){let l;return s;function s(h){return a.enter("content"),l=a.enter("chunkContent",{contentType:"content"}),u(h)}function u(h){return h===null?d(h):Re(h)?a.check(c7,f,d)(h):(a.consume(h),u)}function d(h){return a.exit("chunkContent"),a.exit("content"),r(h)}function f(h){return a.consume(h),a.exit("chunkContent"),l.next=a.enter("chunkContent",{contentType:"content",previous:l}),l=l.next,u}}function f7(a,r,l){const s=this;return u;function u(f){return a.exit("chunkContent"),a.enter("lineEnding"),a.consume(f),a.exit("lineEnding"),un(a,d,"linePrefix")}function d(f){if(f===null||Re(f))return l(f);const h=s.events[s.events.length-1];return!s.parser.constructs.disable.null.includes("codeIndented")&&h&&h[1].type==="linePrefix"&&h[2].sliceSerialize(h[1],!0).length>=4?r(f):a.interrupt(s.parser.constructs.flow,l,r)(f)}}function ub(a,r,l,s,u,d,f,h,g){const p=g||Number.POSITIVE_INFINITY;let b=0;return y;function y(U){return U===60?(a.enter(s),a.enter(u),a.enter(d),a.consume(U),a.exit(d),v):U===null||U===32||U===41||Gu(U)?l(U):(a.enter(s),a.enter(f),a.enter(h),a.enter("chunkString",{contentType:"string"}),O(U))}function v(U){return U===62?(a.enter(d),a.consume(U),a.exit(d),a.exit(u),a.exit(s),r):(a.enter(h),a.enter("chunkString",{contentType:"string"}),S(U))}function S(U){return U===62?(a.exit("chunkString"),a.exit(h),v(U)):U===null||U===60||Re(U)?l(U):(a.consume(U),U===92?L:S)}function L(U){return U===60||U===62||U===92?(a.consume(U),S):S(U)}function O(U){return!b&&(U===null||U===41||it(U))?(a.exit("chunkString"),a.exit(h),a.exit(f),a.exit(s),r(U)):b<p&&U===40?(a.consume(U),b++,O):U===41?(a.consume(U),b--,O):U===null||U===32||U===40||Gu(U)?l(U):(a.consume(U),U===92?Z:O)}function Z(U){return U===40||U===41||U===92?(a.consume(U),O):O(U)}}function db(a,r,l,s,u,d){const f=this;let h=0,g;return p;function p(S){return a.enter(s),a.enter(u),a.consume(S),a.exit(u),a.enter(d),b}function b(S){return h>999||S===null||S===91||S===93&&!g||S===94&&!h&&"_hiddenFootnoteSupport"in f.parser.constructs?l(S):S===93?(a.exit(d),a.enter(u),a.consume(S),a.exit(u),a.exit(s),r):Re(S)?(a.enter("lineEnding"),a.consume(S),a.exit("lineEnding"),b):(a.enter("chunkString",{contentType:"string"}),y(S))}function y(S){return S===null||S===91||S===93||Re(S)||h++>999?(a.exit("chunkString"),b(S)):(a.consume(S),g||(g=!Qe(S)),S===92?v:y)}function v(S){return S===91||S===92||S===93?(a.consume(S),h++,y):y(S)}}function fb(a,r,l,s,u,d){let f;return h;function h(v){return v===34||v===39||v===40?(a.enter(s),a.enter(u),a.consume(v),a.exit(u),f=v===40?41:v,g):l(v)}function g(v){return v===f?(a.enter(u),a.consume(v),a.exit(u),a.exit(s),r):(a.enter(d),p(v))}function p(v){return v===f?(a.exit(d),g(f)):v===null?l(v):Re(v)?(a.enter("lineEnding"),a.consume(v),a.exit("lineEnding"),un(a,p,"linePrefix")):(a.enter("chunkString",{contentType:"string"}),b(v))}function b(v){return v===f||v===null||Re(v)?(a.exit("chunkString"),p(v)):(a.consume(v),v===92?y:b)}function y(v){return v===f||v===92?(a.consume(v),b):b(v)}}function Sl(a,r){let l;return s;function s(u){return Re(u)?(a.enter("lineEnding"),a.consume(u),a.exit("lineEnding"),l=!0,s):Qe(u)?un(a,s,l?"linePrefix":"lineSuffix")(u):r(u)}}const p7={name:"definition",tokenize:m7},h7={partial:!0,tokenize:g7};function m7(a,r,l){const s=this;let u;return d;function d(S){return a.enter("definition"),f(S)}function f(S){return db.call(s,a,h,l,"definitionLabel","definitionLabelMarker","definitionLabelString")(S)}function h(S){return u=gr(s.sliceSerialize(s.events[s.events.length-1][1]).slice(1,-1)),S===58?(a.enter("definitionMarker"),a.consume(S),a.exit("definitionMarker"),g):l(S)}function g(S){return it(S)?Sl(a,p)(S):p(S)}function p(S){return ub(a,b,l,"definitionDestination","definitionDestinationLiteral","definitionDestinationLiteralMarker","definitionDestinationRaw","definitionDestinationString")(S)}function b(S){return a.attempt(h7,y,y)(S)}function y(S){return Qe(S)?un(a,v,"whitespace")(S):v(S)}function v(S){return S===null||Re(S)?(a.exit("definition"),s.parser.defined.push(u),r(S)):l(S)}}function g7(a,r,l){return s;function s(h){return it(h)?Sl(a,u)(h):l(h)}function u(h){return fb(a,d,l,"definitionTitle","definitionTitleMarker","definitionTitleString")(h)}function d(h){return Qe(h)?un(a,f,"whitespace")(h):f(h)}function f(h){return h===null||Re(h)?r(h):l(h)}}const b7={name:"hardBreakEscape",tokenize:y7};function y7(a,r,l){return s;function s(d){return a.enter("hardBreakEscape"),a.consume(d),u}function u(d){return Re(d)?(a.exit("hardBreakEscape"),r(d)):l(d)}}const z7={name:"headingAtx",resolve:S7,tokenize:v7};function S7(a,r){let l=a.length-2,s=3,u,d;return a[s][1].type==="whitespace"&&(s+=2),l-2>s&&a[l][1].type==="whitespace"&&(l-=2),a[l][1].type==="atxHeadingSequence"&&(s===l-1||l-4>s&&a[l-2][1].type==="whitespace")&&(l-=s+1===l?2:4),l>s&&(u={type:"atxHeadingText",start:a[s][1].start,end:a[l][1].end},d={type:"chunkText",start:a[s][1].start,end:a[l][1].end,contentType:"text"},Gt(a,s,l-s+1,[["enter",u,r],["enter",d,r],["exit",d,r],["exit",u,r]])),a}function v7(a,r,l){let s=0;return u;function u(b){return a.enter("atxHeading"),d(b)}function d(b){return a.enter("atxHeadingSequence"),f(b)}function f(b){return b===35&&s++<6?(a.consume(b),f):b===null||it(b)?(a.exit("atxHeadingSequence"),h(b)):l(b)}function h(b){return b===35?(a.enter("atxHeadingSequence"),g(b)):b===null||Re(b)?(a.exit("atxHeading"),r(b)):Qe(b)?un(a,h,"whitespace")(b):(a.enter("atxHeadingText"),p(b))}function g(b){return b===35?(a.consume(b),g):(a.exit("atxHeadingSequence"),h(b))}function p(b){return b===null||b===35||it(b)?(a.exit("atxHeadingText"),h(b)):(a.consume(b),p)}}const E7=["address","article","aside","base","basefont","blockquote","body","caption","center","col","colgroup","dd","details","dialog","dir","div","dl","dt","fieldset","figcaption","figure","footer","form","frame","frameset","h1","h2","h3","h4","h5","h6","head","header","hr","html","iframe","legend","li","link","main","menu","menuitem","nav","noframes","ol","optgroup","option","p","param","search","section","summary","table","tbody","td","tfoot","th","thead","title","tr","track","ul"],ag=["pre","script","style","textarea"],x7={concrete:!0,name:"htmlFlow",resolveTo:A7,tokenize:w7},D7={partial:!0,tokenize:k7},T7={partial:!0,tokenize:R7};function A7(a){let r=a.length;for(;r--&&!(a[r][0]==="enter"&&a[r][1].type==="htmlFlow"););return r>1&&a[r-2][1].type==="linePrefix"&&(a[r][1].start=a[r-2][1].start,a[r+1][1].start=a[r-2][1].start,a.splice(r-2,2)),a}function w7(a,r,l){const s=this;let u,d,f,h,g;return p;function p(E){return b(E)}function b(E){return a.enter("htmlFlow"),a.enter("htmlFlowData"),a.consume(E),y}function y(E){return E===33?(a.consume(E),v):E===47?(a.consume(E),d=!0,O):E===63?(a.consume(E),u=3,s.interrupt?r:x):Yt(E)?(a.consume(E),f=String.fromCharCode(E),Z):l(E)}function v(E){return E===45?(a.consume(E),u=2,S):E===91?(a.consume(E),u=5,h=0,L):Yt(E)?(a.consume(E),u=4,s.interrupt?r:x):l(E)}function S(E){return E===45?(a.consume(E),s.interrupt?r:x):l(E)}function L(E){const re="CDATA[";return E===re.charCodeAt(h++)?(a.consume(E),h===re.length?s.interrupt?r:ne:L):l(E)}function O(E){return Yt(E)?(a.consume(E),f=String.fromCharCode(E),Z):l(E)}function Z(E){if(E===null||E===47||E===62||it(E)){const re=E===47,ye=f.toLowerCase();return!re&&!d&&ag.includes(ye)?(u=1,s.interrupt?r(E):ne(E)):E7.includes(f.toLowerCase())?(u=6,re?(a.consume(E),U):s.interrupt?r(E):ne(E)):(u=7,s.interrupt&&!s.parser.lazy[s.now().line]?l(E):d?G(E):q(E))}return E===45||gt(E)?(a.consume(E),f+=String.fromCharCode(E),Z):l(E)}function U(E){return E===62?(a.consume(E),s.interrupt?r:ne):l(E)}function G(E){return Qe(E)?(a.consume(E),G):ue(E)}function q(E){return E===47?(a.consume(E),ue):E===58||E===95||Yt(E)?(a.consume(E),de):Qe(E)?(a.consume(E),q):ue(E)}function de(E){return E===45||E===46||E===58||E===95||gt(E)?(a.consume(E),de):ze(E)}function ze(E){return E===61?(a.consume(E),X):Qe(E)?(a.consume(E),ze):q(E)}function X(E){return E===null||E===60||E===61||E===62||E===96?l(E):E===34||E===39?(a.consume(E),g=E,R):Qe(E)?(a.consume(E),X):te(E)}function R(E){return E===g?(a.consume(E),g=null,he):E===null||Re(E)?l(E):(a.consume(E),R)}function te(E){return E===null||E===34||E===39||E===47||E===60||E===61||E===62||E===96||it(E)?ze(E):(a.consume(E),te)}function he(E){return E===47||E===62||Qe(E)?q(E):l(E)}function ue(E){return E===62?(a.consume(E),ie):l(E)}function ie(E){return E===null||Re(E)?ne(E):Qe(E)?(a.consume(E),ie):l(E)}function ne(E){return E===45&&u===2?(a.consume(E),C):E===60&&u===1?(a.consume(E),K):E===62&&u===4?(a.consume(E),T):E===63&&u===3?(a.consume(E),x):E===93&&u===5?(a.consume(E),Me):Re(E)&&(u===6||u===7)?(a.exit("htmlFlowData"),a.check(D7,j,Ae)(E)):E===null||Re(E)?(a.exit("htmlFlowData"),Ae(E)):(a.consume(E),ne)}function Ae(E){return a.check(T7,fe,j)(E)}function fe(E){return a.enter("lineEnding"),a.consume(E),a.exit("lineEnding"),$}function $(E){return E===null||Re(E)?Ae(E):(a.enter("htmlFlowData"),ne(E))}function C(E){return E===45?(a.consume(E),x):ne(E)}function K(E){return E===47?(a.consume(E),f="",le):ne(E)}function le(E){if(E===62){const re=f.toLowerCase();return ag.includes(re)?(a.consume(E),T):ne(E)}return Yt(E)&&f.length<8?(a.consume(E),f+=String.fromCharCode(E),le):ne(E)}function Me(E){return E===93?(a.consume(E),x):ne(E)}function x(E){return E===62?(a.consume(E),T):E===45&&u===2?(a.consume(E),x):ne(E)}function T(E){return E===null||Re(E)?(a.exit("htmlFlowData"),j(E)):(a.consume(E),T)}function j(E){return a.exit("htmlFlow"),r(E)}}function R7(a,r,l){const s=this;return u;function u(f){return Re(f)?(a.enter("lineEnding"),a.consume(f),a.exit("lineEnding"),d):l(f)}function d(f){return s.parser.lazy[s.now().line]?l(f):r(f)}}function k7(a,r,l){return s;function s(u){return a.enter("lineEnding"),a.consume(u),a.exit("lineEnding"),a.attempt(ao,r,l)}}const I7={name:"htmlText",tokenize:_7};function _7(a,r,l){const s=this;let u,d,f;return h;function h(x){return a.enter("htmlText"),a.enter("htmlTextData"),a.consume(x),g}function g(x){return x===33?(a.consume(x),p):x===47?(a.consume(x),ze):x===63?(a.consume(x),q):Yt(x)?(a.consume(x),te):l(x)}function p(x){return x===45?(a.consume(x),b):x===91?(a.consume(x),d=0,L):Yt(x)?(a.consume(x),G):l(x)}function b(x){return x===45?(a.consume(x),S):l(x)}function y(x){return x===null?l(x):x===45?(a.consume(x),v):Re(x)?(f=y,K(x)):(a.consume(x),y)}function v(x){return x===45?(a.consume(x),S):y(x)}function S(x){return x===62?C(x):x===45?v(x):y(x)}function L(x){const T="CDATA[";return x===T.charCodeAt(d++)?(a.consume(x),d===T.length?O:L):l(x)}function O(x){return x===null?l(x):x===93?(a.consume(x),Z):Re(x)?(f=O,K(x)):(a.consume(x),O)}function Z(x){return x===93?(a.consume(x),U):O(x)}function U(x){return x===62?C(x):x===93?(a.consume(x),U):O(x)}function G(x){return x===null||x===62?C(x):Re(x)?(f=G,K(x)):(a.consume(x),G)}function q(x){return x===null?l(x):x===63?(a.consume(x),de):Re(x)?(f=q,K(x)):(a.consume(x),q)}function de(x){return x===62?C(x):q(x)}function ze(x){return Yt(x)?(a.consume(x),X):l(x)}function X(x){return x===45||gt(x)?(a.consume(x),X):R(x)}function R(x){return Re(x)?(f=R,K(x)):Qe(x)?(a.consume(x),R):C(x)}function te(x){return x===45||gt(x)?(a.consume(x),te):x===47||x===62||it(x)?he(x):l(x)}function he(x){return x===47?(a.consume(x),C):x===58||x===95||Yt(x)?(a.consume(x),ue):Re(x)?(f=he,K(x)):Qe(x)?(a.consume(x),he):C(x)}function ue(x){return x===45||x===46||x===58||x===95||gt(x)?(a.consume(x),ue):ie(x)}function ie(x){return x===61?(a.consume(x),ne):Re(x)?(f=ie,K(x)):Qe(x)?(a.consume(x),ie):he(x)}function ne(x){return x===null||x===60||x===61||x===62||x===96?l(x):x===34||x===39?(a.consume(x),u=x,Ae):Re(x)?(f=ne,K(x)):Qe(x)?(a.consume(x),ne):(a.consume(x),fe)}function Ae(x){return x===u?(a.consume(x),u=void 0,$):x===null?l(x):Re(x)?(f=Ae,K(x)):(a.consume(x),Ae)}function fe(x){return x===null||x===34||x===39||x===60||x===61||x===96?l(x):x===47||x===62||it(x)?he(x):(a.consume(x),fe)}function $(x){return x===47||x===62||it(x)?he(x):l(x)}function C(x){return x===62?(a.consume(x),a.exit("htmlTextData"),a.exit("htmlText"),r):l(x)}function K(x){return a.exit("htmlTextData"),a.enter("lineEnding"),a.consume(x),a.exit("lineEnding"),le}function le(x){return Qe(x)?un(a,Me,"linePrefix",s.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(x):Me(x)}function Me(x){return a.enter("htmlTextData"),f(x)}}const gd={name:"labelEnd",resolveAll:W7,resolveTo:O7,tokenize:P7},M7={tokenize:N7},C7={tokenize:U7},L7={tokenize:j7};function W7(a){let r=-1;const l=[];for(;++r<a.length;){const s=a[r][1];if(l.push(a[r]),s.type==="labelImage"||s.type==="labelLink"||s.type==="labelEnd"){const u=s.type==="labelImage"?4:2;s.type="data",r+=u}}return a.length!==l.length&&Gt(a,0,a.length,l),a}function O7(a,r){let l=a.length,s=0,u,d,f,h;for(;l--;)if(u=a[l][1],d){if(u.type==="link"||u.type==="labelLink"&&u._inactive)break;a[l][0]==="enter"&&u.type==="labelLink"&&(u._inactive=!0)}else if(f){if(a[l][0]==="enter"&&(u.type==="labelImage"||u.type==="labelLink")&&!u._balanced&&(d=l,u.type!=="labelLink")){s=2;break}}else u.type==="labelEnd"&&(f=l);const g={type:a[d][1].type==="labelLink"?"link":"image",start:{...a[d][1].start},end:{...a[a.length-1][1].end}},p={type:"label",start:{...a[d][1].start},end:{...a[f][1].end}},b={type:"labelText",start:{...a[d+s+2][1].end},end:{...a[f-2][1].start}};return h=[["enter",g,r],["enter",p,r]],h=It(h,a.slice(d+1,d+s+3)),h=It(h,[["enter",b,r]]),h=It(h,md(r.parser.constructs.insideSpan.null,a.slice(d+s+4,f-3),r)),h=It(h,[["exit",b,r],a[f-2],a[f-1],["exit",p,r]]),h=It(h,a.slice(f+1)),h=It(h,[["exit",g,r]]),Gt(a,d,a.length,h),a}function P7(a,r,l){const s=this;let u=s.events.length,d,f;for(;u--;)if((s.events[u][1].type==="labelImage"||s.events[u][1].type==="labelLink")&&!s.events[u][1]._balanced){d=s.events[u][1];break}return h;function h(v){return d?d._inactive?y(v):(f=s.parser.defined.includes(gr(s.sliceSerialize({start:d.end,end:s.now()}))),a.enter("labelEnd"),a.enter("labelMarker"),a.consume(v),a.exit("labelMarker"),a.exit("labelEnd"),g):l(v)}function g(v){return v===40?a.attempt(M7,b,f?b:y)(v):v===91?a.attempt(C7,b,f?p:y)(v):f?b(v):y(v)}function p(v){return a.attempt(L7,b,y)(v)}function b(v){return r(v)}function y(v){return d._balanced=!0,l(v)}}function N7(a,r,l){return s;function s(y){return a.enter("resource"),a.enter("resourceMarker"),a.consume(y),a.exit("resourceMarker"),u}function u(y){return it(y)?Sl(a,d)(y):d(y)}function d(y){return y===41?b(y):ub(a,f,h,"resourceDestination","resourceDestinationLiteral","resourceDestinationLiteralMarker","resourceDestinationRaw","resourceDestinationString",32)(y)}function f(y){return it(y)?Sl(a,g)(y):b(y)}function h(y){return l(y)}function g(y){return y===34||y===39||y===40?fb(a,p,l,"resourceTitle","resourceTitleMarker","resourceTitleString")(y):b(y)}function p(y){return it(y)?Sl(a,b)(y):b(y)}function b(y){return y===41?(a.enter("resourceMarker"),a.consume(y),a.exit("resourceMarker"),a.exit("resource"),r):l(y)}}function U7(a,r,l){const s=this;return u;function u(h){return db.call(s,a,d,f,"reference","referenceMarker","referenceString")(h)}function d(h){return s.parser.defined.includes(gr(s.sliceSerialize(s.events[s.events.length-1][1]).slice(1,-1)))?r(h):l(h)}function f(h){return l(h)}}function j7(a,r,l){return s;function s(d){return a.enter("reference"),a.enter("referenceMarker"),a.consume(d),a.exit("referenceMarker"),u}function u(d){return d===93?(a.enter("referenceMarker"),a.consume(d),a.exit("referenceMarker"),a.exit("reference"),r):l(d)}}const B7={name:"labelStartImage",resolveAll:gd.resolveAll,tokenize:X7};function X7(a,r,l){const s=this;return u;function u(h){return a.enter("labelImage"),a.enter("labelImageMarker"),a.consume(h),a.exit("labelImageMarker"),d}function d(h){return h===91?(a.enter("labelMarker"),a.consume(h),a.exit("labelMarker"),a.exit("labelImage"),f):l(h)}function f(h){return h===94&&"_hiddenFootnoteSupport"in s.parser.constructs?l(h):r(h)}}const Z7={name:"labelStartLink",resolveAll:gd.resolveAll,tokenize:H7};function H7(a,r,l){const s=this;return u;function u(f){return a.enter("labelLink"),a.enter("labelMarker"),a.consume(f),a.exit("labelMarker"),a.exit("labelLink"),d}function d(f){return f===94&&"_hiddenFootnoteSupport"in s.parser.constructs?l(f):r(f)}}const ku={name:"lineEnding",tokenize:V7};function V7(a,r){return l;function l(s){return a.enter("lineEnding"),a.consume(s),a.exit("lineEnding"),un(a,r,"linePrefix")}}const Ys={name:"thematicBreak",tokenize:q7};function q7(a,r,l){let s=0,u;return d;function d(p){return a.enter("thematicBreak"),f(p)}function f(p){return u=p,h(p)}function h(p){return p===u?(a.enter("thematicBreakSequence"),g(p)):s>=3&&(p===null||Re(p))?(a.exit("thematicBreak"),r(p)):l(p)}function g(p){return p===u?(a.consume(p),s++,g):(a.exit("thematicBreakSequence"),Qe(p)?un(a,h,"whitespace")(p):h(p))}}const tt={continuation:{tokenize:F7},exit:J7,name:"list",tokenize:Q7},Y7={partial:!0,tokenize:$7},G7={partial:!0,tokenize:K7};function Q7(a,r,l){const s=this,u=s.events[s.events.length-1];let d=u&&u[1].type==="linePrefix"?u[2].sliceSerialize(u[1],!0).length:0,f=0;return h;function h(S){const L=s.containerState.type||(S===42||S===43||S===45?"listUnordered":"listOrdered");if(L==="listUnordered"?!s.containerState.marker||S===s.containerState.marker:Qu(S)){if(s.containerState.type||(s.containerState.type=L,a.enter(L,{_container:!0})),L==="listUnordered")return a.enter("listItemPrefix"),S===42||S===45?a.check(Ys,l,p)(S):p(S);if(!s.interrupt||S===49)return a.enter("listItemPrefix"),a.enter("listItemValue"),g(S)}return l(S)}function g(S){return Qu(S)&&++f<10?(a.consume(S),g):(!s.interrupt||f<2)&&(s.containerState.marker?S===s.containerState.marker:S===41||S===46)?(a.exit("listItemValue"),p(S)):l(S)}function p(S){return a.enter("listItemMarker"),a.consume(S),a.exit("listItemMarker"),s.containerState.marker=s.containerState.marker||S,a.check(ao,s.interrupt?l:b,a.attempt(Y7,v,y))}function b(S){return s.containerState.initialBlankLine=!0,d++,v(S)}function y(S){return Qe(S)?(a.enter("listItemPrefixWhitespace"),a.consume(S),a.exit("listItemPrefixWhitespace"),v):l(S)}function v(S){return s.containerState.size=d+s.sliceSerialize(a.exit("listItemPrefix"),!0).length,r(S)}}function F7(a,r,l){const s=this;return s.containerState._closeFlow=void 0,a.check(ao,u,d);function u(h){return s.containerState.furtherBlankLines=s.containerState.furtherBlankLines||s.containerState.initialBlankLine,un(a,r,"listItemIndent",s.containerState.size+1)(h)}function d(h){return s.containerState.furtherBlankLines||!Qe(h)?(s.containerState.furtherBlankLines=void 0,s.containerState.initialBlankLine=void 0,f(h)):(s.containerState.furtherBlankLines=void 0,s.containerState.initialBlankLine=void 0,a.attempt(G7,r,f)(h))}function f(h){return s.containerState._closeFlow=!0,s.interrupt=void 0,un(a,a.attempt(tt,r,l),"linePrefix",s.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(h)}}function K7(a,r,l){const s=this;return un(a,u,"listItemIndent",s.containerState.size+1);function u(d){const f=s.events[s.events.length-1];return f&&f[1].type==="listItemIndent"&&f[2].sliceSerialize(f[1],!0).length===s.containerState.size?r(d):l(d)}}function J7(a){a.exit(this.containerState.type)}function $7(a,r,l){const s=this;return un(a,u,"listItemPrefixWhitespace",s.parser.constructs.disable.null.includes("codeIndented")?void 0:5);function u(d){const f=s.events[s.events.length-1];return!Qe(d)&&f&&f[1].type==="listItemPrefixWhitespace"?r(d):l(d)}}const ig={name:"setextUnderline",resolveTo:e2,tokenize:n2};function e2(a,r){let l=a.length,s,u,d;for(;l--;)if(a[l][0]==="enter"){if(a[l][1].type==="content"){s=l;break}a[l][1].type==="paragraph"&&(u=l)}else a[l][1].type==="content"&&a.splice(l,1),!d&&a[l][1].type==="definition"&&(d=l);const f={type:"setextHeading",start:{...a[s][1].start},end:{...a[a.length-1][1].end}};return a[u][1].type="setextHeadingText",d?(a.splice(u,0,["enter",f,r]),a.splice(d+1,0,["exit",a[s][1],r]),a[s][1].end={...a[d][1].end}):a[s][1]=f,a.push(["exit",f,r]),a}function n2(a,r,l){const s=this;let u;return d;function d(p){let b=s.events.length,y;for(;b--;)if(s.events[b][1].type!=="lineEnding"&&s.events[b][1].type!=="linePrefix"&&s.events[b][1].type!=="content"){y=s.events[b][1].type==="paragraph";break}return!s.parser.lazy[s.now().line]&&(s.interrupt||y)?(a.enter("setextHeadingLine"),u=p,f(p)):l(p)}function f(p){return a.enter("setextHeadingLineSequence"),h(p)}function h(p){return p===u?(a.consume(p),h):(a.exit("setextHeadingLineSequence"),Qe(p)?un(a,g,"lineSuffix")(p):g(p))}function g(p){return p===null||Re(p)?(a.exit("setextHeadingLine"),r(p)):l(p)}}const t2={tokenize:a2};function a2(a){const r=this,l=a.attempt(ao,s,a.attempt(this.parser.constructs.flowInitial,u,un(a,a.attempt(this.parser.constructs.flow,u,a.attempt(o7,u)),"linePrefix")));return l;function s(d){if(d===null){a.consume(d);return}return a.enter("lineEndingBlank"),a.consume(d),a.exit("lineEndingBlank"),r.currentConstruct=void 0,l}function u(d){if(d===null){a.consume(d);return}return a.enter("lineEnding"),a.consume(d),a.exit("lineEnding"),r.currentConstruct=void 0,l}}const i2={resolveAll:hb()},r2=pb("string"),l2=pb("text");function pb(a){return{resolveAll:hb(a==="text"?s2:void 0),tokenize:r};function r(l){const s=this,u=this.parser.constructs[a],d=l.attempt(u,f,h);return f;function f(b){return p(b)?d(b):h(b)}function h(b){if(b===null){l.consume(b);return}return l.enter("data"),l.consume(b),g}function g(b){return p(b)?(l.exit("data"),d(b)):(l.consume(b),g)}function p(b){if(b===null)return!0;const y=u[b];let v=-1;if(y)for(;++v<y.length;){const S=y[v];if(!S.previous||S.previous.call(s,s.previous))return!0}return!1}}}function hb(a){return r;function r(l,s){let u=-1,d;for(;++u<=l.length;)d===void 0?l[u]&&l[u][1].type==="data"&&(d=u,u++):(!l[u]||l[u][1].type!=="data")&&(u!==d+2&&(l[d][1].end=l[u-1][1].end,l.splice(d+2,u-d-2),u=d+2),d=void 0);return a?a(l,s):l}}function s2(a,r){let l=0;for(;++l<=a.length;)if((l===a.length||a[l][1].type==="lineEnding")&&a[l-1][1].type==="data"){const s=a[l-1][1],u=r.sliceStream(s);let d=u.length,f=-1,h=0,g;for(;d--;){const p=u[d];if(typeof p=="string"){for(f=p.length;p.charCodeAt(f-1)===32;)h++,f--;if(f)break;f=-1}else if(p===-2)g=!0,h++;else if(p!==-1){d++;break}}if(r._contentTypeTextTrailing&&l===a.length&&(h=0),h){const p={type:l===a.length||g||h<2?"lineSuffix":"hardBreakTrailing",start:{_bufferIndex:d?f:s.start._bufferIndex+f,_index:s.start._index+d,line:s.end.line,column:s.end.column-h,offset:s.end.offset-h},end:{...s.end}};s.end={...p.start},s.start.offset===s.end.offset?Object.assign(s,p):(a.splice(l,0,["enter",p,r],["exit",p,r]),l+=2)}l++}return a}const o2={42:tt,43:tt,45:tt,48:tt,49:tt,50:tt,51:tt,52:tt,53:tt,54:tt,55:tt,56:tt,57:tt,62:lb},c2={91:p7},u2={[-2]:Ru,[-1]:Ru,32:Ru},d2={35:z7,42:Ys,45:[ig,Ys],60:x7,61:ig,95:Ys,96:tg,126:tg},f2={38:ob,92:sb},p2={[-5]:ku,[-4]:ku,[-3]:ku,33:B7,38:ob,42:Fu,60:[Zv,I7],91:Z7,92:[b7,sb],93:gd,95:Fu,96:t7},h2={null:[Fu,i2]},m2={null:[42,95]},g2={null:[]},b2=Object.freeze(Object.defineProperty({__proto__:null,attentionMarkers:m2,contentInitial:c2,disable:g2,document:o2,flow:d2,flowInitial:u2,insideSpan:h2,string:f2,text:p2},Symbol.toStringTag,{value:"Module"}));function y2(a,r,l){let s={_bufferIndex:-1,_index:0,line:l&&l.line||1,column:l&&l.column||1,offset:l&&l.offset||0};const u={},d=[];let f=[],h=[];const g={attempt:R(ze),check:R(X),consume:G,enter:q,exit:de,interrupt:R(X,{interrupt:!0})},p={code:null,containerState:{},defineSkip:O,events:[],now:L,parser:a,previous:null,sliceSerialize:v,sliceStream:S,write:y};let b=r.tokenize.call(p,g);return r.resolveAll&&d.push(r),p;function y(ie){return f=It(f,ie),Z(),f[f.length-1]!==null?[]:(te(r,0),p.events=md(d,p.events,p),p.events)}function v(ie,ne){return S2(S(ie),ne)}function S(ie){return z2(f,ie)}function L(){const{_bufferIndex:ie,_index:ne,line:Ae,column:fe,offset:$}=s;return{_bufferIndex:ie,_index:ne,line:Ae,column:fe,offset:$}}function O(ie){u[ie.line]=ie.column,ue()}function Z(){let ie;for(;s._index<f.length;){const ne=f[s._index];if(typeof ne=="string")for(ie=s._index,s._bufferIndex<0&&(s._bufferIndex=0);s._index===ie&&s._bufferIndex<ne.length;)U(ne.charCodeAt(s._bufferIndex));else U(ne)}}function U(ie){b=b(ie)}function G(ie){Re(ie)?(s.line++,s.column=1,s.offset+=ie===-3?2:1,ue()):ie!==-1&&(s.column++,s.offset++),s._bufferIndex<0?s._index++:(s._bufferIndex++,s._bufferIndex===f[s._index].length&&(s._bufferIndex=-1,s._index++)),p.previous=ie}function q(ie,ne){const Ae=ne||{};return Ae.type=ie,Ae.start=L(),p.events.push(["enter",Ae,p]),h.push(Ae),Ae}function de(ie){const ne=h.pop();return ne.end=L(),p.events.push(["exit",ne,p]),ne}function ze(ie,ne){te(ie,ne.from)}function X(ie,ne){ne.restore()}function R(ie,ne){return Ae;function Ae(fe,$,C){let K,le,Me,x;return Array.isArray(fe)?j(fe):"tokenize"in fe?j([fe]):T(fe);function T(be){return Ie;function Ie(Je){const Fe=Je!==null&&be[Je],qn=Je!==null&&be.null,_t=[...Array.isArray(Fe)?Fe:Fe?[Fe]:[],...Array.isArray(qn)?qn:qn?[qn]:[]];return j(_t)(Je)}}function j(be){return K=be,le=0,be.length===0?C:E(be[le])}function E(be){return Ie;function Ie(Je){return x=he(),Me=be,be.partial||(p.currentConstruct=be),be.name&&p.parser.constructs.disable.null.includes(be.name)?ye():be.tokenize.call(ne?Object.assign(Object.create(p),ne):p,g,re,ye)(Je)}}function re(be){return ie(Me,x),$}function ye(be){return x.restore(),++le<K.length?E(K[le]):C}}}function te(ie,ne){ie.resolveAll&&!d.includes(ie)&&d.push(ie),ie.resolve&&Gt(p.events,ne,p.events.length-ne,ie.resolve(p.events.slice(ne),p)),ie.resolveTo&&(p.events=ie.resolveTo(p.events,p))}function he(){const ie=L(),ne=p.previous,Ae=p.currentConstruct,fe=p.events.length,$=Array.from(h);return{from:fe,restore:C};function C(){s=ie,p.previous=ne,p.currentConstruct=Ae,p.events.length=fe,h=$,ue()}}function ue(){s.line in u&&s.column<2&&(s.column=u[s.line],s.offset+=u[s.line]-1)}}function z2(a,r){const l=r.start._index,s=r.start._bufferIndex,u=r.end._index,d=r.end._bufferIndex;let f;if(l===u)f=[a[l].slice(s,d)];else{if(f=a.slice(l,u),s>-1){const h=f[0];typeof h=="string"?f[0]=h.slice(s):f.shift()}d>0&&f.push(a[u].slice(0,d))}return f}function S2(a,r){let l=-1;const s=[];let u;for(;++l<a.length;){const d=a[l];let f;if(typeof d=="string")f=d;else switch(d){case-5:{f="\r";break}case-4:{f=`
`;break}case-3:{f=`\r
`;break}case-2:{f=r?" ":"	";break}case-1:{if(!r&&u)continue;f=" ";break}default:f=String.fromCharCode(d)}u=d===-2,s.push(f)}return s.join("")}function v2(a){const s={constructs:Rv([b2,...(a||{}).extensions||[]]),content:u(Ov),defined:[],document:u(Nv),flow:u(t2),lazy:{},string:u(r2),text:u(l2)};return s;function u(d){return f;function f(h){return y2(s,d,h)}}}function E2(a){for(;!cb(a););return a}const rg=/[\0\t\n\r]/g;function x2(){let a=1,r="",l=!0,s;return u;function u(d,f,h){const g=[];let p,b,y,v,S;for(d=r+(typeof d=="string"?d.toString():new TextDecoder(f||void 0).decode(d)),y=0,r="",l&&(d.charCodeAt(0)===65279&&y++,l=void 0);y<d.length;){if(rg.lastIndex=y,p=rg.exec(d),v=p&&p.index!==void 0?p.index:d.length,S=d.charCodeAt(v),!p){r=d.slice(y);break}if(S===10&&y===v&&s)g.push(-3),s=void 0;else switch(s&&(g.push(-5),s=void 0),y<v&&(g.push(d.slice(y,v)),a+=v-y),S){case 0:{g.push(65533),a++;break}case 9:{for(b=Math.ceil(a/4)*4,g.push(-2);a++<b;)g.push(-1);break}case 10:{g.push(-4),a=1;break}default:s=!0,a=1}y=v+1}return h&&(s&&g.push(-5),r&&g.push(r),g.push(null)),g}}const D2=/\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;function T2(a){return a.replace(D2,A2)}function A2(a,r,l){if(r)return r;if(l.charCodeAt(0)===35){const u=l.charCodeAt(1),d=u===120||u===88;return rb(l.slice(d?2:1),d?16:10)}return hd(l)||a}const mb={}.hasOwnProperty;function w2(a,r,l){return typeof r!="string"&&(l=r,r=void 0),R2(l)(E2(v2(l).document().write(x2()(a,r,!0))))}function R2(a){const r={transforms:[],canContainEols:["emphasis","fragment","heading","paragraph","strong"],enter:{autolink:d(Qt),autolinkProtocol:he,autolinkEmail:he,atxHeading:d(za),blockQuote:d(qn),characterEscape:he,characterReference:he,codeFenced:d(_t),codeFencedFenceInfo:f,codeFencedFenceMeta:f,codeIndented:d(_t,f),codeText:d(xn,f),codeTextData:he,data:he,codeFlowValue:he,definition:d(Mt),definitionDestinationString:f,definitionLabelString:f,definitionTitleString:f,emphasis:d(bt),hardBreakEscape:d(Yn),hardBreakTrailing:d(Yn),htmlFlow:d(Ii,f),htmlFlowData:he,htmlText:d(Ii,f),htmlTextData:he,image:d(_i),label:f,link:d(Qt),listItem:d(ni),listItemValue:v,listOrdered:d(Sa,y),listUnordered:d(Sa),paragraph:d(Sr),reference:E,referenceString:f,resourceDestinationString:f,resourceTitleString:f,setextHeading:d(za),strong:d(vr),thematicBreak:d(Ft)},exit:{atxHeading:g(),atxHeadingSequence:ze,autolink:g(),autolinkEmail:Fe,autolinkProtocol:Je,blockQuote:g(),characterEscapeValue:ue,characterReferenceMarkerHexadecimal:ye,characterReferenceMarkerNumeric:ye,characterReferenceValue:be,characterReference:Ie,codeFenced:g(Z),codeFencedFence:O,codeFencedFenceInfo:S,codeFencedFenceMeta:L,codeFlowValue:ue,codeIndented:g(U),codeText:g($),codeTextData:ue,data:ue,definition:g(),definitionDestinationString:de,definitionLabelString:G,definitionTitleString:q,emphasis:g(),hardBreakEscape:g(ne),hardBreakTrailing:g(ne),htmlFlow:g(Ae),htmlFlowData:ue,htmlText:g(fe),htmlTextData:ue,image:g(K),label:Me,labelText:le,lineEnding:ie,link:g(C),listItem:g(),listOrdered:g(),listUnordered:g(),paragraph:g(),referenceString:re,resourceDestinationString:x,resourceTitleString:T,resource:j,setextHeading:g(te),setextHeadingLineSequence:R,setextHeadingText:X,strong:g(),thematicBreak:g()}};gb(r,(a||{}).mdastExtensions||[]);const l={};return s;function s(H){let ae={type:"root",children:[]};const ve={stack:[ae],tokenStack:[],config:r,enter:h,exit:p,buffer:f,resume:b,data:l},we=[];let Ve=-1;for(;++Ve<H.length;)if(H[Ve][1].type==="listOrdered"||H[Ve][1].type==="listUnordered")if(H[Ve][0]==="enter")we.push(Ve);else{const Ln=we.pop();Ve=u(H,Ln,Ve)}for(Ve=-1;++Ve<H.length;){const Ln=r[H[Ve][0]];mb.call(Ln,H[Ve][1].type)&&Ln[H[Ve][1].type].call(Object.assign({sliceSerialize:H[Ve][2].sliceSerialize},ve),H[Ve][1])}if(ve.tokenStack.length>0){const Ln=ve.tokenStack[ve.tokenStack.length-1];(Ln[1]||lg).call(ve,void 0,Ln[0])}for(ae.position={start:Ga(H.length>0?H[0][1].start:{line:1,column:1,offset:0}),end:Ga(H.length>0?H[H.length-2][1].end:{line:1,column:1,offset:0})},Ve=-1;++Ve<r.transforms.length;)ae=r.transforms[Ve](ae)||ae;return ae}function u(H,ae,ve){let we=ae-1,Ve=-1,Ln=!1,Ct,mn,zn,On;for(;++we<=ve;){const Ke=H[we];switch(Ke[1].type){case"listUnordered":case"listOrdered":case"blockQuote":{Ke[0]==="enter"?Ve++:Ve--,On=void 0;break}case"lineEndingBlank":{Ke[0]==="enter"&&(Ct&&!On&&!Ve&&!zn&&(zn=we),On=void 0);break}case"linePrefix":case"listItemValue":case"listItemMarker":case"listItemPrefix":case"listItemPrefixWhitespace":break;default:On=void 0}if(!Ve&&Ke[0]==="enter"&&Ke[1].type==="listItemPrefix"||Ve===-1&&Ke[0]==="exit"&&(Ke[1].type==="listUnordered"||Ke[1].type==="listOrdered")){if(Ct){let jt=we;for(mn=void 0;jt--;){const Gn=H[jt];if(Gn[1].type==="lineEnding"||Gn[1].type==="lineEndingBlank"){if(Gn[0]==="exit")continue;mn&&(H[mn][1].type="lineEndingBlank",Ln=!0),Gn[1].type="lineEnding",mn=jt}else if(!(Gn[1].type==="linePrefix"||Gn[1].type==="blockQuotePrefix"||Gn[1].type==="blockQuotePrefixWhitespace"||Gn[1].type==="blockQuoteMarker"||Gn[1].type==="listItemIndent"))break}zn&&(!mn||zn<mn)&&(Ct._spread=!0),Ct.end=Object.assign({},mn?H[mn][1].start:Ke[1].end),H.splice(mn||we,0,["exit",Ct,Ke[2]]),we++,ve++}if(Ke[1].type==="listItemPrefix"){const jt={type:"listItem",_spread:!1,start:Object.assign({},Ke[1].start),end:void 0};Ct=jt,H.splice(we,0,["enter",jt,Ke[2]]),we++,ve++,zn=void 0,On=!0}}}return H[ae][1]._spread=Ln,ve}function d(H,ae){return ve;function ve(we){h.call(this,H(we),we),ae&&ae.call(this,we)}}function f(){this.stack.push({type:"fragment",children:[]})}function h(H,ae,ve){this.stack[this.stack.length-1].children.push(H),this.stack.push(H),this.tokenStack.push([ae,ve||void 0]),H.position={start:Ga(ae.start),end:void 0}}function g(H){return ae;function ae(ve){H&&H.call(this,ve),p.call(this,ve)}}function p(H,ae){const ve=this.stack.pop(),we=this.tokenStack.pop();if(we)we[0].type!==H.type&&(ae?ae.call(this,H,we[0]):(we[1]||lg).call(this,H,we[0]));else throw new Error("Cannot close `"+H.type+"` ("+zl({start:H.start,end:H.end})+"): it’s not open");ve.position.end=Ga(H.end)}function b(){return Av(this.stack.pop())}function y(){this.data.expectingFirstListItemValue=!0}function v(H){if(this.data.expectingFirstListItemValue){const ae=this.stack[this.stack.length-2];ae.start=Number.parseInt(this.sliceSerialize(H),10),this.data.expectingFirstListItemValue=void 0}}function S(){const H=this.resume(),ae=this.stack[this.stack.length-1];ae.lang=H}function L(){const H=this.resume(),ae=this.stack[this.stack.length-1];ae.meta=H}function O(){this.data.flowCodeInside||(this.buffer(),this.data.flowCodeInside=!0)}function Z(){const H=this.resume(),ae=this.stack[this.stack.length-1];ae.value=H.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g,""),this.data.flowCodeInside=void 0}function U(){const H=this.resume(),ae=this.stack[this.stack.length-1];ae.value=H.replace(/(\r?\n|\r)$/g,"")}function G(H){const ae=this.resume(),ve=this.stack[this.stack.length-1];ve.label=ae,ve.identifier=gr(this.sliceSerialize(H)).toLowerCase()}function q(){const H=this.resume(),ae=this.stack[this.stack.length-1];ae.title=H}function de(){const H=this.resume(),ae=this.stack[this.stack.length-1];ae.url=H}function ze(H){const ae=this.stack[this.stack.length-1];if(!ae.depth){const ve=this.sliceSerialize(H).length;ae.depth=ve}}function X(){this.data.setextHeadingSlurpLineEnding=!0}function R(H){const ae=this.stack[this.stack.length-1];ae.depth=this.sliceSerialize(H).codePointAt(0)===61?1:2}function te(){this.data.setextHeadingSlurpLineEnding=void 0}function he(H){const ve=this.stack[this.stack.length-1].children;let we=ve[ve.length-1];(!we||we.type!=="text")&&(we=yn(),we.position={start:Ga(H.start),end:void 0},ve.push(we)),this.stack.push(we)}function ue(H){const ae=this.stack.pop();ae.value+=this.sliceSerialize(H),ae.position.end=Ga(H.end)}function ie(H){const ae=this.stack[this.stack.length-1];if(this.data.atHardBreak){const ve=ae.children[ae.children.length-1];ve.position.end=Ga(H.end),this.data.atHardBreak=void 0;return}!this.data.setextHeadingSlurpLineEnding&&r.canContainEols.includes(ae.type)&&(he.call(this,H),ue.call(this,H))}function ne(){this.data.atHardBreak=!0}function Ae(){const H=this.resume(),ae=this.stack[this.stack.length-1];ae.value=H}function fe(){const H=this.resume(),ae=this.stack[this.stack.length-1];ae.value=H}function $(){const H=this.resume(),ae=this.stack[this.stack.length-1];ae.value=H}function C(){const H=this.stack[this.stack.length-1];if(this.data.inReference){const ae=this.data.referenceType||"shortcut";H.type+="Reference",H.referenceType=ae,delete H.url,delete H.title}else delete H.identifier,delete H.label;this.data.referenceType=void 0}function K(){const H=this.stack[this.stack.length-1];if(this.data.inReference){const ae=this.data.referenceType||"shortcut";H.type+="Reference",H.referenceType=ae,delete H.url,delete H.title}else delete H.identifier,delete H.label;this.data.referenceType=void 0}function le(H){const ae=this.sliceSerialize(H),ve=this.stack[this.stack.length-2];ve.label=T2(ae),ve.identifier=gr(ae).toLowerCase()}function Me(){const H=this.stack[this.stack.length-1],ae=this.resume(),ve=this.stack[this.stack.length-1];if(this.data.inReference=!0,ve.type==="link"){const we=H.children;ve.children=we}else ve.alt=ae}function x(){const H=this.resume(),ae=this.stack[this.stack.length-1];ae.url=H}function T(){const H=this.resume(),ae=this.stack[this.stack.length-1];ae.title=H}function j(){this.data.inReference=void 0}function E(){this.data.referenceType="collapsed"}function re(H){const ae=this.resume(),ve=this.stack[this.stack.length-1];ve.label=ae,ve.identifier=gr(this.sliceSerialize(H)).toLowerCase(),this.data.referenceType="full"}function ye(H){this.data.characterReferenceType=H.type}function be(H){const ae=this.sliceSerialize(H),ve=this.data.characterReferenceType;let we;ve?(we=rb(ae,ve==="characterReferenceMarkerNumeric"?10:16),this.data.characterReferenceType=void 0):we=hd(ae);const Ve=this.stack[this.stack.length-1];Ve.value+=we}function Ie(H){const ae=this.stack.pop();ae.position.end=Ga(H.end)}function Je(H){ue.call(this,H);const ae=this.stack[this.stack.length-1];ae.url=this.sliceSerialize(H)}function Fe(H){ue.call(this,H);const ae=this.stack[this.stack.length-1];ae.url="mailto:"+this.sliceSerialize(H)}function qn(){return{type:"blockquote",children:[]}}function _t(){return{type:"code",lang:null,meta:null,value:""}}function xn(){return{type:"inlineCode",value:""}}function Mt(){return{type:"definition",identifier:"",label:null,title:null,url:""}}function bt(){return{type:"emphasis",children:[]}}function za(){return{type:"heading",depth:0,children:[]}}function Yn(){return{type:"break"}}function Ii(){return{type:"html",value:""}}function _i(){return{type:"image",title:null,url:"",alt:null}}function Qt(){return{type:"link",title:null,url:"",children:[]}}function Sa(H){return{type:"list",ordered:H.type==="listOrdered",start:null,spread:H._spread,children:[]}}function ni(H){return{type:"listItem",spread:H._spread,checked:null,children:[]}}function Sr(){return{type:"paragraph",children:[]}}function vr(){return{type:"strong",children:[]}}function yn(){return{type:"text",value:""}}function Ft(){return{type:"thematicBreak"}}}function Ga(a){return{line:a.line,column:a.column,offset:a.offset}}function gb(a,r){let l=-1;for(;++l<r.length;){const s=r[l];Array.isArray(s)?gb(a,s):k2(a,s)}}function k2(a,r){let l;for(l in r)if(mb.call(r,l))switch(l){case"canContainEols":{const s=r[l];s&&a[l].push(...s);break}case"transforms":{const s=r[l];s&&a[l].push(...s);break}case"enter":case"exit":{const s=r[l];s&&Object.assign(a[l],s);break}}}function lg(a,r){throw a?new Error("Cannot close `"+a.type+"` ("+zl({start:a.start,end:a.end})+"): a different token (`"+r.type+"`, "+zl({start:r.start,end:r.end})+") is open"):new Error("Cannot close document, a token (`"+r.type+"`, "+zl({start:r.start,end:r.end})+") is still open")}function I2(a){const r=this;r.parser=l;function l(s){return w2(s,{...r.data("settings"),...a,extensions:r.data("micromarkExtensions")||[],mdastExtensions:r.data("fromMarkdownExtensions")||[]})}}function _2(a,r){const l={type:"element",tagName:"blockquote",properties:{},children:a.wrap(a.all(r),!0)};return a.patch(r,l),a.applyData(r,l)}function M2(a,r){const l={type:"element",tagName:"br",properties:{},children:[]};return a.patch(r,l),[a.applyData(r,l),{type:"text",value:`
`}]}function C2(a,r){const l=r.value?r.value+`
`:"",s={},u=r.lang?r.lang.split(/\s+/):[];u.length>0&&(s.className=["language-"+u[0]]);let d={type:"element",tagName:"code",properties:s,children:[{type:"text",value:l}]};return r.meta&&(d.data={meta:r.meta}),a.patch(r,d),d=a.applyData(r,d),d={type:"element",tagName:"pre",properties:{},children:[d]},a.patch(r,d),d}function L2(a,r){const l={type:"element",tagName:"del",properties:{},children:a.all(r)};return a.patch(r,l),a.applyData(r,l)}function W2(a,r){const l={type:"element",tagName:"em",properties:{},children:a.all(r)};return a.patch(r,l),a.applyData(r,l)}function O2(a,r){const l=typeof a.options.clobberPrefix=="string"?a.options.clobberPrefix:"user-content-",s=String(r.identifier).toUpperCase(),u=zr(s.toLowerCase()),d=a.footnoteOrder.indexOf(s);let f,h=a.footnoteCounts.get(s);h===void 0?(h=0,a.footnoteOrder.push(s),f=a.footnoteOrder.length):f=d+1,h+=1,a.footnoteCounts.set(s,h);const g={type:"element",tagName:"a",properties:{href:"#"+l+"fn-"+u,id:l+"fnref-"+u+(h>1?"-"+h:""),dataFootnoteRef:!0,ariaDescribedBy:["footnote-label"]},children:[{type:"text",value:String(f)}]};a.patch(r,g);const p={type:"element",tagName:"sup",properties:{},children:[g]};return a.patch(r,p),a.applyData(r,p)}function P2(a,r){const l={type:"element",tagName:"h"+r.depth,properties:{},children:a.all(r)};return a.patch(r,l),a.applyData(r,l)}function N2(a,r){if(a.options.allowDangerousHtml){const l={type:"raw",value:r.value};return a.patch(r,l),a.applyData(r,l)}}function bb(a,r){const l=r.referenceType;let s="]";if(l==="collapsed"?s+="[]":l==="full"&&(s+="["+(r.label||r.identifier)+"]"),r.type==="imageReference")return[{type:"text",value:"!["+r.alt+s}];const u=a.all(r),d=u[0];d&&d.type==="text"?d.value="["+d.value:u.unshift({type:"text",value:"["});const f=u[u.length-1];return f&&f.type==="text"?f.value+=s:u.push({type:"text",value:s}),u}function U2(a,r){const l=String(r.identifier).toUpperCase(),s=a.definitionById.get(l);if(!s)return bb(a,r);const u={src:zr(s.url||""),alt:r.alt};s.title!==null&&s.title!==void 0&&(u.title=s.title);const d={type:"element",tagName:"img",properties:u,children:[]};return a.patch(r,d),a.applyData(r,d)}function j2(a,r){const l={src:zr(r.url)};r.alt!==null&&r.alt!==void 0&&(l.alt=r.alt),r.title!==null&&r.title!==void 0&&(l.title=r.title);const s={type:"element",tagName:"img",properties:l,children:[]};return a.patch(r,s),a.applyData(r,s)}function B2(a,r){const l={type:"text",value:r.value.replace(/\r?\n|\r/g," ")};a.patch(r,l);const s={type:"element",tagName:"code",properties:{},children:[l]};return a.patch(r,s),a.applyData(r,s)}function X2(a,r){const l=String(r.identifier).toUpperCase(),s=a.definitionById.get(l);if(!s)return bb(a,r);const u={href:zr(s.url||"")};s.title!==null&&s.title!==void 0&&(u.title=s.title);const d={type:"element",tagName:"a",properties:u,children:a.all(r)};return a.patch(r,d),a.applyData(r,d)}function Z2(a,r){const l={href:zr(r.url)};r.title!==null&&r.title!==void 0&&(l.title=r.title);const s={type:"element",tagName:"a",properties:l,children:a.all(r)};return a.patch(r,s),a.applyData(r,s)}function H2(a,r,l){const s=a.all(r),u=l?V2(l):yb(r),d={},f=[];if(typeof r.checked=="boolean"){const b=s[0];let y;b&&b.type==="element"&&b.tagName==="p"?y=b:(y={type:"element",tagName:"p",properties:{},children:[]},s.unshift(y)),y.children.length>0&&y.children.unshift({type:"text",value:" "}),y.children.unshift({type:"element",tagName:"input",properties:{type:"checkbox",checked:r.checked,disabled:!0},children:[]}),d.className=["task-list-item"]}let h=-1;for(;++h<s.length;){const b=s[h];(u||h!==0||b.type!=="element"||b.tagName!=="p")&&f.push({type:"text",value:`
`}),b.type==="element"&&b.tagName==="p"&&!u?f.push(...b.children):f.push(b)}const g=s[s.length-1];g&&(u||g.type!=="element"||g.tagName!=="p")&&f.push({type:"text",value:`
`});const p={type:"element",tagName:"li",properties:d,children:f};return a.patch(r,p),a.applyData(r,p)}function V2(a){let r=!1;if(a.type==="list"){r=a.spread||!1;const l=a.children;let s=-1;for(;!r&&++s<l.length;)r=yb(l[s])}return r}function yb(a){const r=a.spread;return r??a.children.length>1}function q2(a,r){const l={},s=a.all(r);let u=-1;for(typeof r.start=="number"&&r.start!==1&&(l.start=r.start);++u<s.length;){const f=s[u];if(f.type==="element"&&f.tagName==="li"&&f.properties&&Array.isArray(f.properties.className)&&f.properties.className.includes("task-list-item")){l.className=["contains-task-list"];break}}const d={type:"element",tagName:r.ordered?"ol":"ul",properties:l,children:a.wrap(s,!0)};return a.patch(r,d),a.applyData(r,d)}function Y2(a,r){const l={type:"element",tagName:"p",properties:{},children:a.all(r)};return a.patch(r,l),a.applyData(r,l)}function G2(a,r){const l={type:"root",children:a.wrap(a.all(r))};return a.patch(r,l),a.applyData(r,l)}function Q2(a,r){const l={type:"element",tagName:"strong",properties:{},children:a.all(r)};return a.patch(r,l),a.applyData(r,l)}function F2(a,r){const l=a.all(r),s=l.shift(),u=[];if(s){const f={type:"element",tagName:"thead",properties:{},children:a.wrap([s],!0)};a.patch(r.children[0],f),u.push(f)}if(l.length>0){const f={type:"element",tagName:"tbody",properties:{},children:a.wrap(l,!0)},h=ud(r.children[1]),g=Jg(r.children[r.children.length-1]);h&&g&&(f.position={start:h,end:g}),u.push(f)}const d={type:"element",tagName:"table",properties:{},children:a.wrap(u,!0)};return a.patch(r,d),a.applyData(r,d)}function K2(a,r,l){const s=l?l.children:void 0,d=(s?s.indexOf(r):1)===0?"th":"td",f=l&&l.type==="table"?l.align:void 0,h=f?f.length:r.children.length;let g=-1;const p=[];for(;++g<h;){const y=r.children[g],v={},S=f?f[g]:void 0;S&&(v.align=S);let L={type:"element",tagName:d,properties:v,children:[]};y&&(L.children=a.all(y),a.patch(y,L),L=a.applyData(y,L)),p.push(L)}const b={type:"element",tagName:"tr",properties:{},children:a.wrap(p,!0)};return a.patch(r,b),a.applyData(r,b)}function J2(a,r){const l={type:"element",tagName:"td",properties:{},children:a.all(r)};return a.patch(r,l),a.applyData(r,l)}const sg=9,og=32;function $2(a){const r=String(a),l=/\r?\n|\r/g;let s=l.exec(r),u=0;const d=[];for(;s;)d.push(cg(r.slice(u,s.index),u>0,!0),s[0]),u=s.index+s[0].length,s=l.exec(r);return d.push(cg(r.slice(u),u>0,!1)),d.join("")}function cg(a,r,l){let s=0,u=a.length;if(r){let d=a.codePointAt(s);for(;d===sg||d===og;)s++,d=a.codePointAt(s)}if(l){let d=a.codePointAt(u-1);for(;d===sg||d===og;)u--,d=a.codePointAt(u-1)}return u>s?a.slice(s,u):""}function e1(a,r){const l={type:"text",value:$2(String(r.value))};return a.patch(r,l),a.applyData(r,l)}function n1(a,r){const l={type:"element",tagName:"hr",properties:{},children:[]};return a.patch(r,l),a.applyData(r,l)}const t1={blockquote:_2,break:M2,code:C2,delete:L2,emphasis:W2,footnoteReference:O2,heading:P2,html:N2,imageReference:U2,image:j2,inlineCode:B2,linkReference:X2,link:Z2,listItem:H2,list:q2,paragraph:Y2,root:G2,strong:Q2,table:F2,tableCell:J2,tableRow:K2,text:e1,thematicBreak:n1,toml:Zs,yaml:Zs,definition:Zs,footnoteDefinition:Zs};function Zs(){}const zb=-1,io=0,vl=1,Js=2,bd=3,yd=4,zd=5,Sd=6,Sb=7,vb=8,ug=typeof self=="object"?self:globalThis,a1=(a,r)=>{const l=(u,d)=>(a.set(d,u),u),s=u=>{if(a.has(u))return a.get(u);const[d,f]=r[u];switch(d){case io:case zb:return l(f,u);case vl:{const h=l([],u);for(const g of f)h.push(s(g));return h}case Js:{const h=l({},u);for(const[g,p]of f)h[s(g)]=s(p);return h}case bd:return l(new Date(f),u);case yd:{const{source:h,flags:g}=f;return l(new RegExp(h,g),u)}case zd:{const h=l(new Map,u);for(const[g,p]of f)h.set(s(g),s(p));return h}case Sd:{const h=l(new Set,u);for(const g of f)h.add(s(g));return h}case Sb:{const{name:h,message:g}=f;return l(new ug[h](g),u)}case vb:return l(BigInt(f),u);case"BigInt":return l(Object(BigInt(f)),u);case"ArrayBuffer":return l(new Uint8Array(f).buffer,f);case"DataView":{const{buffer:h}=new Uint8Array(f);return l(new DataView(h),f)}}return l(new ug[d](f),u)};return s},dg=a=>a1(new Map,a)(0),hr="",{toString:i1}={},{keys:r1}=Object,bl=a=>{const r=typeof a;if(r!=="object"||!a)return[io,r];const l=i1.call(a).slice(8,-1);switch(l){case"Array":return[vl,hr];case"Object":return[Js,hr];case"Date":return[bd,hr];case"RegExp":return[yd,hr];case"Map":return[zd,hr];case"Set":return[Sd,hr];case"DataView":return[vl,l]}return l.includes("Array")?[vl,l]:l.includes("Error")?[Sb,l]:[Js,l]},Hs=([a,r])=>a===io&&(r==="function"||r==="symbol"),l1=(a,r,l,s)=>{const u=(f,h)=>{const g=s.push(f)-1;return l.set(h,g),g},d=f=>{if(l.has(f))return l.get(f);let[h,g]=bl(f);switch(h){case io:{let b=f;switch(g){case"bigint":h=vb,b=f.toString();break;case"function":case"symbol":if(a)throw new TypeError("unable to serialize "+g);b=null;break;case"undefined":return u([zb],f)}return u([h,b],f)}case vl:{if(g){let v=f;return g==="DataView"?v=new Uint8Array(f.buffer):g==="ArrayBuffer"&&(v=new Uint8Array(f)),u([g,[...v]],f)}const b=[],y=u([h,b],f);for(const v of f)b.push(d(v));return y}case Js:{if(g)switch(g){case"BigInt":return u([g,f.toString()],f);case"Boolean":case"Number":case"String":return u([g,f.valueOf()],f)}if(r&&"toJSON"in f)return d(f.toJSON());const b=[],y=u([h,b],f);for(const v of r1(f))(a||!Hs(bl(f[v])))&&b.push([d(v),d(f[v])]);return y}case bd:return u([h,f.toISOString()],f);case yd:{const{source:b,flags:y}=f;return u([h,{source:b,flags:y}],f)}case zd:{const b=[],y=u([h,b],f);for(const[v,S]of f)(a||!(Hs(bl(v))||Hs(bl(S))))&&b.push([d(v),d(S)]);return y}case Sd:{const b=[],y=u([h,b],f);for(const v of f)(a||!Hs(bl(v)))&&b.push(d(v));return y}}const{message:p}=f;return u([h,{name:g,message:p}],f)};return d},fg=(a,{json:r,lossy:l}={})=>{const s=[];return l1(!(r||l),!!r,new Map,s)(a),s},$s=typeof structuredClone=="function"?(a,r)=>r&&("json"in r||"lossy"in r)?dg(fg(a,r)):structuredClone(a):(a,r)=>dg(fg(a,r));function s1(a,r){const l=[{type:"text",value:"↩"}];return r>1&&l.push({type:"element",tagName:"sup",properties:{},children:[{type:"text",value:String(r)}]}),l}function o1(a,r){return"Back to reference "+(a+1)+(r>1?"-"+r:"")}function c1(a){const r=typeof a.options.clobberPrefix=="string"?a.options.clobberPrefix:"user-content-",l=a.options.footnoteBackContent||s1,s=a.options.footnoteBackLabel||o1,u=a.options.footnoteLabel||"Footnotes",d=a.options.footnoteLabelTagName||"h2",f=a.options.footnoteLabelProperties||{className:["sr-only"]},h=[];let g=-1;for(;++g<a.footnoteOrder.length;){const p=a.footnoteById.get(a.footnoteOrder[g]);if(!p)continue;const b=a.all(p),y=String(p.identifier).toUpperCase(),v=zr(y.toLowerCase());let S=0;const L=[],O=a.footnoteCounts.get(y);for(;O!==void 0&&++S<=O;){L.length>0&&L.push({type:"text",value:" "});let G=typeof l=="string"?l:l(g,S);typeof G=="string"&&(G={type:"text",value:G}),L.push({type:"element",tagName:"a",properties:{href:"#"+r+"fnref-"+v+(S>1?"-"+S:""),dataFootnoteBackref:"",ariaLabel:typeof s=="string"?s:s(g,S),className:["data-footnote-backref"]},children:Array.isArray(G)?G:[G]})}const Z=b[b.length-1];if(Z&&Z.type==="element"&&Z.tagName==="p"){const G=Z.children[Z.children.length-1];G&&G.type==="text"?G.value+=" ":Z.children.push({type:"text",value:" "}),Z.children.push(...L)}else b.push(...L);const U={type:"element",tagName:"li",properties:{id:r+"fn-"+v},children:a.wrap(b,!0)};a.patch(p,U),h.push(U)}if(h.length!==0)return{type:"element",tagName:"section",properties:{dataFootnotes:!0,className:["footnotes"]},children:[{type:"element",tagName:d,properties:{...$s(f),id:"footnote-label"},children:[{type:"text",value:u}]},{type:"text",value:`
`},{type:"element",tagName:"ol",properties:{},children:a.wrap(h,!0)},{type:"text",value:`
`}]}}const Eb=(function(a){if(a==null)return p1;if(typeof a=="function")return ro(a);if(typeof a=="object")return Array.isArray(a)?u1(a):d1(a);if(typeof a=="string")return f1(a);throw new Error("Expected function, string, or object as test")});function u1(a){const r=[];let l=-1;for(;++l<a.length;)r[l]=Eb(a[l]);return ro(s);function s(...u){let d=-1;for(;++d<r.length;)if(r[d].apply(this,u))return!0;return!1}}function d1(a){const r=a;return ro(l);function l(s){const u=s;let d;for(d in a)if(u[d]!==r[d])return!1;return!0}}function f1(a){return ro(r);function r(l){return l&&l.type===a}}function ro(a){return r;function r(l,s,u){return!!(h1(l)&&a.call(this,l,typeof s=="number"?s:void 0,u||void 0))}}function p1(){return!0}function h1(a){return a!==null&&typeof a=="object"&&"type"in a}const xb=[],m1=!0,pg=!1,g1="skip";function b1(a,r,l,s){let u;typeof r=="function"&&typeof l!="function"?(s=l,l=r):u=r;const d=Eb(u),f=s?-1:1;h(a,void 0,[])();function h(g,p,b){const y=g&&typeof g=="object"?g:{};if(typeof y.type=="string"){const S=typeof y.tagName=="string"?y.tagName:typeof y.name=="string"?y.name:void 0;Object.defineProperty(v,"name",{value:"node ("+(g.type+(S?"<"+S+">":""))+")"})}return v;function v(){let S=xb,L,O,Z;if((!r||d(g,p,b[b.length-1]||void 0))&&(S=y1(l(g,b)),S[0]===pg))return S;if("children"in g&&g.children){const U=g;if(U.children&&S[0]!==g1)for(O=(s?U.children.length:-1)+f,Z=b.concat(U);O>-1&&O<U.children.length;){const G=U.children[O];if(L=h(G,O,Z)(),L[0]===pg)return L;O=typeof L[1]=="number"?L[1]:O+f}}return S}}}function y1(a){return Array.isArray(a)?a:typeof a=="number"?[m1,a]:a==null?xb:[a]}function Db(a,r,l,s){let u,d,f;typeof r=="function"&&typeof l!="function"?(d=void 0,f=r,u=l):(d=r,f=l,u=s),b1(a,d,h,u);function h(g,p){const b=p[p.length-1],y=b?b.children.indexOf(g):void 0;return f(g,y,b)}}const Ku={}.hasOwnProperty,z1={};function S1(a,r){const l=r||z1,s=new Map,u=new Map,d=new Map,f={...t1,...l.handlers},h={all:p,applyData:E1,definitionById:s,footnoteById:u,footnoteCounts:d,footnoteOrder:[],handlers:f,one:g,options:l,patch:v1,wrap:D1};return Db(a,function(b){if(b.type==="definition"||b.type==="footnoteDefinition"){const y=b.type==="definition"?s:u,v=String(b.identifier).toUpperCase();y.has(v)||y.set(v,b)}}),h;function g(b,y){const v=b.type,S=h.handlers[v];if(Ku.call(h.handlers,v)&&S)return S(h,b,y);if(h.options.passThrough&&h.options.passThrough.includes(v)){if("children"in b){const{children:O,...Z}=b,U=$s(Z);return U.children=h.all(b),U}return $s(b)}return(h.options.unknownHandler||x1)(h,b,y)}function p(b){const y=[];if("children"in b){const v=b.children;let S=-1;for(;++S<v.length;){const L=h.one(v[S],b);if(L){if(S&&v[S-1].type==="break"&&(!Array.isArray(L)&&L.type==="text"&&(L.value=hg(L.value)),!Array.isArray(L)&&L.type==="element")){const O=L.children[0];O&&O.type==="text"&&(O.value=hg(O.value))}Array.isArray(L)?y.push(...L):y.push(L)}}}return y}}function v1(a,r){a.position&&(r.position=iv(a))}function E1(a,r){let l=r;if(a&&a.data){const s=a.data.hName,u=a.data.hChildren,d=a.data.hProperties;if(typeof s=="string")if(l.type==="element")l.tagName=s;else{const f="children"in l?l.children:[l];l={type:"element",tagName:s,properties:{},children:f}}l.type==="element"&&d&&Object.assign(l.properties,$s(d)),"children"in l&&l.children&&u!==null&&u!==void 0&&(l.children=u)}return l}function x1(a,r){const l=r.data||{},s="value"in r&&!(Ku.call(l,"hProperties")||Ku.call(l,"hChildren"))?{type:"text",value:r.value}:{type:"element",tagName:"div",properties:{},children:a.all(r)};return a.patch(r,s),a.applyData(r,s)}function D1(a,r){const l=[];let s=-1;for(r&&l.push({type:"text",value:`
`});++s<a.length;)s&&l.push({type:"text",value:`
`}),l.push(a[s]);return r&&a.length>0&&l.push({type:"text",value:`
`}),l}function hg(a){let r=0,l=a.charCodeAt(r);for(;l===9||l===32;)r++,l=a.charCodeAt(r);return a.slice(r)}function mg(a,r){const l=S1(a,r),s=l.one(a,void 0),u=c1(l),d=Array.isArray(s)?{type:"root",children:s}:s||{type:"root",children:[]};return u&&d.children.push({type:"text",value:`
`},u),d}function T1(a,r){return a&&"run"in a?async function(l,s){const u=mg(l,{file:s,...r});await a.run(u,s)}:function(l,s){return mg(l,{file:s,...a||r})}}function gg(a){if(a)throw a}var Iu,bg;function A1(){if(bg)return Iu;bg=1;var a=Object.prototype.hasOwnProperty,r=Object.prototype.toString,l=Object.defineProperty,s=Object.getOwnPropertyDescriptor,u=function(p){return typeof Array.isArray=="function"?Array.isArray(p):r.call(p)==="[object Array]"},d=function(p){if(!p||r.call(p)!=="[object Object]")return!1;var b=a.call(p,"constructor"),y=p.constructor&&p.constructor.prototype&&a.call(p.constructor.prototype,"isPrototypeOf");if(p.constructor&&!b&&!y)return!1;var v;for(v in p);return typeof v>"u"||a.call(p,v)},f=function(p,b){l&&b.name==="__proto__"?l(p,b.name,{enumerable:!0,configurable:!0,value:b.newValue,writable:!0}):p[b.name]=b.newValue},h=function(p,b){if(b==="__proto__")if(a.call(p,b)){if(s)return s(p,b).value}else return;return p[b]};return Iu=function g(){var p,b,y,v,S,L,O=arguments[0],Z=1,U=arguments.length,G=!1;for(typeof O=="boolean"&&(G=O,O=arguments[1]||{},Z=2),(O==null||typeof O!="object"&&typeof O!="function")&&(O={});Z<U;++Z)if(p=arguments[Z],p!=null)for(b in p)y=h(O,b),v=h(p,b),O!==v&&(G&&v&&(d(v)||(S=u(v)))?(S?(S=!1,L=y&&u(y)?y:[]):L=y&&d(y)?y:{},f(O,{name:b,newValue:g(G,L,v)})):typeof v<"u"&&f(O,{name:b,newValue:v}));return O},Iu}var w1=A1();const _u=no(w1);function Ju(a){if(typeof a!="object"||a===null)return!1;const r=Object.getPrototypeOf(a);return(r===null||r===Object.prototype||Object.getPrototypeOf(r)===null)&&!(Symbol.toStringTag in a)&&!(Symbol.iterator in a)}function R1(){const a=[],r={run:l,use:s};return r;function l(...u){let d=-1;const f=u.pop();if(typeof f!="function")throw new TypeError("Expected function as last argument, not "+f);h(null,...u);function h(g,...p){const b=a[++d];let y=-1;if(g){f(g);return}for(;++y<u.length;)(p[y]===null||p[y]===void 0)&&(p[y]=u[y]);u=p,b?k1(b,h)(...p):f(null,...p)}}function s(u){if(typeof u!="function")throw new TypeError("Expected `middelware` to be a function, not "+u);return a.push(u),r}}function k1(a,r){let l;return s;function s(...f){const h=a.length>f.length;let g;h&&f.push(u);try{g=a.apply(this,f)}catch(p){const b=p;if(h&&l)throw b;return u(b)}h||(g&&g.then&&typeof g.then=="function"?g.then(d,u):g instanceof Error?u(g):d(g))}function u(f,...h){l||(l=!0,r(f,...h))}function d(f){u(null,f)}}const qt={basename:I1,dirname:_1,extname:M1,join:C1,sep:"/"};function I1(a,r){if(r!==void 0&&typeof r!="string")throw new TypeError('"ext" argument must be a string');Il(a);let l=0,s=-1,u=a.length,d;if(r===void 0||r.length===0||r.length>a.length){for(;u--;)if(a.codePointAt(u)===47){if(d){l=u+1;break}}else s<0&&(d=!0,s=u+1);return s<0?"":a.slice(l,s)}if(r===a)return"";let f=-1,h=r.length-1;for(;u--;)if(a.codePointAt(u)===47){if(d){l=u+1;break}}else f<0&&(d=!0,f=u+1),h>-1&&(a.codePointAt(u)===r.codePointAt(h--)?h<0&&(s=u):(h=-1,s=f));return l===s?s=f:s<0&&(s=a.length),a.slice(l,s)}function _1(a){if(Il(a),a.length===0)return".";let r=-1,l=a.length,s;for(;--l;)if(a.codePointAt(l)===47){if(s){r=l;break}}else s||(s=!0);return r<0?a.codePointAt(0)===47?"/":".":r===1&&a.codePointAt(0)===47?"//":a.slice(0,r)}function M1(a){Il(a);let r=a.length,l=-1,s=0,u=-1,d=0,f;for(;r--;){const h=a.codePointAt(r);if(h===47){if(f){s=r+1;break}continue}l<0&&(f=!0,l=r+1),h===46?u<0?u=r:d!==1&&(d=1):u>-1&&(d=-1)}return u<0||l<0||d===0||d===1&&u===l-1&&u===s+1?"":a.slice(u,l)}function C1(...a){let r=-1,l;for(;++r<a.length;)Il(a[r]),a[r]&&(l=l===void 0?a[r]:l+"/"+a[r]);return l===void 0?".":L1(l)}function L1(a){Il(a);const r=a.codePointAt(0)===47;let l=W1(a,!r);return l.length===0&&!r&&(l="."),l.length>0&&a.codePointAt(a.length-1)===47&&(l+="/"),r?"/"+l:l}function W1(a,r){let l="",s=0,u=-1,d=0,f=-1,h,g;for(;++f<=a.length;){if(f<a.length)h=a.codePointAt(f);else{if(h===47)break;h=47}if(h===47){if(!(u===f-1||d===1))if(u!==f-1&&d===2){if(l.length<2||s!==2||l.codePointAt(l.length-1)!==46||l.codePointAt(l.length-2)!==46){if(l.length>2){if(g=l.lastIndexOf("/"),g!==l.length-1){g<0?(l="",s=0):(l=l.slice(0,g),s=l.length-1-l.lastIndexOf("/")),u=f,d=0;continue}}else if(l.length>0){l="",s=0,u=f,d=0;continue}}r&&(l=l.length>0?l+"/..":"..",s=2)}else l.length>0?l+="/"+a.slice(u+1,f):l=a.slice(u+1,f),s=f-u-1;u=f,d=0}else h===46&&d>-1?d++:d=-1}return l}function Il(a){if(typeof a!="string")throw new TypeError("Path must be a string. Received "+JSON.stringify(a))}const O1={cwd:P1};function P1(){return"/"}function $u(a){return!!(a!==null&&typeof a=="object"&&"href"in a&&a.href&&"protocol"in a&&a.protocol&&a.auth===void 0)}function N1(a){if(typeof a=="string")a=new URL(a);else if(!$u(a)){const r=new TypeError('The "path" argument must be of type string or an instance of URL. Received `'+a+"`");throw r.code="ERR_INVALID_ARG_TYPE",r}if(a.protocol!=="file:"){const r=new TypeError("The URL must be of scheme file");throw r.code="ERR_INVALID_URL_SCHEME",r}return U1(a)}function U1(a){if(a.hostname!==""){const s=new TypeError('File URL host must be "localhost" or empty on darwin');throw s.code="ERR_INVALID_FILE_URL_HOST",s}const r=a.pathname;let l=-1;for(;++l<r.length;)if(r.codePointAt(l)===37&&r.codePointAt(l+1)===50){const s=r.codePointAt(l+2);if(s===70||s===102){const u=new TypeError("File URL path must not include encoded / characters");throw u.code="ERR_INVALID_FILE_URL_PATH",u}}return decodeURIComponent(r)}const Mu=["history","path","basename","stem","extname","dirname"];class Tb{constructor(r){let l;r?$u(r)?l={path:r}:typeof r=="string"||j1(r)?l={value:r}:l=r:l={},this.cwd="cwd"in l?"":O1.cwd(),this.data={},this.history=[],this.messages=[],this.value,this.map,this.result,this.stored;let s=-1;for(;++s<Mu.length;){const d=Mu[s];d in l&&l[d]!==void 0&&l[d]!==null&&(this[d]=d==="history"?[...l[d]]:l[d])}let u;for(u in l)Mu.includes(u)||(this[u]=l[u])}get basename(){return typeof this.path=="string"?qt.basename(this.path):void 0}set basename(r){Lu(r,"basename"),Cu(r,"basename"),this.path=qt.join(this.dirname||"",r)}get dirname(){return typeof this.path=="string"?qt.dirname(this.path):void 0}set dirname(r){yg(this.basename,"dirname"),this.path=qt.join(r||"",this.basename)}get extname(){return typeof this.path=="string"?qt.extname(this.path):void 0}set extname(r){if(Cu(r,"extname"),yg(this.dirname,"extname"),r){if(r.codePointAt(0)!==46)throw new Error("`extname` must start with `.`");if(r.includes(".",1))throw new Error("`extname` cannot contain multiple dots")}this.path=qt.join(this.dirname,this.stem+(r||""))}get path(){return this.history[this.history.length-1]}set path(r){$u(r)&&(r=N1(r)),Lu(r,"path"),this.path!==r&&this.history.push(r)}get stem(){return typeof this.path=="string"?qt.basename(this.path,this.extname):void 0}set stem(r){Lu(r,"stem"),Cu(r,"stem"),this.path=qt.join(this.dirname||"",r+(this.extname||""))}fail(r,l,s){const u=this.message(r,l,s);throw u.fatal=!0,u}info(r,l,s){const u=this.message(r,l,s);return u.fatal=void 0,u}message(r,l,s){const u=new Zn(r,l,s);return this.path&&(u.name=this.path+":"+u.name,u.file=this.path),u.fatal=!1,this.messages.push(u),u}toString(r){return this.value===void 0?"":typeof this.value=="string"?this.value:new TextDecoder(r||void 0).decode(this.value)}}function Cu(a,r){if(a&&a.includes(qt.sep))throw new Error("`"+r+"` cannot be a path: did not expect `"+qt.sep+"`")}function Lu(a,r){if(!a)throw new Error("`"+r+"` cannot be empty")}function yg(a,r){if(!a)throw new Error("Setting `"+r+"` requires `path` to be set too")}function j1(a){return!!(a&&typeof a=="object"&&"byteLength"in a&&"byteOffset"in a)}const B1=(function(a){const s=this.constructor.prototype,u=s[a],d=function(){return u.apply(d,arguments)};return Object.setPrototypeOf(d,s),d}),X1={}.hasOwnProperty;class vd extends B1{constructor(){super("copy"),this.Compiler=void 0,this.Parser=void 0,this.attachers=[],this.compiler=void 0,this.freezeIndex=-1,this.frozen=void 0,this.namespace={},this.parser=void 0,this.transformers=R1()}copy(){const r=new vd;let l=-1;for(;++l<this.attachers.length;){const s=this.attachers[l];r.use(...s)}return r.data(_u(!0,{},this.namespace)),r}data(r,l){return typeof r=="string"?arguments.length===2?(Pu("data",this.frozen),this.namespace[r]=l,this):X1.call(this.namespace,r)&&this.namespace[r]||void 0:r?(Pu("data",this.frozen),this.namespace=r,this):this.namespace}freeze(){if(this.frozen)return this;const r=this;for(;++this.freezeIndex<this.attachers.length;){const[l,...s]=this.attachers[this.freezeIndex];if(s[0]===!1)continue;s[0]===!0&&(s[0]=void 0);const u=l.call(r,...s);typeof u=="function"&&this.transformers.use(u)}return this.frozen=!0,this.freezeIndex=Number.POSITIVE_INFINITY,this}parse(r){this.freeze();const l=Vs(r),s=this.parser||this.Parser;return Wu("parse",s),s(String(l),l)}process(r,l){const s=this;return this.freeze(),Wu("process",this.parser||this.Parser),Ou("process",this.compiler||this.Compiler),l?u(void 0,l):new Promise(u);function u(d,f){const h=Vs(r),g=s.parse(h);s.run(g,h,function(b,y,v){if(b||!y||!v)return p(b);const S=y,L=s.stringify(S,v);V1(L)?v.value=L:v.result=L,p(b,v)});function p(b,y){b||!y?f(b):d?d(y):l(void 0,y)}}}processSync(r){let l=!1,s;return this.freeze(),Wu("processSync",this.parser||this.Parser),Ou("processSync",this.compiler||this.Compiler),this.process(r,u),Sg("processSync","process",l),s;function u(d,f){l=!0,gg(d),s=f}}run(r,l,s){zg(r),this.freeze();const u=this.transformers;return!s&&typeof l=="function"&&(s=l,l=void 0),s?d(void 0,s):new Promise(d);function d(f,h){const g=Vs(l);u.run(r,g,p);function p(b,y,v){const S=y||r;b?h(b):f?f(S):s(void 0,S,v)}}}runSync(r,l){let s=!1,u;return this.run(r,l,d),Sg("runSync","run",s),u;function d(f,h){gg(f),u=h,s=!0}}stringify(r,l){this.freeze();const s=Vs(l),u=this.compiler||this.Compiler;return Ou("stringify",u),zg(r),u(r,s)}use(r,...l){const s=this.attachers,u=this.namespace;if(Pu("use",this.frozen),r!=null)if(typeof r=="function")g(r,l);else if(typeof r=="object")Array.isArray(r)?h(r):f(r);else throw new TypeError("Expected usable value, not `"+r+"`");return this;function d(p){if(typeof p=="function")g(p,[]);else if(typeof p=="object")if(Array.isArray(p)){const[b,...y]=p;g(b,y)}else f(p);else throw new TypeError("Expected usable value, not `"+p+"`")}function f(p){if(!("plugins"in p)&&!("settings"in p))throw new Error("Expected usable value but received an empty preset, which is probably a mistake: presets typically come with `plugins` and sometimes with `settings`, but this has neither");h(p.plugins),p.settings&&(u.settings=_u(!0,u.settings,p.settings))}function h(p){let b=-1;if(p!=null)if(Array.isArray(p))for(;++b<p.length;){const y=p[b];d(y)}else throw new TypeError("Expected a list of plugins, not `"+p+"`")}function g(p,b){let y=-1,v=-1;for(;++y<s.length;)if(s[y][0]===p){v=y;break}if(v===-1)s.push([p,...b]);else if(b.length>0){let[S,...L]=b;const O=s[v][1];Ju(O)&&Ju(S)&&(S=_u(!0,O,S)),s[v]=[p,S,...L]}}}}const Z1=new vd().freeze();function Wu(a,r){if(typeof r!="function")throw new TypeError("Cannot `"+a+"` without `parser`")}function Ou(a,r){if(typeof r!="function")throw new TypeError("Cannot `"+a+"` without `compiler`")}function Pu(a,r){if(r)throw new Error("Cannot call `"+a+"` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`.")}function zg(a){if(!Ju(a)||typeof a.type!="string")throw new TypeError("Expected node, got `"+a+"`")}function Sg(a,r,l){if(!l)throw new Error("`"+a+"` finished async. Use `"+r+"` instead")}function Vs(a){return H1(a)?a:new Tb(a)}function H1(a){return!!(a&&typeof a=="object"&&"message"in a&&"messages"in a)}function V1(a){return typeof a=="string"||q1(a)}function q1(a){return!!(a&&typeof a=="object"&&"byteLength"in a&&"byteOffset"in a)}const Y1="https://github.com/remarkjs/react-markdown/blob/main/changelog.md",vg=[],Eg={allowDangerousHtml:!0},G1=/^(https?|ircs?|mailto|xmpp)$/i,Q1=[{from:"astPlugins",id:"remove-buggy-html-in-markdown-parser"},{from:"allowDangerousHtml",id:"remove-buggy-html-in-markdown-parser"},{from:"allowNode",id:"replace-allownode-allowedtypes-and-disallowedtypes",to:"allowElement"},{from:"allowedTypes",id:"replace-allownode-allowedtypes-and-disallowedtypes",to:"allowedElements"},{from:"className",id:"remove-classname"},{from:"disallowedTypes",id:"replace-allownode-allowedtypes-and-disallowedtypes",to:"disallowedElements"},{from:"escapeHtml",id:"remove-buggy-html-in-markdown-parser"},{from:"includeElementIndex",id:"#remove-includeelementindex"},{from:"includeNodeIndex",id:"change-includenodeindex-to-includeelementindex"},{from:"linkTarget",id:"remove-linktarget"},{from:"plugins",id:"change-plugins-to-remarkplugins",to:"remarkPlugins"},{from:"rawSourcePos",id:"#remove-rawsourcepos"},{from:"renderers",id:"change-renderers-to-components",to:"components"},{from:"source",id:"change-source-to-children",to:"children"},{from:"sourcePos",id:"#remove-sourcepos"},{from:"transformImageUri",id:"#add-urltransform",to:"urlTransform"},{from:"transformLinkUri",id:"#add-urltransform",to:"urlTransform"}];function F1(a){const r=K1(a),l=J1(a);return $1(r.runSync(r.parse(l),l),a)}function K1(a){const r=a.rehypePlugins||vg,l=a.remarkPlugins||vg,s=a.remarkRehypeOptions?{...a.remarkRehypeOptions,...Eg}:Eg;return Z1().use(I2).use(l).use(T1,s).use(r)}function J1(a){const r=a.children||"",l=new Tb;return typeof r=="string"&&(l.value=r),l}function $1(a,r){const l=r.allowedElements,s=r.allowElement,u=r.components,d=r.disallowedElements,f=r.skipHtml,h=r.unwrapDisallowed,g=r.urlTransform||eE;for(const b of Q1)Object.hasOwn(r,b.from)&&(""+b.from+(b.to?"use `"+b.to+"` instead":"remove it")+Y1+b.id,void 0);return Db(a,p),cv(a,{Fragment:Q.Fragment,components:u,ignoreInvalidStyle:!0,jsx:Q.jsx,jsxs:Q.jsxs,passKeys:!0,passNode:!0});function p(b,y,v){if(b.type==="raw"&&v&&typeof y=="number")return f?v.children.splice(y,1):v.children[y]={type:"text",value:b.value},y;if(b.type==="element"){let S;for(S in wu)if(Object.hasOwn(wu,S)&&Object.hasOwn(b.properties,S)){const L=b.properties[S],O=wu[S];(O===null||O.includes(b.tagName))&&(b.properties[S]=g(String(L||""),S,b))}}if(b.type==="element"){let S=l?!l.includes(b.tagName):d?d.includes(b.tagName):!1;if(!S&&s&&typeof y=="number"&&(S=!s(b,y,v)),S&&v&&typeof y=="number")return h&&b.children?v.children.splice(y,1,...b.children):v.children.splice(y,1),y}}}function eE(a){const r=a.indexOf(":"),l=a.indexOf("?"),s=a.indexOf("#"),u=a.indexOf("/");return r===-1||u!==-1&&r>u||l!==-1&&r>l||s!==-1&&r>s||G1.test(a.slice(0,r))?a:""}const nE=`**wizzard-packages**

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
`,tE=`[**wizzard-packages**](../../README.md)

***

[wizzard-packages](../../README.md) / adapter-yup/src

# adapter-yup/src

## Classes

- [YupAdapter](classes/YupAdapter.md)

## Interfaces

- [YupLikeError](interfaces/YupLikeError.md)
- [YupLikeSchema](interfaces/YupLikeSchema.md)
`,aE=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [adapter-yup/src](../README.md) / YupAdapter

# Class: YupAdapter\\<T\\>

Defined in: [adapter-yup/src/YupAdapter.ts:7](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/adapter-yup/src/YupAdapter.ts#L7)

Validation adapter for Yup-like schemas.

## Type Parameters

### T

\`T\`

## Implements

- [\`IValidatorAdapter\`](../../../react/src/interfaces/IValidatorAdapter.md)\\<\`T\`\\>

## Constructors

### Constructor

> **new YupAdapter**\\<\`T\`\\>(\`schema\`): \`YupAdapter\`\\<\`T\`\\>

Defined in: [adapter-yup/src/YupAdapter.ts:10](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/adapter-yup/src/YupAdapter.ts#L10)

#### Parameters

##### schema

[\`YupLikeSchema\`](../interfaces/YupLikeSchema.md)\\<\`T\`\\>

#### Returns

\`YupAdapter\`\\<\`T\`\\>

## Methods

### validate()

> **validate**(\`data\`): \`Promise\`\\<[\`ValidationResult\`](../../../react/src/type-aliases/ValidationResult.md)\\>

Defined in: [adapter-yup/src/YupAdapter.ts:14](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/adapter-yup/src/YupAdapter.ts#L14)

#### Parameters

##### data

\`unknown\`

#### Returns

\`Promise\`\\<[\`ValidationResult\`](../../../react/src/type-aliases/ValidationResult.md)\\>

#### Implementation of

[\`IValidatorAdapter\`](../../../react/src/interfaces/IValidatorAdapter.md).[\`validate\`](../../../react/src/interfaces/IValidatorAdapter.md#validate)
`,iE=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [adapter-yup/src](../README.md) / YupLikeError

# Interface: YupLikeError

Defined in: [adapter-yup/src/types.ts:11](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/adapter-yup/src/types.ts#L11)

Minimal structural interface for Yup-like validation errors.

## Properties

### inner

> **inner**: \`object\`[]

Defined in: [adapter-yup/src/types.ts:12](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/adapter-yup/src/types.ts#L12)

#### message

> **message**: \`string\`

#### path?

> \`optional\` **path**: \`string\`
`,rE=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [adapter-yup/src](../README.md) / YupLikeSchema

# Interface: YupLikeSchema\\<T\\>

Defined in: [adapter-yup/src/types.ts:4](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/adapter-yup/src/types.ts#L4)

Minimal structural interface for Yup-like schemas.

## Type Parameters

### T

\`T\` = \`any\`

## Properties

### validate()

> **validate**: (\`data\`, \`options\`) => \`Promise\`\\<\`any\`\\>

Defined in: [adapter-yup/src/types.ts:5](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/adapter-yup/src/types.ts#L5)

#### Parameters

##### data

\`T\`

##### options

###### abortEarly

\`boolean\`

#### Returns

\`Promise\`\\<\`any\`\\>
`,lE=`[**wizzard-packages**](../../README.md)

***

[wizzard-packages](../../README.md) / adapter-zod/src

# adapter-zod/src

## Classes

- [ZodAdapter](classes/ZodAdapter.md)

## Interfaces

- [ZodLikeSchema](interfaces/ZodLikeSchema.md)
`,sE=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [adapter-zod/src](../README.md) / ZodAdapter

# Class: ZodAdapter\\<T\\>

Defined in: [adapter-zod/src/ZodAdapter.ts:7](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/adapter-zod/src/ZodAdapter.ts#L7)

Validation adapter for Zod-like schemas.

## Type Parameters

### T

\`T\`

## Implements

- [\`IValidatorAdapter\`](../../../react/src/interfaces/IValidatorAdapter.md)\\<\`T\`\\>

## Constructors

### Constructor

> **new ZodAdapter**\\<\`T\`\\>(\`schema\`): \`ZodAdapter\`\\<\`T\`\\>

Defined in: [adapter-zod/src/ZodAdapter.ts:10](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/adapter-zod/src/ZodAdapter.ts#L10)

#### Parameters

##### schema

[\`ZodLikeSchema\`](../interfaces/ZodLikeSchema.md)\\<\`T\`\\>

#### Returns

\`ZodAdapter\`\\<\`T\`\\>

## Methods

### validate()

> **validate**(\`data\`): \`Promise\`\\<[\`ValidationResult\`](../../../react/src/type-aliases/ValidationResult.md)\\>

Defined in: [adapter-zod/src/ZodAdapter.ts:14](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/adapter-zod/src/ZodAdapter.ts#L14)

#### Parameters

##### data

\`unknown\`

#### Returns

\`Promise\`\\<[\`ValidationResult\`](../../../react/src/type-aliases/ValidationResult.md)\\>

#### Implementation of

[\`IValidatorAdapter\`](../../../react/src/interfaces/IValidatorAdapter.md).[\`validate\`](../../../react/src/interfaces/IValidatorAdapter.md#validate)
`,oE="[**wizzard-packages**](../../../README.md)\n\n***\n\n[wizzard-packages](../../../README.md) / [adapter-zod/src](../README.md) / ZodLikeSchema\n\n# Interface: ZodLikeSchema\\<T\\>\n\nDefined in: [adapter-zod/src/types.ts:4](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/adapter-zod/src/types.ts#L4)\n\nMinimal structural interface for Zod-like schemas.\n\n## Type Parameters\n\n### T\n\n`T` = `any`\n\n## Properties\n\n### safeParseAsync()\n\n> **safeParseAsync**: (`data`) => `Promise`\\<\\{ `data?`: `T`; `error?`: \\{ `issues`: `object`[]; \\}; `success`: `boolean`; \\}\\>\n\nDefined in: [adapter-zod/src/types.ts:5](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/adapter-zod/src/types.ts#L5)\n\n#### Parameters\n\n##### data\n\n`T`\n\n#### Returns\n\n`Promise`\\<\\{ `data?`: `T`; `error?`: \\{ `issues`: `object`[]; \\}; `success`: `boolean`; \\}\\>\n",cE=`[**wizzard-packages**](../../README.md)

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
`,uE=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [core/src](../README.md) / WizardStore

# Class: WizardStore\\<T, StepId\\>

Defined in: [core/src/store/WizardStore.ts:17](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/store/WizardStore.ts#L17)

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

Defined in: [core/src/store/WizardStore.ts:38](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/store/WizardStore.ts#L38)

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

Defined in: [core/src/store/WizardStore.ts:23](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/store/WizardStore.ts#L23)

#### Implementation of

[\`IWizardStore\`](../interfaces/IWizardStore.md).[\`errorsMap\`](../interfaces/IWizardStore.md#errorsmap)

## Methods

### clearStepStorage()

> **clearStepStorage**(\`stepId\`): \`void\`

Defined in: [core/src/store/WizardStore.ts:534](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/store/WizardStore.ts#L534)

#### Parameters

##### stepId

\`string\`

#### Returns

\`void\`

***

### deleteError()

> **deleteError**(\`stepId\`, \`path\`): \`boolean\`

Defined in: [core/src/store/WizardStore.ts:439](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/store/WizardStore.ts#L439)

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

Defined in: [core/src/store/WizardStore.ts:97](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/store/WizardStore.ts#L97)

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

Defined in: [core/src/store/WizardStore.ts:285](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/store/WizardStore.ts#L285)

Returns the current immutable snapshot of the wizard state.

#### Returns

[\`IWizardState\`](../interfaces/IWizardState.md)\\<\`T\`, \`StepId\`\\>

#### Implementation of

[\`IWizardStore\`](../interfaces/IWizardStore.md).[\`getSnapshot\`](../interfaces/IWizardStore.md#getsnapshot)

***

### goToStep()

> **goToStep**(\`stepId\`, \`options\`): \`Promise\`\\<\`boolean\`\\>

Defined in: [core/src/store/WizardStore.ts:775](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/store/WizardStore.ts#L775)

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

Defined in: [core/src/store/WizardStore.ts:471](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/store/WizardStore.ts#L471)

Restores wizard state from persistence storage.
Implements "latest wins" conflict resolution based on step timestamps.

#### Returns

\`void\`

#### Implementation of

[\`IWizardStore\`](../interfaces/IWizardStore.md).[\`hydrate\`](../interfaces/IWizardStore.md#hydrate)

***

### injectPersistence()

> **injectPersistence**(\`adapter\`): \`void\`

Defined in: [core/src/store/WizardStore.ts:463](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/store/WizardStore.ts#L463)

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

Defined in: [core/src/store/WizardStore.ts:616](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/store/WizardStore.ts#L616)

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

Defined in: [core/src/store/WizardStore.ts:547](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/store/WizardStore.ts#L547)

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

Defined in: [core/src/store/WizardStore.ts:377](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/store/WizardStore.ts#L377)

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

Defined in: [core/src/store/WizardStore.ts:419](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/store/WizardStore.ts#L419)

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

Defined in: [core/src/store/WizardStore.ts:458](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/store/WizardStore.ts#L458)

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

Defined in: [core/src/store/WizardStore.ts:29](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/store/WizardStore.ts#L29)

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

Defined in: [core/src/store/WizardStore.ts:296](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/store/WizardStore.ts#L296)

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

Defined in: [core/src/store/WizardStore.ts:406](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/store/WizardStore.ts#L406)

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

Defined in: [core/src/store/WizardStore.ts:330](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/store/WizardStore.ts#L330)

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

Defined in: [core/src/store/WizardStore.ts:751](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/store/WizardStore.ts#L751)

#### Returns

\`Promise\`\\<\\{ \`errors\`: \`Record\`\\<\`string\`, \`Record\`\\<\`string\`, \`string\`\\>\\>; \`isValid\`: \`boolean\`; \\}\\>

#### Implementation of

[\`IWizardStore\`](../interfaces/IWizardStore.md).[\`validateAll\`](../interfaces/IWizardStore.md#validateall)

***

### validateStep()

> **validateStep**(\`stepId\`): \`Promise\`\\<\`boolean\`\\>

Defined in: [core/src/store/WizardStore.ts:692](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/store/WizardStore.ts#L692)

#### Parameters

##### stepId

\`StepId\`

#### Returns

\`Promise\`\\<\`boolean\`\\>

#### Implementation of

[\`IWizardStore\`](../interfaces/IWizardStore.md).[\`validateStep\`](../interfaces/IWizardStore.md#validatestep)
`,dE=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [core/src](../README.md) / getByPath

# Function: getByPath()

> **getByPath**(\`obj\`, \`path\`, \`defaultValue?\`): \`unknown\`

Defined in: [core/src/utils/data.ts:32](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/utils/data.ts#L32)

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
`,fE=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [core/src](../README.md) / setByPath

# Function: setByPath()

> **setByPath**\\<\`T\`\\>(\`obj\`, \`path\`, \`value\`): \`T\`

Defined in: [core/src/utils/data.ts:54](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/utils/data.ts#L54)

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
`,pE=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [core/src](../README.md) / shallowEqual

# Function: shallowEqual()

> **shallowEqual**(\`a\`, \`b\`): \`boolean\`

Defined in: [core/src/utils/data.ts:99](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/utils/data.ts#L99)

Simple shallow equality check.

## Parameters

### a

\`any\`

### b

\`any\`

## Returns

\`boolean\`
`,hE=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [core/src](../README.md) / toPath

# Function: toPath()

> **toPath**(\`path\`): \`string\`[]

Defined in: [core/src/utils/data.ts:9](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/utils/data.ts#L9)

Parses a string path into an array of keys using a cache.

## Parameters

### path

\`string\`

## Returns

\`string\`[]
`,mE=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [core/src](../README.md) / IBreadcrumb

# Interface: IBreadcrumb\\<StepId\\>

Defined in: [core/src/types.ts:311](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L311)

Breadcrumb Interface

## Type Parameters

### StepId

\`StepId\` *extends* \`string\` = \`string\`

## Properties

### id

> **id**: \`StepId\`

Defined in: [core/src/types.ts:312](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L312)

***

### label

> **label**: \`string\`

Defined in: [core/src/types.ts:313](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L313)

***

### status

> **status**: [\`BreadcrumbStatus\`](../type-aliases/BreadcrumbStatus.md)

Defined in: [core/src/types.ts:314](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L314)
`,gE=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [core/src](../README.md) / IPersistenceAdapter

# Interface: IPersistenceAdapter

Defined in: [core/src/types.ts:141](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L141)

Persistence Adapter Interface

## Properties

### clear()

> **clear**: () => \`void\`

Defined in: [core/src/types.ts:146](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L146)

#### Returns

\`void\`

***

### clearStep()

> **clearStep**: (\`stepId\`) => \`void\`

Defined in: [core/src/types.ts:145](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L145)

#### Parameters

##### stepId

\`string\`

#### Returns

\`void\`

***

### getStep()

> **getStep**: \\<\`T\`\\>(\`stepId\`) => \`T\` \\| \`undefined\`

Defined in: [core/src/types.ts:143](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L143)

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

Defined in: [core/src/types.ts:144](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L144)

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

Defined in: [core/src/types.ts:142](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L142)

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
`,bE=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [core/src](../README.md) / IStepConfig

# Interface: IStepConfig\\<TStepData, StepId\\>

Defined in: [core/src/types.ts:157](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L157)

Step Configuration

## Type Parameters

### TStepData

\`TStepData\` = \`unknown\`

### StepId

\`StepId\` *extends* \`string\` = \`string\`

## Properties

### ~~autoValidate?~~

> \`optional\` **autoValidate**: \`boolean\`

Defined in: [core/src/types.ts:179](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L179)

#### Deprecated

Use validationMode instead

***

### beforeLeave()?

> \`optional\` **beforeLeave**: (\`data\`, \`direction\`, \`metadata\`) => \`boolean\` \\| \`Promise\`\\<\`boolean\`\\>

Defined in: [core/src/types.ts:169](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L169)

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

Defined in: [core/src/types.ts:189](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L189)

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

Defined in: [core/src/types.ts:185](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L185)

***

### component?

> \`optional\` **component**: \`any\`

Defined in: [core/src/types.ts:181](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L181)

***

### condition()?

> \`optional\` **condition**: (\`data\`, \`metadata\`) => \`boolean\` \\| \`Promise\`\\<\`boolean\`\\>

Defined in: [core/src/types.ts:160](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L160)

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

Defined in: [core/src/types.ts:168](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L168)

***

### dependsOn?

> \`optional\` **dependsOn**: \`string\`[]

Defined in: [core/src/types.ts:184](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L184)

***

### id

> **id**: \`StepId\`

Defined in: [core/src/types.ts:158](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L158)

***

### label

> **label**: \`string\`

Defined in: [core/src/types.ts:159](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L159)

***

### persistenceAdapter?

> \`optional\` **persistenceAdapter**: [\`IPersistenceAdapter\`](IPersistenceAdapter.md)

Defined in: [core/src/types.ts:182](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L182)

***

### persistenceMode?

> \`optional\` **persistenceMode**: [\`PersistenceMode\`](../type-aliases/PersistenceMode.md)

Defined in: [core/src/types.ts:183](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L183)

***

### showWhilePending?

> \`optional\` **showWhilePending**: \`boolean\`

Defined in: [core/src/types.ts:167](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L167)

***

### validationAdapter?

> \`optional\` **validationAdapter**: [\`IValidatorAdapter\`](IValidatorAdapter.md)\\<\`TStepData\`\\>

Defined in: [core/src/types.ts:177](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L177)

***

### validationMode?

> \`optional\` **validationMode**: [\`ValidationMode\`](../type-aliases/ValidationMode.md)

Defined in: [core/src/types.ts:180](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L180)
`,yE=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [core/src](../README.md) / IValidatorAdapter

# Interface: IValidatorAdapter\\<TData\\>

Defined in: [core/src/types.ts:125](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L125)

Validator Adapter Interface

## Type Parameters

### TData

\`TData\` = \`unknown\`

## Properties

### validate()

> **validate**: (\`data\`) => [\`ValidationResult\`](../type-aliases/ValidationResult.md) \\| \`Promise\`\\<[\`ValidationResult\`](../type-aliases/ValidationResult.md)\\>

Defined in: [core/src/types.ts:126](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L126)

#### Parameters

##### data

\`TData\`

#### Returns

[\`ValidationResult\`](../type-aliases/ValidationResult.md) \\| \`Promise\`\\<[\`ValidationResult\`](../type-aliases/ValidationResult.md)\\>
`,zE=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [core/src](../README.md) / IWizardActions

# Interface: IWizardActions\\<StepId\\>

Defined in: [core/src/types.ts:90](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L90)

Public actions available to control the wizard.

## Extended by

- [\`IWizardContext\`](IWizardContext.md)

## Type Parameters

### StepId

\`StepId\` *extends* \`string\` = \`string\`

## Properties

### clearStorage()

> **clearStorage**: () => \`void\`

Defined in: [core/src/types.ts:106](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L106)

#### Returns

\`void\`

***

### getData()

> **getData**: (\`path\`, \`defaultValue?\`) => \`unknown\`

Defined in: [core/src/types.ts:110](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L110)

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

Defined in: [core/src/types.ts:91](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L91)

#### Returns

\`Promise\`\\<\`void\`\\>

***

### goToPrevStep()

> **goToPrevStep**: () => \`Promise\`\\<\`void\`\\>

Defined in: [core/src/types.ts:92](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L92)

#### Returns

\`Promise\`\\<\`void\`\\>

***

### goToStep()

> **goToStep**: (\`stepId\`, \`providedActiveSteps?\`, \`options?\`) => \`Promise\`\\<\`boolean\`\\>

Defined in: [core/src/types.ts:93](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L93)

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

Defined in: [core/src/types.ts:99](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L99)

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

Defined in: [core/src/types.ts:107](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L107)

#### Returns

\`void\`

***

### save()

> **save**: (\`stepIds?\`) => \`void\`

Defined in: [core/src/types.ts:105](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L105)

#### Parameters

##### stepIds?

\`boolean\` | \`StepId\` | \`StepId\`[]

#### Returns

\`void\`

***

### setData()

> **setData**: (\`path\`, \`value\`, \`options?\`) => \`void\`

Defined in: [core/src/types.ts:108](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L108)

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

Defined in: [core/src/types.ts:98](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L98)

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

Defined in: [core/src/types.ts:111](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L111)

#### Parameters

##### config

\`Partial\`\\<[\`IWizardConfig\`](IWizardConfig.md)\\<\`any\`, \`StepId\`\\>\\>

#### Returns

\`void\`

***

### updateData()

> **updateData**: (\`data\`, \`options?\`) => \`void\`

Defined in: [core/src/types.ts:109](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L109)

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

Defined in: [core/src/types.ts:101](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L101)

#### Returns

\`Promise\`\\<\\{ \`errors\`: \`Record\`\\<\`string\`, \`Record\`\\<\`string\`, \`string\`\\>\\>; \`isValid\`: \`boolean\`; \\}\\>

***

### validateStep()

> **validateStep**: (\`sid\`) => \`Promise\`\\<\`boolean\`\\>

Defined in: [core/src/types.ts:100](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L100)

#### Parameters

##### sid

\`StepId\`

#### Returns

\`Promise\`\\<\`boolean\`\\>
`,SE=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [core/src](../README.md) / IWizardConfig

# Interface: IWizardConfig\\<T, StepId\\>

Defined in: [core/src/types.ts:201](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L201)

Global Wizard Configuration.

## Type Parameters

### T

\`T\` = \`unknown\`

### StepId

\`StepId\` *extends* \`string\` = \`string\`

## Properties

### analytics?

> \`optional\` **analytics**: \`object\`

Defined in: [core/src/types.ts:214](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L214)

#### onEvent

> **onEvent**: [\`WizardEventHandler\`](../type-aliases/WizardEventHandler.md)\\<\`StepId\`\\>

***

### ~~autoValidate?~~

> \`optional\` **autoValidate**: \`boolean\`

Defined in: [core/src/types.ts:204](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L204)

#### Deprecated

Use validationMode instead

***

### middlewares?

> \`optional\` **middlewares**: [\`WizardMiddleware\`](../type-aliases/WizardMiddleware.md)\\<\`T\`, \`StepId\`\\>[]

Defined in: [core/src/types.ts:217](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L217)

***

### navigationMode?

> \`optional\` **navigationMode**: \`"sequential"\` \\| \`"visited"\` \\| \`"free"\`

Defined in: [core/src/types.ts:218](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L218)

***

### onConflict?

> \`optional\` **onConflict**: \`"merge"\` \\| \`"replace"\` \\| \`"keep-local"\`

Defined in: [core/src/types.ts:213](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L213)

***

### onStepChange()?

> \`optional\` **onStepChange**: (\`fromStep\`, \`toStep\`, \`data\`) => \`void\`

Defined in: [core/src/types.ts:219](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L219)

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

Defined in: [core/src/types.ts:207](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L207)

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

Defined in: [core/src/types.ts:202](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L202)

***

### validationDebounceTime?

> \`optional\` **validationDebounceTime**: \`number\`

Defined in: [core/src/types.ts:206](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L206)

***

### validationMode?

> \`optional\` **validationMode**: [\`ValidationMode\`](../type-aliases/ValidationMode.md)

Defined in: [core/src/types.ts:205](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L205)
`,vE=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [core/src](../README.md) / IWizardContext

# Interface: IWizardContext\\<T, StepId\\>

Defined in: [core/src/types.ts:320](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L320)

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

Defined in: [core/src/types.ts:26](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L26)

List of steps that currently meet their visibility conditions

#### Inherited from

\`Omit.activeSteps\`

***

### activeStepsCount

> **activeStepsCount**: \`number\`

Defined in: [core/src/types.ts:44](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L44)

Number of active steps

#### Inherited from

\`Omit.activeStepsCount\`

***

### allErrors

> **allErrors**: \`Record\`\\<\`StepId\`, \`Record\`\\<\`string\`, \`string\`\\>\\>

Defined in: [core/src/types.ts:333](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L333)

All errors by step and field.

***

### breadcrumbs

> **breadcrumbs**: [\`IBreadcrumb\`](IBreadcrumb.md)\\<\`StepId\`\\>[]

Defined in: [core/src/types.ts:52](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L52)

Breadcrumb items for navigation UI

#### Inherited from

\`Omit.breadcrumbs\`

***

### busySteps

> **busySteps**: \`Set\`\\<\`StepId\`\\>

Defined in: [core/src/types.ts:32](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L32)

Set of step IDs that are currently performing async work

#### Inherited from

\`Omit.busySteps\`

***

### clearStorage()

> **clearStorage**: () => \`void\`

Defined in: [core/src/types.ts:106](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L106)

#### Returns

\`void\`

#### Inherited from

[\`IWizardActions\`](IWizardActions.md).[\`clearStorage\`](IWizardActions.md#clearstorage)

***

### completedSteps

> **completedSteps**: \`Set\`\\<\`StepId\`\\>

Defined in: [core/src/types.ts:36](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L36)

Set of step IDs that have passed validation

#### Inherited from

\`Omit.completedSteps\`

***

### config

> **config**: [\`IWizardConfig\`](IWizardConfig.md)\\<\`T\`, \`StepId\`\\>

Defined in: [core/src/types.ts:40](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L40)

Current wizard configuration

#### Inherited from

\`Omit.config\`

***

### currentStep

> **currentStep**: [\`IStepConfig\`](IStepConfig.md)\\<\`T\`, \`StepId\`\\> \\| \`null\`

Defined in: [core/src/types.ts:14](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L14)

Active step configuration (if any)

#### Inherited from

\`Omit.currentStep\`

***

### currentStepId

> **currentStepId**: \`""\` \\| \`StepId\`

Defined in: [core/src/types.ts:28](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L28)

String ID of the current step

#### Inherited from

\`Omit.currentStepId\`

***

### currentStepIndex

> **currentStepIndex**: \`number\`

Defined in: [core/src/types.ts:16](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L16)

Numeric index of current step in active steps list

#### Inherited from

\`Omit.currentStepIndex\`

***

### data

> **data**: \`T\`

Defined in: [core/src/types.ts:10](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L10)

Global wizard data object

#### Inherited from

\`Omit.data\`

***

### dirtyFields

> **dirtyFields**: \`Set\`\\<\`string\`\\>

Defined in: [core/src/types.ts:50](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L50)

Set of paths to fields that have been modified

#### Inherited from

\`Omit.dirtyFields\`

***

### errors

> **errors**: \`Record\`\\<\`string\`, \`string\`\\>

Defined in: [core/src/types.ts:329](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L329)

Combined error map (flat)

***

### errorSteps

> **errorSteps**: \`Set\`\\<\`StepId\`\\>

Defined in: [core/src/types.ts:38](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L38)

Set of step IDs that currently have active validation errors

#### Inherited from

\`Omit.errorSteps\`

***

### getData()

> **getData**: (\`path\`, \`defaultValue?\`) => \`unknown\`

Defined in: [core/src/types.ts:110](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L110)

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

Defined in: [core/src/types.ts:91](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L91)

#### Returns

\`Promise\`\\<\`void\`\\>

#### Inherited from

[\`IWizardActions\`](IWizardActions.md).[\`goToNextStep\`](IWizardActions.md#gotonextstep)

***

### goToPrevStep()

> **goToPrevStep**: () => \`Promise\`\\<\`void\`\\>

Defined in: [core/src/types.ts:92](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L92)

#### Returns

\`Promise\`\\<\`void\`\\>

#### Inherited from

[\`IWizardActions\`](IWizardActions.md).[\`goToPrevStep\`](IWizardActions.md#gotoprevstep)

***

### goToStep()

> **goToStep**: (\`stepId\`, \`providedActiveSteps?\`, \`options?\`) => \`Promise\`\\<\`boolean\`\\>

Defined in: [core/src/types.ts:93](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L93)

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

Defined in: [core/src/types.ts:54](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L54)

Result of the last goToStep action

#### Inherited from

\`Omit.goToStepResult\`

***

### handleStepChange()

> **handleStepChange**: (\`field\`, \`value\`) => \`void\`

Defined in: [core/src/types.ts:99](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L99)

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

Defined in: [core/src/types.ts:30](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L30)

History of visited steps (navigation path)

#### Inherited from

\`Omit.history\`

***

### isBusy

> **isBusy**: \`boolean\`

Defined in: [core/src/types.ts:46](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L46)

Alias for isPending

#### Inherited from

\`Omit.isBusy\`

***

### isDirty

> **isDirty**: \`boolean\`

Defined in: [core/src/types.ts:48](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L48)

True if any field has been modified since initialization

#### Inherited from

\`Omit.isDirty\`

***

### isFirstStep

> **isFirstStep**: \`boolean\`

Defined in: [core/src/types.ts:18](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L18)

True if currently on the first active step

#### Inherited from

\`Omit.isFirstStep\`

***

### isLastStep

> **isLastStep**: \`boolean\`

Defined in: [core/src/types.ts:20](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L20)

True if currently on the last active step

#### Inherited from

\`Omit.isLastStep\`

***

### isLoading

> **isLoading**: \`boolean\`

Defined in: [core/src/types.ts:22](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L22)

True if the wizard is in an initial loading/hydrating state

#### Inherited from

\`Omit.isLoading\`

***

### isPending

> **isPending**: \`boolean\`

Defined in: [core/src/types.ts:24](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L24)

True if an async action (like navigation or validation) is in progress

#### Inherited from

\`Omit.isPending\`

***

### progress

> **progress**: \`number\`

Defined in: [core/src/types.ts:42](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L42)

Percentage of completion (0-100)

#### Inherited from

\`Omit.progress\`

***

### reset()

> **reset**: () => \`void\`

Defined in: [core/src/types.ts:107](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L107)

#### Returns

\`void\`

#### Inherited from

[\`IWizardActions\`](IWizardActions.md).[\`reset\`](IWizardActions.md#reset)

***

### save()

> **save**: (\`stepIds?\`) => \`void\`

Defined in: [core/src/types.ts:105](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L105)

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

Defined in: [core/src/types.ts:108](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L108)

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

Defined in: [core/src/types.ts:98](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L98)

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

Defined in: [core/src/types.ts:325](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L325)

The internal store instance.

***

### updateConfig()

> **updateConfig**: (\`config\`) => \`void\`

Defined in: [core/src/types.ts:111](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L111)

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

Defined in: [core/src/types.ts:109](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L109)

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

Defined in: [core/src/types.ts:101](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L101)

#### Returns

\`Promise\`\\<\\{ \`errors\`: \`Record\`\\<\`string\`, \`Record\`\\<\`string\`, \`string\`\\>\\>; \`isValid\`: \`boolean\`; \\}\\>

#### Inherited from

[\`IWizardActions\`](IWizardActions.md).[\`validateAll\`](IWizardActions.md#validateall)

***

### validateStep()

> **validateStep**: (\`sid\`) => \`Promise\`\\<\`boolean\`\\>

Defined in: [core/src/types.ts:100](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L100)

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

Defined in: [core/src/types.ts:34](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L34)

Set of step IDs that have been visited by the user

#### Inherited from

\`Omit.visitedSteps\`
`,EE=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [core/src](../README.md) / IWizardState

# Interface: IWizardState\\<T, StepId\\>

Defined in: [core/src/types.ts:8](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L8)

Full state of the wizard.

## Type Parameters

### T

\`T\` = \`unknown\`

### StepId

\`StepId\` *extends* \`string\` = \`string\`

## Properties

### activeSteps

> **activeSteps**: [\`IStepConfig\`](IStepConfig.md)\\<\`T\`, \`StepId\`\\>[]

Defined in: [core/src/types.ts:26](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L26)

List of steps that currently meet their visibility conditions

***

### activeStepsCount

> **activeStepsCount**: \`number\`

Defined in: [core/src/types.ts:44](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L44)

Number of active steps

***

### breadcrumbs

> **breadcrumbs**: [\`IBreadcrumb\`](IBreadcrumb.md)\\<\`StepId\`\\>[]

Defined in: [core/src/types.ts:52](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L52)

Breadcrumb items for navigation UI

***

### busySteps

> **busySteps**: \`Set\`\\<\`StepId\`\\>

Defined in: [core/src/types.ts:32](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L32)

Set of step IDs that are currently performing async work

***

### completedSteps

> **completedSteps**: \`Set\`\\<\`StepId\`\\>

Defined in: [core/src/types.ts:36](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L36)

Set of step IDs that have passed validation

***

### config

> **config**: [\`IWizardConfig\`](IWizardConfig.md)\\<\`T\`, \`StepId\`\\>

Defined in: [core/src/types.ts:40](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L40)

Current wizard configuration

***

### currentStep

> **currentStep**: [\`IStepConfig\`](IStepConfig.md)\\<\`T\`, \`StepId\`\\> \\| \`null\`

Defined in: [core/src/types.ts:14](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L14)

Active step configuration (if any)

***

### currentStepId

> **currentStepId**: \`""\` \\| \`StepId\`

Defined in: [core/src/types.ts:28](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L28)

String ID of the current step

***

### currentStepIndex

> **currentStepIndex**: \`number\`

Defined in: [core/src/types.ts:16](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L16)

Numeric index of current step in active steps list

***

### data

> **data**: \`T\`

Defined in: [core/src/types.ts:10](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L10)

Global wizard data object

***

### dirtyFields

> **dirtyFields**: \`Set\`\\<\`string\`\\>

Defined in: [core/src/types.ts:50](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L50)

Set of paths to fields that have been modified

***

### errors

> **errors**: \`Record\`\\<\`StepId\`, \`Record\`\\<\`string\`, \`string\`\\>\\>

Defined in: [core/src/types.ts:12](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L12)

Current errors map by step and field

***

### errorSteps

> **errorSteps**: \`Set\`\\<\`StepId\`\\>

Defined in: [core/src/types.ts:38](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L38)

Set of step IDs that currently have active validation errors

***

### goToStepResult?

> \`optional\` **goToStepResult**: \`boolean\` \\| \`"init"\` \\| \`null\`

Defined in: [core/src/types.ts:54](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L54)

Result of the last goToStep action

***

### history

> **history**: \`StepId\`[]

Defined in: [core/src/types.ts:30](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L30)

History of visited steps (navigation path)

***

### isBusy

> **isBusy**: \`boolean\`

Defined in: [core/src/types.ts:46](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L46)

Alias for isPending

***

### isDirty

> **isDirty**: \`boolean\`

Defined in: [core/src/types.ts:48](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L48)

True if any field has been modified since initialization

***

### isFirstStep

> **isFirstStep**: \`boolean\`

Defined in: [core/src/types.ts:18](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L18)

True if currently on the first active step

***

### isLastStep

> **isLastStep**: \`boolean\`

Defined in: [core/src/types.ts:20](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L20)

True if currently on the last active step

***

### isLoading

> **isLoading**: \`boolean\`

Defined in: [core/src/types.ts:22](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L22)

True if the wizard is in an initial loading/hydrating state

***

### isPending

> **isPending**: \`boolean\`

Defined in: [core/src/types.ts:24](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L24)

True if an async action (like navigation or validation) is in progress

***

### progress

> **progress**: \`number\`

Defined in: [core/src/types.ts:42](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L42)

Percentage of completion (0-100)

***

### visitedSteps

> **visitedSteps**: \`Set\`\\<\`StepId\`\\>

Defined in: [core/src/types.ts:34](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L34)

Set of step IDs that have been visited by the user
`,xE=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [core/src](../README.md) / IWizardStore

# Interface: IWizardStore\\<T, StepId\\>

Defined in: [core/src/types.ts:60](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L60)

Store interface for reading state and dispatching actions.

## Type Parameters

### T

\`T\`

### StepId

\`StepId\` *extends* \`string\` = \`string\`

## Properties

### errorsMap

> **errorsMap**: \`Map\`\\<\`string\`, \`Map\`\\<\`string\`, \`string\`\\>\\>

Defined in: [core/src/types.ts:74](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L74)

***

### validateAll()

> **validateAll**: () => \`Promise\`\\<\\{ \`errors\`: \`Record\`\\<\`string\`, \`Record\`\\<\`string\`, \`string\`\\>\\>; \`isValid\`: \`boolean\`; \\}\\>

Defined in: [core/src/types.ts:81](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L81)

#### Returns

\`Promise\`\\<\\{ \`errors\`: \`Record\`\\<\`string\`, \`Record\`\\<\`string\`, \`string\`\\>\\>; \`isValid\`: \`boolean\`; \\}\\>

***

### validateStep()

> **validateStep**: (\`stepId\`) => \`Promise\`\\<\`boolean\`\\>

Defined in: [core/src/types.ts:80](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L80)

#### Parameters

##### stepId

\`StepId\`

#### Returns

\`Promise\`\\<\`boolean\`\\>

## Methods

### deleteError()

> **deleteError**(\`stepId\`, \`path\`): \`boolean\`

Defined in: [core/src/types.ts:68](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L68)

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

Defined in: [core/src/types.ts:62](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L62)

#### Parameters

##### action

[\`WizardAction\`](../type-aliases/WizardAction.md)\\<\`T\`, \`StepId\`\\>

#### Returns

\`void\`

***

### getSnapshot()

> **getSnapshot**(): [\`IWizardState\`](IWizardState.md)\\<\`T\`, \`StepId\`\\>

Defined in: [core/src/types.ts:61](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L61)

#### Returns

[\`IWizardState\`](IWizardState.md)\\<\`T\`, \`StepId\`\\>

***

### goToStep()

> **goToStep**(\`stepId\`, \`options?\`): \`Promise\`\\<\`boolean\`\\>

Defined in: [core/src/types.ts:76](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L76)

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

Defined in: [core/src/types.ts:73](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L73)

#### Returns

\`void\`

***

### injectPersistence()

> **injectPersistence**(\`adapter\`): \`void\`

Defined in: [core/src/types.ts:71](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L71)

#### Parameters

##### adapter

[\`IPersistenceAdapter\`](IPersistenceAdapter.md)

#### Returns

\`void\`

***

### resolveActiveSteps()

> **resolveActiveSteps**(\`data?\`): \`Promise\`\\<[\`IStepConfig\`](IStepConfig.md)\\<\`T\`, \`StepId\`\\>[]\\>

Defined in: [core/src/types.ts:75](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L75)

#### Parameters

##### data?

\`T\`

#### Returns

\`Promise\`\\<[\`IStepConfig\`](IStepConfig.md)\\<\`T\`, \`StepId\`\\>[]\\>

***

### save()

> **save**(\`stepId?\`): \`void\`

Defined in: [core/src/types.ts:72](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L72)

#### Parameters

##### stepId?

\`StepId\`

#### Returns

\`void\`

***

### setInitialData()

> **setInitialData**(\`data\`): \`void\`

Defined in: [core/src/types.ts:65](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L65)

#### Parameters

##### data

\`T\`

#### Returns

\`void\`

***

### setStepErrors()

> **setStepErrors**(\`stepId\`, \`errors\`): \`boolean\`

Defined in: [core/src/types.ts:67](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L67)

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

Defined in: [core/src/types.ts:69](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L69)

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

Defined in: [core/src/types.ts:70](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L70)

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

Defined in: [core/src/types.ts:63](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L63)

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

Defined in: [core/src/types.ts:66](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L66)

#### Parameters

##### newErrors

\`Record\`\\<\`string\`, \`Record\`\\<\`string\`, \`string\`\\>\\>

#### Returns

\`void\`

***

### updateMeta()

> **updateMeta**(\`newMeta\`): \`void\`

Defined in: [core/src/types.ts:64](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L64)

#### Parameters

##### newMeta

\`Partial\`\\<[\`IWizardState\`](IWizardState.md)\\<\`T\`, \`StepId\`\\>\\>

#### Returns

\`void\`
`,DE=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [core/src](../README.md) / MiddlewareAPI

# Interface: MiddlewareAPI\\<T, StepId\\>

Defined in: [core/src/types.ts:258](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L258)

Middleware API

## Type Parameters

### T

\`T\` = \`any\`

### StepId

\`StepId\` *extends* \`string\` = \`string\`

## Properties

### dispatch()

> **dispatch**: (\`action\`) => \`void\`

Defined in: [core/src/types.ts:259](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L259)

#### Parameters

##### action

[\`WizardAction\`](../type-aliases/WizardAction.md)\\<\`T\`, \`StepId\`\\>

#### Returns

\`void\`

***

### getSnapshot()

> **getSnapshot**: () => [\`IWizardState\`](IWizardState.md)\\<\`T\`, \`StepId\`\\>

Defined in: [core/src/types.ts:261](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L261)

#### Returns

[\`IWizardState\`](IWizardState.md)\\<\`T\`, \`StepId\`\\>

***

### getState()

> **getState**: () => \`T\`

Defined in: [core/src/types.ts:260](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L260)

#### Returns

\`T\`
`,TE=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [core/src](../README.md) / BreadcrumbStatus

# Type Alias: BreadcrumbStatus

> **BreadcrumbStatus** = \`"visited"\` \\| \`"current"\` \\| \`"upcoming"\` \\| \`"completed"\` \\| \`"error"\` \\| \`"hidden"\`

Defined in: [core/src/types.ts:300](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L300)

Breadcrumb Status
`,AE="[**wizzard-packages**](../../../README.md)\n\n***\n\n[wizzard-packages](../../../README.md) / [core/src](../README.md) / Path\n\n# Type Alias: Path\\<T\\>\n\n> **Path**\\<`T`\\> = `T` *extends* `ReadonlyArray`\\<infer V\\> ? `IsTuple`\\<`T`\\> *extends* `true` ? `{ [K in TupleKeys<T>]-?: PathImpl<K & string, T[K]> }`\\[`TupleKeys`\\<`T`\\>\\] : `PathImpl`\\<`number`, `V`\\> : `{ [K in keyof T]-?: PathImpl<K & string, T[K]> }`\\[keyof `T`\\]\n\nDefined in: [core/src/utils/types.ts:18](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/utils/types.ts#L18)\n\nDot-notation path for a nested data type.\n\n## Type Parameters\n\n### T\n\n`T`\n",wE="[**wizzard-packages**](../../../README.md)\n\n***\n\n[wizzard-packages](../../../README.md) / [core/src](../README.md) / PathValue\n\n# Type Alias: PathValue\\<T, P\\>\n\n> **PathValue**\\<`T`, `P`\\> = `T` *extends* `any` ? `P` *extends* `` `${infer K}.${infer R}` `` ? `K` *extends* keyof `T` ? `R` *extends* [`Path`](Path.md)\\<`T`\\[`K`\\]\\> ? `PathValue`\\<`T`\\[`K`\\], `R`\\> : `never` : `K` *extends* `` `${number}` `` ? `T` *extends* `ReadonlyArray`\\<infer V\\> ? `R` *extends* [`Path`](Path.md)\\<`V`\\> ? `PathValue`\\<`V`, `R`\\> : `never` : `never` : `never` : `P` *extends* keyof `T` ? `T`\\[`P`\\] : `P` *extends* `` `${number}` `` ? `T` *extends* `ReadonlyArray`\\<infer V\\> ? `V` : `never` : `never` : `never`\n\nDefined in: [core/src/utils/types.ts:32](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/utils/types.ts#L32)\n\nValue type resolved from a dot-notation path.\n\n## Type Parameters\n\n### T\n\n`T`\n\n### P\n\n`P` *extends* [`Path`](Path.md)\\<`T`\\>\n",RE=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [core/src](../README.md) / PersistenceMode

# Type Alias: PersistenceMode

> **PersistenceMode** = \`"onStepChange"\` \\| \`"onChange"\` \\| \`"manual"\`

Defined in: [core/src/types.ts:132](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L132)

Persistence strategy for step data.
`,kE=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [core/src](../README.md) / StepDirection

# Type Alias: StepDirection

> **StepDirection** = \`"next"\` \\| \`"prev"\`

Defined in: [core/src/types.ts:152](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L152)

Step Navigation Direction
`,IE=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [core/src](../README.md) / ValidationMode

# Type Alias: ValidationMode

> **ValidationMode** = \`"onChange"\` \\| \`"onStepChange"\` \\| \`"manual"\`

Defined in: [core/src/types.ts:136](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L136)

Validation strategy for step data.
`,_E=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [core/src](../README.md) / ValidationResult

# Type Alias: ValidationResult

> **ValidationResult** = \`object\`

Defined in: [core/src/types.ts:117](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L117)

Validation Result Interface

## Properties

### errors?

> \`optional\` **errors**: \`Record\`\\<\`string\`, \`string\`\\>

Defined in: [core/src/types.ts:119](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L119)

***

### isValid

> **isValid**: \`boolean\`

Defined in: [core/src/types.ts:118](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L118)
`,ME='[**wizzard-packages**](../../../README.md)\n\n***\n\n[wizzard-packages](../../../README.md) / [core/src](../README.md) / WizardAction\n\n# Type Alias: WizardAction\\<T, StepId\\>\n\n> **WizardAction**\\<`T`, `StepId`\\> = \\{ `payload`: \\{ `config`: [`IWizardConfig`](../interfaces/IWizardConfig.md)\\<`T`, `StepId`\\>; `data`: `T`; \\}; `type`: `"INIT"`; \\} \\| \\{ `payload`: \\{ `options?`: `any`; `path`: `string`; `value`: `any`; \\}; `type`: `"SET_DATA"`; \\} \\| \\{ `payload`: \\{ `data`: `Partial`\\<`T`\\>; `options?`: `any`; \\}; `type`: `"UPDATE_DATA"`; \\} \\| \\{ `payload`: \\{ `from`: `StepId`; `nextHistory?`: `StepId`[]; `nextVisitedSteps?`: `Set`\\<`StepId`\\>; `result`: `boolean` \\| `null` \\| `"init"`; `to`: `StepId`; \\}; `type`: `"GO_TO_STEP"`; \\} \\| \\{ `payload`: \\{ `stepId`: `StepId`; \\}; `type`: `"VALIDATE_START"`; \\} \\| \\{ `payload`: \\{ `result`: [`ValidationResult`](ValidationResult.md); `stepId`: `StepId`; \\}; `type`: `"VALIDATE_END"`; \\} \\| \\{ `payload`: \\{ `errors`: `Record`\\<`string`, `string`\\> \\| `undefined` \\| `null`; `stepId`: `StepId`; \\}; `type`: `"SET_STEP_ERRORS"`; \\} \\| \\{ `payload`: \\{ `data`: `T`; \\}; `type`: `"RESET"`; \\} \\| \\{ `payload`: \\{ `meta`: `Partial`\\<[`IWizardState`](../interfaces/IWizardState.md)\\<`T`, `StepId`\\>\\>; \\}; `type`: `"UPDATE_META"`; \\} \\| \\{ `payload`: \\{ `stepId`: `StepId` \\| `""`; \\}; `type`: `"SET_CURRENT_STEP_ID"`; \\} \\| \\{ `payload`: \\{ `history`: `StepId`[]; \\}; `type`: `"SET_HISTORY"`; \\} \\| \\{ `payload`: \\{ `steps`: [`IStepConfig`](../interfaces/IStepConfig.md)\\<`T`, `StepId`\\>[]; \\}; `type`: `"SET_ACTIVE_STEPS"`; \\} \\| \\{ `payload`: \\{ `steps`: `Set`\\<`StepId`\\>; \\}; `type`: `"SET_VISITED_STEPS"`; \\} \\| \\{ `payload`: \\{ `steps`: `Set`\\<`StepId`\\>; \\}; `type`: `"SET_COMPLETED_STEPS"`; \\} \\| \\{ `payload`: \\{ `steps`: `Set`\\<`StepId`\\>; \\}; `type`: `"SET_ERROR_STEPS"`; \\} \\| \\{ `payload`: \\{ `snapshot`: `any`; \\}; `type`: `"RESTORE_SNAPSHOT"`; \\}\n\nDefined in: [core/src/types.ts:225](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L225)\n\nAction Types\n\n## Type Parameters\n\n### T\n\n`T` = `any`\n\n### StepId\n\n`StepId` *extends* `string` = `string`\n',CE=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [core/src](../README.md) / WizardEventHandler

# Type Alias: WizardEventHandler()\\<StepId\\>

> **WizardEventHandler**\\<\`StepId\`\\> = \\<\`E\`\\>(\`name\`, \`payload\`) => \`void\`

Defined in: [core/src/types.ts:292](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L292)

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
`,LE=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [core/src](../README.md) / WizardEventName

# Type Alias: WizardEventName

> **WizardEventName** = \`"step_change"\` \\| \`"validation_error"\` \\| \`"wizard_reset"\`

Defined in: [core/src/types.ts:274](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L274)

Standardized Event Names
`,WE=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [core/src](../README.md) / WizardEventPayloads

# Type Alias: WizardEventPayloads\\<StepId\\>

> **WizardEventPayloads**\\<\`StepId\`\\> = \`object\`

Defined in: [core/src/types.ts:279](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L279)

Event Payloads

## Type Parameters

### StepId

\`StepId\` *extends* \`string\` = \`string\`

## Properties

### step\\_change

> **step\\_change**: \`object\`

Defined in: [core/src/types.ts:280](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L280)

#### from

> **from**: \`StepId\` \\| \`null\`

#### timestamp

> **timestamp**: \`number\`

#### to

> **to**: \`StepId\`

***

### validation\\_error

> **validation\\_error**: \`object\`

Defined in: [core/src/types.ts:281](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L281)

#### errors

> **errors**: \`Record\`\\<\`string\`, \`string\`\\> \\| \`undefined\`

#### stepId

> **stepId**: \`StepId\`

#### timestamp

> **timestamp**: \`number\`

***

### wizard\\_reset

> **wizard\\_reset**: \`object\`

Defined in: [core/src/types.ts:286](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L286)

#### data

> **data**: \`any\`

#### timestamp?

> \`optional\` **timestamp**: \`number\`
`,OE=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [core/src](../README.md) / WizardMiddleware

# Type Alias: WizardMiddleware()\\<T, StepId\\>

> **WizardMiddleware**\\<\`T\`, \`StepId\`\\> = (\`api\`) => (\`next\`) => (\`action\`) => \`void\`

Defined in: [core/src/types.ts:267](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/core/src/types.ts#L267)

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
`,PE=`[**wizzard-packages**](../../README.md)

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

Defined in: [devtools/src/WizardDevTools.tsx:11](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/devtools/src/WizardDevTools.tsx#L11)

## Returns

\`Element\`
`,UE=`[**wizzard-packages**](../../README.md)

***

[wizzard-packages](../../README.md) / middleware/src

# middleware/src

## Variables

- [devToolsMiddleware](variables/devToolsMiddleware.md)
- [loggerMiddleware](variables/loggerMiddleware.md)
`,jE=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [middleware/src](../README.md) / devToolsMiddleware

# Variable: devToolsMiddleware

> \`const\` **devToolsMiddleware**: [\`WizardMiddleware\`](../../../react/src/type-aliases/WizardMiddleware.md)\\<\`any\`, \`any\`\\>

Defined in: [middleware/src/devToolsMiddleware.ts:49](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/middleware/src/devToolsMiddleware.ts#L49)

Middleware for Redux DevTools integration.
`,BE=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [middleware/src](../README.md) / loggerMiddleware

# Variable: loggerMiddleware

> \`const\` **loggerMiddleware**: [\`WizardMiddleware\`](../../../react/src/type-aliases/WizardMiddleware.md)\\<\`any\`, \`any\`\\>

Defined in: [middleware/src/loggerMiddleware.ts:6](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/middleware/src/loggerMiddleware.ts#L6)

Simple logger middleware for Wizard actions
`,XE=`[**wizzard-packages**](../../README.md)

***

[wizzard-packages](../../README.md) / persistence/src

# persistence/src

## Classes

- [LocalStorageAdapter](classes/LocalStorageAdapter.md)
- [MemoryAdapter](classes/MemoryAdapter.md)
`,ZE=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [persistence/src](../README.md) / LocalStorageAdapter

# Class: LocalStorageAdapter

Defined in: [persistence/src/LocalStorageAdapter.ts:6](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/persistence/src/LocalStorageAdapter.ts#L6)

Browser persistence adapter backed by localStorage.

## Implements

- \`IPersistenceAdapter\`

## Constructors

### Constructor

> **new LocalStorageAdapter**(\`prefix\`): \`LocalStorageAdapter\`

Defined in: [persistence/src/LocalStorageAdapter.ts:9](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/persistence/src/LocalStorageAdapter.ts#L9)

#### Parameters

##### prefix

\`string\` = \`'wizard_'\`

#### Returns

\`LocalStorageAdapter\`

## Methods

### clear()

> **clear**(): \`void\`

Defined in: [persistence/src/LocalStorageAdapter.ts:69](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/persistence/src/LocalStorageAdapter.ts#L69)

#### Returns

\`void\`

#### Implementation of

\`IPersistenceAdapter.clear\`

***

### clearStep()

> **clearStep**(\`stepId\`): \`void\`

Defined in: [persistence/src/LocalStorageAdapter.ts:60](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/persistence/src/LocalStorageAdapter.ts#L60)

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

Defined in: [persistence/src/LocalStorageAdapter.ts:27](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/persistence/src/LocalStorageAdapter.ts#L27)

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

Defined in: [persistence/src/LocalStorageAdapter.ts:44](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/persistence/src/LocalStorageAdapter.ts#L44)

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

Defined in: [persistence/src/LocalStorageAdapter.ts:17](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/persistence/src/LocalStorageAdapter.ts#L17)

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
`,HE=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [persistence/src](../README.md) / MemoryAdapter

# Class: MemoryAdapter

Defined in: [persistence/src/MemoryAdapter.ts:6](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/persistence/src/MemoryAdapter.ts#L6)

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

Defined in: [persistence/src/MemoryAdapter.ts:27](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/persistence/src/MemoryAdapter.ts#L27)

#### Returns

\`void\`

#### Implementation of

\`IPersistenceAdapter.clear\`

***

### clearStep()

> **clearStep**(\`stepId\`): \`void\`

Defined in: [persistence/src/MemoryAdapter.ts:23](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/persistence/src/MemoryAdapter.ts#L23)

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

Defined in: [persistence/src/MemoryAdapter.ts:13](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/persistence/src/MemoryAdapter.ts#L13)

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

Defined in: [persistence/src/MemoryAdapter.ts:17](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/persistence/src/MemoryAdapter.ts#L17)

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

Defined in: [persistence/src/MemoryAdapter.ts:9](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/persistence/src/MemoryAdapter.ts#L9)

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
`,VE=`[**wizzard-packages**](../../README.md)

***

[wizzard-packages](../../README.md) / react/src

# react/src

## Classes

- [WizardStore](classes/WizardStore.md)

## Interfaces

- [CreateWizardStoreOptions](interfaces/CreateWizardStoreOptions.md)
- [IStepConfig](interfaces/IStepConfig.md)
- [IValidatorAdapter](interfaces/IValidatorAdapter.md)
- [IWizardActions](interfaces/IWizardActions.md)
- [IWizardConfig](interfaces/IWizardConfig.md)
- [IWizardContext](interfaces/IWizardContext.md)
- [IWizardHandle](interfaces/IWizardHandle.md)
- [IWizardState](interfaces/IWizardState.md)
- [WizardProviderProps](interfaces/WizardProviderProps.md)
- [WizardStepRendererProps](interfaces/WizardStepRendererProps.md)
- [WizardStoreBundle](interfaces/WizardStoreBundle.md)

## Type Aliases

- [IWizardActionsTyped](type-aliases/IWizardActionsTyped.md)
- [PersistenceMode](type-aliases/PersistenceMode.md)
- [ValidationResult](type-aliases/ValidationResult.md)
- [WizardMiddleware](type-aliases/WizardMiddleware.md)

## Variables

- [loggerMiddleware](variables/loggerMiddleware.md)
- [WizardStepRenderer](variables/WizardStepRenderer.md)

## Functions

- [createWizardFactory](functions/createWizardFactory.md)
- [createWizardHooks](functions/createWizardHooks.md)
- [createWizardStore](functions/createWizardStore.md)
- [useWizard](functions/useWizard.md)
- [useWizardActions](functions/useWizardActions.md)
- [useWizardAllErrors](functions/useWizardAllErrors.md)
- [useWizardContext](functions/useWizardContext.md)
- [useWizardCurrentStep](functions/useWizardCurrentStep.md)
- [useWizardError](functions/useWizardError.md)
- [useWizardField](functions/useWizardField.md)
- [useWizardFlatErrors](functions/useWizardFlatErrors.md)
- [useWizardMeta](functions/useWizardMeta.md)
- [useWizardSelector](functions/useWizardSelector.md)
- [useWizardState](functions/useWizardState.md)
- [useWizardSteps](functions/useWizardSteps.md)
- [useWizardStoreError](functions/useWizardStoreError.md)
- [useWizardStoreField](functions/useWizardStoreField.md)
- [useWizardStoreSelector](functions/useWizardStoreSelector.md)
- [useWizardStoreState](functions/useWizardStoreState.md)
- [useWizardStoreValue](functions/useWizardStoreValue.md)
- [useWizardValue](functions/useWizardValue.md)
- [WizardProvider](functions/WizardProvider.md)
`,qE=`[**wizzard-packages**](../../../README.md)

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
`,YE=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [react/src](../README.md) / WizardProvider

# Function: WizardProvider()

> **WizardProvider**\\<\`T\`, \`StepId\`\\>(\`__namedParameters\`): \`Element\`

Defined in: [react/src/context/WizardContext.tsx:61](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/react/src/context/WizardContext.tsx#L61)

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
`,GE="[**wizzard-packages**](../../../README.md)\n\n***\n\n[wizzard-packages](../../../README.md) / [react/src](../README.md) / createWizardFactory\n\n# Function: createWizardFactory()\n\n> **createWizardFactory**\\<`TSchema`, `StepId`\\>(): `object`\n\nDefined in: [react/src/factory.tsx:30](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/react/src/factory.tsx#L30)\n\ncreateWizardFactory\n\nCreates a strongly-typed set of Wizard components and hooks for a specific data schema.\n\n## Type Parameters\n\n### TSchema\n\n`TSchema` *extends* `Record`\\<`string`, `any`\\>\n\nThe shape of your wizard's global data state\n\n### StepId\n\n`StepId` *extends* `string` = `string`\n\n## Returns\n\n`object`\n\n### createStep()\n\n> **createStep**: (`config`) => [`IStepConfig`](../interfaces/IStepConfig.md)\\<`TSchema`, `StepId`\\>\n\n#### Parameters\n\n##### config\n\n[`IStepConfig`](../interfaces/IStepConfig.md)\\<`TSchema`, `StepId`\\>\n\n#### Returns\n\n[`IStepConfig`](../interfaces/IStepConfig.md)\\<`TSchema`, `StepId`\\>\n\n### useBreadcrumbs()\n\n> **useBreadcrumbs**: () => `IBreadcrumb`\\<`StepId`\\>[]\n\n#### Returns\n\n`IBreadcrumb`\\<`StepId`\\>[]\n\n### useWizard()\n\n> **useWizard**: () => [`IWizardContext`](../interfaces/IWizardContext.md)\\<`TSchema`, `StepId`\\>\n\n#### Returns\n\n[`IWizardContext`](../interfaces/IWizardContext.md)\\<`TSchema`, `StepId`\\>\n\n### useWizardActions()\n\n> **useWizardActions**: () => [`IWizardActionsTyped`](../type-aliases/IWizardActionsTyped.md)\\<`TSchema`, `StepId`\\>\n\n#### Returns\n\n[`IWizardActionsTyped`](../type-aliases/IWizardActionsTyped.md)\\<`TSchema`, `StepId`\\>\n\n### useWizardContext()\n\n> **useWizardContext**: () => `any`\n\n#### Returns\n\n`any`\n\n### useWizardError()\n\n> **useWizardError**: \\<`P`\\>(`path`) => `string` \\| `undefined`\n\n#### Type Parameters\n\n##### P\n\n`P` *extends* `string`\n\n#### Parameters\n\n##### path\n\n`P`\n\n#### Returns\n\n`string` \\| `undefined`\n\n### useWizardField()\n\n> **useWizardField**: \\<`P`\\>(`path`, `options?`) => \\[`PathValue`\\<`TSchema`, `P`\\>, (`value`) => `void`\\]\n\n#### Type Parameters\n\n##### P\n\n`P` *extends* `string`\n\n#### Parameters\n\n##### path\n\n`P`\n\n##### options?\n\n\\{ `isEqual?`: (`a`, `b`) => `boolean`; \\} | (`a`, `b`) => `boolean`\n\n#### Returns\n\n\\[`PathValue`\\<`TSchema`, `P`\\>, (`value`) => `void`\\]\n\n### useWizardSelector()\n\n> **useWizardSelector**: \\<`TSelected`\\>(`selector`, `options?`) => `TSelected`\n\n#### Type Parameters\n\n##### TSelected\n\n`TSelected`\n\n#### Parameters\n\n##### selector\n\n(`state`) => `TSelected`\n\n##### options?\n\n\\{ `isEqual?`: (`a`, `b`) => `boolean`; \\} | (`a`, `b`) => `boolean`\n\n#### Returns\n\n`TSelected`\n\n### useWizardShallowSelector()\n\n> **useWizardShallowSelector**: \\<`TSelected`\\>(`selector`) => `TSelected`\n\n#### Type Parameters\n\n##### TSelected\n\n`TSelected`\n\n#### Parameters\n\n##### selector\n\n(`state`) => `TSelected`\n\n#### Returns\n\n`TSelected`\n\n### useWizardState()\n\n> **useWizardState**: () => [`IWizardState`](../interfaces/IWizardState.md)\\<`TSchema`, `StepId`\\>\n\n#### Returns\n\n[`IWizardState`](../interfaces/IWizardState.md)\\<`TSchema`, `StepId`\\>\n\n### useWizardValue()\n\n> **useWizardValue**: \\<`P`\\>(`path`, `options?`) => `PathValue`\\<`TSchema`, `P`\\>\n\n#### Type Parameters\n\n##### P\n\n`P` *extends* `string`\n\n#### Parameters\n\n##### path\n\n`P`\n\n##### options?\n\n\\{ `isEqual?`: (`a`, `b`) => `boolean`; \\} | (`a`, `b`) => `boolean`\n\n#### Returns\n\n`PathValue`\\<`TSchema`, `P`\\>\n\n### WizardProvider()\n\n> **WizardProvider**: (`__namedParameters`) => `Element`\n\n#### Parameters\n\n##### \\_\\_namedParameters\n\n###### children\n\n`ReactNode`\n\n###### config\n\n[`IWizardConfig`](../interfaces/IWizardConfig.md)\\<`TSchema`, `StepId`\\>\n\n###### initialData?\n\n`Partial`\\<`TSchema`\\>\n\n###### initialStepId?\n\n`StepId`\n\n#### Returns\n\n`Element`\n",QE="[**wizzard-packages**](../../../README.md)\n\n***\n\n[wizzard-packages](../../../README.md) / [react/src](../README.md) / createWizardHooks\n\n# Function: createWizardHooks()\n\n> **createWizardHooks**\\<`T`, `StepId`\\>(`store`, `actions?`): `object`\n\nDefined in: [react/src/store.ts:540](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/react/src/store.ts#L540)\n\nHelper: build store-bound hooks for a single store instance.\n\n## Type Parameters\n\n### T\n\n`T`\n\n### StepId\n\n`StepId` *extends* `string` = `string`\n\n## Parameters\n\n### store\n\n`IWizardStore`\\<`T`, `StepId`\\>\n\n### actions?\n\n[`IWizardActionsTyped`](../type-aliases/IWizardActionsTyped.md)\\<`T`, `StepId`\\>\n\n## Returns\n\n`object`\n\n### useWizardError()\n\n> **useWizardError**: (`path`) => `string` \\| `undefined`\n\n#### Parameters\n\n##### path\n\n`string`\n\n#### Returns\n\n`string` \\| `undefined`\n\n### useWizardField()\n\n> **useWizardField**: \\<`P`\\>(`path`, `options?`) => \\[`PathValue`\\<`T`, `P`\\>, (`value`) => `void`\\]\n\n#### Type Parameters\n\n##### P\n\n`P` *extends* `string`\n\n#### Parameters\n\n##### path\n\n`P`\n\n##### options?\n\n###### isEqual?\n\n(`a`, `b`) => `boolean`\n\n#### Returns\n\n\\[`PathValue`\\<`T`, `P`\\>, (`value`) => `void`\\]\n\n### useWizardSelector()\n\n> **useWizardSelector**: \\<`TSelected`\\>(`selector`, `options?`) => `TSelected`\n\n#### Type Parameters\n\n##### TSelected\n\n`TSelected`\n\n#### Parameters\n\n##### selector\n\n(`state`) => `TSelected`\n\n##### options?\n\n###### isEqual?\n\n(`a`, `b`) => `boolean`\n\n#### Returns\n\n`TSelected`\n\n### useWizardState()\n\n> **useWizardState**: () => [`IWizardState`](../interfaces/IWizardState.md)\\<`T`, `StepId`\\>\n\n#### Returns\n\n[`IWizardState`](../interfaces/IWizardState.md)\\<`T`, `StepId`\\>\n\n### useWizardValue()\n\n> **useWizardValue**: \\<`P`\\>(`path`, `options?`) => `PathValue`\\<`T`, `P`\\>\n\n#### Type Parameters\n\n##### P\n\n`P` *extends* `string`\n\n#### Parameters\n\n##### path\n\n`P`\n\n##### options?\n\n###### isEqual?\n\n(`a`, `b`) => `boolean`\n\n#### Returns\n\n`PathValue`\\<`T`, `P`\\>\n",FE="[**wizzard-packages**](../../../README.md)\n\n***\n\n[wizzard-packages](../../../README.md) / [react/src](../README.md) / createWizardStore\n\n# Function: createWizardStore()\n\n> **createWizardStore**\\<`T`, `StepId`\\>(`options`): [`WizardStoreBundle`](../interfaces/WizardStoreBundle.md)\\<`T`, `StepId`\\>\n\nDefined in: [react/src/store.ts:384](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/react/src/store.ts#L384)\n\nCreate a standalone store + actions bundle without React Context.\n\n## Type Parameters\n\n### T\n\n`T` *extends* `Record`\\<`string`, `any`\\>\n\n### StepId\n\n`StepId` *extends* `string` = `string`\n\n## Parameters\n\n### options\n\n[`CreateWizardStoreOptions`](../interfaces/CreateWizardStoreOptions.md)\\<`T`, `StepId`\\>\n\n## Returns\n\n[`WizardStoreBundle`](../interfaces/WizardStoreBundle.md)\\<`T`, `StepId`\\>\n",KE=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [react/src](../README.md) / useWizard

# Function: useWizard()

> **useWizard**\\<\`T\`, \`StepId\`\\>(): \`IWizardContext\`\\<\`T\`, \`StepId\`\\>

Defined in: [react/src/hooks/useWizard.ts:7](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/react/src/hooks/useWizard.ts#L7)

Alias for useWizardContext.

## Type Parameters

### T

\`T\` = \`any\`

### StepId

\`StepId\` *extends* \`string\` = \`string\`

## Returns

\`IWizardContext\`\\<\`T\`, \`StepId\`\\>
`,JE=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [react/src](../README.md) / useWizardActions

# Function: useWizardActions()

> **useWizardActions**\\<\`StepId\`\\>(): [\`IWizardActions\`](../interfaces/IWizardActions.md)\\<\`StepId\`\\>

Defined in: [react/src/context/WizardContext.tsx:689](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/react/src/context/WizardContext.tsx#L689)

Returns the wizard actions API.

## Type Parameters

### StepId

\`StepId\` *extends* \`string\` = \`string\`

## Returns

[\`IWizardActions\`](../interfaces/IWizardActions.md)\\<\`StepId\`\\>
`,$E="[**wizzard-packages**](../../../README.md)\n\n***\n\n[wizzard-packages](../../../README.md) / [react/src](../README.md) / useWizardAllErrors\n\n# Function: useWizardAllErrors()\n\n> **useWizardAllErrors**\\<`T`, `StepId`\\>(): `Record`\\<`StepId`, `Record`\\<`string`, `string`\\>\\>\n\nDefined in: [react/src/context/WizardContext.tsx:767](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/react/src/context/WizardContext.tsx#L767)\n\nReturns all errors by step (shallow-equal).\n\n## Type Parameters\n\n### T\n\n`T` = `any`\n\n### StepId\n\n`StepId` *extends* `string` = `string`\n\n## Returns\n\n`Record`\\<`StepId`, `Record`\\<`string`, `string`\\>\\>\n",e3=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [react/src](../README.md) / useWizardContext

# Function: useWizardContext()

> **useWizardContext**\\<\`T\`, \`StepId\`\\>(): [\`IWizardContext\`](../interfaces/IWizardContext.md)\\<\`T\`, \`StepId\`\\>

Defined in: [react/src/context/WizardContext.tsx:698](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/react/src/context/WizardContext.tsx#L698)

Returns combined wizard state, actions, and derived errors.

## Type Parameters

### T

\`T\` = \`any\`

### StepId

\`StepId\` *extends* \`string\` = \`string\`

## Returns

[\`IWizardContext\`](../interfaces/IWizardContext.md)\\<\`T\`, \`StepId\`\\>
`,n3="[**wizzard-packages**](../../../README.md)\n\n***\n\n[wizzard-packages](../../../README.md) / [react/src](../README.md) / useWizardCurrentStep\n\n# Function: useWizardCurrentStep()\n\n> **useWizardCurrentStep**\\<`T`, `StepId`\\>(): [`IStepConfig`](../interfaces/IStepConfig.md)\\<`T`, `StepId`\\> \\| `null`\n\nDefined in: [react/src/context/WizardContext.tsx:732](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/react/src/context/WizardContext.tsx#L732)\n\nReturns current step config.\n\n## Type Parameters\n\n### T\n\n`T` = `any`\n\n### StepId\n\n`StepId` *extends* `string` = `string`\n\n## Returns\n\n[`IStepConfig`](../interfaces/IStepConfig.md)\\<`T`, `StepId`\\> \\| `null`\n",t3=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [react/src](../README.md) / useWizardError

# Function: useWizardError()

> **useWizardError**(\`path\`): \`string\` \\| \`undefined\`

Defined in: [react/src/context/WizardContext.tsx:623](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/react/src/context/WizardContext.tsx#L623)

Returns the first error message for a path across all steps.

## Parameters

### path

\`string\`

## Returns

\`string\` \\| \`undefined\`
`,a3="[**wizzard-packages**](../../../README.md)\n\n***\n\n[wizzard-packages](../../../README.md) / [react/src](../README.md) / useWizardField\n\n# Function: useWizardField()\n\n> **useWizardField**\\<`T`, `P`\\>(`path`, `options?`): \\[`PathValue`\\<`T`, `P`\\>, (`value`) => `void`\\]\n\nDefined in: [react/src/context/WizardContext.tsx:604](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/react/src/context/WizardContext.tsx#L604)\n\nReturns a value and setter for a path (useState-like API).\n\n## Type Parameters\n\n### T\n\n`T`\n\n### P\n\n`P` *extends* `string`\n\n## Parameters\n\n### path\n\n`P`\n\n### options?\n\n#### isEqual?\n\n(`a`, `b`) => `boolean`\n\n## Returns\n\n\\[`PathValue`\\<`T`, `P`\\>, (`value`) => `void`\\]\n",i3=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [react/src](../README.md) / useWizardFlatErrors

# Function: useWizardFlatErrors()

> **useWizardFlatErrors**\\<\`T\`, \`StepId\`\\>(): \`Record\`\\<\`string\`, \`string\`\\>

Defined in: [react/src/context/WizardContext.tsx:776](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/react/src/context/WizardContext.tsx#L776)

Returns flattened errors map (path -> message).

## Type Parameters

### T

\`T\` = \`any\`

### StepId

\`StepId\` *extends* \`string\` = \`string\`

## Returns

\`Record\`\\<\`string\`, \`string\`\\>
`,r3=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [react/src](../README.md) / useWizardMeta

# Function: useWizardMeta()

> **useWizardMeta**\\<\`T\`, \`StepId\`\\>(): \`object\`

Defined in: [react/src/context/WizardContext.tsx:746](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/react/src/context/WizardContext.tsx#L746)

Returns frequently-used meta state with shallow equality.

## Type Parameters

### T

\`T\` = \`any\`

### StepId

\`StepId\` *extends* \`string\` = \`string\`

## Returns

\`object\`

### activeStepsCount

> **activeStepsCount**: \`number\` = \`s.activeStepsCount\`

### currentStepId

> **currentStepId**: \`""\` \\| \`StepId\` = \`s.currentStepId\`

### currentStepIndex

> **currentStepIndex**: \`number\` = \`s.currentStepIndex\`

### goToStepResult

> **goToStepResult**: \`boolean\` \\| \`"init"\` \\| \`null\` \\| \`undefined\` = \`s.goToStepResult\`

### isBusy

> **isBusy**: \`boolean\` = \`s.isBusy\`

### isDirty

> **isDirty**: \`boolean\` = \`s.isDirty\`

### isFirstStep

> **isFirstStep**: \`boolean\` = \`s.isFirstStep\`

### isLastStep

> **isLastStep**: \`boolean\` = \`s.isLastStep\`

### isLoading

> **isLoading**: \`boolean\` = \`s.isLoading\`

### progress

> **progress**: \`number\` = \`s.progress\`
`,l3=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [react/src](../README.md) / useWizardSelector

# Function: useWizardSelector()

> **useWizardSelector**\\<\`TSelected\`\\>(\`selector\`, \`options?\`): \`TSelected\`

Defined in: [react/src/context/WizardContext.tsx:640](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/react/src/context/WizardContext.tsx#L640)

Selects a derived value from the wizard state with optional equality check.

## Type Parameters

### TSelected

\`TSelected\` = \`any\`

## Parameters

### selector

(\`state\`) => \`TSelected\`

### options?

\\{ \`isEqual?\`: (\`a\`, \`b\`) => \`boolean\`; \\} | (\`a\`, \`b\`) => \`boolean\`

## Returns

\`TSelected\`
`,s3=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [react/src](../README.md) / useWizardState

# Function: useWizardState()

> **useWizardState**\\<\`T\`, \`StepId\`\\>(): [\`IWizardState\`](../interfaces/IWizardState.md)\\<\`T\`, \`StepId\`\\>

Defined in: [react/src/context/WizardContext.tsx:552](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/react/src/context/WizardContext.tsx#L552)

Reads the full wizard state.

## Type Parameters

### T

\`T\` = \`unknown\`

### StepId

\`StepId\` *extends* \`string\` = \`string\`

## Returns

[\`IWizardState\`](../interfaces/IWizardState.md)\\<\`T\`, \`StepId\`\\>
`,o3=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [react/src](../README.md) / useWizardSteps

# Function: useWizardSteps()

> **useWizardSteps**\\<\`T\`, \`StepId\`\\>(): [\`IStepConfig\`](../interfaces/IStepConfig.md)\\<\`T\`, \`StepId\`\\>[]

Defined in: [react/src/context/WizardContext.tsx:739](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/react/src/context/WizardContext.tsx#L739)

Returns active steps list.

## Type Parameters

### T

\`T\` = \`any\`

### StepId

\`StepId\` *extends* \`string\` = \`string\`

## Returns

[\`IStepConfig\`](../interfaces/IStepConfig.md)\\<\`T\`, \`StepId\`\\>[]
`,c3=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [react/src](../README.md) / useWizardStoreError

# Function: useWizardStoreError()

> **useWizardStoreError**(\`store\`, \`path\`): \`string\` \\| \`undefined\`

Defined in: [react/src/store.ts:478](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/react/src/store.ts#L478)

Hook: read the first error for a path without React Context.

## Parameters

### store

\`IWizardStore\`\\<\`any\`, \`any\`\\>

### path

\`string\`

## Returns

\`string\` \\| \`undefined\`
`,u3="[**wizzard-packages**](../../../README.md)\n\n***\n\n[wizzard-packages](../../../README.md) / [react/src](../README.md) / useWizardStoreField\n\n# Function: useWizardStoreField()\n\n> **useWizardStoreField**\\<`T`, `P`\\>(`store`, `setData`, `path`, `options?`): \\[`PathValue`\\<`T`, `P`\\>, (`value`) => `void`\\]\n\nDefined in: [react/src/store.ts:458](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/react/src/store.ts#L458)\n\nHook: value + setter for a path without React Context.\n\n## Type Parameters\n\n### T\n\n`T`\n\n### P\n\n`P` *extends* `string`\n\n## Parameters\n\n### store\n\n`IWizardStore`\\<`T`, `any`\\>\n\n### setData\n\n(`path`, `value`) => `void`\n\n### path\n\n`P`\n\n### options?\n\n#### isEqual?\n\n(`a`, `b`) => `boolean`\n\n## Returns\n\n\\[`PathValue`\\<`T`, `P`\\>, (`value`) => `void`\\]\n",d3="[**wizzard-packages**](../../../README.md)\n\n***\n\n[wizzard-packages](../../../README.md) / [react/src](../README.md) / useWizardStoreSelector\n\n# Function: useWizardStoreSelector()\n\n> **useWizardStoreSelector**\\<`TSelected`\\>(`store`, `selector`, `options?`): `TSelected`\n\nDefined in: [react/src/store.ts:497](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/react/src/store.ts#L497)\n\nHook: select derived state without React Context.\n\n## Type Parameters\n\n### TSelected\n\n`TSelected`\n\n## Parameters\n\n### store\n\n`IWizardStore`\\<`any`, `any`\\>\n\n### selector\n\n(`state`) => `TSelected`\n\n### options?\n\n\\{ `isEqual?`: (`a`, `b`) => `boolean`; \\} | (`a`, `b`) => `boolean`\n\n## Returns\n\n`TSelected`\n",f3=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [react/src](../README.md) / useWizardStoreState

# Function: useWizardStoreState()

> **useWizardStoreState**\\<\`T\`, \`StepId\`\\>(\`store\`): [\`IWizardState\`](../interfaces/IWizardState.md)\\<\`T\`, \`StepId\`\\>

Defined in: [react/src/store.ts:409](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/react/src/store.ts#L409)

Hook: read the full store snapshot without React Context.

## Type Parameters

### T

\`T\`

### StepId

\`StepId\` *extends* \`string\` = \`string\`

## Parameters

### store

\`IWizardStore\`\\<\`T\`, \`StepId\`\\>

## Returns

[\`IWizardState\`](../interfaces/IWizardState.md)\\<\`T\`, \`StepId\`\\>
`,p3="[**wizzard-packages**](../../../README.md)\n\n***\n\n[wizzard-packages](../../../README.md) / [react/src](../README.md) / useWizardStoreValue\n\n# Function: useWizardStoreValue()\n\n> **useWizardStoreValue**\\<`T`, `P`\\>(`store`, `path`, `options?`): `PathValue`\\<`T`, `P`\\>\n\nDefined in: [react/src/store.ts:418](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/react/src/store.ts#L418)\n\nHook: subscribe to a value path without React Context.\n\n## Type Parameters\n\n### T\n\n`T`\n\n### P\n\n`P` *extends* `string`\n\n## Parameters\n\n### store\n\n`IWizardStore`\\<`T`, `any`\\>\n\n### path\n\n`P`\n\n### options?\n\n\\{ `isEqual?`: (`a`, `b`) => `boolean`; \\} | (`a`, `b`) => `boolean`\n\n## Returns\n\n`PathValue`\\<`T`, `P`\\>\n",h3=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [react/src](../README.md) / useWizardValue

# Function: useWizardValue()

> **useWizardValue**\\<\`TValue\`\\>(\`path\`, \`options?\`): \`TValue\`

Defined in: [react/src/context/WizardContext.tsx:564](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/react/src/context/WizardContext.tsx#L564)

Subscribes to a specific data value by path.

## Type Parameters

### TValue

\`TValue\` = \`any\`

## Parameters

### path

\`string\`

### options?

\\{ \`isEqual?\`: (\`a\`, \`b\`) => \`boolean\`; \\} | (\`a\`, \`b\`) => \`boolean\`

## Returns

\`TValue\`
`,m3=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [react/src](../README.md) / CreateWizardStoreOptions

# Interface: CreateWizardStoreOptions\\<T, StepId\\>

Defined in: [react/src/store.ts:21](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/react/src/store.ts#L21)

## Type Parameters

### T

\`T\`

### StepId

\`StepId\` *extends* \`string\` = \`string\`

## Properties

### config

> **config**: [\`IWizardConfig\`](IWizardConfig.md)\\<\`T\`, \`StepId\`\\>

Defined in: [react/src/store.ts:22](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/react/src/store.ts#L22)

***

### initialData?

> \`optional\` **initialData**: \`T\`

Defined in: [react/src/store.ts:23](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/react/src/store.ts#L23)

***

### initialStepId?

> \`optional\` **initialStepId**: \`StepId\`

Defined in: [react/src/store.ts:24](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/react/src/store.ts#L24)
`,g3=`[**wizzard-packages**](../../../README.md)

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
`,b3=`[**wizzard-packages**](../../../README.md)

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
`,y3=`[**wizzard-packages**](../../../README.md)

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
`,z3=`[**wizzard-packages**](../../../README.md)

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
`,S3=`[**wizzard-packages**](../../../README.md)

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
`,v3=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [react/src](../README.md) / IWizardHandle

# Interface: IWizardHandle\\<T, StepId\\>

Defined in: [react/src/types.ts:19](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/react/src/types.ts#L19)

Handle returned by components for imperative access to the wizard.

## Type Parameters

### T

\`T\` = \`unknown\`

### StepId

\`StepId\` *extends* \`string\` = \`string\`

## Properties

### actions

> **actions**: \`IWizardActions\`\\<\`StepId\`\\>

Defined in: [react/src/types.ts:21](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/react/src/types.ts#L21)

***

### state

> **state**: [\`IWizardState\`](IWizardState.md)\\<\`T\`, \`StepId\`\\>

Defined in: [react/src/types.ts:20](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/react/src/types.ts#L20)
`,E3=`[**wizzard-packages**](../../../README.md)

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
`,x3=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [react/src](../README.md) / WizardProviderProps

# Interface: WizardProviderProps\\<T, StepId\\>

Defined in: [react/src/context/WizardContext.tsx:51](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/react/src/context/WizardContext.tsx#L51)

Props for WizardProvider.

## Type Parameters

### T

\`T\`

### StepId

\`StepId\` *extends* \`string\`

## Properties

### children

> **children**: \`ReactNode\`

Defined in: [react/src/context/WizardContext.tsx:55](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/react/src/context/WizardContext.tsx#L55)

***

### config

> **config**: [\`IWizardConfig\`](IWizardConfig.md)\\<\`T\`, \`StepId\`\\>

Defined in: [react/src/context/WizardContext.tsx:52](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/react/src/context/WizardContext.tsx#L52)

***

### initialData?

> \`optional\` **initialData**: \`T\`

Defined in: [react/src/context/WizardContext.tsx:53](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/react/src/context/WizardContext.tsx#L53)

***

### initialStepId?

> \`optional\` **initialStepId**: \`StepId\`

Defined in: [react/src/context/WizardContext.tsx:54](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/react/src/context/WizardContext.tsx#L54)
`,D3=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [react/src](../README.md) / WizardStepRendererProps

# Interface: WizardStepRendererProps

Defined in: [react/src/components/WizardStepRenderer.tsx:7](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/react/src/components/WizardStepRenderer.tsx#L7)

Props for rendering the current step component.

## Properties

### fallback?

> \`optional\` **fallback**: \`ReactNode\`

Defined in: [react/src/components/WizardStepRenderer.tsx:9](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/react/src/components/WizardStepRenderer.tsx#L9)

***

### wrapper?

> \`optional\` **wrapper**: \`ComponentType\`\\<\\{ \`children\`: \`ReactNode\`; \`key\`: \`string\`; \\}\\>

Defined in: [react/src/components/WizardStepRenderer.tsx:8](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/react/src/components/WizardStepRenderer.tsx#L8)
`,T3=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [react/src](../README.md) / WizardStoreBundle

# Interface: WizardStoreBundle\\<T, StepId\\>

Defined in: [react/src/store.ts:27](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/react/src/store.ts#L27)

## Type Parameters

### T

\`T\`

### StepId

\`StepId\` *extends* \`string\` = \`string\`

## Properties

### actions

> **actions**: [\`IWizardActionsTyped\`](../type-aliases/IWizardActionsTyped.md)\\<\`T\`, \`StepId\`\\>

Defined in: [react/src/store.ts:29](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/react/src/store.ts#L29)

***

### store

> **store**: \`IWizardStore\`\\<\`T\`, \`StepId\`\\>

Defined in: [react/src/store.ts:28](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/react/src/store.ts#L28)
`,A3=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [react/src](../README.md) / IWizardActionsTyped

# Type Alias: IWizardActionsTyped\\<T, StepId\\>

> **IWizardActionsTyped**\\<\`T\`, \`StepId\`\\> = \`Omit\`\\<[\`IWizardActions\`](../interfaces/IWizardActions.md)\\<\`StepId\`\\>, \`"setData"\` \\| \`"updateData"\` \\| \`"getData"\`\\> & \`object\`

Defined in: [react/src/types.ts:32](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/react/src/types.ts#L32)

Typed actions for strongly-typed paths.

## Type Declaration

### getData()

> **getData**: \\<\`P\`\\>(\`path\`, \`defaultValue?\`) => \`PathValue\`\\<\`T\`, \`P\`\\>

#### Type Parameters

##### P

\`P\` *extends* \`Path\`\\<\`T\`\\>

#### Parameters

##### path

\`P\`

##### defaultValue?

\`PathValue\`\\<\`T\`, \`P\`\\>

#### Returns

\`PathValue\`\\<\`T\`, \`P\`\\>

### setData()

> **setData**: \\<\`P\`\\>(\`path\`, \`value\`, \`options?\`) => \`void\`

#### Type Parameters

##### P

\`P\` *extends* \`Path\`\\<\`T\`\\>

#### Parameters

##### path

\`P\`

##### value

\`PathValue\`\\<\`T\`, \`P\`\\>

##### options?

###### debounceValidation?

\`number\`

#### Returns

\`void\`

### updateData()

> **updateData**: (\`data\`, \`options?\`) => \`void\`

#### Parameters

##### data

\`Partial\`\\<\`T\`\\>

##### options?

###### persist?

\`boolean\`

###### replace?

\`boolean\`

#### Returns

\`void\`

## Type Parameters

### T

\`T\`

### StepId

\`StepId\` *extends* \`string\` = \`string\`
`,w3=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [react/src](../README.md) / PersistenceMode

# Type Alias: PersistenceMode

> **PersistenceMode** = \`"onStepChange"\` \\| \`"onChange"\` \\| \`"manual"\`

Defined in: core/dist/index.d.ts:129

Persistence strategy for step data.
`,R3=`[**wizzard-packages**](../../../README.md)

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
`,k3=`[**wizzard-packages**](../../../README.md)

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
`,I3=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [react/src](../README.md) / WizardStepRenderer

# Variable: WizardStepRenderer

> \`const\` **WizardStepRenderer**: \`React.FC\`\\<[\`WizardStepRendererProps\`](../interfaces/WizardStepRendererProps.md)\\>

Defined in: [react/src/components/WizardStepRenderer.tsx:15](https://github.com/ZizzX/wizzard-packages/blob/377da9bf749dde2c7e672ab7943fc082e6cd300b/packages/react/src/components/WizardStepRenderer.tsx#L15)

Renders the active step component with optional wrapper and suspense fallback.
`,_3=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [react/src](../README.md) / loggerMiddleware

# Variable: loggerMiddleware

> \`const\` **loggerMiddleware**: [\`WizardMiddleware\`](../type-aliases/WizardMiddleware.md)\\<\`any\`, \`any\`\\>

Defined in: middleware/dist/index.d.ts:6

Simple logger middleware for Wizard actions
`,M3=Object.assign({"../../../../docs/api/README.md":nE,"../../../../docs/api/adapter-yup/src/README.md":tE,"../../../../docs/api/adapter-yup/src/classes/YupAdapter.md":aE,"../../../../docs/api/adapter-yup/src/interfaces/YupLikeError.md":iE,"../../../../docs/api/adapter-yup/src/interfaces/YupLikeSchema.md":rE,"../../../../docs/api/adapter-zod/src/README.md":lE,"../../../../docs/api/adapter-zod/src/classes/ZodAdapter.md":sE,"../../../../docs/api/adapter-zod/src/interfaces/ZodLikeSchema.md":oE,"../../../../docs/api/core/src/README.md":cE,"../../../../docs/api/core/src/classes/WizardStore.md":uE,"../../../../docs/api/core/src/functions/getByPath.md":dE,"../../../../docs/api/core/src/functions/setByPath.md":fE,"../../../../docs/api/core/src/functions/shallowEqual.md":pE,"../../../../docs/api/core/src/functions/toPath.md":hE,"../../../../docs/api/core/src/interfaces/IBreadcrumb.md":mE,"../../../../docs/api/core/src/interfaces/IPersistenceAdapter.md":gE,"../../../../docs/api/core/src/interfaces/IStepConfig.md":bE,"../../../../docs/api/core/src/interfaces/IValidatorAdapter.md":yE,"../../../../docs/api/core/src/interfaces/IWizardActions.md":zE,"../../../../docs/api/core/src/interfaces/IWizardConfig.md":SE,"../../../../docs/api/core/src/interfaces/IWizardContext.md":vE,"../../../../docs/api/core/src/interfaces/IWizardState.md":EE,"../../../../docs/api/core/src/interfaces/IWizardStore.md":xE,"../../../../docs/api/core/src/interfaces/MiddlewareAPI.md":DE,"../../../../docs/api/core/src/type-aliases/BreadcrumbStatus.md":TE,"../../../../docs/api/core/src/type-aliases/Path.md":AE,"../../../../docs/api/core/src/type-aliases/PathValue.md":wE,"../../../../docs/api/core/src/type-aliases/PersistenceMode.md":RE,"../../../../docs/api/core/src/type-aliases/StepDirection.md":kE,"../../../../docs/api/core/src/type-aliases/ValidationMode.md":IE,"../../../../docs/api/core/src/type-aliases/ValidationResult.md":_E,"../../../../docs/api/core/src/type-aliases/WizardAction.md":ME,"../../../../docs/api/core/src/type-aliases/WizardEventHandler.md":CE,"../../../../docs/api/core/src/type-aliases/WizardEventName.md":LE,"../../../../docs/api/core/src/type-aliases/WizardEventPayloads.md":WE,"../../../../docs/api/core/src/type-aliases/WizardMiddleware.md":OE,"../../../../docs/api/devtools/src/README.md":PE,"../../../../docs/api/devtools/src/functions/WizardDevTools.md":NE,"../../../../docs/api/middleware/src/README.md":UE,"../../../../docs/api/middleware/src/variables/devToolsMiddleware.md":jE,"../../../../docs/api/middleware/src/variables/loggerMiddleware.md":BE,"../../../../docs/api/persistence/src/README.md":XE,"../../../../docs/api/persistence/src/classes/LocalStorageAdapter.md":ZE,"../../../../docs/api/persistence/src/classes/MemoryAdapter.md":HE,"../../../../docs/api/react/src/README.md":VE,"../../../../docs/api/react/src/classes/WizardStore.md":qE,"../../../../docs/api/react/src/functions/WizardProvider.md":YE,"../../../../docs/api/react/src/functions/createWizardFactory.md":GE,"../../../../docs/api/react/src/functions/createWizardHooks.md":QE,"../../../../docs/api/react/src/functions/createWizardStore.md":FE,"../../../../docs/api/react/src/functions/useWizard.md":KE,"../../../../docs/api/react/src/functions/useWizardActions.md":JE,"../../../../docs/api/react/src/functions/useWizardAllErrors.md":$E,"../../../../docs/api/react/src/functions/useWizardContext.md":e3,"../../../../docs/api/react/src/functions/useWizardCurrentStep.md":n3,"../../../../docs/api/react/src/functions/useWizardError.md":t3,"../../../../docs/api/react/src/functions/useWizardField.md":a3,"../../../../docs/api/react/src/functions/useWizardFlatErrors.md":i3,"../../../../docs/api/react/src/functions/useWizardMeta.md":r3,"../../../../docs/api/react/src/functions/useWizardSelector.md":l3,"../../../../docs/api/react/src/functions/useWizardState.md":s3,"../../../../docs/api/react/src/functions/useWizardSteps.md":o3,"../../../../docs/api/react/src/functions/useWizardStoreError.md":c3,"../../../../docs/api/react/src/functions/useWizardStoreField.md":u3,"../../../../docs/api/react/src/functions/useWizardStoreSelector.md":d3,"../../../../docs/api/react/src/functions/useWizardStoreState.md":f3,"../../../../docs/api/react/src/functions/useWizardStoreValue.md":p3,"../../../../docs/api/react/src/functions/useWizardValue.md":h3,"../../../../docs/api/react/src/interfaces/CreateWizardStoreOptions.md":m3,"../../../../docs/api/react/src/interfaces/IStepConfig.md":g3,"../../../../docs/api/react/src/interfaces/IValidatorAdapter.md":b3,"../../../../docs/api/react/src/interfaces/IWizardActions.md":y3,"../../../../docs/api/react/src/interfaces/IWizardConfig.md":z3,"../../../../docs/api/react/src/interfaces/IWizardContext.md":S3,"../../../../docs/api/react/src/interfaces/IWizardHandle.md":v3,"../../../../docs/api/react/src/interfaces/IWizardState.md":E3,"../../../../docs/api/react/src/interfaces/WizardProviderProps.md":x3,"../../../../docs/api/react/src/interfaces/WizardStepRendererProps.md":D3,"../../../../docs/api/react/src/interfaces/WizardStoreBundle.md":T3,"../../../../docs/api/react/src/type-aliases/IWizardActionsTyped.md":A3,"../../../../docs/api/react/src/type-aliases/PersistenceMode.md":w3,"../../../../docs/api/react/src/type-aliases/ValidationResult.md":R3,"../../../../docs/api/react/src/type-aliases/WizardMiddleware.md":k3,"../../../../docs/api/react/src/variables/WizardStepRenderer.md":I3,"../../../../docs/api/react/src/variables/loggerMiddleware.md":_3}),C3=[/^react\/src\/README$/,/^react\/src\/functions\/(createWizardFactory|useWizard|useWizardActions|useWizardContext|useWizardError|useWizardSelector|useWizardState|useWizardValue|WizardProvider)$/,/^react\/src\/interfaces\/(IWizardConfig|IStepConfig|IWizardState|IWizardActions|IWizardContext|IValidatorAdapter|IWizardHandle|WizardProviderProps|WizardStepRendererProps)$/,/^react\/src\/type-aliases\/(PersistenceMode|ValidationResult|WizardMiddleware)$/,/^react\/src\/variables\/(WizardStepRenderer|loggerMiddleware)$/,/^adapter-zod\/src\/README$/,/^adapter-zod\/src\/classes\/ZodAdapter$/,/^adapter-yup\/src\/README$/,/^adapter-yup\/src\/classes\/YupAdapter$/,/^persistence\/src\/README$/,/^persistence\/src\/classes\/(LocalStorageAdapter|MemoryAdapter)$/,/^middleware\/src\/README$/,/^middleware\/src\/variables\/(loggerMiddleware|devToolsMiddleware)$/,/^devtools\/src\/README$/,/^devtools\/src\/functions\/WizardDevTools$/],L3=a=>C3.some(r=>r.test(a)),W3=Object.entries(M3).map(([a,r])=>{const l=a.replace("../../../../docs/api/","").replace(/\.md$/,""),s=l.split("/").slice(-1)[0].replace(/[-_]/g," ");return{slug:l,title:s,content:String(r),isUserFacing:L3(l)}}),O3=W3.sort((a,r)=>a.slug.localeCompare(r.slug)),eo=O3,xg=a=>a==="README"||a.endsWith("/README"),Ab=a=>a.replace(/\.md$/,"").replace(/\/$/,"")||"README",Nu=new Set(eo.map(a=>a.slug)),Uu=eo.filter(a=>a.isUserFacing),P3=a=>Ab(a.replace(/^\.\//,"").replace(/^\//,""));function N3(){const a=GS(),r=Uu.find(d=>!xg(d.slug))?.slug||"README",l=Ab(a["*"]||r),s=eo.find(d=>d.slug===l)||Uu[0]||eo[0],u=Uu.filter(d=>!xg(d.slug));return s?Q.jsxs("section",{className:"section api-layout",children:[Q.jsxs("aside",{className:"api-sidebar",children:[Q.jsx("h2",{children:"API Reference"}),Q.jsx("p",{className:"api-note",children:"Generated from TypeDoc. Pick a module to explore the surface area."}),Q.jsx("div",{className:"api-list",children:u.map(d=>Q.jsx(Dl,{to:`/api/${d.slug}`,className:`api-link${d.slug===s.slug?" api-link--active":""}`,children:d.title},d.slug))})]}),Q.jsx("article",{className:"api-content markdown",children:Q.jsx(F1,{components:{a:({href:d,children:f,node:h,...g})=>{if(!d)return Q.jsx("a",{...g,children:f});if(d.startsWith("#"))return Q.jsx("a",{href:d,...g,children:f});if(/^https?:\/\//.test(d))return Q.jsx("a",{href:d,rel:"noreferrer",target:"_blank",...g,children:f});let p=P3(d);return!Nu.has(p)&&Nu.has(`${p}/README`)&&(p=`${p}/README`),Nu.has(p)?Q.jsx(Dl,{to:`/api/${p}`,...g,children:f}):Q.jsx("a",{href:d,...g,children:f})}},children:s.content})})]}):Q.jsx("section",{className:"section api-layout",children:Q.jsxs("article",{className:"api-content",children:[Q.jsx("h2",{children:"API Reference"}),Q.jsxs("p",{children:["API docs are not available. Run ",Q.jsx("code",{children:"pnpm docs:api"})," first."]})]})})}const Qa="https://stackblitz.com/github/ZizzX/wizzard-packages/tree/dev/.stackblitz",U3=[{title:"Validation",description:"Zod/Yup adapters with step-level validation.",href:`${Qa}/validation`},{title:"Persistence",description:"LocalStorage + memory adapters with auto-save.",href:`${Qa}/persistence`},{title:"Navigation",description:"Sequential, visited, and free navigation modes.",href:`${Qa}/basic`},{title:"Custom Adapter",description:"Bring your own validation adapter.",href:`${Qa}/custom-adapter`},{title:"Custom Middleware",description:"Analytics, logging, and guardrails.",href:`${Qa}/middleware`},{title:"Advanced Flow",description:"Branching, guards, and async conditions.",href:`${Qa}/advanced-flow`},{title:"Core Engine",description:"Use @wizzard-packages/core without React bindings.",href:`${Qa}/core-engine`},{title:"Vue + Core",description:"Wire the core engine into a Vue 3 UI.",href:`${Qa}/vue-core`}];function j3(){return Q.jsxs("section",{className:"section",children:[Q.jsxs("div",{className:"section-header",children:[Q.jsx("p",{className:"section-eyebrow",children:"Cookbook"}),Q.jsx("h2",{children:"Examples"}),Q.jsx("p",{className:"section-lead",children:"Start from working recipes and customize the steps for your product."})]}),Q.jsx("div",{className:"card-grid",children:U3.map(a=>Q.jsxs("a",{className:"card card--link",href:a.href,target:"_blank",rel:"noreferrer",children:[Q.jsx("h3",{children:a.title}),Q.jsx("p",{children:a.description}),Q.jsx("span",{className:"card-cta",children:"Open StackBlitz"})]},a.title))})]})}const B3=`import type { IValidatorAdapter, ValidationResult } from '@wizzard-packages/core';

class CustomAdapter implements IValidatorAdapter {
  constructor(private schema: unknown) {}

  async validate(values: unknown): Promise<ValidationResult> {
    // return { isValid: boolean, errors?: Record<string, string> }
    return { isValid: true };
  }
}
`,X3=`import type { WizardMiddleware } from '@wizzard-packages/core';

const analyticsMiddleware: WizardMiddleware = (api) => (next) => (action) => {
  // api.getState(), api.getData(), api.getConfig()
  // track action here
  return next(action);
};
`,Z3=`import type { IPersistenceAdapter } from '@wizzard-packages/core';

class ApiPersistence implements IPersistenceAdapter {
  constructor(private key: string) {}

  async load() {
    return null;
  }

  async save(data: unknown) {
    // persist to API
  }

  async clear() {
    // delete from API
  }
}
`;function H3(){return Q.jsxs("section",{className:"section learn-section",children:[Q.jsxs("div",{className:"section-header",children:[Q.jsx("p",{className:"section-eyebrow",children:"Extend"}),Q.jsx("h2",{children:"Build your own adapters, middleware, and persistence"}),Q.jsx("p",{className:"section-lead",children:"Wizzard Stepper is designed for extension. Bring your own validation, tracking, and storage without changing the core engine."})]}),Q.jsxs("div",{className:"learn-grid",children:[Q.jsxs("article",{className:"card learn-panel",children:[Q.jsx("h3",{children:"Custom validation adapter"}),Q.jsxs("p",{children:["Implement ",Q.jsx("code",{children:"IValidatorAdapter"})," to connect any schema or rules engine."]}),Q.jsx("pre",{className:"learn-code",children:Q.jsx("code",{children:B3})})]}),Q.jsxs("article",{className:"card learn-panel",children:[Q.jsx("h3",{children:"Custom middleware"}),Q.jsxs("p",{children:["Implement ",Q.jsx("code",{children:"WizardMiddleware"})," for logging, analytics, or guardrails."]}),Q.jsx("pre",{className:"learn-code",children:Q.jsx("code",{children:X3})})]}),Q.jsxs("article",{className:"card learn-panel",children:[Q.jsx("h3",{children:"Custom persistence"}),Q.jsxs("p",{children:["Implement ",Q.jsx("code",{children:"IPersistenceAdapter"})," to save wizard state to any backend or storage."]}),Q.jsx("pre",{className:"learn-code",children:Q.jsx("code",{children:Z3})})]})]}),Q.jsxs("div",{className:"learn-actions",children:[Q.jsx(Dl,{to:"/examples",className:"button button--primary",children:"Open examples"}),Q.jsx(Dl,{to:"/api",className:"button button--ghost",children:"Browse API"})]})]})}const V3=g0([{path:"/",element:Q.jsx(C0,{}),children:[{index:!0,element:Q.jsx(L0,{})},{path:"api/*",element:Q.jsx(N3,{})},{path:"examples",element:Q.jsx(j3,{})},{path:"learn",element:Q.jsx(H3,{})}]}],{basename:"/wizzard-packages/"});function q3(){return Q.jsx(D0,{router:V3})}const Dg=document.getElementById("root");Dg&&Zz.createRoot(Dg).render(Q.jsx(Ag.StrictMode,{children:Q.jsx(q3,{})}));
