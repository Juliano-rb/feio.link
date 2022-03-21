import React, { useEffect } from "react";
import * as S from "./styled";

type Props = Partial<HTMLInputElement> & {
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

  useEffect(() => {
    // register events
    const bindEvents = (element: any) => {
      const floatField = element.querySelector("input");
      floatField.addEventListener("focus", handleFocus);
      floatField.addEventListener("blur", handleBlur);
    };

    const floatContainer = document.getElementById(props.id || "floatInput");
    console.log(floatContainer);
    if (floatContainer?.querySelector("input")?.value) {
      floatContainer?.classList.add("active");
    }

    floatContainer && bindEvents(floatContainer);
  }, [props.id]);
  return (
    <S.Container id={props.id || "floatInput"}>
      <label htmlFor="floatField">{props.label}</label>
      <input id={"floatField"} type="text" />
    </S.Container>
  );
};
