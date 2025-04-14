# 🧩 Wordle Game - Angular Project

Ce projet est une implémentation du jeu **Wordle** développée avec **Angular 19**. Il met l'accent sur la qualité des tests unitaires.

## 📦 Stack technique

- **Framework :** Angular 19
- **Langage :** TypeScript
- **Tests :** Jasmine, Karma, ng-mocks
- **Style :** Tailwind CSS

---

## 🚀 Installation & Démarrage

### 1. Installation des dépendances

```bash
npm install
```

### 2. Lancement de l'application

```bash
npm start
```

L'application est disponible à l'adresse : [http://localhost:4200](http://localhost:4200)

---

## 🧪 Exécuter les tests

```bash
npm test
```

ou pour exécuter les tests avec ChromeHeadless :

```bash
npm run test-angular
```

Un rapport de couverture sera généré dans le dossier `coverage/`.

---

## ✅ Fonctionnalités principales

### Requises
- ✅ Validation de mots (5 lettres, uniquement alphabétiques)
- ✅ Vérification des lettres (vert, jaune, gris)
- ✅ Gestion du nombre d’essais et des conditions de fin de partie

### Intermédiaires
- ✅ Dictionnaire de mots valides
- ✅ Prise en compte correcte des lettres en double
- ✅ Statistiques du joueur (victoires, séries, moyenne d’essais)

### Avancées
- ✅ Plusieurs modes de jeu (mode minuteur, mode entraînement)
- ✅ Longueurs de mots dynamiques
- ✅ Système de score
