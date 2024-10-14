import { useEffect, useState } from "react";
import PostCard from "./PostCard";

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(()=>{
    fetch('https://jsonplaceholder.typicode.com/posts') //localhost:8080/products API backend
    .then((response) => response.json())
    .then((data) => {
        setPosts(data) //Actualizamos el estado con los datos obtenidos
    })
    .catch((error) => {
        console.error('Error al obtener los datos:', error)
    })
  }, [])

  return (
    <>
      <h1>Publicaciones</h1>
      <div>
        {posts.map((post) => (
            <PostCard
            key={post.id}
            title={post.title}
            body={post.body}
            id={post.id}
            />
        ))}
      </div>
    </>
  );
};

export default PostList;
