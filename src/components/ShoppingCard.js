import ShoppingItem from "./ShoppingItem";

export default function ShoppingCard({ shoppingItems, onDeleteITem, onClear }) {
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