# Modifier le site du concert, sans savoir coder

Tout ce qui change au fil des mois se trouve dans **un seul fichier** : `infos.js`.
Tu n'as jamais besoin d'ouvrir les autres.

Deux façons de faire, au choix.

## La façon simple : l'interface

**https://debuche-montdemarsan.fr/admin.html**

Une page avec des champs à remplir. Elle se pré-remplit avec ce qui est
actuellement en ligne, tu modifies ce que tu veux, tu cliques sur **Copier**,
puis tu colles dans GitHub en suivant les trois étapes affichées à l'écran.

Aucune syntaxe à respecter : les guillemets et les virgules sont écrits pour
toi. C'est la méthode à privilégier.

## La façon directe : modifier le fichier

1. Va sur **https://github.com/Jeremie40430/jeremie40430.github.io**
2. Clique sur le fichier **`infos.js`**
3. En haut à droite du fichier, clique sur le **crayon** ✏️
4. Modifie ce que tu veux, entre les guillemets
5. Descends en bas de la page, clique sur le bouton vert **Commit changes**
6. Attends une minute, puis recharge le site : c'est en ligne

C'est tout. Pas de logiciel à installer, ça marche depuis ton téléphone.

## Les trois règles

1. **Ne touche pas aux mots à gauche des deux-points.** Tu changes ce qui est
   à droite, entre guillemets.
2. **Garde les guillemets et la virgule** en fin de ligne.
3. **Une info pas encore connue reste vide** : `""`. Le site affiche alors son
   texte par défaut, jamais un trou.

## Ce que tu peux changer toi-même

| Ce que tu veux faire | La ligne à modifier dans `infos.js` |
| --- | --- |
| Annoncer l'heure du concert | `heure` |
| Annoncer l'ouverture des portes | `ouverturePortes` |
| Ouvrir les réservations | `billetterieOuverte` puis `lienBilletterie` |
| Afficher les tarifs | `tarifs` |
| Publier le programme | `programme` |
| Donner un contact | `email` et `facebook` |
| Ajouter un partenaire | `partenaires` |
| Préciser les parkings | `stationnement` |
| Préciser l'accès handicapé | `accessibilite` |

## Le jour où la billetterie ouvre

Deux choses à faire, dans `infos.js` :

```js
billetterieOuverte: true,
lienBilletterie: "https://www.helloasso.com/associations/.../evenements/...",
```

Le lien de billetterie devient « Réserver ma place » et le panneau de réservation
affiche son bouton. **Le QR code des affiches n'est pas à refaire** : il passe
par la page `/reserver/`, qui lit ces mêmes réglages. Tant que la billetterie
est fermée ou que son lien est vide, cette page affiche l'ouverture prochaine.

## Ajouter les photos

Sur la page du dépôt, bouton **Add file** puis **Upload files**. Dépose les
fichiers à la racine, avec exactement ces noms :

- `debuche-notre-dame-choeur.jpg` — la grande photo du groupe à l'accueil
- `logo-debuche.png` — le logo, facultatif, dans la rubrique du Débuché
- `affiche-partage.jpg` — 1200 × 630 px, l'image qui s'affiche quand on partage
  le lien sur Facebook

Remplacer un fichier par une photo portant le même nom met à jour son visuel.
Pour une nouvelle photo ou une légende différente, demande-moi de modifier la
page correspondante pour conserver les bonnes dimensions et les crédits.

## Avant l'annonce publique

Les cinq pages principales restent invisibles sur Google tant que la balise
ci-dessous est présente. Quand tout est prêt, dis-le-moi et je l'enlève dans
`index.html`, `le-debuche-de-paris/index.html`, `la-trompe/index.html`,
`ecole-de-beaussiet/index.html` et `infos-pratiques/index.html` :

```html
<meta name="robots" content="noindex">
```

## Si tu casses quelque chose

Rien n'est jamais perdu. GitHub garde chaque version, et on revient à la
précédente en deux clics depuis l'onglet **History** du fichier. Dis-le-moi et
je remets tout d'aplomb.

## Ce qui reste de mon côté

Changer les textes de présentation, la mise en page, les couleurs, ajouter une
section. Pour ça, écris-moi.
