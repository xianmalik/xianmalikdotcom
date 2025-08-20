/// <reference types="tailwindcss/tailwind-config" />

declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}
