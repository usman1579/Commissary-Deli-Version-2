import React, { useState, Component } from 'react';
import { Picker, Text, Alert, TouchableOpacity, View, Modal, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { fetchLocation, setLocation } from '../../../modules/Locator/action';
import { LocationSelector, setLocationSelector } from '../../../modules/Locator/selector';
import { ScrollView } from 'react-native-gesture-handler';
import { clearCart } from '../../../modules/cart/actions';



class Locator extends Component {
    constructor() {
        super()
        this.state = {
            selectedid: '',
            selectedName: '',
            visible: false
        }
    }

    componentDidMount() {
        this.props.dispatch(fetchLocation());
    }

    changeLocation = (x) => {

        Alert.alert(
            "Warning",
            "Empty your cart and change locations?",
            [
                {
                    text: "Stay",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "OK", onPress: () => this.OkChange(x) }
            ],
            { cancelable: false }
        );
    }

    OkChange = (x) => {
        this.props.dispatch(setLocation(x))
        this.props.dispatch(clearCart())
        this.setState({
            visible:false
        })
    }

    render() {
        const { Locator } = this.props;
        const Loc = Locator.Location;


        
        return (

            <>
                <View >
                    <TouchableOpacity
                        style={{ height: 40, paddingVertical: 2, paddingHorizontal: 20, borderRadius: 5, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', alignSelf: "center", marginVertical: 10 }}
                        onPress={() => this.setState({
                            visible: true
                        })}>
                        <Text style={{ color: 'lightgrey', fontSize: 12 }}>Location </Text>
                        <Text style={{ color: '#657280', fontWeight: 'bold' }}>{Locator.selectedLocation.name == '' ? 'Please select Location' : Locator.selectedLocation.name} &#9660;</Text>
                    </TouchableOpacity>
                </View>

                <Modal
                    transparent={true}
                    animationType={'none'}
                    visible={this.state.visible}
                    onRequestClose={() => {
                        this.setState({ visible: false })
                    }}>
                    <View style={styles.modalBackground}>
                        <View style={{ height: '40%', width: '95%', backgroundColor: '#ffffff94', borderRadius: 10 }}>
                            <TouchableOpacity
                                onPress={() => this.setState({ visible: false })}
                                style={{ height: 30, width: 30, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black', alignSelf: 'flex-end' }}>
                                <Text style={{ color: 'white', fontWeight: 'bold' }}>
                                    X
              </Text>
                            </TouchableOpacity>

                            {/* <Text style={{ alignSelf: 'center', position: 'absolute', top: 5, alignItems: 'center', fontWeight: '700', fontSize: 14, color: 'black' }}> Select Location </Text> */}

                            <ScrollView>
                                {Loc.map(x => {
                                    return (
                                        <View style={styles.Shadow}>
                                            <TouchableOpacity
                                             onPress={()=>  this.changeLocation(x)}
                                                style={{ justifyContent: 'center', alignItems: 'center', height: 40, width: 200, borderRadius: 4,marginTop:10, backgroundColor: x.name == Locator.selectedLocation.name ? '#cae3fc' : 'white', alignSelf: 'center' }}>
                                                <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'black' }}>
                                                    {x.name}
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    )
                                })}

                                
                            </ScrollView>

                            <Text style={{ padding: 4, backgroundColor: '#fff', alignSelf: 'center', position: 'absolute', bottom: 5, alignItems: 'center', fontSize: 10, color: 'black' }}> Note: change Location will empty your cart </Text>

                        </View>
                    </View>
                </Modal>
                {/* <Picker
                    onValueChange={(label, value) => {
                        this.changeLocation(label, value)
                    }}
                    selectedValue={this.state.selectedName}>
                    {Loc.map(x => {
                        return (
                            <Picker.Item label={x.name} value={x.id} />
                        )
                    })}
                </Picker> */}

            </>
        )
    }
}

const mapStateToProps = (state) => ({
    Locator: LocationSelector(state),
    selectedLocation: setLocationSelector(state)
});

export default connect(mapStateToProps)(Locator);


const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#ffffff94',
    },
    Shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.125,
        shadowRadius: 3.84,

        elevation: 5
    }
});
