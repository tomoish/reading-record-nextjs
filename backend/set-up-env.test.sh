#!/bin/bash

# DB
echo "DATABASE_URL=$DATABASE_URL" >> backend/.env
echo "DATABASE_DB=$DATABASE_DB" >> backend/.env
echo "DATABASE_USER=$DATABASE_USER" >> backend/.env
echo "DATABASE_PASSWORD=$DATABASE_PASSWORD" >> backend/.env
echo "DATABASE_HOST=$DATABASE_HOST" >> backend/.env
echo "DATABASE_PORT=$DATABASE_PORT" >> backend/.env

echo "POSTGRES_USER=$POSTGRES_USER" >> backend/.env
echo "POSTGRES_PASSWORD=$POSTGRES_PASSWORD" >> backend/.env
echo "POSTGRES_DB=$POSTGRES_DB" >> backend/.env

# Django
echo "SECRET_KEY=$SECRET_KEY" >> backend/.env
echo "ALLOWED_HOSTS=$DJANGO_ALLOWED_HOSTS" >> backend/.env
echo "DEBUG=$DEBUG" >> backend/.env
echo "CSRF_TRUSTED_ORIGINS=$CSRF_TRUSTED_ORIGINS" >> backend/.env
echo "CORS_ALLOWED_ORIGINS=$CORS_ALLOWED_ORIGINS" >> backend/.env