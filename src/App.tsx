import React from 'react';
import { useSelector } from 'react-redux';
import Clock from './components/Clock/Clock';
import TodoForm from './components/Todo/TodoForm';
import TodoList from './components/Todo/TodoList';
import TodoFilter from './components/Todo/TodoFilter';
import TodoStats from './components/Todo/TodoStats';
import Calendar from './components/Calendar/Calendar';
import ThemeSwitch from './components/common/ThemeSwitch';
import { RootState } from './store';
import './App.css';

const App: React.FC = () => {
  const theme = useSelector((state: RootState) => state.theme.current);

  return (
    <div className={`app ${theme}-theme`}>
      <header className="app-header">
        <ThemeSwitch />
      </header>
      <main className="app-main">
        <div className="left-section">
          <div className="clock-section">
            <Clock type="digital" size="large" />
          </div>
          <div className="calendar-section">
            <Calendar />
          </div>
        </div>
        <div className="center-section">
          <TodoFilter />
          <TodoForm />
          <TodoList />
        </div>
        <div className="right-section">
          <TodoStats />
        </div>
      </main>
    </div>
  );
};

export default App; 