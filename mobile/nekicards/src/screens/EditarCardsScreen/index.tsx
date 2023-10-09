import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import api from "../../api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const EditarCards = () => {
  const route = useRoute();
  const { id } = route.params as { id: number };
  const [data, setData] = useState<any>([]);
  const navigate = useNavigation();

  const getAll = async () => {
    const token = await AsyncStorage.getItem("token");
    console.log("TOKEN", token);
    await api
      .get("/profiles/" + id, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => console.log(err));
  };

  async function handleSubmit(e: any) {
    e.preventDefault();
    const token = await AsyncStorage.getItem("token");
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      console.error("Token não encontrado no Local Storage.");
      return;
    }
    try {
      const response = await api.put("/profiles/" + id, data);
      console.log("Perfil atualizado com sucesso!", response.data);
      navigate.navigate("MeusCards");
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getAll();
    console.log("ID -->", id);
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Editar cartão</Text>
        <View>
          <Text style={styles.subtitle}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={data.email}
            onChangeText={(text) => setData({ ...data, email: text })}
          />
        </View>
        <View>
          <Text style={styles.subtitle}>Nome Completo</Text>
          <TextInput
            style={styles.input}
            placeholder="Nome Completo"
            value={data.nomeCompleto}
            onChangeText={(text) => setData({ ...data, nomeCompleto: text })}
          />
        </View>
        <View>
          <Text style={styles.subtitle}>Nome Social</Text>
          <TextInput
            style={styles.input}
            placeholder="Nome Social"
            value={data.nomeSocial}
            onChangeText={(text) => setData({ ...data, nomeSocial: text })}
          />
        </View>
        <View>
          <Text style={styles.subtitle}>Data Nascimento</Text>
          <TextInput
            style={styles.input}
            placeholder="Data Nascimento"
            value={data.dataNascimento}
            onChangeText={(text) => setData({ ...data, dataNascimento: text })}
          />
        </View>
        <View>
          <Text style={styles.subtitle}>Foto de perfil</Text>
          <TextInput
            style={styles.input}
            placeholder="Foto de perfil"
            value={data.foto}
            onChangeText={(text) => setData({ ...data, foto: text })}
          />
        </View>
        <View>
          <Text style={styles.subtitle}>Telefone</Text>
          <TextInput
            style={styles.input}
            placeholder="Telefone"
            value={data.telefone}
            onChangeText={(text) => setData({ ...data, telefone: text })}
          />
        </View>
        <View>
          <Text style={styles.subtitle}>Linkedin</Text>
          <TextInput
            style={styles.input}
            placeholder="Linkedin"
            value={data.redesSociais?.linkedin}
            onChangeText={(text) => setData({ ...data, linkedin: text })}
          />
        </View>
        <View>
          <Text style={styles.subtitle}>Github</Text>
          <TextInput
            style={styles.input}
            placeholder="Github"
            value={data.redesSociais?.github}
            onChangeText={(text) => setData({ ...data, github: text })}
          />
        </View>
        <View>
          <Text style={styles.subtitle}>Instagram</Text>
          <TextInput
            style={styles.input}
            placeholder="Instagram"
            value={data.redesSociais?.instagram}
            onChangeText={(text) => setData({ ...data, instagram: text })}
          />
        </View>
        <View>
          <Text style={styles.subtitle}>Facebook</Text>
          <TextInput
            style={styles.input}
            placeholder="Facebook"
            value={data.redesSociais?.facebook}
            onChangeText={(text) => setData({ ...data, facebook: text })}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.btn}>Salvar</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default EditarCards;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#7b8ae4",
    justifyContent: "center",
  },
  input: {
    height: 30,
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
