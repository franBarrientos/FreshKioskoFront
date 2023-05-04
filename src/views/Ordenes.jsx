import Producto from "../components/Producto";
import useKiosko from "../hooks/useKiosko";
export default function Ordenes() {

  const {handleClickCompletarPedido} = useKiosko();
  if (isLoading) return "Cargando...";

  return (
    <div>
      <h1 className=" text-4xl font-black">Ordenes</h1>
      <p className=" text-2xl my-10">Administre sus ordenes aqui</p>
      <div className=" grid grid-cols-3">
        {data.data.data.map((pedido) => (
          <div
            key={pedido.id}
            className="p-5 bg-white shadow space-y-2 border-b"
          >
            <p className=" text-2xl font-bold text-slate-600">
              Contenido del pedido:
            </p>
            {pedido.productos.map((producto) => (
              <div
                key={producto.id}
                className="py-4 space-y-2 border-b border-b-slate-200 last-of-type:border-none"
              >
                <p className="text-lg">ID: {producto.id}</p>
                <p className="text-lg">ID: {producto.nombre}</p>
                <p className="text-lg">Cantidad: {producto.pivot.cantidad}</p>
              </div>
            ))}
            <p className=" text-lg font-bold text-slate-600">
              Cliente: {""}
              <span className=" font-normal">{pedido.user.name}</span>
            </p>
            <p className=" text-lg font-bold text-amber-500">
              Total a Pagar: {""}
              <span className=" font-normal  text-slate-600">{pedido.total.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}</span>
            </p>
            <button
            onClick={()=>handleClickCompletarPedido(pedido.id)}
              type="button"
              className="bg-indigo-600 hover:bg-indigo-800 px-5 py-2 rounded hover:cursor-pointer font-bold text-white w-full text-center"
            >Completar</button>
          </div>
        ))}
      </div>
    </div>
  );
}
