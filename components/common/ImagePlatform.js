import React, {Component} from "react";
import {Image,Platform} from "react-native";
import {IOS} from "../../constants/constants";

export default class ImagePlatform extends Component {

    render() {

        return (
            <Image {...this.props} source={(Platform.os === IOS) ? this.props.imagen_ios : this.props.imagen_android}/>
        );
    }
}