"use client";
import React, { useEffect, useState } from "react";
import styles from "./Post.module.sass";
import Image from "next/image";

interface PostProps {
  day: string;
  description: string;
  imageName?: string;
  onPostClick: (id: number) => void;
}

const Post: React.FC<PostProps> = ({
  day,
  description,
  imageName,
  onPostClick,
}) => {
  const [image, setImage] = useState<string>("");
  console.log(process.cwd());

  useEffect(() => {
    const getImage = async (name: string) => {
      setImage(await import(`/public/uploads/${name}`));
    };
    imageName && getImage(imageName);
  }, [imageName]);

  return (
    <div className={styles.post} onClick={() => onPostClick(+day)}>
      <h2>Jour {day}</h2>
      <p className={styles.description}>{description}</p>
      {imageName ? (
        <div className={styles.imageContainer}>
          <Image src={image} alt={day} fill sizes="50vw" priority />
        </div>
      ) : null}
    </div>
  );
};

export default Post;
