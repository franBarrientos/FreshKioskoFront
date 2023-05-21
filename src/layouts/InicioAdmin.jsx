import React, { useEffect, useState } from "react";
import axios from "axios";
import useSWR from "swr";
import ProductoAdmin from "../components/ProductoAdmin";
export default function InicioAdmin() {
  const [totalVentas, setTotalVentas] = useState(0);
  const [productosMasVendidos, setProductosMasVendidos] = useState([]);
  const [jwtToken] = useState(localStorage.getItem('jwtToken'));


  const fetcher = () =>
    axios("http://localhost:3000/api/admin/pedidos/total", {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }).then((data) => {
        setProductosMasVendidos(data.data.body.productos)
      setTotalVentas(data.data.body.totalVentas);
    });

  const { data, error, isLoading } = useSWR(
    "http://localhost:3000/api/admin/pedidos/total",
    fetcher,
    {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      refreshInterval: 1000,
    }
  );

  

  return (
    <div>
      <h2 className="my-10 text-2xl font-semibold text-center">Total vendido hoy: ${totalVentas.toFixed(2)}</h2>
      <h3 className="my-10 text-2xl font-semibold text-center">Productos más vendidos:</h3>
      <div className=" grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {productosMasVendidos.map((producto) => (
          <ProductoAdmin producto={producto} key={producto.id} />
        ))}
      </div>
        
      {/* Aquí puedes agregar código para mostrar el gráfico de los productos más vendidos */}
    </div>
  )
}
