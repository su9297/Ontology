sap.ui.define(["sap/ui/core/mvc/Controller"], function (Controller) {
  "use strict";
  return Controller.extend("inventory.controller.Warehouses", {
    onWarehouseSelect: function (oEvent) {
      const oItem = oEvent.getParameter("listItem");
      const sId = oItem.getBindingContext().getProperty("id");
      this.getOwnerComponent()
        .getRouter()
        .navTo("WarehouseDetail", { id: sId });
    },
  });
});
