import { useEffect, useState } from "react";
import countriesService from './services/countries';

function App() {
  const [value, setValue] = useState('');
  const [countries, setCountries] = useState([]);
  const [expandedCountry, setExpandedCountry] = useState(null);

  const filterCountrie = (e) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    if (value.trim() === '') {
      setCountries([]);
      setExpandedCountry(null);
      return;
    }

    countriesService
      .getCountries()
      .then((countriesData) => {
        const filteredCountries = countriesData.filter((c) =>
          c.name.common.toLowerCase().includes(value.toLowerCase())
        );
        setCountries(filteredCountries);
      })
      .catch((err) => {
        console.log(err);
        setCountries([]);
      });
  }, [value]);

  const toggleCountryDetails = (cca3) => {
    setExpandedCountry((prev) => (prev === cca3 ? null : cca3));
  };

  return (
    <div>
      find countries <input value={value} onChange={filterCountrie} />
      <div>
        {countries.length > 10 && <p>Too many matches, specify another filter</p>}

        {countries.length > 1 && countries.length <= 10 && (
          countries.map((c) => (
            <div key={c.cca3}>
              <p>
                {c.name.common}
                <button onClick={() => toggleCountryDetails(c.cca3)}>
                  {expandedCountry === c.cca3 ? 'Hide' : 'Show'}
                </button>
              </p>
              {expandedCountry === c.cca3 && (
                <div>
                  <h1>{c.name.common}</h1>
                  <p><strong>Capital:</strong> {c.capital?.[0]}</p>
                  <p><strong>Área:</strong> {c.area}</p>
                  <h2>Languages</h2>
                  <ul>
                    {Object.values(c.languages || {}).map((lang, idx) => (
                      <li key={idx}>{lang}</li>
                    ))}
                  </ul>
                  <img src={c.flags.png} alt={`Bandera de ${c.name.common}`} width="150" />
                </div>
              )}
            </div>
          ))
        )}

        {countries.length === 1 && (
          countries.map((c) => (
            <div key={c.cca3}>
              <h1>{c.name.common}</h1>
              <p><strong>Capital:</strong> {c.capital?.[0]}</p>
              <p><strong>Área:</strong> {c.area}</p>
              <h2>Languages</h2>
              <ul>
                {Object.values(c.languages || {}).map((lang, idx) => (
                  <li key={idx}>{lang}</li>
                ))}
              </ul>
              <img src={c.flags.png} alt={`Bandera de ${c.name.common}`} width="150" />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
