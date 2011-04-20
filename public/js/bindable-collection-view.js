var kona = kona || {};

(function($) {
  kona.BindableCollectionView = Class.extend({
    init: function init(data, options) {
      this.data = data;
      options = options || {};
      this.limit = options.limit;
      this.offset = options.offset;
      this.notifier = $({});

      data.bind("added", _.bind(this.onDataAdded, this));
      data.bind("removed", _.bind(this.onDataRemoved, this));
    },

    all: function all() {
      this.collection = this.collection || this.data.all(this.query());
      return this.collection;
    },

    onDataAdded: function onDataAdded(event, item, index) {
      var localIndex = index - this.offset;
      if(this.collection && localIndex < this.limit) {
        var poppedItem = this.collection[this.limit - 1];
        this.trigger("removed", [poppedItem, this.limit - 1]);
        if(localIndex >= 0) {
          this.collection = this.collection.slice(0,localIndex)
              .concat([item])
              .concat(this.collection.slice(localIndex,this.limit - 1));
          this.trigger("added", [item, localIndex]);
        } else {
          this.collection = [this.data.itemAtIndex(this.offset)]
                            .concat(this.collection.slice(0, this.limit - 1));
          this.trigger("added", [this.collection[0], 0]);
        }
      }
    },

    onDataRemoved: function onDataRemoved(event, item, index) {
      var fillInItem, 
          localIndex = index - this.offset;
      if(this.collection && localIndex < this.limit) {
        var fallOffItem = this.collection[0];
        this.collection = this.collection.slice(0,localIndex).concat(this.collection.slice(localIndex + 1, this.collection.length));

        this.trigger("removed", [fallOffItem, 0]);
        if(fillInItem = this.data.itemAtIndex(this.lastIndex())) {
          this.collection.push(fillInItem);
          this.trigger("added", [fillInItem, this.limit - 1]);
        }
      }
    },

    query: function query() {
      return {
        limit: this.limit,
        offset: this.offset
      }
    },

    lastIndex: function lastIndex() {
      return this.offset + this.limit - 1;
    },

    bind: function bind(eventName, callback) {
      this.notifier.bind(eventName, callback);
    },

    trigger: function trigger(eventName, args) {
      this.notifier.trigger(eventName, args);
    }
  });
})(jQuery);
