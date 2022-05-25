package pl.kantoch.dawid.quizowanie_pwa.rest.model;

import java.util.List;

public class QuestionsEditPayload {
    private Quiz quiz;
    private List<Question> questionEntityPayloadList;

    public QuestionsEditPayload(Quiz quiz, List<Question> questionEntityPayloadList) {
        this.quiz = quiz;
        this.questionEntityPayloadList = questionEntityPayloadList;
    }

    public QuestionsEditPayload() {
    }

    public Quiz getQuiz() {
        return quiz;
    }

    public void setQuiz(Quiz quiz) {
        this.quiz = quiz;
    }

    public List<Question> getQuestionEntityPayloadList() {
        return questionEntityPayloadList;
    }

    public void setQuestionEntityPayloadList(List<Question> questionEntityPayloadList) {
        this.questionEntityPayloadList = questionEntityPayloadList;
    }
}
