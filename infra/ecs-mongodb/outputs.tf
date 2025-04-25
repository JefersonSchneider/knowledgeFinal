output "environment_url" {
  value       = aws_elastic_beanstalk_environment.mongodb_env.endpoint_url
  description = "URL do ambiente Elastic Beanstalk com MongoDB"
}