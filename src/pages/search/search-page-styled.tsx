import styled from 'styled-components';

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

export const InputField = styled.input`
  width: 300px;
  height: 40px;
  margin: 10px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

export const Suggestions = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  max-height: 100px;
  overflow-y: auto;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 300px;
  position: absolute;
  background-color: white;
  z-index: 1;
  top: 152px;
`;

export const SuggestionItem = styled.li`
  padding: 5px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;
