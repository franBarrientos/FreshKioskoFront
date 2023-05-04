import ReactModal from "react-modal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Resumen from "../components/Resumen";
import useKiosko from "../hooks/useKiosko";
import ModalProducto from "../components/ModalProducto";
//Estilos del modal
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
//Quita el error de modal
ReactModal.setAppElement("#root");

export default function Layout() {
  const { modal, handleClickModal, producto } = useKiosko();
  return (
    <>
      <div className=" md:flex">
        <Sidebar />
        <div className=" flex-1 h-screen overflow-y-scroll bg-gray-100 p-3">
          <Outlet />
        </div>

        <Resumen />
      </div>

      <ReactModal isOpen={modal} style={customStyles}>
        <ModalProducto />
      </ReactModal>

      <ToastContainer />
    </>
  );
}
