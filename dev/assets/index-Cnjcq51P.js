function Tg(a,r){for(var l=0;l<r.length;l++){const s=r[l];if(typeof s!="string"&&!Array.isArray(s)){for(const u in s)if(u!=="default"&&!(u in a)){const d=Object.getOwnPropertyDescriptor(s,u);d&&Object.defineProperty(a,u,d.get?d:{enumerable:!0,get:()=>s[u]})}}}return Object.freeze(Object.defineProperty(a,Symbol.toStringTag,{value:"Module"}))}(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const u of document.querySelectorAll('link[rel="modulepreload"]'))s(u);new MutationObserver(u=>{for(const d of u)if(d.type==="childList")for(const f of d.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&s(f)}).observe(document,{childList:!0,subtree:!0});function l(u){const d={};return u.integrity&&(d.integrity=u.integrity),u.referrerPolicy&&(d.referrerPolicy=u.referrerPolicy),u.crossOrigin==="use-credentials"?d.credentials="include":u.crossOrigin==="anonymous"?d.credentials="omit":d.credentials="same-origin",d}function s(u){if(u.ep)return;u.ep=!0;const d=l(u);fetch(u.href,d)}})();function no(a){return a&&a.__esModule&&Object.prototype.hasOwnProperty.call(a,"default")?a.default:a}var mu={exports:{}},cl={};var om;function L1(){if(om)return cl;om=1;var a=Symbol.for("react.transitional.element"),r=Symbol.for("react.fragment");function l(s,u,d){var f=null;if(d!==void 0&&(f=""+d),u.key!==void 0&&(f=""+u.key),"key"in u){d={};for(var h in u)h!=="key"&&(d[h]=u[h])}else d=u;return u=d.ref,{$$typeof:a,type:s,key:f,ref:u!==void 0?u:null,props:d}}return cl.Fragment=r,cl.jsx=l,cl.jsxs=l,cl}var cm;function O1(){return cm||(cm=1,mu.exports=L1()),mu.exports}var Q=O1(),gu={exports:{}},Me={};var um;function N1(){if(um)return Me;um=1;var a=Symbol.for("react.transitional.element"),r=Symbol.for("react.portal"),l=Symbol.for("react.fragment"),s=Symbol.for("react.strict_mode"),u=Symbol.for("react.profiler"),d=Symbol.for("react.consumer"),f=Symbol.for("react.context"),h=Symbol.for("react.forward_ref"),g=Symbol.for("react.suspense"),p=Symbol.for("react.memo"),y=Symbol.for("react.lazy"),b=Symbol.for("react.activity"),S=Symbol.iterator;function v(T){return T===null||typeof T!="object"?null:(T=S&&T[S]||T["@@iterator"],typeof T=="function"?T:null)}var L={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},N=Object.assign,H={};function P(T,j,E){this.props=T,this.context=j,this.refs=H,this.updater=E||L}P.prototype.isReactComponent={},P.prototype.setState=function(T,j){if(typeof T!="object"&&typeof T!="function"&&T!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,T,j,"setState")},P.prototype.forceUpdate=function(T){this.updater.enqueueForceUpdate(this,T,"forceUpdate")};function G(){}G.prototype=P.prototype;function q(T,j,E){this.props=T,this.context=j,this.refs=H,this.updater=E||L}var de=q.prototype=new G;de.constructor=q,N(de,P.prototype),de.isPureReactComponent=!0;var ze=Array.isArray;function X(){}var R={H:null,A:null,T:null,S:null},te=Object.prototype.hasOwnProperty;function he(T,j,E){var re=E.ref;return{$$typeof:a,type:T,key:j,ref:re!==void 0?re:null,props:E}}function ue(T,j){return he(T.type,j,T.props)}function ie(T){return typeof T=="object"&&T!==null&&T.$$typeof===a}function ne(T){var j={"=":"=0",":":"=2"};return"$"+T.replace(/[=:]/g,function(E){return j[E]})}var Ae=/\/+/g;function fe(T,j){return typeof T=="object"&&T!==null&&T.key!=null?ne(""+T.key):j.toString(36)}function $(T){switch(T.status){case"fulfilled":return T.value;case"rejected":throw T.reason;default:switch(typeof T.status=="string"?T.then(X,X):(T.status="pending",T.then(function(j){T.status==="pending"&&(T.status="fulfilled",T.value=j)},function(j){T.status==="pending"&&(T.status="rejected",T.reason=j)})),T.status){case"fulfilled":return T.value;case"rejected":throw T.reason}}throw T}function C(T,j,E,re,be){var ye=typeof T;(ye==="undefined"||ye==="boolean")&&(T=null);var Ie=!1;if(T===null)Ie=!0;else switch(ye){case"bigint":case"string":case"number":Ie=!0;break;case"object":switch(T.$$typeof){case a:case r:Ie=!0;break;case y:return Ie=T._init,C(Ie(T._payload),j,E,re,be)}}if(Ie)return be=be(T),Ie=re===""?"."+fe(T,0):re,ze(be)?(E="",Ie!=null&&(E=Ie.replace(Ae,"$&/")+"/"),C(be,j,E,"",function(qn){return qn})):be!=null&&(ie(be)&&(be=ue(be,E+(be.key==null||T&&T.key===be.key?"":(""+be.key).replace(Ae,"$&/")+"/")+Ie)),j.push(be)),1;Ie=0;var Je=re===""?".":re+":";if(ze(T))for(var Ke=0;Ke<T.length;Ke++)re=T[Ke],ye=Je+fe(re,Ke),Ie+=C(re,j,E,ye,be);else if(Ke=v(T),typeof Ke=="function")for(T=Ke.call(T),Ke=0;!(re=T.next()).done;)re=re.value,ye=Je+fe(re,Ke++),Ie+=C(re,j,E,ye,be);else if(ye==="object"){if(typeof T.then=="function")return C($(T),j,E,re,be);throw j=String(T),Error("Objects are not valid as a React child (found: "+(j==="[object Object]"?"object with keys {"+Object.keys(T).join(", ")+"}":j)+"). If you meant to render a collection of children, use an array instead.")}return Ie}function F(T,j,E){if(T==null)return T;var re=[],be=0;return C(T,re,"","",function(ye){return j.call(E,ye,be++)}),re}function le(T){if(T._status===-1){var j=T._result;j=j(),j.then(function(E){(T._status===0||T._status===-1)&&(T._status=1,T._result=E)},function(E){(T._status===0||T._status===-1)&&(T._status=2,T._result=E)}),T._status===-1&&(T._status=0,T._result=j)}if(T._status===1)return T._result.default;throw T._result}var _e=typeof reportError=="function"?reportError:function(T){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var j=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof T=="object"&&T!==null&&typeof T.message=="string"?String(T.message):String(T),error:T});if(!window.dispatchEvent(j))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",T);return}console.error(T)},x={map:F,forEach:function(T,j,E){F(T,function(){j.apply(this,arguments)},E)},count:function(T){var j=0;return F(T,function(){j++}),j},toArray:function(T){return F(T,function(j){return j})||[]},only:function(T){if(!ie(T))throw Error("React.Children.only expected to receive a single React element child.");return T}};return Me.Activity=b,Me.Children=x,Me.Component=P,Me.Fragment=l,Me.Profiler=u,Me.PureComponent=q,Me.StrictMode=s,Me.Suspense=g,Me.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=R,Me.__COMPILER_RUNTIME={__proto__:null,c:function(T){return R.H.useMemoCache(T)}},Me.cache=function(T){return function(){return T.apply(null,arguments)}},Me.cacheSignal=function(){return null},Me.cloneElement=function(T,j,E){if(T==null)throw Error("The argument must be a React element, but you passed "+T+".");var re=N({},T.props),be=T.key;if(j!=null)for(ye in j.key!==void 0&&(be=""+j.key),j)!te.call(j,ye)||ye==="key"||ye==="__self"||ye==="__source"||ye==="ref"&&j.ref===void 0||(re[ye]=j[ye]);var ye=arguments.length-2;if(ye===1)re.children=E;else if(1<ye){for(var Ie=Array(ye),Je=0;Je<ye;Je++)Ie[Je]=arguments[Je+2];re.children=Ie}return he(T.type,be,re)},Me.createContext=function(T){return T={$$typeof:f,_currentValue:T,_currentValue2:T,_threadCount:0,Provider:null,Consumer:null},T.Provider=T,T.Consumer={$$typeof:d,_context:T},T},Me.createElement=function(T,j,E){var re,be={},ye=null;if(j!=null)for(re in j.key!==void 0&&(ye=""+j.key),j)te.call(j,re)&&re!=="key"&&re!=="__self"&&re!=="__source"&&(be[re]=j[re]);var Ie=arguments.length-2;if(Ie===1)be.children=E;else if(1<Ie){for(var Je=Array(Ie),Ke=0;Ke<Ie;Ke++)Je[Ke]=arguments[Ke+2];be.children=Je}if(T&&T.defaultProps)for(re in Ie=T.defaultProps,Ie)be[re]===void 0&&(be[re]=Ie[re]);return he(T,ye,be)},Me.createRef=function(){return{current:null}},Me.forwardRef=function(T){return{$$typeof:h,render:T}},Me.isValidElement=ie,Me.lazy=function(T){return{$$typeof:y,_payload:{_status:-1,_result:T},_init:le}},Me.memo=function(T,j){return{$$typeof:p,type:T,compare:j===void 0?null:j}},Me.startTransition=function(T){var j=R.T,E={};R.T=E;try{var re=T(),be=R.S;be!==null&&be(E,re),typeof re=="object"&&re!==null&&typeof re.then=="function"&&re.then(X,_e)}catch(ye){_e(ye)}finally{j!==null&&E.types!==null&&(j.types=E.types),R.T=j}},Me.unstable_useCacheRefresh=function(){return R.H.useCacheRefresh()},Me.use=function(T){return R.H.use(T)},Me.useActionState=function(T,j,E){return R.H.useActionState(T,j,E)},Me.useCallback=function(T,j){return R.H.useCallback(T,j)},Me.useContext=function(T){return R.H.useContext(T)},Me.useDebugValue=function(){},Me.useDeferredValue=function(T,j){return R.H.useDeferredValue(T,j)},Me.useEffect=function(T,j){return R.H.useEffect(T,j)},Me.useEffectEvent=function(T){return R.H.useEffectEvent(T)},Me.useId=function(){return R.H.useId()},Me.useImperativeHandle=function(T,j,E){return R.H.useImperativeHandle(T,j,E)},Me.useInsertionEffect=function(T,j){return R.H.useInsertionEffect(T,j)},Me.useLayoutEffect=function(T,j){return R.H.useLayoutEffect(T,j)},Me.useMemo=function(T,j){return R.H.useMemo(T,j)},Me.useOptimistic=function(T,j){return R.H.useOptimistic(T,j)},Me.useReducer=function(T,j,E){return R.H.useReducer(T,j,E)},Me.useRef=function(T){return R.H.useRef(T)},Me.useState=function(T){return R.H.useState(T)},Me.useSyncExternalStore=function(T,j,E){return R.H.useSyncExternalStore(T,j,E)},Me.useTransition=function(){return R.H.useTransition()},Me.version="19.2.3",Me}var dm;function ed(){return dm||(dm=1,gu.exports=N1()),gu.exports}var J=ed();const Ag=no(J),W1=Tg({__proto__:null,default:Ag},[J]);var yu={exports:{}},ul={},bu={exports:{}},zu={};var fm;function U1(){return fm||(fm=1,(function(a){function r(C,F){var le=C.length;C.push(F);e:for(;0<le;){var _e=le-1>>>1,x=C[_e];if(0<u(x,F))C[_e]=F,C[le]=x,le=_e;else break e}}function l(C){return C.length===0?null:C[0]}function s(C){if(C.length===0)return null;var F=C[0],le=C.pop();if(le!==F){C[0]=le;e:for(var _e=0,x=C.length,T=x>>>1;_e<T;){var j=2*(_e+1)-1,E=C[j],re=j+1,be=C[re];if(0>u(E,le))re<x&&0>u(be,E)?(C[_e]=be,C[re]=le,_e=re):(C[_e]=E,C[j]=le,_e=j);else if(re<x&&0>u(be,le))C[_e]=be,C[re]=le,_e=re;else break e}}return F}function u(C,F){var le=C.sortIndex-F.sortIndex;return le!==0?le:C.id-F.id}if(a.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var d=performance;a.unstable_now=function(){return d.now()}}else{var f=Date,h=f.now();a.unstable_now=function(){return f.now()-h}}var g=[],p=[],y=1,b=null,S=3,v=!1,L=!1,N=!1,H=!1,P=typeof setTimeout=="function"?setTimeout:null,G=typeof clearTimeout=="function"?clearTimeout:null,q=typeof setImmediate<"u"?setImmediate:null;function de(C){for(var F=l(p);F!==null;){if(F.callback===null)s(p);else if(F.startTime<=C)s(p),F.sortIndex=F.expirationTime,r(g,F);else break;F=l(p)}}function ze(C){if(N=!1,de(C),!L)if(l(g)!==null)L=!0,X||(X=!0,ne());else{var F=l(p);F!==null&&$(ze,F.startTime-C)}}var X=!1,R=-1,te=5,he=-1;function ue(){return H?!0:!(a.unstable_now()-he<te)}function ie(){if(H=!1,X){var C=a.unstable_now();he=C;var F=!0;try{e:{L=!1,N&&(N=!1,G(R),R=-1),v=!0;var le=S;try{n:{for(de(C),b=l(g);b!==null&&!(b.expirationTime>C&&ue());){var _e=b.callback;if(typeof _e=="function"){b.callback=null,S=b.priorityLevel;var x=_e(b.expirationTime<=C);if(C=a.unstable_now(),typeof x=="function"){b.callback=x,de(C),F=!0;break n}b===l(g)&&s(g),de(C)}else s(g);b=l(g)}if(b!==null)F=!0;else{var T=l(p);T!==null&&$(ze,T.startTime-C),F=!1}}break e}finally{b=null,S=le,v=!1}F=void 0}}finally{F?ne():X=!1}}}var ne;if(typeof q=="function")ne=function(){q(ie)};else if(typeof MessageChannel<"u"){var Ae=new MessageChannel,fe=Ae.port2;Ae.port1.onmessage=ie,ne=function(){fe.postMessage(null)}}else ne=function(){P(ie,0)};function $(C,F){R=P(function(){C(a.unstable_now())},F)}a.unstable_IdlePriority=5,a.unstable_ImmediatePriority=1,a.unstable_LowPriority=4,a.unstable_NormalPriority=3,a.unstable_Profiling=null,a.unstable_UserBlockingPriority=2,a.unstable_cancelCallback=function(C){C.callback=null},a.unstable_forceFrameRate=function(C){0>C||125<C?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):te=0<C?Math.floor(1e3/C):5},a.unstable_getCurrentPriorityLevel=function(){return S},a.unstable_next=function(C){switch(S){case 1:case 2:case 3:var F=3;break;default:F=S}var le=S;S=F;try{return C()}finally{S=le}},a.unstable_requestPaint=function(){H=!0},a.unstable_runWithPriority=function(C,F){switch(C){case 1:case 2:case 3:case 4:case 5:break;default:C=3}var le=S;S=C;try{return F()}finally{S=le}},a.unstable_scheduleCallback=function(C,F,le){var _e=a.unstable_now();switch(typeof le=="object"&&le!==null?(le=le.delay,le=typeof le=="number"&&0<le?_e+le:_e):le=_e,C){case 1:var x=-1;break;case 2:x=250;break;case 5:x=1073741823;break;case 4:x=1e4;break;default:x=5e3}return x=le+x,C={id:y++,callback:F,priorityLevel:C,startTime:le,expirationTime:x,sortIndex:-1},le>_e?(C.sortIndex=le,r(p,C),l(g)===null&&C===l(p)&&(N?(G(R),R=-1):N=!0,$(ze,le-_e))):(C.sortIndex=x,r(g,C),L||v||(L=!0,X||(X=!0,ne()))),C},a.unstable_shouldYield=ue,a.unstable_wrapCallback=function(C){var F=S;return function(){var le=S;S=F;try{return C.apply(this,arguments)}finally{S=le}}}})(zu)),zu}var pm;function P1(){return pm||(pm=1,bu.exports=U1()),bu.exports}var vu={exports:{}},Xn={};var hm;function j1(){if(hm)return Xn;hm=1;var a=ed();function r(g){var p="https://react.dev/errors/"+g;if(1<arguments.length){p+="?args[]="+encodeURIComponent(arguments[1]);for(var y=2;y<arguments.length;y++)p+="&args[]="+encodeURIComponent(arguments[y])}return"Minified React error #"+g+"; visit "+p+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function l(){}var s={d:{f:l,r:function(){throw Error(r(522))},D:l,C:l,L:l,m:l,X:l,S:l,M:l},p:0,findDOMNode:null},u=Symbol.for("react.portal");function d(g,p,y){var b=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:u,key:b==null?null:""+b,children:g,containerInfo:p,implementation:y}}var f=a.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function h(g,p){if(g==="font")return"";if(typeof p=="string")return p==="use-credentials"?p:""}return Xn.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=s,Xn.createPortal=function(g,p){var y=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!p||p.nodeType!==1&&p.nodeType!==9&&p.nodeType!==11)throw Error(r(299));return d(g,p,null,y)},Xn.flushSync=function(g){var p=f.T,y=s.p;try{if(f.T=null,s.p=2,g)return g()}finally{f.T=p,s.p=y,s.d.f()}},Xn.preconnect=function(g,p){typeof g=="string"&&(p?(p=p.crossOrigin,p=typeof p=="string"?p==="use-credentials"?p:"":void 0):p=null,s.d.C(g,p))},Xn.prefetchDNS=function(g){typeof g=="string"&&s.d.D(g)},Xn.preinit=function(g,p){if(typeof g=="string"&&p&&typeof p.as=="string"){var y=p.as,b=h(y,p.crossOrigin),S=typeof p.integrity=="string"?p.integrity:void 0,v=typeof p.fetchPriority=="string"?p.fetchPriority:void 0;y==="style"?s.d.S(g,typeof p.precedence=="string"?p.precedence:void 0,{crossOrigin:b,integrity:S,fetchPriority:v}):y==="script"&&s.d.X(g,{crossOrigin:b,integrity:S,fetchPriority:v,nonce:typeof p.nonce=="string"?p.nonce:void 0})}},Xn.preinitModule=function(g,p){if(typeof g=="string")if(typeof p=="object"&&p!==null){if(p.as==null||p.as==="script"){var y=h(p.as,p.crossOrigin);s.d.M(g,{crossOrigin:y,integrity:typeof p.integrity=="string"?p.integrity:void 0,nonce:typeof p.nonce=="string"?p.nonce:void 0})}}else p==null&&s.d.M(g)},Xn.preload=function(g,p){if(typeof g=="string"&&typeof p=="object"&&p!==null&&typeof p.as=="string"){var y=p.as,b=h(y,p.crossOrigin);s.d.L(g,y,{crossOrigin:b,integrity:typeof p.integrity=="string"?p.integrity:void 0,nonce:typeof p.nonce=="string"?p.nonce:void 0,type:typeof p.type=="string"?p.type:void 0,fetchPriority:typeof p.fetchPriority=="string"?p.fetchPriority:void 0,referrerPolicy:typeof p.referrerPolicy=="string"?p.referrerPolicy:void 0,imageSrcSet:typeof p.imageSrcSet=="string"?p.imageSrcSet:void 0,imageSizes:typeof p.imageSizes=="string"?p.imageSizes:void 0,media:typeof p.media=="string"?p.media:void 0})}},Xn.preloadModule=function(g,p){if(typeof g=="string")if(p){var y=h(p.as,p.crossOrigin);s.d.m(g,{as:typeof p.as=="string"&&p.as!=="script"?p.as:void 0,crossOrigin:y,integrity:typeof p.integrity=="string"?p.integrity:void 0})}else s.d.m(g)},Xn.requestFormReset=function(g){s.d.r(g)},Xn.unstable_batchedUpdates=function(g,p){return g(p)},Xn.useFormState=function(g,p,y){return f.H.useFormState(g,p,y)},Xn.useFormStatus=function(){return f.H.useHostTransitionStatus()},Xn.version="19.2.3",Xn}var mm;function wg(){if(mm)return vu.exports;mm=1;function a(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(a)}catch(r){console.error(r)}}return a(),vu.exports=j1(),vu.exports}var gm;function B1(){if(gm)return ul;gm=1;var a=P1(),r=ed(),l=wg();function s(e){var n="https://react.dev/errors/"+e;if(1<arguments.length){n+="?args[]="+encodeURIComponent(arguments[1]);for(var t=2;t<arguments.length;t++)n+="&args[]="+encodeURIComponent(arguments[t])}return"Minified React error #"+e+"; visit "+n+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function u(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function d(e){var n=e,t=e;if(e.alternate)for(;n.return;)n=n.return;else{e=n;do n=e,(n.flags&4098)!==0&&(t=n.return),e=n.return;while(e)}return n.tag===3?t:null}function f(e){if(e.tag===13){var n=e.memoizedState;if(n===null&&(e=e.alternate,e!==null&&(n=e.memoizedState)),n!==null)return n.dehydrated}return null}function h(e){if(e.tag===31){var n=e.memoizedState;if(n===null&&(e=e.alternate,e!==null&&(n=e.memoizedState)),n!==null)return n.dehydrated}return null}function g(e){if(d(e)!==e)throw Error(s(188))}function p(e){var n=e.alternate;if(!n){if(n=d(e),n===null)throw Error(s(188));return n!==e?null:e}for(var t=e,i=n;;){var o=t.return;if(o===null)break;var c=o.alternate;if(c===null){if(i=o.return,i!==null){t=i;continue}break}if(o.child===c.child){for(c=o.child;c;){if(c===t)return g(o),e;if(c===i)return g(o),n;c=c.sibling}throw Error(s(188))}if(t.return!==i.return)t=o,i=c;else{for(var m=!1,z=o.child;z;){if(z===t){m=!0,t=o,i=c;break}if(z===i){m=!0,i=o,t=c;break}z=z.sibling}if(!m){for(z=c.child;z;){if(z===t){m=!0,t=c,i=o;break}if(z===i){m=!0,i=c,t=o;break}z=z.sibling}if(!m)throw Error(s(189))}}if(t.alternate!==i)throw Error(s(190))}if(t.tag!==3)throw Error(s(188));return t.stateNode.current===t?e:n}function y(e){var n=e.tag;if(n===5||n===26||n===27||n===6)return e;for(e=e.child;e!==null;){if(n=y(e),n!==null)return n;e=e.sibling}return null}var b=Object.assign,S=Symbol.for("react.element"),v=Symbol.for("react.transitional.element"),L=Symbol.for("react.portal"),N=Symbol.for("react.fragment"),H=Symbol.for("react.strict_mode"),P=Symbol.for("react.profiler"),G=Symbol.for("react.consumer"),q=Symbol.for("react.context"),de=Symbol.for("react.forward_ref"),ze=Symbol.for("react.suspense"),X=Symbol.for("react.suspense_list"),R=Symbol.for("react.memo"),te=Symbol.for("react.lazy"),he=Symbol.for("react.activity"),ue=Symbol.for("react.memo_cache_sentinel"),ie=Symbol.iterator;function ne(e){return e===null||typeof e!="object"?null:(e=ie&&e[ie]||e["@@iterator"],typeof e=="function"?e:null)}var Ae=Symbol.for("react.client.reference");function fe(e){if(e==null)return null;if(typeof e=="function")return e.$$typeof===Ae?null:e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case N:return"Fragment";case P:return"Profiler";case H:return"StrictMode";case ze:return"Suspense";case X:return"SuspenseList";case he:return"Activity"}if(typeof e=="object")switch(e.$$typeof){case L:return"Portal";case q:return e.displayName||"Context";case G:return(e._context.displayName||"Context")+".Consumer";case de:var n=e.render;return e=e.displayName,e||(e=n.displayName||n.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case R:return n=e.displayName||null,n!==null?n:fe(e.type)||"Memo";case te:n=e._payload,e=e._init;try{return fe(e(n))}catch{}}return null}var $=Array.isArray,C=r.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,F=l.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,le={pending:!1,data:null,method:null,action:null},_e=[],x=-1;function T(e){return{current:e}}function j(e){0>x||(e.current=_e[x],_e[x]=null,x--)}function E(e,n){x++,_e[x]=e.current,e.current=n}var re=T(null),be=T(null),ye=T(null),Ie=T(null);function Je(e,n){switch(E(ye,n),E(be,e),E(re,null),n.nodeType){case 9:case 11:e=(e=n.documentElement)&&(e=e.namespaceURI)?Mh(e):0;break;default:if(e=n.tagName,n=n.namespaceURI)n=Mh(n),e=_h(n,e);else switch(e){case"svg":e=1;break;case"math":e=2;break;default:e=0}}j(re),E(re,e)}function Ke(){j(re),j(be),j(ye)}function qn(e){e.memoizedState!==null&&E(Ie,e);var n=re.current,t=_h(n,e.type);n!==t&&(E(be,e),E(re,t))}function Mt(e){be.current===e&&(j(re),j(be)),Ie.current===e&&(j(Ie),rl._currentValue=le)}var xn,_t;function yt(e){if(xn===void 0)try{throw Error()}catch(t){var n=t.stack.trim().match(/\n( *(at )?)/);xn=n&&n[1]||"",_t=-1<t.stack.indexOf(`
    at`)?" (<anonymous>)":-1<t.stack.indexOf("@")?"@unknown:0:0":""}return`
`+xn+e+_t}var za=!1;function Yn(e,n){if(!e||za)return"";za=!0;var t=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var i={DetermineComponentFrameRoot:function(){try{if(n){var Y=function(){throw Error()};if(Object.defineProperty(Y.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(Y,[])}catch(U){var O=U}Reflect.construct(e,[],Y)}else{try{Y.call()}catch(U){O=U}e.call(Y.prototype)}}else{try{throw Error()}catch(U){O=U}(Y=e())&&typeof Y.catch=="function"&&Y.catch(function(){})}}catch(U){if(U&&O&&typeof U.stack=="string")return[U.stack,O.stack]}return[null,null]}};i.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var o=Object.getOwnPropertyDescriptor(i.DetermineComponentFrameRoot,"name");o&&o.configurable&&Object.defineProperty(i.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var c=i.DetermineComponentFrameRoot(),m=c[0],z=c[1];if(m&&z){var D=m.split(`
`),_=z.split(`
`);for(o=i=0;i<D.length&&!D[i].includes("DetermineComponentFrameRoot");)i++;for(;o<_.length&&!_[o].includes("DetermineComponentFrameRoot");)o++;if(i===D.length||o===_.length)for(i=D.length-1,o=_.length-1;1<=i&&0<=o&&D[i]!==_[o];)o--;for(;1<=i&&0<=o;i--,o--)if(D[i]!==_[o]){if(i!==1||o!==1)do if(i--,o--,0>o||D[i]!==_[o]){var B=`
`+D[i].replace(" at new "," at ");return e.displayName&&B.includes("<anonymous>")&&(B=B.replace("<anonymous>",e.displayName)),B}while(1<=i&&0<=o);break}}}finally{za=!1,Error.prepareStackTrace=t}return(t=e?e.displayName||e.name:"")?yt(t):""}function Ii(e,n){switch(e.tag){case 26:case 27:case 5:return yt(e.type);case 16:return yt("Lazy");case 13:return e.child!==n&&n!==null?yt("Suspense Fallback"):yt("Suspense");case 19:return yt("SuspenseList");case 0:case 15:return Yn(e.type,!1);case 11:return Yn(e.type.render,!1);case 1:return Yn(e.type,!0);case 31:return yt("Activity");default:return""}}function Mi(e){try{var n="",t=null;do n+=Ii(e,t),t=e,e=e.return;while(e);return n}catch(i){return`
Error generating stack: `+i.message+`
`+i.stack}}var Qt=Object.prototype.hasOwnProperty,va=a.unstable_scheduleCallback,ni=a.unstable_cancelCallback,vr=a.unstable_shouldYield,Sr=a.unstable_requestPaint,bn=a.unstable_now,Kt=a.unstable_getCurrentPriorityLevel,Z=a.unstable_ImmediatePriority,ae=a.unstable_UserBlockingPriority,Se=a.unstable_NormalPriority,we=a.unstable_LowPriority,Ve=a.unstable_IdlePriority,Ln=a.log,Ct=a.unstable_setDisableYieldValue,mn=null,zn=null;function Nn(e){if(typeof Ln=="function"&&Ct(e),zn&&typeof zn.setStrictMode=="function")try{zn.setStrictMode(mn,e)}catch{}}var Fe=Math.clz32?Math.clz32:_i,jt=Math.log,Gn=Math.LN2;function _i(e){return e>>>=0,e===0?32:31-(jt(e)/Gn|0)|0}var ti=256,Sa=262144,Ea=4194304;function Ft(e){var n=e&42;if(n!==0)return n;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&261888;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function ai(e,n,t){var i=e.pendingLanes;if(i===0)return 0;var o=0,c=e.suspendedLanes,m=e.pingedLanes;e=e.warmLanes;var z=i&134217727;return z!==0?(i=z&~c,i!==0?o=Ft(i):(m&=z,m!==0?o=Ft(m):t||(t=z&~e,t!==0&&(o=Ft(t))))):(z=i&~c,z!==0?o=Ft(z):m!==0?o=Ft(m):t||(t=i&~e,t!==0&&(o=Ft(t)))),o===0?0:n!==0&&n!==o&&(n&c)===0&&(c=o&-o,t=n&-n,c>=t||c===32&&(t&4194048)!==0)?n:o}function ii(e,n){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&n)===0}function Ml(e,n){switch(e){case 1:case 2:case 4:case 8:case 64:return n+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return n+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function ri(){var e=Ea;return Ea<<=1,(Ea&62914560)===0&&(Ea=4194304),e}function xa(e){for(var n=[],t=0;31>t;t++)n.push(e);return n}function li(e,n){e.pendingLanes|=n,n!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function lo(e,n,t,i,o,c){var m=e.pendingLanes;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=t,e.entangledLanes&=t,e.errorRecoveryDisabledLanes&=t,e.shellSuspendCounter=0;var z=e.entanglements,D=e.expirationTimes,_=e.hiddenUpdates;for(t=m&~t;0<t;){var B=31-Fe(t),Y=1<<B;z[B]=0,D[B]=-1;var O=_[B];if(O!==null)for(_[B]=null,B=0;B<O.length;B++){var U=O[B];U!==null&&(U.lane&=-536870913)}t&=~Y}i!==0&&A(e,i,0),c!==0&&o===0&&e.tag!==0&&(e.suspendedLanes|=c&~(m&~n))}function A(e,n,t){e.pendingLanes|=n,e.suspendedLanes&=~n;var i=31-Fe(n);e.entangledLanes|=n,e.entanglements[i]=e.entanglements[i]|1073741824|t&261930}function I(e,n){var t=e.entangledLanes|=n;for(e=e.entanglements;t;){var i=31-Fe(t),o=1<<i;o&n|e[i]&n&&(e[i]|=n),t&=~o}}function W(e,n){var t=n&-n;return t=(t&42)!==0?1:K(t),(t&(e.suspendedLanes|n))!==0?0:t}function K(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function se(e){return e&=-e,2<e?8<e?(e&134217727)!==0?32:268435456:8:2}function Ee(){var e=F.p;return e!==0?e:(e=window.event,e===void 0?32:nm(e.type))}function Te(e,n){var t=F.p;try{return F.p=e,n()}finally{F.p=t}}var pe=Math.random().toString(36).slice(2),ce="__reactFiber$"+pe,oe="__reactProps$"+pe,ge="__reactContainer$"+pe,ke="__reactEvents$"+pe,je="__reactListeners$"+pe,_n="__reactHandles$"+pe,$e="__reactResources$"+pe,We="__reactMarker$"+pe;function on(e){delete e[ce],delete e[oe],delete e[ke],delete e[je],delete e[_n]}function lt(e){var n=e[ce];if(n)return n;for(var t=e.parentNode;t;){if(n=t[ge]||t[ce]){if(t=n.alternate,n.child!==null||t!==null&&t.child!==null)for(e=Ph(e);e!==null;){if(t=e[ce])return t;e=Ph(e)}return n}e=t,t=e.parentNode}return null}function bt(e){if(e=e[ce]||e[ge]){var n=e.tag;if(n===5||n===6||n===13||n===31||n===26||n===27||n===3)return e}return null}function Zn(e){var n=e.tag;if(n===5||n===26||n===27||n===6)return e.stateNode;throw Error(s(33))}function Wn(e){var n=e[$e];return n||(n=e[$e]={hoistableStyles:new Map,hoistableScripts:new Map}),n}function vn(e){e[We]=!0}var Da=new Set,Bt={};function zt(e,n){Lt(e,n),Lt(e+"Capture",n)}function Lt(e,n){for(Bt[e]=n,e=0;e<n.length;e++)Da.add(n[e])}var Ze=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),dn={},Jt={};function si(e){return Qt.call(Jt,e)?!0:Qt.call(dn,e)?!1:Ze.test(e)?Jt[e]=!0:(dn[e]=!0,!1)}function fn(e,n,t){if(si(n))if(t===null)e.removeAttribute(n);else{switch(typeof t){case"undefined":case"function":case"symbol":e.removeAttribute(n);return;case"boolean":var i=n.toLowerCase().slice(0,5);if(i!=="data-"&&i!=="aria-"){e.removeAttribute(n);return}}e.setAttribute(n,""+t)}}function Ot(e,n,t){if(t===null)e.removeAttribute(n);else{switch(typeof t){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(n);return}e.setAttribute(n,""+t)}}function vt(e,n,t,i){if(i===null)e.removeAttribute(t);else{switch(typeof i){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(t);return}e.setAttributeNS(n,t,""+i)}}function Qn(e){switch(typeof e){case"bigint":case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function Ed(e){var n=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(n==="checkbox"||n==="radio")}function wy(e,n,t){var i=Object.getOwnPropertyDescriptor(e.constructor.prototype,n);if(!e.hasOwnProperty(n)&&typeof i<"u"&&typeof i.get=="function"&&typeof i.set=="function"){var o=i.get,c=i.set;return Object.defineProperty(e,n,{configurable:!0,get:function(){return o.call(this)},set:function(m){t=""+m,c.call(this,m)}}),Object.defineProperty(e,n,{enumerable:i.enumerable}),{getValue:function(){return t},setValue:function(m){t=""+m},stopTracking:function(){e._valueTracker=null,delete e[n]}}}}function so(e){if(!e._valueTracker){var n=Ed(e)?"checked":"value";e._valueTracker=wy(e,n,""+e[n])}}function xd(e){if(!e)return!1;var n=e._valueTracker;if(!n)return!0;var t=n.getValue(),i="";return e&&(i=Ed(e)?e.checked?"true":"false":e.value),e=i,e!==t?(n.setValue(e),!0):!1}function _l(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}var Ry=/[\n"\\]/g;function St(e){return e.replace(Ry,function(n){return"\\"+n.charCodeAt(0).toString(16)+" "})}function oo(e,n,t,i,o,c,m,z){e.name="",m!=null&&typeof m!="function"&&typeof m!="symbol"&&typeof m!="boolean"?e.type=m:e.removeAttribute("type"),n!=null?m==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+Qn(n)):e.value!==""+Qn(n)&&(e.value=""+Qn(n)):m!=="submit"&&m!=="reset"||e.removeAttribute("value"),n!=null?co(e,m,Qn(n)):t!=null?co(e,m,Qn(t)):i!=null&&e.removeAttribute("value"),o==null&&c!=null&&(e.defaultChecked=!!c),o!=null&&(e.checked=o&&typeof o!="function"&&typeof o!="symbol"),z!=null&&typeof z!="function"&&typeof z!="symbol"&&typeof z!="boolean"?e.name=""+Qn(z):e.removeAttribute("name")}function Dd(e,n,t,i,o,c,m,z){if(c!=null&&typeof c!="function"&&typeof c!="symbol"&&typeof c!="boolean"&&(e.type=c),n!=null||t!=null){if(!(c!=="submit"&&c!=="reset"||n!=null)){so(e);return}t=t!=null?""+Qn(t):"",n=n!=null?""+Qn(n):t,z||n===e.value||(e.value=n),e.defaultValue=n}i=i??o,i=typeof i!="function"&&typeof i!="symbol"&&!!i,e.checked=z?e.checked:!!i,e.defaultChecked=!!i,m!=null&&typeof m!="function"&&typeof m!="symbol"&&typeof m!="boolean"&&(e.name=m),so(e)}function co(e,n,t){n==="number"&&_l(e.ownerDocument)===e||e.defaultValue===""+t||(e.defaultValue=""+t)}function Ci(e,n,t,i){if(e=e.options,n){n={};for(var o=0;o<t.length;o++)n["$"+t[o]]=!0;for(t=0;t<e.length;t++)o=n.hasOwnProperty("$"+e[t].value),e[t].selected!==o&&(e[t].selected=o),o&&i&&(e[t].defaultSelected=!0)}else{for(t=""+Qn(t),n=null,o=0;o<e.length;o++){if(e[o].value===t){e[o].selected=!0,i&&(e[o].defaultSelected=!0);return}n!==null||e[o].disabled||(n=e[o])}n!==null&&(n.selected=!0)}}function Td(e,n,t){if(n!=null&&(n=""+Qn(n),n!==e.value&&(e.value=n),t==null)){e.defaultValue!==n&&(e.defaultValue=n);return}e.defaultValue=t!=null?""+Qn(t):""}function Ad(e,n,t,i){if(n==null){if(i!=null){if(t!=null)throw Error(s(92));if($(i)){if(1<i.length)throw Error(s(93));i=i[0]}t=i}t==null&&(t=""),n=t}t=Qn(n),e.defaultValue=t,i=e.textContent,i===t&&i!==""&&i!==null&&(e.value=i),so(e)}function Li(e,n){if(n){var t=e.firstChild;if(t&&t===e.lastChild&&t.nodeType===3){t.nodeValue=n;return}}e.textContent=n}var ky=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function wd(e,n,t){var i=n.indexOf("--")===0;t==null||typeof t=="boolean"||t===""?i?e.setProperty(n,""):n==="float"?e.cssFloat="":e[n]="":i?e.setProperty(n,t):typeof t!="number"||t===0||ky.has(n)?n==="float"?e.cssFloat=t:e[n]=(""+t).trim():e[n]=t+"px"}function Rd(e,n,t){if(n!=null&&typeof n!="object")throw Error(s(62));if(e=e.style,t!=null){for(var i in t)!t.hasOwnProperty(i)||n!=null&&n.hasOwnProperty(i)||(i.indexOf("--")===0?e.setProperty(i,""):i==="float"?e.cssFloat="":e[i]="");for(var o in n)i=n[o],n.hasOwnProperty(o)&&t[o]!==i&&wd(e,o,i)}else for(var c in n)n.hasOwnProperty(c)&&wd(e,c,n[c])}function uo(e){if(e.indexOf("-")===-1)return!1;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Iy=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),My=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function Cl(e){return My.test(""+e)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":e}function $t(){}var fo=null;function po(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Oi=null,Ni=null;function kd(e){var n=bt(e);if(n&&(e=n.stateNode)){var t=e[oe]||null;e:switch(e=n.stateNode,n.type){case"input":if(oo(e,t.value,t.defaultValue,t.defaultValue,t.checked,t.defaultChecked,t.type,t.name),n=t.name,t.type==="radio"&&n!=null){for(t=e;t.parentNode;)t=t.parentNode;for(t=t.querySelectorAll('input[name="'+St(""+n)+'"][type="radio"]'),n=0;n<t.length;n++){var i=t[n];if(i!==e&&i.form===e.form){var o=i[oe]||null;if(!o)throw Error(s(90));oo(i,o.value,o.defaultValue,o.defaultValue,o.checked,o.defaultChecked,o.type,o.name)}}for(n=0;n<t.length;n++)i=t[n],i.form===e.form&&xd(i)}break e;case"textarea":Td(e,t.value,t.defaultValue);break e;case"select":n=t.value,n!=null&&Ci(e,!!t.multiple,n,!1)}}}var ho=!1;function Id(e,n,t){if(ho)return e(n,t);ho=!0;try{var i=e(n);return i}finally{if(ho=!1,(Oi!==null||Ni!==null)&&(vs(),Oi&&(n=Oi,e=Ni,Ni=Oi=null,kd(n),e)))for(n=0;n<e.length;n++)kd(e[n])}}function Er(e,n){var t=e.stateNode;if(t===null)return null;var i=t[oe]||null;if(i===null)return null;t=i[n];e:switch(n){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(i=!i.disabled)||(e=e.type,i=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!i;break e;default:e=!1}if(e)return null;if(t&&typeof t!="function")throw Error(s(231,n,typeof t));return t}var ea=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),mo=!1;if(ea)try{var xr={};Object.defineProperty(xr,"passive",{get:function(){mo=!0}}),window.addEventListener("test",xr,xr),window.removeEventListener("test",xr,xr)}catch{mo=!1}var Ta=null,go=null,Ll=null;function Md(){if(Ll)return Ll;var e,n=go,t=n.length,i,o="value"in Ta?Ta.value:Ta.textContent,c=o.length;for(e=0;e<t&&n[e]===o[e];e++);var m=t-e;for(i=1;i<=m&&n[t-i]===o[c-i];i++);return Ll=o.slice(e,1<i?1-i:void 0)}function Ol(e){var n=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&n===13&&(e=13)):e=n,e===10&&(e=13),32<=e||e===13?e:0}function Nl(){return!0}function _d(){return!1}function Kn(e){function n(t,i,o,c,m){this._reactName=t,this._targetInst=o,this.type=i,this.nativeEvent=c,this.target=m,this.currentTarget=null;for(var z in e)e.hasOwnProperty(z)&&(t=e[z],this[z]=t?t(c):c[z]);return this.isDefaultPrevented=(c.defaultPrevented!=null?c.defaultPrevented:c.returnValue===!1)?Nl:_d,this.isPropagationStopped=_d,this}return b(n.prototype,{preventDefault:function(){this.defaultPrevented=!0;var t=this.nativeEvent;t&&(t.preventDefault?t.preventDefault():typeof t.returnValue!="unknown"&&(t.returnValue=!1),this.isDefaultPrevented=Nl)},stopPropagation:function(){var t=this.nativeEvent;t&&(t.stopPropagation?t.stopPropagation():typeof t.cancelBubble!="unknown"&&(t.cancelBubble=!0),this.isPropagationStopped=Nl)},persist:function(){},isPersistent:Nl}),n}var oi={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Wl=Kn(oi),Dr=b({},oi,{view:0,detail:0}),_y=Kn(Dr),yo,bo,Tr,Ul=b({},Dr,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:vo,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==Tr&&(Tr&&e.type==="mousemove"?(yo=e.screenX-Tr.screenX,bo=e.screenY-Tr.screenY):bo=yo=0,Tr=e),yo)},movementY:function(e){return"movementY"in e?e.movementY:bo}}),Cd=Kn(Ul),Cy=b({},Ul,{dataTransfer:0}),Ly=Kn(Cy),Oy=b({},Dr,{relatedTarget:0}),zo=Kn(Oy),Ny=b({},oi,{animationName:0,elapsedTime:0,pseudoElement:0}),Wy=Kn(Ny),Uy=b({},oi,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),Py=Kn(Uy),jy=b({},oi,{data:0}),Ld=Kn(jy),By={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Xy={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Hy={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Zy(e){var n=this.nativeEvent;return n.getModifierState?n.getModifierState(e):(e=Hy[e])?!!n[e]:!1}function vo(){return Zy}var Vy=b({},Dr,{key:function(e){if(e.key){var n=By[e.key]||e.key;if(n!=="Unidentified")return n}return e.type==="keypress"?(e=Ol(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?Xy[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:vo,charCode:function(e){return e.type==="keypress"?Ol(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Ol(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),qy=Kn(Vy),Yy=b({},Ul,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Od=Kn(Yy),Gy=b({},Dr,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:vo}),Qy=Kn(Gy),Ky=b({},oi,{propertyName:0,elapsedTime:0,pseudoElement:0}),Fy=Kn(Ky),Jy=b({},Ul,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),$y=Kn(Jy),eb=b({},oi,{newState:0,oldState:0}),nb=Kn(eb),tb=[9,13,27,32],So=ea&&"CompositionEvent"in window,Ar=null;ea&&"documentMode"in document&&(Ar=document.documentMode);var ab=ea&&"TextEvent"in window&&!Ar,Nd=ea&&(!So||Ar&&8<Ar&&11>=Ar),Wd=" ",Ud=!1;function Pd(e,n){switch(e){case"keyup":return tb.indexOf(n.keyCode)!==-1;case"keydown":return n.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function jd(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var Wi=!1;function ib(e,n){switch(e){case"compositionend":return jd(n);case"keypress":return n.which!==32?null:(Ud=!0,Wd);case"textInput":return e=n.data,e===Wd&&Ud?null:e;default:return null}}function rb(e,n){if(Wi)return e==="compositionend"||!So&&Pd(e,n)?(e=Md(),Ll=go=Ta=null,Wi=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(n.ctrlKey||n.altKey||n.metaKey)||n.ctrlKey&&n.altKey){if(n.char&&1<n.char.length)return n.char;if(n.which)return String.fromCharCode(n.which)}return null;case"compositionend":return Nd&&n.locale!=="ko"?null:n.data;default:return null}}var lb={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Bd(e){var n=e&&e.nodeName&&e.nodeName.toLowerCase();return n==="input"?!!lb[e.type]:n==="textarea"}function Xd(e,n,t,i){Oi?Ni?Ni.push(i):Ni=[i]:Oi=i,n=ws(n,"onChange"),0<n.length&&(t=new Wl("onChange","change",null,t,i),e.push({event:t,listeners:n}))}var wr=null,Rr=null;function sb(e){Th(e,0)}function Pl(e){var n=Zn(e);if(xd(n))return e}function Hd(e,n){if(e==="change")return n}var Zd=!1;if(ea){var Eo;if(ea){var xo="oninput"in document;if(!xo){var Vd=document.createElement("div");Vd.setAttribute("oninput","return;"),xo=typeof Vd.oninput=="function"}Eo=xo}else Eo=!1;Zd=Eo&&(!document.documentMode||9<document.documentMode)}function qd(){wr&&(wr.detachEvent("onpropertychange",Yd),Rr=wr=null)}function Yd(e){if(e.propertyName==="value"&&Pl(Rr)){var n=[];Xd(n,Rr,e,po(e)),Id(sb,n)}}function ob(e,n,t){e==="focusin"?(qd(),wr=n,Rr=t,wr.attachEvent("onpropertychange",Yd)):e==="focusout"&&qd()}function cb(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Pl(Rr)}function ub(e,n){if(e==="click")return Pl(n)}function db(e,n){if(e==="input"||e==="change")return Pl(n)}function fb(e,n){return e===n&&(e!==0||1/e===1/n)||e!==e&&n!==n}var st=typeof Object.is=="function"?Object.is:fb;function kr(e,n){if(st(e,n))return!0;if(typeof e!="object"||e===null||typeof n!="object"||n===null)return!1;var t=Object.keys(e),i=Object.keys(n);if(t.length!==i.length)return!1;for(i=0;i<t.length;i++){var o=t[i];if(!Qt.call(n,o)||!st(e[o],n[o]))return!1}return!0}function Gd(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Qd(e,n){var t=Gd(e);e=0;for(var i;t;){if(t.nodeType===3){if(i=e+t.textContent.length,e<=n&&i>=n)return{node:t,offset:n-e};e=i}e:{for(;t;){if(t.nextSibling){t=t.nextSibling;break e}t=t.parentNode}t=void 0}t=Gd(t)}}function Kd(e,n){return e&&n?e===n?!0:e&&e.nodeType===3?!1:n&&n.nodeType===3?Kd(e,n.parentNode):"contains"in e?e.contains(n):e.compareDocumentPosition?!!(e.compareDocumentPosition(n)&16):!1:!1}function Fd(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var n=_l(e.document);n instanceof e.HTMLIFrameElement;){try{var t=typeof n.contentWindow.location.href=="string"}catch{t=!1}if(t)e=n.contentWindow;else break;n=_l(e.document)}return n}function Do(e){var n=e&&e.nodeName&&e.nodeName.toLowerCase();return n&&(n==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||n==="textarea"||e.contentEditable==="true")}var pb=ea&&"documentMode"in document&&11>=document.documentMode,Ui=null,To=null,Ir=null,Ao=!1;function Jd(e,n,t){var i=t.window===t?t.document:t.nodeType===9?t:t.ownerDocument;Ao||Ui==null||Ui!==_l(i)||(i=Ui,"selectionStart"in i&&Do(i)?i={start:i.selectionStart,end:i.selectionEnd}:(i=(i.ownerDocument&&i.ownerDocument.defaultView||window).getSelection(),i={anchorNode:i.anchorNode,anchorOffset:i.anchorOffset,focusNode:i.focusNode,focusOffset:i.focusOffset}),Ir&&kr(Ir,i)||(Ir=i,i=ws(To,"onSelect"),0<i.length&&(n=new Wl("onSelect","select",null,n,t),e.push({event:n,listeners:i}),n.target=Ui)))}function ci(e,n){var t={};return t[e.toLowerCase()]=n.toLowerCase(),t["Webkit"+e]="webkit"+n,t["Moz"+e]="moz"+n,t}var Pi={animationend:ci("Animation","AnimationEnd"),animationiteration:ci("Animation","AnimationIteration"),animationstart:ci("Animation","AnimationStart"),transitionrun:ci("Transition","TransitionRun"),transitionstart:ci("Transition","TransitionStart"),transitioncancel:ci("Transition","TransitionCancel"),transitionend:ci("Transition","TransitionEnd")},wo={},$d={};ea&&($d=document.createElement("div").style,"AnimationEvent"in window||(delete Pi.animationend.animation,delete Pi.animationiteration.animation,delete Pi.animationstart.animation),"TransitionEvent"in window||delete Pi.transitionend.transition);function ui(e){if(wo[e])return wo[e];if(!Pi[e])return e;var n=Pi[e],t;for(t in n)if(n.hasOwnProperty(t)&&t in $d)return wo[e]=n[t];return e}var ef=ui("animationend"),nf=ui("animationiteration"),tf=ui("animationstart"),hb=ui("transitionrun"),mb=ui("transitionstart"),gb=ui("transitioncancel"),af=ui("transitionend"),rf=new Map,Ro="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");Ro.push("scrollEnd");function Nt(e,n){rf.set(e,n),zt(n,[e])}var jl=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var n=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(n))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)},Et=[],ji=0,ko=0;function Bl(){for(var e=ji,n=ko=ji=0;n<e;){var t=Et[n];Et[n++]=null;var i=Et[n];Et[n++]=null;var o=Et[n];Et[n++]=null;var c=Et[n];if(Et[n++]=null,i!==null&&o!==null){var m=i.pending;m===null?o.next=o:(o.next=m.next,m.next=o),i.pending=o}c!==0&&lf(t,o,c)}}function Xl(e,n,t,i){Et[ji++]=e,Et[ji++]=n,Et[ji++]=t,Et[ji++]=i,ko|=i,e.lanes|=i,e=e.alternate,e!==null&&(e.lanes|=i)}function Io(e,n,t,i){return Xl(e,n,t,i),Hl(e)}function di(e,n){return Xl(e,null,null,n),Hl(e)}function lf(e,n,t){e.lanes|=t;var i=e.alternate;i!==null&&(i.lanes|=t);for(var o=!1,c=e.return;c!==null;)c.childLanes|=t,i=c.alternate,i!==null&&(i.childLanes|=t),c.tag===22&&(e=c.stateNode,e===null||e._visibility&1||(o=!0)),e=c,c=c.return;return e.tag===3?(c=e.stateNode,o&&n!==null&&(o=31-Fe(t),e=c.hiddenUpdates,i=e[o],i===null?e[o]=[n]:i.push(n),n.lane=t|536870912),c):null}function Hl(e){if(50<Jr)throw Jr=0,Pc=null,Error(s(185));for(var n=e.return;n!==null;)e=n,n=e.return;return e.tag===3?e.stateNode:null}var Bi={};function yb(e,n,t,i){this.tag=e,this.key=t,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=n,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=i,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function ot(e,n,t,i){return new yb(e,n,t,i)}function Mo(e){return e=e.prototype,!(!e||!e.isReactComponent)}function na(e,n){var t=e.alternate;return t===null?(t=ot(e.tag,n,e.key,e.mode),t.elementType=e.elementType,t.type=e.type,t.stateNode=e.stateNode,t.alternate=e,e.alternate=t):(t.pendingProps=n,t.type=e.type,t.flags=0,t.subtreeFlags=0,t.deletions=null),t.flags=e.flags&65011712,t.childLanes=e.childLanes,t.lanes=e.lanes,t.child=e.child,t.memoizedProps=e.memoizedProps,t.memoizedState=e.memoizedState,t.updateQueue=e.updateQueue,n=e.dependencies,t.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext},t.sibling=e.sibling,t.index=e.index,t.ref=e.ref,t.refCleanup=e.refCleanup,t}function sf(e,n){e.flags&=65011714;var t=e.alternate;return t===null?(e.childLanes=0,e.lanes=n,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=t.childLanes,e.lanes=t.lanes,e.child=t.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=t.memoizedProps,e.memoizedState=t.memoizedState,e.updateQueue=t.updateQueue,e.type=t.type,n=t.dependencies,e.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext}),e}function Zl(e,n,t,i,o,c){var m=0;if(i=e,typeof e=="function")Mo(e)&&(m=1);else if(typeof e=="string")m=E1(e,t,re.current)?26:e==="html"||e==="head"||e==="body"?27:5;else e:switch(e){case he:return e=ot(31,t,n,o),e.elementType=he,e.lanes=c,e;case N:return fi(t.children,o,c,n);case H:m=8,o|=24;break;case P:return e=ot(12,t,n,o|2),e.elementType=P,e.lanes=c,e;case ze:return e=ot(13,t,n,o),e.elementType=ze,e.lanes=c,e;case X:return e=ot(19,t,n,o),e.elementType=X,e.lanes=c,e;default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case q:m=10;break e;case G:m=9;break e;case de:m=11;break e;case R:m=14;break e;case te:m=16,i=null;break e}m=29,t=Error(s(130,e===null?"null":typeof e,"")),i=null}return n=ot(m,t,n,o),n.elementType=e,n.type=i,n.lanes=c,n}function fi(e,n,t,i){return e=ot(7,e,i,n),e.lanes=t,e}function _o(e,n,t){return e=ot(6,e,null,n),e.lanes=t,e}function of(e){var n=ot(18,null,null,0);return n.stateNode=e,n}function Co(e,n,t){return n=ot(4,e.children!==null?e.children:[],e.key,n),n.lanes=t,n.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},n}var cf=new WeakMap;function xt(e,n){if(typeof e=="object"&&e!==null){var t=cf.get(e);return t!==void 0?t:(n={value:e,source:n,stack:Mi(n)},cf.set(e,n),n)}return{value:e,source:n,stack:Mi(n)}}var Xi=[],Hi=0,Vl=null,Mr=0,Dt=[],Tt=0,Aa=null,Xt=1,Ht="";function ta(e,n){Xi[Hi++]=Mr,Xi[Hi++]=Vl,Vl=e,Mr=n}function uf(e,n,t){Dt[Tt++]=Xt,Dt[Tt++]=Ht,Dt[Tt++]=Aa,Aa=e;var i=Xt;e=Ht;var o=32-Fe(i)-1;i&=~(1<<o),t+=1;var c=32-Fe(n)+o;if(30<c){var m=o-o%5;c=(i&(1<<m)-1).toString(32),i>>=m,o-=m,Xt=1<<32-Fe(n)+o|t<<o|i,Ht=c+e}else Xt=1<<c|t<<o|i,Ht=e}function Lo(e){e.return!==null&&(ta(e,1),uf(e,1,0))}function Oo(e){for(;e===Vl;)Vl=Xi[--Hi],Xi[Hi]=null,Mr=Xi[--Hi],Xi[Hi]=null;for(;e===Aa;)Aa=Dt[--Tt],Dt[Tt]=null,Ht=Dt[--Tt],Dt[Tt]=null,Xt=Dt[--Tt],Dt[Tt]=null}function df(e,n){Dt[Tt++]=Xt,Dt[Tt++]=Ht,Dt[Tt++]=Aa,Xt=n.id,Ht=n.overflow,Aa=e}var Un=null,pn=null,He=!1,wa=null,At=!1,No=Error(s(519));function Ra(e){var n=Error(s(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw _r(xt(n,e)),No}function ff(e){var n=e.stateNode,t=e.type,i=e.memoizedProps;switch(n[ce]=e,n[oe]=i,t){case"dialog":Pe("cancel",n),Pe("close",n);break;case"iframe":case"object":case"embed":Pe("load",n);break;case"video":case"audio":for(t=0;t<el.length;t++)Pe(el[t],n);break;case"source":Pe("error",n);break;case"img":case"image":case"link":Pe("error",n),Pe("load",n);break;case"details":Pe("toggle",n);break;case"input":Pe("invalid",n),Dd(n,i.value,i.defaultValue,i.checked,i.defaultChecked,i.type,i.name,!0);break;case"select":Pe("invalid",n);break;case"textarea":Pe("invalid",n),Ad(n,i.value,i.defaultValue,i.children)}t=i.children,typeof t!="string"&&typeof t!="number"&&typeof t!="bigint"||n.textContent===""+t||i.suppressHydrationWarning===!0||kh(n.textContent,t)?(i.popover!=null&&(Pe("beforetoggle",n),Pe("toggle",n)),i.onScroll!=null&&Pe("scroll",n),i.onScrollEnd!=null&&Pe("scrollend",n),i.onClick!=null&&(n.onclick=$t),n=!0):n=!1,n||Ra(e,!0)}function pf(e){for(Un=e.return;Un;)switch(Un.tag){case 5:case 31:case 13:At=!1;return;case 27:case 3:At=!0;return;default:Un=Un.return}}function Zi(e){if(e!==Un)return!1;if(!He)return pf(e),He=!0,!1;var n=e.tag,t;if((t=n!==3&&n!==27)&&((t=n===5)&&(t=e.type,t=!(t!=="form"&&t!=="button")||eu(e.type,e.memoizedProps)),t=!t),t&&pn&&Ra(e),pf(e),n===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(s(317));pn=Uh(e)}else if(n===31){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(s(317));pn=Uh(e)}else n===27?(n=pn,Xa(e.type)?(e=ru,ru=null,pn=e):pn=n):pn=Un?Rt(e.stateNode.nextSibling):null;return!0}function pi(){pn=Un=null,He=!1}function Wo(){var e=wa;return e!==null&&(et===null?et=e:et.push.apply(et,e),wa=null),e}function _r(e){wa===null?wa=[e]:wa.push(e)}var Uo=T(null),hi=null,aa=null;function ka(e,n,t){E(Uo,n._currentValue),n._currentValue=t}function ia(e){e._currentValue=Uo.current,j(Uo)}function Po(e,n,t){for(;e!==null;){var i=e.alternate;if((e.childLanes&n)!==n?(e.childLanes|=n,i!==null&&(i.childLanes|=n)):i!==null&&(i.childLanes&n)!==n&&(i.childLanes|=n),e===t)break;e=e.return}}function jo(e,n,t,i){var o=e.child;for(o!==null&&(o.return=e);o!==null;){var c=o.dependencies;if(c!==null){var m=o.child;c=c.firstContext;e:for(;c!==null;){var z=c;c=o;for(var D=0;D<n.length;D++)if(z.context===n[D]){c.lanes|=t,z=c.alternate,z!==null&&(z.lanes|=t),Po(c.return,t,e),i||(m=null);break e}c=z.next}}else if(o.tag===18){if(m=o.return,m===null)throw Error(s(341));m.lanes|=t,c=m.alternate,c!==null&&(c.lanes|=t),Po(m,t,e),m=null}else m=o.child;if(m!==null)m.return=o;else for(m=o;m!==null;){if(m===e){m=null;break}if(o=m.sibling,o!==null){o.return=m.return,m=o;break}m=m.return}o=m}}function Vi(e,n,t,i){e=null;for(var o=n,c=!1;o!==null;){if(!c){if((o.flags&524288)!==0)c=!0;else if((o.flags&262144)!==0)break}if(o.tag===10){var m=o.alternate;if(m===null)throw Error(s(387));if(m=m.memoizedProps,m!==null){var z=o.type;st(o.pendingProps.value,m.value)||(e!==null?e.push(z):e=[z])}}else if(o===Ie.current){if(m=o.alternate,m===null)throw Error(s(387));m.memoizedState.memoizedState!==o.memoizedState.memoizedState&&(e!==null?e.push(rl):e=[rl])}o=o.return}e!==null&&jo(n,e,t,i),n.flags|=262144}function ql(e){for(e=e.firstContext;e!==null;){if(!st(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function mi(e){hi=e,aa=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function Pn(e){return hf(hi,e)}function Yl(e,n){return hi===null&&mi(e),hf(e,n)}function hf(e,n){var t=n._currentValue;if(n={context:n,memoizedValue:t,next:null},aa===null){if(e===null)throw Error(s(308));aa=n,e.dependencies={lanes:0,firstContext:n},e.flags|=524288}else aa=aa.next=n;return t}var bb=typeof AbortController<"u"?AbortController:function(){var e=[],n=this.signal={aborted:!1,addEventListener:function(t,i){e.push(i)}};this.abort=function(){n.aborted=!0,e.forEach(function(t){return t()})}},zb=a.unstable_scheduleCallback,vb=a.unstable_NormalPriority,An={$$typeof:q,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function Bo(){return{controller:new bb,data:new Map,refCount:0}}function Cr(e){e.refCount--,e.refCount===0&&zb(vb,function(){e.controller.abort()})}var Lr=null,Xo=0,qi=0,Yi=null;function Sb(e,n){if(Lr===null){var t=Lr=[];Xo=0,qi=Vc(),Yi={status:"pending",value:void 0,then:function(i){t.push(i)}}}return Xo++,n.then(mf,mf),n}function mf(){if(--Xo===0&&Lr!==null){Yi!==null&&(Yi.status="fulfilled");var e=Lr;Lr=null,qi=0,Yi=null;for(var n=0;n<e.length;n++)(0,e[n])()}}function Eb(e,n){var t=[],i={status:"pending",value:null,reason:null,then:function(o){t.push(o)}};return e.then(function(){i.status="fulfilled",i.value=n;for(var o=0;o<t.length;o++)(0,t[o])(n)},function(o){for(i.status="rejected",i.reason=o,o=0;o<t.length;o++)(0,t[o])(void 0)}),i}var gf=C.S;C.S=function(e,n){$p=bn(),typeof n=="object"&&n!==null&&typeof n.then=="function"&&Sb(e,n),gf!==null&&gf(e,n)};var gi=T(null);function Ho(){var e=gi.current;return e!==null?e:sn.pooledCache}function Gl(e,n){n===null?E(gi,gi.current):E(gi,n.pool)}function yf(){var e=Ho();return e===null?null:{parent:An._currentValue,pool:e}}var Gi=Error(s(460)),Zo=Error(s(474)),Ql=Error(s(542)),Kl={then:function(){}};function bf(e){return e=e.status,e==="fulfilled"||e==="rejected"}function zf(e,n,t){switch(t=e[t],t===void 0?e.push(n):t!==n&&(n.then($t,$t),n=t),n.status){case"fulfilled":return n.value;case"rejected":throw e=n.reason,Sf(e),e;default:if(typeof n.status=="string")n.then($t,$t);else{if(e=sn,e!==null&&100<e.shellSuspendCounter)throw Error(s(482));e=n,e.status="pending",e.then(function(i){if(n.status==="pending"){var o=n;o.status="fulfilled",o.value=i}},function(i){if(n.status==="pending"){var o=n;o.status="rejected",o.reason=i}})}switch(n.status){case"fulfilled":return n.value;case"rejected":throw e=n.reason,Sf(e),e}throw bi=n,Gi}}function yi(e){try{var n=e._init;return n(e._payload)}catch(t){throw t!==null&&typeof t=="object"&&typeof t.then=="function"?(bi=t,Gi):t}}var bi=null;function vf(){if(bi===null)throw Error(s(459));var e=bi;return bi=null,e}function Sf(e){if(e===Gi||e===Ql)throw Error(s(483))}var Qi=null,Or=0;function Fl(e){var n=Or;return Or+=1,Qi===null&&(Qi=[]),zf(Qi,e,n)}function Nr(e,n){n=n.props.ref,e.ref=n!==void 0?n:null}function Jl(e,n){throw n.$$typeof===S?Error(s(525)):(e=Object.prototype.toString.call(n),Error(s(31,e==="[object Object]"?"object with keys {"+Object.keys(n).join(", ")+"}":e)))}function Ef(e){function n(k,w){if(e){var M=k.deletions;M===null?(k.deletions=[w],k.flags|=16):M.push(w)}}function t(k,w){if(!e)return null;for(;w!==null;)n(k,w),w=w.sibling;return null}function i(k){for(var w=new Map;k!==null;)k.key!==null?w.set(k.key,k):w.set(k.index,k),k=k.sibling;return w}function o(k,w){return k=na(k,w),k.index=0,k.sibling=null,k}function c(k,w,M){return k.index=M,e?(M=k.alternate,M!==null?(M=M.index,M<w?(k.flags|=67108866,w):M):(k.flags|=67108866,w)):(k.flags|=1048576,w)}function m(k){return e&&k.alternate===null&&(k.flags|=67108866),k}function z(k,w,M,V){return w===null||w.tag!==6?(w=_o(M,k.mode,V),w.return=k,w):(w=o(w,M),w.return=k,w)}function D(k,w,M,V){var xe=M.type;return xe===N?B(k,w,M.props.children,V,M.key):w!==null&&(w.elementType===xe||typeof xe=="object"&&xe!==null&&xe.$$typeof===te&&yi(xe)===w.type)?(w=o(w,M.props),Nr(w,M),w.return=k,w):(w=Zl(M.type,M.key,M.props,null,k.mode,V),Nr(w,M),w.return=k,w)}function _(k,w,M,V){return w===null||w.tag!==4||w.stateNode.containerInfo!==M.containerInfo||w.stateNode.implementation!==M.implementation?(w=Co(M,k.mode,V),w.return=k,w):(w=o(w,M.children||[]),w.return=k,w)}function B(k,w,M,V,xe){return w===null||w.tag!==7?(w=fi(M,k.mode,V,xe),w.return=k,w):(w=o(w,M),w.return=k,w)}function Y(k,w,M){if(typeof w=="string"&&w!==""||typeof w=="number"||typeof w=="bigint")return w=_o(""+w,k.mode,M),w.return=k,w;if(typeof w=="object"&&w!==null){switch(w.$$typeof){case v:return M=Zl(w.type,w.key,w.props,null,k.mode,M),Nr(M,w),M.return=k,M;case L:return w=Co(w,k.mode,M),w.return=k,w;case te:return w=yi(w),Y(k,w,M)}if($(w)||ne(w))return w=fi(w,k.mode,M,null),w.return=k,w;if(typeof w.then=="function")return Y(k,Fl(w),M);if(w.$$typeof===q)return Y(k,Yl(k,w),M);Jl(k,w)}return null}function O(k,w,M,V){var xe=w!==null?w.key:null;if(typeof M=="string"&&M!==""||typeof M=="number"||typeof M=="bigint")return xe!==null?null:z(k,w,""+M,V);if(typeof M=="object"&&M!==null){switch(M.$$typeof){case v:return M.key===xe?D(k,w,M,V):null;case L:return M.key===xe?_(k,w,M,V):null;case te:return M=yi(M),O(k,w,M,V)}if($(M)||ne(M))return xe!==null?null:B(k,w,M,V,null);if(typeof M.then=="function")return O(k,w,Fl(M),V);if(M.$$typeof===q)return O(k,w,Yl(k,M),V);Jl(k,M)}return null}function U(k,w,M,V,xe){if(typeof V=="string"&&V!==""||typeof V=="number"||typeof V=="bigint")return k=k.get(M)||null,z(w,k,""+V,xe);if(typeof V=="object"&&V!==null){switch(V.$$typeof){case v:return k=k.get(V.key===null?M:V.key)||null,D(w,k,V,xe);case L:return k=k.get(V.key===null?M:V.key)||null,_(w,k,V,xe);case te:return V=yi(V),U(k,w,M,V,xe)}if($(V)||ne(V))return k=k.get(M)||null,B(w,k,V,xe,null);if(typeof V.then=="function")return U(k,w,M,Fl(V),xe);if(V.$$typeof===q)return U(k,w,M,Yl(w,V),xe);Jl(w,V)}return null}function me(k,w,M,V){for(var xe=null,qe=null,ve=w,Le=w=0,Xe=null;ve!==null&&Le<M.length;Le++){ve.index>Le?(Xe=ve,ve=null):Xe=ve.sibling;var Ye=O(k,ve,M[Le],V);if(Ye===null){ve===null&&(ve=Xe);break}e&&ve&&Ye.alternate===null&&n(k,ve),w=c(Ye,w,Le),qe===null?xe=Ye:qe.sibling=Ye,qe=Ye,ve=Xe}if(Le===M.length)return t(k,ve),He&&ta(k,Le),xe;if(ve===null){for(;Le<M.length;Le++)ve=Y(k,M[Le],V),ve!==null&&(w=c(ve,w,Le),qe===null?xe=ve:qe.sibling=ve,qe=ve);return He&&ta(k,Le),xe}for(ve=i(ve);Le<M.length;Le++)Xe=U(ve,k,Le,M[Le],V),Xe!==null&&(e&&Xe.alternate!==null&&ve.delete(Xe.key===null?Le:Xe.key),w=c(Xe,w,Le),qe===null?xe=Xe:qe.sibling=Xe,qe=Xe);return e&&ve.forEach(function(Ya){return n(k,Ya)}),He&&ta(k,Le),xe}function De(k,w,M,V){if(M==null)throw Error(s(151));for(var xe=null,qe=null,ve=w,Le=w=0,Xe=null,Ye=M.next();ve!==null&&!Ye.done;Le++,Ye=M.next()){ve.index>Le?(Xe=ve,ve=null):Xe=ve.sibling;var Ya=O(k,ve,Ye.value,V);if(Ya===null){ve===null&&(ve=Xe);break}e&&ve&&Ya.alternate===null&&n(k,ve),w=c(Ya,w,Le),qe===null?xe=Ya:qe.sibling=Ya,qe=Ya,ve=Xe}if(Ye.done)return t(k,ve),He&&ta(k,Le),xe;if(ve===null){for(;!Ye.done;Le++,Ye=M.next())Ye=Y(k,Ye.value,V),Ye!==null&&(w=c(Ye,w,Le),qe===null?xe=Ye:qe.sibling=Ye,qe=Ye);return He&&ta(k,Le),xe}for(ve=i(ve);!Ye.done;Le++,Ye=M.next())Ye=U(ve,k,Le,Ye.value,V),Ye!==null&&(e&&Ye.alternate!==null&&ve.delete(Ye.key===null?Le:Ye.key),w=c(Ye,w,Le),qe===null?xe=Ye:qe.sibling=Ye,qe=Ye);return e&&ve.forEach(function(C1){return n(k,C1)}),He&&ta(k,Le),xe}function ln(k,w,M,V){if(typeof M=="object"&&M!==null&&M.type===N&&M.key===null&&(M=M.props.children),typeof M=="object"&&M!==null){switch(M.$$typeof){case v:e:{for(var xe=M.key;w!==null;){if(w.key===xe){if(xe=M.type,xe===N){if(w.tag===7){t(k,w.sibling),V=o(w,M.props.children),V.return=k,k=V;break e}}else if(w.elementType===xe||typeof xe=="object"&&xe!==null&&xe.$$typeof===te&&yi(xe)===w.type){t(k,w.sibling),V=o(w,M.props),Nr(V,M),V.return=k,k=V;break e}t(k,w);break}else n(k,w);w=w.sibling}M.type===N?(V=fi(M.props.children,k.mode,V,M.key),V.return=k,k=V):(V=Zl(M.type,M.key,M.props,null,k.mode,V),Nr(V,M),V.return=k,k=V)}return m(k);case L:e:{for(xe=M.key;w!==null;){if(w.key===xe)if(w.tag===4&&w.stateNode.containerInfo===M.containerInfo&&w.stateNode.implementation===M.implementation){t(k,w.sibling),V=o(w,M.children||[]),V.return=k,k=V;break e}else{t(k,w);break}else n(k,w);w=w.sibling}V=Co(M,k.mode,V),V.return=k,k=V}return m(k);case te:return M=yi(M),ln(k,w,M,V)}if($(M))return me(k,w,M,V);if(ne(M)){if(xe=ne(M),typeof xe!="function")throw Error(s(150));return M=xe.call(M),De(k,w,M,V)}if(typeof M.then=="function")return ln(k,w,Fl(M),V);if(M.$$typeof===q)return ln(k,w,Yl(k,M),V);Jl(k,M)}return typeof M=="string"&&M!==""||typeof M=="number"||typeof M=="bigint"?(M=""+M,w!==null&&w.tag===6?(t(k,w.sibling),V=o(w,M),V.return=k,k=V):(t(k,w),V=_o(M,k.mode,V),V.return=k,k=V),m(k)):t(k,w)}return function(k,w,M,V){try{Or=0;var xe=ln(k,w,M,V);return Qi=null,xe}catch(ve){if(ve===Gi||ve===Ql)throw ve;var qe=ot(29,ve,null,k.mode);return qe.lanes=V,qe.return=k,qe}}}var zi=Ef(!0),xf=Ef(!1),Ia=!1;function Vo(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function qo(e,n){e=e.updateQueue,n.updateQueue===e&&(n.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function Ma(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function _a(e,n,t){var i=e.updateQueue;if(i===null)return null;if(i=i.shared,(Ge&2)!==0){var o=i.pending;return o===null?n.next=n:(n.next=o.next,o.next=n),i.pending=n,n=Hl(e),lf(e,null,t),n}return Xl(e,i,n,t),Hl(e)}function Wr(e,n,t){if(n=n.updateQueue,n!==null&&(n=n.shared,(t&4194048)!==0)){var i=n.lanes;i&=e.pendingLanes,t|=i,n.lanes=t,I(e,t)}}function Yo(e,n){var t=e.updateQueue,i=e.alternate;if(i!==null&&(i=i.updateQueue,t===i)){var o=null,c=null;if(t=t.firstBaseUpdate,t!==null){do{var m={lane:t.lane,tag:t.tag,payload:t.payload,callback:null,next:null};c===null?o=c=m:c=c.next=m,t=t.next}while(t!==null);c===null?o=c=n:c=c.next=n}else o=c=n;t={baseState:i.baseState,firstBaseUpdate:o,lastBaseUpdate:c,shared:i.shared,callbacks:i.callbacks},e.updateQueue=t;return}e=t.lastBaseUpdate,e===null?t.firstBaseUpdate=n:e.next=n,t.lastBaseUpdate=n}var Go=!1;function Ur(){if(Go){var e=Yi;if(e!==null)throw e}}function Pr(e,n,t,i){Go=!1;var o=e.updateQueue;Ia=!1;var c=o.firstBaseUpdate,m=o.lastBaseUpdate,z=o.shared.pending;if(z!==null){o.shared.pending=null;var D=z,_=D.next;D.next=null,m===null?c=_:m.next=_,m=D;var B=e.alternate;B!==null&&(B=B.updateQueue,z=B.lastBaseUpdate,z!==m&&(z===null?B.firstBaseUpdate=_:z.next=_,B.lastBaseUpdate=D))}if(c!==null){var Y=o.baseState;m=0,B=_=D=null,z=c;do{var O=z.lane&-536870913,U=O!==z.lane;if(U?(Be&O)===O:(i&O)===O){O!==0&&O===qi&&(Go=!0),B!==null&&(B=B.next={lane:0,tag:z.tag,payload:z.payload,callback:null,next:null});e:{var me=e,De=z;O=n;var ln=t;switch(De.tag){case 1:if(me=De.payload,typeof me=="function"){Y=me.call(ln,Y,O);break e}Y=me;break e;case 3:me.flags=me.flags&-65537|128;case 0:if(me=De.payload,O=typeof me=="function"?me.call(ln,Y,O):me,O==null)break e;Y=b({},Y,O);break e;case 2:Ia=!0}}O=z.callback,O!==null&&(e.flags|=64,U&&(e.flags|=8192),U=o.callbacks,U===null?o.callbacks=[O]:U.push(O))}else U={lane:O,tag:z.tag,payload:z.payload,callback:z.callback,next:null},B===null?(_=B=U,D=Y):B=B.next=U,m|=O;if(z=z.next,z===null){if(z=o.shared.pending,z===null)break;U=z,z=U.next,U.next=null,o.lastBaseUpdate=U,o.shared.pending=null}}while(!0);B===null&&(D=Y),o.baseState=D,o.firstBaseUpdate=_,o.lastBaseUpdate=B,c===null&&(o.shared.lanes=0),Wa|=m,e.lanes=m,e.memoizedState=Y}}function Df(e,n){if(typeof e!="function")throw Error(s(191,e));e.call(n)}function Tf(e,n){var t=e.callbacks;if(t!==null)for(e.callbacks=null,e=0;e<t.length;e++)Df(t[e],n)}var Ki=T(null),$l=T(0);function Af(e,n){e=pa,E($l,e),E(Ki,n),pa=e|n.baseLanes}function Qo(){E($l,pa),E(Ki,Ki.current)}function Ko(){pa=$l.current,j(Ki),j($l)}var ct=T(null),wt=null;function Ca(e){var n=e.alternate;E(Dn,Dn.current&1),E(ct,e),wt===null&&(n===null||Ki.current!==null||n.memoizedState!==null)&&(wt=e)}function Fo(e){E(Dn,Dn.current),E(ct,e),wt===null&&(wt=e)}function wf(e){e.tag===22?(E(Dn,Dn.current),E(ct,e),wt===null&&(wt=e)):La()}function La(){E(Dn,Dn.current),E(ct,ct.current)}function ut(e){j(ct),wt===e&&(wt=null),j(Dn)}var Dn=T(0);function es(e){for(var n=e;n!==null;){if(n.tag===13){var t=n.memoizedState;if(t!==null&&(t=t.dehydrated,t===null||au(t)||iu(t)))return n}else if(n.tag===19&&(n.memoizedProps.revealOrder==="forwards"||n.memoizedProps.revealOrder==="backwards"||n.memoizedProps.revealOrder==="unstable_legacy-backwards"||n.memoizedProps.revealOrder==="together")){if((n.flags&128)!==0)return n}else if(n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return null;n=n.return}n.sibling.return=n.return,n=n.sibling}return null}var ra=0,Ce=null,an=null,wn=null,ns=!1,Fi=!1,vi=!1,ts=0,jr=0,Ji=null,xb=0;function Sn(){throw Error(s(321))}function Jo(e,n){if(n===null)return!1;for(var t=0;t<n.length&&t<e.length;t++)if(!st(e[t],n[t]))return!1;return!0}function $o(e,n,t,i,o,c){return ra=c,Ce=n,n.memoizedState=null,n.updateQueue=null,n.lanes=0,C.H=e===null||e.memoizedState===null?up:hc,vi=!1,c=t(i,o),vi=!1,Fi&&(c=kf(n,t,i,o)),Rf(e),c}function Rf(e){C.H=Hr;var n=an!==null&&an.next!==null;if(ra=0,wn=an=Ce=null,ns=!1,jr=0,Ji=null,n)throw Error(s(300));e===null||Rn||(e=e.dependencies,e!==null&&ql(e)&&(Rn=!0))}function kf(e,n,t,i){Ce=e;var o=0;do{if(Fi&&(Ji=null),jr=0,Fi=!1,25<=o)throw Error(s(301));if(o+=1,wn=an=null,e.updateQueue!=null){var c=e.updateQueue;c.lastEffect=null,c.events=null,c.stores=null,c.memoCache!=null&&(c.memoCache.index=0)}C.H=dp,c=n(t,i)}while(Fi);return c}function Db(){var e=C.H,n=e.useState()[0];return n=typeof n.then=="function"?Br(n):n,e=e.useState()[0],(an!==null?an.memoizedState:null)!==e&&(Ce.flags|=1024),n}function ec(){var e=ts!==0;return ts=0,e}function nc(e,n,t){n.updateQueue=e.updateQueue,n.flags&=-2053,e.lanes&=~t}function tc(e){if(ns){for(e=e.memoizedState;e!==null;){var n=e.queue;n!==null&&(n.pending=null),e=e.next}ns=!1}ra=0,wn=an=Ce=null,Fi=!1,jr=ts=0,Ji=null}function Vn(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return wn===null?Ce.memoizedState=wn=e:wn=wn.next=e,wn}function Tn(){if(an===null){var e=Ce.alternate;e=e!==null?e.memoizedState:null}else e=an.next;var n=wn===null?Ce.memoizedState:wn.next;if(n!==null)wn=n,an=e;else{if(e===null)throw Ce.alternate===null?Error(s(467)):Error(s(310));an=e,e={memoizedState:an.memoizedState,baseState:an.baseState,baseQueue:an.baseQueue,queue:an.queue,next:null},wn===null?Ce.memoizedState=wn=e:wn=wn.next=e}return wn}function as(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function Br(e){var n=jr;return jr+=1,Ji===null&&(Ji=[]),e=zf(Ji,e,n),n=Ce,(wn===null?n.memoizedState:wn.next)===null&&(n=n.alternate,C.H=n===null||n.memoizedState===null?up:hc),e}function is(e){if(e!==null&&typeof e=="object"){if(typeof e.then=="function")return Br(e);if(e.$$typeof===q)return Pn(e)}throw Error(s(438,String(e)))}function ac(e){var n=null,t=Ce.updateQueue;if(t!==null&&(n=t.memoCache),n==null){var i=Ce.alternate;i!==null&&(i=i.updateQueue,i!==null&&(i=i.memoCache,i!=null&&(n={data:i.data.map(function(o){return o.slice()}),index:0})))}if(n==null&&(n={data:[],index:0}),t===null&&(t=as(),Ce.updateQueue=t),t.memoCache=n,t=n.data[n.index],t===void 0)for(t=n.data[n.index]=Array(e),i=0;i<e;i++)t[i]=ue;return n.index++,t}function la(e,n){return typeof n=="function"?n(e):n}function rs(e){var n=Tn();return ic(n,an,e)}function ic(e,n,t){var i=e.queue;if(i===null)throw Error(s(311));i.lastRenderedReducer=t;var o=e.baseQueue,c=i.pending;if(c!==null){if(o!==null){var m=o.next;o.next=c.next,c.next=m}n.baseQueue=o=c,i.pending=null}if(c=e.baseState,o===null)e.memoizedState=c;else{n=o.next;var z=m=null,D=null,_=n,B=!1;do{var Y=_.lane&-536870913;if(Y!==_.lane?(Be&Y)===Y:(ra&Y)===Y){var O=_.revertLane;if(O===0)D!==null&&(D=D.next={lane:0,revertLane:0,gesture:null,action:_.action,hasEagerState:_.hasEagerState,eagerState:_.eagerState,next:null}),Y===qi&&(B=!0);else if((ra&O)===O){_=_.next,O===qi&&(B=!0);continue}else Y={lane:0,revertLane:_.revertLane,gesture:null,action:_.action,hasEagerState:_.hasEagerState,eagerState:_.eagerState,next:null},D===null?(z=D=Y,m=c):D=D.next=Y,Ce.lanes|=O,Wa|=O;Y=_.action,vi&&t(c,Y),c=_.hasEagerState?_.eagerState:t(c,Y)}else O={lane:Y,revertLane:_.revertLane,gesture:_.gesture,action:_.action,hasEagerState:_.hasEagerState,eagerState:_.eagerState,next:null},D===null?(z=D=O,m=c):D=D.next=O,Ce.lanes|=Y,Wa|=Y;_=_.next}while(_!==null&&_!==n);if(D===null?m=c:D.next=z,!st(c,e.memoizedState)&&(Rn=!0,B&&(t=Yi,t!==null)))throw t;e.memoizedState=c,e.baseState=m,e.baseQueue=D,i.lastRenderedState=c}return o===null&&(i.lanes=0),[e.memoizedState,i.dispatch]}function rc(e){var n=Tn(),t=n.queue;if(t===null)throw Error(s(311));t.lastRenderedReducer=e;var i=t.dispatch,o=t.pending,c=n.memoizedState;if(o!==null){t.pending=null;var m=o=o.next;do c=e(c,m.action),m=m.next;while(m!==o);st(c,n.memoizedState)||(Rn=!0),n.memoizedState=c,n.baseQueue===null&&(n.baseState=c),t.lastRenderedState=c}return[c,i]}function If(e,n,t){var i=Ce,o=Tn(),c=He;if(c){if(t===void 0)throw Error(s(407));t=t()}else t=n();var m=!st((an||o).memoizedState,t);if(m&&(o.memoizedState=t,Rn=!0),o=o.queue,oc(Cf.bind(null,i,o,e),[e]),o.getSnapshot!==n||m||wn!==null&&wn.memoizedState.tag&1){if(i.flags|=2048,$i(9,{destroy:void 0},_f.bind(null,i,o,t,n),null),sn===null)throw Error(s(349));c||(ra&127)!==0||Mf(i,n,t)}return t}function Mf(e,n,t){e.flags|=16384,e={getSnapshot:n,value:t},n=Ce.updateQueue,n===null?(n=as(),Ce.updateQueue=n,n.stores=[e]):(t=n.stores,t===null?n.stores=[e]:t.push(e))}function _f(e,n,t,i){n.value=t,n.getSnapshot=i,Lf(n)&&Of(e)}function Cf(e,n,t){return t(function(){Lf(n)&&Of(e)})}function Lf(e){var n=e.getSnapshot;e=e.value;try{var t=n();return!st(e,t)}catch{return!0}}function Of(e){var n=di(e,2);n!==null&&nt(n,e,2)}function lc(e){var n=Vn();if(typeof e=="function"){var t=e;if(e=t(),vi){Nn(!0);try{t()}finally{Nn(!1)}}}return n.memoizedState=n.baseState=e,n.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:la,lastRenderedState:e},n}function Nf(e,n,t,i){return e.baseState=t,ic(e,an,typeof i=="function"?i:la)}function Tb(e,n,t,i,o){if(os(e))throw Error(s(485));if(e=n.action,e!==null){var c={payload:o,action:e,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(m){c.listeners.push(m)}};C.T!==null?t(!0):c.isTransition=!1,i(c),t=n.pending,t===null?(c.next=n.pending=c,Wf(n,c)):(c.next=t.next,n.pending=t.next=c)}}function Wf(e,n){var t=n.action,i=n.payload,o=e.state;if(n.isTransition){var c=C.T,m={};C.T=m;try{var z=t(o,i),D=C.S;D!==null&&D(m,z),Uf(e,n,z)}catch(_){sc(e,n,_)}finally{c!==null&&m.types!==null&&(c.types=m.types),C.T=c}}else try{c=t(o,i),Uf(e,n,c)}catch(_){sc(e,n,_)}}function Uf(e,n,t){t!==null&&typeof t=="object"&&typeof t.then=="function"?t.then(function(i){Pf(e,n,i)},function(i){return sc(e,n,i)}):Pf(e,n,t)}function Pf(e,n,t){n.status="fulfilled",n.value=t,jf(n),e.state=t,n=e.pending,n!==null&&(t=n.next,t===n?e.pending=null:(t=t.next,n.next=t,Wf(e,t)))}function sc(e,n,t){var i=e.pending;if(e.pending=null,i!==null){i=i.next;do n.status="rejected",n.reason=t,jf(n),n=n.next;while(n!==i)}e.action=null}function jf(e){e=e.listeners;for(var n=0;n<e.length;n++)(0,e[n])()}function Bf(e,n){return n}function Xf(e,n){if(He){var t=sn.formState;if(t!==null){e:{var i=Ce;if(He){if(pn){n:{for(var o=pn,c=At;o.nodeType!==8;){if(!c){o=null;break n}if(o=Rt(o.nextSibling),o===null){o=null;break n}}c=o.data,o=c==="F!"||c==="F"?o:null}if(o){pn=Rt(o.nextSibling),i=o.data==="F!";break e}}Ra(i)}i=!1}i&&(n=t[0])}}return t=Vn(),t.memoizedState=t.baseState=n,i={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Bf,lastRenderedState:n},t.queue=i,t=sp.bind(null,Ce,i),i.dispatch=t,i=lc(!1),c=pc.bind(null,Ce,!1,i.queue),i=Vn(),o={state:n,dispatch:null,action:e,pending:null},i.queue=o,t=Tb.bind(null,Ce,o,c,t),o.dispatch=t,i.memoizedState=e,[n,t,!1]}function Hf(e){var n=Tn();return Zf(n,an,e)}function Zf(e,n,t){if(n=ic(e,n,Bf)[0],e=rs(la)[0],typeof n=="object"&&n!==null&&typeof n.then=="function")try{var i=Br(n)}catch(m){throw m===Gi?Ql:m}else i=n;n=Tn();var o=n.queue,c=o.dispatch;return t!==n.memoizedState&&(Ce.flags|=2048,$i(9,{destroy:void 0},Ab.bind(null,o,t),null)),[i,c,e]}function Ab(e,n){e.action=n}function Vf(e){var n=Tn(),t=an;if(t!==null)return Zf(n,t,e);Tn(),n=n.memoizedState,t=Tn();var i=t.queue.dispatch;return t.memoizedState=e,[n,i,!1]}function $i(e,n,t,i){return e={tag:e,create:t,deps:i,inst:n,next:null},n=Ce.updateQueue,n===null&&(n=as(),Ce.updateQueue=n),t=n.lastEffect,t===null?n.lastEffect=e.next=e:(i=t.next,t.next=e,e.next=i,n.lastEffect=e),e}function qf(){return Tn().memoizedState}function ls(e,n,t,i){var o=Vn();Ce.flags|=e,o.memoizedState=$i(1|n,{destroy:void 0},t,i===void 0?null:i)}function ss(e,n,t,i){var o=Tn();i=i===void 0?null:i;var c=o.memoizedState.inst;an!==null&&i!==null&&Jo(i,an.memoizedState.deps)?o.memoizedState=$i(n,c,t,i):(Ce.flags|=e,o.memoizedState=$i(1|n,c,t,i))}function Yf(e,n){ls(8390656,8,e,n)}function oc(e,n){ss(2048,8,e,n)}function wb(e){Ce.flags|=4;var n=Ce.updateQueue;if(n===null)n=as(),Ce.updateQueue=n,n.events=[e];else{var t=n.events;t===null?n.events=[e]:t.push(e)}}function Gf(e){var n=Tn().memoizedState;return wb({ref:n,nextImpl:e}),function(){if((Ge&2)!==0)throw Error(s(440));return n.impl.apply(void 0,arguments)}}function Qf(e,n){return ss(4,2,e,n)}function Kf(e,n){return ss(4,4,e,n)}function Ff(e,n){if(typeof n=="function"){e=e();var t=n(e);return function(){typeof t=="function"?t():n(null)}}if(n!=null)return e=e(),n.current=e,function(){n.current=null}}function Jf(e,n,t){t=t!=null?t.concat([e]):null,ss(4,4,Ff.bind(null,n,e),t)}function cc(){}function $f(e,n){var t=Tn();n=n===void 0?null:n;var i=t.memoizedState;return n!==null&&Jo(n,i[1])?i[0]:(t.memoizedState=[e,n],e)}function ep(e,n){var t=Tn();n=n===void 0?null:n;var i=t.memoizedState;if(n!==null&&Jo(n,i[1]))return i[0];if(i=e(),vi){Nn(!0);try{e()}finally{Nn(!1)}}return t.memoizedState=[i,n],i}function uc(e,n,t){return t===void 0||(ra&1073741824)!==0&&(Be&261930)===0?e.memoizedState=n:(e.memoizedState=t,e=nh(),Ce.lanes|=e,Wa|=e,t)}function np(e,n,t,i){return st(t,n)?t:Ki.current!==null?(e=uc(e,t,i),st(e,n)||(Rn=!0),e):(ra&42)===0||(ra&1073741824)!==0&&(Be&261930)===0?(Rn=!0,e.memoizedState=t):(e=nh(),Ce.lanes|=e,Wa|=e,n)}function tp(e,n,t,i,o){var c=F.p;F.p=c!==0&&8>c?c:8;var m=C.T,z={};C.T=z,pc(e,!1,n,t);try{var D=o(),_=C.S;if(_!==null&&_(z,D),D!==null&&typeof D=="object"&&typeof D.then=="function"){var B=Eb(D,i);Xr(e,n,B,pt(e))}else Xr(e,n,i,pt(e))}catch(Y){Xr(e,n,{then:function(){},status:"rejected",reason:Y},pt())}finally{F.p=c,m!==null&&z.types!==null&&(m.types=z.types),C.T=m}}function Rb(){}function dc(e,n,t,i){if(e.tag!==5)throw Error(s(476));var o=ap(e).queue;tp(e,o,n,le,t===null?Rb:function(){return ip(e),t(i)})}function ap(e){var n=e.memoizedState;if(n!==null)return n;n={memoizedState:le,baseState:le,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:la,lastRenderedState:le},next:null};var t={};return n.next={memoizedState:t,baseState:t,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:la,lastRenderedState:t},next:null},e.memoizedState=n,e=e.alternate,e!==null&&(e.memoizedState=n),n}function ip(e){var n=ap(e);n.next===null&&(n=e.alternate.memoizedState),Xr(e,n.next.queue,{},pt())}function fc(){return Pn(rl)}function rp(){return Tn().memoizedState}function lp(){return Tn().memoizedState}function kb(e){for(var n=e.return;n!==null;){switch(n.tag){case 24:case 3:var t=pt();e=Ma(t);var i=_a(n,e,t);i!==null&&(nt(i,n,t),Wr(i,n,t)),n={cache:Bo()},e.payload=n;return}n=n.return}}function Ib(e,n,t){var i=pt();t={lane:i,revertLane:0,gesture:null,action:t,hasEagerState:!1,eagerState:null,next:null},os(e)?op(n,t):(t=Io(e,n,t,i),t!==null&&(nt(t,e,i),cp(t,n,i)))}function sp(e,n,t){var i=pt();Xr(e,n,t,i)}function Xr(e,n,t,i){var o={lane:i,revertLane:0,gesture:null,action:t,hasEagerState:!1,eagerState:null,next:null};if(os(e))op(n,o);else{var c=e.alternate;if(e.lanes===0&&(c===null||c.lanes===0)&&(c=n.lastRenderedReducer,c!==null))try{var m=n.lastRenderedState,z=c(m,t);if(o.hasEagerState=!0,o.eagerState=z,st(z,m))return Xl(e,n,o,0),sn===null&&Bl(),!1}catch{}if(t=Io(e,n,o,i),t!==null)return nt(t,e,i),cp(t,n,i),!0}return!1}function pc(e,n,t,i){if(i={lane:2,revertLane:Vc(),gesture:null,action:i,hasEagerState:!1,eagerState:null,next:null},os(e)){if(n)throw Error(s(479))}else n=Io(e,t,i,2),n!==null&&nt(n,e,2)}function os(e){var n=e.alternate;return e===Ce||n!==null&&n===Ce}function op(e,n){Fi=ns=!0;var t=e.pending;t===null?n.next=n:(n.next=t.next,t.next=n),e.pending=n}function cp(e,n,t){if((t&4194048)!==0){var i=n.lanes;i&=e.pendingLanes,t|=i,n.lanes=t,I(e,t)}}var Hr={readContext:Pn,use:is,useCallback:Sn,useContext:Sn,useEffect:Sn,useImperativeHandle:Sn,useLayoutEffect:Sn,useInsertionEffect:Sn,useMemo:Sn,useReducer:Sn,useRef:Sn,useState:Sn,useDebugValue:Sn,useDeferredValue:Sn,useTransition:Sn,useSyncExternalStore:Sn,useId:Sn,useHostTransitionStatus:Sn,useFormState:Sn,useActionState:Sn,useOptimistic:Sn,useMemoCache:Sn,useCacheRefresh:Sn};Hr.useEffectEvent=Sn;var up={readContext:Pn,use:is,useCallback:function(e,n){return Vn().memoizedState=[e,n===void 0?null:n],e},useContext:Pn,useEffect:Yf,useImperativeHandle:function(e,n,t){t=t!=null?t.concat([e]):null,ls(4194308,4,Ff.bind(null,n,e),t)},useLayoutEffect:function(e,n){return ls(4194308,4,e,n)},useInsertionEffect:function(e,n){ls(4,2,e,n)},useMemo:function(e,n){var t=Vn();n=n===void 0?null:n;var i=e();if(vi){Nn(!0);try{e()}finally{Nn(!1)}}return t.memoizedState=[i,n],i},useReducer:function(e,n,t){var i=Vn();if(t!==void 0){var o=t(n);if(vi){Nn(!0);try{t(n)}finally{Nn(!1)}}}else o=n;return i.memoizedState=i.baseState=o,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:o},i.queue=e,e=e.dispatch=Ib.bind(null,Ce,e),[i.memoizedState,e]},useRef:function(e){var n=Vn();return e={current:e},n.memoizedState=e},useState:function(e){e=lc(e);var n=e.queue,t=sp.bind(null,Ce,n);return n.dispatch=t,[e.memoizedState,t]},useDebugValue:cc,useDeferredValue:function(e,n){var t=Vn();return uc(t,e,n)},useTransition:function(){var e=lc(!1);return e=tp.bind(null,Ce,e.queue,!0,!1),Vn().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,n,t){var i=Ce,o=Vn();if(He){if(t===void 0)throw Error(s(407));t=t()}else{if(t=n(),sn===null)throw Error(s(349));(Be&127)!==0||Mf(i,n,t)}o.memoizedState=t;var c={value:t,getSnapshot:n};return o.queue=c,Yf(Cf.bind(null,i,c,e),[e]),i.flags|=2048,$i(9,{destroy:void 0},_f.bind(null,i,c,t,n),null),t},useId:function(){var e=Vn(),n=sn.identifierPrefix;if(He){var t=Ht,i=Xt;t=(i&~(1<<32-Fe(i)-1)).toString(32)+t,n="_"+n+"R_"+t,t=ts++,0<t&&(n+="H"+t.toString(32)),n+="_"}else t=xb++,n="_"+n+"r_"+t.toString(32)+"_";return e.memoizedState=n},useHostTransitionStatus:fc,useFormState:Xf,useActionState:Xf,useOptimistic:function(e){var n=Vn();n.memoizedState=n.baseState=e;var t={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return n.queue=t,n=pc.bind(null,Ce,!0,t),t.dispatch=n,[e,n]},useMemoCache:ac,useCacheRefresh:function(){return Vn().memoizedState=kb.bind(null,Ce)},useEffectEvent:function(e){var n=Vn(),t={impl:e};return n.memoizedState=t,function(){if((Ge&2)!==0)throw Error(s(440));return t.impl.apply(void 0,arguments)}}},hc={readContext:Pn,use:is,useCallback:$f,useContext:Pn,useEffect:oc,useImperativeHandle:Jf,useInsertionEffect:Qf,useLayoutEffect:Kf,useMemo:ep,useReducer:rs,useRef:qf,useState:function(){return rs(la)},useDebugValue:cc,useDeferredValue:function(e,n){var t=Tn();return np(t,an.memoizedState,e,n)},useTransition:function(){var e=rs(la)[0],n=Tn().memoizedState;return[typeof e=="boolean"?e:Br(e),n]},useSyncExternalStore:If,useId:rp,useHostTransitionStatus:fc,useFormState:Hf,useActionState:Hf,useOptimistic:function(e,n){var t=Tn();return Nf(t,an,e,n)},useMemoCache:ac,useCacheRefresh:lp};hc.useEffectEvent=Gf;var dp={readContext:Pn,use:is,useCallback:$f,useContext:Pn,useEffect:oc,useImperativeHandle:Jf,useInsertionEffect:Qf,useLayoutEffect:Kf,useMemo:ep,useReducer:rc,useRef:qf,useState:function(){return rc(la)},useDebugValue:cc,useDeferredValue:function(e,n){var t=Tn();return an===null?uc(t,e,n):np(t,an.memoizedState,e,n)},useTransition:function(){var e=rc(la)[0],n=Tn().memoizedState;return[typeof e=="boolean"?e:Br(e),n]},useSyncExternalStore:If,useId:rp,useHostTransitionStatus:fc,useFormState:Vf,useActionState:Vf,useOptimistic:function(e,n){var t=Tn();return an!==null?Nf(t,an,e,n):(t.baseState=e,[e,t.queue.dispatch])},useMemoCache:ac,useCacheRefresh:lp};dp.useEffectEvent=Gf;function mc(e,n,t,i){n=e.memoizedState,t=t(i,n),t=t==null?n:b({},n,t),e.memoizedState=t,e.lanes===0&&(e.updateQueue.baseState=t)}var gc={enqueueSetState:function(e,n,t){e=e._reactInternals;var i=pt(),o=Ma(i);o.payload=n,t!=null&&(o.callback=t),n=_a(e,o,i),n!==null&&(nt(n,e,i),Wr(n,e,i))},enqueueReplaceState:function(e,n,t){e=e._reactInternals;var i=pt(),o=Ma(i);o.tag=1,o.payload=n,t!=null&&(o.callback=t),n=_a(e,o,i),n!==null&&(nt(n,e,i),Wr(n,e,i))},enqueueForceUpdate:function(e,n){e=e._reactInternals;var t=pt(),i=Ma(t);i.tag=2,n!=null&&(i.callback=n),n=_a(e,i,t),n!==null&&(nt(n,e,t),Wr(n,e,t))}};function fp(e,n,t,i,o,c,m){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(i,c,m):n.prototype&&n.prototype.isPureReactComponent?!kr(t,i)||!kr(o,c):!0}function pp(e,n,t,i){e=n.state,typeof n.componentWillReceiveProps=="function"&&n.componentWillReceiveProps(t,i),typeof n.UNSAFE_componentWillReceiveProps=="function"&&n.UNSAFE_componentWillReceiveProps(t,i),n.state!==e&&gc.enqueueReplaceState(n,n.state,null)}function Si(e,n){var t=n;if("ref"in n){t={};for(var i in n)i!=="ref"&&(t[i]=n[i])}if(e=e.defaultProps){t===n&&(t=b({},t));for(var o in e)t[o]===void 0&&(t[o]=e[o])}return t}function hp(e){jl(e)}function mp(e){console.error(e)}function gp(e){jl(e)}function cs(e,n){try{var t=e.onUncaughtError;t(n.value,{componentStack:n.stack})}catch(i){setTimeout(function(){throw i})}}function yp(e,n,t){try{var i=e.onCaughtError;i(t.value,{componentStack:t.stack,errorBoundary:n.tag===1?n.stateNode:null})}catch(o){setTimeout(function(){throw o})}}function yc(e,n,t){return t=Ma(t),t.tag=3,t.payload={element:null},t.callback=function(){cs(e,n)},t}function bp(e){return e=Ma(e),e.tag=3,e}function zp(e,n,t,i){var o=t.type.getDerivedStateFromError;if(typeof o=="function"){var c=i.value;e.payload=function(){return o(c)},e.callback=function(){yp(n,t,i)}}var m=t.stateNode;m!==null&&typeof m.componentDidCatch=="function"&&(e.callback=function(){yp(n,t,i),typeof o!="function"&&(Ua===null?Ua=new Set([this]):Ua.add(this));var z=i.stack;this.componentDidCatch(i.value,{componentStack:z!==null?z:""})})}function Mb(e,n,t,i,o){if(t.flags|=32768,i!==null&&typeof i=="object"&&typeof i.then=="function"){if(n=t.alternate,n!==null&&Vi(n,t,o,!0),t=ct.current,t!==null){switch(t.tag){case 31:case 13:return wt===null?Ss():t.alternate===null&&En===0&&(En=3),t.flags&=-257,t.flags|=65536,t.lanes=o,i===Kl?t.flags|=16384:(n=t.updateQueue,n===null?t.updateQueue=new Set([i]):n.add(i),Xc(e,i,o)),!1;case 22:return t.flags|=65536,i===Kl?t.flags|=16384:(n=t.updateQueue,n===null?(n={transitions:null,markerInstances:null,retryQueue:new Set([i])},t.updateQueue=n):(t=n.retryQueue,t===null?n.retryQueue=new Set([i]):t.add(i)),Xc(e,i,o)),!1}throw Error(s(435,t.tag))}return Xc(e,i,o),Ss(),!1}if(He)return n=ct.current,n!==null?((n.flags&65536)===0&&(n.flags|=256),n.flags|=65536,n.lanes=o,i!==No&&(e=Error(s(422),{cause:i}),_r(xt(e,t)))):(i!==No&&(n=Error(s(423),{cause:i}),_r(xt(n,t))),e=e.current.alternate,e.flags|=65536,o&=-o,e.lanes|=o,i=xt(i,t),o=yc(e.stateNode,i,o),Yo(e,o),En!==4&&(En=2)),!1;var c=Error(s(520),{cause:i});if(c=xt(c,t),Fr===null?Fr=[c]:Fr.push(c),En!==4&&(En=2),n===null)return!0;i=xt(i,t),t=n;do{switch(t.tag){case 3:return t.flags|=65536,e=o&-o,t.lanes|=e,e=yc(t.stateNode,i,e),Yo(t,e),!1;case 1:if(n=t.type,c=t.stateNode,(t.flags&128)===0&&(typeof n.getDerivedStateFromError=="function"||c!==null&&typeof c.componentDidCatch=="function"&&(Ua===null||!Ua.has(c))))return t.flags|=65536,o&=-o,t.lanes|=o,o=bp(o),zp(o,e,t,i),Yo(t,o),!1}t=t.return}while(t!==null);return!1}var bc=Error(s(461)),Rn=!1;function jn(e,n,t,i){n.child=e===null?xf(n,null,t,i):zi(n,e.child,t,i)}function vp(e,n,t,i,o){t=t.render;var c=n.ref;if("ref"in i){var m={};for(var z in i)z!=="ref"&&(m[z]=i[z])}else m=i;return mi(n),i=$o(e,n,t,m,c,o),z=ec(),e!==null&&!Rn?(nc(e,n,o),sa(e,n,o)):(He&&z&&Lo(n),n.flags|=1,jn(e,n,i,o),n.child)}function Sp(e,n,t,i,o){if(e===null){var c=t.type;return typeof c=="function"&&!Mo(c)&&c.defaultProps===void 0&&t.compare===null?(n.tag=15,n.type=c,Ep(e,n,c,i,o)):(e=Zl(t.type,null,i,n,n.mode,o),e.ref=n.ref,e.return=n,n.child=e)}if(c=e.child,!Ac(e,o)){var m=c.memoizedProps;if(t=t.compare,t=t!==null?t:kr,t(m,i)&&e.ref===n.ref)return sa(e,n,o)}return n.flags|=1,e=na(c,i),e.ref=n.ref,e.return=n,n.child=e}function Ep(e,n,t,i,o){if(e!==null){var c=e.memoizedProps;if(kr(c,i)&&e.ref===n.ref)if(Rn=!1,n.pendingProps=i=c,Ac(e,o))(e.flags&131072)!==0&&(Rn=!0);else return n.lanes=e.lanes,sa(e,n,o)}return zc(e,n,t,i,o)}function xp(e,n,t,i){var o=i.children,c=e!==null?e.memoizedState:null;if(e===null&&n.stateNode===null&&(n.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),i.mode==="hidden"){if((n.flags&128)!==0){if(c=c!==null?c.baseLanes|t:t,e!==null){for(i=n.child=e.child,o=0;i!==null;)o=o|i.lanes|i.childLanes,i=i.sibling;i=o&~c}else i=0,n.child=null;return Dp(e,n,c,t,i)}if((t&536870912)!==0)n.memoizedState={baseLanes:0,cachePool:null},e!==null&&Gl(n,c!==null?c.cachePool:null),c!==null?Af(n,c):Qo(),wf(n);else return i=n.lanes=536870912,Dp(e,n,c!==null?c.baseLanes|t:t,t,i)}else c!==null?(Gl(n,c.cachePool),Af(n,c),La(),n.memoizedState=null):(e!==null&&Gl(n,null),Qo(),La());return jn(e,n,o,t),n.child}function Zr(e,n){return e!==null&&e.tag===22||n.stateNode!==null||(n.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),n.sibling}function Dp(e,n,t,i,o){var c=Ho();return c=c===null?null:{parent:An._currentValue,pool:c},n.memoizedState={baseLanes:t,cachePool:c},e!==null&&Gl(n,null),Qo(),wf(n),e!==null&&Vi(e,n,i,!0),n.childLanes=o,null}function us(e,n){return n=fs({mode:n.mode,children:n.children},e.mode),n.ref=e.ref,e.child=n,n.return=e,n}function Tp(e,n,t){return zi(n,e.child,null,t),e=us(n,n.pendingProps),e.flags|=2,ut(n),n.memoizedState=null,e}function _b(e,n,t){var i=n.pendingProps,o=(n.flags&128)!==0;if(n.flags&=-129,e===null){if(He){if(i.mode==="hidden")return e=us(n,i),n.lanes=536870912,Zr(null,e);if(Fo(n),(e=pn)?(e=Wh(e,At),e=e!==null&&e.data==="&"?e:null,e!==null&&(n.memoizedState={dehydrated:e,treeContext:Aa!==null?{id:Xt,overflow:Ht}:null,retryLane:536870912,hydrationErrors:null},t=of(e),t.return=n,n.child=t,Un=n,pn=null)):e=null,e===null)throw Ra(n);return n.lanes=536870912,null}return us(n,i)}var c=e.memoizedState;if(c!==null){var m=c.dehydrated;if(Fo(n),o)if(n.flags&256)n.flags&=-257,n=Tp(e,n,t);else if(n.memoizedState!==null)n.child=e.child,n.flags|=128,n=null;else throw Error(s(558));else if(Rn||Vi(e,n,t,!1),o=(t&e.childLanes)!==0,Rn||o){if(i=sn,i!==null&&(m=W(i,t),m!==0&&m!==c.retryLane))throw c.retryLane=m,di(e,m),nt(i,e,m),bc;Ss(),n=Tp(e,n,t)}else e=c.treeContext,pn=Rt(m.nextSibling),Un=n,He=!0,wa=null,At=!1,e!==null&&df(n,e),n=us(n,i),n.flags|=4096;return n}return e=na(e.child,{mode:i.mode,children:i.children}),e.ref=n.ref,n.child=e,e.return=n,e}function ds(e,n){var t=n.ref;if(t===null)e!==null&&e.ref!==null&&(n.flags|=4194816);else{if(typeof t!="function"&&typeof t!="object")throw Error(s(284));(e===null||e.ref!==t)&&(n.flags|=4194816)}}function zc(e,n,t,i,o){return mi(n),t=$o(e,n,t,i,void 0,o),i=ec(),e!==null&&!Rn?(nc(e,n,o),sa(e,n,o)):(He&&i&&Lo(n),n.flags|=1,jn(e,n,t,o),n.child)}function Ap(e,n,t,i,o,c){return mi(n),n.updateQueue=null,t=kf(n,i,t,o),Rf(e),i=ec(),e!==null&&!Rn?(nc(e,n,c),sa(e,n,c)):(He&&i&&Lo(n),n.flags|=1,jn(e,n,t,c),n.child)}function wp(e,n,t,i,o){if(mi(n),n.stateNode===null){var c=Bi,m=t.contextType;typeof m=="object"&&m!==null&&(c=Pn(m)),c=new t(i,c),n.memoizedState=c.state!==null&&c.state!==void 0?c.state:null,c.updater=gc,n.stateNode=c,c._reactInternals=n,c=n.stateNode,c.props=i,c.state=n.memoizedState,c.refs={},Vo(n),m=t.contextType,c.context=typeof m=="object"&&m!==null?Pn(m):Bi,c.state=n.memoizedState,m=t.getDerivedStateFromProps,typeof m=="function"&&(mc(n,t,m,i),c.state=n.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof c.getSnapshotBeforeUpdate=="function"||typeof c.UNSAFE_componentWillMount!="function"&&typeof c.componentWillMount!="function"||(m=c.state,typeof c.componentWillMount=="function"&&c.componentWillMount(),typeof c.UNSAFE_componentWillMount=="function"&&c.UNSAFE_componentWillMount(),m!==c.state&&gc.enqueueReplaceState(c,c.state,null),Pr(n,i,c,o),Ur(),c.state=n.memoizedState),typeof c.componentDidMount=="function"&&(n.flags|=4194308),i=!0}else if(e===null){c=n.stateNode;var z=n.memoizedProps,D=Si(t,z);c.props=D;var _=c.context,B=t.contextType;m=Bi,typeof B=="object"&&B!==null&&(m=Pn(B));var Y=t.getDerivedStateFromProps;B=typeof Y=="function"||typeof c.getSnapshotBeforeUpdate=="function",z=n.pendingProps!==z,B||typeof c.UNSAFE_componentWillReceiveProps!="function"&&typeof c.componentWillReceiveProps!="function"||(z||_!==m)&&pp(n,c,i,m),Ia=!1;var O=n.memoizedState;c.state=O,Pr(n,i,c,o),Ur(),_=n.memoizedState,z||O!==_||Ia?(typeof Y=="function"&&(mc(n,t,Y,i),_=n.memoizedState),(D=Ia||fp(n,t,D,i,O,_,m))?(B||typeof c.UNSAFE_componentWillMount!="function"&&typeof c.componentWillMount!="function"||(typeof c.componentWillMount=="function"&&c.componentWillMount(),typeof c.UNSAFE_componentWillMount=="function"&&c.UNSAFE_componentWillMount()),typeof c.componentDidMount=="function"&&(n.flags|=4194308)):(typeof c.componentDidMount=="function"&&(n.flags|=4194308),n.memoizedProps=i,n.memoizedState=_),c.props=i,c.state=_,c.context=m,i=D):(typeof c.componentDidMount=="function"&&(n.flags|=4194308),i=!1)}else{c=n.stateNode,qo(e,n),m=n.memoizedProps,B=Si(t,m),c.props=B,Y=n.pendingProps,O=c.context,_=t.contextType,D=Bi,typeof _=="object"&&_!==null&&(D=Pn(_)),z=t.getDerivedStateFromProps,(_=typeof z=="function"||typeof c.getSnapshotBeforeUpdate=="function")||typeof c.UNSAFE_componentWillReceiveProps!="function"&&typeof c.componentWillReceiveProps!="function"||(m!==Y||O!==D)&&pp(n,c,i,D),Ia=!1,O=n.memoizedState,c.state=O,Pr(n,i,c,o),Ur();var U=n.memoizedState;m!==Y||O!==U||Ia||e!==null&&e.dependencies!==null&&ql(e.dependencies)?(typeof z=="function"&&(mc(n,t,z,i),U=n.memoizedState),(B=Ia||fp(n,t,B,i,O,U,D)||e!==null&&e.dependencies!==null&&ql(e.dependencies))?(_||typeof c.UNSAFE_componentWillUpdate!="function"&&typeof c.componentWillUpdate!="function"||(typeof c.componentWillUpdate=="function"&&c.componentWillUpdate(i,U,D),typeof c.UNSAFE_componentWillUpdate=="function"&&c.UNSAFE_componentWillUpdate(i,U,D)),typeof c.componentDidUpdate=="function"&&(n.flags|=4),typeof c.getSnapshotBeforeUpdate=="function"&&(n.flags|=1024)):(typeof c.componentDidUpdate!="function"||m===e.memoizedProps&&O===e.memoizedState||(n.flags|=4),typeof c.getSnapshotBeforeUpdate!="function"||m===e.memoizedProps&&O===e.memoizedState||(n.flags|=1024),n.memoizedProps=i,n.memoizedState=U),c.props=i,c.state=U,c.context=D,i=B):(typeof c.componentDidUpdate!="function"||m===e.memoizedProps&&O===e.memoizedState||(n.flags|=4),typeof c.getSnapshotBeforeUpdate!="function"||m===e.memoizedProps&&O===e.memoizedState||(n.flags|=1024),i=!1)}return c=i,ds(e,n),i=(n.flags&128)!==0,c||i?(c=n.stateNode,t=i&&typeof t.getDerivedStateFromError!="function"?null:c.render(),n.flags|=1,e!==null&&i?(n.child=zi(n,e.child,null,o),n.child=zi(n,null,t,o)):jn(e,n,t,o),n.memoizedState=c.state,e=n.child):e=sa(e,n,o),e}function Rp(e,n,t,i){return pi(),n.flags|=256,jn(e,n,t,i),n.child}var vc={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function Sc(e){return{baseLanes:e,cachePool:yf()}}function Ec(e,n,t){return e=e!==null?e.childLanes&~t:0,n&&(e|=ft),e}function kp(e,n,t){var i=n.pendingProps,o=!1,c=(n.flags&128)!==0,m;if((m=c)||(m=e!==null&&e.memoizedState===null?!1:(Dn.current&2)!==0),m&&(o=!0,n.flags&=-129),m=(n.flags&32)!==0,n.flags&=-33,e===null){if(He){if(o?Ca(n):La(),(e=pn)?(e=Wh(e,At),e=e!==null&&e.data!=="&"?e:null,e!==null&&(n.memoizedState={dehydrated:e,treeContext:Aa!==null?{id:Xt,overflow:Ht}:null,retryLane:536870912,hydrationErrors:null},t=of(e),t.return=n,n.child=t,Un=n,pn=null)):e=null,e===null)throw Ra(n);return iu(e)?n.lanes=32:n.lanes=536870912,null}var z=i.children;return i=i.fallback,o?(La(),o=n.mode,z=fs({mode:"hidden",children:z},o),i=fi(i,o,t,null),z.return=n,i.return=n,z.sibling=i,n.child=z,i=n.child,i.memoizedState=Sc(t),i.childLanes=Ec(e,m,t),n.memoizedState=vc,Zr(null,i)):(Ca(n),xc(n,z))}var D=e.memoizedState;if(D!==null&&(z=D.dehydrated,z!==null)){if(c)n.flags&256?(Ca(n),n.flags&=-257,n=Dc(e,n,t)):n.memoizedState!==null?(La(),n.child=e.child,n.flags|=128,n=null):(La(),z=i.fallback,o=n.mode,i=fs({mode:"visible",children:i.children},o),z=fi(z,o,t,null),z.flags|=2,i.return=n,z.return=n,i.sibling=z,n.child=i,zi(n,e.child,null,t),i=n.child,i.memoizedState=Sc(t),i.childLanes=Ec(e,m,t),n.memoizedState=vc,n=Zr(null,i));else if(Ca(n),iu(z)){if(m=z.nextSibling&&z.nextSibling.dataset,m)var _=m.dgst;m=_,i=Error(s(419)),i.stack="",i.digest=m,_r({value:i,source:null,stack:null}),n=Dc(e,n,t)}else if(Rn||Vi(e,n,t,!1),m=(t&e.childLanes)!==0,Rn||m){if(m=sn,m!==null&&(i=W(m,t),i!==0&&i!==D.retryLane))throw D.retryLane=i,di(e,i),nt(m,e,i),bc;au(z)||Ss(),n=Dc(e,n,t)}else au(z)?(n.flags|=192,n.child=e.child,n=null):(e=D.treeContext,pn=Rt(z.nextSibling),Un=n,He=!0,wa=null,At=!1,e!==null&&df(n,e),n=xc(n,i.children),n.flags|=4096);return n}return o?(La(),z=i.fallback,o=n.mode,D=e.child,_=D.sibling,i=na(D,{mode:"hidden",children:i.children}),i.subtreeFlags=D.subtreeFlags&65011712,_!==null?z=na(_,z):(z=fi(z,o,t,null),z.flags|=2),z.return=n,i.return=n,i.sibling=z,n.child=i,Zr(null,i),i=n.child,z=e.child.memoizedState,z===null?z=Sc(t):(o=z.cachePool,o!==null?(D=An._currentValue,o=o.parent!==D?{parent:D,pool:D}:o):o=yf(),z={baseLanes:z.baseLanes|t,cachePool:o}),i.memoizedState=z,i.childLanes=Ec(e,m,t),n.memoizedState=vc,Zr(e.child,i)):(Ca(n),t=e.child,e=t.sibling,t=na(t,{mode:"visible",children:i.children}),t.return=n,t.sibling=null,e!==null&&(m=n.deletions,m===null?(n.deletions=[e],n.flags|=16):m.push(e)),n.child=t,n.memoizedState=null,t)}function xc(e,n){return n=fs({mode:"visible",children:n},e.mode),n.return=e,e.child=n}function fs(e,n){return e=ot(22,e,null,n),e.lanes=0,e}function Dc(e,n,t){return zi(n,e.child,null,t),e=xc(n,n.pendingProps.children),e.flags|=2,n.memoizedState=null,e}function Ip(e,n,t){e.lanes|=n;var i=e.alternate;i!==null&&(i.lanes|=n),Po(e.return,n,t)}function Tc(e,n,t,i,o,c){var m=e.memoizedState;m===null?e.memoizedState={isBackwards:n,rendering:null,renderingStartTime:0,last:i,tail:t,tailMode:o,treeForkCount:c}:(m.isBackwards=n,m.rendering=null,m.renderingStartTime=0,m.last=i,m.tail=t,m.tailMode=o,m.treeForkCount=c)}function Mp(e,n,t){var i=n.pendingProps,o=i.revealOrder,c=i.tail;i=i.children;var m=Dn.current,z=(m&2)!==0;if(z?(m=m&1|2,n.flags|=128):m&=1,E(Dn,m),jn(e,n,i,t),i=He?Mr:0,!z&&e!==null&&(e.flags&128)!==0)e:for(e=n.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Ip(e,t,n);else if(e.tag===19)Ip(e,t,n);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===n)break e;for(;e.sibling===null;){if(e.return===null||e.return===n)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(o){case"forwards":for(t=n.child,o=null;t!==null;)e=t.alternate,e!==null&&es(e)===null&&(o=t),t=t.sibling;t=o,t===null?(o=n.child,n.child=null):(o=t.sibling,t.sibling=null),Tc(n,!1,o,t,c,i);break;case"backwards":case"unstable_legacy-backwards":for(t=null,o=n.child,n.child=null;o!==null;){if(e=o.alternate,e!==null&&es(e)===null){n.child=o;break}e=o.sibling,o.sibling=t,t=o,o=e}Tc(n,!0,t,null,c,i);break;case"together":Tc(n,!1,null,null,void 0,i);break;default:n.memoizedState=null}return n.child}function sa(e,n,t){if(e!==null&&(n.dependencies=e.dependencies),Wa|=n.lanes,(t&n.childLanes)===0)if(e!==null){if(Vi(e,n,t,!1),(t&n.childLanes)===0)return null}else return null;if(e!==null&&n.child!==e.child)throw Error(s(153));if(n.child!==null){for(e=n.child,t=na(e,e.pendingProps),n.child=t,t.return=n;e.sibling!==null;)e=e.sibling,t=t.sibling=na(e,e.pendingProps),t.return=n;t.sibling=null}return n.child}function Ac(e,n){return(e.lanes&n)!==0?!0:(e=e.dependencies,!!(e!==null&&ql(e)))}function Cb(e,n,t){switch(n.tag){case 3:Je(n,n.stateNode.containerInfo),ka(n,An,e.memoizedState.cache),pi();break;case 27:case 5:qn(n);break;case 4:Je(n,n.stateNode.containerInfo);break;case 10:ka(n,n.type,n.memoizedProps.value);break;case 31:if(n.memoizedState!==null)return n.flags|=128,Fo(n),null;break;case 13:var i=n.memoizedState;if(i!==null)return i.dehydrated!==null?(Ca(n),n.flags|=128,null):(t&n.child.childLanes)!==0?kp(e,n,t):(Ca(n),e=sa(e,n,t),e!==null?e.sibling:null);Ca(n);break;case 19:var o=(e.flags&128)!==0;if(i=(t&n.childLanes)!==0,i||(Vi(e,n,t,!1),i=(t&n.childLanes)!==0),o){if(i)return Mp(e,n,t);n.flags|=128}if(o=n.memoizedState,o!==null&&(o.rendering=null,o.tail=null,o.lastEffect=null),E(Dn,Dn.current),i)break;return null;case 22:return n.lanes=0,xp(e,n,t,n.pendingProps);case 24:ka(n,An,e.memoizedState.cache)}return sa(e,n,t)}function _p(e,n,t){if(e!==null)if(e.memoizedProps!==n.pendingProps)Rn=!0;else{if(!Ac(e,t)&&(n.flags&128)===0)return Rn=!1,Cb(e,n,t);Rn=(e.flags&131072)!==0}else Rn=!1,He&&(n.flags&1048576)!==0&&uf(n,Mr,n.index);switch(n.lanes=0,n.tag){case 16:e:{var i=n.pendingProps;if(e=yi(n.elementType),n.type=e,typeof e=="function")Mo(e)?(i=Si(e,i),n.tag=1,n=wp(null,n,e,i,t)):(n.tag=0,n=zc(null,n,e,i,t));else{if(e!=null){var o=e.$$typeof;if(o===de){n.tag=11,n=vp(null,n,e,i,t);break e}else if(o===R){n.tag=14,n=Sp(null,n,e,i,t);break e}}throw n=fe(e)||e,Error(s(306,n,""))}}return n;case 0:return zc(e,n,n.type,n.pendingProps,t);case 1:return i=n.type,o=Si(i,n.pendingProps),wp(e,n,i,o,t);case 3:e:{if(Je(n,n.stateNode.containerInfo),e===null)throw Error(s(387));i=n.pendingProps;var c=n.memoizedState;o=c.element,qo(e,n),Pr(n,i,null,t);var m=n.memoizedState;if(i=m.cache,ka(n,An,i),i!==c.cache&&jo(n,[An],t,!0),Ur(),i=m.element,c.isDehydrated)if(c={element:i,isDehydrated:!1,cache:m.cache},n.updateQueue.baseState=c,n.memoizedState=c,n.flags&256){n=Rp(e,n,i,t);break e}else if(i!==o){o=xt(Error(s(424)),n),_r(o),n=Rp(e,n,i,t);break e}else for(e=n.stateNode.containerInfo,e.nodeType===9?e=e.body:e=e.nodeName==="HTML"?e.ownerDocument.body:e,pn=Rt(e.firstChild),Un=n,He=!0,wa=null,At=!0,t=xf(n,null,i,t),n.child=t;t;)t.flags=t.flags&-3|4096,t=t.sibling;else{if(pi(),i===o){n=sa(e,n,t);break e}jn(e,n,i,t)}n=n.child}return n;case 26:return ds(e,n),e===null?(t=Hh(n.type,null,n.pendingProps,null))?n.memoizedState=t:He||(t=n.type,e=n.pendingProps,i=Rs(ye.current).createElement(t),i[ce]=n,i[oe]=e,Bn(i,t,e),vn(i),n.stateNode=i):n.memoizedState=Hh(n.type,e.memoizedProps,n.pendingProps,e.memoizedState),null;case 27:return qn(n),e===null&&He&&(i=n.stateNode=jh(n.type,n.pendingProps,ye.current),Un=n,At=!0,o=pn,Xa(n.type)?(ru=o,pn=Rt(i.firstChild)):pn=o),jn(e,n,n.pendingProps.children,t),ds(e,n),e===null&&(n.flags|=4194304),n.child;case 5:return e===null&&He&&((o=i=pn)&&(i=c1(i,n.type,n.pendingProps,At),i!==null?(n.stateNode=i,Un=n,pn=Rt(i.firstChild),At=!1,o=!0):o=!1),o||Ra(n)),qn(n),o=n.type,c=n.pendingProps,m=e!==null?e.memoizedProps:null,i=c.children,eu(o,c)?i=null:m!==null&&eu(o,m)&&(n.flags|=32),n.memoizedState!==null&&(o=$o(e,n,Db,null,null,t),rl._currentValue=o),ds(e,n),jn(e,n,i,t),n.child;case 6:return e===null&&He&&((e=t=pn)&&(t=u1(t,n.pendingProps,At),t!==null?(n.stateNode=t,Un=n,pn=null,e=!0):e=!1),e||Ra(n)),null;case 13:return kp(e,n,t);case 4:return Je(n,n.stateNode.containerInfo),i=n.pendingProps,e===null?n.child=zi(n,null,i,t):jn(e,n,i,t),n.child;case 11:return vp(e,n,n.type,n.pendingProps,t);case 7:return jn(e,n,n.pendingProps,t),n.child;case 8:return jn(e,n,n.pendingProps.children,t),n.child;case 12:return jn(e,n,n.pendingProps.children,t),n.child;case 10:return i=n.pendingProps,ka(n,n.type,i.value),jn(e,n,i.children,t),n.child;case 9:return o=n.type._context,i=n.pendingProps.children,mi(n),o=Pn(o),i=i(o),n.flags|=1,jn(e,n,i,t),n.child;case 14:return Sp(e,n,n.type,n.pendingProps,t);case 15:return Ep(e,n,n.type,n.pendingProps,t);case 19:return Mp(e,n,t);case 31:return _b(e,n,t);case 22:return xp(e,n,t,n.pendingProps);case 24:return mi(n),i=Pn(An),e===null?(o=Ho(),o===null&&(o=sn,c=Bo(),o.pooledCache=c,c.refCount++,c!==null&&(o.pooledCacheLanes|=t),o=c),n.memoizedState={parent:i,cache:o},Vo(n),ka(n,An,o)):((e.lanes&t)!==0&&(qo(e,n),Pr(n,null,null,t),Ur()),o=e.memoizedState,c=n.memoizedState,o.parent!==i?(o={parent:i,cache:i},n.memoizedState=o,n.lanes===0&&(n.memoizedState=n.updateQueue.baseState=o),ka(n,An,i)):(i=c.cache,ka(n,An,i),i!==o.cache&&jo(n,[An],t,!0))),jn(e,n,n.pendingProps.children,t),n.child;case 29:throw n.pendingProps}throw Error(s(156,n.tag))}function oa(e){e.flags|=4}function wc(e,n,t,i,o){if((n=(e.mode&32)!==0)&&(n=!1),n){if(e.flags|=16777216,(o&335544128)===o)if(e.stateNode.complete)e.flags|=8192;else if(rh())e.flags|=8192;else throw bi=Kl,Zo}else e.flags&=-16777217}function Cp(e,n){if(n.type!=="stylesheet"||(n.state.loading&4)!==0)e.flags&=-16777217;else if(e.flags|=16777216,!Gh(n))if(rh())e.flags|=8192;else throw bi=Kl,Zo}function ps(e,n){n!==null&&(e.flags|=4),e.flags&16384&&(n=e.tag!==22?ri():536870912,e.lanes|=n,ar|=n)}function Vr(e,n){if(!He)switch(e.tailMode){case"hidden":n=e.tail;for(var t=null;n!==null;)n.alternate!==null&&(t=n),n=n.sibling;t===null?e.tail=null:t.sibling=null;break;case"collapsed":t=e.tail;for(var i=null;t!==null;)t.alternate!==null&&(i=t),t=t.sibling;i===null?n||e.tail===null?e.tail=null:e.tail.sibling=null:i.sibling=null}}function hn(e){var n=e.alternate!==null&&e.alternate.child===e.child,t=0,i=0;if(n)for(var o=e.child;o!==null;)t|=o.lanes|o.childLanes,i|=o.subtreeFlags&65011712,i|=o.flags&65011712,o.return=e,o=o.sibling;else for(o=e.child;o!==null;)t|=o.lanes|o.childLanes,i|=o.subtreeFlags,i|=o.flags,o.return=e,o=o.sibling;return e.subtreeFlags|=i,e.childLanes=t,n}function Lb(e,n,t){var i=n.pendingProps;switch(Oo(n),n.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return hn(n),null;case 1:return hn(n),null;case 3:return t=n.stateNode,i=null,e!==null&&(i=e.memoizedState.cache),n.memoizedState.cache!==i&&(n.flags|=2048),ia(An),Ke(),t.pendingContext&&(t.context=t.pendingContext,t.pendingContext=null),(e===null||e.child===null)&&(Zi(n)?oa(n):e===null||e.memoizedState.isDehydrated&&(n.flags&256)===0||(n.flags|=1024,Wo())),hn(n),null;case 26:var o=n.type,c=n.memoizedState;return e===null?(oa(n),c!==null?(hn(n),Cp(n,c)):(hn(n),wc(n,o,null,i,t))):c?c!==e.memoizedState?(oa(n),hn(n),Cp(n,c)):(hn(n),n.flags&=-16777217):(e=e.memoizedProps,e!==i&&oa(n),hn(n),wc(n,o,e,i,t)),null;case 27:if(Mt(n),t=ye.current,o=n.type,e!==null&&n.stateNode!=null)e.memoizedProps!==i&&oa(n);else{if(!i){if(n.stateNode===null)throw Error(s(166));return hn(n),null}e=re.current,Zi(n)?ff(n):(e=jh(o,i,t),n.stateNode=e,oa(n))}return hn(n),null;case 5:if(Mt(n),o=n.type,e!==null&&n.stateNode!=null)e.memoizedProps!==i&&oa(n);else{if(!i){if(n.stateNode===null)throw Error(s(166));return hn(n),null}if(c=re.current,Zi(n))ff(n);else{var m=Rs(ye.current);switch(c){case 1:c=m.createElementNS("http://www.w3.org/2000/svg",o);break;case 2:c=m.createElementNS("http://www.w3.org/1998/Math/MathML",o);break;default:switch(o){case"svg":c=m.createElementNS("http://www.w3.org/2000/svg",o);break;case"math":c=m.createElementNS("http://www.w3.org/1998/Math/MathML",o);break;case"script":c=m.createElement("div"),c.innerHTML="<script><\/script>",c=c.removeChild(c.firstChild);break;case"select":c=typeof i.is=="string"?m.createElement("select",{is:i.is}):m.createElement("select"),i.multiple?c.multiple=!0:i.size&&(c.size=i.size);break;default:c=typeof i.is=="string"?m.createElement(o,{is:i.is}):m.createElement(o)}}c[ce]=n,c[oe]=i;e:for(m=n.child;m!==null;){if(m.tag===5||m.tag===6)c.appendChild(m.stateNode);else if(m.tag!==4&&m.tag!==27&&m.child!==null){m.child.return=m,m=m.child;continue}if(m===n)break e;for(;m.sibling===null;){if(m.return===null||m.return===n)break e;m=m.return}m.sibling.return=m.return,m=m.sibling}n.stateNode=c;e:switch(Bn(c,o,i),o){case"button":case"input":case"select":case"textarea":i=!!i.autoFocus;break e;case"img":i=!0;break e;default:i=!1}i&&oa(n)}}return hn(n),wc(n,n.type,e===null?null:e.memoizedProps,n.pendingProps,t),null;case 6:if(e&&n.stateNode!=null)e.memoizedProps!==i&&oa(n);else{if(typeof i!="string"&&n.stateNode===null)throw Error(s(166));if(e=ye.current,Zi(n)){if(e=n.stateNode,t=n.memoizedProps,i=null,o=Un,o!==null)switch(o.tag){case 27:case 5:i=o.memoizedProps}e[ce]=n,e=!!(e.nodeValue===t||i!==null&&i.suppressHydrationWarning===!0||kh(e.nodeValue,t)),e||Ra(n,!0)}else e=Rs(e).createTextNode(i),e[ce]=n,n.stateNode=e}return hn(n),null;case 31:if(t=n.memoizedState,e===null||e.memoizedState!==null){if(i=Zi(n),t!==null){if(e===null){if(!i)throw Error(s(318));if(e=n.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(s(557));e[ce]=n}else pi(),(n.flags&128)===0&&(n.memoizedState=null),n.flags|=4;hn(n),e=!1}else t=Wo(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=t),e=!0;if(!e)return n.flags&256?(ut(n),n):(ut(n),null);if((n.flags&128)!==0)throw Error(s(558))}return hn(n),null;case 13:if(i=n.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(o=Zi(n),i!==null&&i.dehydrated!==null){if(e===null){if(!o)throw Error(s(318));if(o=n.memoizedState,o=o!==null?o.dehydrated:null,!o)throw Error(s(317));o[ce]=n}else pi(),(n.flags&128)===0&&(n.memoizedState=null),n.flags|=4;hn(n),o=!1}else o=Wo(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=o),o=!0;if(!o)return n.flags&256?(ut(n),n):(ut(n),null)}return ut(n),(n.flags&128)!==0?(n.lanes=t,n):(t=i!==null,e=e!==null&&e.memoizedState!==null,t&&(i=n.child,o=null,i.alternate!==null&&i.alternate.memoizedState!==null&&i.alternate.memoizedState.cachePool!==null&&(o=i.alternate.memoizedState.cachePool.pool),c=null,i.memoizedState!==null&&i.memoizedState.cachePool!==null&&(c=i.memoizedState.cachePool.pool),c!==o&&(i.flags|=2048)),t!==e&&t&&(n.child.flags|=8192),ps(n,n.updateQueue),hn(n),null);case 4:return Ke(),e===null&&Qc(n.stateNode.containerInfo),hn(n),null;case 10:return ia(n.type),hn(n),null;case 19:if(j(Dn),i=n.memoizedState,i===null)return hn(n),null;if(o=(n.flags&128)!==0,c=i.rendering,c===null)if(o)Vr(i,!1);else{if(En!==0||e!==null&&(e.flags&128)!==0)for(e=n.child;e!==null;){if(c=es(e),c!==null){for(n.flags|=128,Vr(i,!1),e=c.updateQueue,n.updateQueue=e,ps(n,e),n.subtreeFlags=0,e=t,t=n.child;t!==null;)sf(t,e),t=t.sibling;return E(Dn,Dn.current&1|2),He&&ta(n,i.treeForkCount),n.child}e=e.sibling}i.tail!==null&&bn()>bs&&(n.flags|=128,o=!0,Vr(i,!1),n.lanes=4194304)}else{if(!o)if(e=es(c),e!==null){if(n.flags|=128,o=!0,e=e.updateQueue,n.updateQueue=e,ps(n,e),Vr(i,!0),i.tail===null&&i.tailMode==="hidden"&&!c.alternate&&!He)return hn(n),null}else 2*bn()-i.renderingStartTime>bs&&t!==536870912&&(n.flags|=128,o=!0,Vr(i,!1),n.lanes=4194304);i.isBackwards?(c.sibling=n.child,n.child=c):(e=i.last,e!==null?e.sibling=c:n.child=c,i.last=c)}return i.tail!==null?(e=i.tail,i.rendering=e,i.tail=e.sibling,i.renderingStartTime=bn(),e.sibling=null,t=Dn.current,E(Dn,o?t&1|2:t&1),He&&ta(n,i.treeForkCount),e):(hn(n),null);case 22:case 23:return ut(n),Ko(),i=n.memoizedState!==null,e!==null?e.memoizedState!==null!==i&&(n.flags|=8192):i&&(n.flags|=8192),i?(t&536870912)!==0&&(n.flags&128)===0&&(hn(n),n.subtreeFlags&6&&(n.flags|=8192)):hn(n),t=n.updateQueue,t!==null&&ps(n,t.retryQueue),t=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(t=e.memoizedState.cachePool.pool),i=null,n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(i=n.memoizedState.cachePool.pool),i!==t&&(n.flags|=2048),e!==null&&j(gi),null;case 24:return t=null,e!==null&&(t=e.memoizedState.cache),n.memoizedState.cache!==t&&(n.flags|=2048),ia(An),hn(n),null;case 25:return null;case 30:return null}throw Error(s(156,n.tag))}function Ob(e,n){switch(Oo(n),n.tag){case 1:return e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 3:return ia(An),Ke(),e=n.flags,(e&65536)!==0&&(e&128)===0?(n.flags=e&-65537|128,n):null;case 26:case 27:case 5:return Mt(n),null;case 31:if(n.memoizedState!==null){if(ut(n),n.alternate===null)throw Error(s(340));pi()}return e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 13:if(ut(n),e=n.memoizedState,e!==null&&e.dehydrated!==null){if(n.alternate===null)throw Error(s(340));pi()}return e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 19:return j(Dn),null;case 4:return Ke(),null;case 10:return ia(n.type),null;case 22:case 23:return ut(n),Ko(),e!==null&&j(gi),e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 24:return ia(An),null;case 25:return null;default:return null}}function Lp(e,n){switch(Oo(n),n.tag){case 3:ia(An),Ke();break;case 26:case 27:case 5:Mt(n);break;case 4:Ke();break;case 31:n.memoizedState!==null&&ut(n);break;case 13:ut(n);break;case 19:j(Dn);break;case 10:ia(n.type);break;case 22:case 23:ut(n),Ko(),e!==null&&j(gi);break;case 24:ia(An)}}function qr(e,n){try{var t=n.updateQueue,i=t!==null?t.lastEffect:null;if(i!==null){var o=i.next;t=o;do{if((t.tag&e)===e){i=void 0;var c=t.create,m=t.inst;i=c(),m.destroy=i}t=t.next}while(t!==o)}}catch(z){nn(n,n.return,z)}}function Oa(e,n,t){try{var i=n.updateQueue,o=i!==null?i.lastEffect:null;if(o!==null){var c=o.next;i=c;do{if((i.tag&e)===e){var m=i.inst,z=m.destroy;if(z!==void 0){m.destroy=void 0,o=n;var D=t,_=z;try{_()}catch(B){nn(o,D,B)}}}i=i.next}while(i!==c)}}catch(B){nn(n,n.return,B)}}function Op(e){var n=e.updateQueue;if(n!==null){var t=e.stateNode;try{Tf(n,t)}catch(i){nn(e,e.return,i)}}}function Np(e,n,t){t.props=Si(e.type,e.memoizedProps),t.state=e.memoizedState;try{t.componentWillUnmount()}catch(i){nn(e,n,i)}}function Yr(e,n){try{var t=e.ref;if(t!==null){switch(e.tag){case 26:case 27:case 5:var i=e.stateNode;break;case 30:i=e.stateNode;break;default:i=e.stateNode}typeof t=="function"?e.refCleanup=t(i):t.current=i}}catch(o){nn(e,n,o)}}function Zt(e,n){var t=e.ref,i=e.refCleanup;if(t!==null)if(typeof i=="function")try{i()}catch(o){nn(e,n,o)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof t=="function")try{t(null)}catch(o){nn(e,n,o)}else t.current=null}function Wp(e){var n=e.type,t=e.memoizedProps,i=e.stateNode;try{e:switch(n){case"button":case"input":case"select":case"textarea":t.autoFocus&&i.focus();break e;case"img":t.src?i.src=t.src:t.srcSet&&(i.srcset=t.srcSet)}}catch(o){nn(e,e.return,o)}}function Rc(e,n,t){try{var i=e.stateNode;a1(i,e.type,t,n),i[oe]=n}catch(o){nn(e,e.return,o)}}function Up(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&Xa(e.type)||e.tag===4}function kc(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||Up(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&Xa(e.type)||e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Ic(e,n,t){var i=e.tag;if(i===5||i===6)e=e.stateNode,n?(t.nodeType===9?t.body:t.nodeName==="HTML"?t.ownerDocument.body:t).insertBefore(e,n):(n=t.nodeType===9?t.body:t.nodeName==="HTML"?t.ownerDocument.body:t,n.appendChild(e),t=t._reactRootContainer,t!=null||n.onclick!==null||(n.onclick=$t));else if(i!==4&&(i===27&&Xa(e.type)&&(t=e.stateNode,n=null),e=e.child,e!==null))for(Ic(e,n,t),e=e.sibling;e!==null;)Ic(e,n,t),e=e.sibling}function hs(e,n,t){var i=e.tag;if(i===5||i===6)e=e.stateNode,n?t.insertBefore(e,n):t.appendChild(e);else if(i!==4&&(i===27&&Xa(e.type)&&(t=e.stateNode),e=e.child,e!==null))for(hs(e,n,t),e=e.sibling;e!==null;)hs(e,n,t),e=e.sibling}function Pp(e){var n=e.stateNode,t=e.memoizedProps;try{for(var i=e.type,o=n.attributes;o.length;)n.removeAttributeNode(o[0]);Bn(n,i,t),n[ce]=e,n[oe]=t}catch(c){nn(e,e.return,c)}}var ca=!1,kn=!1,Mc=!1,jp=typeof WeakSet=="function"?WeakSet:Set,On=null;function Nb(e,n){if(e=e.containerInfo,Jc=Os,e=Fd(e),Do(e)){if("selectionStart"in e)var t={start:e.selectionStart,end:e.selectionEnd};else e:{t=(t=e.ownerDocument)&&t.defaultView||window;var i=t.getSelection&&t.getSelection();if(i&&i.rangeCount!==0){t=i.anchorNode;var o=i.anchorOffset,c=i.focusNode;i=i.focusOffset;try{t.nodeType,c.nodeType}catch{t=null;break e}var m=0,z=-1,D=-1,_=0,B=0,Y=e,O=null;n:for(;;){for(var U;Y!==t||o!==0&&Y.nodeType!==3||(z=m+o),Y!==c||i!==0&&Y.nodeType!==3||(D=m+i),Y.nodeType===3&&(m+=Y.nodeValue.length),(U=Y.firstChild)!==null;)O=Y,Y=U;for(;;){if(Y===e)break n;if(O===t&&++_===o&&(z=m),O===c&&++B===i&&(D=m),(U=Y.nextSibling)!==null)break;Y=O,O=Y.parentNode}Y=U}t=z===-1||D===-1?null:{start:z,end:D}}else t=null}t=t||{start:0,end:0}}else t=null;for($c={focusedElem:e,selectionRange:t},Os=!1,On=n;On!==null;)if(n=On,e=n.child,(n.subtreeFlags&1028)!==0&&e!==null)e.return=n,On=e;else for(;On!==null;){switch(n=On,c=n.alternate,e=n.flags,n.tag){case 0:if((e&4)!==0&&(e=n.updateQueue,e=e!==null?e.events:null,e!==null))for(t=0;t<e.length;t++)o=e[t],o.ref.impl=o.nextImpl;break;case 11:case 15:break;case 1:if((e&1024)!==0&&c!==null){e=void 0,t=n,o=c.memoizedProps,c=c.memoizedState,i=t.stateNode;try{var me=Si(t.type,o);e=i.getSnapshotBeforeUpdate(me,c),i.__reactInternalSnapshotBeforeUpdate=e}catch(De){nn(t,t.return,De)}}break;case 3:if((e&1024)!==0){if(e=n.stateNode.containerInfo,t=e.nodeType,t===9)tu(e);else if(t===1)switch(e.nodeName){case"HEAD":case"HTML":case"BODY":tu(e);break;default:e.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((e&1024)!==0)throw Error(s(163))}if(e=n.sibling,e!==null){e.return=n.return,On=e;break}On=n.return}}function Bp(e,n,t){var i=t.flags;switch(t.tag){case 0:case 11:case 15:da(e,t),i&4&&qr(5,t);break;case 1:if(da(e,t),i&4)if(e=t.stateNode,n===null)try{e.componentDidMount()}catch(m){nn(t,t.return,m)}else{var o=Si(t.type,n.memoizedProps);n=n.memoizedState;try{e.componentDidUpdate(o,n,e.__reactInternalSnapshotBeforeUpdate)}catch(m){nn(t,t.return,m)}}i&64&&Op(t),i&512&&Yr(t,t.return);break;case 3:if(da(e,t),i&64&&(e=t.updateQueue,e!==null)){if(n=null,t.child!==null)switch(t.child.tag){case 27:case 5:n=t.child.stateNode;break;case 1:n=t.child.stateNode}try{Tf(e,n)}catch(m){nn(t,t.return,m)}}break;case 27:n===null&&i&4&&Pp(t);case 26:case 5:da(e,t),n===null&&i&4&&Wp(t),i&512&&Yr(t,t.return);break;case 12:da(e,t);break;case 31:da(e,t),i&4&&Zp(e,t);break;case 13:da(e,t),i&4&&Vp(e,t),i&64&&(e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(t=Vb.bind(null,t),d1(e,t))));break;case 22:if(i=t.memoizedState!==null||ca,!i){n=n!==null&&n.memoizedState!==null||kn,o=ca;var c=kn;ca=i,(kn=n)&&!c?fa(e,t,(t.subtreeFlags&8772)!==0):da(e,t),ca=o,kn=c}break;case 30:break;default:da(e,t)}}function Xp(e){var n=e.alternate;n!==null&&(e.alternate=null,Xp(n)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(n=e.stateNode,n!==null&&on(n)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var gn=null,Fn=!1;function ua(e,n,t){for(t=t.child;t!==null;)Hp(e,n,t),t=t.sibling}function Hp(e,n,t){if(zn&&typeof zn.onCommitFiberUnmount=="function")try{zn.onCommitFiberUnmount(mn,t)}catch{}switch(t.tag){case 26:kn||Zt(t,n),ua(e,n,t),t.memoizedState?t.memoizedState.count--:t.stateNode&&(t=t.stateNode,t.parentNode.removeChild(t));break;case 27:kn||Zt(t,n);var i=gn,o=Fn;Xa(t.type)&&(gn=t.stateNode,Fn=!1),ua(e,n,t),tl(t.stateNode),gn=i,Fn=o;break;case 5:kn||Zt(t,n);case 6:if(i=gn,o=Fn,gn=null,ua(e,n,t),gn=i,Fn=o,gn!==null)if(Fn)try{(gn.nodeType===9?gn.body:gn.nodeName==="HTML"?gn.ownerDocument.body:gn).removeChild(t.stateNode)}catch(c){nn(t,n,c)}else try{gn.removeChild(t.stateNode)}catch(c){nn(t,n,c)}break;case 18:gn!==null&&(Fn?(e=gn,Oh(e.nodeType===9?e.body:e.nodeName==="HTML"?e.ownerDocument.body:e,t.stateNode),dr(e)):Oh(gn,t.stateNode));break;case 4:i=gn,o=Fn,gn=t.stateNode.containerInfo,Fn=!0,ua(e,n,t),gn=i,Fn=o;break;case 0:case 11:case 14:case 15:Oa(2,t,n),kn||Oa(4,t,n),ua(e,n,t);break;case 1:kn||(Zt(t,n),i=t.stateNode,typeof i.componentWillUnmount=="function"&&Np(t,n,i)),ua(e,n,t);break;case 21:ua(e,n,t);break;case 22:kn=(i=kn)||t.memoizedState!==null,ua(e,n,t),kn=i;break;default:ua(e,n,t)}}function Zp(e,n){if(n.memoizedState===null&&(e=n.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{dr(e)}catch(t){nn(n,n.return,t)}}}function Vp(e,n){if(n.memoizedState===null&&(e=n.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{dr(e)}catch(t){nn(n,n.return,t)}}function Wb(e){switch(e.tag){case 31:case 13:case 19:var n=e.stateNode;return n===null&&(n=e.stateNode=new jp),n;case 22:return e=e.stateNode,n=e._retryCache,n===null&&(n=e._retryCache=new jp),n;default:throw Error(s(435,e.tag))}}function ms(e,n){var t=Wb(e);n.forEach(function(i){if(!t.has(i)){t.add(i);var o=qb.bind(null,e,i);i.then(o,o)}})}function Jn(e,n){var t=n.deletions;if(t!==null)for(var i=0;i<t.length;i++){var o=t[i],c=e,m=n,z=m;e:for(;z!==null;){switch(z.tag){case 27:if(Xa(z.type)){gn=z.stateNode,Fn=!1;break e}break;case 5:gn=z.stateNode,Fn=!1;break e;case 3:case 4:gn=z.stateNode.containerInfo,Fn=!0;break e}z=z.return}if(gn===null)throw Error(s(160));Hp(c,m,o),gn=null,Fn=!1,c=o.alternate,c!==null&&(c.return=null),o.return=null}if(n.subtreeFlags&13886)for(n=n.child;n!==null;)qp(n,e),n=n.sibling}var Wt=null;function qp(e,n){var t=e.alternate,i=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:Jn(n,e),$n(e),i&4&&(Oa(3,e,e.return),qr(3,e),Oa(5,e,e.return));break;case 1:Jn(n,e),$n(e),i&512&&(kn||t===null||Zt(t,t.return)),i&64&&ca&&(e=e.updateQueue,e!==null&&(i=e.callbacks,i!==null&&(t=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=t===null?i:t.concat(i))));break;case 26:var o=Wt;if(Jn(n,e),$n(e),i&512&&(kn||t===null||Zt(t,t.return)),i&4){var c=t!==null?t.memoizedState:null;if(i=e.memoizedState,t===null)if(i===null)if(e.stateNode===null){e:{i=e.type,t=e.memoizedProps,o=o.ownerDocument||o;n:switch(i){case"title":c=o.getElementsByTagName("title")[0],(!c||c[We]||c[ce]||c.namespaceURI==="http://www.w3.org/2000/svg"||c.hasAttribute("itemprop"))&&(c=o.createElement(i),o.head.insertBefore(c,o.querySelector("head > title"))),Bn(c,i,t),c[ce]=e,vn(c),i=c;break e;case"link":var m=qh("link","href",o).get(i+(t.href||""));if(m){for(var z=0;z<m.length;z++)if(c=m[z],c.getAttribute("href")===(t.href==null||t.href===""?null:t.href)&&c.getAttribute("rel")===(t.rel==null?null:t.rel)&&c.getAttribute("title")===(t.title==null?null:t.title)&&c.getAttribute("crossorigin")===(t.crossOrigin==null?null:t.crossOrigin)){m.splice(z,1);break n}}c=o.createElement(i),Bn(c,i,t),o.head.appendChild(c);break;case"meta":if(m=qh("meta","content",o).get(i+(t.content||""))){for(z=0;z<m.length;z++)if(c=m[z],c.getAttribute("content")===(t.content==null?null:""+t.content)&&c.getAttribute("name")===(t.name==null?null:t.name)&&c.getAttribute("property")===(t.property==null?null:t.property)&&c.getAttribute("http-equiv")===(t.httpEquiv==null?null:t.httpEquiv)&&c.getAttribute("charset")===(t.charSet==null?null:t.charSet)){m.splice(z,1);break n}}c=o.createElement(i),Bn(c,i,t),o.head.appendChild(c);break;default:throw Error(s(468,i))}c[ce]=e,vn(c),i=c}e.stateNode=i}else Yh(o,e.type,e.stateNode);else e.stateNode=Vh(o,i,e.memoizedProps);else c!==i?(c===null?t.stateNode!==null&&(t=t.stateNode,t.parentNode.removeChild(t)):c.count--,i===null?Yh(o,e.type,e.stateNode):Vh(o,i,e.memoizedProps)):i===null&&e.stateNode!==null&&Rc(e,e.memoizedProps,t.memoizedProps)}break;case 27:Jn(n,e),$n(e),i&512&&(kn||t===null||Zt(t,t.return)),t!==null&&i&4&&Rc(e,e.memoizedProps,t.memoizedProps);break;case 5:if(Jn(n,e),$n(e),i&512&&(kn||t===null||Zt(t,t.return)),e.flags&32){o=e.stateNode;try{Li(o,"")}catch(me){nn(e,e.return,me)}}i&4&&e.stateNode!=null&&(o=e.memoizedProps,Rc(e,o,t!==null?t.memoizedProps:o)),i&1024&&(Mc=!0);break;case 6:if(Jn(n,e),$n(e),i&4){if(e.stateNode===null)throw Error(s(162));i=e.memoizedProps,t=e.stateNode;try{t.nodeValue=i}catch(me){nn(e,e.return,me)}}break;case 3:if(Ms=null,o=Wt,Wt=ks(n.containerInfo),Jn(n,e),Wt=o,$n(e),i&4&&t!==null&&t.memoizedState.isDehydrated)try{dr(n.containerInfo)}catch(me){nn(e,e.return,me)}Mc&&(Mc=!1,Yp(e));break;case 4:i=Wt,Wt=ks(e.stateNode.containerInfo),Jn(n,e),$n(e),Wt=i;break;case 12:Jn(n,e),$n(e);break;case 31:Jn(n,e),$n(e),i&4&&(i=e.updateQueue,i!==null&&(e.updateQueue=null,ms(e,i)));break;case 13:Jn(n,e),$n(e),e.child.flags&8192&&e.memoizedState!==null!=(t!==null&&t.memoizedState!==null)&&(ys=bn()),i&4&&(i=e.updateQueue,i!==null&&(e.updateQueue=null,ms(e,i)));break;case 22:o=e.memoizedState!==null;var D=t!==null&&t.memoizedState!==null,_=ca,B=kn;if(ca=_||o,kn=B||D,Jn(n,e),kn=B,ca=_,$n(e),i&8192)e:for(n=e.stateNode,n._visibility=o?n._visibility&-2:n._visibility|1,o&&(t===null||D||ca||kn||Ei(e)),t=null,n=e;;){if(n.tag===5||n.tag===26){if(t===null){D=t=n;try{if(c=D.stateNode,o)m=c.style,typeof m.setProperty=="function"?m.setProperty("display","none","important"):m.display="none";else{z=D.stateNode;var Y=D.memoizedProps.style,O=Y!=null&&Y.hasOwnProperty("display")?Y.display:null;z.style.display=O==null||typeof O=="boolean"?"":(""+O).trim()}}catch(me){nn(D,D.return,me)}}}else if(n.tag===6){if(t===null){D=n;try{D.stateNode.nodeValue=o?"":D.memoizedProps}catch(me){nn(D,D.return,me)}}}else if(n.tag===18){if(t===null){D=n;try{var U=D.stateNode;o?Nh(U,!0):Nh(D.stateNode,!1)}catch(me){nn(D,D.return,me)}}}else if((n.tag!==22&&n.tag!==23||n.memoizedState===null||n===e)&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break e;for(;n.sibling===null;){if(n.return===null||n.return===e)break e;t===n&&(t=null),n=n.return}t===n&&(t=null),n.sibling.return=n.return,n=n.sibling}i&4&&(i=e.updateQueue,i!==null&&(t=i.retryQueue,t!==null&&(i.retryQueue=null,ms(e,t))));break;case 19:Jn(n,e),$n(e),i&4&&(i=e.updateQueue,i!==null&&(e.updateQueue=null,ms(e,i)));break;case 30:break;case 21:break;default:Jn(n,e),$n(e)}}function $n(e){var n=e.flags;if(n&2){try{for(var t,i=e.return;i!==null;){if(Up(i)){t=i;break}i=i.return}if(t==null)throw Error(s(160));switch(t.tag){case 27:var o=t.stateNode,c=kc(e);hs(e,c,o);break;case 5:var m=t.stateNode;t.flags&32&&(Li(m,""),t.flags&=-33);var z=kc(e);hs(e,z,m);break;case 3:case 4:var D=t.stateNode.containerInfo,_=kc(e);Ic(e,_,D);break;default:throw Error(s(161))}}catch(B){nn(e,e.return,B)}e.flags&=-3}n&4096&&(e.flags&=-4097)}function Yp(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var n=e;Yp(n),n.tag===5&&n.flags&1024&&n.stateNode.reset(),e=e.sibling}}function da(e,n){if(n.subtreeFlags&8772)for(n=n.child;n!==null;)Bp(e,n.alternate,n),n=n.sibling}function Ei(e){for(e=e.child;e!==null;){var n=e;switch(n.tag){case 0:case 11:case 14:case 15:Oa(4,n,n.return),Ei(n);break;case 1:Zt(n,n.return);var t=n.stateNode;typeof t.componentWillUnmount=="function"&&Np(n,n.return,t),Ei(n);break;case 27:tl(n.stateNode);case 26:case 5:Zt(n,n.return),Ei(n);break;case 22:n.memoizedState===null&&Ei(n);break;case 30:Ei(n);break;default:Ei(n)}e=e.sibling}}function fa(e,n,t){for(t=t&&(n.subtreeFlags&8772)!==0,n=n.child;n!==null;){var i=n.alternate,o=e,c=n,m=c.flags;switch(c.tag){case 0:case 11:case 15:fa(o,c,t),qr(4,c);break;case 1:if(fa(o,c,t),i=c,o=i.stateNode,typeof o.componentDidMount=="function")try{o.componentDidMount()}catch(_){nn(i,i.return,_)}if(i=c,o=i.updateQueue,o!==null){var z=i.stateNode;try{var D=o.shared.hiddenCallbacks;if(D!==null)for(o.shared.hiddenCallbacks=null,o=0;o<D.length;o++)Df(D[o],z)}catch(_){nn(i,i.return,_)}}t&&m&64&&Op(c),Yr(c,c.return);break;case 27:Pp(c);case 26:case 5:fa(o,c,t),t&&i===null&&m&4&&Wp(c),Yr(c,c.return);break;case 12:fa(o,c,t);break;case 31:fa(o,c,t),t&&m&4&&Zp(o,c);break;case 13:fa(o,c,t),t&&m&4&&Vp(o,c);break;case 22:c.memoizedState===null&&fa(o,c,t),Yr(c,c.return);break;case 30:break;default:fa(o,c,t)}n=n.sibling}}function _c(e,n){var t=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(t=e.memoizedState.cachePool.pool),e=null,n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(e=n.memoizedState.cachePool.pool),e!==t&&(e!=null&&e.refCount++,t!=null&&Cr(t))}function Cc(e,n){e=null,n.alternate!==null&&(e=n.alternate.memoizedState.cache),n=n.memoizedState.cache,n!==e&&(n.refCount++,e!=null&&Cr(e))}function Ut(e,n,t,i){if(n.subtreeFlags&10256)for(n=n.child;n!==null;)Gp(e,n,t,i),n=n.sibling}function Gp(e,n,t,i){var o=n.flags;switch(n.tag){case 0:case 11:case 15:Ut(e,n,t,i),o&2048&&qr(9,n);break;case 1:Ut(e,n,t,i);break;case 3:Ut(e,n,t,i),o&2048&&(e=null,n.alternate!==null&&(e=n.alternate.memoizedState.cache),n=n.memoizedState.cache,n!==e&&(n.refCount++,e!=null&&Cr(e)));break;case 12:if(o&2048){Ut(e,n,t,i),e=n.stateNode;try{var c=n.memoizedProps,m=c.id,z=c.onPostCommit;typeof z=="function"&&z(m,n.alternate===null?"mount":"update",e.passiveEffectDuration,-0)}catch(D){nn(n,n.return,D)}}else Ut(e,n,t,i);break;case 31:Ut(e,n,t,i);break;case 13:Ut(e,n,t,i);break;case 23:break;case 22:c=n.stateNode,m=n.alternate,n.memoizedState!==null?c._visibility&2?Ut(e,n,t,i):Gr(e,n):c._visibility&2?Ut(e,n,t,i):(c._visibility|=2,er(e,n,t,i,(n.subtreeFlags&10256)!==0||!1)),o&2048&&_c(m,n);break;case 24:Ut(e,n,t,i),o&2048&&Cc(n.alternate,n);break;default:Ut(e,n,t,i)}}function er(e,n,t,i,o){for(o=o&&((n.subtreeFlags&10256)!==0||!1),n=n.child;n!==null;){var c=e,m=n,z=t,D=i,_=m.flags;switch(m.tag){case 0:case 11:case 15:er(c,m,z,D,o),qr(8,m);break;case 23:break;case 22:var B=m.stateNode;m.memoizedState!==null?B._visibility&2?er(c,m,z,D,o):Gr(c,m):(B._visibility|=2,er(c,m,z,D,o)),o&&_&2048&&_c(m.alternate,m);break;case 24:er(c,m,z,D,o),o&&_&2048&&Cc(m.alternate,m);break;default:er(c,m,z,D,o)}n=n.sibling}}function Gr(e,n){if(n.subtreeFlags&10256)for(n=n.child;n!==null;){var t=e,i=n,o=i.flags;switch(i.tag){case 22:Gr(t,i),o&2048&&_c(i.alternate,i);break;case 24:Gr(t,i),o&2048&&Cc(i.alternate,i);break;default:Gr(t,i)}n=n.sibling}}var Qr=8192;function nr(e,n,t){if(e.subtreeFlags&Qr)for(e=e.child;e!==null;)Qp(e,n,t),e=e.sibling}function Qp(e,n,t){switch(e.tag){case 26:nr(e,n,t),e.flags&Qr&&e.memoizedState!==null&&x1(t,Wt,e.memoizedState,e.memoizedProps);break;case 5:nr(e,n,t);break;case 3:case 4:var i=Wt;Wt=ks(e.stateNode.containerInfo),nr(e,n,t),Wt=i;break;case 22:e.memoizedState===null&&(i=e.alternate,i!==null&&i.memoizedState!==null?(i=Qr,Qr=16777216,nr(e,n,t),Qr=i):nr(e,n,t));break;default:nr(e,n,t)}}function Kp(e){var n=e.alternate;if(n!==null&&(e=n.child,e!==null)){n.child=null;do n=e.sibling,e.sibling=null,e=n;while(e!==null)}}function Kr(e){var n=e.deletions;if((e.flags&16)!==0){if(n!==null)for(var t=0;t<n.length;t++){var i=n[t];On=i,Jp(i,e)}Kp(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)Fp(e),e=e.sibling}function Fp(e){switch(e.tag){case 0:case 11:case 15:Kr(e),e.flags&2048&&Oa(9,e,e.return);break;case 3:Kr(e);break;case 12:Kr(e);break;case 22:var n=e.stateNode;e.memoizedState!==null&&n._visibility&2&&(e.return===null||e.return.tag!==13)?(n._visibility&=-3,gs(e)):Kr(e);break;default:Kr(e)}}function gs(e){var n=e.deletions;if((e.flags&16)!==0){if(n!==null)for(var t=0;t<n.length;t++){var i=n[t];On=i,Jp(i,e)}Kp(e)}for(e=e.child;e!==null;){switch(n=e,n.tag){case 0:case 11:case 15:Oa(8,n,n.return),gs(n);break;case 22:t=n.stateNode,t._visibility&2&&(t._visibility&=-3,gs(n));break;default:gs(n)}e=e.sibling}}function Jp(e,n){for(;On!==null;){var t=On;switch(t.tag){case 0:case 11:case 15:Oa(8,t,n);break;case 23:case 22:if(t.memoizedState!==null&&t.memoizedState.cachePool!==null){var i=t.memoizedState.cachePool.pool;i!=null&&i.refCount++}break;case 24:Cr(t.memoizedState.cache)}if(i=t.child,i!==null)i.return=t,On=i;else e:for(t=e;On!==null;){i=On;var o=i.sibling,c=i.return;if(Xp(i),i===t){On=null;break e}if(o!==null){o.return=c,On=o;break e}On=c}}}var Ub={getCacheForType:function(e){var n=Pn(An),t=n.data.get(e);return t===void 0&&(t=e(),n.data.set(e,t)),t},cacheSignal:function(){return Pn(An).controller.signal}},Pb=typeof WeakMap=="function"?WeakMap:Map,Ge=0,sn=null,Ue=null,Be=0,en=0,dt=null,Na=!1,tr=!1,Lc=!1,pa=0,En=0,Wa=0,xi=0,Oc=0,ft=0,ar=0,Fr=null,et=null,Nc=!1,ys=0,$p=0,bs=1/0,zs=null,Ua=null,Cn=0,Pa=null,ir=null,ha=0,Wc=0,Uc=null,eh=null,Jr=0,Pc=null;function pt(){return(Ge&2)!==0&&Be!==0?Be&-Be:C.T!==null?Vc():Ee()}function nh(){if(ft===0)if((Be&536870912)===0||He){var e=Sa;Sa<<=1,(Sa&3932160)===0&&(Sa=262144),ft=e}else ft=536870912;return e=ct.current,e!==null&&(e.flags|=32),ft}function nt(e,n,t){(e===sn&&(en===2||en===9)||e.cancelPendingCommit!==null)&&(rr(e,0),ja(e,Be,ft,!1)),li(e,t),((Ge&2)===0||e!==sn)&&(e===sn&&((Ge&2)===0&&(xi|=t),En===4&&ja(e,Be,ft,!1)),Vt(e))}function th(e,n,t){if((Ge&6)!==0)throw Error(s(327));var i=!t&&(n&127)===0&&(n&e.expiredLanes)===0||ii(e,n),o=i?Xb(e,n):Bc(e,n,!0),c=i;do{if(o===0){tr&&!i&&ja(e,n,0,!1);break}else{if(t=e.current.alternate,c&&!jb(t)){o=Bc(e,n,!1),c=!1;continue}if(o===2){if(c=n,e.errorRecoveryDisabledLanes&c)var m=0;else m=e.pendingLanes&-536870913,m=m!==0?m:m&536870912?536870912:0;if(m!==0){n=m;e:{var z=e;o=Fr;var D=z.current.memoizedState.isDehydrated;if(D&&(rr(z,m).flags|=256),m=Bc(z,m,!1),m!==2){if(Lc&&!D){z.errorRecoveryDisabledLanes|=c,xi|=c,o=4;break e}c=et,et=o,c!==null&&(et===null?et=c:et.push.apply(et,c))}o=m}if(c=!1,o!==2)continue}}if(o===1){rr(e,0),ja(e,n,0,!0);break}e:{switch(i=e,c=o,c){case 0:case 1:throw Error(s(345));case 4:if((n&4194048)!==n)break;case 6:ja(i,n,ft,!Na);break e;case 2:et=null;break;case 3:case 5:break;default:throw Error(s(329))}if((n&62914560)===n&&(o=ys+300-bn(),10<o)){if(ja(i,n,ft,!Na),ai(i,0,!0)!==0)break e;ha=n,i.timeoutHandle=Ch(ah.bind(null,i,t,et,zs,Nc,n,ft,xi,ar,Na,c,"Throttled",-0,0),o);break e}ah(i,t,et,zs,Nc,n,ft,xi,ar,Na,c,null,-0,0)}}break}while(!0);Vt(e)}function ah(e,n,t,i,o,c,m,z,D,_,B,Y,O,U){if(e.timeoutHandle=-1,Y=n.subtreeFlags,Y&8192||(Y&16785408)===16785408){Y={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:$t},Qp(n,c,Y);var me=(c&62914560)===c?ys-bn():(c&4194048)===c?$p-bn():0;if(me=D1(Y,me),me!==null){ha=c,e.cancelPendingCommit=me(dh.bind(null,e,n,c,t,i,o,m,z,D,B,Y,null,O,U)),ja(e,c,m,!_);return}}dh(e,n,c,t,i,o,m,z,D)}function jb(e){for(var n=e;;){var t=n.tag;if((t===0||t===11||t===15)&&n.flags&16384&&(t=n.updateQueue,t!==null&&(t=t.stores,t!==null)))for(var i=0;i<t.length;i++){var o=t[i],c=o.getSnapshot;o=o.value;try{if(!st(c(),o))return!1}catch{return!1}}if(t=n.child,n.subtreeFlags&16384&&t!==null)t.return=n,n=t;else{if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return!0;n=n.return}n.sibling.return=n.return,n=n.sibling}}return!0}function ja(e,n,t,i){n&=~Oc,n&=~xi,e.suspendedLanes|=n,e.pingedLanes&=~n,i&&(e.warmLanes|=n),i=e.expirationTimes;for(var o=n;0<o;){var c=31-Fe(o),m=1<<c;i[c]=-1,o&=~m}t!==0&&A(e,t,n)}function vs(){return(Ge&6)===0?($r(0),!1):!0}function jc(){if(Ue!==null){if(en===0)var e=Ue.return;else e=Ue,aa=hi=null,tc(e),Qi=null,Or=0,e=Ue;for(;e!==null;)Lp(e.alternate,e),e=e.return;Ue=null}}function rr(e,n){var t=e.timeoutHandle;t!==-1&&(e.timeoutHandle=-1,l1(t)),t=e.cancelPendingCommit,t!==null&&(e.cancelPendingCommit=null,t()),ha=0,jc(),sn=e,Ue=t=na(e.current,null),Be=n,en=0,dt=null,Na=!1,tr=ii(e,n),Lc=!1,ar=ft=Oc=xi=Wa=En=0,et=Fr=null,Nc=!1,(n&8)!==0&&(n|=n&32);var i=e.entangledLanes;if(i!==0)for(e=e.entanglements,i&=n;0<i;){var o=31-Fe(i),c=1<<o;n|=e[o],i&=~c}return pa=n,Bl(),t}function ih(e,n){Ce=null,C.H=Hr,n===Gi||n===Ql?(n=vf(),en=3):n===Zo?(n=vf(),en=4):en=n===bc?8:n!==null&&typeof n=="object"&&typeof n.then=="function"?6:1,dt=n,Ue===null&&(En=1,cs(e,xt(n,e.current)))}function rh(){var e=ct.current;return e===null?!0:(Be&4194048)===Be?wt===null:(Be&62914560)===Be||(Be&536870912)!==0?e===wt:!1}function lh(){var e=C.H;return C.H=Hr,e===null?Hr:e}function sh(){var e=C.A;return C.A=Ub,e}function Ss(){En=4,Na||(Be&4194048)!==Be&&ct.current!==null||(tr=!0),(Wa&134217727)===0&&(xi&134217727)===0||sn===null||ja(sn,Be,ft,!1)}function Bc(e,n,t){var i=Ge;Ge|=2;var o=lh(),c=sh();(sn!==e||Be!==n)&&(zs=null,rr(e,n)),n=!1;var m=En;e:do try{if(en!==0&&Ue!==null){var z=Ue,D=dt;switch(en){case 8:jc(),m=6;break e;case 3:case 2:case 9:case 6:ct.current===null&&(n=!0);var _=en;if(en=0,dt=null,lr(e,z,D,_),t&&tr){m=0;break e}break;default:_=en,en=0,dt=null,lr(e,z,D,_)}}Bb(),m=En;break}catch(B){ih(e,B)}while(!0);return n&&e.shellSuspendCounter++,aa=hi=null,Ge=i,C.H=o,C.A=c,Ue===null&&(sn=null,Be=0,Bl()),m}function Bb(){for(;Ue!==null;)oh(Ue)}function Xb(e,n){var t=Ge;Ge|=2;var i=lh(),o=sh();sn!==e||Be!==n?(zs=null,bs=bn()+500,rr(e,n)):tr=ii(e,n);e:do try{if(en!==0&&Ue!==null){n=Ue;var c=dt;n:switch(en){case 1:en=0,dt=null,lr(e,n,c,1);break;case 2:case 9:if(bf(c)){en=0,dt=null,ch(n);break}n=function(){en!==2&&en!==9||sn!==e||(en=7),Vt(e)},c.then(n,n);break e;case 3:en=7;break e;case 4:en=5;break e;case 7:bf(c)?(en=0,dt=null,ch(n)):(en=0,dt=null,lr(e,n,c,7));break;case 5:var m=null;switch(Ue.tag){case 26:m=Ue.memoizedState;case 5:case 27:var z=Ue;if(m?Gh(m):z.stateNode.complete){en=0,dt=null;var D=z.sibling;if(D!==null)Ue=D;else{var _=z.return;_!==null?(Ue=_,Es(_)):Ue=null}break n}}en=0,dt=null,lr(e,n,c,5);break;case 6:en=0,dt=null,lr(e,n,c,6);break;case 8:jc(),En=6;break e;default:throw Error(s(462))}}Hb();break}catch(B){ih(e,B)}while(!0);return aa=hi=null,C.H=i,C.A=o,Ge=t,Ue!==null?0:(sn=null,Be=0,Bl(),En)}function Hb(){for(;Ue!==null&&!vr();)oh(Ue)}function oh(e){var n=_p(e.alternate,e,pa);e.memoizedProps=e.pendingProps,n===null?Es(e):Ue=n}function ch(e){var n=e,t=n.alternate;switch(n.tag){case 15:case 0:n=Ap(t,n,n.pendingProps,n.type,void 0,Be);break;case 11:n=Ap(t,n,n.pendingProps,n.type.render,n.ref,Be);break;case 5:tc(n);default:Lp(t,n),n=Ue=sf(n,pa),n=_p(t,n,pa)}e.memoizedProps=e.pendingProps,n===null?Es(e):Ue=n}function lr(e,n,t,i){aa=hi=null,tc(n),Qi=null,Or=0;var o=n.return;try{if(Mb(e,o,n,t,Be)){En=1,cs(e,xt(t,e.current)),Ue=null;return}}catch(c){if(o!==null)throw Ue=o,c;En=1,cs(e,xt(t,e.current)),Ue=null;return}n.flags&32768?(He||i===1?e=!0:tr||(Be&536870912)!==0?e=!1:(Na=e=!0,(i===2||i===9||i===3||i===6)&&(i=ct.current,i!==null&&i.tag===13&&(i.flags|=16384))),uh(n,e)):Es(n)}function Es(e){var n=e;do{if((n.flags&32768)!==0){uh(n,Na);return}e=n.return;var t=Lb(n.alternate,n,pa);if(t!==null){Ue=t;return}if(n=n.sibling,n!==null){Ue=n;return}Ue=n=e}while(n!==null);En===0&&(En=5)}function uh(e,n){do{var t=Ob(e.alternate,e);if(t!==null){t.flags&=32767,Ue=t;return}if(t=e.return,t!==null&&(t.flags|=32768,t.subtreeFlags=0,t.deletions=null),!n&&(e=e.sibling,e!==null)){Ue=e;return}Ue=e=t}while(e!==null);En=6,Ue=null}function dh(e,n,t,i,o,c,m,z,D){e.cancelPendingCommit=null;do xs();while(Cn!==0);if((Ge&6)!==0)throw Error(s(327));if(n!==null){if(n===e.current)throw Error(s(177));if(c=n.lanes|n.childLanes,c|=ko,lo(e,t,c,m,z,D),e===sn&&(Ue=sn=null,Be=0),ir=n,Pa=e,ha=t,Wc=c,Uc=o,eh=i,(n.subtreeFlags&10256)!==0||(n.flags&10256)!==0?(e.callbackNode=null,e.callbackPriority=0,Yb(Se,function(){return gh(),null})):(e.callbackNode=null,e.callbackPriority=0),i=(n.flags&13878)!==0,(n.subtreeFlags&13878)!==0||i){i=C.T,C.T=null,o=F.p,F.p=2,m=Ge,Ge|=4;try{Nb(e,n,t)}finally{Ge=m,F.p=o,C.T=i}}Cn=1,fh(),ph(),hh()}}function fh(){if(Cn===1){Cn=0;var e=Pa,n=ir,t=(n.flags&13878)!==0;if((n.subtreeFlags&13878)!==0||t){t=C.T,C.T=null;var i=F.p;F.p=2;var o=Ge;Ge|=4;try{qp(n,e);var c=$c,m=Fd(e.containerInfo),z=c.focusedElem,D=c.selectionRange;if(m!==z&&z&&z.ownerDocument&&Kd(z.ownerDocument.documentElement,z)){if(D!==null&&Do(z)){var _=D.start,B=D.end;if(B===void 0&&(B=_),"selectionStart"in z)z.selectionStart=_,z.selectionEnd=Math.min(B,z.value.length);else{var Y=z.ownerDocument||document,O=Y&&Y.defaultView||window;if(O.getSelection){var U=O.getSelection(),me=z.textContent.length,De=Math.min(D.start,me),ln=D.end===void 0?De:Math.min(D.end,me);!U.extend&&De>ln&&(m=ln,ln=De,De=m);var k=Qd(z,De),w=Qd(z,ln);if(k&&w&&(U.rangeCount!==1||U.anchorNode!==k.node||U.anchorOffset!==k.offset||U.focusNode!==w.node||U.focusOffset!==w.offset)){var M=Y.createRange();M.setStart(k.node,k.offset),U.removeAllRanges(),De>ln?(U.addRange(M),U.extend(w.node,w.offset)):(M.setEnd(w.node,w.offset),U.addRange(M))}}}}for(Y=[],U=z;U=U.parentNode;)U.nodeType===1&&Y.push({element:U,left:U.scrollLeft,top:U.scrollTop});for(typeof z.focus=="function"&&z.focus(),z=0;z<Y.length;z++){var V=Y[z];V.element.scrollLeft=V.left,V.element.scrollTop=V.top}}Os=!!Jc,$c=Jc=null}finally{Ge=o,F.p=i,C.T=t}}e.current=n,Cn=2}}function ph(){if(Cn===2){Cn=0;var e=Pa,n=ir,t=(n.flags&8772)!==0;if((n.subtreeFlags&8772)!==0||t){t=C.T,C.T=null;var i=F.p;F.p=2;var o=Ge;Ge|=4;try{Bp(e,n.alternate,n)}finally{Ge=o,F.p=i,C.T=t}}Cn=3}}function hh(){if(Cn===4||Cn===3){Cn=0,Sr();var e=Pa,n=ir,t=ha,i=eh;(n.subtreeFlags&10256)!==0||(n.flags&10256)!==0?Cn=5:(Cn=0,ir=Pa=null,mh(e,e.pendingLanes));var o=e.pendingLanes;if(o===0&&(Ua=null),se(t),n=n.stateNode,zn&&typeof zn.onCommitFiberRoot=="function")try{zn.onCommitFiberRoot(mn,n,void 0,(n.current.flags&128)===128)}catch{}if(i!==null){n=C.T,o=F.p,F.p=2,C.T=null;try{for(var c=e.onRecoverableError,m=0;m<i.length;m++){var z=i[m];c(z.value,{componentStack:z.stack})}}finally{C.T=n,F.p=o}}(ha&3)!==0&&xs(),Vt(e),o=e.pendingLanes,(t&261930)!==0&&(o&42)!==0?e===Pc?Jr++:(Jr=0,Pc=e):Jr=0,$r(0)}}function mh(e,n){(e.pooledCacheLanes&=n)===0&&(n=e.pooledCache,n!=null&&(e.pooledCache=null,Cr(n)))}function xs(){return fh(),ph(),hh(),gh()}function gh(){if(Cn!==5)return!1;var e=Pa,n=Wc;Wc=0;var t=se(ha),i=C.T,o=F.p;try{F.p=32>t?32:t,C.T=null,t=Uc,Uc=null;var c=Pa,m=ha;if(Cn=0,ir=Pa=null,ha=0,(Ge&6)!==0)throw Error(s(331));var z=Ge;if(Ge|=4,Fp(c.current),Gp(c,c.current,m,t),Ge=z,$r(0,!1),zn&&typeof zn.onPostCommitFiberRoot=="function")try{zn.onPostCommitFiberRoot(mn,c)}catch{}return!0}finally{F.p=o,C.T=i,mh(e,n)}}function yh(e,n,t){n=xt(t,n),n=yc(e.stateNode,n,2),e=_a(e,n,2),e!==null&&(li(e,2),Vt(e))}function nn(e,n,t){if(e.tag===3)yh(e,e,t);else for(;n!==null;){if(n.tag===3){yh(n,e,t);break}else if(n.tag===1){var i=n.stateNode;if(typeof n.type.getDerivedStateFromError=="function"||typeof i.componentDidCatch=="function"&&(Ua===null||!Ua.has(i))){e=xt(t,e),t=bp(2),i=_a(n,t,2),i!==null&&(zp(t,i,n,e),li(i,2),Vt(i));break}}n=n.return}}function Xc(e,n,t){var i=e.pingCache;if(i===null){i=e.pingCache=new Pb;var o=new Set;i.set(n,o)}else o=i.get(n),o===void 0&&(o=new Set,i.set(n,o));o.has(t)||(Lc=!0,o.add(t),e=Zb.bind(null,e,n,t),n.then(e,e))}function Zb(e,n,t){var i=e.pingCache;i!==null&&i.delete(n),e.pingedLanes|=e.suspendedLanes&t,e.warmLanes&=~t,sn===e&&(Be&t)===t&&(En===4||En===3&&(Be&62914560)===Be&&300>bn()-ys?(Ge&2)===0&&rr(e,0):Oc|=t,ar===Be&&(ar=0)),Vt(e)}function bh(e,n){n===0&&(n=ri()),e=di(e,n),e!==null&&(li(e,n),Vt(e))}function Vb(e){var n=e.memoizedState,t=0;n!==null&&(t=n.retryLane),bh(e,t)}function qb(e,n){var t=0;switch(e.tag){case 31:case 13:var i=e.stateNode,o=e.memoizedState;o!==null&&(t=o.retryLane);break;case 19:i=e.stateNode;break;case 22:i=e.stateNode._retryCache;break;default:throw Error(s(314))}i!==null&&i.delete(n),bh(e,t)}function Yb(e,n){return va(e,n)}var Ds=null,sr=null,Hc=!1,Ts=!1,Zc=!1,Ba=0;function Vt(e){e!==sr&&e.next===null&&(sr===null?Ds=sr=e:sr=sr.next=e),Ts=!0,Hc||(Hc=!0,Qb())}function $r(e,n){if(!Zc&&Ts){Zc=!0;do for(var t=!1,i=Ds;i!==null;){if(e!==0){var o=i.pendingLanes;if(o===0)var c=0;else{var m=i.suspendedLanes,z=i.pingedLanes;c=(1<<31-Fe(42|e)+1)-1,c&=o&~(m&~z),c=c&201326741?c&201326741|1:c?c|2:0}c!==0&&(t=!0,Eh(i,c))}else c=Be,c=ai(i,i===sn?c:0,i.cancelPendingCommit!==null||i.timeoutHandle!==-1),(c&3)===0||ii(i,c)||(t=!0,Eh(i,c));i=i.next}while(t);Zc=!1}}function Gb(){zh()}function zh(){Ts=Hc=!1;var e=0;Ba!==0&&r1()&&(e=Ba);for(var n=bn(),t=null,i=Ds;i!==null;){var o=i.next,c=vh(i,n);c===0?(i.next=null,t===null?Ds=o:t.next=o,o===null&&(sr=t)):(t=i,(e!==0||(c&3)!==0)&&(Ts=!0)),i=o}Cn!==0&&Cn!==5||$r(e),Ba!==0&&(Ba=0)}function vh(e,n){for(var t=e.suspendedLanes,i=e.pingedLanes,o=e.expirationTimes,c=e.pendingLanes&-62914561;0<c;){var m=31-Fe(c),z=1<<m,D=o[m];D===-1?((z&t)===0||(z&i)!==0)&&(o[m]=Ml(z,n)):D<=n&&(e.expiredLanes|=z),c&=~z}if(n=sn,t=Be,t=ai(e,e===n?t:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),i=e.callbackNode,t===0||e===n&&(en===2||en===9)||e.cancelPendingCommit!==null)return i!==null&&i!==null&&ni(i),e.callbackNode=null,e.callbackPriority=0;if((t&3)===0||ii(e,t)){if(n=t&-t,n===e.callbackPriority)return n;switch(i!==null&&ni(i),se(t)){case 2:case 8:t=ae;break;case 32:t=Se;break;case 268435456:t=Ve;break;default:t=Se}return i=Sh.bind(null,e),t=va(t,i),e.callbackPriority=n,e.callbackNode=t,n}return i!==null&&i!==null&&ni(i),e.callbackPriority=2,e.callbackNode=null,2}function Sh(e,n){if(Cn!==0&&Cn!==5)return e.callbackNode=null,e.callbackPriority=0,null;var t=e.callbackNode;if(xs()&&e.callbackNode!==t)return null;var i=Be;return i=ai(e,e===sn?i:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),i===0?null:(th(e,i,n),vh(e,bn()),e.callbackNode!=null&&e.callbackNode===t?Sh.bind(null,e):null)}function Eh(e,n){if(xs())return null;th(e,n,!0)}function Qb(){s1(function(){(Ge&6)!==0?va(Z,Gb):zh()})}function Vc(){if(Ba===0){var e=qi;e===0&&(e=ti,ti<<=1,(ti&261888)===0&&(ti=256)),Ba=e}return Ba}function xh(e){return e==null||typeof e=="symbol"||typeof e=="boolean"?null:typeof e=="function"?e:Cl(""+e)}function Dh(e,n){var t=n.ownerDocument.createElement("input");return t.name=n.name,t.value=n.value,e.id&&t.setAttribute("form",e.id),n.parentNode.insertBefore(t,n),e=new FormData(e),t.parentNode.removeChild(t),e}function Kb(e,n,t,i,o){if(n==="submit"&&t&&t.stateNode===o){var c=xh((o[oe]||null).action),m=i.submitter;m&&(n=(n=m[oe]||null)?xh(n.formAction):m.getAttribute("formAction"),n!==null&&(c=n,m=null));var z=new Wl("action","action",null,i,o);e.push({event:z,listeners:[{instance:null,listener:function(){if(i.defaultPrevented){if(Ba!==0){var D=m?Dh(o,m):new FormData(o);dc(t,{pending:!0,data:D,method:o.method,action:c},null,D)}}else typeof c=="function"&&(z.preventDefault(),D=m?Dh(o,m):new FormData(o),dc(t,{pending:!0,data:D,method:o.method,action:c},c,D))},currentTarget:o}]})}}for(var qc=0;qc<Ro.length;qc++){var Yc=Ro[qc],Fb=Yc.toLowerCase(),Jb=Yc[0].toUpperCase()+Yc.slice(1);Nt(Fb,"on"+Jb)}Nt(ef,"onAnimationEnd"),Nt(nf,"onAnimationIteration"),Nt(tf,"onAnimationStart"),Nt("dblclick","onDoubleClick"),Nt("focusin","onFocus"),Nt("focusout","onBlur"),Nt(hb,"onTransitionRun"),Nt(mb,"onTransitionStart"),Nt(gb,"onTransitionCancel"),Nt(af,"onTransitionEnd"),Lt("onMouseEnter",["mouseout","mouseover"]),Lt("onMouseLeave",["mouseout","mouseover"]),Lt("onPointerEnter",["pointerout","pointerover"]),Lt("onPointerLeave",["pointerout","pointerover"]),zt("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),zt("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),zt("onBeforeInput",["compositionend","keypress","textInput","paste"]),zt("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),zt("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),zt("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var el="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),$b=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(el));function Th(e,n){n=(n&4)!==0;for(var t=0;t<e.length;t++){var i=e[t],o=i.event;i=i.listeners;e:{var c=void 0;if(n)for(var m=i.length-1;0<=m;m--){var z=i[m],D=z.instance,_=z.currentTarget;if(z=z.listener,D!==c&&o.isPropagationStopped())break e;c=z,o.currentTarget=_;try{c(o)}catch(B){jl(B)}o.currentTarget=null,c=D}else for(m=0;m<i.length;m++){if(z=i[m],D=z.instance,_=z.currentTarget,z=z.listener,D!==c&&o.isPropagationStopped())break e;c=z,o.currentTarget=_;try{c(o)}catch(B){jl(B)}o.currentTarget=null,c=D}}}}function Pe(e,n){var t=n[ke];t===void 0&&(t=n[ke]=new Set);var i=e+"__bubble";t.has(i)||(Ah(n,e,2,!1),t.add(i))}function Gc(e,n,t){var i=0;n&&(i|=4),Ah(t,e,i,n)}var As="_reactListening"+Math.random().toString(36).slice(2);function Qc(e){if(!e[As]){e[As]=!0,Da.forEach(function(t){t!=="selectionchange"&&($b.has(t)||Gc(t,!1,e),Gc(t,!0,e))});var n=e.nodeType===9?e:e.ownerDocument;n===null||n[As]||(n[As]=!0,Gc("selectionchange",!1,n))}}function Ah(e,n,t,i){switch(nm(n)){case 2:var o=w1;break;case 8:o=R1;break;default:o=uu}t=o.bind(null,n,t,e),o=void 0,!mo||n!=="touchstart"&&n!=="touchmove"&&n!=="wheel"||(o=!0),i?o!==void 0?e.addEventListener(n,t,{capture:!0,passive:o}):e.addEventListener(n,t,!0):o!==void 0?e.addEventListener(n,t,{passive:o}):e.addEventListener(n,t,!1)}function Kc(e,n,t,i,o){var c=i;if((n&1)===0&&(n&2)===0&&i!==null)e:for(;;){if(i===null)return;var m=i.tag;if(m===3||m===4){var z=i.stateNode.containerInfo;if(z===o)break;if(m===4)for(m=i.return;m!==null;){var D=m.tag;if((D===3||D===4)&&m.stateNode.containerInfo===o)return;m=m.return}for(;z!==null;){if(m=lt(z),m===null)return;if(D=m.tag,D===5||D===6||D===26||D===27){i=c=m;continue e}z=z.parentNode}}i=i.return}Id(function(){var _=c,B=po(t),Y=[];e:{var O=rf.get(e);if(O!==void 0){var U=Wl,me=e;switch(e){case"keypress":if(Ol(t)===0)break e;case"keydown":case"keyup":U=qy;break;case"focusin":me="focus",U=zo;break;case"focusout":me="blur",U=zo;break;case"beforeblur":case"afterblur":U=zo;break;case"click":if(t.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":U=Cd;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":U=Ly;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":U=Qy;break;case ef:case nf:case tf:U=Wy;break;case af:U=Fy;break;case"scroll":case"scrollend":U=_y;break;case"wheel":U=$y;break;case"copy":case"cut":case"paste":U=Py;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":U=Od;break;case"toggle":case"beforetoggle":U=nb}var De=(n&4)!==0,ln=!De&&(e==="scroll"||e==="scrollend"),k=De?O!==null?O+"Capture":null:O;De=[];for(var w=_,M;w!==null;){var V=w;if(M=V.stateNode,V=V.tag,V!==5&&V!==26&&V!==27||M===null||k===null||(V=Er(w,k),V!=null&&De.push(nl(w,V,M))),ln)break;w=w.return}0<De.length&&(O=new U(O,me,null,t,B),Y.push({event:O,listeners:De}))}}if((n&7)===0){e:{if(O=e==="mouseover"||e==="pointerover",U=e==="mouseout"||e==="pointerout",O&&t!==fo&&(me=t.relatedTarget||t.fromElement)&&(lt(me)||me[ge]))break e;if((U||O)&&(O=B.window===B?B:(O=B.ownerDocument)?O.defaultView||O.parentWindow:window,U?(me=t.relatedTarget||t.toElement,U=_,me=me?lt(me):null,me!==null&&(ln=d(me),De=me.tag,me!==ln||De!==5&&De!==27&&De!==6)&&(me=null)):(U=null,me=_),U!==me)){if(De=Cd,V="onMouseLeave",k="onMouseEnter",w="mouse",(e==="pointerout"||e==="pointerover")&&(De=Od,V="onPointerLeave",k="onPointerEnter",w="pointer"),ln=U==null?O:Zn(U),M=me==null?O:Zn(me),O=new De(V,w+"leave",U,t,B),O.target=ln,O.relatedTarget=M,V=null,lt(B)===_&&(De=new De(k,w+"enter",me,t,B),De.target=M,De.relatedTarget=ln,V=De),ln=V,U&&me)n:{for(De=e1,k=U,w=me,M=0,V=k;V;V=De(V))M++;V=0;for(var xe=w;xe;xe=De(xe))V++;for(;0<M-V;)k=De(k),M--;for(;0<V-M;)w=De(w),V--;for(;M--;){if(k===w||w!==null&&k===w.alternate){De=k;break n}k=De(k),w=De(w)}De=null}else De=null;U!==null&&wh(Y,O,U,De,!1),me!==null&&ln!==null&&wh(Y,ln,me,De,!0)}}e:{if(O=_?Zn(_):window,U=O.nodeName&&O.nodeName.toLowerCase(),U==="select"||U==="input"&&O.type==="file")var qe=Hd;else if(Bd(O))if(Zd)qe=db;else{qe=cb;var ve=ob}else U=O.nodeName,!U||U.toLowerCase()!=="input"||O.type!=="checkbox"&&O.type!=="radio"?_&&uo(_.elementType)&&(qe=Hd):qe=ub;if(qe&&(qe=qe(e,_))){Xd(Y,qe,t,B);break e}ve&&ve(e,O,_),e==="focusout"&&_&&O.type==="number"&&_.memoizedProps.value!=null&&co(O,"number",O.value)}switch(ve=_?Zn(_):window,e){case"focusin":(Bd(ve)||ve.contentEditable==="true")&&(Ui=ve,To=_,Ir=null);break;case"focusout":Ir=To=Ui=null;break;case"mousedown":Ao=!0;break;case"contextmenu":case"mouseup":case"dragend":Ao=!1,Jd(Y,t,B);break;case"selectionchange":if(pb)break;case"keydown":case"keyup":Jd(Y,t,B)}var Le;if(So)e:{switch(e){case"compositionstart":var Xe="onCompositionStart";break e;case"compositionend":Xe="onCompositionEnd";break e;case"compositionupdate":Xe="onCompositionUpdate";break e}Xe=void 0}else Wi?Pd(e,t)&&(Xe="onCompositionEnd"):e==="keydown"&&t.keyCode===229&&(Xe="onCompositionStart");Xe&&(Nd&&t.locale!=="ko"&&(Wi||Xe!=="onCompositionStart"?Xe==="onCompositionEnd"&&Wi&&(Le=Md()):(Ta=B,go="value"in Ta?Ta.value:Ta.textContent,Wi=!0)),ve=ws(_,Xe),0<ve.length&&(Xe=new Ld(Xe,e,null,t,B),Y.push({event:Xe,listeners:ve}),Le?Xe.data=Le:(Le=jd(t),Le!==null&&(Xe.data=Le)))),(Le=ab?ib(e,t):rb(e,t))&&(Xe=ws(_,"onBeforeInput"),0<Xe.length&&(ve=new Ld("onBeforeInput","beforeinput",null,t,B),Y.push({event:ve,listeners:Xe}),ve.data=Le)),Kb(Y,e,_,t,B)}Th(Y,n)})}function nl(e,n,t){return{instance:e,listener:n,currentTarget:t}}function ws(e,n){for(var t=n+"Capture",i=[];e!==null;){var o=e,c=o.stateNode;if(o=o.tag,o!==5&&o!==26&&o!==27||c===null||(o=Er(e,t),o!=null&&i.unshift(nl(e,o,c)),o=Er(e,n),o!=null&&i.push(nl(e,o,c))),e.tag===3)return i;e=e.return}return[]}function e1(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function wh(e,n,t,i,o){for(var c=n._reactName,m=[];t!==null&&t!==i;){var z=t,D=z.alternate,_=z.stateNode;if(z=z.tag,D!==null&&D===i)break;z!==5&&z!==26&&z!==27||_===null||(D=_,o?(_=Er(t,c),_!=null&&m.unshift(nl(t,_,D))):o||(_=Er(t,c),_!=null&&m.push(nl(t,_,D)))),t=t.return}m.length!==0&&e.push({event:n,listeners:m})}var n1=/\r\n?/g,t1=/\u0000|\uFFFD/g;function Rh(e){return(typeof e=="string"?e:""+e).replace(n1,`
`).replace(t1,"")}function kh(e,n){return n=Rh(n),Rh(e)===n}function rn(e,n,t,i,o,c){switch(t){case"children":typeof i=="string"?n==="body"||n==="textarea"&&i===""||Li(e,i):(typeof i=="number"||typeof i=="bigint")&&n!=="body"&&Li(e,""+i);break;case"className":Ot(e,"class",i);break;case"tabIndex":Ot(e,"tabindex",i);break;case"dir":case"role":case"viewBox":case"width":case"height":Ot(e,t,i);break;case"style":Rd(e,i,c);break;case"data":if(n!=="object"){Ot(e,"data",i);break}case"src":case"href":if(i===""&&(n!=="a"||t!=="href")){e.removeAttribute(t);break}if(i==null||typeof i=="function"||typeof i=="symbol"||typeof i=="boolean"){e.removeAttribute(t);break}i=Cl(""+i),e.setAttribute(t,i);break;case"action":case"formAction":if(typeof i=="function"){e.setAttribute(t,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof c=="function"&&(t==="formAction"?(n!=="input"&&rn(e,n,"name",o.name,o,null),rn(e,n,"formEncType",o.formEncType,o,null),rn(e,n,"formMethod",o.formMethod,o,null),rn(e,n,"formTarget",o.formTarget,o,null)):(rn(e,n,"encType",o.encType,o,null),rn(e,n,"method",o.method,o,null),rn(e,n,"target",o.target,o,null)));if(i==null||typeof i=="symbol"||typeof i=="boolean"){e.removeAttribute(t);break}i=Cl(""+i),e.setAttribute(t,i);break;case"onClick":i!=null&&(e.onclick=$t);break;case"onScroll":i!=null&&Pe("scroll",e);break;case"onScrollEnd":i!=null&&Pe("scrollend",e);break;case"dangerouslySetInnerHTML":if(i!=null){if(typeof i!="object"||!("__html"in i))throw Error(s(61));if(t=i.__html,t!=null){if(o.children!=null)throw Error(s(60));e.innerHTML=t}}break;case"multiple":e.multiple=i&&typeof i!="function"&&typeof i!="symbol";break;case"muted":e.muted=i&&typeof i!="function"&&typeof i!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(i==null||typeof i=="function"||typeof i=="boolean"||typeof i=="symbol"){e.removeAttribute("xlink:href");break}t=Cl(""+i),e.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",t);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":i!=null&&typeof i!="function"&&typeof i!="symbol"?e.setAttribute(t,""+i):e.removeAttribute(t);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":i&&typeof i!="function"&&typeof i!="symbol"?e.setAttribute(t,""):e.removeAttribute(t);break;case"capture":case"download":i===!0?e.setAttribute(t,""):i!==!1&&i!=null&&typeof i!="function"&&typeof i!="symbol"?e.setAttribute(t,i):e.removeAttribute(t);break;case"cols":case"rows":case"size":case"span":i!=null&&typeof i!="function"&&typeof i!="symbol"&&!isNaN(i)&&1<=i?e.setAttribute(t,i):e.removeAttribute(t);break;case"rowSpan":case"start":i==null||typeof i=="function"||typeof i=="symbol"||isNaN(i)?e.removeAttribute(t):e.setAttribute(t,i);break;case"popover":Pe("beforetoggle",e),Pe("toggle",e),fn(e,"popover",i);break;case"xlinkActuate":vt(e,"http://www.w3.org/1999/xlink","xlink:actuate",i);break;case"xlinkArcrole":vt(e,"http://www.w3.org/1999/xlink","xlink:arcrole",i);break;case"xlinkRole":vt(e,"http://www.w3.org/1999/xlink","xlink:role",i);break;case"xlinkShow":vt(e,"http://www.w3.org/1999/xlink","xlink:show",i);break;case"xlinkTitle":vt(e,"http://www.w3.org/1999/xlink","xlink:title",i);break;case"xlinkType":vt(e,"http://www.w3.org/1999/xlink","xlink:type",i);break;case"xmlBase":vt(e,"http://www.w3.org/XML/1998/namespace","xml:base",i);break;case"xmlLang":vt(e,"http://www.w3.org/XML/1998/namespace","xml:lang",i);break;case"xmlSpace":vt(e,"http://www.w3.org/XML/1998/namespace","xml:space",i);break;case"is":fn(e,"is",i);break;case"innerText":case"textContent":break;default:(!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(t=Iy.get(t)||t,fn(e,t,i))}}function Fc(e,n,t,i,o,c){switch(t){case"style":Rd(e,i,c);break;case"dangerouslySetInnerHTML":if(i!=null){if(typeof i!="object"||!("__html"in i))throw Error(s(61));if(t=i.__html,t!=null){if(o.children!=null)throw Error(s(60));e.innerHTML=t}}break;case"children":typeof i=="string"?Li(e,i):(typeof i=="number"||typeof i=="bigint")&&Li(e,""+i);break;case"onScroll":i!=null&&Pe("scroll",e);break;case"onScrollEnd":i!=null&&Pe("scrollend",e);break;case"onClick":i!=null&&(e.onclick=$t);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!Bt.hasOwnProperty(t))e:{if(t[0]==="o"&&t[1]==="n"&&(o=t.endsWith("Capture"),n=t.slice(2,o?t.length-7:void 0),c=e[oe]||null,c=c!=null?c[t]:null,typeof c=="function"&&e.removeEventListener(n,c,o),typeof i=="function")){typeof c!="function"&&c!==null&&(t in e?e[t]=null:e.hasAttribute(t)&&e.removeAttribute(t)),e.addEventListener(n,i,o);break e}t in e?e[t]=i:i===!0?e.setAttribute(t,""):fn(e,t,i)}}}function Bn(e,n,t){switch(n){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":Pe("error",e),Pe("load",e);var i=!1,o=!1,c;for(c in t)if(t.hasOwnProperty(c)){var m=t[c];if(m!=null)switch(c){case"src":i=!0;break;case"srcSet":o=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(s(137,n));default:rn(e,n,c,m,t,null)}}o&&rn(e,n,"srcSet",t.srcSet,t,null),i&&rn(e,n,"src",t.src,t,null);return;case"input":Pe("invalid",e);var z=c=m=o=null,D=null,_=null;for(i in t)if(t.hasOwnProperty(i)){var B=t[i];if(B!=null)switch(i){case"name":o=B;break;case"type":m=B;break;case"checked":D=B;break;case"defaultChecked":_=B;break;case"value":c=B;break;case"defaultValue":z=B;break;case"children":case"dangerouslySetInnerHTML":if(B!=null)throw Error(s(137,n));break;default:rn(e,n,i,B,t,null)}}Dd(e,c,z,D,_,m,o,!1);return;case"select":Pe("invalid",e),i=m=c=null;for(o in t)if(t.hasOwnProperty(o)&&(z=t[o],z!=null))switch(o){case"value":c=z;break;case"defaultValue":m=z;break;case"multiple":i=z;default:rn(e,n,o,z,t,null)}n=c,t=m,e.multiple=!!i,n!=null?Ci(e,!!i,n,!1):t!=null&&Ci(e,!!i,t,!0);return;case"textarea":Pe("invalid",e),c=o=i=null;for(m in t)if(t.hasOwnProperty(m)&&(z=t[m],z!=null))switch(m){case"value":i=z;break;case"defaultValue":o=z;break;case"children":c=z;break;case"dangerouslySetInnerHTML":if(z!=null)throw Error(s(91));break;default:rn(e,n,m,z,t,null)}Ad(e,i,o,c);return;case"option":for(D in t)t.hasOwnProperty(D)&&(i=t[D],i!=null)&&(D==="selected"?e.selected=i&&typeof i!="function"&&typeof i!="symbol":rn(e,n,D,i,t,null));return;case"dialog":Pe("beforetoggle",e),Pe("toggle",e),Pe("cancel",e),Pe("close",e);break;case"iframe":case"object":Pe("load",e);break;case"video":case"audio":for(i=0;i<el.length;i++)Pe(el[i],e);break;case"image":Pe("error",e),Pe("load",e);break;case"details":Pe("toggle",e);break;case"embed":case"source":case"link":Pe("error",e),Pe("load",e);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(_ in t)if(t.hasOwnProperty(_)&&(i=t[_],i!=null))switch(_){case"children":case"dangerouslySetInnerHTML":throw Error(s(137,n));default:rn(e,n,_,i,t,null)}return;default:if(uo(n)){for(B in t)t.hasOwnProperty(B)&&(i=t[B],i!==void 0&&Fc(e,n,B,i,t,void 0));return}}for(z in t)t.hasOwnProperty(z)&&(i=t[z],i!=null&&rn(e,n,z,i,t,null))}function a1(e,n,t,i){switch(n){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var o=null,c=null,m=null,z=null,D=null,_=null,B=null;for(U in t){var Y=t[U];if(t.hasOwnProperty(U)&&Y!=null)switch(U){case"checked":break;case"value":break;case"defaultValue":D=Y;default:i.hasOwnProperty(U)||rn(e,n,U,null,i,Y)}}for(var O in i){var U=i[O];if(Y=t[O],i.hasOwnProperty(O)&&(U!=null||Y!=null))switch(O){case"type":c=U;break;case"name":o=U;break;case"checked":_=U;break;case"defaultChecked":B=U;break;case"value":m=U;break;case"defaultValue":z=U;break;case"children":case"dangerouslySetInnerHTML":if(U!=null)throw Error(s(137,n));break;default:U!==Y&&rn(e,n,O,U,i,Y)}}oo(e,m,z,D,_,B,c,o);return;case"select":U=m=z=O=null;for(c in t)if(D=t[c],t.hasOwnProperty(c)&&D!=null)switch(c){case"value":break;case"multiple":U=D;default:i.hasOwnProperty(c)||rn(e,n,c,null,i,D)}for(o in i)if(c=i[o],D=t[o],i.hasOwnProperty(o)&&(c!=null||D!=null))switch(o){case"value":O=c;break;case"defaultValue":z=c;break;case"multiple":m=c;default:c!==D&&rn(e,n,o,c,i,D)}n=z,t=m,i=U,O!=null?Ci(e,!!t,O,!1):!!i!=!!t&&(n!=null?Ci(e,!!t,n,!0):Ci(e,!!t,t?[]:"",!1));return;case"textarea":U=O=null;for(z in t)if(o=t[z],t.hasOwnProperty(z)&&o!=null&&!i.hasOwnProperty(z))switch(z){case"value":break;case"children":break;default:rn(e,n,z,null,i,o)}for(m in i)if(o=i[m],c=t[m],i.hasOwnProperty(m)&&(o!=null||c!=null))switch(m){case"value":O=o;break;case"defaultValue":U=o;break;case"children":break;case"dangerouslySetInnerHTML":if(o!=null)throw Error(s(91));break;default:o!==c&&rn(e,n,m,o,i,c)}Td(e,O,U);return;case"option":for(var me in t)O=t[me],t.hasOwnProperty(me)&&O!=null&&!i.hasOwnProperty(me)&&(me==="selected"?e.selected=!1:rn(e,n,me,null,i,O));for(D in i)O=i[D],U=t[D],i.hasOwnProperty(D)&&O!==U&&(O!=null||U!=null)&&(D==="selected"?e.selected=O&&typeof O!="function"&&typeof O!="symbol":rn(e,n,D,O,i,U));return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var De in t)O=t[De],t.hasOwnProperty(De)&&O!=null&&!i.hasOwnProperty(De)&&rn(e,n,De,null,i,O);for(_ in i)if(O=i[_],U=t[_],i.hasOwnProperty(_)&&O!==U&&(O!=null||U!=null))switch(_){case"children":case"dangerouslySetInnerHTML":if(O!=null)throw Error(s(137,n));break;default:rn(e,n,_,O,i,U)}return;default:if(uo(n)){for(var ln in t)O=t[ln],t.hasOwnProperty(ln)&&O!==void 0&&!i.hasOwnProperty(ln)&&Fc(e,n,ln,void 0,i,O);for(B in i)O=i[B],U=t[B],!i.hasOwnProperty(B)||O===U||O===void 0&&U===void 0||Fc(e,n,B,O,i,U);return}}for(var k in t)O=t[k],t.hasOwnProperty(k)&&O!=null&&!i.hasOwnProperty(k)&&rn(e,n,k,null,i,O);for(Y in i)O=i[Y],U=t[Y],!i.hasOwnProperty(Y)||O===U||O==null&&U==null||rn(e,n,Y,O,i,U)}function Ih(e){switch(e){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function i1(){if(typeof performance.getEntriesByType=="function"){for(var e=0,n=0,t=performance.getEntriesByType("resource"),i=0;i<t.length;i++){var o=t[i],c=o.transferSize,m=o.initiatorType,z=o.duration;if(c&&z&&Ih(m)){for(m=0,z=o.responseEnd,i+=1;i<t.length;i++){var D=t[i],_=D.startTime;if(_>z)break;var B=D.transferSize,Y=D.initiatorType;B&&Ih(Y)&&(D=D.responseEnd,m+=B*(D<z?1:(z-_)/(D-_)))}if(--i,n+=8*(c+m)/(o.duration/1e3),e++,10<e)break}}if(0<e)return n/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e=="number")?e:5}var Jc=null,$c=null;function Rs(e){return e.nodeType===9?e:e.ownerDocument}function Mh(e){switch(e){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function _h(e,n){if(e===0)switch(n){case"svg":return 1;case"math":return 2;default:return 0}return e===1&&n==="foreignObject"?0:e}function eu(e,n){return e==="textarea"||e==="noscript"||typeof n.children=="string"||typeof n.children=="number"||typeof n.children=="bigint"||typeof n.dangerouslySetInnerHTML=="object"&&n.dangerouslySetInnerHTML!==null&&n.dangerouslySetInnerHTML.__html!=null}var nu=null;function r1(){var e=window.event;return e&&e.type==="popstate"?e===nu?!1:(nu=e,!0):(nu=null,!1)}var Ch=typeof setTimeout=="function"?setTimeout:void 0,l1=typeof clearTimeout=="function"?clearTimeout:void 0,Lh=typeof Promise=="function"?Promise:void 0,s1=typeof queueMicrotask=="function"?queueMicrotask:typeof Lh<"u"?function(e){return Lh.resolve(null).then(e).catch(o1)}:Ch;function o1(e){setTimeout(function(){throw e})}function Xa(e){return e==="head"}function Oh(e,n){var t=n,i=0;do{var o=t.nextSibling;if(e.removeChild(t),o&&o.nodeType===8)if(t=o.data,t==="/$"||t==="/&"){if(i===0){e.removeChild(o),dr(n);return}i--}else if(t==="$"||t==="$?"||t==="$~"||t==="$!"||t==="&")i++;else if(t==="html")tl(e.ownerDocument.documentElement);else if(t==="head"){t=e.ownerDocument.head,tl(t);for(var c=t.firstChild;c;){var m=c.nextSibling,z=c.nodeName;c[We]||z==="SCRIPT"||z==="STYLE"||z==="LINK"&&c.rel.toLowerCase()==="stylesheet"||t.removeChild(c),c=m}}else t==="body"&&tl(e.ownerDocument.body);t=o}while(t);dr(n)}function Nh(e,n){var t=e;e=0;do{var i=t.nextSibling;if(t.nodeType===1?n?(t._stashedDisplay=t.style.display,t.style.display="none"):(t.style.display=t._stashedDisplay||"",t.getAttribute("style")===""&&t.removeAttribute("style")):t.nodeType===3&&(n?(t._stashedText=t.nodeValue,t.nodeValue=""):t.nodeValue=t._stashedText||""),i&&i.nodeType===8)if(t=i.data,t==="/$"){if(e===0)break;e--}else t!=="$"&&t!=="$?"&&t!=="$~"&&t!=="$!"||e++;t=i}while(t)}function tu(e){var n=e.firstChild;for(n&&n.nodeType===10&&(n=n.nextSibling);n;){var t=n;switch(n=n.nextSibling,t.nodeName){case"HTML":case"HEAD":case"BODY":tu(t),on(t);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(t.rel.toLowerCase()==="stylesheet")continue}e.removeChild(t)}}function c1(e,n,t,i){for(;e.nodeType===1;){var o=t;if(e.nodeName.toLowerCase()!==n.toLowerCase()){if(!i&&(e.nodeName!=="INPUT"||e.type!=="hidden"))break}else if(i){if(!e[We])switch(n){case"meta":if(!e.hasAttribute("itemprop"))break;return e;case"link":if(c=e.getAttribute("rel"),c==="stylesheet"&&e.hasAttribute("data-precedence"))break;if(c!==o.rel||e.getAttribute("href")!==(o.href==null||o.href===""?null:o.href)||e.getAttribute("crossorigin")!==(o.crossOrigin==null?null:o.crossOrigin)||e.getAttribute("title")!==(o.title==null?null:o.title))break;return e;case"style":if(e.hasAttribute("data-precedence"))break;return e;case"script":if(c=e.getAttribute("src"),(c!==(o.src==null?null:o.src)||e.getAttribute("type")!==(o.type==null?null:o.type)||e.getAttribute("crossorigin")!==(o.crossOrigin==null?null:o.crossOrigin))&&c&&e.hasAttribute("async")&&!e.hasAttribute("itemprop"))break;return e;default:return e}}else if(n==="input"&&e.type==="hidden"){var c=o.name==null?null:""+o.name;if(o.type==="hidden"&&e.getAttribute("name")===c)return e}else return e;if(e=Rt(e.nextSibling),e===null)break}return null}function u1(e,n,t){if(n==="")return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!t||(e=Rt(e.nextSibling),e===null))return null;return e}function Wh(e,n){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!n||(e=Rt(e.nextSibling),e===null))return null;return e}function au(e){return e.data==="$?"||e.data==="$~"}function iu(e){return e.data==="$!"||e.data==="$?"&&e.ownerDocument.readyState!=="loading"}function d1(e,n){var t=e.ownerDocument;if(e.data==="$~")e._reactRetry=n;else if(e.data!=="$?"||t.readyState!=="loading")n();else{var i=function(){n(),t.removeEventListener("DOMContentLoaded",i)};t.addEventListener("DOMContentLoaded",i),e._reactRetry=i}}function Rt(e){for(;e!=null;e=e.nextSibling){var n=e.nodeType;if(n===1||n===3)break;if(n===8){if(n=e.data,n==="$"||n==="$!"||n==="$?"||n==="$~"||n==="&"||n==="F!"||n==="F")break;if(n==="/$"||n==="/&")return null}}return e}var ru=null;function Uh(e){e=e.nextSibling;for(var n=0;e;){if(e.nodeType===8){var t=e.data;if(t==="/$"||t==="/&"){if(n===0)return Rt(e.nextSibling);n--}else t!=="$"&&t!=="$!"&&t!=="$?"&&t!=="$~"&&t!=="&"||n++}e=e.nextSibling}return null}function Ph(e){e=e.previousSibling;for(var n=0;e;){if(e.nodeType===8){var t=e.data;if(t==="$"||t==="$!"||t==="$?"||t==="$~"||t==="&"){if(n===0)return e;n--}else t!=="/$"&&t!=="/&"||n++}e=e.previousSibling}return null}function jh(e,n,t){switch(n=Rs(t),e){case"html":if(e=n.documentElement,!e)throw Error(s(452));return e;case"head":if(e=n.head,!e)throw Error(s(453));return e;case"body":if(e=n.body,!e)throw Error(s(454));return e;default:throw Error(s(451))}}function tl(e){for(var n=e.attributes;n.length;)e.removeAttributeNode(n[0]);on(e)}var kt=new Map,Bh=new Set;function ks(e){return typeof e.getRootNode=="function"?e.getRootNode():e.nodeType===9?e:e.ownerDocument}var ma=F.d;F.d={f:f1,r:p1,D:h1,C:m1,L:g1,m:y1,X:z1,S:b1,M:v1};function f1(){var e=ma.f(),n=vs();return e||n}function p1(e){var n=bt(e);n!==null&&n.tag===5&&n.type==="form"?ip(n):ma.r(e)}var or=typeof document>"u"?null:document;function Xh(e,n,t){var i=or;if(i&&typeof n=="string"&&n){var o=St(n);o='link[rel="'+e+'"][href="'+o+'"]',typeof t=="string"&&(o+='[crossorigin="'+t+'"]'),Bh.has(o)||(Bh.add(o),e={rel:e,crossOrigin:t,href:n},i.querySelector(o)===null&&(n=i.createElement("link"),Bn(n,"link",e),vn(n),i.head.appendChild(n)))}}function h1(e){ma.D(e),Xh("dns-prefetch",e,null)}function m1(e,n){ma.C(e,n),Xh("preconnect",e,n)}function g1(e,n,t){ma.L(e,n,t);var i=or;if(i&&e&&n){var o='link[rel="preload"][as="'+St(n)+'"]';n==="image"&&t&&t.imageSrcSet?(o+='[imagesrcset="'+St(t.imageSrcSet)+'"]',typeof t.imageSizes=="string"&&(o+='[imagesizes="'+St(t.imageSizes)+'"]')):o+='[href="'+St(e)+'"]';var c=o;switch(n){case"style":c=cr(e);break;case"script":c=ur(e)}kt.has(c)||(e=b({rel:"preload",href:n==="image"&&t&&t.imageSrcSet?void 0:e,as:n},t),kt.set(c,e),i.querySelector(o)!==null||n==="style"&&i.querySelector(al(c))||n==="script"&&i.querySelector(il(c))||(n=i.createElement("link"),Bn(n,"link",e),vn(n),i.head.appendChild(n)))}}function y1(e,n){ma.m(e,n);var t=or;if(t&&e){var i=n&&typeof n.as=="string"?n.as:"script",o='link[rel="modulepreload"][as="'+St(i)+'"][href="'+St(e)+'"]',c=o;switch(i){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":c=ur(e)}if(!kt.has(c)&&(e=b({rel:"modulepreload",href:e},n),kt.set(c,e),t.querySelector(o)===null)){switch(i){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(t.querySelector(il(c)))return}i=t.createElement("link"),Bn(i,"link",e),vn(i),t.head.appendChild(i)}}}function b1(e,n,t){ma.S(e,n,t);var i=or;if(i&&e){var o=Wn(i).hoistableStyles,c=cr(e);n=n||"default";var m=o.get(c);if(!m){var z={loading:0,preload:null};if(m=i.querySelector(al(c)))z.loading=5;else{e=b({rel:"stylesheet",href:e,"data-precedence":n},t),(t=kt.get(c))&&lu(e,t);var D=m=i.createElement("link");vn(D),Bn(D,"link",e),D._p=new Promise(function(_,B){D.onload=_,D.onerror=B}),D.addEventListener("load",function(){z.loading|=1}),D.addEventListener("error",function(){z.loading|=2}),z.loading|=4,Is(m,n,i)}m={type:"stylesheet",instance:m,count:1,state:z},o.set(c,m)}}}function z1(e,n){ma.X(e,n);var t=or;if(t&&e){var i=Wn(t).hoistableScripts,o=ur(e),c=i.get(o);c||(c=t.querySelector(il(o)),c||(e=b({src:e,async:!0},n),(n=kt.get(o))&&su(e,n),c=t.createElement("script"),vn(c),Bn(c,"link",e),t.head.appendChild(c)),c={type:"script",instance:c,count:1,state:null},i.set(o,c))}}function v1(e,n){ma.M(e,n);var t=or;if(t&&e){var i=Wn(t).hoistableScripts,o=ur(e),c=i.get(o);c||(c=t.querySelector(il(o)),c||(e=b({src:e,async:!0,type:"module"},n),(n=kt.get(o))&&su(e,n),c=t.createElement("script"),vn(c),Bn(c,"link",e),t.head.appendChild(c)),c={type:"script",instance:c,count:1,state:null},i.set(o,c))}}function Hh(e,n,t,i){var o=(o=ye.current)?ks(o):null;if(!o)throw Error(s(446));switch(e){case"meta":case"title":return null;case"style":return typeof t.precedence=="string"&&typeof t.href=="string"?(n=cr(t.href),t=Wn(o).hoistableStyles,i=t.get(n),i||(i={type:"style",instance:null,count:0,state:null},t.set(n,i)),i):{type:"void",instance:null,count:0,state:null};case"link":if(t.rel==="stylesheet"&&typeof t.href=="string"&&typeof t.precedence=="string"){e=cr(t.href);var c=Wn(o).hoistableStyles,m=c.get(e);if(m||(o=o.ownerDocument||o,m={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},c.set(e,m),(c=o.querySelector(al(e)))&&!c._p&&(m.instance=c,m.state.loading=5),kt.has(e)||(t={rel:"preload",as:"style",href:t.href,crossOrigin:t.crossOrigin,integrity:t.integrity,media:t.media,hrefLang:t.hrefLang,referrerPolicy:t.referrerPolicy},kt.set(e,t),c||S1(o,e,t,m.state))),n&&i===null)throw Error(s(528,""));return m}if(n&&i!==null)throw Error(s(529,""));return null;case"script":return n=t.async,t=t.src,typeof t=="string"&&n&&typeof n!="function"&&typeof n!="symbol"?(n=ur(t),t=Wn(o).hoistableScripts,i=t.get(n),i||(i={type:"script",instance:null,count:0,state:null},t.set(n,i)),i):{type:"void",instance:null,count:0,state:null};default:throw Error(s(444,e))}}function cr(e){return'href="'+St(e)+'"'}function al(e){return'link[rel="stylesheet"]['+e+"]"}function Zh(e){return b({},e,{"data-precedence":e.precedence,precedence:null})}function S1(e,n,t,i){e.querySelector('link[rel="preload"][as="style"]['+n+"]")?i.loading=1:(n=e.createElement("link"),i.preload=n,n.addEventListener("load",function(){return i.loading|=1}),n.addEventListener("error",function(){return i.loading|=2}),Bn(n,"link",t),vn(n),e.head.appendChild(n))}function ur(e){return'[src="'+St(e)+'"]'}function il(e){return"script[async]"+e}function Vh(e,n,t){if(n.count++,n.instance===null)switch(n.type){case"style":var i=e.querySelector('style[data-href~="'+St(t.href)+'"]');if(i)return n.instance=i,vn(i),i;var o=b({},t,{"data-href":t.href,"data-precedence":t.precedence,href:null,precedence:null});return i=(e.ownerDocument||e).createElement("style"),vn(i),Bn(i,"style",o),Is(i,t.precedence,e),n.instance=i;case"stylesheet":o=cr(t.href);var c=e.querySelector(al(o));if(c)return n.state.loading|=4,n.instance=c,vn(c),c;i=Zh(t),(o=kt.get(o))&&lu(i,o),c=(e.ownerDocument||e).createElement("link"),vn(c);var m=c;return m._p=new Promise(function(z,D){m.onload=z,m.onerror=D}),Bn(c,"link",i),n.state.loading|=4,Is(c,t.precedence,e),n.instance=c;case"script":return c=ur(t.src),(o=e.querySelector(il(c)))?(n.instance=o,vn(o),o):(i=t,(o=kt.get(c))&&(i=b({},t),su(i,o)),e=e.ownerDocument||e,o=e.createElement("script"),vn(o),Bn(o,"link",i),e.head.appendChild(o),n.instance=o);case"void":return null;default:throw Error(s(443,n.type))}else n.type==="stylesheet"&&(n.state.loading&4)===0&&(i=n.instance,n.state.loading|=4,Is(i,t.precedence,e));return n.instance}function Is(e,n,t){for(var i=t.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),o=i.length?i[i.length-1]:null,c=o,m=0;m<i.length;m++){var z=i[m];if(z.dataset.precedence===n)c=z;else if(c!==o)break}c?c.parentNode.insertBefore(e,c.nextSibling):(n=t.nodeType===9?t.head:t,n.insertBefore(e,n.firstChild))}function lu(e,n){e.crossOrigin==null&&(e.crossOrigin=n.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=n.referrerPolicy),e.title==null&&(e.title=n.title)}function su(e,n){e.crossOrigin==null&&(e.crossOrigin=n.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=n.referrerPolicy),e.integrity==null&&(e.integrity=n.integrity)}var Ms=null;function qh(e,n,t){if(Ms===null){var i=new Map,o=Ms=new Map;o.set(t,i)}else o=Ms,i=o.get(t),i||(i=new Map,o.set(t,i));if(i.has(e))return i;for(i.set(e,null),t=t.getElementsByTagName(e),o=0;o<t.length;o++){var c=t[o];if(!(c[We]||c[ce]||e==="link"&&c.getAttribute("rel")==="stylesheet")&&c.namespaceURI!=="http://www.w3.org/2000/svg"){var m=c.getAttribute(n)||"";m=e+m;var z=i.get(m);z?z.push(c):i.set(m,[c])}}return i}function Yh(e,n,t){e=e.ownerDocument||e,e.head.insertBefore(t,n==="title"?e.querySelector("head > title"):null)}function E1(e,n,t){if(t===1||n.itemProp!=null)return!1;switch(e){case"meta":case"title":return!0;case"style":if(typeof n.precedence!="string"||typeof n.href!="string"||n.href==="")break;return!0;case"link":if(typeof n.rel!="string"||typeof n.href!="string"||n.href===""||n.onLoad||n.onError)break;return n.rel==="stylesheet"?(e=n.disabled,typeof n.precedence=="string"&&e==null):!0;case"script":if(n.async&&typeof n.async!="function"&&typeof n.async!="symbol"&&!n.onLoad&&!n.onError&&n.src&&typeof n.src=="string")return!0}return!1}function Gh(e){return!(e.type==="stylesheet"&&(e.state.loading&3)===0)}function x1(e,n,t,i){if(t.type==="stylesheet"&&(typeof i.media!="string"||matchMedia(i.media).matches!==!1)&&(t.state.loading&4)===0){if(t.instance===null){var o=cr(i.href),c=n.querySelector(al(o));if(c){n=c._p,n!==null&&typeof n=="object"&&typeof n.then=="function"&&(e.count++,e=_s.bind(e),n.then(e,e)),t.state.loading|=4,t.instance=c,vn(c);return}c=n.ownerDocument||n,i=Zh(i),(o=kt.get(o))&&lu(i,o),c=c.createElement("link"),vn(c);var m=c;m._p=new Promise(function(z,D){m.onload=z,m.onerror=D}),Bn(c,"link",i),t.instance=c}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(t,n),(n=t.state.preload)&&(t.state.loading&3)===0&&(e.count++,t=_s.bind(e),n.addEventListener("load",t),n.addEventListener("error",t))}}var ou=0;function D1(e,n){return e.stylesheets&&e.count===0&&Ls(e,e.stylesheets),0<e.count||0<e.imgCount?function(t){var i=setTimeout(function(){if(e.stylesheets&&Ls(e,e.stylesheets),e.unsuspend){var c=e.unsuspend;e.unsuspend=null,c()}},6e4+n);0<e.imgBytes&&ou===0&&(ou=62500*i1());var o=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&Ls(e,e.stylesheets),e.unsuspend)){var c=e.unsuspend;e.unsuspend=null,c()}},(e.imgBytes>ou?50:800)+n);return e.unsuspend=t,function(){e.unsuspend=null,clearTimeout(i),clearTimeout(o)}}:null}function _s(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)Ls(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}}var Cs=null;function Ls(e,n){e.stylesheets=null,e.unsuspend!==null&&(e.count++,Cs=new Map,n.forEach(T1,e),Cs=null,_s.call(e))}function T1(e,n){if(!(n.state.loading&4)){var t=Cs.get(e);if(t)var i=t.get(null);else{t=new Map,Cs.set(e,t);for(var o=e.querySelectorAll("link[data-precedence],style[data-precedence]"),c=0;c<o.length;c++){var m=o[c];(m.nodeName==="LINK"||m.getAttribute("media")!=="not all")&&(t.set(m.dataset.precedence,m),i=m)}i&&t.set(null,i)}o=n.instance,m=o.getAttribute("data-precedence"),c=t.get(m)||i,c===i&&t.set(null,o),t.set(m,o),this.count++,i=_s.bind(this),o.addEventListener("load",i),o.addEventListener("error",i),c?c.parentNode.insertBefore(o,c.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(o,e.firstChild)),n.state.loading|=4}}var rl={$$typeof:q,Provider:null,Consumer:null,_currentValue:le,_currentValue2:le,_threadCount:0};function A1(e,n,t,i,o,c,m,z,D){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=xa(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=xa(0),this.hiddenUpdates=xa(null),this.identifierPrefix=i,this.onUncaughtError=o,this.onCaughtError=c,this.onRecoverableError=m,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=D,this.incompleteTransitions=new Map}function Qh(e,n,t,i,o,c,m,z,D,_,B,Y){return e=new A1(e,n,t,m,D,_,B,Y,z),n=1,c===!0&&(n|=24),c=ot(3,null,null,n),e.current=c,c.stateNode=e,n=Bo(),n.refCount++,e.pooledCache=n,n.refCount++,c.memoizedState={element:i,isDehydrated:t,cache:n},Vo(c),e}function Kh(e){return e?(e=Bi,e):Bi}function Fh(e,n,t,i,o,c){o=Kh(o),i.context===null?i.context=o:i.pendingContext=o,i=Ma(n),i.payload={element:t},c=c===void 0?null:c,c!==null&&(i.callback=c),t=_a(e,i,n),t!==null&&(nt(t,e,n),Wr(t,e,n))}function Jh(e,n){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var t=e.retryLane;e.retryLane=t!==0&&t<n?t:n}}function cu(e,n){Jh(e,n),(e=e.alternate)&&Jh(e,n)}function $h(e){if(e.tag===13||e.tag===31){var n=di(e,67108864);n!==null&&nt(n,e,67108864),cu(e,67108864)}}function em(e){if(e.tag===13||e.tag===31){var n=pt();n=K(n);var t=di(e,n);t!==null&&nt(t,e,n),cu(e,n)}}var Os=!0;function w1(e,n,t,i){var o=C.T;C.T=null;var c=F.p;try{F.p=2,uu(e,n,t,i)}finally{F.p=c,C.T=o}}function R1(e,n,t,i){var o=C.T;C.T=null;var c=F.p;try{F.p=8,uu(e,n,t,i)}finally{F.p=c,C.T=o}}function uu(e,n,t,i){if(Os){var o=du(i);if(o===null)Kc(e,n,i,Ns,t),tm(e,i);else if(I1(o,e,n,t,i))i.stopPropagation();else if(tm(e,i),n&4&&-1<k1.indexOf(e)){for(;o!==null;){var c=bt(o);if(c!==null)switch(c.tag){case 3:if(c=c.stateNode,c.current.memoizedState.isDehydrated){var m=Ft(c.pendingLanes);if(m!==0){var z=c;for(z.pendingLanes|=2,z.entangledLanes|=2;m;){var D=1<<31-Fe(m);z.entanglements[1]|=D,m&=~D}Vt(c),(Ge&6)===0&&(bs=bn()+500,$r(0))}}break;case 31:case 13:z=di(c,2),z!==null&&nt(z,c,2),vs(),cu(c,2)}if(c=du(i),c===null&&Kc(e,n,i,Ns,t),c===o)break;o=c}o!==null&&i.stopPropagation()}else Kc(e,n,i,null,t)}}function du(e){return e=po(e),fu(e)}var Ns=null;function fu(e){if(Ns=null,e=lt(e),e!==null){var n=d(e);if(n===null)e=null;else{var t=n.tag;if(t===13){if(e=f(n),e!==null)return e;e=null}else if(t===31){if(e=h(n),e!==null)return e;e=null}else if(t===3){if(n.stateNode.current.memoizedState.isDehydrated)return n.tag===3?n.stateNode.containerInfo:null;e=null}else n!==e&&(e=null)}}return Ns=e,null}function nm(e){switch(e){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(Kt()){case Z:return 2;case ae:return 8;case Se:case we:return 32;case Ve:return 268435456;default:return 32}default:return 32}}var pu=!1,Ha=null,Za=null,Va=null,ll=new Map,sl=new Map,qa=[],k1="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function tm(e,n){switch(e){case"focusin":case"focusout":Ha=null;break;case"dragenter":case"dragleave":Za=null;break;case"mouseover":case"mouseout":Va=null;break;case"pointerover":case"pointerout":ll.delete(n.pointerId);break;case"gotpointercapture":case"lostpointercapture":sl.delete(n.pointerId)}}function ol(e,n,t,i,o,c){return e===null||e.nativeEvent!==c?(e={blockedOn:n,domEventName:t,eventSystemFlags:i,nativeEvent:c,targetContainers:[o]},n!==null&&(n=bt(n),n!==null&&$h(n)),e):(e.eventSystemFlags|=i,n=e.targetContainers,o!==null&&n.indexOf(o)===-1&&n.push(o),e)}function I1(e,n,t,i,o){switch(n){case"focusin":return Ha=ol(Ha,e,n,t,i,o),!0;case"dragenter":return Za=ol(Za,e,n,t,i,o),!0;case"mouseover":return Va=ol(Va,e,n,t,i,o),!0;case"pointerover":var c=o.pointerId;return ll.set(c,ol(ll.get(c)||null,e,n,t,i,o)),!0;case"gotpointercapture":return c=o.pointerId,sl.set(c,ol(sl.get(c)||null,e,n,t,i,o)),!0}return!1}function am(e){var n=lt(e.target);if(n!==null){var t=d(n);if(t!==null){if(n=t.tag,n===13){if(n=f(t),n!==null){e.blockedOn=n,Te(e.priority,function(){em(t)});return}}else if(n===31){if(n=h(t),n!==null){e.blockedOn=n,Te(e.priority,function(){em(t)});return}}else if(n===3&&t.stateNode.current.memoizedState.isDehydrated){e.blockedOn=t.tag===3?t.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Ws(e){if(e.blockedOn!==null)return!1;for(var n=e.targetContainers;0<n.length;){var t=du(e.nativeEvent);if(t===null){t=e.nativeEvent;var i=new t.constructor(t.type,t);fo=i,t.target.dispatchEvent(i),fo=null}else return n=bt(t),n!==null&&$h(n),e.blockedOn=t,!1;n.shift()}return!0}function im(e,n,t){Ws(e)&&t.delete(n)}function M1(){pu=!1,Ha!==null&&Ws(Ha)&&(Ha=null),Za!==null&&Ws(Za)&&(Za=null),Va!==null&&Ws(Va)&&(Va=null),ll.forEach(im),sl.forEach(im)}function Us(e,n){e.blockedOn===n&&(e.blockedOn=null,pu||(pu=!0,a.unstable_scheduleCallback(a.unstable_NormalPriority,M1)))}var Ps=null;function rm(e){Ps!==e&&(Ps=e,a.unstable_scheduleCallback(a.unstable_NormalPriority,function(){Ps===e&&(Ps=null);for(var n=0;n<e.length;n+=3){var t=e[n],i=e[n+1],o=e[n+2];if(typeof i!="function"){if(fu(i||t)===null)continue;break}var c=bt(t);c!==null&&(e.splice(n,3),n-=3,dc(c,{pending:!0,data:o,method:t.method,action:i},i,o))}}))}function dr(e){function n(D){return Us(D,e)}Ha!==null&&Us(Ha,e),Za!==null&&Us(Za,e),Va!==null&&Us(Va,e),ll.forEach(n),sl.forEach(n);for(var t=0;t<qa.length;t++){var i=qa[t];i.blockedOn===e&&(i.blockedOn=null)}for(;0<qa.length&&(t=qa[0],t.blockedOn===null);)am(t),t.blockedOn===null&&qa.shift();if(t=(e.ownerDocument||e).$$reactFormReplay,t!=null)for(i=0;i<t.length;i+=3){var o=t[i],c=t[i+1],m=o[oe]||null;if(typeof c=="function")m||rm(t);else if(m){var z=null;if(c&&c.hasAttribute("formAction")){if(o=c,m=c[oe]||null)z=m.formAction;else if(fu(o)!==null)continue}else z=m.action;typeof z=="function"?t[i+1]=z:(t.splice(i,3),i-=3),rm(t)}}}function lm(){function e(c){c.canIntercept&&c.info==="react-transition"&&c.intercept({handler:function(){return new Promise(function(m){return o=m})},focusReset:"manual",scroll:"manual"})}function n(){o!==null&&(o(),o=null),i||setTimeout(t,20)}function t(){if(!i&&!navigation.transition){var c=navigation.currentEntry;c&&c.url!=null&&navigation.navigate(c.url,{state:c.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var i=!1,o=null;return navigation.addEventListener("navigate",e),navigation.addEventListener("navigatesuccess",n),navigation.addEventListener("navigateerror",n),setTimeout(t,100),function(){i=!0,navigation.removeEventListener("navigate",e),navigation.removeEventListener("navigatesuccess",n),navigation.removeEventListener("navigateerror",n),o!==null&&(o(),o=null)}}}function hu(e){this._internalRoot=e}js.prototype.render=hu.prototype.render=function(e){var n=this._internalRoot;if(n===null)throw Error(s(409));var t=n.current,i=pt();Fh(t,i,e,n,null,null)},js.prototype.unmount=hu.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var n=e.containerInfo;Fh(e.current,2,null,e,null,null),vs(),n[ge]=null}};function js(e){this._internalRoot=e}js.prototype.unstable_scheduleHydration=function(e){if(e){var n=Ee();e={blockedOn:null,target:e,priority:n};for(var t=0;t<qa.length&&n!==0&&n<qa[t].priority;t++);qa.splice(t,0,e),t===0&&am(e)}};var sm=r.version;if(sm!=="19.2.3")throw Error(s(527,sm,"19.2.3"));F.findDOMNode=function(e){var n=e._reactInternals;if(n===void 0)throw typeof e.render=="function"?Error(s(188)):(e=Object.keys(e).join(","),Error(s(268,e)));return e=p(n),e=e!==null?y(e):null,e=e===null?null:e.stateNode,e};var _1={bundleType:0,version:"19.2.3",rendererPackageName:"react-dom",currentDispatcherRef:C,reconcilerVersion:"19.2.3"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Bs=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Bs.isDisabled&&Bs.supportsFiber)try{mn=Bs.inject(_1),zn=Bs}catch{}}return ul.createRoot=function(e,n){if(!u(e))throw Error(s(299));var t=!1,i="",o=hp,c=mp,m=gp;return n!=null&&(n.unstable_strictMode===!0&&(t=!0),n.identifierPrefix!==void 0&&(i=n.identifierPrefix),n.onUncaughtError!==void 0&&(o=n.onUncaughtError),n.onCaughtError!==void 0&&(c=n.onCaughtError),n.onRecoverableError!==void 0&&(m=n.onRecoverableError)),n=Qh(e,1,!1,null,null,t,i,null,o,c,m,lm),e[ge]=n.current,Qc(e),new hu(n)},ul.hydrateRoot=function(e,n,t){if(!u(e))throw Error(s(299));var i=!1,o="",c=hp,m=mp,z=gp,D=null;return t!=null&&(t.unstable_strictMode===!0&&(i=!0),t.identifierPrefix!==void 0&&(o=t.identifierPrefix),t.onUncaughtError!==void 0&&(c=t.onUncaughtError),t.onCaughtError!==void 0&&(m=t.onCaughtError),t.onRecoverableError!==void 0&&(z=t.onRecoverableError),t.formState!==void 0&&(D=t.formState)),n=Qh(e,1,!0,n,t??null,i,o,D,c,m,z,lm),n.context=Kh(null),t=n.current,i=pt(),i=K(i),o=Ma(i),o.callback=null,_a(t,o,i),t=i,n.current.lanes=t,li(n,t),Vt(n),e[ge]=n.current,Qc(e),new js(n)},ul.version="19.2.3",ul}var ym;function X1(){if(ym)return yu.exports;ym=1;function a(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(a)}catch(r){console.error(r)}}return a(),yu.exports=B1(),yu.exports}var H1=X1(),Rg=wg();const Z1=no(Rg),V1=Tg({__proto__:null,default:Z1},[Rg]);function yn(){return yn=Object.assign?Object.assign.bind():function(a){for(var r=1;r<arguments.length;r++){var l=arguments[r];for(var s in l)Object.prototype.hasOwnProperty.call(l,s)&&(a[s]=l[s])}return a},yn.apply(this,arguments)}var Mn;(function(a){a.Pop="POP",a.Push="PUSH",a.Replace="REPLACE"})(Mn||(Mn={}));const bm="popstate";function q1(a){a===void 0&&(a={});function r(s,u){let{pathname:d,search:f,hash:h}=s.location;return El("",{pathname:d,search:f,hash:h},u.state&&u.state.usr||null,u.state&&u.state.key||"default")}function l(s,u){return typeof u=="string"?u:Ri(u)}return G1(r,l,null,a)}function Ne(a,r){if(a===!1||a===null||typeof a>"u")throw new Error(r)}function wi(a,r){if(!a){typeof console<"u"&&console.warn(r);try{throw new Error(r)}catch{}}}function Y1(){return Math.random().toString(36).substr(2,8)}function zm(a,r){return{usr:a.state,key:a.key,idx:r}}function El(a,r,l,s){return l===void 0&&(l=null),yn({pathname:typeof a=="string"?a:a.pathname,search:"",hash:""},typeof r=="string"?Ja(r):r,{state:l,key:r&&r.key||s||Y1()})}function Ri(a){let{pathname:r="/",search:l="",hash:s=""}=a;return l&&l!=="?"&&(r+=l.charAt(0)==="?"?l:"?"+l),s&&s!=="#"&&(r+=s.charAt(0)==="#"?s:"#"+s),r}function Ja(a){let r={};if(a){let l=a.indexOf("#");l>=0&&(r.hash=a.substr(l),a=a.substr(0,l));let s=a.indexOf("?");s>=0&&(r.search=a.substr(s),a=a.substr(0,s)),a&&(r.pathname=a)}return r}function G1(a,r,l,s){s===void 0&&(s={});let{window:u=document.defaultView,v5Compat:d=!1}=s,f=u.history,h=Mn.Pop,g=null,p=y();p==null&&(p=0,f.replaceState(yn({},f.state,{idx:p}),""));function y(){return(f.state||{idx:null}).idx}function b(){h=Mn.Pop;let H=y(),P=H==null?null:H-p;p=H,g&&g({action:h,location:N.location,delta:P})}function S(H,P){h=Mn.Push;let G=El(N.location,H,P);p=y()+1;let q=zm(G,p),de=N.createHref(G);try{f.pushState(q,"",de)}catch(ze){if(ze instanceof DOMException&&ze.name==="DataCloneError")throw ze;u.location.assign(de)}d&&g&&g({action:h,location:N.location,delta:1})}function v(H,P){h=Mn.Replace;let G=El(N.location,H,P);p=y();let q=zm(G,p),de=N.createHref(G);f.replaceState(q,"",de),d&&g&&g({action:h,location:N.location,delta:0})}function L(H){let P=u.location.origin!=="null"?u.location.origin:u.location.href,G=typeof H=="string"?H:Ri(H);return G=G.replace(/ $/,"%20"),Ne(P,"No window.location.(origin|href) available to create URL for href: "+G),new URL(G,P)}let N={get action(){return h},get location(){return a(u,f)},listen(H){if(g)throw new Error("A history only accepts one active listener");return u.addEventListener(bm,b),g=H,()=>{u.removeEventListener(bm,b),g=null}},createHref(H){return r(u,H)},createURL:L,encodeLocation(H){let P=L(H);return{pathname:P.pathname,search:P.search,hash:P.hash}},push:S,replace:v,go(H){return f.go(H)}};return N}var tn;(function(a){a.data="data",a.deferred="deferred",a.redirect="redirect",a.error="error"})(tn||(tn={}));const Q1=new Set(["lazy","caseSensitive","path","id","index","children"]);function K1(a){return a.index===!0}function Gs(a,r,l,s){return l===void 0&&(l=[]),s===void 0&&(s={}),a.map((u,d)=>{let f=[...l,String(d)],h=typeof u.id=="string"?u.id:f.join("-");if(Ne(u.index!==!0||!u.children,"Cannot specify children on an index route"),Ne(!s[h],'Found a route id collision on id "'+h+`".  Route id's must be globally unique within Data Router usages`),K1(u)){let g=yn({},u,r(u),{id:h});return s[h]=g,g}else{let g=yn({},u,r(u),{id:h,children:void 0});return s[h]=g,u.children&&(g.children=Gs(u.children,r,f,s)),g}})}function Di(a,r,l){return l===void 0&&(l="/"),qs(a,r,l,!1)}function qs(a,r,l,s){let u=typeof r=="string"?Ja(r):r,d=ya(u.pathname||"/",l);if(d==null)return null;let f=kg(a);J1(f);let h=null;for(let g=0;h==null&&g<f.length;++g){let p=cz(d);h=sz(f[g],p,s)}return h}function F1(a,r){let{route:l,pathname:s,params:u}=a;return{id:l.id,pathname:s,params:u,data:r[l.id],handle:l.handle}}function kg(a,r,l,s){r===void 0&&(r=[]),l===void 0&&(l=[]),s===void 0&&(s="");let u=(d,f,h)=>{let g={relativePath:h===void 0?d.path||"":h,caseSensitive:d.caseSensitive===!0,childrenIndex:f,route:d};g.relativePath.startsWith("/")&&(Ne(g.relativePath.startsWith(s),'Absolute route path "'+g.relativePath+'" nested under path '+('"'+s+'" is not valid. An absolute child route path ')+"must start with the combined path of all its parent routes."),g.relativePath=g.relativePath.slice(s.length));let p=ga([s,g.relativePath]),y=l.concat(g);d.children&&d.children.length>0&&(Ne(d.index!==!0,"Index routes must not have child routes. Please remove "+('all child routes from route path "'+p+'".')),kg(d.children,r,y,p)),!(d.path==null&&!d.index)&&r.push({path:p,score:rz(p,d.index),routesMeta:y})};return a.forEach((d,f)=>{var h;if(d.path===""||!((h=d.path)!=null&&h.includes("?")))u(d,f);else for(let g of Ig(d.path))u(d,f,g)}),r}function Ig(a){let r=a.split("/");if(r.length===0)return[];let[l,...s]=r,u=l.endsWith("?"),d=l.replace(/\?$/,"");if(s.length===0)return u?[d,""]:[d];let f=Ig(s.join("/")),h=[];return h.push(...f.map(g=>g===""?d:[d,g].join("/"))),u&&h.push(...f),h.map(g=>a.startsWith("/")&&g===""?"/":g)}function J1(a){a.sort((r,l)=>r.score!==l.score?l.score-r.score:lz(r.routesMeta.map(s=>s.childrenIndex),l.routesMeta.map(s=>s.childrenIndex)))}const $1=/^:[\w-]+$/,ez=3,nz=2,tz=1,az=10,iz=-2,vm=a=>a==="*";function rz(a,r){let l=a.split("/"),s=l.length;return l.some(vm)&&(s+=iz),r&&(s+=nz),l.filter(u=>!vm(u)).reduce((u,d)=>u+($1.test(d)?ez:d===""?tz:az),s)}function lz(a,r){return a.length===r.length&&a.slice(0,-1).every((s,u)=>s===r[u])?a[a.length-1]-r[r.length-1]:0}function sz(a,r,l){l===void 0&&(l=!1);let{routesMeta:s}=a,u={},d="/",f=[];for(let h=0;h<s.length;++h){let g=s[h],p=h===s.length-1,y=d==="/"?r:r.slice(d.length)||"/",b=Qs({path:g.relativePath,caseSensitive:g.caseSensitive,end:p},y),S=g.route;if(!b&&p&&l&&!s[s.length-1].route.index&&(b=Qs({path:g.relativePath,caseSensitive:g.caseSensitive,end:!1},y)),!b)return null;Object.assign(u,b.params),f.push({params:u,pathname:ga([d,b.pathname]),pathnameBase:pz(ga([d,b.pathnameBase])),route:S}),b.pathnameBase!=="/"&&(d=ga([d,b.pathnameBase]))}return f}function Qs(a,r){typeof a=="string"&&(a={path:a,caseSensitive:!1,end:!0});let[l,s]=oz(a.path,a.caseSensitive,a.end),u=r.match(l);if(!u)return null;let d=u[0],f=d.replace(/(.)\/+$/,"$1"),h=u.slice(1);return{params:s.reduce((p,y,b)=>{let{paramName:S,isOptional:v}=y;if(S==="*"){let N=h[b]||"";f=d.slice(0,d.length-N.length).replace(/(.)\/+$/,"$1")}const L=h[b];return v&&!L?p[S]=void 0:p[S]=(L||"").replace(/%2F/g,"/"),p},{}),pathname:d,pathnameBase:f,pattern:a}}function oz(a,r,l){r===void 0&&(r=!1),l===void 0&&(l=!0),wi(a==="*"||!a.endsWith("*")||a.endsWith("/*"),'Route path "'+a+'" will be treated as if it were '+('"'+a.replace(/\*$/,"/*")+'" because the `*` character must ')+"always follow a `/` in the pattern. To get rid of this warning, "+('please change the route path to "'+a.replace(/\*$/,"/*")+'".'));let s=[],u="^"+a.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(f,h,g)=>(s.push({paramName:h,isOptional:g!=null}),g?"/?([^\\/]+)?":"/([^\\/]+)"));return a.endsWith("*")?(s.push({paramName:"*"}),u+=a==="*"||a==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):l?u+="\\/*$":a!==""&&a!=="/"&&(u+="(?:(?=\\/|$))"),[new RegExp(u,r?void 0:"i"),s]}function cz(a){try{return a.split("/").map(r=>decodeURIComponent(r).replace(/\//g,"%2F")).join("/")}catch(r){return wi(!1,'The URL path "'+a+'" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent '+("encoding ("+r+").")),a}}function ya(a,r){if(r==="/")return a;if(!a.toLowerCase().startsWith(r.toLowerCase()))return null;let l=r.endsWith("/")?r.length-1:r.length,s=a.charAt(l);return s&&s!=="/"?null:a.slice(l)||"/"}const uz=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,dz=a=>uz.test(a);function fz(a,r){r===void 0&&(r="/");let{pathname:l,search:s="",hash:u=""}=typeof a=="string"?Ja(a):a,d;if(l)if(dz(l))d=l;else{if(l.includes("//")){let f=l;l=l.replace(/\/\/+/g,"/"),wi(!1,"Pathnames cannot have embedded double slashes - normalizing "+(f+" -> "+l))}l.startsWith("/")?d=Sm(l.substring(1),"/"):d=Sm(l,r)}else d=r;return{pathname:d,search:hz(s),hash:mz(u)}}function Sm(a,r){let l=r.replace(/\/+$/,"").split("/");return a.split("/").forEach(u=>{u===".."?l.length>1&&l.pop():u!=="."&&l.push(u)}),l.length>1?l.join("/"):"/"}function Su(a,r,l,s){return"Cannot include a '"+a+"' character in a manually specified "+("`to."+r+"` field ["+JSON.stringify(s)+"].  Please separate it out to the ")+("`to."+l+"` field. Alternatively you may provide the full path as ")+'a string in <Link to="..."> and the router will parse it for you.'}function Mg(a){return a.filter((r,l)=>l===0||r.route.path&&r.route.path.length>0)}function nd(a,r){let l=Mg(a);return r?l.map((s,u)=>u===l.length-1?s.pathname:s.pathnameBase):l.map(s=>s.pathnameBase)}function td(a,r,l,s){s===void 0&&(s=!1);let u;typeof a=="string"?u=Ja(a):(u=yn({},a),Ne(!u.pathname||!u.pathname.includes("?"),Su("?","pathname","search",u)),Ne(!u.pathname||!u.pathname.includes("#"),Su("#","pathname","hash",u)),Ne(!u.search||!u.search.includes("#"),Su("#","search","hash",u)));let d=a===""||u.pathname==="",f=d?"/":u.pathname,h;if(f==null)h=l;else{let b=r.length-1;if(!s&&f.startsWith("..")){let S=f.split("/");for(;S[0]==="..";)S.shift(),b-=1;u.pathname=S.join("/")}h=b>=0?r[b]:"/"}let g=fz(u,h),p=f&&f!=="/"&&f.endsWith("/"),y=(d||f===".")&&l.endsWith("/");return!g.pathname.endsWith("/")&&(p||y)&&(g.pathname+="/"),g}const ga=a=>a.join("/").replace(/\/\/+/g,"/"),pz=a=>a.replace(/\/+$/,"").replace(/^\/*/,"/"),hz=a=>!a||a==="?"?"":a.startsWith("?")?a:"?"+a,mz=a=>!a||a==="#"?"":a.startsWith("#")?a:"#"+a;class Ks{constructor(r,l,s,u){u===void 0&&(u=!1),this.status=r,this.statusText=l||"",this.internal=u,s instanceof Error?(this.data=s.toString(),this.error=s):this.data=s}}function xl(a){return a!=null&&typeof a.status=="number"&&typeof a.statusText=="string"&&typeof a.internal=="boolean"&&"data"in a}const _g=["post","put","patch","delete"],gz=new Set(_g),yz=["get",..._g],bz=new Set(yz),zz=new Set([301,302,303,307,308]),vz=new Set([307,308]),Eu={state:"idle",location:void 0,formMethod:void 0,formAction:void 0,formEncType:void 0,formData:void 0,json:void 0,text:void 0},Sz={state:"idle",data:void 0,formMethod:void 0,formAction:void 0,formEncType:void 0,formData:void 0,json:void 0,text:void 0},dl={state:"unblocked",proceed:void 0,reset:void 0,location:void 0},ad=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,Ez=a=>({hasErrorBoundary:!!a.hasErrorBoundary}),Cg="remix-router-transitions";function xz(a){const r=a.window?a.window:typeof window<"u"?window:void 0,l=typeof r<"u"&&typeof r.document<"u"&&typeof r.document.createElement<"u",s=!l;Ne(a.routes.length>0,"You must provide a non-empty routes array to createRouter");let u;if(a.mapRouteProperties)u=a.mapRouteProperties;else if(a.detectErrorBoundary){let A=a.detectErrorBoundary;u=I=>({hasErrorBoundary:A(I)})}else u=Ez;let d={},f=Gs(a.routes,u,void 0,d),h,g=a.basename||"/",p=a.dataStrategy||wz,y=a.patchRoutesOnNavigation,b=yn({v7_fetcherPersist:!1,v7_normalizeFormMethod:!1,v7_partialHydration:!1,v7_prependBasename:!1,v7_relativeSplatPath:!1,v7_skipActionErrorRevalidation:!1},a.future),S=null,v=new Set,L=null,N=null,H=null,P=a.hydrationData!=null,G=Di(f,a.history.location,g),q=!1,de=null;if(G==null&&!y){let A=at(404,{pathname:a.history.location.pathname}),{matches:I,route:W}=_m(f);G=I,de={[W.id]:A}}G&&!a.hydrationData&&ri(G,f,a.history.location.pathname).active&&(G=null);let ze;if(G)if(G.some(A=>A.route.lazy))ze=!1;else if(!G.some(A=>A.route.loader))ze=!0;else if(b.v7_partialHydration){let A=a.hydrationData?a.hydrationData.loaderData:null,I=a.hydrationData?a.hydrationData.errors:null;if(I){let W=G.findIndex(K=>I[K.route.id]!==void 0);ze=G.slice(0,W+1).every(K=>!Bu(K.route,A,I))}else ze=G.every(W=>!Bu(W.route,A,I))}else ze=a.hydrationData!=null;else if(ze=!1,G=[],b.v7_partialHydration){let A=ri(null,f,a.history.location.pathname);A.active&&A.matches&&(q=!0,G=A.matches)}let X,R={historyAction:a.history.action,location:a.history.location,matches:G,initialized:ze,navigation:Eu,restoreScrollPosition:a.hydrationData!=null?!1:null,preventScrollReset:!1,revalidation:"idle",loaderData:a.hydrationData&&a.hydrationData.loaderData||{},actionData:a.hydrationData&&a.hydrationData.actionData||null,errors:a.hydrationData&&a.hydrationData.errors||de,fetchers:new Map,blockers:new Map},te=Mn.Pop,he=!1,ue,ie=!1,ne=new Map,Ae=null,fe=!1,$=!1,C=[],F=new Set,le=new Map,_e=0,x=-1,T=new Map,j=new Set,E=new Map,re=new Map,be=new Set,ye=new Map,Ie=new Map,Je;function Ke(){if(S=a.history.listen(A=>{let{action:I,location:W,delta:K}=A;if(Je){Je(),Je=void 0;return}wi(Ie.size===0||K!=null,"You are trying to use a blocker on a POP navigation to a location that was not created by @remix-run/router. This will fail silently in production. This can happen if you are navigating outside the router via `window.history.pushState`/`window.location.hash` instead of using router navigation APIs.  This can also happen if you are using createHashRouter and the user manually changes the URL.");let se=ti({currentLocation:R.location,nextLocation:W,historyAction:I});if(se&&K!=null){let Ee=new Promise(Te=>{Je=Te});a.history.go(K*-1),_i(se,{state:"blocked",location:W,proceed(){_i(se,{state:"proceeding",proceed:void 0,reset:void 0,location:W}),Ee.then(()=>a.history.go(K))},reset(){let Te=new Map(R.blockers);Te.set(se,dl),xn({blockers:Te})}});return}return Yn(I,W)}),l){Bz(r,ne);let A=()=>Xz(r,ne);r.addEventListener("pagehide",A),Ae=()=>r.removeEventListener("pagehide",A)}return R.initialized||Yn(Mn.Pop,R.location,{initialHydration:!0}),X}function qn(){S&&S(),Ae&&Ae(),v.clear(),ue&&ue.abort(),R.fetchers.forEach((A,I)=>Ln(I)),R.blockers.forEach((A,I)=>Gn(I))}function Mt(A){return v.add(A),()=>v.delete(A)}function xn(A,I){I===void 0&&(I={}),R=yn({},R,A);let W=[],K=[];b.v7_fetcherPersist&&R.fetchers.forEach((se,Ee)=>{se.state==="idle"&&(be.has(Ee)?K.push(Ee):W.push(Ee))}),be.forEach(se=>{!R.fetchers.has(se)&&!le.has(se)&&K.push(se)}),[...v].forEach(se=>se(R,{deletedFetchers:K,viewTransitionOpts:I.viewTransitionOpts,flushSync:I.flushSync===!0})),b.v7_fetcherPersist?(W.forEach(se=>R.fetchers.delete(se)),K.forEach(se=>Ln(se))):K.forEach(se=>be.delete(se))}function _t(A,I,W){var K,se;let{flushSync:Ee}=W===void 0?{}:W,Te=R.actionData!=null&&R.navigation.formMethod!=null&&Pt(R.navigation.formMethod)&&R.navigation.state==="loading"&&((K=A.state)==null?void 0:K._isRedirect)!==!0,pe;I.actionData?Object.keys(I.actionData).length>0?pe=I.actionData:pe=null:Te?pe=R.actionData:pe=null;let ce=I.loaderData?Im(R.loaderData,I.loaderData,I.matches||[],I.errors):R.loaderData,oe=R.blockers;oe.size>0&&(oe=new Map(oe),oe.forEach((je,_n)=>oe.set(_n,dl)));let ge=he===!0||R.navigation.formMethod!=null&&Pt(R.navigation.formMethod)&&((se=A.state)==null?void 0:se._isRedirect)!==!0;h&&(f=h,h=void 0),fe||te===Mn.Pop||(te===Mn.Push?a.history.push(A,A.state):te===Mn.Replace&&a.history.replace(A,A.state));let ke;if(te===Mn.Pop){let je=ne.get(R.location.pathname);je&&je.has(A.pathname)?ke={currentLocation:R.location,nextLocation:A}:ne.has(A.pathname)&&(ke={currentLocation:A,nextLocation:R.location})}else if(ie){let je=ne.get(R.location.pathname);je?je.add(A.pathname):(je=new Set([A.pathname]),ne.set(R.location.pathname,je)),ke={currentLocation:R.location,nextLocation:A}}xn(yn({},I,{actionData:pe,loaderData:ce,historyAction:te,location:A,initialized:!0,navigation:Eu,revalidation:"idle",restoreScrollPosition:Ml(A,I.matches||R.matches),preventScrollReset:ge,blockers:oe}),{viewTransitionOpts:ke,flushSync:Ee===!0}),te=Mn.Pop,he=!1,ie=!1,fe=!1,$=!1,C=[]}async function yt(A,I){if(typeof A=="number"){a.history.go(A);return}let W=ju(R.location,R.matches,g,b.v7_prependBasename,A,b.v7_relativeSplatPath,I?.fromRouteId,I?.relative),{path:K,submission:se,error:Ee}=Em(b.v7_normalizeFormMethod,!1,W,I),Te=R.location,pe=El(R.location,K,I&&I.state);pe=yn({},pe,a.history.encodeLocation(pe));let ce=I&&I.replace!=null?I.replace:void 0,oe=Mn.Push;ce===!0?oe=Mn.Replace:ce===!1||se!=null&&Pt(se.formMethod)&&se.formAction===R.location.pathname+R.location.search&&(oe=Mn.Replace);let ge=I&&"preventScrollReset"in I?I.preventScrollReset===!0:void 0,ke=(I&&I.flushSync)===!0,je=ti({currentLocation:Te,nextLocation:pe,historyAction:oe});if(je){_i(je,{state:"blocked",location:pe,proceed(){_i(je,{state:"proceeding",proceed:void 0,reset:void 0,location:pe}),yt(A,I)},reset(){let _n=new Map(R.blockers);_n.set(je,dl),xn({blockers:_n})}});return}return await Yn(oe,pe,{submission:se,pendingError:Ee,preventScrollReset:ge,replace:I&&I.replace,enableViewTransition:I&&I.viewTransition,flushSync:ke})}function za(){if(ae(),xn({revalidation:"loading"}),R.navigation.state!=="submitting"){if(R.navigation.state==="idle"){Yn(R.historyAction,R.location,{startUninterruptedRevalidation:!0});return}Yn(te||R.historyAction,R.navigation.location,{overrideNavigation:R.navigation,enableViewTransition:ie===!0})}}async function Yn(A,I,W){ue&&ue.abort(),ue=null,te=A,fe=(W&&W.startUninterruptedRevalidation)===!0,ii(R.location,R.matches),he=(W&&W.preventScrollReset)===!0,ie=(W&&W.enableViewTransition)===!0;let K=h||f,se=W&&W.overrideNavigation,Ee=W!=null&&W.initialHydration&&R.matches&&R.matches.length>0&&!q?R.matches:Di(K,I,g),Te=(W&&W.flushSync)===!0;if(Ee&&R.initialized&&!$&&Cz(R.location,I)&&!(W&&W.submission&&Pt(W.submission.formMethod))){_t(I,{matches:Ee},{flushSync:Te});return}let pe=ri(Ee,K,I.pathname);if(pe.active&&pe.matches&&(Ee=pe.matches),!Ee){let{error:$e,notFoundMatches:We,route:on}=Sa(I.pathname);_t(I,{matches:We,loaderData:{},errors:{[on.id]:$e}},{flushSync:Te});return}ue=new AbortController;let ce=fr(a.history,I,ue.signal,W&&W.submission),oe;if(W&&W.pendingError)oe=[Ti(Ee).route.id,{type:tn.error,error:W.pendingError}];else if(W&&W.submission&&Pt(W.submission.formMethod)){let $e=await Ii(ce,I,W.submission,Ee,pe.active,{replace:W.replace,flushSync:Te});if($e.shortCircuited)return;if($e.pendingActionResult){let[We,on]=$e.pendingActionResult;if(mt(on)&&xl(on.error)&&on.error.status===404){ue=null,_t(I,{matches:$e.matches,loaderData:{},errors:{[We]:on.error}});return}}Ee=$e.matches||Ee,oe=$e.pendingActionResult,se=xu(I,W.submission),Te=!1,pe.active=!1,ce=fr(a.history,ce.url,ce.signal)}let{shortCircuited:ge,matches:ke,loaderData:je,errors:_n}=await Mi(ce,I,Ee,pe.active,se,W&&W.submission,W&&W.fetcherSubmission,W&&W.replace,W&&W.initialHydration===!0,Te,oe);ge||(ue=null,_t(I,yn({matches:ke||Ee},Mm(oe),{loaderData:je,errors:_n})))}async function Ii(A,I,W,K,se,Ee){Ee===void 0&&(Ee={}),ae();let Te=Pz(I,W);if(xn({navigation:Te},{flushSync:Ee.flushSync===!0}),se){let oe=await xa(K,I.pathname,A.signal);if(oe.type==="aborted")return{shortCircuited:!0};if(oe.type==="error"){let ge=Ti(oe.partialMatches).route.id;return{matches:oe.partialMatches,pendingActionResult:[ge,{type:tn.error,error:oe.error}]}}else if(oe.matches)K=oe.matches;else{let{notFoundMatches:ge,error:ke,route:je}=Sa(I.pathname);return{matches:ge,pendingActionResult:[je.id,{type:tn.error,error:ke}]}}}let pe,ce=bl(K,I);if(!ce.route.action&&!ce.route.lazy)pe={type:tn.error,error:at(405,{method:A.method,pathname:I.pathname,routeId:ce.route.id})};else if(pe=(await Kt("action",R,A,[ce],K,null))[ce.route.id],A.signal.aborted)return{shortCircuited:!0};if(Ai(pe)){let oe;return Ee&&Ee.replace!=null?oe=Ee.replace:oe=wm(pe.response.headers.get("Location"),new URL(A.url),g,a.history)===R.location.pathname+R.location.search,await bn(A,pe,!0,{submission:W,replace:oe}),{shortCircuited:!0}}if(Fa(pe))throw at(400,{type:"defer-action"});if(mt(pe)){let oe=Ti(K,ce.route.id);return(Ee&&Ee.replace)!==!0&&(te=Mn.Push),{matches:K,pendingActionResult:[oe.route.id,pe]}}return{matches:K,pendingActionResult:[ce.route.id,pe]}}async function Mi(A,I,W,K,se,Ee,Te,pe,ce,oe,ge){let ke=se||xu(I,Ee),je=Ee||Te||Lm(ke),_n=!fe&&(!b.v7_partialHydration||!ce);if(K){if(_n){let dn=Qt(ge);xn(yn({navigation:ke},dn!==void 0?{actionData:dn}:{}),{flushSync:oe})}let Ze=await xa(W,I.pathname,A.signal);if(Ze.type==="aborted")return{shortCircuited:!0};if(Ze.type==="error"){let dn=Ti(Ze.partialMatches).route.id;return{matches:Ze.partialMatches,loaderData:{},errors:{[dn]:Ze.error}}}else if(Ze.matches)W=Ze.matches;else{let{error:dn,notFoundMatches:Jt,route:si}=Sa(I.pathname);return{matches:Jt,loaderData:{},errors:{[si.id]:dn}}}}let $e=h||f,[We,on]=Dm(a.history,R,W,je,I,b.v7_partialHydration&&ce===!0,b.v7_skipActionErrorRevalidation,$,C,F,be,E,j,$e,g,ge);if(Ea(Ze=>!(W&&W.some(dn=>dn.route.id===Ze))||We&&We.some(dn=>dn.route.id===Ze)),x=++_e,We.length===0&&on.length===0){let Ze=Nn();return _t(I,yn({matches:W,loaderData:{},errors:ge&&mt(ge[1])?{[ge[0]]:ge[1].error}:null},Mm(ge),Ze?{fetchers:new Map(R.fetchers)}:{}),{flushSync:oe}),{shortCircuited:!0}}if(_n){let Ze={};if(!K){Ze.navigation=ke;let dn=Qt(ge);dn!==void 0&&(Ze.actionData=dn)}on.length>0&&(Ze.fetchers=va(on)),xn(Ze,{flushSync:oe})}on.forEach(Ze=>{mn(Ze.key),Ze.controller&&le.set(Ze.key,Ze.controller)});let lt=()=>on.forEach(Ze=>mn(Ze.key));ue&&ue.signal.addEventListener("abort",lt);let{loaderResults:bt,fetcherResults:Zn}=await Z(R,W,We,on,A);if(A.signal.aborted)return{shortCircuited:!0};ue&&ue.signal.removeEventListener("abort",lt),on.forEach(Ze=>le.delete(Ze.key));let Wn=Xs(bt);if(Wn)return await bn(A,Wn.result,!0,{replace:pe}),{shortCircuited:!0};if(Wn=Xs(Zn),Wn)return j.add(Wn.key),await bn(A,Wn.result,!0,{replace:pe}),{shortCircuited:!0};let{loaderData:vn,errors:Da}=km(R,W,bt,ge,on,Zn,ye);ye.forEach((Ze,dn)=>{Ze.subscribe(Jt=>{(Jt||Ze.done)&&ye.delete(dn)})}),b.v7_partialHydration&&ce&&R.errors&&(Da=yn({},R.errors,Da));let Bt=Nn(),zt=Fe(x),Lt=Bt||zt||on.length>0;return yn({matches:W,loaderData:vn,errors:Da},Lt?{fetchers:new Map(R.fetchers)}:{})}function Qt(A){if(A&&!mt(A[1]))return{[A[0]]:A[1].data};if(R.actionData)return Object.keys(R.actionData).length===0?null:R.actionData}function va(A){return A.forEach(I=>{let W=R.fetchers.get(I.key),K=fl(void 0,W?W.data:void 0);R.fetchers.set(I.key,K)}),new Map(R.fetchers)}function ni(A,I,W,K){if(s)throw new Error("router.fetch() was called during the server render, but it shouldn't be. You are likely calling a useFetcher() method in the body of your component. Try moving it to a useEffect or a callback.");mn(A);let se=(K&&K.flushSync)===!0,Ee=h||f,Te=ju(R.location,R.matches,g,b.v7_prependBasename,W,b.v7_relativeSplatPath,I,K?.relative),pe=Di(Ee,Te,g),ce=ri(pe,Ee,Te);if(ce.active&&ce.matches&&(pe=ce.matches),!pe){we(A,I,at(404,{pathname:Te}),{flushSync:se});return}let{path:oe,submission:ge,error:ke}=Em(b.v7_normalizeFormMethod,!0,Te,K);if(ke){we(A,I,ke,{flushSync:se});return}let je=bl(pe,oe),_n=(K&&K.preventScrollReset)===!0;if(ge&&Pt(ge.formMethod)){vr(A,I,oe,je,pe,ce.active,se,_n,ge);return}E.set(A,{routeId:I,path:oe}),Sr(A,I,oe,je,pe,ce.active,se,_n,ge)}async function vr(A,I,W,K,se,Ee,Te,pe,ce){ae(),E.delete(A);function oe(fn){if(!fn.route.action&&!fn.route.lazy){let Ot=at(405,{method:ce.formMethod,pathname:W,routeId:I});return we(A,I,Ot,{flushSync:Te}),!0}return!1}if(!Ee&&oe(K))return;let ge=R.fetchers.get(A);Se(A,jz(ce,ge),{flushSync:Te});let ke=new AbortController,je=fr(a.history,W,ke.signal,ce);if(Ee){let fn=await xa(se,new URL(je.url).pathname,je.signal,A);if(fn.type==="aborted")return;if(fn.type==="error"){we(A,I,fn.error,{flushSync:Te});return}else if(fn.matches){if(se=fn.matches,K=bl(se,W),oe(K))return}else{we(A,I,at(404,{pathname:W}),{flushSync:Te});return}}le.set(A,ke);let _n=_e,We=(await Kt("action",R,je,[K],se,A))[K.route.id];if(je.signal.aborted){le.get(A)===ke&&le.delete(A);return}if(b.v7_fetcherPersist&&be.has(A)){if(Ai(We)||mt(We)){Se(A,Ka(void 0));return}}else{if(Ai(We))if(le.delete(A),x>_n){Se(A,Ka(void 0));return}else return j.add(A),Se(A,fl(ce)),bn(je,We,!1,{fetcherSubmission:ce,preventScrollReset:pe});if(mt(We)){we(A,I,We.error);return}}if(Fa(We))throw at(400,{type:"defer-action"});let on=R.navigation.location||R.location,lt=fr(a.history,on,ke.signal),bt=h||f,Zn=R.navigation.state!=="idle"?Di(bt,R.navigation.location,g):R.matches;Ne(Zn,"Didn't find any matches after fetcher action");let Wn=++_e;T.set(A,Wn);let vn=fl(ce,We.data);R.fetchers.set(A,vn);let[Da,Bt]=Dm(a.history,R,Zn,ce,on,!1,b.v7_skipActionErrorRevalidation,$,C,F,be,E,j,bt,g,[K.route.id,We]);Bt.filter(fn=>fn.key!==A).forEach(fn=>{let Ot=fn.key,vt=R.fetchers.get(Ot),Qn=fl(void 0,vt?vt.data:void 0);R.fetchers.set(Ot,Qn),mn(Ot),fn.controller&&le.set(Ot,fn.controller)}),xn({fetchers:new Map(R.fetchers)});let zt=()=>Bt.forEach(fn=>mn(fn.key));ke.signal.addEventListener("abort",zt);let{loaderResults:Lt,fetcherResults:Ze}=await Z(R,Zn,Da,Bt,lt);if(ke.signal.aborted)return;ke.signal.removeEventListener("abort",zt),T.delete(A),le.delete(A),Bt.forEach(fn=>le.delete(fn.key));let dn=Xs(Lt);if(dn)return bn(lt,dn.result,!1,{preventScrollReset:pe});if(dn=Xs(Ze),dn)return j.add(dn.key),bn(lt,dn.result,!1,{preventScrollReset:pe});let{loaderData:Jt,errors:si}=km(R,Zn,Lt,void 0,Bt,Ze,ye);if(R.fetchers.has(A)){let fn=Ka(We.data);R.fetchers.set(A,fn)}Fe(Wn),R.navigation.state==="loading"&&Wn>x?(Ne(te,"Expected pending action"),ue&&ue.abort(),_t(R.navigation.location,{matches:Zn,loaderData:Jt,errors:si,fetchers:new Map(R.fetchers)})):(xn({errors:si,loaderData:Im(R.loaderData,Jt,Zn,si),fetchers:new Map(R.fetchers)}),$=!1)}async function Sr(A,I,W,K,se,Ee,Te,pe,ce){let oe=R.fetchers.get(A);Se(A,fl(ce,oe?oe.data:void 0),{flushSync:Te});let ge=new AbortController,ke=fr(a.history,W,ge.signal);if(Ee){let We=await xa(se,new URL(ke.url).pathname,ke.signal,A);if(We.type==="aborted")return;if(We.type==="error"){we(A,I,We.error,{flushSync:Te});return}else if(We.matches)se=We.matches,K=bl(se,W);else{we(A,I,at(404,{pathname:W}),{flushSync:Te});return}}le.set(A,ge);let je=_e,$e=(await Kt("loader",R,ke,[K],se,A))[K.route.id];if(Fa($e)&&($e=await id($e,ke.signal,!0)||$e),le.get(A)===ge&&le.delete(A),!ke.signal.aborted){if(be.has(A)){Se(A,Ka(void 0));return}if(Ai($e))if(x>je){Se(A,Ka(void 0));return}else{j.add(A),await bn(ke,$e,!1,{preventScrollReset:pe});return}if(mt($e)){we(A,I,$e.error);return}Ne(!Fa($e),"Unhandled fetcher deferred data"),Se(A,Ka($e.data))}}async function bn(A,I,W,K){let{submission:se,fetcherSubmission:Ee,preventScrollReset:Te,replace:pe}=K===void 0?{}:K;I.response.headers.has("X-Remix-Revalidate")&&($=!0);let ce=I.response.headers.get("Location");Ne(ce,"Expected a Location header on the redirect Response"),ce=wm(ce,new URL(A.url),g,a.history);let oe=El(R.location,ce,{_isRedirect:!0});if(l){let We=!1;if(I.response.headers.has("X-Remix-Reload-Document"))We=!0;else if(ad.test(ce)){const on=a.history.createURL(ce);We=on.origin!==r.location.origin||ya(on.pathname,g)==null}if(We){pe?r.location.replace(ce):r.location.assign(ce);return}}ue=null;let ge=pe===!0||I.response.headers.has("X-Remix-Replace")?Mn.Replace:Mn.Push,{formMethod:ke,formAction:je,formEncType:_n}=R.navigation;!se&&!Ee&&ke&&je&&_n&&(se=Lm(R.navigation));let $e=se||Ee;if(vz.has(I.response.status)&&$e&&Pt($e.formMethod))await Yn(ge,oe,{submission:yn({},$e,{formAction:ce}),preventScrollReset:Te||he,enableViewTransition:W?ie:void 0});else{let We=xu(oe,se);await Yn(ge,oe,{overrideNavigation:We,fetcherSubmission:Ee,preventScrollReset:Te||he,enableViewTransition:W?ie:void 0})}}async function Kt(A,I,W,K,se,Ee){let Te,pe={};try{Te=await Rz(p,A,I,W,K,se,Ee,d,u)}catch(ce){return K.forEach(oe=>{pe[oe.route.id]={type:tn.error,error:ce}}),pe}for(let[ce,oe]of Object.entries(Te))if(Lz(oe)){let ge=oe.result;pe[ce]={type:tn.redirect,response:Mz(ge,W,ce,se,g,b.v7_relativeSplatPath)}}else pe[ce]=await Iz(oe);return pe}async function Z(A,I,W,K,se){let Ee=A.matches,Te=Kt("loader",A,se,W,I,null),pe=Promise.all(K.map(async ge=>{if(ge.matches&&ge.match&&ge.controller){let je=(await Kt("loader",A,fr(a.history,ge.path,ge.controller.signal),[ge.match],ge.matches,ge.key))[ge.match.route.id];return{[ge.key]:je}}else return Promise.resolve({[ge.key]:{type:tn.error,error:at(404,{pathname:ge.path})}})})),ce=await Te,oe=(await pe).reduce((ge,ke)=>Object.assign(ge,ke),{});return await Promise.all([Wz(I,ce,se.signal,Ee,A.loaderData),Uz(I,oe,K)]),{loaderResults:ce,fetcherResults:oe}}function ae(){$=!0,C.push(...Ea()),E.forEach((A,I)=>{le.has(I)&&F.add(I),mn(I)})}function Se(A,I,W){W===void 0&&(W={}),R.fetchers.set(A,I),xn({fetchers:new Map(R.fetchers)},{flushSync:(W&&W.flushSync)===!0})}function we(A,I,W,K){K===void 0&&(K={});let se=Ti(R.matches,I);Ln(A),xn({errors:{[se.route.id]:W},fetchers:new Map(R.fetchers)},{flushSync:(K&&K.flushSync)===!0})}function Ve(A){return re.set(A,(re.get(A)||0)+1),be.has(A)&&be.delete(A),R.fetchers.get(A)||Sz}function Ln(A){let I=R.fetchers.get(A);le.has(A)&&!(I&&I.state==="loading"&&T.has(A))&&mn(A),E.delete(A),T.delete(A),j.delete(A),b.v7_fetcherPersist&&be.delete(A),F.delete(A),R.fetchers.delete(A)}function Ct(A){let I=(re.get(A)||0)-1;I<=0?(re.delete(A),be.add(A),b.v7_fetcherPersist||Ln(A)):re.set(A,I),xn({fetchers:new Map(R.fetchers)})}function mn(A){let I=le.get(A);I&&(I.abort(),le.delete(A))}function zn(A){for(let I of A){let W=Ve(I),K=Ka(W.data);R.fetchers.set(I,K)}}function Nn(){let A=[],I=!1;for(let W of j){let K=R.fetchers.get(W);Ne(K,"Expected fetcher: "+W),K.state==="loading"&&(j.delete(W),A.push(W),I=!0)}return zn(A),I}function Fe(A){let I=[];for(let[W,K]of T)if(K<A){let se=R.fetchers.get(W);Ne(se,"Expected fetcher: "+W),se.state==="loading"&&(mn(W),T.delete(W),I.push(W))}return zn(I),I.length>0}function jt(A,I){let W=R.blockers.get(A)||dl;return Ie.get(A)!==I&&Ie.set(A,I),W}function Gn(A){R.blockers.delete(A),Ie.delete(A)}function _i(A,I){let W=R.blockers.get(A)||dl;Ne(W.state==="unblocked"&&I.state==="blocked"||W.state==="blocked"&&I.state==="blocked"||W.state==="blocked"&&I.state==="proceeding"||W.state==="blocked"&&I.state==="unblocked"||W.state==="proceeding"&&I.state==="unblocked","Invalid blocker state transition: "+W.state+" -> "+I.state);let K=new Map(R.blockers);K.set(A,I),xn({blockers:K})}function ti(A){let{currentLocation:I,nextLocation:W,historyAction:K}=A;if(Ie.size===0)return;Ie.size>1&&wi(!1,"A router only supports one blocker at a time");let se=Array.from(Ie.entries()),[Ee,Te]=se[se.length-1],pe=R.blockers.get(Ee);if(!(pe&&pe.state==="proceeding")&&Te({currentLocation:I,nextLocation:W,historyAction:K}))return Ee}function Sa(A){let I=at(404,{pathname:A}),W=h||f,{matches:K,route:se}=_m(W);return Ea(),{notFoundMatches:K,route:se,error:I}}function Ea(A){let I=[];return ye.forEach((W,K)=>{(!A||A(K))&&(W.cancel(),I.push(K),ye.delete(K))}),I}function Ft(A,I,W){if(L=A,H=I,N=W||null,!P&&R.navigation===Eu){P=!0;let K=Ml(R.location,R.matches);K!=null&&xn({restoreScrollPosition:K})}return()=>{L=null,H=null,N=null}}function ai(A,I){return N&&N(A,I.map(K=>F1(K,R.loaderData)))||A.key}function ii(A,I){if(L&&H){let W=ai(A,I);L[W]=H()}}function Ml(A,I){if(L){let W=ai(A,I),K=L[W];if(typeof K=="number")return K}return null}function ri(A,I,W){if(y)if(A){if(Object.keys(A[0].params).length>0)return{active:!0,matches:qs(I,W,g,!0)}}else return{active:!0,matches:qs(I,W,g,!0)||[]};return{active:!1,matches:null}}async function xa(A,I,W,K){if(!y)return{type:"success",matches:A};let se=A;for(;;){let Ee=h==null,Te=h||f,pe=d;try{await y({signal:W,path:I,matches:se,fetcherKey:K,patch:(ge,ke)=>{W.aborted||Am(ge,ke,Te,pe,u)}})}catch(ge){return{type:"error",error:ge,partialMatches:se}}finally{Ee&&!W.aborted&&(f=[...f])}if(W.aborted)return{type:"aborted"};let ce=Di(Te,I,g);if(ce)return{type:"success",matches:ce};let oe=qs(Te,I,g,!0);if(!oe||se.length===oe.length&&se.every((ge,ke)=>ge.route.id===oe[ke].route.id))return{type:"success",matches:null};se=oe}}function li(A){d={},h=Gs(A,u,void 0,d)}function lo(A,I){let W=h==null;Am(A,I,h||f,d,u),W&&(f=[...f],xn({}))}return X={get basename(){return g},get future(){return b},get state(){return R},get routes(){return f},get window(){return r},initialize:Ke,subscribe:Mt,enableScrollRestoration:Ft,navigate:yt,fetch:ni,revalidate:za,createHref:A=>a.history.createHref(A),encodeLocation:A=>a.history.encodeLocation(A),getFetcher:Ve,deleteFetcher:Ct,dispose:qn,getBlocker:jt,deleteBlocker:Gn,patchRoutes:lo,_internalFetchControllers:le,_internalActiveDeferreds:ye,_internalSetRoutes:li},X}function Dz(a){return a!=null&&("formData"in a&&a.formData!=null||"body"in a&&a.body!==void 0)}function ju(a,r,l,s,u,d,f,h){let g,p;if(f){g=[];for(let b of r)if(g.push(b),b.route.id===f){p=b;break}}else g=r,p=r[r.length-1];let y=td(u||".",nd(g,d),ya(a.pathname,l)||a.pathname,h==="path");if(u==null&&(y.search=a.search,y.hash=a.hash),(u==null||u===""||u===".")&&p){let b=rd(y.search);if(p.route.index&&!b)y.search=y.search?y.search.replace(/^\?/,"?index&"):"?index";else if(!p.route.index&&b){let S=new URLSearchParams(y.search),v=S.getAll("index");S.delete("index"),v.filter(N=>N).forEach(N=>S.append("index",N));let L=S.toString();y.search=L?"?"+L:""}}return s&&l!=="/"&&(y.pathname=y.pathname==="/"?l:ga([l,y.pathname])),Ri(y)}function Em(a,r,l,s){if(!s||!Dz(s))return{path:l};if(s.formMethod&&!Nz(s.formMethod))return{path:l,error:at(405,{method:s.formMethod})};let u=()=>({path:l,error:at(400,{type:"invalid-body"})}),d=s.formMethod||"get",f=a?d.toUpperCase():d.toLowerCase(),h=Ng(l);if(s.body!==void 0){if(s.formEncType==="text/plain"){if(!Pt(f))return u();let S=typeof s.body=="string"?s.body:s.body instanceof FormData||s.body instanceof URLSearchParams?Array.from(s.body.entries()).reduce((v,L)=>{let[N,H]=L;return""+v+N+"="+H+`
`},""):String(s.body);return{path:l,submission:{formMethod:f,formAction:h,formEncType:s.formEncType,formData:void 0,json:void 0,text:S}}}else if(s.formEncType==="application/json"){if(!Pt(f))return u();try{let S=typeof s.body=="string"?JSON.parse(s.body):s.body;return{path:l,submission:{formMethod:f,formAction:h,formEncType:s.formEncType,formData:void 0,json:S,text:void 0}}}catch{return u()}}}Ne(typeof FormData=="function","FormData is not available in this environment");let g,p;if(s.formData)g=Xu(s.formData),p=s.formData;else if(s.body instanceof FormData)g=Xu(s.body),p=s.body;else if(s.body instanceof URLSearchParams)g=s.body,p=Rm(g);else if(s.body==null)g=new URLSearchParams,p=new FormData;else try{g=new URLSearchParams(s.body),p=Rm(g)}catch{return u()}let y={formMethod:f,formAction:h,formEncType:s&&s.formEncType||"application/x-www-form-urlencoded",formData:p,json:void 0,text:void 0};if(Pt(y.formMethod))return{path:l,submission:y};let b=Ja(l);return r&&b.search&&rd(b.search)&&g.append("index",""),b.search="?"+g,{path:Ri(b),submission:y}}function xm(a,r,l){l===void 0&&(l=!1);let s=a.findIndex(u=>u.route.id===r);return s>=0?a.slice(0,l?s+1:s):a}function Dm(a,r,l,s,u,d,f,h,g,p,y,b,S,v,L,N){let H=N?mt(N[1])?N[1].error:N[1].data:void 0,P=a.createURL(r.location),G=a.createURL(u),q=l;d&&r.errors?q=xm(l,Object.keys(r.errors)[0],!0):N&&mt(N[1])&&(q=xm(l,N[0]));let de=N?N[1].statusCode:void 0,ze=f&&de&&de>=400,X=q.filter((te,he)=>{let{route:ue}=te;if(ue.lazy)return!0;if(ue.loader==null)return!1;if(d)return Bu(ue,r.loaderData,r.errors);if(Tz(r.loaderData,r.matches[he],te)||g.some(Ae=>Ae===te.route.id))return!0;let ie=r.matches[he],ne=te;return Tm(te,yn({currentUrl:P,currentParams:ie.params,nextUrl:G,nextParams:ne.params},s,{actionResult:H,actionStatus:de,defaultShouldRevalidate:ze?!1:h||P.pathname+P.search===G.pathname+G.search||P.search!==G.search||Lg(ie,ne)}))}),R=[];return b.forEach((te,he)=>{if(d||!l.some(fe=>fe.route.id===te.routeId)||y.has(he))return;let ue=Di(v,te.path,L);if(!ue){R.push({key:he,routeId:te.routeId,path:te.path,matches:null,match:null,controller:null});return}let ie=r.fetchers.get(he),ne=bl(ue,te.path),Ae=!1;S.has(he)?Ae=!1:p.has(he)?(p.delete(he),Ae=!0):ie&&ie.state!=="idle"&&ie.data===void 0?Ae=h:Ae=Tm(ne,yn({currentUrl:P,currentParams:r.matches[r.matches.length-1].params,nextUrl:G,nextParams:l[l.length-1].params},s,{actionResult:H,actionStatus:de,defaultShouldRevalidate:ze?!1:h})),Ae&&R.push({key:he,routeId:te.routeId,path:te.path,matches:ue,match:ne,controller:new AbortController})}),[X,R]}function Bu(a,r,l){if(a.lazy)return!0;if(!a.loader)return!1;let s=r!=null&&r[a.id]!==void 0,u=l!=null&&l[a.id]!==void 0;return!s&&u?!1:typeof a.loader=="function"&&a.loader.hydrate===!0?!0:!s&&!u}function Tz(a,r,l){let s=!r||l.route.id!==r.route.id,u=a[l.route.id]===void 0;return s||u}function Lg(a,r){let l=a.route.path;return a.pathname!==r.pathname||l!=null&&l.endsWith("*")&&a.params["*"]!==r.params["*"]}function Tm(a,r){if(a.route.shouldRevalidate){let l=a.route.shouldRevalidate(r);if(typeof l=="boolean")return l}return r.defaultShouldRevalidate}function Am(a,r,l,s,u){var d;let f;if(a){let p=s[a];Ne(p,"No route found to patch children into: routeId = "+a),p.children||(p.children=[]),f=p.children}else f=l;let h=r.filter(p=>!f.some(y=>Og(p,y))),g=Gs(h,u,[a||"_","patch",String(((d=f)==null?void 0:d.length)||"0")],s);f.push(...g)}function Og(a,r){return"id"in a&&"id"in r&&a.id===r.id?!0:a.index===r.index&&a.path===r.path&&a.caseSensitive===r.caseSensitive?(!a.children||a.children.length===0)&&(!r.children||r.children.length===0)?!0:a.children.every((l,s)=>{var u;return(u=r.children)==null?void 0:u.some(d=>Og(l,d))}):!1}async function Az(a,r,l){if(!a.lazy)return;let s=await a.lazy();if(!a.lazy)return;let u=l[a.id];Ne(u,"No route found in manifest");let d={};for(let f in s){let g=u[f]!==void 0&&f!=="hasErrorBoundary";wi(!g,'Route "'+u.id+'" has a static property "'+f+'" defined but its lazy function is also returning a value for this property. '+('The lazy route property "'+f+'" will be ignored.')),!g&&!Q1.has(f)&&(d[f]=s[f])}Object.assign(u,d),Object.assign(u,yn({},r(u),{lazy:void 0}))}async function wz(a){let{matches:r}=a,l=r.filter(u=>u.shouldLoad);return(await Promise.all(l.map(u=>u.resolve()))).reduce((u,d,f)=>Object.assign(u,{[l[f].route.id]:d}),{})}async function Rz(a,r,l,s,u,d,f,h,g,p){let y=d.map(v=>v.route.lazy?Az(v.route,g,h):void 0),b=d.map((v,L)=>{let N=y[L],H=u.some(G=>G.route.id===v.route.id);return yn({},v,{shouldLoad:H,resolve:async G=>(G&&s.method==="GET"&&(v.route.lazy||v.route.loader)&&(H=!0),H?kz(r,s,v,N,G,p):Promise.resolve({type:tn.data,result:void 0}))})}),S=await a({matches:b,request:s,params:d[0].params,fetcherKey:f,context:p});try{await Promise.all(y)}catch{}return S}async function kz(a,r,l,s,u,d){let f,h,g=p=>{let y,b=new Promise((L,N)=>y=N);h=()=>y(),r.signal.addEventListener("abort",h);let S=L=>typeof p!="function"?Promise.reject(new Error("You cannot call the handler for a route which defines a boolean "+('"'+a+'" [routeId: '+l.route.id+"]"))):p({request:r,params:l.params,context:d},...L!==void 0?[L]:[]),v=(async()=>{try{return{type:"data",result:await(u?u(N=>S(N)):S())}}catch(L){return{type:"error",result:L}}})();return Promise.race([v,b])};try{let p=l.route[a];if(s)if(p){let y,[b]=await Promise.all([g(p).catch(S=>{y=S}),s]);if(y!==void 0)throw y;f=b}else if(await s,p=l.route[a],p)f=await g(p);else if(a==="action"){let y=new URL(r.url),b=y.pathname+y.search;throw at(405,{method:r.method,pathname:b,routeId:l.route.id})}else return{type:tn.data,result:void 0};else if(p)f=await g(p);else{let y=new URL(r.url),b=y.pathname+y.search;throw at(404,{pathname:b})}Ne(f.result!==void 0,"You defined "+(a==="action"?"an action":"a loader")+" for route "+('"'+l.route.id+"\" but didn't return anything from your `"+a+"` ")+"function. Please return a value or `null`.")}catch(p){return{type:tn.error,result:p}}finally{h&&r.signal.removeEventListener("abort",h)}return f}async function Iz(a){let{result:r,type:l}=a;if(Wg(r)){let b;try{let S=r.headers.get("Content-Type");S&&/\bapplication\/json\b/.test(S)?r.body==null?b=null:b=await r.json():b=await r.text()}catch(S){return{type:tn.error,error:S}}return l===tn.error?{type:tn.error,error:new Ks(r.status,r.statusText,b),statusCode:r.status,headers:r.headers}:{type:tn.data,data:b,statusCode:r.status,headers:r.headers}}if(l===tn.error){if(Cm(r)){var s,u;if(r.data instanceof Error){var d,f;return{type:tn.error,error:r.data,statusCode:(d=r.init)==null?void 0:d.status,headers:(f=r.init)!=null&&f.headers?new Headers(r.init.headers):void 0}}return{type:tn.error,error:new Ks(((s=r.init)==null?void 0:s.status)||500,void 0,r.data),statusCode:xl(r)?r.status:void 0,headers:(u=r.init)!=null&&u.headers?new Headers(r.init.headers):void 0}}return{type:tn.error,error:r,statusCode:xl(r)?r.status:void 0}}if(Oz(r)){var h,g;return{type:tn.deferred,deferredData:r,statusCode:(h=r.init)==null?void 0:h.status,headers:((g=r.init)==null?void 0:g.headers)&&new Headers(r.init.headers)}}if(Cm(r)){var p,y;return{type:tn.data,data:r.data,statusCode:(p=r.init)==null?void 0:p.status,headers:(y=r.init)!=null&&y.headers?new Headers(r.init.headers):void 0}}return{type:tn.data,data:r}}function Mz(a,r,l,s,u,d){let f=a.headers.get("Location");if(Ne(f,"Redirects returned/thrown from loaders/actions must have a Location header"),!ad.test(f)){let h=s.slice(0,s.findIndex(g=>g.route.id===l)+1);f=ju(new URL(r.url),h,u,!0,f,d),a.headers.set("Location",f)}return a}function wm(a,r,l,s){let u=["about:","blob:","chrome:","chrome-untrusted:","content:","data:","devtools:","file:","filesystem:","javascript:"];if(ad.test(a)){let d=a,f=d.startsWith("//")?new URL(r.protocol+d):new URL(d);if(u.includes(f.protocol))throw new Error("Invalid redirect location");let h=ya(f.pathname,l)!=null;if(f.origin===r.origin&&h)return f.pathname+f.search+f.hash}try{let d=s.createURL(a);if(u.includes(d.protocol))throw new Error("Invalid redirect location")}catch{}return a}function fr(a,r,l,s){let u=a.createURL(Ng(r)).toString(),d={signal:l};if(s&&Pt(s.formMethod)){let{formMethod:f,formEncType:h}=s;d.method=f.toUpperCase(),h==="application/json"?(d.headers=new Headers({"Content-Type":h}),d.body=JSON.stringify(s.json)):h==="text/plain"?d.body=s.text:h==="application/x-www-form-urlencoded"&&s.formData?d.body=Xu(s.formData):d.body=s.formData}return new Request(u,d)}function Xu(a){let r=new URLSearchParams;for(let[l,s]of a.entries())r.append(l,typeof s=="string"?s:s.name);return r}function Rm(a){let r=new FormData;for(let[l,s]of a.entries())r.append(l,s);return r}function _z(a,r,l,s,u){let d={},f=null,h,g=!1,p={},y=l&&mt(l[1])?l[1].error:void 0;return a.forEach(b=>{if(!(b.route.id in r))return;let S=b.route.id,v=r[S];if(Ne(!Ai(v),"Cannot handle redirect results in processLoaderData"),mt(v)){let L=v.error;y!==void 0&&(L=y,y=void 0),f=f||{};{let N=Ti(a,S);f[N.route.id]==null&&(f[N.route.id]=L)}d[S]=void 0,g||(g=!0,h=xl(v.error)?v.error.status:500),v.headers&&(p[S]=v.headers)}else Fa(v)?(s.set(S,v.deferredData),d[S]=v.deferredData.data,v.statusCode!=null&&v.statusCode!==200&&!g&&(h=v.statusCode),v.headers&&(p[S]=v.headers)):(d[S]=v.data,v.statusCode&&v.statusCode!==200&&!g&&(h=v.statusCode),v.headers&&(p[S]=v.headers))}),y!==void 0&&l&&(f={[l[0]]:y},d[l[0]]=void 0),{loaderData:d,errors:f,statusCode:h||200,loaderHeaders:p}}function km(a,r,l,s,u,d,f){let{loaderData:h,errors:g}=_z(r,l,s,f);return u.forEach(p=>{let{key:y,match:b,controller:S}=p,v=d[y];if(Ne(v,"Did not find corresponding fetcher result"),!(S&&S.signal.aborted))if(mt(v)){let L=Ti(a.matches,b?.route.id);g&&g[L.route.id]||(g=yn({},g,{[L.route.id]:v.error})),a.fetchers.delete(y)}else if(Ai(v))Ne(!1,"Unhandled fetcher revalidation redirect");else if(Fa(v))Ne(!1,"Unhandled fetcher deferred data");else{let L=Ka(v.data);a.fetchers.set(y,L)}}),{loaderData:h,errors:g}}function Im(a,r,l,s){let u=yn({},r);for(let d of l){let f=d.route.id;if(r.hasOwnProperty(f)?r[f]!==void 0&&(u[f]=r[f]):a[f]!==void 0&&d.route.loader&&(u[f]=a[f]),s&&s.hasOwnProperty(f))break}return u}function Mm(a){return a?mt(a[1])?{actionData:{}}:{actionData:{[a[0]]:a[1].data}}:{}}function Ti(a,r){return(r?a.slice(0,a.findIndex(s=>s.route.id===r)+1):[...a]).reverse().find(s=>s.route.hasErrorBoundary===!0)||a[0]}function _m(a){let r=a.length===1?a[0]:a.find(l=>l.index||!l.path||l.path==="/")||{id:"__shim-error-route__"};return{matches:[{params:{},pathname:"",pathnameBase:"",route:r}],route:r}}function at(a,r){let{pathname:l,routeId:s,method:u,type:d,message:f}=r===void 0?{}:r,h="Unknown Server Error",g="Unknown @remix-run/router error";return a===400?(h="Bad Request",u&&l&&s?g="You made a "+u+' request to "'+l+'" but '+('did not provide a `loader` for route "'+s+'", ')+"so there is no way to handle the request.":d==="defer-action"?g="defer() is not supported in actions":d==="invalid-body"&&(g="Unable to encode submission body")):a===403?(h="Forbidden",g='Route "'+s+'" does not match URL "'+l+'"'):a===404?(h="Not Found",g='No route matches URL "'+l+'"'):a===405&&(h="Method Not Allowed",u&&l&&s?g="You made a "+u.toUpperCase()+' request to "'+l+'" but '+('did not provide an `action` for route "'+s+'", ')+"so there is no way to handle the request.":u&&(g='Invalid request method "'+u.toUpperCase()+'"')),new Ks(a||500,h,new Error(g),!0)}function Xs(a){let r=Object.entries(a);for(let l=r.length-1;l>=0;l--){let[s,u]=r[l];if(Ai(u))return{key:s,result:u}}}function Ng(a){let r=typeof a=="string"?Ja(a):a;return Ri(yn({},r,{hash:""}))}function Cz(a,r){return a.pathname!==r.pathname||a.search!==r.search?!1:a.hash===""?r.hash!=="":a.hash===r.hash?!0:r.hash!==""}function Lz(a){return Wg(a.result)&&zz.has(a.result.status)}function Fa(a){return a.type===tn.deferred}function mt(a){return a.type===tn.error}function Ai(a){return(a&&a.type)===tn.redirect}function Cm(a){return typeof a=="object"&&a!=null&&"type"in a&&"data"in a&&"init"in a&&a.type==="DataWithResponseInit"}function Oz(a){let r=a;return r&&typeof r=="object"&&typeof r.data=="object"&&typeof r.subscribe=="function"&&typeof r.cancel=="function"&&typeof r.resolveData=="function"}function Wg(a){return a!=null&&typeof a.status=="number"&&typeof a.statusText=="string"&&typeof a.headers=="object"&&typeof a.body<"u"}function Nz(a){return bz.has(a.toLowerCase())}function Pt(a){return gz.has(a.toLowerCase())}async function Wz(a,r,l,s,u){let d=Object.entries(r);for(let f=0;f<d.length;f++){let[h,g]=d[f],p=a.find(S=>S?.route.id===h);if(!p)continue;let y=s.find(S=>S.route.id===p.route.id),b=y!=null&&!Lg(y,p)&&(u&&u[p.route.id])!==void 0;Fa(g)&&b&&await id(g,l,!1).then(S=>{S&&(r[h]=S)})}}async function Uz(a,r,l){for(let s=0;s<l.length;s++){let{key:u,routeId:d,controller:f}=l[s],h=r[u];a.find(p=>p?.route.id===d)&&Fa(h)&&(Ne(f,"Expected an AbortController for revalidating fetcher deferred result"),await id(h,f.signal,!0).then(p=>{p&&(r[u]=p)}))}}async function id(a,r,l){if(l===void 0&&(l=!1),!await a.deferredData.resolveData(r)){if(l)try{return{type:tn.data,data:a.deferredData.unwrappedData}}catch(u){return{type:tn.error,error:u}}return{type:tn.data,data:a.deferredData.data}}}function rd(a){return new URLSearchParams(a).getAll("index").some(r=>r==="")}function bl(a,r){let l=typeof r=="string"?Ja(r).search:r.search;if(a[a.length-1].route.index&&rd(l||""))return a[a.length-1];let s=Mg(a);return s[s.length-1]}function Lm(a){let{formMethod:r,formAction:l,formEncType:s,text:u,formData:d,json:f}=a;if(!(!r||!l||!s)){if(u!=null)return{formMethod:r,formAction:l,formEncType:s,formData:void 0,json:void 0,text:u};if(d!=null)return{formMethod:r,formAction:l,formEncType:s,formData:d,json:void 0,text:void 0};if(f!==void 0)return{formMethod:r,formAction:l,formEncType:s,formData:void 0,json:f,text:void 0}}}function xu(a,r){return r?{state:"loading",location:a,formMethod:r.formMethod,formAction:r.formAction,formEncType:r.formEncType,formData:r.formData,json:r.json,text:r.text}:{state:"loading",location:a,formMethod:void 0,formAction:void 0,formEncType:void 0,formData:void 0,json:void 0,text:void 0}}function Pz(a,r){return{state:"submitting",location:a,formMethod:r.formMethod,formAction:r.formAction,formEncType:r.formEncType,formData:r.formData,json:r.json,text:r.text}}function fl(a,r){return a?{state:"loading",formMethod:a.formMethod,formAction:a.formAction,formEncType:a.formEncType,formData:a.formData,json:a.json,text:a.text,data:r}:{state:"loading",formMethod:void 0,formAction:void 0,formEncType:void 0,formData:void 0,json:void 0,text:void 0,data:r}}function jz(a,r){return{state:"submitting",formMethod:a.formMethod,formAction:a.formAction,formEncType:a.formEncType,formData:a.formData,json:a.json,text:a.text,data:r?r.data:void 0}}function Ka(a){return{state:"idle",formMethod:void 0,formAction:void 0,formEncType:void 0,formData:void 0,json:void 0,text:void 0,data:a}}function Bz(a,r){try{let l=a.sessionStorage.getItem(Cg);if(l){let s=JSON.parse(l);for(let[u,d]of Object.entries(s||{}))d&&Array.isArray(d)&&r.set(u,new Set(d||[]))}}catch{}}function Xz(a,r){if(r.size>0){let l={};for(let[s,u]of r)l[s]=[...u];try{a.sessionStorage.setItem(Cg,JSON.stringify(l))}catch(s){wi(!1,"Failed to save applied view transitions in sessionStorage ("+s+").")}}}function Fs(){return Fs=Object.assign?Object.assign.bind():function(a){for(var r=1;r<arguments.length;r++){var l=arguments[r];for(var s in l)Object.prototype.hasOwnProperty.call(l,s)&&(a[s]=l[s])}return a},Fs.apply(this,arguments)}const Al=J.createContext(null),ld=J.createContext(null),$a=J.createContext(null),sd=J.createContext(null),ba=J.createContext({outlet:null,matches:[],isDataRoute:!1}),Ug=J.createContext(null);function Hz(a,r){let{relative:l}=r===void 0?{}:r;wl()||Ne(!1);let{basename:s,navigator:u}=J.useContext($a),{hash:d,pathname:f,search:h}=to(a,{relative:l}),g=f;return s!=="/"&&(g=f==="/"?s:ga([s,f])),u.createHref({pathname:g,search:h,hash:d})}function wl(){return J.useContext(sd)!=null}function Rl(){return wl()||Ne(!1),J.useContext(sd).location}function Pg(a){J.useContext($a).static||J.useLayoutEffect(a)}function Zz(){let{isDataRoute:a}=J.useContext(ba);return a?rv():Vz()}function Vz(){wl()||Ne(!1);let a=J.useContext(Al),{basename:r,future:l,navigator:s}=J.useContext($a),{matches:u}=J.useContext(ba),{pathname:d}=Rl(),f=JSON.stringify(nd(u,l.v7_relativeSplatPath)),h=J.useRef(!1);return Pg(()=>{h.current=!0}),J.useCallback(function(p,y){if(y===void 0&&(y={}),!h.current)return;if(typeof p=="number"){s.go(p);return}let b=td(p,JSON.parse(f),d,y.relative==="path");a==null&&r!=="/"&&(b.pathname=b.pathname==="/"?r:ga([r,b.pathname])),(y.replace?s.replace:s.push)(b,y.state,y)},[r,s,f,d,a])}const qz=J.createContext(null);function Yz(a){let r=J.useContext(ba).outlet;return r&&J.createElement(qz.Provider,{value:a},r)}function Gz(){let{matches:a}=J.useContext(ba),r=a[a.length-1];return r?r.params:{}}function to(a,r){let{relative:l}=r===void 0?{}:r,{future:s}=J.useContext($a),{matches:u}=J.useContext(ba),{pathname:d}=Rl(),f=JSON.stringify(nd(u,s.v7_relativeSplatPath));return J.useMemo(()=>td(a,JSON.parse(f),d,l==="path"),[a,f,d,l])}function Qz(a,r,l,s){wl()||Ne(!1);let{navigator:u}=J.useContext($a),{matches:d}=J.useContext(ba),f=d[d.length-1],h=f?f.params:{};f&&f.pathname;let g=f?f.pathnameBase:"/";f&&f.route;let p=Rl(),y;y=p;let b=y.pathname||"/",S=b;if(g!=="/"){let N=g.replace(/^\//,"").split("/");S="/"+b.replace(/^\//,"").split("/").slice(N.length).join("/")}let v=Di(a,{pathname:S});return ev(v&&v.map(N=>Object.assign({},N,{params:Object.assign({},h,N.params),pathname:ga([g,u.encodeLocation?u.encodeLocation(N.pathname).pathname:N.pathname]),pathnameBase:N.pathnameBase==="/"?g:ga([g,u.encodeLocation?u.encodeLocation(N.pathnameBase).pathname:N.pathnameBase])})),d,l,s)}function Kz(){let a=iv(),r=xl(a)?a.status+" "+a.statusText:a instanceof Error?a.message:JSON.stringify(a),l=a instanceof Error?a.stack:null,u={padding:"0.5rem",backgroundColor:"rgba(200,200,200, 0.5)"};return J.createElement(J.Fragment,null,J.createElement("h2",null,"Unexpected Application Error!"),J.createElement("h3",{style:{fontStyle:"italic"}},r),l?J.createElement("pre",{style:u},l):null,null)}const Fz=J.createElement(Kz,null);class Jz extends J.Component{constructor(r){super(r),this.state={location:r.location,revalidation:r.revalidation,error:r.error}}static getDerivedStateFromError(r){return{error:r}}static getDerivedStateFromProps(r,l){return l.location!==r.location||l.revalidation!=="idle"&&r.revalidation==="idle"?{error:r.error,location:r.location,revalidation:r.revalidation}:{error:r.error!==void 0?r.error:l.error,location:l.location,revalidation:r.revalidation||l.revalidation}}componentDidCatch(r,l){console.error("React Router caught the following error during render",r,l)}render(){return this.state.error!==void 0?J.createElement(ba.Provider,{value:this.props.routeContext},J.createElement(Ug.Provider,{value:this.state.error,children:this.props.component})):this.props.children}}function $z(a){let{routeContext:r,match:l,children:s}=a,u=J.useContext(Al);return u&&u.static&&u.staticContext&&(l.route.errorElement||l.route.ErrorBoundary)&&(u.staticContext._deepestRenderedBoundaryId=l.route.id),J.createElement(ba.Provider,{value:r},s)}function ev(a,r,l,s){var u;if(r===void 0&&(r=[]),l===void 0&&(l=null),s===void 0&&(s=null),a==null){var d;if(!l)return null;if(l.errors)a=l.matches;else if((d=s)!=null&&d.v7_partialHydration&&r.length===0&&!l.initialized&&l.matches.length>0)a=l.matches;else return null}let f=a,h=(u=l)==null?void 0:u.errors;if(h!=null){let y=f.findIndex(b=>b.route.id&&h?.[b.route.id]!==void 0);y>=0||Ne(!1),f=f.slice(0,Math.min(f.length,y+1))}let g=!1,p=-1;if(l&&s&&s.v7_partialHydration)for(let y=0;y<f.length;y++){let b=f[y];if((b.route.HydrateFallback||b.route.hydrateFallbackElement)&&(p=y),b.route.id){let{loaderData:S,errors:v}=l,L=b.route.loader&&S[b.route.id]===void 0&&(!v||v[b.route.id]===void 0);if(b.route.lazy||L){g=!0,p>=0?f=f.slice(0,p+1):f=[f[0]];break}}}return f.reduceRight((y,b,S)=>{let v,L=!1,N=null,H=null;l&&(v=h&&b.route.id?h[b.route.id]:void 0,N=b.route.errorElement||Fz,g&&(p<0&&S===0?(lv("route-fallback"),L=!0,H=null):p===S&&(L=!0,H=b.route.hydrateFallbackElement||null)));let P=r.concat(f.slice(0,S+1)),G=()=>{let q;return v?q=N:L?q=H:b.route.Component?q=J.createElement(b.route.Component,null):b.route.element?q=b.route.element:q=y,J.createElement($z,{match:b,routeContext:{outlet:y,matches:P,isDataRoute:l!=null},children:q})};return l&&(b.route.ErrorBoundary||b.route.errorElement||S===0)?J.createElement(Jz,{location:l.location,revalidation:l.revalidation,component:N,error:v,children:G(),routeContext:{outlet:null,matches:P,isDataRoute:!0}}):G()},null)}var jg=(function(a){return a.UseBlocker="useBlocker",a.UseRevalidator="useRevalidator",a.UseNavigateStable="useNavigate",a})(jg||{}),Bg=(function(a){return a.UseBlocker="useBlocker",a.UseLoaderData="useLoaderData",a.UseActionData="useActionData",a.UseRouteError="useRouteError",a.UseNavigation="useNavigation",a.UseRouteLoaderData="useRouteLoaderData",a.UseMatches="useMatches",a.UseRevalidator="useRevalidator",a.UseNavigateStable="useNavigate",a.UseRouteId="useRouteId",a})(Bg||{});function nv(a){let r=J.useContext(Al);return r||Ne(!1),r}function tv(a){let r=J.useContext(ld);return r||Ne(!1),r}function av(a){let r=J.useContext(ba);return r||Ne(!1),r}function Xg(a){let r=av(),l=r.matches[r.matches.length-1];return l.route.id||Ne(!1),l.route.id}function iv(){var a;let r=J.useContext(Ug),l=tv(),s=Xg();return r!==void 0?r:(a=l.errors)==null?void 0:a[s]}function rv(){let{router:a}=nv(jg.UseNavigateStable),r=Xg(Bg.UseNavigateStable),l=J.useRef(!1);return Pg(()=>{l.current=!0}),J.useCallback(function(u,d){d===void 0&&(d={}),l.current&&(typeof u=="number"?a.navigate(u):a.navigate(u,Fs({fromRouteId:r},d)))},[a,r])}const Om={};function lv(a,r,l){Om[a]||(Om[a]=!0)}function sv(a,r){a?.v7_startTransition,a?.v7_relativeSplatPath===void 0&&(!r||r.v7_relativeSplatPath),r&&(r.v7_fetcherPersist,r.v7_normalizeFormMethod,r.v7_partialHydration,r.v7_skipActionErrorRevalidation)}function ov(a){return Yz(a.context)}function cv(a){let{basename:r="/",children:l=null,location:s,navigationType:u=Mn.Pop,navigator:d,static:f=!1,future:h}=a;wl()&&Ne(!1);let g=r.replace(/^\/*/,"/"),p=J.useMemo(()=>({basename:g,navigator:d,static:f,future:Fs({v7_relativeSplatPath:!1},h)}),[g,h,d,f]);typeof s=="string"&&(s=Ja(s));let{pathname:y="/",search:b="",hash:S="",state:v=null,key:L="default"}=s,N=J.useMemo(()=>{let H=ya(y,g);return H==null?null:{location:{pathname:H,search:b,hash:S,state:v,key:L},navigationType:u}},[g,y,b,S,v,L,u]);return N==null?null:J.createElement($a.Provider,{value:p},J.createElement(sd.Provider,{children:l,value:N}))}new Promise(()=>{});function uv(a){let r={hasErrorBoundary:a.ErrorBoundary!=null||a.errorElement!=null};return a.Component&&Object.assign(r,{element:J.createElement(a.Component),Component:void 0}),a.HydrateFallback&&Object.assign(r,{hydrateFallbackElement:J.createElement(a.HydrateFallback),HydrateFallback:void 0}),a.ErrorBoundary&&Object.assign(r,{errorElement:J.createElement(a.ErrorBoundary),ErrorBoundary:void 0}),r}function yr(){return yr=Object.assign?Object.assign.bind():function(a){for(var r=1;r<arguments.length;r++){var l=arguments[r];for(var s in l)Object.prototype.hasOwnProperty.call(l,s)&&(a[s]=l[s])}return a},yr.apply(this,arguments)}function Hg(a,r){if(a==null)return{};var l={},s=Object.keys(a),u,d;for(d=0;d<s.length;d++)u=s[d],!(r.indexOf(u)>=0)&&(l[u]=a[u]);return l}function dv(a){return!!(a.metaKey||a.altKey||a.ctrlKey||a.shiftKey)}function fv(a,r){return a.button===0&&(!r||r==="_self")&&!dv(a)}const pv=["onClick","relative","reloadDocument","replace","state","target","to","preventScrollReset","viewTransition"],hv=["aria-current","caseSensitive","className","end","style","to","viewTransition","children"],mv="6";try{window.__reactRouterVersion=mv}catch{}function gv(a,r){return xz({basename:r?.basename,future:yr({},r?.future,{v7_prependBasename:!0}),history:q1({window:r?.window}),hydrationData:r?.hydrationData||yv(),routes:a,mapRouteProperties:uv,dataStrategy:r?.dataStrategy,patchRoutesOnNavigation:r?.patchRoutesOnNavigation,window:r?.window}).initialize()}function yv(){var a;let r=(a=window)==null?void 0:a.__staticRouterHydrationData;return r&&r.errors&&(r=yr({},r,{errors:bv(r.errors)})),r}function bv(a){if(!a)return null;let r=Object.entries(a),l={};for(let[s,u]of r)if(u&&u.__type==="RouteErrorResponse")l[s]=new Ks(u.status,u.statusText,u.data,u.internal===!0);else if(u&&u.__type==="Error"){if(u.__subType){let d=window[u.__subType];if(typeof d=="function")try{let f=new d(u.message);f.stack="",l[s]=f}catch{}}if(l[s]==null){let d=new Error(u.message);d.stack="",l[s]=d}}else l[s]=u;return l}const Zg=J.createContext({isTransitioning:!1}),zv=J.createContext(new Map),vv="startTransition",Nm=W1[vv],Sv="flushSync",Wm=V1[Sv];function Ev(a){Nm?Nm(a):a()}function pl(a){Wm?Wm(a):a()}class xv{constructor(){this.status="pending",this.promise=new Promise((r,l)=>{this.resolve=s=>{this.status==="pending"&&(this.status="resolved",r(s))},this.reject=s=>{this.status==="pending"&&(this.status="rejected",l(s))}})}}function Dv(a){let{fallbackElement:r,router:l,future:s}=a,[u,d]=J.useState(l.state),[f,h]=J.useState(),[g,p]=J.useState({isTransitioning:!1}),[y,b]=J.useState(),[S,v]=J.useState(),[L,N]=J.useState(),H=J.useRef(new Map),{v7_startTransition:P}=s||{},G=J.useCallback(te=>{P?Ev(te):te()},[P]),q=J.useCallback((te,he)=>{let{deletedFetchers:ue,flushSync:ie,viewTransitionOpts:ne}=he;te.fetchers.forEach((fe,$)=>{fe.data!==void 0&&H.current.set($,fe.data)}),ue.forEach(fe=>H.current.delete(fe));let Ae=l.window==null||l.window.document==null||typeof l.window.document.startViewTransition!="function";if(!ne||Ae){ie?pl(()=>d(te)):G(()=>d(te));return}if(ie){pl(()=>{S&&(y&&y.resolve(),S.skipTransition()),p({isTransitioning:!0,flushSync:!0,currentLocation:ne.currentLocation,nextLocation:ne.nextLocation})});let fe=l.window.document.startViewTransition(()=>{pl(()=>d(te))});fe.finished.finally(()=>{pl(()=>{b(void 0),v(void 0),h(void 0),p({isTransitioning:!1})})}),pl(()=>v(fe));return}S?(y&&y.resolve(),S.skipTransition(),N({state:te,currentLocation:ne.currentLocation,nextLocation:ne.nextLocation})):(h(te),p({isTransitioning:!0,flushSync:!1,currentLocation:ne.currentLocation,nextLocation:ne.nextLocation}))},[l.window,S,y,H,G]);J.useLayoutEffect(()=>l.subscribe(q),[l,q]),J.useEffect(()=>{g.isTransitioning&&!g.flushSync&&b(new xv)},[g]),J.useEffect(()=>{if(y&&f&&l.window){let te=f,he=y.promise,ue=l.window.document.startViewTransition(async()=>{G(()=>d(te)),await he});ue.finished.finally(()=>{b(void 0),v(void 0),h(void 0),p({isTransitioning:!1})}),v(ue)}},[G,f,y,l.window]),J.useEffect(()=>{y&&f&&u.location.key===f.location.key&&y.resolve()},[y,S,u.location,f]),J.useEffect(()=>{!g.isTransitioning&&L&&(h(L.state),p({isTransitioning:!0,flushSync:!1,currentLocation:L.currentLocation,nextLocation:L.nextLocation}),N(void 0))},[g.isTransitioning,L]),J.useEffect(()=>{},[]);let de=J.useMemo(()=>({createHref:l.createHref,encodeLocation:l.encodeLocation,go:te=>l.navigate(te),push:(te,he,ue)=>l.navigate(te,{state:he,preventScrollReset:ue?.preventScrollReset}),replace:(te,he,ue)=>l.navigate(te,{replace:!0,state:he,preventScrollReset:ue?.preventScrollReset})}),[l]),ze=l.basename||"/",X=J.useMemo(()=>({router:l,navigator:de,static:!1,basename:ze}),[l,de,ze]),R=J.useMemo(()=>({v7_relativeSplatPath:l.future.v7_relativeSplatPath}),[l.future.v7_relativeSplatPath]);return J.useEffect(()=>sv(s,l.future),[s,l.future]),J.createElement(J.Fragment,null,J.createElement(Al.Provider,{value:X},J.createElement(ld.Provider,{value:u},J.createElement(zv.Provider,{value:H.current},J.createElement(Zg.Provider,{value:g},J.createElement(cv,{basename:ze,location:u.location,navigationType:u.historyAction,navigator:de,future:R},u.initialized||l.future.v7_partialHydration?J.createElement(Tv,{routes:l.routes,future:l.future,state:u}):r))))),null)}const Tv=J.memo(Av);function Av(a){let{routes:r,future:l,state:s}=a;return Qz(r,void 0,s,l)}const wv=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u",Rv=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,Dl=J.forwardRef(function(r,l){let{onClick:s,relative:u,reloadDocument:d,replace:f,state:h,target:g,to:p,preventScrollReset:y,viewTransition:b}=r,S=Hg(r,pv),{basename:v}=J.useContext($a),L,N=!1;if(typeof p=="string"&&Rv.test(p)&&(L=p,wv))try{let q=new URL(window.location.href),de=p.startsWith("//")?new URL(q.protocol+p):new URL(p),ze=ya(de.pathname,v);de.origin===q.origin&&ze!=null?p=ze+de.search+de.hash:N=!0}catch{}let H=Hz(p,{relative:u}),P=Iv(p,{replace:f,state:h,target:g,preventScrollReset:y,relative:u,viewTransition:b});function G(q){s&&s(q),q.defaultPrevented||P(q)}return J.createElement("a",yr({},S,{href:L||H,onClick:N||d?s:G,ref:l,target:g}))}),Du=J.forwardRef(function(r,l){let{"aria-current":s="page",caseSensitive:u=!1,className:d="",end:f=!1,style:h,to:g,viewTransition:p,children:y}=r,b=Hg(r,hv),S=to(g,{relative:b.relative}),v=Rl(),L=J.useContext(ld),{navigator:N,basename:H}=J.useContext($a),P=L!=null&&Mv(S)&&p===!0,G=N.encodeLocation?N.encodeLocation(S).pathname:S.pathname,q=v.pathname,de=L&&L.navigation&&L.navigation.location?L.navigation.location.pathname:null;u||(q=q.toLowerCase(),de=de?de.toLowerCase():null,G=G.toLowerCase()),de&&H&&(de=ya(de,H)||de);const ze=G!=="/"&&G.endsWith("/")?G.length-1:G.length;let X=q===G||!f&&q.startsWith(G)&&q.charAt(ze)==="/",R=de!=null&&(de===G||!f&&de.startsWith(G)&&de.charAt(G.length)==="/"),te={isActive:X,isPending:R,isTransitioning:P},he=X?s:void 0,ue;typeof d=="function"?ue=d(te):ue=[d,X?"active":null,R?"pending":null,P?"transitioning":null].filter(Boolean).join(" ");let ie=typeof h=="function"?h(te):h;return J.createElement(Dl,yr({},b,{"aria-current":he,className:ue,ref:l,style:ie,to:g,viewTransition:p}),typeof y=="function"?y(te):y)});var Hu;(function(a){a.UseScrollRestoration="useScrollRestoration",a.UseSubmit="useSubmit",a.UseSubmitFetcher="useSubmitFetcher",a.UseFetcher="useFetcher",a.useViewTransitionState="useViewTransitionState"})(Hu||(Hu={}));var Um;(function(a){a.UseFetcher="useFetcher",a.UseFetchers="useFetchers",a.UseScrollRestoration="useScrollRestoration"})(Um||(Um={}));function kv(a){let r=J.useContext(Al);return r||Ne(!1),r}function Iv(a,r){let{target:l,replace:s,state:u,preventScrollReset:d,relative:f,viewTransition:h}=r===void 0?{}:r,g=Zz(),p=Rl(),y=to(a,{relative:f});return J.useCallback(b=>{if(fv(b,l)){b.preventDefault();let S=s!==void 0?s:Ri(p)===Ri(y);g(a,{replace:S,state:u,preventScrollReset:d,relative:f,viewTransition:h})}},[p,g,y,s,u,l,a,d,f,h])}function Mv(a,r){r===void 0&&(r={});let l=J.useContext(Zg);l==null&&Ne(!1);let{basename:s}=kv(Hu.useViewTransitionState),u=to(a,{relative:r.relative});if(!l.isTransitioning)return!1;let d=ya(l.currentLocation.pathname,s)||l.currentLocation.pathname,f=ya(l.nextLocation.pathname,s)||l.nextLocation.pathname;return Qs(u.pathname,f)!=null||Qs(u.pathname,d)!=null}const _v=[{to:"/",label:"Home",end:!0},{to:"/api",label:"API"},{to:"/examples",label:"Examples"},{to:"/learn",label:"Learn"}];function Cv(){return Q.jsxs("div",{className:"page",children:[Q.jsx("div",{className:"page-bg","aria-hidden":"true"}),Q.jsxs("header",{className:"hero",children:[Q.jsxs("div",{className:"hero-top",children:[Q.jsxs("div",{className:"brand",children:[Q.jsx("span",{className:"brand-mark"}),Q.jsx("span",{children:"Wizzard Packages"})]}),Q.jsx("nav",{className:"nav",children:_v.map(a=>Q.jsx(Du,{to:a.to,end:a.end,className:({isActive:r})=>`nav-link${r?" nav-link--active":""}`,children:a.label},a.to))})]}),Q.jsxs("div",{className:"hero-body",children:[Q.jsxs("div",{className:"hero-copy",children:[Q.jsx("p",{className:"eyebrow",children:"Documentation Hub"}),Q.jsx("h1",{children:"Docs UI"}),Q.jsx("p",{className:"subtitle",children:"Interactive documentation experience for the @wizzard-packages/* ecosystem."}),Q.jsxs("div",{className:"hero-actions",children:[Q.jsx(Du,{to:"/api",className:"button button--primary",children:"Explore API"}),Q.jsx(Du,{to:"/examples",className:"button button--ghost",children:"View Examples"})]})]}),Q.jsxs("div",{className:"hero-panel",children:[Q.jsx("p",{className:"panel-label",children:"Now live"}),Q.jsx("h2",{children:"Typedoc + Live Recipes"}),Q.jsx("p",{className:"panel-copy",children:"Browse generated API markdown, then jump straight into example flows that match your use case."}),Q.jsxs("div",{className:"panel-meta",children:[Q.jsx("span",{children:"Design refresh"}),Q.jsx("span",{children:"Dev preview"}),Q.jsx("span",{children:"v0.1.0"})]})]})]})]}),Q.jsx("main",{className:"content",children:Q.jsx(ov,{})})]})}function Lv(){return Q.jsxs("section",{className:"section",children:[Q.jsxs("div",{className:"section-header",children:[Q.jsx("p",{className:"section-eyebrow",children:"Getting started"}),Q.jsx("h2",{children:"Everything you need to ship guided flows"}),Q.jsx("p",{className:"section-lead",children:"Build predictable multi-step journeys with adapters, persistence, and flexible navigation modes."})]}),Q.jsxs("div",{className:"card-grid",children:[Q.jsxs("article",{className:"card card--accent",children:[Q.jsx("h3",{children:"API Reference"}),Q.jsx("p",{children:"Full TypeDoc output, searchable modules, and copy-ready snippets."})]}),Q.jsxs("article",{className:"card card--cool",children:[Q.jsx("h3",{children:"Examples"}),Q.jsx("p",{children:"Guided recipes for validation, persistence, and routing flows."})]}),Q.jsxs("article",{className:"card",children:[Q.jsx("h3",{children:"Status"}),Q.jsx("p",{children:"Docs UI is live on dev preview while the redesign ships."})]})]})]})}function Ov(a,r){const l={};return(a[a.length-1]===""?[...a,""]:a).join((l.padRight?" ":"")+","+(l.padLeft===!1?"":" ")).trim()}const Nv=/^[$_\p{ID_Start}][$_\u{200C}\u{200D}\p{ID_Continue}]*$/u,Wv=/^[$_\p{ID_Start}][-$_\u{200C}\u{200D}\p{ID_Continue}]*$/u,Uv={};function Pm(a,r){return(Uv.jsx?Wv:Nv).test(a)}const Pv=/[ \t\n\f\r]/g;function jv(a){return typeof a=="object"?a.type==="text"?jm(a.value):!1:jm(a)}function jm(a){return a.replace(Pv,"")===""}class kl{constructor(r,l,s){this.normal=l,this.property=r,s&&(this.space=s)}}kl.prototype.normal={};kl.prototype.property={};kl.prototype.space=void 0;function Vg(a,r){const l={},s={};for(const u of a)Object.assign(l,u.property),Object.assign(s,u.normal);return new kl(l,s,r)}function Zu(a){return a.toLowerCase()}class rt{constructor(r,l){this.attribute=l,this.property=r}}rt.prototype.attribute="";rt.prototype.booleanish=!1;rt.prototype.boolean=!1;rt.prototype.commaOrSpaceSeparated=!1;rt.prototype.commaSeparated=!1;rt.prototype.defined=!1;rt.prototype.mustUseProperty=!1;rt.prototype.number=!1;rt.prototype.overloadedBoolean=!1;rt.prototype.property="";rt.prototype.spaceSeparated=!1;rt.prototype.space=void 0;let Bv=0;const Oe=ki(),In=ki(),Vu=ki(),ee=ki(),cn=ki(),mr=ki(),ht=ki();function ki(){return 2**++Bv}const qu=Object.freeze(Object.defineProperty({__proto__:null,boolean:Oe,booleanish:In,commaOrSpaceSeparated:ht,commaSeparated:mr,number:ee,overloadedBoolean:Vu,spaceSeparated:cn},Symbol.toStringTag,{value:"Module"})),Tu=Object.keys(qu);class od extends rt{constructor(r,l,s,u){let d=-1;if(super(r,l),Bm(this,"space",u),typeof s=="number")for(;++d<Tu.length;){const f=Tu[d];Bm(this,Tu[d],(s&qu[f])===qu[f])}}}od.prototype.defined=!0;function Bm(a,r,l){l&&(a[r]=l)}function br(a){const r={},l={};for(const[s,u]of Object.entries(a.properties)){const d=new od(s,a.transform(a.attributes||{},s),u,a.space);a.mustUseProperty&&a.mustUseProperty.includes(s)&&(d.mustUseProperty=!0),r[s]=d,l[Zu(s)]=s,l[Zu(d.attribute)]=s}return new kl(r,l,a.space)}const qg=br({properties:{ariaActiveDescendant:null,ariaAtomic:In,ariaAutoComplete:null,ariaBusy:In,ariaChecked:In,ariaColCount:ee,ariaColIndex:ee,ariaColSpan:ee,ariaControls:cn,ariaCurrent:null,ariaDescribedBy:cn,ariaDetails:null,ariaDisabled:In,ariaDropEffect:cn,ariaErrorMessage:null,ariaExpanded:In,ariaFlowTo:cn,ariaGrabbed:In,ariaHasPopup:null,ariaHidden:In,ariaInvalid:null,ariaKeyShortcuts:null,ariaLabel:null,ariaLabelledBy:cn,ariaLevel:ee,ariaLive:null,ariaModal:In,ariaMultiLine:In,ariaMultiSelectable:In,ariaOrientation:null,ariaOwns:cn,ariaPlaceholder:null,ariaPosInSet:ee,ariaPressed:In,ariaReadOnly:In,ariaRelevant:null,ariaRequired:In,ariaRoleDescription:cn,ariaRowCount:ee,ariaRowIndex:ee,ariaRowSpan:ee,ariaSelected:In,ariaSetSize:ee,ariaSort:null,ariaValueMax:ee,ariaValueMin:ee,ariaValueNow:ee,ariaValueText:null,role:null},transform(a,r){return r==="role"?r:"aria-"+r.slice(4).toLowerCase()}});function Yg(a,r){return r in a?a[r]:r}function Gg(a,r){return Yg(a,r.toLowerCase())}const Xv=br({attributes:{acceptcharset:"accept-charset",classname:"class",htmlfor:"for",httpequiv:"http-equiv"},mustUseProperty:["checked","multiple","muted","selected"],properties:{abbr:null,accept:mr,acceptCharset:cn,accessKey:cn,action:null,allow:null,allowFullScreen:Oe,allowPaymentRequest:Oe,allowUserMedia:Oe,alt:null,as:null,async:Oe,autoCapitalize:null,autoComplete:cn,autoFocus:Oe,autoPlay:Oe,blocking:cn,capture:null,charSet:null,checked:Oe,cite:null,className:cn,cols:ee,colSpan:null,content:null,contentEditable:In,controls:Oe,controlsList:cn,coords:ee|mr,crossOrigin:null,data:null,dateTime:null,decoding:null,default:Oe,defer:Oe,dir:null,dirName:null,disabled:Oe,download:Vu,draggable:In,encType:null,enterKeyHint:null,fetchPriority:null,form:null,formAction:null,formEncType:null,formMethod:null,formNoValidate:Oe,formTarget:null,headers:cn,height:ee,hidden:Vu,high:ee,href:null,hrefLang:null,htmlFor:cn,httpEquiv:cn,id:null,imageSizes:null,imageSrcSet:null,inert:Oe,inputMode:null,integrity:null,is:null,isMap:Oe,itemId:null,itemProp:cn,itemRef:cn,itemScope:Oe,itemType:cn,kind:null,label:null,lang:null,language:null,list:null,loading:null,loop:Oe,low:ee,manifest:null,max:null,maxLength:ee,media:null,method:null,min:null,minLength:ee,multiple:Oe,muted:Oe,name:null,nonce:null,noModule:Oe,noValidate:Oe,onAbort:null,onAfterPrint:null,onAuxClick:null,onBeforeMatch:null,onBeforePrint:null,onBeforeToggle:null,onBeforeUnload:null,onBlur:null,onCancel:null,onCanPlay:null,onCanPlayThrough:null,onChange:null,onClick:null,onClose:null,onContextLost:null,onContextMenu:null,onContextRestored:null,onCopy:null,onCueChange:null,onCut:null,onDblClick:null,onDrag:null,onDragEnd:null,onDragEnter:null,onDragExit:null,onDragLeave:null,onDragOver:null,onDragStart:null,onDrop:null,onDurationChange:null,onEmptied:null,onEnded:null,onError:null,onFocus:null,onFormData:null,onHashChange:null,onInput:null,onInvalid:null,onKeyDown:null,onKeyPress:null,onKeyUp:null,onLanguageChange:null,onLoad:null,onLoadedData:null,onLoadedMetadata:null,onLoadEnd:null,onLoadStart:null,onMessage:null,onMessageError:null,onMouseDown:null,onMouseEnter:null,onMouseLeave:null,onMouseMove:null,onMouseOut:null,onMouseOver:null,onMouseUp:null,onOffline:null,onOnline:null,onPageHide:null,onPageShow:null,onPaste:null,onPause:null,onPlay:null,onPlaying:null,onPopState:null,onProgress:null,onRateChange:null,onRejectionHandled:null,onReset:null,onResize:null,onScroll:null,onScrollEnd:null,onSecurityPolicyViolation:null,onSeeked:null,onSeeking:null,onSelect:null,onSlotChange:null,onStalled:null,onStorage:null,onSubmit:null,onSuspend:null,onTimeUpdate:null,onToggle:null,onUnhandledRejection:null,onUnload:null,onVolumeChange:null,onWaiting:null,onWheel:null,open:Oe,optimum:ee,pattern:null,ping:cn,placeholder:null,playsInline:Oe,popover:null,popoverTarget:null,popoverTargetAction:null,poster:null,preload:null,readOnly:Oe,referrerPolicy:null,rel:cn,required:Oe,reversed:Oe,rows:ee,rowSpan:ee,sandbox:cn,scope:null,scoped:Oe,seamless:Oe,selected:Oe,shadowRootClonable:Oe,shadowRootDelegatesFocus:Oe,shadowRootMode:null,shape:null,size:ee,sizes:null,slot:null,span:ee,spellCheck:In,src:null,srcDoc:null,srcLang:null,srcSet:null,start:ee,step:null,style:null,tabIndex:ee,target:null,title:null,translate:null,type:null,typeMustMatch:Oe,useMap:null,value:In,width:ee,wrap:null,writingSuggestions:null,align:null,aLink:null,archive:cn,axis:null,background:null,bgColor:null,border:ee,borderColor:null,bottomMargin:ee,cellPadding:null,cellSpacing:null,char:null,charOff:null,classId:null,clear:null,code:null,codeBase:null,codeType:null,color:null,compact:Oe,declare:Oe,event:null,face:null,frame:null,frameBorder:null,hSpace:ee,leftMargin:ee,link:null,longDesc:null,lowSrc:null,marginHeight:ee,marginWidth:ee,noResize:Oe,noHref:Oe,noShade:Oe,noWrap:Oe,object:null,profile:null,prompt:null,rev:null,rightMargin:ee,rules:null,scheme:null,scrolling:In,standby:null,summary:null,text:null,topMargin:ee,valueType:null,version:null,vAlign:null,vLink:null,vSpace:ee,allowTransparency:null,autoCorrect:null,autoSave:null,disablePictureInPicture:Oe,disableRemotePlayback:Oe,prefix:null,property:null,results:ee,security:null,unselectable:null},space:"html",transform:Gg}),Hv=br({attributes:{accentHeight:"accent-height",alignmentBaseline:"alignment-baseline",arabicForm:"arabic-form",baselineShift:"baseline-shift",capHeight:"cap-height",className:"class",clipPath:"clip-path",clipRule:"clip-rule",colorInterpolation:"color-interpolation",colorInterpolationFilters:"color-interpolation-filters",colorProfile:"color-profile",colorRendering:"color-rendering",crossOrigin:"crossorigin",dataType:"datatype",dominantBaseline:"dominant-baseline",enableBackground:"enable-background",fillOpacity:"fill-opacity",fillRule:"fill-rule",floodColor:"flood-color",floodOpacity:"flood-opacity",fontFamily:"font-family",fontSize:"font-size",fontSizeAdjust:"font-size-adjust",fontStretch:"font-stretch",fontStyle:"font-style",fontVariant:"font-variant",fontWeight:"font-weight",glyphName:"glyph-name",glyphOrientationHorizontal:"glyph-orientation-horizontal",glyphOrientationVertical:"glyph-orientation-vertical",hrefLang:"hreflang",horizAdvX:"horiz-adv-x",horizOriginX:"horiz-origin-x",horizOriginY:"horiz-origin-y",imageRendering:"image-rendering",letterSpacing:"letter-spacing",lightingColor:"lighting-color",markerEnd:"marker-end",markerMid:"marker-mid",markerStart:"marker-start",navDown:"nav-down",navDownLeft:"nav-down-left",navDownRight:"nav-down-right",navLeft:"nav-left",navNext:"nav-next",navPrev:"nav-prev",navRight:"nav-right",navUp:"nav-up",navUpLeft:"nav-up-left",navUpRight:"nav-up-right",onAbort:"onabort",onActivate:"onactivate",onAfterPrint:"onafterprint",onBeforePrint:"onbeforeprint",onBegin:"onbegin",onCancel:"oncancel",onCanPlay:"oncanplay",onCanPlayThrough:"oncanplaythrough",onChange:"onchange",onClick:"onclick",onClose:"onclose",onCopy:"oncopy",onCueChange:"oncuechange",onCut:"oncut",onDblClick:"ondblclick",onDrag:"ondrag",onDragEnd:"ondragend",onDragEnter:"ondragenter",onDragExit:"ondragexit",onDragLeave:"ondragleave",onDragOver:"ondragover",onDragStart:"ondragstart",onDrop:"ondrop",onDurationChange:"ondurationchange",onEmptied:"onemptied",onEnd:"onend",onEnded:"onended",onError:"onerror",onFocus:"onfocus",onFocusIn:"onfocusin",onFocusOut:"onfocusout",onHashChange:"onhashchange",onInput:"oninput",onInvalid:"oninvalid",onKeyDown:"onkeydown",onKeyPress:"onkeypress",onKeyUp:"onkeyup",onLoad:"onload",onLoadedData:"onloadeddata",onLoadedMetadata:"onloadedmetadata",onLoadStart:"onloadstart",onMessage:"onmessage",onMouseDown:"onmousedown",onMouseEnter:"onmouseenter",onMouseLeave:"onmouseleave",onMouseMove:"onmousemove",onMouseOut:"onmouseout",onMouseOver:"onmouseover",onMouseUp:"onmouseup",onMouseWheel:"onmousewheel",onOffline:"onoffline",onOnline:"ononline",onPageHide:"onpagehide",onPageShow:"onpageshow",onPaste:"onpaste",onPause:"onpause",onPlay:"onplay",onPlaying:"onplaying",onPopState:"onpopstate",onProgress:"onprogress",onRateChange:"onratechange",onRepeat:"onrepeat",onReset:"onreset",onResize:"onresize",onScroll:"onscroll",onSeeked:"onseeked",onSeeking:"onseeking",onSelect:"onselect",onShow:"onshow",onStalled:"onstalled",onStorage:"onstorage",onSubmit:"onsubmit",onSuspend:"onsuspend",onTimeUpdate:"ontimeupdate",onToggle:"ontoggle",onUnload:"onunload",onVolumeChange:"onvolumechange",onWaiting:"onwaiting",onZoom:"onzoom",overlinePosition:"overline-position",overlineThickness:"overline-thickness",paintOrder:"paint-order",panose1:"panose-1",pointerEvents:"pointer-events",referrerPolicy:"referrerpolicy",renderingIntent:"rendering-intent",shapeRendering:"shape-rendering",stopColor:"stop-color",stopOpacity:"stop-opacity",strikethroughPosition:"strikethrough-position",strikethroughThickness:"strikethrough-thickness",strokeDashArray:"stroke-dasharray",strokeDashOffset:"stroke-dashoffset",strokeLineCap:"stroke-linecap",strokeLineJoin:"stroke-linejoin",strokeMiterLimit:"stroke-miterlimit",strokeOpacity:"stroke-opacity",strokeWidth:"stroke-width",tabIndex:"tabindex",textAnchor:"text-anchor",textDecoration:"text-decoration",textRendering:"text-rendering",transformOrigin:"transform-origin",typeOf:"typeof",underlinePosition:"underline-position",underlineThickness:"underline-thickness",unicodeBidi:"unicode-bidi",unicodeRange:"unicode-range",unitsPerEm:"units-per-em",vAlphabetic:"v-alphabetic",vHanging:"v-hanging",vIdeographic:"v-ideographic",vMathematical:"v-mathematical",vectorEffect:"vector-effect",vertAdvY:"vert-adv-y",vertOriginX:"vert-origin-x",vertOriginY:"vert-origin-y",wordSpacing:"word-spacing",writingMode:"writing-mode",xHeight:"x-height",playbackOrder:"playbackorder",timelineBegin:"timelinebegin"},properties:{about:ht,accentHeight:ee,accumulate:null,additive:null,alignmentBaseline:null,alphabetic:ee,amplitude:ee,arabicForm:null,ascent:ee,attributeName:null,attributeType:null,azimuth:ee,bandwidth:null,baselineShift:null,baseFrequency:null,baseProfile:null,bbox:null,begin:null,bias:ee,by:null,calcMode:null,capHeight:ee,className:cn,clip:null,clipPath:null,clipPathUnits:null,clipRule:null,color:null,colorInterpolation:null,colorInterpolationFilters:null,colorProfile:null,colorRendering:null,content:null,contentScriptType:null,contentStyleType:null,crossOrigin:null,cursor:null,cx:null,cy:null,d:null,dataType:null,defaultAction:null,descent:ee,diffuseConstant:ee,direction:null,display:null,dur:null,divisor:ee,dominantBaseline:null,download:Oe,dx:null,dy:null,edgeMode:null,editable:null,elevation:ee,enableBackground:null,end:null,event:null,exponent:ee,externalResourcesRequired:null,fill:null,fillOpacity:ee,fillRule:null,filter:null,filterRes:null,filterUnits:null,floodColor:null,floodOpacity:null,focusable:null,focusHighlight:null,fontFamily:null,fontSize:null,fontSizeAdjust:null,fontStretch:null,fontStyle:null,fontVariant:null,fontWeight:null,format:null,fr:null,from:null,fx:null,fy:null,g1:mr,g2:mr,glyphName:mr,glyphOrientationHorizontal:null,glyphOrientationVertical:null,glyphRef:null,gradientTransform:null,gradientUnits:null,handler:null,hanging:ee,hatchContentUnits:null,hatchUnits:null,height:null,href:null,hrefLang:null,horizAdvX:ee,horizOriginX:ee,horizOriginY:ee,id:null,ideographic:ee,imageRendering:null,initialVisibility:null,in:null,in2:null,intercept:ee,k:ee,k1:ee,k2:ee,k3:ee,k4:ee,kernelMatrix:ht,kernelUnitLength:null,keyPoints:null,keySplines:null,keyTimes:null,kerning:null,lang:null,lengthAdjust:null,letterSpacing:null,lightingColor:null,limitingConeAngle:ee,local:null,markerEnd:null,markerMid:null,markerStart:null,markerHeight:null,markerUnits:null,markerWidth:null,mask:null,maskContentUnits:null,maskUnits:null,mathematical:null,max:null,media:null,mediaCharacterEncoding:null,mediaContentEncodings:null,mediaSize:ee,mediaTime:null,method:null,min:null,mode:null,name:null,navDown:null,navDownLeft:null,navDownRight:null,navLeft:null,navNext:null,navPrev:null,navRight:null,navUp:null,navUpLeft:null,navUpRight:null,numOctaves:null,observer:null,offset:null,onAbort:null,onActivate:null,onAfterPrint:null,onBeforePrint:null,onBegin:null,onCancel:null,onCanPlay:null,onCanPlayThrough:null,onChange:null,onClick:null,onClose:null,onCopy:null,onCueChange:null,onCut:null,onDblClick:null,onDrag:null,onDragEnd:null,onDragEnter:null,onDragExit:null,onDragLeave:null,onDragOver:null,onDragStart:null,onDrop:null,onDurationChange:null,onEmptied:null,onEnd:null,onEnded:null,onError:null,onFocus:null,onFocusIn:null,onFocusOut:null,onHashChange:null,onInput:null,onInvalid:null,onKeyDown:null,onKeyPress:null,onKeyUp:null,onLoad:null,onLoadedData:null,onLoadedMetadata:null,onLoadStart:null,onMessage:null,onMouseDown:null,onMouseEnter:null,onMouseLeave:null,onMouseMove:null,onMouseOut:null,onMouseOver:null,onMouseUp:null,onMouseWheel:null,onOffline:null,onOnline:null,onPageHide:null,onPageShow:null,onPaste:null,onPause:null,onPlay:null,onPlaying:null,onPopState:null,onProgress:null,onRateChange:null,onRepeat:null,onReset:null,onResize:null,onScroll:null,onSeeked:null,onSeeking:null,onSelect:null,onShow:null,onStalled:null,onStorage:null,onSubmit:null,onSuspend:null,onTimeUpdate:null,onToggle:null,onUnload:null,onVolumeChange:null,onWaiting:null,onZoom:null,opacity:null,operator:null,order:null,orient:null,orientation:null,origin:null,overflow:null,overlay:null,overlinePosition:ee,overlineThickness:ee,paintOrder:null,panose1:null,path:null,pathLength:ee,patternContentUnits:null,patternTransform:null,patternUnits:null,phase:null,ping:cn,pitch:null,playbackOrder:null,pointerEvents:null,points:null,pointsAtX:ee,pointsAtY:ee,pointsAtZ:ee,preserveAlpha:null,preserveAspectRatio:null,primitiveUnits:null,propagate:null,property:ht,r:null,radius:null,referrerPolicy:null,refX:null,refY:null,rel:ht,rev:ht,renderingIntent:null,repeatCount:null,repeatDur:null,requiredExtensions:ht,requiredFeatures:ht,requiredFonts:ht,requiredFormats:ht,resource:null,restart:null,result:null,rotate:null,rx:null,ry:null,scale:null,seed:null,shapeRendering:null,side:null,slope:null,snapshotTime:null,specularConstant:ee,specularExponent:ee,spreadMethod:null,spacing:null,startOffset:null,stdDeviation:null,stemh:null,stemv:null,stitchTiles:null,stopColor:null,stopOpacity:null,strikethroughPosition:ee,strikethroughThickness:ee,string:null,stroke:null,strokeDashArray:ht,strokeDashOffset:null,strokeLineCap:null,strokeLineJoin:null,strokeMiterLimit:ee,strokeOpacity:ee,strokeWidth:null,style:null,surfaceScale:ee,syncBehavior:null,syncBehaviorDefault:null,syncMaster:null,syncTolerance:null,syncToleranceDefault:null,systemLanguage:ht,tabIndex:ee,tableValues:null,target:null,targetX:ee,targetY:ee,textAnchor:null,textDecoration:null,textRendering:null,textLength:null,timelineBegin:null,title:null,transformBehavior:null,type:null,typeOf:ht,to:null,transform:null,transformOrigin:null,u1:null,u2:null,underlinePosition:ee,underlineThickness:ee,unicode:null,unicodeBidi:null,unicodeRange:null,unitsPerEm:ee,values:null,vAlphabetic:ee,vMathematical:ee,vectorEffect:null,vHanging:ee,vIdeographic:ee,version:null,vertAdvY:ee,vertOriginX:ee,vertOriginY:ee,viewBox:null,viewTarget:null,visibility:null,width:null,widths:null,wordSpacing:null,writingMode:null,x:null,x1:null,x2:null,xChannelSelector:null,xHeight:ee,y:null,y1:null,y2:null,yChannelSelector:null,z:null,zoomAndPan:null},space:"svg",transform:Yg}),Qg=br({properties:{xLinkActuate:null,xLinkArcRole:null,xLinkHref:null,xLinkRole:null,xLinkShow:null,xLinkTitle:null,xLinkType:null},space:"xlink",transform(a,r){return"xlink:"+r.slice(5).toLowerCase()}}),Kg=br({attributes:{xmlnsxlink:"xmlns:xlink"},properties:{xmlnsXLink:null,xmlns:null},space:"xmlns",transform:Gg}),Fg=br({properties:{xmlBase:null,xmlLang:null,xmlSpace:null},space:"xml",transform(a,r){return"xml:"+r.slice(3).toLowerCase()}}),Zv={classId:"classID",dataType:"datatype",itemId:"itemID",strokeDashArray:"strokeDasharray",strokeDashOffset:"strokeDashoffset",strokeLineCap:"strokeLinecap",strokeLineJoin:"strokeLinejoin",strokeMiterLimit:"strokeMiterlimit",typeOf:"typeof",xLinkActuate:"xlinkActuate",xLinkArcRole:"xlinkArcrole",xLinkHref:"xlinkHref",xLinkRole:"xlinkRole",xLinkShow:"xlinkShow",xLinkTitle:"xlinkTitle",xLinkType:"xlinkType",xmlnsXLink:"xmlnsXlink"},Vv=/[A-Z]/g,Xm=/-[a-z]/g,qv=/^data[-\w.:]+$/i;function Yv(a,r){const l=Zu(r);let s=r,u=rt;if(l in a.normal)return a.property[a.normal[l]];if(l.length>4&&l.slice(0,4)==="data"&&qv.test(r)){if(r.charAt(4)==="-"){const d=r.slice(5).replace(Xm,Qv);s="data"+d.charAt(0).toUpperCase()+d.slice(1)}else{const d=r.slice(4);if(!Xm.test(d)){let f=d.replace(Vv,Gv);f.charAt(0)!=="-"&&(f="-"+f),r="data"+f}}u=od}return new u(s,r)}function Gv(a){return"-"+a.toLowerCase()}function Qv(a){return a.charAt(1).toUpperCase()}const Kv=Vg([qg,Xv,Qg,Kg,Fg],"html"),cd=Vg([qg,Hv,Qg,Kg,Fg],"svg");function Fv(a){return a.join(" ").trim()}var pr={},Au,Hm;function Jv(){if(Hm)return Au;Hm=1;var a=/\/\*[^*]*\*+([^/*][^*]*\*+)*\//g,r=/\n/g,l=/^\s*/,s=/^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/,u=/^:\s*/,d=/^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/,f=/^[;\s]*/,h=/^\s+|\s+$/g,g=`
`,p="/",y="*",b="",S="comment",v="declaration";function L(H,P){if(typeof H!="string")throw new TypeError("First argument must be a string");if(!H)return[];P=P||{};var G=1,q=1;function de(fe){var $=fe.match(r);$&&(G+=$.length);var C=fe.lastIndexOf(g);q=~C?fe.length-C:q+fe.length}function ze(){var fe={line:G,column:q};return function($){return $.position=new X(fe),he(),$}}function X(fe){this.start=fe,this.end={line:G,column:q},this.source=P.source}X.prototype.content=H;function R(fe){var $=new Error(P.source+":"+G+":"+q+": "+fe);if($.reason=fe,$.filename=P.source,$.line=G,$.column=q,$.source=H,!P.silent)throw $}function te(fe){var $=fe.exec(H);if($){var C=$[0];return de(C),H=H.slice(C.length),$}}function he(){te(l)}function ue(fe){var $;for(fe=fe||[];$=ie();)$!==!1&&fe.push($);return fe}function ie(){var fe=ze();if(!(p!=H.charAt(0)||y!=H.charAt(1))){for(var $=2;b!=H.charAt($)&&(y!=H.charAt($)||p!=H.charAt($+1));)++$;if($+=2,b===H.charAt($-1))return R("End of comment missing");var C=H.slice(2,$-2);return q+=2,de(C),H=H.slice($),q+=2,fe({type:S,comment:C})}}function ne(){var fe=ze(),$=te(s);if($){if(ie(),!te(u))return R("property missing ':'");var C=te(d),F=fe({type:v,property:N($[0].replace(a,b)),value:C?N(C[0].replace(a,b)):b});return te(f),F}}function Ae(){var fe=[];ue(fe);for(var $;$=ne();)$!==!1&&(fe.push($),ue(fe));return fe}return he(),Ae()}function N(H){return H?H.replace(h,b):b}return Au=L,Au}var Zm;function $v(){if(Zm)return pr;Zm=1;var a=pr&&pr.__importDefault||function(s){return s&&s.__esModule?s:{default:s}};Object.defineProperty(pr,"__esModule",{value:!0}),pr.default=l;const r=a(Jv());function l(s,u){let d=null;if(!s||typeof s!="string")return d;const f=(0,r.default)(s),h=typeof u=="function";return f.forEach(g=>{if(g.type!=="declaration")return;const{property:p,value:y}=g;h?u(p,y,g):y&&(d=d||{},d[p]=y)}),d}return pr}var hl={},Vm;function eS(){if(Vm)return hl;Vm=1,Object.defineProperty(hl,"__esModule",{value:!0}),hl.camelCase=void 0;var a=/^--[a-zA-Z0-9_-]+$/,r=/-([a-z])/g,l=/^[^-]+$/,s=/^-(webkit|moz|ms|o|khtml)-/,u=/^-(ms)-/,d=function(p){return!p||l.test(p)||a.test(p)},f=function(p,y){return y.toUpperCase()},h=function(p,y){return"".concat(y,"-")},g=function(p,y){return y===void 0&&(y={}),d(p)?p:(p=p.toLowerCase(),y.reactCompat?p=p.replace(u,h):p=p.replace(s,h),p.replace(r,f))};return hl.camelCase=g,hl}var ml,qm;function nS(){if(qm)return ml;qm=1;var a=ml&&ml.__importDefault||function(u){return u&&u.__esModule?u:{default:u}},r=a($v()),l=eS();function s(u,d){var f={};return!u||typeof u!="string"||(0,r.default)(u,function(h,g){h&&g&&(f[(0,l.camelCase)(h,d)]=g)}),f}return s.default=s,ml=s,ml}var tS=nS();const aS=no(tS),Jg=$g("end"),ud=$g("start");function $g(a){return r;function r(l){const s=l&&l.position&&l.position[a]||{};if(typeof s.line=="number"&&s.line>0&&typeof s.column=="number"&&s.column>0)return{line:s.line,column:s.column,offset:typeof s.offset=="number"&&s.offset>-1?s.offset:void 0}}}function iS(a){const r=ud(a),l=Jg(a);if(r&&l)return{start:r,end:l}}function zl(a){return!a||typeof a!="object"?"":"position"in a||"type"in a?Ym(a.position):"start"in a||"end"in a?Ym(a):"line"in a||"column"in a?Yu(a):""}function Yu(a){return Gm(a&&a.line)+":"+Gm(a&&a.column)}function Ym(a){return Yu(a&&a.start)+"-"+Yu(a&&a.end)}function Gm(a){return a&&typeof a=="number"?a:1}class Hn extends Error{constructor(r,l,s){super(),typeof l=="string"&&(s=l,l=void 0);let u="",d={},f=!1;if(l&&("line"in l&&"column"in l?d={place:l}:"start"in l&&"end"in l?d={place:l}:"type"in l?d={ancestors:[l],place:l.position}:d={...l}),typeof r=="string"?u=r:!d.cause&&r&&(f=!0,u=r.message,d.cause=r),!d.ruleId&&!d.source&&typeof s=="string"){const g=s.indexOf(":");g===-1?d.ruleId=s:(d.source=s.slice(0,g),d.ruleId=s.slice(g+1))}if(!d.place&&d.ancestors&&d.ancestors){const g=d.ancestors[d.ancestors.length-1];g&&(d.place=g.position)}const h=d.place&&"start"in d.place?d.place.start:d.place;this.ancestors=d.ancestors||void 0,this.cause=d.cause||void 0,this.column=h?h.column:void 0,this.fatal=void 0,this.file="",this.message=u,this.line=h?h.line:void 0,this.name=zl(d.place)||"1:1",this.place=d.place||void 0,this.reason=this.message,this.ruleId=d.ruleId||void 0,this.source=d.source||void 0,this.stack=f&&d.cause&&typeof d.cause.stack=="string"?d.cause.stack:"",this.actual=void 0,this.expected=void 0,this.note=void 0,this.url=void 0}}Hn.prototype.file="";Hn.prototype.name="";Hn.prototype.reason="";Hn.prototype.message="";Hn.prototype.stack="";Hn.prototype.column=void 0;Hn.prototype.line=void 0;Hn.prototype.ancestors=void 0;Hn.prototype.cause=void 0;Hn.prototype.fatal=void 0;Hn.prototype.place=void 0;Hn.prototype.ruleId=void 0;Hn.prototype.source=void 0;const dd={}.hasOwnProperty,rS=new Map,lS=/[A-Z]/g,sS=new Set(["table","tbody","thead","tfoot","tr"]),oS=new Set(["td","th"]),ey="https://github.com/syntax-tree/hast-util-to-jsx-runtime";function cS(a,r){if(!r||r.Fragment===void 0)throw new TypeError("Expected `Fragment` in options");const l=r.filePath||void 0;let s;if(r.development){if(typeof r.jsxDEV!="function")throw new TypeError("Expected `jsxDEV` in options when `development: true`");s=yS(l,r.jsxDEV)}else{if(typeof r.jsx!="function")throw new TypeError("Expected `jsx` in production options");if(typeof r.jsxs!="function")throw new TypeError("Expected `jsxs` in production options");s=gS(l,r.jsx,r.jsxs)}const u={Fragment:r.Fragment,ancestors:[],components:r.components||{},create:s,elementAttributeNameCase:r.elementAttributeNameCase||"react",evaluater:r.createEvaluater?r.createEvaluater():void 0,filePath:l,ignoreInvalidStyle:r.ignoreInvalidStyle||!1,passKeys:r.passKeys!==!1,passNode:r.passNode||!1,schema:r.space==="svg"?cd:Kv,stylePropertyNameCase:r.stylePropertyNameCase||"dom",tableCellAlignToStyle:r.tableCellAlignToStyle!==!1},d=ny(u,a,void 0);return d&&typeof d!="string"?d:u.create(a,u.Fragment,{children:d||void 0},void 0)}function ny(a,r,l){if(r.type==="element")return uS(a,r,l);if(r.type==="mdxFlowExpression"||r.type==="mdxTextExpression")return dS(a,r);if(r.type==="mdxJsxFlowElement"||r.type==="mdxJsxTextElement")return pS(a,r,l);if(r.type==="mdxjsEsm")return fS(a,r);if(r.type==="root")return hS(a,r,l);if(r.type==="text")return mS(a,r)}function uS(a,r,l){const s=a.schema;let u=s;r.tagName.toLowerCase()==="svg"&&s.space==="html"&&(u=cd,a.schema=u),a.ancestors.push(r);const d=ay(a,r.tagName,!1),f=bS(a,r);let h=pd(a,r);return sS.has(r.tagName)&&(h=h.filter(function(g){return typeof g=="string"?!jv(g):!0})),ty(a,f,d,r),fd(f,h),a.ancestors.pop(),a.schema=s,a.create(r,d,f,l)}function dS(a,r){if(r.data&&r.data.estree&&a.evaluater){const s=r.data.estree.body[0];return s.type,a.evaluater.evaluateExpression(s.expression)}Tl(a,r.position)}function fS(a,r){if(r.data&&r.data.estree&&a.evaluater)return a.evaluater.evaluateProgram(r.data.estree);Tl(a,r.position)}function pS(a,r,l){const s=a.schema;let u=s;r.name==="svg"&&s.space==="html"&&(u=cd,a.schema=u),a.ancestors.push(r);const d=r.name===null?a.Fragment:ay(a,r.name,!0),f=zS(a,r),h=pd(a,r);return ty(a,f,d,r),fd(f,h),a.ancestors.pop(),a.schema=s,a.create(r,d,f,l)}function hS(a,r,l){const s={};return fd(s,pd(a,r)),a.create(r,a.Fragment,s,l)}function mS(a,r){return r.value}function ty(a,r,l,s){typeof l!="string"&&l!==a.Fragment&&a.passNode&&(r.node=s)}function fd(a,r){if(r.length>0){const l=r.length>1?r:r[0];l&&(a.children=l)}}function gS(a,r,l){return s;function s(u,d,f,h){const p=Array.isArray(f.children)?l:r;return h?p(d,f,h):p(d,f)}}function yS(a,r){return l;function l(s,u,d,f){const h=Array.isArray(d.children),g=ud(s);return r(u,d,f,h,{columnNumber:g?g.column-1:void 0,fileName:a,lineNumber:g?g.line:void 0},void 0)}}function bS(a,r){const l={};let s,u;for(u in r.properties)if(u!=="children"&&dd.call(r.properties,u)){const d=vS(a,u,r.properties[u]);if(d){const[f,h]=d;a.tableCellAlignToStyle&&f==="align"&&typeof h=="string"&&oS.has(r.tagName)?s=h:l[f]=h}}if(s){const d=l.style||(l.style={});d[a.stylePropertyNameCase==="css"?"text-align":"textAlign"]=s}return l}function zS(a,r){const l={};for(const s of r.attributes)if(s.type==="mdxJsxExpressionAttribute")if(s.data&&s.data.estree&&a.evaluater){const d=s.data.estree.body[0];d.type;const f=d.expression;f.type;const h=f.properties[0];h.type,Object.assign(l,a.evaluater.evaluateExpression(h.argument))}else Tl(a,r.position);else{const u=s.name;let d;if(s.value&&typeof s.value=="object")if(s.value.data&&s.value.data.estree&&a.evaluater){const h=s.value.data.estree.body[0];h.type,d=a.evaluater.evaluateExpression(h.expression)}else Tl(a,r.position);else d=s.value===null?!0:s.value;l[u]=d}return l}function pd(a,r){const l=[];let s=-1;const u=a.passKeys?new Map:rS;for(;++s<r.children.length;){const d=r.children[s];let f;if(a.passKeys){const g=d.type==="element"?d.tagName:d.type==="mdxJsxFlowElement"||d.type==="mdxJsxTextElement"?d.name:void 0;if(g){const p=u.get(g)||0;f=g+"-"+p,u.set(g,p+1)}}const h=ny(a,d,f);h!==void 0&&l.push(h)}return l}function vS(a,r,l){const s=Yv(a.schema,r);if(!(l==null||typeof l=="number"&&Number.isNaN(l))){if(Array.isArray(l)&&(l=s.commaSeparated?Ov(l):Fv(l)),s.property==="style"){let u=typeof l=="object"?l:SS(a,String(l));return a.stylePropertyNameCase==="css"&&(u=ES(u)),["style",u]}return[a.elementAttributeNameCase==="react"&&s.space?Zv[s.property]||s.property:s.attribute,l]}}function SS(a,r){try{return aS(r,{reactCompat:!0})}catch(l){if(a.ignoreInvalidStyle)return{};const s=l,u=new Hn("Cannot parse `style` attribute",{ancestors:a.ancestors,cause:s,ruleId:"style",source:"hast-util-to-jsx-runtime"});throw u.file=a.filePath||void 0,u.url=ey+"#cannot-parse-style-attribute",u}}function ay(a,r,l){let s;if(!l)s={type:"Literal",value:r};else if(r.includes(".")){const u=r.split(".");let d=-1,f;for(;++d<u.length;){const h=Pm(u[d])?{type:"Identifier",name:u[d]}:{type:"Literal",value:u[d]};f=f?{type:"MemberExpression",object:f,property:h,computed:!!(d&&h.type==="Literal"),optional:!1}:h}s=f}else s=Pm(r)&&!/^[a-z]/.test(r)?{type:"Identifier",name:r}:{type:"Literal",value:r};if(s.type==="Literal"){const u=s.value;return dd.call(a.components,u)?a.components[u]:u}if(a.evaluater)return a.evaluater.evaluateExpression(s);Tl(a)}function Tl(a,r){const l=new Hn("Cannot handle MDX estrees without `createEvaluater`",{ancestors:a.ancestors,place:r,ruleId:"mdx-estree",source:"hast-util-to-jsx-runtime"});throw l.file=a.filePath||void 0,l.url=ey+"#cannot-handle-mdx-estrees-without-createevaluater",l}function ES(a){const r={};let l;for(l in a)dd.call(a,l)&&(r[xS(l)]=a[l]);return r}function xS(a){let r=a.replace(lS,DS);return r.slice(0,3)==="ms-"&&(r="-"+r),r}function DS(a){return"-"+a.toLowerCase()}const wu={action:["form"],cite:["blockquote","del","ins","q"],data:["object"],formAction:["button","input"],href:["a","area","base","link"],icon:["menuitem"],itemId:null,manifest:["html"],ping:["a","area"],poster:["video"],src:["audio","embed","iframe","img","input","script","source","track","video"]},TS={};function AS(a,r){const l=TS,s=typeof l.includeImageAlt=="boolean"?l.includeImageAlt:!0,u=typeof l.includeHtml=="boolean"?l.includeHtml:!0;return iy(a,s,u)}function iy(a,r,l){if(wS(a)){if("value"in a)return a.type==="html"&&!l?"":a.value;if(r&&"alt"in a&&a.alt)return a.alt;if("children"in a)return Qm(a.children,r,l)}return Array.isArray(a)?Qm(a,r,l):""}function Qm(a,r,l){const s=[];let u=-1;for(;++u<a.length;)s[u]=iy(a[u],r,l);return s.join("")}function wS(a){return!!(a&&typeof a=="object")}const Km=document.createElement("i");function hd(a){const r="&"+a+";";Km.innerHTML=r;const l=Km.textContent;return l.charCodeAt(l.length-1)===59&&a!=="semi"||l===r?!1:l}function Gt(a,r,l,s){const u=a.length;let d=0,f;if(r<0?r=-r>u?0:u+r:r=r>u?u:r,l=l>0?l:0,s.length<1e4)f=Array.from(s),f.unshift(r,l),a.splice(...f);else for(l&&a.splice(r,l);d<s.length;)f=s.slice(d,d+1e4),f.unshift(r,0),a.splice(...f),d+=1e4,r+=1e4}function It(a,r){return a.length>0?(Gt(a,a.length,0,r),a):r}const Fm={}.hasOwnProperty;function RS(a){const r={};let l=-1;for(;++l<a.length;)kS(r,a[l]);return r}function kS(a,r){let l;for(l in r){const u=(Fm.call(a,l)?a[l]:void 0)||(a[l]={}),d=r[l];let f;if(d)for(f in d){Fm.call(u,f)||(u[f]=[]);const h=d[f];IS(u[f],Array.isArray(h)?h:h?[h]:[])}}}function IS(a,r){let l=-1;const s=[];for(;++l<r.length;)(r[l].add==="after"?a:s).push(r[l]);Gt(a,0,0,s)}function ry(a,r){const l=Number.parseInt(a,r);return l<9||l===11||l>13&&l<32||l>126&&l<160||l>55295&&l<57344||l>64975&&l<65008||(l&65535)===65535||(l&65535)===65534||l>1114111?"�":String.fromCodePoint(l)}function gr(a){return a.replace(/[\t\n\r ]+/g," ").replace(/^ | $/g,"").toLowerCase().toUpperCase()}const Yt=ei(/[A-Za-z]/),gt=ei(/[\dA-Za-z]/),MS=ei(/[#-'*+\--9=?A-Z^-~]/);function Gu(a){return a!==null&&(a<32||a===127)}const Qu=ei(/\d/),_S=ei(/[\dA-Fa-f]/),CS=ei(/[!-/:-@[-`{-~]/);function Re(a){return a!==null&&a<-2}function it(a){return a!==null&&(a<0||a===32)}function Qe(a){return a===-2||a===-1||a===32}const LS=ei(new RegExp("\\p{P}|\\p{S}","u")),OS=ei(/\s/);function ei(a){return r;function r(l){return l!==null&&l>-1&&a.test(String.fromCharCode(l))}}function zr(a){const r=[];let l=-1,s=0,u=0;for(;++l<a.length;){const d=a.charCodeAt(l);let f="";if(d===37&&gt(a.charCodeAt(l+1))&&gt(a.charCodeAt(l+2)))u=2;else if(d<128)/[!#$&-;=?-Z_a-z~]/.test(String.fromCharCode(d))||(f=String.fromCharCode(d));else if(d>55295&&d<57344){const h=a.charCodeAt(l+1);d<56320&&h>56319&&h<57344?(f=String.fromCharCode(d,h),u=1):f="�"}else f=String.fromCharCode(d);f&&(r.push(a.slice(s,l),encodeURIComponent(f)),s=l+u+1,f=""),u&&(l+=u,u=0)}return r.join("")+a.slice(s)}function un(a,r,l,s){const u=s?s-1:Number.POSITIVE_INFINITY;let d=0;return f;function f(g){return Qe(g)?(a.enter(l),h(g)):r(g)}function h(g){return Qe(g)&&d++<u?(a.consume(g),h):(a.exit(l),r(g))}}const NS={tokenize:WS};function WS(a){const r=a.attempt(this.parser.constructs.contentInitial,s,u);let l;return r;function s(h){if(h===null){a.consume(h);return}return a.enter("lineEnding"),a.consume(h),a.exit("lineEnding"),un(a,r,"linePrefix")}function u(h){return a.enter("paragraph"),d(h)}function d(h){const g=a.enter("chunkText",{contentType:"text",previous:l});return l&&(l.next=g),l=g,f(h)}function f(h){if(h===null){a.exit("chunkText"),a.exit("paragraph"),a.consume(h);return}return Re(h)?(a.consume(h),a.exit("chunkText"),d):(a.consume(h),f)}}const US={tokenize:PS},Jm={tokenize:jS};function PS(a){const r=this,l=[];let s=0,u,d,f;return h;function h(q){if(s<l.length){const de=l[s];return r.containerState=de[1],a.attempt(de[0].continuation,g,p)(q)}return p(q)}function g(q){if(s++,r.containerState._closeFlow){r.containerState._closeFlow=void 0,u&&G();const de=r.events.length;let ze=de,X;for(;ze--;)if(r.events[ze][0]==="exit"&&r.events[ze][1].type==="chunkFlow"){X=r.events[ze][1].end;break}P(s);let R=de;for(;R<r.events.length;)r.events[R][1].end={...X},R++;return Gt(r.events,ze+1,0,r.events.slice(de)),r.events.length=R,p(q)}return h(q)}function p(q){if(s===l.length){if(!u)return S(q);if(u.currentConstruct&&u.currentConstruct.concrete)return L(q);r.interrupt=!!(u.currentConstruct&&!u._gfmTableDynamicInterruptHack)}return r.containerState={},a.check(Jm,y,b)(q)}function y(q){return u&&G(),P(s),S(q)}function b(q){return r.parser.lazy[r.now().line]=s!==l.length,f=r.now().offset,L(q)}function S(q){return r.containerState={},a.attempt(Jm,v,L)(q)}function v(q){return s++,l.push([r.currentConstruct,r.containerState]),S(q)}function L(q){if(q===null){u&&G(),P(0),a.consume(q);return}return u=u||r.parser.flow(r.now()),a.enter("chunkFlow",{_tokenizer:u,contentType:"flow",previous:d}),N(q)}function N(q){if(q===null){H(a.exit("chunkFlow"),!0),P(0),a.consume(q);return}return Re(q)?(a.consume(q),H(a.exit("chunkFlow")),s=0,r.interrupt=void 0,h):(a.consume(q),N)}function H(q,de){const ze=r.sliceStream(q);if(de&&ze.push(null),q.previous=d,d&&(d.next=q),d=q,u.defineSkip(q.start),u.write(ze),r.parser.lazy[q.start.line]){let X=u.events.length;for(;X--;)if(u.events[X][1].start.offset<f&&(!u.events[X][1].end||u.events[X][1].end.offset>f))return;const R=r.events.length;let te=R,he,ue;for(;te--;)if(r.events[te][0]==="exit"&&r.events[te][1].type==="chunkFlow"){if(he){ue=r.events[te][1].end;break}he=!0}for(P(s),X=R;X<r.events.length;)r.events[X][1].end={...ue},X++;Gt(r.events,te+1,0,r.events.slice(R)),r.events.length=X}}function P(q){let de=l.length;for(;de-- >q;){const ze=l[de];r.containerState=ze[1],ze[0].exit.call(r,a)}l.length=q}function G(){u.write([null]),d=void 0,u=void 0,r.containerState._closeFlow=void 0}}function jS(a,r,l){return un(a,a.attempt(this.parser.constructs.document,r,l),"linePrefix",this.parser.constructs.disable.null.includes("codeIndented")?void 0:4)}function $m(a){if(a===null||it(a)||OS(a))return 1;if(LS(a))return 2}function md(a,r,l){const s=[];let u=-1;for(;++u<a.length;){const d=a[u].resolveAll;d&&!s.includes(d)&&(r=d(r,l),s.push(d))}return r}const Ku={name:"attention",resolveAll:BS,tokenize:XS};function BS(a,r){let l=-1,s,u,d,f,h,g,p,y;for(;++l<a.length;)if(a[l][0]==="enter"&&a[l][1].type==="attentionSequence"&&a[l][1]._close){for(s=l;s--;)if(a[s][0]==="exit"&&a[s][1].type==="attentionSequence"&&a[s][1]._open&&r.sliceSerialize(a[s][1]).charCodeAt(0)===r.sliceSerialize(a[l][1]).charCodeAt(0)){if((a[s][1]._close||a[l][1]._open)&&(a[l][1].end.offset-a[l][1].start.offset)%3&&!((a[s][1].end.offset-a[s][1].start.offset+a[l][1].end.offset-a[l][1].start.offset)%3))continue;g=a[s][1].end.offset-a[s][1].start.offset>1&&a[l][1].end.offset-a[l][1].start.offset>1?2:1;const b={...a[s][1].end},S={...a[l][1].start};eg(b,-g),eg(S,g),f={type:g>1?"strongSequence":"emphasisSequence",start:b,end:{...a[s][1].end}},h={type:g>1?"strongSequence":"emphasisSequence",start:{...a[l][1].start},end:S},d={type:g>1?"strongText":"emphasisText",start:{...a[s][1].end},end:{...a[l][1].start}},u={type:g>1?"strong":"emphasis",start:{...f.start},end:{...h.end}},a[s][1].end={...f.start},a[l][1].start={...h.end},p=[],a[s][1].end.offset-a[s][1].start.offset&&(p=It(p,[["enter",a[s][1],r],["exit",a[s][1],r]])),p=It(p,[["enter",u,r],["enter",f,r],["exit",f,r],["enter",d,r]]),p=It(p,md(r.parser.constructs.insideSpan.null,a.slice(s+1,l),r)),p=It(p,[["exit",d,r],["enter",h,r],["exit",h,r],["exit",u,r]]),a[l][1].end.offset-a[l][1].start.offset?(y=2,p=It(p,[["enter",a[l][1],r],["exit",a[l][1],r]])):y=0,Gt(a,s-1,l-s+3,p),l=s+p.length-y-2;break}}for(l=-1;++l<a.length;)a[l][1].type==="attentionSequence"&&(a[l][1].type="data");return a}function XS(a,r){const l=this.parser.constructs.attentionMarkers.null,s=this.previous,u=$m(s);let d;return f;function f(g){return d=g,a.enter("attentionSequence"),h(g)}function h(g){if(g===d)return a.consume(g),h;const p=a.exit("attentionSequence"),y=$m(g),b=!y||y===2&&u||l.includes(g),S=!u||u===2&&y||l.includes(s);return p._open=!!(d===42?b:b&&(u||!S)),p._close=!!(d===42?S:S&&(y||!b)),r(g)}}function eg(a,r){a.column+=r,a.offset+=r,a._bufferIndex+=r}const HS={name:"autolink",tokenize:ZS};function ZS(a,r,l){let s=0;return u;function u(v){return a.enter("autolink"),a.enter("autolinkMarker"),a.consume(v),a.exit("autolinkMarker"),a.enter("autolinkProtocol"),d}function d(v){return Yt(v)?(a.consume(v),f):v===64?l(v):p(v)}function f(v){return v===43||v===45||v===46||gt(v)?(s=1,h(v)):p(v)}function h(v){return v===58?(a.consume(v),s=0,g):(v===43||v===45||v===46||gt(v))&&s++<32?(a.consume(v),h):(s=0,p(v))}function g(v){return v===62?(a.exit("autolinkProtocol"),a.enter("autolinkMarker"),a.consume(v),a.exit("autolinkMarker"),a.exit("autolink"),r):v===null||v===32||v===60||Gu(v)?l(v):(a.consume(v),g)}function p(v){return v===64?(a.consume(v),y):MS(v)?(a.consume(v),p):l(v)}function y(v){return gt(v)?b(v):l(v)}function b(v){return v===46?(a.consume(v),s=0,y):v===62?(a.exit("autolinkProtocol").type="autolinkEmail",a.enter("autolinkMarker"),a.consume(v),a.exit("autolinkMarker"),a.exit("autolink"),r):S(v)}function S(v){if((v===45||gt(v))&&s++<63){const L=v===45?S:b;return a.consume(v),L}return l(v)}}const ao={partial:!0,tokenize:VS};function VS(a,r,l){return s;function s(d){return Qe(d)?un(a,u,"linePrefix")(d):u(d)}function u(d){return d===null||Re(d)?r(d):l(d)}}const ly={continuation:{tokenize:YS},exit:GS,name:"blockQuote",tokenize:qS};function qS(a,r,l){const s=this;return u;function u(f){if(f===62){const h=s.containerState;return h.open||(a.enter("blockQuote",{_container:!0}),h.open=!0),a.enter("blockQuotePrefix"),a.enter("blockQuoteMarker"),a.consume(f),a.exit("blockQuoteMarker"),d}return l(f)}function d(f){return Qe(f)?(a.enter("blockQuotePrefixWhitespace"),a.consume(f),a.exit("blockQuotePrefixWhitespace"),a.exit("blockQuotePrefix"),r):(a.exit("blockQuotePrefix"),r(f))}}function YS(a,r,l){const s=this;return u;function u(f){return Qe(f)?un(a,d,"linePrefix",s.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(f):d(f)}function d(f){return a.attempt(ly,r,l)(f)}}function GS(a){a.exit("blockQuote")}const sy={name:"characterEscape",tokenize:QS};function QS(a,r,l){return s;function s(d){return a.enter("characterEscape"),a.enter("escapeMarker"),a.consume(d),a.exit("escapeMarker"),u}function u(d){return CS(d)?(a.enter("characterEscapeValue"),a.consume(d),a.exit("characterEscapeValue"),a.exit("characterEscape"),r):l(d)}}const oy={name:"characterReference",tokenize:KS};function KS(a,r,l){const s=this;let u=0,d,f;return h;function h(b){return a.enter("characterReference"),a.enter("characterReferenceMarker"),a.consume(b),a.exit("characterReferenceMarker"),g}function g(b){return b===35?(a.enter("characterReferenceMarkerNumeric"),a.consume(b),a.exit("characterReferenceMarkerNumeric"),p):(a.enter("characterReferenceValue"),d=31,f=gt,y(b))}function p(b){return b===88||b===120?(a.enter("characterReferenceMarkerHexadecimal"),a.consume(b),a.exit("characterReferenceMarkerHexadecimal"),a.enter("characterReferenceValue"),d=6,f=_S,y):(a.enter("characterReferenceValue"),d=7,f=Qu,y(b))}function y(b){if(b===59&&u){const S=a.exit("characterReferenceValue");return f===gt&&!hd(s.sliceSerialize(S))?l(b):(a.enter("characterReferenceMarker"),a.consume(b),a.exit("characterReferenceMarker"),a.exit("characterReference"),r)}return f(b)&&u++<d?(a.consume(b),y):l(b)}}const ng={partial:!0,tokenize:JS},tg={concrete:!0,name:"codeFenced",tokenize:FS};function FS(a,r,l){const s=this,u={partial:!0,tokenize:ze};let d=0,f=0,h;return g;function g(X){return p(X)}function p(X){const R=s.events[s.events.length-1];return d=R&&R[1].type==="linePrefix"?R[2].sliceSerialize(R[1],!0).length:0,h=X,a.enter("codeFenced"),a.enter("codeFencedFence"),a.enter("codeFencedFenceSequence"),y(X)}function y(X){return X===h?(f++,a.consume(X),y):f<3?l(X):(a.exit("codeFencedFenceSequence"),Qe(X)?un(a,b,"whitespace")(X):b(X))}function b(X){return X===null||Re(X)?(a.exit("codeFencedFence"),s.interrupt?r(X):a.check(ng,N,de)(X)):(a.enter("codeFencedFenceInfo"),a.enter("chunkString",{contentType:"string"}),S(X))}function S(X){return X===null||Re(X)?(a.exit("chunkString"),a.exit("codeFencedFenceInfo"),b(X)):Qe(X)?(a.exit("chunkString"),a.exit("codeFencedFenceInfo"),un(a,v,"whitespace")(X)):X===96&&X===h?l(X):(a.consume(X),S)}function v(X){return X===null||Re(X)?b(X):(a.enter("codeFencedFenceMeta"),a.enter("chunkString",{contentType:"string"}),L(X))}function L(X){return X===null||Re(X)?(a.exit("chunkString"),a.exit("codeFencedFenceMeta"),b(X)):X===96&&X===h?l(X):(a.consume(X),L)}function N(X){return a.attempt(u,de,H)(X)}function H(X){return a.enter("lineEnding"),a.consume(X),a.exit("lineEnding"),P}function P(X){return d>0&&Qe(X)?un(a,G,"linePrefix",d+1)(X):G(X)}function G(X){return X===null||Re(X)?a.check(ng,N,de)(X):(a.enter("codeFlowValue"),q(X))}function q(X){return X===null||Re(X)?(a.exit("codeFlowValue"),G(X)):(a.consume(X),q)}function de(X){return a.exit("codeFenced"),r(X)}function ze(X,R,te){let he=0;return ue;function ue($){return X.enter("lineEnding"),X.consume($),X.exit("lineEnding"),ie}function ie($){return X.enter("codeFencedFence"),Qe($)?un(X,ne,"linePrefix",s.parser.constructs.disable.null.includes("codeIndented")?void 0:4)($):ne($)}function ne($){return $===h?(X.enter("codeFencedFenceSequence"),Ae($)):te($)}function Ae($){return $===h?(he++,X.consume($),Ae):he>=f?(X.exit("codeFencedFenceSequence"),Qe($)?un(X,fe,"whitespace")($):fe($)):te($)}function fe($){return $===null||Re($)?(X.exit("codeFencedFence"),R($)):te($)}}}function JS(a,r,l){const s=this;return u;function u(f){return f===null?l(f):(a.enter("lineEnding"),a.consume(f),a.exit("lineEnding"),d)}function d(f){return s.parser.lazy[s.now().line]?l(f):r(f)}}const Ru={name:"codeIndented",tokenize:e6},$S={partial:!0,tokenize:n6};function e6(a,r,l){const s=this;return u;function u(p){return a.enter("codeIndented"),un(a,d,"linePrefix",5)(p)}function d(p){const y=s.events[s.events.length-1];return y&&y[1].type==="linePrefix"&&y[2].sliceSerialize(y[1],!0).length>=4?f(p):l(p)}function f(p){return p===null?g(p):Re(p)?a.attempt($S,f,g)(p):(a.enter("codeFlowValue"),h(p))}function h(p){return p===null||Re(p)?(a.exit("codeFlowValue"),f(p)):(a.consume(p),h)}function g(p){return a.exit("codeIndented"),r(p)}}function n6(a,r,l){const s=this;return u;function u(f){return s.parser.lazy[s.now().line]?l(f):Re(f)?(a.enter("lineEnding"),a.consume(f),a.exit("lineEnding"),u):un(a,d,"linePrefix",5)(f)}function d(f){const h=s.events[s.events.length-1];return h&&h[1].type==="linePrefix"&&h[2].sliceSerialize(h[1],!0).length>=4?r(f):Re(f)?u(f):l(f)}}const t6={name:"codeText",previous:i6,resolve:a6,tokenize:r6};function a6(a){let r=a.length-4,l=3,s,u;if((a[l][1].type==="lineEnding"||a[l][1].type==="space")&&(a[r][1].type==="lineEnding"||a[r][1].type==="space")){for(s=l;++s<r;)if(a[s][1].type==="codeTextData"){a[l][1].type="codeTextPadding",a[r][1].type="codeTextPadding",l+=2,r-=2;break}}for(s=l-1,r++;++s<=r;)u===void 0?s!==r&&a[s][1].type!=="lineEnding"&&(u=s):(s===r||a[s][1].type==="lineEnding")&&(a[u][1].type="codeTextData",s!==u+2&&(a[u][1].end=a[s-1][1].end,a.splice(u+2,s-u-2),r-=s-u-2,s=u+2),u=void 0);return a}function i6(a){return a!==96||this.events[this.events.length-1][1].type==="characterEscape"}function r6(a,r,l){let s=0,u,d;return f;function f(b){return a.enter("codeText"),a.enter("codeTextSequence"),h(b)}function h(b){return b===96?(a.consume(b),s++,h):(a.exit("codeTextSequence"),g(b))}function g(b){return b===null?l(b):b===32?(a.enter("space"),a.consume(b),a.exit("space"),g):b===96?(d=a.enter("codeTextSequence"),u=0,y(b)):Re(b)?(a.enter("lineEnding"),a.consume(b),a.exit("lineEnding"),g):(a.enter("codeTextData"),p(b))}function p(b){return b===null||b===32||b===96||Re(b)?(a.exit("codeTextData"),g(b)):(a.consume(b),p)}function y(b){return b===96?(a.consume(b),u++,y):u===s?(a.exit("codeTextSequence"),a.exit("codeText"),r(b)):(d.type="codeTextData",p(b))}}class l6{constructor(r){this.left=r?[...r]:[],this.right=[]}get(r){if(r<0||r>=this.left.length+this.right.length)throw new RangeError("Cannot access index `"+r+"` in a splice buffer of size `"+(this.left.length+this.right.length)+"`");return r<this.left.length?this.left[r]:this.right[this.right.length-r+this.left.length-1]}get length(){return this.left.length+this.right.length}shift(){return this.setCursor(0),this.right.pop()}slice(r,l){const s=l??Number.POSITIVE_INFINITY;return s<this.left.length?this.left.slice(r,s):r>this.left.length?this.right.slice(this.right.length-s+this.left.length,this.right.length-r+this.left.length).reverse():this.left.slice(r).concat(this.right.slice(this.right.length-s+this.left.length).reverse())}splice(r,l,s){const u=l||0;this.setCursor(Math.trunc(r));const d=this.right.splice(this.right.length-u,Number.POSITIVE_INFINITY);return s&&gl(this.left,s),d.reverse()}pop(){return this.setCursor(Number.POSITIVE_INFINITY),this.left.pop()}push(r){this.setCursor(Number.POSITIVE_INFINITY),this.left.push(r)}pushMany(r){this.setCursor(Number.POSITIVE_INFINITY),gl(this.left,r)}unshift(r){this.setCursor(0),this.right.push(r)}unshiftMany(r){this.setCursor(0),gl(this.right,r.reverse())}setCursor(r){if(!(r===this.left.length||r>this.left.length&&this.right.length===0||r<0&&this.left.length===0))if(r<this.left.length){const l=this.left.splice(r,Number.POSITIVE_INFINITY);gl(this.right,l.reverse())}else{const l=this.right.splice(this.left.length+this.right.length-r,Number.POSITIVE_INFINITY);gl(this.left,l.reverse())}}}function gl(a,r){let l=0;if(r.length<1e4)a.push(...r);else for(;l<r.length;)a.push(...r.slice(l,l+1e4)),l+=1e4}function cy(a){const r={};let l=-1,s,u,d,f,h,g,p;const y=new l6(a);for(;++l<y.length;){for(;l in r;)l=r[l];if(s=y.get(l),l&&s[1].type==="chunkFlow"&&y.get(l-1)[1].type==="listItemPrefix"&&(g=s[1]._tokenizer.events,d=0,d<g.length&&g[d][1].type==="lineEndingBlank"&&(d+=2),d<g.length&&g[d][1].type==="content"))for(;++d<g.length&&g[d][1].type!=="content";)g[d][1].type==="chunkText"&&(g[d][1]._isInFirstContentOfListItem=!0,d++);if(s[0]==="enter")s[1].contentType&&(Object.assign(r,s6(y,l)),l=r[l],p=!0);else if(s[1]._container){for(d=l,u=void 0;d--;)if(f=y.get(d),f[1].type==="lineEnding"||f[1].type==="lineEndingBlank")f[0]==="enter"&&(u&&(y.get(u)[1].type="lineEndingBlank"),f[1].type="lineEnding",u=d);else if(!(f[1].type==="linePrefix"||f[1].type==="listItemIndent"))break;u&&(s[1].end={...y.get(u)[1].start},h=y.slice(u,l),h.unshift(s),y.splice(u,l-u+1,h))}}return Gt(a,0,Number.POSITIVE_INFINITY,y.slice(0)),!p}function s6(a,r){const l=a.get(r)[1],s=a.get(r)[2];let u=r-1;const d=[];let f=l._tokenizer;f||(f=s.parser[l.contentType](l.start),l._contentTypeTextTrailing&&(f._contentTypeTextTrailing=!0));const h=f.events,g=[],p={};let y,b,S=-1,v=l,L=0,N=0;const H=[N];for(;v;){for(;a.get(++u)[1]!==v;);d.push(u),v._tokenizer||(y=s.sliceStream(v),v.next||y.push(null),b&&f.defineSkip(v.start),v._isInFirstContentOfListItem&&(f._gfmTasklistFirstContentOfListItem=!0),f.write(y),v._isInFirstContentOfListItem&&(f._gfmTasklistFirstContentOfListItem=void 0)),b=v,v=v.next}for(v=l;++S<h.length;)h[S][0]==="exit"&&h[S-1][0]==="enter"&&h[S][1].type===h[S-1][1].type&&h[S][1].start.line!==h[S][1].end.line&&(N=S+1,H.push(N),v._tokenizer=void 0,v.previous=void 0,v=v.next);for(f.events=[],v?(v._tokenizer=void 0,v.previous=void 0):H.pop(),S=H.length;S--;){const P=h.slice(H[S],H[S+1]),G=d.pop();g.push([G,G+P.length-1]),a.splice(G,2,P)}for(g.reverse(),S=-1;++S<g.length;)p[L+g[S][0]]=L+g[S][1],L+=g[S][1]-g[S][0]-1;return p}const o6={resolve:u6,tokenize:d6},c6={partial:!0,tokenize:f6};function u6(a){return cy(a),a}function d6(a,r){let l;return s;function s(h){return a.enter("content"),l=a.enter("chunkContent",{contentType:"content"}),u(h)}function u(h){return h===null?d(h):Re(h)?a.check(c6,f,d)(h):(a.consume(h),u)}function d(h){return a.exit("chunkContent"),a.exit("content"),r(h)}function f(h){return a.consume(h),a.exit("chunkContent"),l.next=a.enter("chunkContent",{contentType:"content",previous:l}),l=l.next,u}}function f6(a,r,l){const s=this;return u;function u(f){return a.exit("chunkContent"),a.enter("lineEnding"),a.consume(f),a.exit("lineEnding"),un(a,d,"linePrefix")}function d(f){if(f===null||Re(f))return l(f);const h=s.events[s.events.length-1];return!s.parser.constructs.disable.null.includes("codeIndented")&&h&&h[1].type==="linePrefix"&&h[2].sliceSerialize(h[1],!0).length>=4?r(f):a.interrupt(s.parser.constructs.flow,l,r)(f)}}function uy(a,r,l,s,u,d,f,h,g){const p=g||Number.POSITIVE_INFINITY;let y=0;return b;function b(P){return P===60?(a.enter(s),a.enter(u),a.enter(d),a.consume(P),a.exit(d),S):P===null||P===32||P===41||Gu(P)?l(P):(a.enter(s),a.enter(f),a.enter(h),a.enter("chunkString",{contentType:"string"}),N(P))}function S(P){return P===62?(a.enter(d),a.consume(P),a.exit(d),a.exit(u),a.exit(s),r):(a.enter(h),a.enter("chunkString",{contentType:"string"}),v(P))}function v(P){return P===62?(a.exit("chunkString"),a.exit(h),S(P)):P===null||P===60||Re(P)?l(P):(a.consume(P),P===92?L:v)}function L(P){return P===60||P===62||P===92?(a.consume(P),v):v(P)}function N(P){return!y&&(P===null||P===41||it(P))?(a.exit("chunkString"),a.exit(h),a.exit(f),a.exit(s),r(P)):y<p&&P===40?(a.consume(P),y++,N):P===41?(a.consume(P),y--,N):P===null||P===32||P===40||Gu(P)?l(P):(a.consume(P),P===92?H:N)}function H(P){return P===40||P===41||P===92?(a.consume(P),N):N(P)}}function dy(a,r,l,s,u,d){const f=this;let h=0,g;return p;function p(v){return a.enter(s),a.enter(u),a.consume(v),a.exit(u),a.enter(d),y}function y(v){return h>999||v===null||v===91||v===93&&!g||v===94&&!h&&"_hiddenFootnoteSupport"in f.parser.constructs?l(v):v===93?(a.exit(d),a.enter(u),a.consume(v),a.exit(u),a.exit(s),r):Re(v)?(a.enter("lineEnding"),a.consume(v),a.exit("lineEnding"),y):(a.enter("chunkString",{contentType:"string"}),b(v))}function b(v){return v===null||v===91||v===93||Re(v)||h++>999?(a.exit("chunkString"),y(v)):(a.consume(v),g||(g=!Qe(v)),v===92?S:b)}function S(v){return v===91||v===92||v===93?(a.consume(v),h++,b):b(v)}}function fy(a,r,l,s,u,d){let f;return h;function h(S){return S===34||S===39||S===40?(a.enter(s),a.enter(u),a.consume(S),a.exit(u),f=S===40?41:S,g):l(S)}function g(S){return S===f?(a.enter(u),a.consume(S),a.exit(u),a.exit(s),r):(a.enter(d),p(S))}function p(S){return S===f?(a.exit(d),g(f)):S===null?l(S):Re(S)?(a.enter("lineEnding"),a.consume(S),a.exit("lineEnding"),un(a,p,"linePrefix")):(a.enter("chunkString",{contentType:"string"}),y(S))}function y(S){return S===f||S===null||Re(S)?(a.exit("chunkString"),p(S)):(a.consume(S),S===92?b:y)}function b(S){return S===f||S===92?(a.consume(S),y):y(S)}}function vl(a,r){let l;return s;function s(u){return Re(u)?(a.enter("lineEnding"),a.consume(u),a.exit("lineEnding"),l=!0,s):Qe(u)?un(a,s,l?"linePrefix":"lineSuffix")(u):r(u)}}const p6={name:"definition",tokenize:m6},h6={partial:!0,tokenize:g6};function m6(a,r,l){const s=this;let u;return d;function d(v){return a.enter("definition"),f(v)}function f(v){return dy.call(s,a,h,l,"definitionLabel","definitionLabelMarker","definitionLabelString")(v)}function h(v){return u=gr(s.sliceSerialize(s.events[s.events.length-1][1]).slice(1,-1)),v===58?(a.enter("definitionMarker"),a.consume(v),a.exit("definitionMarker"),g):l(v)}function g(v){return it(v)?vl(a,p)(v):p(v)}function p(v){return uy(a,y,l,"definitionDestination","definitionDestinationLiteral","definitionDestinationLiteralMarker","definitionDestinationRaw","definitionDestinationString")(v)}function y(v){return a.attempt(h6,b,b)(v)}function b(v){return Qe(v)?un(a,S,"whitespace")(v):S(v)}function S(v){return v===null||Re(v)?(a.exit("definition"),s.parser.defined.push(u),r(v)):l(v)}}function g6(a,r,l){return s;function s(h){return it(h)?vl(a,u)(h):l(h)}function u(h){return fy(a,d,l,"definitionTitle","definitionTitleMarker","definitionTitleString")(h)}function d(h){return Qe(h)?un(a,f,"whitespace")(h):f(h)}function f(h){return h===null||Re(h)?r(h):l(h)}}const y6={name:"hardBreakEscape",tokenize:b6};function b6(a,r,l){return s;function s(d){return a.enter("hardBreakEscape"),a.consume(d),u}function u(d){return Re(d)?(a.exit("hardBreakEscape"),r(d)):l(d)}}const z6={name:"headingAtx",resolve:v6,tokenize:S6};function v6(a,r){let l=a.length-2,s=3,u,d;return a[s][1].type==="whitespace"&&(s+=2),l-2>s&&a[l][1].type==="whitespace"&&(l-=2),a[l][1].type==="atxHeadingSequence"&&(s===l-1||l-4>s&&a[l-2][1].type==="whitespace")&&(l-=s+1===l?2:4),l>s&&(u={type:"atxHeadingText",start:a[s][1].start,end:a[l][1].end},d={type:"chunkText",start:a[s][1].start,end:a[l][1].end,contentType:"text"},Gt(a,s,l-s+1,[["enter",u,r],["enter",d,r],["exit",d,r],["exit",u,r]])),a}function S6(a,r,l){let s=0;return u;function u(y){return a.enter("atxHeading"),d(y)}function d(y){return a.enter("atxHeadingSequence"),f(y)}function f(y){return y===35&&s++<6?(a.consume(y),f):y===null||it(y)?(a.exit("atxHeadingSequence"),h(y)):l(y)}function h(y){return y===35?(a.enter("atxHeadingSequence"),g(y)):y===null||Re(y)?(a.exit("atxHeading"),r(y)):Qe(y)?un(a,h,"whitespace")(y):(a.enter("atxHeadingText"),p(y))}function g(y){return y===35?(a.consume(y),g):(a.exit("atxHeadingSequence"),h(y))}function p(y){return y===null||y===35||it(y)?(a.exit("atxHeadingText"),h(y)):(a.consume(y),p)}}const E6=["address","article","aside","base","basefont","blockquote","body","caption","center","col","colgroup","dd","details","dialog","dir","div","dl","dt","fieldset","figcaption","figure","footer","form","frame","frameset","h1","h2","h3","h4","h5","h6","head","header","hr","html","iframe","legend","li","link","main","menu","menuitem","nav","noframes","ol","optgroup","option","p","param","search","section","summary","table","tbody","td","tfoot","th","thead","title","tr","track","ul"],ag=["pre","script","style","textarea"],x6={concrete:!0,name:"htmlFlow",resolveTo:A6,tokenize:w6},D6={partial:!0,tokenize:k6},T6={partial:!0,tokenize:R6};function A6(a){let r=a.length;for(;r--&&!(a[r][0]==="enter"&&a[r][1].type==="htmlFlow"););return r>1&&a[r-2][1].type==="linePrefix"&&(a[r][1].start=a[r-2][1].start,a[r+1][1].start=a[r-2][1].start,a.splice(r-2,2)),a}function w6(a,r,l){const s=this;let u,d,f,h,g;return p;function p(E){return y(E)}function y(E){return a.enter("htmlFlow"),a.enter("htmlFlowData"),a.consume(E),b}function b(E){return E===33?(a.consume(E),S):E===47?(a.consume(E),d=!0,N):E===63?(a.consume(E),u=3,s.interrupt?r:x):Yt(E)?(a.consume(E),f=String.fromCharCode(E),H):l(E)}function S(E){return E===45?(a.consume(E),u=2,v):E===91?(a.consume(E),u=5,h=0,L):Yt(E)?(a.consume(E),u=4,s.interrupt?r:x):l(E)}function v(E){return E===45?(a.consume(E),s.interrupt?r:x):l(E)}function L(E){const re="CDATA[";return E===re.charCodeAt(h++)?(a.consume(E),h===re.length?s.interrupt?r:ne:L):l(E)}function N(E){return Yt(E)?(a.consume(E),f=String.fromCharCode(E),H):l(E)}function H(E){if(E===null||E===47||E===62||it(E)){const re=E===47,be=f.toLowerCase();return!re&&!d&&ag.includes(be)?(u=1,s.interrupt?r(E):ne(E)):E6.includes(f.toLowerCase())?(u=6,re?(a.consume(E),P):s.interrupt?r(E):ne(E)):(u=7,s.interrupt&&!s.parser.lazy[s.now().line]?l(E):d?G(E):q(E))}return E===45||gt(E)?(a.consume(E),f+=String.fromCharCode(E),H):l(E)}function P(E){return E===62?(a.consume(E),s.interrupt?r:ne):l(E)}function G(E){return Qe(E)?(a.consume(E),G):ue(E)}function q(E){return E===47?(a.consume(E),ue):E===58||E===95||Yt(E)?(a.consume(E),de):Qe(E)?(a.consume(E),q):ue(E)}function de(E){return E===45||E===46||E===58||E===95||gt(E)?(a.consume(E),de):ze(E)}function ze(E){return E===61?(a.consume(E),X):Qe(E)?(a.consume(E),ze):q(E)}function X(E){return E===null||E===60||E===61||E===62||E===96?l(E):E===34||E===39?(a.consume(E),g=E,R):Qe(E)?(a.consume(E),X):te(E)}function R(E){return E===g?(a.consume(E),g=null,he):E===null||Re(E)?l(E):(a.consume(E),R)}function te(E){return E===null||E===34||E===39||E===47||E===60||E===61||E===62||E===96||it(E)?ze(E):(a.consume(E),te)}function he(E){return E===47||E===62||Qe(E)?q(E):l(E)}function ue(E){return E===62?(a.consume(E),ie):l(E)}function ie(E){return E===null||Re(E)?ne(E):Qe(E)?(a.consume(E),ie):l(E)}function ne(E){return E===45&&u===2?(a.consume(E),C):E===60&&u===1?(a.consume(E),F):E===62&&u===4?(a.consume(E),T):E===63&&u===3?(a.consume(E),x):E===93&&u===5?(a.consume(E),_e):Re(E)&&(u===6||u===7)?(a.exit("htmlFlowData"),a.check(D6,j,Ae)(E)):E===null||Re(E)?(a.exit("htmlFlowData"),Ae(E)):(a.consume(E),ne)}function Ae(E){return a.check(T6,fe,j)(E)}function fe(E){return a.enter("lineEnding"),a.consume(E),a.exit("lineEnding"),$}function $(E){return E===null||Re(E)?Ae(E):(a.enter("htmlFlowData"),ne(E))}function C(E){return E===45?(a.consume(E),x):ne(E)}function F(E){return E===47?(a.consume(E),f="",le):ne(E)}function le(E){if(E===62){const re=f.toLowerCase();return ag.includes(re)?(a.consume(E),T):ne(E)}return Yt(E)&&f.length<8?(a.consume(E),f+=String.fromCharCode(E),le):ne(E)}function _e(E){return E===93?(a.consume(E),x):ne(E)}function x(E){return E===62?(a.consume(E),T):E===45&&u===2?(a.consume(E),x):ne(E)}function T(E){return E===null||Re(E)?(a.exit("htmlFlowData"),j(E)):(a.consume(E),T)}function j(E){return a.exit("htmlFlow"),r(E)}}function R6(a,r,l){const s=this;return u;function u(f){return Re(f)?(a.enter("lineEnding"),a.consume(f),a.exit("lineEnding"),d):l(f)}function d(f){return s.parser.lazy[s.now().line]?l(f):r(f)}}function k6(a,r,l){return s;function s(u){return a.enter("lineEnding"),a.consume(u),a.exit("lineEnding"),a.attempt(ao,r,l)}}const I6={name:"htmlText",tokenize:M6};function M6(a,r,l){const s=this;let u,d,f;return h;function h(x){return a.enter("htmlText"),a.enter("htmlTextData"),a.consume(x),g}function g(x){return x===33?(a.consume(x),p):x===47?(a.consume(x),ze):x===63?(a.consume(x),q):Yt(x)?(a.consume(x),te):l(x)}function p(x){return x===45?(a.consume(x),y):x===91?(a.consume(x),d=0,L):Yt(x)?(a.consume(x),G):l(x)}function y(x){return x===45?(a.consume(x),v):l(x)}function b(x){return x===null?l(x):x===45?(a.consume(x),S):Re(x)?(f=b,F(x)):(a.consume(x),b)}function S(x){return x===45?(a.consume(x),v):b(x)}function v(x){return x===62?C(x):x===45?S(x):b(x)}function L(x){const T="CDATA[";return x===T.charCodeAt(d++)?(a.consume(x),d===T.length?N:L):l(x)}function N(x){return x===null?l(x):x===93?(a.consume(x),H):Re(x)?(f=N,F(x)):(a.consume(x),N)}function H(x){return x===93?(a.consume(x),P):N(x)}function P(x){return x===62?C(x):x===93?(a.consume(x),P):N(x)}function G(x){return x===null||x===62?C(x):Re(x)?(f=G,F(x)):(a.consume(x),G)}function q(x){return x===null?l(x):x===63?(a.consume(x),de):Re(x)?(f=q,F(x)):(a.consume(x),q)}function de(x){return x===62?C(x):q(x)}function ze(x){return Yt(x)?(a.consume(x),X):l(x)}function X(x){return x===45||gt(x)?(a.consume(x),X):R(x)}function R(x){return Re(x)?(f=R,F(x)):Qe(x)?(a.consume(x),R):C(x)}function te(x){return x===45||gt(x)?(a.consume(x),te):x===47||x===62||it(x)?he(x):l(x)}function he(x){return x===47?(a.consume(x),C):x===58||x===95||Yt(x)?(a.consume(x),ue):Re(x)?(f=he,F(x)):Qe(x)?(a.consume(x),he):C(x)}function ue(x){return x===45||x===46||x===58||x===95||gt(x)?(a.consume(x),ue):ie(x)}function ie(x){return x===61?(a.consume(x),ne):Re(x)?(f=ie,F(x)):Qe(x)?(a.consume(x),ie):he(x)}function ne(x){return x===null||x===60||x===61||x===62||x===96?l(x):x===34||x===39?(a.consume(x),u=x,Ae):Re(x)?(f=ne,F(x)):Qe(x)?(a.consume(x),ne):(a.consume(x),fe)}function Ae(x){return x===u?(a.consume(x),u=void 0,$):x===null?l(x):Re(x)?(f=Ae,F(x)):(a.consume(x),Ae)}function fe(x){return x===null||x===34||x===39||x===60||x===61||x===96?l(x):x===47||x===62||it(x)?he(x):(a.consume(x),fe)}function $(x){return x===47||x===62||it(x)?he(x):l(x)}function C(x){return x===62?(a.consume(x),a.exit("htmlTextData"),a.exit("htmlText"),r):l(x)}function F(x){return a.exit("htmlTextData"),a.enter("lineEnding"),a.consume(x),a.exit("lineEnding"),le}function le(x){return Qe(x)?un(a,_e,"linePrefix",s.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(x):_e(x)}function _e(x){return a.enter("htmlTextData"),f(x)}}const gd={name:"labelEnd",resolveAll:O6,resolveTo:N6,tokenize:W6},_6={tokenize:U6},C6={tokenize:P6},L6={tokenize:j6};function O6(a){let r=-1;const l=[];for(;++r<a.length;){const s=a[r][1];if(l.push(a[r]),s.type==="labelImage"||s.type==="labelLink"||s.type==="labelEnd"){const u=s.type==="labelImage"?4:2;s.type="data",r+=u}}return a.length!==l.length&&Gt(a,0,a.length,l),a}function N6(a,r){let l=a.length,s=0,u,d,f,h;for(;l--;)if(u=a[l][1],d){if(u.type==="link"||u.type==="labelLink"&&u._inactive)break;a[l][0]==="enter"&&u.type==="labelLink"&&(u._inactive=!0)}else if(f){if(a[l][0]==="enter"&&(u.type==="labelImage"||u.type==="labelLink")&&!u._balanced&&(d=l,u.type!=="labelLink")){s=2;break}}else u.type==="labelEnd"&&(f=l);const g={type:a[d][1].type==="labelLink"?"link":"image",start:{...a[d][1].start},end:{...a[a.length-1][1].end}},p={type:"label",start:{...a[d][1].start},end:{...a[f][1].end}},y={type:"labelText",start:{...a[d+s+2][1].end},end:{...a[f-2][1].start}};return h=[["enter",g,r],["enter",p,r]],h=It(h,a.slice(d+1,d+s+3)),h=It(h,[["enter",y,r]]),h=It(h,md(r.parser.constructs.insideSpan.null,a.slice(d+s+4,f-3),r)),h=It(h,[["exit",y,r],a[f-2],a[f-1],["exit",p,r]]),h=It(h,a.slice(f+1)),h=It(h,[["exit",g,r]]),Gt(a,d,a.length,h),a}function W6(a,r,l){const s=this;let u=s.events.length,d,f;for(;u--;)if((s.events[u][1].type==="labelImage"||s.events[u][1].type==="labelLink")&&!s.events[u][1]._balanced){d=s.events[u][1];break}return h;function h(S){return d?d._inactive?b(S):(f=s.parser.defined.includes(gr(s.sliceSerialize({start:d.end,end:s.now()}))),a.enter("labelEnd"),a.enter("labelMarker"),a.consume(S),a.exit("labelMarker"),a.exit("labelEnd"),g):l(S)}function g(S){return S===40?a.attempt(_6,y,f?y:b)(S):S===91?a.attempt(C6,y,f?p:b)(S):f?y(S):b(S)}function p(S){return a.attempt(L6,y,b)(S)}function y(S){return r(S)}function b(S){return d._balanced=!0,l(S)}}function U6(a,r,l){return s;function s(b){return a.enter("resource"),a.enter("resourceMarker"),a.consume(b),a.exit("resourceMarker"),u}function u(b){return it(b)?vl(a,d)(b):d(b)}function d(b){return b===41?y(b):uy(a,f,h,"resourceDestination","resourceDestinationLiteral","resourceDestinationLiteralMarker","resourceDestinationRaw","resourceDestinationString",32)(b)}function f(b){return it(b)?vl(a,g)(b):y(b)}function h(b){return l(b)}function g(b){return b===34||b===39||b===40?fy(a,p,l,"resourceTitle","resourceTitleMarker","resourceTitleString")(b):y(b)}function p(b){return it(b)?vl(a,y)(b):y(b)}function y(b){return b===41?(a.enter("resourceMarker"),a.consume(b),a.exit("resourceMarker"),a.exit("resource"),r):l(b)}}function P6(a,r,l){const s=this;return u;function u(h){return dy.call(s,a,d,f,"reference","referenceMarker","referenceString")(h)}function d(h){return s.parser.defined.includes(gr(s.sliceSerialize(s.events[s.events.length-1][1]).slice(1,-1)))?r(h):l(h)}function f(h){return l(h)}}function j6(a,r,l){return s;function s(d){return a.enter("reference"),a.enter("referenceMarker"),a.consume(d),a.exit("referenceMarker"),u}function u(d){return d===93?(a.enter("referenceMarker"),a.consume(d),a.exit("referenceMarker"),a.exit("reference"),r):l(d)}}const B6={name:"labelStartImage",resolveAll:gd.resolveAll,tokenize:X6};function X6(a,r,l){const s=this;return u;function u(h){return a.enter("labelImage"),a.enter("labelImageMarker"),a.consume(h),a.exit("labelImageMarker"),d}function d(h){return h===91?(a.enter("labelMarker"),a.consume(h),a.exit("labelMarker"),a.exit("labelImage"),f):l(h)}function f(h){return h===94&&"_hiddenFootnoteSupport"in s.parser.constructs?l(h):r(h)}}const H6={name:"labelStartLink",resolveAll:gd.resolveAll,tokenize:Z6};function Z6(a,r,l){const s=this;return u;function u(f){return a.enter("labelLink"),a.enter("labelMarker"),a.consume(f),a.exit("labelMarker"),a.exit("labelLink"),d}function d(f){return f===94&&"_hiddenFootnoteSupport"in s.parser.constructs?l(f):r(f)}}const ku={name:"lineEnding",tokenize:V6};function V6(a,r){return l;function l(s){return a.enter("lineEnding"),a.consume(s),a.exit("lineEnding"),un(a,r,"linePrefix")}}const Ys={name:"thematicBreak",tokenize:q6};function q6(a,r,l){let s=0,u;return d;function d(p){return a.enter("thematicBreak"),f(p)}function f(p){return u=p,h(p)}function h(p){return p===u?(a.enter("thematicBreakSequence"),g(p)):s>=3&&(p===null||Re(p))?(a.exit("thematicBreak"),r(p)):l(p)}function g(p){return p===u?(a.consume(p),s++,g):(a.exit("thematicBreakSequence"),Qe(p)?un(a,h,"whitespace")(p):h(p))}}const tt={continuation:{tokenize:K6},exit:J6,name:"list",tokenize:Q6},Y6={partial:!0,tokenize:$6},G6={partial:!0,tokenize:F6};function Q6(a,r,l){const s=this,u=s.events[s.events.length-1];let d=u&&u[1].type==="linePrefix"?u[2].sliceSerialize(u[1],!0).length:0,f=0;return h;function h(v){const L=s.containerState.type||(v===42||v===43||v===45?"listUnordered":"listOrdered");if(L==="listUnordered"?!s.containerState.marker||v===s.containerState.marker:Qu(v)){if(s.containerState.type||(s.containerState.type=L,a.enter(L,{_container:!0})),L==="listUnordered")return a.enter("listItemPrefix"),v===42||v===45?a.check(Ys,l,p)(v):p(v);if(!s.interrupt||v===49)return a.enter("listItemPrefix"),a.enter("listItemValue"),g(v)}return l(v)}function g(v){return Qu(v)&&++f<10?(a.consume(v),g):(!s.interrupt||f<2)&&(s.containerState.marker?v===s.containerState.marker:v===41||v===46)?(a.exit("listItemValue"),p(v)):l(v)}function p(v){return a.enter("listItemMarker"),a.consume(v),a.exit("listItemMarker"),s.containerState.marker=s.containerState.marker||v,a.check(ao,s.interrupt?l:y,a.attempt(Y6,S,b))}function y(v){return s.containerState.initialBlankLine=!0,d++,S(v)}function b(v){return Qe(v)?(a.enter("listItemPrefixWhitespace"),a.consume(v),a.exit("listItemPrefixWhitespace"),S):l(v)}function S(v){return s.containerState.size=d+s.sliceSerialize(a.exit("listItemPrefix"),!0).length,r(v)}}function K6(a,r,l){const s=this;return s.containerState._closeFlow=void 0,a.check(ao,u,d);function u(h){return s.containerState.furtherBlankLines=s.containerState.furtherBlankLines||s.containerState.initialBlankLine,un(a,r,"listItemIndent",s.containerState.size+1)(h)}function d(h){return s.containerState.furtherBlankLines||!Qe(h)?(s.containerState.furtherBlankLines=void 0,s.containerState.initialBlankLine=void 0,f(h)):(s.containerState.furtherBlankLines=void 0,s.containerState.initialBlankLine=void 0,a.attempt(G6,r,f)(h))}function f(h){return s.containerState._closeFlow=!0,s.interrupt=void 0,un(a,a.attempt(tt,r,l),"linePrefix",s.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(h)}}function F6(a,r,l){const s=this;return un(a,u,"listItemIndent",s.containerState.size+1);function u(d){const f=s.events[s.events.length-1];return f&&f[1].type==="listItemIndent"&&f[2].sliceSerialize(f[1],!0).length===s.containerState.size?r(d):l(d)}}function J6(a){a.exit(this.containerState.type)}function $6(a,r,l){const s=this;return un(a,u,"listItemPrefixWhitespace",s.parser.constructs.disable.null.includes("codeIndented")?void 0:5);function u(d){const f=s.events[s.events.length-1];return!Qe(d)&&f&&f[1].type==="listItemPrefixWhitespace"?r(d):l(d)}}const ig={name:"setextUnderline",resolveTo:e0,tokenize:n0};function e0(a,r){let l=a.length,s,u,d;for(;l--;)if(a[l][0]==="enter"){if(a[l][1].type==="content"){s=l;break}a[l][1].type==="paragraph"&&(u=l)}else a[l][1].type==="content"&&a.splice(l,1),!d&&a[l][1].type==="definition"&&(d=l);const f={type:"setextHeading",start:{...a[s][1].start},end:{...a[a.length-1][1].end}};return a[u][1].type="setextHeadingText",d?(a.splice(u,0,["enter",f,r]),a.splice(d+1,0,["exit",a[s][1],r]),a[s][1].end={...a[d][1].end}):a[s][1]=f,a.push(["exit",f,r]),a}function n0(a,r,l){const s=this;let u;return d;function d(p){let y=s.events.length,b;for(;y--;)if(s.events[y][1].type!=="lineEnding"&&s.events[y][1].type!=="linePrefix"&&s.events[y][1].type!=="content"){b=s.events[y][1].type==="paragraph";break}return!s.parser.lazy[s.now().line]&&(s.interrupt||b)?(a.enter("setextHeadingLine"),u=p,f(p)):l(p)}function f(p){return a.enter("setextHeadingLineSequence"),h(p)}function h(p){return p===u?(a.consume(p),h):(a.exit("setextHeadingLineSequence"),Qe(p)?un(a,g,"lineSuffix")(p):g(p))}function g(p){return p===null||Re(p)?(a.exit("setextHeadingLine"),r(p)):l(p)}}const t0={tokenize:a0};function a0(a){const r=this,l=a.attempt(ao,s,a.attempt(this.parser.constructs.flowInitial,u,un(a,a.attempt(this.parser.constructs.flow,u,a.attempt(o6,u)),"linePrefix")));return l;function s(d){if(d===null){a.consume(d);return}return a.enter("lineEndingBlank"),a.consume(d),a.exit("lineEndingBlank"),r.currentConstruct=void 0,l}function u(d){if(d===null){a.consume(d);return}return a.enter("lineEnding"),a.consume(d),a.exit("lineEnding"),r.currentConstruct=void 0,l}}const i0={resolveAll:hy()},r0=py("string"),l0=py("text");function py(a){return{resolveAll:hy(a==="text"?s0:void 0),tokenize:r};function r(l){const s=this,u=this.parser.constructs[a],d=l.attempt(u,f,h);return f;function f(y){return p(y)?d(y):h(y)}function h(y){if(y===null){l.consume(y);return}return l.enter("data"),l.consume(y),g}function g(y){return p(y)?(l.exit("data"),d(y)):(l.consume(y),g)}function p(y){if(y===null)return!0;const b=u[y];let S=-1;if(b)for(;++S<b.length;){const v=b[S];if(!v.previous||v.previous.call(s,s.previous))return!0}return!1}}}function hy(a){return r;function r(l,s){let u=-1,d;for(;++u<=l.length;)d===void 0?l[u]&&l[u][1].type==="data"&&(d=u,u++):(!l[u]||l[u][1].type!=="data")&&(u!==d+2&&(l[d][1].end=l[u-1][1].end,l.splice(d+2,u-d-2),u=d+2),d=void 0);return a?a(l,s):l}}function s0(a,r){let l=0;for(;++l<=a.length;)if((l===a.length||a[l][1].type==="lineEnding")&&a[l-1][1].type==="data"){const s=a[l-1][1],u=r.sliceStream(s);let d=u.length,f=-1,h=0,g;for(;d--;){const p=u[d];if(typeof p=="string"){for(f=p.length;p.charCodeAt(f-1)===32;)h++,f--;if(f)break;f=-1}else if(p===-2)g=!0,h++;else if(p!==-1){d++;break}}if(r._contentTypeTextTrailing&&l===a.length&&(h=0),h){const p={type:l===a.length||g||h<2?"lineSuffix":"hardBreakTrailing",start:{_bufferIndex:d?f:s.start._bufferIndex+f,_index:s.start._index+d,line:s.end.line,column:s.end.column-h,offset:s.end.offset-h},end:{...s.end}};s.end={...p.start},s.start.offset===s.end.offset?Object.assign(s,p):(a.splice(l,0,["enter",p,r],["exit",p,r]),l+=2)}l++}return a}const o0={42:tt,43:tt,45:tt,48:tt,49:tt,50:tt,51:tt,52:tt,53:tt,54:tt,55:tt,56:tt,57:tt,62:ly},c0={91:p6},u0={[-2]:Ru,[-1]:Ru,32:Ru},d0={35:z6,42:Ys,45:[ig,Ys],60:x6,61:ig,95:Ys,96:tg,126:tg},f0={38:oy,92:sy},p0={[-5]:ku,[-4]:ku,[-3]:ku,33:B6,38:oy,42:Ku,60:[HS,I6],91:H6,92:[y6,sy],93:gd,95:Ku,96:t6},h0={null:[Ku,i0]},m0={null:[42,95]},g0={null:[]},y0=Object.freeze(Object.defineProperty({__proto__:null,attentionMarkers:m0,contentInitial:c0,disable:g0,document:o0,flow:d0,flowInitial:u0,insideSpan:h0,string:f0,text:p0},Symbol.toStringTag,{value:"Module"}));function b0(a,r,l){let s={_bufferIndex:-1,_index:0,line:l&&l.line||1,column:l&&l.column||1,offset:l&&l.offset||0};const u={},d=[];let f=[],h=[];const g={attempt:R(ze),check:R(X),consume:G,enter:q,exit:de,interrupt:R(X,{interrupt:!0})},p={code:null,containerState:{},defineSkip:N,events:[],now:L,parser:a,previous:null,sliceSerialize:S,sliceStream:v,write:b};let y=r.tokenize.call(p,g);return r.resolveAll&&d.push(r),p;function b(ie){return f=It(f,ie),H(),f[f.length-1]!==null?[]:(te(r,0),p.events=md(d,p.events,p),p.events)}function S(ie,ne){return v0(v(ie),ne)}function v(ie){return z0(f,ie)}function L(){const{_bufferIndex:ie,_index:ne,line:Ae,column:fe,offset:$}=s;return{_bufferIndex:ie,_index:ne,line:Ae,column:fe,offset:$}}function N(ie){u[ie.line]=ie.column,ue()}function H(){let ie;for(;s._index<f.length;){const ne=f[s._index];if(typeof ne=="string")for(ie=s._index,s._bufferIndex<0&&(s._bufferIndex=0);s._index===ie&&s._bufferIndex<ne.length;)P(ne.charCodeAt(s._bufferIndex));else P(ne)}}function P(ie){y=y(ie)}function G(ie){Re(ie)?(s.line++,s.column=1,s.offset+=ie===-3?2:1,ue()):ie!==-1&&(s.column++,s.offset++),s._bufferIndex<0?s._index++:(s._bufferIndex++,s._bufferIndex===f[s._index].length&&(s._bufferIndex=-1,s._index++)),p.previous=ie}function q(ie,ne){const Ae=ne||{};return Ae.type=ie,Ae.start=L(),p.events.push(["enter",Ae,p]),h.push(Ae),Ae}function de(ie){const ne=h.pop();return ne.end=L(),p.events.push(["exit",ne,p]),ne}function ze(ie,ne){te(ie,ne.from)}function X(ie,ne){ne.restore()}function R(ie,ne){return Ae;function Ae(fe,$,C){let F,le,_e,x;return Array.isArray(fe)?j(fe):"tokenize"in fe?j([fe]):T(fe);function T(ye){return Ie;function Ie(Je){const Ke=Je!==null&&ye[Je],qn=Je!==null&&ye.null,Mt=[...Array.isArray(Ke)?Ke:Ke?[Ke]:[],...Array.isArray(qn)?qn:qn?[qn]:[]];return j(Mt)(Je)}}function j(ye){return F=ye,le=0,ye.length===0?C:E(ye[le])}function E(ye){return Ie;function Ie(Je){return x=he(),_e=ye,ye.partial||(p.currentConstruct=ye),ye.name&&p.parser.constructs.disable.null.includes(ye.name)?be():ye.tokenize.call(ne?Object.assign(Object.create(p),ne):p,g,re,be)(Je)}}function re(ye){return ie(_e,x),$}function be(ye){return x.restore(),++le<F.length?E(F[le]):C}}}function te(ie,ne){ie.resolveAll&&!d.includes(ie)&&d.push(ie),ie.resolve&&Gt(p.events,ne,p.events.length-ne,ie.resolve(p.events.slice(ne),p)),ie.resolveTo&&(p.events=ie.resolveTo(p.events,p))}function he(){const ie=L(),ne=p.previous,Ae=p.currentConstruct,fe=p.events.length,$=Array.from(h);return{from:fe,restore:C};function C(){s=ie,p.previous=ne,p.currentConstruct=Ae,p.events.length=fe,h=$,ue()}}function ue(){s.line in u&&s.column<2&&(s.column=u[s.line],s.offset+=u[s.line]-1)}}function z0(a,r){const l=r.start._index,s=r.start._bufferIndex,u=r.end._index,d=r.end._bufferIndex;let f;if(l===u)f=[a[l].slice(s,d)];else{if(f=a.slice(l,u),s>-1){const h=f[0];typeof h=="string"?f[0]=h.slice(s):f.shift()}d>0&&f.push(a[u].slice(0,d))}return f}function v0(a,r){let l=-1;const s=[];let u;for(;++l<a.length;){const d=a[l];let f;if(typeof d=="string")f=d;else switch(d){case-5:{f="\r";break}case-4:{f=`
`;break}case-3:{f=`\r
`;break}case-2:{f=r?" ":"	";break}case-1:{if(!r&&u)continue;f=" ";break}default:f=String.fromCharCode(d)}u=d===-2,s.push(f)}return s.join("")}function S0(a){const s={constructs:RS([y0,...(a||{}).extensions||[]]),content:u(NS),defined:[],document:u(US),flow:u(t0),lazy:{},string:u(r0),text:u(l0)};return s;function u(d){return f;function f(h){return b0(s,d,h)}}}function E0(a){for(;!cy(a););return a}const rg=/[\0\t\n\r]/g;function x0(){let a=1,r="",l=!0,s;return u;function u(d,f,h){const g=[];let p,y,b,S,v;for(d=r+(typeof d=="string"?d.toString():new TextDecoder(f||void 0).decode(d)),b=0,r="",l&&(d.charCodeAt(0)===65279&&b++,l=void 0);b<d.length;){if(rg.lastIndex=b,p=rg.exec(d),S=p&&p.index!==void 0?p.index:d.length,v=d.charCodeAt(S),!p){r=d.slice(b);break}if(v===10&&b===S&&s)g.push(-3),s=void 0;else switch(s&&(g.push(-5),s=void 0),b<S&&(g.push(d.slice(b,S)),a+=S-b),v){case 0:{g.push(65533),a++;break}case 9:{for(y=Math.ceil(a/4)*4,g.push(-2);a++<y;)g.push(-1);break}case 10:{g.push(-4),a=1;break}default:s=!0,a=1}b=S+1}return h&&(s&&g.push(-5),r&&g.push(r),g.push(null)),g}}const D0=/\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;function T0(a){return a.replace(D0,A0)}function A0(a,r,l){if(r)return r;if(l.charCodeAt(0)===35){const u=l.charCodeAt(1),d=u===120||u===88;return ry(l.slice(d?2:1),d?16:10)}return hd(l)||a}const my={}.hasOwnProperty;function w0(a,r,l){return typeof r!="string"&&(l=r,r=void 0),R0(l)(E0(S0(l).document().write(x0()(a,r,!0))))}function R0(a){const r={transforms:[],canContainEols:["emphasis","fragment","heading","paragraph","strong"],enter:{autolink:d(Qt),autolinkProtocol:he,autolinkEmail:he,atxHeading:d(za),blockQuote:d(qn),characterEscape:he,characterReference:he,codeFenced:d(Mt),codeFencedFenceInfo:f,codeFencedFenceMeta:f,codeIndented:d(Mt,f),codeText:d(xn,f),codeTextData:he,data:he,codeFlowValue:he,definition:d(_t),definitionDestinationString:f,definitionLabelString:f,definitionTitleString:f,emphasis:d(yt),hardBreakEscape:d(Yn),hardBreakTrailing:d(Yn),htmlFlow:d(Ii,f),htmlFlowData:he,htmlText:d(Ii,f),htmlTextData:he,image:d(Mi),label:f,link:d(Qt),listItem:d(ni),listItemValue:S,listOrdered:d(va,b),listUnordered:d(va),paragraph:d(vr),reference:E,referenceString:f,resourceDestinationString:f,resourceTitleString:f,setextHeading:d(za),strong:d(Sr),thematicBreak:d(Kt)},exit:{atxHeading:g(),atxHeadingSequence:ze,autolink:g(),autolinkEmail:Ke,autolinkProtocol:Je,blockQuote:g(),characterEscapeValue:ue,characterReferenceMarkerHexadecimal:be,characterReferenceMarkerNumeric:be,characterReferenceValue:ye,characterReference:Ie,codeFenced:g(H),codeFencedFence:N,codeFencedFenceInfo:v,codeFencedFenceMeta:L,codeFlowValue:ue,codeIndented:g(P),codeText:g($),codeTextData:ue,data:ue,definition:g(),definitionDestinationString:de,definitionLabelString:G,definitionTitleString:q,emphasis:g(),hardBreakEscape:g(ne),hardBreakTrailing:g(ne),htmlFlow:g(Ae),htmlFlowData:ue,htmlText:g(fe),htmlTextData:ue,image:g(F),label:_e,labelText:le,lineEnding:ie,link:g(C),listItem:g(),listOrdered:g(),listUnordered:g(),paragraph:g(),referenceString:re,resourceDestinationString:x,resourceTitleString:T,resource:j,setextHeading:g(te),setextHeadingLineSequence:R,setextHeadingText:X,strong:g(),thematicBreak:g()}};gy(r,(a||{}).mdastExtensions||[]);const l={};return s;function s(Z){let ae={type:"root",children:[]};const Se={stack:[ae],tokenStack:[],config:r,enter:h,exit:p,buffer:f,resume:y,data:l},we=[];let Ve=-1;for(;++Ve<Z.length;)if(Z[Ve][1].type==="listOrdered"||Z[Ve][1].type==="listUnordered")if(Z[Ve][0]==="enter")we.push(Ve);else{const Ln=we.pop();Ve=u(Z,Ln,Ve)}for(Ve=-1;++Ve<Z.length;){const Ln=r[Z[Ve][0]];my.call(Ln,Z[Ve][1].type)&&Ln[Z[Ve][1].type].call(Object.assign({sliceSerialize:Z[Ve][2].sliceSerialize},Se),Z[Ve][1])}if(Se.tokenStack.length>0){const Ln=Se.tokenStack[Se.tokenStack.length-1];(Ln[1]||lg).call(Se,void 0,Ln[0])}for(ae.position={start:Ga(Z.length>0?Z[0][1].start:{line:1,column:1,offset:0}),end:Ga(Z.length>0?Z[Z.length-2][1].end:{line:1,column:1,offset:0})},Ve=-1;++Ve<r.transforms.length;)ae=r.transforms[Ve](ae)||ae;return ae}function u(Z,ae,Se){let we=ae-1,Ve=-1,Ln=!1,Ct,mn,zn,Nn;for(;++we<=Se;){const Fe=Z[we];switch(Fe[1].type){case"listUnordered":case"listOrdered":case"blockQuote":{Fe[0]==="enter"?Ve++:Ve--,Nn=void 0;break}case"lineEndingBlank":{Fe[0]==="enter"&&(Ct&&!Nn&&!Ve&&!zn&&(zn=we),Nn=void 0);break}case"linePrefix":case"listItemValue":case"listItemMarker":case"listItemPrefix":case"listItemPrefixWhitespace":break;default:Nn=void 0}if(!Ve&&Fe[0]==="enter"&&Fe[1].type==="listItemPrefix"||Ve===-1&&Fe[0]==="exit"&&(Fe[1].type==="listUnordered"||Fe[1].type==="listOrdered")){if(Ct){let jt=we;for(mn=void 0;jt--;){const Gn=Z[jt];if(Gn[1].type==="lineEnding"||Gn[1].type==="lineEndingBlank"){if(Gn[0]==="exit")continue;mn&&(Z[mn][1].type="lineEndingBlank",Ln=!0),Gn[1].type="lineEnding",mn=jt}else if(!(Gn[1].type==="linePrefix"||Gn[1].type==="blockQuotePrefix"||Gn[1].type==="blockQuotePrefixWhitespace"||Gn[1].type==="blockQuoteMarker"||Gn[1].type==="listItemIndent"))break}zn&&(!mn||zn<mn)&&(Ct._spread=!0),Ct.end=Object.assign({},mn?Z[mn][1].start:Fe[1].end),Z.splice(mn||we,0,["exit",Ct,Fe[2]]),we++,Se++}if(Fe[1].type==="listItemPrefix"){const jt={type:"listItem",_spread:!1,start:Object.assign({},Fe[1].start),end:void 0};Ct=jt,Z.splice(we,0,["enter",jt,Fe[2]]),we++,Se++,zn=void 0,Nn=!0}}}return Z[ae][1]._spread=Ln,Se}function d(Z,ae){return Se;function Se(we){h.call(this,Z(we),we),ae&&ae.call(this,we)}}function f(){this.stack.push({type:"fragment",children:[]})}function h(Z,ae,Se){this.stack[this.stack.length-1].children.push(Z),this.stack.push(Z),this.tokenStack.push([ae,Se||void 0]),Z.position={start:Ga(ae.start),end:void 0}}function g(Z){return ae;function ae(Se){Z&&Z.call(this,Se),p.call(this,Se)}}function p(Z,ae){const Se=this.stack.pop(),we=this.tokenStack.pop();if(we)we[0].type!==Z.type&&(ae?ae.call(this,Z,we[0]):(we[1]||lg).call(this,Z,we[0]));else throw new Error("Cannot close `"+Z.type+"` ("+zl({start:Z.start,end:Z.end})+"): it’s not open");Se.position.end=Ga(Z.end)}function y(){return AS(this.stack.pop())}function b(){this.data.expectingFirstListItemValue=!0}function S(Z){if(this.data.expectingFirstListItemValue){const ae=this.stack[this.stack.length-2];ae.start=Number.parseInt(this.sliceSerialize(Z),10),this.data.expectingFirstListItemValue=void 0}}function v(){const Z=this.resume(),ae=this.stack[this.stack.length-1];ae.lang=Z}function L(){const Z=this.resume(),ae=this.stack[this.stack.length-1];ae.meta=Z}function N(){this.data.flowCodeInside||(this.buffer(),this.data.flowCodeInside=!0)}function H(){const Z=this.resume(),ae=this.stack[this.stack.length-1];ae.value=Z.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g,""),this.data.flowCodeInside=void 0}function P(){const Z=this.resume(),ae=this.stack[this.stack.length-1];ae.value=Z.replace(/(\r?\n|\r)$/g,"")}function G(Z){const ae=this.resume(),Se=this.stack[this.stack.length-1];Se.label=ae,Se.identifier=gr(this.sliceSerialize(Z)).toLowerCase()}function q(){const Z=this.resume(),ae=this.stack[this.stack.length-1];ae.title=Z}function de(){const Z=this.resume(),ae=this.stack[this.stack.length-1];ae.url=Z}function ze(Z){const ae=this.stack[this.stack.length-1];if(!ae.depth){const Se=this.sliceSerialize(Z).length;ae.depth=Se}}function X(){this.data.setextHeadingSlurpLineEnding=!0}function R(Z){const ae=this.stack[this.stack.length-1];ae.depth=this.sliceSerialize(Z).codePointAt(0)===61?1:2}function te(){this.data.setextHeadingSlurpLineEnding=void 0}function he(Z){const Se=this.stack[this.stack.length-1].children;let we=Se[Se.length-1];(!we||we.type!=="text")&&(we=bn(),we.position={start:Ga(Z.start),end:void 0},Se.push(we)),this.stack.push(we)}function ue(Z){const ae=this.stack.pop();ae.value+=this.sliceSerialize(Z),ae.position.end=Ga(Z.end)}function ie(Z){const ae=this.stack[this.stack.length-1];if(this.data.atHardBreak){const Se=ae.children[ae.children.length-1];Se.position.end=Ga(Z.end),this.data.atHardBreak=void 0;return}!this.data.setextHeadingSlurpLineEnding&&r.canContainEols.includes(ae.type)&&(he.call(this,Z),ue.call(this,Z))}function ne(){this.data.atHardBreak=!0}function Ae(){const Z=this.resume(),ae=this.stack[this.stack.length-1];ae.value=Z}function fe(){const Z=this.resume(),ae=this.stack[this.stack.length-1];ae.value=Z}function $(){const Z=this.resume(),ae=this.stack[this.stack.length-1];ae.value=Z}function C(){const Z=this.stack[this.stack.length-1];if(this.data.inReference){const ae=this.data.referenceType||"shortcut";Z.type+="Reference",Z.referenceType=ae,delete Z.url,delete Z.title}else delete Z.identifier,delete Z.label;this.data.referenceType=void 0}function F(){const Z=this.stack[this.stack.length-1];if(this.data.inReference){const ae=this.data.referenceType||"shortcut";Z.type+="Reference",Z.referenceType=ae,delete Z.url,delete Z.title}else delete Z.identifier,delete Z.label;this.data.referenceType=void 0}function le(Z){const ae=this.sliceSerialize(Z),Se=this.stack[this.stack.length-2];Se.label=T0(ae),Se.identifier=gr(ae).toLowerCase()}function _e(){const Z=this.stack[this.stack.length-1],ae=this.resume(),Se=this.stack[this.stack.length-1];if(this.data.inReference=!0,Se.type==="link"){const we=Z.children;Se.children=we}else Se.alt=ae}function x(){const Z=this.resume(),ae=this.stack[this.stack.length-1];ae.url=Z}function T(){const Z=this.resume(),ae=this.stack[this.stack.length-1];ae.title=Z}function j(){this.data.inReference=void 0}function E(){this.data.referenceType="collapsed"}function re(Z){const ae=this.resume(),Se=this.stack[this.stack.length-1];Se.label=ae,Se.identifier=gr(this.sliceSerialize(Z)).toLowerCase(),this.data.referenceType="full"}function be(Z){this.data.characterReferenceType=Z.type}function ye(Z){const ae=this.sliceSerialize(Z),Se=this.data.characterReferenceType;let we;Se?(we=ry(ae,Se==="characterReferenceMarkerNumeric"?10:16),this.data.characterReferenceType=void 0):we=hd(ae);const Ve=this.stack[this.stack.length-1];Ve.value+=we}function Ie(Z){const ae=this.stack.pop();ae.position.end=Ga(Z.end)}function Je(Z){ue.call(this,Z);const ae=this.stack[this.stack.length-1];ae.url=this.sliceSerialize(Z)}function Ke(Z){ue.call(this,Z);const ae=this.stack[this.stack.length-1];ae.url="mailto:"+this.sliceSerialize(Z)}function qn(){return{type:"blockquote",children:[]}}function Mt(){return{type:"code",lang:null,meta:null,value:""}}function xn(){return{type:"inlineCode",value:""}}function _t(){return{type:"definition",identifier:"",label:null,title:null,url:""}}function yt(){return{type:"emphasis",children:[]}}function za(){return{type:"heading",depth:0,children:[]}}function Yn(){return{type:"break"}}function Ii(){return{type:"html",value:""}}function Mi(){return{type:"image",title:null,url:"",alt:null}}function Qt(){return{type:"link",title:null,url:"",children:[]}}function va(Z){return{type:"list",ordered:Z.type==="listOrdered",start:null,spread:Z._spread,children:[]}}function ni(Z){return{type:"listItem",spread:Z._spread,checked:null,children:[]}}function vr(){return{type:"paragraph",children:[]}}function Sr(){return{type:"strong",children:[]}}function bn(){return{type:"text",value:""}}function Kt(){return{type:"thematicBreak"}}}function Ga(a){return{line:a.line,column:a.column,offset:a.offset}}function gy(a,r){let l=-1;for(;++l<r.length;){const s=r[l];Array.isArray(s)?gy(a,s):k0(a,s)}}function k0(a,r){let l;for(l in r)if(my.call(r,l))switch(l){case"canContainEols":{const s=r[l];s&&a[l].push(...s);break}case"transforms":{const s=r[l];s&&a[l].push(...s);break}case"enter":case"exit":{const s=r[l];s&&Object.assign(a[l],s);break}}}function lg(a,r){throw a?new Error("Cannot close `"+a.type+"` ("+zl({start:a.start,end:a.end})+"): a different token (`"+r.type+"`, "+zl({start:r.start,end:r.end})+") is open"):new Error("Cannot close document, a token (`"+r.type+"`, "+zl({start:r.start,end:r.end})+") is still open")}function I0(a){const r=this;r.parser=l;function l(s){return w0(s,{...r.data("settings"),...a,extensions:r.data("micromarkExtensions")||[],mdastExtensions:r.data("fromMarkdownExtensions")||[]})}}function M0(a,r){const l={type:"element",tagName:"blockquote",properties:{},children:a.wrap(a.all(r),!0)};return a.patch(r,l),a.applyData(r,l)}function _0(a,r){const l={type:"element",tagName:"br",properties:{},children:[]};return a.patch(r,l),[a.applyData(r,l),{type:"text",value:`
`}]}function C0(a,r){const l=r.value?r.value+`
`:"",s={},u=r.lang?r.lang.split(/\s+/):[];u.length>0&&(s.className=["language-"+u[0]]);let d={type:"element",tagName:"code",properties:s,children:[{type:"text",value:l}]};return r.meta&&(d.data={meta:r.meta}),a.patch(r,d),d=a.applyData(r,d),d={type:"element",tagName:"pre",properties:{},children:[d]},a.patch(r,d),d}function L0(a,r){const l={type:"element",tagName:"del",properties:{},children:a.all(r)};return a.patch(r,l),a.applyData(r,l)}function O0(a,r){const l={type:"element",tagName:"em",properties:{},children:a.all(r)};return a.patch(r,l),a.applyData(r,l)}function N0(a,r){const l=typeof a.options.clobberPrefix=="string"?a.options.clobberPrefix:"user-content-",s=String(r.identifier).toUpperCase(),u=zr(s.toLowerCase()),d=a.footnoteOrder.indexOf(s);let f,h=a.footnoteCounts.get(s);h===void 0?(h=0,a.footnoteOrder.push(s),f=a.footnoteOrder.length):f=d+1,h+=1,a.footnoteCounts.set(s,h);const g={type:"element",tagName:"a",properties:{href:"#"+l+"fn-"+u,id:l+"fnref-"+u+(h>1?"-"+h:""),dataFootnoteRef:!0,ariaDescribedBy:["footnote-label"]},children:[{type:"text",value:String(f)}]};a.patch(r,g);const p={type:"element",tagName:"sup",properties:{},children:[g]};return a.patch(r,p),a.applyData(r,p)}function W0(a,r){const l={type:"element",tagName:"h"+r.depth,properties:{},children:a.all(r)};return a.patch(r,l),a.applyData(r,l)}function U0(a,r){if(a.options.allowDangerousHtml){const l={type:"raw",value:r.value};return a.patch(r,l),a.applyData(r,l)}}function yy(a,r){const l=r.referenceType;let s="]";if(l==="collapsed"?s+="[]":l==="full"&&(s+="["+(r.label||r.identifier)+"]"),r.type==="imageReference")return[{type:"text",value:"!["+r.alt+s}];const u=a.all(r),d=u[0];d&&d.type==="text"?d.value="["+d.value:u.unshift({type:"text",value:"["});const f=u[u.length-1];return f&&f.type==="text"?f.value+=s:u.push({type:"text",value:s}),u}function P0(a,r){const l=String(r.identifier).toUpperCase(),s=a.definitionById.get(l);if(!s)return yy(a,r);const u={src:zr(s.url||""),alt:r.alt};s.title!==null&&s.title!==void 0&&(u.title=s.title);const d={type:"element",tagName:"img",properties:u,children:[]};return a.patch(r,d),a.applyData(r,d)}function j0(a,r){const l={src:zr(r.url)};r.alt!==null&&r.alt!==void 0&&(l.alt=r.alt),r.title!==null&&r.title!==void 0&&(l.title=r.title);const s={type:"element",tagName:"img",properties:l,children:[]};return a.patch(r,s),a.applyData(r,s)}function B0(a,r){const l={type:"text",value:r.value.replace(/\r?\n|\r/g," ")};a.patch(r,l);const s={type:"element",tagName:"code",properties:{},children:[l]};return a.patch(r,s),a.applyData(r,s)}function X0(a,r){const l=String(r.identifier).toUpperCase(),s=a.definitionById.get(l);if(!s)return yy(a,r);const u={href:zr(s.url||"")};s.title!==null&&s.title!==void 0&&(u.title=s.title);const d={type:"element",tagName:"a",properties:u,children:a.all(r)};return a.patch(r,d),a.applyData(r,d)}function H0(a,r){const l={href:zr(r.url)};r.title!==null&&r.title!==void 0&&(l.title=r.title);const s={type:"element",tagName:"a",properties:l,children:a.all(r)};return a.patch(r,s),a.applyData(r,s)}function Z0(a,r,l){const s=a.all(r),u=l?V0(l):by(r),d={},f=[];if(typeof r.checked=="boolean"){const y=s[0];let b;y&&y.type==="element"&&y.tagName==="p"?b=y:(b={type:"element",tagName:"p",properties:{},children:[]},s.unshift(b)),b.children.length>0&&b.children.unshift({type:"text",value:" "}),b.children.unshift({type:"element",tagName:"input",properties:{type:"checkbox",checked:r.checked,disabled:!0},children:[]}),d.className=["task-list-item"]}let h=-1;for(;++h<s.length;){const y=s[h];(u||h!==0||y.type!=="element"||y.tagName!=="p")&&f.push({type:"text",value:`
`}),y.type==="element"&&y.tagName==="p"&&!u?f.push(...y.children):f.push(y)}const g=s[s.length-1];g&&(u||g.type!=="element"||g.tagName!=="p")&&f.push({type:"text",value:`
`});const p={type:"element",tagName:"li",properties:d,children:f};return a.patch(r,p),a.applyData(r,p)}function V0(a){let r=!1;if(a.type==="list"){r=a.spread||!1;const l=a.children;let s=-1;for(;!r&&++s<l.length;)r=by(l[s])}return r}function by(a){const r=a.spread;return r??a.children.length>1}function q0(a,r){const l={},s=a.all(r);let u=-1;for(typeof r.start=="number"&&r.start!==1&&(l.start=r.start);++u<s.length;){const f=s[u];if(f.type==="element"&&f.tagName==="li"&&f.properties&&Array.isArray(f.properties.className)&&f.properties.className.includes("task-list-item")){l.className=["contains-task-list"];break}}const d={type:"element",tagName:r.ordered?"ol":"ul",properties:l,children:a.wrap(s,!0)};return a.patch(r,d),a.applyData(r,d)}function Y0(a,r){const l={type:"element",tagName:"p",properties:{},children:a.all(r)};return a.patch(r,l),a.applyData(r,l)}function G0(a,r){const l={type:"root",children:a.wrap(a.all(r))};return a.patch(r,l),a.applyData(r,l)}function Q0(a,r){const l={type:"element",tagName:"strong",properties:{},children:a.all(r)};return a.patch(r,l),a.applyData(r,l)}function K0(a,r){const l=a.all(r),s=l.shift(),u=[];if(s){const f={type:"element",tagName:"thead",properties:{},children:a.wrap([s],!0)};a.patch(r.children[0],f),u.push(f)}if(l.length>0){const f={type:"element",tagName:"tbody",properties:{},children:a.wrap(l,!0)},h=ud(r.children[1]),g=Jg(r.children[r.children.length-1]);h&&g&&(f.position={start:h,end:g}),u.push(f)}const d={type:"element",tagName:"table",properties:{},children:a.wrap(u,!0)};return a.patch(r,d),a.applyData(r,d)}function F0(a,r,l){const s=l?l.children:void 0,d=(s?s.indexOf(r):1)===0?"th":"td",f=l&&l.type==="table"?l.align:void 0,h=f?f.length:r.children.length;let g=-1;const p=[];for(;++g<h;){const b=r.children[g],S={},v=f?f[g]:void 0;v&&(S.align=v);let L={type:"element",tagName:d,properties:S,children:[]};b&&(L.children=a.all(b),a.patch(b,L),L=a.applyData(b,L)),p.push(L)}const y={type:"element",tagName:"tr",properties:{},children:a.wrap(p,!0)};return a.patch(r,y),a.applyData(r,y)}function J0(a,r){const l={type:"element",tagName:"td",properties:{},children:a.all(r)};return a.patch(r,l),a.applyData(r,l)}const sg=9,og=32;function $0(a){const r=String(a),l=/\r?\n|\r/g;let s=l.exec(r),u=0;const d=[];for(;s;)d.push(cg(r.slice(u,s.index),u>0,!0),s[0]),u=s.index+s[0].length,s=l.exec(r);return d.push(cg(r.slice(u),u>0,!1)),d.join("")}function cg(a,r,l){let s=0,u=a.length;if(r){let d=a.codePointAt(s);for(;d===sg||d===og;)s++,d=a.codePointAt(s)}if(l){let d=a.codePointAt(u-1);for(;d===sg||d===og;)u--,d=a.codePointAt(u-1)}return u>s?a.slice(s,u):""}function eE(a,r){const l={type:"text",value:$0(String(r.value))};return a.patch(r,l),a.applyData(r,l)}function nE(a,r){const l={type:"element",tagName:"hr",properties:{},children:[]};return a.patch(r,l),a.applyData(r,l)}const tE={blockquote:M0,break:_0,code:C0,delete:L0,emphasis:O0,footnoteReference:N0,heading:W0,html:U0,imageReference:P0,image:j0,inlineCode:B0,linkReference:X0,link:H0,listItem:Z0,list:q0,paragraph:Y0,root:G0,strong:Q0,table:K0,tableCell:J0,tableRow:F0,text:eE,thematicBreak:nE,toml:Hs,yaml:Hs,definition:Hs,footnoteDefinition:Hs};function Hs(){}const zy=-1,io=0,Sl=1,Js=2,yd=3,bd=4,zd=5,vd=6,vy=7,Sy=8,ug=typeof self=="object"?self:globalThis,aE=(a,r)=>{const l=(u,d)=>(a.set(d,u),u),s=u=>{if(a.has(u))return a.get(u);const[d,f]=r[u];switch(d){case io:case zy:return l(f,u);case Sl:{const h=l([],u);for(const g of f)h.push(s(g));return h}case Js:{const h=l({},u);for(const[g,p]of f)h[s(g)]=s(p);return h}case yd:return l(new Date(f),u);case bd:{const{source:h,flags:g}=f;return l(new RegExp(h,g),u)}case zd:{const h=l(new Map,u);for(const[g,p]of f)h.set(s(g),s(p));return h}case vd:{const h=l(new Set,u);for(const g of f)h.add(s(g));return h}case vy:{const{name:h,message:g}=f;return l(new ug[h](g),u)}case Sy:return l(BigInt(f),u);case"BigInt":return l(Object(BigInt(f)),u);case"ArrayBuffer":return l(new Uint8Array(f).buffer,f);case"DataView":{const{buffer:h}=new Uint8Array(f);return l(new DataView(h),f)}}return l(new ug[d](f),u)};return s},dg=a=>aE(new Map,a)(0),hr="",{toString:iE}={},{keys:rE}=Object,yl=a=>{const r=typeof a;if(r!=="object"||!a)return[io,r];const l=iE.call(a).slice(8,-1);switch(l){case"Array":return[Sl,hr];case"Object":return[Js,hr];case"Date":return[yd,hr];case"RegExp":return[bd,hr];case"Map":return[zd,hr];case"Set":return[vd,hr];case"DataView":return[Sl,l]}return l.includes("Array")?[Sl,l]:l.includes("Error")?[vy,l]:[Js,l]},Zs=([a,r])=>a===io&&(r==="function"||r==="symbol"),lE=(a,r,l,s)=>{const u=(f,h)=>{const g=s.push(f)-1;return l.set(h,g),g},d=f=>{if(l.has(f))return l.get(f);let[h,g]=yl(f);switch(h){case io:{let y=f;switch(g){case"bigint":h=Sy,y=f.toString();break;case"function":case"symbol":if(a)throw new TypeError("unable to serialize "+g);y=null;break;case"undefined":return u([zy],f)}return u([h,y],f)}case Sl:{if(g){let S=f;return g==="DataView"?S=new Uint8Array(f.buffer):g==="ArrayBuffer"&&(S=new Uint8Array(f)),u([g,[...S]],f)}const y=[],b=u([h,y],f);for(const S of f)y.push(d(S));return b}case Js:{if(g)switch(g){case"BigInt":return u([g,f.toString()],f);case"Boolean":case"Number":case"String":return u([g,f.valueOf()],f)}if(r&&"toJSON"in f)return d(f.toJSON());const y=[],b=u([h,y],f);for(const S of rE(f))(a||!Zs(yl(f[S])))&&y.push([d(S),d(f[S])]);return b}case yd:return u([h,f.toISOString()],f);case bd:{const{source:y,flags:b}=f;return u([h,{source:y,flags:b}],f)}case zd:{const y=[],b=u([h,y],f);for(const[S,v]of f)(a||!(Zs(yl(S))||Zs(yl(v))))&&y.push([d(S),d(v)]);return b}case vd:{const y=[],b=u([h,y],f);for(const S of f)(a||!Zs(yl(S)))&&y.push(d(S));return b}}const{message:p}=f;return u([h,{name:g,message:p}],f)};return d},fg=(a,{json:r,lossy:l}={})=>{const s=[];return lE(!(r||l),!!r,new Map,s)(a),s},$s=typeof structuredClone=="function"?(a,r)=>r&&("json"in r||"lossy"in r)?dg(fg(a,r)):structuredClone(a):(a,r)=>dg(fg(a,r));function sE(a,r){const l=[{type:"text",value:"↩"}];return r>1&&l.push({type:"element",tagName:"sup",properties:{},children:[{type:"text",value:String(r)}]}),l}function oE(a,r){return"Back to reference "+(a+1)+(r>1?"-"+r:"")}function cE(a){const r=typeof a.options.clobberPrefix=="string"?a.options.clobberPrefix:"user-content-",l=a.options.footnoteBackContent||sE,s=a.options.footnoteBackLabel||oE,u=a.options.footnoteLabel||"Footnotes",d=a.options.footnoteLabelTagName||"h2",f=a.options.footnoteLabelProperties||{className:["sr-only"]},h=[];let g=-1;for(;++g<a.footnoteOrder.length;){const p=a.footnoteById.get(a.footnoteOrder[g]);if(!p)continue;const y=a.all(p),b=String(p.identifier).toUpperCase(),S=zr(b.toLowerCase());let v=0;const L=[],N=a.footnoteCounts.get(b);for(;N!==void 0&&++v<=N;){L.length>0&&L.push({type:"text",value:" "});let G=typeof l=="string"?l:l(g,v);typeof G=="string"&&(G={type:"text",value:G}),L.push({type:"element",tagName:"a",properties:{href:"#"+r+"fnref-"+S+(v>1?"-"+v:""),dataFootnoteBackref:"",ariaLabel:typeof s=="string"?s:s(g,v),className:["data-footnote-backref"]},children:Array.isArray(G)?G:[G]})}const H=y[y.length-1];if(H&&H.type==="element"&&H.tagName==="p"){const G=H.children[H.children.length-1];G&&G.type==="text"?G.value+=" ":H.children.push({type:"text",value:" "}),H.children.push(...L)}else y.push(...L);const P={type:"element",tagName:"li",properties:{id:r+"fn-"+S},children:a.wrap(y,!0)};a.patch(p,P),h.push(P)}if(h.length!==0)return{type:"element",tagName:"section",properties:{dataFootnotes:!0,className:["footnotes"]},children:[{type:"element",tagName:d,properties:{...$s(f),id:"footnote-label"},children:[{type:"text",value:u}]},{type:"text",value:`
`},{type:"element",tagName:"ol",properties:{},children:a.wrap(h,!0)},{type:"text",value:`
`}]}}const Ey=(function(a){if(a==null)return pE;if(typeof a=="function")return ro(a);if(typeof a=="object")return Array.isArray(a)?uE(a):dE(a);if(typeof a=="string")return fE(a);throw new Error("Expected function, string, or object as test")});function uE(a){const r=[];let l=-1;for(;++l<a.length;)r[l]=Ey(a[l]);return ro(s);function s(...u){let d=-1;for(;++d<r.length;)if(r[d].apply(this,u))return!0;return!1}}function dE(a){const r=a;return ro(l);function l(s){const u=s;let d;for(d in a)if(u[d]!==r[d])return!1;return!0}}function fE(a){return ro(r);function r(l){return l&&l.type===a}}function ro(a){return r;function r(l,s,u){return!!(hE(l)&&a.call(this,l,typeof s=="number"?s:void 0,u||void 0))}}function pE(){return!0}function hE(a){return a!==null&&typeof a=="object"&&"type"in a}const xy=[],mE=!0,pg=!1,gE="skip";function yE(a,r,l,s){let u;typeof r=="function"&&typeof l!="function"?(s=l,l=r):u=r;const d=Ey(u),f=s?-1:1;h(a,void 0,[])();function h(g,p,y){const b=g&&typeof g=="object"?g:{};if(typeof b.type=="string"){const v=typeof b.tagName=="string"?b.tagName:typeof b.name=="string"?b.name:void 0;Object.defineProperty(S,"name",{value:"node ("+(g.type+(v?"<"+v+">":""))+")"})}return S;function S(){let v=xy,L,N,H;if((!r||d(g,p,y[y.length-1]||void 0))&&(v=bE(l(g,y)),v[0]===pg))return v;if("children"in g&&g.children){const P=g;if(P.children&&v[0]!==gE)for(N=(s?P.children.length:-1)+f,H=y.concat(P);N>-1&&N<P.children.length;){const G=P.children[N];if(L=h(G,N,H)(),L[0]===pg)return L;N=typeof L[1]=="number"?L[1]:N+f}}return v}}}function bE(a){return Array.isArray(a)?a:typeof a=="number"?[mE,a]:a==null?xy:[a]}function Dy(a,r,l,s){let u,d,f;typeof r=="function"&&typeof l!="function"?(d=void 0,f=r,u=l):(d=r,f=l,u=s),yE(a,d,h,u);function h(g,p){const y=p[p.length-1],b=y?y.children.indexOf(g):void 0;return f(g,b,y)}}const Fu={}.hasOwnProperty,zE={};function vE(a,r){const l=r||zE,s=new Map,u=new Map,d=new Map,f={...tE,...l.handlers},h={all:p,applyData:EE,definitionById:s,footnoteById:u,footnoteCounts:d,footnoteOrder:[],handlers:f,one:g,options:l,patch:SE,wrap:DE};return Dy(a,function(y){if(y.type==="definition"||y.type==="footnoteDefinition"){const b=y.type==="definition"?s:u,S=String(y.identifier).toUpperCase();b.has(S)||b.set(S,y)}}),h;function g(y,b){const S=y.type,v=h.handlers[S];if(Fu.call(h.handlers,S)&&v)return v(h,y,b);if(h.options.passThrough&&h.options.passThrough.includes(S)){if("children"in y){const{children:N,...H}=y,P=$s(H);return P.children=h.all(y),P}return $s(y)}return(h.options.unknownHandler||xE)(h,y,b)}function p(y){const b=[];if("children"in y){const S=y.children;let v=-1;for(;++v<S.length;){const L=h.one(S[v],y);if(L){if(v&&S[v-1].type==="break"&&(!Array.isArray(L)&&L.type==="text"&&(L.value=hg(L.value)),!Array.isArray(L)&&L.type==="element")){const N=L.children[0];N&&N.type==="text"&&(N.value=hg(N.value))}Array.isArray(L)?b.push(...L):b.push(L)}}}return b}}function SE(a,r){a.position&&(r.position=iS(a))}function EE(a,r){let l=r;if(a&&a.data){const s=a.data.hName,u=a.data.hChildren,d=a.data.hProperties;if(typeof s=="string")if(l.type==="element")l.tagName=s;else{const f="children"in l?l.children:[l];l={type:"element",tagName:s,properties:{},children:f}}l.type==="element"&&d&&Object.assign(l.properties,$s(d)),"children"in l&&l.children&&u!==null&&u!==void 0&&(l.children=u)}return l}function xE(a,r){const l=r.data||{},s="value"in r&&!(Fu.call(l,"hProperties")||Fu.call(l,"hChildren"))?{type:"text",value:r.value}:{type:"element",tagName:"div",properties:{},children:a.all(r)};return a.patch(r,s),a.applyData(r,s)}function DE(a,r){const l=[];let s=-1;for(r&&l.push({type:"text",value:`
`});++s<a.length;)s&&l.push({type:"text",value:`
`}),l.push(a[s]);return r&&a.length>0&&l.push({type:"text",value:`
`}),l}function hg(a){let r=0,l=a.charCodeAt(r);for(;l===9||l===32;)r++,l=a.charCodeAt(r);return a.slice(r)}function mg(a,r){const l=vE(a,r),s=l.one(a,void 0),u=cE(l),d=Array.isArray(s)?{type:"root",children:s}:s||{type:"root",children:[]};return u&&d.children.push({type:"text",value:`
`},u),d}function TE(a,r){return a&&"run"in a?async function(l,s){const u=mg(l,{file:s,...r});await a.run(u,s)}:function(l,s){return mg(l,{file:s,...a||r})}}function gg(a){if(a)throw a}var Iu,yg;function AE(){if(yg)return Iu;yg=1;var a=Object.prototype.hasOwnProperty,r=Object.prototype.toString,l=Object.defineProperty,s=Object.getOwnPropertyDescriptor,u=function(p){return typeof Array.isArray=="function"?Array.isArray(p):r.call(p)==="[object Array]"},d=function(p){if(!p||r.call(p)!=="[object Object]")return!1;var y=a.call(p,"constructor"),b=p.constructor&&p.constructor.prototype&&a.call(p.constructor.prototype,"isPrototypeOf");if(p.constructor&&!y&&!b)return!1;var S;for(S in p);return typeof S>"u"||a.call(p,S)},f=function(p,y){l&&y.name==="__proto__"?l(p,y.name,{enumerable:!0,configurable:!0,value:y.newValue,writable:!0}):p[y.name]=y.newValue},h=function(p,y){if(y==="__proto__")if(a.call(p,y)){if(s)return s(p,y).value}else return;return p[y]};return Iu=function g(){var p,y,b,S,v,L,N=arguments[0],H=1,P=arguments.length,G=!1;for(typeof N=="boolean"&&(G=N,N=arguments[1]||{},H=2),(N==null||typeof N!="object"&&typeof N!="function")&&(N={});H<P;++H)if(p=arguments[H],p!=null)for(y in p)b=h(N,y),S=h(p,y),N!==S&&(G&&S&&(d(S)||(v=u(S)))?(v?(v=!1,L=b&&u(b)?b:[]):L=b&&d(b)?b:{},f(N,{name:y,newValue:g(G,L,S)})):typeof S<"u"&&f(N,{name:y,newValue:S}));return N},Iu}var wE=AE();const Mu=no(wE);function Ju(a){if(typeof a!="object"||a===null)return!1;const r=Object.getPrototypeOf(a);return(r===null||r===Object.prototype||Object.getPrototypeOf(r)===null)&&!(Symbol.toStringTag in a)&&!(Symbol.iterator in a)}function RE(){const a=[],r={run:l,use:s};return r;function l(...u){let d=-1;const f=u.pop();if(typeof f!="function")throw new TypeError("Expected function as last argument, not "+f);h(null,...u);function h(g,...p){const y=a[++d];let b=-1;if(g){f(g);return}for(;++b<u.length;)(p[b]===null||p[b]===void 0)&&(p[b]=u[b]);u=p,y?kE(y,h)(...p):f(null,...p)}}function s(u){if(typeof u!="function")throw new TypeError("Expected `middelware` to be a function, not "+u);return a.push(u),r}}function kE(a,r){let l;return s;function s(...f){const h=a.length>f.length;let g;h&&f.push(u);try{g=a.apply(this,f)}catch(p){const y=p;if(h&&l)throw y;return u(y)}h||(g&&g.then&&typeof g.then=="function"?g.then(d,u):g instanceof Error?u(g):d(g))}function u(f,...h){l||(l=!0,r(f,...h))}function d(f){u(null,f)}}const qt={basename:IE,dirname:ME,extname:_E,join:CE,sep:"/"};function IE(a,r){if(r!==void 0&&typeof r!="string")throw new TypeError('"ext" argument must be a string');Il(a);let l=0,s=-1,u=a.length,d;if(r===void 0||r.length===0||r.length>a.length){for(;u--;)if(a.codePointAt(u)===47){if(d){l=u+1;break}}else s<0&&(d=!0,s=u+1);return s<0?"":a.slice(l,s)}if(r===a)return"";let f=-1,h=r.length-1;for(;u--;)if(a.codePointAt(u)===47){if(d){l=u+1;break}}else f<0&&(d=!0,f=u+1),h>-1&&(a.codePointAt(u)===r.codePointAt(h--)?h<0&&(s=u):(h=-1,s=f));return l===s?s=f:s<0&&(s=a.length),a.slice(l,s)}function ME(a){if(Il(a),a.length===0)return".";let r=-1,l=a.length,s;for(;--l;)if(a.codePointAt(l)===47){if(s){r=l;break}}else s||(s=!0);return r<0?a.codePointAt(0)===47?"/":".":r===1&&a.codePointAt(0)===47?"//":a.slice(0,r)}function _E(a){Il(a);let r=a.length,l=-1,s=0,u=-1,d=0,f;for(;r--;){const h=a.codePointAt(r);if(h===47){if(f){s=r+1;break}continue}l<0&&(f=!0,l=r+1),h===46?u<0?u=r:d!==1&&(d=1):u>-1&&(d=-1)}return u<0||l<0||d===0||d===1&&u===l-1&&u===s+1?"":a.slice(u,l)}function CE(...a){let r=-1,l;for(;++r<a.length;)Il(a[r]),a[r]&&(l=l===void 0?a[r]:l+"/"+a[r]);return l===void 0?".":LE(l)}function LE(a){Il(a);const r=a.codePointAt(0)===47;let l=OE(a,!r);return l.length===0&&!r&&(l="."),l.length>0&&a.codePointAt(a.length-1)===47&&(l+="/"),r?"/"+l:l}function OE(a,r){let l="",s=0,u=-1,d=0,f=-1,h,g;for(;++f<=a.length;){if(f<a.length)h=a.codePointAt(f);else{if(h===47)break;h=47}if(h===47){if(!(u===f-1||d===1))if(u!==f-1&&d===2){if(l.length<2||s!==2||l.codePointAt(l.length-1)!==46||l.codePointAt(l.length-2)!==46){if(l.length>2){if(g=l.lastIndexOf("/"),g!==l.length-1){g<0?(l="",s=0):(l=l.slice(0,g),s=l.length-1-l.lastIndexOf("/")),u=f,d=0;continue}}else if(l.length>0){l="",s=0,u=f,d=0;continue}}r&&(l=l.length>0?l+"/..":"..",s=2)}else l.length>0?l+="/"+a.slice(u+1,f):l=a.slice(u+1,f),s=f-u-1;u=f,d=0}else h===46&&d>-1?d++:d=-1}return l}function Il(a){if(typeof a!="string")throw new TypeError("Path must be a string. Received "+JSON.stringify(a))}const NE={cwd:WE};function WE(){return"/"}function $u(a){return!!(a!==null&&typeof a=="object"&&"href"in a&&a.href&&"protocol"in a&&a.protocol&&a.auth===void 0)}function UE(a){if(typeof a=="string")a=new URL(a);else if(!$u(a)){const r=new TypeError('The "path" argument must be of type string or an instance of URL. Received `'+a+"`");throw r.code="ERR_INVALID_ARG_TYPE",r}if(a.protocol!=="file:"){const r=new TypeError("The URL must be of scheme file");throw r.code="ERR_INVALID_URL_SCHEME",r}return PE(a)}function PE(a){if(a.hostname!==""){const s=new TypeError('File URL host must be "localhost" or empty on darwin');throw s.code="ERR_INVALID_FILE_URL_HOST",s}const r=a.pathname;let l=-1;for(;++l<r.length;)if(r.codePointAt(l)===37&&r.codePointAt(l+1)===50){const s=r.codePointAt(l+2);if(s===70||s===102){const u=new TypeError("File URL path must not include encoded / characters");throw u.code="ERR_INVALID_FILE_URL_PATH",u}}return decodeURIComponent(r)}const _u=["history","path","basename","stem","extname","dirname"];class Ty{constructor(r){let l;r?$u(r)?l={path:r}:typeof r=="string"||jE(r)?l={value:r}:l=r:l={},this.cwd="cwd"in l?"":NE.cwd(),this.data={},this.history=[],this.messages=[],this.value,this.map,this.result,this.stored;let s=-1;for(;++s<_u.length;){const d=_u[s];d in l&&l[d]!==void 0&&l[d]!==null&&(this[d]=d==="history"?[...l[d]]:l[d])}let u;for(u in l)_u.includes(u)||(this[u]=l[u])}get basename(){return typeof this.path=="string"?qt.basename(this.path):void 0}set basename(r){Lu(r,"basename"),Cu(r,"basename"),this.path=qt.join(this.dirname||"",r)}get dirname(){return typeof this.path=="string"?qt.dirname(this.path):void 0}set dirname(r){bg(this.basename,"dirname"),this.path=qt.join(r||"",this.basename)}get extname(){return typeof this.path=="string"?qt.extname(this.path):void 0}set extname(r){if(Cu(r,"extname"),bg(this.dirname,"extname"),r){if(r.codePointAt(0)!==46)throw new Error("`extname` must start with `.`");if(r.includes(".",1))throw new Error("`extname` cannot contain multiple dots")}this.path=qt.join(this.dirname,this.stem+(r||""))}get path(){return this.history[this.history.length-1]}set path(r){$u(r)&&(r=UE(r)),Lu(r,"path"),this.path!==r&&this.history.push(r)}get stem(){return typeof this.path=="string"?qt.basename(this.path,this.extname):void 0}set stem(r){Lu(r,"stem"),Cu(r,"stem"),this.path=qt.join(this.dirname||"",r+(this.extname||""))}fail(r,l,s){const u=this.message(r,l,s);throw u.fatal=!0,u}info(r,l,s){const u=this.message(r,l,s);return u.fatal=void 0,u}message(r,l,s){const u=new Hn(r,l,s);return this.path&&(u.name=this.path+":"+u.name,u.file=this.path),u.fatal=!1,this.messages.push(u),u}toString(r){return this.value===void 0?"":typeof this.value=="string"?this.value:new TextDecoder(r||void 0).decode(this.value)}}function Cu(a,r){if(a&&a.includes(qt.sep))throw new Error("`"+r+"` cannot be a path: did not expect `"+qt.sep+"`")}function Lu(a,r){if(!a)throw new Error("`"+r+"` cannot be empty")}function bg(a,r){if(!a)throw new Error("Setting `"+r+"` requires `path` to be set too")}function jE(a){return!!(a&&typeof a=="object"&&"byteLength"in a&&"byteOffset"in a)}const BE=(function(a){const s=this.constructor.prototype,u=s[a],d=function(){return u.apply(d,arguments)};return Object.setPrototypeOf(d,s),d}),XE={}.hasOwnProperty;class Sd extends BE{constructor(){super("copy"),this.Compiler=void 0,this.Parser=void 0,this.attachers=[],this.compiler=void 0,this.freezeIndex=-1,this.frozen=void 0,this.namespace={},this.parser=void 0,this.transformers=RE()}copy(){const r=new Sd;let l=-1;for(;++l<this.attachers.length;){const s=this.attachers[l];r.use(...s)}return r.data(Mu(!0,{},this.namespace)),r}data(r,l){return typeof r=="string"?arguments.length===2?(Wu("data",this.frozen),this.namespace[r]=l,this):XE.call(this.namespace,r)&&this.namespace[r]||void 0:r?(Wu("data",this.frozen),this.namespace=r,this):this.namespace}freeze(){if(this.frozen)return this;const r=this;for(;++this.freezeIndex<this.attachers.length;){const[l,...s]=this.attachers[this.freezeIndex];if(s[0]===!1)continue;s[0]===!0&&(s[0]=void 0);const u=l.call(r,...s);typeof u=="function"&&this.transformers.use(u)}return this.frozen=!0,this.freezeIndex=Number.POSITIVE_INFINITY,this}parse(r){this.freeze();const l=Vs(r),s=this.parser||this.Parser;return Ou("parse",s),s(String(l),l)}process(r,l){const s=this;return this.freeze(),Ou("process",this.parser||this.Parser),Nu("process",this.compiler||this.Compiler),l?u(void 0,l):new Promise(u);function u(d,f){const h=Vs(r),g=s.parse(h);s.run(g,h,function(y,b,S){if(y||!b||!S)return p(y);const v=b,L=s.stringify(v,S);VE(L)?S.value=L:S.result=L,p(y,S)});function p(y,b){y||!b?f(y):d?d(b):l(void 0,b)}}}processSync(r){let l=!1,s;return this.freeze(),Ou("processSync",this.parser||this.Parser),Nu("processSync",this.compiler||this.Compiler),this.process(r,u),vg("processSync","process",l),s;function u(d,f){l=!0,gg(d),s=f}}run(r,l,s){zg(r),this.freeze();const u=this.transformers;return!s&&typeof l=="function"&&(s=l,l=void 0),s?d(void 0,s):new Promise(d);function d(f,h){const g=Vs(l);u.run(r,g,p);function p(y,b,S){const v=b||r;y?h(y):f?f(v):s(void 0,v,S)}}}runSync(r,l){let s=!1,u;return this.run(r,l,d),vg("runSync","run",s),u;function d(f,h){gg(f),u=h,s=!0}}stringify(r,l){this.freeze();const s=Vs(l),u=this.compiler||this.Compiler;return Nu("stringify",u),zg(r),u(r,s)}use(r,...l){const s=this.attachers,u=this.namespace;if(Wu("use",this.frozen),r!=null)if(typeof r=="function")g(r,l);else if(typeof r=="object")Array.isArray(r)?h(r):f(r);else throw new TypeError("Expected usable value, not `"+r+"`");return this;function d(p){if(typeof p=="function")g(p,[]);else if(typeof p=="object")if(Array.isArray(p)){const[y,...b]=p;g(y,b)}else f(p);else throw new TypeError("Expected usable value, not `"+p+"`")}function f(p){if(!("plugins"in p)&&!("settings"in p))throw new Error("Expected usable value but received an empty preset, which is probably a mistake: presets typically come with `plugins` and sometimes with `settings`, but this has neither");h(p.plugins),p.settings&&(u.settings=Mu(!0,u.settings,p.settings))}function h(p){let y=-1;if(p!=null)if(Array.isArray(p))for(;++y<p.length;){const b=p[y];d(b)}else throw new TypeError("Expected a list of plugins, not `"+p+"`")}function g(p,y){let b=-1,S=-1;for(;++b<s.length;)if(s[b][0]===p){S=b;break}if(S===-1)s.push([p,...y]);else if(y.length>0){let[v,...L]=y;const N=s[S][1];Ju(N)&&Ju(v)&&(v=Mu(!0,N,v)),s[S]=[p,v,...L]}}}}const HE=new Sd().freeze();function Ou(a,r){if(typeof r!="function")throw new TypeError("Cannot `"+a+"` without `parser`")}function Nu(a,r){if(typeof r!="function")throw new TypeError("Cannot `"+a+"` without `compiler`")}function Wu(a,r){if(r)throw new Error("Cannot call `"+a+"` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`.")}function zg(a){if(!Ju(a)||typeof a.type!="string")throw new TypeError("Expected node, got `"+a+"`")}function vg(a,r,l){if(!l)throw new Error("`"+a+"` finished async. Use `"+r+"` instead")}function Vs(a){return ZE(a)?a:new Ty(a)}function ZE(a){return!!(a&&typeof a=="object"&&"message"in a&&"messages"in a)}function VE(a){return typeof a=="string"||qE(a)}function qE(a){return!!(a&&typeof a=="object"&&"byteLength"in a&&"byteOffset"in a)}const YE="https://github.com/remarkjs/react-markdown/blob/main/changelog.md",Sg=[],Eg={allowDangerousHtml:!0},GE=/^(https?|ircs?|mailto|xmpp)$/i,QE=[{from:"astPlugins",id:"remove-buggy-html-in-markdown-parser"},{from:"allowDangerousHtml",id:"remove-buggy-html-in-markdown-parser"},{from:"allowNode",id:"replace-allownode-allowedtypes-and-disallowedtypes",to:"allowElement"},{from:"allowedTypes",id:"replace-allownode-allowedtypes-and-disallowedtypes",to:"allowedElements"},{from:"className",id:"remove-classname"},{from:"disallowedTypes",id:"replace-allownode-allowedtypes-and-disallowedtypes",to:"disallowedElements"},{from:"escapeHtml",id:"remove-buggy-html-in-markdown-parser"},{from:"includeElementIndex",id:"#remove-includeelementindex"},{from:"includeNodeIndex",id:"change-includenodeindex-to-includeelementindex"},{from:"linkTarget",id:"remove-linktarget"},{from:"plugins",id:"change-plugins-to-remarkplugins",to:"remarkPlugins"},{from:"rawSourcePos",id:"#remove-rawsourcepos"},{from:"renderers",id:"change-renderers-to-components",to:"components"},{from:"source",id:"change-source-to-children",to:"children"},{from:"sourcePos",id:"#remove-sourcepos"},{from:"transformImageUri",id:"#add-urltransform",to:"urlTransform"},{from:"transformLinkUri",id:"#add-urltransform",to:"urlTransform"}];function KE(a){const r=FE(a),l=JE(a);return $E(r.runSync(r.parse(l),l),a)}function FE(a){const r=a.rehypePlugins||Sg,l=a.remarkPlugins||Sg,s=a.remarkRehypeOptions?{...a.remarkRehypeOptions,...Eg}:Eg;return HE().use(I0).use(l).use(TE,s).use(r)}function JE(a){const r=a.children||"",l=new Ty;return typeof r=="string"&&(l.value=r),l}function $E(a,r){const l=r.allowedElements,s=r.allowElement,u=r.components,d=r.disallowedElements,f=r.skipHtml,h=r.unwrapDisallowed,g=r.urlTransform||e2;for(const y of QE)Object.hasOwn(r,y.from)&&(""+y.from+(y.to?"use `"+y.to+"` instead":"remove it")+YE+y.id,void 0);return Dy(a,p),cS(a,{Fragment:Q.Fragment,components:u,ignoreInvalidStyle:!0,jsx:Q.jsx,jsxs:Q.jsxs,passKeys:!0,passNode:!0});function p(y,b,S){if(y.type==="raw"&&S&&typeof b=="number")return f?S.children.splice(b,1):S.children[b]={type:"text",value:y.value},b;if(y.type==="element"){let v;for(v in wu)if(Object.hasOwn(wu,v)&&Object.hasOwn(y.properties,v)){const L=y.properties[v],N=wu[v];(N===null||N.includes(y.tagName))&&(y.properties[v]=g(String(L||""),v,y))}}if(y.type==="element"){let v=l?!l.includes(y.tagName):d?d.includes(y.tagName):!1;if(!v&&s&&typeof b=="number"&&(v=!s(y,b,S)),v&&S&&typeof b=="number")return h&&y.children?S.children.splice(b,1,...y.children):S.children.splice(b,1),b}}}function e2(a){const r=a.indexOf(":"),l=a.indexOf("?"),s=a.indexOf("#"),u=a.indexOf("/");return r===-1||u!==-1&&r>u||l!==-1&&r>l||s!==-1&&r>s||GE.test(a.slice(0,r))?a:""}const n2=`**wizzard-packages**

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
`,t2=`[**wizzard-packages**](../../README.md)

***

[wizzard-packages](../../README.md) / adapter-yup/src

# adapter-yup/src

## Classes

- [YupAdapter](classes/YupAdapter.md)

## Interfaces

- [YupLikeError](interfaces/YupLikeError.md)
- [YupLikeSchema](interfaces/YupLikeSchema.md)
`,a2=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [adapter-yup/src](../README.md) / YupAdapter

# Class: YupAdapter\\<T\\>

Defined in: [adapter-yup/src/YupAdapter.ts:7](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/adapter-yup/src/YupAdapter.ts#L7)

Validation adapter for Yup-like schemas.

## Type Parameters

### T

\`T\`

## Implements

- [\`IValidatorAdapter\`](../../../react/src/interfaces/IValidatorAdapter.md)\\<\`T\`\\>

## Constructors

### Constructor

> **new YupAdapter**\\<\`T\`\\>(\`schema\`): \`YupAdapter\`\\<\`T\`\\>

Defined in: [adapter-yup/src/YupAdapter.ts:10](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/adapter-yup/src/YupAdapter.ts#L10)

#### Parameters

##### schema

[\`YupLikeSchema\`](../interfaces/YupLikeSchema.md)\\<\`T\`\\>

#### Returns

\`YupAdapter\`\\<\`T\`\\>

## Methods

### validate()

> **validate**(\`data\`): \`Promise\`\\<[\`ValidationResult\`](../../../react/src/type-aliases/ValidationResult.md)\\>

Defined in: [adapter-yup/src/YupAdapter.ts:14](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/adapter-yup/src/YupAdapter.ts#L14)

#### Parameters

##### data

\`unknown\`

#### Returns

\`Promise\`\\<[\`ValidationResult\`](../../../react/src/type-aliases/ValidationResult.md)\\>

#### Implementation of

[\`IValidatorAdapter\`](../../../react/src/interfaces/IValidatorAdapter.md).[\`validate\`](../../../react/src/interfaces/IValidatorAdapter.md#validate)
`,i2=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [adapter-yup/src](../README.md) / YupLikeError

# Interface: YupLikeError

Defined in: [adapter-yup/src/types.ts:11](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/adapter-yup/src/types.ts#L11)

Minimal structural interface for Yup-like validation errors.

## Properties

### inner

> **inner**: \`object\`[]

Defined in: [adapter-yup/src/types.ts:12](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/adapter-yup/src/types.ts#L12)

#### message

> **message**: \`string\`

#### path?

> \`optional\` **path**: \`string\`
`,r2=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [adapter-yup/src](../README.md) / YupLikeSchema

# Interface: YupLikeSchema\\<T\\>

Defined in: [adapter-yup/src/types.ts:4](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/adapter-yup/src/types.ts#L4)

Minimal structural interface for Yup-like schemas.

## Type Parameters

### T

\`T\` = \`any\`

## Properties

### validate()

> **validate**: (\`data\`, \`options\`) => \`Promise\`\\<\`any\`\\>

Defined in: [adapter-yup/src/types.ts:5](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/adapter-yup/src/types.ts#L5)

#### Parameters

##### data

\`T\`

##### options

###### abortEarly

\`boolean\`

#### Returns

\`Promise\`\\<\`any\`\\>
`,l2=`[**wizzard-packages**](../../README.md)

***

[wizzard-packages](../../README.md) / adapter-zod/src

# adapter-zod/src

## Classes

- [ZodAdapter](classes/ZodAdapter.md)

## Interfaces

- [ZodLikeSchema](interfaces/ZodLikeSchema.md)
`,s2=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [adapter-zod/src](../README.md) / ZodAdapter

# Class: ZodAdapter\\<T\\>

Defined in: [adapter-zod/src/ZodAdapter.ts:7](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/adapter-zod/src/ZodAdapter.ts#L7)

Validation adapter for Zod-like schemas.

## Type Parameters

### T

\`T\`

## Implements

- [\`IValidatorAdapter\`](../../../react/src/interfaces/IValidatorAdapter.md)\\<\`T\`\\>

## Constructors

### Constructor

> **new ZodAdapter**\\<\`T\`\\>(\`schema\`): \`ZodAdapter\`\\<\`T\`\\>

Defined in: [adapter-zod/src/ZodAdapter.ts:10](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/adapter-zod/src/ZodAdapter.ts#L10)

#### Parameters

##### schema

[\`ZodLikeSchema\`](../interfaces/ZodLikeSchema.md)\\<\`T\`\\>

#### Returns

\`ZodAdapter\`\\<\`T\`\\>

## Methods

### validate()

> **validate**(\`data\`): \`Promise\`\\<[\`ValidationResult\`](../../../react/src/type-aliases/ValidationResult.md)\\>

Defined in: [adapter-zod/src/ZodAdapter.ts:14](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/adapter-zod/src/ZodAdapter.ts#L14)

#### Parameters

##### data

\`unknown\`

#### Returns

\`Promise\`\\<[\`ValidationResult\`](../../../react/src/type-aliases/ValidationResult.md)\\>

#### Implementation of

[\`IValidatorAdapter\`](../../../react/src/interfaces/IValidatorAdapter.md).[\`validate\`](../../../react/src/interfaces/IValidatorAdapter.md#validate)
`,o2="[**wizzard-packages**](../../../README.md)\n\n***\n\n[wizzard-packages](../../../README.md) / [adapter-zod/src](../README.md) / ZodLikeSchema\n\n# Interface: ZodLikeSchema\\<T\\>\n\nDefined in: [adapter-zod/src/types.ts:4](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/adapter-zod/src/types.ts#L4)\n\nMinimal structural interface for Zod-like schemas.\n\n## Type Parameters\n\n### T\n\n`T` = `any`\n\n## Properties\n\n### safeParseAsync()\n\n> **safeParseAsync**: (`data`) => `Promise`\\<\\{ `data?`: `T`; `error?`: \\{ `issues`: `object`[]; \\}; `success`: `boolean`; \\}\\>\n\nDefined in: [adapter-zod/src/types.ts:5](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/adapter-zod/src/types.ts#L5)\n\n#### Parameters\n\n##### data\n\n`T`\n\n#### Returns\n\n`Promise`\\<\\{ `data?`: `T`; `error?`: \\{ `issues`: `object`[]; \\}; `success`: `boolean`; \\}\\>\n",c2=`[**wizzard-packages**](../../README.md)

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
`,u2=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [core/src](../README.md) / WizardStore

# Class: WizardStore\\<T, StepId\\>

Defined in: [core/src/store/WizardStore.ts:17](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/store/WizardStore.ts#L17)

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

Defined in: [core/src/store/WizardStore.ts:38](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/store/WizardStore.ts#L38)

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

Defined in: [core/src/store/WizardStore.ts:23](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/store/WizardStore.ts#L23)

#### Implementation of

[\`IWizardStore\`](../interfaces/IWizardStore.md).[\`errorsMap\`](../interfaces/IWizardStore.md#errorsmap)

## Methods

### clearStepStorage()

> **clearStepStorage**(\`stepId\`): \`void\`

Defined in: [core/src/store/WizardStore.ts:534](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/store/WizardStore.ts#L534)

#### Parameters

##### stepId

\`string\`

#### Returns

\`void\`

***

### deleteError()

> **deleteError**(\`stepId\`, \`path\`): \`boolean\`

Defined in: [core/src/store/WizardStore.ts:439](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/store/WizardStore.ts#L439)

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

Defined in: [core/src/store/WizardStore.ts:97](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/store/WizardStore.ts#L97)

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

Defined in: [core/src/store/WizardStore.ts:285](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/store/WizardStore.ts#L285)

Returns the current immutable snapshot of the wizard state.

#### Returns

[\`IWizardState\`](../interfaces/IWizardState.md)\\<\`T\`, \`StepId\`\\>

#### Implementation of

[\`IWizardStore\`](../interfaces/IWizardStore.md).[\`getSnapshot\`](../interfaces/IWizardStore.md#getsnapshot)

***

### goToStep()

> **goToStep**(\`stepId\`, \`options\`): \`Promise\`\\<\`boolean\`\\>

Defined in: [core/src/store/WizardStore.ts:775](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/store/WizardStore.ts#L775)

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

Defined in: [core/src/store/WizardStore.ts:471](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/store/WizardStore.ts#L471)

Restores wizard state from persistence storage.
Implements "latest wins" conflict resolution based on step timestamps.

#### Returns

\`void\`

#### Implementation of

[\`IWizardStore\`](../interfaces/IWizardStore.md).[\`hydrate\`](../interfaces/IWizardStore.md#hydrate)

***

### injectPersistence()

> **injectPersistence**(\`adapter\`): \`void\`

Defined in: [core/src/store/WizardStore.ts:463](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/store/WizardStore.ts#L463)

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

Defined in: [core/src/store/WizardStore.ts:616](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/store/WizardStore.ts#L616)

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

Defined in: [core/src/store/WizardStore.ts:547](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/store/WizardStore.ts#L547)

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

Defined in: [core/src/store/WizardStore.ts:377](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/store/WizardStore.ts#L377)

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

Defined in: [core/src/store/WizardStore.ts:419](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/store/WizardStore.ts#L419)

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

Defined in: [core/src/store/WizardStore.ts:458](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/store/WizardStore.ts#L458)

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

Defined in: [core/src/store/WizardStore.ts:29](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/store/WizardStore.ts#L29)

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

Defined in: [core/src/store/WizardStore.ts:296](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/store/WizardStore.ts#L296)

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

Defined in: [core/src/store/WizardStore.ts:406](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/store/WizardStore.ts#L406)

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

Defined in: [core/src/store/WizardStore.ts:330](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/store/WizardStore.ts#L330)

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

Defined in: [core/src/store/WizardStore.ts:751](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/store/WizardStore.ts#L751)

#### Returns

\`Promise\`\\<\\{ \`errors\`: \`Record\`\\<\`string\`, \`Record\`\\<\`string\`, \`string\`\\>\\>; \`isValid\`: \`boolean\`; \\}\\>

#### Implementation of

[\`IWizardStore\`](../interfaces/IWizardStore.md).[\`validateAll\`](../interfaces/IWizardStore.md#validateall)

***

### validateStep()

> **validateStep**(\`stepId\`): \`Promise\`\\<\`boolean\`\\>

Defined in: [core/src/store/WizardStore.ts:692](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/store/WizardStore.ts#L692)

#### Parameters

##### stepId

\`StepId\`

#### Returns

\`Promise\`\\<\`boolean\`\\>

#### Implementation of

[\`IWizardStore\`](../interfaces/IWizardStore.md).[\`validateStep\`](../interfaces/IWizardStore.md#validatestep)
`,d2=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [core/src](../README.md) / getByPath

# Function: getByPath()

> **getByPath**(\`obj\`, \`path\`, \`defaultValue?\`): \`unknown\`

Defined in: [core/src/utils/data.ts:32](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/utils/data.ts#L32)

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
`,f2=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [core/src](../README.md) / setByPath

# Function: setByPath()

> **setByPath**\\<\`T\`\\>(\`obj\`, \`path\`, \`value\`): \`T\`

Defined in: [core/src/utils/data.ts:54](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/utils/data.ts#L54)

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
`,p2=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [core/src](../README.md) / shallowEqual

# Function: shallowEqual()

> **shallowEqual**(\`a\`, \`b\`): \`boolean\`

Defined in: [core/src/utils/data.ts:99](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/utils/data.ts#L99)

Simple shallow equality check.

## Parameters

### a

\`any\`

### b

\`any\`

## Returns

\`boolean\`
`,h2=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [core/src](../README.md) / toPath

# Function: toPath()

> **toPath**(\`path\`): \`string\`[]

Defined in: [core/src/utils/data.ts:9](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/utils/data.ts#L9)

Parses a string path into an array of keys using a cache.

## Parameters

### path

\`string\`

## Returns

\`string\`[]
`,m2=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [core/src](../README.md) / IBreadcrumb

# Interface: IBreadcrumb\\<StepId\\>

Defined in: [core/src/types.ts:311](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L311)

Breadcrumb Interface

## Type Parameters

### StepId

\`StepId\` *extends* \`string\` = \`string\`

## Properties

### id

> **id**: \`StepId\`

Defined in: [core/src/types.ts:312](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L312)

***

### label

> **label**: \`string\`

Defined in: [core/src/types.ts:313](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L313)

***

### status

> **status**: [\`BreadcrumbStatus\`](../type-aliases/BreadcrumbStatus.md)

Defined in: [core/src/types.ts:314](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L314)
`,g2=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [core/src](../README.md) / IPersistenceAdapter

# Interface: IPersistenceAdapter

Defined in: [core/src/types.ts:141](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L141)

Persistence Adapter Interface

## Properties

### clear()

> **clear**: () => \`void\`

Defined in: [core/src/types.ts:146](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L146)

#### Returns

\`void\`

***

### clearStep()

> **clearStep**: (\`stepId\`) => \`void\`

Defined in: [core/src/types.ts:145](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L145)

#### Parameters

##### stepId

\`string\`

#### Returns

\`void\`

***

### getStep()

> **getStep**: \\<\`T\`\\>(\`stepId\`) => \`T\` \\| \`undefined\`

Defined in: [core/src/types.ts:143](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L143)

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

Defined in: [core/src/types.ts:144](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L144)

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

Defined in: [core/src/types.ts:142](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L142)

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
`,y2=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [core/src](../README.md) / IStepConfig

# Interface: IStepConfig\\<TStepData, StepId\\>

Defined in: [core/src/types.ts:157](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L157)

Step Configuration

## Type Parameters

### TStepData

\`TStepData\` = \`unknown\`

### StepId

\`StepId\` *extends* \`string\` = \`string\`

## Properties

### ~~autoValidate?~~

> \`optional\` **autoValidate**: \`boolean\`

Defined in: [core/src/types.ts:179](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L179)

#### Deprecated

Use validationMode instead

***

### beforeLeave()?

> \`optional\` **beforeLeave**: (\`data\`, \`direction\`, \`metadata\`) => \`boolean\` \\| \`Promise\`\\<\`boolean\`\\>

Defined in: [core/src/types.ts:169](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L169)

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

Defined in: [core/src/types.ts:189](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L189)

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

Defined in: [core/src/types.ts:185](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L185)

***

### component?

> \`optional\` **component**: \`any\`

Defined in: [core/src/types.ts:181](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L181)

***

### condition()?

> \`optional\` **condition**: (\`data\`, \`metadata\`) => \`boolean\` \\| \`Promise\`\\<\`boolean\`\\>

Defined in: [core/src/types.ts:160](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L160)

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

Defined in: [core/src/types.ts:168](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L168)

***

### dependsOn?

> \`optional\` **dependsOn**: \`string\`[]

Defined in: [core/src/types.ts:184](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L184)

***

### id

> **id**: \`StepId\`

Defined in: [core/src/types.ts:158](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L158)

***

### label

> **label**: \`string\`

Defined in: [core/src/types.ts:159](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L159)

***

### persistenceAdapter?

> \`optional\` **persistenceAdapter**: [\`IPersistenceAdapter\`](IPersistenceAdapter.md)

Defined in: [core/src/types.ts:182](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L182)

***

### persistenceMode?

> \`optional\` **persistenceMode**: [\`PersistenceMode\`](../type-aliases/PersistenceMode.md)

Defined in: [core/src/types.ts:183](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L183)

***

### showWhilePending?

> \`optional\` **showWhilePending**: \`boolean\`

Defined in: [core/src/types.ts:167](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L167)

***

### validationAdapter?

> \`optional\` **validationAdapter**: [\`IValidatorAdapter\`](IValidatorAdapter.md)\\<\`TStepData\`\\>

Defined in: [core/src/types.ts:177](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L177)

***

### validationMode?

> \`optional\` **validationMode**: [\`ValidationMode\`](../type-aliases/ValidationMode.md)

Defined in: [core/src/types.ts:180](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L180)
`,b2=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [core/src](../README.md) / IValidatorAdapter

# Interface: IValidatorAdapter\\<TData\\>

Defined in: [core/src/types.ts:125](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L125)

Validator Adapter Interface

## Type Parameters

### TData

\`TData\` = \`unknown\`

## Properties

### validate()

> **validate**: (\`data\`) => [\`ValidationResult\`](../type-aliases/ValidationResult.md) \\| \`Promise\`\\<[\`ValidationResult\`](../type-aliases/ValidationResult.md)\\>

Defined in: [core/src/types.ts:126](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L126)

#### Parameters

##### data

\`TData\`

#### Returns

[\`ValidationResult\`](../type-aliases/ValidationResult.md) \\| \`Promise\`\\<[\`ValidationResult\`](../type-aliases/ValidationResult.md)\\>
`,z2=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [core/src](../README.md) / IWizardActions

# Interface: IWizardActions\\<StepId\\>

Defined in: [core/src/types.ts:90](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L90)

Public actions available to control the wizard.

## Extended by

- [\`IWizardContext\`](IWizardContext.md)

## Type Parameters

### StepId

\`StepId\` *extends* \`string\` = \`string\`

## Properties

### clearStorage()

> **clearStorage**: () => \`void\`

Defined in: [core/src/types.ts:106](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L106)

#### Returns

\`void\`

***

### getData()

> **getData**: (\`path\`, \`defaultValue?\`) => \`unknown\`

Defined in: [core/src/types.ts:110](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L110)

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

Defined in: [core/src/types.ts:91](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L91)

#### Returns

\`Promise\`\\<\`void\`\\>

***

### goToPrevStep()

> **goToPrevStep**: () => \`Promise\`\\<\`void\`\\>

Defined in: [core/src/types.ts:92](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L92)

#### Returns

\`Promise\`\\<\`void\`\\>

***

### goToStep()

> **goToStep**: (\`stepId\`, \`providedActiveSteps?\`, \`options?\`) => \`Promise\`\\<\`boolean\`\\>

Defined in: [core/src/types.ts:93](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L93)

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

Defined in: [core/src/types.ts:99](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L99)

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

Defined in: [core/src/types.ts:107](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L107)

#### Returns

\`void\`

***

### save()

> **save**: (\`stepIds?\`) => \`void\`

Defined in: [core/src/types.ts:105](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L105)

#### Parameters

##### stepIds?

\`boolean\` | \`StepId\` | \`StepId\`[]

#### Returns

\`void\`

***

### setData()

> **setData**: (\`path\`, \`value\`, \`options?\`) => \`void\`

Defined in: [core/src/types.ts:108](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L108)

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

Defined in: [core/src/types.ts:98](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L98)

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

Defined in: [core/src/types.ts:111](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L111)

#### Parameters

##### config

\`Partial\`\\<[\`IWizardConfig\`](IWizardConfig.md)\\<\`any\`, \`StepId\`\\>\\>

#### Returns

\`void\`

***

### updateData()

> **updateData**: (\`data\`, \`options?\`) => \`void\`

Defined in: [core/src/types.ts:109](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L109)

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

Defined in: [core/src/types.ts:101](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L101)

#### Returns

\`Promise\`\\<\\{ \`errors\`: \`Record\`\\<\`string\`, \`Record\`\\<\`string\`, \`string\`\\>\\>; \`isValid\`: \`boolean\`; \\}\\>

***

### validateStep()

> **validateStep**: (\`sid\`) => \`Promise\`\\<\`boolean\`\\>

Defined in: [core/src/types.ts:100](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L100)

#### Parameters

##### sid

\`StepId\`

#### Returns

\`Promise\`\\<\`boolean\`\\>
`,v2=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [core/src](../README.md) / IWizardConfig

# Interface: IWizardConfig\\<T, StepId\\>

Defined in: [core/src/types.ts:201](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L201)

Global Wizard Configuration.

## Type Parameters

### T

\`T\` = \`unknown\`

### StepId

\`StepId\` *extends* \`string\` = \`string\`

## Properties

### analytics?

> \`optional\` **analytics**: \`object\`

Defined in: [core/src/types.ts:214](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L214)

#### onEvent

> **onEvent**: [\`WizardEventHandler\`](../type-aliases/WizardEventHandler.md)\\<\`StepId\`\\>

***

### ~~autoValidate?~~

> \`optional\` **autoValidate**: \`boolean\`

Defined in: [core/src/types.ts:204](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L204)

#### Deprecated

Use validationMode instead

***

### middlewares?

> \`optional\` **middlewares**: [\`WizardMiddleware\`](../type-aliases/WizardMiddleware.md)\\<\`T\`, \`StepId\`\\>[]

Defined in: [core/src/types.ts:217](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L217)

***

### navigationMode?

> \`optional\` **navigationMode**: \`"sequential"\` \\| \`"visited"\` \\| \`"free"\`

Defined in: [core/src/types.ts:218](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L218)

***

### onConflict?

> \`optional\` **onConflict**: \`"merge"\` \\| \`"replace"\` \\| \`"keep-local"\`

Defined in: [core/src/types.ts:213](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L213)

***

### onStepChange()?

> \`optional\` **onStepChange**: (\`fromStep\`, \`toStep\`, \`data\`) => \`void\`

Defined in: [core/src/types.ts:219](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L219)

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

Defined in: [core/src/types.ts:207](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L207)

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

Defined in: [core/src/types.ts:202](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L202)

***

### validationDebounceTime?

> \`optional\` **validationDebounceTime**: \`number\`

Defined in: [core/src/types.ts:206](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L206)

***

### validationMode?

> \`optional\` **validationMode**: [\`ValidationMode\`](../type-aliases/ValidationMode.md)

Defined in: [core/src/types.ts:205](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L205)
`,S2=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [core/src](../README.md) / IWizardContext

# Interface: IWizardContext\\<T, StepId\\>

Defined in: [core/src/types.ts:320](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L320)

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

Defined in: [core/src/types.ts:26](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L26)

List of steps that currently meet their visibility conditions

#### Inherited from

\`Omit.activeSteps\`

***

### activeStepsCount

> **activeStepsCount**: \`number\`

Defined in: [core/src/types.ts:44](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L44)

Number of active steps

#### Inherited from

\`Omit.activeStepsCount\`

***

### allErrors

> **allErrors**: \`Record\`\\<\`StepId\`, \`Record\`\\<\`string\`, \`string\`\\>\\>

Defined in: [core/src/types.ts:333](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L333)

All errors by step and field.

***

### breadcrumbs

> **breadcrumbs**: [\`IBreadcrumb\`](IBreadcrumb.md)\\<\`StepId\`\\>[]

Defined in: [core/src/types.ts:52](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L52)

Breadcrumb items for navigation UI

#### Inherited from

\`Omit.breadcrumbs\`

***

### busySteps

> **busySteps**: \`Set\`\\<\`StepId\`\\>

Defined in: [core/src/types.ts:32](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L32)

Set of step IDs that are currently performing async work

#### Inherited from

\`Omit.busySteps\`

***

### clearStorage()

> **clearStorage**: () => \`void\`

Defined in: [core/src/types.ts:106](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L106)

#### Returns

\`void\`

#### Inherited from

[\`IWizardActions\`](IWizardActions.md).[\`clearStorage\`](IWizardActions.md#clearstorage)

***

### completedSteps

> **completedSteps**: \`Set\`\\<\`StepId\`\\>

Defined in: [core/src/types.ts:36](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L36)

Set of step IDs that have passed validation

#### Inherited from

\`Omit.completedSteps\`

***

### config

> **config**: [\`IWizardConfig\`](IWizardConfig.md)\\<\`T\`, \`StepId\`\\>

Defined in: [core/src/types.ts:40](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L40)

Current wizard configuration

#### Inherited from

\`Omit.config\`

***

### currentStep

> **currentStep**: [\`IStepConfig\`](IStepConfig.md)\\<\`T\`, \`StepId\`\\> \\| \`null\`

Defined in: [core/src/types.ts:14](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L14)

Active step configuration (if any)

#### Inherited from

\`Omit.currentStep\`

***

### currentStepId

> **currentStepId**: \`""\` \\| \`StepId\`

Defined in: [core/src/types.ts:28](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L28)

String ID of the current step

#### Inherited from

\`Omit.currentStepId\`

***

### currentStepIndex

> **currentStepIndex**: \`number\`

Defined in: [core/src/types.ts:16](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L16)

Numeric index of current step in active steps list

#### Inherited from

\`Omit.currentStepIndex\`

***

### data

> **data**: \`T\`

Defined in: [core/src/types.ts:10](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L10)

Global wizard data object

#### Inherited from

\`Omit.data\`

***

### dirtyFields

> **dirtyFields**: \`Set\`\\<\`string\`\\>

Defined in: [core/src/types.ts:50](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L50)

Set of paths to fields that have been modified

#### Inherited from

\`Omit.dirtyFields\`

***

### errors

> **errors**: \`Record\`\\<\`string\`, \`string\`\\>

Defined in: [core/src/types.ts:329](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L329)

Combined error map (flat)

***

### errorSteps

> **errorSteps**: \`Set\`\\<\`StepId\`\\>

Defined in: [core/src/types.ts:38](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L38)

Set of step IDs that currently have active validation errors

#### Inherited from

\`Omit.errorSteps\`

***

### getData()

> **getData**: (\`path\`, \`defaultValue?\`) => \`unknown\`

Defined in: [core/src/types.ts:110](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L110)

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

Defined in: [core/src/types.ts:91](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L91)

#### Returns

\`Promise\`\\<\`void\`\\>

#### Inherited from

[\`IWizardActions\`](IWizardActions.md).[\`goToNextStep\`](IWizardActions.md#gotonextstep)

***

### goToPrevStep()

> **goToPrevStep**: () => \`Promise\`\\<\`void\`\\>

Defined in: [core/src/types.ts:92](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L92)

#### Returns

\`Promise\`\\<\`void\`\\>

#### Inherited from

[\`IWizardActions\`](IWizardActions.md).[\`goToPrevStep\`](IWizardActions.md#gotoprevstep)

***

### goToStep()

> **goToStep**: (\`stepId\`, \`providedActiveSteps?\`, \`options?\`) => \`Promise\`\\<\`boolean\`\\>

Defined in: [core/src/types.ts:93](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L93)

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

Defined in: [core/src/types.ts:54](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L54)

Result of the last goToStep action

#### Inherited from

\`Omit.goToStepResult\`

***

### handleStepChange()

> **handleStepChange**: (\`field\`, \`value\`) => \`void\`

Defined in: [core/src/types.ts:99](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L99)

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

Defined in: [core/src/types.ts:30](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L30)

History of visited steps (navigation path)

#### Inherited from

\`Omit.history\`

***

### isBusy

> **isBusy**: \`boolean\`

Defined in: [core/src/types.ts:46](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L46)

Alias for isPending

#### Inherited from

\`Omit.isBusy\`

***

### isDirty

> **isDirty**: \`boolean\`

Defined in: [core/src/types.ts:48](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L48)

True if any field has been modified since initialization

#### Inherited from

\`Omit.isDirty\`

***

### isFirstStep

> **isFirstStep**: \`boolean\`

Defined in: [core/src/types.ts:18](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L18)

True if currently on the first active step

#### Inherited from

\`Omit.isFirstStep\`

***

### isLastStep

> **isLastStep**: \`boolean\`

Defined in: [core/src/types.ts:20](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L20)

True if currently on the last active step

#### Inherited from

\`Omit.isLastStep\`

***

### isLoading

> **isLoading**: \`boolean\`

Defined in: [core/src/types.ts:22](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L22)

True if the wizard is in an initial loading/hydrating state

#### Inherited from

\`Omit.isLoading\`

***

### isPending

> **isPending**: \`boolean\`

Defined in: [core/src/types.ts:24](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L24)

True if an async action (like navigation or validation) is in progress

#### Inherited from

\`Omit.isPending\`

***

### progress

> **progress**: \`number\`

Defined in: [core/src/types.ts:42](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L42)

Percentage of completion (0-100)

#### Inherited from

\`Omit.progress\`

***

### reset()

> **reset**: () => \`void\`

Defined in: [core/src/types.ts:107](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L107)

#### Returns

\`void\`

#### Inherited from

[\`IWizardActions\`](IWizardActions.md).[\`reset\`](IWizardActions.md#reset)

***

### save()

> **save**: (\`stepIds?\`) => \`void\`

Defined in: [core/src/types.ts:105](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L105)

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

Defined in: [core/src/types.ts:108](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L108)

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

Defined in: [core/src/types.ts:98](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L98)

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

Defined in: [core/src/types.ts:325](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L325)

The internal store instance.

***

### updateConfig()

> **updateConfig**: (\`config\`) => \`void\`

Defined in: [core/src/types.ts:111](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L111)

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

Defined in: [core/src/types.ts:109](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L109)

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

Defined in: [core/src/types.ts:101](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L101)

#### Returns

\`Promise\`\\<\\{ \`errors\`: \`Record\`\\<\`string\`, \`Record\`\\<\`string\`, \`string\`\\>\\>; \`isValid\`: \`boolean\`; \\}\\>

#### Inherited from

[\`IWizardActions\`](IWizardActions.md).[\`validateAll\`](IWizardActions.md#validateall)

***

### validateStep()

> **validateStep**: (\`sid\`) => \`Promise\`\\<\`boolean\`\\>

Defined in: [core/src/types.ts:100](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L100)

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

Defined in: [core/src/types.ts:34](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L34)

Set of step IDs that have been visited by the user

#### Inherited from

\`Omit.visitedSteps\`
`,E2=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [core/src](../README.md) / IWizardState

# Interface: IWizardState\\<T, StepId\\>

Defined in: [core/src/types.ts:8](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L8)

Full state of the wizard.

## Type Parameters

### T

\`T\` = \`unknown\`

### StepId

\`StepId\` *extends* \`string\` = \`string\`

## Properties

### activeSteps

> **activeSteps**: [\`IStepConfig\`](IStepConfig.md)\\<\`T\`, \`StepId\`\\>[]

Defined in: [core/src/types.ts:26](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L26)

List of steps that currently meet their visibility conditions

***

### activeStepsCount

> **activeStepsCount**: \`number\`

Defined in: [core/src/types.ts:44](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L44)

Number of active steps

***

### breadcrumbs

> **breadcrumbs**: [\`IBreadcrumb\`](IBreadcrumb.md)\\<\`StepId\`\\>[]

Defined in: [core/src/types.ts:52](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L52)

Breadcrumb items for navigation UI

***

### busySteps

> **busySteps**: \`Set\`\\<\`StepId\`\\>

Defined in: [core/src/types.ts:32](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L32)

Set of step IDs that are currently performing async work

***

### completedSteps

> **completedSteps**: \`Set\`\\<\`StepId\`\\>

Defined in: [core/src/types.ts:36](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L36)

Set of step IDs that have passed validation

***

### config

> **config**: [\`IWizardConfig\`](IWizardConfig.md)\\<\`T\`, \`StepId\`\\>

Defined in: [core/src/types.ts:40](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L40)

Current wizard configuration

***

### currentStep

> **currentStep**: [\`IStepConfig\`](IStepConfig.md)\\<\`T\`, \`StepId\`\\> \\| \`null\`

Defined in: [core/src/types.ts:14](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L14)

Active step configuration (if any)

***

### currentStepId

> **currentStepId**: \`""\` \\| \`StepId\`

Defined in: [core/src/types.ts:28](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L28)

String ID of the current step

***

### currentStepIndex

> **currentStepIndex**: \`number\`

Defined in: [core/src/types.ts:16](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L16)

Numeric index of current step in active steps list

***

### data

> **data**: \`T\`

Defined in: [core/src/types.ts:10](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L10)

Global wizard data object

***

### dirtyFields

> **dirtyFields**: \`Set\`\\<\`string\`\\>

Defined in: [core/src/types.ts:50](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L50)

Set of paths to fields that have been modified

***

### errors

> **errors**: \`Record\`\\<\`StepId\`, \`Record\`\\<\`string\`, \`string\`\\>\\>

Defined in: [core/src/types.ts:12](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L12)

Current errors map by step and field

***

### errorSteps

> **errorSteps**: \`Set\`\\<\`StepId\`\\>

Defined in: [core/src/types.ts:38](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L38)

Set of step IDs that currently have active validation errors

***

### goToStepResult?

> \`optional\` **goToStepResult**: \`boolean\` \\| \`"init"\` \\| \`null\`

Defined in: [core/src/types.ts:54](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L54)

Result of the last goToStep action

***

### history

> **history**: \`StepId\`[]

Defined in: [core/src/types.ts:30](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L30)

History of visited steps (navigation path)

***

### isBusy

> **isBusy**: \`boolean\`

Defined in: [core/src/types.ts:46](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L46)

Alias for isPending

***

### isDirty

> **isDirty**: \`boolean\`

Defined in: [core/src/types.ts:48](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L48)

True if any field has been modified since initialization

***

### isFirstStep

> **isFirstStep**: \`boolean\`

Defined in: [core/src/types.ts:18](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L18)

True if currently on the first active step

***

### isLastStep

> **isLastStep**: \`boolean\`

Defined in: [core/src/types.ts:20](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L20)

True if currently on the last active step

***

### isLoading

> **isLoading**: \`boolean\`

Defined in: [core/src/types.ts:22](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L22)

True if the wizard is in an initial loading/hydrating state

***

### isPending

> **isPending**: \`boolean\`

Defined in: [core/src/types.ts:24](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L24)

True if an async action (like navigation or validation) is in progress

***

### progress

> **progress**: \`number\`

Defined in: [core/src/types.ts:42](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L42)

Percentage of completion (0-100)

***

### visitedSteps

> **visitedSteps**: \`Set\`\\<\`StepId\`\\>

Defined in: [core/src/types.ts:34](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L34)

Set of step IDs that have been visited by the user
`,x2=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [core/src](../README.md) / IWizardStore

# Interface: IWizardStore\\<T, StepId\\>

Defined in: [core/src/types.ts:60](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L60)

Store interface for reading state and dispatching actions.

## Type Parameters

### T

\`T\`

### StepId

\`StepId\` *extends* \`string\` = \`string\`

## Properties

### errorsMap

> **errorsMap**: \`Map\`\\<\`string\`, \`Map\`\\<\`string\`, \`string\`\\>\\>

Defined in: [core/src/types.ts:74](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L74)

***

### validateAll()

> **validateAll**: () => \`Promise\`\\<\\{ \`errors\`: \`Record\`\\<\`string\`, \`Record\`\\<\`string\`, \`string\`\\>\\>; \`isValid\`: \`boolean\`; \\}\\>

Defined in: [core/src/types.ts:81](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L81)

#### Returns

\`Promise\`\\<\\{ \`errors\`: \`Record\`\\<\`string\`, \`Record\`\\<\`string\`, \`string\`\\>\\>; \`isValid\`: \`boolean\`; \\}\\>

***

### validateStep()

> **validateStep**: (\`stepId\`) => \`Promise\`\\<\`boolean\`\\>

Defined in: [core/src/types.ts:80](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L80)

#### Parameters

##### stepId

\`StepId\`

#### Returns

\`Promise\`\\<\`boolean\`\\>

## Methods

### deleteError()

> **deleteError**(\`stepId\`, \`path\`): \`boolean\`

Defined in: [core/src/types.ts:68](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L68)

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

Defined in: [core/src/types.ts:62](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L62)

#### Parameters

##### action

[\`WizardAction\`](../type-aliases/WizardAction.md)\\<\`T\`, \`StepId\`\\>

#### Returns

\`void\`

***

### getSnapshot()

> **getSnapshot**(): [\`IWizardState\`](IWizardState.md)\\<\`T\`, \`StepId\`\\>

Defined in: [core/src/types.ts:61](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L61)

#### Returns

[\`IWizardState\`](IWizardState.md)\\<\`T\`, \`StepId\`\\>

***

### goToStep()

> **goToStep**(\`stepId\`, \`options?\`): \`Promise\`\\<\`boolean\`\\>

Defined in: [core/src/types.ts:76](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L76)

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

Defined in: [core/src/types.ts:73](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L73)

#### Returns

\`void\`

***

### injectPersistence()

> **injectPersistence**(\`adapter\`): \`void\`

Defined in: [core/src/types.ts:71](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L71)

#### Parameters

##### adapter

[\`IPersistenceAdapter\`](IPersistenceAdapter.md)

#### Returns

\`void\`

***

### resolveActiveSteps()

> **resolveActiveSteps**(\`data?\`): \`Promise\`\\<[\`IStepConfig\`](IStepConfig.md)\\<\`T\`, \`StepId\`\\>[]\\>

Defined in: [core/src/types.ts:75](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L75)

#### Parameters

##### data?

\`T\`

#### Returns

\`Promise\`\\<[\`IStepConfig\`](IStepConfig.md)\\<\`T\`, \`StepId\`\\>[]\\>

***

### save()

> **save**(\`stepId?\`): \`void\`

Defined in: [core/src/types.ts:72](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L72)

#### Parameters

##### stepId?

\`StepId\`

#### Returns

\`void\`

***

### setInitialData()

> **setInitialData**(\`data\`): \`void\`

Defined in: [core/src/types.ts:65](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L65)

#### Parameters

##### data

\`T\`

#### Returns

\`void\`

***

### setStepErrors()

> **setStepErrors**(\`stepId\`, \`errors\`): \`boolean\`

Defined in: [core/src/types.ts:67](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L67)

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

Defined in: [core/src/types.ts:69](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L69)

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

Defined in: [core/src/types.ts:70](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L70)

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

Defined in: [core/src/types.ts:63](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L63)

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

Defined in: [core/src/types.ts:66](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L66)

#### Parameters

##### newErrors

\`Record\`\\<\`string\`, \`Record\`\\<\`string\`, \`string\`\\>\\>

#### Returns

\`void\`

***

### updateMeta()

> **updateMeta**(\`newMeta\`): \`void\`

Defined in: [core/src/types.ts:64](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L64)

#### Parameters

##### newMeta

\`Partial\`\\<[\`IWizardState\`](IWizardState.md)\\<\`T\`, \`StepId\`\\>\\>

#### Returns

\`void\`
`,D2=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [core/src](../README.md) / MiddlewareAPI

# Interface: MiddlewareAPI\\<T, StepId\\>

Defined in: [core/src/types.ts:258](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L258)

Middleware API

## Type Parameters

### T

\`T\` = \`any\`

### StepId

\`StepId\` *extends* \`string\` = \`string\`

## Properties

### dispatch()

> **dispatch**: (\`action\`) => \`void\`

Defined in: [core/src/types.ts:259](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L259)

#### Parameters

##### action

[\`WizardAction\`](../type-aliases/WizardAction.md)\\<\`T\`, \`StepId\`\\>

#### Returns

\`void\`

***

### getSnapshot()

> **getSnapshot**: () => [\`IWizardState\`](IWizardState.md)\\<\`T\`, \`StepId\`\\>

Defined in: [core/src/types.ts:261](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L261)

#### Returns

[\`IWizardState\`](IWizardState.md)\\<\`T\`, \`StepId\`\\>

***

### getState()

> **getState**: () => \`T\`

Defined in: [core/src/types.ts:260](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L260)

#### Returns

\`T\`
`,T2=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [core/src](../README.md) / BreadcrumbStatus

# Type Alias: BreadcrumbStatus

> **BreadcrumbStatus** = \`"visited"\` \\| \`"current"\` \\| \`"upcoming"\` \\| \`"completed"\` \\| \`"error"\` \\| \`"hidden"\`

Defined in: [core/src/types.ts:300](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L300)

Breadcrumb Status
`,A2="[**wizzard-packages**](../../../README.md)\n\n***\n\n[wizzard-packages](../../../README.md) / [core/src](../README.md) / Path\n\n# Type Alias: Path\\<T\\>\n\n> **Path**\\<`T`\\> = `T` *extends* `ReadonlyArray`\\<infer V\\> ? `IsTuple`\\<`T`\\> *extends* `true` ? `{ [K in TupleKeys<T>]-?: PathImpl<K & string, T[K]> }`\\[`TupleKeys`\\<`T`\\>\\] : `PathImpl`\\<`number`, `V`\\> : `{ [K in keyof T]-?: PathImpl<K & string, T[K]> }`\\[keyof `T`\\]\n\nDefined in: [core/src/utils/types.ts:18](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/utils/types.ts#L18)\n\nDot-notation path for a nested data type.\n\n## Type Parameters\n\n### T\n\n`T`\n",w2="[**wizzard-packages**](../../../README.md)\n\n***\n\n[wizzard-packages](../../../README.md) / [core/src](../README.md) / PathValue\n\n# Type Alias: PathValue\\<T, P\\>\n\n> **PathValue**\\<`T`, `P`\\> = `T` *extends* `any` ? `P` *extends* `` `${infer K}.${infer R}` `` ? `K` *extends* keyof `T` ? `R` *extends* [`Path`](Path.md)\\<`T`\\[`K`\\]\\> ? `PathValue`\\<`T`\\[`K`\\], `R`\\> : `never` : `K` *extends* `` `${number}` `` ? `T` *extends* `ReadonlyArray`\\<infer V\\> ? `R` *extends* [`Path`](Path.md)\\<`V`\\> ? `PathValue`\\<`V`, `R`\\> : `never` : `never` : `never` : `P` *extends* keyof `T` ? `T`\\[`P`\\] : `P` *extends* `` `${number}` `` ? `T` *extends* `ReadonlyArray`\\<infer V\\> ? `V` : `never` : `never` : `never`\n\nDefined in: [core/src/utils/types.ts:32](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/utils/types.ts#L32)\n\nValue type resolved from a dot-notation path.\n\n## Type Parameters\n\n### T\n\n`T`\n\n### P\n\n`P` *extends* [`Path`](Path.md)\\<`T`\\>\n",R2=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [core/src](../README.md) / PersistenceMode

# Type Alias: PersistenceMode

> **PersistenceMode** = \`"onStepChange"\` \\| \`"onChange"\` \\| \`"manual"\`

Defined in: [core/src/types.ts:132](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L132)

Persistence strategy for step data.
`,k2=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [core/src](../README.md) / StepDirection

# Type Alias: StepDirection

> **StepDirection** = \`"next"\` \\| \`"prev"\`

Defined in: [core/src/types.ts:152](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L152)

Step Navigation Direction
`,I2=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [core/src](../README.md) / ValidationMode

# Type Alias: ValidationMode

> **ValidationMode** = \`"onChange"\` \\| \`"onStepChange"\` \\| \`"manual"\`

Defined in: [core/src/types.ts:136](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L136)

Validation strategy for step data.
`,M2=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [core/src](../README.md) / ValidationResult

# Type Alias: ValidationResult

> **ValidationResult** = \`object\`

Defined in: [core/src/types.ts:117](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L117)

Validation Result Interface

## Properties

### errors?

> \`optional\` **errors**: \`Record\`\\<\`string\`, \`string\`\\>

Defined in: [core/src/types.ts:119](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L119)

***

### isValid

> **isValid**: \`boolean\`

Defined in: [core/src/types.ts:118](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L118)
`,_2='[**wizzard-packages**](../../../README.md)\n\n***\n\n[wizzard-packages](../../../README.md) / [core/src](../README.md) / WizardAction\n\n# Type Alias: WizardAction\\<T, StepId\\>\n\n> **WizardAction**\\<`T`, `StepId`\\> = \\{ `payload`: \\{ `config`: [`IWizardConfig`](../interfaces/IWizardConfig.md)\\<`T`, `StepId`\\>; `data`: `T`; \\}; `type`: `"INIT"`; \\} \\| \\{ `payload`: \\{ `options?`: `any`; `path`: `string`; `value`: `any`; \\}; `type`: `"SET_DATA"`; \\} \\| \\{ `payload`: \\{ `data`: `Partial`\\<`T`\\>; `options?`: `any`; \\}; `type`: `"UPDATE_DATA"`; \\} \\| \\{ `payload`: \\{ `from`: `StepId`; `nextHistory?`: `StepId`[]; `nextVisitedSteps?`: `Set`\\<`StepId`\\>; `result`: `boolean` \\| `null` \\| `"init"`; `to`: `StepId`; \\}; `type`: `"GO_TO_STEP"`; \\} \\| \\{ `payload`: \\{ `stepId`: `StepId`; \\}; `type`: `"VALIDATE_START"`; \\} \\| \\{ `payload`: \\{ `result`: [`ValidationResult`](ValidationResult.md); `stepId`: `StepId`; \\}; `type`: `"VALIDATE_END"`; \\} \\| \\{ `payload`: \\{ `errors`: `Record`\\<`string`, `string`\\> \\| `undefined` \\| `null`; `stepId`: `StepId`; \\}; `type`: `"SET_STEP_ERRORS"`; \\} \\| \\{ `payload`: \\{ `data`: `T`; \\}; `type`: `"RESET"`; \\} \\| \\{ `payload`: \\{ `meta`: `Partial`\\<[`IWizardState`](../interfaces/IWizardState.md)\\<`T`, `StepId`\\>\\>; \\}; `type`: `"UPDATE_META"`; \\} \\| \\{ `payload`: \\{ `stepId`: `StepId` \\| `""`; \\}; `type`: `"SET_CURRENT_STEP_ID"`; \\} \\| \\{ `payload`: \\{ `history`: `StepId`[]; \\}; `type`: `"SET_HISTORY"`; \\} \\| \\{ `payload`: \\{ `steps`: [`IStepConfig`](../interfaces/IStepConfig.md)\\<`T`, `StepId`\\>[]; \\}; `type`: `"SET_ACTIVE_STEPS"`; \\} \\| \\{ `payload`: \\{ `steps`: `Set`\\<`StepId`\\>; \\}; `type`: `"SET_VISITED_STEPS"`; \\} \\| \\{ `payload`: \\{ `steps`: `Set`\\<`StepId`\\>; \\}; `type`: `"SET_COMPLETED_STEPS"`; \\} \\| \\{ `payload`: \\{ `steps`: `Set`\\<`StepId`\\>; \\}; `type`: `"SET_ERROR_STEPS"`; \\} \\| \\{ `payload`: \\{ `snapshot`: `any`; \\}; `type`: `"RESTORE_SNAPSHOT"`; \\}\n\nDefined in: [core/src/types.ts:225](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L225)\n\nAction Types\n\n## Type Parameters\n\n### T\n\n`T` = `any`\n\n### StepId\n\n`StepId` *extends* `string` = `string`\n',C2=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [core/src](../README.md) / WizardEventHandler

# Type Alias: WizardEventHandler()\\<StepId\\>

> **WizardEventHandler**\\<\`StepId\`\\> = \\<\`E\`\\>(\`name\`, \`payload\`) => \`void\`

Defined in: [core/src/types.ts:292](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L292)

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
`,L2=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [core/src](../README.md) / WizardEventName

# Type Alias: WizardEventName

> **WizardEventName** = \`"step_change"\` \\| \`"validation_error"\` \\| \`"wizard_reset"\`

Defined in: [core/src/types.ts:274](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L274)

Standardized Event Names
`,O2=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [core/src](../README.md) / WizardEventPayloads

# Type Alias: WizardEventPayloads\\<StepId\\>

> **WizardEventPayloads**\\<\`StepId\`\\> = \`object\`

Defined in: [core/src/types.ts:279](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L279)

Event Payloads

## Type Parameters

### StepId

\`StepId\` *extends* \`string\` = \`string\`

## Properties

### step\\_change

> **step\\_change**: \`object\`

Defined in: [core/src/types.ts:280](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L280)

#### from

> **from**: \`StepId\` \\| \`null\`

#### timestamp

> **timestamp**: \`number\`

#### to

> **to**: \`StepId\`

***

### validation\\_error

> **validation\\_error**: \`object\`

Defined in: [core/src/types.ts:281](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L281)

#### errors

> **errors**: \`Record\`\\<\`string\`, \`string\`\\> \\| \`undefined\`

#### stepId

> **stepId**: \`StepId\`

#### timestamp

> **timestamp**: \`number\`

***

### wizard\\_reset

> **wizard\\_reset**: \`object\`

Defined in: [core/src/types.ts:286](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L286)

#### data

> **data**: \`any\`

#### timestamp?

> \`optional\` **timestamp**: \`number\`
`,N2=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [core/src](../README.md) / WizardMiddleware

# Type Alias: WizardMiddleware()\\<T, StepId\\>

> **WizardMiddleware**\\<\`T\`, \`StepId\`\\> = (\`api\`) => (\`next\`) => (\`action\`) => \`void\`

Defined in: [core/src/types.ts:267](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/core/src/types.ts#L267)

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
`,W2=`[**wizzard-packages**](../../README.md)

***

[wizzard-packages](../../README.md) / devtools/src

# devtools/src

## Functions

- [WizardDevTools](functions/WizardDevTools.md)
`,U2=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [devtools/src](../README.md) / WizardDevTools

# Function: WizardDevTools()

> **WizardDevTools**(): \`Element\`

Defined in: [devtools/src/WizardDevTools.tsx:11](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/devtools/src/WizardDevTools.tsx#L11)

## Returns

\`Element\`
`,P2=`[**wizzard-packages**](../../README.md)

***

[wizzard-packages](../../README.md) / middleware/src

# middleware/src

## Variables

- [devToolsMiddleware](variables/devToolsMiddleware.md)
- [loggerMiddleware](variables/loggerMiddleware.md)
`,j2=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [middleware/src](../README.md) / devToolsMiddleware

# Variable: devToolsMiddleware

> \`const\` **devToolsMiddleware**: [\`WizardMiddleware\`](../../../react/src/type-aliases/WizardMiddleware.md)\\<\`any\`, \`any\`\\>

Defined in: [middleware/src/devToolsMiddleware.ts:49](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/middleware/src/devToolsMiddleware.ts#L49)

Middleware for Redux DevTools integration.
`,B2=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [middleware/src](../README.md) / loggerMiddleware

# Variable: loggerMiddleware

> \`const\` **loggerMiddleware**: [\`WizardMiddleware\`](../../../react/src/type-aliases/WizardMiddleware.md)\\<\`any\`, \`any\`\\>

Defined in: [middleware/src/loggerMiddleware.ts:6](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/middleware/src/loggerMiddleware.ts#L6)

Simple logger middleware for Wizard actions
`,X2=`[**wizzard-packages**](../../README.md)

***

[wizzard-packages](../../README.md) / persistence/src

# persistence/src

## Classes

- [LocalStorageAdapter](classes/LocalStorageAdapter.md)
- [MemoryAdapter](classes/MemoryAdapter.md)
`,H2=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [persistence/src](../README.md) / LocalStorageAdapter

# Class: LocalStorageAdapter

Defined in: [persistence/src/LocalStorageAdapter.ts:6](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/persistence/src/LocalStorageAdapter.ts#L6)

Browser persistence adapter backed by localStorage.

## Implements

- \`IPersistenceAdapter\`

## Constructors

### Constructor

> **new LocalStorageAdapter**(\`prefix\`): \`LocalStorageAdapter\`

Defined in: [persistence/src/LocalStorageAdapter.ts:9](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/persistence/src/LocalStorageAdapter.ts#L9)

#### Parameters

##### prefix

\`string\` = \`'wizard_'\`

#### Returns

\`LocalStorageAdapter\`

## Methods

### clear()

> **clear**(): \`void\`

Defined in: [persistence/src/LocalStorageAdapter.ts:69](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/persistence/src/LocalStorageAdapter.ts#L69)

#### Returns

\`void\`

#### Implementation of

\`IPersistenceAdapter.clear\`

***

### clearStep()

> **clearStep**(\`stepId\`): \`void\`

Defined in: [persistence/src/LocalStorageAdapter.ts:60](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/persistence/src/LocalStorageAdapter.ts#L60)

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

Defined in: [persistence/src/LocalStorageAdapter.ts:27](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/persistence/src/LocalStorageAdapter.ts#L27)

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

Defined in: [persistence/src/LocalStorageAdapter.ts:44](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/persistence/src/LocalStorageAdapter.ts#L44)

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

Defined in: [persistence/src/LocalStorageAdapter.ts:17](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/persistence/src/LocalStorageAdapter.ts#L17)

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
`,Z2=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [persistence/src](../README.md) / MemoryAdapter

# Class: MemoryAdapter

Defined in: [persistence/src/MemoryAdapter.ts:6](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/persistence/src/MemoryAdapter.ts#L6)

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

Defined in: [persistence/src/MemoryAdapter.ts:27](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/persistence/src/MemoryAdapter.ts#L27)

#### Returns

\`void\`

#### Implementation of

\`IPersistenceAdapter.clear\`

***

### clearStep()

> **clearStep**(\`stepId\`): \`void\`

Defined in: [persistence/src/MemoryAdapter.ts:23](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/persistence/src/MemoryAdapter.ts#L23)

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

Defined in: [persistence/src/MemoryAdapter.ts:13](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/persistence/src/MemoryAdapter.ts#L13)

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

Defined in: [persistence/src/MemoryAdapter.ts:17](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/persistence/src/MemoryAdapter.ts#L17)

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

Defined in: [persistence/src/MemoryAdapter.ts:9](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/persistence/src/MemoryAdapter.ts#L9)

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
`,V2=`[**wizzard-packages**](../../README.md)

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
`,q2=`[**wizzard-packages**](../../../README.md)

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
`,Y2=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [react/src](../README.md) / WizardProvider

# Function: WizardProvider()

> **WizardProvider**\\<\`T\`, \`StepId\`\\>(\`__namedParameters\`): \`Element\`

Defined in: [react/src/context/WizardContext.tsx:44](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/react/src/context/WizardContext.tsx#L44)

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
`,G2=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [react/src](../README.md) / createWizardFactory

# Function: createWizardFactory()

> **createWizardFactory**\\<\`TSchema\`, \`StepId\`\\>(): \`object\`

Defined in: [react/src/factory.tsx:21](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/react/src/factory.tsx#L21)

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
`,Q2=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [react/src](../README.md) / useWizard

# Function: useWizard()

> **useWizard**\\<\`T\`, \`StepId\`\\>(): \`IWizardContext\`\\<\`T\`, \`StepId\`\\>

Defined in: [react/src/hooks/useWizard.ts:7](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/react/src/hooks/useWizard.ts#L7)

Alias for useWizardContext.

## Type Parameters

### T

\`T\` = \`any\`

### StepId

\`StepId\` *extends* \`string\` = \`string\`

## Returns

\`IWizardContext\`\\<\`T\`, \`StepId\`\\>
`,K2=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [react/src](../README.md) / useWizardActions

# Function: useWizardActions()

> **useWizardActions**\\<\`StepId\`\\>(): [\`IWizardActions\`](../interfaces/IWizardActions.md)\\<\`StepId\`\\>

Defined in: [react/src/context/WizardContext.tsx:679](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/react/src/context/WizardContext.tsx#L679)

Returns the wizard actions API.

## Type Parameters

### StepId

\`StepId\` *extends* \`string\` = \`string\`

## Returns

[\`IWizardActions\`](../interfaces/IWizardActions.md)\\<\`StepId\`\\>
`,F2=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [react/src](../README.md) / useWizardContext

# Function: useWizardContext()

> **useWizardContext**\\<\`T\`, \`StepId\`\\>(): [\`IWizardContext\`](../interfaces/IWizardContext.md)\\<\`T\`, \`StepId\`\\>

Defined in: [react/src/context/WizardContext.tsx:688](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/react/src/context/WizardContext.tsx#L688)

Returns combined wizard state, actions, and derived errors.

## Type Parameters

### T

\`T\` = \`any\`

### StepId

\`StepId\` *extends* \`string\` = \`string\`

## Returns

[\`IWizardContext\`](../interfaces/IWizardContext.md)\\<\`T\`, \`StepId\`\\>
`,J2=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [react/src](../README.md) / useWizardError

# Function: useWizardError()

> **useWizardError**(\`path\`): \`string\` \\| \`undefined\`

Defined in: [react/src/context/WizardContext.tsx:632](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/react/src/context/WizardContext.tsx#L632)

Returns the first error message for a path across all steps.

## Parameters

### path

\`string\`

## Returns

\`string\` \\| \`undefined\`
`,$2=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [react/src](../README.md) / useWizardSelector

# Function: useWizardSelector()

> **useWizardSelector**\\<\`TSelected\`\\>(\`selector\`, \`options?\`): \`TSelected\`

Defined in: [react/src/context/WizardContext.tsx:649](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/react/src/context/WizardContext.tsx#L649)

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
`,ex=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [react/src](../README.md) / useWizardState

# Function: useWizardState()

> **useWizardState**\\<\`T\`, \`StepId\`\\>(): [\`IWizardState\`](../interfaces/IWizardState.md)\\<\`T\`, \`StepId\`\\>

Defined in: [react/src/context/WizardContext.tsx:591](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/react/src/context/WizardContext.tsx#L591)

Reads the full wizard state.

## Type Parameters

### T

\`T\` = \`unknown\`

### StepId

\`StepId\` *extends* \`string\` = \`string\`

## Returns

[\`IWizardState\`](../interfaces/IWizardState.md)\\<\`T\`, \`StepId\`\\>
`,nx=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [react/src](../README.md) / useWizardValue

# Function: useWizardValue()

> **useWizardValue**\\<\`TValue\`\\>(\`path\`, \`options?\`): \`TValue\`

Defined in: [react/src/context/WizardContext.tsx:603](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/react/src/context/WizardContext.tsx#L603)

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
`,tx=`[**wizzard-packages**](../../../README.md)

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
`,ax=`[**wizzard-packages**](../../../README.md)

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
`,ix=`[**wizzard-packages**](../../../README.md)

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
`,rx=`[**wizzard-packages**](../../../README.md)

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
`,lx=`[**wizzard-packages**](../../../README.md)

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
`,sx=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [react/src](../README.md) / IWizardHandle

# Interface: IWizardHandle\\<T, StepId\\>

Defined in: [react/src/types.ts:17](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/react/src/types.ts#L17)

Handle returned by components for imperative access to the wizard.

## Type Parameters

### T

\`T\` = \`unknown\`

### StepId

\`StepId\` *extends* \`string\` = \`string\`

## Properties

### actions

> **actions**: \`IWizardActions\`\\<\`StepId\`\\>

Defined in: [react/src/types.ts:19](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/react/src/types.ts#L19)

***

### state

> **state**: [\`IWizardState\`](IWizardState.md)\\<\`T\`, \`StepId\`\\>

Defined in: [react/src/types.ts:18](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/react/src/types.ts#L18)
`,ox=`[**wizzard-packages**](../../../README.md)

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
`,cx=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [react/src](../README.md) / WizardProviderProps

# Interface: WizardProviderProps\\<T, StepId\\>

Defined in: [react/src/context/WizardContext.tsx:34](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/react/src/context/WizardContext.tsx#L34)

Props for WizardProvider.

## Type Parameters

### T

\`T\`

### StepId

\`StepId\` *extends* \`string\`

## Properties

### children

> **children**: \`ReactNode\`

Defined in: [react/src/context/WizardContext.tsx:38](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/react/src/context/WizardContext.tsx#L38)

***

### config

> **config**: [\`IWizardConfig\`](IWizardConfig.md)\\<\`T\`, \`StepId\`\\>

Defined in: [react/src/context/WizardContext.tsx:35](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/react/src/context/WizardContext.tsx#L35)

***

### initialData?

> \`optional\` **initialData**: \`T\`

Defined in: [react/src/context/WizardContext.tsx:36](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/react/src/context/WizardContext.tsx#L36)

***

### initialStepId?

> \`optional\` **initialStepId**: \`StepId\`

Defined in: [react/src/context/WizardContext.tsx:37](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/react/src/context/WizardContext.tsx#L37)
`,ux=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [react/src](../README.md) / WizardStepRendererProps

# Interface: WizardStepRendererProps

Defined in: [react/src/components/WizardStepRenderer.tsx:7](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/react/src/components/WizardStepRenderer.tsx#L7)

Props for rendering the current step component.

## Properties

### fallback?

> \`optional\` **fallback**: \`ReactNode\`

Defined in: [react/src/components/WizardStepRenderer.tsx:9](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/react/src/components/WizardStepRenderer.tsx#L9)

***

### wrapper?

> \`optional\` **wrapper**: \`ComponentType\`\\<\\{ \`children\`: \`ReactNode\`; \`key\`: \`string\`; \\}\\>

Defined in: [react/src/components/WizardStepRenderer.tsx:8](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/react/src/components/WizardStepRenderer.tsx#L8)
`,dx=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [react/src](../README.md) / PersistenceMode

# Type Alias: PersistenceMode

> **PersistenceMode** = \`"onStepChange"\` \\| \`"onChange"\` \\| \`"manual"\`

Defined in: core/dist/index.d.ts:129

Persistence strategy for step data.
`,fx=`[**wizzard-packages**](../../../README.md)

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
`,px=`[**wizzard-packages**](../../../README.md)

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
`,hx=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [react/src](../README.md) / WizardStepRenderer

# Variable: WizardStepRenderer

> \`const\` **WizardStepRenderer**: \`React.FC\`\\<[\`WizardStepRendererProps\`](../interfaces/WizardStepRendererProps.md)\\>

Defined in: [react/src/components/WizardStepRenderer.tsx:15](https://github.com/ZizzX/wizzard-packages/blob/661f4cfba7666ee91182e871127c8d3f0c90766b/packages/react/src/components/WizardStepRenderer.tsx#L15)

Renders the active step component with optional wrapper and suspense fallback.
`,mx=`[**wizzard-packages**](../../../README.md)

***

[wizzard-packages](../../../README.md) / [react/src](../README.md) / loggerMiddleware

# Variable: loggerMiddleware

> \`const\` **loggerMiddleware**: [\`WizardMiddleware\`](../type-aliases/WizardMiddleware.md)\\<\`any\`, \`any\`\\>

Defined in: middleware/dist/index.d.ts:6

Simple logger middleware for Wizard actions
`,gx=Object.assign({"../../../../docs/api/README.md":n2,"../../../../docs/api/adapter-yup/src/README.md":t2,"../../../../docs/api/adapter-yup/src/classes/YupAdapter.md":a2,"../../../../docs/api/adapter-yup/src/interfaces/YupLikeError.md":i2,"../../../../docs/api/adapter-yup/src/interfaces/YupLikeSchema.md":r2,"../../../../docs/api/adapter-zod/src/README.md":l2,"../../../../docs/api/adapter-zod/src/classes/ZodAdapter.md":s2,"../../../../docs/api/adapter-zod/src/interfaces/ZodLikeSchema.md":o2,"../../../../docs/api/core/src/README.md":c2,"../../../../docs/api/core/src/classes/WizardStore.md":u2,"../../../../docs/api/core/src/functions/getByPath.md":d2,"../../../../docs/api/core/src/functions/setByPath.md":f2,"../../../../docs/api/core/src/functions/shallowEqual.md":p2,"../../../../docs/api/core/src/functions/toPath.md":h2,"../../../../docs/api/core/src/interfaces/IBreadcrumb.md":m2,"../../../../docs/api/core/src/interfaces/IPersistenceAdapter.md":g2,"../../../../docs/api/core/src/interfaces/IStepConfig.md":y2,"../../../../docs/api/core/src/interfaces/IValidatorAdapter.md":b2,"../../../../docs/api/core/src/interfaces/IWizardActions.md":z2,"../../../../docs/api/core/src/interfaces/IWizardConfig.md":v2,"../../../../docs/api/core/src/interfaces/IWizardContext.md":S2,"../../../../docs/api/core/src/interfaces/IWizardState.md":E2,"../../../../docs/api/core/src/interfaces/IWizardStore.md":x2,"../../../../docs/api/core/src/interfaces/MiddlewareAPI.md":D2,"../../../../docs/api/core/src/type-aliases/BreadcrumbStatus.md":T2,"../../../../docs/api/core/src/type-aliases/Path.md":A2,"../../../../docs/api/core/src/type-aliases/PathValue.md":w2,"../../../../docs/api/core/src/type-aliases/PersistenceMode.md":R2,"../../../../docs/api/core/src/type-aliases/StepDirection.md":k2,"../../../../docs/api/core/src/type-aliases/ValidationMode.md":I2,"../../../../docs/api/core/src/type-aliases/ValidationResult.md":M2,"../../../../docs/api/core/src/type-aliases/WizardAction.md":_2,"../../../../docs/api/core/src/type-aliases/WizardEventHandler.md":C2,"../../../../docs/api/core/src/type-aliases/WizardEventName.md":L2,"../../../../docs/api/core/src/type-aliases/WizardEventPayloads.md":O2,"../../../../docs/api/core/src/type-aliases/WizardMiddleware.md":N2,"../../../../docs/api/devtools/src/README.md":W2,"../../../../docs/api/devtools/src/functions/WizardDevTools.md":U2,"../../../../docs/api/middleware/src/README.md":P2,"../../../../docs/api/middleware/src/variables/devToolsMiddleware.md":j2,"../../../../docs/api/middleware/src/variables/loggerMiddleware.md":B2,"../../../../docs/api/persistence/src/README.md":X2,"../../../../docs/api/persistence/src/classes/LocalStorageAdapter.md":H2,"../../../../docs/api/persistence/src/classes/MemoryAdapter.md":Z2,"../../../../docs/api/react/src/README.md":V2,"../../../../docs/api/react/src/classes/WizardStore.md":q2,"../../../../docs/api/react/src/functions/WizardProvider.md":Y2,"../../../../docs/api/react/src/functions/createWizardFactory.md":G2,"../../../../docs/api/react/src/functions/useWizard.md":Q2,"../../../../docs/api/react/src/functions/useWizardActions.md":K2,"../../../../docs/api/react/src/functions/useWizardContext.md":F2,"../../../../docs/api/react/src/functions/useWizardError.md":J2,"../../../../docs/api/react/src/functions/useWizardSelector.md":$2,"../../../../docs/api/react/src/functions/useWizardState.md":ex,"../../../../docs/api/react/src/functions/useWizardValue.md":nx,"../../../../docs/api/react/src/interfaces/IStepConfig.md":tx,"../../../../docs/api/react/src/interfaces/IValidatorAdapter.md":ax,"../../../../docs/api/react/src/interfaces/IWizardActions.md":ix,"../../../../docs/api/react/src/interfaces/IWizardConfig.md":rx,"../../../../docs/api/react/src/interfaces/IWizardContext.md":lx,"../../../../docs/api/react/src/interfaces/IWizardHandle.md":sx,"../../../../docs/api/react/src/interfaces/IWizardState.md":ox,"../../../../docs/api/react/src/interfaces/WizardProviderProps.md":cx,"../../../../docs/api/react/src/interfaces/WizardStepRendererProps.md":ux,"../../../../docs/api/react/src/type-aliases/PersistenceMode.md":dx,"../../../../docs/api/react/src/type-aliases/ValidationResult.md":fx,"../../../../docs/api/react/src/type-aliases/WizardMiddleware.md":px,"../../../../docs/api/react/src/variables/WizardStepRenderer.md":hx,"../../../../docs/api/react/src/variables/loggerMiddleware.md":mx}),yx=[/^react\/src\/README$/,/^react\/src\/functions\/(createWizardFactory|useWizard|useWizardActions|useWizardContext|useWizardError|useWizardSelector|useWizardState|useWizardValue|WizardProvider)$/,/^react\/src\/interfaces\/(IWizardConfig|IStepConfig|IWizardState|IWizardActions|IWizardContext|IValidatorAdapter|IWizardHandle|WizardProviderProps|WizardStepRendererProps)$/,/^react\/src\/type-aliases\/(PersistenceMode|ValidationResult|WizardMiddleware)$/,/^react\/src\/variables\/(WizardStepRenderer|loggerMiddleware)$/,/^adapter-zod\/src\/README$/,/^adapter-zod\/src\/classes\/ZodAdapter$/,/^adapter-yup\/src\/README$/,/^adapter-yup\/src\/classes\/YupAdapter$/,/^persistence\/src\/README$/,/^persistence\/src\/classes\/(LocalStorageAdapter|MemoryAdapter)$/,/^middleware\/src\/README$/,/^middleware\/src\/variables\/(loggerMiddleware|devToolsMiddleware)$/,/^devtools\/src\/README$/,/^devtools\/src\/functions\/WizardDevTools$/],bx=a=>yx.some(r=>r.test(a)),zx=Object.entries(gx).map(([a,r])=>{const l=a.replace("../../../../docs/api/","").replace(/\.md$/,""),s=l.split("/").slice(-1)[0].replace(/[-_]/g," ");return{slug:l,title:s,content:String(r),isUserFacing:bx(l)}}),vx=zx.sort((a,r)=>a.slug.localeCompare(r.slug)),eo=vx,xg=a=>a==="README"||a.endsWith("/README"),Ay=a=>a.replace(/\.md$/,"").replace(/\/$/,"")||"README",Uu=new Set(eo.map(a=>a.slug)),Pu=eo.filter(a=>a.isUserFacing),Sx=a=>Ay(a.replace(/^\.\//,"").replace(/^\//,""));function Ex(){const a=Gz(),r=Pu.find(d=>!xg(d.slug))?.slug||"README",l=Ay(a["*"]||r),s=eo.find(d=>d.slug===l)||Pu[0]||eo[0],u=Pu.filter(d=>!xg(d.slug));return s?Q.jsxs("section",{className:"section api-layout",children:[Q.jsxs("aside",{className:"api-sidebar",children:[Q.jsx("h2",{children:"API Reference"}),Q.jsx("p",{className:"api-note",children:"Generated from TypeDoc. Pick a module to explore the surface area."}),Q.jsx("div",{className:"api-list",children:u.map(d=>Q.jsx(Dl,{to:`/api/${d.slug}`,className:`api-link${d.slug===s.slug?" api-link--active":""}`,children:d.title},d.slug))})]}),Q.jsx("article",{className:"api-content markdown",children:Q.jsx(KE,{components:{a:({href:d,children:f,node:h,...g})=>{if(!d)return Q.jsx("a",{...g,children:f});if(d.startsWith("#"))return Q.jsx("a",{href:d,...g,children:f});if(/^https?:\/\//.test(d))return Q.jsx("a",{href:d,rel:"noreferrer",target:"_blank",...g,children:f});let p=Sx(d);return!Uu.has(p)&&Uu.has(`${p}/README`)&&(p=`${p}/README`),Uu.has(p)?Q.jsx(Dl,{to:`/api/${p}`,...g,children:f}):Q.jsx("a",{href:d,...g,children:f})}},children:s.content})})]}):Q.jsx("section",{className:"section api-layout",children:Q.jsxs("article",{className:"api-content",children:[Q.jsx("h2",{children:"API Reference"}),Q.jsxs("p",{children:["API docs are not available. Run ",Q.jsx("code",{children:"pnpm docs:api"})," first."]})]})})}const Qa="https://stackblitz.com/github/ZizzX/wizzard-packages/tree/dev/.stackblitz",xx=[{title:"Validation",description:"Zod/Yup adapters with step-level validation.",href:`${Qa}/validation`},{title:"Persistence",description:"LocalStorage + memory adapters with auto-save.",href:`${Qa}/persistence`},{title:"Navigation",description:"Sequential, visited, and free navigation modes.",href:`${Qa}/basic`},{title:"Custom Adapter",description:"Bring your own validation adapter.",href:`${Qa}/custom-adapter`},{title:"Custom Middleware",description:"Analytics, logging, and guardrails.",href:`${Qa}/middleware`},{title:"Advanced Flow",description:"Branching, guards, and async conditions.",href:`${Qa}/advanced-flow`},{title:"Core Engine",description:"Use @wizzard-packages/core without React bindings.",href:`${Qa}/core-engine`},{title:"Vue + Core",description:"Wire the core engine into a Vue 3 UI.",href:`${Qa}/vue-core`}];function Dx(){return Q.jsxs("section",{className:"section",children:[Q.jsxs("div",{className:"section-header",children:[Q.jsx("p",{className:"section-eyebrow",children:"Cookbook"}),Q.jsx("h2",{children:"Examples"}),Q.jsx("p",{className:"section-lead",children:"Start from working recipes and customize the steps for your product."})]}),Q.jsx("div",{className:"card-grid",children:xx.map(a=>Q.jsxs("a",{className:"card card--link",href:a.href,target:"_blank",rel:"noreferrer",children:[Q.jsx("h3",{children:a.title}),Q.jsx("p",{children:a.description}),Q.jsx("span",{className:"card-cta",children:"Open StackBlitz"})]},a.title))})]})}const Tx=`import type { IValidatorAdapter, ValidationResult } from '@wizzard-packages/core';

class CustomAdapter implements IValidatorAdapter {
  constructor(private schema: unknown) {}

  async validate(values: unknown): Promise<ValidationResult> {
    // return { isValid: boolean, errors?: Record<string, string> }
    return { isValid: true };
  }
}
`,Ax=`import type { WizardMiddleware } from '@wizzard-packages/core';

const analyticsMiddleware: WizardMiddleware = (api) => (next) => (action) => {
  // api.getState(), api.getData(), api.getConfig()
  // track action here
  return next(action);
};
`,wx=`import type { IPersistenceAdapter } from '@wizzard-packages/core';

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
`;function Rx(){return Q.jsxs("section",{className:"section learn-section",children:[Q.jsxs("div",{className:"section-header",children:[Q.jsx("p",{className:"section-eyebrow",children:"Extend"}),Q.jsx("h2",{children:"Build your own adapters, middleware, and persistence"}),Q.jsx("p",{className:"section-lead",children:"Wizzard Stepper is designed for extension. Bring your own validation, tracking, and storage without changing the core engine."})]}),Q.jsxs("div",{className:"learn-grid",children:[Q.jsxs("article",{className:"card learn-panel",children:[Q.jsx("h3",{children:"Custom validation adapter"}),Q.jsxs("p",{children:["Implement ",Q.jsx("code",{children:"IValidatorAdapter"})," to connect any schema or rules engine."]}),Q.jsx("pre",{className:"learn-code",children:Q.jsx("code",{children:Tx})})]}),Q.jsxs("article",{className:"card learn-panel",children:[Q.jsx("h3",{children:"Custom middleware"}),Q.jsxs("p",{children:["Implement ",Q.jsx("code",{children:"WizardMiddleware"})," for logging, analytics, or guardrails."]}),Q.jsx("pre",{className:"learn-code",children:Q.jsx("code",{children:Ax})})]}),Q.jsxs("article",{className:"card learn-panel",children:[Q.jsx("h3",{children:"Custom persistence"}),Q.jsxs("p",{children:["Implement ",Q.jsx("code",{children:"IPersistenceAdapter"})," to save wizard state to any backend or storage."]}),Q.jsx("pre",{className:"learn-code",children:Q.jsx("code",{children:wx})})]})]}),Q.jsxs("div",{className:"learn-actions",children:[Q.jsx(Dl,{to:"/examples",className:"button button--primary",children:"Open examples"}),Q.jsx(Dl,{to:"/api",className:"button button--ghost",children:"Browse API"})]})]})}const kx=gv([{path:"/",element:Q.jsx(Cv,{}),children:[{index:!0,element:Q.jsx(Lv,{})},{path:"api/*",element:Q.jsx(Ex,{})},{path:"examples",element:Q.jsx(Dx,{})},{path:"learn",element:Q.jsx(Rx,{})}]}],{basename:"/wizzard-packages/dev/"});function Ix(){return Q.jsx(Dv,{router:kx})}const Dg=document.getElementById("root");Dg&&H1.createRoot(Dg).render(Q.jsx(Ag.StrictMode,{children:Q.jsx(Ix,{})}));
