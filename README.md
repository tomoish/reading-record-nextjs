# reading-record-nextjs

![reading-record logo](frontend/public/images/logo.png)

<!-- [![Technologies Used](https://skillicons.dev/icons?i=python,django,html,css,js,postgres,nginx,docker,aws)](https://skillicons.dev) -->

<p align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=python,django,next,ts,tailwind,jest,postgres,nginx,docker,aws,vercel" />
  </a>
</p>

reading-record is a web application for recording your reading contents.

## Web
https://www.django-reading-record.com/

## Technologies Used
- backend
  - Django
  - Nginx
- frontend
  - Next.js
  - TypeScript
  - Tailwind CSS
- database
  - PostgresQL

## Production Environment
- backend
  - AWS EC2
- frontend
  - Vercel

## Get started
### Git clone
```
$ git clone https://github.com/tomoish/reading-record-nextjs.git
```

### Building a development environment for backend
1. Create .env file in ./backend directory and set the environment variables:
    ```
    SECRET_KEY=<secret key>
    DEBUG=True
    ALLOWED_HOSTS=127.0.0.1,localhost
    DATABASE_URL=postgres://<database user>:<database password>@localhost:/<database name>
    DATABASE_DB=<database name>
    DATABASE_USER=<database user>
    DATABASE_PASSWORD=<database password>
    DATABASE_HOST=db
    DATABASE_PORT=5432
    CORS_ALLOWED_ORIGINS=http://localhost:3000
    CSRF_TRUSTED_ORIGINS=http://localhost:1317
    
    POSTGRES_USER=<database user>
    POSTGRES_PASSWORD=<database password>
    POSTGRES_DB=<database name>

    DATABASE=postgres
    ```
2. Build the images and run the containers:
   ```
   docker compose up -d --build
   ```
3. Run the migrations:
   ```
   docker compose exec web python manage.py migrate --noinput
   ```
4. Test it out at http://localhost:1317.

### Building a development environment for frontend
1. Install packages:
   ```
    npm i  axios@1.4.0 @types/cookie@0.5.1  cookie@0.5.0 
   ```
2. Create .env file in ./backend directory and set the environment variables:
   ```
    API_URL=http://127.0.0.1:1317
    guest_email=<geust_email>
    guest_password=<guest_password>
   ```
3. Run the development server:

    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    ```

4. Open http://localhost:3000 with your browser to see the result.
