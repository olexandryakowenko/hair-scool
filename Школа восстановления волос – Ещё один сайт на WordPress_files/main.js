$(document).ready(function () {

var lang = window.location.href;

$('.mobile-wrap').on('click', function () {
    $('.line-burger').toggleClass('line-active');
    $('.main-header__list').slideToggle();
});

$(window).resize(function () {
    if ($(window).width() >= 780) {
        $('.main-header__list').attr('style', '');
        $('.line-burger').removeClass('line-active');
    }
    winWidth = $(window).width();
});

$('.main-header__button button').on('click', function (e) {
    $('.main-header__input').trigger('focus');
    $('.main-header__search').addClass('main-header__search-active');
});

$('html').on('click', function (e) {
    if (!$(e.target).is('.main-header__button button, .main-header__input, main-header__search-wrap, main-header__search-wrap, main-header__search-btn')) {
        $('.main-header__search').removeClass('main-header__search-active');
    }
});


$('.slider-main').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    fade: false,
    infinite: true,
    prevArrow: '<button type="button" class="slick-prev"></button>',
    nextArrow: '<button type="button" class="slick-next"></button>',
    responsive: [
        {
            breakpoint: 1100,
            settings: {
                slidesToShow: 2
            }
        },
        {
            breakpoint: 780,
            settings: {
                slidesToShow: 1
            }
        },
    ]
});

$('.product-slider').slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    fade: false,
    infinite: true,
    prevArrow: '<button type="button" class="slick-prev"></button>',
    nextArrow: '<button type="button" class="slick-next"></button>',
    responsive: [
        {
            breakpoint: 1200,
            settings: {
                slidesToShow: 3
            }
        },
        {
            breakpoint: 960,
            settings: {
                slidesToShow: 2
            }
        },
        {
            breakpoint: 650,
            settings: {
                slidesToShow: 1
            }
        },
    ]
});


$('.btn--arrow').on('click', function() {
    $(this).toggleClass('btn--arrow__active').next().slideToggle();
});

function singleSliders(selector_1, selector_2, overlay) {
    $(selector_1).slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: false,
        draggable: false,
        touchMove: false,
        asNavFor: selector_2,
    });

    $(selector_2).slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: selector_1,
        dots: false,
        centerMode: false,
        focusOnSelect: true,
        prevArrow: '<button type="button" class="slick-prev"></button>',
        nextArrow: '<button type="button" class="slick-next"></button>',
        responsive: [
            {
                breakpoint: 960,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 780,
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 560,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 450,
                settings: {
                    slidesToShow: 2
                }
            }
        ]
    });

    $(overlay + ' .overlay-slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        fade: false,
        infinite: true,
        prevArrow: '<button type="button" class="slick-prev"></button>',
        nextArrow: '<button type="button" class="slick-next"></button>',
    });
    
    $('.single__slide').on('click', function() {
        var currentSlide = $(selector_1).slick('slickCurrentSlide');
        $(overlay + ' .overlay-slider').slick('slickGoTo', currentSlide, true);
        $(overlay).addClass('overlay-active');
    });
}

singleSliders('.single__slider--main', '.single__slider--small', '.overlay-img');

$('.gallery__item--img').on('click', function() {
    var currentSlide = $(this).data('index');
    $('.overlay-img .overlay-slider').slick('slickGoTo', currentSlide, true);
    $('.overlay-img').addClass('overlay-active');
});

function validate(input, length, regExp, error, phone) {

    $(input).on('blur keyup', function () {
        var value = $(this).val();
        var that = $(this);

        regExp = regExp == '' ? /./ : regExp;

        if (phone === true) {
            bool_reg = !regExp.test(value);
        } else {
            bool_reg = regExp.test(value);
        }

        if (value.length > length && value !== '' && bool_reg) {
            that.removeClass('form-fail').addClass('form-done');
            $(error).slideUp();
        } else {
            that.removeClass('form-done').addClass('form-fail');
            $(error).slideDown();
        }
    });
};

// деакцивация кнопки если есть поле с ошибкой

function disBtn(input, btn) {
    var input = $(input);
    input.on('blur keyup', function () {

        if (input.hasClass('form-fail')) {
            $(btn).attr('disabled', 'disabled');
        } else {
            $(btn).removeAttr('disabled');
        }

    });
};

// для проверки при нажатии

function valClick(input, length, regExp, error, btn, phone) {
    var value = $(input).val();

    regExp = regExp == '' ? /./ : regExp;

    if (phone === true) {
        bool_reg = regExp.test(value);
    } else {
        bool_reg = !regExp.test(value);
    }

    if (value.length < length && value === '' && bool_reg) {
        $(input).addClass('form-fail');
        $(error).slideDown();
    }
};

