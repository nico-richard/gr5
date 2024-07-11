"use client";
import PostList from "@/components/PostList";
import Image from "next/image";
import { useEffect, useState } from "react";
import { PostModel } from "../models/Post";
import axios from "axios";
import { useRouter } from "next/navigation";
import { response } from "express";

const HomePage = () => {
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

  const getFirstImageOfDay = (post: PostModel): Promise<string> => {
    return axios.get(`/api/photosForDay/${post.day}`).then((response) => {
      return response.data.photos[0];
    });
  };

  return (
    <div>
      <h1 className="mainTitle">
        Sur le GR5
        <div className="icon">
          <Image
            src="/icons/randonnee.png"
            alt="Icône"
            width={50}
            height={50}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
            priority
          />
        </div>
      </h1>
      <button
        onClick={() => {
          router.push("/new");
        }}
        className="add-button"
      >
        Ajouter
      </button>
      <PostList
        posts={posts}
        getFirstImageOfDay={getFirstImageOfDay}
      ></PostList>
    </div>
  );
};

export default HomePage;
