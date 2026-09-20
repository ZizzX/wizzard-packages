import{t as e}from"./validate-flow.DaXO45zI.js";var t=`{
  "id": "signup",
  "version": 1,
  "order": ["account", "billing", "done"],
  "steps": {
    "account": { "label": "Account", "validate": { "$ref": "account" } },
    "billing": {
      "label": "Billing",
      "when": { "$eq": [{ "$get": "data.account.plan" }, "team"] }
    },
    "done": { "label": "Done" }
  }
}`,n=Object.assign(Object.create(null),{account:(e,t)=>{let{email:n}=t.data.account??{};return typeof n==`string`&&n.includes(`@`)?null:{email:`Enter your email address.`}}}),r=`{
  "order": ["account", "billing", "invoice", "done"],
  "steps": {
    "invoice": { "label": "Invoice details" }
  }
}`,i=1e5,a=`https://zizzx.github.io/wizzard-packages/docs/server-driven/`,o=(e,t,n,r)=>({ok:!1,problems:[{path:e,code:`flow-not-loaded`,fix:r,url:a,message:`[wizzard] ${t}. ${n}. ${r}. ${a}`}]}),s=e=>typeof e==`object`&&!!e&&!Array.isArray(e);function c(e){let{order:t,steps:n}=e;if(t!==void 0&&(!Array.isArray(t)||t.some(e=>typeof e!=`string`)))return o(`order`,`order is not a list of step ids`,`It names the sequence the flow walks, and everything that reads it walks it as a list of strings`,`Send an array of step ids, or leave it out and the steps run in the order they are written`);if(n!==void 0){if(!s(n))return o(`steps`,`steps is not an object`,`Every flow is a map of step ids to the steps themselves`,`Send an object keyed by step id`);for(let[e,t]of Object.entries(n))if(!s(t))return o(`steps.${e}`,`step "${e}" is ${t===null?`null`:typeof t}, not an object`,`Each entry describes one step, and the validator reads fields off it`,`Send an object, empty if the step has nothing to say: "${e}": {}`)}return null}function l(t,n){try{let r=e(t,n);return r.length>0?{ok:!1,problems:r}:{ok:!0,flow:t}}catch(e){return o(``,`the definition could not be checked`,`the validator failed on it (${e.message})`,`This is a malformed payload rather than a flow with a mistake in it; check what the service sent`)}}function u(e,t){if(e.length>i)return o(``,`the payload is ${e.length} characters`,`Anything past ${i} is not a flow someone wrote`,`Check that the service is sending a definition and not a page of something else`);let n;try{n=JSON.parse(e)}catch(e){return o(``,`the payload is not JSON`,`parsing it failed (${e.message})`,`Check the response is the definition itself rather than an envelope around it`)}if(!s(n)||typeof n.id!=`string`||!s(n.steps))return o(``,`the payload is not a flow`,"A flow is an object with a string `id` and an object of `steps`",`Check the service is sending a flow definition`);let r=c(n);return r===null?l(n,t):r}function d(e,t,n){let r;try{r=JSON.parse(t)}catch(e){return o(``,`the patch is not JSON`,`parsing it failed (${e.message})`,`Check the response is the patch itself rather than an envelope around it`)}if(!s(r))return o(``,`the patch is not an object`,`A patch is a partial flow: the fields that changed, and nothing else`,`Send an object with the fields to replace`);let i=c(r);if(i!==null)return i;let a=l({...e,...r,steps:{...e.steps,...r.steps}},n);return a.ok?{ok:!0,patch:r}:{ok:!1,problems:a.problems}}export{n as a,r as i,u as n,t as r,d as t};