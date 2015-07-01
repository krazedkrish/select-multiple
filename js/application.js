// Put your application scripts here
(function($){
  $(function(){
    $('#aloha').selectMultiple({
      keepOrder: true
    });
    $('.selectmultiple').selectMultiple({});

    $('.searchable').selectMultiple({
      selectableHeader: "<input type='text' class='search-input' autocomplete='off' placeholder='try \"12\"'>",
      selectionHeader: "<input type='text' class='search-input' autocomplete='off' placeholder='try \"4\"'>",
      afterInit: function(ms){
        var that = this,
            $selectableSearch = that.$selectableUl.prev(),
            selectableSearchString = '#'+that.$container.attr('id')+' .ms-elem-selectable';

        that.qs1 = $selectableSearch.quicksearch(selectableSearchString)
        .on('keydown', function(e){
          if (e.which === 40){
            that.$selectableUl.focus();
            return false;
          }
        });

      },
      afterSelect: function(){
        this.qs1.cache();
      },
      afterDeselect: function(){
        this.qs1.cache();
      }
    });


    $('#keep-order').selectMultiple({
      keepOrder: true
    });

    $('#optgroup').selectMultiple({
      selectableOptgroup: true
    });


    $('#custom-headers').selectMultiple({
      selectableHeader: "<div class='custom-header'>Selectable item</div>",
      selectionHeader: "<div class='custom-header'>Selection items</div>",
      selectableFooter: "<div class='custom-header'>Selectable Footer</div>",
      selectionFooter: "<div class='custom-header'>Selection Footer</div>"
    });

    $('#callbacks').selectMultiple({
      afterSelect: function(values){
        alert("Select value: "+values);
      },
      afterDeselect: function(values){
        alert("Deselect value: "+values);
      }
    });

    $('#refresh').on('click', function(){
      $('#public-methods').selectMultiple('refresh');
      return false;
    });

    $('#public-methods').selectMultiple({});

    $('#select-all').click(function(){
      $('#public-methods').selectMultiple('select_all');
      return false;
    });
    $('#deselect-all').click(function(){
      $('#public-methods').selectMultiple('deselect_all');
      return false;
    });

    var arr = [];

    for (var i = 0; i < 100; i++){
      arr[i] = 'elem_'+(i+1);
    }

    $('#select-100').click(function(){
      $('#public-methods').selectMultiple('select', arr);
      return false;
    });
    $('#deselect-100').click(function(){
      $('#public-methods').selectMultiple('deselect', arr);
      return false;
    });

    $('#add-option').on('click', function(){
      $('#public-methods').selectMultiple('addOption', { value: 42, text: 'test 42', index: 0 });
      return false;
    });

  });
})(jQuery);
