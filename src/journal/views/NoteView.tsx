/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux";
import {
  DeleteOutline,
  SaveOutlined,
  UploadOutlined,
} from "@mui/icons-material";
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
import { ImageGallery } from "../components";
import { useForm } from "../../hooks";
import { useEffect, useMemo, useRef } from "react";
import {
  setActiveNote,
  setSaving,
  startDeleteNote,
  startSaveNote,
  startUploadingFiles,
} from "../../store/journal";

export const NoteView = () => {
  const dispatch = useDispatch();
  //  Se renombra el valor del state active como note
  const {
    active: note,
    messageSaved,
    isSaving,
  } = useSelector((state) => state.journal);

  const { body, title, onInputChange, formState, date } = useForm(note);

  const dateString = useMemo(() => {
    const newDate = new Date(date);
    return newDate.toUTCString();
  }, [date]);

  const fileInputRef = useRef();

  useEffect(() => {
    dispatch(setActiveNote(formState));
  }, [formState]);

  useEffect(() => {
    //Verifica si hay mensaje

    if (messageSaved.length > 0) {
      Swal.fire("Nota actualizada", messageSaved, "success");
    }
    //SweetAlert
  }, [messageSaved]);

  const onSaveNote = () => {
    dispatch(startSaveNote());
    dispatch(setSaving());
  };

  const onFileInputChange = ({ target }) => {
    if (target.files === 0) return;
    dispatch(startUploadingFiles(target.files));
  };

const onDelete = () =>{
  dispatch(startDeleteNote())
}


  return (
    <Grid
      className="animate__animated animate__fadeIn animate__faster"
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ mb: 1 }}
    >
      <Grid item>
        <Typography fontSize={39} fontWeight="light">
          {dateString}
        </Typography>
      </Grid>
      <Grid item>
        <input
          type="file"
          ref={fileInputRef}
          multiple
          onChange={onFileInputChange}
          style={{ display: "none" }}
        />
        <IconButton
          color="primary"
          disabled={isSaving}
          onClick={() => fileInputRef.current.click()}
        >
          <UploadOutlined />
        </IconButton>
        <Button
          disabled={isSaving}
          onClick={onSaveNote}
          color="primary"
          sx={{ padding: 2 }}
        >
          <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
          Guardar
        </Button>
      </Grid>
      <TextField
        type="text"
        variant="filled"
        fullWidth
        placeholder="Ingrese un título"
        label="Título"
        name="title"
        value={title}
        onChange={onInputChange}
        sx={{ border: "none", mb: 1 }}
      />
      <Grid container>
        <TextField
          type="text"
          variant="filled"
          fullWidth
          multiline
          placeholder="¿Qué sucedió en el día de hoy?"
          minRows={5}
          name="body"
          value={body}
          onChange={onInputChange}
        />
      </Grid>
      <Grid container justifyContent="end">
        <Button
        onClick={onDelete}
        sx={{mt:2}}
        color='error'
        >
          <DeleteOutline />
          Borrar
        </Button>
      </Grid>

      {/* Galería de imagenes */}
      <ImageGallery images={note.imageUrls} />
    </Grid>
  );
};
