import React, { ChangeEvent, createRef, FormEvent, useState } from "react";
import * as S from "./styled";

type Props = {
  name: string;
  value?: string;
  id?: string;
  placeholder?: string;
  onInput?: React.FormEventHandler<HTMLTextAreaElement>;
  onChange?: React.FormEventHandler<HTMLTextAreaElement>;
};

export const TextArea = (props: Props) => {
  const [inputValue, setInputValue] = useState(props.value || "");
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

  const onInputSetHeight = (e: FormEvent<HTMLTextAreaElement>) => {
    const textArea = e.target as any;
    textArea.style.height = "";
    textArea.style.height = textArea.scrollHeight + "px";
  };

  return (
    <S.Container id={props.id || "floatInput"}>
      <label htmlFor={`${props.id}_floatField`}>{props.placeholder}</label>
      <textarea
        ref={textAreaRef}
        name={props.name}
        id={`${props.id}_floatField`}
        value={inputValue}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onInput={(e: ChangeEvent<HTMLTextAreaElement>) => {
          onInputSetHeight(e);
          props.onInput && props.onInput(e);
        }}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
          setInputValue(e.target.value);
          props.onChange && props.onChange(e);
        }}
      />
    </S.Container>
  );
};
