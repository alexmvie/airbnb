import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Tabs } from 'expo-router';
import Colors from '@/constants/Colors';
import { FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Theme from '@/constants/Theme';

const Layout = () => {
      return (
            <Tabs screenOptions={{ tabBarActiveTintColor: Colors.primary, tabBarLabelStyle: Theme.tabIconCaption }}>
                  <Tabs.Screen
                        name='index'
                        options={{
                              tabBarLabel: 'Explore',
                              tabBarIcon: ({ color, size }) => <Ionicons name='search' size={size} color={color} />,
                        }}
                  />

                  <Tabs.Screen
                        name='wishlist'
                        options={{
                              tabBarLabel: 'Wishlist',
                              tabBarIcon: ({ color, size }) => <Ionicons name='heart-outline' size={size} color={color} />,
                        }}
                  />

                  <Tabs.Screen
                        name='trips'
                        options={{
                              tabBarLabel: 'Trips',
                              tabBarIcon: ({ color, size }) => <FontAwesome5 name='airbnb' size={size} color={color} />,
                        }}
                  />

                  <Tabs.Screen
                        name='inbox'
                        options={{
                              tabBarLabel: 'Inbox',
                              tabBarIcon: ({ color, size }) => (
                                    <MaterialCommunityIcons name='message-outline' size={size} color={color} />
                              ),
                        }}
                  />

                  <Tabs.Screen
                        name='profile'
                        options={{
                              tabBarLabel: 'Profile',
                              headerShown: false,
                              tabBarIcon: ({ color, size }) => (
                                    <Ionicons name='person-circle-outline' size={size} color={color} />
                              ),
                        }}
                  />
            </Tabs>
      );
};

export default Layout;

const styles = StyleSheet.create({});
