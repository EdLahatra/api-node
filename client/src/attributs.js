const allergie = [
  'name',
  'categorie',
  'description',
];

const urgence = [
  'description',
  'pays',
  'numero',
  'service',
];

const centre = [
  'name',
  'service',
  'numero',
  'rue',
  'cp',
  'ville',
  'telephone',
  'email',
];

const voyage = [
  'user',
  'pays',
  'name',
  'dateArrive',
  'dateDepart',
];

const pays = [
  'name',
  'capital',
  'indicatifPhone',
  'decalageHoraore',
  'monnaie',
  'permis',
  'maladie',
  'centre',
  'medecin',
];

const sejour = [
  'description',
  'isQuestion',
];

const sante = [
  'sanguin',
  'poids',
  'user',
  'allergie',
  'problemeSantePasse',
  'problemeSanteEncours',
  'naissance',
];

export default  {
  urgence,
  centre,
  voyage,
  pays,
  sejour,
  sante,
  allergie,
};
