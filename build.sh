#!/usr/bin/env bash
# exit on error
set -o errexit

# Installation des dépendances Composer
cd src/backend/laravel
composer install --no-dev --optimize-autoloader

# Génération de la clé d'application Laravel
php artisan key:generate --force

# Exécution des migrations
php artisan migrate --force

# Optimisation Laravel
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Créer le lien symbolique pour le storage
php artisan storage:link
