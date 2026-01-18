# 🌿 Matawi

**Matawi** est une plateforme interactive conçue par et pour les développeurs débutants. Le but est simple : offrir un espace pour mettre en pratique ses compétences en développement web (HTML/CSS/JS) en ajoutant des fonctionnalités de manière modulaire.

🚀 **Le concept :** Tu codes une fonctionnalité, tu l'enregistres dans la "base de données" JSON, et elle apparaît automatiquement sur le site !

---

## 🛠️ Technologies utilisées
- **Frontend :** HTML5, CSS3, JavaScript (Vanilla)
- **Données :** Fichier JSON local
- **Déploiement :** GitHub Pages

---

## 📂 Structure du Projet
Le projet est construit sans backend pour rester accessible à tous :
- **Pages :** 4 pages principales pour naviguer dans l'écosystème.
- **Data-driven :** L'affichage des fonctionnalités est piloté par le fichier `/data/features.json`.
---

## 🚀 Comment contribuer ?
C'est ici que tu peux t'exercer ! Pour ajouter ta propre fonctionnalité :

1. **Fork** le projet.
2. **Crée ton code** (HTML/CSS/JS) dans les dossiers respectifs.
**Structure à suivre**
    Matawi/
    ├── features/
    │   ├── calculatrice/
    │   │   ├── style.css
    │   │   └── script.js
    │   ├── convertisseur-devises/
    │   │   ├── style.css
    │   │   └── script.js
    ├── data/
    │   └── features.json
    └── js/
        └── main.js (le moteur qui charge tout)


3. **Mets à jour le fichier JSON** : Ajoute un nouvel objet dans `features.json` avec les informations suivantes :
   ```json
   {
    "id": "ajouter le nombre qui suit le dernier object du fichier",
    "name": "le nom ou titre de ton projet",
    "type": "type de feature (ex: jeux si autre met simplement outils)",
    "action": "si type jeux met ici (jouer) si outil (utiliser),
    "shortDescription": "Une petite description de votre projet",
    "longDescription": "une description long (facultatif)",
    "src": {
      "imageSrc": [une liste de différent Source de miniatures],
      "articleSrc": "source de la page d'accueil de ton fonctionnalités"
    },
    "auteur": "votre Nom"
  }
  