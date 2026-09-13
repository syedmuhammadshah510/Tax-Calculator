# Tax Calculator (DevOps / Cloud Native)

A modern cloud-native Node.js web application deployed on **IBM Cloud Code Engine** with an automated **Tekton CI/CD Pipeline**.

---

## Project Phases & Progress

- [x] **Part A — Epic & Stories (Agile Planning)**: Documented in [`EPIC_AND_STORIES.md`](./EPIC_AND_STORIES.md).
- [x] **Part B — Containerize & Deploy (Node.js Track)**:
  - [x] Express server and Jasmine test suite configured
  - [x] 8/8 Jasmine unit tests passing (`npm test`)
  - [x] Lean Alpine Dockerfile & `.dockerignore` created
  - [x] Local run, curl, and web UI verified
  - [x] IBM Cloud Container Registry tagging and push workflow (`scripts/push_image.sh`)
  - [x] IBM Cloud Code Engine deployment script (`scripts/deploy_code_engine.sh`)
- [x] **Part C — Tekton CI/CD Pipeline**:
  - [x] Workspace PVC: [`tekton/workspace-pvc.yaml`](./tekton/workspace-pvc.yaml)
  - [x] Jasmine Test Task: [`tekton/tasks/task-npm-test.yaml`](./tekton/tasks/task-npm-test.yaml)
  - [x] Buildah Build & Push Task: [`tekton/tasks/task-build-push.yaml`](./tekton/tasks/task-build-push.yaml)
  - [x] Code Engine Deploy Task: [`tekton/tasks/task-deploy-ce.yaml`](./tekton/tasks/task-deploy-ce.yaml)
  - [x] Pipeline Orchestration: [`tekton/pipeline.yaml`](./tekton/pipeline.yaml)
  - [x] PipelineRun Manifest: [`tekton/pipelinerun.yaml`](./tekton/pipelinerun.yaml)

---

## Repository Structure

```text
├── .dockerignore
├── .gitignore
├── Dockerfile
├── EPIC_AND_STORIES.md
├── README.md
├── package.json
├── package-lock.json
├── server.js
├── taxCalculator.js
├── public/
│   ├── index.html
│   ├── script.js
│   └── style.css
├── spec/
│   ├── support/
│   │   └── jasmine.json
│   └── taxCalculatorSpec.js
├── scripts/
│   ├── deploy_code_engine.sh
│   └── push_image.sh
└── tekton/
    ├── apply-pipeline.sh
    ├── pipeline.yaml
    ├── pipelinerun.yaml
    ├── workspace-pvc.yaml
    └── tasks/
        ├── task-build-push.yaml
        ├── task-deploy-ce.yaml
        └── task-npm-test.yaml
```
