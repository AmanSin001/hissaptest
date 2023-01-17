import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { globalColors } from '../../../Constants/Constants';
import CheckboxInput from '../../Common/CheckboxInput/CheckboxInput';
import LabelInput from '../../Common/LabelInput/LabelInput';
import RadioInput from '../../Common/RadioInput/RadioInput';

const StepThree = ({ state, setState }) => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.headingContainer}>
        <Text style={styles.headingText}>Profil personne aidée</Text>
      </View>
      <LabelInput
        label="Nom"
        state={state}
        setState={setState}
        name="nom_profil"
      />

      <View style={styles.marginTopContainer}></View>
      <LabelInput
        label="Prénom"
        state={state}
        setState={setState}
        name="prenom_profil"
      />

      <View style={styles.marginTopContainer}></View>
      <LabelInput
        label="Téléphone"
        state={state}
        setState={setState}
        name="telephone"
      />

      <View style={styles.marginTopContainer}></View>
      <LabelInput
        label="Etage"
        state={state}
        setState={setState}
        name="etage"
      />

      <View style={styles.marginTopContainer}></View>
      <LabelInput
        label="Escalier"
        state={state}
        setState={setState}
        name="escalier"
      />

      <View style={styles.marginTopContainer}></View>
      <LabelInput label="Code" state={state} setState={setState} name="CODE" />

      <View style={styles.marginTopContainer}></View>
      <LabelInput
        label="Date de naissance"
        state={state}
        setState={setState}
        name="date_de_naissance"
      />

      <View style={styles.marginTopContainer}></View>
      <LabelInput
        label="Interphone"
        state={state}
        setState={setState}
        name="interphone"
      />

      <View style={styles.marginTopContainer}></View>
      <LabelInput
        label="Lieu de naissance"
        state={state}
        setState={setState}
        name="lieu_de_naissance"
      />

      <View style={styles.marginTopContainer}></View>
      <LabelInput
        label="Numéro de sécurité sociale"
        state={state}
        setState={setState}
        name="numero_de_securite_sociale"
      />

      <View style={styles.marginTopContainer}></View>
      <LabelInput
        label="Adresse"
        state={state}
        setState={setState}
        name="adresse_profil"
      />

      <View style={styles.marginTopContainer}></View>
      <LabelInput
        label="Code postal"
        state={state}
        setState={setState}
        name="code_postal_profil"
      />

      <View style={styles.marginTopContainer}></View>
      <LabelInput
        label="Détenteur des clefs"
        state={state}
        setState={setState}
        name="detenteur_des_clefs"
      />

      <View style={styles.marginTopContainer}></View>
      <RadioInput
        options={[
          { text: 'Personnes âgées', value: 'personnes_agees' },
          { text: 'Personnes handicapées', value: 'personnes_handicapees' },
          {
            text: 'Personne atteinte d’une maladie rare ou orpheline',
            value: 'personne_atteinte_dune_maladie_rare_ou_orpheline',
          },
          { text: 'Autres informations', value: 'autres_informations' },
        ]}
        state={state}
        setState={setState}
        name="person_info"
      />

      <View style={styles.marginTopContainer}></View>
      <RadioInput
        options={[
          { text: 'Célibataire', value: 'celibataire' },
          { text: 'Marié(e)', value: 'marie' },
          { text: 'Veuf(ve)', value: 'veuf' },
          { text: 'Divorcé', value: 'divorce' },
          { text: 'Maison', value: 'maison' },
          { text: 'Appartement', value: 'appartement' },
          { text: 'Foyer', value: 'foyer' },
          { text: 'Autre', value: 'autre' },
          { text: 'Tutelle', value: 'tutelle' },
          { text: 'Curatelle', value: 'curatelle' },
        ]}
        state={state}
        setState={setState}
        name="maritual_status"
      />

      <View style={styles.marginTopContainer}></View>
      <RadioInput
        options={[
          { text: 'Propriétaire', value: 'proprietaire' },
          { text: 'Locataire', value: 'locataire' },
          { text: 'Hébergé', value: 'Heberge' },
          { text: 'Foyer logement', value: 'foyer_logement' },
          { text: 'Maison individuelle', value: 'maison_individuelle' },
          { text: 'Appartement', value: 'appartement' },
          { text: 'Bailleur social', value: 'bailleur_social' },
        ]}
        state={state}
        setState={setState}
        name="work"
      />

      <View style={styles.marginTopContainer}></View>
      <View style={styles.headingContainer}>
        <Text style={styles.headingText}>Gardien</Text>
      </View>

      <View style={styles.marginTopContainer}></View>
      <LabelInput
        label="Nom"
        state={state}
        setState={setState}
        name="nom_gardien"
      />

      <View style={styles.marginTopContainer}></View>
      <LabelInput
        label="Prénom"
        state={state}
        setState={setState}
        name="prenom_gardien"
      />

      <View style={styles.marginTopContainer}></View>
      <LabelInput
        label="Téléphone"
        state={state}
        setState={setState}
        name="telephone_gardien"
      />

      <View style={styles.marginTopContainer}></View>
      <View style={styles.headingContainer}>
        <Text style={styles.headingText}>Description générale du logement</Text>
      </View>

      <View style={styles.marginTopContainer}></View>
      <LabelInput
        label="Nombre de pièce"
        state={state}
        setState={setState}
        name="nombre_de_piece"
      />

      <View style={styles.marginTopContainer}></View>
      <RadioInput
        options={[
          { text: 'Satisfaisante', value: 'satisfaisante' },
          { text: 'Insatisfaisante', value: 'insatisfaisante' },
        ]}
        label="Accessibilité du logement"
        state={state}
        setState={setState}
        name="accessibilite_du_logement"
      />

      <View style={styles.marginTopContainer}></View>
      <RadioInput
        options={[
          { text: 'Satisfaisante', value: 'satisfaisante' },
          { text: 'Insatisfaisante', value: 'insatisfaisante' },
        ]}
        label="Salubrité"
        state={state}
        setState={setState}
        name="salubrite"
      />

      <View style={styles.marginTopContainer}></View>
      <View style={styles.headingContainer}>
        <Text style={styles.headingText}>Equipement / Aménagement</Text>
      </View>

      <View style={styles.marginTopContainer}></View>
      <RadioInput
        options={[
          { text: 'Adapté', value: 'adapte' },
          { text: 'Inadapté', value: 'inadapte' },
        ]}
        label="Sanitaire"
        state={state}
        setState={setState}
        name="sanitaire"
      />

      <View style={styles.marginTopContainer}></View>
      <RadioInput
        options={[
          { text: 'Satisfaisante', value: 'satisfaisante' },
          { text: 'Insatisfaisante', value: 'insatisfaisante' },
        ]}
        label="Chauffage"
        state={state}
        setState={setState}
        name="chauffage"
      />

      <View style={styles.marginTopContainer}></View>
      <CheckboxInput
        options={[
          { text: 'Dangereux', value: 'dangereux' },
          { text: 'Non dangereux', value: 'non_dangereux' },
          { text: 'Frigo', value: 'Frigo' },
          { text: 'Machines à laver', value: 'machines_a_laver' },
          { text: 'Congélateur', value: 'congelateur' },
          { text: 'Télévision', value: 'television' },
          { text: 'Micro-ondes', value: 'micro_ondes' },
          { text: 'Gazinière', value: 'gaziniere' },
        ]}
        label="Electroménager"
        state={state}
        setState={setState}
        name="electromenager"
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

export default StepThree;
