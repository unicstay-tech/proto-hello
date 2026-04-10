# HANDOFF : Refonte page /fr/idee-cadeau/ - AbracadaRoom

## Contexte projet

- **URL cible** : `https://www.abracadaroom.com/fr/idee-cadeau/`
- **Stack** : Laravel (Blade templates) + Bootstrap 4.3.1 + jQuery + PHP 7.2 + Popper 1.14.7
- **CDN** : Cloudflare, jQuery CDN, cdnjs
- **Framework mobile** : Onsen UI
- **Avis** : Avis Verifies (Skeepers)
- **Assets existants** : `/assets/img/box/` (logo.svg, giftcard.jpg, why.jpg, payment-mastercard.svg, payment-visa.svg)
- **Développeur** : Sylvain Boisdé (front-end)
- **Contrainte** : travailler DANS le codebase existant (Blade + Bootstrap 4). Ne pas introduire de nouvelle dépendance CSS/JS. Utiliser les classes Bootstrap 4 existantes. Le CSS custom doit s'ajouter au fichier CSS existant du site.

## Couleurs marque

| Variable | Valeur | Usage |
|----------|--------|-------|
| Turquoise principal | `#1babb5` | CTA primaires, accents, icones |
| Bordeaux principal | `#7f204e` | Titres de section, CTA secondaires, hero overlay |
| Blanc | `#ffffff` | Fonds de section alternés |
| Crème / gris clair | `#f8f9fa` (Bootstrap `bg-light`) | Fonds de section alternés |
| Texte principal | `#333333` | Corps de texte |
| Texte secondaire | `#888888` | Sous-titres, métadonnées |

## Typographie

Conserver les polices actuelles du site. Ne pas importer de nouvelles Google Fonts.
Les titres de section utilisent le style existant du site (probablement une font-family définie globalement dans le CSS ABCD).

## Structure de page : ordre des blocs (de haut en bas)

La page actuelle contient ces blocs dans cet ordre :
1. Header/nav (inchangé)
2. Hero avec moteur de recherche
3. Encart carte cadeau (sidebar)
4. "Nos expériences à offrir" (carrousel thématique)
5. "Les coups de coeur de nos clients" (carrousel fiches hébergement)
6. "1000 raisons d'offrir un bon cadeau" (carrousel occasions)
7. "Pourquoi choisir AbracadaRoom" (4 arguments réassurance)
8. "L'avis de nos clients" (widget)
9. Bloc SEO éditorial
10. Footer (inchangé)

