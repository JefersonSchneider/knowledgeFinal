provider "aws" {
  region                  = "us-east-1"
  access_key              = var.aws_access_key
  secret_key              = var.aws_secret_key
  token                   = var.aws_session_token
}

resource "aws_ecs_cluster" "mongo_cluster" {
  name = "mongodb-cluster"
}

resource "aws_ecs_task_definition" "mongo_task" {
  family                   = "mongo-task"
  requires_compatibilities = ["FARGATE"]
  network_mode             = "awsvpc"
  cpu                      = "256"
  memory                   = "512"

  container_definitions = jsonencode([
    {
      name  = "mongodb"
      image = "mongo:latest"
      essential = true
      portMappings = [
        {
          containerPort = 27017
          hostPort      = 27017
        }
      ]
    }
  ])
}

resource "aws_ecs_service" "mongo_service" {
  name            = "mongo-service"
  cluster         = aws_ecs_cluster.mongo_cluster.id
  task_definition = aws_ecs_task_definition.mongo_task.arn
  desired_count   = 1
  launch_type     = "FARGATE"

  network_configuration {
    subnets          = [var.subnet_id]
    security_groups  = [var.security_group_id]
    assign_public_ip = true
  }
}
