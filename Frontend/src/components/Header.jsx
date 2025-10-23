import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user'));


  // Check if the current path matches the target URL
  const isSpecificPath = location.pathname === `/HotelCat/${location.state}`;
  console.log(isSpecificPath)

  return (
    <div>
      {/* Header Area Start */}
      <div
        className={`header__sticky one`}
       
      >
        <div className="header__area page"  style={{
          backgroundColor: isSpecificPath ? 'black' : 'transparent',
        }}>
          <div className="container custom__container">
            <div className="header__area-menubar">
              <div className="header__area-menubar-left">
                <div className="header__area-menubar-left-logo">
                  <Link to="/">
                    <img src="/assets/img/logo.png" alt="Logo" />
                  </Link>
                  <div className="responsive-menu"></div>
                </div>
              </div>
              <div className="header__area-menubar-right">
                <div className="header__area-menubar-right-menu menu-responsive">
                  <ul id="mobilemenu">
                    <li>
                      <Link to="/">Home</Link>
                    </li>
                    <li>
                      <Link to="RoomDetails">Rooms</Link>
                    </li>
                    <li>
                      <Link to="mybookings">My Bookings</Link>
                    </li>
                    <li className="menu-item-has-children">
                      <Link to="About">Pages</Link>
                      <ul className="sub-menu">
                        <li>
                          <Link to="About">About</Link>
                        </li>
                        <li>
                          <Link to="ServicesTeam">Team</Link>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <Link to="Contact">Contact</Link>
                    </li>
                  </ul>
                </div>
              </div>
              {!user && (
                <div className="header__area-menubar-right-box">
                  <div className="header__area-menubar-right-box-btn">
                    <a className="theme-btn" href="LoginPage">
                      Login<i className="fal fa-long-arrow-right"></i>
                    </a>
                  </div>
                </div>
              )}
              {user && (
                <div className="header__area-menubar-right-box">
                  <div className="header__area-menubar-right-box-btn">
                    <Link to="profile">
                      <i
                        style={{ color: 'white', fontSize: '30px' }}
                        className="far fa-user-circle"
                      ></i>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Header Area End */}
    </div>
  );
};

export default Header;
