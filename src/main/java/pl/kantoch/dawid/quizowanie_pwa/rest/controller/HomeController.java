package pl.kantoch.dawid.quizowanie_pwa.rest.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
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

    @GetMapping("/get-all")
    public ResponseEntity<?> findAllQuizes(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "3") int size)
    {
        Pageable paging = PageRequest.of(page, size);
        return quizService.findAllPageable(paging);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findById(@PathVariable Long id)
    {
        return quizService.findById(id);
    }

    @PostMapping("/save")
    public ResponseEntity<?> save(@RequestBody Quiz quiz)
    {
        return quizService.save(quiz);
    }
}
