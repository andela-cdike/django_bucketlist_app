[![Build Status](https://travis-ci.org/andela-cdike/django_bucketlist_app.svg?branch=develop)](https://travis-ci.org/andela-cdike/django_bucketlist_app)
[![Coverage Status](https://coveralls.io/repos/github/andela-cdike/django_bucketlist_app/badge.svg?branch=develop)](https://coveralls.io/github/andela-cdike/django_bucketlist_app?branch=develop)
[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/andela-cdike/django_bucketlist_app/badges/quality-score.png?b=develop)](https://scrutinizer-ci.com/g/andela-cdike/django_bucketlist_app/?branch=develop)

# The Bucketlist App

This app allows users to easily manage lists of activities, adventures, experiences e.t.c. they would like to do/have during their lifetime.

## Features
+ GUI
+ RESTful API
+ UI documentation

## API Documentation
See the API documentation [here](http://dothebucket.herokuapp.com/api/v1/docs/).

## Technologies Used
There were a couple of third party libraries used for this project. The major ones are listed:
+ [Django](https://www.djangoproject.com/) - a high-level Python Web framework that encourages rapid development and clean, pragmatic design.
+ [Django REST Framework](http://www.django-rest-framework.org/) - Django REST framework is a powerful and flexible toolkit for building Web APIs.
+ [PostgreSQL](https://www.postgresql.org/) - a powerful, open source object-relational database system.
+ [Bower](https://bower.io/) - package that manages components that contain HTML, CSS, JavaScript, fonts or image files.
+ [Django-bower](https://github.com/nvbn/django-bower) - Easy way to use bower with your Django project.
+ [React](https://facebook.github.io/react/) - a Javascript library for building user interfaces.
+ [React-bootstrap](https://react-bootstrap.github.io/) - CSS framework rebuilt for React.
+ [Webpack](https://webpack.github.io/) - a module bundler.
+ [jQuery](https://jquery.com/) - a fast, small, and feature-rich JavaScript library.
+ [React Packery Component](http://packery.metafizzy.co/) - Javascript library that makes gapless and draggable layouts.
+ [React Router](https://github.com/reactjs/react-router) -  a complete routing library for React.
+ [Redux](https://github.com/reactjs/redux) - a predictable state container for JavaScript apps.
+ [Axios](https://github.com/mzabriskie/axios) - Promise based HTTP client for the browser and node.js.
+ [MomentJS](http://momentjs.com/) - a library that Parses, validates, manipulates, and displays dates in JavaScript.

Others can be viewed in the requirements.txt and package.json files found in project's root fould.

## Installation

#### Pre-requisites
+ Python version >= 2.7. Get it [here](https://www.python.org/downloads/release/python-2711/).
+ [Postgres](https://www.postgresql.org/download/)
+ [NodeJS and NPM](https://docs.npmjs.com/getting-started/installing-node)
+ Have a postgresSQL database called bucketlist_db.

##### optional
+ [virtualenv](https://virtualenv.pypa.io/en/stable/installation/)

#### Follow these steps to Install:
1. Clone this repository to the folder where you would like it installed on your machine.

2. In the project root, add a `.env.yml` file to hold all your environment variables. The variables below must be given a value:
    ```cmd
    SECRET_KEY:
    'very-very-very-secret-key'
    DATABASE_USER:
    'foo_user'
    DATABASE_PASSWORD:
    'youcannotguessme' 
    ```

3. It is recommended that you create a virtual environment here before proceeding with installation: 
    ```cmd
    $ mkvirtualenv name_of_virtual_environment
    ```

4. Install all project's dependencies both backend and frontend by running the following commands in order (from project root):
    ```cmd
    $ pip install -r requirements.txt
    $ npm install
    $ bower install
    ```

5. To setup static files and database migrations, run (also in the project root):
    ```cmd
    $ python bucketlist/manage.py collectstatic
    $ python bucketlist/manage.py makemigrations
    $ python bucketlist/manage.py migrate
    ```

#### Run Project Locally
After successfully installing project on your machine, run server with:
```cmd
$ python bucketlist/manage.py runserver
```

## Tests
To run tests:
```cmd
$ python bucketlist/manage.py test --settings=bucketlist.settings.test
```

For coverage report:
```cmd
$ coverage run --source=api,frontend bucketlist/manage.py test bucketlist --noinput --settings=bucketlist.settings.test
$ coverage report -m
```

## License
GNU GPL

## Example
Visit [Do the bucket](https://dothebucket.herokuapp.com/) to play with the live app on heroku.
