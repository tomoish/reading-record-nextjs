from django.test import TestCase, Client
from django.contrib.auth.models import User


class RegisterTests(TestCase):
    def setUp(self):
        self.user_data = {
            'first_name': 'test_first_name',
            'last_name': 'test_last_name',
            'email': 'test@example.com',
            'password': '123456',
        }

    def test_register(self):
        response = Client().post(
            '/api/register/',
            data=self.user_data
        )

        self.assertEqual('User registered.', response.json()['message'])
        self.assertEqual(200, response.status_code)
        self.assertTrue(User.objects.filter(
            email='test@example.com'
        ).exists()
        )

    def test_register_error(self):
        response = Client().post(
            '/api/register/',
            data=self.user_data,
        )

        response = Client().post(
            '/api/register/',
            data=self.user_data,
        )

        self.assertEqual('User already exists.', response.json()['error'])
        self.assertEqual(400, response.status_code)

    def test_register_invalid_email(self):
        response = Client().post(
            '/api/register/',
            data={
                'first_name': 'test_first_name',
                'last_name': 'test_last_name',
                'email': 'test_email',
                'password': '123456',
            },
        )

        self.assertEqual('Enter a valid email address.',
                         response.json()['email'][0])
        self.assertEqual(200, response.status_code)

    def test_register_invalid_password(self):
        response = Client().post(
            '/api/register/',
            data={
                'first_name': 'test_first_name',
                'last_name': 'test_last_name',
                'email': 'test@example.com',
                'password': '12345',
            },
        )

        self.assertEqual(
            'Ensure this field has at least 6 characters.', response.json()['password'][0])
        self.assertEqual(200, response.status_code)


class LoginTests(TestCase):

    def setUp(self):
        self.user_data = {
            'first_name': 'test_first_name',
            'last_name': 'test_last_name',
            'email': 'test@example.com',
            'password': '123456',
        }

        self.login_data = {
            'username': 'test@example.com',
            'password': '123456',
        }

    def test_login(self):
        response = Client().post(
            '/api/register/',
            data=self.user_data
        )

        response = Client().post(
            '/api/token/',
            data=self.login_data
        )

        self.assertEqual(200, response.status_code)
        self.assertTrue('refresh' in response.json().keys())
        self.assertTrue('access' in response.json().keys())

    def test_invalid_login(self):
        response = Client().post(
            '/api/register/',
            data=self.user_data
        )

        response = Client().post(
            '/api/token/',
            data={
                'username': 'test@example.com',
                'password': '12345',
            }
        )

        self.assertEqual(401, response.status_code)
        self.assertTrue('error' in response.json().keys())


class GetCurrentUserTests(TestCase):

    def setUp(self):
        self.user_data = {
            'first_name': 'test_first_name',
            'last_name': 'test_last_name',
            'email': 'test@example.com',
            'password': '123456',
        }

        self.login_data = {
            'username': 'test@example.com',
            'password': '123456',
        }

    def test_get_current_user(self):
        response = Client().post(
            '/api/register/',
            data=self.user_data
        )

        response = Client().post(
            '/api/token/',
            data=self.login_data
        )

        access_token = response.json()['access']
        # print(response.json())
        # print(access_token)
        # print('Bearer ' + access_token)

        response = Client().get(
            '/api/me/',
            headers={
                'authorization': 'Bearer ' + access_token
            }
        )

        # print(response)
        # print(response.json())

        self.assertEqual(200, response.status_code)
        self.assertEqual('test_first_name', response.json()['first_name'])
        self.assertEqual('test_last_name', response.json()['last_name'])
        self.assertEqual('test@example.com', response.json()['email'])
        self.assertEqual('test@example.com', response.json()['username'])

    def test_invalid_token(self):
        response = Client().get(
            '/api/me/',
            headers={
                'authorization': ''
            }
        )
        # print(response)
        # print(response.json())

        self.assertEqual(401, response.status_code)
        self.assertEqual('Login first to access this resource.',
                         response.json()['error'])
