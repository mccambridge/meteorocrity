import { Template } from 'meteor/templating';
 
import { Todos } from '../api/todos.js';
 
import './todo.html';
 
Template.todo.events({
  'click .toggle-checked'() {
    // Set the checked property to the opposite of its current value
    Todos.update(this._id, {
      $set: { checked: !this.checked },
    });
  },
  'click .delete'() {
    Todos.remove(this._id);
  },
});