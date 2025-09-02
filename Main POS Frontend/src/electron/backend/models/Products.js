import dbClient from '../db.js';
import env from "dotenv";

env.config({path : './../../../.env'});

const outputTemp = {
    data : null,
    message : null,
    error : null,
    success : false
}

export async function getAllProducts(){
    const output = outputTemp;
    try {
        const qResult = await dbClient.query(
            "SELECT * FROM products ");
        output.data = qResult.rows;
        output.message = "Products Found"
        output.success = true;
       
    } catch (error) {
        // console.log(error);
        output.error = "Can't access database"
    } finally {
        return output;
    }
}

export async function updateProduct(id, product){
    const output = outputTemp;
    const keys = Object.keys(product);            // ["name", "price", "stock"]
    const values = Object.values(product);        // ["New Phone", 299.99, 50]

    // Create a string like: "name = $1, price = $2, stock = $3"
    const setClause = keys.map((key, i) => `${key} = $${i + 1}`).join(", ");

    // Final query: UPDATE products SET name=$1, price=$2, stock=$3 WHERE id=$4
    const query = `UPDATE products SET ${setClause} WHERE productid = $${keys.length + 1}`;
    try {
        const result = await dbClient.query(query, [...values, id]);
        const updated_at = new Date().toISOString();
        const result2 = await dbClient.query(`UPDATE products SET lastupdated = $1 WHERE productid = $2`, [updated_at, id]);
        output.data = result;
        output.message = "Item updated";
        output.success = true;
    } catch (error) {
        // console.log(error);
        output.error = "Item cannot be updated";
    } finally {
        return output;
    }

}