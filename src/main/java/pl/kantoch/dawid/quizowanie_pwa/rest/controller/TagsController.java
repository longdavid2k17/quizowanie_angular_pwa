package pl.kantoch.dawid.quizowanie_pwa.rest.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.kantoch.dawid.quizowanie_pwa.rest.repository.TagsRepository;

@RestController
@RequestMapping("/tags")
@CrossOrigin("*")
public class TagsController
{
    private final TagsRepository tagsRepository;

    public TagsController(TagsRepository tagsRepository)
    {
        this.tagsRepository = tagsRepository;
    }

    @GetMapping("/find-all")
    public ResponseEntity<?> findAll()
    {
        return ResponseEntity.ok().body(tagsRepository.findAll());
    }
}
