package pl.kantoch.dawid.quizowanie_pwa.rest.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.kantoch.dawid.quizowanie_pwa.rest.model.Question;

@Repository
public interface QuestionRepository extends JpaRepository<Question,Long>
{

}
