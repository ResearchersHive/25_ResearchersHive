/* eslint-disable react/prop-types */
import Button from "react-bootstrap/Button";
import Spinner from 'react-bootstrap/Spinner';
import { useState, useRef } from "react";
import { FeaturesApi } from "../utils/requests";
import '@toast-ui/editor/dist/toastui-editor.css';

import { Editor } from '@toast-ui/react-editor';

const AiRewrite = ({ comment, setComment }) => {
  const [buttonContent, setButtonContent] = useState("✨");
  const editorRef = useRef();

  return (
    <div style={{ position: "relative" }}>
      <Editor
        as="textarea"
        initialEditType="wysiwyg"
        initialValue={comment}
        onChange={() => {
          setComment(editorRef.current.getInstance().getMarkdown());
        }}
        ref={editorRef}
      />
      <Button
        variant="secondary"
        style={{ position: "absolute", right: "10px", bottom: "10px" }}
        onClick={() => {
          setButtonContent(<Spinner animation="grow" size="sm" />);
          FeaturesApi.aiRewrite(comment).then((res) => {
            setComment(res.rewritten_text);
            setButtonContent("✨");
          }).catch((err) => {
            console.log(err);
            setButtonContent("✨");
          });
        }}
      >
        {buttonContent}
      </Button>
    </div>
  );
};

export default AiRewrite;
