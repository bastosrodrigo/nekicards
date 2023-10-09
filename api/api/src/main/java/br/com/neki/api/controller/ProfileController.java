package br.com.neki.api.controller;

import br.com.neki.api.dto.ProfileCadastroDTO;
import br.com.neki.api.dto.ProfileListagemDTO;
import br.com.neki.api.entity.Profile;
import br.com.neki.api.infra.exception.TratadorDeErros;
import br.com.neki.api.repository.ProfileRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;

@RestController
@RequestMapping("profiles")
public class ProfileController {

    @Autowired
    private ProfileRepository repository;

    @PostMapping
    @Transactional
    public ResponseEntity cadastrarProfile(@RequestBody @Valid ProfileCadastroDTO dados, UriComponentsBuilder uriBuilder){
        var existingProfile = repository.findByEmail(dados.email());

        if (existingProfile != null) {
            throw new TratadorDeErros.EmailDuplicadoException(dados.email());
        }

        var profile = new Profile(dados);
        repository.save(profile);

        var uri = uriBuilder.path("/profiles/{id}").buildAndExpand(profile.getId()).toUri();

        return ResponseEntity.created(uri).body(new ProfileListagemDTO(profile));
    }
/*
    @GetMapping
    @Transactional
    public ResponseEntity<Page<ProfileListagemDTO>> listarProfiles(Pageable paginacao) {
        var page = repository.findAll(paginacao).map(ProfileListagemDTO::new);

        return ResponseEntity.ok(page);
    }
*/
    @GetMapping
    @Transactional
    public ResponseEntity<List<ProfileListagemDTO>> listarProfiles() {
        var page = repository.findAll().stream().map(ProfileListagemDTO::new).toList();
        return ResponseEntity.ok(page);
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity excluirProfile(@PathVariable Long id){
        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping
    @Transactional
    public ResponseEntity atualizarProfile(@RequestBody @Valid ProfileListagemDTO dados){
        var profile = repository.getReferenceById(dados.id());
        profile.atualizarInformacoes(dados);

        return ResponseEntity.ok(new ProfileListagemDTO(profile));
    }

    @PutMapping("/{id}")
    @Transactional
    public ResponseEntity atualizarProfile(@PathVariable Long id, @RequestBody @Valid ProfileListagemDTO dados) {
        var profile = repository.findById(id);

        if (profile.isPresent()) {
            Profile existingProfile = profile.get();
            existingProfile.atualizarInformacoes(dados);
            repository.save(existingProfile);
            return ResponseEntity.ok(new ProfileListagemDTO(existingProfile));
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    @GetMapping("/{id}")
    public ResponseEntity buscarPorId(@PathVariable Long id) {
        var profile = repository.getReferenceById(id);
        return ResponseEntity.ok(new ProfileListagemDTO(profile));
    }


}
