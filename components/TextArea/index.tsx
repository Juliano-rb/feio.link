import React, { createRef, useEffect } from "react";
import * as S from "./styled";

type Props = Partial<HTMLTextAreaElement> & {
  label?: string;
};

export const TextArea = (props: Props) => {
  const textAreaRef = createRef<HTMLTextAreaElement>();
  // add active class
  const handleFocus = (e: any) => {
    const target = e.target;
    target.parentNode.classList.add("active");
  };

  // remove active class
  const handleBlur = (e: any) => {
    const target = e.target;
    if (!target.value) {
      target.parentNode.classList.remove("active");
    }
  };

  const onInputSetHeight = (e: any) => {
    const textArea = e.target;
    textArea.style.height = "";
    textArea.style.height = textArea.scrollHeight + "px";
  };

  return (
    <S.Container id={props.id || "floatInput"}>
      <label htmlFor="floatField">{props.label}</label>
      <textarea
        ref={textAreaRef}
        id={"floatField"}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onInput={onInputSetHeight}
      />
    </S.Container>
  );
};