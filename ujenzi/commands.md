# Build docker individual container

cd into dockerfile directory then `docker build -t [container name] .` then `docker push [container name with google tag]`

# Deploy containers to Artifact Registry

https://cloud.google.com/artifact-registry/docs/docker/pushing-and-pulling

### Container tags

- `us-central1-docker.pkg.dev/ujenzi-django/ujenzi/monolith`
  Then deploy services here: https://console.cloud.google.com/run?project=ujenzi-django
