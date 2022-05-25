package pl.kantoch.dawid.quizowanie_pwa.rest.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.kantoch.dawid.quizowanie_pwa.rest.model.Answer;

import java.util.List;

@Repository
public interface AnswerRepository extends JpaRepository<Answer,Long>
{
    List<Answer> findAllByQuestionId(Long id);
}
