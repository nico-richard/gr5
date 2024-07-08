"use client";
import { useEffect, useState } from "react";
import { PostModel } from "../../models/Post";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";

const PostDetails = ({ params }: { params: { postId: string } }) => {
  const [post, setPost] = useState<PostModel | null>(null);
  const router = useRouter();

  useEffect(() => {
    axios
      .get(`/api/post/${params.postId}`)
      .then((response) => {
        setPost(response.data.post);
      })
      .catch((error) => {
        console.error("There was an error fetching the posts!", error);
      });
  }, [params.postId]);

  if (!post) {
    return <div>Chargement en cours...</div>;
  }

  return (
    <div className="post-details">
      <button onClick={() => router.push(`/`)}>Retour</button>
      <h1>{post.title}</h1>
      <p>{post.description}</p>
      <Image
        src={`/images/${post.imageUrl}`}
        alt={`Photo ${post.id}`}
        width={600}
        height={400}
        sizes="10vw"
      />
    </div>
  );
};

export default PostDetails;
