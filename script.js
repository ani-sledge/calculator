//CALCULATOR
var calculations = {
  '+': function(a, b) {
    return a + b;
  }, 
  '-': function(a, b) {
    return a - b;
  },
  '*': function(a, b) {
    return a * b;
  },
  '/': function(a, b) {
    return a / b;
  },
  '+/-': function(a) {
    return (- a);
  }
}
function isHere(variable) {
  return variable != '' ? true : false;
}
function clear(input) {
  input['control'] = '';
  input['values'] = '';
}
function getNumberValues(input) {
  var csv = input["values"].split(',');
  var number_values = [];
  for (var i = 0; i < csv.length; i++) {
    number_values[i] = Number(csv[i]);
  }
  return number_values
}

$( document ).ready (function() {
    var input = { 'values': '', 'control': '' };
    var display = $( '#display' );
    var display_content = '';

    $('div.button').click(function() {
      var btn_number = $( this ).attr("id");
      input['values'] += btn_number;
      
      display_content += btn_number;
      display.html( display_content );
    });

    $('div.control').click(function() {
      var control_symbol = $( this ).attr("id");

      //Can only add a control after a number
      if (!isHere(input['control']) && isHere(input['values'])) {
        input['control'] = control_symbol;
        input['values'] += ',';
        
        display_content += ' ' + control_symbol + ' ';
        display.html( display_content );
      }
    });

    $('div.clear').click(function () {
      clear(input);
      display_content = '';
      display.html( display_content );
    });

    $('#equals').click(function() {
      var controller = input['control'];
      var val = input['values'];

      //Validate input
      var invalid = isNaN( val[val.length - 1] );
      var numbers = getNumberValues(input);
      if (numbers.length >= 2 && isHere(controller) && !invalid) {
        //Perform calculation
        var result = calculations[controller](numbers[0], numbers[1]);

        //Round decimal places
        var places = 4;
        var result_string = String(result).split('.');
        if (result_string.length == 2 && result_string[1].length > places) {
          var rounded_decimal = result_string[1].slice(0, places);
          result = Number(result_string[0] + '.' + rounded_decimal);
        }
  
        clear(input);
        input['values'] = result;
        display_content = result;
        display.html( display_content );
      }
    });
});


//NOTES
//Reduce repetition, clarify

//Store the working number as a string in a global variable
//+= each number to the string
//When they hit a control button or equals, append the string as a number to variables[]
//Number will be available for +/- conversion, and deletion
//Clear stored number with clear
//Include stored number in display

//Add . button for decimal points/floats(can only add once per value)
//Same as the numbers, but requires additional validation
//Add +/- button to change the sign of the last number

//Add modulo button %
//Add power button ^?
//Add a del button to remove last entry?
//Add square root button (what is the char?)?



















