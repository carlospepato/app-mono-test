import { MapPin, Suitcase, UserCircle } from "phosphor-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../../context/authContext";

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

const profileFormSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("Formato de email inválido").min(1, "Email é obrigatório"),
});

type ProfileForm = z.infer<typeof profileFormSchema>;

export function Profile() {
  const { register, handleSubmit, formState: { errors, isSubmitting }, setValue } = useForm<ProfileForm>({
    resolver: zodResolver(profileFormSchema),
  });
  const { updateUser } = useAuth();
  const [profile, setProfile] = useState<ProfileData | null>(null);

  useEffect(() => {
    async function fetchProfile() {
      try {
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
        console.log(data);
        setProfile(data);
        setValue('name', data.user.name);
        setValue('email', data.user.email);
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      }
    }

    fetchProfile();
  }, [setValue]);

  const createdAtString = profile?.user.createdAt;
  const createdAt = createdAtString ? new Date(createdAtString).toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }) : '';

  const updatedAtString = profile?.user.updatedAt;
  const updatedAt = updatedAtString ? new Date(updatedAtString).toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }) : '';

  async function handleUpdateProfile(data: ProfileForm) {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error("No token found");
        return;
      }

      const response = await fetch(`http://localhost:3333/user/${profile?.user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email
        })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const updatedProfile = await response.json();
      setProfile(updatedProfile);

      // Atualiza o contexto com o novo nome e email
      updateUser(updatedProfile.user);
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  }

  return (
    <div className="max-w-4xl w-full mx-auto px-3">
      <div className="w-full bg-zinc-700/50 rounded-t-lg flex items-center gap-4 p-4 mb-4">
        <UserCircle size={80} />
        <div className="mt-6 flex flex-col gap-3">
          <span className="text-3xl font-semibold">{profile?.user.name}</span>
          <span className="flex gap-2 items-start font-medium text-zinc-400">
            <Suitcase size={20} weight="bold" className="text-primary" />
            Desenvolvedor Fullstack
          </span>
          <span className="flex gap-2 items-start font-medium text-zinc-400">
            <MapPin size={20} weight="bold" className="text-primary" />
            Curitiba - PR
          </span>
        </div>
      </div>
      <div className="w-full bg-zinc-700/50 rounded-lg flex items-center gap-4 p-4">
        <form onSubmit={handleSubmit(handleUpdateProfile)} className="w-full px-2">
          <div className="grid grid-cols-2 w-full gap-6">
            <div className="w-full">
              <label className="block mb-2 text-zinc-400 text-md font-semibold" htmlFor="name">Nome</label>
              <input
                className="w-full p-2 bg-zinc-700 text-zinc-100 rounded-lg outline-none focus:bg-zinc-100 focus:text-zinc-800"
                type="text"
                id="name"
                {...register('name')}
              />
              {errors.name && <span className="text-red-500">{errors.name.message}</span>}
              <label className="block mb-2 mt-4 text-zinc-400 text-md font-semibold" htmlFor="email">Email</label>
              <input
                className="w-full p-2 bg-zinc-700 text-zinc-100 rounded-lg outline-none focus:bg-zinc-100 focus:text-zinc-800"
                type="email"
                id="email"
                {...register('email')}
              />
              {errors.email && <span className="text-red-500">{errors.email.message}</span>}
            </div>
            <div className="w-full">
              <label className="block mb-2 text-zinc-400 text-md font-semibold" htmlFor="createdAt">Conta criada em</label>
              <input
                className="w-full p-2 bg-zinc-700 text-zinc-100 rounded-lg outline-none disabled:text-zinc-400"
                disabled
                value={createdAt}
              />
              <label className="block mb-2 mt-4 text-zinc-400 text-md font-semibold" htmlFor="updatedAt">Última atualização</label>
              <input
                className="w-full p-2 bg-zinc-700 text-zinc-100 rounded-lg outline-none disabled:text-zinc-400"
                disabled
                value={updatedAt}
              />
            </div>
          </div>
          <button disabled={isSubmitting} className="bg-primary/80 hover:bg-primary/90 text-zinc-800 font-bold py-2 px-6 rounded-lg transition-all duration-200 w-full mt-5" type="submit">Atualizar</button>
        </form>
      </div>
    </div>
  );
}
