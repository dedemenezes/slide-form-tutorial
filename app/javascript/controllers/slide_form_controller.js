import { Controller } from 'stimulus'

export default class extends Controller {
  static targets = ["input", "next"]

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
}
