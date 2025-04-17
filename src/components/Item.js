export default function Item({ item, inputItem, itemClicked, setItemClicked, num, onShowDescription, setProduct, onAddItem }) {
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