import {useState} from 'react';
import LeftSide from './LeftSide';
import RightSide from './RightSide';
import ListItems from './ListItems';
import ItemDescription from './ItemDescription';
import NumItems from './NumItems';
import ShoppingCard from './ShoppingCard';
import Search from './Search';

export default function Container() {
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