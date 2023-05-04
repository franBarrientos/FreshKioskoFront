import { useState, useEffect} from "react";
import useKiosko from "../hooks/useKiosko";
export default function ModalProducto() {
  const { producto, handleClickModal, carrito, handleAddPedido } = useKiosko();
  const [cantidad, setCantidad] = useState(1);
  const [edicion, setEdicion] = useState(false)
  useEffect(()=>{
    if(carrito.some( carritoState => carritoState.id == producto.id))
    {
      const productoEdicion = carrito.filter(carritoState => carritoState.id == producto.id)[0]
      setCantidad(productoEdicion.cantidad)
      setEdicion(true)
    }
  },[carrito])
  return (
    <div className=" md:flex gap-10">
      <div className="md:w-1/3">
        <img
          src={`/img/${producto.imagen}.jpg`}
          alt={`Imagen Producto ${producto.nombre}`}
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
        <h1 className="mt-5 text-3xl font-bold">{producto.nombre}</h1>
        <p className="mt-5 font-black text-5xl text-amber-500">
          {producto.precio.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </p>
        <div className=" flex gap-4 mt-5">
          <button onClick={()=>{
            if(cantidad <= 1)return
            setCantidad(cantidad-1)}}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
          <p className="text-3xl">{cantidad}</p>
          <button  onClick={()=>{
            if(cantidad >= 10)return
            setCantidad(cantidad+1)}}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
        </div>
        <button
            onClick={()=>{
                handleAddPedido({...producto, cantidad});
                handleClickModal();
            }}
          type="button"
          className=" mt-5 bg-indigo-600 hover:bg-indigo-800 px-5 py-2 my-2 text-white text-xl rounded"
        >
          {edicion?'Guardar Cambios' : 'Agregar al Carrito'}
        </button>
      </div>
    </div>
  );
}
