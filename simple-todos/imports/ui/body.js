import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Todos } from '../api/todos.js';
 
import './todo.html';
import './body.html';

Template.body.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  Meteor.subscribe('todos');
});
 
Template.body.helpers({
  todos() {
    const instance = Template.instance();
    if (instance.state.get('hideCompleted')) {
      // If hide completed is checked, filter tasks
      return Todos.find({ checked: { $ne: true } }, { sort: { createdAt: -1 } });
    }
    // Otherwise, return all of the tasks
    return Todos.find({}, { sort: { createdAt: -1 } });
  },
  incompleteCount() {
    const count = Todos.find({ checked: { $ne: true } }).count();
    if (count === 0) {
      return '';
    }
    return `(${count})`;
  },
});

Template.body.events({
  'submit .new-todo'(event) {
    // Prevent default browser form submit
    event.preventDefault();
 
    // Get value from form element
    const target = event.target;
    const text = target.text.value;

    if (text.length < 1) {
      return;
    }
 
    Meteor.call('todos.insert', text);
 
    // Clear form
    target.text.value = '';
  },

  'change .hide-completed input'(event, instance) {
    instance.state.set('hideCompleted', event.target.checked);
  },
});

