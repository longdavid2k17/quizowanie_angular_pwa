package pl.kantoch.dawid.quizowanie_pwa.rest.model;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "questions")
public class Question
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "quiz_id")
    private Long quizId;

    @Column(name = "text")
    private String questionText;

    public Question() {
    }

    public Question(Long id, Long quizId, String questionText) {
        this.id = id;
        this.quizId = quizId;
        this.questionText = questionText;
    }

    public Long getQuizId() {
        return quizId;
    }

    public void setQuizId(Long quizId) {
        this.quizId = quizId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getQuestionText() {
        return questionText;
    }

    public void setQuestionText(String questionText) {
        this.questionText = questionText;
    }

    @Override
    public String toString() {
        return "Question{" +
                "id=" + id +
                ", quizId=" + quizId +
                ", questionText='" + questionText + '\'' +
                '}';
    }
}
