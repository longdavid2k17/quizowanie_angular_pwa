package pl.kantoch.dawid.quizowanie_pwa.rest.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.kantoch.dawid.quizowanie_pwa.rest.model.Category;
import pl.kantoch.dawid.quizowanie_pwa.rest.repository.CategoriesRepository;
import pl.kantoch.dawid.quizowanie_pwa.rest.service.CategoryService;

@RestController
@RequestMapping("/categories")
@CrossOrigin("*")
public class CategoriesController
{
    private final CategoriesRepository categoriesRepository;
    private final CategoryService categoryService;

    public CategoriesController(CategoriesRepository categoriesRepository, CategoryService categoryService)
    {
        this.categoriesRepository = categoriesRepository;
        this.categoryService = categoryService;
    }

    @GetMapping("/find-all")
    public ResponseEntity<?> findAll()
    {
        return ResponseEntity.ok().body(categoriesRepository.findAll());
    }

    @PostMapping("/save")
    public ResponseEntity<?> save(@RequestBody Category category)
    {
        return ResponseEntity.ok().body(categoryService.save(category));
    }
}
