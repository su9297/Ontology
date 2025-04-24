namespace my.inventory;

entity Warehouses {
    key id       : Integer;
        location : String(100);
}

entity Products {
    key id           : Integer;
        name         : String(100);
        quantity     : Integer;
        warehouse_ID : Integer;
        warehouse    : Association to Warehouses
                           on warehouse_ID = warehouse.id;
}
