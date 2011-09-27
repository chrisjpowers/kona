$(function() {
  var todoList = $("#todo-list");
  var todoForm = $("#todo-form");

  //var selectedTodo = new kona.BindableObject({name: "New Todo", priority: "medium"});
  var allTodos = new kona.BindableCollection([
    new kona.BindableObject({name: "Do the Wash", priority: "medium"}),
    new kona.BindableObject({name: "Walk the Dog", priority: "medium"}),
    new kona.BindableObject({name: "Work Out", priority: "low"}),
    new kona.BindableObject({name: "File Taxes", priority: "high"})
  ]);
  var todoView = new kona.BindableCollectionView(allTodos, {limit: 3});
  
  todoList.bindToCollection(todoView, {
    content: function(todo) {
      return todo.name;
    }
  });


  todoList.delegate("li", "click", function(e) {
    var obj = $(this).data("boundObject");
    console.log(obj);
    todoForm.bindToObject(obj);
  });
});
