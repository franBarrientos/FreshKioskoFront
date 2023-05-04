import useKiosko from "../hooks/useKiosko";
export default function Categoria({ categoria }) {
  const { handleClickCategoria, categoriaActual } = useKiosko();

  return (
    <div
      onClick={() => handleClickCategoria(categoria.id)}
      className={`${
        categoriaActual.id === categoria.id ? "bg-amber-400" : "bg-white"
      }
     flex items-center gap-4 border w-full p-3 hover:bg-amber-400 hover:cursor-pointer`}
    >
      <img
        className=" w-12"
        src={`/img/icono_` + categoria.icono + `.svg`}
        alt="{categoria.nombre}"
      />
      <p className=" font-bold text-lg ">{categoria.nombre}</p>
    </div>
  );
}
