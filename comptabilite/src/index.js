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
  eleve.sort((a, b) => b.dateDajout - a.dateDajout);
  const list = document.querySelector('#list');
  list.innerHTML = '';

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

//recuperer les données(nom, prenom, date) et les afficher dans revenue
//___________________________________________________
//partie pape cheikh

// var database = firebase.database()

onSnapshot(eleve, (snapshot) => {
  let eleve = [];
  snapshot.docs.forEach((doc) => {
    eleve.push({ ...doc.data(), id: doc.id });
  });
  eleve.sort((a, b) => b.dateDajout - a.dateDajout);

  const revenue = document.getElementById('revenue');
  let totalEtatFin = 0;
  revenue.innerHTML = '';
  eleve.forEach((utili) => {
    let trbody = document.createElement('tr');
    trbody.innerHTML = `
    <td class="border border-1">${utili.dateDajout
      .toDate()
      .toLocaleDateString()}</td>
      <td class="text-center">${utili.type}</td>
      <td class="text-center border border-1">${utili.prenom} ${utili.nom}</td>
      <td class="border border-1">${utili.etatFin.toLocaleString("en-US")} Fcfa</td>
      `;
    revenue.appendChild(trbody);

    //Calcule du revenue total
    totalEtatFin += parseInt(utili.etatFin);

    const total = document.getElementById('total');
    total.innerHTML = '';
    let trfoot = document.createElement('tr');
    trfoot.innerHTML = `
    <td colspan="3"><b>Total</b></td>
    <td><b>${totalEtatFin.toLocaleString("en-US")} Fcfa </b></td>
    `;
    total.appendChild(trfoot);
    total.appendChild(trfoot);
    const revTotal = document.getElementById('revenuTotal')
    revTotal.innerHTML = `${totalEtatFin.toLocaleString("en-US")} <span class="fw-bold">FCFA</span>`
  });

  const total = document.getElementById('total');
  total.innerHTML = '';
  let trfoot = document.createElement('tr');
  trfoot.innerHTML = `
  <td colspan="3"><b>Total</b></td>
  <td><b>${totalEtatFin.toLocaleString("en-US")} Fcfa </b></td>
  `;
  total.appendChild(trfoot);
  total.appendChild(trfoot);
  const revTotal = document.getElementById('revenuTotal')
  revTotal.innerHTML = `${totalEtatFin.toLocaleString("en-US")} <span class="fw-bold">FCFA</span>`
});

// Enregistrer des données dans le Firebase
const form = document.querySelector('.addToFirebase');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  //Ajouter un nouveau document avec un id généré
  addDoc(eleve, {
    nom: form.nom.value,
    prenom: form.prenom.value,
    etatFin: form.etatFin.value,
    type: form.type.value,
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
  certiesRef.sort((a, b) => b.dateDajout - a.dateDajout);
  const list = document.querySelector('.mytbody');
  list.innerHTML = '';
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
// Mensualite Ladji

const certiesRef2 = collection(db, 'mensualites');

getDocs(certiesRef2).then((snapshot) => {});
onSnapshot(certiesRef2, (snapshot) => {
  let certiesRef2 = [];
  snapshot.docs.forEach((doc) => {
    certiesRef2.push({ ...doc.data(), id: doc.id });
  });
  certiesRef2.sort((a, b) => b.dateDajout - a.dateDajout);
  const list = document.querySelector('.mytbodyIns');
  list.innerHTML = '';

  // console.log(certiesRef2);
  certiesRef2.forEach((utili) => {
    const list = document.querySelector('.mytbodyIns');
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

const myFormInscrip = document.querySelector('.myFormInscrip');

myFormInscrip.addEventListener('submit', (e) => {
  e.preventDefault();
  //Ajouter un nouveau document avec un id généré
  addDoc(certiesRef2, {
    prenom: myFormInscrip.prenomIns.value,
    nom: myFormInscrip.nomIns.value,
    etat: myFormInscrip.etatIns.value,
    classe: myFormInscrip.classe.value,
    type: myFormInscrip.type.value,
    dateDajout: serverTimestamp(),
  }).then(() => myFormInscrip.reset());
});

