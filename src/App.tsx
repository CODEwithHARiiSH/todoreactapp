import React from 'react';
import { Provider, useSelector } from 'react-redux';
import { ThemeProvider } from '@emotion/react';
import styled from '@emotion/styled';
import { RootState, store } from './app/store';
import { lightTheme, darkTheme } from './theme';
import TaskList from './components/TaskList';
import ThemeToggle from './components/themeToggle';
import Task from './components/Task';


const StyledAppContainer = styled.div`

  //  min-height: 100vh;
`;

const App: React.FC = () => {
  const theme = useSelector((state: RootState) => state.theme);
  const selectedTheme = theme === 'light' ? lightTheme : darkTheme;

  return (
    <Provider store={store}>
      <ThemeProvider theme={selectedTheme}>
        <StyledAppContainer>
          <Task />
          <TaskList />
          <ThemeToggle />
        </StyledAppContainer>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
