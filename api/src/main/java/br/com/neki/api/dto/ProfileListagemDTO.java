package br.com.neki.api.dto;

import br.com.neki.api.entity.Profile;
import br.com.neki.api.entity.RedesSociais;

public record ProfileListagemDTO(
        Long id,
        String email,
        String nomeCompleto,
        String nomeSocial,
        String dataNascimento,
        String foto,
        String telefone,
        RedesSociais redesSociais
) {
    public ProfileListagemDTO(Profile profile){
        this(
                profile.getId(),
                profile.getEmail(),
                profile.getNomeCompleto(),
                profile.getNomeSocial(),
                profile.getDataNascimento(),
                profile.getFoto(),
                profile.getTelefone(),
                profile.getRedesSociais()
        );
    }
}
