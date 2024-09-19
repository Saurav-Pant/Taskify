export const ItemType = {
  TASK: "task",
};

export interface TaskType {
  createdAt: string;
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  deadline: string;
}
