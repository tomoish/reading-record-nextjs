from django.test import TestCase, Client
from account.models import Account
from django.urls import reverse


class RegisterTests(TestCase):
    def setUp(self):
        self.user_data = {
            'first_name': 'test_first_name',
            'last_name': 'test_last_name',
            'email': 'test@test.com',
            'password': '123456',
        }

    def test_register(self):
        response = Client().post(
            '/api/register/',
            data=self.user_data
        )

        self.assertEqual('User registered.', response.json()['message'])
        self.assertEqual(200, response.status_code)

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
                'email': 'test@test.com',
                'password': '12345',
            },
        )

        self.assertEqual(
            'Ensure this field has at least 6 characters.', response.json()['password'][0])
        self.assertEqual(200, response.status_code)
