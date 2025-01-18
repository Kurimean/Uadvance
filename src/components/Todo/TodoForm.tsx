import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo } from '../../store/todoSlice';
import { RootState } from '../../store';
import './TodoForm.css';

const TodoForm: React.FC = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state: RootState) => state.todo.categories);
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(categories[0]);
  const [priority, setPriority] = useState<'high' | 'medium' | 'low'>('medium');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    dispatch(addTodo({
      title,
      description,
      category,
      priority,
      dueDate: dueDate ? new Date(dueDate) : undefined,
      completed: false,
      tags: [],
      progress: 0
    }));

    setTitle('');
    setDescription('');
    setCategory(categories[0]);
    setPriority('medium');
    setDueDate('');
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="添加新任务"
        className="todo-input"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="任务描述（可选）"
        className="todo-textarea"
      />
      <div className="form-row">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="todo-select"
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as 'high' | 'medium' | 'low')}
          className="todo-select"
        >
          <option value="high">高优先级</option>
          <option value="medium">中优先级</option>
          <option value="low">低优先级</option>
        </select>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="todo-input"
        />
      </div>
      <button type="submit" className="todo-submit">
        添加任务
      </button>
    </form>
  );
};

export default TodoForm; 