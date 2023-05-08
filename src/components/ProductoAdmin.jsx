import useKiosko from "../hooks/useKiosko";

export default function ProductoAdmin({producto}) {
    const {handleClickModal, setProductoAdmin} = useKiosko();
  return (
    <div className=" flex flex-col justify-center bg-white shadow border w-96  p-5 ">
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
       
        <button onClick={()=>{
          handleClickModal();
          setProductoAdmin(producto)
        }}
          type="button"
          className="p-2 w-full rounded-lg text-white text-xl  bg-amber-500 hover:cursor-pointer"
        >Editar</button>
      

      
    </div>
  )
}
