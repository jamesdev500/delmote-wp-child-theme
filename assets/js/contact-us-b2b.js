jQuery(document).ready(function($) {

    var customProductSelect;

    // Get all product categories
    printProductCat($('#form-field-field_583433d').val());

    console.log($('#form-field-field_583433d').find(':selected').val());

    // Region select field
    $('#form-field-field_583433d').change(function() {
        console.log($(this).val());
        printProductCat($(this).val());
    });

    function printProductCat(region) {

        if (customProductSelect) {
            customProductSelect.addClass('select-disabled');
        }

        var ajaxData = {
            action: 'get_product_categories'
        };

        if (region) {
            ajaxData.region = region;
        }

        $.ajax({
            type: 'get',
            dataType: 'json',
            url: ajaxUrl,
            data: ajaxData,
            success: function(data) {
                console.log(data);
                var checkList = '';

                if (data.success) {
                    var productInputField = $('#form-field-field_0b1da5a');
                    productInputField.hide();
                    productInputField.nextAll('div').remove();

                    checkList += '<div class="selected-items-container">';
                    checkList += '</div>';

                    checkList += '<div class="dd-wrapper" style="display: none;">';
                    checkList += '<div class="dd-check-list">';

                    for (let i = 0; i < data.data.length; i++) {
                        checkList += '<div class="dd-check-list__item">';
                        checkList += '<input type="checkbox" id="' + data.data[i].slug + '" value="' + data.data[i].name + '" />';
                        checkList += '<label>' + data.data[i].name + '</label>';
                        checkList += '</div>';
                    }

                    checkList += '</div></div>';
                }

                productInputField.after(checkList);

                customProductSelect = $('#form-field-field_0b1da5a').next();
            }
        });
    }

    let isDropped = false;
    $('body').on('click', '.selected-items-container', function() {
        var ddWrapper = $('body').find('.dd-wrapper');
        if (ddWrapper.is(":hidden")) {
            ddWrapper.show();
            isDropped = true;
        } else {
            ddWrapper.hide();
            isDropped = false;
        }

        this.classList.toggle("select-arrow-active");
    });

    $('body').on('click', '.dd-check-list__item', function() {
        var checkBox = $(this).children('input');
        var doCheck = true;

        var productVal = $('#form-field-field_0b1da5a').val();
        var productInit = (productVal === '') ? true : false;

        productVal = productVal.split(", ");

        var selectedItemsContainer = $('body').find('.selected-items-container');

        if (checkBox.is(":checked")) {
            doCheck = false;

            var productValIndex = $.inArray(checkBox.val(), productVal);
            if (productValIndex != -1) {
                productVal.splice(productValIndex, 1);
            }

            var joinValue = (productInit == true) ? '' : ', ';
            $('#form-field-field_0b1da5a').val(productVal.join(joinValue));

            $('span[data-id="' + checkBox.attr('id') + '"]').remove();
        } else {
            selectedItemsContainer.append('<span data-id="' + checkBox.attr('id') + '">' + checkBox.val() + '&nbsp;&nbsp;&nbsp;<i class="fas fa-times"></i></span>');

            productVal.push(checkBox.val());
            var joinValue = (productInit == true) ? '' : ', ';
            $('#form-field-field_0b1da5a').val(productVal.join(joinValue));
        }

        $(this).children('input').prop('checked', doCheck);

        console.log($('#form-field-field_0b1da5a').val());
    });

    $('body').on('click', '.selected-items-container span i', function(e) {
        e.stopPropagation();

        var selectedItem = $(this).parent();

        var checkBox = $('#' + selectedItem.attr('data-id'));
        checkBox.prop('checked', false);

        var productVal = $('#form-field-field_0b1da5a').val();
        var productInit = (productVal === '') ? true : false;

        productVal = productVal.split(", ");

        var productValIndex = $.inArray(checkBox.val(), productVal);
        if (productValIndex != -1) {
            productVal.splice(productValIndex, 1);
        }

        var joinValue = (productInit == true) ? '' : ', ';
        $('#form-field-field_0b1da5a').val(productVal.join(joinValue));

        selectedItem.remove();

        console.log($('#form-field-field_0b1da5a').val());
    });


    $(document).on("click", function(event){
        if(!$(event.target).closest("#contactSales .dd-check-list").length && 
        !$(event.target).closest("#contactSales .selected-items-container").length
            ){
            if( isDropped ) {
                console.log('clicked outside while dropdown active');
                $("#contactSales .selected-items-container").removeClass('select-arrow-active');
                $("#contactSales .dd-wrapper").hide();
            } else {
                console.log('clicked outside but dropdown not active');
            }
        }
    });
});