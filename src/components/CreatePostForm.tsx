import React, { useRef, useState } from "react";
import styles from "./CreatePostForm.module.sass";
import { PostModel } from "@/models/Post";

interface CreatePostFormProps {
  uploadFiles: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    fileInput: React.RefObject<HTMLInputElement>,
    dayInput: React.RefObject<HTMLInputElement>,
    formRef: React.RefObject<HTMLFormElement>,
    descriptionInput: React.RefObject<HTMLTextAreaElement>
  ) => Promise<void>;
}

const CreatePostForm: React.FC<CreatePostFormProps> = ({ uploadFiles }) => {
  const formRef = useRef<HTMLFormElement>(null);
  const fileInput = useRef<HTMLInputElement>(null);
  const dayInput = useRef<HTMLInputElement>(null);
  const descriptionInput = useRef<HTMLTextAreaElement>(null);

  return (
    <form className={styles.form} ref={formRef}>
      <label>
        <span>Jour</span>
        <input type="text" name="day" ref={dayInput} required />
      </label>
      <label>
        <span>Description</span>
        <textarea name="description" ref={descriptionInput} required />
      </label>
      <label>
        <span>Upload files</span>
        <input type="file" name="files" multiple ref={fileInput} required />
      </label>
      <button
        type="submit"
        onClick={(event) =>
          uploadFiles(event, fileInput, dayInput, formRef, descriptionInput)
        }
      >
        Submit
      </button>
    </form>
  );
};

export default CreatePostForm;
