const countryName = new URLSearchParams(location.search).get('name')
const flagImg=document.querySelector('img')
const countryNameH1=document.querySelector('.details-text-container h1')
const nativeName=document.querySelector('.native-name')
const population=document.querySelector('.population')
const region=document.querySelector('.region')
const subRegion=document.querySelector('.subregion')
const capital=document.querySelector('.capital')
const topLevelDomain=document.querySelector('.domain')
const currencies=document.querySelector('.currency')
const languages=document.querySelector('.lang')
const borderCountries = document.querySelector('.border-countries')
fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
  .then((res) => res.json())
  .then(([country]) => {
    console.log(country.borders);
    flagImg.src=country.flags.svg;
    flagImg.alt=country.name.common;
    countryNameH1.textContent=country.name.common;
    population.textContent=country.population.toLocaleString()
    region.textContent=country.region
    subRegion.textContent=country.subregion
    topLevelDomain.textContent=country.tld.join(', ')
    languages.textContent=Object.values(country.languages).join(', ')
    if (country.capital) {
        capital.innerText = country.capital?.[0]
      }
    if(country.currencies){
        currencies.innerText = Object.values(country.currencies)
        .map((currency) => currency.name)
        .join(', ')
    }
    if(country.name.nativeName){
      nativeName.textContent=country.name.nativeName[Object.keys(country.name.nativeName)[0]].common
    }
    else{
      nativeName.textContent=country.name.common
    }
    
    if(country.borders){
      country.borders.forEach(border => {
      fetch(`https://restcountries.com/v3.1/alpha/${border}`).then((res)=>res.json())
      .then(([data])=>{
          const countryTag=document.createElement('a')
          countryTag.innerText=data.name.common
          countryTag.href = `country.html?name=${data.name.common}`
          console.log(countryTag)
         borderCountries.append(countryTag)
      })

      });
  }
  })