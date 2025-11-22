import { store } from "@/src/redux";
import { Stack } from "expo-router";
import { Provider as PaperProvider } from "react-native-paper";
import { Provider as StoreProvider } from "react-redux";

export default function RootLayout() {
  return (
    <StoreProvider store={store}>
      <PaperProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="pokemon-details"
            options={{ title: "Pokemon Details" }}
          />
        </Stack>
      </PaperProvider>
    </StoreProvider>
  );
}
