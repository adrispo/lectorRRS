import React, {Component} from "react";
import {Image, ScrollView, Text, View,Linking} from "react-native";
import {BLANC, DARK_PURPLE, PINK} from "../constants/colors";
import CustomParser from "../utils/CustomParser.util"


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
        const {navigation} = this.props;

        const article = navigation.getParam('article', null);
        console.log(article)
        return (
            <View style={{flex: 1}}>
                <Image style={{position: 'absolute', top: 0, height: 250, width: '100%', resizeMode: 'cover'}}
                       source={{uri: article.thumbnail}}/>
                <View style={{
                    position: 'absolute',
                    backgroundColor: PINK,
                    borderRadius: 10,
                    padding: 3,
                    paddingLeft: 10,
                    paddingRight: 10,
                    right: 8,
                    top: 170
                }}>
                    <Text style={{color: BLANC, fontSize: 14}} onPress={() => Linking.openURL(article.link)}>See on browser</Text>
                </View>
                <View style={{
                    marginTop: 200,
                    paddingTop: 10,
                    backgroundColor: BLANC,
                    borderTopLeftRadius: 16,
                    borderTopRightRadius: 16,
                    flex: 1,
                    paddingLeft: 16,
                    paddingRight: 16,
                }}>
                    <ScrollView>
                        <Text style={{fontSize: 18}}>{article.title}</Text>
                        <Text style={{fontSize: 12}}>{CustomParser.stripText(article.description)}</Text>
                    </ScrollView>
                </View>
            </View>
        );
    }
}
