var kona = kona || {};

(function($) {
  kona.BindableCollectionView = function BindableCollectionView(data, options) {
    this.data = data;
    this.notifier = $({});
    this.konaClass = "BindableCollection";
    this.update(options);

    data.bind("added", _.bind(this.onDataAdded, this));
    data.bind("removed", _.bind(this.onDataRemoved, this));

    this.all(); // preload the collection
  };

  kona.BindableCollectionView.prototype = {
    all: function all() {
      this.collection = this.collection || this.data.all(this.query());
      return this.collection;
    },

    update: function update(newOptions) {
      newOptions = newOptions || {};

      if(newOptions.limit) { 
        this.limit = newOptions.limit; 
      };

      if(newOptions.offset || newOptions.offset === 0) { 
        this.offset = newOptions.offset; 
      }
      else if(!this.offset) {
        this.offset = 0;
      };

      this.clearCache();
      this.trigger("updated", newOptions);
    },

    clearCache: function clearCache() {
      if(this.collection) {
        delete this.collection;
        this.all(); // repopulate this.collection, would be better if lazy
      }
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
      else {
        this.trigger("addedToCollection", [item]);
      }
    },

    onDataRemoved: function onDataRemoved(event, item, index) {
      var fillInItem, 
          localIndex = index - this.offset;
      // before or in the view
      if(this.collection && localIndex < this.limit) {
        var fallOffIndex = localIndex > 0 ? localIndex : 0;
        var fallOffItem = this.collection[fallOffIndex];
        this.collection = this.collection.slice(0,localIndex).concat(this.collection.slice(fallOffIndex + 1, this.collection.length));

        this.trigger("removed", [fallOffItem, fallOffIndex]);
        if(fillInItem = this.data.itemAtIndex(this.lastIndex())) {
          this.collection.push(fillInItem);
          this.trigger("added", [fillInItem, this.limit - 1]);
        }
      }
      // after the view
      else {
        this.trigger("removedFromCollection", [item]);
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
  };
})(jQuery);
