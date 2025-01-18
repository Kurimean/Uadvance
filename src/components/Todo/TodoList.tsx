import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import TodoItem from './TodoItem';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';
import { updateTodo } from '../../store/todoSlice';
import './TodoList.css';

const TodoList: React.FC = () => {
  const dispatch = useDispatch();
  const { items, filter } = useSelector((state: RootState) => state.todo);

  const filteredItems = items.filter(item => {
    if (filter.category && item.category !== filter.category) return false;
    if (filter.priority && item.priority !== filter.priority) return false;
    if (filter.completed !== undefined && item.completed !== filter.completed) return false;
    if (filter.search) {
      const searchLower = filter.search.toLowerCase();
      return (
        item.title.toLowerCase().includes(searchLower) ||
        item.description?.toLowerCase().includes(searchLower)
      );
    }
    return true;
  });

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;
    
    // 更新任务顺序
    const reorderedItems = Array.from(filteredItems);
    const [removed] = reorderedItems.splice(sourceIndex, 1);
    reorderedItems.splice(destinationIndex, 0, removed);

    // 更新每个任务的顺序
    reorderedItems.forEach((item, index) => {
      dispatch(updateTodo({ id: item.id, order: index }));
    });
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="todo-list">
        {(provided) => (
          <div
            className="todo-list"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {filteredItems.length === 0 ? (
              <div className="todo-empty">暂无待办事项</div>
            ) : (
              filteredItems.map((todo, index) => (
                <TodoItem 
                  key={todo.id} 
                  todo={todo} 
                  index={index}
                />
              ))
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default TodoList; 