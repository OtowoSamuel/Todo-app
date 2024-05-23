pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                script {
                    dockerImage = docker.build("your-docker-repo/todo-app")
                }
            }
        }

        stage('Push to ECR') {
            steps {
                script {
                    docker.withRegistry('https://your-aws-account-id.dkr.ecr.your-region.amazonaws.com', 'ecr:your-aws-credentials') {
                        dockerImage.push("latest")
                    }
                }
            }
        }

        stage('Deploy to ECS') {
            steps {
                script {
                    // Add your ECS deployment steps here
                }
            }
        }
    }
}
