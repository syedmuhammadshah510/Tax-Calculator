#!/usr/bin/env bash
# Deploy Tax Calculator container image to IBM Cloud Code Engine
set -e

PROJECT_NAME="${CE_PROJECT:-tax-calculator-project}"
APP_NAME="${CE_APP_NAME:-tax-calculator}"
REGISTRY_HOST="${REGISTRY_HOST:-us.icr.io}"
NAMESPACE="${NAMESPACE:-tax_calculator_ns}"
IMAGE_TAG="${IMAGE_TAG:-1.0}"
IMAGE_URL="${REGISTRY_HOST}/${NAMESPACE}/tax-calculator:${IMAGE_TAG}"
PORT=8080

echo "=== 1. Selecting or Creating Code Engine Project: ${PROJECT_NAME} ==="
if ibmcloud ce project get -n "${PROJECT_NAME}" >/dev/null 2>&1; then
  echo "Project ${PROJECT_NAME} exists. Selecting it..."
  ibmcloud ce project select -n "${PROJECT_NAME}"
else
  echo "Creating new Code Engine project: ${PROJECT_NAME}..."
  ibmcloud ce project create -n "${PROJECT_NAME}"
  ibmcloud ce project select -n "${PROJECT_NAME}"
fi

echo "=== 2. Deploying Application: ${APP_NAME} ==="
if ibmcloud ce app get -n "${APP_NAME}" >/dev/null 2>&1; then
  echo "Application exists. Updating image to ${IMAGE_URL}..."
  ibmcloud ce app update \
    --name "${APP_NAME}" \
    --image "${IMAGE_URL}" \
    --port ${PORT}
else
  echo "Creating new application from image ${IMAGE_URL} on port ${PORT}..."
  ibmcloud ce app create \
    --name "${APP_NAME}" \
    --image "${IMAGE_URL}" \
    --port ${PORT} \
    --min-scale 1 \
    --max-scale 2
fi

echo "=== 3. Retrieving Public Application Endpoint ==="
APP_URL=$(ibmcloud ce app get -n "${APP_NAME}" -o url)
echo "--------------------------------------------------------"
echo "Application URL: ${APP_URL}"
echo "Health Check:    ${APP_URL}/health"
echo "--------------------------------------------------------"

echo "=== 4. Verifying Health Status ==="
curl -s -i "${APP_URL}/health"
