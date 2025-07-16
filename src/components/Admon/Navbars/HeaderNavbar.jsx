import React, { useState } from "react";
import LOGO from "../../common/_images/suan_logo.png";
import TerrasachaLogo from "components/common/TerrasachaLogo";



const HeaderNavbar = ({ isActualUserLogged, changeHeaderNavBarRequest, handleSignOut }) => {
  const [desiredSubscriptionTopic, setDesiredSubscriptionTopic] = useState("");
  const [desiredPublishTopic, setDesiredPublishTopic] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const role = localStorage.getItem("role");

  const handleOnChangeInputForm = (event) => {
    const { name, value } = event.target;
    if (name === "desiredSubscriptionTopic") {
      setDesiredSubscriptionTopic(value);
    }
    if (name === "desiredPublishTopic") {
      setDesiredPublishTopic(value);
    }
  };

  const handleChangeObjectElement = () => {
    handleSignOut();
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleMenuItemClick = (e, request) => {
    changeHeaderNavBarRequest(request, e);
    setDropdownOpen(false); // Cerrar el dropdown al seleccionar una opción
  };

  if (!isActualUserLogged) return null;

  return (
    <nav className="bg-white fixed top-0 w-full shadow-md z-10">
      <div className="mx-auto flex justify-between items-center p-4">
        <a href="/" className="flex items-center flex-none">
      <TerrasachaLogo className={"w-48 h-auto"} />
        </a>
        <div className="flex items-center space-x-4">
          <div className="hidden md:block font-bold text-red-500 border-2 border-red-500 px-4 py-1">{process.env.REACT_APP_ENV}</div>
          <div className="hidden md:block font-bold text-red-500">{role === "admon" ? "Administrador" : role || ""}</div>
          <div className="relative">
            <button onClick={toggleDropdown} className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md focus:outline-none">Menu</button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg">
              <div className="block md:hidden font-bold text-red-500 border-red-500 px-4 py-1 mt-2">Env: {process.env.REACT_APP_ENV}</div>
              <div className="block md:hidden font-bold text-red-500 border-red-500 px-4 py-1">Rol: {role === "admon" ? "Administrador" : role || ""}</div>
                <div className="block md:hidden border-t my-2"></div>
                <div className="px-4 py-2 font-bold text-gray-800">Navegación Principal</div>
                <a href="#products" onClick={(e) => handleMenuItemClick(e, "products")} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Proyectos</a>
                <a href="#categorys" onClick={(e) => handleMenuItemClick(e, "categorys")} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Categorías</a>
                <a href="#items" onClick={(e) => handleMenuItemClick(e, "items")} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Items de proyectos</a>
                <a href="#features" onClick={(e) => handleMenuItemClick(e, "features")} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Características</a>
                <a href="#uom" onClick={(e) => handleMenuItemClick(e, "uom")} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Unidad de medida</a>
                
                <div className="border-t my-2"></div>
                
                <div className="px-4 py-2 font-bold text-gray-800">Acciones</div>
                <a href="#assign_pf" onClick={(e) => handleMenuItemClick(e, "assign_pf")} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Asignar Consultores</a>
                <a href="#assign_analyst" onClick={(e) => handleMenuItemClick(e, "assign_analyst")} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Asignar Analista</a>
              {/*  <a href="#assign_Legales" onClick={(e) => handleMenuItemClick(e, "assign_Legales")} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Asignar Legales</a>*/  }
                <a href="#validators" onClick={(e) => handleMenuItemClick(e, "validators")} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Consultores</a>
                <a href="#analysts" onClick={(e) => handleMenuItemClick(e, "analysts")} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Analistas</a>
                <a href="#legales" onClick={(e) => handleMenuItemClick(e, "legales")} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Legales</a>
                <a href="#marketplace_admin" onClick={(e) => handleMenuItemClick(e, "marketplace_admin")} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Crear marketplace admin</a>
                <a href="#apps_status" onClick={(e) => handleMenuItemClick(e, "apps_status")} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Estado de las aplicaciones</a>
                
                <div className="border-t my-2"></div>
                
                <button onClick={handleChangeObjectElement} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">Cerrar sesión</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default HeaderNavbar;
