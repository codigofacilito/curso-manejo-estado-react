import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";
import { useDispatch, useSelector, shallowEqual } from "react-redux";

import { checkIfUserIsAuth, submitLogin } from "../../redux/actions/login";
import { isAuthSel, isCheckingAuthSel, isSuccessLoggedSel, isSendingAuthFormSel } from "../../redux/selectors";

export default function Login() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();
  const isAuth = useSelector(isAuthSel, shallowEqual);
  const isCheckingAuth = useSelector(isCheckingAuthSel, shallowEqual);
  const isSuccessLogged = useSelector(isSuccessLoggedSel, shallowEqual);
  const isSendingAuthForm = useSelector(isSendingAuthFormSel, shallowEqual);
  
  useEffect(() => {
    dispatch(checkIfUserIsAuth());
  }, []);

  useEffect(() => {
    if (isAuth) {
      history.push("/search");
    }
  }, [isAuth]);

  useEffect(() => {
    if (isSuccessLogged) {
      history.push("/search");
    }
  }, [isSuccessLogged]);

  const handleSubmitForm = (evt) => {
    evt.preventDefault();
  
    if (name?.length && email?.length) {
      dispatch(submitLogin(name, email));
    }
  };

  if (isCheckingAuth || isSendingAuthForm) {
    return <p className="text-center mt-5">Cargando...</p>;
  }

  return (
    <div className="flex items-center justify-center flex-col h-screen">
      <img 
        className="w-36"
        alt="super-hero"
        src="https://upload.wikimedia.org/wikipedia/commons/5/5c/Placeholder_couple_superhero.png"
      />
      <h2 className="text-sm mt-3">Coloca tus datos para recordarte</h2>
      <form onSubmit={handleSubmitForm} className="flex flex-col mt-3">
        <label className="flex-col flex text-sm text-gray-500 my-2"> 
          Nombre
          <input 
            onChange={({ target: { value }}) => setName(value)}
            className="px-2 py-1 text-gray-700 text-base mt-1 order border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent w-56 shadow-sm"
            type="name"
          />
        </label>
        <label className="flex-col flex text-sm text-gray-500"> 
          Correo Electronico
          <input 
            onChange={({ target: { value }}) => setEmail(value)}
            className="px-2 py-1 text-gray-700 text-base mt-1  order border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent w-56 shadow-sm"
            type="email"
          />
        </label>
        <button 
          className="bg-blue-600 hover:bg-blue-900 rounded-sm mt-4 px-3 h-8 text-white text-sm cursor-pointer"
          type="submit"
        >
            Acceder
        </button>
      </form>
    </div>
  );
}