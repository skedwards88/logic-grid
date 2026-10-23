export {};

declare global {
  namespace jest {
    interface Matchers<R> {
      toIncludeOneOf(item1: string | number, item2: string | number): R;
    }
  }
}
