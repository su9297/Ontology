sap.ui.define(["sap/ui/core/mvc/Controller"], function (Controller) {
  "use strict";
  return Controller.extend("inventory.controller.Home", {
    onNavWarehouses: function () {
      this.getOwnerComponent().getRouter().navTo("Warehouses");
    },
    onNavProducts: function () {
      this.getOwnerComponent().getRouter().navTo("RouteMainView");
    },
    onNavOntology: function () {
      this.getOwnerComponent().getRouter().navTo("OntologyView");
    },
    onNavLogs: function () {
      this.getOwnerComponent().getRouter().navTo("AlertLogView");
    },
    onNavStockMovemnet: function () {
      this.getOwnerComponent().getRouter().navTo("StockMovementList");
    },
  });
});
