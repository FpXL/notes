export type Todo = { text: string; id: number; createdAt: number; isFinished: boolean }
export type Note = { name: string; id: number; createdAt: number; todos: Todo[] }
