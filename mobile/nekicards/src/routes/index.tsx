import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { CreditCard, PlusCircle, LogOut } from "lucide-react-native";

import Login from "../screens/LoginScreen";
import MeusCards from "../screens/MeusCardsScreen";
import AdicionarCards from "../screens/AdicionarCardsScreen";
import EditarCards from "../screens/EditarCardsScreen";
import { useAuth } from "../contexts/AuthContext";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

type Routes = {
  Login: undefined;
  MeusCards: {
    id: number;
  };
  AdicionarCards: undefined;
  EditarCards: {
    id: number;
  };
};

export type AppNavigatorRoutesProps = BottomTabNavigationProp<Routes>;

function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={StackNavigator}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="MeusCards"
          component={TabNavigator}
          options={{
            headerLeft: () => null,
            headerTitleAlign: "center",
            headerTitle: "Cartões",
          }}
        />
        <Stack.Screen
          name="EditarCards"
          component={EditarCards}
          options={{
            headerTitleAlign: "center",
            headerTitle: "Editar Cartão",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;

function TabNavigator() {
  const { logout } = useAuth();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#08070b",
        tabBarInactiveTintColor: "#3b70e2",
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="MeusCards"
        component={MeusCards}
        options={{
          tabBarLabel: "Cartões",
          tabBarIcon: () => <CreditCard color="black" />,
        }}
      />
      <Tab.Screen
        name="Adicionar +"
        component={AdicionarCards}
        options={{
          headerTitle: "Adicionar Cartão",
          headerTitleAlign: "center",
          tabBarLabel: "Adicionar +",
          tabBarIcon: () => <PlusCircle color="black" />,
        }}
      />
      <Tab.Screen
        name="Sair"
        component={MeusCards}
        options={{
          tabBarLabel: "Sair",
          tabBarIcon: () => <LogOut color="black" />,
        }}
        listeners={({ navigation }) => ({
          tabPress: (event) => {
            event.preventDefault();
            logout();
            navigation.navigate("Login");
          },
        })}
      />
    </Tab.Navigator>
  );
}

function StackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="EditarCards" component={EditarCards} />
    </Stack.Navigator>
  );
}
