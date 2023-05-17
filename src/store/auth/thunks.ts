import { checkingCredentials, login, logout } from "./";
import {
  loginWithEmailPassword,
  logoutFirebase,
  registerUserWithEmail,
  signInWithGoogle,
} from "../../firebase/providers";

// Actions de chequeo de autenticación
export const checkingAuthentication = (email, password) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
  };
};

// Action de iniciar sesión con Google
export const startGoogleSignIn = () => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
    const result = await signInWithGoogle();
    if (!result.ok) return dispatch(logout(result.errorMessage));
    dispatch(login(result));
  };
};

// Action de registrar usuaio y autenticar
export const startUserWithEmailAndPassword = ({
  email,
  password,
  displayName,
}) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
    const { ok, uid, photoURL, errorMessage } = await registerUserWithEmail({
      email,
      password,
      displayName,
    });
    if (!ok) return dispatch(logout({ errorMessage }));
    dispatch(login({ uid, displayName, email, photoURL }));
  };
};

// Action de autenticar o iniciar sesión con usuario y password
export const startLoginWithEmailPassword = ({ email, password }) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
    const result = await loginWithEmailPassword({ email, password });
    if (!result.ok) return dispatch(logout("Error email/password"));
    dispatch(login(result));
  };
};

export const startLogout = () => {
  return async (dispatch) => {
    await logoutFirebase();
    dispatch(logout());
  };
};
