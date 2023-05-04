import { createRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Registro() {
  const navigate = useNavigate();
  const nameRef = createRef();
  const emailRef = createRef();
  const passwordRef = createRef();
  const password2Ref = createRef();

  const [errores, setErrores] = useState({});
  const validate = (objForm) => {
    if (!objForm.email) {
      return setErrores({ ...errores, email: "Ingrese email" });
    } else if (/^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/.test(objForm.email)) {
       setErrores({ ...errores, email: "" });
    } else {
      return setErrores({ ...errores, email: "Ingrese email válido" });
    }

    if (!objForm.password) {
        return setErrores({ email: "" , password: "Ingrese password" });
      } 
     else {
        return setErrores({ ...errores, password: "" });
      }
  };


  const handleSubmit = async e => {
    e.preventDefault();
    const datos = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: password2Ref.current.value
    }
    validate(datos);
    if(errores.email || errores.password )return setErrores({ email: "" , password: "Email o Password no valido" })
    const newUser = await registerBack(datos);
    if (newUser) {
      navigate("/auth/login")
    } else {
      return setErrores({ email: "" , password: "Ingrese password valido" })
    }
  }
  const registerBack = async (datos) => {
    try {
      const res = await axios.post('http://localhost:3000/api/auth/register', { email:datos.email, password:datos.password, name: datos.name });
      if (res.data) {
        // Autenticación exitosa
        return true;
      } else {
        // Credenciales incorrectas
        return false;
      }
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  return (
    <>
      <h1 className=" font-bold text-4xl">Crea tu Cuenta</h1>
      <p>Crea tu cuenta llenando el formulario</p>
      <div className=" bg-white shadow-md mt-4 px-5 py-10">
        <form onSubmit={handleSubmit} noValidate>
          <div className=" mb-4 ">
            <label htmlFor="name" className=" text-slate-800">
              Nombre
            </label>
            <input
              id="name"
              type="text"
              className=" mt-2 w-full border p-3  rounded-sm"
              placeholder="Tu nombre"
              ref={nameRef}
            />

          </div>
          <div className=" mb-4 ">
            <label htmlFor="email" className=" text-slate-800">
              Email
            </label>
            <input
              id="email"
              type="email"
              className=" mt-2 w-full border p-3  rounded-sm"
              placeholder="Tu email"
              ref={emailRef}
            />
            <span className="text-xl text-red-300">{errores.email}</span>

          </div>
          <div className=" mb-4 ">
            <label htmlFor="password" className=" text-slate-800">
              Password
            </label>
            <input
              id="password"
              type="password"
              className=" mt-2 w-full border p-3  rounded-sm"
              placeholder="Tu password"
              ref={passwordRef}
            />
            <span className="text-xl text-red-300">{errores.password}</span>

          </div>
          <div className=" mb-4 ">
            <label htmlFor="password_confirmation" className=" text-slate-800">
              Repetir Password
            </label>
            <input
              id="password_confirmation"
              type="password"
              className=" mt-2 w-full border p-3  rounded-sm"
              placeholder="Repetir password"
              ref={password2Ref}

            />
          </div>
          <input
            type="submit"
            className=" mt-5 p-3 bg-yellow-500 hover:bg-yellow-600 rounded-lg text-white font-bold uppercase hover:cursor-pointer"
            value="Crear Cuenta"
          />
        </form>
      </div>
      <nav className=" mt-5">
        <Link to="/auth/login">
          ¿Ya tienes cuenta?
          <span className="font-bold text-lg"> Inicia Sesion</span>
        </Link>
      </nav>
    </>
  );
}
