import { Button, SafeAreaView, StyleSheet, Text, View, Image } from 'react-native';
import React, { useEffect } from 'react';
import { useAuth, useUser } from '@clerk/clerk-expo';
import Theme from '@/constants/Theme';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';
import * as ImagePicker from 'expo-image-picker';

const Profile = () => {
      const { signOut, isSignedIn } = useAuth();
      const { user } = useUser();
      const [firstName, setFirstName] = React.useState(user?.firstName);
      const [lastName, setLastName] = React.useState(user?.lastName);
      const [email, setEmail] = React.useState(user?.emailAddresses[0].emailAddress);
      const [edit, setEdit] = React.useState(false);

      useEffect(() => {
            if (!user) return;

            setFirstName(user.firstName);
            setLastName(user.lastName);
            setEmail(user.emailAddresses[0].emailAddress);
      }, [user]);

      const onSaveUser = async () => {
            try {
                  if (!firstName || !lastName) return;

                  await user?.update({
                        firstName,
                        lastName,
                  });
            } catch (error) {
                  console.log('🚀 ~ onSaveUser ~ error:', error);
            }
            setEdit(false);
      };

      const onCaptureImage = async () => {
            const result = await ImagePicker.launchImageLibraryAsync({
                  mediaTypes: ImagePicker.MediaTypeOptions.Images,
                  allowsEditing: true,
                  quality: 0.75,
                  base64: true,
            });

            if (!result.canceled) {
                  const base64: string = `data:image/png;base64,${result.assets[0].base64}`;

                  await user?.setProfileImage({
                        file: base64,
                  });
            }
      };

      return (
            <SafeAreaView style={Theme.container}>
                  <View style={styles.container}>
                        <Text style={Theme.headline}>Profile</Text>
                        <Ionicons
                              name='notifications-outline'
                              size={24}
                              color='black'
                        />
                  </View>
                  {user && (
                        <View style={styles.card}>
                              <TouchableOpacity onPress={onCaptureImage}>
                                    <Image
                                          source={{ uri: user?.imageUrl }}
                                          style={styles.avatar}
                                    />
                              </TouchableOpacity>
                              <View style={styles.infoContainer}>
                                    {edit ? (
                                          <View style={styles.editRow}>
                                                <TextInput
                                                      value={firstName}
                                                      onChangeText={setFirstName}
                                                      style={[styles.name, Theme.inputField]}
                                                />
                                                <TextInput
                                                      value={lastName}
                                                      onChangeText={setLastName}
                                                      style={[styles.name, Theme.inputField]}
                                                />
                                                <TouchableOpacity onPress={onSaveUser}>
                                                      <Ionicons
                                                            name='checkmark-outline'
                                                            size={24}
                                                            color={Colors.primary}
                                                      />
                                                </TouchableOpacity>
                                          </View>
                                    ) : (
                                          <View style={styles.editRow}>
                                                <Text style={styles.name}>
                                                      {firstName} {lastName}
                                                </Text>
                                                <TouchableOpacity onPress={() => setEdit(true)}>
                                                      <Ionicons
                                                            name='create-outline'
                                                            size={24}
                                                            color={Colors.primary}
                                                      />
                                                </TouchableOpacity>
                                          </View>
                                    )}
                              </View>
                              <Text style={styles.sub}>{email}</Text>
                              <Text style={styles.sub}>Since {user?.createdAt?.toLocaleDateString()}</Text>
                        </View>
                  )}

                  {isSignedIn && (
                        <Button
                              title={`Log out, ${firstName} ${lastName}`}
                              onPress={() => signOut()}
                        />
                  )}

                  {!isSignedIn && (
                        <Link
                              href='/(modals)/login'
                              asChild
                        >
                              <Button
                                    title={`Log in`}
                                    onPress={() => signOut()}
                              />
                        </Link>
                  )}
            </SafeAreaView>
      );
};

export default Profile;

const styles = StyleSheet.create({
      container: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 20,
            alignItems: 'center',
      },

      card: {
            padding: 20,
            backgroundColor: 'white',
            borderRadius: 20,
            elevation: 2,
            marginBottom: 20,
            shadowColor: '#000',
            shadowOffset: {
                  width: 1,
                  height: 2,
            },
            shadowOpacity: 0.2,
            shadowRadius: 6,
            marginHorizontal: 20,
            alignItems: 'center',
      },

      infoContainer: {
            flexDirection: 'row',
            gap: 6,
      },

      avatar: {
            width: 100,
            height: 100,
            borderRadius: 50,
            backgroundColor: Colors.grey,
      },

      name: {
            paddingTop: 10,
            fontSize: 20,
            fontFamily: Fonts.primaryRegular,
      },

      sub: {
            paddingTop: 5,
            fontSize: 16,
            fontFamily: Fonts.primaryRegular,
            color: Colors.grey,
      },

      editRow: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 10,
            height: 60,
      },
});
