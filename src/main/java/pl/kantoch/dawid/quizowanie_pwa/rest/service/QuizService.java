package pl.kantoch.dawid.quizowanie_pwa.rest.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import pl.kantoch.dawid.quizowanie_pwa.rest.model.Quiz;
import pl.kantoch.dawid.quizowanie_pwa.rest.model.Tag;
import pl.kantoch.dawid.quizowanie_pwa.rest.repository.QuizRepository;
import pl.kantoch.dawid.quizowanie_pwa.rest.repository.TagsRepository;

import java.util.HashSet;
import java.util.Set;

@Service
public class QuizService
{
    private final Logger LOGGER = LoggerFactory.getLogger(QuizService.class);

    private final QuizRepository quizRepository;
    private final TagsRepository tagsRepository;

    public QuizService(QuizRepository quizRepository, TagsRepository tagsRepository) {
        this.quizRepository = quizRepository;
        this.tagsRepository = tagsRepository;
    }

    public ResponseEntity<?> findAllPageable(Pageable pageable) {
        Page<Quiz> list = quizRepository.findAll(pageable);
        return ResponseEntity.ok().body(list);
    }

    public ResponseEntity<?> findById(Long id)
    {
        try
        {
            return ResponseEntity.of(quizRepository.findById(id));
        }
        catch (Exception e)
        {
            LOGGER.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Błąd podczas pobierania elementu o ID="+id+". Komunikat: "+e.getMessage());
        }
    }

    public ResponseEntity<?> save(Quiz quiz)
    {
        try
        {
            if(quiz.getTag()!=null)
            {
                Set<Tag> tagSet = new HashSet<>();
                tagSet.add(tagsRepository.save(quiz.getTag()));
                quiz.setTagsSet(tagSet);
            }
            Quiz saved = quizRepository.save(quiz);
            return ResponseEntity.ok().body(saved);
        }
        catch (Exception e)
        {
            LOGGER.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Błąd podczas zapisu quizu! Komunikat: "+e.getMessage());
        }
    }
}
