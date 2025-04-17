export default function NumItems({ shoppingItems, onShowShoppingCard, money }) {
    const numItems = shoppingItems.length
    return (
        <>  <span className="pocket">Your pocket: {money.toFixed(2)} zł</span>
            <div className="shop-num" onClick={() => onShowShoppingCard(value => !value)}>
                <span className="koszyk">🛒</span>
                {numItems !== 0 && <div className="num-items"><span>{numItems}</span></div> }
            </div>
        </>
    )
}