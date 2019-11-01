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
    return (
      <div className="planet-select">
        <div className="planet-header">
          <h2>SELECT A PLANET</h2>
          { images && <Coverflow
          width={960}
          height={480}
          displayQuantityOfSide={2}
          navigation={true}
          enableHeading
          // media={{
          //   width:'800px',
          //   height:'500px'
          // }}
          >
            {images}
          </Coverflow>}
        </div>
           {/* // return (
            //   <div
            //     className="planet-img"
            //     id={`planet${planet.id}`}
            //     key={planet.id}
            //   >
            //     {src !== '/Gray_Planet.png' ? (
            //       <Link to={`/planet/${planet.id}`} onClick={handleClick()} >
            //         <img src={`${src}`} width="150" height="150" />
            //         <p>{planet.name}</p>
            //       </Link>
            //     ) : (
            //         <div>
            //           <img src={`${src}`} width="150" height="150" />
            //           <p>{planet.name}</p>
            //         </div>
            //       )}
            //   </div>
    // ) */}
      </div>
    )
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
