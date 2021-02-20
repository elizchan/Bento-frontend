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
  recipeName = "";
  currentRecipe: Recipe = {
    id: '',
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
    console.log(this.route.snapshot.params.id)
  }

  getRecipe(id: string): void {
    console.log(id)
    this.recipeService.get(id)
      .subscribe(
        data => {
          this.currentRecipe = data;
          this.recipeName = data.name;
          console.log(data)
        },
        error => {
          console.log(error)
        }
      )
  }
  updateRecipe(id: string): void {
    this.recipeService.update(id, this.currentRecipe)
      .subscribe(
        response => {
          // console.log(response.message)
          // this.message = response.message
          this.router.navigate(['/recipes']);
        },
        error => {
          console.log(error)
        }
      )
  }

  deleteRecipe(id: string): void {
    console.log("we are in the delete")
    console.log(id)
    this.recipeService.delete(id)
      .subscribe(
        response => {
          console.log(response)
          this.router.navigate(['/recipes']);
        },
        error => {
          console.log(error)
        }
      )
  }

}
