export type Morphism<I extends unknown[], O> = (...input: I) => O
export type UnaryMorphism<I, O> = (input: I) => O
export type AnyMorphism = Morphism<any[], any>
export type UnknownMorphism = Morphism<unknown[], unknown>

export type Predicate<T extends unknown[]> = Morphism<T, boolean>
export type UnaryPredicate<T> = UnaryMorphism<T, boolean>
