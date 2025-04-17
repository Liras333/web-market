import Item from './Item';
import {useState} from 'react'

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

export default function ListItems({ inputItem, onShowDescription, showDescription, setProduct, onAddItem }) {
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
