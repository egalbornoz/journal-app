/* eslint-disable no-extra-boolean-cast */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useMemo } from "react";

import { Link as RouterLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  Grid,
  Typography,
  TextField,
  Button,
  Link,
  Alert,
} from "@mui/material";
import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks";
import { startUserWithEmailAndPassword } from "../../store/auth";

const formData = {
  displayName: "",
  email: "",
  password: "",
};
// Validación personalizada
const formValidations = {
  email: [(value) => value.includes("@"), "El correo no tiene formato valido"],
  password: [
    (value) => value.length >= 6,
    "El password debe tener al menos 7 caracteres",
  ],
  displayName: [(value) => value.length >= 1, "El nombre es obligatorio"],
};

export const RegisterPage = () => {
  const dispatch = useDispatch();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const { status, errorMessage } = useSelector((state) => state.auth);
  const error = errorMessage;

  const isCheckingAuthentication = useMemo(() => status === "checking");
  const {
    formState,
    displayName,
    email,
    password,
    onInputChange,
    isFormValid,
    displayNameValid,
    emailValid,
    passwordValid,
  } = useForm(formData, formValidations);

  // Funcion onSubmit para recibir los valores del formulario login

  const onSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setFormSubmitted(true);
    if (!isFormValid) return;
    dispatch(startUserWithEmailAndPassword(formState));
  };

  return (
    <AuthLayout title="Crear cuenta">
      <form onSubmit={onSubmit}
        className="animate__animated animate__fadeIn animate__faster"
      >
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Nombre completo"
              type="text"
              placeholder="Nombre"
              fullWidth
              name="displayName"
              onChange={onInputChange}
              value={displayName}
              error={!!displayNameValid && formSubmitted}
              helperText={displayNameValid}
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Correo"
              type="email"
              placeholder="Correo@google.com"
              fullWidth
              name="email"
              onChange={onInputChange}
              value={email}
              error={!!emailValid && formSubmitted}
              helperText={emailValid}
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Contraseña"
              type="password"
              placeholder="Contraseña"
              fullWidth
              name="password"
              onChange={onInputChange}
              value={password}
              error={!!passwordValid && formSubmitted}
              helperText={passwordValid}
            />
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12} display={!!errorMessage ? errorMessage : "none"}>
              <Alert severity="error">{error}</Alert>
            </Grid>
            <Grid item xs={12}>
              <Button
                disabled={isCheckingAuthentication}
                type="submit"
                variant="contained"
                fullWidth
              >
                Crear cuenta
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}></Grid>
          </Grid>

          <Grid container direction="row" justifyContent="end">
            <Typography sx={{ mr: 1 }}>¿Ya tienes cuenta?</Typography>
            <Link component={RouterLink} color="inherit" to="/auth/login">
              <Typography>Iniciar sesión</Typography>
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
