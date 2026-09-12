/**
 * The bundler's `?raw` import, which reads a file as a string. The site gets
 * this type from Astro; here the tests that compare a headless script's output
 * against its checked-in file are the only users of it, and `tsc` alone knows
 * nothing about the suffix.
 */
declare module '*?raw' {
  const content: string;
  export default content;
}
