# Déploiement sur Render.com

## Étapes de déploiement

### 1. Créer un compte Render
- Aller sur https://render.com
- S'inscrire avec votre compte GitHub

### 2. Connecter votre dépôt GitHub
- Dans Render Dashboard, cliquer sur "New +"
- Sélectionner "Blueprint"
- Connecter votre repository GitHub `odybieneugene/echo-migrant`
- Render détectera automatiquement le fichier `render.yaml`

### 3. Configuration automatique
Render créera automatiquement :
- ✅ Service Backend (Laravel API)
- ✅ Service Frontend (React)
- ✅ Base de données MySQL

### 4. Variables d'environnement
Les variables sont déjà configurées dans `render.yaml`, mais vous pouvez les modifier :

**Backend (echo-migrant-api):**
- `APP_ENV=production`
- `APP_DEBUG=false`
- `APP_KEY` (généré automatiquement)
- `DB_*` (connecté automatiquement à la base de données)

**Frontend (echo-migrant-frontend):**
- `VITE_API_URL=https://echo-migrant-api.onrender.com/api`

### 5. Après le déploiement

1. **Exécuter les seeders** (optionnel):
   - Aller dans le dashboard Render
   - Sélectionner le service "echo-migrant-api"
   - Cliquer sur "Shell"
   - Exécuter: `cd src/backend/laravel && php artisan db:seed`

2. **Créer un utilisateur admin**:
   ```bash
   cd src/backend/laravel
   php artisan tinker
   ```
   Puis dans tinker:
   ```php
   $user = new App\Models\Utilisateur();
   $user->nom = 'BIEN-EUGENE';
   $user->prenom = 'Ody';
   $user->email = 'admin@echo-migrant.com';
   $user->password = bcrypt('votre-mot-de-passe');
   $user->role = 'admin';
   $user->save();
   ```

### 6. URLs de votre application

- **Frontend**: https://echo-migrant-frontend.onrender.com
- **API**: https://echo-migrant-api.onrender.com/api
- **Dashboard**: https://echo-migrant-frontend.onrender.com/dashboard

### 7. Limitations du plan gratuit

- ⏰ Le service se met en veille après 15 min d'inactivité
- 🐌 Premier chargement peut prendre 30-60 secondes (démarrage du service)
- 💾 Base de données: 1 GB de stockage
- 🌐 750 heures/mois d'utilisation

### 8. Notes importantes

- Les images uploadées seront stockées temporairement (plan gratuit)
- Pour un stockage permanent des images, utiliser AWS S3 ou Cloudinary
- Le déploiement prend environ 5-10 minutes

## Debugging

Si le déploiement échoue:
1. Vérifier les logs dans Render Dashboard
2. S'assurer que toutes les migrations sont valides
3. Vérifier que le fichier `.env` n'est pas commité (déjà dans .gitignore)