//  деакцивация кнопки при нажатии

function disBtnClick(input, btn) {
    var input = $(input);

    if (input.hasClass('form-fail')) {
        $(btn).attr('disabled', 'disabled');
        return false;
    } else {
        return true;
    }

};

var regName = /^[a-zA-Zа-яА-ЯёЁ]+/;
var regPhone = /[_]/i;
var regEmail = /[-.\w]+@[-.\w]+\.[-.\w]+/i;

$('input[type="tel"]').mask("+38 (999) 999-99-99");

// пример использования
validate('#c_name', 1, regName, '.contacts__fail-name');
validate('#c_phone', 1, regPhone, '.contacts__fail-phone', true);
disBtn('#c_name, #c_phone', '#contacts_submit');

$('#contacts_submit').on('click', function() {
    var name = $('#c_name').val();
    var phone = $('#c_phone').val();
    var msg = $('#c_msg').val();

    valClick('#c_name', 1, regName, '.contacts__fail-name');
    valClick('#c_phone', 1, regPhone, '.contacts__fail-phone', true);
    var btn_bool = disBtnClick('#c_name, #c_phone', '#contacts_submit');

    if( btn_bool ) {
        $.ajax({
            url: myajax.url,
            type: 'POST',
            data: {
                action: 'contact',
                name: name,
                phone: phone,
                msg: msg,
            },
        }).done(function(data) {
            $('.contacts__row input, .contacts__row textarea').val('').removeClass('form-done');
            
            if(lang.indexOf('/ua/') !== -1) {
                var text = "Ваше повідомлення успішно відправлено!"; 
            } else {
                var text = "Ваше сообщение успешно отправлено!";  
            }

            $('.msg-modal').html(text).addClass('msg-modal-active');
            setTimeout(function() {
                $('.msg-modal').removeClass('msg-modal-active');
            }, 2500); 
        });
    }
    return false;
});

validate('#order_name', 1, regName, '.order__fail-name');
validate('#order_phone', 1, regPhone, '.order__fail-phone', true);
validate('#order_email', 1, regEmail, '.order__fail-email');
disBtn('#order_name, #order_phone, #order_email', '#order_btn');

$('#order_btn').on('click', function() {
    var name = $('#order_name').val();
    var phone = $('#order_phone').val();
    var email = $('#order_email').val();

    valClick('#order_name', 1, regName, '.order__fail-name');
    valClick('#order_phone', 1, regPhone, '.order__fail-phone', true);
    valClick('#order_email', 1, regEmail, '.order__fail-email');
    var btn_bool = disBtnClick('#order_name, #order_phone, #order_email', '#order_btn');

    if( btn_bool ) {
        $.ajax({
            url: myajax.url,
            type: 'POST',
            data: {
                action: 'order',
                name: name,
                phone: phone,
                email: email,
            },
        }).done(function(data) {
            $('.inner__wrap input').val('').removeClass('form-done');

            $('.basket__prod').slideUp(function() {
                $(this).detach();
                sumBasket();
            });
            
            if(lang.indexOf('/ua/') !== -1) {
                var text = 'Ваше замовлення успішно надіслано!';  
            } else {
                var text = "Ваш заказ успешно отправлен!";  
            }

            $('.msg-modal').html(text).addClass('msg-modal-active');
            setTimeout(function() {
                $('.msg-modal').removeClass('msg-modal-active');
            }, 2500); 
        });
    }
    return false;
});

// basket
function quantityBtn(selector, name) {
    $('body').on('click', selector, function(e) {
        e.preventDefault();
        var self = $(this).parents('.basket__item');
        var count = self.find('.basket__value span');
        var price = parseInt( self.find('.basket__single span').text().replace(/ /g, '') );
        var el_sum = self.find('.js_sum span');
        var quantity_old = parseInt( count.text().replace(/ /g, '') );
        var quantity = quantity_old;

        if( $(this).hasClass('basket__increment') ) {
            quantity = quantity_old + 1;
        }

        if( $(this).hasClass('basket__decrement') && quantity_old !== 1 ) {
            quantity = quantity_old - 1;
        }

        var sum = price * quantity;

        el_sum.html(sum);
        count.text(quantity);
        sumBasket();
    });

    
}
quantityBtn('.basket__arrow', 'equipment');

function sumBasket() {
    var sum = 0;
    $('.js_sum span').each(function() {
        sum += parseInt( $(this).html().replace(/ /g, '') );
    });
    $('.basket__count').html(sum.toFixed(2));
}

