var select;
var msContainer;

beforeEach(function() {
  $('<select id="select-multiple" multiple="multiple" name="test[]"></select>').appendTo('body');
  for (var i=1; i <= 10; i++) {
    $('<option value="value'+i+'">text'+i+'</option>').appendTo($("#select-multiple"));
  };
  select = $("#select-multiple");
});

afterEach(function () {
  $("#select-multiple, #select-multiple-optgroup, .ms-container").remove();
});

sanitize = function(value){
  var hash = 0, i, char;
  if (value.length == 0) return hash;
  var ls = 0;
  for (i = 0, ls = value.length; i < ls; i++) {
    char  = value.charCodeAt(i);
    hash  = ((hash<<5)-hash)+char;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}
