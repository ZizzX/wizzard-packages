/**
 * The bundler's `?raw` import, which reads a file as a string. The site gets
 * this type from Astro; here the test that compares the headless script's
 * output against the checked-in file is the only user of it, and `tsc` alone
 * knows nothing about the suffix.
 */
declare module '*?raw' {
  const content: string;
  export default content;
}
