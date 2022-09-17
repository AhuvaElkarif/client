import React from "react";
import Carousel from "react-material-ui-carousel";
import autoBind from "auto-bind";
import "./Carousel.css";

import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Grid,
    Button
} from "@material-ui/core";

//קומפוננטה עם כותרת משפט וכפתור
function Banner(props) {
    const item = props.item;
    return (
        <Card raised className="Banner" style={{ height: "500px", width: "500px" }}>
            <Grid container spacing={0} className="BannerGrid" >
                {item.type == "img" ?
                    <CardMedia className="Media" image={item.src} title={"src"} style={{ height: "500px", width: "500px" }} />
                    : <CardMedia component='iframe' title='test' src={item.src} style={{ height: "500px", width: "500px" }} muted/>
                }
            </Grid>
        </Card>
    );
}

//מערך תמונות
const items = [
    { type: "img", src: "/images/14.jpg" },
    { type: "video", src: "/videos/WhatsApp Video 2022-07-21 at 13.35.58.mp4" },
    { type: "img", src: "/images/14.jpg" },
    { type: "img", src: "/images/14-355x236.jpg" }
];

class BannerExample extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            autoPlay: true,
            animation: "fade",
            indicators: true,
            timeout: 500,
            navButtonsAlwaysVisible: false,
            navButtonsAlwaysInvisible: false,
            cycleNavigation: true
        };

        autoBind(this);
    }

    toggleAutoPlay() {
        this.setState({
            autoPlay: !this.state.autoPlay
        });
    }

    toggleIndicators() {
        this.setState({
            indicators: !this.state.indicators
        });
    }

    toggleNavButtonsAlwaysVisible() {
        this.setState({
            navButtonsAlwaysVisible: !this.state.navButtonsAlwaysVisible
        });
    }

    toggleNavButtonsAlwaysInvisible() {
        this.setState({
            navButtonsAlwaysInvisible: !this.state.navButtonsAlwaysInvisible
        });
    }

    toggleCycleNavigation() {
        this.setState({
            cycleNavigation: !this.state.cycleNavigation
        });
    }

    changeAnimation(event) {
        this.setState({
            animation: event.target.value
        });
    }

    changeTimeout(event, value) {
        this.setState({
            timeout: value
        });
    }

    render() {
        return (
            <div style={{ marginTop: "50px", color: "#494949", height: "500px", width: "500px" }} id="ert">
                {/* <h2>3 Items layout - StackOverflow - Yotam</h2> */}

                <Carousel
                    className="Example"
                    autoPlay={this.state.autoPlay}
                    animation={this.state.animation}
                    indicators={this.state.indicators}
                    timeout={this.state.timeout}
                    cycleNavigation={this.state.cycleNavigation}
                    navButtonsAlwaysVisible={this.state.navButtonsAlwaysVisible}
                    navButtonsAlwaysInvisible={this.state.navButtonsAlwaysInvisible}
                    next={(now, previous) =>
                        console.log(
                            `Next User Callback: Now displaying child${now}. Previously displayed child${previous}`
                        )
                    }
                    prev={(now, previous) =>
                        console.log(
                            `Prev User Callback: Now displaying child${now}. Previously displayed child${previous}`
                        )
                    }
                    onChange={(now, previous) =>
                        console.log(
                            `OnChange User Callback: Now displaying child${now}. Previously displayed child${previous}`
                        )
                    }
                // fullHeightHover={false}
                // navButtonsProps={{style: {backgroundColor: 'cornflowerblue', borderRadius: 0}}}
                // navButtonsWrapperProps={{style: {bottom: '0', top: 'unset', }}}
                // indicatorContainerProps={{style: {margin: "20px"}}}
                // NextIcon='next'
                >
                    {items.map((item, index) => {
                        return (
                            <Banner
                                item={item}
                                key={index}
                            />
                        );
                    })}
                </Carousel>
            </div>
        );
    }
}

export default BannerExample;


