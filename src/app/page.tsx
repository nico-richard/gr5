import PostList from "@/components/PostList";
import Image from "next/image";

const HomePage = () => {
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
          />
        </div>
      </h1>
      <PostList></PostList>
    </div>
  );
};

export default HomePage;
