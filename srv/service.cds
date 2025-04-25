using {my.inventory as db} from '../db/schema';

@impl: './stockmovement.js'
service InventoryService {
    entity Products      as projection on db.Products;
    entity Warehouses    as projection on db.Warehouses;
    entity StockMovement as projection on db.StockMovement;
    entity Inventory     as projection on db.Inventory;
    entity Orders        as projection on db.Orders;
    entity AlertLog      as projection on db.AlertLog;
}
