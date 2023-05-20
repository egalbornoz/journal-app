/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  addNewEmptyNote,
  deleteNoteById,
  savingNewNote,
  setActiveNote,
  setNotes,
  setPhotosToActivedNote,
  setSaving,
  updateNote,
} from ".";
import { FirebaseDB } from "../../firebase/config";
import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { fileUpload, loadNotes } from "../../helpers";

export const startNewNote = () => {
  return async (dispatch, getState) => {
    //Todo: tarea dispatch
    dispatch(savingNewNote());

    const { uid } = getState().auth;

    const newNote = {
      title: "",
      body: "",
      date: new Date().getTime(),
    };

    const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));

    const setDocResp = await setDoc(newDoc, newNote);

    newNote.id = newDoc.id;

    dispatch(addNewEmptyNote(newNote));
    dispatch(setActiveNote(newNote));
  };
};

export const startLoadingNotes = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    if (!uid) throw new Error("El UID del usuario no existe");
    const notes = await loadNotes(uid);

    dispatch(setNotes(notes));
  };
};

export const startSaveNote = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    const { active: note } = getState().journal;
    const noteToFireStore = { ...note };
    delete noteToFireStore.id;

    const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
    await setDoc(docRef, noteToFireStore, { merge: true }); //Actualizar nota

    dispatch(updateNote(note));
  };
};
export const startDeleteNote = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    const { active: note } = getState().journal;


    const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);

    //Se borra la nota de firebase
    const resp = await deleteDoc(docRef);

//Borrar imagenes de cloudinary
//Borrar la nota del state

    dispatch(deleteNoteById(note.id));
  };
};

export const startUploadingFiles = (files = []) => {
  return async (dispatch) => {
    dispatch(setSaving());

    // Enviar multiples imagenes  simultaneamente a cloudinary

    const fileUploadPromises = [];

    for (const file of files) {
      fileUploadPromises.push(fileUpload(file));
    }

    const photosUrl = await Promise.all(fileUploadPromises);
    // se setean las imagenes en el state
    dispatch(setPhotosToActivedNote(photosUrl));
  };
};
