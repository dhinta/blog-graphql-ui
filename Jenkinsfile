pipeline {
    agent any
    tools {
        nodejs 'latest node'
    }
    stages {
        stage('Npm Setup') {
          steps {
            sh 'npm i'
          }
        }
        stage('Code Quality') {
            steps {
                echo 'Linting starts..'
                sh 'npm run lint'
                echo 'Linting ends..'
            }
        }
        stage('Build') {
            steps {
                echo 'Building starts..'
                sh 'npm run jenkinsbuild'
                echo 'Building ends..'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying  starts....'
                sh 'aws s3 sync dist/blog-graphql-ui s3://graphql-ng-demo'
                echo 'Deploying  ends....'
            }
        }
    }
}
