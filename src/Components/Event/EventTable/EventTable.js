import React from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, Linking } from 'react-native';
import EvilIcons from "react-native-vector-icons/EvilIcons"
import moment from 'moment';

const EventTable = ({ data, isChauffeur }) => {
  const Row = ({ title, data }) => {
    return (
      <View style={styles.rowContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>{title}</Text>
        </View>
        <View style={styles.dataContainer}>
          <Text style={styles.dataText}>{data}</Text>
        </View>
      </View>
    );
  };

  const Heading = ({ heading }) => {
    return (
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>{heading}</Text>
      </View>
    );
  };

  const PickAddress = () => {
    let address = data?.pickAddress
    if(!address) {
      address = ""
    }
    const onPressHandler = () => {
      const scheme = Platform.select({
        ios: 'maps:0,0?q=',
        android: 'geo:0,0?q=',
      });
      const address = `${data?.pickLatitude},${data?.pickLongitude}`;
      const url = Platform.select({
        ios: `${scheme}${address}`,
        android: `${scheme}${address}`,
      });

      Linking.openURL(url);
    }
    if(address.length > 32) {
      address = data?.pickAddress.substring(0, 32) + "..."
    }
    return (
      <View style={styles.iconTextCont}>
        <TouchableOpacity onPress={onPressHandler}>
          <EvilIcons color="#6B6B6B" name="external-link" size={30}></EvilIcons>
        </TouchableOpacity>
        <Text style={{ flex: 1, flexShrink: 1 }}>{ data?.pickAddress }</Text>
      </View>
    )
  }

  const DropAddress = () => {
    let address = data?.dropAddress
    if(!address) {
      address = ""
    }
    const onPressHandler = () => {
      const scheme = Platform.select({
        ios: 'maps:0,0?q=',
        android: 'geo:0,0?q=',
      });
      const address = `${data?.dropLatitude},${data?.dropLongitude}`;
      const url = Platform.select({
        ios: `${scheme}${address}`,
        android: `${scheme}${address}`,
      });

      Linking.openURL(url);
    }
    if(address.length > 32) {
      address = data?.dropAddress.substring(0, 32) + "..."
    }
    return (
      <View style={styles.iconTextCont}>
        <TouchableOpacity onPress={onPressHandler}>
          <EvilIcons color="#6B6B6B" name="external-link" size={30}></EvilIcons>
        </TouchableOpacity>
        <Text style={{ width: "50%" }} >{ address }</Text>
      </View>
    )
  }

  return (
    <View style={styles.mainContainer}>
      <Heading heading="Information du client" />
      <Row title="Début" data={moment(data?.startTime).format('LLL')} />
      <Row title="Fin" data={moment(data?.endTime).format('LLL')} />
      { isChauffeur ? (
        <View>
          <Row title="Addresse de départ" data={<PickAddress />} />
          <Row title="Addresse d'arrivée" data={<DropAddress />} />
        </View>
      ): null }
      <Row title="Statut" data={data?.status} />
      <Heading heading="Information de la prestation" />
      <Row title="Prestation" data={data?.prestation} />
      <Heading heading="Informations du client" />
      <Row title="Type de logement" data={data?.type_de_logement} />
      <Row title="Nature de logement" data={data?.nature_du_logement} />
      <Row title="Accès" data={data?.acces} />
      <Row title="Autonomie" data={data?.autonomie} />
      <Row title="Degré de dépendance" data={data?.degre_de_dependance} />
      <Row title="Age du bénéficiaire" data={data?.age_du_beneficiaire} />
      <Row title="Situation de famille" data={data?.situation_de_famille} />
      <Row title="Entourage disponible" data={data?.entourage_disponible} />
      <Row title="Plan d'aide" data={data?.plan_daide} />
      <Row title="Certificat médical" data={data?.certificat_medical} />
      <Row title="Provenance" data={data?.provenance} />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {},
  loadingContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomColor: '#00000015',
    borderBottomWidth: 1,
  },
  titleContainer: {
    flex: 0.2,
  },
  titleText: {},
  dataContainer: {
    flex: 0.7,
  },
  dataText: {},
  headingContainer: {
    marginTop: 20,
    marginBottom: 10,
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  iconTextCont: {
    flexShrink: 1, justifyContent: 'space-between', alignItems: 'center', flex: 1, flexDirection: 'row'
  }
});

export default EventTable;
