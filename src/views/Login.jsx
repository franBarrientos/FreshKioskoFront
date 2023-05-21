import { createRef, useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useKiosko from "../hooks/useKiosko";

      
export default function Login() {
  
  const navigate = useNavigate();
  const { login, setEmailUser, emailUser } = useKiosko();
  const emailRef = createRef();
  const passwordRef = createRef();
  const loginGoogleRef = useRef();
  const [errores, setErrores] = useState({});

  window.handleCredentialResponse = function (response) {
    // Google Token
    fetch("http://localhost:3000/api/auth/google", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id_token: response.credential }),
    })
      .then((res) => res.json())
      .then((data) => {if (loginGoogleRef.current) {
         loginGoogleRef.current(data);
  }})}
  

  const validate = (objForm) => {
    let errors = {};

    if (!objForm.email) {
      errors.email = "Ingrese email";
    } else if (
      !/^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/.test(objForm.email)
    ) {
      errors.email = "Ingrese email válido";
    }

    if (!objForm.password) {
      errors.password = "Ingrese password";
    }

    return Object.keys(errors).length === 0
      ? { isValid: true }
      : { isValid: false, errors };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrores({ email: "", password: "" });
    const datos = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    const validation = validate(datos);
    if (validation.isValid) {
      setErrores({});
      const autenticado = await validacionBack(datos);
      if (autenticado != undefined) {
        if (autenticado === 0) {
          login();
          navigate("/admin");
        } else {
          login();
          navigate("/");
        }
      } else {
        setErrores({ email: "", password: "Ingrese password valido" }); // actualizar estado de errores aquí
        return;
      }
    } else {
      setErrores({ email: "", password: "Ingrese password valido" }); // actualizar estado de errores aquí
    }
  };

  const validacionBack = async (datos) => {
    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/auth/login",
        { email: datos.email, password: datos.password }
      );
      if (data.body.state) {
        // Autenticación exitosa
        localStorage.setItem('jwtToken',data.body.token);
        setEmailUser(data.body.user);
        console.log(data)
        if (data.body.user.role == 0) {
          return 0;
        } else {
          return 1;
        }
      } else {
        // Credenciales incorrectas
        return undefined;
      }
    } catch (err) {
      return undefined;
    }
  };

 
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const loginGoogle = (data)=>{
    localStorage.setItem("email", data.body.user.email)
    if(data.body.state) {
      // Autenticación exitosa
      console.log(data)
      localStorage.setItem('jwtToken', data.body.token);
      setEmailUser(data.body.user);
      if (data.body.user.role == 0) {
        login();
         return navigate("/admin");
      } else {
        login();
        return navigate("/");
      }
    }
  }
  loginGoogleRef.current = loginGoogle;

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
            className=" w-full mt-5 p-3 mb-3 bg-yellow-500 hover:bg-yellow-600 rounded-lg text-white font-bold uppercase hover:cursor-pointer"
            value="Iniciar Sesion"
          />
        </form>

            <div
              id="g_id_onload"
              data-client_id="1000300790043-t2msru697te2epsp0m2ukghhtg3eppqr.apps.googleusercontent.com"
              data-auto_prompt="false"
              data-callback="handleCredentialResponse"
            ></div>
            <div
              className="g_id_signin w-full flex justify-center"
              data-type="standard"
              data-size="large"
              data-theme="outline"
              data-text="sign_in_with"
              data-shape="rectangular"
              data-logo_alignment="left"
            ></div>
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
