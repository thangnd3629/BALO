import React, { useState, useRef } from "react";
import { TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { Header, Icon } from "react-native-elements";
import { ERROR_MESSAGE } from "../constants/ErrorMessage";
import { SIZE } from "../constants/Style";


const HeaderWithSearchBar = ( props ) => {

    if ( props.rightComponent && !React.isValidElement( props.rightComponent ) ) {
        throw ERROR_MESSAGE.INVALID_RIGHT_COMPONENT_ELEMENT
    }

    const refCenterComponent = useRef( null );
    const API_PATH = props.apiPath;
    const [isFocused, setIsFocused] = useState( false );
    const [searchInput, setSearchInput] = useState( '' );

    submitSearch = async () => {
        // TODO: implement submit search
    }

    clickSearchButton = () => {
        if ( refCenterComponent.current?.isFocused() ) {
            refCenterComponent.current?.blur();
        } else {
            refCenterComponent.current?.focus();
        }
    }

    const centerComponent = <TextInput
                            style={ isFocused ? { ...styles.textInput, ...styles.focusedTextInput} : styles.textInput }
                            placeholder='Type here...'
                            placeholderTextColor='white'
                            onFocus={ () => setIsFocused( true ) }
                            onBlur={ () => setIsFocused( false ) }
                            ref={ refCenterComponent } ></TextInput>;

    const leftComponent =  <TouchableOpacity onPress={ clickSearchButton }>
                                <Icon name={ refCenterComponent.current?.isFocused() ? 'chevron-left' : 'search'  } size={ SIZE.MEDIUM_ICON } color='white' />
                            </TouchableOpacity>;

    if ( !props.rightComponent ) {
        return (
            <Header 
                containerStyle={ styles.headerWrapper }
                placement='left'
                leftComponent={ leftComponent }
                centerComponent={ centerComponent }
            >
            </Header>
        );
    } else {
        return (
            <Header 
                containerStyle={ styles.headerWrapper }
                placement='left'
                leftComponent={ leftComponent }
                centerComponent={ centerComponent }
                rightComponent={ props.rightComponent }
            >
            </Header>
        );
    }
}

const styles = StyleSheet.create({

    headerWrapper: {
        paddingTop: 30,
        paddingBottom: 10,
    },

    textInput: {
        flex: 1,
        width: '100%',
        borderRadius: SIZE.MEDIUM_BORDER_RADIUS,
        paddingHorizontal: 5,
        paddingVertical: 5,
        color: 'white',
        fontSize: SIZE.MEDIUM_FONT,
    },

    focusedTextInput: {
        color: 'black',
        backgroundColor: 'white',
    },

});

export default HeaderWithSearchBar;
