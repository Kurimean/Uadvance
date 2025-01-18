export interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: Date;
  dueDate?: Date;
  category: string;
  priority: 'high' | 'medium' | 'low';
  tags: string[];
  subtasks?: Todo[];
  progress: number;
}

export interface TodoState {
  items: Todo[];
  categories: string[];
  tags: string[];
  filter: {
    category?: string;
    priority?: Todo['priority'];
    completed?: boolean;
    search?: string;
  };
} 