import React from "react";
import "./LandingPage.css";
import NavBar1 from "./components/NavBar1";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";
import Footer from "./components/Footer1";

class LandingPage extends React.Component {
  render() {
    return (
      <div>
        <NavBar1 />
        <div className="Land-Body">
          <div className="flex-container-land">
            <div className="bg-image">
              <div className="content">
                <div className="we-can-fix">
                  Simplify,
                  <br /> Organize
                  <br /> And Conquer
                  <br /> Your Tasks.
                </div>

                <div className="text-container">
                  <div className="existing-text">
                    <div className="trusted-verified-and">
                      Effortlessly Manage and Organize Tasks. <br />
                      Boost Productivity and Efficiency. <br />
                      Streamline Daily Workflow and Collaboration. <br />
                      Stay Organized and in Control with Ease.
                    </div>
                  </div>
                  <Link to="/login">
                    <Button
                      style={{
                        backgroundColor: "#09e640",
                        width: "135px",
                        height: "50px",
                        fontSize: "18px",
                        borderRadius: "50px ",
                      }}>
                      Get Started
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default LandingPage;
