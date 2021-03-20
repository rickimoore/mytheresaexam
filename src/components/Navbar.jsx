import React from "react";
import NavBarCart from "./nav-cart/NavBarCart";
import { Link } from "react-router-dom";

class Navbar extends React.Component {
    render() {
        return (
            <div className="nav-container white-nav">
                <div className="nav-content flex-row justify-apart">
                    <div>
                        <Link to={'/'}><span className="nav-logo">PopRocks</span></Link>
                    </div>
                    <NavBarCart/>
                </div>
            </div>
        )
    }
}

export default Navbar;