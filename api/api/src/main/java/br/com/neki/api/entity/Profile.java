package br.com.neki.api.entity;

import br.com.neki.api.dto.ProfileCadastroDTO;
import br.com.neki.api.dto.ProfileListagemDTO;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Table(name = "Profiles")
@Entity(name = "Profiles")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Profile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "email")
    private String email;

    @Column(name = "nomecompleto")
    private String nomeCompleto;

    @Column(name = "nomesocial")
    private String nomeSocial;

    @Column(name = "datanascimento")
    private String dataNascimento;

    @Column(name = "foto")
    private String foto;

    @Column(name = "telefone")
    private String telefone;

    private RedesSociais redesSociais;

    @OneToOne
    (mappedBy = "profile")
    private Usuario usuario;

    public Profile(ProfileCadastroDTO dados) {
        this.email = dados.email();
        this.nomeCompleto = dados.nomeCompleto();
        this.nomeSocial = dados.nomeSocial();
        this.dataNascimento = dados.dataNascimento();
        this.foto = dados.foto();
        this.telefone = dados.telefone();
        this.redesSociais = new RedesSociais(dados.redesSociais());
    }

    public void atualizarInformacoes(ProfileListagemDTO dados) {
        if (dados.nomeCompleto() != null){
            this.nomeCompleto = dados.nomeCompleto();
        }
        if (dados.nomeSocial() != null){
            this.nomeSocial = dados.nomeSocial();
        }
        if (dados.email() != null){
            this.email = dados.email();
        }
        if (dados.dataNascimento() != null){
            this.dataNascimento = dados.dataNascimento();
        }
        if (dados.foto() != null){
            this.foto = dados.foto();
        }
        if (dados.telefone() != null){
            this.telefone = dados.telefone();
        }
        if (dados.redesSociais() != null){
            this.redesSociais.atualizarInformacoes(dados.redesSociais());
        }
    }
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getNomeCompleto() {
        return nomeCompleto;
    }

    public void setNomeCompleto(String nomeCompleto) {
        this.nomeCompleto = nomeCompleto;
    }

    public String getNomeSocial() {
        return nomeSocial;
    }

    public void setNomeSocial(String nomeSocial) {
        this.nomeSocial = nomeSocial;
    }

    public String getDataNascimento() {
        return dataNascimento;
    }

    public void setDataNascimento(String dataNascimento) {
        this.dataNascimento = dataNascimento;
    }

    public String getFoto() {
        return foto;
    }

    public void setFoto(String foto) {
        this.foto = foto;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public RedesSociais getRedesSociais() {
        return redesSociais;
    }

    public void setRedesSociais(RedesSociais redesSociais) {
        this.redesSociais = redesSociais;
    }

}
