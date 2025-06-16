import { Colors } from '@/constants/Colors';
import { addNote, updateNote } from "@/features/noteSlice";
import { useStorage } from '@/hooks/useStorage';
import { generateRandomId } from '@/providers/utils';
import { Picker } from '@react-native-picker/picker';
import type { PropsWithChildren } from 'react';
import { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";

import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useRouter } from 'expo-router';

type Props = PropsWithChildren<{
  action?: "update" | "create";
  id?: string;
  title?: string;
  content?: string;
  priority?: "high" | "medium" | "low";
}>;

export function NoteForm({
  action = "create",
  id,
  title,
  content,
  priority
}: Props) {
  const [noteId, setNoteId] = useState("");
  const [selectedPriority, setSelectedPriority] = useState<"high" | "medium" | "low">("low");
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [submited, setSubmited] = useState(false);
  const [shouldRefreshForm, setShouldRefreshForm] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if(action === "update") {
      setNoteTitle(title ?? "");
      setNoteContent(content ?? "");
      setSelectedPriority(priority ?? "low");
      setNoteId(id ?? "");
    }
  }, [priority, title, content, action])

  useEffect(() => {
    if(shouldRefreshForm) {
      setShouldRefreshForm(false);
      setNoteTitle("");
      setNoteContent("");
    }
  }, [shouldRefreshForm]);

  const storage = useStorage();

  const save = async (newNoteId: string) => {
    const newNote = {id: newNoteId, title: noteTitle, content: noteContent, priority: selectedPriority, date_: new Date().getTime()};
    await storage.saveNote(newNote);
    dispatch(addNote(newNote));
  };

  const update = async () => {
    const modifiedNote = {id: noteId, title: noteTitle, content: noteContent, priority: selectedPriority, date_: new Date().getTime()};
    await storage.updateNote(modifiedNote)
    dispatch(updateNote(modifiedNote));
  };

  const submitHandler = async () => {
    if(noteTitle === "" || noteContent === "") {
      return;
    }
    if(action === "update") {
      await update();
      setSubmited(true);
      setTimeout(() => {
        setSubmited(false);
        router.dismissTo('/')
      }, 1000);
    } else {
      await save(generateRandomId(15));
      setSubmited(true);
      setTimeout(() => {
        setSubmited(false);
        setShouldRefreshForm(true);
      }, 3000);
    }

    
  };

  return (
    <View style={styles.form}>
        <TextInput 
        style={styles.input}
        placeholderTextColor="#cbcbcb"
        placeholder="Title" 
        value={noteTitle} 
        onChangeText={setNoteTitle} />
        
        <TextInput 
        style={styles.input}
        editable
        multiline
        numberOfLines={4}
        placeholder="Content" 
        placeholderTextColor="#cbcbcb"
        value={noteContent} 
        onChangeText={setNoteContent} />
          <Picker
            selectedValue={selectedPriority}
            onValueChange={itemValue =>
              setSelectedPriority(itemValue)
            }>
            <Picker.Item label="Low" value="low" />
            <Picker.Item label="Medium" value="medium" />
            <Picker.Item label="High" value="high" />
          </Picker>
          <Pressable 
          style={styles.submitBtn}
          onPress={submitHandler}>
              {({ pressed }) => (
              <Text style={{ opacity: pressed ? 0.5 : 1,color: "#fff", textAlign: "center"}}>
                {submited ? action === "create" ? 'Note ajoutée !' : 'Note modifiée !' : 'Créer'}
              </Text>
            )}
          </Pressable>
        </View>
  );
}

const styles = StyleSheet.create({
  form: {
    backgroundColor: "#fff",
    boxShadow: "2 2 2 2 silver",
    padding: 16,
    borderRadius: 16,
    margin: 16,
  },
  submitBtn: {
    backgroundColor: Colors.dark.background,
    padding: 8,
    borderRadius: 16,
    margin: 16,
    boxShadow: "2 2 2 2 silver",
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    margin: 8
  }
});
