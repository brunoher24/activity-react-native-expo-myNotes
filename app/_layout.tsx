import { useColorScheme } from '@/hooks/useColorScheme';
import store from '@/store';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';
import { Provider } from 'react-redux';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  const stackScreenOptions = (headerTitle: string) => {
    return {
      headerTitle, 
      headerTitleAlign: "center" as "center" | "left",
      headerStyle: {
        backgroundColor: colorScheme === 'dark' ? DarkTheme.colors.background : DefaultTheme.colors.background,
      },
      headerTintColor: colorScheme === 'dark' ? DarkTheme.colors.text : DefaultTheme.colors.text,
    }
  };


  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{flex: 1}}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>  
        <Stack>
          <Stack.Screen name="index" 
          options={stackScreenOptions("Accueil")}
          />
          <Stack.Screen name="add-note" options={stackScreenOptions("Ajouter une note")}/>
          <Stack.Screen name="edit-note" options={stackScreenOptions("Modifier")}/>
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
      </GestureHandlerRootView>
    </Provider>
  );
}
