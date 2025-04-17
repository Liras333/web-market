export default function Search({ inputItem, onInputItem }) {
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