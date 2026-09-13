# Tax Calculator (DevOps / Cloud Native)

A modern cloud-native Node.js web application deployed on **IBM Cloud Code Engine** with an automated **Tekton CI/CD Pipeline**.

---

## Project Phases & Progress

- [x] **Part A — Epic & Stories (Agile Planning)**: Documented in [`EPIC_AND_STORIES.md`](./EPIC_AND_STORIES.md).
- [ ] **Part B — Containerize & Deploy (Node.js Track)**:
  - [ ] Inspect boilerplate & configure Jasmine tests
  - [ ] Run & verify unit tests locally
  - [ ] Construct multi-stage/lean Dockerfile & `.dockerignore`
  - [ ] Local build, run & curl test
  - [ ] Push container image to IBM Cloud Container Registry (ICR)
  - [ ] Deploy container to IBM Cloud Code Engine
- [ ] **Part C — Tekton CI/CD Pipeline**:
  - [ ] Tekton Task definitions (git-clone, test, build-push, deploy)
  - [ ] Tekton Pipeline & PipelineRun YAML configuration
  - [ ] Execution, monitoring, and debugging via `tkn` CLI

---

## Part A: Epic and Stories Summary

See [`EPIC_AND_STORIES.md`](./EPIC_AND_STORIES.md) for full details, acceptance criteria, and board copy-paste format.
- **Epic**: Modernise Tax Calculator
- **US-01**: Containerizing the application (Jasmine tests must pass before Docker container deployment)
- **US-02**: Deploying on IBM Cloud (IBM Cloud Code Engine serverless deployment)
- **US-03**: Automated CI/CD Pipeline (Tekton pipeline automating test, build, package, and deploy)
