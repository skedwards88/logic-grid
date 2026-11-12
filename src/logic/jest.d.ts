export {};

declare global {
  namespace jest {
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
    interface Matchers<R> {
      toIncludeOneOf: (item1: string | number, item2: string | number) => R;
    }
  }
}
