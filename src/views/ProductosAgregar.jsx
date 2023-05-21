import React, { createRef, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ProductosAgregar() {
  const nombreRef = createRef();
  const precioRef = createRef();
  const categoriaRef = createRef();
  const imgRef = createRef();
  const [errores, setErrores] = useState(null);
  const [jwtToken] = useState(localStorage.getItem('jwtToken'));

  const handleSubmit = (event) => {
    event.preventDefault();
    // Validación de campos
    if (!nombreRef.current.value) {
      setErrores("El campo Nombre es obligatorio");
      return;
    }

    if (!precioRef.current.value) {
      setErrores("El campo Precio es obligatorio");
      return;
    }

    if (!categoriaRef.current.value) {
      setErrores("El campo Categoría es obligatorio");
      return;
    }

    if (!imgRef.current.files[0]) {
      setErrores("Debe seleccionar una imagen");
      return;
    }

    setErrores(null);

    const formData = new FormData();
    formData.append("nombre", nombreRef.current.value);
    formData.append("precio", precioRef.current.value);
    formData.append("categoria_id", categoriaRef.current.value);
    formData.append("attachment", imgRef.current.files[0]);

    axios
    .post('http://localhost:3000/api/admin/productos', formData,{
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    })
    .then((response) => {toast.success(`${response.data.body.nombre} guardado correctamente!`)})
    .catch((error) => {
      alert(error)
    });
};

  

  return (
    <>
      <h1 className=" font-bold text-4xl">Crea tu Producto</h1>
      <p>Crea tu producto llenando el formulario</p>
      <div className=" bg-white shadow-md mt-4 px-5 py-10">
        <form onSubmit={handleSubmit} noValidate>
          <div className=" mb-4 ">
            <label htmlFor="nombre" className=" text-slate-800">
              Nombre
            </label>
            <input
              id="nombre"
              type="text"
              className=" mt-2 w-full border p-3  rounded-sm"
              placeholder="Nombre del producto"
              ref={nombreRef}
            />
          </div>
          <div className=" mb-4 ">
            <label htmlFor="precio" className=" text-slate-800">
              Precio
            </label>
            <input
              id="precio"
              type="number"
              className=" mt-2 w-full border p-3  rounded-sm"
              placeholder="Precio del producto"
              ref={precioRef}
            />
            <span className="text-xl text-red-300">{errores}</span>
          </div>
          <div className=" mb-4 ">
            <label htmlFor="categoria" className=" text-slate-800">
              Categoria
            </label>
            <input
              id="categoria"
              type="number"
              className=" mt-2 w-full border p-3  rounded-sm"
              placeholder="Categoria: ej, 1, 2, 3,..,6"
              ref={categoriaRef}
            />
            <span className="text-xl text-red-300">{errores}</span>
          </div>
          <div className=" mb-4 ">
            <label htmlFor="password_confirmation" className=" text-slate-800">
              Imagen
            </label>
            <input
              id="password_confirmation"
              type="file"
              className=" mt-2 w-full border p-3  rounded-sm"
              ref={imgRef}
            />
          </div>
          <input
            type="submit"
            className=" mt-5 p-3 bg-yellow-500 hover:bg-yellow-600 rounded-lg text-white font-bold uppercase hover:cursor-pointer"
            value="Crear Producto"
          />
        </form>
      </div>
    </>
  );
}
