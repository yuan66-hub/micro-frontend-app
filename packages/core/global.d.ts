
export { };

declare global {
  interface Window {
    __CURRENT_HASH__: string;
    __CURRENT_SUB_APP__: string
  }
}
