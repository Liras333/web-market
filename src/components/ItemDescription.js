export default function ItemDescription({ product, onAddItem }) {
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