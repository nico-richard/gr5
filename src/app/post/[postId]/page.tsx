"use client";
import { useEffect, useState } from "react";
import { PostModel } from "../../../models/Post";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Spinner from "@/components/Spinner";
import { getPhotoServerUrl } from "@/constants";
import { PhotoModel } from "@/models/Photo";

const PostDetails = ({ params }: { params: { postId: string } }) => {
  const [post, setPost] = useState<PostModel | null>(null);
  const [photosForDay, setPhotosForDay] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    setIsSearching(true);
    axios
      .get(`/api/post/${params.postId}`)
      .then((response) => {
        setPost(response.data.post);
        setIsSearching(false);
      })
      .catch((error) => {
        console.error("There was an error fetching the posts!", error);
      });

    axios
      .get<{ photos: PhotoModel[] }>(`/api/photosForDay/${params.postId}`)
      .then((response) => {
        setPhotosForDay(response.data.photos.map((photo) => photo.name));
      })
      .catch((error) => {
        console.error("There was an error fetching the posts!", error);
      });
  }, [params.postId]);

  return (
    <div className="post-details">
      <div className="buttons">
        <button onClick={() => router.push(`/post/${+params.postId - 1}`)}>
          Jour précédent
        </button>
        <button onClick={() => router.push(`/`)}>Accueil</button>
        <button onClick={() => router.push(`/post/${+params.postId + 1}`)}>
          Jour suivant
        </button>
      </div>
      {isSearching ? (
        <Spinner />
      ) : !post ? (
        <h3>Pas de post ce jour là</h3>
      ) : (
        <>
          <h1>Jour {post.day}</h1>
          <p>{post.description}</p>
          <div className="photo-list">
            {!photosForDay || photosForDay.length === 0 ? (
              <h3>Pas de photos trouvées</h3>
            ) : (
              photosForDay.map((photo, index) => (
                <Image
                  key={index}
                  src={`${getPhotoServerUrl}${photo}`}
                  alt={`Photo ${photo}`}
                  width={600}
                  height={400}
                  sizes="100vw"
                  priority
                />
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default PostDetails;
