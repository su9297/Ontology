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
        const oView = this.getView(),
          oODataModel = oView.getModel(),
          oNewModel = oView.getModel("newMovement"),
          // 초기값 객체를 미리 정의해 두면 편리합니다.
          oInitialData = {
            product_ID: "",
            warehouse_ID: "",
            quantity_change: 0,
            event_type: "INBOUND",
            occurred_at: new Date().toISOString(),
          };

        // 출고인 경우 수량을 음수로
        let oData = { ...oNewModel.getData() };
        if (oData.event_type === "OUTBOUND" && oData.quantity_change > 0) {
          oData.quantity_change = -oData.quantity_change;
        }

        const oListBinding = oODataModel.bindList("/StockMovement");
        oListBinding.create(oData);

        oODataModel
          .submitBatch("$auto")
          .then(() => {
            // 1) 토스트 알림
            MessageToast.show("이력 등록이 완료되었습니다.");
            // 2) JSON 모델을 초기값으로 재설정하여 폼 클리어
            oNewModel.setData(oInitialData);
            // 3) 리스트로 이동
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
