from selenium import webdriver

from django.contrib.auth.models import User
from django.core.urlresolvers import reverse, resolve
from django.test import TestCase, Client, LiveServerTestCase


xpath_login_btn = "//button[.='Sign in!']"
xpath_register_btn = "//button[.='Sign me up!']"


class UserLoginViewTestSuite(LiveServerTestCase):
    """
    Test that post and get requests to the login view works
    """

    @classmethod
    def setUpClass(cls):
        """
        Setup the test driver
        """
        cls.driver = webdriver.PhantomJS()
        super(UserLoginViewTestSuite, cls).setUpClass()

    def setUp(self):
        self.client = Client()
        self.user = User.objects.create_user(
            'rikD', 'rikd@self.com', 'sark1n'
        )
        User.objects.create_superuser(
            'admin', 'admin@example.com', 'admin'
        )
        self.driver = UserLoginViewTestSuite.driver
        super(UserLoginViewTestSuite, self).setUp()

    def test_view_get_auth_login(self):
        """
        Test that user request for login page binds to a view called
        `UserLoginView`.
        """
        response = resolve('/login/')
        self.assertEquals(response.func.__name__, 'UserLoginView')

    def test_view_post_auth_login_success(self):
        """
        Test that user post to login view has a session
        """
        data = {'username': 'rikD', 'password': 'sark1n'}
        response = self.client.post(reverse('login'), data)
        self.assertEquals(response.status_code, 302)
        self.assertEqual(response.cookies['user_id'].value, str(self.user.id))

    def test_view_post_auth_invalid_credentials(self):
        """
        Test that user posting invalid username and password
        is prompted to sign in again
        """
        data = {'username': 'rikky', 'password': 'sarkin'}
        response = self.client.post(reverse('login'), data)
        self.assertEquals(response.status_code, 200)
        self.assertEqual(response.cookies.get('user_id'), None)

    def test_view_post_auth_invalid_username(self):
        """
        Test that user posting invalid username is prompted to
        sign in again
        """
        data = {'username': 'rikd', 'password': 'sark1n'}
        response = self.client.post(reverse('login'), data)
        self.assertEquals(response.status_code, 200)
        self.assertEqual(response.cookies.get('user_id'), None)

    def test_view_post_auth_invalid_password(self):
        """
        Test that user posting invalid password is prompted to
        sign in again
        """
        data = {'username': 'rikD', 'password': 'sarkin'}
        response = self.client.post(reverse('login'), data)
        self.assertEquals(response.status_code, 200)
        self.assertEqual(response.cookies.get('user_id'), None)

    def test_login_user(self):
        """
        E2E tests that checks if a user can sign in
        """
        url = "%s%s" % (self.live_server_url, reverse('login'))
        self.driver.get(url)
        # wait
        self.driver.implicitly_wait(20)

        # input login details and submit
        self.driver.find_element_by_id("l-form-username").send_keys('admin')
        self.driver.find_element_by_id("l-form-password").send_keys('admin')
        self.driver.find_element_by_xpath(xpath_login_btn).click()

        # assert user is signed in
        self.driver.implicitly_wait(20)
        self.assertIn('<div id="App1">', self.driver.page_source)

    def tearDown(self):
        """
        Close the browser window
        """
        super(UserLoginViewTestSuite, self).tearDown()

    @classmethod
    def tearDownClass(cls):
        cls.driver.quit()
        super(UserLoginViewTestSuite, cls).tearDownClass()


class UserLogoutViewTestSuite(TestCase):
    """
    Test that user can logout of session.
    """
    def setUp(self):
        self.client = Client()
        self.user = User.objects.create_user('johndoe',
                                             'johndoe@gmail.com',
                                             '12345')

    def test_route_get_auth_logout(self):
        self.client.post(reverse('login'),
                         dict(username='johndoe@gmail.com',
                              password='12345'))
        response = self.client.get(reverse('logout'))
        self.assertIsNone(response.context)
        self.assertEquals(response.status_code, 302)


class UserRegisterViewTestSuite(LiveServerTestCase):
    """
    End to End testing of user registration and login pages
    """
    @classmethod
    def setUpClass(cls):
        """
        Setup the test driver
        """
        cls.driver = webdriver.PhantomJS()
        super(UserRegisterViewTestSuite, cls).setUpClass()

    def setUp(self,):
        """
        Setup the test driver
        """
        User.objects.create_superuser(
            'admin', 'admin@example.com', 'admin'
        )
        self.driver = UserRegisterViewTestSuite.driver
        super(UserRegisterViewTestSuite, self).setUp()

    def test_user_can_register(self,):
        """
        Checks if user can register
        """
        url = "%s%s" % (self.live_server_url, reverse('register'))
        self.driver.get(url)
        self.driver.implicitly_wait(20)
        self.driver.find_element_by_id("r-form-username").send_keys('rikky')
        self.driver.find_element_by_id(
            "r-form-email").send_keys('rikky@gmail.com')
        self.driver.find_element_by_id(
            "r-form-password").send_keys('masterofdsims')
        self.driver.find_element_by_id(
            "r-form-repassword").send_keys('masterofdsims')
        self.driver.find_element_by_xpath(xpath_register_btn).click()

        # assert redirected to login page
        self.driver.implicitly_wait(20)
        self.assertIn(
            ("User was successfully created. "
             "Please login to start using the app"),
            self.driver.page_source
        )

    def test_user_cannot_register_same_username(self,):
        """
        Checks that user cannot register same username
        """
        data = {
            'username': 'admin',
            'email': 'rikky@gmail.com',
            'password1': 'masterofdsims',
            'password2': 'masterofdsims'
        }
        response = self.client.post(reverse('register'), data)
        self.assertEquals(response.status_code, 200)
        self.assertIn(
            "Username is already taken. Please signup with another username.",
            response.content
        )

    def tearDown(self,):
        """
        Close the browser window
        """
        super(UserRegisterViewTestSuite, self).tearDown()

    @classmethod
    def tearDownClass(cls):
        cls.driver.quit()
        super(UserRegisterViewTestSuite, cls).tearDownClass()
