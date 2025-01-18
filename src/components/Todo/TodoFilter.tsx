import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../../store/todoSlice';
import { RootState } from '../../store';
import './TodoFilter.css';

const TodoFilter: React.FC = () => {
  const dispatch = useDispatch();
  const { categories, filter } = useSelector((state: RootState) => state.todo);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setFilter({
      ...filter,
      category: e.target.value || undefined
    }));
  };

  const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setFilter({
      ...filter,
      priority: e.target.value as 'high' | 'medium' | 'low' | undefined
    }));
  };

  const handleCompletedChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    dispatch(setFilter({
      ...filter,
      completed: value === 'all' ? undefined : value === 'true'
    }));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setFilter({
      ...filter,
      search: e.target.value
    }));
  };

  return (
    <div className="todo-filter">
      <input
        type="text"
        placeholder="搜索任务..."
        value={filter.search || ''}
        onChange={handleSearchChange}
        className="filter-search"
      />
      
      <div className="filter-options">
        <select
          value={filter.category || ''}
          onChange={handleCategoryChange}
          className="filter-select"
        >
          <option value="">所有分类</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>

        <select
          value={filter.priority || ''}
          onChange={handlePriorityChange}
          className="filter-select"
        >
          <option value="">所有优先级</option>
          <option value="high">高优先级</option>
          <option value="medium">中优先级</option>
          <option value="low">低优先级</option>
        </select>

        <select
          value={filter.completed === undefined ? 'all' : filter.completed.toString()}
          onChange={handleCompletedChange}
          className="filter-select"
        >
          <option value="all">全部状态</option>
          <option value="false">未完成</option>
          <option value="true">已完成</option>
        </select>
      </div>
    </div>
  );
};

export default TodoFilter; 