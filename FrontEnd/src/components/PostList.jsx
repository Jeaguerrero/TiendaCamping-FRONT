import { fetchPosts } from "../Redux/postSlice";
import PostCard from "./PostCard";
import { useDispatch, useSelector } from 'react-redux';

const PostList = () => {
  const dispatch = useDispatch()
  const { items: posts, loading, error} = useSelector((state) => state.posts)

  useEffect(()=> (
    dispatch(fetchPosts())
  ), [dispatch])

  if (loading) return <p>Cargando publicaciones...</p>
  if (error) return <p>Error al cargar las publicaciones: {error}</p>

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
