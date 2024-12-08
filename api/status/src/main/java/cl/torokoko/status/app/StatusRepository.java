package cl.torokoko.status.app;

import cl.torokoko.status.app.Status;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StatusRepository extends JpaRepository<Status, Long> {
    public Status findByStatusId(long id);
}
