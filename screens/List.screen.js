import React, {Component} from "react";
import {Text, View, ListView, Image, TextInput, Button, TouchableOpacity} from "react-native";
import {parseString} from 'react-native-xml2js';
import ItemList from "../components/ItemList.component";
import {BLANC, BLUE, DARK_PURPLE, GRAY, GRAY_50, PINK, PURPLE} from "../constants/colors";
import ImagePlatform from "../components/common/ImagePlatform";

let DomParser = require('react-native-html-parser').DOMParser;

export default class List extends Component {
    static navigationOptions = {
        title: 'Home',
        headerStyle: {
            backgroundColor: DARK_PURPLE,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
        headerRight: (
            <TouchableOpacity style={{padding:4}} onPress={() => alert('This is a button!')}>
                <ImagePlatform style={{width:40,height:40}} imagen_ios={require('../assest/images/header/config_ios.png')}
                               imagen_android={require('../assest/images/header/config_android.png')}/>
            </TouchableOpacity>
        ),
    };

    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows([]),
        }
    }

    renderRow(rowData) {
        console.log(rowData);
        let myRegex = /<img[^>]+src="(\/\/[^">]+)"/g;
        let doc = new DomParser().parseFromString(rowData.description.toString(), 'text/html');
        let image = myRegex.exec(rowData.description);
        let string = rowData.description.toString();
        return (
            <ItemList image={image[1]} title={rowData.title} description={rowData.description}/>
        )
    }

    componentDidMount() {
        let _this = this;
        return fetch('https://www.xatakandroid.com/tag/feeds/rss2.xml')
            .then(response => response.text())
            .then((response) => {
                parseString(response, function (err, result) {
                    let noticias = [];
                    noticias = result.rss.channel[0].item;
                    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                    _this.setState({
                        dataSource: ds.cloneWithRows(noticias)
                    })
                });
            }).catch((err) => {
                console.log('fetch', err)
            })
    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: PURPLE}}>
                <View style={{
                    height: 70,
                    marginBottom: 8,
                    flexDirection: 'row',
                    alignContent: 'center',
                    alignItems: 'center',
                    paddingLeft: 8
                }}>
                    <View>
                        <Text style={{color: BLANC, fontSize: 30}}>News</Text>
                    </View>
                    <View style={{
                        alignSelf: 'center',
                        justifyContent: 'center',
                        alignContent: 'center',
                        alignItems: 'center',
                        height: 20,
                        width: 20,
                        borderRadius: 20 / 2,
                        backgroundColor: PINK,
                        marginTop: 8,
                        marginLeft: 8,
                    }}>
                        <Text style={{color: BLANC, fontSize: 12}}>8</Text>
                    </View>
                    <View style={{
                        height: 40,
                        marginLeft: 16,
                        marginRight: 8,
                        flex: 1,
                        backgroundColor: GRAY_50,
                        borderRadius: 40,
                        flexDirection: 'row',
                        justifyItems: 'center',
                        alignContent: 'center',
                        alignItems: 'center',

                    }}>
                        <View style={{flex:1}}>
                            <TextInput
                                style={{marginLeft: 16, flex: 1, marginTop:2, opacity:0.5}}
                                value={this.state.text}
                                placeholder='Search'
                            />
                        </View>
                        <ImagePlatform
                            style={{alignSelf: 'center', marginRight: 8, width: 20, height: 20, opacity: 0.3}}
                            imagen_ios={require('../assest/images/list/lupa_ios.png')}
                            imagen_android={require('../assest/images/list/lupa_android.png')}/>
                    </View>
                </View>
                <View style={{flex: 1, marginTop: 1}}>
                    <ListView
                        style={{flex: 1}}
                        dataSource={this.state.dataSource}
                        renderRow={this.renderRow.bind(this)}
                        enableEmptySections
                    />
                </View>
            </View>
        );
    }
}
