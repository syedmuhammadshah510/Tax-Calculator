# Modernise Tax Calculator - Agile Planning Artifacts

## Epic Overview

- **Epic Title:** Modernise Tax Calculator
- **Epic ID:** EPIC-01
- **Status:** In Progress
- **Target Platform:** IBM Cloud Code Engine & Tekton CI/CD Pipeline
- **Description:**  
  The current Tax Calculator web application runs as a manually deployed, legacy static application without an automated CI/CD pipeline. This epic encompasses modernizing the architecture to run fully containerized on IBM Cloud Code Engine, governed by an automated Tekton pipeline that verifies application integrity via unit tests (Jasmine) prior to image build and deployment.

---

## User Stories & Acceptance Criteria

### User Story 1: Containerizing the Application
- **Story ID:** US-01
- **Title:** Containerize the Tax Calculator Node.js Web Application
- **User Role / Description:**  
  As a **DevOps Engineer / Developer**,  
  I want to **package the Node.js Tax Calculator application into a lightweight, standardized Docker container**,  
  So that **the application runs consistently across local development, testing environments, and production cloud infrastructure with reproducible dependencies**.
- **Priority:** High
- **Story Points:** 3
- **Acceptance Criteria:**
  1. **Criterion 1 (Testing Prerequisite):** All unit tests (Jasmine) must execute and pass cleanly (`npm test`) before the application can be built or verified inside a production Docker container.
  2. **Criterion 2 (Container Specification):** A standardized `Dockerfile` using an official LTS Node.js base image (e.g. `node:XX-alpine`) and a `.dockerignore` file are provided to ensure node_modules and unnecessary build artifacts are excluded.
  3. **Criterion 3 (Local Verification):** The Docker image builds without errors, exposes the designated server port (e.g., 3000/8080), and serves requests correctly when tested locally (`docker run` + HTTP health check/curl).

---

### User Story 2: Deploying to IBM Cloud Code Engine
- **Story ID:** US-02
- **Title:** Deploy Containerized Tax Calculator to IBM Cloud Code Engine
- **User Role / Description:**  
  As a **Cloud Administrator / SRE**,  
  I want to **deploy the containerized Tax Calculator application to IBM Cloud Code Engine using images stored in IBM Cloud Container Registry (ICR)**,  
  So that **we eliminate self-managed virtual machines, enable serverless auto-scaling, and obtain secure public URLs with zero server maintenance overhead**.
- **Priority:** High
- **Story Points:** 5
- **Acceptance Criteria:**
  1. **Criterion 1 (Registry Publication):** The container image is tagged with the target IBM Cloud Container Registry namespace and successfully pushed to ICR (`icr.io/<namespace>/tax-calculator:<tag>`).
  2. **Criterion 2 (Serverless Deployment):** A Code Engine application is created/updated within an active Code Engine project referencing the registry image and configured to route traffic to the container port.
  3. **Criterion 3 (Public Accessibility & Health Check):** The deployed Code Engine application generates a live HTTPS URL that successfully renders the Tax Calculator frontend and computes tax calculations accurately.

---

### User Story 3: Automating Build, Test, and Deployment Pipeline (Tekton)
- **Story ID:** US-03
- **Title:** Implement Automated CI/CD Pipeline using Tekton
- **User Role / Description:**  
  As a **Release Engineer**,  
  I want to **implement an automated Tekton CI/CD pipeline for the Tax Calculator repository**,  
  So that **every change is cloned, tested, built into a container image, and deployed automatically without manual intervention**.
- **Priority:** High
- **Story Points:** 8
- **Acceptance Criteria:**
  1. **Criterion 1 (Automated Test Enforcement):** The pipeline includes a test task that executes `npm install && npm test`; if any Jasmine unit test fails, the pipeline terminates immediately and prevents deployment.
  2. **Criterion 2 (Image Build & Push):** Upon successful test completion, an image build task (using Buildah/Kaniko) packages the application and pushes the tagged image directly to IBM Cloud Container Registry.
  3. **Criterion 3 (Automated Deployment & Audit):** A deploy task executes `ibmcloud ce app update/create` to roll out the newly built image to IBM Cloud Code Engine, recording execution logs for verification.

---

## Spreadsheet / CSV Import Table

| Issue Type | ID | Title | Description | Acceptance Criteria | Priority | Story Points |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Epic** | EPIC-01 | Modernise Tax Calculator | Modernize legacy manually-deployed static app to run containerized on IBM Cloud Code Engine via automated Tekton CI/CD pipeline. | 1. Fully containerized application.<br>2. Deployed to IBM Cloud Code Engine.<br>3. Automated Tekton CI/CD pipeline. | High | 16 |
| **Story** | US-01 | Containerize the Tax Calculator Application | Package Node.js app into a Docker container with unit tests verified. | 1. Jasmine unit tests pass prior to container deploy.<br>2. Alpine-based Dockerfile & .dockerignore configured.<br>3. Local container build and curl verification succeeds. | High | 3 |
| **Story** | US-02 | Deploy to IBM Cloud Code Engine | Deploy container image from IBM Cloud Container Registry to Code Engine. | 1. Image pushed to IBM Cloud Container Registry.<br>2. Code Engine app deployed and bound to target port.<br>3. Secure HTTPS endpoint responds with functional UI. | High | 5 |
| **Story** | US-03 | Automate CI/CD Pipeline with Tekton | Automated Tekton pipeline covering clone, test, build, push, and deploy. | 1. Pipeline aborts if npm test fails.<br>2. Automated buildah/kaniko build & registry push.<br>3. Automated rollout to IBM Cloud Code Engine with logged output. | High | 8 |

---

## Jira / Trello Quick Copy Format

### Epic
```text
Title: Modernise Tax Calculator
Type: Epic
Description:
The application currently runs as a manually deployed static application with no pipeline. This epic modernizes it to run containerized on IBM Cloud Code Engine, deployed via an automated pipeline that runs unit tests before deploy.
```

### Story 1
```text
Title: US-01: Containerizing the application
Epic: Modernise Tax Calculator
Description:
As a developer, I want to containerize the Tax Calculator Node.js application so that it can run reliably across environments.

Acceptance Criteria:
- [ ] Unit tests (Jasmine) must pass before the app is deployed to a Docker container.
- [ ] Dockerfile uses an official node-alpine base image, minimizes image size, and uses .dockerignore.
- [ ] Container builds successfully, runs on host port, and responds to health checks.
```

### Story 2
```text
Title: US-02: Deploying on IBM Cloud
Epic: Modernise Tax Calculator
Description:
As a cloud engineer, I want to deploy the container image to IBM Cloud Code Engine so that the app runs on a managed serverless platform instead of self-managed VMs.

Acceptance Criteria:
- [ ] Docker image is tagged and pushed to IBM Cloud Container Registry.
- [ ] IBM Cloud Code Engine application is created/updated from the registry image with proper port mapping.
- [ ] The application is publicly accessible via a valid HTTPS endpoint with healthy logs.
```

### Story 3
```text
Title: US-03: Creating a pipeline for packaging and deploying the application
Epic: Modernise Tax Calculator
Description:
As a release engineer, I want a Tekton CI/CD pipeline that automates testing, container building, and deployment to IBM Cloud Code Engine.

Acceptance Criteria:
- [ ] Automated testing stage runs Jasmine tests (`npm test`) and aborts the pipeline on failure.
- [ ] Automated build stage builds the Docker image and pushes it to IBM Cloud Container Registry.
- [ ] Automated deploy stage deploys the new container image to IBM Cloud Code Engine.
```
