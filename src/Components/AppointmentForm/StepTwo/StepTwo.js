import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { globalColors } from '../../../Constants/Constants';
import LabelInput from '../../Common/LabelInput/LabelInput';
import RadioInput from '../../Common/RadioInput/RadioInput';

const StepTwo = ({ state, setState }) => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.headingContainer}>
        <Text style={styles.headingText}>
          Profil demandeur de l’intervention
        </Text>
      </View>
      <LabelInput label="Nom" state={state} setState={setState} name="nom" />

      <View style={styles.marginTopContainer}></View>
      <LabelInput
        label="Prénom"
        state={state}
        setState={setState}
        name="prenom"
      />

      <View style={styles.marginTopContainer}></View>
      <LabelInput
        label="Tel. domicile"
        state={state}
        setState={setState}
        name="tel_domicile"
      />

      <View style={styles.marginTopContainer}></View>
      <LabelInput
        label="Tel. portable"
        state={state}
        setState={setState}
        name="tel_portable"
      />

      <View style={styles.marginTopContainer}></View>
      <LabelInput
        label="Adresse"
        state={state}
        setState={setState}
        name="adresse"
      />

      <View style={styles.marginTopContainer}></View>
      <LabelInput
        label="Code postal"
        state={state}
        setState={setState}
        name="code_postal"
      />

      <View style={styles.marginTopContainer}></View>
      <LabelInput
        label="Email"
        state={state}
        setState={setState}
        name="email"
      />

      <View style={styles.marginTopContainer}></View>
      <RadioInput
        options={[
          { text: 'Mode mandataire', value: 'mode_mandataire' },
          { text: 'Mode prestataire', value: 'mode_prestataire' },
          { text: 'Mode de gré à gré', value: 'mode_de_gre_a_gre' },
        ]}
        state={state}
        setState={setState}
        name="MODE"
      />

      <View style={styles.marginTopContainer}></View>
      <LabelInput
        label="Lien avec la personne aidée ?"
        state={state}
        setState={setState}
        name="lien_avec_la_personne_aidee"
      />

      <View style={styles.marginTopContainer}></View>
      <LabelInput
        label="Connaissance HIS ? Recommandé par ?"
        state={state}
        setState={setState}
        name="connaissance_his_recommande_par"
      />

      <View style={styles.marginTopContainer}></View>
      <LabelInput
        label="La personne aidée est-elle au courant de la démarche ?"
        state={state}
        setState={setState}
        name="la_personne_aidee_est_elle_au_courant_de_la_demarche"
      />

      <View style={styles.marginTopContainer}></View>
      <LabelInput
        label="Est-elle d’accord ?"
        state={state}
        setState={setState}
        name="est_elle_d_accord"
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

export default StepTwo;
