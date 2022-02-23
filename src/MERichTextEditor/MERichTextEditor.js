import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
const TINY_MCE_API_KEY = "3fpefbsmtkh71yhtjyykjwj5ezs3a5cac5ei018wvnlg2g0r";

function MERichTextEditor({ onChange }) {
    const editorRef = useRef(null);
  //   const log = () => {
  //     if (editorRef.current) {
  //       console.log(editorRef.current.getContent());
  //     }
  //   };

  const handleOnChange = (content) => {
    console.log("I am teh content my geee", content);
    onChange && onChange(content);
  };
  return (
    <>
      <Editor
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue="<p>This is the initial content of the editor.</p>"
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
      {/* <button onClick={log}>Log editor content</button> */}
    </>
  );
}

export default MERichTextEditor;
