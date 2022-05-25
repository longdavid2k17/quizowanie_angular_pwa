package pl.kantoch.dawid.quizowanie_pwa.rest.controller;

import com.google.gson.Gson;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.kantoch.dawid.quizowanie_pwa.rest.model.QuestionsEditPayload;
import pl.kantoch.dawid.quizowanie_pwa.rest.model.QuestionsPayload;
import pl.kantoch.dawid.quizowanie_pwa.rest.service.QuestionService;

@RestController
@RequestMapping("/api/questions")
@CrossOrigin("*")
public class QuestionsController {
    private final QuestionService questionService;

    public QuestionsController(QuestionService questionService) {
        this.questionService = questionService;
    }

    @PostMapping("/save")
    public ResponseEntity<?> save(@RequestBody QuestionsPayload questionsPayload){
        if(questionsPayload==null || questionsPayload.getQuizId()==null) return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Gson().toJson("Brak wymaganych parametrów!"));
        return questionService.saveQuestions(questionsPayload);
    }

    @PostMapping("/edit")
    public ResponseEntity<?> edit(@RequestBody QuestionsEditPayload questionsPayload){
        if(questionsPayload==null || questionsPayload.getQuiz()==null) return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Gson().toJson("Brak wymaganych parametrów!"));
        return questionService.editQuestions(questionsPayload);
    }

    @GetMapping("/{quizId}")
    public ResponseEntity<?> getAllQuestions(@PathVariable Long quizId){
        return questionService.getQuestionsForQuiz(quizId);
    }
}
