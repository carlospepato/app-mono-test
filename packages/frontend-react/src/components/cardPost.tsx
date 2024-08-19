import { useEffect, useState } from "react";
import { Heart, UserCircle } from "phosphor-react";
import { apiUrl } from "../../config/config";

interface CardPostProps {
  postId: string;
  content: string;
  userId: string;
  userName: string;
}


interface DataLiked {
  id: string;
  postId: string;
  userId: string;
}

export function CardPost({ postId, content, userName, userId }: CardPostProps) {
  // const [userName, setUserName] = useState<string>("");
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [likeId, setLikeId] = useState<string | null>(null);
  const [qttLikes, setQttLikes] = useState<number>(0);

  useEffect(() => {
    async function checkIfLiked() {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error("No token found");
          return;
        }

        const response = await fetch(`${apiUrl}/like`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch likes.');
        }

        const data: { likes: DataLiked[] } = await response.json();
        const likedPost = data.likes.find(like => like.postId === postId && like.userId === userId)
        const qttLikes = data.likes.filter(like => like.postId === postId).length;

        if (likedPost) {
          setIsLiked(true);
          setLikeId(likedPost.id);
        }
        setQttLikes(qttLikes);
      } catch (error) {
        console.error("Error checking like status:", error);
      }
    }
    checkIfLiked();
  }, [postId, userId]);

  async function handleLike() {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error("No token found");
        return;
      }

      const response = await fetch(`${apiUrl}/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          userid: userId,
          postid: postId
        })
      });

      if (!response.ok) {
        throw new Error('Failed to like post.');
      }

      const data = await response.json();
      setLikeId(data.like.id);
      setIsLiked(true);
      setQttLikes(prev => prev + 1);
    } catch (error) {
      console.error("Error liking post:", error);
    }
  }

  async function handleUnlike() {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error("No token found");
        return;
      }

      const response = await fetch(`${apiUrl}/like/${likeId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to unlike post.');
      }

      setIsLiked(false);
      setLikeId(null);
      setQttLikes(prev => prev - 1);
    } catch (error) {
      console.error("Error unliking post:", error);
    }
  }

  async function handleLikeToggle() {
    if (isLiked) {
      await handleUnlike();
    } else {
      await handleLike();
    }
  }

  return (
    <div className="w-full bg-zinc-700 rounded-lg shadow-md p-4 mt-6">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-start w-96">
          <UserCircle size={22} />
          <div className="flex flex-col ml-2">
            <span className="font-semibold text-primary">{userName}</span>
          </div>
        </div>
        <div className="w-auto text-zinc-200">
          <span>{content}</span>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={handleLikeToggle}>
            <Heart size={22} weight={isLiked ? 'fill' : 'regular'} className={`${isLiked ? 'text-primary' : 'text-white'}`} />
          </button>
          <span className="text-xs font-semibold">{qttLikes}</span>
        </div>
      </div>
    </div>
  );
}
