import styled from "styled-components";

export const Container = styled.div`
  border: solid 1px #47ff63;
  color: #47ff63;
  background-color: #edfff0;
  box-sizing: border-box;
  margin-bottom: 8px;
  padding: 0 8px;
  position: relative;
  border-radius: 6px;
  width: fit-content;
  height: fit-content;

  textarea {
    height: 100%;
    background-color: #edfff0;
    border: none;
    font-size: 16px;
    outline: 0;
    padding: 5px 5px 5px;
    width: 300px;
    max-width: 300px;
    max-height: 100px;
    resize: none;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
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
