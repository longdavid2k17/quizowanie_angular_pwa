package pl.kantoch.dawid.quizowanie_pwa.rest.service;

import com.google.gson.Gson;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.kantoch.dawid.quizowanie_pwa.rest.model.*;
import pl.kantoch.dawid.quizowanie_pwa.rest.repository.AnswerRepository;
import pl.kantoch.dawid.quizowanie_pwa.rest.repository.QuestionRepository;
import pl.kantoch.dawid.quizowanie_pwa.rest.repository.QuizRepository;

import java.util.List;
import java.util.Optional;

@Service
public class QuestionService
{
    private final Logger LOGGER = LoggerFactory.getLogger(QuestionService.class);
    private static final Gson gson = new Gson();

    private final QuestionRepository questionRepository;
    private final QuizRepository quizRepository;
    private final AnswerRepository answerRepository;

    public QuestionService(QuestionRepository questionRepository,
                           QuizRepository quizRepository,
                           AnswerRepository answerRepository) {
        this.questionRepository = questionRepository;
        this.quizRepository = quizRepository;
        this.answerRepository = answerRepository;
    }

    @Transactional
    public ResponseEntity<?> saveQuestions(QuestionsPayload questionsPayload){
        try {
            Optional<Quiz> optionalQuiz = quizRepository.findById(questionsPayload.getQuizId());
            if(optionalQuiz.isEmpty()) return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Gson().toJson("Nie znaleziono quizu do którego próbujesz zapisać pytania!!"));
            for(QuestionEntityPayload entityPayload : questionsPayload.getQuestionEntityPayloadList()){

                Question question = new Question();
                question.setQuizId(optionalQuiz.get().getId());
                question.setQuestionText(entityPayload.getText());
                Question saved = questionRepository.save(question);
                for(Answer answerTemp : entityPayload.getAnswerList()){
                    Answer answer = new Answer();
                    answer.setText(answerTemp.getText());
                    answer.setQuestionId(saved.getId());
                    if(answerTemp.getPoprawny()!=null){
                        answer.setCorrect(answerTemp.getPoprawny() == 1);
                    }
                    else answer.setCorrect(false);
                    answerRepository.save(answer);
                }
            }
        }
        catch (Exception e){
            e.printStackTrace();
            LOGGER.error("Błąd podczas zapisu pytań! {}",e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Gson().toJson("Wystąpił błąd podczas zapisu pytań! "+e.getMessage()));
        }
        return ResponseEntity.ok().build();
    }

    @Transactional
    public ResponseEntity<?> editQuestions(QuestionsEditPayload questionsPayload){
        try {
            List<Question> oldQuestions = questionRepository.findAllByQuizIdEquals(questionsPayload.getQuiz().getId());
            oldQuestions.forEach(e->{
                List<Answer> answerList = answerRepository.findAllByQuestionId(e.getId());
                answerRepository.deleteAll(answerList);
            });
            questionRepository.deleteAll(oldQuestions);
            for(Question entity : questionsPayload.getQuestionEntityPayloadList()){

                if(entity.getId()==null){
                    Question question = new Question();
                    question.setQuizId(questionsPayload.getQuiz().getId());
                    question.setQuestionText(entity.getQuestionText());
                    Question saved = questionRepository.save(question);
                    for(Answer answerTemp : entity.getAnswerList()){
                        Answer answer = new Answer();
                        answer.setText(answerTemp.getText());
                        answer.setQuestionId(saved.getId());
                        if(answerTemp.getPoprawny()!=null){
                            answer.setCorrect(answerTemp.getPoprawny() == 1);
                        }
                        else answer.setCorrect(false);
                        answerRepository.save(answer);
                    }
                }
                else {
                    questionRepository.save(entity);
                    answerRepository.saveAll(entity.getAnswerList());
                }

            }
        }
        catch (Exception e){
            e.printStackTrace();
            LOGGER.error("Błąd podczas zapisu pytań! {}",e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Gson().toJson("Wystąpił błąd podczas zapisu pytań! "+e.getMessage()));
        }
        return ResponseEntity.ok().build();
    }

    public ResponseEntity<?> getQuestionsForQuiz(Long quizId) {
        try {
            List<Question> list = questionRepository.findAllByQuizIdEquals(quizId);
            list.forEach(e->{
                List<Answer> listAnswers = answerRepository.findAllByQuestionId(e.getId());
                e.setAnswerList(listAnswers);
            });
            return ResponseEntity.ok().body(list);
        }
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(gson.toJson("Błąd pobierania pytań do quizu! "+e.getMessage()));
        }
    }
}
