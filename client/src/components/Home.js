import { createCollection } from "../providers/Web3Provider";

function Home() {
    return (
        <div>
            Home
            <input id="collection-name"></input>
            <input id="collection-symbol"></input>
            <input id="collection-mintprice"></input>
            <button onClick={async () => {
                await createCollection(
                    document.getElementById("collection-name").value,
                    document.getElementById("collection-symbol").value,
                    document.getElementById("collection-mintprice").value)
            }}>
                Create Collection
            </button>
        </div>
    )
}

export default Home;