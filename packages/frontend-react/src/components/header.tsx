import { Link } from "react-router-dom";
import { Separator } from "./separator";
import { House, SignOut, User } from "phosphor-react";
import { useAuth } from "../context/authContext";

export function Header(){
  const {logout} = useAuth()
  return(
    <div className="border-b border-zinc-600 bg-zinc-700/50">
      <div className="flex h-16 items-center gap-6 px-6">
        <h1 className="font-bold text-2xl">D.Feed</h1>
        <Separator/>
        <div className="flex item justify-between w-full">
          <nav className="flex items-center space-x-4 lg:space-x-6">
            <Link to="/" className="flex items-start justify-between gap-1 font-semibold">
              <House size={22} />
              Home
            </Link>
            <Link to="/profile" className="flex items-start justify-between gap-1 font-semibold">
              <User size={22} />
              Profile
            </Link>
          </nav>
          <Link onClick={logout} to="/login" className="flex items-start justify-between gap-1 font-semibold">
            <SignOut size={22}/>
            Sair
          </Link>
        </div>
      </div>
    </div>
  )
}