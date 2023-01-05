export const checkIsSomething = <T>(input: T): input is NonNullable<T> =>
  input !== null && input !== undefined
