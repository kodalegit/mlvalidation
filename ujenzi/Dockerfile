# STAGE 1: Frontend build
FROM node:18-slim AS frontend-builder
WORKDIR /app
COPY concrete/package*.json ./concrete/
WORKDIR /app/concrete
RUN npm install --include=dev
COPY concrete/webpack.config.js ./
COPY concrete/src ./src
# Disable watch mode for the build
RUN sed -i 's/watch: true/watch: false/' webpack.config.js
# Run webpack to bundle files to static folder
RUN npm run build

# STAGE 2: Python application
FROM python:3.11-slim
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV PORT=8080
ENV DEBUG=False
ENV SECRET_KEY=build-time-key-will-be-replaced-at-runtime
ENV ALLOWED_HOSTS=*

# Set work directory
WORKDIR /app

# Install only the required system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    libpq-dev \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt gunicorn whitenoise

# Copy project files
COPY . /app/
# Copy the built static files from the frontend build stage
COPY --from=frontend-builder /app/concrete/static /app/concrete/static

# Collect static files
RUN python manage.py collectstatic --noinput

# Run the application
CMD exec gunicorn --bind :$PORT --workers 2 --threads 8 --timeout 0 ujenzi.wsgi:application