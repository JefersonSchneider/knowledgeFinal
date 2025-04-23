provider "aws" {
  region = "us-east-1"
}

variable "app_name" {
  type    = string
  default = "knowledge-backend"
}

variable "env_name" {
  type    = string
  default = "knowledge-backend-env"
}

variable "mongodb_uri" {
  type      = string
  sensitive = true
}

# Cria a aplicação no Elastic Beanstalk
resource "aws_elastic_beanstalk_application" "backend_app" {
  name        = var.app_name
  description = "Aplicação backend do projeto Knowledge"
}

# Cria o ambiente no Elastic Beanstalk
resource "aws_elastic_beanstalk_environment" "backend_env" {
  name                = var.env_name
  application         = aws_elastic_beanstalk_application.backend_app.name
  solution_stack_name = "64bit Amazon Linux 2023 v6.5.1 running Node.js 22"
  wait_for_ready_timeout = "30m"

  # Associa o instance profile existente ao ambiente
  setting {
    namespace = "aws:autoscaling:launchconfiguration"
    name      = "IamInstanceProfile"
    value     = "LabInstanceProfile" # Confirmado com base na saída
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
    namespace = "aws:elasticbeanstalk:container:nodejs"
    name      = "NodeVersion"
    value     = "22.2.0"
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

# Output da URL do ambiente
output "environment_url" {
  value       = aws_elastic_beanstalk_environment.backend_env.endpoint_url
  description = "URL do ambiente Elastic Beanstalk"
}