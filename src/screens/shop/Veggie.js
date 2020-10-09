import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    FlatList,
    Alert
} from 'react-native';
import RoundCheckbox from 'rn-round-checkbox';


export default class Veggie extends Component {

    constructor(){
        super()
        this.state={
            DATA : [
                {

                    title: 'Lettuce',
                    image: 'https://pictures.grocerapps.com/Untitled_design1982.png',
                    value: false
                },
                {

                    title: 'Spinach',
                    image: 'http://www.koshercrops.com/uploads/9/4/4/1/9441768/s425178637313967570_p2_i1_w640.jpeg',
                    value: false
                },
                {

                    title: 'Tomato',
                    image: 'https://cdn1-www-wholesomebabyfood.momtastic.com/assets/uploads/2015/04/tomato.jpg',
                    value: false
                },
                {

                    title: 'Onion',
                    image: 'https://imagevars.gulfnews.com/2019/09/20/190920-onion-_16d4fa56edd_large.jpg',
                    value: false
                },
            ]
        }
    }




    onClick=(index)=> { 
        // this.props._Veggie(index)
      };

  

 
    render() {
        
        return (
            <View style={styles.container}>
                <Text style={{fontSize:16,fontWeight:'bold',color:'black'}}>Vegetable</Text>
                <FlatList
                    data={this.state.DATA}
                    renderItem={({ item ,index }) =>
                        <View style={{ flexDirection: 'row', }}>
                            <Image
                                style={styles.image}
                                resizeMode='contain'
                                source={{ uri: item.image }}
                            />
                            <Text style={styles.text}>{item.title}</Text>  
            
                          <View style={styles.round}>
                            <RoundCheckbox
                                size={24}
                                checked={item.value}
                                onValueChange={() => this.onClick(index) }

                            />
                            </View>
                        </View>
                    }
                    keyExtractor={item => item.id}
                />
               
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginVertical: 20
    },
    text:{
        fontSize: 14, 
        color: 'black', 
        fontWeight: '500', 
        textAlign: 'left', 
        marginHorizontal: 10, 
        flex: 6, 
        margin: 10 
    },
    image:{
        height: 30, 
        width: 30, 
        margin: 10, 
        flex: 1
    },
    round:{
        flex:1,
        margin:10,
    }
});



