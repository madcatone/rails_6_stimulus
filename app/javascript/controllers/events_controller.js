// events_controller.js
import { Controller } from "stimulus"

export default class extends Controller {
  static targets = [ 'output', 'no', 'name', 'desc', 'id', 'model', 'nameWithDesc', 'event' ]
  initialize() {
    console.log('Events initialize')
    this.outputTarget.textContent = 'Initialize World!'
    
    // const Events = JSON.parse(this.modelTarget.dataset.info)
    // console.log(Events)
    // const eventId = this.idTarget.textContent
    // const eventNo = this.noTarget.textContent
    // eventNo = Events[eventId]
  }
  say_hello() {
    // const Events = JSON.parse(this.modelTarget.dataset.info)
    const eventId = this.idTarget.textContent
    // const eventName = Events[eventId]
    const eventName = this.nameTarget.textContent
    // eventNo.textContent = Events[eventId]
    this.outputTarget.textContent = eventId + this.descTarget.textContent
    const name_with_desc = this.nameWithDescTarget
    this.nameWithDescTarget.value = eventId + ':' + eventName
    console.log(this.nameWithDescTarget)
  }
}