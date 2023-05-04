import useKiosko from "../hooks/useKiosko";
export default function Producto({ producto, botonAgregar = false, botonDisponible = false }) {
  const {handleClickModal, handleSetProducto, handleClickPedidoAgotado} = useKiosko()
  return (
    <div className=" flex flex-col justify-center bg-white shadow border  p-5 ">
      <img
        className=" w-full rounded-lg"
        src={`/img/` + producto.imagen + `.jpg`}
        alt="{producto.nombre}"
      />
      <div className=" flex justify-between items-center">
        <p className=" font-bold text-xl ">{producto.nombre}</p>
        <p className="font-bold text-2xl text-amber-500">
          {producto.precio.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </p>
      </div>
      {botonAgregar && (
        <button onClick={()=>{
          handleClickModal();
          handleSetProducto(producto);
        }}
          type="button"
          className="p-2 w-full rounded-lg text-white text-xl  bg-amber-500 hover:cursor-pointer"
        >Agregar</button>
      )}

      {botonDisponible && (
        <button onClick={()=>handleClickPedidoAgotado(producto.id)}
          type="button"
          className="p-2 w-full rounded-lg text-white text-xl  bg-amber-500 hover:cursor-pointer"
        >Producto Agotado</button>

      )}
      
    </div>
  );
}
