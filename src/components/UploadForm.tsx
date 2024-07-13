"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import styles from "./UploadForm.module.sass";

const UploadForm: React.FC = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [day, setDay] = useState<number>(0);
  const [description, setDescription] = useState<string>("");

  const router = useRouter();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(Array.from(e.target.files));
    }
  };

  const handleDayChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDay(e.target.valueAsNumber);
  };
  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    if (day) {
      formData.append("day", day.toString());
    }
    [...selectedFiles].forEach((file) => {
      formData.append("photos", file);
    });

    try {
      await axios
        .post("https://localhost:5000/uploadPhotos", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log(response.data);
          axios.post("/api/post/new", {
            day: day,
            description: description,
          });
          axios.post("/api/photo/new", {
            day: day,
            photos: selectedFiles.map((file) => file.name),
          });
          router.push(`/post/${day}`);
        });
    } catch (error) {
      console.error("Error uploading photos:", error);
    }
  };

  return (
    <>
      <button className={styles.homeButton} onClick={() => router.push(`/`)}>
        Accueil
      </button>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div>
          <label>
            Jour
            <input
              type="number"
              value={day}
              onChange={handleDayChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Description
            <textarea
              value={description}
              onChange={handleDescriptionChange}
              rows={5}
              required
            />
          </label>
        </div>
        <input
          type="file"
          name="photos"
          onChange={handleFileChange}
          multiple
          required
        />
        <button type="submit">Ajouter Post</button>
      </form>
    </>
  );
};

export default UploadForm;
