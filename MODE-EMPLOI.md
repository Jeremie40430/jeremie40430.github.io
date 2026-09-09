# Modifier le site du concert, sans savoir coder

Tout ce qui change au fil des mois se trouve dans **un seul fichier** : `infos.js`.
Tu n'as jamais besoin d'ouvrir les autres.

## Comment modifier une info, en une minute

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

Les boutons « Bientôt en réservation » deviennent aussitôt « Réserver ma place »
et pointent vers HelloAsso. **Le QR code des affiches n'est pas à refaire** : il
passe par la page `/reserver/`, qui lit cette même ligne.

## Ajouter les photos

Sur la page du dépôt, bouton **Add file** puis **Upload files**. Dépose les
fichiers à la racine, avec exactement ces noms :

- `debuche-groupe.jpg` — la photo du groupe, environ 2000 px de large
- `logo-debuche.png` — le logo
- `affiche-partage.jpg` — 1200 × 630 px, l'image qui s'affiche quand on partage
  le lien sur Facebook

Ils apparaissent tout seuls sur la page une fois déposés.

## Avant l'annonce publique

La page est invisible sur Google tant qu'une ligne est présente dans
`index.html`. Quand tout est prêt, dis-le-moi et je l'enlève, ou supprime
toi-même cette ligne :

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
