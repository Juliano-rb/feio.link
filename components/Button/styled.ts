import styled from "styled-components";

export const Button = styled.input<{
  color?: string;
  border?: string;
  width?: string;
}>`
  background-color: ${(props) => props.color || "#6347ff"};
  border: ${(props) => props.border || "1px solid #8c8c8c"};
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  font-weight: bold;
  width: ${(props) => props.width || "unset"};
  font-size: 1rem;
  color: white;
  border-radius: 6px;
  padding: 5px 20px;
`;
