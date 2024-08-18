import { useEffect, useState } from "react";
import { CardPost } from "../../components/cardPost";
import { CreatePost } from "../../components/createPost";

interface ProfileData {
  message: string;
  user: UserData;
}

interface UserData {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

interface Post {
  id: string;
  content: string;
  userid: string;
}

interface PostData {
  message: string;
  posts: Post[];
}

export function Home() {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    async function fetchProfile() {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error("No token found");
        return;
      }

      const response = await fetch('http://localhost:3333/profile', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setProfile(data); // Assume que `data.user.id` é o `userId`
    }

    fetchProfile();
  }, []);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error("Token não encontrado.");
          return;
        }

        const response = await fetch('http://localhost:3333/posts', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Falha ao buscar os posts.');
        }

        const data: PostData = await response.json();
        setPosts(data.posts); // Atualiza o estado com os posts
      } catch (error) {
        console.error('Erro ao buscar os posts:', error);
      }
    }

    fetchPosts();
  }, []);

  // Função chamada após a criação de um novo post
  const handlePostCreated = (newPost: Post) => {
    // Adiciona o novo post no início do array de posts existentes
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  return (
    <>
      <div className="max-w-4xl w-full mx-auto px-3">
        <CreatePost userId={profile?.user.id} onPostCreated={handlePostCreated} />
        <div className="w-full h-px bg-zinc-500 my-4"></div>
        {posts.map((post) => (
          <CardPost 
            key={post.id} 
            content={post.content} 
            userId={post.userid}
            postId={post.id}
          />
        ))}
      </div>
    </>
  );
}
