import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";
import ModalProductoAdmin from "../components/ModalProductoAdmin";
import ReactModal from "react-modal";
import useKiosko from "../hooks/useKiosko";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
export default function AdminLayout() {
  const { modal, handleClickModal, producto } = useKiosko();

  return (
    <div className=" md:flex">
        <AdminSidebar />
        <div className=" flex-1 h-screen overflow-y-scroll bg-gray-100 p-3">
        <Outlet />
        </div>
        <ReactModal isOpen={modal} style={customStyles}>
        <ModalProductoAdmin />
      </ReactModal>
      <ToastContainer />

  </div>
  )
}
