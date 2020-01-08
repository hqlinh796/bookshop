
(function ($) {
    "use strict";
    /*[ Load page ]
    ===========================================================*/
    $(".animsition").animsition({
        inClass: 'fade-in',
        outClass: 'fade-out',
        inDuration: 1500,
        outDuration: 800,
        linkElement: '.animsition-link',
        loading: true,
        loadingParentElement: 'html',
        loadingClass: 'animsition-loading-2',
        loadingInner: '<div class="loader05"></div>',
        timeout: false,
        timeoutCountdown: 5000,
        onLoadEvent: true,
        browser: ['animation-duration', '-webkit-animation-duration'],
        overlay: false,
        overlayClass: 'animsition-overlay-slide',
        overlayParentElement: 'html',
        transition: function (url) { window.location.href = url; }
    });

    /*[ Back to top ]
    ===========================================================*/
    var windowH = $(window).height() / 2;

    $(window).on('scroll', function () {
        if ($(this).scrollTop() > windowH) {
            $("#myBtn").css('display', 'flex');
        } else {
            $("#myBtn").css('display', 'none');
        }
    });

    $('#myBtn').on("click", function () {
        $('html, body').animate({ scrollTop: 0 }, 300);
    });


    /*==================================================================
    [ Fixed Header ]*/
    var headerDesktop = $('.container-menu-desktop');
    var wrapMenu = $('.wrap-menu-desktop');

    if ($('.top-bar').length > 0) {
        var posWrapHeader = $('.top-bar').height();
    }
    else {
        var posWrapHeader = 0;
    }


    if ($(window).scrollTop() > posWrapHeader) {
        $(headerDesktop).addClass('fix-menu-desktop');
        $(wrapMenu).css('top', 0);
    }
    else {
        $(headerDesktop).removeClass('fix-menu-desktop');
        $(wrapMenu).css('top', posWrapHeader - $(this).scrollTop());
    }

    $(window).on('scroll', function () {
        if ($(this).scrollTop() > posWrapHeader) {
            $(headerDesktop).addClass('fix-menu-desktop');
            $(wrapMenu).css('top', 0);
        }
        else {
            $(headerDesktop).removeClass('fix-menu-desktop');
            $(wrapMenu).css('top', posWrapHeader - $(this).scrollTop());
        }
    });


    /*==================================================================
    [ Menu mobile ]*/
    $('.btn-show-menu-mobile').on('click', function () {
        $(this).toggleClass('is-active');
        $('.menu-mobile').slideToggle();
    });

    var arrowMainMenu = $('.arrow-main-menu-m');

    for (var i = 0; i < arrowMainMenu.length; i++) {
        $(arrowMainMenu[i]).on('click', function () {
            $(this).parent().find('.sub-menu-m').slideToggle();
            $(this).toggleClass('turn-arrow-main-menu-m');
        })
    }

    $(window).resize(function () {
        if ($(window).width() >= 992) {
            if ($('.menu-mobile').css('display') == 'block') {
                $('.menu-mobile').css('display', 'none');
                $('.btn-show-menu-mobile').toggleClass('is-active');
            }

            $('.sub-menu-m').each(function () {
                if ($(this).css('display') == 'block') {
                    console.log('hello');
                    $(this).css('display', 'none');
                    $(arrowMainMenu).removeClass('turn-arrow-main-menu-m');
                }
            });

        }
    });


    /*==================================================================
    [ Show / hide modal search ]*/
    $('.js-show-modal-search').on('click', function () {
        $('.modal-search-header').addClass('show-modal-search');
        $(this).css('opacity', '0');
    });

    $('.js-hide-modal-search').on('click', function () {
        $('.modal-search-header').removeClass('show-modal-search');
        $('.js-show-modal-search').css('opacity', '1');
    });

    $('.container-search-header').on('click', function (e) {
        e.stopPropagation();
    });


    /*==================================================================
    [ Isotope ]*/
    var $topeContainer = $('.isotope-grid');
    var $filter = $('.filter-tope-group');

    // filter items on button click
    $filter.each(function () {
        $filter.on('click', 'button', function () {
            var filterValue = $(this).attr('data-filter');
            $topeContainer.isotope({ filter: filterValue });
        });

    });

    // init Isotope
    $(window).on('load', function () {
        var $grid = $topeContainer.each(function () {
            $(this).isotope({
                itemSelector: '.isotope-item',
                layoutMode: 'fitRows',
                percentPosition: true,
                animationEngine: 'best-available',
                masonry: {
                    columnWidth: '.isotope-item'
                }
            });
        });
    });

    var isotopeButton = $('.filter-tope-group button');

    $(isotopeButton).each(function () {
        $(this).on('click', function () {
            for (var i = 0; i < isotopeButton.length; i++) {
                $(isotopeButton[i]).removeClass('how-active1');
            }

            $(this).addClass('how-active1');
        });
    });

    /*==================================================================
    [ Filter / Search product ]*/
    $('.js-show-filter').on('click', function () {
        $(this).toggleClass('show-filter');
        $('.panel-filter').slideToggle(400);

        if ($('.js-show-search').hasClass('show-search')) {
            $('.js-show-search').removeClass('show-search');
            $('.panel-search').slideUp(400);
        }
    });

    $('.js-show-search').on('click', function () {
        $(this).toggleClass('show-search');
        $('.panel-search').slideToggle(400);

        if ($('.js-show-filter').hasClass('show-filter')) {
            $('.js-show-filter').removeClass('show-filter');
            $('.panel-filter').slideUp(400);
        }
    });




    /*==================================================================
    [ Cart ]*/
    $(document).on('click', '.js-show-cart', function () {
        $('.js-panel-cart').addClass('show-header-cart');
    })
    $(document).on('click', '.js-hide-cart', function () {
        $('.js-panel-cart').removeClass('show-header-cart');
    })

    /*==================================================================
    [ Cart ]*/
    $('.js-show-sidebar').on('click', function () {
        $('.js-sidebar').addClass('show-sidebar');
    });

    $('.js-hide-sidebar').on('click', function () {
        $('.js-sidebar').removeClass('show-sidebar');
    });

    /*==================================================================
    [ +/- num product ]*/
    $('.btn-num-product-down').on('click', function () {
        var numProduct = Number($(this).next().val());
        if (numProduct == 1)
            return false;
        $(this).next().val(numProduct - 1);
        //change total of product
        //const total = $(this).parent().parent().next().text().slice(0, -2);

        const price = $(this).parent().parent().prev().text().slice(0, -2);
        const totalPrice = $('#totalPrice').children().text().slice(0, -2);
        
        const tempTotalPrice = totalPrice - price;

        $('#totalPrice').html('<b>' + tempTotalPrice + ' ₫<b>');
        $('.total-price-of-list').html(tempTotalPrice + ' ₫');
        $('.priceTemp').html(tempTotalPrice + ' ₫');
        const idProduct = $(this).parent().parent().parent().attr('id');
        $.ajax({
            url: '/descrease-product',
            method: 'PUT',
            data: {
                id: idProduct
            },
            success: function (data, status) {
                console.log(status);
            }
        })
    });

    $('.btn-num-product-up').on('click', function () {
        var numProduct = Number($(this).prev().val());
        $(this).prev().val(numProduct + 1);
        //const total = parseInt($(this).parent().parent().next().text().slice(0, -2));
        const price = parseInt($(this).parent().parent().prev().text().slice(0, -2));

        const totalPrice = parseInt($('#totalPrice').children().text().slice(0, -2));
        const tempTotalPrice = totalPrice + price;
        $('#totalPrice').html('<b>' + tempTotalPrice + ' ₫<b>');
        $('.total-price-of-list').html(tempTotalPrice + ' ₫');
        $('.priceTemp').html(tempTotalPrice + ' ₫');
        
        const idProduct = $(this).parent().parent().parent().attr('id');
        $.ajax({
            url: '/increase-product',
            method: 'PUT',
            data: {
                id: idProduct
            },
            success: function (data, status) {
                console.log(status);
            }
        })
    });

    /*==================================================================
    [ Rating ]*/
    $('.wrap-rating').each(function () {
        var item = $(this).find('.item-rating');
        var rated = -2;
        var input = $(this).find('input');
        $(input).val(0);

        $(item).on('mouseenter', function () {
            var index = item.index(this);
            var i = 0;
            for (i = 0; i <= index; i++) {
                $(item[i]).removeClass('zmdi-star-outline');
                $(item[i]).addClass('zmdi-star');
            }

            for (var j = i; j < item.length; j++) {
                $(item[j]).addClass('zmdi-star-outline');
                $(item[j]).removeClass('zmdi-star');
            }
        });

        $(item).on('click', function () {
            var index = item.index(this);
            rated = index;
            $(input).val(index + 1);
        });

        $(this).on('mouseleave', function () {
            var i = 0;
            for (i = 0; i <= rated; i++) {
                $(item[i]).removeClass('zmdi-star-outline');
                $(item[i]).addClass('zmdi-star');
            }

            for (var j = i; j < item.length; j++) {
                $(item[j]).addClass('zmdi-star-outline');
                $(item[j]).removeClass('zmdi-star');
            }
        });
    });

    /*==================================================================
    [ Show modal1 ]*/
    $('.js-show-modal1').on('click', function (e) {
        e.preventDefault();
        $('.js-modal1').addClass('show-modal1');
    });

    $('.js-hide-modal1').on('click', function () {
        $('.js-modal1').removeClass('show-modal1');
    });


    //

    $(document).ready(function () {
        let name = $('#name-order');
        let phone = $('#phone-order');
        let address = $('#address-order');
        let error = $('.txt-err.err-in-form');
        
        name.click(function () {
            error.removeClass('show-err');
        })
        phone.click(function () {
            error.removeClass('show-err');
        })
        address.click(function () {
            error.removeClass('show-err');
        })
        $('.update-address').click(function (e) {
            //validate input

            e.preventDefault();
            
            const err = validateOrderInput(name.val(), phone.val(), address.val());
            
            if (err != '') {
                
                error.text(err);
                if (!error.hasClass('show-err'))
                    error.addClass('show-err');
                return false;
            }
            //update address
            $.post({
                url: '/update-order-address',
                data: {
                    name: name.val(),
                    phone: phone.val(),
                    address: address.val()
                },
                success: function (data, status) {
                    $('.name-label').text(data.name);
                    $('.phone-label').text(data.phone);
                    $('.address-label').text(data.address);
                    location.reload();
                }
            })

        })

        


        $('button#checkout').click(function () {
            const nameLabel = $('.name-label').text();
            const phoneLabel = $('.phone-label').text();
            const addressLabel = $('.address-label').text();
            const feeShipping = $('#fee-shipping').text().slice(0, -2);
            const shipping = $('.button-selected.button-shipping').text();
            const payment = $('.button-payment.button-selected').text();
            
            const err = validateOrderInput(nameLabel, phoneLabel, addressLabel);
            if (err != ''){
                alert("Kiểm tra thông tin người nhận");
                return false;
            }
            $.post({
                url: '/checkout',
                data: {
                    name: nameLabel,
                    phone: phoneLabel,
                    address: addressLabel,
                    payment: payment,
                    shipping: shipping,
                    feeShipping, feeShipping
                },
                success: function (data, status) {
                    window.location.href = '/';
                }
            })
        })

        function isFullName(name) {
            const regex = /^(([àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđa-z]{2,})[\s]{1,}){2,}$/i;
            return regex.test(name + " ");
        }

        function validateOrderInput(name, phone, address) {
            if (!name || !phone || !address) {
                return '*Nhập đầy đủ thông tin';
            }
            if (!isFullName(name)) {
                return '*Họ tên không đúng';
                
            }
    
            if (isNaN(phone) || phone.length != 10) {
               return '*Số điện thoại không hợp lệ';
                
            }
            return '';
        }
    })


    //show quickly
    $(document).ready(function () {
        $('.btn-show-quickly').click(function () {
            const id = $(this).parent().parent().parent().attr('id');
            
            $.get("/show-quickly", { idValue: id }, function (data, status) {
                $('#popUp').html(data);
                //action for arrow
                //run after render popup
            });
        });

    });


    //ADD to CART
    $(document).ready(function () {
        $('.addToCart').click(function (e) {
            e.preventDefault();
            let id = $(this).parent().parent().parent().parent().attr('id');
            if (!id) {
                let searchParams = new URLSearchParams(window.location.search);
                id = searchParams.get('id');
            }
            $.post(
                '/add-to-cart',
                { id: id },
                function (data, status) {
                    var html = '<div class="icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11 icon-header-noti js-show-cart" data-notify="' + data.totalQuantity + '"><a href="/shopping-cart" class="zmdi zmdi-shopping-cart"></a></div>';
                    $('#totalQuantity').html(html);
                }
            )
        });

    })


    $(document).ready(function () {
        $('.button-shipping').click(function () {
            $('.button-selected.button-shipping').removeClass('button-selected');
            $(this).addClass('button-selected');
        })
        $('.button-payment').click(function () {
            $('.button-selected.button-payment').removeClass('button-selected');
            $(this).addClass('button-selected');
        })


    })

})(jQuery);