// basket
$('body').on('click', '.js_add_basket', function(e) {
    e.preventDefault();
    
    var self = $(this);
    var id = $(this).data('id');
    var title = $(this).data('title');
    var quantity = 1;

    $.ajax({
        url: myajax.url,
        type: 'POST',
        data: {
            action: 'add_basket',
            id: id,
            quantity: quantity
        },
    }).done(function(data) {
        var obj = JSON.parse(data);
        var text = 'Товар ' + title + ' добавлен в корзину';
        var text_attr = 'Товар уже в корзине!';

        $('.main-header__basket').addClass('header__icon--active');
        
        $('.single__content .js_add_basket').hide();
        $('.single__content .js_delete_basket').show();

        if(self.hasClass('product__item--icon')) {
            self.addClass('product__item--icon__active').attr('title', text_attr);
        }
        
        $('.msg-modal').html(text).addClass('msg-modal-active');
        setTimeout(function() {
            $('.msg-modal').removeClass('msg-modal-active');
        }, 2500); 
    });
});

$('body').on('click', '.js_delete_basket', function(e) {
    e.preventDefault();

    var self = $(this);
    var id = $(this).data('id');
    var title = $(this).data('title');       

    $.ajax({
        url: myajax.url,
        type: 'POST',
        data: {
            action: 'delete_basket',
            id: id,
        },
    }).done(function(data) {
        var obj = JSON.parse(data);
        var text = 'Товар ' + title + ' удален из корзины';

        $('.main-header__basket').removeClass('header__icon--active');

        if( $('.basket').length > 0 ) {
            self.parents('.basket__prod').slideUp(function() {
                $(this).detach();
                sumBasket();
            });
        }

        $('.single__content .js_add_basket').show();
        $('.single__content .js_delete_basket').hide();
        
        $('.msg-modal').html(text).addClass('msg-modal-active');
        setTimeout(function() {
            $('.msg-modal').removeClass('msg-modal-active');
        }, 2500); 
    });

});

$('body').on('click', '.basket__arrow', function() {
    var id = $(this).data('id'); 
    var quantity = $(this).parents('.basket__wrap-arrow').find('.basket__value span').text();

    $.ajax({
        url: myajax.url,
        type: 'POST',
        data: {
            action: 'change_basket',
            id: id,
            quantity: quantity
        },
    }).done(function(data) {

    });
});

// favorites
$('body').on('click', '.js_add_favorites', function(e) {
    e.preventDefault();
    
    var self = $(this);
    var id = $(this).data('id');
    var title = $(this).data('title');

    $.ajax({
        url: myajax.url,
        type: 'POST',
        data: {
            action: 'add_favorites',
            id: id,
        },
    }).done(function(data) {
        var obj = JSON.parse(data);
        var text = 'Товар ' + title + ' добавлен в избранное';
        var text_attr = 'Товар уже в избранном!';

        $('.main-header__favorites').addClass('header__icon--active');

        $('.single__content .js_add_favorites').hide();
        $('.single__content .js_delete_favorites').show();

        if(self.hasClass('product__item--icon')) {
            self.addClass('product__item--icon__active').attr('title', text_attr);
        }
        
        $('.msg-modal').html(text).addClass('msg-modal-active');
        setTimeout(function() {
            $('.msg-modal').removeClass('msg-modal-active');
        }, 2500); 
    });
});

$('body').on('click', '.js_delete_favorites', function(e) {
    e.preventDefault();

    var self = $(this);
    var id = $(this).data('id');
    var title = $(this).data('title');       

    $.ajax({
        url: myajax.url,
        type: 'POST',
        data: {
            action: 'delete_favorites',
            id: id,
        },
    }).done(function(data) {
        var obj = JSON.parse(data);
        var text = 'Товар ' + title + ' удален из избранных';

        $('.main-header__favorites').removeClass('header__icon--active');

        $('.single__content .js_add_favorites').show();
        $('.single__content .js_delete_favorites').hide();

        self.parents('.product__item').fadeOut(function() {
            $(this).detach();
        });
        
        $('.msg-modal').html(text).addClass('msg-modal-active');
        setTimeout(function() {
            $('.msg-modal').removeClass('msg-modal-active');
        }, 2500); 
    });

});

