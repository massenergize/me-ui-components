import React, { useEffect, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
const TINY_MCE_API_KEY = "3fpefbsmtkh71yhtjyykjwj5ezs3a5cac5ei018wvnlg2g0r";

function MERichTextEditor({
  onChange,
  value,
  defaultValue,
  initialValue,
  onMount,
}) {
  const editorRef = useRef(null);
  const [content, setContent] = useState("");

  const handleOnChange = (content) => {
    onChange && onChange(content);
  };
  const resetEditor = () => {
    setContent("");
  };

  useEffect(() => {
    onMount && onMount(resetEditor);
  });

  return (
    <>
      <Editor
        onInit={(_, editor) => (editorRef.current = editor)}
        initialValue={value || defaultValue || initialValue}
        value={content}
        onEditorChange={handleOnChange}
        init={{
          height: 350,
          menubar: false,

          plugins: [
            "advlist autolink lists link image charmap print preview anchor forecolor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table paste code help wordcount",
          ],
          toolbar:
            "undo redo | formatselect | bold italic backcolor forecolor | alignleft aligncenter alignright alignjustify | link | image | bullist numlist outdent indent |  fontselect | fontsizeselect",
        }}
        apiKey={TINY_MCE_API_KEY}
      />
      <button onClick={resetEditor}>Log editor content</button>
    </>
  );
}

export default MERichTextEditor;
