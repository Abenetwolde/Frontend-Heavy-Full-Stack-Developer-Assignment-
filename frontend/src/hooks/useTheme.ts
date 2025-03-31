import { useAppDispatch, useAppSelector } from '../store/hooks';
import { toggleTheme, setTheme } from '../features/theme/themeSlice';

export const useTheme = () => {
  const dispatch = useAppDispatch();
  const mode = useAppSelector((state) => state.theme.mode);

  const toggle = () => dispatch(toggleTheme());
  const setMode = (mode: 'light' | 'dark') => dispatch(setTheme(mode));

  return { mode, toggle, setMode };
};