# Menu Tree Fullstack

A Laravel-based fullstack application for managing menu trees.

## Prerequisites

Before running this project on a new computer, make sure you have the following installed:

- Git
- PHP 8.2 or higher
- Composer
- Node.js
- MySQL or PostgreSQL

## Installation

Follow these steps to set up the project locally:

1. **Clone the repository**
   ```bash
   git clone https://github.com/TheSwordSlay/menu-tree-fullstack
   ```

2. **Navigate to project directory**
   ```bash
   cd menu-tree-fullstack
   ```

3. **Set up environment configuration**
   - Copy `.env.example` to `.env`
   ```bash
   cp .env.example .env
   ```
   - Update the database credentials in `.env` file to match your MySQL/PostgreSQL username and password

4. **Install PHP dependencies**
   ```bash
   composer install
   ```

5. **Install Node.js dependencies**
   ```bash
   npm install
   ```

6. **Generate application key**
   ```bash
   php artisan key:generate
   ```

7. **Run database migrations**
   ```bash
   php artisan migrate
   ```
   Type `yes` when prompted to create the database

8. **Seed the database**
   ```bash
   php artisan migrate:fresh --seed
   ```

9. **Build frontend assets**
   ```bash
   npm run build
   ```

10. **Start the development server**
    ```bash
    php artisan serve
    ```

## Default Account

You can use the following dummy account for testing:
- **Email:** `testinguser123@gmail.com`
- **Password:** `password123@123`

Alternatively, you can create your own account through the registration process.

## Usage

After running `php artisan serve`, the application will be available at `http://localhost:8000` (or the URL shown in your terminal).

## Demo

Watch the project demo video: [View Demo](https://drive.google.com/file/d/1SuwOUIzgdQaT1J4NORVGMG-MOJjWhtqi/view?usp=sharing)

## API Documentation

The API documentation is available on Postman: [API Documentation](https://www.postman.com/solar-meteor-522920/menu-tree-workspace/collection/36684389-fe001735-bd97-4ca0-af15-7030802cc532?action=share&source=copy-link&creator=36684389)

## Contributing

Please feel free to contribute to this project by submitting issues or pull requests.