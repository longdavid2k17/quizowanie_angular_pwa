package pl.kantoch.dawid.quizowanie_pwa.rest.model;

import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.util.Date;
import java.util.Set;

@Entity
@Table(name = "quiz")
public class Quiz
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "subject")
    private String subject;

    @Column(name = "creation_date")
    @CreationTimestamp
    private Date creationDate;

    public Quiz() {
    }

    public Quiz(Long id, String name, String description, String subject, Date creationDate)
    {
        this.id = id;
        this.name = name;
        this.description = description;
        this.subject = subject;
        this.creationDate = creationDate;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public Date getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(Date creationDate) {
        this.creationDate = creationDate;
    }

    @Override
    public String toString() {
        return "Quiz{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", subject='" + subject + '\'' +
                ", creationDate=" + creationDate +
                '}';
    }
}
