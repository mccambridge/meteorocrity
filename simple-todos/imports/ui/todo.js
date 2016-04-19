import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
 
import { Todos } from '../api/todos.js';
 
import './todo.html';

Template.todo.helpers({
  isOwner() {
    return this.owner === Meteor.userId();
  },
});
 
Template.todo.events({
  'click .toggle-checked'() {
    // Set the checked property to the opposite of its current value
    Meteor.call('todos.setChecked', this._id, !this.checked);
  },
  'click .toggle-private'() {
    // Set the checked property to the opposite of its current value
    Meteor.call('todos.setPrivate', this._id, !this.private);
  },
  'click .delete'() {
    Meteor.call('todos.remove', this._id);
  },
});
