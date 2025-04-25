sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/m/MessageToast"],
  function (Controller, MessageToast) {
    "use strict";

    return Controller.extend("inventory.controller.StockMovementCreate", {
      onInit() {
        // 신규 입력용 JSON 모델 바인딩
        const oJSON = new sap.ui.model.json.JSONModel({
          product_ID: "",
          warehouse_ID: "",
          quantity_change: 0,
          event_type: "INBOUND",
          occurred_at: new Date().toISOString(),
        });
        this.getView().setModel(oJSON, "newMovement");
      },

      onSave() {
        const oView = this.getView();
        const oODataModel = oView.getModel();
        const oData = oView.getModel("newMovement").getData();

        const oListBinding = oODataModel.bindList("/StockMovement");

        const oContext = oListBinding.create(oData);

        oODataModel
          .submitBatch("$auto")
          .then(() => {
            MessageToast.show("이력 등록이 완료되었습니다.");
            this.getOwnerComponent()
              .getRouter()
              .navTo("StockMovementList", {}, true);
          })
          .catch((oError) => {
            MessageToast.show("등록 중 오류가 발생했습니다.");
            console.error(oError);
          });
      },
    });
  }
);
