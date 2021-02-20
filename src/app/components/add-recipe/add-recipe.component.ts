import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipeService } from 'src/app/services/recipe.service'

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css']
})
export class AddRecipeComponent implements OnInit {
  recipe: Recipe = {
    id: '',
    name: '',
    description: '',
    dietary: ''
  };
  submitted = false;

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
  }

  saveRecipe(): void {
    const data = {
      name: this.recipe.name,
      description: this.recipe.description,
      dietary: this.recipe.dietary
    };
    this.recipeService.create(data)
      .subscribe(
        res => {
          console.log(res);
          this.submitted = true;
        },
        error => {
          console.log(error)
        }
      );
  }
  newRecipe(): void {
    this.submitted = false;
    this.recipe = {
      id: '',
      name: '',
      description: '',
      dietary: ''
    }
  }

}
