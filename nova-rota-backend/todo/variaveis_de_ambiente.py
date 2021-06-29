from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = 'e))v!$wcdzw6eh5k9!x^(0aot2zbug@ien@4^j91ulhwja4g5e'

DEBUG = True

ALLOWED_HOSTS = ['localhost', '127.0.0.1', '127.0.0.1:4200']

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}