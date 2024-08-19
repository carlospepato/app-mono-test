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
  createdAt: string;
  user: {
    name: string;
    email: string;
  };
}

interface TimelineData {
  message: string;
  timeline: Post[];
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
      setProfile(data);
    }

    fetchProfile();
  }, []);

  const fetchPosts = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error("Token não encontrado.");
        return;
      }

      const response = await fetch('http://localhost:3333/timeline', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Falha ao buscar os posts.');
      }

      const data: TimelineData = await response.json();
      setPosts(data.timeline);
    } catch (error) {
      console.error('Erro ao buscar os posts:', error);
    }
  };

  useEffect(() => {
    fetchPosts(); // Chama a função fetchPosts ao carregar a página
  }, []);

  const handlePostCreated = () => {
    fetchPosts(); // Atualiza os posts após a criação de um novo post
  };

  return (
    <>
      <div className="max-w-4xl w-full mx-auto px-3">
        <CreatePost userId={profile?.user.id} onPostCreated={handlePostCreated} />
        <div className="w-full h-px bg-zinc-500 my-4"></div>
        <div className="w-full my-4">
          {posts.map((post) => (
            <CardPost 
              key={post.id} 
              content={post.content}
              userId= {profile?.user.id || ""}
              userName={post.user.name}
              postId={post.id}
            />
          ))}
        </div>
      </div>
    </>
  );
}
