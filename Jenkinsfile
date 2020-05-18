pipeline {
    agent any
    stages {
        stage('Npm Setup') {
          steps {
            sh 'npm i'
            sh 'npm run lint'
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
                sh 'npm run build'
                echo 'Building ends..'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying  starts....'
                sh 's3Upload(file:"graphql-blog/dist", bucket:"graphql-ng-demo", path:"")'
                echo 'Deploying  ends....'
            }
        }
    }
}
