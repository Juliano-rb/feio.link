import React, { useEffect } from "react";
import * as S from "./styled";

type Props = Partial<HTMLTextAreaElement> & {
  label?: string;
};

export const Input = (props: Props) => {
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
    target.removeAttribute("placeholder");
  };

  const onInputFixHeight = (e: any) => {
    const textArea = e.target;
    textArea.style.height = "";
    textArea.style.height = textArea.scrollHeight + "px";
  };

  useEffect(() => {
    // register events
    const bindEvents = (element: any) => {
      const floatField = element.querySelector("textarea");
      floatField.addEventListener("focus", handleFocus);
      floatField.addEventListener("blur", handleBlur);
    };

    const floatContainer = document.getElementById(props.id || "floatInput");
    console.log(floatContainer);
    if (floatContainer?.querySelector("textarea")?.value) {
      floatContainer?.classList.add("active");
    }

    floatContainer && bindEvents(floatContainer);
  }, [props.id]);
  return (
    <S.Container id={props.id || "floatInput"}>
      <label htmlFor="floatField">{props.label}</label>
      <textarea id={"floatField"} onInput={onInputFixHeight} />
    </S.Container>
  );
};
