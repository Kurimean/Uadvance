import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { setCustomColors } from '../store/themeSlice';
import { ThemeState } from '../types/theme';

export const useTheme = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme);

  const updateCustomColors = (colors: ThemeState['customColors']) => {
    dispatch(setCustomColors(colors));
  };

  const getThemeVariables = () => {
    if (theme.customColors) {
      return {
        '--primary-color': theme.customColors.primary,
        '--background-color': theme.customColors.background,
        '--text-color': theme.customColors.text,
        '--secondary-color': theme.customColors.secondary,
      };
    }
    return {};
  };

  return {
    currentTheme: theme.current,
    customColors: theme.customColors,
    updateCustomColors,
    getThemeVariables,
  };
}; 