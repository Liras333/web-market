import { useState } from 'react';
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
    return (
        <>
            <Header>Shop Market</Header>
            <Container />
        </>
    )
}

function Container() {
    const [showShoppingCard, setShowShoppingCard] = useState(false);
    const [shoppingItems, setShoppingItems] = useState([]);
    const [showDescription, setShowDescription] = useState(false);
    const [inputItem, setInputItem] = useState('');
    const [product, setProduct] = useState({});
    const [money, setMoney] = useState(3140);

    function handleAddItem(item) {
        setShoppingItems([...shoppingItems, { ...item, id: Date.now() }]);
        setShowShoppingCard(true)
    }

    function handleDeleteItem(item) {
        setShoppingItems(shoppingItems.filter((el) => el.id !== item.id));
    }

    function handleClear(arr) {
        const amount = arr.map(el => el.cost);
        const cost = amount.length > 0 ? amount.reduce((acc, el) => acc + el).toFixed(2) : 0;

        setMoney(money >= cost ? money - cost : money)
        setShoppingItems(money >= cost ? [] : arr);

    }

    return (
        <div className="container">
            <LeftSide >
                <Search
                    onInputItem={setInputItem}
                    inputItem={inputItem} />
                <ListItems
                    inputItem={inputItem}
                    onShowDescription={setShowDescription}
                    showDescription={showDescription}
                    setProduct={setProduct}
                    onAddItem={handleAddItem} />
            </LeftSide>
            {showDescription && <ItemDescription product={product} onAddItem={handleAddItem} />}
            <RightSide >
                <NumItems
                    shoppingItems={shoppingItems}
                    onShowShoppingCard={setShowShoppingCard} money={money}/>
                {showShoppingCard ? <ShoppingCard
                    
                    shoppingItems={shoppingItems}
                    onDeleteITem={handleDeleteItem}
                    onClear={handleClear} /> : ""}
            </RightSide>
        </div>
    )
}

function LeftSide({ children }) {
    return (
        <>
            <div className="list-items">
                {children}
            </div>
        </>
    )
}


function RightSide({ children }) {
    return (
        <div className="right-side">
            {children}
        </div>
    )
}


function Header({ children }) {
    return (
        <header>
            <h1>{children}</h1>
        </header>
    )
}

function Search({ inputItem, onInputItem }) {
    return (
        <div>
            <div className="search">
                <span>🔍</span>
                <input type='text' placeholder="search..." value={inputItem} onInput={e => onInputItem(e.target.value)} />
                <span onClick={() => onInputItem("")}>❌</span>
            </div>
        </div>
    )
}

function ListItems({ inputItem, onShowDescription, showDescription, setProduct, onAddItem }) {
    const items = initialItems;
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
                    onAddItem={onAddItem}
                />
                )}
            </ul>
        </div>
    )
}

function Item({ item, inputItem, itemClicked, setItemClicked, num, onShowDescription, setProduct, onAddItem }) {
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
                        <span className="add" onClick={() => onAddItem(item)} >+</span>
                    </li>
                    : ""
            }
        </>

    )
}

function ItemDescription({ product, onAddItem }) {
    return (
        <div className="item-description">
            <img src={product.image} alt={product.name} />
            <div>
                <h2>{product.cost} zł</h2>
                <h4>{product.name}</h4>
                <p>
                    {product.description}
                </p>
                <button onClick={() => onAddItem(product)}>Add to card</button>
            </div>
        </div>
    )
}

function NumItems({ shoppingItems, onShowShoppingCard, money }) {
    const numItems = shoppingItems.length
    return (
        <>  <span className="pocket">Your pocket: {money.toFixed(2)} zł</span>
            <div className="shop-num" onClick={() => onShowShoppingCard(value => !value)}>
                <span className="koszyk">🛒</span>
                <div className="num-items"><span>{numItems}</span></div>
            </div>
        </>
    )
}

function ShoppingCard({ shoppingItems, onDeleteITem, onClear }) {
    const amount = shoppingItems.map(el => el.cost);
    const cost = amount.length > 0 ? "Cost: " + amount.reduce((acc, el) => acc + el).toFixed(2) + " zł" : "Add items"


    return (
        <>

            <div className="shopping-card">
                <div>
                    <h3>Shopping card</h3>
                    <hr />
                    <ul>
                        {shoppingItems.map((item, i) => <ShoppingItem
                            item={item}
                            key={`${item.name + i}`}
                            onDeleteItem={onDeleteITem}
                        />)}
                    </ul>
                </div>
                <hr />

                <div className="buy">
                    <span>{cost}</span>
                    {amount.length > 0 ? <button onClick={() => onClear(shoppingItems)}>Buy</button> : ""} 
                </div>
            </div>
        </>
    )
}

function ShoppingItem({ item, onDeleteItem }) {

    return (
        <li>
            <div>
                <img src={item.image} alt={item.name} />
                <h4>{item.name}</h4>
            </div>
            <div >
                <span>{(item.cost).toFixed(2)} zł</span>
                <span className="delete-item" onClick={() => onDeleteItem(item)}>❌</span>
            </div>
        </li>
    )
}
