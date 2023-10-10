import "./styles.css";
import "react-toastify/dist/ReactToastify.css";
import api from "../../api";
import { ToastContainer, toast } from "react-toastify";
import {
  Button,
  Div,
  DivButton,
  Input,
  Label,
  ModalContainer,
  ModalContent,
  Span,
} from "./styles";
import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";

const schema = yup.object().shape({
  nomeCompleto: yup.string().required("Nome é obrigatório"),
  email: yup
    .string()
    .email("Endereço de e-mail inválido")
    .test(
      "domain",
      "O e-mail deve pertencer ao domínio neki-it.com.br ou neki.com.br",
      (value) => {
        if (!value) return false;
        return /@(neki-it\.com\.br|neki\.com\.br)$/.test(value);
      }
    ),
  nomeSocial: yup.string(),
  foto: yup.string().required("URL da foto é obrigatório"),
  telefone: yup.string(),
  dataNascimento: yup
    .string()
    .required("Data de nascimento é obrigatório")
    .transform((value, originalValue) => {
      if (/^\d{4}-\d{2}-\d{2}$/.test(originalValue)) {
        const parts = originalValue.split("-");
        return `${parts[2]}/${parts[1]}/${parts[0]}`;
      }
      return originalValue;
    }),
  redesSociais: yup.object().shape({
    linkedin: yup.string(),
    github: yup.string(),
    instagram: yup.string(),
    facebook: yup.string(),
  }),
});

const Modal = ({ isOpen, onClose, onSave }: any) => {
  const initialValues = {
    nomeCompleto: "",
    email: "",
    nomeSocial: "",
    foto: "",
    dataNascimento: "",
    telefone: "",
    redesSociais: {
      linkedin: "",
      github: "",
      instagram: "",
      facebook: "",
    },
  };

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      } else {
        console.error("Token não encontrado no Local Storage.");
        return;
      }

      const response = await api.post("/profiles", values);
      toast.success("Cartão cadastrado com sucesso!");
      onClose();
    } catch (error) {
      console.error("Ocorreu um erro ao cadastrar o cartão:", error);
      toast.error("Ocorreu um erro ao cadastrar o cartão!");
    }

    console.log(values);
  };
  return (
    <ModalContainer className={`modal ${isOpen ? "open" : "closed"}`}>
      <ModalContent>
        <Span>Cadastrar novo cartão</Span>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={schema}
        >
          <Form
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div>
              <Label htmlFor="nomeCompleto">Nome Completo:*</Label>
              <Field
                name="nomeCompleto"
                type="text"
                style={{
                  width: "500px",
                  height: "30px",
                  margimBottom: "30px",
                }}
              />
              <ErrorMessage
                name="nomeCompleto"
                component="div"
                className="field-error"
              />
            </div>
            <div>
              <Label htmlFor="email">Email:*</Label>
              <Field
                name="email"
                type="text"
                style={{
                  width: "500px",
                  height: "30px",
                  margimBottom: "10px",
                }}
              />
              <ErrorMessage
                name="email"
                component="div"
                className="field-error"
              />
            </div>
            <div>
              <Label htmlFor="nomeSocial">Nome Social:</Label>
              <Field
                name="nomeSocial"
                type="text"
                style={{
                  width: "500px",
                  height: "30px",
                  margimBottom: "10px",
                }}
              />
              <ErrorMessage name="nomeSocial" component="div" />
            </div>
            <div>
              <Label htmlFor="foto">URL da foto:*</Label>
              <Field
                name="foto"
                type="text"
                style={{
                  width: "500px",
                  height: "30px",
                  margimBottom: "10px",
                }}
              />
              <ErrorMessage
                name="foto"
                component="div"
                className="field-error"
              />
            </div>
            <div>
              <Label htmlFor="telefone">Telefone:</Label>
              <Field
                name="telefone"
                type="text"
                style={{
                  width: "500px",
                  height: "30px",
                  margimBottom: "10px",
                }}
              />
              <ErrorMessage name="telefone" component="div" />
            </div>
            <div>
              <Label htmlFor="dataNascimento">Data de Nascimento:*</Label>
              <Field
                name="dataNascimento"
                type="date"
                style={{
                  width: "500px",
                  height: "30px",
                  margimBottom: "10px",
                }}
              />
              <ErrorMessage
                name="dataNascimento"
                component="div"
                className="field-error"
              />
            </div>
            <div>
              <Label htmlFor="redesSociais.linkedin">Linkedin:</Label>
              <Field
                name="redesSociais.linkedin"
                type="text"
                style={{
                  width: "500px",
                  height: "30px",
                  margimBottom: "10px",
                }}
              />
              <ErrorMessage name="redesSociais.linkedin" component="div" />
            </div>
            <div>
              <Label htmlFor="redesSociais.github">Github:</Label>
              <Field
                name="redesSociais.github"
                type="text"
                style={{
                  width: "500px",
                  height: "30px",
                  margimBottom: "10px",
                }}
              />
              <ErrorMessage name="redesSociais.github" component="div" />
            </div>
            <div>
              <Label htmlFor="redesSociais.facebook">Facebook:</Label>
              <Field
                name="redesSociais.facebook"
                type="text"
                style={{
                  width: "500px",
                  height: "30px",
                  margimBottom: "10px",
                }}
              />
              <ErrorMessage name="redesSociais.facebook" component="div" />
            </div>
            <div>
              <Label htmlFor="redesSociais.instagram">Instagram</Label>
              <Field
                name="redesSociais.instagram"
                type="text"
                style={{
                  width: "500px",
                  height: "30px",
                  margimBottom: "10px",
                }}
              />
              <ErrorMessage name="redesSociais.instagram" component="div" />
            </div>
            <Button type="submit">Salvar</Button>
          </Form>
        </Formik>
        <Button onClick={onClose}>Cancelar</Button>
      </ModalContent>
      <ToastContainer />
    </ModalContainer>
  );
};

export default Modal;
