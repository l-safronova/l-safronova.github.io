jQuery(function ($) {

	$('.fancybox').fancybox({
		maxWidth: 960,
	});

	var hsh = location.hash;

	var tabs = $('.credit_choice');

	var tabClick = (function(){
		$.each(tabs, function(){
			if ($(this).attr('href') == hsh) {
				$(this).click();
				return false;
			}
		});
	}).bind(tabs);

	if (hsh) setTimeout(tabClick, 2000);
	var tooltipErr = true,
	passTool = $('<div/>').prop('class','pass-tooltip').html('<span></span>').appendTo('.content_block');

	$(document).on("click",".credit_choice",function(e){
		e.preventDefault();
		var tabId = $(this).attr('href');
		//location.hash = tabId;
		$.each($(tabId).siblings(), function () {
			$(this).find(':input').attr('disabled','disabled');
		});

		$(tabId).find(':input').removeAttr('disabled');

		$(this).parent().siblings().removeClass("credit_active");
		$(this).parent().addClass("credit_active");

		$(tabId).siblings().css({'display':'none'});
		$(tabId).css({'display':'block'});
		$('.field-error').removeClass('field-error');
		if (tabId.match('consumer') || tabId.match('zalog') || tabId.match('autocredit') || tabId.match('ipoteca')) {
			$('.back').hide();
			$('.next').text('Отправить анкету');
		}/*else{
			$('.back').hide();
			$('.next').text('Отправить');
		}*/
	});

	/*------------------------------------------------------------------------*/
	$("#tel,#tel2,#tel3,#tel4,#tel5,#tel6").mask("+7(999) 999-9999");
	$(".tel").on("keyup",function(){
		if($(this).val()['3'].match(/[7-8]/g)){
			$(this).blur().focus();
		}
	});

	var attnt = {
		wordReg: /[\\\/\!\@\#\$\%\^\&\*\(\)\=\-\+\~\`\>\<\:\;\'\"\w\.\,\s]/gi,
		wordfReg: /[\\\/\!\@\#\$\%\^\&\*\(\)\=\-\+\~\`\>\<\:\;\'\"\w\.\,]/gi,
		textReg: /[\\\/\!\#\$\%\^\&\*\=\~\`\>\<\'\?]/gi,
		moneyReg: /[^0-9\s]/g,
		digitsReg: /[^0-9]/g,
		mailReg: /[^0-9a-zA-Z-_@\.]+/gi,
		fieldAtnt : function(ele, regType){
			if(ele.val().match(regType)){
				ele.css({'background':'#F3D5D6'});
				setTimeout(function(){ele.css({'background':'#FFF'});},160)
			}
		}
	};

	$(document).on("keyup",".word",function(){
		attnt.fieldAtnt($(this), attnt.wordReg);
		$(this).val($(this).val().replace(attnt.wordReg,''));
	});

	$(document).on("keyup",".wordf",function(){
		attnt.fieldAtnt($(this), attnt.wordfReg);
		$(this).val($(this).val().replace(attnt.wordfReg,''));
	});

	$(document).on("keyup",".text",function(){
		attnt.fieldAtnt($(this), attnt.textReg);
		$(this).val($(this).val().replace(attnt.textReg,''));
	});

	$(document).on("keyup",".money",function(){
		attnt.fieldAtnt($(this), attnt.moneyReg);
		$(this).val($(this).val().replace(/[^0-9]/g,''));
		$(this).val($(this).val().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));
	});

	$(document).on("keyup",".digits",function(){
		attnt.fieldAtnt($(this), attnt.digitsReg);
		$(this).val($(this).val().replace(attnt.digitsReg,''));
	});

	$(document).on("keyup",".email_field",function(){
		attnt.fieldAtnt($(this), attnt.mailReg);
		$(this).val($(this).val().replace(attnt.mailReg,''));
	});
	/*------------------------------------------------------------------------*/
	$(document).on("focus",".validate",function(){
		$(this).removeClass('field-error');
		//$(this).parent().removeClass('field-error');
		//$(this).siblings().removeClass('field-error');
	});

	var rules = {
		fld : function(val){
			return val.replace(/[\s]/gi,'').length > 0 ? true : false;
		},
		mail : function(val){
			return val.replace(/[\s]/gi,'').match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/) ? true : false;
		},
		sel : function(val){
			return val > 0 ? true : false;
		},
		selpic : function(val){
			return val > 0 ? true : false;
		},
		minSum : function(val){
			return val.replace(/[\s]/gi,'') > 999 ? true : false;
		},
		chbox : function(chx){
			return $(chx).is(':checked') ? true : false;
		}
	};

	$('.agree_check').change(function() {
		if($(this).is(":checked")) {
			$(".yes p").removeClass('agree-error').html('Я даю свое согласие на обработку моих персональных данных <a href="#popup_agreement" class="fancybox">(подробнее)</a>');
		}else {
			$(".yes p").addClass('agree-error').html('Вы должны дать свое согласие на обработку Ваших персональных данных <a href="#popup_agreement" class="fancybox">(подробнееa)</a>');
		}
	});

	var konvert_count = 1;
	$('#fieldform').on('submit', function(e){
		e.preventDefault();
		if(tooltipErr != true) return;
		var sendFields = $(this).find('.validate').filter(':visible').not(':disabled');
		var bar = true;

		$.each(sendFields, function(i, field){
			switch ($(field).attr('rule')){
				case "minsum":
					if (!rules.minSum($(field).val())) {
						$(this).addClass('field-error');
						bar = false;
					}
					break;
				case "mail":
					if (!rules.mail($(field).val())) {
						$(this).addClass('field-error');
						bar = false;
					}
					break;
				case "sel":
					if (!rules.sel($(field).val())) {
						$(this).addClass('field-error');
						$(this).parent('.sel_wrap').addClass('field-error');
						bar = false;
					}
					break;
				case "selpic":
					if (!rules.selpic($(field).val())) {
						$(this).parent().addClass('field-error');
						$(this).parent().children().addClass('field-error');
						bar = false;
					}
					break;
				case "chbox":
					if (!rules.chbox($(field))) {
						bar = false;
					}
					break;
				default:
					if (!rules.fld($(field).val())) {
						$(this).addClass('field-error');
						bar = false;
					}
					break;
			}
		});

		if (bar !== true) {
			error_field = $('.field-error').offset().top;
			$('body,html').animate( { scrollTop: error_field - 25 }, 400 );
			return false;
		}

		var fieldstab = $('#fieldtabs').children().filter(':visible');
		if (parseInt(fieldstab.length) !== 1) {
			document.location.reload();
			return false;
		}
		$("#email1").attr("name", "fkform[1][email]");
		//$('.credit_menu li').not('.credit_menu .credit_active').hide();
		$('.credit_menu,.main,.form h2').hide();
		$('#main_anketa').css('margin-top','0');
		var m_method = "post";
		var m_action = "/index.php?option=com_fkfilkos&task=project.store";
		var m_data = $(this).serialize();
		$.ajax({
			type: m_method,
			url: m_action,
			data: m_data,
			beforeSend: function(){
				var formWrapper = $('<div/>').attr('id','formwrapper').appendTo('#main_anketa');
				formWrapper.css({
					'position':'absolute',
					'top':'0',
					'left':'0',
					'width':'100%',
					'height':'100%',
					'z-index':'8999',
					'background':'transparent'
				});
				var wrapgif = $('<div/>').attr('id','wrapgif').appendTo(formWrapper);
				wrapgif.css({
					'position':'absolute',
					'top':'0',
					'center':'0',
					'width':'100%',
					'height':'100%',
					'z-index':'9000',
					'background-image':'url("/templates/landing/img/sending.gif")',
					'background-repeat':'no-repeat',
					'background-position':'50% 36%'
				});
			},
			success: function(result){

				if (result == 'false') {
					$('#wrapgif').remove();
					//alert('Пожалуйста правильно заполните все поля!');
					document.location.reload();
					return false;
				};

				if(konvert_count == 1) {
					if(typeof ga != 'undefined'){ga("send","event","button","click","potreb");}
					if(typeof yaCounter != 'undefined'){var konvert_target = 'konvert_potreb';yaCounter.reachGoal(konvert_target);}
					konvert_count++;
				}

				$('#wrapgif').remove();
				$('#addr_area,.yes,.button').fadeOut(500);
				$(fieldstab).fadeOut(500, function(){
					$('#formwrapper').remove();
					$('.next').removeClass('send_button');
					$('.next').text('Далее');
					$('.button').fadeIn(500);
					$(this).fadeIn(500).html(result);
					$('html,body').animate({scrollTop: $("#main_anketa").offset().top},0);
					return false;
				});
			},
			error:function(){}
		});
	});

	$(document).on('click','.back', function(e){
		var fieldstab = $('#fieldtabs').children().filter(':visible');
		if (parseInt(fieldstab.length) !== 1) {
			document.location.reload();
			return false;
		};
		var inputs = fieldstab.find(':hidden').not(':disabled');
		var m_method = "post";
		var m_action = "/index.php?option=com_fkfilkos&task=project.stepback";
		var m_data = inputs.serialize();
		$.ajax({
			type: m_method,
			url: m_action,
			data: m_data,
			beforeSend: function(){
				var formWrapper = $('<div/>').attr('id','formwrapper').appendTo('#main_anketa');
				formWrapper.css({
					'position':'absolute',
					'top':'0',
					'left':'0',
					'width':'100%',
					'height':'100%',
					'z-index':'8999',
					'background':'transparent'
				});
				var wrapgif = $('<div/>').attr('id','wrapgif').appendTo(formWrapper);

				wrapgif.css({
					'position':'absolute',
					'top':'0',
					'center':'0',
					'width':'100%',
					'height':'100%',
					'z-index':'9000',
					'background-image':'url("/templates/landing/img/sending.gif")',
					'background-repeat':'no-repeat',
					'background-position':'50% 36%'
				});
				passTool.fadeOut();
				tooltipErr = true;
			},
			success: function(result){
				if (result == 'false') {
					//$('#wrapgif').remove();
					//alert('Пожалуйста правильно заполните все поля!');
					document.location.reload();
					return false;
				}
				$('#wrapgif').remove();
				$('.button').fadeOut(500);
				$(fieldstab).fadeOut(500, function(){
					$('#formwrapper').remove();
					$('.button').fadeIn(500);
					$(this).fadeIn(500).html(result);
					$('html,body').animate({scrollTop: $("#main_anketa").offset().top},0);
					return false;
				});
			},
			error:function(){}
		});
	});

	/*------------------------------------------------------------------------*/

	$(function () {
		$('[name="fkform[2][realty_city]"]').kladr({
			type: $.kladr.type.city
		});
	});

	/*------------------------------------------------------------------------*/

	$('#fieldform').on('change', '#code_region', function(){

		$('#nas_punkt').removeClass('validate').html('').parent('.field_wrap').fadeOut(500);

		if (parseInt($(this).val()) == 0) {

			$('#id_city').removeClass('validate').html('').parent('.field_wrap').fadeOut(500);

			return false;
		};

		var rid = $(this).val();
		var m_action = "/index.php?option=com_fkfilkos&task=addrobj.getaddrobjtowns&rid=" + rid;

		$.ajax({
			type: 'get',
			url: m_action,

			beforeSend: function(){

				if ($('#id_city').is(':visible')) {

					$('#id_city').selectedIndex = '-1';

				}else{

					$('#id_city').addClass('validate').parent('.field_wrap').fadeIn(500);
				}

			},
			success: function(result){

				if (result == 'novalues') {

					$('#nas_punkt').removeClass('validate').html('').parent('.field_wrap').fadeOut(500);
					var nocity = $('#code_region').find('option:selected').clone();

					$('#id_city').html(nocity);

				}else{

					$('#id_city').html(result).parent('.field_wrap').removeClass('focus_on');
					$('#id_city').selectedIndex = '-1';

				}

			},
			error:function(){}
		});

		$('#area_region').val($(this).find('option:selected').text());
		$('#area_code').val($(this).val());

	});


	$('#fieldform').on('change', '#id_city', function(){

		if($(this).val().substr(3, 3) != '000' && $(this).val().substr(6, 3) == '000'){

			var nkod = $(this).val();
			var m_action = "/index.php?option=com_fkfilkos&task=addrobj.getaddrobjnpunkts&nkod=" + nkod;

			$.ajax({
				type: 'get',
				url: m_action,

				beforeSend: function(){

					$('#nas_punkt').addClass('validate').parent('.field_wrap').fadeIn(500);

				},
				success: function(result){

					if (result == 'novalues') {

						$('#nas_punkt').removeClass('validate').html('').parent('.field_wrap').fadeOut(500);

					}else{

						$('#nas_punkt').html(result);
					}

				},
				error:function(){

					$('#nas_punkt').removeClass('validate').html('').parent('.field_wrap').fadeOut(500);
				}
			});


		}else{

			$('#nas_punkt').removeClass('validate').html('').parent('.field_wrap').fadeOut(500);
		}

		$('#area_city').val($(this).find('option:selected').text());
		$('#area_code').val($(this).val());
		$('#area_npunkt').val('');

	});

	$('#fieldform').on('change', '#nas_punkt', function(){
		$('#area_npunkt').val($(this).find('option:selected').text());
		$('#area_code').val($(this).val());
	});

	/*------------------------------------------------------------------------*/

	$(document).on("keyup","#potrebinn",function(){
		var $this = $(this);
		var innval = $this.val();
		var innvalLength = innval.length;
		var innmaxCount = 12;
		if(innvalLength>innmaxCount && $("#trud").val() == 5){
			$this.val($this.val().substring(0,innmaxCount));
			alert('ИНН для ИП максимум 12 цифр');
		}
	});

	$('#fieldform').on('change', '#trud', function(){
		if($(this).val() == 5 || $(this).val() == 4){
			$('#potrebinn').removeAttr('disabled').parent('.field_wrap').slideDown(500);
		}else{
			$('#potrebinn').attr('disabled', 'disabled').val('').parent('.field_wrap').slideUp(500);
		}
	});

	/*------------------------------------------------------------------------*/

	$('#fieldform').on('change', '#credit_history', function(){
		if($(this).val() == 4){$('#anticollector').removeAttr('disabled').parent('.field_wrap').slideDown(200);}
		else{$('#anticollector').attr('disabled', 'disabled').parent('.field_wrap').slideUp(200);}
	});

	/*------------------------------------------------------------------------*/

	(function(){

		var dt = {};

		$(document).on('click','a.icon-del', function(evt){

			evt.preventDefault();

			$(this).parent('div').fadeOut().fadeIn();

		});

		$('#fieldform').on('change',
			'\
            select[name="fkform[1][birth_day]"],\
            select[name="fkform[1][birth_month]"],\
            select[name="fkform[1][birth_year]"],\
            select[name="fkform[1][issueday]"],\
            select[name="fkform[1][issuemonth]"],\
            select[name="fkform[1][issueyear]"]\
            ',
			function(){

				var nm = $(this).attr('name').substring(10, $(this).attr('name').length-1);

				dt[nm] = $(this).val();

				if(
					dt.hasOwnProperty('issueyear') &&
					(
						dt.hasOwnProperty('issuemonth') &&
						dt.hasOwnProperty('issueday') &&
						dt.hasOwnProperty('birth_year') &&
						dt.hasOwnProperty('birth_month') &&
						dt.hasOwnProperty('birth_day')
					)


				){
					var cObj = $(this);
					var dage = new Date(dt['birth_year'], parseInt(dt['birth_month'])-1, dt['birth_day']);
					var dissue = new Date(dt['issueyear'], parseInt(dt['issuemonth'])-1, dt['issueday']);
					var dnow = new Date();

					var cAge = Math.floor((dnow.getTime() - dage.getTime())/(24*60*60*1000)/364.25);

					//console.log(cAge);

					if (cAge >= 14 && cAge < 20) {

						dage.setFullYear(parseInt(dt['birth_year'])+14);
						issueDiff(dissue.getTime(), dage.getTime());

					}else if (cAge >= 20 && cAge < 45) {

						dage.setFullYear(parseInt(dt['birth_year'])+20);
						issueDiff(dissue.getTime(), dage.getTime());

					}else if (cAge >= 45) {

						dage.setFullYear(parseInt(dt['birth_year'])+45);
						issueDiff(dissue.getTime(), dage.getTime());

					}else if(cAge < 14){

						noPass(cObj, "<span class='passport_date_error'>Неверно указана дата выдачи паспорта</span>");

					}else{

						passTool.fadeOut();
					}

				}

				function issueDiff(a1, a2){

					if (a1 < a2) {

						noPass(cObj, "<span class='passport_date_error'>Неверно указана дата выдачи паспорта</span>");

						tooltipErr = false;

					}else{

						passTool.fadeOut();

						tooltipErr = true;
					}

				}


				function noPass(obj, msg){

					passTool.fadeIn().html(msg);

				}

			});
	})();

});

