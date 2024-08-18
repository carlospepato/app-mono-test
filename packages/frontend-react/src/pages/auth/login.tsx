import { z } from "zod";
import { useForm } from 'react-hook-form';
import { Link } from "react-router-dom";
import { useAuth } from '../../context/authContext';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const loginForm = z.object({
  email: z.string().email(),
  password: z.string()
});

type LoginForm = z.infer<typeof loginForm>;

export function Login() {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm<LoginForm>();
  const { login } = useAuth();

  async function handleLogin(data: LoginForm) {
    const parsedData = loginForm.safeParse(data);
    if (!parsedData.success) {
      console.error(parsedData.error.errors);
      return;
    }

    try {
      const response = await fetch('http://localhost:3333/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });

      if (response.ok) {
        const responseData = await response.json();
        
        toast.success('Login efetuado com sucesso!',{
          position: 'bottom-right',
        });
        // Use a função login do AuthProvider para salvar o token e redirecionar
        login(responseData.token);
      } else {
        const errorData = await response.json();
        console.error('Erro ao fazer login:', errorData.message);
        toast.error('Email ou senha incorreta!',{
          position: 'bottom-right'
        });
      }
    } catch (error) {
      console.error('Erro ao conectar à API:', error);
    }
  }

  return (
    <div className="p-8">
      <Link to="/register" className="text-primary absolute right-8 top-8 hover:underline">Criar uma conta</Link>
      <div className="w-[320px] flex flex-col justify-center gap-6">
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-3xl font-semibold tracking-tight">Acessar sua conta</h1>
        </div>
        <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-md font-semibold">E-mail</label>
            <input
              type="email"
              id="email"
              {...register('email')}
              className="w-full p-2 border border-foreground/5 rounded outline-none bg-zinc-100 text-zinc-800"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="text-md font-semibold">Senha</label>
            <input
              type="password"
              id="password"
              {...register('password')}
              className="w-full p-2 border border-foreground/5 rounded outline-none bg-zinc-100 text-zinc-800"
            />
          </div>
          <button disabled={isSubmitting} className="w-full bg-primary hover:bg-primary/90 text-zinc-800 font-bold py-2 px-4 rounded">
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
