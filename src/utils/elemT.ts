type ArrayElem<A> = A extends Array<infer Elem> ? Elem : never

export function elemT<T>(array: T): Array<ArrayElem<T>> {
    return array as any
}