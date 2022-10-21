import React,{Component} from "react";
import Slideshow from 'react-native-image-slider-show'; 
import { LogBox } from "react-native";

LogBox.ignoreAllLogs()

export default class Slider extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        position: 1,
        interval: null,
        dataSource: [
            {
              url:require("../../assets/images/BANNER-FLOOD.jpg")      
            },
            {

         url: require("../../assets/images/1.jpg")
       },{
        url:require("../../assets/images/new.jpg")
       } ],
      };
    }

     
  
    componentWillMount() {
      this.setState({
        interval: setInterval(() => {
          this.setState({
            position: this.state.position === this.state.dataSource.length ? 0 : this.state.position + 1
          });
        }, 2000)
      });
     
    }
  
   
  
    render() {
      return (
      <Slideshow 
          dataSource={this.state.dataSource}
          position={this.state.position}
          onPositionChanged={position => this.setState({ position })}/>
      );
    }
  }