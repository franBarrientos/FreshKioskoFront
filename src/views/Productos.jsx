import { data } from "autoprefixer";
import axios from "axios";
import useSWR from "swr";
import ProductoAdmin from "../components/ProductoAdmin";
import useKiosko from "../hooks/useKiosko";
export default function Productos() {
  const { token } = useKiosko()
  const fetcher = () => axios("http://localhost:3000/api/admin/productos", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  },).then((data) => data.data);

  const { data, error, isLoading } = useSWR(
    "http://localhost:3000/api/admin/productos",
    fetcher,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      refreshInterval: 1000,
    }
  );
  if (isLoading) return "Cargando...";

  return (
    <div className="flex flex-col items-center">
      <h1 className=" text-4xl font-black">Productos</h1>
      <p className=" text-2xl my-10">Administra la disponibilidad aqui</p>
      <div className=" grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {data.body.map((producto) => (
          <ProductoAdmin producto={producto} key={producto.id} />
        ))}
      </div>
    </div>

    

  );
}
