package pl.kantoch.dawid.quizowanie_pwa.rest.service;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import pl.kantoch.dawid.quizowanie_pwa.rest.model.Category;
import pl.kantoch.dawid.quizowanie_pwa.rest.repository.CategoriesRepository;

@Service
public class CategoryService
{
    private final CategoriesRepository categoriesRepository;

    public CategoryService(CategoriesRepository categoriesRepository) {
        this.categoriesRepository = categoriesRepository;
    }

    public ResponseEntity<?> save(Category category)
    {
        try
        {
            Category saved = categoriesRepository.save(category);
            return ResponseEntity.ok().body(saved);
        }
        catch (Exception e)
        {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Błąd podczas zapisu roli! Komunikat: "+e.getMessage());
        }
    }
}
