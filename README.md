# Concert du centenaire du Débuché de Paris — Mont-de-Marsan

Site statique publié par GitHub Pages sur **https://debuche-montdemarsan.fr/**.
Pas de framework, de compilation ou de dépendance JavaScript à installer.

## Organisation depuis la refonte du 17 octobre 2026

Présentation issue du viewer validé : fond ivoire dominant, bleu nuit pour
le texte et le pied de page, rouge des tenues pour les actions, touches bronze.
Le menu comporte cinq vraies pages accessibles sans JavaScript :

| Adresse | Contenu |
| --- | --- |
| `/` | Concert, photos, extraits, programme et accès aux autres rubriques |
| `/le-debuche-de-paris/` | Histoire du groupe, archives et centenaire |
| `/la-trompe/` | Instrument, UNESCO, FITF et FRTM |
| `/ecole-de-beaussiet/` | Histoire de l’école, événements et contacts |
| `/infos-pratiques/` | Billetterie, accès, repas, hébergements, FAQ et histoire de la Madeleine |

Les textes historiques, photographies et crédits de l’ancienne page ont été
conservés dans ces rubriques. Les anciens liens `/#fitf`, `/#ecole`, etc. sont
redirigés vers la bonne rubrique par le script commun. Un lien direct vers
une section de la Madeleine ouvre automatiquement son volet.

## Fichiers partagés

- `assets/site.css` : palette, typographie, mise en page et adaptation mobile.
- `assets/site.js` : informations du concert, billetterie, coordonnées masquées,
  lecteurs vidéo et plan au clic, agrandissement des photos.
- `infos.js` : **seule source pour les réglages du concert**. Le fichier et ses
  valeurs ont été conservés. L’administration reste sur `/admin.html`.
- `/reserver/` : adresse stable des QR codes. Redirige uniquement si la
  billetterie est ouverte et son lien HTTP(S) est renseigné ; sinon, affiche
  l’annonce d’ouverture prochaine.

Le programme, les horaires, les tarifs, les partenaires, les parkings et les
hébergements restent alimentés par `infos.js`. Les lecteurs YouTube sans cookie
et le plan Google sont créés uniquement après un clic. Les contacts sont
révélés au clic. La navigation principale fonctionne même sans JavaScript.

## Mise en ligne et indexation

GitHub Pages publie la branche `main`. Le domaine et la configuration GitHub
Pages sont conservés. Les cinq pages gardent `noindex`, conformément à l’état
antérieur, jusqu’à la validation de l’annonce publique. Chaque page dispose
d’un titre, d’une description et d’une adresse canonique propres.

Pour ouvrir la billetterie, renseigner `billetterieOuverte: true` **et**
`lienBilletterie` dans `infos.js`. Le QR code ne change pas.

Le guide des mises à jour courantes se trouve dans `MODE-EMPLOI.md`.
