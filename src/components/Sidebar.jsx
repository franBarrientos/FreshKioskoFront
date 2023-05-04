import Categoria from "./Categoria";
import useKiosko from "../hooks/useKiosko";
export default function Sidebar() {
  const { categorias, categoria } = useKiosko();
  return (
    <aside className=" md:w-72">
      <div className=" p-4">
        <img src="img/logo.svg" alt="logo svg" className=" w-40" />
      </div>
      <p className="my-10 text-2xl font-semibold text-center">Hola</p>
      <div className="mt-10">
        {categorias.map((categoria) => (
          <Categoria categoria={categoria} key={categoria.id} />
        ))}
      </div>
      <div className=" my-5 py-5">
        <button
          type="buttton"
          className=" bg-red-500 p-3 w-full text-lg text-white hover:bg-red-700 hover:cursor-pointer"
          /* onClick={logout} */
        >
          Cancelar Orden
        </button>
      </div>
    </aside>
  );
}
