import React, { useRef } from "react";
import styles from "./CreatePostForm.module.sass";

interface CreatePostFormProps {
  handleSubmit: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    fileInput: React.RefObject<HTMLInputElement>,
    dayInput: React.RefObject<HTMLInputElement>,
    formRef: React.RefObject<HTMLFormElement>,
    descriptionInput: React.RefObject<HTMLTextAreaElement>
  ) => Promise<void>;
}

const CreatePostForm: React.FC<CreatePostFormProps> = ({ handleSubmit }) => {
  const formRef = useRef<HTMLFormElement>(null);
  const fileInput = useRef<HTMLInputElement>(null);
  const dayInput = useRef<HTMLInputElement>(null);
  const descriptionInput = useRef<HTMLTextAreaElement>(null);

  return (
    <form className={styles.form} ref={formRef}>
      <label>
        <span>Jour</span>
        <input type="number" name="day" ref={dayInput} required />
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
          handleSubmit(event, fileInput, dayInput, formRef, descriptionInput)
        }
      >
        Submit
      </button>
    </form>
    // <form
    //   method="POST"
    //   action="http://localhost:5000/uploadPhotos"
    //   encType="multipart/form-data"
    // >
    //   <div>
    //     <label>Upload photos</label>
    //     <input type="file" name="files" multiple required />
    //   </div>
    //   <div>
    //     <input type="submit" value="Upload" />
    //   </div>
    // </form>
  );
};

export default CreatePostForm;
