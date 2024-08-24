# Automated CI/CD Pipeline with Jenkins, AWS ECR and Docker

## Project Overview

This project demonstrates the creation and management of a CI/CD pipeline using Jenkins and Docker, with deployment on AWS ECS (Elastic Container Service). The pipeline automates the building, testing, and deployment of a simple web application. 

## Key Components

- **Jenkins**: Used for continuous integration and continuous deployment (CI/CD) automation.
- **Docker**: Containerizes the application for consistent environments across development, testing, and production.
- **AWS ECS**: Manages the deployment and scaling of Docker containers.
- **AWS ECR**: Stores Docker images for deployment.

## Project Workflow

1. **Code Commit**: Changes are pushed to the GitHub repository.
2. **Jenkins Pipeline**: 
   - **Build Stage**: The application is built and Docker images are created.
   - **Push Stage**: Docker images are pushed to AWS ECR.
   - **Deployment Stage**: The ECS service is updated with the new Docker image.



## Setup and Configuration

### Prerequisites

- Jenkins installed and configured.
- Docker installed and configured.
- AWS account with ECS and ECR access.

### Jenkins Configuration

1. **Create a Jenkins Pipeline Job**:
   - Configure the pipeline with the Jenkinsfile found in the repository.

2. **Set Up AWS Credentials**:
   - Add AWS credentials to Jenkins for ECR and ECS access.

### Docker Configuration

1. **Dockerfile**:
   - Ensure the Dockerfile is configured to build the application image.

2. **Docker Compose** (if applicable):
   - Define services and networks in a `docker-compose.yml` file.

### AWS ECS Configuration

1. **Create a Task Definition**:
   - Define the Docker image and container settings.

2. **Create or Update ECS Service**:
   - Deploy the updated Docker image to ECS.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

