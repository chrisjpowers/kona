$(function() {
  var todoList = $("#todo-list");
  var todoForm = $("#todo-form");

  //var selectedTodo = new kona.BindableObject({name: "New Todo", priority: "medium"});
  var allTodos = new kona.BindableCollection([
    {name: "Do the Wash", priority: "medium"},
    {name: "Walk the Dog", priority: "medium"},
    {name: "Work Out", priority: "low"},
    {name: "File Taxes", priority: "high"}
  ]);
  var todoView = new kona.BindableCollectionView(allTodos, {limit: 3});
  
  todoList.bindToCollection(todoView, {
    content: function(todo) {
      return todo.name;
    }
  });


  todoList.delegate("li", "click", function(e) {
    var obj = new kona.BindableObject($(this).data("boundObject"));
    console.log(obj);
    todoForm.bindToObject(obj);
  });
});
