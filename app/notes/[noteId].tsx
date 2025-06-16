import { NoteForm } from '@/components/NoteForm';
import { Note } from '@/providers/interfaces';
import { useLocalSearchParams } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from 'react';
import { Platform, View } from 'react-native';

export default function Users() {
  const { noteId } = useLocalSearchParams();
  const [note, setNote] = useState<Note>({id: "", title: "", content: "", priority: "low", date_: 0})
  useEffect(() => {
    if(Platform.OS === "web") {
        const stored = localStorage.getItem("BRUNOHER24_myNotes");
        if(stored) {
            setNote(JSON.parse(stored).find((note: Note) => note.id === noteId));        }
      } else {
        const getFromStore = async () => {
          const result = await SecureStore.getItemAsync("BRUNOHER24_myNotes");
          if (result) {
            alert("🔐 Here's your value 🔐 \n" + result);
            setNote(JSON.parse(result).find((note: Note) => note.id === noteId));
          } else {
            alert('No values stored under that key.');
          }
        }
        getFromStore();
      }
  }, [noteId]);

  return (
    <View>
      <NoteForm
      action="update"
      id={note.id}
      title={note.title}
      content={note.content}
      priority={note.priority}
      />
    </View>
  );
}