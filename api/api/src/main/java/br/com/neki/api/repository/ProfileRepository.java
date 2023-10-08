package br.com.neki.api.repository;

import br.com.neki.api.entity.Profile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;

public interface ProfileRepository extends JpaRepository<Profile, Long> {
    UserDetails findByEmail(String email);
}
