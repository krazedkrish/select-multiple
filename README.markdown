
# jquery.select-multiple.js

[![Join the chat at https://gitter.im/krazedkrish/select-multiple](https://badges.gitter.im/krazedkrish/select-multiple.svg)](https://gitter.im/krazedkrish/select-multiple?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

This is an awesome user-friendlier drop-in replacement for the standard ```<select>``` with multiple attribute activated.

## Demos
[http://krazedkrish.github.io/select-multiple/#demos](http://krazedkrish.github.io/select-multiple/#demos)

## Features
- Free (under MIT license)
- Works in an unobtrusive fashion
- Fully open sourced
- Keyboard support
- Provides some callbacks
- Fully customizable via CSS
- Depends on jQuery 1.8+
- Tiny code ~8kb minified
- Rails [gem](https://github.com/krazedkrish/select-multiple-rails)

## Dependencies
- jQuery 1.8+

## Usage

### HTML

```html
<html>
  <head>
    <link href="path/to/select-multiple.css" media="screen" rel="stylesheet" type="text/css">
  </head>
  <body>
    <select multiple="multiple" id="my-select" name="my-select[]">
      <option value='elem_1'>elem 1</option>
      <option value='elem_2'>elem 2</option>
      <option value='elem_3'>elem 3</option>
      <option value='elem_4'>elem 4</option>
      ...
      <option value='elem_100'>elem 100</option>
    </select>
    <script src="path/to/jquery.select-multiple.js" type="text/javascript"></script>
  </body>
</html>
```

### JavaScript

```javascript
$('#my-select').selectMultiple()
```

### Options

| Name               | type      | default               | description                                                          |
| ------------------ | --------- | --------------------- | -------------------------------------------------------------------- |
| afterInit          | function  | function(container){} | Function to call after the selectMultiple initilization.             |
| afterSelect        | function  | function(values){}    | Function to call after one item is selected.                         |
| afterDeselect      | function  | function(values){}    | Function to call after one item is deselected.                       |
| selectableHeader   | HTML/Text | null                  | Text or HTML to display in the selectable header.                    |
| selectableFooter   | HTML/Text | null                  | Text or HTML to display in the selectable footer.                    |
| disabledClass      | String    | 'disabled'            | CSS class for disabled items.                                        |
| selectableOptgroup | Boolean   | false                 | Click on optgroup will select all nested options when set to true.   |
| dblClick           | Boolean   | false                 | Replace the defautl click event to select items by the dblclick one. |
| cssClass           | String    | ""                    | Add a custom CSS class to the selectmultiple container.              |
| allowHTML          | Boolean   | false                 | Don't escape items' HTML                                             |

### Methods

```javascript
.selectMultiple(options)
```

Activates your content as a selectmultiple. Accepts an optional options object

```javascript
$('#your-select').selectMultiple({});
```

> Note: You must init the multiple select with $('#your-select').selectMultiple() before calling one of the following methods.
> .selectMultiple('select', String|Array)

Select the item with the value given in parameter. The value can be either a string ('elem_1') matching the value of the option oran Array of values (['elem_1', 'elem_42']).

```javascript
$('#your-select').selectMultiple('select', String|Array);

.selectMultiple('deselect', String|Array)
```

Deselect the item with the value given in parameter. The value can be either a string ('elem_1') matching the value of the option oran Array of values (['elem_1', 'elem_42']).

```javascript
$('#your-select').selectMultiple('deselect', String|Array);

.selectMultiple('select_all')
```

Select all elements.

```javascript
$('#your-select').selectMultiple('deselect_all');

.selectMultiple('deselect_all')
```

Deselect all items previously selected.

```javascript
$('#your-select').selectMultiple('select_all');

.selectMultiple('refresh')
```

Refresh current selectmultiple.

```javascript
$('#your-select').selectMultiple('refresh');

.selectMultiple('addOption', Hash)
```

Dynamically add option to the selectmultiple.
The options hash is described below:

key    |  type  | required | desription
-------|--------|----------|-------------
value  | String | true     | The value of the option to create
text   | String | true     | The text of the option to create
index  | Number | false    | The index where to insert the option. If none given, it will be inserted as last option.
nested | String | false    | If there are optgroups you can choose under which optgroup you want to insert the option.

```javascript
$('#your-select').selectMultiple('addOption', { value: 'test', text: 'test', index: 0, nested: 'optgroup_label' });
```

Keyboard

key  | function
-----|---------
<kbd>↓</kbd> | Down arrow   Select next item in the focused list
<kbd>↑</kbd> | Up arrow   Select previous item in the focused list
<kbd>—</kbd> | Space  Add/remove item depending on which list is currently focused


### Pre-selected options

```html
<select id='pre-selected-options' multiple='multiple'>
  <option value='elem_1' selected>elem 1</option>
  <option value='elem_2'>elem 2</option>
  <option value='elem_3'>elem 3</option>
  <option value='elem_4' selected>elem 4</option>
  ...
  <option value='elem_100'>elem 100</option>
</select>
```

```javascript
$('#pre-selected-options').selectMultiple();
```

### Callbacks

```html
<select id='callbacks' multiple='multiple'>
  <option value='elem_1'>elem 1</option>
  <option value='elem_2'>elem 2</option>
  <option value='elem_3'>elem 3</option>
  <option value='elem_4'>elem 4</option>
  ...
  <option value='elem_100'>elem 100</option>
</select>
```

```javascript
$('#callbacks').selectMultiple({
  afterSelect: function(values){
    alert("Select value: "+values);
  },
  afterDeselect: function(values){
    alert("Deselect value: "+values);
  }
});
```

### Public methods

- select all / deselect all
- select 100 elems / deselect 100 elems
- Add option
- refresh

```html
<a href='#' id='select-all'>select all</a>
<a href='#' id='deselect-all'>deselect all</a>
<a href='#' id='select-100'>select 100 elems</a>
<a href='#' id='deselect-100'>deselect 100 elems</a>
<select id='public-methods' multiple='multiple'>
  <option value='elem_1'>elem 1</option>
  <option value='elem_2' disabled>elem 2</option>
  <option value='elem_3'>elem 3</option>
  <option value='elem_4'>elem 4</option>
  ...
  <option value='elem_1000'>elem 100</option>
</select>
```

```javascript
$('#public-methods').selectMultiple();
$('#select-all').click(function(){
  $('#public-methods').selectMultiple('select_all');
  return false;
});
$('#deselect-all').click(function(){
  $('#public-methods').selectMultiple('deselect_all');
  return false;
});
$('#select-100').click(function(){
  $('#public-methods').selectMultiple('select', ['elem_0', 'elem_1' ..., 'elem_99']);
  return false;
});
$('#deselect-100').click(function(){
  $('#public-methods').selectMultiple('deselect', ['elem_0', 'elem_1' ..., 'elem_99']);
  return false;
});
$('#refresh').on('click', function(){
  $('#public-methods').selectMultiple('refresh');
  return false;
});
$('#add-option').on('click', function(){
  $('#public-methods').selectMultiple('addOption', { value: 42, text: 'test 42', index: 0 });
  return false;
});
```

### Optgroup

```html
<select id='optgroup' multiple='multiple'>
  <optgroup label='Friends'>
    <option value='1'>Yoda</option>
    <option value='2' selected>Obiwan</option>
  </optgroup>
  <optgroup label='Enemies'>
    <option value='3'>Palpatine</option>
    <option value='4' disabled>Darth Vader</option>
  </optgroup>
</select>
```

```javascript
$('#optgroup').selectMultiple({ selectableOptgroup: true });
```

### Disabled attribute

```html
<select id='disabled-attribute' disabled='disabled' multiple='multiple'>
  <option value='elem_1'>elem 1</option>
  <option value='elem_2'>elem 2</option>
  <option value='elem_3'>elem 3</option>
  <option value='elem_4'>elem 4</option>
  ...
  <option value='elem_100'>elem 100</option>
</select>
```

```javascript
$('#disabled-attribute').selectMultiple();
```

> Note: You can also deactivate option one by one by adding disabled attribute to each option you want to disable
> <option value='fuu' disabled='disabled'>bar</option>

### Custom headers and footers

```html
<select id='custom-headers' multiple='multiple'>
  <option value='elem_1'>elem 1</option>
  <option value='elem_2'>elem 2</option>
  <option value='elem_3'>elem 3</option>
  <option value='elem_4'>elem 4</option>
  ...
  <option value='elem_100'>elem 100</option>
</select>
```

```javascript
$('#custom-headers').selectMultiple({
  selectableHeader: "<div class='custom-header'>Selectable items</div>",
  selectableFooter: "<div class='custom-header'>Selectable footer</div>"
});
```

### Searchable

> Note: This feature is not built-in but depends on an other plugin. I personnally use the excellent quicksearch library, but you can use whatever library you like.

```html
<select id='custom-headers' multiple='multiple'>
  <option value='elem_1' selected>elem 1</option>
  <option value='elem_2'>elem 2</option>
  <option value='elem_3'>elem 3</option>
  <option value='elem_4' selected>elem 4</option>
  ...
  <option value='elem_100'>elem 100</option>
</select>
```

```javascript
$('.searchable').selectMultiple({
  selectableHeader: "<input type='text' class='search-input' autocomplete='off' placeholder='try \"12\"'>",
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
```

## Documentation
[http://krazedkrish.github.io/select-multiple](http://krazedkrish.github.io/select-multiple)

## References:
Based on https://github.com/lou/multi-select/
