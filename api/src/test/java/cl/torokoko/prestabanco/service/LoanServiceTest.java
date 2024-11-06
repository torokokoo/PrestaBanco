package cl.torokoko.prestabanco.service;

import cl.torokoko.prestabanco.entity.LoanType;
import cl.torokoko.prestabanco.repository.LoanRepository;
import cl.torokoko.prestabanco.service.LoanService;
import cl.torokoko.prestabanco.entity.Loan;
import cl.torokoko.prestabanco.entity.Status;
import lombok.Data;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.boot.test.autoconfigure.web.client.AutoConfigureWebClient;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ActiveProfiles;

import java.util.Date;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.mockito.Mockito.*;

//@ExtendWith(MockitoExtension.class)
@SpringBootTest
@ActiveProfiles("test")
public class LoanServiceTest {

    @Autowired
    LoanRepository loanRepository;

    @Autowired
    private LoanService loanService;

    @Test
    void whenFindAll_thenReturnListOfLoans() {
        // When
        List<Loan> foundLoans = loanService.getAll();

        // Then
        assertThat(foundLoans.size()).isEqualTo(1);
    }

    @Test
    void whenNewLoan_thenReturnLoan() {
        // When
        Loan newLoan = new Loan();
        newLoan.setName("test");
        Loan createdLoan = loanService.newLoan(newLoan);

        // Then
        assertThat(newLoan.getName()).isEqualTo(createdLoan.getName());
    }

    @Test
    void whenUpdateStatus_thenReturnLoan() {
        Loan foundLoan = loanService.getById(1L);
        int statusId = 1;

        Loan updatedLoan = loanService.updateStatus(foundLoan, statusId);

        assertThat(updatedLoan).isNotNull();
    }



}
