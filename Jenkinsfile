pipeline {
    agent any
    stages {
        stage('Npm Setup') {
          steps {
            echo "npm i"
          }
        }
        stage('Build') {
            steps {
                echo 'Building..'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying  starts....'
                echo 'Copying content....'
                echo 'switch to target folder....'
                echo 'Deploying  ends....'
            }
        }
    }
}
