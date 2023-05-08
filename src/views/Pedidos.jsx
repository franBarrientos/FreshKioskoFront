import Pedido from "../components/Pedido";
import axios from "axios";
import useSWR from "swr";
import useKiosko from "../hooks/useKiosko";

export default function Pedidos() {
const { token } = useKiosko()
  //consulta SWR
  const fetcher = () =>
    axios(
      "http://localhost:3000/api/admin/pedidos",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    ).then((data) => data);

    const { data, error, isLoading } = useSWR(
      "http://localhost:3000/api/admin/pedidos",
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
    <div className=" flex flex-col items-center justify-center ">
      <h1 className="mb-10 text-4xl font-medium">Pedidos</h1>

      <div className=" flex justify-center gap-3 items-center flex-wrap">
        {data.data.body.map((element) => (
          <Pedido
            key={element.id}
            pedidoId={element.id}
            email={element.email}
            total={element.total}
            productos={element.productos}
            estado={!element.estado? "Pendiente" : "Despachado"}
          />
        ))}
      </div>
    </div>
  );
}