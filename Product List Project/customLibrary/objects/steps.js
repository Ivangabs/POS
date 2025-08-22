import categories from './categories.js';
import unitsOfMeasure from './unitsOfMeasure.js';
function createStep(name, message, type, data = null, options = null){
    var data = {
        name : name,
        message : message,
        type : type,
        data : data,
        options : options
    }
    return data;
};
const blankSteps = [
    createStep( "Barcode",
                "Please Scan the Barcode of the Product",
                "photoOnly"
    ),
    createStep( "ImagePath",
                "Please Scan the Image of the Product",
                "photoOnly",
    ),
    createStep( "ProductName",
                "Please enter the name of the product",
                "textOnly"
    ),
    createStep( "ParentProductID",
                "Please enter the key of the parent product",
                "numberSkip", null,
                [
                    [
                        {text : "Skip", callback_data: "Skip"}
                    ]
                ]   
    ),
    createStep( "Category",
                "Choose the category of the product",
                "choiceOnly", null,
                categories
    ),
    createStep( "SubCategory",
                "Choose the sub category of the product",
                "textSkip", null,
                [
                    [
                        {text : "Skip", callback_data: "Skip"}
                    ]
                ]
    ),
    createStep( "UnitOfMeasure",
                "Please enter unit of measure of the product",
                "choiceOnly", null,
                unitsOfMeasure
    ),
    createStep( "PackSize",
                "Please enter the pack size of the product",
                "textOnly"
    ),
    createStep( "UnitsPerParent",
                "Please enter number of units on this parent product",
                "numberSkip", null,
                [
                    [
                        {text : "Skip", callback_data: "Skip"}
                    ]
                ]
    ),
    createStep( "CostPrice",
                "Please enter the cost price of the product (PHP)",
                "numberSkip", null,
                [
                    [
                        {text : "Skip", callback_data: "Skip"}
                    ]
                ]
    ),
    createStep( "SellingPrice",
                "Please enter the selling price of the product (PHP)",
                "numberSkip", null,
                [
                    [
                        {text : "Skip", callback_data: "Skip"}
                    ]
                ]
    ),
    createStep( "done",
                "Process is done. Importing to database. Please wait...",
                "flag"
    )
];
export default blankSteps;