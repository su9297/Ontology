sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/m/MessageToast",
  ],
  function (Controller, History, MessageToast) {
    "use strict";
    return Controller.extend("inventory.controller.ProductDetail", {
      onInit() {
        this.getOwnerComponent()
          .getRouter()
          .getRoute("ProductDetail")
          .attachPatternMatched(this._onMatched, this);
      },

      _onMatched(oEvent) {
        const sId = oEvent.getParameter("arguments").id;
        this.getView().bindElement({
          path: `/Products(${sId})`,
        });
      },

      onQuantityChange(oEvent) {
        const oPropertyBinding = oEvent.getSource().getBinding("value");
        oPropertyBinding.setValue(oEvent.getParameter("value"));
      },

      onSave() {
        const oModel = this.getView().getModel();
        oModel
          .submitBatch("$auto")
          .then(() => {
            MessageToast.show("저장이 완료되었습니다.");
            const oRouter = this.getOwnerComponent().getRouter(),
              oHistory = History.getInstance(),
              sPrev = oHistory.getPreviousHash();
            if (sPrev) {
              oRouter.navBack();
            } else {
              oRouter.navTo("RouteMainView", {}, true);
            }
          })
          .catch(() => {
            MessageToast.show("저장 중 오류가 발생했습니다.");
          });
      },
    });
  }
);
