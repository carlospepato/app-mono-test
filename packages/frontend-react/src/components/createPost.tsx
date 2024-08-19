import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { apiUrl } from '../../config/config';

const postForm = z.object({
  post: z.string().min(1),
});

type PostForm = z.infer<typeof postForm>;

interface CreatePostProps {
  userId: string | undefined;
  onPostCreated: (newPost: { id: string; content: string; userid: string }) => void;
}

export function CreatePost({ userId, onPostCreated }: CreatePostProps) {
  const { register, handleSubmit, formState: { isSubmitting }, reset } = useForm<PostForm>();

  async function handlePost(data: PostForm) {
    const parsedData = postForm.safeParse(data);
    if (!parsedData.success) {
      console.error(parsedData.error.errors);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error("No token found");
        return;
      }

      const response = await fetch(`${apiUrl}/post`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          content: data.post,
          userid: userId,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create post');
      }

      const newPost = await response.json();
      onPostCreated(newPost); // Notifica o componente pai que um novo post foi criado
      reset(); // Limpa o textarea após o post ser criado
    } catch (error) {
      console.error('Failed to create post:', error);
    }
  }

  return (
    <div className="py-6">
      <form onSubmit={handleSubmit(handlePost)} className="flex gap-2 items-center">
        <textarea
          placeholder="O que você está pensando?"
          {...register('post')}
          className="outline-none w-full h-14 p-4 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary resize-none text-zinc-200 bg-zinc-700/50"
        />

        <button
          disabled={isSubmitting}
          type="submit"
          className="bg-primary/80 hover:bg-primary/90 text-zinc-800 font-bold py-3 px-6 rounded-lg transition-all duration-200"
        >
          Postar
        </button>
      </form>
    </div>
  );
}
