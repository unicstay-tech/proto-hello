# Landing carte cadeau : notes marketing et tracking

Pour Nicolas, Kassandre et la personne qui gère GTM / Google Ads. La mise en ligne technique est dans `README-deploiement.md`.

URL de production : https://www.abracadaroom.com/fr/offrir-carte-cadeau/

## 1. Configuration de la page

En tête de `index.html`, bloc `window.LP_CONFIG` : toutes les adresses utiles (page, tunnel d'achat, mini-boutique, page entreprises), la valeur `src=lp-carte-cadeau` et l'ID GTM. GTM ne se charge que sur abracadaroom.com (pas sur la maquette Vercel ni en local).
À chaque modification de `lp.js`, changer son numéro de version dans `index.html` (`lp.js?v=AAAA-MM-JJ`).

## 2. Bandeau cookies et outils du site (via GTM)

Constaté dans le conteneur GTM-WF3MVZ (25/09/2026) : les balises ci-dessous se déclenchent sur toute page dont l'URL contient `www.abracadaroom.com/fr/`. Elles se chargeront donc **automatiquement** sur la landing, sans rien ajouter au code :

| Balise GTM | Sur la landing | Recommandation |
|---|---|---|
| Bandeau cookies (cookieconsent) | oui | garder |
| GA4 G-L7BYJ657F6, Google Ads, pixel Facebook, Affilae, Brevo, Hotjar | oui | garder (mesure) |
| OptinMonster (popups marketing) | oui | **exclure** : une popup sur une page de conversion payante fait perdre des ventes |
| Crisp (chat) | oui | **exclure au lancement** : la bulle recouvre le bouton d'achat collant sur mobile. À réactiver plus tard en test si besoin |

Exclusion dans GTM : créer un déclencheur d'exception « Page Path contient `/fr/offrir-carte-cadeau/` » et l'ajouter en exception aux balises OptinMonster et Crisp.

Note : ces balises alourdissent la page. Les scores Lighthouse mesurés sur la maquette (100/100) sont sans GTM ; ils baisseront un peu en production.

## 3. Paramètres d'URL de la page

| Paramètre | Effet |
|---|---|
| `value` | 50, 100, 150, 200, 250 ou 300 : le bouton est sélectionné. Autre nombre supérieur ou égal à 20 : « Autre montant » s'ouvre pré-rempli (arrondi à l'euro). Absent, inférieur à 20 ou non numérique : 150. |
| `occasion` | `noel`, `anniversaire`, `amoureux`, `derniere-minute`, `spa`, `famille` : change le titre du hero (et le début du sous-titre pour `famille`, `amoureux`, `spa`). Absent ou inconnu : titre par défaut. **L'image du hero change aussi** : défaut et `anniversaire` = couple sous le dôme ; `amoureux` = couple au lit dans la cabane de verre ; `spa` = couple dans le jacuzzi ; `famille` = famille en barque ; `noel` = chalet sous la neige ; `derniere-minute` = carte cadeau en main. « Besoin d'inspiration pour votre mot ? » s'adapte aussi : messages de Noël sans occasion ou avec `noel`, un message dédié en tête pour `amoureux`, `famille`, `spa`, « Pour passer le cap » en tête pour `anniversaire`. |
| `utm_*`, `gclid`, `gbraid`, `wbraid`, `fbclid` | conservés et transmis à tous les liens de sortie (achat, cagnotte, mini-boutique, entreprises), avec `src=lp-carte-cadeau` |

Lien à mettre dans Merchant Center pour un produit à 100 € : `https://www.abracadaroom.com/fr/offrir-carte-cadeau/?value=100` (ajouter `&occasion=noel` pendant la période de Noël).

Exemple de lien d'achat produit par la page :
`https://gift.abracadaroom.com/fr/giftcards/customization/?value=100&utm_source=google&gclid=XXX&src=lp-carte-cadeau`

Les 6 montants sont écrits en dur dans le HTML (vérification de prix Google Merchant Center). Le JS ne fait que présélectionner.

## 4. Tracking (dataLayer)

| Événement | Quand | Paramètres |
|---|---|---|
| `lp_view` | au chargement | `value`, `occasion` (`default` si absente ou inconnue) |
| `select_amount` | à chaque changement de montant | `value` |
| `click_cta` | clic sur un bouton d'achat, ou sur un bouton « Offrir pour… » des occasions | `value`, `occasion`, `position` (`hero`, `sticky`, `occasion`, `final`, `cagnotte`) |
| `click_secondary` | clic vers la mini-boutique bons cadeaux | aucun |
| `click_b2b` | clic vers la page cadeaux d'entreprise | aucun |
| `faq_open` | ouverture d'une question de la FAQ | `question` (intitulé) |

### Ce qui est déjà en place (constaté le 24/09/2026)

