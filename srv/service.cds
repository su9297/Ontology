using {my.inventory as db} from '../db/schema';

service InventoryService {
    entity Products      as projection on db.Products;
    entity Warehouses    as projection on db.Warehouses;
    entity StockMovement as projection on db.StockMovement;
}
