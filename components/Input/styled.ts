import styled from "styled-components";

export const Container = styled.div`
  border: solid 1px #47ff63;
  color: #47ff63;
  background-color: #edfff0;
  box-sizing: border-box;
  margin-bottom: 8px;
  padding: 0 8px;
  position: relative;
  width: 300px;
  border-radius: 6px;
  height: fit-content;

  input {
    height: 100%;
    background-color: #edfff0;
    border: none;
    font-size: 16px;
    outline: 0;
    padding: 16px 0 10px;
    width: 100%;
  }

  label {
    height: 100%;
    font-size: 16px;
    position: absolute;
    transform-origin: top center;
    transform: translate(80px, 13px) scale(1);
    transition: all 0.25s ease-in-out; //speed
  }

  /** active label */
  &.active {
    label {
      opacity: 0;
    }
  }
`;
