import { Component, OnInit } from '@angular/core';
import { AddBlogPost } from '../models/add-blog-post.model';
import { BlogPostService } from '../services/blog-post.service';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { CategoryService } from '../../category/services/category.service';
import { Category } from '../../category/models/category.model';
import { ImageService } from 'src/app/shared/services/image.service';

@Component({
  selector: 'app-add-blogpost',
  templateUrl: './add-blogpost.component.html',
  styleUrls: ['./add-blogpost.component.css']
})
export class AddBlogpostComponent implements OnInit {
  model: AddBlogPost;
  private addBlogPostSubscription?: Subscription;
  categories$?: Observable<Category[]>;
  imageSelectSubscription?: Subscription;
  isImageSelectorVisible : boolean = false;

  constructor(
    private blogPostService: BlogPostService,
    private router: Router,
    private categoryService: CategoryService,
    private imageService: ImageService) {
    this.model = {
      title: '',
      description: '',
      content: '',
      imageUrl: '',
      author: '',
      isPublic: true,
      publishedDate: new Date(),
      urlHandle: '',
      categoryIds: []
    }
  }
  ngOnInit(): void {
    this.categories$ = this.categoryService.getAllCategories();

    this.imageSelectSubscription = this.imageService.onSelectImage().subscribe({
      next: (response) => {
        if(this.model) {
          this.model.imageUrl = response.url;
          this.isImageSelectorVisible = false;
        }
      }
    })
  }

  onFormSubmit(): void {
    this.addBlogPostSubscription = this.blogPostService.createBlogPost(this.model).subscribe({
      next: (response) => {
        this.router.navigateByUrl('/admin/blogposts')
      }
    })
  }

  openImageSelector():void {
    this.isImageSelectorVisible = true;
  }

  closeImageSelector() : void {
    this.isImageSelectorVisible = false;
  }

  ngOnDestroy(): void {
    this.addBlogPostSubscription?.unsubscribe();
  }

}