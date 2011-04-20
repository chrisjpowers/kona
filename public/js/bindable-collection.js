var kona = kona || {};

(function($) {
  function defaultSort(item) {
    return item;
  }

  kona.BindableCollection = Class.extend({
    init: function init(arr) {
      this.collection = arr || [];
      this.notifier = $({});
    },

    all: function all(options) {
      if(!options) {
        return this.collection;
      }
      var options = options || {};
      var offset = options.offset || 0;
      return this.collection.slice(offset, offset + options.limit);
    },

    add: function add(item) {
      this.collection.push(item);
      this.trigger("added", [item, this.collection.length - 1]);
    },

    insert: function insert(item, index) {
      this.collection = this.collection.slice(0,index).concat([item]).concat(this.collection.slice(index,this.collection.length));
      this.trigger("added", [item, index]);
    },

    remove: function remove(item) {
      var index = _.indexOf(this.collection, item);
      if(index > -1) {
        this.removeIndex(index);
      }
    },

    removeIndex: function removeIndex(index) {
      var item = this.collection[index];
      this.collection = this.collection.slice(0,index).concat(this.collection.slice(index + 1, this.collection.length));
      this.trigger("removed", [item, index]);
    },

    sort: function sort(sortFunc) {
      var sortFunc = sortFunc || defaultSort
      this.collection = _.sortBy(this.collection, sortFunc);
      this.trigger("sorted");
    },

    itemAtIndex: function itemAtIndex(index) {
      return this.collection[index];
    },

    bind: function bind(eventName, callback) {
      this.notifier.bind(eventName, callback);
    },

    trigger: function trigger(eventName, args) {
      this.notifier.trigger(eventName, args);
    }
  });
})(jQuery);
