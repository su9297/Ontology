sap.ui.define(["sap/ui/core/mvc/Controller"], function (Controller) {
  return Controller.extend("inventory.controller.StockMovementList", {
    onInit() {
      const oRouter = this.getOwnerComponent().getRouter();

      oRouter
        .getTarget("TargetStockMovementList")
        .attachDisplay(this._onDisplay, this);
    },

    _onDisplay: function () {
      const oTable = this.byId("mvmtTable");
      if (oTable) {
        const oItemsBinding = oTable.getBinding("items");
        if (oItemsBinding) {
          oItemsBinding.refresh();
        }
      }
    },

    onCreate() {
      this.getOwnerComponent().getRouter().navTo("StockMovementCreate");
    },
    onSelect(oEvent) {
      const id = oEvent
        .getSource()
        .getBindingContext()
        .getProperty("movement_id");
      this.getOwnerComponent()
        .getRouter()
        .navTo("StockMovementDetail", { movement_id: id });
    },
    onSearch() {
      const oTable = this.byId("mvmtTable"),
        oBinding = oTable.getBinding("items"),
        aFilters = [];
      oBinding.filter(aFilters);
    },
  });
});
