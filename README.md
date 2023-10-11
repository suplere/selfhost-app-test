NOT FOR PRODUCTION, ONLY FOR STUDY PURPOSES

# Install and run local nhost

# In folder packages/nhost-backend

Correct ENV values for your selfhosted Kubernetes instance.

# Helm install chart

From package folder run this command:

helm install nhost-test charts/nhost --namespace nhost-test --create-namespace

Remark: This chart is configured for release name = namespace

Remove chart:

helm uninstall nhost-test --namespace nhost-test

# Configure github action
Migration and metadata - is configured via github action - update-nhost.yaml

And configure action secrets:
HASURA_ENDPOINT - your selfhosted GRAPHQL endpoint for example: https://XXXXXX.hasura.ZZZZZZZ.eu
HASURA_ADMIN_SECRET - your admin secret

and correct bboth working-directory:  in this repo value is packages/nhost-backend/nhost

# Configure NEXT js enviromental variables

Dont use SUBDOMAIN and REGION, configuration must be via :
Nhost client must be set via custom URLs for each services:
NEXT_PUBLIC_AUTH_URL
NEXT_PUBLIC_GRAPHQL_URL
NEXT_PUBLIC_STORAGE_URL
NEXT_PUBLIC_FUNCTION_URL


TODO: 

- remove secrets from teplate files
