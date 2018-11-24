import React, {Component} from "react";
import {Image, Text, View, StyleSheet, TouchableOpacity} from "react-native";
import {BLANC} from "../constants/colors";
import CustomParser from "../utils/CustomParser.util"
export default class ItemList extends Component {

    render() {
        const {image, title, description,Action} = this.props;
        return (

            <TouchableOpacity onPress={Action} style={styles.container}>
                <View style={styles.image_container}>
                    <Image style={styles.image} source={{uri: image}}/>
                </View>
                <View style={styles.new_container}>
                    <Text style={styles.title}>{title}</Text>

                    <Text style={styles.description}>{CustomParser.cropText((description).toString(), 90)}</Text>
                    <View style={styles.continue_readring}>
                        <Text>Continue reading...</Text>
                    </View>
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
    continue_readring: {
        position:'absolute',
        bottom: 0,
        right:0
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