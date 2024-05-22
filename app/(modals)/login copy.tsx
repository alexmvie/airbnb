import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useWarmUpBrowser } from '@/hooks/useWarmUpBrowser';
import Colors from '@/constants/Colors';
import Theme from '@/constants/Theme';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

import { useOAuth } from '@clerk/clerk-expo';

enum Strategy {
      Google = 'oauth_google',
      Apple = 'oauth_apple',
      Facebook = 'oauth_facebook',
}

const login = () => {
      // needed for Android
      useWarmUpBrowser();

      const router = useRouter();
      const { startOAuthFlow: googleAuth } = useOAuth({ strategy: 'oauth_google' });
      const { startOAuthFlow: appleAuth } = useOAuth({ strategy: 'oauth_apple' });
      const { startOAuthFlow: facebookAuth } = useOAuth({ strategy: 'oauth_facebook' });

      const onSelectAuth = async (strategy: Strategy) => {
            const selectedAuth = {
                  [Strategy.Google]: googleAuth,
                  [Strategy.Apple]: appleAuth,
                  [Strategy.Facebook]: facebookAuth,
            }[strategy];

            try {
                  const { createdSessionId, setActive } = await selectedAuth();
                  console.log("🚀 ~ onSelectAuth ~ createdSessionId:", createdSessionId)
                  
                  if (createdSessionId) {
                        setActive!({ session: createdSessionId });
                        router.back();
                  }
            } catch (err) {
                  console.error('OAuth error', err);
            }
      };

      return (
            <View style={Theme.container}>
                  <TextInput
                        placeholder='Email'
                        autoCapitalize='none'
                        style={[Theme.inputField, { marginBottom: 20 }]}
                  />
                  <TouchableOpacity style={Theme.btn}>
                        <Text style={Theme.btnText}>Continue</Text>
                  </TouchableOpacity>

                  <View style={Theme.seperatorView}>
                        <View style={Theme.seperator} />
                        <Text style={Theme.seperatorText}>or</Text>
                        <View style={Theme.seperator} />
                  </View>

                  <View>
                        <TouchableOpacity
                              style={[Theme.btnOutline, { marginBottom: 20 }]}
                              onPress={() => onSelectAuth(Strategy.Google)}
                        >
                              <Ionicons
                                    name='logo-google'
                                    style={[Theme.btnIcon, { color: Colors.google }]}
                              />
                              <Text style={Theme.btnTextOutline}>Continue with Google</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                              style={[Theme.btnOutline, { marginBottom: 20 }]}
                              onPress={() => onSelectAuth(Strategy.Apple)}
                        >
                              <Ionicons
                                    name='logo-apple'
                                    style={[Theme.btnIcon, { color: Colors.apple }]}
                              />
                              <Text style={Theme.btnTextOutline}>Continue with Apple</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                              style={Theme.btnOutline}
                              onPress={() => onSelectAuth(Strategy.Facebook)}
                        >
                              <Ionicons
                                    name='logo-facebook'
                                    style={[Theme.btnIcon, { color: Colors.facebook }]}
                              />
                              <Text style={Theme.btnTextOutline}>Continue with Facebook</Text>
                        </TouchableOpacity>
                  </View>
            </View>
      );
};

export default login;

const styles = StyleSheet.create({});
