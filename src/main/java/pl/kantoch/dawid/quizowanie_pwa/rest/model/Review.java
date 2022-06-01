package pl.kantoch.dawid.quizowanie_pwa.rest.model;

import javax.persistence.*;

@Entity
@Table(name = "review")
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "star_counts")
    private Integer starCounts;

    @ManyToOne
    @JoinColumn(name = "quiz_id")
    private Quiz quiz;

    public Review(Long id, Integer starCounts, Quiz quiz) {
        this.id = id;
        this.starCounts = starCounts;
        this.quiz = quiz;
    }

    public Review() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getStarCounts() {
        return starCounts;
    }

    public void setStarCounts(Integer starCounts) {
        this.starCounts = starCounts;
    }

    public Quiz getQuiz() {
        return quiz;
    }

    public void setQuiz(Quiz quiz) {
        this.quiz = quiz;
    }
}
