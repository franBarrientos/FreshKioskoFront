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
  return (
    <aside className=" flex flex-col w-full md:w-44 gap-2 text-center">
        <div className="md:w-44 p-3">
            <img src="../img/logo.svg" alt="logo svg" className=" w-40" />
        </div>
        <Link onClick={handlePedido} to="/admin/pedidos" className="text-xl">
            Pedidos
        </Link>
        <Link onClick={handleProducto} to="/admin/productos" className="text-xl">
            Productos
        </Link>
     

    </aside>
  )
}
