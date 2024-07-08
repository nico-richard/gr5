"use client";
import React from "react";
import styles from "./Post.module.sass";
import Image from "next/image";

interface PostProps {
  key: number;
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  onPostClick: (id: number) => void;
}

const Post: React.FC<PostProps> = ({
  id,
  title,
  description,
  imageUrl,
  onPostClick,
}) => {
  return (
    <div className={styles.post} onClick={() => onPostClick(id)}>
      <h2>{title}</h2>
      <p className={styles.description}>{description}</p>
      <div className={styles.image}>
        <Image src={`/images/${imageUrl}`} alt={title} fill sizes="10vw" />
      </div>
    </div>
  );
};

export default Post;