$('body').on('click', '.product__item--search', function(e) {
    e.preventDefault();
    var id = $(this).data('id');

    $.ajax({
        url: myajax.url,
        type: 'POST',
        data: {
            action: 'view',
            id: id,
        },
    }).done(function(data) {
        var obj = JSON.parse(data);

        var htmlItem = '';

        var style_add_basket = obj.prod.is_basket == true ? ' style="display: none;"' : '';
        var style_delete_basket = obj.prod.is_basket == true ? '': ' style="display: none;"'; 
        var style_add_fav = obj.prod.is_favorites == true ? ' style="display: none;"' : '';
        var style_delete_fav = obj.prod.is_favorites == true ? '': ' style="display: none;"'; 
        var btn_attr = 'data-id="' + obj.prod.id + '" data-title="' + obj.prod.title + '"';

        if(lang.indexOf('/ua/') !== -1) {
            var add_basket = "Додати в кошик"; 
            var delete_basket = "Видалити з кошика";
            var add_fav = "Додати в обране"; 
            var delete_fav = "Видалити з вибраного";
        } else {
            var add_basket = "Добавить в корзину"; 
            var delete_basket = "Удалить из коризны"; 
            var add_fav = "Добавить в избранное"; 
            var delete_fav = "Удалить из избранного";
        }

        var html_gal = '';
        var html_gal_small = '';
        var html_gal_overlay = '';
        for(var i = 0; i < obj.prod.gallery.length; i++) {
            html_gal += '<div class="single__slide"><img src="' + obj.prod.gallery[i] + '" alt="' + obj.prod.title + '"></div>';
            html_gal_small += '<div class="single__slide--small"><img src="' + obj.prod.gallery[i] + '" alt="' + obj.prod.title + '"></div>';
            html_gal_overlay += '<div class="overlay-slider_img"><img src="' + obj.prod.gallery[i] + '" alt="' + obj.prod.title + '"></div>';
        }

        htmlItem += '<div class="single__slider">';
        if(obj.prod.gallery.length > 0) {
            htmlItem += '<div class="single__slider--main">' + html_gal + '</div>';
            htmlItem += '<div class="single__slider--small">' + html_gal_small + '</div>';
        } else {
            htmlItem += '<div class="single__img"><img src="' + obj.prod.img + '" alt="' + obj.prod.title + '"></div>';
        }
        htmlItem += '</div><div class="single__content">';
        htmlItem += '<h2 class="single__title">' + obj.prod.title + '</h2>';
        htmlItem += '<div class="single__product"><div class="single__price">' + obj.prod.price + ' грн</div>';
        htmlItem += '<button class="button single__btn js_add_basket" ' + style_add_basket + ' ' + btn_attr + '>' + add_basket + '</button>';
        htmlItem += '<button class="button single__btn js_delete_basket" ' + style_delete_basket + ' ' + btn_attr + '>' + delete_basket + '</button></div>';
        htmlItem += '<button class="button single__favorites js_add_favorites" ' + style_add_fav + ' ' + btn_attr + '><svg viewBox="0 0 512 512"><use xlink:href="#icon-heart" /></svg><span>' + add_fav + '</span></button>';
        htmlItem += '<button class="button single__favorites js_delete_favorites" ' + style_delete_fav + ' ' + btn_attr + '><svg viewBox="0 0 512 512"><use xlink:href="#icon-heart" /></svg><span>' + delete_fav + '</span></button>';
        htmlItem += '<div class="single__text">' + obj.prod.content + '</div></div>';
    
        $('.inner-prod .single__container').html(htmlItem); 
        $('.overlay-view-img .overlay-slider').html(html_gal_overlay); 
        singleSliders('.overlay-prod .single__slider--main', '.overlay-prod .single__slider--small', '.overlay-view-img');
        $('.overlay-prod').addClass('overlay-active');
    });
    
});

$('.overlay-close').click(function () {
    $(this).parents('.overlay').removeClass('overlay-active');
    if( $(this).parents('.overlay').is('.overlay-prod') ) {
        $('.inner-prod .single__container').html('');
        $('.overlay-view-img .overlay-slider').html('');
        $('.overlay-prod .single__slider--main, .overlay-prod .single__slider--small, .overlay-view-img .overlay-slider').slick('unslick');
    }
});

});

const checker = document.getElementById('helper');

checker.addEventListener('click',(event) => {
    event.preventDefault();
    ContactForm()
});

function ContactForm() {
    const form = document.getElementById('modalForm');
    const formClasses = form.classList;

    if (formClasses.contains('helper__form--default')) {
        form.classList.replace('helper__form--default', 'helper__form--opening');
    } else 

    if (formClasses.contains('helper__form--opening')) {
        form.classList.replace('helper__form--opening', 'helper__form--closing');
    } else 

    if (formClasses.contains('helper__form--closing')) {
        form.classList.replace('helper__form--closing', 'helper__form--opening');
    }
}