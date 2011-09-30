$(function() {
  var todoList = $("#todo-list"),
      todoForm = $("#todo-form"),
      deleteButton = $("#done-button"),
      pagination = $("#pagination"),
      allTodos = kona([
        {name: "Do the Wash", priority: "medium"},
        {name: "Walk the Dog", priority: "medium"},
        {name: "Work Out", priority: "low"},
        {name: "Do Stuff", priority: "low"},
        {name: "Do Laundry", priority: "low"},
        {name: "Feed the Cats", priority: "low"},
        {name: "Book Travel Plans", priority: "low"},
        {name: "File Taxes", priority: "high"}
      ]),
      todoView = allTodos.view({limit: 3});
  
  todoList.kona("bind", todoView, {
    content: function(todo) {
      return todo.name() + " (" + todo.priority() + ")";
    }
  });

  todoList.delegate("li", "click", function(e) {
    var todo = $(this).kona("binded");
    todoForm.kona("bind", todo);
  });

  deleteButton.click(function(e) {
    e.preventDefault();
    var todo = todoForm.kona("binded");
    allTodos.remove(todo);
    todoForm.find(":input").val("");
  });

  pagination.kona("paginator", todoView);
});
