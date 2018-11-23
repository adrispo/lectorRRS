import React, {Component} from "react";
import {Image, Text, View, StyleSheet, TouchableOpacity} from "react-native";
import {BLANC} from "../constants/colors";

export default class ItemList extends Component {
    cropText(text, size) {
        console.log(size)
        let x = text;
        if (text) {
            if (text.length > size - 1) {
                return x.substring(0, size) + "...";

            } else {
                return text;
            }
        }
    }

    render() {
        const {image, title, description,} = this.props;

        return (

            <TouchableOpacity onPress={()=>alert("Navegar")} style={styles.container}>
                <View style={styles.image_container}>
                    <Image style={styles.image} source={{uri: 'http://' + image}}/>
                </View>
                <View style={styles.new_container}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.description}>{this.cropText((description).toString(), 46)}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 200,
        paddingRight: 16,
        margin: 8,
        borderRadius: 8,
        backgroundColor: BLANC
    },
    image_container: {
        padding:16,
        width:150,

    },
    image: {
        borderRadius: 8,
        flex: 1,
        resizeMode: 'cover'
    },
    new_container: {
        flex: 1,
        padding: 8,
        paddingTop:14
    },
    title: {
        fontStyle:'italic',
        fontWeight: 'bold',
        fontSize: 14
    },
    description: {
        fontSize: 12
    },
    item_button: {
        paddingRight: 8,
        alignItems: 'center',
        justifyContent: 'center'
    }
});