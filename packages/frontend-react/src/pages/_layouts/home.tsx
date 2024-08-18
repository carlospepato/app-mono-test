import { Outlet } from "react-router-dom";
import { Header } from "../../components/header";

export function HomeLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-col flex-1 gap-4">
        <Header />
        <Outlet/>
      </div>
    </div>
  );
}