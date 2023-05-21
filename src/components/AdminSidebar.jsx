import { Link } from "react-router-dom"
import useKiosko from "../hooks/useKiosko";

export default function AdminSidebar() {
  const { categoriaAdmin, setCategoriaAdmin} = useKiosko()
  const handlePedido = ()=>{
    event.preventDefault();
    setCategoriaAdmin(0);
  }
  const handleProducto = ()=>{
    event.preventDefault();
    setCategoriaAdmin(1);
  }
  const handleAdmin = ()=>{
    event.preventDefault();
    setCategoriaAdmin(3);
  }
  const handleAgregarProducto = ()=>{
    event.preventDefault();
    setCategoriaAdmin(2);
  }
  const classHover = " bg-amber-400 flex items-center gap-4 border w-full p-3 hover:bg-amber-400 hover:cursor-pointer"
  const classSinHover = "flex items-center gap-4 border w-full p-3 hover:bg-amber-400 hover:cursor-pointer"
  return (
    <aside className=" flex flex-col w-full md:w-44 gap-2 text-center">
        <div className="md:w-44 p-3">
            <img src="../img/logo.svg" alt="logo svg" className=" w-40" />
        </div>
        <Link onClick={handleAdmin} to="/admin" className={categoriaAdmin==3? classHover : classSinHover}>
            Sobre Hoy
        </Link> 
       <Link onClick={handlePedido} to="/admin/pedidos" className={categoriaAdmin==0? classHover : classSinHover}>
            Pedidos
        </Link>
        <Link onClick={handleProducto} to="/admin/productos" className={categoriaAdmin==1? classHover : classSinHover}>
            Productos
        </Link>
        <Link onClick={handleAgregarProducto} to="/admin/agregar" className={categoriaAdmin==2? classHover : classSinHover}>
            Agregar Producto
        </Link>

    </aside>
  )
}
