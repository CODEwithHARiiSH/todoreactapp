import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../app/store';
import { toggleTheme } from '../features/todo/themeSlice';
import styled from '@emotion/styled';
import { Theme, useTheme } from "../ThemeProvider";

const ToggleContainer = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  align-items: center;
  gap: 15px; 
`;

const ToggleSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
`;

const ToggleInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + span {
    background-color: #2196F3;
    &:before {
      transform: translateX(26px);
    }
  }

  &:focus + span {
    box-shadow: 0 0 1px #2196F3;
  }
`;

const ToggleSlider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: .4s;
  border-radius: 34px;

  &:before {
    content: "";
    height: 26px;
    width: 26px;
    background-color: white;
    position: absolute;
    top: 4px;
    left: 4px;
    transition: .4s;
    border-radius: 50%;
  }
`;

const ThemeText = styled.span`
  font-size: 16px; 
`;

const ThemeToggle: React.FC = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme); 
  const styleTheme = useTheme() as Theme;
  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  return (
    <ToggleContainer>
      <ThemeText style={{color:styleTheme.textColor}}>{theme === 'light' ? 'Light' : 'Dark'}</ThemeText>
      <ToggleSwitch title='Change Theme'>
        <ToggleInput type="checkbox" checked={theme === 'light'} onChange={handleToggleTheme} />
        <ToggleSlider />
      </ToggleSwitch>
    </ToggleContainer>
  );
};

export default ThemeToggle;
