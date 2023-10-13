import { Component } from '@angular/core';
import { AddBlogPost } from '../models/add-blog-post.model';
import { BlogPostService } from '../services/blog-post.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-blogpost',
  templateUrl: './add-blogpost.component.html',
  styleUrls: ['./add-blogpost.component.css']
})
export class AddBlogpostComponent {
  model: AddBlogPost;
  private addBlogPostSubscription?: Subscription;

  constructor(
    private blogPostService: BlogPostService,
    private router: Router) {
    this.model = {
      title: '',
      description: '',
      content: '',
      imageUrl: '',
      author: '',
      isPublic: true,
      publishedDate: new Date()
    }
  }

  onFormSubmit(): void {
    this.addBlogPostSubscription = this.blogPostService.createBlogPost(this.model).subscribe({
      next: (response) => {
        this.router.navigateByUrl('/admin/blogposts')
      }
    })
  }

  ngOnDestroy(): void {
    this.addBlogPostSubscription?.unsubscribe();
  }

}
