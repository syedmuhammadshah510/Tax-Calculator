# Tax Calculator (DevOps / Cloud Native) — Graded Lab Evidence Checklist

Use this checklist to ensure you have captured all 10 pieces of submission evidence required for the IBM DevOps & Cloud Native Capstone project.

---

## Submission Evidence Tracker

| # | Task / Deliverable | How to Capture | Command to Run | What to Screenshot | Status |
|---|--------------------|----------------|----------------|--------------------|:------:|
| **1** | **Epic & User Stories** | Kanban Board or Document | View [`EPIC_AND_STORIES.md`](./EPIC_AND_STORIES.md) | Jira/Trello board or markdown preview showing Epic + 3 User Stories | [ ] |
| **2** | **Jasmine Test Run** | Terminal Output | `npm test` | Terminal showing `8 specs, 0 failures` | [ ] |
| **3** | **Dockerfile Verification** | Code / Terminal | `cat Dockerfile` | Contents of `Dockerfile` showing `FROM node:20-alpine`, `COPY`, `EXPOSE 8080`, `CMD` | [ ] |
| **4** | **Local Docker Build** | Terminal Output | `docker build -t tax-calculator:1.0 .` | Terminal showing successful image build and tag `tax-calculator:1.0` | [ ] |
| **5** | **Local Container Run & Curl** | Terminal Output | `docker run -d -p 8080:8080 tax-calculator:1.0`<br>`curl -i http://localhost:8080/health` | `HTTP/1.1 200 OK` and JSON response `{"status":"UP",...}` | [ ] |
| **6** | **IBM Container Registry Push** | Terminal Output | `ibmcloud cr images --restrict <namespace>` | Table showing repository `us.icr.io/<namespace>/tax-calculator`, tag `1.0` | [ ] |
| **7** | **Code Engine Deployment & URL** | Terminal Output | `ibmcloud ce app get -n tax-calculator` | Terminal showing status `Ready`, URL, and revision details | [ ] |
| **8** | **Deployed Web App Live Test** | Web Browser / Curl | Open Code Engine URL in browser or `curl -i <URL>/health` | Browser showing the live Tax Calculator web application UI at the HTTPS URL | [ ] |
| **9** | **Tekton Pipeline YAML** | Code Manifest | View [`tekton/pipeline.yaml`](./tekton/pipeline.yaml) | YAML showing DAG dependencies (`runAfter: git-clone`, `npm-test`, `build-and-push`, `deploy-code-engine`) | [ ] |
| **10** | **Tekton PipelineRun Success Logs**| Terminal Output | `tkn pipelinerun logs -f -L` | Terminal showing all 4 tasks succeeding with green checkmarks | [ ] |

---

## Fast Links to Project Artifacts

- **GitHub Repository:** [https://github.com/syedmuhammadshah510/Tax-Calculator](https://github.com/syedmuhammadshah510/Tax-Calculator)
- **Agile Planning (Part A):** [`EPIC_AND_STORIES.md`](./EPIC_AND_STORIES.md)
- **Application Logic:** [`taxCalculator.js`](./taxCalculator.js)
- **Express Server:** [`server.js`](./server.js)
- **Jasmine Tests:** [`spec/taxCalculatorSpec.js`](./spec/taxCalculatorSpec.js)
- **Dockerfile:** [`Dockerfile`](./Dockerfile) & [`.dockerignore`](./.dockerignore)
- **ICR Push Script:** [`scripts/push_image.sh`](./scripts/push_image.sh)
- **Code Engine Deploy Script:** [`scripts/deploy_code_engine.sh`](./scripts/deploy_code_engine.sh)
- **Tekton Pipeline Manifests:** [`tekton/`](./tekton/)
