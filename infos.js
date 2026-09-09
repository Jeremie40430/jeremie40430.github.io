/* ===========================================================================
   LES INFOS DU CONCERT — c'est le seul fichier que tu as besoin de modifier
   ===========================================================================

   COMMENT ÇA MARCHE
   Tout ce qui est entre guillemets "comme ceci" est du texte que tu peux
   changer librement. Le site se met à jour tout seul, une minute après.

   LES TROIS RÈGLES À NE PAS OUBLIER
   1. Ne touche pas aux mots à gauche des deux-points. Change ce qui est
      entre guillemets, à droite.
   2. Garde toujours les guillemets et la virgule en fin de ligne.
   3. Si une info n'est pas encore connue, laisse "" (deux guillemets collés).
      Le site affichera « à confirmer » à la place, proprement.

   Si tu casses quelque chose, rien n'est perdu : GitHub garde toutes les
   versions, on revient en arrière en deux clics.
   =========================================================================== */

var INFOS = {

  /* --- L'HORAIRE ------------------------------------------------------- */

  // L'heure du concert. Exemple : "20 h 30"
  heure: "",

  // L'heure d'ouverture des portes. Exemple : "19 h 45"
  ouverturePortes: "",


  /* --- LA BILLETTERIE --------------------------------------------------- */

  // Mets true le jour où les réservations ouvrent, false avant.
  // Attention : true et false s'écrivent sans guillemets.
  billetterieOuverte: false,

  // Le lien de la campagne HelloAsso, à coller ici le jour de l'ouverture.
  // Exemple : "https://www.helloasso.com/associations/xxx/evenements/yyy"
  lienBilletterie: "",

  // Les tarifs. Tu peux en ajouter ou en retirer en copiant une ligne
  // entière, virgule comprise.
  tarifs: [
    // { nom: "Plein tarif",        prix: "25 €" },
    // { nom: "Tarif réduit",       prix: "15 €" },
    // { nom: "Moins de 12 ans",    prix: "Gratuit" },
  ],


  /* --- LE PROGRAMME ----------------------------------------------------- */

  // Une phrase d'introduction, si tu veux. Sinon laisse "".
  programmeIntro: "",

  // La liste des morceaux ou des parties du concert.
  // Une ligne par morceau, entre guillemets, séparées par des virgules.
  programme: [
    // "Fanfare d'ouverture",
    // "Les fanfares de circonstance",
    // "Entracte",
  ],


  /* --- NOUS CONTACTER --------------------------------------------------- */

  // L'adresse mail de l'association.
  email: "",

  // Le lien de la page Facebook. Laisse "" s'il n'y en a pas.
  facebook: "",


  /* --- LES PARTENAIRES -------------------------------------------------- */

  // Le nom des partenaires, au fur et à mesure des accords signés.
  partenaires: [
    // "Ville de Mont-de-Marsan",
    // "Fédération des chasseurs des Landes",
  ],


  /* --- INFOS PRATIQUES -------------------------------------------------- */

  // Les parkings à recommander. Laisse "" pour garder le texte par défaut.
  stationnement: "",

  // L'accès pour les personnes à mobilité réduite.
  accessibilite: "",

};
