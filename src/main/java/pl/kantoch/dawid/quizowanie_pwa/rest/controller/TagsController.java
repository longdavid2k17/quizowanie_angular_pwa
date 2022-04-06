package pl.kantoch.dawid.quizowanie_pwa.rest.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.kantoch.dawid.quizowanie_pwa.rest.model.Category;
import pl.kantoch.dawid.quizowanie_pwa.rest.model.Tag;
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

    @PostMapping("/save")
    public ResponseEntity<?> save(@RequestBody Tag tag)
    {
        return ResponseEntity.ok().body(tagsRepository.save(tag));
    }
}
