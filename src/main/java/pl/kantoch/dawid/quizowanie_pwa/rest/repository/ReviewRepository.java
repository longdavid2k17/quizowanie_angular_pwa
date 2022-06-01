package pl.kantoch.dawid.quizowanie_pwa.rest.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.kantoch.dawid.quizowanie_pwa.rest.model.Review;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review,Long> {
    List<Review> findAllByQuiz_Id(Long id);
}
