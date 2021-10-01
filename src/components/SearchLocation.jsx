import React,{useState,useEffect,useRef} from 'react';
import './HomePage.scss'
import logo from '../Images/cloudy.png'
import PlacesAutocomplete ,{geocodeByAddress,
    getLatLng}from 'react-places-autocomplete';


const SearchLocation = (props) => {
    const[location,setLocation] = useState('');
    const[coordinates,setCoordinates] = useState({lat:'',lng:''})
    const[weatherPage,setWeatherPage] = useState(false)
    const fetchData = useRef(()=>{});
    

    const handleSelect = async value=>
    {
        const coords = await geocodeByAddress(value);
        const latlng = await getLatLng(coords[0])
        setCoordinates(latlng)
        setLocation(value)
    };
    
    function displayWeather(e){
        e.preventDefault();
        if(location.trim()==='')
        {
            alert('Please enter a valid location')
            setWeatherPage(false)
        }
        else{
        setWeatherPage(prevWeatherPage=>!prevWeatherPage);
        }
    }

    fetchData.current = ()=>{
    props.weatherInfo(weatherPage)
    props.cityInfo(location)
    props.coordsInfo(coordinates)
}
    useEffect(()=>{
       fetchData.current();
    },[weatherPage])


    return (
        <React.Fragment>  
        {!weatherPage && 
        <PlacesAutocomplete value={location} onChange={setLocation} onSelect={handleSelect}>
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
                <div className='weatheryy-banner'>
                    <div>
                        <img src={logo} alt='logo' className='Weatheryy-Logo__SearchPage'></img>
                    </div>
                    <div>
                        <p className='Weatheryy-Intro__SearchPage'>WEATHERYY</p>
                    </div>
                </div>
                <div className='form-container'>
            <form onSubmit={displayWeather}>
                <div style={{position:'relative',display:'inline'}}>
                <input {...getInputProps({placeholder: 'Enter Location'})}/>
                </div>
                <div className="autocomplete-dropdown-container" >
                {suggestions.map(suggestion => {
                    suggestion.id = suggestion.description;
                    const style = suggestion.active ? { backgroundColor: '#ccc', cursor: 'pointer'}: { backgroundColor: '#ffffff', cursor: 'pointer' };
                    return (  
                    <div className='input-suggestion' {...getSuggestionItemProps(suggestion, {style})}>                  
                        <p> <i className="material-icons">location_on</i><span>{suggestion.description}</span></p>
                    </div>
                    );
                })}
                </div>
                <button className='Weatheryy-Start-Button Search-Button'><span>Search</span></button>
                </form>
                </div>
          </div>
        )}
      </PlacesAutocomplete>}
      </React.Fragment>
     );
}
 
export default SearchLocation;


