import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { initNotes } from "@/features/noteSlice";
import { useStorage } from '@/hooks/useStorage';
import { Note } from '@/providers/interfaces';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ImageBackground } from 'expo-image';
import { Link } from 'expo-router';
import { useEffect } from 'react';
import { StyleSheet } from 'react-native';

import { useDispatch, useSelector } from "react-redux";
import NoteCard from '@/components/NoteCard';

export default function DashboardScreen() {
  const storage = useStorage();
  const { notes } = useSelector((state: any) => state.note);
  const dispatch = useDispatch();
 
   useEffect(() => {
    if(notes.length === 0) {
        storage.get().then(storedNotes => {
          if(storedNotes.length === 0) return;
          const sorted = storedNotes.sort((a: Note, b: Note) => {
            return new Date(b.date_).getTime() - new Date(a.date_).getTime();
          });
          dispatch(initNotes(sorted));
        });
    }
  }, [notes]);

  return (
    <ThemedView style={{flex: 1}}>
      <Link style={styles.addNoteBtn} href="/add-note">
        <Ionicons name="add-circle" size={40} color="black" />
      </Link>
      <ParallaxScrollView
      headerImage={<ImageBackground
        source={require('@/assets/images/note-1.png')}
        style={styles.bgImg}
        contentFit="cover"
      />}
      >
        <ThemedView style={{padding: 8}}>
          {notes.map((note:Note, index: number) => (
            <NoteCard note={note} key={index}/>
          ))}
        </ThemedView>
        
      </ParallaxScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  bgImg: {
    flex: 1,
    justifyContent: 'center'
  },
  addNoteBtn: {
    position: "absolute",
    bottom: 48,
    right: 16,
    fontSize: 60,
    zIndex: 1,
  },
  noteCard: {
    backgroundColor: "#fffffff0",
    boxShadow: "2 2 2 2 silver",
    padding: 16,
    borderRadius: 16,
    width: "100%",
    boxSizing: "border-box",
    overflow: "hidden",

  },
  noteCtnr: {
    marginTop: 8,
    marginBottom: 8,
    position: "relative"
  },

  linkNote: {

  },
  deleteBtn: {
    backgroundColor: Colors.red,
  borderTopRightRadius: 12,
  borderBottomRightRadius: 12,
  position: "absolute",
  right: 0,
  top: 0,
  height: "100%",
  width: 48,
  justifyContent: "center",
  alignItems: "center"
  },
  
  notePriority: {

  }, 
  noteTitle: {

  }, 
  noteDate: {

  }
});


