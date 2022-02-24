import React, { useEffect, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
const TINY_MCE_API_KEY = "6pg5u1ebssmbyjcba68sak0bfhx28w247y9lcdnq1m5q94t1";

function MERichTextEditor({
  onChange,
  value,
  defaultValue,
  initialValue,
  onMount,
}) {
  const editorRef = useRef(null);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  const handleOnChange = (text) => {
    setContent(text);
    onChange && onChange(text);
  };
  const resetEditor = () => {
    setContent("");
  };

  useEffect(() => {
    onMount && onMount(resetEditor);
  });

  return (
    <>
      {loading && <small>Loading...</small>}
      <Editor
        onInit={(_, editor) => (editorRef.current = editor)}
        onInit={() => {
          setLoading(false);
        }}
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
    </>
  );
}

export default MERichTextEditor;
