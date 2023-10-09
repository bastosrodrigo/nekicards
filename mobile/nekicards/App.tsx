import { NavigationContainer } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { AuthProvider } from "./src/contexts/AuthContext";
import Routes from "./src/routes";

export default function App() {
  return (
    <AuthProvider>
      <Toast />
      <Routes />
      <Toast />
    </AuthProvider>
  );
}
