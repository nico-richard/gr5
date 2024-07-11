"use client";
import React, { useEffect, useState } from "react";
import styles from "./PostList.module.sass";
import { PostModel } from "@/models/Post";
import Post from "./Post";
import Spinner from "./Spinner";
import { useRouter } from "next/navigation";

interface PostListProps {
  posts: PostModel[];
  getFirstImageOfDay: (post: PostModel) => Promise<string>;
}

const PostList: React.FC<PostListProps> = ({ posts, getFirstImageOfDay }) => {
  const router = useRouter();
  const [imageNames, setImageNames] = useState<string[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      const promises = posts.map((post) => getFirstImageOfDay(post));

      try {
        const results = await Promise.all(promises);
        setImageNames(results);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, [posts, getFirstImageOfDay]);

  const onPostClick = (id: number) => {
    router.push(`/post/${id}`);
  };

  return (
    <>
      <div className={styles.postList}>
        {!posts ? (
          <Spinner />
        ) : (
          posts.map((post, index) => (
            <Post
              key={index}
              day={post.day}
              description={post.description}
              onPostClick={onPostClick}
              imageName={imageNames[index]}
            />
          ))
        )}
      </div>
    </>
  );
};

export default PostList;
