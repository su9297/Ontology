// WarehouseDetail.controller.js
sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
  ],
  function (Controller, Filter, FilterOperator) {
    "use strict";

    return Controller.extend("inventory.controller.WarehouseDetail", {
      onInit: function () {
        var oTable = this.byId("productsTable");
        this._oProductTemplate = oTable.getItems()[0].clone();
        oTable.removeAllItems();
        this.getOwnerComponent()
          .getRouter()
          .getRoute("WarehouseDetail")
          .attachPatternMatched(this._onPatternMatched, this);
      },

      _onPatternMatched: function (oEvent) {
        var sId = oEvent.getParameter("arguments").id;
        var oTable = this.byId("productsTable");

        oTable.unbindItems();

        oTable.bindItems({
          path: "/Products",
          template: this._oProductTemplate.clone(),
          filters: [new Filter("warehouse_ID", FilterOperator.EQ, sId)],
          parameters: {
            $$operationMode: "Server",
          },
        });
      },
    });
  }
);
