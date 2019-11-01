import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {FuelBar} from './index'
import {logout} from '../store'
import profileImg from '../../public/imgs/profile.png'

const Navbar = ({handleClick, isLoggedIn}) => (
  <nav>
    {isLoggedIn && (
      <ul id="navbar">
        <li>
          <Link to="/">
            <p className="logo-text">Glacticode</p>
          </Link>
        </li>
        <li>
          <FuelBar />
        </li>
        <li>
          <a href="/account">
            <p className="profile-image"></p>
          </a>
        </li>
        {/* <li className="dropdown">
          <Link to="/account">Account</Link>
          <ul className="dropdown-content">
            <li>
              <Link to="/tutorial">Tutorial</Link>
            </li>
            <li>
              <a href="#" onClick={handleClick}>
                Logout
              </a>
            </li>
          </ul>
        </li> */}
      </ul>
    )}
  </nav>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
