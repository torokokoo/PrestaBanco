package cl.torokoko.document.app;

import org.springframework.data.jpa.repository.JpaRepository;

public interface DocumentRepository extends JpaRepository<Document, Long> {
    public Document findByDocumentId(long id);
    public Document findByName(String name);
}
