package cl.torokoko.prestabanco.service;

import cl.torokoko.prestabanco.entity.LoanType;
import cl.torokoko.prestabanco.entity.Status;
import cl.torokoko.prestabanco.repository.LoanTypeRepository;
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
public class LoanTypeServiceTest {

    @Autowired
    LoanTypeRepository loanTypeRepository;

    @Autowired
    private LoanTypeService loanTypeService;

    @Test
    void whenFindAll_thenReturnListOfLoanType() {
        // When
        List<LoanType> foundLoanType = loanTypeService.getAll();

        // Then
        assertThat(foundLoanType.size()).isEqualTo(0);
    }

    @Test
    void whenFindById_thenReturnNull() {
        // When
        LoanType foundLoanType = loanTypeService.getById(1);
        assertThat(foundLoanType).isNull();
    }
}
