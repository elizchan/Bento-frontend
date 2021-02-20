import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from 'src/app/services/recipe.service';
import { Recipe } from 'src/app/models/recipe.model';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {
  currentRecipe: Recipe = {
    name: '',
    description: '',
    dietary: ''
  };
  message = '';
  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.message = '';
    this.getRecipe(this.route.snapshot.params.id)
  }

  getRecipe(id: string): void {
    this.recipeService.get(id)
      .subscribe(
        data => {
          this.currentRecipe = data;
          console.log(data)
        },
        error => {
          console.log(error)
        }
      )
  }
  updateRecipe(): void {
    this.recipeService.update(this.currentRecipe.id, this.currentRecipe)
      .subscribe(
        response => {
          console.log(response)
          this.message = response.message
        },
        error => {
          console.log(error)
        }
      )
  }

  deleteRecipe(): void {
    this.recipeService.delete(this.currentRecipe.id)
      .subscribe(
        response => {
          console.log(response)
          this.route.navigate(['/tutorials']);
        },
        error => {
          console.log(error)
        }
      )
  }

}
