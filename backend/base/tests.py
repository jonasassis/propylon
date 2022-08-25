from rest_framework import status
from rest_framework.test import APITestCase
from django.urls import reverse
from django.contrib.auth.models import User
from base.models import File
from django.contrib.auth.hashers import make_password
from django.core.files.uploadedfile import SimpleUploadedFile

class LoginTests(APITestCase):

    def setUser(self):

        user = User.objects.create(
            username='admin',
            email='admin@gmail.com',
            password=make_password('admin')
        )

        self.client.user = user

    def setFIle(self):

        file = File.objects.create(
            file = SimpleUploadedFile("review.txt",b"these are the file contents!"),
            filename = "review.txt",
            url='/documents/review',
            revision = 0,
            username = self.client.user
        )

        self.client.file_id = file.pk
        self.client.basename = str(file)


    def auth(self):
        self.setUser()
        response = self.client.post(reverse("token_obtain_pair"), {'username':'admin', 'password':'admin'})
        self.client.credentials(HTTP_AUTHORIZATION = f"Bearer {response.data['token']}")

    
    def test_get_profile_user(self):
        self.auth()
        response = self.client.get(reverse("users-profile"))
        self.assertEqual(response.status_code, status.HTTP_200_OK)


    def test_post_insert_new_user(self):
        response = self.client.post(reverse("register"), {'name':'jonas', 'password':'jonas', 'email':'jonas@gmail.com'})
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)


    def test_post_insert_new_user_already_exists(self):
        self.setUser()
        response = self.client.post(reverse("register"), {'name':'admin', 'password':'admin', 'email':'admin@gmail.com'})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    
    def test_get_all_files_without_auth(self):
        response = self.client.get(reverse("files"))
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


    def test_get_all_files_with_auth(self):
        self.auth()
        self.setFIle()
        response = self.client.get(reverse("files"))
        self.assertEqual(response.status_code, status.HTTP_200_OK)


    def test_post_add_new_files_with_auth(self):
        self.auth()
        fileUpload = SimpleUploadedFile("review.txt",b"these are the file contents!")
        data = {'file':fileUpload, 'url':'documents/review'}
        response = self.client.post(reverse("register-file"), data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(len(response.data), 7)


    def test_get_all_urls_with_auth(self):
        self.auth()
        response = self.client.get(reverse("urls"))
        self.assertEqual(response.status_code, status.HTTP_200_OK)


    def test_get_file_by_id(self):
        self.auth()
        self.setFIle()
        response = self.client.get(reverse("files-by-id", kwargs={'pk': self.client.file_id}))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    