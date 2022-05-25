package pl.kantoch.dawid.quizowanie_pwa.rest.model;

import java.util.List;

public class QuestionsPayload {
    private Long quizId;
    private List<QuestionEntityPayload> questionEntityPayloadList;

    public QuestionsPayload() {
    }

    public QuestionsPayload(Long quizId, List<QuestionEntityPayload> questionEntityPayloadList) {
        this.quizId = quizId;
        this.questionEntityPayloadList = questionEntityPayloadList;
    }

    public Long getQuizId() {
        return quizId;
    }

    public void setQuizId(Long quizId) {
        this.quizId = quizId;
    }

    public List<QuestionEntityPayload> getQuestionEntityPayloadList() {
        return questionEntityPayloadList;
    }

    public void setQuestionEntityPayloadList(List<QuestionEntityPayload> questionEntityPayloadList) {
        this.questionEntityPayloadList = questionEntityPayloadList;
    }
}
