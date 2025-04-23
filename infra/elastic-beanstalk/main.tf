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
  platform_arn = "arn:aws:elasticbeanstalk:us-east-1::platform/Node.js 18 running on 64bit Amazon Linux 2/5.6.6"

  # Configurações do ambiente
  setting {
    namespace = "aws:autoscaling:launchconfiguration"
    name      = "InstanceType"
    value     = "t3.micro"
  }

 
  # Configurações de variável de ambiente (para conectar ao MongoDB Atlas)
  setting {
    namespace = "aws:elasticbeanstalk:application:environment"
    name      = "MONGODB_URI"
    value     = var.mongodb_uri
  }

  # Configurações de porta
  setting {
    namespace = "aws:elasticbeanstalk:application:environment"
    name      = "PORT"
    value     = "3000"
  }

  # Configurações de escalabilidade mínima
  setting {
    namespace = "aws:autoscaling:asg"
    name      = "MinSize"
    value     = "1"
  }

  setting {
    namespace = "aws:autoscaling:asg"
    name      = "MaxSize"
    value     = "2"
  }

  # Habilitar logs no CloudWatch
  setting {
    namespace = "aws:elasticbeanstalk:cloudwatch:logs"
    name      = "StreamLogs"
    value     = "true"
  }
}

# Output da URL do ambiente.
output "environment_url" {
  value       = aws_elastic_beanstalk_environment.backend_env.endpoint_url
  description = "URL do ambiente Elastic Beanstalk"
}