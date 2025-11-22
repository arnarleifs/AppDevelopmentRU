import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: "Main",
          }}
        />
        <Stack.Screen
          name="gallery"
          options={{
            title: "Gallery",
          }}
        />
        <Stack.Screen
          name="preview"
          options={{
            title: "Preview",
          }}
        />
      </Stack>
    </GestureHandlerRootView>
  );
}
