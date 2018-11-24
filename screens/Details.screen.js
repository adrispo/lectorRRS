import React, {Component} from "react";
import {Image, ScrollView, Text, StyleSheet, View, Linking} from "react-native";
import {BLANC, DARK_PURPLE, PINK} from "../constants/colors";
import CustomParser from "../utils/CustomParser.util"


export default class Details extends Component {
    //Navigation header options
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
        return (
            <View style={styles.flex}>
                <Image style={styles.image}
                       source={{uri: article.thumbnail}}/>
                <View style={styles.open_web}>
                    <Text style={styles.text_open_web} onPress={() => Linking.openURL(article.link)}>See on
                        browser</Text>
                </View>
                <View style={styles.description_container}>
                    <ScrollView>
                        <Text style={styles.texto_title}>{article.title}</Text>
                        <Text style={styles.texto_description}>{CustomParser.stripText(article.description)}</Text>
                    </ScrollView>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    flex: {
        flex: 1
    },
    image: {
        position: 'absolute',
        top: 0,
        height: 250,
        width: '100%',
        resizeMode: 'cover'
    },
    open_web: {
        position: 'absolute',
        backgroundColor: PINK,
        borderRadius: 10,
        padding: 3,
        paddingLeft: 10,
        paddingRight: 10,
        right: 8,
        top: 170
    },
    text_open_web: {
        color: BLANC,
        fontSize: 14
    },
    description_container: {
        marginTop: 200,
        paddingTop: 10,
        backgroundColor: BLANC,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        flex: 1,
        paddingLeft: 16,
        paddingRight: 16,
    },
    texto_title:{
        fontSize:18
    },
    texto_description:{
        fontSize:12
    }
});