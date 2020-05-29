import React, { useState, useEffect } from 'react';
import './App.css';


function App() {
  const [apiData, setApiData] = useState([])
  const [displayCountries, setDisplayCountries] = useState(["EUR", "USD", "AUD", "GBP", "BRL"])
  function fetchAPIData() {
    let dropdown = document.querySelector('#date-dropdown');
    let year = dropdown.options[dropdown.selectedIndex].value;
    fetch(`https://api.exchangeratesapi.io/${year}-01-01?base=USD`)
    .then(response => response.json())
    .then(data => {
    const newData = Object.entries(data.rates);
    newData.sort()
    setApiData(newData)
    });
  }

  useEffect(fetchAPIData, []);

  function calculateBarHeight(exchangeRate) {
    let height = 50 / exchangeRate
    return height
  }

  return (
        <div class="graph">
          <div class="graph-top">
            <div class="graph-title">Yearly Currency Rates in USD</div>
            <select onChange={fetchAPIData} name="dates" id="date-dropdown">
              <option value="2000">2000</option>
              <option value="2001">2001</option>
              <option value="2002">2002</option>
              <option value="2003">2003</option>
              <option value="2004">2004</option>
              <option value="2005">2005</option>
              <option value="2006">2006</option>
              <option value="2007">2007</option>
              <option value="2008">2008</option>
              <option value="2009">2009</option>
              <option value="2010">2010</option>
              <option value="2011">2011</option>
              <option value="2012">2012</option>
              <option value="2013">2013</option>
              <option value="2014">2014</option>
              <option value="2015">2015</option>
              <option value="2016">2016</option>
              <option value="2017">2017</option>
              <option value="2018">2018</option>
              <option value="2019">2019</option>
              <option value="2020">2020</option>
            </select>
          </div>
          <div className="graph-data" id="graph-location">
          {
            apiData.filter(([currency, exchangeRate]) => displayCountries.includes(currency)).map(([currency, exchangeRate]) => (
            <div 
            className="graph-data-bar" 
            onClick={() => alert(`1 USD = ${exchangeRate.toFixed(2)} ${currency}`)} 
            style= {{height: calculateBarHeight(exchangeRate)+ "%"}}>
              <div class="graph-data-bar-country-name">
            {currency}
            </div>
            </div>
            ))
          }
          </div>
        </div>
  );
}

export default App;
