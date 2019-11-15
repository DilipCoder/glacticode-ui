import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { getAllPlanets, getUnlockedPlanets } from '../store'
import { connect } from 'react-redux'
import Coverflow from 'react-coverflow';
import {StyleRoot} from 'radium';

const planetImg = (unlocked, planet) => {
  const found = unlocked.find(
    unlockedPlanet => unlockedPlanet.name === planet.name
  )
  if (found) return planet.unlockedImg
  else return planet.lockedImg
}
const handleClick = () => {
  const background = document.getElementById('background')
  const stars = document.getElementById('stars')
  return () => {
    document.body.removeChild(background)
    document.body.removeChild(stars)
  }
}

class Home extends Component {
  state = {
    index: 1
  }

  prevBtn = () => {
    console.log("prev")
    let {index} = this.state
    if(index <= 0){
      return
    } else {
      let newIndex = index - 1
      this.setState({index:newIndex})
    }
    this.props.planets.length
  }
  nextBtn = () => {
    let {index} = this.state
    if (index < this.props.planets.length - 1){
      let newIndex = index + 1
      this.setState({index:newIndex})
    } else {
      return
    }
  }
  componentDidMount() {
    this.props.fetchPlanets()
    this.props.fetchUnlockedPlanets(this.props.user.id)
  }

  render() {
    let bg = document.getElementById('bg');
    bg.className += " bg-image";
    const { planets, unlockedPlanets } = this.props
    const images = planets && unlockedPlanets && planets.map(planet => {
            const src = planetImg(unlockedPlanets, planet)
            if (src !== '/Gray_Planet.png'){
              return(
                    <img src={`${src}`} alt={planet.name} data-action={`/planet/${planet.id}`} key={planet.id}/>
              )
            } else{
              return(
                <img src={`${src}`} alt={planet.name} key={planet.id}/>
              )
            }});

    console.log("home rendered");
    return(
      <div className="container-fluid" style={{marginTop:'200px'}}>
      <div className="row">
        <div className="col-md-6" style={{marginTop:'-150px'}}>
          <img src={require('../../public/imgs/Astronout.png')} alt="astronouts" style={{height:'900px'}}/>
        </div>
        <div className="col-md-6" style={{alignItems:'center'}}>
          <div className="planet-select">
            <div className="planet-header">
              <h2>SELECT A PLANET</h2>
              <div className="button-select-group">
                <img src={require('../../public/imgs/preview.png')} alt="preview" onClick={()=>this.prevBtn()}/>
                <img src={require('../../public/imgs/next.png')} alt="preview" onClick={()=>this.nextBtn()}/>
              </div>
              { images && <Coverflow
            width={960}
            height={480}
            displayQuantityOfSide={2}
            active={this.state.index}
            >
                {images}
              </Coverflow>}
          </div>
        </div>
        </div>
      </div>
      </div>
    )
    // return (
    //   <div className="planet-select">
    //     <div className="planet-header">
    //       <h2>SELECT A PLANET</h2>
    //       { images && <Coverflow
    //       width={960}
    //       height={480}
    //       displayQuantityOfSide={2}
    //       navigation={true}
    //       enableHeading
    //       >
    //         {images}
    //       </Coverflow>}
    //     </div>
    //   </div>
    // )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  planets: state.planets.allPlanets,
  unlockedPlanets: state.planets.unlockedPlanets
})

const mapDispatchToProps = dispatch => ({
  fetchPlanets: () => dispatch(getAllPlanets()),
  fetchUnlockedPlanets: userId => dispatch(getUnlockedPlanets(userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
