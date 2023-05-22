import Pedido from "../components/Pedido";
import axios from "axios";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";
export default function Pedidos() {
  const [jwtToken] = useState(localStorage.getItem('jwtToken'));
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    const socket = io('http://localhost:3000'); // Conecta con el servidor Socket.IO
 
    socket.on('nuevoPedido', (data) => {
      setPedidos(data); 
    });

    const fetchPedidos = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/admin/pedidos", {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        });
        setPedidos(response.data.body);
      } catch (error) {
        console.error("Error al obtener los pedidos:", error);
      }
    };

    fetchPedidos();
    return () => {
      socket.disconnect(); // Desconecta el socket al desmontar el componente
    };
  }, []); // Se ejecuta solo una vez al montar el componente
  

  return (
    <div className=" flex flex-col items-center justify-center ">
      <h1 className="mb-10 text-4xl font-medium">Pedidos</h1>

      <div className=" flex justify-center gap-3 items-center flex-wrap">
        {pedidos.map((element) => (
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
