// events_controller.js
import { Controller } from "stimulus"

export default class extends Controller {
  static targets = [ 'output', 'no', 'name', 'desc', 'id', 'model', 'nameWithDesc', 'event' ]
  initialize() {
    console.log('Events initialize')
    // this.outputTarget.textContent = 'Initialize World!'
    
    const Events = JSON.parse(this.modelTarget.dataset.info)
    console.log(Events)
    // const eventId = this.idTarget.textContent
    // const eventNo = this.noTarget.textContent
    // eventNo = Events[eventId]
  }

  connect () {
    console.log('Events connect')

  }

  disconnect () {
    console.log('Events disconnect')
  }

  say_hello() {
    // const Events = JSON.parse(this.modelTarget.dataset.info)
    const eventId = this.idTarget.textContent
    // const eventName = Events[eventId]
    const eventName = this.nameTarget.textContent
    // eventNo.textContent = Events[eventId]
    // const eventOutput = this.outputTarget.textContent
    this.outputTarget.textContent = eventId + this.descTarget.textContent
    const name_with_desc = this.nameWithDescTarget
    this.nameWithDescTarget.value = eventId + ':' + eventName
    console.log(this.nameWithDescTarget)
  }

  choose(e) {
    e.preventDefault()
    const id = e.target.getAttribute('data-id')
   
    if (this.currentEvent !== id) {
      this.loadFrom(`events/${id}.json`, this.displayEvents) // <---
      this.currentEvent = id
   
      this.eventsTargets.forEach((el, i) => {
        el.classList.toggle("chosen", id === el.getAttribute("data-id"))
      })
    }
  }

  loadFrom(url, callback) {
    fetch(url)
      .then(response => response.text())
      .then(json => { callback.call( this, JSON.parse(json) ) })
  }

  displayEvents(events) {
    let html = "<ul>"
    events.forEach((el) => {
      html += `<li><a href="#" data-target="event.id" data-id="${el.id}" data-action="events#choose">${el.name}</a></li>`
    })
    html += "</ul>"
    this.element.innerHTML += html
  }
}