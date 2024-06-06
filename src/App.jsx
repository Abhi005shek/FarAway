import { useState } from 'react'
import "./App.css"

function App() {
  const [items, setItems] = useState([]);


  function addItems(a){
    setItems(items => [a, ...items]);
  }
  
  function delItems(id){
    setItems(items => items.filter( i => i.id !== id));
  }

  function updateItems(id){
    setItems(items => items.map(item => item.id === id ? {...item, packed: !item.packed} : item ));
  }

  function clearList(){
    setItems([]);
  }

  return (
    <>
      <div className='app'>
        <Logo/>
        <From onAdd={addItems} />
        <PackingList items={items} onDelete={delItems} onUpdate={updateItems} onClear={clearList}/>
        <Stats items={items} />
      </div>

    </>
  )
}

export default App


function Logo(){
  return (
    <>
    <h1>🌴🥥 Far Away 👜</h1>
    </>
  ) 
}


function From({onAdd}){

  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e){
    e.preventDefault();

    if(!description) return;
    // const date= new Date();
    const a = {id: Date.now(), description, quantity, packed: false}
    onAdd(a);
    setDescription('');
    setQuantity(1);
    console.log(items)
    }

  return (
    <>
    <form className='add-form' onSubmit={handleSubmit}>
      
    <h3>What do you need for your trip?</h3>

    <select value={quantity} onChange={(e) => setQuantity(+(e.target.value))}>
        {  
          // console.log(Array.from({length: 20}, (_,i) => i+1))
          [1,2,3,4,5,6,7,8,,9,10,11,12,13,14,15].map(num => {
           return <option value={num} key={num}>{num}</option>
          })
        }
      </select>

    <input type="text" placeholder='Enter Items' value={description} onChange={(e) => setDescription(e.target.value)}/>
    <button>Add</button>
    </form>
    </>
  ) 
}

function PackingList({items, onDelete, onUpdate, onClear}){

  const [sortby, setSortby] = useState('input');

  let sortedItems;

  if(sortby === 'input')  sortedItems = items;

  if(sortby === 'description')  sortedItems = items.slice().sort((a,b) => a.description.localeCompare(b.description));
  
  if(sortby === 'packed')  sortedItems = items.slice().sort((a,b) => Number(a.packed) - Number(b.packed) );


  return (
    <>
    <div className='packList'>
      <ul>
        {
          sortedItems.map(i => (
            <li key={i.id}>
              <input type="checkbox" value={i.packed} onChange={()=> onUpdate(i.id)}/>
              
              <span style={{textDecoration : i.packed ? 'line-through' : 'none'}}>
                {i.quantity} {i.description}
              </span>
              <button className='listBtn' onClick={() => onDelete(i.id)}>❌</button></li>
          ))
        }
      </ul>

      <div className='container'>
        <select value={sortby} onChange={(e) => setSortby(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
        <button onClick={() => onClear()}>Clear List</button>
      </div>
    </div>
    </>
  ) 
}

function Stats({items}){
  let numItems;
   let numPacked
   let percentage
  if(items.length){
   numItems = items.length;
   numPacked = items.filter( item => item.packed ).length;
   percentage = Math.round(numPacked / numItems * 100);
  }
  else{
   numItems = 0;
  // const numPacked = items.filter( item => item.packed ).length;
   percentage = 0;
  }


  return (
    <>
    <footer>
      {percentage === 100 ? 
        'You Got Everything. Ready To Go ✈️' :
        `You have ${numItems} items on your list. You already packed (${percentage}%)` 
      } 
      </footer>
    </>
  ) 
}