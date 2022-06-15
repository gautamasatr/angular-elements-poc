export class Todo {
  userId!: number;
  id!: number;
  title!: string;
  completed!: boolean;

  static parse(data: any): Todo{
    const parsed = new Todo();
    parsed.userId = data?.userId;
    parsed.id = data?.id;
    parsed.title = data?.title;
    parsed.completed = data?.completed;
    return parsed
  }
}