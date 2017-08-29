var capsLockEnabled = null;
var inputValue = '';
var element;

$(document).ready(function(){
    var el = $('.wordf');
    setInterval(function(){
        element = $('.wordf[name="fkform['+($('.credit_active').index(".credit_menu li")+1)+'][fio]"]');
    }, 50);
    
    $(el).keyup(function(){
        var val = $(element).val();
	    val = val.replace(/[А-Я]/g, upperToHyphenLower);
        val = val.replace(/\s\s/g, ' ');
        val = val.replace(/\s[а-я]/g, lToU);
        val = val.replace(/\s\s/g, ' ');
        if(val.substr(0, 1) == ' ') val = val.substr(1);
        val = val.substr(0, 1).replace(/[а-я]/g, lToU)+val.substr(1);
        $(element).val(val);
    });
    
    $(el).keypress(function(e){
        inputValue = $(element).val();
        $(element).css('border', '1px solid #f3f3f3').html('');
        
        var chr = getChar(e);
        if (!chr) return;
        if (chr.toLowerCase() == chr.toUpperCase()) {
            return;
        }
        capsLockEnabled = (chr.toLowerCase() == chr && e.shiftKey) || (chr.toUpperCase() == chr && !e.shiftKey);
        if(capsLockEnabled == true){
            $('.fio_err').html('Выключите пожалуйста кнопку "Caps Lock"');
            return false;
        }
    });
    
    if (navigator.platform.substr(0, 3) != 'Mac') {
        $(el).keypress(function(e){
            if (e.keyCode == 20 && capsLockEnabled !== null) {
              capsLockEnabled = !capsLockEnabled;
            }
        });
    }
    
    $('#sub_but').click(function(){
        var err = false;
        var val = trim($(element).val());
        if(val.indexOf(' ') == -1) err = true;
        else{
            val = explode(' ', val);
            if(val.length < 2) err = true;
        }
        if(err == true) {
            $(element).css('border', 'solid 1px red');
            //$('.fio_err').html('Некорректное ФИО');
            return false;
        }
    });
});

function lToU(match){
    return match.toUpperCase();
}

function upperToHyphenLower(match){
    return ' ' + match;
}

function getChar(event) {
      if (event.which == null) {
        if (event.keyCode < 32) return null;
        return String.fromCharCode(event.keyCode)
      }

      if (event.which != 0 && event.charCode != 0) {
        if (event.which < 32) return null;
        return String.fromCharCode(event.which)
      }
      return null;
}

function trim( str, charlist ) {
    charlist = !charlist ? ' \s\xA0' : charlist.replace(/([\[\]\(\)\.\?\/\*\{\}\+\$\^\:])/g, '\$1');
	var re = new RegExp('^[' + charlist + ']+|[' + charlist + ']+$', 'g');
	return str.replace(re, '');
}

// ------------------------------ Ф-ция explode -------------------------
function explode( delimiter, string ) {var emptyArray = { 0: '' };if ( arguments.length != 2|| typeof arguments[0] == 'undefined'|| typeof arguments[1] == 'undefined' ){return null;}if ( delimiter === ''|| delimiter === false|| delimiter === null ){return false;}if ( typeof delimiter == 'function'|| typeof delimiter == 'object'|| typeof string == 'function'|| typeof string == 'object' ){return emptyArray;}if ( delimiter === true ) {delimiter = '1';}return string.toString().split ( delimiter.toString() );}
