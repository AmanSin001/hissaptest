import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { globalColors } from '../../../Constants/Constants';
import DateInput from '../../Common/DateInput/DateInput';
import LabelInput from '../../Common/LabelInput/LabelInput';

const StepFive = ({ state, setState }) => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.headingContainer}>
        <Text style={styles.headingText}>Ampleur de l’intervention</Text>
      </View>

      <LabelInput
        label="Ponctuelle"
        state={state}
        setState={setState}
        name="ponctuelle"
      />

      <View style={styles.marginTopContainer}></View>
      <LabelInput
        label="Continue"
        state={state}
        setState={setState}
        name="continue_app"
      />

      <View style={styles.marginTopContainer}></View>
      <DateInput label="Du" state={state} setState={setState} name="du" />

      <View style={styles.marginTopContainer}></View>
      <DateInput label="Au" state={state} setState={setState} name="au" />

      <View style={styles.marginTopContainer}></View>
      <LabelInput
        label="Par jour"
        state={state}
        setState={setState}
        name="par_jour"
      />

      <View style={styles.marginTopContainer}></View>
      <LabelInput
        label="Par semaine"
        state={state}
        setState={setState}
        name="par_semaine"
      />

      <View style={styles.marginTopContainer}></View>
      <LabelInput
        label="Total par mois"
        state={state}
        setState={setState}
        name="total_par_mois"
      />

      <View style={styles.marginTopContainer}></View>
      <LabelInput
        label="Jour de la semaine à cocher avec horaires"
        state={state}
        setState={setState}
        name="jour_de_la_semaine_a_cocher_avec_horaires"
      />

      <View style={styles.marginTopContainer}></View>
      <LabelInput
        label="Situation de la personne"
        state={state}
        setState={setState}
        name="situation_de_la_personne"
      />

      <View style={styles.marginTopContainer}></View>
      <LabelInput
        label="État du travail à accomplir"
        state={state}
        setState={setState}
        name="etat_du_travail_a_accomplir"
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

export default StepFive;
