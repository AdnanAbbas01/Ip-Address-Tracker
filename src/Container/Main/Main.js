import React, { Component } from "react";
import Search from "../../Component/Search/Search";
import { MapContainer, TileLayer, Marker, Popup,useMap } from 'react-leaflet'
import '../../App.css';
import Spinner from "../../Spinner/Spinner";
import axios from "axios";
import withErrorHandler from "../../HOC/errorHandler";

function ChangeMapView({ coords }) {
  const map = useMap();
  map.setView(coords, map.getZoom());

  return null;
}
class Main extends Component {
    
    state = {
      ipAddress: null,
      input: null,
      spinner: false
    }
    
    componentDidMount () {
      this.setState({spinner: true});

      axios.get(`https://geo.ipify.org/api/v1?apiKey=at_QMDHvMnViLTywGbqYurRy9NkvsLvV&ipAddress`)
      .then(res => {
         this.setState({ipAddress: res.data, spinner: false})
      })
      .catch(error => {
         this.setState({spinner: false});
      })
    }

    inputHandler = (event) => {
     this.setState({input: event.target.value});
    }

    clickedHandler = () => {
      if(this.state.input){
      this.setState({spinner: true});
      axios.get(`https://geo.ipify.org/api/v1?apiKey=at_QMDHvMnViLTywGbqYurRy9NkvsLvV&ipAddress=${this.state.input}`)
      .then(res=>{
        this.setState({ipAddress:res.data,spinner:false})
      })
      .catch(error=>{
        this.setState({spinner:false});
      })
    }
    }

    render(){
      let search = null;
      let map = null;
      if(this.state.ipAddress){
        search = <Search ipAddress = {this.state.ipAddress.ip}
        city={this.state.ipAddress.location.city}
        country = {this.state.ipAddress.location.country}
        timezone={this.state.ipAddress.location.timezone}
        isp={this.state.ipAddress.isp}
        changed = {this.inputHandler}
        clicked={this.clickedHandler}
        show={this.state.spinner}
        />

        map =  <MapContainer center={[this.state.ipAddress.location.lat, this.state.ipAddress.location.lng]} zoom={30} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
         />
         <ChangeMapView coords={[this.state.ipAddress.location.lat, this.state.ipAddress.location.lng]} />
        <Marker position={[this.state.ipAddress.location.lat, this.state.ipAddress.location.lng]}>
         <Popup >
           <div>
             <h1>Hello Guys</h1>
           </div>
         </Popup>
        </Marker>
      </MapContainer>
      }
        return(
         <div>
             {search}
             {this.state.spinner?<Spinner /> : map}
             </div>
         
        )
    }
}

export default withErrorHandler(Main, axios);