import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import api from "../../api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";

const AdicionarCards = () => {
  const [email, setEmail] = useState("");
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [nomeSocial, setNomeSocial] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [foto, setFoto] = useState("");
  const [telefone, setTelefone] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [github, setGithub] = useState("");
  const [instagram, setInstagram] = useState("");
  const [facebook, setFacebook] = useState("");

  const navigator: any = useNavigation();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const token = await AsyncStorage.getItem("token");
      console.log("TOKEN ADICIONAR", token);
      if (!token) {
        console.log("Token não encontrado");
        return;
      }
      const response = await api.post("/profiles", {
        email: email,
        nomeCompleto: nomeCompleto,
        nomeSocial: nomeSocial,
        dataNascimento: dataNascimento,
        foto: foto,
        telefone: telefone,
        redesSociais: {
          linkedin: linkedin,
          github: github,
          instagram: instagram,
          facebook: facebook,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Resposta da API:", response.data);

      Toast.show({
        type: "success",
        text1: "Cartã criado com sucesso!",
      });
      setTimeout(() => {
        setEmail("");
        setNomeCompleto("");
        setNomeSocial("");
        setDataNascimento("");
        setFoto("");
        setTelefone("");
      }, 5000);
      navigator.navigate("MeusCards");
    } catch (error: any) {
      if (error.response && error.response.status === 409) {
        console.error("O email já está em uso. Por favor, escolha outro.");
        Toast.show({
          type: "error",
          text1: "O email já está em uso. Por favor, escolha outro.",
        });
      } else {
        console.error("Erro ao enviar dados para a API:", error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Adicionar +</Text>
        <View>
          <Text style={styles.subtitle}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <View>
          <Text style={styles.subtitle}>Nome Completo</Text>
          <TextInput
            style={styles.input}
            placeholder="Nome Completo"
            value={nomeCompleto}
            onChangeText={(text) => setNomeCompleto(text)}
          />
        </View>
        <View>
          <Text style={styles.subtitle}>Nome Social</Text>
          <TextInput
            style={styles.input}
            placeholder="Nome Social"
            value={nomeSocial}
            onChangeText={(text) => setNomeSocial(text)}
          />
        </View>
        <View>
          <Text style={styles.subtitle}>Data Nascimento</Text>
          <TextInput
            style={styles.input}
            placeholder="Data Nascimento"
            value={dataNascimento}
            onChangeText={(text) => setDataNascimento(text)}
          />
        </View>
        <View>
          <Text style={styles.subtitle}>Foto de perfil</Text>
          <TextInput
            style={styles.input}
            placeholder="Foto de perfil"
            value={foto}
            onChangeText={(text) => setFoto(text)}
          />
        </View>
        <View>
          <Text style={styles.subtitle}>Telefone</Text>
          <TextInput
            style={styles.input}
            placeholder="Telefone"
            value={telefone}
            onChangeText={(text) => setTelefone(text)}
          />
        </View>
        <View>
          <Text style={styles.subtitle}>Linkedin</Text>
          <TextInput
            style={styles.input}
            placeholder="Linkedin"
            value={linkedin}
            onChangeText={(text) => setLinkedin(text)}
          />
        </View>
        <View>
          <Text style={styles.subtitle}>Github</Text>
          <TextInput
            style={styles.input}
            placeholder="Github"
            value={github}
            onChangeText={(text) => setGithub(text)}
          />
        </View>
        <View>
          <Text style={styles.subtitle}>Instagram</Text>
          <TextInput
            style={styles.input}
            placeholder="Instagram"
            value={instagram}
            onChangeText={(text) => setInstagram(text)}
          />
        </View>
        <View>
          <Text style={styles.subtitle}>Facebook</Text>
          <TextInput
            style={styles.input}
            placeholder="Facebook"
            value={facebook}
            onChangeText={(text) => setFacebook(text)}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.btn}>Adicionar</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default AdicionarCards;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#7b8ae4",
    justifyContent: "center",
  },
  input: {
    height: 30,
    width: 300,
    backgroundColor: "#fff",
    marginBottom: 10,
    paddingLeft: 5,
    marginTop: 5,
    borderRadius: 5,
  },
  button: {
    justifyContent: "center",
    backgroundColor: "#04030e",
    height: 35,
    marginBottom: 20,
    borderRadius: 5,
  },
  content: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    marginTop: 10,
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "uppercase",
  },
  subtitle: {
    fontWeight: "bold",
  },
  btn: {
    color: "#fff",
    textAlign: "center",
    fontSize: 15,
    textTransform: "uppercase",
  },
});
