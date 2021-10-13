import React, { useState } from "react"
import { Button, FlatList, Modal, Text, TouchableOpacity, View, TouchableWithoutFeedback } from "react-native";
import { Icon } from "react-native-elements";
import HeaderWithSearchBar from "../components/HeaderWithSearchBar";
import MultiFunctionItem from "../components/MultiFunctionList";
import { SIZE } from "../constants/Style";

const Main = ( props ) => {

    const [modalVisible, setModalVisible] = useState(false);


    const headerPlusButton = <TouchableOpacity>
                                <Icon name='plus' type='entypo' color='white' size= { SIZE.MEDIUM_ICON } onPress={ () => setModalVisible(true) }></Icon>
                            </TouchableOpacity>;

    return (
        <View>

            {/* header */}
            <HeaderWithSearchBar rightComponent={ headerPlusButton }></HeaderWithSearchBar>
            
            <MultiFunctionItem  modalVisible={ modalVisible } onSetModalVisible={ setModalVisible }></MultiFunctionItem>

        </View>
    );

}

export default Main;