import { Link } from "react-router-dom";  
export default function AdminSidebar() {
    const {logout} = useAuth({middleware: "auth"});
  return (
    <aside className=" md:w-72 h-screen">
      <div className=" p-4">
        <img src="/img/logo.svg" alt="img logo" className="w-40" />
      </div>
      <nav className=" flex flex-col gap-5 p-4">
        <Link to="/admin" className="font-bold text-2xl">
          Ordenes
        </Link>
        <Link to="/admin/productos" className="font-bold text-2xl">
          Productos
        </Link>
      </nav>
      <div className=" my-5 px-5">
        <button
          type="buttton"
          className=" bg-red-500 p-3 w-full text-lg text-white hover:bg-red-700 hover:cursor-pointer"
          onClick={logout}
        >
          Cerrar Sesion
        </button>
      </div>
    </aside>
  );
}
