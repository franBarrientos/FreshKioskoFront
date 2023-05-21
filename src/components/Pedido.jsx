import axios from "axios";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import  {toast}  from "react-toastify";
export default function Pedido({ pedidoId, email, total, estado, productos }) {
  const [pedidoDespachado, setPedidoDespachado] = useState(false);
  const [jwtToken] = useState(localStorage.getItem('jwtToken'));

  const despacharPedido = async () => {
    try {
      const res = await axios.patch(
        "http://localhost:3000/api/admin/pedido/despachado",
        {
          pedidoId,
        },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );

      if (res) {
        setPedidoDespachado(true);
        toast.success(`Pedido ${pedidoId} de ${email} despachado correctamente!`)
      }
      // Autenticación exitosa
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {pedidoDespachado ? null : (
        <div className="flex flex-col md:w-64 md:h-autonn p-3 justify-center items-center gap-3 bg-amber-400 rounded-xl">
          <div className="text-lg text-center">Pedido Id: {pedidoId}</div>
          <div className="text-lg text-center">Email</div>
          <div className="text-lg text-center"> {email}</div>
          <div className="text-lg text-center">Total: {total}</div>
          <div className="text-lg text-center">Estado: {estado}</div>
          <div className="text-lg text-center">Productos</div>
          {productos.map((producto) => (
            <div className="text-lg text-center" key={producto.id}>{producto.nombre}</div>
          ))}{" "}
          <button
            onClick={despacharPedido}
            className="bg-yellow-50 p-2 rounded-lg"
          >
            Despachar
          </button>
        </div>
      )}
    </>
  );
}
