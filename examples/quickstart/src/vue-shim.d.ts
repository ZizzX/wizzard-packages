// Single-file components are compiled by the bundler, not by tsc; this is the
// shim every Vue-in-TypeScript project carries so an import of one type-checks.
declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<Record<string, never>, Record<string, never>, unknown>;
  export default component;
}
