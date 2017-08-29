$(function() {


    var coverPrice = false;
    function getSumm() {
        if (consultant == 'max' && !coverPrice) {
            coverPrice = true;
            myscroll.stop();
            var $el = $('<div/>', {
                css: {
                    width: '402px',
                    height: '375px'
                },
                html: $('#callpy_vip_box').html(),
                id: 'callpy_vip_box_wr'
            }).addClass('callpy_default_box').addClass('callpy_default_box_gradient');

            $(document.body).append($el);

            var $wr = $('<div/>', {
                "id": "callpy_blur_wrapper"
            }).addClass('callpy_blur_wrapper');

            $(document.body).append($wr);

            $wr.on('click', function() {
                coverPrice = false;
                $(this).remove();
                $el.remove();

                myscroll.start();

                consultant = 20;
                sliderConsultant.slider("option", "value", sliderKeysConsultant[3]);
                getSumm();
            });
        }

        var price_of_consultant = (price_of_consultant_in_month[consultant] * month_of * discount_of_month[month_of]) / consultant / month_of;
        var height = 17 + ((price_of_consultant - 216) / 634) * 86;
        var font = 27 - ((price_of_consultant - 216) / 634) * 11;
        var height_discount = 0;
        if (discount_of_month_text[month_of] > 0) {
            height_discount = 23 + (((discount_of_month_text[month_of] - 10) / 40)) * 19;
        }
        var font_discount = 16 + (discount_of_month_text[month_of] / 40) * 11;
        var height_discount_box = 103 - height_discount;



        $('.tarif_row_summ_discount').css({
            height: height_discount,
            lineHeight: height_discount + 'px',
            fontSize: font_discount
        });
        $('.tarif_row_summ_discount > span').html('-' + discount_of_month_text[month_of] + '%');

        $('.tarif_row_summ_body_summ').css('height', height_discount_box);


        $('#price_of_consultant').html(price_of_consultant);
        $('#price_of_consultant_height').css('height', height);
        $('#price_of_consultant_font').css('font-size', font);
        $('#summ_of_all').html(price_of_consultant_in_month[consultant] * month_of * discount_of_month[month_of]);

        //Сумма на кнопке в админке
        if( $('#admin_pay_sum_of_all_special').length > 0 ){
            $('#admin_pay_sum_of_all_special').html(price_of_consultant_in_month[consultant] * month_of * discount_of_month[month_of] + ' &#8381;');
            $('#admin_pay_sum_of_all_special').text($('#admin_pay_sum_of_all_special').text().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));
        }


        var text_month_of, text_consultant;

        if (month_of == 1) text_month_of = month_of + ' '+"חודש";
        else if (month_of == 3) text_month_of = month_of + ' '+"בחודש";
        else {
            text_month_of = month_of + ' '+"חודשים";
        }

        if (consultant == 1) text_consultant = consultant + ' '+"יועץ";
        else if (consultant == 3) text_consultant = consultant + ' '+"של יועץ";
        else text_consultant = consultant + ' '+"יועצים";

        $('#text_price_month').html(text_month_of);
        $('#text_price_consultant').html(text_consultant);
    }

    var sliderKeysConsultant = [2, 17, 48, 79, 99];
    var sliderValueConsultant = {
        2: 1,
        17: 3,
        48: 5,
        79: 20,
        99: 'max'
    };
    var sliderKesMonth = [2, 24, 48, 73, 99];
    var sliderValueMonth = {
        2: 1,
        24: 3,
        48: 6,
        73: 9,
        99: 12
    };

    var price_of_consultant_in_month = {
        1: 850,
        3: 1650,
        5: 2200,
        20: 7200
    };

    var discount_of_month = {
        1: 1, //1
        3: 0.9, //0,9
        6: 0.8, // 0,8
        9: 0.7, //0,7
        12: 0.6 //0,6
    };
    var discount_of_month_text = {
        1: 0, //0
        3: 10, //10
        6: 20, //20
        9: 30, //30
        12: 40
    };

    var consultant = 5;
    var month_of = 3;

    var sliderConsultant = $('#slider-consultant-range');

    sliderConsultant.slider({
        value: sliderKeysConsultant[2],
        min: 1,
        max: 100,
        step: 1,
        slide: function(event, ui) {
            //if(sliderKeysConsultant.indexOf(ui.value) === -1) {
            if (ui.value <= 10) {
                sliderConsultant.slider("option", "value", sliderKeysConsultant[0]);
                consultant = sliderValueConsultant[sliderKeysConsultant[0]];
                getSumm();
                return false;
            }
            else if (ui.value <= 32) {
                sliderConsultant.slider("option", "value", sliderKeysConsultant[1]);
                consultant = sliderValueConsultant[sliderKeysConsultant[1]];
                getSumm();
                return false;
            }
            else if (ui.value <= 63) {
                sliderConsultant.slider("option", "value", sliderKeysConsultant[2]);
                consultant = sliderValueConsultant[sliderKeysConsultant[2]];
                getSumm();
                return false;
            }
            else {
                sliderConsultant.slider("option", "value", sliderKeysConsultant[3]);
                consultant = sliderValueConsultant[sliderKeysConsultant[3]];
                getSumm();
                return false;
            }
            /*else {
                sliderConsultant.slider("option", "value", sliderKeysConsultant[4]);
                consultant = sliderValueConsultant[sliderKeysConsultant[4]];
                getSumm();
                return false;
            }*/
            //}
        },
        stop: function() {

        }
    });

    var sliderMonth = $('#slider-month-range');
    //
    sliderMonth.slider({
        value: sliderKesMonth[1],
        min: 1,
        max: 100,
        step: 1,
        slide: function(event, ui) {

            //if(sliderKesMonth.indexOf(ui.value) === -1) {
            if (ui.value <= 13) {
                sliderMonth.slider("option", "value", sliderKesMonth[0]);
                month_of = sliderValueMonth[sliderKesMonth[0]];
                getSumm();
                return false;
            }
            else if (ui.value <= 36) {
                sliderMonth.slider("option", "value", sliderKesMonth[1]);
                month_of = sliderValueMonth[sliderKesMonth[1]];
                getSumm();
                return false;
            }
            else if (ui.value <= 60) {
                sliderMonth.slider("option", "value", sliderKesMonth[2]);
                month_of = sliderValueMonth[sliderKesMonth[2]];
                getSumm();
                return false;
            }
            else if (ui.value <= 86) {
                sliderMonth.slider("option", "value", sliderKesMonth[3]);
                month_of = sliderValueMonth[sliderKesMonth[3]];
                getSumm();
                return false;
            }
            else {
                sliderMonth.slider("option", "value", sliderKesMonth[4]);
                month_of = sliderValueMonth[sliderKesMonth[4]];
                getSumm();
                return false;
            }
        }
    });

    $('.slider-month-text').click(function() {
        var t = $(this);
        for (var k in sliderValueMonth) {
            if (sliderValueMonth[k] == parseInt(t.text())) {
                sliderMonth.slider("option", "value", k);
                month_of = sliderValueMonth[k];
                getSumm();
            }
        }
    });

    $('.slider-consultant-text').click(function() {
        var t = $(this);
        var text = t.text();
        if (t.text() == 'VIP') return;
        else text = parseInt(text);
        for (var k in sliderValueConsultant) {
            if (sliderValueConsultant[k] == text) {
                sliderConsultant.slider("option", "value", k);
                consultant = sliderValueConsultant[k];
                getSumm();
            }
        }
    });
});