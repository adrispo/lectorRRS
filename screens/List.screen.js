import React, {Component} from "react";
import {FlatList, Text, TextInput, StyleSheet, AsyncStorage, TouchableOpacity, View} from "react-native";
import ItemList from "../components/ItemList.component";
import {BLANC, DARK_PURPLE, GRAY_50, PINK, PURPLE} from "../constants/colors";
import ImagePlatform from "../components/common/ImagePlatform";
import CustomParser from "../utils/CustomParser.util"
import {URL_RSS} from "../constants/constants";

export default class List extends Component {
    //Header nav options
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
            <TouchableOpacity style={{padding: 4}} onPress={() => alert('Config Screen')}>
                <ImagePlatform style={{width: 40, height: 40}}
                               imagen_ios={require('../assest/images/header/config_ios.png')}
                               imagen_android={require('../assest/images/header/config_android.png')}/>
            </TouchableOpacity>
        ),
    };

    //constructor and state
    constructor(props) {
        super(props);
        this.state = {
            news: [], //Store all news
            newsSearch: [], //Store new filtered
            search_text: '', //search box
            off_line: false,
        }
    }

    //Component did mount
    componentDidMount() {
        let _this = this;

        return fetch(URL_RSS)
            .then((response) => {
                //throw true; //To test no connection or error on fetching
                let json = JSON.parse(response._bodyText);
                let news = noticias = json.items;
                _this.setState({
                    news: news,
                    newsSearch: news,
                });

                //Store news for No Conexion case
                AsyncStorage.setItem("news_backup", JSON.stringify(news));


            }).catch((err) => {
                console.log('fetch', err)
                AsyncStorage.getItem("news_backup").then((value) => {
                    _this.setState({
                        news: JSON.parse(value),
                        newsSearch: JSON.parse(value),
                        off_line: true,
                    });

                });
            })
    }

    //Function for go Details screen
    navegar = (article, image) => () => {
        this.props.navigation.navigate('Details', {
            article: article,
        });
    };

    //Search on array bu title
    searchFilterFunction = text => {
        this.setState({
            search_text: text,
        });
        const newData = this.state.news.filter(item => {
            const itemData = item.title.toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });
        this.setState({newsSearch: newData});
    };


    /**
     * Remder item list
     * @param article
     * @returns {XML}
     */
    renderRow(article) {
        return (
            <ItemList Action={this.navegar(article)} image={article.thumbnail} title={article.title}
                      description={CustomParser.stripText(article.description)}/>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header_container}>
                    <View>
                        <Text style={styles.texto_news}>News</Text>

                    </View>
                    <View style={styles.badge_news}>
                        <Text style={styles.text_badge}>{this.state.newsSearch.length}</Text>
                    </View>
                    <View style={styles.search_container}>
                        <View style={styles.flex}>
                            <TextInput
                                style={styles.search_input}
                                value={this.state.search_text}
                                placeholder='Search'
                                onChangeText={text => this.searchFilterFunction(text)}
                            />
                        </View>
                        <ImagePlatform
                            style={styles.search_image}
                            imagen_ios={require('../assest/images/list/lupa_ios.png')}
                            imagen_android={require('../assest/images/list/lupa_android.png')}/>
                    </View>

                </View>
                {(this.state.off_line) &&
                <Text style={styles.texto_offline}>Offline Mode</Text>
                }
                <View style={styles.list}>
                    <FlatList
                        style={styles.flex}
                        data={this.state.newsSearch}
                        renderItem={({item}) => this.renderRow(item)}
                        keyExtractor={item => item.pubDate}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    flex: {
        flex: 1,
    },
    container: {
        flex: 1,
        backgroundColor: PURPLE
    },
    header_container: {
        height: 70,
        marginBottom: 8,
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
        paddingLeft: 8
    },
    texto_news: {
        color: BLANC,
        fontSize: 30
    },
    texto_offline: {
        color: PINK,
        fontSize: 18,
        alignSelf:'center'
    },
    badge_news: {
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
    },
    text_badge: {
        color: BLANC,
        fontSize: 12
    },
    search_container: {
        height: 40,
        marginLeft: 16,
        marginRight: 8,
        flex: 1,
        backgroundColor: GRAY_50,
        borderRadius: 40,
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',

    },
    search_input: {
        marginLeft: 16,
        flex: 1,
        marginTop: 2,
        opacity: 0.5
    },
    search_image: {
        alignSelf: 'center',
        marginRight: 8,
        width: 20,
        height: 20,
        opacity: 0.3
    },
    list: {
        flex: 1,
        marginTop: 1
    }
});