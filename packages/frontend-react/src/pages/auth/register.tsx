import { z } from "zod";
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const registerForm = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres")
})

type RegisterForm = z.infer<typeof registerForm>

export function Register() {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm<RegisterForm>();
  const navigate = useNavigate();

  async function handleRegister(data: RegisterForm) {
    const parsedData = registerForm.safeParse(data);
    if (!parsedData.success) {
      console.error(parsedData.error.errors)
      return;
    }
    try {
      const response = await fetch('http://localhost:3333/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password
        })
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('Registrado com sucesso:', responseData);
        toast.success(
          <div>
            Registrado com sucesso!
            <button
              onClick={() => navigate('/login')}
              className="text-primary underline hover:text-primary/90"
            >
              Ir para Login
            </button>
          </div>,
          {
            position: 'bottom-right',
            autoClose: 5000,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        );
      } else {
        const errorData = await response.json();
        console.error('Erro ao registrar:', errorData.message);
        toast.error(errorData.message, {
          position: 'bottom-right',
          autoClose: 5000,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        })
      }
    } catch (error) {
      console.error('Erro ao conectar à API:', error);
    }
  }

  return (
    <div className="p-8">
      <Link to="/login" className="text-primary absolute right-8 top-8 hover:underline">Acessar conta</Link>
      <div className="w-[320px] flex flex-col justify-center gap-6">
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-3xl font-semibold tracking-tight">Crie sua conta</h1>
        </div>
        <form onSubmit={handleSubmit(handleRegister)} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-md font-semibold">Nome</label>
            <input type="text" id="name" {...register('name')} className="w-full p-2 border border-foreground/5 rounded outline-none bg-zinc-100 text-zinc-800" />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="text-md font-semibold">E-mail</label>
            <input type="email" id="email" {...register('email')} className="w-full p-2 border border-foreground/5 rounded outline-none bg-zinc-100 text-zinc-800" />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="text-md font-semibold">Senha</label>
            <input type="password" id="password" {...register('password')} className="w-full p-2 border border-foreground/5 rounded outline-none bg-zinc-100 text-zinc-800" />
          </div>
          <button disabled={isSubmitting} className="w-full bg-primary hover:bg-primary/90 text-zinc-800 font-bold py-2 px-4 rounded">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}