
import React, {Component} from "react";
import {Image, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {BLANC, DARK_PURPLE, GRAY_50, PINK} from "../constants/colors";
import ImagePlatform from "../components/common/ImagePlatform";

export default class Details extends Component {
    static navigationOptions = {
        title: 'Home',
        headerStyle: {
            backgroundColor: DARK_PURPLE,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    };
    render() {
        const{navigation} = this.props;

        const article = navigation.getParam('article', null);

        return (
            <View style={{ flex: 1}}>
                <Image style={{position:'absolute',top:0,height:250, width:'100%', resizeMode:'cover'}} source={{uri: article.thumbnail}}/>
                <ScrollView style={{ marginTop:245,backgroundColor:BLANC, borderTopLeftRadius:4, borderTopRightRadius:4,flex:1}}>
                    <Text style={{}}>{article.title}</Text>
                </ScrollView>
            </View>
        );
    }
}
