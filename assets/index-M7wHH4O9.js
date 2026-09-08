function xb(a,r){for(var l=0;l<r.length;l++){const s=r[l];if(typeof s!="string"&&!Array.isArray(s)){for(const u in s)if(u!=="default"&&!(u in a)){const d=Object.getOwnPropertyDescriptor(s,u);d&&Object.defineProperty(a,u,d.get?d:{enumerable:!0,get:()=>s[u]})}}}return Object.freeze(Object.defineProperty(a,Symbol.toStringTag,{value:"Module"}))}(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const u of document.querySelectorAll('link[rel="modulepreload"]'))s(u);new MutationObserver(u=>{for(const d of u)if(d.type==="childList")for(const f of d.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&s(f)}).observe(document,{childList:!0,subtree:!0});function l(u){const d={};return u.integrity&&(d.integrity=u.integrity),u.referrerPolicy&&(d.referrerPolicy=u.referrerPolicy),u.crossOrigin==="use-credentials"?d.credentials="include":u.crossOrigin==="anonymous"?d.credentials="omit":d.credentials="same-origin",d}function s(u){if(u.ep)return;u.ep=!0;const d=l(u);fetch(u.href,d)}})();function no(a){return a&&a.__esModule&&Object.prototype.hasOwnProperty.call(a,"default")?a.default:a}var mu={exports:{}},cl={};var om;function Lz(){if(om)return cl;om=1;var a=Symbol.for("react.transitional.element"),r=Symbol.for("react.fragment");function l(s,u,d){var f=null;if(d!==void 0&&(f=""+d),u.key!==void 0&&(f=""+u.key),"key"in u){d={};for(var h in u)h!=="key"&&(d[h]=u[h])}else d=u;return u=d.ref,{$$typeof:a,type:s,key:f,ref:u!==void 0?u:null,props:d}}return cl.Fragment=r,cl.jsx=l,cl.jsxs=l,cl}var cm;function Wz(){return cm||(cm=1,mu.exports=Lz()),mu.exports}var F=Wz(),bu={exports:{}},Ie={};var um;function Oz(){if(um)return Ie;um=1;var a=Symbol.for("react.transitional.element"),r=Symbol.for("react.portal"),l=Symbol.for("react.fragment"),s=Symbol.for("react.strict_mode"),u=Symbol.for("react.profiler"),d=Symbol.for("react.consumer"),f=Symbol.for("react.context"),h=Symbol.for("react.forward_ref"),b=Symbol.for("react.suspense"),p=Symbol.for("react.memo"),g=Symbol.for("react.lazy"),z=Symbol.for("react.activity"),S=Symbol.iterator;function v(x){return x===null||typeof x!="object"?null:(x=S&&x[S]||x["@@iterator"],typeof x=="function"?x:null)}var L={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},O=Object.assign,j={};function X(x,U,E){this.props=x,this.context=U,this.refs=j,this.updater=E||L}X.prototype.isReactComponent={},X.prototype.setState=function(x,U){if(typeof x!="object"&&typeof x!="function"&&x!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,x,U,"setState")},X.prototype.forceUpdate=function(x){this.updater.enqueueForceUpdate(this,x,"forceUpdate")};function Y(){}Y.prototype=X.prototype;function q(x,U,E){this.props=x,this.context=U,this.refs=j,this.updater=E||L}var de=q.prototype=new Y;de.constructor=q,O(de,X.prototype),de.isPureReactComponent=!0;var ye=Array.isArray;function Z(){}var k={H:null,A:null,T:null,S:null},te=Object.prototype.hasOwnProperty;function he(x,U,E){var re=E.ref;return{$$typeof:a,type:x,key:U,ref:re!==void 0?re:null,props:E}}function ue(x,U){return he(x.type,U,x.props)}function ie(x){return typeof x=="object"&&x!==null&&x.$$typeof===a}function ne(x){var U={"=":"=0",":":"=2"};return"$"+x.replace(/[=:]/g,function(E){return U[E]})}var Te=/\/+/g;function fe(x,U){return typeof x=="object"&&x!==null&&x.key!=null?ne(""+x.key):U.toString(36)}function $(x){switch(x.status){case"fulfilled":return x.value;case"rejected":throw x.reason;default:switch(typeof x.status=="string"?x.then(Z,Z):(x.status="pending",x.then(function(U){x.status==="pending"&&(x.status="fulfilled",x.value=U)},function(U){x.status==="pending"&&(x.status="rejected",x.reason=U)})),x.status){case"fulfilled":return x.value;case"rejected":throw x.reason}}throw x}function C(x,U,E,re,ze){var ge=typeof x;(ge==="undefined"||ge==="boolean")&&(x=null);var _e=!1;if(x===null)_e=!0;else switch(ge){case"bigint":case"string":case"number":_e=!0;break;case"object":switch(x.$$typeof){case a:case r:_e=!0;break;case g:return _e=x._init,C(_e(x._payload),U,E,re,ze)}}if(_e)return ze=ze(x),_e=re===""?"."+fe(x,0):re,ye(ze)?(E="",_e!=null&&(E=_e.replace(Te,"$&/")+"/"),C(ze,U,E,"",function(qn){return qn})):ze!=null&&(ie(ze)&&(ze=ue(ze,E+(ze.key==null||x&&x.key===ze.key?"":(""+ze.key).replace(Te,"$&/")+"/")+_e)),U.push(ze)),1;_e=0;var Je=re===""?".":re+":";if(ye(x))for(var Qe=0;Qe<x.length;Qe++)re=x[Qe],ge=Je+fe(re,Qe),_e+=C(re,U,E,ge,ze);else if(Qe=v(x),typeof Qe=="function")for(x=Qe.call(x),Qe=0;!(re=x.next()).done;)re=re.value,ge=Je+fe(re,Qe++),_e+=C(re,U,E,ge,ze);else if(ge==="object"){if(typeof x.then=="function")return C($(x),U,E,re,ze);throw U=String(x),Error("Objects are not valid as a React child (found: "+(U==="[object Object]"?"object with keys {"+Object.keys(x).join(", ")+"}":U)+"). If you meant to render a collection of children, use an array instead.")}return _e}function K(x,U,E){if(x==null)return x;var re=[],ze=0;return C(x,re,"","",function(ge){return U.call(E,ge,ze++)}),re}function le(x){if(x._status===-1){var U=x._result;U=U(),U.then(function(E){(x._status===0||x._status===-1)&&(x._status=1,x._result=E)},function(E){(x._status===0||x._status===-1)&&(x._status=2,x._result=E)}),x._status===-1&&(x._status=0,x._result=U)}if(x._status===1)return x._result.default;throw x._result}var Me=typeof reportError=="function"?reportError:function(x){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var U=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof x=="object"&&x!==null&&typeof x.message=="string"?String(x.message):String(x),error:x});if(!window.dispatchEvent(U))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",x);return}console.error(x)},D={map:K,forEach:function(x,U,E){K(x,function(){U.apply(this,arguments)},E)},count:function(x){var U=0;return K(x,function(){U++}),U},toArray:function(x){return K(x,function(U){return U})||[]},only:function(x){if(!ie(x))throw Error("React.Children.only expected to receive a single React element child.");return x}};return Ie.Activity=z,Ie.Children=D,Ie.Component=X,Ie.Fragment=l,Ie.Profiler=u,Ie.PureComponent=q,Ie.StrictMode=s,Ie.Suspense=b,Ie.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=k,Ie.__COMPILER_RUNTIME={__proto__:null,c:function(x){return k.H.useMemoCache(x)}},Ie.cache=function(x){return function(){return x.apply(null,arguments)}},Ie.cacheSignal=function(){return null},Ie.cloneElement=function(x,U,E){if(x==null)throw Error("The argument must be a React element, but you passed "+x+".");var re=O({},x.props),ze=x.key;if(U!=null)for(ge in U.key!==void 0&&(ze=""+U.key),U)!te.call(U,ge)||ge==="key"||ge==="__self"||ge==="__source"||ge==="ref"&&U.ref===void 0||(re[ge]=U[ge]);var ge=arguments.length-2;if(ge===1)re.children=E;else if(1<ge){for(var _e=Array(ge),Je=0;Je<ge;Je++)_e[Je]=arguments[Je+2];re.children=_e}return he(x.type,ze,re)},Ie.createContext=function(x){return x={$$typeof:f,_currentValue:x,_currentValue2:x,_threadCount:0,Provider:null,Consumer:null},x.Provider=x,x.Consumer={$$typeof:d,_context:x},x},Ie.createElement=function(x,U,E){var re,ze={},ge=null;if(U!=null)for(re in U.key!==void 0&&(ge=""+U.key),U)te.call(U,re)&&re!=="key"&&re!=="__self"&&re!=="__source"&&(ze[re]=U[re]);var _e=arguments.length-2;if(_e===1)ze.children=E;else if(1<_e){for(var Je=Array(_e),Qe=0;Qe<_e;Qe++)Je[Qe]=arguments[Qe+2];ze.children=Je}if(x&&x.defaultProps)for(re in _e=x.defaultProps,_e)ze[re]===void 0&&(ze[re]=_e[re]);return he(x,ge,ze)},Ie.createRef=function(){return{current:null}},Ie.forwardRef=function(x){return{$$typeof:h,render:x}},Ie.isValidElement=ie,Ie.lazy=function(x){return{$$typeof:g,_payload:{_status:-1,_result:x},_init:le}},Ie.memo=function(x,U){return{$$typeof:p,type:x,compare:U===void 0?null:U}},Ie.startTransition=function(x){var U=k.T,E={};k.T=E;try{var re=x(),ze=k.S;ze!==null&&ze(E,re),typeof re=="object"&&re!==null&&typeof re.then=="function"&&re.then(Z,Me)}catch(ge){Me(ge)}finally{U!==null&&E.types!==null&&(U.types=E.types),k.T=U}},Ie.unstable_useCacheRefresh=function(){return k.H.useCacheRefresh()},Ie.use=function(x){return k.H.use(x)},Ie.useActionState=function(x,U,E){return k.H.useActionState(x,U,E)},Ie.useCallback=function(x,U){return k.H.useCallback(x,U)},Ie.useContext=function(x){return k.H.useContext(x)},Ie.useDebugValue=function(){},Ie.useDeferredValue=function(x,U){return k.H.useDeferredValue(x,U)},Ie.useEffect=function(x,U){return k.H.useEffect(x,U)},Ie.useEffectEvent=function(x){return k.H.useEffectEvent(x)},Ie.useId=function(){return k.H.useId()},Ie.useImperativeHandle=function(x,U,E){return k.H.useImperativeHandle(x,U,E)},Ie.useInsertionEffect=function(x,U){return k.H.useInsertionEffect(x,U)},Ie.useLayoutEffect=function(x,U){return k.H.useLayoutEffect(x,U)},Ie.useMemo=function(x,U){return k.H.useMemo(x,U)},Ie.useOptimistic=function(x,U){return k.H.useOptimistic(x,U)},Ie.useReducer=function(x,U,E){return k.H.useReducer(x,U,E)},Ie.useRef=function(x){return k.H.useRef(x)},Ie.useState=function(x){return k.H.useState(x)},Ie.useSyncExternalStore=function(x,U,E){return k.H.useSyncExternalStore(x,U,E)},Ie.useTransition=function(){return k.H.useTransition()},Ie.version="19.2.3",Ie}var dm;function ed(){return dm||(dm=1,bu.exports=Oz()),bu.exports}var J=ed();const Tb=no(J),Pz=xb({__proto__:null,default:Tb},[J]);var gu={exports:{}},ul={},zu={exports:{}},yu={};var fm;function Nz(){return fm||(fm=1,(function(a){function r(C,K){var le=C.length;C.push(K);e:for(;0<le;){var Me=le-1>>>1,D=C[Me];if(0<u(D,K))C[Me]=K,C[le]=D,le=Me;else break e}}function l(C){return C.length===0?null:C[0]}function s(C){if(C.length===0)return null;var K=C[0],le=C.pop();if(le!==K){C[0]=le;e:for(var Me=0,D=C.length,x=D>>>1;Me<x;){var U=2*(Me+1)-1,E=C[U],re=U+1,ze=C[re];if(0>u(E,le))re<D&&0>u(ze,E)?(C[Me]=ze,C[re]=le,Me=re):(C[Me]=E,C[U]=le,Me=U);else if(re<D&&0>u(ze,le))C[Me]=ze,C[re]=le,Me=re;else break e}}return K}function u(C,K){var le=C.sortIndex-K.sortIndex;return le!==0?le:C.id-K.id}if(a.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var d=performance;a.unstable_now=function(){return d.now()}}else{var f=Date,h=f.now();a.unstable_now=function(){return f.now()-h}}var b=[],p=[],g=1,z=null,S=3,v=!1,L=!1,O=!1,j=!1,X=typeof setTimeout=="function"?setTimeout:null,Y=typeof clearTimeout=="function"?clearTimeout:null,q=typeof setImmediate<"u"?setImmediate:null;function de(C){for(var K=l(p);K!==null;){if(K.callback===null)s(p);else if(K.startTime<=C)s(p),K.sortIndex=K.expirationTime,r(b,K);else break;K=l(p)}}function ye(C){if(O=!1,de(C),!L)if(l(b)!==null)L=!0,Z||(Z=!0,ne());else{var K=l(p);K!==null&&$(ye,K.startTime-C)}}var Z=!1,k=-1,te=5,he=-1;function ue(){return j?!0:!(a.unstable_now()-he<te)}function ie(){if(j=!1,Z){var C=a.unstable_now();he=C;var K=!0;try{e:{L=!1,O&&(O=!1,Y(k),k=-1),v=!0;var le=S;try{n:{for(de(C),z=l(b);z!==null&&!(z.expirationTime>C&&ue());){var Me=z.callback;if(typeof Me=="function"){z.callback=null,S=z.priorityLevel;var D=Me(z.expirationTime<=C);if(C=a.unstable_now(),typeof D=="function"){z.callback=D,de(C),K=!0;break n}z===l(b)&&s(b),de(C)}else s(b);z=l(b)}if(z!==null)K=!0;else{var x=l(p);x!==null&&$(ye,x.startTime-C),K=!1}}break e}finally{z=null,S=le,v=!1}K=void 0}}finally{K?ne():Z=!1}}}var ne;if(typeof q=="function")ne=function(){q(ie)};else if(typeof MessageChannel<"u"){var Te=new MessageChannel,fe=Te.port2;Te.port1.onmessage=ie,ne=function(){fe.postMessage(null)}}else ne=function(){X(ie,0)};function $(C,K){k=X(function(){C(a.unstable_now())},K)}a.unstable_IdlePriority=5,a.unstable_ImmediatePriority=1,a.unstable_LowPriority=4,a.unstable_NormalPriority=3,a.unstable_Profiling=null,a.unstable_UserBlockingPriority=2,a.unstable_cancelCallback=function(C){C.callback=null},a.unstable_forceFrameRate=function(C){0>C||125<C?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):te=0<C?Math.floor(1e3/C):5},a.unstable_getCurrentPriorityLevel=function(){return S},a.unstable_next=function(C){switch(S){case 1:case 2:case 3:var K=3;break;default:K=S}var le=S;S=K;try{return C()}finally{S=le}},a.unstable_requestPaint=function(){j=!0},a.unstable_runWithPriority=function(C,K){switch(C){case 1:case 2:case 3:case 4:case 5:break;default:C=3}var le=S;S=C;try{return K()}finally{S=le}},a.unstable_scheduleCallback=function(C,K,le){var Me=a.unstable_now();switch(typeof le=="object"&&le!==null?(le=le.delay,le=typeof le=="number"&&0<le?Me+le:Me):le=Me,C){case 1:var D=-1;break;case 2:D=250;break;case 5:D=1073741823;break;case 4:D=1e4;break;default:D=5e3}return D=le+D,C={id:g++,callback:K,priorityLevel:C,startTime:le,expirationTime:D,sortIndex:-1},le>Me?(C.sortIndex=le,r(p,C),l(b)===null&&C===l(p)&&(O?(Y(k),k=-1):O=!0,$(ye,le-Me))):(C.sortIndex=D,r(b,C),L||v||(L=!0,Z||(Z=!0,ne()))),C},a.unstable_shouldYield=ue,a.unstable_wrapCallback=function(C){var K=S;return function(){var le=S;S=K;try{return C.apply(this,arguments)}finally{S=le}}}})(yu)),yu}var pm;function Xz(){return pm||(pm=1,zu.exports=Nz()),zu.exports}var vu={exports:{}},Zn={};var hm;function Uz(){if(hm)return Zn;hm=1;var a=ed();function r(b){var p="https://react.dev/errors/"+b;if(1<arguments.length){p+="?args[]="+encodeURIComponent(arguments[1]);for(var g=2;g<arguments.length;g++)p+="&args[]="+encodeURIComponent(arguments[g])}return"Minified React error #"+b+"; visit "+p+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function l(){}var s={d:{f:l,r:function(){throw Error(r(522))},D:l,C:l,L:l,m:l,X:l,S:l,M:l},p:0,findDOMNode:null},u=Symbol.for("react.portal");function d(b,p,g){var z=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:u,key:z==null?null:""+z,children:b,containerInfo:p,implementation:g}}var f=a.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function h(b,p){if(b==="font")return"";if(typeof p=="string")return p==="use-credentials"?p:""}return Zn.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=s,Zn.createPortal=function(b,p){var g=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!p||p.nodeType!==1&&p.nodeType!==9&&p.nodeType!==11)throw Error(r(299));return d(b,p,null,g)},Zn.flushSync=function(b){var p=f.T,g=s.p;try{if(f.T=null,s.p=2,b)return b()}finally{f.T=p,s.p=g,s.d.f()}},Zn.preconnect=function(b,p){typeof b=="string"&&(p?(p=p.crossOrigin,p=typeof p=="string"?p==="use-credentials"?p:"":void 0):p=null,s.d.C(b,p))},Zn.prefetchDNS=function(b){typeof b=="string"&&s.d.D(b)},Zn.preinit=function(b,p){if(typeof b=="string"&&p&&typeof p.as=="string"){var g=p.as,z=h(g,p.crossOrigin),S=typeof p.integrity=="string"?p.integrity:void 0,v=typeof p.fetchPriority=="string"?p.fetchPriority:void 0;g==="style"?s.d.S(b,typeof p.precedence=="string"?p.precedence:void 0,{crossOrigin:z,integrity:S,fetchPriority:v}):g==="script"&&s.d.X(b,{crossOrigin:z,integrity:S,fetchPriority:v,nonce:typeof p.nonce=="string"?p.nonce:void 0})}},Zn.preinitModule=function(b,p){if(typeof b=="string")if(typeof p=="object"&&p!==null){if(p.as==null||p.as==="script"){var g=h(p.as,p.crossOrigin);s.d.M(b,{crossOrigin:g,integrity:typeof p.integrity=="string"?p.integrity:void 0,nonce:typeof p.nonce=="string"?p.nonce:void 0})}}else p==null&&s.d.M(b)},Zn.preload=function(b,p){if(typeof b=="string"&&typeof p=="object"&&p!==null&&typeof p.as=="string"){var g=p.as,z=h(g,p.crossOrigin);s.d.L(b,g,{crossOrigin:z,integrity:typeof p.integrity=="string"?p.integrity:void 0,nonce:typeof p.nonce=="string"?p.nonce:void 0,type:typeof p.type=="string"?p.type:void 0,fetchPriority:typeof p.fetchPriority=="string"?p.fetchPriority:void 0,referrerPolicy:typeof p.referrerPolicy=="string"?p.referrerPolicy:void 0,imageSrcSet:typeof p.imageSrcSet=="string"?p.imageSrcSet:void 0,imageSizes:typeof p.imageSizes=="string"?p.imageSizes:void 0,media:typeof p.media=="string"?p.media:void 0})}},Zn.preloadModule=function(b,p){if(typeof b=="string")if(p){var g=h(p.as,p.crossOrigin);s.d.m(b,{as:typeof p.as=="string"&&p.as!=="script"?p.as:void 0,crossOrigin:g,integrity:typeof p.integrity=="string"?p.integrity:void 0})}else s.d.m(b)},Zn.requestFormReset=function(b){s.d.r(b)},Zn.unstable_batchedUpdates=function(b,p){return b(p)},Zn.useFormState=function(b,p,g){return f.H.useFormState(b,p,g)},Zn.useFormStatus=function(){return f.H.useHostTransitionStatus()},Zn.version="19.2.3",Zn}var mm;function Ab(){if(mm)return vu.exports;mm=1;function a(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(a)}catch(r){console.error(r)}}return a(),vu.exports=Uz(),vu.exports}var bm;function Bz(){if(bm)return ul;bm=1;var a=Xz(),r=ed(),l=Ab();function s(e){var n="https://react.dev/errors/"+e;if(1<arguments.length){n+="?args[]="+encodeURIComponent(arguments[1]);for(var t=2;t<arguments.length;t++)n+="&args[]="+encodeURIComponent(arguments[t])}return"Minified React error #"+e+"; visit "+n+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function u(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function d(e){var n=e,t=e;if(e.alternate)for(;n.return;)n=n.return;else{e=n;do n=e,(n.flags&4098)!==0&&(t=n.return),e=n.return;while(e)}return n.tag===3?t:null}function f(e){if(e.tag===13){var n=e.memoizedState;if(n===null&&(e=e.alternate,e!==null&&(n=e.memoizedState)),n!==null)return n.dehydrated}return null}function h(e){if(e.tag===31){var n=e.memoizedState;if(n===null&&(e=e.alternate,e!==null&&(n=e.memoizedState)),n!==null)return n.dehydrated}return null}function b(e){if(d(e)!==e)throw Error(s(188))}function p(e){var n=e.alternate;if(!n){if(n=d(e),n===null)throw Error(s(188));return n!==e?null:e}for(var t=e,i=n;;){var o=t.return;if(o===null)break;var c=o.alternate;if(c===null){if(i=o.return,i!==null){t=i;continue}break}if(o.child===c.child){for(c=o.child;c;){if(c===t)return b(o),e;if(c===i)return b(o),n;c=c.sibling}throw Error(s(188))}if(t.return!==i.return)t=o,i=c;else{for(var m=!1,y=o.child;y;){if(y===t){m=!0,t=o,i=c;break}if(y===i){m=!0,i=o,t=c;break}y=y.sibling}if(!m){for(y=c.child;y;){if(y===t){m=!0,t=c,i=o;break}if(y===i){m=!0,i=c,t=o;break}y=y.sibling}if(!m)throw Error(s(189))}}if(t.alternate!==i)throw Error(s(190))}if(t.tag!==3)throw Error(s(188));return t.stateNode.current===t?e:n}function g(e){var n=e.tag;if(n===5||n===26||n===27||n===6)return e;for(e=e.child;e!==null;){if(n=g(e),n!==null)return n;e=e.sibling}return null}var z=Object.assign,S=Symbol.for("react.element"),v=Symbol.for("react.transitional.element"),L=Symbol.for("react.portal"),O=Symbol.for("react.fragment"),j=Symbol.for("react.strict_mode"),X=Symbol.for("react.profiler"),Y=Symbol.for("react.consumer"),q=Symbol.for("react.context"),de=Symbol.for("react.forward_ref"),ye=Symbol.for("react.suspense"),Z=Symbol.for("react.suspense_list"),k=Symbol.for("react.memo"),te=Symbol.for("react.lazy"),he=Symbol.for("react.activity"),ue=Symbol.for("react.memo_cache_sentinel"),ie=Symbol.iterator;function ne(e){return e===null||typeof e!="object"?null:(e=ie&&e[ie]||e["@@iterator"],typeof e=="function"?e:null)}var Te=Symbol.for("react.client.reference");function fe(e){if(e==null)return null;if(typeof e=="function")return e.$$typeof===Te?null:e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case O:return"Fragment";case X:return"Profiler";case j:return"StrictMode";case ye:return"Suspense";case Z:return"SuspenseList";case he:return"Activity"}if(typeof e=="object")switch(e.$$typeof){case L:return"Portal";case q:return e.displayName||"Context";case Y:return(e._context.displayName||"Context")+".Consumer";case de:var n=e.render;return e=e.displayName,e||(e=n.displayName||n.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case k:return n=e.displayName||null,n!==null?n:fe(e.type)||"Memo";case te:n=e._payload,e=e._init;try{return fe(e(n))}catch{}}return null}var $=Array.isArray,C=r.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,K=l.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,le={pending:!1,data:null,method:null,action:null},Me=[],D=-1;function x(e){return{current:e}}function U(e){0>D||(e.current=Me[D],Me[D]=null,D--)}function E(e,n){D++,Me[D]=e.current,e.current=n}var re=x(null),ze=x(null),ge=x(null),_e=x(null);function Je(e,n){switch(E(ge,n),E(ze,e),E(re,null),n.nodeType){case 9:case 11:e=(e=n.documentElement)&&(e=e.namespaceURI)?Ih(e):0;break;default:if(e=n.tagName,n=n.namespaceURI)n=Ih(n),e=Mh(n,e);else switch(e){case"svg":e=1;break;case"math":e=2;break;default:e=0}}U(re),E(re,e)}function Qe(){U(re),U(ze),U(ge)}function qn(e){e.memoizedState!==null&&E(_e,e);var n=re.current,t=Mh(n,e.type);n!==t&&(E(ze,e),E(re,t))}function It(e){ze.current===e&&(U(re),U(ze)),_e.current===e&&(U(_e),rl._currentValue=le)}var Dn,Mt;function gt(e){if(Dn===void 0)try{throw Error()}catch(t){var n=t.stack.trim().match(/\n( *(at )?)/);Dn=n&&n[1]||"",Mt=-1<t.stack.indexOf(`
    at`)?" (<anonymous>)":-1<t.stack.indexOf("@")?"@unknown:0:0":""}return`
`+Dn+e+Mt}var ya=!1;function Gn(e,n){if(!e||ya)return"";ya=!0;var t=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var i={DetermineComponentFrameRoot:function(){try{if(n){var G=function(){throw Error()};if(Object.defineProperty(G.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(G,[])}catch(N){var W=N}Reflect.construct(e,[],G)}else{try{G.call()}catch(N){W=N}e.call(G.prototype)}}else{try{throw Error()}catch(N){W=N}(G=e())&&typeof G.catch=="function"&&G.catch(function(){})}}catch(N){if(N&&W&&typeof N.stack=="string")return[N.stack,W.stack]}return[null,null]}};i.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var o=Object.getOwnPropertyDescriptor(i.DetermineComponentFrameRoot,"name");o&&o.configurable&&Object.defineProperty(i.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var c=i.DetermineComponentFrameRoot(),m=c[0],y=c[1];if(m&&y){var w=m.split(`
`),M=y.split(`
`);for(o=i=0;i<w.length&&!w[i].includes("DetermineComponentFrameRoot");)i++;for(;o<M.length&&!M[o].includes("DetermineComponentFrameRoot");)o++;if(i===w.length||o===M.length)for(i=w.length-1,o=M.length-1;1<=i&&0<=o&&w[i]!==M[o];)o--;for(;1<=i&&0<=o;i--,o--)if(w[i]!==M[o]){if(i!==1||o!==1)do if(i--,o--,0>o||w[i]!==M[o]){var B=`
`+w[i].replace(" at new "," at ");return e.displayName&&B.includes("<anonymous>")&&(B=B.replace("<anonymous>",e.displayName)),B}while(1<=i&&0<=o);break}}}finally{ya=!1,Error.prepareStackTrace=t}return(t=e?e.displayName||e.name:"")?gt(t):""}function _i(e,n){switch(e.tag){case 26:case 27:case 5:return gt(e.type);case 16:return gt("Lazy");case 13:return e.child!==n&&n!==null?gt("Suspense Fallback"):gt("Suspense");case 19:return gt("SuspenseList");case 0:case 15:return Gn(e.type,!1);case 11:return Gn(e.type.render,!1);case 1:return Gn(e.type,!0);case 31:return gt("Activity");default:return""}}function Ii(e){try{var n="",t=null;do n+=_i(e,t),t=e,e=e.return;while(e);return n}catch(i){return`
Error generating stack: `+i.message+`
`+i.stack}}var Ft=Object.prototype.hasOwnProperty,va=a.unstable_scheduleCallback,ni=a.unstable_cancelCallback,vr=a.unstable_shouldYield,Sr=a.unstable_requestPaint,zn=a.unstable_now,Qt=a.unstable_getCurrentPriorityLevel,V=a.unstable_ImmediatePriority,ae=a.unstable_UserBlockingPriority,Se=a.unstable_NormalPriority,Ae=a.unstable_LowPriority,He=a.unstable_IdlePriority,Ln=a.log,Ct=a.unstable_setDisableYieldValue,mn=null,yn=null;function On(e){if(typeof Ln=="function"&&Ct(e),yn&&typeof yn.setStrictMode=="function")try{yn.setStrictMode(mn,e)}catch{}}var Ke=Math.clz32?Math.clz32:Mi,Ut=Math.log,Yn=Math.LN2;function Mi(e){return e>>>=0,e===0?32:31-(Ut(e)/Yn|0)|0}var ti=256,Sa=262144,Ea=4194304;function Kt(e){var n=e&42;if(n!==0)return n;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&261888;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function ai(e,n,t){var i=e.pendingLanes;if(i===0)return 0;var o=0,c=e.suspendedLanes,m=e.pingedLanes;e=e.warmLanes;var y=i&134217727;return y!==0?(i=y&~c,i!==0?o=Kt(i):(m&=y,m!==0?o=Kt(m):t||(t=y&~e,t!==0&&(o=Kt(t))))):(y=i&~c,y!==0?o=Kt(y):m!==0?o=Kt(m):t||(t=i&~e,t!==0&&(o=Kt(t)))),o===0?0:n!==0&&n!==o&&(n&c)===0&&(c=o&-o,t=n&-n,c>=t||c===32&&(t&4194048)!==0)?n:o}function ii(e,n){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&n)===0}function Il(e,n){switch(e){case 1:case 2:case 4:case 8:case 64:return n+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return n+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function ri(){var e=Ea;return Ea<<=1,(Ea&62914560)===0&&(Ea=4194304),e}function Da(e){for(var n=[],t=0;31>t;t++)n.push(e);return n}function li(e,n){e.pendingLanes|=n,n!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function lo(e,n,t,i,o,c){var m=e.pendingLanes;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=t,e.entangledLanes&=t,e.errorRecoveryDisabledLanes&=t,e.shellSuspendCounter=0;var y=e.entanglements,w=e.expirationTimes,M=e.hiddenUpdates;for(t=m&~t;0<t;){var B=31-Ke(t),G=1<<B;y[B]=0,w[B]=-1;var W=M[B];if(W!==null)for(M[B]=null,B=0;B<W.length;B++){var N=W[B];N!==null&&(N.lane&=-536870913)}t&=~G}i!==0&&T(e,i,0),c!==0&&o===0&&e.tag!==0&&(e.suspendedLanes|=c&~(m&~n))}function T(e,n,t){e.pendingLanes|=n,e.suspendedLanes&=~n;var i=31-Ke(n);e.entangledLanes|=n,e.entanglements[i]=e.entanglements[i]|1073741824|t&261930}function _(e,n){var t=e.entangledLanes|=n;for(e=e.entanglements;t;){var i=31-Ke(t),o=1<<i;o&n|e[i]&n&&(e[i]|=n),t&=~o}}function P(e,n){var t=n&-n;return t=(t&42)!==0?1:Q(t),(t&(e.suspendedLanes|n))!==0?0:t}function Q(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function se(e){return e&=-e,2<e?8<e?(e&134217727)!==0?32:268435456:8:2}function Ee(){var e=K.p;return e!==0?e:(e=window.event,e===void 0?32:nm(e.type))}function xe(e,n){var t=K.p;try{return K.p=e,n()}finally{K.p=t}}var pe=Math.random().toString(36).slice(2),ce="__reactFiber$"+pe,oe="__reactProps$"+pe,be="__reactContainer$"+pe,Re="__reactEvents$"+pe,Ue="__reactListeners$"+pe,Mn="__reactHandles$"+pe,$e="__reactResources$"+pe,Pe="__reactMarker$"+pe;function on(e){delete e[ce],delete e[oe],delete e[Re],delete e[Ue],delete e[Mn]}function lt(e){var n=e[ce];if(n)return n;for(var t=e.parentNode;t;){if(n=t[be]||t[ce]){if(t=n.alternate,n.child!==null||t!==null&&t.child!==null)for(e=Xh(e);e!==null;){if(t=e[ce])return t;e=Xh(e)}return n}e=t,t=e.parentNode}return null}function zt(e){if(e=e[ce]||e[be]){var n=e.tag;if(n===5||n===6||n===13||n===31||n===26||n===27||n===3)return e}return null}function Vn(e){var n=e.tag;if(n===5||n===26||n===27||n===6)return e.stateNode;throw Error(s(33))}function Pn(e){var n=e[$e];return n||(n=e[$e]={hoistableStyles:new Map,hoistableScripts:new Map}),n}function vn(e){e[Pe]=!0}var wa=new Set,Bt={};function yt(e,n){Lt(e,n),Lt(e+"Capture",n)}function Lt(e,n){for(Bt[e]=n,e=0;e<n.length;e++)wa.add(n[e])}var Ve=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),dn={},Jt={};function si(e){return Ft.call(Jt,e)?!0:Ft.call(dn,e)?!1:Ve.test(e)?Jt[e]=!0:(dn[e]=!0,!1)}function fn(e,n,t){if(si(n))if(t===null)e.removeAttribute(n);else{switch(typeof t){case"undefined":case"function":case"symbol":e.removeAttribute(n);return;case"boolean":var i=n.toLowerCase().slice(0,5);if(i!=="data-"&&i!=="aria-"){e.removeAttribute(n);return}}e.setAttribute(n,""+t)}}function Wt(e,n,t){if(t===null)e.removeAttribute(n);else{switch(typeof t){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(n);return}e.setAttribute(n,""+t)}}function vt(e,n,t,i){if(i===null)e.removeAttribute(t);else{switch(typeof i){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(t);return}e.setAttributeNS(n,t,""+i)}}function Fn(e){switch(typeof e){case"bigint":case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function Ed(e){var n=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(n==="checkbox"||n==="radio")}function Ag(e,n,t){var i=Object.getOwnPropertyDescriptor(e.constructor.prototype,n);if(!e.hasOwnProperty(n)&&typeof i<"u"&&typeof i.get=="function"&&typeof i.set=="function"){var o=i.get,c=i.set;return Object.defineProperty(e,n,{configurable:!0,get:function(){return o.call(this)},set:function(m){t=""+m,c.call(this,m)}}),Object.defineProperty(e,n,{enumerable:i.enumerable}),{getValue:function(){return t},setValue:function(m){t=""+m},stopTracking:function(){e._valueTracker=null,delete e[n]}}}}function so(e){if(!e._valueTracker){var n=Ed(e)?"checked":"value";e._valueTracker=Ag(e,n,""+e[n])}}function Dd(e){if(!e)return!1;var n=e._valueTracker;if(!n)return!0;var t=n.getValue(),i="";return e&&(i=Ed(e)?e.checked?"true":"false":e.value),e=i,e!==t?(n.setValue(e),!0):!1}function Ml(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}var kg=/[\n"\\]/g;function St(e){return e.replace(kg,function(n){return"\\"+n.charCodeAt(0).toString(16)+" "})}function oo(e,n,t,i,o,c,m,y){e.name="",m!=null&&typeof m!="function"&&typeof m!="symbol"&&typeof m!="boolean"?e.type=m:e.removeAttribute("type"),n!=null?m==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+Fn(n)):e.value!==""+Fn(n)&&(e.value=""+Fn(n)):m!=="submit"&&m!=="reset"||e.removeAttribute("value"),n!=null?co(e,m,Fn(n)):t!=null?co(e,m,Fn(t)):i!=null&&e.removeAttribute("value"),o==null&&c!=null&&(e.defaultChecked=!!c),o!=null&&(e.checked=o&&typeof o!="function"&&typeof o!="symbol"),y!=null&&typeof y!="function"&&typeof y!="symbol"&&typeof y!="boolean"?e.name=""+Fn(y):e.removeAttribute("name")}function wd(e,n,t,i,o,c,m,y){if(c!=null&&typeof c!="function"&&typeof c!="symbol"&&typeof c!="boolean"&&(e.type=c),n!=null||t!=null){if(!(c!=="submit"&&c!=="reset"||n!=null)){so(e);return}t=t!=null?""+Fn(t):"",n=n!=null?""+Fn(n):t,y||n===e.value||(e.value=n),e.defaultValue=n}i=i??o,i=typeof i!="function"&&typeof i!="symbol"&&!!i,e.checked=y?e.checked:!!i,e.defaultChecked=!!i,m!=null&&typeof m!="function"&&typeof m!="symbol"&&typeof m!="boolean"&&(e.name=m),so(e)}function co(e,n,t){n==="number"&&Ml(e.ownerDocument)===e||e.defaultValue===""+t||(e.defaultValue=""+t)}function Ci(e,n,t,i){if(e=e.options,n){n={};for(var o=0;o<t.length;o++)n["$"+t[o]]=!0;for(t=0;t<e.length;t++)o=n.hasOwnProperty("$"+e[t].value),e[t].selected!==o&&(e[t].selected=o),o&&i&&(e[t].defaultSelected=!0)}else{for(t=""+Fn(t),n=null,o=0;o<e.length;o++){if(e[o].value===t){e[o].selected=!0,i&&(e[o].defaultSelected=!0);return}n!==null||e[o].disabled||(n=e[o])}n!==null&&(n.selected=!0)}}function xd(e,n,t){if(n!=null&&(n=""+Fn(n),n!==e.value&&(e.value=n),t==null)){e.defaultValue!==n&&(e.defaultValue=n);return}e.defaultValue=t!=null?""+Fn(t):""}function Td(e,n,t,i){if(n==null){if(i!=null){if(t!=null)throw Error(s(92));if($(i)){if(1<i.length)throw Error(s(93));i=i[0]}t=i}t==null&&(t=""),n=t}t=Fn(n),e.defaultValue=t,i=e.textContent,i===t&&i!==""&&i!==null&&(e.value=i),so(e)}function Li(e,n){if(n){var t=e.firstChild;if(t&&t===e.lastChild&&t.nodeType===3){t.nodeValue=n;return}}e.textContent=n}var Rg=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function Ad(e,n,t){var i=n.indexOf("--")===0;t==null||typeof t=="boolean"||t===""?i?e.setProperty(n,""):n==="float"?e.cssFloat="":e[n]="":i?e.setProperty(n,t):typeof t!="number"||t===0||Rg.has(n)?n==="float"?e.cssFloat=t:e[n]=(""+t).trim():e[n]=t+"px"}function kd(e,n,t){if(n!=null&&typeof n!="object")throw Error(s(62));if(e=e.style,t!=null){for(var i in t)!t.hasOwnProperty(i)||n!=null&&n.hasOwnProperty(i)||(i.indexOf("--")===0?e.setProperty(i,""):i==="float"?e.cssFloat="":e[i]="");for(var o in n)i=n[o],n.hasOwnProperty(o)&&t[o]!==i&&Ad(e,o,i)}else for(var c in n)n.hasOwnProperty(c)&&Ad(e,c,n[c])}function uo(e){if(e.indexOf("-")===-1)return!1;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var _g=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),Ig=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function Cl(e){return Ig.test(""+e)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":e}function $t(){}var fo=null;function po(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Wi=null,Oi=null;function Rd(e){var n=zt(e);if(n&&(e=n.stateNode)){var t=e[oe]||null;e:switch(e=n.stateNode,n.type){case"input":if(oo(e,t.value,t.defaultValue,t.defaultValue,t.checked,t.defaultChecked,t.type,t.name),n=t.name,t.type==="radio"&&n!=null){for(t=e;t.parentNode;)t=t.parentNode;for(t=t.querySelectorAll('input[name="'+St(""+n)+'"][type="radio"]'),n=0;n<t.length;n++){var i=t[n];if(i!==e&&i.form===e.form){var o=i[oe]||null;if(!o)throw Error(s(90));oo(i,o.value,o.defaultValue,o.defaultValue,o.checked,o.defaultChecked,o.type,o.name)}}for(n=0;n<t.length;n++)i=t[n],i.form===e.form&&Dd(i)}break e;case"textarea":xd(e,t.value,t.defaultValue);break e;case"select":n=t.value,n!=null&&Ci(e,!!t.multiple,n,!1)}}}var ho=!1;function _d(e,n,t){if(ho)return e(n,t);ho=!0;try{var i=e(n);return i}finally{if(ho=!1,(Wi!==null||Oi!==null)&&(vs(),Wi&&(n=Wi,e=Oi,Oi=Wi=null,Rd(n),e)))for(n=0;n<e.length;n++)Rd(e[n])}}function Er(e,n){var t=e.stateNode;if(t===null)return null;var i=t[oe]||null;if(i===null)return null;t=i[n];e:switch(n){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(i=!i.disabled)||(e=e.type,i=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!i;break e;default:e=!1}if(e)return null;if(t&&typeof t!="function")throw Error(s(231,n,typeof t));return t}var ea=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),mo=!1;if(ea)try{var Dr={};Object.defineProperty(Dr,"passive",{get:function(){mo=!0}}),window.addEventListener("test",Dr,Dr),window.removeEventListener("test",Dr,Dr)}catch{mo=!1}var xa=null,bo=null,Ll=null;function Id(){if(Ll)return Ll;var e,n=bo,t=n.length,i,o="value"in xa?xa.value:xa.textContent,c=o.length;for(e=0;e<t&&n[e]===o[e];e++);var m=t-e;for(i=1;i<=m&&n[t-i]===o[c-i];i++);return Ll=o.slice(e,1<i?1-i:void 0)}function Wl(e){var n=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&n===13&&(e=13)):e=n,e===10&&(e=13),32<=e||e===13?e:0}function Ol(){return!0}function Md(){return!1}function Qn(e){function n(t,i,o,c,m){this._reactName=t,this._targetInst=o,this.type=i,this.nativeEvent=c,this.target=m,this.currentTarget=null;for(var y in e)e.hasOwnProperty(y)&&(t=e[y],this[y]=t?t(c):c[y]);return this.isDefaultPrevented=(c.defaultPrevented!=null?c.defaultPrevented:c.returnValue===!1)?Ol:Md,this.isPropagationStopped=Md,this}return z(n.prototype,{preventDefault:function(){this.defaultPrevented=!0;var t=this.nativeEvent;t&&(t.preventDefault?t.preventDefault():typeof t.returnValue!="unknown"&&(t.returnValue=!1),this.isDefaultPrevented=Ol)},stopPropagation:function(){var t=this.nativeEvent;t&&(t.stopPropagation?t.stopPropagation():typeof t.cancelBubble!="unknown"&&(t.cancelBubble=!0),this.isPropagationStopped=Ol)},persist:function(){},isPersistent:Ol}),n}var oi={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Pl=Qn(oi),wr=z({},oi,{view:0,detail:0}),Mg=Qn(wr),go,zo,xr,Nl=z({},wr,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:vo,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==xr&&(xr&&e.type==="mousemove"?(go=e.screenX-xr.screenX,zo=e.screenY-xr.screenY):zo=go=0,xr=e),go)},movementY:function(e){return"movementY"in e?e.movementY:zo}}),Cd=Qn(Nl),Cg=z({},Nl,{dataTransfer:0}),Lg=Qn(Cg),Wg=z({},wr,{relatedTarget:0}),yo=Qn(Wg),Og=z({},oi,{animationName:0,elapsedTime:0,pseudoElement:0}),Pg=Qn(Og),Ng=z({},oi,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),Xg=Qn(Ng),Ug=z({},oi,{data:0}),Ld=Qn(Ug),Bg={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Zg={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},jg={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Vg(e){var n=this.nativeEvent;return n.getModifierState?n.getModifierState(e):(e=jg[e])?!!n[e]:!1}function vo(){return Vg}var Hg=z({},wr,{key:function(e){if(e.key){var n=Bg[e.key]||e.key;if(n!=="Unidentified")return n}return e.type==="keypress"?(e=Wl(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?Zg[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:vo,charCode:function(e){return e.type==="keypress"?Wl(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Wl(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),qg=Qn(Hg),Gg=z({},Nl,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Wd=Qn(Gg),Yg=z({},wr,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:vo}),Fg=Qn(Yg),Qg=z({},oi,{propertyName:0,elapsedTime:0,pseudoElement:0}),Kg=Qn(Qg),Jg=z({},Nl,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),$g=Qn(Jg),e1=z({},oi,{newState:0,oldState:0}),n1=Qn(e1),t1=[9,13,27,32],So=ea&&"CompositionEvent"in window,Tr=null;ea&&"documentMode"in document&&(Tr=document.documentMode);var a1=ea&&"TextEvent"in window&&!Tr,Od=ea&&(!So||Tr&&8<Tr&&11>=Tr),Pd=" ",Nd=!1;function Xd(e,n){switch(e){case"keyup":return t1.indexOf(n.keyCode)!==-1;case"keydown":return n.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Ud(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var Pi=!1;function i1(e,n){switch(e){case"compositionend":return Ud(n);case"keypress":return n.which!==32?null:(Nd=!0,Pd);case"textInput":return e=n.data,e===Pd&&Nd?null:e;default:return null}}function r1(e,n){if(Pi)return e==="compositionend"||!So&&Xd(e,n)?(e=Id(),Ll=bo=xa=null,Pi=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(n.ctrlKey||n.altKey||n.metaKey)||n.ctrlKey&&n.altKey){if(n.char&&1<n.char.length)return n.char;if(n.which)return String.fromCharCode(n.which)}return null;case"compositionend":return Od&&n.locale!=="ko"?null:n.data;default:return null}}var l1={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Bd(e){var n=e&&e.nodeName&&e.nodeName.toLowerCase();return n==="input"?!!l1[e.type]:n==="textarea"}function Zd(e,n,t,i){Wi?Oi?Oi.push(i):Oi=[i]:Wi=i,n=As(n,"onChange"),0<n.length&&(t=new Pl("onChange","change",null,t,i),e.push({event:t,listeners:n}))}var Ar=null,kr=null;function s1(e){xh(e,0)}function Xl(e){var n=Vn(e);if(Dd(n))return e}function jd(e,n){if(e==="change")return n}var Vd=!1;if(ea){var Eo;if(ea){var Do="oninput"in document;if(!Do){var Hd=document.createElement("div");Hd.setAttribute("oninput","return;"),Do=typeof Hd.oninput=="function"}Eo=Do}else Eo=!1;Vd=Eo&&(!document.documentMode||9<document.documentMode)}function qd(){Ar&&(Ar.detachEvent("onpropertychange",Gd),kr=Ar=null)}function Gd(e){if(e.propertyName==="value"&&Xl(kr)){var n=[];Zd(n,kr,e,po(e)),_d(s1,n)}}function o1(e,n,t){e==="focusin"?(qd(),Ar=n,kr=t,Ar.attachEvent("onpropertychange",Gd)):e==="focusout"&&qd()}function c1(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Xl(kr)}function u1(e,n){if(e==="click")return Xl(n)}function d1(e,n){if(e==="input"||e==="change")return Xl(n)}function f1(e,n){return e===n&&(e!==0||1/e===1/n)||e!==e&&n!==n}var st=typeof Object.is=="function"?Object.is:f1;function Rr(e,n){if(st(e,n))return!0;if(typeof e!="object"||e===null||typeof n!="object"||n===null)return!1;var t=Object.keys(e),i=Object.keys(n);if(t.length!==i.length)return!1;for(i=0;i<t.length;i++){var o=t[i];if(!Ft.call(n,o)||!st(e[o],n[o]))return!1}return!0}function Yd(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Fd(e,n){var t=Yd(e);e=0;for(var i;t;){if(t.nodeType===3){if(i=e+t.textContent.length,e<=n&&i>=n)return{node:t,offset:n-e};e=i}e:{for(;t;){if(t.nextSibling){t=t.nextSibling;break e}t=t.parentNode}t=void 0}t=Yd(t)}}function Qd(e,n){return e&&n?e===n?!0:e&&e.nodeType===3?!1:n&&n.nodeType===3?Qd(e,n.parentNode):"contains"in e?e.contains(n):e.compareDocumentPosition?!!(e.compareDocumentPosition(n)&16):!1:!1}function Kd(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var n=Ml(e.document);n instanceof e.HTMLIFrameElement;){try{var t=typeof n.contentWindow.location.href=="string"}catch{t=!1}if(t)e=n.contentWindow;else break;n=Ml(e.document)}return n}function wo(e){var n=e&&e.nodeName&&e.nodeName.toLowerCase();return n&&(n==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||n==="textarea"||e.contentEditable==="true")}var p1=ea&&"documentMode"in document&&11>=document.documentMode,Ni=null,xo=null,_r=null,To=!1;function Jd(e,n,t){var i=t.window===t?t.document:t.nodeType===9?t:t.ownerDocument;To||Ni==null||Ni!==Ml(i)||(i=Ni,"selectionStart"in i&&wo(i)?i={start:i.selectionStart,end:i.selectionEnd}:(i=(i.ownerDocument&&i.ownerDocument.defaultView||window).getSelection(),i={anchorNode:i.anchorNode,anchorOffset:i.anchorOffset,focusNode:i.focusNode,focusOffset:i.focusOffset}),_r&&Rr(_r,i)||(_r=i,i=As(xo,"onSelect"),0<i.length&&(n=new Pl("onSelect","select",null,n,t),e.push({event:n,listeners:i}),n.target=Ni)))}function ci(e,n){var t={};return t[e.toLowerCase()]=n.toLowerCase(),t["Webkit"+e]="webkit"+n,t["Moz"+e]="moz"+n,t}var Xi={animationend:ci("Animation","AnimationEnd"),animationiteration:ci("Animation","AnimationIteration"),animationstart:ci("Animation","AnimationStart"),transitionrun:ci("Transition","TransitionRun"),transitionstart:ci("Transition","TransitionStart"),transitioncancel:ci("Transition","TransitionCancel"),transitionend:ci("Transition","TransitionEnd")},Ao={},$d={};ea&&($d=document.createElement("div").style,"AnimationEvent"in window||(delete Xi.animationend.animation,delete Xi.animationiteration.animation,delete Xi.animationstart.animation),"TransitionEvent"in window||delete Xi.transitionend.transition);function ui(e){if(Ao[e])return Ao[e];if(!Xi[e])return e;var n=Xi[e],t;for(t in n)if(n.hasOwnProperty(t)&&t in $d)return Ao[e]=n[t];return e}var ef=ui("animationend"),nf=ui("animationiteration"),tf=ui("animationstart"),h1=ui("transitionrun"),m1=ui("transitionstart"),b1=ui("transitioncancel"),af=ui("transitionend"),rf=new Map,ko="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");ko.push("scrollEnd");function Ot(e,n){rf.set(e,n),yt(n,[e])}var Ul=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var n=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(n))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)},Et=[],Ui=0,Ro=0;function Bl(){for(var e=Ui,n=Ro=Ui=0;n<e;){var t=Et[n];Et[n++]=null;var i=Et[n];Et[n++]=null;var o=Et[n];Et[n++]=null;var c=Et[n];if(Et[n++]=null,i!==null&&o!==null){var m=i.pending;m===null?o.next=o:(o.next=m.next,m.next=o),i.pending=o}c!==0&&lf(t,o,c)}}function Zl(e,n,t,i){Et[Ui++]=e,Et[Ui++]=n,Et[Ui++]=t,Et[Ui++]=i,Ro|=i,e.lanes|=i,e=e.alternate,e!==null&&(e.lanes|=i)}function _o(e,n,t,i){return Zl(e,n,t,i),jl(e)}function di(e,n){return Zl(e,null,null,n),jl(e)}function lf(e,n,t){e.lanes|=t;var i=e.alternate;i!==null&&(i.lanes|=t);for(var o=!1,c=e.return;c!==null;)c.childLanes|=t,i=c.alternate,i!==null&&(i.childLanes|=t),c.tag===22&&(e=c.stateNode,e===null||e._visibility&1||(o=!0)),e=c,c=c.return;return e.tag===3?(c=e.stateNode,o&&n!==null&&(o=31-Ke(t),e=c.hiddenUpdates,i=e[o],i===null?e[o]=[n]:i.push(n),n.lane=t|536870912),c):null}function jl(e){if(50<Jr)throw Jr=0,Xc=null,Error(s(185));for(var n=e.return;n!==null;)e=n,n=e.return;return e.tag===3?e.stateNode:null}var Bi={};function g1(e,n,t,i){this.tag=e,this.key=t,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=n,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=i,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function ot(e,n,t,i){return new g1(e,n,t,i)}function Io(e){return e=e.prototype,!(!e||!e.isReactComponent)}function na(e,n){var t=e.alternate;return t===null?(t=ot(e.tag,n,e.key,e.mode),t.elementType=e.elementType,t.type=e.type,t.stateNode=e.stateNode,t.alternate=e,e.alternate=t):(t.pendingProps=n,t.type=e.type,t.flags=0,t.subtreeFlags=0,t.deletions=null),t.flags=e.flags&65011712,t.childLanes=e.childLanes,t.lanes=e.lanes,t.child=e.child,t.memoizedProps=e.memoizedProps,t.memoizedState=e.memoizedState,t.updateQueue=e.updateQueue,n=e.dependencies,t.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext},t.sibling=e.sibling,t.index=e.index,t.ref=e.ref,t.refCleanup=e.refCleanup,t}function sf(e,n){e.flags&=65011714;var t=e.alternate;return t===null?(e.childLanes=0,e.lanes=n,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=t.childLanes,e.lanes=t.lanes,e.child=t.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=t.memoizedProps,e.memoizedState=t.memoizedState,e.updateQueue=t.updateQueue,e.type=t.type,n=t.dependencies,e.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext}),e}function Vl(e,n,t,i,o,c){var m=0;if(i=e,typeof e=="function")Io(e)&&(m=1);else if(typeof e=="string")m=Ez(e,t,re.current)?26:e==="html"||e==="head"||e==="body"?27:5;else e:switch(e){case he:return e=ot(31,t,n,o),e.elementType=he,e.lanes=c,e;case O:return fi(t.children,o,c,n);case j:m=8,o|=24;break;case X:return e=ot(12,t,n,o|2),e.elementType=X,e.lanes=c,e;case ye:return e=ot(13,t,n,o),e.elementType=ye,e.lanes=c,e;case Z:return e=ot(19,t,n,o),e.elementType=Z,e.lanes=c,e;default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case q:m=10;break e;case Y:m=9;break e;case de:m=11;break e;case k:m=14;break e;case te:m=16,i=null;break e}m=29,t=Error(s(130,e===null?"null":typeof e,"")),i=null}return n=ot(m,t,n,o),n.elementType=e,n.type=i,n.lanes=c,n}function fi(e,n,t,i){return e=ot(7,e,i,n),e.lanes=t,e}function Mo(e,n,t){return e=ot(6,e,null,n),e.lanes=t,e}function of(e){var n=ot(18,null,null,0);return n.stateNode=e,n}function Co(e,n,t){return n=ot(4,e.children!==null?e.children:[],e.key,n),n.lanes=t,n.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},n}var cf=new WeakMap;function Dt(e,n){if(typeof e=="object"&&e!==null){var t=cf.get(e);return t!==void 0?t:(n={value:e,source:n,stack:Ii(n)},cf.set(e,n),n)}return{value:e,source:n,stack:Ii(n)}}var Zi=[],ji=0,Hl=null,Ir=0,wt=[],xt=0,Ta=null,Zt=1,jt="";function ta(e,n){Zi[ji++]=Ir,Zi[ji++]=Hl,Hl=e,Ir=n}function uf(e,n,t){wt[xt++]=Zt,wt[xt++]=jt,wt[xt++]=Ta,Ta=e;var i=Zt;e=jt;var o=32-Ke(i)-1;i&=~(1<<o),t+=1;var c=32-Ke(n)+o;if(30<c){var m=o-o%5;c=(i&(1<<m)-1).toString(32),i>>=m,o-=m,Zt=1<<32-Ke(n)+o|t<<o|i,jt=c+e}else Zt=1<<c|t<<o|i,jt=e}function Lo(e){e.return!==null&&(ta(e,1),uf(e,1,0))}function Wo(e){for(;e===Hl;)Hl=Zi[--ji],Zi[ji]=null,Ir=Zi[--ji],Zi[ji]=null;for(;e===Ta;)Ta=wt[--xt],wt[xt]=null,jt=wt[--xt],wt[xt]=null,Zt=wt[--xt],wt[xt]=null}function df(e,n){wt[xt++]=Zt,wt[xt++]=jt,wt[xt++]=Ta,Zt=n.id,jt=n.overflow,Ta=e}var Nn=null,pn=null,je=!1,Aa=null,Tt=!1,Oo=Error(s(519));function ka(e){var n=Error(s(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw Mr(Dt(n,e)),Oo}function ff(e){var n=e.stateNode,t=e.type,i=e.memoizedProps;switch(n[ce]=e,n[oe]=i,t){case"dialog":Xe("cancel",n),Xe("close",n);break;case"iframe":case"object":case"embed":Xe("load",n);break;case"video":case"audio":for(t=0;t<el.length;t++)Xe(el[t],n);break;case"source":Xe("error",n);break;case"img":case"image":case"link":Xe("error",n),Xe("load",n);break;case"details":Xe("toggle",n);break;case"input":Xe("invalid",n),wd(n,i.value,i.defaultValue,i.checked,i.defaultChecked,i.type,i.name,!0);break;case"select":Xe("invalid",n);break;case"textarea":Xe("invalid",n),Td(n,i.value,i.defaultValue,i.children)}t=i.children,typeof t!="string"&&typeof t!="number"&&typeof t!="bigint"||n.textContent===""+t||i.suppressHydrationWarning===!0||Rh(n.textContent,t)?(i.popover!=null&&(Xe("beforetoggle",n),Xe("toggle",n)),i.onScroll!=null&&Xe("scroll",n),i.onScrollEnd!=null&&Xe("scrollend",n),i.onClick!=null&&(n.onclick=$t),n=!0):n=!1,n||ka(e,!0)}function pf(e){for(Nn=e.return;Nn;)switch(Nn.tag){case 5:case 31:case 13:Tt=!1;return;case 27:case 3:Tt=!0;return;default:Nn=Nn.return}}function Vi(e){if(e!==Nn)return!1;if(!je)return pf(e),je=!0,!1;var n=e.tag,t;if((t=n!==3&&n!==27)&&((t=n===5)&&(t=e.type,t=!(t!=="form"&&t!=="button")||eu(e.type,e.memoizedProps)),t=!t),t&&pn&&ka(e),pf(e),n===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(s(317));pn=Nh(e)}else if(n===31){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(s(317));pn=Nh(e)}else n===27?(n=pn,Za(e.type)?(e=ru,ru=null,pn=e):pn=n):pn=Nn?kt(e.stateNode.nextSibling):null;return!0}function pi(){pn=Nn=null,je=!1}function Po(){var e=Aa;return e!==null&&(et===null?et=e:et.push.apply(et,e),Aa=null),e}function Mr(e){Aa===null?Aa=[e]:Aa.push(e)}var No=x(null),hi=null,aa=null;function Ra(e,n,t){E(No,n._currentValue),n._currentValue=t}function ia(e){e._currentValue=No.current,U(No)}function Xo(e,n,t){for(;e!==null;){var i=e.alternate;if((e.childLanes&n)!==n?(e.childLanes|=n,i!==null&&(i.childLanes|=n)):i!==null&&(i.childLanes&n)!==n&&(i.childLanes|=n),e===t)break;e=e.return}}function Uo(e,n,t,i){var o=e.child;for(o!==null&&(o.return=e);o!==null;){var c=o.dependencies;if(c!==null){var m=o.child;c=c.firstContext;e:for(;c!==null;){var y=c;c=o;for(var w=0;w<n.length;w++)if(y.context===n[w]){c.lanes|=t,y=c.alternate,y!==null&&(y.lanes|=t),Xo(c.return,t,e),i||(m=null);break e}c=y.next}}else if(o.tag===18){if(m=o.return,m===null)throw Error(s(341));m.lanes|=t,c=m.alternate,c!==null&&(c.lanes|=t),Xo(m,t,e),m=null}else m=o.child;if(m!==null)m.return=o;else for(m=o;m!==null;){if(m===e){m=null;break}if(o=m.sibling,o!==null){o.return=m.return,m=o;break}m=m.return}o=m}}function Hi(e,n,t,i){e=null;for(var o=n,c=!1;o!==null;){if(!c){if((o.flags&524288)!==0)c=!0;else if((o.flags&262144)!==0)break}if(o.tag===10){var m=o.alternate;if(m===null)throw Error(s(387));if(m=m.memoizedProps,m!==null){var y=o.type;st(o.pendingProps.value,m.value)||(e!==null?e.push(y):e=[y])}}else if(o===_e.current){if(m=o.alternate,m===null)throw Error(s(387));m.memoizedState.memoizedState!==o.memoizedState.memoizedState&&(e!==null?e.push(rl):e=[rl])}o=o.return}e!==null&&Uo(n,e,t,i),n.flags|=262144}function ql(e){for(e=e.firstContext;e!==null;){if(!st(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function mi(e){hi=e,aa=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function Xn(e){return hf(hi,e)}function Gl(e,n){return hi===null&&mi(e),hf(e,n)}function hf(e,n){var t=n._currentValue;if(n={context:n,memoizedValue:t,next:null},aa===null){if(e===null)throw Error(s(308));aa=n,e.dependencies={lanes:0,firstContext:n},e.flags|=524288}else aa=aa.next=n;return t}var z1=typeof AbortController<"u"?AbortController:function(){var e=[],n=this.signal={aborted:!1,addEventListener:function(t,i){e.push(i)}};this.abort=function(){n.aborted=!0,e.forEach(function(t){return t()})}},y1=a.unstable_scheduleCallback,v1=a.unstable_NormalPriority,Tn={$$typeof:q,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function Bo(){return{controller:new z1,data:new Map,refCount:0}}function Cr(e){e.refCount--,e.refCount===0&&y1(v1,function(){e.controller.abort()})}var Lr=null,Zo=0,qi=0,Gi=null;function S1(e,n){if(Lr===null){var t=Lr=[];Zo=0,qi=Hc(),Gi={status:"pending",value:void 0,then:function(i){t.push(i)}}}return Zo++,n.then(mf,mf),n}function mf(){if(--Zo===0&&Lr!==null){Gi!==null&&(Gi.status="fulfilled");var e=Lr;Lr=null,qi=0,Gi=null;for(var n=0;n<e.length;n++)(0,e[n])()}}function E1(e,n){var t=[],i={status:"pending",value:null,reason:null,then:function(o){t.push(o)}};return e.then(function(){i.status="fulfilled",i.value=n;for(var o=0;o<t.length;o++)(0,t[o])(n)},function(o){for(i.status="rejected",i.reason=o,o=0;o<t.length;o++)(0,t[o])(void 0)}),i}var bf=C.S;C.S=function(e,n){$p=zn(),typeof n=="object"&&n!==null&&typeof n.then=="function"&&S1(e,n),bf!==null&&bf(e,n)};var bi=x(null);function jo(){var e=bi.current;return e!==null?e:sn.pooledCache}function Yl(e,n){n===null?E(bi,bi.current):E(bi,n.pool)}function gf(){var e=jo();return e===null?null:{parent:Tn._currentValue,pool:e}}var Yi=Error(s(460)),Vo=Error(s(474)),Fl=Error(s(542)),Ql={then:function(){}};function zf(e){return e=e.status,e==="fulfilled"||e==="rejected"}function yf(e,n,t){switch(t=e[t],t===void 0?e.push(n):t!==n&&(n.then($t,$t),n=t),n.status){case"fulfilled":return n.value;case"rejected":throw e=n.reason,Sf(e),e;default:if(typeof n.status=="string")n.then($t,$t);else{if(e=sn,e!==null&&100<e.shellSuspendCounter)throw Error(s(482));e=n,e.status="pending",e.then(function(i){if(n.status==="pending"){var o=n;o.status="fulfilled",o.value=i}},function(i){if(n.status==="pending"){var o=n;o.status="rejected",o.reason=i}})}switch(n.status){case"fulfilled":return n.value;case"rejected":throw e=n.reason,Sf(e),e}throw zi=n,Yi}}function gi(e){try{var n=e._init;return n(e._payload)}catch(t){throw t!==null&&typeof t=="object"&&typeof t.then=="function"?(zi=t,Yi):t}}var zi=null;function vf(){if(zi===null)throw Error(s(459));var e=zi;return zi=null,e}function Sf(e){if(e===Yi||e===Fl)throw Error(s(483))}var Fi=null,Wr=0;function Kl(e){var n=Wr;return Wr+=1,Fi===null&&(Fi=[]),yf(Fi,e,n)}function Or(e,n){n=n.props.ref,e.ref=n!==void 0?n:null}function Jl(e,n){throw n.$$typeof===S?Error(s(525)):(e=Object.prototype.toString.call(n),Error(s(31,e==="[object Object]"?"object with keys {"+Object.keys(n).join(", ")+"}":e)))}function Ef(e){function n(R,A){if(e){var I=R.deletions;I===null?(R.deletions=[A],R.flags|=16):I.push(A)}}function t(R,A){if(!e)return null;for(;A!==null;)n(R,A),A=A.sibling;return null}function i(R){for(var A=new Map;R!==null;)R.key!==null?A.set(R.key,R):A.set(R.index,R),R=R.sibling;return A}function o(R,A){return R=na(R,A),R.index=0,R.sibling=null,R}function c(R,A,I){return R.index=I,e?(I=R.alternate,I!==null?(I=I.index,I<A?(R.flags|=67108866,A):I):(R.flags|=67108866,A)):(R.flags|=1048576,A)}function m(R){return e&&R.alternate===null&&(R.flags|=67108866),R}function y(R,A,I,H){return A===null||A.tag!==6?(A=Mo(I,R.mode,H),A.return=R,A):(A=o(A,I),A.return=R,A)}function w(R,A,I,H){var De=I.type;return De===O?B(R,A,I.props.children,H,I.key):A!==null&&(A.elementType===De||typeof De=="object"&&De!==null&&De.$$typeof===te&&gi(De)===A.type)?(A=o(A,I.props),Or(A,I),A.return=R,A):(A=Vl(I.type,I.key,I.props,null,R.mode,H),Or(A,I),A.return=R,A)}function M(R,A,I,H){return A===null||A.tag!==4||A.stateNode.containerInfo!==I.containerInfo||A.stateNode.implementation!==I.implementation?(A=Co(I,R.mode,H),A.return=R,A):(A=o(A,I.children||[]),A.return=R,A)}function B(R,A,I,H,De){return A===null||A.tag!==7?(A=fi(I,R.mode,H,De),A.return=R,A):(A=o(A,I),A.return=R,A)}function G(R,A,I){if(typeof A=="string"&&A!==""||typeof A=="number"||typeof A=="bigint")return A=Mo(""+A,R.mode,I),A.return=R,A;if(typeof A=="object"&&A!==null){switch(A.$$typeof){case v:return I=Vl(A.type,A.key,A.props,null,R.mode,I),Or(I,A),I.return=R,I;case L:return A=Co(A,R.mode,I),A.return=R,A;case te:return A=gi(A),G(R,A,I)}if($(A)||ne(A))return A=fi(A,R.mode,I,null),A.return=R,A;if(typeof A.then=="function")return G(R,Kl(A),I);if(A.$$typeof===q)return G(R,Gl(R,A),I);Jl(R,A)}return null}function W(R,A,I,H){var De=A!==null?A.key:null;if(typeof I=="string"&&I!==""||typeof I=="number"||typeof I=="bigint")return De!==null?null:y(R,A,""+I,H);if(typeof I=="object"&&I!==null){switch(I.$$typeof){case v:return I.key===De?w(R,A,I,H):null;case L:return I.key===De?M(R,A,I,H):null;case te:return I=gi(I),W(R,A,I,H)}if($(I)||ne(I))return De!==null?null:B(R,A,I,H,null);if(typeof I.then=="function")return W(R,A,Kl(I),H);if(I.$$typeof===q)return W(R,A,Gl(R,I),H);Jl(R,I)}return null}function N(R,A,I,H,De){if(typeof H=="string"&&H!==""||typeof H=="number"||typeof H=="bigint")return R=R.get(I)||null,y(A,R,""+H,De);if(typeof H=="object"&&H!==null){switch(H.$$typeof){case v:return R=R.get(H.key===null?I:H.key)||null,w(A,R,H,De);case L:return R=R.get(H.key===null?I:H.key)||null,M(A,R,H,De);case te:return H=gi(H),N(R,A,I,H,De)}if($(H)||ne(H))return R=R.get(I)||null,B(A,R,H,De,null);if(typeof H.then=="function")return N(R,A,I,Kl(H),De);if(H.$$typeof===q)return N(R,A,I,Gl(A,H),De);Jl(A,H)}return null}function me(R,A,I,H){for(var De=null,qe=null,ve=A,Le=A=0,Ze=null;ve!==null&&Le<I.length;Le++){ve.index>Le?(Ze=ve,ve=null):Ze=ve.sibling;var Ge=W(R,ve,I[Le],H);if(Ge===null){ve===null&&(ve=Ze);break}e&&ve&&Ge.alternate===null&&n(R,ve),A=c(Ge,A,Le),qe===null?De=Ge:qe.sibling=Ge,qe=Ge,ve=Ze}if(Le===I.length)return t(R,ve),je&&ta(R,Le),De;if(ve===null){for(;Le<I.length;Le++)ve=G(R,I[Le],H),ve!==null&&(A=c(ve,A,Le),qe===null?De=ve:qe.sibling=ve,qe=ve);return je&&ta(R,Le),De}for(ve=i(ve);Le<I.length;Le++)Ze=N(ve,R,Le,I[Le],H),Ze!==null&&(e&&Ze.alternate!==null&&ve.delete(Ze.key===null?Le:Ze.key),A=c(Ze,A,Le),qe===null?De=Ze:qe.sibling=Ze,qe=Ze);return e&&ve.forEach(function(Ga){return n(R,Ga)}),je&&ta(R,Le),De}function we(R,A,I,H){if(I==null)throw Error(s(151));for(var De=null,qe=null,ve=A,Le=A=0,Ze=null,Ge=I.next();ve!==null&&!Ge.done;Le++,Ge=I.next()){ve.index>Le?(Ze=ve,ve=null):Ze=ve.sibling;var Ga=W(R,ve,Ge.value,H);if(Ga===null){ve===null&&(ve=Ze);break}e&&ve&&Ga.alternate===null&&n(R,ve),A=c(Ga,A,Le),qe===null?De=Ga:qe.sibling=Ga,qe=Ga,ve=Ze}if(Ge.done)return t(R,ve),je&&ta(R,Le),De;if(ve===null){for(;!Ge.done;Le++,Ge=I.next())Ge=G(R,Ge.value,H),Ge!==null&&(A=c(Ge,A,Le),qe===null?De=Ge:qe.sibling=Ge,qe=Ge);return je&&ta(R,Le),De}for(ve=i(ve);!Ge.done;Le++,Ge=I.next())Ge=N(ve,R,Le,Ge.value,H),Ge!==null&&(e&&Ge.alternate!==null&&ve.delete(Ge.key===null?Le:Ge.key),A=c(Ge,A,Le),qe===null?De=Ge:qe.sibling=Ge,qe=Ge);return e&&ve.forEach(function(Cz){return n(R,Cz)}),je&&ta(R,Le),De}function ln(R,A,I,H){if(typeof I=="object"&&I!==null&&I.type===O&&I.key===null&&(I=I.props.children),typeof I=="object"&&I!==null){switch(I.$$typeof){case v:e:{for(var De=I.key;A!==null;){if(A.key===De){if(De=I.type,De===O){if(A.tag===7){t(R,A.sibling),H=o(A,I.props.children),H.return=R,R=H;break e}}else if(A.elementType===De||typeof De=="object"&&De!==null&&De.$$typeof===te&&gi(De)===A.type){t(R,A.sibling),H=o(A,I.props),Or(H,I),H.return=R,R=H;break e}t(R,A);break}else n(R,A);A=A.sibling}I.type===O?(H=fi(I.props.children,R.mode,H,I.key),H.return=R,R=H):(H=Vl(I.type,I.key,I.props,null,R.mode,H),Or(H,I),H.return=R,R=H)}return m(R);case L:e:{for(De=I.key;A!==null;){if(A.key===De)if(A.tag===4&&A.stateNode.containerInfo===I.containerInfo&&A.stateNode.implementation===I.implementation){t(R,A.sibling),H=o(A,I.children||[]),H.return=R,R=H;break e}else{t(R,A);break}else n(R,A);A=A.sibling}H=Co(I,R.mode,H),H.return=R,R=H}return m(R);case te:return I=gi(I),ln(R,A,I,H)}if($(I))return me(R,A,I,H);if(ne(I)){if(De=ne(I),typeof De!="function")throw Error(s(150));return I=De.call(I),we(R,A,I,H)}if(typeof I.then=="function")return ln(R,A,Kl(I),H);if(I.$$typeof===q)return ln(R,A,Gl(R,I),H);Jl(R,I)}return typeof I=="string"&&I!==""||typeof I=="number"||typeof I=="bigint"?(I=""+I,A!==null&&A.tag===6?(t(R,A.sibling),H=o(A,I),H.return=R,R=H):(t(R,A),H=Mo(I,R.mode,H),H.return=R,R=H),m(R)):t(R,A)}return function(R,A,I,H){try{Wr=0;var De=ln(R,A,I,H);return Fi=null,De}catch(ve){if(ve===Yi||ve===Fl)throw ve;var qe=ot(29,ve,null,R.mode);return qe.lanes=H,qe.return=R,qe}}}var yi=Ef(!0),Df=Ef(!1),_a=!1;function Ho(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function qo(e,n){e=e.updateQueue,n.updateQueue===e&&(n.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function Ia(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function Ma(e,n,t){var i=e.updateQueue;if(i===null)return null;if(i=i.shared,(Ye&2)!==0){var o=i.pending;return o===null?n.next=n:(n.next=o.next,o.next=n),i.pending=n,n=jl(e),lf(e,null,t),n}return Zl(e,i,n,t),jl(e)}function Pr(e,n,t){if(n=n.updateQueue,n!==null&&(n=n.shared,(t&4194048)!==0)){var i=n.lanes;i&=e.pendingLanes,t|=i,n.lanes=t,_(e,t)}}function Go(e,n){var t=e.updateQueue,i=e.alternate;if(i!==null&&(i=i.updateQueue,t===i)){var o=null,c=null;if(t=t.firstBaseUpdate,t!==null){do{var m={lane:t.lane,tag:t.tag,payload:t.payload,callback:null,next:null};c===null?o=c=m:c=c.next=m,t=t.next}while(t!==null);c===null?o=c=n:c=c.next=n}else o=c=n;t={baseState:i.baseState,firstBaseUpdate:o,lastBaseUpdate:c,shared:i.shared,callbacks:i.callbacks},e.updateQueue=t;return}e=t.lastBaseUpdate,e===null?t.firstBaseUpdate=n:e.next=n,t.lastBaseUpdate=n}var Yo=!1;function Nr(){if(Yo){var e=Gi;if(e!==null)throw e}}function Xr(e,n,t,i){Yo=!1;var o=e.updateQueue;_a=!1;var c=o.firstBaseUpdate,m=o.lastBaseUpdate,y=o.shared.pending;if(y!==null){o.shared.pending=null;var w=y,M=w.next;w.next=null,m===null?c=M:m.next=M,m=w;var B=e.alternate;B!==null&&(B=B.updateQueue,y=B.lastBaseUpdate,y!==m&&(y===null?B.firstBaseUpdate=M:y.next=M,B.lastBaseUpdate=w))}if(c!==null){var G=o.baseState;m=0,B=M=w=null,y=c;do{var W=y.lane&-536870913,N=W!==y.lane;if(N?(Be&W)===W:(i&W)===W){W!==0&&W===qi&&(Yo=!0),B!==null&&(B=B.next={lane:0,tag:y.tag,payload:y.payload,callback:null,next:null});e:{var me=e,we=y;W=n;var ln=t;switch(we.tag){case 1:if(me=we.payload,typeof me=="function"){G=me.call(ln,G,W);break e}G=me;break e;case 3:me.flags=me.flags&-65537|128;case 0:if(me=we.payload,W=typeof me=="function"?me.call(ln,G,W):me,W==null)break e;G=z({},G,W);break e;case 2:_a=!0}}W=y.callback,W!==null&&(e.flags|=64,N&&(e.flags|=8192),N=o.callbacks,N===null?o.callbacks=[W]:N.push(W))}else N={lane:W,tag:y.tag,payload:y.payload,callback:y.callback,next:null},B===null?(M=B=N,w=G):B=B.next=N,m|=W;if(y=y.next,y===null){if(y=o.shared.pending,y===null)break;N=y,y=N.next,N.next=null,o.lastBaseUpdate=N,o.shared.pending=null}}while(!0);B===null&&(w=G),o.baseState=w,o.firstBaseUpdate=M,o.lastBaseUpdate=B,c===null&&(o.shared.lanes=0),Pa|=m,e.lanes=m,e.memoizedState=G}}function wf(e,n){if(typeof e!="function")throw Error(s(191,e));e.call(n)}function xf(e,n){var t=e.callbacks;if(t!==null)for(e.callbacks=null,e=0;e<t.length;e++)wf(t[e],n)}var Qi=x(null),$l=x(0);function Tf(e,n){e=pa,E($l,e),E(Qi,n),pa=e|n.baseLanes}function Fo(){E($l,pa),E(Qi,Qi.current)}function Qo(){pa=$l.current,U(Qi),U($l)}var ct=x(null),At=null;function Ca(e){var n=e.alternate;E(wn,wn.current&1),E(ct,e),At===null&&(n===null||Qi.current!==null||n.memoizedState!==null)&&(At=e)}function Ko(e){E(wn,wn.current),E(ct,e),At===null&&(At=e)}function Af(e){e.tag===22?(E(wn,wn.current),E(ct,e),At===null&&(At=e)):La()}function La(){E(wn,wn.current),E(ct,ct.current)}function ut(e){U(ct),At===e&&(At=null),U(wn)}var wn=x(0);function es(e){for(var n=e;n!==null;){if(n.tag===13){var t=n.memoizedState;if(t!==null&&(t=t.dehydrated,t===null||au(t)||iu(t)))return n}else if(n.tag===19&&(n.memoizedProps.revealOrder==="forwards"||n.memoizedProps.revealOrder==="backwards"||n.memoizedProps.revealOrder==="unstable_legacy-backwards"||n.memoizedProps.revealOrder==="together")){if((n.flags&128)!==0)return n}else if(n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return null;n=n.return}n.sibling.return=n.return,n=n.sibling}return null}var ra=0,Ce=null,an=null,An=null,ns=!1,Ki=!1,vi=!1,ts=0,Ur=0,Ji=null,D1=0;function Sn(){throw Error(s(321))}function Jo(e,n){if(n===null)return!1;for(var t=0;t<n.length&&t<e.length;t++)if(!st(e[t],n[t]))return!1;return!0}function $o(e,n,t,i,o,c){return ra=c,Ce=n,n.memoizedState=null,n.updateQueue=null,n.lanes=0,C.H=e===null||e.memoizedState===null?up:hc,vi=!1,c=t(i,o),vi=!1,Ki&&(c=Rf(n,t,i,o)),kf(e),c}function kf(e){C.H=jr;var n=an!==null&&an.next!==null;if(ra=0,An=an=Ce=null,ns=!1,Ur=0,Ji=null,n)throw Error(s(300));e===null||kn||(e=e.dependencies,e!==null&&ql(e)&&(kn=!0))}function Rf(e,n,t,i){Ce=e;var o=0;do{if(Ki&&(Ji=null),Ur=0,Ki=!1,25<=o)throw Error(s(301));if(o+=1,An=an=null,e.updateQueue!=null){var c=e.updateQueue;c.lastEffect=null,c.events=null,c.stores=null,c.memoCache!=null&&(c.memoCache.index=0)}C.H=dp,c=n(t,i)}while(Ki);return c}function w1(){var e=C.H,n=e.useState()[0];return n=typeof n.then=="function"?Br(n):n,e=e.useState()[0],(an!==null?an.memoizedState:null)!==e&&(Ce.flags|=1024),n}function ec(){var e=ts!==0;return ts=0,e}function nc(e,n,t){n.updateQueue=e.updateQueue,n.flags&=-2053,e.lanes&=~t}function tc(e){if(ns){for(e=e.memoizedState;e!==null;){var n=e.queue;n!==null&&(n.pending=null),e=e.next}ns=!1}ra=0,An=an=Ce=null,Ki=!1,Ur=ts=0,Ji=null}function Hn(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return An===null?Ce.memoizedState=An=e:An=An.next=e,An}function xn(){if(an===null){var e=Ce.alternate;e=e!==null?e.memoizedState:null}else e=an.next;var n=An===null?Ce.memoizedState:An.next;if(n!==null)An=n,an=e;else{if(e===null)throw Ce.alternate===null?Error(s(467)):Error(s(310));an=e,e={memoizedState:an.memoizedState,baseState:an.baseState,baseQueue:an.baseQueue,queue:an.queue,next:null},An===null?Ce.memoizedState=An=e:An=An.next=e}return An}function as(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function Br(e){var n=Ur;return Ur+=1,Ji===null&&(Ji=[]),e=yf(Ji,e,n),n=Ce,(An===null?n.memoizedState:An.next)===null&&(n=n.alternate,C.H=n===null||n.memoizedState===null?up:hc),e}function is(e){if(e!==null&&typeof e=="object"){if(typeof e.then=="function")return Br(e);if(e.$$typeof===q)return Xn(e)}throw Error(s(438,String(e)))}function ac(e){var n=null,t=Ce.updateQueue;if(t!==null&&(n=t.memoCache),n==null){var i=Ce.alternate;i!==null&&(i=i.updateQueue,i!==null&&(i=i.memoCache,i!=null&&(n={data:i.data.map(function(o){return o.slice()}),index:0})))}if(n==null&&(n={data:[],index:0}),t===null&&(t=as(),Ce.updateQueue=t),t.memoCache=n,t=n.data[n.index],t===void 0)for(t=n.data[n.index]=Array(e),i=0;i<e;i++)t[i]=ue;return n.index++,t}function la(e,n){return typeof n=="function"?n(e):n}function rs(e){var n=xn();return ic(n,an,e)}function ic(e,n,t){var i=e.queue;if(i===null)throw Error(s(311));i.lastRenderedReducer=t;var o=e.baseQueue,c=i.pending;if(c!==null){if(o!==null){var m=o.next;o.next=c.next,c.next=m}n.baseQueue=o=c,i.pending=null}if(c=e.baseState,o===null)e.memoizedState=c;else{n=o.next;var y=m=null,w=null,M=n,B=!1;do{var G=M.lane&-536870913;if(G!==M.lane?(Be&G)===G:(ra&G)===G){var W=M.revertLane;if(W===0)w!==null&&(w=w.next={lane:0,revertLane:0,gesture:null,action:M.action,hasEagerState:M.hasEagerState,eagerState:M.eagerState,next:null}),G===qi&&(B=!0);else if((ra&W)===W){M=M.next,W===qi&&(B=!0);continue}else G={lane:0,revertLane:M.revertLane,gesture:null,action:M.action,hasEagerState:M.hasEagerState,eagerState:M.eagerState,next:null},w===null?(y=w=G,m=c):w=w.next=G,Ce.lanes|=W,Pa|=W;G=M.action,vi&&t(c,G),c=M.hasEagerState?M.eagerState:t(c,G)}else W={lane:G,revertLane:M.revertLane,gesture:M.gesture,action:M.action,hasEagerState:M.hasEagerState,eagerState:M.eagerState,next:null},w===null?(y=w=W,m=c):w=w.next=W,Ce.lanes|=G,Pa|=G;M=M.next}while(M!==null&&M!==n);if(w===null?m=c:w.next=y,!st(c,e.memoizedState)&&(kn=!0,B&&(t=Gi,t!==null)))throw t;e.memoizedState=c,e.baseState=m,e.baseQueue=w,i.lastRenderedState=c}return o===null&&(i.lanes=0),[e.memoizedState,i.dispatch]}function rc(e){var n=xn(),t=n.queue;if(t===null)throw Error(s(311));t.lastRenderedReducer=e;var i=t.dispatch,o=t.pending,c=n.memoizedState;if(o!==null){t.pending=null;var m=o=o.next;do c=e(c,m.action),m=m.next;while(m!==o);st(c,n.memoizedState)||(kn=!0),n.memoizedState=c,n.baseQueue===null&&(n.baseState=c),t.lastRenderedState=c}return[c,i]}function _f(e,n,t){var i=Ce,o=xn(),c=je;if(c){if(t===void 0)throw Error(s(407));t=t()}else t=n();var m=!st((an||o).memoizedState,t);if(m&&(o.memoizedState=t,kn=!0),o=o.queue,oc(Cf.bind(null,i,o,e),[e]),o.getSnapshot!==n||m||An!==null&&An.memoizedState.tag&1){if(i.flags|=2048,$i(9,{destroy:void 0},Mf.bind(null,i,o,t,n),null),sn===null)throw Error(s(349));c||(ra&127)!==0||If(i,n,t)}return t}function If(e,n,t){e.flags|=16384,e={getSnapshot:n,value:t},n=Ce.updateQueue,n===null?(n=as(),Ce.updateQueue=n,n.stores=[e]):(t=n.stores,t===null?n.stores=[e]:t.push(e))}function Mf(e,n,t,i){n.value=t,n.getSnapshot=i,Lf(n)&&Wf(e)}function Cf(e,n,t){return t(function(){Lf(n)&&Wf(e)})}function Lf(e){var n=e.getSnapshot;e=e.value;try{var t=n();return!st(e,t)}catch{return!0}}function Wf(e){var n=di(e,2);n!==null&&nt(n,e,2)}function lc(e){var n=Hn();if(typeof e=="function"){var t=e;if(e=t(),vi){On(!0);try{t()}finally{On(!1)}}}return n.memoizedState=n.baseState=e,n.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:la,lastRenderedState:e},n}function Of(e,n,t,i){return e.baseState=t,ic(e,an,typeof i=="function"?i:la)}function x1(e,n,t,i,o){if(os(e))throw Error(s(485));if(e=n.action,e!==null){var c={payload:o,action:e,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(m){c.listeners.push(m)}};C.T!==null?t(!0):c.isTransition=!1,i(c),t=n.pending,t===null?(c.next=n.pending=c,Pf(n,c)):(c.next=t.next,n.pending=t.next=c)}}function Pf(e,n){var t=n.action,i=n.payload,o=e.state;if(n.isTransition){var c=C.T,m={};C.T=m;try{var y=t(o,i),w=C.S;w!==null&&w(m,y),Nf(e,n,y)}catch(M){sc(e,n,M)}finally{c!==null&&m.types!==null&&(c.types=m.types),C.T=c}}else try{c=t(o,i),Nf(e,n,c)}catch(M){sc(e,n,M)}}function Nf(e,n,t){t!==null&&typeof t=="object"&&typeof t.then=="function"?t.then(function(i){Xf(e,n,i)},function(i){return sc(e,n,i)}):Xf(e,n,t)}function Xf(e,n,t){n.status="fulfilled",n.value=t,Uf(n),e.state=t,n=e.pending,n!==null&&(t=n.next,t===n?e.pending=null:(t=t.next,n.next=t,Pf(e,t)))}function sc(e,n,t){var i=e.pending;if(e.pending=null,i!==null){i=i.next;do n.status="rejected",n.reason=t,Uf(n),n=n.next;while(n!==i)}e.action=null}function Uf(e){e=e.listeners;for(var n=0;n<e.length;n++)(0,e[n])()}function Bf(e,n){return n}function Zf(e,n){if(je){var t=sn.formState;if(t!==null){e:{var i=Ce;if(je){if(pn){n:{for(var o=pn,c=Tt;o.nodeType!==8;){if(!c){o=null;break n}if(o=kt(o.nextSibling),o===null){o=null;break n}}c=o.data,o=c==="F!"||c==="F"?o:null}if(o){pn=kt(o.nextSibling),i=o.data==="F!";break e}}ka(i)}i=!1}i&&(n=t[0])}}return t=Hn(),t.memoizedState=t.baseState=n,i={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Bf,lastRenderedState:n},t.queue=i,t=sp.bind(null,Ce,i),i.dispatch=t,i=lc(!1),c=pc.bind(null,Ce,!1,i.queue),i=Hn(),o={state:n,dispatch:null,action:e,pending:null},i.queue=o,t=x1.bind(null,Ce,o,c,t),o.dispatch=t,i.memoizedState=e,[n,t,!1]}function jf(e){var n=xn();return Vf(n,an,e)}function Vf(e,n,t){if(n=ic(e,n,Bf)[0],e=rs(la)[0],typeof n=="object"&&n!==null&&typeof n.then=="function")try{var i=Br(n)}catch(m){throw m===Yi?Fl:m}else i=n;n=xn();var o=n.queue,c=o.dispatch;return t!==n.memoizedState&&(Ce.flags|=2048,$i(9,{destroy:void 0},T1.bind(null,o,t),null)),[i,c,e]}function T1(e,n){e.action=n}function Hf(e){var n=xn(),t=an;if(t!==null)return Vf(n,t,e);xn(),n=n.memoizedState,t=xn();var i=t.queue.dispatch;return t.memoizedState=e,[n,i,!1]}function $i(e,n,t,i){return e={tag:e,create:t,deps:i,inst:n,next:null},n=Ce.updateQueue,n===null&&(n=as(),Ce.updateQueue=n),t=n.lastEffect,t===null?n.lastEffect=e.next=e:(i=t.next,t.next=e,e.next=i,n.lastEffect=e),e}function qf(){return xn().memoizedState}function ls(e,n,t,i){var o=Hn();Ce.flags|=e,o.memoizedState=$i(1|n,{destroy:void 0},t,i===void 0?null:i)}function ss(e,n,t,i){var o=xn();i=i===void 0?null:i;var c=o.memoizedState.inst;an!==null&&i!==null&&Jo(i,an.memoizedState.deps)?o.memoizedState=$i(n,c,t,i):(Ce.flags|=e,o.memoizedState=$i(1|n,c,t,i))}function Gf(e,n){ls(8390656,8,e,n)}function oc(e,n){ss(2048,8,e,n)}function A1(e){Ce.flags|=4;var n=Ce.updateQueue;if(n===null)n=as(),Ce.updateQueue=n,n.events=[e];else{var t=n.events;t===null?n.events=[e]:t.push(e)}}function Yf(e){var n=xn().memoizedState;return A1({ref:n,nextImpl:e}),function(){if((Ye&2)!==0)throw Error(s(440));return n.impl.apply(void 0,arguments)}}function Ff(e,n){return ss(4,2,e,n)}function Qf(e,n){return ss(4,4,e,n)}function Kf(e,n){if(typeof n=="function"){e=e();var t=n(e);return function(){typeof t=="function"?t():n(null)}}if(n!=null)return e=e(),n.current=e,function(){n.current=null}}function Jf(e,n,t){t=t!=null?t.concat([e]):null,ss(4,4,Kf.bind(null,n,e),t)}function cc(){}function $f(e,n){var t=xn();n=n===void 0?null:n;var i=t.memoizedState;return n!==null&&Jo(n,i[1])?i[0]:(t.memoizedState=[e,n],e)}function ep(e,n){var t=xn();n=n===void 0?null:n;var i=t.memoizedState;if(n!==null&&Jo(n,i[1]))return i[0];if(i=e(),vi){On(!0);try{e()}finally{On(!1)}}return t.memoizedState=[i,n],i}function uc(e,n,t){return t===void 0||(ra&1073741824)!==0&&(Be&261930)===0?e.memoizedState=n:(e.memoizedState=t,e=nh(),Ce.lanes|=e,Pa|=e,t)}function np(e,n,t,i){return st(t,n)?t:Qi.current!==null?(e=uc(e,t,i),st(e,n)||(kn=!0),e):(ra&42)===0||(ra&1073741824)!==0&&(Be&261930)===0?(kn=!0,e.memoizedState=t):(e=nh(),Ce.lanes|=e,Pa|=e,n)}function tp(e,n,t,i,o){var c=K.p;K.p=c!==0&&8>c?c:8;var m=C.T,y={};C.T=y,pc(e,!1,n,t);try{var w=o(),M=C.S;if(M!==null&&M(y,w),w!==null&&typeof w=="object"&&typeof w.then=="function"){var B=E1(w,i);Zr(e,n,B,pt(e))}else Zr(e,n,i,pt(e))}catch(G){Zr(e,n,{then:function(){},status:"rejected",reason:G},pt())}finally{K.p=c,m!==null&&y.types!==null&&(m.types=y.types),C.T=m}}function k1(){}function dc(e,n,t,i){if(e.tag!==5)throw Error(s(476));var o=ap(e).queue;tp(e,o,n,le,t===null?k1:function(){return ip(e),t(i)})}function ap(e){var n=e.memoizedState;if(n!==null)return n;n={memoizedState:le,baseState:le,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:la,lastRenderedState:le},next:null};var t={};return n.next={memoizedState:t,baseState:t,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:la,lastRenderedState:t},next:null},e.memoizedState=n,e=e.alternate,e!==null&&(e.memoizedState=n),n}function ip(e){var n=ap(e);n.next===null&&(n=e.alternate.memoizedState),Zr(e,n.next.queue,{},pt())}function fc(){return Xn(rl)}function rp(){return xn().memoizedState}function lp(){return xn().memoizedState}function R1(e){for(var n=e.return;n!==null;){switch(n.tag){case 24:case 3:var t=pt();e=Ia(t);var i=Ma(n,e,t);i!==null&&(nt(i,n,t),Pr(i,n,t)),n={cache:Bo()},e.payload=n;return}n=n.return}}function _1(e,n,t){var i=pt();t={lane:i,revertLane:0,gesture:null,action:t,hasEagerState:!1,eagerState:null,next:null},os(e)?op(n,t):(t=_o(e,n,t,i),t!==null&&(nt(t,e,i),cp(t,n,i)))}function sp(e,n,t){var i=pt();Zr(e,n,t,i)}function Zr(e,n,t,i){var o={lane:i,revertLane:0,gesture:null,action:t,hasEagerState:!1,eagerState:null,next:null};if(os(e))op(n,o);else{var c=e.alternate;if(e.lanes===0&&(c===null||c.lanes===0)&&(c=n.lastRenderedReducer,c!==null))try{var m=n.lastRenderedState,y=c(m,t);if(o.hasEagerState=!0,o.eagerState=y,st(y,m))return Zl(e,n,o,0),sn===null&&Bl(),!1}catch{}if(t=_o(e,n,o,i),t!==null)return nt(t,e,i),cp(t,n,i),!0}return!1}function pc(e,n,t,i){if(i={lane:2,revertLane:Hc(),gesture:null,action:i,hasEagerState:!1,eagerState:null,next:null},os(e)){if(n)throw Error(s(479))}else n=_o(e,t,i,2),n!==null&&nt(n,e,2)}function os(e){var n=e.alternate;return e===Ce||n!==null&&n===Ce}function op(e,n){Ki=ns=!0;var t=e.pending;t===null?n.next=n:(n.next=t.next,t.next=n),e.pending=n}function cp(e,n,t){if((t&4194048)!==0){var i=n.lanes;i&=e.pendingLanes,t|=i,n.lanes=t,_(e,t)}}var jr={readContext:Xn,use:is,useCallback:Sn,useContext:Sn,useEffect:Sn,useImperativeHandle:Sn,useLayoutEffect:Sn,useInsertionEffect:Sn,useMemo:Sn,useReducer:Sn,useRef:Sn,useState:Sn,useDebugValue:Sn,useDeferredValue:Sn,useTransition:Sn,useSyncExternalStore:Sn,useId:Sn,useHostTransitionStatus:Sn,useFormState:Sn,useActionState:Sn,useOptimistic:Sn,useMemoCache:Sn,useCacheRefresh:Sn};jr.useEffectEvent=Sn;var up={readContext:Xn,use:is,useCallback:function(e,n){return Hn().memoizedState=[e,n===void 0?null:n],e},useContext:Xn,useEffect:Gf,useImperativeHandle:function(e,n,t){t=t!=null?t.concat([e]):null,ls(4194308,4,Kf.bind(null,n,e),t)},useLayoutEffect:function(e,n){return ls(4194308,4,e,n)},useInsertionEffect:function(e,n){ls(4,2,e,n)},useMemo:function(e,n){var t=Hn();n=n===void 0?null:n;var i=e();if(vi){On(!0);try{e()}finally{On(!1)}}return t.memoizedState=[i,n],i},useReducer:function(e,n,t){var i=Hn();if(t!==void 0){var o=t(n);if(vi){On(!0);try{t(n)}finally{On(!1)}}}else o=n;return i.memoizedState=i.baseState=o,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:o},i.queue=e,e=e.dispatch=_1.bind(null,Ce,e),[i.memoizedState,e]},useRef:function(e){var n=Hn();return e={current:e},n.memoizedState=e},useState:function(e){e=lc(e);var n=e.queue,t=sp.bind(null,Ce,n);return n.dispatch=t,[e.memoizedState,t]},useDebugValue:cc,useDeferredValue:function(e,n){var t=Hn();return uc(t,e,n)},useTransition:function(){var e=lc(!1);return e=tp.bind(null,Ce,e.queue,!0,!1),Hn().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,n,t){var i=Ce,o=Hn();if(je){if(t===void 0)throw Error(s(407));t=t()}else{if(t=n(),sn===null)throw Error(s(349));(Be&127)!==0||If(i,n,t)}o.memoizedState=t;var c={value:t,getSnapshot:n};return o.queue=c,Gf(Cf.bind(null,i,c,e),[e]),i.flags|=2048,$i(9,{destroy:void 0},Mf.bind(null,i,c,t,n),null),t},useId:function(){var e=Hn(),n=sn.identifierPrefix;if(je){var t=jt,i=Zt;t=(i&~(1<<32-Ke(i)-1)).toString(32)+t,n="_"+n+"R_"+t,t=ts++,0<t&&(n+="H"+t.toString(32)),n+="_"}else t=D1++,n="_"+n+"r_"+t.toString(32)+"_";return e.memoizedState=n},useHostTransitionStatus:fc,useFormState:Zf,useActionState:Zf,useOptimistic:function(e){var n=Hn();n.memoizedState=n.baseState=e;var t={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return n.queue=t,n=pc.bind(null,Ce,!0,t),t.dispatch=n,[e,n]},useMemoCache:ac,useCacheRefresh:function(){return Hn().memoizedState=R1.bind(null,Ce)},useEffectEvent:function(e){var n=Hn(),t={impl:e};return n.memoizedState=t,function(){if((Ye&2)!==0)throw Error(s(440));return t.impl.apply(void 0,arguments)}}},hc={readContext:Xn,use:is,useCallback:$f,useContext:Xn,useEffect:oc,useImperativeHandle:Jf,useInsertionEffect:Ff,useLayoutEffect:Qf,useMemo:ep,useReducer:rs,useRef:qf,useState:function(){return rs(la)},useDebugValue:cc,useDeferredValue:function(e,n){var t=xn();return np(t,an.memoizedState,e,n)},useTransition:function(){var e=rs(la)[0],n=xn().memoizedState;return[typeof e=="boolean"?e:Br(e),n]},useSyncExternalStore:_f,useId:rp,useHostTransitionStatus:fc,useFormState:jf,useActionState:jf,useOptimistic:function(e,n){var t=xn();return Of(t,an,e,n)},useMemoCache:ac,useCacheRefresh:lp};hc.useEffectEvent=Yf;var dp={readContext:Xn,use:is,useCallback:$f,useContext:Xn,useEffect:oc,useImperativeHandle:Jf,useInsertionEffect:Ff,useLayoutEffect:Qf,useMemo:ep,useReducer:rc,useRef:qf,useState:function(){return rc(la)},useDebugValue:cc,useDeferredValue:function(e,n){var t=xn();return an===null?uc(t,e,n):np(t,an.memoizedState,e,n)},useTransition:function(){var e=rc(la)[0],n=xn().memoizedState;return[typeof e=="boolean"?e:Br(e),n]},useSyncExternalStore:_f,useId:rp,useHostTransitionStatus:fc,useFormState:Hf,useActionState:Hf,useOptimistic:function(e,n){var t=xn();return an!==null?Of(t,an,e,n):(t.baseState=e,[e,t.queue.dispatch])},useMemoCache:ac,useCacheRefresh:lp};dp.useEffectEvent=Yf;function mc(e,n,t,i){n=e.memoizedState,t=t(i,n),t=t==null?n:z({},n,t),e.memoizedState=t,e.lanes===0&&(e.updateQueue.baseState=t)}var bc={enqueueSetState:function(e,n,t){e=e._reactInternals;var i=pt(),o=Ia(i);o.payload=n,t!=null&&(o.callback=t),n=Ma(e,o,i),n!==null&&(nt(n,e,i),Pr(n,e,i))},enqueueReplaceState:function(e,n,t){e=e._reactInternals;var i=pt(),o=Ia(i);o.tag=1,o.payload=n,t!=null&&(o.callback=t),n=Ma(e,o,i),n!==null&&(nt(n,e,i),Pr(n,e,i))},enqueueForceUpdate:function(e,n){e=e._reactInternals;var t=pt(),i=Ia(t);i.tag=2,n!=null&&(i.callback=n),n=Ma(e,i,t),n!==null&&(nt(n,e,t),Pr(n,e,t))}};function fp(e,n,t,i,o,c,m){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(i,c,m):n.prototype&&n.prototype.isPureReactComponent?!Rr(t,i)||!Rr(o,c):!0}function pp(e,n,t,i){e=n.state,typeof n.componentWillReceiveProps=="function"&&n.componentWillReceiveProps(t,i),typeof n.UNSAFE_componentWillReceiveProps=="function"&&n.UNSAFE_componentWillReceiveProps(t,i),n.state!==e&&bc.enqueueReplaceState(n,n.state,null)}function Si(e,n){var t=n;if("ref"in n){t={};for(var i in n)i!=="ref"&&(t[i]=n[i])}if(e=e.defaultProps){t===n&&(t=z({},t));for(var o in e)t[o]===void 0&&(t[o]=e[o])}return t}function hp(e){Ul(e)}function mp(e){console.error(e)}function bp(e){Ul(e)}function cs(e,n){try{var t=e.onUncaughtError;t(n.value,{componentStack:n.stack})}catch(i){setTimeout(function(){throw i})}}function gp(e,n,t){try{var i=e.onCaughtError;i(t.value,{componentStack:t.stack,errorBoundary:n.tag===1?n.stateNode:null})}catch(o){setTimeout(function(){throw o})}}function gc(e,n,t){return t=Ia(t),t.tag=3,t.payload={element:null},t.callback=function(){cs(e,n)},t}function zp(e){return e=Ia(e),e.tag=3,e}function yp(e,n,t,i){var o=t.type.getDerivedStateFromError;if(typeof o=="function"){var c=i.value;e.payload=function(){return o(c)},e.callback=function(){gp(n,t,i)}}var m=t.stateNode;m!==null&&typeof m.componentDidCatch=="function"&&(e.callback=function(){gp(n,t,i),typeof o!="function"&&(Na===null?Na=new Set([this]):Na.add(this));var y=i.stack;this.componentDidCatch(i.value,{componentStack:y!==null?y:""})})}function I1(e,n,t,i,o){if(t.flags|=32768,i!==null&&typeof i=="object"&&typeof i.then=="function"){if(n=t.alternate,n!==null&&Hi(n,t,o,!0),t=ct.current,t!==null){switch(t.tag){case 31:case 13:return At===null?Ss():t.alternate===null&&En===0&&(En=3),t.flags&=-257,t.flags|=65536,t.lanes=o,i===Ql?t.flags|=16384:(n=t.updateQueue,n===null?t.updateQueue=new Set([i]):n.add(i),Zc(e,i,o)),!1;case 22:return t.flags|=65536,i===Ql?t.flags|=16384:(n=t.updateQueue,n===null?(n={transitions:null,markerInstances:null,retryQueue:new Set([i])},t.updateQueue=n):(t=n.retryQueue,t===null?n.retryQueue=new Set([i]):t.add(i)),Zc(e,i,o)),!1}throw Error(s(435,t.tag))}return Zc(e,i,o),Ss(),!1}if(je)return n=ct.current,n!==null?((n.flags&65536)===0&&(n.flags|=256),n.flags|=65536,n.lanes=o,i!==Oo&&(e=Error(s(422),{cause:i}),Mr(Dt(e,t)))):(i!==Oo&&(n=Error(s(423),{cause:i}),Mr(Dt(n,t))),e=e.current.alternate,e.flags|=65536,o&=-o,e.lanes|=o,i=Dt(i,t),o=gc(e.stateNode,i,o),Go(e,o),En!==4&&(En=2)),!1;var c=Error(s(520),{cause:i});if(c=Dt(c,t),Kr===null?Kr=[c]:Kr.push(c),En!==4&&(En=2),n===null)return!0;i=Dt(i,t),t=n;do{switch(t.tag){case 3:return t.flags|=65536,e=o&-o,t.lanes|=e,e=gc(t.stateNode,i,e),Go(t,e),!1;case 1:if(n=t.type,c=t.stateNode,(t.flags&128)===0&&(typeof n.getDerivedStateFromError=="function"||c!==null&&typeof c.componentDidCatch=="function"&&(Na===null||!Na.has(c))))return t.flags|=65536,o&=-o,t.lanes|=o,o=zp(o),yp(o,e,t,i),Go(t,o),!1}t=t.return}while(t!==null);return!1}var zc=Error(s(461)),kn=!1;function Un(e,n,t,i){n.child=e===null?Df(n,null,t,i):yi(n,e.child,t,i)}function vp(e,n,t,i,o){t=t.render;var c=n.ref;if("ref"in i){var m={};for(var y in i)y!=="ref"&&(m[y]=i[y])}else m=i;return mi(n),i=$o(e,n,t,m,c,o),y=ec(),e!==null&&!kn?(nc(e,n,o),sa(e,n,o)):(je&&y&&Lo(n),n.flags|=1,Un(e,n,i,o),n.child)}function Sp(e,n,t,i,o){if(e===null){var c=t.type;return typeof c=="function"&&!Io(c)&&c.defaultProps===void 0&&t.compare===null?(n.tag=15,n.type=c,Ep(e,n,c,i,o)):(e=Vl(t.type,null,i,n,n.mode,o),e.ref=n.ref,e.return=n,n.child=e)}if(c=e.child,!Tc(e,o)){var m=c.memoizedProps;if(t=t.compare,t=t!==null?t:Rr,t(m,i)&&e.ref===n.ref)return sa(e,n,o)}return n.flags|=1,e=na(c,i),e.ref=n.ref,e.return=n,n.child=e}function Ep(e,n,t,i,o){if(e!==null){var c=e.memoizedProps;if(Rr(c,i)&&e.ref===n.ref)if(kn=!1,n.pendingProps=i=c,Tc(e,o))(e.flags&131072)!==0&&(kn=!0);else return n.lanes=e.lanes,sa(e,n,o)}return yc(e,n,t,i,o)}function Dp(e,n,t,i){var o=i.children,c=e!==null?e.memoizedState:null;if(e===null&&n.stateNode===null&&(n.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),i.mode==="hidden"){if((n.flags&128)!==0){if(c=c!==null?c.baseLanes|t:t,e!==null){for(i=n.child=e.child,o=0;i!==null;)o=o|i.lanes|i.childLanes,i=i.sibling;i=o&~c}else i=0,n.child=null;return wp(e,n,c,t,i)}if((t&536870912)!==0)n.memoizedState={baseLanes:0,cachePool:null},e!==null&&Yl(n,c!==null?c.cachePool:null),c!==null?Tf(n,c):Fo(),Af(n);else return i=n.lanes=536870912,wp(e,n,c!==null?c.baseLanes|t:t,t,i)}else c!==null?(Yl(n,c.cachePool),Tf(n,c),La(),n.memoizedState=null):(e!==null&&Yl(n,null),Fo(),La());return Un(e,n,o,t),n.child}function Vr(e,n){return e!==null&&e.tag===22||n.stateNode!==null||(n.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),n.sibling}function wp(e,n,t,i,o){var c=jo();return c=c===null?null:{parent:Tn._currentValue,pool:c},n.memoizedState={baseLanes:t,cachePool:c},e!==null&&Yl(n,null),Fo(),Af(n),e!==null&&Hi(e,n,i,!0),n.childLanes=o,null}function us(e,n){return n=fs({mode:n.mode,children:n.children},e.mode),n.ref=e.ref,e.child=n,n.return=e,n}function xp(e,n,t){return yi(n,e.child,null,t),e=us(n,n.pendingProps),e.flags|=2,ut(n),n.memoizedState=null,e}function M1(e,n,t){var i=n.pendingProps,o=(n.flags&128)!==0;if(n.flags&=-129,e===null){if(je){if(i.mode==="hidden")return e=us(n,i),n.lanes=536870912,Vr(null,e);if(Ko(n),(e=pn)?(e=Ph(e,Tt),e=e!==null&&e.data==="&"?e:null,e!==null&&(n.memoizedState={dehydrated:e,treeContext:Ta!==null?{id:Zt,overflow:jt}:null,retryLane:536870912,hydrationErrors:null},t=of(e),t.return=n,n.child=t,Nn=n,pn=null)):e=null,e===null)throw ka(n);return n.lanes=536870912,null}return us(n,i)}var c=e.memoizedState;if(c!==null){var m=c.dehydrated;if(Ko(n),o)if(n.flags&256)n.flags&=-257,n=xp(e,n,t);else if(n.memoizedState!==null)n.child=e.child,n.flags|=128,n=null;else throw Error(s(558));else if(kn||Hi(e,n,t,!1),o=(t&e.childLanes)!==0,kn||o){if(i=sn,i!==null&&(m=P(i,t),m!==0&&m!==c.retryLane))throw c.retryLane=m,di(e,m),nt(i,e,m),zc;Ss(),n=xp(e,n,t)}else e=c.treeContext,pn=kt(m.nextSibling),Nn=n,je=!0,Aa=null,Tt=!1,e!==null&&df(n,e),n=us(n,i),n.flags|=4096;return n}return e=na(e.child,{mode:i.mode,children:i.children}),e.ref=n.ref,n.child=e,e.return=n,e}function ds(e,n){var t=n.ref;if(t===null)e!==null&&e.ref!==null&&(n.flags|=4194816);else{if(typeof t!="function"&&typeof t!="object")throw Error(s(284));(e===null||e.ref!==t)&&(n.flags|=4194816)}}function yc(e,n,t,i,o){return mi(n),t=$o(e,n,t,i,void 0,o),i=ec(),e!==null&&!kn?(nc(e,n,o),sa(e,n,o)):(je&&i&&Lo(n),n.flags|=1,Un(e,n,t,o),n.child)}function Tp(e,n,t,i,o,c){return mi(n),n.updateQueue=null,t=Rf(n,i,t,o),kf(e),i=ec(),e!==null&&!kn?(nc(e,n,c),sa(e,n,c)):(je&&i&&Lo(n),n.flags|=1,Un(e,n,t,c),n.child)}function Ap(e,n,t,i,o){if(mi(n),n.stateNode===null){var c=Bi,m=t.contextType;typeof m=="object"&&m!==null&&(c=Xn(m)),c=new t(i,c),n.memoizedState=c.state!==null&&c.state!==void 0?c.state:null,c.updater=bc,n.stateNode=c,c._reactInternals=n,c=n.stateNode,c.props=i,c.state=n.memoizedState,c.refs={},Ho(n),m=t.contextType,c.context=typeof m=="object"&&m!==null?Xn(m):Bi,c.state=n.memoizedState,m=t.getDerivedStateFromProps,typeof m=="function"&&(mc(n,t,m,i),c.state=n.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof c.getSnapshotBeforeUpdate=="function"||typeof c.UNSAFE_componentWillMount!="function"&&typeof c.componentWillMount!="function"||(m=c.state,typeof c.componentWillMount=="function"&&c.componentWillMount(),typeof c.UNSAFE_componentWillMount=="function"&&c.UNSAFE_componentWillMount(),m!==c.state&&bc.enqueueReplaceState(c,c.state,null),Xr(n,i,c,o),Nr(),c.state=n.memoizedState),typeof c.componentDidMount=="function"&&(n.flags|=4194308),i=!0}else if(e===null){c=n.stateNode;var y=n.memoizedProps,w=Si(t,y);c.props=w;var M=c.context,B=t.contextType;m=Bi,typeof B=="object"&&B!==null&&(m=Xn(B));var G=t.getDerivedStateFromProps;B=typeof G=="function"||typeof c.getSnapshotBeforeUpdate=="function",y=n.pendingProps!==y,B||typeof c.UNSAFE_componentWillReceiveProps!="function"&&typeof c.componentWillReceiveProps!="function"||(y||M!==m)&&pp(n,c,i,m),_a=!1;var W=n.memoizedState;c.state=W,Xr(n,i,c,o),Nr(),M=n.memoizedState,y||W!==M||_a?(typeof G=="function"&&(mc(n,t,G,i),M=n.memoizedState),(w=_a||fp(n,t,w,i,W,M,m))?(B||typeof c.UNSAFE_componentWillMount!="function"&&typeof c.componentWillMount!="function"||(typeof c.componentWillMount=="function"&&c.componentWillMount(),typeof c.UNSAFE_componentWillMount=="function"&&c.UNSAFE_componentWillMount()),typeof c.componentDidMount=="function"&&(n.flags|=4194308)):(typeof c.componentDidMount=="function"&&(n.flags|=4194308),n.memoizedProps=i,n.memoizedState=M),c.props=i,c.state=M,c.context=m,i=w):(typeof c.componentDidMount=="function"&&(n.flags|=4194308),i=!1)}else{c=n.stateNode,qo(e,n),m=n.memoizedProps,B=Si(t,m),c.props=B,G=n.pendingProps,W=c.context,M=t.contextType,w=Bi,typeof M=="object"&&M!==null&&(w=Xn(M)),y=t.getDerivedStateFromProps,(M=typeof y=="function"||typeof c.getSnapshotBeforeUpdate=="function")||typeof c.UNSAFE_componentWillReceiveProps!="function"&&typeof c.componentWillReceiveProps!="function"||(m!==G||W!==w)&&pp(n,c,i,w),_a=!1,W=n.memoizedState,c.state=W,Xr(n,i,c,o),Nr();var N=n.memoizedState;m!==G||W!==N||_a||e!==null&&e.dependencies!==null&&ql(e.dependencies)?(typeof y=="function"&&(mc(n,t,y,i),N=n.memoizedState),(B=_a||fp(n,t,B,i,W,N,w)||e!==null&&e.dependencies!==null&&ql(e.dependencies))?(M||typeof c.UNSAFE_componentWillUpdate!="function"&&typeof c.componentWillUpdate!="function"||(typeof c.componentWillUpdate=="function"&&c.componentWillUpdate(i,N,w),typeof c.UNSAFE_componentWillUpdate=="function"&&c.UNSAFE_componentWillUpdate(i,N,w)),typeof c.componentDidUpdate=="function"&&(n.flags|=4),typeof c.getSnapshotBeforeUpdate=="function"&&(n.flags|=1024)):(typeof c.componentDidUpdate!="function"||m===e.memoizedProps&&W===e.memoizedState||(n.flags|=4),typeof c.getSnapshotBeforeUpdate!="function"||m===e.memoizedProps&&W===e.memoizedState||(n.flags|=1024),n.memoizedProps=i,n.memoizedState=N),c.props=i,c.state=N,c.context=w,i=B):(typeof c.componentDidUpdate!="function"||m===e.memoizedProps&&W===e.memoizedState||(n.flags|=4),typeof c.getSnapshotBeforeUpdate!="function"||m===e.memoizedProps&&W===e.memoizedState||(n.flags|=1024),i=!1)}return c=i,ds(e,n),i=(n.flags&128)!==0,c||i?(c=n.stateNode,t=i&&typeof t.getDerivedStateFromError!="function"?null:c.render(),n.flags|=1,e!==null&&i?(n.child=yi(n,e.child,null,o),n.child=yi(n,null,t,o)):Un(e,n,t,o),n.memoizedState=c.state,e=n.child):e=sa(e,n,o),e}function kp(e,n,t,i){return pi(),n.flags|=256,Un(e,n,t,i),n.child}var vc={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function Sc(e){return{baseLanes:e,cachePool:gf()}}function Ec(e,n,t){return e=e!==null?e.childLanes&~t:0,n&&(e|=ft),e}function Rp(e,n,t){var i=n.pendingProps,o=!1,c=(n.flags&128)!==0,m;if((m=c)||(m=e!==null&&e.memoizedState===null?!1:(wn.current&2)!==0),m&&(o=!0,n.flags&=-129),m=(n.flags&32)!==0,n.flags&=-33,e===null){if(je){if(o?Ca(n):La(),(e=pn)?(e=Ph(e,Tt),e=e!==null&&e.data!=="&"?e:null,e!==null&&(n.memoizedState={dehydrated:e,treeContext:Ta!==null?{id:Zt,overflow:jt}:null,retryLane:536870912,hydrationErrors:null},t=of(e),t.return=n,n.child=t,Nn=n,pn=null)):e=null,e===null)throw ka(n);return iu(e)?n.lanes=32:n.lanes=536870912,null}var y=i.children;return i=i.fallback,o?(La(),o=n.mode,y=fs({mode:"hidden",children:y},o),i=fi(i,o,t,null),y.return=n,i.return=n,y.sibling=i,n.child=y,i=n.child,i.memoizedState=Sc(t),i.childLanes=Ec(e,m,t),n.memoizedState=vc,Vr(null,i)):(Ca(n),Dc(n,y))}var w=e.memoizedState;if(w!==null&&(y=w.dehydrated,y!==null)){if(c)n.flags&256?(Ca(n),n.flags&=-257,n=wc(e,n,t)):n.memoizedState!==null?(La(),n.child=e.child,n.flags|=128,n=null):(La(),y=i.fallback,o=n.mode,i=fs({mode:"visible",children:i.children},o),y=fi(y,o,t,null),y.flags|=2,i.return=n,y.return=n,i.sibling=y,n.child=i,yi(n,e.child,null,t),i=n.child,i.memoizedState=Sc(t),i.childLanes=Ec(e,m,t),n.memoizedState=vc,n=Vr(null,i));else if(Ca(n),iu(y)){if(m=y.nextSibling&&y.nextSibling.dataset,m)var M=m.dgst;m=M,i=Error(s(419)),i.stack="",i.digest=m,Mr({value:i,source:null,stack:null}),n=wc(e,n,t)}else if(kn||Hi(e,n,t,!1),m=(t&e.childLanes)!==0,kn||m){if(m=sn,m!==null&&(i=P(m,t),i!==0&&i!==w.retryLane))throw w.retryLane=i,di(e,i),nt(m,e,i),zc;au(y)||Ss(),n=wc(e,n,t)}else au(y)?(n.flags|=192,n.child=e.child,n=null):(e=w.treeContext,pn=kt(y.nextSibling),Nn=n,je=!0,Aa=null,Tt=!1,e!==null&&df(n,e),n=Dc(n,i.children),n.flags|=4096);return n}return o?(La(),y=i.fallback,o=n.mode,w=e.child,M=w.sibling,i=na(w,{mode:"hidden",children:i.children}),i.subtreeFlags=w.subtreeFlags&65011712,M!==null?y=na(M,y):(y=fi(y,o,t,null),y.flags|=2),y.return=n,i.return=n,i.sibling=y,n.child=i,Vr(null,i),i=n.child,y=e.child.memoizedState,y===null?y=Sc(t):(o=y.cachePool,o!==null?(w=Tn._currentValue,o=o.parent!==w?{parent:w,pool:w}:o):o=gf(),y={baseLanes:y.baseLanes|t,cachePool:o}),i.memoizedState=y,i.childLanes=Ec(e,m,t),n.memoizedState=vc,Vr(e.child,i)):(Ca(n),t=e.child,e=t.sibling,t=na(t,{mode:"visible",children:i.children}),t.return=n,t.sibling=null,e!==null&&(m=n.deletions,m===null?(n.deletions=[e],n.flags|=16):m.push(e)),n.child=t,n.memoizedState=null,t)}function Dc(e,n){return n=fs({mode:"visible",children:n},e.mode),n.return=e,e.child=n}function fs(e,n){return e=ot(22,e,null,n),e.lanes=0,e}function wc(e,n,t){return yi(n,e.child,null,t),e=Dc(n,n.pendingProps.children),e.flags|=2,n.memoizedState=null,e}function _p(e,n,t){e.lanes|=n;var i=e.alternate;i!==null&&(i.lanes|=n),Xo(e.return,n,t)}function xc(e,n,t,i,o,c){var m=e.memoizedState;m===null?e.memoizedState={isBackwards:n,rendering:null,renderingStartTime:0,last:i,tail:t,tailMode:o,treeForkCount:c}:(m.isBackwards=n,m.rendering=null,m.renderingStartTime=0,m.last=i,m.tail=t,m.tailMode=o,m.treeForkCount=c)}function Ip(e,n,t){var i=n.pendingProps,o=i.revealOrder,c=i.tail;i=i.children;var m=wn.current,y=(m&2)!==0;if(y?(m=m&1|2,n.flags|=128):m&=1,E(wn,m),Un(e,n,i,t),i=je?Ir:0,!y&&e!==null&&(e.flags&128)!==0)e:for(e=n.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&_p(e,t,n);else if(e.tag===19)_p(e,t,n);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===n)break e;for(;e.sibling===null;){if(e.return===null||e.return===n)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(o){case"forwards":for(t=n.child,o=null;t!==null;)e=t.alternate,e!==null&&es(e)===null&&(o=t),t=t.sibling;t=o,t===null?(o=n.child,n.child=null):(o=t.sibling,t.sibling=null),xc(n,!1,o,t,c,i);break;case"backwards":case"unstable_legacy-backwards":for(t=null,o=n.child,n.child=null;o!==null;){if(e=o.alternate,e!==null&&es(e)===null){n.child=o;break}e=o.sibling,o.sibling=t,t=o,o=e}xc(n,!0,t,null,c,i);break;case"together":xc(n,!1,null,null,void 0,i);break;default:n.memoizedState=null}return n.child}function sa(e,n,t){if(e!==null&&(n.dependencies=e.dependencies),Pa|=n.lanes,(t&n.childLanes)===0)if(e!==null){if(Hi(e,n,t,!1),(t&n.childLanes)===0)return null}else return null;if(e!==null&&n.child!==e.child)throw Error(s(153));if(n.child!==null){for(e=n.child,t=na(e,e.pendingProps),n.child=t,t.return=n;e.sibling!==null;)e=e.sibling,t=t.sibling=na(e,e.pendingProps),t.return=n;t.sibling=null}return n.child}function Tc(e,n){return(e.lanes&n)!==0?!0:(e=e.dependencies,!!(e!==null&&ql(e)))}function C1(e,n,t){switch(n.tag){case 3:Je(n,n.stateNode.containerInfo),Ra(n,Tn,e.memoizedState.cache),pi();break;case 27:case 5:qn(n);break;case 4:Je(n,n.stateNode.containerInfo);break;case 10:Ra(n,n.type,n.memoizedProps.value);break;case 31:if(n.memoizedState!==null)return n.flags|=128,Ko(n),null;break;case 13:var i=n.memoizedState;if(i!==null)return i.dehydrated!==null?(Ca(n),n.flags|=128,null):(t&n.child.childLanes)!==0?Rp(e,n,t):(Ca(n),e=sa(e,n,t),e!==null?e.sibling:null);Ca(n);break;case 19:var o=(e.flags&128)!==0;if(i=(t&n.childLanes)!==0,i||(Hi(e,n,t,!1),i=(t&n.childLanes)!==0),o){if(i)return Ip(e,n,t);n.flags|=128}if(o=n.memoizedState,o!==null&&(o.rendering=null,o.tail=null,o.lastEffect=null),E(wn,wn.current),i)break;return null;case 22:return n.lanes=0,Dp(e,n,t,n.pendingProps);case 24:Ra(n,Tn,e.memoizedState.cache)}return sa(e,n,t)}function Mp(e,n,t){if(e!==null)if(e.memoizedProps!==n.pendingProps)kn=!0;else{if(!Tc(e,t)&&(n.flags&128)===0)return kn=!1,C1(e,n,t);kn=(e.flags&131072)!==0}else kn=!1,je&&(n.flags&1048576)!==0&&uf(n,Ir,n.index);switch(n.lanes=0,n.tag){case 16:e:{var i=n.pendingProps;if(e=gi(n.elementType),n.type=e,typeof e=="function")Io(e)?(i=Si(e,i),n.tag=1,n=Ap(null,n,e,i,t)):(n.tag=0,n=yc(null,n,e,i,t));else{if(e!=null){var o=e.$$typeof;if(o===de){n.tag=11,n=vp(null,n,e,i,t);break e}else if(o===k){n.tag=14,n=Sp(null,n,e,i,t);break e}}throw n=fe(e)||e,Error(s(306,n,""))}}return n;case 0:return yc(e,n,n.type,n.pendingProps,t);case 1:return i=n.type,o=Si(i,n.pendingProps),Ap(e,n,i,o,t);case 3:e:{if(Je(n,n.stateNode.containerInfo),e===null)throw Error(s(387));i=n.pendingProps;var c=n.memoizedState;o=c.element,qo(e,n),Xr(n,i,null,t);var m=n.memoizedState;if(i=m.cache,Ra(n,Tn,i),i!==c.cache&&Uo(n,[Tn],t,!0),Nr(),i=m.element,c.isDehydrated)if(c={element:i,isDehydrated:!1,cache:m.cache},n.updateQueue.baseState=c,n.memoizedState=c,n.flags&256){n=kp(e,n,i,t);break e}else if(i!==o){o=Dt(Error(s(424)),n),Mr(o),n=kp(e,n,i,t);break e}else for(e=n.stateNode.containerInfo,e.nodeType===9?e=e.body:e=e.nodeName==="HTML"?e.ownerDocument.body:e,pn=kt(e.firstChild),Nn=n,je=!0,Aa=null,Tt=!0,t=Df(n,null,i,t),n.child=t;t;)t.flags=t.flags&-3|4096,t=t.sibling;else{if(pi(),i===o){n=sa(e,n,t);break e}Un(e,n,i,t)}n=n.child}return n;case 26:return ds(e,n),e===null?(t=jh(n.type,null,n.pendingProps,null))?n.memoizedState=t:je||(t=n.type,e=n.pendingProps,i=ks(ge.current).createElement(t),i[ce]=n,i[oe]=e,Bn(i,t,e),vn(i),n.stateNode=i):n.memoizedState=jh(n.type,e.memoizedProps,n.pendingProps,e.memoizedState),null;case 27:return qn(n),e===null&&je&&(i=n.stateNode=Uh(n.type,n.pendingProps,ge.current),Nn=n,Tt=!0,o=pn,Za(n.type)?(ru=o,pn=kt(i.firstChild)):pn=o),Un(e,n,n.pendingProps.children,t),ds(e,n),e===null&&(n.flags|=4194304),n.child;case 5:return e===null&&je&&((o=i=pn)&&(i=cz(i,n.type,n.pendingProps,Tt),i!==null?(n.stateNode=i,Nn=n,pn=kt(i.firstChild),Tt=!1,o=!0):o=!1),o||ka(n)),qn(n),o=n.type,c=n.pendingProps,m=e!==null?e.memoizedProps:null,i=c.children,eu(o,c)?i=null:m!==null&&eu(o,m)&&(n.flags|=32),n.memoizedState!==null&&(o=$o(e,n,w1,null,null,t),rl._currentValue=o),ds(e,n),Un(e,n,i,t),n.child;case 6:return e===null&&je&&((e=t=pn)&&(t=uz(t,n.pendingProps,Tt),t!==null?(n.stateNode=t,Nn=n,pn=null,e=!0):e=!1),e||ka(n)),null;case 13:return Rp(e,n,t);case 4:return Je(n,n.stateNode.containerInfo),i=n.pendingProps,e===null?n.child=yi(n,null,i,t):Un(e,n,i,t),n.child;case 11:return vp(e,n,n.type,n.pendingProps,t);case 7:return Un(e,n,n.pendingProps,t),n.child;case 8:return Un(e,n,n.pendingProps.children,t),n.child;case 12:return Un(e,n,n.pendingProps.children,t),n.child;case 10:return i=n.pendingProps,Ra(n,n.type,i.value),Un(e,n,i.children,t),n.child;case 9:return o=n.type._context,i=n.pendingProps.children,mi(n),o=Xn(o),i=i(o),n.flags|=1,Un(e,n,i,t),n.child;case 14:return Sp(e,n,n.type,n.pendingProps,t);case 15:return Ep(e,n,n.type,n.pendingProps,t);case 19:return Ip(e,n,t);case 31:return M1(e,n,t);case 22:return Dp(e,n,t,n.pendingProps);case 24:return mi(n),i=Xn(Tn),e===null?(o=jo(),o===null&&(o=sn,c=Bo(),o.pooledCache=c,c.refCount++,c!==null&&(o.pooledCacheLanes|=t),o=c),n.memoizedState={parent:i,cache:o},Ho(n),Ra(n,Tn,o)):((e.lanes&t)!==0&&(qo(e,n),Xr(n,null,null,t),Nr()),o=e.memoizedState,c=n.memoizedState,o.parent!==i?(o={parent:i,cache:i},n.memoizedState=o,n.lanes===0&&(n.memoizedState=n.updateQueue.baseState=o),Ra(n,Tn,i)):(i=c.cache,Ra(n,Tn,i),i!==o.cache&&Uo(n,[Tn],t,!0))),Un(e,n,n.pendingProps.children,t),n.child;case 29:throw n.pendingProps}throw Error(s(156,n.tag))}function oa(e){e.flags|=4}function Ac(e,n,t,i,o){if((n=(e.mode&32)!==0)&&(n=!1),n){if(e.flags|=16777216,(o&335544128)===o)if(e.stateNode.complete)e.flags|=8192;else if(rh())e.flags|=8192;else throw zi=Ql,Vo}else e.flags&=-16777217}function Cp(e,n){if(n.type!=="stylesheet"||(n.state.loading&4)!==0)e.flags&=-16777217;else if(e.flags|=16777216,!Yh(n))if(rh())e.flags|=8192;else throw zi=Ql,Vo}function ps(e,n){n!==null&&(e.flags|=4),e.flags&16384&&(n=e.tag!==22?ri():536870912,e.lanes|=n,ar|=n)}function Hr(e,n){if(!je)switch(e.tailMode){case"hidden":n=e.tail;for(var t=null;n!==null;)n.alternate!==null&&(t=n),n=n.sibling;t===null?e.tail=null:t.sibling=null;break;case"collapsed":t=e.tail;for(var i=null;t!==null;)t.alternate!==null&&(i=t),t=t.sibling;i===null?n||e.tail===null?e.tail=null:e.tail.sibling=null:i.sibling=null}}function hn(e){var n=e.alternate!==null&&e.alternate.child===e.child,t=0,i=0;if(n)for(var o=e.child;o!==null;)t|=o.lanes|o.childLanes,i|=o.subtreeFlags&65011712,i|=o.flags&65011712,o.return=e,o=o.sibling;else for(o=e.child;o!==null;)t|=o.lanes|o.childLanes,i|=o.subtreeFlags,i|=o.flags,o.return=e,o=o.sibling;return e.subtreeFlags|=i,e.childLanes=t,n}function L1(e,n,t){var i=n.pendingProps;switch(Wo(n),n.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return hn(n),null;case 1:return hn(n),null;case 3:return t=n.stateNode,i=null,e!==null&&(i=e.memoizedState.cache),n.memoizedState.cache!==i&&(n.flags|=2048),ia(Tn),Qe(),t.pendingContext&&(t.context=t.pendingContext,t.pendingContext=null),(e===null||e.child===null)&&(Vi(n)?oa(n):e===null||e.memoizedState.isDehydrated&&(n.flags&256)===0||(n.flags|=1024,Po())),hn(n),null;case 26:var o=n.type,c=n.memoizedState;return e===null?(oa(n),c!==null?(hn(n),Cp(n,c)):(hn(n),Ac(n,o,null,i,t))):c?c!==e.memoizedState?(oa(n),hn(n),Cp(n,c)):(hn(n),n.flags&=-16777217):(e=e.memoizedProps,e!==i&&oa(n),hn(n),Ac(n,o,e,i,t)),null;case 27:if(It(n),t=ge.current,o=n.type,e!==null&&n.stateNode!=null)e.memoizedProps!==i&&oa(n);else{if(!i){if(n.stateNode===null)throw Error(s(166));return hn(n),null}e=re.current,Vi(n)?ff(n):(e=Uh(o,i,t),n.stateNode=e,oa(n))}return hn(n),null;case 5:if(It(n),o=n.type,e!==null&&n.stateNode!=null)e.memoizedProps!==i&&oa(n);else{if(!i){if(n.stateNode===null)throw Error(s(166));return hn(n),null}if(c=re.current,Vi(n))ff(n);else{var m=ks(ge.current);switch(c){case 1:c=m.createElementNS("http://www.w3.org/2000/svg",o);break;case 2:c=m.createElementNS("http://www.w3.org/1998/Math/MathML",o);break;default:switch(o){case"svg":c=m.createElementNS("http://www.w3.org/2000/svg",o);break;case"math":c=m.createElementNS("http://www.w3.org/1998/Math/MathML",o);break;case"script":c=m.createElement("div"),c.innerHTML="<script><\/script>",c=c.removeChild(c.firstChild);break;case"select":c=typeof i.is=="string"?m.createElement("select",{is:i.is}):m.createElement("select"),i.multiple?c.multiple=!0:i.size&&(c.size=i.size);break;default:c=typeof i.is=="string"?m.createElement(o,{is:i.is}):m.createElement(o)}}c[ce]=n,c[oe]=i;e:for(m=n.child;m!==null;){if(m.tag===5||m.tag===6)c.appendChild(m.stateNode);else if(m.tag!==4&&m.tag!==27&&m.child!==null){m.child.return=m,m=m.child;continue}if(m===n)break e;for(;m.sibling===null;){if(m.return===null||m.return===n)break e;m=m.return}m.sibling.return=m.return,m=m.sibling}n.stateNode=c;e:switch(Bn(c,o,i),o){case"button":case"input":case"select":case"textarea":i=!!i.autoFocus;break e;case"img":i=!0;break e;default:i=!1}i&&oa(n)}}return hn(n),Ac(n,n.type,e===null?null:e.memoizedProps,n.pendingProps,t),null;case 6:if(e&&n.stateNode!=null)e.memoizedProps!==i&&oa(n);else{if(typeof i!="string"&&n.stateNode===null)throw Error(s(166));if(e=ge.current,Vi(n)){if(e=n.stateNode,t=n.memoizedProps,i=null,o=Nn,o!==null)switch(o.tag){case 27:case 5:i=o.memoizedProps}e[ce]=n,e=!!(e.nodeValue===t||i!==null&&i.suppressHydrationWarning===!0||Rh(e.nodeValue,t)),e||ka(n,!0)}else e=ks(e).createTextNode(i),e[ce]=n,n.stateNode=e}return hn(n),null;case 31:if(t=n.memoizedState,e===null||e.memoizedState!==null){if(i=Vi(n),t!==null){if(e===null){if(!i)throw Error(s(318));if(e=n.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(s(557));e[ce]=n}else pi(),(n.flags&128)===0&&(n.memoizedState=null),n.flags|=4;hn(n),e=!1}else t=Po(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=t),e=!0;if(!e)return n.flags&256?(ut(n),n):(ut(n),null);if((n.flags&128)!==0)throw Error(s(558))}return hn(n),null;case 13:if(i=n.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(o=Vi(n),i!==null&&i.dehydrated!==null){if(e===null){if(!o)throw Error(s(318));if(o=n.memoizedState,o=o!==null?o.dehydrated:null,!o)throw Error(s(317));o[ce]=n}else pi(),(n.flags&128)===0&&(n.memoizedState=null),n.flags|=4;hn(n),o=!1}else o=Po(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=o),o=!0;if(!o)return n.flags&256?(ut(n),n):(ut(n),null)}return ut(n),(n.flags&128)!==0?(n.lanes=t,n):(t=i!==null,e=e!==null&&e.memoizedState!==null,t&&(i=n.child,o=null,i.alternate!==null&&i.alternate.memoizedState!==null&&i.alternate.memoizedState.cachePool!==null&&(o=i.alternate.memoizedState.cachePool.pool),c=null,i.memoizedState!==null&&i.memoizedState.cachePool!==null&&(c=i.memoizedState.cachePool.pool),c!==o&&(i.flags|=2048)),t!==e&&t&&(n.child.flags|=8192),ps(n,n.updateQueue),hn(n),null);case 4:return Qe(),e===null&&Fc(n.stateNode.containerInfo),hn(n),null;case 10:return ia(n.type),hn(n),null;case 19:if(U(wn),i=n.memoizedState,i===null)return hn(n),null;if(o=(n.flags&128)!==0,c=i.rendering,c===null)if(o)Hr(i,!1);else{if(En!==0||e!==null&&(e.flags&128)!==0)for(e=n.child;e!==null;){if(c=es(e),c!==null){for(n.flags|=128,Hr(i,!1),e=c.updateQueue,n.updateQueue=e,ps(n,e),n.subtreeFlags=0,e=t,t=n.child;t!==null;)sf(t,e),t=t.sibling;return E(wn,wn.current&1|2),je&&ta(n,i.treeForkCount),n.child}e=e.sibling}i.tail!==null&&zn()>zs&&(n.flags|=128,o=!0,Hr(i,!1),n.lanes=4194304)}else{if(!o)if(e=es(c),e!==null){if(n.flags|=128,o=!0,e=e.updateQueue,n.updateQueue=e,ps(n,e),Hr(i,!0),i.tail===null&&i.tailMode==="hidden"&&!c.alternate&&!je)return hn(n),null}else 2*zn()-i.renderingStartTime>zs&&t!==536870912&&(n.flags|=128,o=!0,Hr(i,!1),n.lanes=4194304);i.isBackwards?(c.sibling=n.child,n.child=c):(e=i.last,e!==null?e.sibling=c:n.child=c,i.last=c)}return i.tail!==null?(e=i.tail,i.rendering=e,i.tail=e.sibling,i.renderingStartTime=zn(),e.sibling=null,t=wn.current,E(wn,o?t&1|2:t&1),je&&ta(n,i.treeForkCount),e):(hn(n),null);case 22:case 23:return ut(n),Qo(),i=n.memoizedState!==null,e!==null?e.memoizedState!==null!==i&&(n.flags|=8192):i&&(n.flags|=8192),i?(t&536870912)!==0&&(n.flags&128)===0&&(hn(n),n.subtreeFlags&6&&(n.flags|=8192)):hn(n),t=n.updateQueue,t!==null&&ps(n,t.retryQueue),t=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(t=e.memoizedState.cachePool.pool),i=null,n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(i=n.memoizedState.cachePool.pool),i!==t&&(n.flags|=2048),e!==null&&U(bi),null;case 24:return t=null,e!==null&&(t=e.memoizedState.cache),n.memoizedState.cache!==t&&(n.flags|=2048),ia(Tn),hn(n),null;case 25:return null;case 30:return null}throw Error(s(156,n.tag))}function W1(e,n){switch(Wo(n),n.tag){case 1:return e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 3:return ia(Tn),Qe(),e=n.flags,(e&65536)!==0&&(e&128)===0?(n.flags=e&-65537|128,n):null;case 26:case 27:case 5:return It(n),null;case 31:if(n.memoizedState!==null){if(ut(n),n.alternate===null)throw Error(s(340));pi()}return e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 13:if(ut(n),e=n.memoizedState,e!==null&&e.dehydrated!==null){if(n.alternate===null)throw Error(s(340));pi()}return e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 19:return U(wn),null;case 4:return Qe(),null;case 10:return ia(n.type),null;case 22:case 23:return ut(n),Qo(),e!==null&&U(bi),e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 24:return ia(Tn),null;case 25:return null;default:return null}}function Lp(e,n){switch(Wo(n),n.tag){case 3:ia(Tn),Qe();break;case 26:case 27:case 5:It(n);break;case 4:Qe();break;case 31:n.memoizedState!==null&&ut(n);break;case 13:ut(n);break;case 19:U(wn);break;case 10:ia(n.type);break;case 22:case 23:ut(n),Qo(),e!==null&&U(bi);break;case 24:ia(Tn)}}function qr(e,n){try{var t=n.updateQueue,i=t!==null?t.lastEffect:null;if(i!==null){var o=i.next;t=o;do{if((t.tag&e)===e){i=void 0;var c=t.create,m=t.inst;i=c(),m.destroy=i}t=t.next}while(t!==o)}}catch(y){nn(n,n.return,y)}}function Wa(e,n,t){try{var i=n.updateQueue,o=i!==null?i.lastEffect:null;if(o!==null){var c=o.next;i=c;do{if((i.tag&e)===e){var m=i.inst,y=m.destroy;if(y!==void 0){m.destroy=void 0,o=n;var w=t,M=y;try{M()}catch(B){nn(o,w,B)}}}i=i.next}while(i!==c)}}catch(B){nn(n,n.return,B)}}function Wp(e){var n=e.updateQueue;if(n!==null){var t=e.stateNode;try{xf(n,t)}catch(i){nn(e,e.return,i)}}}function Op(e,n,t){t.props=Si(e.type,e.memoizedProps),t.state=e.memoizedState;try{t.componentWillUnmount()}catch(i){nn(e,n,i)}}function Gr(e,n){try{var t=e.ref;if(t!==null){switch(e.tag){case 26:case 27:case 5:var i=e.stateNode;break;case 30:i=e.stateNode;break;default:i=e.stateNode}typeof t=="function"?e.refCleanup=t(i):t.current=i}}catch(o){nn(e,n,o)}}function Vt(e,n){var t=e.ref,i=e.refCleanup;if(t!==null)if(typeof i=="function")try{i()}catch(o){nn(e,n,o)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof t=="function")try{t(null)}catch(o){nn(e,n,o)}else t.current=null}function Pp(e){var n=e.type,t=e.memoizedProps,i=e.stateNode;try{e:switch(n){case"button":case"input":case"select":case"textarea":t.autoFocus&&i.focus();break e;case"img":t.src?i.src=t.src:t.srcSet&&(i.srcset=t.srcSet)}}catch(o){nn(e,e.return,o)}}function kc(e,n,t){try{var i=e.stateNode;az(i,e.type,t,n),i[oe]=n}catch(o){nn(e,e.return,o)}}function Np(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&Za(e.type)||e.tag===4}function Rc(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||Np(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&Za(e.type)||e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function _c(e,n,t){var i=e.tag;if(i===5||i===6)e=e.stateNode,n?(t.nodeType===9?t.body:t.nodeName==="HTML"?t.ownerDocument.body:t).insertBefore(e,n):(n=t.nodeType===9?t.body:t.nodeName==="HTML"?t.ownerDocument.body:t,n.appendChild(e),t=t._reactRootContainer,t!=null||n.onclick!==null||(n.onclick=$t));else if(i!==4&&(i===27&&Za(e.type)&&(t=e.stateNode,n=null),e=e.child,e!==null))for(_c(e,n,t),e=e.sibling;e!==null;)_c(e,n,t),e=e.sibling}function hs(e,n,t){var i=e.tag;if(i===5||i===6)e=e.stateNode,n?t.insertBefore(e,n):t.appendChild(e);else if(i!==4&&(i===27&&Za(e.type)&&(t=e.stateNode),e=e.child,e!==null))for(hs(e,n,t),e=e.sibling;e!==null;)hs(e,n,t),e=e.sibling}function Xp(e){var n=e.stateNode,t=e.memoizedProps;try{for(var i=e.type,o=n.attributes;o.length;)n.removeAttributeNode(o[0]);Bn(n,i,t),n[ce]=e,n[oe]=t}catch(c){nn(e,e.return,c)}}var ca=!1,Rn=!1,Ic=!1,Up=typeof WeakSet=="function"?WeakSet:Set,Wn=null;function O1(e,n){if(e=e.containerInfo,Jc=Ws,e=Kd(e),wo(e)){if("selectionStart"in e)var t={start:e.selectionStart,end:e.selectionEnd};else e:{t=(t=e.ownerDocument)&&t.defaultView||window;var i=t.getSelection&&t.getSelection();if(i&&i.rangeCount!==0){t=i.anchorNode;var o=i.anchorOffset,c=i.focusNode;i=i.focusOffset;try{t.nodeType,c.nodeType}catch{t=null;break e}var m=0,y=-1,w=-1,M=0,B=0,G=e,W=null;n:for(;;){for(var N;G!==t||o!==0&&G.nodeType!==3||(y=m+o),G!==c||i!==0&&G.nodeType!==3||(w=m+i),G.nodeType===3&&(m+=G.nodeValue.length),(N=G.firstChild)!==null;)W=G,G=N;for(;;){if(G===e)break n;if(W===t&&++M===o&&(y=m),W===c&&++B===i&&(w=m),(N=G.nextSibling)!==null)break;G=W,W=G.parentNode}G=N}t=y===-1||w===-1?null:{start:y,end:w}}else t=null}t=t||{start:0,end:0}}else t=null;for($c={focusedElem:e,selectionRange:t},Ws=!1,Wn=n;Wn!==null;)if(n=Wn,e=n.child,(n.subtreeFlags&1028)!==0&&e!==null)e.return=n,Wn=e;else for(;Wn!==null;){switch(n=Wn,c=n.alternate,e=n.flags,n.tag){case 0:if((e&4)!==0&&(e=n.updateQueue,e=e!==null?e.events:null,e!==null))for(t=0;t<e.length;t++)o=e[t],o.ref.impl=o.nextImpl;break;case 11:case 15:break;case 1:if((e&1024)!==0&&c!==null){e=void 0,t=n,o=c.memoizedProps,c=c.memoizedState,i=t.stateNode;try{var me=Si(t.type,o);e=i.getSnapshotBeforeUpdate(me,c),i.__reactInternalSnapshotBeforeUpdate=e}catch(we){nn(t,t.return,we)}}break;case 3:if((e&1024)!==0){if(e=n.stateNode.containerInfo,t=e.nodeType,t===9)tu(e);else if(t===1)switch(e.nodeName){case"HEAD":case"HTML":case"BODY":tu(e);break;default:e.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((e&1024)!==0)throw Error(s(163))}if(e=n.sibling,e!==null){e.return=n.return,Wn=e;break}Wn=n.return}}function Bp(e,n,t){var i=t.flags;switch(t.tag){case 0:case 11:case 15:da(e,t),i&4&&qr(5,t);break;case 1:if(da(e,t),i&4)if(e=t.stateNode,n===null)try{e.componentDidMount()}catch(m){nn(t,t.return,m)}else{var o=Si(t.type,n.memoizedProps);n=n.memoizedState;try{e.componentDidUpdate(o,n,e.__reactInternalSnapshotBeforeUpdate)}catch(m){nn(t,t.return,m)}}i&64&&Wp(t),i&512&&Gr(t,t.return);break;case 3:if(da(e,t),i&64&&(e=t.updateQueue,e!==null)){if(n=null,t.child!==null)switch(t.child.tag){case 27:case 5:n=t.child.stateNode;break;case 1:n=t.child.stateNode}try{xf(e,n)}catch(m){nn(t,t.return,m)}}break;case 27:n===null&&i&4&&Xp(t);case 26:case 5:da(e,t),n===null&&i&4&&Pp(t),i&512&&Gr(t,t.return);break;case 12:da(e,t);break;case 31:da(e,t),i&4&&Vp(e,t);break;case 13:da(e,t),i&4&&Hp(e,t),i&64&&(e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(t=H1.bind(null,t),dz(e,t))));break;case 22:if(i=t.memoizedState!==null||ca,!i){n=n!==null&&n.memoizedState!==null||Rn,o=ca;var c=Rn;ca=i,(Rn=n)&&!c?fa(e,t,(t.subtreeFlags&8772)!==0):da(e,t),ca=o,Rn=c}break;case 30:break;default:da(e,t)}}function Zp(e){var n=e.alternate;n!==null&&(e.alternate=null,Zp(n)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(n=e.stateNode,n!==null&&on(n)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var bn=null,Kn=!1;function ua(e,n,t){for(t=t.child;t!==null;)jp(e,n,t),t=t.sibling}function jp(e,n,t){if(yn&&typeof yn.onCommitFiberUnmount=="function")try{yn.onCommitFiberUnmount(mn,t)}catch{}switch(t.tag){case 26:Rn||Vt(t,n),ua(e,n,t),t.memoizedState?t.memoizedState.count--:t.stateNode&&(t=t.stateNode,t.parentNode.removeChild(t));break;case 27:Rn||Vt(t,n);var i=bn,o=Kn;Za(t.type)&&(bn=t.stateNode,Kn=!1),ua(e,n,t),tl(t.stateNode),bn=i,Kn=o;break;case 5:Rn||Vt(t,n);case 6:if(i=bn,o=Kn,bn=null,ua(e,n,t),bn=i,Kn=o,bn!==null)if(Kn)try{(bn.nodeType===9?bn.body:bn.nodeName==="HTML"?bn.ownerDocument.body:bn).removeChild(t.stateNode)}catch(c){nn(t,n,c)}else try{bn.removeChild(t.stateNode)}catch(c){nn(t,n,c)}break;case 18:bn!==null&&(Kn?(e=bn,Wh(e.nodeType===9?e.body:e.nodeName==="HTML"?e.ownerDocument.body:e,t.stateNode),dr(e)):Wh(bn,t.stateNode));break;case 4:i=bn,o=Kn,bn=t.stateNode.containerInfo,Kn=!0,ua(e,n,t),bn=i,Kn=o;break;case 0:case 11:case 14:case 15:Wa(2,t,n),Rn||Wa(4,t,n),ua(e,n,t);break;case 1:Rn||(Vt(t,n),i=t.stateNode,typeof i.componentWillUnmount=="function"&&Op(t,n,i)),ua(e,n,t);break;case 21:ua(e,n,t);break;case 22:Rn=(i=Rn)||t.memoizedState!==null,ua(e,n,t),Rn=i;break;default:ua(e,n,t)}}function Vp(e,n){if(n.memoizedState===null&&(e=n.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{dr(e)}catch(t){nn(n,n.return,t)}}}function Hp(e,n){if(n.memoizedState===null&&(e=n.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{dr(e)}catch(t){nn(n,n.return,t)}}function P1(e){switch(e.tag){case 31:case 13:case 19:var n=e.stateNode;return n===null&&(n=e.stateNode=new Up),n;case 22:return e=e.stateNode,n=e._retryCache,n===null&&(n=e._retryCache=new Up),n;default:throw Error(s(435,e.tag))}}function ms(e,n){var t=P1(e);n.forEach(function(i){if(!t.has(i)){t.add(i);var o=q1.bind(null,e,i);i.then(o,o)}})}function Jn(e,n){var t=n.deletions;if(t!==null)for(var i=0;i<t.length;i++){var o=t[i],c=e,m=n,y=m;e:for(;y!==null;){switch(y.tag){case 27:if(Za(y.type)){bn=y.stateNode,Kn=!1;break e}break;case 5:bn=y.stateNode,Kn=!1;break e;case 3:case 4:bn=y.stateNode.containerInfo,Kn=!0;break e}y=y.return}if(bn===null)throw Error(s(160));jp(c,m,o),bn=null,Kn=!1,c=o.alternate,c!==null&&(c.return=null),o.return=null}if(n.subtreeFlags&13886)for(n=n.child;n!==null;)qp(n,e),n=n.sibling}var Pt=null;function qp(e,n){var t=e.alternate,i=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:Jn(n,e),$n(e),i&4&&(Wa(3,e,e.return),qr(3,e),Wa(5,e,e.return));break;case 1:Jn(n,e),$n(e),i&512&&(Rn||t===null||Vt(t,t.return)),i&64&&ca&&(e=e.updateQueue,e!==null&&(i=e.callbacks,i!==null&&(t=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=t===null?i:t.concat(i))));break;case 26:var o=Pt;if(Jn(n,e),$n(e),i&512&&(Rn||t===null||Vt(t,t.return)),i&4){var c=t!==null?t.memoizedState:null;if(i=e.memoizedState,t===null)if(i===null)if(e.stateNode===null){e:{i=e.type,t=e.memoizedProps,o=o.ownerDocument||o;n:switch(i){case"title":c=o.getElementsByTagName("title")[0],(!c||c[Pe]||c[ce]||c.namespaceURI==="http://www.w3.org/2000/svg"||c.hasAttribute("itemprop"))&&(c=o.createElement(i),o.head.insertBefore(c,o.querySelector("head > title"))),Bn(c,i,t),c[ce]=e,vn(c),i=c;break e;case"link":var m=qh("link","href",o).get(i+(t.href||""));if(m){for(var y=0;y<m.length;y++)if(c=m[y],c.getAttribute("href")===(t.href==null||t.href===""?null:t.href)&&c.getAttribute("rel")===(t.rel==null?null:t.rel)&&c.getAttribute("title")===(t.title==null?null:t.title)&&c.getAttribute("crossorigin")===(t.crossOrigin==null?null:t.crossOrigin)){m.splice(y,1);break n}}c=o.createElement(i),Bn(c,i,t),o.head.appendChild(c);break;case"meta":if(m=qh("meta","content",o).get(i+(t.content||""))){for(y=0;y<m.length;y++)if(c=m[y],c.getAttribute("content")===(t.content==null?null:""+t.content)&&c.getAttribute("name")===(t.name==null?null:t.name)&&c.getAttribute("property")===(t.property==null?null:t.property)&&c.getAttribute("http-equiv")===(t.httpEquiv==null?null:t.httpEquiv)&&c.getAttribute("charset")===(t.charSet==null?null:t.charSet)){m.splice(y,1);break n}}c=o.createElement(i),Bn(c,i,t),o.head.appendChild(c);break;default:throw Error(s(468,i))}c[ce]=e,vn(c),i=c}e.stateNode=i}else Gh(o,e.type,e.stateNode);else e.stateNode=Hh(o,i,e.memoizedProps);else c!==i?(c===null?t.stateNode!==null&&(t=t.stateNode,t.parentNode.removeChild(t)):c.count--,i===null?Gh(o,e.type,e.stateNode):Hh(o,i,e.memoizedProps)):i===null&&e.stateNode!==null&&kc(e,e.memoizedProps,t.memoizedProps)}break;case 27:Jn(n,e),$n(e),i&512&&(Rn||t===null||Vt(t,t.return)),t!==null&&i&4&&kc(e,e.memoizedProps,t.memoizedProps);break;case 5:if(Jn(n,e),$n(e),i&512&&(Rn||t===null||Vt(t,t.return)),e.flags&32){o=e.stateNode;try{Li(o,"")}catch(me){nn(e,e.return,me)}}i&4&&e.stateNode!=null&&(o=e.memoizedProps,kc(e,o,t!==null?t.memoizedProps:o)),i&1024&&(Ic=!0);break;case 6:if(Jn(n,e),$n(e),i&4){if(e.stateNode===null)throw Error(s(162));i=e.memoizedProps,t=e.stateNode;try{t.nodeValue=i}catch(me){nn(e,e.return,me)}}break;case 3:if(Is=null,o=Pt,Pt=Rs(n.containerInfo),Jn(n,e),Pt=o,$n(e),i&4&&t!==null&&t.memoizedState.isDehydrated)try{dr(n.containerInfo)}catch(me){nn(e,e.return,me)}Ic&&(Ic=!1,Gp(e));break;case 4:i=Pt,Pt=Rs(e.stateNode.containerInfo),Jn(n,e),$n(e),Pt=i;break;case 12:Jn(n,e),$n(e);break;case 31:Jn(n,e),$n(e),i&4&&(i=e.updateQueue,i!==null&&(e.updateQueue=null,ms(e,i)));break;case 13:Jn(n,e),$n(e),e.child.flags&8192&&e.memoizedState!==null!=(t!==null&&t.memoizedState!==null)&&(gs=zn()),i&4&&(i=e.updateQueue,i!==null&&(e.updateQueue=null,ms(e,i)));break;case 22:o=e.memoizedState!==null;var w=t!==null&&t.memoizedState!==null,M=ca,B=Rn;if(ca=M||o,Rn=B||w,Jn(n,e),Rn=B,ca=M,$n(e),i&8192)e:for(n=e.stateNode,n._visibility=o?n._visibility&-2:n._visibility|1,o&&(t===null||w||ca||Rn||Ei(e)),t=null,n=e;;){if(n.tag===5||n.tag===26){if(t===null){w=t=n;try{if(c=w.stateNode,o)m=c.style,typeof m.setProperty=="function"?m.setProperty("display","none","important"):m.display="none";else{y=w.stateNode;var G=w.memoizedProps.style,W=G!=null&&G.hasOwnProperty("display")?G.display:null;y.style.display=W==null||typeof W=="boolean"?"":(""+W).trim()}}catch(me){nn(w,w.return,me)}}}else if(n.tag===6){if(t===null){w=n;try{w.stateNode.nodeValue=o?"":w.memoizedProps}catch(me){nn(w,w.return,me)}}}else if(n.tag===18){if(t===null){w=n;try{var N=w.stateNode;o?Oh(N,!0):Oh(w.stateNode,!1)}catch(me){nn(w,w.return,me)}}}else if((n.tag!==22&&n.tag!==23||n.memoizedState===null||n===e)&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break e;for(;n.sibling===null;){if(n.return===null||n.return===e)break e;t===n&&(t=null),n=n.return}t===n&&(t=null),n.sibling.return=n.return,n=n.sibling}i&4&&(i=e.updateQueue,i!==null&&(t=i.retryQueue,t!==null&&(i.retryQueue=null,ms(e,t))));break;case 19:Jn(n,e),$n(e),i&4&&(i=e.updateQueue,i!==null&&(e.updateQueue=null,ms(e,i)));break;case 30:break;case 21:break;default:Jn(n,e),$n(e)}}function $n(e){var n=e.flags;if(n&2){try{for(var t,i=e.return;i!==null;){if(Np(i)){t=i;break}i=i.return}if(t==null)throw Error(s(160));switch(t.tag){case 27:var o=t.stateNode,c=Rc(e);hs(e,c,o);break;case 5:var m=t.stateNode;t.flags&32&&(Li(m,""),t.flags&=-33);var y=Rc(e);hs(e,y,m);break;case 3:case 4:var w=t.stateNode.containerInfo,M=Rc(e);_c(e,M,w);break;default:throw Error(s(161))}}catch(B){nn(e,e.return,B)}e.flags&=-3}n&4096&&(e.flags&=-4097)}function Gp(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var n=e;Gp(n),n.tag===5&&n.flags&1024&&n.stateNode.reset(),e=e.sibling}}function da(e,n){if(n.subtreeFlags&8772)for(n=n.child;n!==null;)Bp(e,n.alternate,n),n=n.sibling}function Ei(e){for(e=e.child;e!==null;){var n=e;switch(n.tag){case 0:case 11:case 14:case 15:Wa(4,n,n.return),Ei(n);break;case 1:Vt(n,n.return);var t=n.stateNode;typeof t.componentWillUnmount=="function"&&Op(n,n.return,t),Ei(n);break;case 27:tl(n.stateNode);case 26:case 5:Vt(n,n.return),Ei(n);break;case 22:n.memoizedState===null&&Ei(n);break;case 30:Ei(n);break;default:Ei(n)}e=e.sibling}}function fa(e,n,t){for(t=t&&(n.subtreeFlags&8772)!==0,n=n.child;n!==null;){var i=n.alternate,o=e,c=n,m=c.flags;switch(c.tag){case 0:case 11:case 15:fa(o,c,t),qr(4,c);break;case 1:if(fa(o,c,t),i=c,o=i.stateNode,typeof o.componentDidMount=="function")try{o.componentDidMount()}catch(M){nn(i,i.return,M)}if(i=c,o=i.updateQueue,o!==null){var y=i.stateNode;try{var w=o.shared.hiddenCallbacks;if(w!==null)for(o.shared.hiddenCallbacks=null,o=0;o<w.length;o++)wf(w[o],y)}catch(M){nn(i,i.return,M)}}t&&m&64&&Wp(c),Gr(c,c.return);break;case 27:Xp(c);case 26:case 5:fa(o,c,t),t&&i===null&&m&4&&Pp(c),Gr(c,c.return);break;case 12:fa(o,c,t);break;case 31:fa(o,c,t),t&&m&4&&Vp(o,c);break;case 13:fa(o,c,t),t&&m&4&&Hp(o,c);break;case 22:c.memoizedState===null&&fa(o,c,t),Gr(c,c.return);break;case 30:break;default:fa(o,c,t)}n=n.sibling}}function Mc(e,n){var t=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(t=e.memoizedState.cachePool.pool),e=null,n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(e=n.memoizedState.cachePool.pool),e!==t&&(e!=null&&e.refCount++,t!=null&&Cr(t))}function Cc(e,n){e=null,n.alternate!==null&&(e=n.alternate.memoizedState.cache),n=n.memoizedState.cache,n!==e&&(n.refCount++,e!=null&&Cr(e))}function Nt(e,n,t,i){if(n.subtreeFlags&10256)for(n=n.child;n!==null;)Yp(e,n,t,i),n=n.sibling}function Yp(e,n,t,i){var o=n.flags;switch(n.tag){case 0:case 11:case 15:Nt(e,n,t,i),o&2048&&qr(9,n);break;case 1:Nt(e,n,t,i);break;case 3:Nt(e,n,t,i),o&2048&&(e=null,n.alternate!==null&&(e=n.alternate.memoizedState.cache),n=n.memoizedState.cache,n!==e&&(n.refCount++,e!=null&&Cr(e)));break;case 12:if(o&2048){Nt(e,n,t,i),e=n.stateNode;try{var c=n.memoizedProps,m=c.id,y=c.onPostCommit;typeof y=="function"&&y(m,n.alternate===null?"mount":"update",e.passiveEffectDuration,-0)}catch(w){nn(n,n.return,w)}}else Nt(e,n,t,i);break;case 31:Nt(e,n,t,i);break;case 13:Nt(e,n,t,i);break;case 23:break;case 22:c=n.stateNode,m=n.alternate,n.memoizedState!==null?c._visibility&2?Nt(e,n,t,i):Yr(e,n):c._visibility&2?Nt(e,n,t,i):(c._visibility|=2,er(e,n,t,i,(n.subtreeFlags&10256)!==0||!1)),o&2048&&Mc(m,n);break;case 24:Nt(e,n,t,i),o&2048&&Cc(n.alternate,n);break;default:Nt(e,n,t,i)}}function er(e,n,t,i,o){for(o=o&&((n.subtreeFlags&10256)!==0||!1),n=n.child;n!==null;){var c=e,m=n,y=t,w=i,M=m.flags;switch(m.tag){case 0:case 11:case 15:er(c,m,y,w,o),qr(8,m);break;case 23:break;case 22:var B=m.stateNode;m.memoizedState!==null?B._visibility&2?er(c,m,y,w,o):Yr(c,m):(B._visibility|=2,er(c,m,y,w,o)),o&&M&2048&&Mc(m.alternate,m);break;case 24:er(c,m,y,w,o),o&&M&2048&&Cc(m.alternate,m);break;default:er(c,m,y,w,o)}n=n.sibling}}function Yr(e,n){if(n.subtreeFlags&10256)for(n=n.child;n!==null;){var t=e,i=n,o=i.flags;switch(i.tag){case 22:Yr(t,i),o&2048&&Mc(i.alternate,i);break;case 24:Yr(t,i),o&2048&&Cc(i.alternate,i);break;default:Yr(t,i)}n=n.sibling}}var Fr=8192;function nr(e,n,t){if(e.subtreeFlags&Fr)for(e=e.child;e!==null;)Fp(e,n,t),e=e.sibling}function Fp(e,n,t){switch(e.tag){case 26:nr(e,n,t),e.flags&Fr&&e.memoizedState!==null&&Dz(t,Pt,e.memoizedState,e.memoizedProps);break;case 5:nr(e,n,t);break;case 3:case 4:var i=Pt;Pt=Rs(e.stateNode.containerInfo),nr(e,n,t),Pt=i;break;case 22:e.memoizedState===null&&(i=e.alternate,i!==null&&i.memoizedState!==null?(i=Fr,Fr=16777216,nr(e,n,t),Fr=i):nr(e,n,t));break;default:nr(e,n,t)}}function Qp(e){var n=e.alternate;if(n!==null&&(e=n.child,e!==null)){n.child=null;do n=e.sibling,e.sibling=null,e=n;while(e!==null)}}function Qr(e){var n=e.deletions;if((e.flags&16)!==0){if(n!==null)for(var t=0;t<n.length;t++){var i=n[t];Wn=i,Jp(i,e)}Qp(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)Kp(e),e=e.sibling}function Kp(e){switch(e.tag){case 0:case 11:case 15:Qr(e),e.flags&2048&&Wa(9,e,e.return);break;case 3:Qr(e);break;case 12:Qr(e);break;case 22:var n=e.stateNode;e.memoizedState!==null&&n._visibility&2&&(e.return===null||e.return.tag!==13)?(n._visibility&=-3,bs(e)):Qr(e);break;default:Qr(e)}}function bs(e){var n=e.deletions;if((e.flags&16)!==0){if(n!==null)for(var t=0;t<n.length;t++){var i=n[t];Wn=i,Jp(i,e)}Qp(e)}for(e=e.child;e!==null;){switch(n=e,n.tag){case 0:case 11:case 15:Wa(8,n,n.return),bs(n);break;case 22:t=n.stateNode,t._visibility&2&&(t._visibility&=-3,bs(n));break;default:bs(n)}e=e.sibling}}function Jp(e,n){for(;Wn!==null;){var t=Wn;switch(t.tag){case 0:case 11:case 15:Wa(8,t,n);break;case 23:case 22:if(t.memoizedState!==null&&t.memoizedState.cachePool!==null){var i=t.memoizedState.cachePool.pool;i!=null&&i.refCount++}break;case 24:Cr(t.memoizedState.cache)}if(i=t.child,i!==null)i.return=t,Wn=i;else e:for(t=e;Wn!==null;){i=Wn;var o=i.sibling,c=i.return;if(Zp(i),i===t){Wn=null;break e}if(o!==null){o.return=c,Wn=o;break e}Wn=c}}}var N1={getCacheForType:function(e){var n=Xn(Tn),t=n.data.get(e);return t===void 0&&(t=e(),n.data.set(e,t)),t},cacheSignal:function(){return Xn(Tn).controller.signal}},X1=typeof WeakMap=="function"?WeakMap:Map,Ye=0,sn=null,Ne=null,Be=0,en=0,dt=null,Oa=!1,tr=!1,Lc=!1,pa=0,En=0,Pa=0,Di=0,Wc=0,ft=0,ar=0,Kr=null,et=null,Oc=!1,gs=0,$p=0,zs=1/0,ys=null,Na=null,Cn=0,Xa=null,ir=null,ha=0,Pc=0,Nc=null,eh=null,Jr=0,Xc=null;function pt(){return(Ye&2)!==0&&Be!==0?Be&-Be:C.T!==null?Hc():Ee()}function nh(){if(ft===0)if((Be&536870912)===0||je){var e=Sa;Sa<<=1,(Sa&3932160)===0&&(Sa=262144),ft=e}else ft=536870912;return e=ct.current,e!==null&&(e.flags|=32),ft}function nt(e,n,t){(e===sn&&(en===2||en===9)||e.cancelPendingCommit!==null)&&(rr(e,0),Ua(e,Be,ft,!1)),li(e,t),((Ye&2)===0||e!==sn)&&(e===sn&&((Ye&2)===0&&(Di|=t),En===4&&Ua(e,Be,ft,!1)),Ht(e))}function th(e,n,t){if((Ye&6)!==0)throw Error(s(327));var i=!t&&(n&127)===0&&(n&e.expiredLanes)===0||ii(e,n),o=i?Z1(e,n):Bc(e,n,!0),c=i;do{if(o===0){tr&&!i&&Ua(e,n,0,!1);break}else{if(t=e.current.alternate,c&&!U1(t)){o=Bc(e,n,!1),c=!1;continue}if(o===2){if(c=n,e.errorRecoveryDisabledLanes&c)var m=0;else m=e.pendingLanes&-536870913,m=m!==0?m:m&536870912?536870912:0;if(m!==0){n=m;e:{var y=e;o=Kr;var w=y.current.memoizedState.isDehydrated;if(w&&(rr(y,m).flags|=256),m=Bc(y,m,!1),m!==2){if(Lc&&!w){y.errorRecoveryDisabledLanes|=c,Di|=c,o=4;break e}c=et,et=o,c!==null&&(et===null?et=c:et.push.apply(et,c))}o=m}if(c=!1,o!==2)continue}}if(o===1){rr(e,0),Ua(e,n,0,!0);break}e:{switch(i=e,c=o,c){case 0:case 1:throw Error(s(345));case 4:if((n&4194048)!==n)break;case 6:Ua(i,n,ft,!Oa);break e;case 2:et=null;break;case 3:case 5:break;default:throw Error(s(329))}if((n&62914560)===n&&(o=gs+300-zn(),10<o)){if(Ua(i,n,ft,!Oa),ai(i,0,!0)!==0)break e;ha=n,i.timeoutHandle=Ch(ah.bind(null,i,t,et,ys,Oc,n,ft,Di,ar,Oa,c,"Throttled",-0,0),o);break e}ah(i,t,et,ys,Oc,n,ft,Di,ar,Oa,c,null,-0,0)}}break}while(!0);Ht(e)}function ah(e,n,t,i,o,c,m,y,w,M,B,G,W,N){if(e.timeoutHandle=-1,G=n.subtreeFlags,G&8192||(G&16785408)===16785408){G={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:$t},Fp(n,c,G);var me=(c&62914560)===c?gs-zn():(c&4194048)===c?$p-zn():0;if(me=wz(G,me),me!==null){ha=c,e.cancelPendingCommit=me(dh.bind(null,e,n,c,t,i,o,m,y,w,B,G,null,W,N)),Ua(e,c,m,!M);return}}dh(e,n,c,t,i,o,m,y,w)}function U1(e){for(var n=e;;){var t=n.tag;if((t===0||t===11||t===15)&&n.flags&16384&&(t=n.updateQueue,t!==null&&(t=t.stores,t!==null)))for(var i=0;i<t.length;i++){var o=t[i],c=o.getSnapshot;o=o.value;try{if(!st(c(),o))return!1}catch{return!1}}if(t=n.child,n.subtreeFlags&16384&&t!==null)t.return=n,n=t;else{if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return!0;n=n.return}n.sibling.return=n.return,n=n.sibling}}return!0}function Ua(e,n,t,i){n&=~Wc,n&=~Di,e.suspendedLanes|=n,e.pingedLanes&=~n,i&&(e.warmLanes|=n),i=e.expirationTimes;for(var o=n;0<o;){var c=31-Ke(o),m=1<<c;i[c]=-1,o&=~m}t!==0&&T(e,t,n)}function vs(){return(Ye&6)===0?($r(0),!1):!0}function Uc(){if(Ne!==null){if(en===0)var e=Ne.return;else e=Ne,aa=hi=null,tc(e),Fi=null,Wr=0,e=Ne;for(;e!==null;)Lp(e.alternate,e),e=e.return;Ne=null}}function rr(e,n){var t=e.timeoutHandle;t!==-1&&(e.timeoutHandle=-1,lz(t)),t=e.cancelPendingCommit,t!==null&&(e.cancelPendingCommit=null,t()),ha=0,Uc(),sn=e,Ne=t=na(e.current,null),Be=n,en=0,dt=null,Oa=!1,tr=ii(e,n),Lc=!1,ar=ft=Wc=Di=Pa=En=0,et=Kr=null,Oc=!1,(n&8)!==0&&(n|=n&32);var i=e.entangledLanes;if(i!==0)for(e=e.entanglements,i&=n;0<i;){var o=31-Ke(i),c=1<<o;n|=e[o],i&=~c}return pa=n,Bl(),t}function ih(e,n){Ce=null,C.H=jr,n===Yi||n===Fl?(n=vf(),en=3):n===Vo?(n=vf(),en=4):en=n===zc?8:n!==null&&typeof n=="object"&&typeof n.then=="function"?6:1,dt=n,Ne===null&&(En=1,cs(e,Dt(n,e.current)))}function rh(){var e=ct.current;return e===null?!0:(Be&4194048)===Be?At===null:(Be&62914560)===Be||(Be&536870912)!==0?e===At:!1}function lh(){var e=C.H;return C.H=jr,e===null?jr:e}function sh(){var e=C.A;return C.A=N1,e}function Ss(){En=4,Oa||(Be&4194048)!==Be&&ct.current!==null||(tr=!0),(Pa&134217727)===0&&(Di&134217727)===0||sn===null||Ua(sn,Be,ft,!1)}function Bc(e,n,t){var i=Ye;Ye|=2;var o=lh(),c=sh();(sn!==e||Be!==n)&&(ys=null,rr(e,n)),n=!1;var m=En;e:do try{if(en!==0&&Ne!==null){var y=Ne,w=dt;switch(en){case 8:Uc(),m=6;break e;case 3:case 2:case 9:case 6:ct.current===null&&(n=!0);var M=en;if(en=0,dt=null,lr(e,y,w,M),t&&tr){m=0;break e}break;default:M=en,en=0,dt=null,lr(e,y,w,M)}}B1(),m=En;break}catch(B){ih(e,B)}while(!0);return n&&e.shellSuspendCounter++,aa=hi=null,Ye=i,C.H=o,C.A=c,Ne===null&&(sn=null,Be=0,Bl()),m}function B1(){for(;Ne!==null;)oh(Ne)}function Z1(e,n){var t=Ye;Ye|=2;var i=lh(),o=sh();sn!==e||Be!==n?(ys=null,zs=zn()+500,rr(e,n)):tr=ii(e,n);e:do try{if(en!==0&&Ne!==null){n=Ne;var c=dt;n:switch(en){case 1:en=0,dt=null,lr(e,n,c,1);break;case 2:case 9:if(zf(c)){en=0,dt=null,ch(n);break}n=function(){en!==2&&en!==9||sn!==e||(en=7),Ht(e)},c.then(n,n);break e;case 3:en=7;break e;case 4:en=5;break e;case 7:zf(c)?(en=0,dt=null,ch(n)):(en=0,dt=null,lr(e,n,c,7));break;case 5:var m=null;switch(Ne.tag){case 26:m=Ne.memoizedState;case 5:case 27:var y=Ne;if(m?Yh(m):y.stateNode.complete){en=0,dt=null;var w=y.sibling;if(w!==null)Ne=w;else{var M=y.return;M!==null?(Ne=M,Es(M)):Ne=null}break n}}en=0,dt=null,lr(e,n,c,5);break;case 6:en=0,dt=null,lr(e,n,c,6);break;case 8:Uc(),En=6;break e;default:throw Error(s(462))}}j1();break}catch(B){ih(e,B)}while(!0);return aa=hi=null,C.H=i,C.A=o,Ye=t,Ne!==null?0:(sn=null,Be=0,Bl(),En)}function j1(){for(;Ne!==null&&!vr();)oh(Ne)}function oh(e){var n=Mp(e.alternate,e,pa);e.memoizedProps=e.pendingProps,n===null?Es(e):Ne=n}function ch(e){var n=e,t=n.alternate;switch(n.tag){case 15:case 0:n=Tp(t,n,n.pendingProps,n.type,void 0,Be);break;case 11:n=Tp(t,n,n.pendingProps,n.type.render,n.ref,Be);break;case 5:tc(n);default:Lp(t,n),n=Ne=sf(n,pa),n=Mp(t,n,pa)}e.memoizedProps=e.pendingProps,n===null?Es(e):Ne=n}function lr(e,n,t,i){aa=hi=null,tc(n),Fi=null,Wr=0;var o=n.return;try{if(I1(e,o,n,t,Be)){En=1,cs(e,Dt(t,e.current)),Ne=null;return}}catch(c){if(o!==null)throw Ne=o,c;En=1,cs(e,Dt(t,e.current)),Ne=null;return}n.flags&32768?(je||i===1?e=!0:tr||(Be&536870912)!==0?e=!1:(Oa=e=!0,(i===2||i===9||i===3||i===6)&&(i=ct.current,i!==null&&i.tag===13&&(i.flags|=16384))),uh(n,e)):Es(n)}function Es(e){var n=e;do{if((n.flags&32768)!==0){uh(n,Oa);return}e=n.return;var t=L1(n.alternate,n,pa);if(t!==null){Ne=t;return}if(n=n.sibling,n!==null){Ne=n;return}Ne=n=e}while(n!==null);En===0&&(En=5)}function uh(e,n){do{var t=W1(e.alternate,e);if(t!==null){t.flags&=32767,Ne=t;return}if(t=e.return,t!==null&&(t.flags|=32768,t.subtreeFlags=0,t.deletions=null),!n&&(e=e.sibling,e!==null)){Ne=e;return}Ne=e=t}while(e!==null);En=6,Ne=null}function dh(e,n,t,i,o,c,m,y,w){e.cancelPendingCommit=null;do Ds();while(Cn!==0);if((Ye&6)!==0)throw Error(s(327));if(n!==null){if(n===e.current)throw Error(s(177));if(c=n.lanes|n.childLanes,c|=Ro,lo(e,t,c,m,y,w),e===sn&&(Ne=sn=null,Be=0),ir=n,Xa=e,ha=t,Pc=c,Nc=o,eh=i,(n.subtreeFlags&10256)!==0||(n.flags&10256)!==0?(e.callbackNode=null,e.callbackPriority=0,G1(Se,function(){return bh(),null})):(e.callbackNode=null,e.callbackPriority=0),i=(n.flags&13878)!==0,(n.subtreeFlags&13878)!==0||i){i=C.T,C.T=null,o=K.p,K.p=2,m=Ye,Ye|=4;try{O1(e,n,t)}finally{Ye=m,K.p=o,C.T=i}}Cn=1,fh(),ph(),hh()}}function fh(){if(Cn===1){Cn=0;var e=Xa,n=ir,t=(n.flags&13878)!==0;if((n.subtreeFlags&13878)!==0||t){t=C.T,C.T=null;var i=K.p;K.p=2;var o=Ye;Ye|=4;try{qp(n,e);var c=$c,m=Kd(e.containerInfo),y=c.focusedElem,w=c.selectionRange;if(m!==y&&y&&y.ownerDocument&&Qd(y.ownerDocument.documentElement,y)){if(w!==null&&wo(y)){var M=w.start,B=w.end;if(B===void 0&&(B=M),"selectionStart"in y)y.selectionStart=M,y.selectionEnd=Math.min(B,y.value.length);else{var G=y.ownerDocument||document,W=G&&G.defaultView||window;if(W.getSelection){var N=W.getSelection(),me=y.textContent.length,we=Math.min(w.start,me),ln=w.end===void 0?we:Math.min(w.end,me);!N.extend&&we>ln&&(m=ln,ln=we,we=m);var R=Fd(y,we),A=Fd(y,ln);if(R&&A&&(N.rangeCount!==1||N.anchorNode!==R.node||N.anchorOffset!==R.offset||N.focusNode!==A.node||N.focusOffset!==A.offset)){var I=G.createRange();I.setStart(R.node,R.offset),N.removeAllRanges(),we>ln?(N.addRange(I),N.extend(A.node,A.offset)):(I.setEnd(A.node,A.offset),N.addRange(I))}}}}for(G=[],N=y;N=N.parentNode;)N.nodeType===1&&G.push({element:N,left:N.scrollLeft,top:N.scrollTop});for(typeof y.focus=="function"&&y.focus(),y=0;y<G.length;y++){var H=G[y];H.element.scrollLeft=H.left,H.element.scrollTop=H.top}}Ws=!!Jc,$c=Jc=null}finally{Ye=o,K.p=i,C.T=t}}e.current=n,Cn=2}}function ph(){if(Cn===2){Cn=0;var e=Xa,n=ir,t=(n.flags&8772)!==0;if((n.subtreeFlags&8772)!==0||t){t=C.T,C.T=null;var i=K.p;K.p=2;var o=Ye;Ye|=4;try{Bp(e,n.alternate,n)}finally{Ye=o,K.p=i,C.T=t}}Cn=3}}function hh(){if(Cn===4||Cn===3){Cn=0,Sr();var e=Xa,n=ir,t=ha,i=eh;(n.subtreeFlags&10256)!==0||(n.flags&10256)!==0?Cn=5:(Cn=0,ir=Xa=null,mh(e,e.pendingLanes));var o=e.pendingLanes;if(o===0&&(Na=null),se(t),n=n.stateNode,yn&&typeof yn.onCommitFiberRoot=="function")try{yn.onCommitFiberRoot(mn,n,void 0,(n.current.flags&128)===128)}catch{}if(i!==null){n=C.T,o=K.p,K.p=2,C.T=null;try{for(var c=e.onRecoverableError,m=0;m<i.length;m++){var y=i[m];c(y.value,{componentStack:y.stack})}}finally{C.T=n,K.p=o}}(ha&3)!==0&&Ds(),Ht(e),o=e.pendingLanes,(t&261930)!==0&&(o&42)!==0?e===Xc?Jr++:(Jr=0,Xc=e):Jr=0,$r(0)}}function mh(e,n){(e.pooledCacheLanes&=n)===0&&(n=e.pooledCache,n!=null&&(e.pooledCache=null,Cr(n)))}function Ds(){return fh(),ph(),hh(),bh()}function bh(){if(Cn!==5)return!1;var e=Xa,n=Pc;Pc=0;var t=se(ha),i=C.T,o=K.p;try{K.p=32>t?32:t,C.T=null,t=Nc,Nc=null;var c=Xa,m=ha;if(Cn=0,ir=Xa=null,ha=0,(Ye&6)!==0)throw Error(s(331));var y=Ye;if(Ye|=4,Kp(c.current),Yp(c,c.current,m,t),Ye=y,$r(0,!1),yn&&typeof yn.onPostCommitFiberRoot=="function")try{yn.onPostCommitFiberRoot(mn,c)}catch{}return!0}finally{K.p=o,C.T=i,mh(e,n)}}function gh(e,n,t){n=Dt(t,n),n=gc(e.stateNode,n,2),e=Ma(e,n,2),e!==null&&(li(e,2),Ht(e))}function nn(e,n,t){if(e.tag===3)gh(e,e,t);else for(;n!==null;){if(n.tag===3){gh(n,e,t);break}else if(n.tag===1){var i=n.stateNode;if(typeof n.type.getDerivedStateFromError=="function"||typeof i.componentDidCatch=="function"&&(Na===null||!Na.has(i))){e=Dt(t,e),t=zp(2),i=Ma(n,t,2),i!==null&&(yp(t,i,n,e),li(i,2),Ht(i));break}}n=n.return}}function Zc(e,n,t){var i=e.pingCache;if(i===null){i=e.pingCache=new X1;var o=new Set;i.set(n,o)}else o=i.get(n),o===void 0&&(o=new Set,i.set(n,o));o.has(t)||(Lc=!0,o.add(t),e=V1.bind(null,e,n,t),n.then(e,e))}function V1(e,n,t){var i=e.pingCache;i!==null&&i.delete(n),e.pingedLanes|=e.suspendedLanes&t,e.warmLanes&=~t,sn===e&&(Be&t)===t&&(En===4||En===3&&(Be&62914560)===Be&&300>zn()-gs?(Ye&2)===0&&rr(e,0):Wc|=t,ar===Be&&(ar=0)),Ht(e)}function zh(e,n){n===0&&(n=ri()),e=di(e,n),e!==null&&(li(e,n),Ht(e))}function H1(e){var n=e.memoizedState,t=0;n!==null&&(t=n.retryLane),zh(e,t)}function q1(e,n){var t=0;switch(e.tag){case 31:case 13:var i=e.stateNode,o=e.memoizedState;o!==null&&(t=o.retryLane);break;case 19:i=e.stateNode;break;case 22:i=e.stateNode._retryCache;break;default:throw Error(s(314))}i!==null&&i.delete(n),zh(e,t)}function G1(e,n){return va(e,n)}var ws=null,sr=null,jc=!1,xs=!1,Vc=!1,Ba=0;function Ht(e){e!==sr&&e.next===null&&(sr===null?ws=sr=e:sr=sr.next=e),xs=!0,jc||(jc=!0,F1())}function $r(e,n){if(!Vc&&xs){Vc=!0;do for(var t=!1,i=ws;i!==null;){if(e!==0){var o=i.pendingLanes;if(o===0)var c=0;else{var m=i.suspendedLanes,y=i.pingedLanes;c=(1<<31-Ke(42|e)+1)-1,c&=o&~(m&~y),c=c&201326741?c&201326741|1:c?c|2:0}c!==0&&(t=!0,Eh(i,c))}else c=Be,c=ai(i,i===sn?c:0,i.cancelPendingCommit!==null||i.timeoutHandle!==-1),(c&3)===0||ii(i,c)||(t=!0,Eh(i,c));i=i.next}while(t);Vc=!1}}function Y1(){yh()}function yh(){xs=jc=!1;var e=0;Ba!==0&&rz()&&(e=Ba);for(var n=zn(),t=null,i=ws;i!==null;){var o=i.next,c=vh(i,n);c===0?(i.next=null,t===null?ws=o:t.next=o,o===null&&(sr=t)):(t=i,(e!==0||(c&3)!==0)&&(xs=!0)),i=o}Cn!==0&&Cn!==5||$r(e),Ba!==0&&(Ba=0)}function vh(e,n){for(var t=e.suspendedLanes,i=e.pingedLanes,o=e.expirationTimes,c=e.pendingLanes&-62914561;0<c;){var m=31-Ke(c),y=1<<m,w=o[m];w===-1?((y&t)===0||(y&i)!==0)&&(o[m]=Il(y,n)):w<=n&&(e.expiredLanes|=y),c&=~y}if(n=sn,t=Be,t=ai(e,e===n?t:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),i=e.callbackNode,t===0||e===n&&(en===2||en===9)||e.cancelPendingCommit!==null)return i!==null&&i!==null&&ni(i),e.callbackNode=null,e.callbackPriority=0;if((t&3)===0||ii(e,t)){if(n=t&-t,n===e.callbackPriority)return n;switch(i!==null&&ni(i),se(t)){case 2:case 8:t=ae;break;case 32:t=Se;break;case 268435456:t=He;break;default:t=Se}return i=Sh.bind(null,e),t=va(t,i),e.callbackPriority=n,e.callbackNode=t,n}return i!==null&&i!==null&&ni(i),e.callbackPriority=2,e.callbackNode=null,2}function Sh(e,n){if(Cn!==0&&Cn!==5)return e.callbackNode=null,e.callbackPriority=0,null;var t=e.callbackNode;if(Ds()&&e.callbackNode!==t)return null;var i=Be;return i=ai(e,e===sn?i:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),i===0?null:(th(e,i,n),vh(e,zn()),e.callbackNode!=null&&e.callbackNode===t?Sh.bind(null,e):null)}function Eh(e,n){if(Ds())return null;th(e,n,!0)}function F1(){sz(function(){(Ye&6)!==0?va(V,Y1):yh()})}function Hc(){if(Ba===0){var e=qi;e===0&&(e=ti,ti<<=1,(ti&261888)===0&&(ti=256)),Ba=e}return Ba}function Dh(e){return e==null||typeof e=="symbol"||typeof e=="boolean"?null:typeof e=="function"?e:Cl(""+e)}function wh(e,n){var t=n.ownerDocument.createElement("input");return t.name=n.name,t.value=n.value,e.id&&t.setAttribute("form",e.id),n.parentNode.insertBefore(t,n),e=new FormData(e),t.parentNode.removeChild(t),e}function Q1(e,n,t,i,o){if(n==="submit"&&t&&t.stateNode===o){var c=Dh((o[oe]||null).action),m=i.submitter;m&&(n=(n=m[oe]||null)?Dh(n.formAction):m.getAttribute("formAction"),n!==null&&(c=n,m=null));var y=new Pl("action","action",null,i,o);e.push({event:y,listeners:[{instance:null,listener:function(){if(i.defaultPrevented){if(Ba!==0){var w=m?wh(o,m):new FormData(o);dc(t,{pending:!0,data:w,method:o.method,action:c},null,w)}}else typeof c=="function"&&(y.preventDefault(),w=m?wh(o,m):new FormData(o),dc(t,{pending:!0,data:w,method:o.method,action:c},c,w))},currentTarget:o}]})}}for(var qc=0;qc<ko.length;qc++){var Gc=ko[qc],K1=Gc.toLowerCase(),J1=Gc[0].toUpperCase()+Gc.slice(1);Ot(K1,"on"+J1)}Ot(ef,"onAnimationEnd"),Ot(nf,"onAnimationIteration"),Ot(tf,"onAnimationStart"),Ot("dblclick","onDoubleClick"),Ot("focusin","onFocus"),Ot("focusout","onBlur"),Ot(h1,"onTransitionRun"),Ot(m1,"onTransitionStart"),Ot(b1,"onTransitionCancel"),Ot(af,"onTransitionEnd"),Lt("onMouseEnter",["mouseout","mouseover"]),Lt("onMouseLeave",["mouseout","mouseover"]),Lt("onPointerEnter",["pointerout","pointerover"]),Lt("onPointerLeave",["pointerout","pointerover"]),yt("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),yt("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),yt("onBeforeInput",["compositionend","keypress","textInput","paste"]),yt("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),yt("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),yt("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var el="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),$1=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(el));function xh(e,n){n=(n&4)!==0;for(var t=0;t<e.length;t++){var i=e[t],o=i.event;i=i.listeners;e:{var c=void 0;if(n)for(var m=i.length-1;0<=m;m--){var y=i[m],w=y.instance,M=y.currentTarget;if(y=y.listener,w!==c&&o.isPropagationStopped())break e;c=y,o.currentTarget=M;try{c(o)}catch(B){Ul(B)}o.currentTarget=null,c=w}else for(m=0;m<i.length;m++){if(y=i[m],w=y.instance,M=y.currentTarget,y=y.listener,w!==c&&o.isPropagationStopped())break e;c=y,o.currentTarget=M;try{c(o)}catch(B){Ul(B)}o.currentTarget=null,c=w}}}}function Xe(e,n){var t=n[Re];t===void 0&&(t=n[Re]=new Set);var i=e+"__bubble";t.has(i)||(Th(n,e,2,!1),t.add(i))}function Yc(e,n,t){var i=0;n&&(i|=4),Th(t,e,i,n)}var Ts="_reactListening"+Math.random().toString(36).slice(2);function Fc(e){if(!e[Ts]){e[Ts]=!0,wa.forEach(function(t){t!=="selectionchange"&&($1.has(t)||Yc(t,!1,e),Yc(t,!0,e))});var n=e.nodeType===9?e:e.ownerDocument;n===null||n[Ts]||(n[Ts]=!0,Yc("selectionchange",!1,n))}}function Th(e,n,t,i){switch(nm(n)){case 2:var o=Az;break;case 8:o=kz;break;default:o=uu}t=o.bind(null,n,t,e),o=void 0,!mo||n!=="touchstart"&&n!=="touchmove"&&n!=="wheel"||(o=!0),i?o!==void 0?e.addEventListener(n,t,{capture:!0,passive:o}):e.addEventListener(n,t,!0):o!==void 0?e.addEventListener(n,t,{passive:o}):e.addEventListener(n,t,!1)}function Qc(e,n,t,i,o){var c=i;if((n&1)===0&&(n&2)===0&&i!==null)e:for(;;){if(i===null)return;var m=i.tag;if(m===3||m===4){var y=i.stateNode.containerInfo;if(y===o)break;if(m===4)for(m=i.return;m!==null;){var w=m.tag;if((w===3||w===4)&&m.stateNode.containerInfo===o)return;m=m.return}for(;y!==null;){if(m=lt(y),m===null)return;if(w=m.tag,w===5||w===6||w===26||w===27){i=c=m;continue e}y=y.parentNode}}i=i.return}_d(function(){var M=c,B=po(t),G=[];e:{var W=rf.get(e);if(W!==void 0){var N=Pl,me=e;switch(e){case"keypress":if(Wl(t)===0)break e;case"keydown":case"keyup":N=qg;break;case"focusin":me="focus",N=yo;break;case"focusout":me="blur",N=yo;break;case"beforeblur":case"afterblur":N=yo;break;case"click":if(t.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":N=Cd;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":N=Lg;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":N=Fg;break;case ef:case nf:case tf:N=Pg;break;case af:N=Kg;break;case"scroll":case"scrollend":N=Mg;break;case"wheel":N=$g;break;case"copy":case"cut":case"paste":N=Xg;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":N=Wd;break;case"toggle":case"beforetoggle":N=n1}var we=(n&4)!==0,ln=!we&&(e==="scroll"||e==="scrollend"),R=we?W!==null?W+"Capture":null:W;we=[];for(var A=M,I;A!==null;){var H=A;if(I=H.stateNode,H=H.tag,H!==5&&H!==26&&H!==27||I===null||R===null||(H=Er(A,R),H!=null&&we.push(nl(A,H,I))),ln)break;A=A.return}0<we.length&&(W=new N(W,me,null,t,B),G.push({event:W,listeners:we}))}}if((n&7)===0){e:{if(W=e==="mouseover"||e==="pointerover",N=e==="mouseout"||e==="pointerout",W&&t!==fo&&(me=t.relatedTarget||t.fromElement)&&(lt(me)||me[be]))break e;if((N||W)&&(W=B.window===B?B:(W=B.ownerDocument)?W.defaultView||W.parentWindow:window,N?(me=t.relatedTarget||t.toElement,N=M,me=me?lt(me):null,me!==null&&(ln=d(me),we=me.tag,me!==ln||we!==5&&we!==27&&we!==6)&&(me=null)):(N=null,me=M),N!==me)){if(we=Cd,H="onMouseLeave",R="onMouseEnter",A="mouse",(e==="pointerout"||e==="pointerover")&&(we=Wd,H="onPointerLeave",R="onPointerEnter",A="pointer"),ln=N==null?W:Vn(N),I=me==null?W:Vn(me),W=new we(H,A+"leave",N,t,B),W.target=ln,W.relatedTarget=I,H=null,lt(B)===M&&(we=new we(R,A+"enter",me,t,B),we.target=I,we.relatedTarget=ln,H=we),ln=H,N&&me)n:{for(we=ez,R=N,A=me,I=0,H=R;H;H=we(H))I++;H=0;for(var De=A;De;De=we(De))H++;for(;0<I-H;)R=we(R),I--;for(;0<H-I;)A=we(A),H--;for(;I--;){if(R===A||A!==null&&R===A.alternate){we=R;break n}R=we(R),A=we(A)}we=null}else we=null;N!==null&&Ah(G,W,N,we,!1),me!==null&&ln!==null&&Ah(G,ln,me,we,!0)}}e:{if(W=M?Vn(M):window,N=W.nodeName&&W.nodeName.toLowerCase(),N==="select"||N==="input"&&W.type==="file")var qe=jd;else if(Bd(W))if(Vd)qe=d1;else{qe=c1;var ve=o1}else N=W.nodeName,!N||N.toLowerCase()!=="input"||W.type!=="checkbox"&&W.type!=="radio"?M&&uo(M.elementType)&&(qe=jd):qe=u1;if(qe&&(qe=qe(e,M))){Zd(G,qe,t,B);break e}ve&&ve(e,W,M),e==="focusout"&&M&&W.type==="number"&&M.memoizedProps.value!=null&&co(W,"number",W.value)}switch(ve=M?Vn(M):window,e){case"focusin":(Bd(ve)||ve.contentEditable==="true")&&(Ni=ve,xo=M,_r=null);break;case"focusout":_r=xo=Ni=null;break;case"mousedown":To=!0;break;case"contextmenu":case"mouseup":case"dragend":To=!1,Jd(G,t,B);break;case"selectionchange":if(p1)break;case"keydown":case"keyup":Jd(G,t,B)}var Le;if(So)e:{switch(e){case"compositionstart":var Ze="onCompositionStart";break e;case"compositionend":Ze="onCompositionEnd";break e;case"compositionupdate":Ze="onCompositionUpdate";break e}Ze=void 0}else Pi?Xd(e,t)&&(Ze="onCompositionEnd"):e==="keydown"&&t.keyCode===229&&(Ze="onCompositionStart");Ze&&(Od&&t.locale!=="ko"&&(Pi||Ze!=="onCompositionStart"?Ze==="onCompositionEnd"&&Pi&&(Le=Id()):(xa=B,bo="value"in xa?xa.value:xa.textContent,Pi=!0)),ve=As(M,Ze),0<ve.length&&(Ze=new Ld(Ze,e,null,t,B),G.push({event:Ze,listeners:ve}),Le?Ze.data=Le:(Le=Ud(t),Le!==null&&(Ze.data=Le)))),(Le=a1?i1(e,t):r1(e,t))&&(Ze=As(M,"onBeforeInput"),0<Ze.length&&(ve=new Ld("onBeforeInput","beforeinput",null,t,B),G.push({event:ve,listeners:Ze}),ve.data=Le)),Q1(G,e,M,t,B)}xh(G,n)})}function nl(e,n,t){return{instance:e,listener:n,currentTarget:t}}function As(e,n){for(var t=n+"Capture",i=[];e!==null;){var o=e,c=o.stateNode;if(o=o.tag,o!==5&&o!==26&&o!==27||c===null||(o=Er(e,t),o!=null&&i.unshift(nl(e,o,c)),o=Er(e,n),o!=null&&i.push(nl(e,o,c))),e.tag===3)return i;e=e.return}return[]}function ez(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function Ah(e,n,t,i,o){for(var c=n._reactName,m=[];t!==null&&t!==i;){var y=t,w=y.alternate,M=y.stateNode;if(y=y.tag,w!==null&&w===i)break;y!==5&&y!==26&&y!==27||M===null||(w=M,o?(M=Er(t,c),M!=null&&m.unshift(nl(t,M,w))):o||(M=Er(t,c),M!=null&&m.push(nl(t,M,w)))),t=t.return}m.length!==0&&e.push({event:n,listeners:m})}var nz=/\r\n?/g,tz=/\u0000|\uFFFD/g;function kh(e){return(typeof e=="string"?e:""+e).replace(nz,`
`).replace(tz,"")}function Rh(e,n){return n=kh(n),kh(e)===n}function rn(e,n,t,i,o,c){switch(t){case"children":typeof i=="string"?n==="body"||n==="textarea"&&i===""||Li(e,i):(typeof i=="number"||typeof i=="bigint")&&n!=="body"&&Li(e,""+i);break;case"className":Wt(e,"class",i);break;case"tabIndex":Wt(e,"tabindex",i);break;case"dir":case"role":case"viewBox":case"width":case"height":Wt(e,t,i);break;case"style":kd(e,i,c);break;case"data":if(n!=="object"){Wt(e,"data",i);break}case"src":case"href":if(i===""&&(n!=="a"||t!=="href")){e.removeAttribute(t);break}if(i==null||typeof i=="function"||typeof i=="symbol"||typeof i=="boolean"){e.removeAttribute(t);break}i=Cl(""+i),e.setAttribute(t,i);break;case"action":case"formAction":if(typeof i=="function"){e.setAttribute(t,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof c=="function"&&(t==="formAction"?(n!=="input"&&rn(e,n,"name",o.name,o,null),rn(e,n,"formEncType",o.formEncType,o,null),rn(e,n,"formMethod",o.formMethod,o,null),rn(e,n,"formTarget",o.formTarget,o,null)):(rn(e,n,"encType",o.encType,o,null),rn(e,n,"method",o.method,o,null),rn(e,n,"target",o.target,o,null)));if(i==null||typeof i=="symbol"||typeof i=="boolean"){e.removeAttribute(t);break}i=Cl(""+i),e.setAttribute(t,i);break;case"onClick":i!=null&&(e.onclick=$t);break;case"onScroll":i!=null&&Xe("scroll",e);break;case"onScrollEnd":i!=null&&Xe("scrollend",e);break;case"dangerouslySetInnerHTML":if(i!=null){if(typeof i!="object"||!("__html"in i))throw Error(s(61));if(t=i.__html,t!=null){if(o.children!=null)throw Error(s(60));e.innerHTML=t}}break;case"multiple":e.multiple=i&&typeof i!="function"&&typeof i!="symbol";break;case"muted":e.muted=i&&typeof i!="function"&&typeof i!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(i==null||typeof i=="function"||typeof i=="boolean"||typeof i=="symbol"){e.removeAttribute("xlink:href");break}t=Cl(""+i),e.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",t);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":i!=null&&typeof i!="function"&&typeof i!="symbol"?e.setAttribute(t,""+i):e.removeAttribute(t);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":i&&typeof i!="function"&&typeof i!="symbol"?e.setAttribute(t,""):e.removeAttribute(t);break;case"capture":case"download":i===!0?e.setAttribute(t,""):i!==!1&&i!=null&&typeof i!="function"&&typeof i!="symbol"?e.setAttribute(t,i):e.removeAttribute(t);break;case"cols":case"rows":case"size":case"span":i!=null&&typeof i!="function"&&typeof i!="symbol"&&!isNaN(i)&&1<=i?e.setAttribute(t,i):e.removeAttribute(t);break;case"rowSpan":case"start":i==null||typeof i=="function"||typeof i=="symbol"||isNaN(i)?e.removeAttribute(t):e.setAttribute(t,i);break;case"popover":Xe("beforetoggle",e),Xe("toggle",e),fn(e,"popover",i);break;case"xlinkActuate":vt(e,"http://www.w3.org/1999/xlink","xlink:actuate",i);break;case"xlinkArcrole":vt(e,"http://www.w3.org/1999/xlink","xlink:arcrole",i);break;case"xlinkRole":vt(e,"http://www.w3.org/1999/xlink","xlink:role",i);break;case"xlinkShow":vt(e,"http://www.w3.org/1999/xlink","xlink:show",i);break;case"xlinkTitle":vt(e,"http://www.w3.org/1999/xlink","xlink:title",i);break;case"xlinkType":vt(e,"http://www.w3.org/1999/xlink","xlink:type",i);break;case"xmlBase":vt(e,"http://www.w3.org/XML/1998/namespace","xml:base",i);break;case"xmlLang":vt(e,"http://www.w3.org/XML/1998/namespace","xml:lang",i);break;case"xmlSpace":vt(e,"http://www.w3.org/XML/1998/namespace","xml:space",i);break;case"is":fn(e,"is",i);break;case"innerText":case"textContent":break;default:(!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(t=_g.get(t)||t,fn(e,t,i))}}function Kc(e,n,t,i,o,c){switch(t){case"style":kd(e,i,c);break;case"dangerouslySetInnerHTML":if(i!=null){if(typeof i!="object"||!("__html"in i))throw Error(s(61));if(t=i.__html,t!=null){if(o.children!=null)throw Error(s(60));e.innerHTML=t}}break;case"children":typeof i=="string"?Li(e,i):(typeof i=="number"||typeof i=="bigint")&&Li(e,""+i);break;case"onScroll":i!=null&&Xe("scroll",e);break;case"onScrollEnd":i!=null&&Xe("scrollend",e);break;case"onClick":i!=null&&(e.onclick=$t);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!Bt.hasOwnProperty(t))e:{if(t[0]==="o"&&t[1]==="n"&&(o=t.endsWith("Capture"),n=t.slice(2,o?t.length-7:void 0),c=e[oe]||null,c=c!=null?c[t]:null,typeof c=="function"&&e.removeEventListener(n,c,o),typeof i=="function")){typeof c!="function"&&c!==null&&(t in e?e[t]=null:e.hasAttribute(t)&&e.removeAttribute(t)),e.addEventListener(n,i,o);break e}t in e?e[t]=i:i===!0?e.setAttribute(t,""):fn(e,t,i)}}}function Bn(e,n,t){switch(n){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":Xe("error",e),Xe("load",e);var i=!1,o=!1,c;for(c in t)if(t.hasOwnProperty(c)){var m=t[c];if(m!=null)switch(c){case"src":i=!0;break;case"srcSet":o=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(s(137,n));default:rn(e,n,c,m,t,null)}}o&&rn(e,n,"srcSet",t.srcSet,t,null),i&&rn(e,n,"src",t.src,t,null);return;case"input":Xe("invalid",e);var y=c=m=o=null,w=null,M=null;for(i in t)if(t.hasOwnProperty(i)){var B=t[i];if(B!=null)switch(i){case"name":o=B;break;case"type":m=B;break;case"checked":w=B;break;case"defaultChecked":M=B;break;case"value":c=B;break;case"defaultValue":y=B;break;case"children":case"dangerouslySetInnerHTML":if(B!=null)throw Error(s(137,n));break;default:rn(e,n,i,B,t,null)}}wd(e,c,y,w,M,m,o,!1);return;case"select":Xe("invalid",e),i=m=c=null;for(o in t)if(t.hasOwnProperty(o)&&(y=t[o],y!=null))switch(o){case"value":c=y;break;case"defaultValue":m=y;break;case"multiple":i=y;default:rn(e,n,o,y,t,null)}n=c,t=m,e.multiple=!!i,n!=null?Ci(e,!!i,n,!1):t!=null&&Ci(e,!!i,t,!0);return;case"textarea":Xe("invalid",e),c=o=i=null;for(m in t)if(t.hasOwnProperty(m)&&(y=t[m],y!=null))switch(m){case"value":i=y;break;case"defaultValue":o=y;break;case"children":c=y;break;case"dangerouslySetInnerHTML":if(y!=null)throw Error(s(91));break;default:rn(e,n,m,y,t,null)}Td(e,i,o,c);return;case"option":for(w in t)t.hasOwnProperty(w)&&(i=t[w],i!=null)&&(w==="selected"?e.selected=i&&typeof i!="function"&&typeof i!="symbol":rn(e,n,w,i,t,null));return;case"dialog":Xe("beforetoggle",e),Xe("toggle",e),Xe("cancel",e),Xe("close",e);break;case"iframe":case"object":Xe("load",e);break;case"video":case"audio":for(i=0;i<el.length;i++)Xe(el[i],e);break;case"image":Xe("error",e),Xe("load",e);break;case"details":Xe("toggle",e);break;case"embed":case"source":case"link":Xe("error",e),Xe("load",e);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(M in t)if(t.hasOwnProperty(M)&&(i=t[M],i!=null))switch(M){case"children":case"dangerouslySetInnerHTML":throw Error(s(137,n));default:rn(e,n,M,i,t,null)}return;default:if(uo(n)){for(B in t)t.hasOwnProperty(B)&&(i=t[B],i!==void 0&&Kc(e,n,B,i,t,void 0));return}}for(y in t)t.hasOwnProperty(y)&&(i=t[y],i!=null&&rn(e,n,y,i,t,null))}function az(e,n,t,i){switch(n){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var o=null,c=null,m=null,y=null,w=null,M=null,B=null;for(N in t){var G=t[N];if(t.hasOwnProperty(N)&&G!=null)switch(N){case"checked":break;case"value":break;case"defaultValue":w=G;default:i.hasOwnProperty(N)||rn(e,n,N,null,i,G)}}for(var W in i){var N=i[W];if(G=t[W],i.hasOwnProperty(W)&&(N!=null||G!=null))switch(W){case"type":c=N;break;case"name":o=N;break;case"checked":M=N;break;case"defaultChecked":B=N;break;case"value":m=N;break;case"defaultValue":y=N;break;case"children":case"dangerouslySetInnerHTML":if(N!=null)throw Error(s(137,n));break;default:N!==G&&rn(e,n,W,N,i,G)}}oo(e,m,y,w,M,B,c,o);return;case"select":N=m=y=W=null;for(c in t)if(w=t[c],t.hasOwnProperty(c)&&w!=null)switch(c){case"value":break;case"multiple":N=w;default:i.hasOwnProperty(c)||rn(e,n,c,null,i,w)}for(o in i)if(c=i[o],w=t[o],i.hasOwnProperty(o)&&(c!=null||w!=null))switch(o){case"value":W=c;break;case"defaultValue":y=c;break;case"multiple":m=c;default:c!==w&&rn(e,n,o,c,i,w)}n=y,t=m,i=N,W!=null?Ci(e,!!t,W,!1):!!i!=!!t&&(n!=null?Ci(e,!!t,n,!0):Ci(e,!!t,t?[]:"",!1));return;case"textarea":N=W=null;for(y in t)if(o=t[y],t.hasOwnProperty(y)&&o!=null&&!i.hasOwnProperty(y))switch(y){case"value":break;case"children":break;default:rn(e,n,y,null,i,o)}for(m in i)if(o=i[m],c=t[m],i.hasOwnProperty(m)&&(o!=null||c!=null))switch(m){case"value":W=o;break;case"defaultValue":N=o;break;case"children":break;case"dangerouslySetInnerHTML":if(o!=null)throw Error(s(91));break;default:o!==c&&rn(e,n,m,o,i,c)}xd(e,W,N);return;case"option":for(var me in t)W=t[me],t.hasOwnProperty(me)&&W!=null&&!i.hasOwnProperty(me)&&(me==="selected"?e.selected=!1:rn(e,n,me,null,i,W));for(w in i)W=i[w],N=t[w],i.hasOwnProperty(w)&&W!==N&&(W!=null||N!=null)&&(w==="selected"?e.selected=W&&typeof W!="function"&&typeof W!="symbol":rn(e,n,w,W,i,N));return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var we in t)W=t[we],t.hasOwnProperty(we)&&W!=null&&!i.hasOwnProperty(we)&&rn(e,n,we,null,i,W);for(M in i)if(W=i[M],N=t[M],i.hasOwnProperty(M)&&W!==N&&(W!=null||N!=null))switch(M){case"children":case"dangerouslySetInnerHTML":if(W!=null)throw Error(s(137,n));break;default:rn(e,n,M,W,i,N)}return;default:if(uo(n)){for(var ln in t)W=t[ln],t.hasOwnProperty(ln)&&W!==void 0&&!i.hasOwnProperty(ln)&&Kc(e,n,ln,void 0,i,W);for(B in i)W=i[B],N=t[B],!i.hasOwnProperty(B)||W===N||W===void 0&&N===void 0||Kc(e,n,B,W,i,N);return}}for(var R in t)W=t[R],t.hasOwnProperty(R)&&W!=null&&!i.hasOwnProperty(R)&&rn(e,n,R,null,i,W);for(G in i)W=i[G],N=t[G],!i.hasOwnProperty(G)||W===N||W==null&&N==null||rn(e,n,G,W,i,N)}function _h(e){switch(e){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function iz(){if(typeof performance.getEntriesByType=="function"){for(var e=0,n=0,t=performance.getEntriesByType("resource"),i=0;i<t.length;i++){var o=t[i],c=o.transferSize,m=o.initiatorType,y=o.duration;if(c&&y&&_h(m)){for(m=0,y=o.responseEnd,i+=1;i<t.length;i++){var w=t[i],M=w.startTime;if(M>y)break;var B=w.transferSize,G=w.initiatorType;B&&_h(G)&&(w=w.responseEnd,m+=B*(w<y?1:(y-M)/(w-M)))}if(--i,n+=8*(c+m)/(o.duration/1e3),e++,10<e)break}}if(0<e)return n/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e=="number")?e:5}var Jc=null,$c=null;function ks(e){return e.nodeType===9?e:e.ownerDocument}function Ih(e){switch(e){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function Mh(e,n){if(e===0)switch(n){case"svg":return 1;case"math":return 2;default:return 0}return e===1&&n==="foreignObject"?0:e}function eu(e,n){return e==="textarea"||e==="noscript"||typeof n.children=="string"||typeof n.children=="number"||typeof n.children=="bigint"||typeof n.dangerouslySetInnerHTML=="object"&&n.dangerouslySetInnerHTML!==null&&n.dangerouslySetInnerHTML.__html!=null}var nu=null;function rz(){var e=window.event;return e&&e.type==="popstate"?e===nu?!1:(nu=e,!0):(nu=null,!1)}var Ch=typeof setTimeout=="function"?setTimeout:void 0,lz=typeof clearTimeout=="function"?clearTimeout:void 0,Lh=typeof Promise=="function"?Promise:void 0,sz=typeof queueMicrotask=="function"?queueMicrotask:typeof Lh<"u"?function(e){return Lh.resolve(null).then(e).catch(oz)}:Ch;function oz(e){setTimeout(function(){throw e})}function Za(e){return e==="head"}function Wh(e,n){var t=n,i=0;do{var o=t.nextSibling;if(e.removeChild(t),o&&o.nodeType===8)if(t=o.data,t==="/$"||t==="/&"){if(i===0){e.removeChild(o),dr(n);return}i--}else if(t==="$"||t==="$?"||t==="$~"||t==="$!"||t==="&")i++;else if(t==="html")tl(e.ownerDocument.documentElement);else if(t==="head"){t=e.ownerDocument.head,tl(t);for(var c=t.firstChild;c;){var m=c.nextSibling,y=c.nodeName;c[Pe]||y==="SCRIPT"||y==="STYLE"||y==="LINK"&&c.rel.toLowerCase()==="stylesheet"||t.removeChild(c),c=m}}else t==="body"&&tl(e.ownerDocument.body);t=o}while(t);dr(n)}function Oh(e,n){var t=e;e=0;do{var i=t.nextSibling;if(t.nodeType===1?n?(t._stashedDisplay=t.style.display,t.style.display="none"):(t.style.display=t._stashedDisplay||"",t.getAttribute("style")===""&&t.removeAttribute("style")):t.nodeType===3&&(n?(t._stashedText=t.nodeValue,t.nodeValue=""):t.nodeValue=t._stashedText||""),i&&i.nodeType===8)if(t=i.data,t==="/$"){if(e===0)break;e--}else t!=="$"&&t!=="$?"&&t!=="$~"&&t!=="$!"||e++;t=i}while(t)}function tu(e){var n=e.firstChild;for(n&&n.nodeType===10&&(n=n.nextSibling);n;){var t=n;switch(n=n.nextSibling,t.nodeName){case"HTML":case"HEAD":case"BODY":tu(t),on(t);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(t.rel.toLowerCase()==="stylesheet")continue}e.removeChild(t)}}function cz(e,n,t,i){for(;e.nodeType===1;){var o=t;if(e.nodeName.toLowerCase()!==n.toLowerCase()){if(!i&&(e.nodeName!=="INPUT"||e.type!=="hidden"))break}else if(i){if(!e[Pe])switch(n){case"meta":if(!e.hasAttribute("itemprop"))break;return e;case"link":if(c=e.getAttribute("rel"),c==="stylesheet"&&e.hasAttribute("data-precedence"))break;if(c!==o.rel||e.getAttribute("href")!==(o.href==null||o.href===""?null:o.href)||e.getAttribute("crossorigin")!==(o.crossOrigin==null?null:o.crossOrigin)||e.getAttribute("title")!==(o.title==null?null:o.title))break;return e;case"style":if(e.hasAttribute("data-precedence"))break;return e;case"script":if(c=e.getAttribute("src"),(c!==(o.src==null?null:o.src)||e.getAttribute("type")!==(o.type==null?null:o.type)||e.getAttribute("crossorigin")!==(o.crossOrigin==null?null:o.crossOrigin))&&c&&e.hasAttribute("async")&&!e.hasAttribute("itemprop"))break;return e;default:return e}}else if(n==="input"&&e.type==="hidden"){var c=o.name==null?null:""+o.name;if(o.type==="hidden"&&e.getAttribute("name")===c)return e}else return e;if(e=kt(e.nextSibling),e===null)break}return null}function uz(e,n,t){if(n==="")return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!t||(e=kt(e.nextSibling),e===null))return null;return e}function Ph(e,n){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!n||(e=kt(e.nextSibling),e===null))return null;return e}function au(e){return e.data==="$?"||e.data==="$~"}function iu(e){return e.data==="$!"||e.data==="$?"&&e.ownerDocument.readyState!=="loading"}function dz(e,n){var t=e.ownerDocument;if(e.data==="$~")e._reactRetry=n;else if(e.data!=="$?"||t.readyState!=="loading")n();else{var i=function(){n(),t.removeEventListener("DOMContentLoaded",i)};t.addEventListener("DOMContentLoaded",i),e._reactRetry=i}}function kt(e){for(;e!=null;e=e.nextSibling){var n=e.nodeType;if(n===1||n===3)break;if(n===8){if(n=e.data,n==="$"||n==="$!"||n==="$?"||n==="$~"||n==="&"||n==="F!"||n==="F")break;if(n==="/$"||n==="/&")return null}}return e}var ru=null;function Nh(e){e=e.nextSibling;for(var n=0;e;){if(e.nodeType===8){var t=e.data;if(t==="/$"||t==="/&"){if(n===0)return kt(e.nextSibling);n--}else t!=="$"&&t!=="$!"&&t!=="$?"&&t!=="$~"&&t!=="&"||n++}e=e.nextSibling}return null}function Xh(e){e=e.previousSibling;for(var n=0;e;){if(e.nodeType===8){var t=e.data;if(t==="$"||t==="$!"||t==="$?"||t==="$~"||t==="&"){if(n===0)return e;n--}else t!=="/$"&&t!=="/&"||n++}e=e.previousSibling}return null}function Uh(e,n,t){switch(n=ks(t),e){case"html":if(e=n.documentElement,!e)throw Error(s(452));return e;case"head":if(e=n.head,!e)throw Error(s(453));return e;case"body":if(e=n.body,!e)throw Error(s(454));return e;default:throw Error(s(451))}}function tl(e){for(var n=e.attributes;n.length;)e.removeAttributeNode(n[0]);on(e)}var Rt=new Map,Bh=new Set;function Rs(e){return typeof e.getRootNode=="function"?e.getRootNode():e.nodeType===9?e:e.ownerDocument}var ma=K.d;K.d={f:fz,r:pz,D:hz,C:mz,L:bz,m:gz,X:yz,S:zz,M:vz};function fz(){var e=ma.f(),n=vs();return e||n}function pz(e){var n=zt(e);n!==null&&n.tag===5&&n.type==="form"?ip(n):ma.r(e)}var or=typeof document>"u"?null:document;function Zh(e,n,t){var i=or;if(i&&typeof n=="string"&&n){var o=St(n);o='link[rel="'+e+'"][href="'+o+'"]',typeof t=="string"&&(o+='[crossorigin="'+t+'"]'),Bh.has(o)||(Bh.add(o),e={rel:e,crossOrigin:t,href:n},i.querySelector(o)===null&&(n=i.createElement("link"),Bn(n,"link",e),vn(n),i.head.appendChild(n)))}}function hz(e){ma.D(e),Zh("dns-prefetch",e,null)}function mz(e,n){ma.C(e,n),Zh("preconnect",e,n)}function bz(e,n,t){ma.L(e,n,t);var i=or;if(i&&e&&n){var o='link[rel="preload"][as="'+St(n)+'"]';n==="image"&&t&&t.imageSrcSet?(o+='[imagesrcset="'+St(t.imageSrcSet)+'"]',typeof t.imageSizes=="string"&&(o+='[imagesizes="'+St(t.imageSizes)+'"]')):o+='[href="'+St(e)+'"]';var c=o;switch(n){case"style":c=cr(e);break;case"script":c=ur(e)}Rt.has(c)||(e=z({rel:"preload",href:n==="image"&&t&&t.imageSrcSet?void 0:e,as:n},t),Rt.set(c,e),i.querySelector(o)!==null||n==="style"&&i.querySelector(al(c))||n==="script"&&i.querySelector(il(c))||(n=i.createElement("link"),Bn(n,"link",e),vn(n),i.head.appendChild(n)))}}function gz(e,n){ma.m(e,n);var t=or;if(t&&e){var i=n&&typeof n.as=="string"?n.as:"script",o='link[rel="modulepreload"][as="'+St(i)+'"][href="'+St(e)+'"]',c=o;switch(i){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":c=ur(e)}if(!Rt.has(c)&&(e=z({rel:"modulepreload",href:e},n),Rt.set(c,e),t.querySelector(o)===null)){switch(i){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(t.querySelector(il(c)))return}i=t.createElement("link"),Bn(i,"link",e),vn(i),t.head.appendChild(i)}}}function zz(e,n,t){ma.S(e,n,t);var i=or;if(i&&e){var o=Pn(i).hoistableStyles,c=cr(e);n=n||"default";var m=o.get(c);if(!m){var y={loading:0,preload:null};if(m=i.querySelector(al(c)))y.loading=5;else{e=z({rel:"stylesheet",href:e,"data-precedence":n},t),(t=Rt.get(c))&&lu(e,t);var w=m=i.createElement("link");vn(w),Bn(w,"link",e),w._p=new Promise(function(M,B){w.onload=M,w.onerror=B}),w.addEventListener("load",function(){y.loading|=1}),w.addEventListener("error",function(){y.loading|=2}),y.loading|=4,_s(m,n,i)}m={type:"stylesheet",instance:m,count:1,state:y},o.set(c,m)}}}function yz(e,n){ma.X(e,n);var t=or;if(t&&e){var i=Pn(t).hoistableScripts,o=ur(e),c=i.get(o);c||(c=t.querySelector(il(o)),c||(e=z({src:e,async:!0},n),(n=Rt.get(o))&&su(e,n),c=t.createElement("script"),vn(c),Bn(c,"link",e),t.head.appendChild(c)),c={type:"script",instance:c,count:1,state:null},i.set(o,c))}}function vz(e,n){ma.M(e,n);var t=or;if(t&&e){var i=Pn(t).hoistableScripts,o=ur(e),c=i.get(o);c||(c=t.querySelector(il(o)),c||(e=z({src:e,async:!0,type:"module"},n),(n=Rt.get(o))&&su(e,n),c=t.createElement("script"),vn(c),Bn(c,"link",e),t.head.appendChild(c)),c={type:"script",instance:c,count:1,state:null},i.set(o,c))}}function jh(e,n,t,i){var o=(o=ge.current)?Rs(o):null;if(!o)throw Error(s(446));switch(e){case"meta":case"title":return null;case"style":return typeof t.precedence=="string"&&typeof t.href=="string"?(n=cr(t.href),t=Pn(o).hoistableStyles,i=t.get(n),i||(i={type:"style",instance:null,count:0,state:null},t.set(n,i)),i):{type:"void",instance:null,count:0,state:null};case"link":if(t.rel==="stylesheet"&&typeof t.href=="string"&&typeof t.precedence=="string"){e=cr(t.href);var c=Pn(o).hoistableStyles,m=c.get(e);if(m||(o=o.ownerDocument||o,m={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},c.set(e,m),(c=o.querySelector(al(e)))&&!c._p&&(m.instance=c,m.state.loading=5),Rt.has(e)||(t={rel:"preload",as:"style",href:t.href,crossOrigin:t.crossOrigin,integrity:t.integrity,media:t.media,hrefLang:t.hrefLang,referrerPolicy:t.referrerPolicy},Rt.set(e,t),c||Sz(o,e,t,m.state))),n&&i===null)throw Error(s(528,""));return m}if(n&&i!==null)throw Error(s(529,""));return null;case"script":return n=t.async,t=t.src,typeof t=="string"&&n&&typeof n!="function"&&typeof n!="symbol"?(n=ur(t),t=Pn(o).hoistableScripts,i=t.get(n),i||(i={type:"script",instance:null,count:0,state:null},t.set(n,i)),i):{type:"void",instance:null,count:0,state:null};default:throw Error(s(444,e))}}function cr(e){return'href="'+St(e)+'"'}function al(e){return'link[rel="stylesheet"]['+e+"]"}function Vh(e){return z({},e,{"data-precedence":e.precedence,precedence:null})}function Sz(e,n,t,i){e.querySelector('link[rel="preload"][as="style"]['+n+"]")?i.loading=1:(n=e.createElement("link"),i.preload=n,n.addEventListener("load",function(){return i.loading|=1}),n.addEventListener("error",function(){return i.loading|=2}),Bn(n,"link",t),vn(n),e.head.appendChild(n))}function ur(e){return'[src="'+St(e)+'"]'}function il(e){return"script[async]"+e}function Hh(e,n,t){if(n.count++,n.instance===null)switch(n.type){case"style":var i=e.querySelector('style[data-href~="'+St(t.href)+'"]');if(i)return n.instance=i,vn(i),i;var o=z({},t,{"data-href":t.href,"data-precedence":t.precedence,href:null,precedence:null});return i=(e.ownerDocument||e).createElement("style"),vn(i),Bn(i,"style",o),_s(i,t.precedence,e),n.instance=i;case"stylesheet":o=cr(t.href);var c=e.querySelector(al(o));if(c)return n.state.loading|=4,n.instance=c,vn(c),c;i=Vh(t),(o=Rt.get(o))&&lu(i,o),c=(e.ownerDocument||e).createElement("link"),vn(c);var m=c;return m._p=new Promise(function(y,w){m.onload=y,m.onerror=w}),Bn(c,"link",i),n.state.loading|=4,_s(c,t.precedence,e),n.instance=c;case"script":return c=ur(t.src),(o=e.querySelector(il(c)))?(n.instance=o,vn(o),o):(i=t,(o=Rt.get(c))&&(i=z({},t),su(i,o)),e=e.ownerDocument||e,o=e.createElement("script"),vn(o),Bn(o,"link",i),e.head.appendChild(o),n.instance=o);case"void":return null;default:throw Error(s(443,n.type))}else n.type==="stylesheet"&&(n.state.loading&4)===0&&(i=n.instance,n.state.loading|=4,_s(i,t.precedence,e));return n.instance}function _s(e,n,t){for(var i=t.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),o=i.length?i[i.length-1]:null,c=o,m=0;m<i.length;m++){var y=i[m];if(y.dataset.precedence===n)c=y;else if(c!==o)break}c?c.parentNode.insertBefore(e,c.nextSibling):(n=t.nodeType===9?t.head:t,n.insertBefore(e,n.firstChild))}function lu(e,n){e.crossOrigin==null&&(e.crossOrigin=n.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=n.referrerPolicy),e.title==null&&(e.title=n.title)}function su(e,n){e.crossOrigin==null&&(e.crossOrigin=n.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=n.referrerPolicy),e.integrity==null&&(e.integrity=n.integrity)}var Is=null;function qh(e,n,t){if(Is===null){var i=new Map,o=Is=new Map;o.set(t,i)}else o=Is,i=o.get(t),i||(i=new Map,o.set(t,i));if(i.has(e))return i;for(i.set(e,null),t=t.getElementsByTagName(e),o=0;o<t.length;o++){var c=t[o];if(!(c[Pe]||c[ce]||e==="link"&&c.getAttribute("rel")==="stylesheet")&&c.namespaceURI!=="http://www.w3.org/2000/svg"){var m=c.getAttribute(n)||"";m=e+m;var y=i.get(m);y?y.push(c):i.set(m,[c])}}return i}function Gh(e,n,t){e=e.ownerDocument||e,e.head.insertBefore(t,n==="title"?e.querySelector("head > title"):null)}function Ez(e,n,t){if(t===1||n.itemProp!=null)return!1;switch(e){case"meta":case"title":return!0;case"style":if(typeof n.precedence!="string"||typeof n.href!="string"||n.href==="")break;return!0;case"link":if(typeof n.rel!="string"||typeof n.href!="string"||n.href===""||n.onLoad||n.onError)break;return n.rel==="stylesheet"?(e=n.disabled,typeof n.precedence=="string"&&e==null):!0;case"script":if(n.async&&typeof n.async!="function"&&typeof n.async!="symbol"&&!n.onLoad&&!n.onError&&n.src&&typeof n.src=="string")return!0}return!1}function Yh(e){return!(e.type==="stylesheet"&&(e.state.loading&3)===0)}function Dz(e,n,t,i){if(t.type==="stylesheet"&&(typeof i.media!="string"||matchMedia(i.media).matches!==!1)&&(t.state.loading&4)===0){if(t.instance===null){var o=cr(i.href),c=n.querySelector(al(o));if(c){n=c._p,n!==null&&typeof n=="object"&&typeof n.then=="function"&&(e.count++,e=Ms.bind(e),n.then(e,e)),t.state.loading|=4,t.instance=c,vn(c);return}c=n.ownerDocument||n,i=Vh(i),(o=Rt.get(o))&&lu(i,o),c=c.createElement("link"),vn(c);var m=c;m._p=new Promise(function(y,w){m.onload=y,m.onerror=w}),Bn(c,"link",i),t.instance=c}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(t,n),(n=t.state.preload)&&(t.state.loading&3)===0&&(e.count++,t=Ms.bind(e),n.addEventListener("load",t),n.addEventListener("error",t))}}var ou=0;function wz(e,n){return e.stylesheets&&e.count===0&&Ls(e,e.stylesheets),0<e.count||0<e.imgCount?function(t){var i=setTimeout(function(){if(e.stylesheets&&Ls(e,e.stylesheets),e.unsuspend){var c=e.unsuspend;e.unsuspend=null,c()}},6e4+n);0<e.imgBytes&&ou===0&&(ou=62500*iz());var o=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&Ls(e,e.stylesheets),e.unsuspend)){var c=e.unsuspend;e.unsuspend=null,c()}},(e.imgBytes>ou?50:800)+n);return e.unsuspend=t,function(){e.unsuspend=null,clearTimeout(i),clearTimeout(o)}}:null}function Ms(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)Ls(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}}var Cs=null;function Ls(e,n){e.stylesheets=null,e.unsuspend!==null&&(e.count++,Cs=new Map,n.forEach(xz,e),Cs=null,Ms.call(e))}function xz(e,n){if(!(n.state.loading&4)){var t=Cs.get(e);if(t)var i=t.get(null);else{t=new Map,Cs.set(e,t);for(var o=e.querySelectorAll("link[data-precedence],style[data-precedence]"),c=0;c<o.length;c++){var m=o[c];(m.nodeName==="LINK"||m.getAttribute("media")!=="not all")&&(t.set(m.dataset.precedence,m),i=m)}i&&t.set(null,i)}o=n.instance,m=o.getAttribute("data-precedence"),c=t.get(m)||i,c===i&&t.set(null,o),t.set(m,o),this.count++,i=Ms.bind(this),o.addEventListener("load",i),o.addEventListener("error",i),c?c.parentNode.insertBefore(o,c.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(o,e.firstChild)),n.state.loading|=4}}var rl={$$typeof:q,Provider:null,Consumer:null,_currentValue:le,_currentValue2:le,_threadCount:0};function Tz(e,n,t,i,o,c,m,y,w){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=Da(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Da(0),this.hiddenUpdates=Da(null),this.identifierPrefix=i,this.onUncaughtError=o,this.onCaughtError=c,this.onRecoverableError=m,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=w,this.incompleteTransitions=new Map}function Fh(e,n,t,i,o,c,m,y,w,M,B,G){return e=new Tz(e,n,t,m,w,M,B,G,y),n=1,c===!0&&(n|=24),c=ot(3,null,null,n),e.current=c,c.stateNode=e,n=Bo(),n.refCount++,e.pooledCache=n,n.refCount++,c.memoizedState={element:i,isDehydrated:t,cache:n},Ho(c),e}function Qh(e){return e?(e=Bi,e):Bi}function Kh(e,n,t,i,o,c){o=Qh(o),i.context===null?i.context=o:i.pendingContext=o,i=Ia(n),i.payload={element:t},c=c===void 0?null:c,c!==null&&(i.callback=c),t=Ma(e,i,n),t!==null&&(nt(t,e,n),Pr(t,e,n))}function Jh(e,n){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var t=e.retryLane;e.retryLane=t!==0&&t<n?t:n}}function cu(e,n){Jh(e,n),(e=e.alternate)&&Jh(e,n)}function $h(e){if(e.tag===13||e.tag===31){var n=di(e,67108864);n!==null&&nt(n,e,67108864),cu(e,67108864)}}function em(e){if(e.tag===13||e.tag===31){var n=pt();n=Q(n);var t=di(e,n);t!==null&&nt(t,e,n),cu(e,n)}}var Ws=!0;function Az(e,n,t,i){var o=C.T;C.T=null;var c=K.p;try{K.p=2,uu(e,n,t,i)}finally{K.p=c,C.T=o}}function kz(e,n,t,i){var o=C.T;C.T=null;var c=K.p;try{K.p=8,uu(e,n,t,i)}finally{K.p=c,C.T=o}}function uu(e,n,t,i){if(Ws){var o=du(i);if(o===null)Qc(e,n,i,Os,t),tm(e,i);else if(_z(o,e,n,t,i))i.stopPropagation();else if(tm(e,i),n&4&&-1<Rz.indexOf(e)){for(;o!==null;){var c=zt(o);if(c!==null)switch(c.tag){case 3:if(c=c.stateNode,c.current.memoizedState.isDehydrated){var m=Kt(c.pendingLanes);if(m!==0){var y=c;for(y.pendingLanes|=2,y.entangledLanes|=2;m;){var w=1<<31-Ke(m);y.entanglements[1]|=w,m&=~w}Ht(c),(Ye&6)===0&&(zs=zn()+500,$r(0))}}break;case 31:case 13:y=di(c,2),y!==null&&nt(y,c,2),vs(),cu(c,2)}if(c=du(i),c===null&&Qc(e,n,i,Os,t),c===o)break;o=c}o!==null&&i.stopPropagation()}else Qc(e,n,i,null,t)}}function du(e){return e=po(e),fu(e)}var Os=null;function fu(e){if(Os=null,e=lt(e),e!==null){var n=d(e);if(n===null)e=null;else{var t=n.tag;if(t===13){if(e=f(n),e!==null)return e;e=null}else if(t===31){if(e=h(n),e!==null)return e;e=null}else if(t===3){if(n.stateNode.current.memoizedState.isDehydrated)return n.tag===3?n.stateNode.containerInfo:null;e=null}else n!==e&&(e=null)}}return Os=e,null}function nm(e){switch(e){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(Qt()){case V:return 2;case ae:return 8;case Se:case Ae:return 32;case He:return 268435456;default:return 32}default:return 32}}var pu=!1,ja=null,Va=null,Ha=null,ll=new Map,sl=new Map,qa=[],Rz="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function tm(e,n){switch(e){case"focusin":case"focusout":ja=null;break;case"dragenter":case"dragleave":Va=null;break;case"mouseover":case"mouseout":Ha=null;break;case"pointerover":case"pointerout":ll.delete(n.pointerId);break;case"gotpointercapture":case"lostpointercapture":sl.delete(n.pointerId)}}function ol(e,n,t,i,o,c){return e===null||e.nativeEvent!==c?(e={blockedOn:n,domEventName:t,eventSystemFlags:i,nativeEvent:c,targetContainers:[o]},n!==null&&(n=zt(n),n!==null&&$h(n)),e):(e.eventSystemFlags|=i,n=e.targetContainers,o!==null&&n.indexOf(o)===-1&&n.push(o),e)}function _z(e,n,t,i,o){switch(n){case"focusin":return ja=ol(ja,e,n,t,i,o),!0;case"dragenter":return Va=ol(Va,e,n,t,i,o),!0;case"mouseover":return Ha=ol(Ha,e,n,t,i,o),!0;case"pointerover":var c=o.pointerId;return ll.set(c,ol(ll.get(c)||null,e,n,t,i,o)),!0;case"gotpointercapture":return c=o.pointerId,sl.set(c,ol(sl.get(c)||null,e,n,t,i,o)),!0}return!1}function am(e){var n=lt(e.target);if(n!==null){var t=d(n);if(t!==null){if(n=t.tag,n===13){if(n=f(t),n!==null){e.blockedOn=n,xe(e.priority,function(){em(t)});return}}else if(n===31){if(n=h(t),n!==null){e.blockedOn=n,xe(e.priority,function(){em(t)});return}}else if(n===3&&t.stateNode.current.memoizedState.isDehydrated){e.blockedOn=t.tag===3?t.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Ps(e){if(e.blockedOn!==null)return!1;for(var n=e.targetContainers;0<n.length;){var t=du(e.nativeEvent);if(t===null){t=e.nativeEvent;var i=new t.constructor(t.type,t);fo=i,t.target.dispatchEvent(i),fo=null}else return n=zt(t),n!==null&&$h(n),e.blockedOn=t,!1;n.shift()}return!0}function im(e,n,t){Ps(e)&&t.delete(n)}function Iz(){pu=!1,ja!==null&&Ps(ja)&&(ja=null),Va!==null&&Ps(Va)&&(Va=null),Ha!==null&&Ps(Ha)&&(Ha=null),ll.forEach(im),sl.forEach(im)}function Ns(e,n){e.blockedOn===n&&(e.blockedOn=null,pu||(pu=!0,a.unstable_scheduleCallback(a.unstable_NormalPriority,Iz)))}var Xs=null;function rm(e){Xs!==e&&(Xs=e,a.unstable_scheduleCallback(a.unstable_NormalPriority,function(){Xs===e&&(Xs=null);for(var n=0;n<e.length;n+=3){var t=e[n],i=e[n+1],o=e[n+2];if(typeof i!="function"){if(fu(i||t)===null)continue;break}var c=zt(t);c!==null&&(e.splice(n,3),n-=3,dc(c,{pending:!0,data:o,method:t.method,action:i},i,o))}}))}function dr(e){function n(w){return Ns(w,e)}ja!==null&&Ns(ja,e),Va!==null&&Ns(Va,e),Ha!==null&&Ns(Ha,e),ll.forEach(n),sl.forEach(n);for(var t=0;t<qa.length;t++){var i=qa[t];i.blockedOn===e&&(i.blockedOn=null)}for(;0<qa.length&&(t=qa[0],t.blockedOn===null);)am(t),t.blockedOn===null&&qa.shift();if(t=(e.ownerDocument||e).$$reactFormReplay,t!=null)for(i=0;i<t.length;i+=3){var o=t[i],c=t[i+1],m=o[oe]||null;if(typeof c=="function")m||rm(t);else if(m){var y=null;if(c&&c.hasAttribute("formAction")){if(o=c,m=c[oe]||null)y=m.formAction;else if(fu(o)!==null)continue}else y=m.action;typeof y=="function"?t[i+1]=y:(t.splice(i,3),i-=3),rm(t)}}}function lm(){function e(c){c.canIntercept&&c.info==="react-transition"&&c.intercept({handler:function(){return new Promise(function(m){return o=m})},focusReset:"manual",scroll:"manual"})}function n(){o!==null&&(o(),o=null),i||setTimeout(t,20)}function t(){if(!i&&!navigation.transition){var c=navigation.currentEntry;c&&c.url!=null&&navigation.navigate(c.url,{state:c.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var i=!1,o=null;return navigation.addEventListener("navigate",e),navigation.addEventListener("navigatesuccess",n),navigation.addEventListener("navigateerror",n),setTimeout(t,100),function(){i=!0,navigation.removeEventListener("navigate",e),navigation.removeEventListener("navigatesuccess",n),navigation.removeEventListener("navigateerror",n),o!==null&&(o(),o=null)}}}function hu(e){this._internalRoot=e}Us.prototype.render=hu.prototype.render=function(e){var n=this._internalRoot;if(n===null)throw Error(s(409));var t=n.current,i=pt();Kh(t,i,e,n,null,null)},Us.prototype.unmount=hu.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var n=e.containerInfo;Kh(e.current,2,null,e,null,null),vs(),n[be]=null}};function Us(e){this._internalRoot=e}Us.prototype.unstable_scheduleHydration=function(e){if(e){var n=Ee();e={blockedOn:null,target:e,priority:n};for(var t=0;t<qa.length&&n!==0&&n<qa[t].priority;t++);qa.splice(t,0,e),t===0&&am(e)}};var sm=r.version;if(sm!=="19.2.3")throw Error(s(527,sm,"19.2.3"));K.findDOMNode=function(e){var n=e._reactInternals;if(n===void 0)throw typeof e.render=="function"?Error(s(188)):(e=Object.keys(e).join(","),Error(s(268,e)));return e=p(n),e=e!==null?g(e):null,e=e===null?null:e.stateNode,e};var Mz={bundleType:0,version:"19.2.3",rendererPackageName:"react-dom",currentDispatcherRef:C,reconcilerVersion:"19.2.3"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Bs=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Bs.isDisabled&&Bs.supportsFiber)try{mn=Bs.inject(Mz),yn=Bs}catch{}}return ul.createRoot=function(e,n){if(!u(e))throw Error(s(299));var t=!1,i="",o=hp,c=mp,m=bp;return n!=null&&(n.unstable_strictMode===!0&&(t=!0),n.identifierPrefix!==void 0&&(i=n.identifierPrefix),n.onUncaughtError!==void 0&&(o=n.onUncaughtError),n.onCaughtError!==void 0&&(c=n.onCaughtError),n.onRecoverableError!==void 0&&(m=n.onRecoverableError)),n=Fh(e,1,!1,null,null,t,i,null,o,c,m,lm),e[be]=n.current,Fc(e),new hu(n)},ul.hydrateRoot=function(e,n,t){if(!u(e))throw Error(s(299));var i=!1,o="",c=hp,m=mp,y=bp,w=null;return t!=null&&(t.unstable_strictMode===!0&&(i=!0),t.identifierPrefix!==void 0&&(o=t.identifierPrefix),t.onUncaughtError!==void 0&&(c=t.onUncaughtError),t.onCaughtError!==void 0&&(m=t.onCaughtError),t.onRecoverableError!==void 0&&(y=t.onRecoverableError),t.formState!==void 0&&(w=t.formState)),n=Fh(e,1,!0,n,t??null,i,o,w,c,m,y,lm),n.context=Qh(null),t=n.current,i=pt(),i=Q(i),o=Ia(i),o.callback=null,Ma(t,o,i),t=i,n.current.lanes=t,li(n,t),Ht(n),e[be]=n.current,Fc(e),new Us(n)},ul.version="19.2.3",ul}var gm;function Zz(){if(gm)return gu.exports;gm=1;function a(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(a)}catch(r){console.error(r)}}return a(),gu.exports=Bz(),gu.exports}var jz=Zz(),kb=Ab();const Vz=no(kb),Hz=xb({__proto__:null,default:Vz},[kb]);function gn(){return gn=Object.assign?Object.assign.bind():function(a){for(var r=1;r<arguments.length;r++){var l=arguments[r];for(var s in l)Object.prototype.hasOwnProperty.call(l,s)&&(a[s]=l[s])}return a},gn.apply(this,arguments)}var In;(function(a){a.Pop="POP",a.Push="PUSH",a.Replace="REPLACE"})(In||(In={}));const zm="popstate";function qz(a){a===void 0&&(a={});function r(s,u){let{pathname:d,search:f,hash:h}=s.location;return El("",{pathname:d,search:f,hash:h},u.state&&u.state.usr||null,u.state&&u.state.key||"default")}function l(s,u){return typeof u=="string"?u:ki(u)}return Yz(r,l,null,a)}function Oe(a,r){if(a===!1||a===null||typeof a>"u")throw new Error(r)}function Ai(a,r){if(!a){typeof console<"u"&&console.warn(r);try{throw new Error(r)}catch{}}}function Gz(){return Math.random().toString(36).substr(2,8)}function ym(a,r){return{usr:a.state,key:a.key,idx:r}}function El(a,r,l,s){return l===void 0&&(l=null),gn({pathname:typeof a=="string"?a:a.pathname,search:"",hash:""},typeof r=="string"?Ja(r):r,{state:l,key:r&&r.key||s||Gz()})}function ki(a){let{pathname:r="/",search:l="",hash:s=""}=a;return l&&l!=="?"&&(r+=l.charAt(0)==="?"?l:"?"+l),s&&s!=="#"&&(r+=s.charAt(0)==="#"?s:"#"+s),r}function Ja(a){let r={};if(a){let l=a.indexOf("#");l>=0&&(r.hash=a.substr(l),a=a.substr(0,l));let s=a.indexOf("?");s>=0&&(r.search=a.substr(s),a=a.substr(0,s)),a&&(r.pathname=a)}return r}function Yz(a,r,l,s){s===void 0&&(s={});let{window:u=document.defaultView,v5Compat:d=!1}=s,f=u.history,h=In.Pop,b=null,p=g();p==null&&(p=0,f.replaceState(gn({},f.state,{idx:p}),""));function g(){return(f.state||{idx:null}).idx}function z(){h=In.Pop;let j=g(),X=j==null?null:j-p;p=j,b&&b({action:h,location:O.location,delta:X})}function S(j,X){h=In.Push;let Y=El(O.location,j,X);p=g()+1;let q=ym(Y,p),de=O.createHref(Y);try{f.pushState(q,"",de)}catch(ye){if(ye instanceof DOMException&&ye.name==="DataCloneError")throw ye;u.location.assign(de)}d&&b&&b({action:h,location:O.location,delta:1})}function v(j,X){h=In.Replace;let Y=El(O.location,j,X);p=g();let q=ym(Y,p),de=O.createHref(Y);f.replaceState(q,"",de),d&&b&&b({action:h,location:O.location,delta:0})}function L(j){let X=u.location.origin!=="null"?u.location.origin:u.location.href,Y=typeof j=="string"?j:ki(j);return Y=Y.replace(/ $/,"%20"),Oe(X,"No window.location.(origin|href) available to create URL for href: "+Y),new URL(Y,X)}let O={get action(){return h},get location(){return a(u,f)},listen(j){if(b)throw new Error("A history only accepts one active listener");return u.addEventListener(zm,z),b=j,()=>{u.removeEventListener(zm,z),b=null}},createHref(j){return r(u,j)},createURL:L,encodeLocation(j){let X=L(j);return{pathname:X.pathname,search:X.search,hash:X.hash}},push:S,replace:v,go(j){return f.go(j)}};return O}var tn;(function(a){a.data="data",a.deferred="deferred",a.redirect="redirect",a.error="error"})(tn||(tn={}));const Fz=new Set(["lazy","caseSensitive","path","id","index","children"]);function Qz(a){return a.index===!0}function Ys(a,r,l,s){return l===void 0&&(l=[]),s===void 0&&(s={}),a.map((u,d)=>{let f=[...l,String(d)],h=typeof u.id=="string"?u.id:f.join("-");if(Oe(u.index!==!0||!u.children,"Cannot specify children on an index route"),Oe(!s[h],'Found a route id collision on id "'+h+`".  Route id's must be globally unique within Data Router usages`),Qz(u)){let b=gn({},u,r(u),{id:h});return s[h]=b,b}else{let b=gn({},u,r(u),{id:h,children:void 0});return s[h]=b,u.children&&(b.children=Ys(u.children,r,f,s)),b}})}function wi(a,r,l){return l===void 0&&(l="/"),qs(a,r,l,!1)}function qs(a,r,l,s){let u=typeof r=="string"?Ja(r):r,d=ga(u.pathname||"/",l);if(d==null)return null;let f=Rb(a);Jz(f);let h=null;for(let b=0;h==null&&b<f.length;++b){let p=cy(d);h=sy(f[b],p,s)}return h}function Kz(a,r){let{route:l,pathname:s,params:u}=a;return{id:l.id,pathname:s,params:u,data:r[l.id],handle:l.handle}}function Rb(a,r,l,s){r===void 0&&(r=[]),l===void 0&&(l=[]),s===void 0&&(s="");let u=(d,f,h)=>{let b={relativePath:h===void 0?d.path||"":h,caseSensitive:d.caseSensitive===!0,childrenIndex:f,route:d};b.relativePath.startsWith("/")&&(Oe(b.relativePath.startsWith(s),'Absolute route path "'+b.relativePath+'" nested under path '+('"'+s+'" is not valid. An absolute child route path ')+"must start with the combined path of all its parent routes."),b.relativePath=b.relativePath.slice(s.length));let p=ba([s,b.relativePath]),g=l.concat(b);d.children&&d.children.length>0&&(Oe(d.index!==!0,"Index routes must not have child routes. Please remove "+('all child routes from route path "'+p+'".')),Rb(d.children,r,g,p)),!(d.path==null&&!d.index)&&r.push({path:p,score:ry(p,d.index),routesMeta:g})};return a.forEach((d,f)=>{var h;if(d.path===""||!((h=d.path)!=null&&h.includes("?")))u(d,f);else for(let b of _b(d.path))u(d,f,b)}),r}function _b(a){let r=a.split("/");if(r.length===0)return[];let[l,...s]=r,u=l.endsWith("?"),d=l.replace(/\?$/,"");if(s.length===0)return u?[d,""]:[d];let f=_b(s.join("/")),h=[];return h.push(...f.map(b=>b===""?d:[d,b].join("/"))),u&&h.push(...f),h.map(b=>a.startsWith("/")&&b===""?"/":b)}function Jz(a){a.sort((r,l)=>r.score!==l.score?l.score-r.score:ly(r.routesMeta.map(s=>s.childrenIndex),l.routesMeta.map(s=>s.childrenIndex)))}const $z=/^:[\w-]+$/,ey=3,ny=2,ty=1,ay=10,iy=-2,vm=a=>a==="*";function ry(a,r){let l=a.split("/"),s=l.length;return l.some(vm)&&(s+=iy),r&&(s+=ny),l.filter(u=>!vm(u)).reduce((u,d)=>u+($z.test(d)?ey:d===""?ty:ay),s)}function ly(a,r){return a.length===r.length&&a.slice(0,-1).every((s,u)=>s===r[u])?a[a.length-1]-r[r.length-1]:0}function sy(a,r,l){l===void 0&&(l=!1);let{routesMeta:s}=a,u={},d="/",f=[];for(let h=0;h<s.length;++h){let b=s[h],p=h===s.length-1,g=d==="/"?r:r.slice(d.length)||"/",z=Fs({path:b.relativePath,caseSensitive:b.caseSensitive,end:p},g),S=b.route;if(!z&&p&&l&&!s[s.length-1].route.index&&(z=Fs({path:b.relativePath,caseSensitive:b.caseSensitive,end:!1},g)),!z)return null;Object.assign(u,z.params),f.push({params:u,pathname:ba([d,z.pathname]),pathnameBase:py(ba([d,z.pathnameBase])),route:S}),z.pathnameBase!=="/"&&(d=ba([d,z.pathnameBase]))}return f}function Fs(a,r){typeof a=="string"&&(a={path:a,caseSensitive:!1,end:!0});let[l,s]=oy(a.path,a.caseSensitive,a.end),u=r.match(l);if(!u)return null;let d=u[0],f=d.replace(/(.)\/+$/,"$1"),h=u.slice(1);return{params:s.reduce((p,g,z)=>{let{paramName:S,isOptional:v}=g;if(S==="*"){let O=h[z]||"";f=d.slice(0,d.length-O.length).replace(/(.)\/+$/,"$1")}const L=h[z];return v&&!L?p[S]=void 0:p[S]=(L||"").replace(/%2F/g,"/"),p},{}),pathname:d,pathnameBase:f,pattern:a}}function oy(a,r,l){r===void 0&&(r=!1),l===void 0&&(l=!0),Ai(a==="*"||!a.endsWith("*")||a.endsWith("/*"),'Route path "'+a+'" will be treated as if it were '+('"'+a.replace(/\*$/,"/*")+'" because the `*` character must ')+"always follow a `/` in the pattern. To get rid of this warning, "+('please change the route path to "'+a.replace(/\*$/,"/*")+'".'));let s=[],u="^"+a.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(f,h,b)=>(s.push({paramName:h,isOptional:b!=null}),b?"/?([^\\/]+)?":"/([^\\/]+)"));return a.endsWith("*")?(s.push({paramName:"*"}),u+=a==="*"||a==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):l?u+="\\/*$":a!==""&&a!=="/"&&(u+="(?:(?=\\/|$))"),[new RegExp(u,r?void 0:"i"),s]}function cy(a){try{return a.split("/").map(r=>decodeURIComponent(r).replace(/\//g,"%2F")).join("/")}catch(r){return Ai(!1,'The URL path "'+a+'" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent '+("encoding ("+r+").")),a}}function ga(a,r){if(r==="/")return a;if(!a.toLowerCase().startsWith(r.toLowerCase()))return null;let l=r.endsWith("/")?r.length-1:r.length,s=a.charAt(l);return s&&s!=="/"?null:a.slice(l)||"/"}const uy=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,dy=a=>uy.test(a);function fy(a,r){r===void 0&&(r="/");let{pathname:l,search:s="",hash:u=""}=typeof a=="string"?Ja(a):a,d;if(l)if(dy(l))d=l;else{if(l.includes("//")){let f=l;l=l.replace(/\/\/+/g,"/"),Ai(!1,"Pathnames cannot have embedded double slashes - normalizing "+(f+" -> "+l))}l.startsWith("/")?d=Sm(l.substring(1),"/"):d=Sm(l,r)}else d=r;return{pathname:d,search:hy(s),hash:my(u)}}function Sm(a,r){let l=r.replace(/\/+$/,"").split("/");return a.split("/").forEach(u=>{u===".."?l.length>1&&l.pop():u!=="."&&l.push(u)}),l.length>1?l.join("/"):"/"}function Su(a,r,l,s){return"Cannot include a '"+a+"' character in a manually specified "+("`to."+r+"` field ["+JSON.stringify(s)+"].  Please separate it out to the ")+("`to."+l+"` field. Alternatively you may provide the full path as ")+'a string in <Link to="..."> and the router will parse it for you.'}function Ib(a){return a.filter((r,l)=>l===0||r.route.path&&r.route.path.length>0)}function nd(a,r){let l=Ib(a);return r?l.map((s,u)=>u===l.length-1?s.pathname:s.pathnameBase):l.map(s=>s.pathnameBase)}function td(a,r,l,s){s===void 0&&(s=!1);let u;typeof a=="string"?u=Ja(a):(u=gn({},a),Oe(!u.pathname||!u.pathname.includes("?"),Su("?","pathname","search",u)),Oe(!u.pathname||!u.pathname.includes("#"),Su("#","pathname","hash",u)),Oe(!u.search||!u.search.includes("#"),Su("#","search","hash",u)));let d=a===""||u.pathname==="",f=d?"/":u.pathname,h;if(f==null)h=l;else{let z=r.length-1;if(!s&&f.startsWith("..")){let S=f.split("/");for(;S[0]==="..";)S.shift(),z-=1;u.pathname=S.join("/")}h=z>=0?r[z]:"/"}let b=fy(u,h),p=f&&f!=="/"&&f.endsWith("/"),g=(d||f===".")&&l.endsWith("/");return!b.pathname.endsWith("/")&&(p||g)&&(b.pathname+="/"),b}const ba=a=>a.join("/").replace(/\/\/+/g,"/"),py=a=>a.replace(/\/+$/,"").replace(/^\/*/,"/"),hy=a=>!a||a==="?"?"":a.startsWith("?")?a:"?"+a,my=a=>!a||a==="#"?"":a.startsWith("#")?a:"#"+a;class Qs{constructor(r,l,s,u){u===void 0&&(u=!1),this.status=r,this.statusText=l||"",this.internal=u,s instanceof Error?(this.data=s.toString(),this.error=s):this.data=s}}function Dl(a){return a!=null&&typeof a.status=="number"&&typeof a.statusText=="string"&&typeof a.internal=="boolean"&&"data"in a}const Mb=["post","put","patch","delete"],by=new Set(Mb),gy=["get",...Mb],zy=new Set(gy),yy=new Set([301,302,303,307,308]),vy=new Set([307,308]),Eu={state:"idle",location:void 0,formMethod:void 0,formAction:void 0,formEncType:void 0,formData:void 0,json:void 0,text:void 0},Sy={state:"idle",data:void 0,formMethod:void 0,formAction:void 0,formEncType:void 0,formData:void 0,json:void 0,text:void 0},dl={state:"unblocked",proceed:void 0,reset:void 0,location:void 0},ad=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,Ey=a=>({hasErrorBoundary:!!a.hasErrorBoundary}),Cb="remix-router-transitions";function Dy(a){const r=a.window?a.window:typeof window<"u"?window:void 0,l=typeof r<"u"&&typeof r.document<"u"&&typeof r.document.createElement<"u",s=!l;Oe(a.routes.length>0,"You must provide a non-empty routes array to createRouter");let u;if(a.mapRouteProperties)u=a.mapRouteProperties;else if(a.detectErrorBoundary){let T=a.detectErrorBoundary;u=_=>({hasErrorBoundary:T(_)})}else u=Ey;let d={},f=Ys(a.routes,u,void 0,d),h,b=a.basename||"/",p=a.dataStrategy||Ay,g=a.patchRoutesOnNavigation,z=gn({v7_fetcherPersist:!1,v7_normalizeFormMethod:!1,v7_partialHydration:!1,v7_prependBasename:!1,v7_relativeSplatPath:!1,v7_skipActionErrorRevalidation:!1},a.future),S=null,v=new Set,L=null,O=null,j=null,X=a.hydrationData!=null,Y=wi(f,a.history.location,b),q=!1,de=null;if(Y==null&&!g){let T=at(404,{pathname:a.history.location.pathname}),{matches:_,route:P}=Mm(f);Y=_,de={[P.id]:T}}Y&&!a.hydrationData&&ri(Y,f,a.history.location.pathname).active&&(Y=null);let ye;if(Y)if(Y.some(T=>T.route.lazy))ye=!1;else if(!Y.some(T=>T.route.loader))ye=!0;else if(z.v7_partialHydration){let T=a.hydrationData?a.hydrationData.loaderData:null,_=a.hydrationData?a.hydrationData.errors:null;if(_){let P=Y.findIndex(Q=>_[Q.route.id]!==void 0);ye=Y.slice(0,P+1).every(Q=>!Bu(Q.route,T,_))}else ye=Y.every(P=>!Bu(P.route,T,_))}else ye=a.hydrationData!=null;else if(ye=!1,Y=[],z.v7_partialHydration){let T=ri(null,f,a.history.location.pathname);T.active&&T.matches&&(q=!0,Y=T.matches)}let Z,k={historyAction:a.history.action,location:a.history.location,matches:Y,initialized:ye,navigation:Eu,restoreScrollPosition:a.hydrationData!=null?!1:null,preventScrollReset:!1,revalidation:"idle",loaderData:a.hydrationData&&a.hydrationData.loaderData||{},actionData:a.hydrationData&&a.hydrationData.actionData||null,errors:a.hydrationData&&a.hydrationData.errors||de,fetchers:new Map,blockers:new Map},te=In.Pop,he=!1,ue,ie=!1,ne=new Map,Te=null,fe=!1,$=!1,C=[],K=new Set,le=new Map,Me=0,D=-1,x=new Map,U=new Set,E=new Map,re=new Map,ze=new Set,ge=new Map,_e=new Map,Je;function Qe(){if(S=a.history.listen(T=>{let{action:_,location:P,delta:Q}=T;if(Je){Je(),Je=void 0;return}Ai(_e.size===0||Q!=null,"You are trying to use a blocker on a POP navigation to a location that was not created by @remix-run/router. This will fail silently in production. This can happen if you are navigating outside the router via `window.history.pushState`/`window.location.hash` instead of using router navigation APIs.  This can also happen if you are using createHashRouter and the user manually changes the URL.");let se=ti({currentLocation:k.location,nextLocation:P,historyAction:_});if(se&&Q!=null){let Ee=new Promise(xe=>{Je=xe});a.history.go(Q*-1),Mi(se,{state:"blocked",location:P,proceed(){Mi(se,{state:"proceeding",proceed:void 0,reset:void 0,location:P}),Ee.then(()=>a.history.go(Q))},reset(){let xe=new Map(k.blockers);xe.set(se,dl),Dn({blockers:xe})}});return}return Gn(_,P)}),l){By(r,ne);let T=()=>Zy(r,ne);r.addEventListener("pagehide",T),Te=()=>r.removeEventListener("pagehide",T)}return k.initialized||Gn(In.Pop,k.location,{initialHydration:!0}),Z}function qn(){S&&S(),Te&&Te(),v.clear(),ue&&ue.abort(),k.fetchers.forEach((T,_)=>Ln(_)),k.blockers.forEach((T,_)=>Yn(_))}function It(T){return v.add(T),()=>v.delete(T)}function Dn(T,_){_===void 0&&(_={}),k=gn({},k,T);let P=[],Q=[];z.v7_fetcherPersist&&k.fetchers.forEach((se,Ee)=>{se.state==="idle"&&(ze.has(Ee)?Q.push(Ee):P.push(Ee))}),ze.forEach(se=>{!k.fetchers.has(se)&&!le.has(se)&&Q.push(se)}),[...v].forEach(se=>se(k,{deletedFetchers:Q,viewTransitionOpts:_.viewTransitionOpts,flushSync:_.flushSync===!0})),z.v7_fetcherPersist?(P.forEach(se=>k.fetchers.delete(se)),Q.forEach(se=>Ln(se))):Q.forEach(se=>ze.delete(se))}function Mt(T,_,P){var Q,se;let{flushSync:Ee}=P===void 0?{}:P,xe=k.actionData!=null&&k.navigation.formMethod!=null&&Xt(k.navigation.formMethod)&&k.navigation.state==="loading"&&((Q=T.state)==null?void 0:Q._isRedirect)!==!0,pe;_.actionData?Object.keys(_.actionData).length>0?pe=_.actionData:pe=null:xe?pe=k.actionData:pe=null;let ce=_.loaderData?_m(k.loaderData,_.loaderData,_.matches||[],_.errors):k.loaderData,oe=k.blockers;oe.size>0&&(oe=new Map(oe),oe.forEach((Ue,Mn)=>oe.set(Mn,dl)));let be=he===!0||k.navigation.formMethod!=null&&Xt(k.navigation.formMethod)&&((se=T.state)==null?void 0:se._isRedirect)!==!0;h&&(f=h,h=void 0),fe||te===In.Pop||(te===In.Push?a.history.push(T,T.state):te===In.Replace&&a.history.replace(T,T.state));let Re;if(te===In.Pop){let Ue=ne.get(k.location.pathname);Ue&&Ue.has(T.pathname)?Re={currentLocation:k.location,nextLocation:T}:ne.has(T.pathname)&&(Re={currentLocation:T,nextLocation:k.location})}else if(ie){let Ue=ne.get(k.location.pathname);Ue?Ue.add(T.pathname):(Ue=new Set([T.pathname]),ne.set(k.location.pathname,Ue)),Re={currentLocation:k.location,nextLocation:T}}Dn(gn({},_,{actionData:pe,loaderData:ce,historyAction:te,location:T,initialized:!0,navigation:Eu,revalidation:"idle",restoreScrollPosition:Il(T,_.matches||k.matches),preventScrollReset:be,blockers:oe}),{viewTransitionOpts:Re,flushSync:Ee===!0}),te=In.Pop,he=!1,ie=!1,fe=!1,$=!1,C=[]}async function gt(T,_){if(typeof T=="number"){a.history.go(T);return}let P=Uu(k.location,k.matches,b,z.v7_prependBasename,T,z.v7_relativeSplatPath,_?.fromRouteId,_?.relative),{path:Q,submission:se,error:Ee}=Em(z.v7_normalizeFormMethod,!1,P,_),xe=k.location,pe=El(k.location,Q,_&&_.state);pe=gn({},pe,a.history.encodeLocation(pe));let ce=_&&_.replace!=null?_.replace:void 0,oe=In.Push;ce===!0?oe=In.Replace:ce===!1||se!=null&&Xt(se.formMethod)&&se.formAction===k.location.pathname+k.location.search&&(oe=In.Replace);let be=_&&"preventScrollReset"in _?_.preventScrollReset===!0:void 0,Re=(_&&_.flushSync)===!0,Ue=ti({currentLocation:xe,nextLocation:pe,historyAction:oe});if(Ue){Mi(Ue,{state:"blocked",location:pe,proceed(){Mi(Ue,{state:"proceeding",proceed:void 0,reset:void 0,location:pe}),gt(T,_)},reset(){let Mn=new Map(k.blockers);Mn.set(Ue,dl),Dn({blockers:Mn})}});return}return await Gn(oe,pe,{submission:se,pendingError:Ee,preventScrollReset:be,replace:_&&_.replace,enableViewTransition:_&&_.viewTransition,flushSync:Re})}function ya(){if(ae(),Dn({revalidation:"loading"}),k.navigation.state!=="submitting"){if(k.navigation.state==="idle"){Gn(k.historyAction,k.location,{startUninterruptedRevalidation:!0});return}Gn(te||k.historyAction,k.navigation.location,{overrideNavigation:k.navigation,enableViewTransition:ie===!0})}}async function Gn(T,_,P){ue&&ue.abort(),ue=null,te=T,fe=(P&&P.startUninterruptedRevalidation)===!0,ii(k.location,k.matches),he=(P&&P.preventScrollReset)===!0,ie=(P&&P.enableViewTransition)===!0;let Q=h||f,se=P&&P.overrideNavigation,Ee=P!=null&&P.initialHydration&&k.matches&&k.matches.length>0&&!q?k.matches:wi(Q,_,b),xe=(P&&P.flushSync)===!0;if(Ee&&k.initialized&&!$&&Cy(k.location,_)&&!(P&&P.submission&&Xt(P.submission.formMethod))){Mt(_,{matches:Ee},{flushSync:xe});return}let pe=ri(Ee,Q,_.pathname);if(pe.active&&pe.matches&&(Ee=pe.matches),!Ee){let{error:$e,notFoundMatches:Pe,route:on}=Sa(_.pathname);Mt(_,{matches:Pe,loaderData:{},errors:{[on.id]:$e}},{flushSync:xe});return}ue=new AbortController;let ce=fr(a.history,_,ue.signal,P&&P.submission),oe;if(P&&P.pendingError)oe=[xi(Ee).route.id,{type:tn.error,error:P.pendingError}];else if(P&&P.submission&&Xt(P.submission.formMethod)){let $e=await _i(ce,_,P.submission,Ee,pe.active,{replace:P.replace,flushSync:xe});if($e.shortCircuited)return;if($e.pendingActionResult){let[Pe,on]=$e.pendingActionResult;if(mt(on)&&Dl(on.error)&&on.error.status===404){ue=null,Mt(_,{matches:$e.matches,loaderData:{},errors:{[Pe]:on.error}});return}}Ee=$e.matches||Ee,oe=$e.pendingActionResult,se=Du(_,P.submission),xe=!1,pe.active=!1,ce=fr(a.history,ce.url,ce.signal)}let{shortCircuited:be,matches:Re,loaderData:Ue,errors:Mn}=await Ii(ce,_,Ee,pe.active,se,P&&P.submission,P&&P.fetcherSubmission,P&&P.replace,P&&P.initialHydration===!0,xe,oe);be||(ue=null,Mt(_,gn({matches:Re||Ee},Im(oe),{loaderData:Ue,errors:Mn})))}async function _i(T,_,P,Q,se,Ee){Ee===void 0&&(Ee={}),ae();let xe=Xy(_,P);if(Dn({navigation:xe},{flushSync:Ee.flushSync===!0}),se){let oe=await Da(Q,_.pathname,T.signal);if(oe.type==="aborted")return{shortCircuited:!0};if(oe.type==="error"){let be=xi(oe.partialMatches).route.id;return{matches:oe.partialMatches,pendingActionResult:[be,{type:tn.error,error:oe.error}]}}else if(oe.matches)Q=oe.matches;else{let{notFoundMatches:be,error:Re,route:Ue}=Sa(_.pathname);return{matches:be,pendingActionResult:[Ue.id,{type:tn.error,error:Re}]}}}let pe,ce=zl(Q,_);if(!ce.route.action&&!ce.route.lazy)pe={type:tn.error,error:at(405,{method:T.method,pathname:_.pathname,routeId:ce.route.id})};else if(pe=(await Qt("action",k,T,[ce],Q,null))[ce.route.id],T.signal.aborted)return{shortCircuited:!0};if(Ti(pe)){let oe;return Ee&&Ee.replace!=null?oe=Ee.replace:oe=Am(pe.response.headers.get("Location"),new URL(T.url),b,a.history)===k.location.pathname+k.location.search,await zn(T,pe,!0,{submission:P,replace:oe}),{shortCircuited:!0}}if(Ka(pe))throw at(400,{type:"defer-action"});if(mt(pe)){let oe=xi(Q,ce.route.id);return(Ee&&Ee.replace)!==!0&&(te=In.Push),{matches:Q,pendingActionResult:[oe.route.id,pe]}}return{matches:Q,pendingActionResult:[ce.route.id,pe]}}async function Ii(T,_,P,Q,se,Ee,xe,pe,ce,oe,be){let Re=se||Du(_,Ee),Ue=Ee||xe||Lm(Re),Mn=!fe&&(!z.v7_partialHydration||!ce);if(Q){if(Mn){let dn=Ft(be);Dn(gn({navigation:Re},dn!==void 0?{actionData:dn}:{}),{flushSync:oe})}let Ve=await Da(P,_.pathname,T.signal);if(Ve.type==="aborted")return{shortCircuited:!0};if(Ve.type==="error"){let dn=xi(Ve.partialMatches).route.id;return{matches:Ve.partialMatches,loaderData:{},errors:{[dn]:Ve.error}}}else if(Ve.matches)P=Ve.matches;else{let{error:dn,notFoundMatches:Jt,route:si}=Sa(_.pathname);return{matches:Jt,loaderData:{},errors:{[si.id]:dn}}}}let $e=h||f,[Pe,on]=wm(a.history,k,P,Ue,_,z.v7_partialHydration&&ce===!0,z.v7_skipActionErrorRevalidation,$,C,K,ze,E,U,$e,b,be);if(Ea(Ve=>!(P&&P.some(dn=>dn.route.id===Ve))||Pe&&Pe.some(dn=>dn.route.id===Ve)),D=++Me,Pe.length===0&&on.length===0){let Ve=On();return Mt(_,gn({matches:P,loaderData:{},errors:be&&mt(be[1])?{[be[0]]:be[1].error}:null},Im(be),Ve?{fetchers:new Map(k.fetchers)}:{}),{flushSync:oe}),{shortCircuited:!0}}if(Mn){let Ve={};if(!Q){Ve.navigation=Re;let dn=Ft(be);dn!==void 0&&(Ve.actionData=dn)}on.length>0&&(Ve.fetchers=va(on)),Dn(Ve,{flushSync:oe})}on.forEach(Ve=>{mn(Ve.key),Ve.controller&&le.set(Ve.key,Ve.controller)});let lt=()=>on.forEach(Ve=>mn(Ve.key));ue&&ue.signal.addEventListener("abort",lt);let{loaderResults:zt,fetcherResults:Vn}=await V(k,P,Pe,on,T);if(T.signal.aborted)return{shortCircuited:!0};ue&&ue.signal.removeEventListener("abort",lt),on.forEach(Ve=>le.delete(Ve.key));let Pn=Zs(zt);if(Pn)return await zn(T,Pn.result,!0,{replace:pe}),{shortCircuited:!0};if(Pn=Zs(Vn),Pn)return U.add(Pn.key),await zn(T,Pn.result,!0,{replace:pe}),{shortCircuited:!0};let{loaderData:vn,errors:wa}=Rm(k,P,zt,be,on,Vn,ge);ge.forEach((Ve,dn)=>{Ve.subscribe(Jt=>{(Jt||Ve.done)&&ge.delete(dn)})}),z.v7_partialHydration&&ce&&k.errors&&(wa=gn({},k.errors,wa));let Bt=On(),yt=Ke(D),Lt=Bt||yt||on.length>0;return gn({matches:P,loaderData:vn,errors:wa},Lt?{fetchers:new Map(k.fetchers)}:{})}function Ft(T){if(T&&!mt(T[1]))return{[T[0]]:T[1].data};if(k.actionData)return Object.keys(k.actionData).length===0?null:k.actionData}function va(T){return T.forEach(_=>{let P=k.fetchers.get(_.key),Q=fl(void 0,P?P.data:void 0);k.fetchers.set(_.key,Q)}),new Map(k.fetchers)}function ni(T,_,P,Q){if(s)throw new Error("router.fetch() was called during the server render, but it shouldn't be. You are likely calling a useFetcher() method in the body of your component. Try moving it to a useEffect or a callback.");mn(T);let se=(Q&&Q.flushSync)===!0,Ee=h||f,xe=Uu(k.location,k.matches,b,z.v7_prependBasename,P,z.v7_relativeSplatPath,_,Q?.relative),pe=wi(Ee,xe,b),ce=ri(pe,Ee,xe);if(ce.active&&ce.matches&&(pe=ce.matches),!pe){Ae(T,_,at(404,{pathname:xe}),{flushSync:se});return}let{path:oe,submission:be,error:Re}=Em(z.v7_normalizeFormMethod,!0,xe,Q);if(Re){Ae(T,_,Re,{flushSync:se});return}let Ue=zl(pe,oe),Mn=(Q&&Q.preventScrollReset)===!0;if(be&&Xt(be.formMethod)){vr(T,_,oe,Ue,pe,ce.active,se,Mn,be);return}E.set(T,{routeId:_,path:oe}),Sr(T,_,oe,Ue,pe,ce.active,se,Mn,be)}async function vr(T,_,P,Q,se,Ee,xe,pe,ce){ae(),E.delete(T);function oe(fn){if(!fn.route.action&&!fn.route.lazy){let Wt=at(405,{method:ce.formMethod,pathname:P,routeId:_});return Ae(T,_,Wt,{flushSync:xe}),!0}return!1}if(!Ee&&oe(Q))return;let be=k.fetchers.get(T);Se(T,Uy(ce,be),{flushSync:xe});let Re=new AbortController,Ue=fr(a.history,P,Re.signal,ce);if(Ee){let fn=await Da(se,new URL(Ue.url).pathname,Ue.signal,T);if(fn.type==="aborted")return;if(fn.type==="error"){Ae(T,_,fn.error,{flushSync:xe});return}else if(fn.matches){if(se=fn.matches,Q=zl(se,P),oe(Q))return}else{Ae(T,_,at(404,{pathname:P}),{flushSync:xe});return}}le.set(T,Re);let Mn=Me,Pe=(await Qt("action",k,Ue,[Q],se,T))[Q.route.id];if(Ue.signal.aborted){le.get(T)===Re&&le.delete(T);return}if(z.v7_fetcherPersist&&ze.has(T)){if(Ti(Pe)||mt(Pe)){Se(T,Qa(void 0));return}}else{if(Ti(Pe))if(le.delete(T),D>Mn){Se(T,Qa(void 0));return}else return U.add(T),Se(T,fl(ce)),zn(Ue,Pe,!1,{fetcherSubmission:ce,preventScrollReset:pe});if(mt(Pe)){Ae(T,_,Pe.error);return}}if(Ka(Pe))throw at(400,{type:"defer-action"});let on=k.navigation.location||k.location,lt=fr(a.history,on,Re.signal),zt=h||f,Vn=k.navigation.state!=="idle"?wi(zt,k.navigation.location,b):k.matches;Oe(Vn,"Didn't find any matches after fetcher action");let Pn=++Me;x.set(T,Pn);let vn=fl(ce,Pe.data);k.fetchers.set(T,vn);let[wa,Bt]=wm(a.history,k,Vn,ce,on,!1,z.v7_skipActionErrorRevalidation,$,C,K,ze,E,U,zt,b,[Q.route.id,Pe]);Bt.filter(fn=>fn.key!==T).forEach(fn=>{let Wt=fn.key,vt=k.fetchers.get(Wt),Fn=fl(void 0,vt?vt.data:void 0);k.fetchers.set(Wt,Fn),mn(Wt),fn.controller&&le.set(Wt,fn.controller)}),Dn({fetchers:new Map(k.fetchers)});let yt=()=>Bt.forEach(fn=>mn(fn.key));Re.signal.addEventListener("abort",yt);let{loaderResults:Lt,fetcherResults:Ve}=await V(k,Vn,wa,Bt,lt);if(Re.signal.aborted)return;Re.signal.removeEventListener("abort",yt),x.delete(T),le.delete(T),Bt.forEach(fn=>le.delete(fn.key));let dn=Zs(Lt);if(dn)return zn(lt,dn.result,!1,{preventScrollReset:pe});if(dn=Zs(Ve),dn)return U.add(dn.key),zn(lt,dn.result,!1,{preventScrollReset:pe});let{loaderData:Jt,errors:si}=Rm(k,Vn,Lt,void 0,Bt,Ve,ge);if(k.fetchers.has(T)){let fn=Qa(Pe.data);k.fetchers.set(T,fn)}Ke(Pn),k.navigation.state==="loading"&&Pn>D?(Oe(te,"Expected pending action"),ue&&ue.abort(),Mt(k.navigation.location,{matches:Vn,loaderData:Jt,errors:si,fetchers:new Map(k.fetchers)})):(Dn({errors:si,loaderData:_m(k.loaderData,Jt,Vn,si),fetchers:new Map(k.fetchers)}),$=!1)}async function Sr(T,_,P,Q,se,Ee,xe,pe,ce){let oe=k.fetchers.get(T);Se(T,fl(ce,oe?oe.data:void 0),{flushSync:xe});let be=new AbortController,Re=fr(a.history,P,be.signal);if(Ee){let Pe=await Da(se,new URL(Re.url).pathname,Re.signal,T);if(Pe.type==="aborted")return;if(Pe.type==="error"){Ae(T,_,Pe.error,{flushSync:xe});return}else if(Pe.matches)se=Pe.matches,Q=zl(se,P);else{Ae(T,_,at(404,{pathname:P}),{flushSync:xe});return}}le.set(T,be);let Ue=Me,$e=(await Qt("loader",k,Re,[Q],se,T))[Q.route.id];if(Ka($e)&&($e=await id($e,Re.signal,!0)||$e),le.get(T)===be&&le.delete(T),!Re.signal.aborted){if(ze.has(T)){Se(T,Qa(void 0));return}if(Ti($e))if(D>Ue){Se(T,Qa(void 0));return}else{U.add(T),await zn(Re,$e,!1,{preventScrollReset:pe});return}if(mt($e)){Ae(T,_,$e.error);return}Oe(!Ka($e),"Unhandled fetcher deferred data"),Se(T,Qa($e.data))}}async function zn(T,_,P,Q){let{submission:se,fetcherSubmission:Ee,preventScrollReset:xe,replace:pe}=Q===void 0?{}:Q;_.response.headers.has("X-Remix-Revalidate")&&($=!0);let ce=_.response.headers.get("Location");Oe(ce,"Expected a Location header on the redirect Response"),ce=Am(ce,new URL(T.url),b,a.history);let oe=El(k.location,ce,{_isRedirect:!0});if(l){let Pe=!1;if(_.response.headers.has("X-Remix-Reload-Document"))Pe=!0;else if(ad.test(ce)){const on=a.history.createURL(ce);Pe=on.origin!==r.location.origin||ga(on.pathname,b)==null}if(Pe){pe?r.location.replace(ce):r.location.assign(ce);return}}ue=null;let be=pe===!0||_.response.headers.has("X-Remix-Replace")?In.Replace:In.Push,{formMethod:Re,formAction:Ue,formEncType:Mn}=k.navigation;!se&&!Ee&&Re&&Ue&&Mn&&(se=Lm(k.navigation));let $e=se||Ee;if(vy.has(_.response.status)&&$e&&Xt($e.formMethod))await Gn(be,oe,{submission:gn({},$e,{formAction:ce}),preventScrollReset:xe||he,enableViewTransition:P?ie:void 0});else{let Pe=Du(oe,se);await Gn(be,oe,{overrideNavigation:Pe,fetcherSubmission:Ee,preventScrollReset:xe||he,enableViewTransition:P?ie:void 0})}}async function Qt(T,_,P,Q,se,Ee){let xe,pe={};try{xe=await ky(p,T,_,P,Q,se,Ee,d,u)}catch(ce){return Q.forEach(oe=>{pe[oe.route.id]={type:tn.error,error:ce}}),pe}for(let[ce,oe]of Object.entries(xe))if(Ly(oe)){let be=oe.result;pe[ce]={type:tn.redirect,response:Iy(be,P,ce,se,b,z.v7_relativeSplatPath)}}else pe[ce]=await _y(oe);return pe}async function V(T,_,P,Q,se){let Ee=T.matches,xe=Qt("loader",T,se,P,_,null),pe=Promise.all(Q.map(async be=>{if(be.matches&&be.match&&be.controller){let Ue=(await Qt("loader",T,fr(a.history,be.path,be.controller.signal),[be.match],be.matches,be.key))[be.match.route.id];return{[be.key]:Ue}}else return Promise.resolve({[be.key]:{type:tn.error,error:at(404,{pathname:be.path})}})})),ce=await xe,oe=(await pe).reduce((be,Re)=>Object.assign(be,Re),{});return await Promise.all([Py(_,ce,se.signal,Ee,T.loaderData),Ny(_,oe,Q)]),{loaderResults:ce,fetcherResults:oe}}function ae(){$=!0,C.push(...Ea()),E.forEach((T,_)=>{le.has(_)&&K.add(_),mn(_)})}function Se(T,_,P){P===void 0&&(P={}),k.fetchers.set(T,_),Dn({fetchers:new Map(k.fetchers)},{flushSync:(P&&P.flushSync)===!0})}function Ae(T,_,P,Q){Q===void 0&&(Q={});let se=xi(k.matches,_);Ln(T),Dn({errors:{[se.route.id]:P},fetchers:new Map(k.fetchers)},{flushSync:(Q&&Q.flushSync)===!0})}function He(T){return re.set(T,(re.get(T)||0)+1),ze.has(T)&&ze.delete(T),k.fetchers.get(T)||Sy}function Ln(T){let _=k.fetchers.get(T);le.has(T)&&!(_&&_.state==="loading"&&x.has(T))&&mn(T),E.delete(T),x.delete(T),U.delete(T),z.v7_fetcherPersist&&ze.delete(T),K.delete(T),k.fetchers.delete(T)}function Ct(T){let _=(re.get(T)||0)-1;_<=0?(re.delete(T),ze.add(T),z.v7_fetcherPersist||Ln(T)):re.set(T,_),Dn({fetchers:new Map(k.fetchers)})}function mn(T){let _=le.get(T);_&&(_.abort(),le.delete(T))}function yn(T){for(let _ of T){let P=He(_),Q=Qa(P.data);k.fetchers.set(_,Q)}}function On(){let T=[],_=!1;for(let P of U){let Q=k.fetchers.get(P);Oe(Q,"Expected fetcher: "+P),Q.state==="loading"&&(U.delete(P),T.push(P),_=!0)}return yn(T),_}function Ke(T){let _=[];for(let[P,Q]of x)if(Q<T){let se=k.fetchers.get(P);Oe(se,"Expected fetcher: "+P),se.state==="loading"&&(mn(P),x.delete(P),_.push(P))}return yn(_),_.length>0}function Ut(T,_){let P=k.blockers.get(T)||dl;return _e.get(T)!==_&&_e.set(T,_),P}function Yn(T){k.blockers.delete(T),_e.delete(T)}function Mi(T,_){let P=k.blockers.get(T)||dl;Oe(P.state==="unblocked"&&_.state==="blocked"||P.state==="blocked"&&_.state==="blocked"||P.state==="blocked"&&_.state==="proceeding"||P.state==="blocked"&&_.state==="unblocked"||P.state==="proceeding"&&_.state==="unblocked","Invalid blocker state transition: "+P.state+" -> "+_.state);let Q=new Map(k.blockers);Q.set(T,_),Dn({blockers:Q})}function ti(T){let{currentLocation:_,nextLocation:P,historyAction:Q}=T;if(_e.size===0)return;_e.size>1&&Ai(!1,"A router only supports one blocker at a time");let se=Array.from(_e.entries()),[Ee,xe]=se[se.length-1],pe=k.blockers.get(Ee);if(!(pe&&pe.state==="proceeding")&&xe({currentLocation:_,nextLocation:P,historyAction:Q}))return Ee}function Sa(T){let _=at(404,{pathname:T}),P=h||f,{matches:Q,route:se}=Mm(P);return Ea(),{notFoundMatches:Q,route:se,error:_}}function Ea(T){let _=[];return ge.forEach((P,Q)=>{(!T||T(Q))&&(P.cancel(),_.push(Q),ge.delete(Q))}),_}function Kt(T,_,P){if(L=T,j=_,O=P||null,!X&&k.navigation===Eu){X=!0;let Q=Il(k.location,k.matches);Q!=null&&Dn({restoreScrollPosition:Q})}return()=>{L=null,j=null,O=null}}function ai(T,_){return O&&O(T,_.map(Q=>Kz(Q,k.loaderData)))||T.key}function ii(T,_){if(L&&j){let P=ai(T,_);L[P]=j()}}function Il(T,_){if(L){let P=ai(T,_),Q=L[P];if(typeof Q=="number")return Q}return null}function ri(T,_,P){if(g)if(T){if(Object.keys(T[0].params).length>0)return{active:!0,matches:qs(_,P,b,!0)}}else return{active:!0,matches:qs(_,P,b,!0)||[]};return{active:!1,matches:null}}async function Da(T,_,P,Q){if(!g)return{type:"success",matches:T};let se=T;for(;;){let Ee=h==null,xe=h||f,pe=d;try{await g({signal:P,path:_,matches:se,fetcherKey:Q,patch:(be,Re)=>{P.aborted||Tm(be,Re,xe,pe,u)}})}catch(be){return{type:"error",error:be,partialMatches:se}}finally{Ee&&!P.aborted&&(f=[...f])}if(P.aborted)return{type:"aborted"};let ce=wi(xe,_,b);if(ce)return{type:"success",matches:ce};let oe=qs(xe,_,b,!0);if(!oe||se.length===oe.length&&se.every((be,Re)=>be.route.id===oe[Re].route.id))return{type:"success",matches:null};se=oe}}function li(T){d={},h=Ys(T,u,void 0,d)}function lo(T,_){let P=h==null;Tm(T,_,h||f,d,u),P&&(f=[...f],Dn({}))}return Z={get basename(){return b},get future(){return z},get state(){return k},get routes(){return f},get window(){return r},initialize:Qe,subscribe:It,enableScrollRestoration:Kt,navigate:gt,fetch:ni,revalidate:ya,createHref:T=>a.history.createHref(T),encodeLocation:T=>a.history.encodeLocation(T),getFetcher:He,deleteFetcher:Ct,dispose:qn,getBlocker:Ut,deleteBlocker:Yn,patchRoutes:lo,_internalFetchControllers:le,_internalActiveDeferreds:ge,_internalSetRoutes:li},Z}function wy(a){return a!=null&&("formData"in a&&a.formData!=null||"body"in a&&a.body!==void 0)}function Uu(a,r,l,s,u,d,f,h){let b,p;if(f){b=[];for(let z of r)if(b.push(z),z.route.id===f){p=z;break}}else b=r,p=r[r.length-1];let g=td(u||".",nd(b,d),ga(a.pathname,l)||a.pathname,h==="path");if(u==null&&(g.search=a.search,g.hash=a.hash),(u==null||u===""||u===".")&&p){let z=rd(g.search);if(p.route.index&&!z)g.search=g.search?g.search.replace(/^\?/,"?index&"):"?index";else if(!p.route.index&&z){let S=new URLSearchParams(g.search),v=S.getAll("index");S.delete("index"),v.filter(O=>O).forEach(O=>S.append("index",O));let L=S.toString();g.search=L?"?"+L:""}}return s&&l!=="/"&&(g.pathname=g.pathname==="/"?l:ba([l,g.pathname])),ki(g)}function Em(a,r,l,s){if(!s||!wy(s))return{path:l};if(s.formMethod&&!Oy(s.formMethod))return{path:l,error:at(405,{method:s.formMethod})};let u=()=>({path:l,error:at(400,{type:"invalid-body"})}),d=s.formMethod||"get",f=a?d.toUpperCase():d.toLowerCase(),h=Ob(l);if(s.body!==void 0){if(s.formEncType==="text/plain"){if(!Xt(f))return u();let S=typeof s.body=="string"?s.body:s.body instanceof FormData||s.body instanceof URLSearchParams?Array.from(s.body.entries()).reduce((v,L)=>{let[O,j]=L;return""+v+O+"="+j+`
`},""):String(s.body);return{path:l,submission:{formMethod:f,formAction:h,formEncType:s.formEncType,formData:void 0,json:void 0,text:S}}}else if(s.formEncType==="application/json"){if(!Xt(f))return u();try{let S=typeof s.body=="string"?JSON.parse(s.body):s.body;return{path:l,submission:{formMethod:f,formAction:h,formEncType:s.formEncType,formData:void 0,json:S,text:void 0}}}catch{return u()}}}Oe(typeof FormData=="function","FormData is not available in this environment");let b,p;if(s.formData)b=Zu(s.formData),p=s.formData;else if(s.body instanceof FormData)b=Zu(s.body),p=s.body;else if(s.body instanceof URLSearchParams)b=s.body,p=km(b);else if(s.body==null)b=new URLSearchParams,p=new FormData;else try{b=new URLSearchParams(s.body),p=km(b)}catch{return u()}let g={formMethod:f,formAction:h,formEncType:s&&s.formEncType||"application/x-www-form-urlencoded",formData:p,json:void 0,text:void 0};if(Xt(g.formMethod))return{path:l,submission:g};let z=Ja(l);return r&&z.search&&rd(z.search)&&b.append("index",""),z.search="?"+b,{path:ki(z),submission:g}}function Dm(a,r,l){l===void 0&&(l=!1);let s=a.findIndex(u=>u.route.id===r);return s>=0?a.slice(0,l?s+1:s):a}function wm(a,r,l,s,u,d,f,h,b,p,g,z,S,v,L,O){let j=O?mt(O[1])?O[1].error:O[1].data:void 0,X=a.createURL(r.location),Y=a.createURL(u),q=l;d&&r.errors?q=Dm(l,Object.keys(r.errors)[0],!0):O&&mt(O[1])&&(q=Dm(l,O[0]));let de=O?O[1].statusCode:void 0,ye=f&&de&&de>=400,Z=q.filter((te,he)=>{let{route:ue}=te;if(ue.lazy)return!0;if(ue.loader==null)return!1;if(d)return Bu(ue,r.loaderData,r.errors);if(xy(r.loaderData,r.matches[he],te)||b.some(Te=>Te===te.route.id))return!0;let ie=r.matches[he],ne=te;return xm(te,gn({currentUrl:X,currentParams:ie.params,nextUrl:Y,nextParams:ne.params},s,{actionResult:j,actionStatus:de,defaultShouldRevalidate:ye?!1:h||X.pathname+X.search===Y.pathname+Y.search||X.search!==Y.search||Lb(ie,ne)}))}),k=[];return z.forEach((te,he)=>{if(d||!l.some(fe=>fe.route.id===te.routeId)||g.has(he))return;let ue=wi(v,te.path,L);if(!ue){k.push({key:he,routeId:te.routeId,path:te.path,matches:null,match:null,controller:null});return}let ie=r.fetchers.get(he),ne=zl(ue,te.path),Te=!1;S.has(he)?Te=!1:p.has(he)?(p.delete(he),Te=!0):ie&&ie.state!=="idle"&&ie.data===void 0?Te=h:Te=xm(ne,gn({currentUrl:X,currentParams:r.matches[r.matches.length-1].params,nextUrl:Y,nextParams:l[l.length-1].params},s,{actionResult:j,actionStatus:de,defaultShouldRevalidate:ye?!1:h})),Te&&k.push({key:he,routeId:te.routeId,path:te.path,matches:ue,match:ne,controller:new AbortController})}),[Z,k]}function Bu(a,r,l){if(a.lazy)return!0;if(!a.loader)return!1;let s=r!=null&&r[a.id]!==void 0,u=l!=null&&l[a.id]!==void 0;return!s&&u?!1:typeof a.loader=="function"&&a.loader.hydrate===!0?!0:!s&&!u}function xy(a,r,l){let s=!r||l.route.id!==r.route.id,u=a[l.route.id]===void 0;return s||u}function Lb(a,r){let l=a.route.path;return a.pathname!==r.pathname||l!=null&&l.endsWith("*")&&a.params["*"]!==r.params["*"]}function xm(a,r){if(a.route.shouldRevalidate){let l=a.route.shouldRevalidate(r);if(typeof l=="boolean")return l}return r.defaultShouldRevalidate}function Tm(a,r,l,s,u){var d;let f;if(a){let p=s[a];Oe(p,"No route found to patch children into: routeId = "+a),p.children||(p.children=[]),f=p.children}else f=l;let h=r.filter(p=>!f.some(g=>Wb(p,g))),b=Ys(h,u,[a||"_","patch",String(((d=f)==null?void 0:d.length)||"0")],s);f.push(...b)}function Wb(a,r){return"id"in a&&"id"in r&&a.id===r.id?!0:a.index===r.index&&a.path===r.path&&a.caseSensitive===r.caseSensitive?(!a.children||a.children.length===0)&&(!r.children||r.children.length===0)?!0:a.children.every((l,s)=>{var u;return(u=r.children)==null?void 0:u.some(d=>Wb(l,d))}):!1}async function Ty(a,r,l){if(!a.lazy)return;let s=await a.lazy();if(!a.lazy)return;let u=l[a.id];Oe(u,"No route found in manifest");let d={};for(let f in s){let b=u[f]!==void 0&&f!=="hasErrorBoundary";Ai(!b,'Route "'+u.id+'" has a static property "'+f+'" defined but its lazy function is also returning a value for this property. '+('The lazy route property "'+f+'" will be ignored.')),!b&&!Fz.has(f)&&(d[f]=s[f])}Object.assign(u,d),Object.assign(u,gn({},r(u),{lazy:void 0}))}async function Ay(a){let{matches:r}=a,l=r.filter(u=>u.shouldLoad);return(await Promise.all(l.map(u=>u.resolve()))).reduce((u,d,f)=>Object.assign(u,{[l[f].route.id]:d}),{})}async function ky(a,r,l,s,u,d,f,h,b,p){let g=d.map(v=>v.route.lazy?Ty(v.route,b,h):void 0),z=d.map((v,L)=>{let O=g[L],j=u.some(Y=>Y.route.id===v.route.id);return gn({},v,{shouldLoad:j,resolve:async Y=>(Y&&s.method==="GET"&&(v.route.lazy||v.route.loader)&&(j=!0),j?Ry(r,s,v,O,Y,p):Promise.resolve({type:tn.data,result:void 0}))})}),S=await a({matches:z,request:s,params:d[0].params,fetcherKey:f,context:p});try{await Promise.all(g)}catch{}return S}async function Ry(a,r,l,s,u,d){let f,h,b=p=>{let g,z=new Promise((L,O)=>g=O);h=()=>g(),r.signal.addEventListener("abort",h);let S=L=>typeof p!="function"?Promise.reject(new Error("You cannot call the handler for a route which defines a boolean "+('"'+a+'" [routeId: '+l.route.id+"]"))):p({request:r,params:l.params,context:d},...L!==void 0?[L]:[]),v=(async()=>{try{return{type:"data",result:await(u?u(O=>S(O)):S())}}catch(L){return{type:"error",result:L}}})();return Promise.race([v,z])};try{let p=l.route[a];if(s)if(p){let g,[z]=await Promise.all([b(p).catch(S=>{g=S}),s]);if(g!==void 0)throw g;f=z}else if(await s,p=l.route[a],p)f=await b(p);else if(a==="action"){let g=new URL(r.url),z=g.pathname+g.search;throw at(405,{method:r.method,pathname:z,routeId:l.route.id})}else return{type:tn.data,result:void 0};else if(p)f=await b(p);else{let g=new URL(r.url),z=g.pathname+g.search;throw at(404,{pathname:z})}Oe(f.result!==void 0,"You defined "+(a==="action"?"an action":"a loader")+" for route "+('"'+l.route.id+"\" but didn't return anything from your `"+a+"` ")+"function. Please return a value or `null`.")}catch(p){return{type:tn.error,result:p}}finally{h&&r.signal.removeEventListener("abort",h)}return f}async function _y(a){let{result:r,type:l}=a;if(Pb(r)){let z;try{let S=r.headers.get("Content-Type");S&&/\bapplication\/json\b/.test(S)?r.body==null?z=null:z=await r.json():z=await r.text()}catch(S){return{type:tn.error,error:S}}return l===tn.error?{type:tn.error,error:new Qs(r.status,r.statusText,z),statusCode:r.status,headers:r.headers}:{type:tn.data,data:z,statusCode:r.status,headers:r.headers}}if(l===tn.error){if(Cm(r)){var s,u;if(r.data instanceof Error){var d,f;return{type:tn.error,error:r.data,statusCode:(d=r.init)==null?void 0:d.status,headers:(f=r.init)!=null&&f.headers?new Headers(r.init.headers):void 0}}return{type:tn.error,error:new Qs(((s=r.init)==null?void 0:s.status)||500,void 0,r.data),statusCode:Dl(r)?r.status:void 0,headers:(u=r.init)!=null&&u.headers?new Headers(r.init.headers):void 0}}return{type:tn.error,error:r,statusCode:Dl(r)?r.status:void 0}}if(Wy(r)){var h,b;return{type:tn.deferred,deferredData:r,statusCode:(h=r.init)==null?void 0:h.status,headers:((b=r.init)==null?void 0:b.headers)&&new Headers(r.init.headers)}}if(Cm(r)){var p,g;return{type:tn.data,data:r.data,statusCode:(p=r.init)==null?void 0:p.status,headers:(g=r.init)!=null&&g.headers?new Headers(r.init.headers):void 0}}return{type:tn.data,data:r}}function Iy(a,r,l,s,u,d){let f=a.headers.get("Location");if(Oe(f,"Redirects returned/thrown from loaders/actions must have a Location header"),!ad.test(f)){let h=s.slice(0,s.findIndex(b=>b.route.id===l)+1);f=Uu(new URL(r.url),h,u,!0,f,d),a.headers.set("Location",f)}return a}function Am(a,r,l,s){let u=["about:","blob:","chrome:","chrome-untrusted:","content:","data:","devtools:","file:","filesystem:","javascript:"];if(ad.test(a)){let d=a,f=d.startsWith("//")?new URL(r.protocol+d):new URL(d);if(u.includes(f.protocol))throw new Error("Invalid redirect location");let h=ga(f.pathname,l)!=null;if(f.origin===r.origin&&h)return f.pathname+f.search+f.hash}try{let d=s.createURL(a);if(u.includes(d.protocol))throw new Error("Invalid redirect location")}catch{}return a}function fr(a,r,l,s){let u=a.createURL(Ob(r)).toString(),d={signal:l};if(s&&Xt(s.formMethod)){let{formMethod:f,formEncType:h}=s;d.method=f.toUpperCase(),h==="application/json"?(d.headers=new Headers({"Content-Type":h}),d.body=JSON.stringify(s.json)):h==="text/plain"?d.body=s.text:h==="application/x-www-form-urlencoded"&&s.formData?d.body=Zu(s.formData):d.body=s.formData}return new Request(u,d)}function Zu(a){let r=new URLSearchParams;for(let[l,s]of a.entries())r.append(l,typeof s=="string"?s:s.name);return r}function km(a){let r=new FormData;for(let[l,s]of a.entries())r.append(l,s);return r}function My(a,r,l,s,u){let d={},f=null,h,b=!1,p={},g=l&&mt(l[1])?l[1].error:void 0;return a.forEach(z=>{if(!(z.route.id in r))return;let S=z.route.id,v=r[S];if(Oe(!Ti(v),"Cannot handle redirect results in processLoaderData"),mt(v)){let L=v.error;g!==void 0&&(L=g,g=void 0),f=f||{};{let O=xi(a,S);f[O.route.id]==null&&(f[O.route.id]=L)}d[S]=void 0,b||(b=!0,h=Dl(v.error)?v.error.status:500),v.headers&&(p[S]=v.headers)}else Ka(v)?(s.set(S,v.deferredData),d[S]=v.deferredData.data,v.statusCode!=null&&v.statusCode!==200&&!b&&(h=v.statusCode),v.headers&&(p[S]=v.headers)):(d[S]=v.data,v.statusCode&&v.statusCode!==200&&!b&&(h=v.statusCode),v.headers&&(p[S]=v.headers))}),g!==void 0&&l&&(f={[l[0]]:g},d[l[0]]=void 0),{loaderData:d,errors:f,statusCode:h||200,loaderHeaders:p}}function Rm(a,r,l,s,u,d,f){let{loaderData:h,errors:b}=My(r,l,s,f);return u.forEach(p=>{let{key:g,match:z,controller:S}=p,v=d[g];if(Oe(v,"Did not find corresponding fetcher result"),!(S&&S.signal.aborted))if(mt(v)){let L=xi(a.matches,z?.route.id);b&&b[L.route.id]||(b=gn({},b,{[L.route.id]:v.error})),a.fetchers.delete(g)}else if(Ti(v))Oe(!1,"Unhandled fetcher revalidation redirect");else if(Ka(v))Oe(!1,"Unhandled fetcher deferred data");else{let L=Qa(v.data);a.fetchers.set(g,L)}}),{loaderData:h,errors:b}}function _m(a,r,l,s){let u=gn({},r);for(let d of l){let f=d.route.id;if(r.hasOwnProperty(f)?r[f]!==void 0&&(u[f]=r[f]):a[f]!==void 0&&d.route.loader&&(u[f]=a[f]),s&&s.hasOwnProperty(f))break}return u}function Im(a){return a?mt(a[1])?{actionData:{}}:{actionData:{[a[0]]:a[1].data}}:{}}function xi(a,r){return(r?a.slice(0,a.findIndex(s=>s.route.id===r)+1):[...a]).reverse().find(s=>s.route.hasErrorBoundary===!0)||a[0]}function Mm(a){let r=a.length===1?a[0]:a.find(l=>l.index||!l.path||l.path==="/")||{id:"__shim-error-route__"};return{matches:[{params:{},pathname:"",pathnameBase:"",route:r}],route:r}}function at(a,r){let{pathname:l,routeId:s,method:u,type:d,message:f}=r===void 0?{}:r,h="Unknown Server Error",b="Unknown @remix-run/router error";return a===400?(h="Bad Request",u&&l&&s?b="You made a "+u+' request to "'+l+'" but '+('did not provide a `loader` for route "'+s+'", ')+"so there is no way to handle the request.":d==="defer-action"?b="defer() is not supported in actions":d==="invalid-body"&&(b="Unable to encode submission body")):a===403?(h="Forbidden",b='Route "'+s+'" does not match URL "'+l+'"'):a===404?(h="Not Found",b='No route matches URL "'+l+'"'):a===405&&(h="Method Not Allowed",u&&l&&s?b="You made a "+u.toUpperCase()+' request to "'+l+'" but '+('did not provide an `action` for route "'+s+'", ')+"so there is no way to handle the request.":u&&(b='Invalid request method "'+u.toUpperCase()+'"')),new Qs(a||500,h,new Error(b),!0)}function Zs(a){let r=Object.entries(a);for(let l=r.length-1;l>=0;l--){let[s,u]=r[l];if(Ti(u))return{key:s,result:u}}}function Ob(a){let r=typeof a=="string"?Ja(a):a;return ki(gn({},r,{hash:""}))}function Cy(a,r){return a.pathname!==r.pathname||a.search!==r.search?!1:a.hash===""?r.hash!=="":a.hash===r.hash?!0:r.hash!==""}function Ly(a){return Pb(a.result)&&yy.has(a.result.status)}function Ka(a){return a.type===tn.deferred}function mt(a){return a.type===tn.error}function Ti(a){return(a&&a.type)===tn.redirect}function Cm(a){return typeof a=="object"&&a!=null&&"type"in a&&"data"in a&&"init"in a&&a.type==="DataWithResponseInit"}function Wy(a){let r=a;return r&&typeof r=="object"&&typeof r.data=="object"&&typeof r.subscribe=="function"&&typeof r.cancel=="function"&&typeof r.resolveData=="function"}function Pb(a){return a!=null&&typeof a.status=="number"&&typeof a.statusText=="string"&&typeof a.headers=="object"&&typeof a.body<"u"}function Oy(a){return zy.has(a.toLowerCase())}function Xt(a){return by.has(a.toLowerCase())}async function Py(a,r,l,s,u){let d=Object.entries(r);for(let f=0;f<d.length;f++){let[h,b]=d[f],p=a.find(S=>S?.route.id===h);if(!p)continue;let g=s.find(S=>S.route.id===p.route.id),z=g!=null&&!Lb(g,p)&&(u&&u[p.route.id])!==void 0;Ka(b)&&z&&await id(b,l,!1).then(S=>{S&&(r[h]=S)})}}async function Ny(a,r,l){for(let s=0;s<l.length;s++){let{key:u,routeId:d,controller:f}=l[s],h=r[u];a.find(p=>p?.route.id===d)&&Ka(h)&&(Oe(f,"Expected an AbortController for revalidating fetcher deferred result"),await id(h,f.signal,!0).then(p=>{p&&(r[u]=p)}))}}async function id(a,r,l){if(l===void 0&&(l=!1),!await a.deferredData.resolveData(r)){if(l)try{return{type:tn.data,data:a.deferredData.unwrappedData}}catch(u){return{type:tn.error,error:u}}return{type:tn.data,data:a.deferredData.data}}}function rd(a){return new URLSearchParams(a).getAll("index").some(r=>r==="")}function zl(a,r){let l=typeof r=="string"?Ja(r).search:r.search;if(a[a.length-1].route.index&&rd(l||""))return a[a.length-1];let s=Ib(a);return s[s.length-1]}function Lm(a){let{formMethod:r,formAction:l,formEncType:s,text:u,formData:d,json:f}=a;if(!(!r||!l||!s)){if(u!=null)return{formMethod:r,formAction:l,formEncType:s,formData:void 0,json:void 0,text:u};if(d!=null)return{formMethod:r,formAction:l,formEncType:s,formData:d,json:void 0,text:void 0};if(f!==void 0)return{formMethod:r,formAction:l,formEncType:s,formData:void 0,json:f,text:void 0}}}function Du(a,r){return r?{state:"loading",location:a,formMethod:r.formMethod,formAction:r.formAction,formEncType:r.formEncType,formData:r.formData,json:r.json,text:r.text}:{state:"loading",location:a,formMethod:void 0,formAction:void 0,formEncType:void 0,formData:void 0,json:void 0,text:void 0}}function Xy(a,r){return{state:"submitting",location:a,formMethod:r.formMethod,formAction:r.formAction,formEncType:r.formEncType,formData:r.formData,json:r.json,text:r.text}}function fl(a,r){return a?{state:"loading",formMethod:a.formMethod,formAction:a.formAction,formEncType:a.formEncType,formData:a.formData,json:a.json,text:a.text,data:r}:{state:"loading",formMethod:void 0,formAction:void 0,formEncType:void 0,formData:void 0,json:void 0,text:void 0,data:r}}function Uy(a,r){return{state:"submitting",formMethod:a.formMethod,formAction:a.formAction,formEncType:a.formEncType,formData:a.formData,json:a.json,text:a.text,data:r?r.data:void 0}}function Qa(a){return{state:"idle",formMethod:void 0,formAction:void 0,formEncType:void 0,formData:void 0,json:void 0,text:void 0,data:a}}function By(a,r){try{let l=a.sessionStorage.getItem(Cb);if(l){let s=JSON.parse(l);for(let[u,d]of Object.entries(s||{}))d&&Array.isArray(d)&&r.set(u,new Set(d||[]))}}catch{}}function Zy(a,r){if(r.size>0){let l={};for(let[s,u]of r)l[s]=[...u];try{a.sessionStorage.setItem(Cb,JSON.stringify(l))}catch(s){Ai(!1,"Failed to save applied view transitions in sessionStorage ("+s+").")}}}function Ks(){return Ks=Object.assign?Object.assign.bind():function(a){for(var r=1;r<arguments.length;r++){var l=arguments[r];for(var s in l)Object.prototype.hasOwnProperty.call(l,s)&&(a[s]=l[s])}return a},Ks.apply(this,arguments)}const Tl=J.createContext(null),ld=J.createContext(null),$a=J.createContext(null),sd=J.createContext(null),za=J.createContext({outlet:null,matches:[],isDataRoute:!1}),Nb=J.createContext(null);function jy(a,r){let{relative:l}=r===void 0?{}:r;Al()||Oe(!1);let{basename:s,navigator:u}=J.useContext($a),{hash:d,pathname:f,search:h}=to(a,{relative:l}),b=f;return s!=="/"&&(b=f==="/"?s:ba([s,f])),u.createHref({pathname:b,search:h,hash:d})}function Al(){return J.useContext(sd)!=null}function kl(){return Al()||Oe(!1),J.useContext(sd).location}function Xb(a){J.useContext($a).static||J.useLayoutEffect(a)}function Vy(){let{isDataRoute:a}=J.useContext(za);return a?r0():Hy()}function Hy(){Al()||Oe(!1);let a=J.useContext(Tl),{basename:r,future:l,navigator:s}=J.useContext($a),{matches:u}=J.useContext(za),{pathname:d}=kl(),f=JSON.stringify(nd(u,l.v7_relativeSplatPath)),h=J.useRef(!1);return Xb(()=>{h.current=!0}),J.useCallback(function(p,g){if(g===void 0&&(g={}),!h.current)return;if(typeof p=="number"){s.go(p);return}let z=td(p,JSON.parse(f),d,g.relative==="path");a==null&&r!=="/"&&(z.pathname=z.pathname==="/"?r:ba([r,z.pathname])),(g.replace?s.replace:s.push)(z,g.state,g)},[r,s,f,d,a])}const qy=J.createContext(null);function Gy(a){let r=J.useContext(za).outlet;return r&&J.createElement(qy.Provider,{value:a},r)}function Yy(){let{matches:a}=J.useContext(za),r=a[a.length-1];return r?r.params:{}}function to(a,r){let{relative:l}=r===void 0?{}:r,{future:s}=J.useContext($a),{matches:u}=J.useContext(za),{pathname:d}=kl(),f=JSON.stringify(nd(u,s.v7_relativeSplatPath));return J.useMemo(()=>td(a,JSON.parse(f),d,l==="path"),[a,f,d,l])}function Fy(a,r,l,s){Al()||Oe(!1);let{navigator:u}=J.useContext($a),{matches:d}=J.useContext(za),f=d[d.length-1],h=f?f.params:{};f&&f.pathname;let b=f?f.pathnameBase:"/";f&&f.route;let p=kl(),g;g=p;let z=g.pathname||"/",S=z;if(b!=="/"){let O=b.replace(/^\//,"").split("/");S="/"+z.replace(/^\//,"").split("/").slice(O.length).join("/")}let v=wi(a,{pathname:S});return e0(v&&v.map(O=>Object.assign({},O,{params:Object.assign({},h,O.params),pathname:ba([b,u.encodeLocation?u.encodeLocation(O.pathname).pathname:O.pathname]),pathnameBase:O.pathnameBase==="/"?b:ba([b,u.encodeLocation?u.encodeLocation(O.pathnameBase).pathname:O.pathnameBase])})),d,l,s)}function Qy(){let a=i0(),r=Dl(a)?a.status+" "+a.statusText:a instanceof Error?a.message:JSON.stringify(a),l=a instanceof Error?a.stack:null,u={padding:"0.5rem",backgroundColor:"rgba(200,200,200, 0.5)"};return J.createElement(J.Fragment,null,J.createElement("h2",null,"Unexpected Application Error!"),J.createElement("h3",{style:{fontStyle:"italic"}},r),l?J.createElement("pre",{style:u},l):null,null)}const Ky=J.createElement(Qy,null);class Jy extends J.Component{constructor(r){super(r),this.state={location:r.location,revalidation:r.revalidation,error:r.error}}static getDerivedStateFromError(r){return{error:r}}static getDerivedStateFromProps(r,l){return l.location!==r.location||l.revalidation!=="idle"&&r.revalidation==="idle"?{error:r.error,location:r.location,revalidation:r.revalidation}:{error:r.error!==void 0?r.error:l.error,location:l.location,revalidation:r.revalidation||l.revalidation}}componentDidCatch(r,l){console.error("React Router caught the following error during render",r,l)}render(){return this.state.error!==void 0?J.createElement(za.Provider,{value:this.props.routeContext},J.createElement(Nb.Provider,{value:this.state.error,children:this.props.component})):this.props.children}}function $y(a){let{routeContext:r,match:l,children:s}=a,u=J.useContext(Tl);return u&&u.static&&u.staticContext&&(l.route.errorElement||l.route.ErrorBoundary)&&(u.staticContext._deepestRenderedBoundaryId=l.route.id),J.createElement(za.Provider,{value:r},s)}function e0(a,r,l,s){var u;if(r===void 0&&(r=[]),l===void 0&&(l=null),s===void 0&&(s=null),a==null){var d;if(!l)return null;if(l.errors)a=l.matches;else if((d=s)!=null&&d.v7_partialHydration&&r.length===0&&!l.initialized&&l.matches.length>0)a=l.matches;else return null}let f=a,h=(u=l)==null?void 0:u.errors;if(h!=null){let g=f.findIndex(z=>z.route.id&&h?.[z.route.id]!==void 0);g>=0||Oe(!1),f=f.slice(0,Math.min(f.length,g+1))}let b=!1,p=-1;if(l&&s&&s.v7_partialHydration)for(let g=0;g<f.length;g++){let z=f[g];if((z.route.HydrateFallback||z.route.hydrateFallbackElement)&&(p=g),z.route.id){let{loaderData:S,errors:v}=l,L=z.route.loader&&S[z.route.id]===void 0&&(!v||v[z.route.id]===void 0);if(z.route.lazy||L){b=!0,p>=0?f=f.slice(0,p+1):f=[f[0]];break}}}return f.reduceRight((g,z,S)=>{let v,L=!1,O=null,j=null;l&&(v=h&&z.route.id?h[z.route.id]:void 0,O=z.route.errorElement||Ky,b&&(p<0&&S===0?(l0("route-fallback"),L=!0,j=null):p===S&&(L=!0,j=z.route.hydrateFallbackElement||null)));let X=r.concat(f.slice(0,S+1)),Y=()=>{let q;return v?q=O:L?q=j:z.route.Component?q=J.createElement(z.route.Component,null):z.route.element?q=z.route.element:q=g,J.createElement($y,{match:z,routeContext:{outlet:g,matches:X,isDataRoute:l!=null},children:q})};return l&&(z.route.ErrorBoundary||z.route.errorElement||S===0)?J.createElement(Jy,{location:l.location,revalidation:l.revalidation,component:O,error:v,children:Y(),routeContext:{outlet:null,matches:X,isDataRoute:!0}}):Y()},null)}var Ub=(function(a){return a.UseBlocker="useBlocker",a.UseRevalidator="useRevalidator",a.UseNavigateStable="useNavigate",a})(Ub||{}),Bb=(function(a){return a.UseBlocker="useBlocker",a.UseLoaderData="useLoaderData",a.UseActionData="useActionData",a.UseRouteError="useRouteError",a.UseNavigation="useNavigation",a.UseRouteLoaderData="useRouteLoaderData",a.UseMatches="useMatches",a.UseRevalidator="useRevalidator",a.UseNavigateStable="useNavigate",a.UseRouteId="useRouteId",a})(Bb||{});function n0(a){let r=J.useContext(Tl);return r||Oe(!1),r}function t0(a){let r=J.useContext(ld);return r||Oe(!1),r}function a0(a){let r=J.useContext(za);return r||Oe(!1),r}function Zb(a){let r=a0(),l=r.matches[r.matches.length-1];return l.route.id||Oe(!1),l.route.id}function i0(){var a;let r=J.useContext(Nb),l=t0(),s=Zb();return r!==void 0?r:(a=l.errors)==null?void 0:a[s]}function r0(){let{router:a}=n0(Ub.UseNavigateStable),r=Zb(Bb.UseNavigateStable),l=J.useRef(!1);return Xb(()=>{l.current=!0}),J.useCallback(function(u,d){d===void 0&&(d={}),l.current&&(typeof u=="number"?a.navigate(u):a.navigate(u,Ks({fromRouteId:r},d)))},[a,r])}const Wm={};function l0(a,r,l){Wm[a]||(Wm[a]=!0)}function s0(a,r){a?.v7_startTransition,a?.v7_relativeSplatPath===void 0&&(!r||r.v7_relativeSplatPath),r&&(r.v7_fetcherPersist,r.v7_normalizeFormMethod,r.v7_partialHydration,r.v7_skipActionErrorRevalidation)}function o0(a){return Gy(a.context)}function c0(a){let{basename:r="/",children:l=null,location:s,navigationType:u=In.Pop,navigator:d,static:f=!1,future:h}=a;Al()&&Oe(!1);let b=r.replace(/^\/*/,"/"),p=J.useMemo(()=>({basename:b,navigator:d,static:f,future:Ks({v7_relativeSplatPath:!1},h)}),[b,h,d,f]);typeof s=="string"&&(s=Ja(s));let{pathname:g="/",search:z="",hash:S="",state:v=null,key:L="default"}=s,O=J.useMemo(()=>{let j=ga(g,b);return j==null?null:{location:{pathname:j,search:z,hash:S,state:v,key:L},navigationType:u}},[b,g,z,S,v,L,u]);return O==null?null:J.createElement($a.Provider,{value:p},J.createElement(sd.Provider,{children:l,value:O}))}new Promise(()=>{});function u0(a){let r={hasErrorBoundary:a.ErrorBoundary!=null||a.errorElement!=null};return a.Component&&Object.assign(r,{element:J.createElement(a.Component),Component:void 0}),a.HydrateFallback&&Object.assign(r,{hydrateFallbackElement:J.createElement(a.HydrateFallback),HydrateFallback:void 0}),a.ErrorBoundary&&Object.assign(r,{errorElement:J.createElement(a.ErrorBoundary),ErrorBoundary:void 0}),r}function gr(){return gr=Object.assign?Object.assign.bind():function(a){for(var r=1;r<arguments.length;r++){var l=arguments[r];for(var s in l)Object.prototype.hasOwnProperty.call(l,s)&&(a[s]=l[s])}return a},gr.apply(this,arguments)}function jb(a,r){if(a==null)return{};var l={},s=Object.keys(a),u,d;for(d=0;d<s.length;d++)u=s[d],!(r.indexOf(u)>=0)&&(l[u]=a[u]);return l}function d0(a){return!!(a.metaKey||a.altKey||a.ctrlKey||a.shiftKey)}function f0(a,r){return a.button===0&&(!r||r==="_self")&&!d0(a)}const p0=["onClick","relative","reloadDocument","replace","state","target","to","preventScrollReset","viewTransition"],h0=["aria-current","caseSensitive","className","end","style","to","viewTransition","children"],m0="6";try{window.__reactRouterVersion=m0}catch{}function b0(a,r){return Dy({basename:r?.basename,future:gr({},r?.future,{v7_prependBasename:!0}),history:qz({window:r?.window}),hydrationData:r?.hydrationData||g0(),routes:a,mapRouteProperties:u0,dataStrategy:r?.dataStrategy,patchRoutesOnNavigation:r?.patchRoutesOnNavigation,window:r?.window}).initialize()}function g0(){var a;let r=(a=window)==null?void 0:a.__staticRouterHydrationData;return r&&r.errors&&(r=gr({},r,{errors:z0(r.errors)})),r}function z0(a){if(!a)return null;let r=Object.entries(a),l={};for(let[s,u]of r)if(u&&u.__type==="RouteErrorResponse")l[s]=new Qs(u.status,u.statusText,u.data,u.internal===!0);else if(u&&u.__type==="Error"){if(u.__subType){let d=window[u.__subType];if(typeof d=="function")try{let f=new d(u.message);f.stack="",l[s]=f}catch{}}if(l[s]==null){let d=new Error(u.message);d.stack="",l[s]=d}}else l[s]=u;return l}const Vb=J.createContext({isTransitioning:!1}),y0=J.createContext(new Map),v0="startTransition",Om=Pz[v0],S0="flushSync",Pm=Hz[S0];function E0(a){Om?Om(a):a()}function pl(a){Pm?Pm(a):a()}class D0{constructor(){this.status="pending",this.promise=new Promise((r,l)=>{this.resolve=s=>{this.status==="pending"&&(this.status="resolved",r(s))},this.reject=s=>{this.status==="pending"&&(this.status="rejected",l(s))}})}}function w0(a){let{fallbackElement:r,router:l,future:s}=a,[u,d]=J.useState(l.state),[f,h]=J.useState(),[b,p]=J.useState({isTransitioning:!1}),[g,z]=J.useState(),[S,v]=J.useState(),[L,O]=J.useState(),j=J.useRef(new Map),{v7_startTransition:X}=s||{},Y=J.useCallback(te=>{X?E0(te):te()},[X]),q=J.useCallback((te,he)=>{let{deletedFetchers:ue,flushSync:ie,viewTransitionOpts:ne}=he;te.fetchers.forEach((fe,$)=>{fe.data!==void 0&&j.current.set($,fe.data)}),ue.forEach(fe=>j.current.delete(fe));let Te=l.window==null||l.window.document==null||typeof l.window.document.startViewTransition!="function";if(!ne||Te){ie?pl(()=>d(te)):Y(()=>d(te));return}if(ie){pl(()=>{S&&(g&&g.resolve(),S.skipTransition()),p({isTransitioning:!0,flushSync:!0,currentLocation:ne.currentLocation,nextLocation:ne.nextLocation})});let fe=l.window.document.startViewTransition(()=>{pl(()=>d(te))});fe.finished.finally(()=>{pl(()=>{z(void 0),v(void 0),h(void 0),p({isTransitioning:!1})})}),pl(()=>v(fe));return}S?(g&&g.resolve(),S.skipTransition(),O({state:te,currentLocation:ne.currentLocation,nextLocation:ne.nextLocation})):(h(te),p({isTransitioning:!0,flushSync:!1,currentLocation:ne.currentLocation,nextLocation:ne.nextLocation}))},[l.window,S,g,j,Y]);J.useLayoutEffect(()=>l.subscribe(q),[l,q]),J.useEffect(()=>{b.isTransitioning&&!b.flushSync&&z(new D0)},[b]),J.useEffect(()=>{if(g&&f&&l.window){let te=f,he=g.promise,ue=l.window.document.startViewTransition(async()=>{Y(()=>d(te)),await he});ue.finished.finally(()=>{z(void 0),v(void 0),h(void 0),p({isTransitioning:!1})}),v(ue)}},[Y,f,g,l.window]),J.useEffect(()=>{g&&f&&u.location.key===f.location.key&&g.resolve()},[g,S,u.location,f]),J.useEffect(()=>{!b.isTransitioning&&L&&(h(L.state),p({isTransitioning:!0,flushSync:!1,currentLocation:L.currentLocation,nextLocation:L.nextLocation}),O(void 0))},[b.isTransitioning,L]),J.useEffect(()=>{},[]);let de=J.useMemo(()=>({createHref:l.createHref,encodeLocation:l.encodeLocation,go:te=>l.navigate(te),push:(te,he,ue)=>l.navigate(te,{state:he,preventScrollReset:ue?.preventScrollReset}),replace:(te,he,ue)=>l.navigate(te,{replace:!0,state:he,preventScrollReset:ue?.preventScrollReset})}),[l]),ye=l.basename||"/",Z=J.useMemo(()=>({router:l,navigator:de,static:!1,basename:ye}),[l,de,ye]),k=J.useMemo(()=>({v7_relativeSplatPath:l.future.v7_relativeSplatPath}),[l.future.v7_relativeSplatPath]);return J.useEffect(()=>s0(s,l.future),[s,l.future]),J.createElement(J.Fragment,null,J.createElement(Tl.Provider,{value:Z},J.createElement(ld.Provider,{value:u},J.createElement(y0.Provider,{value:j.current},J.createElement(Vb.Provider,{value:b},J.createElement(c0,{basename:ye,location:u.location,navigationType:u.historyAction,navigator:de,future:k},u.initialized||l.future.v7_partialHydration?J.createElement(x0,{routes:l.routes,future:l.future,state:u}):r))))),null)}const x0=J.memo(T0);function T0(a){let{routes:r,future:l,state:s}=a;return Fy(r,void 0,s,l)}const A0=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u",k0=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,wl=J.forwardRef(function(r,l){let{onClick:s,relative:u,reloadDocument:d,replace:f,state:h,target:b,to:p,preventScrollReset:g,viewTransition:z}=r,S=jb(r,p0),{basename:v}=J.useContext($a),L,O=!1;if(typeof p=="string"&&k0.test(p)&&(L=p,A0))try{let q=new URL(window.location.href),de=p.startsWith("//")?new URL(q.protocol+p):new URL(p),ye=ga(de.pathname,v);de.origin===q.origin&&ye!=null?p=ye+de.search+de.hash:O=!0}catch{}let j=jy(p,{relative:u}),X=_0(p,{replace:f,state:h,target:b,preventScrollReset:g,relative:u,viewTransition:z});function Y(q){s&&s(q),q.defaultPrevented||X(q)}return J.createElement("a",gr({},S,{href:L||j,onClick:O||d?s:Y,ref:l,target:b}))}),wu=J.forwardRef(function(r,l){let{"aria-current":s="page",caseSensitive:u=!1,className:d="",end:f=!1,style:h,to:b,viewTransition:p,children:g}=r,z=jb(r,h0),S=to(b,{relative:z.relative}),v=kl(),L=J.useContext(ld),{navigator:O,basename:j}=J.useContext($a),X=L!=null&&I0(S)&&p===!0,Y=O.encodeLocation?O.encodeLocation(S).pathname:S.pathname,q=v.pathname,de=L&&L.navigation&&L.navigation.location?L.navigation.location.pathname:null;u||(q=q.toLowerCase(),de=de?de.toLowerCase():null,Y=Y.toLowerCase()),de&&j&&(de=ga(de,j)||de);const ye=Y!=="/"&&Y.endsWith("/")?Y.length-1:Y.length;let Z=q===Y||!f&&q.startsWith(Y)&&q.charAt(ye)==="/",k=de!=null&&(de===Y||!f&&de.startsWith(Y)&&de.charAt(Y.length)==="/"),te={isActive:Z,isPending:k,isTransitioning:X},he=Z?s:void 0,ue;typeof d=="function"?ue=d(te):ue=[d,Z?"active":null,k?"pending":null,X?"transitioning":null].filter(Boolean).join(" ");let ie=typeof h=="function"?h(te):h;return J.createElement(wl,gr({},z,{"aria-current":he,className:ue,ref:l,style:ie,to:b,viewTransition:p}),typeof g=="function"?g(te):g)});var ju;(function(a){a.UseScrollRestoration="useScrollRestoration",a.UseSubmit="useSubmit",a.UseSubmitFetcher="useSubmitFetcher",a.UseFetcher="useFetcher",a.useViewTransitionState="useViewTransitionState"})(ju||(ju={}));var Nm;(function(a){a.UseFetcher="useFetcher",a.UseFetchers="useFetchers",a.UseScrollRestoration="useScrollRestoration"})(Nm||(Nm={}));function R0(a){let r=J.useContext(Tl);return r||Oe(!1),r}function _0(a,r){let{target:l,replace:s,state:u,preventScrollReset:d,relative:f,viewTransition:h}=r===void 0?{}:r,b=Vy(),p=kl(),g=to(a,{relative:f});return J.useCallback(z=>{if(f0(z,l)){z.preventDefault();let S=s!==void 0?s:ki(p)===ki(g);b(a,{replace:S,state:u,preventScrollReset:d,relative:f,viewTransition:h})}},[p,b,g,s,u,l,a,d,f,h])}function I0(a,r){r===void 0&&(r={});let l=J.useContext(Vb);l==null&&Oe(!1);let{basename:s}=R0(ju.useViewTransitionState),u=to(a,{relative:r.relative});if(!l.isTransitioning)return!1;let d=ga(l.currentLocation.pathname,s)||l.currentLocation.pathname,f=ga(l.nextLocation.pathname,s)||l.nextLocation.pathname;return Fs(u.pathname,f)!=null||Fs(u.pathname,d)!=null}const M0=[{to:"/",label:"Home",end:!0},{to:"/api",label:"API"},{to:"/examples",label:"Examples"},{to:"/learn",label:"Learn"}];function C0(){return F.jsxs("div",{className:"page",children:[F.jsx("div",{className:"page-bg","aria-hidden":"true"}),F.jsxs("header",{className:"hero",children:[F.jsxs("div",{className:"hero-top",children:[F.jsxs("div",{className:"brand",children:[F.jsx("span",{className:"brand-mark"}),F.jsx("span",{children:"Wizzard Packages"})]}),F.jsx("nav",{className:"nav",children:M0.map(a=>F.jsx(wu,{to:a.to,end:a.end,className:({isActive:r})=>`nav-link${r?" nav-link--active":""}`,children:a.label},a.to))})]}),F.jsxs("div",{className:"hero-body",children:[F.jsxs("div",{className:"hero-copy",children:[F.jsx("p",{className:"eyebrow",children:"Documentation Hub"}),F.jsx("h1",{children:"Docs UI"}),F.jsx("p",{className:"subtitle",children:"Interactive documentation experience for the @wizzard-packages/* ecosystem."}),F.jsxs("div",{className:"hero-actions",children:[F.jsx(wu,{to:"/api",className:"button button--primary",children:"Explore API"}),F.jsx(wu,{to:"/examples",className:"button button--ghost",children:"View Examples"})]})]}),F.jsxs("div",{className:"hero-panel",children:[F.jsx("p",{className:"panel-label",children:"Now live"}),F.jsx("h2",{children:"Typedoc + Live Recipes"}),F.jsx("p",{className:"panel-copy",children:"Browse generated API markdown, then jump straight into example flows that match your use case."}),F.jsxs("div",{className:"panel-meta",children:[F.jsx("span",{children:"Design refresh"}),F.jsx("span",{children:"Dev preview"}),F.jsx("span",{children:"v0.1.0"})]})]})]})]}),F.jsx("main",{className:"content",children:F.jsx(o0,{})})]})}function L0(){return F.jsxs("section",{className:"section",children:[F.jsxs("div",{className:"section-header",children:[F.jsx("p",{className:"section-eyebrow",children:"Getting started"}),F.jsx("h2",{children:"Everything you need to ship guided flows"}),F.jsx("p",{className:"section-lead",children:"Build predictable multi-step journeys with adapters, persistence, and flexible navigation modes."})]}),F.jsxs("div",{className:"card-grid",children:[F.jsxs("article",{className:"card card--accent",children:[F.jsx("h3",{children:"API Reference"}),F.jsx("p",{children:"Full TypeDoc output, searchable modules, and copy-ready snippets."})]}),F.jsxs("article",{className:"card card--cool",children:[F.jsx("h3",{children:"Examples"}),F.jsx("p",{children:"Guided recipes for validation, persistence, and routing flows."})]}),F.jsxs("article",{className:"card",children:[F.jsx("h3",{children:"Status"}),F.jsx("p",{children:"Docs UI is live on dev preview while the redesign ships."})]})]})]})}function W0(a,r){const l={};return(a[a.length-1]===""?[...a,""]:a).join((l.padRight?" ":"")+","+(l.padLeft===!1?"":" ")).trim()}const O0=/^[$_\p{ID_Start}][$_\u{200C}\u{200D}\p{ID_Continue}]*$/u,P0=/^[$_\p{ID_Start}][-$_\u{200C}\u{200D}\p{ID_Continue}]*$/u,N0={};function Xm(a,r){return(N0.jsx?P0:O0).test(a)}const X0=/[ \t\n\f\r]/g;function U0(a){return typeof a=="object"?a.type==="text"?Um(a.value):!1:Um(a)}function Um(a){return a.replace(X0,"")===""}class Rl{constructor(r,l,s){this.normal=l,this.property=r,s&&(this.space=s)}}Rl.prototype.normal={};Rl.prototype.property={};Rl.prototype.space=void 0;function Hb(a,r){const l={},s={};for(const u of a)Object.assign(l,u.property),Object.assign(s,u.normal);return new Rl(l,s,r)}function Vu(a){return a.toLowerCase()}class rt{constructor(r,l){this.attribute=l,this.property=r}}rt.prototype.attribute="";rt.prototype.booleanish=!1;rt.prototype.boolean=!1;rt.prototype.commaOrSpaceSeparated=!1;rt.prototype.commaSeparated=!1;rt.prototype.defined=!1;rt.prototype.mustUseProperty=!1;rt.prototype.number=!1;rt.prototype.overloadedBoolean=!1;rt.prototype.property="";rt.prototype.spaceSeparated=!1;rt.prototype.space=void 0;let B0=0;const We=Ri(),_n=Ri(),Hu=Ri(),ee=Ri(),cn=Ri(),mr=Ri(),ht=Ri();function Ri(){return 2**++B0}const qu=Object.freeze(Object.defineProperty({__proto__:null,boolean:We,booleanish:_n,commaOrSpaceSeparated:ht,commaSeparated:mr,number:ee,overloadedBoolean:Hu,spaceSeparated:cn},Symbol.toStringTag,{value:"Module"})),xu=Object.keys(qu);class od extends rt{constructor(r,l,s,u){let d=-1;if(super(r,l),Bm(this,"space",u),typeof s=="number")for(;++d<xu.length;){const f=xu[d];Bm(this,xu[d],(s&qu[f])===qu[f])}}}od.prototype.defined=!0;function Bm(a,r,l){l&&(a[r]=l)}function zr(a){const r={},l={};for(const[s,u]of Object.entries(a.properties)){const d=new od(s,a.transform(a.attributes||{},s),u,a.space);a.mustUseProperty&&a.mustUseProperty.includes(s)&&(d.mustUseProperty=!0),r[s]=d,l[Vu(s)]=s,l[Vu(d.attribute)]=s}return new Rl(r,l,a.space)}const qb=zr({properties:{ariaActiveDescendant:null,ariaAtomic:_n,ariaAutoComplete:null,ariaBusy:_n,ariaChecked:_n,ariaColCount:ee,ariaColIndex:ee,ariaColSpan:ee,ariaControls:cn,ariaCurrent:null,ariaDescribedBy:cn,ariaDetails:null,ariaDisabled:_n,ariaDropEffect:cn,ariaErrorMessage:null,ariaExpanded:_n,ariaFlowTo:cn,ariaGrabbed:_n,ariaHasPopup:null,ariaHidden:_n,ariaInvalid:null,ariaKeyShortcuts:null,ariaLabel:null,ariaLabelledBy:cn,ariaLevel:ee,ariaLive:null,ariaModal:_n,ariaMultiLine:_n,ariaMultiSelectable:_n,ariaOrientation:null,ariaOwns:cn,ariaPlaceholder:null,ariaPosInSet:ee,ariaPressed:_n,ariaReadOnly:_n,ariaRelevant:null,ariaRequired:_n,ariaRoleDescription:cn,ariaRowCount:ee,ariaRowIndex:ee,ariaRowSpan:ee,ariaSelected:_n,ariaSetSize:ee,ariaSort:null,ariaValueMax:ee,ariaValueMin:ee,ariaValueNow:ee,ariaValueText:null,role:null},transform(a,r){return r==="role"?r:"aria-"+r.slice(4).toLowerCase()}});function Gb(a,r){return r in a?a[r]:r}function Yb(a,r){return Gb(a,r.toLowerCase())}const Z0=zr({attributes:{acceptcharset:"accept-charset",classname:"class",htmlfor:"for",httpequiv:"http-equiv"},mustUseProperty:["checked","multiple","muted","selected"],properties:{abbr:null,accept:mr,acceptCharset:cn,accessKey:cn,action:null,allow:null,allowFullScreen:We,allowPaymentRequest:We,allowUserMedia:We,alt:null,as:null,async:We,autoCapitalize:null,autoComplete:cn,autoFocus:We,autoPlay:We,blocking:cn,capture:null,charSet:null,checked:We,cite:null,className:cn,cols:ee,colSpan:null,content:null,contentEditable:_n,controls:We,controlsList:cn,coords:ee|mr,crossOrigin:null,data:null,dateTime:null,decoding:null,default:We,defer:We,dir:null,dirName:null,disabled:We,download:Hu,draggable:_n,encType:null,enterKeyHint:null,fetchPriority:null,form:null,formAction:null,formEncType:null,formMethod:null,formNoValidate:We,formTarget:null,headers:cn,height:ee,hidden:Hu,high:ee,href:null,hrefLang:null,htmlFor:cn,httpEquiv:cn,id:null,imageSizes:null,imageSrcSet:null,inert:We,inputMode:null,integrity:null,is:null,isMap:We,itemId:null,itemProp:cn,itemRef:cn,itemScope:We,itemType:cn,kind:null,label:null,lang:null,language:null,list:null,loading:null,loop:We,low:ee,manifest:null,max:null,maxLength:ee,media:null,method:null,min:null,minLength:ee,multiple:We,muted:We,name:null,nonce:null,noModule:We,noValidate:We,onAbort:null,onAfterPrint:null,onAuxClick:null,onBeforeMatch:null,onBeforePrint:null,onBeforeToggle:null,onBeforeUnload:null,onBlur:null,onCancel:null,onCanPlay:null,onCanPlayThrough:null,onChange:null,onClick:null,onClose:null,onContextLost:null,onContextMenu:null,onContextRestored:null,onCopy:null,onCueChange:null,onCut:null,onDblClick:null,onDrag:null,onDragEnd:null,onDragEnter:null,onDragExit:null,onDragLeave:null,onDragOver:null,onDragStart:null,onDrop:null,onDurationChange:null,onEmptied:null,onEnded:null,onError:null,onFocus:null,onFormData:null,onHashChange:null,onInput:null,onInvalid:null,onKeyDown:null,onKeyPress:null,onKeyUp:null,onLanguageChange:null,onLoad:null,onLoadedData:null,onLoadedMetadata:null,onLoadEnd:null,onLoadStart:null,onMessage:null,onMessageError:null,onMouseDown:null,onMouseEnter:null,onMouseLeave:null,onMouseMove:null,onMouseOut:null,onMouseOver:null,onMouseUp:null,onOffline:null,onOnline:null,onPageHide:null,onPageShow:null,onPaste:null,onPause:null,onPlay:null,onPlaying:null,onPopState:null,onProgress:null,onRateChange:null,onRejectionHandled:null,onReset:null,onResize:null,onScroll:null,onScrollEnd:null,onSecurityPolicyViolation:null,onSeeked:null,onSeeking:null,onSelect:null,onSlotChange:null,onStalled:null,onStorage:null,onSubmit:null,onSuspend:null,onTimeUpdate:null,onToggle:null,onUnhandledRejection:null,onUnload:null,onVolumeChange:null,onWaiting:null,onWheel:null,open:We,optimum:ee,pattern:null,ping:cn,placeholder:null,playsInline:We,popover:null,popoverTarget:null,popoverTargetAction:null,poster:null,preload:null,readOnly:We,referrerPolicy:null,rel:cn,required:We,reversed:We,rows:ee,rowSpan:ee,sandbox:cn,scope:null,scoped:We,seamless:We,selected:We,shadowRootClonable:We,shadowRootDelegatesFocus:We,shadowRootMode:null,shape:null,size:ee,sizes:null,slot:null,span:ee,spellCheck:_n,src:null,srcDoc:null,srcLang:null,srcSet:null,start:ee,step:null,style:null,tabIndex:ee,target:null,title:null,translate:null,type:null,typeMustMatch:We,useMap:null,value:_n,width:ee,wrap:null,writingSuggestions:null,align:null,aLink:null,archive:cn,axis:null,background:null,bgColor:null,border:ee,borderColor:null,bottomMargin:ee,cellPadding:null,cellSpacing:null,char:null,charOff:null,classId:null,clear:null,code:null,codeBase:null,codeType:null,color:null,compact:We,declare:We,event:null,face:null,frame:null,frameBorder:null,hSpace:ee,leftMargin:ee,link:null,longDesc:null,lowSrc:null,marginHeight:ee,marginWidth:ee,noResize:We,noHref:We,noShade:We,noWrap:We,object:null,profile:null,prompt:null,rev:null,rightMargin:ee,rules:null,scheme:null,scrolling:_n,standby:null,summary:null,text:null,topMargin:ee,valueType:null,version:null,vAlign:null,vLink:null,vSpace:ee,allowTransparency:null,autoCorrect:null,autoSave:null,disablePictureInPicture:We,disableRemotePlayback:We,prefix:null,property:null,results:ee,security:null,unselectable:null},space:"html",transform:Yb}),j0=zr({attributes:{accentHeight:"accent-height",alignmentBaseline:"alignment-baseline",arabicForm:"arabic-form",baselineShift:"baseline-shift",capHeight:"cap-height",className:"class",clipPath:"clip-path",clipRule:"clip-rule",colorInterpolation:"color-interpolation",colorInterpolationFilters:"color-interpolation-filters",colorProfile:"color-profile",colorRendering:"color-rendering",crossOrigin:"crossorigin",dataType:"datatype",dominantBaseline:"dominant-baseline",enableBackground:"enable-background",fillOpacity:"fill-opacity",fillRule:"fill-rule",floodColor:"flood-color",floodOpacity:"flood-opacity",fontFamily:"font-family",fontSize:"font-size",fontSizeAdjust:"font-size-adjust",fontStretch:"font-stretch",fontStyle:"font-style",fontVariant:"font-variant",fontWeight:"font-weight",glyphName:"glyph-name",glyphOrientationHorizontal:"glyph-orientation-horizontal",glyphOrientationVertical:"glyph-orientation-vertical",hrefLang:"hreflang",horizAdvX:"horiz-adv-x",horizOriginX:"horiz-origin-x",horizOriginY:"horiz-origin-y",imageRendering:"image-rendering",letterSpacing:"letter-spacing",lightingColor:"lighting-color",markerEnd:"marker-end",markerMid:"marker-mid",markerStart:"marker-start",navDown:"nav-down",navDownLeft:"nav-down-left",navDownRight:"nav-down-right",navLeft:"nav-left",navNext:"nav-next",navPrev:"nav-prev",navRight:"nav-right",navUp:"nav-up",navUpLeft:"nav-up-left",navUpRight:"nav-up-right",onAbort:"onabort",onActivate:"onactivate",onAfterPrint:"onafterprint",onBeforePrint:"onbeforeprint",onBegin:"onbegin",onCancel:"oncancel",onCanPlay:"oncanplay",onCanPlayThrough:"oncanplaythrough",onChange:"onchange",onClick:"onclick",onClose:"onclose",onCopy:"oncopy",onCueChange:"oncuechange",onCut:"oncut",onDblClick:"ondblclick",onDrag:"ondrag",onDragEnd:"ondragend",onDragEnter:"ondragenter",onDragExit:"ondragexit",onDragLeave:"ondragleave",onDragOver:"ondragover",onDragStart:"ondragstart",onDrop:"ondrop",onDurationChange:"ondurationchange",onEmptied:"onemptied",onEnd:"onend",onEnded:"onended",onError:"onerror",onFocus:"onfocus",onFocusIn:"onfocusin",onFocusOut:"onfocusout",onHashChange:"onhashchange",onInput:"oninput",onInvalid:"oninvalid",onKeyDown:"onkeydown",onKeyPress:"onkeypress",onKeyUp:"onkeyup",onLoad:"onload",onLoadedData:"onloadeddata",onLoadedMetadata:"onloadedmetadata",onLoadStart:"onloadstart",onMessage:"onmessage",onMouseDown:"onmousedown",onMouseEnter:"onmouseenter",onMouseLeave:"onmouseleave",onMouseMove:"onmousemove",onMouseOut:"onmouseout",onMouseOver:"onmouseover",onMouseUp:"onmouseup",onMouseWheel:"onmousewheel",onOffline:"onoffline",onOnline:"ononline",onPageHide:"onpagehide",onPageShow:"onpageshow",onPaste:"onpaste",onPause:"onpause",onPlay:"onplay",onPlaying:"onplaying",onPopState:"onpopstate",onProgress:"onprogress",onRateChange:"onratechange",onRepeat:"onrepeat",onReset:"onreset",onResize:"onresize",onScroll:"onscroll",onSeeked:"onseeked",onSeeking:"onseeking",onSelect:"onselect",onShow:"onshow",onStalled:"onstalled",onStorage:"onstorage",onSubmit:"onsubmit",onSuspend:"onsuspend",onTimeUpdate:"ontimeupdate",onToggle:"ontoggle",onUnload:"onunload",onVolumeChange:"onvolumechange",onWaiting:"onwaiting",onZoom:"onzoom",overlinePosition:"overline-position",overlineThickness:"overline-thickness",paintOrder:"paint-order",panose1:"panose-1",pointerEvents:"pointer-events",referrerPolicy:"referrerpolicy",renderingIntent:"rendering-intent",shapeRendering:"shape-rendering",stopColor:"stop-color",stopOpacity:"stop-opacity",strikethroughPosition:"strikethrough-position",strikethroughThickness:"strikethrough-thickness",strokeDashArray:"stroke-dasharray",strokeDashOffset:"stroke-dashoffset",strokeLineCap:"stroke-linecap",strokeLineJoin:"stroke-linejoin",strokeMiterLimit:"stroke-miterlimit",strokeOpacity:"stroke-opacity",strokeWidth:"stroke-width",tabIndex:"tabindex",textAnchor:"text-anchor",textDecoration:"text-decoration",textRendering:"text-rendering",transformOrigin:"transform-origin",typeOf:"typeof",underlinePosition:"underline-position",underlineThickness:"underline-thickness",unicodeBidi:"unicode-bidi",unicodeRange:"unicode-range",unitsPerEm:"units-per-em",vAlphabetic:"v-alphabetic",vHanging:"v-hanging",vIdeographic:"v-ideographic",vMathematical:"v-mathematical",vectorEffect:"vector-effect",vertAdvY:"vert-adv-y",vertOriginX:"vert-origin-x",vertOriginY:"vert-origin-y",wordSpacing:"word-spacing",writingMode:"writing-mode",xHeight:"x-height",playbackOrder:"playbackorder",timelineBegin:"timelinebegin"},properties:{about:ht,accentHeight:ee,accumulate:null,additive:null,alignmentBaseline:null,alphabetic:ee,amplitude:ee,arabicForm:null,ascent:ee,attributeName:null,attributeType:null,azimuth:ee,bandwidth:null,baselineShift:null,baseFrequency:null,baseProfile:null,bbox:null,begin:null,bias:ee,by:null,calcMode:null,capHeight:ee,className:cn,clip:null,clipPath:null,clipPathUnits:null,clipRule:null,color:null,colorInterpolation:null,colorInterpolationFilters:null,colorProfile:null,colorRendering:null,content:null,contentScriptType:null,contentStyleType:null,crossOrigin:null,cursor:null,cx:null,cy:null,d:null,dataType:null,defaultAction:null,descent:ee,diffuseConstant:ee,direction:null,display:null,dur:null,divisor:ee,dominantBaseline:null,download:We,dx:null,dy:null,edgeMode:null,editable:null,elevation:ee,enableBackground:null,end:null,event:null,exponent:ee,externalResourcesRequired:null,fill:null,fillOpacity:ee,fillRule:null,filter:null,filterRes:null,filterUnits:null,floodColor:null,floodOpacity:null,focusable:null,focusHighlight:null,fontFamily:null,fontSize:null,fontSizeAdjust:null,fontStretch:null,fontStyle:null,fontVariant:null,fontWeight:null,format:null,fr:null,from:null,fx:null,fy:null,g1:mr,g2:mr,glyphName:mr,glyphOrientationHorizontal:null,glyphOrientationVertical:null,glyphRef:null,gradientTransform:null,gradientUnits:null,handler:null,hanging:ee,hatchContentUnits:null,hatchUnits:null,height:null,href:null,hrefLang:null,horizAdvX:ee,horizOriginX:ee,horizOriginY:ee,id:null,ideographic:ee,imageRendering:null,initialVisibility:null,in:null,in2:null,intercept:ee,k:ee,k1:ee,k2:ee,k3:ee,k4:ee,kernelMatrix:ht,kernelUnitLength:null,keyPoints:null,keySplines:null,keyTimes:null,kerning:null,lang:null,lengthAdjust:null,letterSpacing:null,lightingColor:null,limitingConeAngle:ee,local:null,markerEnd:null,markerMid:null,markerStart:null,markerHeight:null,markerUnits:null,markerWidth:null,mask:null,maskContentUnits:null,maskUnits:null,mathematical:null,max:null,media:null,mediaCharacterEncoding:null,mediaContentEncodings:null,mediaSize:ee,mediaTime:null,method:null,min:null,mode:null,name:null,navDown:null,navDownLeft:null,navDownRight:null,navLeft:null,navNext:null,navPrev:null,navRight:null,navUp:null,navUpLeft:null,navUpRight:null,numOctaves:null,observer:null,offset:null,onAbort:null,onActivate:null,onAfterPrint:null,onBeforePrint:null,onBegin:null,onCancel:null,onCanPlay:null,onCanPlayThrough:null,onChange:null,onClick:null,onClose:null,onCopy:null,onCueChange:null,onCut:null,onDblClick:null,onDrag:null,onDragEnd:null,onDragEnter:null,onDragExit:null,onDragLeave:null,onDragOver:null,onDragStart:null,onDrop:null,onDurationChange:null,onEmptied:null,onEnd:null,onEnded:null,onError:null,onFocus:null,onFocusIn:null,onFocusOut:null,onHashChange:null,onInput:null,onInvalid:null,onKeyDown:null,onKeyPress:null,onKeyUp:null,onLoad:null,onLoadedData:null,onLoadedMetadata:null,onLoadStart:null,onMessage:null,onMouseDown:null,onMouseEnter:null,onMouseLeave:null,onMouseMove:null,onMouseOut:null,onMouseOver:null,onMouseUp:null,onMouseWheel:null,onOffline:null,onOnline:null,onPageHide:null,onPageShow:null,onPaste:null,onPause:null,onPlay:null,onPlaying:null,onPopState:null,onProgress:null,onRateChange:null,onRepeat:null,onReset:null,onResize:null,onScroll:null,onSeeked:null,onSeeking:null,onSelect:null,onShow:null,onStalled:null,onStorage:null,onSubmit:null,onSuspend:null,onTimeUpdate:null,onToggle:null,onUnload:null,onVolumeChange:null,onWaiting:null,onZoom:null,opacity:null,operator:null,order:null,orient:null,orientation:null,origin:null,overflow:null,overlay:null,overlinePosition:ee,overlineThickness:ee,paintOrder:null,panose1:null,path:null,pathLength:ee,patternContentUnits:null,patternTransform:null,patternUnits:null,phase:null,ping:cn,pitch:null,playbackOrder:null,pointerEvents:null,points:null,pointsAtX:ee,pointsAtY:ee,pointsAtZ:ee,preserveAlpha:null,preserveAspectRatio:null,primitiveUnits:null,propagate:null,property:ht,r:null,radius:null,referrerPolicy:null,refX:null,refY:null,rel:ht,rev:ht,renderingIntent:null,repeatCount:null,repeatDur:null,requiredExtensions:ht,requiredFeatures:ht,requiredFonts:ht,requiredFormats:ht,resource:null,restart:null,result:null,rotate:null,rx:null,ry:null,scale:null,seed:null,shapeRendering:null,side:null,slope:null,snapshotTime:null,specularConstant:ee,specularExponent:ee,spreadMethod:null,spacing:null,startOffset:null,stdDeviation:null,stemh:null,stemv:null,stitchTiles:null,stopColor:null,stopOpacity:null,strikethroughPosition:ee,strikethroughThickness:ee,string:null,stroke:null,strokeDashArray:ht,strokeDashOffset:null,strokeLineCap:null,strokeLineJoin:null,strokeMiterLimit:ee,strokeOpacity:ee,strokeWidth:null,style:null,surfaceScale:ee,syncBehavior:null,syncBehaviorDefault:null,syncMaster:null,syncTolerance:null,syncToleranceDefault:null,systemLanguage:ht,tabIndex:ee,tableValues:null,target:null,targetX:ee,targetY:ee,textAnchor:null,textDecoration:null,textRendering:null,textLength:null,timelineBegin:null,title:null,transformBehavior:null,type:null,typeOf:ht,to:null,transform:null,transformOrigin:null,u1:null,u2:null,underlinePosition:ee,underlineThickness:ee,unicode:null,unicodeBidi:null,unicodeRange:null,unitsPerEm:ee,values:null,vAlphabetic:ee,vMathematical:ee,vectorEffect:null,vHanging:ee,vIdeographic:ee,version:null,vertAdvY:ee,vertOriginX:ee,vertOriginY:ee,viewBox:null,viewTarget:null,visibility:null,width:null,widths:null,wordSpacing:null,writingMode:null,x:null,x1:null,x2:null,xChannelSelector:null,xHeight:ee,y:null,y1:null,y2:null,yChannelSelector:null,z:null,zoomAndPan:null},space:"svg",transform:Gb}),Fb=zr({properties:{xLinkActuate:null,xLinkArcRole:null,xLinkHref:null,xLinkRole:null,xLinkShow:null,xLinkTitle:null,xLinkType:null},space:"xlink",transform(a,r){return"xlink:"+r.slice(5).toLowerCase()}}),Qb=zr({attributes:{xmlnsxlink:"xmlns:xlink"},properties:{xmlnsXLink:null,xmlns:null},space:"xmlns",transform:Yb}),Kb=zr({properties:{xmlBase:null,xmlLang:null,xmlSpace:null},space:"xml",transform(a,r){return"xml:"+r.slice(3).toLowerCase()}}),V0={classId:"classID",dataType:"datatype",itemId:"itemID",strokeDashArray:"strokeDasharray",strokeDashOffset:"strokeDashoffset",strokeLineCap:"strokeLinecap",strokeLineJoin:"strokeLinejoin",strokeMiterLimit:"strokeMiterlimit",typeOf:"typeof",xLinkActuate:"xlinkActuate",xLinkArcRole:"xlinkArcrole",xLinkHref:"xlinkHref",xLinkRole:"xlinkRole",xLinkShow:"xlinkShow",xLinkTitle:"xlinkTitle",xLinkType:"xlinkType",xmlnsXLink:"xmlnsXlink"},H0=/[A-Z]/g,Zm=/-[a-z]/g,q0=/^data[-\w.:]+$/i;function G0(a,r){const l=Vu(r);let s=r,u=rt;if(l in a.normal)return a.property[a.normal[l]];if(l.length>4&&l.slice(0,4)==="data"&&q0.test(r)){if(r.charAt(4)==="-"){const d=r.slice(5).replace(Zm,F0);s="data"+d.charAt(0).toUpperCase()+d.slice(1)}else{const d=r.slice(4);if(!Zm.test(d)){let f=d.replace(H0,Y0);f.charAt(0)!=="-"&&(f="-"+f),r="data"+f}}u=od}return new u(s,r)}function Y0(a){return"-"+a.toLowerCase()}function F0(a){return a.charAt(1).toUpperCase()}const Q0=Hb([qb,Z0,Fb,Qb,Kb],"html"),cd=Hb([qb,j0,Fb,Qb,Kb],"svg");function K0(a){return a.join(" ").trim()}var pr={},Tu,jm;function J0(){if(jm)return Tu;jm=1;var a=/\/\*[^*]*\*+([^/*][^*]*\*+)*\//g,r=/\n/g,l=/^\s*/,s=/^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/,u=/^:\s*/,d=/^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/,f=/^[;\s]*/,h=/^\s+|\s+$/g,b=`
`,p="/",g="*",z="",S="comment",v="declaration";function L(j,X){if(typeof j!="string")throw new TypeError("First argument must be a string");if(!j)return[];X=X||{};var Y=1,q=1;function de(fe){var $=fe.match(r);$&&(Y+=$.length);var C=fe.lastIndexOf(b);q=~C?fe.length-C:q+fe.length}function ye(){var fe={line:Y,column:q};return function($){return $.position=new Z(fe),he(),$}}function Z(fe){this.start=fe,this.end={line:Y,column:q},this.source=X.source}Z.prototype.content=j;function k(fe){var $=new Error(X.source+":"+Y+":"+q+": "+fe);if($.reason=fe,$.filename=X.source,$.line=Y,$.column=q,$.source=j,!X.silent)throw $}function te(fe){var $=fe.exec(j);if($){var C=$[0];return de(C),j=j.slice(C.length),$}}function he(){te(l)}function ue(fe){var $;for(fe=fe||[];$=ie();)$!==!1&&fe.push($);return fe}function ie(){var fe=ye();if(!(p!=j.charAt(0)||g!=j.charAt(1))){for(var $=2;z!=j.charAt($)&&(g!=j.charAt($)||p!=j.charAt($+1));)++$;if($+=2,z===j.charAt($-1))return k("End of comment missing");var C=j.slice(2,$-2);return q+=2,de(C),j=j.slice($),q+=2,fe({type:S,comment:C})}}function ne(){var fe=ye(),$=te(s);if($){if(ie(),!te(u))return k("property missing ':'");var C=te(d),K=fe({type:v,property:O($[0].replace(a,z)),value:C?O(C[0].replace(a,z)):z});return te(f),K}}function Te(){var fe=[];ue(fe);for(var $;$=ne();)$!==!1&&(fe.push($),ue(fe));return fe}return he(),Te()}function O(j){return j?j.replace(h,z):z}return Tu=L,Tu}var Vm;function $0(){if(Vm)return pr;Vm=1;var a=pr&&pr.__importDefault||function(s){return s&&s.__esModule?s:{default:s}};Object.defineProperty(pr,"__esModule",{value:!0}),pr.default=l;const r=a(J0());function l(s,u){let d=null;if(!s||typeof s!="string")return d;const f=(0,r.default)(s),h=typeof u=="function";return f.forEach(b=>{if(b.type!=="declaration")return;const{property:p,value:g}=b;h?u(p,g,b):g&&(d=d||{},d[p]=g)}),d}return pr}var hl={},Hm;function ev(){if(Hm)return hl;Hm=1,Object.defineProperty(hl,"__esModule",{value:!0}),hl.camelCase=void 0;var a=/^--[a-zA-Z0-9_-]+$/,r=/-([a-z])/g,l=/^[^-]+$/,s=/^-(webkit|moz|ms|o|khtml)-/,u=/^-(ms)-/,d=function(p){return!p||l.test(p)||a.test(p)},f=function(p,g){return g.toUpperCase()},h=function(p,g){return"".concat(g,"-")},b=function(p,g){return g===void 0&&(g={}),d(p)?p:(p=p.toLowerCase(),g.reactCompat?p=p.replace(u,h):p=p.replace(s,h),p.replace(r,f))};return hl.camelCase=b,hl}var ml,qm;function nv(){if(qm)return ml;qm=1;var a=ml&&ml.__importDefault||function(u){return u&&u.__esModule?u:{default:u}},r=a($0()),l=ev();function s(u,d){var f={};return!u||typeof u!="string"||(0,r.default)(u,function(h,b){h&&b&&(f[(0,l.camelCase)(h,d)]=b)}),f}return s.default=s,ml=s,ml}var tv=nv();const av=no(tv),Jb=$b("end"),ud=$b("start");function $b(a){return r;function r(l){const s=l&&l.position&&l.position[a]||{};if(typeof s.line=="number"&&s.line>0&&typeof s.column=="number"&&s.column>0)return{line:s.line,column:s.column,offset:typeof s.offset=="number"&&s.offset>-1?s.offset:void 0}}}function iv(a){const r=ud(a),l=Jb(a);if(r&&l)return{start:r,end:l}}function yl(a){return!a||typeof a!="object"?"":"position"in a||"type"in a?Gm(a.position):"start"in a||"end"in a?Gm(a):"line"in a||"column"in a?Gu(a):""}function Gu(a){return Ym(a&&a.line)+":"+Ym(a&&a.column)}function Gm(a){return Gu(a&&a.start)+"-"+Gu(a&&a.end)}function Ym(a){return a&&typeof a=="number"?a:1}class jn extends Error{constructor(r,l,s){super(),typeof l=="string"&&(s=l,l=void 0);let u="",d={},f=!1;if(l&&("line"in l&&"column"in l?d={place:l}:"start"in l&&"end"in l?d={place:l}:"type"in l?d={ancestors:[l],place:l.position}:d={...l}),typeof r=="string"?u=r:!d.cause&&r&&(f=!0,u=r.message,d.cause=r),!d.ruleId&&!d.source&&typeof s=="string"){const b=s.indexOf(":");b===-1?d.ruleId=s:(d.source=s.slice(0,b),d.ruleId=s.slice(b+1))}if(!d.place&&d.ancestors&&d.ancestors){const b=d.ancestors[d.ancestors.length-1];b&&(d.place=b.position)}const h=d.place&&"start"in d.place?d.place.start:d.place;this.ancestors=d.ancestors||void 0,this.cause=d.cause||void 0,this.column=h?h.column:void 0,this.fatal=void 0,this.file="",this.message=u,this.line=h?h.line:void 0,this.name=yl(d.place)||"1:1",this.place=d.place||void 0,this.reason=this.message,this.ruleId=d.ruleId||void 0,this.source=d.source||void 0,this.stack=f&&d.cause&&typeof d.cause.stack=="string"?d.cause.stack:"",this.actual=void 0,this.expected=void 0,this.note=void 0,this.url=void 0}}jn.prototype.file="";jn.prototype.name="";jn.prototype.reason="";jn.prototype.message="";jn.prototype.stack="";jn.prototype.column=void 0;jn.prototype.line=void 0;jn.prototype.ancestors=void 0;jn.prototype.cause=void 0;jn.prototype.fatal=void 0;jn.prototype.place=void 0;jn.prototype.ruleId=void 0;jn.prototype.source=void 0;const dd={}.hasOwnProperty,rv=new Map,lv=/[A-Z]/g,sv=new Set(["table","tbody","thead","tfoot","tr"]),ov=new Set(["td","th"]),eg="https://github.com/syntax-tree/hast-util-to-jsx-runtime";function cv(a,r){if(!r||r.Fragment===void 0)throw new TypeError("Expected `Fragment` in options");const l=r.filePath||void 0;let s;if(r.development){if(typeof r.jsxDEV!="function")throw new TypeError("Expected `jsxDEV` in options when `development: true`");s=gv(l,r.jsxDEV)}else{if(typeof r.jsx!="function")throw new TypeError("Expected `jsx` in production options");if(typeof r.jsxs!="function")throw new TypeError("Expected `jsxs` in production options");s=bv(l,r.jsx,r.jsxs)}const u={Fragment:r.Fragment,ancestors:[],components:r.components||{},create:s,elementAttributeNameCase:r.elementAttributeNameCase||"react",evaluater:r.createEvaluater?r.createEvaluater():void 0,filePath:l,ignoreInvalidStyle:r.ignoreInvalidStyle||!1,passKeys:r.passKeys!==!1,passNode:r.passNode||!1,schema:r.space==="svg"?cd:Q0,stylePropertyNameCase:r.stylePropertyNameCase||"dom",tableCellAlignToStyle:r.tableCellAlignToStyle!==!1},d=ng(u,a,void 0);return d&&typeof d!="string"?d:u.create(a,u.Fragment,{children:d||void 0},void 0)}function ng(a,r,l){if(r.type==="element")return uv(a,r,l);if(r.type==="mdxFlowExpression"||r.type==="mdxTextExpression")return dv(a,r);if(r.type==="mdxJsxFlowElement"||r.type==="mdxJsxTextElement")return pv(a,r,l);if(r.type==="mdxjsEsm")return fv(a,r);if(r.type==="root")return hv(a,r,l);if(r.type==="text")return mv(a,r)}function uv(a,r,l){const s=a.schema;let u=s;r.tagName.toLowerCase()==="svg"&&s.space==="html"&&(u=cd,a.schema=u),a.ancestors.push(r);const d=ag(a,r.tagName,!1),f=zv(a,r);let h=pd(a,r);return sv.has(r.tagName)&&(h=h.filter(function(b){return typeof b=="string"?!U0(b):!0})),tg(a,f,d,r),fd(f,h),a.ancestors.pop(),a.schema=s,a.create(r,d,f,l)}function dv(a,r){if(r.data&&r.data.estree&&a.evaluater){const s=r.data.estree.body[0];return s.type,a.evaluater.evaluateExpression(s.expression)}xl(a,r.position)}function fv(a,r){if(r.data&&r.data.estree&&a.evaluater)return a.evaluater.evaluateProgram(r.data.estree);xl(a,r.position)}function pv(a,r,l){const s=a.schema;let u=s;r.name==="svg"&&s.space==="html"&&(u=cd,a.schema=u),a.ancestors.push(r);const d=r.name===null?a.Fragment:ag(a,r.name,!0),f=yv(a,r),h=pd(a,r);return tg(a,f,d,r),fd(f,h),a.ancestors.pop(),a.schema=s,a.create(r,d,f,l)}function hv(a,r,l){const s={};return fd(s,pd(a,r)),a.create(r,a.Fragment,s,l)}function mv(a,r){return r.value}function tg(a,r,l,s){typeof l!="string"&&l!==a.Fragment&&a.passNode&&(r.node=s)}function fd(a,r){if(r.length>0){const l=r.length>1?r:r[0];l&&(a.children=l)}}function bv(a,r,l){return s;function s(u,d,f,h){const p=Array.isArray(f.children)?l:r;return h?p(d,f,h):p(d,f)}}function gv(a,r){return l;function l(s,u,d,f){const h=Array.isArray(d.children),b=ud(s);return r(u,d,f,h,{columnNumber:b?b.column-1:void 0,fileName:a,lineNumber:b?b.line:void 0},void 0)}}function zv(a,r){const l={};let s,u;for(u in r.properties)if(u!=="children"&&dd.call(r.properties,u)){const d=vv(a,u,r.properties[u]);if(d){const[f,h]=d;a.tableCellAlignToStyle&&f==="align"&&typeof h=="string"&&ov.has(r.tagName)?s=h:l[f]=h}}if(s){const d=l.style||(l.style={});d[a.stylePropertyNameCase==="css"?"text-align":"textAlign"]=s}return l}function yv(a,r){const l={};for(const s of r.attributes)if(s.type==="mdxJsxExpressionAttribute")if(s.data&&s.data.estree&&a.evaluater){const d=s.data.estree.body[0];d.type;const f=d.expression;f.type;const h=f.properties[0];h.type,Object.assign(l,a.evaluater.evaluateExpression(h.argument))}else xl(a,r.position);else{const u=s.name;let d;if(s.value&&typeof s.value=="object")if(s.value.data&&s.value.data.estree&&a.evaluater){const h=s.value.data.estree.body[0];h.type,d=a.evaluater.evaluateExpression(h.expression)}else xl(a,r.position);else d=s.value===null?!0:s.value;l[u]=d}return l}function pd(a,r){const l=[];let s=-1;const u=a.passKeys?new Map:rv;for(;++s<r.children.length;){const d=r.children[s];let f;if(a.passKeys){const b=d.type==="element"?d.tagName:d.type==="mdxJsxFlowElement"||d.type==="mdxJsxTextElement"?d.name:void 0;if(b){const p=u.get(b)||0;f=b+"-"+p,u.set(b,p+1)}}const h=ng(a,d,f);h!==void 0&&l.push(h)}return l}function vv(a,r,l){const s=G0(a.schema,r);if(!(l==null||typeof l=="number"&&Number.isNaN(l))){if(Array.isArray(l)&&(l=s.commaSeparated?W0(l):K0(l)),s.property==="style"){let u=typeof l=="object"?l:Sv(a,String(l));return a.stylePropertyNameCase==="css"&&(u=Ev(u)),["style",u]}return[a.elementAttributeNameCase==="react"&&s.space?V0[s.property]||s.property:s.attribute,l]}}function Sv(a,r){try{return av(r,{reactCompat:!0})}catch(l){if(a.ignoreInvalidStyle)return{};const s=l,u=new jn("Cannot parse `style` attribute",{ancestors:a.ancestors,cause:s,ruleId:"style",source:"hast-util-to-jsx-runtime"});throw u.file=a.filePath||void 0,u.url=eg+"#cannot-parse-style-attribute",u}}function ag(a,r,l){let s;if(!l)s={type:"Literal",value:r};else if(r.includes(".")){const u=r.split(".");let d=-1,f;for(;++d<u.length;){const h=Xm(u[d])?{type:"Identifier",name:u[d]}:{type:"Literal",value:u[d]};f=f?{type:"MemberExpression",object:f,property:h,computed:!!(d&&h.type==="Literal"),optional:!1}:h}s=f}else s=Xm(r)&&!/^[a-z]/.test(r)?{type:"Identifier",name:r}:{type:"Literal",value:r};if(s.type==="Literal"){const u=s.value;return dd.call(a.components,u)?a.components[u]:u}if(a.evaluater)return a.evaluater.evaluateExpression(s);xl(a)}function xl(a,r){const l=new jn("Cannot handle MDX estrees without `createEvaluater`",{ancestors:a.ancestors,place:r,ruleId:"mdx-estree",source:"hast-util-to-jsx-runtime"});throw l.file=a.filePath||void 0,l.url=eg+"#cannot-handle-mdx-estrees-without-createevaluater",l}function Ev(a){const r={};let l;for(l in a)dd.call(a,l)&&(r[Dv(l)]=a[l]);return r}function Dv(a){let r=a.replace(lv,wv);return r.slice(0,3)==="ms-"&&(r="-"+r),r}function wv(a){return"-"+a.toLowerCase()}const Au={action:["form"],cite:["blockquote","del","ins","q"],data:["object"],formAction:["button","input"],href:["a","area","base","link"],icon:["menuitem"],itemId:null,manifest:["html"],ping:["a","area"],poster:["video"],src:["audio","embed","iframe","img","input","script","source","track","video"]},xv={};function Tv(a,r){const l=xv,s=typeof l.includeImageAlt=="boolean"?l.includeImageAlt:!0,u=typeof l.includeHtml=="boolean"?l.includeHtml:!0;return ig(a,s,u)}function ig(a,r,l){if(Av(a)){if("value"in a)return a.type==="html"&&!l?"":a.value;if(r&&"alt"in a&&a.alt)return a.alt;if("children"in a)return Fm(a.children,r,l)}return Array.isArray(a)?Fm(a,r,l):""}function Fm(a,r,l){const s=[];let u=-1;for(;++u<a.length;)s[u]=ig(a[u],r,l);return s.join("")}function Av(a){return!!(a&&typeof a=="object")}const Qm=document.createElement("i");function hd(a){const r="&"+a+";";Qm.innerHTML=r;const l=Qm.textContent;return l.charCodeAt(l.length-1)===59&&a!=="semi"||l===r?!1:l}function Yt(a,r,l,s){const u=a.length;let d=0,f;if(r<0?r=-r>u?0:u+r:r=r>u?u:r,l=l>0?l:0,s.length<1e4)f=Array.from(s),f.unshift(r,l),a.splice(...f);else for(l&&a.splice(r,l);d<s.length;)f=s.slice(d,d+1e4),f.unshift(r,0),a.splice(...f),d+=1e4,r+=1e4}function _t(a,r){return a.length>0?(Yt(a,a.length,0,r),a):r}const Km={}.hasOwnProperty;function kv(a){const r={};let l=-1;for(;++l<a.length;)Rv(r,a[l]);return r}function Rv(a,r){let l;for(l in r){const u=(Km.call(a,l)?a[l]:void 0)||(a[l]={}),d=r[l];let f;if(d)for(f in d){Km.call(u,f)||(u[f]=[]);const h=d[f];_v(u[f],Array.isArray(h)?h:h?[h]:[])}}}function _v(a,r){let l=-1;const s=[];for(;++l<r.length;)(r[l].add==="after"?a:s).push(r[l]);Yt(a,0,0,s)}function rg(a,r){const l=Number.parseInt(a,r);return l<9||l===11||l>13&&l<32||l>126&&l<160||l>55295&&l<57344||l>64975&&l<65008||(l&65535)===65535||(l&65535)===65534||l>1114111?"�":String.fromCodePoint(l)}function br(a){return a.replace(/[\t\n\r ]+/g," ").replace(/^ | $/g,"").toLowerCase().toUpperCase()}const Gt=ei(/[A-Za-z]/),bt=ei(/[\dA-Za-z]/),Iv=ei(/[#-'*+\--9=?A-Z^-~]/);function Yu(a){return a!==null&&(a<32||a===127)}const Fu=ei(/\d/),Mv=ei(/[\dA-Fa-f]/),Cv=ei(/[!-/:-@[-`{-~]/);function ke(a){return a!==null&&a<-2}function it(a){return a!==null&&(a<0||a===32)}function Fe(a){return a===-2||a===-1||a===32}const Lv=ei(new RegExp("\\p{P}|\\p{S}","u")),Wv=ei(/\s/);function ei(a){return r;function r(l){return l!==null&&l>-1&&a.test(String.fromCharCode(l))}}function yr(a){const r=[];let l=-1,s=0,u=0;for(;++l<a.length;){const d=a.charCodeAt(l);let f="";if(d===37&&bt(a.charCodeAt(l+1))&&bt(a.charCodeAt(l+2)))u=2;else if(d<128)/[!#$&-;=?-Z_a-z~]/.test(String.fromCharCode(d))||(f=String.fromCharCode(d));else if(d>55295&&d<57344){const h=a.charCodeAt(l+1);d<56320&&h>56319&&h<57344?(f=String.fromCharCode(d,h),u=1):f="�"}else f=String.fromCharCode(d);f&&(r.push(a.slice(s,l),encodeURIComponent(f)),s=l+u+1,f=""),u&&(l+=u,u=0)}return r.join("")+a.slice(s)}function un(a,r,l,s){const u=s?s-1:Number.POSITIVE_INFINITY;let d=0;return f;function f(b){return Fe(b)?(a.enter(l),h(b)):r(b)}function h(b){return Fe(b)&&d++<u?(a.consume(b),h):(a.exit(l),r(b))}}const Ov={tokenize:Pv};function Pv(a){const r=a.attempt(this.parser.constructs.contentInitial,s,u);let l;return r;function s(h){if(h===null){a.consume(h);return}return a.enter("lineEnding"),a.consume(h),a.exit("lineEnding"),un(a,r,"linePrefix")}function u(h){return a.enter("paragraph"),d(h)}function d(h){const b=a.enter("chunkText",{contentType:"text",previous:l});return l&&(l.next=b),l=b,f(h)}function f(h){if(h===null){a.exit("chunkText"),a.exit("paragraph"),a.consume(h);return}return ke(h)?(a.consume(h),a.exit("chunkText"),d):(a.consume(h),f)}}const Nv={tokenize:Xv},Jm={tokenize:Uv};function Xv(a){const r=this,l=[];let s=0,u,d,f;return h;function h(q){if(s<l.length){const de=l[s];return r.containerState=de[1],a.attempt(de[0].continuation,b,p)(q)}return p(q)}function b(q){if(s++,r.containerState._closeFlow){r.containerState._closeFlow=void 0,u&&Y();const de=r.events.length;let ye=de,Z;for(;ye--;)if(r.events[ye][0]==="exit"&&r.events[ye][1].type==="chunkFlow"){Z=r.events[ye][1].end;break}X(s);let k=de;for(;k<r.events.length;)r.events[k][1].end={...Z},k++;return Yt(r.events,ye+1,0,r.events.slice(de)),r.events.length=k,p(q)}return h(q)}function p(q){if(s===l.length){if(!u)return S(q);if(u.currentConstruct&&u.currentConstruct.concrete)return L(q);r.interrupt=!!(u.currentConstruct&&!u._gfmTableDynamicInterruptHack)}return r.containerState={},a.check(Jm,g,z)(q)}function g(q){return u&&Y(),X(s),S(q)}function z(q){return r.parser.lazy[r.now().line]=s!==l.length,f=r.now().offset,L(q)}function S(q){return r.containerState={},a.attempt(Jm,v,L)(q)}function v(q){return s++,l.push([r.currentConstruct,r.containerState]),S(q)}function L(q){if(q===null){u&&Y(),X(0),a.consume(q);return}return u=u||r.parser.flow(r.now()),a.enter("chunkFlow",{_tokenizer:u,contentType:"flow",previous:d}),O(q)}function O(q){if(q===null){j(a.exit("chunkFlow"),!0),X(0),a.consume(q);return}return ke(q)?(a.consume(q),j(a.exit("chunkFlow")),s=0,r.interrupt=void 0,h):(a.consume(q),O)}function j(q,de){const ye=r.sliceStream(q);if(de&&ye.push(null),q.previous=d,d&&(d.next=q),d=q,u.defineSkip(q.start),u.write(ye),r.parser.lazy[q.start.line]){let Z=u.events.length;for(;Z--;)if(u.events[Z][1].start.offset<f&&(!u.events[Z][1].end||u.events[Z][1].end.offset>f))return;const k=r.events.length;let te=k,he,ue;for(;te--;)if(r.events[te][0]==="exit"&&r.events[te][1].type==="chunkFlow"){if(he){ue=r.events[te][1].end;break}he=!0}for(X(s),Z=k;Z<r.events.length;)r.events[Z][1].end={...ue},Z++;Yt(r.events,te+1,0,r.events.slice(k)),r.events.length=Z}}function X(q){let de=l.length;for(;de-- >q;){const ye=l[de];r.containerState=ye[1],ye[0].exit.call(r,a)}l.length=q}function Y(){u.write([null]),d=void 0,u=void 0,r.containerState._closeFlow=void 0}}function Uv(a,r,l){return un(a,a.attempt(this.parser.constructs.document,r,l),"linePrefix",this.parser.constructs.disable.null.includes("codeIndented")?void 0:4)}function $m(a){if(a===null||it(a)||Wv(a))return 1;if(Lv(a))return 2}function md(a,r,l){const s=[];let u=-1;for(;++u<a.length;){const d=a[u].resolveAll;d&&!s.includes(d)&&(r=d(r,l),s.push(d))}return r}const Qu={name:"attention",resolveAll:Bv,tokenize:Zv};function Bv(a,r){let l=-1,s,u,d,f,h,b,p,g;for(;++l<a.length;)if(a[l][0]==="enter"&&a[l][1].type==="attentionSequence"&&a[l][1]._close){for(s=l;s--;)if(a[s][0]==="exit"&&a[s][1].type==="attentionSequence"&&a[s][1]._open&&r.sliceSerialize(a[s][1]).charCodeAt(0)===r.sliceSerialize(a[l][1]).charCodeAt(0)){if((a[s][1]._close||a[l][1]._open)&&(a[l][1].end.offset-a[l][1].start.offset)%3&&!((a[s][1].end.offset-a[s][1].start.offset+a[l][1].end.offset-a[l][1].start.offset)%3))continue;b=a[s][1].end.offset-a[s][1].start.offset>1&&a[l][1].end.offset-a[l][1].start.offset>1?2:1;const z={...a[s][1].end},S={...a[l][1].start};eb(z,-b),eb(S,b),f={type:b>1?"strongSequence":"emphasisSequence",start:z,end:{...a[s][1].end}},h={type:b>1?"strongSequence":"emphasisSequence",start:{...a[l][1].start},end:S},d={type:b>1?"strongText":"emphasisText",start:{...a[s][1].end},end:{...a[l][1].start}},u={type:b>1?"strong":"emphasis",start:{...f.start},end:{...h.end}},a[s][1].end={...f.start},a[l][1].start={...h.end},p=[],a[s][1].end.offset-a[s][1].start.offset&&(p=_t(p,[["enter",a[s][1],r],["exit",a[s][1],r]])),p=_t(p,[["enter",u,r],["enter",f,r],["exit",f,r],["enter",d,r]]),p=_t(p,md(r.parser.constructs.insideSpan.null,a.slice(s+1,l),r)),p=_t(p,[["exit",d,r],["enter",h,r],["exit",h,r],["exit",u,r]]),a[l][1].end.offset-a[l][1].start.offset?(g=2,p=_t(p,[["enter",a[l][1],r],["exit",a[l][1],r]])):g=0,Yt(a,s-1,l-s+3,p),l=s+p.length-g-2;break}}for(l=-1;++l<a.length;)a[l][1].type==="attentionSequence"&&(a[l][1].type="data");return a}function Zv(a,r){const l=this.parser.constructs.attentionMarkers.null,s=this.previous,u=$m(s);let d;return f;function f(b){return d=b,a.enter("attentionSequence"),h(b)}function h(b){if(b===d)return a.consume(b),h;const p=a.exit("attentionSequence"),g=$m(b),z=!g||g===2&&u||l.includes(b),S=!u||u===2&&g||l.includes(s);return p._open=!!(d===42?z:z&&(u||!S)),p._close=!!(d===42?S:S&&(g||!z)),r(b)}}function eb(a,r){a.column+=r,a.offset+=r,a._bufferIndex+=r}const jv={name:"autolink",tokenize:Vv};function Vv(a,r,l){let s=0;return u;function u(v){return a.enter("autolink"),a.enter("autolinkMarker"),a.consume(v),a.exit("autolinkMarker"),a.enter("autolinkProtocol"),d}function d(v){return Gt(v)?(a.consume(v),f):v===64?l(v):p(v)}function f(v){return v===43||v===45||v===46||bt(v)?(s=1,h(v)):p(v)}function h(v){return v===58?(a.consume(v),s=0,b):(v===43||v===45||v===46||bt(v))&&s++<32?(a.consume(v),h):(s=0,p(v))}function b(v){return v===62?(a.exit("autolinkProtocol"),a.enter("autolinkMarker"),a.consume(v),a.exit("autolinkMarker"),a.exit("autolink"),r):v===null||v===32||v===60||Yu(v)?l(v):(a.consume(v),b)}function p(v){return v===64?(a.consume(v),g):Iv(v)?(a.consume(v),p):l(v)}function g(v){return bt(v)?z(v):l(v)}function z(v){return v===46?(a.consume(v),s=0,g):v===62?(a.exit("autolinkProtocol").type="autolinkEmail",a.enter("autolinkMarker"),a.consume(v),a.exit("autolinkMarker"),a.exit("autolink"),r):S(v)}function S(v){if((v===45||bt(v))&&s++<63){const L=v===45?S:z;return a.consume(v),L}return l(v)}}const ao={partial:!0,tokenize:Hv};function Hv(a,r,l){return s;function s(d){return Fe(d)?un(a,u,"linePrefix")(d):u(d)}function u(d){return d===null||ke(d)?r(d):l(d)}}const lg={continuation:{tokenize:Gv},exit:Yv,name:"blockQuote",tokenize:qv};function qv(a,r,l){const s=this;return u;function u(f){if(f===62){const h=s.containerState;return h.open||(a.enter("blockQuote",{_container:!0}),h.open=!0),a.enter("blockQuotePrefix"),a.enter("blockQuoteMarker"),a.consume(f),a.exit("blockQuoteMarker"),d}return l(f)}function d(f){return Fe(f)?(a.enter("blockQuotePrefixWhitespace"),a.consume(f),a.exit("blockQuotePrefixWhitespace"),a.exit("blockQuotePrefix"),r):(a.exit("blockQuotePrefix"),r(f))}}function Gv(a,r,l){const s=this;return u;function u(f){return Fe(f)?un(a,d,"linePrefix",s.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(f):d(f)}function d(f){return a.attempt(lg,r,l)(f)}}function Yv(a){a.exit("blockQuote")}const sg={name:"characterEscape",tokenize:Fv};function Fv(a,r,l){return s;function s(d){return a.enter("characterEscape"),a.enter("escapeMarker"),a.consume(d),a.exit("escapeMarker"),u}function u(d){return Cv(d)?(a.enter("characterEscapeValue"),a.consume(d),a.exit("characterEscapeValue"),a.exit("characterEscape"),r):l(d)}}const og={name:"characterReference",tokenize:Qv};function Qv(a,r,l){const s=this;let u=0,d,f;return h;function h(z){return a.enter("characterReference"),a.enter("characterReferenceMarker"),a.consume(z),a.exit("characterReferenceMarker"),b}function b(z){return z===35?(a.enter("characterReferenceMarkerNumeric"),a.consume(z),a.exit("characterReferenceMarkerNumeric"),p):(a.enter("characterReferenceValue"),d=31,f=bt,g(z))}function p(z){return z===88||z===120?(a.enter("characterReferenceMarkerHexadecimal"),a.consume(z),a.exit("characterReferenceMarkerHexadecimal"),a.enter("characterReferenceValue"),d=6,f=Mv,g):(a.enter("characterReferenceValue"),d=7,f=Fu,g(z))}function g(z){if(z===59&&u){const S=a.exit("characterReferenceValue");return f===bt&&!hd(s.sliceSerialize(S))?l(z):(a.enter("characterReferenceMarker"),a.consume(z),a.exit("characterReferenceMarker"),a.exit("characterReference"),r)}return f(z)&&u++<d?(a.consume(z),g):l(z)}}const nb={partial:!0,tokenize:Jv},tb={concrete:!0,name:"codeFenced",tokenize:Kv};function Kv(a,r,l){const s=this,u={partial:!0,tokenize:ye};let d=0,f=0,h;return b;function b(Z){return p(Z)}function p(Z){const k=s.events[s.events.length-1];return d=k&&k[1].type==="linePrefix"?k[2].sliceSerialize(k[1],!0).length:0,h=Z,a.enter("codeFenced"),a.enter("codeFencedFence"),a.enter("codeFencedFenceSequence"),g(Z)}function g(Z){return Z===h?(f++,a.consume(Z),g):f<3?l(Z):(a.exit("codeFencedFenceSequence"),Fe(Z)?un(a,z,"whitespace")(Z):z(Z))}function z(Z){return Z===null||ke(Z)?(a.exit("codeFencedFence"),s.interrupt?r(Z):a.check(nb,O,de)(Z)):(a.enter("codeFencedFenceInfo"),a.enter("chunkString",{contentType:"string"}),S(Z))}function S(Z){return Z===null||ke(Z)?(a.exit("chunkString"),a.exit("codeFencedFenceInfo"),z(Z)):Fe(Z)?(a.exit("chunkString"),a.exit("codeFencedFenceInfo"),un(a,v,"whitespace")(Z)):Z===96&&Z===h?l(Z):(a.consume(Z),S)}function v(Z){return Z===null||ke(Z)?z(Z):(a.enter("codeFencedFenceMeta"),a.enter("chunkString",{contentType:"string"}),L(Z))}function L(Z){return Z===null||ke(Z)?(a.exit("chunkString"),a.exit("codeFencedFenceMeta"),z(Z)):Z===96&&Z===h?l(Z):(a.consume(Z),L)}function O(Z){return a.attempt(u,de,j)(Z)}function j(Z){return a.enter("lineEnding"),a.consume(Z),a.exit("lineEnding"),X}function X(Z){return d>0&&Fe(Z)?un(a,Y,"linePrefix",d+1)(Z):Y(Z)}function Y(Z){return Z===null||ke(Z)?a.check(nb,O,de)(Z):(a.enter("codeFlowValue"),q(Z))}function q(Z){return Z===null||ke(Z)?(a.exit("codeFlowValue"),Y(Z)):(a.consume(Z),q)}function de(Z){return a.exit("codeFenced"),r(Z)}function ye(Z,k,te){let he=0;return ue;function ue($){return Z.enter("lineEnding"),Z.consume($),Z.exit("lineEnding"),ie}function ie($){return Z.enter("codeFencedFence"),Fe($)?un(Z,ne,"linePrefix",s.parser.constructs.disable.null.includes("codeIndented")?void 0:4)($):ne($)}function ne($){return $===h?(Z.enter("codeFencedFenceSequence"),Te($)):te($)}function Te($){return $===h?(he++,Z.consume($),Te):he>=f?(Z.exit("codeFencedFenceSequence"),Fe($)?un(Z,fe,"whitespace")($):fe($)):te($)}function fe($){return $===null||ke($)?(Z.exit("codeFencedFence"),k($)):te($)}}}function Jv(a,r,l){const s=this;return u;function u(f){return f===null?l(f):(a.enter("lineEnding"),a.consume(f),a.exit("lineEnding"),d)}function d(f){return s.parser.lazy[s.now().line]?l(f):r(f)}}const ku={name:"codeIndented",tokenize:e2},$v={partial:!0,tokenize:n2};function e2(a,r,l){const s=this;return u;function u(p){return a.enter("codeIndented"),un(a,d,"linePrefix",5)(p)}function d(p){const g=s.events[s.events.length-1];return g&&g[1].type==="linePrefix"&&g[2].sliceSerialize(g[1],!0).length>=4?f(p):l(p)}function f(p){return p===null?b(p):ke(p)?a.attempt($v,f,b)(p):(a.enter("codeFlowValue"),h(p))}function h(p){return p===null||ke(p)?(a.exit("codeFlowValue"),f(p)):(a.consume(p),h)}function b(p){return a.exit("codeIndented"),r(p)}}function n2(a,r,l){const s=this;return u;function u(f){return s.parser.lazy[s.now().line]?l(f):ke(f)?(a.enter("lineEnding"),a.consume(f),a.exit("lineEnding"),u):un(a,d,"linePrefix",5)(f)}function d(f){const h=s.events[s.events.length-1];return h&&h[1].type==="linePrefix"&&h[2].sliceSerialize(h[1],!0).length>=4?r(f):ke(f)?u(f):l(f)}}const t2={name:"codeText",previous:i2,resolve:a2,tokenize:r2};function a2(a){let r=a.length-4,l=3,s,u;if((a[l][1].type==="lineEnding"||a[l][1].type==="space")&&(a[r][1].type==="lineEnding"||a[r][1].type==="space")){for(s=l;++s<r;)if(a[s][1].type==="codeTextData"){a[l][1].type="codeTextPadding",a[r][1].type="codeTextPadding",l+=2,r-=2;break}}for(s=l-1,r++;++s<=r;)u===void 0?s!==r&&a[s][1].type!=="lineEnding"&&(u=s):(s===r||a[s][1].type==="lineEnding")&&(a[u][1].type="codeTextData",s!==u+2&&(a[u][1].end=a[s-1][1].end,a.splice(u+2,s-u-2),r-=s-u-2,s=u+2),u=void 0);return a}function i2(a){return a!==96||this.events[this.events.length-1][1].type==="characterEscape"}function r2(a,r,l){let s=0,u,d;return f;function f(z){return a.enter("codeText"),a.enter("codeTextSequence"),h(z)}function h(z){return z===96?(a.consume(z),s++,h):(a.exit("codeTextSequence"),b(z))}function b(z){return z===null?l(z):z===32?(a.enter("space"),a.consume(z),a.exit("space"),b):z===96?(d=a.enter("codeTextSequence"),u=0,g(z)):ke(z)?(a.enter("lineEnding"),a.consume(z),a.exit("lineEnding"),b):(a.enter("codeTextData"),p(z))}function p(z){return z===null||z===32||z===96||ke(z)?(a.exit("codeTextData"),b(z)):(a.consume(z),p)}function g(z){return z===96?(a.consume(z),u++,g):u===s?(a.exit("codeTextSequence"),a.exit("codeText"),r(z)):(d.type="codeTextData",p(z))}}class l2{constructor(r){this.left=r?[...r]:[],this.right=[]}get(r){if(r<0||r>=this.left.length+this.right.length)throw new RangeError("Cannot access index `"+r+"` in a splice buffer of size `"+(this.left.length+this.right.length)+"`");return r<this.left.length?this.left[r]:this.right[this.right.length-r+this.left.length-1]}get length(){return this.left.length+this.right.length}shift(){return this.setCursor(0),this.right.pop()}slice(r,l){const s=l??Number.POSITIVE_INFINITY;return s<this.left.length?this.left.slice(r,s):r>this.left.length?this.right.slice(this.right.length-s+this.left.length,this.right.length-r+this.left.length).reverse():this.left.slice(r).concat(this.right.slice(this.right.length-s+this.left.length).reverse())}splice(r,l,s){const u=l||0;this.setCursor(Math.trunc(r));const d=this.right.splice(this.right.length-u,Number.POSITIVE_INFINITY);return s&&bl(this.left,s),d.reverse()}pop(){return this.setCursor(Number.POSITIVE_INFINITY),this.left.pop()}push(r){this.setCursor(Number.POSITIVE_INFINITY),this.left.push(r)}pushMany(r){this.setCursor(Number.POSITIVE_INFINITY),bl(this.left,r)}unshift(r){this.setCursor(0),this.right.push(r)}unshiftMany(r){this.setCursor(0),bl(this.right,r.reverse())}setCursor(r){if(!(r===this.left.length||r>this.left.length&&this.right.length===0||r<0&&this.left.length===0))if(r<this.left.length){const l=this.left.splice(r,Number.POSITIVE_INFINITY);bl(this.right,l.reverse())}else{const l=this.right.splice(this.left.length+this.right.length-r,Number.POSITIVE_INFINITY);bl(this.left,l.reverse())}}}function bl(a,r){let l=0;if(r.length<1e4)a.push(...r);else for(;l<r.length;)a.push(...r.slice(l,l+1e4)),l+=1e4}function cg(a){const r={};let l=-1,s,u,d,f,h,b,p;const g=new l2(a);for(;++l<g.length;){for(;l in r;)l=r[l];if(s=g.get(l),l&&s[1].type==="chunkFlow"&&g.get(l-1)[1].type==="listItemPrefix"&&(b=s[1]._tokenizer.events,d=0,d<b.length&&b[d][1].type==="lineEndingBlank"&&(d+=2),d<b.length&&b[d][1].type==="content"))for(;++d<b.length&&b[d][1].type!=="content";)b[d][1].type==="chunkText"&&(b[d][1]._isInFirstContentOfListItem=!0,d++);if(s[0]==="enter")s[1].contentType&&(Object.assign(r,s2(g,l)),l=r[l],p=!0);else if(s[1]._container){for(d=l,u=void 0;d--;)if(f=g.get(d),f[1].type==="lineEnding"||f[1].type==="lineEndingBlank")f[0]==="enter"&&(u&&(g.get(u)[1].type="lineEndingBlank"),f[1].type="lineEnding",u=d);else if(!(f[1].type==="linePrefix"||f[1].type==="listItemIndent"))break;u&&(s[1].end={...g.get(u)[1].start},h=g.slice(u,l),h.unshift(s),g.splice(u,l-u+1,h))}}return Yt(a,0,Number.POSITIVE_INFINITY,g.slice(0)),!p}function s2(a,r){const l=a.get(r)[1],s=a.get(r)[2];let u=r-1;const d=[];let f=l._tokenizer;f||(f=s.parser[l.contentType](l.start),l._contentTypeTextTrailing&&(f._contentTypeTextTrailing=!0));const h=f.events,b=[],p={};let g,z,S=-1,v=l,L=0,O=0;const j=[O];for(;v;){for(;a.get(++u)[1]!==v;);d.push(u),v._tokenizer||(g=s.sliceStream(v),v.next||g.push(null),z&&f.defineSkip(v.start),v._isInFirstContentOfListItem&&(f._gfmTasklistFirstContentOfListItem=!0),f.write(g),v._isInFirstContentOfListItem&&(f._gfmTasklistFirstContentOfListItem=void 0)),z=v,v=v.next}for(v=l;++S<h.length;)h[S][0]==="exit"&&h[S-1][0]==="enter"&&h[S][1].type===h[S-1][1].type&&h[S][1].start.line!==h[S][1].end.line&&(O=S+1,j.push(O),v._tokenizer=void 0,v.previous=void 0,v=v.next);for(f.events=[],v?(v._tokenizer=void 0,v.previous=void 0):j.pop(),S=j.length;S--;){const X=h.slice(j[S],j[S+1]),Y=d.pop();b.push([Y,Y+X.length-1]),a.splice(Y,2,X)}for(b.reverse(),S=-1;++S<b.length;)p[L+b[S][0]]=L+b[S][1],L+=b[S][1]-b[S][0]-1;return p}const o2={resolve:u2,tokenize:d2},c2={partial:!0,tokenize:f2};function u2(a){return cg(a),a}function d2(a,r){let l;return s;function s(h){return a.enter("content"),l=a.enter("chunkContent",{contentType:"content"}),u(h)}function u(h){return h===null?d(h):ke(h)?a.check(c2,f,d)(h):(a.consume(h),u)}function d(h){return a.exit("chunkContent"),a.exit("content"),r(h)}function f(h){return a.consume(h),a.exit("chunkContent"),l.next=a.enter("chunkContent",{contentType:"content",previous:l}),l=l.next,u}}function f2(a,r,l){const s=this;return u;function u(f){return a.exit("chunkContent"),a.enter("lineEnding"),a.consume(f),a.exit("lineEnding"),un(a,d,"linePrefix")}function d(f){if(f===null||ke(f))return l(f);const h=s.events[s.events.length-1];return!s.parser.constructs.disable.null.includes("codeIndented")&&h&&h[1].type==="linePrefix"&&h[2].sliceSerialize(h[1],!0).length>=4?r(f):a.interrupt(s.parser.constructs.flow,l,r)(f)}}function ug(a,r,l,s,u,d,f,h,b){const p=b||Number.POSITIVE_INFINITY;let g=0;return z;function z(X){return X===60?(a.enter(s),a.enter(u),a.enter(d),a.consume(X),a.exit(d),S):X===null||X===32||X===41||Yu(X)?l(X):(a.enter(s),a.enter(f),a.enter(h),a.enter("chunkString",{contentType:"string"}),O(X))}function S(X){return X===62?(a.enter(d),a.consume(X),a.exit(d),a.exit(u),a.exit(s),r):(a.enter(h),a.enter("chunkString",{contentType:"string"}),v(X))}function v(X){return X===62?(a.exit("chunkString"),a.exit(h),S(X)):X===null||X===60||ke(X)?l(X):(a.consume(X),X===92?L:v)}function L(X){return X===60||X===62||X===92?(a.consume(X),v):v(X)}function O(X){return!g&&(X===null||X===41||it(X))?(a.exit("chunkString"),a.exit(h),a.exit(f),a.exit(s),r(X)):g<p&&X===40?(a.consume(X),g++,O):X===41?(a.consume(X),g--,O):X===null||X===32||X===40||Yu(X)?l(X):(a.consume(X),X===92?j:O)}function j(X){return X===40||X===41||X===92?(a.consume(X),O):O(X)}}function dg(a,r,l,s,u,d){const f=this;let h=0,b;return p;function p(v){return a.enter(s),a.enter(u),a.consume(v),a.exit(u),a.enter(d),g}function g(v){return h>999||v===null||v===91||v===93&&!b||v===94&&!h&&"_hiddenFootnoteSupport"in f.parser.constructs?l(v):v===93?(a.exit(d),a.enter(u),a.consume(v),a.exit(u),a.exit(s),r):ke(v)?(a.enter("lineEnding"),a.consume(v),a.exit("lineEnding"),g):(a.enter("chunkString",{contentType:"string"}),z(v))}function z(v){return v===null||v===91||v===93||ke(v)||h++>999?(a.exit("chunkString"),g(v)):(a.consume(v),b||(b=!Fe(v)),v===92?S:z)}function S(v){return v===91||v===92||v===93?(a.consume(v),h++,z):z(v)}}function fg(a,r,l,s,u,d){let f;return h;function h(S){return S===34||S===39||S===40?(a.enter(s),a.enter(u),a.consume(S),a.exit(u),f=S===40?41:S,b):l(S)}function b(S){return S===f?(a.enter(u),a.consume(S),a.exit(u),a.exit(s),r):(a.enter(d),p(S))}function p(S){return S===f?(a.exit(d),b(f)):S===null?l(S):ke(S)?(a.enter("lineEnding"),a.consume(S),a.exit("lineEnding"),un(a,p,"linePrefix")):(a.enter("chunkString",{contentType:"string"}),g(S))}function g(S){return S===f||S===null||ke(S)?(a.exit("chunkString"),p(S)):(a.consume(S),S===92?z:g)}function z(S){return S===f||S===92?(a.consume(S),g):g(S)}}function vl(a,r){let l;return s;function s(u){return ke(u)?(a.enter("lineEnding"),a.consume(u),a.exit("lineEnding"),l=!0,s):Fe(u)?un(a,s,l?"linePrefix":"lineSuffix")(u):r(u)}}const p2={name:"definition",tokenize:m2},h2={partial:!0,tokenize:b2};function m2(a,r,l){const s=this;let u;return d;function d(v){return a.enter("definition"),f(v)}function f(v){return dg.call(s,a,h,l,"definitionLabel","definitionLabelMarker","definitionLabelString")(v)}function h(v){return u=br(s.sliceSerialize(s.events[s.events.length-1][1]).slice(1,-1)),v===58?(a.enter("definitionMarker"),a.consume(v),a.exit("definitionMarker"),b):l(v)}function b(v){return it(v)?vl(a,p)(v):p(v)}function p(v){return ug(a,g,l,"definitionDestination","definitionDestinationLiteral","definitionDestinationLiteralMarker","definitionDestinationRaw","definitionDestinationString")(v)}function g(v){return a.attempt(h2,z,z)(v)}function z(v){return Fe(v)?un(a,S,"whitespace")(v):S(v)}function S(v){return v===null||ke(v)?(a.exit("definition"),s.parser.defined.push(u),r(v)):l(v)}}function b2(a,r,l){return s;function s(h){return it(h)?vl(a,u)(h):l(h)}function u(h){return fg(a,d,l,"definitionTitle","definitionTitleMarker","definitionTitleString")(h)}function d(h){return Fe(h)?un(a,f,"whitespace")(h):f(h)}function f(h){return h===null||ke(h)?r(h):l(h)}}const g2={name:"hardBreakEscape",tokenize:z2};function z2(a,r,l){return s;function s(d){return a.enter("hardBreakEscape"),a.consume(d),u}function u(d){return ke(d)?(a.exit("hardBreakEscape"),r(d)):l(d)}}const y2={name:"headingAtx",resolve:v2,tokenize:S2};function v2(a,r){let l=a.length-2,s=3,u,d;return a[s][1].type==="whitespace"&&(s+=2),l-2>s&&a[l][1].type==="whitespace"&&(l-=2),a[l][1].type==="atxHeadingSequence"&&(s===l-1||l-4>s&&a[l-2][1].type==="whitespace")&&(l-=s+1===l?2:4),l>s&&(u={type:"atxHeadingText",start:a[s][1].start,end:a[l][1].end},d={type:"chunkText",start:a[s][1].start,end:a[l][1].end,contentType:"text"},Yt(a,s,l-s+1,[["enter",u,r],["enter",d,r],["exit",d,r],["exit",u,r]])),a}function S2(a,r,l){let s=0;return u;function u(g){return a.enter("atxHeading"),d(g)}function d(g){return a.enter("atxHeadingSequence"),f(g)}function f(g){return g===35&&s++<6?(a.consume(g),f):g===null||it(g)?(a.exit("atxHeadingSequence"),h(g)):l(g)}function h(g){return g===35?(a.enter("atxHeadingSequence"),b(g)):g===null||ke(g)?(a.exit("atxHeading"),r(g)):Fe(g)?un(a,h,"whitespace")(g):(a.enter("atxHeadingText"),p(g))}function b(g){return g===35?(a.consume(g),b):(a.exit("atxHeadingSequence"),h(g))}function p(g){return g===null||g===35||it(g)?(a.exit("atxHeadingText"),h(g)):(a.consume(g),p)}}const E2=["address","article","aside","base","basefont","blockquote","body","caption","center","col","colgroup","dd","details","dialog","dir","div","dl","dt","fieldset","figcaption","figure","footer","form","frame","frameset","h1","h2","h3","h4","h5","h6","head","header","hr","html","iframe","legend","li","link","main","menu","menuitem","nav","noframes","ol","optgroup","option","p","param","search","section","summary","table","tbody","td","tfoot","th","thead","title","tr","track","ul"],ab=["pre","script","style","textarea"],D2={concrete:!0,name:"htmlFlow",resolveTo:T2,tokenize:A2},w2={partial:!0,tokenize:R2},x2={partial:!0,tokenize:k2};function T2(a){let r=a.length;for(;r--&&!(a[r][0]==="enter"&&a[r][1].type==="htmlFlow"););return r>1&&a[r-2][1].type==="linePrefix"&&(a[r][1].start=a[r-2][1].start,a[r+1][1].start=a[r-2][1].start,a.splice(r-2,2)),a}function A2(a,r,l){const s=this;let u,d,f,h,b;return p;function p(E){return g(E)}function g(E){return a.enter("htmlFlow"),a.enter("htmlFlowData"),a.consume(E),z}function z(E){return E===33?(a.consume(E),S):E===47?(a.consume(E),d=!0,O):E===63?(a.consume(E),u=3,s.interrupt?r:D):Gt(E)?(a.consume(E),f=String.fromCharCode(E),j):l(E)}function S(E){return E===45?(a.consume(E),u=2,v):E===91?(a.consume(E),u=5,h=0,L):Gt(E)?(a.consume(E),u=4,s.interrupt?r:D):l(E)}function v(E){return E===45?(a.consume(E),s.interrupt?r:D):l(E)}function L(E){const re="CDATA[";return E===re.charCodeAt(h++)?(a.consume(E),h===re.length?s.interrupt?r:ne:L):l(E)}function O(E){return Gt(E)?(a.consume(E),f=String.fromCharCode(E),j):l(E)}function j(E){if(E===null||E===47||E===62||it(E)){const re=E===47,ze=f.toLowerCase();return!re&&!d&&ab.includes(ze)?(u=1,s.interrupt?r(E):ne(E)):E2.includes(f.toLowerCase())?(u=6,re?(a.consume(E),X):s.interrupt?r(E):ne(E)):(u=7,s.interrupt&&!s.parser.lazy[s.now().line]?l(E):d?Y(E):q(E))}return E===45||bt(E)?(a.consume(E),f+=String.fromCharCode(E),j):l(E)}function X(E){return E===62?(a.consume(E),s.interrupt?r:ne):l(E)}function Y(E){return Fe(E)?(a.consume(E),Y):ue(E)}function q(E){return E===47?(a.consume(E),ue):E===58||E===95||Gt(E)?(a.consume(E),de):Fe(E)?(a.consume(E),q):ue(E)}function de(E){return E===45||E===46||E===58||E===95||bt(E)?(a.consume(E),de):ye(E)}function ye(E){return E===61?(a.consume(E),Z):Fe(E)?(a.consume(E),ye):q(E)}function Z(E){return E===null||E===60||E===61||E===62||E===96?l(E):E===34||E===39?(a.consume(E),b=E,k):Fe(E)?(a.consume(E),Z):te(E)}function k(E){return E===b?(a.consume(E),b=null,he):E===null||ke(E)?l(E):(a.consume(E),k)}function te(E){return E===null||E===34||E===39||E===47||E===60||E===61||E===62||E===96||it(E)?ye(E):(a.consume(E),te)}function he(E){return E===47||E===62||Fe(E)?q(E):l(E)}function ue(E){return E===62?(a.consume(E),ie):l(E)}function ie(E){return E===null||ke(E)?ne(E):Fe(E)?(a.consume(E),ie):l(E)}function ne(E){return E===45&&u===2?(a.consume(E),C):E===60&&u===1?(a.consume(E),K):E===62&&u===4?(a.consume(E),x):E===63&&u===3?(a.consume(E),D):E===93&&u===5?(a.consume(E),Me):ke(E)&&(u===6||u===7)?(a.exit("htmlFlowData"),a.check(w2,U,Te)(E)):E===null||ke(E)?(a.exit("htmlFlowData"),Te(E)):(a.consume(E),ne)}function Te(E){return a.check(x2,fe,U)(E)}function fe(E){return a.enter("lineEnding"),a.consume(E),a.exit("lineEnding"),$}function $(E){return E===null||ke(E)?Te(E):(a.enter("htmlFlowData"),ne(E))}function C(E){return E===45?(a.consume(E),D):ne(E)}function K(E){return E===47?(a.consume(E),f="",le):ne(E)}function le(E){if(E===62){const re=f.toLowerCase();return ab.includes(re)?(a.consume(E),x):ne(E)}return Gt(E)&&f.length<8?(a.consume(E),f+=String.fromCharCode(E),le):ne(E)}function Me(E){return E===93?(a.consume(E),D):ne(E)}function D(E){return E===62?(a.consume(E),x):E===45&&u===2?(a.consume(E),D):ne(E)}function x(E){return E===null||ke(E)?(a.exit("htmlFlowData"),U(E)):(a.consume(E),x)}function U(E){return a.exit("htmlFlow"),r(E)}}function k2(a,r,l){const s=this;return u;function u(f){return ke(f)?(a.enter("lineEnding"),a.consume(f),a.exit("lineEnding"),d):l(f)}function d(f){return s.parser.lazy[s.now().line]?l(f):r(f)}}function R2(a,r,l){return s;function s(u){return a.enter("lineEnding"),a.consume(u),a.exit("lineEnding"),a.attempt(ao,r,l)}}const _2={name:"htmlText",tokenize:I2};function I2(a,r,l){const s=this;let u,d,f;return h;function h(D){return a.enter("htmlText"),a.enter("htmlTextData"),a.consume(D),b}function b(D){return D===33?(a.consume(D),p):D===47?(a.consume(D),ye):D===63?(a.consume(D),q):Gt(D)?(a.consume(D),te):l(D)}function p(D){return D===45?(a.consume(D),g):D===91?(a.consume(D),d=0,L):Gt(D)?(a.consume(D),Y):l(D)}function g(D){return D===45?(a.consume(D),v):l(D)}function z(D){return D===null?l(D):D===45?(a.consume(D),S):ke(D)?(f=z,K(D)):(a.consume(D),z)}function S(D){return D===45?(a.consume(D),v):z(D)}function v(D){return D===62?C(D):D===45?S(D):z(D)}function L(D){const x="CDATA[";return D===x.charCodeAt(d++)?(a.consume(D),d===x.length?O:L):l(D)}function O(D){return D===null?l(D):D===93?(a.consume(D),j):ke(D)?(f=O,K(D)):(a.consume(D),O)}function j(D){return D===93?(a.consume(D),X):O(D)}function X(D){return D===62?C(D):D===93?(a.consume(D),X):O(D)}function Y(D){return D===null||D===62?C(D):ke(D)?(f=Y,K(D)):(a.consume(D),Y)}function q(D){return D===null?l(D):D===63?(a.consume(D),de):ke(D)?(f=q,K(D)):(a.consume(D),q)}function de(D){return D===62?C(D):q(D)}function ye(D){return Gt(D)?(a.consume(D),Z):l(D)}function Z(D){return D===45||bt(D)?(a.consume(D),Z):k(D)}function k(D){return ke(D)?(f=k,K(D)):Fe(D)?(a.consume(D),k):C(D)}function te(D){return D===45||bt(D)?(a.consume(D),te):D===47||D===62||it(D)?he(D):l(D)}function he(D){return D===47?(a.consume(D),C):D===58||D===95||Gt(D)?(a.consume(D),ue):ke(D)?(f=he,K(D)):Fe(D)?(a.consume(D),he):C(D)}function ue(D){return D===45||D===46||D===58||D===95||bt(D)?(a.consume(D),ue):ie(D)}function ie(D){return D===61?(a.consume(D),ne):ke(D)?(f=ie,K(D)):Fe(D)?(a.consume(D),ie):he(D)}function ne(D){return D===null||D===60||D===61||D===62||D===96?l(D):D===34||D===39?(a.consume(D),u=D,Te):ke(D)?(f=ne,K(D)):Fe(D)?(a.consume(D),ne):(a.consume(D),fe)}function Te(D){return D===u?(a.consume(D),u=void 0,$):D===null?l(D):ke(D)?(f=Te,K(D)):(a.consume(D),Te)}function fe(D){return D===null||D===34||D===39||D===60||D===61||D===96?l(D):D===47||D===62||it(D)?he(D):(a.consume(D),fe)}function $(D){return D===47||D===62||it(D)?he(D):l(D)}function C(D){return D===62?(a.consume(D),a.exit("htmlTextData"),a.exit("htmlText"),r):l(D)}function K(D){return a.exit("htmlTextData"),a.enter("lineEnding"),a.consume(D),a.exit("lineEnding"),le}function le(D){return Fe(D)?un(a,Me,"linePrefix",s.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(D):Me(D)}function Me(D){return a.enter("htmlTextData"),f(D)}}const bd={name:"labelEnd",resolveAll:W2,resolveTo:O2,tokenize:P2},M2={tokenize:N2},C2={tokenize:X2},L2={tokenize:U2};function W2(a){let r=-1;const l=[];for(;++r<a.length;){const s=a[r][1];if(l.push(a[r]),s.type==="labelImage"||s.type==="labelLink"||s.type==="labelEnd"){const u=s.type==="labelImage"?4:2;s.type="data",r+=u}}return a.length!==l.length&&Yt(a,0,a.length,l),a}function O2(a,r){let l=a.length,s=0,u,d,f,h;for(;l--;)if(u=a[l][1],d){if(u.type==="link"||u.type==="labelLink"&&u._inactive)break;a[l][0]==="enter"&&u.type==="labelLink"&&(u._inactive=!0)}else if(f){if(a[l][0]==="enter"&&(u.type==="labelImage"||u.type==="labelLink")&&!u._balanced&&(d=l,u.type!=="labelLink")){s=2;break}}else u.type==="labelEnd"&&(f=l);const b={type:a[d][1].type==="labelLink"?"link":"image",start:{...a[d][1].start},end:{...a[a.length-1][1].end}},p={type:"label",start:{...a[d][1].start},end:{...a[f][1].end}},g={type:"labelText",start:{...a[d+s+2][1].end},end:{...a[f-2][1].start}};return h=[["enter",b,r],["enter",p,r]],h=_t(h,a.slice(d+1,d+s+3)),h=_t(h,[["enter",g,r]]),h=_t(h,md(r.parser.constructs.insideSpan.null,a.slice(d+s+4,f-3),r)),h=_t(h,[["exit",g,r],a[f-2],a[f-1],["exit",p,r]]),h=_t(h,a.slice(f+1)),h=_t(h,[["exit",b,r]]),Yt(a,d,a.length,h),a}function P2(a,r,l){const s=this;let u=s.events.length,d,f;for(;u--;)if((s.events[u][1].type==="labelImage"||s.events[u][1].type==="labelLink")&&!s.events[u][1]._balanced){d=s.events[u][1];break}return h;function h(S){return d?d._inactive?z(S):(f=s.parser.defined.includes(br(s.sliceSerialize({start:d.end,end:s.now()}))),a.enter("labelEnd"),a.enter("labelMarker"),a.consume(S),a.exit("labelMarker"),a.exit("labelEnd"),b):l(S)}function b(S){return S===40?a.attempt(M2,g,f?g:z)(S):S===91?a.attempt(C2,g,f?p:z)(S):f?g(S):z(S)}function p(S){return a.attempt(L2,g,z)(S)}function g(S){return r(S)}function z(S){return d._balanced=!0,l(S)}}function N2(a,r,l){return s;function s(z){return a.enter("resource"),a.enter("resourceMarker"),a.consume(z),a.exit("resourceMarker"),u}function u(z){return it(z)?vl(a,d)(z):d(z)}function d(z){return z===41?g(z):ug(a,f,h,"resourceDestination","resourceDestinationLiteral","resourceDestinationLiteralMarker","resourceDestinationRaw","resourceDestinationString",32)(z)}function f(z){return it(z)?vl(a,b)(z):g(z)}function h(z){return l(z)}function b(z){return z===34||z===39||z===40?fg(a,p,l,"resourceTitle","resourceTitleMarker","resourceTitleString")(z):g(z)}function p(z){return it(z)?vl(a,g)(z):g(z)}function g(z){return z===41?(a.enter("resourceMarker"),a.consume(z),a.exit("resourceMarker"),a.exit("resource"),r):l(z)}}function X2(a,r,l){const s=this;return u;function u(h){return dg.call(s,a,d,f,"reference","referenceMarker","referenceString")(h)}function d(h){return s.parser.defined.includes(br(s.sliceSerialize(s.events[s.events.length-1][1]).slice(1,-1)))?r(h):l(h)}function f(h){return l(h)}}function U2(a,r,l){return s;function s(d){return a.enter("reference"),a.enter("referenceMarker"),a.consume(d),a.exit("referenceMarker"),u}function u(d){return d===93?(a.enter("referenceMarker"),a.consume(d),a.exit("referenceMarker"),a.exit("reference"),r):l(d)}}const B2={name:"labelStartImage",resolveAll:bd.resolveAll,tokenize:Z2};function Z2(a,r,l){const s=this;return u;function u(h){return a.enter("labelImage"),a.enter("labelImageMarker"),a.consume(h),a.exit("labelImageMarker"),d}function d(h){return h===91?(a.enter("labelMarker"),a.consume(h),a.exit("labelMarker"),a.exit("labelImage"),f):l(h)}function f(h){return h===94&&"_hiddenFootnoteSupport"in s.parser.constructs?l(h):r(h)}}const j2={name:"labelStartLink",resolveAll:bd.resolveAll,tokenize:V2};function V2(a,r,l){const s=this;return u;function u(f){return a.enter("labelLink"),a.enter("labelMarker"),a.consume(f),a.exit("labelMarker"),a.exit("labelLink"),d}function d(f){return f===94&&"_hiddenFootnoteSupport"in s.parser.constructs?l(f):r(f)}}const Ru={name:"lineEnding",tokenize:H2};function H2(a,r){return l;function l(s){return a.enter("lineEnding"),a.consume(s),a.exit("lineEnding"),un(a,r,"linePrefix")}}const Gs={name:"thematicBreak",tokenize:q2};function q2(a,r,l){let s=0,u;return d;function d(p){return a.enter("thematicBreak"),f(p)}function f(p){return u=p,h(p)}function h(p){return p===u?(a.enter("thematicBreakSequence"),b(p)):s>=3&&(p===null||ke(p))?(a.exit("thematicBreak"),r(p)):l(p)}function b(p){return p===u?(a.consume(p),s++,b):(a.exit("thematicBreakSequence"),Fe(p)?un(a,h,"whitespace")(p):h(p))}}const tt={continuation:{tokenize:Q2},exit:J2,name:"list",tokenize:F2},G2={partial:!0,tokenize:$2},Y2={partial:!0,tokenize:K2};function F2(a,r,l){const s=this,u=s.events[s.events.length-1];let d=u&&u[1].type==="linePrefix"?u[2].sliceSerialize(u[1],!0).length:0,f=0;return h;function h(v){const L=s.containerState.type||(v===42||v===43||v===45?"listUnordered":"listOrdered");if(L==="listUnordered"?!s.containerState.marker||v===s.containerState.marker:Fu(v)){if(s.containerState.type||(s.containerState.type=L,a.enter(L,{_container:!0})),L==="listUnordered")return a.enter("listItemPrefix"),v===42||v===45?a.check(Gs,l,p)(v):p(v);if(!s.interrupt||v===49)return a.enter("listItemPrefix"),a.enter("listItemValue"),b(v)}return l(v)}function b(v){return Fu(v)&&++f<10?(a.consume(v),b):(!s.interrupt||f<2)&&(s.containerState.marker?v===s.containerState.marker:v===41||v===46)?(a.exit("listItemValue"),p(v)):l(v)}function p(v){return a.enter("listItemMarker"),a.consume(v),a.exit("listItemMarker"),s.containerState.marker=s.containerState.marker||v,a.check(ao,s.interrupt?l:g,a.attempt(G2,S,z))}function g(v){return s.containerState.initialBlankLine=!0,d++,S(v)}function z(v){return Fe(v)?(a.enter("listItemPrefixWhitespace"),a.consume(v),a.exit("listItemPrefixWhitespace"),S):l(v)}function S(v){return s.containerState.size=d+s.sliceSerialize(a.exit("listItemPrefix"),!0).length,r(v)}}function Q2(a,r,l){const s=this;return s.containerState._closeFlow=void 0,a.check(ao,u,d);function u(h){return s.containerState.furtherBlankLines=s.containerState.furtherBlankLines||s.containerState.initialBlankLine,un(a,r,"listItemIndent",s.containerState.size+1)(h)}function d(h){return s.containerState.furtherBlankLines||!Fe(h)?(s.containerState.furtherBlankLines=void 0,s.containerState.initialBlankLine=void 0,f(h)):(s.containerState.furtherBlankLines=void 0,s.containerState.initialBlankLine=void 0,a.attempt(Y2,r,f)(h))}function f(h){return s.containerState._closeFlow=!0,s.interrupt=void 0,un(a,a.attempt(tt,r,l),"linePrefix",s.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(h)}}function K2(a,r,l){const s=this;return un(a,u,"listItemIndent",s.containerState.size+1);function u(d){const f=s.events[s.events.length-1];return f&&f[1].type==="listItemIndent"&&f[2].sliceSerialize(f[1],!0).length===s.containerState.size?r(d):l(d)}}function J2(a){a.exit(this.containerState.type)}function $2(a,r,l){const s=this;return un(a,u,"listItemPrefixWhitespace",s.parser.constructs.disable.null.includes("codeIndented")?void 0:5);function u(d){const f=s.events[s.events.length-1];return!Fe(d)&&f&&f[1].type==="listItemPrefixWhitespace"?r(d):l(d)}}const ib={name:"setextUnderline",resolveTo:eS,tokenize:nS};function eS(a,r){let l=a.length,s,u,d;for(;l--;)if(a[l][0]==="enter"){if(a[l][1].type==="content"){s=l;break}a[l][1].type==="paragraph"&&(u=l)}else a[l][1].type==="content"&&a.splice(l,1),!d&&a[l][1].type==="definition"&&(d=l);const f={type:"setextHeading",start:{...a[s][1].start},end:{...a[a.length-1][1].end}};return a[u][1].type="setextHeadingText",d?(a.splice(u,0,["enter",f,r]),a.splice(d+1,0,["exit",a[s][1],r]),a[s][1].end={...a[d][1].end}):a[s][1]=f,a.push(["exit",f,r]),a}function nS(a,r,l){const s=this;let u;return d;function d(p){let g=s.events.length,z;for(;g--;)if(s.events[g][1].type!=="lineEnding"&&s.events[g][1].type!=="linePrefix"&&s.events[g][1].type!=="content"){z=s.events[g][1].type==="paragraph";break}return!s.parser.lazy[s.now().line]&&(s.interrupt||z)?(a.enter("setextHeadingLine"),u=p,f(p)):l(p)}function f(p){return a.enter("setextHeadingLineSequence"),h(p)}function h(p){return p===u?(a.consume(p),h):(a.exit("setextHeadingLineSequence"),Fe(p)?un(a,b,"lineSuffix")(p):b(p))}function b(p){return p===null||ke(p)?(a.exit("setextHeadingLine"),r(p)):l(p)}}const tS={tokenize:aS};function aS(a){const r=this,l=a.attempt(ao,s,a.attempt(this.parser.constructs.flowInitial,u,un(a,a.attempt(this.parser.constructs.flow,u,a.attempt(o2,u)),"linePrefix")));return l;function s(d){if(d===null){a.consume(d);return}return a.enter("lineEndingBlank"),a.consume(d),a.exit("lineEndingBlank"),r.currentConstruct=void 0,l}function u(d){if(d===null){a.consume(d);return}return a.enter("lineEnding"),a.consume(d),a.exit("lineEnding"),r.currentConstruct=void 0,l}}const iS={resolveAll:hg()},rS=pg("string"),lS=pg("text");function pg(a){return{resolveAll:hg(a==="text"?sS:void 0),tokenize:r};function r(l){const s=this,u=this.parser.constructs[a],d=l.attempt(u,f,h);return f;function f(g){return p(g)?d(g):h(g)}function h(g){if(g===null){l.consume(g);return}return l.enter("data"),l.consume(g),b}function b(g){return p(g)?(l.exit("data"),d(g)):(l.consume(g),b)}function p(g){if(g===null)return!0;const z=u[g];let S=-1;if(z)for(;++S<z.length;){const v=z[S];if(!v.previous||v.previous.call(s,s.previous))return!0}return!1}}}function hg(a){return r;function r(l,s){let u=-1,d;for(;++u<=l.length;)d===void 0?l[u]&&l[u][1].type==="data"&&(d=u,u++):(!l[u]||l[u][1].type!=="data")&&(u!==d+2&&(l[d][1].end=l[u-1][1].end,l.splice(d+2,u-d-2),u=d+2),d=void 0);return a?a(l,s):l}}function sS(a,r){let l=0;for(;++l<=a.length;)if((l===a.length||a[l][1].type==="lineEnding")&&a[l-1][1].type==="data"){const s=a[l-1][1],u=r.sliceStream(s);let d=u.length,f=-1,h=0,b;for(;d--;){const p=u[d];if(typeof p=="string"){for(f=p.length;p.charCodeAt(f-1)===32;)h++,f--;if(f)break;f=-1}else if(p===-2)b=!0,h++;else if(p!==-1){d++;break}}if(r._contentTypeTextTrailing&&l===a.length&&(h=0),h){const p={type:l===a.length||b||h<2?"lineSuffix":"hardBreakTrailing",start:{_bufferIndex:d?f:s.start._bufferIndex+f,_index:s.start._index+d,line:s.end.line,column:s.end.column-h,offset:s.end.offset-h},end:{...s.end}};s.end={...p.start},s.start.offset===s.end.offset?Object.assign(s,p):(a.splice(l,0,["enter",p,r],["exit",p,r]),l+=2)}l++}return a}const oS={42:tt,43:tt,45:tt,48:tt,49:tt,50:tt,51:tt,52:tt,53:tt,54:tt,55:tt,56:tt,57:tt,62:lg},cS={91:p2},uS={[-2]:ku,[-1]:ku,32:ku},dS={35:y2,42:Gs,45:[ib,Gs],60:D2,61:ib,95:Gs,96:tb,126:tb},fS={38:og,92:sg},pS={[-5]:Ru,[-4]:Ru,[-3]:Ru,33:B2,38:og,42:Qu,60:[jv,_2],91:j2,92:[g2,sg],93:bd,95:Qu,96:t2},hS={null:[Qu,iS]},mS={null:[42,95]},bS={null:[]},gS=Object.freeze(Object.defineProperty({__proto__:null,attentionMarkers:mS,contentInitial:cS,disable:bS,document:oS,flow:dS,flowInitial:uS,insideSpan:hS,string:fS,text:pS},Symbol.toStringTag,{value:"Module"}));function zS(a,r,l){let s={_bufferIndex:-1,_index:0,line:l&&l.line||1,column:l&&l.column||1,offset:l&&l.offset||0};const u={},d=[];let f=[],h=[];const b={attempt:k(ye),check:k(Z),consume:Y,enter:q,exit:de,interrupt:k(Z,{interrupt:!0})},p={code:null,containerState:{},defineSkip:O,events:[],now:L,parser:a,previous:null,sliceSerialize:S,sliceStream:v,write:z};let g=r.tokenize.call(p,b);return r.resolveAll&&d.push(r),p;function z(ie){return f=_t(f,ie),j(),f[f.length-1]!==null?[]:(te(r,0),p.events=md(d,p.events,p),p.events)}function S(ie,ne){return vS(v(ie),ne)}function v(ie){return yS(f,ie)}function L(){const{_bufferIndex:ie,_index:ne,line:Te,column:fe,offset:$}=s;return{_bufferIndex:ie,_index:ne,line:Te,column:fe,offset:$}}function O(ie){u[ie.line]=ie.column,ue()}function j(){let ie;for(;s._index<f.length;){const ne=f[s._index];if(typeof ne=="string")for(ie=s._index,s._bufferIndex<0&&(s._bufferIndex=0);s._index===ie&&s._bufferIndex<ne.length;)X(ne.charCodeAt(s._bufferIndex));else X(ne)}}function X(ie){g=g(ie)}function Y(ie){ke(ie)?(s.line++,s.column=1,s.offset+=ie===-3?2:1,ue()):ie!==-1&&(s.column++,s.offset++),s._bufferIndex<0?s._index++:(s._bufferIndex++,s._bufferIndex===f[s._index].length&&(s._bufferIndex=-1,s._index++)),p.previous=ie}function q(ie,ne){const Te=ne||{};return Te.type=ie,Te.start=L(),p.events.push(["enter",Te,p]),h.push(Te),Te}function de(ie){const ne=h.pop();return ne.end=L(),p.events.push(["exit",ne,p]),ne}function ye(ie,ne){te(ie,ne.from)}function Z(ie,ne){ne.restore()}function k(ie,ne){return Te;function Te(fe,$,C){let K,le,Me,D;return Array.isArray(fe)?U(fe):"tokenize"in fe?U([fe]):x(fe);function x(ge){return _e;function _e(Je){const Qe=Je!==null&&ge[Je],qn=Je!==null&&ge.null,It=[...Array.isArray(Qe)?Qe:Qe?[Qe]:[],...Array.isArray(qn)?qn:qn?[qn]:[]];return U(It)(Je)}}function U(ge){return K=ge,le=0,ge.length===0?C:E(ge[le])}function E(ge){return _e;function _e(Je){return D=he(),Me=ge,ge.partial||(p.currentConstruct=ge),ge.name&&p.parser.constructs.disable.null.includes(ge.name)?ze():ge.tokenize.call(ne?Object.assign(Object.create(p),ne):p,b,re,ze)(Je)}}function re(ge){return ie(Me,D),$}function ze(ge){return D.restore(),++le<K.length?E(K[le]):C}}}function te(ie,ne){ie.resolveAll&&!d.includes(ie)&&d.push(ie),ie.resolve&&Yt(p.events,ne,p.events.length-ne,ie.resolve(p.events.slice(ne),p)),ie.resolveTo&&(p.events=ie.resolveTo(p.events,p))}function he(){const ie=L(),ne=p.previous,Te=p.currentConstruct,fe=p.events.length,$=Array.from(h);return{from:fe,restore:C};function C(){s=ie,p.previous=ne,p.currentConstruct=Te,p.events.length=fe,h=$,ue()}}function ue(){s.line in u&&s.column<2&&(s.column=u[s.line],s.offset+=u[s.line]-1)}}function yS(a,r){const l=r.start._index,s=r.start._bufferIndex,u=r.end._index,d=r.end._bufferIndex;let f;if(l===u)f=[a[l].slice(s,d)];else{if(f=a.slice(l,u),s>-1){const h=f[0];typeof h=="string"?f[0]=h.slice(s):f.shift()}d>0&&f.push(a[u].slice(0,d))}return f}function vS(a,r){let l=-1;const s=[];let u;for(;++l<a.length;){const d=a[l];let f;if(typeof d=="string")f=d;else switch(d){case-5:{f="\r";break}case-4:{f=`
`;break}case-3:{f=`\r
`;break}case-2:{f=r?" ":"	";break}case-1:{if(!r&&u)continue;f=" ";break}default:f=String.fromCharCode(d)}u=d===-2,s.push(f)}return s.join("")}function SS(a){const s={constructs:kv([gS,...(a||{}).extensions||[]]),content:u(Ov),defined:[],document:u(Nv),flow:u(tS),lazy:{},string:u(rS),text:u(lS)};return s;function u(d){return f;function f(h){return zS(s,d,h)}}}function ES(a){for(;!cg(a););return a}const rb=/[\0\t\n\r]/g;function DS(){let a=1,r="",l=!0,s;return u;function u(d,f,h){const b=[];let p,g,z,S,v;for(d=r+(typeof d=="string"?d.toString():new TextDecoder(f||void 0).decode(d)),z=0,r="",l&&(d.charCodeAt(0)===65279&&z++,l=void 0);z<d.length;){if(rb.lastIndex=z,p=rb.exec(d),S=p&&p.index!==void 0?p.index:d.length,v=d.charCodeAt(S),!p){r=d.slice(z);break}if(v===10&&z===S&&s)b.push(-3),s=void 0;else switch(s&&(b.push(-5),s=void 0),z<S&&(b.push(d.slice(z,S)),a+=S-z),v){case 0:{b.push(65533),a++;break}case 9:{for(g=Math.ceil(a/4)*4,b.push(-2);a++<g;)b.push(-1);break}case 10:{b.push(-4),a=1;break}default:s=!0,a=1}z=S+1}return h&&(s&&b.push(-5),r&&b.push(r),b.push(null)),b}}const wS=/\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;function xS(a){return a.replace(wS,TS)}function TS(a,r,l){if(r)return r;if(l.charCodeAt(0)===35){const u=l.charCodeAt(1),d=u===120||u===88;return rg(l.slice(d?2:1),d?16:10)}return hd(l)||a}const mg={}.hasOwnProperty;function AS(a,r,l){return typeof r!="string"&&(l=r,r=void 0),kS(l)(ES(SS(l).document().write(DS()(a,r,!0))))}function kS(a){const r={transforms:[],canContainEols:["emphasis","fragment","heading","paragraph","strong"],enter:{autolink:d(Ft),autolinkProtocol:he,autolinkEmail:he,atxHeading:d(ya),blockQuote:d(qn),characterEscape:he,characterReference:he,codeFenced:d(It),codeFencedFenceInfo:f,codeFencedFenceMeta:f,codeIndented:d(It,f),codeText:d(Dn,f),codeTextData:he,data:he,codeFlowValue:he,definition:d(Mt),definitionDestinationString:f,definitionLabelString:f,definitionTitleString:f,emphasis:d(gt),hardBreakEscape:d(Gn),hardBreakTrailing:d(Gn),htmlFlow:d(_i,f),htmlFlowData:he,htmlText:d(_i,f),htmlTextData:he,image:d(Ii),label:f,link:d(Ft),listItem:d(ni),listItemValue:S,listOrdered:d(va,z),listUnordered:d(va),paragraph:d(vr),reference:E,referenceString:f,resourceDestinationString:f,resourceTitleString:f,setextHeading:d(ya),strong:d(Sr),thematicBreak:d(Qt)},exit:{atxHeading:b(),atxHeadingSequence:ye,autolink:b(),autolinkEmail:Qe,autolinkProtocol:Je,blockQuote:b(),characterEscapeValue:ue,characterReferenceMarkerHexadecimal:ze,characterReferenceMarkerNumeric:ze,characterReferenceValue:ge,characterReference:_e,codeFenced:b(j),codeFencedFence:O,codeFencedFenceInfo:v,codeFencedFenceMeta:L,codeFlowValue:ue,codeIndented:b(X),codeText:b($),codeTextData:ue,data:ue,definition:b(),definitionDestinationString:de,definitionLabelString:Y,definitionTitleString:q,emphasis:b(),hardBreakEscape:b(ne),hardBreakTrailing:b(ne),htmlFlow:b(Te),htmlFlowData:ue,htmlText:b(fe),htmlTextData:ue,image:b(K),label:Me,labelText:le,lineEnding:ie,link:b(C),listItem:b(),listOrdered:b(),listUnordered:b(),paragraph:b(),referenceString:re,resourceDestinationString:D,resourceTitleString:x,resource:U,setextHeading:b(te),setextHeadingLineSequence:k,setextHeadingText:Z,strong:b(),thematicBreak:b()}};bg(r,(a||{}).mdastExtensions||[]);const l={};return s;function s(V){let ae={type:"root",children:[]};const Se={stack:[ae],tokenStack:[],config:r,enter:h,exit:p,buffer:f,resume:g,data:l},Ae=[];let He=-1;for(;++He<V.length;)if(V[He][1].type==="listOrdered"||V[He][1].type==="listUnordered")if(V[He][0]==="enter")Ae.push(He);else{const Ln=Ae.pop();He=u(V,Ln,He)}for(He=-1;++He<V.length;){const Ln=r[V[He][0]];mg.call(Ln,V[He][1].type)&&Ln[V[He][1].type].call(Object.assign({sliceSerialize:V[He][2].sliceSerialize},Se),V[He][1])}if(Se.tokenStack.length>0){const Ln=Se.tokenStack[Se.tokenStack.length-1];(Ln[1]||lb).call(Se,void 0,Ln[0])}for(ae.position={start:Ya(V.length>0?V[0][1].start:{line:1,column:1,offset:0}),end:Ya(V.length>0?V[V.length-2][1].end:{line:1,column:1,offset:0})},He=-1;++He<r.transforms.length;)ae=r.transforms[He](ae)||ae;return ae}function u(V,ae,Se){let Ae=ae-1,He=-1,Ln=!1,Ct,mn,yn,On;for(;++Ae<=Se;){const Ke=V[Ae];switch(Ke[1].type){case"listUnordered":case"listOrdered":case"blockQuote":{Ke[0]==="enter"?He++:He--,On=void 0;break}case"lineEndingBlank":{Ke[0]==="enter"&&(Ct&&!On&&!He&&!yn&&(yn=Ae),On=void 0);break}case"linePrefix":case"listItemValue":case"listItemMarker":case"listItemPrefix":case"listItemPrefixWhitespace":break;default:On=void 0}if(!He&&Ke[0]==="enter"&&Ke[1].type==="listItemPrefix"||He===-1&&Ke[0]==="exit"&&(Ke[1].type==="listUnordered"||Ke[1].type==="listOrdered")){if(Ct){let Ut=Ae;for(mn=void 0;Ut--;){const Yn=V[Ut];if(Yn[1].type==="lineEnding"||Yn[1].type==="lineEndingBlank"){if(Yn[0]==="exit")continue;mn&&(V[mn][1].type="lineEndingBlank",Ln=!0),Yn[1].type="lineEnding",mn=Ut}else if(!(Yn[1].type==="linePrefix"||Yn[1].type==="blockQuotePrefix"||Yn[1].type==="blockQuotePrefixWhitespace"||Yn[1].type==="blockQuoteMarker"||Yn[1].type==="listItemIndent"))break}yn&&(!mn||yn<mn)&&(Ct._spread=!0),Ct.end=Object.assign({},mn?V[mn][1].start:Ke[1].end),V.splice(mn||Ae,0,["exit",Ct,Ke[2]]),Ae++,Se++}if(Ke[1].type==="listItemPrefix"){const Ut={type:"listItem",_spread:!1,start:Object.assign({},Ke[1].start),end:void 0};Ct=Ut,V.splice(Ae,0,["enter",Ut,Ke[2]]),Ae++,Se++,yn=void 0,On=!0}}}return V[ae][1]._spread=Ln,Se}function d(V,ae){return Se;function Se(Ae){h.call(this,V(Ae),Ae),ae&&ae.call(this,Ae)}}function f(){this.stack.push({type:"fragment",children:[]})}function h(V,ae,Se){this.stack[this.stack.length-1].children.push(V),this.stack.push(V),this.tokenStack.push([ae,Se||void 0]),V.position={start:Ya(ae.start),end:void 0}}function b(V){return ae;function ae(Se){V&&V.call(this,Se),p.call(this,Se)}}function p(V,ae){const Se=this.stack.pop(),Ae=this.tokenStack.pop();if(Ae)Ae[0].type!==V.type&&(ae?ae.call(this,V,Ae[0]):(Ae[1]||lb).call(this,V,Ae[0]));else throw new Error("Cannot close `"+V.type+"` ("+yl({start:V.start,end:V.end})+"): it’s not open");Se.position.end=Ya(V.end)}function g(){return Tv(this.stack.pop())}function z(){this.data.expectingFirstListItemValue=!0}function S(V){if(this.data.expectingFirstListItemValue){const ae=this.stack[this.stack.length-2];ae.start=Number.parseInt(this.sliceSerialize(V),10),this.data.expectingFirstListItemValue=void 0}}function v(){const V=this.resume(),ae=this.stack[this.stack.length-1];ae.lang=V}function L(){const V=this.resume(),ae=this.stack[this.stack.length-1];ae.meta=V}function O(){this.data.flowCodeInside||(this.buffer(),this.data.flowCodeInside=!0)}function j(){const V=this.resume(),ae=this.stack[this.stack.length-1];ae.value=V.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g,""),this.data.flowCodeInside=void 0}function X(){const V=this.resume(),ae=this.stack[this.stack.length-1];ae.value=V.replace(/(\r?\n|\r)$/g,"")}function Y(V){const ae=this.resume(),Se=this.stack[this.stack.length-1];Se.label=ae,Se.identifier=br(this.sliceSerialize(V)).toLowerCase()}function q(){const V=this.resume(),ae=this.stack[this.stack.length-1];ae.title=V}function de(){const V=this.resume(),ae=this.stack[this.stack.length-1];ae.url=V}function ye(V){const ae=this.stack[this.stack.length-1];if(!ae.depth){const Se=this.sliceSerialize(V).length;ae.depth=Se}}function Z(){this.data.setextHeadingSlurpLineEnding=!0}function k(V){const ae=this.stack[this.stack.length-1];ae.depth=this.sliceSerialize(V).codePointAt(0)===61?1:2}function te(){this.data.setextHeadingSlurpLineEnding=void 0}function he(V){const Se=this.stack[this.stack.length-1].children;let Ae=Se[Se.length-1];(!Ae||Ae.type!=="text")&&(Ae=zn(),Ae.position={start:Ya(V.start),end:void 0},Se.push(Ae)),this.stack.push(Ae)}function ue(V){const ae=this.stack.pop();ae.value+=this.sliceSerialize(V),ae.position.end=Ya(V.end)}function ie(V){const ae=this.stack[this.stack.length-1];if(this.data.atHardBreak){const Se=ae.children[ae.children.length-1];Se.position.end=Ya(V.end),this.data.atHardBreak=void 0;return}!this.data.setextHeadingSlurpLineEnding&&r.canContainEols.includes(ae.type)&&(he.call(this,V),ue.call(this,V))}function ne(){this.data.atHardBreak=!0}function Te(){const V=this.resume(),ae=this.stack[this.stack.length-1];ae.value=V}function fe(){const V=this.resume(),ae=this.stack[this.stack.length-1];ae.value=V}function $(){const V=this.resume(),ae=this.stack[this.stack.length-1];ae.value=V}function C(){const V=this.stack[this.stack.length-1];if(this.data.inReference){const ae=this.data.referenceType||"shortcut";V.type+="Reference",V.referenceType=ae,delete V.url,delete V.title}else delete V.identifier,delete V.label;this.data.referenceType=void 0}function K(){const V=this.stack[this.stack.length-1];if(this.data.inReference){const ae=this.data.referenceType||"shortcut";V.type+="Reference",V.referenceType=ae,delete V.url,delete V.title}else delete V.identifier,delete V.label;this.data.referenceType=void 0}function le(V){const ae=this.sliceSerialize(V),Se=this.stack[this.stack.length-2];Se.label=xS(ae),Se.identifier=br(ae).toLowerCase()}function Me(){const V=this.stack[this.stack.length-1],ae=this.resume(),Se=this.stack[this.stack.length-1];if(this.data.inReference=!0,Se.type==="link"){const Ae=V.children;Se.children=Ae}else Se.alt=ae}function D(){const V=this.resume(),ae=this.stack[this.stack.length-1];ae.url=V}function x(){const V=this.resume(),ae=this.stack[this.stack.length-1];ae.title=V}function U(){this.data.inReference=void 0}function E(){this.data.referenceType="collapsed"}function re(V){const ae=this.resume(),Se=this.stack[this.stack.length-1];Se.label=ae,Se.identifier=br(this.sliceSerialize(V)).toLowerCase(),this.data.referenceType="full"}function ze(V){this.data.characterReferenceType=V.type}function ge(V){const ae=this.sliceSerialize(V),Se=this.data.characterReferenceType;let Ae;Se?(Ae=rg(ae,Se==="characterReferenceMarkerNumeric"?10:16),this.data.characterReferenceType=void 0):Ae=hd(ae);const He=this.stack[this.stack.length-1];He.value+=Ae}function _e(V){const ae=this.stack.pop();ae.position.end=Ya(V.end)}function Je(V){ue.call(this,V);const ae=this.stack[this.stack.length-1];ae.url=this.sliceSerialize(V)}function Qe(V){ue.call(this,V);const ae=this.stack[this.stack.length-1];ae.url="mailto:"+this.sliceSerialize(V)}function qn(){return{type:"blockquote",children:[]}}function It(){return{type:"code",lang:null,meta:null,value:""}}function Dn(){return{type:"inlineCode",value:""}}function Mt(){return{type:"definition",identifier:"",label:null,title:null,url:""}}function gt(){return{type:"emphasis",children:[]}}function ya(){return{type:"heading",depth:0,children:[]}}function Gn(){return{type:"break"}}function _i(){return{type:"html",value:""}}function Ii(){return{type:"image",title:null,url:"",alt:null}}function Ft(){return{type:"link",title:null,url:"",children:[]}}function va(V){return{type:"list",ordered:V.type==="listOrdered",start:null,spread:V._spread,children:[]}}function ni(V){return{type:"listItem",spread:V._spread,checked:null,children:[]}}function vr(){return{type:"paragraph",children:[]}}function Sr(){return{type:"strong",children:[]}}function zn(){return{type:"text",value:""}}function Qt(){return{type:"thematicBreak"}}}function Ya(a){return{line:a.line,column:a.column,offset:a.offset}}function bg(a,r){let l=-1;for(;++l<r.length;){const s=r[l];Array.isArray(s)?bg(a,s):RS(a,s)}}function RS(a,r){let l;for(l in r)if(mg.call(r,l))switch(l){case"canContainEols":{const s=r[l];s&&a[l].push(...s);break}case"transforms":{const s=r[l];s&&a[l].push(...s);break}case"enter":case"exit":{const s=r[l];s&&Object.assign(a[l],s);break}}}function lb(a,r){throw a?new Error("Cannot close `"+a.type+"` ("+yl({start:a.start,end:a.end})+"): a different token (`"+r.type+"`, "+yl({start:r.start,end:r.end})+") is open"):new Error("Cannot close document, a token (`"+r.type+"`, "+yl({start:r.start,end:r.end})+") is still open")}function _S(a){const r=this;r.parser=l;function l(s){return AS(s,{...r.data("settings"),...a,extensions:r.data("micromarkExtensions")||[],mdastExtensions:r.data("fromMarkdownExtensions")||[]})}}function IS(a,r){const l={type:"element",tagName:"blockquote",properties:{},children:a.wrap(a.all(r),!0)};return a.patch(r,l),a.applyData(r,l)}function MS(a,r){const l={type:"element",tagName:"br",properties:{},children:[]};return a.patch(r,l),[a.applyData(r,l),{type:"text",value:`
`}]}function CS(a,r){const l=r.value?r.value+`
`:"",s={},u=r.lang?r.lang.split(/\s+/):[];u.length>0&&(s.className=["language-"+u[0]]);let d={type:"element",tagName:"code",properties:s,children:[{type:"text",value:l}]};return r.meta&&(d.data={meta:r.meta}),a.patch(r,d),d=a.applyData(r,d),d={type:"element",tagName:"pre",properties:{},children:[d]},a.patch(r,d),d}function LS(a,r){const l={type:"element",tagName:"del",properties:{},children:a.all(r)};return a.patch(r,l),a.applyData(r,l)}function WS(a,r){const l={type:"element",tagName:"em",properties:{},children:a.all(r)};return a.patch(r,l),a.applyData(r,l)}function OS(a,r){const l=typeof a.options.clobberPrefix=="string"?a.options.clobberPrefix:"user-content-",s=String(r.identifier).toUpperCase(),u=yr(s.toLowerCase()),d=a.footnoteOrder.indexOf(s);let f,h=a.footnoteCounts.get(s);h===void 0?(h=0,a.footnoteOrder.push(s),f=a.footnoteOrder.length):f=d+1,h+=1,a.footnoteCounts.set(s,h);const b={type:"element",tagName:"a",properties:{href:"#"+l+"fn-"+u,id:l+"fnref-"+u+(h>1?"-"+h:""),dataFootnoteRef:!0,ariaDescribedBy:["footnote-label"]},children:[{type:"text",value:String(f)}]};a.patch(r,b);const p={type:"element",tagName:"sup",properties:{},children:[b]};return a.patch(r,p),a.applyData(r,p)}function PS(a,r){const l={type:"element",tagName:"h"+r.depth,properties:{},children:a.all(r)};return a.patch(r,l),a.applyData(r,l)}function NS(a,r){if(a.options.allowDangerousHtml){const l={type:"raw",value:r.value};return a.patch(r,l),a.applyData(r,l)}}function gg(a,r){const l=r.referenceType;let s="]";if(l==="collapsed"?s+="[]":l==="full"&&(s+="["+(r.label||r.identifier)+"]"),r.type==="imageReference")return[{type:"text",value:"!["+r.alt+s}];const u=a.all(r),d=u[0];d&&d.type==="text"?d.value="["+d.value:u.unshift({type:"text",value:"["});const f=u[u.length-1];return f&&f.type==="text"?f.value+=s:u.push({type:"text",value:s}),u}function XS(a,r){const l=String(r.identifier).toUpperCase(),s=a.definitionById.get(l);if(!s)return gg(a,r);const u={src:yr(s.url||""),alt:r.alt};s.title!==null&&s.title!==void 0&&(u.title=s.title);const d={type:"element",tagName:"img",properties:u,children:[]};return a.patch(r,d),a.applyData(r,d)}function US(a,r){const l={src:yr(r.url)};r.alt!==null&&r.alt!==void 0&&(l.alt=r.alt),r.title!==null&&r.title!==void 0&&(l.title=r.title);const s={type:"element",tagName:"img",properties:l,children:[]};return a.patch(r,s),a.applyData(r,s)}function BS(a,r){const l={type:"text",value:r.value.replace(/\r?\n|\r/g," ")};a.patch(r,l);const s={type:"element",tagName:"code",properties:{},children:[l]};return a.patch(r,s),a.applyData(r,s)}function ZS(a,r){const l=String(r.identifier).toUpperCase(),s=a.definitionById.get(l);if(!s)return gg(a,r);const u={href:yr(s.url||"")};s.title!==null&&s.title!==void 0&&(u.title=s.title);const d={type:"element",tagName:"a",properties:u,children:a.all(r)};return a.patch(r,d),a.applyData(r,d)}function jS(a,r){const l={href:yr(r.url)};r.title!==null&&r.title!==void 0&&(l.title=r.title);const s={type:"element",tagName:"a",properties:l,children:a.all(r)};return a.patch(r,s),a.applyData(r,s)}function VS(a,r,l){const s=a.all(r),u=l?HS(l):zg(r),d={},f=[];if(typeof r.checked=="boolean"){const g=s[0];let z;g&&g.type==="element"&&g.tagName==="p"?z=g:(z={type:"element",tagName:"p",properties:{},children:[]},s.unshift(z)),z.children.length>0&&z.children.unshift({type:"text",value:" "}),z.children.unshift({type:"element",tagName:"input",properties:{type:"checkbox",checked:r.checked,disabled:!0},children:[]}),d.className=["task-list-item"]}let h=-1;for(;++h<s.length;){const g=s[h];(u||h!==0||g.type!=="element"||g.tagName!=="p")&&f.push({type:"text",value:`
`}),g.type==="element"&&g.tagName==="p"&&!u?f.push(...g.children):f.push(g)}const b=s[s.length-1];b&&(u||b.type!=="element"||b.tagName!=="p")&&f.push({type:"text",value:`
`});const p={type:"element",tagName:"li",properties:d,children:f};return a.patch(r,p),a.applyData(r,p)}function HS(a){let r=!1;if(a.type==="list"){r=a.spread||!1;const l=a.children;let s=-1;for(;!r&&++s<l.length;)r=zg(l[s])}return r}function zg(a){const r=a.spread;return r??a.children.length>1}function qS(a,r){const l={},s=a.all(r);let u=-1;for(typeof r.start=="number"&&r.start!==1&&(l.start=r.start);++u<s.length;){const f=s[u];if(f.type==="element"&&f.tagName==="li"&&f.properties&&Array.isArray(f.properties.className)&&f.properties.className.includes("task-list-item")){l.className=["contains-task-list"];break}}const d={type:"element",tagName:r.ordered?"ol":"ul",properties:l,children:a.wrap(s,!0)};return a.patch(r,d),a.applyData(r,d)}function GS(a,r){const l={type:"element",tagName:"p",properties:{},children:a.all(r)};return a.patch(r,l),a.applyData(r,l)}function YS(a,r){const l={type:"root",children:a.wrap(a.all(r))};return a.patch(r,l),a.applyData(r,l)}function FS(a,r){const l={type:"element",tagName:"strong",properties:{},children:a.all(r)};return a.patch(r,l),a.applyData(r,l)}function QS(a,r){const l=a.all(r),s=l.shift(),u=[];if(s){const f={type:"element",tagName:"thead",properties:{},children:a.wrap([s],!0)};a.patch(r.children[0],f),u.push(f)}if(l.length>0){const f={type:"element",tagName:"tbody",properties:{},children:a.wrap(l,!0)},h=ud(r.children[1]),b=Jb(r.children[r.children.length-1]);h&&b&&(f.position={start:h,end:b}),u.push(f)}const d={type:"element",tagName:"table",properties:{},children:a.wrap(u,!0)};return a.patch(r,d),a.applyData(r,d)}function KS(a,r,l){const s=l?l.children:void 0,d=(s?s.indexOf(r):1)===0?"th":"td",f=l&&l.type==="table"?l.align:void 0,h=f?f.length:r.children.length;let b=-1;const p=[];for(;++b<h;){const z=r.children[b],S={},v=f?f[b]:void 0;v&&(S.align=v);let L={type:"element",tagName:d,properties:S,children:[]};z&&(L.children=a.all(z),a.patch(z,L),L=a.applyData(z,L)),p.push(L)}const g={type:"element",tagName:"tr",properties:{},children:a.wrap(p,!0)};return a.patch(r,g),a.applyData(r,g)}function JS(a,r){const l={type:"element",tagName:"td",properties:{},children:a.all(r)};return a.patch(r,l),a.applyData(r,l)}const sb=9,ob=32;function $S(a){const r=String(a),l=/\r?\n|\r/g;let s=l.exec(r),u=0;const d=[];for(;s;)d.push(cb(r.slice(u,s.index),u>0,!0),s[0]),u=s.index+s[0].length,s=l.exec(r);return d.push(cb(r.slice(u),u>0,!1)),d.join("")}function cb(a,r,l){let s=0,u=a.length;if(r){let d=a.codePointAt(s);for(;d===sb||d===ob;)s++,d=a.codePointAt(s)}if(l){let d=a.codePointAt(u-1);for(;d===sb||d===ob;)u--,d=a.codePointAt(u-1)}return u>s?a.slice(s,u):""}function e9(a,r){const l={type:"text",value:$S(String(r.value))};return a.patch(r,l),a.applyData(r,l)}function n9(a,r){const l={type:"element",tagName:"hr",properties:{},children:[]};return a.patch(r,l),a.applyData(r,l)}const t9={blockquote:IS,break:MS,code:CS,delete:LS,emphasis:WS,footnoteReference:OS,heading:PS,html:NS,imageReference:XS,image:US,inlineCode:BS,linkReference:ZS,link:jS,listItem:VS,list:qS,paragraph:GS,root:YS,strong:FS,table:QS,tableCell:JS,tableRow:KS,text:e9,thematicBreak:n9,toml:js,yaml:js,definition:js,footnoteDefinition:js};function js(){}const yg=-1,io=0,Sl=1,Js=2,gd=3,zd=4,yd=5,vd=6,vg=7,Sg=8,ub=typeof self=="object"?self:globalThis,a9=(a,r)=>{const l=(u,d)=>(a.set(d,u),u),s=u=>{if(a.has(u))return a.get(u);const[d,f]=r[u];switch(d){case io:case yg:return l(f,u);case Sl:{const h=l([],u);for(const b of f)h.push(s(b));return h}case Js:{const h=l({},u);for(const[b,p]of f)h[s(b)]=s(p);return h}case gd:return l(new Date(f),u);case zd:{const{source:h,flags:b}=f;return l(new RegExp(h,b),u)}case yd:{const h=l(new Map,u);for(const[b,p]of f)h.set(s(b),s(p));return h}case vd:{const h=l(new Set,u);for(const b of f)h.add(s(b));return h}case vg:{const{name:h,message:b}=f;return l(new ub[h](b),u)}case Sg:return l(BigInt(f),u);case"BigInt":return l(Object(BigInt(f)),u);case"ArrayBuffer":return l(new Uint8Array(f).buffer,f);case"DataView":{const{buffer:h}=new Uint8Array(f);return l(new DataView(h),f)}}return l(new ub[d](f),u)};return s},db=a=>a9(new Map,a)(0),hr="",{toString:i9}={},{keys:r9}=Object,gl=a=>{const r=typeof a;if(r!=="object"||!a)return[io,r];const l=i9.call(a).slice(8,-1);switch(l){case"Array":return[Sl,hr];case"Object":return[Js,hr];case"Date":return[gd,hr];case"RegExp":return[zd,hr];case"Map":return[yd,hr];case"Set":return[vd,hr];case"DataView":return[Sl,l]}return l.includes("Array")?[Sl,l]:l.includes("Error")?[vg,l]:[Js,l]},Vs=([a,r])=>a===io&&(r==="function"||r==="symbol"),l9=(a,r,l,s)=>{const u=(f,h)=>{const b=s.push(f)-1;return l.set(h,b),b},d=f=>{if(l.has(f))return l.get(f);let[h,b]=gl(f);switch(h){case io:{let g=f;switch(b){case"bigint":h=Sg,g=f.toString();break;case"function":case"symbol":if(a)throw new TypeError("unable to serialize "+b);g=null;break;case"undefined":return u([yg],f)}return u([h,g],f)}case Sl:{if(b){let S=f;return b==="DataView"?S=new Uint8Array(f.buffer):b==="ArrayBuffer"&&(S=new Uint8Array(f)),u([b,[...S]],f)}const g=[],z=u([h,g],f);for(const S of f)g.push(d(S));return z}case Js:{if(b)switch(b){case"BigInt":return u([b,f.toString()],f);case"Boolean":case"Number":case"String":return u([b,f.valueOf()],f)}if(r&&"toJSON"in f)return d(f.toJSON());const g=[],z=u([h,g],f);for(const S of r9(f))(a||!Vs(gl(f[S])))&&g.push([d(S),d(f[S])]);return z}case gd:return u([h,f.toISOString()],f);case zd:{const{source:g,flags:z}=f;return u([h,{source:g,flags:z}],f)}case yd:{const g=[],z=u([h,g],f);for(const[S,v]of f)(a||!(Vs(gl(S))||Vs(gl(v))))&&g.push([d(S),d(v)]);return z}case vd:{const g=[],z=u([h,g],f);for(const S of f)(a||!Vs(gl(S)))&&g.push(d(S));return z}}const{message:p}=f;return u([h,{name:b,message:p}],f)};return d},fb=(a,{json:r,lossy:l}={})=>{const s=[];return l9(!(r||l),!!r,new Map,s)(a),s},$s=typeof structuredClone=="function"?(a,r)=>r&&("json"in r||"lossy"in r)?db(fb(a,r)):structuredClone(a):(a,r)=>db(fb(a,r));function s9(a,r){const l=[{type:"text",value:"↩"}];return r>1&&l.push({type:"element",tagName:"sup",properties:{},children:[{type:"text",value:String(r)}]}),l}function o9(a,r){return"Back to reference "+(a+1)+(r>1?"-"+r:"")}function c9(a){const r=typeof a.options.clobberPrefix=="string"?a.options.clobberPrefix:"user-content-",l=a.options.footnoteBackContent||s9,s=a.options.footnoteBackLabel||o9,u=a.options.footnoteLabel||"Footnotes",d=a.options.footnoteLabelTagName||"h2",f=a.options.footnoteLabelProperties||{className:["sr-only"]},h=[];let b=-1;for(;++b<a.footnoteOrder.length;){const p=a.footnoteById.get(a.footnoteOrder[b]);if(!p)continue;const g=a.all(p),z=String(p.identifier).toUpperCase(),S=yr(z.toLowerCase());let v=0;const L=[],O=a.footnoteCounts.get(z);for(;O!==void 0&&++v<=O;){L.length>0&&L.push({type:"text",value:" "});let Y=typeof l=="string"?l:l(b,v);typeof Y=="string"&&(Y={type:"text",value:Y}),L.push({type:"element",tagName:"a",properties:{href:"#"+r+"fnref-"+S+(v>1?"-"+v:""),dataFootnoteBackref:"",ariaLabel:typeof s=="string"?s:s(b,v),className:["data-footnote-backref"]},children:Array.isArray(Y)?Y:[Y]})}const j=g[g.length-1];if(j&&j.type==="element"&&j.tagName==="p"){const Y=j.children[j.children.length-1];Y&&Y.type==="text"?Y.value+=" ":j.children.push({type:"text",value:" "}),j.children.push(...L)}else g.push(...L);const X={type:"element",tagName:"li",properties:{id:r+"fn-"+S},children:a.wrap(g,!0)};a.patch(p,X),h.push(X)}if(h.length!==0)return{type:"element",tagName:"section",properties:{dataFootnotes:!0,className:["footnotes"]},children:[{type:"element",tagName:d,properties:{...$s(f),id:"footnote-label"},children:[{type:"text",value:u}]},{type:"text",value:`
`},{type:"element",tagName:"ol",properties:{},children:a.wrap(h,!0)},{type:"text",value:`
`}]}}const Eg=(function(a){if(a==null)return p9;if(typeof a=="function")return ro(a);if(typeof a=="object")return Array.isArray(a)?u9(a):d9(a);if(typeof a=="string")return f9(a);throw new Error("Expected function, string, or object as test")});function u9(a){const r=[];let l=-1;for(;++l<a.length;)r[l]=Eg(a[l]);return ro(s);function s(...u){let d=-1;for(;++d<r.length;)if(r[d].apply(this,u))return!0;return!1}}function d9(a){const r=a;return ro(l);function l(s){const u=s;let d;for(d in a)if(u[d]!==r[d])return!1;return!0}}function f9(a){return ro(r);function r(l){return l&&l.type===a}}function ro(a){return r;function r(l,s,u){return!!(h9(l)&&a.call(this,l,typeof s=="number"?s:void 0,u||void 0))}}function p9(){return!0}function h9(a){return a!==null&&typeof a=="object"&&"type"in a}const Dg=[],m9=!0,pb=!1,b9="skip";function g9(a,r,l,s){let u;typeof r=="function"&&typeof l!="function"?(s=l,l=r):u=r;const d=Eg(u),f=s?-1:1;h(a,void 0,[])();function h(b,p,g){const z=b&&typeof b=="object"?b:{};if(typeof z.type=="string"){const v=typeof z.tagName=="string"?z.tagName:typeof z.name=="string"?z.name:void 0;Object.defineProperty(S,"name",{value:"node ("+(b.type+(v?"<"+v+">":""))+")"})}return S;function S(){let v=Dg,L,O,j;if((!r||d(b,p,g[g.length-1]||void 0))&&(v=z9(l(b,g)),v[0]===pb))return v;if("children"in b&&b.children){const X=b;if(X.children&&v[0]!==b9)for(O=(s?X.children.length:-1)+f,j=g.concat(X);O>-1&&O<X.children.length;){const Y=X.children[O];if(L=h(Y,O,j)(),L[0]===pb)return L;O=typeof L[1]=="number"?L[1]:O+f}}return v}}}function z9(a){return Array.isArray(a)?a:typeof a=="number"?[m9,a]:a==null?Dg:[a]}function wg(a,r,l,s){let u,d,f;typeof r=="function"&&typeof l!="function"?(d=void 0,f=r,u=l):(d=r,f=l,u=s),g9(a,d,h,u);function h(b,p){const g=p[p.length-1],z=g?g.children.indexOf(b):void 0;return f(b,z,g)}}const Ku={}.hasOwnProperty,y9={};function v9(a,r){const l=r||y9,s=new Map,u=new Map,d=new Map,f={...t9,...l.handlers},h={all:p,applyData:E9,definitionById:s,footnoteById:u,footnoteCounts:d,footnoteOrder:[],handlers:f,one:b,options:l,patch:S9,wrap:w9};return wg(a,function(g){if(g.type==="definition"||g.type==="footnoteDefinition"){const z=g.type==="definition"?s:u,S=String(g.identifier).toUpperCase();z.has(S)||z.set(S,g)}}),h;function b(g,z){const S=g.type,v=h.handlers[S];if(Ku.call(h.handlers,S)&&v)return v(h,g,z);if(h.options.passThrough&&h.options.passThrough.includes(S)){if("children"in g){const{children:O,...j}=g,X=$s(j);return X.children=h.all(g),X}return $s(g)}return(h.options.unknownHandler||D9)(h,g,z)}function p(g){const z=[];if("children"in g){const S=g.children;let v=-1;for(;++v<S.length;){const L=h.one(S[v],g);if(L){if(v&&S[v-1].type==="break"&&(!Array.isArray(L)&&L.type==="text"&&(L.value=hb(L.value)),!Array.isArray(L)&&L.type==="element")){const O=L.children[0];O&&O.type==="text"&&(O.value=hb(O.value))}Array.isArray(L)?z.push(...L):z.push(L)}}}return z}}function S9(a,r){a.position&&(r.position=iv(a))}function E9(a,r){let l=r;if(a&&a.data){const s=a.data.hName,u=a.data.hChildren,d=a.data.hProperties;if(typeof s=="string")if(l.type==="element")l.tagName=s;else{const f="children"in l?l.children:[l];l={type:"element",tagName:s,properties:{},children:f}}l.type==="element"&&d&&Object.assign(l.properties,$s(d)),"children"in l&&l.children&&u!==null&&u!==void 0&&(l.children=u)}return l}function D9(a,r){const l=r.data||{},s="value"in r&&!(Ku.call(l,"hProperties")||Ku.call(l,"hChildren"))?{type:"text",value:r.value}:{type:"element",tagName:"div",properties:{},children:a.all(r)};return a.patch(r,s),a.applyData(r,s)}function w9(a,r){const l=[];let s=-1;for(r&&l.push({type:"text",value:`
`});++s<a.length;)s&&l.push({type:"text",value:`
`}),l.push(a[s]);return r&&a.length>0&&l.push({type:"text",value:`
`}),l}function hb(a){let r=0,l=a.charCodeAt(r);for(;l===9||l===32;)r++,l=a.charCodeAt(r);return a.slice(r)}function mb(a,r){const l=v9(a,r),s=l.one(a,void 0),u=c9(l),d=Array.isArray(s)?{type:"root",children:s}:s||{type:"root",children:[]};return u&&d.children.push({type:"text",value:`
`},u),d}function x9(a,r){return a&&"run"in a?async function(l,s){const u=mb(l,{file:s,...r});await a.run(u,s)}:function(l,s){return mb(l,{file:s,...a||r})}}function bb(a){if(a)throw a}var _u,gb;function T9(){if(gb)return _u;gb=1;var a=Object.prototype.hasOwnProperty,r=Object.prototype.toString,l=Object.defineProperty,s=Object.getOwnPropertyDescriptor,u=function(p){return typeof Array.isArray=="function"?Array.isArray(p):r.call(p)==="[object Array]"},d=function(p){if(!p||r.call(p)!=="[object Object]")return!1;var g=a.call(p,"constructor"),z=p.constructor&&p.constructor.prototype&&a.call(p.constructor.prototype,"isPrototypeOf");if(p.constructor&&!g&&!z)return!1;var S;for(S in p);return typeof S>"u"||a.call(p,S)},f=function(p,g){l&&g.name==="__proto__"?l(p,g.name,{enumerable:!0,configurable:!0,value:g.newValue,writable:!0}):p[g.name]=g.newValue},h=function(p,g){if(g==="__proto__")if(a.call(p,g)){if(s)return s(p,g).value}else return;return p[g]};return _u=function b(){var p,g,z,S,v,L,O=arguments[0],j=1,X=arguments.length,Y=!1;for(typeof O=="boolean"&&(Y=O,O=arguments[1]||{},j=2),(O==null||typeof O!="object"&&typeof O!="function")&&(O={});j<X;++j)if(p=arguments[j],p!=null)for(g in p)z=h(O,g),S=h(p,g),O!==S&&(Y&&S&&(d(S)||(v=u(S)))?(v?(v=!1,L=z&&u(z)?z:[]):L=z&&d(z)?z:{},f(O,{name:g,newValue:b(Y,L,S)})):typeof S<"u"&&f(O,{name:g,newValue:S}));return O},_u}var A9=T9();const Iu=no(A9);function Ju(a){if(typeof a!="object"||a===null)return!1;const r=Object.getPrototypeOf(a);return(r===null||r===Object.prototype||Object.getPrototypeOf(r)===null)&&!(Symbol.toStringTag in a)&&!(Symbol.iterator in a)}function k9(){const a=[],r={run:l,use:s};return r;function l(...u){let d=-1;const f=u.pop();if(typeof f!="function")throw new TypeError("Expected function as last argument, not "+f);h(null,...u);function h(b,...p){const g=a[++d];let z=-1;if(b){f(b);return}for(;++z<u.length;)(p[z]===null||p[z]===void 0)&&(p[z]=u[z]);u=p,g?R9(g,h)(...p):f(null,...p)}}function s(u){if(typeof u!="function")throw new TypeError("Expected `middelware` to be a function, not "+u);return a.push(u),r}}function R9(a,r){let l;return s;function s(...f){const h=a.length>f.length;let b;h&&f.push(u);try{b=a.apply(this,f)}catch(p){const g=p;if(h&&l)throw g;return u(g)}h||(b&&b.then&&typeof b.then=="function"?b.then(d,u):b instanceof Error?u(b):d(b))}function u(f,...h){l||(l=!0,r(f,...h))}function d(f){u(null,f)}}const qt={basename:_9,dirname:I9,extname:M9,join:C9,sep:"/"};function _9(a,r){if(r!==void 0&&typeof r!="string")throw new TypeError('"ext" argument must be a string');_l(a);let l=0,s=-1,u=a.length,d;if(r===void 0||r.length===0||r.length>a.length){for(;u--;)if(a.codePointAt(u)===47){if(d){l=u+1;break}}else s<0&&(d=!0,s=u+1);return s<0?"":a.slice(l,s)}if(r===a)return"";let f=-1,h=r.length-1;for(;u--;)if(a.codePointAt(u)===47){if(d){l=u+1;break}}else f<0&&(d=!0,f=u+1),h>-1&&(a.codePointAt(u)===r.codePointAt(h--)?h<0&&(s=u):(h=-1,s=f));return l===s?s=f:s<0&&(s=a.length),a.slice(l,s)}function I9(a){if(_l(a),a.length===0)return".";let r=-1,l=a.length,s;for(;--l;)if(a.codePointAt(l)===47){if(s){r=l;break}}else s||(s=!0);return r<0?a.codePointAt(0)===47?"/":".":r===1&&a.codePointAt(0)===47?"//":a.slice(0,r)}function M9(a){_l(a);let r=a.length,l=-1,s=0,u=-1,d=0,f;for(;r--;){const h=a.codePointAt(r);if(h===47){if(f){s=r+1;break}continue}l<0&&(f=!0,l=r+1),h===46?u<0?u=r:d!==1&&(d=1):u>-1&&(d=-1)}return u<0||l<0||d===0||d===1&&u===l-1&&u===s+1?"":a.slice(u,l)}function C9(...a){let r=-1,l;for(;++r<a.length;)_l(a[r]),a[r]&&(l=l===void 0?a[r]:l+"/"+a[r]);return l===void 0?".":L9(l)}function L9(a){_l(a);const r=a.codePointAt(0)===47;let l=W9(a,!r);return l.length===0&&!r&&(l="."),l.length>0&&a.codePointAt(a.length-1)===47&&(l+="/"),r?"/"+l:l}function W9(a,r){let l="",s=0,u=-1,d=0,f=-1,h,b;for(;++f<=a.length;){if(f<a.length)h=a.codePointAt(f);else{if(h===47)break;h=47}if(h===47){if(!(u===f-1||d===1))if(u!==f-1&&d===2){if(l.length<2||s!==2||l.codePointAt(l.length-1)!==46||l.codePointAt(l.length-2)!==46){if(l.length>2){if(b=l.lastIndexOf("/"),b!==l.length-1){b<0?(l="",s=0):(l=l.slice(0,b),s=l.length-1-l.lastIndexOf("/")),u=f,d=0;continue}}else if(l.length>0){l="",s=0,u=f,d=0;continue}}r&&(l=l.length>0?l+"/..":"..",s=2)}else l.length>0?l+="/"+a.slice(u+1,f):l=a.slice(u+1,f),s=f-u-1;u=f,d=0}else h===46&&d>-1?d++:d=-1}return l}function _l(a){if(typeof a!="string")throw new TypeError("Path must be a string. Received "+JSON.stringify(a))}const O9={cwd:P9};function P9(){return"/"}function $u(a){return!!(a!==null&&typeof a=="object"&&"href"in a&&a.href&&"protocol"in a&&a.protocol&&a.auth===void 0)}function N9(a){if(typeof a=="string")a=new URL(a);else if(!$u(a)){const r=new TypeError('The "path" argument must be of type string or an instance of URL. Received `'+a+"`");throw r.code="ERR_INVALID_ARG_TYPE",r}if(a.protocol!=="file:"){const r=new TypeError("The URL must be of scheme file");throw r.code="ERR_INVALID_URL_SCHEME",r}return X9(a)}function X9(a){if(a.hostname!==""){const s=new TypeError('File URL host must be "localhost" or empty on darwin');throw s.code="ERR_INVALID_FILE_URL_HOST",s}const r=a.pathname;let l=-1;for(;++l<r.length;)if(r.codePointAt(l)===37&&r.codePointAt(l+1)===50){const s=r.codePointAt(l+2);if(s===70||s===102){const u=new TypeError("File URL path must not include encoded / characters");throw u.code="ERR_INVALID_FILE_URL_PATH",u}}return decodeURIComponent(r)}const Mu=["history","path","basename","stem","extname","dirname"];class xg{constructor(r){let l;r?$u(r)?l={path:r}:typeof r=="string"||U9(r)?l={value:r}:l=r:l={},this.cwd="cwd"in l?"":O9.cwd(),this.data={},this.history=[],this.messages=[],this.value,this.map,this.result,this.stored;let s=-1;for(;++s<Mu.length;){const d=Mu[s];d in l&&l[d]!==void 0&&l[d]!==null&&(this[d]=d==="history"?[...l[d]]:l[d])}let u;for(u in l)Mu.includes(u)||(this[u]=l[u])}get basename(){return typeof this.path=="string"?qt.basename(this.path):void 0}set basename(r){Lu(r,"basename"),Cu(r,"basename"),this.path=qt.join(this.dirname||"",r)}get dirname(){return typeof this.path=="string"?qt.dirname(this.path):void 0}set dirname(r){zb(this.basename,"dirname"),this.path=qt.join(r||"",this.basename)}get extname(){return typeof this.path=="string"?qt.extname(this.path):void 0}set extname(r){if(Cu(r,"extname"),zb(this.dirname,"extname"),r){if(r.codePointAt(0)!==46)throw new Error("`extname` must start with `.`");if(r.includes(".",1))throw new Error("`extname` cannot contain multiple dots")}this.path=qt.join(this.dirname,this.stem+(r||""))}get path(){return this.history[this.history.length-1]}set path(r){$u(r)&&(r=N9(r)),Lu(r,"path"),this.path!==r&&this.history.push(r)}get stem(){return typeof this.path=="string"?qt.basename(this.path,this.extname):void 0}set stem(r){Lu(r,"stem"),Cu(r,"stem"),this.path=qt.join(this.dirname||"",r+(this.extname||""))}fail(r,l,s){const u=this.message(r,l,s);throw u.fatal=!0,u}info(r,l,s){const u=this.message(r,l,s);return u.fatal=void 0,u}message(r,l,s){const u=new jn(r,l,s);return this.path&&(u.name=this.path+":"+u.name,u.file=this.path),u.fatal=!1,this.messages.push(u),u}toString(r){return this.value===void 0?"":typeof this.value=="string"?this.value:new TextDecoder(r||void 0).decode(this.value)}}function Cu(a,r){if(a&&a.includes(qt.sep))throw new Error("`"+r+"` cannot be a path: did not expect `"+qt.sep+"`")}function Lu(a,r){if(!a)throw new Error("`"+r+"` cannot be empty")}function zb(a,r){if(!a)throw new Error("Setting `"+r+"` requires `path` to be set too")}function U9(a){return!!(a&&typeof a=="object"&&"byteLength"in a&&"byteOffset"in a)}const B9=(function(a){const s=this.constructor.prototype,u=s[a],d=function(){return u.apply(d,arguments)};return Object.setPrototypeOf(d,s),d}),Z9={}.hasOwnProperty;class Sd extends B9{constructor(){super("copy"),this.Compiler=void 0,this.Parser=void 0,this.attachers=[],this.compiler=void 0,this.freezeIndex=-1,this.frozen=void 0,this.namespace={},this.parser=void 0,this.transformers=k9()}copy(){const r=new Sd;let l=-1;for(;++l<this.attachers.length;){const s=this.attachers[l];r.use(...s)}return r.data(Iu(!0,{},this.namespace)),r}data(r,l){return typeof r=="string"?arguments.length===2?(Pu("data",this.frozen),this.namespace[r]=l,this):Z9.call(this.namespace,r)&&this.namespace[r]||void 0:r?(Pu("data",this.frozen),this.namespace=r,this):this.namespace}freeze(){if(this.frozen)return this;const r=this;for(;++this.freezeIndex<this.attachers.length;){const[l,...s]=this.attachers[this.freezeIndex];if(s[0]===!1)continue;s[0]===!0&&(s[0]=void 0);const u=l.call(r,...s);typeof u=="function"&&this.transformers.use(u)}return this.frozen=!0,this.freezeIndex=Number.POSITIVE_INFINITY,this}parse(r){this.freeze();const l=Hs(r),s=this.parser||this.Parser;return Wu("parse",s),s(String(l),l)}process(r,l){const s=this;return this.freeze(),Wu("process",this.parser||this.Parser),Ou("process",this.compiler||this.Compiler),l?u(void 0,l):new Promise(u);function u(d,f){const h=Hs(r),b=s.parse(h);s.run(b,h,function(g,z,S){if(g||!z||!S)return p(g);const v=z,L=s.stringify(v,S);H9(L)?S.value=L:S.result=L,p(g,S)});function p(g,z){g||!z?f(g):d?d(z):l(void 0,z)}}}processSync(r){let l=!1,s;return this.freeze(),Wu("processSync",this.parser||this.Parser),Ou("processSync",this.compiler||this.Compiler),this.process(r,u),vb("processSync","process",l),s;function u(d,f){l=!0,bb(d),s=f}}run(r,l,s){yb(r),this.freeze();const u=this.transformers;return!s&&typeof l=="function"&&(s=l,l=void 0),s?d(void 0,s):new Promise(d);function d(f,h){const b=Hs(l);u.run(r,b,p);function p(g,z,S){const v=z||r;g?h(g):f?f(v):s(void 0,v,S)}}}runSync(r,l){let s=!1,u;return this.run(r,l,d),vb("runSync","run",s),u;function d(f,h){bb(f),u=h,s=!0}}stringify(r,l){this.freeze();const s=Hs(l),u=this.compiler||this.Compiler;return Ou("stringify",u),yb(r),u(r,s)}use(r,...l){const s=this.attachers,u=this.namespace;if(Pu("use",this.frozen),r!=null)if(typeof r=="function")b(r,l);else if(typeof r=="object")Array.isArray(r)?h(r):f(r);else throw new TypeError("Expected usable value, not `"+r+"`");return this;function d(p){if(typeof p=="function")b(p,[]);else if(typeof p=="object")if(Array.isArray(p)){const[g,...z]=p;b(g,z)}else f(p);else throw new TypeError("Expected usable value, not `"+p+"`")}function f(p){if(!("plugins"in p)&&!("settings"in p))throw new Error("Expected usable value but received an empty preset, which is probably a mistake: presets typically come with `plugins` and sometimes with `settings`, but this has neither");h(p.plugins),p.settings&&(u.settings=Iu(!0,u.settings,p.settings))}function h(p){let g=-1;if(p!=null)if(Array.isArray(p))for(;++g<p.length;){const z=p[g];d(z)}else throw new TypeError("Expected a list of plugins, not `"+p+"`")}function b(p,g){let z=-1,S=-1;for(;++z<s.length;)if(s[z][0]===p){S=z;break}if(S===-1)s.push([p,...g]);else if(g.length>0){let[v,...L]=g;const O=s[S][1];Ju(O)&&Ju(v)&&(v=Iu(!0,O,v)),s[S]=[p,v,...L]}}}}const j9=new Sd().freeze();function Wu(a,r){if(typeof r!="function")throw new TypeError("Cannot `"+a+"` without `parser`")}function Ou(a,r){if(typeof r!="function")throw new TypeError("Cannot `"+a+"` without `compiler`")}function Pu(a,r){if(r)throw new Error("Cannot call `"+a+"` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`.")}function yb(a){if(!Ju(a)||typeof a.type!="string")throw new TypeError("Expected node, got `"+a+"`")}function vb(a,r,l){if(!l)throw new Error("`"+a+"` finished async. Use `"+r+"` instead")}function Hs(a){return V9(a)?a:new xg(a)}function V9(a){return!!(a&&typeof a=="object"&&"message"in a&&"messages"in a)}function H9(a){return typeof a=="string"||q9(a)}function q9(a){return!!(a&&typeof a=="object"&&"byteLength"in a&&"byteOffset"in a)}const G9="https://github.com/remarkjs/react-markdown/blob/main/changelog.md",Sb=[],Eb={allowDangerousHtml:!0},Y9=/^(https?|ircs?|mailto|xmpp)$/i,F9=[{from:"astPlugins",id:"remove-buggy-html-in-markdown-parser"},{from:"allowDangerousHtml",id:"remove-buggy-html-in-markdown-parser"},{from:"allowNode",id:"replace-allownode-allowedtypes-and-disallowedtypes",to:"allowElement"},{from:"allowedTypes",id:"replace-allownode-allowedtypes-and-disallowedtypes",to:"allowedElements"},{from:"className",id:"remove-classname"},{from:"disallowedTypes",id:"replace-allownode-allowedtypes-and-disallowedtypes",to:"disallowedElements"},{from:"escapeHtml",id:"remove-buggy-html-in-markdown-parser"},{from:"includeElementIndex",id:"#remove-includeelementindex"},{from:"includeNodeIndex",id:"change-includenodeindex-to-includeelementindex"},{from:"linkTarget",id:"remove-linktarget"},{from:"plugins",id:"change-plugins-to-remarkplugins",to:"remarkPlugins"},{from:"rawSourcePos",id:"#remove-rawsourcepos"},{from:"renderers",id:"change-renderers-to-components",to:"components"},{from:"source",id:"change-source-to-children",to:"children"},{from:"sourcePos",id:"#remove-sourcepos"},{from:"transformImageUri",id:"#add-urltransform",to:"urlTransform"},{from:"transformLinkUri",id:"#add-urltransform",to:"urlTransform"}];function Q9(a){const r=K9(a),l=J9(a);return $9(r.runSync(r.parse(l),l),a)}function K9(a){const r=a.rehypePlugins||Sb,l=a.remarkPlugins||Sb,s=a.remarkRehypeOptions?{...a.remarkRehypeOptions,...Eb}:Eb;return j9().use(_S).use(l).use(x9,s).use(r)}function J9(a){const r=a.children||"",l=new xg;return typeof r=="string"&&(l.value=r),l}function $9(a,r){const l=r.allowedElements,s=r.allowElement,u=r.components,d=r.disallowedElements,f=r.skipHtml,h=r.unwrapDisallowed,b=r.urlTransform||e4;for(const g of F9)Object.hasOwn(r,g.from)&&(""+g.from+(g.to?"use `"+g.to+"` instead":"remove it")+G9+g.id,void 0);return wg(a,p),cv(a,{Fragment:F.Fragment,components:u,ignoreInvalidStyle:!0,jsx:F.jsx,jsxs:F.jsxs,passKeys:!0,passNode:!0});function p(g,z,S){if(g.type==="raw"&&S&&typeof z=="number")return f?S.children.splice(z,1):S.children[z]={type:"text",value:g.value},z;if(g.type==="element"){let v;for(v in Au)if(Object.hasOwn(Au,v)&&Object.hasOwn(g.properties,v)){const L=g.properties[v],O=Au[v];(O===null||O.includes(g.tagName))&&(g.properties[v]=b(String(L||""),v,g))}}if(g.type==="element"){let v=l?!l.includes(g.tagName):d?d.includes(g.tagName):!1;if(!v&&s&&typeof z=="number"&&(v=!s(g,z,S)),v&&S&&typeof z=="number")return h&&g.children?S.children.splice(z,1,...g.children):S.children.splice(z,1),z}}}function e4(a){const r=a.indexOf(":"),l=a.indexOf("?"),s=a.indexOf("#"),u=a.indexOf("/");return r===-1||u!==-1&&r>u||l!==-1&&r>l||s!==-1&&r>s||Y9.test(a.slice(0,r))?a:""}const n4=`**wizzard-packages**

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
`,t4=`[**wizzard-packages**](../../README.md)

***

[wizzard-packages](../../README.md) / adapter-yup/src

# adapter-yup/src

## Classes

- [YupAdapter](classes/YupAdapter.md)

## Interfaces

- [YupLikeError](interfaces/YupLikeError.md)
- [YupLikeSchema](interfaces/YupLikeSchema.md)
`,a4=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [adapter-yup/src](../README.md) / YupAdapter

# Class: YupAdapter\\<T\\>

Defined in: [adapter-yup/src/YupAdapter.ts:7](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/adapter-yup/src/YupAdapter.ts#L7)

Validation adapter for Yup-like schemas.

## Type Parameters

### T

\`T\`

## Implements

- [\`IValidatorAdapter\`](../../../react/src/interfaces/IValidatorAdapter.md)\\<\`T\`\\>

## Constructors

### Constructor

> **new YupAdapter**\\<\`T\`\\>(\`schema\`): \`YupAdapter\`\\<\`T\`\\>

Defined in: [adapter-yup/src/YupAdapter.ts:10](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/adapter-yup/src/YupAdapter.ts#L10)

#### Parameters

##### schema

[\`YupLikeSchema\`](../interfaces/YupLikeSchema.md)\\<\`T\`\\>

#### Returns

\`YupAdapter\`\\<\`T\`\\>

## Methods

### validate()

> **validate**(\`data\`): \`Promise\`\\<[\`ValidationResult\`](../../../react/src/type-aliases/ValidationResult.md)\\>

Defined in: [adapter-yup/src/YupAdapter.ts:14](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/adapter-yup/src/YupAdapter.ts#L14)

#### Parameters

##### data

\`unknown\`

#### Returns

\`Promise\`\\<[\`ValidationResult\`](../../../react/src/type-aliases/ValidationResult.md)\\>

#### Implementation of

[\`IValidatorAdapter\`](../../../react/src/interfaces/IValidatorAdapter.md).[\`validate\`](../../../react/src/interfaces/IValidatorAdapter.md#validate)
`,i4=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [adapter-yup/src](../README.md) / YupLikeError

# Interface: YupLikeError

Defined in: [adapter-yup/src/types.ts:11](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/adapter-yup/src/types.ts#L11)

Minimal structural interface for Yup-like validation errors.

## Properties

### inner

> **inner**: \`object\`[]

Defined in: [adapter-yup/src/types.ts:12](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/adapter-yup/src/types.ts#L12)

#### message

> **message**: \`string\`

#### path?

> \`optional\` **path**: \`string\`
`,r4=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [adapter-yup/src](../README.md) / YupLikeSchema

# Interface: YupLikeSchema\\<T\\>

Defined in: [adapter-yup/src/types.ts:4](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/adapter-yup/src/types.ts#L4)

Minimal structural interface for Yup-like schemas.

## Type Parameters

### T

\`T\` = \`any\`

## Properties

### validate()

> **validate**: (\`data\`, \`options\`) => \`Promise\`\\<\`any\`\\>

Defined in: [adapter-yup/src/types.ts:5](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/adapter-yup/src/types.ts#L5)

#### Parameters

##### data

\`T\`

##### options

###### abortEarly

\`boolean\`

#### Returns

\`Promise\`\\<\`any\`\\>
`,l4=`[**wizzard-packages**](../../README.md)

***

[wizzard-packages](../../README.md) / adapter-zod/src

# adapter-zod/src

## Classes

- [ZodAdapter](classes/ZodAdapter.md)

## Interfaces

- [ZodLikeSchema](interfaces/ZodLikeSchema.md)
`,s4=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [adapter-zod/src](../README.md) / ZodAdapter

# Class: ZodAdapter\\<T\\>

Defined in: [adapter-zod/src/ZodAdapter.ts:7](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/adapter-zod/src/ZodAdapter.ts#L7)

Validation adapter for Zod-like schemas.

## Type Parameters

### T

\`T\`

## Implements

- [\`IValidatorAdapter\`](../../../react/src/interfaces/IValidatorAdapter.md)\\<\`T\`\\>

## Constructors

### Constructor

> **new ZodAdapter**\\<\`T\`\\>(\`schema\`): \`ZodAdapter\`\\<\`T\`\\>

Defined in: [adapter-zod/src/ZodAdapter.ts:10](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/adapter-zod/src/ZodAdapter.ts#L10)

#### Parameters

##### schema

[\`ZodLikeSchema\`](../interfaces/ZodLikeSchema.md)\\<\`T\`\\>

#### Returns

\`ZodAdapter\`\\<\`T\`\\>

## Methods

### validate()

> **validate**(\`data\`): \`Promise\`\\<[\`ValidationResult\`](../../../react/src/type-aliases/ValidationResult.md)\\>

Defined in: [adapter-zod/src/ZodAdapter.ts:14](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/adapter-zod/src/ZodAdapter.ts#L14)

#### Parameters

##### data

\`unknown\`

#### Returns

\`Promise\`\\<[\`ValidationResult\`](../../../react/src/type-aliases/ValidationResult.md)\\>

#### Implementation of

[\`IValidatorAdapter\`](../../../react/src/interfaces/IValidatorAdapter.md).[\`validate\`](../../../react/src/interfaces/IValidatorAdapter.md#validate)
`,o4="[**wizzard-packages**](../../../README.md)\n\n***\n\n[wizzard-packages](../../../README.md) / [adapter-zod/src](../README.md) / ZodLikeSchema\n\n# Interface: ZodLikeSchema\\<T\\>\n\nDefined in: [adapter-zod/src/types.ts:4](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/adapter-zod/src/types.ts#L4)\n\nMinimal structural interface for Zod-like schemas.\n\n## Type Parameters\n\n### T\n\n`T` = `any`\n\n## Properties\n\n### safeParseAsync()\n\n> **safeParseAsync**: (`data`) => `Promise`\\<\\{ `data?`: `T`; `error?`: \\{ `issues`: `object`[]; \\}; `success`: `boolean`; \\}\\>\n\nDefined in: [adapter-zod/src/types.ts:5](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/adapter-zod/src/types.ts#L5)\n\n#### Parameters\n\n##### data\n\n`T`\n\n#### Returns\n\n`Promise`\\<\\{ `data?`: `T`; `error?`: \\{ `issues`: `object`[]; \\}; `success`: `boolean`; \\}\\>\n",c4=`[**wizzard-packages**](../../README.md)

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
`,u4=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [core/src](../README.md) / WizardStore

# Class: WizardStore\\<T, StepId\\>

Defined in: [core/src/store/WizardStore.ts:17](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/store/WizardStore.ts#L17)

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

Defined in: [core/src/store/WizardStore.ts:38](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/store/WizardStore.ts#L38)

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

Defined in: [core/src/store/WizardStore.ts:23](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/store/WizardStore.ts#L23)

#### Implementation of

[\`IWizardStore\`](../interfaces/IWizardStore.md).[\`errorsMap\`](../interfaces/IWizardStore.md#errorsmap)

## Methods

### clearStepStorage()

> **clearStepStorage**(\`stepId\`): \`void\`

Defined in: [core/src/store/WizardStore.ts:534](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/store/WizardStore.ts#L534)

#### Parameters

##### stepId

\`string\`

#### Returns

\`void\`

***

### deleteError()

> **deleteError**(\`stepId\`, \`path\`): \`boolean\`

Defined in: [core/src/store/WizardStore.ts:439](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/store/WizardStore.ts#L439)

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

Defined in: [core/src/store/WizardStore.ts:97](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/store/WizardStore.ts#L97)

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

Defined in: [core/src/store/WizardStore.ts:285](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/store/WizardStore.ts#L285)

Returns the current immutable snapshot of the wizard state.

#### Returns

[\`IWizardState\`](../interfaces/IWizardState.md)\\<\`T\`, \`StepId\`\\>

#### Implementation of

[\`IWizardStore\`](../interfaces/IWizardStore.md).[\`getSnapshot\`](../interfaces/IWizardStore.md#getsnapshot)

***

### goToStep()

> **goToStep**(\`stepId\`, \`options\`): \`Promise\`\\<\`boolean\`\\>

Defined in: [core/src/store/WizardStore.ts:775](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/store/WizardStore.ts#L775)

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

Defined in: [core/src/store/WizardStore.ts:471](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/store/WizardStore.ts#L471)

Restores wizard state from persistence storage.
Implements "latest wins" conflict resolution based on step timestamps.

#### Returns

\`void\`

#### Implementation of

[\`IWizardStore\`](../interfaces/IWizardStore.md).[\`hydrate\`](../interfaces/IWizardStore.md#hydrate)

***

### injectPersistence()

> **injectPersistence**(\`adapter\`): \`void\`

Defined in: [core/src/store/WizardStore.ts:463](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/store/WizardStore.ts#L463)

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

Defined in: [core/src/store/WizardStore.ts:616](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/store/WizardStore.ts#L616)

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

Defined in: [core/src/store/WizardStore.ts:547](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/store/WizardStore.ts#L547)

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

Defined in: [core/src/store/WizardStore.ts:377](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/store/WizardStore.ts#L377)

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

Defined in: [core/src/store/WizardStore.ts:419](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/store/WizardStore.ts#L419)

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

Defined in: [core/src/store/WizardStore.ts:458](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/store/WizardStore.ts#L458)

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

Defined in: [core/src/store/WizardStore.ts:29](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/store/WizardStore.ts#L29)

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

Defined in: [core/src/store/WizardStore.ts:296](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/store/WizardStore.ts#L296)

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

Defined in: [core/src/store/WizardStore.ts:406](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/store/WizardStore.ts#L406)

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

Defined in: [core/src/store/WizardStore.ts:330](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/store/WizardStore.ts#L330)

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

Defined in: [core/src/store/WizardStore.ts:751](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/store/WizardStore.ts#L751)

#### Returns

\`Promise\`\\<\\{ \`errors\`: \`Record\`\\<\`string\`, \`Record\`\\<\`string\`, \`string\`\\>\\>; \`isValid\`: \`boolean\`; \\}\\>

#### Implementation of

[\`IWizardStore\`](../interfaces/IWizardStore.md).[\`validateAll\`](../interfaces/IWizardStore.md#validateall)

***

### validateStep()

> **validateStep**(\`stepId\`): \`Promise\`\\<\`boolean\`\\>

Defined in: [core/src/store/WizardStore.ts:692](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/store/WizardStore.ts#L692)

#### Parameters

##### stepId

\`StepId\`

#### Returns

\`Promise\`\\<\`boolean\`\\>

#### Implementation of

[\`IWizardStore\`](../interfaces/IWizardStore.md).[\`validateStep\`](../interfaces/IWizardStore.md#validatestep)
`,d4=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [core/src](../README.md) / getByPath

# Function: getByPath()

> **getByPath**(\`obj\`, \`path\`, \`defaultValue?\`): \`unknown\`

Defined in: [core/src/utils/data.ts:32](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/utils/data.ts#L32)

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
`,f4=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [core/src](../README.md) / setByPath

# Function: setByPath()

> **setByPath**\\<\`T\`\\>(\`obj\`, \`path\`, \`value\`): \`T\`

Defined in: [core/src/utils/data.ts:54](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/utils/data.ts#L54)

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
`,p4=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [core/src](../README.md) / shallowEqual

# Function: shallowEqual()

> **shallowEqual**(\`a\`, \`b\`): \`boolean\`

Defined in: [core/src/utils/data.ts:99](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/utils/data.ts#L99)

Simple shallow equality check.

## Parameters

### a

\`any\`

### b

\`any\`

## Returns

\`boolean\`
`,h4=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [core/src](../README.md) / toPath

# Function: toPath()

> **toPath**(\`path\`): \`string\`[]

Defined in: [core/src/utils/data.ts:9](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/utils/data.ts#L9)

Parses a string path into an array of keys using a cache.

## Parameters

### path

\`string\`

## Returns

\`string\`[]
`,m4=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [core/src](../README.md) / IBreadcrumb

# Interface: IBreadcrumb\\<StepId\\>

Defined in: [core/src/types.ts:311](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L311)

Breadcrumb Interface

## Type Parameters

### StepId

\`StepId\` *extends* \`string\` = \`string\`

## Properties

### id

> **id**: \`StepId\`

Defined in: [core/src/types.ts:312](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L312)

***

### label

> **label**: \`string\`

Defined in: [core/src/types.ts:313](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L313)

***

### status

> **status**: [\`BreadcrumbStatus\`](../type-aliases/BreadcrumbStatus.md)

Defined in: [core/src/types.ts:314](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L314)
`,b4=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [core/src](../README.md) / IPersistenceAdapter

# Interface: IPersistenceAdapter

Defined in: [core/src/types.ts:141](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L141)

Persistence Adapter Interface

## Properties

### clear()

> **clear**: () => \`void\`

Defined in: [core/src/types.ts:146](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L146)

#### Returns

\`void\`

***

### clearStep()

> **clearStep**: (\`stepId\`) => \`void\`

Defined in: [core/src/types.ts:145](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L145)

#### Parameters

##### stepId

\`string\`

#### Returns

\`void\`

***

### getStep()

> **getStep**: \\<\`T\`\\>(\`stepId\`) => \`T\` \\| \`undefined\`

Defined in: [core/src/types.ts:143](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L143)

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

Defined in: [core/src/types.ts:144](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L144)

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

Defined in: [core/src/types.ts:142](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L142)

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
`,g4=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [core/src](../README.md) / IStepConfig

# Interface: IStepConfig\\<TStepData, StepId\\>

Defined in: [core/src/types.ts:157](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L157)

Step Configuration

## Type Parameters

### TStepData

\`TStepData\` = \`unknown\`

### StepId

\`StepId\` *extends* \`string\` = \`string\`

## Properties

### ~~autoValidate?~~

> \`optional\` **autoValidate**: \`boolean\`

Defined in: [core/src/types.ts:179](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L179)

#### Deprecated

Use validationMode instead

***

### beforeLeave()?

> \`optional\` **beforeLeave**: (\`data\`, \`direction\`, \`metadata\`) => \`boolean\` \\| \`Promise\`\\<\`boolean\`\\>

Defined in: [core/src/types.ts:169](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L169)

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

Defined in: [core/src/types.ts:189](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L189)

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

Defined in: [core/src/types.ts:185](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L185)

***

### component?

> \`optional\` **component**: \`any\`

Defined in: [core/src/types.ts:181](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L181)

***

### condition()?

> \`optional\` **condition**: (\`data\`, \`metadata\`) => \`boolean\` \\| \`Promise\`\\<\`boolean\`\\>

Defined in: [core/src/types.ts:160](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L160)

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

Defined in: [core/src/types.ts:168](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L168)

***

### dependsOn?

> \`optional\` **dependsOn**: \`string\`[]

Defined in: [core/src/types.ts:184](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L184)

***

### id

> **id**: \`StepId\`

Defined in: [core/src/types.ts:158](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L158)

***

### label

> **label**: \`string\`

Defined in: [core/src/types.ts:159](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L159)

***

### persistenceAdapter?

> \`optional\` **persistenceAdapter**: [\`IPersistenceAdapter\`](IPersistenceAdapter.md)

Defined in: [core/src/types.ts:182](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L182)

***

### persistenceMode?

> \`optional\` **persistenceMode**: [\`PersistenceMode\`](../type-aliases/PersistenceMode.md)

Defined in: [core/src/types.ts:183](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L183)

***

### showWhilePending?

> \`optional\` **showWhilePending**: \`boolean\`

Defined in: [core/src/types.ts:167](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L167)

***

### validationAdapter?

> \`optional\` **validationAdapter**: [\`IValidatorAdapter\`](IValidatorAdapter.md)\\<\`TStepData\`\\>

Defined in: [core/src/types.ts:177](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L177)

***

### validationMode?

> \`optional\` **validationMode**: [\`ValidationMode\`](../type-aliases/ValidationMode.md)

Defined in: [core/src/types.ts:180](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L180)
`,z4=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [core/src](../README.md) / IValidatorAdapter

# Interface: IValidatorAdapter\\<TData\\>

Defined in: [core/src/types.ts:125](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L125)

Validator Adapter Interface

## Type Parameters

### TData

\`TData\` = \`unknown\`

## Properties

### validate()

> **validate**: (\`data\`) => [\`ValidationResult\`](../type-aliases/ValidationResult.md) \\| \`Promise\`\\<[\`ValidationResult\`](../type-aliases/ValidationResult.md)\\>

Defined in: [core/src/types.ts:126](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L126)

#### Parameters

##### data

\`TData\`

#### Returns

[\`ValidationResult\`](../type-aliases/ValidationResult.md) \\| \`Promise\`\\<[\`ValidationResult\`](../type-aliases/ValidationResult.md)\\>
`,y4=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [core/src](../README.md) / IWizardActions

# Interface: IWizardActions\\<StepId\\>

Defined in: [core/src/types.ts:90](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L90)

Public actions available to control the wizard.

## Extended by

- [\`IWizardContext\`](IWizardContext.md)

## Type Parameters

### StepId

\`StepId\` *extends* \`string\` = \`string\`

## Properties

### clearStorage()

> **clearStorage**: () => \`void\`

Defined in: [core/src/types.ts:106](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L106)

#### Returns

\`void\`

***

### getData()

> **getData**: (\`path\`, \`defaultValue?\`) => \`unknown\`

Defined in: [core/src/types.ts:110](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L110)

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

Defined in: [core/src/types.ts:91](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L91)

#### Returns

\`Promise\`\\<\`void\`\\>

***

### goToPrevStep()

> **goToPrevStep**: () => \`Promise\`\\<\`void\`\\>

Defined in: [core/src/types.ts:92](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L92)

#### Returns

\`Promise\`\\<\`void\`\\>

***

### goToStep()

> **goToStep**: (\`stepId\`, \`providedActiveSteps?\`, \`options?\`) => \`Promise\`\\<\`boolean\`\\>

Defined in: [core/src/types.ts:93](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L93)

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

Defined in: [core/src/types.ts:99](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L99)

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

Defined in: [core/src/types.ts:107](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L107)

#### Returns

\`void\`

***

### save()

> **save**: (\`stepIds?\`) => \`void\`

Defined in: [core/src/types.ts:105](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L105)

#### Parameters

##### stepIds?

\`boolean\` | \`StepId\` | \`StepId\`[]

#### Returns

\`void\`

***

### setData()

> **setData**: (\`path\`, \`value\`, \`options?\`) => \`void\`

Defined in: [core/src/types.ts:108](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L108)

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

Defined in: [core/src/types.ts:98](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L98)

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

Defined in: [core/src/types.ts:111](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L111)

#### Parameters

##### config

\`Partial\`\\<[\`IWizardConfig\`](IWizardConfig.md)\\<\`any\`, \`StepId\`\\>\\>

#### Returns

\`void\`

***

### updateData()

> **updateData**: (\`data\`, \`options?\`) => \`void\`

Defined in: [core/src/types.ts:109](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L109)

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

Defined in: [core/src/types.ts:101](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L101)

#### Returns

\`Promise\`\\<\\{ \`errors\`: \`Record\`\\<\`string\`, \`Record\`\\<\`string\`, \`string\`\\>\\>; \`isValid\`: \`boolean\`; \\}\\>

***

### validateStep()

> **validateStep**: (\`sid\`) => \`Promise\`\\<\`boolean\`\\>

Defined in: [core/src/types.ts:100](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L100)

#### Parameters

##### sid

\`StepId\`

#### Returns

\`Promise\`\\<\`boolean\`\\>
`,v4=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [core/src](../README.md) / IWizardConfig

# Interface: IWizardConfig\\<T, StepId\\>

Defined in: [core/src/types.ts:201](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L201)

Global Wizard Configuration.

## Type Parameters

### T

\`T\` = \`unknown\`

### StepId

\`StepId\` *extends* \`string\` = \`string\`

## Properties

### analytics?

> \`optional\` **analytics**: \`object\`

Defined in: [core/src/types.ts:214](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L214)

#### onEvent

> **onEvent**: [\`WizardEventHandler\`](../type-aliases/WizardEventHandler.md)\\<\`StepId\`\\>

***

### ~~autoValidate?~~

> \`optional\` **autoValidate**: \`boolean\`

Defined in: [core/src/types.ts:204](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L204)

#### Deprecated

Use validationMode instead

***

### middlewares?

> \`optional\` **middlewares**: [\`WizardMiddleware\`](../type-aliases/WizardMiddleware.md)\\<\`T\`, \`StepId\`\\>[]

Defined in: [core/src/types.ts:217](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L217)

***

### navigationMode?

> \`optional\` **navigationMode**: \`"sequential"\` \\| \`"visited"\` \\| \`"free"\`

Defined in: [core/src/types.ts:218](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L218)

***

### onConflict?

> \`optional\` **onConflict**: \`"merge"\` \\| \`"replace"\` \\| \`"keep-local"\`

Defined in: [core/src/types.ts:213](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L213)

***

### onStepChange()?

> \`optional\` **onStepChange**: (\`fromStep\`, \`toStep\`, \`data\`) => \`void\`

Defined in: [core/src/types.ts:219](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L219)

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

Defined in: [core/src/types.ts:207](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L207)

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

Defined in: [core/src/types.ts:202](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L202)

***

### validationDebounceTime?

> \`optional\` **validationDebounceTime**: \`number\`

Defined in: [core/src/types.ts:206](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L206)

***

### validationMode?

> \`optional\` **validationMode**: [\`ValidationMode\`](../type-aliases/ValidationMode.md)

Defined in: [core/src/types.ts:205](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L205)
`,S4=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [core/src](../README.md) / IWizardContext

# Interface: IWizardContext\\<T, StepId\\>

Defined in: [core/src/types.ts:320](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L320)

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

Defined in: [core/src/types.ts:26](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L26)

List of steps that currently meet their visibility conditions

#### Inherited from

\`Omit.activeSteps\`

***

### activeStepsCount

> **activeStepsCount**: \`number\`

Defined in: [core/src/types.ts:44](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L44)

Number of active steps

#### Inherited from

\`Omit.activeStepsCount\`

***

### allErrors

> **allErrors**: \`Record\`\\<\`StepId\`, \`Record\`\\<\`string\`, \`string\`\\>\\>

Defined in: [core/src/types.ts:333](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L333)

All errors by step and field.

***

### breadcrumbs

> **breadcrumbs**: [\`IBreadcrumb\`](IBreadcrumb.md)\\<\`StepId\`\\>[]

Defined in: [core/src/types.ts:52](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L52)

Breadcrumb items for navigation UI

#### Inherited from

\`Omit.breadcrumbs\`

***

### busySteps

> **busySteps**: \`Set\`\\<\`StepId\`\\>

Defined in: [core/src/types.ts:32](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L32)

Set of step IDs that are currently performing async work

#### Inherited from

\`Omit.busySteps\`

***

### clearStorage()

> **clearStorage**: () => \`void\`

Defined in: [core/src/types.ts:106](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L106)

#### Returns

\`void\`

#### Inherited from

[\`IWizardActions\`](IWizardActions.md).[\`clearStorage\`](IWizardActions.md#clearstorage)

***

### completedSteps

> **completedSteps**: \`Set\`\\<\`StepId\`\\>

Defined in: [core/src/types.ts:36](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L36)

Set of step IDs that have passed validation

#### Inherited from

\`Omit.completedSteps\`

***

### config

> **config**: [\`IWizardConfig\`](IWizardConfig.md)\\<\`T\`, \`StepId\`\\>

Defined in: [core/src/types.ts:40](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L40)

Current wizard configuration

#### Inherited from

\`Omit.config\`

***

### currentStep

> **currentStep**: [\`IStepConfig\`](IStepConfig.md)\\<\`T\`, \`StepId\`\\> \\| \`null\`

Defined in: [core/src/types.ts:14](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L14)

Active step configuration (if any)

#### Inherited from

\`Omit.currentStep\`

***

### currentStepId

> **currentStepId**: \`""\` \\| \`StepId\`

Defined in: [core/src/types.ts:28](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L28)

String ID of the current step

#### Inherited from

\`Omit.currentStepId\`

***

### currentStepIndex

> **currentStepIndex**: \`number\`

Defined in: [core/src/types.ts:16](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L16)

Numeric index of current step in active steps list

#### Inherited from

\`Omit.currentStepIndex\`

***

### data

> **data**: \`T\`

Defined in: [core/src/types.ts:10](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L10)

Global wizard data object

#### Inherited from

\`Omit.data\`

***

### dirtyFields

> **dirtyFields**: \`Set\`\\<\`string\`\\>

Defined in: [core/src/types.ts:50](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L50)

Set of paths to fields that have been modified

#### Inherited from

\`Omit.dirtyFields\`

***

### errors

> **errors**: \`Record\`\\<\`string\`, \`string\`\\>

Defined in: [core/src/types.ts:329](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L329)

Combined error map (flat)

***

### errorSteps

> **errorSteps**: \`Set\`\\<\`StepId\`\\>

Defined in: [core/src/types.ts:38](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L38)

Set of step IDs that currently have active validation errors

#### Inherited from

\`Omit.errorSteps\`

***

### getData()

> **getData**: (\`path\`, \`defaultValue?\`) => \`unknown\`

Defined in: [core/src/types.ts:110](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L110)

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

Defined in: [core/src/types.ts:91](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L91)

#### Returns

\`Promise\`\\<\`void\`\\>

#### Inherited from

[\`IWizardActions\`](IWizardActions.md).[\`goToNextStep\`](IWizardActions.md#gotonextstep)

***

### goToPrevStep()

> **goToPrevStep**: () => \`Promise\`\\<\`void\`\\>

Defined in: [core/src/types.ts:92](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L92)

#### Returns

\`Promise\`\\<\`void\`\\>

#### Inherited from

[\`IWizardActions\`](IWizardActions.md).[\`goToPrevStep\`](IWizardActions.md#gotoprevstep)

***

### goToStep()

> **goToStep**: (\`stepId\`, \`providedActiveSteps?\`, \`options?\`) => \`Promise\`\\<\`boolean\`\\>

Defined in: [core/src/types.ts:93](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L93)

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

Defined in: [core/src/types.ts:54](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L54)

Result of the last goToStep action

#### Inherited from

\`Omit.goToStepResult\`

***

### handleStepChange()

> **handleStepChange**: (\`field\`, \`value\`) => \`void\`

Defined in: [core/src/types.ts:99](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L99)

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

Defined in: [core/src/types.ts:30](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L30)

History of visited steps (navigation path)

#### Inherited from

\`Omit.history\`

***

### isBusy

> **isBusy**: \`boolean\`

Defined in: [core/src/types.ts:46](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L46)

Alias for isPending

#### Inherited from

\`Omit.isBusy\`

***

### isDirty

> **isDirty**: \`boolean\`

Defined in: [core/src/types.ts:48](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L48)

True if any field has been modified since initialization

#### Inherited from

\`Omit.isDirty\`

***

### isFirstStep

> **isFirstStep**: \`boolean\`

Defined in: [core/src/types.ts:18](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L18)

True if currently on the first active step

#### Inherited from

\`Omit.isFirstStep\`

***

### isLastStep

> **isLastStep**: \`boolean\`

Defined in: [core/src/types.ts:20](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L20)

True if currently on the last active step

#### Inherited from

\`Omit.isLastStep\`

***

### isLoading

> **isLoading**: \`boolean\`

Defined in: [core/src/types.ts:22](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L22)

True if the wizard is in an initial loading/hydrating state

#### Inherited from

\`Omit.isLoading\`

***

### isPending

> **isPending**: \`boolean\`

Defined in: [core/src/types.ts:24](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L24)

True if an async action (like navigation or validation) is in progress

#### Inherited from

\`Omit.isPending\`

***

### progress

> **progress**: \`number\`

Defined in: [core/src/types.ts:42](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L42)

Percentage of completion (0-100)

#### Inherited from

\`Omit.progress\`

***

### reset()

> **reset**: () => \`void\`

Defined in: [core/src/types.ts:107](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L107)

#### Returns

\`void\`

#### Inherited from

[\`IWizardActions\`](IWizardActions.md).[\`reset\`](IWizardActions.md#reset)

***

### save()

> **save**: (\`stepIds?\`) => \`void\`

Defined in: [core/src/types.ts:105](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L105)

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

Defined in: [core/src/types.ts:108](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L108)

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

Defined in: [core/src/types.ts:98](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L98)

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

Defined in: [core/src/types.ts:325](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L325)

The internal store instance.

***

### updateConfig()

> **updateConfig**: (\`config\`) => \`void\`

Defined in: [core/src/types.ts:111](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L111)

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

Defined in: [core/src/types.ts:109](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L109)

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

Defined in: [core/src/types.ts:101](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L101)

#### Returns

\`Promise\`\\<\\{ \`errors\`: \`Record\`\\<\`string\`, \`Record\`\\<\`string\`, \`string\`\\>\\>; \`isValid\`: \`boolean\`; \\}\\>

#### Inherited from

[\`IWizardActions\`](IWizardActions.md).[\`validateAll\`](IWizardActions.md#validateall)

***

### validateStep()

> **validateStep**: (\`sid\`) => \`Promise\`\\<\`boolean\`\\>

Defined in: [core/src/types.ts:100](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L100)

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

Defined in: [core/src/types.ts:34](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L34)

Set of step IDs that have been visited by the user

#### Inherited from

\`Omit.visitedSteps\`
`,E4=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [core/src](../README.md) / IWizardState

# Interface: IWizardState\\<T, StepId\\>

Defined in: [core/src/types.ts:8](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L8)

Full state of the wizard.

## Type Parameters

### T

\`T\` = \`unknown\`

### StepId

\`StepId\` *extends* \`string\` = \`string\`

## Properties

### activeSteps

> **activeSteps**: [\`IStepConfig\`](IStepConfig.md)\\<\`T\`, \`StepId\`\\>[]

Defined in: [core/src/types.ts:26](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L26)

List of steps that currently meet their visibility conditions

***

### activeStepsCount

> **activeStepsCount**: \`number\`

Defined in: [core/src/types.ts:44](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L44)

Number of active steps

***

### breadcrumbs

> **breadcrumbs**: [\`IBreadcrumb\`](IBreadcrumb.md)\\<\`StepId\`\\>[]

Defined in: [core/src/types.ts:52](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L52)

Breadcrumb items for navigation UI

***

### busySteps

> **busySteps**: \`Set\`\\<\`StepId\`\\>

Defined in: [core/src/types.ts:32](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L32)

Set of step IDs that are currently performing async work

***

### completedSteps

> **completedSteps**: \`Set\`\\<\`StepId\`\\>

Defined in: [core/src/types.ts:36](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L36)

Set of step IDs that have passed validation

***

### config

> **config**: [\`IWizardConfig\`](IWizardConfig.md)\\<\`T\`, \`StepId\`\\>

Defined in: [core/src/types.ts:40](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L40)

Current wizard configuration

***

### currentStep

> **currentStep**: [\`IStepConfig\`](IStepConfig.md)\\<\`T\`, \`StepId\`\\> \\| \`null\`

Defined in: [core/src/types.ts:14](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L14)

Active step configuration (if any)

***

### currentStepId

> **currentStepId**: \`""\` \\| \`StepId\`

Defined in: [core/src/types.ts:28](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L28)

String ID of the current step

***

### currentStepIndex

> **currentStepIndex**: \`number\`

Defined in: [core/src/types.ts:16](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L16)

Numeric index of current step in active steps list

***

### data

> **data**: \`T\`

Defined in: [core/src/types.ts:10](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L10)

Global wizard data object

***

### dirtyFields

> **dirtyFields**: \`Set\`\\<\`string\`\\>

Defined in: [core/src/types.ts:50](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L50)

Set of paths to fields that have been modified

***

### errors

> **errors**: \`Record\`\\<\`StepId\`, \`Record\`\\<\`string\`, \`string\`\\>\\>

Defined in: [core/src/types.ts:12](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L12)

Current errors map by step and field

***

### errorSteps

> **errorSteps**: \`Set\`\\<\`StepId\`\\>

Defined in: [core/src/types.ts:38](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L38)

Set of step IDs that currently have active validation errors

***

### goToStepResult?

> \`optional\` **goToStepResult**: \`boolean\` \\| \`"init"\` \\| \`null\`

Defined in: [core/src/types.ts:54](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L54)

Result of the last goToStep action

***

### history

> **history**: \`StepId\`[]

Defined in: [core/src/types.ts:30](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L30)

History of visited steps (navigation path)

***

### isBusy

> **isBusy**: \`boolean\`

Defined in: [core/src/types.ts:46](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L46)

Alias for isPending

***

### isDirty

> **isDirty**: \`boolean\`

Defined in: [core/src/types.ts:48](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L48)

True if any field has been modified since initialization

***

### isFirstStep

> **isFirstStep**: \`boolean\`

Defined in: [core/src/types.ts:18](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L18)

True if currently on the first active step

***

### isLastStep

> **isLastStep**: \`boolean\`

Defined in: [core/src/types.ts:20](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L20)

True if currently on the last active step

***

### isLoading

> **isLoading**: \`boolean\`

Defined in: [core/src/types.ts:22](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L22)

True if the wizard is in an initial loading/hydrating state

***

### isPending

> **isPending**: \`boolean\`

Defined in: [core/src/types.ts:24](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L24)

True if an async action (like navigation or validation) is in progress

***

### progress

> **progress**: \`number\`

Defined in: [core/src/types.ts:42](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L42)

Percentage of completion (0-100)

***

### visitedSteps

> **visitedSteps**: \`Set\`\\<\`StepId\`\\>

Defined in: [core/src/types.ts:34](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L34)

Set of step IDs that have been visited by the user
`,D4=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [core/src](../README.md) / IWizardStore

# Interface: IWizardStore\\<T, StepId\\>

Defined in: [core/src/types.ts:60](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L60)

Store interface for reading state and dispatching actions.

## Type Parameters

### T

\`T\`

### StepId

\`StepId\` *extends* \`string\` = \`string\`

## Properties

### errorsMap

> **errorsMap**: \`Map\`\\<\`string\`, \`Map\`\\<\`string\`, \`string\`\\>\\>

Defined in: [core/src/types.ts:74](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L74)

***

### validateAll()

> **validateAll**: () => \`Promise\`\\<\\{ \`errors\`: \`Record\`\\<\`string\`, \`Record\`\\<\`string\`, \`string\`\\>\\>; \`isValid\`: \`boolean\`; \\}\\>

Defined in: [core/src/types.ts:81](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L81)

#### Returns

\`Promise\`\\<\\{ \`errors\`: \`Record\`\\<\`string\`, \`Record\`\\<\`string\`, \`string\`\\>\\>; \`isValid\`: \`boolean\`; \\}\\>

***

### validateStep()

> **validateStep**: (\`stepId\`) => \`Promise\`\\<\`boolean\`\\>

Defined in: [core/src/types.ts:80](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L80)

#### Parameters

##### stepId

\`StepId\`

#### Returns

\`Promise\`\\<\`boolean\`\\>

## Methods

### deleteError()

> **deleteError**(\`stepId\`, \`path\`): \`boolean\`

Defined in: [core/src/types.ts:68](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L68)

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

Defined in: [core/src/types.ts:62](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L62)

#### Parameters

##### action

[\`WizardAction\`](../type-aliases/WizardAction.md)\\<\`T\`, \`StepId\`\\>

#### Returns

\`void\`

***

### getSnapshot()

> **getSnapshot**(): [\`IWizardState\`](IWizardState.md)\\<\`T\`, \`StepId\`\\>

Defined in: [core/src/types.ts:61](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L61)

#### Returns

[\`IWizardState\`](IWizardState.md)\\<\`T\`, \`StepId\`\\>

***

### goToStep()

> **goToStep**(\`stepId\`, \`options?\`): \`Promise\`\\<\`boolean\`\\>

Defined in: [core/src/types.ts:76](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L76)

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

Defined in: [core/src/types.ts:73](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L73)

#### Returns

\`void\`

***

### injectPersistence()

> **injectPersistence**(\`adapter\`): \`void\`

Defined in: [core/src/types.ts:71](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L71)

#### Parameters

##### adapter

[\`IPersistenceAdapter\`](IPersistenceAdapter.md)

#### Returns

\`void\`

***

### resolveActiveSteps()

> **resolveActiveSteps**(\`data?\`): \`Promise\`\\<[\`IStepConfig\`](IStepConfig.md)\\<\`T\`, \`StepId\`\\>[]\\>

Defined in: [core/src/types.ts:75](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L75)

#### Parameters

##### data?

\`T\`

#### Returns

\`Promise\`\\<[\`IStepConfig\`](IStepConfig.md)\\<\`T\`, \`StepId\`\\>[]\\>

***

### save()

> **save**(\`stepId?\`): \`void\`

Defined in: [core/src/types.ts:72](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L72)

#### Parameters

##### stepId?

\`StepId\`

#### Returns

\`void\`

***

### setInitialData()

> **setInitialData**(\`data\`): \`void\`

Defined in: [core/src/types.ts:65](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L65)

#### Parameters

##### data

\`T\`

#### Returns

\`void\`

***

### setStepErrors()

> **setStepErrors**(\`stepId\`, \`errors\`): \`boolean\`

Defined in: [core/src/types.ts:67](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L67)

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

Defined in: [core/src/types.ts:69](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L69)

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

Defined in: [core/src/types.ts:70](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L70)

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

Defined in: [core/src/types.ts:63](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L63)

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

Defined in: [core/src/types.ts:66](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L66)

#### Parameters

##### newErrors

\`Record\`\\<\`string\`, \`Record\`\\<\`string\`, \`string\`\\>\\>

#### Returns

\`void\`

***

### updateMeta()

> **updateMeta**(\`newMeta\`): \`void\`

Defined in: [core/src/types.ts:64](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L64)

#### Parameters

##### newMeta

\`Partial\`\\<[\`IWizardState\`](IWizardState.md)\\<\`T\`, \`StepId\`\\>\\>

#### Returns

\`void\`
`,w4=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [core/src](../README.md) / MiddlewareAPI

# Interface: MiddlewareAPI\\<T, StepId\\>

Defined in: [core/src/types.ts:258](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L258)

Middleware API

## Type Parameters

### T

\`T\` = \`any\`

### StepId

\`StepId\` *extends* \`string\` = \`string\`

## Properties

### dispatch()

> **dispatch**: (\`action\`) => \`void\`

Defined in: [core/src/types.ts:259](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L259)

#### Parameters

##### action

[\`WizardAction\`](../type-aliases/WizardAction.md)\\<\`T\`, \`StepId\`\\>

#### Returns

\`void\`

***

### getSnapshot()

> **getSnapshot**: () => [\`IWizardState\`](IWizardState.md)\\<\`T\`, \`StepId\`\\>

Defined in: [core/src/types.ts:261](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L261)

#### Returns

[\`IWizardState\`](IWizardState.md)\\<\`T\`, \`StepId\`\\>

***

### getState()

> **getState**: () => \`T\`

Defined in: [core/src/types.ts:260](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L260)

#### Returns

\`T\`
`,x4=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [core/src](../README.md) / BreadcrumbStatus

# Type Alias: BreadcrumbStatus

> **BreadcrumbStatus** = \`"visited"\` \\| \`"current"\` \\| \`"upcoming"\` \\| \`"completed"\` \\| \`"error"\` \\| \`"hidden"\`

Defined in: [core/src/types.ts:300](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L300)

Breadcrumb Status
`,T4="[**wizzard-packages**](../../../README.md)\n\n***\n\n[wizzard-packages](../../../README.md) / [core/src](../README.md) / Path\n\n# Type Alias: Path\\<T\\>\n\n> **Path**\\<`T`\\> = `T` *extends* `ReadonlyArray`\\<infer V\\> ? `IsTuple`\\<`T`\\> *extends* `true` ? `{ [K in TupleKeys<T>]-?: PathImpl<K & string, T[K]> }`\\[`TupleKeys`\\<`T`\\>\\] : `PathImpl`\\<`number`, `V`\\> : `{ [K in keyof T]-?: PathImpl<K & string, T[K]> }`\\[keyof `T`\\]\n\nDefined in: [core/src/utils/types.ts:18](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/utils/types.ts#L18)\n\nDot-notation path for a nested data type.\n\n## Type Parameters\n\n### T\n\n`T`\n",A4="[**wizzard-packages**](../../../README.md)\n\n***\n\n[wizzard-packages](../../../README.md) / [core/src](../README.md) / PathValue\n\n# Type Alias: PathValue\\<T, P\\>\n\n> **PathValue**\\<`T`, `P`\\> = `T` *extends* `any` ? `P` *extends* `` `${infer K}.${infer R}` `` ? `K` *extends* keyof `T` ? `R` *extends* [`Path`](Path.md)\\<`T`\\[`K`\\]\\> ? `PathValue`\\<`T`\\[`K`\\], `R`\\> : `never` : `K` *extends* `` `${number}` `` ? `T` *extends* `ReadonlyArray`\\<infer V\\> ? `R` *extends* [`Path`](Path.md)\\<`V`\\> ? `PathValue`\\<`V`, `R`\\> : `never` : `never` : `never` : `P` *extends* keyof `T` ? `T`\\[`P`\\] : `P` *extends* `` `${number}` `` ? `T` *extends* `ReadonlyArray`\\<infer V\\> ? `V` : `never` : `never` : `never`\n\nDefined in: [core/src/utils/types.ts:32](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/utils/types.ts#L32)\n\nValue type resolved from a dot-notation path.\n\n## Type Parameters\n\n### T\n\n`T`\n\n### P\n\n`P` *extends* [`Path`](Path.md)\\<`T`\\>\n",k4=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [core/src](../README.md) / PersistenceMode

# Type Alias: PersistenceMode

> **PersistenceMode** = \`"onStepChange"\` \\| \`"onChange"\` \\| \`"manual"\`

Defined in: [core/src/types.ts:132](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L132)

Persistence strategy for step data.
`,R4=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [core/src](../README.md) / StepDirection

# Type Alias: StepDirection

> **StepDirection** = \`"next"\` \\| \`"prev"\`

Defined in: [core/src/types.ts:152](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L152)

Step Navigation Direction
`,_4=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [core/src](../README.md) / ValidationMode

# Type Alias: ValidationMode

> **ValidationMode** = \`"onChange"\` \\| \`"onStepChange"\` \\| \`"manual"\`

Defined in: [core/src/types.ts:136](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L136)

Validation strategy for step data.
`,I4=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [core/src](../README.md) / ValidationResult

# Type Alias: ValidationResult

> **ValidationResult** = \`object\`

Defined in: [core/src/types.ts:117](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L117)

Validation Result Interface

## Properties

### errors?

> \`optional\` **errors**: \`Record\`\\<\`string\`, \`string\`\\>

Defined in: [core/src/types.ts:119](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L119)

***

### isValid

> **isValid**: \`boolean\`

Defined in: [core/src/types.ts:118](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L118)
`,M4='[**wizzard-packages**](../../../README.md)\n\n***\n\n[wizzard-packages](../../../README.md) / [core/src](../README.md) / WizardAction\n\n# Type Alias: WizardAction\\<T, StepId\\>\n\n> **WizardAction**\\<`T`, `StepId`\\> = \\{ `payload`: \\{ `config`: [`IWizardConfig`](../interfaces/IWizardConfig.md)\\<`T`, `StepId`\\>; `data`: `T`; \\}; `type`: `"INIT"`; \\} \\| \\{ `payload`: \\{ `options?`: `any`; `path`: `string`; `value`: `any`; \\}; `type`: `"SET_DATA"`; \\} \\| \\{ `payload`: \\{ `data`: `Partial`\\<`T`\\>; `options?`: `any`; \\}; `type`: `"UPDATE_DATA"`; \\} \\| \\{ `payload`: \\{ `from`: `StepId`; `nextHistory?`: `StepId`[]; `nextVisitedSteps?`: `Set`\\<`StepId`\\>; `result`: `boolean` \\| `null` \\| `"init"`; `to`: `StepId`; \\}; `type`: `"GO_TO_STEP"`; \\} \\| \\{ `payload`: \\{ `stepId`: `StepId`; \\}; `type`: `"VALIDATE_START"`; \\} \\| \\{ `payload`: \\{ `result`: [`ValidationResult`](ValidationResult.md); `stepId`: `StepId`; \\}; `type`: `"VALIDATE_END"`; \\} \\| \\{ `payload`: \\{ `errors`: `Record`\\<`string`, `string`\\> \\| `undefined` \\| `null`; `stepId`: `StepId`; \\}; `type`: `"SET_STEP_ERRORS"`; \\} \\| \\{ `payload`: \\{ `data`: `T`; \\}; `type`: `"RESET"`; \\} \\| \\{ `payload`: \\{ `meta`: `Partial`\\<[`IWizardState`](../interfaces/IWizardState.md)\\<`T`, `StepId`\\>\\>; \\}; `type`: `"UPDATE_META"`; \\} \\| \\{ `payload`: \\{ `stepId`: `StepId` \\| `""`; \\}; `type`: `"SET_CURRENT_STEP_ID"`; \\} \\| \\{ `payload`: \\{ `history`: `StepId`[]; \\}; `type`: `"SET_HISTORY"`; \\} \\| \\{ `payload`: \\{ `steps`: [`IStepConfig`](../interfaces/IStepConfig.md)\\<`T`, `StepId`\\>[]; \\}; `type`: `"SET_ACTIVE_STEPS"`; \\} \\| \\{ `payload`: \\{ `steps`: `Set`\\<`StepId`\\>; \\}; `type`: `"SET_VISITED_STEPS"`; \\} \\| \\{ `payload`: \\{ `steps`: `Set`\\<`StepId`\\>; \\}; `type`: `"SET_COMPLETED_STEPS"`; \\} \\| \\{ `payload`: \\{ `steps`: `Set`\\<`StepId`\\>; \\}; `type`: `"SET_ERROR_STEPS"`; \\} \\| \\{ `payload`: \\{ `snapshot`: `any`; \\}; `type`: `"RESTORE_SNAPSHOT"`; \\}\n\nDefined in: [core/src/types.ts:225](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L225)\n\nAction Types\n\n## Type Parameters\n\n### T\n\n`T` = `any`\n\n### StepId\n\n`StepId` *extends* `string` = `string`\n',C4=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [core/src](../README.md) / WizardEventHandler

# Type Alias: WizardEventHandler()\\<StepId\\>

> **WizardEventHandler**\\<\`StepId\`\\> = \\<\`E\`\\>(\`name\`, \`payload\`) => \`void\`

Defined in: [core/src/types.ts:292](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L292)

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
`,L4=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [core/src](../README.md) / WizardEventName

# Type Alias: WizardEventName

> **WizardEventName** = \`"step_change"\` \\| \`"validation_error"\` \\| \`"wizard_reset"\`

Defined in: [core/src/types.ts:274](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L274)

Standardized Event Names
`,W4=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [core/src](../README.md) / WizardEventPayloads

# Type Alias: WizardEventPayloads\\<StepId\\>

> **WizardEventPayloads**\\<\`StepId\`\\> = \`object\`

Defined in: [core/src/types.ts:279](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L279)

Event Payloads

## Type Parameters

### StepId

\`StepId\` *extends* \`string\` = \`string\`

## Properties

### step\\_change

> **step\\_change**: \`object\`

Defined in: [core/src/types.ts:280](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L280)

#### from

> **from**: \`StepId\` \\| \`null\`

#### timestamp

> **timestamp**: \`number\`

#### to

> **to**: \`StepId\`

***

### validation\\_error

> **validation\\_error**: \`object\`

Defined in: [core/src/types.ts:281](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L281)

#### errors

> **errors**: \`Record\`\\<\`string\`, \`string\`\\> \\| \`undefined\`

#### stepId

> **stepId**: \`StepId\`

#### timestamp

> **timestamp**: \`number\`

***

### wizard\\_reset

> **wizard\\_reset**: \`object\`

Defined in: [core/src/types.ts:286](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L286)

#### data

> **data**: \`any\`

#### timestamp?

> \`optional\` **timestamp**: \`number\`
`,O4=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [core/src](../README.md) / WizardMiddleware

# Type Alias: WizardMiddleware()\\<T, StepId\\>

> **WizardMiddleware**\\<\`T\`, \`StepId\`\\> = (\`api\`) => (\`next\`) => (\`action\`) => \`void\`

Defined in: [core/src/types.ts:267](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/core/src/types.ts#L267)

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
`,P4=`[**wizzard-packages**](../../README.md)

***

[wizzard-packages](../../README.md) / devtools/src

# devtools/src

## Interfaces

- [DevtoolsOptions](interfaces/DevtoolsOptions.md)
- [DevtoolsPlugin](interfaces/DevtoolsPlugin.md)
- [FlowGraphViewProps](interfaces/FlowGraphViewProps.md)
- [GraphView](interfaces/GraphView.md)
- [LayoutInfo](interfaces/LayoutInfo.md)
- [Outcome](interfaces/Outcome.md)
- [OutcomeError](interfaces/OutcomeError.md)
- [Pending](interfaces/Pending.md)
- [Recorder](interfaces/Recorder.md)
- [RecordOptions](interfaces/RecordOptions.md)
- [SessionBundle](interfaces/SessionBundle.md)
- [TakenEdge](interfaces/TakenEdge.md)
- [WizardDevtoolsProps](interfaces/WizardDevtoolsProps.md)

## Type Aliases

- [Tab](type-aliases/Tab.md)
- [WizardLike](type-aliases/WizardLike.md)

## Variables

- [EDGE\\_DRAW\\_CAP](variables/EDGE_DRAW_CAP.md)

## Functions

- [devtools](functions/devtools.md)
- [FlowGraphView](functions/FlowGraphView.md)
- [recordSession](functions/recordSession.md)
- [WizardDevtools](functions/WizardDevtools.md)
`,N4=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [devtools/src](../README.md) / FlowGraphView

# Function: FlowGraphView()

> **FlowGraphView**(\`__namedParameters\`): \`ReactNode\`

Defined in: [devtools/src/FlowGraphView.tsx:222](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/devtools/src/FlowGraphView.tsx#L222)

## Parameters

### \\_\\_namedParameters

[\`FlowGraphViewProps\`](../interfaces/FlowGraphViewProps.md)

## Returns

\`ReactNode\`
`,X4=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [devtools/src](../README.md) / WizardDevtools

# Function: WizardDevtools()

> **WizardDevtools**(\`__namedParameters\`): \`ReactNode\`

Defined in: [devtools/src/WizardDevtools.tsx:113](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/devtools/src/WizardDevtools.tsx#L113)

\`@wizzard-packages/devtools\`: the React panel, plus the headless pieces a
React host would otherwise import from a second entry.

\`/headless\` is the same objects without React, for a Vue host, a Node test
or a docs site.

The directive sits here rather than only on the component: a bundler reads
the entry it is given, and this is that file.

## Parameters

### \\_\\_namedParameters

[\`WizardDevtoolsProps\`](../interfaces/WizardDevtoolsProps.md)

## Returns

\`ReactNode\`
`,U4=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [devtools/src](../README.md) / devtools

# Function: devtools()

> **devtools**(\`options\`): [\`DevtoolsPlugin\`](../interfaces/DevtoolsPlugin.md)

Defined in: [devtools/src/headless/plugin.ts:71](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/devtools/src/headless/plugin.ts#L71)

## Parameters

### options

[\`DevtoolsOptions\`](../interfaces/DevtoolsOptions.md) = \`{}\`

## Returns

[\`DevtoolsPlugin\`](../interfaces/DevtoolsPlugin.md)
`,B4=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [devtools/src](../README.md) / recordSession

# Function: recordSession()

> **recordSession**(\`wizard\`, \`options\`): [\`Recorder\`](../interfaces/Recorder.md)

Defined in: [devtools/src/headless/record.ts:86](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/devtools/src/headless/record.ts#L86)

## Parameters

### wizard

[\`WizardLike\`](../type-aliases/WizardLike.md)

### options

[\`RecordOptions\`](../interfaces/RecordOptions.md) = \`{}\`

## Returns

[\`Recorder\`](../interfaces/Recorder.md)
`,Z4=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [devtools/src](../README.md) / DevtoolsOptions

# Interface: DevtoolsOptions

Defined in: [devtools/src/headless/plugin.ts:61](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/devtools/src/headless/plugin.ts#L61)

## Properties

### outcomes?

> \`optional\` **outcomes**: \`number\`

Defined in: [devtools/src/headless/plugin.ts:63](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/devtools/src/headless/plugin.ts#L63)

How many ended attempts to keep. Default 500.
`,j4=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [devtools/src](../README.md) / DevtoolsPlugin

# Interface: DevtoolsPlugin

Defined in: [devtools/src/headless/plugin.ts:45](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/devtools/src/headless/plugin.ts#L45)

## Extends

- \`Hooks\`

## Properties

### afterNavigate()?

> \`optional\` **afterNavigate**: (\`e\`) => \`void\`

Defined in: core/dist/navigate-DJkRL8XS.d.ts:105

#### Parameters

##### e

###### from

\`string\` \\| \`null\`

###### state

\`WizardState\`

###### to

\`string\`

#### Returns

\`void\`

#### Inherited from

\`Hooks.afterNavigate\`

***

### attached

> \`readonly\` **attached**: \`boolean\`

Defined in: [devtools/src/headless/plugin.ts:52](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/devtools/src/headless/plugin.ts#L52)

True between \`init\` and the wizard's \`destroy\`.

***

### beforeNavigate()?

> \`optional\` **beforeNavigate**: (\`e\`) => \`NavDecision\` \\| \`Promise\`\\<\`NavDecision\`\\>

Defined in: core/dist/navigate-DJkRL8XS.d.ts:100

#### Parameters

##### e

###### from

\`string\` \\| \`null\`

###### state

\`WizardState\`

###### to

\`string\` \\| \`null\`

#### Returns

\`NavDecision\` \\| \`Promise\`\\<\`NavDecision\`\\>

#### Inherited from

\`Hooks.beforeNavigate\`

***

### failure

> \`readonly\` **failure**: [\`OutcomeError\`](OutcomeError.md) \\| \`null\`

Defined in: [devtools/src/headless/plugin.ts:56](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/devtools/src/headless/plugin.ts#L56)

Set when a hook body or a subscriber threw; the panel shows it.

***

### init()?

> \`optional\` **init**: (\`host\`) => \`void\` \\| () => \`void\`

Defined in: core/dist/navigate-DJkRL8XS.d.ts:91

Runs once, when the engine is built, before anything reads it. A plugin
that restores a saved session does it here. The returned function, if any,
runs on \`destroy\`.

A commit made from inside \`init\` does not come back as \`onCommit\`: the
plugin already knows what it just wrote, and re-entering is how a restore
turns into a loop.

#### Parameters

##### host

\`PluginHost\`

#### Returns

\`void\` \\| () => \`void\`

#### Inherited from

\`Hooks.init\`

***

### lastRev

> \`readonly\` **lastRev**: \`number\`

Defined in: [devtools/src/headless/plugin.ts:54](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/devtools/src/headless/plugin.ts#L54)

\`rev\` of the last commit this plugin saw; behind the wizard's when it is not the installed instance.

***

### loadStep()?

> \`optional\` **loadStep**: (\`stepId\`, \`signal\`) => \`Promise\`\\<\`StepDef\` \\| \`undefined\`\\>

Defined in: core/dist/navigate-DJkRL8XS.d.ts:120

Supplies the body of a deferred step, typically over the network.

#### Parameters

##### stepId

\`string\`

##### signal

\`AbortSignal\`

#### Returns

\`Promise\`\\<\`StepDef\` \\| \`undefined\`\\>

#### Inherited from

\`Hooks.loadStep\`

***

### name

> \`readonly\` **name**: \`"devtools"\`

Defined in: [devtools/src/headless/plugin.ts:46](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/devtools/src/headless/plugin.ts#L46)

#### Overrides

\`Hooks.name\`

***

### onAttempt()?

> \`optional\` **onAttempt**: (\`attempt\`) => \`void\`

Defined in: core/dist/navigate-DJkRL8XS.d.ts:118

Every attempt to move, whether or not it commits. A refused \`next()\` never
writes, so \`onCommit\` cannot report it; this can, with the reason. Fired
by the store around the whole pipeline, never from inside it, and never
for \`cancel()\` - the aborted attempt ends here with its \`aborted\` result.

Observation only, like \`onCommit\`: throwing disables the plugin.

#### Parameters

##### attempt

\`Attempt\`

#### Returns

\`void\`

#### Inherited from

\`Hooks.onAttempt\`

***

### onCommit()?

> \`optional\` **onCommit**: (\`state\`, \`previous\`) => \`void\`

Defined in: core/dist/navigate-DJkRL8XS.d.ts:99

Every committed state, from any path - navigation, \`set\`, \`patch\`,
\`setCtx\`, \`reset\`, \`patchFlow\`. A plugin that persists writes here.

Not a veto and not a place to be slow: it runs inside the write, so
throwing disables the plugin rather than failing the write.

#### Parameters

##### state

\`WizardState\`

##### previous

\`WizardState\`

#### Returns

\`void\`

#### Inherited from

\`Hooks.onCommit\`

***

### outcomes

> \`readonly\` **outcomes**: readonly [\`Outcome\`](Outcome.md)[]

Defined in: [devtools/src/headless/plugin.ts:48](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/devtools/src/headless/plugin.ts#L48)

Ended attempts, oldest first, at most \`outcomes\` of them.

***

### pending

> \`readonly\` **pending**: [\`Pending\`](Pending.md) \\| \`null\`

Defined in: [devtools/src/headless/plugin.ts:50](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/devtools/src/headless/plugin.ts#L50)

The newest attempt that has started and not ended, if any.

## Methods

### subscribe()

> **subscribe**(\`listener\`): () => \`void\`

Defined in: [devtools/src/headless/plugin.ts:58](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/devtools/src/headless/plugin.ts#L58)

Fires on every outcome, pending change, attachment change and failure.

#### Parameters

##### listener

() => \`void\`

#### Returns

> (): \`void\`

##### Returns

\`void\`
`,V4=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [devtools/src](../README.md) / FlowGraphViewProps

# Interface: FlowGraphViewProps

Defined in: [devtools/src/FlowGraphView.tsx:43](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/devtools/src/FlowGraphView.tsx#L43)

## Properties

### activeStep?

> \`optional\` **activeStep**: \`string\` \\| \`null\`

Defined in: [devtools/src/FlowGraphView.tsx:49](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/devtools/src/FlowGraphView.tsx#L49)

The top frame's step, filled.

***

### graph

> **graph**: \`FlowGraph\`

Defined in: [devtools/src/FlowGraphView.tsx:44](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/devtools/src/FlowGraphView.tsx#L44)

***

### layout()?

> \`optional\` **layout**: (\`graph\`) => \`PositionedGraph\`

Defined in: [devtools/src/FlowGraphView.tsx:46](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/devtools/src/FlowGraphView.tsx#L46)

Default: the built-in layered layout.

#### Parameters

##### graph

\`FlowGraph\`

#### Returns

\`PositionedGraph\`

***

### onInspect()?

> \`optional\` **onInspect**: (\`id\`) => \`void\`

Defined in: [devtools/src/FlowGraphView.tsx:56](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/devtools/src/FlowGraphView.tsx#L56)

Enter, or a click on an already selected node.

#### Parameters

##### id

\`string\`

#### Returns

\`void\`

***

### onLayout()?

> \`optional\` **onLayout**: (\`info\`) => \`void\`

Defined in: [devtools/src/FlowGraphView.tsx:58](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/devtools/src/FlowGraphView.tsx#L58)

Told what was drawn, so the toolbar can report density and centre the view.

#### Parameters

##### info

[\`LayoutInfo\`](LayoutInfo.md)

#### Returns

\`void\`

***

### onSelect()?

> \`optional\` **onSelect**: (\`id\`) => \`void\`

Defined in: [devtools/src/FlowGraphView.tsx:54](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/devtools/src/FlowGraphView.tsx#L54)

#### Parameters

##### id

\`string\` | \`null\`

#### Returns

\`void\`

***

### selected?

> \`optional\` **selected**: \`string\` \\| \`null\`

Defined in: [devtools/src/FlowGraphView.tsx:53](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/devtools/src/FlowGraphView.tsx#L53)

The inspected node; drawn with a ring, independent of \`activeStep\`.

***

### takenEdge?

> \`optional\` **takenEdge**: [\`TakenEdge\`](TakenEdge.md) \\| \`null\`

Defined in: [devtools/src/FlowGraphView.tsx:51](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/devtools/src/FlowGraphView.tsx#L51)

***

### view

> **view**: [\`GraphView\`](GraphView.md)

Defined in: [devtools/src/FlowGraphView.tsx:47](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/devtools/src/FlowGraphView.tsx#L47)

***

### visited?

> \`optional\` **visited**: readonly \`string\`[]

Defined in: [devtools/src/FlowGraphView.tsx:50](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/devtools/src/FlowGraphView.tsx#L50)
`,H4=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [devtools/src](../README.md) / GraphView

# Interface: GraphView

Defined in: [devtools/src/FlowGraphView.tsx:23](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/devtools/src/FlowGraphView.tsx#L23)

Pan and zoom, owned by the caller so the toolbar can live outside the graph.

## Properties

### cx

> **cx**: \`number\` \\| \`null\`

Defined in: [devtools/src/FlowGraphView.tsx:27](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/devtools/src/FlowGraphView.tsx#L27)

Centre of the visible area, in user units. \`null\` centres on the graph.

***

### cy

> **cy**: \`number\` \\| \`null\`

Defined in: [devtools/src/FlowGraphView.tsx:28](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/devtools/src/FlowGraphView.tsx#L28)

***

### scale

> **scale**: \`number\`

Defined in: [devtools/src/FlowGraphView.tsx:25](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/devtools/src/FlowGraphView.tsx#L25)

1 fits the whole graph; larger zooms in.

***

### table

> **table**: \`boolean\`

Defined in: [devtools/src/FlowGraphView.tsx:30](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/devtools/src/FlowGraphView.tsx#L30)

Show the mirror table in place of the drawing.
`,q4=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [devtools/src](../README.md) / LayoutInfo

# Interface: LayoutInfo

Defined in: [devtools/src/FlowGraphView.tsx:34](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/devtools/src/FlowGraphView.tsx#L34)

What the caller needs to drive the toolbar: density, and where to centre.

## Properties

### active

> **active**: readonly \\[\`number\`, \`number\`\\] \\| \`null\`

Defined in: [devtools/src/FlowGraphView.tsx:40](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/devtools/src/FlowGraphView.tsx#L40)

Centre of the active node, for the Center button; null when none is drawn.

***

### drawn

> **drawn**: \`number\`

Defined in: [devtools/src/FlowGraphView.tsx:35](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/devtools/src/FlowGraphView.tsx#L35)

***

### height

> **height**: \`number\`

Defined in: [devtools/src/FlowGraphView.tsx:38](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/devtools/src/FlowGraphView.tsx#L38)

***

### total

> **total**: \`number\`

Defined in: [devtools/src/FlowGraphView.tsx:36](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/devtools/src/FlowGraphView.tsx#L36)

***

### width

> **width**: \`number\`

Defined in: [devtools/src/FlowGraphView.tsx:37](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/devtools/src/FlowGraphView.tsx#L37)
`,G4=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [devtools/src](../README.md) / Outcome

# Interface: Outcome

Defined in: [devtools/src/headless/plugin.ts:28](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/devtools/src/headless/plugin.ts#L28)

## Properties

### error?

> \`optional\` **error**: [\`OutcomeError\`](OutcomeError.md)

Defined in: [devtools/src/headless/plugin.ts:36](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/devtools/src/headless/plugin.ts#L36)

***

### id

> **id**: \`number\`

Defined in: [devtools/src/headless/plugin.ts:29](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/devtools/src/headless/plugin.ts#L29)

***

### intent

> **intent**: \`NavIntent\`

Defined in: [devtools/src/headless/plugin.ts:30](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/devtools/src/headless/plugin.ts#L30)

***

### result?

> \`optional\` **result**: \`NavResult\`

Defined in: [devtools/src/headless/plugin.ts:35](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/devtools/src/headless/plugin.ts#L35)

Exactly one of \`result\` and \`error\` is set.

***

### rev

> **rev**: \`number\`

Defined in: [devtools/src/headless/plugin.ts:33](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/devtools/src/headless/plugin.ts#L33)

\`rev\` when the attempt ended.

***

### source

> **source**: \`"call"\` \\| \`"start"\`

Defined in: [devtools/src/headless/plugin.ts:31](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/devtools/src/headless/plugin.ts#L31)
`,Y4=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [devtools/src](../README.md) / OutcomeError

# Interface: OutcomeError

Defined in: [devtools/src/headless/plugin.ts:22](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/devtools/src/headless/plugin.ts#L22)

A thrown value as data. An \`Error\` serialises to \`{}\`; this does not.

## Properties

### message

> **message**: \`string\`

Defined in: [devtools/src/headless/plugin.ts:24](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/devtools/src/headless/plugin.ts#L24)

***

### name

> **name**: \`string\`

Defined in: [devtools/src/headless/plugin.ts:23](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/devtools/src/headless/plugin.ts#L23)

***

### stack?

> \`optional\` **stack**: \`string\`

Defined in: [devtools/src/headless/plugin.ts:25](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/devtools/src/headless/plugin.ts#L25)
`,F4=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [devtools/src](../README.md) / Pending

# Interface: Pending

Defined in: [devtools/src/headless/plugin.ts:39](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/devtools/src/headless/plugin.ts#L39)

## Properties

### id

> **id**: \`number\`

Defined in: [devtools/src/headless/plugin.ts:40](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/devtools/src/headless/plugin.ts#L40)

***

### intent

> **intent**: \`NavIntent\`

Defined in: [devtools/src/headless/plugin.ts:41](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/devtools/src/headless/plugin.ts#L41)

***

### source

> **source**: \`"call"\` \\| \`"start"\`

Defined in: [devtools/src/headless/plugin.ts:42](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/devtools/src/headless/plugin.ts#L42)
`,Q4=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [devtools/src](../README.md) / RecordOptions

# Interface: RecordOptions

Defined in: [devtools/src/headless/record.ts:42](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/devtools/src/headless/record.ts#L42)

## Properties

### limits?

> \`optional\` **limits**: \`object\`

Defined in: [devtools/src/headless/record.ts:50](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/devtools/src/headless/record.ts#L50)

Defaults: 2000 frames, 500 outcomes. Reaching either stops the recording.

#### frames?

> \`optional\` **frames**: \`number\`

#### outcomes?

> \`optional\` **outcomes**: \`number\`

***

### plugin?

> \`optional\` **plugin**: [\`DevtoolsPlugin\`](DevtoolsPlugin.md)

Defined in: [devtools/src/headless/record.ts:44](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/devtools/src/headless/record.ts#L44)

Outcomes come from here; \`[]\` without it.

***

### redact()?

> \`optional\` **redact**: (\`bundle\`) => [\`SessionBundle\`](SessionBundle.md)

Defined in: [devtools/src/headless/record.ts:48](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/devtools/src/headless/record.ts#L48)

Runs once, at export, on a copy of the whole bundle.

#### Parameters

##### bundle

[\`SessionBundle\`](SessionBundle.md)

#### Returns

[\`SessionBundle\`](SessionBundle.md)

***

### subFlows?

> \`optional\` **subFlows**: \`Readonly\`\\<\`Record\`\\<\`string\`, \`FlowDefinition\`\\>\\>

Defined in: [devtools/src/headless/record.ts:46](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/devtools/src/headless/record.ts#L46)

Copied into the bundle so it replays alone.
`,K4=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [devtools/src](../README.md) / Recorder

# Interface: Recorder

Defined in: [devtools/src/headless/record.ts:53](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/devtools/src/headless/record.ts#L53)

## Properties

### capped

> \`readonly\` **capped**: \`false\` \\| \`"frames"\` \\| \`"outcomes"\`

Defined in: [devtools/src/headless/record.ts:63](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/devtools/src/headless/record.ts#L63)

***

### frames

> \`readonly\` **frames**: \`number\`

Defined in: [devtools/src/headless/record.ts:62](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/devtools/src/headless/record.ts#L62)

***

### stopped

> \`readonly\` **stopped**: \`boolean\`

Defined in: [devtools/src/headless/record.ts:65](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/devtools/src/headless/record.ts#L65)

***

### stopping

> \`readonly\` **stopping**: \`boolean\`

Defined in: [devtools/src/headless/record.ts:64](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/devtools/src/headless/record.ts#L64)

## Methods

### bundle()

> **bundle**(): [\`SessionBundle\`](SessionBundle.md)

Defined in: [devtools/src/headless/record.ts:55](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/devtools/src/headless/record.ts#L55)

Copies, redacts, measures. Never mutates the frames or the wizard.

#### Returns

[\`SessionBundle\`](SessionBundle.md)

***

### stop()

> **stop**(): \`void\`

Defined in: [devtools/src/headless/record.ts:61](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/devtools/src/headless/record.ts#L61)

Ends the recording. Called before any settled frame exists - a recording
started while a navigation was in flight - it waits for the first one, so
a bundle is never produced with zero frames.

#### Returns

\`void\`
`,J4=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [devtools/src](../README.md) / SessionBundle

# Interface: SessionBundle

Defined in: [devtools/src/headless/record.ts:31](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/devtools/src/headless/record.ts#L31)

## Properties

### flow

> **flow**: \`FlowDefinition\`

Defined in: [devtools/src/headless/record.ts:34](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/devtools/src/headless/record.ts#L34)

***

### meta

> **meta**: \`BundleMeta\`

Defined in: [devtools/src/headless/record.ts:39](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/devtools/src/headless/record.ts#L39)

***

### outcomes

> **outcomes**: readonly [\`Outcome\`](Outcome.md)[]

Defined in: [devtools/src/headless/record.ts:38](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/devtools/src/headless/record.ts#L38)

***

### session

> **session**: \`RecordedSession\`

Defined in: [devtools/src/headless/record.ts:37](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/devtools/src/headless/record.ts#L37)

Core's format, unchanged: \`checkSession\` validates it.

***

### subFlows?

> \`optional\` **subFlows**: \`Readonly\`\\<\`Record\`\\<\`string\`, \`FlowDefinition\`\\>\\>

Defined in: [devtools/src/headless/record.ts:35](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/devtools/src/headless/record.ts#L35)

***

### version

> **version**: \`1\`

Defined in: [devtools/src/headless/record.ts:33](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/devtools/src/headless/record.ts#L33)

The format. A reader rejects any other number.
`,$4=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [devtools/src](../README.md) / TakenEdge

# Interface: TakenEdge

Defined in: [devtools/src/FlowGraphView.tsx:17](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/devtools/src/FlowGraphView.tsx#L17)

The edge the wizard is inferred to have taken, drawn thick (§12.4).

## Properties

### from

> **from**: \`string\`

Defined in: [devtools/src/FlowGraphView.tsx:18](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/devtools/src/FlowGraphView.tsx#L18)

***

### to

> **to**: \`string\`

Defined in: [devtools/src/FlowGraphView.tsx:19](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/devtools/src/FlowGraphView.tsx#L19)
`,eE=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [devtools/src](../README.md) / WizardDevtoolsProps

# Interface: WizardDevtoolsProps

Defined in: [devtools/src/WizardDevtools.tsx:45](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/devtools/src/WizardDevtools.tsx#L45)

## Properties

### defaultTab?

> \`optional\` **defaultTab**: [\`Tab\`](../type-aliases/Tab.md)

Defined in: [devtools/src/WizardDevtools.tsx:55](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/devtools/src/WizardDevtools.tsx#L55)

***

### layout()?

> \`optional\` **layout**: (\`graph\`) => \`PositionedGraph\`

Defined in: [devtools/src/WizardDevtools.tsx:51](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/devtools/src/WizardDevtools.tsx#L51)

#### Parameters

##### graph

\`FlowGraph\`

#### Returns

\`PositionedGraph\`

***

### limits?

> \`optional\` **limits**: \`object\`

Defined in: [devtools/src/WizardDevtools.tsx:56](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/devtools/src/WizardDevtools.tsx#L56)

#### activity?

> \`optional\` **activity**: \`number\`

#### diffRows?

> \`optional\` **diffRows**: \`number\`

#### frames?

> \`optional\` **frames**: \`number\`

***

### onRecord()?

> \`optional\` **onRecord**: (\`bundle\`) => \`void\`

Defined in: [devtools/src/WizardDevtools.tsx:54](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/devtools/src/WizardDevtools.tsx#L54)

#### Parameters

##### bundle

[\`SessionBundle\`](SessionBundle.md)

#### Returns

\`void\`

***

### plugin?

> \`optional\` **plugin**: [\`DevtoolsPlugin\`](DevtoolsPlugin.md)

Defined in: [devtools/src/WizardDevtools.tsx:49](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/devtools/src/WizardDevtools.tsx#L49)

The same object passed to \`createWizard({ plugins: [dt] })\`. Without it, no refusal rows.

***

### redact()?

> \`optional\` **redact**: (\`bundle\`) => [\`SessionBundle\`](SessionBundle.md)

Defined in: [devtools/src/WizardDevtools.tsx:53](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/devtools/src/WizardDevtools.tsx#L53)

Runs once, at export, on a copy of the whole bundle.

#### Parameters

##### bundle

[\`SessionBundle\`](SessionBundle.md)

#### Returns

[\`SessionBundle\`](SessionBundle.md)

***

### subFlows?

> \`optional\` **subFlows**: \`Readonly\`\\<\`Record\`\\<\`string\`, \`FlowDefinition\`\\>\\>

Defined in: [devtools/src/WizardDevtools.tsx:50](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/devtools/src/WizardDevtools.tsx#L50)

***

### wizard?

> \`optional\` **wizard**: [\`WizardLike\`](../type-aliases/WizardLike.md)

Defined in: [devtools/src/WizardDevtools.tsx:47](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/devtools/src/WizardDevtools.tsx#L47)

Default: the wizard from \`WizardProvider\`.
`,nE=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [devtools/src](../README.md) / Tab

# Type Alias: Tab

> **Tab** = \`"graph"\` \\| \`"state"\` \\| \`"activity"\`

Defined in: [devtools/src/WizardDevtools.tsx:43](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/devtools/src/WizardDevtools.tsx#L43)

The panel. It watches one wizard and answers one question - why is the
wizard where it is - with three views over one snapshot: the flow it is
standing in, the state it committed, and what it did to get there.

It never navigates, never writes and never throws into the host. The three
things a person can point at are independent by design (§12.3): the time
being observed, the flow being inspected, and the node being examined. A
commit moves the first and touches neither of the others, so reading a
refusal does not lose the page you were reading it on.
`,tE='[**wizzard-packages**](../../../README.md)\n\n***\n\n[wizzard-packages](../../../README.md) / [devtools/src](../README.md) / WizardLike\n\n# Type Alias: WizardLike\n\n> **WizardLike** = `Pick`\\<`Wizard`, `"subscribe"` \\| `"getState"` \\| `"getFlow"`\\> & `Partial`\\<`Pick`\\<`Wizard`, `"isDestroyed"`\\>\\>\n\nDefined in: [devtools/src/headless/record.ts:16](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/devtools/src/headless/record.ts#L16)\n\nRecords a wizard into a bundle another developer can replay without the\nsender\'s application: the flow, its sub-flows, the settled states in order,\nthe attempts that ended while recording, and what was left out.\n\nPure over the `Wizard` interface, so a test or a Node script records the\nsame file the panel\'s Record button does.\n',aE=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [devtools/src](../README.md) / EDGE\\_DRAW\\_CAP

# Variable: EDGE\\_DRAW\\_CAP

> \`const\` **EDGE\\_DRAW\\_CAP**: \`1500\` = \`1500\`

Defined in: [devtools/src/FlowGraphView.tsx:67](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/devtools/src/FlowGraphView.tsx#L67)

A dense flow is dense in edges, not nodes: \`graph.ts\` emits an \`order\` edge
from a step to every later conditional one, so 200 conditional steps make
~20 000 edges. The layout handles them; the DOM does not, so the drawing
stops here and the mirror table stays complete (§14.8).
`,iE=`[**wizzard-packages**](../../README.md)

***

[wizzard-packages](../../README.md) / middleware/src

# middleware/src

## Variables

- [devToolsMiddleware](variables/devToolsMiddleware.md)
- [loggerMiddleware](variables/loggerMiddleware.md)
`,rE=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [middleware/src](../README.md) / devToolsMiddleware

# Variable: devToolsMiddleware

> \`const\` **devToolsMiddleware**: [\`WizardMiddleware\`](../../../react/src/type-aliases/WizardMiddleware.md)\\<\`any\`, \`any\`\\>

Defined in: [middleware/src/devToolsMiddleware.ts:49](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/middleware/src/devToolsMiddleware.ts#L49)

Middleware for Redux DevTools integration.
`,lE=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [middleware/src](../README.md) / loggerMiddleware

# Variable: loggerMiddleware

> \`const\` **loggerMiddleware**: [\`WizardMiddleware\`](../../../react/src/type-aliases/WizardMiddleware.md)\\<\`any\`, \`any\`\\>

Defined in: [middleware/src/loggerMiddleware.ts:6](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/middleware/src/loggerMiddleware.ts#L6)

Simple logger middleware for Wizard actions
`,sE=`[**wizzard-packages**](../../README.md)

***

[wizzard-packages](../../README.md) / persistence/src

# persistence/src

## Classes

- [LocalStorageAdapter](classes/LocalStorageAdapter.md)
- [MemoryAdapter](classes/MemoryAdapter.md)
`,oE=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [persistence/src](../README.md) / LocalStorageAdapter

# Class: LocalStorageAdapter

Defined in: [persistence/src/LocalStorageAdapter.ts:6](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/persistence/src/LocalStorageAdapter.ts#L6)

Browser persistence adapter backed by localStorage.

## Implements

- \`IPersistenceAdapter\`

## Constructors

### Constructor

> **new LocalStorageAdapter**(\`prefix\`): \`LocalStorageAdapter\`

Defined in: [persistence/src/LocalStorageAdapter.ts:9](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/persistence/src/LocalStorageAdapter.ts#L9)

#### Parameters

##### prefix

\`string\` = \`'wizard_'\`

#### Returns

\`LocalStorageAdapter\`

## Methods

### clear()

> **clear**(): \`void\`

Defined in: [persistence/src/LocalStorageAdapter.ts:69](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/persistence/src/LocalStorageAdapter.ts#L69)

#### Returns

\`void\`

#### Implementation of

\`IPersistenceAdapter.clear\`

***

### clearStep()

> **clearStep**(\`stepId\`): \`void\`

Defined in: [persistence/src/LocalStorageAdapter.ts:60](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/persistence/src/LocalStorageAdapter.ts#L60)

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

Defined in: [persistence/src/LocalStorageAdapter.ts:27](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/persistence/src/LocalStorageAdapter.ts#L27)

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

Defined in: [persistence/src/LocalStorageAdapter.ts:44](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/persistence/src/LocalStorageAdapter.ts#L44)

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

Defined in: [persistence/src/LocalStorageAdapter.ts:17](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/persistence/src/LocalStorageAdapter.ts#L17)

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
`,cE=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [persistence/src](../README.md) / MemoryAdapter

# Class: MemoryAdapter

Defined in: [persistence/src/MemoryAdapter.ts:6](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/persistence/src/MemoryAdapter.ts#L6)

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

Defined in: [persistence/src/MemoryAdapter.ts:27](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/persistence/src/MemoryAdapter.ts#L27)

#### Returns

\`void\`

#### Implementation of

\`IPersistenceAdapter.clear\`

***

### clearStep()

> **clearStep**(\`stepId\`): \`void\`

Defined in: [persistence/src/MemoryAdapter.ts:23](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/persistence/src/MemoryAdapter.ts#L23)

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

Defined in: [persistence/src/MemoryAdapter.ts:13](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/persistence/src/MemoryAdapter.ts#L13)

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

Defined in: [persistence/src/MemoryAdapter.ts:17](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/persistence/src/MemoryAdapter.ts#L17)

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

Defined in: [persistence/src/MemoryAdapter.ts:9](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/persistence/src/MemoryAdapter.ts#L9)

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
`,uE=`[**wizzard-packages**](../../README.md)

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
`,dE=`[**wizzard-packages**](../../../README.md)

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
`,fE=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [react/src](../README.md) / WizardProvider

# Function: WizardProvider()

> **WizardProvider**\\<\`T\`, \`StepId\`\\>(\`__namedParameters\`): \`Element\`

Defined in: [react/src/context/WizardContext.tsx:61](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/react/src/context/WizardContext.tsx#L61)

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
`,pE="[**wizzard-packages**](../../../README.md)\n\n***\n\n[wizzard-packages](../../../README.md) / [react/src](../README.md) / createWizardFactory\n\n# Function: createWizardFactory()\n\n> **createWizardFactory**\\<`TSchema`, `StepId`\\>(): `object`\n\nDefined in: [react/src/factory.tsx:30](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/react/src/factory.tsx#L30)\n\ncreateWizardFactory\n\nCreates a strongly-typed set of Wizard components and hooks for a specific data schema.\n\n## Type Parameters\n\n### TSchema\n\n`TSchema` *extends* `Record`\\<`string`, `any`\\>\n\nThe shape of your wizard's global data state\n\n### StepId\n\n`StepId` *extends* `string` = `string`\n\n## Returns\n\n`object`\n\n### createStep()\n\n> **createStep**: (`config`) => [`IStepConfig`](../interfaces/IStepConfig.md)\\<`TSchema`, `StepId`\\>\n\n#### Parameters\n\n##### config\n\n[`IStepConfig`](../interfaces/IStepConfig.md)\\<`TSchema`, `StepId`\\>\n\n#### Returns\n\n[`IStepConfig`](../interfaces/IStepConfig.md)\\<`TSchema`, `StepId`\\>\n\n### useBreadcrumbs()\n\n> **useBreadcrumbs**: () => `IBreadcrumb`\\<`StepId`\\>[]\n\n#### Returns\n\n`IBreadcrumb`\\<`StepId`\\>[]\n\n### useWizard()\n\n> **useWizard**: () => [`IWizardContext`](../interfaces/IWizardContext.md)\\<`TSchema`, `StepId`\\>\n\n#### Returns\n\n[`IWizardContext`](../interfaces/IWizardContext.md)\\<`TSchema`, `StepId`\\>\n\n### useWizardActions()\n\n> **useWizardActions**: () => [`IWizardActionsTyped`](../type-aliases/IWizardActionsTyped.md)\\<`TSchema`, `StepId`\\>\n\n#### Returns\n\n[`IWizardActionsTyped`](../type-aliases/IWizardActionsTyped.md)\\<`TSchema`, `StepId`\\>\n\n### useWizardContext()\n\n> **useWizardContext**: () => `any`\n\n#### Returns\n\n`any`\n\n### useWizardError()\n\n> **useWizardError**: \\<`P`\\>(`path`) => `string` \\| `undefined`\n\n#### Type Parameters\n\n##### P\n\n`P` *extends* `string`\n\n#### Parameters\n\n##### path\n\n`P`\n\n#### Returns\n\n`string` \\| `undefined`\n\n### useWizardField()\n\n> **useWizardField**: \\<`P`\\>(`path`, `options?`) => \\[`PathValue`\\<`TSchema`, `P`\\>, (`value`) => `void`\\]\n\n#### Type Parameters\n\n##### P\n\n`P` *extends* `string`\n\n#### Parameters\n\n##### path\n\n`P`\n\n##### options?\n\n\\{ `isEqual?`: (`a`, `b`) => `boolean`; \\} | (`a`, `b`) => `boolean`\n\n#### Returns\n\n\\[`PathValue`\\<`TSchema`, `P`\\>, (`value`) => `void`\\]\n\n### useWizardSelector()\n\n> **useWizardSelector**: \\<`TSelected`\\>(`selector`, `options?`) => `TSelected`\n\n#### Type Parameters\n\n##### TSelected\n\n`TSelected`\n\n#### Parameters\n\n##### selector\n\n(`state`) => `TSelected`\n\n##### options?\n\n\\{ `isEqual?`: (`a`, `b`) => `boolean`; \\} | (`a`, `b`) => `boolean`\n\n#### Returns\n\n`TSelected`\n\n### useWizardShallowSelector()\n\n> **useWizardShallowSelector**: \\<`TSelected`\\>(`selector`) => `TSelected`\n\n#### Type Parameters\n\n##### TSelected\n\n`TSelected`\n\n#### Parameters\n\n##### selector\n\n(`state`) => `TSelected`\n\n#### Returns\n\n`TSelected`\n\n### useWizardState()\n\n> **useWizardState**: () => [`IWizardState`](../interfaces/IWizardState.md)\\<`TSchema`, `StepId`\\>\n\n#### Returns\n\n[`IWizardState`](../interfaces/IWizardState.md)\\<`TSchema`, `StepId`\\>\n\n### useWizardValue()\n\n> **useWizardValue**: \\<`P`\\>(`path`, `options?`) => `PathValue`\\<`TSchema`, `P`\\>\n\n#### Type Parameters\n\n##### P\n\n`P` *extends* `string`\n\n#### Parameters\n\n##### path\n\n`P`\n\n##### options?\n\n\\{ `isEqual?`: (`a`, `b`) => `boolean`; \\} | (`a`, `b`) => `boolean`\n\n#### Returns\n\n`PathValue`\\<`TSchema`, `P`\\>\n\n### WizardProvider()\n\n> **WizardProvider**: (`__namedParameters`) => `Element`\n\n#### Parameters\n\n##### \\_\\_namedParameters\n\n###### children\n\n`ReactNode`\n\n###### config\n\n[`IWizardConfig`](../interfaces/IWizardConfig.md)\\<`TSchema`, `StepId`\\>\n\n###### initialData?\n\n`Partial`\\<`TSchema`\\>\n\n###### initialStepId?\n\n`StepId`\n\n#### Returns\n\n`Element`\n",hE="[**wizzard-packages**](../../../README.md)\n\n***\n\n[wizzard-packages](../../../README.md) / [react/src](../README.md) / createWizardHooks\n\n# Function: createWizardHooks()\n\n> **createWizardHooks**\\<`T`, `StepId`\\>(`store`, `actions?`): `object`\n\nDefined in: [react/src/store.ts:542](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/react/src/store.ts#L542)\n\nHelper: build store-bound hooks for a single store instance.\n\n## Type Parameters\n\n### T\n\n`T`\n\n### StepId\n\n`StepId` *extends* `string` = `string`\n\n## Parameters\n\n### store\n\n`IWizardStore`\\<`T`, `StepId`\\>\n\n### actions?\n\n[`IWizardActionsTyped`](../type-aliases/IWizardActionsTyped.md)\\<`T`, `StepId`\\>\n\n## Returns\n\n`object`\n\n### useWizardError()\n\n> **useWizardError**: (`path`) => `string` \\| `undefined`\n\n#### Parameters\n\n##### path\n\n`string`\n\n#### Returns\n\n`string` \\| `undefined`\n\n### useWizardField()\n\n> **useWizardField**: \\<`P`\\>(`path`, `options?`) => \\[`PathValue`\\<`T`, `P`\\>, (`value`) => `void`\\]\n\n#### Type Parameters\n\n##### P\n\n`P` *extends* `string`\n\n#### Parameters\n\n##### path\n\n`P`\n\n##### options?\n\n###### isEqual?\n\n(`a`, `b`) => `boolean`\n\n#### Returns\n\n\\[`PathValue`\\<`T`, `P`\\>, (`value`) => `void`\\]\n\n### useWizardSelector()\n\n> **useWizardSelector**: \\<`TSelected`\\>(`selector`, `options?`) => `TSelected`\n\n#### Type Parameters\n\n##### TSelected\n\n`TSelected`\n\n#### Parameters\n\n##### selector\n\n(`state`) => `TSelected`\n\n##### options?\n\n###### isEqual?\n\n(`a`, `b`) => `boolean`\n\n#### Returns\n\n`TSelected`\n\n### useWizardState()\n\n> **useWizardState**: () => [`IWizardState`](../interfaces/IWizardState.md)\\<`T`, `StepId`\\>\n\n#### Returns\n\n[`IWizardState`](../interfaces/IWizardState.md)\\<`T`, `StepId`\\>\n\n### useWizardValue()\n\n> **useWizardValue**: \\<`P`\\>(`path`, `options?`) => `PathValue`\\<`T`, `P`\\>\n\n#### Type Parameters\n\n##### P\n\n`P` *extends* `string`\n\n#### Parameters\n\n##### path\n\n`P`\n\n##### options?\n\n###### isEqual?\n\n(`a`, `b`) => `boolean`\n\n#### Returns\n\n`PathValue`\\<`T`, `P`\\>\n",mE="[**wizzard-packages**](../../../README.md)\n\n***\n\n[wizzard-packages](../../../README.md) / [react/src](../README.md) / createWizardStore\n\n# Function: createWizardStore()\n\n> **createWizardStore**\\<`T`, `StepId`\\>(`options`): [`WizardStoreBundle`](../interfaces/WizardStoreBundle.md)\\<`T`, `StepId`\\>\n\nDefined in: [react/src/store.ts:384](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/react/src/store.ts#L384)\n\nCreate a standalone store + actions bundle without React Context.\n\n## Type Parameters\n\n### T\n\n`T` *extends* `Record`\\<`string`, `any`\\>\n\n### StepId\n\n`StepId` *extends* `string` = `string`\n\n## Parameters\n\n### options\n\n[`CreateWizardStoreOptions`](../interfaces/CreateWizardStoreOptions.md)\\<`T`, `StepId`\\>\n\n## Returns\n\n[`WizardStoreBundle`](../interfaces/WizardStoreBundle.md)\\<`T`, `StepId`\\>\n",bE=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [react/src](../README.md) / useWizard

# Function: useWizard()

> **useWizard**\\<\`T\`, \`StepId\`\\>(): \`IWizardContext\`\\<\`T\`, \`StepId\`\\>

Defined in: [react/src/hooks/useWizard.ts:7](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/react/src/hooks/useWizard.ts#L7)

Alias for useWizardContext.

## Type Parameters

### T

\`T\` = \`any\`

### StepId

\`StepId\` *extends* \`string\` = \`string\`

## Returns

\`IWizardContext\`\\<\`T\`, \`StepId\`\\>
`,gE=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [react/src](../README.md) / useWizardActions

# Function: useWizardActions()

> **useWizardActions**\\<\`StepId\`\\>(): [\`IWizardActions\`](../interfaces/IWizardActions.md)\\<\`StepId\`\\>

Defined in: [react/src/context/WizardContext.tsx:689](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/react/src/context/WizardContext.tsx#L689)

Returns the wizard actions API.

## Type Parameters

### StepId

\`StepId\` *extends* \`string\` = \`string\`

## Returns

[\`IWizardActions\`](../interfaces/IWizardActions.md)\\<\`StepId\`\\>
`,zE="[**wizzard-packages**](../../../README.md)\n\n***\n\n[wizzard-packages](../../../README.md) / [react/src](../README.md) / useWizardAllErrors\n\n# Function: useWizardAllErrors()\n\n> **useWizardAllErrors**\\<`T`, `StepId`\\>(): `Record`\\<`StepId`, `Record`\\<`string`, `string`\\>\\>\n\nDefined in: [react/src/context/WizardContext.tsx:767](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/react/src/context/WizardContext.tsx#L767)\n\nReturns all errors by step (shallow-equal).\n\n## Type Parameters\n\n### T\n\n`T` = `any`\n\n### StepId\n\n`StepId` *extends* `string` = `string`\n\n## Returns\n\n`Record`\\<`StepId`, `Record`\\<`string`, `string`\\>\\>\n",yE=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [react/src](../README.md) / useWizardContext

# Function: useWizardContext()

> **useWizardContext**\\<\`T\`, \`StepId\`\\>(): [\`IWizardContext\`](../interfaces/IWizardContext.md)\\<\`T\`, \`StepId\`\\>

Defined in: [react/src/context/WizardContext.tsx:698](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/react/src/context/WizardContext.tsx#L698)

Returns combined wizard state, actions, and derived errors.

## Type Parameters

### T

\`T\` = \`any\`

### StepId

\`StepId\` *extends* \`string\` = \`string\`

## Returns

[\`IWizardContext\`](../interfaces/IWizardContext.md)\\<\`T\`, \`StepId\`\\>
`,vE="[**wizzard-packages**](../../../README.md)\n\n***\n\n[wizzard-packages](../../../README.md) / [react/src](../README.md) / useWizardCurrentStep\n\n# Function: useWizardCurrentStep()\n\n> **useWizardCurrentStep**\\<`T`, `StepId`\\>(): [`IStepConfig`](../interfaces/IStepConfig.md)\\<`T`, `StepId`\\> \\| `null`\n\nDefined in: [react/src/context/WizardContext.tsx:732](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/react/src/context/WizardContext.tsx#L732)\n\nReturns current step config.\n\n## Type Parameters\n\n### T\n\n`T` = `any`\n\n### StepId\n\n`StepId` *extends* `string` = `string`\n\n## Returns\n\n[`IStepConfig`](../interfaces/IStepConfig.md)\\<`T`, `StepId`\\> \\| `null`\n",SE=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [react/src](../README.md) / useWizardError

# Function: useWizardError()

> **useWizardError**(\`path\`): \`string\` \\| \`undefined\`

Defined in: [react/src/context/WizardContext.tsx:623](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/react/src/context/WizardContext.tsx#L623)

Returns the first error message for a path across all steps.

## Parameters

### path

\`string\`

## Returns

\`string\` \\| \`undefined\`
`,EE="[**wizzard-packages**](../../../README.md)\n\n***\n\n[wizzard-packages](../../../README.md) / [react/src](../README.md) / useWizardField\n\n# Function: useWizardField()\n\n> **useWizardField**\\<`T`, `P`\\>(`path`, `options?`): \\[`PathValue`\\<`T`, `P`\\>, (`value`) => `void`\\]\n\nDefined in: [react/src/context/WizardContext.tsx:604](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/react/src/context/WizardContext.tsx#L604)\n\nReturns a value and setter for a path (useState-like API).\n\n## Type Parameters\n\n### T\n\n`T`\n\n### P\n\n`P` *extends* `string`\n\n## Parameters\n\n### path\n\n`P`\n\n### options?\n\n#### isEqual?\n\n(`a`, `b`) => `boolean`\n\n## Returns\n\n\\[`PathValue`\\<`T`, `P`\\>, (`value`) => `void`\\]\n",DE=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [react/src](../README.md) / useWizardFlatErrors

# Function: useWizardFlatErrors()

> **useWizardFlatErrors**\\<\`T\`, \`StepId\`\\>(): \`Record\`\\<\`string\`, \`string\`\\>

Defined in: [react/src/context/WizardContext.tsx:776](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/react/src/context/WizardContext.tsx#L776)

Returns flattened errors map (path -> message).

## Type Parameters

### T

\`T\` = \`any\`

### StepId

\`StepId\` *extends* \`string\` = \`string\`

## Returns

\`Record\`\\<\`string\`, \`string\`\\>
`,wE=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [react/src](../README.md) / useWizardMeta

# Function: useWizardMeta()

> **useWizardMeta**\\<\`T\`, \`StepId\`\\>(): \`object\`

Defined in: [react/src/context/WizardContext.tsx:746](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/react/src/context/WizardContext.tsx#L746)

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
`,xE=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [react/src](../README.md) / useWizardSelector

# Function: useWizardSelector()

> **useWizardSelector**\\<\`TSelected\`\\>(\`selector\`, \`options?\`): \`TSelected\`

Defined in: [react/src/context/WizardContext.tsx:640](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/react/src/context/WizardContext.tsx#L640)

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
`,TE=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [react/src](../README.md) / useWizardState

# Function: useWizardState()

> **useWizardState**\\<\`T\`, \`StepId\`\\>(): [\`IWizardState\`](../interfaces/IWizardState.md)\\<\`T\`, \`StepId\`\\>

Defined in: [react/src/context/WizardContext.tsx:552](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/react/src/context/WizardContext.tsx#L552)

Reads the full wizard state.

## Type Parameters

### T

\`T\` = \`unknown\`

### StepId

\`StepId\` *extends* \`string\` = \`string\`

## Returns

[\`IWizardState\`](../interfaces/IWizardState.md)\\<\`T\`, \`StepId\`\\>
`,AE=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [react/src](../README.md) / useWizardSteps

# Function: useWizardSteps()

> **useWizardSteps**\\<\`T\`, \`StepId\`\\>(): [\`IStepConfig\`](../interfaces/IStepConfig.md)\\<\`T\`, \`StepId\`\\>[]

Defined in: [react/src/context/WizardContext.tsx:739](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/react/src/context/WizardContext.tsx#L739)

Returns active steps list.

## Type Parameters

### T

\`T\` = \`any\`

### StepId

\`StepId\` *extends* \`string\` = \`string\`

## Returns

[\`IStepConfig\`](../interfaces/IStepConfig.md)\\<\`T\`, \`StepId\`\\>[]
`,kE=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [react/src](../README.md) / useWizardStoreError

# Function: useWizardStoreError()

> **useWizardStoreError**(\`store\`, \`path\`): \`string\` \\| \`undefined\`

Defined in: [react/src/store.ts:478](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/react/src/store.ts#L478)

Hook: read the first error for a path without React Context.

## Parameters

### store

\`IWizardStore\`\\<\`any\`, \`any\`\\>

### path

\`string\`

## Returns

\`string\` \\| \`undefined\`
`,RE="[**wizzard-packages**](../../../README.md)\n\n***\n\n[wizzard-packages](../../../README.md) / [react/src](../README.md) / useWizardStoreField\n\n# Function: useWizardStoreField()\n\n> **useWizardStoreField**\\<`T`, `P`\\>(`store`, `setData`, `path`, `options?`): \\[`PathValue`\\<`T`, `P`\\>, (`value`) => `void`\\]\n\nDefined in: [react/src/store.ts:458](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/react/src/store.ts#L458)\n\nHook: value + setter for a path without React Context.\n\n## Type Parameters\n\n### T\n\n`T`\n\n### P\n\n`P` *extends* `string`\n\n## Parameters\n\n### store\n\n`IWizardStore`\\<`T`, `any`\\>\n\n### setData\n\n(`path`, `value`) => `void`\n\n### path\n\n`P`\n\n### options?\n\n#### isEqual?\n\n(`a`, `b`) => `boolean`\n\n## Returns\n\n\\[`PathValue`\\<`T`, `P`\\>, (`value`) => `void`\\]\n",_E="[**wizzard-packages**](../../../README.md)\n\n***\n\n[wizzard-packages](../../../README.md) / [react/src](../README.md) / useWizardStoreSelector\n\n# Function: useWizardStoreSelector()\n\n> **useWizardStoreSelector**\\<`TSelected`\\>(`store`, `selector`, `options?`): `TSelected`\n\nDefined in: [react/src/store.ts:497](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/react/src/store.ts#L497)\n\nHook: select derived state without React Context.\n\n## Type Parameters\n\n### TSelected\n\n`TSelected`\n\n## Parameters\n\n### store\n\n`IWizardStore`\\<`any`, `any`\\>\n\n### selector\n\n(`state`) => `TSelected`\n\n### options?\n\n\\{ `isEqual?`: (`a`, `b`) => `boolean`; \\} | (`a`, `b`) => `boolean`\n\n## Returns\n\n`TSelected`\n",IE=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [react/src](../README.md) / useWizardStoreState

# Function: useWizardStoreState()

> **useWizardStoreState**\\<\`T\`, \`StepId\`\\>(\`store\`): [\`IWizardState\`](../interfaces/IWizardState.md)\\<\`T\`, \`StepId\`\\>

Defined in: [react/src/store.ts:409](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/react/src/store.ts#L409)

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
`,ME="[**wizzard-packages**](../../../README.md)\n\n***\n\n[wizzard-packages](../../../README.md) / [react/src](../README.md) / useWizardStoreValue\n\n# Function: useWizardStoreValue()\n\n> **useWizardStoreValue**\\<`T`, `P`\\>(`store`, `path`, `options?`): `PathValue`\\<`T`, `P`\\>\n\nDefined in: [react/src/store.ts:418](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/react/src/store.ts#L418)\n\nHook: subscribe to a value path without React Context.\n\n## Type Parameters\n\n### T\n\n`T`\n\n### P\n\n`P` *extends* `string`\n\n## Parameters\n\n### store\n\n`IWizardStore`\\<`T`, `any`\\>\n\n### path\n\n`P`\n\n### options?\n\n\\{ `isEqual?`: (`a`, `b`) => `boolean`; \\} | (`a`, `b`) => `boolean`\n\n## Returns\n\n`PathValue`\\<`T`, `P`\\>\n",CE=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [react/src](../README.md) / useWizardValue

# Function: useWizardValue()

> **useWizardValue**\\<\`TValue\`\\>(\`path\`, \`options?\`): \`TValue\`

Defined in: [react/src/context/WizardContext.tsx:564](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/react/src/context/WizardContext.tsx#L564)

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
`,LE=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [react/src](../README.md) / CreateWizardStoreOptions

# Interface: CreateWizardStoreOptions\\<T, StepId\\>

Defined in: [react/src/store.ts:21](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/react/src/store.ts#L21)

## Type Parameters

### T

\`T\`

### StepId

\`StepId\` *extends* \`string\` = \`string\`

## Properties

### config

> **config**: [\`IWizardConfig\`](IWizardConfig.md)\\<\`T\`, \`StepId\`\\>

Defined in: [react/src/store.ts:22](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/react/src/store.ts#L22)

***

### initialData?

> \`optional\` **initialData**: \`T\`

Defined in: [react/src/store.ts:23](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/react/src/store.ts#L23)

***

### initialStepId?

> \`optional\` **initialStepId**: \`StepId\`

Defined in: [react/src/store.ts:24](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/react/src/store.ts#L24)
`,WE=`[**wizzard-packages**](../../../README.md)

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
`,OE=`[**wizzard-packages**](../../../README.md)

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
`,PE=`[**wizzard-packages**](../../../README.md)

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
`,NE=`[**wizzard-packages**](../../../README.md)

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
`,XE=`[**wizzard-packages**](../../../README.md)

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
`,UE=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [react/src](../README.md) / IWizardHandle

# Interface: IWizardHandle\\<T, StepId\\>

Defined in: [react/src/types.ts:19](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/react/src/types.ts#L19)

Handle returned by components for imperative access to the wizard.

## Type Parameters

### T

\`T\` = \`unknown\`

### StepId

\`StepId\` *extends* \`string\` = \`string\`

## Properties

### actions

> **actions**: \`IWizardActions\`\\<\`StepId\`\\>

Defined in: [react/src/types.ts:21](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/react/src/types.ts#L21)

***

### state

> **state**: [\`IWizardState\`](IWizardState.md)\\<\`T\`, \`StepId\`\\>

Defined in: [react/src/types.ts:20](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/react/src/types.ts#L20)
`,BE=`[**wizzard-packages**](../../../README.md)

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
`,ZE=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [react/src](../README.md) / WizardProviderProps

# Interface: WizardProviderProps\\<T, StepId\\>

Defined in: [react/src/context/WizardContext.tsx:51](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/react/src/context/WizardContext.tsx#L51)

Props for WizardProvider.

## Type Parameters

### T

\`T\`

### StepId

\`StepId\` *extends* \`string\`

## Properties

### children

> **children**: \`ReactNode\`

Defined in: [react/src/context/WizardContext.tsx:55](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/react/src/context/WizardContext.tsx#L55)

***

### config

> **config**: [\`IWizardConfig\`](IWizardConfig.md)\\<\`T\`, \`StepId\`\\>

Defined in: [react/src/context/WizardContext.tsx:52](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/react/src/context/WizardContext.tsx#L52)

***

### initialData?

> \`optional\` **initialData**: \`T\`

Defined in: [react/src/context/WizardContext.tsx:53](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/react/src/context/WizardContext.tsx#L53)

***

### initialStepId?

> \`optional\` **initialStepId**: \`StepId\`

Defined in: [react/src/context/WizardContext.tsx:54](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/react/src/context/WizardContext.tsx#L54)
`,jE=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [react/src](../README.md) / WizardStepRendererProps

# Interface: WizardStepRendererProps

Defined in: [react/src/components/WizardStepRenderer.tsx:7](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/react/src/components/WizardStepRenderer.tsx#L7)

Props for rendering the current step component.

## Properties

### fallback?

> \`optional\` **fallback**: \`ReactNode\`

Defined in: [react/src/components/WizardStepRenderer.tsx:9](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/react/src/components/WizardStepRenderer.tsx#L9)

***

### wrapper?

> \`optional\` **wrapper**: \`ComponentType\`\\<\\{ \`children\`: \`ReactNode\`; \`key\`: \`string\`; \\}\\>

Defined in: [react/src/components/WizardStepRenderer.tsx:8](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/react/src/components/WizardStepRenderer.tsx#L8)
`,VE=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [react/src](../README.md) / WizardStoreBundle

# Interface: WizardStoreBundle\\<T, StepId\\>

Defined in: [react/src/store.ts:27](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/react/src/store.ts#L27)

## Type Parameters

### T

\`T\`

### StepId

\`StepId\` *extends* \`string\` = \`string\`

## Properties

### actions

> **actions**: [\`IWizardActionsTyped\`](../type-aliases/IWizardActionsTyped.md)\\<\`T\`, \`StepId\`\\>

Defined in: [react/src/store.ts:29](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/react/src/store.ts#L29)

***

### store

> **store**: \`IWizardStore\`\\<\`T\`, \`StepId\`\\>

Defined in: [react/src/store.ts:28](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/react/src/store.ts#L28)
`,HE=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [react/src](../README.md) / IWizardActionsTyped

# Type Alias: IWizardActionsTyped\\<T, StepId\\>

> **IWizardActionsTyped**\\<\`T\`, \`StepId\`\\> = \`Omit\`\\<[\`IWizardActions\`](../interfaces/IWizardActions.md)\\<\`StepId\`\\>, \`"setData"\` \\| \`"updateData"\` \\| \`"getData"\`\\> & \`object\`

Defined in: [react/src/types.ts:32](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/react/src/types.ts#L32)

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
`,qE=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [react/src](../README.md) / PersistenceMode

# Type Alias: PersistenceMode

> **PersistenceMode** = \`"onStepChange"\` \\| \`"onChange"\` \\| \`"manual"\`

Defined in: core/dist/index.d.ts:129

Persistence strategy for step data.
`,GE=`[**wizzard-packages**](../../../README.md)

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
`,YE=`[**wizzard-packages**](../../../README.md)

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
`,FE=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [react/src](../README.md) / WizardStepRenderer

# Variable: WizardStepRenderer

> \`const\` **WizardStepRenderer**: \`React.FC\`\\<[\`WizardStepRendererProps\`](../interfaces/WizardStepRendererProps.md)\\>

Defined in: [react/src/components/WizardStepRenderer.tsx:15](https://github.com/ZizzX/wizzard-packages/blob/9b64b0e7284b904c112192a56018a1bbe32129a5/packages/react/src/components/WizardStepRenderer.tsx#L15)

Renders the active step component with optional wrapper and suspense fallback.
`,QE=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [react/src](../README.md) / loggerMiddleware

# Variable: loggerMiddleware

> \`const\` **loggerMiddleware**: [\`WizardMiddleware\`](../type-aliases/WizardMiddleware.md)\\<\`any\`, \`any\`\\>

Defined in: middleware/dist/index.d.ts:6

Simple logger middleware for Wizard actions
`,KE=Object.assign({"../../../../docs/api/README.md":n4,"../../../../docs/api/adapter-yup/src/README.md":t4,"../../../../docs/api/adapter-yup/src/classes/YupAdapter.md":a4,"../../../../docs/api/adapter-yup/src/interfaces/YupLikeError.md":i4,"../../../../docs/api/adapter-yup/src/interfaces/YupLikeSchema.md":r4,"../../../../docs/api/adapter-zod/src/README.md":l4,"../../../../docs/api/adapter-zod/src/classes/ZodAdapter.md":s4,"../../../../docs/api/adapter-zod/src/interfaces/ZodLikeSchema.md":o4,"../../../../docs/api/core/src/README.md":c4,"../../../../docs/api/core/src/classes/WizardStore.md":u4,"../../../../docs/api/core/src/functions/getByPath.md":d4,"../../../../docs/api/core/src/functions/setByPath.md":f4,"../../../../docs/api/core/src/functions/shallowEqual.md":p4,"../../../../docs/api/core/src/functions/toPath.md":h4,"../../../../docs/api/core/src/interfaces/IBreadcrumb.md":m4,"../../../../docs/api/core/src/interfaces/IPersistenceAdapter.md":b4,"../../../../docs/api/core/src/interfaces/IStepConfig.md":g4,"../../../../docs/api/core/src/interfaces/IValidatorAdapter.md":z4,"../../../../docs/api/core/src/interfaces/IWizardActions.md":y4,"../../../../docs/api/core/src/interfaces/IWizardConfig.md":v4,"../../../../docs/api/core/src/interfaces/IWizardContext.md":S4,"../../../../docs/api/core/src/interfaces/IWizardState.md":E4,"../../../../docs/api/core/src/interfaces/IWizardStore.md":D4,"../../../../docs/api/core/src/interfaces/MiddlewareAPI.md":w4,"../../../../docs/api/core/src/type-aliases/BreadcrumbStatus.md":x4,"../../../../docs/api/core/src/type-aliases/Path.md":T4,"../../../../docs/api/core/src/type-aliases/PathValue.md":A4,"../../../../docs/api/core/src/type-aliases/PersistenceMode.md":k4,"../../../../docs/api/core/src/type-aliases/StepDirection.md":R4,"../../../../docs/api/core/src/type-aliases/ValidationMode.md":_4,"../../../../docs/api/core/src/type-aliases/ValidationResult.md":I4,"../../../../docs/api/core/src/type-aliases/WizardAction.md":M4,"../../../../docs/api/core/src/type-aliases/WizardEventHandler.md":C4,"../../../../docs/api/core/src/type-aliases/WizardEventName.md":L4,"../../../../docs/api/core/src/type-aliases/WizardEventPayloads.md":W4,"../../../../docs/api/core/src/type-aliases/WizardMiddleware.md":O4,"../../../../docs/api/devtools/src/README.md":P4,"../../../../docs/api/devtools/src/functions/FlowGraphView.md":N4,"../../../../docs/api/devtools/src/functions/WizardDevtools.md":X4,"../../../../docs/api/devtools/src/functions/devtools.md":U4,"../../../../docs/api/devtools/src/functions/recordSession.md":B4,"../../../../docs/api/devtools/src/interfaces/DevtoolsOptions.md":Z4,"../../../../docs/api/devtools/src/interfaces/DevtoolsPlugin.md":j4,"../../../../docs/api/devtools/src/interfaces/FlowGraphViewProps.md":V4,"../../../../docs/api/devtools/src/interfaces/GraphView.md":H4,"../../../../docs/api/devtools/src/interfaces/LayoutInfo.md":q4,"../../../../docs/api/devtools/src/interfaces/Outcome.md":G4,"../../../../docs/api/devtools/src/interfaces/OutcomeError.md":Y4,"../../../../docs/api/devtools/src/interfaces/Pending.md":F4,"../../../../docs/api/devtools/src/interfaces/RecordOptions.md":Q4,"../../../../docs/api/devtools/src/interfaces/Recorder.md":K4,"../../../../docs/api/devtools/src/interfaces/SessionBundle.md":J4,"../../../../docs/api/devtools/src/interfaces/TakenEdge.md":$4,"../../../../docs/api/devtools/src/interfaces/WizardDevtoolsProps.md":eE,"../../../../docs/api/devtools/src/type-aliases/Tab.md":nE,"../../../../docs/api/devtools/src/type-aliases/WizardLike.md":tE,"../../../../docs/api/devtools/src/variables/EDGE_DRAW_CAP.md":aE,"../../../../docs/api/middleware/src/README.md":iE,"../../../../docs/api/middleware/src/variables/devToolsMiddleware.md":rE,"../../../../docs/api/middleware/src/variables/loggerMiddleware.md":lE,"../../../../docs/api/persistence/src/README.md":sE,"../../../../docs/api/persistence/src/classes/LocalStorageAdapter.md":oE,"../../../../docs/api/persistence/src/classes/MemoryAdapter.md":cE,"../../../../docs/api/react/src/README.md":uE,"../../../../docs/api/react/src/classes/WizardStore.md":dE,"../../../../docs/api/react/src/functions/WizardProvider.md":fE,"../../../../docs/api/react/src/functions/createWizardFactory.md":pE,"../../../../docs/api/react/src/functions/createWizardHooks.md":hE,"../../../../docs/api/react/src/functions/createWizardStore.md":mE,"../../../../docs/api/react/src/functions/useWizard.md":bE,"../../../../docs/api/react/src/functions/useWizardActions.md":gE,"../../../../docs/api/react/src/functions/useWizardAllErrors.md":zE,"../../../../docs/api/react/src/functions/useWizardContext.md":yE,"../../../../docs/api/react/src/functions/useWizardCurrentStep.md":vE,"../../../../docs/api/react/src/functions/useWizardError.md":SE,"../../../../docs/api/react/src/functions/useWizardField.md":EE,"../../../../docs/api/react/src/functions/useWizardFlatErrors.md":DE,"../../../../docs/api/react/src/functions/useWizardMeta.md":wE,"../../../../docs/api/react/src/functions/useWizardSelector.md":xE,"../../../../docs/api/react/src/functions/useWizardState.md":TE,"../../../../docs/api/react/src/functions/useWizardSteps.md":AE,"../../../../docs/api/react/src/functions/useWizardStoreError.md":kE,"../../../../docs/api/react/src/functions/useWizardStoreField.md":RE,"../../../../docs/api/react/src/functions/useWizardStoreSelector.md":_E,"../../../../docs/api/react/src/functions/useWizardStoreState.md":IE,"../../../../docs/api/react/src/functions/useWizardStoreValue.md":ME,"../../../../docs/api/react/src/functions/useWizardValue.md":CE,"../../../../docs/api/react/src/interfaces/CreateWizardStoreOptions.md":LE,"../../../../docs/api/react/src/interfaces/IStepConfig.md":WE,"../../../../docs/api/react/src/interfaces/IValidatorAdapter.md":OE,"../../../../docs/api/react/src/interfaces/IWizardActions.md":PE,"../../../../docs/api/react/src/interfaces/IWizardConfig.md":NE,"../../../../docs/api/react/src/interfaces/IWizardContext.md":XE,"../../../../docs/api/react/src/interfaces/IWizardHandle.md":UE,"../../../../docs/api/react/src/interfaces/IWizardState.md":BE,"../../../../docs/api/react/src/interfaces/WizardProviderProps.md":ZE,"../../../../docs/api/react/src/interfaces/WizardStepRendererProps.md":jE,"../../../../docs/api/react/src/interfaces/WizardStoreBundle.md":VE,"../../../../docs/api/react/src/type-aliases/IWizardActionsTyped.md":HE,"../../../../docs/api/react/src/type-aliases/PersistenceMode.md":qE,"../../../../docs/api/react/src/type-aliases/ValidationResult.md":GE,"../../../../docs/api/react/src/type-aliases/WizardMiddleware.md":YE,"../../../../docs/api/react/src/variables/WizardStepRenderer.md":FE,"../../../../docs/api/react/src/variables/loggerMiddleware.md":QE}),JE=[/^react\/src\/README$/,/^react\/src\/functions\/(createWizardFactory|useWizard|useWizardActions|useWizardContext|useWizardError|useWizardSelector|useWizardState|useWizardValue|WizardProvider)$/,/^react\/src\/interfaces\/(IWizardConfig|IStepConfig|IWizardState|IWizardActions|IWizardContext|IValidatorAdapter|IWizardHandle|WizardProviderProps|WizardStepRendererProps)$/,/^react\/src\/type-aliases\/(PersistenceMode|ValidationResult|WizardMiddleware)$/,/^react\/src\/variables\/(WizardStepRenderer|loggerMiddleware)$/,/^adapter-zod\/src\/README$/,/^adapter-zod\/src\/classes\/ZodAdapter$/,/^adapter-yup\/src\/README$/,/^adapter-yup\/src\/classes\/YupAdapter$/,/^persistence\/src\/README$/,/^persistence\/src\/classes\/(LocalStorageAdapter|MemoryAdapter)$/,/^middleware\/src\/README$/,/^middleware\/src\/variables\/(loggerMiddleware|devToolsMiddleware)$/,/^devtools\/src\/README$/,/^devtools\/src\/functions\/WizardDevTools$/],$E=a=>JE.some(r=>r.test(a)),eD=Object.entries(KE).map(([a,r])=>{const l=a.replace("../../../../docs/api/","").replace(/\.md$/,""),s=l.split("/").slice(-1)[0].replace(/[-_]/g," ");return{slug:l,title:s,content:String(r),isUserFacing:$E(l)}}),nD=eD.sort((a,r)=>a.slug.localeCompare(r.slug)),eo=nD,Db=a=>a==="README"||a.endsWith("/README"),Tg=a=>a.replace(/\.md$/,"").replace(/\/$/,"")||"README",Nu=new Set(eo.map(a=>a.slug)),Xu=eo.filter(a=>a.isUserFacing),tD=a=>Tg(a.replace(/^\.\//,"").replace(/^\//,""));function aD(){const a=Yy(),r=Xu.find(d=>!Db(d.slug))?.slug||"README",l=Tg(a["*"]||r),s=eo.find(d=>d.slug===l)||Xu[0]||eo[0],u=Xu.filter(d=>!Db(d.slug));return s?F.jsxs("section",{className:"section api-layout",children:[F.jsxs("aside",{className:"api-sidebar",children:[F.jsx("h2",{children:"API Reference"}),F.jsx("p",{className:"api-note",children:"Generated from TypeDoc. Pick a module to explore the surface area."}),F.jsx("div",{className:"api-list",children:u.map(d=>F.jsx(wl,{to:`/api/${d.slug}`,className:`api-link${d.slug===s.slug?" api-link--active":""}`,children:d.title},d.slug))})]}),F.jsx("article",{className:"api-content markdown",children:F.jsx(Q9,{components:{a:({href:d,children:f,node:h,...b})=>{if(!d)return F.jsx("a",{...b,children:f});if(d.startsWith("#"))return F.jsx("a",{href:d,...b,children:f});if(/^https?:\/\//.test(d))return F.jsx("a",{href:d,rel:"noreferrer",target:"_blank",...b,children:f});let p=tD(d);return!Nu.has(p)&&Nu.has(`${p}/README`)&&(p=`${p}/README`),Nu.has(p)?F.jsx(wl,{to:`/api/${p}`,...b,children:f}):F.jsx("a",{href:d,...b,children:f})}},children:s.content})})]}):F.jsx("section",{className:"section api-layout",children:F.jsxs("article",{className:"api-content",children:[F.jsx("h2",{children:"API Reference"}),F.jsxs("p",{children:["API docs are not available. Run ",F.jsx("code",{children:"pnpm docs:api"})," first."]})]})})}const Fa="https://stackblitz.com/github/ZizzX/wizzard-packages/tree/dev/.stackblitz",iD=[{title:"Validation",description:"Zod/Yup adapters with step-level validation.",href:`${Fa}/validation`},{title:"Persistence",description:"LocalStorage + memory adapters with auto-save.",href:`${Fa}/persistence`},{title:"Navigation",description:"Sequential, visited, and free navigation modes.",href:`${Fa}/basic`},{title:"Custom Adapter",description:"Bring your own validation adapter.",href:`${Fa}/custom-adapter`},{title:"Custom Middleware",description:"Analytics, logging, and guardrails.",href:`${Fa}/middleware`},{title:"Advanced Flow",description:"Branching, guards, and async conditions.",href:`${Fa}/advanced-flow`},{title:"Core Engine",description:"Use @wizzard-packages/core without React bindings.",href:`${Fa}/core-engine`},{title:"Vue + Core",description:"Wire the core engine into a Vue 3 UI.",href:`${Fa}/vue-core`}];function rD(){return F.jsxs("section",{className:"section",children:[F.jsxs("div",{className:"section-header",children:[F.jsx("p",{className:"section-eyebrow",children:"Cookbook"}),F.jsx("h2",{children:"Examples"}),F.jsx("p",{className:"section-lead",children:"Start from working recipes and customize the steps for your product."})]}),F.jsx("div",{className:"card-grid",children:iD.map(a=>F.jsxs("a",{className:"card card--link",href:a.href,target:"_blank",rel:"noreferrer",children:[F.jsx("h3",{children:a.title}),F.jsx("p",{children:a.description}),F.jsx("span",{className:"card-cta",children:"Open StackBlitz"})]},a.title))})]})}const lD=`import type { IValidatorAdapter, ValidationResult } from '@wizzard-packages/core';

class CustomAdapter implements IValidatorAdapter {
  constructor(private schema: unknown) {}

  async validate(values: unknown): Promise<ValidationResult> {
    // return { isValid: boolean, errors?: Record<string, string> }
    return { isValid: true };
  }
}
`,sD=`import type { WizardMiddleware } from '@wizzard-packages/core';

const analyticsMiddleware: WizardMiddleware = (api) => (next) => (action) => {
  // api.getState(), api.getData(), api.getConfig()
  // track action here
  return next(action);
};
`,oD=`import type { IPersistenceAdapter } from '@wizzard-packages/core';

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
`;function cD(){return F.jsxs("section",{className:"section learn-section",children:[F.jsxs("div",{className:"section-header",children:[F.jsx("p",{className:"section-eyebrow",children:"Extend"}),F.jsx("h2",{children:"Build your own adapters, middleware, and persistence"}),F.jsx("p",{className:"section-lead",children:"Wizzard Stepper is designed for extension. Bring your own validation, tracking, and storage without changing the core engine."})]}),F.jsxs("div",{className:"learn-grid",children:[F.jsxs("article",{className:"card learn-panel",children:[F.jsx("h3",{children:"Custom validation adapter"}),F.jsxs("p",{children:["Implement ",F.jsx("code",{children:"IValidatorAdapter"})," to connect any schema or rules engine."]}),F.jsx("pre",{className:"learn-code",children:F.jsx("code",{children:lD})})]}),F.jsxs("article",{className:"card learn-panel",children:[F.jsx("h3",{children:"Custom middleware"}),F.jsxs("p",{children:["Implement ",F.jsx("code",{children:"WizardMiddleware"})," for logging, analytics, or guardrails."]}),F.jsx("pre",{className:"learn-code",children:F.jsx("code",{children:sD})})]}),F.jsxs("article",{className:"card learn-panel",children:[F.jsx("h3",{children:"Custom persistence"}),F.jsxs("p",{children:["Implement ",F.jsx("code",{children:"IPersistenceAdapter"})," to save wizard state to any backend or storage."]}),F.jsx("pre",{className:"learn-code",children:F.jsx("code",{children:oD})})]})]}),F.jsxs("div",{className:"learn-actions",children:[F.jsx(wl,{to:"/examples",className:"button button--primary",children:"Open examples"}),F.jsx(wl,{to:"/api",className:"button button--ghost",children:"Browse API"})]})]})}const uD=b0([{path:"/",element:F.jsx(C0,{}),children:[{index:!0,element:F.jsx(L0,{})},{path:"api/*",element:F.jsx(aD,{})},{path:"examples",element:F.jsx(rD,{})},{path:"learn",element:F.jsx(cD,{})}]}],{basename:"/wizzard-packages/"});function dD(){return F.jsx(w0,{router:uD})}const wb=document.getElementById("root");wb&&jz.createRoot(wb).render(F.jsx(Tb.StrictMode,{children:F.jsx(dD,{})}));
