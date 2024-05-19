# LogInfo Backend

## Overview

LogInfo is a custom-built backend application designed to power a forum-style application. Built using NestJS as the framework, SQLite as the database, and Prisma as the ORM, this project is designed to provide a robust and scalable foundation for user engagement and discussion.

## Getting Started

**Prerequisites**

Node.js (version 14 or higher)
npm/yarn (version 6 or higher)
Prisma (version 2.15 or higher)
SQLite (version 3.30 or higher)

### Features

User authentication and authorization
Forum posts and comments
User profiles and messaging
Moderation tools for administrators
Customizable themes and layouts
Integration with third-party services (e.g. email, social media)
Configuration
The LogInfo backend is highly configurable. You can customize various settings, such as:

Database connection settings
Authentication and authorization settings
Forum settings (e.g. post limits, comment limits)
Moderation settings (e.g. spam filtering, content filtering)
Configuration Files
The LogInfo backend uses a combination of environment variables and configuration files to store settings. You can find the configuration files in the config directory.

Environment Variables
You can set environment variables to customize the behavior of the LogInfo backend. For example, you can set the DATABASE_URL environment variable to specify the connection string for your database.

Configuration Files
The LogInfo backend uses a combination of JSON and YAML files to store settings. For example, you can customize the forum settings by editing the forum.config.json file.

Troubleshooting
If you encounter any issues with the LogInfo backend, please refer to the troubleshooting guide in the docs directory.

Support
If you need assistance with the LogInfo backend, please contact [your contact information]. We strive to provide timely and effective support to ensure the success of your project.

Disclaimer
The LogInfo backend is a custom-built application and is not open-source. You are not permitted to distribute, modify, or use the LogInfo backend for any purpose other than the specific project it was designed for.
