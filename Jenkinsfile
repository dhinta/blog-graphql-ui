pipeline {
    agent any
    stages {
        stage('Npm Setup') {
          steps {
            bat 'npm i'
            bat 'npm run lint'
          }
        }
        stage('Build') {
            steps {
                echo 'Building starts..'
                bat 'npm run build'
                echo 'Building ends..'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying  starts....'
                echo 'Copying content....'
                bat 'xcopy "dist" C:\\Users\\Debasish\\Desktop\\deploy /e /i /h'
                echo 'switch to target folder....'
                bat 'cd "C:\\Users\\Debasish\\Desktop\\deploy\\blog-graphql-ui"'
                echo 'start server....'
                bat 'http-server --p 3000'
                echo 'Deploying  ends....'
            }
        }
    }
}
