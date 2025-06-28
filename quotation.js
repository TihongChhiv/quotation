var quoationData = []


function addItem(){
    var d = $("#Discription")
    var u = $("#unitPrice")
    var q = $("#quantity")
    console.debug(d,u,q)

    quoationData.push({
        discription : d,
        unitPrice   : Number.parseFloat(u),
        quantity    : Number.parseFloat(u)
    })

    $('#exampleModal').modal('hide')
    renderTable();
}


function renderTable(){
    var data = quoationData
    var subTotal = 0
    data.forEach((e)=>{
        subTotal = subTotal + (unitPrice * quantity)
    })
    var vat = (subTotal * 0.07).toFixed(2)
    var total = subTotal * 1.07

    console.log('subtotal',subTotal)
    $("#subTotal").html(""+subTotal)
    $("#vat").html(""+vat)
    $("#total").html(""+total)

    var dataRows = data.map((e,i)=>{ 
        let amount = e.quantity * e.unitPrice
        return `<tr class="data-row">
            <td class="text-center">${e.quantity}</td>
            <td class="data">
                <button onclick="deleteItem(${i})">X</button>
                ${e.description}
            </td>
            <td class="text-right">${e.unitPrice.toFixed(2)}</td>
            <td class"tex t-right">${amount.toFixed(2)}</td> 
            </tr>;
        `
    })
     $(".data-row").remove()

                            // Insert into the table
                            dataRows.forEach((r) => {
                                $('#quotationTable tbody').before(r)
                            })
        
                            function deleteItem(i) {
                            quoationData.splice(i,1)
                            renderTable()
                        }

                        $(document).ready(function () {
                            $.getJSON('data/data.json',
                                data => {
                                    // render the table
                                    quoationData = data;

                                    var d = new Date()
                                    $('#quotationDate').html(d.toDateString())
                                    renderTable()
                                })

                        })
    
}