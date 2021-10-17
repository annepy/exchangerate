import './App.css';
import {useState} from 'react';

const URL ='http://api.exchangeratesapi.io/v1/latest?access_key=';
const API_KEY = 'bf46865c497a876f6c37aa6f8b81010d';

function App() {
 const [eur,setEur] = useState(0);
 const [gbp,setGbp] = useState(0);
 const [rate,setRate] = useState(0);

 async function convert(e) {
   e.preventDefault();
   try {
     const adress = URL + API_KEY;
     const response = await fetch(adress);

     if (response.ok) {
       const json = await response.json();
       setRate(json.rates.GBP)

       setGbp(eur * json.rates.GBP);
     } else {
       alert("Error retrieving exchange rate.")
     }
   } catch (err){
     alert(err)
   }
 }

 return (
   <div id="container">
     <form onSubmit={convert}>
       <div>
         <label>Eur</label>&nbsp;
         <input type="number" step="0.01"
         value={eur} onChange={e => setEur(e.target.value)} />
         <output>{rate}</output>
       </div>
       <div>
         <label>Gbp</label>
         <output>{gbp.toFixed(2)} €</output>
       </div>
       <button>Calculate</button>
     </form>
   </div>
 )
}

export default App;
