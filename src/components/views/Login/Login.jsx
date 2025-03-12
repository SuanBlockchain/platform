import { Auth, Hub } from "aws-amplify";
import React, { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
// GraphQL
import { API, graphqlOperation } from "aws-amplify";
import { createUser, updateUser } from "../../../graphql/mutations";
import { useNavigate } from "react-router";
import s from "./Login.module.css";
/* import LOGO from "../../common/_images/suan_logo.png"; */
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TerrasachaLogo from "components/common/TerrasachaLogo";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { notify } from "utilities/notify";


const initialFormState = {
  username: "",
  password: "",
  confirmPassword: "",
  email: "",
  authCode: "",
  formType: "signIn",
  terms: false,
  privacy_policy: false,
  role: "constructor",
  code: "",
  totpCode: "",
};

export default function LogIn() {
  const navigate = useNavigate()
  const [formState, updateFormState] = useState(initialFormState);
  const [signInUserData, setSignInUserData] = useState(null);
  const [user, setUser] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [focusPassword, setFocusPassword] = useState(false);
  const [passwordValidations, setPasswordValidations] = useState({
    length: false,
    number: false,
    specialChar: false,
    uppercase: false,
    lowercase: false,
  });
  const [showPopover, setShowPopover] = useState(false);
  const [inputError, setInputError] = useState({ username: "" });
  const [explain, setExplain] = useState(
    "Una persona, empresa, fondo u organización que quiere rentabilizar su dinero a través de la creación de riqueza con un componente de impacto y protección del medio ambiente"
  );
  let role = localStorage.getItem("role");

  useEffect(() => {
    /* checkUser() */
    setAuthListener();
  }, []);
  useEffect(() => {
    if (formState.formType === "signedIn") {
      const redirectPath = window.sessionStorage.getItem("redirect_after_login");
      if (redirectPath) {
        const pathArray = JSON.parse(redirectPath);
        window.sessionStorage.removeItem('redirect_after_login')
        navigate('/' + pathArray.join('/'));
      } else {
        navigate("/");
      }
    }
  }, [formState.formType, navigate]);
  

  async function setAuthListener() {
    Hub.listen("auth", (data) => {
      switch (data.payload.event) {
        case "signOut":
          updateFormState(() => ({ ...formState, formType: "signUp" }));
          break;
        default:
          break;
      }
    });
  }

  async function checkUser() {
    try {
      const user = await Auth.currentAuthenticatedUser();
      updateUser(user);
      updateFormState(() => ({ ...formState, formType: "signedIn" }));
    } catch (err) {
      // updateUser(null)
    }
  }

  function validatePassword(password) {
    const validations = {
      length: password.length >= 8,
      number: /\d/.test(password),
    };
  
    setPasswordValidations(validations); // Sigue actualizando el estado
    return validations; // 📌 Devuelve el objeto para que pueda ser usado en otras funciones
  }
  

  function handleChange(e) {
    const { name, value } = e.target;
    updateFormState((prev) => ({ ...prev, [name]: value }));

    if (name === "newPassword") {
      validatePassword(value);
      setShowPopover(true);
    }
  }

  

  function onChange(e) {
    e.persist();
    updateFormState(() => ({ ...formState, [e.target.name]: e.target.value }));
    if (e.target.name  === "password") {
      const validations = validatePassword(e.target.value);
      setShowPopover(true); // Mostrar popover con los requisitos
    }
    if (e.target.name === "username")
      setInputError((prevState) => ({
        ...prevState,
        username: validarString(e.target.value, /^[a-zA-Z0-9_]+$/),
      }));
    if (e.target.value === "constructor")
      setExplain(
        "Dueño de un predio interesado en transformar un predio en un activo ambiental monetizable"
      );
  }
  function validarString(str, regex) {
    if (!regex.test(str)) {
      return "Espacios y caracteres especiales no permitidos";
    }
    return "";
  }

  const { formType } = formState;
  async function signUp(e) {
    e.preventDefault();
    const {
      username,
      email,
      password,
      role,
      confirmPassword,
      terms,
      privacy_policy,
    } = formState;

    const validations = validatePassword(password);

    if (!validations.length || !validations.number) {
      setError("La contraseña no cumple con los requisitos mínimos.");
      return;
    }

    if (!terms) setError("Debe aceptar términos y condiciones");
    if (!privacy_policy) setError("Debe aceptar la politica de privacidad");
    if (username.length < 1) setError("Debe ingresar un nombre de usuario");
    if (email.length < 1) setError("Debe ingresar un email");
    if (password !== confirmPassword) setError("Las contraseñas no coinciden.");
    {
      try {
        setError("");
        setLoading(true);
        let response = await Auth.signUp({
          username,
          password,
          attributes: {
            email,
            "custom:role": role,
          },
        });
        const userPayload = {
          id: response.userSub,
          name: username,
          isProfileUpdated: true,
          role: role,
          email: email,
        };
        await API.graphql(graphqlOperation(createUser, { input: userPayload }));
        setLoading(false);
        updateFormState(() => ({ ...formState, formType: "confirmSignUp" }));
      } catch (error) {
        setLoading(false);
        setExplain(
          "Una persona, empresa, fondo u organización que quiere rentabilizar su dinero a través de la creación de riqueza con un componente de impacto y protección del medio ambiente"
        );
        setError("El nombre de usuario ya existe. Por favor, escoja otro.");
      }
    }
  }

  async function confirmSignUp(e) {
    e.preventDefault();
    try {
      setError("");
      const { username, authCode } = formState;
      setLoading(true);
      await Auth.confirmSignUp(username, authCode);
      setLoading(false);
      updateFormState(() => ({ ...formState, formType: "signIn" }));
    } catch (error) {
      setLoading(false);
      updateFormState({ ...formState, authCode: "" });
      setError("el código no coincide");
    }
  }

  const handleResendCode = async (e, username) => {
    e.preventDefault();
    const { CodeDeliveryDetails } = await Auth.resendSignUp(username);
    if (CodeDeliveryDetails) notify(`Código enviado a ${formState.email}`);
  };
  
  async function signIn(e) {
    e.preventDefault();
    const { username, password } = formState;

    try {
      setError("");
      setLoading(true);

      const response = await Auth.signIn(username, password);
  
      if (response.challengeName === "NEW_PASSWORD_REQUIRED") {
        setLoading(false);
        setUser(response);
        updateFormState(() => ({ ...formState, formType: "changePassword" }));
      } else if (response.challengeName === "SOFTWARE_TOKEN_MFA") {
        // El usuario tiene activado MFA con TOTP
        setLoading(false);
        updateFormState(() => ({ ...formState, formType: "confirmTOTP" }));
        setSignInUserData(response);
        // Aquí debes mostrar un formulario donde el usuario ingrese el código TOTP
      } else {
        updateFormState(() => ({ ...formState, formType: "signedIn" }));
        let currentUser = await Auth.currentAuthenticatedUser();
        currentUser = currentUser.attributes["custom:role"];
        localStorage.setItem("role", currentUser);
      }
    } catch (error) {
      setError("La combinación de nombre de cuenta y nombre de usuario no existe.");
    }
    setLoading(false);
  }

  async function confirmTOTP(e) {
    e.preventDefault();
    const { totpCode } = formState; // Asegúrate de tener un campo para capturar el código TOTP
    const { username } = formState;
    try {
      setError("");
      setLoading(true);
  
      const response = await Auth.confirmSignIn(signInUserData, totpCode, "SOFTWARE_TOKEN_MFA");
      
      updateFormState(() => ({ ...formState, formType: "signedIn" }));
      let currentUser = await Auth.currentAuthenticatedUser();
      currentUser = currentUser.attributes["custom:role"];
      localStorage.setItem("role", currentUser);
    } catch (error) {
      setError("Código TOTP no válido. Por favor, inténtelo de nuevo.");
    }
    setLoading(false);
  }

  async function forgotPassword(e) {
    e.preventDefault();
    const { username } = formState;
  
    if (!username) {
      setError("Por favor, ingrese su nombre de usuario.");
      return;
    }
  
    try {
      setError("");
      setLoading(true);
      await Auth.forgotPassword(username);
      updateFormState(() => ({ ...formState, formType: "confirmFPcode" }));
      setError("Hemos enviado un código de recuperación a su correo electrónico.");
    } catch (error) {
      setLoading(false);
  
      // Manejo de errores comunes
      if (error.code === "UserNotFoundException") {
        setError("El usuario ingresado no existe. Por favor, verifique e intente nuevamente.");
      } else if (error.code === "LimitExceededException") {
        setError("Se ha excedido el límite de intentos. Por favor, espere un momento antes de intentarlo nuevamente.");
      } else {
        setError("Ocurrió un error al intentar recuperar la contraseña. Por favor, intente nuevamente.");
      }
    }
    setLoading(false);
  }
  
  async function confirmNewPassword(e) {
    e.preventDefault();
    const { username, code, password } = formState;
  
    const validations = validatePassword(password);

    // 📌 Verificar si alguna validación no se cumple
    if (!validations.length || !validations.number || !validations.specialChar || !validations.uppercase || !validations.lowercase) {
        setError("La contraseña no cumple con los requisitos mínimos.");
        return;
    }
  
    // Intentar confirmar la nueva contraseña
    try {
      setError("");
      setLoading(true);
      await Auth.forgotPasswordSubmit(username, code, password);
      updateFormState(() => ({ ...formState, formType: "signIn" }));
    } catch (error) {
      setLoading(false);
  
      // Manejo de errores de código inválido
      if (error.code === "CodeMismatchException") {
        setError("El código de verificación no es válido. Inténtalo de nuevo.");
      } else if (error.code === "ExpiredCodeException") {
        setError("El código ha expirado. Por favor, solicita uno nuevo.");
      } else {
        setError("Hubo un error al confirmar la nueva contraseña.");
      }
    }
  }
  
  async function changePassword(e) { 
    e.preventDefault();
    console.log("🔹 Iniciando proceso de cambio de contraseña...");

    const { newPassword, confirmNewPassword } = formState;
    console.log("📌 Nueva contraseña ingresada:", newPassword);
    console.log("📌 Confirmación de contraseña:", confirmNewPassword);

    // Validación de la contraseña
    const validations = validatePassword(newPassword);
    console.log("🔍 Validaciones de contraseña:", validations);

    if (!validations.length || !validations.number) {
      setError("La contraseña no cumple con los requisitos mínimos.");
      return;
    }

    if (newPassword !== confirmNewPassword) {
        console.log("❌ Error: Las contraseñas no coinciden.");
        setError("Las contraseñas no coinciden.");
        return;
    }

    try {
        setError("");
        setLoading(true);
        console.log("🔄 Enviando nueva contraseña a Cognito...");

        if (newPassword === confirmNewPassword) {
            await Auth.completeNewPassword(user, newPassword);
            console.log("✅ Contraseña cambiada en Cognito exitosamente.");

            // Obtener el usuario autenticado desde Cognito
            const currentUser = await Auth.currentAuthenticatedUser();
            console.log("👤 Usuario autenticado:", currentUser);

            const userId = currentUser.attributes.sub;
            console.log("📌 ID del usuario (Cognito Sub):", userId);

            // Construcción del payload para la actualización en la base de datos
            const updateUserPayload = {
                id: userId, 
                isProfileUpdated: true 
            };
            console.log("📡 Enviando mutación GraphQL `updateUser` con payload:", updateUserPayload);

            // Actualización del perfil en DynamoDB
            const response = await API.graphql(graphqlOperation(updateUser, { input: updateUserPayload }));
            console.log("✅ Respuesta de GraphQL `updateUser`:", response);

            notify("Contraseña cambiada con éxito y perfil actualizado.");
            updateFormState(() => ({ ...formState, formType: "signedIn" }));
            console.log("✅ Estado actualizado a `signedIn`.");
        } else {
            console.log("❌ Error: Las contraseñas no coinciden.");
            setError("Las contraseñas no coinciden.");
        }
    } catch (error) {
        console.log("🚨 Error capturado:", error);
        setError("Error al cambiar la contraseña.");
    }
    setLoading(false);
    console.log("🔚 Finalizando proceso de cambio de contraseña.");
}


  return (
    <div className={s.container}>
      <ToastContainer />
      <div className={s.firstContainer}>
        <div className={s.info}>
          <h2>Aceleramos la transición hacia un mundo de carbono neutral</h2>
          <p>
            Somos un motor alternativo para facilitar el desarrollo,
            financiación e implementación de proyectos de mitigación de cambio
            climático
          </p>
        </div>
      </div>
      <div className={s.secondContainer}>
        {formType === "signUp" && (
          <div className={s.containerLogin}>
            <div className={s.containerCard}>
              <div className={s.containerTitle}>
                <TerrasachaLogo className={"w-48 h-auto"} />
                <h2 className="text-center mb-4">Registro</h2>
                {error && <Alert variant="danger">{error}</Alert>}
              </div>
              <form className={s.inputContainer}>
                <fieldset>
                  <input
                    name="username"
                    onChange={onChange}
                    placeholder="Usuario"
                    className="border-[1px] border-gray-300 rounded-md"
                  />
                  {inputError.username && (
                    <span style={{ color: "red", fontSize: ".8em" }}>
                      {inputError.username}
                    </span>
                  )}
                </fieldset>
                <p
                  style={{
                    color: "#797979",
                    fontSize: ".6em",
                    margin: 0,
                    width: "100%",
                  }}
                >
                  El nombre de usuario no debe contener espacios
                </p>
                <fieldset>
                  <input
                    type="email"
                    name="email"
                    onChange={onChange}
                    placeholder="Example@example.com"
                    className="border-[1px] border-gray-300 rounded-md"
                  />
                </fieldset>
                <fieldset style={{ position: "relative" }}>
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          onChange={onChange}
          onFocus={() => setFocusPassword(true)} // Mostrar popover al hacer clic
          onBlur={() => setFocusPassword(false)} // Ocultar popover cuando pierde el foco
          placeholder="Contraseña"
          className="border-[1px] border-gray-300 rounded-md w-full"
          style={{
            paddingRight: "2.5rem", // Espacio para el ícono
          }}
        />
        <span
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          style={{
            position: "absolute",
            left: "89%",
            top: "47%",
            transform: "translateY(-50%)",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "black", // Color negro para el ícono
          }}
          aria-label={
            showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
          }
        >
          {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
        </span>
      </fieldset>
      {focusPassword && (
  <div className={s.popover}>
    <ul>
      <li style={{ color: passwordValidations.length ? "green" : "red" }}>
        ✅ Al menos 8 caracteres
      </li>
      <li style={{ color: passwordValidations.number ? "green" : "red" }}>
        ✅ Al menos 1 número
      </li>
    </ul>
  </div>
)}
      <fieldset style={{ position: "relative"}}>
        <input
          type={showConfirmPassword ? "text" : "password"}
          name="confirmPassword"
          onChange={onChange}
          placeholder="Confirmar Contraseña"
          className="border-[1px] border-gray-300 rounded-md w-full"
          style={{
            paddingRight: "2.5rem", // Espacio para el ícono
          }}
        />
        <span
          type="button"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          style={{
            position: "absolute",
            left: "89%",
            top: "47%",
            transform: "translateY(-50%)",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "black", // Color negro para el ícono
          }}
          aria-label={
            showConfirmPassword ? "Ocultar contraseña" : "Mostrar contraseña"
          }
        >
          {showConfirmPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
        </span>
      </fieldset>
      <fieldset>
  <legend>Rol</legend>
  <input
    type="text"
    name="role"
    value="Propietario"
    readOnly
    className="border-[1px] border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
  />
</fieldset>

                {
                  <p style={{ color: "#797979", fontSize: ".6em" }}>
                    {explain}
                  </p>
                }
                <fieldset className={s.checkbox}>
                  <input
                    type="checkbox"
                    name="terms"
                    onChange={() =>
                      updateFormState(() => ({
                        ...formState,
                        terms: !formState.terms,
                      }))
                    }
                  />
                  <label>
                    Acepto los{" "}
                    <a href="/use_terms" target="_blank">
                      términos de uso
                    </a>
                  </label>
                </fieldset>
                <fieldset className={s.checkbox}>
                  <input
                    type="checkbox"
                    name="privacy_policy"
                    onChange={() =>
                      updateFormState(() => ({
                        ...formState,
                        privacy_policy: !formState.privacy_policy,
                      }))
                    }
                  />
                  <label>
                    Acepto la{" "}
                    <a href="/privacy_policy" target="_blank">
                      Politica de privacidad
                    </a>
                  </label>
                </fieldset>
                <button
  type="submit"
  onClick={(e) => signUp(e)}
  disabled={loading || !formState.terms || !formState.privacy_policy}
  className={`w-full px-4 py-2 rounded-md text-white font-semibold ${
    loading || !formState.terms || !formState.privacy_policy
      ? "bg-gray-400 cursor-not-allowed opacity-50" // Estado deshabilitado
      : "bg-green-600 hover:bg-green-700 cursor-pointer" // Estado activo
  }`}
>
  {loading ? "Cargando" : "Registrarse"}
</button>

              </form>
              <div className={s.needAccount}>
                ¿Ya tienes una cuenta?{" "}
                <span
                  style={{ cursor: "pointer" }}
                  className="text-[#6e6c35] text-sm font-bold" 
                  onClick={() =>
                    updateFormState(() => ({
                      ...formState,
                      formType: "signIn",
                    }))
                  }
                >
                  Ingresar
                </span>
              </div>
            </div>
          </div>
        )}
        {formType === "confirmSignUp" && (
          <div className={s.containerLogin}>
            <div className={s.containerCard}>
              <div className={s.containerTitle}>
                <TerrasachaLogo className={"w-48 h-auto"} />
                <h2 className="text-center mb-4">Confirmación</h2>
              </div>
              <Alert>Codigo de verificación enviado a {formState.email}</Alert>
              {error && <Alert variant="danger">{error}</Alert>}
              <form className={s.inputContainer}>
                <fieldset>
                  <legend>Codigo de verificación</legend>
                  <input
                    name="authCode"
                    onChange={onChange}
                    className="border-[1px] border-gray-300 rounded-md"
                  />
                </fieldset>
                <span
                  style={{
                    cursor: "pointer",
                    width: "100%",
                    fontSize: ".9em",
                    color: "rgba(77,188,94,1)",
                    textAlign: "end",
                  }}
                  onClick={(e) => handleResendCode(e, formState.username)}
                >
                  Reenviar código
                </span>
                <button
                  type="submit"
                  onClick={(e) => confirmSignUp(e)}
                  disabled={loading}
                >
                  {loading ? "Cargando" : "Confirmar registro"}
                </button>
              </form>
            </div>
          </div>
        )}
        {formType === "signIn" && (
          <div className={s.containerLogin}>
            <div className={s.containerCard}>
              <div className={s.containerTitle}>
                <TerrasachaLogo className={"w-48 h-auto"} />
                <h2 className="text-center mb-4">Inicio de sesión</h2>
                {error && <Alert variant="danger">{error}</Alert>}
              </div>
              <form className={s.inputContainer}>
                <fieldset>
                  <legend>Usuario</legend>
                  <input
                    name="username"
                    onChange={onChange}
                    className="border-[1px] border-gray-300 rounded-md"
                  />
                </fieldset>
                <fieldset style={{ position: "relative" }}>
               <legend>Contraseña</legend>
              <input
              type={showPassword ? "text" : "password"}
              name="password"
              onChange={onChange}
              className="border-[1px] border-gray-300 rounded-md"
              style={{ paddingRight: "2.5rem" }} // Espacio para el ícono
            />
            <span
              type="button" 
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                left: "90%",
                top: "68%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "black", // Color negro
              }}
              aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
            >
              {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </span>
          </fieldset>
                <span
                  style={{
                    cursor: "pointer",
                    width: "100%",
                    fontSize: ".9em",
                    color: "rgba(77,188,94,1)",
                    textAlign: "end",
                  }}
                  className="text-[#6e6c35] text-sm font-bold"
                  onClick={() =>
                    updateFormState(() => ({
                      ...formState,
                      formType: "ForgotPassword",
                    }))
                  }
                >
                  Olvidaste tu contraseña?
                </span>
                <button
                  type="submit"
                  disabled={loading}
                  onClick={(e) => signIn(e)}
                >
                  {loading ? "Cargando" : "Ingresar"}
                </button>
              </form>
              <div className={s.needAccount}>
                ¿Necesitas una cuenta?{" "}
                <span
                  style={{ cursor: "pointer" }}
                  className="text-[#6e6c35] text-sm font-bold"
                  onClick={() =>
                    updateFormState(() => ({
                      ...formState,
                      formType: "signUp",
                    }))
                  }
                >
                  Registrarse
                </span>
              </div>
            </div>
          </div>
        )}
        {formType === "confirmTOTP" && (
          <div className={s.containerLogin}>
            <div className={s.containerCard}>
              <div className={s.containerTitle}>
              <img src={LOGO} style={{ width: "30px" }} alt="logo" />
                <h2 className="text-center mb-4">Verificación TOTP</h2>
                {error && <Alert variant="danger">{error}</Alert>}
              </div>
              <form className={s.inputContainer}>
                <fieldset>
                  <legend>Código TOTP</legend>
                  <input
                    name="totpCode"
                    onChange={onChange} // Asegúrate de tener la función onChange definida para actualizar el estado
                    className="border-[1px] border-gray-300 rounded-md"
                    placeholder="Introduce el código TOTP"
                  />
                </fieldset>
                <button
                  type="submit"
                  disabled={loading}
                  onClick={(e) => confirmTOTP(e)} // Llama al método confirmTOTP cuando se haga submit
                  className="btn-login"
                >
                  {loading ? "Verificando..." : "Verificar"}
                </button>
              </form>
              <div className={s.needAccount}>
                <span
                  style={{ cursor: "pointer" }}
                  className="text-[#6e6c35] text-sm font-bold"
                  onClick={() =>
                    updateFormState(() => ({
                      ...formState,
                      formType: "signIn", // Regresa al formulario de inicio de sesión si el usuario desea cancelar
                    }))
                  }
                >
                  Regresar a inicio de sesión
                </span>
              </div>
            </div>
          </div>
        )}

        {formType === "ForgotPassword" && (
          <div>
            <div className={s.containerCard}>
              <div className={s.containerTitle}>
                <TerrasachaLogo className={"w-48 h-auto"} />
                <h2 className="text-center mb-4">Recuperar contraseña</h2>
                {error && <Alert variant="danger">{error}</Alert>}
              </div>
              <form className={s.inputContainer}>
                <fieldset>
                  <legend>Usuario</legend>
                  <input 
                  name="username" 
                  onChange={onChange}
                  style={{
                    border: "1px solid black", 
                    borderRadius: "4px", 
                    padding: "0.5rem", 
                    width: "100%", 
                  }}
                   />
                </fieldset>
                <span className={s.forgotPasswordSpan}>
                El código se enviará a la dirección de correo electrónico asociada al usuario
                </span>
                <button
                  type="submit"
                  disabled={loading}
                  onClick={(e) => forgotPassword(e)}
                >
                  {loading ? "Enviando" : "Enviar código"}
                </button>
              </form>
              <div className={s.needAccount}>
              ¿Necesita una cuenta?{" "}
                <span
                  style={{ cursor: "pointer" }}
                  className="text-[#6e6c35] text-sm font-bold"
                  onClick={() =>
                    updateFormState(() => ({
                      ...formState,
                      formType: "signUp",
                    }))
                  }
                >
                  Registrarse
                </span>
              </div>
            </div>
          </div>
        )}
        {formType === "confirmFPcode" && (
          <div>
            <div className={s.containerCard}>
              <div className={s.containerTitle}>
                <TerrasachaLogo className={"w-48 h-auto"} />
                <h2 className="text-center mb-4">Confirmar código</h2>
                {error && <Alert variant="danger">{error}</Alert>}
              </div>
              <form className={s.inputContainer}>
                <fieldset>
                  <legend>Usuario</legend>
                  <input 
                  name="username" 
                  onChange={onChange}
                  style={{
                    border: "1px solid black", 
                    borderRadius: "4px", 
                    padding: "0.5rem", 
                    width: "100%", 
                  }}
                  />
                </fieldset>
                <fieldset>
                  <legend>Código</legend>
                  <input 
                  name="code" 
                  onChange={onChange}
                  style={{
                    border: "1px solid black", 
                    borderRadius: "4px", 
                    padding: "0.5rem", 
                    width: "100%", 
                  }} 
                   />
                </fieldset>
                <fieldset>
                  <legend>Nueva contraseña</legend>
                  <div style={{ position: "relative" }}>
  <input 
    type={showPassword ? "text" : "password"}
    name="password"
    onFocus={() => setShowPopover(true)}
    onBlur={() => setTimeout(() => setShowPopover(false), 200)} // 📌 Esconde el popover con un delay
    onChange={onChange}    // 📌 Valida la contraseña en tiempo real
    style={{
      border: "1px solid black",
      borderRadius: "4px",
      padding: "0.5rem",
      width: "100%",
      paddingRight: "2.5rem",
    }}
  />
  <span
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    style={{
      position: "absolute",
      left: "90%",
      top: "50%",
      transform: "translateY(-50%)",
      background: "none",
      border: "none",
      cursor: "pointer",
      color: "black",
    }}
    aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
  >
    {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
  </span>

  {showPopover && (
    <div
      style={{
        position: "absolute",
        top: "100%",
        left: "0",
        background: "#fff",
        border: "1px solid #ccc",
        borderRadius: "5px",
        padding: "10px",
        boxShadow: "0 0 5px rgba(0,0,0,0.2)",
        fontSize: "0.9em",
        width: "250px",
        zIndex: 10,
      }}
    >
      <strong>Requisitos de contraseña:</strong>
      <ul style={{ paddingLeft: "20px", margin: "5px 0" }}>
        <li style={{ color: passwordValidations.length ? "green" : "red" }}>
          {passwordValidations.length ? "✔" : "✖"} Mínimo 8 caracteres
        </li>
        <li style={{ color: passwordValidations.number ? "green" : "red" }}>
          {passwordValidations.number ? "✔" : "✖"} Al menos 1 número
        </li>
      </ul>
    </div>
  )}
</div>

                </fieldset>
                <button
                  type="submit"
                  disabled={loading}
                  onClick={(e) => confirmNewPassword(e)}
                >
                  {loading ? "Cargando" : "Confirmar nueva contraseña"}
                </button>
              </form>
            </div>
          </div>
        )}
        {formType === "changePassword" && (
  <div>
    <div className={s.containerCard}>
      <div className={s.containerTitle}>
        <h2 className="text-center mb-4">Cambio de contraseña requerido</h2>
      </div>
      {error && <Alert variant="danger">{error}</Alert>}
      <form className={s.inputContainer}>
        <p style={{ color: "#797979", fontSize: ".8em" }}>
          {`Para poder ingresar a la plataforma como ${formState.username} primero debe cambiar la contraseña`}
        </p>

        {/* 📌 Campo de Nueva Contraseña con Popover */}
        <fieldset style={{ position: "relative", marginBottom: "15px" }}>
          <legend>Nueva contraseña</legend>
          <input
            type={showPassword ? "text" : "password"}
            name="newPassword"
            onChange={handleChange}
            onFocus={() => setShowPopover(true)}
            onBlur={() => setTimeout(() => setShowPopover(false), 200)}
            className="border-[1px] border-gray-300 rounded-md w-full"
            style={{ paddingRight: "2.5rem" }}
          />
          <span
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: "absolute",
              left: "90%",
              top: "65%",
              transform: "translateY(-50%)",
              cursor: "pointer",
              color: "black",
            }}
            aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
          >
            {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
          </span>

          {/* 📌 Popover de Validación */}
          {showPopover && (
            <div
              style={{
                position: "absolute",
                top: "100%",
                left: "0",
                background: "#fff",
                border: "1px solid #ccc",
                borderRadius: "5px",
                padding: "10px",
                boxShadow: "0 0 5px rgba(0,0,0,0.2)",
                fontSize: "0.9em",
                width: "250px",
                zIndex: 10,
              }}
            >
              <strong>Requisitos de contraseña:</strong>
              <ul style={{ paddingLeft: "20px", margin: "5px 0" }}>
                <li style={{ color: passwordValidations.length ? "green" : "red" }}>
                  {passwordValidations.length ? "✔" : "✖"} Mínimo 8 caracteres
                </li>
                <li style={{ color: passwordValidations.number ? "green" : "red" }}>
                  {passwordValidations.number ? "✔" : "✖"} Al menos 1 número
                </li>
              </ul>
            </div>
          )}
        </fieldset>

        {/* 📌 Campo de Confirmar Contraseña */}
        <fieldset style={{ position: "relative", marginBottom: "15px" }}>
          <legend>Confirmar contraseña</legend>
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmNewPassword"
            onChange={handleChange}
            className="border-[1px] border-gray-300 rounded-md w-full"
            style={{ paddingRight: "2.5rem" }}
          />
          <span
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            style={{
              position: "absolute",
              left: "90%",
              top: "65%",
              transform: "translateY(-50%)",
              cursor: "pointer",
              color: "black",
            }}
            aria-label={showConfirmPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
          >
            {showConfirmPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
          </span>
        </fieldset>

        <button
          type="submit"
          disabled={loading}
          onClick={(e) => changePassword(e)}
        >
          {loading ? "Cargando" : "Cambiar Contraseña"}
        </button>
      </form>
    </div>
  </div>
)}


        {/* {formType === "signedIn" && (() => {
          if(window.sessionStorage.getItem('redirect_after_login')){
            navigate(JSON.parse(window.sessionStorage.getItem('redirect_after_login')))
          }else{
            navigate('/')
          }
        })} */}
      </div>
    </div>
  );
}
