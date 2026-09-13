#!/usr/bin/env bash
# Script to tag and push Tax Calculator image to IBM Cloud Container Registry (ICR)
set -e

# Replace with your actual ICR namespace and region domain (e.g., us.icr.io, de.icr.io, uk.icr.io, etc.)
REGISTRY_HOST="${REGISTRY_HOST:-us.icr.io}"
NAMESPACE="${NAMESPACE:-tax_calculator_ns}"
IMAGE_NAME="tax-calculator"
IMAGE_TAG="1.0"

TARGET_IMAGE="${REGISTRY_HOST}/${NAMESPACE}/${IMAGE_NAME}:${IMAGE_TAG}"

echo "=== 1. Logging into IBM Cloud Container Registry ==="
ibmcloud cr region-set "${REGISTRY_HOST%%.*}"
ibmcloud cr login

echo "=== 2. Tagging local image ==="
docker tag ${IMAGE_NAME}:${IMAGE_TAG} ${TARGET_IMAGE}
echo "Tagged local image as ${TARGET_IMAGE}"

echo "=== 3. Pushing image to ICR ==="
docker push ${TARGET_IMAGE}

echo "=== 4. Verifying image in registry ==="
ibmcloud cr images --restrict "${NAMESPACE}"
echo "Image successfully published to IBM Cloud Container Registry!"
