// $ = jQuery();
$(document).ready(function () {
    alert(1);
    refreshVendorList();
    filldropbox();
    refreshProductList();
    
    alert(2);
})
    function deleteVendor2(vendorId) {
        alert('del')
        // $.delete('/vendor', { id: vendorId });
        $.ajax({
            url: "/vendor?id="+vendorId,
            type: 'DELETE',
            success: function (s) {
                alert("success: " + s)
            },
            error: function (e) {
                alert(e)
            }
        });
    }
    function refreshVendorList() {
        $.get('/vendor', (data) => {
            let table = $('#vendorList');
            table.children('tbody').empty();
            for (let d of data) {
                console.log(d.id);
                table.children('tbody').append(`<tr>
                        <td>${d.id}</td>
                        <td>${d.name}</td>
                        <td><input type="button" class ="delbtn" id='btn-${d.id}' onclick="deleteVendor2(${d.id})"></td>
                        </tr>`)
            }
        })
    }
//     refreshVendorList();






    function filldropbox() {
        let dropbox = $('#select-product-brand');
        dropbox.empty();
        $.get('/vendor', (data) => {
            for (let d of data) {
                dropbox.append(`<option value=${d.name}>${d.name}</option>`);
            }
        })
    }
//     filldropbox();

    function refreshProductList() {
        let productList = $('#productList');
        productList.children('tbody').empty();
        $.get('/product', (data) => {
            for (let d of data) {
                console.log(d);
                productList.children('tbody').append(`<tr>
                <td>${d.id}</td>
                <td>${d.name}</td>
                <td>${d.brand}</td>
                <td>${d.price}</td>
                </tr>
                `)
            }
        })
    }
//     refreshProductList();

    function refreshCart(userId) {
        let cartList = $('#')
        cartList.children('tbody').empty();
        $.get(`/cart/${userId}`, (data) => {
            let i = 1;
            for (let d of data) {
                console.log(d);
                cartList.children('tbody').append(`<tr>
                <td>${i}</td>
                <td>${d.productId}</td>
                <td>${d.quantity}</td>
                <td>${d.price}</td>
                </tr>
                `)
            }
        })
    }





    $('#btnAddVendor').click(() => {
        $.post('/vendor', {
            name: $('#inputAddVendor').val()
        }), (data) => {
            if (data.success) {
                refreshProductlist()
            } else {
                alert('Some error occurred')
            }
        }
        refreshVendorList();
    })


    $('#btnAddProduct').click(() => {
        $.post('/product', {
            name: $('#input-product-name').val(),
            price: $('#input-product-price').val(),
            brand: $('#select-product-brand').val(),
            quantity: $('#input-product-quantity').val()
        }, (data) => {
            if (data.success) {
                refreshProductList();
            } else {
                alert('some error occured');
            }

        })
    })





    $('#btn-login').click(() => {
        let username = $('#input-cart-login').val();
        let userid;
        let cartList = $('#cartList');
        $.get(`/user/${username}`, (data) => {
            userid = data;
        })
        $.get(`/cart/${userid}`, (data) => {
            for (let d of data) {
                cartList.children('tbody').append(`
            <tr>
            <
            </tr>
            `)
            }
        })
    })



// }))
// // function deleteVendor(vendorId) {
// //     //$.delete('/vendor', { id: vendorId });
// //      alert(vendorId + " -- " + $ );
// //      $.ajex()
// //      $.delete('/vendor', { id: vendorId });
// //      alert("asdkjhf");
// //  }