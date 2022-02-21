import "./TextEditor.css";
import { useCallback, useEffect, useState } from "react";
import Quill from "quill";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";

const toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // toggled buttons
  ["image", "blockquote", "code-block"],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ script: "sub" }, { script: "super" }], // superscript/subscript
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  [{ direction: "rtl" }], // text direction

  [{ size: ["small", false, "large", "huge"] }], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],

  ["clean"], // remove formatting button
];

function TextEditor() {
  const [socket, setSocket] = useState();
  const [quill, setQuill] = useState();
  const { documentId } = useParams();

  //socket setup
  useEffect(() => {
    const s = io("https://backendgoogledocsclone.herokuapp.com/");
    setSocket(s);
    return () => {
      s.disconnect();
    };
  }, []);

  //
  useEffect(() => {
    if (socket == null || quill == null) return;

    const handler = (delta, oldDelta, source) => {
      if (source !== "user") return;
      socket.emit("send-changes", delta);
    };
    quill.on("text-change", handler);

    return () => {
      quill.off("text-change", handler);
    };
  }, [socket, quill]);

  //
  useEffect(() => {
    if (socket == null || quill == null) return;
    socket.once("load-document", (document) => {
      quill.setContents(document);
      quill.enable();
    });
    socket.emit("get-document", documentId);
  }, [socket, quill, documentId]);

  //
  useEffect(() => {
    if (socket == null || quill == null) return;
    const handler = (delta) => {
      quill.updateContents(delta);
    };
    socket.on("receive-changes", handler);
    return () => {
      socket.off("receive-changes", handler);
    };
  }, [socket, quill]);

  //save document for every 2 sec
  useEffect(() => {
    if (socket == null || quill == null) return;
    const interval = setInterval(() => {
      socket.emit("save-document", quill.getContents());
    }, 2000);
    return () => {
      clearInterval(interval);
    };
  }, [socket, quill]);

  //text-editor
  const wrapperRef = useCallback((wrapper) => {
    if (wrapper == null) return;
    wrapper.innerHTML = "";
    const editor = document.createElement("div");
    wrapper.append(editor);
    const quillData = new Quill(editor, {
      theme: "snow",
      modules: { toolbar: toolbarOptions },
    });
    quillData.disable();
    setQuill(quillData);
  }, []);

  return <div className="textEditor" ref={wrapperRef}></div>;
}

export default TextEditor;
