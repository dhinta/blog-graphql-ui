pipeline {
    agent any
    tools {
        nodejs 'node 14'
    }
    stages {
        stage('Npm Setup') {
          steps {
            sh 'npm'
          }
        }
        stage('Code Quality') {
            steps {
                echo 'Linting starts..'

                echo 'Linting ends..'
            }
        }
        stage('Build') {
            steps {
                echo 'Building starts..'
                echo 'Building ends..'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying  starts....'
                echo 'Deploying  ends....'
            }
        }
    }
}
