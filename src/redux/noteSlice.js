import { createSlice } from "@reduxjs/toolkit"
import { toast } from "react-hot-toast"

const initialState = {
  notes: localStorage.getItem("notes")
    ? JSON.parse(localStorage.getItem("notes"))
    : []
}

const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {
    addToNotes: (state, action) => {
      const note = action.payload
      const index = state.notes.findIndex((item) => item._id === note._id)

      if (index >= 0) {
        // If the course is already in the Pastes, do not modify the quantity
        toast.error("note already exist")
        return
      }
      // If the course is not in the Pastes, add it to the Pastes
      state.notes.push(note)
      
      // Update to localstorage
      localStorage.setItem("notes", JSON.stringify(state.notes))
      // show toast
      toast.success("note added")
    },

    updateNotes: (state, action) => {
      const note = action.payload
      const index = state.notes.findIndex((item) => item._id === note._id)

      if (index >= 0) {
        // If the course is found in the Pastes, update it
        state.notes[index] = note
        // Update to localstorage
        localStorage.setItem("notes", JSON.stringify(state.notes))
        // show toast
        toast.success("note updated")
      }
    },
    removeFromNotes: (state, action) => {
      const noteId = action.payload

      console.log(noteId)
      const index = state.notes.findIndex((item) => item._id === noteId)

      if (index >= 0) {
        // If the course is found in the Pastes, remove it
        state.notes.splice(index, 1)
        // Update to localstorage
        localStorage.setItem("notes", JSON.stringify(state.notes))
        // show toast
        toast.success("note deleted")
      }
    },
    resetPaste: (state) => {
      state.notes = []
      // Update to localstorage
      localStorage.removeItem("notes")
    },
  },
})

export const { addToNotes, removeFromNotes, updateNotes } = noteSlice.actions

export default noteSlice.reducer