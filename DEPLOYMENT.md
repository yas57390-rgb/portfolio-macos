# 🚀 Guide de Déploiement - Pipeline CI/CD

## Aperçu de la Pipeline

```
┌─────────────┐      ┌─────────────┐      ┌─────────────┐
│   VS Code   │──▶│   GitHub    │──▶│   Netlify   │
│  (Push Git)  │      │ (Repository) │      │  (Hébergement)│
└─────────────┘      └─────────────┘      └─────────────┘
     Local              Cloud              Production
```

**Fonctionnement :**
1. Tu modifies le code localement
2. Tu fais `git push` vers GitHub
3. Netlify détecte automatiquement le push
4. Netlify build et déploie automatiquement
5. Le site est en ligne en ~1 minute !

---

## 📋 Configuration Initiale (1 seule fois)

### Étape 1 : Initialiser Git

```bash
cd /Users/yassine/Documents/portfolio-macos
git init
git add .
git commit -m "Initial commit - Portfolio macOS"
```

### Étape 2 : Créer le repo GitHub

1. Va sur [github.com/new](https://github.com/new)
2. Nom du repo : `portfolio-macos`
3. Laisse en **Public** ou **Private**
4. **NE COCHE RIEN** (pas de README, pas de .gitignore)
5. Clique "Create repository"

### Étape 3 : Lier le repo local à GitHub

```bash
git remote add origin https://github.com/Yassinedinar/portfolio-macos.git
git branch -M main
git push -u origin main
```

### Étape 4 : Connecter Netlify à GitHub

1. Va sur [app.netlify.com](https://app.netlify.com)
2. Clique **"Add new site"** → **"Import an existing project"**
3. Choisis **GitHub**
4. Autorise Netlify à accéder à tes repos
5. Sélectionne **portfolio-macos**
6. Configuration (déjà dans `netlify.toml`) :
   - Build command : `npm run build`
   - Publish directory : `dist`
7. Clique **"Deploy site"**

---

## 🔄 Workflow Quotidien

### Modifier et déployer

```bash
# 1. Fais tes modifications dans VS Code

# 2. Vérifie ce qui a changé
git status

# 3. Ajoute les fichiers modifiés
git add .

# 4. Crée un commit avec un message descriptif
git commit -m "Ajout du jeu Doodle Jump"

# 5. Envoie vers GitHub (déclenche le déploiement automatique)
git push
```

### Voir le statut du déploiement

1. Va sur [app.netlify.com](https://app.netlify.com)
2. Clique sur ton site
3. Tu verras le statut : "Building" → "Published"

---

## 📁 Structure des fichiers importants

```
portfolio-macos/
├── netlify.toml       ← Configuration Netlify
├── package.json       ← Dépendances npm
├── src/               ← Code source
├── dist/              ← Build (généré, ne pas modifier)
└── .gitignore         ← Fichiers ignorés par Git
```

---

## ⚡ Commandes Git Utiles

| Commande | Description |
|----------|-------------|
| `git status` | Voir les fichiers modifiés |
| `git add .` | Ajouter tous les fichiers |
| `git commit -m "message"` | Créer un commit |
| `git push` | Envoyer vers GitHub |
| `git pull` | Récupérer les dernières modifs |
| `git log --oneline -5` | Voir les 5 derniers commits |

---

## 🔍 Dépannage

### Le build échoue sur Netlify

1. Va dans **Deploys** → Clique sur le deploy en erreur
2. Lis les logs pour trouver l'erreur
3. Corrige localement et refais un `git push`

### J'ai oublié d'ajouter un fichier

```bash
git add fichier_oublie.js
git commit --amend --no-edit
git push --force
```

### Annuler le dernier commit (pas encore pushé)

```bash
git reset --soft HEAD~1
```

---

## 🌐 URLs

- **GitHub** : https://github.com/Yassinedinar/portfolio-macos
- **Netlify Dashboard** : https://app.netlify.com
- **Site Live** : (sera affiché après le premier déploiement)

---

## 📝 Résumé

1. **Modifier** → `git add .` → `git commit -m "..."` → `git push`
2. **Netlify détecte** → Build automatique → Déploiement
3. **En ligne** en ~1 minute !

C'est tout ! 🎉
