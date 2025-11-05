FROM php:8.2-apache

# Installer l’extension PDO MySQL
RUN docker-php-ext-install pdo pdo_mysql

# Activer mod_rewrite (nécessaire pour Laravel)
RUN a2enmod rewrite

# Définir le dossier public comme racine Apache
ENV APACHE_DOCUMENT_ROOT=/var/www/html/public

# Modifier la config Apache pour pointer vers /public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

# Donner les droits à Apache sur le dossier
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html