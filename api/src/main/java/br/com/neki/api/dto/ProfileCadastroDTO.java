package br.com.neki.api.dto;

import br.com.neki.api.entity.RedesSociais;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;

public record ProfileCadastroDTO(

        @NotNull
        @Email
        String email,
        @NotNull
        String nomeCompleto,
        String nomeSocial,
        @NotNull
        String dataNascimento,
        @NotNull
        String foto,
        String telefone,
        @Valid
        RedesSociais redesSociais
) {
}
