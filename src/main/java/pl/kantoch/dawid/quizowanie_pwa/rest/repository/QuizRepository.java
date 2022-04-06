package pl.kantoch.dawid.quizowanie_pwa.rest.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.kantoch.dawid.quizowanie_pwa.rest.model.Quiz;

@Repository
public interface QuizRepository extends JpaRepository<Quiz,Long> {

    Page<Quiz> findAllByNameContainsOrDescriptionContains(String name, String desc, Pageable pageable);
}
