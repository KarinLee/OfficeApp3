//Create Table1
Excel.run(function (ctx) {
    var sheet = ctx.workbook.worksheets.get();
    var table = sheet.tables.add("A1:C4", true).load("name");
    return ctx.sync()
        .then(function() {
            Office.context.document.bindings.addFromNamedItemAsync(table.name, Office.BindingType.Table, { id: "myBinding" }, function (asyncResult) {
                if (asyncResult.status == Office.AsyncResultStatus.Failed) {
                    console.log("Action failed with error: " + asyncResult.error.message)
                } else {
                    // If succeeded, then add event handler to the table binding.
                    Office.select("bindings#myBinding").addHandlerAsync(Office.EventType.BindingDataChanged, onBindingDataChanged);
                    console.log("Event handler added to the table binding successfully. Now try to change values in the table.");
                }
            });
        });
}).catch(function (error) {
	console.log(error);
});

// when data in the table is changed, this event will be triggered.
function onBindingDataChanged(eventArgs) {
    Excel.run(function (ctx) {
        var fill = ctx.workbook.bindings.getItem(eventArgs.binding.id).getTable().getDataBodyRange().format.fill.load("color");
        return ctx.sync()
            .then(function () {
                if (fill.color == "#FFA500") {
                    console.log("Data in the table is changed.");
                    return; 
                } else {
                    ctx.workbook.bindings.getItem(eventArgs.binding.id).getTable().getDataBodyRange().format.fill.color = "orange";
                }
            })
            .then(ctx.sync);
    }).catch(function (error) {
        console.log(JSON.stringify(error));
    });
}