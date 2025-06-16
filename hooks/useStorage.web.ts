import { Note } from '@/providers/interfaces';

export function useStorage() {
  const name = "BRUNOHER24_myNotes";

  const get = async () => {
    let stored: string | null = localStorage.getItem(name);  
    let notes:Note[] = [];  
    if(stored) {
      notes = JSON.parse(stored);
    }
    return notes;
  };

  const saveNote = async (note: Note) => {
    const stored = await get();
    localStorage.setItem(name, JSON.stringify([...stored, note]));
  };

  const updateNote = async (modifiedNote: Note) => {
    let stored = await get();
    const index = stored.findIndex((note: Note) => note.id === modifiedNote.id);
    stored[index] = modifiedNote;
    localStorage.setItem(name, JSON.stringify(stored));

  };

  const deleteNote = async (noteId: string) => {
    let stored = await get();
    const index = stored.findIndex((note: Note) => note.id === noteId);
    stored.splice(index, 1);
    localStorage.setItem(name, JSON.stringify(stored));
  };

  return {
    get,
    saveNote,
    updateNote,
    deleteNote
  };
}
