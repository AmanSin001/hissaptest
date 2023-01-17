import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { globalColors } from '../../../Constants/Constants';
import DateInput from '../../Common/DateInput/DateInput';
import LabelInput from '../../Common/LabelInput/LabelInput';

const StepOne = ({ state, setState }) => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.headingContainer}>
        <Text style={styles.headingText}>Ajout d'un prospect</Text>
      </View>

      <DateInput label="Date" state={state} setState={setState} name="date" />

      <View style={styles.marginTopContainer}></View>
      <LabelInput
        label="Motif de la demande"
        state={state}
        setState={setState}
        name="motif_de_la_demande"
      />

      <View style={styles.marginTopContainer}></View>
      <DateInput
        label="Date de démarrage souhaitée"
        state={state}
        setState={setState}
        name="date_de_demarrage_souhaitee"
      />

      <View style={styles.marginTopContainer}></View>
      <LabelInput
        label="Nom de l’évaluateur"
        state={state}
        setState={setState}
        name="nom_de_l_evaluateur"
      />

      <View style={styles.marginTopContainer}></View>
      <LabelInput
        label="Fonction de l’évaluateur"
        state={state}
        setState={setState}
        name="fonction_de_l_evaluateur"
      />

      <View style={styles.marginTopContainer}></View>
      <LabelInput
        label="Coordinateur en charge du dossier"
        state={state}
        setState={setState}
        name="coordinateur_en_charge_du_dossier"
      />

      <View style={styles.marginTopContainer}></View>
      <LabelInput
        label="Contact du coordinateur"
        state={state}
        setState={setState}
        name="contact_du_coordinateur"
      />

      <View style={styles.marginTopContainer}></View>
      <LabelInput
        label="Profil demandeur de l’intervention"
        state={state}
        setState={setState}
        name="profil_demandeur_de_l_intervention"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {},
  headingContainer: {
    marginBottom: 15,
  },
  headingText: {
    color: globalColors.primary,
    fontSize: 20,
  },
  marginTopContainer: {
    marginTop: 20,
  },
});

export default StepOne;
