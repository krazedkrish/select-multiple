describe("selectMultiple", function() {

  describe('init', function(){
    it ('should be chainable', function(){
      select.selectMultiple().addClass('chainable');
      expect(select.hasClass('chainable')).toBeTruthy();
    });
    describe('without options', function(){

      beforeEach(function() {
        select.selectMultiple();
        msContainer = select.next();
      });

      it('should hide the original select', function(){
        expect(select.css('position')).toBe('absolute');
        expect(select.css('left')).toBe('-9999px');
      });

      it('should create a container', function(){
        expect(msContainer).toBe('div.ms-container');
      });

      it ('should create a selectable and a selection container', function(){
        expect(msContainer).toContain('div.ms-selectable, div.ms-selection');
      });

      it ('should create a list for both selectable and selection container', function(){
        expect(msContainer).toContain('div.ms-selectable ul.ms-list, div.ms-selection ul.ms-list');
      });

      it ('should populate the selectable list', function(){
        expect($('.ms-selectable ul.ms-list li').length).toEqual(10);
      });

      it ('should populate the selection list', function(){
        expect($('.ms-selectable ul.ms-list li').length).toEqual(10);
      });

    });

    describe('with pre-selected options', function(){

      var selectedValues = [];

      beforeEach(function() {
        var firstOption = select.children('option').first();
        var lastOption = select.children('option').last();
        firstOption.prop('selected', true);
        lastOption.prop('selected', true);
        selectedValues.push(firstOption.val(), lastOption.val());
        select.selectMultiple();
        msContainer = select.next();
      });

      it ('should select the pre-selected options', function(){
        $.each(selectedValues, function(index, value){
          expect($('.ms-selectable ul.ms-list li#'+sanitize(value)+'-selectable')).toBe('.ms-selected');
        });
        expect($('.ms-selectable ul.ms-list li.ms-selected').length).toEqual(2);
      });
    });

    describe("with disabled pre-selected options", function(){
      var selectedValues = ['value1', 'value2', 'value3'];

      beforeEach(function() {
        $('#select-multiple').find('option')
          .first().prop('selected', true).prop('disabled', true)
          .next().prop('selected', true)
          .next().prop('selected', true).prop('disabled', true)
        ;
        $('#select-multiple').selectMultiple();
      })

      it ('should select the disabled pre-selected options', function(){
        $.each(selectedValues, function(index, value){
          expect($('.ms-selectable ul.ms-list li#'+sanitize(value)+'-selectable')).toBe('.ms-selected');
        });
        expect($('.ms-selectable ul.ms-list li.ms-selected').length).toEqual(3);
      });
    });

    describe("with disabled non-selected options", function(){
      var selectedValues = ['value1', 'value3'];

      beforeEach(function() {
        $('#select-multiple').find('option')
          .first().prop('selected', true)
          .next().prop('disabled', true)
          .next().prop('selected', true)
        ;
        $('#select-multiple').selectMultiple();
      })

      it ('should not select the disabled non-selected options', function(){
        $.each(selectedValues, function(index, value){
          expect($('.ms-selectable ul.ms-list li#'+sanitize(value)+'-selectable')).toBe('.ms-selected');
        });
        expect($('.ms-selectable ul.ms-list li.ms-selected').length).toEqual(2);
      });
    });
  });

  describe('destroy', function(){

    describe('destroy multi select', function(){
      beforeEach(function(){
        select.selectMultiple();
        msContainer = select.next();
        select.selectMultiple('destroy');
      });

      it('should show the original select', function(){
        expect(select.css('position')).not.toBe('absolute');
        expect(select.css('left')).not.toBe('-9999px');
      });

      it('should destroy the selectMultiple container', function(){
        expect(select.next().size()).toEqual(0);
      });
    });
  });

  describe('optgroup', function(){
    var optgroupMsContainer, optgroupSelect, optgroupLabels;

    beforeEach(function() {
      $('<select id="select-multiple-optgroup" multiple="multiple" name="testy[]"></select>').appendTo('body');
      for (var o=1; o <= 10; o++) {
        var optgroup = $('<optgroup label="opgroup'+o+'"></optgroup>')
        for (var i=1; i <= 10; i++) {
          var value = i + (o * 10);
          $('<option value="value'+value+'">text'+value+'</option>').appendTo(optgroup);
        };
        optgroup.appendTo($("#select-multiple-optgroup"));
      }
      optgroupSelect = $("#select-multiple-optgroup");
    });

    describe('init', function(){
      describe('with selectableOptgroup option set to false', function(){
        beforeEach(function(){
          optgroupSelect.selectMultiple({ selectableOptgroup: false });
          optgroupMsContainer = optgroupSelect.next();
          optgroupLabels = optgroupMsContainer.find('.ms-selectable .ms-optgroup-label');
        });

        it ('sould display all optgroups', function(){
          expect(optgroupLabels.length).toEqual(10);
        });

        it ('should do nothing when clicking on optgroup', function(){
          var clickedOptGroupLabel = optgroupLabels.first();
          clickedOptGroupLabel.trigger('click');
          expect(optgroupSelect.val()).toBeNull();
        });
      });

      describe('with selectableOptgroup option set to true', function(){
        beforeEach(function(){
          optgroupSelect.selectMultiple({ selectableOptgroup: true });
          optgroupMsContainer = optgroupSelect.next();
          optgroupLabels = optgroupMsContainer.find('.ms-selectable .ms-optgroup-label');
        });

        it ('should select all nested options when clicking on optgroup', function(){
          var clickedOptGroupLabel = optgroupLabels.first();
          clickedOptGroupLabel.trigger('click');
          expect(optgroupSelect.val().length).toBe(10);
        });
      });
    });

  });

  describe('select', function(){

    describe('multiple values (Array)', function(){
      var values = ['value1', 'value2', 'value7'];
      beforeEach(function(){
        $('#select-multiple').selectMultiple();
        $('#select-multiple').selectMultiple('select', values);
      });
      
      it('should select corresponding option', function(){
        expect(select.val()).toEqual(values);
      });
    });

    describe('single value (String)', function(){
      var value = 'value1';

      beforeEach(function(){
        $('#select-multiple').selectMultiple();
        $('#select-multiple').selectMultiple('select', value);
      });

      it('should select corresponding option', function(){
        expect($.inArray(value, select.val()) > -1).toBeTruthy();
      });
    });

    describe("on click", function(){
      var clickedItem, value;

      beforeEach(function() {
        $('#select-multiple').selectMultiple();
        clickedItem = $('.ms-selectable ul.ms-list li').first();
        value = clickedItem.data('ms-value');
        spyOnEvent(select, 'change');
        spyOnEvent(select, 'focus');
        clickedItem.trigger('click');
      });

      it('should show check mark', function(){
        expect(clickedItem.children('.ms-elem-selected')).toBe(':visible');
      });

      it('should add the .ms-selected class to the selected item', function(){
        expect(clickedItem.hasClass('ms-selected')).toBeTruthy();
      });

      it('should select corresponding option', function(){
        expect(select.find('option[value="'+value+'"]')).toBeSelected();
      });

      it('should trigger the original select change event', function(){
        expect('change').toHaveBeenTriggeredOn("#select-multiple");
      });

      afterEach(function(){
        select.selectMultiple('deselect_all');
      });
    });

    describe("on click on disabled non-selected option", function(){
      var clickedItem, value;

      beforeEach(function() {
        $('#select-multiple').find('option').first().prop('disabled', true);
        $('#select-multiple').selectMultiple();
        clickedItem = $('.ms-selectable ul.ms-list li').first();
        value = clickedItem.data('ms-value');
        spyOnEvent(select, 'change');
        spyOnEvent(select, 'focus');
        clickedItem.trigger('click');
      });

      it('should not hide selected item', function(){
        expect(clickedItem).not.toBeHidden();
      });

      it('should not add the .ms-selected class to the selected item', function(){
        expect(clickedItem.hasClass('ms-selected')).not.toBeTruthy();
      });

      it('should not select corresponding option', function(){
        expect(select.find('option[value="'+value+'"]')).not.toBeSelected();
      });

      it('should not show the associated selected item', function(){
        expect($('#'+sanitize(value)+'-selection')).not.toBe(':visible');
      });

      it('should not trigger the original select change event', function(){
        expect('change').not.toHaveBeenTriggeredOn("#select-multiple");
      });

      afterEach(function(){
        select.selectMultiple('deselect_all');
      });
    });
  });

  describe('deselect', function(){
    describe('multiple values (Array)', function(){
      var selectedValues = ['value1', 'value2', 'value7'],
          deselectValues = ['value1', 'value2'];
      beforeEach(function(){
        $('#select-multiple').selectMultiple();
        $('#select-multiple').selectMultiple('select', selectedValues);
        $('#select-multiple').selectMultiple('deselect', deselectValues);
      });
      
      it('should select corresponding option', function(){
        expect(select.val()).toEqual(['value7']);
      });
    });

    describe('single value (String)', function(){
      var selectedValues = ['value1', 'value2', 'value7'],
          deselectValue = 'value2';

      beforeEach(function(){
        $('#select-multiple').selectMultiple();
        $('#select-multiple').selectMultiple('select', selectedValues);
        $('#select-multiple').selectMultiple('deselect', deselectValue);
      });

      it('should select corresponding option', function(){
        expect($.inArray(deselectValue, select.val()) > -1).toBeFalsy();
      });
    });

    describe("on click", function(){
      var clickedItem, value;
      var correspondingSelectableItem;

      beforeEach(function() {
        $('#select-multiple').find('option').first().prop('selected', true);
        $('#select-multiple').selectMultiple();

        clickedItem = $('.ms-selectable ul.ms-list li').first();
        value = clickedItem.data('ms-value');
        correspondingSelectableItem = $('.ms-selection ul.ms-list li').first();
        spyOnEvent(select, 'change');
        spyOnEvent(select, 'focus');
        clickedItem.trigger('click');
      });

      it ('should hide check mark for clicked item', function(){
        expect(clickedItem.children('.ms-elem-selected')).toBeHidden();
      });

      it('should show associated selectable item', function(){
        expect($('#'+sanitize(value)+'-selectable')).toBe(':visible');
      });

      it('should remove the .ms-selected class to the corresponding selectable item', function(){
        expect(correspondingSelectableItem.hasClass('ms-selected')).toBeFalsy();
      });

      it('should deselect corresponding option', function(){
        expect(select.find('option[value="'+value+'"]')).not.toBeSelected();
      });

      it('should trigger the original select change event', function(){
        expect('change').toHaveBeenTriggeredOn("#select-multiple");
      });

      afterEach(function(){
        select.selectMultiple('deselect_all');
      });
    });

    describe("on click on disabled selected option", function(){
      var clickedItem, value;
      var correspondingSelectableItem;

      beforeEach(function() {
        $('#select-multiple').find('option').first().prop('selected', true).prop('disabled', true);
        $('#select-multiple').selectMultiple();

        clickedItem = $('.ms-selectable ul.ms-list li').first();
        value = clickedItem.data('ms-value');
        correspondingSelectableItem = $('.ms-selectable ul.ms-list li').first();
        spyOnEvent(select, 'change');
        spyOnEvent(select, 'focus');
        clickedItem.trigger('click');
      });

      it ('should not hide clicked item', function(){
        expect(clickedItem).not.toBe(':hidden');
      });

      it('should not show associated selectable item', function(){
        expect($('#'+value+'-selectable')).not.toBe(':visible');
      });

      it('should not remove the .ms-selected class to the corresponding selectable item', function(){
        expect(correspondingSelectableItem.hasClass('ms-selected')).not.toBeFalsy();
      });

      it('should not deselect corresponding option', function(){
        expect(select.find('option[value="'+value+'"]')).toBeSelected();
      });

      it('should not trigger the original select change event', function(){
        expect('change').not.toHaveBeenTriggeredOn("#select-multiple");
      });

      afterEach(function(){
        select.selectMultiple('deselect_all');
      });
    });
  });
});
