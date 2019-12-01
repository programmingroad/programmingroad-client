import React, {Component} from "react";
import {Carousel} from "antd";
import jpg1 from '../../../assets/images/1.jpg'
import jpg2 from '../../../assets/images/2.jpg'
import jpg3 from '../../../assets/images/3.jpg'
import jpg4 from '../../../assets/images/4.jpg'
import jpg5 from '../../../assets/images/5.jpg'
import jpg6 from '../../../assets/images/6.jpg'

import './index.less'

class HomeHeader extends Component {


    render() {
        return (
            <Carousel autoplay className={"home-header-ant-carousel"}>
                <img src={jpg1}/>
                <img src={jpg2}/>
                <img src={jpg3}/>
                <img src={jpg4}/>
                <img src={jpg5}/>
                <img src={jpg6}/>
            </Carousel>
        )
    }
}

export default HomeHeader;