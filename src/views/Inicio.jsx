import Producto from "../components/Producto";
import useKiosko from "../hooks/useKiosko";
import useSWR from "swr";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Inicio() {
  const navigate = useNavigate();
  const { categoriaActual, isAuthenticated } = useKiosko();

  if (!isAuthenticated) {
    navigate("/auth/login");
  }

  //consulta SWR
  const fetcher = () =>
    axios("http://localhost:3000/api/producto").then((data) => data.data);

  const { data, error, isLoading } = useSWR(
    "http://localhost:3000/api/producto",
    fetcher,
    {
      refreshInterval: 1000,
    }
  );
  if (isLoading) return "Cargando...";

  const productos = data.body.filter(
    (producto) => producto.categoria_id === categoriaActual.id
  );
  //return mientras espera los datos de axios

  return (
    <>
      <div className="flex flex-col items-center my-5">
        <h1 className=" text-4xl font-black">{categoriaActual.nombre}</h1>
        <p className=" text-2xl my-10">
          Elije y personaliza tu pedido a continuacion
        </p>
      </div>

      <div className=" grid gap-4 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        {productos.map((producto) => (
          <Producto producto={producto} key={producto.id} botonAgregar={true} />
        ))}
      </div>
    </>
  );
}
