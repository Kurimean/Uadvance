import React from 'react';
import { useDispatch } from 'react-redux';
import { Todo } from '../../types/todo';
import { updateTodo, deleteTodo } from '../../store/todoSlice';
import { Draggable } from 'react-beautiful-dnd';
import './TodoItem.css';

interface TodoItemProps {
  todo: Todo;
  index: number;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, index }) => {
  const dispatch = useDispatch();

  const handleToggleComplete = () => {
    dispatch(updateTodo({
      id: todo.id,
      completed: !todo.completed
    }));
  };

  const handleDelete = () => {
    dispatch(deleteTodo(todo.id));
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const progress = parseInt(e.target.value);
    dispatch(updateTodo({
      id: todo.id,
      progress
    }));
  };

  const priorityColors = {
    high: '#ff4d4f',
    medium: '#faad14',
    low: '#52c41a'
  };

  return (
    <Draggable draggableId={todo.id} index={index}>
      {(provided) => (
        <div
          className={`todo-item ${todo.completed ? 'completed' : ''}`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="todo-item-header">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={handleToggleComplete}
              className="todo-checkbox"
            />
            <h3 className="todo-title">{todo.title}</h3>
            <span 
              className="priority-badge"
              style={{ backgroundColor: priorityColors[todo.priority] }}
            >
              {todo.priority}
            </span>
          </div>
          
          {todo.description && (
            <p className="todo-description">{todo.description}</p>
          )}

          <div className="todo-details">
            <span className="todo-category">{todo.category}</span>
            {todo.dueDate && (
              <span className="todo-due-date">
                截止: {new Date(todo.dueDate).toLocaleDateString()}
              </span>
            )}
          </div>

          <div className="todo-progress">
            <input
              type="range"
              min="0"
              max="100"
              value={todo.progress}
              onChange={handleProgressChange}
              className="progress-slider"
            />
            <span className="progress-text">{todo.progress}%</span>
          </div>

          <div className="todo-tags">
            {todo.tags.map(tag => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>

          <button 
            className="delete-button"
            onClick={handleDelete}
          >
            删除
          </button>
        </div>
      )}
    </Draggable>
  );
};

export default React.memo(TodoItem); 