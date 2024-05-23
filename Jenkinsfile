pipeline {
    agent any
    environment {
        // Ensure to replace 'aws-credentials' with the actual ID or name of the Jenkins credentials that store your AWS credentials.
        AWS_CREDENTIALS = credentials('aws-credentials')
        ECR_REPO_NAME = 'todo-app'
        // Enclose the AWS region in quotes.
        AWS_REGION = 'eu-north-1'
        // Enclose the cluster name and service name in quotes.
        CLUSTER_NAME = 'TodoappCluster'
        SERVICE_NAME = 'todoapp_service'
        IMAGE_TAG = "${env.BUILD_ID}"
        // Add AWS_ACCOUNT_ID variable to store the AWS account ID.
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
                    // Ensure to use single quotes for string literals in Groovy.
                    dockerImage = docker.build('${ECR_REPO_NAME}:${IMAGE_TAG}')
                }
            }
        }
        stage('Login to AWS ECR') {
            steps {
                script {
                    // Use double quotes for string interpolation to access environment variables.
                    sh """
                    aws ecr get-login-password --region ${AWS_REGION} | docker login --username AWS --password-stdin ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com
                    """
                }
            }
        }
        stage('Push Docker Image') {
            steps {
                script {
                    dockerImage.push()
                }
            }
        }
        stage('Deploy to ECS') {
            steps {
                script {
                    // Use double quotes for string interpolation to access environment variables.
                    sh """
                    aws ecs update-service --cluster ${CLUSTER_NAME} --service ${SERVICE_NAME} --force-new-deployment
                    """
                }
            }
        }
    }
}
