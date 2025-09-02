import React, { useState, useEffect } from "react"
import styled from "styled-components"
import {Directory, TableHeader, ColumnHeads, TableData, TableBody, DetailsPane} from "./Products.styles.jsx"
import {getProducts, updateProduct} from "./../../services/api.js"

export default function Products(){
    const [allProducts, setAllProducts] = useState([{}]);
    const [colCount, setColCount] = useState(1);
    const [colHeads, setColHead] = useState([]);
    const [columns, setColumns] = useState({count : 0, fields : []});
    const [detailForm, setDetailForm] = useState({product : allProducts[0], visibility : false}) //hidden / visible   <---This is the reference/data to send

    function detailForms(event){
        event.preventDefault();
        setDetailForm({
                product : structuredClone(allProducts).find(({productid}) => productid == event.target.dataset.id ),
                visibility : true
        })
    }
    function hideDetails(event){
        event.preventDefault();
        setDetailForm({
                product : detailForm.product, 
                visibility : false
        })
    }
    function detailsChangeHandler(event){
        event.preventDefault();
        detailForm.product[event.target.dataset.key] = event.target.value;
        setDetailForm(detailForm);
    }

    function submitForm(event){
        event?.preventDefault();
        const updateProducts = async () => {
            const resUpdateq = await updateProduct(detailForm.product.productid, detailForm.product);
            const resFetch = await getProducts();
            resFetch.data.sort((a, b) => parseInt(a.productid) - (b.productid));
            setAllProducts(resFetch.data);
        }
        updateProducts();
    }
    
    useEffect(()=>{
        const fetchProducts = async () => {
            const res = await getProducts();
            res.data.sort((a, b) => parseInt(a.productid) - (b.productid));
            setAllProducts(res.data);
        }
        fetchProducts();
    }, []);
    
    useEffect(()=>{
        console.log("Ivan Filter");
        setColHead(
            [<div className="checkbox"><input type="checkbox" name="all" value="all" /></div>]
            .concat(["Product ID", "Product Name", "Unit of Measure", "Pack Size", "Category", "Cost Price", "Selling Price"].map((cols) => <div>{cols}</div>))
            .concat(<div></div>))
        setColCount(colHeads.length);
    },[allProducts]);


    const ProductsContainer = styled.div`
        overflow : auto;    
        
    `
    return (
        <ProductsContainer className="table">
            {/* Main Table Shown */}
            <Directory>Home / Products</Directory>
            <TableHeader>
                <li>Products</li>
                <li className="headControl">
                    <ul className="controls">
                        <li>Create New</li>
                        <li>Filter</li>
                    </ul>
                </li>
            </TableHeader>
            <TableData colNumber={colCount - 2}>        {/*This is reduced by 2 because it accounts for checkbox and edit button since these have different styling*/}
                <ColumnHeads heads={colHeads} />
                <TableBody  data={allProducts} 
                            showHandler={(e)=>detailForms(e)}/>
            </TableData>
            {/* Details Pane on the side */}

            <DetailsPane    isShown={detailForm.visibility} 
                            data={detailForm.product}
                            hideHandler={(e)=>hideDetails(e)}
                            inputChangeHandler={(e)=>detailsChangeHandler(e)}
                            submitHandler={(e)=>submitForm(e)}/>
        </ProductsContainer>
    )
}