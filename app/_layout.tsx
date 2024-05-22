import Theme from '@/constants/Theme';
import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { Stack, router, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, TouchableOpacity, View } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { ClerkProvider, useAuth } from '@clerk/clerk-expo';
import { TokenCache } from '@clerk/clerk-expo/dist/cache';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ModalHeaderText from '@/components/ModalHeaderText';
import Colors from '@/constants/Colors';

const EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY: string = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY as string;

const tokenCache: TokenCache = {
      async getToken(key: string): Promise<string | null> {
            try {
                  return SecureStore.getItemAsync(key);
            } catch (error) {
                  console.error(error);
                  return null;
            }
      },
      async saveToken(key: string, token: string): Promise<void> {
            try {
                  return SecureStore.setItemAsync(key, token);
            } catch (error) {
                  console.error(error);
            }
      },
};

export {
      // Catch any errors thrown by the Layout component.
      ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
      // Ensure that reloading on `/modal` keeps a back button present.
      initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
      const [loaded, error] = useFonts({
            'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
            'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
            'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
      });

      // Expo Router uses Error Boundaries to catch errors in the navigation tree.
      useEffect(() => {
            if (error) throw error;
      }, [error]);

      useEffect(() => {
            if (loaded) {
                  SplashScreen.hideAsync();
            }
      }, [loaded]);

      if (!loaded) {
            return null;
      }

      return (
            <GestureHandlerRootView style={{ flex: 1 }}>
                  <ClerkProvider
                        publishableKey={EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}
                        tokenCache={tokenCache}
                  >
                        <RootLayoutNav />
                  </ClerkProvider>
            </GestureHandlerRootView>
      );
}

function RootLayoutNav() {
      const { isLoaded, isSignedIn } = useAuth(); // clerk hook

      const router = useRouter();

      useEffect(() => {
            if (isLoaded && !isSignedIn) {
                  router.push('/(modals)/login');
            }
      }, [isLoaded, isSignedIn]);

      if (!isLoaded) {
            return (
                  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator size='large' />
                  </View>
            );
      }

      return (
            <Stack>
                  {/* screens inside (tabs) and listing will be displayed normal */}
                  <Stack.Screen
                        name='(tabs)'
                        options={{ headerShown: false, headerTitle: '' }}
                  />

                  {/* screens inside (modals) will be displayed as modals */}
                  <Stack.Screen
                        name='(modals)/login'
                        options={{
                              presentation: 'modal',
                              title: 'Log in or sign up',
                              headerTitleStyle: Theme.headerCaption,
                              headerLeft: () => (
                                    <TouchableOpacity
                                          onPress={() => {
                                                // close modal
                                                router.back();
                                          }}
                                    >
                                          <Ionicons
                                                name='close-outline'
                                                size={24}
                                                color='black'
                                          />
                                    </TouchableOpacity>
                              ),
                        }}
                  />
                  <Stack.Screen
                        name='(modals)/booking'
                        options={{
                              presentation: 'transparentModal',
                              animation: 'fade',
                              title: 'Bookings',
                              headerTransparent: true,
                              headerTitle: (props) => <ModalHeaderText />,
                              headerLeft: () => (
                                    <TouchableOpacity
                                          onPress={() => {
                                                // close modal
                                                router.back();
                                          }}
                                          style={{
                                                backgroundColor: Colors.white,
                                                borderColor: Colors.grey,
                                                borderWidth: 1,
                                                borderRadius: 20,
                                                padding: 4,
                                          }}
                                    >
                                          <Ionicons
                                                name='close-outline'
                                                size={24}
                                                color='black'
                                          />
                                    </TouchableOpacity>
                              ),
                        }}
                  />

                  <Stack.Screen
                        name='listing/[id]'
                        options={{ headerTitle: '', headerTransparent: true }}
                  />
            </Stack>
      );
}

const styles = StyleSheet.create({});
