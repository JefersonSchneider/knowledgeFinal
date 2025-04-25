provider "aws" {
  region = "us-east-1"
}

# Cria a aplicação no Elastic Beanstalk
resource "aws_elastic_beanstalk_application" "mongodb_app" {
  name        = var.app_name
  description = "Aplicação backend do projeto Knowledge com MongoDB Atlas"
}

# Cria o ambiente no Elastic Beanstalk
resource "aws_elastic_beanstalk_environment" "mongodb_env" {
  name                = var.env_name
  application         = aws_elastic_beanstalk_application.mongodb_app.name
  solution_stack_name = "64bit Amazon Linux 2023 v6.5.1 running Node.js 22"
  wait_for_ready_timeout = "30m"

  # Associa o instance profile existente ao ambiente
  setting {
    namespace = "aws:autoscaling:launchconfiguration"
    name      = "IamInstanceProfile"
    value     = "LabInstanceProfile"
  }

  # Configura como single instance (sem load balancer)
  setting {
    namespace = "aws:elasticbeanstalk:environment"
    name      = "EnvironmentType"
    value     = "SingleInstance"
  }

  setting {
    namespace = "aws:autoscaling:launchconfiguration"
    name      = "InstanceType"
    value     = "t3.micro"
  }

  setting {
    namespace = "aws:elasticbeanstalk:application:environment"
    name      = "MONGODB_URI"
    value     = var.mongodb_uri
  }

  setting {
    namespace = "aws:elasticbeanstalk:application:environment"
    name      = "PORT"
    value     = "3000"
  }

  setting {
    namespace = "aws:autoscaling:asg"
    name      = "MinSize"
    value     = "1"
  }

  setting {
    namespace = "aws:autoscaling:asg"
    name      = "MaxSize"
    value     = "1"
  }

  setting {
    namespace = "aws:elasticbeanstalk:cloudwatch:logs"
    name      = "StreamLogs"
    value     = "true"
  }
}