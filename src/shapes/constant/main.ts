// type FilterNever<T> = {
//   [K in keyof T]: T[K] extends never ? never : K;
// }[keyof T]

// type StaticMethodsWithParams<C extends typeof Operator> = {
//   [K in FilterNever<{
//     [X in keyof C]: X extends string
//       ? C[X] extends (...args: infer A) => any
//         ? Params extends A
//           ? X
//           : never
//         : never
//       : never;
//   }>]: C[K];
// }
