variable "app_name" {
  description = "Nome da aplicação no Elastic Beanstalk"
  type        = string
  default     = "knowledge-mongodb"
}

variable "env_name" {
  description = "Nome do ambiente no Elastic Beanstalk"
  type        = string
  default     = "knowledge-mongodb-env"
}

variable "mongodb_uri" {
  description = "URI de conexão com o MongoDB Atlas"
  type        = string
  sensitive   = true
}