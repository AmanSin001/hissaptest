import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { globalColors } from '../../../Constants/Constants';
import LabelInput from '../../Common/LabelInput/LabelInput';

const StepSix = ({ state, setState }) => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.headingContainer}>
        <Text style={styles.headingText}>Compléments d’informations</Text>
      </View>

      <LabelInput
        label="Date de démarrage souhaitée pour l’intervention"
        state={state}
        setState={setState}
        name="date_de_demarrage_souhaitee_pour_l_intervention"
      />

      <View style={styles.marginTopContainer}></View>
      <LabelInput
        label="Complémentaire santé (mutuelle)"
        state={state}
        setState={setState}
        name="complementaire_sante"
      />

      <View style={styles.marginTopContainer}></View>
      <LabelInput
        label="Provenance de vos revenus"
        state={state}
        setState={setState}
        name="provenance_de_vos_revenus"
      />

      <View style={styles.marginTopContainer}></View>
      <LabelInput
        label="Bénéficiaire de l’APA (oui / non / en cours)"
        state={state}
        setState={setState}
        name="beneficiaire_de_l_apa"
      />

      <View style={styles.marginTopContainer}></View>
      <LabelInput
        label="Autres types d’aides (oui / non)"
        state={state}
        setState={setState}
        name="autres_types_d_aides"
      />

      <View style={styles.marginTopContainer}></View>
      <LabelInput
        label="Carte d’invalidité (oui / non)"
        state={state}
        setState={setState}
        name="carte_d_invalidite"
      />

      <View style={styles.marginTopContainer}></View>
      <LabelInput
        label="Téléassistance (oui / non)"
        state={state}
        setState={setState}
        name="teleassistance"
      />

      <View style={styles.marginTopContainer}></View>
      <LabelInput
        label="Animal (oui / non)"
        state={state}
        setState={setState}
        name="animal"
      />

      <View style={styles.marginTopContainer}></View>
      <View style={styles.headingContainer}>
        <Text style={styles.headingText}>Compléments d’informations</Text>
      </View>

      <LabelInput
        label="aidant naturel"
        state={state}
        setState={setState}
        name="aidant_naturel"
      />

      <View style={styles.marginTopContainer}></View>
      <LabelInput
        label="Médecin traitant"
        state={state}
        setState={setState}
        name="medecin_traitant"
      />

      <View style={styles.marginTopContainer}></View>
      <LabelInput
        label="Infirmière"
        state={state}
        setState={setState}
        name="infirmiere"
      />

      <View style={styles.marginTopContainer}></View>
      <LabelInput
        label="Kinésithérapeute"
        state={state}
        setState={setState}
        name="kinesitherapeute"
      />

      <View style={styles.marginTopContainer}></View>
      <LabelInput
        label="Femme de ménage"
        state={state}
        setState={setState}
        name="femme_de_menage"
      />

      <View style={styles.marginTopContainer}></View>
      <LabelInput
        label="Assistante de vie"
        state={state}
        setState={setState}
        name="assistante_de_vie"
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

export default StepSix;
