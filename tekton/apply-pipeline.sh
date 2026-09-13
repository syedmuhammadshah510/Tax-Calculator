#!/usr/bin/env bash
# Script to apply Tekton resources to the Kubernetes cluster
set -e

echo "=== 1. Applying PersistentVolumeClaim ==="
kubectl apply -f tekton/workspace-pvc.yaml

echo "=== 2. Applying Tekton Tasks ==="
kubectl apply -f tekton/tasks/task-npm-test.yaml
kubectl apply -f tekton/tasks/task-build-push.yaml
kubectl apply -f tekton/tasks/task-deploy-ce.yaml

echo "=== 3. Applying Pipeline ==="
kubectl apply -f tekton/pipeline.yaml

echo "=== 4. Tekton Resources Created Successfully! ==="
tkn task list
tkn pipeline list
