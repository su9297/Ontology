const cds = require("@sap/cds");

module.exports = cds.service.impl(function () {
  const { StockMovement, Inventory, Products, Orders, AlertLog } =
    this.entities;

  this.after("CREATE", "StockMovement", async (data, req) => {
    if (!data || !data.product_ID) return;
    const { product_ID, warehouse_ID, quantity_change } = data;
    const tx = cds.transaction(req);

    // 1) Inventory upsert: 신규 INSERT하거나, 있으면 quantity += quantity_change
    const defaultSafety = 10;
    await tx.run(
      `
      INSERT INTO my_inventory_Inventory(product_ID, warehouse_ID, quantity, safety_stock)
      VALUES (?, ?, ?, ?)
      ON CONFLICT(product_ID, warehouse_ID)
      DO UPDATE SET quantity = quantity + excluded.quantity
    `,
      [product_ID, warehouse_ID, quantity_change, defaultSafety]
    );

    // 2) 변경된 수량 조회
    const invRec = await tx.run(
      SELECT.one`quantity, safety_stock`
        .from(Inventory)
        .where({ product_ID, warehouse_ID })
    );

    const { quantity: newQty, safety_stock } = invRec;

    // 3) Products 총재고 합계 동기화
    // ① 단일 레코드 반환 쿼리로 변경
    const { total = 0 } = await tx.run(
      SELECT.one`sum(quantity) as total`.from(Inventory).where({ product_ID })
    );

    // ② Products 테이블 업데이트
    await tx.run(
      UPDATE(Products).set({ quantity: total }).where({ id: product_ID })
    );

    // 4) 임계치 이하/0 알림 및 자동 주문
    if (newQty > 0 && newQty <= safety_stock) {
      await tx.run(
        INSERT.into(AlertLog).entries({
          product_ID,
          warehouse_ID,
          alert_type: "LOW_STOCK",
          message: `제품 ${product_ID} 재고(${newQty})가 임계치(${safety_stock}) 이하입니다.`,
        })
      );
    }
    if (newQty === 0) {
      const orderQty = safety_stock * 2;
      await tx.run(
        INSERT.into(Orders).entries({
          product_ID,
          warehouse_ID,
          quantity: orderQty,
          status: "REQUESTED",
        })
      );
      await tx.run(
        INSERT.into(AlertLog).entries({
          product_ID,
          warehouse_ID,
          alert_type: "ORDER_PLACED",
          message: `제품 ${product_ID} 재고 0 → 주문 ${orderQty}개 생성`,
        })
      );
    }
  });
});
