import { Component } from "@angular/core";
import image from '/universal/collections/image.ts';
import blogs from '/universal/collections/blog.ts';


Meteor.image = image;
Meteor.blogs = blogs;

@Component({
  selector: 'SusuFQX',
  templateUrl: './app.component.html'
})

export class AppComponent {
  title = "SusuFQX Web";
}
