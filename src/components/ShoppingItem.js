export default function ShoppingItem({ item, onDeleteItem }) {

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
