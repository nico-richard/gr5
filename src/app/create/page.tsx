"use client";
import { useState } from "react";
import axios from "axios";

const CreatePostPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (image) {
      formData.append("image", image);
    }

    try {
      await axios.post("/api/posts", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      // Rediriger ou mettre à jour l'état après le succès
    } catch (error) {
      console.error("There was an error creating the post!", error);
    }
  };

  return (
    <div>
      <h1>Create a new post</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
        <input
          type="file"
          onChange={(e) => setImage(e.target.files![0] || null)}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreatePostPage;
