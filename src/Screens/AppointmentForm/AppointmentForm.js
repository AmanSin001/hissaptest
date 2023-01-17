import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import axios from 'axios';
import StepOne from '../../Components/AppointmentForm/StepOne/StepOne';
import StepTwo from '../../Components/AppointmentForm/StepTwo/StepTwo';
import StepThree from '../../Components/AppointmentForm/StepThree/StepThree';
import StepFour from '../../Components/AppointmentForm/StepFour/StepFour';
import StepFive from '../../Components/AppointmentForm/StepFive/StepFive';
import StepSix from '../../Components/AppointmentForm/StepSix/StepSix';
import StepSeven from '../../Components/AppointmentForm/StepSeven/StepSeven';
import { globalColors } from '../../Constants/Constants';
import { apiUrl } from '../../Config/config';
import Spinner from 'react-native-spinkit';
import { useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';
import moment from 'moment';
import { useIsFocused, useFocusEffect } from '@react-navigation/native';
import BackHeader from '../../Components/Common/BackHeader/BackHeader';

const AppointmentForm = ({ navigation, route }) => {
  const { appointmentData, forEdit } = route.params ?? {};

  const { auth } = useSelector(state => state.auth);

  const isFocused = useIsFocused();

  const token = auth?.token;

  const [step, setStep] = useState(1);

  const [loading, setLoading] = useState(false);

  const [appointmentId, setAppointmentId] = useState('');

  const [state, setState] = useState({
    // Step 1

    date: new Date(),
    motif_de_la_demande: '',
    date_de_demarrage_souhaitee: new Date(),
    nom_de_l_evaluateur: '',
    fonction_de_l_evaluateur: '',
    coordinateur_en_charge_du_dossier: '',
    contact_du_coordinateur: '',
    profil_demandeur_de_l_intervention: '',

    // Step 2

    nom: '',
    prenom: '',
    tel_domicile: '',
    tel_portable: '',
    adresse: '',
    code_postal: '',
    email: '',
    MODE: '',
    lien_avec_la_personne_aidee: '',
    connaissance_his_recommande_par: '',
    la_personne_aidee_est_elle_au_courant_de_la_demarche: '',
    est_elle_d_accord: '',

    // Step 3

    nom_profil: '',
    prenom_profil: '',
    telephone: '',
    etage: '',
    escalier: '',
    CODE: '',
    date_de_naissance: new Date(),
    interphone: '',
    lieu_de_naissance: '',
    numero_de_securite_sociale: '',
    adresse_profil: '',
    code_postal_profil: '',
    detenteur_des_clefs: '',
    person_info: '',
    maritual_status: '',
    work: '',
    nom_gardien: '',
    prenom_gardien: '',
    telephone_gardien: '',
    nombre_de_piece: '',
    accessibilite_du_logement: '',
    salubrite: '',
    sanitaire: '',
    chauffage: '',
    electromenager: [],

    // Step 4

    aides_techniques: [],
    reseaux_personnels_et_environnement_social: [],
    la_personne_a_t_elle_des_contacts_avec: [],

    // Step 5

    ponctuelle: '',
    continue_app: '',
    du: new Date(),
    au: new Date(),
    par_jour: '',
    par_semaine: '',
    total_par_mois: '',
    jour_de_la_semaine_a_cocher_avec_horaires: '',
    situation_de_la_personne: '',
    etat_du_travail_a_accomplir: '',

    // Step 6

    date_de_demarrage_souhaitee_pour_l_intervention: new Date(),
    complementaire_sante: '',
    provenance_de_vos_revenus: '',
    beneficiaire_de_l_apa: '',
    autres_types_d_aides: '',
    carte_d_invalidite: '',
    teleassistance: '',
    animal: '',
    aidant_naturel: '',
    medecin_traitant: '',
    infirmiere: '',
    kinesitherapeute: '',
    femme_de_menage: '',
    assistante_de_vie: '',

    // Step 7

    projet_individualise_d_intervention: '',
    renvoyer_le_formulaire_de_guide_d_entretien: '',
    integration_dune_photo: '',
    integration_dune_photo_ou_un_document: '',
    integration_dune_photo_ou_un_document_2: '',
    integration_dune_photo_ou_un_document_3: '',
  });

  useEffect(() => {
    if (isFocused) {
      if (forEdit) {
        let appointment = { ...appointmentData };
        console.log(appointment);
        setStep(1);
        setAppointmentId({ id: appointment?.id });

        delete appointment['id'];
        delete appointment['client_id'];
        delete appointment['draft_status'];
        delete appointment['code_prospect'];
        for (const key in appointment) {
          if (
            key === 'au' ||
            key === 'du' ||
            key === 'date' ||
            key === 'date_de_naissance' ||
            key === 'date_de_demarrage_souhaitee_pour_l_intervention' ||
            key === 'date_de_demarrage_souhaitee'
          ) {
            if (appointment[key] !== null && appointment[key] !== '') {
              appointment[key] = new Date(appointment[key]);
            } else {
              appointment[key] = new Date();
            }
          } else if (
            key === 'electromenager' ||
            key === 'aides_techniques' ||
            key === 'reseaux_personnels_et_environnement_social' ||
            key === 'la_personne_a_t_elle_des_contacts_avec'
          ) {
            appointment[key] = JSON.parse(appointment[key]);
          }
        }
        console.log(appointment);
        setState(appointment);
      } else {
        setStep(1);
        setAppointmentId('');
        setState({
          // Step 1

          date: new Date(),
          motif_de_la_demande: '',
          date_de_demarrage_souhaitee: new Date(),
          nom_de_l_evaluateur: '',
          fonction_de_l_evaluateur: '',
          coordinateur_en_charge_du_dossier: '',
          contact_du_coordinateur: '',
          profil_demandeur_de_l_intervention: '',

          // Step 2

          nom: '',
          prenom: '',
          tel_domicile: '',
          tel_portable: '',
          adresse: '',
          code_postal: '',
          email: '',
          MODE: '',
          lien_avec_la_personne_aidee: '',
          connaissance_his_recommande_par: '',
          la_personne_aidee_est_elle_au_courant_de_la_demarche: '',
          est_elle_d_accord: '',

          // Step 3

          nom_profil: '',
          prenom_profil: '',
          telephone: '',
          etage: '',
          escalier: '',
          CODE: '',
          date_de_naissance: new Date(),
          interphone: '',
          lieu_de_naissance: '',
          numero_de_securite_sociale: '',
          adresse_profil: '',
          code_postal_profil: '',
          detenteur_des_clefs: '',
          person_info: '',
          maritual_status: '',
          work: '',
          nom_gardien: '',
          prenom_gardien: '',
          telephone_gardien: '',
          nombre_de_piece: '',
          accessibilite_du_logement: '',
          salubrite: '',
          sanitaire: '',
          chauffage: '',
          electromenager: "",

          // Step 4

          aides_techniques: "",
          reseaux_personnels_et_environnement_social: "",
          la_personne_a_t_elle_des_contacts_avec: "",

          // Step 5

          ponctuelle: '',
          continue_app: '',
          du: new Date(),
          au: new Date(),
          par_jour: '',
          par_semaine: '',
          total_par_mois: '',
          jour_de_la_semaine_a_cocher_avec_horaires: '',
          situation_de_la_personne: '',
          etat_du_travail_a_accomplir: '',

          // Step 6

          date_de_demarrage_souhaitee_pour_l_intervention: new Date(),
          complementaire_sante: '',
          provenance_de_vos_revenus: '',
          beneficiaire_de_l_apa: '',
          autres_types_d_aides: '',
          carte_d_invalidite: '',
          teleassistance: '',
          animal: '',
          aidant_naturel: '',
          medecin_traitant: '',
          infirmiere: '',
          kinesitherapeute: '',
          femme_de_menage: '',
          assistante_de_vie: '',

          // Step 7

          projet_individualise_d_intervention: '',
          renvoyer_le_formulaire_de_guide_d_entretien: '',
          integration_dune_photo: '',
          integration_dune_photo_ou_un_document: '',
          integration_dune_photo_ou_un_document_2: '',
          integration_dune_photo_ou_un_document_3: '',
        });
      }
    }
  }, [isFocused]);

  useFocusEffect(() => {
    const backAction = () => {
      console.log('Back button pressed');
      if (forEdit) {
        console.log('For edit');
        navigation.navigate('AppointmentList');
      } else {
        console.log('For back');
        navigation.goBack();
      }
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  });

  const nextStepHandler = async () => {
    await appointmentHandler();
    if (step < 7) {
      setStep(prev => prev + 1);
    } else {
      null;
    }
  };

  const previousStepHandler = () => {
    if (step > 1) {
      setStep(prev => prev - 1);
    }
  };

  const appointmentHandler = async () => {
    if (appointmentId) {
      await updateAppointmentHandler();
    } else {
      await addAppointmentHandler();
    }
  };

  const addAppointmentHandler = async () => {
    if (!loading) {
      try {
        setLoading(true);

        var formData = new FormData();
        let newForm = new FormData()
        formData.append('addAppointment', '1');
        //console.log(formData)
        for (const key in state) {
          if (
            key === 'au' ||
            key === 'du' ||
            key === 'date' ||
            key === 'date_de_naissance' ||
            key === 'date_de_demarrage_souhaitee_pour_l_intervention' ||
            key === 'date_de_demarrage_souhaitee'
          ) {
            if(key == "date_de_demarrage_souhaitee_pour_l_intervention") {
              console.log("date_de_demarrage_souhaitee_pour_l_intervention", moment(state[key]).format("YYYY-MM-DD"))
            }
            //console.log(moment(state[key]).format().slice(0, 10));
            formData.append(key, moment(state[key]).format("YYYY-MM-DD"));
          } else if (
            key === 'electromenager' ||
            key === 'aides_techniques' ||
            key === 'reseaux_personnels_et_environnement_social' ||
            key === 'la_personne_a_t_elle_des_contacts_avec'
          ) {
            formData.append(key, JSON.stringify(state[key]));
          } else {
            formData.append(key, state[key]);
          }
        }

        console.log(formData)

        const { data } = await axios({
          method: 'post',
          url: apiUrl,
          data: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
            Cookie: `token=${token}`,
          },
        });

        console.log(data);
        setLoading(false);
        setAppointmentId(data);
        Toast.show({
          type: 'success',
          position: 'top',
          text1: 'Success',
          text2: 'Appointment Added',
          autoHide: true,
          topOffset: 30,
          visibilityTime: 2000,
          // bottomOffset: 40,
          // onShow: () => {},
          // onHide: () => {}, // called when Toast hides (if `autoHide` was set to `true`)
          // onPress: () => {},
        });
      } catch (error) {
        console.log('Error', error);
        setLoading(false);
      }
    }
  };

  const updateAppointmentHandler = async () => {
    if (!loading) {
      try {
        setLoading(true);
        var formData = new FormData();
        formData.append('updateAppointment', '1');
        formData.append('id', appointmentId?.id);

        for (const key in state) {
          if (
            key === 'au' ||
            key === 'du' ||
            key === 'date' ||
            key === 'date_de_naissance' ||
            key === 'date_de_demarrage_souhaitee_pour_l_intervention' ||
            key === 'date_de_demarrage_souhaitee'
          ) {
            // console.log(moment(state[key]).format().slice(0, 10));
            // formData.append(key, '2022-12-20');
            formData.append(key, moment(state[key]).format().slice(0, 10));
          } else if (
            key === 'electromenager' ||
            key === 'aides_techniques' ||
            key === 'reseaux_personnels_et_environnement_social' ||
            key === 'la_personne_a_t_elle_des_contacts_avec'
          ) {
            formData.append(key, JSON.stringify(state[key]));
          }
          else if(key == "email") {
            if(!state[key]) {
              formData.append(key, "");
            }
            else {
              formData.append(key, JSON.stringify(state[key]));
            }
          }
          else {
            formData.append(key, state[key]);
            // console.log(key);
          }
        }

        const { data } = await axios({
          method: 'post',
          url: apiUrl,
          data: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
            Cookie: `token=${token}`,
          },
        });

        console.log(data);
        setLoading(false);
        Toast.show({
          type: 'success',
          position: 'top',
          text1: 'Success',
          text2: 'Appointment Updated',
          autoHide: true,
          topOffset: 30,
          visibilityTime: 2000,
          // bottomOffset: 40,
          // onShow: () => {},
          // onHide: () => {}, // called when Toast hides (if `autoHide` was set to `true`)
          // onPress: () => {},
        });
      } catch (error) {
        console.log('Error', error);
        setLoading(false);
      }
    }
  };

  return (
    <View style={styles.mainContainer}>
      <BackHeader
        navigation={navigation}
        label="1er rendez-vous"
        forEdit={forEdit}
      />
      <ScrollView
        style={styles.dataContainer}
        contentContainerStyle={{
          paddingBottom: 20,
        }}>
        {step === 1 && <StepOne state={state} setState={setState} />}
        {step === 2 && <StepTwo state={state} setState={setState} />}
        {step === 3 && <StepThree state={state} setState={setState} />}
        {step === 4 && <StepFour state={state} setState={setState} />}
        {step === 5 && <StepFive state={state} setState={setState} />}
        {step === 6 && <StepSix state={state} setState={setState} />}
        {step === 7 && <StepSeven state={state} setState={setState} />}
      </ScrollView>
      {loading ? (
        <View style={styles.loadingContainer}>
          <Spinner color={globalColors.primary} size={50} type="Circle" />
        </View>
      ) : null}

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[
            styles.buttonContainer,
            {
              marginRight: 10,
              display: step === 1 ? 'none' : null,
            },
          ]}
          onPress={previousStepHandler}>
          <Text style={styles.buttonText}>Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={nextStepHandler}>
          <Text style={styles.buttonText}>
            {step === 7 ? 'Submit' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: globalColors.white,
    paddingBottom: 10,
  },
  dataContainer: {
    flex: 1,
    marginVertical: 10,
    padding: 10,
  },
  loadingContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonContainer: {
    backgroundColor: globalColors.primary,
    width: 100,
    height: 40,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: globalColors.white,
  },
});

export default AppointmentForm;
