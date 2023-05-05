import useKiosko from "../hooks/useKiosko";
import ResumenProducto from "./ResumenProducto";
export default function Resumen() {
  const { carrito, handleTotalCarrito, handleSubmitNuevaOrden} = useKiosko();
  const handleSubmit = e => {
    e.preventDefault();
    handleSubmitNuevaOrden();
  }
  
  return (
    <aside className=" md:w-72 h-screen overflow-y-scroll p-5">
      <h1 className=" text-4xl font-black">Mi Pedido</h1>
      <div className=" py-10">
        {carrito.length == 0 ? (
          <div className=" flex justify-center gap-1 items-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
          </svg>
        
          <p className="text-2xl">El carrito esta vacio</p>
          </div>
        ) : (
          carrito.map((pedido) => (
            <ResumenProducto producto={pedido} key={pedido.id} />
          ))
        )}
      </div>
      {carrito.length == 0 ? (
        null
      ) : (
        <p className="text-xl mt-10">
          Total:
          {handleTotalCarrito(carrito).toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </p>
      )}

      {carrito.length == 0 ? null : (
        <form className="w-full"
          onSubmit={handleSubmit}
        >
          <div className=" mt-5">
            <input
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-800 px-5 py-2 rounded hover:cursor-pointer font-bold text-white w-full text-center"
              value="Confirmar Pedido"
            />
          </div>
        </form>
      )}
    </aside>
  );
}
