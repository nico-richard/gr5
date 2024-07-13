"use client";
import React, { useEffect, useState } from "react";
import styles from "./Post.module.sass";
import Image from "next/image";
import axios from "axios";
import { getPhotoServerUrl } from "@/constants";
import { PhotoModel } from "@/models/Photo";

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

  useEffect(() => {
    axios
      .get<{ photos: PhotoModel[] }>(`/api/photosForDay/${day}`)
      .then((response) => {
        if (response.data.photos.length > 0) {
          setImage(response.data.photos[0].name);
        }
      })
      .catch((error) => {
        console.error("There was an error fetching the posts!", error);
      });
  }, [day, image]);

  return (
    <div className={styles.post} onClick={() => onPostClick(+day)}>
      <h2>Jour {day}</h2>
      <p className={styles.description}>{description}</p>
      {imageName ? (
        <div className={styles.imageContainer}>
          <Image
            src={`${getPhotoServerUrl}${image}`}
            alt={day}
            fill
            sizes="50vw"
            priority
          />
        </div>
      ) : null}
    </div>
  );
};

export default Post;
