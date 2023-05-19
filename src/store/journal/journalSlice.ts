import { createSlice } from "@reduxjs/toolkit";

export const journalSlice = createSlice({
  name: "journal",
  initialState: {
    isSaving: false,
    messageSaved: "",
    notes: [],
    active:null, 
    // active:{
    //   title: "",
    //   body: "",
    //   id: "",
    //   date: 0,
    //   imageUrls: [],
    // },
  },
  reducers: {
    savingNewNote: (state) => {
      state.isSaving = true;
      state.messageSaved = "";
    },

    addNewEmptyNote: (state, action) => {
      state.notes.push(action.payload);
      state.isSaving = false;
      state.messageSaved = "";
    },
    setActiveNote: (state, action) => {
      state.active = action.payload;
      state.messageSaved = "";
    },
    setNotes: (state, action) => {
      state.notes = action.payload;
    },
    setSaving: (state) => {
      state.isSaving = true;
      state.messageSaved = "";
      //Todo Mensaje de error
    },
    updateNote: (state, action) => {
      state.isSaving = false;
      state.notes = state.notes.map((note) => {
        if (note.id === action.payload.id) {
          return action.payload;
        }
        return note;
      });
      //Mostrar mensaje de atualizar
      state.messageSaved = `${action.payload.title}, actualizada  correctamente `;
    },

    _setPhotosToActivedNote: (state, action) => {
      state.active.imageUrls = [...state.active.imageUrls, ...action.payload];
      state.isSaving = false;
    },
    get setPhotosToActivedNote() {
      return this._setPhotosToActivedNote;
    },
    set setPhotosToActivedNote(value) {
      this._setPhotosToActivedNote = value;
    },
    deleteNote: (state, action) => {},
  },
});

// Action creators are generated for each case reducer function
export const {
  addNewEmptyNote,
  setActiveNote,
  setNotes,
  setSaving,
  updateNote,
  deleteNote,
  savingNewNote,
  setPhotosToActivedNote,
} = journalSlice.actions;

export default journalSlice.reducer;
