sap.ui.define(["sap/ui/core/mvc/Controller"], function (Controller) {
  return Controller.extend("inventory.controller.StockMovementDetail", {
    onInit() {
      this.getOwnerComponent()
        .getRouter()
        .getRoute("StockMovementDetail")
        .attachPatternMatched((oEvt) => {
          const id = oEvt.getParameter("arguments").movement_id;
          this.getView().bindElement({
            path: `/StockMovement(${id})`,
            parameters: { $expand: "product,warehouse" },
          });
        }, this);
    },
  });
});
