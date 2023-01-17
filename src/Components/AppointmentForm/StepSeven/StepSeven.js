import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { globalColors } from '../../../Constants/Constants';
import DocumentInput from '../../Common/DocumentInput/DocumentInput';
import LabelInput from '../../Common/LabelInput/LabelInput';

const StepSeven = ({ state, setState }) => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.headingContainer}>
        <Text style={styles.headingText}>
          Souhaitant émis par rapport à l’intervenant(e) et compétences attendus
        </Text>
      </View>

      <LabelInput
        label="Projet individualisé d’intervention (PAI)/ souhaits de la personne / aidant / (remarques et suggestions)"
        state={state}
        setState={setState}
        name="projet_individualise_d_intervention"
      />

      <View style={styles.marginTopContainer}></View>
      <View style={styles.headingContainer}>
        <Text style={styles.headingText}>
          Souhaitant émis par rapport à l’intervenant(e) et compétences attendus
        </Text>
      </View>

      <LabelInput
        label="Renvoyer le formulaire de guide d’entretien"
        state={state}
        setState={setState}
        name="renvoyer_le_formulaire_de_guide_d_entretien"
      />

      <View style={styles.marginTopContainer}></View>
      <View style={styles.headingContainer}>
        <Text style={styles.headingText}>Pièce d’identité</Text>
      </View>

      <DocumentInput
        label="Intégration d’une photo"
        state={state}
        setState={setState}
        name="integration_dune_photo"
      />

      <View style={styles.marginTopContainer}></View>
      <View style={styles.headingContainer}>
        <Text style={styles.headingText}>Prise en charge PCH/APA</Text>
      </View>

      <DocumentInput
        label="Intégration d’une photo ou un document"
        state={state}
        setState={setState}
        name="integration_dune_photo_ou_un_document"
      />

      <View style={styles.marginTopContainer}></View>
      <View style={styles.headingContainer}>
        <Text style={styles.headingText}>Avis d’imposition</Text>
      </View>

      <DocumentInput
        label="Intégration d’une photo ou un document"
        state={state}
        setState={setState}
        name="integration_dune_photo_ou_un_document_2"
      />

      <View style={styles.marginTopContainer}></View>
      <View style={styles.headingContainer}>
        <Text style={styles.headingText}>Justificatif de domicile</Text>
      </View>

      <DocumentInput
        label="Intégration d’une photo ou un document"
        state={state}
        setState={setState}
        name="integration_dune_photo_ou_un_document_3"
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

export default StepSeven;
