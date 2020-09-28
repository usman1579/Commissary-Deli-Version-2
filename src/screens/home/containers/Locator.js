import React, { useState, Component } from 'react';
import { Picker, Text, Alert } from 'react-native';
import { connect } from 'react-redux';
import { fetchLocation, setLocation } from '../../../modules/Locator/action';
import { LocationSelector, setLocationSelector } from '../../../modules/Locator/selector';

class Locator extends Component {
    constructor() {
        super()
        this.state = {
            selectedid: '',
            selectedName: '',
        }
    }

    componentDidMount() {
        this.props.dispatch(fetchLocation());
    }

    changeLocation = (label, value) => {

        Alert.alert(
            "Warning",
            "Change Location Will empty you Whishlist",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "OK", onPress: () => this.OkChange(label, value) }
            ],
            { cancelable: false }
        );
    }

    OkChange = (label, value) => {
        const { Locator } = this.props;
        const Loc = Locator.Location;
        var Data = Loc[value]
        this.setState({
            selectedid: value,
            selectedName: label
        })
        this.props.dispatch(setLocation(Data))
    }

    render() {
        const { Locator } = this.props;
        const Loc = Locator.Location;
        return (

            <>
                <Picker
                    onValueChange={(label, value) => {
                        this.changeLocation(label, value)
                    }}
                    selectedValue={this.state.selectedName}>
                    {Loc.map(x => {
                        return (
                            <Picker.Item label={x.name} value={x.id} />
                        )
                    })}
                </Picker>
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    Locator: LocationSelector(state),
    selectedLocation: setLocationSelector(state)
});

export default connect(mapStateToProps)(Locator);