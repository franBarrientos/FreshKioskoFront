import axios from "axios";
import { useState } from "react";
import useKiosko from "../hooks/useKiosko";
export default function ModalProductoAdmin() {
  const { productoAdmin, handleClickModal, token } = useKiosko();
  const [precioNuevo, setPrecioNuevo] = useState(productoAdmin.precio);
  const [disponible, setDisponible] = useState(productoAdmin.disponible);
  const classButton = disponible? "mt-5 bg-red-600 hover:bg-red-80 px-5 py-2 my-2 text-white text-xl rounded " : " mt-5 bg-indigo-600 hove:bg-indigo-800  px-5 py-2 my-2 text-white text-xl rounded"
   
 
  const actualizarPrecioYDisponibilidad = async () => {
    try {
      const response = await axios.patch("http://localhost:3000/api/admin/producto/update", {
        id: productoAdmin.id,
        precio: precioNuevo,
        disponible: disponible ? 0 : 1,
      },{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },);
      setDisponible(disponible ? 0 : 1);
      handleClickModal();
    } catch (error) {
      alert("Error no se pudo actualizar el producto");
    }
  };
  return (
    <div className=" md:flex gap-10">
      <div className="md:w-1/3">
        <img
          src={`/img/${productoAdmin.imagen}.jpg`}
          alt={`Imagen Producto ${productoAdmin.nombre}`}
        />
      </div>
      <div className="md:w-2/3">
        <div className=" flex justify-end">
          <button onClick={handleClickModal}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-10 h-10 bg-red-500 rounded-full m-1 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
        </div>
        <h1 className="mt-5 text-3xl font-bold">{productoAdmin.nombre}</h1>
        <p className="mt-5 font-black text-5xl text-amber-500">
          {productoAdmin.precio.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </p>
        <div className=" flex gap-4 mt-5">
          <p className="text-3xl">Modificar Precio</p>
          <input
            onChange={(e) => {
              setPrecioNuevo(e.target.value);
            }}
            className="text-xl"
            type="text"
            placeholder="Ingrese Nuevo Precio"
            value={precioNuevo}
          />
        </div>
        <div className=" flex flex-col gap-3 w-44"> 
          <button
            onClick={actualizarPrecioYDisponibilidad}
            type="button"
            className=" mt-5 bg-indigo-600 hover:bg-indigo-800 px-5 py-2 my-2 text-white text-xl rounded"
          >
            Actualizar Precio
          </button>
        <button
          onClick={actualizarPrecioYDisponibilidad}
          type="button"
          className={classButton}
        >
         { disponible? "Quitar Stock": "Agregar como Disponible"}
        </button>

        </div>
      </div>
    </div>
  );
}
