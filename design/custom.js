function myFunction() {
    var x = document.getElementById("exampleInputPassword1");
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}

$(document).ready(function () {
    $(document).on('click', '.increment-btn', function (e) {
        e.preventDefault();

        var qty = $('.input-qty').val();
        var value = parseInt(qty, 10);
        value = isNaN(value) ? 0 : value;
        if (value < 10) {
            value++;
            $(this).closest('.product_data').find('.input-qty').val(value);
        }
    });

    $(document).on('click', '.decrement-btn', function (e) {
        e.preventDefault();

        var qty = $(this).closest('.product_data').find('.input-qty').val();

        var value = parseInt(qty, 10);
        value = isNaN(value) ? 0 : value;
        if (value > 1) {
            value--;
            $(this).closest('.product_data').find('.input-qty').val(value);
        }
    });

    $(document).on('click', '.addtocartbtn', function (e) {
        e.preventDefault();

        var qty = $(this).closest('.product_data').find('.input-qty').val();
        var prod_id = $(this).val();

        $.ajax({
            type: "POST",
            url: "functions/handlecart.php",
            data: {
                "prod_id": prod_id,
                "prod_qty": qty,
                "scope": "add"
            },
            success: function (response) {

                if (response == 201) {
                    alertify.success("Product Added To Cart");
                    //alert("Product added to cart");
                }
                else if (response == 401) {
                    alertify.success("Login to Purchase Item");
                    //alert("Login to Purchase Your Desired Item");
                }
                else if (response == 500) {
                    alertify.success("Something Went Wrong");
                    //alert("Something went wrong");
                }
            }
        });

    });

    let exampleInputPassword1 = document.getElementById('exampleInputPassword1')
    if (exampleInputPassword1) {
        exampleInputPassword1.addEventListener('input', (e) => {
            var password = e.target.value;
            var strengthIndicator = document.getElementById('password-strength');
            document.getElementById('is-valid-password').innerHTML = "";
            var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            var isStrong = regex.test(password);
            if (!password) {
                strengthIndicator.innerText = '';
                return;
            }
            if (isStrong) {
                strengthIndicator.innerText = 'Password is Strong';
                strengthIndicator.style.color = 'green';
            } else if (password.length >= 8) {
                strengthIndicator.innerText = 'Password is Medium';
                strengthIndicator.style.color = '#eeb600';
            } else {
                strengthIndicator.innerText = 'Password is Weak';
                strengthIndicator.style.color = 'red';
            }
        })
    }

    $(document).on('click', '.updateQty', function () {
        var qty = $(this).closest('.product_data').find('.input-qty').val();
        var prod_id = $(this).closest('.product_data').find('.prodId').val();


        $.ajax({
            method: "POST",
            url: "functions/handlecart.php",
            data: {
                "prod_id": prod_id,
                "prod_qty": qty,
                "scope": "update"
            },
            success: function (response) {
                //alert(response);
            }
        });

    });

    $(document).on('click', '.deleteItem', function () {
        var cart_id = $(this).val();
        //alert(cart_id);
        $.ajax({
            method: "POST",
            url: "functions/handlecart.php",
            data: {
                "cart_id": cart_id,
                "scope": "delete"
            },
            success: function (response) {
                if (response == 200) {
                    alertify.success("Removed Successfully");
                    location.reload();
                } else {
                    alertify.success(response);
                }

            }
        });
    });

});

