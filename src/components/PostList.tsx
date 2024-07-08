"use client";
import React, { useEffect, useState } from "react";
import styles from "./PostList.module.sass";
import { PostModel } from "@/app/models/Post";
import axios from "axios";
import Post from "./Post";
import Spinner from "./Spinner";
import { useRouter } from "next/navigation";

const PostList = () => {
  const [posts, setPosts] = useState<PostModel[]>([]);
  const router = useRouter();

  useEffect(() => {
    axios
      .get("/api/posts")
      .then((response) => {
        setPosts(response.data.posts);
      })
      .catch((error) => {
        console.error("There was an error fetching the posts!", error);
      });
  }, []);

  const onPostClick = (id: number) => {
    router.push(`/post/${id}`);
  };

  return (
    <>
      <div className={styles.postList}>
        {!posts ? (
          <Spinner />
        ) : (
          posts.map((post) => (
            <Post
              key={post.id}
              id={post.id}
              title={post.title}
              description={post.description}
              imageUrl={post.imageUrl}
              onPostClick={onPostClick}
            />
          ))
        )}
      </div>
    </>
  );
};

export default PostList;
