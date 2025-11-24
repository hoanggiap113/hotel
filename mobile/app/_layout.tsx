import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { Stack } from "expo-router";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import * as eva from "@eva-design/eva";

import "../global.css";
const queryClient = new QueryClient();
export default function RootLayout() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        {" "}
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={eva.light}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>
        </ApplicationProvider>
      </QueryClientProvider>
    </>
  );
}
