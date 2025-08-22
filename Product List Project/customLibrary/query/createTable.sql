CREATE TABLE IF NOT EXISTS {{products_table}} (
	ProductID SERIAL PRIMARY KEY,
    ParentProductID INT NULL,
    ProductName VARCHAR(255) NOT NULL,
    Barcode VARCHAR(50) UNIQUE NOT NULL,
    UnitOfMeasure VARCHAR(50) NOT NULL,   -- e.g., 'box', 'piece'
    PackSize VARCHAR(100),                -- e.g., '24 x 330ml' or '330ml can'
    UnitsPerParent INT DEFAULT NULL,      -- e.g., 24 (if child product)
    Category CHAR(2),                     -- e.g., 'BE' for Beverages
    SubCategory CHAR(2),                  -- e.g., 'SO' for Soda
    ImagePath VARCHAR(255),               -- e.g., '/images/products/1001.jpg'
    CostPrice DECIMAL(10,2),     -- cost per unit (box or piece)
    SellingPrice DECIMAL(10,2),  -- selling price per unit
	
    IsActive BOOLEAN DEFAULT TRUE,
    DateAdded TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    LastUpdated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (ParentProductID) REFERENCES {{products_table}}(ProductID)	
);