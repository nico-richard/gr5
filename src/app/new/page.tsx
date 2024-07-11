"use client";
import CreatePostForm from "@/components/CreatePostForm";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Upload() {
  const allowedExtensions = ["jpg", "jpeg", "png"];
  const router = useRouter();

  async function uploadFiles(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    fileInput: React.RefObject<HTMLInputElement>,
    dayInput: React.RefObject<HTMLInputElement>,
    formRef: React.RefObject<HTMLFormElement>,
    descriptionInput: React.RefObject<HTMLTextAreaElement>
  ) {
    event.preventDefault();

    const formData = new FormData();
    const fileValue = fileInput.current?.files;
    const dayValue = dayInput.current?.value;
    const descriptionValue = descriptionInput.current?.value;

    if (fileValue) {
      Array.from(fileValue).forEach((file) => {
        const fileExtension = file.name.split(".").pop();
        if (allowedExtensions.includes(fileExtension!)) {
          formData.append("files", file);
        }
      });
    }
    if (dayValue && descriptionValue) {
      formData.append("day", dayValue);
      formData.append("description", descriptionValue);
      axios.post("/api/post/new", {
        day: dayValue,
        description: descriptionValue,
      });
      const postId = dayValue.split(" ").pop();
      router.push(`/post/${postId}`);
      formRef.current?.reset();
    }

    if (formData.has("files")) {
      await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
    } else {
      console.log("No valid files to upload.");
    }
  }

  return <CreatePostForm uploadFiles={uploadFiles} />;
}
