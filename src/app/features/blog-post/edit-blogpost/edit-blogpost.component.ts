import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogPostService } from '../services/blog-post.service';
import { BlogPost } from '../models/blog-post.model';
import { CategoryService } from '../../category/services/category.service';
import { Category } from '../../category/models/category.model';
import { UpdateBlogPost } from '../models/update-blog-post.model';

@Component({
  selector: 'app-edit-blogpost',
  templateUrl: './edit-blogpost.component.html',
  styleUrls: ['./edit-blogpost.component.css']
})
export class EditBlogpostComponent implements OnInit, OnDestroy {

  id: string | null = null;
  paramsSubscription?: Subscription;
  getBlogPostSubscription?: Subscription;
  updateBlogPostSubscription?: Subscription;
  blogPost?: BlogPost;
  categories$?: Observable<Category[]>;
  selectedCategories?: string[];

  constructor(private route: ActivatedRoute, 
    private blogPostService: BlogPostService, 
    private categoryService: CategoryService,
    private router: Router)
  {}
  
  ngOnInit(): void {

    this.categories$ = this.categoryService.getAllCategories();

    this.paramsSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');

        if(this.id) {
          this.getBlogPostSubscription = this.blogPostService.getBlogPostById(this.id)
          .subscribe({
            next: (response) => {
              this.blogPost = response;
              this.selectedCategories = response.categories.map(x => x.id);
            }
          });
        }
      }
    });
  }

  onFormSubmit(): void {
    if(this.blogPost && this.id) {
      var updateBlogPost: UpdateBlogPost = {
        title: this.blogPost.title,
        description: this.blogPost.description,
        content: this.blogPost.content,
        imageUrl: this.blogPost.imageUrl,
        author: this.blogPost.author,
        publishedDate: this.blogPost.publishedDate,
        isPublic: this.blogPost.isPublic,
        categoryIds: this.selectedCategories ?? []
      };

      this.updateBlogPostSubscription = this.blogPostService.updateBlogPost(this.id, updateBlogPost)
      .subscribe({
        next: (response) => {
          this.router.navigateByUrl('/admin/blogposts')
        }
      });
    }

    
  }

  ngOnDestroy(): void {
    this.paramsSubscription?.unsubscribe();
    this.getBlogPostSubscription?.unsubscribe();
    this.updateBlogPostSubscription?.unsubscribe();
  }

}
