$(function() {
  var todoList = $("#todo-list");
  var todoForm = $("#todo-form");
  var deleteButton = $("#done-button");

  var selectedTodo;

  var allTodos = new kona.BindableCollection([
    new kona.BindableObject({name: "Do the Wash", priority: "medium"}),
    new kona.BindableObject({name: "Walk the Dog", priority: "medium"}),
    new kona.BindableObject({name: "Work Out", priority: "low"}),
    new kona.BindableObject({name: "File Taxes", priority: "high"})
  ]);
  var todoView = new kona.BindableCollectionView(allTodos, {limit: 3});
  
  todoList.bindToCollection(todoView, {
    content: function(todo) {
      return todo.name() + " (" + todo.priority() + ")";
    }
  });

  todoList.delegate("li", "click", function(e) {
    selectedTodo = $(this).data("boundObject");
    todoForm.bindToObject(selectedTodo);
  });

  deleteButton.click(function(e) {
    e.preventDefault();
    allTodos.remove(selectedTodo);
    todoForm.find(":input").val("");
  });
});
