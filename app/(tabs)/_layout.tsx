import React from "react";
import { Tabs } from "expo-router";
import { Home, Search, PlusSquare, Heart, User } from "lucide-react-native";
import Colors from "../../constants/colors";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.light.text,
        tabBarInactiveTintColor: Colors.light.tabIconDefault,
        tabBarShowLabel: false,
        headerShown: true,
        tabBarStyle: {
          borderTopColor: Colors.light.border,
          backgroundColor: Colors.light.background,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Jane Pretty",
          headerTitleStyle: {
            fontFamily: 'System',
            fontWeight: '600',
            fontSize: 22,
          },
          tabBarIcon: ({ color }) => <Home size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ color }) => <Search size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: "Create",
          tabBarIcon: ({ color }) => <PlusSquare size={24} color={color} />,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="activity"
        options={{
          title: "Activity",
          tabBarIcon: ({ color }) => <Heart size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => <User size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}