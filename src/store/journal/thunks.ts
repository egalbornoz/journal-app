import { addNewEmptyNote, savingNewNote, setActiveNote, setNotes } from ".";
import { FirebaseDB } from "../../firebase/config";
import { collection, doc, setDoc } from "firebase/firestore/lite";
import { loadNotes } from "../../helpers";

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
