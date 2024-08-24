pipeline {
    agent any
    environment {
        // Replace 'aws-credentials' with the actual ID or name of the Jenkins credentials.
        AWS_CREDENTIALS = credentials('aws-credentials')
        ECR_REPO_NAME = '488323332783.dkr.ecr.eu-north-1.amazonaws.com/todo-app'
        AWS_REGION = 'eu-north-1'
        CLUSTER_NAME = 'TodoappCluster'
        SERVICE_NAME = 'todoapp_service'
        IMAGE_TAG = "${env.BUILD_ID}"
        AWS_ACCOUNT_ID = '488323332783'
    }
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    // Build the Docker image with the correct ECR repository and tag.
                    dockerImage = docker.build("${ECR_REPO_NAME}:${IMAGE_TAG}")
                }
            }
        }
        stage('Login to AWS ECR') {
            steps {
                script {
                    // Login to AWS ECR using the credentials and region specified.
                    sh """
                    aws ecr get-login-password --region ${AWS_REGION} | docker login --username AWS --password-stdin ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com
                    """
                }
            }
        }
        stage('Push Docker Image') {
            steps {
                script {
                    // Push the image to ECR using the repository name and image tag.
                    dockerImage.push("${IMAGE_TAG}")
                }
            }
        }
        stage('Deploy to ECS') {
            steps {
                script {
                    // Force a new deployment in ECS to use the updated image.
                    sh """
                    aws ecs update-service --cluster ${CLUSTER_NAME} --service ${SERVICE_NAME} --force-new-deployment
                    """
                }
            }
        }
    }
}
