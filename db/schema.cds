namespace my.inventory;

entity Warehouses {
    key id       : Integer;
        location : String(100);
}

entity Products {
    key id       : Integer;
        name     : String(100);
        quantity : Integer;

}

entity Inventory {
    key product_ID   : Integer;
    key warehouse_ID : Integer;
        quantity     : Integer @default: 0;
        safety_stock : Integer @default: 10;
        product      : Association to Products
                           on product_ID = product.id;
        warehouse    : Association to Warehouses
                           on warehouse_ID = warehouse.id;
}

entity StockMovement {
    key movement_id     : Integer;
        product_ID      : Integer;
        warehouse_ID    : Integer;
        quantity_change : Integer;
        event_type      : String(50);
        occurred_at     : Timestamp;
        product         : Association to Products
                              on product_ID = product.id;
        warehouse       : Association to Warehouses
                              on warehouse_ID = warehouse.id;
}

entity Orders {
    key order_id     : Integer;
        product_ID   : Integer;
        warehouse_ID : Integer;
        quantity     : Integer;
        status       : String(50);
        created_at   : Timestamp;
        product      : Association to Products
                           on product_ID = product.id;
        warehouse    : Association to Warehouses
                           on warehouse_ID = warehouse.id;
}

entity AlertLog {
    key alert_id     : Integer;
        product_ID   : Integer;
        warehouse_ID : Integer;
        alert_type   : String(50);
        message      : String(500);
        logged_at    : Timestamp;
        product      : Association to Products
                           on product_ID = product.id;
        warehouse    : Association to Warehouses
                           on warehouse_ID = warehouse.id;
}
