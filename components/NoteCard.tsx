import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { Note } from '@/providers/interfaces';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Link } from 'expo-router';
import { useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated';
import { useDispatch } from "react-redux";
import { deleteNote } from "@/features/noteSlice";
import { useStorage } from '@/hooks/useStorage';


export default function NoteCard({note} : {note: Note}) {
  const dispatch = useDispatch();
  const storage = useStorage();
  const swipePoints: any = useRef([]);
  const deleteTranslateXMap = useSharedValue(0);

const animatedStyle = 
  useAnimatedStyle(() => ({
    transform: [
      {
        translateX: withTiming(deleteTranslateXMap.value, {
          duration: 200,
        }),
      },
    ],
  }))

  const swipingHandler = (e: any) => {
    swipePoints.current.push(e.nativeEvent.targetTouches[0].clientX);
  };

  const hasSwipedHandler = () => {
    const distanceSwiped =
    swipePoints.current[0] - swipePoints.current[swipePoints.current.length - 1];
  
    if (distanceSwiped > 40) {
      deleteTranslateXMap.value = -48
    } else if (distanceSwiped < -40) {
      deleteTranslateXMap.value = 0
    }
  
    swipePoints.current = [];
  };

  const deleteNoteHandler = (noteId: string) => {
    storage.deleteNote(noteId);
    dispatch(deleteNote(noteId));
  };

  return (

              <View style={styles.noteCtnr} onTouchMove={swipingHandler} onTouchEnd={hasSwipedHandler}>
                  <Link
                  href={{
                    pathname: '/notes/[noteId]',
                    params: { noteId: note.id }
                  }}
                  style={styles.noteCard}
                  >
                    <ThemedView>
                      <Text style={styles.notePriority}>{note.priority === "high" ? "❗" : note.priority === "medium" ? "⚠️" : "✔  "}</Text>
                      <Text style={styles.noteTitle}>{note.title}</Text>
                      <Text style={styles.noteDate}>{note.formatedDate}</Text>
                    </ThemedView>
                  </Link>

                  <Animated.View style={[
                    styles.deleteBtn,
                    animatedStyle,
                  ]}>
                    <TouchableOpacity 
                    style={styles.deleteBtn}
                    onPress={() => deleteNoteHandler(note.id)}>
                      <Ionicons name="trash-outline" size={24} color="white" style={{width:120}} />
                    </TouchableOpacity>
                  </Animated.View>
              </View>    
   
       
  );
}

const styles = StyleSheet.create({
  noteCard: {
    
  },
  noteCtnr: {
    overflow: "hidden",
    marginTop: 8,
    marginBottom: 8,
    position: "relative",
    backgroundColor: "#fffffff0",
    boxShadow: "2 2 2 2 silver",
    padding: 16,
    borderRadius: 16,
    width: "100%",
    boxSizing: "border-box"
  },

  linkNote: {

  },
  deleteBtn: {
    backgroundColor: Colors.red,
  borderTopRightRadius: 12,
  borderBottomRightRadius: 12,
  position: "absolute",
  right: -48,
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


