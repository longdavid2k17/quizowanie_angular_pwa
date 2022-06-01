package pl.kantoch.dawid.quizowanie_pwa.rest.service;

import com.google.gson.Gson;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.MultiValueMap;
import pl.kantoch.dawid.quizowanie_pwa.rest.model.Question;
import pl.kantoch.dawid.quizowanie_pwa.rest.model.Quiz;
import pl.kantoch.dawid.quizowanie_pwa.rest.model.Review;
import pl.kantoch.dawid.quizowanie_pwa.rest.model.Tag;
import pl.kantoch.dawid.quizowanie_pwa.rest.repository.QuestionRepository;
import pl.kantoch.dawid.quizowanie_pwa.rest.repository.QuizRepository;
import pl.kantoch.dawid.quizowanie_pwa.rest.repository.ReviewRepository;
import pl.kantoch.dawid.quizowanie_pwa.rest.repository.TagsRepository;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class QuizService
{
    private final Logger LOGGER = LoggerFactory.getLogger(QuizService.class);

    private static final Gson gson = new Gson();

    private final QuizRepository quizRepository;
    private final TagsRepository tagsRepository;
    private final QuestionRepository questionRepository;
    private final ReviewRepository reviewRepository;

    public QuizService(QuizRepository quizRepository,
                       TagsRepository tagsRepository,
                       QuestionRepository questionRepository,
                       ReviewRepository reviewRepository) {
        this.quizRepository = quizRepository;
        this.tagsRepository = tagsRepository;
        this.questionRepository = questionRepository;
        this.reviewRepository = reviewRepository;
    }

    public ResponseEntity<?> findAllPageable(MultiValueMap<String,String> queryParams) {
        //Page<Quiz> list = quizRepository.findAll(pageable);
        try
        {
            String search = Optional.ofNullable(queryParams.getFirst("filter")).orElse(null);
            String pageVal = Optional.ofNullable(queryParams.getFirst("page")).orElse(null);
            String size = Optional.ofNullable(queryParams.getFirst("size")).orElse(null);
            Integer pageInt = Integer.parseInt(pageVal);
            Integer sizeInt = Integer.parseInt(size);
            PageRequest pageRequest = PageRequest.of(pageInt,sizeInt, Sort.by("id"));
            Page<Quiz> page;
            if(search!=null)
                page = quizRepository.findAllByNameContainsOrDescriptionContains(search,search,pageRequest);
            else page = quizRepository.findAll(pageRequest);
            for(Quiz quiz : page.getContent()){
                List<Review> list = reviewRepository.findAllByQuiz_Id(quiz.getId());
                int allReviewsSum = list.stream().mapToInt(Review::getStarCounts).sum();
                if(list.size()>0) quiz.setReview(allReviewsSum/list.size());
                if(list.size()==0) quiz.setReview(0);
            }
            return ResponseEntity.ok().body(page);
        }
        catch (Exception e) {
            LOGGER.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(gson.toJson("Błąd podczas pobierania danych! "+e.getMessage()));
        }

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

    public ResponseEntity<?> checkQuizState(Long id) {
        try {
            Optional<Quiz> optional = quizRepository.findById(id);
            if(optional.isEmpty()) return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Gson().toJson("Nie znaleziono danych quizu!"));
            List<Question> questionList = questionRepository.findAllByQuizIdEquals(id);
            if(questionList.size()==0) return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Gson().toJson("Ten quiz nie ma zdefiniowanych żadnych pytań i nie może zostać uruchomiony!"));
            return ResponseEntity.ok().build();
        }
        catch (Exception e){
            LOGGER.error("Błąd podczas sprawdzania statusu quizu! {}",e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Gson().toJson("Wystąpił błąd podczas walidowania quizu! "+e.getMessage()));
        }
    }

    @Transactional
    public ResponseEntity<?> incrementPlaysCount(Long id) {
        try {
            Optional<Quiz> optional = quizRepository.findById(id);
            if(optional.isEmpty()) return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Gson().toJson("Nie znaleziono danych quizu!"));
            Quiz quiz = optional.get();
            if(quiz.getRunCount()!=null){
                quiz.setRunCount(quiz.getRunCount()+1);
            } else quiz.setRunCount(1);
            quizRepository.save(quiz);
            return ResponseEntity.ok().build();
        }
        catch (Exception e){
            LOGGER.error("Błąd podczas sprawdzania statusu quizu! {}",e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Gson().toJson("Wystąpił błąd podczas walidowania quizu! "+e.getMessage()));
        }
    }

    @Transactional
    public ResponseEntity<?> setReview(Long id,Integer stars) {
        try {
            Optional<Quiz> optional = quizRepository.findById(id);
            if(optional.isEmpty()) return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Gson().toJson("Nie znaleziono danych quizu!"));
            Review review = new Review();
            review.setStarCounts(stars);
            review.setQuiz(optional.get());
            Review saved = reviewRepository.save(review);
            return ResponseEntity.ok().build();
        }
        catch (Exception e){
            e.printStackTrace();
            LOGGER.error("Błąd podczas ustawiania oceny! {}",e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Gson().toJson("Wystąpił błąd podczas walidowania quizu! "+e.getMessage()));
        }
    }
}
