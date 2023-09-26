from django.test import TestCase, Client


class NewRecordTests(TestCase):

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

        self.record_data = {
            'book_title': 'Sample book',
            'isbn': '9784098507177',
            'date': '2023-08-01',
            'first_page': '2',
            'final_page': '100',
            'impression': 'This book was amazing!'
        }

        self.urlPrefix = 'https://iss.ndl.go.jp/thumbnail/'

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
        self.assertEqual(self.urlPrefix + '9784098507177',
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
            'email': 'test@example.com',
            'password': '123456',
        }

        self.login_data = {
            'username': 'test@example.com',
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

        self.urlPrefix = 'https://iss.ndl.go.jp/thumbnail/'

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

    def test_update_record(self):
        access_token = self.get_access_token()

        response = Client().post(
            '/api/records/new/',
            data=self.record_data,
            headers={
                'authorization': 'Bearer ' + access_token
            },
            content_type='application/json'
        )

        id = response.json()['id']

        response = Client().put(
            '/api/records/' + str(id) + '/update/',
            data=self.update_record_data,
            headers={
                'authorization': 'Bearer ' + access_token
            },
            content_type='application/json'
        )

        self.assertEqual(200, response.status_code)
        self.assertEqual('Update book', response.json()['book_title'])
        self.assertEqual('9784098510542', response.json()['isbn'])
        self.assertEqual(self.urlPrefix + '9784098510542',
                         response.json()['thumbnail_url'])
        self.assertEqual('2023-08-03', response.json()['date'])
        self.assertEqual(4, response.json()['first_page'])
        self.assertEqual(200, response.json()['final_page'])
        self.assertEqual('Update',
                         response.json()['impression'])


class GetRecordTests(TestCase):

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

        self.record_data = {
            'book_title': 'GetRecordTests',
            'isbn': '9784098507177',
            'date': '2023-08-01',
            'first_page': '2',
            'final_page': '100',
            'impression': 'GetRecordTests'
        }

        self.urlPrefix = 'https://iss.ndl.go.jp/thumbnail/'

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

    def test_get_record(self):
        access_token = self.get_access_token()

        response = Client().post(
            '/api/records/new/',
            data=self.record_data,
            headers={
                'authorization': 'Bearer ' + access_token
            },
            content_type='application/json'
        )

        id = response.json()['id']

        response = Client().get(
            '/api/records/' + str(id) + '/',
            data=self.record_data,
            headers={
                'authorization': 'Bearer ' + access_token
            },
        )

        self.assertEqual(200, response.status_code)
        self.assertEqual('GetRecordTests', response.json()['book_title'])
        self.assertEqual('9784098507177', response.json()['isbn'])
        self.assertEqual(self.urlPrefix + '9784098507177',
                         response.json()['thumbnail_url'])
        self.assertEqual('2023-08-01', response.json()['date'])
        self.assertEqual(2, response.json()['first_page'])
        self.assertEqual(100, response.json()['final_page'])
        self.assertEqual('GetRecordTests',
                         response.json()['impression'])


class DeleteRecordTests(TestCase):

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

        self.record_data = {
            'book_title': 'DeleteRecordTests',
            'isbn': '9784098507177',
            'date': '2023-08-01',
            'first_page': '2',
            'final_page': '100',
            'impression': 'DeleteRecordTests'
        }

        self.urlPrefix = 'https://iss.ndl.go.jp/thumbnail/'

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

    def test_delete_record(self):
        access_token = self.get_access_token()

        response = Client().post(
            '/api/records/new/',
            data=self.record_data,
            headers={
                'authorization': 'Bearer ' + access_token
            },
            content_type='application/json'
        )

        id = response.json()['id']

        response = Client().delete(
            '/api/records/' + str(id) + '/delete/',
            data=self.record_data,
            headers={
                'authorization': 'Bearer ' + access_token
            },
        )

        self.assertEqual(200, response.status_code)
        self.assertEqual('Record is Deleted.', response.json()['message'])


class GetCurrentUserRecordsTests(TestCase):

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

        self.record_data = {
            'book_title': 'record 1',
            'isbn': '9784098507177',
            'date': '2023-08-01',
            'first_page': '2',
            'final_page': '100',
            'impression': 'record 1'
        }

        self.record_data2 = {
            'book_title': 'record 2',
            'isbn': '9784098510542',
            'date': '2023-08-05',
            'first_page': '3',
            'final_page': '200',
            'impression': 'record 2'
        }

        self.urlPrefix = 'https://iss.ndl.go.jp/thumbnail/'

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

    def test_get_current_user_record(self):
        access_token = self.get_access_token()

        response = Client().post(
            '/api/records/new/',
            data=self.record_data,
            headers={
                'authorization': 'Bearer ' + access_token
            },
            content_type='application/json'
        )

        response = Client().post(
            '/api/records/new/',
            data=self.record_data2,
            headers={
                'authorization': 'Bearer ' + access_token
            },
            content_type='application/json'
        )

        response = Client().get(
            '/api/me/records/',
            headers={
                'authorization': 'Bearer ' + access_token
            },
        )

        self.assertEqual(200, response.status_code)

        self.assertEqual('record 2', response.json()[0]['book_title'])
        self.assertEqual('9784098510542', response.json()[0]['isbn'])
        self.assertEqual(self.urlPrefix + '9784098510542',
                         response.json()[0]['thumbnail_url'])
        self.assertEqual('2023-08-05', response.json()[0]['date'])
        self.assertEqual(3, response.json()[0]['first_page'])
        self.assertEqual(200, response.json()[0]['final_page'])
        self.assertEqual('record 2',
                         response.json()[0]['impression'])

        self.assertEqual('record 1', response.json()[1]['book_title'])
        self.assertEqual('9784098507177', response.json()[1]['isbn'])
        self.assertEqual(self.urlPrefix + '9784098507177',
                         response.json()[1]['thumbnail_url'])
        self.assertEqual('2023-08-01', response.json()[1]['date'])
        self.assertEqual(2, response.json()[1]['first_page'])
        self.assertEqual(100, response.json()[1]['final_page'])
        self.assertEqual('record 1',
                         response.json()[1]['impression'])
