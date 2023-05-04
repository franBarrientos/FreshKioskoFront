import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const KioskoContext = createContext();

function KioskoProvider({ children }) {
  const [categorias, setCategorias] = useState([]);
  const [categoriaActual, setCategoriaActual] = useState({});
  const [modal, setmodal] = useState(false);
  const [producto, setProducto] = useState({});
  const [carrito, setCarrito] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const login = () => {
    setIsAuthenticated(true);
  };

  const fetchCategorias = async()=>{
      try {
      const {data} = await axios("http://localhost:3000/api/categorias")
      setCategorias(data)
      setCategoriaActual(data[0])
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    fetchCategorias()
  },[])


  const handleClickCategoria = (id) => {
    const categoria = categorias.filter((categoria) => categoria.id == id)[0];
    setCategoriaActual(categoria);
  };
  const handleClickModal = () => {
    setmodal(!modal);
  };

  const handleSetProducto = (producto) => {
    setProducto(producto);
  };
  const handleAddPedido = ({ categoria_id, ...producto }) => {
    if (carrito.some((carritoState) => carritoState.id == producto.id)) {
      const carritoActualizado = carrito.map((carritoState) =>
        carritoState.id == producto.id ? producto : carritoState
      );
      setCarrito(carritoActualizado);
      toast.success("Cambios Guardados Correctamente!");
    } else {
      setCarrito([...carrito, producto]);
      toast.success("Agregado al Pedido!");
    }
  };
  const handleTotalCarrito = (carrito = []) => {
    let total = 0;
    carrito.forEach((producto) => {
      total = total + producto.precio * producto.cantidad;
    });
    return total;
  };

  const handleEditarCantidad = (id) => {
    const productoActualizar = carrito.filter(
      (producto) => producto.id == id
    )[0];
    setProducto(productoActualizar);
    setmodal(!modal);
  };

  const handleEliminarCantidad = (id) => {
    const carritoActualizado = carrito.filter((producto) => producto.id != id);
    setCarrito(carritoActualizado);
    toast.error("Producto Eliminado del carrito");
  };

  const handleSubmitNuevaOrden = async (logout)=>{
    try {
     const {data} = await axios.post("/api/pedidos",
     {
        total: handleTotalCarrito(carrito),
        productos: carrito.map(producto => {
          return {
            id: producto.id,
            cantidad: producto.cantidad
          }
        })
      },)

      toast.success(data.message)
      setTimeout(() => {
        setCarrito([])
      }, 1000);
      setTimeout(() => {
        localStorage.removeItem("AUTH_TOKEN");
        logout();
      }, 3000);
    } catch (error) {
      console.log(error)
    }
  }

  const handleClickCompletarPedido = async id => {
    try {
      await axios.put(`/api/pedidos/${id}`,null,)
    } catch (error) {
      console.log(error)
    }
  }

  const handleClickPedidoAgotado = async id => {
    try {
      await axios.put(`/api/productos/${id}`,null)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <KioskoContext.Provider
      value={{
        handleClickModal,
        modal,
        categorias,
        categoriaActual,
        handleClickCategoria,
        producto,
        handleSetProducto,
        carrito,
        handleAddPedido,
        handleTotalCarrito,
        handleEditarCantidad,
        handleEliminarCantidad,
        handleSubmitNuevaOrden,
        handleClickCompletarPedido,
        handleClickPedidoAgotado,
        isAuthenticated,
        login
      }}
    >
      {children}
    </KioskoContext.Provider>
  );
}

export { KioskoProvider };

export default KioskoContext;