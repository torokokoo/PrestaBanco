package cl.torokoko.prestabanco.service;

import cl.torokoko.prestabanco.entity.Loan;
import cl.torokoko.prestabanco.entity.Status;
import cl.torokoko.prestabanco.repository.StatusRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import java.util.List;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

//@ExtendWith(MockitoExtension.class)
@SpringBootTest
@ActiveProfiles("test")
public class StatusServiceTest {

    @Autowired
    StatusRepository statusRepository;

    @Autowired
    private StatusService statusService;

    @Test
    void whenFindAll_thenReturnListOfStatus() {
        // When
        List<Status> foundStatus = statusService.getAll();

        // Then
        assertThat(foundStatus.size()).isEqualTo(0);
    }
}
