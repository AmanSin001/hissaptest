import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { globalColors } from '../../../Constants/Constants';
import CheckboxInput from '../../Common/CheckboxInput/CheckboxInput';

const StepFour = ({ state, setState }) => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.headingContainer}>
        <Text style={styles.headingText}>Profil personne aidée</Text>
      </View>
      <CheckboxInput
        options={[
          { text: 'Fauteuil roulant', value: 'fauteuil_roulant' },
          { text: 'Lève-malade', value: 'leve_malade' },
          { text: 'Lit médical', value: 'lit_medical' },
          { text: 'Déambulateur', value: 'deambulateur' },
          { text: 'Canne', value: 'canne' },
          { text: 'Protection', value: 'protection' },
          { text: 'Fauteuil roulant', value: 'Autres' },
        ]}
        label="Aides techniques"
        state={state}
        setState={setState}
        name="aides_techniques"
      />

      <View style={styles.marginTopContainer}></View>
      <CheckboxInput
        options={[
          { text: 'Vis seul', value: 'vis_seul' },
          {
            text: 'Vit avec un ou des membres de la famille',
            value: 'vit_avec_un_ou_des_membres_de_la_famille',
          },
          {
            text: 'Vit avec une personne autonome dépendante',
            value: 'vit_avec_une_personne_autonome_dependante',
          },
          {
            text: 'Existe-il des contacts réguliers avec la famille',
            value: 'existe_il_des_contacts_reguliers_avec_la_famille',
          },
          {
            text: 'Intervention du voisinage',
            value: 'intervention_du_voisinage',
          },
        ]}
        label="Réseaux personnels et environnement social"
        state={state}
        setState={setState}
        name="reseaux_personnels_et_environnement_social"
      />

      <View style={styles.marginTopContainer}></View>
      <CheckboxInput
        options={[
          { text: 'Une association', value: 'une_association' },
          {
            text: 'Des amis qu’elle voit régulièrement',
            value: 'des_amis_quelle_voit_regulierement',
          },
        ]}
        label="La personne a-t-elle des contacts avec"
        state={state}
        setState={setState}
        name="la_personne_a_t_elle_des_contacts_avec"
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
export default StepFour;
