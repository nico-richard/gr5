import React from "react";

interface PostProps {
  title: string;
  description: string;
  imageUrl: string;
}

const Post: React.FC<PostProps> = ({ title, description, imageUrl }) => {
  return (
    <div>
      <h2>{title}</h2>
      <p>{description}</p>
      <img src={imageUrl} alt={title} />
    </div>
  );
};

export default Post;
