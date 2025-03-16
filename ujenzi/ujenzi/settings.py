"""
Django settings for ujenzi project.
"""

from pathlib import Path
import os
from urllib.parse import urlparse
import environ

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# Environment variables
env = environ.Env(
    DEBUG=(bool, False),
    SECRET_KEY=(str, "default-key-for-dev-only"),
    DATABASE_URL=(str, f"sqlite:///{os.path.join(BASE_DIR, 'db.sqlite3')}"),
    ALLOWED_HOSTS=(list, ["*"]),
    CSRF_TRUSTED_ORIGINS=(list, []),
    CLOUD_RUN_SERVICE_URL=(str, ""),
)

# Read environment from .env file if it exists
env_file = os.path.join(BASE_DIR, ".env")
if os.path.isfile(env_file):
    env.read_env(env_file)

# Core settings
SECRET_KEY = env("SECRET_KEY")
DEBUG = env("DEBUG")

# Security settings
CLOUD_RUN_SERVICE_URL = env("CLOUD_RUN_SERVICE_URL")
if CLOUD_RUN_SERVICE_URL:
    # Ensure a scheme is present in the URL
    if not urlparse(CLOUD_RUN_SERVICE_URL).scheme:
        CLOUD_RUN_SERVICE_URL = f"https://{CLOUD_RUN_SERVICE_URL}"

    ALLOWED_HOSTS = env("ALLOWED_HOSTS") + [urlparse(CLOUD_RUN_SERVICE_URL).netloc]
    CSRF_TRUSTED_ORIGINS = env("CSRF_TRUSTED_ORIGINS") + [CLOUD_RUN_SERVICE_URL]
    SECURE_SSL_REDIRECT = True
    SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")
else:
    ALLOWED_HOSTS = env("ALLOWED_HOSTS")
    CSRF_TRUSTED_ORIGINS = env("CSRF_TRUSTED_ORIGINS")
    SECURE_SSL_REDIRECT = False

# Application definition
INSTALLED_APPS = [
    "concrete",
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]


ROOT_URLCONF = "ujenzi.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "ujenzi.wsgi.application"

# Database
DATABASES = {
    "default": env.db(),
}

# Custom user model
AUTH_USER_MODEL = "concrete.User"

# Password validation
AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]

# Internationalization
LANGUAGE_CODE = "en-us"
TIME_ZONE = "Africa/Nairobi"
USE_I18N = True
USE_TZ = True

# Static files (CSS, JavaScript, Images)
STATIC_ROOT = BASE_DIR / "static"
STATIC_URL = "static/"

# Add whitenoise storage configuration for static files
STATICFILES_STORAGE = "whitenoise.storage.CompressedStaticFilesStorage"

# Default primary key field type
DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"
