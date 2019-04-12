$(() => {

   
    refreshVendorList();

    $('#btnAddVendor').click(
        function addVendor() {
            $.post('/vendor', {
                name: $('#inputAddVendor').val()
            })
            alert('added')
            refreshVendorList();
        })


    

})
function deleteVendor(id){
    $.ajax({
        url:'/vendor',
        type:'DELETE',
        data:{id:id},
        success:()=>{
            alert('deleted')
        },
    }),
    refreshVendorList();
}
function refreshVendorList() {
    let vendorList = $('#vendorList');
    vendorList.children('tbody').empty();
    $.get('/vendor', (data) => {
        let i = 1;
        for (let d of data) {
            vendorList.children('tbody').append(`<tr>
        <td>${i++}</td>
        <td>${d.id}</td>
        <td>${d.name}</td>
        <td><input type="button" value='delete' class ="delbtn" id='btn-${d.id}'
         onclick="deleteVendor(${d.id})"></td>
        </tr>`)
        }
    })
}