import { useEffect, useState } from "react";
import { Heart, UserCircle } from "phosphor-react";

interface CardPostProps {
  postId: string;
  content: string;
  userId: string;
}

interface UserData {
  name: string;
  email: string;
}

interface dataLiked{
  message: string;
  like: likeProps
}

interface likeProps{
  id: string;
  postid: string;
  userid: string;
}

export function CardPost({ postId, content, userId }: CardPostProps) {
  const [userName, setUserName] = useState<string>("");
  const [dataLiked, setDataLiked] = useState<dataLiked>();
  const [isLiked, setIsLiked] = useState<boolean>(false);


  useEffect(() => {
    async function fetchUserName() {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error("No token found");
          return;
        }

        const response = await fetch(`http://localhost:3333/user/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data.');
        }

        const data: { user: UserData } = await response.json();
        setUserName(data.user.name);
      } catch (error) {
        console.error("Error fetching user name:", error);
      }
    }

    fetchUserName();
  }, [userId]);

  async function handleLike() {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error("No token found");
        return;
      }

      const response = await fetch('http://localhost:3333/like', {
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
      setDataLiked(await response.json());
      setIsLiked(true);
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

      const response = await fetch(`http://localhost:3333/like/${dataLiked?.like.id}`, {
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
        <button onClick={handleLikeToggle}>
          <Heart size={22} weight={isLiked ? 'fill' : 'regular'} className={`${isLiked ? 'text-primary' : 'text-white'}`} />
        </button>
      </div>
    </div>
  );
}
