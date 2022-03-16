package pl.kantoch.dawid.quizowanie_pwa.rest.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.kantoch.dawid.quizowanie_pwa.rest.repository.CategoriesRepository;

@RestController
@RequestMapping("/categories")
@CrossOrigin("*")
public class CategoriesController
{
    private final CategoriesRepository categoriesRepository;

    public CategoriesController(CategoriesRepository categoriesRepository)
    {
        this.categoriesRepository = categoriesRepository;
    }

    @GetMapping("/find-all")
    public ResponseEntity<?> findAll()
    {
        return ResponseEntity.ok().body(categoriesRepository.findAll());
    }
}
