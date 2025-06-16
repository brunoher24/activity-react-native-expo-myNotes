import { Stack } from 'expo-router';

export default function StackLayout() {
  return (
    <Stack>
      <Stack.Screen name="[noteId]" options={{headerShown: false}} />
    </Stack>
  );
}
