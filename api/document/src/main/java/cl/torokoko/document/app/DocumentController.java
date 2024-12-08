package cl.torokoko.document.app;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/documents")
@CrossOrigin("*")
public class DocumentController {
    @Autowired
    DocumentService documentService;

    @GetMapping("/{id}")
    public Document getById(@PathVariable long id) { return documentService.getById(id); }

    @GetMapping("/")
    public List<Document> getAll() {return documentService.getAll();}
}
