package pl.kantoch.dawid.quizowanie_pwa.rest.model;

import java.util.List;

public class QuestionEntityPayload {
    private String text;
    private List<Answer> answerList;

    public QuestionEntityPayload() {
    }

    public QuestionEntityPayload(String text, List<Answer> answerList) {
        this.text = text;
        this.answerList = answerList;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public List<Answer> getAnswerList() {
        return answerList;
    }

    public void setAnswerList(List<Answer> answerList) {
        this.answerList = answerList;
    }
}
