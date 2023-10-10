import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { useAuth } from "../../contexts/AuthContext";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../api";

const Login = ({ navigation }: any) => {
  const { login } = useAuth();
  const [email, setEmail] = useState<string>("");
  const [senha, setSenha] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = async () => {
    try {
      const response = await api.post("/login", { email, senha });
      if (response.status === 200) {
        const { token } = response.data;
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        console.log("TOKEN AUTHCONTEXT", token);
        await AsyncStorage.setItem("token", token);
        Toast.show({
          type: "success",
          text1: "Login realizado com sucesso!",
        });
        navigation.navigate("MeusCards");
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Email ou senha inválida!",
      });
    }
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("../../../assets/logo.png")}
      />
      <Text style={styles.title}>Informe seu email:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <Text style={styles.title}>Informe sua senha:</Text>
      <TextInput
        secureTextEntry={true}
        style={styles.input}
        onChangeText={(text) => setSenha(text)}
        value={senha}
      />

      {loading ? (
        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <ActivityIndicator />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={styles.btn}>ENTRAR</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7b8ae4",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    backgroundColor: "#fff",
    width: 300,
    height: 40,
    paddingLeft: 10,
    borderRadius: 5,
    borderBottomColor: "#000",
  },
  title: {
    color: "#000",
    fontSize: 15,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#1f2750",
    width: 300,
    height: 40,
    marginTop: 20,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  btn: {
    fontWeight: "bold",
    fontSize: 15,
    color: "#fff",
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 50,
  },
});
