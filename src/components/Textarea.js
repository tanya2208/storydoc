import React, { memo, useRef } from "react";
import autosize from "./autosize";

function Textarea({ placeholder, updateValue, value }) {
  const textAreaRef = useRef(null);

  autosize(textAreaRef.current, value);

  return (
    <textarea
      ref={textAreaRef}
      rows={1}
      placeholder={placeholder}
      value={value}
      onChange={updateValue}
    ></textarea>
  );
}

export default memo(Textarea);
