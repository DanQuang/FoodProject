
# Django Backend Setup

This guide will walk you through setting up and running the Django backend.

## Requirements

Make sure you have the following installed:

- Python 3.8+
- pip (Python package installer)
- virtualenv (optional but recommended)

## Setting Up the Project

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd <your-project-directory>
```

### 2. Create a virtual environment (optional but recommended)

```bash
python3 -m venv venv
```

Activate the virtual environment:

- On Windows:
  ```bash
  venv\Scripts\activate
  ```

- On macOS/Linux:
  ```bash
  source venv/bin/activate
  ```

### 3. Install dependencies

Install the required dependencies from `requirements.txt`:

```bash
pip install -r requirements.txt
```

### 4. Set up environment variables

Create a `.env` file in the project root and add the following line to store your Google API key:

```bash
GOOGLE_API_KEY=<your-google-api-key>
```

Make sure to replace `<your-google-api-key>` with your actual Google API key.

## Running the Project

### 1. Apply database migrations

To set up the database schema, run the following command:

```bash
python manage.py migrate
```

### 2. Start the development server

Run the Django development server:

```bash
python manage.py runserver
```

By default, the server will be accessible at [http://127.0.0.1:8000](http://127.0.0.1:8000).
