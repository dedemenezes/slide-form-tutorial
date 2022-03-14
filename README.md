# GOAL

Implement kind of a slide show for the form using bootstrap modal. Each input will be displayed one at a time. When reching the submit button, no more next option will be given to the user, just the submit button itself.


## How it was done?

### CSS
#### 1. Create two classes to hide and show your inputs
```css
.show_input {
  display: block;
}
.hide_input {
  display: none
}
```

### HTML

#### 1. Attach your future stimulus controller to the view
Stimulus controller needs to encapsulate the targets. In this scenario, all the form inputs will be stimulus targets. Add it in the div tag that contains the class *modal-body*, that encapsulates the form.
```html
<div class="modal-body" data-controller='slide-form'>
  [...YOUR FORM SHOULD BE HERE...]
</div>
```

####  2. Make all form inputs as stimulus targets
```
<%= simple_form_for @movie do |f| %>
  <%= f.input :title, wrapper_html: { class: 'show_input', data: { slide_form_target: 'input' } } %>
  <%= f.input :synopsis, wrapper_html: { class: 'hide_input',  data: { slide_form_target: 'input' }} %>
  <%= f.input :original_title, wrapper_html: { class: 'hide_input',  data: { slide_form_target: 'input' }} %>
  <%= f.submit class: 'hide_input',data: { slide_form_target: 'input' } %>
<% end %>
```

####  3. Add a next button to go to next input
This button needs to be inside the same div tag that contains the class *modal-body* as it wil be the one with the event attached. MAke it a target as well so we can hide it when reaching the submit button
```html
<button data-action='click->slide-form#next' data-slide-form-target='next'>Next</button>
```


### Stimulus / JS

####  1. Create the responsible stimulus controller
```bash
  touch app/javascript/controllers/slide_form_controller.js
```

####  2. Define your stimulus controler with it's targets
```javascript
import { Controller } from 'stimulus'

export default class extends Controller {
  static targets = ["input", "next"]
}
```

####  3. Create JS functions to make it all work
```js
  //Stimulus controller
  // slide_form_controller.js
  //[...]
  next(event) {
    this.active = this.inputTargets.filter(target => target.classList.contains('show_input'))[0]
    if (this.active.nextElementSibling.nextElementSibling === null) {
      this.fowardSlideShow(this.active)
      this.nextTarget.classList.add('hide_input')
    } else {
      this.fowardSlideShow(this.active)
    }
  }

  fowardSlideShow(active) {
    active.classList.remove('show_input')
    active.classList.add('hide_input')
    active.nextElementSibling.classList.remove('hide_input')
    active.nextElementSibling.classList.add('show_input')
  }
```
