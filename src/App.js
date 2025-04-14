import { act, useState } from 'react';
import './index.css';

const initialItems = [
    {
        name: "little plushie",
        cost: 29.99,
        image: 'https://i.pinimg.com/736x/2b/27/50/2b275054775019ef566f5aa4d3ba2330.jpg',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s'
    },
    {
        name: "milk 2L 3,5%",
        cost: 5.59,
        image: 'https://i.pinimg.com/736x/7e/af/16/7eaf162acf9b49b0c9f66c0520181a75.jpg',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s'
    },
    {
        name: "12kg potatoes",
        cost: 98.72,
        image: 'https://i.pinimg.com/736x/f7/a3/3b/f7a33b7665c648860035aa40d8334ebc.jpg',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s'
    },
    {
        name: "Multimetr 500V/1500A",
        cost: 192.89,
        image: 'https://i.pinimg.com/736x/64/e5/d2/64e5d2a8c2d27cee1df28b6afc2f8766.jpg',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s'
    },
    {
        name: "Glock-19 Gen 5 kal. 9x19mm",
        cost: 1029,
        image: 'https://i.pinimg.com/736x/5e/1c/73/5e1c73dae097396ee8afe4b40cc77c33.jpg',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s'
    }
]

export default function App() {
    const items = initialItems;
    const [showDescription, setShowDescription] = useState(false);
    const [showShoppingCard, setShowShoppingCard] = useState(true);
    const [inputItem, setInputItem] = useState('');
    const [product, setProduct] = useState({});
    //const [countProduct, setCountProduct] = useState(1);

    const [shoppingItems, setShoppingItems] = useState([
        {
            name: "little plushie",
            cost: 29.99,
            image: 'https://i.pinimg.com/736x/2b/27/50/2b275054775019ef566f5aa4d3ba2330.jpg'
        }, {
            name: "Glock-19 Gen 5 kal. 9x19mm",
            cost: 1029,
            image: 'https://i.pinimg.com/736x/5e/1c/73/5e1c73dae097396ee8afe4b40cc77c33.jpg'

        }]);

    function handleAddToCard(item){
        /*shoppingItems.map(el => {
            if(el.name === item.name)  
        })*/
        setShoppingItems([...shoppingItems, item]);
    } 


    return (
        <div className="container">
            <div className="list-items">
                <Search 
                    items={items} 
                    handleInput={setInputItem} 
                    inputItem={inputItem} />
                <ListItems 
                    items={items} 
                    inputItem={inputItem} 
                    onShowDescription={setShowDescription} 
                    showDescription={showDescription} 
                    setProduct={setProduct} 
                    onAddToCard={handleAddToCard}/>
            </div>
            {showDescription && <ItemDescription product={product} onAddToCard={handleAddToCard} />}
            <div className="right-side">
                <NumItems shoppingItems={shoppingItems} onShowShoppingCard={setShowShoppingCard} />
                {showShoppingCard ? <ShoppingCard shoppingItems={shoppingItems} /> : ""}
            </div>
        </div>
    )
}

function Search({ inputItem, handleInput }) {

    return (
        <div>
            <div className="search">
                <span>🔍</span>
                <input type='text' placeholder="search..." value={inputItem} onInput={e => handleInput(e.target.value)} />
                <span onClick={() => handleInput("")}>❌</span>
            </div>
        </div>
    )
}

function ListItems({ items, inputItem, onShowDescription, showDescription, setProduct,onAddToCard }) {
    const [itemClicked, setItemClicked] = useState(null);
    return (
        <div className="items">
            <ul>
                {items.map((item, i) => <Item
                    num={i + 1}
                    item={item}
                    key={item.name}
                    inputItem={inputItem}
                    itemClicked={itemClicked}
                    setItemClicked={setItemClicked}
                    onShowDescription={onShowDescription}
                    showDescription={showDescription}
                    setProduct={setProduct} 
                    onAddToCard={onAddToCard}
                    />
                )}
            </ul>
        </div>
    )
}

function Item({ item, inputItem, itemClicked, setItemClicked, num, onShowDescription, setProduct, onAddToCard }) {
    const opened = num === itemClicked;

    function handlerItemClicked() {
        setItemClicked(opened ? null : num)
        onShowDescription(opened ? null : num)
        setProduct(item);
    }

    return (
        <>
            {
                inputItem === "" || item.name.toLowerCase().includes(inputItem.toLowerCase())
                    ? 
                    <li className={opened ? "item-hovered" : ""}>
                        <ul className="item">
                            <li onClick={handlerItemClicked} >
                                <div className="name-n-cost">
                                    <img src={item.image} alt={item.name} />
                                    <div >
                                        <h3>{item.name}</h3>
                                        <span className="cost">{item.cost} zł</span>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <span className="add" onClick={()=>onAddToCard(item)} >+</span>
                    </li>
                    : ""
            }
        </>

    )
}

function ItemDescription({ product, onAddToCard }) {
    return (
        <div className="item-description">
            <img src={product.image} alt={product.name} />
            <div>
                <h2>{product.cost} zł</h2>
                <h4>{product.name}</h4>
                <p>
                    {product.description}
                </p>
                <button onClick={()=>onAddToCard(product)}>Add to card</button>
            </div>
        </div>
    )
}

function NumItems({shoppingItems, onShowShoppingCard}) {
    const numItems = shoppingItems.length
    return (
        <div className="shop-num" onClick={()=>onShowShoppingCard(value=> !value)}>
            <span className="koszyk">🛒</span>
            <div className="num-items"><span>{numItems}</span></div>
        </div>
    )
}

function ShoppingCard({ shoppingItems }) {
    const [totalCost, setTotalCost] = useState(null)
    
    return (
        <div className="shopping-card">
            <div>
                <h3>Shopping card</h3>
                <hr />
                <ul>
                    {shoppingItems.map((item, i) => <ShoppingItem num={i} 
                                                        item={item} 
                                                        key={item.image} 
                                                        shoppingItems={shoppingItems}
                                                        setTotalCost={setTotalCost}
                                                        />)}
                </ul>
            </div>
            <hr />

            <div className="buy">
                <span>Cost: {totalCost} zł</span>
                <button>Buy</button>
            </div>
        </div>
    )
}

function ShoppingItem({item, shoppingItems, setTotalCost}) {

    const [amountItems, setAmountItems] = useState(1);
    let  itemsCost = item.cost * amountItems;

    function handleAdd(){
        setAmountItems(amountItems + 1);
        setTotalCost(itemsCost)

        }

    function handleSubstract(){
        amountItems > 1 && setAmountItems(amountItems - 1);
        setTotalCost(itemsCost)
    }

    
    //shoppingItems.map(el=> el.name === item.name ?  : "")
    return (
        <li>
            <div>
                <img src={item.image} alt={item.name} />
                <h4>{item.name}</h4>

            </div>
            <div>
                <button onClick={handleSubstract}>-</button>
                <input disabled type="text" value={amountItems} onChange={(e)=>setAmountItems(e.target.value)} />
                <button onClick={handleAdd}>+</button>
                <span>{(itemsCost).toFixed(2)} zł</span>
                <span className="delete-item">❌</span>
            </div>
        </li>
    )
}
