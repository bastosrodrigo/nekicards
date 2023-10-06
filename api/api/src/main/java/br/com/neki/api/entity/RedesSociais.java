package br.com.neki.api.entity;

import jakarta.persistence.Embeddable;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Embeddable
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class RedesSociais {

    private String linkedin;

    private String github;

    private String instagram;

    private String facebook;

    public RedesSociais(@Valid RedesSociais dados) {
        this.linkedin = dados.linkedin;
        this.github = dados.github;
        this.instagram = dados.instagram;
        this.facebook = dados.facebook;
    }

    public void atualizarInformacoes(RedesSociais redesSociais) {
        if (redesSociais.linkedin != null){
            this.linkedin = redesSociais.linkedin;
        }
        if (redesSociais.github != null){
            this.github = redesSociais.github;
        }
        if (redesSociais.instagram != null){
            this.instagram = redesSociais.instagram;
        }
        if (redesSociais.facebook != null){
            this.facebook = redesSociais.facebook;
        }
    }
}
