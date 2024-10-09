package cl.torokoko.prestabanco.repository;

import cl.torokoko.prestabanco.entity.Status;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StatusRepository extends JpaRepository<Status, Long> {
    public Status findByStatusId(long id);
}
