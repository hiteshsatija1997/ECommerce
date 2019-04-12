$(() => {


    //refreshShoppingList();

    $('#btnLogin').click(() => {

        let username = $('#inputUsername').val();
        $.get(`/user/${username}`, (data) => {

            if (data.success) {
                alert('logged in');
                refreshCart(data.uid);
                refreshShoppingList(data.uid);
            } else {
                $('#input-username').val('');
                alert('user not found... Please add new user or log in via\'hitesh\'');
            }
        })
    })

    $('#addUser').click(() => {
        $.post('/user', {
            username: $('#inputUsername').val()
        }, (data) => {
            if (data.success) {
                alert('user added');
            } else {
                alert('error');
            }
        }
        )
    })

})

function refreshShoppingList(uid) {
    let shoppingList = $('#shoppingList').children('tbody');
    shoppingList.empty();
    $.get('/product', (data) => {
        for (let d of data) {
            console.log(d);
            shoppingList.append(`<tr>
            <td>${d.name}</td>
            <td>${d.price}</td>
            <td>${d.vendor.name}</td>
            <td><input type="button" value="add" id='add${d.id}' onclick=addInCart(${d.id},${uid})></td>
            <td><input type="button" value="delete" id='del${d.id}' onclick=deleteFromCart(${d.id},${uid})></td>
            </tr>`)
        }
    })
}

function refreshCart(uid) {

    let cartList = $('#cartList').children('tbody');
    console.log(uid);
    cartList.empty();
    $.get(`/cart/${uid}`, (data) => {
        let i = 1;
        for (let d of data) {
            cartList.append(`<tr>
            <td>${i++}</td>
           <td>${d.product.name}</td>
            <td>${d.product.vendor.name}</td>
           <td>${d.product.price}
            <td><input type="button" value="-" id='del${d.product.id}' onclick=decrease(${d.product.id},${uid})>
            ${d.quantity}
            <input type="button" value="+" id='add${d.product.id}' onclick=increase(${d.product.id},${uid})></td>
            </tr>`)
        }
    })
}

function increase(pid, uid) {
    $.ajax({
        url: '/cartitems',
        type: 'POST',
        data: {
            usid: uid,
            prid: pid
        },
        success: () => {
            alert("product added")
            refreshCart(uid);
        }
    })

}
function decrease(pid, uid) {

    $.ajax({
        url: '/cartitemsdec',
        type: 'POST',
        data: {
            usid: uid,
            prid: pid
        },
        success: () => {
            alert("product deleted")
            refreshCart(uid);
        }, error: () => {
            alert('error');
        }
    })

}


function addInCart(pid, uid) {
    $.post('/cart', {
        productId: pid,
        userId: uid
    }, (data) => {
        if (data.success) {
            alert('added');
            refreshCart(uid);
        } else {
            alert('error');
        }
    })
}
function deleteFromCart(pid, uid) {
    $.ajax({
        url: '/cart',
        type: 'DELETE',
        data: {
            productId: pid,
            userId: uid
        },
        success: () => {
            refreshCart(uid);
            alert('deleted');

        },
        error: () => {
            alert('error');
        }
    })
}