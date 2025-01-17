package cl.torokoko.document.app;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "document")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Document {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "document_id", unique = true, nullable = false)
    private Long documentId;

    @Column(unique = true, nullable = false)
    @Getter @Setter private String name;

    @Getter @Setter private String description;
}