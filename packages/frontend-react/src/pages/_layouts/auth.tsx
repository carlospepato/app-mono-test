import { Outlet } from "react-router-dom";

export function AuthLayout(){
  return(
    <div className="min-h-screen grid grid-cols-2 ">
      <div className="h-full border-r border-foreground/5 bg-zinc-100 p-10 text-zinc-700 flex flex-col justify-between bg-primary/30">
        <h1 className="flex items-center gap-3 text-2xl font-bold text-primary">
          Dialog Timeline
        </h1>
        <footer className="flex text-sm font-semibold justify-center">
          Timeline Dialog - Teste Desenvolvedor Fullstack - {new Date().getFullYear()}
        </footer>
      </div>
      <div className="flex flex-col items-center justify-center relative">
        <Outlet />
      </div>
    </div>
  )
}