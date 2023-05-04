import { createRef, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useKiosko from "../hooks/useKiosko";
export default function Login() {
  const navigate = useNavigate();
  const {login } = useKiosko()
  const emailRef = createRef();
  const passwordRef = createRef();

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
      email: emailRef.current.value,
      password: passwordRef.current.value,
    }
    validate(datos);
    if(errores.email || errores.password )return setErrores({ email: "" , password: "Email o Password no valido" })
    console.log(datos)
    const autenticado = await validacionBack(datos);
    if (autenticado) {
      login()
      navigate("/")
    } else {
      return setErrores({ email: "" , password: "Ingrese password valido" })
    }
  }
  

  const validacionBack = async (datos) => {
    try {
      const res = await axios.post('http://localhost:3000/api/auth/login', { email:datos.email, password:datos.password });
      if (res.data.state) {
        // Autenticación exitosa
        return true;
      } else {
        // Credenciales incorrectas
        console.log(res.data.state)
        return false;
      }
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  return (
    <>
      <h1 className=" font-bold text-4xl">Iniciar Sesion</h1>
      <p>Para crear un pedido debes iniciar sesion</p>
      <div className=" bg-white shadow-md mt-6 px-5 py-10">
        <form onSubmit={handleSubmit} noValidate>

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

          <input
            type="submit"
            className=" w-full mt-5 p-3 bg-yellow-500 hover:bg-yellow-600 rounded-lg text-white font-bold uppercase hover:cursor-pointer"
            value="Iniciar Sesion"
          />
        </form>
      </div>
      <nav className=" mt-5">
        <Link to="/auth/registro">
          ¿Aun no tienes una cuenta?
          <span className="font-bold text-lg"> Crea una</span>
        </Link>
      </nav>
    </>
  );

  }