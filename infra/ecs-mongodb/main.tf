provider "aws" {
  region     = "us-east-1"
  access_key = var.aws_access_key
  secret_key = var.aws_secret_key
  token      = var.aws_session_token
}

# Variáveis inline no mesmo arquivo
variable "aws_access_key" {
  type        = string
  description = "Chave de acesso AWS"
}

variable "aws_secret_key" {
  type        = string
  description = "Chave secreta AWS"
}

variable "aws_session_token" {
  type        = string
  description = "Token de sessão temporário AWS"
}

variable "subnet_id" {
  type        = string
  description = "ID da sub-rede pública"
}

variable "security_group_id" {
  type        = string
  description = "ID do Security Group com porta 27017 liberada"
}

variable "cluster_name" {
  type        = string
  default     = "mongodb-cluster"
}

variable "container_name" {
  type        = string
  default     = "mongodb"
}

variable "container_port" {
  type        = number
  default     = 27017
}

variable "mongo_version" {
  type        = string
  default     = "mongo:6.0"
}

resource "aws_ecs_cluster" "cluster" {
  name = var.cluster_name
}

resource "aws_ecs_task_definition" "mongodb_task" {
  family                   = "mongodb-task"
  requires_compatibilities = ["FARGATE"]
  network_mode             = "awsvpc"
  cpu                      = "256"
  memory                   = "512"
  execution_role_arn       = "arn:aws:iam::${data.aws_caller_identity.current.account_id}:role/LabRole"

  container_definitions = jsonencode([
    {
      name      = var.container_name
      image     = var.mongo_version
      essential = true
      portMappings = [
        {
          containerPort = var.container_port
          hostPort      = var.container_port
        }
      ]
    }
  ])
}

resource "aws_ecs_service" "mongodb_service" {
  name            = "mongodb-service"
  cluster         = aws_ecs_cluster.cluster.id
  task_definition = aws_ecs_task_definition.mongodb_task.arn
  launch_type     = "FARGATE"

  network_configuration {
    subnets          = [var.subnet_id]
    security_groups  = [var.security_group_id]
    assign_public_ip = true
  }

  desired_count = 1
}

data "aws_caller_identity" "current" {}

output "mongodb_connection_string" {
  value       = "mongodb://${aws_ecs_service.mongodb_service.name}.ecs.amazonaws.com:${var.container_port}"
  description = "Connection string pública do MongoDB"
}
