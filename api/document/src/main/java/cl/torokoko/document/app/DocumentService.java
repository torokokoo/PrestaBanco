package cl.torokoko.document.app;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DocumentService {
    @Autowired
    private DocumentRepository documentRepository;

    public Document getById(long id) {
        return documentRepository.findByDocumentId(id);
    }
}