"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Post from "../components/Post";

interface Post {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
}

const HomePage = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    axios
      .get("/api/posts")
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the posts!", error);
      });
  }, []);

  return (
    <div>
      <h1>Travel Blog</h1>
      {posts.map((post) => (
        <Post
          key={post.id}
          title={post.title}
          description={post.description}
          imageUrl={post.imageUrl}
        />
      ))}
    </div>
  );
};

export default HomePage;
