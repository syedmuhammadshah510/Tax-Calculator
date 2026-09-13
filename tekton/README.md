# Tekton CI/CD Pipeline Execution & Debugging Guide

This guide provides the exact CLI commands to apply, execute, and monitor the automated Tekton CI/CD pipeline for the Tax Calculator application in your Kubernetes / IBM Skills Network Lab environment.

---

## 1. Apply Tekton Resources to the Cluster

Run the provided setup script or apply the manifests individually:

```bash
# Option A: Run the all-in-one apply script
chmod +x tekton/apply-pipeline.sh
./tekton/apply-pipeline.sh

# Option B: Apply manifests individually
kubectl apply -f tekton/workspace-pvc.yaml
kubectl apply -f tekton/tasks/task-npm-test.yaml
kubectl apply -f tekton/tasks/task-build-push.yaml
kubectl apply -f tekton/tasks/task-deploy-ce.yaml
kubectl apply -f tekton/pipeline.yaml
```

**Verify resources are loaded:**
```bash
tkn task list
tkn pipeline list
```

---

## 2. Start the PipelineRun

Before running, make sure you have edited `tekton/pipelinerun.yaml` with your actual `<YOUR_ICR_NAMESPACE>` and `<YOUR_CODE_ENGINE_PROJECT>`.

### Method A: Using the PipelineRun Manifest (Recommended)
```bash
kubectl create -f tekton/pipelinerun.yaml
```

### Method B: Interactive CLI Start via `tkn`
```bash
tkn pipeline start tax-calculator-pipeline \
  --workspace name=pipeline-workspace,claimName=pipeline-workspace-pvc \
  --param git-url="https://github.com/syedmuhammadshah510/Tax-Calculator.git" \
  --param git-revision="main" \
  --param image-reference="us.icr.io/<YOUR_ICR_NAMESPACE>/tax-calculator:latest" \
  --param ce-project="<YOUR_CODE_ENGINE_PROJECT>" \
  --param ce-app-name="tax-calculator" \
  --showlog
```

---

## 3. Monitor and Stream Live Logs

Follow the live logs of the most recent pipeline run:
```bash
tkn pipelinerun logs -f -L
```
*(Or specify the exact run name: `tkn pipelinerun logs <pipelinerun-name> -f`)*

---

## 4. Troubleshooting & Debugging

### Step A: Check PipelineRun Status
```bash
tkn pipelinerun list
tkn pipelinerun describe -L
```

### Step B: Identify Failing TaskRun
```bash
tkn taskrun list
tkn taskrun describe <taskrun-name>
```

### Step C: Fetch Specific Step Logs
```bash
tkn taskrun logs <taskrun-name>
```

### Step D: Low-Level Pod Inspection (Kubectl)
If a step crashes or pod doesn't schedule:
```bash
# List all pods in the namespace
kubectl get pods

# Describe the failing pod
kubectl describe pod <pod-name>

# View container logs of a specific step (e.g., step-run-jasmine-tests, step-build-and-push-image)
kubectl logs <pod-name> -c <step-name>
```
