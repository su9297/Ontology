sap.ui.define(["sap/ui/core/mvc/Controller"], function (Controller) {
  "use strict";
  return Controller.extend("inventory.controller.MainView", {
    onInit: function () {
      const oRouter = this.getOwnerComponent().getRouter();

      oRouter.getTarget("TargetMainView").attachDisplay(this._onDisplay, this);
    },

    _onDisplay: function () {
      const oTable = this.byId("productTable");
      if (oTable) {
        const oItemsBinding = oTable.getBinding("items");
        if (oItemsBinding) {
          oItemsBinding.refresh();
        }
      }
    },

    onProductSelect: function (oEvent) {
      const sId = oEvent.getSource().getBindingContext().getProperty("id");
      this.getOwnerComponent().getRouter().navTo("ProductDetail", { id: sId });
    },
  });
});
