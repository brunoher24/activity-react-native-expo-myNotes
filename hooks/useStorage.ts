import { Note } from '@/providers/interfaces';
import * as SecureStore from 'expo-secure-store';

export function useStorage() {
  const name = "BRUNOHER24_myNotes";

  const get = async () => {
    const result = await SecureStore.getItemAsync(name);
    if (result) {
      return JSON.parse(result);
    } else {
      return [];
    }
  }

  const saveNote = async (newNote: Note) => {
    let stored = await get();
    await SecureStore.setItemAsync(name, JSON.stringify([...stored, newNote]));
  };

  const updateNote = async (modifiedNote: Note) => {
    let stored = await get();
    const index = stored.findIndex((note: Note) => note.id === modifiedNote.id);
    stored[index] = modifiedNote;
    await SecureStore.setItemAsync(name, JSON.stringify(stored));
  };

  const deleteNote = async (noteId: string) => {
    let stored = await get();
    const index = stored.findIndex((note: Note) => note.id === noteId);
    stored.splice(index, 1);
    await SecureStore.setItemAsync(name, JSON.stringify(stored));
  };

  return {
    get,
    saveNote,
    updateNote,
    deleteNote
  };
}