| Site | Conteneur GTM | GA4 | Google Ads |
|---|---|---|---|
| Landing (www.abracadaroom.com) | GTM-WF3MVZ | G-L7BYJ657F6 | AW-955531351 |
| Tunnel gift.abracadaroom.com (CNAME mhi.bonkdo.com) | GTM-PL2WTCN + GTM-TD85XBF (Bonkdo) | G-NDQTTQ6S8F | conversion AW-955531351 présente dans GTM-PL2WTCN |

- **Google Ads** : rien à faire. La conversion d'achat de votre compte est déclenchée dans le tunnel, la landing transmet `gclid` et `utm_*` au lien d'achat, et les deux sites partagent le domaine abracadaroom.com. À vérifier dans Google Ads : cette conversion est bien l'action « Achat » principale.
- **GA4** : les visites de la landing sont dans G-L7BYJ657F6, les achats dans G-NDQTTQ6S8F. Pour voir le parcours complet dans une seule propriété, ajouter G-L7BYJ657F6 dans GTM-PL2WTCN.
- **`src=lp-carte-cadeau`** : permet de distinguer, dans le GA4 du tunnel, les visites venues de la landing de celles venues de /fr/carte-cadeau-insolite/. À demander à Bonkdo : ce paramètre est-il conservé jusqu'à la confirmation d'achat ?

### Optionnel : exploiter les événements de la landing dans GA4 (GTM-WF3MVZ)

Pour exploiter les 6 événements ci-dessus dans GA4 :

1. **Variables** (Variables > Nouvelle > Variable de couche de données) : `value`, `occasion`, `position`, `question`. Nommer chacune `DLV - <nom>`.
2. **Déclencheurs** (Déclencheurs > Nouveau > Événement personnalisé), un par événement : `lp_view`, `select_amount`, `click_cta`, `click_secondary`, `click_b2b`, `faq_open`.
3. **Balises** (Balises > Nouvelle > Google Analytics : événement GA4), une par événement, avec l'ID de mesure G-L7BYJ657F6, le même nom d'événement et les paramètres correspondants (`value` = `{{DLV - value}}`, etc.).
4. Dans GA4 : Administration > Définitions personnalisées, créer les dimensions `occasion`, `position` et `question` pour les voir dans les rapports.
5. Tester en mode Aperçu GTM sur la page en ligne, puis publier.

## 5. Contenus à tenir à jour

- **Prix de la galerie** (« À partir de … € la nuit ») : ce sont ceux des hébergements en photo (nommés dans la légende). À vérifier régulièrement.
- **Avis** : avis réels Avis Vérifiés, recopiés tels quels (extraits signalés par « (…) »). Ne jamais les modifier ni en inventer.
- **Médias** (« Vu à la télé et dans la presse ») : noms en texte, remplaçables par les logos officiels.
- **Cagnotte** : le bouton « Créer une cagnotte » pointe vers `https://gift.abracadaroom.com/fr/giftcards/#money_pot` (paramètres de campagne et `src` ajoutés par le script).
- **Photos** : aucune image avec de l'alcool (prudence loi Évin et règles Google Ads). Images du hero par occasion dans `LP_HEROES` (en tête de `index.html`), fichiers `img/hero-*` en deux recadrages. Autres photos : 4:3 pour la galerie (400 et 800 px de large), hero en deux recadrages (mobile 1,7:1 et desktop 1,25:1) avec le couple toujours entier. Garder les mêmes noms de fichiers ou mettre à jour les `srcset`.
- **CGV** : le lien « CGV » du pied de page pointe vers les conditions générales d'utilisation (`/fr/conditions-generales-dutilisation/`), les CGV de la boutique cadeau n'ayant pas d'URL propre.

## 6. Recette

- `?value=50`, `?value=300` : bouton sélectionné. `?value=180` : « Autre montant » ouvert avec 180. `?value=0`, `?value=abc`, sans paramètre : 150.
- Chaque `?occasion=` (`noel`, `anniversaire`, `amoureux`, `derniere-minute`, `spa`, `famille`) et une occasion inconnue.
- Le lien d'achat contient le bon montant, les paramètres de campagne et `src=lp-carte-cadeau`.
- Les 6 événements apparaissent dans la console (`dataLayer`) et dans l'aperçu GTM.
- Balise `noindex, nofollow` présente, robots.txt non bloquant.
- En 375 × 667 : sélecteur de montant et bouton d'achat visibles sans scroller.
- Bouton collant mobile : apparaît quand le bouton du hero sort de l'écran, disparaît au rappel final.
- Bouton « Créer une cagnotte » : lien avec paramètres de campagne, `src` et `#money_pot`.
- Popup Avis Vérifiés : s'ouvre sans quitter la page, se ferme avec la croix, Échap ou un clic à côté.
- Lighthouse mobile en production : performance et accessibilité au-dessus de 90.
- Mesuré sur la maquette (sans GTM) : 100 / 100 / 100, LCP 1,6 s sur mobile.
