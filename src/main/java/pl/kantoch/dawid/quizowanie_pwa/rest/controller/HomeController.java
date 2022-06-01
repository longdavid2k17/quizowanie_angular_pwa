package pl.kantoch.dawid.quizowanie_pwa.rest.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import pl.kantoch.dawid.quizowanie_pwa.rest.model.Quiz;
import pl.kantoch.dawid.quizowanie_pwa.rest.service.QuizService;

@org.springframework.web.bind.annotation.RestController
@RequestMapping("/home")
@CrossOrigin("*")
public class HomeController
{
    private final Logger LOGGER = LoggerFactory.getLogger(HomeController.class);

    private final QuizService quizService;

    public HomeController(QuizService quizService)
    {
        this.quizService = quizService;
    }

    @GetMapping("/find-all")
    public ResponseEntity<?> findAllQuizes(@RequestParam MultiValueMap<String,String> queryParams)
    {
        return quizService.findAllPageable(queryParams);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findById(@PathVariable Long id)
    {
        return quizService.findById(id);
    }

    @GetMapping("/check-for-questions/{id}")
    public ResponseEntity<?> checkQuizState(@PathVariable Long id)
    {
        return quizService.checkQuizState(id);
    }

    @PostMapping("/save")
    public ResponseEntity<?> save(@RequestBody Quiz quiz)
    {
        return quizService.save(quiz);
    }
}
