import { Outlet } from "react-router-dom";
import { Header } from "../../components/organisms/Header";

export const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="mx-auto mt-8 px-4 pb-12 container">
        <Outlet />
      </main>
    </div>
  );
};