**Nouvel ordre cible** (d'après la maquette Canva) :
1. Header/nav (INCHANGE)
2. **Hero** (MODIFIE : plein écran, nouveau titre, 2 CTA)
3. **"Nos offres cadeaux"** (NOUVEAU : comparatif Carte Cadeau vs Bon Cadeau)
4. **Bannière B2B entreprises** (EXISTE mais REMONTE et plus visible)
5. **"Les cadeaux AbracadaRoom c'est..."** (MODIFIE : 5 pictos réassurance, remplace le bloc "Pourquoi choisir")
6. **Avis clients** (EXISTE mais REMONTE)
7. **Moteur de recherche** (EXISTE mais DEPLACE ici, simplifié 3 filtres)
8. **"Nos expériences à offrir"** (EXISTE, MODIFIE en grille magazine)
9. **"1000 raisons d'offrir un bon cadeau"** (EXISTE, carrousel horizontal)
10. **"On met les boxs ?"** (NOUVEAU : bloc box cadeaux physiques)
11. **FAQ** (NOUVEAU : accordéon questions fréquentes)
12. **Bloc SEO** (EXISTE, conservé tel quel)
13. Footer (INCHANGE)

**Blocs supprimés** :
- "Les coups de coeur de nos clients" (carrousel fiches hébergement individuelles) : absent de la maquette

---

## Spécifications bloc par bloc

---

### BLOC 1 : Hero

**Statut** : MODIFIER le bloc existant

**Comportement actuel** : Le hero contient le H1 ("+ de 2500 cadeaux insolites à offrir") et le moteur de recherche (4 selects + bouton).

**Comportement cible** :
- Image de fond plein écran (min-height ~80vh) avec overlay sombre/bordeaux (gradient du bordeaux `#7f204e` vers noir, opacité ~50%)
- Le moteur de recherche est RETIRE du hero (il descend plus bas)
- Contenu centré verticalement et horizontalement, texte blanc

**HTML cible** (utiliser Bootstrap 4) :
```html
<section class="abcd-hero d-flex align-items-center justify-content-center text-center text-white position-relative" style="min-height: 80vh;">
  <!-- Image de fond via CSS background-image sur .abcd-hero -->
  <div class="abcd-hero__overlay position-absolute w-100 h-100" style="top:0;left:0;"></div>
  <div class="container position-relative" style="z-index:2;">
    <h1 class="abcd-hero__title mb-3">
      Découvrez nos offres cadeaux<br>
      pour <em>offrir l'insolite</em>
    </h1>
    <p class="abcd-hero__desc mb-4">
      Bons cadeaux, cartes cadeaux et coffrets pour des séjours uniques
      en cabane, bulle, yourte et bien plus encore.
    </p>
    <div class="abcd-hero__actions">
      <a href="/fr/idee-cadeau/recherche/" class="btn abcd-btn-turquoise btn-lg mr-2 mb-2">Rechercher un cadeau</a>
      <a href="https://faq.abracadaroom.com/fr/category/boutique-cadeau-1ng6hb8/" class="btn btn-outline-light btn-lg mb-2">Comment utiliser mon cadeau ?</a>
    </div>
  </div>
</section>
```

**CSS custom à ajouter** :
```css
.abcd-hero {
  background: url('/assets/img/box/hero-cadeau.jpg') center/cover no-repeat;
  /* Sylvain : utiliser l'image hero existante ou en créer une nouvelle */
}
.abcd-hero__overlay {
  background: linear-gradient(180deg, rgba(127,32,78,0.45) 0%, rgba(26,26,26,0.55) 100%);
  z-index: 1;
}
.abcd-hero__title {
  font-size: 2.75rem;
  line-height: 1.2;
}
.abcd-hero__title em {
  font-style: italic;
}
.abcd-hero__desc {
  font-size: 1.125rem;
  font-weight: 300;
  opacity: 0.9;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}
.abcd-btn-turquoise {
  background-color: #1babb5;
  border-color: #1babb5;
  color: #fff;
  border-radius: 50px;
  padding: 12px 32px;
  font-weight: 600;
}
.abcd-btn-turquoise:hover {
  background-color: #148a93;
  border-color: #148a93;
  color: #fff;
}
.abcd-btn-bordeaux {
  background-color: #7f204e;
  border-color: #7f204e;
  color: #fff;
  border-radius: 50px;
  padding: 12px 32px;
  font-weight: 600;
}
.abcd-btn-bordeaux:hover {
  background-color: #5e1839;
  border-color: #5e1839;
  color: #fff;
}

@media (max-width: 768px) {
  .abcd-hero { min-height: 70vh; }
  .abcd-hero__title { font-size: 1.75rem; }
}
```

**SEO** : Le H1 passe de "+ de 2500 cadeaux insolites à offrir" à "Découvrez nos offres cadeaux pour offrir l'insolite". L'ancien H1 peut devenir un texte d'accroche ailleurs.

---

### BLOC 2 : Nos offres cadeaux (Carte Cadeau vs Bon Cadeau)

**Statut** : NOUVEAU BLOC (remplace l'encart latéral carte cadeau)

**Description** : Deux cartes côte à côte comparant les deux formules. Chaque carte a une image, un tag, un titre, une liste d'avantages (check marks), et un CTA.

**HTML cible** :
```html
<section class="abcd-offers py-5 bg-light">
  <div class="container">
    <h2 class="abcd-section-title text-center mb-2">Nos offres cadeaux</h2>
    <p class="text-center text-muted mb-5">Deux formules pour offrir l'insolite selon vos envies</p>
    <div class="row justify-content-center">

      <!-- Carte Cadeau -->
      <div class="col-md-5 mb-4">
        <div class="card abcd-offer-card h-100 border-0 shadow-sm">
          <img src="/assets/img/box/carte-cadeau-visuel.jpg" class="card-img-top" alt="Carte Cadeau AbracadaRoom" style="height: 220px; object-fit: cover;">
          <!-- Sylvain : remplacer par le vrai visuel carte cadeau -->
          <div class="card-body d-flex flex-column">
            <span class="abcd-tag mb-2">Flexibilité maximale</span>
            <h3 class="abcd-offer-card__title">La Carte Cadeau</h3>
            <ul class="abcd-check-list flex-grow-1">
              <li>Utilisable en plusieurs fois</li>
              <li>Valable sur tous les hébergements du site</li>
              <li>Montant libre</li>
              <li>Envoi postal possible</li>
            </ul>
            <a href="/fr/carte-cadeau-insolite/" class="btn abcd-btn-turquoise btn-block">Offrir une carte cadeau</a>
          </div>
        </div>
      </div>

      <!-- Bon Cadeau -->
      <div class="col-md-5 mb-4">
        <div class="card abcd-offer-card h-100 border-0 shadow-sm">
          <img src="/assets/img/box/bon-cadeau-visuel.jpg" class="card-img-top" alt="Bon Cadeau AbracadaRoom" style="height: 220px; object-fit: cover;">
          <!-- Sylvain : remplacer par le vrai visuel bon cadeau -->
          <div class="card-body d-flex flex-column">
            <span class="abcd-tag mb-2">Coup de coeur</span>
            <h3 class="abcd-offer-card__title">Le Bon Cadeau</h3>
            <ul class="abcd-check-list flex-grow-1">
              <li>Valable sur un hébergement spécifique</li>
              <li>Valable pour toutes les dates, sans restrictions</li>
              <li>Possibilité de commander les options disponibles en ligne</li>
            </ul>
            <a href="/fr/idee-cadeau/recherche/" class="btn abcd-btn-bordeaux btn-block">Trouver un bon cadeau</a>
          </div>
        </div>
      </div>

    </div>
  </div>
</section>
```

**CSS custom** :
```css
.abcd-section-title {
  color: #7f204e;
  font-size: 2rem;
}
.abcd-offer-card {
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.abcd-offer-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 32px rgba(0,0,0,0.12) !important;
}
.abcd-offer-card__title {
  color: #7f204e;
  font-size: 1.5rem;
  margin-bottom: 16px;
}
.abcd-tag {
  display: inline-block;
  background: #e6f7f8;
  color: #148a93;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 4px 12px;
  border-radius: 50px;
  text-transform: uppercase;
  letter-spacing: 1px;
}
.abcd-check-list {
  list-style: none;
  padding: 0;
  margin-bottom: 24px;
}
.abcd-check-list li {
  position: relative;
  padding-left: 28px;
  margin-bottom: 10px;
  font-size: 0.9375rem;
  line-height: 1.4;
}
.abcd-check-list li::before {
  content: '\2713';
  position: absolute;
  left: 0;
  color: #1babb5;
  font-weight: 700;
  font-size: 1rem;
}
```

---

### BLOC 3 : Bannière B2B / Entreprises

**Statut** : EXISTE (lien vers /fr/cadeaux-entreprise/), REMONTER et rendre plus visible

**HTML cible** :
```html
<section class="py-4">
  <div class="container">
    <div class="abcd-b2b-banner rounded p-4 p-md-5 d-flex flex-column flex-md-row align-items-center justify-content-between text-white">
      <div class="mb-3 mb-md-0">
        <h3 class="h5 mb-1">Vous êtes une entreprise ?</h3>
        <p class="mb-0" style="opacity:0.9;">Offrez un cadeau original à vos collaborateurs avec nos solutions CSE et corporate.</p>
      </div>
      <a href="/fr/cadeaux-entreprise/" class="btn btn-outline-light text-nowrap">Découvrir nos offres</a>
    </div>
  </div>
</section>
```

**CSS** :
```css
.abcd-b2b-banner {
  background: linear-gradient(135deg, #7f204e 0%, #5e1839 100%);
}
```

---

### BLOC 4 : Réassurance "Les cadeaux AbracadaRoom c'est..."

**Statut** : MODIFIER le bloc "Pourquoi choisir AbracadaRoom" existant

**Ce qui change** :
- Titre : "Pourquoi choisir AbracadaRoom ?" devient "Les cadeaux AbracadaRoom c'est..."
- 4 arguments textuels deviennent 5 pictos avec labels courts
- Le bloc remonte dans la page (avant les expériences au lieu d'après)

**5 items** (avec icones, utiliser des SVG inline ou Font Awesome si déjà chargé) :

| Icone | Label |
|-------|-------|
| Calendrier | Valable 18 mois |
| Etoile | 100% insolite garanti |
| Cadenas | Paiement sécurisé |
| Eclair/email | Réception immédiate par email |
| Euro | A partir de 20 euros |

**HTML cible** :
```html
<section class="abcd-reassurance py-5">
  <div class="container">
    <h2 class="abcd-section-title text-center mb-5">Les cadeaux AbracadaRoom c'est...</h2>
    <div class="row text-center">
      <div class="col-6 col-md mb-4">
        <div class="abcd-reassurance__icon mx-auto mb-3">
          <!-- SVG calendrier inline ici -->
        </div>
        <p class="abcd-reassurance__label">Valable 18 mois</p>
      </div>
      <div class="col-6 col-md mb-4">
        <div class="abcd-reassurance__icon mx-auto mb-3">
          <!-- SVG étoile -->
        </div>
        <p class="abcd-reassurance__label">100% insolite garanti</p>
      </div>
      <div class="col-6 col-md mb-4">
        <div class="abcd-reassurance__icon mx-auto mb-3">
          <!-- SVG cadenas -->
        </div>
        <p class="abcd-reassurance__label">Paiement sécurisé</p>
      </div>
      <div class="col-6 col-md mb-4">
        <div class="abcd-reassurance__icon mx-auto mb-3">
          <!-- SVG email/eclair -->
        </div>
        <p class="abcd-reassurance__label">Réception immédiate par email</p>
      </div>
      <div class="col-6 col-md mb-4">
        <div class="abcd-reassurance__icon mx-auto mb-3">
          <!-- SVG euro -->
        </div>
        <p class="abcd-reassurance__label">A partir de 20 &euro;</p>
      </div>
    </div>
  </div>
</section>
```

**CSS** :
```css
.abcd-reassurance__icon {
  width: 56px;
  height: 56px;
  background: #e6f7f8;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.abcd-reassurance__icon svg {
  width: 28px;
  height: 28px;
  color: #1babb5;
  stroke: #1babb5;
}
.abcd-reassurance__label {
  font-weight: 600;
  font-size: 0.9375rem;
  color: #333;
}
```

---

### BLOC 5 : Avis clients

**Statut** : EXISTE (en bas de page), REMONTER ici

**Action** : Déplacer le widget Avis Verifies et le badge Google existants juste sous le bloc réassurance. Pas de modification de contenu, juste un déplacement dans le template Blade.

**Layout** : Centré, les deux badges côte à côte (flex-wrap sur mobile). Utiliser le code d'intégration existant Avis Verifies/Skeepers.

---

### BLOC 6 : Moteur de recherche

**Statut** : EXISTE (actuellement dans le hero), DEPLACER ici et SIMPLIFIER

**Ce qui change** :
- Retiré du hero, devient un bloc indépendant
- Simplifié à 3 filtres : Région, Budget, Nb de personnes (l'actuel a aussi "Type d'hébergement" qui est retiré)
- Layout horizontal inline (comme une barre de recherche Airbnb) au lieu de 4 selects empilés

**HTML cible** :
```html
<section class="abcd-search py-5 bg-light">
  <div class="container">
    <p class="text-center text-uppercase font-weight-bold mb-4" style="color:#7f204e; letter-spacing:1px; font-size:0.875rem;">
      Rechercher une expérience insolite à offrir
    </p>
    <div class="row justify-content-center">
      <div class="col-lg-8">
        <div class="abcd-search-bar d-flex align-items-center bg-white rounded-pill shadow-sm p-1 pl-4">
          <select class="abcd-search-select flex-fill border-0" name="region">
            <option value="">Région</option>
            <!-- Reprendre la liste existante des régions -->
          </select>
          <div class="abcd-search-divider mx-2"></div>
          <select class="abcd-search-select flex-fill border-0" name="budget">
            <option value="">Budget</option>
            <option>- de 100 &euro;</option>
            <option>100 à 250 &euro;</option>
            <option>250 à 500 &euro;</option>
            <option>+ de 500 &euro;</option>
          </select>
          <div class="abcd-search-divider mx-2"></div>
          <select class="abcd-search-select flex-fill border-0" name="occupants">
            <option value="">Nb de personnes</option>
            <option>2 personnes</option>
            <option>3 personnes et +</option>
          </select>
          <button class="btn abcd-btn-turquoise ml-2 text-nowrap" type="submit">Rechercher</button>
        </div>
      </div>
    </div>
  </div>
</section>
```

**CSS** :
```css
.abcd-search-select {
  background: transparent;
  font-size: 0.9375rem;
  padding: 12px 0;
  appearance: none;
  -webkit-appearance: none;
  outline: none;
  color: #333;
}
.abcd-search-divider {
  width: 1px;
  height: 24px;
  background: #e8e8e8;
}

/* Mobile : empiler les selects */
@media (max-width: 768px) {
  .abcd-search-bar {
    flex-direction: column !important;
    border-radius: 12px !important;
    padding: 16px !important;
  }
  .abcd-search-select {
    width: 100%;
    padding: 12px 0;
    border-bottom: 1px solid #e8e8e8;
  }
  .abcd-search-divider { display: none; }
  .abcd-search-bar .btn {
    width: 100%;
    margin-top: 12px;
    margin-left: 0 !important;
    border-radius: 8px;
  }
}
```

**Note** : Le formulaire doit pointer vers la même URL/action que le moteur de recherche existant. Reprendre le JS de soumission existant.

---

### BLOC 7 : Nos expériences à offrir

**Statut** : EXISTE (carrousel de 7 thématiques), MODIFIER le layout

**Ce qui change** :
- Le carrousel horizontal devient une grille "magazine" (type Masonry/Pinterest)
- Layout : 3 colonnes, première colonne = carte grande (span 2 rows), les autres = petites
- Chaque carte : image de fond, overlay gradient, nombre de bons cadeaux, titre

**Thématiques à afficher** (reprendre les liens existants) :

| Thématique | URL | Nb bons cadeaux |
|------------|-----|-----------------|
| Idée séjour avec spa privatif | /fr/idee-cadeau/sejour-spa-et-bien-etre/ | 1104 |
| Idée cadeau à la montagne | /fr/idee-cadeau/sejour-a-la-montagne/ | 445 |
| Idée cadeau romantique | /fr/idee-cadeau/sejour-romantique/ | 2026 |
| Idée cadeau Noël | /fr/idee-cadeau/noel/ | 2944 |
| Idée cadeau en famille | /fr/idee-cadeau/sejour-en-famille/ | dynamique |
| Dormir dans une bulle | /fr/idee-cadeau/bulle/ | 126 |
| Dormir dans une cabane dans les arbres | /fr/idee-cadeau/cabane-dans-les-arbres/ | 315 |
| Dormir dans une cabane sur l'eau | /fr/idee-cadeau/cabane-sur-l-eau/ | 69 |

**HTML cible (première rangée)** :
```html
<section class="abcd-experiences py-5">
  <div class="container">
    <h2 class="abcd-section-title text-center mb-2">Nos expériences à offrir...</h2>
    <p class="text-center text-muted mb-5">Plus qu'un cadeau, offrez un souvenir inoubliable</p>
    <div class="abcd-exp-grid">
      <a href="/fr/idee-cadeau/sejour-spa-et-bien-etre/" class="abcd-exp-card abcd-exp-card--large">
        <img src="IMAGE_SPA.jpg" alt="Séjour spa privatif">
        <div class="abcd-exp-card__overlay"></div>
        <div class="abcd-exp-card__content">
          <p class="abcd-exp-card__count">1104 bons cadeaux</p>
          <h3 class="abcd-exp-card__title">Idée séjour avec spa privatif</h3>
        </div>
      </a>
      <a href="/fr/idee-cadeau/sejour-a-la-montagne/" class="abcd-exp-card">
        <img src="IMAGE_MONTAGNE.jpg" alt="Séjour montagne">
        <div class="abcd-exp-card__overlay"></div>
        <div class="abcd-exp-card__content">
          <p class="abcd-exp-card__count">445 bons cadeaux</p>
          <h3 class="abcd-exp-card__title">Idée cadeau à la montagne</h3>
        </div>
      </a>
      <!-- etc. pour chaque thématique -->
    </div>
  </div>
</section>
```

**CSS** :
```css
.abcd-exp-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}
.abcd-exp-card {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  min-height: 280px;
  display: flex;
  align-items: flex-end;
  transition: transform 0.3s ease;
}
.abcd-exp-card:hover { transform: scale(1.02); }
.abcd-exp-card--large {
  grid-row: span 2;
  min-height: 580px;
}
.abcd-exp-card img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
}
.abcd-exp-card:hover img { transform: scale(1.08); }
.abcd-exp-card__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(0deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.05) 60%);
}
.abcd-exp-card__content {
  position: relative;
  z-index: 2;
  padding: 24px;
  color: #fff;
  width: 100%;
}
.abcd-exp-card__count {
  font-size: 0.75rem;
  font-weight: 500;
  opacity: 0.85;
  margin-bottom: 4px;
}
.abcd-exp-card__title {
  font-size: 1.25rem;
  margin: 0;
}
.abcd-exp-card--large .abcd-exp-card__title {
  font-size: 1.5rem;
}

@media (max-width: 768px) {
  .abcd-exp-grid { grid-template-columns: 1fr 1fr; }
  .abcd-exp-card--large { grid-column: span 2; grid-row: span 1; min-height: 250px; }
  .abcd-exp-card { min-height: 200px; }
}
@media (max-width: 480px) {
  .abcd-exp-grid { grid-template-columns: 1fr; }
  .abcd-exp-card--large { grid-column: span 1; }
}
```

**Note** : Le nombre de bons cadeaux est probablement déjà dynamique dans le Blade existant. Reprendre le même `@foreach` ou variable.

---

### BLOC 8 : 1000 raisons d'offrir un bon cadeau

**Statut** : EXISTE, conserver le carrousel horizontal actuel

**Ce qui change** : Rien de structurel. Le bloc reste un carrousel horizontal scroll des occasions (anniversaire, St-Valentin, fête des mères, mariage, Noël, dernière minute, anniversaire de mariage, départ à la retraite).

**Action** : Conserver le code Blade existant. Juste le déplacer dans le bon ordre du template.

---

### BLOC 9 : On met les boxs ?

**Statut** : NOUVEAU BLOC

**Description** : Section présentant les box cadeaux physiques (coffrets vendus chez Fnac, Cultura, Nature & Découvertes). 3 cartes en grille.

**HTML cible** :
```html
<section class="abcd-boxs py-5">
  <div class="container">
    <h2 class="abcd-section-title text-center mb-2">On met les boxs ?</h2>
    <p class="text-center text-muted mb-5">Nos coffrets cadeaux physiques disponibles en boutique</p>
    <div class="row justify-content-center">
      <div class="col-sm-6 col-md-4 mb-4">
        <div class="abcd-box-card text-center p-4 rounded bg-light">
          <img src="IMAGE_BOX_1.jpg" alt="Box Nuit Insolite" class="rounded mb-3" style="width:180px;height:180px;object-fit:cover;">
          <h3 class="h6" style="color:#7f204e;">Box Nuit Insolite</h3>
          <p class="text-muted small">A partir de 89 &euro;</p>
        </div>
      </div>
      <!-- Répéter pour chaque box -->
    </div>
  </div>
</section>
```

**Note** : Les box, visuels et prix sont à fournir par Nicolas. Placeholder en attendant.

---

### BLOC 10 : FAQ (accordéon)

**Statut** : NOUVEAU BLOC

**Description** : Accordéon de 7 questions fréquentes. Utiliser le composant Bootstrap 4 Collapse/Accordion natif.

**Questions** :

1. Quelle est la différence entre une carte cadeau et un bon cadeau ?
2. Quelles sont les conditions d'achat d'une carte cadeau ?
3. Quelle est la durée de validité d'une carte cadeau ?
4. Quels sont les délais et les modes de livraison ?
5. Je n'ai pas reçu la carte cadeau, comment faire ?
6. Comment utiliser la carte cadeau ?
7. Comment faire si le montant de l'achat est supérieur à la carte cadeau ?

**HTML cible** (Bootstrap 4 accordion) :
```html
<section class="abcd-faq py-5 bg-light">
  <div class="container">
    <h2 class="abcd-section-title text-center mb-2">Questions fréquentes</h2>
    <p class="text-center text-muted mb-5">Tout ce qu'il faut savoir avant d'offrir</p>
    <div class="row justify-content-center">
      <div class="col-lg-8">
        <div id="abcd-faq-accordion">

          <div class="card border-0 mb-2 rounded">
            <div class="card-header bg-white border-0 p-0" id="faq-h-1">
              <button class="btn btn-block text-left font-weight-bold p-3 abcd-faq-btn collapsed"
                      data-toggle="collapse" data-target="#faq-1" aria-expanded="false">
                Quelle est la différence entre une carte cadeau et un bon cadeau ?
              </button>
            </div>
            <div id="faq-1" class="collapse" data-parent="#abcd-faq-accordion">
              <div class="card-body text-muted pt-0">
                La carte cadeau est un montant libre utilisable en plusieurs fois
                sur tous les hébergements du site. Le bon cadeau (e-coffret) est lié
                à un hébergement spécifique, avec la possibilité de commander les options
                disponibles. Les deux sont valables 18 mois.
              </div>
            </div>
          </div>

          <!-- Répéter pour chaque question -->

        </div>
      </div>
    </div>
  </div>
</section>
```

**CSS** :
```css
.abcd-faq-btn {
  font-size: 0.9375rem;
  color: #333;
  border: none;
  transition: color 0.2s;
}
.abcd-faq-btn:hover { color: #1babb5; text-decoration: none; }
.abcd-faq-btn:focus { box-shadow: none; }
```

**SEO/GEO** : Ce bloc FAQ est important pour le SEO (rich snippets FAQ schema) et le GEO (format question/réponse repris par les AI Overviews). Ajouter le balisage JSON-LD FAQPage :
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Quelle est la différence entre une carte cadeau et un bon cadeau ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "La carte cadeau est un montant libre utilisable en plusieurs fois sur tous les hébergements du site. Le bon cadeau (e-coffret) est lié à un hébergement spécifique, avec la possibilité de commander les options disponibles. Les deux sont valables 18 mois."
      }
    }
    // ... répéter pour chaque question
  ]
}
</script>
```

---

### BLOC 11 : Bloc SEO éditorial

**Statut** : EXISTE, conserver tel quel

**Action** : Ne rien modifier. Reprendre le HTML/Blade existant à l'identique. Il contient :
- H2 : "A la recherche d'une idée cadeau originale autour d'un séjour ?"
- H3 : "Un cadeau personnalisé, sans contrainte"
- H3 : "Différentes façons d'imaginer une idée cadeau"
- H3 : "Un séjour à offrir, en toute liberté"
- Liens internes vers le générateur d'idées cadeaux et la carte cadeau

---

## Récapitulatif des fichiers à modifier

| Fichier | Action |
|---------|--------|
| Template Blade de la page /fr/idee-cadeau/ | Restructurer l'ordre des sections, ajouter les nouveaux blocs |
| CSS custom du site (ou fichier dédié) | Ajouter les classes `.abcd-*` listées ci-dessus |
| Aucun nouveau JS | Utiliser Bootstrap 4 Collapse natif pour la FAQ, jQuery existant pour le moteur de recherche |

## Contraintes pour Claude Code

- **NE PAS** installer de nouvelles dépendances npm/composer
- **NE PAS** importer de nouvelles Google Fonts
- **NE PAS** modifier le header, le footer, ni la navigation
- **UTILISER** les classes Bootstrap 4.3.1 en priorité (row, col-*, card, btn, d-flex, etc.)
- **PREFIXER** toutes les classes custom avec `abcd-` pour éviter les conflits
- Les classes `.abcd-btn-turquoise` et `.abcd-btn-bordeaux` sont réutilisables partout
- Les images sont des placeholders, Sylvain les remplacera par les vrais assets
- Le contenu textuel (FAQ, réassurance) est définitif
- Le nombre de bons cadeaux par thématique est dynamique (variable Blade)

## Référence visuelle

La maquette Canva PDF (fichier `Decouvrez_nos_offres_cadeaux.pdf`) est la source de vérité pour l'ordre et le contenu des blocs. Se baser uniquement sur ce PDF et sur les specs ci-dessus pour coder.
