import styled from "styled-components"
function fieldToTitle(field){
    switch (field) {
        case ("productid") : return "Product ID";
        case ("parentproductid") : return "Parent Product Id";
        case ("productname") : return "Product Name";
        case ("barcode") : return "Barcode";
        case ("unitofmeasure") : return "Unit of Measure";
        case ("packsize") : return "Pack Size";
        case ("unitsperparent") : return "Units per Parent";
        case ("category") : return "Category";
        case ("subcategory") : return "Sub Category";
        case ("imagepath") : return "Image Path";
        case ("costprice") : return "Cost Price (Php)";
        case ("sellingprice") : return "Selling Price (Php)";
        case ("isactive") : return "Active?";
        case ("dateadded") : return "Date Added" ;
        case ("lastupdated") : return "Last Updated";
        default : return "";
    }
}

export const Directory = styled.div`
    font-size : 1rem;
    color : gray;
`

export const TableHeader = styled.ul`
    display : flex;
    justify-content : space-between;
    align-items : center;
    padding : 2rem 0 ;
    font-weight : 400;
    >li.headControl {
        >ul.controls {
            display : flex;
            gap : 1rem;
            >li {
                cursor : pointer;
                padding : 1rem 2rem;
                border-radius : 0.5rem;
            }
            >li:hover {
                background-color : #c5e7fc;
            }
            >li:nth-child(1) {
                border : 3px solid #bcb7e2;
            }
        }
        
        
    }
`
export function ColumnHeads({heads}){
    return (heads.map((head)=>head))
}
export const TableData = styled.form`
    display : grid;
    grid-template : 1fr / 1fr repeat(${props => props.colNumber}, 5fr) 1fr;
    border-left : 1px solid rgba(185, 185, 202, 0.25);
    border-right : 1px solid rgba(185, 185, 202, 0.25);

    > div {
        padding : 0.5rem;
        border-top : 0.5px solid rgba(185, 185, 202, 0.25);
        border-bottom : 0.5px solid rgba(185, 185, 202, 0.25);
    }
    > div.checkbox {
    }
`

export function TableBody({data, showHandler}){       //data should be an array of item objects, with fields as keys
        const EditSection = styled.div`
            > img {
                width : 1rem;
                cursor : pointer;
            }
        `
        return data.map((product, i) => {
            const line = [<div><input type="checkbox" name="all" value="all" /></div>];
            var pId;
            Object.entries(product).map(([key, value])=> {
                if (["productid", "productname", "unitofmeasure", "category", "packsize", "costprice", "sellingprice"].includes(key)) {
                    line.push(<div className="Hi">{value}</div>)
                }
                if (key === "productid") {
                    pId = value;
                }
            });
            line.push(  <EditSection>
                            <img src="https://cdn-icons-png.flaticon.com/128/2985/2985043.png" data-id={pId} onClick={showHandler}/>
                        </EditSection>)
            return line.map((e)=>e);
        })
    }

const Details = styled.div`
    position : fixed;
    padding : 1rem;
    height : 80vh;
    width : 80%;
    background-color : white;
    display : grid;
    grid-template : 2rem 30% 1fr / 1fr;
    gap : 1rem;
    left : 10%;
    top : 10%;
    box-shadow: gray 0px 0px 100px 100px;
    border-radius : 1rem;
    .back {
        cursor : pointer;
        font-size : 2rem;
    }
    img {
        justify-self : center;
        width : 100%;
        height : 100%;
        object-fit : contain;
    }
`
const EditForm = styled.form`
    height : 100%;
    width : 80%;
    color : black;
    justify-self : center;
    display : flex;
    flex-flow : column;
    justify-content : space-evenly;
    > div {   
        display : grid;
        grid-template : 1fr / 2fr 3fr;  
        > input {
            padding : 0 2rem;
            height : 2rem;
            border-radius : 0.5rem;
        }
        > input::placeholder {
            opacity : 50%;
        } 
        > input:disabled {
            border : 0;
            background-color: #ececec;
        }
    }
    >.buttons{
        display : flex;
        justify-content : center;
        > button {
            cursor: pointer;
            padding : 1rem 0.5rem;
            align-self : center;
            width : 10rem;
            margin : 1rem;
            border-radius : 1rem;
        }
        >.submit {
            /* background-color : #aeec91; */
            background-color : white;
            border : 2px solid #65a746;
        }
        >.submit:hover {
            background-color : #65a746;
        }
        >.reset{
            background-color : white;
            border : 2px solid #caf314;
        }
        >.reset:hover {
            background-color : #caf314;
        }
        >.delete {
            background-color : white;
            border : 2px solid #f33514;
        }
        >.delete:hover {
            background-color : #f33514;
        }
    } 
`
export function DetailsPane({isShown, data, hideHandler, inputChangeHandler, submitHandler}){
    return isShown && 
        <Details>
            <div className="back" onClick={hideHandler}>←</div>
            <img src={data.imagepath}/>
            <EditForm onSubmit={submitHandler}>
            {   data && (
                Object.entries(data).map(([key, value]) => {
                    // console.log(showDetail.product.productid+"_"+key);
                    return <div className="perKey">
                        <label htmlFor={key}>{fieldToTitle(key)}</label> 
                        <input type="text" placeholder={key} defaultValue={value} data-key={key} onChange={inputChangeHandler} name={key} disabled=
                            {["productid", "dateadded", "lastupdated", ].includes(key)? true : false}/>
                    </div>
                }
            ))}
            <div className="buttons">
                
                <button type="submit" className="submit">Submit Changes</button>
                <button type="reset" className="reset">Reset Changes</button>
                <button type="button" className="delete">Delete Item</button>
            </div>
            </EditForm>
        </Details>
}