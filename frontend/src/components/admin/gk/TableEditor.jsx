import React, { useState, useRef } from "react";
import JoditEditor from "jodit-react";

const TableEditor = (props) => {
  const editor = useRef(null);
  //   const [content, setContent] = useState("");

  return <JoditEditor ref={editor} tabIndex={1} {...props} />;
};

export default TableEditor;
