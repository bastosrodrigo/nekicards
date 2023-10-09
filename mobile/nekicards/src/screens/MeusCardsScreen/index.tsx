import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import api from "../../api";
import { AppNavigatorRoutesProps } from "../../routes";

interface CardItem {
  id: number;
  nomeCompleto: string;
  nomeSocial: string;
  email: string;
  telefone: string;
  foto: string;
  dataNascimento: string;
  redesSociais: {
    linkedin: string;
    facebook: string;
    instagram: string;
    github: string;
  };
}

const MeusCards: React.FC = () => {
  const [data, setData] = useState<CardItem[]>([]);
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const getAllCards = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      console.log("TOKEN MEUSCARDS", token);

      if (!token) {
        console.log("Token não encontrado");
        return;
      }

      const response = await api.get("/profiles", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeletar = async (id: number) => {
    Alert.alert("Opaaa!", "Deseja realmente deletar este cartão?", [
      {
        text: "OK",
        onPress: async () => {
          try {
            const token = await AsyncStorage.getItem("token");
            await api.delete(`/profiles/${id}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            setData(data.filter((item) => item.id !== id));
          } catch (error) {
            console.log(error);
          }
        },
      },
      {
        text: "Cancelar",
        style: "cancel",
      },
    ]);
  };

  useEffect(() => {
    getAllCards();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.cards}>
            <View style={styles.box1}>
              <Text style={styles.id}>ID: {item.id}</Text>
              <Image source={{ uri: item.foto }} style={styles.imagem} />
            </View>
            <View style={styles.box2}>
              <Text style={styles.title}>{item.nomeCompleto}</Text>
              <Text>
                <Text style={styles.label}>Nome Social: </Text>
                <Text style={styles.subtitle}>{item.nomeSocial}</Text>
              </Text>
              <Text style={styles.subtitle}>Email: {item.email}</Text>
              <Text style={styles.subtitle}>
                Nascimento: {item.dataNascimento}
              </Text>
              <Text style={styles.subtitle}>Telefone: {item.telefone}</Text>
              <Text style={styles.subtitle}>{item.redesSociais.facebook}</Text>
              <Text>{item.redesSociais.github}</Text>
              <Text>{item.redesSociais.instagram}</Text>
              <Text>{item.redesSociais.linkedin}</Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() =>
                  navigation.navigate("EditarCards", { id: item.id })
                }
              >
                <Text>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleDeletar(item.id)}
              >
                <Text>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default MeusCards;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#04050d",
  },

  cards: {
    backgroundColor: "#7b8ae4",
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    flexDirection: "row",
  },

  box1: {
    width: 110,
    height: 100,
    textAlign: "center",
  },

  box2: {
    width: 265,
    padding: 10,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: "#8f9ddb",
  },
  button: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  imagem: {
    width: 100,
    height: 100,
    borderRadius: 10,
    margin: 5,
  },
  id: {
    height: 50,
    textAlign: "center",
    fontSize: 15,
    marginTop: 10,
    fontWeight: "bold",
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 5,
  },
  label: {
    fontWeight: "bold",
  },
  subtitle: {},
});
