import Producto from "../components/Producto";
export default function Productos() {

  return (
    <div>
      <h1 className=" text-4xl font-black">Productos</h1>
      <p className=" text-2xl my-10">Administra la disponibilidad aqui</p>
      <div className=" grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {data.data.map((producto) => (
          <Producto producto={producto} key={producto.id} botonDisponible={true}/>
        ))}
      </div>
    </div>

    

  );
}
