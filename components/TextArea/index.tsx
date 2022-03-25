import React, { ChangeEvent, createRef, FormEvent, useEffect } from "react";
import * as S from "./styled";

type Props = {
  name: string;
  value?: string;
  id?: string;
  placeholder?: string;
  onInput?: React.FormEventHandler<HTMLTextAreaElement>;
  onChange?: React.FormEventHandler<HTMLTextAreaElement>;
  children?: React.ReactNode;
};

export const TextArea = (props: Props) => {
  const textAreaRef = createRef<HTMLTextAreaElement>();
  // add active class
  const handleFocus = (e: any) => {
    const target = e.target;
    target.parentNode.parentNode.classList.add("active");
  };

  // remove active class
  const handleBlur = (e: any) => {
    const target = e.target;
    if (!target.value) {
      target.parentNode.parentNode.classList.remove("active");
    }
  };

  const onInputSetHeight = (e: FormEvent<HTMLTextAreaElement>) => {
    const textArea = e.target as any;
    textArea.style.height = "";
    textArea.style.height = textArea.scrollHeight + "px";
  };

  useEffect(() => {
    textAreaRef.current?.dispatchEvent(new Event("input", { bubbles: true }));

    return () => {};
  }, [props.value, textAreaRef]);

  return (
    <S.Container id={props.id || "floatInput"}>
      <div className="left">
        <label htmlFor={`${props.id}_floatField`}>{props.placeholder}</label>
        <textarea
          ref={textAreaRef}
          name={props.name}
          id={`${props.id}_floatField`}
          value={props.value}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onInput={(e: ChangeEvent<HTMLTextAreaElement>) => {
            onInputSetHeight(e);
            props.onInput && props.onInput(e);
          }}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
            props.onChange && props.onChange(e);
          }}
        />
      </div>
      <div>{props.children}</div>
    </S.Container>
  );
};
