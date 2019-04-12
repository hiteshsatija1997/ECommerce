$(() => {

    fillDropbox();
    refreshProductList();

    $('#btnAddProduct').click(
        function addProduct() {
            $.post('/product', {
                name: $('#inputProductName').val(),
                price: $('#inputProductPrice').val(),
                vendorId: $('#selectProductVendor').val(),
                quantity: $('#inputProductQuantity').val()
            },(data)=>{
                if(data.success){
                    alert('added')
                    $('#inputProductName').val('');
                    $('#inputProductPrice').val('');
                    $('#selectProductVendor').val('');
                    $('#inputProductQuantity').val('')
                    refreshProductList();
                }else{
                    alert('error');
                }
            })
            
           
        })




})

function fillDropbox() {
    let dropbox = $('#selectProductVendor');
    dropbox.empty();
    $.get('/vendor', (data) => {
        for (let d of data) {
           
            dropbox.append(`<option value=${d.id}>${d.name}</option>`);
        }
    })
}


function deleteProduct(id) {
    $.ajax({
        url: '/product',
        type: 'DELETE',
        data: { id: id }
    })
    refreshProductList();
}
function refreshProductList() {
    let productList = $('#productList');
    productList.children('tbody').empty();
    
    $.get('/product', (data) => {
        let i = 1;
        for (let d of data) {
            productList.children('tbody').append(`<tr>
        <td>${i++}</td>
        <td>${d.id}</td>
        <td>${d.name}</td>
        <td>${d.vendor.name}</td>
        <td>${d.price}</td>
        <td><input type="button" value="delete" class ="delbtn" id='btn${d.id}'
         onclick="deleteProduct(${d.id})"></td>
        </tr>`)
        }
    })
}