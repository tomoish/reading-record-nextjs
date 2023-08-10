from django.test import TestCase, Client
from django.contrib.auth.models import User


class NewRecordTests(TestCase):

    def setUp(self):
        self.user_data = {
            'first_name': 'test_first_name',
            'last_name': 'test_last_name',
            'email': 'test@test.com',
            'password': '123456',
        }

        self.login_data = {
            'username': 'test@test.com',
            'password': '123456',
        }

        self.record_data = {
            'book_title': 'Sample book',
            'isbn': '9784098507177',
            'date': '2023-08-01',
            'first_page': '2',
            'final_page': '100',
            'impression': 'This book was amazing!'
        }

    def get_access_token(self):
        response = Client().post(
            '/api/register/',
            data=self.user_data
        )

        response = Client().post(
            '/api/token/',
            data=self.login_data
        )

        return response.json()['access']

    def test_post_record(self):
        access_token = self.get_access_token()

        response = Client().post(
            '/api/records/new/',
            data=self.record_data,
            headers={
                'authorization': 'Bearer ' + access_token
            },
            content_type='application/json'
        )

        # print(response)
        # print(response.json())

        self.assertEqual(200, response.status_code)
        self.assertEqual('Sample book', response.json()['book_title'])
        self.assertEqual('9784098507177', response.json()['isbn'])
        self.assertEqual('https://cover.openbd.jp/9784098507177.jpg',
                         response.json()['thumbnail_url'])
        self.assertEqual('2023-08-01', response.json()['date'])
        self.assertEqual(2, response.json()['first_page'])
        self.assertEqual(100, response.json()['final_page'])
        self.assertEqual('This book was amazing!',
                         response.json()['impression'])

    def test_invalid_token(self):
        response = Client().post(
            '/api/records/new/',
            data=self.record_data,
            headers={
                'authorization': ''
            },
            content_type='application/json'
        )

        self.assertEqual(401, response.status_code)
        self.assertEqual('Login first to access this resource.',
                         response.json()['error'])


class UpdateRecordTests(TestCase):

    def setUp(self):
        self.user_data = {
            'first_name': 'test_first_name',
            'last_name': 'test_last_name',
            'email': 'test@test.com',
            'password': '123456',
        }

        self.login_data = {
            'username': 'test@test.com',
            'password': '123456',
        }

        self.record_data = {
            'book_title': 'Sample book',
            'isbn': '9784098507177',
            'date': '2023-08-01',
            'first_page': '2',
            'final_page': '100',
            'impression': 'This book was amazing!'
        }

        self.update_record_data = {
            'book_title': 'Update book',
            'isbn': '9784098510542',
            'date': '2023-08-03',
            'first_page': '4',
            'final_page': '200',
            'impression': 'Update'
        }

    def get_access_token(self):
        response = Client().post(
            '/api/register/',
            data=self.user_data
        )

        response = Client().post(
            '/api/token/',
            data=self.login_data
        )

        return response.json()['access']

    def test_update_record_test(self):
        access_token = self.get_access_token()

        response = Client().post(
            '/api/records/new/',
            data=self.record_data,
            headers={
                'authorization': 'Bearer ' + access_token
            },
            content_type='application/json'
        )

        response = Client().put(
            '/api/records/2/update/',
            data=self.update_record_data,
            headers={
                'authorization': 'Bearer ' + access_token
            },
            content_type='application/json'
        )

        self.assertEqual(200, response.status_code)
        self.assertEqual('Update book', response.json()['book_title'])
        self.assertEqual('9784098510542', response.json()['isbn'])
        self.assertEqual('https://cover.openbd.jp/9784098510542.jpg',
                         response.json()['thumbnail_url'])
        self.assertEqual('2023-08-03', response.json()['date'])
        self.assertEqual(4, response.json()['first_page'])
        self.assertEqual(200, response.json()['final_page'])
        self.assertEqual('Update',
                         response.json()['impression'])
