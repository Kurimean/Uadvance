import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../../store/themeSlice';
import { RootState } from '../../store';
import './ThemeSwitch.css';

const ThemeSwitch: React.FC = () => {
  const dispatch = useDispatch();
  const currentTheme = useSelector((state: RootState) => state.theme.current);

  const handleToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <div className="theme-switch">
      <input
        type="checkbox"
        id="theme-toggle"
        className="theme-toggle"
        checked={currentTheme === 'dark'}
        onChange={handleToggle}
      />
      <label htmlFor="theme-toggle" className="theme-toggle-label">
        <span className="theme-toggle-inner">
          <span className="theme-icon">🌞</span>
          <span className="theme-icon">🌙</span>
        </span>
      </label>
    </div>
  );
};

export default ThemeSwitch; 