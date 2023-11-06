// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// Importation des  services
import {
  addDoc,
  collection,
  getDocs,
  getFirestore,
  onSnapshot,
  serverTimestamp,
} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCSRo2EZwo5LQIO75FevIBvEKbDD61HNuY',
  authDomain: 'validation-atelier-js.firebaseapp.com',
  projectId: 'validation-atelier-js',
  storageBucket: 'validation-atelier-js.appspot.com',
  messagingSenderId: '466332062090',
  appId: '1:466332062090:web:ffbe45ef4a7371a7b5b873',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

// Récupérer la collection
const eleve = collection(db, 'inscScolarite');

getDocs(eleve).then((snapshot) => {});

// Realtime Update
onSnapshot(eleve, (snapshot) => {
  let eleve = [];
  snapshot.docs.forEach((doc) => {
    eleve.push({ ...doc.data(), id: doc.id });
  });
  //   console.log(eleve);
  eleve.forEach((utili) => {
    const list = document.querySelector('#list');
    const tr = document.createElement('tr');
    tr.innerHTML = `
    <td class="text-start ps-2 border border-1">${utili.prenom}</td> <td class="text-start ps-2 border border-1">${utili.nom}</td>
        <td class="text-center border border-1">
        <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#detail">
          <i class="fa-regular fa-eye opacity-50"></i>
        </button>
        </td>`;
    list.appendChild(tr);
  });
});

//recuperer les données et les afficher dans revenue

onSnapshot(eleve, (snapshot) => {
  let eleve = [];
  snapshot.docs.forEach((doc) => {
    eleve.push({ ...doc.data(), id: doc.id });
  });
  eleve.forEach((utili) => {
    const revenue = document.getElementById("revenue")

    let trbody = document.createElement('tr')

   

    trbody.innerHTML = `
          <td class="border border-1">${utili.Timestamp}</td>
          <td class="text-center">Inscription Scolarité</td>
          <td class="text-center border border-1">${utili.prenom} ${utili.nom}</td>
          <td class="border border-1">${utili.etatFin} Fcfa</td>
    `
    console.log(utili.dateDajout);
    revenue.append(trbody)
  })
})

// Enregistrer des données dans le Firebase
const form = document.querySelector('.addToFirebase');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  //Ajouter un nouveau document avec un id généré
  addDoc(eleve, {
    nom: form.nom.value,
    prenom: form.prenom.value,
    etatFin: form.etatFin.value,
    classe: form.classe.value,
    dateDajout: serverTimestamp(),
  }).then(() => form.reset());
});

// Alert Après ajout
const alertPlaceholder = document.getElementById('liveAlertPlaceholder');
const appendAlert = (message, type) => {
  const wrapper = document.createElement('div');
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    '</div>',
  ].join('');

  alertPlaceholder.append(wrapper);
};

const alertTrigger = document.getElementById('liveAlertBtn');
if (alertTrigger) {
  alertTrigger.addEventListener('click', () => {
    appendAlert('Linscription est effectué avec succès', 'success');
  });
}

// _________________________
// Parti Ladji Timéra
const certiesRef = collection(db, 'inscrireActivite');

getDocs(certiesRef).then((snapshot) => {});
onSnapshot(certiesRef, (snapshot) => {
  let certiesRef = [];
  snapshot.docs.forEach((doc) => {
    certiesRef.push({ ...doc.data(), id: doc.id });
  });
  // console.log(certiesRef);
  certiesRef.forEach((utili) => {
    const list = document.querySelector('.mytbody');
    const tr = document.createElement('tr');
    tr.innerHTML = `
    <td class="text-start ps-2 border border-1">${utili.prenom}</td> <td class="text-start ps-2 border border-1">${utili.nom}</td>
        <td class="text-center border border-1">
        <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#detail">
          <i class="fa-regular fa-eye opacity-50"></i>
        </button>
        </td>`;
    list.appendChild(tr);
  });
});

const myForm = document.querySelector('.myForm');

myForm.addEventListener('submit', (e) => {
  e.preventDefault();
  //Ajouter un nouveau document avec un id généré
  addDoc(certiesRef, {
    prenom: myForm.prenom.value,
    nom: myForm.nom.value,
    etat: myForm.etat.value,
    classe: myForm.classe.value,
    type: myForm.type.value,
    dateDajout: serverTimestamp(),
  }).then(() => myForm.reset());
});
