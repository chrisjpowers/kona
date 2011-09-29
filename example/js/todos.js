$(function() {
  var todoList = $("#todo-list"),
      todoForm = $("#todo-form"),
      deleteButton = $("#done-button"),
      pagination = $("#pagination"),
      selectedTodo,
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
    selectedTodo = $(this).data("boundObject");
    todoForm.kona("bind", selectedTodo);
  });

  deleteButton.click(function(e) {
    e.preventDefault();
    allTodos.remove(selectedTodo);
    todoForm.find(":input").val("");
  });

  pagination.kona("paginator", todoView);
});
