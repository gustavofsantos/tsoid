export type FunctionPromiseA1<A, B> = (arg: A) => Promise<B>;
export type FunctionPromiseA2<A, B, C> = (arg0: A, arg1: B) => Promise<C>;
export type FunctionPromisePromiseA1<A, B> = (arg: Promise<A>) => Promise<B>;
