var mathSymbols = new RegExp('[-()+*\\/]');
var nonsense = new RegExp('[^(M|CM|D|CD|C|XC|L|XL|X|IX|V|IV|I)]')
var romanNumerals = {
  'M' : 1000,
  'CM' : 900,
  'D' : 500,
  'CD' : 400,
  'C' : 100,
  'XC' : 90,
  'L' : 50,
  'XL' : 40,
  'X' : 10,
  'IX' : 9,
  'V' : 5,
  'IV' : 4,
  'I' : 1
};

$(document).ready(function(){

    var row1 = document.createElement('td');
    var row1Text = document.createTextNode('Arabic Numerals');
    row1.appendChild(row1Text);
    var row2 = document.createElement('td');
    var row2Text = document.createTextNode('Roman Numerals');
    row2.appendChild(row2Text);
    $("#arabic").append(row1);
    $("#roman").append(row2);

  // Generating Table
  _.each(romanNumerals, function(key, val){
    var arabic = document.createElement('td');
    var valText = document.createTextNode(val);
    arabic.appendChild(valText);

    var roman = document.createElement('td');
    var keyText = document.createTextNode(key);
    roman.appendChild(keyText);

    $("#arabic").append(arabic);
    $("#roman").append(roman);
  });

  $(".formula-box").keypress(function(event){
    if(event.which == 13){
      event.preventDefault();
      calculate($(".formula-box").val());
    }
  });

  $(".calc-btn").click(function(){
    calculate($(".formula-box").val());
  });

  function calculate(formula){
    //remove all white space and make upper case
    formula = formula.trim().replace(/ /g, '').toUpperCase();

    if(mathSymbols.test(formula)){
      var result = '';
      var tokens = formula.split(mathSymbols);

      tokens = _.filter(_.map(tokens, convert), function(val){
        return val !== '';
      });

      tokens.forEach(function(data){
        formula = formula.replace(new RegExp('[A-Z]+'), data);
      });

      result = convert(math.eval(formula));
      if(result > 3999){
        result = 'Authentic roman numerals don\'t go beyond 3999 since there is no symbol for 5000';
      }
    } else{
      if(nonsense.test(formula)){
        $('.result h2').html('NONSENSE! THOSE AREN\'T ROMAN NUMERALS!');
        return;
      }
      var result = convert(formula);
    }
    $('.result h2').html(result);
  }

  function convert(numerals){
    if(isNaN(numerals)){
      //convert from roman numeral to int
      var result = 0;
      $.each(romanNumerals, function(key, value) {
        var regex = RegExp('^' + key);
        while (numerals.match(regex)) {
          result += value
          numerals = numerals.replace(regex, '')
        }
      });
      return result;
    } else{
      // convert from int to roman numeral
      var result = '';
      $.each(romanNumerals, function(key, value) {
        while(numerals >= value) {
          result += key;
          numerals -= value;
        }
      });
      return result;
    }
  }
})
