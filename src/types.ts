export type WithId<T> = {
  [key in keyof T]: any;
} & {
  id: string;
};
